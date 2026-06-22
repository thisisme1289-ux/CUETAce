import { readFile, writeFile } from 'node:fs/promises';

const file = 'questions/accountancy/AC05.json';
const data = JSON.parse(await readFile(file, 'utf8'));

const fixes = new Map(Object.entries({
  AC05Q01: {
    options: ['A) 5:3:2', 'B) 7:6:2', 'C) 7:5:3', 'D) 13:12:5'],
    correct: 0,
    explanation: "C gets 1/5 share, acquired equally from A and B, so each old partner sacrifices 1/10. A's new share = 3/5 - 1/10 = 5/10. B's new share = 2/5 - 1/10 = 3/10. C's share = 1/5 = 2/10. New ratio = 5:3:2."
  },
  AC05Q11: {
    correct: 0,
    explanation: 'Old shares are A = 4/9, B = 3/9, and C = 2/9. New shares are A = 4/10, B = 3/10, C = 2/10, and D = 1/10. Sacrifice: A = 4/9 - 4/10 = 4/90, B = 3/90, and C = 2/90. Sacrificing ratio = 4:3:2.'
  },
  AC05Q14: {
    correct: 0,
    explanation: "Total capital of the new firm is Rs.6,00,000. R's share is 1/4. Therefore R's capital = 1/4 x Rs.6,00,000 = Rs.1,50,000. Existing capitals of P and Q already total Rs.4,50,000, which is the remaining 3/4 share."
  },
  AC05Q17: {
    correct: 0,
    explanation: 'Machinery appreciation = 20% of Rs.1,20,000 = Rs.24,000. Provision for bad debts increases by Rs.8,000 and outstanding salary of Rs.5,000 is recorded, so total revaluation losses are Rs.13,000. Net revaluation profit = Rs.24,000 - Rs.13,000 = Rs.11,000. General Reserve is distributed separately and is not part of Revaluation Account.'
  },
  AC05Q25: {
    options: ['A) Profit Rs.37,000 each', 'B) Profit Rs.20,000 each', 'C) Loss Rs.7,000 each', 'D) Profit Rs.18,500 each'],
    correct: 3,
    explanation: 'Land appreciation = Rs.50,000. Additional provision for bad debts = Rs.3,000 and investments loss = Rs.10,000. Net revaluation profit = Rs.50,000 - Rs.13,000 = Rs.37,000. Rahul and Priya are equal partners, so each receives Rs.18,500.'
  },
  AC05Q28: {
    options: ['A) R: 2/10; P:Q:R = 13:3:4', 'B) R: 2/10; P:Q:R = 11:3:6', 'C) R: 2/10; P:Q:R = 7:1:2', 'D) R: 1/5; P:Q:R = 5:3:2'],
    correct: 0,
    explanation: "P's old share = 3/4 = 15/20. P sacrifices 1/10 = 2/20, so P's new share = 13/20. Q's old share = 1/4 = 5/20. Q sacrifices 1/10 = 2/20, so Q's new share = 3/20. R receives 2/10 = 4/20. New ratio = 13:3:4."
  },
  AC05Q33: {
    correct: 3,
    explanation: "Revaluation profit = Rs.30,000 - Rs.10,000 - Rs.5,000 = Rs.15,000. A's share in equal ratio = Rs.7,500. General Reserve credit to A = Rs.10,000. Goodwill premium credit to A = Rs.12,500. Total credit to A's Capital Account = Rs.7,500 + Rs.10,000 + Rs.12,500 = Rs.30,000."
  },
  AC05Q35: {
    options: ['A) Vikas: 7/20; Vijay: 5/20; Vishal: 4/20; Ratio 7:5:4', 'B) Vikas: 11/20; Vijay: 5/20; Vishal: 4/20; Ratio 11:5:4', 'C) Vikas: 8/20; Vijay: 4/20; Vishal: 4/20; Ratio 2:1:1', 'D) Vikas: 9/20; Vijay: 5/20; Vishal: 4/20; Ratio 9:5:4'],
    correct: 1,
    explanation: 'Vikas old share = 7/10 = 14/20 and Vijay old share = 3/10 = 6/20. Vikas sacrifices 3/20 and Vijay sacrifices 1/20, so Vishal receives 4/20. New shares are Vikas 11/20, Vijay 5/20, and Vishal 4/20. New ratio = 11:5:4.'
  },
  AC05Q40: {
    correct: 0,
    explanation: 'Investment Fluctuation Reserve is maintained against a possible fall in investment value. Since investments are valued Rs.20,000 above book value, there is no fall to absorb. The appreciation is recorded through Revaluation Account, and the full reserve of Rs.30,000 is transferred to old partners in their old ratio 3:2.'
  },
  AC05Q47: {
    options: ['A) No hidden goodwill', 'B) Rs.1,50,000', 'C) Rs.30,000', 'D) Rs.45,000'],
    correct: 0,
    explanation: "F brings Rs.1,20,000 for 1/3 share, so implied total capital = Rs.1,20,000 / (1/3) = Rs.3,60,000. Actual total capital after admission = Rs.2,00,000 + Rs.1,50,000 + Rs.1,20,000 = Rs.4,70,000. Since actual capital is higher than implied capital, no hidden goodwill arises from these figures."
  },
  AC05Q50: {
    correct: 1,
    explanation: 'Old ratio X:Y:Z = 3:2:1. New ratio X:Y:Z:W = 3:2:1:1. Sacrifices are 3/42, 2/42, and 1/42, so the sacrificing ratio is 3:2:1. W pays Rs.30,000 goodwill; X receives Rs.15,000, Y receives Rs.10,000, and Z receives Rs.5,000.'
  },
  AC05Q71: {
    options: ['A) L:M:N:O = 20:15:15:10', 'B) L:M:N:O = 20:15:21:14', 'C) L:M:N:O = 24:17:30:10', 'D) L:M:N:O = 20:17:30:9'],
    correct: 1,
    explanation: "O's share is 1/5 = 2/10. L and M sacrifice this share in 4:3 ratio. L sacrifices 8/70 and M sacrifices 6/70. L's new share = 28/70 - 8/70 = 20/70. M's new share = 21/70 - 6/70 = 15/70. N does not sacrifice, so N remains 21/70. O = 14/70. New ratio = 20:15:21:14."
  },
  AC05Q75: {
    correct: 0,
    explanation: "Before admission, total assets are Rs.2,00,000 + Rs.1,00,000 + Rs.1,00,000 + Rs.50,000 = Rs.4,50,000. S brings Rs.1,00,000 capital and Rs.30,000 goodwill, increasing cash by Rs.1,30,000. Total balance sheet after admission before revaluation = Rs.4,50,000 + Rs.1,30,000 = Rs.5,80,000."
  },
  AC05Q78: {
    options: ['A) Net credit of Rs.24,000', 'B) Net credit of Rs.20,000', 'C) Net debit of Rs.4,000', 'D) Net credit of Rs.14,000'],
    correct: 0,
    explanation: "E is debited Rs.10,000 for writing off existing goodwill, credited Rs.30,000 for General Reserve, debited Rs.6,000 for P&L loss, and credited Rs.10,000 for G's goodwill premium. Net effect on E's capital = -10,000 + 30,000 - 6,000 + 10,000 = credit Rs.24,000."
  },
  AC05Q80: {
    options: ['A) Rs.80,000', 'B) Rs.1,00,000', 'C) Rs.27,500', 'D) Rs.30,000'],
    correct: 0,
    explanation: 'Weighted average profit = (Rs.80,000 x 1 + Rs.1,00,000 x 2 + Rs.1,20,000 x 3) / 6 = Rs.1,06,666.67. Goodwill = Rs.1,06,666.67 x 3 = Rs.3,20,000. New partner takes 1/4 share, so goodwill contribution = Rs.3,20,000 x 1/4 = Rs.80,000.'
  },
  AC05Q104: {
    explanation: 'Normal profit = Rs.5,00,000 x 10% = Rs.50,000. Super profit = Rs.75,000 - Rs.50,000 = Rs.25,000. Goodwill of the firm = Rs.25,000 x 3 = Rs.75,000. New partner premium for 1/5 share = Rs.75,000 x 1/5 = Rs.15,000.'
  },
  AC05Q111: {
    options: ['A) A: Rs.78,000; B: Rs.52,000', 'B) A: Rs.84,000; B: Rs.56,000', 'C) A: Rs.90,000; B: Rs.60,000', 'D) A: Rs.63,000; B: Rs.42,000'],
    correct: 0,
    explanation: 'Land appreciation = Rs.1,50,000. Machinery loss = Rs.30,000. Stock appreciation = Rs.10,000. Net revaluation profit = Rs.1,50,000 - Rs.30,000 + Rs.10,000 = Rs.1,30,000. A and B share in 3:2, so A receives Rs.78,000 and B receives Rs.52,000.'
  },
  AC05Q116: {
    correct: 0,
    explanation: "S's goodwill share = 1/6 x Rs.1,80,000 = Rs.30,000. S brings Rs.30,000 as goodwill cash, exactly matching the required amount. Therefore there is no deficit."
  },
  AC05Q119: {
    options: ['A) Ram: Rs.42,000; Shyam: Rs.28,000; Ghanshyam: Rs.14,000', 'B) Ram: Rs.63,000; Shyam: Rs.14,000; Ghanshyam: Rs.7,000', 'C) Ram: Rs.36,000; Shyam: Rs.24,000; Ghanshyam: Rs.24,000', 'D) Ram: Rs.28,000; Shyam: Rs.14,000; Ghanshyam: Rs.42,000'],
    correct: 1,
    explanation: 'Old shares are Ram 3/6, Shyam 2/6, and Ghanshyam 1/6. New shares are Ram 2/7, Shyam 2/7, Ghanshyam 1/7, and Mohan 2/7. Sacrifices are Ram 9/42, Shyam 2/42, and Ghanshyam 1/42, giving sacrificing ratio 9:2:1. Mohan pays Rs.84,000 goodwill, so Ram receives Rs.63,000, Shyam Rs.14,000, and Ghanshyam Rs.7,000.'
  },
  AC05Q121: {
    correct: 0,
    explanation: 'Normal profit = Rs.12,00,000 x 12% = Rs.1,44,000. Super profit = Rs.2,00,000 - Rs.1,44,000 = Rs.56,000. Goodwill = Rs.56,000 x 4 = Rs.2,24,000. New partner premium for 1/4 share = Rs.2,24,000 x 1/4 = Rs.56,000.'
  },
  AC05Q134: {
    options: ["A) R's Capital Dr. Rs.6,250; P's Capital Cr. Rs.3,750; Q's Capital Cr. Rs.2,500", "B) R's Capital Dr. Rs.25,000; P's Capital Cr. Rs.15,000; Q's Capital Cr. Rs.10,000", "C) R's Capital Dr. Rs.18,750; P's Capital Cr. Rs.11,250; Q's Capital Cr. Rs.7,500", "D) P's Capital Dr.; Q's Capital Dr. -> R's Capital Cr."],
    correct: 0,
    explanation: "R's total goodwill share = 1/4 x Rs.1,00,000 = Rs.25,000. R brings 75% in cash = Rs.18,750. Remaining goodwill adjusted through capital = Rs.6,250. This is credited to P and Q in 3:2 ratio: P Rs.3,750 and Q Rs.2,500. Entry: R's Capital Dr. Rs.6,250; To P's Capital Rs.3,750; To Q's Capital Rs.2,500."
  },
  AC05Q136: {
    correct: 2,
    explanation: "Total capital = Rs.7,00,000 + Rs.3,00,000 + Rs.2,50,000 = Rs.12,50,000. F's required capital in the 7:3:2 ratio is 3/12 x Rs.12,50,000 = Rs.3,12,500. F's actual capital is Rs.3,00,000, so F must bring Rs.12,500."
  },
  AC05Q153: {
    correct: 0,
    explanation: 'F pays Rs.3,00,000 for 1/4 share, implying total firm value of Rs.12,00,000. Net assets are Rs.8,00,000. Hidden goodwill = Rs.12,00,000 - Rs.8,00,000 = Rs.4,00,000.'
  },
  AC05Q167: {
    correct: 3,
    explanation: "Old partners' capitals after revaluation and reserve distribution total Rs.2,37,000 x 3 = Rs.7,11,000. D brings Rs.90,000 capital and Rs.30,000 goodwill. If goodwill is retained and credited equally to old partners, capital accounts increase by another Rs.30,000. Total capital = Rs.7,11,000 + Rs.90,000 + Rs.30,000 = Rs.8,31,000."
  },
  AC05Q171: {
    options: ['A) Rs.46,000', 'B) Rs.15,000', 'C) Rs.18,000', 'D) Rs.20,000'],
    correct: 0,
    explanation: 'The one-time loss of Rs.10,000 in Year 3 is added back. Adjusted total profit = Rs.4,50,000 + Rs.10,000 = Rs.4,60,000. Average profit = Rs.92,000. Goodwill = Rs.92,000 x 3 = Rs.2,76,000. New partner premium for 1/6 share = Rs.2,76,000 x 1/6 = Rs.46,000.'
  },
  AC05Q175: {
    options: ["A) A's Capital net increase = Rs.24,000", "B) A's Capital net decrease = Rs.84,000", "C) A's Capital net increase = Rs.36,000", "D) A's Capital net increase = Rs.18,000"],
    correct: 1,
    explanation: "Existing goodwill of Rs.2,00,000 is written off in old ratio 3:2, so A is debited Rs.1,20,000. C's goodwill premium = 1/5 x Rs.3,00,000 = Rs.60,000, credited to old partners in 3:2 ratio; A receives Rs.36,000. Net change in A's Capital = Rs.36,000 credit - Rs.1,20,000 debit = Rs.84,000 decrease."
  },
  AC05Q194: {
    options: ['A) Rs.24,000', 'B) Rs.18,000', 'C) Rs.12,000', 'D) Rs.6,000'],
    correct: 1,
    explanation: 'G is admitted on 1 July 2024 and the year ends on 31 March 2025, so G is entitled to profit for 9 months. Profit for 9 months = Rs.1,20,000 x 9/12 = Rs.90,000. G share in the new ratio is 1/5, so G profit share = Rs.90,000 x 1/5 = Rs.18,000.'
  }
}));

let changed = 0;
for (const question of data.questions) {
  const fix = fixes.get(question.id);
  if (!fix) continue;
  if ('options' in fix) question.options = fix.options;
  if ('correct' in fix) {
    if (!('correct_content_review_original' in question) && question.correct !== fix.correct) {
      question.correct_content_review_original = question.correct;
    }
    question.correct = fix.correct;
  }
  question.explanation = fix.explanation;
  changed += 1;
}

await writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Updated ${changed} AC05 questions in ${file}`);
