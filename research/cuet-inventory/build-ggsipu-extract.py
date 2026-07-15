import json
import re
from pathlib import Path

import pdfplumber


PDF = Path(r"C:\tmp\GGSIPU-ch13-2026.pdf")
OUT = Path(r"C:\tmp\ggsipu-affiliated-2025-extract.json")

START_KEYWORDS = re.compile(
    r"\b(?:Institute|College|University|Hospital|School|Centre|Center|Academy|Campus|"
    r"Education|Technology|Management|Nursing|Bhavan|Research|Sciences|Society)\b",
    re.I,
)
DURATION = re.compile(r"^(\d+(?:\s*[½¼¾]|\s*1/2)?\s*(?:yrs?|Yrs?|yr\.?|years?))$", re.I)
INTAKE = re.compile(r"^(\d+|S|-)$", re.I)


def grouped_words(page):
    words = page.extract_words(x_tolerance=1, y_tolerance=3)
    groups = []
    for word in sorted(words, key=lambda w: (w["top"], w["x0"])):
        if not groups or abs(groups[-1][0] - word["top"]) > 4:
            groups.append([word["top"], []])
        groups[-1][1].append(word)
    return groups


def column(words, lo, hi):
    return " ".join(w["text"] for w in sorted([w for w in words if lo <= w["x0"] < hi], key=lambda w: w["x0"]))


def starts_for_page(groups):
    starts = []
    for index, (top, words) in enumerate(groups):
        left = column(words, 0, 900)
        match = re.match(r"^(\d{1,2})\s+(.+)$", left)
        if not match:
            continue
        serial = int(match.group(1))
        rest = match.group(2).strip()
        if serial < 1 or serial > 79 or DURATION.match(rest):
            continue
        if START_KEYWORDS.search(rest):
            starts.append({"groupIndex": index, "top": round(top, 1), "serial": serial, "left": left})
    return starts


def clean_name(left):
    left = re.sub(r"^\d{1,2}\s+", "", left).strip()
    # The extraction sometimes places address or programme text on the institute line.
    left = re.split(r"\s+(?:BBA|BCA|B\.Com\.?|B\.Tech\.?|B\.Ed\.?|BPT|BHMCT|MBA|MBBS|LLB|BA\b|B\.Pharma\.)\b", left, maxsplit=1)[0]
    left = re.sub(r"\s+\d{1,3}[,\-].*$", "", left).strip()
    return re.sub(r"\s+", " ", left).strip(" ,.")


def parse_programmes(groups, first, last):
    current = None
    programmes = []
    for _, words in groups[first:last]:
        programme = column(words, 900, 1205)
        duration = column(words, 1205, 1360)
        intake = column(words, 1360, 1700)
        if not programme and not duration and not intake:
            continue
        if programme:
            if current is None:
                current = {"parts": [], "duration": [], "intake": None, "page": None}
            current["parts"].append(programme)
        if duration:
            if current is None:
                current = {"parts": [], "duration": [], "intake": None, "page": None}
            current["duration"].append(duration)
        if intake:
            if current is None:
                current = {"parts": [], "duration": [], "intake": None, "page": None}
            current["intake"] = intake.split()[-1]
        duration_text = " ".join(current["duration"]) if current else ""
        if current and current["intake"] is not None and re.search(r"\b(?:yrs?|yr\.?|years?|Yrs?)\b", duration_text, re.I):
            name = re.sub(r"\s+", " ", " ".join(current["parts"]).strip())
            if name and not name.upper().startswith(("FINAL", "PROGRAMME", "INTAKE")):
                value = current["intake"]
                programmes.append({
                    "programme": name,
                    "duration": duration_text,
                    "finalIntake": int(value) if value.isdigit() else None,
                    "intakeText": value,
                })
            current = None
    return programmes


def main():
    records = []
    with pdfplumber.open(PDF) as pdf:
        for page_index in range(1, 15):  # PDF pages 2–15: self-financing institutes.
            groups = grouped_words(pdf.pages[page_index])
            starts = starts_for_page(groups)
            for position, start in enumerate(starts):
                end = starts[position + 1]["groupIndex"] if position + 1 < len(starts) else len(groups)
                name = clean_name(start["left"])
                # Avoid obvious address fragments that pdf extraction can surface as starts.
                if name.startswith(("PSP ", "Plot ", "60 & ", "M-", "FC-")):
                    continue
                programmes = parse_programmes(groups, start["groupIndex"], end)
                records.append({
                    "serial": start["serial"],
                    "officialNameExtracted": name,
                    "programmeRows": programmes,
                    "sourcePage": page_index + 1,
                })

    # These rows are visibly split by the PDF layout and are retained as explicit name-only
    # records until the official table can be transcribed without ambiguity.
    known = {r["serial"] for r in records}
    manual_names = {
        1: "Army Institute of Management & Technology",
        2: "Army Institute of Education",
        3: "Army College of Medical Sciences",
        4: "Ashtavakra Institute of Rehabilitation Sciences and Research",
        5: "Action for Autism National Centre for Autism India",
        7: "Banarsidas Chandiwala Institute of Information Technology",
        12: "Bharati Vidyapeeth's Institute of Computer Applications & Management",
        13: "Chanderprabhu Jain College of Higher Studies & School of Law",
        14: "Dr. Akhilesh Das Gupta Institute of Professional Studies (Formerly Dr. Akhilesh Das Gupta Institute of Technology & Management)",
        22: "Fairfield Institute of Management & Technology",
        23: "Gitarattan Institute of Advanced Studies & Training",
        25: "Guru Nanak College of Education (Minority Educational Institution)",
        27: "Guru Ram Dass College of Education",
        28: "Guru Tegh Bahadur Institute of Technology",
        29: "Greater Noida Institute of Technology",
        30: "HMR Institute of Technology & Management",
        33: "Institute of Information Technology & Management",
        34: "Institute of Innovation in Technology and Management",
        36: "Jagannath International Management School",
        37: "Jagannath International Management School",
        40: "Kasturi Ram College of Higher Education",
        43: "Lingayas Lalita Devi Institute of Management & Sciences",
        44: "Lakshmi Bai Batra College of Nursing",
        45: "Leelawati Munshi College of Education",
        46: "Maharaja Agrasen Institute of Management Studies",
        49: "Maharaja Surajmal Institute of Technology",
        55: "Rukmini Devi Institute of Advanced Studies",
        56: "Sant Hari Dass College of Higher Education",
        58: "Sri Guru Tegh Bahadur Institute of Management and Information Technology",
        63: "Trinity Institute of Professional Studies",
        64: "Vastu Kala Academy",
        67: "Trinity Institute of Innovations in Professional Studies",
        68: "Holy Family Hospital Delhi",
        54: "Rajiv Gandhi Cancer Institute and Research Centre",
        61: "St. Stephens Hospital College of Nursing",
        69: "Shri Balwant Institute of Technology",
        70: "Don Bosco Institute of Technology",
        72: "Guru Tegh Bahadur 4th Centenary Engineering College",
        75: "Impact Paramedical and Health Institute",
        76: "Echelon Institute of Technology",
        77: "Maharaja Agarsain College of Nursing",
        79: "Saviour College of Nursing",
    }
    for serial, name in manual_names.items():
        if serial not in known:
            records.append({"serial": serial, "officialNameExtracted": name, "programmeRows": [], "sourcePage": None, "needsManualReview": True})
        else:
            for row in records:
                if row["serial"] == serial:
                    row["officialNameExtracted"] = name
    records = [r for r in records if r["serial"] != 60 or r["officialNameExtracted"] != "61, Tughlakabad Institutional Area, Hospital, Delhi"]
    records.sort(key=lambda r: r["serial"])
    OUT.write_text(json.dumps({
        "parentInstitution": "Guru Gobind Singh Indraprastha University",
        "documentTitle": "Chapter 13: List of Programmes Offered in Affiliated Institutes/USS During the Academic Session 2025-26",
        "sourceUrl": "https://ipu.ac.in/adm2026/adm2026br/br280126ugprg/ch13.pdf",
        "admissionYear": 2025,
        "records": records,
    }, ensure_ascii=False, indent=2), encoding="utf-8")
    print("records", len(records), "programmes", sum(len(r["programmeRows"]) for r in records))


if __name__ == "__main__":
    main()
