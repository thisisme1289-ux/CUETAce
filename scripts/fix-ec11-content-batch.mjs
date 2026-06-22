import fs from 'node:fs';

const file = 'questions/economics/EC11.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const patches = {
  EC11Q19: {
    correct: 1,
    explanation: 'Current Account = -30 + 8 - 5 + 3 = -$24 bn. Capital Account = +$2 bn. Financial Account = +10 - 4 = +$6 bn. Overall balance before reserves = -24 + 2 + 6 = -$16 bn. A deficit of $16 bn is financed by a fall in official reserves. Therefore official reserves decrease by $16 bn, shown here as -$16 bn. Option B is correct.'
  },
  EC11Q25: {
    correct: 3,
    explanation: 'At Rs.75/$, $500 million is worth 500 x 75 = Rs.37,500 million = Rs.3,750 crore. At Rs.80/$, it is worth 500 x 80 = Rs.40,000 million = Rs.4,000 crore. Gain due to exchange-rate change = Rs.4,000 crore - Rs.3,750 crore = Rs.250 crore. Option D is correct.'
  },
  EC11Q40: {
    options: ['Improves by $100', 'Improves by $200', 'Worsens by $100', 'Improves by $400'],
    correct: 3,
    explanation: 'Before depreciation, exports = 100 x $10 = $1,000 and imports = 80 x $5 = $400, so trade balance = $600. After depreciation, exports = 130 x $10 = $1,300 and imports = 60 x $5 = $300, so trade balance = $1,000. Change in trade balance = $1,000 - $600 = $400 improvement. Option D is correct.'
  },
  EC11Q47: {
    options: [
      'Current account credit of Rs.7.8 crore; Financial account debit of Rs.7.8 crore',
      'Current account credit of Rs.780 crore; Financial account debit of Rs.780 crore',
      'Financial account credit only',
      'Capital account credit of Rs.78 million'
    ],
    correct: 0,
    explanation: 'Dividend received from a foreign subsidiary is primary income, so it is recorded as a current account credit. $1 million at Rs.78/$ = Rs.78 million = Rs.7.8 crore. The matching foreign-exchange/financial settlement is recorded as a financial account debit of the same amount. Option A is correct.'
  },
  EC11Q57: {
    explanation: 'Real Exchange Rate index = 100 x (foreign price index / domestic price index) when the nominal rate is unchanged relative to the base. After one year, RER index = 100 x (1.02 / 1.06) = 96.23, approximately 96.15. Option B is correct.'
  },
  EC11Q76: {
    correct: 0,
    explanation: 'Trade balance = merchandise exports - merchandise imports = $300 bn - $450 bn = -$150 bn. Services surplus = software exports $150 bn + tourism receipts $30 bn = +$180 bn. Primary income = -$20 bn. Secondary income/remittances = +$80 bn. Current Account Balance = -150 + 180 - 20 + 80 = +$90 bn. Option A is correct.'
  },
  EC11Q87: {
    correct: 1,
    explanation: 'Using the question’s base of Rs.60/$, if India’s price level is 3 times the US price level, the PPP exchange rate is Rs.60 x 3 = Rs.180/$. The market rate is only Rs.60/$, meaning fewer rupees are exchanged per dollar than PPP would suggest. Therefore the rupee is overvalued relative to the PPP rate. Option B is correct.'
  },
  EC11Q118: {
    explanation: 'Use the BOP identity: CA + KA + FA + errors and omissions + reserve adjustment = 0. A decrease in official reserves of $15 bn is treated as a financing inflow of +$15 bn. Therefore -50 + 5 + 35 + E&O + 15 = 0. This gives 5 + E&O = 0, so E&O = -$5 bn. Option B is correct.'
  },
  EC11Q153: {
    correct: 0,
    explanation: 'External debt = $500 bn. At Rs.70/$, rupee value = 500 x 70 = Rs.35,000 bn = Rs.35 lakh crore. At Rs.80/$, rupee value = 500 x 80 = Rs.40,000 bn = Rs.40 lakh crore. Increase = Rs.5 lakh crore. Option A is correct.'
  },
  EC11Q174: {
    correct: 2,
    explanation: 'REER index = (nominal rate / base rate) x (foreign price index / domestic price index) x 100 = (70/65) x (100/110) x 100 = 97.9. With this convention, REER below 100 indicates real appreciation relative to the base year because higher domestic inflation more than offsets the nominal depreciation. Option C is correct.'
  },
  EC11Q183: {
    explanation: "Country A's nominal depreciation = (105 - 100) / 100 x 100 = 5%. Country B's nominal depreciation = (52 - 50) / 50 x 100 = 4%. Since both countries have identical inflation, the inflation differential is zero, so real depreciation follows the nominal depreciation difference. Country A has depreciated more in real terms. Option A is correct."
  },
  EC11Q195: {
    correct: 1,
    explanation: 'Current Account = (200 - 280) + (-20) + 10 + 30 = -$60 bn. Financial Account = (50 - 10) + (20 - 30) + 15 = +$45 bn. With no capital account or errors and omissions given, the overall balance before reserves = -60 + 45 = -$15 bn. This deficit is financed by a decrease in reserves of $15 bn. Option B is correct.'
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
console.log(`Patched ${changed} EC11 questions`);
