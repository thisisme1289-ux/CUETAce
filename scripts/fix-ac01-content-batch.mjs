import { readFile, writeFile } from 'node:fs/promises';

const file = 'questions/accountancy/AC01.json';
const data = JSON.parse(await readFile(file, 'utf8'));

const fixes = new Map(Object.entries({
  AC01Q03: {
    options: ['₹3,900', '₹2,700', '₹4,200', '₹3,000'],
    correct: 0,
    explanation: 'X drew ₹60,000 on 1 July, so interest is charged for 9 months: ₹60,000 × 6% × 9/12 = ₹2,700. Y drew ₹40,000 on 1 October, so interest is charged for 6 months: ₹40,000 × 6% × 6/12 = ₹1,200. Total interest on drawings = ₹2,700 + ₹1,200 = ₹3,900.'
  },
  AC01Q06: {
    options: ['₹(31,500) loss', '₹9,000 profit', '₹(6,750) loss', '₹6,750 profit'],
    correct: 0,
    explanation: 'Interest on capital: A = ₹8,00,000 × 8% = ₹64,000 and B = ₹4,00,000 × 8% = ₹32,000, total ₹96,000. B’s salary = ₹3,000 × 12 = ₹36,000. Total appropriations = ₹1,32,000. Since profit is ₹90,000, the residual is a loss of ₹42,000, shared 3:1. A’s residual loss share = 3/4 × ₹42,000 = ₹31,500.'
  },
  AC01Q08: {
    options: ['₹10,000', '₹6,250', '₹4,000', '₹8,000'],
    correct: 1,
    explanation: 'Z’s normal share = ₹1,50,000 × 2/10 = ₹30,000. The guaranteed minimum is ₹40,000, so the deficiency is ₹10,000. Since the question does not say that X alone gave the guarantee, the deficiency is borne by X and Y in their mutual ratio of 5:3. X bears ₹10,000 × 5/8 = ₹6,250.'
  },
  AC01Q18: {
    options: ['₹58,333', '₹48,333', '₹68,333', '₹38,000'],
    correct: 3,
    explanation: 'Net profit available after writing off accumulated loss = ₹1,80,000 − ₹30,000 = ₹1,50,000. Interest on capital is A ₹80,000 and B ₹40,000; A’s salary is ₹60,000. Total appropriations are ₹1,80,000, so the residual is a loss of ₹30,000. B’s share of loss = 1/3 × ₹30,000 = ₹10,000. B’s current account = opening credit ₹8,000 + IOC ₹40,000 − loss ₹10,000 = ₹38,000 credit.'
  },
  AC01Q20: {
    options: ['Credit of ₹1,08,000', 'Debit of ₹24,000', 'Credit of ₹42,000', 'Debit of ₹1,08,000'],
    correct: 2,
    explanation: 'Capitals are proportional to 3:2:1, so Aman ₹9,00,000, Bimal ₹6,00,000 and Chetan ₹3,00,000. Interest on capital is Aman ₹1,08,000, Bimal ₹72,000 and Chetan ₹36,000. Bimal’s salary is ₹60,000, so total appropriations are ₹2,76,000. Profit is ₹1,44,000, leaving a residual loss of ₹1,32,000. Aman bears 3/6 × ₹1,32,000 = ₹66,000. Aman’s net current account credit = ₹1,08,000 − ₹66,000 = ₹42,000.'
  },
  AC01Q23: {
    options: ['₹96,000', '₹64,000', '₹88,000', '₹1,12,000'],
    correct: 2,
    explanation: 'Interest on capital: P ₹80,000, Q ₹64,000 and R ₹48,000; total ₹1,92,000. R’s salary = ₹48,000. Residual profit = ₹3,00,000 − ₹2,40,000 = ₹60,000. Q’s profit share = 2/5 × ₹60,000 = ₹24,000. Q’s current account credit = IOC ₹64,000 + profit share ₹24,000 = ₹88,000.'
  },
  AC01Q35: {
    options: ['₹93,000', '₹75,000', '₹1,11,000', '₹63,000'],
    correct: 0,
    explanation: 'The accounting period is 9 months, so interest on capital is charged for 9 months. F’s IOC = ₹3,00,000 × 12% × 9/12 = ₹27,000. F’s salary = ₹8,000 × 9 = ₹72,000. E’s IOC is ₹54,000, so total appropriations are ₹1,53,000. Net profit is ₹1,35,000, leaving a residual loss of ₹18,000. F bears 1/3 of the loss = ₹6,000. F’s current account credit = ₹27,000 + ₹72,000 − ₹6,000 = ₹93,000.'
  },
  AC01Q38: {
    options: ['₹6,28,320', '₹6,87,800', '₹6,57,800', '₹6,47,800'],
    correct: 0,
    explanation: 'Interest on capital: Naveen ₹80,000, Priya ₹60,000 and Rajan ₹40,000; total ₹1,80,000. Rajan’s commission = 2% × ₹2,80,000 = ₹5,600. Residual profit = ₹2,80,000 − ₹1,85,600 = ₹94,400. Priya’s share = 3/10 × ₹94,400 = ₹28,320. Under fluctuating capital, Priya’s closing capital = ₹6,00,000 + ₹60,000 + ₹28,320 − ₹60,000 = ₹6,28,320.'
  },
  AC01Q40: {
    options: ['₹76,000 Cr', '₹56,000 Cr', '₹36,000 Cr', '₹96,000 Dr'],
    correct: 3,
    explanation: 'Interest on capital: G ₹1,00,000 and H ₹60,000. G’s salary = ₹1,80,000, so total appropriations are ₹3,40,000. Profit is ₹3,00,000, leaving a residual loss of ₹40,000. H’s loss share = 2/5 × ₹40,000 = ₹16,000. H’s current account = opening debit ₹20,000 + IOC ₹60,000 − loss ₹16,000 − drawings ₹1,20,000 = ₹96,000 debit.'
  },
  AC01Q44: {
    options: ['₹4,800', '₹12,800', '₹16,000', '₹24,000'],
    correct: 0,
    explanation: 'Interest on capital totals ₹48,000 and Q’s salary is ₹24,000. Residual profit = ₹80,000 − ₹72,000 = ₹8,000. P’s share of residual profit = 3/5 × ₹8,000 = ₹4,800. This is not P’s total current-account credit; it is only the residual profit share asked in the question.'
  },
  AC01Q46: {
    options: ['₹1,00,000', '₹88,000', '₹65,000', '₹96,000'],
    correct: 2,
    explanation: 'Interest on capital: A ₹80,000, B ₹60,000 and C ₹40,000. Residual profit after IOC = ₹20,000. In 2:2:1, B’s residual share is ₹8,000 and C’s total share is ₹44,000. C is guaranteed ₹50,000, so the deficiency is ₹6,000. A and B bear it equally, so B bears ₹3,000. B’s current account credit = ₹60,000 + ₹8,000 − ₹3,000 = ₹65,000.'
  },
  AC01Q48: {
    options: ['₹70,200', '₹96,000', '₹81,000', '₹66,000'],
    correct: 0,
    explanation: 'Interest on capital: X ₹96,000, Y ₹72,000 and Z ₹48,000. Y’s salary is ₹60,000, so total appropriations are ₹2,76,000. Residual profit = ₹24,000. Z’s share = 3/10 × ₹24,000 = ₹7,200. Z’s current account = opening credit ₹15,000 + IOC ₹48,000 + share ₹7,200 = ₹70,200 credit.'
  },
  AC01Q50: {
    options: ['A pays B ₹11,200', 'B pays A ₹11,200', 'A pays B ₹7,200', 'B pays A ₹8,000'],
    correct: 2,
    explanation: 'Correct appropriations are: A gets IOC ₹48,000 + residual share ₹4,800 = ₹52,800. B gets IOC ₹32,000 + salary ₹12,000 + residual share ₹3,200 = ₹47,200. The profit was wrongly distributed as A ₹60,000 and B ₹40,000. A therefore received ₹7,200 too much and B ₹7,200 too little. Rectification: A pays B ₹7,200.'
  },
  AC01Q52: {
    options: ['₹825', '₹675', '₹900', '₹1,350'],
    correct: 0,
    explanation: 'D drew ₹20,000 on 1 October, so interest is charged for 6 months: ₹20,000 × 6% × 6/12 = ₹600. E drew ₹15,000 on 1 January, so interest is charged for 3 months: ₹15,000 × 6% × 3/12 = ₹225. No drawing by F is given. Total interest on drawings = ₹600 + ₹225 = ₹825.'
  },
  AC01Q54: {
    options: ['Tanvi ₹1,14,000 Cr; Uma ₹36,000 Cr', 'Tanvi ₹1,20,000 Cr; Uma ₹60,000 Cr', 'Tanvi ₹84,000 Cr; Uma ₹46,000 Cr', 'Tanvi ₹1,44,000 Cr; Uma ₹46,000 Cr'],
    correct: 0,
    explanation: 'Interest on capital: Tanvi ₹60,000 and Uma ₹40,000. Residual profit = ₹1,40,000 − ₹1,00,000 = ₹40,000, shared 3:2. Tanvi’s share = ₹24,000 and Uma’s share = ₹16,000. Tanvi’s closing current account = opening credit ₹30,000 + ₹60,000 + ₹24,000 = ₹1,14,000 Cr. Uma’s closing current account = opening debit ₹20,000 + ₹40,000 + ₹16,000 = ₹36,000 Cr.'
  },
  AC01Q57: {
    options: ['₹18,400', '₹20,000', '₹16,000', '₹22,000'],
    correct: 0,
    explanation: 'Interest on capital totals ₹2,16,000. Profit after IOC but before commission = ₹4,00,000 − ₹2,16,000 = ₹1,84,000. The commission is 10% of profit after IOC but before commission, so T’s commission = 10% × ₹1,84,000 = ₹18,400.'
  },
  AC01Q59: {
    options: ['₹85,350', '₹79,650', '₹84,150', '₹74,003 Cr'],
    correct: 3,
    explanation: 'Interest on capital totals ₹1,50,000. A’s interest on drawings = ₹60,000 × 6% × 6.5/12 = ₹1,950. B’s interest on drawings = ₹72,000 × 6% × 5.5/12 = ₹1,980. Net profit for appropriation = ₹2,00,000 + ₹3,930 = ₹2,03,930. Residual after IOC = ₹53,930. A’s share = 2/3 × ₹53,930 = ₹35,953. A’s current account = IOC ₹1,00,000 + share ₹35,953 − IOD ₹1,950 − drawings ₹60,000 = ₹74,003 Cr.'
  },
  AC01Q66: {
    options: ['₹3,42,000', '₹3,50,400', '₹3,36,000', '₹3,60,000'],
    correct: 2,
    explanation: 'Interest on capital: K = ₹3,00,000 × 8% = ₹24,000 and L = ₹16,000. Residual profit = ₹60,000 − ₹40,000 = ₹20,000. K’s share = 3/5 × ₹20,000 = ₹12,000. Under the fluctuating capital method, K’s closing capital = ₹3,00,000 + ₹24,000 + ₹12,000 = ₹3,36,000.'
  },
  AC01Q68: {
    options: ['₹9,524', '₹7,000', '₹8,000', '₹6,500'],
    correct: 0,
    explanation: 'Interest on capital totals ₹1,50,000, so profit after IOC = ₹3,50,000 − ₹1,50,000 = ₹2,00,000. Commission is 5% of profit after IOC and after commission. Let commission be x: x = 5% × (₹2,00,000 − x). Therefore 1.05x = ₹10,000 and x = ₹9,523.81, rounded to ₹9,524.'
  },
  AC01Q70: {
    options: ['₹3,10,000', '₹1,60,000', '₹2,00,000', '₹1,80,000'],
    correct: 0,
    explanation: 'C’s credits are salary ₹36,000, interest on capital ₹24,000 and profit share ₹1,00,000, totaling ₹1,60,000. Closing current account is a debit of ₹1,50,000. Since credits − drawings = debit balance, drawings = ₹1,60,000 + ₹1,50,000 = ₹3,10,000.'
  },
  AC01Q71: {
    options: ['₹1,15,600', '₹1,25,600', '₹52,500 Cr', '₹1,05,600'],
    correct: 2,
    explanation: 'Drawings at year end carry no interest on drawings. Interest on capital: H ₹1,20,000 and I ₹72,000. H’s salary is ₹60,000. Residual profit = ₹2,80,000 − ₹2,52,000 = ₹28,000. I’s share = 3/8 × ₹28,000 = ₹10,500. I’s current account = opening credit ₹10,000 + IOC ₹72,000 + share ₹10,500 − drawings ₹40,000 = ₹52,500 Cr.'
  },
  AC01Q79: {
    options: ['₹53,000', '₹50,000', '₹45,000', '₹60,000'],
    correct: 0,
    explanation: 'Interest on capital: R ₹60,000, S ₹40,000 and T ₹20,000. Residual profit = ₹30,000. S’s residual share = ₹10,000. T’s total share is ₹25,000, below the ₹30,000 guarantee, so deficiency is ₹5,000. R and S bear it in 3:2, so S bears ₹2,000. S’s current account = opening credit ₹5,000 + IOC ₹40,000 + share ₹10,000 − guarantee burden ₹2,000 = ₹53,000 Cr.'
  },
  AC01Q83: {
    options: ['₹4,20,000', '₹4,52,000', '₹4,12,000', '₹4,64,000'],
    correct: 0,
    explanation: 'Interest on capital: E ₹48,000 and F ₹32,000. Residual profit = ₹1,00,000 − ₹80,000 = ₹20,000. F’s share = 2/5 × ₹20,000 = ₹8,000. Under fluctuating capital, F’s closing capital = opening capital ₹4,00,000 + IOC ₹32,000 + share ₹8,000 − drawings ₹20,000 = ₹4,20,000.'
  },
  AC01Q85: {
    options: ['₹1,24,444', '₹1,11,111', '₹98,889', '₹68,667'],
    correct: 3,
    explanation: 'Interest on capital totals ₹1,80,000 and Y’s salary is ₹72,000, so total appropriations are ₹2,52,000. Profit is ₹2,50,000, leaving a residual loss of ₹2,000. X bears 4/9 × ₹2,000 = ₹889. Z’s total share is ₹40,000 − ₹444 = ₹39,556, below the ₹50,000 guarantee. The deficiency of ₹10,444 is borne by X alone. X’s current account credit = ₹80,000 − ₹889 − ₹10,444 = ₹68,667.'
  },
  AC01Q89: {
    options: ['₹2,60,800', '₹1,18,400', '₹2,84,800', '₹2,44,800'],
    correct: 1,
    explanation: 'Interest on capital: R ₹1,44,000 and S ₹96,000. S’s salary = ₹96,000. Residual profit = ₹3,60,000 − ₹3,36,000 = ₹24,000. R’s share = 3/5 × ₹24,000 = ₹14,400. R’s current account = opening credit ₹40,000 + IOC ₹1,44,000 + share ₹14,400 − drawings ₹80,000 = ₹1,18,400 Cr.'
  },
  AC01Q91: {
    options: ['₹1,21,100', '₹97,120', '₹1,08,300', '₹1,27,500'],
    correct: 1,
    explanation: 'Interest on capital: P ₹1,40,000 and Q ₹60,000. Interest on drawings: P ₹1,800 and Q ₹600. Net profit for appropriation = ₹2,50,000 + ₹2,400 = ₹2,52,400. After IOC and Q’s salary of ₹60,000, there is a residual loss of ₹7,600. Q bears 3/10 × ₹7,600 = ₹2,280. Q’s current account = IOC ₹60,000 + salary ₹60,000 − IOD ₹600 − loss ₹2,280 − drawings ₹20,000 = ₹97,120 Cr.'
  },
  AC01Q94: {
    options: ['₹2,64,000', '₹1,29,000', '₹2,89,000', '₹2,14,000'],
    correct: 1,
    explanation: 'Interest on capital: A ₹2,00,000, B ₹1,20,000 and C ₹80,000. C’s salary = ₹1,20,000. Residual profit = ₹8,00,000 − ₹5,20,000 = ₹2,80,000. B’s share = 3/10 × ₹2,80,000 = ₹84,000. B’s current account = opening credit ₹25,000 + IOC ₹1,20,000 + share ₹84,000 − drawings ₹1,00,000 = ₹1,29,000 Cr.'
  },
  AC01Q96: {
    options: ['₹1,42,000', '₹1,32,000', '₹76,000', '₹1,52,000'],
    correct: 2,
    explanation: 'Interest on capital: D ₹1,20,000 and E ₹40,000. E’s salary = ₹72,000. Total appropriations = ₹2,32,000, while profit is ₹1,60,000. The residual is a loss of ₹72,000. D bears 3/4 × ₹72,000 = ₹54,000. E already gets ₹40,000 + ₹72,000 − ₹18,000 = ₹94,000, so the ₹80,000 guarantee is not triggered. D’s current account = opening credit ₹10,000 + IOC ₹1,20,000 − loss ₹54,000 = ₹76,000 Cr.'
  },
  AC01Q98: {
    options: ['₹80,600', '₹65,000', '₹83,600', '₹74,600'],
    correct: 1,
    explanation: 'Interest on capital: G ₹80,000, H ₹60,000 and I ₹40,000. G’s salary = ₹60,000. Total appropriations are ₹2,40,000, equal to the profit, so there is no residual profit. I receives only ₹40,000, below the ₹55,000 guarantee. The deficiency of ₹15,000 is borne by H alone. H’s current account = opening credit ₹20,000 + IOC ₹60,000 − guarantee burden ₹15,000 = ₹65,000 Cr.'
  },
  AC01Q101: {
    options: ['₹15,556', '₹12,000', '₹10,667', '₹10,000'],
    correct: 0,
    explanation: 'Interest on capital totals ₹90,000, so profit after IOC is ₹3,00,000 − ₹90,000 = ₹2,10,000. Commission is 8% of profit after IOC and after commission. Let commission be x: x = 8% × (₹2,10,000 − x). Thus 1.08x = ₹16,800 and x = ₹15,555.56, rounded to ₹15,556.'
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
