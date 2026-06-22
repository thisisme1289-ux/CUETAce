import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const htmlDir = path.join(ROOT, 'past year paper', 'alternate sources', 'collegedunia', 'html', 'english-2025-dates');
const outDir = path.join(ROOT, 'past year paper', '2025', 'english', 'pdf', 'collegedunia-date-pages');
const headers = { 'user-agent': 'Mozilla/5.0' };

await mkdir(outDir, { recursive: true });

const manifest = [];
for (const name of [
  '2025-english-june-2',
  '2025-english-may-31',
  '2025-english-may-29',
  '2025-english-may-27',
  '2025-english-may-26',
  '2025-english-may-20',
  '2025-english-may-13',
]) {
  let html;
  try {
    html = await readFile(path.join(htmlDir, `${name}.html`), 'utf8');
  } catch {
    continue;
  }
  const urls = [...html.matchAll(/href="([^"]+\.pdf[^"]*)"/g)]
    .map((m) => m[1].replaceAll('&amp;', '&'))
    .map((url) => new URL(url, 'https://collegedunia.com').href);
  let index = 1;
  for (const url of [...new Set(urls)]) {
    const res = await fetch(url, { headers });
    const bytes = Buffer.from(await res.arrayBuffer());
    if (!bytes.subarray(0, 4).equals(Buffer.from('%PDF'))) {
      console.error(`skip non-pdf ${url}`);
      continue;
    }
    const kind = /sol|solution/i.test(url) ? 'solutions' : 'question-paper';
    const file = path.join(outDir, `${name}-${String(index).padStart(2, '0')}-${kind}.pdf`);
    await writeFile(file, bytes);
    manifest.push({ name, url, pdf_path: path.relative(ROOT, file).replaceAll(path.sep, '/'), bytes: bytes.length });
    console.log(`${name}: ${bytes.length} ${url}`);
    index += 1;
  }
}

await writeFile(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
