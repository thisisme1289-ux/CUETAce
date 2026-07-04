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
  const pending = restorePendingAuthView();
  const next = pending ? 'continue' : 'profile';
  await firebaseAuth.sendSignInLinkToEmail(email, {
    url: window.location.origin + window.location.pathname + '?login=1&next=' + encodeURIComponent(next),
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
  setTimeout(continuePendingAuthView, 250);
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
  if (!cuetaceUser) return;
  if (!next) {
    const params = new URLSearchParams(window.location.search || '');
    if (params.get('next') === 'profile') {
      profileModalRequired = false;
      openProfileModal();
    }
    return;
  }
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
