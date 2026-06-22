import fs from 'node:fs';

const file = 'questions/economics/EC01.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const patches = {
  EC01Q02: {
    options: [
      '10 units of X and 15 units of Y',
      '8 units of X and 12 units of Y',
      '15 units of X and 12 units of Y',
      '5 units of X and 22 units of Y'
    ],
    correct: 2,
    explanation: 'A bundle lies outside the budget set if PxQx + PyQy exceeds income. Option A costs 30 x 10 + 20 x 15 = Rs.600, so it is on the budget line. Option B costs 30 x 8 + 20 x 12 = Rs.480, so it is inside the budget set. Option C costs 30 x 15 + 20 x 12 = Rs.690, which exceeds income of Rs.600. Option D costs 30 x 5 + 20 x 22 = Rs.590, so it is inside the budget set. Therefore Option C is outside the budget set.'
  },
  EC01Q32: {
    explanation: 'Consumer equilibrium condition is MUx/Px = MUy/Py. Here MUx/Px = 90/45 = 2 utils per rupee, and MUy/Py = 72/36 = 2 utils per rupee. Since the marginal utility per rupee is equal for both goods, the consumer is in equilibrium. Option A is correct.'
  },
  EC01Q46: {
    options: ['40 units', '41.67 units', '50 units', '45 units'],
    correct: 1,
    explanation: 'New income = Rs.2,400 x 1.25 = Rs.3,000. New price of X = Rs.60 x 1.20 = Rs.72. The X-intercept is income divided by price of X, so new X-intercept = Rs.3,000 / Rs.72 = 41.67 units approximately. Option B is correct.'
  },
  EC01Q60: {
    explanation: 'Total expenditure = Px x X + Py x Y = 80 x 15 + 60 x 20 = Rs.1,200 + Rs.1,200 = Rs.2,400. Income is also Rs.2,400. Therefore the bundle is feasible and lies exactly on the budget line, with unspent income of Rs.0. Option A is correct.'
  },
  EC01Q83: {
    options: [
      'MUy = 120 utils; Qy = 15 units',
      'MUy = 120 utils; Qy = 10 units',
      'MUy = 160 utils; Qy = 7.5 units',
      'MUy = 90 utils; Qy = 10 units'
    ],
    correct: 0,
    explanation: 'At equilibrium, MUx/Px = MUy/Py = MUm. Since MUx/Px = 90/30 = 3, this matches MUm = 3. Therefore MUy = MUm x Py = 3 x 40 = 120 utils. Using the budget constraint: 30 x 20 + 40Qy = 1,200, so 600 + 40Qy = 1,200 and Qy = 15 units. Option A is correct.'
  },
  EC01Q87: {
    explanation: 'At (X=10, Y=12), total expenditure = 4 x 10 + 5 x 12 = 40 + 60 = Rs.100. This equals the right side of the budget line, so the consumer is exactly on the budget line and unspent income is Rs.0. Option A is correct.'
  },
  EC01Q168: {
    question: 'Economy has PPC: A + B = 100 (linear). The new PPC becomes: 2A + B = 120. How does the maximum production of A and B each change?',
    options: [
      'Max A: increases from 100 to 120; Max B: unchanged at 100',
      'Max A: decreases from 100 to 60; Max B: increases from 100 to 120',
      'Max A: decreases from 100 to 60; Max B: unchanged at 100',
      'Max A: unchanged at 100; Max B: increases from 100 to 120'
    ],
    correct: 1,
    explanation: 'Original PPC: A + B = 100. If B = 0, max A = 100; if A = 0, max B = 100. New PPC: 2A + B = 120. If B = 0, 2A = 120, so max A = 60. If A = 0, max B = 120. Therefore max A decreases from 100 to 60, while max B increases from 100 to 120. Option B is correct.'
  },
  EC01Q170: {
    options: [
      'In equilibrium; no gain from transfer',
      'Not in equilibrium; gain of 2 utils from Rs.4 transfer from Y to X',
      'Not in equilibrium; loss of 2 utils from Rs.4 transfer from Y to X',
      'Not in equilibrium; gain of 4 utils from Rs.4 transfer'
    ],
    correct: 3,
    explanation: 'At (X=5, Y=8), the budget is exhausted: 4 x 5 + 5 x 8 = Rs.60. MUx/Px = 12/4 = 3 utils per rupee, while MUy/Py = 10/5 = 2 utils per rupee. Since MUx/Px is greater, the consumer is not in equilibrium and gains by shifting spending from Y to X. A Rs.4 transfer gives utility gained from X = 4 x 3 = 12 utils and utility lost from Y = 4 x 2 = 8 utils. Net gain = 4 utils. Option D is correct.'
  },
  EC01Q178: {
    correct: 0,
    explanation: 'Total expenditure = 50 x 8 + 75 x 6 = Rs.400 + Rs.450 = Rs.850. This equals income of Rs.850. Hence the bundle lies on the budget line and there is no unspent income. Option A is correct.'
  },
  EC01Q186: {
    explanation: 'PPC: A/25 + B/50 = 1. Multiplying by 50 gives 2A + B = 50. At (A=10, B=30), 2 x 10 + 30 = 50. The economy is already on the PPC, so it cannot produce more A without sacrificing some B. Option D is correct.'
  },
  EC01Q190: {
    question: "Income=Rs.5,000; Px=Rs.200; Py=Rs.250. Consumer is at equilibrium (Qx=10, Qy=12). Later, the chosen bundle changes to (Qx=15, Qy=8). Income and Py are unchanged. What must be the new Px?",
    options: [
      'New Px = Rs.150',
      'New Px = Rs.100',
      'New Px = Rs.200',
      'New Px = Rs.167'
    ],
    correct: 2,
    explanation: 'The new bundle must satisfy the budget constraint: New Px x 15 + 250 x 8 = 5,000. Therefore 15Px + 2,000 = 5,000, so 15Px = 3,000 and Px = Rs.200. Option C is correct.'
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
console.log(`Patched ${changed} EC01 questions`);
