import fs from 'node:fs';

const file = 'questions/general-test/GT-S7.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const patches = {
  'GT-S7Q60': {
    explanation: '2021 total production = 100 + 90 + 60 + 40 = 290 thousand tonnes. 2023 total production = 130 + 110 + 85 + 55 = 380 thousand tonnes. Percentage increase = (380 - 290) / 290 x 100 = 90 / 290 x 100 = 31.03%, approximately 31.0%. Option C is correct.'
  },
  'GT-S7Q70': {
    options: ['40%', '46.67%', '50%', '55%'],
    correct: 1,
    explanation: 'Operating cost = Revenue - Profit. For 2021, operating cost = Rs.500 crore - Rs.50 crore = Rs.450 crore. For 2023, operating cost = Rs.750 crore - Rs.90 crore = Rs.660 crore. Percentage increase = (660 - 450) / 450 x 100 = 210 / 450 x 100 = 46.67%. Option B is correct.'
  },
  'GT-S7Q79': {
    correct: 2,
    explanation: 'Dept A three-year total = 80 + 100 + 120 = Rs.300 crore. Dept B three-year total = 70 + 100 + 120 = Rs.290 crore. Therefore the ratio of Dept A to Dept B is 300:290, which simplifies to 30:29. Option C is correct.'
  },
  'GT-S7Q87': {
    correct: 1,
    explanation: 'Total accidents in 2023 = 1535. Average monthly accidents = 1535 / 12 = 127.92, approximately 127.9. Among the given choices, 127.5 is the nearest value. Option B is correct.'
  },
  'GT-S7Q101': {
    explanation: 'For 2023, boys pass rate = 88% and girls pass rate = 93%. Since there are 600 boys and 400 girls, use a weighted average: (600 x 88 + 400 x 93) / 1000 = (52,800 + 37,200) / 1000 = 90%. Option C is correct.'
  },
  'GT-S7Q111': {
    options: ['32.5%', '33.33%', '34.0%', '35.0%'],
    correct: 1,
    explanation: "Q4 total sales = Samsung 55 + Apple 30 + Xiaomi 75 + Vivo 35 + Others 30 = 225 lakh units. Xiaomi's Q4 share = 75 / 225 x 100 = 33.33%. Option B is correct."
  },
  'GT-S7Q116': {
    options: ['15.25%', '15.58%', '16.0%', '16.5%'],
    correct: 1,
    explanation: "Current Q4 Apple sales = 30 lakh. After a 20% increase, Apple sales = 30 x 1.20 = 36 lakh. Total Q4 sales also increase by 6 lakh, from 225 lakh to 231 lakh. Revised Apple share = 36 / 231 x 100 = 15.58%. Option B is correct."
  },
  'GT-S7Q133': {
    options: ['25.0%', '25.36%', '26.0%', '27.0%'],
    correct: 1,
    explanation: 'Total 2022 electricity consumption = 6000 + 2500 + 3500 + 1800 = 13,800 units. Residential consumption = 3,500 units. Residential share = 3500 / 13800 x 100 = 25.36%. Option B is correct.'
  },
  'GT-S7Q151': {
    options: ['Rs.5,500 crore', 'Rs.5,800 crore', 'Rs.6,000 crore', 'Rs.6,200 crore'],
    correct: 2,
    explanation: 'IT employees = 50 thousand = 50,000 employees. Average salary = Rs.12 lakh per annum. Total annual salary outgo = 50,000 x Rs.12 lakh = Rs.6,00,000 lakh = Rs.6,000 crore. Option C is correct.'
  },
  'GT-S7Q155': {
    options: ['10.32 lakh', '10.64 lakh', '11.2 lakh', '11.5 lakh'],
    correct: 2,
    explanation: 'Weighted salary total = (50 x 12) + (20 x 15) + (10 x 8) + (30 x 9) + (15 x 10) = 600 + 300 + 80 + 270 + 150 = 1400. Total employees in the same thousand-unit base = 50 + 20 + 10 + 30 + 15 = 125. Weighted average salary = 1400 / 125 = 11.2 lakh. Option C is correct.'
  },
  'GT-S7Q166': {
    options: ['4.28%', '5.0%', '5.88%', '13.33%'],
    correct: 3,
    explanation: 'Total sales in 2022 = 420 + 480 = Rs.900 crore. Total sales in 2023 = 500 + 520 = Rs.1,020 crore. Percentage growth = (1020 - 900) / 900 x 100 = 120 / 900 x 100 = 13.33%. Option D is correct.'
  },
  'GT-S7Q190': {
    options: ['Combined rate 416.5/lakh', 'Combined 413.3/lakh', 'Combined 420/lakh', 'Combined 407/lakh'],
    correct: 3,
    explanation: 'Delhi population = 3 crore = 300 lakh. Delhi crimes = 488 x 300 = 146,400. Bangalore population = 1.5 crore = 150 lakh. Bangalore crimes = 245 x 150 = 36,750. Total crimes = 183,150 and total population = 450 lakh. Combined crime rate = 183,150 / 450 = 407 per lakh. Option D is correct.'
  },
  'GT-S7Q191': {
    options: ['41.67%', '42.55%', '43.48%', '44.5%'],
    correct: 1,
    explanation: 'Total renewable energy users = 120 + 85 + 200 + 60 + 5 = 470 million. Hydro users = 200 million. Hydro share = 200 / 470 x 100 = 42.55%. Option B is correct.'
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
console.log(`Patched ${changed} GT-S7 questions`);
