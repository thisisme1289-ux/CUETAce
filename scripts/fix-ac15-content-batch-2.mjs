import { readFile, writeFile } from 'node:fs/promises';

const file = 'questions/accountancy/AC15.json';
const data = JSON.parse(await readFile(file, 'utf8'));

const fixes = new Map(Object.entries({
  AC15Q100: {
    options: ['CR=3.4; D/E=0.5; ITR=5.25; GP ratio=30%', 'CR=2; D/E=0.6; ITR=5; GP ratio=30%', 'CR=1.93; D/E=0.6; ITR=5; GP ratio=30%', 'CR=1.93; D/E=0.5; ITR=6; GP ratio=30%'],
    correct: 0,
    explanation: 'Current Assets = stock ₹4,00,000 + debtors ₹3,00,000 + cash ₹1,50,000 = ₹8,50,000. Current Liabilities = trade payables ₹2,00,000 + outstanding wages ₹50,000 = ₹2,50,000, so Current Ratio = 3.4:1. Debt-Equity Ratio = debentures ₹6,00,000 / shareholders’ funds ₹12,00,000 = 0.5:1. COGS = ₹30,00,000 - ₹9,00,000 = ₹21,00,000, so ITR = ₹21,00,000 / ₹4,00,000 = 5.25 times. GP Ratio = ₹9,00,000 / ₹30,00,000 x 100 = 30%.'
  },
  AC15Q101: {
    options: ['ICR = 5 times; NP Ratio = 12%', 'ICR = 5 times; NP Ratio = 15%', 'ICR = 4 times; NP Ratio = 12%', 'ICR = 5 times; NP Ratio = 20%'],
    correct: 0,
    explanation: 'Interest Coverage Ratio = EBIT / Interest = ₹8,00,000 / ₹1,60,000 = 5 times. Profit before tax = ₹8,00,000 - ₹1,60,000 = ₹6,40,000. Tax at 25% = ₹1,60,000, so profit after tax = ₹4,80,000. Net Profit Ratio = ₹4,80,000 / ₹40,00,000 x 100 = 12%.'
  },
  AC15Q104: {
    options: ['Inventory = ₹2,50,000; Analyst concern partially valid', 'Inventory = ₹4,00,000; Analyst concern valid', 'Inventory = ₹2,50,000; Analyst concern not valid', 'Inventory = ₹3,57,143; Analyst concern not valid'],
    correct: 1,
    explanation: 'Current Assets - Current Liabilities = ₹5,00,000 and Current Ratio = 3.5:1. Therefore, 3.5CL - CL = ₹5,00,000, so CL = ₹2,00,000 and CA = ₹7,00,000. Quick Assets = 1.5 x ₹2,00,000 = ₹3,00,000. Inventory = ₹7,00,000 - ₹3,00,000 = ₹4,00,000. Inventory is a large share of current assets, so the concern is valid.'
  },
  AC15Q109: {
    options: ['GP = 30%; NP = 14%; OR = 80%', 'GP = 30%; NP = 15.33%; OR = 80%', 'GP = 30%; NP = 13%; OR = 77%', 'GP = 29%; NP = 13%; OR = 80%'],
    correct: 0,
    explanation: 'Gross Profit = ₹45,00,000 - ₹31,50,000 = ₹13,50,000, so GP Ratio = 30%. Operating Cost = COGS ₹31,50,000 + operating expenses ₹4,50,000 = ₹36,00,000, so Operating Ratio = 80%. Net Profit = ₹13,50,000 - ₹4,50,000 - ₹90,000 - ₹1,80,000 = ₹6,30,000. Net Profit Ratio = ₹6,30,000 / ₹45,00,000 x 100 = 14%.'
  },
  AC15Q111: {
    options: ['QR = 1.4:1; Largest component = Debtors', 'QR = 1.6:1; Largest component = Debtors', 'QR = 1.4:1; Largest component = Cash', 'QR = 1.2:1; Largest component = Debtors'],
    correct: 1,
    explanation: 'Current Assets = 2.4 x ₹2,50,000 = ₹6,00,000. Quick Assets = ₹6,00,000 - stock ₹1,80,000 - prepaid insurance ₹20,000 = ₹4,00,000. Quick Ratio = ₹4,00,000 / ₹2,50,000 = 1.6:1. Cash is ₹60,000, so the remaining quick asset balance of ₹3,40,000 is debtors, the largest component.'
  },
  AC15Q115: {
    options: ['COGS from purchases = ₹23,00,000; implied GP Ratio = 42.5%; Inconsistency exists', 'COGS from purchases = ₹25,00,000; GP Ratio = 37.5%; Inconsistency exists', 'COGS from purchases = ₹30,00,000; GP Ratio = 25%; Consistent', 'COGS from purchases = ₹29,00,000; GP Ratio = 27.5%; Consistent'],
    correct: 0,
    explanation: 'COGS from purchases = opening inventory ₹4,00,000 + purchases ₹24,00,000 + carriage inward ₹1,00,000 - closing inventory ₹6,00,000 = ₹23,00,000. On revenue of ₹40,00,000, this implies GP = ₹17,00,000 and GP Ratio = 42.5%. This does not match the stated GP Ratio of 25%, so the data is inconsistent.'
  },
  AC15Q118: {
    options: ['Operating Expenses = ₹5,60,000; Claim is valid', 'Operating Expenses = ₹3,20,000; Claim is invalid', 'Operating Expenses = ₹8,00,000; Claim is valid', 'Operating Expenses = ₹5,60,000; Claim is invalid'],
    correct: 1,
    explanation: 'COGS = 75% of ₹32,00,000 = ₹24,00,000. Operating Cost = 85% of ₹32,00,000 = ₹27,20,000. Operating Expenses = ₹27,20,000 - ₹24,00,000 = ₹3,20,000. This is 10% of revenue, so the manager’s claim of excessive operating expenses is not supported by the given data.'
  },
  AC15Q119: {
    options: ['3.53 times', '4 times', '2.4 times', '5 times'],
    correct: 0,
    explanation: 'Interest on 12% debentures = ₹1,20,000 and interest on 10% long-term loan = ₹50,000. Total interest = ₹1,70,000. Interest Coverage Ratio = EBIT / Interest = ₹6,00,000 / ₹1,70,000 = 3.53 times approximately.'
  },
  AC15Q121: {
    options: ['66.67 days', '40 days', '36 days', '45 days'],
    correct: 0,
    explanation: 'Credit revenue = 75% of ₹36,00,000 = ₹27,00,000. Average trade receivables = [(₹3,00,000 + ₹80,000) + (₹5,00,000 + ₹1,20,000)] / 2 = ₹5,00,000. Trade Receivables Turnover Ratio = ₹27,00,000 / ₹5,00,000 = 5.4 times. Average Collection Period = 360 / 5.4 = 66.67 days.'
  },
  AC15Q123: {
    options: ['GP = 30%; OP = 22.5%', 'GP = 30%; OP = 20.83%', 'GP = 25%; OP = 22.5%', 'GP = 30%; OP = 18%'],
    correct: 1,
    explanation: 'Gross Profit = ₹36,00,000 - ₹25,20,000 = ₹10,80,000, so GP Ratio = 30%. Net profit before tax = ₹5,40,000 / 0.75 = ₹7,20,000. Since NPBT = Operating Profit + non-operating income - non-operating expenses, Operating Profit = ₹7,20,000 - ₹60,000 + ₹90,000 = ₹7,50,000. Operating Profit Ratio = ₹7,50,000 / ₹36,00,000 x 100 = 20.83%.'
  },
  AC15Q124: {
    options: ['₹28,57,143', '₹20,00,000', '₹25,00,000', '₹30,00,000'],
    correct: 0,
    explanation: 'Current Assets = 2.5 x ₹4,00,000 = ₹10,00,000. Quick Assets = 1.5 x ₹4,00,000 = ₹6,00,000. Inventory = ₹4,00,000. With inventory turnover of 5 times, COGS = 5 x ₹4,00,000 = ₹20,00,000. Since GP Ratio is 30%, COGS is 70% of revenue. Revenue = ₹20,00,000 / 0.70 = ₹28,57,143 approximately.'
  },
  AC15Q125: {
    options: ['41.67%', '25%', '30%', '28%'],
    correct: 0,
    explanation: 'COGS = opening inventory ₹3,00,000 + net purchases ₹22,00,000 + carriage on purchases ₹1,00,000 - closing inventory ₹5,00,000 = ₹21,00,000. Gross Profit = ₹36,00,000 - ₹21,00,000 = ₹15,00,000. Gross Profit Ratio = ₹15,00,000 / ₹36,00,000 x 100 = 41.67%.'
  },
  AC15Q127: {
    options: ['TRTR = 7.2 times; TPTR = 7.67 times', 'TRTR = 8 times; TPTR = 8 times', 'TRTR = 7.2 times; TPTR = 6.4 times', 'TRTR = 6 times; TPTR = 8 times'],
    correct: 0,
    explanation: 'Credit revenue = 60% of ₹50,00,000 = ₹30,00,000. TRTR = ₹30,00,000 / ₹4,16,667 = 7.2 times. Credit purchases = 80% of ₹30,00,000 = ₹24,00,000. After purchase returns of ₹1,00,000, net credit purchases = ₹23,00,000. Average creditors = (₹2,50,000 + ₹3,50,000) / 2 = ₹3,00,000. TPTR = ₹23,00,000 / ₹3,00,000 = 7.67 times.'
  },
  AC15Q129: {
    options: ['D/E = 0.625:1; ICR = 2.82 times', 'D/E = 0.625:1; ICR = 4 times', 'D/E = 0.5:1; ICR = 3.2 times', 'D/E = 0.75:1; ICR = 3.2 times'],
    correct: 0,
    explanation: 'Shareholders’ Funds = equity ₹30,00,000 + preference share capital ₹10,00,000 + general reserve ₹8,00,000 = ₹48,00,000. Long-term debt = debentures ₹20,00,000 + bank loan ₹10,00,000 = ₹30,00,000. D/E = 30/48 = 0.625:1. Interest = 12% of ₹20,00,000 + 10% of ₹10,00,000 = ₹3,40,000. ICR = ₹9,60,000 / ₹3,40,000 = 2.82 times.'
  },
  AC15Q138: {
    options: ['15 days', '45 days', '72 days', '81 days'],
    correct: 0,
    explanation: 'Inventory holding period = 360 / 8 = 45 days. Average collection period = 360 / 6 = 60 days. Average payment period = 360 / 4 = 90 days. Cash Operating Cycle = 45 + 60 - 90 = 15 days.'
  },
  AC15Q144: {
    options: ['10.17%', '11.67%', '8.5%', '12%'],
    correct: 2,
    explanation: 'Gross Profit = 1/5 of ₹60,00,000 = ₹12,00,000. Operating expenses including depreciation = ₹3,00,000 + ₹1,50,000 = ₹4,50,000. Operating Profit = ₹7,50,000. Net Profit before tax = ₹7,50,000 + ₹80,000 - ₹1,20,000 = ₹7,10,000. Net Profit after tax = ₹7,10,000 - ₹2,00,000 = ₹5,10,000. Net Profit Ratio = ₹5,10,000 / ₹60,00,000 x 100 = 8.5%.'
  },
  AC15Q146: {
    options: ['Debtors = ₹5,25,000; BR = ₹1,75,000; Inventory = ₹6,00,000', 'Debtors = ₹3,00,000; BR = ₹1,00,000; Inventory = ₹4,00,000', 'Debtors = ₹4,50,000; BR = ₹1,50,000; Inventory = ₹5,00,000', 'Debtors = ₹6,00,000; BR = ₹2,00,000; Inventory = ₹4,00,000'],
    correct: 0,
    explanation: 'Current Assets = 3.5 x ₹4,00,000 = ₹14,00,000. Quick Assets = 2 x ₹4,00,000 = ₹8,00,000. Inventory = ₹14,00,000 - ₹8,00,000 = ₹6,00,000. Quick Assets include cash, debtors and bills receivable, so debtors + bills receivable = ₹8,00,000 - ₹1,00,000 = ₹7,00,000. In the 3:1 ratio, debtors = ₹5,25,000 and bills receivable = ₹1,75,000.'
  },
  AC15Q148: {
    options: ['GP = 30%; NP = 13.75%; ROCE = 32%; Above industry average', 'GP = 30%; NP = 10%; ROCE = 24%; Above industry average', 'GP = 30%; NP = 8.75%; ROCE = 20%; At industry average', 'GP = 25%; NP = 8.75%; ROCE = 24%; Above industry average'],
    correct: 0,
    explanation: 'Gross Profit Ratio is given as 30%. Gross Profit = 30% of ₹40,00,000 = ₹12,00,000. Operating Profit/EBIT = ₹12,00,000 - ₹4,00,000 = ₹8,00,000. ROCE = ₹8,00,000 / ₹25,00,000 x 100 = 32%, above the 20% industry average. Net Profit after tax = ₹8,00,000 - ₹1,00,000 - ₹1,50,000 = ₹5,50,000. Net Profit Ratio = ₹5,50,000 / ₹40,00,000 x 100 = 13.75%.'
  },
  AC15Q150: {
    options: ['PR = 0.531; D/E = 0.588', 'PR = 0.55; D/E = 0.6', 'PR = 0.4; D/E = 0.75', 'PR = 0.531; D/E = 0.625'],
    correct: 0,
    explanation: 'Shareholders’ Funds = equity ₹8,00,000 + preference ₹4,00,000 + capital reserve ₹2,00,000 + revenue reserve ₹3,00,000 = ₹17,00,000. Using the balance-sheet funding side, total assets = shareholders’ funds ₹17,00,000 + debentures ₹10,00,000 + current liabilities ₹5,00,000 = ₹32,00,000. Proprietary Ratio = 17/32 = 0.531. Debt-Equity Ratio = debentures ₹10,00,000 / shareholders’ funds ₹17,00,000 = 0.588.'
  },
  AC15Q151: {
    options: ['CA = ₹20,00,000; QR = 1.625:1; Cash = ₹8,00,000', 'CA = ₹20,00,000; QR = 1.5:1; Cash = ₹7,00,000', 'CA = ₹20,00,000; QR = 1.625:1; Cash = ₹7,00,000', 'CA = ₹16,00,000; QR = 1.5:1; Cash = ₹5,00,000'],
    correct: 0,
    explanation: 'Current Assets = 2.5 x ₹8,00,000 = ₹20,00,000. Quick Assets = ₹20,00,000 - inventories ₹6,00,000 - prepaid expenses ₹1,00,000 = ₹13,00,000. Quick Ratio = ₹13,00,000 / ₹8,00,000 = 1.625:1. Cash and bank balance = quick assets ₹13,00,000 - sundry debtors ₹5,00,000 = ₹8,00,000.'
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
console.log(`Updated ${changed} AC15 questions in ${file}`);
