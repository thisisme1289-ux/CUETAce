import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const OUT = path.join(
  process.cwd(),
  'past year paper',
  'alternate sources',
  'collegedunia',
  'html',
  'english-2025-dates',
);

const pages = [
  ['2025-english-june-2', 'https://collegedunia.com/news/e-1361-cuet-english-question-paper-2025-june-2'],
  ['2025-english-may-31', 'https://collegedunia.com/news/e-1361-cuet-english-question-paper-2025-may-31'],
  ['2025-english-may-29', 'https://collegedunia.com/news/e-1361-cuet-english-question-paper-2025-may-29'],
  ['2025-english-may-27', 'https://collegedunia.com/articles/e-1361-cuet-2025-may-27-english-question-paper'],
  ['2025-english-may-26', 'https://collegedunia.com/articles/e-1361-cuet-english-question-paper-2025-may-26'],
  ['2025-english-may-20', 'https://collegedunia.com/news/e-1361-cuet-english-question-paper-2025-may-20'],
  ['2025-english-may-13', 'https://collegedunia.com/articles/e-1361-cuet-2025-may-13-english-question-paper'],
];

const headers = {
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'accept-language': 'en-US,en;q=0.9',
};

await mkdir(OUT, { recursive: true });

const manifest = [];
for (const [name, url] of pages) {
  const res = await fetch(url, { headers });
  const html = await res.text();
  if (!res.ok) {
    console.error(`${name}: ${res.status} ${res.statusText}`);
    continue;
  }
  const file = path.join(OUT, `${name}.html`);
  await writeFile(file, html);
  manifest.push({ name, url: res.url, html_path: path.relative(process.cwd(), file).replaceAll(path.sep, '/'), bytes: html.length });
  console.log(`${name}: ${html.length} bytes`);
}

await writeFile(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));
