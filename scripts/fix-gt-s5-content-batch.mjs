import fs from 'node:fs';

const file = 'questions/general-test/GT-S5.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const questions = Array.isArray(data) ? data : data.questions;

const updates = {
  'GT-S5Q05': {
    options: [
      "India's gold medal count increased consistently across all three CWGs",
      "The total medal count was highest in CWG 2018 and India's silver count decreased from 2018 to 2022",
      'India won fewer bronze medals in 2022 than in 2018',
      "India's total medal count has been consistently increasing"
    ],
    explanation: 'Gold medals went 15, 26, 22, so they did not increase consistently. Total medals were 64, 66, and 61, so the highest total was in 2018. Silver medals fell from 20 in 2018 to 16 in 2022. Bronze medals in 2022 were 23, not fewer than 2018. Therefore, only the statement about 2018 total medals and the fall in silver count is true.'
  },
  'GT-S5Q13': {
    options: ['Only Djokovic', 'Only Nadal', 'Djokovic and Nadal', 'Nadal and Federer'],
    correct: 2,
    explanation: 'Djokovic has 24 total titles and 10 at the Australian Open; 10/24 = 41.67%, which is more than 40%. Nadal has 22 total titles and 14 at the French Open; 14/22 = 63.64%, also more than 40%. Federer has 20 total titles and 8 at Wimbledon; 8/20 = exactly 40%, not more than 40%. Therefore, Djokovic and Nadal qualify.'
  },
  'GT-S5Q15': {
    options: [
      'USA, India, China, Germany, Brazil, Australia',
      'China, Germany, USA, Brazil, India, Australia',
      'USA, China, Germany, India, Brazil, Australia',
      'China, USA, Germany, India, Brazil, Australia'
    ],
    explanation: 'In option B, China is immediately above Germany, USA is exactly two positions above India, Brazil is not in the top 3, and Australia is last. Therefore, China, Germany, USA, Brazil, India, Australia is a valid order.'
  },
  'GT-S5Q22': {
    options: ['70.3%', '74.5%', '81.3%', '85.0%'],
    correct: 2,
    explanation: 'Total launches listed = 96 + 67 + 19 + 7 + 3 = 192. USA and China together launched 163 missions, so X = 163/192 x 100 = 84.9%. India launched 7, so Y = 7/192 x 100 = 3.65%. Therefore, X - Y = 84.9 - 3.65 = 81.25%, approximately 81.3%.'
  },
  'GT-S5Q24': {
    options: ['26,000 MW; 52%', '26,000 MW; 56%', '26,000 MW; 58%', '13,000 MW; 52%'],
    explanation: "Other renewables account for 100% - 45% - 42% = 13% of 200 GW, which is 26 GW or 26,000 MW. Initial solar capacity is 45% of 200 GW = 90 GW. After adding 50 GW of solar, solar capacity becomes 140 GW and total capacity becomes 250 GW. New solar share = 140/250 x 100 = 56%."
  },
  'GT-S5Q33': {
    options: [
      'Total mobile internet subscribers grew every year from 2020 to 2024',
      '4G subscribers declined from 2023 to 2024 while 5G subscribers grew',
      'By 2024, 5G subscribers constituted more than 18% of total mobile internet subscribers',
      'The year 2023 saw the largest absolute increase in 4G subscribers'
    ],
    explanation: 'Total mobile internet subscribers rose every year. 4G subscribers declined from 800 million in 2023 to 780 million in 2024 while 5G rose from 80 million to 200 million. In 2024, 5G share = 200/1100 x 100 = 18.18%, which is more than 18%. For 4G, increases were +80, +80, +20, and -20, so 2023 did not see the largest absolute increase. Therefore, option D is incorrect.'
  },
  'GT-S5Q45': {
    correct: 0,
    explanation: "China's current share = 520/1,200 x 100 = 43.33%. Since this is 5 percentage points higher than the previous year, the previous share was 38.33%. Previous year's total was 1,000 thousand, so China's previous filings were 38.33% of 1,000 = 383.3 thousand, approximately 380 thousand."
  },
  'GT-S5Q54': {
    options: [
      'Total funding per unicorn added was highest in 2019',
      'The year 2021 saw both the maximum unicorn additions and maximum total funding',
      'From 2021 to 2023, the total number of unicorns more than doubled',
      'Average funding per new unicorn was lowest in 2023'
    ],
    explanation: 'Unicorn additions were highest in 2021 at 44, and total funding was also highest in 2021 at $42B. Funding per unicorn added was not highest in 2019, total unicorns rose from 79 to 104 rather than doubling from 2021 to 2023, and average funding per new unicorn was not lowest in 2023. Therefore, option B is correct.'
  },
  'GT-S5Q70': {
    explanation: 'GammaAI won 2 tasks and DeltaAI won 0, leaving 3 tasks for AlphaAI and BetaAI. BetaAI must win at least 1 task, and AlphaAI must win more than BetaAI. To maximise AlphaAI, let BetaAI win 1 task; then AlphaAI wins 2 tasks. AlphaAI cannot win 3 because that would leave BetaAI with 0.'
  },
  'GT-S5Q76': {
    options: [
      'Temperature rise accelerated at a uniform rate throughout all periods',
      'The rate of sea level rise was lower in the 2000-2020 period than the 2020-2023 period',
      'Glacial coverage loss was proportionally largest in the 1980-2000 period',
      'Extreme heat days increased by exactly the same number in each 20-year period'
    ],
    explanation: 'Sea level rise increased by 50 mm over 20 years from 2000 to 2020, or 2.5 mm per year. From 2020 to 2023, it increased by 20 mm over 3 years, or about 6.67 mm per year. Thus, the sea-level-rise rate was lower in 2000-2020 than in 2020-2023. The other statements do not match the data.'
  },
  'GT-S5Q90': {
    correct: 2,
    explanation: 'CAGR = [(21,083/1,520)^(1/7) - 1] x 100. The ratio is about 13.87. Taking the seventh root gives about 1.457, so CAGR is about 45.7%. The closest option is 48%.'
  },
  'GT-S5Q96': {
    options: ['Rs.8,325', 'Rs.16,650', 'Rs.17,09,400', 'Rs.33,300'],
    explanation: '30.8 GW = 30,800,000 kW. With 10 lakh farmers, average capacity per farmer = 30,800,000/1,000,000 = 30.8 kW. Installation cost per farmer = 30.8 x Rs.1,85,000 = Rs.56,98,000. Subsidy at 30% = Rs.17,09,400.'
  },
  'GT-S5Q100': {
    options: ['ROI = 2,460%', 'ROI = 3,533%', 'ROI = 1,800%', 'ROI = 28,471%'],
    correct: 3,
    explanation: 'Total lifecycle cost = initial investment of $50M + maintenance of $2M x 10 = $70M. Total benefit over 10 years = $2B x 10 = $20B = $20,000M. Net benefit = 20,000 - 70 = $19,930M. ROI = (19,930/70) x 100 = 28,471%.'
  },
  'GT-S5Q112': {
    explanation: 'Batting average = Total Runs / (Innings - Not Outs) = 4,188 / (125 - 18) = 4,188/107 = 39.14. Therefore, the calculated batting average from the given data is 39.14.'
  },
  'GT-S5Q125': {
    explanation: 'According to the passage, Australia reached the target on Day 5 with 444/3. Therefore, the conclusion supported by the passage is that Australia won the WTC Final 2023 convincingly despite India\'s competitive first innings.'
  },
  'GT-S5Q127': {
    correct: 3,
    explanation: 'Olympic prize money = Rs.50 lakh + Rs.30 lakh = Rs.80 lakh. World Championship prize money = $50,000 + 2 x $30,000 = $110,000. At Rs.83 per dollar, this equals Rs.91.3 lakh. Total prize money = 80 + 91.3 = Rs.171.3 lakh = Rs.1.713 crore, approximately Rs.1.71 crore.'
  },
  'GT-S5Q130': {
    correct: 2,
    explanation: 'Efficiency Score = Total Valuation / Number of Unicorns. Fintech = 95/26 = $3.65B, Edtech = 40/18 = $2.22B, Ecommerce = 85/22 = $3.86B, Healthtech = 35/12 = $2.92B, SaaS = 55/16 = $3.44B, and Logistics/Auto = 28/10 = $2.80B. Ecommerce has the highest score.'
  },
  'GT-S5Q161': {
    options: ['Rs.78.6 crore', 'Rs.117.6 crore', 'Rs.108.4 crore', 'Rs.58.8 crore'],
    explanation: 'Primary students = 60% of 12 crore = 7.2 crore. Upper primary students = 4.8 crore. Daily cost for primary students = 7.2 x Rs.8.17 = Rs.58.824 crore. Daily cost for upper primary students = 4.8 x Rs.12.25 = Rs.58.80 crore. Total daily expenditure = Rs.117.624 crore, approximately Rs.117.6 crore.'
  },
  'GT-S5Q179': {
    explanation: 'Time = 2 hours 35 seconds = 2 + 35/3600 = 2.00972 hours. Average speed = distance/time = 42.195/2.00972 = 20.997 km/h, approximately 21.0 km/h. The closest listed value is 21.08 km/h.'
  },
  'GT-S5Q198': {
    question: "At the 2024 Paris Olympics, India's shooting team won a historic silver medal. India has sent 10 athletes in a team sport where the team score is the sum of top 3 individual scores. Individual scores (out of 630 points each) were: 617, 624, 608, 631, 619, 626, 614, 629, 615, 622. If silver medal was secured with a team score of 1879, which 3 athletes' scores formed the team total?",
    options: [
      '631+629+622 = 1882',
      '624+629+626 = 1879',
      '617+631+629 = 1877',
      '626+614+629 = 1869'
    ],
    explanation: 'The required team score is 1879. Checking the options: 631 + 629 + 622 = 1882; 624 + 629 + 626 = 1879; 617 + 631 + 629 = 1877; and 626 + 614 + 629 = 1869. Therefore, the team total was formed by 624, 629, and 626.'
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
console.log(`Updated ${Object.keys(updates).length} GT-S5 questions.`);
