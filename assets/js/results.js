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

async function submitTest() {
  clearInterval(examState.timerInterval);
  closeSubmitModal();
  if (typeof ensureAllExamQuestionsLoaded === 'function') {
    try {
      await ensureAllExamQuestionsLoaded();
    } catch (err) {
      console.warn('[CUETAce] Could not prefetch all questions before submit', err);
    }
  }

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
    if (!q) {
      skipped++;
      continue;
    }
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
      reviewStatus: examState.status[i] || '',
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
    mode:             examState.mode || 'mock',
    pypMeta:          examState.pypMeta || null,
    chapterBreakdown: chapterBreakdown,
    questions:        snapshot
  };

  saveResult(result);
  if (typeof clearActiveExamAttempt === 'function') clearActiveExamAttempt();

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

async function openResultFromSearch(resultId) {
  showView('dashboard');
  switchTab(null, 'tab-results');
  const results = await loadCloudResults();
  visibleResultsCache = results;
  const idx = results.findIndex(r => String(r.id) === String(resultId));
  if (idx >= 0) {
    setTimeout(() => openReview(idx), 80);
  } else {
    showAppToast('Result list opened. That older result was not found in synced history.', 'error');
  }
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

  const weakChapters = (r.chapterBreakdown || [])
    .filter(ch => ch.total >= 2 && ch.pct < 70)
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 3);
  const markedCount = (r.questions || []).filter(q => q.reviewStatus === 'marked' || q.reviewStatus === 'ans-marked').length;
  const nextHtml = `
    <div style="margin-bottom:24px;background:var(--bg-2);border:1px solid var(--border);border-radius:8px;padding:14px 16px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--cream-muted);margin-bottom:10px;">Recommended Next Step</div>
      <div style="font-size:13px;color:var(--cream-2);line-height:1.7;">
        ${weakChapters.length
          ? 'Revise: ' + weakChapters.map(ch => esc(ch.name) + ' (' + ch.pct + '%)').join(', ') + '.'
          : 'Accuracy is steady. Retake a full mock or review slow questions for speed.'}
        ${markedCount ? ' You also marked ' + markedCount + ' question' + (markedCount === 1 ? '' : 's') + ' for review.' : ''}
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;">
        <button class="inner-nav-btn" type="button" onclick="filterReview('wrong')">Review Wrong</button>
        <button class="inner-nav-btn" type="button" onclick="filterReview('skipped')">Review Skipped</button>
        ${markedCount ? '<button class="inner-nav-btn" type="button" onclick="filterReview(&quot;marked&quot;)">Review Marked</button>' : ''}
      </div>
    </div>`;

  container.innerHTML = swotHtml + nextHtml + chartHtml + chBreakHtml + timeHtml;
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
    if (filter === 'marked') {
      if (q.reviewStatus !== 'marked' && q.reviewStatus !== 'ans-marked') return;
    } else if (filter !== 'all' && q.status !== filter) return;
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
        <button class="inner-nav-btn" type="button" onclick="reportReviewQuestionIssue(${i})" style="font-size:10px;margin-top:12px;padding:5px 10px;">Report Issue</button>
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

function reportReviewQuestionIssue(index) {
  if (!currentReviewResult || !currentReviewResult.questions[index]) return;
  reportQuestionIssue({
    source: 'review',
    subject: currentReviewResult.subject || '',
    testName: currentReviewResult.testName || '',
    questionIndex: index,
    question: currentReviewResult.questions[index]
  });
}
