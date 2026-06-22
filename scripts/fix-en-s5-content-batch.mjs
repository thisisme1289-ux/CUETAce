import fs from 'node:fs';

const file = 'questions/english/EN-S5.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const patches = {
  'EN-S5Q077': {
    correct: 0,
    explanation: "The word in context means 'vague' or open to more than one meaning. The instruction confused the class because it lacked clarity. Option A is correct."
  },
  'EN-S5Q078': {
    correct: 2,
    explanation: "'Explicit' is the opposite because it means clearly stated and direct. The sentence shows confusion caused by lack of clarity. Option C is correct."
  },
  'EN-S5Q079': {
    correct: 1,
    explanation: "The blank needs a word meaning unclear or capable of more than one meaning. That explains why the class was confused. Option B is correct."
  },
  'EN-S5Q080': {
    correct: 2,
    explanation: "'Vague' and 'unclear' are close in meaning to the tested word. 'Explicit' means clear and direct, so it is the odd one out. Option C is correct."
  },
  'EN-S5Q085': {
    correct: 0,
    explanation: "'Complacent' means self-satisfied, especially in a way that prevents further effort or improvement. In the sentence, success made him stop improving. Option A is correct."
  },
  'EN-S5Q123': {
    correct: 1,
    explanation: "'Innate' means inborn or natural. A sense of rhythm present from childhood is best described as innate. Option B is correct."
  },
  'EN-S5Q131': {
    correct: 1,
    explanation: "'Deride' means to mock or ridicule. The sentence describes critics dismissing the plan without offering alternatives. Option B is correct."
  },
  'EN-S5Q172': {
    explanation: "'Once in a blue moon' means very rarely. The sentence refers to an infrequent visit. Option D is correct."
  },
  'EN-S5Q177': {
    correct: 2,
    explanation: "'Under the weather' means slightly ill or unwell. That explains why he stayed home. Option C is correct."
  },
  'EN-S5Q190': {
    explanation: "'Strike a chord' means to resonate emotionally or create a sympathetic response. The audience connected deeply with the story. Option D is correct."
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
console.log(`Patched ${changed} EN-S5 questions`);
