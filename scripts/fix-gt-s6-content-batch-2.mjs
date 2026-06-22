import fs from 'node:fs';

const file = 'questions/general-test/GT-S6.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const questions = Array.isArray(data) ? data : data.questions;

const updates = {
  'GT-S6Q127': {
    options: ['20 days', '25 days', '22 days', '16.67 days'],
    correct: 3,
    explanation: 'Worker A produces 100 x 20 = 2,000 units. Worker B produces 80 x 25 = 2,000 units. Remaining units = 6,000 - 2,000 - 2,000 = 2,000. Worker C produces 120 units per day, so required days = 2,000/120 = 16.67 days.'
  },
  'GT-S6Q128': {
    correct: 2,
    explanation: 'Let the son\'s present age be s, so the father\'s present age is s + 30. Five years ago, s + 25 = 4(s - 5). Thus s + 25 = 4s - 20, so 3s = 45 and s = 15. Father\'s age is 45. After 10 years, their ages will be 25 and 55, so the sum will be 80 years.'
  },
  'GT-S6Q129': {
    explanation: 'Using alligation, the ratio of cheaper rice to dearer rice is (dearer price - mean price) : (mean price - cheaper price). Therefore, Rs.40 rice : Rs.56 rice = (56 - 52) : (52 - 40) = 4 : 12 = 1 : 3.'
  },
  'GT-S6Q131': {
    correct: 1,
    explanation: 'Net filling rate = 1/3 + 1/4 - 1/2 = 4/12 + 3/12 - 6/12 = 1/12 tank per hour. Since the net rate is positive, the tank will fill in 12 hours.'
  },
  'GT-S6Q134': {
    question: 'The ratio of monthly incomes of X and Y is 5:4. The ratio of their monthly expenditures is 9:7. Both save Rs.2,000 per month. What is Y\'s monthly income?',
    explanation: 'Let incomes be 5k and 4k, and expenditures be 9m and 7m. Since both save Rs.2,000: 5k - 9m = 2,000 and 4k - 7m = 2,000. Subtracting gives k - 2m = 0, so k = 2m. From 4k - 7m = 2,000, substitute k = 2m: 8m - 7m = 2,000, so m = 2,000 and k = 4,000. Y\'s income = 4k = Rs.16,000.'
  },
  'GT-S6Q135': {
    options: ['29', '38', '86', '56'],
    explanation: 'The number is 4 less than a common multiple of 6, 9, and 15 because 6 - 2 = 9 - 5 = 15 - 11 = 4. LCM(6, 9, 15) = 90, so the smallest such number is 90 - 4 = 86. Check: 86 leaves remainders 2, 5, and 11 respectively.'
  },
  'GT-S6Q137': {
    options: ['5:2', '2:3', '1:2', '4:3'],
    explanation: 'Silver fraction in the first alloy is 3/10 and in the second alloy is 1/4. Desired silver fraction is 2/7. By alligation, first alloy : second alloy = (2/7 - 1/4) : (3/10 - 2/7) = (1/28) : (1/70) = 70 : 28 = 5 : 2.'
  },
  'GT-S6Q141': {
    options: ['52 years', '65 years', '26 years', '78 years'],
    explanation: 'Let the present ages be 8k and 5k. After 6 years, (8k + 6)/(5k + 6) = 11/8. Thus 8(8k + 6) = 11(5k + 6), giving 64k + 48 = 55k + 66, so 9k = 18 and k = 2. Present ages are 16 and 10; their sum is 26 years.'
  },
  'GT-S6Q144': {
    explanation: 'Total work = 20 x 15 = 300 man-days. In the first 5 days, work completed = 20 x 5 = 100 man-days. Remaining work = 200 man-days. After 10 men leave and 15 join, there are 25 men. Time required = 200/25 = 8 days.'
  },
  'GT-S6Q149': {
    correct: 0,
    explanation: 'Separate the series into odd and even positions. Odd positions are 2, 10, 26, 50 with differences 8, 16, 24. Even positions are 3, 15, 35 with differences 12 and 20; the next difference is 28. Therefore, the missing even-position term is 35 + 28 = 63.'
  },
  'GT-S6Q156': {
    options: ['17.5 minutes', '20 minutes', '15 minutes', '11.67 minutes'],
    correct: 3,
    explanation: 'In 5 minutes, pipes A and B together fill 5 x (1/20 + 1/30) = 5 x 5/60 = 5/12 of the tank. Remaining tank = 7/12. Pipe A alone fills at 1/20 tank per minute, so time needed = (7/12)/(1/20) = 35/3 = 11.67 minutes.'
  },
  'GT-S6Q160': {
    correct: 1,
    explanation: 'Let acid = 5x and water = 3x. After adding 16 litres of water, 5x : (3x + 16) = 5 : 7. Therefore, 35x = 15x + 80, so x = 4. Initial mixture = 8x = 32 litres.'
  },
  'GT-S6Q165': {
    options: ['Can\'t be determined', '45 years', '60 years', '55 years'],
    correct: 1,
    explanation: 'Let the man\'s age be m and his father\'s age be f. Given m = 0.4f. In 5 years, m + 5 = 0.46(f + 5). Substituting gives 0.4f + 5 = 0.46f + 2.3, so 2.7 = 0.06f and f = 45. The father\'s present age is 45 years.'
  },
  'GT-S6Q171': {
    options: ['30.42 years', '31 years', '30.25 years', '29.75 years'],
    correct: 0,
    explanation: 'Total age in Dept X = 40 x 30 = 1,200. Dept Y = 30 x 35 = 1,050. Dept Z = 50 x 28 = 1,400. Total age = 3,650 and total employees = 120. Overall average age = 3,650/120 = 30.42 years.'
  },
  'GT-S6Q173': {
    options: ['6 km', '16 km', '10 km', '4 km'],
    explanation: 'After 2 hours, A is 8 km from the start and B is 10 km from the start. B turns back and takes 10/5 = 2 more hours to return. At that time, A has travelled for 4 hours total, so A is 4 x 4 = 16 km from the start. B is at the start, so they are 16 km apart.'
  },
  'GT-S6Q177': {
    options: ['Loss of 1.5%', 'Profit of 1.5%', 'Loss of 4.35%', 'Profit of 15.43%'],
    correct: 3,
    explanation: 'Marked price = 1,000 x 1.35 = Rs.1,350. After a 10% discount, selling price = 1,350 x 0.90 = Rs.1,215. Cashback = 5% of 1,215 = Rs.60.75. Net revenue = 1,215 - 60.75 = Rs.1,154.25. Profit = 154.25, so profit percentage = 154.25/1,000 x 100 = 15.43%.'
  },
  'GT-S6Q180': {
    options: ['22.5 hours', '18 hours', '15 hours', '24 hours'],
    correct: 2,
    explanation: 'After the leak develops, net filling rate = 1/15 - 1/45 = 2/45 tank per hour. Time to fill the remaining 2/3 of the tank = (2/3)/(2/45) = 15 hours.'
  },
  'GT-S6Q190': {
    options: ['Avg=12%, 2022 highest', 'Avg=11.5%, 2023 highest', 'Avg=12%, 2021 highest', 'Avg=11%, 2022 highest'],
    explanation: 'Profit percentages are: 2021 = 5/50 x 100 = 10%, 2022 = 7.2/60 x 100 = 12%, and 2023 = 9/72 x 100 = 12.5%. Average profit percentage = (10 + 12 + 12.5)/3 = 11.5%. The highest profit margin is in 2023.'
  },
  'GT-S6Q193': {
    options: ['Rs.10,000', 'Rs.14,400', 'Rs.12,000', 'Rs.15,451'],
    explanation: 'Let the first part be x, so the second part is 24,000 - x. Compound interest on the first part for 2 years at 8% is x[(1.08)^2 - 1] = 0.1664x. Simple interest on the second part for 3 years at 10% is 0.30(24,000 - x). Equating them: 0.1664x = 7,200 - 0.30x, so 0.4664x = 7,200 and x = Rs.15,451 approximately.'
  },
  'GT-S6Q196': {
    options: ['11.84 km/h', '12 km/h', '12.63 km/h', '11.5 km/h'],
    correct: 2,
    explanation: 'Time from A to B = 30/15 = 2 hours. On return, half the distance is travelled at 12 km/h, taking 15/12 = 1.25 hours, and the other half at 10 km/h, taking 15/10 = 1.5 hours. Total time = 2 + 1.25 + 1.5 = 4.75 hours. Total distance = 60 km, so average speed = 60/4.75 = 12.63 km/h.'
  },
  'GT-S6Q199': {
    correct: 2,
    explanation: 'Weighted average cost price = (3 x 30 + 4 x 40 + 5 x 50)/(3 + 4 + 5) = 500/12 = Rs.41.67 per kg. To earn 20% profit, selling price = 41.67 x 1.20 = Rs.50 per kg.'
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
console.log(`Updated ${Object.keys(updates).length} GT-S6 questions.`);
