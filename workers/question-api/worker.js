// CUETAce Question API Worker
// Deploy this code to: question.thisisme1289.workers.dev
// Source repo: github.com/thisisme1289-ux/CUETAce

const REPO_BASE = 'https://raw.githubusercontent.com/thisisme1289-ux/CUETAce/main';
const QUESTIONS_BASE = REPO_BASE + '/questions';
const INDEX_URL = QUESTIONS_BASE + '/question-bank-index.json';

const SUBJECT_FOLDER = {
  'Accountancy': 'accountancy',
  'Business Studies': 'business-studies',
  'Economics': 'economics',
  'General Test': 'general-test',
  'English': 'english'
};

const CHAPTER_SLUGS = {
  accountancy: ['AC01','AC02','AC03','AC04','AC05','AC06','AC07','AC08','AC09','AC10','AC11','AC12','AC13','AC14','AC15','AC16'],
  'business-studies': ['BS01','BS02','BS03','BS04','BS05','BS06','BS07','BS08','BS09','BS10','BS11','BS12'],
  economics: ['EC01','EC02','EC03','EC04','EC05','EC06','EC07','EC08','EC09','EC10','EC11','EC12','EC13','EC14','EC15'],
  'general-test': ['GT-S1','GT-S2','GT-S3','GT-S4','GT-S5','GT-S6','GT-S7','GT-S8','GT-S9'],
  english: ['EN-S1','EN-S2','EN-S3','EN-S4','EN-S5']
};

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400'
};

export default {
  async fetch(request, env, ctx) {
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
    const url = new URL(request.url);

    try {
      if (url.pathname === '/health') return json({ ok: true, ts: Date.now(), version: '2026-07-windowed' });
      if (url.pathname === '/manifest') return json({ subjects: Object.keys(SUBJECT_FOLDER), chapters: CHAPTER_SLUGS });
      if (url.pathname === '/questions') return handleQuestions(url, ctx);
      return json({ error: 'Not found' }, 404);
    } catch (err) {
      return json({ error: err.message || 'Worker error' }, 500);
    }
  }
};

async function handleQuestions(url, ctx) {
  const mode = url.searchParams.get('mode') || 'chapter';
  const subject = url.searchParams.get('subject') || '';
  const folder = SUBJECT_FOLDER[subject];
  if (!folder) return json({ error: 'Unknown subject: ' + subject }, 400);

  const seed = url.searchParams.get('seed') || 'cuetace';
  const countParam = toInt(url.searchParams.get('count'), mode === 'mock' ? 50 : 200);
  const count = clamp(countParam, 1, 500);
  const windowStart = Math.max(0, toInt(url.searchParams.get('windowStart'), 0));
  const windowSize = clamp(toInt(url.searchParams.get('windowSize'), 9), 1, 25);
  const shuffle = url.searchParams.get('shuffle') !== '0';

  let questions = [];
  let meta = { mode, subject };

  if (mode === 'chapter') {
    const chapter = url.searchParams.get('chapter') || '';
    if (!chapter) return json({ error: 'chapter required for chapter mode' }, 400);
    const data = await fetchJson(`${QUESTIONS_BASE}/${folder}/${chapter}.json`, ctx);
    questions = extractQuestions(data);
    meta.chapter = chapter;
  } else if (mode === 'mock') {
    const all = await loadAllChapters(folder, ctx);
    const weights = parseWeights(url.searchParams.get('weights'));
    questions = adaptivePick(all, weights, count, seed);
  } else if (mode === 'pyp') {
    const entry = await selectPypEntry(url, subject, ctx);
    if (!entry) return json({ error: 'No ready past-year paper found for this request.' }, 404);
    const data = await fetchJson(REPO_BASE + '/' + entry.sourcePath.replace(/^\/+/, ''), ctx);
    questions = extractQuestions(data);
    meta = { ...meta, year: entry.year || '', paper: entry.paper || '', packId: entry.packId || '', sourcePath: entry.sourcePath };
  } else {
    return json({ error: 'Unsupported mode: ' + mode }, 400);
  }

  const ordered = shuffle ? seededShuffle(questions, seed) : questions.slice();
  const selected = mode === 'chapter' || mode === 'pyp'
    ? ordered.slice(0, Math.min(count || ordered.length, ordered.length))
    : ordered.slice(0, count);
  const start = Math.min(windowStart, Math.max(0, selected.length - 1));
  const windowQuestions = selected.slice(start, start + windowSize).map(normalizeQuestion);

  return json({
    ok: true,
    total: selected.length,
    mode,
    subject,
    meta,
    window: { start, size: windowQuestions.length, requestedStart: windowStart, requestedSize: windowSize },
    questions: windowQuestions
  });
}

async function selectPypEntry(url, subject, ctx) {
  const index = await fetchJson(INDEX_URL, ctx);
  const entries = Array.isArray(index.entries) ? index.entries : [];
  const year = url.searchParams.get('year') || '';
  const sourcePath = url.searchParams.get('sourcePath') || '';
  const paper = url.searchParams.get('paper') || '';
  const packId = url.searchParams.get('packId') || '';

  const ready = entries.filter(entry =>
    entry && entry.readyForStudentUse === true && String(entry.mode || '').startsWith('pyp') && entry.sourcePath
  );

  if (sourcePath) return ready.find(entry => entry.sourcePath === sourcePath);

  const matches = ready.filter(entry => {
    if (entry.subject !== subject) return false;
    if (year && !entryCoversYear(entry, year)) return false;
    if (paper && entry.paper !== paper) return false;
    if (packId && entry.packId !== packId) return false;
    return true;
  });

  return matches.find(entry => entry.mode === 'pyp' && String(entry.year) === String(year))
    || matches.find(entry => entry.mode === 'pyp-import-pack' && String(entry.year) === String(year))
    || matches.find(entry => entry.mode === 'pyp-import-pack')
    || matches.find(entry => entry.mode === 'pyp-individual' && String(entry.year) === String(year))
    || matches[0]
    || null;
}

function entryCoversYear(entry, year) {
  const value = String(entry.year || '');
  const target = String(year);
  if (!target || value === target) return true;
  if (!value.includes('-')) return false;
  const [start, end] = value.split('-').map(Number);
  const numeric = Number(target);
  return Number.isFinite(start) && Number.isFinite(end) && Number.isFinite(numeric) && numeric >= start && numeric <= end;
}

async function loadAllChapters(folder, ctx) {
  const slugs = CHAPTER_SLUGS[folder] || [];
  const chapters = await Promise.all(slugs.map(async slug => {
    try {
      const data = await fetchJson(`${QUESTIONS_BASE}/${folder}/${slug}.json`, ctx);
      return extractQuestions(data);
    } catch (err) {
      return [];
    }
  }));
  return chapters.flat();
}

function extractQuestions(data) {
  if (!data) return [];
  if (Array.isArray(data.questions)) return data.questions;
  if (Array.isArray(data.chapters)) return data.chapters.flatMap(ch =>
    Array.isArray(ch.questions)
      ? ch.questions.map(q => ({ ...q, chapter: q.chapter || ch.chapter || ch.chapter_name || ch.section || ch.chapter_id }))
      : []
  );
  return [];
}

function normalizeQuestion(q) {
  return {
    id: q.id || q.question_id || hashString(q.question || q.text || ''),
    type: q.type || 'MCQ',
    level: (q.level || 'L1').toUpperCase(),
    difficulty: q.difficulty || '',
    question: q.question || q.text || '',
    text: q.text || q.question || '',
    passage: q.passage || '',
    sentence: q.sentence || '',
    statements: q.statements || null,
    column_i: q.column_i || null,
    column_ii: q.column_ii || null,
    options: Array.isArray(q.options) ? q.options : [],
    correct: q.correct,
    explanation: q.explanation || '',
    chapter_id: q.chapter_id || '',
    chapter: q.chapter || q.chapter_name || q.section || 'General'
  };
}

function adaptivePick(allQuestions, weights, total, seed) {
  const byChapter = {};
  allQuestions.forEach(question => {
    const q = normalizeQuestion(question);
    const chapter = q.chapter || q.chapter_id || 'General';
    if (!byChapter[chapter]) byChapter[chapter] = [];
    byChapter[chapter].push(q);
  });

  const chapters = Object.keys(byChapter);
  if (!chapters.length) return [];
  const weighted = chapters.map(chapter => ({ chapter, weight: Number(weights[chapter] || 1.5) || 1.5 }));
  const weightSum = weighted.reduce((sum, item) => sum + item.weight, 0) || 1;
  const picked = [];
  const used = new Set();

  weighted.forEach(item => {
    const slots = Math.max(1, Math.round((item.weight / weightSum) * total));
    seededShuffle(byChapter[item.chapter], seed + item.chapter).slice(0, slots).forEach(q => {
      const key = q.id || q.question;
      if (!used.has(key) && picked.length < total) {
        used.add(key);
        picked.push(q);
      }
    });
  });

  if (picked.length < total) {
    seededShuffle(allQuestions.map(normalizeQuestion), seed + '|fill').forEach(q => {
      const key = q.id || q.question;
      if (!used.has(key) && picked.length < total) {
        used.add(key);
        picked.push(q);
      }
    });
  }
  return picked.slice(0, total);
}

async function fetchJson(url, ctx) {
  const cache = caches.default;
  const cacheReq = new Request(url);
  const cached = await cache.match(cacheReq);
  if (cached) return cached.json();

  const res = await fetch(url, {
    headers: { 'User-Agent': 'CUETAce-Question-API/2026-07' },
    cf: { cacheTtl: 300, cacheEverything: true }
  });
  if (!res.ok) throw new Error(`GitHub ${res.status} - ${url}`);
  const data = await res.json();

  ctx.waitUntil(cache.put(cacheReq, new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'max-age=300' }
  })));
  return data;
}

function parseWeights(value) {
  if (!value) return {};
  try { return JSON.parse(decodeURIComponent(value)); } catch (err) { return {}; }
}

function seededShuffle(arr, seed) {
  const a = arr.slice();
  let state = hashString(seed || 'cuetace') || 1;
  for (let i = a.length - 1; i > 0; i--) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const j = state % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function hashString(input) {
  let hash = 2166136261;
  const text = String(input || '');
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function toInt(value, fallback) {
  const number = Number.parseInt(value, 10);
  return Number.isFinite(number) ? number : fallback;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS }
  });
}
