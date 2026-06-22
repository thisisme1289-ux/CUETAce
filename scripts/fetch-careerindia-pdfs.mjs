import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const OUT_ROOT = path.join(ROOT, 'past year paper');
const headers = { 'user-agent': 'Mozilla/5.0' };

const papers = [
  {
    year: '2022',
    subject: 'accountancy',
    url: 'https://www.careerindia.com/entrance-exam/cuet-ug-accountancy-question-paper-2022-2284.pdf',
    file: '2022-accountancy-careerindia.pdf',
  },
  {
    year: '2022',
    subject: 'business-studies',
    url: 'https://www.careerindia.com/entrance-exam/cuet-ug-business-studies-question-paper-2022-2292.pdf',
    file: '2022-business-studies-careerindia.pdf',
  },
  {
    year: '2022',
    subject: 'economics',
    url: 'https://www.careerindia.com/entrance-exam/cuet-ug-business-economics-question-paper-2022-2297.pdf',
    file: '2022-economics-careerindia.pdf',
  },
  {
    year: '2022',
    subject: 'general-test',
    url: 'https://www.careerindia.com/entrance-exam/cuet-ug-general-test-question-paper-2022-2302.pdf',
    file: '2022-general-test-careerindia.pdf',
  },
];

const manifest = [];

for (const paper of papers) {
  const outDir = path.join(OUT_ROOT, paper.year, paper.subject, 'pdf', 'careerindia');
  await mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, paper.file);
  const res = await fetch(paper.url, { headers });
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${paper.url}`);
  const bytes = Buffer.from(await res.arrayBuffer());
  if (!bytes.subarray(0, 4).equals(Buffer.from('%PDF'))) {
    throw new Error(`Download was not a PDF: ${paper.url}`);
  }
  await writeFile(outPath, bytes);
  manifest.push({
    year: paper.year,
    subject: paper.subject,
    url: paper.url,
    pdf_path: path.relative(ROOT, outPath).replaceAll(path.sep, '/'),
    bytes: bytes.length,
  });
  console.log(`${paper.year} ${paper.subject}: ${bytes.length} ${paper.url}`);
}

await writeFile(
  path.join(OUT_ROOT, 'alternate sources', 'careerindia-pdf-manifest.json'),
  JSON.stringify(manifest, null, 2),
);
