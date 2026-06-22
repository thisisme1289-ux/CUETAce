import fs from 'node:fs';

const file = 'questions/economics/EC02.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const questions = Array.isArray(data) ? data : data.questions;

const updates = {
  EC02Q08: {
    explanation: 'Compare the affordable option bundles using the given marginal utility schedules. X = 3 and Y = 4 costs 3 x Rs.4 + 4 x Rs.2 = Rs.20, so the full budget is used. Its total utility is (20 + 16 + 12) + (10 + 8 + 6 + 4) = 76, which is higher than the other listed affordable bundles. Therefore, the consumer chooses X = 3 and Y = 4.'
  },
  EC02Q25: {
    explanation: 'Initial total expenditure = 50 x Rs.40 = Rs.2,000. New total expenditure = 40 x Rs.50 = Rs.2,000. Since total expenditure remains unchanged when price rises, demand is unit elastic. Using the arc percentage method, quantity changes by -10 on an average quantity of 45 and price changes by +10 on an average price of 45, so Ed = (-10/45)/(10/45) = -1.'
  },
  EC02Q32: {
    options: ['1.0', '2.0', '0.5', '1.33'],
    correct: 3,
    explanation: 'Income elasticity of demand = percentage change in quantity demanded / percentage change in income. Quantity demanded rises from 15 to 25, so percentage change = 10/15 x 100 = 66.67%. Income rises from Rs.3,000 to Rs.4,500, so percentage change = 1,500/3,000 x 100 = 50%. Therefore, YED = 66.67/50 = 1.33.'
  },
  EC02Q40: {
    correct: 2,
    explanation: 'PED = (dQ/dP) x (P/Q). For Qd = 200 - 4P, dQ/dP = -4, so PED = -4P/(200 - 4P). Setting PED = -2 gives -4P/(200 - 4P) = -2, so 4P = 400 - 8P, 12P = 400 and P = Rs.33.33. Thus the nearest listed value is Rs.33.3.'
  },
  EC02Q42: {
    correct: 1,
    explanation: 'At Rs.20, total expenditure = 5 x 20 = Rs.100. When price falls to Rs.16, total expenditure is Rs.80, so the new quantity demanded is 80/16 = 5 units. Total expenditure falls when price falls, indicating inelastic demand. Therefore, the answer is inelastic demand with Q = 5.'
  },
  EC02Q56: {
    options: ['Rs.97,125', 'Rs.1,02,500', 'Rs.92,500', 'Rs.1,00,000'],
    correct: 0,
    explanation: 'The price rises by 5%. With PED = -1.5, quantity demanded changes by -1.5 x 5% = -7.5%. New quantity = 1,000 x 0.925 = 925 units. New price = Rs.100 x 1.05 = Rs.105. New total revenue = 925 x 105 = Rs.97,125.'
  },
  EC02Q107: {
    options: [
      'At P=10: Q=90; PED=-0.33',
      'At P=10: Q=50; at P=20: Q=20; PED=-0.6',
      'At P=10: Q=80; PED=-0.33',
      'At P=20: Q=20; PED=-1'
    ],
    explanation: 'Market demand is Q1 + Q2. At P = Rs.10, Q1 = 50 - 2(10) = 30 and Q2 = 30 - 10 = 20, so market demand is 50. At P = Rs.20, Q1 = 10 and Q2 = 10, so market demand is 20. The market demand function is Qm = 80 - 3P, so at P = 10, PED = -3 x (10/50) = -0.6.'
  },
  EC02Q114: {
    options: [
      'Eq: P=30, Q=60; Excess demand=80 units',
      'Eq: P=26.67, Q=66.67; Excess demand=40 units',
      'Eq: P=30, Q=60; Excess demand=40 units',
      'Eq: P=20, Q=80; No excess demand'
    ],
    explanation: 'At equilibrium, 60 - Q/2 = 10 + Q/4. Thus 50 = 3Q/4, so Q = 66.67 and P = 26.67. At the price ceiling of Rs.20, quantity demanded is 80 and quantity supplied is 40. Excess demand = 80 - 40 = 40 units.'
  },
  EC02Q118: {
    options: [
      'No, economist is wrong; Ed=-1.6; TR rises',
      'Yes, economist is right; Ed=-0.8; TR falls',
      'No, economist is wrong; Ed=-0.64; TR rises',
      'Yes, economist is right; Ed=-1.6; TR falls'
    ],
    correct: 1,
    explanation: 'Quantity rises from 200 to 210, a 5% increase. Price falls from Rs.80 to Rs.75, a 6.25% decrease. PED = 5/(-6.25) = -0.8, so demand is inelastic. Old total revenue = 200 x 80 = Rs.16,000 and new total revenue = 210 x 75 = Rs.15,750. Revenue falls, so the economist is correct.'
  },
  EC02Q120: {
    options: [
      'X=7; TU=45.5; Max TU=50',
      'X=3; TU=25.5; Max TU=50',
      'X=7; TU=24.5; Max TU=50',
      'X=10; TU=50; Max TU=50'
    ],
    correct: 0,
    explanation: 'MU = dTU/dX = 10 - X. Equilibrium requires MU = Px x MUm = 3 x 1 = 3, so 10 - X = 3 and X = 7. TU at X = 7 is 10(7) - 0.5(7^2) = 70 - 24.5 = 45.5. Maximum TU occurs when MU = 0, so X = 10 and maximum TU = 50.'
  },
  EC02Q133: {
    options: [
      'YED=-2; Demand rises to 21 units at Rs.3000',
      'YED=+2; Demand rises to 18 units at Rs.3000',
      'YED=-2; Demand rises to 18 units at Rs.3000',
      'YED=-2; Demand falls to 6 units at Rs.3000'
    ],
    correct: 0,
    explanation: 'Income falls from Rs.5,000 to Rs.4,000, a 20% fall, while demand rises from 10 to 14 units, a 40% rise. YED = 40/(-20) = -2, so X is an inferior good. If income falls from Rs.4,000 to Rs.3,000, the percentage fall is 25%; with YED = -2, demand rises by 50%. New demand = 14 x 1.5 = 21 units.'
  },
  EC02Q136: {
    explanation: 'Equilibrium requires MU = Px x MUm. At Px = Rs.10, 40 - 5Q = 10 x 2 = 20, so Q1 = 4. At Px = Rs.15, 40 - 5Q = 15 x 2 = 30, so Q2 = 2. PED = (Delta Q/Delta P) x (P/Q) = ((2 - 4)/(15 - 10)) x (10/4) = -1.0.'
  },
  EC02Q139: {
    correct: 0,
    explanation: 'At Rs.20, total expenditure = 400 x 20 = Rs.8,000. At Rs.25, total expenditure = 300 x 25 = Rs.7,500. Since total expenditure falls when price rises, the total expenditure method indicates elastic demand.'
  },
  EC02Q157: {
    options: [
      'P=10: Qm=35; P=15: Qm=27.5',
      'P=10: Qm=50; P=15: Qm=42.5',
      'P=10: Qm=55; P=15: Qm=42.5',
      'P=10: Qm=60; P=15: Qm=50'
    ],
    correct: 0,
    explanation: 'At P = Rs.10, Q1 = 30 - 10 = 20 and Q2 = 20 - 0.5(10) = 15, so market demand is 35. At P = Rs.15, Q1 = 15 and Q2 = 20 - 0.5(15) = 12.5, so market demand is 27.5.'
  },
  EC02Q159: {
    correct: 2,
    explanation: 'Using the total expenditure method, total expenditure falls from Rs.5,000 to Rs.4,800 when price falls from Rs.50 to Rs.40, so demand is inelastic over this change. Using the point percentage calculation with Q1 = 100 and Q2 = 120, Delta Q/Delta P = 20/(-10) = -2 and PED = -2 x (50/100) = -1.0.'
  },
  EC02Q169: {
    correct: 0,
    explanation: 'The demand curve with P-intercept Rs.80 and Q-intercept 40 is Q = 40 - 0.5P. At P = Rs.60, Q = 40 - 30 = 10. PED = -0.5 x (60/10) = -3. Solving PED = -3 gives -0.5P/(40 - 0.5P) = -3, which gives P = Rs.60.'
  },
  EC02Q171: {
    question: 'A consumer maximizes utility with income Rs.66, Px=Rs.9, Py=Rs.6. MU schedule for X: 54,45,36,27,18,9 and for Y: 42,36,30,24,18,12 (units 1-6). MUm=3. Find equilibrium (X, Y).',
    correct: 3,
    explanation: 'Equilibrium requires MUx/Px = MUy/Py = MUm. Required MUx = 9 x 3 = 27, which occurs at X = 4. Required MUy = 6 x 3 = 18, which occurs at Y = 5. The bundle costs 4 x 9 + 5 x 6 = Rs.66, matching income. Therefore, equilibrium is X = 4 and Y = 5.'
  },
  EC02Q179: {
    options: [
      '(a) Q=100; (b) PED=-1; (c) TR decreases',
      '(a) Q=100; (b) PED=-2; (c) TR increases',
      '(a) Q=80; (b) PED=-0.5; (c) TR decreases',
      '(a) Q=100; (b) PED=-0.5; (c) TR decreases'
    ],
    correct: 0,
    explanation: 'At P = Rs.20, Qd = 200 - 5(20) = 100 units. Point PED = (dQ/dP) x (P/Q) = -5 x (20/100) = -1. If price is cut to Rs.15, Qd = 125 and total revenue = 15 x 125 = Rs.1,875, compared with Rs.2,000 at P = Rs.20. Therefore, total revenue decreases.'
  },
  EC02Q181: {
    correct: 2,
    explanation: 'Quantity must rise from 500 to 650, a 30% increase. Since PED = percentage change in quantity / percentage change in price, -1.5 = 30% / percentage change in price. Therefore, percentage change in price = -20%. The new price is Rs.60 x 0.80 = Rs.48.'
  },
  EC02Q189: {
    options: [
      'P=10: Qm=180; P=35: Qm=40',
      'P=10: Qm=80; P=35: Qm=0',
      'P=10: Qm=160; P=35: Qm=10',
      'P=10: Qm=200; P=35: Qm=40'
    ],
    explanation: 'At P = Rs.10, Priya demands 80 - 4(10) = 40 and Rahul demands 60 - 2(10) = 40, so market demand is 80. At P = Rs.35, Priya demand is negative and is treated as zero; Rahul demand is also zero because P > Rs.30. Therefore, market demand is zero.'
  },
  EC02Q191: {
    options: [
      'Delta CS=Rs.1,375; Old TE=Rs.6,000; New TE=Rs.6,875',
      'Delta CS=Rs.1,125; Old TE=Rs.6,000; New TE=Rs.6,250',
      'Delta CS=Rs.875; Old TE=Rs.6,000; New TE=Rs.6,875',
      'Delta CS=Rs.1,375; Old TE=Rs.5,500; New TE=Rs.6,000'
    ],
    explanation: 'At P = Rs.30, Q = 500 - 10(30) = 200 and old total expenditure = 30 x 200 = Rs.6,000. At P = Rs.25, Q = 250 and new total expenditure = 25 x 250 = Rs.6,250. Change in consumer surplus is the trapezium between prices Rs.30 and Rs.25: ((200 + 250)/2) x 5 = Rs.1,125.'
  }
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
console.log(`Updated ${Object.keys(updates).length} EC02 questions.`);
