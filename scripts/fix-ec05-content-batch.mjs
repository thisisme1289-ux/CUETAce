import { readFile, writeFile } from 'node:fs/promises';

const file = 'questions/economics/EC05.json';
const data = JSON.parse(await readFile(file, 'utf8'));

const fixes = new Map(Object.entries({
  EC05Q43: {
    options: ['P = 25', 'P = 27', 'P = 28.33', 'P = 31.67'],
    correct: 3,
    explanation: 'New equilibrium is found by equating demand with the new supply: 600 - 10P = -350 + 20P. Thus 950 = 30P and P = 31.67 approximately. The drought reduces supply and raises equilibrium price.'
  },
  EC05Q45: {
    options: ['The ceiling is non-binding; market clears at Rs.18', 'A surplus of 80 units is created at P = Rs.15', 'A shortage of 60 units is created at P = Rs.15', 'A shortage of 50 units is created at P = Rs.15'],
    correct: 2,
    explanation: 'The price ceiling of Rs.15 is below the equilibrium price Rs.18, so it is binding. At P = 15, Qd = 400 - 8(15) = 280 and Qs = 40 + 12(15) = 220. Shortage = 280 - 220 = 60 units.'
  },
  EC05Q67: {
    options: ['0.52 units each', '0.64 units each', '0.72 units each', '0.80 units each'],
    correct: 0,
    explanation: 'At the ceiling P = 16, supply is Qs = 40 + 4(16) = 104 units. If this supply is rationed equally among 200 consumers, each consumer receives 104 / 200 = 0.52 units.'
  },
  EC05Q73: {
    correct: 1,
    explanation: 'A decrease in demand lowers price and quantity. A decrease in supply raises price but lowers quantity. If the demand and supply decreases are of equal magnitude, their price effects cancel, while both shifts reduce equilibrium quantity. Therefore price is unchanged and quantity is lower.'
  },
  EC05Q75: {
    options: ['200 workers', '400 workers', '600 workers', '3,200 workers'],
    correct: 3,
    explanation: 'At the minimum wage W = 400, labor demanded is Ld = 5000 - 10(400) = 1000 and labor supplied is Ls = 1000 + 8(400) = 4200. Unemployment = Ls - Ld = 4200 - 1000 = 3,200 workers.'
  },
  EC05Q86: {
    options: ['Rs.4.5', 'Rs.6.0', 'Rs.7.5', 'Rs.15.0'],
    correct: 3,
    explanation: 'Pre-tax equilibrium is P = 40 and Q = 300. With tax Rs.3, quantity falls to 290. Deadweight loss = 1/2 x tax x fall in quantity = 1/2 x 3 x 10 = Rs.15.'
  },
  EC05Q102: {
    options: ['CS = Rs.288', 'CS = Rs.384', 'CS = Rs.396', 'CS = Rs.480'],
    correct: 2,
    explanation: 'At the ceiling P = 54, supply determines quantity: 54 = 30 + 2Q, so Q = 12. Consumer surplus is the triangle below demand and above price from Q = 0 to Q = 12. Demand choke price is Rs.120. CS = 1/2 x (120 - 54) x 12 = Rs.396.'
  },
  EC05Q105: {
    options: ['Rs.78', 'Rs.82', 'Rs.83', 'Rs.85'],
    correct: 0,
    explanation: 'Let Pc be the price paid by consumers and Pp = Pc - 8 be the price received by producers. Equilibrium requires 800 - 5Pc = 200 + 3(Pc - 8). Thus 800 - 5Pc = 176 + 3Pc, so 624 = 8Pc and Pc = Rs.78.'
  },
  EC05Q112: {
    options: ['About 18%', '20%', 'About 26%', 'About 30%'],
    correct: 1,
    explanation: 'Equilibrium price is Rs.25, so the ceiling is Rs.20. At P = 20, Qd = 1000 and Qs = 800. Shortage = 200. Percentage of consumers who want the good but cannot obtain it = shortage / Qd = 200 / 1000 = 20%.'
  },
  EC05Q115: {
    options: ['P*=20, Q*=560, PED=-0.71', 'P*=26, Q*=440, PED=-1.18', 'P*=28, Q*=400, PED=-1.4', 'P*=30, Q*=360, PED=-1.67'],
    correct: 0,
    explanation: 'Equilibrium: 960 - 20P = -240 + 40P, so 1200 = 60P and P* = 20. Quantity Q* = 960 - 20(20) = 560. PED = (dQd/dP) x P/Q = -20 x 20/560 = -0.71 approximately.'
  },
  EC05Q116: {
    options: ['P = 10', 'P = sqrt(150), about 12.25', 'P = 15', 'P = 8'],
    correct: 1,
    explanation: 'At equilibrium, 400 - 2P^2 = P^2 - 50. Therefore 450 = 3P^2, P^2 = 150, and P = sqrt(150) = 12.25 approximately.'
  },
  EC05Q119: {
    options: ['s = Rs.3', 's = Rs.4', 's = Rs.5', 's = Rs.24'],
    correct: 3,
    explanation: 'At ceiling price Rs.24, Qd = 1800 - 30(24) = 1080 and Qs = 600 + 10(24) = 840. To remove the shortage, supply with subsidy must equal 1080: 600 + 10(24 + s) = 1080. Thus 840 + 10s = 1080 and s = Rs.24.'
  },
  EC05Q132: {
    options: ['Depends on magnitudes of both policy effects', 'Price will definitely rise as ceiling is removed', 'Price will definitely fall as supply increases', 'Price remains unchanged as both effects exactly offset'],
    correct: 0,
    explanation: 'Removing a price ceiling tends to let price rise toward equilibrium, while increasing supply tends to reduce equilibrium price. The net effect depends on the relative size of these two effects.'
  },
  EC05Q137: {
    options: ['P = 35', 'P = 41.67', 'P = 45', 'P = 50'],
    correct: 1,
    explanation: 'Total demand is Qd = (100 - P) + (150 - 2P) = 250 - 3P. Equilibrium requires 250 - 3P = 3P. Thus 250 = 6P and P = 41.67 approximately.'
  },
  EC05Q138: {
    options: ['60 units', '70 units', '90 units', '105 units'],
    correct: 1,
    explanation: 'At P = 30, Qd = 250 - 3(30) = 160 and Qs = 3(30) = 90. Shortage = 160 - 90 = 70 units.'
  },
  EC05Q161: {
    options: ['Old shortage=60; New shortage=120', 'Old shortage=80; New shortage=160', 'Old shortage=60; New shortage=260', 'Old shortage=40; New shortage=80'],
    correct: 2,
    explanation: 'At the ceiling P = 18, old demand gives Qd = 800 - 180 = 620 and supply gives Qs = 200 + 360 = 560, so old shortage = 60. With new demand, Qd = 1000 - 180 = 820 while Qs remains 560. New shortage = 820 - 560 = 260.'
  },
  EC05Q163: {
    options: ['No remaining shortage; surplus of 12 units', '40 units', '60 units', '80 units'],
    correct: 0,
    explanation: 'At ceiling P = 48, Qd = 600 - 6(48) = 312 and domestic Qs = -120 + 8(48) = 264. Initial shortage is 48 units. Imports add 60 units, giving total available supply 324, which exceeds demand by 12 units. Therefore no shortage remains.'
  },
  EC05Q167: {
    options: ['P_c=67, Q**=46', 'P_c=51, Q**=78', 'P_c=53, Q**=74', 'P_c=55, Q**=70'],
    correct: 0,
    explanation: 'A consumer subsidy of Rs.9 shifts effective demand upward to P = 99 - 0.5Q in terms of the price received by sellers. Equilibrium: 99 - 0.5Q = 30 + Q, so 69 = 1.5Q and Q** = 46. Producer price is 30 + 46 = 76. Consumer price paid net of subsidy is 76 - 9 = Rs.67.'
  },
  EC05Q173: {
    options: ['P(2) = Rs.0', 'P(2) = Rs.15', 'P(2) = Rs.20', 'P(2) = Rs.25'],
    correct: 0,
    explanation: 'Given P(1) = 30, supply in period 2 is Qs(2) = -100 + 20(30) = 500. Market clearing in period 2 requires 500 = 500 - 10P(2). Therefore P(2) = 0.'
  },
  EC05Q181: {
    correct: 0,
    explanation: 'Autarky equilibrium price is found from 1000 - 10P = 200 + 5P, giving P* = 53.33. Since the world price Rs.40 is below domestic equilibrium price, the country imports. At P = 40, Qd = 600 and Qs = 400. Imports = 600 - 400 = 200 units.'
  },
  EC05Q183: {
    options: ['PES = 1.0', 'PES = 1.36', 'PES = 2.0', 'PES = 2.5'],
    correct: 1,
    explanation: 'Equilibrium: 2000 - 30P = -400 + 50P, so P* = 30 and Q* = 1100. PES = (dQs/dP) x P/Q = 50 x 30/1100 = 1.36 approximately.'
  },
  EC05Q184: {
    options: ['At P=Rs.20: 340 units demanded', 'At P=Rs.20: 420 units consumed', 'At P=Rs.20: 220 units consumed', 'At P=Rs.20: 260 units consumed'],
    correct: 2,
    explanation: 'At P = 20, Qd = 500 - 8(20) = 340 and Qs = 100 + 6(20) = 220. Actual consumption is limited by available domestic supply, so consumers consume 220 units.'
  },
  EC05Q198: {
    options: ['CS = Rs.19,360', 'CS = Rs.24,200', 'CS = Rs.27,280', 'CS = Rs.1,01,200'],
    correct: 3,
    explanation: 'Demand inverse is P = 50 - Q/200. Official price is Rs.16 and quantity obtained is 4,400. Consumer surplus = integral from 0 to 4,400 of (50 - Q/200 - 16)dQ = [34Q - Q^2/400] from 0 to 4,400 = Rs.1,01,200.'
  },
  EC05Q200: {
    options: ['s = Rs.3.33', 's = Rs.4.50', 's = Rs.5.00', 's = Rs.10.71'],
    correct: 3,
    explanation: 'Equilibrium price is P* = 7000/150 = Rs.46.67, so the ceiling is P_c = Rs.41.67. At the ceiling, Qd = 2667 and Qs = 1917, so shortage = 750. A producer subsidy must increase supply by 750 units. Since supply slope is 70, 70s = 750 and s = Rs.10.71 approximately.'
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
console.log(`Updated ${changed} EC05 questions in ${file}`);
