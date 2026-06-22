import { readFile, writeFile } from 'node:fs/promises';

const file = 'questions/accountancy/AC04.json';
const data = JSON.parse(await readFile(file, 'utf8'));

const fixes = new Map(Object.entries({
  AC04Q09: {
    options: ['Rs.1,83,750', 'Rs.1,80,000', 'Rs.1,65,000', 'Rs.2,10,000'],
    correct: 0,
    explanation: 'Year 3 adjusted profit = Rs.70,000 - Rs.10,000 = Rs.60,000. Year 4 adjusted profit = Rs.80,000 - Rs.5,000 = Rs.75,000. Total adjusted profit = Rs.50,000 + Rs.60,000 + Rs.60,000 + Rs.75,000 = Rs.2,45,000. Average profit = Rs.2,45,000 / 4 = Rs.61,250. Goodwill = Rs.61,250 x 3 = Rs.1,83,750.'
  },
  AC04Q21: {
    options: ['Rs.1,20,000', 'Rs.1,60,000', 'Rs.64,000', 'Rs.2,00,000'],
    correct: 2,
    explanation: 'Depreciation omitted in Year 3 = Rs.2,00,000 x 10% = Rs.20,000. Adjusted Year 3 profit = Rs.80,000 - Rs.20,000 = Rs.60,000. Total adjusted profits = Rs.5,80,000 and average profit = Rs.1,16,000. Normal profit = Rs.10,00,000 x 10% = Rs.1,00,000. Super profit = Rs.16,000. Goodwill = Rs.16,000 x 4 = Rs.64,000.'
  },
  AC04Q24: {
    options: ['Rs.14,00,000', 'Rs.6,00,000', 'Rs.4,00,000', 'Rs.8,00,000'],
    correct: 0,
    explanation: 'The average profit is after charging interest on capital, so add back interest to compare profit with the normal return on capital. Profit before interest = Rs.2,40,000 + (Rs.10,00,000 x 12%) = Rs.3,60,000. Normal profit = Rs.10,00,000 x 15% = Rs.1,50,000. Super profit = Rs.2,10,000. Goodwill by capitalisation of super profit = Rs.2,10,000 / 15% = Rs.14,00,000.'
  },
  AC04Q25: {
    options: ['A: Rs.30,000; B: Rs.0', 'A: Rs.22,500; B: Rs.7,500', 'A: Rs.18,000; B: Rs.12,000', 'A: Rs.15,000; B: Rs.15,000'],
    correct: 0,
    explanation: "C's premium = 1/4 x Rs.1,20,000 = Rs.30,000. Old ratio A:B = 3/4:1/4. New shares are A = 3/4 x 2/3 = 1/2 and B = 3/4 x 1/3 = 1/4. A sacrifices 3/4 - 1/2 = 1/4, while B sacrifices nothing. Therefore the full premium of Rs.30,000 is credited to A."
  },
  AC04Q26: {
    options: ['Rs.86,000', 'Rs.88,000', 'Rs.90,000', 'Rs.84,000'],
    correct: 0,
    explanation: 'Abnormal loss in Year 4 is added back: Rs.20,000 + Rs.15,000 = Rs.35,000. Adjusted total profits = Rs.30,000 + Rs.40,000 + Rs.50,000 + Rs.35,000 + Rs.60,000 = Rs.2,15,000. Average profit = Rs.43,000. Goodwill = Rs.43,000 x 2 = Rs.86,000.'
  },
  AC04Q33: {
    options: ['Rs.2,00,000', 'Rs.3,20,000', 'Rs.2,50,000', 'Rs.4,40,000'],
    correct: 3,
    explanation: 'After-tax profits are Rs.1,44,000, Rs.1,68,000, and Rs.1,92,000. Average after-tax profit = Rs.1,68,000. Normal profit = Rs.10,00,000 x 8% = Rs.80,000. Super profit = Rs.1,68,000 - Rs.80,000 = Rs.88,000. Goodwill = Rs.88,000 x 5 = Rs.4,40,000.'
  },
  AC04Q42: {
    options: [
      "Debit L's Capital Rs.20,000; Credit N's Capital Rs.20,000",
      "Debit L's Capital Rs.10,000 and M's Capital Rs.10,000; Credit N's Capital Rs.20,000",
      "Debit N's Capital Rs.20,000; Credit L's Capital Rs.12,000 and M's Capital Rs.8,000",
      "Debit Goodwill Rs.1,00,000; Credit N's Capital Rs.20,000"
    ],
    correct: 0,
    explanation: "N's share of goodwill = 1/5 x Rs.1,00,000 = Rs.20,000. L's old share was 2/5 and new share is 3/5, so L gains 1/5. M's old and new shares are both 2/5, so M does not gain. The gaining partner L compensates retiring partner N with Rs.20,000."
  },
  AC04Q50: {
    correct: 3,
    explanation: 'Capital employed = total assets Rs.15,00,000 - external liabilities Rs.5,00,000 - preliminary expenses Rs.50,000 = Rs.9,50,000. Normal profit = Rs.9,50,000 x 10% = Rs.95,000. Super profit = Rs.1,40,000 - Rs.95,000 = Rs.45,000. Goodwill = Rs.45,000 x 2 = Rs.90,000.'
  },
  AC04Q51: {
    options: ['Rs.15,000', 'Rs.1,20,000', 'Rs.90,000', 'Rs.60,000'],
    correct: 0,
    explanation: 'Outstanding salary of Rs.5,000 is deducted from each year: adjusted profits are Rs.45,000, Rs.65,000, and Rs.85,000. Average profit = Rs.1,95,000 / 3 = Rs.65,000. Normal profit = Rs.6,00,000 x 10% = Rs.60,000. Super profit = Rs.5,000. Goodwill = Rs.5,000 x 3 = Rs.15,000.'
  },
  AC04Q53: {
    options: ['Rs.16,000', 'Rs.28,000', 'Rs.56,000', 'Rs.48,000'],
    correct: 0,
    explanation: 'Capital employed includes capital plus reserves retained in the business: Rs.2,50,000 + Rs.20,000 + Rs.30,000 = Rs.3,00,000. Normal profit = Rs.3,00,000 x 12% = Rs.36,000. Super profit = Rs.40,000 - Rs.36,000 = Rs.4,000. Goodwill = Rs.4,000 x 4 = Rs.16,000.'
  },
  AC04Q67: {
    options: ['Rs.1,20,000', 'Rs.60,000', 'Rs.2,00,000', 'Rs.1,60,000'],
    correct: 1,
    explanation: 'The fair partner salary of Rs.15,000 per year should be deducted from each year to arrive at maintainable profit. Adjusted profits are Rs.85,000, Rs.1,05,000, Rs.65,000, and Rs.1,25,000. Average adjusted profit = Rs.95,000. Normal profit = Rs.8,00,000 x 10% = Rs.80,000. Super profit = Rs.15,000. Goodwill = Rs.15,000 x 4 = Rs.60,000.'
  },
  AC04Q85: {
    options: [
      "E's Capital Dr Rs.20,000; F's Capital Cr Rs.20,000",
      "D's Capital Dr Rs.12,000; E's Capital Dr Rs.8,000; F's Capital Cr Rs.20,000",
      "D's Capital Dr Rs.15,000; E's Capital Dr Rs.5,000; F's Capital Cr Rs.20,000",
      "D's Capital Dr Rs.20,000; F's Capital Cr Rs.20,000"
    ],
    correct: 0,
    explanation: "F's share of goodwill = 1/6 x Rs.1,20,000 = Rs.20,000. D's old share was 3/6 and new share is 1/2, so D has no gain. E's old share was 2/6 and new share is 1/2, so E gains F's 1/6 share. Therefore E compensates F with Rs.20,000."
  },
  AC04Q92: {
    options: ['Rate = 11.54%; Super profit = Rs.34,615 approx', 'Rate = 10%; Super profit = Rs.50,000', 'Rate = 15%; Super profit = Rs.1,50,000', 'Rate = 10%; Super profit = Rs.0'],
    correct: 0,
    explanation: 'Capitalised value = capital employed + goodwill = Rs.10,00,000 + Rs.3,00,000 = Rs.13,00,000. Normal rate = average profit / capitalised value = Rs.1,50,000 / Rs.13,00,000 = 11.54% approximately. Normal profit on capital employed = Rs.10,00,000 x 11.54% = Rs.1,15,385 approximately. Super profit = Rs.1,50,000 - Rs.1,15,385 = Rs.34,615 approximately.'
  },
  AC04Q97: {
    options: ['Rs.15,000', 'Rs.1,00,000', 'Rs.80,000', 'Rs.50,000'],
    correct: 0,
    explanation: 'Capital employed = Rs.12,00,000 - Rs.20,000 - Rs.50,000 - Rs.4,00,000 = Rs.7,30,000. Normal profit = Rs.7,30,000 x 12.5% = Rs.91,250. Super profit = Rs.95,000 - Rs.91,250 = Rs.3,750. Goodwill = Rs.3,750 x 4 = Rs.15,000.'
  },
  AC04Q100: {
    options: ['Rs.33,000', 'Rs.1,20,000', 'Rs.60,000', 'Rs.75,000'],
    correct: 0,
    explanation: 'Year 2 adjusted profit = Rs.1,00,000 - Rs.15,000 = Rs.85,000. Year 4 adjusted profit = Rs.90,000 + Rs.20,000 = Rs.1,10,000. Adjusted total profit = Rs.5,05,000 and average profit = Rs.1,01,000. Normal profit = Rs.9,00,000 x 10% = Rs.90,000. Super profit = Rs.11,000. Goodwill = Rs.11,000 x 3 = Rs.33,000.'
  },
  AC04Q109: {
    options: [
      'O gains; M and N sacrifice; O debits Rs.75,000',
      "M and N gain; O sacrifices Rs.75,000; M and N each credit Rs.37,500",
      "O's Capital Dr Rs.30,000; M's Capital Cr Rs.15,000; N's Capital Cr Rs.15,000",
      'No adjustment needed as all partners remain'
    ],
    correct: 2,
    explanation: 'Old shares are M = 2/5, N = 2/5, O = 1/5. New shares are M = 3/10, N = 3/10, O = 4/10. M and N each sacrifice 1/10, while O gains 2/10. O must compensate M and N for goodwill: total compensation = 2/10 x Rs.1,50,000 = Rs.30,000, credited Rs.15,000 each to M and N.'
  },
  AC04Q117: {
    options: [
      "L's Capital Dr Rs.80,000; M's Capital Dr Rs.20,000; K's Capital Cr Rs.1,00,000",
      "L's Capital Dr Rs.50,000; M's Capital Dr Rs.50,000; K's Capital Cr Rs.1,00,000",
      "L's Capital Dr Rs.60,000; M's Capital Dr Rs.40,000; K's Capital Cr Rs.1,00,000",
      "K's Capital Dr Rs.1,00,000; L's Capital Cr Rs.70,000; M's Capital Cr Rs.30,000"
    ],
    correct: 0,
    explanation: "K's share of goodwill = 5/10 x Rs.2,00,000 = Rs.1,00,000. L's gain = 7/10 - 3/10 = 4/10. M's gain = 3/10 - 2/10 = 1/10. Gaining ratio is 4:1, so L compensates K with Rs.80,000 and M compensates K with Rs.20,000."
  },
  AC04Q119: {
    options: ['Rs.2,08,000', 'Rs.1,20,000', 'Rs.1,68,000', 'Rs.68,000'],
    correct: 3,
    explanation: 'Partners salary of Rs.12,000 per year is not to be charged for goodwill, so add it back to each year. Adjusted profits are Rs.72,000, Rs.92,000, Rs.82,000, and Rs.1,02,000. Average profit = Rs.87,000. Normal profit = Rs.7,00,000 x 10% = Rs.70,000. Super profit = Rs.17,000. Goodwill = Rs.17,000 x 4 = Rs.68,000.'
  },
  AC04Q120: {
    correct: 2,
    explanation: 'Total real assets before deducting liabilities are fixed assets Rs.8,00,000 plus current assets Rs.3,00,000 = Rs.11,00,000. Deferred advertisement expenditure is fictitious and is excluded. Capital employed = Rs.11,00,000 - current liabilities Rs.1,50,000 - long-term loan Rs.2,50,000 = Rs.7,00,000. Normal profit = Rs.70,000. Super profit = Rs.1,10,000 - Rs.70,000 = Rs.40,000. Goodwill = Rs.40,000 x 3 = Rs.1,20,000.'
  },
  AC04Q129: {
    correct: 3,
    explanation: 'Average profit = (Rs.40,000 + Rs.50,000 + Rs.60,000 + Rs.70,000) / 4 = Rs.55,000. Normal profit = Rs.4,00,000 x 12.5% = Rs.50,000. Super profit = Rs.5,000. Goodwill = Rs.5,000 x 2 = Rs.10,000.'
  },
  AC04Q131: {
    options: ['3.33%', '12.5%', '8%', '15%'],
    correct: 0,
    explanation: 'Average profit = Rs.2,50,000 / 5 = Rs.50,000. Under capitalisation of average profit, goodwill = capitalised value - capital employed. Therefore Rs.5,00,000 = capitalised value - Rs.10,00,000, so capitalised value = Rs.15,00,000. Normal rate = Rs.50,000 / Rs.15,00,000 = 3.33% approximately.'
  },
  AC04Q133: {
    options: ['Rs.5,00,000', 'Rs.4,00,000', 'Rs.3,50,000', 'Rs.6,00,000'],
    correct: 0,
    explanation: 'Weighted profit total = Rs.30,000 x 1 + Rs.40,000 x 2 + Rs.50,000 x 3 + Rs.60,000 x 4 = Rs.5,00,000. Total weights = 10, so weighted average profit = Rs.50,000. Capitalised value at 10% = Rs.50,000 / 10% = Rs.5,00,000. Since no capital employed is given for deduction, the goodwill value under the stated data is Rs.5,00,000.'
  },
  AC04Q155: {
    options: ['Rs.1,20,000', 'Rs.90,000', 'Rs.30,000', 'Rs.60,000'],
    correct: 0,
    explanation: 'Current capital is Rs.6,00,000 and no reserve remains at the end, so capital employed is Rs.6,00,000. Normal profit = Rs.6,00,000 x 10% = Rs.60,000. Super profit = Rs.1,00,000 - Rs.60,000 = Rs.40,000. Goodwill = Rs.40,000 x 3 = Rs.1,20,000.'
  },
  AC04Q158: {
    options: ['Hidden GW Rs.3,00,000; A: Rs.2,25,000; B: Rs.75,000', 'Hidden GW Rs.4,00,000; A: Rs.3,00,000; B: Rs.1,00,000', 'Hidden GW Rs.2,00,000; A: Rs.1,50,000; B: Rs.50,000', 'No hidden goodwill'],
    correct: 0,
    explanation: "D brings Rs.3,00,000 for a 1/4 share, so implied total capital of the firm is Rs.12,00,000. Actual total capital after D's admission is Rs.4,00,000 + Rs.2,00,000 + Rs.3,00,000 = Rs.9,00,000. Hidden goodwill = Rs.12,00,000 - Rs.9,00,000 = Rs.3,00,000. Distributed in A:B = 3:1, A receives Rs.2,25,000 and B receives Rs.75,000."
  },
  AC04Q161: {
    options: ['Rs.0', 'Rs.1,60,000', 'Rs.20,000', 'Rs.80,000'],
    correct: 0,
    explanation: 'Capital employed = Rs.3,00,000 + Rs.3,00,000 = Rs.6,00,000. Normal profit = Rs.6,00,000 x 15% = Rs.90,000. Average profit is only Rs.80,000, so super profit is negative. A negative super profit does not create goodwill; goodwill is taken as nil.'
  },
  AC04Q167: {
    options: ['Rs.1,92,000', 'Rs.2,40,000', 'Rs.80,000', 'Rs.3,20,000'],
    correct: 0,
    explanation: 'After-tax profits are Rs.98,000, Rs.1,12,000, and Rs.1,26,000. Average after-tax profit = Rs.1,12,000. Normal after-tax profit = Rs.8,00,000 x 8% = Rs.64,000. Super profit = Rs.48,000. Goodwill = Rs.48,000 x 4 = Rs.1,92,000.'
  },
  AC04Q171: {
    options: ["A's Capital Dr Rs.20,000; B's Capital Cr Rs.20,000", "B's Capital Dr Rs.40,000; A's Capital Cr Rs.40,000", "A's Capital Dr Rs.40,000; B's Capital Cr Rs.40,000", 'No entry - both are existing partners'],
    correct: 0,
    explanation: 'Old ratio A:B = 1:1, so each had 1/2. New ratio A:B = 3:1, so A has 3/4 and B has 1/4. A gains 1/4 and B sacrifices 1/4. Goodwill adjustment = 1/4 x Rs.80,000 = Rs.20,000. The gaining partner A is debited and the sacrificing partner B is credited.'
  },
  AC04Q174: {
    options: ['Rs.60,000', 'Rs.1,20,000', 'Rs.80,000', 'Rs.2,00,000'],
    correct: 0,
    explanation: 'Capital employed is already net of non-business investment, so use Rs.9,50,000. Average profit is already excluding non-business income, so use Rs.1,10,000. Normal profit = Rs.9,50,000 x 10% = Rs.95,000. Super profit = Rs.15,000. Goodwill = Rs.15,000 x 4 = Rs.60,000.'
  },
  AC04Q199: {
    correct: 1,
    explanation: "Y gains 1/6 share, taken equally from X and Z. Y's compensation for goodwill = 1/6 x Rs.1,50,000 = Rs.25,000. X and Z sacrifice equally, so each is credited Rs.12,500. The entry is Y's Capital Dr Rs.25,000; X's Capital Cr Rs.12,500; Z's Capital Cr Rs.12,500."
  },
  AC04Q200: {
    options: ['Capitalisation gives Rs.5,00,000; years purchase gives Rs.2,00,000; capitalisation higher by Rs.3,00,000', 'Capitalisation gives Rs.3,75,000; years purchase gives Rs.3,00,000; capitalisation higher by Rs.75,000', 'Both methods give Rs.6,00,000', 'Years purchase gives Rs.7,50,000; capitalisation gives Rs.3,75,000'],
    correct: 0,
    explanation: 'Post-tax profit = Rs.2,00,000 x 60% = Rs.1,20,000. Normal post-tax profit = Rs.10,00,000 x 8% = Rs.80,000. Super profit = Rs.40,000. Goodwill by capitalisation of super profit = Rs.40,000 / 8% = Rs.5,00,000. Goodwill by 5 years purchase = Rs.40,000 x 5 = Rs.2,00,000. Capitalisation gives the higher value by Rs.3,00,000.'
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
console.log(`Updated ${changed} AC04 questions in ${file}`);
