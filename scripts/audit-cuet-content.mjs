import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const questionRoot = path.join(root, 'questions');
const outFile = path.join(root, 'cuet-content-audit.json');

const nta2026 = {
  source: 'NTA CUET (UG) 2026 Information Bulletin and 2026 subject syllabus PDFs',
  examMode: 'Computer Based Test (CBT)',
  questionPaperPattern: 'Objective type Multiple Choice Questions (MCQs)',
  questionsPerTestPaper: 50,
  allQuestionsCompulsory: true,
  durationMinutesPerTestPaper: 60,
  marking: { correct: 5, incorrect: -1 },
  supportedSubjectsInThisRepo: {
    '101': 'English',
    '301': 'Accountancy / Book-Keeping',
    '305': 'Business Studies',
    '309': 'Economics / Business Economics',
    '501': 'General Aptitude Test',
  },
};

const syllabusUnits = {
  English: [
    'Reading Comprehension: factual, narrative, literary passages up to 300 words',
    'Verbal Ability',
    'Rearranging parts',
    'Match the following',
    'Choosing the correct word',
    'Synonyms and Antonyms',
  ],
  Accountancy: [
    'Accounting for Partnership',
    'Reconstitution of a Partnership Firm',
    'Dissolution of Partnership Firm',
    'Company Accounts: Share and Debenture Capital',
    'Analysis of Financial Statements',
    'Optional: Computerised Accounting System',
  ],
  'Business Studies': [
    'Nature and Significance of Management',
    'Principles of Management',
    'Business Environment',
    'Planning',
    'Organising',
    'Staffing',
    'Directing',
    'Controlling',
    'Business Finance',
    'Financial Markets',
    'Marketing',
    'Consumer Protection',
  ],
  Economics: [
    'Introductory Microeconomics: consumer behaviour, production/cost, perfect competition, market equilibrium',
    'Introductory Macroeconomics: national income, money and banking, income/employment, government budget, open economy',
    'Indian Economic Development: 1947-90, reforms since 1991, current challenges, India and neighbours',
  ],
  'General Test': [
    'General Knowledge',
    'Current Affairs',
    'General Mental Ability',
    'Numerical Ability',
    'Quantitative Reasoning: arithmetic, algebra, geometry, mensuration, statistics',
    'Logical and Analytical Reasoning',
    'General Science and Environment Literacy',
  ],
};

const expectedSubjectCodes = new Map([
  ['English', '101'],
  ['Accountancy', '301'],
  ['Business Studies', '305'],
  ['Economics', '309'],
  ['General Test', '501'],
]);

const brokenExplanationPatterns = [
  /\bnone (?:of the|match|matches|exactly)\b/i,
  /\bnot in options\b/i,
  /\boption(?:s)? (?:do not|don't|doesn't) match\b/i,
  /\bhmm\b/i,
  /\bwait\b/i,
  /\brecheck\b/i,
  /\bre-examin/i,
  /\bclosest option\b/i,
  /\bclosest answer\b/i,
  /\bintended answer\b/i,
  /\bdesigned answer\b/i,
  /\bcorrected distractor\b/i,
  /\bpossible error\b/i,
  /\bambig(?:uous|uity)\b/i,
];

const mojibakePattern = /(?:â|Ã|�|â‚|â‰|âœ|Â)/;
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

function getQuestionGroups(data) {
  if (Array.isArray(data)) return [{ label: 'root', meta: {}, questions: data }];
  if (Array.isArray(data?.questions)) return [{ label: data.chapter_id || data.section_code || 'questions', meta: data, questions: data.questions }];
  if (Array.isArray(data?.chapters)) {
    return data.chapters
      .filter((chapter) => Array.isArray(chapter?.questions))
      .map((chapter, index) => ({ label: chapter.chapter_id || chapter.chapter || `chapter-${index + 1}`, meta: chapter, questions: chapter.questions }));
  }
  return [];
}

function findAnswerLetter(text = '') {
  const patterns = [
    /\bAnswer\s*:\s*Option\s*([A-E])\b/gi,
    /\bcorrect answer is option\s*([A-E])\b/gi,
    /\boption\s*([A-E])\s+is\s+correct\b/gi,
    /\bOption\s*([A-E])\s*[—-]\s*[^.]{0,120}\b(?:is|are)\b/gi,
  ];

  const matches = [];
  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) {
      matches.push({ letter: match[1].toUpperCase(), index: match.index ?? 0, phrase: match[0] });
    }
  }
  matches.sort((a, b) => a.index - b.index);
  return matches.at(-1) || null;
}

function hasMojibake(value) {
  if (typeof value === 'string') return mojibakePattern.test(value);
  if (Array.isArray(value)) return value.some(hasMojibake);
  if (value && typeof value === 'object') return Object.values(value).some(hasMojibake);
  return false;
}

function snippet(value, max = 220) {
  const text = String(value ?? '').replace(/\s+/g, ' ').trim();
  return text.length > max ? `${text.slice(0, max)}...` : text;
}

function addCount(target, key) {
  target[key] = (target[key] || 0) + 1;
}

const files = await listJsonFiles(questionRoot);
const report = {
  generatedAt: new Date().toISOString(),
  nta2026,
  syllabusUnits,
  totals: {
    files: files.length,
    questions: 0,
    subjects: {},
    types: {},
    difficulty: {},
    levels: {},
    correctValues: {},
  },
  guidelineIssues: [],
  chapterCoverage: {},
  answerIndexAudit: {
    checkedFromExplanation: 0,
    matchesExplanation: 0,
    conflictsWithExplanation: [],
    possibleOneBasedLeftovers: [],
  },
  qualityFlags: {
    mojibake: [],
    brokenOrAmbiguousExplanation: [],
    duplicateOptions: [],
    missingChapterMeta: [],
    thinExplanation: [],
  },
  recommendations: [],
};

for (const file of files) {
  const relativeFile = path.relative(root, file).replaceAll('\\', '/');
  const data = JSON.parse(await readFile(file, 'utf8'));
  const groups = getQuestionGroups(data);

  for (const group of groups) {
    const subject = group.meta.subject || data.subject || (relativeFile.match(/^questions\/([^/]+)/)?.[1] ?? 'Unknown');
    const subjectName = subject
      .replace('business-studies', 'Business Studies')
      .replace('general-test', 'General Test')
      .replace('accountancy', 'Accountancy')
      .replace('economics', 'Economics')
      .replace('english', 'English');
    const expectedCode = expectedSubjectCodes.get(subjectName);
    const actualCode = group.meta.subject_code || data.subject_code;

    addCount(report.totals.subjects, subjectName);

    if (expectedCode && actualCode && String(actualCode) !== expectedCode) {
      report.guidelineIssues.push({
        file: relativeFile,
        group: group.label,
        issue: 'Subject code does not match NTA CUET UG 2026 subject list.',
        expectedCode,
        actualCode: String(actualCode),
      });
    }

    const chapter = group.meta.chapter || group.meta.section || data.chapter || data.section || '';
    if (!chapter && relativeFile !== 'questions/2025-questions.json') {
      report.qualityFlags.missingChapterMeta.push({ file: relativeFile, group: group.label, issue: 'Chapter/section name is empty.' });
    }

    if (!report.chapterCoverage[subjectName]) {
      report.chapterCoverage[subjectName] = { expectedNtaSyllabus: syllabusUnits[subjectName] || [], chapters: [] };
    }
    report.chapterCoverage[subjectName].chapters.push({
      id: group.meta.chapter_id || group.meta.section_code || group.label,
      name: chapter,
      count: group.questions.length,
    });

    group.questions.forEach((question, index) => {
      const questionNo = index + 1;
      report.totals.questions += 1;
      addCount(report.totals.types, question.type || '<missing>');
      addCount(report.totals.difficulty, question.difficulty || '<missing>');
      addCount(report.totals.levels, question.level || '<missing>');
      addCount(report.totals.correctValues, String(question.correct));

      if (question.type && !Array.isArray(question.options)) {
        report.guidelineIssues.push({
          file: relativeFile,
          id: question.id,
          questionNo,
          issue: 'NTA pattern is MCQ; question has no options array.',
        });
      }

      if (Array.isArray(question.options) && question.options.length < 4) {
        report.guidelineIssues.push({
          file: relativeFile,
          id: question.id,
          questionNo,
          issue: 'Question has fewer than four options.',
          options: question.options.length,
        });
      }

      if (Array.isArray(question.options)) {
        const normalizedOptions = question.options.map((option) => String(option).trim().toLowerCase());
        if (new Set(normalizedOptions).size !== normalizedOptions.length) {
          report.qualityFlags.duplicateOptions.push({
            file: relativeFile,
            id: question.id,
            questionNo,
            options: question.options,
          });
        }
      }

      if (hasMojibake(question)) {
        report.qualityFlags.mojibake.push({
          file: relativeFile,
          id: question.id,
          questionNo,
          question: snippet(question.question),
        });
      }

      if (typeof question.explanation === 'string') {
        if (question.explanation.trim().length < 45) {
          report.qualityFlags.thinExplanation.push({
            file: relativeFile,
            id: question.id,
            questionNo,
            explanation: snippet(question.explanation),
          });
        }

        const matchedPattern = brokenExplanationPatterns.find((pattern) => pattern.test(question.explanation));
        if (matchedPattern) {
          report.qualityFlags.brokenOrAmbiguousExplanation.push({
            file: relativeFile,
            id: question.id,
            questionNo,
            correct: question.correct,
            reason: matchedPattern.toString(),
            explanation: snippet(question.explanation, 360),
          });
        }

        const answerMention = findAnswerLetter(question.explanation);
        if (answerMention && answerLetterToIndex.has(answerMention.letter)) {
          const expectedIndex = answerLetterToIndex.get(answerMention.letter);
          report.answerIndexAudit.checkedFromExplanation += 1;
          if (question.correct === expectedIndex) {
            report.answerIndexAudit.matchesExplanation += 1;
          } else {
            report.answerIndexAudit.conflictsWithExplanation.push({
              file: relativeFile,
              id: question.id,
              questionNo,
              storedCorrect: question.correct,
              explanationSays: `Option ${answerMention.letter}`,
              expectedZeroBasedCorrect: expectedIndex,
              phrase: answerMention.phrase,
              question: snippet(question.question),
              selectedOption: Array.isArray(question.options) ? question.options[question.correct] : null,
              explanationOption: Array.isArray(question.options) ? question.options[expectedIndex] : null,
            });
          }
        }
      }

      if (
        Number.isInteger(question.correct)
        && question.correct > 0
        && Array.isArray(question.options)
        && question.correct < question.options.length
        && !('correct_original' in question)
      ) {
        report.answerIndexAudit.possibleOneBasedLeftovers.push({
          file: relativeFile,
          id: question.id,
          questionNo,
          storedCorrect: question.correct,
          ifOneBasedThenCorrectShouldBe: question.correct - 1,
          question: snippet(question.question),
          storedSelectedOption: question.options[question.correct],
          oneBasedSelectedOption: question.options[question.correct - 1],
        });
      }
    });
  }
}

for (const [subject, coverage] of Object.entries(report.chapterCoverage)) {
  const counts = coverage.chapters.map((chapter) => chapter.count);
  const lowCount = coverage.chapters.filter((chapter) => chapter.count < 200);
  const emptyNames = coverage.chapters.filter((chapter) => !chapter.name);
  if (lowCount.length) {
    report.recommendations.push({
      subject,
      issue: 'Some chapters/sections have fewer than 200 questions; prioritize these if increasing the bank.',
      chapters: lowCount,
    });
  }
  if (emptyNames.length) {
    report.recommendations.push({
      subject,
      issue: 'Add user-facing section/chapter names so the website and audits can map them to NTA syllabus units.',
      chapters: emptyNames,
    });
  }
  if (counts.length && subject !== 'English') {
    const total = counts.reduce((sum, count) => sum + count, 0);
    report.recommendations.push({
      subject,
      issue: 'For NTA-style mocks, assemble 50-question papers from these chapter pools with MCQ-only rendering, +5/-1 scoring, and 60-minute timing.',
      availableQuestionPool: total,
    });
  }
}

report.recommendations.push({
  issue: 'Do not bulk-fix all answers from pattern alone. First apply high-confidence fixes where the explanation explicitly names an option, then review broken/ambiguous explanations chapter by chapter.',
});

await writeFile(outFile, `${JSON.stringify(report, null, 2)}\n`);
console.log(`Wrote ${path.relative(root, outFile)} with ${report.totals.questions} questions audited.`);
console.log(`Answer mentions checked: ${report.answerIndexAudit.checkedFromExplanation}; conflicts: ${report.answerIndexAudit.conflictsWithExplanation.length}.`);
console.log(`Broken/ambiguous explanations: ${report.qualityFlags.brokenOrAmbiguousExplanation.length}; mojibake flags: ${report.qualityFlags.mojibake.length}.`);
