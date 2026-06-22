import json
from pathlib import Path

ROOT = Path.cwd()
PYP = ROOT / "past year paper"


def load_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


import_index = load_json(PYP / "import-index.json")
ready_files = [
    entry for entry in import_index.get("files", [])
    if entry.get("ready_for_student_use")
]

ready_index = {
    "archive_root": import_index.get("archive_root", "past year paper"),
    "total_files": len(ready_files),
    "total_questions": sum(entry.get("questions", 0) for entry in ready_files),
    "total_answers_mapped": sum(entry.get("answers_mapped", 0) for entry in ready_files),
    "files": ready_files,
}

(PYP / "student-ready-index.json").write_text(json.dumps(ready_index, indent=2), encoding="utf-8")
print(json.dumps({
    "total_files": ready_index["total_files"],
    "total_questions": ready_index["total_questions"],
    "total_answers_mapped": ready_index["total_answers_mapped"],
}, indent=2))
