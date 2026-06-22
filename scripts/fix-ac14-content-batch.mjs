import fs from 'node:fs';

const file = 'questions/accountancy/AC14.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const patches = {
  AC14Q38: {
    options: ['Rs.2,00,000 and Rs.2,10,000', 'Rs.2,00,000 and Rs.2,30,000', 'Rs.1,60,000 and Rs.1,90,000', 'Rs.1,80,000 and Rs.2,10,000'],
    correct: 0,
    explanation: 'Salary expense on accrual basis = cash paid + closing outstanding salary - opening outstanding salary. Year 1 opening outstanding is assumed nil, so Year 1 expense = Rs.1,80,000 + Rs.20,000 = Rs.2,00,000. Year 2 opening outstanding is the previous year-end outstanding of Rs.20,000, so Year 2 expense = Rs.2,00,000 + Rs.30,000 - Rs.20,000 = Rs.2,10,000. Option A is correct.'
  },
  AC14Q46: {
    correct: 2,
    explanation: 'In a Common-Size Balance Sheet, assets are expressed as percentages of total assets and the liabilities plus shareholders funds side is expressed using the same total. Each side must total 100%. If liabilities percentages total 58% and assets percentages total 42%, both sides cannot be correct simultaneously; there is an arithmetic or base-selection error. Option C is correct.'
  },
  AC14Q102: {
    correct: 0,
    explanation: 'Assertion A is true: Gross Profit percentage can improve even while absolute Gross Profit falls. For example, Year 1 revenue Rs.10 lakh and GP Rs.2 lakh gives GP% of 20%; Year 2 revenue Rs.6 lakh and GP Rs.1.5 lakh gives GP% of 25%, even though GP fell in absolute terms. Reason R is also true and correctly explains the assertion: revenue can fall proportionally more than gross profit, causing GP% to improve. Option A is correct.'
  },
  AC14Q106: {
    options: ['11.6%', '13.6%', '10%', '12.8%'],
    correct: 1,
    explanation: 'Gross Profit = Rs.7,50,000. Operating Profit = Rs.7,50,000 - Rs.2,50,000 = Rs.5,00,000. PBT = Rs.5,00,000 + Rs.50,000 - Rs.1,00,000 = Rs.4,50,000. NPAT = Rs.4,50,000 - Rs.1,10,000 = Rs.3,40,000. NPAT as a percentage of net revenue = Rs.3,40,000 / Rs.25,00,000 x 100 = 13.6%. Option B is correct.'
  },
  AC14Q115: {
    options: ['From 11.55% to 14.28%', 'From 10% to 12%', 'From 8% to 9%', 'From 10.5% to 11.9%'],
    correct: 0,
    explanation: 'Year 1: EBIT = Rs.6L - Rs.2.5L = Rs.3.5L. PBT = Rs.3.5L - Rs.0.5L + Rs.0.3L = Rs.3.3L. Tax at 30% = Rs.0.99L, so NPAT = Rs.2.31L. NPAT% = Rs.2.31L / Rs.20L x 100 = 11.55%. Year 2: EBIT = Rs.8L - Rs.3L = Rs.5L. PBT = Rs.5L - Rs.0.4L + Rs.0.5L = Rs.5.1L. Tax at 30% = Rs.1.53L, so NPAT = Rs.3.57L. NPAT% = Rs.3.57L / Rs.25L x 100 = 14.28%. Option A is correct.'
  },
  AC14Q130: {
    options: ['9.1%', '12.6%', '8.4%', '11.2%'],
    correct: 1,
    explanation: 'Gross Profit = Rs.50,00,000 - Rs.30,00,000 = Rs.20,00,000. EBIT = Rs.20,00,000 - Rs.7,50,000 - Rs.2,50,000 - Rs.2,00,000 = Rs.8,00,000. PBT = Rs.8,00,000 + Rs.2,50,000 - Rs.1,50,000 = Rs.9,00,000. Tax at 30% = Rs.2,70,000. NPAT = Rs.6,30,000. NPAT as a percentage of net revenue from operations = Rs.6,30,000 / Rs.50,00,000 x 100 = 12.6%. Option B is correct.'
  },
  AC14Q143: {
    explanation: 'Year 1 amounts: Fixed Assets = 60% of Rs.20,00,000 = Rs.12,00,000; CWIP = Rs.1,00,000; Investments = Rs.1,00,000; Current Assets = Rs.6,00,000. In Year 2, the Rs.3,00,000 growth in Fixed Assets includes the capitalised CWIP, so Fixed Assets become Rs.15,00,000 and CWIP becomes nil. Investments double to Rs.2,00,000. Current Assets grow by 50% to Rs.9,00,000. Total Assets Year 2 = Rs.15,00,000 + Rs.2,00,000 + Rs.9,00,000 = Rs.26,00,000. Option B is correct.'
  },
  AC14Q162: {
    correct: 0,
    explanation: 'Assertion A is false in common-size profitability terms. Company 1 has NPAT% = Rs.8L / Rs.100L x 100 = 8%, while Company 2 has NPAT% = Rs.14L / Rs.200L x 100 = 7%. Although Company 2 has higher absolute profit, Company 1 is more profitable per rupee of revenue. Reason R is true because it correctly computes and interprets the NPAT percentages. Option A is correct.'
  },
  AC14Q164: {
    explanation: 'Let Year 1 Total Assets be 100. Current Assets are 40 and Non-current Assets are 60. Year 2 Total Assets = 120 after 20% growth. Current Assets grow by 5%, so Year 2 Current Assets = 40 x 1.05 = 42. CA% of Total Assets in Year 2 = 42 / 120 x 100 = 35%. Option B is correct.'
  },
  AC14Q172: {
    explanation: 'The question gives EBIT growth of only 14.3%, so use that stated constraint for the final EBIT percentage. Year 1 EBIT = 18% of Rs.20L = Rs.3.6L. Year 2 EBIT = Rs.3.6L x 1.143 = about Rs.4.11L. Year 2 Revenue = Rs.20L x 1.25 = Rs.25L. Year 2 EBIT common-size percentage = Rs.4.11L / Rs.25L x 100 = about 16.45%, closest to 16.2%. Option B is correct.'
  },
  AC14Q174: {
    options: ['Rs.4,75,000', 'Rs.4,50,000', 'Rs.5,82,500', 'Rs.4,95,000'],
    correct: 2,
    explanation: 'Year 1 Operating Expenses = 14% of Rs.25L = Rs.3.5L. Year 2 Operating Expenses grew by 25%, so they become Rs.3.5L x 1.25 = Rs.4.375L. Year 2 Gross Profit = 34% of Rs.30L = Rs.10.2L. Year 2 EBIT = Rs.10.2L - Rs.4.375L = Rs.5.825L, or Rs.5,82,500. Option C is correct.'
  },
  AC14Q177: {
    options: ['+45%', '+80%', '+40%', '+55%'],
    correct: 1,
    explanation: 'Year 1: GP = Rs.40L - Rs.28L = Rs.12L; EBIT = Rs.12L - Rs.6L = Rs.6L; PBT = Rs.6L - Rs.2L + Rs.1L = Rs.5L; NPAT = Rs.5L - 30% tax = Rs.3.5L. Year 2: Revenue = Rs.48L; COGS = Rs.32.2L; GP = Rs.15.8L; Operating Expenses = Rs.7.8L; EBIT = Rs.8L; Finance Costs = Rs.1L; Other Income = Rs.2L; PBT = Rs.9L; NPAT = Rs.6.3L. Percentage change in NPAT = (Rs.6.3L - Rs.3.5L) / Rs.3.5L x 100 = 80%. Option B is correct.'
  },
  AC14Q194: {
    options: ['CR = 2.17; Inventory % of CA = 30%', 'CR = 1.83; Inventory % of CA = 30%', 'CR = 2.5; Inventory % of CA = 25%', 'CR = 2; Inventory % of CA = 35%'],
    correct: 0,
    explanation: 'Year 1 Current Assets = Current Ratio x Current Liabilities = 2 x Rs.5L = Rs.10L. Year 2 Current Liabilities = Rs.5L x 1.20 = Rs.6L. Year 2 Current Assets = Rs.10L + Rs.3L = Rs.13L. Current Ratio Year 2 = Rs.13L / Rs.6L = 2.17 approximately. The question directly states Year 2 inventory is 30% of Current Assets. Option A is correct.'
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
console.log(`Patched ${changed} AC14 questions`);
