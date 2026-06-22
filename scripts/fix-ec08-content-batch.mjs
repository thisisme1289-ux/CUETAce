import fs from 'node:fs';

const file = 'questions/economics/EC08.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const patches = {
  EC08Q44: {
    correct: 0,
    explanation: 'Reduction in CRR = 4% - 3% = 1 percentage point. Additional liquidity released = 1% of ₹1,20,000 crore = ₹1,200 crore. Option A is correct.'
  },
  EC08Q51: {
    options: [
      'P = 1.25',
      'P = 0.5',
      'P = 5',
      'P = 20'
    ],
    correct: 0,
    explanation: 'Using MV = PY, M = ₹10,000, V = 5, and Y = ₹40,000. Therefore P = MV/Y = (10,000 x 5) / 40,000 = 50,000 / 40,000 = 1.25. Option A is correct.'
  },
  EC08Q54: {
    options: [
      '₹5,42,000',
      '₹3,62,000',
      '₹5,00,000',
      '₹4,69,000'
    ],
    correct: 0,
    explanation: 'Bank A deposits = ₹2,00,000 and lends 90%, so Bank B receives ₹1,80,000. Bank B lends 90%, so Bank C receives ₹1,62,000. Cumulative deposits across the three banks = ₹2,00,000 + ₹1,80,000 + ₹1,62,000 = ₹5,42,000. Option A is correct.'
  },
  EC08Q145: {
    options: [
      'CRR: Compliant (exact); SLR: Deficient by ₹400 crore',
      'Both: compliant exactly; no deficiency',
      'CRR: Deficient by ₹400; SLR: Compliant',
      'Both deficient'
    ],
    explanation: 'CRR required = 8% of ₹80,000 crore = ₹6,400 crore, which equals the actual cash held. SLR required = 20% of ₹80,000 crore = ₹16,000 crore, which equals the actual SLR investments. Both requirements are met exactly, with no deficiency. Option B is correct.'
  },
  EC08Q162: {
    correct: 1,
    explanation: 'Fiscal multiplier = 1/(1 - MPC) = 1/0.2 = 5. The government spending cut reduces aggregate demand by ₹1,000 crore x 5 = ₹5,000 crore. The repo-rate cut and money-supply expansion work in the opposite direction, but the final size of their effect depends on how strongly investment responds to lower interest rates. Therefore the two policies partially offset each other, and the net impact depends on investment sensitivity. Option B is correct.'
  },
  EC08Q164: {
    options: [
      'From 10% to 5%',
      'From 10% to 7.5%',
      'From 10% to 4%',
      'From 10% to 8.33%'
    ],
    correct: 3,
    explanation: 'Current money creation = ₹2,00,000 x (1/0.10) = ₹20,00,000. Target money creation = ₹20,00,000 + ₹4,00,000 = ₹24,00,000. Required multiplier = ₹24,00,000 / ₹2,00,000 = 12, so required CRR = 1/12 = 8.33%. RBI should reduce CRR from 10% to about 8.33%, a fall of 1.67 percentage points. Option D is correct.'
  },
  EC08Q184: {
    correct: 2,
    explanation: 'Inflation gap = 6% - 4% = 2%. Output gap = actual growth 5% - potential growth 5% = 0%. Using the simplified rule given in the question: Policy Rate = 2.5% + 0.5(2%) + 0.5(0%) = 2.5% + 1% = 3.5%. Option C is correct.'
  },
  EC08Q200: {
    correct: 0,
    explanation: "Assertion A is true under the endogenous-money view: money supply is strongly influenced by credit demand and bank lending rather than only by prior monetary-base expansion. Reason R is also true: commercial banks create deposits when they extend loans, and the central bank accommodates reserve needs to maintain payment-system stability and the policy rate. R directly explains A, so Option A is correct."
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
console.log(`Patched ${changed} EC08 questions`);
