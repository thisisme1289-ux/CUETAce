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
    importantOnly: false,
    allArticles: [],
    articles:    [],
    visibleArticles: [],
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

  toggleImportant() {
    this.state.importantOnly = !this.state.importantOnly;
    var btn = document.getElementById('ca-important-toggle');
    if (btn) btn.classList.toggle('ca-active', this.state.importantOnly);
    this.renderFeed();
  },

  renderFeed() {
    var arts = this.state.articles.slice();
    if (this.state.cat !== 'All') arts = arts.filter(function(a) { return a.category === CA.state.cat; });
    if (this.state.importantOnly) arts = arts.filter(function(a) { return !!a.important; });
    if (this.state.search) {
      var q = this.state.search;
      arts = arts.filter(function(a) {
        return a.headline.toLowerCase().indexOf(q) !== -1 || a.description.toLowerCase().indexOf(q) !== -1;
      });
    }
    this.state.visibleArticles = arts.slice();

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

  startQuiz() {
    var arts = (this.state.visibleArticles && this.state.visibleArticles.length ? this.state.visibleArticles : this.state.articles).slice(0, 25);
    if (!arts.length) {
      showAppToast('No current affairs are visible for this filter.', 'error');
      return;
    }
    var categories = this.CATS.filter(function(c) { return c !== 'All'; });
    var questions = arts.map(function(a) {
      var opts = [a.category].concat(categories.filter(function(c) { return c !== a.category; }).slice(0, 3));
      opts.sort(function() { return Math.random() - 0.5; });
      return {
        section: 'Current Affairs',
        text: 'Which category best matches this current-affairs item? ' + a.headline,
        options: opts,
        correct: opts.indexOf(a.category),
        explanation: a.description || (a.source ? 'Source: ' + a.source : ''),
        type: 'MCQ'
      };
    }).filter(function(q) { return q.correct >= 0; });
    startExamFromQuestionSet('Current Affairs Quiz', 'General Test', questions, 'current-affairs');
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
