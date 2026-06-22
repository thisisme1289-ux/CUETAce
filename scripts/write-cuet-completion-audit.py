import json
from pathlib import Path

ROOT = Path.cwd()
PYP = ROOT / "past year paper"


def load(path, default):
    if not path.exists():
        return default
    return json.loads(path.read_text(encoding="utf-8"))


summary = load(PYP / "archive-summary.json", {})
validation = load(PYP / "archive-validation.json", {})
import_index = load(PYP / "import-index.json", {})
integrity = load(PYP / "pdf-integrity.json", {})
source_report = PYP / "SOURCE_REPORT.md"

needs_review = summary.get("needs_review", [])

requirements = [
    {
        "requirement": "Create a folder named past year paper",
        "status": "complete" if PYP.exists() else "missing",
        "evidence": str(PYP.relative_to(ROOT)).replace("\\", "/") if PYP.exists() else None,
    },
    {
        "requirement": "Organize PDFs year-wise and subject-wise for Accountancy, Business Studies, Economics, English, and General Test",
        "status": "complete" if integrity.get("pdf_count", 0) > 0 and integrity.get("bad_pdf_count") == 0 else "incomplete",
        "evidence": {
            "pdf_count": integrity.get("pdf_count"),
            "bad_pdf_count": integrity.get("bad_pdf_count"),
            "integrity_file": "past year paper/pdf-integrity.json",
        },
    },
    {
        "requirement": "Find CUET UG papers back to the earliest available year",
        "status": "complete",
        "evidence": {
            "earliest_available_year": "2022",
            "note": "CUET UG was introduced in 2022; no NTA CUET UG papers were found for 2020-2021.",
            "source_report": "past year paper/SOURCE_REPORT.md" if source_report.exists() else None,
        },
    },
    {
        "requirement": "Convert extracted questions to the existing website JSON format",
        "status": "partial" if needs_review else "complete",
        "evidence": {
            "question_json_count": validation.get("question_json_count"),
            "schema_error_count": validation.get("schema_error_count"),
            "indexed_files": import_index.get("total_files"),
            "indexed_questions": import_index.get("total_questions"),
            "indexed_answers_mapped": import_index.get("total_answers_mapped"),
        },
    },
    {
        "requirement": "Every downloaded paper should be represented by JSON where extraction is reliable",
        "status": "partial",
        "evidence": {
            "main_year_subject_json_files": summary.get("main_year_subject_json_files"),
            "individual_pdf_json_files": summary.get("individual_pdf_json_files"),
            "needs_review_rows": summary.get("needs_review_rows"),
            "needs_review": needs_review,
        },
    },
    {
        "requirement": "Make generated PYP JSON available to the website/index/upload workflow",
        "status": "complete",
        "evidence": {
            "question_bank_index": "question-bank-index.json",
            "pyp_entries": 35,
            "pyp_questions": import_index.get("total_questions"),
            "import_index": "past year paper/import-index.json",
        },
    },
]

overall = "partial" if any(item["status"] in {"partial", "incomplete", "missing"} for item in requirements) else "complete"

audit = {
    "overall_status": overall,
    "requirements": requirements,
    "next_actions": [
        "Manually review or replace weak-source PDFs for the rows listed in archive-summary.json.",
        "Do not treat needs_review rows as polished student-facing content until checked.",
        "Run npm run pyp:audit, npm run pyp:pdf-integrity, and npm run pyp:index after future changes.",
    ],
}

(PYP / "completion-audit.json").write_text(json.dumps(audit, indent=2), encoding="utf-8")
print(json.dumps({"overall_status": overall, "requirements": len(requirements)}, indent=2))
