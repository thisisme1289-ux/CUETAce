import json
from pathlib import Path

ROOT = Path.cwd()
PYP = ROOT / "past year paper"


def rel(path):
    return str(path.relative_to(ROOT)).replace("\\", "/")


def load_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


conversion_report = load_json(PYP / "conversion-report.json")
review_by_path = {row["json_path"]: row for row in conversion_report}

entries = []
for path in sorted(PYP.rglob("*.json")):
    if path.name in {
        "archive-summary.json",
        "archive-validation.json",
        "conversion-report.json",
        "individual-pdf-conversion-report.json",
        "pdf-manifest.json",
        "manifest.json",
        "download-manifest.json",
    }:
        continue
    data = load_json(path)
    if not isinstance(data, dict) or "chapters" not in data:
        continue
    path_rel = rel(path)
    row = review_by_path.get(path_rel)
    questions = data.get("total_questions", 0)
    answers = 0
    for chapter in data.get("chapters", []):
        answers += sum(1 for q in chapter.get("questions", []) if q.get("correct") is not None)
    needs_review = bool(row["needs_review"]) if row else answers < min(questions, 40)
    entries.append({
        "subject": data.get("subject"),
        "subject_code": data.get("subject_code"),
        "year": data.get("year"),
        "paper": data.get("paper"),
        "json_path": path_rel,
        "kind": "individual-pdf" if "individual-pdfs" in path.parts else "main-year-subject",
        "questions": questions,
        "answers_mapped": answers,
        "needs_review": needs_review,
        "ready_for_student_use": not needs_review,
    })

index = {
    "archive_root": rel(PYP),
    "total_files": len(entries),
    "main_files": sum(1 for entry in entries if entry["kind"] == "main-year-subject"),
    "individual_pdf_files": sum(1 for entry in entries if entry["kind"] == "individual-pdf"),
    "ready_files": sum(1 for entry in entries if entry["ready_for_student_use"]),
    "review_files": sum(1 for entry in entries if entry["needs_review"]),
    "total_questions": sum(entry["questions"] for entry in entries),
    "total_answers_mapped": sum(entry["answers_mapped"] for entry in entries),
    "ready_questions": sum(entry["questions"] for entry in entries if entry["ready_for_student_use"]),
    "review_questions": sum(entry["questions"] for entry in entries if entry["needs_review"]),
    "files": entries,
}

(PYP / "import-index.json").write_text(json.dumps(index, indent=2), encoding="utf-8")
print(json.dumps({
    "total_files": index["total_files"],
    "main_files": index["main_files"],
    "individual_pdf_files": index["individual_pdf_files"],
    "ready_files": index["ready_files"],
    "review_files": index["review_files"],
    "total_questions": index["total_questions"],
    "total_answers_mapped": index["total_answers_mapped"],
}, indent=2))
