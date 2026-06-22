import { readFile, writeFile } from 'node:fs/promises';

const file = 'questions/accountancy/AC03.json';
const data = JSON.parse(await readFile(file, 'utf8'));

const fixes = new Map(Object.entries({
  ACO3Q07: {
    options: [
      'A gains 7/45, C gains 8/45; A pays Rs.14,000, C pays Rs.16,000',
      'A gains 1/15, C gains 2/15; A pays Rs.6,000, C pays Rs.12,000',
      'A gains 4/45, C gains 5/45; A pays Rs.8,000, C pays Rs.10,000',
      'A gains 3/45, C gains 2/45; A pays Rs.6,000, C pays Rs.4,000'
    ],
    correct: 0,
    explanation: "A's old share is 4/9 and new share is 3/5, so A gains 3/5 - 4/9 = 7/45. C's old share is 2/9 and new share is 2/5, so C gains 2/5 - 2/9 = 8/45. B's share of goodwill = 3/9 x Rs.90,000 = Rs.30,000. Gaining ratio is 7:8, so A pays Rs.14,000 and C pays Rs.16,000 to B."
  },
  ACO3Q12: {
    options: ['Rs.38,400', 'Rs.16,000', 'Rs.8,000', 'Rs.24,000'],
    correct: 0,
    explanation: "Asha sacrifices 1/6 share, and Charu gains 1/6 share, so Charu's Capital is debited Rs.20,000 and Asha's Capital is credited Rs.20,000. Asha's adjusted capital becomes Rs.3,20,000. Interest on Asha's capital at 12% is Rs.38,400. Total interest for all partners equals the profit before interest, so no residual profit remains for division. Asha's total profit appropriation is Rs.38,400."
  },
  ACO3Q14: {
    explanation: "Old shares are A = 1/2, B = 1/3, and C = 1/6. New shares are 1/3 each. A sacrifices 1/2 - 1/3 = 1/6, B has no change, and C gains 1/3 - 1/6 = 1/6. C must compensate A for 1/6 of goodwill: Rs.72,000 x 1/6 = Rs.12,000. Entry: C's Capital Dr Rs.12,000; To A's Capital Rs.12,000."
  },
  ACO3Q17: {
    options: [
      'New ratio 2:1; P gains 3/10, R gains 2/10',
      'New ratio 17:8; P gains 9/50, R gains 6/50',
      'New ratio 3:2; P gains 3/10, R gains 2/10',
      'New ratio 13:7; P gains 3/50, R gains 2/50'
    ],
    correct: 1,
    explanation: "Q's share is 3/10. P and R acquire Q's share in 3:2 ratio. P gains 3/5 x 3/10 = 9/50 and R gains 2/5 x 3/10 = 6/50. P's new share = 5/10 + 9/50 = 34/50. R's new share = 2/10 + 6/50 = 16/50. New ratio P:R = 34:16 = 17:8."
  },
  ACO3Q23: {
    correct: 0,
    explanation: "A's old share is 4/10 and new share is 3/10, so A sacrifices 1/10. B gains 1/10 and C has no change. Goodwill adjustment credited to A = 1/10 x Rs.1,00,000 = Rs.10,000. Outstanding salary payable is recorded as a liability separately and does not change A's capital as goodwill compensation. Net credit to A's capital is Rs.10,000."
  },
  ACO3Q35: {
    options: [
      'Kiran 5/12, Leela 1/3; each sacrifices 1/24',
      'Kiran 3/8, Leela 3/8; each sacrifices 1/8',
      'Kiran 7/12, Leela 5/12; Kiran sacrifices more',
      'Kiran 13/24, Leela 5/24, Meera 6/24; sacrificing ratio 1:1'
    ],
    correct: 3,
    explanation: "Meera receives 1/4 share. Kiran and Leela bear this equally, so each sacrifices 1/8. Kiran's new share = 2/3 - 1/8 = 13/24. Leela's new share = 1/3 - 1/8 = 5/24. Meera's share = 1/4 = 6/24. New ratio = 13:5:6, and the sacrificing ratio is 1:1."
  },
  ACO3Q40: {
    correct: 3,
    explanation: "Bimal receives revaluation profit Rs.6,000 and General Reserve Rs.9,000 in the old 5:3:2 ratio. His share rises from 3/10 to 4/10, so he gains 1/10 and is debited Rs.10,000 for goodwill. Net effect = Rs.6,000 + Rs.9,000 - Rs.10,000 = Rs.5,000 credit."
  },
  ACO3Q43: {
    options: ['A withdraws Rs.30,000', 'A brings in Rs.20,000', 'A withdraws Rs.20,000', 'No adjustment needed'],
    correct: 0,
    explanation: "A sacrifices 1/4 share when the ratio changes from 3:1 to 1:1. B compensates A for goodwill: 1/4 x Rs.40,000 = Rs.10,000. A's adjusted capital becomes Rs.90,000 and B's adjusted capital becomes Rs.30,000. Total capital is Rs.1,20,000, so in the new 1:1 ratio each should have Rs.60,000. A must withdraw Rs.30,000."
  },
  ACO3Q50: {
    options: ['3/5', '13/25', '9/15', '2/5'],
    correct: 1,
    explanation: "X's old share is 3/5. X surrenders 1/5 of his share, i.e. 1/5 x 3/5 = 3/25, to Y. Y's old share is 2/5 = 10/25. Y's new share = 10/25 + 3/25 = 13/25."
  },
  ACO3Q59: {
    options: [
      "A's Capital Cr Rs.15,000; B's Capital Dr Rs.9,000; C's Capital Dr Rs.6,000",
      "A's Capital Dr Rs.15,000; B's Capital Cr Rs.3,000; C's Capital Cr Rs.12,000",
      'Goodwill A/c Dr Rs.90,000; All capitals Cr equally',
      'A gains, so no entry needed for A'
    ],
    correct: 1,
    explanation: "Old shares are 1/3 each. New shares are A = 1/2, B = 3/10, and C = 1/5. A gains 1/6, while B sacrifices 1/30 and C sacrifices 2/15. A is debited for the gain: 1/6 x Rs.90,000 = Rs.15,000. B is credited Rs.3,000 and C is credited Rs.12,000."
  },
  ACO3Q67: {
    explanation: 'Old shares are A = 2/5 and B = 3/5. New shares are A = 1/5 and B = 4/5. A sacrifices 2/5 - 1/5 = 1/5, and B gains 4/5 - 3/5 = 1/5. Therefore A sacrifices 1/5 and B gains 1/5.'
  },
  ACO3Q73: {
    options: ['Rs.30,000 + Rs.30,000 = Rs.60,000', 'Rs.22,500 + Rs.15,000 = Rs.37,500', 'Rs.90,000 total', 'Rs.30,000 only'],
    correct: 1,
    explanation: "Profit must be split by time. For 1 April to 31 December, 9 months' profit = Rs.1,20,000 x 9/12 = Rs.90,000. X's share in the old 1:3 ratio is 1/4, so X gets Rs.22,500. For 1 January to 31 March, 3 months' profit = Rs.30,000. X's share in the new equal ratio is 1/2, so X gets Rs.15,000. Total = Rs.37,500."
  },
  ACO3Q75: {
    correct: 1,
    explanation: "Old shares are A = 5/10, B = 3/10, and C = 2/10. New shares are A = 2/10, B = 5/10, and C = 3/10. A sacrifices 3/10, while B gains 2/10 and C gains 1/10. B is debited for his gain: 2/10 x Rs.1,00,000 = Rs.20,000."
  },
  ACO3Q90: {
    options: ['3/5', '3/15', '7/15', '8/15'],
    correct: 0,
    explanation: "B's old share is 3/5. B gives 1/3 of his share to A, so the share transferred is 1/3 x 3/5 = 1/5. A's old share is 2/5. A's new share = 2/5 + 1/5 = 3/5."
  },
  ACO3Q92: {
    correct: 2,
    explanation: "Z's old share is 2/8, so Z's goodwill = 2/8 x Rs.80,000 = Rs.20,000. New ratio X:Y = 3:1, so X's new share is 3/4 and Y's new share is 1/4. X gains 3/4 - 3/8 = 3/8, while Y sacrifices 3/8 - 1/4 = 1/8. Therefore X is the gaining partner and Z receives Rs.20,000 goodwill."
  },
  ACO3Q108: {
    options: [
      "P's Capital Cr Rs.15,000 (goodwill) + Rs.10,000 (salary) = Cr Rs.25,000",
      "P's Capital Cr Rs.15,000 only; salary treated separately",
      "P's Capital Dr Rs.5,000 net",
      "P's Capital Cr Rs.10,000 net"
    ],
    correct: 2,
    explanation: "P's share rises from 3/10 to 4/10, so P gains 1/10 and is debited Rs.15,000 for goodwill. Salary payable to P for past service credits P by Rs.10,000. Net capital change for P = Rs.15,000 debit - Rs.10,000 credit = Rs.5,000 debit."
  },
  ACO3Q110: {
    options: ['Rs.38,000', 'Rs.60,000', 'Rs.32,000', 'Rs.48,000'],
    correct: 1,
    explanation: "B's opening capital is Rs.40,000. B receives General Reserve in old ratio: 2/5 x Rs.25,000 = Rs.10,000. B's share falls from 2/5 to 1/5, so B sacrifices 1/5 and is credited 1/5 x Rs.50,000 = Rs.10,000 for goodwill. Final B capital = Rs.40,000 + Rs.10,000 + Rs.10,000 = Rs.60,000."
  },
  ACO3Q114: {
    options: [
      "B's Capital Cr Rs.24,000 (goodwill gain) + Cr Rs.12,000 (revaluation) = Cr Rs.36,000",
      "B's Capital Dr Rs.24,000 (goodwill) + Cr Rs.12,000 (revaluation) = Cr net Rs.12,000",
      "B's net capital impact is nil",
      "B's Capital Cr Rs.36,000"
    ],
    correct: 2,
    explanation: "Investments undervalued by Rs.30,000 create revaluation profit. B receives 4/10 x Rs.30,000 = Rs.12,000 credit. B's share rises from 4/10 to 5/10, so B gains 1/10 and is debited 1/10 x Rs.1,20,000 = Rs.12,000 for goodwill. The two effects cancel, so B's net impact is nil."
  },
  ACO3Q117: {
    options: ['Net credit Rs.55,000', 'Net debit Rs.2,000', 'Net credit Rs.24,000', 'Net debit Rs.12,000'],
    correct: 0,
    explanation: "Net revaluation profit = Rs.40,000 - Rs.10,000 = Rs.30,000. C receives 5/10 x Rs.30,000 = Rs.15,000. C also receives General Reserve 5/10 x Rs.60,000 = Rs.30,000. C's share falls from 5/10 to 4/10, so C sacrifices 1/10 and is credited 1/10 x Rs.1,00,000 = Rs.10,000 for goodwill. Net C position = Rs.55,000 credit."
  },
  ACO3Q122: {
    options: ['Rs.1,56,000', 'Rs.1,76,000', 'Rs.1,36,000', 'Rs.1,46,000'],
    correct: 1,
    explanation: "A's opening capital is Rs.1,50,000. Accrued income creates revaluation profit of Rs.15,000; A receives 4/10 x Rs.15,000 = Rs.6,000. A sacrifices 1/10 when the ratio changes from 4:3:3 to 3:4:3, so A is credited 1/10 x Rs.2,00,000 = Rs.20,000 for goodwill. A's capital after adjustments = Rs.1,50,000 + Rs.6,000 + Rs.20,000 = Rs.1,76,000."
  },
  ACO3Q143: {
    correct: 3,
    explanation: "O's share rises from 2/10 to 4/10, so O gains 2/10. M sacrifices the same 2/10. O is credited 2/10 x Rs.1,50,000 = Rs.30,000 for goodwill. O's adjusted capital = Rs.50,000 + Rs.30,000 = Rs.80,000. Interest on capital at 10% = Rs.8,000."
  },
  ACO3Q145: {
    explanation: 'Capital employed = total assets Rs.7,00,000 - liabilities Rs.2,00,000 = Rs.5,00,000. Normal profit = 10% x Rs.5,00,000 = Rs.50,000. Super profit = Rs.60,000 - Rs.50,000 = Rs.10,000. Goodwill = Rs.10,000 x 5 = Rs.50,000.'
  },
  ACO3Q177: {
    options: [
      'A sacrifices 1/18; B sacrifices 1/36; New A:B:C = 16:11:9',
      'A sacrifices 2/12; B sacrifices 1/12; New ratio 10:7:4 in 21',
      'A sacrifices 1/6; B sacrifices 1/12; New ratio 7:5:4 in 16',
      'A gives more than B - ratio cannot be equal'
    ],
    correct: 0,
    explanation: "C's share rises from 1/6 to 1/4, so C receives an additional 1/12. A and B sacrifice this 1/12 in 2:1 ratio. A sacrifices 2/3 x 1/12 = 1/18 and B sacrifices 1/3 x 1/12 = 1/36. A's new share = 3/6 - 1/18 = 16/36. B's new share = 2/6 - 1/36 = 11/36. C's new share = 1/4 = 9/36. New ratio = 16:11:9."
  },
  ACO3Q183: {
    options: ['Rs.70,000', 'Rs.1,12,000', 'Rs.1,18,000', 'Rs.1,40,000'],
    correct: 0,
    explanation: "B's opening capital is Rs.1,00,000. B receives General Reserve in old ratio: 4/10 x Rs.1,00,000 = Rs.40,000. B's old share is 4/10 and new share is 3/4, so B gains 7/20. B compensates retiring partner A for goodwill by 7/20 x Rs.2,00,000 = Rs.70,000. B's final capital = Rs.1,00,000 + Rs.40,000 - Rs.70,000 = Rs.70,000."
  },
  ACO3Q192: {
    options: [
      'P Cr Rs.15,000 net from goodwill adjustment',
      'P Dr Rs.6,000 net from goodwill adjustment',
      'P Cr Rs.30,000 - Dr Rs.15,000 = net Cr Rs.15,000',
      'P net nil from these steps combined'
    ],
    correct: 1,
    explanation: "Existing goodwill of Rs.30,000 is written off in old ratio, so P is debited 5/10 x Rs.30,000 = Rs.15,000. P sacrifices 1/10 when the ratio changes from 5:3:2 to 4:4:2, so P is credited 1/10 x agreed goodwill Rs.90,000 = Rs.9,000. Net capital change for P from goodwill adjustment = Rs.6,000 debit."
  },
  ACO3Q200: {
    options: ["C's Capital = Rs.1,79,500", "C's Capital = Rs.2,10,000", "C's Capital = Rs.2,40,000", "C's Capital = Rs.1,70,000"],
    correct: 0,
    explanation: "C's opening capital is Rs.1,00,000. Revaluation profit = Rs.60,000 - Rs.15,000 = Rs.45,000, and C receives 3/10 x Rs.45,000 = Rs.13,500. General Reserve credit = 3/10 x Rs.90,000 = Rs.27,000. P&L credit = 3/10 x Rs.30,000 = Rs.9,000. C gains 1/10 in the new ratio, so C is credited 1/10 x Rs.3,00,000 = Rs.30,000 for goodwill. Final C capital = Rs.1,00,000 + Rs.13,500 + Rs.27,000 + Rs.9,000 + Rs.30,000 = Rs.1,79,500."
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
console.log(`Updated ${changed} AC03 questions in ${file}`);
