import fs from 'node:fs';

const file = 'questions/general-test/GT-S9.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const patches = {
  'GT-S9Q06': {
    correct: 1,
    explanation: 'Total solar power incident on the panel = irradiance x area = 900 x 2 = 1,800 W. Electrical power output = efficiency x incident power = 0.18 x 1,800 = 324 W. Option B is correct.'
  },
  'GT-S9Q13': {
    options: ['2,578 kW', '4,347 kW', '1,532 kW', '3,155 kW'],
    correct: 3,
    explanation: 'Rotor area = pi x 40^2 = 5,026.55 m2. Total wind power = 0.5 x 1.225 x 5,026.55 x 12^3 = about 5,320,200 W. Betz-limit maximum = 0.593 x 5,320,200 = about 3,154,879 W, or 3,155 kW. Option D is correct.'
  },
  'GT-S9Q55': {
    options: [
      "0.5°C; water's high specific heat means large energy input causes small temperature change, moderating climate",
      "2.0°C; water's high specific heat means it acts as a heat buffer and moderates climate",
      '20°C; water is a poor heat buffer',
      '0.02°C; water requires enormous energy for any temperature change'
    ],
    correct: 1,
    explanation: 'Using Q = mc delta T, delta T = Q/(mc) = 8.4 x 10^9 / (10^6 x 4,200) = 8.4 x 10^9 / 4.2 x 10^9 = 2.0°C. Because water has a high specific heat, even a large energy input causes a relatively limited temperature rise compared with many other substances, helping water bodies moderate climate. Option B is correct.'
  },
  'GT-S9Q97': {
    options: ['610.7 g CO2/kWh', '450.0 g CO2/kWh', '673.5 g CO2/kWh', '729.0 g CO2/kWh'],
    correct: 0,
    explanation: 'Current grid emission intensity is the weighted average: (0.65 x 820) + (0.15 x 490) + (0.10 x 24) + (0.10 x 18) = 533 + 73.5 + 2.4 + 1.8 = 610.7 g CO2/kWh. Option A is correct.'
  },
  'GT-S9Q120': {
    correct: 0,
    explanation: 'Required additional capacity = 500 GW - 180 GW = 320 GW. From 2023 to 2030 is 7 years, so annual capacity addition required = 320 / 7 = 45.7 GW/year. Option A is correct.'
  },
  'GT-S9Q161': {
    correct: 2,
    explanation: 'Daily generation = 500 kW x 5 hours = 2,500 kWh. Local consumption = 60% x 2,500 = 1,500 kWh, saving 1,500 x Rs.8 = Rs.12,000. Grid export = 40% x 2,500 = 1,000 kWh, earning 1,000 x Rs.3 = Rs.3,000. Total daily revenue = Rs.12,000 + Rs.3,000 = Rs.15,000. Option C is correct.'
  },
  'GT-S9Q167': {
    options: ['9,710 kJ (2,319 kcal)', '8,930 kJ (2,133 kcal)', '12,240 kJ (2,925 kcal)', '6,820 kJ (1,629 kcal)'],
    correct: 1,
    explanation: 'Energy from carbohydrates = 300 x 17 = 5,100 kJ. Energy from proteins = 80 x 17 = 1,360 kJ. Energy from fats = 65 x 38 = 2,470 kJ. Total energy = 5,100 + 1,360 + 2,470 = 8,930 kJ. In kcal, 8,930 / 4.186 = about 2,133 kcal. Option B is correct.'
  },
  'GT-S9Q171': {
    explanation: 'Using the Henderson-Hasselbalch equation, pH = pKa + log([HCO3-]/[CO2]). Here pH = 6.35 + log(120). Since log(120) = 2.079, pH = 6.35 + 2.079 = 8.429, approximately 8.43. Option A is correct.'
  },
  'GT-S9Q173': {
    options: [
      'Scenario A: Coal — approximately 215 Mt CO2',
      'Scenario C: Nuclear — approximately 2.84 Mt CO2 over 30 operational years',
      'Scenario B: Solar — approximately 1.46 Mt CO2 over 37 operational years',
      'All three scenarios produce identical total CO2 over 40 years'
    ],
    correct: 2,
    explanation: 'Coal energy = 40 x 8,760 x 0.75 x 1,000 MW = 262,800,000 MWh = 2.628 x 10^11 kWh. CO2 = 2.628 x 10^11 x 820 g = about 215 Mt. Solar energy = 37 x 8,760 x 0.25 x 1,000 MW = 81,030,000 MWh = 8.103 x 10^10 kWh. CO2 = 8.103 x 10^10 x 18 g = about 1.46 Mt. Nuclear energy = 30 x 8,760 x 0.90 x 1,000 MW = 236,520,000 MWh = 2.3652 x 10^11 kWh. CO2 = 2.3652 x 10^11 x 12 g = about 2.84 Mt. The lowest total lifecycle CO2 is solar. Option C is correct.'
  },
  'GT-S9Q178': {
    question: 'Study the following ecological matrix and determine which cell (marked ?) has the correct value:\n\n          | Trophic Level 1 | Trophic Level 2 | Trophic Level 3\nEnergy    | 10,000 kcal     | 1,000 kcal      | 100 kcal\nBiomass   | 1,000 kg        | 100 kg          | 10 kg\nNumbers   | 1,000,000       | 10,000          | ?\n\nThe numbers row follows the same ratio from Level 1 to Level 2 and from Level 2 to Level 3. What is the value of ? and what additional information would change this assumption?',
    correct: 1,
    explanation: 'In the numbers row, Level 1 to Level 2 changes from 1,000,000 to 10,000, a 100:1 ratio. Applying the same ratio again gives 10,000 / 100 = 100. This assumes a simple proportional numbers pyramid. Real ecological pyramids of numbers can deviate when organism size differs greatly across trophic levels, such as a single large tree supporting many insects. Option B is correct.'
  },
  'GT-S9Q184': {
    options: ['~14 days', '~25 days', '~0.02 days (about 30 minutes)', '~3 days'],
    correct: 2,
    explanation: 'Total petroleum mass = 5,000 L x 0.85 kg/L = 4,250 kg = 4,250,000 g. Initial degradation capacity = 2 x 10^9 bacteria x 0.1 g per bacterium per day = 2 x 10^8 g/day. Even without allowing for bacterial growth, theoretical cleanup time = 4,250,000 / 200,000,000 = 0.02125 days, about 0.51 hours or 30 minutes. With growth, it would not be longer. Option C is correct.'
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
console.log(`Patched ${changed} GT-S9 questions`);
