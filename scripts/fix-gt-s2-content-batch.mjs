import fs from 'node:fs';

const file = 'questions/general-test/GT-S2.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const patches = {
  'GT-S2Q46': {
    question: 'India gained independence on August 15, 1947. The Indian Constitution came into force on January 26, 1950. Counting from August 16, 1947 through January 26, 1950 inclusive, how many days elapsed?',
    explanation: 'Counting from August 16 to December 31, 1947 gives 138 days. The full year 1948 contributes 366 days because it was a leap year. The full year 1949 contributes 365 days. January 1 to January 26, 1950 contributes 26 days. Total = 138 + 366 + 365 + 26 = 895 days. Option B is correct.'
  },
  'GT-S2Q135': {
    correct: 0,
    explanation: "Earlier uses of 'Swaraj' could cover self-government within the British Empire, including Dominion Status. The Lahore Congress resolution of December 1929, passed under Jawaharlal Nehru's presidency, declared 'Purna Swaraj' or complete independence. It meant full sovereignty and severance of constitutional ties with Britain, not Dominion Status. Option A is correct."
  }
};

let changed = 0;
for (const question of data.questions) {
  const patch = patches[question.id];
  if (!patch) continue;

  if (Object.hasOwn(patch, 'correct') && question.correct !== patch.correct && !Object.hasOwn(question, 'correct_content_review_original')) {
    question.correct_content_review_original = question.correct;
  }

  Object.assign(question, patch);
  changed += 1;
}

if (changed !== Object.keys(patches).length) {
  throw new Error(`Expected ${Object.keys(patches).length} patches but applied ${changed}`);
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Patched ${changed} GT-S2 questions`);
