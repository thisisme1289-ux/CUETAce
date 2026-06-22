import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const archiveRoot = path.join(root, "past year paper");
const addQueuePath = path.join(archiveRoot, "add-candidate-queue.json");
const outDir = path.join(archiveRoot, "import-packs");
const businessOutFile = path.join(outDir, "2025-business-studies-ready-additions.json");
const businessOutCsv = path.join(outDir, "2025-business-studies-ready-additions.csv");
const business2024OutFile = path.join(outDir, "2024-business-studies-ready-additions.json");
const business2024OutCsv = path.join(outDir, "2024-business-studies-ready-additions.csv");
const business2023OutFile = path.join(outDir, "2023-business-studies-ready-additions.json");
const business2023OutCsv = path.join(outDir, "2023-business-studies-ready-additions.csv");
const englishOutFile = path.join(outDir, "2025-english-ready-additions.json");
const englishOutCsv = path.join(outDir, "2025-english-ready-additions.csv");
const accountancyOutFile = path.join(outDir, "2025-accountancy-ready-additions.json");
const accountancyOutCsv = path.join(outDir, "2025-accountancy-ready-additions.csv");
const economicsOutFile = path.join(outDir, "2023-2024-economics-ready-additions.json");
const economicsOutCsv = path.join(outDir, "2023-2024-economics-ready-additions.csv");
const generalTestOutFile = path.join(outDir, "2022-2025-general-test-ready-additions.json");
const generalTestOutCsv = path.join(outDir, "2022-2025-general-test-ready-additions.csv");

const bsChapters = [
  {
    id: "BS01",
    chapter: "Nature and Significance of Management",
    keywords: [
      "management", "coordination", "effectiveness", "efficiency", "objective",
      "objectives", "dynamic", "pervasive", "intangible", "profession", "levels",
    ],
  },
  {
    id: "BS02",
    chapter: "Principles of Management",
    keywords: [
      "fayol", "taylor", "principle", "principles", "scientific management",
      "unity", "discipline", "scalar", "gang plank", "motion study",
    ],
  },
  {
    id: "BS03",
    chapter: "Business Environment",
    keywords: [
      "business environment", "environment", "economic dimension", "social dimension",
      "technological", "legal", "political", "liberalisation", "privatisation",
      "globalisation", "demonetisation",
    ],
  },
  {
    id: "BS04",
    chapter: "Planning",
    keywords: [
      "planning", "plan", "policy", "procedure", "rule", "strategy", "budget",
      "programme", "method", "objective", "premises", "future", "alternative courses",
      "choice from amongst", "facilitates decision making",
    ],
  },
  {
    id: "BS05",
    chapter: "Organising",
    keywords: [
      "organising", "delegation", "authority", "responsibility", "accountability",
      "decentralisation", "span", "formal", "informal", "functional structure",
      "divisional structure",
    ],
  },
  {
    id: "BS06",
    chapter: "Staffing",
    keywords: [
      "staffing", "recruitment", "selection", "training", "development",
      "compensation", "employee", "employees", "manpower", "workforce",
      "intelligence test", "intelligence tests", "aptitude test", "aptitude tests",
      "personality test", "personality tests", "trade test", "trade tests",
    ],
  },
  {
    id: "BS07",
    chapter: "Directing",
    keywords: [
      "directing", "supervision", "motivation", "leadership", "communication",
      "incentive", "incentives", "maslow", "leader", "supervisor",
    ],
  },
  {
    id: "BS08",
    chapter: "Controlling",
    keywords: [
      "controlling", "control", "standards", "deviation", "corrective",
      "performance", "future planning", "past experience",
    ],
  },
  {
    id: "BS09",
    chapter: "Business Finance",
    keywords: [
      "financial decision", "finance", "capital structure", "working capital",
      "fixed capital", "investment decision", "financing decision", "dividend",
      "debt", "interest", "principal", "cheaper", "risky",
    ],
  },
  {
    id: "BS10",
    chapter: "Financial Markets",
    keywords: [
      "financial market", "money market", "capital market", "stock exchange",
      "sebi", "depository", "demat", "treasury bill", "commercial paper",
    ],
  },
  {
    id: "BS11",
    chapter: "Marketing",
    keywords: [
      "marketing", "market", "product", "price", "promotion", "place",
      "advertising", "publicity", "packaging", "brand", "labelling", "fpo",
      "distribution channel", "distribution", "channel", "manufacturer",
      "wholesaler", "retailer", "customer",
    ],
  },
  {
    id: "BS12",
    chapter: "Consumer Protection",
    keywords: [
      "consumer", "consumer protection", "consumer rights", "redressal",
      "complaint", "copa", "responsibility", "right to", "quality mark",
    ],
  },
  {
    id: "BS-SUP-ENT",
    chapter: "Supplemental PYQ Topic: Entrepreneurship Development",
    keywords: [
      "entrepreneur", "entrepreneurs", "entrepreneurship", "emergence of entrepreneurship",
      "successful entrepreneur", "wealth creators", "risk avoider",
    ],
  },
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function rel(filePath) {
  return path.relative(root, filePath).replaceAll(path.sep, "/");
}

function questionsFrom(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.questions)) return data.questions;
  if (Array.isArray(data?.chapters)) {
    return data.chapters.flatMap((chapter) =>
      Array.isArray(chapter?.questions) ? chapter.questions : [],
    );
  }
  return [];
}

function normalizeText(value) {
  return String(value ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function cleanExplanation(value) {
  return normalizeText(value)
    .replace(/\*\*/g, "")
    .replace(/^\s*\d+\s*$/gm, "")
    .replace(/\n?Quick Tip[\s\S]*$/i, "")
    .replace(/\n?\d+\s*$/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function inferChapter(question) {
  const text = `${question.question ?? ""} ${(question.options ?? []).join(" ")} ${question.explanation ?? ""}`.toLowerCase();
  let best = { id: null, chapter: null, score: 0 };
  for (const chapter of bsChapters) {
    let score = 0;
    for (const keyword of chapter.keywords) {
      const pattern = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
      score += (text.match(pattern) ?? []).length;
    }
    if (score > best.score) {
      best = { id: chapter.id, chapter: chapter.chapter, score };
    }
  }
  if (best.score === 0) {
    return {
      chapter_id: "UNMAPPED",
      chapter: "Needs chapter review",
      confidence: "needs_review",
      score: 0,
    };
  }
  return {
    chapter_id: best.id,
    chapter: best.chapter,
    confidence: best.score >= 2 ? "medium" : "low",
    score: best.score,
  };
}

function difficulty(value) {
  const text = String(value ?? "").toLowerCase();
  if (text === "medium") return "moderate";
  if (["easy", "moderate", "difficult"].includes(text)) return text;
  return "moderate";
}

function csvCell(value) {
  const text = Array.isArray(value) ? value.join("; ") : String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

function writeCsv(filePath, rows) {
  const headers = [
    "id",
    "source_id",
    "chapter_id",
    "chapter",
    "chapter_confidence",
    "type",
    "level",
    "difficulty",
    "correct",
    "question",
  ];
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((header) => csvCell(row[header])).join(","));
  }
  fs.writeFileSync(filePath, `${lines.join("\n")}\n`, "utf8");
}

function inferEnglishTopic(question) {
  const text = `${question.question ?? ""} ${(question.options ?? []).join(" ")} ${question.explanation ?? ""}`.toLowerCase();
  if (/after reading|read the passage|passage|match list|social contract|prophets of dawn|boat|sailing|relation between|which of the following things|what is the name/.test(text)) {
    return { type: "rc_based", topic: "Reading comprehension" };
  }
  if (/formal letter|informal letter|sender.?s address|salutation|invoice|speech|entertaining speech|persuasive speech|informative speech|valedictory|seminar|premchand|kazmi/.test(text)) {
    return { type: "vocabulary", topic: "Writing and communication" };
  }
  if (/grammatically|sentence|modifier|tense|verb|noun|pronoun|adjective|adverb|preposition|conjunction|clause|subjunctive|past participle|conditional phrase|had he|had she|had they|by the end|deadline|re-arrange|rearrange|sequence to form a meaningful sentence/.test(text)) {
    return { type: "grammar", topic: "Grammar and usage" };
  }
  if (/literary device|metaphor|simile|personification|hyperbole|oxymoron|irony|metonymy|synecdoche/.test(text)) {
    return { type: "vocabulary", topic: "Literary devices" };
  }
  if (/opposite|meaning|means|is called|synonym|antonym|word|blank|idiom|phrase|expression|inexperienced|mankind|ten years|fear of water|novice|misanthrope|decennial|hydrophobia|closest|fits|best choice|best fit|spelling|failed to submit|supported by new research|repeated warnings|initially rejected|phenomenology|persistent|innovative|adjust|arrogant|indifferent|hesitant|temporary|careless|optional|abandon|cancel|oppose|recognition|corroborate|validate|undermine|notoriety|autobiography|novel|vulnerabilities|descriptions|narrative|vivid|immersive|candid/.test(text)) {
    return { type: "vocabulary", topic: "Vocabulary and usage" };
  }
  if (/poets|dreamers|realists|therefore|must be true/.test(text)) {
    return { type: "logical_reasoning", topic: "Verbal reasoning" };
  }
  return { type: "vocabulary", topic: "Needs topic review" };
}

function inferGeneralTestTopic(question) {
  const text = `${question?.question ?? ""} ${(question?.options ?? []).join(" ")} ${question?.explanation ?? ""}`.toLowerCase();
  if (/average|ticket|reservation|rupees|work|days|angle|elevation|shadow|train|speed|distance|percentage|profit|loss|ratio|number|sum|simple interest|compound interest/.test(text)) {
    return { type: "numerical", topic: "Quantitative aptitude" };
  }
  if (/direction|blood relation|series|coding|decoding|statement|conclusion|syllogism|arrange|ranking|analogy/.test(text)) {
    return { type: "logical_reasoning", topic: "Logical reasoning" };
  }
  if (/constitution|article|parliament|history|geography|river|state|current affairs|scheme|minister|award/.test(text)) {
    return { type: "mcq", topic: "General awareness" };
  }
  return { type: question?.type ?? "mcq", topic: "General aptitude" };
}

function inferAccountancyChapter(question) {
  const text = `${question?.question ?? ""} ${(question?.options ?? []).join(" ")} ${question?.explanation ?? ""}`.toLowerCase();
  const rules = [
    ["AC04", "Goodwill", /goodwill|average profit|years'? purchase|super profit|capitalisation/],
    ["AC05", "Admission of a Partner", /admitted|admission|new ratio|new partner|sacrifice|revaluation|undervalued/],
    ["AC02", "Capital & Profit Sharing", /guaranteed|deficiency|salary|commission|interest on capital|profit and loss appropriation|appropriation/],
    ["AC15", "Accounting Ratios", /current ratio|quick ratio|current assets|current liabilities|ratio/],
    ["AC07", "Dissolution of Partnership Firm", /realisation|realization|unrecorded assets|taken over by a partner|dissolution/],
    ["AC11", "Forfeiture & Reissue of Shares", /forfeiture|forfeit|final call|calls in arrear|premium|shares/],
    ["AC13", "Financial Statements", /balance sheet|financial position|schedule iii|statement of profit and loss|annual report|shareholders/],
    ["AC16", "Cash Flow Statement", /cash flow|cash equivalents|short maturity|operating activity|investing activity|financing activity|cheque/],
    ["AC-SUP-NPO", "Supplemental PYQ Topic: Not-for-Profit Organisations", /not for profit|subscription|endowment fund|legacies|cash subsidy|medicine consumed|creditors for medicines|stock of medicines|tournament fund|income and expenditure account/],
    ["AC-SUP-COMP", "Supplemental PYQ Topic: Computerised Accounting", /worksheet|workbook|page layout|page setup|ms access|wizards|rulers|programme|spreadsheet|legend|chart|relationship between tables|key fields/],
  ];
  for (const [chapter_id, chapter, pattern] of rules) {
    if (pattern.test(text)) return { chapter_id, chapter, confidence: "medium" };
  }
  return { chapter_id: "AC-PYP-REVIEW", chapter: "Needs chapter review", confidence: "needs_review" };
}

function inferEconomicsChapter(question) {
  const raw = `${question?.question ?? ""} ${(question?.options ?? []).join(" ")} ${question?.explanation ?? ""}`.toLowerCase();
  const text = raw.replace(/\s+/g, " ");
  const compact = raw.replace(/[^a-z0-9]/g, "");
  const rules = [
    ["EC13", "Economic Reforms Since 1991", /1991|liberalisation|liberalization|privatisation|privatization|globalisation|globalization|industrial reform|new economic policy|lpg|competition act|fema|fera|mrtp/],
    ["EC14", "Current Challenges: Human Capital, Rural Development, Employment, Environment and Sustainable Development", /morbidity|human capital|humancapital|physical capital|physicalcapital|education|health|rural|employment|unemployment|formal sector|poverty|poor|sustainable|environment|sanitation|nutrative|nutrition|biocomposting|compost|earthworm|organic|water bodies|ground water|chemical contamination|cattle|electricity generation|renewable energy|thermal|hydro|nuclear/],
    ["EC12", "Development Policies 1947-90", /green revolution|planning commission|five year plan|karve|industrial policy resolution|inward looking|import substitution|land reforms|first census|tata iron|suez canal|railways|british rule|colonial|handicraft|cotton and silk|aggregate real output|per capita output|indian industries|worldwide market/],
    ["EC15", "Development Experience: India vs Neighbours", /china|pakistan|neighbour|neighbor|comparative development|human development index/],
    ["EC01", "Introduction to Microeconomics", /central problem|economic problem|scarce resources|scareresources|unlimited wants|what to produce|how to produce|distribution of final produce/],
    ["EC02", "Consumer's Equilibrium and Demand", /elasticit|demand curve|consumer|utility|marginal utility|budget line|indifference|geometric method|complementary goods|complementarygoods|substitute goods|substitutegoods|giffen|inferior goods|price of coffee|tea and coffee/],
    ["EC03", "Production and Costs", /production|cost curve|marginal cost|average cost|total product|marginal product|revenue|producer/],
    ["EC04", "Perfect Competition and Supply", /perfect competition|supply curve|supply|price taker|firm|profit maximisation|profit maximization/],
    ["EC05", "Market Equilibrium", /market equilibrium|excess demand|excess supply|price ceiling|price floor|equilibrium price/],
    ["EC08", "Money and Banking", /central bank|commercial bank|repo|reverse repo|bank rate|cash reserve|crr|slr|money supply|currency|codification/],
    ["EC09", "Income and Employment", /aggregate demand|aggregate supply|ad=as|adas|mpc|mps|multiplier|ex ante|ex post|actually happened|income determination|no government|foreign trade|g=t=m=x|gtmx|nominal interest rate|real interest rate|inflation rate/],
    ["EC10", "Government Budget", /government budget|union budget|article 112|revenue deficit|fiscal deficit|primary deficit|tax revenue|capital receipt|revenue receipt|public goods|publicgoods/],
    ["EC11", "Open Economy Macroeconomics", /balance of payments|bop|exchange rate|foreign exchange|imports|exports|devaluation|appreciation|depreciation|smithsonian|bretton woods|gold standard|wto|european monetary union/],
    ["EC06", "National Income Accounting", /national income|gdp|gnp|nnp|domestic product|value added|final goods|circular flow/],
    ["EC07", "Aggregates and GDP Welfare", /real gdp|nominal gdp|welfare|deflator|factor cost|market price|basic price/],
  ];
  for (const [chapter_id, chapter, pattern] of rules) {
    if (pattern.test(text) || pattern.test(compact)) return { chapter_id, chapter, confidence: "medium" };
  }
  return { chapter_id: "EC-PYP-REVIEW", chapter: "Needs chapter review", confidence: "needs_review" };
}

function looksLikeEnglishQuestion(row, question) {
  const text = `${question?.question ?? ""} ${(question?.options ?? []).join(" ")}`.toLowerCase();
  if (row.subject === "English") return true;
  return /fill in the blank|re-arrange|rearrange|grammatically|literary device|closest in meaning|opposite in meaning|poets are dreamers|novel was|autobiography|subjunctive/.test(text);
}

const allAddQueue = readJson(addQueuePath);
const businessAddQueue = allAddQueue.filter(
  (row) =>
    row.subject === "Business Studies" &&
    row.year === "2025" &&
    row.status === "add_candidate" &&
    !looksLikeEnglishQuestion(row, readJson(path.join(root, row.json_path)).questions?.find(q => q.id === row.question_id) ?? questionsFrom(readJson(path.join(root, row.json_path))).find(q => q.id === row.question_id)),
);
const business2024AddQueue = allAddQueue.filter(
  (row) =>
    row.subject === "Business Studies" &&
    row.year === "2024" &&
    row.status === "add_candidate",
);
const business2023AddQueue = allAddQueue.filter(
  (row) =>
    row.subject === "Business Studies" &&
    row.year === "2023" &&
    row.status === "add_candidate",
);
const englishAddQueue = allAddQueue.filter(
  (row) => {
    if (row.status !== "add_candidate") return false;
    const data = readJson(path.join(root, row.json_path));
    const sourceQuestion = questionsFrom(data).find(q => q.id === row.question_id);
    return looksLikeEnglishQuestion(row, sourceQuestion);
  },
);
const economicsAddQueue = allAddQueue.filter(
  (row) =>
    row.subject === "Economics" &&
    row.status === "add_candidate",
);
const accountancyAddQueue = allAddQueue.filter(
  (row) =>
    row.subject === "Accountancy" &&
    row.status === "add_candidate",
);
const generalTestAddQueue = allAddQueue.filter(
  (row) =>
    row.subject === "General Test" &&
    row.status === "add_candidate",
);

const sourceByPath = new Map();
for (const row of [...businessAddQueue, ...business2024AddQueue, ...business2023AddQueue, ...englishAddQueue, ...economicsAddQueue, ...accountancyAddQueue, ...generalTestAddQueue]) {
  if (!sourceByPath.has(row.json_path)) {
    const data = readJson(path.join(root, row.json_path));
    sourceByPath.set(row.json_path, new Map(questionsFrom(data).map((question) => [question.id, question])));
  }
}

const businessQuestions = businessAddQueue.map((candidate, index) => {
  const sourceQuestion = sourceByPath.get(candidate.json_path).get(candidate.question_id);
  const chapter = inferChapter(sourceQuestion);
  return {
    id: `BS-PYP-2025-Q${String(index + 1).padStart(2, "0")}`,
    source_id: sourceQuestion.id,
    source_year: 2025,
    source_subject_code: "305",
    source_path: candidate.json_path,
    source: sourceQuestion.source ?? "CUET previous-year Business Studies 2025",
    chapter_id: chapter.chapter_id,
    chapter: chapter.chapter,
    chapter_confidence: chapter.confidence,
    type: "mcq",
    level: sourceQuestion.level ?? "L2",
    difficulty: difficulty(sourceQuestion.difficulty),
    question: normalizeText(sourceQuestion.question),
    options: sourceQuestion.options.map(normalizeText),
    correct: sourceQuestion.correct,
    explanation: cleanExplanation(sourceQuestion.explanation),
  };
});

const business2024Questions = business2024AddQueue.map((candidate, index) => {
  const sourceQuestion = sourceByPath.get(candidate.json_path).get(candidate.question_id);
  const chapter = inferChapter(sourceQuestion);
  return {
    id: `BS-PYP-2024-Q${String(index + 1).padStart(2, "0")}`,
    source_id: sourceQuestion.id,
    source_year: 2024,
    source_subject_code: "305",
    source_path: candidate.json_path,
    source: sourceQuestion.source ?? "CUET previous-year Business Studies 2024",
    chapter_id: chapter.chapter_id,
    chapter: chapter.chapter,
    chapter_confidence: chapter.confidence,
    type: "mcq",
    level: sourceQuestion.level ?? "L2",
    difficulty: difficulty(sourceQuestion.difficulty),
    question: normalizeText(sourceQuestion.question),
    options: sourceQuestion.options.map(normalizeText),
    correct: sourceQuestion.correct,
    explanation: cleanExplanation(sourceQuestion.explanation),
  };
});

const business2023Questions = business2023AddQueue.map((candidate, index) => {
  const sourceQuestion = sourceByPath.get(candidate.json_path).get(candidate.question_id);
  const chapter = inferChapter(sourceQuestion);
  return {
    id: `BS-PYP-2023-Q${String(index + 1).padStart(2, "0")}`,
    source_id: sourceQuestion.id,
    source_year: 2023,
    source_subject_code: "305",
    source_path: candidate.json_path,
    source: sourceQuestion.source ?? "CUET previous-year Business Studies 2023",
    chapter_id: chapter.chapter_id,
    chapter: chapter.chapter,
    chapter_confidence: chapter.confidence,
    type: "mcq",
    level: sourceQuestion.level ?? "L2",
    difficulty: difficulty(sourceQuestion.difficulty),
    question: normalizeText(sourceQuestion.question),
    options: sourceQuestion.options.map(normalizeText),
    correct: sourceQuestion.correct,
    explanation: cleanExplanation(sourceQuestion.explanation),
  };
});

const businessPack = {
  subject: "Business Studies",
  subject_code: "305",
  year: 2025,
  pack_id: "BS-PYP-2025",
  chapter_id: "BS-PYP-2025",
  chapter: "CUET 2025 Business Studies Previous-Year Additions",
  total_questions: businessQuestions.length,
  source_queue: rel(addQueuePath),
  source_note:
    "Strict-ready CUET 2025 Business Studies previous-year questions classified as add candidates by coverage audit. Chapter tags are deterministic suggestions and should be reviewed before merging into chapter pools.",
  questions: businessQuestions,
};

const business2024Pack = {
  subject: "Business Studies",
  subject_code: "305",
  year: 2024,
  pack_id: "BS-PYP-2024",
  chapter_id: "BS-PYP-2024",
  chapter: "CUET 2024 Business Studies Previous-Year Additions",
  total_questions: business2024Questions.length,
  source_queue: rel(addQueuePath),
  source_note:
    "Strict-ready CUET 2024 Business Studies previous-year questions classified as add candidates by coverage audit. Chapter tags are deterministic suggestions and should be reviewed before merging into chapter pools.",
  questions: business2024Questions,
};

const business2023Pack = {
  subject: "Business Studies",
  subject_code: "305",
  year: 2023,
  pack_id: "BS-PYP-2023",
  chapter_id: "BS-PYP-2023",
  chapter: "CUET 2023 Business Studies Previous-Year Additions",
  total_questions: business2023Questions.length,
  source_queue: rel(addQueuePath),
  source_note:
    "Strict-ready CUET 2023 Business Studies previous-year questions classified as add candidates by coverage audit. Chapter tags are deterministic suggestions and should be reviewed before merging into chapter pools.",
  questions: business2023Questions,
};

const englishQuestions = englishAddQueue.map((candidate, index) => {
  const sourceQuestion = sourceByPath.get(candidate.json_path).get(candidate.question_id);
  const topic = inferEnglishTopic(sourceQuestion);
  return {
    id: `EN-PYP-2022-2025-Q${String(index + 1).padStart(2, "0")}`,
    source_id: sourceQuestion.id,
    source_year: Number(candidate.year),
    source_subject_code: "101",
    source_path: candidate.json_path,
    source: sourceQuestion.source ?? `CUET previous-year English ${candidate.year}`,
    chapter_id: "EN-PYP-2022-2025",
    chapter: "CUET 2022-2025 English Previous-Year Additions",
    chapter_confidence: topic.topic === "Needs topic review" ? "needs_review" : "medium",
    topic: topic.topic,
    type: topic.type,
    level: sourceQuestion.level ?? "L2",
    difficulty: difficulty(sourceQuestion.difficulty),
    question: normalizeText(sourceQuestion.question),
    options: sourceQuestion.options.map(normalizeText),
    correct: sourceQuestion.correct,
    explanation: cleanExplanation(sourceQuestion.explanation),
  };
});

const englishPack = {
  subject: "English",
  subject_code: "101",
  year: "2022-2025",
  pack_id: "EN-PYP-2022-2025",
  chapter_id: "EN-PYP-2022-2025",
  chapter: "CUET 2022-2025 English Previous-Year Additions",
  total_questions: englishQuestions.length,
  source_queue: rel(addQueuePath),
  source_note:
    "Strict-ready CUET 2022-2025 English previous-year questions classified as add candidates by coverage audit. Topic tags are deterministic suggestions and should be reviewed before merging into English pools.",
  questions: englishQuestions,
};

const economicsQuestions = economicsAddQueue.map((candidate, index) => {
  const sourceQuestion = sourceByPath.get(candidate.json_path).get(candidate.question_id);
  const chapter = inferEconomicsChapter(sourceQuestion);
  return {
    id: `EC-PYP-2023-2024-Q${String(index + 1).padStart(2, "0")}`,
    source_id: sourceQuestion.id,
    source_year: Number(candidate.year),
    source_subject_code: "309",
    source_path: candidate.json_path,
    source: sourceQuestion.source ?? `CUET previous-year Economics ${candidate.year}`,
    chapter_id: chapter.chapter_id,
    chapter: chapter.chapter,
    chapter_confidence: chapter.confidence,
    type: "mcq",
    level: sourceQuestion.level ?? "L2",
    difficulty: difficulty(sourceQuestion.difficulty),
    question: normalizeText(sourceQuestion.question),
    options: sourceQuestion.options.map(normalizeText),
    correct: sourceQuestion.correct,
    explanation: cleanExplanation(sourceQuestion.explanation),
  };
});

const economicsPack = {
  subject: "Economics",
  subject_code: "309",
  year: "2023-2024",
  pack_id: "EC-PYP-2023-2024",
  chapter_id: "EC-PYP-2023-2024",
  chapter: "CUET 2023-2024 Economics Previous-Year Additions",
  total_questions: economicsQuestions.length,
  source_queue: rel(addQueuePath),
  source_note:
    "Strict-ready CUET 2023-2024 Economics previous-year questions classified as add candidates by coverage audit. Chapter tags are deterministic suggestions and should be reviewed before merging into chapter pools.",
  questions: economicsQuestions,
};

const accountancyQuestions = accountancyAddQueue.map((candidate, index) => {
  const sourceQuestion = sourceByPath.get(candidate.json_path).get(candidate.question_id);
  const chapter = inferAccountancyChapter(sourceQuestion);
  return {
    id: `AC-PYP-2024-2025-Q${String(index + 1).padStart(2, "0")}`,
    source_id: sourceQuestion.id,
    source_year: Number(candidate.year),
    source_subject_code: "301",
    source_path: candidate.json_path,
    source: sourceQuestion.source ?? `CUET previous-year Accountancy ${candidate.year}`,
    chapter_id: chapter.chapter_id,
    chapter: chapter.chapter,
    chapter_confidence: chapter.confidence,
    type: "mcq",
    level: sourceQuestion.level ?? "L2",
    difficulty: difficulty(sourceQuestion.difficulty),
    question: normalizeText(sourceQuestion.question),
    options: sourceQuestion.options.map(normalizeText),
    correct: sourceQuestion.correct,
    explanation: cleanExplanation(sourceQuestion.explanation),
  };
});

const accountancyPack = {
  subject: "Accountancy",
  subject_code: "301",
  year: "2024-2025",
  pack_id: "AC-PYP-2024-2025",
  chapter_id: "AC-PYP-2024-2025",
  chapter: "CUET 2024-2025 Accountancy Previous-Year Additions",
  total_questions: accountancyQuestions.length,
  source_queue: rel(addQueuePath),
  source_note:
    "Strict-ready CUET 2024-2025 Accountancy previous-year questions classified as add candidates by coverage audit. Chapter tags are deterministic suggestions and should be reviewed before merging into chapter pools.",
  questions: accountancyQuestions,
};

const generalTestQuestions = generalTestAddQueue.map((candidate, index) => {
  const sourceQuestion = sourceByPath.get(candidate.json_path).get(candidate.question_id);
  const topic = inferGeneralTestTopic(sourceQuestion);
  return {
    id: `GT-PYP-2022-2025-Q${String(index + 1).padStart(2, "0")}`,
    source_id: sourceQuestion.id,
    source_year: Number(candidate.year),
    source_subject_code: "501",
    source_path: candidate.json_path,
    source: sourceQuestion.source ?? `CUET previous-year General Test ${candidate.year}`,
    chapter_id: "GT-PYP-2022-2025",
    chapter: "CUET 2022-2025 General Test Previous-Year Additions",
    chapter_confidence: "medium",
    topic: topic.topic,
    type: topic.type,
    level: sourceQuestion.level ?? "L2",
    difficulty: difficulty(sourceQuestion.difficulty),
    question: normalizeText(sourceQuestion.question),
    options: sourceQuestion.options.map(normalizeText),
    correct: sourceQuestion.correct,
    explanation: cleanExplanation(sourceQuestion.explanation),
  };
});

const generalTestPack = {
  subject: "General Test",
  subject_code: "501",
  year: "2022-2025",
  pack_id: "GT-PYP-2022-2025",
  chapter_id: "GT-PYP-2022-2025",
  chapter: "CUET 2022-2025 General Test Previous-Year Additions",
  total_questions: generalTestQuestions.length,
  source_queue: rel(addQueuePath),
  source_note:
    "Strict-ready CUET 2022-2025 General Test previous-year questions classified as add candidates by coverage audit. Topic tags are deterministic suggestions and should be reviewed before merging into General Test pools.",
  questions: generalTestQuestions,
};

writeJson(businessOutFile, businessPack);
writeCsv(businessOutCsv, businessQuestions);
writeJson(business2024OutFile, business2024Pack);
writeCsv(business2024OutCsv, business2024Questions);
writeJson(business2023OutFile, business2023Pack);
writeCsv(business2023OutCsv, business2023Questions);
writeJson(englishOutFile, englishPack);
writeCsv(englishOutCsv, englishQuestions);
writeJson(economicsOutFile, economicsPack);
writeCsv(economicsOutCsv, economicsQuestions);
writeJson(accountancyOutFile, accountancyPack);
writeCsv(accountancyOutCsv, accountancyQuestions);
writeJson(generalTestOutFile, generalTestPack);
writeCsv(generalTestOutCsv, generalTestQuestions);

const byChapter = businessQuestions.reduce((acc, question) => {
  acc[question.chapter_id] = (acc[question.chapter_id] ?? 0) + 1;
  return acc;
}, {});
const chapterReviewCount = businessQuestions.filter((question) => question.chapter_confidence === "needs_review").length;
const business2024ByChapter = business2024Questions.reduce((acc, question) => {
  acc[question.chapter_id] = (acc[question.chapter_id] ?? 0) + 1;
  return acc;
}, {});
const business2024ChapterReviewCount = business2024Questions.filter((question) => question.chapter_confidence === "needs_review").length;
const business2023ByChapter = business2023Questions.reduce((acc, question) => {
  acc[question.chapter_id] = (acc[question.chapter_id] ?? 0) + 1;
  return acc;
}, {});
const business2023ChapterReviewCount = business2023Questions.filter((question) => question.chapter_confidence === "needs_review").length;
const englishByTopic = englishQuestions.reduce((acc, question) => {
  acc[question.topic] = (acc[question.topic] ?? 0) + 1;
  return acc;
}, {});
const englishTopicReviewCount = englishQuestions.filter((question) => question.chapter_confidence === "needs_review").length;
const economicsByChapter = economicsQuestions.reduce((acc, question) => {
  acc[question.chapter_id] = (acc[question.chapter_id] ?? 0) + 1;
  return acc;
}, {});
const economicsChapterReviewCount = economicsQuestions.filter((question) => question.chapter_confidence === "needs_review").length;
const accountancyByChapter = accountancyQuestions.reduce((acc, question) => {
  acc[question.chapter_id] = (acc[question.chapter_id] ?? 0) + 1;
  return acc;
}, {});
const accountancyChapterReviewCount = accountancyQuestions.filter((question) => question.chapter_confidence === "needs_review").length;
const generalTestByTopic = generalTestQuestions.reduce((acc, question) => {
  acc[question.topic] = (acc[question.topic] ?? 0) + 1;
  return acc;
}, {});
const generalTestTopicReviewCount = generalTestQuestions.filter((question) => question.chapter_confidence === "needs_review").length;

console.log(JSON.stringify({
  accountancy: {
    questions: accountancyQuestions.length,
    chapterReviewCount: accountancyChapterReviewCount,
    byChapter: accountancyByChapter,
    pack: rel(accountancyOutFile),
    csv: rel(accountancyOutCsv),
  },
  businessStudies: {
    questions: businessQuestions.length,
    chapterReviewCount,
    byChapter,
    pack: rel(businessOutFile),
    csv: rel(businessOutCsv),
  },
  businessStudies2024: {
    questions: business2024Questions.length,
    chapterReviewCount: business2024ChapterReviewCount,
    byChapter: business2024ByChapter,
    pack: rel(business2024OutFile),
    csv: rel(business2024OutCsv),
  },
  businessStudies2023: {
    questions: business2023Questions.length,
    chapterReviewCount: business2023ChapterReviewCount,
    byChapter: business2023ByChapter,
    pack: rel(business2023OutFile),
    csv: rel(business2023OutCsv),
  },
  english: {
    questions: englishQuestions.length,
    topicReviewCount: englishTopicReviewCount,
    byTopic: englishByTopic,
    pack: rel(englishOutFile),
    csv: rel(englishOutCsv),
  },
  economics: {
    questions: economicsQuestions.length,
    chapterReviewCount: economicsChapterReviewCount,
    byChapter: economicsByChapter,
    pack: rel(economicsOutFile),
    csv: rel(economicsOutCsv),
  },
  generalTest: {
    questions: generalTestQuestions.length,
    topicReviewCount: generalTestTopicReviewCount,
    byTopic: generalTestByTopic,
    pack: rel(generalTestOutFile),
    csv: rel(generalTestOutCsv),
  },
}, null, 2));
