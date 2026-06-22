import fs from 'node:fs';

const file = 'questions/accountancy/AC07.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const patches = {
  AC07Q114: {
    question: "Partners M and N (PSR 2:1). Opening Balance Sheet (dissolution): Capitals M=Rs.80,000, N=Rs.60,000; Creditors Rs.40,000; Bill Payable Rs.10,000. Assets: Building Rs.80,000, Machinery Rs.60,000, Debtors Rs.30,000, Cash Rs.20,000. Dissolution: Building sold Rs.1,00,000; Machinery transferred to creditors at Rs.45,000 in full settlement of their Rs.40,000 claim, and creditors paid Rs.5,000 cash to the firm for the excess value; Rs.5,000 debtors were bad; BP paid in full; Expenses Rs.2,000. Realisation profit/loss is:",
    options: ['Profit of Rs.23,000', 'Profit of Rs.28,000', 'Profit of Rs.33,000', 'Loss of Rs.2,000'],
    correct: 3,
    explanation: 'Building gives a gain of Rs.20,000 (Rs.1,00,000 - Rs.80,000). Machinery transferred at Rs.45,000 gives a loss of Rs.15,000 against book value Rs.60,000. Debtors realised Rs.25,000, giving a loss of Rs.5,000. The creditor transaction settles the Rs.40,000 liability exactly: machinery worth Rs.45,000 is given and Rs.5,000 cash is received back, so there is no separate creditor gain or loss. Bill payable is paid in full. Expenses are Rs.2,000. Net result = Rs.20,000 - Rs.15,000 - Rs.5,000 - Rs.2,000 = Rs.2,000 loss. Option D is correct.'
  },
  AC07Q150: {
    options: ['+Rs.12,750', '+Rs.10,250', '+Rs.8,750', '+Rs.11,750'],
    correct: 3,
    explanation: "O's share in the 2:1:1 ratio is 1/4. General Reserve credit to O = 1/4 x Rs.60,000 = Rs.15,000. P&L debit balance written off to O = 1/4 x Rs.20,000 = Rs.5,000. Workmen Compensation Reserve is Rs.15,000 and the claim paid is Rs.8,000, so excess reserve = Rs.7,000; O's share = 1/4 x Rs.7,000 = Rs.1,750. Net change in O's capital = Rs.15,000 - Rs.5,000 + Rs.1,750 = Rs.11,750. Option D is correct."
  },
  AC07Q152: {
    options: ['X=Rs.1,30,000; Y=Rs.1,25,000; Z=Rs.90,000', 'X=Rs.50,000; Y=Rs.85,000; Z=Rs.80,000', 'X=Rs.1,50,000; Y=Rs.1,00,000; Z=Rs.70,000', 'X=Rs.1,30,000; Y=Rs.1,05,000; Z=Rs.80,000'],
    correct: 1,
    explanation: 'General Reserve is distributed in 2:2:1, so X gets Rs.40,000, Y gets Rs.40,000, and Z gets Rs.20,000. Realisation loss of Rs.1,50,000 is also shared in 2:2:1, so X bears Rs.60,000, Y bears Rs.60,000, and Z bears Rs.30,000. X final cash = Rs.2,50,000 + Rs.40,000 - Rs.60,000 - machinery Rs.1,80,000 = Rs.50,000. Y final cash = Rs.1,80,000 + Rs.40,000 - Rs.60,000 - stock Rs.75,000 = Rs.85,000. Z final cash = Rs.90,000 + Rs.20,000 - Rs.30,000 = Rs.80,000. Option B is correct.'
  },
  AC07Q158: {
    options: ['Loss of Rs.6,000', 'Profit of Rs.24,000', 'Profit of Rs.4,000', 'Loss of Rs.21,000'],
    correct: 0,
    explanation: 'Assets excluding cash have book value Rs.2,50,000 and realise Rs.2,20,000, giving a loss of Rs.30,000. Unrecorded goodwill taken by A at Rs.25,000 is credited to Realisation, giving a gain of Rs.25,000. Liabilities of Rs.70,000 are paid at Rs.68,000, giving a gain of Rs.2,000. Expenses are Rs.3,000. Net result = -Rs.30,000 + Rs.25,000 + Rs.2,000 - Rs.3,000 = Rs.6,000 loss. Option A is correct.'
  },
  AC07Q162: {
    options: ['Rs.3,42,500', 'Rs.3,57,500', 'Rs.3,52,500', 'Rs.3,40,000'],
    correct: 0,
    explanation: "Realisation loss = Rs.14,50,000 - Rs.13,85,000 = Rs.65,000. X's share in the 5:3:2 ratio is 5/10, so X bears Rs.32,500. General Reserve credited to X = 5/10 x Rs.1,50,000 = Rs.75,000. X's final cash receipt = opening capital Rs.3,00,000 + reserve Rs.75,000 - realisation loss Rs.32,500 = Rs.3,42,500. Option A is correct."
  },
  AC07Q165: {
    question: 'At dissolution, firm shows the following Balance Sheet items: Machinery Rs.2,00,000, Debtors Rs.80,000 (PBD Rs.5,000), Stock Rs.60,000, Cash Rs.25,000, Investments Rs.1,00,000 (IFF Rs.12,000). IFF exceeds the fall in investment value by Rs.4,000. All other assets realized at face. Machinery sold Rs.1,80,000; Debtors Rs.3,000 bad and the rest realized; Investments sold Rs.92,000; Creditors Rs.1,50,000 paid Rs.1,45,000. Expenses Rs.7,000. Assuming PBD and IFF are transferred to Realisation, net Realisation profit/loss is:',
    options: ['Loss of Rs.16,000', 'Loss of Rs.13,000', 'Profit of Rs.5,000', 'Loss of Rs.3,000'],
    correct: 0,
    explanation: 'Machinery loss = Rs.2,00,000 - Rs.1,80,000 = Rs.20,000. Debtors realise Rs.77,000 after Rs.3,000 bad debts; with PBD Rs.5,000 credited to Realisation, debtor result = Rs.77,000 + Rs.5,000 - Rs.80,000 = Rs.2,000 gain. Investments realise Rs.92,000; with IFF Rs.12,000 credited to Realisation, investment result = Rs.92,000 + Rs.12,000 - Rs.1,00,000 = Rs.4,000 gain. Creditors paid Rs.1,45,000 against Rs.1,50,000 give a gain of Rs.5,000. Expenses are Rs.7,000. Net result = -Rs.20,000 + Rs.2,000 + Rs.4,000 + Rs.5,000 - Rs.7,000 = Rs.16,000 loss. Option A is correct.'
  },
  AC07Q166: {
    options: ['P pays Rs.17,000; no cash receipt', 'Rs.78,500', 'Rs.75,000', 'Rs.83,000'],
    correct: 0,
    explanation: "Assets transferred to Realisation are Goodwill Rs.50,000, Plant Rs.2,00,000, Debtors Rs.1,00,000, and Stock Rs.80,000, total Rs.4,30,000. Credits to Realisation are creditors Rs.1,20,000, plant taken by P Rs.1,80,000, debtors realised Rs.90,000, and stock sold Rs.85,000, total Rs.4,75,000. Debits also include creditors paid Rs.1,15,000 and expenses Rs.4,000, so total debit = Rs.5,49,000. Realisation loss = Rs.74,000, shared equally: Rs.37,000 each. P's capital after plant and loss = Rs.2,00,000 - Rs.1,80,000 - Rs.37,000 = negative Rs.17,000. Therefore P pays Rs.17,000 and receives no final cash. Option A is correct."
  },
  AC07Q168: {
    options: ['Rs.18,000', 'Rs.22,500', 'Rs.21,429', 'Rs.15,000'],
    correct: 2,
    explanation: "X's debit balance is Rs.50,000 and X can pay Rs.20,000, so the unpaid deficiency is Rs.30,000. Under Garner v Murray, solvent partners bear the insolvent partner's deficiency in their last agreed capital ratio. Y:Z = Rs.2,00,000:Rs.80,000 = 5:2. Y absorbs Rs.30,000 x 5/7 = Rs.21,428.57, approximately Rs.21,429. Option C is correct."
  },
  AC07Q170: {
    options: ['Rs.1,14,667', 'Rs.1,07,333', 'Rs.86,733', 'Rs.1,08,000'],
    correct: 2,
    explanation: "Non-cash assets realise at 110% of Rs.2,30,000 = Rs.2,53,000, so asset gain is Rs.23,000. Liabilities settled at 98% of Rs.60,000 are paid at Rs.58,800, giving a gain of Rs.1,200. Expenses are Rs.4,000. Realisation profit = Rs.23,000 + Rs.1,200 - Rs.4,000 = Rs.20,200. Q's share at 1/3 = Rs.6,733.33. Q's final capital = Rs.80,000 + Rs.6,733.33 = Rs.86,733 approximately. Option C is correct."
  },
  AC07Q183: {
    options: ['X = Rs.20,000; Y = Rs.10,000', 'X = Rs.0; Y = Rs.20,000', 'X = Rs.20,000; Y = Rs.30,000', 'X = Rs.40,000; Y = Rs.20,000'],
    correct: 0,
    explanation: "Realisation loss of Rs.2,00,000 is shared in the 4:1 ratio. X bears Rs.1,60,000 and Y bears Rs.40,000. X's final cash = Rs.3,00,000 - Rs.1,60,000 - machinery taken Rs.1,20,000 = Rs.20,000. Y's final cash = Rs.80,000 - Rs.40,000 - car taken Rs.30,000 = Rs.10,000. Option A is correct."
  },
  AC07Q189: {
    correct: 0,
    explanation: "Realisation loss of Rs.80,000 is shared in the 3:2 ratio. P bears 3/5 x Rs.80,000 = Rs.48,000. P's capital after the loss = Rs.2,00,000 - Rs.48,000 = Rs.1,52,000. P's loan is paid separately before capital settlement, so P's final cash receipt from capital is Rs.1,52,000. Option A is correct."
  },
  AC07Q199: {
    options: ['Rs.1,14,000', 'Rs.94,000', 'Rs.1,18,000', 'Rs.1,06,000'],
    correct: 1,
    explanation: "P&L debit balance is written off in the 2:2:1 ratio. M bears 2/5 x Rs.1,00,000 = Rs.40,000, so M's adjusted capital becomes Rs.1,10,000. Realisation loss: assets book value Rs.4,00,000 plus creditors paid Rs.97,000 plus expenses Rs.5,000 gives debit Rs.5,02,000. Credit side is creditors Rs.1,00,000 + machinery taken by L Rs.1,80,000 + stock Rs.1,25,000 + debtors realised Rs.57,000 = Rs.4,62,000. Realisation loss = Rs.40,000. M bears 2/5 x Rs.40,000 = Rs.16,000. M's final cash receipt from capital only = Rs.1,10,000 - Rs.16,000 = Rs.94,000. Option B is correct."
  },
  AC07Q200: {
    question: "MASTER QUESTION - Dissolution of Firm XYZ (PSR 3:2:1). Balance Sheet: Capitals X=Rs.3,00,000, Y=Rs.2,00,000, Z=Rs.1,00,000; General Reserve Rs.90,000; Creditors Rs.1,50,000; X's Loan Rs.60,000. Assets: Land Rs.2,50,000, Plant Rs.1,80,000, Stock Rs.1,00,000, Debtors Rs.80,000, Cash Rs.2,90,000. Dissolution: Land sold Rs.3,20,000; Y takes Plant at Rs.1,50,000; Stock Rs.1,10,000; Rs.8,000 bad debt on debtors, rest realized; Creditors paid Rs.1,45,000; Expenses Rs.6,000. GR distributed. X's Loan repaid. Who receives what as final cash settlement?",
    options: ['X=Rs.4,25,500 (loan+capital); Y=Rs.93,667; Z=Rs.1,21,833', 'X=Rs.3,12,000; Y=Rs.1,44,000; Z=Rs.1,08,000', 'X=Rs.2,64,000 (loan+capital); Y=Rs.1,52,000; Z=Rs.1,16,000', 'X=Rs.3,00,000; Y=Rs.2,00,000; Z=Rs.1,00,000'],
    correct: 0,
    explanation: "General Reserve is distributed in 3:2:1: X Rs.45,000, Y Rs.30,000, Z Rs.15,000. Realisation result: asset gains are land Rs.70,000, stock Rs.10,000, and creditor gain Rs.5,000; losses are plant Rs.30,000, debtors Rs.8,000, and expenses Rs.6,000. Net Realisation profit = Rs.41,000. Profit shares in 3:2:1 are X Rs.20,500, Y Rs.13,667, and Z Rs.6,833. X's capital = Rs.3,00,000 + Rs.45,000 + Rs.20,500 = Rs.3,65,500; plus X's loan repayment Rs.60,000 gives total cash Rs.4,25,500. Y's capital after taking plant = Rs.2,00,000 + Rs.30,000 + Rs.13,667 - Rs.1,50,000 = Rs.93,667. Z receives Rs.1,00,000 + Rs.15,000 + Rs.6,833 = Rs.1,21,833. Option A is correct."
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
console.log(`Patched ${changed} AC07 questions`);
