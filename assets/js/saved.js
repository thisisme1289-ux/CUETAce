// BOOKMARK / SAVED QUESTIONS
// ════════════════════════════════════
const BOOKMARKS_KEY = 'cuetace_bookmarks';
const savedQuestionFilters = { search: '', subject: 'All' };

function getActiveBookmarks() {
  return mergeUniqueByKey(cloudBookmarksCache || [], getBookmarks(), 'key').slice(0, 200);
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

function mergeBookmarkSources(...sources) {
  return sources.reduce((merged, source) => mergeUniqueByKey(merged, source || [], 'key'), []).slice(0, 200);
}

function filterSavedQuestions(bookmarks) {
  const q = savedQuestionFilters.search.trim().toLowerCase();
  return bookmarks.filter(b => {
    if (savedQuestionFilters.subject !== 'All' && (b.subject || 'Saved') !== savedQuestionFilters.subject) return false;
    if (!q) return true;
    return [
      b.subject,
      b.section,
      b.chapter_id,
      b.text,
      b.question,
      b.explanation
    ].join(' ').toLowerCase().includes(q);
  });
}

function updateSavedSubjectFilter(bookmarks) {
  const select = document.getElementById('savedSubjectFilter');
  if (!select) return;
  const current = savedQuestionFilters.subject;
  const subjects = [...new Set(bookmarks.map(b => b.subject || 'Saved'))].sort();
  select.innerHTML = '<option value="All">All subjects</option>' + subjects.map(s =>
    '<option value="' + esc(s) + '">' + esc(s) + '</option>'
  ).join('');
  select.value = subjects.includes(current) ? current : 'All';
  savedQuestionFilters.subject = select.value;
}

function renderSavedQuestionsHtml(bookmarks) {
  if (!bookmarks.length) {
    const hasFilters = savedQuestionFilters.search || savedQuestionFilters.subject !== 'All';
    return '<div class="empty-state" style="margin-top:40px;"><div class="empty-line"></div><div class="empty-title">' + (hasFilters ? 'No saved questions match' : 'No saved questions yet') + '</div><div class="empty-desc">' + (hasFilters ? 'Clear the search or subject filter to see more saved questions.' : 'Tap the bookmark icon during any test to save tricky questions for later review.') + '</div><button class="empty-btn" onclick="switchTab(null,\'tab-mock\')">Start a Test</button></div>';
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
    html += '<div class="saved-q-item" id="savedItem'+i+'" data-bookmark-key="'+esc(b.key || '')+'"><div class="saved-q-header"><div><div class="saved-q-meta">'+esc(b.subject||'Saved')+' &middot; '+esc(b.section||b.chapter_id||'Practice')+' &middot; '+esc(b.savedAt||'')+'</div>'+body+'</div><button class="saved-q-remove" onclick="removeBookmarkByKey(\''+escJs(b.key)+'\')" title="Remove"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div><div class="saved-q-opts">'+opts+'</div><div style="display:flex;gap:8px;flex-wrap:wrap;">'+expBtn+'<button class="inner-nav-btn" onclick="reportSavedQuestion(\''+escJs(b.key)+'\')" style="font-size:10px;margin-top:6px;padding:4px 10px;">Report Issue</button></div>'+exp+'</div>';
    } catch(e) {
      console.warn('[CUETAce] Could not render saved question', i, e, b);
      html += '<div class="saved-q-item" id="savedItem'+i+'"><div class="saved-q-header"><div><div class="saved-q-meta">Saved question</div><div class="saved-q-text">This saved question uses an older format. Remove it and save it again from the test screen.</div></div><button class="saved-q-remove" onclick="removeBookmarkByKey(\''+escJs(b.key)+'\')" title="Remove"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div></div>';
    }
  });
  return html;
}

async function renderSavedQuestions() {
  const container = document.getElementById('savedContainer');
  if (!container) return;
  const immediateBookmarks = mergeBookmarkSources(getActiveBookmarks(), getBookmarks());
  updateSavedSubjectFilter(immediateBookmarks);
  container.innerHTML = renderSavedQuestionsHtml(filterSavedQuestions(immediateBookmarks));
  const loadedBookmarks = await loadCloudBookmarks();
  const bookmarks = mergeBookmarkSources(loadedBookmarks, immediateBookmarks, getBookmarks());
  updateSavedSubjectFilter(bookmarks);
  updateSavedBadge();
  container.innerHTML = renderSavedQuestionsHtml(filterSavedQuestions(bookmarks));
  if (typeof renderQuestionReportsPanel === 'function') renderQuestionReportsPanel();
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

function removeBookmarkByKey(key) {
  const bookmarks = [...getActiveBookmarks()];
  const index = bookmarks.findIndex(b => String(b.key) === String(key));
  if (index < 0) return;
  removeBookmark(index);
}

function setSavedSearch(value) {
  savedQuestionFilters.search = String(value || '');
  renderSavedQuestions();
}

function setSavedSubject(value) {
  savedQuestionFilters.subject = value || 'All';
  renderSavedQuestions();
}

function savedBookmarkToQuestion(bookmark) {
  return {
    section: bookmark.section || bookmark.chapter_id || 'Saved Questions',
    text: bookmark.text || bookmark.question || 'Saved question',
    passage: bookmark.passage || '',
    sentence: bookmark.sentence || '',
    statements: bookmark.statements || null,
    column_i: bookmark.column_i || null,
    column_ii: bookmark.column_ii || null,
    options: savedOptionsList(bookmark.options),
    correct: savedCorrectIndex(bookmark.correct),
    explanation: bookmark.explanation || '',
    type: bookmark.type || 'MCQ'
  };
}

function startSavedPractice() {
  const bookmarks = filterSavedQuestions(getActiveBookmarks());
  if (!bookmarks.length) {
    showAppToast('Save a few questions first, or clear the current filter.', 'error');
    return;
  }
  const questions = bookmarks.map(savedBookmarkToQuestion).filter(q => q.options.length && q.correct >= 0);
  if (!questions.length) {
    showAppToast('Saved questions need options and an answer to become a practice set.', 'error');
    return;
  }
  startExamFromQuestionSet('Saved Questions Practice', bookmarks[0].subject || 'Saved', questions, 'saved');
}

function reportSavedQuestion(key) {
  const bookmark = getActiveBookmarks().find(b => String(b.key) === String(key));
  if (!bookmark) return;
  reportQuestionIssue({
    source: 'saved',
    subject: bookmark.subject || '',
    testName: 'Saved Questions',
    question: savedBookmarkToQuestion(bookmark)
  });
}

function focusSavedQuestion(key) {
  savedQuestionFilters.search = '';
  savedQuestionFilters.subject = 'All';
  showView('dashboard');
  switchTab(null, 'tab-saved');
  setTimeout(() => {
    const item = Array.from(document.querySelectorAll('[data-bookmark-key]'))
      .find(el => String(el.dataset.bookmarkKey) === String(key));
    if (!item) return;
    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
    item.style.boxShadow = '0 0 0 2px rgba(201,168,76,.65)';
    setTimeout(() => { item.style.boxShadow = ''; }, 1800);
  }, 350);
}

window.addEventListener('load', function() {
  updateSavedBadge();
  const savedTab = document.getElementById('tab-saved');
  if (savedTab && savedTab.classList.contains('active')) renderSavedQuestions();
});
