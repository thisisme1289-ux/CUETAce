import runpy
from pathlib import Path

ROOT = Path.cwd()

for script in [
    "scripts/validate-cuet-archive.py",
    "scripts/summarize-cuet-archive.py",
]:
    print(f"\n== {script} ==")
    runpy.run_path(str(ROOT / script), run_name="__main__")
