import { readFile, writeFile } from 'node:fs/promises';

const file = 'questions/accountancy/AC07.json';
const data = JSON.parse(await readFile(file, 'utf8'));

const fixes = new Map(Object.entries({
  AC07Q21: {
    options: ['₹62,000 (Cr)', '₹58,000 (Cr)', '₹70,000 (Cr)', '₹54,000 (Cr)'],
    correct: 0,
    explanation: 'Realisation profit of ₹20,000 is shared in the 3:2 ratio. P’s share = ₹20,000 x 3/5 = ₹12,000. P’s capital after crediting this profit = ₹50,000 + ₹12,000 = ₹62,000 credit.'
  },
  AC07Q41: {
    options: ['Loss of ₹5,000', 'Profit of ₹5,000', 'Loss of ₹15,000', 'Profit of ₹15,000'],
    correct: 2,
    explanation: 'Debit side of Realisation = assets ₹1,50,000 + creditors paid ₹57,000 + expenses ₹2,000 = ₹2,09,000. Credit side = creditors ₹60,000 + machinery taken by M ₹72,000 + debtors realised ₹36,000 + stock realised ₹26,000 = ₹1,94,000. Debit exceeds credit by ₹15,000, so there is a Realisation loss of ₹15,000.'
  },
  AC07Q71: {
    options: ['₹47,000', '₹53,000', '₹58,000', '₹65,000'],
    correct: 2,
    explanation: 'Realisation loss = assets ₹4,20,000 + creditors paid ₹78,000 + expenses ₹4,000 - creditors ₹80,000 - assets realised ₹3,50,000 = ₹72,000. C bears 1/6 of the loss = ₹12,000. C’s final capital receipt = ₹70,000 - ₹12,000 = ₹58,000.'
  },
  AC07Q72: {
    options: ['Loss of ₹500', 'Profit of ₹1,500', 'Profit of ₹500', 'Profit of ₹2,500'],
    correct: 1,
    explanation: 'Unrecorded creditor paid causes a ₹6,000 loss. Unrecorded investment sold creates a ₹9,000 gain. Employee claim settled at ₹3,500 causes a ₹3,500 loss. Machine of ₹20,000 handed to a ₹22,000 creditor creates a net ₹2,000 gain. Net effect = -₹6,000 + ₹9,000 - ₹3,500 + ₹2,000 = ₹1,500 profit.'
  },
  AC07Q73: {
    options: ['₹68,000 (Cr)', '₹62,000 (Cr)', '₹58,000 (Cr)', '₹70,000 (Cr)'],
    correct: 0,
    explanation: 'Q receives 2/5 of General Reserve = ₹12,000 and bears 2/5 of accumulated loss = ₹4,000. Q also bears 2/5 of Realisation loss = ₹20,000. Final capital = ₹80,000 + ₹12,000 - ₹4,000 - ₹20,000 = ₹68,000 credit.'
  },
  AC07Q74: {
    options: ['Loss of ₹2,000', 'Profit of ₹6,000', 'Loss of ₹11,000', 'Profit of ₹2,000'],
    correct: 2,
    explanation: 'Debit side of Realisation = assets ₹1,75,000 + creditors paid ₹42,000 + expenses ₹3,000 = ₹2,20,000. Credit side = creditors ₹45,000 + plant taken by A ₹70,000 + debtors taken by B ₹54,000 + stock realised ₹40,000 = ₹2,09,000. Loss = ₹2,20,000 - ₹2,09,000 = ₹11,000.'
  },
  AC07Q76: {
    options: ['₹3,000', '₹9,000', '₹1,800', '₹12,000'],
    correct: 2,
    explanation: 'Realisation loss per partner = ₹99,000 / 3 = ₹33,000. C has capital of ₹30,000, so C’s deficiency is ₹3,000. Under Garner v Murray, solvent partners bear the deficiency in their capital ratio. A:B capital ratio = ₹60,000:₹40,000 = 3:2. A bears 3/5 x ₹3,000 = ₹1,800.'
  },
  AC07Q79: {
    options: ['Loss of ₹7,200', 'Profit of ₹6,000', 'Profit of ₹3,000', 'Loss of ₹3,000'],
    correct: 0,
    explanation: 'Plant loss = ₹10,000, stock gain = ₹5,000, debtors loss = ₹3,000, creditor saving = ₹3,000, unrecorded liability = ₹5,000 loss, and expenses paid by Q = ₹2,000 loss. Net Realisation loss = ₹12,000. P bears 3/5 of the loss = ₹7,200.'
  },
  AC07Q81: {
    options: ['Loss share ₹10,500; Final capital ₹79,500', 'Loss share ₹9,000; Final capital ₹81,000', 'Loss share ₹7,500; Final capital ₹82,500', 'Loss share ₹13,500; Final capital ₹76,500'],
    correct: 0,
    explanation: 'Realisation debit = assets ₹2,60,000 + creditors paid ₹66,000 + expenses ₹4,000 = ₹3,30,000. Realisation credit = creditors ₹70,000 + machinery ₹1,05,000 + debtors ₹72,000 + stock ₹55,000 = ₹3,02,000. Loss = ₹28,000. V’s share in 5:3 ratio = 3/8 x ₹28,000 = ₹10,500. V’s final capital = ₹90,000 - ₹10,500 = ₹79,500.'
  },
  AC07Q82: {
    options: ['₹36,000', '₹27,600', '₹24,000', '₹26,400'],
    correct: 2,
    explanation: 'A’s own share of Realisation loss in the 2:2:1 ratio = ₹60,000 x 2/5 = ₹24,000. C’s capital after bearing his loss is ₹50,000 - ₹12,000 = ₹38,000 credit, so C has no deficiency. Garner v Murray is not triggered. A’s total burden is therefore ₹24,000.'
  },
  AC07Q83: {
    options: ['Loss of ₹14,500', 'Loss of ₹10,500', 'Loss of ₹12,500', 'Profit of ₹5,500'],
    correct: 0,
    explanation: 'Motor vehicle loss = ₹1,00,000 - ₹90,000 = ₹10,000. Unrecorded investment realised gives a ₹15,000 gain. Prepaid insurance loss = ₹4,000 - ₹2,500 = ₹1,500. Unrecorded loan paid causes an ₹18,000 loss. Net result = -₹10,000 + ₹15,000 - ₹1,500 - ₹18,000 = ₹14,500 loss.'
  },
  AC07Q84: {
    options: ['J = ₹57,000; K = ₹62,000', 'J = ₹54,000; K = ₹59,000', 'J = ₹60,000; K = ₹65,000', 'J = ₹52,000; K = ₹57,000'],
    correct: 0,
    explanation: 'Non-cash assets of ₹1,70,000 realise 90%, or ₹1,53,000. Cash available before creditor payment = ₹25,000 + ₹1,53,000 = ₹1,78,000. Creditors are paid ₹57,000 and expenses are ₹2,000, leaving ₹1,19,000. Realisation loss = ₹16,000, shared equally. J receives ₹65,000 - ₹8,000 = ₹57,000 and K receives ₹70,000 - ₹8,000 = ₹62,000.'
  },
  AC07Q91: {
    options: ['Profit ₹47,000', 'Profit ₹7,000', 'Profit ₹2,000', 'Loss ₹13,000'],
    correct: 0,
    explanation: 'Bank overdraft of ₹30,000 is settled for ₹28,000, giving a ₹2,000 gain. The unrecorded building has no book value and is taken over by F at ₹45,000, creating a ₹45,000 gain. Total profit from these two items = ₹2,000 + ₹45,000 = ₹47,000.'
  },
  AC07Q93: {
    options: ['₹1,00,000', '₹80,000', '₹2,00,000', '₹1,40,000'],
    correct: 0,
    explanation: 'S receives 3/10 of the ₹1,00,000 Realisation profit = ₹30,000. S’s capital after profit = ₹1,50,000 + ₹30,000 = ₹1,80,000. Since S takes machinery at ₹80,000, S’s cash receipt = ₹1,80,000 - ₹80,000 = ₹1,00,000.'
  },
  AC07Q100: {
    options: ['₹1,60,000', '₹1,80,000', '₹1,48,000', '₹1,40,000'],
    correct: 2,
    explanation: 'Realisation loss = assets ₹5,00,000 + liabilities paid ₹1,42,000 + expenses ₹8,000 - creditors ₹1,50,000 - assets realised ₹4,20,000 = ₹80,000. B bears 2/5 of the loss = ₹32,000. B’s capital after loss = ₹1,20,000 - ₹32,000 = ₹88,000. Including B’s loan of ₹60,000, B’s total cash receipt = ₹1,48,000.'
  },
  AC07Q105: {
    options: ['Loss of ₹20,000 shared 2:1:1 only', 'Realisation Loss ₹15,000 only', 'Loss of ₹20,000 through Realisation; IFF of ₹25,000 credited to capitals', 'No Realisation loss; excess IFF ₹5,000 credited to Capitals in PSR'],
    correct: 3,
    explanation: 'Investments have book value ₹80,000 and are sold for ₹60,000, so the fall is ₹20,000. The Investments Fluctuation Fund of ₹25,000 first covers the ₹20,000 fall. The remaining ₹5,000 is credited to partners’ capital accounts in the profit-sharing ratio. There is no net Realisation loss from the investment after using the fund.'
  },
  AC07Q108: {
    options: ['₹1,32,000', '₹1,18,000', '₹1,26,600', '₹1,38,000'],
    correct: 2,
    explanation: 'L bears 3/5 of the P&L debit balance ₹20,000 = ₹12,000, so L’s capital becomes ₹1,38,000. Realisation loss = assets ₹2,80,000 + creditors paid ₹76,000 + expenses ₹3,000 - creditors ₹80,000 - assets realised ₹2,60,000 = ₹19,000. L bears 3/5 of this = ₹11,400. Final capital = ₹1,38,000 - ₹11,400 = ₹1,26,600.'
  },
  AC07Q115: {
    options: ['₹1,81,000', '₹1,74,000', '₹1,65,000', '₹1,56,000'],
    correct: 0,
    explanation: 'Assets realise 85% of ₹5,60,000 = ₹4,76,000. Outside liabilities are settled for 90% of ₹1,60,000 = ₹1,44,000. Realisation loss = ₹5,60,000 + ₹1,44,000 + ₹10,000 - ₹1,60,000 - ₹4,76,000 = ₹78,000. Since no ratio is given, the loss is shared equally. A bears ₹39,000, so A’s final capital balance = ₹2,20,000 - ₹39,000 = ₹1,81,000.'
  },
  AC07Q116: {
    options: ['₹1,20,000', '₹1,11,000', '₹1,14,000', '₹1,05,000'],
    correct: 1,
    explanation: 'Q’s debit balance is ₹15,000 and Q can pay only ₹6,000, leaving a deficiency of ₹9,000. Since P is the only solvent partner, P bears the full deficiency under Garner v Murray. P’s final receipt = ₹1,20,000 - ₹9,000 = ₹1,11,000.'
  },
  AC07Q127: {
    options: ['M owes ₹30,000; N = ₹20,000; O = ₹50,000', 'M = ₹0; N = ₹60,000; O = ₹50,000', 'M owes ₹30,000; N = ₹60,000; O = ₹50,000', 'M = ₹10,000; N = ₹60,000; O = ₹50,000'],
    correct: 0,
    explanation: 'Realisation loss of ₹1,20,000 is shared 3:2:1. M bears ₹60,000, N bears ₹40,000 and O bears ₹20,000. M’s capital after loss and land takeover = ₹1,50,000 - ₹60,000 - ₹1,20,000 = ₹30,000 debit, so M owes ₹30,000. N’s cash receipt = ₹1,00,000 - ₹40,000 - ₹40,000 = ₹20,000. O receives ₹70,000 - ₹20,000 = ₹50,000.'
  },
  AC07Q136: {
    options: ['₹22,000', '₹18,000', '₹12,000', '₹15,000'],
    correct: 3,
    explanation: 'Outstanding expenses paid at book value have no net effect on Realisation. Prepaid insurance of ₹3,000 is an asset with no recovery, so it gives a net debit of ₹3,000. Accrued rent receivable collected at book value has no net effect. The unrecorded gratuity claim paid creates a debit of ₹12,000. Total net debit = ₹3,000 + ₹12,000 = ₹15,000.'
  },
  AC07Q137: {
    options: ['₹80,000', '₹90,000', '₹95,000', '₹75,000'],
    correct: 0,
    explanation: 'General Reserve and P&L credit total ₹60,000. U’s share in 3:1 = ₹15,000, so U’s capital becomes ₹95,000. U bears 1/4 of the ₹60,000 Realisation loss = ₹15,000. U does not take over the plant. U’s final cash receipt = ₹95,000 - ₹15,000 = ₹80,000.'
  },
  AC07Q138: {
    options: ['Loss of ₹72,000', 'Loss of ₹52,000', 'Profit of ₹8,000', 'Loss of ₹28,000'],
    correct: 2,
    explanation: 'Debit side of Realisation = assets ₹6,00,000 + liabilities paid ₹1,85,000 + expenses ₹7,000 = ₹7,92,000. Credit side = liabilities ₹2,00,000 + cash realised ₹5,20,000 + assets taken by partners ₹80,000 = ₹8,00,000. Credit exceeds debit by ₹8,000, so there is a Realisation profit of ₹8,000.'
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
console.log(`Updated ${changed} AC07 questions in ${file}`);
