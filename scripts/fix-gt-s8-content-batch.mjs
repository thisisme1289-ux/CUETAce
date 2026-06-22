import { readFile, writeFile } from 'node:fs/promises';

const file = 'questions/general-test/GT-S8.json';
const data = JSON.parse(await readFile(file, 'utf8'));

const fixes = new Map(Object.entries({
  'GT-S8Q08': {
    options: ['33', '30', '29', '27'],
    correct: 0,
    explanation: 'The code is the sum of alphabet positions. CAT = 3 + 1 + 20 = 24, BAT = 2 + 1 + 20 = 23, and DOG = 4 + 15 + 7 = 26. Therefore BIRD = 2 + 9 + 18 + 4 = 33.'
  },
  'GT-S8Q10': {
    correct: 2,
    explanation: 'The valid arrangement from left to right is P, Q, S, T, R. Q is immediately right of P, R is at an end, T is not at an end, S is immediately left of T, and Q and T are not adjacent. Therefore T is 4th from the left end.'
  },
  'GT-S8Q11': {
    correct: 2,
    explanation: 'Using the consistent option pattern of shifting each letter one step backward, MORALS becomes L N Q Z K R. Therefore the code is LNQZKR.'
  },
  'GT-S8Q27': {
    options: ['North, 5 km', 'South, sqrt(29) km', 'North, sqrt(29) km', 'East, sqrt(13) km'],
    correct: 0,
    explanation: 'Take the starting point as (0,0). After the moves the man is at (5,0): 5 km north, 3 km east, 7 km south, 2 km east, and 2 km north. He is facing North after the final left turn, and his displacement from home is 5 km.'
  },
  'GT-S8Q31': {
    options: ['4935', '3745', '3457', '3574'],
    correct: 0,
    explanation: 'Using digit-sum alphabet coding, F = 6, I = 9, R = 18 -> 9, E = 5, so FIRE can be written as 6945. RICE gives R = 18 -> 9, I = 9, C = 3, E = 5. Therefore MICE = M(13 -> 4), I(9), C(3), E(5) = 4935.'
  },
  'GT-S8Q37': {
    correct: 2,
    explanation: 'B = 120. A = 120 + 45 = 165. C = 165 - 20 = 145. D = 145 + 15 = 160. E = 160 - 30 = 130. Ranking from highest to lowest is A, D, C, E, B, so E scored 130 and C is 3rd.'
  },
  'GT-S8Q44': {
    correct: 1,
    explanation: 'Since B is immediately left of A and C is not at an end, Row 1 must be B, A, C, D from left to right. A faces G, so G is opposite A. H is immediately right of G in Row 2, and F is not adjacent to H, so F occupies the position opposite B. Therefore F faces B.'
  },
  'GT-S8Q51': {
    options: ['17325', '13721', '17312', '13712'],
    correct: 0,
    explanation: 'From DELHI = 73541, D = 7, E = 3, L = 5, H = 4, and I = 1. From INDIA, A = 2 is also used. Therefore IDEAL = I(1), D(7), E(3), A(2), L(5) = 17325.'
  },
  'GT-S8Q56': {
    options: ['North', 'South-West', 'North-West', 'South'],
    correct: 0,
    explanation: 'Starting from East: 45 degrees anticlockwise gives North-East; 90 degrees clockwise gives South-East; 135 degrees anticlockwise from South-East gives North. Therefore the final direction is North.'
  },
  'GT-S8Q81': {
    correct: 2,
    explanation: "C is B's sister and D is C's mother, so D is also B's mother. E is D's husband, so E is B's father. A is B's son. Therefore A is E's grandson."
  },
  'GT-S8Q87': {
    options: ['7-18-20-22-9', '6-9-20-22-9', '7-9-21-22-9', '7-9-20-23-9'],
    correct: 0,
    explanation: 'Using the stated reverse alphabet rule where A = 26 and Z = 1, the code is 27 minus the normal alphabet position. T = 7, I = 18, G = 20, E = 22, and R = 9. Therefore TIGER = 7-18-20-22-9.'
  },
  'GT-S8Q91': {
    options: ['40', '80', '85', '70'],
    correct: 0,
    explanation: 'E = 50. D = 50 + 10 = 60. C = 60 + 25 = 85. B = 85 - 15 = 70. A = 70 + 20 = 90. The highest score is 90 and the lowest is 50, so the difference is 40.'
  },
  'GT-S8Q96': {
    options: ['CETOD', 'CESID', 'CDSJE', 'CDSID'],
    correct: 0,
    explanation: 'Vowels move to the next vowel in A, E, I, O, U. Consonants move to the next consonant in the given consonant sequence. BASIC becomes B -> C, A -> E, S -> T, I -> O, and C -> D. Therefore the code is CETOD.'
  },
  'GT-S8Q108': {
    correct: 2,
    explanation: 'Starting from North-West, a 90 degree clockwise turn gives North-East. From North-East, a 135 degree anticlockwise turn gives South. Therefore Rajan is facing South.'
  },
  'GT-S8Q113': {
    correct: 2,
    explanation: 'N = 45, M = 30, N and M = 25, all three = 5, only newspapers = 15, and only books = 20. N and M only = 25 - 5 = 20. Since N total is 45, N and B only = 45 - 15 - 20 - 5 = 5. Since M total is 30, only M plus M and B only together = 30 - 20 - 5 = 5. Total reading at least one = 15 + 20 + 5 + 5 + 20 + 5 = 70.'
  },
  'GT-S8Q116': {
    correct: 1,
    explanation: 'Balraj is 3rd from the front. For Ashish to be between Balraj and Chetan as early as possible, Ashish is 4th and Chetan is 5th. Dev is immediately after Chetan, so Dev is 6th from the front.'
  },
  'GT-S8Q118': {
    correct: 1,
    explanation: 'Rohan is 15th from the left. Sohan is 18th from the right in a row of 30, so his position from the left is 30 - 18 + 1 = 13th. Students between them = 15 - 13 - 1 = 1.'
  },
  'GT-S8Q121': {
    options: ['No valid arrangement from the given conditions', '2nd', '3rd', '4th'],
    correct: 0,
    explanation: 'R is at the top. If exactly one box is between R and Q, Q must be third from the bottom, so S must be second from the bottom. The remaining positions do not allow P to be directly above T while T is not at the bottom. Therefore the stated conditions do not produce a valid stack.'
  },
  'GT-S8Q137': {
    correct: 0,
    explanation: 'Using the consistent one-step-back coding pattern, TOP becomes SNO: T -> S, O -> N, and P -> O.'
  },
  'GT-S8Q146': {
    correct: 2,
    explanation: "D's rank is 7, so C is 2 ranks above D: C = 5. B's rank is 3. A is between B and C, so A = 4. E is 2 better than A, so E = 2."
  },
  'GT-S8Q150': {
    correct: 1,
    explanation: 'From Row 1 sum: 16 + x + 2 + 13 = 34, so x = 3. From Row 2 sum: 5 + 11 + y + 8 = 34, so y = 10. Thus Row 1 position 2 is 3 and Row 2 position 3 is 10.'
  },
  'GT-S8Q157': {
    options: ['Depends on A: Son if female; Nephew if male', 'Nephew', 'Brother', 'Himself'],
    correct: 0,
    explanation: "A's mother's only daughter could be A herself if A is female, making the man A's son. If A is male, that only daughter is A's sister, making the man A's nephew. Since A's gender is not stated, the relationship depends on A's gender."
  },
  'GT-S8Q162': {
    options: ['26517', '25671', '25167', '25761'],
    correct: 0,
    explanation: 'From GOLD and FOLD, G = 2, O = 5, L = 6, D = 3, and F = 8. If A = 1 and T = 7 as the option pattern implies, then GLOAT must be coded in letter order as G(2), L(6), O(5), A(1), T(7) = 26517.'
  },
  'GT-S8Q167': {
    options: ['WONS', 'WOSN', 'WNOS', 'WSON'],
    correct: 0,
    explanation: 'RAIN is coded as NIAR, which is the reverse of the word. Applying the same reverse-word pattern to SNOW gives WONS.'
  },
  'GT-S8Q181': {
    correct: 0,
    explanation: "Mohan's mother's only son is Mohan. Mohan's daughter is Geeta's granddaughter. Therefore Geeta is Mohan's mother."
  },
  'GT-S8Q188': {
    options: ['sqrt(61) km North-West', '5 km South', '7 km North', '3 km North'],
    correct: 0,
    explanation: 'Track the movement on coordinates. From the office: 2 km South gives (0,-2), 3 km West gives (-3,-2), 8 km North gives (-3,6), 3 km West gives (-6,6), and 1 km South gives (-6,5). Distance from the office = sqrt(36 + 25) = sqrt(61), and the direction is North-West.'
  },
  'GT-S8Q195': {
    correct: 0,
    explanation: 'All banks have vaults does not mean all vaults are in banks. Some vaults have cash does not prove that any bank has cash. No cash is digital does not prove that no bank is digital. Therefore none of the three conclusions definitely follows.'
  },
  'GT-S8Q200': {
    options: ['FDBP', 'FKBM', 'FJBN', 'FKBL'],
    correct: 0,
    explanation: 'Apply the stated rule directly. E is a vowel, so E -> F. X is the 19th consonant in the consonant sequence, so it maps to the 3rd consonant, D. A is a vowel, so A -> B. M is the 10th consonant, so it maps to the 12th consonant, P. Therefore EXAM is coded as FDBP.'
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
console.log(`Updated ${changed} GT-S8 questions in ${file}`);
