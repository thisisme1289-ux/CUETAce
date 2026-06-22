import { readFile, writeFile } from 'node:fs/promises';

const file = 'questions/accountancy/AC10.json';
const data = JSON.parse(await readFile(file, 'utf8'));

const fixes = new Map(Object.entries({
  AC10Q06: {
    options: ['Rs.4,000', 'Rs.2,000', 'Rs.3,500', 'Rs.5,000'],
    correct: 0,
    explanation: 'Pro-rata ratio is 2,00,000:3,00,000 = 2:3. Mohan applied for 1,500 shares, so he is allotted 1,000 shares. Application money paid = 1,500 x Rs.2 = Rs.3,000. Application money required on allotted shares = 1,000 x Rs.2 = Rs.2,000, so excess application money = Rs.1,000. Allotment due = 1,000 x Rs.5 = Rs.5,000. Net allotment payable = Rs.5,000 - Rs.1,000 = Rs.4,000.'
  },
  AC10Q09: {
    correct: 1,
    explanation: 'The assertion is true: when a shareholder fails to pay call money, Calls-in-Arrears A/c is debited and the respective call account is credited. The reason is also true because calls-in-arrears represent unpaid call money and are deducted from subscribed capital to show paid-up capital. However, the reason defines the effect of calls-in-arrears; it does not explain the journal entry. Therefore both A and R are true, but R is not the correct explanation of A.'
  },
  AC10Q14: {
    correct: 0,
    explanation: 'Pro-rata ratio is 3:4. Suresh applied for 400 shares, so he is allotted 400 x 3/4 = 300 shares. Application money paid = 400 x Rs.4 = Rs.1,600. Application money required = 300 x Rs.4 = Rs.1,200, so excess = Rs.400. Allotment due = 300 x Rs.5 = Rs.1,500. Net payable on allotment = Rs.1,500 - Rs.400 = Rs.1,100.'
  },
  AC10Q22: {
    options: ['Rs.3,75,000', 'Rs.2,25,000', 'Rs.3,30,000', 'Rs.4,50,000'],
    correct: 2,
    explanation: 'Valid applications = 1,00,000 - 10,000 = 90,000 shares. Excess applications among valid applicants = 90,000 - 75,000 = 15,000 shares. Excess application money adjusted = 15,000 x Rs.3 = Rs.45,000. Total allotment due = 75,000 x Rs.5 = Rs.3,75,000. Net bank receipt on allotment = Rs.3,75,000 - Rs.45,000 = Rs.3,30,000.'
  },
  AC10Q32: {
    options: ['Rs.6,000 (debit balance)', 'Rs.0 (fully settled)', 'Rs.4,000 (debit balance)', 'Rs.8,000 (credit balance)'],
    correct: 0,
    explanation: 'Valid applications are 75,000 shares and allotment is 50,000 shares, so the pro-rata ratio is 2:3. Vivek was allotted 1,000 shares, so he applied for 1,500 shares. Excess application money = 500 x Rs.4 = Rs.2,000. Allotment due = 1,000 x Rs.8 = Rs.8,000. Since Vivek paid no allotment money, the debit balance in Share Allotment Account is Rs.8,000 - Rs.2,000 = Rs.6,000.'
  },
  AC10Q35: {
    explanation: 'Net assets taken over = Rs.55,00,000 - Rs.18,00,000 = Rs.37,00,000. Purchase consideration is Rs.40,00,000. Since purchase consideration exceeds net assets by Rs.3,00,000, goodwill is Rs.3,00,000. Shares issued at Rs.8 per share = Rs.40,00,000 / Rs.8 = 5,00,000 shares. Therefore option A is correct.'
  },
  AC10Q38: {
    options: ['Rs.4,400', 'Rs.3,200', 'Rs.2,500', 'Rs.5,300'],
    correct: 3,
    explanation: 'Pro-rata ratio is 60,000:84,000 = 5:7. Rohit applied for 700 shares, so he is allotted 500 shares. Application money paid = 700 x Rs.4 = Rs.2,800. Application money required = 500 x Rs.4 = Rs.2,000, so excess = Rs.800. Allotment due = 500 x Rs.8 = Rs.4,000. Net allotment payable = Rs.4,000 - Rs.800 = Rs.3,200. He also paid calls-in-advance of Rs.2,100 on the allotment date, so total paid on that date = Rs.5,300.'
  },
  AC10Q40: {
    options: ['Rs.1,350', 'Rs.900', 'Rs.270', 'Rs.540'],
    correct: 0,
    explanation: 'Pro-rata ratio is 90,000:1,26,000 = 5:7. Monika applied for 1,260 shares, so she is allotted 900 shares. Final call due = 900 x Rs.30 = Rs.27,000. Interest on calls-in-arrears for 6 months at 10% p.a. = Rs.27,000 x 10% x 6/12 = Rs.1,350.'
  },
  AC10Q51: {
    options: ['Rs.80,000', 'Rs.5,60,000', 'Rs.2,10,000', 'Rs.1,60,000'],
    correct: 0,
    explanation: 'Total allotment due = 80,000 x Rs.7 = Rs.5,60,000. Excess application money adjusted = (1,20,000 - 80,000) x Rs.4 = Rs.1,60,000. Net allotment due after adjustment = Rs.5,60,000 - Rs.1,60,000 = Rs.4,00,000. Actual allotment money received is Rs.3,20,000, so calls-in-arrears on allotment = Rs.4,00,000 - Rs.3,20,000 = Rs.80,000.'
  },
  AC10Q54: {
    options: ['12,727 shares (approx)', '1,400 shares', '1,100 shares', '1,818 shares (approx)'],
    correct: 0,
    explanation: 'Total assets purchased = Rs.12,00,000 + Rs.3,00,000 + Rs.5,00,000 = Rs.20,00,000. Liabilities assumed = Rs.4,00,000 + Rs.2,00,000 = Rs.6,00,000. Net consideration = Rs.14,00,000. Issue price per preference share is Rs.110, so number of shares issued = Rs.14,00,000 / Rs.110 = 12,727 shares approximately.'
  },
  AC10Q65: {
    correct: 0,
    explanation: 'Valid applications = 2,40,000 - 15,000 = 2,25,000 shares. Shares offered = 1,50,000. Pro-rata ratio = 1,50,000:2,25,000 = 2:3. Applicants who applied for 9,000 shares receive 9,000 x 2/3 = 6,000 shares. Therefore option A is correct.'
  },
  AC10Q70: {
    options: ['Rs.10,00,000', 'Rs.50,000', 'Rs.1,50,000', 'Rs.2,00,000'],
    correct: 0,
    explanation: 'Equity shares issued = 10,000 x Rs.15 = Rs.1,50,000. Preference shares issued = 5,000 x Rs.100 = Rs.5,00,000. Total paid through shares = Rs.6,50,000. Purchase consideration is Rs.16,50,000, so cash payment = Rs.16,50,000 - Rs.6,50,000 = Rs.10,00,000.'
  },
  AC10Q75: {
    options: [
      'Cash = Rs.0; only shares issued',
      'Cash = Rs.27,00,000; Land Dr, Share Capital Cr, Securities Premium Cr, Bank Cr',
      'Cash = Rs.30,00,000; no shares issued',
      'Cash = Rs.20,00,000; Land Dr, Bank Cr'
    ],
    correct: 1,
    explanation: 'Issue price per share = Rs.10 + 50% premium = Rs.15. Value of shares issued = 20,000 x Rs.15 = Rs.3,00,000. Land purchase consideration is Rs.30,00,000, so cash balance paid = Rs.30,00,000 - Rs.3,00,000 = Rs.27,00,000. The entry includes Land A/c Dr, Share Capital Cr, Securities Premium Cr, and Bank Cr.'
  },
  AC10Q86: {
    options: [
      'Allotted 646.15 shares; arrears Rs.3,796 approx (data gives fractional shares)',
      'Allotted 700 shares; arrears Rs.5,740',
      'Allotted 630 shares; arrears Rs.4,270',
      'Allotted 700 shares; arrears Rs.4,200'
    ],
    correct: 0,
    explanation: 'Valid applications = 3,50,000 - 25,000 = 3,25,000 shares. Pro-rata ratio = 2,00,000:3,25,000 = 8:13. Rakesh applied for 1,050 shares, so the mathematical allotment is 1,050 x 8/13 = 646.15 shares, which is not a whole-share allotment. Application excess = (1,050 - 646.15) x Rs.5 = Rs.2,019.23. Allotment due = 646.15 x Rs.9 = Rs.5,815.38. Net arrears on allotment = Rs.5,815.38 - Rs.2,019.23 = Rs.3,796.15 approximately. The source data should be revised for a whole-share CUET-style question.'
  },
  AC10Q90: {
    correct: 0,
    explanation: 'Total assets = Rs.30,00,000 + Rs.20,00,000 + Rs.8,00,000 + Rs.4,00,000 = Rs.62,00,000. Total liabilities = Rs.5,00,000 + Rs.3,00,000 = Rs.8,00,000. Net assets and purchase consideration = Rs.54,00,000. Issue price per share = Rs.10 + Rs.5 premium = Rs.15. Number of shares issued = Rs.54,00,000 / Rs.15 = 3,60,000 shares.'
  },
  AC10Q101: {
    options: ['Allotted 1,125; Net Rs.6,750', 'Allotted 1,000; Net Rs.8,000', 'Allotted 1,125; Net Rs.8,325', 'Allotted 900; Net Rs.6,300'],
    correct: 0,
    explanation: 'Valid applications = 4,50,000 - 50,000 = 4,00,000 shares. Pro-rata ratio = 2,50,000:4,00,000 = 5:8. Pankaj applied for 1,800 shares, so he is allotted 1,125 shares. Application money paid = 1,800 x Rs.5 = Rs.9,000. Application money required = 1,125 x Rs.5 = Rs.5,625, so excess = Rs.3,375. Allotment due = 1,125 x Rs.9 = Rs.10,125. Net allotment payment = Rs.10,125 - Rs.3,375 = Rs.6,750.'
  },
  AC10Q107: {
    correct: 0,
    explanation: 'Total assets = Rs.60,00,000 + Rs.40,00,000 + Rs.30,00,000 + Rs.15,00,000 + Rs.10,00,000 = Rs.1,55,00,000. Total liabilities = Rs.12,00,000 + Rs.18,00,000 = Rs.30,00,000. Net assets = Rs.1,25,00,000. Purchase consideration is Rs.1,20,00,000, so capital reserve = Rs.5,00,000. Shares issued at Rs.15 each = Rs.1,20,00,000 / Rs.15 = 8,00,000 shares.'
  },
  AC10Q112: {
    options: ['Rs.10,000', 'Rs.5,500', 'Rs.6,000', 'Rs.4,000'],
    correct: 0,
    explanation: 'Group Y has 5,00,000 applications for 2,50,000 shares, so the pro-rata ratio is 1:2. Deepa applied for 5,000 shares and is allotted 2,500 shares. Application money paid = 5,000 x Rs.4 = Rs.20,000. Application money required = 2,500 x Rs.4 = Rs.10,000, so excess = Rs.10,000. Allotment due = 2,500 x Rs.8 = Rs.20,000. Deepa paid no allotment money, so calls-in-arrears on allotment = Rs.20,000 - Rs.10,000 = Rs.10,000.'
  },
  AC10Q125: {
    correct: 2,
    explanation: 'Pro-rata ratio = 90,000:1,35,000 = 2:3. Excess applications = 1,35,000 - 90,000 = 45,000 shares. Excess application money adjusted = 45,000 x Rs.4 = Rs.1,80,000. Total allotment due = 90,000 x Rs.5 = Rs.4,50,000. Net bank receipt on allotment = Rs.4,50,000 - Rs.1,80,000 = Rs.2,70,000.'
  },
  AC10Q126: {
    options: [
      'Fractional allotment 2,153.85 shares; additional call Rs.39,077 approx',
      'Rs.16,000',
      'Rs.12,000',
      'Rs.4,000'
    ],
    correct: 0,
    explanation: 'Valid applications = 2,80,000 - 20,000 = 2,60,000 shares. Pro-rata ratio = 2,00,000:2,60,000 = 10:13. Harish applied for 2,800 shares, so mathematical allotment = 2,800 x 10/13 = 2,153.85 shares, which is not a whole-share allotment. Call due = 2,153.85 x Rs.20 = Rs.43,076.92. After calls-in-advance of Rs.4,000, additional call payment is Rs.39,076.92 approximately. The source data should be revised for a whole-share CUET-style question.'
  },
  AC10Q132: {
    options: [
      'Application Rs.45,000; Allotment Rs.40,000; Advance Rs.30,000',
      'Application Rs.45,000; Allotment Rs.22,500; Advance Rs.30,000',
      'Application Rs.45,000; Allotment Rs.52,500; Advance Rs.0',
      'Application Rs.45,000; Allotment Rs.37,500; Advance Rs.30,000'
    ],
    correct: 0,
    explanation: 'Valid applications = 80,000 - 5,000 = 75,000 shares. Pro-rata ratio = 50,000:75,000 = 2:3. Govind applied for 1,500 shares and is allotted 1,000 shares. Application payment = 1,500 x Rs.30 = Rs.45,000. Application required = 1,000 x Rs.30 = Rs.30,000, so excess = Rs.15,000. Allotment due = 1,000 x Rs.55 = Rs.55,000. Net allotment payment = Rs.55,000 - Rs.15,000 = Rs.40,000. Calls-in-advance paid separately = Rs.30,000.'
  },
  AC10Q134: {
    correct: 0,
    explanation: 'Subscribed capital = 40,000 x Rs.10 = Rs.4,00,000. Rahul did not pay the call on 200 shares, and call money is Rs.3 per share. Calls-in-arrears = 200 x Rs.3 = Rs.600. Paid-up capital shown in the Balance Sheet = Rs.4,00,000 - Rs.600 = Rs.3,99,400.'
  },
  AC10Q154: {
    options: ['Rs.2,00,000', 'Rs.3,00,000', 'Rs.4,50,000', 'Rs.6,00,000'],
    correct: 0,
    explanation: 'Valid applications = 4,00,000 - 25,000 = 3,75,000 shares. Allotted shares = 2,50,000, so excess valid applications = 1,25,000 shares. Excess application money = 1,25,000 x Rs.4 = Rs.5,00,000. The company adjusts Rs.3,00,000 against allotment, so refund = Rs.5,00,000 - Rs.3,00,000 = Rs.2,00,000.'
  },
  AC10Q155: {
    correct: 1,
    explanation: 'Phase 1 creates securities premium of 1,00,000 x Rs.2 = Rs.2,00,000. The question only says that 20,000 shares were bought back; it does not state the buy-back price or any premium paid on buy-back, so no reduction in Securities Premium Reserve can be calculated from the given data. Phase 3 issues 30,000 shares at Rs.15, creating premium of 30,000 x Rs.5 = Rs.1,50,000. Total Securities Premium Reserve from the given information = Rs.2,00,000 + Rs.1,50,000 = Rs.3,50,000.'
  },
  AC10Q157: {
    options: ['Rs.7,300', 'Rs.6,380', 'Rs.5,500', 'Rs.8,800'],
    correct: 0,
    explanation: 'Valid applications = 1,20,000 - 10,000 = 1,10,000 shares. Pro-rata ratio = 80,000:1,10,000 = 8:11. Karim applied for 1,100 shares and is allotted 800 shares. Application paid = 1,100 x Rs.5 = Rs.5,500. Application required = 800 x Rs.5 = Rs.4,000, so excess = Rs.1,500. Allotment due = 800 x Rs.7 = Rs.5,600. Net allotment payment = Rs.5,600 - Rs.1,500 = Rs.4,100. Calls-in-advance = 800 x Rs.4 = Rs.3,200. Total paid on allotment date = Rs.4,100 + Rs.3,200 = Rs.7,300.'
  },
  AC10Q173: {
    correct: 1,
    explanation: 'Net assets = Rs.60,00,000 - Rs.22,00,000 = Rs.38,00,000. Purchase consideration is Rs.42,00,000. Since purchase consideration is greater than net assets, goodwill = Rs.42,00,000 - Rs.38,00,000 = Rs.4,00,000. Shares issued = 2,00,000 x Rs.18 = Rs.36,00,000. Cash paid = Rs.42,00,000 - Rs.36,00,000 = Rs.6,00,000.'
  },
  AC10Q174: {
    options: [
      'Rs.1,508 net payment approx; received Rs.84 interest (data gives fractional shares)',
      'Rs.0 net payment; received Rs.84 interest',
      'Rs.2,000 net payment; received Rs.84 interest',
      'Rs.2,800 net payment; received Rs.0 interest'
    ],
    correct: 0,
    explanation: 'Valid applications = 2,80,000 - 20,000 = 2,60,000 shares. Pro-rata ratio = 2,00,000:2,60,000 = 10:13. Rahul applied for 1,400 shares, so mathematical allotment = 1,400 x 10/13 = 1,076.92 shares, which is not a whole-share allotment. Call due = 1,076.92 x Rs.4 = Rs.4,307.69. After calls-in-advance of Rs.2,800, call-date payment = Rs.1,507.69 approximately. Interest on calls-in-advance = Rs.2,800 x 12% x 3/12 = Rs.84.'
  },
  AC10Q177: {
    options: [
      '400 shares; net allotment Rs.2,560; call Rs.1,600',
      '400 shares; net allotment Rs.2,800; call Rs.1,600',
      '350 shares; net allotment Rs.2,100; call Rs.1,400',
      '400 shares; net allotment Rs.3,040; call Rs.1,600'
    ],
    correct: 0,
    explanation: 'Valid applications = 1,50,000 - 10,000 = 1,40,000 shares. Pro-rata ratio = 1,00,000:1,40,000 = 5:7. Siya applied for 560 shares and is allotted 400 shares. Application paid = 560 x Rs.4 = Rs.2,240. Application required = 400 x Rs.4 = Rs.1,600, so excess = Rs.640. Allotment due = 400 x Rs.8 = Rs.3,200. Net allotment paid = Rs.3,200 - Rs.640 = Rs.2,560. Call paid = 400 x Rs.4 = Rs.1,600.'
  },
  AC10Q181: {
    options: ['Rs.8,400', 'Rs.10,500', 'Rs.10,000', 'Rs.10,700'],
    correct: 0,
    explanation: 'Pro-rata ratio = 75,000:1,12,500 = 2:3. Meena was allotted 1,000 shares, so she applied for 1,500 shares. Application paid = 1,500 x Rs.4 = Rs.6,000. Application required = 1,000 x Rs.4 = Rs.4,000, so excess = Rs.2,000. Allotment due = 1,000 x Rs.6 = Rs.6,000; net allotment arrears = Rs.4,000. Call due = 1,000 x Rs.4 = Rs.4,000. Total arrears = Rs.8,000. Interest for 6 months at 10% p.a. = Rs.400. Total dues = Rs.8,400.'
  },
  AC10Q187: {
    correct: 0,
    explanation: 'Cash issue premium = 1,00,000 x Rs.5 = Rs.5,00,000. Vendor issue premium = 50,000 x Rs.2 = Rs.1,00,000. Sweat equity is issued at par, so it adds no securities premium. Total Securities Premium Reserve = Rs.5,00,000 + Rs.1,00,000 = Rs.6,00,000.'
  },
  AC10Q195: {
    correct: 1,
    explanation: 'Application receipts = 5,00,000 x Rs.4 = Rs.20,00,000. Refund on rejected applications = 20,000 x Rs.4 = Rs.80,000. Valid applications = 4,80,000 shares and allotted shares = 3,00,000, so excess application money adjusted = 1,80,000 x Rs.4 = Rs.7,20,000. Total allotment due = 3,00,000 x Rs.8 = Rs.24,00,000. Net bank receipt from allotment = Rs.24,00,000 - Rs.7,20,000 = Rs.16,80,000. Call receipt = 3,00,000 x Rs.4 = Rs.12,00,000.'
  }
}));

let changed = 0;
for (const question of data.questions) {
  const fix = fixes.get(question.id);
  if (!fix) continue;
  if ('options' in fix) question.options = fix.options;
  if ('correct' in fix) {
    if (!('correct_content_review_original' in question) && question.correct !== fix.correct) {
      question.correct_content_review_original = question.correct;
    }
    question.correct = fix.correct;
  }
  question.explanation = fix.explanation;
  changed += 1;
}

await writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Updated ${changed} AC10 questions in ${file}`);
