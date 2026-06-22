import fs from 'node:fs';

const file = 'questions/economics/EC10.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const patches = {
  EC10Q13: {
    question: 'Revenue Expenditure = Rs.8,000 crore, Capital Expenditure = Rs.3,000 crore, Revenue Receipts = Rs.6,500 crore, and the budget statement shows Borrowings = Rs.2,800 crore. If interest payments included in revenue expenditure are Rs.1,500 crore, calculate Primary Deficit using borrowings as the fiscal deficit figure.',
    correct: 0,
    explanation: 'In budget accounting, fiscal deficit is financed through borrowings. The question directly gives borrowings as Rs.2,800 crore, so Fiscal Deficit = Rs.2,800 crore. Primary Deficit = Fiscal Deficit - Interest Payments = Rs.2,800 crore - Rs.1,500 crore = Rs.1,300 crore. Option A is correct.'
  },
  EC10Q22: {
    options: ['Rs.6,700 crore', 'Rs.5,300 crore', 'Rs.4,700 crore', 'Rs.7,700 crore'],
    correct: 1,
    explanation: 'Fiscal Deficit = Primary Deficit + Interest Payments = Rs.800 crore + Rs.1,200 crore = Rs.2,000 crore. Fiscal Deficit = Total Expenditure - Revenue Receipts - Non-debt Capital Receipts. Therefore 2,000 = (Revenue Expenditure + 2,000) - 5,000 - 300. This gives 2,000 = Revenue Expenditure - 3,300, so Revenue Expenditure = Rs.5,300 crore. Option B is correct.'
  },
  EC10Q26: {
    explanation: 'Total expenditure = Revenue Expenditure + Capital Expenditure = Rs.12,000 crore + Rs.4,000 crore = Rs.16,000 crore. Non-debt capital receipts include recovery of loans = Rs.500 crore. Fiscal Deficit = Total Expenditure - Revenue Receipts - Non-debt Capital Receipts = Rs.16,000 crore - Rs.10,000 crore - Rs.500 crore = Rs.5,500 crore. Revenue Deficit = Revenue Expenditure - Revenue Receipts = Rs.12,000 crore - Rs.10,000 crore = Rs.2,000 crore. Option B is correct.'
  },
  EC10Q112: {
    options: ['Rs.700 crore', 'Rs.600 crore', 'Rs.500 crore', 'Rs.0 crore (current FD already exceeds limit)'],
    correct: 0,
    explanation: 'Current Fiscal Deficit = (Revenue Expenditure + Capital Expenditure) - Revenue Receipts - Non-debt Capital Receipts = (Rs.8,500 crore + Rs.2,400 crore) - Rs.7,000 crore - Rs.600 crore = Rs.3,300 crore. The maximum allowed fiscal deficit is Rs.4,000 crore. Additional capital expenditure can increase the deficit by Rs.4,000 crore - Rs.3,300 crore = Rs.700 crore. Option A is correct.'
  },
  EC10Q119: {
    explanation: 'Fiscal Deficit as a percentage of GDP = (Rs.15,87,000 crore / Rs.3,01,75,000 crore) x 100 = 5.26%, approximately 5.3%. Option D is correct.'
  },
  EC10Q137: {
    options: [
      'Revenue Deficit: -Rs.1,500 crore (improves); Fiscal Deficit: no change',
      'Revenue Deficit: -Rs.4,000 crore (improves); Fiscal Deficit: -Rs.2,500 crore (improves)',
      'Revenue Deficit: -Rs.1,500 crore; Fiscal Deficit: -Rs.4,000 crore',
      'Revenue Deficit: +Rs.1,500 crore; Fiscal Deficit: -Rs.1,500 crore'
    ],
    correct: 0,
    explanation: 'Additional income tax is a revenue receipt of Rs.4,000 crore. Food subsidy increases revenue expenditure by Rs.2,500 crore. Loan repayment is capital expenditure of Rs.1,500 crore. Change in Revenue Deficit = +Rs.2,500 crore - Rs.4,000 crore = -Rs.1,500 crore, so revenue deficit improves by Rs.1,500 crore. Change in Fiscal Deficit = total additional expenditure Rs.4,000 crore - additional receipts Rs.4,000 crore = nil. Option A is correct.'
  },
  EC10Q141: {
    options: [
      'Rs.200 crore fiscal deficit',
      'Rs.400 crore deficit',
      'Rs.800 crore - Rs.200 crore = Rs.600 crore deficit',
      'Rs.200 crore surplus'
    ],
    correct: 0,
    explanation: 'Interest payment in Year T+1 on Year T borrowing = Rs.5,000 crore x 8% = Rs.400 crore. A primary surplus of Rs.200 crore means Primary Deficit = -Rs.200 crore. Fiscal Deficit = Primary Deficit + Interest Payments = -Rs.200 crore + Rs.400 crore = Rs.200 crore deficit. Option A is correct.'
  },
  EC10Q161: {
    question: 'Year 1: Fiscal Deficit = Rs.4,000 crore. Year 2 target: Reduce FD/GDP to 3% (GDP = Rs.1,00,000 crore). Government plans to achieve this by increasing revenue by Rs.X crore while increasing expenditure by Rs.1,000 crore. Find X.',
    options: ['Rs.5,000 crore', 'Rs.2,000 crore', 'Rs.4,000 crore', 'Rs.7,000 crore'],
    correct: 1,
    explanation: 'Target fiscal deficit = 3% of Rs.1,00,000 crore = Rs.3,000 crore. Year 2 fiscal deficit = Year 1 FD + increase in expenditure - increase in revenue = Rs.4,000 crore + Rs.1,000 crore - X. Set this equal to Rs.3,000 crore: Rs.5,000 crore - X = Rs.3,000 crore, so X = Rs.2,000 crore. Option B is correct.'
  },
  EC10Q199: {
    explanation: 'Revenue Receipts = tax revenue (Rs.5,000 + Rs.4,000 + Rs.7,000 crore) + non-tax revenue (Rs.1,000 + Rs.500 crore) = Rs.17,500 crore. Revenue Deficit = Revenue Expenditure - Revenue Receipts = Rs.19,000 crore - Rs.17,500 crore = Rs.1,500 crore. Non-debt capital receipts = disinvestment Rs.2,000 crore + recovery of loans Rs.800 crore = Rs.2,800 crore. Fiscal Deficit = (Rs.19,000 crore + Rs.9,300 crore) - Rs.17,500 crore - Rs.2,800 crore = Rs.8,000 crore. Primary Deficit = Rs.8,000 crore - interest Rs.3,500 crore = Rs.4,500 crore. Effective Revenue Deficit = Revenue Deficit - grants for capital formation = Rs.1,500 crore - Rs.1,200 crore = Rs.300 crore. Option B is correct.'
  }
};

let changed = 0;
for (const question of data.questions) {
  const patch = patches[question.id];
  if (!patch) continue;
  Object.assign(question, patch);
  changed += 1;
}

if (changed !== Object.keys(patches).length) {
  throw new Error(`Expected ${Object.keys(patches).length} patches but applied ${changed}`);
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Patched ${changed} EC10 questions`);
