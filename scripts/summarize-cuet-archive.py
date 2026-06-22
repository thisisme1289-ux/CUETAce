import json
from pathlib import Path

ROOT = Path.cwd()
PYP = ROOT / "past year paper"

conversion_report = json.loads((PYP / "conversion-report.json").read_text(encoding="utf-8"))
individual_report_path = PYP / "individual-pdf-conversion-report.json"
individual_report = json.loads(individual_report_path.read_text(encoding="utf-8")) if individual_report_path.exists() else []

pdf_count = sum(1 for _ in PYP.rglob("*.pdf"))
json_count = sum(1 for _ in PYP.rglob("*.json"))
individual_json_paths = sorted(PYP.glob("*/**/json/individual-pdfs/*.json"))

def live_row(row):
    path = ROOT / row["json_path"]
    if not path.exists():
        return row
    data = json.loads(path.read_text(encoding="utf-8"))
    questions = []
    for chapter in data.get("chapters", []):
        questions.extend(chapter.get("questions", []))
    weak_options = 0
    for question in questions:
        options = question.get("options", [])
        if len(options) != 4 or any(not option or option.startswith("Option ") for option in options):
            weak_options += 1
    updated = dict(row)
    updated["questions"] = len(questions)
    updated["answers_mapped"] = sum(question.get("correct") is not None for question in questions)
    updated["weak_options"] = weak_options
    updated["needs_review"] = updated["answers_mapped"] < len(questions) or weak_options > 0
    return updated

live_conversion_report = [live_row(row) for row in conversion_report]
ready = [row for row in live_conversion_report if not row["needs_review"]]
review = [row for row in live_conversion_report if row["needs_review"]]

def live_individual_row(path):
    data = json.loads(path.read_text(encoding="utf-8"))
    questions = []
    for chapter in data.get("chapters", []):
        questions.extend(chapter.get("questions", []))
    return {
        "json_path": str(path.relative_to(ROOT)).replace("\\", "/"),
        "questions": len(questions),
        "answers_mapped": sum(question.get("correct") is not None for question in questions),
    }

live_individual_report = [live_individual_row(path) for path in individual_json_paths]

summary = {
    "archive_root": str(PYP.relative_to(ROOT)).replace("\\", "/"),
    "pdf_count": pdf_count,
    "json_count": json_count,
    "main_year_subject_json_files": len(live_conversion_report),
    "individual_pdf_json_files": len(live_individual_report),
    "ready_rows": len(ready),
    "needs_review_rows": len(review),
    "total_main_questions": sum(row["questions"] for row in live_conversion_report),
    "total_main_answers_mapped": sum(row["answers_mapped"] for row in live_conversion_report),
    "total_individual_pdf_questions": sum(row["questions"] for row in live_individual_report),
    "total_individual_pdf_answers_mapped": sum(row["answers_mapped"] for row in live_individual_report),
    "needs_review": review,
}

(PYP / "archive-summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")

readme = f"""# CUET Past Year Paper Archive

This folder contains downloaded CUET UG/NTA previous-year PDFs and JSON conversions for Accountancy, Business Studies, Economics, English, and General Test.

## Status

- PDFs saved: {pdf_count}
- JSON files saved: {json_count}
- Main year/subject JSON files: {len(conversion_report)}
- Extra individual-PDF JSON files: {len(individual_report)}
- Main extracted questions: {summary['total_main_questions']}
- Main mapped answers: {summary['total_main_answers_mapped']}
- Ready rows: {len(ready)}
- Rows needing manual review: {len(review)}

## Needs Manual Review

The following rows are valid JSON but source quality is weak, partial, scanned, or memory-based:

"""

for row in review:
    readme += f"- {row['year']} {row['subject']}: {row['questions']} questions, {row['answers_mapped']} answers mapped, file `{row['json_path']}`\n"

readme += """
## Notes

- CUET UG began in 2022, so no NTA CUET UG papers were found for 2020-2021.
- Some downloaded PDFs are memory-based or date/shift-specific rather than full official papers.
- `conversion-report.json` is the main extraction quality report.
- `individual-pdf-conversion-report.json` lists extra JSON files generated from individual PDFs, especially 2025 English shift PDFs.
- `archive-summary.json` is a compact machine-readable summary of the current archive state.
"""

(PYP / "README.md").write_text(readme, encoding="utf-8")
print(json.dumps(summary, indent=2))
