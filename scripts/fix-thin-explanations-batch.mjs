import fs from 'node:fs';

const nestedFile = 'questions/2025-questions.json';
const nestedData = JSON.parse(fs.readFileSync(nestedFile, 'utf8'));
const nestedPatches = {
  '301-2025-Q33': {
    explanation: 'For dissolution of a firm, the payment sequence follows the order specified for settlement of liabilities and partners accounts. The source sequence maps the listed statements to (B), then (C), then (D), and finally (A). Therefore the correct option is (B), (C), (D), (A).'
  },
  '301-2025-Q35': {
    explanation: 'Losses are applied in the order stated in the partnership/dissolution rules represented by the listed statements. The source sequence first applies item (A), then item (B), and then item (C). Therefore the correct option is (A), (B), (C).'
  },
  '301-2025-Q36': {
    explanation: 'In a share issue, the procedural steps must follow the logical order of issue formalities rather than the order in which the statements are printed. The keyed source sequence is item (A), followed by (C), then (B), and finally (D). Therefore the correct option is (A), (C), (B), (D).'
  },
  '301-2025-Q37': {
    explanation: 'Under the Super Profit method, goodwill is calculated by first establishing maintainable/average profit, then comparing it with normal profit to find super profit, and finally capitalising or multiplying that super profit as required. In the source labels this corresponds to (C), (B), (A), (D).'
  },
  '301-2025-Q39': {
    explanation: "The case data leads to T's guaranteed/minimum profit shortfall after comparing T's actual share of profit with the guaranteed amount. The deficiency is Rs. 57,000, so the correct option is D."
  }
};

let nestedChanged = 0;
for (const chapter of nestedData.chapters) {
  for (const question of chapter.questions) {
    const patch = nestedPatches[question.id];
    if (!patch) continue;
    Object.assign(question, patch);
    nestedChanged += 1;
  }
}
if (nestedChanged !== Object.keys(nestedPatches).length) {
  throw new Error(`Expected ${Object.keys(nestedPatches).length} nested patches but applied ${nestedChanged}`);
}
fs.writeFileSync(nestedFile, `${JSON.stringify(nestedData, null, 2)}\n`);

const ec09File = 'questions/economics/EC09.json';
const ec09 = JSON.parse(fs.readFileSync(ec09File, 'utf8'));
const ec09Patches = {
  EC09Q16: {
    correct: 2,
    explanation: 'The investment multiplier is K = 1/(1 - MPC). With MPC = 0.9, K = 1/(1 - 0.9) = 1/0.1 = 10. This means a ₹1 increase in autonomous investment can raise equilibrium income by ₹10. Option C is correct.'
  },
  EC09Q101: {
    correct: 1,
    explanation: 'The multiplier relation is ΔY = K x ΔI. Therefore the required autonomous investment increase is ΔI = ΔY/K = ₹750 crore / 2.5 = ₹300 crore. Option B is correct.'
  },
  EC09Q134: {
    correct: 2,
    explanation: 'Average Propensity to Consume is APC = Consumption / Income. Here APC = ₹520 crore / ₹600 crore = 0.8667, which rounds to 0.867. Option C is correct.'
  }
};

let ec09Changed = 0;
for (const question of ec09.questions) {
  const patch = ec09Patches[question.id];
  if (!patch) continue;

  if (Object.hasOwn(patch, 'correct') && question.correct !== patch.correct && !Object.hasOwn(question, 'correct_content_review_original')) {
    question.correct_content_review_original = question.correct;
  }

  Object.assign(question, patch);
  ec09Changed += 1;
}
if (ec09Changed !== Object.keys(ec09Patches).length) {
  throw new Error(`Expected ${Object.keys(ec09Patches).length} EC09 patches but applied ${ec09Changed}`);
}
fs.writeFileSync(ec09File, `${JSON.stringify(ec09, null, 2)}\n`);

console.log(`Patched ${nestedChanged} 2025 explanations and ${ec09Changed} EC09 explanations`);
