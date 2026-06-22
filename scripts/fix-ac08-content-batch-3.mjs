import fs from 'node:fs';

const file = 'questions/accountancy/AC08.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const patches = {
  AC08Q162: {
    options: [
      'A gains Rs.3,000 net from these two items combined',
      'A gains Rs.5,000 net',
      'A loses Rs.1,000 net',
      'A gains Rs.1,800 net'
    ],
    correct: 3,
    explanation: "If the firm bore expenses and there were no incentive, divisible profit would be Rs.1,00,000 - Rs.10,000 = Rs.90,000, and A's share would be 3/5 x Rs.90,000 = Rs.54,000. Under the deed, expenses are charged to Realisation and A is reimbursed for paying them, so the expense payment and reimbursement cancel in A's capital account. Profit after expenses is Rs.90,000. A's incentive = 5% x Rs.90,000 = Rs.4,500. Remaining profit = Rs.85,500, of which A gets 3/5 = Rs.51,300. A's total from profit and incentive = Rs.55,800. Net advantage over the no-incentive case = Rs.55,800 - Rs.54,000 = Rs.1,800. Option D is correct."
  },
  AC08Q164: {
    correct: 3,
    explanation: "Realisation debit total = assets Rs.25,00,000 + liabilities settled Rs.4,50,000 + expenses Rs.20,000 = Rs.29,70,000. Realisation credit total = liabilities transferred Rs.5,20,000 + assets realised Rs.23,50,000 = Rs.28,70,000. Loss = Rs.1,00,000. Z's share in the 2:2:1 ratio is 1/5, so Z bears Rs.20,000. Z's capital after realisation = Rs.3,00,000 - Rs.20,000 = Rs.2,80,000. Option D is correct."
  },
  AC08Q166: {
    question: 'A firm dissolves with the following Realisation Account (incomplete): Dr: Land Rs.8,00,000; Machinery Rs.3,50,000; Debtors Rs.1,50,000; Stock Rs.2,00,000; [Expenses = ?]; Creditors paid Rs.1,80,000. Cr: Creditors Rs.2,00,000; Land sold Rs.9,50,000; Machinery sold Rs.3,00,000; Debtors realised Rs.1,30,000; Stock realised Rs.2,10,000. If the Realisation Account shows a loss of Rs.30,000, what are the dissolution expenses?',
    options: ['Rs.1,40,000', 'Rs.20,000', 'Rs.40,000', 'Rs.50,000'],
    correct: 0,
    explanation: 'Credit total = Rs.2,00,000 + Rs.9,50,000 + Rs.3,00,000 + Rs.1,30,000 + Rs.2,10,000 = Rs.17,90,000. A realisation loss of Rs.30,000 means debit total must be Rs.17,90,000 + Rs.30,000 = Rs.18,20,000. Debit total before expenses = Rs.8,00,000 + Rs.3,50,000 + Rs.1,50,000 + Rs.2,00,000 + Rs.1,80,000 = Rs.16,80,000. Therefore expenses = Rs.18,20,000 - Rs.16,80,000 = Rs.1,40,000. Option A is correct.'
  },
  AC08Q174: {
    options: ['Loss Rs.25,125', 'Profit Rs.9,750', 'Loss Rs.7,500', 'Profit Rs.4,875'],
    correct: 0,
    explanation: "Debtors loss = Rs.1,40,000 - Rs.1,20,000 = Rs.20,000. Machinery loss = Rs.4,00,000 - Rs.3,60,000 = Rs.40,000. Stock taken by G gives a gain of Rs.5,000. Investments taken by H give a loss of Rs.10,000. Net asset loss = Rs.65,000. Creditors paid at Rs.70,000 against book value Rs.80,000 give a saving of Rs.10,000, and expenses are Rs.12,000. Net realisation loss = Rs.65,000 - Rs.10,000 + Rs.12,000 = Rs.67,000. H's share in 5:3 ratio is 3/8, so H bears Rs.67,000 x 3/8 = Rs.25,125. Option A is correct."
  },
  AC08Q175: {
    options: ['Loss Rs.16,800', 'Loss Rs.24,000', 'Loss Rs.12,400', 'Loss Rs.25,600'],
    correct: 0,
    explanation: "Debit total = furniture Rs.80,000 + debtors Rs.1,20,000 + stock Rs.1,00,000 + goodwill Rs.50,000 + creditors paid Rs.1,40,000 = Rs.4,90,000. Credit total = creditors Rs.1,60,000 + furniture sold Rs.75,000 + debtors realised Rs.1,08,000 + stock Rs.1,05,000 + goodwill realised nil = Rs.4,48,000. Realisation loss = Rs.42,000. A's share in the 2:2:1 ratio is 2/5, so A bears Rs.42,000 x 2/5 = Rs.16,800. Option A is correct."
  },
  AC08Q176: {
    correct: 2,
    explanation: "Asset loss = Rs.10,50,000 - Rs.9,75,000 = Rs.75,000. Liability saving = Rs.3,00,000 - Rs.2,90,000 = Rs.10,000. Expenses = Rs.15,000. Net realisation loss = Rs.75,000 - Rs.10,000 + Rs.15,000 = Rs.80,000. M's share in 3:2:1 is 2/6, so M bears Rs.26,667. M's capital after loss = Rs.2,50,000 - Rs.26,667 = Rs.2,23,333. Add M's loan Rs.50,000: total entitlement = Rs.2,73,333. Option C is correct."
  },
  AC08Q180: {
    question: "A, B, C (2:2:1) dissolve their firm. After realisation, the Realisation Account shows a loss of Rs.2,50,000. Partners' Capitals before realisation loss are: A Rs.3,00,000; B Rs.2,00,000; C Rs.50,000. What is B's final capital position after transferring the realisation loss?",
    options: [
      "B's Capital = Rs.1,00,000",
      "B's Capital = Rs.75,000",
      "B's final capital = Rs.50,000",
      "B's final capital = Rs.0"
    ],
    correct: 0,
    explanation: "The loss of Rs.2,50,000 is shared in the 2:2:1 ratio. B's share = 2/5 x Rs.2,50,000 = Rs.1,00,000. B's final capital = Rs.2,00,000 - Rs.1,00,000 = Rs.1,00,000. C's share is Rs.50,000, so C's capital becomes zero rather than negative; no deficiency adjustment is needed. Option A is correct."
  },
  AC08Q187: {
    question: "At dissolution of firm RS (R:S = 2:3), Realisation A/c shows: Assets (Dr) Rs.12,00,000; Liabilities paid (Dr) Rs.2,80,000; Liabilities transferred (Cr) Rs.3,00,000; Assets realised (Cr) Rs.10,80,000; Expenses (Dr) Rs.30,000. R's Capital Rs.4,20,000; S's Capital Rs.4,50,000. Both partners have no loans outstanding. Available cash for capital settlement = Rs.7,40,000. Calculate each partner's final settlement.",
    options: ['R: Rs.3,68,000; S: Rs.3,72,000', 'R: Rs.3,78,000; S: Rs.4,92,000', 'R: Rs.4,08,000; S: Rs.4,62,000', 'R: Rs.3,60,000; S: Rs.5,10,000'],
    correct: 0,
    explanation: "Asset loss = Rs.12,00,000 - Rs.10,80,000 = Rs.1,20,000. Liability saving = Rs.3,00,000 - Rs.2,80,000 = Rs.20,000. Expenses = Rs.30,000. Net realisation loss = Rs.1,20,000 - Rs.20,000 + Rs.30,000 = Rs.1,30,000. R bears 2/5 = Rs.52,000 and S bears 3/5 = Rs.78,000. R's settlement = Rs.4,20,000 - Rs.52,000 = Rs.3,68,000. S's settlement = Rs.4,50,000 - Rs.78,000 = Rs.3,72,000. Total = Rs.7,40,000, matching available cash. Option A is correct."
  },
  AC08Q189: {
    explanation: 'Hire Purchase Liability of Rs.40,000 is an external liability and is transferred to the credit of Realisation. Machinery book value Rs.80,000 is transferred to the debit of Realisation. Machinery sold for Rs.60,000 is credited to Realisation. HP liability paid at Rs.40,000 is debited to Realisation. Debits = Rs.80,000 + Rs.40,000 = Rs.1,20,000. Credits = Rs.40,000 + Rs.60,000 = Rs.1,00,000. Net impact is a Realisation loss of Rs.20,000. Option B is correct.'
  },
  AC08Q193: {
    options: ['Rs.2,86,000', 'Rs.2,72,000', 'Rs.2,80,000', 'Rs.2,62,000'],
    correct: 0,
    explanation: "C's share in the 4:3:3 ratio is 3/10. C receives General Reserve share = 3/10 x Rs.30,000 = Rs.9,000. C bears P&L debit balance = 3/10 x Rs.10,000 = Rs.3,000. C receives realisation profit share = 3/10 x Rs.1,00,000 = Rs.30,000. Net addition = Rs.9,000 - Rs.3,000 + Rs.30,000 = Rs.36,000. C's capital after all transfers = Rs.2,50,000 + Rs.36,000 = Rs.2,86,000. Option A is correct."
  },
  AC08Q195: {
    options: [
      'Total claims after loss: A Loan Rs.2,00,000 + Capital Rs.6,50,000 + B Capital Rs.5,00,000 + C Loan Rs.1,00,000 + Capital Rs.3,50,000 = Rs.18,00,000, which does not match cash Rs.17,50,000',
      'Total claims = Rs.17,50,000; A: Rs.8,50,000; B: Rs.5,00,000; C: Rs.4,00,000',
      'Total claims = Rs.17,50,000: A Loan Rs.2,00,000 + A Capital Rs.6,50,000 + B Capital Rs.5,00,000 + C Loan Rs.1,00,000 + C Capital Rs.3,00,000',
      'Cash surplus is Rs.50,000'
    ],
    correct: 0,
    explanation: "Realisation loss = Rs.30,00,000 - Rs.27,00,000 = Rs.3,00,000. In the 3:2:1 ratio, A bears Rs.1,50,000, B bears Rs.1,00,000, and C bears Rs.50,000. Updated capitals are A Rs.6,50,000, B Rs.5,00,000, and C Rs.3,50,000. Total claims = A loan Rs.2,00,000 + A capital Rs.6,50,000 + B capital Rs.5,00,000 + C loan Rs.1,00,000 + C capital Rs.3,50,000 = Rs.18,00,000. Since cash is Rs.17,50,000, the stated cash distribution is short by Rs.50,000 and is not fully verified. Option A is correct."
  },
  AC08Q198: {
    explanation: "The stated Realisation profit of Rs.60,000 already includes the goodwill gain and patent loss. Since A agreed to pay firm-borne dissolution expenses of Rs.18,000 and the actual expenses are also Rs.18,000, A is credited for the agreed amount and debited when paying it, so the net effect on A's capital is nil. A's share of profit in the 3:2:1 ratio is 3/6 x Rs.60,000 = Rs.30,000. A's final capital = Rs.4,80,000 + Rs.30,000 = Rs.5,10,000. Option A is correct."
  },
  AC08Q200: {
    options: ['Rs.11,80,000', 'Rs.13,60,000', 'Rs.14,00,000', 'Rs.13,00,000'],
    correct: 0,
    explanation: "Asset loss = Rs.50,00,000 - Rs.44,00,000 = Rs.6,00,000. Liability saving = Rs.12,00,000 - Rs.11,00,000 = Rs.1,00,000. Expenses are Rs.50,000. Net realisation loss = Rs.6,00,000 - Rs.1,00,000 + Rs.50,000 = Rs.5,50,000. C's share in the 3:3:4 ratio is 4/10, so C bears Rs.2,20,000. C's final cash entitlement = Rs.14,00,000 - Rs.2,20,000 = Rs.11,80,000. Option A is correct."
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
console.log(`Patched ${changed} AC08 questions`);
