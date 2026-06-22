import fs from 'node:fs';

const file = 'questions/economics/EC03.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const questions = Array.isArray(data) ? data : data.questions;

const updates = {
  EC03Q37: { correct: 1, explanation: 'TR = (100 - 2Q)Q = 100Q - 2Q^2. MR = 100 - 4Q and MC = 4. Setting MR = MC gives 100 - 4Q = 4, so Q = 24. Price = 100 - 2(24) = Rs.52.' },
  EC03Q48: { options: ['Q=3, Loss = Rs.35', 'Q=2, Profit = Rs.10', 'Q=3, Profit = Rs.5', 'Q=4, Loss = Rs.20'], explanation: 'MC values are Rs.30, Rs.20, Rs.30, and Rs.40. With price Rs.35, the firm produces up to Q = 3 because MC for the fourth unit exceeds price. At Q = 3, TR = 35 x 3 = Rs.105 and TC = TFC + TVC = 60 + 80 = Rs.140. Loss = Rs.35.' },
  EC03Q56: { options: ['Rs.15.15', 'Rs.25.15', 'Rs.18.18', 'Rs.14.29'], explanation: 'Total product at 5 labour units = 20 + 18 + 14 + 10 + 4 = 66. TVC = 5 x Rs.100 = Rs.500 and TC = Rs.500 + Rs.500 = Rs.1,000. ATC = TC/output = 1,000/66 = Rs.15.15.' },
  EC03Q62: { options: ['Q=15, Profit = Rs.25', 'Q=15, Profit = Rs.650', 'Q=30, Profit = Rs.400', 'Q=25, Profit = Rs.225'], explanation: 'MR = 50 and MC = 20 + 2Q. Setting MR = MC gives 50 = 20 + 2Q, so Q = 15. TR = 50 x 15 = Rs.750. TC = 200 + 20(15) + 15^2 = Rs.725. Maximum profit = Rs.25.' },
  EC03Q92: { options: ['Accounting profit = Rs.2,000, Economic profit = Rs.0', 'Accounting profit = Rs.5,000, Economic profit = Rs.3,000', 'Accounting profit = Rs.7,000, Economic profit = Rs.7,000', 'Accounting profit = Rs.3,000, Economic profit = Rs.1,000'], explanation: 'TR = 500 x Rs.40 = Rs.20,000. TVC = 500 x Rs.30 = Rs.15,000. TC = TFC + TVC = 3,000 + 15,000 = Rs.18,000. Accounting profit = 20,000 - 18,000 = Rs.2,000. Economic profit = accounting profit - normal profit = 2,000 - 2,000 = Rs.0.' },
  EC03Q94: { explanation: 'Q = sqrt(K) x sqrt(L) = sqrt(100) x sqrt(L) = 10sqrt(L). For Q = 50, sqrt(L) = 5 and L = 25. TVC = 4 x 25 = Rs.100. TC = TFC + TVC = 200 + 100 = Rs.300.' },
  EC03Q101: { options: ['Q=20, Profit=Rs.50', 'Q=30, Profit=Rs.100', 'Q=40, Profit=Rs.100', 'Q=30, Loss=Rs.25'], correct: 2, explanation: 'MC per unit over the output intervals is Rs.15, Rs.20, and Rs.25. With price Rs.25, MR = MC at the 30-40 output interval, so Q = 40 is acceptable. At Q = 40, TR = 25 x 40 = Rs.1,000 and TC = Rs.900, giving profit of Rs.100.' },
  EC03Q108: { options: ['Q=8.33, P=25.83, Second-order condition satisfied', 'Q=20, P=20, Second-order condition not satisfied', 'Q=10, P=25, Second-order condition not satisfied', 'Q=5, P=27.5, Second-order condition satisfied'], explanation: 'From Q = 60 - 2P, P = 30 - Q/2. TR = 30Q - Q^2/2, so MR = 30 - Q. MC = 2Q + 5. Setting MR = MC gives 30 - Q = 2Q + 5, so Q = 25/3 = 8.33. Price = 30 - 8.33/2 = Rs.25.83. MC is rising because dMC/dQ = 2 > 0, so the second-order condition is satisfied.' },
  EC03Q112: { options: ['Do not hire labour', 'L=4', 'L=5', 'L=2'], explanation: 'MP values are 8, 10, 6, 4, 2, and 0. At price Rs.10, VMP values are Rs.80, Rs.100, Rs.60, Rs.40, Rs.20, and Rs.0. Since wage is Rs.120, every labour unit costs more than the value it adds. The profit-maximising decision is to hire no labour.' },
  EC03Q117: { options: ['Rs.1,950', 'Rs.1,350', 'Rs.850', 'Rs.2,450'], explanation: 'Total output = 20 + 30 = 50. Revenue in market A = 60 x 20 = Rs.1,200 and revenue in market B = 40 x 30 = Rs.1,200, so total revenue = Rs.2,400. Total cost = 800 + 5(50) = Rs.1,050. Profit = 2,400 - 1,050 = Rs.1,350.' },
  EC03Q128: { correct: 1, explanation: 'ATC = TC/Q = 5Q + 10 + 250/Q. To minimise ATC, set dATC/dQ = 5 - 250/Q^2 = 0. Thus Q^2 = 50 and Q = 7.07, which corresponds to Q = 7 in the options.' },
  EC03Q151: { options: ['Q=2 only; equilibrium at Q=2', 'Q=4 (equilibrium) and Q=2', 'Q=3 (only equilibrium)', 'Q=6 (equilibrium)'], correct: 0, explanation: 'In perfect competition, MR = price = Rs.8. Set MC = MR: 3Q^2 - 12Q + 20 = 8, so 3Q^2 - 12Q + 12 = 0. Dividing by 3 gives Q^2 - 4Q + 4 = 0, or (Q - 2)^2 = 0. Hence Q = 2 is the only output where MC equals MR.' },
  EC03Q153: { correct: 0, explanation: 'TR = 15 x 100 = Rs.1,500. TVC = 9 x 100 = Rs.900. TC = TFC + TVC = 600 + 900 = Rs.1,500. Economic profit = TR - TC = Rs.0.' },
  EC03Q169: { explanation: 'With K = 25, Q = 4sqrt(25)sqrt(L) = 20sqrt(L). For Q = 100, sqrt(L) = 5 and L = 25. TVC = 16 x 25 = Rs.400. AVC = TVC/Q = 400/100 = Rs.4.' },
  EC03Q178: { question: 'A firm has demand P = 80 - 2Q and TC = 20 + 4Q + Q^2. Find the profit-maximising output and maximum profit.', options: ['Q=12.67, Profit=Rs.461.33', 'Q=19, Profit=Rs.300', 'Q=19, Profit=Rs.361', 'Q=19, Profit=Rs.0'], explanation: 'TR = (80 - 2Q)Q = 80Q - 2Q^2, so MR = 80 - 4Q. MC = 4 + 2Q. Setting MR = MC gives 80 - 4Q = 4 + 2Q, so Q = 76/6 = 12.67. Maximum profit = 76Q - 3Q^2 - 20 at Q = 12.67, which is about Rs.461.33.' },
  EC03Q185: { correct: 0, options: ['Q_A=45, P_A=Rs.55; Q_B=50, P_B=Rs.35', 'Q_A=45, P_A=Rs.55; Q_B=25, P_B=Rs.47.5', 'Q_A=30, P_A=Rs.70; Q_B=50, P_B=Rs.35', 'Q_A=40, P_A=Rs.60; Q_B=40, P_B=Rs.40'], explanation: 'MR_A = 100 - 2Q_A and MR_B = 60 - Q_B. Marginal cost is Rs.10. Setting MR_A = MC gives Q_A = 45 and P_A = Rs.55. Setting MR_B = MC gives Q_B = 50 and P_B = Rs.35.' },
  EC03Q196: { options: ['L=3 (Q=29), Profit=-Rs.180', 'L=4 (Q=35), Profit=-Rs.100', 'L=2 (Q=20), Profit=-Rs.500', 'L=3 (Q=29), Profit=Rs.80'], correct: 2, explanation: 'Profit = P x TP - (TFC + wage x L). L=1: -Rs.540; L=2: -Rs.500; L=3: -Rs.520; L=4: -Rs.600; L=5: -Rs.740. The maximum profit, or least loss, occurs at L=2 with profit of -Rs.500.' },
  EC03Q198: { options: ['Q=5.74, Profit=Rs.130.80, 2nd order satisfied', 'Q=5, Profit=Rs.25, 2nd order satisfied', 'Q=3, Profit=Rs.8, 2nd order not satisfied', 'Q=5, Profit=Rs.75, 2nd order satisfied'], explanation: 'MC = 3Q^2 - 12Q + 20. With price Rs.50, set MC = MR: 3Q^2 - 12Q + 20 = 50, so Q^2 - 4Q - 10 = 0 and Q = 2 + sqrt(14) = 5.74. Profit = 50Q - (Q^3 - 6Q^2 + 20Q + 50), which is about Rs.130.80. Since dMC/dQ = 6Q - 12 is positive at Q = 5.74, the second-order condition is satisfied.' },
  EC03Q200: { options: ['Monopoly: Q=4,P=16,Profit=-Rs.4; Competition: Q=5.33,P=14.67; DWL exists; CS_monopoly < CS_competition', 'Monopoly: Q=8,P=12,Profit=Rs.0; Competition: Q=4,P=16; No DWL', 'Monopoly: Q=6,P=14,Profit=Rs.24; Competition: Q=8,P=12; DWL exists', 'Monopoly: Q=4,P=16,Profit=Rs.0; Competition: Q=10,P=10; DWL exists'], explanation: 'For monopoly, MR = 20 - 2Q and MC = 2Q + 4. Setting MR = MC gives Q = 4 and P = Rs.16. TR = Rs.64 and TC = 4^2 + 4(4) + 36 = Rs.68, so profit = -Rs.4. Under competition, P = MC: 20 - Q = 2Q + 4, so Q = 16/3 = 5.33 and P = Rs.14.67. Monopoly output is lower than competitive output, so deadweight loss exists and consumer surplus is lower under monopoly.' }
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
console.log(`Updated ${Object.keys(updates).length} EC03 questions.`);
