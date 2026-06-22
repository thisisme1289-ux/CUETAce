import { readFile, writeFile } from 'node:fs/promises';

const file = 'questions/economics/EC04.json';
const data = JSON.parse(await readFile(file, 'utf8'));

const fixes = new Map(Object.entries({
  EC04Q06: {
    correct: 1,
    explanation: 'Price elasticity of supply = percentage change in quantity supplied divided by percentage change in price. Quantity rises from 100 to 150, a 50% increase. Price rises from Rs.20 to Rs.30, also a 50% increase. Es = 50% / 50% = 1.0.'
  },
  EC04Q14: {
    correct: 2,
    explanation: 'Equilibrium price is Rs.60, so a ceiling of Rs.50 is binding. At P = 50, QD = 800 - 4(50) = 600 and QS = 200 + 6(50) = 500. Excess demand = 600 - 500 = 100 units.'
  },
  EC04Q19: {
    options: ['Profit about Rs.8.13', 'Loss Rs.16', 'Profit Rs.0', 'Profit Rs.26'],
    correct: 0,
    explanation: 'Profit = 39Q - (3Q^3 - 6Q^2 + 12Q + 50). First-order condition is MC = MR: 9Q^2 - 12Q + 12 = 39, or 3Q^2 - 4Q - 9 = 0. The positive solution is Q = 2.52 approximately. Profit at Q = 2.52 is about Rs.8.13.'
  },
  EC04Q21: {
    correct: 2,
    explanation: 'Percentage change in price = (80 - 60) / 60 x 100 = 33.33%. With Es = 1.5, percentage change in supply = 1.5 x 33.33% = 50%. New quantity supplied = 300 + 50% of 300 = 450 units.'
  },
  EC04Q29: {
    correct: 0,
    explanation: 'An increase in demand raises both price and quantity. A decrease in supply raises price but lowers quantity. Therefore price definitely increases, while the final quantity depends on the relative magnitudes of the two shifts.'
  },
  EC04Q30: {
    correct: 0,
    explanation: 'Quantity supplied must rise by 100/500 = 20%. Since Es = 0.8, percentage change in price = 20% / 0.8 = 25%. A 25% rise on Rs.50 is Rs.12.50.'
  },
  EC04Q34: {
    options: ['Rs.4.29', 'Rs.12', 'Rs.14', 'Rs.16'],
    correct: 0,
    explanation: 'Market supply = 500(5 + 0.5P) = 2500 + 250P. Equilibrium requires 4000 - 100P = 2500 + 250P. Thus 1500 = 350P and P = Rs.4.29 approximately.'
  },
  EC04Q49: {
    options: ['Q = 8; Profit = Rs.156', 'Q = 0; Profit = -Rs.100', 'Q = 4; Profit = Rs.28', 'Q = 6; Profit = -Rs.100'],
    correct: 0,
    explanation: 'Profit = TR - TC = 60Q - (Q^3 - 12Q^2 + 60Q + 100) = -Q^3 + 12Q^2 - 100. First-order condition gives -3Q^2 + 24Q = 0, so Q = 0 or Q = 8. Q = 8 is the profit maximum. Profit = 480 - 324 = Rs.156.'
  },
  EC04Q68: {
    options: ['Rs.36', 'Rs.15', 'Rs.17', 'Rs.22'],
    correct: 0,
    explanation: 'Total revenue at 200 units = 200 x Rs.15 = Rs.3,000. Total revenue at 210 units = 210 x Rs.16 = Rs.3,360. Marginal revenue for the 10-unit increase = (3,360 - 3,000) / (210 - 200) = Rs.36.'
  },
  EC04Q78: {
    options: ['Es = 1.25', 'Es = 2.0', 'Es = 0.5', 'Es = 1.0'],
    correct: 0,
    explanation: 'From P = 5 + 2Q, we get Q = (P - 5) / 2 and dQ/dP = 0.5. At Q = 10, P = 25. Es = dQ/dP x P/Q = 0.5 x 25/10 = 1.25.'
  },
  EC04Q81: {
    options: ['P_consumer = Rs.27, Tax revenue = Rs.255', 'P_consumer = Rs.25, Tax revenue = Rs.150', 'P_consumer = Rs.29, Tax revenue = Rs.210', 'P_consumer = Rs.27, Tax revenue = Rs.150'],
    correct: 0,
    explanation: 'With a Rs.5 tax on producers, supply becomes QS = 3(P - 5) - 15 = 3P - 30, where P is the consumer price. Equilibrium: 3P - 30 = 105 - 2P, so P = Rs.27. Quantity = 105 - 2(27) = 51. Tax revenue = Rs.5 x 51 = Rs.255.'
  },
  EC04Q116: {
    correct: 2,
    explanation: 'At the original price P = 20, QS = 6(20) - 60 = 60. The slope dQS/dP = 6. Elasticity at the original point = dQS/dP x P/Q = 6 x 20/60 = 2.0.'
  },
  EC04Q120: {
    options: ['Es = 0.38', 'Es = 1.5', 'Es = 1.0', 'Es = 2.0'],
    correct: 0,
    explanation: 'For the price-induced movement from period 2 to 3, quantity rises from 260 to 280 and price rises from Rs.50 to Rs.60. Percentage change in quantity = 20/260 = 7.69%. Percentage change in price = 10/50 = 20%. Es = 7.69% / 20% = 0.38 approximately.'
  },
  EC04Q126: {
    options: ['Q=8; Profit = Rs.78; Operates', 'Q=8; Profit = Rs.50; Operates', 'Q=8; Loss = Rs.50; Shuts down', 'Q=4; Profit = Rs.18; Operates'],
    correct: 0,
    explanation: 'MC = 4Q + 8. Setting P = MC gives 40 = 4Q + 8, so Q = 8. TR = 40 x 8 = Rs.320. TC = 2(8^2) + 8(8) + 50 = Rs.242. Profit = Rs.78. Since price exceeds AVC at Q = 8, the firm operates.'
  },
  EC04Q128: {
    options: ['Excess demand = 40 units', 'Excess supply = 40 units', 'Excess supply = 230 units', 'Excess demand = 115 units'],
    correct: 2,
    explanation: 'Price rises from Rs.200 to Rs.220, a 10% increase. Demand elasticity -1.5 means QD falls by 15%, from 1000 to 850. Supply elasticity 0.8 means QS rises by 8%, from 1000 to 1080. Excess supply = 1080 - 850 = 230 units.'
  },
  EC04Q132: {
    correct: 3,
    explanation: 'MC = dTC/dQ = 1.5Q^2 - 10Q + 30. The slope of MC is d(MC)/dQ = 3Q - 10. MC is falling when 3Q - 10 < 0, i.e. Q < 10/3 or about 3.33, and rising when Q > 3.33.'
  },
  EC04Q158: {
    options: ['a = 20, b = 8; Es = 0.86', 'a = 10, b = 9; Es = 1.5', 'a = 20, b = 8; Es = 1.6', 'a = 20, b = 8; Es = 1.0'],
    correct: 0,
    explanation: 'From 100 = a + 10b and 180 = a + 20b, subtracting gives b = 8. Then a = 100 - 80 = 20. At P = 15, QS = 20 + 8(15) = 140. Es = b x P/Q = 8 x 15/140 = 0.86 approximately.'
  },
  EC04Q166: {
    options: ['P = Rs.18.75', 'P = Rs.75', 'P = Rs.25', 'P = Rs.100'],
    correct: 0,
    explanation: 'Shut-down price is minimum AVC. TVC = Q^3 - 15Q^2 + 75Q, so AVC = Q^2 - 15Q + 75. Minimum AVC occurs where 2Q - 15 = 0, so Q = 7.5. Minimum AVC = 7.5^2 - 15(7.5) + 75 = Rs.18.75.'
  },
  EC04Q168: {
    options: ['P=35, Q=60; CS=Rs.2700; PS=Rs.900', 'P=25, Q=40; CS=Rs.1200; PS=Rs.400', 'P=35, Q=60; CS=Rs.1800; PS=Rs.900', 'P=35, Q=60; CS=Rs.2700; PS=Rs.450'],
    correct: 1,
    explanation: 'Equilibrium is 5 + 0.5Q = 85 - 1.5Q, so 2Q = 80 and Q = 40. Price = 5 + 0.5(40) = Rs.25. CS = 1/2 x (85 - 25) x 40 = Rs.1200. PS = 1/2 x (25 - 5) x 40 = Rs.400.'
  },
  EC04Q186: {
    correct: 2,
    explanation: 'Equilibrium: 100 - Q/2 = 10 + Q/3. Thus 90 = 5Q/6, Q = 108, and P = 46. A ceiling at Rs.46 equals the equilibrium price, so it does not distort the market and deadweight loss is zero.'
  },
  EC04Q195: {
    options: ['P=Rs.135; Q=825; Govt expenditure=Rs.33,000', 'P=Rs.105; Q=975; Govt expenditure=Rs.39,000', 'P=Rs.100; Q=1000; Govt expenditure=Rs.40,000', 'P=Rs.115; Q=925; Govt expenditure=Rs.37,000'],
    correct: 0,
    explanation: 'A Rs.40 producer subsidy shifts supply to QS = 300 + 3(P + 40) = 420 + 3P, where P is consumer price. Equilibrium: 1500 - 5P = 420 + 3P, so 1080 = 8P and P = Rs.135. Quantity = 1500 - 5(135) = 825. Government expenditure = Rs.40 x 825 = Rs.33,000.'
  },
  EC04Q199: {
    options: ['Old P=Rs.84, Q=2320; New P=Rs.94, Q=2120; Price rises by 11.9%', 'Old P=Rs.84, Q=1320; New P=Rs.94, Q=1180; Price rises by 8.3%', 'Old P=Rs.90, Q=1300; New P=Rs.100, Q=1200; Price rises by 11.1%', 'Old P=Rs.84, Q=1320; New P=Rs.97, Q=1060; Price rises by 15.5%'],
    correct: 0,
    explanation: 'Original equilibrium: 4000 - 20P = -200 + 30P, so 4200 = 50P and P = Rs.84. Quantity = 2320. After drought, supply becomes QS = -700 + 30P. New equilibrium: 4000 - 20P = -700 + 30P, so P = Rs.94 and Q = 2120. Percentage price rise = (94 - 84) / 84 x 100 = 11.9%.'
  },
  EC04Q200: {
    options: ['P=Rs.186.15, per firm q=45.54, supernormal profit about Rs.4,097.50', 'P=Rs.40, per firm q=18, normal profit=Rs.0', 'P=Rs.30, per firm q=8, loss of Rs.50', 'P=Rs.50, per firm q=23, supernormal profit=Rs.500'],
    correct: 0,
    explanation: 'For each firm, MC = 4q + 4, so the supply condition is q = (P - 4)/4. Market supply for 25 firms is 25(P - 4)/4. Equilibrium: 3000 - 10P = 25(P - 4)/4. This gives 12100 = 65P, so P = Rs.186.15. Each firm supplies q = 45.54. Profit per firm is about Rs.4,097.50, so the firm earns supernormal profit.'
  }
}));

let changed = 0;
for (const question of data.questions) {
  const fix = fixes.get(question.id);
  if (!fix) continue;
  if ('options' in fix) question.options = fix.options;
  if ('correct' in fix) {
    if (!('correct_content_review_original' in question) && question.correct !== fix.correct) {
      question.correct_content_review_original = question.correct;
    }
    question.correct = fix.correct;
  }
  question.explanation = fix.explanation;
  changed += 1;
}

await writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Updated ${changed} EC04 questions in ${file}`);
