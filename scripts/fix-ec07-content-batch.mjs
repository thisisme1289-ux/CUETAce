import fs from 'node:fs';

const file = 'questions/economics/EC07.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const questions = Array.isArray(data) ? data : data.questions;

const updates = {
  EC07Q37: { options: ['Rs.7,700 crore', 'Rs.8,200 crore', 'Rs.8,600 crore', 'Rs.7,200 crore'], correct: 0, explanation: 'GNP_MP = GNP_FC + NIT = 7,500 + 400 = Rs.7,900 crore. GDP_MP = GNP_MP - NFIA = 7,900 - 200 = Rs.7,700 crore. CCA is already included because the given aggregate is gross.' },
  EC07Q38: { explanation: 'Real GDP in Year 2 = (Nominal GDP / GDP Deflator) x 100 = (10,000/125) x 100 = Rs.8,000 crore. Real GDP in Year 1 is Rs.8,000 crore because it is the base year. Therefore, percentage change in real GDP is 0%.' },
  EC07Q69: { explanation: 'Using base-year prices, the change in real GDP is: Good A rises by 20 units x Rs.30 = Rs.600 crore, while Good B falls by 20 units x Rs.40 = Rs.800 crore. Real GDP Year 2 = 10,000 + 600 - 800 = Rs.9,200 crore. GDP Deflator = (9,800/9,200) x 100 = 106.52.' },
  EC07Q70: { options: ['Rs.360', 'Rs.400', 'Rs.375', 'Rs.420'], correct: 2, explanation: 'National Income = NNP_FC = GDP_FC - CCA + NFIA = 40,000 - 2,000 - 500 = Rs.37,500 crore. Per capita National Income = 37,500 crore / 100 crore = Rs.375.' },
  EC07Q71: { options: ['100', '116.7', '110', '120.8'], correct: 3, explanation: 'Nominal GDP Year 2 = 550 x 25 + 110 x 600 = Rs.79,750. Real GDP Year 2 at base prices = 550 x 20 + 110 x 500 = Rs.66,000. GDP Deflator = (79,750/66,000) x 100 = 120.83, approximately 120.8.' },
  EC07Q74: { options: ['Rs.41,900 crore', 'Rs.40,700 crore', 'Rs.39,500 crore', 'Rs.42,000 crore'], correct: 0, explanation: 'GDP_MP = 30,000 + 6,000 + 12,000 - 2,000 = Rs.46,000 crore. GNP_MP = 46,000 + 500 = Rs.46,500 crore. NNP_MP = 46,500 - 1,800 = Rs.44,700 crore. NIT = 3,500 - 700 = Rs.2,800 crore. National Income = NNP_FC = 44,700 - 2,800 = Rs.41,900 crore.' },
  EC07Q85: { options: ['Rs.33,500 crore', 'Rs.31,500 crore', 'Rs.32,700 crore', 'Rs.28,700 crore'], correct: 0, explanation: 'Income method first gives NDP_FC = Compensation of Employees + Operating Surplus + Mixed Income = 15,000 + 10,000 + 5,000 = Rs.30,000 crore. GDP_FC = 30,000 + CCA 2,000 = Rs.32,000 crore. GDP_MP = GDP_FC + NIT = 32,000 + 1,500 = Rs.33,500 crore. NFIA is not used for GDP.' },
  EC07Q86: { options: ['Rs.16,700 crore', 'Rs.5,800 crore', 'Rs.7,200 crore', 'Rs.4,500 crore'], correct: 0, explanation: 'NIT = 5,000 - 1,500 = Rs.3,500 crore. GDP_MP = NI + NIT + CCA - NFIA = 45,000 + 3,500 + 3,000 - (-1,200) = Rs.52,700 crore. Expenditure GDP_MP = PFCE + GFC + GCF + (X-M) = 25,000 + GFC + 12,000 - 1,000 = 36,000 + GFC. Thus GFC = 52,700 - 36,000 = Rs.16,700 crore.' },
  EC07Q95: { options: ['Rs.56,700 crore', 'Rs.55,890 crore', 'Rs.58,879 crore', 'Rs.53,100 crore'], explanation: 'Real GDP in 2021 = 50,000 x 1.05 = Rs.52,500 crore. Real GDP in 2022 = 52,500 x 0.98 = Rs.51,450 crore. The cumulative price index by 2022 is 1.08 x 1.06 = 1.1448. Nominal GDP in 2022 = 51,450 x 1.1448 = Rs.58,879 crore approximately.' },
  EC07Q111: { options: ['Rs.1,25,651 crore', 'Rs.1,76,234 crore', 'Rs.1,40,255 crore', 'Rs.1,33,823 crore'], correct: 0, explanation: 'Nominal GDP in Year 5 = 1,00,000 x (1.12)^5 = Rs.1,76,234 crore. GDP deflator in Year 5 = 100 x (1.07)^5 = 140.26. Real GDP = (1,76,234/140.26) x 100 = about Rs.1,25,651 crore.' },
  EC07Q112: { options: ['Rs.16,200 crore', 'Rs.15,600 crore', 'Rs.16,800 crore', 'Rs.15,000 crore'], correct: 2, explanation: 'Domestic factor income, or NDP_FC, = wages + rent + interest + profit = 8,000 + 2,000 + 1,500 + 3,500 = Rs.15,000 crore. NNP_FC = NDP_FC + NFIA = 15,000 + 600 = Rs.15,600 crore. GNP_FC = NNP_FC + CCA = 15,600 + 1,200 = Rs.16,800 crore.' },
  EC07Q118: { correct: 3, explanation: 'GDP_MP equals the value of the final good, Rs.2,500 crore. GNP_MP = GDP_MP + NFIA = 2,500 + 50 = Rs.2,550 crore. NNP_MP = 2,550 - 100 = Rs.2,450 crore. National Income = NNP_FC = 2,450 - NIT 150 = Rs.2,300 crore.' },
  EC07Q126: { options: ['Rs.32,000', 'Rs.40,000', 'Rs.50,000', 'Rs.320'], correct: 3, explanation: 'Real GDP = (50,000/125) x 100 = Rs.40,000 crore. Real GDP per capita = 40,000 crore / 125 crore persons = Rs.320 per person.' },
  EC07Q141: { options: ['Rs.34,200 crore', 'Rs.33,600 crore', 'Rs.35,000 crore', 'Rs.34,800 crore'], correct: 2, explanation: 'NIT = 3,000 - 800 = Rs.2,200 crore. National Income = GDP_MP - depreciation + NFIA - NIT = 40,000 - 1,500 + 500 - 2,200 = Rs.36,800 crore. Personal Income = 36,800 - 1,200 - 800 - 400 + 600 = Rs.35,000 crore.' },
  EC07Q162: { options: ['Rs.56,300 cr and Rs.52,700 cr', 'Rs.56,300 cr and Rs.51,700 cr', 'Rs.55,500 cr and Rs.51,700 cr', 'Rs.57,500 cr and Rs.53,700 cr'], correct: 0, explanation: 'GDP_MP = PFCE + GFC + GCF + net exports = 40,000 + 5,000 + (12,000 + 800) + (8,000 - 9,500) = Rs.56,300 crore. National Income = GDP_MP + NFIA - CCA - NIT = 56,300 + 1,200 - 2,000 - (4,000 - 1,200) = Rs.52,700 crore.' },
  EC07Q172: { options: ['Rs.25,100 crore', 'Rs.24,100 crore', 'Rs.21,800 crore', 'Rs.26,300 crore'], correct: 2, explanation: 'GFC = Rs.4,000 crore, PFCE = Rs.12,000 crore, and GFCF = Rs.8,000 crore. GCF = GFCF + change in stocks = 8,000 + 200 = Rs.8,200 crore. GDP_MP = 12,000 + 4,000 + 8,200 - 500 = Rs.23,700 crore. National Income = GDP_MP + NFIA - CCA - NIT = 23,700 + 800 - 1,500 - 1,200 = Rs.21,800 crore.' },
  EC07Q176: { options: ['109.8', '109.6', '111.2', '108.4'], correct: 0, explanation: 'Base values are Rs.30,000 crore for Good X and Rs.20,000 crore for Good Y. Current nominal GDP = 30,000 x 1.08 x 1.12 + 20,000 x 0.97 x 1.06 = Rs.56,852 crore. Current real GDP at base prices = 30,000 x 1.08 + 20,000 x 0.97 = Rs.51,800 crore. Deflator = (56,852/51,800) x 100 = 109.75, approximately 109.8.' },
  EC07Q184: { options: ['A > B > C', 'B > C > A', 'C > A > B', 'A > C > B'], correct: 2, explanation: 'National Income = GDP_MP - CCA + NFIA - NIT. Economy A = 10,000 - 1,000 + 500 - 600 = Rs.8,900 crore. Economy B = 10,000 - 500 + 0 - 800 = Rs.8,700 crore. Economy C = 10,000 - 300 - 300 - 400 = Rs.9,000 crore. Ranking is C > A > B.' },
  EC07Q185: { options: ['21.2% growth', '33.3% growth', '14.6% growth', '1.01% growth'], correct: 3, explanation: 'Nominal per capita NI in Year 0 = 30,000/100 = 300. Real NI in Year 4 = (40,000/120) x 100 = Rs.33,333 crore. Real per capita NI in Year 4 = 33,333/110 = 303.03. Real per capita growth = (303.03 - 300)/300 x 100 = 1.01% over 4 years.' }
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
console.log(`Updated ${Object.keys(updates).length} EC07 questions.`);
