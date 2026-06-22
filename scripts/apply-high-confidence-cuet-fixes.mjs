import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const questionRoot = path.join(root, 'questions');

const answerLetterToIndex = new Map([['A', 0], ['B', 1], ['C', 2], ['D', 3], ['E', 4]]);

async function listJsonFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await listJsonFiles(fullPath));
    if (entry.isFile() && entry.name.endsWith('.json')) files.push(fullPath);
  }
  return files.sort();
}

function getGroups(data) {
  if (Array.isArray(data)) return [{ questions: data }];
  if (Array.isArray(data?.questions)) return [{ meta: data, questions: data.questions }];
  if (Array.isArray(data?.chapters)) {
    return data.chapters
      .filter((chapter) => Array.isArray(chapter?.questions))
      .map((chapter) => ({ meta: chapter, questions: chapter.questions }));
  }
  return [];
}

function findExplicitAnswerIndex(explanation = '') {
  const patterns = [
    /\bAnswer\s*:\s*Option\s*([A-E])\b/gi,
    /\bcorrect answer is option\s*([A-E])\b/gi,
    /\boption\s*([A-E])\s+is\s+correct\b/gi,
  ];
  const matches = [];
  for (const pattern of patterns) {
    for (const match of explanation.matchAll(pattern)) {
      matches.push({ letter: match[1].toUpperCase(), index: match.index ?? 0 });
    }
  }
  matches.sort((a, b) => a.index - b.index);
  const last = matches.at(-1);
  return last ? answerLetterToIndex.get(last.letter) : null;
}

let subjectCodeFixes = 0;
let answerFixes = 0;
const changedFiles = [];

for (const file of await listJsonFiles(questionRoot)) {
  const original = await readFile(file, 'utf8');
  const data = JSON.parse(original);
  let changed = false;

  if (data?.subject === 'Economics' && String(data.subject_code) !== '309') {
    data.subject_code = '309';
    subjectCodeFixes += 1;
    changed = true;
  }

  for (const group of getGroups(data)) {
    for (const question of group.questions) {
      const expected = findExplicitAnswerIndex(question.explanation);
      if (
        expected != null
        && Array.isArray(question.options)
        && expected >= 0
        && expected < question.options.length
        && Number.isInteger(question.correct)
        && question.correct !== expected
      ) {
        if (!('correct_content_audit_original' in question)) {
          question.correct_content_audit_original = question.correct;
        }
        question.correct = expected;
        answerFixes += 1;
        changed = true;
      }
    }
  }

  if (changed) {
    await writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
    changedFiles.push(path.relative(root, file).replaceAll('\\', '/'));
  }
}

console.log(JSON.stringify({ subjectCodeFixes, answerFixes, changedFiles }, null, 2));
