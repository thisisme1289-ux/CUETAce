import fs from 'node:fs';

const file = 'questions/general-test/GT-S4.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const patches = {
  'GT-S4Q08': {
    correct: 0,
    explanation: 'CRR = 4% of Rs.5,000 crore = Rs.200 crore. SLR = 18% of Rs.5,000 crore = Rs.900 crore. Excess reserves = Rs.100 crore. Total funds not available for lending = Rs.200 + Rs.900 + Rs.100 = Rs.1,200 crore. Maximum lendable amount = Rs.5,000 - Rs.1,200 = Rs.3,800 crore. Option A is correct.'
  },
  'GT-S4Q33': {
    options: ['Rs.8,000 crore', 'Rs.80,000 crore', 'Rs.16,000 crore', 'Rs.1,60,000 crore'],
    correct: 0,
    explanation: 'Additional burden depends on the change in the rupee cost per dollar. Crude imports = 200 million barrels = 20 crore barrels. Dollar value = 20 crore x $80 = $1,600 crore. The rupee depreciates by Rs.5 per dollar, so additional burden = $1,600 crore x Rs.5 = Rs.8,000 crore. Option A is correct.'
  },
  'GT-S4Q36': {
    options: ['Rs.17.00 lakh crore', 'Rs.21.00 lakh crore', 'Rs.14.75 lakh crore', 'Rs.19.50 lakh crore'],
    correct: 0,
    explanation: 'GDP impact is calculated by multiplying each component by its fiscal multiplier. Infrastructure: Rs.5 lakh crore x 2.5 = Rs.12.5 lakh crore. Direct transfers: Rs.2 lakh crore x 1.5 = Rs.3.0 lakh crore. Credit guarantees: Rs.1 lakh crore x 0.5 = Rs.0.5 lakh crore. Healthcare: Rs.0.5 lakh crore x 2.0 = Rs.1.0 lakh crore. Total impact = Rs.12.5 + Rs.3.0 + Rs.0.5 + Rs.1.0 = Rs.17.00 lakh crore. Option A is correct.'
  },
  'GT-S4Q41': {
    options: ['Rs.100 crore', 'Rs.1,500 crore', 'Rs.3,000 crore', 'Rs.2,000 crore'],
    correct: 0,
    explanation: 'After the tariff, imports equal domestic demand minus domestic production = 75 lakh - 55 lakh = 20 lakh units. Tariff revenue = 20 lakh units x Rs.500 = Rs.1,000,000,000 = Rs.100 crore. Option A is correct.'
  },
  'GT-S4Q44': {
    options: ['Rs.375 crore', 'Rs.875 crore', 'Rs.750 crore', 'Rs.500 crore'],
    correct: 1,
    explanation: 'Current capital = paid-up capital + reserves = Rs.500 crore + Rs.1,500 crore = Rs.2,000 crore. Required capital at 11.5% CRAR = 11.5% of Rs.25,000 crore = Rs.2,875 crore. Additional capital required = Rs.2,875 crore - Rs.2,000 crore = Rs.875 crore. Option B is correct.'
  },
  'GT-S4Q51': {
    question: "India's 15th Finance Commission recommended 41% of the divisible pool to states. The total divisible pool is Rs.28 lakh crore. State X has a population weight of 0.12 in the devolution formula and an area weight of 0.08.\n\nIf population and area together account for 30% of the devolution criteria, and the two criteria are weighted equally within this 30% block, what is State X's devolution from these two criteria alone?\n\n(A) Rs.34,440 crore\n(B) Rs.68,880 crore\n(C) Rs.98,520 crore\n(D) Rs.1,00,000 crore",
    options: ['Rs.34,440 crore', 'Rs.68,880 crore', 'Rs.98,520 crore', 'Rs.1,00,000 crore'],
    correct: 0,
    explanation: "States' share = 41% of Rs.28 lakh crore = Rs.11.48 lakh crore = Rs.11,48,000 crore. Population and area together account for 30% of the criteria, and the question states that they are equally weighted, so each gets 15%. Population contribution = 0.12 x 15% x Rs.11,48,000 crore = Rs.20,664 crore. Area contribution = 0.08 x 15% x Rs.11,48,000 crore = Rs.13,776 crore. Total = Rs.34,440 crore. Option A is correct."
  },
  'GT-S4Q61': {
    options: ['Rs.14.89 lakh crore additional', 'Rs.5.42 lakh crore additional', 'Rs.49.4 lakh crore total (new year)', 'Rs.10.81 lakh crore additional'],
    correct: 0,
    explanation: 'Current tax revenue = 11.7% of Rs.295 lakh crore = Rs.34.515 lakh crore. Target tax revenue = 13% of Rs.380 lakh crore = Rs.49.4 lakh crore. Additional tax revenue to be mobilized = Rs.49.4 - Rs.34.515 = Rs.14.885 lakh crore, approximately Rs.14.89 lakh crore. Option A is correct.'
  },
  'GT-S4Q64': {
    correct: 1,
    explanation: 'The top three named sectors by FDI inflows are Computer Software & Hardware ($17.2 billion), Services ($15.4 billion), and Trading ($5.1 billion). Their combined inflow is $37.7 billion. Percentage of total FDI = ($37.7 / $65.0) x 100 = 58.0%. Option B is correct.'
  },
  'GT-S4Q111': {
    options: ['Rs.0.924 lakh crore', 'Rs.1.10 lakh crore', 'Rs.1.32 lakh crore', 'Rs.0.88 lakh crore'],
    correct: 0,
    explanation: 'Exports receiving 5% incentive = 60% of Rs.22 lakh crore = Rs.13.2 lakh crore, so incentive = 5% of Rs.13.2 lakh crore = Rs.0.66 lakh crore. Remaining exports = 40% of Rs.22 lakh crore = Rs.8.8 lakh crore, so incentive = 3% of Rs.8.8 lakh crore = Rs.0.264 lakh crore. Total incentive cost = Rs.0.66 + Rs.0.264 = Rs.0.924 lakh crore. Option A is correct.'
  },
  'GT-S4Q143': {
    options: ['Rs.7,500 crore', 'Rs.37,500 crore', 'Rs.25,000 crore', 'Rs.50,000 crore'],
    correct: 0,
    explanation: 'After the tariff, imports = domestic consumption - domestic production = 75 million tonnes - 60 million tonnes = 15 million tonnes, or 1.5 crore tonnes. Tariff revenue = 1.5 crore tonnes x Rs.5,000 per tonne = Rs.7,500 crore. Option A is correct.'
  },
  'GT-S4Q150': {
    correct: 3,
    explanation: 'Debt/GDP = Rs.155 lakh crore / Rs.270 lakh crore = 57.4%. Since r = 7% and g = 8%, (r - g) = -1%. The interest-growth effect is -1% x 57.4% = -0.574 percentage points. Primary surplus/GDP = Rs.3 lakh crore / Rs.270 lakh crore = 1.11 percentage points. Change in Debt/GDP = -0.574 - 1.11 = -1.684 percentage points, approximately a 2 percentage point decrease. Option D is correct.'
  },
  'GT-S4Q164': {
    correct: 0,
    explanation: "Under RBI's microfinance framework, the 50% repayment cap applies to total household loan obligations across lenders. Current loan repayment = principal Rs.50,000 + flat interest for two years at 22% per annum (Rs.22,000) = Rs.72,000. Monthly instalment = Rs.72,000 / 24 = Rs.3,000. Repayment cap = 50% of Rs.10,000 monthly income = Rs.5,000, leaving Rs.2,000 monthly headroom. A further 24-month flat-rate loan of Rs.30,000 would require repayment of Rs.30,000 x 1.44 = Rs.43,200, or Rs.1,800 per month, which stays within the cap. Option A is correct."
  },
  'GT-S4Q178': {
    correct: 0,
    explanation: 'Tariff revenue from Country X = Rs.3,000 crore x 5% = Rs.150 crore. Tariff revenue from Country Y = Rs.7,000 crore x 30% = Rs.2,100 crore. Total tariff revenue = Rs.150 crore + Rs.2,100 crore = Rs.2,250 crore. Option A is correct.'
  },
  'GT-S4Q189': {
    correct: 3,
    explanation: 'Human Development Efficiency can be approximated as HDI divided by GNI per capita. India: 0.633/6590 = 0.0000960. Sri Lanka: 0.780/10927 = 0.0000714. Bangladesh: 0.661/5693 = 0.0001161. Pakistan: 0.544/4624 = 0.0001176. Nepal: 0.601/3457 = 0.0001738. Among the listed answer options, Nepal has the highest HDI relative to GNI per capita. Option D is correct.'
  },
  'GT-S4Q192': {
    correct: 1,
    explanation: 'Under the new regime, tax before rebate on Rs.7 lakh is Rs.25,000, but the Section 87A rebate makes the net tax zero for eligible income up to Rs.7 lakh. Under the old regime without deductions, tax on Rs.7 lakh is 5% on Rs.2.5 lakh to Rs.5 lakh = Rs.12,500 plus 20% on Rs.5 lakh to Rs.7 lakh = Rs.40,000, totaling Rs.52,500. Tax saving = Rs.52,500 - Rs.0 = Rs.52,500. Option B is correct.'
  }
};

let changed = 0;
for (const question of data.questions) {
  const patch = patches[question.id];
  if (!patch) continue;
  Object.assign(question, patch);
  delete question.correct_content_audit_original;
  changed += 1;
}

if (changed !== Object.keys(patches).length) {
  throw new Error(`Expected to patch ${Object.keys(patches).length} questions, patched ${changed}`);
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Patched ${changed} GT-S4 questions`);
