import { readFile, writeFile } from 'node:fs/promises';

const file = 'questions/accountancy/AC08.json';
const data = JSON.parse(await readFile(file, 'utf8'));

const fixes = new Map(Object.entries({
  AC08Q09: {
    options: ['Loss of ₹42,000; shared as A:₹21,000, B:₹14,000, C:₹7,000', 'Profit of ₹12,000; shared as A:₹6,000, B:₹4,000, C:₹2,000', 'Loss of ₹48,000; shared as A:₹24,000, B:₹16,000, C:₹8,000', 'Profit of ₹18,000; shared as A:₹9,000, B:₹6,000, C:₹3,000'],
    correct: 0,
    explanation: 'Realisation Account shows debit total ₹5,40,000 and credit total ₹4,98,000, so the result is a loss of ₹42,000. The loss is shared in the profit-sharing ratio 3:2:1. A bears ₹21,000, B bears ₹14,000, and C bears ₹7,000.'
  },
  AC08Q13: {
    options: ['Loss ₹32,400', 'Profit ₹9,600', 'Loss ₹24,000', 'Profit ₹14,400'],
    correct: 0,
    explanation: 'Asset loss = ₹4,50,000 - ₹3,90,000 = ₹60,000. Saving on liabilities = ₹1,80,000 - ₹1,65,000 = ₹15,000. Dissolution expenses are ₹9,000. Net realisation loss = ₹60,000 - ₹15,000 + ₹9,000 = ₹54,000. P bears 3/5 of the loss = ₹32,400.'
  },
  AC08Q21: {
    options: ['Loss ₹40,000', 'Profit ₹10,000', 'Loss ₹5,000', 'Profit ₹5,000'],
    correct: 0,
    explanation: 'Fixed assets loss = ₹40,000. Debtors loss = ₹8,000. Stock gain = ₹8,000. Creditors saving = ₹5,000. Dissolution expenses = ₹5,000. Net result = -₹40,000 - ₹8,000 + ₹8,000 + ₹5,000 - ₹5,000 = loss of ₹40,000.'
  },
  AC08Q24: {
    options: ['₹1,24,000', '₹1,92,000', '₹2,08,000', '₹1,80,000'],
    correct: 0,
    explanation: 'Non-cash assets = ₹8,00,000 - ₹20,000 = ₹7,80,000. Asset loss = ₹7,80,000 - ₹5,80,000 = ₹2,00,000. Saving on liabilities = ₹2,50,000 - ₹2,30,000 = ₹20,000. Expenses = ₹10,000. Net realisation loss = ₹1,90,000. B bears 2/5 of the loss = ₹76,000. B’s final capital settlement = ₹2,00,000 - ₹76,000 = ₹1,24,000.'
  },
  AC08Q26: {
    options: ['₹6,250', '₹3,000', '₹6,000', '₹2,000'],
    correct: 0,
    explanation: 'Machinery loss = ₹20,000, debtors loss = ₹5,000, and stock loss = ₹2,000, giving total asset loss of ₹27,000. Creditors saving = ₹50,000 - ₹48,000 = ₹2,000. Net realisation loss = ₹25,000. Z bears 1/4 of the loss = ₹6,250.'
  },
  AC08Q38: {
    options: ['P: ₹1,34,000 (Cr); Q: ₹1,01,000 (Cr)', 'P: ₹1,34,000 (Cr); Q: ₹85,000 (Cr)', 'P: ₹1,24,000 (Cr); Q: ₹1,01,000 (Cr)', 'P: ₹1,44,000 (Cr); Q: ₹96,000 (Cr)'],
    correct: 0,
    explanation: 'Realisation profit is shared P:Q = 3:2. P gets ₹24,000 and Q gets ₹16,000. P’s debit current account reduces his claim: ₹1,20,000 - ₹10,000 + ₹24,000 = ₹1,34,000 credit. Q’s credit current account increases his claim: ₹80,000 + ₹5,000 + ₹16,000 = ₹1,01,000 credit.'
  },
  AC08Q48: {
    options: ['Gain ₹15,000', 'Gain ₹55,000', 'Loss ₹15,000', 'Gain ₹5,000'],
    correct: 1,
    explanation: 'Investments have a book value of ₹2,00,000 and fair value ₹2,40,000, giving a gain of ₹40,000. The fully amortised patent has zero book value and is sold for ₹30,000, giving a gain of ₹30,000. Plant net book value is ₹1,50,000 - ₹25,000 = ₹1,25,000 and it is sold for ₹1,10,000, giving a loss of ₹15,000. Net gain = ₹40,000 + ₹30,000 - ₹15,000 = ₹55,000.'
  },
  AC08Q52: {
    options: ['Loss ₹87,000', 'Loss ₹81,000', 'Loss ₹1,01,000', 'Profit ₹30,000'],
    correct: 0,
    explanation: 'Asset loss = ₹14,00,000 - ₹12,50,000 = ₹1,50,000. Saving on liabilities = ₹3,00,000 - ₹2,80,000 = ₹20,000. Dissolution expenses borne by the firm are ₹15,000. Net realisation loss = ₹1,50,000 - ₹20,000 + ₹15,000 = ₹1,45,000. P bears 60% of the loss = ₹87,000.'
  },
  AC08Q65: {
    options: ['Profit ₹35,400', 'Profit ₹36,000', 'Loss ₹12,000', 'Profit ₹54,000'],
    correct: 0,
    explanation: 'Land gain = ₹1,00,000. Machinery loss = ₹30,000. Debtors loss = 10% of ₹80,000 = ₹8,000. Creditors saving = ₹5,000. Expenses = ₹8,000. Net realisation profit = ₹1,00,000 - ₹30,000 - ₹8,000 + ₹5,000 - ₹8,000 = ₹59,000. A’s 60% share = ₹35,400.'
  },
  AC08Q70: {
    options: ['Profit ₹1,800', 'Profit ₹4,500', 'Profit ₹6,000', 'Loss ₹3,000'],
    correct: 0,
    explanation: 'Stock loss = ₹5,000, debtors loss = ₹3,000, and investments gain = ₹15,000, so net asset gain is ₹7,000. Creditors saving is ₹2,000 and expenses are ₹3,000. Net realisation profit = ₹7,000 + ₹2,000 - ₹3,000 = ₹6,000. Y’s share is 3/10 x ₹6,000 = ₹1,800.'
  },
  AC08Q76: {
    options: ['Net Loss ₹10,000', 'Net gain ₹15,000 overall', 'Net Loss ₹5,000', 'No net profit or loss'],
    correct: 3,
    explanation: 'The creditor of ₹45,000 accepts plant with book value ₹50,000, so the plant gives a realisation loss of ₹5,000 and there is no creditor saving on that settlement. The other creditor of ₹30,000 is paid ₹25,000, giving a saving of ₹5,000. Net effect = ₹5,000 loss + ₹5,000 gain = nil.'
  },
  AC08Q78: {
    options: ['₹1,84,000', '₹1,94,000', '₹2,00,000', '₹1,80,000'],
    correct: 0,
    explanation: 'F’s share in the 2:2:1 ratio is 1/5. F receives General Reserve ₹10,000, Investments Fluctuation Reserve ₹4,000, and Realisation profit ₹20,000. F’s final entitlement = opening capital ₹1,50,000 + ₹10,000 + ₹4,000 + ₹20,000 = ₹1,84,000.'
  },
  AC08Q80: {
    options: ['Loss ₹25,800', 'Loss ₹43,000', 'Loss ₹36,000', 'Loss ₹31,800'],
    correct: 3,
    explanation: 'Debit total = ₹2,50,000 + ₹80,000 + ₹60,000 + ₹12,000 + ₹1,10,000 = ₹5,12,000. Credit total = ₹1,20,000 + ₹2,10,000 + ₹75,000 + ₹54,000 = ₹4,59,000. Realisation loss = ₹53,000. A bears 3/5 of the loss = ₹31,800.'
  },
  AC08Q90: {
    options: ['₹1,19,000', '₹1,16,000', '₹1,07,000', '₹1,12,000'],
    correct: 0,
    explanation: 'C’s share in the 3:2:1 ratio is 1/6. C receives realisation profit ₹12,000 and General Reserve ₹10,000, and bears P&L debit balance ₹3,000. C’s capital after transfers = ₹1,00,000 + ₹12,000 + ₹10,000 - ₹3,000 = ₹1,19,000.'
  },
  AC08Q96: {
    options: ['Profit ₹17,000', 'Loss ₹1,03,000', 'Profit ₹5,000', 'Loss ₹33,000'],
    correct: 1,
    explanation: 'Fixed assets loss = ₹5,00,000 - ₹4,20,000 = ₹80,000. Current assets loss = ₹2,50,000 - ₹2,30,000 = ₹20,000. Liability saving = ₹1,80,000 - ₹1,68,000 = ₹12,000. Expenses are ₹15,000. Net result = ₹80,000 + ₹20,000 - ₹12,000 + ₹15,000 = loss of ₹1,03,000.'
  },
  AC08Q102: {
    options: ['Loss ₹10,000', 'Gain ₹30,000', 'Loss ₹30,000', 'Gain ₹10,000'],
    correct: 1,
    explanation: 'Machinery net book value = ₹3,00,000 - ₹50,000 = ₹2,50,000 and it is taken over at ₹2,80,000, giving a gain of ₹30,000. Furniture gives a loss of ₹10,000. Stock is transferred at cost to settle ₹1,30,000 debt, creating a creditor saving of ₹10,000. Net result = ₹30,000 - ₹10,000 + ₹10,000 = gain of ₹30,000.'
  },
  AC08Q107: {
    options: ['Loss ₹2,400', 'Loss ₹3,600', 'Profit ₹3,600', 'Loss ₹6,300'],
    correct: 3,
    explanation: 'Machinery loss is ₹40,000. Debtors have book value ₹1,50,000, provision ₹10,000, and cash collection ₹1,30,000, so debtor loss is ₹10,000. Stock gain is ₹20,000, creditor saving is ₹5,000, dissolution expenses are ₹8,000, and unrecorded asset realised is ₹12,000. Net realisation loss = ₹21,000. S bears 3/10 of the loss = ₹6,300.'
  },
  AC08Q109: {
    options: ['Yes — E’s capital ₹4,00,000 can absorb E’s loss of ₹48,000 easily', 'No — E’s capital turns negative; E must bring in cash', 'Yes — E’s loss is ₹4,80,000 but capital ₹4,00,000 needs top-up of ₹80,000', 'E’s capital exactly equals loss — zero balance'],
    correct: 0,
    explanation: 'Realisation loss = ₹22,40,000 - ₹20,00,000 = ₹2,40,000. E’s share in the 5:3:2 ratio is 2/10, so E bears ₹48,000. E’s capital after loss = ₹4,00,000 - ₹48,000 = ₹3,52,000 credit, so the capital is sufficient.'
  },
  AC08Q114: {
    options: ['Loss ₹2,70,000; Q’s loss ₹81,000', 'Profit ₹70,000; Q’s profit ₹21,000', 'Loss ₹80,000; Q’s loss ₹24,000', 'Loss ₹1,30,000; Q’s loss ₹39,000'],
    correct: 0,
    explanation: 'Non-cash assets = ₹20,00,000 - ₹2,00,000 = ₹18,00,000. They realise 85%, so asset loss = 15% of ₹18,00,000 = ₹2,70,000. Liabilities are paid at 95%, giving a saving of ₹30,000, and expenses are ₹30,000. The saving and expenses cancel, so net realisation loss is ₹2,70,000. Q bears 3/10 = ₹81,000.'
  }
}));

let changed = 0;
for (const question of data.questions) {
  const fix = fixes.get(question.id);
  if (!fix) continue;
  if (!('correct_content_review_original' in question) && question.correct !== fix.correct) {
    question.correct_content_review_original = question.correct;
  }
  question.options = fix.options;
  question.correct = fix.correct;
  question.explanation = fix.explanation;
  changed += 1;
}

await writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Updated ${changed} AC08 questions in ${file}`);
