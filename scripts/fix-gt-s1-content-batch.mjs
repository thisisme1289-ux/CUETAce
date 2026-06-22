import fs from 'node:fs';

const file = 'questions/general-test/GT-S1.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const patches = {
  'GT-S1Q22': {
    explanation: 'Under Article 100(3), the quorum to constitute a sitting of either House of Parliament is one-tenth of the total number of members of that House. For Lok Sabha: 543 x 1/10 = 54.3, so at least 55 members are required. For Rajya Sabha: 250 x 1/10 = 25 members. Combined quorum = 55 + 25 = 80. Option B is correct.'
  },
  'GT-S1Q88': {
    correct: 0,
    explanation: 'In People’s Union for Civil Liberties (PUCL) v. Union of India (2013), the Supreme Court directed the Election Commission of India to provide the NOTA option on Electronic Voting Machines. The judgment recognised that voters should be able to register disapproval of all candidates while still participating in the election. Option A is correct.'
  },
  'GT-S1Q107': {
    correct: 0,
    explanation: 'Removal of the Vice-President under Article 67 requires a Rajya Sabha resolution passed by a majority of all the then members and agreed to by the Lok Sabha, so I matches B. Most constitutional amendments under Article 368 require a special majority, so II matches D. Removal of the Speaker under Article 94 also requires a majority of all the then members of the Lok Sabha, so III matches B. Ordinary bills require a simple majority of members present and voting, so IV matches A. Option A is correct.'
  },
  'GT-S1Q110': {
    correct: 1,
    explanation: 'Zero Hour is an informal parliamentary device in India, usually beginning at 12 noon after Question Hour. During this period, members may raise urgent matters of public importance without prior notice to the Speaker. It is an Indian parliamentary innovation and is not formally provided in the Rules of Procedure. Option B is correct.'
  },
  'GT-S1Q153': {
    correct: 2,
    explanation: "The Speaker's power under the Tenth Schedule to decide disqualification petitions is quasi-judicial. The Speaker acts as a tribunal for anti-defection matters, and the decision is subject to judicial review by the Supreme Court and High Courts under Articles 32 and 226. Courts generally exercise review after the Speaker gives a final decision, though they may intervene in cases of unreasonable delay. Option C is correct."
  },
  'GT-S1Q193': {
    correct: 2,
    explanation: 'Approval of a National Emergency under Article 352 requires both: a majority of the total membership of each House and at least two-thirds of members present and voting. For Lok Sabha total membership of 543, the majority requirement is more than 271.5, so at least 272 yes votes are needed. Two-thirds of 400 present and voting = 266.67, so at least 267 yes votes are needed. Both conditions must be met, so the binding minimum is the higher figure: 272. Option C is correct.'
  }
};

let changed = 0;
for (const question of data.questions) {
  const patch = patches[question.id];
  if (!patch) continue;

  if (Object.hasOwn(patch, 'correct') && question.correct !== patch.correct && !Object.hasOwn(question, 'correct_content_review_original')) {
    question.correct_content_review_original = question.correct;
  }

  Object.assign(question, patch);
  changed += 1;
}

if (changed !== Object.keys(patches).length) {
  throw new Error(`Expected ${Object.keys(patches).length} patches but applied ${changed}`);
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Patched ${changed} GT-S1 questions`);
