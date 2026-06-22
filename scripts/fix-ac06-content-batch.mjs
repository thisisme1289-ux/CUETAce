import { readFile, writeFile } from 'node:fs/promises';

const file = 'questions/accountancy/AC06.json';
const data = JSON.parse(await readFile(file, 'utf8'));

const fixes = new Map(Object.entries({
  AC06Q01: {
    options: ['A: 13/72, B: 3/72', 'A: 11/72, B: 13/72', 'A: 5/8, B: 3/8', 'A: 7/72, B: 11/72'],
    correct: 0,
    explanation: 'Old ratio: A = 4/9 and B = 3/9. New ratio: A = 5/8 and B = 3/8. Gain = new share - old share. A gains 5/8 - 4/9 = 13/72. B gains 3/8 - 3/9 = 3/72. Therefore the gaining ratio is 13:3.'
  },
  AC06Q06: {
    options: ['A’s Capital Dr. ₹10,000; To C’s Capital ₹10,000', 'A’s Capital Dr. ₹4,000; B’s Capital Dr. ₹6,000; To C’s Capital ₹10,000', 'A’s Capital Dr. ₹5,000; B’s Capital Dr. ₹5,000; To C’s Capital ₹10,000', 'C’s Capital Dr. ₹10,000; To A’s Capital ₹6,000; To B’s Capital ₹4,000'],
    correct: 0,
    explanation: 'C’s share of goodwill = 1/5 x ₹50,000 = ₹10,000. A’s gain = 3/5 - 2/5 = 1/5, while B’s gain = 2/5 - 2/5 = 0. Therefore A alone compensates C. Entry: A’s Capital A/c Dr ₹10,000; To C’s Capital A/c ₹10,000.'
  },
  AC06Q08: {
    options: ['Profit of ₹3,333', 'Loss of ₹5,000', 'Profit of ₹3,000', 'Profit of ₹1,667'],
    correct: 0,
    explanation: 'Revaluation gains: Machinery appreciation ₹18,000 and creditors reduction ₹3,000. Revaluation loss: stock reduction ₹6,000. Net profit = ₹18,000 + ₹3,000 - ₹6,000 = ₹15,000. F’s share in the 4:3:2 ratio = 2/9 x ₹15,000 = ₹3,333 profit.'
  },
  AC06Q13: {
    options: ['₹8,500', '₹7,700', '₹10,200', '₹9,000'],
    correct: 1,
    explanation: 'C’s share is 1/10. General Reserve credit = ₹5,000. Investment Fluctuation Reserve has excess ₹20,000 - ₹8,000 = ₹12,000, so C gets ₹1,200. Workmen Compensation Reserve has no claim, so C gets 1/10 of ₹15,000 = ₹1,500. Total credit from accumulated reserves = ₹5,000 + ₹1,200 + ₹1,500 = ₹7,700.'
  },
  AC06Q21: {
    options: ['1:0', '2:3', '3:2', '0:1'],
    correct: 0,
    explanation: 'Before C’s retirement, A:B:C = 2:2:1, so A = 2/5 and B = 2/5. After C retires, A and B share 3:2, so A = 3/5 and B = 2/5. A gains 1/5 and B gains nothing. Hence the gaining ratio is 1:0.'
  },
  AC06Q24: {
    options: ['A pays ₹20,000; C pays ₹20,000', 'A pays ₹24,000; C pays ₹16,000', 'A pays ₹40,000; C pays ₹0', 'A pays ₹0; C pays ₹40,000'],
    correct: 0,
    explanation: 'B’s share of goodwill = 2/6 x ₹1,20,000 = ₹40,000. A’s gain = 2/3 - 3/6 = 1/6, and C’s gain = 1/3 - 1/6 = 1/6. Since A and C gain equally, each compensates B by ₹20,000.'
  },
  AC06Q47: {
    options: ['₹84,000', '₹82,000', '₹80,000', '₹77,000'],
    correct: 3,
    explanation: 'C’s share is 1/6. C’s goodwill share = ₹60,000 x 1/6 = ₹10,000. C’s General Reserve share = ₹30,000 x 1/6 = ₹5,000. C’s Revaluation Profit share = ₹12,000 x 1/6 = ₹2,000. Total settlement = capital ₹60,000 + ₹10,000 + ₹5,000 + ₹2,000 = ₹77,000.'
  },
  AC06Q65: {
    options: ['₹1,02,000', '₹1,05,000', '₹76,000', '₹95,000'],
    correct: 2,
    explanation: 'Z’s share is 1/10. Profit share to date of death = ₹2,40,000 x 9/12 x 1/10 = ₹18,000. Goodwill share = ₹10,000. General Reserve share = ₹3,000. Amount due = capital ₹50,000 + profit ₹18,000 + goodwill ₹10,000 + reserve ₹3,000 - drawings ₹5,000 = ₹76,000.'
  },
  AC06Q67: {
    options: ['₹65,000', '₹63,000', '₹61,000', '₹59,000'],
    correct: 1,
    explanation: 'C’s share is 1/6. Settlement amount = capital ₹50,000 + revaluation profit share ₹4,000 + goodwill share ₹6,000 + General Reserve share ₹3,000 = ₹63,000.'
  },
  AC06Q84: {
    options: ['B: 5/12, C: 1/12 (ratio 5:1)', 'B: 1/6, C: 1/12 (ratio 2:1)', 'B: 1/3, C: 1/6', 'B: 0, C: 1/2'],
    correct: 0,
    explanation: 'Old shares: A = 1/2, B = 1/4, C = 1/4. New ratio of B:C is 2:1, so B = 2/3 and C = 1/3. B’s gain = 2/3 - 1/4 = 5/12. C’s gain = 1/3 - 1/4 = 1/12. Gaining ratio = 5:1.'
  },
  AC06Q88: {
    options: ['Time method: ₹22,500; Sales method: ₹25,000; Sales method is higher', 'Time method: ₹25,000; Sales method: ₹19,167; Time method is higher', 'Both methods give ₹20,000', 'Time method: ₹18,750; Sales method: ₹25,000'],
    correct: 0,
    explanation: 'Time method: firm profit for 4.5 months = ₹1,80,000 x 4.5/12 = ₹67,500. B’s 1/3 share = ₹22,500. Sales method: current sales are ₹3,75,000 out of last year sales ₹9,00,000, so firm profit = ₹1,80,000 x 3,75,000/9,00,000 = ₹75,000. B’s 1/3 share = ₹25,000. Sales method is higher.'
  },
  AC06Q89: {
    options: ['R’s capital credited ₹30,000', 'R’s capital debited ₹15,000', 'R’s capital credited ₹15,000', 'No effect on R'],
    correct: 2,
    explanation: 'R’s share of newly valued goodwill = 1/4 x ₹1,20,000 = ₹30,000 credit. Existing goodwill of ₹60,000 is written off in the old ratio, so R is debited by 1/4 x ₹60,000 = ₹15,000. Net effect on R = ₹30,000 credit - ₹15,000 debit = ₹15,000 credit.'
  },
  AC06Q99: {
    options: ['₹1,40,000', '₹1,50,000', '₹1,45,000', '₹1,55,000'],
    correct: 0,
    explanation: 'M’s share is 1/2. M receives revaluation profit share ₹10,000, General Reserve share ₹20,000 and goodwill share ₹30,000. Settlement amount = capital ₹80,000 + ₹10,000 + ₹20,000 + ₹30,000 = ₹1,40,000.'
  },
  AC06Q102: {
    options: ['Profit of ₹3,400', 'Loss of ₹1,000', 'Profit of ₹4,200', 'Profit of ₹4,600'],
    correct: 0,
    explanation: 'Furniture depreciation = ₹10,000. Required bad debts provision = 5% of ₹80,000 = ₹4,000; existing provision is ₹1,000, so additional provision = ₹3,000. Building appreciation = ₹30,000. Net revaluation profit = ₹30,000 - ₹10,000 - ₹3,000 = ₹17,000. Mohan’s share = 1/5 x ₹17,000 = ₹3,400.'
  },
  AC06Q104: {
    options: ['A: 1/10, B: 0', 'A: 5/50, B: 5/50', 'A: 1/10, B: -1/10', 'A gains 1/10; B sacrifices 1/10'],
    correct: 0,
    explanation: 'Old ratio: A = 5/10, B = 4/10 and C = 1/10. New ratio A:B = 3:2, so A = 6/10 and B = 4/10. A gains 1/10, while B has no gain or sacrifice. Thus only A gains.'
  },
  AC06Q105: {
    options: ['₹11,800', '₹5,800', '₹13,000', '₹10,600'],
    correct: 1,
    explanation: 'Sanjay’s share is 1/5. P&L debit balance debited to Sanjay = ₹25,000 x 1/5 = ₹5,000. General Reserve credited = ₹50,000 x 1/5 = ₹10,000. Workmen Compensation Reserve excess = ₹10,000 - ₹6,000 = ₹4,000, so Sanjay gets ₹800. Net credit = -₹5,000 + ₹10,000 + ₹800 = ₹5,800.'
  },
  AC06Q108: {
    options: ['₹1,28,000', '₹1,30,000', '₹1,37,000', '₹1,22,000'],
    correct: 2,
    explanation: 'Revaluation profit = building appreciation ₹30,000 + creditors written back ₹6,000 - machinery depreciation ₹12,000 - increase in bad debts provision ₹3,000 = ₹21,000. R’s 1/3 share = ₹7,000. General Reserve share = ₹15,000. Goodwill share = ₹25,000. Final settlement = ₹90,000 + ₹7,000 + ₹15,000 + ₹25,000 = ₹1,37,000.'
  },
  AC06Q113: {
    options: ['₹70,000', '₹68,000', '₹78,000', '₹60,000'],
    correct: 0,
    explanation: 'Goodwill is compensated privately, so it is excluded from the firm’s formal payment. Z’s General Reserve share = 1/5 x ₹50,000 = ₹10,000. Drawings not yet recorded reduce capital by ₹10,000. Formal amount payable = capital ₹70,000 + reserve ₹10,000 - drawings ₹10,000 = ₹70,000.'
  },
  AC06Q119: {
    options: ['₹1,16,600', '₹1,22,000', '₹1,12,000', '₹1,10,000'],
    correct: 2,
    explanation: 'C’s share is 1/5. Revaluation profit = land gain ₹50,000 - bad debts ₹4,000 - stock depreciation ₹6,000 = ₹40,000. C’s share = ₹8,000. Goodwill share = ₹18,000 and General Reserve share = ₹6,000. Settlement = capital ₹80,000 + ₹8,000 + ₹18,000 + ₹6,000 = ₹1,12,000.'
  },
  AC06Q125: {
    options: ['Goodwill = ₹84,000; C’s share = ₹12,000', 'Goodwill = ₹28,000; C’s share = ₹4,000', 'Goodwill = ₹56,000; C’s share = ₹8,000', 'Goodwill = ₹84,000; C’s share = ₹21,000'],
    correct: 0,
    explanation: 'Goodwill = average profit x years’ purchase = ₹28,000 x 3 = ₹84,000. C’s share in the 3:3:1 ratio is 1/7. C’s share of goodwill = ₹84,000 x 1/7 = ₹12,000.'
  },
  AC06Q136: {
    options: ['₹80,000 + ₹6,400 = ₹86,400', '₹1,20,000 + ₹9,600 = ₹1,29,600', '₹1,00,000 + ₹8,000 = ₹1,08,000', '₹80,000 only'],
    correct: 1,
    explanation: 'Y’s goodwill share = 2/5 x ₹1,00,000 = ₹40,000. Total due = capital ₹1,80,000 + goodwill ₹40,000 = ₹2,20,000. First-year payment is ₹1,00,000, leaving ₹1,20,000. Interest at 8% for one year = ₹9,600. Second-year payment = ₹1,20,000 + ₹9,600 = ₹1,29,600.'
  },
  AC06Q139: {
    options: ['₹1,07,500', '₹1,04,000', '₹1,01,750', '₹1,05,000'],
    correct: 2,
    explanation: 'R’s share is 1/6 and the period to retirement is 9 months. Profit share = ₹1,44,000 x 9/12 x 1/6 = ₹18,000. Interest on capital for 9 months = ₹5,000 x 9/12 = ₹3,750. Amount payable = capital ₹90,000 + profit ₹18,000 + interest ₹3,750 - drawings ₹10,000 = ₹1,01,750.'
  },
  AC06Q142: {
    options: ['Credit of ₹15,111', 'Credit of ₹6,000', 'Debit of ₹1,200', 'Credit of ₹4,800'],
    correct: 0,
    explanation: 'C’s share is 2/9. General Reserve credit = ₹54,000 x 2/9 = ₹12,000. Investment Fluctuation Reserve excess after fall = ₹27,000 - ₹9,000 = ₹18,000; C’s share = ₹4,000. Workmen Compensation claim exceeds reserve by ₹4,000, so C bears 2/9 x ₹4,000 = ₹889. Net credit = ₹12,000 + ₹4,000 - ₹889 = ₹15,111 approximately.'
  },
  AC06Q151: {
    options: ['₹24,000', '₹60,000', '₹12,000', '₹48,000'],
    correct: 3,
    explanation: 'Super profit = ₹1,50,000 - ₹90,000 = ₹60,000. Goodwill = ₹60,000 x 4 = ₹2,40,000. C’s share in the 5:3:2 ratio is 2/10 = 1/5. C’s goodwill share = ₹2,40,000 x 1/5 = ₹48,000.'
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
console.log(`Updated ${changed} AC06 questions in ${file}`);
