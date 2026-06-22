import { readFile, writeFile } from 'node:fs/promises';

const file = 'questions/accountancy/AC11.json';
const data = JSON.parse(await readFile(file, 'utf8'));

const fixes = new Map(Object.entries({
  AC11Q98: {
    options: [
      'Share Capital Rs.3,00,000; Securities Premium Rs.2,000; Capital Reserve Rs.11,400',
      'Share Capital Rs.3,00,000; Securities Premium Rs.2,000; Capital Reserve Rs.10,500',
      'Share Capital Rs.3,00,000; Securities Premium Rs.2,000; Capital Reserve Rs.9,500',
      'Share Capital Rs.3,00,000; Securities Premium Rs.0; Capital Reserve Rs.12,000'
    ],
    correct: 0,
    explanation: 'The Forfeited Shares Account balance is Rs.12,000. Reissue of 500 shares at Rs.14 creates securities premium of Rs.4 x 500 = Rs.2,000 and no discount. Reissue of 300 shares at Rs.8 creates discount of Rs.2 x 300 = Rs.600, debited to Forfeited Shares Account. Capital Reserve = Rs.12,000 - Rs.600 = Rs.11,400. Share Capital is restored after all forfeited shares are reissued.'
  },
  AC11Q104: {
    explanation: 'At forfeiture, only application money of Rs.3 per share had been received, so Forfeited Shares Account is credited by Rs.3 x 900 = Rs.2,700. The 700 reissued shares use Rs.3 x 700 = Rs.2,100 of this balance, and the 200 cancelled shares use Rs.600. Since the 700 shares are reissued at par, there is no reissue discount. Total Capital Reserve = Rs.2,700.'
  },
  AC11Q129: {
    options: ['Rs.2,100', 'Rs.3,600', 'Rs.3,900', 'Rs.4,500'],
    correct: 0,
    explanation: 'Forfeited Shares Account credit = Rs.5 x 1,200 = Rs.6,000. For 900 shares reissued at Rs.6, discount = Rs.4 x 900 = Rs.3,600 and the related forfeited amount is Rs.4,500, so Capital Reserve from this batch is Rs.900. For 300 shares reissued at Rs.9, discount = Rs.300 and related forfeited amount is Rs.1,500, so Capital Reserve is Rs.1,200. Total Capital Reserve = Rs.2,100.'
  },
  AC11Q130: {
    correct: 0,
    explanation: 'For par-issue shares, Forfeited Shares Account receives Rs.6 x 200 = Rs.1,200. For premium-issue shares, the Rs.10 received includes Rs.2 securities premium, so face amount received is Rs.8 per share; Forfeited Shares Account receives Rs.8 x 100 = Rs.800. Total forfeited amount available = Rs.2,000. Reissue at Rs.8 gives discount Rs.2 x 300 = Rs.600. Capital Reserve = Rs.2,000 - Rs.600 = Rs.1,400.'
  },
  AC11Q133: {
    options: [
      'Share Capital unchanged at Rs.10,00,000; Capital Reserve Rs.7,500; Bank Rs.13,500',
      'Share Capital unchanged at Rs.10,00,000; Capital Reserve Rs.4,500; Securities Premium Rs.0',
      'Share Capital unchanged at Rs.10,00,000; Capital Reserve Rs.9,000; Securities Premium Rs.0',
      'Share Capital -Rs.15,000 then +Rs.15,000; Capital Reserve +Rs.4,500'
    ],
    correct: 0,
    explanation: 'Forfeiture reduces Share Capital by Rs.15,000 and credits Forfeited Shares Account by Rs.9,000. Reissue at Rs.9 restores Share Capital by Rs.15,000, so Share Capital returns to Rs.10,00,000. Reissue discount = Rs.1 x 1,500 = Rs.1,500. Capital Reserve = Rs.9,000 - Rs.1,500 = Rs.7,500. Bank receives Rs.9 x 1,500 = Rs.13,500.'
  },
  AC11Q134: {
    explanation: 'Forfeited Shares Account balance per share = Rs.14,000 / 2,000 = Rs.7. Reissue of 1,200 shares at Rs.9 creates discount of Rs.1,200; related forfeited amount is Rs.8,400, so Capital Reserve from this batch is Rs.7,200. Reissue of 800 shares at Rs.15 creates securities premium but no discount; related forfeited amount Rs.5,600 is transferred to Capital Reserve. Total Capital Reserve = Rs.12,800.'
  },
  AC11Q136: {
    options: [
      'Capital Reserve Rs.7,200; Forfeited Shares A/c Rs.0',
      'Capital Reserve Rs.4,400; Forfeited Shares A/c Rs.4,000',
      'Capital Reserve Rs.11,200; Forfeited Shares A/c shown separately Rs.4,000',
      'Capital Reserve Rs.4,000; Forfeited Shares A/c Rs.4,000'
    ],
    correct: 2,
    explanation: 'Forfeited Shares Account balance per share = Rs.18,000 / 1,800 = Rs.10. For 1,400 shares reissued at Rs.8, related forfeited amount = Rs.14,000 and reissue discount = Rs.2 x 1,400 = Rs.2,800. Capital Reserve = Rs.14,000 - Rs.2,800 = Rs.11,200. The remaining 400 unreissued shares retain Rs.10 x 400 = Rs.4,000 in Forfeited Shares Account.'
  },
  AC11Q138: {
    correct: 0,
    explanation: 'Each of the 1,200 shares has Rs.10 called up and Rs.8 received, so the unpaid amount relating to these shares is Rs.2 per share. On forfeiture, Share Capital is debited by the called-up amount: Rs.10 x 1,200 = Rs.12,000. New Share Capital balance = Rs.8,00,000 - Rs.12,000 = Rs.7,88,000.'
  },
  AC11Q139: {
    options: ['CR Rs.13,000; Sec Prem Rs.1,500', 'CR Rs.9,000; Sec Prem Rs.1,500', 'CR Rs.7,500; Sec Prem Rs.1,500', 'CR Rs.6,000; Sec Prem Rs.0'],
    correct: 0,
    explanation: 'Forfeited amount = Rs.6 x 2,500 = Rs.15,000. Reissue of 1,000 shares at Rs.8 creates discount of Rs.2,000; related forfeited amount is Rs.6,000, so Capital Reserve from this batch is Rs.4,000. Reissue of 1,500 shares at Rs.11 creates securities premium of Rs.1,500 and no discount; related forfeited amount Rs.9,000 goes to Capital Reserve. Total Capital Reserve = Rs.13,000 and Securities Premium = Rs.1,500.'
  },
  AC11Q140: {
    options: ['Rs.3,200', 'Rs.1,300', 'Rs.2,000', 'Rs.2,800'],
    correct: 1,
    explanation: 'Forfeited amount = Rs.4 x 700 = Rs.2,800. For 500 shares reissued at Rs.7, related forfeited amount = Rs.2,000 and reissue discount = Rs.3 x 500 = Rs.1,500, so Capital Reserve from reissue is Rs.500. For 200 cancelled shares, the related forfeited amount Rs.800 is transferred to Capital Reserve. Total Capital Reserve = Rs.1,300.'
  },
  AC11Q142: {
    explanation: 'Forfeited Shares Account is credited at forfeiture by Rs.5 x 900 = Rs.4,500. Reissue at Rs.6 means discount = Rs.10 - Rs.6 = Rs.4 per share, or Rs.3,600. The remaining balance is transferred to Capital Reserve: Rs.4,500 - Rs.3,600 = Rs.900. Therefore the account shows Cr Rs.4,500, Dr Rs.3,600, and Dr Rs.900.'
  },
  AC11Q143: {
    options: ['Rs.1,200 + Rs.800 = Rs.2,000', 'Rs.1,200 + Rs.1,200 = Rs.2,400', 'Rs.1,200 + Rs.500 = Rs.1,700', 'Rs.1,200 + Rs.1,000 = Rs.2,200'],
    correct: 0,
    explanation: 'For the first 400 shares, Rs.3 per share had been received and reissue is at par, so Capital Reserve = Rs.3 x 400 = Rs.1,200. For the second 400 shares, Rs.5 per share had been received and reissue at Rs.7 as fully paid creates discount of Rs.3 per share. Capital Reserve = (Rs.5 - Rs.3) x 400 = Rs.800. Total Capital Reserve = Rs.2,000.'
  },
  AC11Q145: {
    options: ['Rs.12,500', 'Rs.8,000', 'Rs.6,500', 'Rs.9,000'],
    correct: 0,
    explanation: 'Using face-value amounts received, Group 1 contributes Rs.6 per share and Group 2 contributes Rs.8 per share to Forfeited Shares Account. If the 1,500 reissued shares are taken proportionately from the two groups, related forfeited amount = 750 x Rs.6 + 750 x Rs.8 = Rs.10,500. Reissue discount at Rs.9 is Rs.1 x 1,500 = Rs.1,500, so Capital Reserve from reissue is Rs.9,000. The 500 cancelled shares add Rs.3,500. Total Capital Reserve = Rs.12,500.'
  },
  AC11Q156: {
    correct: 1,
    explanation: 'Forfeited Shares Account balance per share = Rs.9,000 / 600 = Rs.15. For 400 shares reissued at Rs.12, there is no discount and securities premium is credited separately. Related forfeited amount = Rs.15 x 400 = Rs.6,000, which is transferred to Capital Reserve. The remaining Rs.3,000 stays in Forfeited Shares Account for the 200 unreissued shares.'
  },
  AC11Q157: {
    correct: 1,
    explanation: 'For Batch A, only application money of Rs.3 per share was received; 400 reissued shares contribute Rs.1,200 to Capital Reserve. For Batch B, face amount received is Rs.3 application + Rs.2 face on allotment + Rs.3 first call = Rs.8 per share; 300 reissued shares contribute Rs.2,400. Reissue at Rs.12 is above face, so no discount is debited to Forfeited Shares Account. Total Capital Reserve = Rs.3,600.'
  },
  AC11Q162: {
    options: ['Invalid reissue at Rs.4 fully paid; minimum valid price is Rs.6', 'Rs.700', 'Rs.1,050', 'Rs.350'],
    correct: 0,
    explanation: 'A received Rs.4 per share before forfeiture. If the shares are reissued as Rs.10 fully paid, the maximum discount allowed is Rs.4 per share, so the minimum valid reissue price is Rs.6. Reissue at Rs.4 as fully paid would give a discount of Rs.6 per share, exceeding the amount forfeited, so the stated reissue is invalid.'
  },
  AC11Q166: {
    options: ['Rs.8 per share', 'Rs.7 per share', 'Rs.8.67 per share', 'Rs.9 per share'],
    correct: 2,
    explanation: 'Forfeited amount for 1,800 reissued shares = Rs.6 x 1,800 = Rs.10,800. Required Capital Reserve from the reissued batch is Rs.8,400, so allowable discount = Rs.10,800 - Rs.8,400 = Rs.2,400. Discount per share = Rs.2,400 / 1,800 = Rs.1.33. Reissue price = Rs.10 - Rs.1.33 = Rs.8.67 approximately.'
  },
  AC11Q168: {
    options: ['Rs.7,500', 'Rs.6,250', 'Rs.5,500', 'Rs.8,000'],
    correct: 2,
    explanation: 'For 250 shares that paid all calls, face amount received is Rs.10 per share, giving Rs.2,500. For 500 shares that paid application and allotment, face amount received is Rs.3 + Rs.3 = Rs.6 per share, giving Rs.3,000. Total Forfeited Shares Account balance relevant to reissued shares = Rs.5,500. Since all 750 shares are reissued above face at Rs.11, there is no discount, so Capital Reserve is Rs.5,500.'
  },
  AC11Q173: {
    options: ['Cannot be determined from the given Capital Reserve and Securities Premium alone', 'Rs.6 per share', 'Rs.8 per share', 'Rs.5 per share'],
    correct: 0,
    explanation: 'Securities Premium of Rs.3,200 shows that reissue created premium, but Capital Reserve depends on both the forfeited amount originally received and any discount allowed on reissue. The question does not give enough information about the reissue prices or discounts to determine the original average amount received per share uniquely.'
  },
  AC11Q178: {
    options: ['Share Capital Rs.9,65,000; Capital Reserve Rs.4,500; Forfeited Shares Rs.0', 'Share Capital Rs.9,50,000; Capital Reserve Rs.4,500; Securities Premium Rs.0', 'Share Capital Rs.10,00,000; Capital Reserve Rs.1,500; Securities Premium Rs.0', 'Share Capital Rs.10,00,000; Capital Reserve Rs.4,500; Forfeited Shares Rs.0'],
    correct: 0,
    explanation: 'Forfeited Shares Account balance per share = Rs.10,500 / 1,500 = Rs.7. Reissue at Rs.6 creates discount Rs.4 x 1,500 = Rs.6,000. Capital Reserve = Rs.10,500 - Rs.6,000 = Rs.4,500, and Forfeited Shares Account closes. Since current Share Capital after forfeiture is Rs.9,50,000, reissue restores Rs.10 x 1,500 = Rs.15,000, giving final Share Capital of Rs.9,65,000.'
  },
  AC11Q187: {
    options: ['SC Rs.9,95,000; SP Rs.48,000; CR Rs.35,000', 'SC Rs.10,00,000; SP Rs.48,000; CR Rs.38,000', 'SC Rs.10,00,000; SP Rs.40,000; CR Rs.35,000', 'SC Rs.10,00,000; SP Rs.48,000; CR Rs.32,000'],
    correct: 0,
    explanation: 'Forfeiture of 2,500 shares reduces Share Capital by Rs.25,000 and credits Forfeited Shares by Rs.15,000. Reissue of 2,000 shares restores Share Capital by Rs.20,000 and creates Securities Premium Rs.8,000. Final Share Capital = Rs.10,00,000 - Rs.25,000 + Rs.20,000 = Rs.9,95,000. Capital Reserve increases by the full forfeited amount Rs.15,000, including the Rs.3,000 relating to cancelled shares. Existing Capital Reserve Rs.20,000 becomes Rs.35,000; Securities Premium becomes Rs.48,000.'
  },
  AC11Q196: {
    explanation: 'Forfeited Shares Account balance per share = Rs.14,000 / 2,000 = Rs.7. First reissue: related forfeited amount Rs.10,500 less discount Rs.3,000 gives Capital Reserve Rs.7,500. Second reissue at Rs.11 creates securities premium separately and no discount; related forfeited amount Rs.3,500 goes to Capital Reserve. Total Capital Reserve = Rs.11,000.'
  },
  AC11Q199: {
    options: ['CR Rs.5,500; SP Rs.900', 'CR Rs.5,600; SP Rs.1,600', 'CR Rs.4,800; SP Rs.2,200', 'CR Rs.5,000; SP Rs.2,000'],
    correct: 0,
    explanation: 'G1: 400 shares reissued at Rs.7, discount Rs.3 per share; Capital Reserve = Rs.4 x 400 - Rs.3 x 400 = Rs.400. G2: 300 shares reissued at Rs.11, premium Rs.1 per share, so Securities Premium = Rs.300 and Capital Reserve = Rs.9 x 300 = Rs.2,700. G3: 200 shares reissued at Rs.13, premium Rs.3 per share, so Securities Premium = Rs.600 and Capital Reserve = Rs.12 x 200 = Rs.2,400. Totals from reissued shares: Capital Reserve Rs.5,500 and Securities Premium Rs.900.'
  },
  AC11Q200: {
    options: ['Rs.5,100', 'Rs.6,400', 'Rs.6,200', 'Rs.7,000'],
    correct: 0,
    explanation: 'Use face-value amount received for Forfeited Shares Account. Stage 1: Rs.5 per share received; 400 reissued at Rs.8 gives Capital Reserve Rs.1,200, and 100 cancelled gives Rs.500, total Rs.1,700. Stage 2: face amount received = Rs.5 + Rs.1 = Rs.6 per share; 200 reissued at par gives Rs.1,200 and 100 cancelled gives Rs.600, total Rs.1,800. Stage 3: face amount received = Rs.5 + Rs.1 + Rs.2 = Rs.8 per share; 200 reissued above face gives Capital Reserve Rs.1,600. Grand total Capital Reserve = Rs.1,700 + Rs.1,800 + Rs.1,600 = Rs.5,100.'
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
console.log(`Updated ${changed} AC11 questions in ${file}`);
