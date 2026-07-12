(function () {
  const data = window.CUET_PREDICTOR_DATA;
  if (!data) return;

  let mode = 'score';
  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>'"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch]));
  }

  function el(id) { return document.getElementById(id); }

  function renderInputs() {
    const classSubjects = el('predictorClassSubjects');
    const scores = el('predictorScores');
    if (!classSubjects || !scores) return;
    classSubjects.innerHTML = data.subjects.map(subject => `
      <label class="predictor-check"><input type="checkbox" value="${esc(subject.id)}" data-predictor-subject="${esc(subject.id)}"><span>${esc(subject.label)}${subject.type === 'general' ? ' <em>(CUET paper)</em>' : ''}</span></label>
    `).join('');
    classSubjects.querySelectorAll('input').forEach(input => input.addEventListener('change', renderScoreInputs));
    renderScoreInputs();
  }

  function renderScoreInputs() {
    const scores = el('predictorScores');
    if (!scores) return;
    const selected = Array.from(document.querySelectorAll('#predictorClassSubjects input:checked')).map(input => input.value);
    if (!selected.length) {
      scores.innerHTML = '<div class="predictor-score-empty">Select a subject above to enter its CUET score.</div>';
      return;
    }
    scores.innerHTML = data.subjects.filter(subject => selected.includes(subject.id)).map(subject => `
      <label class="predictor-score"><span>${esc(subject.label)}</span><input type="number" min="0" max="250" step="0.001" inputmode="decimal" data-score-subject="${esc(subject.id)}" placeholder="—"></label>
    `).join('');
  }

  function readProfile() {
    const classSubjects = Array.from(document.querySelectorAll('#predictorClassSubjects input:checked')).map(input => input.value);
    const scores = {};
    document.querySelectorAll('[data-score-subject]').forEach(input => {
      if (input.value !== '') scores[input.dataset.scoreSubject] = Number(input.value);
    });
    return {
      stream: 'Commerce',
      category: el('predictorCategory')?.value || 'UR',
      aggregate: Number(el('predictorAggregate')?.value || 0),
      classSubjects,
      scores
    };
  }

  function hasSubject(profile, subject) {
    return profile.classSubjects.includes(subject);
  }

  function streamAllowed(profile, programme) {
    return programme.stream.includes('Any') || programme.stream.includes(profile.stream);
  }

  function eligibility(profile, programme) {
    const reasons = [];
    const warnings = [];
    const rule = programme.classXII || {};
    if (!streamAllowed(profile, programme)) reasons.push(`Class XII stream should be ${programme.stream.join(' / ')}`);
    (rule.requiredSubjects || []).forEach(subject => {
      if (!hasSubject(profile, subject)) reasons.push(`Class XII subject missing: ${subject}`);
    });
    if (rule.anyOfSubjects?.length && !rule.anyOfSubjects.some(subject => hasSubject(profile, subject))) reasons.push(`Class XII should include one of: ${rule.anyOfSubjects.join(', ')}`);
    if (rule.minAggregate && profile.aggregate && profile.aggregate < rule.minAggregate) reasons.push(`Class XII aggregate should be at least ${rule.minAggregate}%`);
    if (rule.minAggregate && !profile.aggregate) warnings.push(`Confirm Class XII aggregate of at least ${rule.minAggregate}%`);
    return { eligible: reasons.length === 0, reasons, warnings };
  }

  function comboScore(combo, scores) {
    if (!combo.every(subject => scores[subject] != null)) return null;
    return combo.reduce((sum, subject) => sum + Number(scores[subject]), 0);
  }

  function programmeScore(profile, programme) {
    const scores = programme.cuet.alternatives.map(combo => comboScore(combo, profile.scores)).filter(score => score != null);
    return scores.length ? Math.max(...scores) : null;
  }

  function bandFor(programme, score, category) {
    const observation = (programme.historical || []).find(item => item.category === category) || (programme.historical || [])[0];
    if (score == null || !observation) return { label: 'Eligibility only', className: 'band-neutral', detail: 'No comparable public cutoff is stored for this programme and category.' };
    const threshold = Number(observation.score);
    const gap = score - threshold;
    if (gap >= 25) return { label: 'Safer', className: 'band-safe', detail: `Your computed score is about ${Math.round(gap)} points above the ${observation.year} reference.` };
    if (gap >= -25) return { label: 'Target', className: 'band-target', detail: `Your computed score is within about 25 points of the ${observation.year} reference.` };
    return { label: 'Reach', className: 'band-reach', detail: `Your computed score is about ${Math.round(Math.abs(gap))} points below the ${observation.year} reference.` };
  }

  function sourceLine(programme) {
    const source = programme.historical?.[0]?.source || programme.evidence;
    return `<a href="${esc(source)}" target="_blank" rel="noopener">${esc(programme.evidenceLabel)} ↗</a><span>Verified ${esc(data.metadata.verifiedOn)}</span>`;
  }

  function renderCard(result, profile) {
    const { programme, eligibility: check, score } = result;
    const band = mode === 'score' && check.eligible ? bandFor(programme, score, profile.category) : { label: check.eligible ? 'Eligible' : 'Not eligible', className: check.eligible ? 'band-neutral' : 'band-blocked', detail: check.eligible ? 'No score-based allocation prediction is shown.' : check.reasons.join(' · ') };
    const historical = programme.historical?.length ? programme.historical.map(item => `${item.year} R${item.round} ${item.category}: ${item.score}`).join(' · ') : 'No public historical cutoff stored';
    const reasons = check.eligible ? `<div class="predictor-card-note">${esc(band.detail)}${check.warnings?.length ? ` ${esc(check.warnings.join(' '))}` : ''}</div>` : `<ul class="predictor-reasons">${check.reasons.map(reason => `<li>${esc(reason)}</li>`).join('')}</ul>`;
    return `
      <article class="predictor-result-card ${check.eligible ? '' : 'is-blocked'}">
        <div class="predictor-result-main">
          <div class="predictor-result-top"><span class="predictor-pill">${esc(band.label)}</span><span class="predictor-status">${esc(programme.status.replace('-', ' '))}</span></div>
          <h3>${esc(programme.programme)}</h3>
          <p class="predictor-result-place">${esc(programme.institution)} · ${esc(programme.college)} · ${esc(programme.city)}</p>
          <div class="predictor-result-tags"><span>CUET: ${programme.cuet.alternatives.map(combo => combo.join(' + ')).join(' OR ')}</span><span>Route: ${esc(programme.route)}</span></div>
          ${reasons}
        </div>
        <div class="predictor-result-evidence">
          ${score != null && check.eligible ? `<div class="predictor-score-number"><strong>${score.toFixed(2)}</strong><span>${esc(programme.score.type)}</span></div>` : ''}
          <div class="predictor-history"><strong>Historical context</strong><span>${esc(historical)}</span></div>
          <div class="predictor-source">${sourceLine(programme)}</div>
        </div>
      </article>`;
  }

  function renderResults(profile) {
    const container = el('predictorResults');
    if (!container) return;
    const results = data.programmes.map(programme => ({ programme, eligibility: eligibility(profile, programme), score: programmeScore(profile, programme) }));
    const eligible = results.filter(result => result.eligibility.eligible);
    const blocked = results.filter(result => !result.eligibility.eligible);
    const predicted = mode === 'score' ? eligible.filter(result => result.score != null).sort((a, b) => (b.score || 0) - (a.score || 0)) : [];
    const ordered = mode === 'score' ? [...predicted, ...eligible.filter(result => result.score == null), ...blocked] : [...eligible, ...blocked];
    const title = mode === 'score' ? 'Your evidence-backed shortlist' : 'Courses you can explore without a score';
    const intro = mode === 'score' ? 'Results are ordered by your available computed score, then by eligibility. Historical evidence is shown beside every record.' : 'This mode explains eligibility and required CUET papers only. It does not estimate college allocation without a score.';
    container.innerHTML = `
      <div class="predictor-results-head"><div><div class="section-tag">${mode === 'score' ? 'Score available' : 'Score not available'}</div><h2>${title}</h2><p>${intro}</p></div><div class="predictor-result-count"><strong>${eligible.length}</strong><span>eligible pilot options</span></div></div>
      <div class="predictor-warning"><strong>Important:</strong> These are programme-level recommendations, not guaranteed admissions. Category, seat availability, preference order and counselling rounds can change the outcome.</div>
      <div class="predictor-result-list">${ordered.map(result => renderCard(result, profile)).join('')}</div>
      <div class="predictor-coverage"><strong>Coverage note:</strong> This result contains ${data.programmes.length} verified commerce-first programme records from the ${data.metadata.institutionTotal}-institution NTA scope. Colleges and criteria without verified programme evidence are intentionally excluded until they are researched.</div>`;
  }

  window.setPredictorMode = function (nextMode) {
    mode = nextMode === 'no-score' ? 'no-score' : 'score';
    const scoreButton = el('predictorModeScore');
    const noScoreButton = el('predictorModeNoScore');
    scoreButton?.classList.toggle('active', mode === 'score');
    noScoreButton?.classList.toggle('active', mode === 'no-score');
    scoreButton?.setAttribute('aria-selected', String(mode === 'score'));
    noScoreButton?.setAttribute('aria-selected', String(mode === 'no-score'));
    const block = el('predictorScoresBlock');
    if (block) block.style.display = mode === 'score' ? 'block' : 'none';
  };

  window.runPredictor = function () { renderResults(readProfile()); };
  window.resetPredictor = function () {
    ['predictorAggregate'].forEach(id => { if (el(id)) el(id).value = ''; });
    document.querySelectorAll('#predictorClassSubjects input').forEach(input => { input.checked = false; });
    document.querySelectorAll('[data-score-subject]').forEach(input => { input.value = ''; });
    const results = el('predictorResults');
    if (results) results.innerHTML = '';
    setPredictorMode('score');
  };

  window.initPredictor = function () {
    renderInputs();
    setPredictorMode(mode);
  };
})();
