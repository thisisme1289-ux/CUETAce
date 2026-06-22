import fs from 'node:fs';

const file = 'questions/accountancy/AC12.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const patches = {
  AC12Q06: {
    correct: 1,
    explanation: 'Amount received from debentures issued at par = 4,000 x Rs.100 = Rs.4,00,000. Amount received from debentures issued at 15% premium = 3,000 x Rs.115 = Rs.3,45,000. Amount received from debentures issued at 10% discount = 3,000 x Rs.90 = Rs.2,70,000. Total amount received = Rs.4,00,000 + Rs.3,45,000 + Rs.2,70,000 = Rs.10,15,000. Option B is correct.'
  },
  AC12Q67: {
    options: ['Rs.15,00,000', 'Rs.14,96,000', 'Rs.14,76,000', 'Rs.15,16,000'],
    correct: 3,
    explanation: 'Cash proceeds from 10,000 debentures at par = Rs.10,00,000. Cash proceeds from 3,000 debentures at 12% premium = 3,000 x Rs.112 = Rs.3,36,000. Debentures issued to vendor at 10% discount represent non-cash consideration of 2,000 x Rs.90 = Rs.1,80,000. Net proceeds/consideration from the total issue = Rs.10,00,000 + Rs.3,36,000 + Rs.1,80,000 = Rs.15,16,000. Option D is correct.'
  },
  AC12Q69: {
    correct: 3,
    explanation: 'Total discount = 6% of 4,000 x Rs.500 = Rs.1,20,000. Written off equally over 4 years gives annual write-off of Rs.30,000. The debentures were issued on 1 July 2023 and the year ends on 31 March 2024, so the first accounting year covers 9 months. First-year write-off = Rs.30,000 x 9/12 = Rs.22,500. Option D is correct.'
  },
  AC12Q94: {
    correct: 3,
    explanation: 'Cash from 4,000 debentures at 5% premium = 4,000 x Rs.105 = Rs.4,20,000. Cash from 4,000 debentures at par = Rs.4,00,000. Cash from 2,000 debentures at 5% discount = 2,000 x Rs.95 = Rs.1,90,000. Total cash received = Rs.10,10,000. Securities Premium = 4,000 x Rs.5 = Rs.20,000. Discount on Issue = 2,000 x Rs.5 = Rs.10,000. Option D is correct.'
  },
  AC12Q111: {
    options: ['Rs.60,000', 'Rs.54,000', 'Rs.27,000', 'Rs.15,000'],
    correct: 3,
    explanation: 'Annual interest = 10% of 6,000 x Rs.100 = Rs.60,000. Interest is payable half-yearly on 31 December and 30 June. The 31 December 2023 interest has already been paid. On 31 March 2024, interest for January to March has accrued but is not yet due: Rs.60,000 x 3/12 = Rs.15,000. This is shown as outstanding/accrued interest. Option D is correct.'
  },
  AC12Q125: {
    correct: 3,
    explanation: 'Let the original discount be X. It is written off over 6 years, so after 2 years, 2/6 or 1/3 has been written off and 2/3 remains. The current balance Rs.1,20,000 is therefore 2/3 of X. Hence X = Rs.1,80,000. Amount already written off = 1/3 of Rs.1,80,000 = Rs.60,000. Option D is correct.'
  },
  AC12Q135: {
    correct: 0,
    explanation: 'Purchase consideration = building Rs.15,00,000 + equipment Rs.7,00,000 = Rs.22,00,000. Cash paid = Rs.5,00,000, so balance payable by debentures = Rs.17,00,000. Debentures are issued at 15% discount, so issue price = Rs.85 per debenture. Number of debentures = Rs.17,00,000 / Rs.85 = 20,000. Face value = 20,000 x Rs.100 = Rs.20,00,000, so discount on issue = Rs.20,00,000 - Rs.17,00,000 = Rs.3,00,000. Option A is correct.'
  },
  AC12Q145: {
    correct: 0,
    explanation: 'When debentures are issued at discount, Bank is debited with the issue price and Discount on Issue is debited with the discount. Together these equal the face value credited to Debentures. When debentures are issued at par, Bank alone is debited with the face value. Thus total assets increase by the same face-value amount in both cases, though the discount issue has less cash and a separate discount asset. Option A is correct.'
  },
  AC12Q154: {
    explanation: 'Net assets of Rs.38,00,000 exceed purchase consideration of Rs.35,00,000, so Capital Reserve = Rs.3,00,000. Balance settled through debentures = Rs.35,00,000 - Rs.8,00,000 = Rs.27,00,000. Issue price at 12.5% premium = Rs.112.50 per debenture. Number of debentures = Rs.27,00,000 / Rs.112.50 = 24,000. Face value = 24,000 x Rs.100 = Rs.24,00,000. Option B is correct.'
  },
  AC12Q157: {
    correct: 2,
    explanation: 'Annual interest = 10% of Rs.40,00,000 = Rs.4,00,000. Interest is payable on 31 March and 30 September. After the 31 March payment, interest for April to June has accrued by the 30 June year-end. Outstanding interest = Rs.4,00,000 x 3/12 = Rs.1,00,000. Option C is correct.'
  },
  AC12Q183: {
    options: ['Rs.25,000', 'Nil', 'Rs.20,000', 'Rs.5,000'],
    correct: 1,
    explanation: 'Discount on cash issue = 5,000 x Rs.10 = Rs.50,000. Securities Premium from vendor debentures = 3,000 x Rs.15 = Rs.45,000. If discount is written off against Securities Premium only, the full Rs.45,000 premium is used. Remaining Securities Premium balance = Nil, and remaining Discount on Issue = Rs.5,000. Option B is correct.'
  },
  AC12Q193: {
    options: ['Cash Rs.12,05,000; Net Discount Nil', 'Cash Rs.11,75,000; Net Discount Rs.25,000', 'Cash Rs.11,75,000; Net Discount Nil', 'Cash Rs.12,00,000; Net Discount Nil'],
    correct: 0,
    explanation: 'Cash from 5,000 debentures at Rs.95 = Rs.4,75,000. Cash from 4,000 debentures at Rs.100 = Rs.4,00,000. Cash from 3,000 debentures at Rs.110 = Rs.3,30,000. Total cash received = Rs.12,05,000. Discount = 5,000 x Rs.5 = Rs.25,000. Securities Premium = 3,000 x Rs.10 = Rs.30,000. After applying Securities Premium to offset discount, net Discount on Issue is Nil and Rs.5,000 premium remains. Option A is correct.'
  },
  AC12Q198: {
    correct: 2,
    explanation: 'Securities Premium = 4,000 x Rs.15 = Rs.60,000. Discount on Issue = 6,000 x Rs.10 = Rs.60,000. After writing off the discount against the premium, both Securities Premium and Discount on Issue have nil balances. Debentures remain at face value Rs.18,00,000. Option C is correct.'
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
console.log(`Patched ${changed} AC12 questions`);
