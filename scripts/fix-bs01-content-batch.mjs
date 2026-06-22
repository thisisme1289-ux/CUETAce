import fs from 'node:fs';

const file = 'questions/business-studies/BS01.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const patches = {
  BS01Q61: {
    explanation: "Ramesh's activities are a textbook illustration of middle management responsibilities: (1) linking function, because he receives the 25% target from top management and translates it into actionable plans; (2) operational analysis, because he assesses machine utilisation and workforce capacity; (3) coordination with HR for staffing support; (4) planning, through weekly sub-targets for supervisors; and (5) controlling, through fortnightly review meetings. Middle managers bridge strategic intent and operational implementation, so Option C gives the most complete description."
  },
  BS01Q75: {
    explanation: "This scenario describes a classic challenge of matrix organisational structures: dual authority and violation of unity of command. Unity of command states that each employee should receive orders from only one superior. In PulseTech's setup, employees report to both their functional head and the cross-departmental team leader, creating the conflict described. The remedy is to define the authority hierarchy or create a formal matrix protocol that states when project authority takes precedence over functional authority. Option B is correct."
  },
  BS01Q145: {
    explanation: "Ravi's argument has merit but is overstated. An MBA can provide a strong scientific knowledge base through management principles, theories, and frameworks. However, the art of management depends heavily on personal judgment, creativity, contextual application, emotional intelligence, and leadership practice, which develop substantially through real managerial experience, mentorship, and self-reflection. Formal management education is valuable, but it is neither necessary nor sufficient for effective management. Option B is correct."
  },
  BS01Q165: {
    explanation: "This scenario illustrates the tension between local responsiveness and global coordination in multinational management. The Brazil Country Manager is focused on local taste preferences and competitive pressure, while the Global Category Head is focused on brand consistency and production complexity. The CEO should use a coordinated decision process that evaluates local market opportunity, global brand implications, cost effects, and precedent for future conflicts. Option C is correct."
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
console.log(`Patched ${changed} BS01 questions`);
