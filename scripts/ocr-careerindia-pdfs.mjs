import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createWorker } from '../.codex-tools/node_modules/tesseract.js/src/index.js';

const ROOT = process.cwd();
const PYP = path.join(ROOT, 'past year paper');
const manifestPath = path.join(PYP, 'alternate sources', 'careerindia-render-manifest.json');
const renderManifest = JSON.parse(await readFile(manifestPath, 'utf8'));

const worker = await createWorker('eng');
await worker.setParameters({ tessedit_pageseg_mode: '4' });

const ocrManifest = [];

for (const paper of renderManifest) {
  const ocrDir = path.join(PYP, paper.year, paper.subject, 'ocr', 'careerindia');
  const all = [];
  console.log(`OCR CareerIndia ${paper.year} ${paper.subject}: ${paper.pages} pages`);
  for (const [index, relImagePath] of paper.page_images.entries()) {
    const pageNo = index + 1;
    const txtPath = path.join(ocrDir, 'pages', `page-${String(pageNo).padStart(3, '0')}.txt`);
    let text;
    if (existsSync(txtPath)) {
      text = await readFile(txtPath, 'utf8');
    } else {
      const result = await worker.recognize(path.join(ROOT, relImagePath));
      text = result.data.text;
      await writeFile(txtPath, text);
    }
    all.push(`\n\n===== PAGE ${pageNo} =====\n${text.trim()}`);
  }
  const allPath = path.join(ocrDir, 'all.txt');
  await writeFile(allPath, all.join('\n'));
  ocrManifest.push({
    year: paper.year,
    subject: paper.subject,
    pages: paper.pages,
    ocr_path: path.relative(ROOT, allPath).replaceAll(path.sep, '/'),
  });
}

await worker.terminate();
await writeFile(
  path.join(PYP, 'alternate sources', 'careerindia-ocr-manifest.json'),
  JSON.stringify(ocrManifest, null, 2),
);
