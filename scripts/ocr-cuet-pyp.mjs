import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createWorker } from '../.codex-tools/node_modules/tesseract.js/src/index.js';

const ROOT = process.cwd();
const OUT_ROOT = path.join(ROOT, 'past year paper');
const manifest = JSON.parse(await readFile(path.join(OUT_ROOT, 'manifest.json'), 'utf8'));

async function getPageUrls(docsUrl) {
  const html = await (await fetch(docsUrl)).text();
  const id = docsUrl.match(/\/view\/([^/?#]+)/)?.[1];
  if (!id) throw new Error(`Could not parse docs id: ${docsUrl}`);
  const urls = [`https://cdn.aglasem.com/aglasem-doc/${id}/1.jpg`];
  const match = html.match(/var docImages = JSON\.parse\('([^']+)'\)/);
  if (match) {
    const images = JSON.parse(match[1].replace(/\\'/g, "'"));
    for (const image of images) urls.push(`https://cdn.aglasem.com/aglasem-doc/${id}/${image.imageUrl}`);
  }
  return urls;
}

const worker = await createWorker('eng');
const ocrManifest = [];

for (const paper of manifest.papers) {
  const paperRoot = path.join(ROOT, paper.pdf_path, '..', '..');
  const ocrDir = path.join(paperRoot, 'ocr');
  const pagesDir = path.join(ocrDir, 'pages');
  await mkdir(pagesDir, { recursive: true });
  const pageUrls = await getPageUrls(paper.docs_url);
  const all = [];
  console.log(`OCR ${paper.year} ${paper.subject}: ${pageUrls.length} pages`);
  for (let index = 0; index < pageUrls.length; index += 1) {
    const pageNo = index + 1;
    const txtPath = path.join(pagesDir, `page-${String(pageNo).padStart(3, '0')}.txt`);
    let text;
    if (existsSync(txtPath)) {
      text = await readFile(txtPath, 'utf8');
    } else {
      const result = await worker.recognize(pageUrls[index]);
      text = result.data.text;
      await writeFile(txtPath, text);
    }
    all.push(`\n\n===== PAGE ${pageNo} =====\n${text.trim()}`);
  }
  const allText = all.join('\n');
  await writeFile(path.join(ocrDir, 'all.txt'), allText);
  ocrManifest.push({
    year: paper.year,
    subject: paper.subject,
    subject_key: paper.subject_key,
    pages: pageUrls.length,
    ocr_path: path.relative(ROOT, path.join(ocrDir, 'all.txt')).replaceAll(path.sep, '/'),
  });
}

await worker.terminate();
await writeFile(path.join(OUT_ROOT, 'ocr-manifest.json'), JSON.stringify(ocrManifest, null, 2));
