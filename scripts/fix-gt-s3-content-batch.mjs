import fs from 'node:fs';

const file = 'questions/general-test/GT-S3.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const patches = {
  'GT-S3Q43': {
    question: "A researcher studying river systems notes: 'River X floods its banks during the monsoon in the Bengal plains, deposits fertile silt, and has built one of the world's largest deltas jointly with another major river.'\n\nWhich river is X, and what is the delta system called?",
    explanation: "The clue about building one of the world's largest deltas jointly with another major river points to the Ganga. The Ganga and Brahmaputra, along with the Meghna distributary system in Bangladesh, form the Ganga-Brahmaputra Delta, including the Sundarbans region. The Damodar is historically known as the 'Sorrow of Bengal', but it is not the river that jointly builds the world's largest delta with the Brahmaputra. Option C is correct."
  },
  'GT-S3Q60': {
    options: [
      '₹1,50,627',
      '₹1,27,440',
      '₹1,31,274',
      '₹1,44,580'
    ],
    correct: 0,
    explanation: 'Kuruvai production = 4.5 t/ha x 0.8 ha = 3.6 tonnes = 36 quintals. Samba production = 5.5 t/ha x 0.6 ha = 3.3 tonnes = 33 quintals. Total production = 36 + 33 = 69 quintals. Revenue = 69 x ₹2,183 = ₹1,50,627. Option A is correct.'
  },
  'GT-S3Q98': {
    question: "A geography professor explains: 'India's longitudinal extent from 68°7'E (Guhar Moti, Gujarat) to 97°25'E (Kibithoo, Arunachal Pradesh) creates a time difference of approximately 2 hours between the easternmost and westernmost points. However, India uses a single Standard Time (IST = UTC+5:30) to avoid confusion.'\n\nIf it is 10:00 AM local solar time at Guhar Moti (Gujarat, 68°7'E), what is the local solar time at Kibithoo (Arunachal Pradesh, 97°25'E), given that each degree of longitude = 4 minutes of time?",
    correct: 1,
    explanation: "Longitudinal difference = 97°25' - 68°7' = 29°18'. Time difference = 29 x 4 minutes + 18' x 4/60 minutes = 116 + 1.2 = 117.2 minutes, or about 1 hour 57 minutes. Kibithoo lies east of Guhar Moti, so its local solar time is ahead. Therefore 10:00 AM at Guhar Moti corresponds to about 11:57 AM local solar time at Kibithoo. Option B is correct."
  },
  'GT-S3Q106': {
    options: [
      'Wheat highest (₹80,726/ha); Rice lowest (₹64,488/ha)',
      'Gram highest (₹70,720/ha); Wheat lowest (₹80,677/ha)',
      'Mustard highest (₹75,333/ha); Wheat lowest (₹80,677/ha)',
      'Rice highest (₹64,488/ha); Gram lowest (₹70,720/ha)'
    ],
    correct: 0,
    explanation: 'Revenue per hectare = (Production/Area) x 10 quintals per tonne x MSP. Wheat: (110/31) x 10 x ₹2,275 = about ₹80,726/ha. Rice: (130/44) x 10 x ₹2,183 = about ₹64,488/ha. Mustard: (12/9) x 10 x ₹5,650 = about ₹75,333/ha. Gram: (13/10) x 10 x ₹5,440 = ₹70,720/ha. Wheat gives the highest revenue per hectare and rice gives the lowest. Option A is correct.'
  },
  'GT-S3Q126': {
    options: [
      '2.81 times',
      '3.52 times',
      '4.38 times',
      '1.93 times'
    ],
    explanation: "Global per capita freshwater = 46,800 BCM / 8 billion people = 5,850 m³/person. India's population = 17.5% of 8 billion = 1.4 billion. Indian per capita freshwater = 1,869 BCM / 1.4 billion = about 1,335 m³/person. Ratio = 5,850 / 1,335 = about 4.38 times. Option C is correct."
  },
  'GT-S3Q133': {
    options: [
      '114.7 BCM',
      '155.3 BCM',
      '172.0 BCM',
      '119.4 BCM'
    ],
    correct: 0,
    explanation: "Current agricultural water use = 688 BCM. At 40% efficiency, productive water reaching crops = 688 x 0.40 = 275.2 BCM. If efficiency rises to 48%, the water required to deliver the same productive amount is 275.2 / 0.48 = 573.3 BCM. Water saved = 688 - 573.3 = 114.7 BCM. Option A is correct."
  },
  'GT-S3Q138': {
    options: [
      '40.7%',
      '42.44%',
      '38.1%',
      '45.6%'
    ],
    explanation: "Combined area of the five largest states = 342,239 + 308,252 + 307,713 + 240,928 + 196,024 = 1,395,156 sq km. Percentage of India's total area = (1,395,156 / 3,287,263) x 100 = 42.44%. Option B is correct."
  },
  'GT-S3Q146': {
    options: [
      'Additional 46.5 MT; 42.9% increase',
      'Additional 30.0 MT; 43.8% increase (approximately)',
      'Additional 22.5 MT; 37.6% increase',
      'Additional 38.5 MT; 35.0% increase'
    ],
    correct: 0,
    explanation: "Current production = 31 M ha x 3.5 t/ha = 108.5 MT. New production at 5.0 t/ha = 31 x 5.0 = 155.0 MT. Additional production = 155.0 - 108.5 = 46.5 MT. Percentage increase = (46.5 / 108.5) x 100 = 42.86%, or about 42.9%. Option A is correct."
  },
  'GT-S3Q197': {
    correct: 0,
    explanation: 'Large check dams: 45,000 x 50,000 m³ = 2,250,000,000 m³ = 2.25 BCM. Small check dams: 200,000 x 5,000 m³ = 1,000,000,000 m³ = 1.00 BCM. Farm ponds: 1,000,000 x 500 m³ = 500,000,000 m³ = 0.50 BCM. Total storage = 2.25 + 1.00 + 0.50 = 3.75 BCM. Option A is correct.'
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
console.log(`Patched ${changed} GT-S3 questions`);
