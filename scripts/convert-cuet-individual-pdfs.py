import json
import re
from pathlib import Path

from pypdf import PdfReader

ROOT = Path.cwd()
PYP = ROOT / "past year paper"

SUBJECTS = {
    "accountancy": ("Accountancy", "301"),
    "business-studies": ("Business Studies", "305"),
    "economics": ("Economics", "309"),
    "english": ("English", "101"),
    "general-test": ("General Test", "501"),
}

EXCLUDED_PDF_STEMS = {
    # Scraped from a Collegedunia Economics page, but the PDF itself is Environmental Science.
    "2025-economics-02-question-paper",
    # Text extraction interleaves General Test questions, solutions, and quick tips across items.
    "2024-general-test-03-question-paper",
    "2024-general-test-06-solutions",
    "2024-general-test-09-solutions",
    "2024-general-test-11-solutions",
    "2025-general-test-02-question-paper",
}


def clean(text):
    text = text.replace("\u00a0", " ")
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def pdf_text(path):
    reader = PdfReader(str(path))
    return "\n".join(page.extract_text() or "" for page in reader.pages)


def letter_to_index(value):
    if not value:
        return None
    value = value.strip().upper()
    if value in {"1", "A"}:
        return 0
    if value in {"2", "B"}:
        return 1
    if value in {"3", "C"}:
        return 2
    if value in {"4", "D"}:
        return 3
    return None


def find_question_markers(text, limit=50):
    markers = []
    search_from = 0
    for qno in range(1, limit + 1):
        match = re.search(rf"(?<!\d){qno}\.\s+", text[search_from:])
        if not match:
            continue
        start = search_from + match.start()
        markers.append((qno, start))
        search_from = search_from + match.end()
    return markers


def find_all_numbered_markers(text, limit=50):
    return [
        (int(match.group(1)), match.start())
        for match in re.finditer(rf"(?<!\d)([1-9]|[1-4]\d|{limit})\.\s+", text)
    ]


def parse_inline_pdf(year, subject_key, path):
    text = clean(pdf_text(path))
    if "wrong answer" in text:
        text = text.split("wrong answer", 1)[1]
    markers = (
        find_all_numbered_markers(text)
        if path.stem in {"2025-business-studies-15-may-solutions"}
        else find_question_markers(text)
    )
    questions = []
    for i, (qno, start) in enumerate(markers):
        end = markers[i + 1][1] if i + 1 < len(markers) else len(text)
        block = clean(text[start:end])
        option_block = re.split(r"\b(?:Correct\s+Answer|Answer)\s*:", block, maxsplit=1, flags=re.I)[0]
        option_segment_start = 0
        choose_matches = list(re.finditer(
            r"\bChoose\s+(?:the\s+correct\s+answer\s+)?(?:from\s+)?(?:the\s+)?options?\s+given\s+below\s*:?",
            option_block,
            re.I,
        ))
        if choose_matches:
            option_segment_start = choose_matches[-1].end()
        option_segment = option_block[option_segment_start:]
        option_matches = list(re.finditer(
            r"\(([1-4])\)\s*(.*?)(?=\s*\([1-4]\)\s*|\Z)",
            option_segment,
            re.S,
        ))
        if len(option_matches) < 4:
            option_matches = list(re.finditer(
                r"\(([a-d])\)\s*(.*?)(?=\s*\([a-d]\)\s*|\Z)",
                option_segment,
                re.S,
            ))
        if len(option_matches) < 4:
            option_matches = list(re.finditer(
                r"\(([A-Da-d])\)\s*(.*?)(?=\s*\([A-Da-d]\)\s*|\Z)",
                option_segment,
                re.S,
            ))
        if len(option_matches) < 4:
            continue
        option_matches = option_matches[:4]
        first_option_start = option_segment_start + option_matches[0].start()
        question = clean(option_block[:first_option_start])
        question = clean(re.sub(r"^\d{1,2}\.\s*", "", question))
        question = re.sub(r"\b\d+\s*$", "", question).strip()
        options = [clean(match.group(2)) for match in option_matches]
        correct = None
        correct_match = re.search(r"(?:Correct\s+Answer|Answer)\s*:\s*\(?([1-4A-Da-d])\)?", block, re.I)
        if correct_match:
            correct = letter_to_index(correct_match.group(1))
        solution = ""
        solution_match = re.search(r"\bSolution\s*:\s*(.*?)(?:\bQuick\s+Tip\b|\Z)", block, re.I | re.S)
        if solution_match:
            solution = clean(solution_match.group(1))
        if len(re.findall(r"[A-Za-z]", question)) < 8:
            continue
        questions.append({
            "id": f"{SUBJECTS[subject_key][1]}-{year}-{path.stem}-Q{qno:02d}",
            "type": "mcq",
            "level": "L2",
            "difficulty": "medium",
            "question": question,
            "options": options,
            "correct": correct,
            "explanation": solution or ("Extracted from CUET previous year PDF. Detailed solution was not available in this PDF." if correct is None else "Extracted from CUET previous year PDF with answer label."),
            "source": f"Individual PDF extraction: {path.name}",
        })
    return questions


def write_json(year, subject_key, path, questions):
    subject, code = SUBJECTS[subject_key]
    out = {
        "subject": subject,
        "subject_code": code,
        "year": year,
        "paper": path.stem,
        "total_questions": len(questions),
        "chapters": [{
            "chapter_id": f"{code}{year}{re.sub(r'[^A-Za-z0-9]', '', path.stem)[-12:]}",
            "chapter": f"{subject} CUET {year} Past Year Paper - {path.stem}",
            "questions": questions,
        }],
    }
    out_dir = PYP / year / subject_key / "json" / "individual-pdfs"
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / f"{path.stem}.json"
    out_path.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    return out_path


def selected_pdf_paths():
    for subject_key in SUBJECTS:
        pdf_dir = PYP / "2023" / subject_key / "pdf" / "collegedunia"
        yield from sorted(pdf_dir.glob("*.pdf"))
    for subject_key in SUBJECTS:
        pdf_dir = PYP / "2024" / subject_key / "pdf" / "collegedunia"
        yield from sorted(pdf_dir.glob("*.pdf"))
    for subject_key in SUBJECTS:
        yield from sorted((PYP / "2025" / subject_key / "pdf").glob("*/*.pdf"))


report = []
for path in selected_pdf_paths():
    if path.stem in EXCLUDED_PDF_STEMS:
        continue
    try:
        year = path.relative_to(PYP).parts[0]
        subject_key = path.relative_to(PYP).parts[1]
    except (IndexError, ValueError):
        continue
    if subject_key not in SUBJECTS:
        continue
    try:
            questions = parse_inline_pdf(year, subject_key, path)
    except Exception as exc:
        print(f"skip {path.name}: {exc}")
        continue
    if len(questions) < 3:
        continue
    out_path = write_json(year, subject_key, path, questions)
    report.append({
        "year": year,
        "subject": SUBJECTS[subject_key][0],
        "pdf_path": str(path.relative_to(ROOT)).replace("\\", "/"),
        "json_path": str(out_path.relative_to(ROOT)).replace("\\", "/"),
        "questions": len(questions),
        "answers_mapped": sum(q["correct"] is not None for q in questions),
    })
    print(path.name, len(questions), "questions")

(PYP / "individual-pdf-conversion-report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
