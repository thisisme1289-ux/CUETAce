import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.argv[2] || 'questions';

const structuralKeys = new Set([
  'passage',
  'paragraph',
  'context',
  'case',
  'case_study',
  'caseStudy',
  'sentence',
  'statements',
  'column_i',
  'column_ii',
  'image',
  'table',
  'data',
]);

async function listJsonFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listJsonFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      files.push(fullPath);
    }
  }
  return files.sort();
}

function getQuestionGroups(data) {
  if (Array.isArray(data)) return [{ label: 'root', questions: data }];
  if (data && Array.isArray(data.questions)) return [{ label: 'questions', questions: data.questions }];
  if (data && 'questions' in data && data.questions != null && !Array.isArray(data.questions)) {
    return [{ label: 'questions', questions: data.questions, invalid: true }];
  }
  if (data && Array.isArray(data.chapters)) {
    return data.chapters
      .map((chapter, index) => ({
        label: chapter?.chapter_id || chapter?.chapter || `chapters[${index}]`,
        questions: chapter?.questions,
      }))
      .filter((group) => Array.isArray(group.questions));
  }
  return null;
}

const files = await listJsonFiles(root);
const report = {
  root,
  files: files.length,
  questions: 0,
  parseErrors: [],
  shapeIssues: [],
  missingRequiredFields: [],
  correctIndexIssues: [],
  suspiciousKeys: [],
  structuralFieldCounts: {},
  typeCounts: {},
  fileSummaries: [],
};

for (const file of files) {
  let data;
  try {
    data = JSON.parse(await readFile(file, 'utf8'));
  } catch (error) {
    report.parseErrors.push({ file, message: error.message });
    continue;
  }

  const groups = getQuestionGroups(data);
  if (!groups || groups.length === 0) {
    report.shapeIssues.push({
      file,
      issue: 'No question array found. Expected a root array, questions: [], or chapters[].questions[].',
    });
    report.fileSummaries.push({ file, questions: 0, keys: [] });
    continue;
  }

  const fileKeys = new Set();
  let fileQuestionCount = 0;
  groups.forEach((group) => {
  if (!Array.isArray(group.questions)) {
    report.shapeIssues.push({
      file,
      group: group.label,
      issue: 'Question group is not an array.',
      type: typeof group.questions,
    });
    return;
  }

  group.questions.forEach((question, index) => {
    const questionNo = fileQuestionCount + index + 1;
    if (!question || typeof question !== 'object' || Array.isArray(question)) {
      report.shapeIssues.push({ file, group: group.label, questionNo, issue: 'Question is not an object.' });
      return;
    }

    report.questions += 1;
    Object.keys(question).forEach((key) => fileKeys.add(key));
    report.typeCounts[question.type || '<missing>'] = (report.typeCounts[question.type || '<missing>'] || 0) + 1;

    for (const field of ['id', 'type', 'question', 'options', 'correct', 'explanation']) {
      if (!(field in question)) {
        report.missingRequiredFields.push({ file, questionNo, id: question.id || null, field });
      }
    }

    for (const key of Object.keys(question)) {
      const trimmed = key.trim();
      const lower = trimmed.toLowerCase();
      if (key !== trimmed) {
        report.suspiciousKeys.push({ file, group: group.label, questionNo, id: question.id || null, key, issue: 'Key has leading/trailing whitespace.' });
      }
      if (structuralKeys.has(key) || structuralKeys.has(trimmed) || lower.includes('passage') || lower.includes('paragraph')) {
        report.structuralFieldCounts[key] = (report.structuralFieldCounts[key] || 0) + 1;
      }
    }

    if (!Array.isArray(question.options) || question.options.length === 0) {
      report.shapeIssues.push({ file, group: group.label, questionNo, id: question.id || null, issue: 'Options must be a non-empty array.' });
    }

    if (Number.isInteger(question.correct) && Array.isArray(question.options)) {
      if (question.correct < 0 || question.correct >= question.options.length) {
        report.correctIndexIssues.push({
          file,
          questionNo,
          id: question.id || null,
          correct: question.correct,
          options: question.options.length,
          likelyOneBased: question.correct === question.options.length,
        });
      }
    } else if ('correct' in question) {
      report.correctIndexIssues.push({
        file,
        questionNo,
        id: question.id || null,
        correct: question.correct,
        options: Array.isArray(question.options) ? question.options.length : null,
        issue: 'Correct answer is not an integer index.',
      });
    }
  });
  fileQuestionCount += group.questions.length;
  });

  report.fileSummaries.push({
    file,
    questions: fileQuestionCount,
    keys: [...fileKeys].sort(),
  });
}

console.log(JSON.stringify(report, null, 2));
