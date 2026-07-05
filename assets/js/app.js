// ── DATA: All chapters ──
const CHAPTERS = {
  "Accountancy": [
    "AC01 — Fundamentals of Partnership (Deed, Features, Provisions of Act)",
    "AC02 — Capital Accounts and Profit Sharing (Fixed vs Fluctuating, P&L Appropriation)",
    "AC03 — Reconstitution: Change in Profit Sharing Ratio (Sacrificing and Gaining Ratio)",
    "AC04 — Goodwill: Nature, Factors and Valuation Methods (Average, Super Profit, Capitalisation)",
    "AC05 — Admission of a Partner (New Ratio, Goodwill, Revaluation, Capital Adjustment)",
    "AC06 — Retirement and Death of a Partner (Gaining Ratio, Executor's Account, Loan Account)",
    "AC07 — Dissolution Basics (Meaning and Settlement of Accounts)",
    "AC08 — Realisation Account (Preparation and Related Accounts)",
    "AC09 — Share Capital (Meaning, Nature, Types and Features of Companies)",
    "AC10 — Issue of Shares (Equity and Preference, Over/Under Subscription, Par and Premium)",
    "AC11 — Forfeiture and Reissue of Forfeited Shares",
    "AC12 — Issue of Debentures (Par, Premium, Discount; Collateral Security; Interest)",
    "AC13 — Financial Statements of a Company (P&L and Balance Sheet — Schedule III)",
    "AC14 — Comparative and Common-Size Statements",
    "AC15 — Accounting Ratios (Liquidity, Solvency, Activity, Profitability)",
    "AC16 — Cash Flow Statement (Classification, Preparation, Adjustments)"
  ],
  "Business Studies": [
    "BS01 — Nature and Significance of Management (Concept, Objectives, Levels, Functions, Coordination)",
    "BS02 — Principles of Management (Fayol's 14 Principles, Taylor's Scientific Management)",
    "BS03 — Business Environment (Meaning, Importance, Dimensions — Economic, Social, Tech, Political, Legal)",
    "BS04 — Planning (Meaning, Features, Importance, Limitations, Process, Types of Plans)",
    "BS05 — Organising (Process, Structures, Formal/Informal, Delegation, Decentralisation)",
    "BS06 — Staffing (Need, Process, Recruitment Sources, Selection, Training and Development)",
    "BS07 — Directing (Supervision, Motivation — Maslow, Financial/Non-Financial Incentives, Leadership, Communication)",
    "BS08 — Controlling (Meaning, Importance, Relationship with Planning, Steps in Control Process)",
    "BS09 — Business Finance (Financial Decisions, Planning, Capital Structure, Fixed and Working Capital)",
    "BS10 — Financial Markets (Money Market, Capital Market, Stock Exchange, Depository/Demat, SEBI)",
    "BS11 — Marketing (Meaning, Functions, Marketing Mix — Product, Price, Place, Promotion)",
    "BS12 — Consumer Protection (Importance, Rights, Responsibilities, Act 2019, Redressal, NGOs)"
  ],
  "Economics": [
    "EC01 — Introduction to Microeconomics (Meaning, Central Problems, Consumer's Budget and Optimal Choice)",
    "EC02 — Consumer's Equilibrium and Demand (Utility Approach, Demand Curve, Elasticity of Demand)",
    "EC03 — Production and Costs (Production Function, TP/MP/AP, Cost Curves, Revenue, Producer's Equilibrium)",
    "EC04 — Perfect Competition and Supply (Features, Profit Maximisation, Price Determination, Supply Curve, Elasticity of Supply)",
    "EC05 — Market Equilibrium (Equilibrium Price, Excess Demand/Supply, Price Ceiling and Price Floor)",
    "EC06 — National Income Accounting (Circular Flow, GDP Methods — Value Added, Expenditure, Income)",
    "EC07 — Aggregates and GDP Welfare (Factor Cost, Basic Prices, Market Price, Nominal vs Real GDP)",
    "EC08 — Money and Banking (Money Supply, Money Creation, Central Bank — RBI, Monetary Policy Tools)",
    "EC09 — Income and Employment (Aggregate Demand, Two-Sector Model, Multiplier, Excess/Deficient Demand)",
    "EC10 — Government Budget (Meaning, Objectives, Components, Revenue vs Capital, Budget Deficits)",
    "EC11 — Open Economy Macroeconomics (BOP Accounts, BOP Surplus/Deficit, Exchange Rate Systems, Managed Floating)",
    "EC12 — Development Policies 1947–90 (Indian Economy at Independence, Five Year Plans, Agriculture, Industry, Trade)",
    "EC13 — Economic Reforms Since 1991 (Liberalisation, Privatisation, Globalisation — LPG Policy, Appraisal)",
    "EC14 — Current Challenges (Human Capital, Rural Development, Employment, Environment and Sustainable Development)",
    "EC15 — Development Experience: India vs Neighbours (Growth, Population, Sectoral Development, HDI Comparison)"
  ],
  "General Test": [
    "GT-S1 — Indian Polity (Constitution and Preamble, Fundamental Rights and Duties, Parliament and Legislature, Executive and Judiciary, Local Government and Elections)",
    "GT-S2 — Indian History (Ancient India, Medieval India, Modern India and Freedom Struggle, Important Events and Dates, Important Personalities)",
    "GT-S3 — Indian Geography (Physical Features, Climate and Rivers, Resources and Agriculture)",
    "GT-S4 — Indian Economy (Basics and Planning, Banking and Finance, Trade and Budget, Government Schemes and Policies)",
    "GT-S5 — General Awareness (Awards and Honours, Sports and Games, Science and Technology, Current Affairs)",
    "GT-S6 — Quantitative Aptitude (Percentage, Profit and Loss, Simple and Compound Interest, Ratio and Proportion, Time and Work, Speed Distance and Time, Problems on Ages, Number Series, Letter and Alphabet Series)",
    "GT-S7 — Data Interpretation (Tables, Bar Graphs, Pie Charts, Line Graphs)",
    "GT-S8 — Reasoning (Analogies, Classification, Coding-Decoding, Blood Relations, Direction and Distance, Ranking and Order, Syllogisms, Statements and Assumptions, Cause and Effect)",
    "GT-S9 — General Science and Environment (Physics Chemistry and Biology Basics, Biodiversity, Climate Change and Sustainability)"
  ],
  "English": [
    "EN-S1 — Reading Comprehension (Factual Passages, Narrative Passages, Literary Passages, Vocabulary in Context, Inference-Based Questions, Tone and Theme Identification, Fact vs Opinion, Author's Intent)",
    "EN-S2 — Para Jumbles (Rearranging, Sentence Sequencing, Logical Flow, Coherence)",
    "EN-S3 — Match the Following (Column Matching Words and Phrases, Sentence Linking)",
    "EN-S4 — Choosing Correct Word (Fill in the Blanks, Grammar-Based Word Choice, Context-Based Usage)",
    "EN-S5 — Vocabulary (Synonyms, Antonyms, One-Word Substitution, Idioms and Phrases)"
  ]
};

const SUBJECTS = ["Accountancy","Business Studies","Economics","General Test","English"];
const ABBR = { "Accountancy":"AC","Business Studies":"BS","Economics":"EC","General Test":"GT","English":"EN" };
const YEARS = [2025, 2024, 2023, 2022];

// ── QUESTION BANK: Chapter file URL builder ──
const BASE_URL = 'https://raw.githubusercontent.com/thisisme1289-ux/CUETAce/main/questions';
const REPO_RAW_BASE_URL = 'https://raw.githubusercontent.com/thisisme1289-ux/CUETAce/main';
const QUESTION_BANK_INDEX_URL = BASE_URL + '/question-bank-index.json';
const QUESTION_API_BASE_URL = 'https://question.thisisme1289.workers.dev';
const QUESTION_API_WINDOW_SIZE = 9;
let QUESTION_BANK_INDEX_CACHE = null;
const ACTIVE_EXAM_KEY = 'cuetace_active_exam_attempt';
const QUESTION_REPORTS_KEY = 'cuetace_question_reports';
const ROUTE_TO_TAB = {
  '/dashboard': 'tab-home',
  '/mock-tests': 'tab-mock',
  '/chapter-wise': 'tab-chapters',
  '/past-papers': 'tab-papers',
  '/results': 'tab-results',
  '/current-affairs': 'tab-ca',
  '/saved': 'tab-saved'
};
const TAB_TO_ROUTE = Object.entries(ROUTE_TO_TAB).reduce((map, pair) => {
  map[pair[1]] = pair[0];
  return map;
}, {});
const ROUTE_ALIASES = {
  '/home': '/dashboard',
  '/mock': '/mock-tests',
  '/chapters': '/chapter-wise',
  '/papers': '/past-papers',
  '/past-year-papers': '/past-papers',
  '/current-affairs/': '/current-affairs',
  '/saved/': '/saved',
  '/results/': '/results',
  '/dashboard/': '/dashboard',
  '/login/': '/login'
};
const HASH_TO_ROUTE = {
  '#mock-tests': '/mock-tests',
  '#chapter-wise': '/chapter-wise',
  '#past-papers': '/past-papers',
  '#current-affairs': '/current-affairs',
  '#results': '/results',
  '#saved': '/saved'
};

// Maps each subject to its chapter file slugs (filename without .json)
// File path pattern: questions/{subject-folder}/{chapter-slug}.json
const CHAPTER_SLUGS = {
  'Accountancy': [
    'AC01','AC02','AC03','AC04','AC05','AC06','AC07','AC08',
    'AC09','AC10','AC11','AC12','AC13','AC14','AC15','AC16'
  ],
  'Business Studies': [
    'BS01','BS02','BS03','BS04','BS05','BS06',
    'BS07','BS08','BS09','BS10','BS11','BS12'
  ],
  'Economics': [
    'EC01','EC02','EC03','EC04','EC05','EC06','EC07','EC08',
    'EC09','EC10','EC11','EC12','EC13','EC14','EC15'
  ],
  'General Test': [
    'GT-S1','GT-S2','GT-S3','GT-S4','GT-S5',
    'GT-S6','GT-S7','GT-S8','GT-S9'
  ],
  'English': ['EN-S1','EN-S2','EN-S3','EN-S4','EN-S5']
};

// Subject folder names (maps subject display name → folder in repo)
const SUBJECT_FOLDERS = {
  'Accountancy':      'accountancy',
  'Business Studies': 'business-studies',
  'Economics':        'economics',
  'General Test':     'general-test',
  'English':          'english'
};

function getChapterUrl(subject, slug) {
  return `${BASE_URL}/${SUBJECT_FOLDERS[subject]}/${slug}.json`;
}

// Auth and profile logic lives in assets/js/auth.js

// Cache: individual chapter files { "Accountancy/AC01": {chapter, questions} }
const CHAPTER_CACHE = {};

// Cache: merged subject banks for mock mode { "Accountancy": {chapters:[...]} }
const MOCK_BANK_CACHE = {};


// ════════════════════════════════════
// ACCESS — Everything is free
// ════════════════════════════════════
function getPlan()           { return 'premium'; }
function getMockUsed()       { return 0; }
function incrementMockUsed() {}
function setPlan(plan)       {}
function updatePlanUI()      {}
function canStartMock()      { return true; }

function handleMockStart(testName, subject) {
  showView('examscreen', { testName, subject, mode: 'mock' });
}

function handleChapterClick(testName, subject) {
  showView('examscreen', { testName, subject, mode: 'chapter', qCount: 200 });
}

function buildExamResumeId(testName, subject, mode, pypUrl) {
  return [mode || 'mock', subject || '', testName || '', pypUrl || ''].join('|');
}

function getChapterSlugFromTestName(testName, subject) {
  const slugs = CHAPTER_SLUGS[subject] || [];
  return slugs.find(slug => String(testName || '').startsWith(slug)) || '';
}

function buildQuestionApiUrl(params, path = '/questions') {
  const url = new URL(QUESTION_API_BASE_URL + path);
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') url.searchParams.set(key, String(value));
  });
  return url.toString();
}

async function getQuestionApiAuthHeaders() {
  const headers = {};
  try {
    if (!firebaseAuth && typeof initFirebaseServices === 'function') initFirebaseServices();
    if (firebaseAuth && firebaseAuth.currentUser) {
      headers.Authorization = 'Bearer ' + await firebaseAuth.currentUser.getIdToken();
    }
  } catch (err) {
    console.warn('[CUETAce] Could not attach question API auth token', err);
  }
  return headers;
}

function normalizeApiQuestion(q) {
  if (!q) return null;
  const normalized = {
    ...q,
    section: q.section || q.chapter || q.chapter_name || q.chapter_id || 'General',
    text: q.text || q.question || 'Question',
    options: Array.isArray(q.options) ? q.options : []
  };
  if (Object.prototype.hasOwnProperty.call(q, 'correct')) normalized.correct = q.correct;
  if (Object.prototype.hasOwnProperty.call(q, 'explanation')) normalized.explanation = q.explanation || '';
  return normalized;
}

function buildApiAttempt(testName, subject, mode, pypMeta, pypUrl, qCount) {
  const seed = Math.floor(Date.now() + Math.random() * 1000000).toString(36);
  const attempt = {
    source: 'worker-api',
    seed,
    mode: mode || 'mock',
    subject,
    testName,
    count: mode === 'mock' ? 50 : mode === 'chapter' ? (qCount || 200) : (qCount || ''),
    chapter: mode === 'chapter' ? getChapterSlugFromTestName(testName, subject) : '',
    year: pypMeta?.year || '',
    paper: pypMeta?.paper || '',
    packId: pypMeta?.packId || '',
    sourcePath: pypMeta?.sourcePath || '',
    pypUrl: pypUrl || '',
    attemptToken: ''
  };
  attempt.key = [
    attempt.mode, attempt.subject, attempt.chapter, attempt.year,
    attempt.paper, attempt.packId, attempt.sourcePath, attempt.count, attempt.seed
  ].join('|');
  return attempt;
}

async function fetchApiQuestionWindow(attempt, centerIndex) {
  if (!attempt || attempt.source !== 'worker-api') return null;
  const windowSize = QUESTION_API_WINDOW_SIZE;
  const start = Math.max(0, Number(centerIndex || 0) - Math.floor(windowSize / 2));
  const url = buildQuestionApiUrl({
    mode: attempt.mode,
    subject: attempt.subject,
    chapter: attempt.chapter,
    year: attempt.year,
    paper: attempt.paper,
    packId: attempt.packId,
    sourcePath: attempt.sourcePath,
    count: attempt.count,
    seed: attempt.seed,
    windowStart: start,
    windowSize
  });
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Question API HTTP ' + res.status);
  const data = await res.json();
  if (!data || !data.window || !Array.isArray(data.questions)) {
    throw new Error('Question API is not updated for windowed loading yet.');
  }
  if (data.access && data.access.attemptToken) attempt.attemptToken = data.access.attemptToken;
  const actualStart = Number(data.window.start || 0);
  data.questions.forEach((question, offset) => {
    EXAM_QUESTIONS[actualStart + offset] = normalizeApiQuestion(question);
  });
  if (Number(data.total) > 0) examState.totalQ = Number(data.total);
  return data;
}

async function fetchApiSolutions(attempt, solutionStart, solutionSize) {
  if (!attempt || attempt.source !== 'worker-api') return null;
  const url = buildQuestionApiUrl({
    mode: attempt.mode,
    subject: attempt.subject,
    chapter: attempt.chapter,
    year: attempt.year,
    paper: attempt.paper,
    packId: attempt.packId,
    sourcePath: attempt.sourcePath,
    count: attempt.count,
    seed: attempt.seed,
    attemptToken: attempt.attemptToken,
    solutionStart,
    solutionSize
  }, '/solutions');
  const headers = await getQuestionApiAuthHeaders();
  const res = await fetch(url, { cache: 'no-store', headers });
  if (!res.ok) throw new Error('Question solutions API HTTP ' + res.status);
  const data = await res.json();
  if (!data || !Array.isArray(data.solutions)) throw new Error('Question solutions API returned no solutions.');
  data.solutions.forEach(solution => {
    const index = Number(solution.index);
    if (!Number.isInteger(index) || !EXAM_QUESTIONS[index]) return;
    EXAM_QUESTIONS[index].correct = solution.correct;
    EXAM_QUESTIONS[index].explanation = solution.explanation || '';
  });
  return data;
}

async function tryStartExamFromQuestionApi(testName, subject, mode, pypUrl, qCount, pypMeta) {
  if (mode !== 'mock' && mode !== 'chapter' && mode !== 'pyp') return false;
  const attempt = buildApiAttempt(testName, subject, mode, pypMeta, pypUrl, qCount);
  if (mode === 'chapter' && !attempt.chapter) return false;
  const data = await fetchApiQuestionWindow(attempt, 0);
  if (!data || !Array.isArray(data.questions)) return false;
  examState.apiAttempt = attempt;
  examState.totalQ = Number(data.total || data.questions.length || 0);
  if (!examState.totalQ) return false;
  EXAM_QUESTIONS = new Array(examState.totalQ).fill(null);
  const start = Number(data.window.start || 0);
  data.questions.forEach((question, offset) => {
    EXAM_QUESTIONS[start + offset] = normalizeApiQuestion(question);
  });
  return true;
}

async function ensureQuestionLoaded(index) {
  if (EXAM_QUESTIONS[index]) return EXAM_QUESTIONS[index];
  if (!examState.apiAttempt) return null;
  await fetchApiQuestionWindow(examState.apiAttempt, index);
  return EXAM_QUESTIONS[index] || null;
}

async function ensureAllExamQuestionsLoaded() {
  if (!examState.apiAttempt) return;
  for (let i = 0; i < examState.totalQ; i += QUESTION_API_WINDOW_SIZE) {
    if (!EXAM_QUESTIONS[i]) {
      await fetchApiQuestionWindow(examState.apiAttempt, i);
    }
  }
}

async function ensureApiSolutionsLoaded() {
  if (!examState.apiAttempt) return true;
  const alreadyHasSolutions = EXAM_QUESTIONS
    .slice(0, examState.totalQ)
    .every(q => q && Object.prototype.hasOwnProperty.call(q, 'correct'));
  if (alreadyHasSolutions) return true;

  const chunkSize = 100;
  for (let i = 0; i < examState.totalQ; i += chunkSize) {
    await fetchApiSolutions(examState.apiAttempt, i, Math.min(chunkSize, examState.totalQ - i));
  }
  return true;
}

function repoRawUrl(sourcePath) {
  return REPO_RAW_BASE_URL + '/' + String(sourcePath || '').replace(/^\/+/, '').split('/').map(encodeURIComponent).join('/');
}

async function loadQuestionBankIndex() {
  if (QUESTION_BANK_INDEX_CACHE) return QUESTION_BANK_INDEX_CACHE;
  const res = await fetch(QUESTION_BANK_INDEX_URL + '?v=' + Date.now());
  if (!res.ok) throw new Error('HTTP ' + res.status + ' — Question bank index not found.');
  QUESTION_BANK_INDEX_CACHE = await res.json();
  return QUESTION_BANK_INDEX_CACHE;
}

function pypEntriesFromIndex(index) {
  const entries = Array.isArray(index?.entries) ? index.entries : [];
  return entries.filter(entry =>
    entry &&
    entry.readyForStudentUse === true &&
    typeof entry.mode === 'string' &&
    entry.mode.startsWith('pyp') &&
    entry.sourcePath
  );
}

function entryCoversYear(entry, year) {
  const entryYear = String(entry.year || '');
  const target = String(year);
  if (entryYear === target) return true;
  if (!entryYear.includes('-')) return false;
  const [start, end] = entryYear.split('-').map(Number);
  const numericYear = Number(target);
  return Number.isFinite(start) && Number.isFinite(end) && Number.isFinite(numericYear) && numericYear >= start && numericYear <= end;
}

function selectPypEntry(entries, subject, year) {
  const subjectMatches = entries.filter(entry => entry.subject === subject && entryCoversYear(entry, year));
  if (!subjectMatches.length) return null;
  const exactYear = String(year);
  return subjectMatches.find(entry => entry.mode === 'pyp' && String(entry.year) === exactYear)
    || subjectMatches.find(entry => entry.mode === 'pyp-import-pack' && String(entry.year) === exactYear)
    || subjectMatches.find(entry => entry.mode === 'pyp-import-pack')
    || subjectMatches.find(entry => entry.mode === 'pyp-individual' && String(entry.year) === exactYear)
    || subjectMatches[0];
}

function pypDisplayName(entry, year, subject) {
  if (entry.mode === 'pyp-individual' && entry.paper) {
    return 'CUET ' + year + ' — ' + subject + ' (' + String(entry.paper).replace(/-/g, ' ') + ')';
  }
  return 'CUET ' + year + ' — ' + subject;
}

async function handlePYPClick(testName, subject, year) {
  try {
    const index = await loadQuestionBankIndex();
    const entry = selectPypEntry(pypEntriesFromIndex(index), subject, year);
    if (!entry) throw new Error('No ready past-year paper is available for ' + subject + ' ' + year + '.');
    showView('examscreen', {
      testName: testName || pypDisplayName(entry, year, subject),
      subject,
      mode: 'pyp',
      pypUrl: repoRawUrl(entry.sourcePath),
      pypMeta: {
        year: entry.year || year,
        paper: entry.paper || '',
        packId: entry.packId || '',
        sourcePath: entry.sourcePath || '',
        count: entry.count || 0
      }
    });
  } catch (err) {
    console.warn('[CUETAce] Could not open past-year paper', err);
    showAppToast(err.message || 'Could not open this past-year paper.', 'error');
  }
}

// ── BUILD CHAPTER TAB ──
let _chaptersBuilt = false;
let _papersBuilt   = false;
let _papersIndexRenderStarted = false;

function buildChapters() {
  if (_chaptersBuilt) return;
  const container = document.getElementById('chapter-content');
  if (!container) return;
  _chaptersBuilt = true;
  let total = 0;
  SUBJECTS.forEach(subj => {
    const chapters = CHAPTERS[subj];
    total += chapters.length;
    const group = document.createElement('div');
    group.className = 'chapter-group';
    const rows = chapters.map(ch => {
      const e = ch.replace(/'/g, "\\'");
      const subjE = subj.replace(/'/g, "\\'");
      return `<div class="chapter-item" onclick="handleChapterClick('${e}','${subjE}')"><span>${ch}</span><button class="test-btn btn-ghost-sm" onclick="event.stopPropagation();handleChapterClick('${e}','${subjE}')">Start</button></div>`;
    }).join('');
    group.innerHTML = `
      <div class="chapter-group-header" onclick="toggleChapters(this)">
        <span>${subj}</span>
        <i class="cg-arrow">&#x25BE;</i>
      </div>
      <div class="chapter-group-body">${rows}</div>`;
    container.appendChild(group);
  });
  document.getElementById('chapter-sub-count').textContent =
    `Pick any subject — expand chapters — ${total} chapters across 6 subjects`;
}

// ── BUILD PAPERS TAB ──
async function renderIndexedPapers() {
  if (_papersIndexRenderStarted) return;
  const container = document.getElementById('papers-content');
  if (!container) return;
  _papersIndexRenderStarted = true;
  container.innerHTML = '<div class="empty-state" style="margin-top:24px;"><div class="empty-title">Loading past year papers...</div></div>';
  try {
    const index = await loadQuestionBankIndex();
    const entries = pypEntriesFromIndex(index);
    container.innerHTML = '';
    let rendered = 0;
    YEARS.forEach((year, i) => {
      const available = SUBJECTS.map(subj => ({
        subject: subj,
        entry: selectPypEntry(entries, subj, year)
      })).filter(item => item.entry);
      if (!available.length) return;
      const group = document.createElement('div');
      group.className = 'year-group';
      if (i === 0) group.style.marginTop = '20px';
      const list = document.createElement('div');
      list.className = 'test-list';
      available.forEach(({ subject: subj, entry }) => {
        const testName = pypDisplayName(entry, year, subj);
        const item = document.createElement('div');
        item.className = 'test-item pyp-item';
        item.addEventListener('click', () => handlePYPClick(testName, subj, year));
        item.innerHTML = `
          <div class="test-icon-box">${ABBR[subj]}</div>
          <div class="test-info">
            <div class="test-name">${esc(testName)}</div>
            <div class="test-meta">${Number(entry.count || 0) || 'Ready'} Questions · Attempt mode · With solutions</div>
          </div>
          <div class="test-right">
            <div class="test-status status-new">${esc(String(year))}</div>
            <button class="test-btn btn-gold" type="button">Attempt</button>
          </div>`;
        const button = item.querySelector('button');
        if (button) {
          button.addEventListener('click', event => {
            event.stopPropagation();
            handlePYPClick(testName, subj, year);
          });
        }
        list.appendChild(item);
        rendered++;
      });
      group.innerHTML = `<div class="year-badge">${year}</div>`;
      group.appendChild(list);
      container.appendChild(group);
    });
    if (!rendered) {
      container.innerHTML = '<div class="empty-state" style="margin-top:40px;"><div class="empty-line"></div><div class="empty-title">No ready past year papers yet</div><div class="empty-desc">Ready papers will appear here after they are added to the question bank index.</div></div>';
    }
  } catch (err) {
    console.warn('[CUETAce] Could not build past-year papers', err);
    _papersIndexRenderStarted = false;
    container.innerHTML = '<div class="empty-state" style="margin-top:40px;"><div class="empty-line"></div><div class="empty-title">Could not load past year papers</div><div class="empty-desc">' + esc(err.message || 'Please try again in a moment.') + '</div></div>';
  }
}

function buildPapers() {
  renderIndexedPapers();
  return;
  if (_papersBuilt) return;
  const container = document.getElementById('papers-content');
  if (!container) return;
  _papersBuilt = true;
  YEARS.forEach((year, i) => {
    const group = document.createElement('div');
    group.className = 'year-group';
    if (i === 0) group.style.marginTop = '20px';
    const items = SUBJECTS.map(subj => {
      const testName = 'CUET ' + year + ' — ' + subj;
      return `
        <div class="test-item pyp-item" onclick="handlePYPClick('${testName}','${subj}',${year})">
          <div class="test-icon-box">${ABBR[subj]}</div>
          <div class="test-info">
            <div class="test-name">CUET ${year} — ${subj}</div>
            <div class="test-meta">50 Questions · Attempt mode · With solutions</div>
          </div>
          <div class="test-right">
            <div class="test-status status-new">${year}</div>
            <button class="test-btn btn-gold" onclick="event.stopPropagation();handlePYPClick('${testName}','${subj}',${year})">Attempt</button>
          </div>
        </div>`;
    }).join('');
    group.innerHTML = `<div class="year-badge">${year}</div><div class="test-list">${items}</div>`;
    container.appendChild(group);
  });
}

// ── VIEW SYSTEM ──
function normalizeAppPath(pathname) {
  let path = String(pathname || '/').split('?')[0].split('#')[0];
  if (!path.startsWith('/')) path = '/' + path;
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return ROUTE_ALIASES[path] || path;
}

function setAppPath(path, replace) {
  const cleanPath = normalizeAppPath(path);
  if (window.location.pathname === cleanPath && !window.location.search && !window.location.hash) return;
  const method = replace ? 'replaceState' : 'pushState';
  window.history[method]({ cuetacePath: cleanPath }, '', cleanPath);
}

function routeToPath(pathname, options) {
  const opts = options || {};
  const path = normalizeAppPath(pathname);

  if (path === '/' || path === '/index.html') {
    showView('landing', { routeUpdate: false });
    if (path === '/index.html') setAppPath('/', true);
    return true;
  }

  if (path === '/login') {
    showView('landing', { routeUpdate: false });
    openProfileModal();
    return true;
  }

  const tabId = ROUTE_TO_TAB[path];
  if (tabId) {
    showView('dashboard', { routeUpdate: false, initialTab: tabId });
    if (ROUTE_ALIASES[window.location.pathname]) setAppPath(path, true);
    return true;
  }

  if (!opts.silent) showView('landing', { routeUpdate: false });
  return false;
}

function routeCurrentPath() {
  if ((window.location.pathname === '/' || window.location.pathname === '/index.html') && HASH_TO_ROUTE[window.location.hash]) {
    setAppPath(HASH_TO_ROUTE[window.location.hash], true);
  }
  return routeToPath(window.location.pathname);
}

function showView(name, opts) {
  if (shouldRequireLoginForView(name)) {
    openRequiredLoginModal(name, opts);
    return;
  }
  const routeUpdate = !opts || opts.routeUpdate !== false;

  // Persist view so it survives page reload
  if (name === 'dashboard' || name === 'landing') {
    localStorage.setItem('cuetace_lastview', name);
  }
  if (routeUpdate && name === 'landing') setAppPath('/', false);
  if (routeUpdate && name === 'dashboard') setAppPath('/dashboard', false);

  // Stop exam timer if navigating away from exam
  if (name !== 'examscreen' && examState.timerInterval) {
    clearInterval(examState.timerInterval);
    examState.timerInterval = null;
  }
  if (name !== 'examscreen') {
    closeExamMagnifier();
    closeExamInfoModal();
    closeExamAccessibilityModal();
  }
  // Hide all views
  document.querySelectorAll('.view').forEach(v => {
    v.classList.remove('active');
    v.style.display = 'none';
  });
  // Always hide reviewscreen too (it's outside .view system)
  const rs = document.getElementById('reviewscreen');
  if (rs) rs.style.display = 'none';

  const el = document.getElementById(name);
  if (!el) return;

  // Show the requested view with correct display type
  if (name === 'examscreen') {
    el.style.display = 'flex';
  } else if (name === 'dashboard') {
    el.style.display = 'block';
  } else {
    el.style.display = 'block';
  }
  el.classList.add('active');

  window.scrollTo(0, 0);

  // Dashboard bottom nav
  const bnav = document.getElementById('dashBottomNav');
  if (bnav) bnav.style.display = name === 'dashboard' ? 'block' : 'none';
  if (name !== 'dashboard') closeMobileMore();

  // Dashboard lazy builds
  if (name === 'dashboard') {
    buildChapters();
    buildPapers();
    if (opts && opts.initialTab) {
      setTimeout(() => switchTab(null, opts.initialTab, { routeUpdate: false }), 80);
    }
  }

  // Exam screen setup — always start exam on both desktop and mobile
  if (name === 'examscreen') {
    const testName = (opts && opts.testName) || 'Accountancy — Mock Test';
    const subject  = (opts && opts.subject)   || 'Accountancy';
    const mode     = (opts && opts.mode)       || 'mock';
    const pypUrl   = (opts && opts.pypUrl)     || null;
    const qCount   = (opts && opts.qCount)     || null;
    const pypMeta  = (opts && opts.pypMeta)    || null;
    const providedQuestions = (opts && opts.providedQuestions) || null;
    const forceNew = !!(opts && opts.forceNew);
    applyExamPaletteState();
    startExam(testName, subject, mode, pypUrl, qCount, pypMeta, providedQuestions, forceNew);
  }
}

// ── TAB SYSTEM ──
function switchTab(btn, tabId, options) {
  if (!tabId) return;
  const opts = options || {};
  if (tabId === 'tab-results') setTimeout(renderResultsList, 60);
  localStorage.setItem('cuetace_lasttab', tabId);
  if (opts.routeUpdate !== false && TAB_TO_ROUTE[tabId]) setAppPath(TAB_TO_ROUTE[tabId], false);
  closeMobileMore();

  // Always highlight by matching tabId string — works whether called from btn click or programmatically
  document.querySelectorAll('.inner-nav-btn').forEach(b => {
    b.classList.remove('active');
    if ((b.getAttribute('onclick') || '').includes(tabId)) b.classList.add('active');
  });

  document.querySelectorAll('.dash-tab').forEach(t => {
    t.classList.remove('active');
    t.style.display = 'none';
  });
  const tab = document.getElementById(tabId);
  if (tab) {
    tab.classList.add('active');
    tab.style.display = 'block';
  }
  window.scrollTo(0, 0);
  if (tabId === 'tab-chapters') buildChapters();
  if (tabId === 'tab-papers')   buildPapers();
  if (tabId === 'tab-ca')       { if (typeof CA !== 'undefined') caInit(); }
  if (tabId === 'tab-saved')    {
    if (typeof renderSavedQuestions === 'function') renderSavedQuestions();
    renderQuestionReportsPanel();
  }
  syncBottomNav(tabId);
}

// ── GO TO SUBJECT: switches to Chapter-wise tab and opens that subject's accordion ──
function goToSubject(subjectName) {
  switchTab(null, 'tab-chapters');
  // Retry until chapters are rendered (up to 10 attempts × 60ms = 600ms)
  let attempts = 0;
  function tryOpen() {
    const headers = document.querySelectorAll('.chapter-group-header');
    if (headers.length === 0 && attempts < 10) {
      attempts++;
      setTimeout(tryOpen, 60);
      return;
    }
    headers.forEach(h => {
      const span = h.querySelector('span');
      if (span && span.textContent.trim() === subjectName) {
        const group = h.closest('.chapter-group');
        document.querySelectorAll('.chapter-group').forEach(g => g.classList.remove('open'));
        group.classList.add('open');
        setTimeout(() => group.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
      }
    });
  }
  setTimeout(tryOpen, 80);
}

function setBottomNav(id) {
  document.querySelectorAll('.dash-bottom-nav li').forEach(li => li.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

function handleBottomNavClick(event, tabId) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  closeMobileMore();
  switchTab(null, tabId);
}

function syncBottomNav(tabId) {
  const directTabs = {
    'tab-home': 'bnav-home',
    'tab-mock': 'bnav-mock',
    'tab-results': 'bnav-results'
  };
  setBottomNav(directTabs[tabId] || 'bnav-more');
  document.querySelectorAll('.mobile-more-item').forEach(item => {
    item.classList.toggle('active', item.dataset.tab === tabId);
  });
}

function toggleMobileMore(event) {
  if (event) event.preventDefault();
  const panel = document.getElementById('mobileMorePanel');
  if (!panel) return;
  const willOpen = !panel.classList.contains('open');
  panel.classList.toggle('open', willOpen);
  if (willOpen) setBottomNav('bnav-more');
  else syncBottomNav(localStorage.getItem('cuetace_lasttab') || 'tab-home');
}

function closeMobileMore() {
  const panel = document.getElementById('mobileMorePanel');
  if (panel) panel.classList.remove('open');
}

function syncMobileNavVisibility() {
  if (window.matchMedia('(min-width: 768px)').matches) {
    closeMobileMore();
  }
}

function mobileMoreSelect(tabId) {
  closeMobileMore();
  switchTab(null, tabId);
}

document.addEventListener('click', function(e) {
  const panel = document.getElementById('mobileMorePanel');
  const more = document.getElementById('bnav-more');
  if (!panel || !panel.classList.contains('open')) return;
  if (panel.contains(e.target) || (more && more.contains(e.target))) return;
  closeMobileMore();
  syncBottomNav(localStorage.getItem('cuetace_lasttab') || 'tab-home');
});

// ── CHAPTER ACCORDION ──
window.addEventListener('resize', syncMobileNavVisibility);
window.addEventListener('orientationchange', syncMobileNavVisibility);
document.addEventListener('DOMContentLoaded', syncMobileNavVisibility);

function toggleChapters(header) {
  header.closest('.chapter-group').classList.toggle('open');
}

function escJs(str) {
  return String(str ?? '').replace(/\\/g, '\\\\').replace(/"/g, '&quot;').replace(/'/g, "\\'").replace(/\r?\n/g, ' ');
}

function getQuestionReports() {
  try { return JSON.parse(localStorage.getItem(QUESTION_REPORTS_KEY) || '[]'); }
  catch(e) { return []; }
}

function saveQuestionReports(reports) {
  try { localStorage.setItem(QUESTION_REPORTS_KEY, JSON.stringify(reports.slice(0, 100))); } catch(e) {}
}

function renderQuestionReportsPanel() {
  const panel = document.getElementById('questionReportsPanel');
  if (!panel) return;
  const reports = getQuestionReports();
  if (!reports.length) {
    panel.innerHTML = '';
    return;
  }
  panel.innerHTML = `
    <div style="border-top:1px solid var(--border);padding-top:16px;">
      <div class="dash-section-title" style="font-size:16px;">Reported Issues</div>
      <div class="dash-section-sub">${reports.length} locally saved report${reports.length === 1 ? '' : 's'} from exam, saved, and review screens.</div>
      <div style="margin-top:10px;">
        ${reports.slice(0, 5).map(report => `
          <div style="background:var(--bg-2);border:1px solid var(--border);border-radius:7px;padding:10px 12px;margin-bottom:8px;">
            <div style="font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--gold);">${esc(report.source || 'question')} · ${esc(report.subject || 'Subject')}</div>
            <div style="font-size:12px;color:var(--cream-2);line-height:1.6;margin-top:4px;">${esc(report.reason || '')}</div>
            <div style="font-size:11px;color:var(--cream-muted);margin-top:4px;">${esc(report.testName || '')}${report.questionIndex != null ? ' · Q' + (Number(report.questionIndex) + 1) : ''}</div>
          </div>`).join('')}
      </div>
      <button class="inner-nav-btn" type="button" onclick="clearQuestionReports()" style="font-size:10px;padding:5px 10px;">Clear Reports</button>
    </div>`;
}

function clearQuestionReports() {
  if (!window.confirm('Clear all locally saved question reports?')) return;
  saveQuestionReports([]);
  renderQuestionReportsPanel();
}

function reportQuestionIssue(payload) {
  const reason = window.prompt('What is wrong with this question? Example: wrong answer, typo, incomplete options, bad explanation.');
  if (!reason || !reason.trim()) return;
  const reports = getQuestionReports();
  reports.unshift({
    id: Date.now(),
    date: new Date().toISOString(),
    reason: reason.trim(),
    source: payload?.source || 'exam',
    subject: payload?.subject || examState.subject || '',
    testName: payload?.testName || examState.testName || '',
    questionIndex: payload?.questionIndex ?? examState.currentQ,
    question: payload?.question || EXAM_QUESTIONS[examState.currentQ] || null
  });
  saveQuestionReports(reports);
  renderQuestionReportsPanel();
  showAppToast('Thanks, this question issue was saved locally.', 'success');
}

function reportCurrentQuestionIssue() {
  reportQuestionIssue({
    source: examState.mode || 'exam',
    subject: examState.subject,
    testName: examState.testName,
    questionIndex: examState.currentQ,
    question: EXAM_QUESTIONS[examState.currentQ]
  });
}

function ensureGlobalSearchModal() {
  let modal = document.getElementById('globalSearchModal');
  if (modal) return modal;
  modal = document.createElement('div');
  modal.id = 'globalSearchModal';
  modal.className = 'exam-modal-overlay';
  modal.innerHTML = `
    <div class="exam-modal" style="max-width:720px;width:min(92vw,720px);max-height:82vh;overflow:auto;">
      <button class="exam-info-close" type="button" onclick="closeGlobalSearch()" aria-label="Close search">&times;</button>
      <h3>Search CUETAce</h3>
      <input id="globalSearchInput" type="text" placeholder="Search chapters, papers, saved questions, results..." oninput="renderGlobalSearch(this.value)" style="width:100%;padding:11px 12px;background:var(--bg-3);border:1px solid var(--border);border-radius:7px;color:var(--cream);font-family:var(--font);font-size:13px;outline:none;margin:10px 0 14px;">
      <div id="globalSearchResults"></div>
    </div>`;
  document.body.appendChild(modal);
  return modal;
}

function openGlobalSearch() {
  const modal = ensureGlobalSearchModal();
  modal.classList.add('open');
  setTimeout(() => {
    const input = document.getElementById('globalSearchInput');
    if (input) {
      input.focus();
      renderGlobalSearch(input.value || '');
    }
  }, 40);
}

function closeGlobalSearch() {
  const modal = document.getElementById('globalSearchModal');
  if (modal) modal.classList.remove('open');
}

function renderGlobalSearch(query) {
  const q = String(query || '').trim().toLowerCase();
  const target = document.getElementById('globalSearchResults');
  if (!target) return;
  const rows = [];
  SUBJECTS.forEach(subject => {
    (CHAPTERS[subject] || []).forEach(ch => {
      if (!q || (subject + ' ' + ch).toLowerCase().includes(q)) {
        rows.push({ type: 'Chapter', title: ch, meta: subject, action: "closeGlobalSearch();handleChapterClick('" + escJs(ch) + "','" + escJs(subject) + "')" });
      }
    });
  });
  if (typeof getActiveBookmarks === 'function') {
    getActiveBookmarks().forEach(b => {
      const hay = [b.subject, b.section, b.text, b.explanation].join(' ').toLowerCase();
      if (!q || hay.includes(q)) rows.push({ type: 'Saved', title: b.text || 'Saved question', meta: [b.subject, b.section].filter(Boolean).join(' - '), action: "closeGlobalSearch();focusSavedQuestion('" + escJs(b.key) + "')" });
    });
  }
  if (typeof getStoredResults === 'function') {
    getStoredResults().forEach((r, idx) => {
      const hay = [r.subject, r.testName, r.date].join(' ').toLowerCase();
      if (!q || hay.includes(q)) rows.push({ type: 'Result', title: r.testName || 'Result', meta: (r.subject || '') + ' - ' + (r.correct || 0) + '/' + (r.total || 0), action: "closeGlobalSearch();openResultFromSearch('" + escJs(r.id || '') + "')" });
    });
  }
  if (typeof CA !== 'undefined' && CA.state?.allArticles?.length) {
    CA.state.allArticles.forEach(a => {
      const hay = [a.headline, a.description, a.category].join(' ').toLowerCase();
      if (!q || hay.includes(q)) rows.push({ type: 'Current Affairs', title: a.headline, meta: a.category + ' - ' + a.displayDate, action: "closeGlobalSearch();switchTab(null,'tab-ca')" });
    });
  }
  target.innerHTML = globalSearchHtml(rows.slice(0, 30), q);
  if (q && QUESTION_BANK_INDEX_CACHE) appendPypSearchRows(q, rows);
  else if (q) loadQuestionBankIndex().then(() => appendPypSearchRows(q, rows)).catch(() => {});
}

function appendPypSearchRows(q, existingRows) {
  const rows = existingRows.slice();
  pypEntriesFromIndex(QUESTION_BANK_INDEX_CACHE).forEach(entry => {
    const year = entry.year || '';
    const title = pypDisplayName(entry, year, entry.subject || 'Past Paper');
    const hay = [title, entry.subject, entry.year, entry.paper, entry.sourcePath].join(' ').toLowerCase();
    const searchYear = Number.parseInt(String(year), 10) || new Date().getFullYear();
    if (hay.includes(q)) rows.push({ type: 'Past Paper', title, meta: entry.count ? entry.count + ' questions' : 'Ready paper', action: "closeGlobalSearch();handlePYPClick('" + escJs(title) + "','" + escJs(entry.subject || '') + "'," + searchYear + ")" });
  });
  const target = document.getElementById('globalSearchResults');
  if (target) target.innerHTML = globalSearchHtml(rows.slice(0, 30), q);
}

function globalSearchHtml(rows, q) {
  if (!q) return '<div style="font-size:12px;color:var(--cream-muted);line-height:1.7;">Type to search chapters, past papers, saved questions, results, and current affairs.</div>';
  if (!rows.length) return '<div style="padding:28px 0;text-align:center;color:var(--cream-muted);font-size:13px;">No matches found.</div>';
  return rows.map(row => `
    <button type="button" onclick="${row.action}" style="width:100%;text-align:left;background:var(--bg-2);border:1px solid var(--border);border-radius:7px;padding:10px 12px;margin-bottom:8px;color:var(--cream);font-family:var(--font);cursor:pointer;">
      <div style="font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--gold);">${esc(row.type)}</div>
      <div style="font-size:13px;font-weight:600;line-height:1.5;margin-top:2px;">${esc(row.title).slice(0, 220)}</div>
      <div style="font-size:11px;color:var(--cream-muted);margin-top:3px;">${esc(row.meta || '')}</div>
    </button>`).join('');
}

// ── HAMBURGER ──


// ── HERO OPTION SELECT ──
function selectHeroOpt(el) {
  document.querySelectorAll('.hopt').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
}

// ── HERO TIMER ──
let heroSecs = 45*60+22;
setInterval(() => {
  heroSecs--;
  if (heroSecs < 0) heroSecs = 45*60+22;
  const el = document.getElementById('heroTimer');
  if (el) el.textContent = String(Math.floor(heroSecs/60)).padStart(2,'0') + ':' + String(heroSecs%60).padStart(2,'0');
}, 1000);

// ════════════════════════════════════
// EXAM ENGINE — Full NTA CBT Logic
// ════════════════════════════════════

// Sample questions — will be replaced by real data
// ── ACCOUNTANCY QUESTION BANK (840 questions, 28 chapters × 30) ──

// ── HTML escape helper — prevents broken rendering of < > & in question content ──
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
// Build question list from fetched GitHub JSON bank (chapter-wise only)
// ── SHUFFLE HELPER ──
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ════════════════════════════════════
// ADAPTIVE MOCK ENGINE
// Tracks chapter accuracy per subject.
// Mock tests: 20% L1, 30% L2, 50% L3
// Weak chapters get more questions.
// ════════════════════════════════════
const PERF_KEY = 'cuetace_perf'; // { subject: { chapterName: {correct,total} } }

function getPerformanceProfile() {
  try {
    const raw = localStorage.getItem(PERF_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch(e) { return {}; }
}

function updatePerformanceProfile(subject, chapterBreakdown) {
  // Only update for mock tests — not chapter-wise
  const profile = getPerformanceProfile();
  if (!profile[subject]) profile[subject] = {};
  chapterBreakdown.forEach(ch => {
    if (!profile[subject][ch.name]) profile[subject][ch.name] = { correct: 0, total: 0 };
    profile[subject][ch.name].correct += ch.correct;
    profile[subject][ch.name].total   += ch.total;
  });
  try { localStorage.setItem(PERF_KEY, JSON.stringify(profile)); } catch(e) {}
}

// Get chapter weights for adaptive selection
// Weak chapters (<50% accuracy) get 2× weight
// Never-attempted chapters get 1.5× (unknown = treat as moderate-weak)
function getChapterWeights(subject, chapterNames) {
  const profile = getPerformanceProfile();
  const subjProfile = profile[subject] || {};
  return chapterNames.map(name => {
    const data = subjProfile[name];
    if (!data || data.total === 0) return { name, weight: 1.5 }; // never attempted
    const acc = data.correct / data.total;
    if (acc < 0.4)      return { name, weight: 3.0 }; // very weak
    if (acc < 0.6)      return { name, weight: 2.0 }; // weak
    if (acc < 0.75)     return { name, weight: 1.0 }; // average
    return               { name, weight: 0.6 };        // strong — fewer questions
  });
}

// Weighted random chapter selection
// Ensures weak chapters appear more while still mixing strong ones
function selectChaptersWeighted(weights, totalSlots) {
  // Normalise weights and distribute slots proportionally
  const totalWeight = weights.reduce((s, c) => s + c.weight, 0);
  const slots = weights.map(c => ({
    name: c.name,
    slots: Math.max(1, Math.round((c.weight / totalWeight) * totalSlots))
  }));
  // Trim or pad to exactly totalSlots
  let assigned = slots.reduce((s, c) => s + c.slots, 0);
  // Sort by weight desc — adjust largest first
  slots.sort((a, b) => b.slots - a.slots);
  let i = 0;
  while (assigned > totalSlots) { slots[i % slots.length].slots = Math.max(1, slots[i % slots.length].slots - 1); assigned--; i++; }
  while (assigned < totalSlots) { slots[i % slots.length].slots++; assigned++; i++; }
  return slots;
}

function buildQuestionsFromBank(bank, testName, mode, limit) {
  const chapterLimit = limit !== null && limit !== undefined
    ? limit
    : (mode === 'chapter' ? 200 : mode === 'mock' ? 50 : 999);

  // ── CHAPTER MODE — unchanged logic ──
  if (mode === 'chapter') {
    // Flexible match: exact chapter field OR chapter_id OR testName starts with chapter_id
    const matched = bank.chapters.find(ch => {
      if ((ch.chapter || ch.chapter_name || ch.section) === testName) return true;
      if (ch.chapter_id && testName.startsWith(ch.chapter_id)) return true;
      if (ch.section_code && testName.startsWith(ch.section_code)) return true;
      if (ch.chapter && testName.includes(ch.chapter)) return true;
      return false;
    });
    const all = [];
    bank.chapters.forEach(ch => {
      const chName = ch.chapter || ch.chapter_name || ch.section || 'General';
      if (!ch.questions || !Array.isArray(ch.questions)) return;
      ch.questions.forEach(q => all.push({
        section: chName, text: q.question || q.text, passage: q.passage || '', sentence: q.sentence || '', statements: q.statements || null, column_i: q.column_i || null, column_ii: q.column_ii || null,
        options: q.options, correct: q.correct, explanation: q.explanation || '',
        type: q.type || 'MCQ', level: q.level || 'L1'
      }));
    });
    if (matched) {
      const matchedName = matched.chapter || matched.chapter_name || matched.section;
      const chQs = shuffleArray(matched.questions.map(q => ({
        section: matchedName, text: q.question || q.text, passage: q.passage || '', sentence: q.sentence || '', statements: q.statements || null, column_i: q.column_i || null, column_ii: q.column_ii || null,
        options: q.options, correct: q.correct, explanation: q.explanation || '',
        type: q.type || 'MCQ', level: q.level || 'L1'
      })));
      if (chQs.length >= chapterLimit) return chQs.slice(0, chapterLimit);
      const extras = shuffleArray(all.filter(q => q.section !== matchedName))
                       .slice(0, chapterLimit - chQs.length);
      return shuffleArray([...chQs, ...extras]);
    }
    return shuffleArray(all).slice(0, chapterLimit);
  }

  // ── MOCK / PYP MODE — adaptive difficulty + chapter weighting ──

  // Build per-chapter, per-level question pools
  const chapterPools = {}; // { chapterName: { L1: [], L2: [], L3: [] } }
  bank.chapters.forEach(ch => {
    const chName = ch.chapter || ch.chapter_name || ch.section || 'General';
    chapterPools[chName] = { L1: [], L2: [], L3: [] };
    if (!ch.questions || !Array.isArray(ch.questions)) return;
    ch.questions.forEach(q => {
      const lvl = (q.level || 'L1').toUpperCase();
      const obj = {
        section: chName, text: q.question || q.text, passage: q.passage || '', sentence: q.sentence || '', statements: q.statements || null, column_i: q.column_i || null, column_ii: q.column_ii || null,
        options: q.options, correct: q.correct, explanation: q.explanation || '',
        type: q.type || 'MCQ', level: lvl
      };
      if (chapterPools[chName][lvl]) chapterPools[chName][lvl].push(obj);
      else chapterPools[chName]['L1'].push(obj); // fallback
    });
  });

  const chapterNames = Object.keys(chapterPools);
  const total = chapterLimit;

  // Difficulty distribution: 20% L1, 30% L2, 50% L3
  const nL1 = Math.round(total * 0.20);
  const nL2 = Math.round(total * 0.30);
  const nL3 = total - nL1 - nL2;

  // Get adaptive chapter weights based on past performance
  const weights = getChapterWeights(examState.subject, chapterNames);

  // Distribute slots per chapter (using weights)
  const chSlots = selectChaptersWeighted(weights, total);

  // For each chapter, pick questions proportionally across L1/L2/L3
  const picked = [];
  const usedIds = new Set();

  chSlots.forEach(({ name, slots }) => {
    const pool = chapterPools[name];
    if (!pool) return;
    // Distribute this chapter's slots across difficulty levels proportionally
    const cL1 = Math.round(slots * 0.20);
    const cL2 = Math.round(slots * 0.30);
    const cL3 = slots - cL1 - cL2;

    const pickFrom = (arr, n) => {
      const available = shuffleArray(arr.filter(q => !usedIds.has(q.text)));
      return available.slice(0, n);
    };

    let fromL1 = pickFrom(pool.L1, cL1);
    let fromL2 = pickFrom(pool.L2, cL2);
    let fromL3 = pickFrom(pool.L3, cL3);

    // If a level has fewer questions than needed, fill from other levels
    const allPool = shuffleArray([...pool.L1, ...pool.L2, ...pool.L3].filter(q => !usedIds.has(q.text)));
    const got = fromL1.length + fromL2.length + fromL3.length;
    let extras = [];
    if (got < slots) {
      extras = allPool.filter(q =>
        !fromL1.includes(q) && !fromL2.includes(q) && !fromL3.includes(q)
      ).slice(0, slots - got);
    }

    [...fromL1, ...fromL2, ...fromL3, ...extras].forEach(q => {
      usedIds.add(q.text);
      picked.push(q);
    });
  });

  // If we have fewer than needed (small bank), fill from anything remaining
  if (picked.length < total) {
    const allQ = [];
    bank.chapters.forEach(ch => {
      const chName = ch.chapter || ch.chapter_name || ch.section || 'General';
      if (!ch.questions || !Array.isArray(ch.questions)) return;
      ch.questions.forEach(q => {
        const qText = q.question || q.text;
        if (!usedIds.has(qText)) allQ.push({
          section: chName, text: qText, passage: q.passage || '', sentence: q.sentence || '', statements: q.statements || null, column_i: q.column_i || null, column_ii: q.column_ii || null,
          options: q.options, correct: q.correct, explanation: q.explanation || '',
          type: q.type || 'MCQ', level: (q.level || 'L1').toUpperCase()
        });
      });
    });
    shuffleArray(allQ).slice(0, total - picked.length).forEach(q => picked.push(q));
  }

  return shuffleArray(picked).slice(0, total);
}

// EXAM_QUESTIONS — populated by startExam()
let EXAM_QUESTIONS = [];

// Exam state
let examState = {
  currentQ: 0,
  totalQ: 0,
  answers: [],
  status: [],
  timerSecs: 60 * 60,
  timerInterval: null,
  testName: 'Mock Test',
  subject: 'Accountancy',
  mode: 'mock',
  pypMeta: null,
  resumeId: '',
  apiAttempt: null,
  questionTimes: [],
  questionStartTime: Date.now()
};

function saveActiveExamAttempt() {
  if (!examState.totalQ) return;
  try {
    localStorage.setItem(ACTIVE_EXAM_KEY, JSON.stringify({
      savedAt: Date.now(),
      resumeId: examState.resumeId,
      questions: examState.apiAttempt ? [] : EXAM_QUESTIONS,
      state: {
        currentQ: examState.currentQ,
        totalQ: examState.totalQ,
        answers: examState.answers,
        status: examState.status,
        timerSecs: examState.timerSecs,
        testName: examState.testName,
        subject: examState.subject,
        mode: examState.mode,
        pypMeta: examState.pypMeta || null,
        apiAttempt: examState.apiAttempt || null,
        questionTimes: examState.questionTimes
      }
    }));
  } catch(e) {
    console.warn('[CUETAce] Could not save active attempt', e);
  }
}

function loadActiveExamAttempt(resumeId) {
  try {
    const raw = localStorage.getItem(ACTIVE_EXAM_KEY);
    if (!raw) return null;
    const attempt = JSON.parse(raw);
    if (!attempt || attempt.resumeId !== resumeId) return null;
    if (!attempt.state) return null;
    if (!attempt.state.apiAttempt && !Array.isArray(attempt.questions)) return null;
    if (Date.now() - Number(attempt.savedAt || 0) > 12 * 60 * 60 * 1000) return null;
    return attempt;
  } catch(e) {
    return null;
  }
}

function clearActiveExamAttempt() {
  try { localStorage.removeItem(ACTIVE_EXAM_KEY); } catch(e) {}
}

function updateExamHeaderLabels() {
  const tl = document.getElementById('examTestLabel');
  if (tl) tl.textContent = examState.testName;
  const ps = document.getElementById('paletteSubject');
  if (ps) ps.textContent = examState.subject;
  const timerEl = document.getElementById('examTimer');
  if (timerEl) {
    const m = String(Math.floor(examState.timerSecs / 60)).padStart(2,'0');
    const s = String(examState.timerSecs % 60).padStart(2,'0');
    timerEl.textContent = m + ':' + s;
  }
}

function hydrateExamFromAttempt(attempt) {
  EXAM_QUESTIONS = attempt.state.apiAttempt
    ? new Array(Number(attempt.state.totalQ || 0)).fill(null)
    : attempt.questions;
  Object.assign(examState, {
    currentQ: Number(attempt.state.currentQ || 0),
    totalQ: Number(attempt.state.totalQ || attempt.questions.length),
    answers: Array.isArray(attempt.state.answers) ? attempt.state.answers : [],
    status: Array.isArray(attempt.state.status) ? attempt.state.status : [],
    timerSecs: Number(attempt.state.timerSecs || 60 * 60),
    testName: attempt.state.testName || 'Mock Test',
    subject: attempt.state.subject || 'Accountancy',
    mode: attempt.state.mode || 'mock',
    pypMeta: attempt.state.pypMeta || null,
    apiAttempt: attempt.state.apiAttempt || null,
    resumeId: attempt.resumeId || '',
    questionTimes: Array.isArray(attempt.state.questionTimes) ? attempt.state.questionTimes : [],
    questionStartTime: Date.now()
  });
  buildExamPalette();
  if (examState.timerInterval) clearInterval(examState.timerInterval);
  examState.timerInterval = setInterval(tickTimer, 1000);
  updateExamHeaderLabels();
  loadQuestion(Math.min(examState.currentQ, examState.totalQ - 1));
  showAppToast('Resumed your in-progress attempt.', 'success');
}

function startExamFromQuestionSet(testName, subject, questions, mode) {
  showView('examscreen', {
    testName,
    subject,
    mode: mode || 'practice-set',
    providedQuestions: questions,
    forceNew: true
  });
}

// ── START EXAM (async — fetches JSON from GitHub) ──
async function startExam(testName, subject, mode, pypUrl, qCount, pypMeta, providedQuestions, forceNew) {
  examState.currentQ  = 0;
  examState.answers   = [];
  examState.status    = [];
  examState.timerSecs = 60 * 60;
  examState.questionTimes     = [];
  examState.questionStartTime = Date.now();
  examState.testName  = testName || 'Mock Test';
  examState.subject   = subject  || 'Accountancy';
  examState.mode      = mode || 'mock';
  examState.pypMeta   = pypMeta || null;
  examState.apiAttempt = null;
  examState.resumeId  = buildExamResumeId(examState.testName, examState.subject, examState.mode, pypUrl);
  // Live exams should only record the selected answer. Feedback appears after submit.
  examState.showExplanations = false;

  const savedAttempt = !forceNew ? loadActiveExamAttempt(examState.resumeId) : null;
  if (savedAttempt && window.confirm('Resume your in-progress attempt for this test?')) {
    hydrateExamFromAttempt(savedAttempt);
    return;
  }
  if (savedAttempt) clearActiveExamAttempt();

  // ── 1. Update header labels immediately (no flicker) ──
  const tl = document.getElementById('examTestLabel');
  if (tl) tl.textContent = examState.testName;
  const ps = document.getElementById('paletteSubject');
  if (ps) ps.textContent = examState.subject;

  // ── 2. Show skeleton ──
  const qt = document.getElementById('examQText');
  const optsEl = document.getElementById('examOpts');
  const expEl  = document.getElementById('examExplanation');
  if (qt) qt.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:14px;pointer-events:none;">
      <div style="height:14px;width:65%;background:var(--bg-4);border-radius:4px;animation:skelPulse 1.4s ease infinite;"></div>
      <div style="height:14px;width:90%;background:var(--bg-4);border-radius:4px;animation:skelPulse 1.4s 0.1s ease infinite;"></div>
      <div style="height:14px;width:75%;background:var(--bg-4);border-radius:4px;animation:skelPulse 1.4s 0.2s ease infinite;"></div>
    </div>`;
  if (optsEl) optsEl.innerHTML = [0,1,2,3].map(i => `
    <div style="height:52px;border:1px solid var(--border);border-radius:7px;background:var(--bg-3);
      animation:skelPulse 1.4s ${i*0.1}s ease infinite;margin-bottom:2px;"></div>`).join('');
  if (expEl) expEl.style.display = 'none';

  if (!document.getElementById('skelStyle')) {
    const s = document.createElement('style');
    s.id = 'skelStyle';
    s.textContent = `@keyframes skelPulse{0%,100%{opacity:.45}50%{opacity:.15}}`;
    document.head.appendChild(s);
  }

  const timerEl = document.getElementById('examTimer');
  if (timerEl) timerEl.textContent = '60:00';

  // ── 3. Fetch JSON ──
  try {
    let bank;
    let loadedFromApi = false;

    if (!Array.isArray(providedQuestions) || !providedQuestions.length) {
      try {
        loadedFromApi = await tryStartExamFromQuestionApi(examState.testName, subject, mode, pypUrl, qCount, pypMeta);
      } catch (apiErr) {
        console.warn('[CUETAce] Secure question API unavailable', apiErr);
      }
    }

    // PYP mode — single file per year/subject (unchanged)
    if (loadedFromApi) {
      bank = null;

    } else if (Array.isArray(providedQuestions) && providedQuestions.length) {
      bank = {
        chapters: [{
          chapter_id: mode || 'Practice',
          chapter: testName || 'Practice Set',
          questions: providedQuestions
        }]
      };

    } else if (false && mode === 'pyp' && pypUrl) {
      const res = await fetch(pypUrl + '?v=' + Date.now());
      if (!res.ok) throw new Error('HTTP ' + res.status + ' — Past Year Paper not found at: ' + pypUrl);
      bank = await res.json();
      if (bank && Array.isArray(bank.questions) && !Array.isArray(bank.chapters)) {
        bank = {
          ...bank,
          chapters: [{
            chapter_id: bank.chapter_id || 'PYP',
            chapter: bank.chapter || bank.subject || 'Past Year Paper',
            questions: bank.questions
          }]
        };
      }
      if (!bank || !bank.chapters || bank.chapters.length === 0) {
        throw new Error('PYP JSON loaded but has no chapters.');
      }

    } else if (false && mode === 'chapter') {
      // ── CHAPTER MODE: fetch only the single chapter file needed ──
      const slugs = CHAPTER_SLUGS[subject] || [];
      // Find which slug matches the testName (chapter string)
      // Chapter files have "chapter" field matching CHAPTERS array entry
      // We match by slug prefix e.g. testName starts with "AC01"
      const matchedSlug = slugs.find(slug => testName.startsWith(slug));
      if (!matchedSlug) throw new Error('No chapter file found for: ' + testName);

      const cacheKey = subject + '/' + matchedSlug;
      let chapterData;
      if (CHAPTER_CACHE[cacheKey]) {
        chapterData = CHAPTER_CACHE[cacheKey];
      } else {
        const url = getChapterUrl(subject, matchedSlug);
        const res = await fetch(url + '?v=' + Date.now());
        if (!res.ok) throw new Error('HTTP ' + res.status + ' loading ' + matchedSlug + '.json');
        chapterData = await res.json();
        CHAPTER_CACHE[cacheKey] = chapterData;
      }
      // Wrap into bank structure that buildQuestionsFromBank expects
      bank = { chapters: [chapterData] };

    } else {
      // ── MOCK MODE: fetch all chapter files for this subject in parallel ──
      throw new Error('Secure question API is unavailable. Please try again in a moment.');
      if (MOCK_BANK_CACHE[subject]) {
        bank = MOCK_BANK_CACHE[subject];
      } else {
        const slugs = CHAPTER_SLUGS[subject] || [];
        if (slugs.length === 0) throw new Error('No chapters configured for: ' + subject);

        // Show loading progress
        if (qt) qt.innerHTML = `<div style="padding:20px 0;color:var(--cream-3);font-size:13px;">Loading question bank… (0 / ${slugs.length})</div>`;

        let loaded = 0;
        const chapterDatas = await Promise.all(slugs.map(async slug => {
          const cacheKey = subject + '/' + slug;
          if (CHAPTER_CACHE[cacheKey]) {
            loaded++;
            return CHAPTER_CACHE[cacheKey];
          }
          const url = getChapterUrl(subject, slug);
          const res = await fetch(url + '?v=' + Date.now());
          if (!res.ok) {
            console.warn('[CUETAce] Could not load ' + slug + '.json — skipping');
            return null;
          }
          const data = await res.json();
          CHAPTER_CACHE[cacheKey] = data;
          loaded++;
          if (qt) qt.innerHTML = `<div style="padding:20px 0;color:var(--cream-3);font-size:13px;">Loading question bank… (${loaded} / ${slugs.length})</div>`;
          return data;
        }));

        const validChapters = chapterDatas.filter(Boolean);
        if (validChapters.length === 0) throw new Error('No chapter files loaded for ' + subject);
        bank = { chapters: validChapters };
        MOCK_BANK_CACHE[subject] = bank;
      }
    }

    // Build questions with qCount limit
    // mock = fixed 50 | chapter = all available up to 200 | pyp = all questions in the file
    if (!loadedFromApi) {
    const limit = mode === 'mock' ? 50 : mode === 'chapter' ? (qCount || 200) : null;
    EXAM_QUESTIONS = buildQuestionsFromBank(bank, examState.testName, mode, limit);
    console.log('[CUETAce] Loaded', EXAM_QUESTIONS.length, 'questions |', subject, '| mode:', mode);
    examState.totalQ = EXAM_QUESTIONS.length;
    }

    if (!examState.totalQ || EXAM_QUESTIONS.length === 0) {
      throw new Error('No questions found for "' + examState.testName + '" — chapter name may not match.');
    }
  } catch (err) {
    if (qt) qt.innerHTML = `
      <div style="padding:20px 0;">
        <div style="font-weight:600;margin-bottom:8px;color:var(--error);">Could not load questions</div>
        <div style="font-size:13px;color:var(--cream-3);line-height:1.8;">${err.message}</div>
      </div>`;
    if (optsEl) optsEl.innerHTML = '';
    console.error('[CUETAce]', err);
    return;
  }

  // ── 4. Ready — start exam ──
  examState.answers = new Array(examState.totalQ).fill(null);
  examState.status  = new Array(examState.totalQ).fill('not-visited');
  examState.questionTimes = new Array(examState.totalQ).fill(0);

  const fill = document.getElementById('examProgressFill');
  if (fill) fill.style.width = '2%';

  buildExamPalette();

  if (examState.timerInterval) clearInterval(examState.timerInterval);
  examState.timerInterval = setInterval(tickTimer, 1000);

  loadQuestion(0);
  saveActiveExamAttempt();
}


// ── TIMER ──
function tickTimer() {
  examState.timerSecs--;
  if (examState.timerSecs <= 0) {
    clearInterval(examState.timerInterval);
    submitTest();
    return;
  }
  const m = String(Math.floor(examState.timerSecs / 60)).padStart(2,'0');
  const s = String(examState.timerSecs % 60).padStart(2,'0');
  const el = document.getElementById('examTimer');
  const wrap = document.getElementById('examTimerWrap');
  if (el) el.textContent = m + ':' + s;
  if (wrap) {
    wrap.className = 'exam-timer-wrap' +
      (examState.timerSecs < 180 ? ' critical' : examState.timerSecs < 600 ? ' warning' : '');
  }
  if (examState.timerSecs % 15 === 0) saveActiveExamAttempt();
}

// ── LOAD QUESTION ──
function buildQuestionContextHtml(q) {
  if (!q) return '';

  if (q.passage) {
    return esc(q.passage);
  }

  if (q.statements) {
    let html = '<div class="exam-context-title">Statements</div>';
    html += '<div class="exam-context-block">';
    Object.entries(q.statements).forEach(([key, val]) => {
      html += '<div><strong>' + esc(key) + '.</strong> ' + esc(val) + '</div>';
    });
    html += '</div>';
    return html;
  }

  if (q.column_i && q.column_ii) {
    let html = '<div class="exam-context-title">Match the Following</div>';
    html += '<div class="exam-context-columns">';
    html += '<div><div class="exam-context-subtitle">Column I</div>';
    Object.entries(q.column_i).forEach(([key, val]) => {
      html += '<div><strong>' + esc(key) + '.</strong> ' + esc(val) + '</div>';
    });
    html += '</div><div><div class="exam-context-subtitle">Column II</div>';
    Object.entries(q.column_ii).forEach(([key, val]) => {
      html += '<div><strong>' + esc(key) + '.</strong> ' + esc(val) + '</div>';
    });
    html += '</div></div>';
    return html;
  }

  if (q.sentence) {
    return '<div class="exam-context-title">Sentence</div><div class="exam-context-block">' + esc(q.sentence) + '</div>';
  }

  return '';
}

function updateQuestionSplitLayout(q) {
  const main = document.querySelector('#examscreen .exam-main');
  const passageEl = document.getElementById('examPassage');
  if (!main || !passageEl) return;

  const contextHtml = buildQuestionContextHtml(q);
  const useSplit = Boolean(contextHtml);
  main.classList.toggle('split-question', useSplit);

  if (useSplit) {
    passageEl.innerHTML = contextHtml;
    passageEl.classList.add('visible');
    passageEl.scrollTop = 0;
  } else {
    passageEl.innerHTML = '';
    passageEl.classList.remove('visible');
  }
}

async function loadQuestion(index) {
  // Record time spent on previous question
  const now = Date.now();
  const prev = examState.currentQ;
  if (prev !== index && examState.questionStartTime) {
    const secs = Math.round((now - examState.questionStartTime) / 1000);
    examState.questionTimes[prev] = (examState.questionTimes[prev] || 0) + secs;
  }
  examState.questionStartTime = now;
  examState.currentQ = index;
  let q = EXAM_QUESTIONS[index];
  if (!q && examState.apiAttempt) {
    const qt = document.getElementById('examQText');
    const optsEl = document.getElementById('examOpts');
    if (qt) qt.textContent = 'Loading question...';
    if (optsEl) optsEl.innerHTML = '';
    try {
      q = await ensureQuestionLoaded(index);
    } catch (err) {
      console.warn('[CUETAce] Could not load question window', err);
    }
  }

  // Guard — should never happen but prevents silent crash
  if (!q) {
    console.error('[CUETAce] loadQuestion: no question at index', index, '— total:', EXAM_QUESTIONS.length);
    return;
  }
  if (examState.status[index] === 'not-visited') {
    examState.status[index] = 'not-answered';
  }

  // Update header
  const qnum = document.getElementById('examQNum');
  if (qnum) qnum.textContent = 'Question ' + (index+1) + ' of ' + examState.totalQ;

  // Update section label (question panel label + topbar center label)
  const sec = document.getElementById('examQSection');
  if (sec) sec.textContent = q.section;
  const topSec = document.getElementById('examSectionLabel');
  if (topSec) topSec.textContent = 'Section: ' + q.section;

  // Show passage box — stays visible for all questions sharing same passage
  updateQuestionSplitLayout(q);

  // Build question body HTML
  const qt = document.getElementById('examQText');
  if (qt) {
    let html = '';

    // EN-S2 Para Jumble — show statements A B C D
    if (false && q.statements) {
      html += '<div style="margin-bottom:10px;">' + esc(q.text) + '</div>';
      html += '<div style="background:var(--bg-3);border:1px solid var(--border);border-radius:8px;padding:12px 14px;margin-bottom:4px;font-size:13px;line-height:1.8;">';
      Object.entries(q.statements).forEach(([key, val]) => {
        html += '<div><strong style="color:var(--gold);">' + esc(key) + '.</strong> ' + esc(val) + '</div>';
      });
      html += '</div>';
      qt.innerHTML = html;

    // EN-S3 Match the Following — show Column I and Column II side by side
    } else if (false && q.column_i && q.column_ii) {
      html += '<div style="margin-bottom:10px;">' + esc(q.text) + '</div>';
      html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;background:var(--bg-3);border:1px solid var(--border);border-radius:8px;padding:12px 14px;">';
      html += '<div><div style="font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--gold);margin-bottom:8px;">Column I</div>';
      Object.entries(q.column_i).forEach(([key, val]) => {
        html += '<div style="font-size:12px;margin-bottom:5px;"><strong style="color:var(--cream-2);">' + esc(key) + '.</strong> ' + esc(val) + '</div>';
      });
      html += '</div>';
      html += '<div><div style="font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--gold);margin-bottom:8px;">Column II</div>';
      Object.entries(q.column_ii).forEach(([key, val]) => {
        html += '<div style="font-size:12px;margin-bottom:5px;"><strong style="color:var(--cream-2);">' + esc(key) + '.</strong> ' + esc(val) + '</div>';
      });
      html += '</div></div>';
      qt.innerHTML = html;

    // EN-S4 / EN-S5 — show sentence above question
    } else if (false && q.sentence) {
      html += '<div style="background:var(--bg-3);border-left:3px solid var(--gold);border-radius:0 8px 8px 0;padding:10px 14px;margin-bottom:10px;font-size:13px;color:var(--cream-2);line-height:1.6;font-style:italic;">' + esc(q.sentence) + '</div>';
      html += '<div>' + esc(q.text) + '</div>';
      qt.innerHTML = html;

    // Default — plain question text
    } else {
      qt.textContent = q.text;
    }
  }

  // Render options
  const optsEl = document.getElementById('examOpts');
  if (optsEl) {
    optsEl.innerHTML = '';
    const labels = ['A','B','C','D'];
    const alreadyAnswered = examState.answers[index] !== null;
    q.options.forEach((opt, i) => {
      const div = document.createElement('div');
      div.className = 'exam-opt';
      if (examState.answers[index] === i) {
        const st = examState.status[index];
        div.classList.add(st === 'ans-marked' ? 'answered-marked' : 'selected');
      }
      if (alreadyAnswered) {
        div.style.pointerEvents = 'none';
      }
      div.innerHTML = '<span class="opt-bubble">' + labels[i] + '</span>' + esc(opt);
      div.addEventListener('click', () => selectOption(i));
      optsEl.appendChild(div);
    });
  }

  // Keep feedback hidden during the live attempt.
  const expEl = document.getElementById('examExplanation');
  if (expEl) {
    expEl.style.display = 'none';
    expEl.innerHTML = '';
  }

  // Refresh palette highlight
  refreshPalette();
  saveActiveExamAttempt();
}

// ── SELECT OPTION ──
function selectOption(optIndex) {
  examState.answers[examState.currentQ] = optIndex;
  // Status: if marked, keep as ans-marked; else set answered
  if (examState.status[examState.currentQ] === 'marked') {
    examState.status[examState.currentQ] = 'ans-marked';
  } else {
    examState.status[examState.currentQ] = 'answered';
  }
  // Keep feedback hidden during the live attempt.
  const expEl = document.getElementById('examExplanation');
  if (expEl) {
    expEl.style.display = 'none';
    expEl.innerHTML = '';
  }
  // Re-render options
  const optsEl = document.getElementById('examOpts');
  if (optsEl) {
    optsEl.querySelectorAll('.exam-opt').forEach((el, i) => {
      el.classList.remove('selected','answered-marked','opt-correct','opt-wrong');
      el.style.pointerEvents = '';
      if (i === optIndex) {
        el.classList.add(examState.status[examState.currentQ] === 'ans-marked' ? 'answered-marked' : 'selected');
      }
      el.style.pointerEvents = 'none';
    });
  }
  refreshPalette();
  setTimeout(updateBookmarkBtn, 10);
  saveActiveExamAttempt();
}

// ── SAVE AND NEXT ──
function examSaveNext() {
  // Save current answer (already saved on click — this just navigates)
  // If no answer selected, keep as not-answered
  goToNext();
}

// ── MARK FOR REVIEW AND NEXT ──
function examMarkReview() {
  const cur = examState.currentQ;
  if (examState.answers[cur] !== null) {
    examState.status[cur] = 'ans-marked';
  } else {
    examState.status[cur] = 'marked';
  }
  refreshPalette();
  saveActiveExamAttempt();
  goToNext();
}

// ── CLEAR RESPONSE ──
function examClear() {
  const cur = examState.currentQ;
  examState.answers[cur] = null;
  if (examState.status[cur] === 'ans-marked') examState.status[cur] = 'marked';
  else examState.status[cur] = 'not-answered';
  // Hide explanation
  const expEl = document.getElementById('examExplanation');
  if (expEl) expEl.style.display = 'none';
  loadQuestion(cur); // re-render options
  saveActiveExamAttempt();
}

// ── NAVIGATE ──
function examNav(direction) {
  const next = examState.currentQ + direction;
  if (next >= 0 && next < examState.totalQ) loadQuestion(next);
}

function goToNext() {
  const next = examState.currentQ + 1;
  if (next < examState.totalQ) {
    loadQuestion(next);
  } else {
    // On last question — prompt submit
    openSubmitModal();
  }
}

// ── BUILD PALETTE ──
function buildExamPalette() {
  // Desktop grid
  const grid = document.getElementById('paletteGrid');
  if (grid) {
    grid.innerHTML = '';
    for (let i = 0; i < examState.totalQ; i++) {
      const div = document.createElement('div');
      div.className = 'pq not-visited';
      div.id = 'pq-' + i;
      div.textContent = i + 1;
      div.addEventListener('click', () => loadQuestion(i));
      grid.appendChild(div);
    }
  }
  // Reset mobile sheet grid so it rebuilds fresh
  const sheetGrid = document.getElementById('sheetGrid');
  if (sheetGrid) sheetGrid.innerHTML = '';
}

// ── REFRESH PALETTE ──
function refreshPalette() {
  const cur = examState.currentQ;
  const total = examState.totalQ;

  // Desktop palette
  for (let i = 0; i < total; i++) {
    const el = document.getElementById('pq-' + i);
    if (!el) continue;
    el.className = 'pq ' + (examState.status[i] || 'not-visited');
    if (i === cur) el.classList.add('current');
  }

  // Mobile sheet grid (same IDs prefixed with 's-')
  for (let i = 0; i < total; i++) {
    const el = document.getElementById('s-pq-' + i);
    if (!el) continue;
    el.className = 'pq ' + (examState.status[i] || 'not-visited');
    if (i === cur) el.classList.add('current');
  }

  // Mobile progress bar
  const fill = document.getElementById('examProgressFill');
  if (fill) fill.style.width = ((cur + 1) / total * 100) + '%';

  // Mobile swipe nav
  const prevBtn = document.getElementById('swipePrev');
  const nextBtn = document.getElementById('swipeNext');
  const centerLbl = document.getElementById('swipeCenterLabel');
  if (prevBtn) prevBtn.disabled = cur === 0;
  if (nextBtn) nextBtn.disabled = cur === total - 1;
  if (centerLbl) centerLbl.textContent = (cur + 1) + ' / ' + total;

  // Mobile palette trigger label
  const trigger = document.getElementById('paletteTriggerLabel');
  if (trigger) trigger.textContent = 'Q ' + (cur + 1);

  // Update trigger dot colour to match current question status
  const dot = document.getElementById('paletteStatusDot');
  if (dot) {
    const st = examState.status[cur];
    const colors = { 'answered': '#4a9268', 'ans-marked': '#7c5cbf', 'marked': '#7c5cbf', 'not-answered': '#c0544a', 'not-visited': '#3d3128' };
    dot.style.background = colors[st] || '#3d3128';
  }
}

// ── MOBILE PALETTE SHEET ──
function togglePaletteSheet() {
  const sheet = document.getElementById('examPaletteSheet');
  const overlay = document.getElementById('paletteOverlay');
  if (!sheet) return;
  const isOpen = sheet.classList.toggle('open');
  if (overlay) overlay.classList.toggle('open', isOpen);

  // Build sheet grid if empty
  const sheetGrid = document.getElementById('sheetGrid');
  if (sheetGrid && sheetGrid.children.length === 0) {
    for (let i = 0; i < examState.totalQ; i++) {
      const d = document.createElement('div');
      d.className = 'pq ' + (examState.status[i] || 'not-visited');
      d.id = 's-pq-' + i;
      d.textContent = i + 1;
      d.addEventListener('click', () => {
        loadQuestion(i);
        togglePaletteSheet();
      });
      sheetGrid.appendChild(d);
    }
  }
  refreshPalette();
}

// ── SUBMIT MODAL ──
function applyExamPaletteState() {
  const main = document.querySelector('#examscreen .exam-main');
  const btn = document.getElementById('examPaletteCollapseBtn');
  if (!main) return;
  let collapsed = false;
  try { collapsed = localStorage.getItem('cuetace_exam_palette_collapsed') === '1'; } catch(e) {}
  main.classList.toggle('palette-collapsed', collapsed);
  if (btn) {
    btn.setAttribute('aria-label', collapsed ? 'Open question palette' : 'Collapse question palette');
    btn.title = collapsed ? 'Open question palette' : 'Collapse question palette';
  }
}

function toggleExamPalette() {
  const main = document.querySelector('#examscreen .exam-main');
  if (!main) return;
  const collapsed = !main.classList.contains('palette-collapsed');
  try { localStorage.setItem('cuetace_exam_palette_collapsed', collapsed ? '1' : '0'); } catch(e) {}
  applyExamPaletteState();
}

let examMagnifierState = {
  active: false,
  el: null,
  body: null,
  source: null,
  scale: 1.85,
  pointerId: null,
  drag: null
};

function handleExamTool(tool) {
  if (tool === 'accessibility') {
    openExamAccessibilityModal();
    return;
  }
  if (tool === 'information') {
    openExamInfoModal();
    return;
  }
  if (tool === 'magnification') {
    toggleExamMagnifier();
  }
}

function openExamInfoModal() {
  const modal = document.getElementById('examInfoModal');
  const total = document.getElementById('infoTotalQuestions');
  if (total) total.textContent = examState.totalQ || EXAM_QUESTIONS.length || 0;
  if (modal) modal.classList.add('open');
}

function closeExamInfoModal() {
  const modal = document.getElementById('examInfoModal');
  if (modal) modal.classList.remove('open');
}

let examAccessibilitySettings = {
  theme: 'dark',
  cursor: 'default'
};

function loadExamAccessibilitySettings() {
  try {
    const saved = JSON.parse(localStorage.getItem('cuetace_exam_accessibility') || '{}');
    examAccessibilitySettings = {
      theme: ['dark', 'light', 'contrast'].includes(saved.theme) ? saved.theme : 'dark',
      cursor: ['default', 'large', 'contrast', 'crosshair'].includes(saved.cursor) ? saved.cursor : 'default'
    };
  } catch(e) {
    examAccessibilitySettings = { theme: 'dark', cursor: 'default' };
  }
}

function saveExamAccessibilitySettings() {
  try {
    localStorage.setItem('cuetace_exam_accessibility', JSON.stringify(examAccessibilitySettings));
  } catch(e) {}
}

function applyExamAccessibilitySettings() {
  document.body.classList.remove(
    'exam-theme-light',
    'exam-theme-contrast',
    'exam-cursor-large',
    'exam-cursor-contrast',
    'exam-cursor-crosshair'
  );

  if (examAccessibilitySettings.theme === 'light') {
    document.body.classList.add('exam-theme-light');
  } else if (examAccessibilitySettings.theme === 'contrast') {
    document.body.classList.add('exam-theme-contrast');
  }

  if (examAccessibilitySettings.cursor !== 'default') {
    document.body.classList.add('exam-cursor-' + examAccessibilitySettings.cursor);
  }

  updateExamAccessibilityChoices();
  refreshExamMagnifier();
}

function updateExamAccessibilityChoices() {
  document.querySelectorAll('[data-theme]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === examAccessibilitySettings.theme);
  });
  document.querySelectorAll('[data-cursor]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cursor === examAccessibilitySettings.cursor);
  });
}

function openExamAccessibilityModal() {
  closeExamInfoModal();
  const modal = document.getElementById('examAccessibilityModal');
  updateExamAccessibilityChoices();
  if (modal) modal.classList.add('open');
}

function closeExamAccessibilityModal() {
  const modal = document.getElementById('examAccessibilityModal');
  if (modal) modal.classList.remove('open');
}

function setExamAccessibilityTheme(theme) {
  if (!['dark', 'light', 'contrast'].includes(theme)) return;
  examAccessibilitySettings.theme = theme;
  saveExamAccessibilitySettings();
  applyExamAccessibilitySettings();
}

function setExamAccessibilityCursor(cursor) {
  if (!['default', 'large', 'contrast', 'crosshair'].includes(cursor)) return;
  examAccessibilitySettings.cursor = cursor;
  saveExamAccessibilitySettings();
  applyExamAccessibilitySettings();
}

function resetExamAccessibility() {
  examAccessibilitySettings = { theme: 'dark', cursor: 'default' };
  saveExamAccessibilitySettings();
  applyExamAccessibilitySettings();
}

function toggleExamMagnifier() {
  if (examMagnifierState.active) {
    closeExamMagnifier();
  } else {
    openExamMagnifier();
  }
}

function openExamMagnifier() {
  closeExamMagnifier();
  const lens = document.createElement('div');
  lens.className = 'exam-magnifier';
  lens.innerHTML = `
    <div class="exam-magnifier-head">
      <span>Magnifier</span>
      <button class="exam-magnifier-close" type="button" aria-label="Close magnifier">×</button>
    </div>
    <div class="exam-magnifier-body"></div>
  `;
  document.body.appendChild(lens);
  examMagnifierState = {
    ...examMagnifierState,
    active: true,
    el: lens,
    body: lens.querySelector('.exam-magnifier-body'),
    source: null,
    drag: null
  };
  lens.querySelector('.exam-magnifier-close')?.addEventListener('click', closeExamMagnifier);
  lens.addEventListener('pointerdown', startExamMagnifierDrag);
  document.addEventListener('pointermove', moveExamMagnifier);
  document.addEventListener('pointerup', endExamMagnifierDrag);
  document.addEventListener('pointercancel', endExamMagnifierDrag);
  window.addEventListener('resize', refreshExamMagnifier);
  refreshExamMagnifier();
}

function closeExamMagnifier() {
  if (examMagnifierState.el) examMagnifierState.el.remove();
  document.removeEventListener('pointermove', moveExamMagnifier);
  document.removeEventListener('pointerup', endExamMagnifierDrag);
  document.removeEventListener('pointercancel', endExamMagnifierDrag);
  window.removeEventListener('resize', refreshExamMagnifier);
  examMagnifierState = {
    active: false,
    el: null,
    body: null,
    source: null,
    scale: examMagnifierState.scale || 1.85,
    pointerId: null,
    drag: null
  };
}

function refreshExamMagnifier() {
  if (!examMagnifierState.active || !examMagnifierState.body) return;
  const screen = document.getElementById('examscreen');
  if (!screen) return;
  const clone = screen.cloneNode(true);
  clone.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
  clone.querySelectorAll('.exam-modal-overlay, .exam-magnifier').forEach(node => node.remove());
  const source = document.createElement('div');
  source.className = 'exam-magnifier-source';
  source.style.width = window.innerWidth + 'px';
  source.style.height = window.innerHeight + 'px';
  source.appendChild(clone);
  examMagnifierState.body.innerHTML = '';
  examMagnifierState.body.appendChild(source);
  examMagnifierState.source = source;
  updateExamMagnifierView();
}

function updateExamMagnifierView() {
  const { el, body, source, scale } = examMagnifierState;
  if (!el || !body || !source) return;
  const lensRect = el.getBoundingClientRect();
  const bodyRect = body.getBoundingClientRect();
  const centerX = lensRect.left + lensRect.width / 2;
  const centerY = lensRect.top + lensRect.height / 2;
  const x = bodyRect.width / 2 - centerX * scale;
  const y = bodyRect.height / 2 - centerY * scale;
  source.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
}

function startExamMagnifierDrag(event) {
  const lens = examMagnifierState.el;
  if (!lens || event.target.closest('.exam-magnifier-close')) return;
  if (event.pointerType && event.isPrimary === false) return;
  const rect = lens.getBoundingClientRect();
  examMagnifierState.drag = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
  examMagnifierState.pointerId = event.pointerId;
  lens.classList.add('dragging');
  try { lens.setPointerCapture?.(event.pointerId); } catch(e) {}
  event.preventDefault();
}

function moveExamMagnifier(event) {
  const { el, drag, pointerId } = examMagnifierState;
  if (!el || !drag) return;
  if (pointerId !== null && event.pointerId !== pointerId) return;
  const maxX = Math.max(0, window.innerWidth - el.offsetWidth);
  const maxY = Math.max(0, window.innerHeight - el.offsetHeight);
  const nextX = Math.min(maxX, Math.max(0, event.clientX - drag.x));
  const nextY = Math.min(maxY, Math.max(0, event.clientY - drag.y));
  el.style.left = nextX + 'px';
  el.style.top = nextY + 'px';
  updateExamMagnifierView();
  event.preventDefault();
}

function endExamMagnifierDrag(event) {
  if (event && examMagnifierState.pointerId !== null && event.pointerId !== examMagnifierState.pointerId) return;
  if (examMagnifierState.el) {
    try { examMagnifierState.el.releasePointerCapture?.(examMagnifierState.pointerId); } catch(e) {}
    examMagnifierState.el.classList.remove('dragging');
  }
  examMagnifierState.pointerId = null;
  examMagnifierState.drag = null;
}

document.addEventListener('keydown', function(event) {
  if (event.key !== 'Escape') return;
  closeExamInfoModal();
  closeExamAccessibilityModal();
  closeExamMagnifier();
});

document.addEventListener('click', function(event) {
  const modal = document.getElementById('examInfoModal');
  if (modal && modal.classList.contains('open') && event.target === modal) {
    closeExamInfoModal();
  }
  const accessModal = document.getElementById('examAccessibilityModal');
  if (accessModal && accessModal.classList.contains('open') && event.target === accessModal) {
    closeExamAccessibilityModal();
  }
});

function openSubmitModal() {
  const answered = examState.status.filter(s => s === 'answered' || s === 'ans-marked').length;
  const marked = examState.status.filter(s => s === 'marked' || s === 'ans-marked').length;
  const unanswered = examState.totalQ - answered;
  const ma = document.getElementById('modalAnswered');
  const mu = document.getElementById('modalUnanswered');
  const mm = document.getElementById('modalMarked');
  if (ma) ma.textContent = answered;
  if (mu) mu.textContent = unanswered;
  if (mm) mm.textContent = marked;
  const modal = document.getElementById('submitModal');
  if (modal) modal.classList.add('open');
}

function closeSubmitModal() {
  const modal = document.getElementById('submitModal');
  if (modal) modal.classList.remove('open');
}

// ═══════════════════════════════════════════════════════
// Results and review logic lives in assets/js/results.js

// showView handles exam startup directly — see VIEW SYSTEM above
// ── INIT: show landing page correctly on load ──
async function initApp() {
  if (window.cuetaceViewsReady) {
    await window.cuetaceViewsReady;
  }
  loadExamAccessibilitySettings();
  applyExamAccessibilitySettings();
  populateTargetYearOptions();
  initFirebaseServices();
  bindProfileLoginKeys();
  completeEmailLinkSignIn().catch(err => console.warn('[CUETAce] Email link sign-in failed', err));
  updateAuthUI();
  // Update plan indicator on load
  updatePlanUI();
  // Hide all views first
  document.querySelectorAll('.view').forEach(v => {
    v.style.display = 'none';
    v.classList.remove('active');
  });

  // Always start quietly on landing. Dashboard/exam login is requested only after a user action.
  try { localStorage.setItem('cuetace_lastview', 'landing'); } catch(e) {}
  const landing = document.getElementById('landing');
  if (landing) {
    landing.style.display = 'block';
    landing.classList.add('active');
  }
  routeCurrentPath();
}

function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

initApp()
  .then(initScrollReveal)
  .catch(err => console.warn('[CUETAce] App init failed', err));

window.addEventListener('popstate', routeCurrentPath);

// ══════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════
// CURRENT AFFAIRS MODULE
// Data source: ./current-affairs/data.json
// JSON format: [{ date, headline, description, category, source, url, important }]
// ══════════════════════════════════════════════════════════
// Current affairs logic lives in assets/js/current-affairs.js

// Saved questions logic lives in assets/js/saved.js
