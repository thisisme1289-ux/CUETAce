import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const htmlDir = path.join(ROOT, 'past year paper', 'alternate sources', 'collegedunia', 'html');
const headers = { 'user-agent': 'Mozilla/5.0' };
const excludedUrls = [
  'cuet_ug_2025_environmental_science_sol',
];

const manifest = [];
const htmlFiles = ['2022', '2023', '2024', '2025'].flatMap((year) =>
  ['accountancy', 'business-studies', 'economics', 'english', 'general-test'].map((subject) => [year, subject])
);

for (const [year, subject] of htmlFiles) {
  const htmlPath = path.join(htmlDir, `${year}-${subject}.html`);
  try {
    await readFile(htmlPath, 'utf8');
  } catch {
    continue;
  }
  const html = await readFile(htmlPath, 'utf8');
  const urls = [...html.matchAll(/href="([^"]+\.pdf[^"]*)"/g)]
    .map((m) => m[1].replaceAll('&amp;', '&'))
    .map((url) => new URL(url, 'https://collegedunia.com').href);
  const unique = [...new Set(urls)];
  const outDir = path.join(ROOT, 'past year paper', year, subject, 'pdf', 'collegedunia');
  await mkdir(outDir, { recursive: true });
  let index = 1;
  for (const url of unique) {
    const normalizedUrl = url.toLowerCase();
    if (excludedUrls.some((marker) => normalizedUrl.includes(marker))) {
      console.error(`skip excluded misfiled pdf ${url}`);
      continue;
    }
    const res = await fetch(url, { headers });
    const bytes = Buffer.from(await res.arrayBuffer());
    if (!bytes.subarray(0, 4).equals(Buffer.from('%PDF'))) {
      console.error(`skip non-pdf ${url}`);
      continue;
    }
    const label = normalizedUrl.includes('solution') ? 'solutions' : normalizedUrl.includes('answer') ? 'answer-key' : 'question-paper';
    const file = path.join(outDir, `${year}-${subject}-${String(index).padStart(2, '0')}-${label}.pdf`);
    await writeFile(file, bytes);
    manifest.push({ year, subject, url, pdf_path: path.relative(ROOT, file).replaceAll(path.sep, '/'), bytes: bytes.length });
    console.log(`${year} ${subject}: ${bytes.length} ${url}`);
    index += 1;
  }
}

await writeFile(path.join(ROOT, 'past year paper', 'alternate sources', 'collegedunia', 'pdf-manifest.json'), JSON.stringify(manifest, null, 2));
