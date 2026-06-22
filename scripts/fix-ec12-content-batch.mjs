import fs from 'node:fs';

const file = 'questions/economics/EC12.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const patches = {
  EC12Q39: {
    correct: 1,
    explanation: '1960 revenue = 5 acres x 8 quintals per acre x ₹200 = ₹8,000. 1970 revenue = 5 acres x 18 quintals per acre x ₹120 = ₹10,800. Revenue therefore rises by ₹2,800 despite the fall in price, because the yield increase more than offsets the lower price. Option B is correct.'
  },
  EC12Q63: {
    correct: 0,
    explanation: 'Using Harrod-Domar, g = (s + aid) / v. Here s = 10%, aid = 5% of GDP, and v = 3. New growth rate = (10% + 5%) / 3 = 15% / 3 = 5%. Option A is correct.'
  },
  EC12Q80: {
    explanation: 'A 36.5% depreciation means one rupee buys 36.5% fewer dollars. New dollar value per rupee = $0.21 x (1 - 0.365) = $0.13335. Therefore 1 USD = 1 / 0.13335 = about ₹7.5. Equivalently, ₹4.76 / 0.635 = about ₹7.49 per USD. Option B is correct.'
  },
  EC12Q83: {
    options: [
      'Breakeven; profit/loss = ₹0',
      'Loss of ₹0 — breakeven exactly',
      'Profit of ₹500 crore',
      'Loss of ₹500 crore'
    ],
    correct: 0,
    explanation: 'Production = 1 million tonnes = 10,00,000 tonnes. Total revenue = 10,00,000 x ₹2,000 = ₹2,000 crore. Variable cost = 10,00,000 x ₹1,500 = ₹1,500 crore. Fixed cost = ₹500 crore, so total cost = ₹2,000 crore. Profit = total revenue - total cost = ₹0. The plant breaks even. Option A is correct.'
  },
  EC12Q91: {
    explanation: 'Nominal increase = ₹97,500 crore / ₹2,356 crore = about 41.4 times. To adjust for inflation, convert Sixth Plan expenditure to 1951 prices: ₹97,500 crore x (100/450) = ₹21,667 crore. Real increase = ₹21,667 crore / ₹2,356 crore = about 9.1 times. Option B is correct.'
  }
};

let changed = 0;
for (const question of data.questions) {
  const patch = patches[question.id];
  if (!patch) continue;

  if (Object.hasOwn(patch, 'correct') && question.correct !== patch.correct && !Object.hasOwn(question, 'correct_content_review_original')) {
    question.correct_content_review_original = question.correct;
  }

  Object.assign(question, patch);
  changed += 1;
}

if (changed !== Object.keys(patches).length) {
  throw new Error(`Expected ${Object.keys(patches).length} patches but applied ${changed}`);
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Patched ${changed} EC12 questions`);
