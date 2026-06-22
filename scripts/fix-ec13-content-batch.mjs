import fs from 'node:fs';

const file = 'questions/economics/EC13.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const patches = {
  EC13Q15: {
    correct: 0,
    explanation: 'The annual saving to the government exchequer is the avoided budget subsidy once losses are eliminated. The enterprise previously required ₹800 crore per year to cover losses, so eliminating those losses saves ₹800 crore per year. The sale proceeds of ₹3,500 crore are a one-time disinvestment receipt, and no interest rate on those proceeds is given in the question. Option A is correct.'
  },
  EC13Q47: {
    options: [
      'ERP = 50%',
      'ERP = 125%',
      'ERP = 83.3%',
      'ERP = 100%'
    ],
    explanation: 'Value added at world prices = output price ₹100 - input cost ₹40 = ₹60. With a 50% output tariff, domestic output price = ₹150. With 0% input tariff, domestic input cost remains ₹40. Value added at domestic prices = ₹150 - ₹40 = ₹110. ERP = (₹110 - ₹60) / ₹60 x 100 = 83.3%. Option C is correct.'
  },
  EC13Q94: {
    options: [
      'CS gain = ₹5,750; PS loss = ₹4,500; Net gain = ₹1,250',
      'CS gain = ₹3,000; PS loss = ₹1,000; Net gain = ₹2,000',
      'CS gain = ₹2,500; PS loss = ₹2,500; Net gain = ₹0',
      'CS gain = ₹4,000; PS loss = ₹500; Net gain = ₹3,500'
    ],
    correct: 0,
    explanation: 'Price falls by ₹50. Consumer surplus gain is the trapezium under demand: ₹50 x (100 + 130) / 2 = ₹5,750. Producer surplus loss is the trapezium over supply: ₹50 x (100 + 80) / 2 = ₹4,500. Net welfare gain = ₹5,750 - ₹4,500 = ₹1,250. Option A is correct.'
  },
  EC13Q106: {
    explanation: 'Revenue increases by ₹20,000 per acre and costs rise by ₹15,000 per acre. Net change in profit = ₹20,000 - ₹15,000 = ₹5,000 per acre. The earlier seed cost is background information; the relevant comparison is the increase in revenue against the increase in cost. Option B is correct.'
  },
  EC13Q143: {
    correct: 1,
    explanation: 'Regulatory capture means a regulator created to protect public interest gradually begins to reflect the priorities of the firms it regulates. In privatised sectors, this can occur through industry lobbying, information asymmetry, post-regulatory employment incentives, and complex rule interpretation. The risk is weaker competition, softer enforcement, and outcomes that favour regulated firms over consumers. Option B is correct.'
  },
  EC13Q156: {
    options: [
      'Import volume increases by 82.5%',
      'Import volume increases by 48.5%',
      'Import volume increases by 165%',
      'Import volume increases by 100%'
    ],
    explanation: 'Original domestic price with a 70% tariff = 1.70P. New domestic price with a 15% tariff = 1.15P. Percentage price reduction = (1.70P - 1.15P) / 1.70P x 100 = 32.35%. With price elasticity of import demand = -1.5, expected percentage increase in import volume = 1.5 x 32.35% = 48.5%. Option B is correct.'
  },
  EC13Q192: {
    options: [
      'Logistics savings = ₹15,00,000 crore; Additional exports = $900 billion',
      'Logistics savings = ₹15,00,000 crore; Additional exports = $9 billion',
      'Logistics savings = ₹7,50,000 crore; Additional exports = $6 billion',
      'Logistics savings = ₹15,00,000 crore; Additional exports = $108 billion'
    ],
    correct: 1,
    explanation: 'Current logistics cost = 14% of ₹2,50,00,000 crore = ₹35,00,000 crore. Target logistics cost = 8% of ₹2,50,00,000 crore = ₹20,00,000 crore. Annual savings = ₹15,00,000 crore, equal to a 6 percentage point cost reduction. If 50% of that saving improves export competitiveness, the effective cost reduction for exports is 3 percentage points. At $3 billion of additional exports per 1% cost reduction, additional exports = 3 x $3 billion = $9 billion. Option B is correct.'
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
console.log(`Patched ${changed} EC13 questions`);
