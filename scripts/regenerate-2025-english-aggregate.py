import json
import re
from pathlib import Path

from pypdf import PdfReader

ROOT = Path.cwd()
PYP = ROOT / "past year paper"
PDF_DIR = PYP / "2025" / "english" / "pdf" / "collegedunia-date-pages"
OUT = PYP / "2025" / "english" / "json" / "2025-english.json"


def clean(text):
    text = text.replace("\u00a0", " ").replace("Ã‚", "")
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def pdf_text(path):
    reader = PdfReader(str(path))
    return "\n".join(page.extract_text() or "" for page in reader.pages)


def letter_to_index(value):
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


def english_score(text):
    return len(re.findall(r"[A-Za-z]", text))


def parse_path(path):
    text = clean(pdf_text(path))
    markers = [
        (int(match.group(1)), match.start())
        for match in re.finditer(r"(?<!\d)([1-9]|[1-4]\d|50)\.\s+", text)
    ]
    questions = []
    for index, (qno, start) in enumerate(markers):
        end = markers[index + 1][1] if index + 1 < len(markers) else len(text)
        block = clean(text[start:end])
        if "Correct Answer" not in block:
            continue
        before_answer = re.split(r"\bCorrect\s+Answer\s*:", block, maxsplit=1, flags=re.I)[0]
        option_matches = list(re.finditer(
            r"\(([1-4A-Da-d])\)\s*(.*?)(?=\s*\([1-4A-Da-d]\)|\Z)",
            before_answer,
            re.S,
        ))
        if len(option_matches) < 4:
            continue
        option_matches = option_matches[:4]
        question = clean(before_answer[:option_matches[0].start()])
        question = clean(re.sub(r"^\d{1,2}\.\s*", "", question))
        options = [clean(match.group(2)) for match in option_matches]
        correct_match = re.search(r"Correct\s+Answer\s*:\s*\(?([1-4A-Da-d])\)?", block, re.I)
        correct = letter_to_index(correct_match.group(1)) if correct_match else None
        if correct is None or english_score(question) < 8:
            continue
        solution_match = re.search(r"\bSolution\s*:\s*(.*)", block, re.I | re.S)
        explanation = clean(solution_match.group(1))[:1200] if solution_match else "Extracted from CUET English 2025 solution PDF."
        questions.append({
            "type": "mcq",
            "level": "L2",
            "difficulty": "medium",
            "question": question,
            "options": options,
            "correct": correct,
            "explanation": explanation,
            "source": f"Combined Collegedunia 2025 English solution PDF: {path.name}",
        })
    return questions


combined = []
seen = set()
for pdf in sorted(PDF_DIR.glob("*solutions.pdf")):
    for question in parse_path(pdf):
        key = re.sub(r"[^a-z0-9]+", "", question["question"].lower())[:160]
        if key in seen:
            continue
        seen.add(key)
        combined.append(question)

combined = combined[:50]
for index, question in enumerate(combined, 1):
    question["id"] = f"101-2025-Q{index:02d}"

data = {
    "subject": "English",
    "subject_code": "101",
    "year": "2025",
    "total_questions": len(combined),
    "chapters": [{
        "chapter_id": "1012025",
        "chapter": "English CUET 2025 Past Year Paper",
        "questions": combined,
    }],
}

OUT.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps({
    "json_path": str(OUT.relative_to(ROOT)).replace("\\", "/"),
    "questions": len(combined),
    "answers_mapped": sum(q["correct"] is not None for q in combined),
}, indent=2))
