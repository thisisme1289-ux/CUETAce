import { readFile, writeFile } from 'node:fs/promises';

const file = 'questions/accountancy/AC13.json';
const data = JSON.parse(await readFile(file, 'utf8'));

const fixes = new Map(Object.entries({
  AC13Q04: {
    options: ['Rs.6,50,000', 'Rs.6,00,000', 'Rs.5,00,000', 'Rs.4,70,000'],
    correct: 0,
    explanation: 'General Reserve closing balance = Rs.2,00,000 + Rs.50,000 = Rs.2,50,000. Under Schedule III, proposed dividend is not deducted as a liability until approved. Surplus = opening surplus Rs.1,50,000 + net profit Rs.3,00,000 - transfer to General Reserve Rs.50,000 = Rs.4,00,000. Total Reserves and Surplus = Rs.2,50,000 + Rs.4,00,000 = Rs.6,50,000.'
  },
  AC13Q10: {
    explanation: 'Non-current liabilities include the long-term bank loan repayable after 3 years: Rs.5,00,000. Current liabilities include current maturity of long-term debt Rs.1,00,000, short-term bank overdraft Rs.75,000, trade payables Rs.1,25,000, and provision for tax Rs.50,000. Total current liabilities = Rs.3,50,000.'
  },
  AC13Q23: {
    explanation: 'Closing debtors after bad debts = Rs.5,00,000 - Rs.20,000 = Rs.4,80,000. Fresh provision for doubtful debts = 5% of Rs.4,80,000 = Rs.24,000. Net Trade Receivables shown in the Balance Sheet = Rs.4,80,000 - Rs.24,000 = Rs.4,56,000.'
  },
  AC13Q25: {
    explanation: 'Long-term borrowings include items repayable after 12 months: unsecured loan after 36 months Rs.5,00,000, term loan Rs.8,00,000, and debentures due in 3 years Rs.3,00,000. Total long-term borrowings = Rs.16,00,000. Short-term borrowings include unsecured loan due within 12 months Rs.2,00,000 and cash credit Rs.1,50,000, totaling Rs.3,50,000.'
  },
  AC13Q57: {
    options: ['Decrease by Rs.1,65,000', 'Decrease by Rs.3,65,000', 'Decrease by Rs.1,45,000', 'Decrease by Rs.3,50,000'],
    correct: 0,
    explanation: 'Depreciation reduces profit by Rs.1,20,000. Provision for doubtful debts = 2% of Rs.10,00,000 = Rs.20,000, reducing profit. Outstanding salaries reduce profit by Rs.40,000. Prepaid insurance of Rs.15,000 reduces expense and increases profit. Net effect = Rs.1,20,000 + Rs.20,000 + Rs.40,000 - Rs.15,000 = Rs.1,65,000 decrease.'
  },
  AC13Q63: {
    correct: 0,
    explanation: 'Changes in inventories of finished goods and WIP = opening inventories - closing inventories. Opening WIP plus finished goods = Rs.1,50,000 + Rs.3,00,000 = Rs.4,50,000. Closing WIP plus finished goods = Rs.2,00,000 + Rs.2,50,000 = Rs.4,50,000. Change = Rs.0.'
  },
  AC13Q67: {
    options: ['Rs.3,39,500', 'Rs.3,00,000', 'Rs.3,50,000', 'Rs.2,80,000'],
    correct: 0,
    explanation: 'Interest on capital is not applicable to a company. Closing stationery stock reduces expense and increases profit by Rs.5,000. Depreciation on furniture = 10% of Rs.2,00,000 = Rs.20,000. Profit before tax = Rs.5,00,000 + Rs.5,000 - Rs.20,000 = Rs.4,85,000. Tax at 30% = Rs.1,45,500. PAT = Rs.3,39,500.'
  },
  AC13Q73: {
    options: ['Rs.12,00,000', 'Rs.32,00,000', 'Rs.48,00,000', 'Rs.80,00,000'],
    correct: 1,
    explanation: 'Debt is Rs.16,00,000 and Debt:Equity = 1:2, so Shareholders Funds = Rs.32,00,000. Total assets of Rs.80,00,000 are financed by shareholders funds, long-term debt, and current liabilities. Current liabilities = Rs.80,00,000 - Rs.32,00,000 - Rs.16,00,000 = Rs.32,00,000.'
  },
  AC13Q83: {
    options: ['Rs.5,72,000', 'Rs.6,80,000', 'Rs.5,80,000', 'Rs.6,52,000'],
    correct: 0,
    explanation: 'Transfer to Debenture Redemption Reserve is separate from General Reserve. Voluntary transfer to General Reserve = 10% of profit after DRR transfer = 10% of (Rs.8,00,000 - Rs.80,000) = Rs.72,000. Closing General Reserve = opening Rs.5,00,000 + transfer Rs.72,000 = Rs.5,72,000. Interim dividend affects surplus, not General Reserve.'
  },
  AC13Q92: {
    correct: 1,
    explanation: 'Total assets = non-current assets Rs.40,00,000 + current assets Rs.20,00,000 = Rs.60,00,000. Current liabilities = total assets - shareholders funds - non-current liabilities = Rs.60,00,000 - Rs.30,00,000 - Rs.15,00,000 = Rs.15,00,000. Current ratio = Rs.20,00,000 / Rs.15,00,000 = 1.33.'
  },
  AC13Q119: {
    explanation: 'Total revenue = revenue from operations Rs.40,00,000 + other income Rs.1,00,000 = Rs.41,00,000. Total expenses = Rs.18,00,000 - Rs.2,00,000 + Rs.6,00,000 + Rs.2,50,000 + Rs.1,50,000 + Rs.3,00,000 = Rs.29,00,000. PBT = Rs.12,00,000. Tax at 30% = Rs.3,60,000. PAT = Rs.8,40,000.'
  },
  AC13Q126: {
    correct: 3,
    explanation: 'Total expenses below gross profit are office salaries Rs.2,00,000, selling commission Rs.1,00,000, bad debts Rs.30,000, office depreciation Rs.50,000, factory machinery depreciation Rs.80,000, finance cost Rs.70,000, audit fees Rs.20,000, and loss on sale Rs.15,000. Total = Rs.4,65,000. PBT = Rs.15,00,000 - Rs.4,65,000 = Rs.10,35,000.'
  },
  AC13Q130: {
    correct: 1,
    explanation: 'Salaries are employee benefit expenses, not Other Expenses. Rent expense = Rs.1,20,000 - prepaid rent Rs.15,000 = Rs.1,05,000. Electricity = Rs.60,000. Insurance expense for 9 expired months = Rs.36,000 x 9/12 = Rs.27,000. Other Expenses = Rs.1,05,000 + Rs.60,000 + Rs.27,000 = Rs.1,92,000.'
  },
  AC13Q154: {
    options: ['Net profit earned during the year', 'Dividend paid during the year', 'Purchase of fixed asset on credit', 'Issue of shares for cash'],
    correct: 2,
    explanation: 'Purchase of a fixed asset on credit increases assets and liabilities by the same amount. It does not affect Shareholders Funds. Net profit increases surplus, dividend paid reduces surplus, and issue of shares for cash increases share capital.'
  },
  AC13Q157: {
    options: ['0.40', '0.30', '0.53', '0.62'],
    correct: 1,
    explanation: 'Debt is the long-term borrowing represented by 9% Debentures = Rs.8,00,000. Shareholders Funds include equity share capital Rs.15,00,000, preference share capital Rs.5,00,000, general reserve Rs.4,00,000, and surplus Rs.3,00,000, totaling Rs.27,00,000. Debt-to-equity ratio = 8,00,000 / 27,00,000 = 0.30 approximately.'
  },
  AC13Q163: {
    options: ['Acc. Dep. Rs.5,00,000; Loss Rs.95,000', 'Acc. Dep. Rs.4,75,000; Loss Rs.20,000', 'Acc. Dep. Rs.5,25,000; Loss Rs.20,000', 'Acc. Dep. Rs.4,25,000; Profit Rs.30,000'],
    correct: 0,
    explanation: 'For the remaining machinery of Rs.20,00,000 purchased on 1 October 2022, accumulated depreciation to 31 March 2025 is Rs.1,00,000 for 2022-23 plus Rs.2,00,000 for 2023-24 plus Rs.2,00,000 for 2024-25 = Rs.5,00,000. The sold machine cost Rs.5,00,000 and accumulated depreciation to 30 September 2024 is Rs.1,25,000, so WDV is Rs.3,75,000. Sale value Rs.2,80,000 gives loss Rs.95,000.'
  },
  AC13Q172: {
    options: ['Rs.10.85', 'Rs.11.10', 'Rs.12.25', 'Rs.11.00'],
    correct: 1,
    explanation: 'PBT = Rs.1,05,00,000 - Rs.88,00,000 = Rs.17,00,000. Tax at 30% = Rs.5,10,000, so PAT = Rs.11,90,000. Preference dividend = 8% of Rs.10,00,000 = Rs.80,000. Profit attributable to equity shareholders = Rs.11,10,000. Basic EPS = Rs.11,10,000 / 1,00,000 = Rs.11.10.'
  },
  AC13Q174: {
    options: ['Rs.1,00,000', 'Rs.68,267', 'Rs.82,800', 'Rs.51,200'],
    correct: 1,
    explanation: 'WDV after four years at 20% = Rs.10,00,000 x 0.8^4 = Rs.4,09,600. On 1 April 2024, remaining useful life is 10 - 4 = 6 years. SLM depreciation for 2024-25 = Rs.4,09,600 / 6 = Rs.68,267 approximately.'
  },
  AC13Q176: {
    explanation: 'Drawings is not applicable to a company. Treating the given net profit as before tax because income tax paid is separately provided, PAT = Rs.8,00,000 - Rs.2,50,000 = Rs.5,50,000. Closing Shareholders Funds = opening Rs.30,00,000 + additional capital Rs.5,00,000 + PAT Rs.5,50,000 - dividend Rs.1,50,000 = Rs.39,00,000.'
  },
  AC13Q185: {
    correct: 2,
    explanation: 'PBT = revenue Rs.1,20,00,000 + exceptional gain Rs.20,00,000 - expenses Rs.90,00,000 = Rs.50,00,000. Current tax at 30% is Rs.15,00,000. Adding DTL created Rs.1,00,000 gives total tax expense Rs.16,00,000. PAT = Rs.34,00,000. Total Comprehensive Income = PAT Rs.34,00,000 + OCI actuarial gain Rs.50,000 = Rs.34,50,000.'
  },
  AC13Q195: {
    options: ['Rs.6,50,000', 'Rs.5,50,000', 'Rs.5,00,000', 'Rs.9,00,000'],
    correct: 0,
    explanation: 'Opening P&L debit balance is an accumulated loss of Rs.3,00,000. Closing surplus = -Rs.3,00,000 + net profit Rs.4,50,000 - transfer to General Reserve Rs.50,000 = Rs.1,00,000. General Reserve closing = Rs.5,00,000 + Rs.50,000 = Rs.5,50,000. Total Reserves and Surplus = Rs.5,50,000 + Rs.1,00,000 = Rs.6,50,000.'
  },
  AC13Q200: {
    options: ['Assets Rs.60,00,000; Equity and Liabilities Rs.64,00,000; does not balance', 'Balance Sheet total Rs.60,00,000; balances', 'Balance Sheet total Rs.57,00,000; balances', 'Balance Sheet total Rs.65,00,000; does not balance'],
    correct: 0,
    explanation: 'Assets total = fixed assets Rs.40,00,000 + investments Rs.6,00,000 + debtors Rs.8,00,000 + stock Rs.5,00,000 + cash Rs.1,00,000 = Rs.60,00,000. Equity and liabilities total = share capital Rs.30,00,000 + general reserve Rs.5,00,000 + opening P&L Rs.2,00,000 + net profit Rs.5,00,000 + debentures Rs.10,00,000 + bank loan Rs.8,00,000 + trade payables Rs.4,00,000 = Rs.64,00,000. The supplied data does not balance.'
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
console.log(`Updated ${changed} AC13 questions in ${file}`);
