import { readFile, writeFile } from 'node:fs/promises';

const file = 'questions/accountancy/AC11.json';
const data = JSON.parse(await readFile(file, 'utf8'));

const fixes = new Map(Object.entries({
  AC11Q50: {
    options: ['₹2,200', '₹1,400', '₹1,800', '₹1,200'],
    correct: 3,
    explanation: 'Securities premium already received remains in Securities Premium and is not credited to Forfeited Shares. Face value received was ₹3 on application and ₹3 on allotment, or ₹6 per share. Forfeited Shares balance for 200 shares = 200 x ₹6 = ₹1,200. The shares are reissued at ₹15, which is above the ₹10 face value, so there is no discount. Capital Reserve = ₹1,200.'
  },
  AC11Q51: {
    options: ['₹2,800', '₹1,800', '₹2,200', '₹3,000'],
    correct: 1,
    explanation: 'Forfeited Shares balance = 600 x ₹5 = ₹3,000. On 400 reissued shares, the discount is ₹3 per share, or ₹1,200. Capital Reserve from reissued shares = 400 x ₹5 - ₹1,200 = ₹800. The remaining 200 cancelled shares carry 200 x ₹5 = ₹1,000. Total Capital Reserve = ₹800 + ₹1,000 = ₹1,800.'
  },
  AC11Q53: {
    options: ['₹2,000', '₹1,200', '₹1,600', '₹2,200'],
    correct: 1,
    explanation: 'For the 600 reissued shares from C, forfeited amount = 600 x ₹2 = ₹1,200 and reissue discount = 600 x ₹2 = ₹1,200, so Capital Reserve is nil. For the 400 reissued shares from D, forfeited amount = 400 x ₹5 = ₹2,000 and discount = 400 x ₹2 = ₹800. Capital Reserve = ₹2,000 - ₹800 = ₹1,200.'
  },
  AC11Q55: {
    question: 'Polaris Ltd. issued 8,000 shares ₹10 each at ₹11. Payable: Application ₹3, Allotment ₹4 (incl. ₹1 premium), 1st Call ₹2, 2nd Call ₹2. Mr. E (400 shares) paid application only. Mr. F (600 shares) paid app + allotment + 1st call. Forfeited after 2nd call default. 400 shares from Mr. E were reissued at ₹10 fully paid. Capital Reserve from Mr. E’s reissued shares = ?',
    options: ['₹3,500', '₹1,200', '₹1,500', '₹2,000'],
    correct: 1,
    explanation: 'Mr. E paid only application money of ₹3 per share. Since these shares are reissued at par as fully paid, there is no discount on reissue. Capital Reserve from Mr. E’s 400 reissued shares = 400 x ₹3 = ₹1,200.'
  },
  AC11Q56: {
    options: ['Capital Reserve ₹700; Securities Premium ₹200', 'Capital Reserve ₹1,100; Securities Premium ₹0', 'Capital Reserve ₹900; Securities Premium ₹200', 'Capital Reserve ₹700; Securities Premium ₹0'],
    correct: 1,
    explanation: 'Amount forfeited per share = ₹2 + ₹3 = ₹5. For 300 shares reissued at ₹6, discount = ₹4 per share and Capital Reserve = 300 x (₹5 - ₹4) = ₹300. For 200 shares reissued at ₹9, discount = ₹1 per share and Capital Reserve = 200 x (₹5 - ₹1) = ₹800. Total Capital Reserve = ₹1,100. Both reissue prices are below face value, so Securities Premium is ₹0.'
  },
  AC11Q59: {
    options: ['₹5 reissue is valid; Capital Reserve = ₹2,500', '₹5 reissue is invalid; Capital Reserve from 500 shares reissued at ₹8 = ₹500', '₹5 reissue is valid; Capital Reserve = ₹1,500', 'Both reissues valid; Capital Reserve = ₹4,000'],
    correct: 1,
    explanation: 'The original holder paid only ₹3 per share, so the maximum permissible reissue discount is ₹3 per share. Reissue at ₹5 as fully paid gives a ₹5 discount and is invalid. The valid reissue at ₹8 gives a discount of ₹2 per share. Capital Reserve from that batch = 500 x (₹3 - ₹2) = ₹500.'
  },
  AC11Q60: {
    options: ['Capital Reserve ₹800', 'Capital Reserve ₹1,600', 'Capital Reserve ₹400', 'Capital Reserve ₹1,200'],
    correct: 3,
    explanation: 'Premium already received is not reversed. Face value received was ₹3 on application and ₹3 on allotment, or ₹6 per share. For 400 reissued shares, forfeited amount = 400 x ₹6 = ₹2,400. Reissue at ₹7 as fully paid gives a discount of ₹3 per share, or ₹1,200. Capital Reserve = ₹2,400 - ₹1,200 = ₹1,200.'
  },
  AC11Q63: {
    options: ['Capital Reserve ₹1,800', 'Capital Reserve ₹2,400', 'Capital Reserve ₹1,200', 'Capital Reserve ₹3,000'],
    correct: 3,
    explanation: 'The shares are reissued as ₹20 called up, so discount = ₹20 - ₹18 = ₹2 per share. Forfeited amount relating to 300 reissued shares = 300 x ₹12 = ₹3,600. Discount on reissue = 300 x ₹2 = ₹600. Capital Reserve = ₹3,600 - ₹600 = ₹3,000.'
  },
  AC11Q73: {
    options: ['₹2,400', '₹3,200', '₹1,600', '₹4,000'],
    correct: 0,
    explanation: 'Premium already received on allotment remains in Securities Premium. Face value received was ₹3 application plus ₹2 face portion of allotment = ₹5 per share. For 800 reissued shares, forfeited amount = 800 x ₹5 = ₹4,000. Reissue at ₹8 as fully paid gives a discount of ₹2 per share, or ₹1,600. Capital Reserve = ₹4,000 - ₹1,600 = ₹2,400.'
  },
  AC11Q82: {
    options: ['₹5 per share', '₹15 per share', '₹0 per share — no minimum since premium was received', '₹10 per share'],
    correct: 0,
    explanation: 'Only the face-value amount received can reduce the minimum reissue price. The shareholder had paid ₹5 towards face value and ₹5 as premium. To make up the ₹10 face value, the minimum reissue price is ₹10 - ₹5 = ₹5 per share.'
  },
  AC11Q84: {
    options: ['₹4,300', '₹2,600', '₹2,200', '₹3,600'],
    correct: 0,
    explanation: 'Premium already received is excluded from the forfeited amount. Face value received per share = ₹4 application + ₹2 allotment face + ₹3 first call = ₹9. For 300 shares reissued at ₹12, Capital Reserve = 300 x ₹9 = ₹2,700 and Securities Premium on reissue is ₹600. For 200 shares reissued at ₹9, discount = ₹1 per share, so Capital Reserve = 200 x ₹9 - ₹200 = ₹1,600. Total Capital Reserve = ₹2,700 + ₹1,600 = ₹4,300.'
  },
  AC11Q89: {
    options: ['Capital Reserve ₹4,500 from reissue; ₹1,500 from cancellation; Total ₹6,000', 'Capital Reserve ₹3,000 from reissue; ₹1,500 from cancellation; Total ₹4,500', 'Capital Reserve ₹2,500 from reissue only; cancelled shares not transferred', 'Capital Reserve ₹3,500 from reissue + cancellation'],
    correct: 1,
    explanation: 'Amount forfeited per share = ₹6. For 500 shares reissued at ₹11, there is no discount and there is ₹1 premium per share credited separately to Securities Premium. Capital Reserve from reissued shares = 500 x ₹6 = ₹3,000. The 250 cancelled shares carry 250 x ₹6 = ₹1,500. Total Capital Reserve = ₹4,500.'
  },
  AC11Q90: {
    options: ['SC ₹2,00,000; Sec Prem ₹21,500; CR ₹19,000', 'SC ₹2,00,000; Sec Prem ₹22,000; CR ₹19,000', 'SC ₹2,00,000; Sec Prem ₹23,500; CR ₹19,000', 'SC ₹2,05,000; Sec Prem ₹20,000; CR ₹15,000'],
    correct: 0,
    explanation: 'On forfeiture, Share Capital decreases by 500 x ₹10 = ₹5,000 and Forfeited Shares is credited by 500 x ₹8 = ₹4,000. On reissue at ₹13, Share Capital is restored by ₹5,000 and Securities Premium increases by 500 x ₹3 = ₹1,500. Final balances are Share Capital ₹2,00,000, Securities Premium ₹21,500, and Capital Reserve ₹15,000 + ₹4,000 = ₹19,000.'
  },
  AC11Q93: {
    options: ['Both valid; Capital Reserve = ₹1,500', '1,000 at ₹8 valid; 500 at ₹3 invalid; Capital Reserve from valid batch = ₹2,000', '1,000 at ₹8 valid; 500 at ₹3 invalid; Capital Reserve = ₹0', 'Both valid; Capital Reserve = ₹3,500'],
    correct: 1,
    explanation: 'Forfeited amount per share is ₹4, so the maximum discount is ₹4 per share. The 1,000 shares reissued at ₹8 are valid because discount is ₹2 per share, leaving Capital Reserve = 1,000 x (₹4 - ₹2) = ₹2,000. The 500 shares reissued at ₹3 are invalid because discount is ₹7 per share, which exceeds the forfeited amount.'
  },
  AC11Q100: {
    options: ['₹2,400', '₹1,750', '₹2,650', '₹1,950'],
    correct: 2,
    explanation: 'Amount forfeited per share = ₹6. For 350 shares reissued at ₹9, discount = ₹1 per share, so Capital Reserve = 350 x (₹6 - ₹1) = ₹1,750. For 150 shares reissued at ₹11, there is no discount and the ₹1 premium per share is credited to Securities Premium, so Capital Reserve = 150 x ₹6 = ₹900. Total Capital Reserve = ₹1,750 + ₹900 = ₹2,650.'
  },
  AC11Q101: {
    options: ['₹0', '₹1,800', '₹3,150', '₹450'],
    correct: 1,
    explanation: 'Forfeited Shares balance = 450 x ₹7 = ₹3,150. Reissue at ₹7 as fully paid gives a discount of ₹3 per share on a ₹10 share, so total discount = 450 x ₹3 = ₹1,350. Capital Reserve = ₹3,150 - ₹1,350 = ₹1,800.'
  },
  AC11Q102: {
    options: ['Share Capital Dr ₹6,000; Sec Prem Dr ₹1,200; To Forfeited Shares ₹5,400; To Calls-in-Arrears ₹1,800', 'Share Capital Dr ₹6,000; To Forfeited Shares ₹4,200; To Calls-in-Arrears ₹1,800', 'Share Capital Dr ₹7,200; Sec Prem Dr ₹1,200; To Forfeited Shares ₹5,400; To Calls-in-Arrears ₹3,000', 'Share Capital Dr ₹6,000; Sec Prem Dr ₹0; To Forfeited Shares ₹5,400; To Calls-in-Arrears ₹600'],
    correct: 1,
    explanation: 'The holder paid application and allotment, so the ₹2 premium on allotment was received and is not reversed. Face value received = ₹4 application + ₹3 allotment face = ₹7 per share. For 600 shares, Forfeited Shares is credited by ₹4,200. The unpaid first call is ₹3 per share, or ₹1,800. The entry is: Share Capital Dr ₹6,000; To Forfeited Shares ₹4,200; To Calls-in-Arrears ₹1,800.'
  },
  AC11Q109: {
    options: ['₹200', '₹0', '₹400', '₹800'],
    correct: 1,
    explanation: 'The shareholder paid only ₹4 per share. Reissue at ₹6 as fully paid gives a discount of ₹4 per share. Since discount equals the forfeited amount per share, the entire Forfeited Shares balance relating to the 200 reissued shares is used to cover the discount. Capital Reserve = ₹0.'
  },
  AC11Q117: {
    options: ['₹2,400', '₹3,000', '₹1,800', '₹4,200'],
    correct: 0,
    explanation: 'Premium already received is excluded from the forfeited amount. Face value received = ₹5 application + ₹5 allotment face = ₹10 per share. For 300 reissued shares, forfeited amount = ₹3,000. Reissue at ₹18 as fully paid on a ₹20 share gives a discount of ₹2 per share, or ₹600. Capital Reserve = ₹3,000 - ₹600 = ₹2,400.'
  },
  AC11Q123: {
    options: ['₹0', '₹800', '₹1,600', '₹2,400'],
    correct: 2,
    explanation: 'Premium already received is excluded from the forfeited amount. Face value received = ₹4 application + ₹2 allotment face = ₹6 per share. For 800 reissued shares, forfeited amount = 800 x ₹6 = ₹4,800. Reissue at ₹6 as fully paid gives a discount of ₹4 per share, or ₹3,200. Capital Reserve = ₹4,800 - ₹3,200 = ₹1,600.'
  },
  AC11Q125: {
    options: ['700 shares reissued at ₹7.50 per share', '583 shares at ₹4 per share (approx.)', '700 shares at ₹5 per share', '500 shares at ₹3 per share'],
    correct: 2,
    explanation: 'Forfeited Shares was credited by ₹15,000 and debited by ₹3,500 for discount, leaving ₹11,500 for Capital Reserve. Option C matches the discount: 700 shares at ₹5 have discount ₹5 per share, so total discount = 700 x ₹5 = ₹3,500. For those 700 shares, Capital Reserve = 700 x ₹6 - ₹3,500 = ₹700. The unreissued 1,800 shares carry ₹10,800. Total Capital Reserve = ₹700 + ₹10,800 = ₹11,500.'
  },
  AC11Q127: {
    options: ['Sec Prem ₹3,000; Capital Reserve ₹8,000', 'Sec Prem ₹3,000; Capital Reserve ₹9,600', 'Sec Prem ₹0; Capital Reserve ₹8,000', 'Sec Prem ₹3,000; Capital Reserve ₹6,000'],
    correct: 0,
    explanation: 'The shareholder had paid ₹8 per share before forfeiture. Reissue of 1,000 shares at ₹13 gives Securities Premium = 1,000 x ₹3 = ₹3,000 and no discount. Capital Reserve for the reissued shares = 1,000 x ₹8 = ₹8,000.'
  }
}));

let changed = 0;
for (const question of data.questions) {
  const fix = fixes.get(question.id);
  if (!fix) continue;
  if (!('correct_content_review_original' in question) && question.correct !== fix.correct) {
    question.correct_content_review_original = question.correct;
  }
  if (fix.question) question.question = fix.question;
  question.options = fix.options;
  question.correct = fix.correct;
  question.explanation = fix.explanation;
  changed += 1;
}

await writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Updated ${changed} AC11 questions in ${file}`);
