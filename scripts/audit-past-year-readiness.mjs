import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const archiveRoot = path.join(root, "past year paper");
const outAudit = path.join(archiveRoot, "source-readiness-audit.json");
const outReady = path.join(archiveRoot, "student-ready-index.json");
const outQueue = path.join(archiveRoot, "manual-review-queue.json");
const outQueueCsv = path.join(archiveRoot, "manual-review-queue.csv");
const outQuestionQueue = path.join(archiveRoot, "question-review-queue.json");
const outQuestionQueueCsv = path.join(archiveRoot, "question-review-queue.csv");

const reportNames = new Set([
  "archive-summary.json",
  "archive-validation.json",
  "completion-audit.json",
  "conversion-report.json",
  "import-index.json",
  "individual-pdf-conversion-report.json",
  "manifest.json",
  "manual-review-queue.json",
  "ocr-manifest.json",
  "pdf-integrity.json",
  "question-review-queue.json",
  "source-readiness-audit.json",
  "student-ready-index.json",
]);

const sampleLimit = 12;

function rel(filePath) {
  return path.relative(root, filePath).replaceAll(path.sep, "/");
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function walk(dir) {
  const found = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...walk(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".json")) {
      found.push(fullPath);
    }
  }
  return found;
}

function isQuestionFile(filePath) {
  const normalized = rel(filePath);
  if (!/^past year paper\/\d{4}\/[^/]+\/json\//.test(normalized)) return false;
  if (normalized.includes("/ocr/")) return false;
  if (reportNames.has(path.basename(filePath))) return false;
  return true;
}

function asQuestions(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.questions)) return data.questions;
  if (Array.isArray(data?.chapters)) {
    return data.chapters.flatMap((chapter) =>
      Array.isArray(chapter?.questions) ? chapter.questions : [],
    );
  }
  return [];
}

function countMatches(value, pattern) {
  return (String(value ?? "").match(pattern) ?? []).length;
}

function textNoiseRatio(value) {
  const text = String(value ?? "");
  if (!text.trim()) return 1;
  const noisy = countMatches(text, /[{}[\]|_~`^@#$%*=<>\\]/g);
  const letters = countMatches(text, /[A-Za-z]/g);
  return noisy / Math.max(letters, 1);
}

function hasPageArtifact(text) {
  return /={3,}\s*PAGE|AGLASEM|Question\s+ID|Test\s+Booklet|NTA\s+Score|CUET\s*\(UG\)|Common University Entrance Test/i.test(text);
}

function hasAnswerLeak(text) {
  return /\b(Correct\s+Answer\s*:|Answer\s*:|Solution\s*:|Quick\s+Tip|is\s+incorrect\s+because|is\s+correct\s+because)\b/i.test(text);
}

function isPlaceholderOption(option, index) {
  const text = String(option ?? "").trim();
  return (
    !text ||
    new RegExp(`^option\\s*${index + 1}$`, "i").test(text) ||
    /^option\s*\d+$/i.test(text) ||
    /^mark\s+for\s+review/i.test(text) ||
    /^choose\s+the\s+correct/i.test(text)
  );
}

function hasWeakOption(option) {
  const text = String(option ?? "").trim();
  if (!text) return true;
  if (text.length <= 2 && !/^(?:[A-Za-z]{1,2}|[IVX]+|-?\d{1,2})$/i.test(text)) return true;
  if (/^-?\d+(?:\.\d+)?%$/.test(text)) return false;
  if (/^[A-Za-z0-9\s=<>+\-*/().]+$/.test(text) && /[=<>]/.test(text) && /[A-Za-z0-9]/.test(text)) return false;
  if (
    text.length <= 80 &&
    /(?:\\\(|\\\)|\\sqrt|\\frac|\^\{|cm\\\(\^\d\\\)|m\b|units?\b|days?\b|years?\b|Rupees|Rs\.?)/i.test(text) &&
    !hasPageArtifact(text) &&
    !hasAnswerLeak(text)
  ) {
    return false;
  }
  if (/choose\s+the\s+correct\s+answer\s+from\s+the\s+options/i.test(text)) return true;
  if (/\b(question|section|item\s*no|question\s+id)\s*:/i.test(text)) return true;
  if (textNoiseRatio(text) > 0.45 && text.length < 60) return true;
  if (hasPageArtifact(text) || hasAnswerLeak(text)) return true;
  if (text.split(/\r?\n/).length >= 6) return true;
  if (text.length > 450) return true;
  return false;
}

function hasWeakPrompt(questionText) {
  const text = String(questionText ?? "").trim();
  if (text.length < 12) return true;
  if (/^match\s+list[-\s]*i\s+with\s+list[-\s]*ii\.?\s+list[-\s]*i\s+list[-\s]*ii\.?$/i.test(text)) return true;
  if (hasPageArtifact(text) || hasAnswerLeak(text)) return true;
  if (/\bOption\s+\d\b/i.test(text)) return true;
  if (text.split(/\r?\n/).length >= 20) return true;
  if (text.length > 1600) return true;
  if (textNoiseRatio(text) > 0.38) return true;
  return false;
}

function pushSample(bucket, question, reason) {
  if (bucket.length >= sampleLimit) return;
  bucket.push({
    id: question?.id ?? null,
    reason,
    preview: String(question?.question ?? question?.prompt ?? "").replace(/\s+/g, " ").slice(0, 180),
  });
}

function preview(value, maxLength = 180) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function issueSummary(counts) {
  const reasons = [];
  if (counts.parseErrors) reasons.push("parse_error");
  if (counts.schemaIssues) reasons.push("schema_or_empty_questions");
  if (counts.missingAnswers) reasons.push("missing_or_invalid_answers");
  if (counts.placeholderOptions) reasons.push("placeholder_options");
  if (counts.weakOptions) reasons.push("weak_or_polluted_options");
  if (counts.weakPrompts) reasons.push("weak_or_polluted_prompts");
  if (counts.answerLeakage) reasons.push("answer_or_solution_leakage");
  if (counts.pageArtifacts) reasons.push("page_or_ocr_artifacts");
  if (counts.lowSourceConfidence) reasons.push("low_source_confidence");
  return reasons;
}

function auditFile(filePath) {
  const relativePath = rel(filePath);
  let data;
  try {
    data = readJson(filePath);
  } catch (error) {
    const counts = {
      parseErrors: 1,
      schemaIssues: 1,
      questions: 0,
      answersMapped: 0,
      missingAnswers: 0,
      placeholderOptions: 0,
      weakOptions: 0,
      weakPrompts: 0,
      answerLeakage: 0,
      pageArtifacts: 0,
      lowSourceConfidence: 0,
    };
    return {
      path: relativePath,
      ready_for_student_use: false,
      reasons: issueSummary(counts),
      counts,
      parse_error: error.message,
      samples: [],
    };
  }

  const questions = asQuestions(data);
  const counts = {
    parseErrors: 0,
    schemaIssues: questions.length === 0 ? 1 : 0,
    questions: questions.length,
    answersMapped: 0,
    missingAnswers: 0,
    placeholderOptions: 0,
    weakOptions: 0,
    weakPrompts: 0,
    answerLeakage: 0,
    pageArtifacts: 0,
    lowSourceConfidence: 0,
  };
  const samples = [];
  const questionReviews = [];

  for (const question of questions) {
    const prompt = question?.question ?? question?.prompt ?? "";
    const options = Array.isArray(question?.options) ? question.options : [];
    const correct = question?.correct;
    const issues = new Set();
    const issueDetails = {};
    const mapped = Number.isInteger(correct) && correct >= 0 && correct < options.length;
    if (mapped) {
      counts.answersMapped += 1;
    } else {
      counts.missingAnswers += 1;
      issues.add("missing_or_invalid_answer");
      issueDetails.correct = correct ?? null;
      issueDetails.options_count = options.length;
      pushSample(samples, question, "missing_or_invalid_answer");
    }

    if (options.length !== 4) {
      issues.add(`expected_4_options_found_${options.length}`);
      issueDetails.options_count = options.length;
      pushSample(samples, question, `expected_4_options_found_${options.length}`);
    }

    let hasPlaceholder = false;
    let hasWeak = options.length !== 4;
    for (let index = 0; index < options.length; index += 1) {
      const option = options[index];
      if (isPlaceholderOption(option, index)) hasPlaceholder = true;
      if (hasWeakOption(option)) hasWeak = true;
      if (hasPageArtifact(option)) counts.pageArtifacts += 1;
      if (hasAnswerLeak(option)) counts.answerLeakage += 1;
    }
    if (hasPlaceholder) {
      counts.placeholderOptions += 1;
      issues.add("placeholder_option_text");
      pushSample(samples, question, "placeholder_option_text");
    }
    if (hasWeak) {
      counts.weakOptions += 1;
      issues.add("weak_or_polluted_option_text");
      issueDetails.option_previews = options.map((option) => preview(option, 80));
      pushSample(samples, question, "weak_or_polluted_option_text");
    }

    if (hasWeakPrompt(prompt)) {
      counts.weakPrompts += 1;
      issues.add("weak_or_polluted_prompt");
      pushSample(samples, question, "weak_or_polluted_prompt");
    }
    if (hasPageArtifact(prompt)) {
      counts.pageArtifacts += 1;
      issues.add("page_or_ocr_artifact");
      pushSample(samples, question, "page_or_ocr_artifact");
    }
    if (hasAnswerLeak(prompt)) {
      counts.answerLeakage += 1;
      issues.add("answer_or_solution_leakage");
      pushSample(samples, question, "answer_or_solution_leakage");
    }

    const source = `${question?.source ?? ""} ${question?.explanation ?? ""}`;
    if (/could not be mapped confidently|not mapped|manual review|low source confidence|unresolved/i.test(source)) {
      counts.lowSourceConfidence += 1;
      issues.add("low_source_confidence");
      pushSample(samples, question, "low_source_confidence");
    }

    if (issues.size > 0) {
      questionReviews.push({
        id: question?.id ?? null,
        issues: [...issues],
        details: issueDetails,
        correct: correct ?? null,
        prompt_preview: preview(prompt, 220),
        option_previews: options.map((option) => preview(option, 120)),
      });
    }
  }

  const reasons = issueSummary(counts);
  const ready = reasons.length === 0;
  return {
    path: relativePath,
    year: data?.year ?? relativePath.match(/past year paper\/(\d{4})\//)?.[1] ?? null,
    subject: data?.subject ?? null,
    subject_code: data?.subject_code ?? null,
    kind: relativePath.includes("/individual-pdfs/") ? "individual-pdf" : "main-year-subject",
    ready_for_student_use: ready,
    reasons,
    counts,
    samples,
    question_reviews: questionReviews,
  };
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function csvCell(value) {
  const text = Array.isArray(value) ? value.join("; ") : String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

function writeReviewCsv(rows) {
  const headers = [
    "year",
    "subject",
    "json_path",
    "questions",
    "answers_mapped",
    "missing_answers",
    "placeholder_options",
    "weak_options",
    "weak_prompts",
    "answer_leakage",
    "page_artifacts",
    "low_source_confidence",
    "reasons",
    "recommended_action",
  ];
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(
      headers.map((header) => csvCell(row[header])).join(","),
    );
  }
  fs.writeFileSync(outQueueCsv, `${lines.join("\n")}\n`, "utf8");
}

function writeQuestionReviewCsv(rows) {
  const headers = [
    "year",
    "subject",
    "kind",
    "json_path",
    "question_id",
    "correct",
    "issues",
    "prompt_preview",
    "option_previews",
    "recommended_action",
  ];
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((header) => csvCell(row[header])).join(","));
  }
  fs.writeFileSync(outQuestionQueueCsv, `${lines.join("\n")}\n`, "utf8");
}

const files = walk(archiveRoot).filter(isQuestionFile).sort();
const fileAudits = files.map(auditFile);
const readyFiles = fileAudits.filter((item) => item.ready_for_student_use);
const reviewRows = fileAudits
  .filter((item) => !item.ready_for_student_use)
  .map((item) => ({
    year: item.year,
    subject: item.subject,
    json_path: item.path,
    questions: item.counts.questions,
    answers_mapped: item.counts.answersMapped,
    missing_answers: item.counts.missingAnswers,
    placeholder_options: item.counts.placeholderOptions,
    weak_options: item.counts.weakOptions,
    weak_prompts: item.counts.weakPrompts,
    answer_leakage: item.counts.answerLeakage,
    page_artifacts: item.counts.pageArtifacts,
    low_source_confidence: item.counts.lowSourceConfidence,
    reasons: item.reasons,
    sample_issues: item.samples,
    recommended_action: "manual_review_or_replace_source_pdf",
  }));
const questionReviewRows = fileAudits.flatMap((item) =>
  item.question_reviews.map((question) => ({
    year: item.year,
    subject: item.subject,
    subject_code: item.subject_code,
    kind: item.kind,
    json_path: item.path,
    question_id: question.id,
    correct: question.correct,
    issues: question.issues,
    details: question.details,
    prompt_preview: question.prompt_preview,
    option_previews: question.option_previews,
    recommended_action: "verify_against_pdf_or_answer_key_then_correct_json",
  })),
);

const totals = fileAudits.reduce(
  (acc, item) => {
    acc.files += 1;
    acc.questions += item.counts.questions;
    acc.answersMapped += item.counts.answersMapped;
    if (item.ready_for_student_use) {
      acc.readyFiles += 1;
      acc.readyQuestions += item.counts.questions;
      acc.readyAnswersMapped += item.counts.answersMapped;
    } else {
      acc.needsReviewFiles += 1;
      acc.needsReviewQuestions += item.counts.questions;
    }
    for (const reason of item.reasons) {
      acc.reasonCounts[reason] = (acc.reasonCounts[reason] ?? 0) + 1;
    }
    acc.questionsNeedingReview += item.question_reviews.length;
    for (const question of item.question_reviews) {
      for (const issue of question.issues) {
        acc.questionIssueCounts[issue] = (acc.questionIssueCounts[issue] ?? 0) + 1;
      }
    }
    return acc;
  },
  {
    files: 0,
    questions: 0,
    answersMapped: 0,
    readyFiles: 0,
    readyQuestions: 0,
    readyAnswersMapped: 0,
    needsReviewFiles: 0,
    needsReviewQuestions: 0,
    questionsNeedingReview: 0,
    reasonCounts: {},
    questionIssueCounts: {},
  },
);

const audit = {
  archive_root: "past year paper",
  generated_at: new Date().toISOString(),
  status: totals.needsReviewFiles === 0 ? "ready" : "needs_manual_review",
  policy: {
    ready_for_student_use:
      "A file is ready only when every parsed question has four usable options, a valid answer index, no obvious OCR/page pollution, and no answer/solution text leakage.",
    question_review_queue:
      "Each row identifies one extracted question that needs verification against the source PDF, answer key, or subject review before student use.",
  },
  totals,
  files: fileAudits,
};

const readyIndex = {
  archive_root: "past year paper",
  generated_from: "source-readiness-audit.json",
  total_files: readyFiles.length,
  total_questions: readyFiles.reduce((sum, item) => sum + item.counts.questions, 0),
  total_answers_mapped: readyFiles.reduce((sum, item) => sum + item.counts.answersMapped, 0),
  files: readyFiles.map((item) => ({
    year: item.year,
    subject: item.subject,
    subject_code: item.subject_code,
    kind: item.kind,
    json_path: item.path,
    questions: item.counts.questions,
    answers_mapped: item.counts.answersMapped,
    ready_for_student_use: true,
  })),
};

writeJson(outAudit, audit);
writeJson(outReady, readyIndex);
writeJson(outQueue, reviewRows);
writeJson(outQuestionQueue, questionReviewRows);
writeReviewCsv(reviewRows);
writeQuestionReviewCsv(questionReviewRows);

console.log(JSON.stringify({
  files: totals.files,
  readyFiles: totals.readyFiles,
  needsReviewFiles: totals.needsReviewFiles,
  questions: totals.questions,
  readyQuestions: totals.readyQuestions,
  questionsNeedingReview: totals.questionsNeedingReview,
  reasonCounts: totals.reasonCounts,
  questionIssueCounts: totals.questionIssueCounts,
  audit: rel(outAudit),
  readyIndex: rel(outReady),
  reviewQueue: rel(outQueue),
  questionReviewQueue: rel(outQuestionQueue),
}, null, 2));
