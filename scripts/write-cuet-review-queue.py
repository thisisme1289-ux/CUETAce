import csv
import json
from pathlib import Path

ROOT = Path.cwd()
PYP = ROOT / "past year paper"


def rel(path):
    return str(path.relative_to(ROOT)).replace("\\", "/")


def load_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


summary = load_json(PYP / "archive-summary.json")
rows = []

review_notes = {
    ("2022", "Business Studies"): (
        "Clean public SET 36 PDFs from CareerIndia/CollegeDekho have malformed or "
        "empty embedded text for many question/option cells. OCR recovers text, "
        "but the available answer mapping does not align with that SET, so this "
        "paper needs a matching official answer key or manual subject review."
    ),
    ("2022", "General Test"): (
        "Question/options were recovered from public PDFs, but the available "
        "solution PDF is partial. Only answers that could be mapped from source "
        "solution text are populated; unresolved items need a full SET 22 answer "
        "key or manual review."
    ),
}

for item in summary.get("needs_review", []):
    json_path = ROOT / item["json_path"]
    data = load_json(json_path)
    missing_answer_ids = []
    weak_option_ids = []
    for chapter in data.get("chapters", []):
        for question in chapter.get("questions", []):
            if question.get("correct") is None:
                missing_answer_ids.append(question.get("id"))
            options = question.get("options", [])
            if (
                len(options) != 4
                or any(not option or option.startswith("Option ") for option in options)
            ):
                weak_option_ids.append(question.get("id"))
    live_question_count = 0
    live_answers_mapped = 0
    for chapter in data.get("chapters", []):
        for question in chapter.get("questions", []):
            live_question_count += 1
            if question.get("correct") is not None:
                live_answers_mapped += 1

    row = {
        "year": item["year"],
        "subject": item["subject"],
        "json_path": item["json_path"],
        "questions": live_question_count,
        "answers_mapped": live_answers_mapped,
        "missing_answers": len(missing_answer_ids),
        "weak_options": len(weak_option_ids),
        "sample_missing_answer_ids": missing_answer_ids[:10],
        "sample_weak_option_ids": weak_option_ids[:10],
        "all_missing_answer_ids": missing_answer_ids,
        "all_weak_option_ids": weak_option_ids,
        "recommended_action": "manual_review_or_replace_source_pdf",
    }
    note = review_notes.get((item["year"], item["subject"]))
    if note:
        row["review_note"] = note
    rows.append(row)

review_json = PYP / "manual-review-queue.json"
review_json.write_text(json.dumps(rows, indent=2), encoding="utf-8")

review_csv = PYP / "manual-review-queue.csv"
with review_csv.open("w", newline="", encoding="utf-8") as handle:
    writer = csv.DictWriter(handle, fieldnames=[
        "year",
        "subject",
        "json_path",
        "questions",
        "answers_mapped",
        "missing_answers",
        "weak_options",
        "recommended_action",
        "review_note",
    ])
    writer.writeheader()
    for row in rows:
        writer.writerow({key: row.get(key, "") for key in writer.fieldnames})

print(json.dumps({
    "review_rows": len(rows),
    "json_path": rel(review_json),
    "csv_path": rel(review_csv),
}, indent=2))
