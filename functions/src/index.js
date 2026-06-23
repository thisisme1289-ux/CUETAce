import crypto from 'node:crypto';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, FieldValue, Timestamp } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { onCall, HttpsError, onRequest } from 'firebase-functions/v2/https';
import { setGlobalOptions } from 'firebase-functions/v2/options';
import Razorpay from 'razorpay';

initializeApp();
setGlobalOptions({ region: 'asia-south1', maxInstances: 10 });

const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

const PLAN_AMOUNT_INR = Number(process.env.MONTHLY_PLAN_AMOUNT_INR || 100);
const QUESTION_PREFIX = process.env.QUESTION_BANK_PREFIX || 'question-bank';
const QUESTION_BUCKET = process.env.QUESTION_BUCKET || undefined;
const PUBLIC_APP_URL = process.env.PUBLIC_APP_URL || 'https://cuetace.fun';
const FREE_SAMPLE_ATTEMPTS = String(process.env.FREE_SAMPLE_ATTEMPTS || 'true') === 'true';
const ACTIVE_SESSION_TTL_MS = 5 * 60 * 1000;

const SUBJECT_SLUGS = {
  Accountancy: 'accountancy',
  'Business Studies': 'business-studies',
  Economics: 'economics',
  'General Test': 'general-test',
  English: 'english'
};

const SUBJECT_CODES = {
  Accountancy: ['AC01','AC02','AC03','AC04','AC05','AC06','AC07','AC08','AC09','AC10','AC11','AC12','AC13','AC14','AC15','AC16'],
  'Business Studies': ['BS01','BS02','BS03','BS04','BS05','BS06','BS07','BS08','BS09','BS10','BS11','BS12'],
  Economics: ['EC01','EC02','EC03','EC04','EC05','EC06','EC07','EC08','EC09','EC10','EC11','EC12','EC13','EC14','EC15'],
  'General Test': ['GT-S1','GT-S2','GT-S3','GT-S4','GT-S5','GT-S6','GT-S7','GT-S8','GT-S9'],
  English: ['EN-S1','EN-S2','EN-S3','EN-S4','EN-S5']
};

function requireAuth(request) {
  if (!request.auth?.uid) {
    throw new HttpsError('unauthenticated', 'Please sign in first.');
  }
  return request.auth;
}

function userRef(uid) {
  return db.collection('users').doc(uid);
}

function stableDocId(value) {
  return crypto.createHash('sha256').update(String(value)).digest('hex');
}

function sessionExpiry() {
  return Timestamp.fromMillis(Date.now() + ACTIVE_SESSION_TTL_MS);
}

function nowPlusDays(days) {
  return Timestamp.fromMillis(Date.now() + days * 24 * 60 * 60 * 1000);
}

async function ensureProfile(uid, email, defaults = {}) {
  const ref = userRef(uid);
  const snap = await ref.get();
  const base = {
    uid,
    email: email || '',
    name: defaults.name || '',
    phone: defaults.phone || '',
    class: defaults.class || '',
    targetExamYear: defaults.targetExamYear || '',
    photoDataUrl: defaults.photoDataUrl || '',
    selectedSubjects: Array.isArray(defaults.selectedSubjects) ? defaults.selectedSubjects : [],
    city: defaults.city || '',
    onboardingPreferences: defaults.onboardingPreferences || {},
    planStatus: 'free',
    planExpiresAt: null,
    razorpayCustomerId: '',
    lastPaymentId: '',
    createdAt: FieldValue.serverTimestamp(),
    lastLoginAt: FieldValue.serverTimestamp()
  };

  if (!snap.exists) {
    await ref.set(base);
    return { ...base, createdAt: null, lastLoginAt: null };
  }

  const updates = {
    email: email || snap.data().email || '',
    lastLoginAt: FieldValue.serverTimestamp()
  };
  for (const field of ['name', 'phone', 'class', 'targetExamYear', 'city', 'photoDataUrl', 'onboardingPreferences']) {
    if (defaults[field] !== undefined) updates[field] = defaults[field];
  }
  if (Array.isArray(defaults.selectedSubjects)) updates.selectedSubjects = defaults.selectedSubjects;
  await ref.set(updates, { merge: true });
  const response = { ...snap.data(), ...updates, email: updates.email };
  delete response.lastLoginAt;
  return response;
}

async function hasActivePlan(uid) {
  const snap = await userRef(uid).get();
  const user = snap.data() || {};
  if (user.planStatus !== 'active') return false;
  const expiry = user.planExpiresAt?.toMillis ? user.planExpiresAt.toMillis() : 0;
  return expiry > Date.now();
}

function assertPaidOrFree(uid, mode) {
  if (mode === 'sample' && FREE_SAMPLE_ATTEMPTS) return Promise.resolve(true);
  return hasActivePlan(uid).then(active => {
    if (!active) {
      throw new HttpsError('permission-denied', 'Your CUETAce plan is not active.');
    }
    return true;
  });
}

function storageBucket() {
  return QUESTION_BUCKET ? storage.bucket(QUESTION_BUCKET) : storage.bucket();
}

function normalizeSubject(subject) {
  if (!SUBJECT_SLUGS[subject]) {
    throw new HttpsError('invalid-argument', 'Unknown subject.');
  }
  return subject;
}

function questionPathFor({ mode, subject, chapterId, year }) {
  const subjectSlug = SUBJECT_SLUGS[subject];
  if (mode === 'pyp') {
    if (!year) throw new HttpsError('invalid-argument', 'Past-year attempt requires year.');
    return `${QUESTION_PREFIX}/past-years/${year}/${subjectSlug}.json`;
  }
  if (!chapterId) throw new HttpsError('invalid-argument', 'Chapter id is required.');
  return `${QUESTION_PREFIX}/chapters/${subjectSlug}/${chapterId}.json`;
}

async function readQuestionBundle(path) {
  const [bytes] = await storageBucket().file(path).download();
  const parsed = JSON.parse(bytes.toString('utf8'));
  return Array.isArray(parsed) ? parsed : parsed.questions || [];
}

function seededShuffle(items, seed) {
  const arr = [...items];
  let state = crypto.createHash('sha256').update(seed).digest().readUInt32BE(0);
  for (let i = arr.length - 1; i > 0; i--) {
    state = (1664525 * state + 1013904223) >>> 0;
    const j = state % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function visibleQuestion(q) {
  return {
    questionId: q.id || '',
    id: q.id || '',
    subject: q.subject || '',
    chapter: q.chapter || '',
    chapter_id: q.chapter_id || '',
    section: q.chapter || q.chapter_id || 'General',
    type: q.type || 'mcq',
    level: q.level || '',
    difficulty: q.difficulty || q['difficulty '] || '',
    question: q.question || q.questionText || q.prompt || q.text || '',
    text: q.question || q.questionText || q.prompt || q.text || '',
    options: Array.isArray(q.options) ? q.options : [],
    passage: q.passage || q.paragraph || q.context || q.case_study || q.caseStudy || q.case || q.comprehension || '',
    sentence: q.sentence || q.stem_sentence || '',
    statements: q.statements || q.statement || q.sentences || null,
    column_i: q.column_i || q.columnI || q.list_i || q.listI || null,
    column_ii: q.column_ii || q.columnII || q.list_ii || q.listII || null,
    image: q.image || q.image_url || q.diagram || '',
    table: q.table || q.data_table || null,
    data: q.data || q.dataset || null,
    marks: { correct: 5, wrong: -1, skipped: 0 }
  };
}

function answerSnapshot(q) {
  return {
    questionId: q.id || '',
    correct: Number.isInteger(q.correct) ? q.correct : q.correct,
    explanation: q.explanation || '',
    text: q.question || q.questionText || q.prompt || q.text || '',
    options: Array.isArray(q.options) ? q.options : [],
    section: q.chapter || q.chapter_id || 'General',
    type: q.type || 'mcq'
  };
}

async function selectQuestions({ mode, subject, chapterId, year, count, weights, uid }) {
  const safeCount = Math.max(1, Math.min(Number(count || (mode === 'mock' ? 50 : 50)), 200));
  if (mode === 'mock') {
    const chapters = SUBJECT_CODES[subject] || [];
    const all = [];
    for (const code of chapters) {
      const path = questionPathFor({ mode: 'chapter', subject, chapterId: code });
      const bundle = await readQuestionBundle(path);
      const weight = Number(weights?.[code] || 1);
      const take = Math.max(1, Math.ceil((safeCount / chapters.length) * weight));
      all.push(...seededShuffle(bundle, `${uid}:${code}:${Date.now()}`).slice(0, take));
    }
    return seededShuffle(all, `${uid}:${subject}:mock:${Date.now()}`).slice(0, safeCount);
  }

  const path = questionPathFor({ mode, subject, chapterId, year });
  const bundle = await readQuestionBundle(path);
  return seededShuffle(bundle, `${uid}:${path}:${Date.now()}`).slice(0, safeCount);
}

export const syncProfile = onCall(async request => {
  const user = requireAuth(request);
  const profile = await ensureProfile(user.uid, user.token.email, request.data || {});
  return { profile };
});

export const claimUserSession = onCall(async request => {
  const user = requireAuth(request);
  const deviceId = String(request.data?.deviceId || '').slice(0, 120);
  if (!deviceId) throw new HttpsError('invalid-argument', 'deviceId is required.');
  const ref = userRef(user.uid);
  const expiry = sessionExpiry();

  await db.runTransaction(async tx => {
    const snap = await tx.get(ref);
    const data = snap.data() || {};
    const active = data.activeSession || {};
    const activeExpiry = active.expiresAt?.toMillis ? active.expiresAt.toMillis() : 0;
    const isDifferentActiveDevice = active.deviceId && active.deviceId !== deviceId && activeExpiry > Date.now();
    if (isDifferentActiveDevice) {
      throw new HttpsError('already-exists', 'This email is already open on another device. Sign out there or wait a few minutes and try again.');
    }
    tx.set(ref, {
      uid: user.uid,
      email: user.token.email || data.email || '',
      activeSession: {
        deviceId,
        claimedAt: active.deviceId === deviceId ? (active.claimedAt || FieldValue.serverTimestamp()) : FieldValue.serverTimestamp(),
        lastSeenAt: FieldValue.serverTimestamp(),
        expiresAt: expiry
      },
      lastLoginAt: FieldValue.serverTimestamp()
    }, { merge: true });
  });

  return { ok: true, expiresAt: expiry.toMillis() };
});

export const heartbeatUserSession = onCall(async request => {
  const user = requireAuth(request);
  const deviceId = String(request.data?.deviceId || '').slice(0, 120);
  if (!deviceId) throw new HttpsError('invalid-argument', 'deviceId is required.');
  const ref = userRef(user.uid);
  const snap = await ref.get();
  const active = snap.data()?.activeSession || {};
  if (active.deviceId && active.deviceId !== deviceId) {
    throw new HttpsError('failed-precondition', 'This account session is active on another device.');
  }
  const expiry = sessionExpiry();
  await ref.set({
    activeSession: {
      deviceId,
      claimedAt: active.claimedAt || FieldValue.serverTimestamp(),
      lastSeenAt: FieldValue.serverTimestamp(),
      expiresAt: expiry
    }
  }, { merge: true });
  return { ok: true, expiresAt: expiry.toMillis() };
});

export const releaseUserSession = onCall(async request => {
  const user = requireAuth(request);
  const deviceId = String(request.data?.deviceId || '').slice(0, 120);
  const ref = userRef(user.uid);
  const snap = await ref.get();
  const active = snap.data()?.activeSession || {};
  if (deviceId && active.deviceId === deviceId) {
    await ref.set({ activeSession: FieldValue.delete() }, { merge: true });
  }
  return { ok: true };
});

export const saveUserResult = onCall(async request => {
  const user = requireAuth(request);
  await ensureProfile(user.uid, user.token.email);
  const payload = request.data?.result || {};
  const result = {
    uid: user.uid,
    testName: String(payload.testName || 'CUETAce Test').slice(0, 180),
    subject: String(payload.subject || '').slice(0, 80),
    mode: String(payload.mode || '').slice(0, 40),
    date: String(payload.date || '').slice(0, 40),
    time: String(payload.time || '').slice(0, 40),
    timeTaken: String(payload.timeTaken || '').slice(0, 40),
    total: Number(payload.total || 0),
    correct: Number(payload.correct || 0),
    wrong: Number(payload.wrong || 0),
    skipped: Number(payload.skipped || 0),
    marks: Number(payload.marks || 0),
    pct: Number(payload.pct || 0),
    avgTime: Number(payload.avgTime || 0),
    chapterBreakdown: Array.isArray(payload.chapterBreakdown) ? payload.chapterBreakdown.slice(0, 100) : [],
    questions: Array.isArray(payload.questions) ? payload.questions.slice(0, 250) : [],
    createdAt: FieldValue.serverTimestamp()
  };
  const resultId = String(payload.id || '');
  const resultRef = resultId
    ? userRef(user.uid).collection('results').doc(resultId)
    : userRef(user.uid).collection('results').doc();
  await resultRef.set(result, { merge: true });
  const response = { id: resultRef.id, ...result, createdAtMillis: Date.now() };
  delete response.createdAt;
  return response;
});

export const listUserResults = onCall(async request => {
  const user = requireAuth(request);
  const limit = Math.min(Number(request.data?.limit || 50), 100);
  const snap = await userRef(user.uid).collection('results').orderBy('createdAt', 'desc').limit(limit).get();
  return {
    results: snap.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAtMillis: data.createdAt?.toMillis ? data.createdAt.toMillis() : 0
      };
    })
  };
});

export const saveUserBookmark = onCall(async request => {
  const user = requireAuth(request);
  await ensureProfile(user.uid, user.token.email);
  const payload = request.data?.bookmark || {};
  const key = String(payload.key || payload.questionId || '').slice(0, 220);
  if (!key) throw new HttpsError('invalid-argument', 'bookmark key is required.');
  await userRef(user.uid).collection('bookmarks').doc(stableDocId(key)).set({
    uid: user.uid,
    key,
    subject: String(payload.subject || '').slice(0, 80),
    savedAt: String(payload.savedAt || '').slice(0, 40),
    chapter_id: String(payload.chapter_id || '').slice(0, 80),
    section: String(payload.section || '').slice(0, 140),
    text: String(payload.text || ''),
    options: Array.isArray(payload.options) ? payload.options.slice(0, 8) : [],
    correct: payload.correct ?? -1,
    explanation: String(payload.explanation || ''),
    type: String(payload.type || 'mcq').slice(0, 40),
    passage: String(payload.passage || ''),
    sentence: String(payload.sentence || ''),
    statements: payload.statements && typeof payload.statements === 'object' ? payload.statements : null,
    column_i: payload.column_i && typeof payload.column_i === 'object' ? payload.column_i : null,
    column_ii: payload.column_ii && typeof payload.column_ii === 'object' ? payload.column_ii : null,
    image: String(payload.image || ''),
    table: payload.table || null,
    data: payload.data || null,
    updatedAt: FieldValue.serverTimestamp()
  }, { merge: true });
  return { saved: true };
});

export const deleteUserBookmark = onCall(async request => {
  const user = requireAuth(request);
  const key = String(request.data?.key || '').slice(0, 220);
  if (!key) throw new HttpsError('invalid-argument', 'bookmark key is required.');
  await userRef(user.uid).collection('bookmarks').doc(stableDocId(key)).delete();
  return { saved: false };
});

export const listUserBookmarks = onCall(async request => {
  const user = requireAuth(request);
  const limit = Math.min(Number(request.data?.limit || 200), 300);
  const snap = await userRef(user.uid).collection('bookmarks').orderBy('updatedAt', 'desc').limit(limit).get();
  return {
    bookmarks: snap.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        updatedAtMillis: data.updatedAt?.toMillis ? data.updatedAt.toMillis() : 0
      };
    })
  };
});

export const createPaymentLink = onCall(async request => {
  const user = requireAuth(request);
  const profile = await ensureProfile(user.uid, user.token.email);
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    throw new HttpsError('failed-precondition', 'Razorpay is not configured.');
  }

  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
  const paymentLink = await razorpay.paymentLink.create({
    amount: PLAN_AMOUNT_INR * 100,
    currency: 'INR',
    accept_partial: false,
    description: 'CUETAce monthly access',
    customer: {
      name: profile.name || user.token.name || 'CUETAce Student',
      email: profile.email || user.token.email || ''
    },
    notify: { sms: false, email: true },
    callback_url: `${PUBLIC_APP_URL}/#dashboard`,
    callback_method: 'get',
    notes: { uid: user.uid, plan: 'monthly', days: '30' }
  });

  await db.collection('payments').doc(paymentLink.id).set({
    uid: user.uid,
    provider: 'razorpay',
    type: 'payment_link',
    status: paymentLink.status || 'created',
    amount: PLAN_AMOUNT_INR,
    currency: 'INR',
    paymentLinkId: paymentLink.id,
    shortUrl: paymentLink.short_url,
    createdAt: FieldValue.serverTimestamp()
  });

  return { paymentLinkId: paymentLink.id, shortUrl: paymentLink.short_url };
});

export const razorpayWebhook = onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method not allowed');
    return;
  }

  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    res.status(500).send('Webhook secret not configured');
    return;
  }

  const rawBody = req.rawBody;
  const signature = req.get('x-razorpay-signature') || '';
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (signatureBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
    res.status(400).send('Invalid signature');
    return;
  }

  const event = req.body;
  const paymentLink = event?.payload?.payment_link?.entity;
  const payment = event?.payload?.payment?.entity;
  const uid = paymentLink?.notes?.uid || payment?.notes?.uid;

  if (event.event === 'payment_link.paid' && uid) {
    await userRef(uid).set({
      planStatus: 'active',
      planExpiresAt: nowPlusDays(30),
      razorpayCustomerId: payment?.customer_id || paymentLink?.customer_id || '',
      lastPaymentId: payment?.id || '',
      updatedAt: FieldValue.serverTimestamp()
    }, { merge: true });

    if (paymentLink?.id) {
      await db.collection('payments').doc(paymentLink.id).set({
        uid,
        status: 'paid',
        paymentId: payment?.id || '',
        paidAt: FieldValue.serverTimestamp(),
        event
      }, { merge: true });
    }
  }

  res.status(200).send('ok');
});

export const createAttempt = onCall(async request => {
  const user = requireAuth(request);
  await ensureProfile(user.uid, user.token.email);

  const mode = request.data?.mode || 'mock';
  const subject = normalizeSubject(request.data?.subject || 'Accountancy');
  await assertPaidOrFree(user.uid, mode);

  const selected = await selectQuestions({
    mode,
    subject,
    chapterId: request.data?.chapterId || '',
    year: request.data?.year || '',
    count: request.data?.count || (mode === 'mock' ? 50 : 50),
    weights: request.data?.weights || {},
    uid: user.uid
  });

  if (!selected.length) {
    throw new HttpsError('not-found', 'No questions available for this attempt.');
  }

  const attemptRef = db.collection('attempts').doc();
  const visible = selected.map(visibleQuestion);
  const hidden = selected.map(answerSnapshot);
  await attemptRef.set({
    uid: user.uid,
    mode,
    subject,
    chapterId: request.data?.chapterId || '',
    year: request.data?.year || '',
    status: 'active',
    questionIds: hidden.map(q => q.questionId),
    answersSnapshot: hidden,
    createdAt: FieldValue.serverTimestamp(),
    submittedAt: null
  });

  return {
    attemptId: attemptRef.id,
    total: visible.length,
    questions: visible
  };
});

export const submitAttempt = onCall(async request => {
  const user = requireAuth(request);
  const attemptId = request.data?.attemptId;
  const answers = Array.isArray(request.data?.answers) ? request.data.answers : [];
  const questionTimes = Array.isArray(request.data?.questionTimes) ? request.data.questionTimes : [];
  if (!attemptId) throw new HttpsError('invalid-argument', 'attemptId is required.');

  const attemptRef = db.collection('attempts').doc(attemptId);
  const attemptSnap = await attemptRef.get();
  if (!attemptSnap.exists || attemptSnap.data().uid !== user.uid) {
    throw new HttpsError('permission-denied', 'Attempt not found for this user.');
  }
  const attempt = attemptSnap.data();
  if (attempt.status === 'submitted') {
    throw new HttpsError('failed-precondition', 'Attempt already submitted.');
  }

  let correct = 0, wrong = 0, skipped = 0;
  const chapterMap = {};
  const questions = (attempt.answersSnapshot || []).map((q, i) => {
    const ans = answers[i] ?? null;
    let status = 'skipped';
    if (ans === null || ans === undefined) skipped++;
    else if (Number(ans) === Number(q.correct)) { correct++; status = 'correct'; }
    else { wrong++; status = 'wrong'; }
    const section = q.section || 'General';
    if (!chapterMap[section]) chapterMap[section] = { correct: 0, wrong: 0, skipped: 0, total: 0 };
    chapterMap[section].total++;
    chapterMap[section][status]++;
    return {
      id: q.questionId,
      key: q.questionId,
      section,
      text: q.text,
      options: q.options,
      correct: q.correct,
      explanation: q.explanation,
      userAnswer: ans,
      status,
      timeSpent: questionTimes[i] || 0
    };
  });

  const total = questions.length;
  const marks = correct * 5 - wrong;
  const pct = total ? Math.round((correct / total) * 100) : 0;
  const chapterBreakdown = Object.entries(chapterMap).map(([name, data]) => ({
    name,
    ...data,
    pct: data.total ? Math.round((data.correct / data.total) * 100) : 0
  })).sort((a, b) => b.pct - a.pct);

  const result = {
    uid: user.uid,
    attemptId,
    testName: request.data?.testName || `${attempt.subject} Test`,
    subject: attempt.subject,
    mode: attempt.mode,
    total,
    correct,
    wrong,
    skipped,
    marks,
    pct,
    avgTime: 0,
    timeTaken: request.data?.timeTaken || '',
    chapterBreakdown,
    questions,
    createdAt: FieldValue.serverTimestamp()
  };

  const resultRef = userRef(user.uid).collection('results').doc();
  await db.runTransaction(async tx => {
    tx.set(resultRef, result);
    tx.update(attemptRef, {
      status: 'submitted',
      submittedAt: FieldValue.serverTimestamp(),
      answers,
      resultId: resultRef.id
    });
  });

  return { id: resultRef.id, ...result };
});

export const bookmarkQuestion = onCall(async request => {
  const user = requireAuth(request);
  const attemptId = request.data?.attemptId || '';
  const questionId = request.data?.questionId || '';
  if (!questionId) throw new HttpsError('invalid-argument', 'questionId is required.');

  const bookmarkRef = userRef(user.uid).collection('bookmarks').doc(questionId);
  const existing = await bookmarkRef.get();
  if (existing.exists) {
    await bookmarkRef.delete();
    return { saved: false };
  }

  await bookmarkRef.set({
    uid: user.uid,
    attemptId,
    questionId,
    subject: request.data?.subject || '',
    section: request.data?.section || '',
    text: request.data?.text || '',
    options: request.data?.options || [],
    savedAt: FieldValue.serverTimestamp()
  });
  return { saved: true };
});

export const adminGrantPlan = onCall(async request => {
  const caller = requireAuth(request);
  const callerRecord = await auth.getUser(caller.uid);
  if (!callerRecord.customClaims?.admin) {
    throw new HttpsError('permission-denied', 'Admin claim required.');
  }
  const uid = request.data?.uid;
  const days = Number(request.data?.days || 30);
  if (!uid) throw new HttpsError('invalid-argument', 'uid is required.');
  await userRef(uid).set({
    planStatus: 'active',
    planExpiresAt: nowPlusDays(days),
    updatedAt: FieldValue.serverTimestamp()
  }, { merge: true });
  return { ok: true };
});
