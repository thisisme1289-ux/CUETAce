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
let QUESTION_BANK_INDEX_CACHE = null;

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

const CUETACE_FIREBASE_CONFIG = {
  enabled: true,
  apiKey: 'AIzaSyAXjgOir5uwur6GRB_h9z85bE-jKZC_rM8',
  authDomain: 'cuet-d3dea.firebaseapp.com',
  projectId: 'cuet-d3dea',
  storageBucket: 'cuet-d3dea.firebasestorage.app',
  messagingSenderId: '865036862060',
  appId: '1:865036862060:web:30e5f7b951bdd346d50e49',
  measurementId: 'G-Y7FBH2M636',
  functionsRegion: 'asia-south1'
};

let firebaseApp = null;
let firebaseAuth = null;
let firebaseFns = null;
let firebaseDb = null;
let firebaseAnalytics = null;
let cuetaceUser = null;
let cuetaceProfile = null;
let pendingAuthView = null;
let profileModalRequired = false;
let profileResendUntil = 0;
let profileResendTimer = null;
let profilePhotoDataUrl = '';
let appToastTimer = null;
const PENDING_AUTH_KEY = 'cuetace_pending_auth_view';
const SHOW_PROFILE_AFTER_LOGIN_KEY = 'cuetace_show_profile_after_login';
const DEVICE_SESSION_KEY = 'cuetace_device_session_id';
let cuetaceDeviceId = '';
let sessionHeartbeatTimer = null;
let sessionLockMessage = '';
let cloudResultsCache = null;
let cloudBookmarksCache = null;
let cloudProgressMigrated = false;
let visibleResultsCache = null;

function setProfileAfterLoginIntent() {
  try { localStorage.setItem(SHOW_PROFILE_AFTER_LOGIN_KEY, '1'); } catch(e) {}
}

function setLoginCompletionIntent() {
  if (restorePendingAuthView()) {
    try { localStorage.removeItem(SHOW_PROFILE_AFTER_LOGIN_KEY); } catch(e) {}
    return;
  }
  setProfileAfterLoginIntent();
}

function consumeProfileAfterLoginIntent() {
  try {
    const shouldShow = localStorage.getItem(SHOW_PROFILE_AFTER_LOGIN_KEY) === '1'
      || new URLSearchParams(window.location.search).get('next') === 'profile';
    localStorage.removeItem(SHOW_PROFILE_AFTER_LOGIN_KEY);
    return shouldShow;
  } catch(e) {
    return false;
  }
}

function isFirebaseReady() {
  return !!(CUETACE_FIREBASE_CONFIG.enabled && window.firebase && CUETACE_FIREBASE_CONFIG.apiKey && !CUETACE_FIREBASE_CONFIG.apiKey.startsWith('YOUR_'));
}

function initFirebaseServices() {
  if (!isFirebaseReady() || firebaseApp) return !!firebaseApp;
  firebaseApp = firebase.initializeApp(CUETACE_FIREBASE_CONFIG);
  firebaseAuth = firebase.auth();
  firebaseFns = firebase.app().functions(CUETACE_FIREBASE_CONFIG.functionsRegion || 'asia-south1');
  firebaseDb = firebase.firestore();
  if (firebase.analytics && CUETACE_FIREBASE_CONFIG.measurementId) {
    try { firebaseAnalytics = firebase.analytics(); } catch(e) { firebaseAnalytics = null; }
  }
  firebaseAuth.onAuthStateChanged(async user => {
    cuetaceUser = user || null;
    const hasPendingAuthView = !!(user && restorePendingAuthView());
    const shouldShowProfile = !!user && !hasPendingAuthView && consumeProfileAfterLoginIntent();
    if (user) {
      try {
        const result = await syncProfileData({});
        cuetaceProfile = result.data.profile || null;
        const sessionOk = await claimActiveUserSession();
        if (!sessionOk) {
          cuetaceUser = null;
          cuetaceProfile = null;
          updateAuthUI();
          openProfileModal();
          return;
        }
        await migrateLocalProgressToCloud();
        await refreshCloudProgress();
      } catch (err) {
        console.warn('[CUETAce] Profile sync failed', err);
      }
    } else {
      stopSessionHeartbeat();
      cuetaceProfile = null;
      cloudResultsCache = null;
      cloudBookmarksCache = null;
      cloudProgressMigrated = false;
    }
    updateAuthUI();
    if (shouldShowProfile) {
      profileModalRequired = false;
      openProfileModal();
    } else {
      continuePendingAuthView();
    }
  });
  return true;
}

function firebaseCallable(name) {
  if (!initFirebaseServices()) return null;
  return firebaseFns.httpsCallable(name);
}

function getDeviceSessionId() {
  if (cuetaceDeviceId) return cuetaceDeviceId;
  try {
    cuetaceDeviceId = localStorage.getItem(DEVICE_SESSION_KEY) || '';
    if (!cuetaceDeviceId) {
      const random = window.crypto && crypto.getRandomValues
        ? Array.from(crypto.getRandomValues(new Uint8Array(16))).map(n => n.toString(16).padStart(2, '0')).join('')
        : String(Date.now()) + Math.random().toString(16).slice(2);
      cuetaceDeviceId = 'web-' + random;
      localStorage.setItem(DEVICE_SESSION_KEY, cuetaceDeviceId);
    }
  } catch(e) {
    cuetaceDeviceId = cuetaceDeviceId || ('web-' + Date.now() + Math.random().toString(16).slice(2));
  }
  return cuetaceDeviceId;
}

async function claimActiveUserSession() {
  if (!cuetaceUser || !firebaseFns) return true;
  const claim = firebaseFns.httpsCallable('claimUserSession');
  try {
    await claim({ deviceId: getDeviceSessionId() });
    sessionLockMessage = '';
    startSessionHeartbeat();
    return true;
  } catch (err) {
    sessionLockMessage = err.message || 'This email is already open on another device.';
    stopSessionHeartbeat();
    try { await firebaseAuth.signOut(); } catch(e) {}
    return false;
  }
}

function startSessionHeartbeat() {
  stopSessionHeartbeat();
  sessionHeartbeatTimer = setInterval(async () => {
    if (!cuetaceUser || !firebaseFns) return;
    try {
      const heartbeat = firebaseFns.httpsCallable('heartbeatUserSession');
      await heartbeat({ deviceId: getDeviceSessionId() });
    } catch (err) {
      sessionLockMessage = err.message || 'This email was opened on another device.';
      stopSessionHeartbeat();
      try { await firebaseAuth.signOut(); } catch(e) {}
      updateAuthUI();
      openProfileModal();
    }
  }, 60000);
}

function stopSessionHeartbeat() {
  if (sessionHeartbeatTimer) clearInterval(sessionHeartbeatTimer);
  sessionHeartbeatTimer = null;
}

async function releaseActiveUserSession() {
  if (!cuetaceUser || !firebaseFns) return;
  try {
    const release = firebaseFns.httpsCallable('releaseUserSession');
    await release({ deviceId: getDeviceSessionId() });
  } catch(e) {}
}

async function syncProfileData(updates = {}) {
  if (!cuetaceUser) throw new Error('Please sign in first.');
  if (firebaseFns) {
    try {
      const syncProfile = firebaseFns.httpsCallable('syncProfile');
      return await syncProfile(updates);
    } catch (err) {
      console.warn('[CUETAce] Function profile sync failed, using Firestore fallback', err);
    }
  }
  if (!firebaseDb) throw new Error('Profile storage is not ready yet.');
  const ref = firebaseDb.collection('users').doc(cuetaceUser.uid);
  const snap = await ref.get();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  const base = {
    uid: cuetaceUser.uid,
    email: cuetaceUser.email || '',
    name: '',
    phone: '',
    class: '',
    targetExamYear: '',
    city: '',
    photoDataUrl: '',
    selectedSubjects: [],
    onboardingPreferences: {},
    planStatus: 'free',
    planExpiresAt: null,
    razorpayCustomerId: '',
    lastPaymentId: ''
  };
  const payload = snap.exists
    ? { ...updates, email: cuetaceUser.email || '', lastLoginAt: timestamp }
    : { ...base, ...updates, createdAt: timestamp, lastLoginAt: timestamp };
  await ref.set(payload, { merge: true });
  const fresh = await ref.get();
  return { data: { profile: fresh.data() || { ...base, ...updates } } };
}

function savePendingAuthView(view) {
  pendingAuthView = view;
  try { localStorage.setItem(PENDING_AUTH_KEY, JSON.stringify(view)); } catch(e) {}
}

function restorePendingAuthView() {
  if (pendingAuthView) return pendingAuthView;
  try {
    const raw = localStorage.getItem(PENDING_AUTH_KEY);
    pendingAuthView = raw ? JSON.parse(raw) : null;
  } catch(e) { pendingAuthView = null; }
  return pendingAuthView;
}

function clearPendingAuthView() {
  pendingAuthView = null;
  try { localStorage.removeItem(PENDING_AUTH_KEY); } catch(e) {}
}

async function sendMagicLink(email) {
  initFirebaseServices();
  if (!firebaseAuth) throw new Error('Firebase is not configured yet.');
  setLoginCompletionIntent();
  await firebaseAuth.sendSignInLinkToEmail(email, {
    url: window.location.origin + window.location.pathname + '?login=1&next=profile',
    handleCodeInApp: true
  });
  localStorage.setItem('cuetace_email_for_signin', email);
}

async function completeEmailLinkSignIn() {
  if (!initFirebaseServices() || !firebaseAuth.isSignInWithEmailLink(window.location.href)) return;
  const email = localStorage.getItem('cuetace_email_for_signin') || window.prompt('Confirm your email to finish sign in');
  if (!email) return;
  await firebaseAuth.signInWithEmailLink(email, window.location.href);
  localStorage.removeItem('cuetace_email_for_signin');
  history.replaceState(null, '', window.location.origin + window.location.pathname);
}

async function signInWithGoogle() {
  initFirebaseServices();
  if (!firebaseAuth) throw new Error('Firebase is not configured yet.');
  setLoginCompletionIntent();
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  await firebaseAuth.signInWithPopup(provider);
}

function openProfileModal() {
  const modal = document.getElementById('profileModal');
  if (modal) modal.classList.add('open');
  bindProfileLoginKeys();
  updateAuthUI();
}

function openRequiredLoginModal(targetView, targetOpts) {
  savePendingAuthView({ name: targetView, opts: targetOpts || null });
  profileModalRequired = true;
  const hasActiveView = Array.from(document.querySelectorAll('.view')).some(v => v.classList.contains('active') && v.style.display !== 'none');
  if (!hasActiveView) {
    const landing = document.getElementById('landing');
    if (landing) {
      landing.style.display = 'block';
      landing.classList.add('active');
    }
  }
  openProfileModal();
}

function closeProfileModal() {
  if (profileModalRequired && !cuetaceUser) return;
  const modal = document.getElementById('profileModal');
  if (modal) modal.classList.remove('open');
  profileModalRequired = false;
}

function shouldRequireLoginForView(name) {
  if (name !== 'dashboard' && name !== 'examscreen') return false;
  if (!isFirebaseReady()) return true;
  return !cuetaceUser;
}

function continuePendingAuthView() {
  const next = restorePendingAuthView();
  if (!next || !cuetaceUser) return;
  clearPendingAuthView();
  profileModalRequired = false;
  closeProfileModal();
  showView(next.name, next.opts);
}

function updateAuthUI() {
  const status = document.getElementById('profileStatus');
  const detailsStatus = document.getElementById('profileDetailsStatus');
  const loginBtn = document.getElementById('profileLoginBtn');
  const resendBtn = document.getElementById('profileResendBtn');
  const saveBtn = document.getElementById('profileSaveBtn');
  const logoutBtn = document.getElementById('profileLogoutBtn');
  const emailInput = document.getElementById('profileEmail');
  const loginPanel = document.getElementById('profileLoginPanel');
  const detailsPanel = document.getElementById('profileDetailsPanel');
  const devNote = document.getElementById('profileDevNote');
  const loginTitle = document.getElementById('profileLoginTitle');
  const loginSub = document.getElementById('profileLoginSub');
  const gateNote = document.getElementById('profileGateNote');
  const savedCard = document.getElementById('profileSavedCard');
  const configured = isFirebaseReady();
  if (emailInput && cuetaceUser?.email) emailInput.value = cuetaceUser.email;
  fillProfileForm();
  updateProfileIdentityUI();
  if (loginPanel) loginPanel.classList.toggle('active', !cuetaceUser);
  if (detailsPanel) detailsPanel.classList.toggle('active', !!cuetaceUser);
  if (loginTitle) loginTitle.textContent = profileModalRequired ? 'Create your CUETAce profile' : 'Welcome to CUETAce';
  if (loginSub) loginSub.textContent = profileModalRequired
    ? 'Sign in to open the dashboard and save your test progress.'
    : 'Sign in whenever you want to save progress or manage your profile.';
  if (gateNote) gateNote.classList.toggle('active', !!profileModalRequired && !cuetaceUser);
  if (savedCard && !savedCard.dataset.keepVisible) savedCard.classList.remove('active');
  if (saveBtn) saveBtn.style.display = configured && cuetaceUser ? '' : 'none';
  if (logoutBtn) logoutBtn.style.display = configured && cuetaceUser ? '' : 'none';
  const closeBtn = document.getElementById('profileCloseBtn');
  if (closeBtn) closeBtn.style.display = profileModalRequired && !cuetaceUser ? 'none' : '';
  updateResendButton();
  if (loginBtn) loginBtn.style.display = !cuetaceUser ? '' : 'none';
  if (loginBtn) loginBtn.disabled = !configured;
  if (resendBtn) resendBtn.style.display = !cuetaceUser && profileResendUntil > 0 ? '' : 'none';
  if (resendBtn) resendBtn.disabled = !configured || resendBtn.disabled;
  const googleBtn = document.getElementById('profileGoogleBtn');
  if (googleBtn) googleBtn.disabled = !configured;
  if (emailInput) emailInput.disabled = !configured && !cuetaceUser;
  if (devNote) devNote.style.display = configured ? 'none' : 'block';
  if (devNote && !configured) devNote.textContent = 'Login service could not load. Check your internet connection or try again in a moment.';
  if (status) {
    if (!configured) setProfileStatus(status, 'Login is temporarily unavailable. Please try again later.', 'error');
    else if (sessionLockMessage && !cuetaceUser) setProfileStatus(status, sessionLockMessage, 'error');
    else if (!cuetaceUser) setProfileStatus(status, profileModalRequired
      ? 'Login is required to continue. Enter your email and open the secure link.'
      : 'Enter your email and we will send a secure CUETAce login link.');
  }
  if (detailsStatus && cuetaceUser && !detailsStatus.dataset.keepMessage) {
    setProfileStatus(detailsStatus, 'Signed in as ' + cuetaceUser.email + '.');
  }
}

function profileInitials() {
  const name = (cuetaceProfile?.name || cuetaceUser?.displayName || cuetaceUser?.email || 'U').trim();
  if (name.includes('@')) return name.charAt(0).toUpperCase();
  return name.split(/\s+/).slice(0, 2).map(part => part.charAt(0)).join('').toUpperCase() || 'U';
}

function updateProfileIdentityUI() {
  const photo = profilePhotoDataUrl || cuetaceProfile?.photoDataUrl || cuetaceUser?.photoURL || '';
  const initials = profileInitials();
  const avatar = document.getElementById('profileAvatarPreview');
  const corner = document.getElementById('profileCornerBtn');
  const render = el => {
    if (!el) return;
    if (photo) el.innerHTML = '<img src="' + photo.replace(/"/g, '&quot;') + '" alt="">';
    else el.textContent = initials;
  };
  render(avatar);
  render(corner);
  if (corner) corner.title = cuetaceUser ? 'Open profile' : 'Sign in';
}

function updateResendButton() {
  const resendBtn = document.getElementById('profileResendBtn');
  if (!resendBtn) return;
  const remaining = Math.max(0, Math.ceil((profileResendUntil - Date.now()) / 1000));
  if (remaining > 0) {
    resendBtn.disabled = true;
    resendBtn.textContent = 'Resend in ' + remaining + 's';
  } else {
    resendBtn.disabled = false;
    resendBtn.textContent = 'Resend link';
    if (profileResendUntil > 0 && profileResendTimer) {
      clearInterval(profileResendTimer);
      profileResendTimer = null;
    }
  }
}

function setProfileStatus(element, message, type = '') {
  if (!element) return;
  element.textContent = message;
  element.classList.toggle('success', type === 'success');
  element.classList.toggle('error', type === 'error');
  element.classList.toggle('saving', type === 'saving');
}

function showAppToast(message, type = '') {
  const toast = document.getElementById('appToast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.toggle('success', type === 'success');
  toast.classList.toggle('error', type === 'error');
  toast.classList.add('show');
  if (appToastTimer) clearTimeout(appToastTimer);
  appToastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

function startResendCooldown() {
  profileResendUntil = Date.now() + 30000;
  updateResendButton();
  if (profileResendTimer) clearInterval(profileResendTimer);
  profileResendTimer = setInterval(updateResendButton, 1000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function fillProfileForm() {
  if (!cuetaceProfile) return;
  const setValue = (id, value) => {
    const el = document.getElementById(id);
    if (el && !el.value) el.value = value || '';
  };
  setValue('profileName', cuetaceProfile.name);
  setValue('profilePhone', cuetaceProfile.phone);
  setValue('profileClass', cuetaceProfile.class);
  setValue('profileTargetYear', cuetaceProfile.targetExamYear);
  setValue('profileCity', cuetaceProfile.city);
  profilePhotoDataUrl = profilePhotoDataUrl || cuetaceProfile.photoDataUrl || '';
  updateProfileIdentityUI();
}

function populateTargetYearOptions() {
  const select = document.getElementById('profileTargetYear');
  if (!select) return;
  const selected = select.value || cuetaceProfile?.targetExamYear || '';
  const currentYear = new Date().getFullYear();
  select.innerHTML = '<option value="">Target CUET year</option>';
  for (let year = currentYear; year <= currentYear + 5; year++) {
    const option = document.createElement('option');
    option.value = String(year);
    option.textContent = String(year);
    select.appendChild(option);
  }
  if (selected) select.value = selected;
}

function handleProfilePhotoChange(event) {
  const file = event.target.files && event.target.files[0];
  const status = document.getElementById('profileDetailsStatus');
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    setProfileStatus(status, 'Please choose an image file.', 'error');
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const size = 180;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      const minSide = Math.min(img.width, img.height);
      const sx = (img.width - minSide) / 2;
      const sy = (img.height - minSide) / 2;
      ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, size, size);
      profilePhotoDataUrl = canvas.toDataURL('image/jpeg', 0.72);
      updateProfileIdentityUI();
      setProfileStatus(status, 'Picture selected. Save profile to keep it.');
    };
    img.onerror = () => { setProfileStatus(status, 'Could not read that image.', 'error'); };
    img.src = reader.result;
  };
  reader.onerror = () => { setProfileStatus(status, 'Could not read that image.', 'error'); };
  reader.readAsDataURL(file);
}

async function handleProfileLogin() {
  const email = (document.getElementById('profileEmail')?.value || '').trim();
  const status = document.getElementById('profileStatus');
  const loginBtn = document.getElementById('profileLoginBtn');
  if (!email) { setProfileStatus(status, 'Enter your email address first.', 'error'); return; }
  if (!isValidEmail(email)) { setProfileStatus(status, 'Please enter a valid email address.', 'error'); return; }
  if (profileResendUntil > Date.now()) return;
  try {
    if (loginBtn) { loginBtn.disabled = true; loginBtn.textContent = 'Sending...'; }
    await sendMagicLink(email);
    startResendCooldown();
    setProfileStatus(status, 'Check your inbox. We sent a secure CUETAce login link to ' + email + '.', 'success');
    showAppToast('Login link sent. Open it to finish your profile.', 'success');
  } catch (err) {
    setProfileStatus(status, isFirebaseReady() ? (err.message || 'Could not send login link.') : 'Login is temporarily unavailable. Please try again later.', 'error');
  } finally {
    if (loginBtn) { loginBtn.disabled = false; loginBtn.textContent = 'Continue with Email'; }
  }
}

async function handleGoogleLogin() {
  const status = document.getElementById('profileStatus');
  const googleBtn = document.getElementById('profileGoogleBtn');
  try {
    if (googleBtn) { googleBtn.disabled = true; googleBtn.textContent = 'Opening Google...'; }
    await signInWithGoogle();
  } catch (err) {
    setProfileStatus(status, isFirebaseReady() ? (err.message || 'Could not continue with Google.') : 'Login is temporarily unavailable. Please try again later.', 'error');
  } finally {
    if (googleBtn) { googleBtn.disabled = false; googleBtn.textContent = 'Continue with Google'; }
  }
}

function bindProfileLoginKeys() {
  const emailInput = document.getElementById('profileEmail');
  if (!emailInput || emailInput.dataset.bound === '1') return;
  emailInput.dataset.bound = '1';
  emailInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleProfileLogin();
    }
  });
}

async function handleProfileSave() {
  const status = document.getElementById('profileDetailsStatus');
  const saveBtn = document.getElementById('profileSaveBtn');
  const savedCard = document.getElementById('profileSavedCard');
  try {
    if (!cuetaceUser) throw new Error('Please sign in first.');
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.textContent = 'Saving...';
    }
    if (status) status.dataset.keepMessage = '1';
    if (savedCard) {
      savedCard.classList.remove('active');
      delete savedCard.dataset.keepVisible;
    }
    setProfileStatus(status, 'Saving your profile...', 'saving');
    const result = await syncProfileData({
      name: (document.getElementById('profileName')?.value || '').trim(),
      phone: (document.getElementById('profilePhone')?.value || '').trim(),
      class: (document.getElementById('profileClass')?.value || '').trim(),
      targetExamYear: (document.getElementById('profileTargetYear')?.value || '').trim(),
      city: (document.getElementById('profileCity')?.value || '').trim(),
      photoDataUrl: profilePhotoDataUrl || cuetaceProfile?.photoDataUrl || ''
    });
    cuetaceProfile = result.data.profile || cuetaceProfile;
    profilePhotoDataUrl = cuetaceProfile.photoDataUrl || profilePhotoDataUrl;
    updateProfileIdentityUI();
    setProfileStatus(status, 'Profile saved successfully.', 'success');
    if (savedCard) {
      savedCard.dataset.keepVisible = '1';
      savedCard.classList.add('active');
    }
    if (saveBtn) saveBtn.textContent = 'Saved';
    showAppToast('Profile saved. You can continue now.', 'success');
    setTimeout(() => {
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.textContent = 'Save profile';
      }
      if (status) delete status.dataset.keepMessage;
      if (savedCard) delete savedCard.dataset.keepVisible;
      closeProfileModal();
      continuePendingAuthView();
    }, 900);
  } catch (err) {
    setProfileStatus(status, err.message || 'Could not save profile.', 'error');
    showAppToast(err.message || 'Could not save profile.', 'error');
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.textContent = 'Save profile';
    }
    if (status) delete status.dataset.keepMessage;
  }
}

async function handleProfileLogout() {
  if (!firebaseAuth) return;
  await releaseActiveUserSession();
  stopSessionHeartbeat();
  await firebaseAuth.signOut();
  updateAuthUI();
  showAppToast('Signed out of CUETAce.', 'success');
}

window.openProfileModal = openProfileModal;
window.closeProfileModal = closeProfileModal;
window.handleProfileLogin = handleProfileLogin;
window.handleGoogleLogin = handleGoogleLogin;
window.handleProfileSave = handleProfileSave;
window.handleProfileLogout = handleProfileLogout;
window.handleProfilePhotoChange = handleProfilePhotoChange;
window.populateTargetYearOptions = populateTargetYearOptions;

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
      pypUrl: repoRawUrl(entry.sourcePath)
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
function showView(name, opts) {
  if (shouldRequireLoginForView(name)) {
    openRequiredLoginModal(name, opts);
    return;
  }

  // Persist view so it survives page reload
  if (name === 'dashboard' || name === 'landing') {
    localStorage.setItem('cuetace_lastview', name);
  }

  // Stop exam timer if navigating away from exam
  if (name !== 'examscreen' && examState.timerInterval) {
    clearInterval(examState.timerInterval);
    examState.timerInterval = null;
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
  }

  // Exam screen setup — always start exam on both desktop and mobile
  if (name === 'examscreen') {
    const testName = (opts && opts.testName) || 'Accountancy — Mock Test';
    const subject  = (opts && opts.subject)   || 'Accountancy';
    const mode     = (opts && opts.mode)       || 'mock';
    const pypUrl   = (opts && opts.pypUrl)     || null;
    const qCount   = (opts && opts.qCount)     || null;
    applyExamPaletteState();
    startExam(testName, subject, mode, pypUrl, qCount);
  }
}

// ── TAB SYSTEM ──
function switchTab(btn, tabId) {
  if (!tabId) return;
  if (tabId === 'tab-results') setTimeout(renderResultsList, 60);
  localStorage.setItem('cuetace_lasttab', tabId);
  closeMobileMore();

  // Always highlight by matching tabId string — works whether called from btn click or programmatically
  document.querySelectorAll('.inner-nav-btn').forEach(b => {
    b.classList.remove('active');
    if ((b.getAttribute('onclick') || '').includes(tabId)) b.classList.add('active');
  });

  document.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('active'));
  const tab = document.getElementById(tabId);
  if (tab) tab.classList.add('active');
  window.scrollTo(0, 0);
  if (tabId === 'tab-chapters') buildChapters();
  if (tabId === 'tab-papers')   buildPapers();
  if (tabId === 'tab-ca')       { if (typeof CA !== 'undefined') caInit(); }
  if (tabId === 'tab-saved')    renderSavedQuestions();
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

function syncBottomNav(tabId) {
  const directTabs = {
    'tab-home': 'bnav-home',
    'tab-mock': 'bnav-mock',
    'tab-chapters': 'bnav-chapters'
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
function toggleChapters(header) {
  header.closest('.chapter-group').classList.toggle('open');
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
        section: chName, text: q.question, passage: q.passage || '', sentence: q.sentence || '', statements: q.statements || null, column_i: q.column_i || null, column_ii: q.column_ii || null,
        options: q.options, correct: q.correct, explanation: q.explanation || '',
        type: q.type || 'MCQ', level: q.level || 'L1'
      }));
    });
    if (matched) {
      const matchedName = matched.chapter || matched.chapter_name || matched.section;
      const chQs = shuffleArray(matched.questions.map(q => ({
        section: matchedName, text: q.question, passage: q.passage || '', sentence: q.sentence || '', statements: q.statements || null, column_i: q.column_i || null, column_ii: q.column_ii || null,
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
        section: chName, text: q.question, passage: q.passage || '', sentence: q.sentence || '', statements: q.statements || null, column_i: q.column_i || null, column_ii: q.column_ii || null,
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
        if (!usedIds.has(q.question)) allQ.push({
          section: chName, text: q.question, passage: q.passage || '', sentence: q.sentence || '', statements: q.statements || null, column_i: q.column_i || null, column_ii: q.column_ii || null,
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
  questionTimes: [],
  questionStartTime: Date.now()
};

// ── START EXAM (async — fetches JSON from GitHub) ──
async function startExam(testName, subject, mode, pypUrl, qCount) {
  examState.currentQ  = 0;
  examState.answers   = [];
  examState.status    = [];
  examState.timerSecs = 60 * 60;
  examState.questionTimes     = [];
  examState.questionStartTime = Date.now();
  examState.testName  = testName || 'Mock Test';
  examState.subject   = subject  || 'Accountancy';
  examState.mode      = mode || 'mock';
  // Only show explanations for premium users (or mock tests)
  examState.showExplanations = true;

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

    // PYP mode — single file per year/subject (unchanged)
    if (mode === 'pyp' && pypUrl) {
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

    } else if (mode === 'chapter') {
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
    const limit = mode === 'mock' ? 50 : mode === 'chapter' ? (qCount || 200) : null;
    EXAM_QUESTIONS = buildQuestionsFromBank(bank, examState.testName, mode, limit);
    console.log('[CUETAce] Loaded', EXAM_QUESTIONS.length, 'questions |', subject, '| mode:', mode);

    if (EXAM_QUESTIONS.length === 0) {
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
  examState.totalQ  = EXAM_QUESTIONS.length;
  examState.answers = new Array(examState.totalQ).fill(null);
  examState.status  = new Array(examState.totalQ).fill('not-visited');
  examState.questionTimes = new Array(examState.totalQ).fill(0);

  const fill = document.getElementById('examProgressFill');
  if (fill) fill.style.width = '2%';

  buildExamPalette();

  if (examState.timerInterval) clearInterval(examState.timerInterval);
  examState.timerInterval = setInterval(tickTimer, 1000);

  loadQuestion(0);
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
}

// ── LOAD QUESTION ──
function loadQuestion(index) {
  // Record time spent on previous question
  const now = Date.now();
  const prev = examState.currentQ;
  if (prev !== index && examState.questionStartTime) {
    const secs = Math.round((now - examState.questionStartTime) / 1000);
    examState.questionTimes[prev] = (examState.questionTimes[prev] || 0) + secs;
  }
  examState.questionStartTime = now;
  examState.currentQ = index;
  const q = EXAM_QUESTIONS[index];

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
  const passageEl = document.getElementById('examPassage');
  if (passageEl) {
    if (q.passage) {
      passageEl.textContent = q.passage;
      passageEl.classList.add('visible');
      passageEl.scrollTop = 0;
    } else {
      passageEl.textContent = '';
      passageEl.classList.remove('visible');
    }
  }

  // Build question body HTML
  const qt = document.getElementById('examQText');
  if (qt) {
    let html = '';

    // EN-S2 Para Jumble — show statements A B C D
    if (q.statements) {
      html += '<div style="margin-bottom:10px;">' + esc(q.text) + '</div>';
      html += '<div style="background:var(--bg-3);border:1px solid var(--border);border-radius:8px;padding:12px 14px;margin-bottom:4px;font-size:13px;line-height:1.8;">';
      Object.entries(q.statements).forEach(([key, val]) => {
        html += '<div><strong style="color:var(--gold);">' + esc(key) + '.</strong> ' + esc(val) + '</div>';
      });
      html += '</div>';
      qt.innerHTML = html;

    // EN-S3 Match the Following — show Column I and Column II side by side
    } else if (q.column_i && q.column_ii) {
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
    } else if (q.sentence) {
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
      // Show correct/wrong classes if already answered
      if (alreadyAnswered) {
        if (i === q.correct) div.classList.add('opt-correct');
        else if (i === examState.answers[index] && i !== q.correct) div.classList.add('opt-wrong');
        div.style.pointerEvents = 'none'; // lock — already answered
      }
      div.innerHTML = '<span class="opt-bubble">' + labels[i] + '</span>' + esc(opt);
      div.addEventListener('click', () => selectOption(i));
      optsEl.appendChild(div);
    });
  }

  // Show explanation if already answered AND plan allows it
  const expEl = document.getElementById('examExplanation');
  if (expEl) {
    const ans = examState.answers[index];
    if (ans !== null && q.explanation && examState.showExplanations) {
      expEl.style.display = 'block';
      expEl.innerHTML = '<strong>Explanation</strong>' + esc(q.explanation);
    } else {
      expEl.style.display = 'none';
    }
  }

  // Refresh palette highlight
  refreshPalette();
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
  // Show explanation immediately after selection — only if plan allows
  const q = EXAM_QUESTIONS[examState.currentQ];
  const expEl = document.getElementById('examExplanation');
  if (expEl && q && q.explanation && examState.showExplanations) {
    expEl.style.display = 'block';
    expEl.innerHTML = '<strong>Explanation</strong>' + esc(q.explanation);
  }
  // Re-render options
  const optsEl = document.getElementById('examOpts');
  if (optsEl) {
    const q2 = EXAM_QUESTIONS[examState.currentQ];
    optsEl.querySelectorAll('.exam-opt').forEach((el, i) => {
      el.classList.remove('selected','answered-marked','opt-correct','opt-wrong');
      el.style.pointerEvents = '';
      if (i === optIndex) {
        el.classList.add(examState.status[examState.currentQ] === 'ans-marked' ? 'answered-marked' : 'selected');
      }
      // Show correct/wrong highlight
      if (q2 && q2.correct !== undefined) {
        if (i === q2.correct) el.classList.add('opt-correct');
        else if (i === optIndex && i !== q2.correct) el.classList.add('opt-wrong');
        el.style.pointerEvents = 'none'; // lock options after answering
      }
    });
  }
  refreshPalette();
  setTimeout(updateBookmarkBtn, 10);
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

function handleExamTool(tool) {
  console.log('[CUETAce] Exam tool clicked:', tool);
}

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
// RESULTS SYSTEM — store, display, review
// ═══════════════════════════════════════════════════════

const RESULTS_KEY = 'cuetace_results';
// No limit on stored results

function normalizeCloudResult(result) {
  if (!result) return result;
  const created = result.createdAtMillis || (result.createdAt && result.createdAt.seconds ? result.createdAt.seconds * 1000 : 0);
  return {
    ...result,
    date: result.date || (created ? new Date(created).toLocaleDateString('en-IN', {day:'2-digit', month:'short', year:'numeric'}) : ''),
    time: result.time || (created ? new Date(created).toLocaleTimeString('en-IN', {hour:'2-digit', minute:'2-digit'}) : '')
  };
}

function normalizeResultForSync(result) {
  const id = result.id || ('result-' + Date.now() + '-' + Math.random().toString(16).slice(2));
  return { ...result, id: String(id) };
}

function mergeUniqueByKey(primary, secondary, keyName) {
  const seen = new Set();
  const merged = [];
  [...(primary || []), ...(secondary || [])].forEach(item => {
    if (!item) return;
    const key = String(item[keyName] || item.id || item.key || JSON.stringify(item));
    if (seen.has(key)) return;
    seen.add(key);
    merged.push(item);
  });
  return merged;
}

async function saveResultToCloud(result) {
  if (!cuetaceUser || !firebaseFns) return null;
  const saveUserResult = firebaseFns.httpsCallable('saveUserResult');
  const response = await saveUserResult({ result });
  const saved = normalizeCloudResult(response.data);
  if (cloudResultsCache) {
    cloudResultsCache = [saved, ...cloudResultsCache.filter(item => String(item.id) !== String(saved.id))].slice(0, 50);
  }
  return response.data;
}

async function loadCloudResults() {
  if (!cuetaceUser || !firebaseFns) return getStoredResults();
  if (cloudResultsCache) return cloudResultsCache;
  try {
    const listUserResults = firebaseFns.httpsCallable('listUserResults');
    const response = await listUserResults({ limit: 50 });
    const cloudResults = (response.data.results || []).map(normalizeCloudResult);
    cloudResultsCache = mergeUniqueByKey(cloudResults, getStoredResults(), 'id').slice(0, 50);
    return cloudResultsCache;
  } catch (err) {
    console.warn('[CUETAce] Could not load cloud results', err);
    return getStoredResults();
  }
}

async function migrateLocalResultsToCloud() {
  if (!cuetaceUser || !firebaseFns) return;
  const localResults = getStoredResults().map(normalizeResultForSync);
  if (!localResults.length) return;
  try { localStorage.setItem(RESULTS_KEY, JSON.stringify(localResults.slice(0, 50))); } catch(e) {}
  const saveUserResult = firebaseFns.httpsCallable('saveUserResult');
  await Promise.all(localResults.slice(0, 50).map(result => saveUserResult({ result }).catch(err => {
    console.warn('[CUETAce] Could not migrate result', err);
  })));
  cloudResultsCache = null;
}

function saveResult(result) {
  result = normalizeResultForSync(result);
  let results = getStoredResults().filter(r => String(r.id) !== String(result.id));
  results.unshift(result); // newest first
  if (results.length > 50) results = results.slice(0, 50); // cap at 50
  try { localStorage.setItem(RESULTS_KEY, JSON.stringify(results)); } catch(e) {
    // localStorage full — trim aggressively and retry
    try { localStorage.setItem(RESULTS_KEY, JSON.stringify(results.slice(0, 20))); } catch(e2) {}
  }
  if (cuetaceUser) {
    cloudResultsCache = mergeUniqueByKey([result], cloudResultsCache || [], 'id').slice(0, 50);
    visibleResultsCache = cloudResultsCache;
  }
  saveResultToCloud(result).catch(err => console.warn('[CUETAce] Could not save cloud result', err));
}

function getStoredResults() {
  try {
    const raw = localStorage.getItem(RESULTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch(e) { return []; }
}

function submitTest() {
  clearInterval(examState.timerInterval);
  closeSubmitModal();

  // Record time on last question
  const now = Date.now();
  const secs = Math.round((now - examState.questionStartTime) / 1000);
  examState.questionTimes[examState.currentQ] = (examState.questionTimes[examState.currentQ] || 0) + secs;

  // Calculate score + chapter breakdown
  let correct = 0, wrong = 0, skipped = 0;
  const snapshot = [];
  const chapterMap = {}; // chapter -> {correct, wrong, skipped, total}

  for (let i = 0; i < examState.totalQ; i++) {
    const q   = EXAM_QUESTIONS[i];
    const ans = examState.answers[i];
    let status = 'skipped';
    if (ans === null) {
      skipped++;
    } else if (ans === q.correct) {
      correct++;
      status = 'correct';
    } else {
      wrong++;
      status = 'wrong';
    }

    // Build chapter breakdown
    const ch = q.section || 'General';
    if (!chapterMap[ch]) chapterMap[ch] = { correct: 0, wrong: 0, skipped: 0, total: 0 };
    chapterMap[ch].total++;
    chapterMap[ch][status]++;

    snapshot.push({
      section:     q.section    || '',
      text:        q.text       || '',
      options:     q.options    || [],
      correct:     q.correct,
      explanation: q.explanation || '',
      userAnswer:  ans,
      status:      status,
      timeSpent:   examState.questionTimes[i] || 0
    });
  }

  // Marks: +5 correct, -1 wrong, 0 skipped
  const marks = (correct * 5) - (wrong * 1);
  const pct   = examState.totalQ > 0 ? Math.round((correct / examState.totalQ) * 100) : 0;

  // Time taken
  const totalSecs = 60 * 60;
  const elapsed   = totalSecs - examState.timerSecs;
  const mm = String(Math.floor(elapsed / 60)).padStart(2,'0');
  const ss = String(elapsed % 60).padStart(2,'0');
  const timeTaken = mm + ':' + ss;

  // Average time per question (seconds)
  const answeredTimes = snapshot.filter(q => q.userAnswer !== null).map(q => q.timeSpent);
  const avgTime = answeredTimes.length > 0
    ? Math.round(answeredTimes.reduce((a,b) => a+b, 0) / answeredTimes.length)
    : 0;

  // SWOT: chapters sorted by accuracy
  const chapterBreakdown = Object.entries(chapterMap).map(([name, data]) => ({
    name,
    total:   data.total,
    correct: data.correct,
    wrong:   data.wrong,
    skipped: data.skipped,
    pct:     data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0
  })).sort((a, b) => b.pct - a.pct);

  const result = {
    id:               Date.now(),
    testName:         examState.testName,
    subject:          examState.subject,
    date:             new Date().toLocaleDateString('en-IN', {day:'2-digit', month:'short', year:'numeric'}),
    time:             new Date().toLocaleTimeString('en-IN', {hour:'2-digit', minute:'2-digit'}),
    timeTaken:        timeTaken,
    total:            examState.totalQ,
    correct:          correct,
    wrong:            wrong,
    skipped:          skipped,
    marks:            marks,
    pct:              pct,
    avgTime:          avgTime,
    chapterBreakdown: chapterBreakdown,
    questions:        snapshot
  };

  saveResult(result);

  // Update adaptive performance profile (mock tests only)
  if (examState.mode === 'mock') {
    updatePerformanceProfile(examState.subject, chapterBreakdown);
  }

  showView('dashboard');
  setTimeout(() => {
    switchTab(null, 'tab-results');
    renderResultsList();
  }, 100);
}

// ── RENDER RESULTS LIST ──
async function renderResultsList() {
  const container = document.getElementById('resultsContainer');
  if (!container) return;
  const results = await loadCloudResults();
  visibleResultsCache = results;

  if (results.length === 0) {
    container.innerHTML = `<div class="empty-state" style="margin-top:40px;">
      <div class="empty-line"></div>
      <div class="empty-title">No results yet</div>
      <div class="empty-desc">Complete a test and your score, breakdown, and full question review will appear here.</div>
      <button class="empty-btn" onclick="switchTab(null,'tab-mock')">Start a Test</button>
    </div>`;
    return;
  }

  let html = '';
  results.forEach((r, idx) => {
    html += `<div class="result-card" onclick="openReview(${idx})">
      <div class="result-card-left">
        <div class="result-card-subject">${r.subject}</div>
        <div class="result-card-name">${r.testName}</div>
        <div class="result-card-meta">
          <span>&#128197; ${r.date}</span>
          <span>&#128336; ${r.time}</span>
        </div>
        <div class="result-pills">
          <span class="pill-c">&#10003; ${r.correct} Correct</span>
          <span class="pill-w">&#10007; ${r.wrong} Wrong</span>
          <span class="pill-s">&#8213; ${r.skipped} Skipped</span>
        </div>
      </div>
      <div class="result-card-right">
        <div class="result-score-big">${r.correct}<span class="result-score-denom">/${r.total}</span></div>
        <div class="result-score-label">Score</div>
      </div>
    </div>`;
  });

  container.innerHTML = html;
}

// ── OPEN REVIEW SCREEN ──
let currentReviewResult = null;
let currentReviewFilter = 'all';

function openReview(idx) {
  const results = visibleResultsCache || cloudResultsCache || getStoredResults();
  if (!results[idx]) return;
  currentReviewResult = results[idx];
  currentReviewFilter = 'all';
  const r = currentReviewResult;

  // Header
  document.getElementById('reviewTestName').textContent = r.testName;
  document.getElementById('reviewMeta').textContent = r.date + '  ·  ' + r.time;
  document.getElementById('reviewScoreBadge').textContent = r.correct + ' / ' + r.total;

  // Summary card
  document.getElementById('rv-correct').textContent = r.correct;
  document.getElementById('rv-wrong').textContent   = r.wrong;
  document.getElementById('rv-skipped').textContent = r.skipped;
  document.getElementById('rv-marks').textContent   = ((r.marks ?? 0) > 0 ? '+' : '') + (r.marks ?? 0);
  document.getElementById('rv-pct').textContent     = (r.pct ?? 0) + '%';
  document.getElementById('rv-time').textContent    = r.timeTaken || '—';
  document.getElementById('rv-total').textContent   = r.total;

  // Build analytics section
  buildReviewAnalytics(r);

  // Reset filters
  document.querySelectorAll('.review-filter').forEach(b => b.classList.remove('active'));
  document.getElementById('rf-all').classList.add('active');

  // Render questions
  renderReviewQuestions('all');

  // Hide all views, show review screen
  document.querySelectorAll('.view').forEach(v => {
    v.classList.remove('active');
    v.style.display = 'none';
  });
  document.getElementById('reviewscreen').style.display = 'block';
  window.scrollTo(0, 0);
}

function buildReviewAnalytics(r) {
  const container = document.getElementById('reviewAnalytics');
  if (!container) return;

  const allResults = cloudResultsCache || getStoredResults();
  const sameSubject = allResults.filter(x => x.subject === r.subject && x.pct !== undefined).reverse();

  // ── SWOT ──
  const breakdown = r.chapterBreakdown || [];
  const strong = breakdown.filter(c => c.pct >= 70);
  const weak   = breakdown.filter(c => c.pct < 40 && c.total > 0);
  const avg    = breakdown.filter(c => c.pct >= 40 && c.pct < 70);

  const swotHtml = breakdown.length > 0 ? `
    <div style="margin-bottom:24px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--cream-muted);margin-bottom:12px;">SWOT Analysis</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        <div style="background:#0d2318;border:1px solid #1a4030;border-radius:8px;padding:14px;">
          <div style="font-size:10px;font-weight:700;color:#4ade80;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:8px;">Strong (≥70%)</div>
          ${strong.length > 0 ? strong.map(c => `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;">
              <span style="font-size:11px;color:#d1fae5;flex:1;padding-right:8px;line-height:1.4;">${c.name}</span>
              <span style="font-size:11px;font-weight:700;color:#4ade80;white-space:nowrap;">${c.pct}%</span>
            </div>`).join('') : '<div style="font-size:11px;color:#4a4138;">No strong chapters yet</div>'}
        </div>
        <div style="background:#1f0d0d;border:1px solid #3f1a1a;border-radius:8px;padding:14px;">
          <div style="font-size:10px;font-weight:700;color:#f87171;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:8px;">Weak (&lt;40%)</div>
          ${weak.length > 0 ? weak.map(c => `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;">
              <span style="font-size:11px;color:#fee2e2;flex:1;padding-right:8px;line-height:1.4;">${c.name}</span>
              <span style="font-size:11px;font-weight:700;color:#f87171;white-space:nowrap;">${c.pct}%</span>
            </div>`).join('') : '<div style="font-size:11px;color:#4a4138;">No weak chapters — great!</div>'}
        </div>
      </div>
    </div>` : '';

  // ── CHAPTER BREAKDOWN ──
  const chBreakHtml = breakdown.length > 0 ? `
    <div style="margin-bottom:24px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--cream-muted);margin-bottom:12px;">Chapter Breakdown</div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        ${breakdown.map(c => {
          const barW = c.pct;
          const barColor = c.pct >= 70 ? '#4ade80' : c.pct >= 40 ? '#c9a84c' : '#f87171';
          return `
          <div style="background:var(--bg-2);border:1px solid var(--border);border-radius:7px;padding:10px 14px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
              <span style="font-size:12px;color:var(--cream-2);flex:1;padding-right:12px;line-height:1.4;">${c.name}</span>
              <span style="font-size:11px;font-weight:700;color:${barColor};white-space:nowrap;">${c.correct}/${c.total} (${c.pct}%)</span>
            </div>
            <div style="height:4px;background:var(--bg-4);border-radius:2px;overflow:hidden;">
              <div style="height:100%;width:${barW}%;background:${barColor};border-radius:2px;transition:width 0.6s ease;"></div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>` : '';

  // ── PERFORMANCE CHART ──
  let chartHtml = '';
  if (sameSubject.length > 1) {
    const chartData = sameSubject.slice(-10); // last 10 tests
    const maxPct = 100;
    const chartH = 80;
    const points = chartData.map((d, i) => {
      const x = (i / (chartData.length - 1)) * 280;
      const y = chartH - (d.pct / maxPct) * chartH;
      return { x, y, pct: d.pct, date: d.date };
    });
    const polyline = points.map(p => `${p.x},${p.y}`).join(' ');
    const areaPoints = `0,${chartH} ${polyline} ${280},${chartH}`;

    const dots = points.map(p => `
      <circle cx="${p.x}" cy="${p.y}" r="4" fill="#c9a84c" stroke="#1a1410" stroke-width="2">
        <title>${p.pct}% on ${p.date}</title>
      </circle>
      <text x="${p.x}" y="${p.y - 8}" text-anchor="middle" font-size="9" fill="#c9a84c">${p.pct}%</text>
    `).join('');

    chartHtml = `
      <div style="margin-bottom:24px;">
        <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--cream-muted);margin-bottom:12px;">Performance History — ${r.subject}</div>
        <div style="background:var(--bg-2);border:1px solid var(--border);border-radius:8px;padding:16px;">
          <svg width="100%" viewBox="0 0 300 100" preserveAspectRatio="xMidYMid meet" style="overflow:visible;">
            <!-- Grid lines -->
            <line x1="0" y1="0"  x2="280" y2="0"  stroke="#3a2f22" stroke-width="1" stroke-dasharray="3,3"/>
            <line x1="0" y1="20" x2="280" y2="20" stroke="#3a2f22" stroke-width="1" stroke-dasharray="3,3"/>
            <line x1="0" y1="40" x2="280" y2="40" stroke="#3a2f22" stroke-width="1" stroke-dasharray="3,3"/>
            <line x1="0" y1="60" x2="280" y2="60" stroke="#3a2f22" stroke-width="1" stroke-dasharray="3,3"/>
            <line x1="0" y1="80" x2="280" y2="80" stroke="#3a2f22" stroke-width="1" stroke-dasharray="3,3"/>
            <!-- Y labels -->
            <text x="285" y="4"  font-size="8" fill="#4a4138">100%</text>
            <text x="285" y="24" font-size="8" fill="#4a4138">80%</text>
            <text x="285" y="44" font-size="8" fill="#4a4138">60%</text>
            <text x="285" y="64" font-size="8" fill="#4a4138">40%</text>
            <text x="285" y="84" font-size="8" fill="#4a4138">20%</text>
            <!-- Area fill -->
            <polygon points="${areaPoints}" fill="rgba(201,168,76,0.08)"/>
            <!-- Line -->
            <polyline points="${polyline}" fill="none" stroke="#c9a84c" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
            <!-- Dots + labels -->
            ${dots}
          </svg>
          <div style="font-size:10px;color:#4a4138;text-align:center;margin-top:4px;">Last ${chartData.length} tests</div>
        </div>
      </div>`;
  }

  // ── TIME PER QUESTION ──
  const hasTime = r.questions && r.questions.some(q => q.timeSpent > 0);
  let timeHtml = '';
  if (hasTime) {
    const avgT = r.avgTime || 0;
    const slowQs = r.questions
      .map((q, i) => ({ ...q, idx: i }))
      .filter(q => q.timeSpent > avgT * 2 && q.timeSpent > 30)
      .sort((a, b) => b.timeSpent - a.timeSpent)
      .slice(0, 5);

    timeHtml = `
      <div style="margin-bottom:24px;">
        <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--cream-muted);margin-bottom:12px;">Time Analysis</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px;">
          <div style="background:var(--bg-2);border:1px solid var(--border);border-radius:7px;padding:12px;text-align:center;">
            <div style="font-size:18px;font-weight:700;color:var(--gold);">${r.timeTaken}</div>
            <div style="font-size:10px;color:var(--cream-muted);margin-top:2px;">Total Time</div>
          </div>
          <div style="background:var(--bg-2);border:1px solid var(--border);border-radius:7px;padding:12px;text-align:center;">
            <div style="font-size:18px;font-weight:700;color:var(--gold);">${avgT}s</div>
            <div style="font-size:10px;color:var(--cream-muted);margin-top:2px;">Avg per Question</div>
          </div>
          <div style="background:var(--bg-2);border:1px solid var(--border);border-radius:7px;padding:12px;text-align:center;">
            <div style="font-size:18px;font-weight:700;color:${slowQs.length > 0 ? '#f87171' : '#4ade80'};">${slowQs.length}</div>
            <div style="font-size:10px;color:var(--cream-muted);margin-top:2px;">Slow Questions</div>
          </div>
        </div>
        ${slowQs.length > 0 ? `
        <div style="font-size:11px;color:var(--cream-muted);margin-bottom:8px;">Questions where you spent the most time:</div>
        ${slowQs.map(q => `
          <div style="display:flex;justify-content:space-between;align-items:center;
            background:var(--bg-2);border:1px solid var(--border);border-radius:6px;
            padding:8px 12px;margin-bottom:5px;">
            <span style="font-size:12px;color:var(--cream-2);">Q${q.idx + 1} — ${q.section}</span>
            <span style="font-size:12px;font-weight:700;color:#f87171;white-space:nowrap;">${q.timeSpent}s</span>
          </div>`).join('')}` : ''}
      </div>`;
  }

  container.innerHTML = swotHtml + chartHtml + chBreakHtml + timeHtml;
}

function closeReview() {
  document.getElementById('reviewscreen').style.display = 'none';
  showView('dashboard');
  setTimeout(() => {
    switchTab(null, 'tab-results');
    renderResultsList();
  }, 80);
}

function filterReview(filter) {
  currentReviewFilter = filter;
  document.querySelectorAll('.review-filter').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('rf-' + filter);
  if (btn) btn.classList.add('active');
  renderReviewQuestions(filter);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderReviewQuestions(filter) {
  if (!currentReviewResult) return;
  const list = document.getElementById('reviewQuestionsList');
  if (!list) return;

  const labels = ['A','B','C','D'];
  let html = '';
  let shown = 0;

  currentReviewResult.questions.forEach((q, i) => {
    if (filter !== 'all' && q.status !== filter) return;
    shown++;

    // Card left border colour by status
    const borderColor = q.status === 'correct' ? '#4ade80' : q.status === 'wrong' ? '#f87171' : '#475569';
    const statusBg    = q.status === 'correct' ? 'rgba(74,222,128,0.12)' : q.status === 'wrong' ? 'rgba(248,113,113,0.12)' : 'rgba(148,163,184,0.08)';
    const statusColor = q.status === 'correct' ? '#4ade80' : q.status === 'wrong' ? '#f87171' : '#94a3b8';
    const statusText  = q.status === 'correct' ? '✓ Correct' : q.status === 'wrong' ? '✗ Wrong' : '— Skipped';

    // Build options
    let optsHtml = '';
    q.options.forEach((opt, oi) => {
      const isCorrect    = oi === q.correct;
      const isUserWrong  = oi === q.userAnswer && q.userAnswer !== q.correct;
      const isUserAnswer = oi === q.userAnswer;

      let bg = 'transparent', border = '#3a2f22', color = '#b8a990', lblBg = '#2a2018', lblColor = '#7a6e61';
      let suffix = '';

      if (isCorrect) {
        bg = 'rgba(74,222,128,0.12)'; border = '#4ade80'; color = '#dcfce7';
        lblBg = '#4ade80'; lblColor = '#052e16';
        suffix = `<span style="margin-left:auto;font-size:10px;font-weight:700;color:#4ade80;white-space:nowrap;">✓ Correct Answer</span>`;
      }
      if (isUserWrong) {
        bg = 'rgba(248,113,113,0.12)'; border = '#f87171'; color = '#fee2e2';
        lblBg = '#f87171'; lblColor = '#450a0a';
        suffix = `<span style="margin-left:auto;font-size:10px;font-weight:700;color:#f87171;white-space:nowrap;">✗ Your Answer</span>`;
      }
      // If user answered correctly — already handled by isCorrect + show "Your Answer" label too
      if (isCorrect && isUserAnswer && q.status === 'correct') {
        suffix = `<span style="margin-left:auto;font-size:10px;font-weight:700;color:#4ade80;white-space:nowrap;">✓ Your Answer</span>`;
      }

      optsHtml += `
        <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:7px;
          border:1px solid ${border};background:${bg};margin-bottom:6px;">
          <span style="width:24px;height:24px;min-width:24px;border-radius:50%;
            display:flex;align-items:center;justify-content:center;
            font-size:11px;font-weight:700;background:${lblBg};color:${lblColor};">${labels[oi]}</span>
          <span style="font-size:clamp(12px,1.2vw,14px);color:${color};flex:1;line-height:1.5;">${opt}</span>
          ${suffix}
        </div>`;
    });

    // Explanation — always shown
    const expHtml = q.explanation ? `
      <div style="margin-top:12px;padding:12px 16px;background:#1a1510;
        border-left:3px solid #c9a84c;border-radius:0 6px 6px 0;">
        <div style="font-size:10px;font-weight:700;letter-spacing:0.08em;
          text-transform:uppercase;color:#c9a84c;margin-bottom:6px;">Explanation</div>
        <div style="font-size:clamp(12px,1.1vw,13.5px);color:#b8a990;line-height:1.7;">${q.explanation}</div>
      </div>` : '';

    html += `
      <div style="background:#221c17;border:1px solid #3a2f22;border-left:4px solid ${borderColor};
        border-radius:10px;padding:clamp(14px,2vw,20px);margin-bottom:14px;">

        <!-- Q number + section + status tag -->
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;flex-wrap:wrap;">
          <span style="font-family:var(--font-mono);font-size:11px;font-weight:700;
            color:var(--cream-faint);">Q${i+1}</span>
          <span style="font-size:11px;color:var(--gold);flex:1;min-width:0;
            white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${q.section}</span>
          ${q.timeSpent ? `<span style="font-size:10px;color:var(--cream-faint);white-space:nowrap;">⏱ ${q.timeSpent}s</span>` : ''}
          <span style="font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px;
            background:${statusBg};color:${statusColor};white-space:nowrap;">${statusText}</span>
        </div>

        <!-- Question text -->
        <div style="font-size:clamp(13px,1.3vw,15px);font-weight:500;color:#f2ead8;
          line-height:1.75;margin-bottom:14px;">${q.text}</div>

        <!-- Options -->
        <div>${optsHtml}</div>

        <!-- Explanation -->
        ${expHtml}
      </div>`;
  });

  if (shown === 0) {
    html = `<div style="text-align:center;padding:48px 24px;">
      <div style="font-size:15px;font-weight:600;color:var(--cream-2);margin-bottom:8px;">No ${filter} questions</div>
      <div style="font-size:13px;color:var(--cream-muted);">Nothing matches this filter.</div>
    </div>`;
  }

  list.innerHTML = html;
}

// showView handles exam startup directly — see VIEW SYSTEM above
// ── INIT: show landing page correctly on load ──
(function init() {
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
})();

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ══════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════
// CURRENT AFFAIRS MODULE
// Data source: ./current-affairs/data.json
// JSON format: [{ date, headline, description, category, source, url, important }]
// ══════════════════════════════════════════════════════════
var CA = {
  DATA_URL: './current-affairs/data.json',

  MONTHS_SHORT: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  MONTHS_FULL:  ['January','February','March','April','May','June','July','August','September','October','November','December'],
  CATS: ['All','National','International','Economy','Science & Tech','Sports','Awards'],

  state: {
    year:        new Date().getFullYear(),
    month:       new Date().getMonth(),
    cat:         'All',
    search:      '',
    allArticles: [],
    articles:    [],
    loaded:      false
  },

  init() {
    this.buildYearTabs();
    this.buildMonthPills();
    this.buildCatFilters();
    this.setupSearch();
    if (!this.state.loaded) {
      this.loadData();
    } else {
      this.filterByMonth();
      this.renderFeed();
    }
  },

  async loadData() {
    this.showSkeleton();
    try {
      const res = await fetch(this.DATA_URL + '?v=' + Date.now());
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const raw = await res.json();
      this.state.allArticles = raw.map(a => {
        const dateStr = (a.date || '').slice(0, 10);
        const d = new Date(dateStr + 'T12:00:00');
        return {
          dateStr,
          year:        d.getFullYear(),
          month:       d.getMonth(),
          displayDate: d.toLocaleDateString('en-IN', {day:'numeric', month:'short', year:'numeric'}),
          headline:    a.headline    || 'Untitled',
          description: a.description || '',
          category:    a.category    || 'National',
          source:      a.source      || '',
          url:         a.url         || '',
          important:   !!a.important
        };
      }).filter(a => a.dateStr);
      this.state.loaded = true;
      this.buildYearTabs();
      this.filterByMonth();
      this.renderFeed();
    } catch(err) {
      document.getElementById('ca-feed').innerHTML =
        '<div style="text-align:center;padding:40px 20px;">' +
        '<div style="margin-bottom:10px;"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4a4032" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg></div>' +
        '<div style="font-size:14px;font-weight:600;color:var(--cream-2);margin-bottom:8px;">No data file found</div>' +
        '<div style="font-size:12px;color:var(--cream-muted);line-height:1.8;">' +
        'Upload your JSON file to the repo at:<br>' +
        '<code style="color:var(--gold);font-family:var(--font-mono);">current-affairs/data.json</code>' +
        '</div></div>';
    }
  },

  filterByMonth() {
    this.state.articles = this.state.allArticles.filter(
      a => a.year === this.state.year && a.month === this.state.month
    );
  },

  buildYearTabs() {
    const cur = new Date().getFullYear();
    const yearsInData = [...new Set(this.state.allArticles.map(a => a.year))];
    const years = [...new Set([cur - 1, cur, ...yearsInData])].sort();
    const el = document.getElementById('ca-year-tabs');
    if (!el) return;
    el.innerHTML = years.map(y =>
      '<button class="ca-year-tab' + (y === this.state.year ? ' active' : '') + '" onclick="CA.selectYear(' + y + ')">' + y + '</button>'
    ).join('');
  },

  buildMonthPills() {
    const now = new Date();
    const curY = now.getFullYear(), curM = now.getMonth();
    const el = document.getElementById('ca-month-pills');
    if (!el) return;
    el.innerHTML = this.MONTHS_SHORT.map((m, i) => {
      const future = this.state.year > curY || (this.state.year === curY && i > curM);
      const activeClass = i === this.state.month ? ' active' : '';
      const futureClass = future ? ' future' : '';
      const clickHandler = future ? '' : 'CA.selectMonth(' + i + ')';
      return '<button class="ca-month-pill' + activeClass + futureClass + '" onclick="' + clickHandler + '">' + m + '</button>';
    }).join('');
  },

  buildCatFilters() {
    const el = document.getElementById('ca-cat-filters');
    if (!el) return;
    el.innerHTML = this.CATS.map(c => {
      const isActiveAll = c === 'All' && this.state.cat === 'All';
      const isActive = c === this.state.cat && c !== 'All';
      const cls = isActiveAll ? ' ca-active-all' : isActive ? ' ca-active' : '';
      return '<button class="ca-cat-btn' + cls + '" onclick="CA.selectCat(\'' + c + '\')">' + c + '</button>';
    }).join('');
  },

  setupSearch() {
    const el = document.getElementById('ca-search');
    if (!el || el.dataset.bound) return;
    el.dataset.bound = '1';
    let t;
    el.addEventListener('input', function() {
      clearTimeout(t);
      t = setTimeout(function() { CA.state.search = el.value.trim().toLowerCase(); CA.renderFeed(); }, 220);
    });
  },

  selectYear(y) {
    this.state.year = y;
    this.state.month = (y === new Date().getFullYear()) ? new Date().getMonth() : 0;
    this.buildYearTabs();
    this.buildMonthPills();
    this.filterByMonth();
    this.renderFeed();
  },

  selectMonth(m) {
    this.state.month = m;
    this.buildMonthPills();
    this.filterByMonth();
    this.renderFeed();
  },

  selectCat(c) {
    this.state.cat = c;
    this.buildCatFilters();
    this.renderFeed();
  },

  renderFeed() {
    var arts = this.state.articles.slice();
    if (this.state.cat !== 'All') arts = arts.filter(function(a) { return a.category === CA.state.cat; });
    if (this.state.search) {
      var q = this.state.search;
      arts = arts.filter(function(a) {
        return a.headline.toLowerCase().indexOf(q) !== -1 || a.description.toLowerCase().indexOf(q) !== -1;
      });
    }

    var feed = document.getElementById('ca-feed');
    if (!feed) return;

    if (!arts.length) {
      var mname = this.MONTHS_FULL[this.state.month] + ' ' + this.state.year;
      feed.innerHTML = '<div style="text-align:center;padding:40px 20px;color:var(--cream-muted);">' +
        '<div style="margin-bottom:8px;"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4a4032" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>' +
        '<div style="font-size:14px;font-weight:600;color:var(--cream-2);margin-bottom:4px;">No articles for ' + mname + '</div>' +
        '<div style="font-size:12px;">Try a different month or category.</div></div>';
      this.updateSub(0);
      return;
    }

    var grouped = {};
    arts.forEach(function(a) {
      if (!grouped[a.dateStr]) grouped[a.dateStr] = [];
      grouped[a.dateStr].push(a);
    });
    var dates = Object.keys(grouped).sort(function(a, b) { return b < a ? -1 : b > a ? 1 : 0; });

    var html = '';
    var self = this;
    dates.forEach(function(ds) {
      var d = new Date(ds + 'T12:00:00');
      var label = d.toLocaleDateString('en-IN', {weekday:'short', day:'numeric', month:'long'});
      html += '<div class="ca-date-label">' + label + '</div>';
      grouped[ds].forEach(function(a) {
        var cc = (a.category || '').replace(' & ', '').replace(' ', '');
        html += '<div class="ca-card' + (a.important ? ' ca-important' : '') + '">';
        html += '<div class="ca-card-top">';
        html += '<div class="ca-headline">' + self.esc(a.headline) + '</div>';
        html += '<div class="ca-badges">';
        if (a.important) html += '<span class="ca-star">Exam</span>';
        html += '<span class="ca-cat ' + cc + '">' + self.esc(a.category) + '</span>';
        html += '</div></div>';
        if (a.description) html += '<div class="ca-desc">' + self.esc(a.description) + '</div>';
        html += '<div class="ca-source">';
        if (a.source) html += self.esc(a.source) + ' · ';
        html += a.displayDate;
        if (a.url) html += ' · <a href="' + self.esc(a.url) + '" target="_blank" rel="noopener">Read ↗</a>';
        html += '</div></div>';
      });
    });

    feed.innerHTML = html;
    this.updateSub(arts.length);
  },

  showSkeleton() {
    var feed = document.getElementById('ca-feed');
    if (!feed) return;
    var s = '';
    for (var i = 0; i < 5; i++) {
      s += '<div class="ca-skel">' +
        '<div class="ca-skel-line" style="height:14px;width:72%;margin-bottom:9px;"></div>' +
        '<div class="ca-skel-line" style="height:12px;width:100%;margin-bottom:5px;"></div>' +
        '<div class="ca-skel-line" style="height:12px;width:58%;"></div>' +
        '</div>';
    }
    feed.innerHTML = s;
  },

  updateSub(count) {
    var el = document.getElementById('ca-article-count');
    if (el) el.textContent = count + ' articles · ' + this.MONTHS_FULL[this.state.month] + ' ' + this.state.year;
  },

  esc(s) {
    return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
};

function caInit() { CA.init(); }
function caOnSearch(v) { CA.state.search = v.trim().toLowerCase(); CA.renderFeed(); }

// ════════════════════════════════════
// BOOKMARK / SAVED QUESTIONS
// ════════════════════════════════════
const BOOKMARKS_KEY = 'cuetace_bookmarks';

function getActiveBookmarks() {
  return cloudBookmarksCache || getBookmarks();
}

function normalizeBookmarkForSync(bookmark) {
  const key = String(bookmark.key || bookmark.questionId || bookmark.text || ('bookmark-' + Date.now()));
  return { ...bookmark, key };
}

async function saveBookmarkToCloud(bookmark) {
  if (!cuetaceUser || !firebaseFns) return;
  const saveUserBookmark = firebaseFns.httpsCallable('saveUserBookmark');
  await saveUserBookmark({ bookmark });
  if (cloudBookmarksCache) {
    cloudBookmarksCache = mergeUniqueByKey([bookmark], cloudBookmarksCache, 'key').slice(0, 200);
  }
}

async function deleteBookmarkFromCloud(key) {
  if (!cuetaceUser || !firebaseFns) return;
  const deleteUserBookmark = firebaseFns.httpsCallable('deleteUserBookmark');
  await deleteUserBookmark({ key });
  if (cloudBookmarksCache) {
    cloudBookmarksCache = cloudBookmarksCache.filter(item => String(item.key) !== String(key));
  }
}

async function loadCloudBookmarks() {
  if (!cuetaceUser || !firebaseFns) return getBookmarks();
  if (cloudBookmarksCache) return cloudBookmarksCache;
  try {
    const listUserBookmarks = firebaseFns.httpsCallable('listUserBookmarks');
    const response = await listUserBookmarks({ limit: 200 });
    cloudBookmarksCache = mergeUniqueByKey(response.data.bookmarks || [], getBookmarks(), 'key').slice(0, 200);
    return cloudBookmarksCache;
  } catch (err) {
    console.warn('[CUETAce] Could not load cloud bookmarks', err);
    return getBookmarks();
  }
}

async function migrateLocalBookmarksToCloud() {
  if (!cuetaceUser || !firebaseFns) return;
  const localBookmarks = getBookmarks();
  if (!localBookmarks.length) return;
  const saveUserBookmark = firebaseFns.httpsCallable('saveUserBookmark');
  await Promise.all(localBookmarks.slice(0, 200).map(bookmark => saveUserBookmark({ bookmark }).catch(err => {
    console.warn('[CUETAce] Could not migrate bookmark', err);
  })));
  cloudBookmarksCache = null;
}

async function refreshCloudProgress() {
  if (!cuetaceUser || !firebaseFns) return;
  await Promise.all([loadCloudResults(), loadCloudBookmarks()]);
  updateSavedBadge();
}

async function migrateLocalProgressToCloud() {
  if (cloudProgressMigrated || !cuetaceUser || !firebaseFns) return;
  cloudProgressMigrated = true;
  await Promise.all([migrateLocalResultsToCloud(), migrateLocalBookmarksToCloud()]);
}

function getBookmarks() {
  try { return JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '[]'); }
  catch(e) { return []; }
}
function saveBookmarks(arr) {
  try { localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(arr)); }
  catch(e) { try { localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(arr.slice(0,50))); } catch(e2) {} }
  if (cuetaceUser) cloudBookmarksCache = mergeUniqueByKey(arr, cloudBookmarksCache || [], 'key').slice(0, 200);
  updateSavedBadge();
}
function isBookmarked(key) { return getActiveBookmarks().some(b => b.key === key); }

function getQuestionBookmarkKey(q) {
  return String(q.id || q.text || ('question-' + examState.currentQ));
}

function buildBookmarkFromCurrentQuestion() {
  const q = EXAM_QUESTIONS[examState.currentQ];
  if (!q) return null;
  return normalizeBookmarkForSync({
    key: getQuestionBookmarkKey(q),
    subject: examState.subject,
    savedAt: new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}),
    chapter_id: q.chapter_id || '',
    section: q.section || '',
    text: q.text || '',
    options: q.options || [],
    correct: q.correct,
    explanation: q.explanation || '',
    type: q.type || 'mcq',
    passage: q.passage || '',
    sentence: q.sentence || '',
    statements: q.statements || null,
    column_i: q.column_i || null,
    column_ii: q.column_ii || null,
    image: q.image || '',
    table: q.table || null,
    data: q.data || null
  });
}

function renderSavedTabIfOpen() {
  const tab = document.getElementById('tab-saved');
  if (tab && tab.classList.contains('active')) {
    renderSavedQuestions();
  }
}

function toggleBookmark() {
  const bookmark = buildBookmarkFromCurrentQuestion();
  if (!bookmark) return;
  const key = bookmark.key;
  const bookmarks = [...getActiveBookmarks()];
  const existing = bookmarks.findIndex(b => String(b.key) === String(key));
  if (existing >= 0) {
    bookmarks.splice(existing, 1);
    deleteBookmarkFromCloud(key).catch(err => console.warn('[CUETAce] Could not delete cloud bookmark', err));
    showAppToast('Removed from Saved Questions.', 'success');
  } else {
    bookmarks.unshift(bookmark);
    saveBookmarkToCloud(bookmark).catch(err => console.warn('[CUETAce] Could not save cloud bookmark', err));
    if (bookmarks.length > 200) bookmarks.splice(200);
    showAppToast('Saved for revision.', 'success');
  }
  cloudBookmarksCache = cuetaceUser ? bookmarks : cloudBookmarksCache;
  saveBookmarks(bookmarks);
  updateBookmarkBtn();
  renderSavedTabIfOpen();
}

function updateBookmarkBtn() {
  const q = EXAM_QUESTIONS[examState.currentQ];
  if (!q) return;
  const key = getQuestionBookmarkKey(q);
  const btn = document.getElementById('btnBookmark');
  if (!btn) return;
  const saved = isBookmarked(key);
  btn.classList.toggle('bookmarked', saved);
  const heartFill = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
  const heartEmpty = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
  btn.innerHTML = saved ? heartFill : heartEmpty;
  btn.title = saved ? 'Remove bookmark' : 'Save question';
}

function updateSavedBadge() {
  const count = getActiveBookmarks().length;
  const badge = document.getElementById('savedCountBadge');
  const mobileBadge = document.getElementById('mobileSavedCountBadge');
  const text = count > 99 ? '99+' : count;
  if (badge) {
    badge.textContent = text;
    badge.style.display = count > 0 ? '' : 'none';
  }
  if (mobileBadge) {
    mobileBadge.textContent = text;
    mobileBadge.style.display = count > 0 ? 'inline-flex' : 'none';
  }
}

function renderSavedQuestionsHtml(bookmarks) {
  if (!bookmarks.length) {
    return '<div class="empty-state" style="margin-top:40px;"><div class="empty-line"></div><div class="empty-title">No saved questions yet</div><div class="empty-desc">Tap the bookmark icon during any test to save tricky questions for later review.</div><button class="empty-btn" onclick="switchTab(null,\'tab-mock\')">Start a Test</button></div>';
  }
  let html = '';
  bookmarks.forEach((b, i) => {
    try {
    const opts = savedOptionsList(b.options).map((o,oi) => {
      const ltr = ['A','B','C','D'][oi] || oi;
      const isCorrect = oi === savedCorrectIndex(b.correct);
      return '<div class="saved-q-opt'+(isCorrect?' correct':'')+'">'+ltr+'. '+esc(o)+'</div>';
    }).join('');
    const body = renderSavedQuestionBody(b);
    const exp = b.explanation ? '<div class="saved-q-exp">'+esc(b.explanation)+'</div>' : '';
    const expBtn = b.explanation ? '<button class="inner-nav-btn" onclick="toggleSavedExp('+i+')" style="font-size:10px;margin-top:6px;padding:4px 10px;">Show Explanation</button>' : '';
    html += '<div class="saved-q-item" id="savedItem'+i+'"><div class="saved-q-header"><div><div class="saved-q-meta">'+esc(b.subject||'Saved')+' &middot; '+esc(b.section||b.chapter_id||'Practice')+' &middot; '+esc(b.savedAt||'')+'</div>'+body+'</div><button class="saved-q-remove" onclick="removeBookmark('+i+')" title="Remove"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div><div class="saved-q-opts">'+opts+'</div>'+exp+expBtn+'</div>';
    } catch(e) {
      console.warn('[CUETAce] Could not render saved question', i, e, b);
      html += '<div class="saved-q-item" id="savedItem'+i+'"><div class="saved-q-header"><div><div class="saved-q-meta">Saved question</div><div class="saved-q-text">This saved question uses an older format. Remove it and save it again from the test screen.</div></div><button class="saved-q-remove" onclick="removeBookmark('+i+')" title="Remove"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div></div>';
    }
  });
  return html;
}

async function renderSavedQuestions() {
  const container = document.getElementById('savedContainer');
  if (!container) return;
  const immediateBookmarks = getActiveBookmarks();
  if (immediateBookmarks.length) {
    container.innerHTML = renderSavedQuestionsHtml(immediateBookmarks);
  }
  const bookmarks = await loadCloudBookmarks();
  updateSavedBadge();
  container.innerHTML = renderSavedQuestionsHtml(bookmarks);
}

function savedOptionsList(options) {
  if (Array.isArray(options)) return options.map(savedOptionText);
  if (options && typeof options === 'object') return Object.values(options).map(savedOptionText);
  return [];
}

function savedOptionText(option) {
  if (option == null) return '';
  if (typeof option === 'string' || typeof option === 'number') return String(option);
  if (typeof option === 'object') return option.text || option.label || option.value || JSON.stringify(option);
  return String(option);
}

function savedCorrectIndex(correct) {
  if (typeof correct === 'number') return correct;
  if (typeof correct === 'string') {
    const n = Number(correct);
    if (!Number.isNaN(n)) return n;
    const letter = correct.trim().toUpperCase();
    const idx = ['A','B','C','D'].indexOf(letter);
    if (idx >= 0) return idx;
  }
  return -1;
}

function renderSavedQuestionBody(b) {
  let html = '';
  if (b.passage) {
    html += '<div class="saved-q-text" style="font-size:12px;color:var(--cream-muted);margin-bottom:8px;">'+esc(b.passage)+'</div>';
  }
  if (b.sentence) {
    html += '<div class="saved-q-text" style="font-size:12px;color:var(--cream-muted);margin-bottom:8px;font-style:italic;">'+esc(b.sentence)+'</div>';
  }
  html += '<div class="saved-q-text">'+esc(b.text || b.question || 'Saved question')+'</div>';
  if (b.statements && typeof b.statements === 'object') {
    html += '<div class="saved-q-opts" style="margin-top:8px;">';
    Object.entries(b.statements).forEach(([key, val]) => {
      html += '<div class="saved-q-opt">'+esc(key)+'. '+esc(val)+'</div>';
    });
    html += '</div>';
  }
  if (b.column_i && b.column_ii) {
    html += '<div class="saved-q-opts" style="margin-top:8px;">';
    Object.entries(b.column_i).forEach(([key, val]) => {
      html += '<div class="saved-q-opt">I '+esc(key)+'. '+esc(val)+'</div>';
    });
    Object.entries(b.column_ii).forEach(([key, val]) => {
      html += '<div class="saved-q-opt">II '+esc(key)+'. '+esc(val)+'</div>';
    });
    html += '</div>';
  }
  return html;
}

function toggleSavedExp(i) {
  const item = document.getElementById('savedItem'+i);
  if (!item) return;
  item.classList.toggle('expanded');
  const btn = item.querySelector('.inner-nav-btn');
  if (btn) btn.textContent = item.classList.contains('expanded') ? 'Hide Explanation' : 'Show Explanation';
}

function removeBookmark(i) {
  const b = [...getActiveBookmarks()];
  const removed = b.splice(i,1)[0];
  cloudBookmarksCache = cuetaceUser ? b : cloudBookmarksCache;
  saveBookmarks(b);
  if (removed?.key) deleteBookmarkFromCloud(removed.key).catch(err => console.warn('[CUETAce] Could not delete cloud bookmark', err));
  renderSavedQuestions();
}

window.addEventListener('load', function() { updateSavedBadge(); });
