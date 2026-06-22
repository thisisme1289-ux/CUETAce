import hashlib
import json
from pathlib import Path

ROOT = Path.cwd()
PYP = ROOT / "past year paper"


def rel(path):
    return str(path.relative_to(ROOT)).replace("\\", "/")


rows = []
bad = []
for path in sorted(PYP.rglob("*.pdf")):
    data = path.read_bytes()
    row = {
        "pdf_path": rel(path),
        "bytes": len(data),
        "sha256": hashlib.sha256(data).hexdigest(),
        "has_pdf_header": data.startswith(b"%PDF"),
    }
    rows.append(row)
    if not row["has_pdf_header"] or row["bytes"] == 0:
        bad.append(row)

manifest = {
    "pdf_count": len(rows),
    "bad_pdf_count": len(bad),
    "pdfs": rows,
    "bad_pdfs": bad,
}

(PYP / "pdf-integrity.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
print(json.dumps({
    "pdf_count": manifest["pdf_count"],
    "bad_pdf_count": manifest["bad_pdf_count"],
}, indent=2))
