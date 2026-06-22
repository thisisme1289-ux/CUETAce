import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const questionRoot = path.join(root, 'questions');
const pypRoot = path.join(root, 'past year paper');
const outFile = path.join(root, 'question-bank-index.json');
const pypImportIndexFile = path.join(pypRoot, 'import-index.json');
const pypReadinessAuditFile = path.join(pypRoot, 'source-readiness-audit.json');
const pypImportPackDir = path.join(pypRoot, 'import-packs');

const subjectDirToName = {
  accountancy: 'Accountancy',
  'business-studies': 'Business Studies',
  economics: 'Economics',
  english: 'English',
  'general-test': 'General Test'
};

async function readJson(file) {
  return JSON.parse(await fs.readFile(file, 'utf8'));
}

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

function questionsFromJson(json) {
  if (Array.isArray(json)) return json;
  if (Array.isArray(json?.questions)) return json.questions;
  if (Array.isArray(json?.chapters)) {
    return json.chapters.flatMap(chapter => Array.isArray(chapter?.questions) ? chapter.questions : []);
  }
  return [];
}

function answersMapped(questions) {
  return questions.filter(q => q.correct !== undefined && q.correct !== null).length;
}

async function chapterEntries() {
  const entries = [];
  for (const [dir, subject] of Object.entries(subjectDirToName)) {
    const absDir = path.join(questionRoot, dir);
    if (!(await exists(absDir))) continue;
    const files = (await fs.readdir(absDir)).filter(name => name.endsWith('.json')).sort();
    for (const file of files) {
      const abs = path.join(absDir, file);
      const json = await readJson(abs);
      const questions = questionsFromJson(json);
      const chapterId = json.chapter_id || path.basename(file, '.json');
      entries.push({
        mode: 'chapter',
        subject,
        subjectSlug: dir,
        chapterId,
        chapter: json.chapter || '',
        sourcePath: path.relative(root, abs).replaceAll('\\', '/'),
        storagePath: `question-bank/chapters/${dir}/${chapterId}.json`,
        count: questions.length,
        answersMapped: answersMapped(questions),
        readyForStudentUse: true,
        levels: [...new Set(questions.map(q => q.level).filter(Boolean))].sort(),
        types: [...new Set(questions.map(q => q.type).filter(Boolean))].sort()
      });
    }
  }
  return entries;
}

async function pypEntries() {
  const entries = [];
  const importIndex = await exists(pypImportIndexFile) ? await readJson(pypImportIndexFile) : { files: [] };
  const readinessAudit = await exists(pypReadinessAuditFile) ? await readJson(pypReadinessAuditFile) : { files: [] };
  const importMetadata = new Map((importIndex.files || []).map(entry => [entry.json_path, entry]));
  const readinessMetadata = new Map((readinessAudit.files || []).map(entry => [entry.path, entry]));
  for (const year of ['2022', '2023', '2024', '2025']) {
    for (const [dir, subject] of Object.entries(subjectDirToName)) {
      const abs = path.join(pypRoot, year, dir, 'json', `${year}-${dir}.json`);
      if (!(await exists(abs))) continue;
      const json = await readJson(abs);
      const questions = questionsFromJson(json);
      const sourcePath = path.relative(root, abs).replaceAll('\\', '/');
      const meta = importMetadata.get(sourcePath);
      const readiness = readinessMetadata.get(sourcePath);
      const readyForStudentUse = Boolean(readiness?.ready_for_student_use);
      entries.push({
        mode: 'pyp',
        subject,
        subjectSlug: dir,
        year,
        needsReview: !readyForStudentUse,
        reviewReasons: readiness?.reasons || [],
        sourcePath,
        storagePath: `question-bank/past-years/${year}/${dir}.json`,
        count: questions.length,
        answersMapped: answersMapped(questions),
        readinessQuestions: readiness?.counts?.questions ?? questions.length,
        readinessAnswersMapped: readiness?.counts?.answersMapped ?? meta?.answers_mapped ?? answersMapped(questions),
        readyForStudentUse,
        levels: [...new Set(questions.map(q => q.level).filter(Boolean))].sort(),
        types: [...new Set(questions.map(q => q.type).filter(Boolean))].sort()
      });
    }
  }
  for (const meta of importIndex.files || []) {
    if (meta.kind !== 'individual-pdf') continue;
    const abs = path.join(root, meta.json_path);
    if (!(await exists(abs))) continue;
    const json = await readJson(abs);
    const questions = questionsFromJson(json);
    const subjectSlug = Object.entries(subjectDirToName).find(([, name]) => name === meta.subject)?.[0] || '';
    const paperSlug = path.basename(meta.json_path, '.json');
    const readiness = readinessMetadata.get(meta.json_path);
    const readyForStudentUse = Boolean(readiness?.ready_for_student_use);
    entries.push({
      mode: 'pyp-individual',
      subject: meta.subject,
      subjectSlug,
      year: String(meta.year),
      paper: meta.paper || paperSlug,
      needsReview: !readyForStudentUse,
      reviewReasons: readiness?.reasons || [],
      sourcePath: meta.json_path,
      storagePath: `question-bank/past-years/${meta.year}/${subjectSlug}/individual/${paperSlug}.json`,
      count: questions.length,
      answersMapped: answersMapped(questions),
      readinessQuestions: readiness?.counts?.questions ?? questions.length,
      readinessAnswersMapped: readiness?.counts?.answersMapped ?? meta.answers_mapped ?? answersMapped(questions),
      readyForStudentUse,
      levels: [...new Set(questions.map(q => q.level).filter(Boolean))].sort(),
      types: [...new Set(questions.map(q => q.type).filter(Boolean))].sort()
    });
  }
  return entries;
}

async function pypImportPackEntries() {
  const entries = [];
  if (!(await exists(pypImportPackDir))) return entries;
  const files = (await fs.readdir(pypImportPackDir)).filter(name => name.endsWith('.json')).sort();
  for (const file of files) {
    const abs = path.join(pypImportPackDir, file);
    const json = await readJson(abs);
    const questions = questionsFromJson(json);
    if (!json.pack_id || questions.length === 0) continue;
    const subjectSlug = Object.entries(subjectDirToName).find(([, name]) => name === json.subject)?.[0] || '';
    const needsChapterReview = questions.filter(q => q.chapter_confidence === 'needs_review').length;
    entries.push({
      mode: 'pyp-import-pack',
      subject: json.subject,
      subjectSlug,
      subjectCode: json.subject_code,
      year: String(json.year),
      packId: json.pack_id,
      chapterId: json.chapter_id,
      chapter: json.chapter || '',
      sourcePath: path.relative(root, abs).replaceAll('\\', '/'),
      storagePath: `question-bank/import-packs/${json.pack_id}.json`,
      sourceQueue: json.source_queue || '',
      count: questions.length,
      answersMapped: answersMapped(questions),
      readyForStudentUse: needsChapterReview === 0,
      needsReview: needsChapterReview > 0,
      reviewReasons: needsChapterReview > 0 ? ['chapter_or_topic_review_needed'] : [],
      needsChapterReview,
      levels: [...new Set(questions.map(q => q.level).filter(Boolean))].sort(),
      types: [...new Set(questions.map(q => q.type).filter(Boolean))].sort()
    });
  }
  return entries;
}

const index = {
  generatedAt: new Date().toISOString(),
  entries: [...await chapterEntries(), ...await pypEntries(), ...await pypImportPackEntries()]
};

await fs.writeFile(outFile, JSON.stringify(index, null, 2) + '\n');
console.log(`Wrote ${index.entries.length} entries to ${path.relative(root, outFile)}`);
