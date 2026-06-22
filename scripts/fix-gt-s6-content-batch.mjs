import { readFile, writeFile } from 'node:fs/promises';

const file = 'questions/general-test/GT-S6.json';
const data = JSON.parse(await readFile(file, 'utf8'));

const fixes = new Map(Object.entries({
  'GT-S6Q04': {
    options: ['6 years', '9 years', '12 years', '18 years'],
    correct: 3,
    explanation: 'Let present ages be 3k, 4k and 5k. Six years ago, their sum was 54, so (3k - 6) + (4k - 6) + (5k - 6) = 54. Thus 12k - 18 = 54 and k = 6. Present ages of A and C are 18 and 30. After n years, (18 + n)/(30 + n) = 3/4. Solving gives 72 + 4n = 90 + 3n, so n = 18.'
  },
  'GT-S6Q05': {
    options: ['₹4,000', '₹6,000', '₹4,852.94', '₹3,000'],
    correct: 2,
    explanation: 'Let the amount invested at compound interest be x. Simple interest on the remaining amount for 2 years = 0.20(12000 - x). Compound interest at 12% for 2 years = x[(1.12)^2 - 1] = 0.2544x. So 0.20(12000 - x) + 0.2544x = 2664. This gives 2400 + 0.0544x = 2664, so x = 264/0.0544 = ₹4,852.94 approximately.'
  },
  'GT-S6Q07': {
    options: ['IS', 'IR', 'HS', 'JR'],
    correct: 1,
    explanation: 'The first letters are A, C, E, G, increasing by 2 positions, so the next first letter is I. The second letters are Z, X, V, T, decreasing by 2 positions, so the next second letter is R. Therefore, the next term is IR.'
  },
  'GT-S6Q13': {
    options: ['7.6%', '8%', '6.5%', '7%'],
    correct: 0,
    explanation: 'Using A = P(1 + r/100)^2, 9261 = 8000(1 + r/100)^2. Therefore, (1 + r/100)^2 = 9261/8000 = 1.157625. Taking the square root gives 1 + r/100 = 1.0759298 approximately, so r = 7.59%, or about 7.6%.'
  },
  'GT-S6Q15': {
    options: ['10 seconds', '15 seconds', '12.27 seconds', '18 seconds'],
    correct: 2,
    explanation: 'To cross completely, the trains together cover 200 + 250 = 450 m. Since they move in opposite directions, relative speed = 60 + 72 = 132 km/h = 132 x 5/18 = 36.67 m/s. Time = 450 / 36.67 = 12.27 seconds approximately.'
  },
  'GT-S6Q25': {
    options: ['₹9,447.84', '₹9,720.00', '₹8,957.25', '₹9,112.50'],
    correct: 0,
    explanation: 'From ₹5,000 becoming ₹5,832 in 2 years, (1 + r)^2 = 5832/5000 = 1.1664, so 1 + r = 1.08 and r = 8%. For ₹7,500 in 3 years, amount = 7500 x (1.08)^3 = 7500 x 1.259712 = ₹9,447.84.'
  },
  'GT-S6Q26': {
    options: ['₹22,000', '₹32,500', '₹35,000', '₹27,500'],
    correct: 0,
    explanation: 'Profit per unit is ₹10, ₹12, ₹14, ₹16 and ₹18 from January to May. Monthly profits are 200 x 10 = ₹2,000, 250 x 12 = ₹3,000, 300 x 14 = ₹4,200, 350 x 16 = ₹5,600, and 400 x 18 = ₹7,200. Total profit = ₹22,000.'
  },
  'GT-S6Q27': {
    options: ['40', '50', '60', '100'],
    correct: 3,
    explanation: 'Let boys = 3x and girls = 2x. After 10 boys leave and 10 girls join, the ratio becomes 1:1, so 3x - 10 = 2x + 10. Hence x = 20. Original number of students = 3x + 2x = 5x = 100.'
  },
  'GT-S6Q35': {
    options: ['Father: 40, Son: 12', 'Father: 60, Son: 20', 'Father: 30, Son: 10', 'Father: 36, Son: 12'],
    correct: 1,
    explanation: 'Let the son’s present age be x, so the father’s present age is 3x. Ten years ago, 3x - 10 = 5(x - 10). Solving gives 3x - 10 = 5x - 50, so x = 20. Therefore, the son is 20 and the father is 60.'
  },
  'GT-S6Q37': {
    options: ['25 and 40', '60 and 96', '20 and 32', '35 and 56'],
    correct: 1,
    explanation: 'Let the numbers be 5x and 8x. After subtracting 6 from each, (5x - 6)/(8x - 6) = 3/5. Thus 5(5x - 6) = 3(8x - 6), giving 25x - 30 = 24x - 18 and x = 12. The numbers are 60 and 96.'
  },
  'GT-S6Q48': {
    options: ['400', '360', '450', '500'],
    correct: 1,
    explanation: 'If 20% failed in both, then 80% passed in at least one subject. Using P(M union S) = P(M) + P(S) - P(M intersection S), 80% = 60% + 70% - P(both). Therefore, P(both) = 50%. Since 180 students passed in both, 50% of the class is 180, so total students = 360.'
  },
  'GT-S6Q51': {
    options: ['76', '80', '72', '84'],
    correct: 0,
    explanation: '15% of 240 = 36. 25% of 160 = 40. Their sum is 36 + 40 = 76.'
  },
  'GT-S6Q57': {
    options: ['₹6,80,000', '₹14,40,000', '₹16,00,000', '₹13,20,000'],
    correct: 0,
    explanation: 'Phase 1 requires 40 x 15 = 600 worker-days. Phase 2 requires 30 x 20 = 600 worker-days. Phase 3 requires 50 x 10 = 500 worker-days. Total worker-days = 1,700. At ₹400 per worker per day, total labour cost = 1,700 x ₹400 = ₹6,80,000.'
  },
  'GT-S6Q70': {
    options: ['6', '7', '8', '9'],
    correct: 3,
    explanation: 'Let x + y = 6k, y + z = 7k and z + x = 8k. Adding gives 2(x + y + z) = 21k. Since x + y + z = 21, we get 42 = 21k, so k = 2. Thus x + y = 12. Therefore, z = 21 - 12 = 9.'
  },
  'GT-S6Q80': {
    options: ['182:30', '13:3', '26:3', '52:9'],
    correct: 2,
    explanation: 'Let passed:failed = 4k:k. After a 30% increase, passed students become 4k x 1.3 = 5.2k. After a 40% decrease, failed students become 0.6k. New ratio = 5.2k:0.6k = 52:6 = 26:3.'
  },
  'GT-S6Q89': {
    options: ['2,80,000', '2,83,382', '2,50,000', '2,75,000'],
    correct: 1,
    explanation: 'If the current population is 3,28,050 after increasing at 5% per annum for 3 years, then population 3 years ago = 3,28,050 / (1.05)^3 = 3,28,050 / 1.157625 = 2,83,381.92, approximately 2,83,382.'
  },
  'GT-S6Q93': {
    options: ['₹28,000', '₹27,000', '₹29,000', '₹31,366.34'],
    correct: 3,
    explanation: 'Profit is shared in the ratio of capital x time. A invests 5 parts for 8 months, so A = 40. B invests 6 parts for 10 months and half, or 3 parts, for the remaining 2 months, so B = 60 + 6 = 66. C invests 8 parts for 12 months, so C = 96. Ratio = 40:66:96 = 20:33:48. B’s share = 33/101 x ₹96,000 = ₹31,366.34 approximately.'
  },
  'GT-S6Q96': {
    options: ['₹14,000', '₹17,400', '₹12,000', '₹21,000'],
    correct: 1,
    explanation: 'Y’s income is ₹63,000 and the income ratio X:Y is 9:7, so X’s income = 9/7 x ₹63,000 = ₹81,000. X spends ₹52,000, so X saves ₹29,000. Since savings ratio X:Y is 5:3, Y’s saving = 3/5 x ₹29,000 = ₹17,400.'
  },
  'GT-S6Q97': {
    options: ['2 hours', '3 hours', '1.5 hours', '4 hours'],
    correct: 0,
    explanation: 'They are moving towards each other, so relative speed = 60 + 30 = 90 km/h. Time to meet = distance / relative speed = 180 / 90 = 2 hours.'
  },
  'GT-S6Q103': {
    options: ['30 km/h', '37.5 km/h', '60 km/h', '50 km/h'],
    correct: 1,
    explanation: 'Let the original speed be v km/h. The distance is 8v. With speed increased by 12.5 km/h, the same distance is 6(v + 12.5). Therefore, 8v = 6(v + 12.5), so 2v = 75 and v = 37.5 km/h.'
  },
  'GT-S6Q104': {
    options: ['₹486.49', '₹600', '₹400', '₹300'],
    correct: 0,
    explanation: 'A:B = 2:3 and B:C = 5:4. Making B common gives A:B:C = 10:15:12. Total parts = 37. The difference between C and A is 2 parts, so the difference = 2/37 x ₹9,000 = ₹486.49 approximately.'
  },
  'GT-S6Q110': {
    options: ['207', '198', '216', '192'],
    correct: 0,
    explanation: 'Girls = 40% of 1,200 = 480 and boys = 720. Sports participants are 75% of boys = 540 and 60% of girls = 288, total 828. A 25% increase means target participation = 828 x 1.25 = 1,035. Additional students needed = 1,035 - 828 = 207.'
  },
  'GT-S6Q113': {
    options: ['12 days', '11 days', '12.67 days', '13 days'],
    correct: 0,
    explanation: 'P completes 1/10 of the work per day and Q completes 1/15 per day. In a 2-day cycle, they complete 1/10 + 1/15 = 1/6 of the work. Six such cycles complete the whole work, so the total time is 6 x 2 = 12 days.'
  },
  'GT-S6Q117': {
    options: ['94', '96', '98', '92'],
    correct: 0,
    explanation: 'The differences are 1, 4, 9, 16 and 25, which are 1², 2², 3², 4² and 5². The next difference is 6² = 36. Therefore, the next term is 58 + 36 = 94.'
  }
}));

let changed = 0;
for (const question of data.questions) {
  const fix = fixes.get(question.id);
  if (!fix) continue;
  if (!('correct_content_review_original' in question) && question.correct !== fix.correct) {
    question.correct_content_review_original = question.correct;
  }
  question.options = fix.options;
  question.correct = fix.correct;
  question.explanation = fix.explanation;
  changed += 1;
}

await writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Updated ${changed} GT-S6 questions in ${file}`);
