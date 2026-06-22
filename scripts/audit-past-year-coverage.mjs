import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const questionsRoot = path.join(root, "questions");
const archiveRoot = path.join(root, "past year paper");
const readinessPath = path.join(archiveRoot, "source-readiness-audit.json");
const outCoverage = path.join(archiveRoot, "coverage-audit.json");
const outAddQueue = path.join(archiveRoot, "add-candidate-queue.json");
const outAddQueueCsv = path.join(archiveRoot, "add-candidate-queue.csv");
const outDuplicateQueue = path.join(archiveRoot, "duplicate-review-queue.json");

const duplicateThreshold = 0.84;
const possibleDuplicateThreshold = 0.68;

function rel(filePath) {
  return path.relative(root, filePath).replaceAll(path.sep, "/");
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function walkJson(dir) {
  const found = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...walkJson(fullPath));
    if (entry.isFile() && entry.name.endsWith(".json")) found.push(fullPath);
  }
  return found;
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

function subjectSlug(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function inferSubject(filePath, data) {
  if (data?.subject) return data.subject;
  const normalized = rel(filePath);
  if (normalized.includes("/accountancy/")) return "Accountancy";
  if (normalized.includes("/business-studies/")) return "Business Studies";
  if (normalized.includes("/economics/")) return "Economics";
  if (normalized.includes("/english/")) return "English";
  if (normalized.includes("/general-test/")) return "General Test";
  return "Unknown";
}

function normalizeText(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[₹â‚¹]/g, "rs")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenSet(value) {
  const stop = new Set([
    "the", "and", "for", "from", "with", "that", "this", "which", "only", "given",
    "below", "choose", "correct", "answer", "option", "question", "following",
  ]);
  return new Set(
    normalizeText(value)
      .split(" ")
      .filter((token) => token.length > 2 && !stop.has(token)),
  );
}

function optionTokens(options) {
  return tokenSet((Array.isArray(options) ? options : []).join(" "));
}

function jaccard(a, b) {
  if (a.size === 0 || b.size === 0) return 0;
  let intersection = 0;
  for (const token of a) {
    if (b.has(token)) intersection += 1;
  }
  return intersection / (a.size + b.size - intersection);
}

function adjustedMatchScore(promptScore, optionScore, pypQuestion, generated) {
  const genericPrompt =
    generated.normalized.length < 70 &&
    /\b(choose|complete|sentence|correct|option|following)\b/.test(generated.normalized);

  if (genericPrompt && pypQuestion.normalized.includes(generated.normalized) && optionScore < 0.25) {
    return Math.min(promptScore, 0.35);
  }

  if (promptScore < duplicateThreshold && optionScore === 0) {
    return Math.min(promptScore, 0.5);
  }

  return promptScore;
}

function preview(value, maxLength = 180) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function csvCell(value) {
  const text = Array.isArray(value) ? value.join("; ") : String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

function loadGeneratedQuestions() {
  const rows = [];
  for (const filePath of walkJson(questionsRoot).sort()) {
    const data = readJson(filePath);
    const subject = inferSubject(filePath, data);
    for (const question of questionsFrom(data)) {
      const prompt = question?.question ?? question?.prompt ?? "";
      rows.push({
        id: question?.id ?? null,
        subject,
        subject_slug: subjectSlug(subject),
        path: rel(filePath),
        type: question?.type ?? null,
        correct: question?.correct ?? null,
        prompt,
        options: Array.isArray(question?.options) ? question.options : [],
        normalized: normalizeText(prompt),
        tokens: tokenSet(prompt),
        option_tokens: optionTokens(question?.options),
      });
    }
  }
  return rows;
}

function loadPastYearQuestionRows(readiness) {
  const rows = [];
  for (const fileAudit of readiness.files ?? []) {
    const filePath = path.join(root, fileAudit.path);
    const data = readJson(filePath);
    for (const question of questionsFrom(data)) {
      const prompt = question?.question ?? question?.prompt ?? "";
      rows.push({
        id: question?.id ?? null,
        year: fileAudit.year,
        subject: fileAudit.subject ?? inferSubject(filePath, data),
        subject_code: fileAudit.subject_code,
        subject_slug: subjectSlug(fileAudit.subject ?? inferSubject(filePath, data)),
        kind: fileAudit.kind,
        path: fileAudit.path,
        file_ready: Boolean(fileAudit.ready_for_student_use),
        type: question?.type ?? null,
        correct: question?.correct ?? null,
        prompt,
        options: Array.isArray(question?.options) ? question.options : [],
        normalized: normalizeText(prompt),
        tokens: tokenSet(prompt),
        option_tokens: optionTokens(question?.options),
      });
    }
  }
  return rows;
}

function bestMatch(pypQuestion, generatedBySubject) {
  const candidates = generatedBySubject.get(pypQuestion.subject_slug) ?? [];
  let best = null;
  for (const generated of candidates) {
    let promptScore = jaccard(pypQuestion.tokens, generated.tokens);
    if (pypQuestion.normalized && generated.normalized) {
      if (pypQuestion.normalized === generated.normalized) promptScore = 1;
      else if (
        pypQuestion.normalized.length > 40 &&
        generated.normalized.includes(pypQuestion.normalized)
      ) {
        promptScore = Math.max(promptScore, 0.95);
      } else if (
        generated.normalized.length > 40 &&
        pypQuestion.normalized.includes(generated.normalized)
      ) {
        promptScore = Math.max(promptScore, 0.9);
      }
    }
    const optionScore = jaccard(pypQuestion.option_tokens, generated.option_tokens);
    const score = adjustedMatchScore(promptScore, optionScore, pypQuestion, generated);
    if (!best || score > best.score) {
      best = { score, promptScore, optionScore, generated };
    }
  }
  return best;
}

function writeAddCandidateCsv(rows) {
  const headers = [
    "year",
    "subject",
    "json_path",
    "question_id",
    "type",
    "correct",
    "best_match_score",
    "best_match_id",
    "prompt_preview",
    "option_previews",
    "recommended_action",
  ];
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((header) => csvCell(row[header])).join(","));
  }
  fs.writeFileSync(outAddQueueCsv, `${lines.join("\n")}\n`, "utf8");
}

const readiness = readJson(readinessPath);
const generatedRows = loadGeneratedQuestions();
const generatedBySubject = new Map();
for (const row of generatedRows) {
  if (!generatedBySubject.has(row.subject_slug)) generatedBySubject.set(row.subject_slug, []);
  generatedBySubject.get(row.subject_slug).push(row);
}

const pypRows = loadPastYearQuestionRows(readiness);
const coveredRows = [];
const possibleDuplicateRows = [];
const addCandidateRows = [];
const blockedRows = [];

for (const row of pypRows) {
  if (!row.file_ready) {
    blockedRows.push({
      year: row.year,
      subject: row.subject,
      json_path: row.path,
      question_id: row.id,
      reason: "source_not_student_ready",
    });
    continue;
  }

  const match = bestMatch(row, generatedBySubject);
  const matchInfo = match
    ? {
        best_match_score: Number(match.score.toFixed(3)),
        best_match_id: match.generated.id,
        best_match_path: match.generated.path,
        best_match_prompt_preview: preview(match.generated.prompt),
      }
    : {
        best_match_score: 0,
        best_match_id: null,
        best_match_path: null,
        best_match_prompt_preview: "",
      };

  const base = {
    year: row.year,
    subject: row.subject,
    subject_code: row.subject_code,
    kind: row.kind,
    json_path: row.path,
    question_id: row.id,
    type: row.type,
    correct: row.correct,
    prompt_preview: preview(row.prompt, 220),
    option_previews: row.options.map((option) => preview(option, 100)),
    ...matchInfo,
  };

  if (matchInfo.best_match_score >= duplicateThreshold) {
    coveredRows.push({
      ...base,
      status: "covered_by_generated_bank",
      recommended_action: "do_not_add_duplicate_without_subject_review",
    });
  } else if (matchInfo.best_match_score >= possibleDuplicateThreshold) {
    possibleDuplicateRows.push({
      ...base,
      status: "possible_duplicate",
      recommended_action: "manual_compare_before_adding",
    });
  } else {
    addCandidateRows.push({
      ...base,
      status: "add_candidate",
      recommended_action: "add_to_past_year_or_generated_pool_after_chapter_tagging",
    });
  }
}

const totals = {
  generated_questions: generatedRows.length,
  past_year_questions: pypRows.length,
  past_year_ready_questions: pypRows.filter((row) => row.file_ready).length,
  blocked_until_source_review: blockedRows.length,
  covered_by_generated_bank: coveredRows.length,
  possible_duplicates: possibleDuplicateRows.length,
  add_candidates: addCandidateRows.length,
};

const bySubject = {};
for (const row of pypRows) {
  const key = row.subject ?? "Unknown";
  bySubject[key] ??= {
    past_year_questions: 0,
    ready_questions: 0,
    blocked_until_source_review: 0,
    covered_by_generated_bank: 0,
    possible_duplicates: 0,
    add_candidates: 0,
  };
  bySubject[key].past_year_questions += 1;
  if (row.file_ready) bySubject[key].ready_questions += 1;
}
for (const row of blockedRows) bySubject[row.subject].blocked_until_source_review += 1;
for (const row of coveredRows) bySubject[row.subject].covered_by_generated_bank += 1;
for (const row of possibleDuplicateRows) bySubject[row.subject].possible_duplicates += 1;
for (const row of addCandidateRows) bySubject[row.subject].add_candidates += 1;

writeJson(outCoverage, {
  generated_at: new Date().toISOString(),
  duplicate_threshold: duplicateThreshold,
  possible_duplicate_threshold: possibleDuplicateThreshold,
  totals,
  by_subject: bySubject,
  covered_by_generated_bank: coveredRows,
  possible_duplicates: possibleDuplicateRows,
  blocked_until_source_review: blockedRows.slice(0, 200),
});
writeJson(outAddQueue, addCandidateRows);
writeJson(outDuplicateQueue, [...coveredRows, ...possibleDuplicateRows]);
writeAddCandidateCsv(addCandidateRows);

console.log(JSON.stringify({
  totals,
  coverage: rel(outCoverage),
  addCandidateQueue: rel(outAddQueue),
  duplicateReviewQueue: rel(outDuplicateQueue),
}, null, 2));
