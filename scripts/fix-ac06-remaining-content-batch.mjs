import fs from 'node:fs';

const file = 'questions/accountancy/AC06.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const patches = {
  AC06Q167: {
    options: [
      "Bank loan interest: ₹8,400; Z's loan interest: ₹10,000; net ₹18,400",
      "Bank loan interest: ₹8,400; Z's loan interest: ₹17,000; net ₹25,400",
      "Bank loan interest: ₹8,400; Z's loan interest: ₹20,000; net to P&L = ₹28,400",
      'Net interest = ₹25,000'
    ],
    correct: 0,
    explanation: "Cash available to pay Z = existing cash ₹80,000 + bank loan ₹70,000 = ₹1,50,000. Z's capital balance is ₹2,50,000, so Z's Loan Account = ₹2,50,000 - ₹1,50,000 = ₹1,00,000. Bank-loan interest = 12% of ₹70,000 = ₹8,400. Z-loan interest = 10% of ₹1,00,000 = ₹10,000. Total interest cost = ₹18,400. Option A is correct."
  },
  AC06Q170: {
    correct: 1,
    explanation: "Sales ratio = current-period sales / previous year's sales = ₹12,00,000 / ₹18,00,000 = 2/3. Estimated current-period profit = 2/3 x ₹2,16,000 = ₹1,44,000. B's profit share = 3/9 x ₹1,44,000 = ₹48,000. Option B is correct."
  },
  AC06Q176: {
    correct: 3,
    explanation: "C's share = 1/5. C's share of revaluation loss = 1/5 x ₹25,000 = ₹5,000, debited to C. C's share of General Reserve = 1/5 x ₹50,000 = ₹10,000, credited to C. C's share of goodwill = ₹15,000, credited to C. Final settlement = ₹60,000 - ₹5,000 + ₹10,000 + ₹15,000 = ₹80,000. Option D is correct."
  },
  AC06Q181: {
    correct: 1,
    explanation: "Old shares are A = 5/10, B = 3/10, and C = 2/10. B takes 3/5 of A's 5/10 share, so B gains 3/10. C takes 2/5 of A's 5/10 share, so C gains 2/10. New share of B = 3/10 + 3/10 = 6/10 = 3/5. New share of C = 2/10 + 2/10 = 4/10 = 2/5. Therefore the new ratio is B:C = 3:2. Option B is correct."
  },
  AC06Q186: {
    options: [
      '₹1,33,000',
      '₹1,22,000',
      '₹1,25,000',
      '₹1,30,000'
    ],
    correct: 0,
    explanation: "D's old share = 1/10. D's capital before adjustments = ₹1,00,000. Add D's share of goodwill = ₹30,000. Add D's share of General Reserve = 1/10 x ₹50,000 = ₹5,000. Deduct D's share of revaluation loss = 1/10 x ₹20,000 = ₹2,000. Settlement amount = ₹1,00,000 + ₹30,000 + ₹5,000 - ₹2,000 = ₹1,33,000. Option A is correct."
  },
  AC06Q198: {
    explanation: "When the contingent liability crystallizes and the claim is settled for ₹40,000, the amount becomes an actual loss and is debited to the Revaluation Account. It is then shared by all partners, including retiring partner B, in the old profit-sharing ratio 2:1:1. Option A is correct."
  },
  AC06Q200: {
    options: [
      '₹2,80,000',
      '₹2,20,000',
      '₹2,40,000',
      '₹2,10,000'
    ],
    correct: 0,
    explanation: "Old ratio total = 10. C's share = 2/10 and D's share = 3/10. Revaluation profit: C gets ₹8,000 and D gets ₹12,000. General Reserve: C gets ₹12,000 and D gets ₹18,000. Goodwill: C gets ₹20,000 and D gets ₹30,000. C's settlement = ₹80,000 + ₹8,000 + ₹12,000 + ₹20,000 = ₹1,20,000. D's settlement = ₹1,00,000 + ₹12,000 + ₹18,000 + ₹30,000 = ₹1,60,000. Combined settlement = ₹2,80,000. Option A is correct."
  }
};

let changed = 0;
for (const question of data.questions) {
  const patch = patches[question.id];
  if (!patch) continue;

  if (Object.hasOwn(patch, 'correct') && question.correct !== patch.correct && !Object.hasOwn(question, 'correct_content_review_original')) {
    question.correct_content_review_original = question.correct;
  }

  Object.assign(question, patch);
  changed += 1;
}

if (changed !== Object.keys(patches).length) {
  throw new Error(`Expected ${Object.keys(patches).length} patches but applied ${changed}`);
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Patched ${changed} AC06 questions`);
