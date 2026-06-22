import { readFile, writeFile } from 'node:fs/promises';

const file = 'questions/accountancy/AC15.json';
const data = JSON.parse(await readFile(file, 'utf8'));

const fixes = new Map(Object.entries({
  AC15Q05: {
    options: ['Current Ratio will decrease further', 'Current Ratio will increase', 'Current Ratio will remain unchanged', 'Current Ratio will first decrease then increase'],
    correct: 0,
    explanation: 'When the current ratio is below 1:1, current assets are less than current liabilities. Paying current liabilities from cash reduces both current assets and current liabilities by the same amount, which lowers the ratio further. For example, ₹5,00,000 / ₹6,00,000 = 0.83, but after paying ₹1,00,000 it becomes ₹4,00,000 / ₹5,00,000 = 0.80.'
  },
  AC15Q08: {
    options: ['6.5 times', '6 times', '5.5 times', '5 times'],
    correct: 0,
    explanation: 'Cost of Revenue from Operations = Revenue from Operations - Gross Profit = ₹9,00,000 - ₹2,50,000 = ₹6,50,000. Average Inventory = (₹80,000 + ₹1,20,000) / 2 = ₹1,00,000. Inventory Turnover Ratio = ₹6,50,000 / ₹1,00,000 = 6.5 times.'
  },
  AC15Q10: {
    options: ['0.4:1', '0.7:1', '0.3:1', '0.6:1'],
    correct: 0,
    explanation: 'Debt-Equity Ratio = Long-term Debt / Shareholders’ Funds. Debentures are already included in long-term borrowings, so long-term debt is ₹4,00,000, not ₹7,00,000. Debt-Equity Ratio = ₹4,00,000 / ₹10,00,000 = 0.4:1.'
  },
  AC15Q13: {
    options: ['8 times', '7.5 times', '6 times', '10 times'],
    correct: 2,
    explanation: 'Trade Receivables Turnover Ratio = Net Credit Revenue from Operations / Average Trade Receivables. Net credit revenue is ₹12,00,000. Trade receivables include debtors and bills receivable: ₹1,50,000 + ₹50,000 = ₹2,00,000. Ratio = ₹12,00,000 / ₹2,00,000 = 6 times.'
  },
  AC15Q23: {
    options: ['12 times; 30.4 days', '10 times; 36.5 days', '15 times; 24.3 days', '8 times; 45.6 days'],
    correct: 0,
    explanation: 'Average Trade Payables = (₹80,000 + ₹1,20,000) / 2 = ₹1,00,000. Trade Payables Turnover Ratio = ₹12,00,000 / ₹1,00,000 = 12 times. Average Payment Period = 365 / 12 = 30.4 days.'
  },
  AC15Q26: {
    options: ['D/E = 0.67:1; ICR = 3.65 times', 'D/E = 1:1; ICR = 3.5 times', 'D/E = 0.67:1; ICR = 2.92 times', 'D/E = 0.50:1; ICR = 3.5 times'],
    correct: 0,
    explanation: 'Shareholders’ Funds = ₹10,00,000 + ₹5,00,000 = ₹15,00,000. Long-term Debt = ₹8,00,000 + ₹2,00,000 = ₹10,00,000, so D/E = ₹10,00,000 / ₹15,00,000 = 0.67:1. Only the debenture interest rate is given, so Interest = 12% of ₹8,00,000 = ₹96,000. ICR = EBIT / Interest = ₹3,50,000 / ₹96,000 = 3.65 times.'
  },
  AC15Q30: {
    options: ['GP Ratio = 30%; Operating Ratio = 68%', 'GP Ratio = 30%; Operating Ratio = 82%', 'GP Ratio = 25%; Operating Ratio = 75%', 'GP Ratio = 30%; Operating Ratio = 76.25%'],
    correct: 1,
    explanation: 'Gross Profit Ratio = ₹4,80,000 / ₹16,00,000 x 100 = 30%. Cost of Revenue from Operations = ₹16,00,000 - ₹4,80,000 = ₹11,20,000. Operating Cost = ₹11,20,000 + ₹80,000 + ₹1,20,000 = ₹13,20,000. Interest and tax are excluded from operating ratio. Operating Ratio = ₹13,20,000 / ₹16,00,000 x 100 = 82.5%, approximately 82%.'
  },
  AC15Q35: {
    options: ['ICR = 3.21 times; Strong solvency', 'ICR = 3.46 times; Strong solvency', 'ICR = 3 times; Weak solvency', 'ICR = 2.5 times; Weak solvency'],
    correct: 0,
    explanation: 'Interest on debentures = 10% of ₹10,00,000 = ₹1,00,000. Interest on long-term loan = 8% of ₹5,00,000 = ₹40,000. Total interest = ₹1,40,000. ICR = EBIT / Interest = ₹4,50,000 / ₹1,40,000 = 3.21 times. A ratio above 2 generally indicates comfortable interest coverage.'
  },
  AC15Q37: {
    options: ['0.5:1', '0.4:1', '0.64:1', '0.44:1'],
    correct: 1,
    explanation: 'As stated in the question, preference share capital is treated as equity. Shareholders’ Funds = ₹5,00,000 + ₹2,00,000 + ₹3,00,000 = ₹10,00,000. Long-term debt includes only the 9% debentures of ₹4,00,000. Current liabilities are excluded. Debt-Equity Ratio = ₹4,00,000 / ₹10,00,000 = 0.4:1.'
  },
  AC15Q38: {
    options: ['GP = 30%, NP = 8%, OP = 16%', 'GP = 30%, NP = 8%, OP = 16.67%', 'GP = 30%, NP = 10%, OP = 20%', 'GP = 25%, NP = 8%, OP = 15%'],
    correct: 1,
    explanation: 'Gross Profit = ₹30,00,000 - ₹21,00,000 = ₹9,00,000, so GP Ratio = 30%. Net Profit Ratio = ₹2,40,000 / ₹30,00,000 x 100 = 8%. EBIT = Net Profit after Tax + Tax + Interest = ₹2,40,000 + ₹1,60,000 + ₹1,00,000 = ₹5,00,000. Operating Profit Ratio = ₹5,00,000 / ₹30,00,000 x 100 = 16.67%.'
  },
  AC15Q47: {
    options: ['Inventories = ₹3,00,000; CA = ₹8,00,000', 'Inventories = ₹2,80,000; CA = ₹8,00,000', 'Inventories = ₹3,20,000; CA = ₹8,20,000', 'Inventories = ₹3,00,000; CA = ₹7,80,000'],
    correct: 0,
    explanation: 'Current Assets = Current Ratio x Current Liabilities = 2.5 x ₹3,20,000 = ₹8,00,000. Quick Assets = Quick Ratio x Current Liabilities = 1.5 x ₹3,20,000 = ₹4,80,000. Inventories plus prepaid expenses = ₹8,00,000 - ₹4,80,000 = ₹3,20,000. Inventories = ₹3,20,000 - ₹20,000 = ₹3,00,000.'
  },
  AC15Q48: {
    options: ['8.33 times', '10 times', '7 times', '9.33 times'],
    correct: 0,
    explanation: 'COGS = Inventory Turnover Ratio x Average Inventory = 8 x ₹2,50,000 = ₹20,00,000. Since GP Ratio is 20%, COGS is 80% of revenue, so Revenue from Operations = ₹20,00,000 / 0.80 = ₹25,00,000. Credit revenue is 70% of ₹25,00,000 = ₹17,50,000. Trade Receivables Turnover Ratio = ₹17,50,000 / ₹2,10,000 = 8.33 times.'
  },
  AC15Q51: {
    options: ['TADR = 2:1; ROCE = 32%', 'TADR = 2.5:1; ROCE = 40%', 'TADR = 2:1; ROCE = 40%', 'TADR = 3.33:1; ROCE = 25%'],
    correct: 3,
    explanation: 'Total Assets to Debt Ratio = Total Assets / Long-term Debt = ₹40,00,000 / ₹12,00,000 = 3.33:1. Capital Employed = Total Assets - Current Liabilities = ₹40,00,000 - ₹8,00,000 = ₹32,00,000. ROCE = EBIT / Capital Employed x 100 = ₹8,00,000 / ₹32,00,000 x 100 = 25%.'
  },
  AC15Q53: {
    options: ['18.75%', '16.5%', '12.5%', '14%'],
    correct: 0,
    explanation: 'Operating Cost = 75% of ₹16,00,000 = ₹12,00,000. Operating Profit = ₹16,00,000 - ₹12,00,000 = ₹4,00,000. Net Profit before Tax = ₹4,00,000 + ₹40,000 - ₹20,000 = ₹4,20,000. Net Profit after Tax = ₹4,20,000 - ₹1,20,000 = ₹3,00,000. Net Profit Ratio = ₹3,00,000 / ₹16,00,000 x 100 = 18.75%.'
  },
  AC15Q55: {
    options: ['40%', '37.5%', '36%', '41.67%'],
    correct: 1,
    explanation: 'Net Revenue from Operations = ₹25,00,000 - ₹1,00,000 = ₹24,00,000. Gross Profit = Net Revenue - Cost of Revenue from Operations = ₹24,00,000 - ₹15,00,000 = ₹9,00,000. Gross Profit Ratio = ₹9,00,000 / ₹24,00,000 x 100 = 37.5%.'
  },
  AC15Q60: {
    options: ['ITR = 4.5 times; GP Ratio = 32.5%', 'ITR = 4.5 times; GP Ratio = 17.5%', 'ITR = 5 times; GP Ratio = 20%', 'ITR = 6 times; GP Ratio = 25%'],
    correct: 0,
    explanation: 'COGS = Opening Inventory + Purchases + Freight Inward - Returns Outward - Closing Inventory = ₹5,00,000 + ₹28,00,000 + ₹2,00,000 - ₹1,00,000 - ₹7,00,000 = ₹27,00,000. Average Inventory = (₹5,00,000 + ₹7,00,000) / 2 = ₹6,00,000. ITR = ₹27,00,000 / ₹6,00,000 = 4.5 times. Gross Profit = ₹40,00,000 - ₹27,00,000 = ₹13,00,000, so GP Ratio = 32.5%.'
  },
  AC15Q61: {
    options: ['₹2,25,000', '₹2,00,000', '₹1,25,000', '₹1,00,000'],
    correct: 0,
    explanation: 'COGS = 75% of ₹18,00,000 = ₹13,50,000. Since inventory turnover is based on closing inventory, Closing Inventory = ₹13,50,000 / 6 = ₹2,25,000. Current Ratio gives CA = 3CL and Quick Ratio gives Quick Assets = 2CL. Since Quick Assets = CA - Inventory, 2CL = 3CL - ₹2,25,000. Therefore, Current Liabilities = ₹2,25,000.'
  },
  AC15Q63: {
    options: ['3:1', '2.67:1', '2.5:1', '1.67:1'],
    correct: 0,
    explanation: 'Total Assets = Shareholders’ Funds + Long-term Debt + Current Liabilities = ₹25,00,000 + ₹15,00,000 + ₹5,00,000 = ₹45,00,000. Total Assets to Debt Ratio uses long-term debt as debt, so the ratio = ₹45,00,000 / ₹15,00,000 = 3:1.'
  },
  AC15Q67: {
    options: ['94%', '80%', '87.5%', '75%'],
    correct: 0,
    explanation: 'COGS = Inventory Turnover Ratio x Average Inventory = 5 x ₹4,00,000 = ₹20,00,000. Since GP Ratio is 20%, revenue = ₹20,00,000 / 0.80 = ₹25,00,000. Operating expenses exclude interest, so operating expenses = ₹2,00,000 + ₹1,50,000 = ₹3,50,000. Operating Cost = ₹20,00,000 + ₹3,50,000 = ₹23,50,000. Operating Ratio = ₹23,50,000 / ₹25,00,000 x 100 = 94%.'
  },
  AC15Q75: {
    options: ['5.25%', '12.5%', '10.5%', '15%'],
    correct: 0,
    explanation: 'Gross Profit = 25% of ₹16,00,000 = ₹4,00,000. Operating Profit = ₹4,00,000 - ₹2,00,000 = ₹2,00,000. Net Profit before Tax = ₹2,00,000 - ₹80,000 = ₹1,20,000. Tax = 30% of ₹1,20,000 = ₹36,000. Net Profit after Tax = ₹84,000. Net Profit Ratio = ₹84,000 / ₹16,00,000 x 100 = 5.25%.'
  },
  AC15Q82: {
    options: ['CR = 1.67:1; WCTR = 7.5 times', 'CR = 2.5:1; WCTR = 7.5 times', 'CR = 2:1; WCTR = 6 times', 'CR = 1.5:1; WCTR = 5 times'],
    correct: 0,
    explanation: 'Working Capital = Current Assets - Current Liabilities, so ₹4,80,000 = ₹12,00,000 - Current Liabilities. Current Liabilities = ₹7,20,000. Current Ratio = ₹12,00,000 / ₹7,20,000 = 1.67:1. Working Capital Turnover Ratio = ₹36,00,000 / ₹4,80,000 = 7.5 times.'
  },
  AC15Q83: {
    question: 'Assertion (A): If a company issues bonus shares, its Debt-Equity Ratio will decrease.\nReason (R): Bonus shares do not increase external debt, though total Shareholders’ Funds remain unchanged because reserves are capitalised into share capital.',
    options: ['Both A and R are correct and R is the correct explanation of A', 'Both A and R are correct but R is not the correct explanation of A', 'A is correct but R is incorrect', 'A is incorrect but R is correct'],
    correct: 3,
    explanation: 'A bonus issue converts reserves into share capital. Total Shareholders’ Funds remain unchanged because share capital increases and reserves decrease by the same amount. Since external debt also does not change, the Debt-Equity Ratio remains unchanged. Therefore, the assertion is incorrect, but the reason is correct.'
  },
  AC15Q84: {
    options: ['TRTR = 6 times; TPTR = 6 times', 'TRTR = 8 times; TPTR = 7.5 times', 'TRTR = 6 times; TPTR = 7.5 times', 'TRTR = 8 times; TPTR = 6 times'],
    correct: 0,
    explanation: 'Credit Revenue from Operations = 60% of ₹20,00,000 = ₹12,00,000. TRTR = ₹12,00,000 / ₹2,00,000 = 6 times. Average Trade Payables = (₹1,20,000 + ₹1,80,000) / 2 = ₹1,50,000. TPTR = ₹9,00,000 / ₹1,50,000 = 6 times.'
  },
  AC15Q93: {
    options: ['CR = 2.15:1; QR = 1.23:1; D/E = 0.5:1', 'CR = 2.5:1; QR = 1.5:1; D/E = 0.75:1', 'CR = 1.93:1; QR = 1.24:1; D/E = 1:1', 'CR = 2:1; QR = 1.5:1; D/E = 0.5:1'],
    correct: 0,
    explanation: 'Current Assets = Stock + Debtors + Cash = ₹12 lakh + ₹10 lakh + ₹6 lakh = ₹28 lakh. Current Liabilities = Bank OD + Trade Payables = ₹5 lakh + ₹8 lakh = ₹13 lakh. Current Ratio = 28 / 13 = 2.15:1. Quick Assets = Debtors + Cash = ₹16 lakh, so Quick Ratio = 16 / 13 = 1.23:1. Debt-Equity Ratio = Debentures / Shareholders’ Funds = 15 / (20 + 10) = 0.5:1.'
  },
  AC15Q96: {
    options: ['PR = 0.5; ROCE = 20%; FATR = 1.67', 'PR = 0.5; ROCE = 20%; FATR = 1.875', 'PR = 0.55; ROCE = 20%; FATR = 1.875', 'PR = 0.5; ROCE = 25%; FATR = 1.67'],
    correct: 1,
    explanation: 'Total Assets = Long-term Debt + Shareholders’ Funds + Current Liabilities = ₹20,00,000 + ₹25,00,000 + ₹8,00,000 = ₹53,00,000. Proprietary Ratio = ₹25,00,000 / ₹53,00,000 = 0.47, approximately 0.5. Capital Employed = ₹25,00,000 + ₹20,00,000 = ₹45,00,000. ROCE = ₹9,00,000 / ₹45,00,000 x 100 = 20%. Fixed Assets Turnover Ratio = ₹60,00,000 / ₹32,00,000 = 1.875.'
  }
}));

let changed = 0;
for (const question of data.questions) {
  const fix = fixes.get(question.id);
  if (!fix) continue;
  if (!('correct_content_review_original' in question) && question.correct !== fix.correct) {
    question.correct_content_review_original = question.correct;
  }
  if (fix.question) question.question = fix.question;
  question.options = fix.options;
  question.correct = fix.correct;
  question.explanation = fix.explanation;
  changed += 1;
}

await writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Updated ${changed} AC15 questions in ${file}`);
