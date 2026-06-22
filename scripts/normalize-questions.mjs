import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.argv[2] || 'questions';
const dryRun = process.argv.includes('--dry-run');

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

function collectQuestionGroups(data) {
  const groups = [];
  if (Array.isArray(data)) groups.push(data);
  if (data && Array.isArray(data.questions)) groups.push(data.questions);
  if (data && Array.isArray(data.chapters)) {
    data.chapters.forEach((chapter) => {
      if (Array.isArray(chapter?.questions)) groups.push(chapter.questions);
    });
  }
  return groups;
}

const summary = {
  filesScanned: 0,
  filesChanged: 0,
  correctIndexesNormalized: 0,
  whitespaceDifficultyKeysRenamed: 0,
  changedFiles: [],
};

for (const file of await listJsonFiles(root)) {
  summary.filesScanned += 1;
  const originalText = await readFile(file, 'utf8');
  const data = JSON.parse(originalText);
  let changed = false;

  for (const questions of collectQuestionGroups(data)) {
    questions.forEach((question) => {
      if (!question || typeof question !== 'object' || Array.isArray(question)) return;

      if ('difficulty ' in question) {
        if (!('difficulty' in question)) question.difficulty = question['difficulty '];
        question.difficulty_legacy_key = question['difficulty '];
        delete question['difficulty '];
        summary.whitespaceDifficultyKeysRenamed += 1;
        changed = true;
      }

      if (Number.isInteger(question.correct) && Array.isArray(question.options)) {
        const optionCount = question.options.length;
        if (question.correct === optionCount && optionCount > 0) {
          if (!('correct_original' in question)) question.correct_original = question.correct;
          question.correct = question.correct - 1;
          summary.correctIndexesNormalized += 1;
          changed = true;
        }
      }
    });
  }

  if (changed) {
    summary.filesChanged += 1;
    summary.changedFiles.push(file);
    if (!dryRun) {
      await writeFile(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
    }
  }
}

console.log(JSON.stringify({ ...summary, dryRun }, null, 2));

