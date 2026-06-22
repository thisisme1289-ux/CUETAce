import fs from 'node:fs';

const file = 'questions/accountancy/AC02.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const questions = Array.isArray(data) ? data : data.questions;

const updates = {
  AC02Q129: {
    options: ['Rs.2,000', 'Rs.1,500', 'Rs.2,250', 'Rs.1,125'],
    explanation: 'The 1st May drawing is outstanding for 11 months and the 1st November drawing is outstanding for 5 months. Product = 25,000 x 11 + 25,000 x 5 = 4,00,000. Interest on drawings = 4,00,000 x 6/100 x 1/12 = Rs.2,000.'
  },
  AC02Q131: {
    options: ['Rs.38,010', 'Rs.35,610', 'Rs.15,208', 'Rs.37,410'],
    explanation: "Interest on capital: X Rs.1,00,000, Y Rs.80,000, Z Rs.40,000. Y's salary = Rs.60,000. Z's drawings are Rs.36,000 and interest on drawings = 36,000 x 6% x 5.5/12 = Rs.990. Divisible profit = 3,40,000 - 2,20,000 - 60,000 + 990 = Rs.60,990. Z's share = 1/5 x 60,990 = Rs.12,198. Z's closing current account balance = 40,000 + 12,198 - 36,000 - 990 = Rs.15,208 credit."
  },
  AC02Q137: {
    options: [
      'Deficit = Rs.39,200; F earns Rs.3,40,000',
      'Deficit = Rs.12,600; F earns Rs.3,57,400',
      'Deficit = Rs.0; F earns Rs.3,70,000',
      'Deficit = Rs.9,400; F earns Rs.3,60,600'
    ],
    explanation: "Interest on capital: F Rs.1,26,000 and G Rs.54,000. F's salary = Rs.1,44,000. Profit remaining for sharing = 4,80,000 - 1,80,000 - 1,44,000 = Rs.1,56,000. G's profit share = 30% of 1,56,000 = Rs.46,800, so G's total income = 54,000 + 46,800 = Rs.1,00,800. Guarantee deficit = 1,40,000 - 1,00,800 = Rs.39,200, borne by F. F's final take-home = 1,26,000 + 1,44,000 + 1,09,200 - 39,200 = Rs.3,40,000."
  },
  AC02Q139: {
    options: ['Rs.98,000', 'Rs.1,18,000', 'Rs.1,06,000', 'Rs.1,22,000'],
    explanation: "Govind's interest on capital = 10% x Rs.8,00,000 = Rs.80,000. Hari's interest on capital = Rs.40,000. Profit left for sharing = 1,50,000 - 1,20,000 = Rs.30,000. Govind's profit share = 3/5 x 30,000 = Rs.18,000. Total credited to Govind's current account = 80,000 + 18,000 = Rs.98,000."
  },
  AC02Q142: {
    options: ['Rs.5,000', 'Rs.3,500', 'Rs.2,500', 'Rs.4,000'],
    explanation: 'Interest on capital = Rs.50,000 + Rs.30,000 + Rs.20,000 = Rs.1,00,000. Divisible profit after interest on capital but before reserve = 1,50,000 - 1,00,000 = Rs.50,000. General Reserve = 10% of Rs.50,000 = Rs.5,000. The guarantee is adjusted after computing reserve as specified.'
  },
  AC02Q152: {
    options: ['Rs.3,04,850', 'Rs.2,98,100', 'Rs.3,01,500', 'Rs.2,99,700'],
    explanation: "Interest on capital: X Rs.30,000 and Y Rs.20,000. Interest on drawings: X Rs.900 and Y Rs.600. Divisible profit = 60,000 - 50,000 + 1,500 = Rs.11,500; X's share = Rs.5,750. X's closing capital under fluctuating capital method = 3,00,000 + 30,000 + 5,750 - 30,000 - 900 = Rs.3,04,850."
  },
  AC02Q154: {
    options: [
      'Deficit=Rs.11,500; A earns Rs.3,13,500',
      'Deficit=Rs.56,280; A earns Rs.2,00,520',
      'Deficit=Rs.9,500; A earns Rs.3,15,500',
      'Deficit=Rs.15,000; A earns Rs.3,10,000'
    ],
    explanation: "Interest on capital totals Rs.2,02,500 and A's salary is Rs.1,20,000. Profit after these appropriations = Rs.97,500. B's commission = 4% x 97,500 = Rs.3,900, leaving Rs.93,600 for profit sharing. C's share = 2/10 x 93,600 = Rs.18,720; with IOC of Rs.45,000, C gets Rs.63,720. Guarantee deficit = 1,20,000 - 63,720 = Rs.56,280, borne by A. A's final take-home = 90,000 + 1,20,000 + 46,800 - 56,280 = Rs.2,00,520."
  },
  AC02Q158: {
    options: ['Rs.1,27,200', 'Rs.1,00,364', 'Rs.1,24,400', 'Rs.1,18,800'],
    explanation: "Interest on capital: D Rs.96,000, E Rs.64,000, F Rs.32,000. Profit after IOC = Rs.1,68,000. Dinesh's commission on profit after IOC and commission = 10/110 x 1,68,000 = Rs.15,273. Divisible profit = Rs.1,52,727; Eknath's share = 2/6 x 1,52,727 = Rs.50,909. Farida's total before guarantee = 32,000 + 25,455 = Rs.57,455, so deficit = Rs.14,545, borne by Eknath. Eknath's final take-home = 64,000 + 50,909 - 14,545 = Rs.1,00,364."
  },
  AC02Q162: {
    options: ['Rs.50,750', 'Rs.78,900', 'Rs.84,750', 'Rs.76,350'],
    explanation: "Interest on capital: V Rs.81,000, W Rs.54,000, X Rs.27,000. W's salary = Rs.48,000. Profit after IOC and salary = Rs.1,14,000. X's commission = 5% x 1,14,000 = Rs.5,700. Divisible profit = 1,14,000 - 5,700 = Rs.1,08,300. X's profit share = 1/6 x 1,08,300 = Rs.18,050. X's total income = 27,000 + 5,700 + 18,050 = Rs.50,750."
  },
  AC02Q166: {
    options: ['A=Rs.44,000; B=Rs.36,000', 'A=Rs.40,000; B=Rs.40,000', 'A=Rs.39,200; B=Rs.40,800', 'A=Rs.44,000; B=Rs.36,000'],
    explanation: "A's salary = 15% x Rs.80,000 = Rs.12,000. Residual profit = 80,000 - 12,000 = Rs.68,000. A's share of residual profit = 2/5 x 68,000 = Rs.27,200 and B's share = Rs.40,800. A's total = 12,000 + 27,200 = Rs.39,200."
  },
  AC02Q169: {
    options: [
      'IOC=Rs.50,000; Profit share=Rs.9,167',
      'IOC=Rs.50,000; Profit share=Rs.26,667',
      'IOC=Rs.50,000; Profit share=Rs.28,333',
      'IOC=Rs.50,000; Profit share=Rs.25,833'
    ],
    correct: 0,
    explanation: "Z's capital remains Rs.5,00,000 for the full year, so Z's IOC = Rs.50,000. X's time-weighted capital gives IOC Rs.55,000 and Y's gives IOC Rs.47,500. Total IOC = Rs.1,52,500. Divisible profit = 1,80,000 - 1,52,500 = Rs.27,500. Since partners are equal, Z's profit share = 27,500/3 = Rs.9,167."
  },
  AC02Q172: {
    options: [
      'Not invoked; Meera earns Rs.1,17,200',
      'Invoked; Meera earns Rs.82,114',
      'Not invoked; Meera earns Rs.1,21,600',
      'Invoked; Meera earns Rs.1,13,400'
    ],
    correct: 1,
    explanation: "Interest on capital totals Rs.1,98,000 and Kunal's salary is Rs.96,000. Profit after these = Rs.2,66,000. Reserve = 10% x 2,66,000 = Rs.26,600, leaving Rs.2,39,400 for sharing. Lokesh's total = IOC 72,000 + share 71,820 = Rs.1,43,820, so the guarantee deficit is Rs.6,180. Meera bears 2/7 of this deficit = Rs.1,766. Meera's final earnings = 36,000 + 47,880 - 1,766 = Rs.82,114. The guarantee is invoked."
  },
  AC02Q180: {
    options: [
      'O=Rs.94,000; M=Rs.1,01,800',
      'O=Rs.94,000; M=Rs.1,91,400',
      'O=Rs.94,000; M=Rs.1,85,000',
      'O=Rs.94,000; M=Rs.1,82,600'
    ],
    explanation: "Interest on capital: M Rs.90,000, N Rs.72,000, O Rs.54,000. N's salary = Rs.60,000. Divisible profit = 3,50,000 - 2,16,000 - 60,000 = Rs.74,000. O's share before guarantee = 2/10 x 74,000 = Rs.14,800. Since O is guaranteed Rs.40,000 profit share, deficit = Rs.25,200, borne by M. O's total income = 54,000 + 40,000 = Rs.94,000. M's net take-home = 90,000 + 37,000 - 25,200 = Rs.1,01,800."
  },
  AC02Q186: {
    options: ['Rs.92,000', 'Rs.88,800', 'Rs.96,000', 'Rs.83,200'],
    correct: 3,
    explanation: "Since the deed is silent, interest on Q's loan is allowed at 6% p.a. = Rs.6,000. Profit after loan interest = Rs.1,04,000. Interest on capital: P Rs.80,000 and Q Rs.20,000. Divisible profit = 1,04,000 - 1,00,000 = Rs.4,000. P's profit share = 4/5 x 4,000 = Rs.3,200. P's total income = 80,000 + 3,200 = Rs.83,200."
  },
  AC02Q195: {
    options: ['Rs.73,750', 'Rs.92,500', 'Rs.87,500', 'Rs.95,000'],
    explanation: "Total appropriations before profit sharing = IOC Rs.50,000 + S's salary Rs.24,000 + general reserve Rs.16,000 = Rs.90,000. Divisible profit = 1,60,000 - 90,000 = Rs.70,000. R's profit share = 5/8 x 70,000 = Rs.43,750. Total credited to R = IOC Rs.30,000 + profit share Rs.43,750 = Rs.73,750."
  },
  AC02Q198: {
    options: ['Rs.34,200', 'Rs.36,000', 'Rs.1,21,448', 'Rs.37,800'],
    explanation: "Interest on capital totals Rs.1,44,000 and A's salary is Rs.1,20,000. Profit after IOC and salary = Rs.1,36,000. B's commission = 6% x 1,36,000 = Rs.8,160. Profit after commission = Rs.1,27,840. Reserve = 5% x 1,27,840 = Rs.6,392. Residual profit shared between A and B = 1,27,840 - 6,392 = Rs.1,21,448."
  }
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
console.log(`Updated ${Object.keys(updates).length} AC02 questions.`);
