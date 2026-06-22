import { readFile, writeFile } from 'node:fs/promises';

const file = 'questions/accountancy/AC01.json';
const data = JSON.parse(await readFile(file, 'utf8'));

const fixes = new Map(Object.entries({
  AC01Q171: {
    options: ['₹1,67,250', '₹1,42,500', '₹1,82,500', '₹1,22,500'],
    correct: 0,
    explanation: 'Interest on capital: A ₹30,000, B ₹30,000 and C ₹60,000. C’s salary = ₹96,000. Residual profit = ₹2,50,000 − ₹2,16,000 = ₹34,000. In 1:1:2, C’s residual share = ₹17,000. B receives only ₹38,500, so the guarantee deficiency is ₹11,500. A and C bear it equally, so C bears ₹5,750. C’s current account = IOC ₹60,000 + salary ₹96,000 + residual share ₹17,000 − guarantee burden ₹5,750 = ₹1,67,250 Cr.'
  },
  AC01Q173: {
    options: ['₹4,22,222', '₹4,75,556', '₹3,95,556', '₹5,15,556'],
    correct: 0,
    explanation: 'Interest on capital: P ₹4,00,000, Q ₹3,20,000 and R ₹80,000. R’s salary = ₹1,44,000. Residual profit = ₹12,00,000 − ₹9,44,000 = ₹2,56,000. Q’s residual share = 4/10 × ₹2,56,000 = ₹1,02,400. R receives ₹2,49,600, so the guarantee deficiency is ₹400. P and Q bear it in 5:4; Q bears 4/9 × ₹400 = ₹178 approximately. Q’s current account = ₹3,20,000 + ₹1,02,400 − ₹178 = ₹4,22,222 Cr.'
  },
  AC01Q175: {
    options: ['₹2,16,740', '₹2,31,400', '₹2,79,400', '₹2,07,400'],
    correct: 0,
    explanation: 'Interest on drawings: M ₹4,500 and N ₹900, total ₹5,400. Net profit for appropriation = ₹4,00,000 + ₹5,400 = ₹4,05,400. Interest on capital totals ₹2,00,000 and M’s salary is ₹1,20,000, leaving residual profit ₹85,400. M’s share = 3/5 × ₹85,400 = ₹51,240. M’s current account = opening credit ₹30,000 + IOC ₹1,20,000 + salary ₹1,20,000 + share ₹51,240 − IOD ₹4,500 − drawings ₹1,00,000 = ₹2,16,740 Cr.'
  },
  AC01Q177: {
    options: ['₹1,95,000', '₹2,20,000', '₹1,55,000', '₹2,45,000'],
    correct: 2,
    explanation: 'Interest on capital: X ₹1,00,000 and Y ₹50,000. Y’s salary = ₹48,000. Residual profit = ₹52,000. X’s share = 3/5 × ₹52,000 = ₹31,200. Y receives ₹1,18,800, so guarantee deficiency is ₹1,200, borne by X. X’s current account = opening credit ₹25,000 + IOC ₹1,00,000 + share ₹31,200 − guarantee burden ₹1,200 = ₹1,55,000 Cr.'
  },
  AC01Q180: {
    options: ['X is debited ₹7,600', 'X is credited ₹14,400', 'X is debited ₹9,600', 'X is credited ₹9,600'],
    correct: 0,
    explanation: 'Z was overcredited with interest on capital by ₹5,000. Recovering that amount gives X a credit of 2/5 × ₹5,000 = ₹2,000. Y’s omitted salary is ₹24,000, so the profit previously distributed was overstated by ₹24,000. X had received 2/5 × ₹24,000 = ₹9,600 too much. Net effect for X = debit ₹9,600 − credit ₹2,000 = net debit ₹7,600.'
  },
  AC01Q181: {
    options: ['₹4,950', '₹9,900', '₹14,850', '₹3,300'],
    correct: 0,
    explanation: 'Each partner draws ₹5,000 at the end of each month, so annual drawings per partner are ₹60,000. For end-of-month drawings, the average period is 5.5 months. Interest on drawings per partner = ₹60,000 × 6% × 5.5/12 = ₹1,650. For three partners, total interest on drawings = ₹1,650 × 3 = ₹4,950.'
  },
  AC01Q183: {
    options: ['₹1,45,200', '₹1,25,200', '₹1,36,000', '₹1,05,200'],
    correct: 2,
    explanation: 'Interest on capital: S ₹80,000, T ₹60,000 and U ₹60,000. T and U salaries total ₹1,20,000. Residual profit = ₹60,000. T’s residual share = ₹18,000. U receives ₹1,38,000, so guarantee deficiency is ₹2,000, borne by T. T’s current account = IOC ₹60,000 + salary ₹60,000 + share ₹18,000 − guarantee burden ₹2,000 = ₹1,36,000 Cr.'
  },
  AC01Q185: {
    options: ['₹4,920', '₹5,460', '₹6,900', '₹4,740'],
    correct: 0,
    explanation: 'A draws ₹96,000 in 12 equal instalments at the beginning of each month, so the average period is 6.5 months. IOD(A) = ₹96,000 × 6% × 6.5/12 = ₹3,120. B draws ₹60,000 on 1 October, so the period is 6 months. IOD(B) = ₹60,000 × 6% × 6/12 = ₹1,800. Total interest on drawings = ₹3,120 + ₹1,800 = ₹4,920.'
  },
  AC01Q187: {
    options: ['₹6,17,600', '₹7,08,000', '₹6,37,600', '₹5,77,600'],
    correct: 1,
    explanation: 'Interest on capital: P ₹5,00,000, Q ₹4,00,000 and R ₹1,00,000. Q’s salary = ₹1,80,000. Residual profit = ₹15,00,000 − ₹11,80,000 = ₹3,20,000. Q’s residual share = 4/10 × ₹3,20,000 = ₹1,28,000. P receives ₹6,60,000, so the ₹5,00,000 guarantee is not triggered. Q’s current account = IOC ₹4,00,000 + salary ₹1,80,000 + residual share ₹1,28,000 = ₹7,08,000 Cr.'
  },
  AC01Q189: {
    options: ['₹52,933 Dr', '₹20,260 Dr', '₹10,260 Dr', '₹25,260 Dr'],
    correct: 0,
    explanation: 'Y’s interest on drawings = ₹1,20,000 × 6% × 6.5/12 = ₹3,900. Net profit for appropriation = ₹2,00,000 + ₹3,900 = ₹2,03,900. After IOC and Z’s salary, the residual is a loss of ₹12,100. Y bears 2/6 × ₹12,100 = ₹4,033 approximately. Y’s current account = opening credit ₹15,000 + IOC ₹60,000 − IOD ₹3,900 − loss ₹4,033 − drawings ₹1,20,000 = ₹52,933 debit.'
  },
  AC01Q191: {
    options: ['₹85,510 Dr', '₹74,850 Dr', '₹94,850 Dr', '₹64,850 Dr'],
    correct: 0,
    explanation: 'B’s interest on drawings = ₹1,80,000 × 6% × 6.5/12 = ₹5,850. Net profit for appropriation = ₹1,20,000 + ₹5,850 = ₹1,25,850. After IOC of ₹1,00,000, residual profit is ₹25,850. B’s share = 2/5 × ₹25,850 = ₹10,340. B’s current account = opening credit ₹50,000 + IOC ₹40,000 + share ₹10,340 − IOD ₹5,850 − drawings ₹1,80,000 = ₹85,510 debit.'
  },
  AC01Q193: {
    options: ['₹1,06,000', '₹1,26,000', '₹1,00,000', '₹1,46,000'],
    correct: 2,
    explanation: 'Interest on capital: G ₹1,20,000, H ₹80,000 and I ₹40,000. I’s salary = ₹60,000. Residual profit = ₹1,00,000. H’s residual share = ₹40,000. G receives ₹1,60,000, below the ₹2,00,000 guarantee, so the deficiency of ₹40,000 is borne by H. H’s current account = opening credit ₹20,000 + IOC ₹80,000 + share ₹40,000 − guarantee burden ₹40,000 = ₹1,00,000 Cr.'
  },
  AC01Q195: {
    options: ['₹94,000', '₹1,24,000', '₹1,64,000', '₹1,04,000'],
    correct: 0,
    explanation: 'Interest on capital: A ₹60,000, B ₹60,000 and C ₹80,000. C’s salary = ₹1,20,000. Residual profit = ₹1,80,000. A’s residual share = 3/10 × ₹1,80,000 = ₹54,000. A’s current account = opening credit ₹10,000 + IOC ₹60,000 + share ₹54,000 − drawings ₹30,000 = ₹94,000 Cr.'
  },
  AC01Q196: {
    options: ['As per IOC ratio since capital is already established', 'In ratio 2:1:1 since that is the stated profit-sharing ratio', 'Equally since the deed is silent on the residual', 'No residual sharing — it stays in the firm’s reserve'],
    correct: 1,
    explanation: 'The stated ratio in the deed, 2:1:1, is the profit-sharing ratio. It applies to residual profit after interest on capital and salary. Equal sharing applies only when no profit-sharing ratio is stated at all.'
  },
  AC01Q198: {
    options: ['₹1,16,000', '₹96,000', '₹1,36,000', '₹64,000'],
    correct: 3,
    explanation: 'Interest on capital: X ₹90,000, Y ₹60,000 and Z ₹30,000. Y’s salary = ₹48,000. Residual profit = ₹12,000. Y’s share = ₹4,000. Z receives ₹32,000, below the ₹80,000 guarantee, so deficiency ₹48,000 is borne by Y. Y’s current account = IOC ₹60,000 + salary ₹48,000 + share ₹4,000 − guarantee burden ₹48,000 = ₹64,000 Cr.'
  },
  AC01Q200: {
    options: ['₹1,72,000', '₹1,24,400', '₹1,32,000', '₹1,92,000'],
    correct: 1,
    explanation: 'Interest on capital: X ₹80,000, Y ₹60,000 and Z ₹60,000. Y’s salary is ₹96,000 and Z’s salary is ₹72,000. Residual profit = ₹1,32,000. X’s share = 4/10 × ₹1,32,000 = ₹52,800. Z receives ₹1,71,600, below the ₹1,80,000 guarantee. Deficiency ₹8,400 is borne by X. X’s current account = IOC ₹80,000 + share ₹52,800 − guarantee burden ₹8,400 = ₹1,24,400 Cr.'
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
