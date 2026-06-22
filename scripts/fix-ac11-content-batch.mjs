import { readFile, writeFile } from 'node:fs/promises';

const file = 'questions/accountancy/AC11.json';
const data = JSON.parse(await readFile(file, 'utf8'));

const fixes = new Map(Object.entries({
  AC11Q04: {
    options: ['₹4,000; Securities Premium ₹800', '₹2,800; Securities Premium ₹0', '₹2,800; Securities Premium ₹800', '₹4,000; Securities Premium ₹0'],
    correct: 0,
    explanation: 'On forfeiture, Share Capital is debited with the called-up amount on the forfeited shares: 400 x ₹10 = ₹4,000. Securities Premium already credited but unpaid is reversed: 400 x ₹2 = ₹800.'
  },
  AC11Q05: {
    options: ['₹1,200', '₹600', '₹1,800', '₹2,400'],
    correct: 1,
    explanation: 'Amount received before forfeiture was application ₹5 + allotment ₹3 = ₹8 per share. Reissue at ₹6 as fully paid gives a discount of ₹4 per share. Capital Reserve per share = ₹8 - ₹4 = ₹4. For 150 shares, Capital Reserve = 150 x ₹4 = ₹600.'
  },
  AC11Q09: {
    options: ['₹1,200', '₹800', '₹0', '₹1,600'],
    correct: 2,
    explanation: 'The company had received ₹6 per forfeited share. Reissue at ₹14 as fully paid gives a discount of ₹6 per share. The whole forfeited amount is used to cover the discount, so no balance remains for Capital Reserve.'
  },
  AC11Q12: {
    options: ['₹8,500', '₹4,000', '₹6,000', '₹5,500'],
    correct: 0,
    explanation: 'Amount received from A = 500 x (₹4 + ₹6) = ₹5,000. Amount received from B = 500 x ₹7 = ₹3,500. Total credited to Forfeited Shares Account = ₹5,000 + ₹3,500 = ₹8,500.'
  },
  AC11Q14: {
    options: ['₹4,800', '₹3,600', '₹2,400', '₹1,200'],
    correct: 0,
    explanation: 'Amount received before forfeiture was ₹5 per share. On reissue at ₹7 as fully paid, discount is ₹3 per share. Capital Reserve per share = ₹5 - ₹3 = ₹2. For 2,400 reissued shares, Capital Reserve = 2,400 x ₹2 = ₹4,800.'
  },
  AC11Q16: {
    options: ['₹2 per share', '₹1 per share', '₹3 per share', 'No profit - shares reissued at a discount'],
    correct: 2,
    explanation: 'Amount received before forfeiture was ₹7 per share. Reissue at ₹8 as fully paid gives a discount of ₹4 per share. Capital Reserve per share = ₹7 - ₹4 = ₹3.'
  },
  AC11Q17: {
    options: ['₹1,200', '₹1,000', '₹900', '₹1,500'],
    correct: 0,
    explanation: 'P paid only application money, so forfeited amount on P shares = 200 x ₹3 = ₹600. Reissue at ₹7 as fully paid gives a discount of ₹3 per share, using the full ₹600 and leaving no Capital Reserve. Q paid application and allotment, so forfeited amount on Q shares = 300 x ₹6 = ₹1,800. Reissue at ₹8 as fully paid gives a discount of ₹2 per share, or ₹600. Capital Reserve = ₹1,800 - ₹600 = ₹1,200.'
  },
  AC11Q19: {
    options: ['₹400', '₹0', '₹1,200', '₹800'],
    correct: 0,
    explanation: 'On reissue at ₹12 for a ₹10 share, the premium is ₹2 per share. For 200 shares, Securities Premium credited on reissue = 200 x ₹2 = ₹400.'
  },
  AC11Q21: {
    options: ['₹1,000', '₹800', '₹700', '₹600'],
    correct: 0,
    explanation: 'Amount received before forfeiture was ₹6 per share. Reissue at ₹8 as fully paid gives a discount of ₹2 per share. Capital Reserve per share = ₹6 - ₹2 = ₹4. For 250 shares, Capital Reserve = 250 x ₹4 = ₹1,000.'
  },
  AC11Q23: {
    options: ['₹1,800', '₹1,400', '₹2,000', 'Invalid reissue; no valid Capital Reserve can be computed'],
    correct: 3,
    explanation: 'Only ₹2 per share had been received before forfeiture. A reissue at ₹8 as fully paid is valid because the discount is ₹2 per share, but a reissue at ₹7 as fully paid gives a ₹3 discount, which exceeds the forfeited amount per share. That part of the reissue is invalid, so no valid total Capital Reserve can be computed from the given data.'
  },
  AC11Q25: {
    options: ['₹3,000', '₹2,100', '₹1,500', '₹2,700'],
    correct: 1,
    explanation: 'The forfeited amount excludes securities premium. Face value received before forfeiture was application ₹5 plus the face portion of allotment ₹5 = ₹10 per share. Reissue at ₹17 as fully paid gives a discount of ₹3 per share. Capital Reserve = 300 x (₹10 - ₹3) = ₹2,100.'
  },
  AC11Q28: {
    options: ['₹4,800', '₹3,200', '₹2,400', '₹4,000'],
    correct: 2,
    explanation: 'The forfeited amount excludes securities premium. Face value received before forfeiture was application ₹3 plus the face portion of allotment ₹3 = ₹6 per share. Reissue at ₹12 as fully paid gives no discount on a ₹10 share, so Capital Reserve for 400 reissued shares = 400 x ₹6 = ₹2,400.'
  },
  AC11Q30: {
    options: ['₹240', '₹360', '₹200', '₹80'],
    correct: 3,
    explanation: 'Amount received before forfeiture was ₹2 per share. For 60 shares reissued at ₹8 as fully paid, the ₹2 discount uses the full forfeited amount, so Capital Reserve is nil. For 40 shares reissued at ₹11 as fully paid, there is no discount, so Capital Reserve = 40 x ₹2 = ₹80.'
  },
  AC11Q32: {
    options: ['₹1,600', '₹2,400', '₹400', '₹1,200'],
    correct: 0,
    explanation: 'Forfeited amount = 400 x ₹6 = ₹2,400. Reissue at ₹8 as fully paid gives a discount of ₹2 per share, so total discount = 400 x ₹2 = ₹800. Balance transferred to Capital Reserve = ₹2,400 - ₹800 = ₹1,600.'
  },
  AC11Q33: {
    options: ['₹2,000', '₹1,400', '₹1,700', '₹1,800'],
    correct: 2,
    explanation: 'P contributed ₹3,000 on 400 shares and Q contributed ₹2,800 on 400 shares, so the average forfeited amount is ₹5,800 / 800 = ₹7.25 per share. Reissue at ₹12 as fully paid gives a discount of ₹3 per share. Capital Reserve for 400 proportionately reissued shares = 400 x (₹7.25 - ₹3) = ₹1,700.'
  },
  AC11Q35: {
    options: ['₹6,300', '₹4,200', '₹5,600', '₹4,900'],
    correct: 0,
    explanation: 'The forfeited amount for the 700 reissued shares is 700 x ₹9 = ₹6,300. Since the shares are reissued at par as fully paid, no discount is charged. The full forfeited amount related to the reissued shares is transferred to Capital Reserve.'
  },
  AC11Q40: {
    options: ['₹3,500', '₹2,000', '₹1,500', '₹4,000'],
    correct: 0,
    explanation: 'The forfeited amount excludes securities premium. Face value received before forfeiture was application ₹25 plus the face portion of allotment ₹25 = ₹50 per share. Reissue at ₹85 as fully paid gives a discount of ₹15 per share. Capital Reserve = 100 x (₹50 - ₹15) = ₹3,500.'
  },
  AC11Q43: {
    options: ['₹5,800', '₹4,900', '₹5,400', '₹4,600'],
    correct: 2,
    explanation: 'Amount forfeited was ₹6 per share. On 700 shares reissued at par, Capital Reserve = 700 x ₹6 = ₹4,200. On 300 shares reissued at ₹8 as fully paid, discount is ₹2 per share, so Capital Reserve = 300 x (₹6 - ₹2) = ₹1,200. Total Capital Reserve = ₹4,200 + ₹1,200 = ₹5,400.'
  },
  AC11Q45: {
    options: ['Capital Reserve = ₹2,500; no discount on reissue', 'Capital Reserve = ₹1,500; discount ₹2 per share charged to Forfeited Shares', 'Capital Reserve = ₹1,000; discount ₹1 per share charged to Forfeited Shares', 'Capital Reserve = ₹0; all forfeited amount used as discount'],
    correct: 0,
    explanation: 'The company had received ₹5 per share before forfeiture. The shares were reissued at ₹8 as ₹8 paid up, so there is no discount on reissue. Capital Reserve = 500 x ₹5 = ₹2,500.'
  },
  AC11Q48: {
    options: ['₹5,600', '₹6,400', '₹4,800', '₹7,200'],
    correct: 0,
    explanation: 'The forfeited amount excludes securities premium. Face value received before forfeiture was application ₹3, face portion of allotment ₹3, and first call ₹2 = ₹8 per share. Reissue at ₹9 as fully paid gives a discount of ₹1 per share. Capital Reserve = 800 x (₹8 - ₹1) = ₹5,600.'
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
console.log(`Updated ${changed} AC11 questions in ${file}`);
