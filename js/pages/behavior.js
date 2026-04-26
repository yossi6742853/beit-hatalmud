/* ===== BHT v5.3 — Behavior (התנהגות) — Comprehensive Module ===== */
Object.assign(Pages, {

  /* ======================================================================
     DEMO DATA
     ====================================================================== */
  _behDemoStudents: [
    { id: 'S1', name: 'יוסף כהן', class: 'כיתה א' },
    { id: 'S2', name: 'משה לוי', class: 'כיתה א' },
    { id: 'S3', name: 'אברהם גולדברג', class: 'כיתה א' },
    { id: 'S4', name: 'דוד פרידמן', class: 'כיתה א' },
    { id: 'S5', name: 'אליהו שפירא', class: 'כיתה א' },
    { id: 'S6', name: 'יעקב רוזנברג', class: 'כיתה א' },
    { id: 'S7', name: 'חיים ברקוביץ', class: 'כיתה א' },
    { id: 'S8', name: 'נתנאל וייס', class: 'כיתה ב' },
    { id: 'S9', name: 'שמואל הורביץ', class: 'כיתה ב' },
    { id: 'S10', name: 'רפאל מזרחי', class: 'כיתה ב' },
    { id: 'S11', name: 'ראובן דהן', class: 'כיתה ב' },
    { id: 'S12', name: 'שמעון אלבז', class: 'כיתה ב' },
    { id: 'S13', name: 'גד קפלן', class: 'כיתה ב' },
    { id: 'S14', name: 'אשר הלל', class: 'כיתה ב' },
    { id: 'S15', name: 'מנחם בן דוד', class: 'כיתה ב' }
  ],

  _behCategories: [
    { id: 'participation', label: 'השתתפות', icon: 'bi-hand-index', type: 'חיובי', defaultPts: 3 },
    { id: 'homework', label: 'שיעורי בית', icon: 'bi-journal-check', type: 'חיובי', defaultPts: 2 },
    { id: 'respect', label: 'כבוד', icon: 'bi-heart', type: 'חיובי', defaultPts: 3 },
    { id: 'helping', label: 'עזרה לחברים', icon: 'bi-people', type: 'חיובי', defaultPts: 4 },
    { id: 'leadership', label: 'מנהיגות', icon: 'bi-star', type: 'חיובי', defaultPts: 5 },
    { id: 'tardiness', label: 'איחור', icon: 'bi-clock', type: 'שלילי', defaultPts: -2 },
    { id: 'uniform', label: 'מדים', icon: 'bi-person-badge', type: 'שלילי', defaultPts: -1 },
    { id: 'disruption', label: 'הפרעה', icon: 'bi-megaphone', type: 'שלילי', defaultPts: -3 },
    { id: 'violence', label: 'אלימות', icon: 'bi-exclamation-triangle', type: 'שלילי', defaultPts: -5 },
    { id: 'other', label: 'אחר', icon: 'bi-three-dots', type: 'חיובי', defaultPts: 1 }
  ],

  _behStaffNames: ['הרב כהן', 'הרב לוי', 'הרב ישראלי', 'מר דהן', 'הרב שפירא'],

  _behDemoData: null,

  _behGenerateDemo() {
    if (this._behDemoData) return;
    const cats = this._behCategories;
    const students = this._behDemoStudents;
    const staff = this._behStaffNames;
    const today = new Date();
    const entries = [];

    const descs = {
      participation: ['השתתף פעיל בשיעור', 'ענה על שאלות בצורה מצוינת', 'יזם דיון מעניין'],
      homework: ['הגיש שיעורי בית מושלמים', 'שיעורי בית מסודרים ומדויקים', 'הגיש בזמן עם תוספות'],
      respect: ['התנהג בכבוד כלפי מורה', 'דיבר בנימוס עם חברים', 'הפגין יראת כבוד'],
      helping: ['עזר לחבר חדש להשתלב', 'תרגל עם חבר לפני מבחן', 'שיתף חומרי לימוד'],
      leadership: ['הוביל פרויקט כיתתי', 'ארגן פעילות חסד', 'היה דוגמא לחבריו'],
      tardiness: ['הגיע 10 דקות באיחור', 'איחר לשיעור שני', 'איחור חוזר ונשנה'],
      uniform: ['הגיע ללא ציצית', 'מדים לא מסודרים', 'חסר כיפה'],
      disruption: ['דיבר בזמן השיעור', 'הפריע לחברים בלימוד', 'השתמש בטלפון בכיתה'],
      violence: ['דחף חבר', 'התנהגות אגרסיבית בהפסקה'],
      other: ['עשה מעבר לנדרש', 'גילה יוזמה חיובית', 'הפגין שיפור ניכר']
    };

    for (let i = 0; i < 30; i++) {
      const daysAgo = Math.floor(Math.random() * 30);
      const date = new Date(today);
      date.setDate(date.getDate() - daysAgo);
      if (date.getDay() === 6) date.setDate(date.getDate() - 1); // Skip Shabbat
      const dateStr = date.toISOString().slice(0, 10);

      const student = students[Math.floor(Math.random() * students.length)];
      const cat = cats[Math.floor(Math.random() * cats.length)];
      const descList = descs[cat.id] || descs.other;
      const desc = descList[Math.floor(Math.random() * descList.length)];
      const staffMember = staff[Math.floor(Math.random() * staff.length)];

      // Vary points slightly from default
      const variation = Math.floor(Math.random() * 3) - 1;
      let pts = cat.defaultPts + (cat.defaultPts > 0 ? variation : -variation);
      if (cat.defaultPts > 0 && pts < 1) pts = 1;
      if (cat.defaultPts < 0 && pts > -1) pts = -1;

      entries.push({
        id: 'BH' + (i + 1),
        תלמיד_מזהה: student.id,
        שם_תלמיד: student.name,
        כיתה: student.class,
        תאריך: dateStr,
        סוג: cat.type,
        קטגוריה: cat.label,
        תיאור: desc,
        נקודות: pts,
        צוות: staffMember
      });
    }

    // Sort by date descending
    entries.sort((a, b) => b.תאריך.localeCompare(a.תאריך));
    this._behDemoData = entries;
  },

  /* ======================================================================
     STATE
     ====================================================================== */
  _behData: [],
  _behFilter: { type: '', category: '', student: '', period: 'all' },
  _behSelectedStudent: null,

  /* ======================================================================
     PAGE HTML
     ====================================================================== */
  behavior() {
    const catOptions = this._behCategories.map(c =>
      `<option value="${c.label}" data-type="${c.type}" data-pts="${c.defaultPts}">${c.label}</option>`
    ).join('');

    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
      <div>
        <h1 class="mb-0"><i class="bi bi-star-half me-2"></i>התנהגות</h1>
        <small class="text-muted">מעקב וניהול התנהגות תלמידים</small>
      </div>
      <div class="d-flex gap-2 flex-wrap">
        <button class="btn btn-success btn-sm" onclick="Pages.behQuickAdd('חיובי')">
          <i class="bi bi-plus-circle me-1"></i>חיובי
        </button>
        <button class="btn btn-danger btn-sm" onclick="Pages.behQuickAdd('שלילי')">
          <i class="bi bi-dash-circle me-1"></i>שלילי
        </button>
        <button class="btn btn-outline-primary btn-sm" onclick="Pages.behExport()">
          <i class="bi bi-download me-1"></i>ייצוא
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="row g-3 mb-3" id="beh-stats">
      <div class="col-6 col-md-3">
        <div class="card p-3 text-center border-0 shadow-sm">
          <div class="fs-3 fw-bold text-primary" id="beh-total">0</div>
          <small class="text-muted">סה"כ דיווחים</small>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card p-3 text-center border-0 shadow-sm">
          <div class="fs-3 fw-bold text-success" id="beh-pos-pct">0%</div>
          <small class="text-muted">חיובי</small>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card p-3 text-center border-0 shadow-sm">
          <div class="fs-3 fw-bold text-danger" id="beh-neg-pct">0%</div>
          <small class="text-muted">שלילי</small>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card p-3 text-center border-0 shadow-sm">
          <div class="fs-3 fw-bold text-warning" id="beh-avg-pts">0</div>
          <small class="text-muted">ממוצע נקודות</small>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <ul class="nav nav-tabs mb-3" id="beh-tabs">
      <li class="nav-item">
        <a class="nav-link active" href="#" data-beh-tab="log" onclick="Pages.behSwitchTab('log')">
          <i class="bi bi-list-ul me-1"></i>יומן
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" data-beh-tab="leaderboard" onclick="Pages.behSwitchTab('leaderboard')">
          <i class="bi bi-trophy me-1"></i>מובילים
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" data-beh-tab="classes" onclick="Pages.behSwitchTab('classes')">
          <i class="bi bi-bar-chart me-1"></i>כיתות
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" data-beh-tab="trends" onclick="Pages.behSwitchTab('trends')">
          <i class="bi bi-graph-up me-1"></i>מגמות
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" data-beh-tab="profile" onclick="Pages.behSwitchTab('profile')" id="beh-profile-tab" style="display:none">
          <i class="bi bi-person me-1"></i><span id="beh-profile-tab-name">פרופיל</span>
        </a>
      </li>
    </ul>

    <!-- Filters (for log tab) -->
    <div class="card p-3 mb-3" id="beh-filters">
      <div class="row g-2 align-items-end">
        <div class="col-md-3 col-6">
          <label class="form-label small mb-1">סוג</label>
          <select class="form-select form-select-sm" id="beh-f-type" onchange="Pages.behApplyFilter()">
            <option value="">הכל</option>
            <option value="חיובי">חיובי</option>
            <option value="שלילי">שלילי</option>
          </select>
        </div>
        <div class="col-md-3 col-6">
          <label class="form-label small mb-1">קטגוריה</label>
          <select class="form-select form-select-sm" id="beh-f-cat" onchange="Pages.behApplyFilter()">
            <option value="">הכל</option>
            ${catOptions}
          </select>
        </div>
        <div class="col-md-3 col-6">
          <label class="form-label small mb-1">תקופה</label>
          <select class="form-select form-select-sm" id="beh-f-period" onchange="Pages.behApplyFilter()">
            <option value="all">הכל</option>
            <option value="week">שבוע אחרון</option>
            <option value="month" selected>חודש אחרון</option>
            <option value="quarter">רבעון</option>
          </select>
        </div>
        <div class="col-md-3 col-6">
          <label class="form-label small mb-1">חיפוש תלמיד</label>
          <input type="text" class="form-control form-control-sm" id="beh-f-search" placeholder="שם תלמיד..." oninput="Pages.behApplyFilter()">
        </div>
      </div>
    </div>

    <!-- Tab Content -->
    <div id="beh-tab-log">${Utils.skeleton(4)}</div>
    <div id="beh-tab-leaderboard" style="display:none"></div>
    <div id="beh-tab-classes" style="display:none"></div>
    <div id="beh-tab-trends" style="display:none"></div>
    <div id="beh-tab-profile" style="display:none"></div>

    <!-- Quick Add Modal -->
    <div class="modal fade" id="beh-modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="beh-modal-title">דיווח התנהגות</h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="row g-3">
              <div class="col-12">
                <label class="form-label">תלמיד</label>
                <select class="form-select" id="bf-student"></select>
              </div>
              <div class="col-6">
                <label class="form-label">סוג</label>
                <div class="btn-group w-100" role="group" id="bf-type-group">
                  <input type="radio" class="btn-check" name="bf-type" id="bf-type-pos" value="חיובי" checked onchange="Pages.behTypeToggle()">
                  <label class="btn btn-outline-success" for="bf-type-pos"><i class="bi bi-plus-circle me-1"></i>חיובי</label>
                  <input type="radio" class="btn-check" name="bf-type" id="bf-type-neg" value="שלילי" onchange="Pages.behTypeToggle()">
                  <label class="btn btn-outline-danger" for="bf-type-neg"><i class="bi bi-dash-circle me-1"></i>שלילי</label>
                </div>
              </div>
              <div class="col-6">
                <label class="form-label">קטגוריה</label>
                <select class="form-select" id="bf-category" onchange="Pages.behCatChange()">
                  ${catOptions}
                </select>
              </div>
              <div class="col-6">
                <label class="form-label">נקודות</label>
                <input type="number" class="form-control" id="bf-points" value="3" min="-10" max="10">
              </div>
              <div class="col-6">
                <label class="form-label">צוות</label>
                <select class="form-select" id="bf-staff">
                  ${this._behStaffNames.map(s => `<option>${s}</option>`).join('')}
                </select>
              </div>
              <div class="col-12">
                <label class="form-label">תיאור</label>
                <textarea class="form-control" id="bf-desc" rows="2" placeholder="תיאור קצר של ההתנהגות..."></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">ביטול</button>
            <button class="btn btn-primary" onclick="Pages.behSave()">
              <i class="bi bi-check-lg me-1"></i>שמור
            </button>
          </div>
        </div>
      </div>
    </div>`;
  },

  /* ======================================================================
     DEMO FLAG
     ====================================================================== */
  _behUseDemo: false,

  behLoadDemo() {
    this._behUseDemo = true;
    this._behGenerateDemo();
    this._behData = this._behDemoData;
    this._behFilter = { type: '', category: '', student: '', period: 'month' };
    document.getElementById('beh-f-period').value = 'month';
    this.behUpdateStats();
    this.behRenderLog();
    Utils.toast('\u05E0\u05D8\u05E2\u05E0\u05D5 \u05E0\u05EA\u05D5\u05E0\u05D9 \u05D3\u05DE\u05D5', 'info');
  },

  /* ======================================================================
     INIT
     ====================================================================== */
  behaviorInit() {
    // Load from DATA_CACHE (sync, no API calls)
    const _gc = (sheet) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[sheet]) ? DATA_CACHE[sheet] : [];

    const apiData = _gc('\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA');
    if (apiData && apiData.length > 0) {
      this._behData = apiData.map(r => ({
        id: r.id || r['\u05DE\u05D6\u05D4\u05D4'] || Utils.rowId(r),
        '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': r['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4'] || r['\u05EA\u05DC\u05DE\u05D9\u05D3'] || '',
        '\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3': r['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3'] || r['\u05E9\u05DD'] || r['\u05EA\u05DC\u05DE\u05D9\u05D3'] || '',
        '\u05DB\u05D9\u05EA\u05D4': r['\u05DB\u05D9\u05EA\u05D4'] || '',
        '\u05EA\u05D0\u05E8\u05D9\u05DA': r['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '',
        '\u05E1\u05D5\u05D2': r['\u05E1\u05D5\u05D2'] || '',
        '\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4': r['\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4'] || '',
        '\u05EA\u05D9\u05D0\u05D5\u05E8': r['\u05EA\u05D9\u05D0\u05D5\u05E8'] || '',
        '\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA': parseInt(r['\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA'] || r['\u05D7\u05D5\u05DE\u05E8\u05D4'] || '0', 10),
        '\u05E6\u05D5\u05D5\u05EA': r['\u05E6\u05D5\u05D5\u05EA'] || ''
      }));
    } else if (this._behUseDemo) {
      this._behGenerateDemo();
      this._behData = this._behDemoData;
    } else {
      this._behData = [];
    }

    this._behFilter = { type: '', category: '', student: '', period: 'month' };
    document.getElementById('beh-f-period').value = 'month';

    // Show empty state if no data
    if (!this._behData.length && !this._behUseDemo) {
      document.getElementById('beh-tab-log').innerHTML = '<div class="empty-state text-center py-5"><i class="bi bi-star-half fs-1 text-muted d-block mb-2"></i><h5>\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05E2\u05D3\u05D9\u05D9\u05DF</h5><p class="text-muted">\u05D4\u05D5\u05E1\u05E3 \u05D3\u05D9\u05D5\u05D5\u05D7 \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA \u05E8\u05D0\u05E9\u05D5\u05DF</p><a href="#" class="btn btn-sm btn-outline-secondary mt-2" onclick="Pages.behLoadDemo();return false"><i class="bi bi-database me-1"></i>\u05D8\u05E2\u05DF \u05D3\u05DE\u05D5</a></div>';
      this.behUpdateStats();
      return;
    }

    this.behUpdateStats();
    this.behRenderLog();
  },

  /* ======================================================================
     FILTERING
     ====================================================================== */
  _behFiltered() {
    let rows = [...this._behData];
    const f = this._behFilter;
    const now = new Date();

    // Period filter
    if (f.period === 'week') {
      const cutoff = new Date(now); cutoff.setDate(cutoff.getDate() - 7);
      rows = rows.filter(r => new Date(r.תאריך) >= cutoff);
    } else if (f.period === 'month') {
      const cutoff = new Date(now); cutoff.setMonth(cutoff.getMonth() - 1);
      rows = rows.filter(r => new Date(r.תאריך) >= cutoff);
    } else if (f.period === 'quarter') {
      const cutoff = new Date(now); cutoff.setMonth(cutoff.getMonth() - 3);
      rows = rows.filter(r => new Date(r.תאריך) >= cutoff);
    }

    if (f.type) rows = rows.filter(r => r.סוג === f.type);
    if (f.category) rows = rows.filter(r => r.קטגוריה === f.category);
    if (f.student) {
      const q = f.student.toLowerCase();
      rows = rows.filter(r => (r.שם_תלמיד || '').includes(q));
    }

    return rows;
  },

  behApplyFilter() {
    this._behFilter.type = document.getElementById('beh-f-type')?.value || '';
    this._behFilter.category = document.getElementById('beh-f-cat')?.value || '';
    this._behFilter.student = document.getElementById('beh-f-search')?.value || '';
    this._behFilter.period = document.getElementById('beh-f-period')?.value || 'all';

    this.behUpdateStats();
    this.behRenderLog();

    // Refresh active tab
    const activeTab = document.querySelector('#beh-tabs .nav-link.active')?.dataset.behTab;
    if (activeTab === 'leaderboard') this.behRenderLeaderboard();
    if (activeTab === 'classes') this.behRenderClasses();
    if (activeTab === 'trends') this.behRenderTrends();
  },

  /* ======================================================================
     STATS CARDS
     ====================================================================== */
  behUpdateStats() {
    const rows = this._behFiltered();
    const total = rows.length;
    const pos = rows.filter(r => r.סוג === 'חיובי').length;
    const neg = rows.filter(r => r.סוג === 'שלילי').length;
    const avgPts = total ? (rows.reduce((s, r) => s + (r.נקודות || 0), 0) / total).toFixed(1) : '0';

    const el = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
    el('beh-total', total);
    el('beh-pos-pct', total ? Math.round(pos / total * 100) + '%' : '0%');
    el('beh-neg-pct', total ? Math.round(neg / total * 100) + '%' : '0%');
    el('beh-avg-pts', avgPts);
  },

  /* ======================================================================
     TAB SWITCHING
     ====================================================================== */
  behSwitchTab(tab) {
    ['log', 'leaderboard', 'classes', 'trends', 'profile'].forEach(t => {
      const el = document.getElementById('beh-tab-' + t);
      if (el) el.style.display = t === tab ? '' : 'none';
    });
    document.querySelectorAll('#beh-tabs .nav-link').forEach(a => {
      a.classList.toggle('active', a.dataset.behTab === tab);
    });

    // Show/hide filters for log tab
    const filters = document.getElementById('beh-filters');
    if (filters) filters.style.display = (tab === 'log' || tab === 'profile') ? '' : 'none';

    if (tab === 'leaderboard') this.behRenderLeaderboard();
    if (tab === 'classes') this.behRenderClasses();
    if (tab === 'trends') this.behRenderTrends();
  },

  /* ======================================================================
     LOG TAB
     ====================================================================== */
  behRenderLog() {
    const rows = this._behFiltered();
    const container = document.getElementById('beh-tab-log');
    if (!container) return;

    if (!rows.length) {
      container.innerHTML = '<div class="empty-state text-center py-5"><i class="bi bi-star fs-1 text-muted"></i><h5 class="mt-3 text-muted">אין דיווחים בתקופה זו</h5></div>';
      return;
    }

    const grouped = {};
    rows.forEach(r => {
      const d = r.תאריך || 'ללא תאריך';
      if (!grouped[d]) grouped[d] = [];
      grouped[d].push(r);
    });

    const dates = Object.keys(grouped).sort().reverse();

    container.innerHTML = dates.map(date => {
      const dayRows = grouped[date];
      return `
        <div class="mb-3">
          <h6 class="text-muted mb-2 border-bottom pb-1">
            <i class="bi bi-calendar3 me-1"></i>${Utils.formatDateShort ? Utils.formatDateShort(date) : date}
            <span class="badge bg-secondary ms-2">${dayRows.length}</span>
          </h6>
          ${dayRows.map(r => {
            const isPos = r.סוג === 'חיובי';
            const color = isPos ? 'success' : 'danger';
            const icon = isPos ? 'bi-plus-circle-fill' : 'bi-dash-circle-fill';
            const catObj = this._behCategories.find(c => c.label === r.קטגוריה);
            const catIcon = catObj ? catObj.icon : 'bi-three-dots';
            return `
            <div class="card mb-2 border-start border-4 border-${color} shadow-sm">
              <div class="card-body py-2 px-3">
                <div class="d-flex justify-content-between align-items-start">
                  <div class="d-flex align-items-start gap-2">
                    <i class="bi ${icon} text-${color} mt-1"></i>
                    <div>
                      <a href="#" class="fw-bold text-decoration-none" onclick="Pages.behShowProfile('${r.תלמיד_מזהה}','${r.שם_תלמיד}');return false;">${r.שם_תלמיד}</a>
                      <span class="badge bg-${color} bg-opacity-10 text-${color} ms-2">${r.קטגוריה}</span>
                      <span class="badge bg-light text-dark ms-1"><i class="bi ${catIcon} me-1"></i>${r.כיתה || ''}</span>
                      <p class="mb-0 small text-muted mt-1">${r.תיאור || ''}</p>
                    </div>
                  </div>
                  <div class="d-flex align-items-center gap-2 flex-shrink-0">
                    <span class="badge ${isPos ? 'bg-success' : 'bg-danger'} fs-6">${r.נקודות > 0 ? '+' : ''}${r.נקודות}</span>
                    <small class="text-muted">${r.צוות || ''}</small>
                    <button class="btn btn-sm btn-outline-danger py-0 px-1" onclick="Pages.behDelete('${r.id}')" title="מחק">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>`;
          }).join('')}
        </div>`;
    }).join('');
  },

  /* ======================================================================
     LEADERBOARD TAB
     ====================================================================== */
  behRenderLeaderboard() {
    const rows = this._behFiltered();
    const container = document.getElementById('beh-tab-leaderboard');
    if (!container) return;

    const scores = {};
    rows.forEach(r => {
      const name = r.שם_תלמיד || '';
      if (!name) return;
      if (!scores[name]) scores[name] = { pos: 0, neg: 0, total: 0, id: r.תלמיד_מזהה };
      scores[name].total += (r.נקודות || 0);
      if (r.סוג === 'חיובי') scores[name].pos += (r.נקודות || 0);
      else scores[name].neg += Math.abs(r.נקודות || 0);
    });

    const sorted = Object.entries(scores).sort((a, b) => b[1].total - a[1].total);

    if (!sorted.length) {
      container.innerHTML = '<div class="empty-state text-center py-5"><i class="bi bi-trophy fs-1 text-muted"></i><h5 class="mt-3 text-muted">אין נתונים</h5></div>';
      return;
    }

    const medals = ['🥇', '🥈', '🥉'];

    container.innerHTML = `
      <div class="card shadow-sm">
        <div class="card-header bg-warning bg-opacity-10">
          <h5 class="mb-0"><i class="bi bi-trophy-fill text-warning me-2"></i>טבלת מובילים — לפי סך נקודות</h5>
        </div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead class="table-light">
                <tr><th style="width:50px">#</th><th>תלמיד</th><th class="text-center">חיובי</th><th class="text-center">שלילי</th><th class="text-center">סה"כ</th><th style="width:200px">מאזן</th></tr>
              </thead>
              <tbody>
                ${sorted.map(([name, s], i) => {
                  const maxAbs = Math.max(...sorted.map(x => Math.abs(x[1].total)), 1);
                  const pct = Math.abs(s.total) / maxAbs * 100;
                  const barColor = s.total >= 0 ? 'success' : 'danger';
                  return `
                  <tr class="${i < 3 ? 'table-warning table-' + ['warning','light','light'][i] : ''}" style="cursor:pointer" onclick="Pages.behShowProfile('${s.id}','${name}')">
                    <td class="fw-bold fs-5">${i < 3 ? medals[i] : i + 1}</td>
                    <td class="fw-bold">${name}</td>
                    <td class="text-center text-success">+${s.pos}</td>
                    <td class="text-center text-danger">-${s.neg}</td>
                    <td class="text-center"><span class="badge bg-${barColor} fs-6">${s.total > 0 ? '+' : ''}${s.total}</span></td>
                    <td>
                      <div class="progress" style="height:20px">
                        <div class="progress-bar bg-${barColor}" style="width:${pct}%"></div>
                      </div>
                    </td>
                  </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>`;
  },

  /* ======================================================================
     CLASS COMPARISON TAB
     ====================================================================== */
  behRenderClasses() {
    const rows = this._behFiltered();
    const container = document.getElementById('beh-tab-classes');
    if (!container) return;

    const classScores = {};
    rows.forEach(r => {
      const cls = r.כיתה || 'לא ידוע';
      if (!classScores[cls]) classScores[cls] = { pos: 0, neg: 0, total: 0, count: 0, students: new Set() };
      classScores[cls].total += (r.נקודות || 0);
      classScores[cls].count++;
      if (r.סוג === 'חיובי') classScores[cls].pos++;
      else classScores[cls].neg++;
      classScores[cls].students.add(r.שם_תלמיד);
    });

    const labels = Object.keys(classScores);
    const posData = labels.map(l => classScores[l].pos);
    const negData = labels.map(l => classScores[l].neg);

    container.innerHTML = `
      <div class="row g-3">
        <div class="col-md-8">
          <div class="card shadow-sm">
            <div class="card-header"><h5 class="mb-0"><i class="bi bi-bar-chart-fill text-primary me-2"></i>השוואת כיתות</h5></div>
            <div class="card-body">
              <div style="height:300px"><canvas id="beh-chart-classes"></canvas></div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card shadow-sm h-100">
            <div class="card-header"><h6 class="mb-0">סיכום כיתתי</h6></div>
            <div class="card-body">
              ${labels.map(cls => {
                const s = classScores[cls];
                const avg = s.students.size ? (s.total / s.students.size).toFixed(1) : '0';
                return `
                <div class="mb-3">
                  <div class="d-flex justify-content-between mb-1">
                    <strong>${cls}</strong>
                    <span class="badge bg-primary">${s.students.size} תלמידים</span>
                  </div>
                  <div class="d-flex gap-3 small">
                    <span class="text-success"><i class="bi bi-plus-circle me-1"></i>${s.pos} חיובי</span>
                    <span class="text-danger"><i class="bi bi-dash-circle me-1"></i>${s.neg} שלילי</span>
                    <span class="text-muted">ממוצע: ${avg}</span>
                  </div>
                </div>`;
              }).join('')}
            </div>
          </div>
        </div>
      </div>`;

    // Render chart
    setTimeout(() => {
      const ctx = document.getElementById('beh-chart-classes');
      if (!ctx) return;
      if (App.charts['behClasses']) App.charts['behClasses'].destroy();
      App.charts['behClasses'] = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            { label: 'חיובי', data: posData, backgroundColor: 'rgba(25,135,84,0.7)', borderRadius: 6 },
            { label: 'שלילי', data: negData, backgroundColor: 'rgba(220,53,69,0.7)', borderRadius: 6 }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: { y: { beginAtZero: true } },
          plugins: { legend: { position: 'bottom' } }
        }
      });
    }, 100);
  },

  /* ======================================================================
     TRENDS TAB (Weekly / Monthly)
     ====================================================================== */
  behRenderTrends() {
    const rows = this._behData; // Use all data for trends
    const container = document.getElementById('beh-tab-trends');
    if (!container) return;

    // Group by week
    const weekData = {};
    const catData = {};
    rows.forEach(r => {
      const d = new Date(r.תאריך);
      if (isNaN(d)) return;
      // Week key: year-week
      const startOfYear = new Date(d.getFullYear(), 0, 1);
      const weekNum = Math.ceil(((d - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);
      const wk = d.getFullYear() + '-W' + String(weekNum).padStart(2, '0');
      if (!weekData[wk]) weekData[wk] = { pos: 0, neg: 0, total: 0 };
      weekData[wk].total += (r.נקודות || 0);
      if (r.סוג === 'חיובי') weekData[wk].pos++;
      else weekData[wk].neg++;

      // Category breakdown
      const cat = r.קטגוריה || 'אחר';
      if (!catData[cat]) catData[cat] = 0;
      catData[cat]++;
    });

    const weeks = Object.keys(weekData).sort();
    const catLabels = Object.keys(catData);
    const catValues = catLabels.map(l => catData[l]);
    const catColors = ['#198754','#0d6efd','#6f42c1','#fd7e14','#20c997','#dc3545','#ffc107','#0dcaf0','#6c757d','#d63384'];

    container.innerHTML = `
      <div class="row g-3">
        <div class="col-md-8">
          <div class="card shadow-sm">
            <div class="card-header"><h5 class="mb-0"><i class="bi bi-graph-up text-primary me-2"></i>מגמות שבועיות</h5></div>
            <div class="card-body">
              <div style="height:300px"><canvas id="beh-chart-trends"></canvas></div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card shadow-sm h-100">
            <div class="card-header"><h5 class="mb-0"><i class="bi bi-pie-chart text-info me-2"></i>התפלגות קטגוריות</h5></div>
            <div class="card-body">
              <div style="height:280px"><canvas id="beh-chart-cats"></canvas></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Monthly summary -->
      <div class="card shadow-sm mt-3">
        <div class="card-header"><h5 class="mb-0"><i class="bi bi-calendar-month me-2"></i>סיכום חודשי</h5></div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-sm">
              <thead><tr><th>שבוע</th><th class="text-center">חיובי</th><th class="text-center">שלילי</th><th class="text-center">מאזן</th></tr></thead>
              <tbody>
                ${weeks.slice(-8).map(w => {
                  const d = weekData[w];
                  const net = d.total;
                  return `<tr><td>${w}</td><td class="text-center text-success">${d.pos}</td><td class="text-center text-danger">${d.neg}</td><td class="text-center"><span class="badge bg-${net >= 0 ? 'success' : 'danger'}">${net >= 0 ? '+' : ''}${net}</span></td></tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>`;

    // Render charts
    setTimeout(() => {
      // Weekly trend line
      const tCtx = document.getElementById('beh-chart-trends');
      if (tCtx) {
        if (App.charts['behTrends']) App.charts['behTrends'].destroy();
        App.charts['behTrends'] = new Chart(tCtx, {
          type: 'line',
          data: {
            labels: weeks.slice(-12),
            datasets: [
              { label: 'חיובי', data: weeks.slice(-12).map(w => weekData[w]?.pos || 0), borderColor: '#198754', backgroundColor: 'rgba(25,135,84,0.1)', fill: true, tension: 0.3 },
              { label: 'שלילי', data: weeks.slice(-12).map(w => weekData[w]?.neg || 0), borderColor: '#dc3545', backgroundColor: 'rgba(220,53,69,0.1)', fill: true, tension: 0.3 }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true } },
            plugins: { legend: { position: 'bottom' } }
          }
        });
      }

      // Category doughnut
      const cCtx = document.getElementById('beh-chart-cats');
      if (cCtx) {
        if (App.charts['behCats']) App.charts['behCats'].destroy();
        App.charts['behCats'] = new Chart(cCtx, {
          type: 'doughnut',
          data: {
            labels: catLabels,
            datasets: [{ data: catValues, backgroundColor: catColors.slice(0, catLabels.length), borderWidth: 0 }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '55%',
            plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, padding: 8 } } }
          }
        });
      }
    }, 100);
  },

  /* ======================================================================
     STUDENT PROFILE TAB
     ====================================================================== */
  behShowProfile(studentId, studentName) {
    this._behSelectedStudent = { id: studentId, name: studentName };

    // Show & activate profile tab
    const tab = document.getElementById('beh-profile-tab');
    if (tab) { tab.style.display = ''; document.getElementById('beh-profile-tab-name').textContent = studentName; }
    this.behSwitchTab('profile');
    this.behRenderProfile();
  },

  behRenderProfile() {
    const container = document.getElementById('beh-tab-profile');
    if (!container || !this._behSelectedStudent) return;

    const student = this._behSelectedStudent;
    const rows = this._behData.filter(r =>
      r.תלמיד_מזהה === student.id || r.שם_תלמיד === student.name
    ).sort((a, b) => b.תאריך.localeCompare(a.תאריך));

    const totalPts = rows.reduce((s, r) => s + (r.נקודות || 0), 0);
    const posCount = rows.filter(r => r.סוג === 'חיובי').length;
    const negCount = rows.filter(r => r.סוג === 'שלילי').length;
    const initials = student.name.split(' ').map(w => w[0]).join('').slice(0, 2);

    // Category breakdown for this student
    const catBreak = {};
    rows.forEach(r => {
      const cat = r.קטגוריה || 'אחר';
      if (!catBreak[cat]) catBreak[cat] = 0;
      catBreak[cat] += (r.נקודות || 0);
    });

    // Weekly trend for this student
    const weeklyTrend = {};
    rows.forEach(r => {
      const d = new Date(r.תאריך);
      if (isNaN(d)) return;
      const startOfYear = new Date(d.getFullYear(), 0, 1);
      const weekNum = Math.ceil(((d - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);
      const wk = d.getFullYear() + '-W' + String(weekNum).padStart(2, '0');
      if (!weeklyTrend[wk]) weeklyTrend[wk] = 0;
      weeklyTrend[wk] += (r.נקודות || 0);
    });

    const trendWeeks = Object.keys(weeklyTrend).sort();
    const trendValues = trendWeeks.map(w => weeklyTrend[w]);

    container.innerHTML = `
      <!-- Profile Header -->
      <div class="card shadow-sm mb-3">
        <div class="card-body">
          <div class="d-flex align-items-center gap-3">
            <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold fs-4" style="width:64px;height:64px">
              ${initials}
            </div>
            <div class="flex-grow-1">
              <h4 class="mb-1">${student.name}</h4>
              <div class="d-flex gap-3 flex-wrap">
                <span class="badge bg-primary fs-6">${rows.length} דיווחים</span>
                <span class="badge bg-success fs-6">+${posCount} חיובי</span>
                <span class="badge bg-danger fs-6">${negCount} שלילי</span>
                <span class="badge ${totalPts >= 0 ? 'bg-success' : 'bg-danger'} fs-5">מאזן: ${totalPts > 0 ? '+' : ''}${totalPts}</span>
              </div>
            </div>
            <button class="btn btn-outline-success btn-sm" onclick="Pages.behQuickAdd('חיובי','${student.id}','${student.name}')">
              <i class="bi bi-plus-circle me-1"></i>חיובי
            </button>
            <button class="btn btn-outline-danger btn-sm" onclick="Pages.behQuickAdd('שלילי','${student.id}','${student.name}')">
              <i class="bi bi-dash-circle me-1"></i>שלילי
            </button>
          </div>
        </div>
      </div>

      <div class="row g-3 mb-3">
        <!-- Trend Chart -->
        <div class="col-md-8">
          <div class="card shadow-sm h-100">
            <div class="card-header"><h6 class="mb-0">מגמת נקודות שבועית</h6></div>
            <div class="card-body"><div style="height:220px"><canvas id="beh-profile-trend"></canvas></div></div>
          </div>
        </div>
        <!-- Category Breakdown -->
        <div class="col-md-4">
          <div class="card shadow-sm h-100">
            <div class="card-header"><h6 class="mb-0">לפי קטגוריה</h6></div>
            <div class="card-body">
              ${Object.entries(catBreak).sort((a,b) => b[1]-a[1]).map(([cat, pts]) => {
                const catObj = this._behCategories.find(c => c.label === cat);
                const icon = catObj ? catObj.icon : 'bi-three-dots';
                const color = pts >= 0 ? 'success' : 'danger';
                return `<div class="d-flex justify-content-between align-items-center mb-2">
                  <span><i class="bi ${icon} me-1"></i>${cat}</span>
                  <span class="badge bg-${color}">${pts > 0 ? '+' : ''}${pts}</span>
                </div>`;
              }).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- History -->
      <div class="card shadow-sm">
        <div class="card-header"><h6 class="mb-0"><i class="bi bi-clock-history me-2"></i>היסטוריה (${rows.length} דיווחים)</h6></div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover table-sm mb-0">
              <thead class="table-light"><tr><th>תאריך</th><th>סוג</th><th>קטגוריה</th><th>תיאור</th><th>נקודות</th><th>צוות</th></tr></thead>
              <tbody>
                ${rows.map(r => {
                  const isPos = r.סוג === 'חיובי';
                  return `<tr>
                    <td>${Utils.formatDateShort ? Utils.formatDateShort(r.תאריך) : r.תאריך}</td>
                    <td><span class="badge bg-${isPos ? 'success' : 'danger'}">${r.סוג}</span></td>
                    <td>${r.קטגוריה || ''}</td>
                    <td class="small">${r.תיאור || ''}</td>
                    <td class="fw-bold ${isPos ? 'text-success' : 'text-danger'}">${r.נקודות > 0 ? '+' : ''}${r.נקודות}</td>
                    <td class="small text-muted">${r.צוות || ''}</td>
                  </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>`;

    // Profile trend chart
    setTimeout(() => {
      const ctx = document.getElementById('beh-profile-trend');
      if (!ctx) return;
      if (App.charts['behProfileTrend']) App.charts['behProfileTrend'].destroy();

      // Cumulative points
      const cumulative = [];
      let sum = 0;
      trendWeeks.forEach((w, i) => { sum += trendValues[i]; cumulative.push(sum); });

      App.charts['behProfileTrend'] = new Chart(ctx, {
        type: 'line',
        data: {
          labels: trendWeeks,
          datasets: [
            { label: 'נקודות שבועיות', data: trendValues, borderColor: '#0d6efd', backgroundColor: 'rgba(13,110,253,0.1)', fill: true, tension: 0.3 },
            { label: 'מצטבר', data: cumulative, borderColor: '#198754', borderDash: [5, 5], tension: 0.3, fill: false }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: { y: { beginAtZero: false } },
          plugins: { legend: { position: 'bottom' } }
        }
      });
    }, 100);
  },

  /* ======================================================================
     QUICK ADD / SAVE / DELETE
     ====================================================================== */
  behQuickAdd(type, studentId, studentName) {
    // Populate student dropdown from DATA_CACHE (sync, no API calls)
    let students = (typeof DATA_CACHE !== 'undefined' && DATA_CACHE['\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD']) ? DATA_CACHE['\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD'] : [];
    if ((!students || !students.length) && this._behUseDemo) students = this._behDemoStudents.map(s => ({ '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': s.name.split(' ')[0], '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': s.name.split(' ')[1] || '', '\u05DE\u05D6\u05D4\u05D4': s.id, _id: s.id }));
    if (!students || !students.length) { Utils.toast('\u05D0\u05D9\u05DF \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05D1\u05DE\u05E2\u05E8\u05DB\u05EA', 'warning'); return; }

    const sel = document.getElementById('bf-student');
    if (sel) {
      sel.innerHTML = '<option value="">בחר תלמיד...</option>' + students.map(s => {
        const name = (s.שם_פרטי || '') + ' ' + (s.שם_משפחה || '');
        const id = s.מזהה || s._id || Utils.rowId(s);
        return `<option value="${id}" data-name="${name.trim()}">${name.trim()}</option>`;
      }).join('');

      // Pre-select student if provided
      if (studentId) {
        sel.value = studentId;
      }
    }

    // Set type
    if (type === 'שלילי') {
      document.getElementById('bf-type-neg').checked = true;
    } else {
      document.getElementById('bf-type-pos').checked = true;
    }
    this.behTypeToggle();

    // Set modal title
    const title = document.getElementById('beh-modal-title');
    if (title) title.textContent = type === 'שלילי' ? 'דיווח שלילי' : 'דיווח חיובי';

    // Reset form
    document.getElementById('bf-desc').value = '';
    document.getElementById('bf-category').selectedIndex = 0;
    this.behCatChange();

    new bootstrap.Modal(document.getElementById('beh-modal')).show();
  },

  behTypeToggle() {
    const isPos = document.getElementById('bf-type-pos')?.checked;
    const catSel = document.getElementById('bf-category');
    if (!catSel) return;

    // Filter categories by type
    const targetType = isPos ? 'חיובי' : 'שלילי';
    Array.from(catSel.options).forEach(opt => {
      const catObj = this._behCategories.find(c => c.label === opt.value);
      if (catObj) {
        opt.style.display = catObj.type === targetType ? '' : 'none';
      }
    });

    // Select first visible option
    const firstVisible = Array.from(catSel.options).find(o => o.style.display !== 'none');
    if (firstVisible) catSel.value = firstVisible.value;
    this.behCatChange();
  },

  behCatChange() {
    const catSel = document.getElementById('bf-category');
    const ptsInput = document.getElementById('bf-points');
    if (!catSel || !ptsInput) return;
    const catObj = this._behCategories.find(c => c.label === catSel.value);
    if (catObj) ptsInput.value = catObj.defaultPts;
  },

  async behSave() {
    const studentSel = document.getElementById('bf-student');
    const studentId = studentSel?.value;
    const studentName = studentSel?.selectedOptions[0]?.dataset?.name || studentSel?.selectedOptions[0]?.text || '';
    const isPos = document.getElementById('bf-type-pos')?.checked;
    const type = isPos ? 'חיובי' : 'שלילי';
    const category = document.getElementById('bf-category')?.value || '';
    const points = parseInt(document.getElementById('bf-points')?.value || '0', 10);
    const staff = document.getElementById('bf-staff')?.value || '';
    const desc = document.getElementById('bf-desc')?.value?.trim() || '';

    if (!studentId) { Utils.toast('יש לבחור תלמיד', 'danger'); return; }

    const row = {
      תלמיד_מזהה: studentId,
      שם_תלמיד: studentName,
      סוג: type,
      קטגוריה: category,
      תיאור: desc,
      נקודות: String(points),
      צוות: staff,
      תאריך: Utils.todayISO ? Utils.todayISO() : new Date().toISOString().slice(0, 10)
    };

    try {
      await App.apiCall('add', 'התנהגות', { row });
      bootstrap.Modal.getInstance(document.getElementById('beh-modal'))?.hide();
      Utils.toast('דיווח נשמר');
      this.behaviorInit();
    } catch (e) {
      // Add to local demo data as fallback
      const newEntry = {
        id: 'BH' + Date.now(),
        ...row,
        נקודות: points,
        כיתה: this._behDemoStudents.find(s => s.id === studentId)?.class || ''
      };
      this._behData.unshift(newEntry);
      bootstrap.Modal.getInstance(document.getElementById('beh-modal'))?.hide();
      Utils.toast('דיווח נשמר (מקומי)');
      this.behUpdateStats();
      this.behRenderLog();
    }
  },

  async behDelete(id) {
    if (Utils.confirm && !await Utils.confirm('מחיקה', 'למחוק דיווח זה?')) return;

    try {
      await App.apiCall('delete', 'התנהגות', { id });
      Utils.toast('נמחק');
      this.behaviorInit();
    } catch (e) {
      // Remove from local data
      this._behData = this._behData.filter(r => r.id !== id);
      Utils.toast('נמחק (מקומי)');
      this.behUpdateStats();
      this.behRenderLog();
    }
  },

  /* ======================================================================
     EXPORT
     ====================================================================== */
  behExport() {
    const rows = this._behFiltered();
    if (!rows.length) { Utils.toast('אין נתונים לייצוא', 'warning'); return; }

    const headers = ['תאריך', 'תלמיד', 'כיתה', 'סוג', 'קטגוריה', 'תיאור', 'נקודות', 'צוות'];
    const csv = [headers.join(',')];
    rows.forEach(r => {
      csv.push([
        r.תאריך, r.שם_תלמיד, r.כיתה, r.סוג, r.קטגוריה,
        '"' + (r.תיאור || '').replace(/"/g, '""') + '"',
        r.נקודות, r.צוות
      ].join(','));
    });

    const bom = '\uFEFF';
    const blob = new Blob([bom + csv.join('\n')], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const dateStr = Utils.todayISO ? Utils.todayISO() : new Date().toISOString().slice(0, 10);
    link.download = 'behavior_' + dateStr + '.csv';
    link.click();
    Utils.toast('CSV יוצא');
  }
});
