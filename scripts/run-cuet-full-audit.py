import runpy
import subprocess
from pathlib import Path

ROOT = Path.cwd()

python_scripts = [
    "scripts/validate-cuet-archive.py",
    "scripts/summarize-cuet-archive.py",
    "scripts/write-cuet-pdf-integrity.py",
    "scripts/write-cuet-source-report.py",
    "scripts/write-cuet-completion-audit.py",
    "scripts/write-cuet-review-queue.py",
    "scripts/build-cuet-import-index.py",
    "scripts/build-cuet-ready-index.py",
]

for script in python_scripts:
    print(f"\n== {script} ==")
    runpy.run_path(str(ROOT / script), run_name="__main__")

print("\n== scripts/audit-past-year-readiness.mjs ==")
subprocess.run(["node", "scripts/audit-past-year-readiness.mjs"], cwd=ROOT, check=True)

print("\n== scripts/build-question-index.mjs ==")
subprocess.run(["node", "scripts/build-question-index.mjs"], cwd=ROOT, check=True)
