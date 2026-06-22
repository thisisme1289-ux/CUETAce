import fs from 'node:fs';

const file = 'questions/business-studies/BS05.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const questions = Array.isArray(data) ? data : data.questions;

const ids = [
  'BS05Q03',
  'BS05Q13',
  'BS05Q23',
  'BS05Q33',
  'BS05Q43',
  'BS05Q53',
  'BS05Q63',
  'BS05Q73',
  'BS05Q83',
  'BS05Q93',
  'BS05Q103',
  'BS05Q113',
  'BS05Q123',
  'BS05Q133',
  'BS05Q143',
  'BS05Q153',
  'BS05Q163',
  'BS05Q173',
  'BS05Q183',
  'BS05Q193'
];

const explanation = 'A functional structure groups activities and employees by specialised functions such as production, marketing, finance and human resource. Since the company wants employees to report within their own speciality and use expertise fully, functional structure is the suitable organisation structure.';

const byId = new Map(questions.map((q) => [q.id, q]));

for (const id of ids) {
  const question = byId.get(id);
  if (!question) throw new Error(`Missing ${id}`);
  if (question.correct !== 1 && question.correct_content_review_original === undefined) {
    question.correct_content_review_original = question.correct;
  }
  question.correct = 1;
  question.explanation = explanation;
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Updated ${ids.length} BS05 questions.`);
