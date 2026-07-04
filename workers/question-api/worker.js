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

const DEFAULT_ALLOWED_ORIGINS = [
  'https://cuetace.fun',
  'https://www.cuetace.fun',
  'https://cuetace.thisisme1289.workers.dev',
  'http://localhost:8787',
  'http://127.0.0.1:8787',
  'http://localhost:5173',
  'http://127.0.0.1:5173'
];

const RATE_BUCKETS = new Map();

export default {
  async fetch(request, env, ctx) {
    if (request.method === 'OPTIONS') return withCors(new Response(null, { status: 204 }), request, env);
    const url = new URL(request.url);

    try {
      let response;
      if (url.pathname === '/health') response = json({ ok: true, ts: Date.now(), version: '2026-07-secure-windowed-v2' });
      else if (url.pathname === '/manifest') response = json({ subjects: Object.keys(SUBJECT_FOLDER), chapters: CHAPTER_SLUGS });
      else if (url.pathname === '/questions') response = await handleQuestions(request, url, env, ctx);
      else if (url.pathname === '/solutions') response = await handleSolutions(request, url, env, ctx);
      else response = json({ error: 'Not found' }, 404);
      return withCors(response, request, env);
    } catch (err) {
      return withCors(json({ error: err.message || 'Worker error' }, 500), request, env);
    }
  }
};

async function handleQuestions(request, url, env, ctx) {
  const rate = checkRateLimit(request, 'questions', 160, 60_000);
  if (!rate.ok) return json({ error: 'Too many requests. Please slow down.' }, 429);

  const selection = await resolveQuestionSelection(url, ctx);
  if (selection.response) return selection.response;
  const { mode, subject, meta, selected, start, windowStart, windowSize } = selection;
  const windowQuestions = selected.slice(start, start + windowSize).map(q => normalizeQuestion(q, { includeSolution: false }));
  const attemptToken = await signAttemptToken(buildAttemptClaims(url), env);

  return json({
    ok: true,
    total: selected.length,
    mode,
    subject,
    meta,
    access: { solutionsIncluded: false, solutionEndpoint: '/solutions', attemptToken },
    window: { start, size: windowQuestions.length, requestedStart: windowStart, requestedSize: windowSize },
    questions: windowQuestions
  });
}

async function handleSolutions(request, url, env, ctx) {
  const auth = await requireAuthorizedRequest(request, env);
  if (!auth.ok) return json({ error: auth.error }, auth.status);
  const tokenCheck = await verifyAttemptToken(url, env);
  if (!tokenCheck.ok) return json({ error: tokenCheck.error }, tokenCheck.status);

  const rate = checkRateLimit(request, 'solutions:' + auth.uid, 45, 60_000);
  if (!rate.ok) return json({ error: 'Too many solution requests. Please slow down.' }, 429);

  const selection = await resolveQuestionSelection(url, ctx);
  if (selection.response) return selection.response;
  const { mode, subject, meta, selected } = selection;
  const start = Math.max(0, toInt(url.searchParams.get('solutionStart'), 0));
  const size = clamp(toInt(url.searchParams.get('solutionSize'), selected.length), 1, 500);
  const solutions = selected.slice(start, start + size).map((question, offset) => {
    const q = normalizeQuestion(question, { includeSolution: true });
    return {
      index: start + offset,
      id: q.id,
      correct: q.correct,
      explanation: q.explanation || ''
    };
  });

  return json({
    ok: true,
    total: selected.length,
    mode,
    subject,
    meta,
    window: { start, size: solutions.length },
    solutions
  });
}

async function resolveQuestionSelection(url, ctx) {
  const mode = url.searchParams.get('mode') || 'chapter';
  const subject = url.searchParams.get('subject') || '';
  const folder = SUBJECT_FOLDER[subject];
  if (!folder) return { response: json({ error: 'Unknown subject: ' + subject }, 400) };

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
    if (!chapter) return { response: json({ error: 'chapter required for chapter mode' }, 400) };
    if (!(CHAPTER_SLUGS[folder] || []).includes(chapter)) {
      return { response: json({ error: 'Unknown chapter for subject.' }, 400) };
    }
    const data = await fetchJson(`${QUESTIONS_BASE}/${folder}/${chapter}.json`, ctx);
    questions = extractQuestions(data);
    meta.chapter = chapter;
  } else if (mode === 'mock') {
    const all = await loadAllChapters(folder, ctx);
    const weights = parseWeights(url.searchParams.get('weights'));
    questions = adaptivePick(all, weights, count, seed);
  } else if (mode === 'pyp') {
    const entry = await selectPypEntry(url, subject, ctx);
    if (!entry) return { response: json({ error: 'No ready past-year paper found for this request.' }, 404) };
    const data = await fetchJson(REPO_BASE + '/' + entry.sourcePath.replace(/^\/+/, ''), ctx);
    questions = extractQuestions(data);
    meta = { ...meta, year: entry.year || '', paper: entry.paper || '', packId: entry.packId || '', sourcePath: entry.sourcePath };
  } else {
    return { response: json({ error: 'Unsupported mode: ' + mode }, 400) };
  }

  const ordered = shuffle ? seededShuffle(questions, seed) : questions.slice();
  const selected = mode === 'chapter' || mode === 'pyp'
    ? ordered.slice(0, Math.min(count || ordered.length, ordered.length))
    : ordered.slice(0, count);
  const start = Math.min(windowStart, Math.max(0, selected.length - 1));
  return { mode, subject, meta, selected, start, windowStart, windowSize };
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

function normalizeQuestion(q, options = {}) {
  const normalized = {
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
    chapter_id: q.chapter_id || '',
    chapter: q.chapter || q.chapter_name || q.section || 'General'
  };
  if (options.includeSolution) {
    normalized.correct = q.correct;
    normalized.explanation = q.explanation || '';
  }
  return normalized;
}

function adaptivePick(allQuestions, weights, total, seed) {
  const byChapter = {};
  allQuestions.forEach(question => {
    const q = normalizeQuestion(question, { includeSolution: true });
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
    seededShuffle(allQuestions.map(q => normalizeQuestion(q, { includeSolution: true })), seed + '|fill').forEach(q => {
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

function checkRateLimit(request, bucketName, limit, windowMs) {
  const ip = request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || 'unknown';
  const key = bucketName + ':' + ip;
  const now = Date.now();
  const current = RATE_BUCKETS.get(key);
  if (!current || now > current.resetAt) {
    RATE_BUCKETS.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }
  current.count += 1;
  if (current.count > limit) return { ok: false, resetAt: current.resetAt };

  if (RATE_BUCKETS.size > 2000) {
    for (const [storedKey, bucket] of RATE_BUCKETS.entries()) {
      if (now > bucket.resetAt) RATE_BUCKETS.delete(storedKey);
    }
  }
  return { ok: true };
}

async function requireAuthorizedRequest(request, env) {
  const projectId = env.FIREBASE_PROJECT_ID || env.FIREBASE_PROJECT || 'cuet-d3dea';
  const token = getBearerToken(request);
  if (!token) return { ok: false, status: 401, error: 'Firebase sign-in required for solutions.' };

  try {
    const payload = await verifyFirebaseIdToken(token, projectId);
    return { ok: true, uid: payload.sub || payload.user_id || '', payload };
  } catch (err) {
    return { ok: false, status: 401, error: 'Invalid or expired Firebase session.' };
  }
}

function buildAttemptClaims(url) {
  return {
    mode: url.searchParams.get('mode') || 'chapter',
    subject: url.searchParams.get('subject') || '',
    chapter: url.searchParams.get('chapter') || '',
    year: url.searchParams.get('year') || '',
    paper: url.searchParams.get('paper') || '',
    packId: url.searchParams.get('packId') || '',
    sourcePath: url.searchParams.get('sourcePath') || '',
    count: String(clamp(toInt(url.searchParams.get('count'), (url.searchParams.get('mode') || 'chapter') === 'mock' ? 50 : 200), 1, 500)),
    seed: url.searchParams.get('seed') || 'cuetace'
  };
}

async function signAttemptToken(claims, env) {
  const secret = env.QUESTION_API_SECRET || '';
  if (!secret) return '';
  const body = { ...claims, iat: Math.floor(Date.now() / 1000) };
  const payload = base64UrlEncode(new TextEncoder().encode(JSON.stringify(body)));
  const signature = await hmacSha256(payload, secret);
  return payload + '.' + signature;
}

async function verifyAttemptToken(url, env) {
  const secret = env.QUESTION_API_SECRET || '';
  if (!secret) {
    return { ok: false, status: 503, error: 'QUESTION_API_SECRET is required before solutions can be served.' };
  }

  const token = url.searchParams.get('attemptToken') || '';
  const [payloadPart, signaturePart] = token.split('.');
  if (!payloadPart || !signaturePart) return { ok: false, status: 401, error: 'Valid attempt token required.' };

  const expectedSignature = await hmacSha256(payloadPart, secret);
  if (!constantTimeEqual(signaturePart, expectedSignature)) {
    return { ok: false, status: 401, error: 'Invalid attempt token.' };
  }

  let claims;
  try {
    claims = JSON.parse(base64UrlDecode(payloadPart));
  } catch (err) {
    return { ok: false, status: 401, error: 'Invalid attempt token payload.' };
  }

  const now = Math.floor(Date.now() / 1000);
  if (!claims.iat || claims.iat < now - 6 * 60 * 60 || claims.iat > now + 300) {
    return { ok: false, status: 401, error: 'Expired attempt token.' };
  }

  const expected = buildAttemptClaims(url);
  const mismatch = Object.keys(expected).some(key => String(claims[key] || '') !== String(expected[key] || ''));
  if (mismatch) return { ok: false, status: 401, error: 'Attempt token does not match this request.' };
  return { ok: true, claims };
}

async function hmacSha256(payload, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return base64UrlEncode(new Uint8Array(signature));
}

function constantTimeEqual(a, b) {
  const left = String(a || '');
  const right = String(b || '');
  let diff = left.length ^ right.length;
  const max = Math.max(left.length, right.length);
  for (let i = 0; i < max; i++) {
    diff |= (left.charCodeAt(i) || 0) ^ (right.charCodeAt(i) || 0);
  }
  return diff === 0;
}

function getBearerToken(request) {
  const header = request.headers.get('Authorization') || '';
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : '';
}

async function verifyFirebaseIdToken(token, projectId) {
  const parts = String(token || '').split('.');
  if (parts.length !== 3) throw new Error('Malformed token');

  const header = JSON.parse(base64UrlDecode(parts[0]));
  const payload = JSON.parse(base64UrlDecode(parts[1]));
  const now = Math.floor(Date.now() / 1000);

  if (header.alg !== 'RS256' || !header.kid) throw new Error('Unsupported token header');
  if (payload.aud !== projectId) throw new Error('Invalid audience');
  if (payload.iss !== `https://securetoken.google.com/${projectId}`) throw new Error('Invalid issuer');
  if (!payload.sub || typeof payload.sub !== 'string') throw new Error('Missing subject');
  if (payload.exp <= now || payload.iat > now + 300) throw new Error('Expired token');

  const jwk = await getFirebaseJwk(header.kid);
  const key = await crypto.subtle.importKey(
    'jwk',
    jwk,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['verify']
  );
  const verified = await crypto.subtle.verify(
    { name: 'RSASSA-PKCS1-v1_5' },
    key,
    base64UrlToBytes(parts[2]),
    new TextEncoder().encode(parts[0] + '.' + parts[1])
  );
  if (!verified) throw new Error('Bad signature');
  return payload;
}

async function getFirebaseJwk(kid) {
  const res = await fetch('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com', {
    cf: { cacheTtl: 3600, cacheEverything: true }
  });
  if (!res.ok) throw new Error('Could not load Firebase keys');
  const data = await res.json();
  const jwk = (data.keys || []).find(key => key.kid === kid);
  if (!jwk) throw new Error('Firebase key not found');
  return jwk;
}

function base64UrlDecode(value) {
  const bytes = base64UrlToBytes(value);
  return new TextDecoder().decode(bytes);
}

function base64UrlToBytes(value) {
  const base64 = String(value || '').replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - base64.length % 4) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function base64UrlEncode(bytes) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
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
    headers: { 'Content-Type': 'application/json' }
  });
}

function withCors(response, request, env) {
  const headers = new Headers(response.headers);
  const origin = request.headers.get('Origin') || '';
  const allowed = getAllowedOrigins(env);
  if (origin && allowed.includes(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Vary', 'Origin');
  }
  headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  headers.set('Access-Control-Max-Age', '86400');
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

function getAllowedOrigins(env) {
  const configured = String(env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);
  return configured.length ? configured : DEFAULT_ALLOWED_ORIGINS;
}
