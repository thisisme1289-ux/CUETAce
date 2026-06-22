import fs from 'node:fs';

const file = 'questions/economics/EC06.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const patches = {
  EC06Q11: {
    options: [
      '₹8,200 cr',
      '₹8,600 cr',
      '₹7,800 cr',
      '₹9,000 cr'
    ],
    explanation: 'NFIA = residents earning abroad ₹500 cr - foreigners earning in Country X ₹700 cr = -₹200 cr. GNP(MP) = GDP(MP) + NFIA = ₹10,000 cr - ₹200 cr = ₹9,800 cr. NNP(MP) = ₹9,800 cr - depreciation ₹600 cr = ₹9,200 cr. Net indirect taxes = ₹800 cr - ₹200 cr = ₹600 cr. National Income or NNP(FC) = ₹9,200 cr - ₹600 cr = ₹8,600 cr. Option B is correct.'
  },
  EC06Q34: {
    explanation: 'NFIA = GNP(MP) - GDP(MP), so GDP(MP) = GNP(MP) - NFIA = ₹9,000 cr - (-₹300 cr) = ₹9,300 cr. NDP(MP) = GDP(MP) - depreciation = ₹9,300 cr - ₹700 cr = ₹8,600 cr. NDP(FC) = NDP(MP) - net indirect taxes = ₹8,600 cr - ₹400 cr = ₹8,200 cr. Option C is correct.'
  },
  EC06Q46: {
    options: [
      'Net Exports = −₹100 cr; GDP = ₹3,800 cr',
      'Net Exports = −₹100 cr; GDP = ₹3,300 cr',
      'Net Exports = ₹100 cr; GDP = ₹3,900 cr',
      'Net Exports = −₹100 cr; GDP = ₹3,900 cr'
    ],
    explanation: 'Net exports = exports - imports = ₹400 cr - ₹500 cr = -₹100 cr. GDP(MP) by expenditure method = C + G + I + NX = ₹2,000 cr + ₹600 cr + ₹800 cr - ₹100 cr = ₹3,300 cr. Option B is correct.'
  },
  EC06Q96: {
    question: 'An economy has four firms in a production chain:\nFirm 1: Output ₹200, No inputs\nFirm 2: Inputs from Firm 1 = ₹200, Output = ₹300\nFirm 3: Inputs from Firm 2 = ₹300, Output = ₹400\nFirm 4: Inputs from Firm 3 = ₹400, Output = ₹900 (all sold to households)\nGDP using both Final Goods Method and Value Added Method:',
    correct: 0,
    explanation: 'Final Goods Method: only Firm 4 sells to households, so final output = ₹900. Value Added Method: VA1 = ₹200; VA2 = ₹300 - ₹200 = ₹100; VA3 = ₹400 - ₹300 = ₹100; VA4 = ₹900 - ₹400 = ₹500. Total value added = ₹200 + ₹100 + ₹100 + ₹500 = ₹900. Both methods give GDP = ₹900. Option A is correct.'
  },
  EC06Q121: {
    options: [
      '₹1,270',
      '₹1,520',
      '₹1,150',
      '₹1,320'
    ],
    correct: 0,
    explanation: 'Consumption = household spending on food ₹500. Household purchase of bonds is excluded because it is a financial transaction. Government purchase of missiles is included in G = ₹300. Investment = new equipment ₹400 + change in stock ₹50 = ₹450; the second-hand factory is excluded because it is not current production. Net exports = ₹100 - ₹80 = ₹20. GDP(MP) = ₹500 + ₹300 + ₹450 + ₹20 = ₹1,270. Option A is correct.'
  },
  EC06Q138: {
    explanation: 'Nominal GDP = (500 x ₹20) + (1,000 x ₹5) = ₹10,000 + ₹5,000 = ₹15,000. Real GDP at last-year prices = (500 x ₹18) + (1,000 x ₹4) = ₹9,000 + ₹4,000 = ₹13,000. The quantities are unchanged, so there is no real output growth; the nominal increase reflects only higher prices. Option B is correct.'
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
console.log(`Patched ${changed} EC06 questions`);
