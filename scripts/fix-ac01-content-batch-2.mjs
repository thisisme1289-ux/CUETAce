import { readFile, writeFile } from 'node:fs/promises';

const file = 'questions/accountancy/AC01.json';
const data = JSON.parse(await readFile(file, 'utf8'));

const fixes = new Map(Object.entries({
  AC01Q103: {
    options: ['₹1,53,000', '₹2,04,000', '₹1,62,000', '₹1,41,000'],
    correct: 0,
    explanation: 'Interest on capital: X ₹40,000, Y ₹60,000 and Z ₹1,00,000; total ₹2,00,000. Y’s salary = ₹90,000. Residual profit = ₹3,00,000 − ₹2,90,000 = ₹10,000. Y’s share = 3/10 × ₹10,000 = ₹3,000. Y’s total entitlement = IOC ₹60,000 + salary ₹90,000 + residual share ₹3,000 = ₹1,53,000.'
  },
  AC01Q105: {
    options: ['₹5,000 Cr', '₹10,000 Dr', '₹30,000 Cr', '₹30,000 Dr'],
    correct: 0,
    explanation: 'Interest on capital: A ₹80,000 and B ₹40,000. Residual profit = ₹1,80,000 − ₹1,20,000 = ₹60,000. B’s share = 1/4 × ₹60,000 = ₹15,000. B’s current account = opening debit ₹50,000 + IOC ₹40,000 + share ₹15,000 = ₹5,000 credit.'
  },
  AC01Q113: {
    options: ['₹3,12,500', '₹2,00,000', '₹2,58,000', '₹2,42,000'],
    correct: 0,
    explanation: 'Interest on capital: K ₹1,80,000 and L ₹1,08,000. L’s salary = ₹1,20,000. Residual profit = ₹5,00,000 − ₹4,08,000 = ₹92,000. L’s share = 3/8 × ₹92,000 = ₹34,500. L’s total entitlement is ₹2,62,500, which is above the ₹2,00,000 guarantee, so the guarantee is not triggered. L’s current account = opening credit ₹50,000 + ₹1,08,000 + ₹1,20,000 + ₹34,500 = ₹3,12,500 Cr.'
  },
  AC01Q116: {
    options: ['Net profit transferred from P&L Account', 'Interest on drawings by partners', 'Interest on capital allowed to partners', 'Both A and B'],
    correct: 2,
    explanation: 'In a P&L Appropriation Account, net profit and interest on drawings appear on the credit side. Interest on capital, partners’ salary, partners’ commission, and the residual profit distributed to partners appear on the debit side. Therefore interest on capital allowed to partners appears on the debit side.'
  },
  AC01Q119: {
    options: ['₹47,200', '₹46,000', '₹30,000', '₹22,000'],
    correct: 0,
    explanation: 'Interest on capital totals ₹1,00,000 and Z’s salary is ₹24,000. Total appropriations = ₹1,24,000, so the residual is a loss of ₹24,000. Z bears 2/10 × ₹24,000 = ₹4,800. Z’s current account = opening credit ₹8,000 + IOC ₹20,000 + salary ₹24,000 − loss ₹4,800 = ₹47,200 Cr.'
  },
  AC01Q121: {
    options: ['₹92,000', '₹1,56,000', '₹1,76,000', '₹1,16,000'],
    correct: 0,
    explanation: 'Interest on capital: A ₹60,000, B ₹60,000 and C ₹80,000. A and B each get salary of ₹60,000, so total appropriations are ₹3,20,000. Profit is ₹3,00,000, leaving a residual loss of ₹20,000. C bears 4/10 × ₹20,000 = ₹8,000. C’s current account = opening credit ₹20,000 + IOC ₹80,000 − loss ₹8,000 = ₹92,000 Cr.'
  },
  AC01Q123: {
    options: ['₹1,54,333', '₹1,68,000', '₹75,000', '₹1,80,000'],
    correct: 2,
    explanation: 'Interest on capital: P ₹1,08,000 and Q ₹36,000. Q’s salary is ₹48,000, so residual profit = ₹28,000. P’s share = ₹18,667 and Q’s share = ₹9,333. Q’s total is ₹93,333, below the ₹1,00,000 guarantee; deficiency ₹6,667 is borne by P. P’s current account = opening credit ₹15,000 + IOC ₹1,08,000 + share ₹18,667 − guarantee burden ₹6,667 − drawings ₹60,000 = ₹75,000 Cr.'
  },
  AC01Q127: {
    options: ['₹2,90,000', '₹2,07,400', '₹2,40,000', '₹3,15,000'],
    correct: 1,
    explanation: 'Interest on capital: A ₹1,60,000, B ₹1,20,000 and C ₹80,000. C’s salary is ₹72,000. Residual profit = ₹68,000. A’s residual share = ₹27,200. B’s total is ₹1,40,400, below the ₹1,50,000 guarantee, so deficiency ₹9,600 is borne by A and C equally. A bears ₹4,800. A’s current account = opening credit ₹25,000 + IOC ₹1,60,000 + share ₹27,200 − guarantee burden ₹4,800 = ₹2,07,400 Cr.'
  },
  AC01Q128: {
    options: ['X is debited ₹18,000', 'X is credited ₹23,600', 'X is debited ₹18,500', 'X is credited ₹18,500'],
    correct: 0,
    explanation: 'Correct appropriations: X should receive IOC ₹40,000 plus residual profit share ₹2,000, total ₹42,000. Actual distribution gave X 5/10 × ₹1,20,000 = ₹60,000. X received ₹18,000 too much, so X is debited ₹18,000 in the rectification entry.'
  },
  AC01Q132: {
    options: ['₹18,333', '₹48,333', '₹38,333', '₹53,333'],
    correct: 0,
    explanation: 'Interest on capital totals ₹1,60,000, but profit is only ₹80,000, so the residual is a loss of ₹80,000. B’s loss share = ₹20,000. C’s total after IOC and loss is ₹20,000, below the ₹40,000 guarantee. Deficiency ₹20,000 is borne by A and B in 2:1; B bears ₹6,667. B’s current account = opening credit ₹5,000 + IOC ₹40,000 − loss ₹20,000 − guarantee burden ₹6,667 = ₹18,333 Cr.'
  },
  AC01Q134: {
    options: ['₹4,28,000', '₹4,12,000', '₹4,32,000', '₹3,72,000'],
    correct: 0,
    explanation: 'Interest on capital: P ₹60,000 and Q ₹40,000. Residual profit = ₹1,20,000 − ₹1,00,000 = ₹20,000. Q’s share = 2/5 × ₹20,000 = ₹8,000. Q’s closing capital = opening capital ₹4,00,000 + IOC ₹40,000 + share ₹8,000 − drawings ₹20,000 = ₹4,28,000.'
  },
  AC01Q136: {
    options: ['₹1,44,000', '₹1,68,000', '₹1,92,000', '₹1,20,000'],
    correct: 2,
    explanation: 'X’s interest on capital = ₹10,00,000 × 12% for the full year + ₹4,00,000 × 12% for 6 months = ₹1,20,000 + ₹24,000 = ₹1,44,000. Y’s interest on capital = ₹4,00,000 × 12% = ₹48,000. Total interest on capital = ₹1,44,000 + ₹48,000 = ₹1,92,000.'
  },
  AC01Q138: {
    options: ['₹90,000', '₹1,14,000', '₹70,000', '₹1,02,000'],
    correct: 2,
    explanation: 'Interest on capital: A ₹1,00,000 and B ₹50,000. Profit exactly equals total IOC, so residual profit is nil. B’s total is ₹50,000, below the ₹80,000 guarantee. Deficiency ₹30,000 is borne by A. A’s current account credit = IOC ₹1,00,000 − guarantee burden ₹30,000 = ₹70,000.'
  },
  AC01Q140: {
    options: ['₹2,45,000', '₹3,60,000', '₹3,10,000', '₹2,60,000'],
    correct: 0,
    explanation: 'The aggregate closing balance of partners’ current accounts equals net opening current-account balance plus net profit, because appropriations only distribute that profit among partners. Opening net balance = ₹20,000 + ₹15,000 − ₹10,000 = ₹25,000 credit. Add net profit ₹2,20,000. Total closing current account balances = ₹2,45,000 credit.'
  },
  AC01Q142: {
    options: ['₹2,26,000', '₹2,50,000', '₹3,30,000', '₹2,70,000'],
    correct: 0,
    explanation: 'Interest on capital totals ₹5,00,000 and C’s salary is ₹1,80,000. Residual profit = ₹8,00,000 − ₹6,80,000 = ₹1,20,000. B’s share = 3/10 × ₹1,20,000 = ₹36,000. A’s guarantee is not triggered because A receives ₹3,10,000, above ₹2,50,000. B’s current account = opening credit ₹40,000 + IOC ₹1,50,000 + share ₹36,000 = ₹2,26,000 Cr.'
  },
  AC01Q146: {
    options: ['₹72,000', '₹37,000', '₹60,000', '₹77,000'],
    correct: 1,
    explanation: 'Interest on capital totals ₹1,44,000, but profit is only ₹1,20,000, so the residual is a loss of ₹24,000. N bears ₹8,000 of the loss. O’s total after IOC and loss is ₹20,000, below the ₹35,000 guarantee. Deficiency ₹15,000 is borne by N. N’s current account = opening credit ₹12,000 + IOC ₹48,000 − loss ₹8,000 − guarantee burden ₹15,000 = ₹37,000 Cr.'
  },
  AC01Q150: {
    options: ['₹1,74,000 Cr', '₹2,10,000', '₹1,70,000', '₹2,30,000'],
    correct: 0,
    explanation: 'Interest on capital: A ₹1,00,000, B ₹80,000 and C ₹20,000. A’s salary is ₹60,000. Residual profit = ₹40,000. C’s share = 1/10 × ₹40,000 = ₹4,000. C’s closing capital under fluctuating capital = opening ₹2,00,000 + IOC ₹20,000 + share ₹4,000 − drawings ₹50,000 = ₹1,74,000 credit. If the original question expected a debit, the opening capital figure must be different; with the stated figures, the closing balance is ₹1,74,000 Cr.'
  },
  AC01Q153: {
    options: ['₹1,45,000', '₹1,30,000', '₹1,60,000', '₹1,15,000'],
    correct: 3,
    explanation: 'Interest on capital totals ₹2,40,000 and Q plus R salary totals ₹96,000. Residual profit = ₹64,000. P’s total entitlement is ₹1,21,600, below the ₹2,00,000 guarantee. Deficiency ₹78,400 is borne by Q and R equally, so R bears ₹39,200. R’s current account = opening credit ₹15,000 + IOC ₹72,000 + salary ₹48,000 + residual share ₹19,200 − guarantee burden ₹39,200 = ₹1,15,000 Cr.'
  },
  AC01Q156: {
    options: ['₹15,000', '₹5,000', '₹10,000', '₹20,000'],
    correct: 0,
    explanation: 'Total interest on capital is ₹30,000 and C’s salary is ₹15,000, so total appropriations before residual sharing are ₹45,000. Residual profit = ₹90,000 − ₹45,000 = ₹45,000. In the absence of any different ratio, residual profit is shared equally among A, B and C, so B’s residual profit share = ₹15,000.'
  },
  AC01Q157: {
    options: ['₹73,000', '₹65,500', '₹89,500', '₹53,500'],
    correct: 0,
    explanation: 'Interest on B’s loan is a charge against profit: ₹2,00,000 × 6% = ₹12,000. Profit transferred to P&L Appropriation Account = ₹3,00,000 − ₹12,000 = ₹2,88,000. Interest on capital totals ₹1,60,000 and A’s salary is ₹96,000, leaving residual profit ₹32,000. B’s share = 1/4 × ₹32,000 = ₹8,000. B’s current account = opening credit ₹25,000 + IOC ₹40,000 + residual share ₹8,000 = ₹73,000 Cr. Loan interest is credited separately to B’s loan account.'
  },
  AC01Q161: {
    options: ['₹2,19,200', '₹1,20,000', '₹2,49,200', '₹1,59,200'],
    correct: 1,
    explanation: 'Interest on capital totals ₹1,80,000. B and C salaries total ₹1,20,000. Residual profit = ₹4,20,000 − ₹3,00,000 = ₹1,20,000. A’s share = 4/10 × ₹1,20,000 = ₹48,000. C’s total is ₹1,50,000, below the ₹1,80,000 guarantee, so deficiency ₹30,000 is borne by A. A’s current account = opening credit ₹30,000 + IOC ₹72,000 + share ₹48,000 − guarantee burden ₹30,000 = ₹1,20,000 Cr.'
  },
  AC01Q163: {
    options: ['₹1,50,000', '₹1,38,000', '₹1,70,000', '₹1,10,000'],
    correct: 1,
    explanation: 'Interest on capital: X ₹1,20,000 and Y ₹60,000. Y’s salary = ₹72,000. Residual profit = ₹1,08,000. Y’s share = 1/3 × ₹1,08,000 = ₹36,000. Y’s total entitlement is ₹1,68,000, above the ₹1,20,000 guarantee, so the guarantee is not triggered. Y’s current account = opening credit ₹20,000 + IOC ₹60,000 + salary ₹72,000 + share ₹36,000 − drawings ₹50,000 = ₹1,38,000 Cr.'
  },
  AC01Q165: {
    options: ['₹1,57,000', '₹91,000', '₹81,000', '₹1,11,000'],
    correct: 0,
    explanation: 'A’s commission = 10% × ₹4,00,000 = ₹40,000. Interest on capital: A ₹1,20,000 and B ₹60,000. Residual profit = ₹4,00,000 − ₹40,000 − ₹1,80,000 = ₹1,80,000. B’s share = 2/5 × ₹1,80,000 = ₹72,000. B’s current account = opening credit ₹25,000 + IOC ₹60,000 + share ₹72,000 = ₹1,57,000 Cr.'
  },
  AC01Q169: {
    options: ['₹58,333', '₹48,333', '₹68,333', '₹38,000'],
    correct: 3,
    explanation: 'Net profit available after writing off accumulated loss = ₹1,80,000 − ₹30,000 = ₹1,50,000. Interest on capital totals ₹1,20,000 and A’s salary is ₹60,000, so total appropriations are ₹1,80,000. The residual is a loss of ₹30,000. B’s loss share = 1/3 × ₹30,000 = ₹10,000. B’s current account = opening credit ₹8,000 + IOC ₹40,000 − loss ₹10,000 = ₹38,000 Cr.'
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
console.log(`Updated ${changed} AC01 questions in ${file}`);
