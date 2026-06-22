import fs from 'node:fs';

const file = 'questions/accountancy/AC15.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const questions = Array.isArray(data) ? data : data.questions;

const updates = {
  AC15Q157: {
    options: ['NP Ratio = 14.25%; ROCE = 28%', 'NP Ratio = 6%; ROCE = 24%', 'NP Ratio = 5.7%; ROCE = 24%', 'NP Ratio = 7.6%; ROCE = 25.33%'],
    explanation: 'Gross profit = Rs.12,00,000. Operating profit = 12,00,000 - 2,40,000 - 1,60,000 = Rs.8,00,000. Profit before tax = 8,00,000 - 80,000 + 40,000 = Rs.7,60,000. Tax = 25% of 7,60,000 = Rs.1,90,000, so net profit = Rs.5,70,000. NP Ratio = 5,70,000/40,00,000 x 100 = 14.25%. PBIT = net profit + tax + interest = 5,70,000 + 1,90,000 + 80,000 = Rs.8,40,000. ROCE = 8,40,000/30,00,000 x 100 = 28%.'
  },
  AC15Q166: {
    options: ['D/E = 0.682; ICR = 3.57 times', 'D/E = 0.682; ICR = 3.5 times', 'D/E = 0.75; ICR = 2.94 times', 'D/E = 0.5; ICR = 4 times'],
    explanation: 'Shareholders funds = Equity Capital + Preference Capital + General Reserve = 12,00,000 + 4,00,000 + 6,00,000 = Rs.22,00,000. Long-term debt = Debentures + Bank Loan = 10,00,000 + 5,00,000 = Rs.15,00,000. D/E = 15,00,000/22,00,000 = 0.682. Interest = 8% of 10,00,000 + 12% of 5,00,000 = Rs.1,40,000. ICR = EBIT/Interest = 5,00,000/1,40,000 = 3.57 times.'
  },
  AC15Q167: {
    explanation: 'Issue of equity shares increases shareholders funds and repayment of long-term debentures reduces long-term debt, so the debt-equity ratio decreases. If the funds raised are used to repay the debentures, current assets rise and then fall by the same amount, so the current ratio is unchanged. Proprietary ratio increases because shareholders funds increase while the debt component falls.'
  },
  AC15Q168: {
    explanation: 'COGS = Revenue x (1 - GP Ratio) = 32,00,000 x 75% = Rs.24,00,000. Average inventory = (4,00,000 + 6,00,000)/2 = Rs.5,00,000. Inventory Turnover Ratio = 24,00,000/5,00,000 = 4.8 times.'
  },
  AC15Q170: {
    options: ['GP = 33.33%; ROCE = 40%; NP = 18.08%', 'GP = 33.33%; ROCE = 50%; NP = 12%', 'GP = 33.33%; ROCE = 40%; NP = 12%', 'GP = 25%; ROCE = 40%; NP = 10.85%'],
    explanation: 'Gross profit = 1/3 of Rs.60,00,000 = Rs.20,00,000, so GP Ratio = 33.33%. Operating profit/EBIT = 20,00,000 - 4,00,000 = Rs.16,00,000. ROCE = 16,00,000/40,00,000 x 100 = 40%. Profit before tax = 16,00,000 - 1,00,000 + 50,000 = Rs.15,50,000. Tax = 30%, so net profit = Rs.10,85,000. NP Ratio = 10,85,000/60,00,000 x 100 = 18.08%.'
  },
  AC15Q172: {
    options: ['40.63%', '48%', '52%', '49%'],
    explanation: 'Net revenue = 50,00,000 - 2,00,000 = Rs.48,00,000. Closing stock owned by the business = 8,00,000 - 1,00,000 = Rs.7,00,000 because consignment goods are excluded. COGS = 6,00,000 + 30,00,000 + 50,000 - 1,00,000 - 7,00,000 = Rs.28,50,000. Gross profit = 48,00,000 - 28,50,000 = Rs.19,50,000. GP Ratio = 19,50,000/48,00,000 x 100 = 40.63%.'
  },
  AC15Q173: {
    options: ['Operating Cycle = 57 days', 'Operating Cycle = 115 days', 'Operating Cycle = 95 days', 'Operating Cycle = 130 days'],
    explanation: 'Inventory holding period = 365/(63,00,000/15,00,000) = 365/4.2 = 87 days. Credit revenue = 85% of Rs.90,00,000 = Rs.76,50,000; receivables collection period = 365/(76,50,000/12,75,000) = 365/6 = 61 days. Payables payment period = 365/(42,00,000/10,50,000) = 365/4 = 91 days. Net operating cycle = 87 + 61 - 91 = 57 days.'
  },
  AC15Q176: {
    options: ['D/E = 0.667:1', 'D/E = 0.769:1', 'D/E = 0.714:1', 'D/E = 0.75:1'],
    explanation: 'Opening shareholders funds are Rs.12,00,000. Half of net profit is transferred to reserve, so shareholders funds increase by Rs.1,00,000 to Rs.13,00,000. Long-term debt becomes Rs.8,00,000 + Rs.2,00,000 = Rs.10,00,000. Debt-equity ratio = 10,00,000/13,00,000 = 0.769:1.'
  },
  AC15Q178: {
    options: ['Avg Debtors = Rs.15,00,000; Avg Creditors = Rs.5,83,333', 'Avg Debtors = Rs.6,00,000; Avg Creditors = Rs.7,00,000', 'Avg Debtors = Rs.9,00,000; Avg Creditors = Rs.7,00,000', 'Avg Debtors = Rs.7,50,000; Avg Creditors = Rs.5,83,333'],
    explanation: 'Since no cash-sales split is given, revenue from operations is treated as credit revenue. Average debtors = Credit Revenue/TRTR = 75,00,000/5 = Rs.15,00,000. Average payment period = 60 days in a 360-day year, so Trade Payables Turnover Ratio = 360/60 = 6 times. Average creditors = Credit Purchases/TPTR = 35,00,000/6 = Rs.5,83,333.'
  },
  AC15Q187: {
    options: ['TATR = 1.5; ROCE = 30%', 'TATR = 1.0; ROCE cannot be determined from the given data', 'TATR = 1.8; ROCE = 30%', 'TATR = 1.5; ROCE = 45%'],
    explanation: 'Long-term debt = 0.6 x shareholders funds = 0.6 x Rs.25,00,000 = Rs.15,00,000. Total assets from the balance-sheet equation = shareholders funds + long-term debt + current liabilities = 25,00,000 + 15,00,000 + 5,00,000 = Rs.45,00,000. Total Assets Turnover Ratio = Revenue/Total Assets = 45,00,000/45,00,000 = 1.0. ROCE requires EBIT, but the question gives NPAT and does not provide interest expense or interest rate; D/E gives debt amount, not interest. Therefore ROCE cannot be determined reliably from the given data.'
  },
  AC15Q189: {
    correct: 1,
    explanation: 'An ICR of 1.5 times means EBIT is only 1.5 times the interest obligation, so financial risk is high. If EBIT falls by 30%, the new ICR = 0.70 x 1.5 = 1.05 times. Interest is still technically covered, but only barely.'
  },
  AC15Q190: {
    options: ['EPS = Rs.3.73; BV = Rs.15; P/E = 12.06; P/B = 3', 'EPS = Rs.37; BV = Rs.15; P/E = 1.22; P/B = 3', 'EPS = Rs.32.3; BV = Rs.10; P/E = 1.39; P/B = 4.5', 'EPS = Rs.40; BV = Rs.15; P/E = 1.125; P/B = 3'],
    explanation: 'Number of equity shares = 10,00,000/10 = 1,00,000 shares. Preference dividend = 9% x 3,00,000 = Rs.27,000. Earnings available for equity shareholders = 4,00,000 - 27,000 = Rs.3,73,000. EPS = 3,73,000/1,00,000 = Rs.3.73. Book value per share = (10,00,000 + 5,00,000)/1,00,000 = Rs.15. P/E Ratio = 45/3.73 = 12.06. Price-to-book ratio = 45/15 = 3.'
  },
  AC15Q191: {
    options: ['GP = 28.5%; OR = 81.5%', 'GP = 32.5%; OR = 80%', 'GP = 25%; OR = 85%', 'GP = 30%; OR = 87.5%'],
    explanation: 'COGS = Opening Stock + Purchases + Direct Wages + Factory Overheads - Closing Stock = 2,80,000 + 25,00,000 + 3,00,000 + 2,00,000 - 4,20,000 = Rs.28,60,000. Gross Profit = 40,00,000 - 28,60,000 = Rs.11,40,000. GP Ratio = 11,40,000/40,00,000 x 100 = 28.5%. Operating Ratio = (COGS + Selling Expenses + Admin Expenses)/Revenue x 100 = (28,60,000 + 2,50,000 + 1,50,000)/40,00,000 x 100 = 81.5%.'
  },
  AC15Q195: {
    options: ['ITR = 5.6; TRTR = 8; TPTR = 7.2', 'ITR = 6; TRTR = 6; TPTR = 6', 'ITR = 5.6; TRTR = 6.4; TPTR = 7.2', 'ITR = 4.8; TRTR = 5.33; TPTR = 6'],
    explanation: 'Average inventory = (8,00,000 + 12,00,000)/2 = Rs.10,00,000, so ITR = 56,00,000/10,00,000 = 5.6 times. Credit revenue = 80% of Rs.80,00,000 = Rs.64,00,000. Average receivables = (7,00,000 + 9,00,000)/2 = Rs.8,00,000, so TRTR = 64,00,000/8,00,000 = 8 times. Average payables = (4,00,000 + 6,00,000)/2 = Rs.5,00,000, so TPTR = 36,00,000/5,00,000 = 7.2 times.'
  },
  AC15Q197: {
    options: ['GP=30%; OP=22%; NP=16.125%; ROCE=36.67%', 'GP=30%; OP=22%; NP=16%; ROCE=36.67%', 'GP=30%; OP=22%; NP=15.375%; ROCE=33.33%', 'GP=30%; OP=22%; NP=14%; ROCE=36.67%'],
    explanation: 'GP Ratio is 30%. Operating expenses are 8% of revenue, so Operating Profit Ratio = 30% - 8% = 22%. EBIT = Rs.22,00,000. ROCE = 22,00,000/60,00,000 x 100 = 36.67%. Profit before tax = 22,00,000 - 2,00,000 + 1,50,000 = Rs.21,50,000. Tax = 25%, so net profit = Rs.16,12,500. NP Ratio = 16,12,500/1,00,00,000 x 100 = 16.125%.'
  },
  AC15Q200: {
    options: [
      'CR=3.25:1; QR=2:1; D/E=0.758:1; PR=0.50; ROCE=31.03%; ITR=9 times; TRTR=10.5 times',
      'CR=2:1; QR=1.25:1; D/E=0.75:1; PR=0.5; ROCE=20%; ITR=9 times; TRTR=10.5 times',
      'CR=2:1; QR=1.5:1; D/E=0.607:1; PR=0.495; ROCE=22.15%; ITR=9 times; TRTR=10.5 times',
      'CR=3:1; QR=1.25:1; D/E=0.607:1; PR=0.495; ROCE=22.15%; ITR=9 times; TRTR=10.5 times'
    ],
    explanation: 'Current assets = Stock + Debtors + Cash = 10 + 8 + 8 = Rs.26L. Current liabilities = 6 + 2 = Rs.8L. Current Ratio = 26/8 = 3.25:1. Quick Ratio = (26 - 10)/8 = 2:1. Shareholders funds = Equity + Reserve + Preference Capital = 20 + 8 + 5 = Rs.33L. Long-term debt = Debentures + Bank Loan = 15 + 10 = Rs.25L. D/E = 25/33 = 0.758:1. Proprietary Ratio = 33/66 = 0.50. Capital employed = shareholders funds + long-term debt = 58L. ROCE = 18/58 x 100 = 31.03%. COGS = 75% of 120L = 90L, so ITR = 90/10 = 9 times. Credit revenue = 70% of 120L = 84L, so TRTR = 84/8 = 10.5 times.'
  }
};

const byId = new Map(questions.map((q) => [q.id, q]));
for (const [id, patch] of Object.entries(updates)) {
  const question = byId.get(id);
  if (!question) throw new Error(`Missing ${id}`);
  if (Object.hasOwn(patch, 'correct') && question.correct !== patch.correct && question.correct_content_review_original === undefined) {
    question.correct_content_review_original = question.correct;
  }
  Object.assign(question, patch);
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Updated ${Object.keys(updates).length} AC15 questions.`);
