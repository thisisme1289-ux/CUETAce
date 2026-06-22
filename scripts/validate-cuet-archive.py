import json
from pathlib import Path

ROOT = Path.cwd()
PYP = ROOT / "past year paper"

SUBJECT_KEYS = {"accountancy", "business-studies", "economics", "english", "general-test"}


def rel(path):
    return str(path.relative_to(ROOT)).replace("\\", "/")


def load_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def validate_question_file(path):
    errors = []
    data = load_json(path)
    for key in ["subject", "subject_code", "year", "total_questions", "chapters"]:
        if key not in data:
            errors.append(f"missing top-level key: {key}")
    chapters = data.get("chapters")
    if not isinstance(chapters, list) or not chapters:
        errors.append("chapters must be a non-empty list")
        return errors
    count = 0
    seen_ids = set()
    for chapter in chapters:
        questions = chapter.get("questions")
        if not isinstance(questions, list):
            errors.append("chapter questions must be a list")
            continue
        for q in questions:
            count += 1
            for key in ["id", "type", "level", "difficulty", "question", "options", "correct", "explanation", "source"]:
                if key not in q:
                    errors.append(f"question missing key {key}: {q.get('id', '<no id>')}")
            if q.get("id") in seen_ids:
                errors.append(f"duplicate question id: {q.get('id')}")
            seen_ids.add(q.get("id"))
            if q.get("type") != "mcq":
                errors.append(f"non-mcq type: {q.get('id')}")
            if not isinstance(q.get("options"), list) or len(q.get("options", [])) != 4:
                errors.append(f"question does not have four options: {q.get('id')}")
            correct = q.get("correct")
            if correct is not None and correct not in [0, 1, 2, 3]:
                errors.append(f"correct must be null or 0-3: {q.get('id')}")
    if data.get("total_questions") != count:
        errors.append(f"total_questions {data.get('total_questions')} does not match actual {count}")
    return errors


pdf_rows = []
for pdf_path in sorted(PYP.rglob("*.pdf")):
    parts = pdf_path.relative_to(PYP).parts
    year = parts[0] if parts and parts[0].isdigit() else None
    subject_key = parts[1] if len(parts) > 1 and parts[1] in SUBJECT_KEYS else None
    main_json = PYP / year / subject_key / "json" / f"{year}-{subject_key}.json" if year and subject_key else None
    individual_json = PYP / year / subject_key / "json" / "individual-pdfs" / f"{pdf_path.stem}.json" if year and subject_key else None
    pdf_rows.append({
        "pdf_path": rel(pdf_path),
        "year": year,
        "subject_key": subject_key,
        "bytes": pdf_path.stat().st_size,
        "main_json_exists": bool(main_json and main_json.exists()),
        "individual_json_path": rel(individual_json) if individual_json and individual_json.exists() else None,
    })

json_rows = []
errors = []
for json_path in sorted(PYP.rglob("*.json")):
    if json_path.name in {
        "conversion-report.json",
        "individual-pdf-conversion-report.json",
        "archive-summary.json",
        "archive-validation.json",
        "pdf-manifest.json",
        "manifest.json",
        "download-manifest.json",
    }:
        continue
    try:
        raw_data = load_json(json_path)
        if not isinstance(raw_data, dict) or "chapters" not in raw_data:
            continue
        file_errors = validate_question_file(json_path)
    except Exception as exc:
        file_errors = [f"failed to parse/validate: {exc}"]
    data = load_json(json_path) if json_path.exists() else {}
    json_rows.append({
        "json_path": rel(json_path),
        "subject": data.get("subject"),
        "year": data.get("year"),
        "total_questions": data.get("total_questions"),
        "errors": file_errors,
    })
    for error in file_errors:
        errors.append({"json_path": rel(json_path), "error": error})

validation = {
    "pdf_count": len(pdf_rows),
    "question_json_count": len(json_rows),
    "schema_error_count": len(errors),
    "pdfs": pdf_rows,
    "json_files": json_rows,
    "errors": errors,
}

(PYP / "archive-validation.json").write_text(json.dumps(validation, indent=2), encoding="utf-8")
print(json.dumps({
    "pdf_count": validation["pdf_count"],
    "question_json_count": validation["question_json_count"],
    "schema_error_count": validation["schema_error_count"],
}, indent=2))
