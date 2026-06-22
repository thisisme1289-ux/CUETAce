import json
import re
from pathlib import Path
from difflib import SequenceMatcher

from lxml import html as lxml_html
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

SOLUTION_PDF_DIRS = {"collegedunia", "collegedunia-date-pages", "prepp", "collegedekho"}

EXPECTED_MAX = {
    "2022": {"accountancy": 50, "business-studies": 50, "economics": 50, "english": 50, "general-test": 75},
    "2023": {"accountancy": 50, "business-studies": 50, "economics": 50, "english": 50, "general-test": 60},
    "2024": {"accountancy": 50, "business-studies": 50, "economics": 50, "english": 50, "general-test": 60},
    "2025": {"accountancy": 50, "business-studies": 50, "economics": 50, "english": 50, "general-test": 50},
}


def clean(text):
    text = text.replace("\u00a0", " ").replace("Â", "")
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def pdf_text(path):
    reader = PdfReader(str(path))
    return "\n".join(page.extract_text() or "" for page in reader.pages)


def letter_to_index(value):
    if not value:
        return None
    v = value.strip().upper().replace("[", "").replace("]", "")
    if v in {"A", "1"}:
        return 0
    if v in {"B", "8", "2"}:
        return 1
    if v in {"C", "CC", "3"}:
        return 2
    if v in {"D", "0", "O", "DO", "4"}:
        return 3
    return None


def parse_2022_key():
    text = (PYP / "answer keys" / "ocr" / "2022" / "all.txt").read_text(encoding="utf-8", errors="ignore")
    maps = {}
    code_to_key = {code: key for key, (_, code) in SUBJECTS.items()}
    for match in re.finditer(r"Subject:\s*(\d{3})[-–][^\n]+(?P<body>.*?)(?=\n[‘']?Subject:|\Z)", text, re.S):
        code = match.group(1)
        key = code_to_key.get(code)
        if not key:
            continue
        subject_map = {}
        for qid, ans in re.findall(r"\b(\d{4,})\s+(DROP|[A-Da-dO0o8]|\[[14]\]|Cc|Do)\b", match.group("body")):
            if key == "english" and qid.startswith("185"):
                qid = "165" + qid[3:]
            idx = letter_to_index(ans)
            if idx is not None:
                subject_map[qid] = idx
        maps[key] = subject_map
    alt_dir = PYP / "alternate sources" / "collegedunia" / "2022"
    alt_files = {
        "accountancy": alt_dir / "2022-accountancy-answer-key-collegedunia.pdf",
        "economics": alt_dir / "2022-economics-answer-key-collegedunia.pdf",
    }
    for key, path in alt_files.items():
        if not path.exists():
            continue
        alt_text = pdf_text(path)
        clean_map = {}
        for qid, ans in re.findall(r"(?<!\d)(\d{4,})\s+(DROP|[A-D])\b", alt_text):
            idx = letter_to_index(ans)
            if idx is not None:
                clean_map[qid] = idx
        if clean_map:
            maps[key] = clean_map
    return maps


def parse_2023_key():
    text = pdf_text(PYP / "answer keys" / "pdf" / "2023-answer-key.pdf")
    maps = {key: {} for key in SUBJECTS}
    code_to_key = {code: key for key, (_, code) in SUBJECTS.items()}
    for match in re.finditer(r"Subject\s*:\s*([A-Za-z /()]+)\s*\((\d{3})\)(?P<body>.*?)(?=Exam Date|\Z)", text, re.S):
        key = code_to_key.get(match.group(2))
        if not key:
            continue
        for qid, option_id in re.findall(r"\b(\d{6,})\s+(\d{6,})\b", match.group("body")):
            maps[key][qid] = option_id
    return maps


def parse_2025_key():
    text = pdf_text(PYP / "answer keys" / "pdf" / "2025-answer-key.pdf")
    maps = {key: {} for key in SUBJECTS}
    code_to_key = {code: key for key, (_, code) in SUBJECTS.items()}
    for match in re.finditer(r"Subject\s*:\s*(\d{3})\s*-[^\n]+(?P<body>.*?)(?=NATIONAL TESTING AGENCY|\Z)", text, re.S):
        key = code_to_key.get(match.group(1))
        if not key:
            continue
        for qid, ans in re.findall(r"\b(\d{8,})\s+([1-4](?:,[1-4])?)\b", match.group("body")):
            maps[key][qid] = int(ans.split(",")[0]) - 1
    return maps


def parse_2024_key():
    text = pdf_text(PYP / "answer keys" / "pdf" / "2024-answer-key.pdf")
    maps = {key: {} for key in SUBJECTS}
    code_to_key = {code: key for key, (_, code) in SUBJECTS.items()}
    for match in re.finditer(r"Subject\s*:\s*(\d{3})\s*-[^\n]+(?P<body>.*?)(?=Exam Date|\Z)", text, re.S):
        key = code_to_key.get(match.group(1))
        if not key:
            continue
        book_a = re.search(r"Book\s*:\s*A(?P<body>.*?)(?=Q\.NoKey\s*Book\s*:\s*B|Book\s*:\s*B|\Z)", match.group("body"), re.S)
        if not book_a:
            continue
        for qno, ans in re.findall(r"(?m)^\s*(\d{1,2})\s+([1-4](?:,[1-4])?)\s*$", book_a.group("body")):
            maps[key][int(qno)] = int(ans.split(",")[0]) - 1
    return maps


def english_score(text):
    letters = re.findall(r"[A-Za-z]", text)
    return len(letters)


def extract_numbered_options(body):
    body = body.replace("Options :", "Options:").replace("aptions", "Options")
    pre_options = re.split(r"\n\s*Options\s*:?", body, flags=re.I)[0]
    option_matches = list(re.finditer(r"(?m)^\s*([1-4])[\.\)]\s+(.+?)(?=(?:\n\s*[1-4][\.\)]\s+)|\n\s*Options\s*:|\Z)", pre_options, re.S))
    if len(option_matches) < 4:
        option_matches = list(re.finditer(r"(?s)(?:^|\n)\s*\(?([1-4])\)?\s+(.+?)(?=(?:\n\s*\(?[1-4]\)?\s+)|\n\s*Options\s*:|\Z)", pre_options))
    options = []
    for m in option_matches[:4]:
        options.append(clean(m.group(2)))
    first = option_matches[0].start() if option_matches else len(pre_options)
    if len(options) < 4:
        symbol_matches = list(re.finditer(r"(?m)^\s*[Â@©®\(\)mWwUu\"“”']+\s*([^\n]+)$", pre_options))
        symbol_options = [clean(m.group(1)) for m in symbol_matches if clean(m.group(1))]
        if len(symbol_options) >= 4:
            options = symbol_options[:4]
            first = symbol_matches[0].start()
    question = clean(pre_options[:first])
    return question, options


def option_ids(body):
    after = re.split(r"\n\s*Options\s*:?", body, flags=re.I)
    if len(after) < 2:
        return []
    ids = []
    for m in re.finditer(r"\b([0-9D][0-9A-Za-z]{5,})\s*[\.,:]?\s*([1-4])\b", after[1]):
        ids.append((m.group(2), re.sub(r"\D", "", m.group(1))))
    ids = sorted(ids, key=lambda x: x[0])
    return [item[1] for item in ids[:4]]


def parse_cbt_questions(text, year, subject_key, answer_map):
    if year in {"2022", "2023"}:
        q_blocks = parse_q_label_blocks(text, year, subject_key, answer_map)
        if len(q_blocks) > 10:
            return q_blocks

    starts = []
    patterns = [
        r"Question Number\s*:\s*(\d+).*?Question\s*(?:Id|ID|1d|Td|14|IN)\s*[:;]?\s*([0-9]{6,})",
        r"Q\s*(\d{1,2})\b.*?Question\s*(?:Id|ID|1d|IN)\s*[:;]?\s*([0-9]{6,})",
        r"Ques(?:t)?ionD\.?\s*[:;\|\[]+\s*([0-9]{4,})",
    ]
    for pat in patterns:
        for m in re.finditer(pat, text, re.I | re.S):
            if len(m.groups()) == 2:
                qno, qid = m.group(1), m.group(2)
            else:
                qid = m.group(1)
                qno = str(len(starts) + 1)
            starts.append((m.start(), int(re.sub(r"\D", "", qno) or 0), qid))
    starts = sorted(starts, key=lambda item: item[0])
    dedup = []
    seen_positions = set()
    for item in starts:
        bucket = item[0] // 20
        if bucket in seen_positions:
            continue
        seen_positions.add(bucket)
        dedup.append(item)

    by_key = {}
    for i, (pos, qno, qid) in enumerate(dedup):
        end = dedup[i + 1][0] if i + 1 < len(dedup) else len(text)
        block = clean(text[pos:end])
        block = re.sub(r"Question Number\s*:.*?Wrong Marks\s*:\s*1", "", block, flags=re.I | re.S)
        block = re.sub(r"Question Type\s*:.*?(?=\n)", "", block, flags=re.I)
        question, options = extract_numbered_options(block)
        ids = option_ids(block)
        correct = None
        if year == "2023" and qid in answer_map and ids:
            try:
                correct = ids.index(answer_map[qid])
            except ValueError:
                correct = None
        elif year in {"2022", "2025"}:
            correct = answer_map.get(qid)
        if len(options) < 4:
            options = options + [f"Option {n}" for n in range(len(options) + 1, 5)]
        item = {
            "id": f"{SUBJECTS[subject_key][1]}-{year}-Q{qno:02d}",
            "type": "mcq",
            "level": "L2",
            "difficulty": "medium",
            "question": question,
            "options": options[:4],
            "correct": correct,
            "explanation": "Official CUET previous year question. Answer key mapped from the NTA answer key where available.",
            "source_question_id": qid,
            "source": "NTA CUET UG previous year paper via AglaSem PDF OCR",
        }
        dedup_key = qno if year == "2025" else qid
        old = by_key.get(dedup_key)
        if not old or english_score(question + " ".join(options)) > english_score(old["question"] + " ".join(old["options"])):
            by_key[dedup_key] = item
    questions = sorted(by_key.values(), key=lambda q: q["id"])
    for idx, item in enumerate(questions, 1):
        item["id"] = f"{SUBJECTS[subject_key][1]}-{year}-Q{idx:02d}"
    return questions


def parse_q_label_blocks(text, year, subject_key, answer_map):
    starts = list(re.finditer(r"(?m)^\s*Q\s*([0-9]{1,2})\s*(?=\S|\s*$)", text))
    questions = []
    for i, m in enumerate(starts):
        qno = int(m.group(1))
        if not 1 <= qno <= 100:
            continue
        end = starts[i + 1].start() if i + 1 < len(starts) else len(text)
        block = clean(text[m.start():end])
        qid_match = re.search(r"Question\s*(?:ID|Id|1D|IN|1d)\s*[:;]\s*([0-9]{6,})", block, re.I)
        qid = qid_match.group(1) if qid_match else None
        question, options = extract_numbered_options(block)
        question = re.sub(r"^Q\s*\d+\s*", "", question)
        ids = option_ids(block)
        correct = None
        if year == "2023" and qid and qid in answer_map and ids:
            try:
                correct = ids.index(answer_map[qid])
            except ValueError:
                correct = None
        elif year == "2022" and qid:
            correct = answer_map.get(qid)
        if len(options) < 4:
            continue
        questions.append({
            "id": f"{SUBJECTS[subject_key][1]}-{year}-Q{len(questions) + 1:02d}",
            "type": "mcq",
            "level": "L2",
            "difficulty": "medium",
            "question": question,
            "options": options[:4],
            "correct": correct,
            "explanation": "Official CUET previous year question. Answer key mapped from the NTA answer key where available.",
            "source_question_id": qid,
            "source": "NTA CUET UG previous year paper via AglaSem PDF OCR",
        })
    id_questions = parse_question_id_anchored_blocks(text, year, subject_key, answer_map)
    loose_questions = parse_response_sheet_blocks(text, year, subject_key, answer_map)
    forward_questions = parse_forward_response_blocks(text, year, subject_key, answer_map)
    label_questions = parse_2022_question_label_blocks(text, year, subject_key, answer_map) if year == "2022" else []
    best = questions
    for candidate in (id_questions, loose_questions, forward_questions, label_questions):
        if len(candidate) > len(best):
            best = candidate
    return best


def parse_question_id_anchored_blocks(text, year, subject_key, answer_map):
    id_matches = list(re.finditer(r"Question\s*(?:ID|Id|1D|IN|1d)\s*[:;]\s*([0-9]{6,})", text, re.I))
    questions = []
    prev_end = 0
    for i, m in enumerate(id_matches):
        next_start = id_matches[i + 1].start() if i + 1 < len(id_matches) else len(text)
        window_start = max(prev_end, m.start() - 2500)
        q_label = list(re.finditer(r"(?m)^\s*Q\s*([0-9]{1,2})\s*$", text[window_start:m.start()]))
        start = window_start + q_label[-1].start() if q_label else window_start
        block = clean(text[start:next_start])
        qid = m.group(1)
        before_meta = clean(text[start:m.start()])
        question, options = extract_numbered_options(before_meta)
        if len(options) < 4:
            continue
        ids = option_ids(block)
        correct = None
        if year == "2023" and qid in answer_map and ids:
            try:
                correct = ids.index(answer_map[qid])
            except ValueError:
                correct = None
        elif year == "2022":
            correct = answer_map.get(qid)
        questions.append({
            "id": f"{SUBJECTS[subject_key][1]}-{year}-Q{len(questions) + 1:02d}",
            "type": "mcq",
            "level": "L2",
            "difficulty": "medium",
            "question": question,
            "options": options[:4],
            "correct": correct,
            "explanation": "Official CUET previous year question. Answer key mapped from the NTA answer key where available.",
            "source_question_id": qid,
            "source": "NTA CUET UG previous year paper via AglaSem PDF OCR",
        })
        prev_end = m.end()
    return questions


def parse_response_sheet_blocks(text, year, subject_key, answer_map):
    meta_re = re.compile(
        r"(?im)^\s*(?:Ques(?:t)?(?:ion)?\s*(?:ID|Id|1D|IN|1d|0|10|I|D)|Question\s*(?:ID|Id|1D|IN|1d|0|10|I|D))\s*[:;\|\[\],\. ]+\s*([0-9SsaobD]{4,})"
    )
    metas = list(meta_re.finditer(text))
    questions = []
    cursor = 0
    for meta in metas:
        before = text[cursor:meta.start()]
        q_start_candidates = list(re.finditer(r"(?im)^\s*(?:Q\s*[0-9A-Z]{1,3}\b|Question\s*:|Qus?i?e?s?t?i?o?n\s*\|)", before))
        if q_start_candidates:
            before = before[q_start_candidates[-1].start():]
        before = re.sub(r"(?im)^.*(?:Section|Item No|Response|Chosen Option|Status|aglasem\.com).*$", "", before)
        question, options = extract_numbered_options(before)
        if len(options) < 4:
            options = extract_letter_options(before)
        if len(options) < 4:
            options = options + [f"Option {n}" for n in range(len(options) + 1, 5)]
        if english_score(question) < 12:
            cursor = find_after_status(text, meta.end())
            continue
        raw_qid = meta.group(1)
        qid = normalize_ocr_digits(raw_qid)
        ids = option_ids(text[meta.start():find_after_status(text, meta.end())])
        correct = None
        if year == "2023" and qid in answer_map and ids:
            try:
                correct = ids.index(answer_map[qid])
            except ValueError:
                correct = None
        elif year == "2022":
            correct = answer_map.get(qid)
        questions.append({
            "id": f"{SUBJECTS[subject_key][1]}-{year}-Q{len(questions) + 1:02d}",
            "type": "mcq",
            "level": "L2",
            "difficulty": "medium",
            "question": clean(re.sub(r"^Q\s*[0-9A-Z]{1,3}\s*", "", question, flags=re.I)),
            "options": options[:4],
            "correct": correct,
            "explanation": "Official CUET previous year question. Answer key mapped from the NTA answer key where available.",
            "source_question_id": qid,
            "source": "NTA CUET UG previous year paper via AglaSem PDF OCR",
        })
        cursor = find_after_status(text, meta.end())
    return dedupe_question_text(questions)


def find_after_status(text, start):
    match = re.search(r"(?im)^\s*(?:Chosen|Ghasen|Chasen|Ghosen).*?(?:\n|$)", text[start:start + 800])
    if match:
        return start + match.end()
    status = re.search(r"(?im)^\s*Status.*?(?:\n|$)", text[start:start + 800])
    if status:
        return start + status.end()
    return start


def normalize_ocr_digits(value):
    table = str.maketrans({"S": "5", "s": "5", "a": "4", "o": "0", "O": "0", "b": "6", "D": "0"})
    return re.sub(r"\D", "", value.translate(table))


def extract_letter_options(body):
    options = []
    for marker in ["A", "B", "C", "D"]:
        pattern = rf"(?ims)(?:^|\n)\s*{marker}[\.\)]?\s+(.+?)(?=(?:\n\s*[A-D][\.\)]?\s+)|\Z)"
        match = re.search(pattern, body)
        if match:
            options.append(clean(match.group(1)))
    return options


def dedupe_question_text(questions):
    seen = set()
    out = []
    for question in questions:
        key = re.sub(r"[^a-z0-9]+", "", question["question"].lower())[:120]
        if key in seen:
            continue
        seen.add(key)
        question["id"] = f"{question['id'].split('-')[0]}-{question['id'].split('-')[1]}-Q{len(out) + 1:02d}"
        out.append(question)
    return out


def parse_forward_response_blocks(text, year, subject_key, answer_map):
    meta_re = re.compile(
        r"(?im)^\s*(?:Question\s*(?:ID|Id|1D|IN|1d)|Ques(?:t)?ionID|QuegionID|QuesienID|QuesinD|QuesionD)\s*[:;\|\[\],\. ]+\s*([0-9SsaobD]{4,})"
    )
    metas = list(meta_re.finditer(text))
    questions = []
    for i, meta in enumerate(metas):
        end = metas[i + 1].start() if i + 1 < len(metas) else min(len(text), meta.end() + 2200)
        block = clean(text[meta.start():end])
        q_match = re.search(r"(?is)Question\s*[:;\|]\s*(.+?)(?=\n\s*A[\.\s]|\n\s*\(?A\)?\s|\n\s*Answer Given|\Z)", block)
        if not q_match:
            q_match = re.search(r"(?is)(?:Question Type.*?\n)(.+?)(?=\n\s*A[\.\s]|\n\s*\(?A\)?\s|\n\s*Answer Given|\Z)", block)
        if not q_match:
            continue
        question = clean(q_match.group(1))
        options = extract_letter_options(block[q_match.end():])
        if len(options) < 4:
            options = options + [f"Option {n}" for n in range(len(options) + 1, 5)]
        if english_score(question) < 12:
            continue
        qid = normalize_ocr_digits(meta.group(1))
        questions.append({
            "id": f"{SUBJECTS[subject_key][1]}-{year}-Q{len(questions) + 1:02d}",
            "type": "mcq",
            "level": "L2",
            "difficulty": "medium",
            "question": question,
            "options": options[:4],
            "correct": answer_map.get(qid),
            "explanation": "Official CUET previous year question. Answer key mapped from the NTA answer key where available.",
            "source_question_id": qid,
            "source": "NTA CUET UG previous year paper via AglaSem PDF OCR",
        })
    return dedupe_question_text(questions)


def parse_2022_question_label_blocks(text, year, subject_key, answer_map):
    label_re = re.compile(r"(?im)^\s*(?:\[?\s*)?(?:Question|Questien|Qusion|Quin|Qusten|Qusien|Qusinn|Qusien)\s*[:\|\]]?")
    labels = list(label_re.finditer(text))
    questions = []
    ordered_answers = [answer_map[qid] for qid in sorted(answer_map, key=lambda value: int(value))] if answer_map else []
    for i, label in enumerate(labels):
        end = labels[i + 1].start() if i + 1 < len(labels) else min(len(text), label.end() + 1200)
        block = clean(text[label.end():end])
        block = re.sub(r"(?im)^.*(?:Section|Question Type|QuesionD|QuesienD|QuesinD|Item No|aglasem\.com).*$", "", block)
        block = clean(block)
        if english_score(block) < 18:
            continue
        question, options = extract_numbered_options(block)
        if english_score(question) < 10:
            question = clean(re.split(r"\n\s*(?:A[\.\s]|B[\.\s]|\(1\)|1\.)", block, maxsplit=1)[0])
        if len(options) < 4:
            options = extract_letter_options(block)
        if len(options) < 4:
            options = options + [f"Option {n}" for n in range(len(options) + 1, 5)]
        if english_score(question) < 10:
            continue
        questions.append({
            "id": f"{SUBJECTS[subject_key][1]}-{year}-Q{len(questions) + 1:02d}",
            "type": "mcq",
            "level": "L2",
            "difficulty": "medium",
            "question": question,
            "options": options[:4],
            "correct": ordered_answers[len(questions)] if len(questions) < len(ordered_answers) else None,
            "explanation": "Official CUET previous year question extracted from OCR. Answer key could not be mapped confidently for this OCR block.",
            "source": "NTA CUET UG previous year paper via AglaSem PDF OCR",
        })
    questions = dedupe_question_text(questions)
    limit = EXPECTED_MAX.get(year, {}).get(subject_key)
    return questions[:limit] if limit else questions


def parse_booklet_2024(text, subject_key, answer_map):
    candidates = {}
    starts = list(re.finditer(r"(?m)^\s*(\d{1,2})\.\s+", text))
    for i, m in enumerate(starts):
        qno = int(m.group(1))
        if not 1 <= qno <= 50:
            continue
        end = starts[i + 1].start() if i + 1 < len(starts) else len(text)
        block = clean(text[m.start():end])
        if "SPACE FOR ROUGH WORK" in block:
            block = block.split("SPACE FOR ROUGH WORK")[0]
        options = []
        opt_matches = list(re.finditer(r"\(([1-4])\)\s*(.*?)(?=\s*\([1-4]\)|$)", block, re.S))
        for opt in opt_matches[:4]:
            options.append(clean(opt.group(2)))
        question = clean(re.split(r"\(1\)", block, maxsplit=1)[0])
        question = re.sub(r"^\d{1,2}\.\s*", "", question)
        if len(options) < 4:
            options = options + [f"Option {n}" for n in range(len(options) + 1, 5)]
        if english_score(question) < 15:
            continue
        item = {
            "id": f"{SUBJECTS[subject_key][1]}-2024-Q{qno:02d}",
            "type": "mcq",
            "level": "L2",
            "difficulty": "medium",
            "question": question,
            "options": options[:4],
            "correct": answer_map.get(qno),
            "explanation": "Official CUET previous year question. Correct option mapped from NTA Final Answer Key, Book A.",
            "source_question_no": qno,
            "source": "NTA CUET UG previous year paper via AglaSem PDF OCR",
        }
        if qno not in candidates or english_score(question + " ".join(options)) > english_score(candidates[qno]["question"] + " ".join(candidates[qno]["options"])):
            candidates[qno] = item
    return [candidates[k] for k in sorted(candidates)]


def parse_2024_english_collegedekho(answer_map):
    path = PYP / "2024" / "english" / "pdf" / "collegedekho" / "2024-english-set-a-question-paper.pdf"
    if not path.exists():
        return []
    text = pdf_text(path)
    first_question = list(re.finditer(r"(?m)^\s*1\.\s+", text))
    if len(first_question) > 1:
        text = text[first_question[1].start():]
    starts = []
    search_from = 0
    for qno in range(1, 51):
        marker = re.search(rf"(?m)^\s*{qno}\.\s+", text[search_from:])
        if not marker:
            continue
        start = search_from + marker.start()
        starts.append((qno, start))
        search_from = search_from + marker.end()
    questions = []
    for i, (qno, start) in enumerate(starts):
        end = starts[i + 1][1] if i + 1 < len(starts) else len(text)
        block = clean(text[start:end])
        block = re.sub(r"\b101\s+E/A\s+\(\s*\d+\s*\)", "", block)
        block = block.replace("SPACE FOR ROUGH WORK", "")
        option_matches = list(re.finditer(r"\(([1-4])\)\s*(.*?)(?=\s*\([1-4]\)|$)", block, re.S))
        if len(option_matches) < 4:
            continue
        question = clean(block[:option_matches[0].start()])
        question = re.sub(r"^\d{1,2}\.\s*", "", question)
        options = [clean(match.group(2)) for match in option_matches[:4]]
        if english_score(question) < 10:
            continue
        questions.append({
            "id": f"101-2024-Q{qno:02d}",
            "type": "mcq",
            "level": "L2",
            "difficulty": "medium",
            "question": question,
            "options": options,
            "correct": answer_map.get(qno),
            "explanation": "Official CUET previous year question. Correct option mapped from NTA Final Answer Key, Book A.",
            "source_question_no": qno,
            "source": "CUET 2024 English Set A PDF via CollegeDekho",
        })
    return questions


def parse_2025_business_official(answer_map):
    path = PYP / "2025" / "business-studies" / "pdf" / "collegedunia" / "2025-business-studies-official-question-paper.pdf"
    if not path.exists():
        return []
    text = pdf_text(path)
    starts = list(re.finditer(r"Q\.\s*No\.?\s*(\d{1,2})\.?", text))
    ordered_answers = list(answer_map.values())[:50]
    questions = []
    for i, match in enumerate(starts):
        qno = int(match.group(1))
        if not 1 <= qno <= 50:
            continue
        end = starts[i + 1].start() if i + 1 < len(starts) else len(text)
        block = clean(text[match.start():end])
        option_matches = list(re.finditer(r"(?m)^\s*([1-4])\.\s*(.*?)(?=(?:\n\s*[1-4]\.\s*)|\Z)", block, re.S))
        if len(option_matches) < 4:
            continue
        question = clean(block[:option_matches[0].start()])
        question = re.sub(r"^Q\.\s*No\.?\s*\d{1,2}\.?\s*", "", question)
        options = [clean(opt.group(2)) for opt in option_matches[:4]]
        if english_score(question) < 10:
            continue
        questions.append({
            "id": f"305-2025-Q{qno:02d}",
            "type": "mcq",
            "level": "L2",
            "difficulty": "medium",
            "question": question,
            "options": options,
            "correct": ordered_answers[qno - 1] if qno <= len(ordered_answers) else None,
            "explanation": "Official CUET previous year question. Correct option mapped by order from NTA Final Answer Key for Business Studies.",
            "source_question_no": qno,
            "source": "CUET UG 2025 305-Business Studies question paper PDF via Collegedunia",
        })
    return questions


def write_json(year, subject_key, questions):
    subject, code = SUBJECTS[subject_key]
    out = {
        "subject": subject,
        "subject_code": code,
        "year": year,
        "total_questions": len(questions),
        "chapters": [
            {
                "chapter_id": f"{code}{year}",
                "chapter": f"{subject} CUET {year} Past Year Paper",
                "questions": questions,
            }
        ],
    }
    out_dir = PYP / year / subject_key / "json"
    out_dir.mkdir(parents=True, exist_ok=True)
    path = out_dir / f"{year}-{subject_key}.json"
    path.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    return path


def parse_2022_general_solutions():
    path = PYP / "alternate sources" / "collegedunia" / "2022" / "2022-general-test-solutions-collegedunia.pdf"
    if not path.exists():
        return []
    text = pdf_text(path)
    questions = []
    matches = list(re.finditer(r"Question\s*ID:\s*(\d+)", text))
    for i, match in enumerate(matches):
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        block = clean(text[match.end():end])
        parts = re.split(r"\bSolution\s*:", block, maxsplit=1)
        question = clean(parts[0])
        explanation = clean(parts[1]) if len(parts) > 1 else "Solution not available in extracted text."
        if english_score(question) < 12:
            continue
        questions.append({
            "id": f"501-2022-Q{len(questions) + 1:02d}",
            "type": "mcq",
            "level": "L2",
            "difficulty": "medium",
            "question": question,
            "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
            "correct": None,
            "explanation": explanation,
            "source_question_id": match.group(1),
            "source": "NTA CUET UG previous year paper via Collegedunia solutions PDF",
        })
    return questions


def parse_2022_general_solution_lookup():
    path = PYP / "alternate sources" / "collegedunia" / "2022" / "2022-general-test-solutions-collegedunia.pdf"
    if not path.exists():
        return {}
    text = pdf_text(path)
    lookup = {}
    matches = list(re.finditer(r"Question\s*ID:\s*(\d+)", text))
    for i, match in enumerate(matches):
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        block = clean(text[match.end():end])
        parts = re.split(r"\bSolution\s*:", block, maxsplit=1)
        lookup[match.group(1)] = {
            "question": clean(parts[0]),
            "explanation": clean(parts[1]) if len(parts) > 1 else "",
        }
    return lookup


def compact_for_match(text):
    return re.sub(r"[^a-z0-9]+", "", text.lower())


def split_compact_numbered_options(text):
    markers = list(re.finditer(r"([1-4])[\.)]", text))
    if len(markers) < 4:
        return text, []
    for index in range(len(markers) - 3):
        sequence = markers[index:index + 4]
        if [marker.group(1) for marker in sequence] != ["1", "2", "3", "4"]:
            continue
        question = text[:sequence[0].start()]
        options = []
        for opt_index, marker in enumerate(sequence):
            end = sequence[opt_index + 1].start() if opt_index + 1 < len(sequence) else len(text)
            options.append(clean(text[marker.end():end]))
        return clean(question), options
    return text, []


def infer_correct_from_solution(solution, options):
    compact_solution = compact_for_match(solution)
    flat_solution = re.sub(r"\s+", "", solution.lower())
    direct = re.search(r"(?:the)?correct(?:option|answer)is:?\(?([1-4])\)?", compact_solution)
    if direct:
        return int(direct.group(1)) - 1
    answer_tail = None
    tail_match = re.search(r"(?:therefore)?(?:the)?correct(?:rearrangement|answer|option)?(?:is|is:)([a-z0-9,.-]+)", compact_solution)
    if tail_match:
        answer_tail = tail_match.group(1)[:80]
    best_index = None
    best_score = 0
    generic_tokens = {
        "the", "and", "with", "from", "that", "this", "only", "bill", "bills",
        "committee", "question", "option", "answer", "given", "below",
    }

    def option_token(value):
        token = compact_for_match(value)
        if token.endswith("ional"):
            token = token[:-5] + "ion"
        elif token.endswith("al") and len(token) > 6:
            token = token[:-2]
        elif token.endswith("s") and len(token) > 5:
            token = token[:-1]
        return token

    for index, option in enumerate(options):
        compact_option = compact_for_match(option)
        score = 0
        flat_option = re.sub(r"[^a-z0-9%+\-]+", "", option.lower())
        if len(flat_option) <= 8 and flat_option and flat_option in flat_solution:
            score = max(score, len(flat_option) + 30)
        if len(compact_option) < 4 and not score:
            continue
        if answer_tail and (compact_option in answer_tail or answer_tail.startswith(compact_option[: min(len(compact_option), 24)])):
            score = max(score, len(compact_option) + 20)
        if compact_option in compact_solution:
            score = max(score, len(compact_option))
        if not score and len(compact_option) >= 10:
            words = [compact_for_match(word) for word in re.findall(r"[A-Za-z0-9]+", option) if len(word) > 2]
            if words and all(word.rstrip("s") in compact_solution for word in words):
                score = max(score, sum(len(word) for word in words))
        raw_tokens = [option_token(word) for word in re.findall(r"[A-Za-z][A-Za-z]+", option)]
        tokens = [token for token in raw_tokens if len(token) >= 4 and token not in generic_tokens]
        if tokens:
            hits = [token for token in tokens if token in compact_solution]
            if hits and (len(hits) >= 2 or len(tokens) == 1 or len(hits) / len(tokens) >= 0.5):
                score = max(score, 18 + sum(len(token) for token in hits))
        if not score and len(compact_option) >= 12:
            for match in re.finditer(r"[A-Za-z0-9][A-Za-z0-9 ]{6,80}", solution):
                candidate = compact_for_match(match.group(0))
                ratio = SequenceMatcher(None, compact_option, candidate).ratio()
                if ratio >= 0.88:
                    score = max(score, int(ratio * len(compact_option)))
        if not score and len(compact_option) > 40:
            prefix = compact_option[:40]
            score = len(prefix) if prefix in compact_solution else 0
        if score > best_score:
            best_index = index
            best_score = score
    return best_index


def careerindia_option_marker(line):
    compact = re.sub(r"[^A-Za-z]+", "", line).upper()
    if compact in {"A", "B", "C", "D"}:
        return compact
    if line.strip().lower().startswith("[a]"):
        return "A"
    if line.strip().upper().startswith("EN"):
        return "B"
    if line.strip().lower().startswith("[ec]") or line.strip().lower().startswith("[c]"):
        return "C"
    if line.strip().upper().startswith("EE") or line.strip().lower().startswith("bo]"):
        return "D"
    match = re.match(r"^\s*([A-Da-d])\s*[:\]\)]?\s+(.+)$", line)
    if match:
        return match.group(1).upper()
    match = re.match(r"^\s*(?:\|+\s*)?\(?([1-4])[\.\)]\s+(.+)$", line)
    if match:
        return "ABCD"[int(match.group(1)) - 1]
    return None


def strip_careerindia_marker(line):
    value = re.sub(r"^\s*(?:\|+\s*)?(?:[A-Da-d]|\(?[1-4])\s*[:\]\)]?\s+", "", line).strip()
    value = re.sub(r"^\s*\[(?:a|A|c|C|ec|EC)\]\s*", "", value).strip()
    value = re.sub(r"^\s*(?:EN|EE|bo\])\s*", "", value).strip()
    return clean(value)


def extract_careerindia_numbered_options(body):
    normalized = re.sub(r"\n+", " ", body)
    normalized = re.sub(r"\s+", " ", normalized)
    numbered = list(re.finditer(r"(?:^|\s)\(?([1-4])[\.)]\s+", normalized))
    for index in range(len(numbered) - 3):
        sequence = numbered[index:index + 4]
        if [item.group(1) for item in sequence] != ["1", "2", "3", "4"]:
            continue
        question = clean(normalized[:sequence[0].start()])
        options = []
        for opt_index, marker in enumerate(sequence):
            end = sequence[opt_index + 1].start() if opt_index + 1 < len(sequence) else len(normalized)
            options.append(clean(normalized[marker.end():end]))
        options = [re.sub(r"\s*(?:A|B|C|D)\s*:\s*[1-4]\s*$", "", option).strip() for option in options]
        return question, options[:4]
    return "", []


def parse_careerindia_ocr(year, subject_key, answer_map):
    path = PYP / year / subject_key / "ocr" / "careerindia" / "all.txt"
    if not path.exists():
        return []
    text = path.read_text(encoding="utf-8", errors="ignore")
    starts = list(re.finditer(r"(?m)^\s*Item\s*No\s*:\s*\|*\s*(\d{1,3})\s*$", text, re.I))
    questions = []
    general_lookup = parse_2022_general_solution_lookup() if year == "2022" and subject_key == "general-test" else {}
    for index, start in enumerate(starts):
        end = starts[index + 1].start() if index + 1 < len(starts) else len(text)
        block = clean(text[start.start():end])
        qno = int(start.group(1))
        qid_match = re.search(r"Question\s*(?:ID|1D)?\s*:?\s*\|*\s*(\d{5,})", block, re.I)
        if not qid_match:
            qid_match = re.search(r"Question\s+(\d{5,})", block)
        if not qid_match:
            continue
        qid = qid_match.group(1)
        after_type = re.split(r"Question\s*Type\s*:\s*\|*\s*MCQ", block, flags=re.I, maxsplit=1)
        body = after_type[1] if len(after_type) > 1 else block[qid_match.end():]
        body = re.sub(r"^Question\s*:\s*", "", body.strip(), flags=re.I)
        body = body.replace("iestion:", "Question:").replace("Questor", "Question:")
        numbered_question, numbered_options = extract_careerindia_numbered_options(body)
        lines = [line.strip() for line in body.splitlines() if line.strip()]
        question_lines = []
        options = []
        current_option = None
        for line in lines:
            if re.match(r"^={3,}\s*PAGE", line) or line.lower().startswith("section:"):
                continue
            marker = careerindia_option_marker(line)
            if marker:
                if current_option is not None:
                    options.append(clean(current_option))
                current_option = strip_careerindia_marker(line)
                continue
            if current_option is not None:
                if re.match(r"^(?:Question\s*:|Choose\s+the\s+correct|Match\s+List)", line, re.I):
                    question_lines.append(clean(re.sub(r"^Question\s*:\s*", "", line, flags=re.I)))
                else:
                    current_option = clean(f"{current_option} {line}")
            else:
                question_lines.append(clean(re.sub(r"^Question\s*:\s*", "", line, flags=re.I)))
        if current_option is not None:
            options.append(clean(current_option))
        options = [option for option in options if option][:4]
        question_text = clean(" ".join(question_lines))
        if len(numbered_options) >= 4 and english_score(numbered_question) >= 8:
            question_text = numbered_question
            options = numbered_options[:4]
        question_text = re.sub(r"\s+", " ", question_text)
        if len(options) < 4 or english_score(question_text) < 8:
            continue
        explanation = "Official CUET previous year question. Answer key mapped from the NTA answer key where available."
        correct = answer_map.get(qid)
        if subject_key == "general-test":
            solution = general_lookup.get(qid, {})
            if solution.get("explanation"):
                explanation = solution["explanation"][:1200]
            inferred = infer_correct_from_solution(" ".join(solution.values()), options) if solution else None
            if inferred is not None:
                correct = inferred
        questions.append({
            "id": f"{SUBJECTS[subject_key][1]}-{year}-Q{qno:02d}",
            "type": "mcq",
            "level": "L2",
            "difficulty": "medium",
            "question": question_text,
            "options": options,
            "correct": correct,
            "explanation": explanation,
            "source_question_id": qid,
            "source": "CareerIndia CUET PDF OCR with NTA/solution answer mapping",
        })
    limit = EXPECTED_MAX.get(year, {}).get(subject_key)
    return sorted(questions[:limit], key=lambda q: q["id"]) if limit else sorted(questions, key=lambda q: q["id"])


def parse_questionid_solution_pdf(year, subject_key):
    pdf_dir = PYP / year / subject_key / "pdf"
    paths = sorted(p for p in pdf_dir.glob("*/*.pdf") if p.parent.name in SOLUTION_PDF_DIRS)
    best = []
    for path in paths:
        try:
            text = pdf_text(path)
        except Exception:
            continue
        matches = list(re.finditer(r"QuestionID:\s*(\d+)\s*Q\.", text))
        if len(matches) < 10:
            continue
        parsed = []
        for index, match in enumerate(matches):
            end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
            block = text[match.end():end]
            parts = re.split(r"\bSolutions?:", block, maxsplit=1)
            before_solution = parts[0]
            explanation = clean(parts[1])[:1200] if len(parts) > 1 else "Solution not available in extracted text."
            question_text, options = split_compact_numbered_options(before_solution)
            if len(options) < 4 or english_score(question_text) < 8:
                continue
            correct = infer_correct_from_solution(explanation, options)
            parsed.append({
                "id": f"{SUBJECTS[subject_key][1]}-{year}-Q{len(parsed) + 1:02d}",
                "type": "mcq",
                "level": "L2",
                "difficulty": "medium",
                "question": question_text,
                "options": options[:4],
                "correct": correct,
                "explanation": explanation or "Official CUET previous year question with solution.",
                "source_question_id": match.group(1),
                "source": f"Collegedunia question-id solution PDF: {path.name}",
            })
        if (
            len(parsed) > len(best)
            or sum(q.get("correct") is not None for q in parsed) > sum(q.get("correct") is not None for q in best)
        ):
            best = parsed
    limit = EXPECTED_MAX.get(year, {}).get(subject_key)
    return best[:limit] if limit else best


def parse_ques_solution_pdf(year, subject_key):
    pdf_dir = PYP / year / subject_key / "pdf"
    paths = sorted(p for p in pdf_dir.glob("*/*.pdf") if p.parent.name in SOLUTION_PDF_DIRS)
    best = []
    for path in paths:
        try:
            text = pdf_text(path)
        except Exception:
            continue
        markers = list(re.finditer(r"Ques\s*(\d{1,3})\.", text))
        if len(markers) < 10 or "Solu." not in text:
            continue
        parsed = []
        for index, marker in enumerate(markers):
            end = markers[index + 1].start() if index + 1 < len(markers) else len(text)
            block = text[marker.end():end]
            parts = re.split(r"\bSolu\.", block, maxsplit=1)
            if len(parts) < 2:
                continue
            before_solution = clean(parts[0])
            explanation = clean(parts[1])[:1200]
            question_text, options = split_compact_numbered_options(before_solution)
            if len(options) < 4 or english_score(question_text) < 8:
                continue
            correct = infer_correct_from_solution(explanation, options)
            parsed.append({
                "id": f"{SUBJECTS[subject_key][1]}-{year}-Q{len(parsed) + 1:02d}",
                "type": "mcq",
                "level": "L2",
                "difficulty": "medium",
                "question": question_text,
                "options": options[:4],
                "correct": correct,
                "explanation": explanation or "CUET previous year question with solution.",
                "source_question_no": int(marker.group(1)),
                "source": f"Collegedunia Ques/Solu PDF: {path.name}",
            })
        if (
            len(parsed) > len(best)
            or sum(q.get("correct") is not None for q in parsed) > sum(q.get("correct") is not None for q in best)
        ):
            best = parsed
    limit = EXPECTED_MAX.get(year, {}).get(subject_key)
    return best[:limit] if limit else best


def parse_collegedunia_html(year, subject_key):
    path = PYP / "alternate sources" / "collegedunia" / "html" / f"{year}-{subject_key}.html"
    if not path.exists():
        return []
    raw = path.read_text(encoding="utf-8", errors="ignore")
    doc = lxml_html.fromstring(raw)
    text = "\n".join(t.strip() for t in doc.xpath("//body//*[not(self::script) and not(self::style)]/text()") if t.strip())
    marker = "Questions with Solutions"
    start = text.find(marker)
    if start >= 0:
        text = text[start + len(marker):]
    blocks = list(re.finditer(r"(?m)^Question\s+(\d+):\s*$", text))
    questions = []
    for i, match in enumerate(blocks):
        qno = int(match.group(1))
        end = blocks[i + 1].start() if i + 1 < len(blocks) else len(text)
        block = clean(text[match.end():end])
        block = block.split("Fees Structure")[0]
        if not block or "View Solution" not in block and "Correct Answer" not in block:
            continue
        before_solution = re.split(r"\n\s*(?:Correct Answer:|View Solution)\s*", block, maxsplit=1)[0]
        option_matches = list(re.finditer(r"(?m)^\(([1-4A-Da-d])\)\s*(.+)$", before_solution))
        options = [clean(m.group(2)) for m in option_matches[:4]]
        if len(options) < 4:
            continue
        question_text = clean(before_solution[:option_matches[0].start()])
        if english_score(question_text) < 8:
            continue
        correct = None
        correct_match = re.search(r"Correct Answer:\s*\n?\(([1-4A-Da-d])\)", block)
        if correct_match:
            value = correct_match.group(1).upper()
            correct = "1234ABCD".find(value)
            if correct >= 4:
                correct -= 4
        explanation = "Official CUET previous year question from Collegedunia solution page."
        solution_split = re.split(r"\bView Solution\b", block, maxsplit=1)
        if len(solution_split) > 1 and clean(solution_split[1]):
            explanation = clean(solution_split[1])[:1200]
        questions.append({
            "id": f"{SUBJECTS[subject_key][1]}-{year}-Q{qno:02d}",
            "type": "mcq",
            "level": "L2",
            "difficulty": "medium",
            "question": question_text,
            "options": options[:4],
            "correct": correct,
            "explanation": explanation,
            "source": "Collegedunia CUET question-with-solutions HTML page",
        })
    limit = EXPECTED_MAX.get(year, {}).get(subject_key)
    return questions[:limit] if limit else questions


def parse_collegedunia_solution_pdf(year, subject_key):
    pdf_dir = PYP / year / subject_key / "pdf"
    paths = sorted(p for p in pdf_dir.glob("*/*.pdf") if p.parent.name in SOLUTION_PDF_DIRS)
    best = []
    for path in paths:
        try:
            text = pdf_text(path)
        except Exception:
            continue
        if "Correct Answer" not in text:
            continue
        limit = EXPECTED_MAX.get(year, {}).get(subject_key, 75)

        def parse_marker_sequence(markers):
            parsed = []
            for i, match in enumerate(markers):
                end = markers[i + 1].start() if i + 1 < len(markers) else len(text)
                block = clean(text[match.start():end])
                if "Correct Answer" not in block:
                    continue
                before_answer = re.split(r"Correct Answer\s*:", block, maxsplit=1)[0]
                option_pattern = (
                    r"(?m)^\s*(?:\(([1-4A-Da-d])\)|([1-4A-Da-d])\.)\s*(.+?)(?=(?:\n\s*(?:\([1-4A-Da-d]\)|[1-4A-Da-d]\.))|\nCorrect Answer|\Z)"
                    if re.match(r"^\s*Q", block)
                    else r"(?m)^\s*\(([1-4A-Da-d])\)\s*(.+?)(?=(?:\n\s*\([1-4A-Da-d]\))|\nCorrect Answer|\Z)"
                )
                option_matches = list(re.finditer(
                    option_pattern,
                    before_answer,
                    re.S,
                ))
                option_group = 3 if re.match(r"^\s*Q", block) else 2
                if len(option_matches) < 4:
                    option_matches = list(re.finditer(
                        r"(?:\(([1-4A-Da-d])\)|([1-4A-Da-d])\.)\s*(.+?)(?=\s*(?:\([1-4A-Da-d]\)|[1-4A-Da-d]\.)|\s*Correct Answer|\Z)",
                        before_answer,
                        re.S,
                    ))
                    option_group = 3
                if len(option_matches) < 4:
                    continue
                question_head = clean(before_answer[:option_matches[0].start()])
                question_text = clean(re.sub(r"^\s*(?:Q(?:\.\s*No\.?)?\s*)?\d{1,3}\.?\s*", "", question_head))
                if english_score(question_text) < 8:
                    continue
                options = [clean(m.group(option_group)) for m in option_matches[:4]]
                correct_match = re.search(r"Correct Answer\s*:\s*\(?([1-4A-Da-d])\)?", block)
                correct = None
                if correct_match:
                    value = correct_match.group(1).upper()
                    correct = "1234ABCD".find(value)
                    if correct >= 4:
                        correct -= 4
                explanation = "Official CUET previous year question with solution."
                solution_match = re.search(r"Solution\s*:\s*(.*)", block, re.S)
                if solution_match:
                    explanation = clean(solution_match.group(1))[:1200]
                parsed.append({
                    "id": f"{SUBJECTS[subject_key][1]}-{year}-Q{len(parsed) + 1:02d}",
                    "type": "mcq",
                    "level": "L2",
                    "difficulty": "medium",
                    "question": question_text,
                    "options": options,
                    "correct": correct,
                    "explanation": explanation,
                    "source": f"Collegedunia solution PDF: {path.name}",
                })
            return parsed

        q_markers = list(re.finditer(r"(?m)(?:^|\n)\s*Q(?:\.\s*No\.?)?\s*(\d{1,2})\.?", text))
        if len(q_markers) >= 20:
            raw_markers = q_markers
            markers = []
            search_from = 0
            for expected in range(1, limit + 1):
                marker = next((m for m in raw_markers if m.start() >= search_from and int(m.group(1)) == expected), None)
                if marker is not None:
                    markers.append(marker)
                    search_from = marker.end()
        else:
            raw_markers = list(re.finditer(r"(?m)^\s*(\d{1,3})\.\s+", text))
            marker_numbers = [int(m.group(1)) for m in raw_markers]
            high_starts = [n for n in marker_numbers if n > 100]
            if len(high_starts) >= 20:
                first_qno = min(high_starts)
                expected_numbers = range(first_qno, first_qno + limit)
                markers = []
                search_from = 0
                for expected in expected_numbers:
                    marker = next(
                        (
                            m
                            for m in raw_markers
                            if m.start() >= search_from and int(m.group(1)) == expected
                        ),
                        None,
                    )
                    if marker is not None:
                        markers.append(marker)
                        search_from = marker.end()
            else:
                best_markers = []
                best_score = -1
                starts = [m for m in raw_markers if int(m.group(1)) == 1]
                for start_marker in starts:
                    candidate = [start_marker]
                    search_from = start_marker.end()
                    for expected in range(2, limit + 1):
                        marker = next(
                            (
                                m
                                for m in raw_markers
                                if m.start() >= search_from and int(m.group(1)) == expected
                            ),
                            None,
                        )
                        if marker is not None:
                            candidate.append(marker)
                            search_from = marker.end()
                    score = len(parse_marker_sequence(candidate))
                    if score > best_score or (score == best_score and candidate[0].start() > best_markers[0].start() if best_markers else True):
                        best_markers = candidate
                        best_score = score
                markers = best_markers
        questions = parse_marker_sequence(markers)
        if sum(q.get("correct") is not None for q in questions) > sum(q.get("correct") is not None for q in best):
            best = questions
    limit = EXPECTED_MAX.get(year, {}).get(subject_key)
    return best[:limit] if limit else best


def parse_2025_english_date_solution_aggregate():
    pdf_dir = PYP / "2025" / "english" / "pdf" / "collegedunia-date-pages"
    if not pdf_dir.exists():
        return []

    def parse_path(path):
        try:
            text = clean(pdf_text(path))
        except Exception:
            return []
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
            correct_match = re.search(r"Correct Answer\s*:\s*\(?([1-4A-Da-d])\)?", block)
            correct = letter_to_index(correct_match.group(1)) if correct_match else None
            if correct is None or english_score(question) < 8:
                continue
            solution_match = re.search(r"Solution\s*:\s*(.*)", block, re.S)
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
    for path in sorted(pdf_dir.glob("*solutions.pdf")):
        for question in parse_path(path):
            key = re.sub(r"[^a-z0-9]+", "", question["question"].lower())[:160]
            if key in seen:
                continue
            seen.add(key)
            combined.append(question)
    combined = combined[:50]
    for index, question in enumerate(combined, 1):
        question["id"] = f"101-2025-Q{index:02d}"
    return combined


key_maps = {
    "2022": parse_2022_key(),
    "2023": parse_2023_key(),
    "2024": parse_2024_key(),
    "2025": parse_2025_key(),
}

report = []
for year_dir in sorted(p for p in PYP.iterdir() if p.is_dir() and p.name.isdigit()):
    year = year_dir.name
    for subject_key in SUBJECTS:
        ocr_path = year_dir / subject_key / "ocr" / "all.txt"
        if not ocr_path.exists():
            continue
        text = ocr_path.read_text(encoding="utf-8", errors="ignore")
        answer_map = key_maps.get(year, {}).get(subject_key, {})
        if year == "2022" and subject_key == "general-test":
            questions = parse_2022_general_solutions()
            if not questions:
                questions = parse_cbt_questions(text, year, subject_key, answer_map)
        elif year == "2024" and "Question Number" in text:
            questions = parse_cbt_questions(text, year, subject_key, {})
            for idx, q in enumerate(questions, 1):
                q["correct"] = answer_map.get(idx)
                q["source_question_no"] = idx
        elif year == "2024":
            questions = parse_booklet_2024(text, subject_key, answer_map)
            if subject_key == "english":
                external_questions = parse_2024_english_collegedekho(answer_map)
                if len(external_questions) > len(questions):
                    questions = external_questions
        else:
            questions = parse_cbt_questions(text, year, subject_key, answer_map)
            if year == "2025" and subject_key == "business-studies":
                official_questions = parse_2025_business_official(answer_map)
                if (
                    len(official_questions) > len(questions)
                    or sum(q.get("correct") is not None for q in official_questions) > sum(q.get("correct") is not None for q in questions)
                ):
                    questions = official_questions
        html_questions = parse_collegedunia_html(year, subject_key)
        pdf_questions = parse_collegedunia_solution_pdf(year, subject_key)
        questionid_questions = parse_questionid_solution_pdf(year, subject_key)
        ques_solution_questions = parse_ques_solution_pdf(year, subject_key)
        careerindia_questions = parse_careerindia_ocr(year, subject_key, answer_map)
        expected_limit = EXPECTED_MAX.get(year, {}).get(subject_key)
        pdf_answers = sum(q.get("correct") is not None for q in pdf_questions)
        html_answers = sum(q.get("correct") is not None for q in html_questions)
        current_answers = sum(q.get("correct") is not None for q in questions)
        questionid_answers = sum(q.get("correct") is not None for q in questionid_questions)
        if questionid_questions and (
            len(questionid_questions) > max(len(html_questions), len(pdf_questions), len(questions))
            or questionid_answers > max(html_answers, pdf_answers, current_answers)
        ):
            html_questions = questionid_questions
            html_answers = questionid_answers
        ques_solution_answers = sum(q.get("correct") is not None for q in ques_solution_questions)
        if ques_solution_questions and (
            len(ques_solution_questions) > max(len(html_questions), len(pdf_questions), len(questions))
            or ques_solution_answers > max(html_answers, pdf_answers, current_answers)
        ):
            html_questions = ques_solution_questions
            html_answers = ques_solution_answers
        if pdf_questions and (
            (expected_limit and len(pdf_questions) >= expected_limit)
            or (
                len(pdf_questions) >= max(len(html_questions), len(questions))
                and pdf_answers > max(html_answers, current_answers)
            )
        ):
            html_questions = pdf_questions
        elif pdf_questions and html_questions:
            for idx, pdf_question in enumerate(pdf_questions):
                if idx >= len(html_questions):
                    break
                if html_questions[idx].get("correct") is None and pdf_question.get("correct") is not None:
                    html_questions[idx]["correct"] = pdf_question["correct"]
                if (
                    html_questions[idx].get("explanation") == "Official CUET previous year question from Collegedunia solution page."
                    and pdf_question.get("explanation")
                ):
                    html_questions[idx]["explanation"] = pdf_question["explanation"]
        use_html = len(html_questions) > len(questions) or (
            html_questions and sum(q.get("correct") is not None for q in html_questions) > sum(q.get("correct") is not None for q in questions)
        )
        if year == "2025" and len(html_questions) >= len(questions):
            use_html = True
        if use_html:
            for idx, html_question in enumerate(html_questions):
                if html_question.get("correct") is None and idx < len(questions):
                    html_question["correct"] = questions[idx].get("correct")
                if (
                    html_question.get("explanation") == "Official CUET previous year question from Collegedunia solution page."
                    and idx < len(questions)
                    and questions[idx].get("explanation")
                ):
                    html_question["explanation"] = questions[idx]["explanation"]
            questions = html_questions
        careerindia_answers = sum(q.get("correct") is not None for q in careerindia_questions)
        current_answers = sum(q.get("correct") is not None for q in questions)
        use_careerindia = False
        if careerindia_questions:
            use_careerindia = (
                (len(careerindia_questions) > len(questions) and careerindia_answers >= current_answers)
                or careerindia_answers >= 40
                or (subject_key == "general-test" and careerindia_answers > current_answers)
                or (year == "2022" and subject_key == "economics" and careerindia_answers >= 30)
            )
        if use_careerindia:
            questions = careerindia_questions
        if year == "2025" and subject_key == "english":
            combined_english = parse_2025_english_date_solution_aggregate()
            if len(combined_english) >= 40 and sum(q.get("correct") is not None for q in combined_english) >= 40:
                questions = combined_english
        limit = EXPECTED_MAX.get(year, {}).get(subject_key)
        if limit and len(questions) > limit:
            questions = questions[:limit]
            for idx, question in enumerate(questions, 1):
                question["id"] = f"{SUBJECTS[subject_key][1]}-{year}-Q{idx:02d}"
        out_path = write_json(year, subject_key, questions)
        mapped = sum(1 for q in questions if q.get("correct") is not None)
        report.append({
            "year": year,
            "subject": SUBJECTS[subject_key][0],
            "json_path": str(out_path.relative_to(ROOT)).replace("\\", "/"),
            "questions": len(questions),
            "answers_mapped": mapped,
            "needs_review": len(questions) < 40 or mapped < min(len(questions), 40),
        })
        print(year, subject_key, len(questions), "questions", mapped, "answers")

(PYP / "conversion-report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
