import { readFile, writeFile } from 'node:fs/promises';

const file = 'questions/accountancy/AC08.json';
const data = JSON.parse(await readFile(file, 'utf8'));

const fixes = new Map(Object.entries({
  AC08Q31: {
    options: [
      'A: Rs.2,50,000 (including loan Rs.40,000); B: Rs.2,60,000; C: Rs.2,10,000',
      'A: Rs.2,10,000; B: Rs.2,60,000; C: Rs.2,10,000',
      'A: Rs.2,60,000; B: Rs.2,10,000; C: Rs.2,10,000',
      'A: Rs.2,50,000; B: Rs.2,50,000; C: Rs.1,80,000'
    ],
    correct: 0,
    explanation: 'Non-cash assets have book value Rs.8,70,000 and realise Rs.7,50,000, giving an asset loss of Rs.1,20,000. The Rs.5,000 saving on creditors is offset by Rs.5,000 realisation expenses, so the net loss remains Rs.1,20,000. In the equal ratio each partner bears Rs.40,000. A has capital Rs.2,10,000 after loss plus partner loan Rs.40,000, so A receives Rs.2,50,000 in total. B receives Rs.2,60,000 and C receives Rs.2,10,000.'
  },
  AC08Q61: {
    options: ['Loss Rs.90,000', 'Loss Rs.40,000', 'Profit Rs.50,000', 'Loss Rs.1,40,000'],
    correct: 0,
    explanation: 'Realised non-cash assets are obtained from the cash equation: Rs.8,70,000 total receipts plus Rs.85,000 liabilities paid plus Rs.5,000 expenses minus opening cash Rs.50,000 = Rs.9,10,000. Against non-cash assets of Rs.10,00,000, this is an asset loss of Rs.90,000. The Rs.5,000 saving on creditors is offset by Rs.5,000 expenses, so the net realisation loss is Rs.90,000.'
  },
  AC08Q72: {
    options: [
      'L contributes Rs.10,000; M receives Rs.10,000',
      'L pays Rs.20,000 and M receives Rs.10,000',
      'L receives Rs.10,000 and M contributes Rs.10,000',
      'No partner needs to contribute or receive any amount'
    ],
    correct: 0,
    explanation: 'After transferring the realisation loss, L has a debit capital balance of Rs.10,000 and M has a credit capital balance of Rs.10,000. Therefore L must contribute Rs.10,000 and M is paid Rs.10,000. Garner vs. Murray is not needed because there is no insolvent partner.'
  },
  AC08Q92: {
    options: [
      'H gets Rs.2,02,000; K gets Rs.1,53,000; the given cash figure has Rs.40,000 unreconciled',
      'H gets Rs.2,02,000 and K gets Rs.1,93,000',
      'H gets Rs.2,42,000 and K gets Rs.1,53,000',
      'H gets Rs.1,82,000 and K gets Rs.1,73,000'
    ],
    correct: 0,
    explanation: 'H receives capital Rs.1,50,000 plus realisation profit Rs.52,000 = Rs.2,02,000. K receives capital Rs.2,00,000 plus realisation profit Rs.18,000, but K takes stock of Rs.65,000, so K is payable Rs.1,53,000 in cash. Total partner cash required is Rs.3,55,000, while the question gives Rs.3,95,000 cash, leaving Rs.40,000 unreconciled. The corrected option states both the settlement and the inconsistency.'
  },
  AC08Q99: {
    options: [
      'Profit Rs.30,000; partners capital claims = Rs.5,80,000, so the stated cash distribution does not reconcile',
      'Loss Rs.30,000; partners capital claims = Rs.5,20,000',
      'Profit Rs.80,000; partners capital claims = Rs.6,30,000',
      'Loss Rs.80,000; partners capital claims = Rs.4,70,000'
    ],
    correct: 0,
    explanation: 'Non-cash assets realise Rs.7,80,000 against book value Rs.7,50,000, giving an asset profit of Rs.30,000. Creditors saving of Rs.10,000 is offset by dissolution expenses of Rs.10,000, so net realisation profit is Rs.30,000. J gets Rs.12,000 profit share and K gets Rs.18,000. Partner capital claims become Rs.5,80,000 in total, but the stated cash receipts do not reconcile fully with the settlement data.'
  },
  AC08Q117: {
    options: ['Rs.0', 'Rs.4,000 loss', 'Rs.2,000 loss', 'Rs.6,000 loss'],
    correct: 2,
    explanation: 'The computer has book value Rs.40,000 and is taken over at Rs.38,000, creating a realisation loss of Rs.2,000. X personally settles the creditor of Rs.40,000, so the creditor is taken over by X and does not create a separate realisation gain or loss. Therefore the net realisation result is a loss of Rs.2,000.'
  },
  AC08Q120: {
    options: ['Rs.4,96,000', 'Rs.4,90,000', 'Rs.5,08,000', 'Rs.4,84,000'],
    correct: 0,
    explanation: 'B receives realisation profit Rs.60,000, Workmen Compensation Reserve claim excess Rs.6,000, General Reserve share Rs.18,000, and P&L appropriation Rs.12,000. Total additions are Rs.96,000. B capital after all transfers = Rs.4,00,000 + Rs.96,000 = Rs.4,96,000.'
  },
  AC08Q122: {
    options: ['Loss Rs.1,14,000', 'Loss Rs.98,000', 'Loss Rs.1,02,000', 'Profit Rs.1,14,000'],
    correct: 0,
    explanation: 'Non-cash assets have book value Rs.9,50,000 and realise Rs.7,80,000, so the asset loss is Rs.1,70,000. Liabilities of Rs.3,00,000 are paid for Rs.2,80,000, giving a saving of Rs.20,000, and expenses are Rs.40,000. Net realisation loss = Rs.1,70,000 - Rs.20,000 + Rs.40,000 = Rs.1,90,000. X bears 3/5 of the loss = Rs.1,14,000.'
  },
  AC08Q128: {
    options: ['Rs.2,85,000', 'Rs.2,75,000', 'Rs.2,95,000', 'Rs.2,65,000'],
    correct: 0,
    explanation: 'S receives realisation profit Rs.60,000, reserve share Rs.25,000, and opening capital Rs.2,00,000. Therefore S capital after transfers = Rs.2,00,000 + Rs.60,000 + Rs.25,000 = Rs.2,85,000.'
  },
  AC08Q130: {
    options: ['Rs.3,97,500', 'Rs.4,12,500', 'Rs.4,07,500', 'Rs.4,17,500'],
    correct: 2,
    explanation: 'A receives opening capital Rs.3,50,000, realisation profit share Rs.45,000, and reserve share Rs.17,500, and bears debit P&L share Rs.5,000. Final entitlement = Rs.3,50,000 + Rs.45,000 + Rs.17,500 - Rs.5,000 = Rs.4,07,500.'
  },
  AC08Q132: {
    options: [
      'Claims total Rs.13,80,000; cash Rs.12,30,000; shortfall Rs.1,50,000',
      'P receives Rs.5,80,000, Q receives Rs.4,50,000, and R receives Rs.2,00,000',
      'Cash is sufficient to pay all partners in full',
      'Only R has a deficit balance'
    ],
    correct: 0,
    explanation: 'After the given transfers, P is payable Rs.5,80,000, Q is payable Rs.5,00,000, and R is payable Rs.3,00,000. Total partner claims are Rs.13,80,000, but available cash is only Rs.12,30,000. The data therefore has a shortfall of Rs.1,50,000 and does not support a normal full settlement.'
  },
  AC08Q134: {
    options: ['Rs.18,80,000', 'Rs.19,60,000', 'Rs.20,20,000', 'Rs.19,20,000'],
    correct: 1,
    explanation: 'The debit side of Realisation Account includes assets transferred Rs.12,00,000, outside liabilities discharged Rs.4,80,000, partner loan paid Rs.2,00,000, and realisation expenses Rs.80,000. Total debit = Rs.12,00,000 + Rs.4,80,000 + Rs.2,00,000 + Rs.80,000 = Rs.19,60,000.'
  },
  AC08Q140: {
    options: ['Loss Rs.48,000', 'Profit Rs.48,000', 'Loss Rs.18,000', 'Profit Rs.18,000'],
    correct: 0,
    explanation: 'Asset loss is Rs.5,60,000 - Rs.5,00,000 = Rs.60,000. Liabilities of Rs.2,40,000 are settled for Rs.2,28,000, giving a saving of Rs.12,000. Since no further expenses are given, net realisation loss = Rs.60,000 - Rs.12,000 = Rs.48,000.'
  },
  AC08Q142: {
    options: [
      'Creditors paid Rs.3,20,000; P capital goods Rs.2,50,000',
      'Creditors paid Rs.2,60,000; P capital goods Rs.1,90,000',
      'Creditors paid Rs.3,00,000; P capital goods Rs.2,30,000',
      "Creditors paid Rs.2,90,000; P's Capital (goods) Rs.2,20,000"
    ],
    correct: 3,
    explanation: 'Using the stated totals, the balancing figure for creditors paid is Rs.2,90,000 and the balancing figure for goods taken by P is Rs.2,20,000. These are the figures that make the Realisation Account agree with the supplied total, so option D is the corrected answer.'
  },
  AC08Q146: {
    options: ['Profit Rs.12,333', 'Loss Rs.12,333', 'Profit Rs.19,000', 'Loss Rs.19,000'],
    correct: 0,
    explanation: 'Non-cash assets are Rs.28,50,000. Seventy percent realise at 120%, giving a gain of Rs.3,99,000. Thirty percent realise at 60%, giving a loss of Rs.3,42,000. Net asset gain is Rs.57,000. After creditor saving Rs.10,000 and expenses Rs.30,000, net realisation profit is Rs.37,000. Y share in 3:2:1 is 2/6, so Y gets Rs.12,333 approximately.'
  },
  AC08Q156: {
    options: [
      'A is not insolvent; after the loss A has Rs.50,000 credit and B has Rs.50,000 deficit',
      'A is insolvent and B must bear Rs.50,000',
      'Both partners are insolvent',
      'Neither partner has any capital balance after loss'
    ],
    correct: 0,
    explanation: 'The stated figures do not make A insolvent. A capital after a Rs.50,000 loss share is Rs.50,000 credit. B capital after a Rs.1,50,000 loss share is Rs.50,000 debit. Therefore the premise that A is insolvent conflicts with the numerical data; the corrected answer identifies the inconsistency.'
  },
  AC08Q157: {
    options: [
      'Shortfall of Rs.25,000',
      'Surplus of Rs.25,000',
      'Cash exactly matches partner claims',
      'Shortfall of Rs.1,25,000'
    ],
    correct: 0,
    explanation: 'The partners claims after all transfers total Rs.17,50,000, while the stated cash available for settlement is Rs.17,25,000. Therefore cash is short by Rs.25,000.'
  },
  AC08Q159: {
    options: ['Profit Rs.41,250', 'Profit Rs.55,000', 'Loss Rs.41,250', 'Profit Rs.13,750'],
    correct: 0,
    explanation: 'Net realisation profit is Rs.55,000 after considering the stated asset realisations, liability settlement, and expenses. A share is 3/4 of Rs.55,000 = Rs.41,250.'
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
console.log(`Updated ${changed} AC08 questions in ${file}`);
