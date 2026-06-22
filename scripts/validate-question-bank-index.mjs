import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const indexPath = path.join(root, 'question-bank-index.json');

function docIdFor(entry) {
  return `${entry.mode}_${entry.subjectSlug}_${entry.chapterId || entry.paper || entry.year}`;
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

function fail(errors) {
  console.error(JSON.stringify({ ok: false, errorCount: errors.length, errors }, null, 2));
  process.exit(1);
}

const index = JSON.parse(await fs.readFile(indexPath, 'utf8'));
const errors = [];
const storagePaths = new Map();
const docIds = new Map();

if (!Array.isArray(index.entries)) {
  errors.push('question-bank-index.json must contain an entries array');
} else {
  for (const [i, entry] of index.entries.entries()) {
    const label = `entries[${i}]`;
    for (const key of ['mode', 'subject', 'subjectSlug', 'sourcePath', 'storagePath', 'count']) {
      if (entry[key] === undefined || entry[key] === null || entry[key] === '') {
        errors.push(`${label} missing ${key}`);
      }
    }

    const sourceAbs = path.join(root, entry.sourcePath || '');
    let sourceJson = null;
    let sourceQuestions = [];
    try {
      await fs.access(sourceAbs);
      sourceJson = JSON.parse(await fs.readFile(sourceAbs, 'utf8'));
      sourceQuestions = questionsFromJson(sourceJson);
    } catch {
      errors.push(`${label} sourcePath does not exist: ${entry.sourcePath}`);
    }

    if (!Number.isInteger(entry.count) || entry.count < 0) {
      errors.push(`${label} count must be a non-negative integer`);
    }
    if (sourceJson && sourceQuestions.length !== entry.count) {
      errors.push(`${label} count ${entry.count} does not match source question count ${sourceQuestions.length}`);
    }

    if (entry.mode?.startsWith('pyp')) {
      for (const key of ['answersMapped', 'needsReview', 'readyForStudentUse', 'year']) {
        if (entry[key] === undefined || entry[key] === null) {
          errors.push(`${label} PYP entry missing ${key}`);
        }
      }
      if (!Number.isInteger(entry.answersMapped) || entry.answersMapped < 0 || entry.answersMapped > entry.count) {
        errors.push(`${label} answersMapped must be between 0 and count`);
      }
      if (sourceJson && answersMapped(sourceQuestions) !== entry.answersMapped) {
        errors.push(`${label} answersMapped ${entry.answersMapped} does not match source mapped answers ${answersMapped(sourceQuestions)}`);
      }
      if (entry.readyForStudentUse === true && entry.needsReview === true) {
        errors.push(`${label} cannot be both readyForStudentUse and needsReview`);
      }
    }

    if (entry.mode === 'pyp-import-pack') {
      for (const key of ['packId', 'subjectCode', 'sourceQueue', 'needsChapterReview']) {
        if (entry[key] === undefined || entry[key] === null || entry[key] === '') {
          errors.push(`${label} import pack missing ${key}`);
        }
      }
      if (sourceJson && sourceJson.pack_id !== entry.packId) {
        errors.push(`${label} packId ${entry.packId} does not match source pack_id ${sourceJson.pack_id}`);
      }
      if (!Number.isInteger(entry.needsChapterReview) || entry.needsChapterReview < 0) {
        errors.push(`${label} needsChapterReview must be a non-negative integer`);
      }
      const actualReviewCount = sourceQuestions.filter(q => q.chapter_confidence === 'needs_review').length;
      if (entry.needsChapterReview !== actualReviewCount) {
        errors.push(`${label} needsChapterReview ${entry.needsChapterReview} does not match source review count ${actualReviewCount}`);
      }
      if (entry.readyForStudentUse !== (entry.needsChapterReview === 0)) {
        errors.push(`${label} readyForStudentUse must match needsChapterReview === 0`);
      }
      if (entry.sourceQueue) {
        try {
          await fs.access(path.join(root, entry.sourceQueue));
        } catch {
          errors.push(`${label} sourceQueue does not exist: ${entry.sourceQueue}`);
        }
      }
    }

    if (storagePaths.has(entry.storagePath)) {
      errors.push(`${label} duplicate storagePath: ${entry.storagePath}`);
    } else {
      storagePaths.set(entry.storagePath, label);
    }

    const docId = docIdFor(entry);
    if (docId.includes('/')) {
      errors.push(`${label} doc id contains slash: ${docId}`);
    }
    if (docIds.has(docId)) {
      errors.push(`${label} duplicate Firestore doc id: ${docId}`);
    } else {
      docIds.set(docId, label);
    }
  }
}

if (errors.length) fail(errors);

const pypEntries = index.entries.filter(entry => entry.mode.startsWith('pyp'));
const importPackEntries = index.entries.filter(entry => entry.mode === 'pyp-import-pack');
console.log(JSON.stringify({
  ok: true,
  totalEntries: index.entries.length,
  pypEntries: pypEntries.length,
  pypQuestions: pypEntries.reduce((sum, entry) => sum + entry.count, 0),
  readyPypEntries: pypEntries.filter(entry => entry.readyForStudentUse).length,
  reviewPypEntries: pypEntries.filter(entry => !entry.readyForStudentUse).length,
  importPackEntries: importPackEntries.length,
  importPackQuestions: importPackEntries.reduce((sum, entry) => sum + entry.count, 0),
  readyImportPackEntries: importPackEntries.filter(entry => entry.readyForStudentUse).length,
}, null, 2));
