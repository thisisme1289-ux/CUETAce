from pathlib import Path

import pypdfium2 as pdfium

ROOT = Path.cwd()
PYP = ROOT / "past year paper"

PDFS = [
    ("2022", "accountancy", "2022-accountancy-careerindia.pdf"),
    ("2022", "business-studies", "2022-business-studies-careerindia.pdf"),
    ("2022", "economics", "2022-economics-careerindia.pdf"),
    ("2022", "general-test", "2022-general-test-careerindia.pdf"),
]

manifest = []

for year, subject, filename in PDFS:
    pdf_path = PYP / year / subject / "pdf" / "careerindia" / filename
    if not pdf_path.exists():
        continue
    pages_dir = PYP / year / subject / "ocr" / "careerindia" / "pages"
    pages_dir.mkdir(parents=True, exist_ok=True)
    pdf = pdfium.PdfDocument(str(pdf_path))
    rendered = []
    for index in range(len(pdf)):
        out_path = pages_dir / f"page-{index + 1:03d}.png"
        if not out_path.exists():
            bitmap = pdf[index].render(scale=3.5).to_pil()
            bitmap.save(out_path)
        rendered.append(str(out_path.relative_to(ROOT)).replace("\\", "/"))
    manifest.append({
        "year": year,
        "subject": subject,
        "pdf_path": str(pdf_path.relative_to(ROOT)).replace("\\", "/"),
        "pages": len(pdf),
        "page_images": rendered,
    })
    print(year, subject, len(pdf), "pages")

(PYP / "alternate sources" / "careerindia-render-manifest.json").write_text(
    __import__("json").dumps(manifest, indent=2),
    encoding="utf-8",
)
