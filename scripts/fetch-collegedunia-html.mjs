import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'past year paper', 'alternate sources', 'collegedunia', 'html');

const pages = [
  ['2022', 'accountancy', 'https://collegedunia.com/articles/e-1361-cuet-2022-accountancy-book-keeping-question-paper'],
  ['2022', 'business-studies', 'https://collegedunia.com/articles/e-1361-cuet-2022-business-studies-question-paper'],
  ['2022', 'economics', 'https://collegedunia.com/news/e-1361-cuet-2022-economics-business-economics-question-paper'],
  ['2022', 'english', 'https://collegedunia.com/articles/e-1361-cuet-2022-english-question-paper'],
  ['2022', 'general-test', 'https://collegedunia.com/articles/e-1361-cuet-2022-general-test-question-paper'],
  ['2023', 'accountancy', 'https://collegedunia.com/articles/e-1361-cuet-2023-accountancy-answer-key'],
  ['2023', 'business-studies', 'https://collegedunia.com/articles/e-1361-cuet-2023-business-studies-answer-key'],
  ['2023', 'economics', 'https://collegedunia.com/articles/e-1361-cuet-2023-economics-question-paper'],
  ['2023', 'english', 'https://collegedunia.com/news/e-1361-cuet-2023-english-answer-key'],
  ['2023', 'general-test', 'https://collegedunia.com/articles/e-1361-cuet-2023-general-test-answer-key'],
  ['2024', 'accountancy', 'https://collegedunia.com/news/e-1361-cuet-2024-accountancy-question-paper'],
  ['2024', 'business-studies', 'https://collegedunia.com/articles/e-1361-cuet-2024-business-studies-question-paper'],
  ['2024', 'economics', 'https://collegedunia.com/articles/e-1361-cuet-2024-economics-question-paper'],
  ['2024', 'general-test', 'https://collegedunia.com/articles/e-1361-cuet-2024-general-test-question-paper'],
  ['2025', 'accountancy', 'https://collegedunia.com/articles/e-1361-cuet-accountancy-question-paper-2025'],
  ['2025', 'business-studies', 'https://collegedunia.com/articles/e-1361-cuet-ug-business-studies-question-paper-with-solutions-pdfs'],
  ['2025', 'economics', 'https://collegedunia.com/articles/e-1361-cuet-ug-economics-question-paper-with-solutions-pdfs'],
  ['2025', 'english', 'https://collegedunia.com/news/e-1361-cuet-2025-english-question-paper'],
  ['2025', 'general-test', 'https://collegedunia.com/articles/e-1361-cuet-ug-general-test-question-paper-with-solutions-pdfs'],
];

await mkdir(OUT, { recursive: true });

const headers = {
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'accept-language': 'en-US,en;q=0.9',
};

const manifest = [];
for (const [year, subject, url] of pages) {
  const res = await fetch(url, { headers });
  const html = await res.text();
  const file = path.join(OUT, `${year}-${subject}.html`);
  await writeFile(file, html);
  manifest.push({ year, subject, url: res.url, html_path: path.relative(process.cwd(), file).replaceAll(path.sep, '/'), bytes: html.length });
  console.log(`${year} ${subject}: ${html.length} bytes`);
}

await writeFile(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));
