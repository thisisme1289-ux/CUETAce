import fs from 'node:fs';

const file = 'questions/accountancy/AC16.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const patches = {
  AC16Q09: {
    correct: 0,
    explanation: 'Use the Plant & Machinery account: Opening balance ₹8,00,000 + purchases - depreciation ₹1,00,000 - book value of asset sold ₹1,50,000 = closing balance ₹10,00,000. Purchases = ₹10,00,000 + ₹1,00,000 + ₹1,50,000 - ₹8,00,000 = ₹4,50,000. The sale proceeds of ₹2,00,000 are a separate investing inflow, not a reduction of cash paid for purchases. Option A is correct.'
  },
  AC16Q14: {
    correct: 2,
    explanation: 'Net profit = ₹5,00,000 - ₹2,00,000 - ₹1,00,000 = ₹2,00,000. Working capital adjustments: decrease in debtors = +₹20,000; increase in creditors = +₹20,000; increase in stock = -₹15,000. Net adjustment = +₹25,000. Net Cash from Operating Activities = ₹2,00,000 + ₹25,000 = ₹2,25,000. Option C is correct.'
  },
  AC16Q37: {
    correct: 0,
    explanation: 'Cash paid for expenses = P&L expense - opening prepaid + closing prepaid + opening outstanding - closing outstanding. Therefore cash paid = ₹2,50,000 - ₹15,000 + ₹25,000 + ₹30,000 - ₹20,000 = ₹2,70,000. Option A is correct.'
  },
  AC16Q57: {
    options: [
      '₹2,20,000',
      '₹4,30,000',
      '₹2,80,000',
      '₹3,90,000'
    ],
    correct: 0,
    explanation: 'Cash received from customers = cash sales ₹3,00,000 + credit sales ₹7,00,000 - increase in debtors ₹70,000 = ₹9,30,000. Cash paid to suppliers = cash purchases ₹2,00,000 + credit purchases ₹4,00,000 - increase in creditors ₹40,000 = ₹5,60,000. Net Cash from Operating Activities = ₹9,30,000 - ₹5,60,000 - operating expenses paid ₹1,50,000 = ₹2,20,000. Option A is correct.'
  },
  AC16Q90: {
    options: [
      '₹8,80,000',
      '₹9,80,000',
      '₹10,10,000',
      '₹9,20,000'
    ],
    correct: 0,
    explanation: 'Start with net profit before tax ₹12,00,000. Add depreciation ₹1,50,000 and bad debts written off ₹30,000; deduct profit on disposal ₹50,000. Operating profit before working-capital changes = ₹13,30,000. Working-capital changes: debtors increase net of bad debts = ₹40,000 decrease; creditors decrease = ₹40,000 decrease; stock increase = ₹90,000 decrease; outstanding expenses increase = ₹20,000 increase. Net working-capital adjustment = -₹1,50,000, giving ₹11,80,000 before tax. Less tax paid ₹3,00,000 = ₹8,80,000. Option A is correct.'
  },
  AC16Q92: {
    correct: 0,
    explanation: 'Cash received from interest = interest income + opening accrued interest - closing accrued interest - opening interest received in advance + closing interest received in advance. Therefore cash received = ₹60,000 + ₹8,000 - ₹12,000 - ₹5,000 + ₹3,000 = ₹54,000. Option A is correct.'
  },
  AC16Q102: {
    question: 'The following balances are available: Machinery (gross) — Opening ₹15,00,000; Closing ₹18,00,000. Accumulated Depreciation — Opening ₹4,00,000; Closing ₹5,50,000. Machinery with cost ₹3,00,000 and accumulated depreciation ₹1,50,000 was sold for ₹1,80,000. What depreciation was charged during the year?',
    correct: 0,
    explanation: 'Use the Accumulated Depreciation account: opening accumulated depreciation ₹4,00,000 + depreciation charged during the year - accumulated depreciation on machinery sold ₹1,50,000 = closing accumulated depreciation ₹5,50,000. Depreciation charged = ₹5,50,000 + ₹1,50,000 - ₹4,00,000 = ₹3,00,000. Option A is correct.'
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
console.log(`Patched ${changed} AC16 questions`);
