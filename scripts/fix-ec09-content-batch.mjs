import fs from 'node:fs';

const file = 'questions/economics/EC09.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const updates = {
  EC09Q14: {
    explanation: 'The question states that the current equilibrium income is Rs.100 crore above the full employment income of Rs.600 crore. Therefore, current equilibrium income = 600 + 100 = Rs.700 crore.'
  },
  EC09Q17: {
    options: [
      'Inflationary gap of Rs.100 crore',
      'Deflationary gap of Rs.30 crore',
      'Inflationary gap of Rs.200 crore',
      'No gap exists'
    ],
    correct: 1,
    explanation: 'Equilibrium income: Y = 80 + 0.7Y + 220, so 0.3Y = 300 and Y = Rs.1,000 crore. Full employment income is Rs.1,100 crore, so the economy has deficient demand. At YFE = 1,100, AD = 80 + 0.7(1,100) + 220 = Rs.1,070 crore. The deflationary gap is 1,100 - 1,070 = Rs.30 crore.'
  },
  EC09Q24: {
    explanation: 'Initial equilibrium income: Y = 150 + 0.6Y + 100, so 0.4Y = 250 and Y1 = Rs.625 crore. The multiplier is 1/(1 - 0.6) = 2.5. A Rs.50 crore investment injection raises income by 2.5 x 50 = Rs.125 crore, so Y2 = Rs.750 crore. The ratio Y2/Y1 = 750/625 = 1.20.'
  },
  EC09Q33: {
    options: ['Rs.280 crore', 'Rs.320 crore', 'Rs.520 crore', 'Rs.400 crore'],
    explanation: 'At equilibrium, Y = C + I. Therefore, 1,800 = 200 + 0.6(1,800) + I = 200 + 1,080 + I. Hence I = 1,800 - 1,280 = Rs.520 crore.'
  },
  EC09Q40: {
    correct: 1,
    explanation: 'Current equilibrium income: Y = 200 + 0.5Y + 400, so 0.5Y = 600 and Y = Rs.1,200 crore. Full employment income is Rs.1,500 crore, so there is a deflationary gap. The income gap is Rs.300 crore and the multiplier is 1/(1 - 0.5) = 2. Required investment injection = 300/2 = Rs.150 crore.'
  },
  EC09Q46: {
    options: [
      'Economy A by Rs.1,750 crore',
      'Economy B by Rs.500 crore',
      'Economy A by Rs.500 crore',
      'Economy B by Rs.1,250 crore'
    ],
    correct: 0,
    explanation: 'For Economy A: Y = 50 + 0.9Y + 200, so 0.1Y = 250 and Y = Rs.2,500 crore. For Economy B: Y = 100 + 0.6Y + 200, so 0.4Y = 300 and Y = Rs.750 crore. Economy A has higher equilibrium income by 2,500 - 750 = Rs.1,750 crore.'
  },
  EC09Q75: {
    options: ['Delta I = Rs.800 crore', 'Delta I = Rs.250 crore', 'Delta I = Rs.125 crore', 'Delta I = Rs.200 crore'],
    correct: 0,
    explanation: 'Current equilibrium income is found from Y = 200 + 0.6Y + 400, so 0.4Y = 600 and Y = Rs.1,500 crore. A 20 percentage-point unemployment reduction requires income to rise by 20 x Rs.100 crore = Rs.2,000 crore. The multiplier is 1/(1 - 0.6) = 2.5, so required investment increase = 2,000/2.5 = Rs.800 crore.'
  },
  EC09Q80: {
    options: [
      'Round 1-3: Rs.779.4 crore; Total: Rs.1,500 crore',
      'Round 1-3: Rs.732 crore; Total: Rs.1,500 crore',
      'Round 1-3: Rs.779.4 crore; Total: Rs.1,200 crore',
      'Round 1-3: Rs.580 crore; Total: Rs.1,200 crore'
    ],
    explanation: 'Round 1 income is Rs.300 crore. Round 2 is 0.8 x 300 = Rs.240 crore, and round 3 is 0.8 x 240 = Rs.192 crore. Thus, income generated in the first three rounds = 300 + 240 + 192 = Rs.732 crore. The total infinite multiplier effect is (1/0.2) x 300 = Rs.1,500 crore.'
  },
  EC09Q84: {
    options: [
      'Income increases by Rs.250 crore',
      'Income decreases by Rs.100 crore',
      'Income increases by Rs.600 crore',
      'Income increases by Rs.1,000 crore'
    ],
    correct: 2,
    explanation: 'Original equilibrium: Y(1 - 0.5) = 100 + 150, so Y1 = Rs.500 crore. After MPC rises to 0.8 and investment falls to Rs.120 crore, Y(1 - 0.8) = 100 + 120, so Y2 = Rs.1,100 crore. The change in equilibrium income is 1,100 - 500 = Rs.600 crore increase.'
  },
  EC09Q86: {
    options: [
      'Deflationary gap of Rs.400 crore',
      'Deflationary gap of Rs.100 crore',
      'Economy cannot have negative investment',
      'Deflationary gap of Rs.625 crore'
    ],
    correct: 3,
    explanation: 'After the disaster, investment becomes Rs.-100 crore. At full employment income of Rs.2,500 crore, AD = 100 + 0.75(2,500) - 100 = Rs.1,875 crore. Aggregate supply at full employment is Rs.2,500 crore. Therefore, the deflationary gap is 2,500 - 1,875 = Rs.625 crore.'
  },
  EC09Q111: {
    options: ['0.20', '-0.10', '0', '-0.20'],
    explanation: 'At Y = Rs.2,000 crore, C = 400 + 0.8(2,000) = Rs.2,000 crore. Saving S = Y - C = 2,000 - 2,000 = 0. Therefore, APS = S/Y = 0/2,000 = 0.'
  },
  EC09Q142: {
    options: [
      'Rises by about Rs.333 crore',
      'Rises by Rs.600 crore',
      'Rises by Rs.800 crore',
      'Rises by Rs.1,200 crore'
    ],
    correct: 0,
    explanation: 'Initially, -40 + 0.2Y = 160, so Y1 = Rs.1,000 crore. If MPC rises from 0.8 to 0.85, MPS falls from 0.2 to 0.15 while autonomous saving remains Rs.-40 crore. The new equilibrium condition is -40 + 0.15Y = 160, so 0.15Y = 200 and Y2 = about Rs.1,333 crore. The increase is about Rs.333 crore.'
  },
  EC09Q145: {
    correct: 2,
    explanation: 'MPS = 1 - 0.75 = 0.25. After investment rises to Rs.570 crore, the new equilibrium is Y = 180 + 0.75Y + 570, so 0.25Y = 750 and Y = Rs.3,000 crore.'
  },
  EC09Q150: {
    options: [
      'Inflationary gap of Rs.100 crore',
      'No gap remains',
      'Deflationary gap of Rs.100 crore',
      'Deflationary gap of Rs.275 crore'
    ],
    correct: 3,
    explanation: 'Before tax, AD at full employment income of Rs.4,500 crore is 250 + 0.75(4,500) + 750 = Rs.4,375 crore, giving a Rs.125 crore deflationary gap. A Rs.200 crore tax reduces consumption by MPC x tax = 0.75 x 200 = Rs.150 crore. New AD at full employment is 4,375 - 150 = Rs.4,225 crore, so the new deflationary gap is 4,500 - 4,225 = Rs.275 crore.'
  },
  EC09Q151: {
    options: [
      'Yes, income rises by Rs.1,600 crore to reach full employment exactly',
      'No, income rises by Rs.1,100 crore, leaving a gap of Rs.500 crore',
      'No, income rises by Rs.1,400 crore, leaving a gap of Rs.200 crore',
      'Yes, income rises by Rs.1,600 crore and creates a small inflationary gap'
    ],
    explanation: 'With MPC = 0.75, the spending multiplier is 4 and the tax multiplier is -3. The increase in G raises income by 4 x 150 = Rs.600 crore. The Rs.100 crore tax reduction raises income by 3 x 100 = Rs.300 crore. The Rs.50 crore investment increase raises income by 4 x 50 = Rs.200 crore. Total income increase = Rs.1,100 crore, so new income = Rs.9,500 crore and a Rs.500 crore income gap remains.'
  },
  EC09Q160: {
    options: [
      'Delta C = Rs.180; Delta S = Rs.120; APC = 0.75',
      'Delta C = Rs.180; Delta S = Rs.120; APC = 0.90',
      'Delta C = Rs.200; Delta S = Rs.100; APC = 0.75',
      'Delta C = Rs.150; Delta S = Rs.150; APC = 0.80'
    ],
    correct: 0,
    explanation: 'Income rises from Rs.500 crore to Rs.800 crore, so Delta Y = Rs.300 crore. Delta C = MPC x Delta Y = 0.6 x 300 = Rs.180 crore, and Delta S = MPS x Delta Y = 0.4 x 300 = Rs.120 crore. At Y = Rs.800 crore, C = 120 + 0.6(800) = Rs.600 crore, so APC = 600/800 = 0.75.'
  },
  EC09Q182: {
    correct: 1,
    explanation: 'A tax cut raises aggregate demand at full employment by MPC times the tax cut. With MPC = 0.8, closing a Rs.50 crore deflationary gap requires 0.8 x tax cut = 50. Therefore, the required tax reduction is 50/0.8 = Rs.62.5 crore.'
  },
  EC09Q184: {
    options: ['Delta G = Rs.100 crore', 'Delta G = about Rs.61.5 crore', 'Delta G = Rs.120 crore', 'Delta G = Rs.160 crore'],
    explanation: 'Current equilibrium: Y = 100 + 0.6Y + 300, so Y = Rs.1,000 crore. The income gap is 1,200 - 1,000 = Rs.200 crore. Since Delta T = -Delta G/2, the total income effect is 2.5Delta G + (-1.5)(-Delta G/2) = 3.25Delta G. Setting 3.25Delta G = 200 gives Delta G = 200/3.25 = about Rs.61.5 crore.'
  },
  EC09Q187: {
    options: ['Rs.750 crore total', 'Rs.900 crore total', 'Rs.1,000 crore total', 'About Rs.567 crore total'],
    correct: 3,
    explanation: 'The income gap is Rs.2,000 crore. With MPC = 0.75, the government spending multiplier is 4 and the tax multiplier effect of a tax cut is 3. If 60% of the income rise comes through G, then 4Delta G = 0.60 x 2,000 = 1,200, so Delta G = Rs.300 crore. If 40% comes through tax reduction, then 3 x tax cut = 800, so tax cut = about Rs.267 crore. Total fiscal package = 300 + 267 = about Rs.567 crore.'
  },
  EC09Q188: {
    options: [
      'Gap = Rs.160 crore; Delta I = Rs.40 crore',
      'Gap = Rs.320 crore; Delta I = Rs.100 crore',
      'Gap = Rs.400 crore; Delta I = Rs.100 crore',
      'No gap exists'
    ],
    correct: 0,
    explanation: 'Current equilibrium is found from -40 + 0.25Y = 120, so 0.25Y = 160 and Y = Rs.640 crore. Full employment income is Rs.800 crore, so the income gap is 800 - 640 = Rs.160 crore. The multiplier is 1/0.25 = 4, so additional investment needed = 160/4 = Rs.40 crore.'
  },
  EC09Q196: {
    options: [
      'New Y = Rs.1,375; -8.3% change',
      'New Y = Rs.1,500; 0% change',
      'New Y = Rs.1,375; change = 8.3% fall',
      'New Y = Rs.1,875; +25% rise'
    ],
    correct: 3,
    explanation: 'Original equilibrium income = (400 + 200)/(1 - 0.6) = 600/0.4 = Rs.1,500 crore. New autonomous consumption is Rs.600 crore and new investment is Rs.150 crore. New equilibrium income = (600 + 150)/0.4 = Rs.1,875 crore. Percentage change = (1,875 - 1,500)/1,500 x 100 = 25% rise.'
  },
  EC09Q200: {
    correct: 0,
    explanation: 'Current equilibrium: Y = 500 + 0.75Y + 700, so 0.25Y = 1,200 and Y = Rs.4,800 crore. Since full employment income is Rs.6,000 crore, the economy has a deflationary gap. At YFE, AD = 500 + 0.75(6,000) + 700 = Rs.5,700 crore, so the gap is 6,000 - 5,700 = Rs.300 crore. Required investment increase is Rs.300 crore. At full employment, saving S = -500 + 0.25(6,000) = Rs.1,000 crore.'
  }
};

const byId = new Map(data.questions.map((q) => [q.id, q]));

for (const [id, patch] of Object.entries(updates)) {
  const question = byId.get(id);
  if (!question) throw new Error(`Missing ${id}`);
  if (Object.hasOwn(patch, 'correct') && question.correct !== patch.correct && question.correct_content_review_original === undefined) {
    question.correct_content_review_original = question.correct;
  }
  Object.assign(question, patch);
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Updated ${Object.keys(updates).length} EC09 questions.`);
