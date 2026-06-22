import json
from pathlib import Path

ROOT = Path.cwd()
PYP = ROOT / "past year paper"


def load_json(path, default):
    if not path.exists():
        return default
    return json.loads(path.read_text(encoding="utf-8"))


aglasem_manifest = load_json(PYP / "manifest.json", {})
collegedunia_html = load_json(PYP / "alternate sources" / "collegedunia" / "html" / "manifest.json", [])
collegedunia_pdfs = load_json(PYP / "alternate sources" / "collegedunia" / "pdf-manifest.json", [])
careerindia_pdfs = load_json(PYP / "alternate sources" / "careerindia-pdf-manifest.json", [])
summary = load_json(PYP / "archive-summary.json", {})
validation = load_json(PYP / "archive-validation.json", {})
aakash_pdfs = sorted((PYP / "alternate sources" / "aakash").glob("*.pdf"))

lines = [
    "# CUET Past Year Paper Sources",
    "",
    "This archive collects CUET UG/NTA past-year paper PDFs and generated question JSON for Accountancy, Business Studies, Economics, English, and General Test.",
    "",
    "## Important Scope Note",
    "",
    "- CUET UG was introduced in 2022, so no NTA CUET UG papers were found for 2020 or 2021.",
    "- Some public PDFs are official-looking full papers; others are memory-based, date/shift-specific, scanned, or partial.",
    "- Rows marked `needs_review` in `archive-summary.json` are valid JSON but should not be treated as polished student-facing content without manual cleanup.",
    "",
    "## Current Counts",
    "",
    f"- PDFs: {summary.get('pdf_count', validation.get('pdf_count', 'unknown'))}",
    f"- Question JSON files: {validation.get('question_json_count', 'unknown')}",
    f"- Main extracted questions: {summary.get('total_main_questions', 'unknown')}",
    f"- Main mapped answers: {summary.get('total_main_answers_mapped', 'unknown')}",
    f"- Individual-PDF extracted questions: {summary.get('total_individual_pdf_questions', 'unknown')}",
    "",
    "## Remaining Manual Review",
    "",
]

for item in summary.get("needs_review", []):
    year = item.get("year", "unknown")
    subject = item.get("subject", "unknown")
    questions = item.get("questions", "unknown")
    answers = item.get("answers_mapped", "unknown")
    weak = item.get("weak_options", "unknown")
    missing = item.get("missing_answers", "unknown")
    lines.append(
        f"- {year} {subject}: {questions} questions, {answers} mapped answers, "
        f"{missing} missing answers, {weak} weak-option items."
    )

if not summary.get("needs_review"):
    lines.append("- None.")

lines += [
    "",
    "### Review Notes",
    "",
    "- 2022 Business Studies: clean public SET 36 PDFs from CareerIndia/CollegeDekho have malformed or empty embedded text for many question/option cells. OCR recovers text, but the available answer mapping does not align with that SET, so this paper needs a matching official answer key or manual subject review.",
    "- 2022 General Test: question/options were recovered from public PDFs, but the available solution PDF is partial. Only answers that could be mapped from source solution text are populated; unresolved items need a full SET 22 answer key or manual review.",
    "- 2025 Accountancy individual Collegedunia solution PDF: options and answer labels are extracted, but at least one source item contains a visible mismatch between the labelled answer and the displayed option text. The JSON preserves the source's answer label and should be reviewed before high-stakes use.",
    "",
    "## Primary Source Pages",
    "",
    "### AglaSem",
    "",
]

seen = set()
aglasem_sources = aglasem_manifest.get("sources", []) if isinstance(aglasem_manifest, dict) else aglasem_manifest
aglasem_papers = aglasem_manifest.get("papers", []) if isinstance(aglasem_manifest, dict) else []
for item in aglasem_sources:
    url = item if isinstance(item, str) else item.get("source_page") or item.get("url")
    if url and url not in seen:
        lines.append(f"- {url}")
        seen.add(url)

lines += ["", "### AglaSem Subject Paper Pages", ""]
seen.clear()
for item in aglasem_papers:
    url = item.get("source_page") or item.get("docs_url") or item.get("pdf_url")
    if url and url not in seen:
        year = item.get("year", "")
        subject = item.get("subject", "")
        lines.append(f"- {year} {subject}: {url}")
        seen.add(url)

lines += ["", "### Collegedunia HTML Pages", ""]
seen.clear()
for item in collegedunia_html:
    url = item.get("url")
    if url and url not in seen:
        year = item.get("year", "")
        subject = item.get("subject", "")
        lines.append(f"- {year} {subject}: {url}")
        seen.add(url)

lines += ["", "### Downloaded Collegedunia PDF URLs", ""]
seen.clear()
for item in collegedunia_pdfs:
    url = item.get("url")
    if url and url not in seen:
        year = item.get("year", "")
        subject = item.get("subject", "")
        lines.append(f"- {year} {subject}: {url}")
        seen.add(url)

lines += ["", "### Downloaded CareerIndia PDF URLs", ""]
seen.clear()
for item in careerindia_pdfs:
    url = item.get("url")
    if url and url not in seen:
        year = item.get("year", "")
        subject = item.get("subject", "")
        lines.append(f"- {year} {subject}: {url}")
        seen.add(url)

lines += ["", "### Downloaded Aakash PDF Files", ""]
for path in aakash_pdfs:
    lines.append(f"- {path.relative_to(ROOT).as_posix()}")

lines += [
    "",
    "## Reproducible Commands",
    "",
    "Run from the repository root:",
    "",
    "```powershell",
    "npm run pyp:fetch",
    "npm run pyp:ocr",
    "npm run pyp:convert",
    "npm run pyp:index",
    "npm run pyp:audit",
    "```",
    "",
    "For a faster refresh after PDFs/OCR already exist:",
    "",
    "```powershell",
    "npm run pyp:refresh-fast",
    "```",
    "",
]

(PYP / "SOURCE_REPORT.md").write_text("\n".join(lines), encoding="utf-8")
print(f"Wrote {(PYP / 'SOURCE_REPORT.md').relative_to(ROOT)}")
