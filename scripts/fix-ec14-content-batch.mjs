import fs from 'node:fs';

const file = 'questions/economics/EC14.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const patches = {
  EC14Q14: {
    options: ['Rs.1,15,200', 'Rs.1,08,000', 'Rs.1,26,000', 'Rs.1,20,000'],
    correct: 0,
    explanation: 'Farm income = 40% of Rs.1,20,000 = Rs.48,000. Non-farm income = 60% of Rs.1,20,000 = Rs.72,000. After a 25% fall, farm income becomes Rs.48,000 x 0.75 = Rs.36,000. After a 10% rise, non-farm income becomes Rs.72,000 x 1.10 = Rs.79,200. New total income = Rs.36,000 + Rs.79,200 = Rs.1,15,200. Option A is correct.'
  },
  EC14Q115: {
    options: [
      'Services productivity is about 6.8 times higher',
      'Services productivity is about 5 times higher',
      'Agriculture productivity is higher due to larger workforce',
      'Both sectors have equal productivity'
    ],
    correct: 0,
    explanation: 'Agricultural workers = 60% of 50 crore = 30 crore. Services workers = 40% of 50 crore = 20 crore. Agricultural GDP = 18% of Rs.200 lakh crore = Rs.36 lakh crore. Services GDP = 82% of Rs.200 lakh crore = Rs.164 lakh crore. Agricultural productivity = 36/30 = Rs.1.2 lakh per worker. Services productivity = 164/20 = Rs.8.2 lakh per worker. Ratio = 8.2/1.2 = 6.83. Option A is correct.'
  },
  EC14Q134: {
    correct: 1,
    explanation: 'Deaths prevented = (34 - 20) per 1,000 live births x 2.5 crore live births = 14/1,000 x 2,50,00,000 = 3,50,000 lives. Human capital value preserved = 3,50,000 x Rs.30 lakh = Rs.1,05,000 crore. Option B is correct.'
  },
  EC14Q154: {
    correct: 1,
    explanation: 'New agricultural income per family = 2.5 acres x Rs.20,000 = Rs.50,000. Minor forest produce income = Rs.8,000. Total new income = Rs.58,000. Previous income = Rs.25,000. Increase = Rs.58,000 - Rs.25,000 = Rs.33,000. Option B is correct.'
  },
  EC14Q156: {
    correct: 1,
    explanation: 'The precautionary principle means that when there is a threat of serious or irreversible environmental harm, lack of complete scientific certainty should not be used as a reason to postpone preventive action. It supports precautionary action under uncertainty. Option B is correct.'
  },
  EC14Q161: {
    options: [
      'Not sustainable; all 500 families must halve extraction',
      'Not sustainable; 400 families must reduce to 500 litres/day',
      'Sustainable; current extraction matches replenishment',
      'Not sustainable; 100 families must completely stop extraction'
    ],
    correct: 1,
    explanation: 'Current extraction = 500 x 1,000 = 5,00,000 litres/day. Replenishment is only 3,00,000 litres/day, so current extraction is not sustainable. Let R families reduce extraction to 500 litres/day. Total extraction = (500 - R) x 1,000 + R x 500 = 5,00,000 - 500R. For sustainability, 5,00,000 - 500R = 3,00,000, so R = 400. Option B is correct.'
  },
  EC14Q164: {
    explanation: 'Dropout reduction = 20% - 12% = 8 percentage points. Annual GDP benefit = 8 x Rs.500 crore = Rs.4,000 crore per year. Total investment = 10,000 x Rs.5,00,000 = Rs.500 crore. Over 20 years, total benefit = Rs.4,000 crore x 20 = Rs.80,000 crore. BCR = Rs.80,000 crore / Rs.500 crore = 160. Option B is correct.'
  },
  EC14Q169: {
    correct: 0,
    explanation: 'Post-tax output = 800 units and tax per unit = Rs.200. Tax revenue = 800 x Rs.200 = Rs.1,60,000. Output falls from 1,000 units to 800 units, so the output reduction/deadweight-loss quantity is 200 units. Option A is correct.'
  },
  EC14Q194: {
    correct: 1,
    explanation: 'Groundwater is a common pool resource: one user’s extraction reduces availability for others, while exclusion is difficult. Unregulated extraction creates a negative externality and can lead to tragedy of the commons. Government regulation through caps, permits, pricing, or recharge rules helps internalise this market failure. Option B is correct.'
  },
  EC14Q199: {
    options: ['Rs.96,000 crore', 'Rs.4,80,000 crore', 'Rs.48,000 crore', 'Rs.1,92,000 crore'],
    correct: 1,
    explanation: 'Agricultural workers = 50% of 40 crore = 20 crore. Workers shifted = 10% of 20 crore = 2 crore. Productivity gain per shifted worker = Rs.3,20,000 - Rs.80,000 = Rs.2,40,000. Total GDP gain = 2 crore workers x Rs.2,40,000 = Rs.4,80,000 crore. Option B is correct.'
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
console.log(`Patched ${changed} EC14 questions`);
