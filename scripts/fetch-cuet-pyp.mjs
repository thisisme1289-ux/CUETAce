import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const OUT_ROOT = path.join(ROOT, 'past year paper');

const subjects = [
  { key: 'accountancy', name: 'Accountancy', aliases: ['Accountancy', 'Accountancy Book Keeping'], code: '301' },
  { key: 'business-studies', name: 'Business Studies', aliases: ['Business Studies'], code: '305' },
  { key: 'economics', name: 'Economics', aliases: ['Economics', 'Economics and Business Economics'], code: '309' },
  { key: 'english', name: 'English', aliases: ['English'], code: '101' },
  { key: 'general-test', name: 'General Test', aliases: ['General Test'], code: '501' },
];

const yearPages = {
  2025: 'https://admission.aglasem.com/cuet-2025-question-paper/',
  2024: 'https://admission.aglasem.com/cuet-2024-question-paper/',
  2023: 'https://admission.aglasem.com/cuet-2023-question-paper/',
  2022: 'https://admission.aglasem.com/cuet-2022-question-paper/',
};

function cleanHtml(text) {
  return text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function linkRows(html) {
  const rows = [];
  const re = /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  for (const match of html.matchAll(re)) {
    rows.push({ href: new URL(match[1], 'https://admission.aglasem.com/').href, text: cleanHtml(match[2]) });
  }
  return rows;
}

function findSubjectLink(rows, subject, year) {
  const aliases = subject.aliases.map(normalize);
  const direct = rows.find((row) => {
    const text = normalize(row.text);
    if (!row.href.includes('docs.aglasem.com') && !row.href.includes('cuet') && !row.href.includes('question-paper')) return false;
    return aliases.some((alias) => text.includes(alias));
  });
  if (direct) return direct.href;
  throw new Error(`No ${year} link found for ${subject.name}`);
}

async function getDocsUrl(url) {
  if (url.includes('docs.aglasem.com/view/')) return url;
  const html = await (await fetch(url)).text();
  const rows = linkRows(html);
  const download = rows.find((row) => row.href.includes('docs.aglasem.com/view/') && /download|view|question paper/i.test(row.text));
  if (download) return download.href;
  const anyDocs = rows.find((row) => row.href.includes('docs.aglasem.com/view/'));
  if (anyDocs) return anyDocs.href;
  throw new Error(`No docs viewer link found in ${url}`);
}

function docsId(docsUrl) {
  const match = docsUrl.match(/\/view\/([^/?#]+)/);
  if (!match) throw new Error(`Could not parse docs id: ${docsUrl}`);
  return match[1];
}

async function downloadPdf(docsUrl, pdfPath) {
  const id = docsId(docsUrl);
  const url = `https://docs.aglasem.com/product/single-doc-download/${id}?url=${encodeURIComponent(docsUrl)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${url}`);
  const bytes = Buffer.from(await res.arrayBuffer());
  if (!bytes.subarray(0, 4).equals(Buffer.from('%PDF'))) {
    throw new Error(`Download was not a PDF: ${docsUrl}`);
  }
  await writeFile(pdfPath, bytes);
  return { id, downloadUrl: res.url, bytes: bytes.length };
}

const manifest = {
  created_at: new Date().toISOString(),
  note: 'CUET UG began in 2022; no CUET UG NTA papers exist for 2020-2021.',
  sources: Object.entries(yearPages).map(([year, url]) => ({ year, url })),
  papers: [],
  errors: [],
};

for (const [year, pageUrl] of Object.entries(yearPages)) {
  const html = await (await fetch(pageUrl)).text();
  const rows = linkRows(html);
  for (const subject of subjects) {
    const dir = path.join(OUT_ROOT, year, subject.key, 'pdf');
    await mkdir(dir, { recursive: true });
    const pdfPath = path.join(dir, `${year}-${subject.key}.pdf`);
    try {
      const subjectPage = findSubjectLink(rows, subject, year);
      const docsUrl = await getDocsUrl(subjectPage);
      const pdf = await downloadPdf(docsUrl, pdfPath);
      manifest.papers.push({
        year,
        subject: subject.name,
        subject_key: subject.key,
        subject_code: subject.code,
        source_page: subjectPage,
        docs_url: docsUrl,
        pdf_url: pdf.downloadUrl,
        pdf_path: path.relative(ROOT, pdfPath).replaceAll(path.sep, '/'),
        bytes: pdf.bytes,
      });
      console.log(`saved ${year} ${subject.name}: ${pdfPath}`);
    } catch (error) {
      manifest.errors.push({ year, subject: subject.name, message: error.message });
      console.error(`failed ${year} ${subject.name}: ${error.message}`);
    }
  }
}

await writeFile(path.join(OUT_ROOT, 'manifest.json'), JSON.stringify(manifest, null, 2));
