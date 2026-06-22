import fs from 'node:fs';

const file = 'questions/accountancy/AC09.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const questions = Array.isArray(data) ? data : data.questions;

const updates = {
  AC09Q18: { correct: 3, explanation: 'Subscribed and fully paid capital = 1,20,000 x Rs.10 = Rs.12,00,000. Subscribed but not fully paid called amount = 20,000 x Rs.7 = Rs.1,40,000. Calls in arrear = 20,000 x Rs.1 = Rs.20,000. Paid-up share capital shown = 12,00,000 + 1,40,000 - 20,000 = Rs.13,20,000.' },
  AC09Q36: { explanation: 'Preference share capital = 10,000 x Rs.100 = Rs.10,00,000. Equity subscribed capital = 80,000 x Rs.10 = Rs.8,00,000, so subscribed capital = Rs.18,00,000. Called-up capital = 10,00,000 + 80,000 x Rs.8 = Rs.16,40,000. Paid-up capital = 10,00,000 + 80,000 x Rs.7.50 = Rs.16,00,000.' },
  AC09Q39: { options: ['Rs.8 per share', 'Rs.66 per share', 'Rs.5 per share', 'Rs.3 per share'], correct: 1, explanation: 'Assets realised = Rs.80,00,000. After paying trade payables of Rs.15,00,000 and debentures of Rs.20,00,000, Rs.45,00,000 remains. Preference shareholders receive capital of Rs.10,00,000 plus two years arrears of dividend of Rs.2,00,000, total Rs.12,00,000. Balance for equity = Rs.33,00,000. Per equity share = 33,00,000/50,000 = Rs.66.' },
  AC09Q71: { correct: 0, options: ['Rs.2.00 per share', 'Rs.1.70 per share', 'Rs.1.80 per share', 'Rs.1.50 per share'], explanation: 'Annual preference dividend = 10% x 1,000 x Rs.100 = Rs.10,000. Arrears for 2 years = Rs.20,000 and current year preference dividend = Rs.10,000, so total preference payment = Rs.30,000. Balance for equity = Rs.50,000 - Rs.30,000 = Rs.20,000. Equity dividend per share = 20,000/10,000 = Rs.2.' },
  AC09Q73: { options: ['Rs.54,000', 'Rs.90,000', 'Rs.1,50,000', 'Rs.0'], correct: 1, explanation: 'Annual preference dividend = 6% x 2,000 x Rs.100 = Rs.12,000. Four years arrears = Rs.48,000. Current year preference dividend = Rs.12,000. Total preference payment = Rs.60,000. Equity shareholders receive Rs.1,50,000 - Rs.60,000 = Rs.90,000.' },
  AC09Q79: { explanation: 'For non-cumulative preference shares, dividends unpaid in earlier years are not carried forward. Current year preference dividend = 11% x 5,000 x Rs.100 = Rs.55,000. Equity shareholders receive the remaining distributable profit: Rs.1,20,000 - Rs.55,000 = Rs.65,000.' },
  AC09Q97: { correct: 2, explanation: 'Subscribed shares are 5,50,000. Of these, 5,00,000 shares are fully paid on face value, giving Rs.50,00,000 share capital. For the remaining 50,000 shares, face value called is Rs.6 per share, giving Rs.3,00,000. Paid-up share capital excludes securities premium, so paid-up share capital = Rs.50,00,000 + Rs.3,00,000 = Rs.53,00,000.' },
  AC09Q100: { options: ['Rs.800', 'Rs.2,000', 'Rs.1,200', 'Rs.0'], correct: 1, explanation: 'Allotment ratio = 2,00,000/3,00,000 = 2/3. Mr. Roy is allotted 1,200 x 2/3 = 800 shares. Application money paid = 1,200 x Rs.3 = Rs.3,600. Application money required for allotted shares = 800 x Rs.3 = Rs.2,400. Excess application money = Rs.1,200. Allotment due = 800 x Rs.4 = Rs.3,200. Net allotment payable = 3,200 - 1,200 = Rs.2,000.' },
  AC09Q108: { question: 'Sirius Ltd. has a paid-up equity share capital of Rs.1,00,00,000 (1,00,00,000 shares of Rs.1 each) and wants to consolidate these into shares of Rs.100 each. Post-consolidation, a major shareholder Ramesh holds 50,000 new shares. What was his original holding before consolidation?', correct: 1, explanation: 'One new share of Rs.100 is equal to 100 old shares of Rs.1 each. If Ramesh holds 50,000 new shares after consolidation, his original holding was 50,000 x 100 = 50,00,000 old shares of Rs.1 each.' },
  AC09Q131: { correct: 0, explanation: 'The amount paid in advance is Rs.3 per share on 5,000 shares, so calls in advance = 5,000 x Rs.3 = Rs.15,000. Interest for 6 months at 6% p.a. = 15,000 x 6/100 x 6/12 = Rs.450.' },
  AC09Q143: { options: ['Rs.9,00,000', 'Rs.6,00,000', 'Rs.22,00,000', 'Rs.24,00,000'], explanation: 'Total allotment money due = 8,00,000 x Rs.3 = Rs.24,00,000. Application money received = 9,00,000 x Rs.2 = Rs.18,00,000, while application money needed for allotted shares = 8,00,000 x Rs.2 = Rs.16,00,000. Excess application money = Rs.2,00,000. Net allotment receivable = 24,00,000 - 2,00,000 = Rs.22,00,000.' },
  AC09Q145: { correct: 0, explanation: 'The nominal value of preference shares redeemed is Rs.20,00,000. The premium on redemption is Rs.4,00,000 and can be met from Securities Premium Reserve. Since the nominal value is redeemed out of current profits and no fresh issue is stated, Capital Redemption Reserve must be created for Rs.20,00,000.' },
  AC09Q156: { correct: 0, explanation: 'Annual preference dividend = 9% x 10,000 x Rs.100 = Rs.90,000. Arrears for 4 years = Rs.3,60,000 and current year dividend = Rs.90,000, so total preference obligation = Rs.4,50,000. Available reserves are Rs.5,00,000, so there is no shortfall.' },
  AC09Q159: { options: ['Rs.20.60 per share', 'Rs.9.60 per share', 'Rs.10 per share', 'Rs.11 per share'], correct: 0, explanation: 'Assets realised = Rs.45,00,000. After liquidation expenses, secured debentures and unsecured creditors, amount left = 45,00,000 - 1,00,000 - 10,00,000 - 8,00,000 = Rs.26,00,000. Preference shareholders receive capital Rs.5,00,000 plus arrear dividend Rs.40,000, total Rs.5,40,000. Balance for equity = Rs.20,60,000. Per equity share = 20,60,000/1,00,000 = Rs.20.60.' },
  AC09Q168: { correct: 2, explanation: 'Called-up amount per share = Rs.11 and paid-up amount per share = Rs.9.50. Calls in arrear per share = Rs.1.50. For 4,50,000 subscribed shares, calls in arrear = 4,50,000 x Rs.1.50 = Rs.6,75,000.' },
  AC09Q175: { explanation: 'Subscribed and called-up capital = 1,50,000 x Rs.8 = Rs.12,00,000. Less calls in arrear = Rs.60,000. Paid-up capital = Rs.11,40,000. Calls in advance is shown separately as a current liability and is not added to paid-up capital.' },
  AC09Q186: { correct: 0, explanation: 'Annual preference dividend = 9% x Rs.1,00,000 = Rs.9,000. Two years arrears = Rs.18,000 and current year preference dividend = Rs.9,000, so total preference due = Rs.27,000. Profit available is Rs.40,000, leaving Rs.13,000 for equity shareholders.' },
  AC09Q197: { correct: 3, explanation: 'For the standard debt-to-equity ratio, debt means long-term borrowings. Shareholders equity = share capital + general reserve + securities premium + P&L surplus = 50,00,000 + 10,00,000 + 5,00,000 + 8,00,000 = Rs.73,00,000. Debt-to-equity ratio = 15,00,000/73,00,000 = 0.205, approximately 0.21.' }
};

const byId = new Map(questions.map((q) => [q.id, q]));
for (const [id, patch] of Object.entries(updates)) {
  const question = byId.get(id);
  if (!question) throw new Error(`Missing ${id}`);
  if (Object.hasOwn(patch, 'correct') && question.correct !== patch.correct && question.correct_content_review_original === undefined) {
    question.correct_content_review_original = question.correct;
  }
  Object.assign(question, patch);
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Updated ${Object.keys(updates).length} AC09 questions.`);
