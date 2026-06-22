import { readFile, writeFile } from 'node:fs/promises';

const file = 'questions/accountancy/AC02.json';
const data = JSON.parse(await readFile(file, 'utf8'));

const fixes = new Map(Object.entries({
  AC02Q07: {
    options: ['₹15,000', '₹2,727', '₹10,000', '₹12,000'],
    correct: 1,
    explanation: 'Interest on capital: X ₹40,000, Y ₹30,000 and Z ₹20,000, total ₹90,000. Z’s salary is ₹30,000. Profit after these appropriations = ₹1,50,000 - ₹90,000 - ₹30,000 = ₹30,000. Since General Reserve is 10% of profit after all appropriations including itself, let reserve be x. Then x = 10% of (₹30,000 - x). So 1.1x = ₹3,000 and x = ₹2,727 approximately.'
  },
  AC02Q10: {
    options: ['₹3,333', '₹4,000', '₹2,667', '₹3,619'],
    correct: 2,
    explanation: 'A’s annual salary = ₹2,000 x 12 = ₹24,000. Profit after salary = ₹80,000 - ₹24,000 = ₹56,000. If B’s commission is 5% of net profit after charging the commission, commission = 5/105 x ₹56,000 = ₹2,666.67, approximately ₹2,667.'
  },
  AC02Q13: {
    options: ['₹70,000 (Cr.)', '₹88,000 (Cr.)', '₹42,000 (Cr.)', '₹38,000 (Cr.)'],
    correct: 2,
    explanation: 'Interest on capital: Alpha ₹80,000, Beta ₹60,000 and Gamma ₹40,000, total ₹1,80,000. Residual profit = ₹2,40,000 - ₹1,80,000 = ₹60,000. Gamma’s share in the 2:2:1 ratio = ₹12,000. Gamma had an opening debit current account balance of ₹10,000, so closing balance = ₹40,000 + ₹12,000 - ₹10,000 = ₹42,000 credit.'
  },
  AC02Q18: {
    options: ['₹1,08,000', '₹1,10,700', '₹1,13,400', '₹1,12,800'],
    correct: 2,
    explanation: 'Interest on capital: X ₹80,000, Y ₹64,000 and Z ₹48,000, total ₹1,92,000. Z’s salary = ₹60,000. Profit after IOC and salary = ₹2,88,000 - ₹1,92,000 - ₹60,000 = ₹36,000. Reserve = 10% of ₹36,000 = ₹3,600. Divisible profit = ₹32,400. Z’s share = 1/6 x ₹32,400 = ₹5,400. Z’s total earnings = ₹48,000 + ₹60,000 + ₹5,400 = ₹1,13,400.'
  },
  AC02Q23: {
    options: ['₹51,200 (Cr.)', '₹14,000 (Cr.)', '₹38,600 (Cr.)', '₹46,400 (Cr.)'],
    correct: 1,
    explanation: 'IOC: D ₹50,000 and E ₹40,000. Interest on drawings: D ₹1,800 and E ₹1,200. Profit available for sharing = ₹1,50,000 - ₹90,000 + ₹3,000 = ₹63,000. E’s profit share = 2/5 x ₹63,000 = ₹25,200. E’s closing current account = opening debit ₹10,000, plus IOC ₹40,000, less drawings ₹40,000, less IOD ₹1,200, plus profit share ₹25,200 = ₹14,000 credit.'
  },
  AC02Q25: {
    options: ['₹3,675', '₹3,750', '₹2,250', '₹4,125'],
    correct: 0,
    explanation: 'Interest on capital: L ₹54,000, M ₹40,500 and N ₹27,000, total ₹1,21,500. M’s salary = ₹30,000. Profit after IOC and salary = ₹2,25,000 - ₹1,21,500 - ₹30,000 = ₹73,500. General Reserve = 5% of ₹73,500 = ₹3,675.'
  },
  AC02Q40: {
    options: ['₹38,000', '₹36,000', '₹23,333', '₹37,000'],
    correct: 2,
    explanation: 'Total interest on capital is ₹1,08,000, but profit before IOC is only ₹90,000, so IOC is allowed proportionately in the capital ratio 9:6:3. W’s proportionate IOC = ₹90,000 x 6/18 = ₹30,000. There is no residual profit share. X is guaranteed ₹20,000 profit share, and W bears 1/3 of the deficiency = ₹6,667. W’s total credit = ₹30,000 - ₹6,667 = ₹23,333 approximately.'
  },
  AC02Q43: {
    options: ['₹73,250', '₹44,714', '₹74,750', '₹69,750'],
    correct: 1,
    explanation: 'After rectifying the overlooked expense, revised profit = ₹1,35,000. IOC totals ₹1,00,000 and G’s salary is ₹24,000, leaving ₹11,000. H’s commission is 5/105 x ₹11,000 = ₹523.81. Divisible profit = ₹11,000 - ₹523.81 = ₹10,476.19. H’s profit share = 2/5 x ₹10,476.19 = ₹4,190.48. H’s total income = ₹40,000 + ₹523.81 + ₹4,190.48 = ₹44,714 approximately.'
  },
  AC02Q47: {
    options: ['₹1,00,000', '₹96,160', '₹81,600', '₹1,02,400'],
    correct: 2,
    explanation: 'N’s salary = ₹36,000. Profit after salary = ₹2,04,000. Reserve is 10% of net profit after salary but before IOC, so reserve = ₹20,400. Profit after salary and reserve = ₹1,83,600. IOC: M ₹64,000, N ₹48,000 and O ₹32,000, total ₹1,44,000. Divisible profit = ₹39,600. M’s share = 4/9 x ₹39,600 = ₹17,600. M’s total earnings = ₹64,000 + ₹17,600 = ₹81,600.'
  },
  AC02Q52: {
    options: ['P: +₹2,000; Q: -₹10,000; R: -₹22,000', 'P: +₹16,000; Q: +₹6,000; R: -₹4,000', 'P: +₹12,000; Q: +₹4,000; R: -₹4,000', 'P: +₹6,000; Q: -₹2,000; R: -₹10,000'],
    correct: 0,
    explanation: 'IOC is P ₹36,000, Q ₹24,000 and R ₹12,000, total ₹72,000. Since there is already a loss of ₹30,000 before IOC, the total loss after providing IOC is ₹1,02,000. Shared equally, each partner bears ₹34,000. Net positions are: P ₹36,000 - ₹34,000 = +₹2,000; Q ₹24,000 - ₹34,000 = -₹10,000; R ₹12,000 - ₹34,000 = -₹22,000.'
  },
  AC02Q56: {
    options: ['₹2,250', '₹1,350', '₹1,200', '₹1,650'],
    correct: 0,
    explanation: 'Using product method to a 31 March year-end: ₹20,000 for 12 months, ₹15,000 for 9 months, ₹10,000 for 6 months and ₹5,000 for 3 months. Product = ₹4,50,000. Interest = ₹4,50,000 x 6/100 x 1/12 = ₹2,250.'
  },
  AC02Q64: {
    options: ['₹1,38,000', '₹85,200', '₹1,32,000', '₹1,16,000'],
    correct: 1,
    explanation: 'IOC: S ₹80,000, T ₹60,000 and U ₹40,000, total ₹1,80,000. U’s salary = ₹36,000. Profit after IOC and salary = ₹44,000. Profit shares in 5:3:2 are S ₹22,000, T ₹13,200 and U ₹8,800. T’s total is ₹73,200, below the ₹90,000 guarantee, so S bears the ₹16,800 deficit. S’s final take-home = ₹80,000 + ₹22,000 - ₹16,800 = ₹85,200.'
  },
  AC02Q69: {
    options: ['₹1,06,500', '₹1,11,500', '₹75,200', '₹1,03,750'],
    correct: 2,
    explanation: 'Dev’s salary = ₹1,20,000. Profit after salary = ₹2,70,000. Eva’s commission = 5% of ₹2,70,000 = ₹13,500. IOC: Dev ₹72,000, Eva ₹54,000 and Faiz ₹36,000. Divisible profit = ₹94,500, so Eva’s share = ₹28,350 and Faiz’s share = ₹28,350. Faiz’s total = ₹64,350, so Eva bears the ₹20,650 guarantee deficit. Eva ultimately receives ₹54,000 + ₹13,500 + ₹28,350 - ₹20,650 = ₹75,200.'
  },
  AC02Q78: {
    options: ['₹2,22,600', '₹1,91,600', '₹2,24,400', '₹2,16,800'],
    correct: 1,
    explanation: 'IOC: G ₹1,08,000, H ₹81,000 and I ₹54,000. H’s salary = ₹72,000. Profit after IOC and salary = ₹1,35,000. H’s profit share in 4:3:2 = ₹45,000 and I’s share = ₹30,000. I’s total = ₹84,000, so deficiency against ₹1,00,000 guarantee is ₹16,000. H bears 2/5 of this = ₹6,400. H’s ultimate take-home = ₹81,000 + ₹72,000 + ₹45,000 - ₹6,400 = ₹1,91,600.'
  },
  AC02Q80: {
    options: ['₹1,43,620', '₹1,59,700', '₹1,44,820', '₹1,40,180'],
    correct: 1,
    explanation: 'IOC: Asha ₹1,50,000 and Bhanu ₹1,00,000. Interest on drawings: Asha ₹3,300 and Bhanu ₹2,700. Divisible profit = ₹4,00,000 - ₹2,50,000 + ₹6,000 = ₹1,56,000. Bhanu’s profit share = 2/5 x ₹1,56,000 = ₹62,400. Bhanu’s total = ₹1,00,000 + ₹62,400 - ₹2,700 = ₹1,59,700.'
  },
  AC02Q86: {
    options: ['₹0 — it always balances', '₹14,000 distributable profit', '₹24,000 distributable profit', '₹8,000 distributable profit'],
    correct: 2,
    explanation: 'Since the deed is silent, interest on S’s loan is charged at 6% p.a. to the Profit and Loss Account: ₹1,00,000 x 6% = ₹6,000. Profit brought to P&L Appropriation Account = ₹1,54,000. IOC totals ₹1,00,000 and R’s salary is ₹30,000. Balance before transfer to partners = ₹1,54,000 - ₹1,00,000 - ₹30,000 = ₹24,000.'
  },
  AC02Q96: {
    options: ['₹76,200', '₹96,000', '₹1,02,000', '₹88,000'],
    correct: 0,
    explanation: 'IOC: Kapoor ₹40,000 and Mehta ₹60,000. Kapoor’s salary = ₹48,000. Profit after IOC and salary = ₹1,75,000 - ₹1,00,000 - ₹48,000 = ₹27,000. Mehta’s share in the 2:3 ratio = 3/5 x ₹27,000 = ₹16,200. Mehta’s total income = ₹60,000 + ₹16,200 = ₹76,200.'
  },
  AC02Q97: {
    options: ['₹2,06,520', '₹2,10,120', '₹1,47,600', '₹2,08,320'],
    correct: 2,
    explanation: 'IOC: Rao ₹90,000, Sen ₹72,000 and Das ₹54,000. Das’s salary = ₹72,000. Profit after IOC and salary = ₹2,52,000. Sen’s share in 4:3:3 = ₹75,600. Das’s total = ₹54,000 + ₹72,000 + ₹75,600 = ₹2,01,600, so the ₹1,80,000 guarantee is not invoked. Sen’s final take-home = ₹72,000 + ₹75,600 = ₹1,47,600.'
  },
  AC02Q100: {
    options: ['₹8,400', '₹10,800', '₹9,000', '₹7,200'],
    correct: 0,
    explanation: 'IOC totals ₹3,60,000 and B’s salary is ₹96,000. Profit after these appropriations = ₹5,40,000 - ₹3,60,000 - ₹96,000 = ₹84,000. Since reserve is 10% of profit after all appropriations before reserve, General Reserve = 10% of ₹84,000 = ₹8,400.'
  },
  AC02Q104: {
    options: ['₹10,880', '₹18,400', '₹9,920', '₹12,160'],
    correct: 1,
    explanation: 'IOC totals ₹1,80,000, leaving ₹90,000 after IOC. K’s commission is 8% of profit after IOC but before commission = ₹7,200. Divisible profit = ₹90,000 - ₹7,200 = ₹82,800. L’s share in the 4:3:2 ratio = 2/9 x ₹82,800 = ₹18,400.'
  },
  AC02Q107: {
    options: ['Guarantee not invoked; Mohan earns ₹3,08,000', 'Guarantee invoked; Mohan earns ₹2,45,600', 'Guarantee invoked; Mohan earns ₹2,96,000', 'Guarantee not invoked; Mohan earns ₹2,92,000'],
    correct: 1,
    explanation: 'IOC totals ₹2,40,000 and Mohan’s salary is ₹1,20,000. Profit after IOC and salary = ₹1,40,000. Reserve = 10% of ₹1,40,000 = ₹14,000. Divisible profit = ₹1,26,000. Rohan’s share = 1/5 x ₹1,26,000 = ₹25,200, so Rohan’s total = ₹60,000 + ₹25,200 = ₹85,200. The ₹1,10,000 guarantee is invoked and Mohan bears the ₹24,800 deficit. Mohan’s final take-home = ₹1,00,000 + ₹1,20,000 + ₹50,400 - ₹24,800 = ₹2,45,600.'
  },
  AC02Q108: {
    options: ['₹2,300', '₹1,050', '₹750', '₹1,200'],
    correct: 0,
    explanation: 'End of April drawing is outstanding for 11 months, end of July for 8 months, and end of November for 4 months. Product = ₹20,000 x (11 + 8 + 4) = ₹4,60,000. Interest on drawings = ₹4,60,000 x 6/100 x 1/12 = ₹2,300.'
  },
  AC02Q112: {
    options: ['₹48,000', '₹52,000', '₹10,800', '₹56,000'],
    correct: 2,
    explanation: 'IOC totals ₹1,20,000 and C’s salary is ₹24,000. Profit after IOC and salary = ₹76,000. A’s share = ₹38,000 and B’s share = ₹22,800. B is guaranteed ₹50,000 profit share excluding IOC, so the deficit is ₹27,200, borne by A. A’s net profit share after bearing guarantee = ₹38,000 - ₹27,200 = ₹10,800.'
  },
  AC02Q118: {
    options: ['Guarantee invoked; Bheem earns ₹1,06,500', 'Guarantee not invoked; Bheem earns ₹1,95,600', 'Guarantee invoked; Bheem earns ₹1,89,720', 'Guarantee not invoked; Bheem earns ₹2,04,000'],
    correct: 0,
    explanation: 'IOC totals ₹2,40,000 and Arjun’s salary is ₹1,80,000. Profit after IOC and salary = ₹1,80,000. Reserve = 15% of ₹1,80,000 = ₹27,000. Divisible profit = ₹1,53,000. Nakul’s share = ₹30,600 and his total = ₹40,000 + ₹30,600 = ₹70,600, so the ₹90,000 guarantee is invoked. Bheem bears the ₹19,400 deficit. Bheem’s final take-home = ₹80,000 + ₹45,900 - ₹19,400 = ₹1,06,500.'
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
console.log(`Updated ${changed} AC02 questions in ${file}`);
