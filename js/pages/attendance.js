/* ===== BHT v5.3 — Attendance (Enhanced) ===== */
Object.assign(Pages, {

  /* ======================================================================
     DEMO DATA
     ====================================================================== */
  _attDemoStudents: null,
  _attDemoRecords: null,

  _attGenerateDemo() {
    if (this._attDemoStudents) return;
    const firstNames = ['\u05D9\u05D5\u05E1\u05E3','\u05DE\u05E9\u05D4','\u05D0\u05D1\u05E8\u05D4\u05DD','\u05D9\u05E2\u05E7\u05D1','\u05D3\u05D5\u05D3','\u05E9\u05DE\u05D5\u05D0\u05DC','\u05D0\u05DC\u05D9\u05D4\u05D5','\u05D7\u05D9\u05D9\u05DD','\u05E0\u05EA\u05E0\u05D0\u05DC','\u05D1\u05E0\u05D9\u05DE\u05D9\u05DF','\u05E8\u05D0\u05D5\u05D1\u05DF','\u05E9\u05DE\u05E2\u05D5\u05DF','\u05D2\u05D3','\u05D0\u05E9\u05E8','\u05DE\u05E0\u05D7\u05DD'];
    const lastNames = ['\u05DB\u05D4\u05DF','\u05DC\u05D5\u05D9','\u05D9\u05E9\u05E8\u05D0\u05DC\u05D9','\u05DE\u05D6\u05E8\u05D7\u05D9','\u05D0\u05D1\u05E8\u05DE\u05D5\u05D1\u05D9\u05E5','\u05D3\u05D4\u05DF','\u05E4\u05E8\u05D9\u05D3\u05DE\u05DF','\u05E9\u05E4\u05D9\u05E8\u05D0','\u05D2\u05D5\u05DC\u05D3\u05E9\u05D8\u05D9\u05D9\u05DF','\u05E8\u05D5\u05D6\u05E0\u05D1\u05E8\u05D2','\u05D1\u05E8\u05D2\u05E8','\u05D0\u05DC\u05D1\u05D6','\u05E7\u05E4\u05DC\u05DF','\u05D4\u05DC\u05DC','\u05D1\u05DF \u05D3\u05D5\u05D3'];
    const classes = ['\u05DB\u05D9\u05EA\u05D4 \u05D0','\u05DB\u05D9\u05EA\u05D4 \u05D1'];
    this._attDemoStudents = firstNames.map((fn, i) => ({
      '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': fn,
      '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': lastNames[i],
      '\u05DB\u05D9\u05EA\u05D4': classes[i < 8 ? 0 : 1],
      '\u05DE\u05D6\u05D4\u05D4': 'S' + (i + 1),
      '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC',
      _fullName: fn + ' ' + lastNames[i],
      _id: 'S' + (i + 1)
    }));

    // Generate 30 days of attendance records with varied patterns
    const records = [];
    const today = new Date();
    const statuses = ['\u05E0\u05D5\u05DB\u05D7','\u05D7\u05D9\u05E1\u05D5\u05E8','\u05D0\u05D9\u05D7\u05D5\u05E8','\u05E4\u05D8\u05D5\u05E8'];
    const statusWeights = [0.75, 0.10, 0.10, 0.05]; // 75% present, 10% absent, 10% late, 5% excused

    for (let d = 29; d >= 0; d--) {
      const date = new Date(today);
      date.setDate(date.getDate() - d);
      // Skip Shabbat (Saturday)
      if (date.getDay() === 6) continue;
      const dateStr = date.toISOString().slice(0, 10);

      this._attDemoStudents.forEach((s, si) => {
        // Each student has a slightly different pattern
        const personalBias = (si % 5) * 0.04; // some students are more absent
        const rand = Math.random();
        let cumulative = 0;
        let status = '\u05E0\u05D5\u05DB\u05D7';
        const weights = [...statusWeights];
        weights[0] -= personalBias;
        weights[1] += personalBias * 0.6;
        weights[2] += personalBias * 0.4;

        for (let w = 0; w < weights.length; w++) {
          cumulative += weights[w];
          if (rand < cumulative) { status = statuses[w]; break; }
        }

        const rec = {
          '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': s._id,
          '\u05E9\u05DD': s._fullName,
          '\u05DB\u05D9\u05EA\u05D4': s['\u05DB\u05D9\u05EA\u05D4'],
          '\u05EA\u05D0\u05E8\u05D9\u05DA': dateStr,
          '\u05E1\u05D8\u05D8\u05D5\u05E1': status
        };
        // Add arrival time for late students
        if (status === '\u05D0\u05D9\u05D7\u05D5\u05E8') {
          const mins = 5 + Math.floor(Math.random() * 40);
          const h = 8 + Math.floor(mins / 60);
          const m = mins % 60;
          rec['\u05E9\u05E2\u05EA_\u05D4\u05D2\u05E2\u05D4'] = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
        }
        records.push(rec);
      });
    }
    this._attDemoRecords = records;
  },

  /* ======================================================================
     ATTENDANCE — Main Page
     ====================================================================== */
  attendance() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
        <div>
          <h1><i class="bi bi-calendar-check-fill me-2"></i>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</h1>
          <p class="text-muted mb-0">${Utils.dayName()} | ${Utils.formatDate(new Date())}</p>
        </div>
        <div class="d-flex gap-2 flex-wrap">
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" onclick="Pages.attSetView('list')" id="att-view-list" title="\u05E8\u05E9\u05D9\u05DE\u05D4"><i class="bi bi-list-ul"></i></button>
            <button class="btn btn-outline-primary btn-sm" onclick="Pages.attSetView('calendar')" id="att-view-calendar" title="\u05DC\u05D5\u05D7 \u05E9\u05E0\u05D4"><i class="bi bi-calendar3"></i></button>
            <button class="btn btn-outline-primary btn-sm" onclick="Pages.attSetView('heatmap')" id="att-view-heatmap" title="\u05DE\u05E4\u05EA \u05D7\u05D5\u05DD"><i class="bi bi-grid-3x3"></i></button>
          </div>
          <div class="dropdown">
            <button class="btn btn-outline-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown"><i class="bi bi-download me-1"></i>\u05D9\u05D9\u05E6\u05D5\u05D0</button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="#" onclick="Pages.attExport('daily')"><i class="bi bi-file-text me-2"></i>\u05D3\u05D5\u05D7 \u05D9\u05D5\u05DE\u05D9</a></li>
              <li><a class="dropdown-item" href="#" onclick="Pages.attExport('weekly')"><i class="bi bi-file-earmark-bar-graph me-2"></i>\u05E1\u05D9\u05DB\u05D5\u05DD \u05E9\u05D1\u05D5\u05E2\u05D9</a></li>
              <li><a class="dropdown-item" href="#" onclick="Pages.attExport('monthly')"><i class="bi bi-file-earmark-spreadsheet me-2"></i>\u05D3\u05D5\u05D7 \u05D7\u05D5\u05D3\u05E9\u05D9</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#" onclick="Pages.printAttendance()"><i class="bi bi-printer me-2"></i>\u05D4\u05D3\u05E4\u05E1\u05D4</a></li>
            </ul>
          </div>
          <button class="btn btn-success" onclick="Pages.saveAttendance()"><i class="bi bi-check-lg me-1"></i>\u05E9\u05DE\u05D5\u05E8</button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="row g-3 mb-3" id="att-stats-row">
        <div class="col-6 col-md-3">
          <div class="card p-3 text-center border-0 shadow-sm" style="border-right:4px solid var(--bs-success)!important">
            <div class="fs-3 fw-bold text-success" id="att-stat-present">0</div>
            <small class="text-muted"><i class="bi bi-check-circle me-1"></i>\u05E0\u05D5\u05DB\u05D7\u05D9\u05DD</small>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card p-3 text-center border-0 shadow-sm" style="border-right:4px solid var(--bs-danger)!important">
            <div class="fs-3 fw-bold text-danger" id="att-stat-absent">0</div>
            <small class="text-muted"><i class="bi bi-x-circle me-1"></i>\u05D7\u05E1\u05E8\u05D9\u05DD</small>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card p-3 text-center border-0 shadow-sm" style="border-right:4px solid var(--bs-warning)!important">
            <div class="fs-3 fw-bold text-warning" id="att-stat-late">0</div>
            <small class="text-muted"><i class="bi bi-clock me-1"></i>\u05D0\u05D9\u05D7\u05D5\u05E8\u05D9\u05DD</small>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card p-3 text-center border-0 shadow-sm" style="border-right:4px solid var(--bs-primary)!important">
            <div class="fs-3 fw-bold text-primary" id="att-stat-rate">--%</div>
            <small class="text-muted"><i class="bi bi-graph-up me-1"></i>\u05D0\u05D7\u05D5\u05D6 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</small>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card p-3 text-center border-0 shadow-sm" style="border-right:4px solid var(--bs-info)!important">
            <div class="fs-5 fw-bold text-info" id="att-stat-streak">--</div>
            <small class="text-muted"><i class="bi bi-fire me-1"></i>\u05E9\u05D9\u05D0 \u05E8\u05E6\u05E3</small>
          </div>
        </div>
      </div>

      <!-- Daily Summary Bar -->
      <div class="card p-3 mb-3 border-0 shadow-sm" id="att-summary-bar-card">
        <div class="d-flex align-items-center gap-2 mb-2">
          <strong class="small">\u05E1\u05D9\u05DB\u05D5\u05DD \u05D9\u05D5\u05DE\u05D9</strong>
          <span class="badge bg-light text-dark small" id="att-summary-label">0 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</span>
        </div>
        <div class="progress" style="height:28px;border-radius:8px;overflow:hidden" id="att-summary-bar">
          <div class="progress-bar bg-success" id="att-bar-present" style="width:0%"></div>
          <div class="progress-bar bg-danger" id="att-bar-absent" style="width:0%"></div>
          <div class="progress-bar bg-warning" id="att-bar-late" style="width:0%"></div>
          <div class="progress-bar bg-secondary" id="att-bar-excused" style="width:0%"></div>
        </div>
        <div class="d-flex gap-3 mt-2 small flex-wrap">
          <span><span class="badge bg-success">&nbsp;</span> \u05E0\u05D5\u05DB\u05D7\u05D9\u05DD <strong id="att-bar-pct-p">0%</strong></span>
          <span><span class="badge bg-danger">&nbsp;</span> \u05D7\u05E1\u05E8\u05D9\u05DD <strong id="att-bar-pct-a">0%</strong></span>
          <span><span class="badge bg-warning">&nbsp;</span> \u05D0\u05D9\u05D7\u05D5\u05E8 <strong id="att-bar-pct-l">0%</strong></span>
          <span><span class="badge bg-secondary">&nbsp;</span> \u05E4\u05D8\u05D5\u05E8 <strong id="att-bar-pct-e">0%</strong></span>
        </div>
      </div>

      <!-- Filters -->
      <div class="card p-3 mb-3 border-0 shadow-sm">
        <div class="row g-2 align-items-center">
          <div class="col-md-3">
            <div class="search-box"><i class="bi bi-search"></i><input type="text" class="form-control" id="att-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05EA\u05DC\u05DE\u05D9\u05D3..."></div>
          </div>
          <div class="col-md-2">
            <input type="date" class="form-control" id="att-date" value="${Utils.todayISO()}">
          </div>
          <div class="col-md-2">
            <select class="form-select" id="att-class-filter">
              <option value="">\u05DB\u05DC \u05D4\u05DB\u05D9\u05EA\u05D5\u05EA</option>
            </select>
          </div>
          <div class="col-md-5 d-flex gap-2 flex-wrap">
            <button class="btn btn-outline-success btn-sm" onclick="Pages.markAll('present')"><i class="bi bi-check-all me-1"></i>\u05D4\u05DB\u05DC \u05E0\u05D5\u05DB\u05D7\u05D9\u05DD</button>
            <button class="btn btn-outline-danger btn-sm" onclick="Pages.markAll('absent')"><i class="bi bi-x-circle me-1"></i>\u05D4\u05DB\u05DC \u05D7\u05E1\u05E8\u05D9\u05DD</button>
            <button class="btn btn-outline-info btn-sm" onclick="Pages.copyAttSummary()"><i class="bi bi-clipboard me-1"></i>\u05D4\u05E2\u05EA\u05E7</button>
            <span class="badge bg-light text-dark align-self-center" title="\u05E7\u05D9\u05E6\u05D5\u05E8\u05D9 \u05DE\u05E7\u05DC\u05D3\u05EA: P/A/L/E \u05D0\u05D5 \u05DC\u05D7\u05D9\u05E6\u05D4 \u05E2\u05DC \u05E9\u05DD"><i class="bi bi-keyboard me-1"></i>P/A/L/E</span>
          </div>
        </div>
      </div>

      <!-- Main Content Area (list / calendar / heatmap) -->
      <div id="att-content">${Utils.skeleton(5)}</div>

      <!-- Late Arrival Log -->
      <div class="card p-3 mt-3 border-0 shadow-sm" id="att-late-log-card" style="display:none">
        <h6 class="fw-bold mb-3"><i class="bi bi-clock-history text-warning me-2"></i>\u05D9\u05D5\u05DE\u05DF \u05D0\u05D9\u05D7\u05D5\u05E8\u05D9\u05DD</h6>
        <div id="att-late-log"></div>
      </div>

      <!-- Streak Tracking -->
      <div class="card p-3 mt-3 border-0 shadow-sm" id="att-streaks-card" style="display:none">
        <h6 class="fw-bold mb-3"><i class="bi bi-fire text-danger me-2"></i>\u05E8\u05E6\u05E3 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05E8\u05E6\u05D9\u05E3</h6>
        <div id="att-streaks"></div>
      </div>
    `;
  },

  /* ---- State ---- */
  _attState: {},
  _attStudents: [],
  _attAllRecords: [],
  _attListenersAdded: false,
  _attCurrentView: 'list',
  _attLateLog: {},
  _attKeyListener: null,

  /* ---- Demo flag ---- */
  _attUseDemo: false,

  attLoadDemo() {
    this._attUseDemo = true;
    this._attGenerateDemo();
    this._attStudents = this._attDemoStudents;
    this._attAllRecords = this._attDemoRecords;
    // Rebuild state from demo records
    const today = document.getElementById('att-date')?.value || Utils.todayISO();
    this._attState = {};
    this._attLateLog = {};
    this._attStudents.forEach(s => {
      const sId = s._id;
      const sName = s._fullName;
      const existing = this._attAllRecords.find(a =>
        (String(a['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4'] || '') === String(sId) ||
         (a['\u05E9\u05DD'] || a['\u05EA\u05DC\u05DE\u05D9\u05D3'] || '') === sName) &&
        a['\u05EA\u05D0\u05E8\u05D9\u05DA'] === today
      );
      if (existing) {
        const st = existing['\u05E1\u05D8\u05D8\u05D5\u05E1'];
        this._attState[sId] = st === '\u05E0\u05D5\u05DB\u05D7' ? 'present' : st === '\u05D7\u05D9\u05E1\u05D5\u05E8' ? 'absent' : st === '\u05D0\u05D9\u05D7\u05D5\u05E8' ? 'late' : st === '\u05E4\u05D8\u05D5\u05E8' ? 'excused' : '';
        if (existing['\u05E9\u05E2\u05EA_\u05D4\u05D2\u05E2\u05D4']) this._attLateLog[sId] = existing['\u05E9\u05E2\u05EA_\u05D4\u05D2\u05E2\u05D4'];
      } else {
        this._attState[sId] = '';
      }
    });
    // Populate class filter
    const classes = [...new Set(this._attStudents.map(s => s['\u05DB\u05D9\u05EA\u05D4']).filter(Boolean))].sort();
    const classFilter = document.getElementById('att-class-filter');
    if (classFilter) classFilter.innerHTML = '<option value="">\u05DB\u05DC \u05D4\u05DB\u05D9\u05EA\u05D5\u05EA</option>' + classes.map(c => `<option value="${c}">${c}</option>`).join('');
    this.attSetView(this._attCurrentView);
    this.bindAttKeyboard();
    Utils.toast('\u05E0\u05D8\u05E2\u05E0\u05D5 \u05E0\u05EA\u05D5\u05E0\u05D9 \u05D3\u05DE\u05D5', 'info');
  },

  /* ---- Init ---- */
  attendanceInit() {
    // Helper: load from DATA_CACHE (sync, no API calls)
    const _gc = (sheet) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[sheet]) ? DATA_CACHE[sheet] : [];

    let students = _gc('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
    let attendance = _gc('\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA');

    if (!students || !students.length) {
      if (this._attUseDemo) {
        this._attGenerateDemo();
        students = this._attDemoStudents;
        attendance = this._attDemoRecords;
      } else {
        // Show empty state
        document.getElementById('att-content').innerHTML = '<div class="empty-state text-center py-5"><i class="bi bi-calendar-check fs-1 text-muted d-block mb-2"></i><h5>\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05E2\u05D3\u05D9\u05D9\u05DF</h5><p class="text-muted">\u05D4\u05D5\u05E1\u05E3 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05DC\u05DE\u05E2\u05E8\u05DB\u05EA \u05DB\u05D3\u05D9 \u05DC\u05E8\u05E9\u05D5\u05DD \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</p><a href="#" class="btn btn-sm btn-outline-secondary mt-2" onclick="Pages.attLoadDemo();return false"><i class="bi bi-database me-1"></i>\u05D8\u05E2\u05DF \u05D3\u05DE\u05D5</a></div>';
        return;
      }
    }

    const active = students.filter(s => (s['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '') !== '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC');
    active.forEach(s => {
      if (!s._fullName) s._fullName = Utils.fullName(s);
      if (!s._id) s._id = Utils.rowId(s);
    });
    this._attStudents = active;
    this._attAllRecords = attendance || [];
    const today = document.getElementById('att-date').value;

    // Build state from existing records
    this._attState = {};
    this._attLateLog = {};
    active.forEach(s => {
      const sId = s._id;
      const sName = s._fullName;
      const existing = attendance.find(a =>
        (String(a['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4'] || '') === String(sId) ||
         (a['\u05E9\u05DD'] || a['\u05EA\u05DC\u05DE\u05D9\u05D3'] || '') === sName) &&
        a['\u05EA\u05D0\u05E8\u05D9\u05DA'] === today
      );
      if (existing) {
        const st = existing['\u05E1\u05D8\u05D8\u05D5\u05E1'];
        this._attState[sId] = st === '\u05E0\u05D5\u05DB\u05D7' ? 'present' : st === '\u05D7\u05D9\u05E1\u05D5\u05E8' ? 'absent' : st === '\u05D0\u05D9\u05D7\u05D5\u05E8' ? 'late' : st === '\u05E4\u05D8\u05D5\u05E8' ? 'excused' : '';
        if (existing['\u05E9\u05E2\u05EA_\u05D4\u05D2\u05E2\u05D4']) {
          this._attLateLog[sId] = existing['\u05E9\u05E2\u05EA_\u05D4\u05D2\u05E2\u05D4'];
        }
      } else {
        this._attState[sId] = '';
      }
    });

    // Populate class filter
    const classes = [...new Set(active.map(s => s['\u05DB\u05D9\u05EA\u05D4']).filter(Boolean))].sort();
    const classFilter = document.getElementById('att-class-filter');
    const curVal = classFilter.value;
    classFilter.innerHTML = '<option value="">\u05DB\u05DC \u05D4\u05DB\u05D9\u05EA\u05D5\u05EA</option>' + classes.map(c => `<option value="${c}">${c}</option>`).join('');
    if (curVal) classFilter.value = curVal;

    if (!this._attListenersAdded) {
      this._attListenersAdded = true;
      document.getElementById('att-search').addEventListener('input', Utils.debounce(() => this._attRenderCurrentView(), 300));
      document.getElementById('att-date').addEventListener('change', () => this.attendanceInit());
      document.getElementById('att-class-filter').addEventListener('change', () => this._attRenderCurrentView());
    }

    this.attSetView(this._attCurrentView);
    this.bindAttKeyboard();
  },

  /* ---- View Switching ---- */
  attSetView(view) {
    this._attCurrentView = view;
    ['list', 'calendar', 'heatmap'].forEach(v => {
      const btn = document.getElementById('att-view-' + v);
      if (btn) btn.classList.toggle('active', v === view);
    });
    this._attRenderCurrentView();
  },

  _attRenderCurrentView() {
    const view = this._attCurrentView;
    if (view === 'list') this._attRenderList();
    else if (view === 'calendar') this._attRenderCalendar();
    else if (view === 'heatmap') this._attRenderHeatmap();
    this._attUpdateStats();
    this._attUpdateSummaryBar();
    this._attRenderLateLog();
    this._attRenderStreaks();
  },

  /* ---- Filter helper ---- */
  _attFilteredStudents() {
    const search = (document.getElementById('att-search')?.value || '').trim().toLowerCase();
    const classF = document.getElementById('att-class-filter')?.value || '';
    return this._attStudents.filter(s => {
      if (search && !(s._fullName || '').toLowerCase().includes(search)) return false;
      if (classF && s['\u05DB\u05D9\u05EA\u05D4'] !== classF) return false;
      return true;
    });
  },

  /* ======================================================================
     VIEW: LIST
     ====================================================================== */
  _attRenderList() {
    const filtered = this._attFilteredStudents();
    if (!filtered.length) {
      document.getElementById('att-content').innerHTML = '<div class="card p-4 text-center text-muted border-0 shadow-sm"><i class="bi bi-search fs-1 d-block mb-2"></i>\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</div>';
      return;
    }
    const html = filtered.map(s => {
      const name = s._fullName;
      const sid = s._id;
      const state = this._attState[sid] || '';
      const streakInfo = this._attGetStreak(sid);
      const streakBadge = streakInfo.current > 2 ? `<span class="badge bg-success bg-opacity-10 text-success ms-1" title="\u05E8\u05E6\u05E3 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA"><i class="bi bi-fire"></i> ${streakInfo.current}</span>` : '';
      const lateTime = this._attLateLog[sid] ? `<span class="badge bg-warning bg-opacity-10 text-warning ms-1"><i class="bi bi-clock"></i> ${this._attLateLog[sid]}</span>` : '';

      return `
        <div class="d-flex align-items-center gap-3 p-3 border-bottom att-row" data-id="${sid}" style="transition:background .15s">
          ${Utils.avatarHTML(name)}
          <div class="flex-grow-1 att-name-click" onclick="Pages.attQuickCycle('${sid}')" style="cursor:pointer" title="\u05DC\u05D7\u05D9\u05E6\u05D4 \u05DC\u05E1\u05D9\u05D1\u05D5\u05D1 \u05E1\u05D8\u05D8\u05D5\u05E1">
            <div class="fw-bold">${name}${streakBadge}${lateTime}</div>
            <small class="text-muted">\u05DB\u05D9\u05EA\u05D4 ${s['\u05DB\u05D9\u05EA\u05D4'] || '--'}</small>
          </div>
          <div class="d-flex gap-2">
            <div class="att-btn ${state === 'present' ? 'present selected' : ''}" onclick="Pages.toggleAtt('${sid}','present')" title="\u05E0\u05D5\u05DB\u05D7 (P)"><i class="bi bi-check-lg"></i></div>
            <div class="att-btn ${state === 'absent' ? 'absent selected' : ''}" onclick="Pages.toggleAtt('${sid}','absent')" title="\u05D7\u05D9\u05E1\u05D5\u05E8 (A)"><i class="bi bi-x-lg"></i></div>
            <div class="att-btn ${state === 'late' ? 'late selected' : ''}" onclick="Pages.attMarkLate('${sid}')" title="\u05D0\u05D9\u05D7\u05D5\u05E8 (L)"><i class="bi bi-clock"></i></div>
            <div class="att-btn ${state === 'excused' ? 'excused selected' : ''}" onclick="Pages.toggleAtt('${sid}','excused')" title="\u05E4\u05D8\u05D5\u05E8 (E)"><i class="bi bi-emoji-neutral"></i></div>
          </div>
        </div>`;
    }).join('');
    document.getElementById('att-content').innerHTML = `<div class="card border-0 shadow-sm">${html}</div>`;
  },

  /* ======================================================================
     VIEW: CALENDAR
     ====================================================================== */
  _attRenderCalendar() {
    const dateVal = document.getElementById('att-date').value;
    const [year, month] = dateVal.split('-').map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDay = new Date(year, month - 1, 1).getDay();
    const dayNames = ['\u05D0\u05F3','\u05D1\u05F3','\u05D2\u05F3','\u05D3\u05F3','\u05D4\u05F3','\u05D5\u05F3','\u05E9\u05F3'];
    const filtered = this._attFilteredStudents();

    // Aggregate daily stats for this month
    const monthStr = `${year}-${String(month).padStart(2, '0')}`;
    const monthRecords = this._attAllRecords.filter(r => (r['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '').startsWith(monthStr));

    const dailyStats = {};
    for (let d = 1; d <= daysInMonth; d++) {
      const ds = `${monthStr}-${String(d).padStart(2, '0')}`;
      const dayRecs = monthRecords.filter(r => r['\u05EA\u05D0\u05E8\u05D9\u05DA'] === ds);
      if (dayRecs.length) {
        dailyStats[d] = {
          present: dayRecs.filter(r => r['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E0\u05D5\u05DB\u05D7').length,
          absent: dayRecs.filter(r => r['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D7\u05D9\u05E1\u05D5\u05E8').length,
          late: dayRecs.filter(r => r['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D0\u05D9\u05D7\u05D5\u05E8').length,
          excused: dayRecs.filter(r => r['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E4\u05D8\u05D5\u05E8').length,
          total: dayRecs.length
        };
      }
    }

    const todayISO = Utils.todayISO();
    let html = `
      <div class="card border-0 shadow-sm p-3">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <button class="btn btn-outline-secondary btn-sm" onclick="Pages._attCalNav(-1)"><i class="bi bi-chevron-right"></i></button>
          <h5 class="fw-bold mb-0">${Utils.HEB_MONTHS[month - 1]} ${year}</h5>
          <button class="btn btn-outline-secondary btn-sm" onclick="Pages._attCalNav(1)"><i class="bi bi-chevron-left"></i></button>
        </div>
        <div class="att-calendar-grid">
          <div class="att-cal-header">${dayNames.map(d => `<div class="att-cal-day-name">${d}</div>`).join('')}</div>
          <div class="att-cal-body">`;

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
      html += '<div class="att-cal-cell empty"></div>';
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const ds = `${monthStr}-${String(d).padStart(2, '0')}`;
      const isToday = ds === todayISO;
      const stats = dailyStats[d];
      let cellColor = '';
      let cellContent = `<div class="att-cal-num">${d}</div>`;

      if (stats) {
        const pct = stats.total ? Math.round(stats.present / stats.total * 100) : 0;
        if (pct >= 90) cellColor = 'att-cal-green';
        else if (pct >= 70) cellColor = 'att-cal-yellow';
        else cellColor = 'att-cal-red';
        cellContent += `<div class="att-cal-pct">${pct}%</div>`;
        cellContent += `<div class="att-cal-mini">${stats.present}/${stats.total}</div>`;
      }

      html += `<div class="att-cal-cell ${cellColor} ${isToday ? 'att-cal-today' : ''}" onclick="Pages._attCalDayClick('${ds}')" title="${ds}">${cellContent}</div>`;
    }

    html += '</div></div></div>';

    // Legend
    html += `
      <div class="d-flex gap-3 mt-2 px-2 small text-muted flex-wrap">
        <span><span class="d-inline-block rounded" style="width:12px;height:12px;background:#d4edda"></span> 90%+ \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</span>
        <span><span class="d-inline-block rounded" style="width:12px;height:12px;background:#fff3cd"></span> 70-89%</span>
        <span><span class="d-inline-block rounded" style="width:12px;height:12px;background:#f8d7da"></span> \u05DE\u05EA\u05D7\u05EA 70%</span>
      </div>`;

    document.getElementById('att-content').innerHTML = html;
  },

  _attCalNav(dir) {
    const dateEl = document.getElementById('att-date');
    const [y, m, d] = dateEl.value.split('-').map(Number);
    const newDate = new Date(y, m - 1 + dir, 1);
    dateEl.value = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}-${String(newDate.getDate()).padStart(2, '0')}`;
    this._attRenderCalendar();
  },

  _attCalDayClick(dateStr) {
    document.getElementById('att-date').value = dateStr;
    this.attSetView('list');
    this.attendanceInit();
  },

  /* ======================================================================
     VIEW: HEATMAP
     ====================================================================== */
  _attRenderHeatmap() {
    const dateVal = document.getElementById('att-date').value;
    const [year, month] = dateVal.split('-').map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();
    const monthStr = `${year}-${String(month).padStart(2, '0')}`;
    const filtered = this._attFilteredStudents();

    // Build day columns
    const days = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const dt = new Date(year, month - 1, d);
      if (dt.getDay() !== 6) { // skip Shabbat
        days.push({ num: d, str: `${monthStr}-${String(d).padStart(2, '0')}` });
      }
    }

    let html = `
      <div class="card border-0 shadow-sm">
        <div class="p-3">
          <h6 class="fw-bold mb-3"><i class="bi bi-grid-3x3 text-primary me-2"></i>\u05DE\u05E4\u05EA \u05D7\u05D5\u05DD \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u2014 ${Utils.HEB_MONTHS[month - 1]} ${year}</h6>
        </div>
        <div class="table-responsive">
          <table class="table table-sm mb-0" style="font-size:11px">
            <thead>
              <tr>
                <th class="sticky-start" style="min-width:120px">\u05EA\u05DC\u05DE\u05D9\u05D3</th>
                ${days.map(d => `<th class="text-center px-1">${d.num}</th>`).join('')}
                <th class="text-center">\u05E1\u05D4\u05F4\u05DB</th>
              </tr>
            </thead>
            <tbody>`;

    const statusColors = {
      '\u05E0\u05D5\u05DB\u05D7': { bg: '#28a745', text: '#fff', letter: '\u05E0' },
      '\u05D7\u05D9\u05E1\u05D5\u05E8': { bg: '#dc3545', text: '#fff', letter: '\u05D7' },
      '\u05D0\u05D9\u05D7\u05D5\u05E8': { bg: '#ffc107', text: '#333', letter: '\u05D0' },
      '\u05E4\u05D8\u05D5\u05E8': { bg: '#6c757d', text: '#fff', letter: '\u05E4' }
    };

    filtered.forEach(s => {
      let presentCount = 0;
      let totalCount = 0;
      html += `<tr><td class="fw-bold sticky-start">${s._fullName}</td>`;

      days.forEach(d => {
        const rec = this._attAllRecords.find(r =>
          (String(r['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4'] || '') === String(s._id) ||
           (r['\u05E9\u05DD'] || '') === s._fullName) &&
          r['\u05EA\u05D0\u05E8\u05D9\u05DA'] === d.str
        );
        const status = rec ? rec['\u05E1\u05D8\u05D8\u05D5\u05E1'] : '';
        const info = statusColors[status];

        if (info) {
          totalCount++;
          if (status === '\u05E0\u05D5\u05DB\u05D7') presentCount++;
          html += `<td class="text-center px-1"><span style="display:inline-block;width:20px;height:20px;line-height:20px;border-radius:4px;background:${info.bg};color:${info.text};font-size:9px;font-weight:bold">${info.letter}</span></td>`;
        } else {
          html += '<td class="text-center px-1"><span style="display:inline-block;width:20px;height:20px;line-height:20px;border-radius:4px;background:#f0f0f0;color:#ccc;font-size:9px">-</span></td>';
        }
      });

      const pct = totalCount ? Math.round(presentCount / totalCount * 100) : 0;
      const pctClass = pct >= 90 ? 'text-success' : pct >= 70 ? 'text-warning' : 'text-danger';
      html += `<td class="text-center fw-bold ${pctClass}">${pct}%</td></tr>`;
    });

    html += '</tbody></table></div></div>';

    // Legend
    html += `<div class="d-flex gap-3 mt-2 px-2 small flex-wrap">`;
    Object.entries(statusColors).forEach(([label, info]) => {
      html += `<span><span style="display:inline-block;width:14px;height:14px;border-radius:3px;background:${info.bg};vertical-align:middle"></span> ${label}</span>`;
    });
    html += '</div>';

    document.getElementById('att-content').innerHTML = html;
  },

  /* ======================================================================
     QUICK MARK MODE — Cycle through statuses by clicking name
     ====================================================================== */
  attQuickCycle(id) {
    const cycle = ['', 'present', 'absent', 'late', 'excused'];
    const current = this._attState[String(id)] || '';
    const idx = cycle.indexOf(current);
    const next = cycle[(idx + 1) % cycle.length];
    this._attState[String(id)] = next;

    // If switching to late, record time
    if (next === 'late') {
      const now = new Date();
      this._attLateLog[String(id)] = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    } else if (next !== 'late') {
      delete this._attLateLog[String(id)];
    }

    this._attRenderCurrentView();
    // Show subtle toast
    const labels = { '': '\u05DC\u05D0 \u05E1\u05D5\u05DE\u05DF', present: '\u05E0\u05D5\u05DB\u05D7', absent: '\u05D7\u05E1\u05E8', late: '\u05D0\u05D9\u05D7\u05D5\u05E8', excused: '\u05E4\u05D8\u05D5\u05E8' };
    const student = this._attStudents.find(s => s._id === id);
    if (student) {
      const name = student._fullName;
      Utils.toast(`${name}: ${labels[next]}`, next === 'present' ? 'success' : next === 'absent' ? 'danger' : next === 'late' ? 'warning' : 'info');
    }
  },

  /* ======================================================================
     TOGGLE / MARK / LATE
     ====================================================================== */
  toggleAtt(id, status) {
    this._attState[String(id)] = this._attState[String(id)] === status ? '' : status;
    if (status !== 'late') delete this._attLateLog[String(id)];
    this._attRenderCurrentView();
  },

  attMarkLate(id) {
    const wasLate = this._attState[String(id)] === 'late';
    if (wasLate) {
      this._attState[String(id)] = '';
      delete this._attLateLog[String(id)];
    } else {
      this._attState[String(id)] = 'late';
      // Prompt for arrival time
      const now = new Date();
      const defaultTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      this._attLateLog[String(id)] = defaultTime;
    }
    this._attRenderCurrentView();
  },

  markAll(status) {
    const classF = document.getElementById('att-class-filter')?.value || '';
    this._attStudents.forEach(s => {
      if (classF && s['\u05DB\u05D9\u05EA\u05D4'] !== classF) return;
      this._attState[s._id] = status;
      if (status !== 'late') delete this._attLateLog[s._id];
    });
    this._attRenderCurrentView();
  },

  /* ======================================================================
     STATS CARDS
     ====================================================================== */
  _attUpdateStats() {
    const vals = Object.values(this._attState);
    const present = vals.filter(v => v === 'present').length;
    const absent = vals.filter(v => v === 'absent').length;
    const late = vals.filter(v => v === 'late').length;
    const excused = vals.filter(v => v === 'excused').length;
    const marked = present + absent + late + excused;
    const rate = marked ? Math.round(present / marked * 100) : 0;

    const el = (id) => document.getElementById(id);
    if (el('att-stat-present')) el('att-stat-present').textContent = present;
    if (el('att-stat-absent')) el('att-stat-absent').textContent = absent;
    if (el('att-stat-late')) el('att-stat-late').textContent = late;
    if (el('att-stat-rate')) el('att-stat-rate').textContent = rate + '%';

    // Streak: find top student
    if (this._attAllRecords.length && this._attStudents.length) {
      let bestName = '', bestStreak = 0;
      this._attStudents.forEach(s => {
        const info = this._attGetStreak(s._id);
        if (info.current > bestStreak) { bestStreak = info.current; bestName = s._fullName; }
      });
      const streakEl = document.getElementById('att-stat-streak');
      if (streakEl) streakEl.textContent = bestStreak > 0 ? bestStreak + ' \u05D9\u05DE\u05D9\u05DD (' + bestName + ')' : '--';
    }
  },

  /* ======================================================================
     DAILY SUMMARY BAR
     ====================================================================== */
  _attUpdateSummaryBar() {
    const vals = Object.values(this._attState);
    const total = this._attStudents.length || 1;
    const present = vals.filter(v => v === 'present').length;
    const absent = vals.filter(v => v === 'absent').length;
    const late = vals.filter(v => v === 'late').length;
    const excused = vals.filter(v => v === 'excused').length;
    const unmarked = total - present - absent - late - excused;

    const pctP = Math.round(present / total * 100);
    const pctA = Math.round(absent / total * 100);
    const pctL = Math.round(late / total * 100);
    const pctE = Math.round(excused / total * 100);

    const el = (id) => document.getElementById(id);
    if (el('att-bar-present')) el('att-bar-present').style.width = pctP + '%';
    if (el('att-bar-absent')) el('att-bar-absent').style.width = pctA + '%';
    if (el('att-bar-late')) el('att-bar-late').style.width = pctL + '%';
    if (el('att-bar-excused')) el('att-bar-excused').style.width = pctE + '%';

    if (el('att-bar-pct-p')) el('att-bar-pct-p').textContent = pctP + '%';
    if (el('att-bar-pct-a')) el('att-bar-pct-a').textContent = pctA + '%';
    if (el('att-bar-pct-l')) el('att-bar-pct-l').textContent = pctL + '%';
    if (el('att-bar-pct-e')) el('att-bar-pct-e').textContent = pctE + '%';

    if (el('att-summary-label')) el('att-summary-label').textContent = `${total} \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD | ${present + absent + late + excused} \u05E1\u05D5\u05DE\u05E0\u05D5`;
  },

  /* ======================================================================
     LATE ARRIVAL LOG
     ====================================================================== */
  _attRenderLateLog() {
    const card = document.getElementById('att-late-log-card');
    const container = document.getElementById('att-late-log');
    if (!card || !container) return;

    const lateEntries = Object.entries(this._attLateLog);
    if (!lateEntries.length) {
      card.style.display = 'none';
      return;
    }
    card.style.display = '';

    const html = lateEntries.map(([id, time]) => {
      const student = this._attStudents.find(s => s._id === id);
      if (!student) return '';
      return `
        <div class="d-flex align-items-center gap-3 py-2 border-bottom">
          ${Utils.avatarHTML(student._fullName, 'sm')}
          <div class="flex-grow-1">
            <div class="fw-bold small">${student._fullName}</div>
            <small class="text-muted">${student['\u05DB\u05D9\u05EA\u05D4'] || ''}</small>
          </div>
          <div class="d-flex align-items-center gap-2">
            <input type="time" class="form-control form-control-sm" value="${time}" style="width:100px"
              onchange="Pages._attLateLog['${id}']=this.value">
            <span class="badge bg-warning text-dark"><i class="bi bi-clock me-1"></i>${time}</span>
          </div>
        </div>`;
    }).join('');
    container.innerHTML = html || '<div class="text-muted text-center py-2">\u05D0\u05D9\u05DF \u05D0\u05D9\u05D7\u05D5\u05E8\u05D9\u05DD</div>';
  },

  /* ======================================================================
     STREAK TRACKING
     ====================================================================== */
  _attGetStreak(studentId) {
    // Calculate current consecutive attendance streak
    const records = this._attAllRecords
      .filter(r => String(r['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4'] || '') === String(studentId) ||
                   (r['\u05E9\u05DD'] || '') === (this._attStudents.find(s => s._id === studentId)?._fullName || ''))
      .filter(r => r['\u05EA\u05D0\u05E8\u05D9\u05DA'])
      .sort((a, b) => b['\u05EA\u05D0\u05E8\u05D9\u05DA'].localeCompare(a['\u05EA\u05D0\u05E8\u05D9\u05DA']));

    let current = 0;
    let best = 0;
    let tempStreak = 0;

    for (const rec of records) {
      if (rec['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E0\u05D5\u05DB\u05D7') {
        tempStreak++;
      } else {
        if (current === 0) current = tempStreak;
        best = Math.max(best, tempStreak);
        tempStreak = 0;
      }
    }
    if (current === 0) current = tempStreak;
    best = Math.max(best, tempStreak);

    return { current, best };
  },

  _attRenderStreaks() {
    const card = document.getElementById('att-streaks-card');
    const container = document.getElementById('att-streaks');
    if (!card || !container) return;

    if (!this._attAllRecords.length) {
      card.style.display = 'none';
      return;
    }
    card.style.display = '';

    const streaks = this._attStudents.map(s => ({
      student: s,
      ...this._attGetStreak(s._id)
    })).sort((a, b) => b.current - a.current);

    const maxStreak = Math.max(...streaks.map(s => s.current), 1);

    const html = streaks.slice(0, 10).map((s, i) => {
      const pct = Math.round(s.current / maxStreak * 100);
      const medal = i === 0 ? '<i class="bi bi-trophy-fill text-warning me-1"></i>' : i === 1 ? '<i class="bi bi-trophy-fill text-secondary me-1"></i>' : i === 2 ? '<i class="bi bi-trophy-fill" style="color:#cd7f32"></i> ' : '';
      return `
        <div class="d-flex align-items-center gap-2 mb-2">
          <div style="width:130px" class="fw-bold small text-truncate">${medal}${s.student._fullName}</div>
          <div class="flex-grow-1">
            <div class="progress" style="height:20px;border-radius:6px">
              <div class="progress-bar bg-success bg-opacity-75" style="width:${pct}%;border-radius:6px;font-size:11px">${s.current} \u05D9\u05DE\u05D9\u05DD</div>
            </div>
          </div>
          <div class="text-muted small" style="width:70px" title="\u05E9\u05D9\u05D0 \u05D0\u05D9\u05E9\u05D9">\u05E9\u05D9\u05D0: ${s.best}</div>
        </div>`;
    }).join('');

    container.innerHTML = html;
  },

  /* ======================================================================
     SAVE ATTENDANCE
     ====================================================================== */
  async saveAttendance() {
    const date = document.getElementById('att-date').value;
    const statusMap = { present: '\u05E0\u05D5\u05DB\u05D7', absent: '\u05D7\u05D9\u05E1\u05D5\u05E8', late: '\u05D0\u05D9\u05D7\u05D5\u05E8', excused: '\u05E4\u05D8\u05D5\u05E8' };
    const rows = [];
    this._attStudents.forEach(s => {
      const st = this._attState[s._id];
      if (st) {
        const row = {
          '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': s._id,
          '\u05E9\u05DD': s._fullName,
          '\u05DB\u05D9\u05EA\u05D4': s['\u05DB\u05D9\u05EA\u05D4'] || '',
          '\u05EA\u05D0\u05E8\u05D9\u05DA': date,
          '\u05E1\u05D8\u05D8\u05D5\u05E1': statusMap[st]
        };
        if (st === 'late' && this._attLateLog[s._id]) {
          row['\u05E9\u05E2\u05EA_\u05D4\u05D2\u05E2\u05D4'] = this._attLateLog[s._id];
        }
        rows.push(row);
      }
    });
    if (rows.length === 0) { Utils.toast('\u05DC\u05D0 \u05E1\u05D5\u05DE\u05E0\u05D5 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD', 'warning'); return; }
    try {
      await App.apiCall('bulkAdd', '\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA', { rows });
      Utils.toast(`\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05E0\u05E9\u05DE\u05E8\u05D4: ${rows.length} \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD`, 'success');
    } catch (e) {
      localStorage.setItem('bht_att_' + date, JSON.stringify(rows));
      Utils.toast('\u05E0\u05E9\u05DE\u05E8 \u05DE\u05E7\u05D5\u05DE\u05D9\u05EA \u2014 \u05D9\u05E9\u05DC\u05D7 \u05D1\u05D7\u05D9\u05D1\u05D5\u05E8 \u05D4\u05D1\u05D0', 'info');
    }
  },

  /* ======================================================================
     KEYBOARD SHORTCUTS
     ====================================================================== */
  bindAttKeyboard() {
    if (this._attKeyListener) document.removeEventListener('keydown', this._attKeyListener);
    this._attKeyListener = (e) => {
      if (App.currentPage !== 'attendance') return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
      const hovered = document.querySelector('.att-row:hover');
      if (!hovered) return;
      const id = hovered.dataset.id;
      if (!id) return;
      const key = e.key.toLowerCase();
      if (key === 'p' || e.key === '\u05E0') this.toggleAtt(id, 'present');
      else if (key === 'a' || e.key === '\u05D7') this.toggleAtt(id, 'absent');
      else if (key === 'l' || e.key === '\u05D0') this.attMarkLate(id);
      else if (key === 'e' || e.key === '\u05E4') this.toggleAtt(id, 'excused');
    };
    document.addEventListener('keydown', this._attKeyListener);
  },

  /* ======================================================================
     COPY SUMMARY
     ====================================================================== */
  copyAttSummary() {
    const vals = Object.values(this._attState);
    const p = vals.filter(v => v === 'present').length;
    const a = vals.filter(v => v === 'absent').length;
    const l = vals.filter(v => v === 'late').length;
    const ex = vals.filter(v => v === 'excused').length;
    const date = document.getElementById('att-date').value;
    const absentNames = this._attStudents.filter(s => this._attState[s._id] === 'absent').map(s => s._fullName);
    const lateNames = this._attStudents.filter(s => this._attState[s._id] === 'late').map(s => {
      const time = this._attLateLog[s._id];
      return s._fullName + (time ? ` (${time})` : '');
    });
    let text = `\u05E1\u05D9\u05DB\u05D5\u05DD \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA ${date}\n\u05E0\u05D5\u05DB\u05D7\u05D9\u05DD: ${p} | \u05D7\u05E1\u05E8\u05D9\u05DD: ${a} | \u05D0\u05D9\u05D7\u05D5\u05E8: ${l} | \u05E4\u05D8\u05D5\u05E8: ${ex}`;
    if (absentNames.length) text += '\n\u05D7\u05E1\u05E8\u05D9\u05DD: ' + absentNames.join(', ');
    if (lateNames.length) text += '\n\u05D0\u05D9\u05D7\u05D5\u05E8\u05D9\u05DD: ' + lateNames.join(', ');
    navigator.clipboard.writeText(text)
      .then(() => Utils.toast('\u05D4\u05D5\u05E2\u05EA\u05E7 \u05DC\u05DC\u05D5\u05D7'))
      .catch(() => Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05D4\u05E2\u05EA\u05E7\u05D4', 'danger'));
  },

  /* ======================================================================
     EXPORT OPTIONS
     ====================================================================== */
  attExport(type) {
    const date = document.getElementById('att-date').value;
    const [year, month] = date.split('-').map(Number);
    const statusMap = { present: '\u05E0\u05D5\u05DB\u05D7', absent: '\u05D7\u05E1\u05E8', late: '\u05D0\u05D9\u05D7\u05D5\u05E8', excused: '\u05E4\u05D8\u05D5\u05E8' };

    if (type === 'daily') {
      // Daily report CSV
      let csv = '\uFEFF\u05E9\u05DD,\u05DB\u05D9\u05EA\u05D4,\u05E1\u05D8\u05D8\u05D5\u05E1,\u05E9\u05E2\u05EA \u05D4\u05D2\u05E2\u05D4\n';
      this._attStudents.forEach(s => {
        const st = this._attState[s._id] || '';
        const label = statusMap[st] || '--';
        const time = this._attLateLog[s._id] || '';
        csv += `"${s._fullName}","${s['\u05DB\u05D9\u05EA\u05D4'] || ''}","${label}","${time}"\n`;
      });
      this._attDownloadCSV(csv, `\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA_\u05D9\u05D5\u05DE\u05D9_${date}`);

    } else if (type === 'weekly') {
      // Last 7 days summary
      const today = new Date(date);
      const days = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        if (d.getDay() !== 6) days.push(d.toISOString().slice(0, 10));
      }

      let csv = '\uFEFF\u05E9\u05DD,\u05DB\u05D9\u05EA\u05D4,' + days.map(d => d.slice(5)).join(',') + ',\u05D0\u05D7\u05D5\u05D6 %\n';
      this._attStudents.forEach(s => {
        let pCount = 0, tCount = 0;
        csv += `"${s._fullName}","${s['\u05DB\u05D9\u05EA\u05D4'] || ''}"`;
        days.forEach(d => {
          const rec = this._attAllRecords.find(r =>
            (String(r['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4'] || '') === String(s._id) || (r['\u05E9\u05DD'] || '') === s._fullName) &&
            r['\u05EA\u05D0\u05E8\u05D9\u05DA'] === d);
          const st = rec ? rec['\u05E1\u05D8\u05D8\u05D5\u05E1'] : '';
          if (st) tCount++;
          if (st === '\u05E0\u05D5\u05DB\u05D7') pCount++;
          csv += ',' + (st || '-');
        });
        csv += ',' + (tCount ? Math.round(pCount / tCount * 100) + '%' : '-') + '\n';
      });
      this._attDownloadCSV(csv, `\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA_\u05E9\u05D1\u05D5\u05E2\u05D9_${date}`);

    } else if (type === 'monthly') {
      const monthStr = `${year}-${String(month).padStart(2, '0')}`;
      const daysInMonth = new Date(year, month, 0).getDate();
      const days = [];
      for (let d = 1; d <= daysInMonth; d++) {
        const dt = new Date(year, month - 1, d);
        if (dt.getDay() !== 6) days.push(`${monthStr}-${String(d).padStart(2, '0')}`);
      }

      let csv = '\uFEFF\u05E9\u05DD,\u05DB\u05D9\u05EA\u05D4,' + days.map(d => d.slice(8)).join(',') + ',\u05E0\u05D5\u05DB\u05D7,\u05D7\u05E1\u05E8,\u05D0\u05D9\u05D7\u05D5\u05E8,\u05D0\u05D7\u05D5\u05D6 %\n';
      this._attStudents.forEach(s => {
        let pC = 0, aC = 0, lC = 0;
        csv += `"${s._fullName}","${s['\u05DB\u05D9\u05EA\u05D4'] || ''}"`;
        days.forEach(d => {
          const rec = this._attAllRecords.find(r =>
            (String(r['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4'] || '') === String(s._id) || (r['\u05E9\u05DD'] || '') === s._fullName) &&
            r['\u05EA\u05D0\u05E8\u05D9\u05DA'] === d);
          const st = rec ? rec['\u05E1\u05D8\u05D8\u05D5\u05E1'] : '';
          if (st === '\u05E0\u05D5\u05DB\u05D7') { pC++; csv += ',\u05E0'; }
          else if (st === '\u05D7\u05D9\u05E1\u05D5\u05E8') { aC++; csv += ',\u05D7'; }
          else if (st === '\u05D0\u05D9\u05D7\u05D5\u05E8') { lC++; csv += ',\u05D0'; }
          else if (st === '\u05E4\u05D8\u05D5\u05E8') csv += ',\u05E4';
          else csv += ',-';
        });
        const total = pC + aC + lC;
        csv += `,${pC},${aC},${lC},${total ? Math.round(pC / total * 100) + '%' : '-'}\n`;
      });
      this._attDownloadCSV(csv, `\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA_\u05D7\u05D5\u05D3\u05E9\u05D9_${monthStr}`);
    }
  },

  _attDownloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename + '.csv';
    link.click();
    Utils.toast('CSV \u05D9\u05D5\u05E6\u05D0 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4', 'success');
  },

  /* ======================================================================
     PRINT
     ====================================================================== */
  printAttendance() {
    const win = window.open('', '', 'width=800,height=600');
    const date = document.getElementById('att-date').value;
    const statusMap = { present: '\u05E0\u05D5\u05DB\u05D7', absent: '\u05D7\u05E1\u05E8', late: '\u05D0\u05D9\u05D7\u05D5\u05E8', excused: '\u05E4\u05D8\u05D5\u05E8' };
    const statusColors = { present: '#28a745', absent: '#dc3545', late: '#ffc107', excused: '#6c757d' };

    const vals = Object.values(this._attState);
    const p = vals.filter(v => v === 'present').length;
    const a = vals.filter(v => v === 'absent').length;
    const l = vals.filter(v => v === 'late').length;
    const ex = vals.filter(v => v === 'excused').length;

    const rows = this._attStudents.map(s => {
      const st = this._attState[s._id] || '';
      const label = statusMap[st] || '--';
      const color = statusColors[st] || '#999';
      const time = st === 'late' && this._attLateLog[s._id] ? ` (${this._attLateLog[s._id]})` : '';
      return `<tr><td>${s._fullName}</td><td>${s['\u05DB\u05D9\u05EA\u05D4'] || ''}</td><td style="color:${color};font-weight:bold">${label}${time}</td></tr>`;
    }).join('');

    win.document.write(`<html dir="rtl"><head><title>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA ${date}</title>
      <style>body{font-family:Heebo,sans-serif;padding:20px}table{width:100%;border-collapse:collapse}td,th{border:1px solid #ddd;padding:8px;text-align:right}th{background:#f5f5f5}.summary{margin:10px 0;padding:10px;background:#f8f9fa;border-radius:8px;display:flex;gap:20px}</style></head>
      <body>
        <h2>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u2014 ${date}</h2>
        <div class="summary">
          <span>\u05E0\u05D5\u05DB\u05D7\u05D9\u05DD: <strong style="color:#28a745">${p}</strong></span>
          <span>\u05D7\u05E1\u05E8\u05D9\u05DD: <strong style="color:#dc3545">${a}</strong></span>
          <span>\u05D0\u05D9\u05D7\u05D5\u05E8: <strong style="color:#ffc107">${l}</strong></span>
          <span>\u05E4\u05D8\u05D5\u05E8: <strong style="color:#6c757d">${ex}</strong></span>
        </div>
        <table><thead><tr><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th>\u05DB\u05D9\u05EA\u05D4</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th></tr></thead><tbody>${rows}</tbody></table>
      </body></html>`);
    win.document.close();
    win.print();
  },

  /* ======================================================================
     ATTENDANCE MONTHLY (Standalone Page)
     ====================================================================== */
  attendance_monthly() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div><h1><i class="bi bi-calendar-month me-2"></i>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D7\u05D5\u05D3\u05E9\u05D9\u05EA</h1></div>
        <div class="d-flex gap-2"><input type="month" class="form-control form-control-sm" id="attm-month" style="width:180px"><button class="btn btn-outline-secondary btn-sm" onclick="Pages.loadAttMonthly()"><i class="bi bi-arrow-clockwise"></i></button></div>
      </div>
      <div class="row g-3 mb-3">
        <div class="col-md-3"><div class="card p-3 text-center border-0 shadow-sm"><div class="fs-4 fw-bold text-success" id="attm-pct">--</div><small>\u05D0\u05D7\u05D5\u05D6 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</small></div></div>
        <div class="col-md-3"><div class="card p-3 text-center border-0 shadow-sm"><div class="fs-4 fw-bold" id="attm-days">--</div><small>\u05D9\u05DE\u05D9 \u05DC\u05D9\u05DE\u05D5\u05D3</small></div></div>
        <div class="col-md-3"><div class="card p-3 text-center border-0 shadow-sm"><div class="fs-4 fw-bold text-primary" id="attm-students">--</div><small>\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</small></div></div>
        <div class="col-md-3"><div class="card p-3 text-center border-0 shadow-sm"><div class="fs-4 fw-bold text-danger" id="attm-absent">--</div><small>\u05D7\u05D9\u05E1\u05D5\u05E8\u05D9\u05DD</small></div></div>
      </div>
      <div id="attm-table">${Utils.skeleton(3)}</div>
    `;
  },

  _attmListenersAdded: false,
  attendance_monthlyInit() {
    const d = new Date();
    document.getElementById('attm-month').value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (!this._attmListenersAdded) {
      this._attmListenersAdded = true;
      document.getElementById('attm-month').addEventListener('change', () => this.loadAttMonthly());
    }
    this.loadAttMonthly();
  },

  loadAttMonthly() {
    const month = document.getElementById('attm-month').value;
    if (!month) return;
    // Load from DATA_CACHE (sync, no API calls)
    let att = (typeof DATA_CACHE !== 'undefined' && DATA_CACHE['\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA']) ? DATA_CACHE['\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA'] : [];
    if (!att || !att.length) {
      if (this._attUseDemo) {
        this._attGenerateDemo();
        att = this._attDemoRecords || [];
      } else {
        att = [];
      }
    }

    const monthAtt = att.filter(a => (a['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '').startsWith(month));
    const students = [...new Set(monthAtt.map(a => a['\u05E9\u05DD'] || a['\u05EA\u05DC\u05DE\u05D9\u05D3'] || ''))];
    const days = [...new Set(monthAtt.map(a => a['\u05EA\u05D0\u05E8\u05D9\u05DA']))].sort();
    const present = monthAtt.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E0\u05D5\u05DB\u05D7').length;
    const absentC = monthAtt.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D7\u05D9\u05E1\u05D5\u05E8').length;

    document.getElementById('attm-pct').textContent = monthAtt.length ? Math.round(present / monthAtt.length * 100) + '%' : '--';
    document.getElementById('attm-days').textContent = days.length;
    document.getElementById('attm-students').textContent = students.length;
    document.getElementById('attm-absent').textContent = absentC;

    if (!students.length) {
      document.getElementById('attm-table').innerHTML = '<div class="text-muted text-center py-3">\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05DC\u05D7\u05D5\u05D3\u05E9 \u05D6\u05D4</div>';
      return;
    }

    let html = '<div class="card border-0 shadow-sm table-responsive"><table class="table table-sm table-bht mb-0"><thead><tr><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th>';
    days.forEach(d => { html += `<th class="text-center" style="font-size:10px">${d.substring(8)}</th>`; });
    html += '<th>\u05D0\u05D7\u05D5\u05D6</th></tr></thead><tbody>';

    students.forEach(st => {
      html += `<tr><td class="fw-bold small">${st}</td>`;
      let pCnt = 0;
      days.forEach(d => {
        const rec = monthAtt.find(a => (a['\u05E9\u05DD'] || a['\u05EA\u05DC\u05DE\u05D9\u05D3'] || '') === st && a['\u05EA\u05D0\u05E8\u05D9\u05DA'] === d);
        const s = rec ? rec['\u05E1\u05D8\u05D8\u05D5\u05E1'] : '';
        if (s === '\u05E0\u05D5\u05DB\u05D7') pCnt++;
        const cls = s === '\u05E0\u05D5\u05DB\u05D7' ? 'bg-success' : s === '\u05D7\u05D9\u05E1\u05D5\u05E8' ? 'bg-danger' : s === '\u05D0\u05D9\u05D7\u05D5\u05E8' ? 'bg-warning' : s === '\u05E4\u05D8\u05D5\u05E8' ? 'bg-secondary' : '';
        html += `<td class="text-center">${cls ? `<span class="badge ${cls}" style="font-size:8px;width:16px;height:16px;display:inline-block;border-radius:50%"></span>` : '-'}</td>`;
      });
      const pct = days.length ? Math.round(pCnt / days.length * 100) : 0;
      html += `<td class="fw-bold ${pct >= 80 ? 'text-success' : pct >= 60 ? 'text-warning' : 'text-danger'}">${pct}%</td></tr>`;
    });
    html += '</tbody></table></div>';
    document.getElementById('attm-table').innerHTML = html;
    document.getElementById('attm-table').innerHTML += this._renderAttHeatmap(att);
  },

  _renderAttHeatmap(att) {
    const today = new Date();
    const counts = {};
    att.forEach(a => {
      const d = a['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '';
      if (!d) return;
      if (!counts[d]) counts[d] = { p: 0, a: 0, t: 0 };
      counts[d].t++;
      if (a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E0\u05D5\u05DB\u05D7') counts[d].p++;
      else counts[d].a++;
    });

    let html = '<div class="card p-3 mt-3 border-0 shadow-sm"><h6 class="fw-bold"><i class="bi bi-grid-3x3 me-2"></i>\u05DE\u05E4\u05EA \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05E9\u05E0\u05EA\u05D9\u05EA</h6><div style="overflow-x:auto"><div style="display:flex;gap:2px;direction:ltr">';

    for (let w = 51; w >= 0; w--) {
      html += '<div style="display:flex;flex-direction:column;gap:2px">';
      for (let d = 0; d < 7; d++) {
        const date = new Date(today);
        date.setDate(date.getDate() - (w * 7 + (6 - d)));
        const ds = date.toISOString().slice(0, 10);
        const c = counts[ds];
        let color = '#ebedf0';
        if (c) {
          const pct = c.t ? c.p / c.t : 0;
          if (pct >= 0.9) color = '#216e39';
          else if (pct >= 0.7) color = '#30a14e';
          else if (pct >= 0.5) color = '#40c463';
          else if (pct > 0) color = '#9be9a8';
          else color = '#ea4335';
        }
        html += `<div style="width:12px;height:12px;border-radius:2px;background:${color}" title="${ds}${c ? ' (' + c.p + '/' + c.t + ')' : ''}"></div>`;
      }
      html += '</div>';
    }
    html += '</div><div class="d-flex gap-2 mt-2 small text-muted"><span>\u05E4\u05D7\u05D5\u05EA</span>';
    ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'].forEach(c => {
      html += `<div style="width:12px;height:12px;border-radius:2px;background:${c}"></div>`;
    });
    html += '<span>\u05D9\u05D5\u05EA\u05E8</span></div></div>';
    return html;
  },
});

/* ===== Inline styles for calendar grid (injected once) ===== */
(function () {
  if (document.getElementById('att-calendar-styles')) return;
  const style = document.createElement('style');
  style.id = 'att-calendar-styles';
  style.textContent = `
    .att-calendar-grid { user-select: none; }
    .att-cal-header { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; margin-bottom: 4px; }
    .att-cal-day-name { text-align: center; font-size: 11px; font-weight: bold; color: #6c757d; padding: 4px 0; }
    .att-cal-body { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
    .att-cal-cell { min-height: 70px; border-radius: 8px; padding: 6px; cursor: pointer; background: #f8f9fa; border: 1px solid #e9ecef; transition: all .15s; display: flex; flex-direction: column; align-items: center; justify-content: center; }
    .att-cal-cell:not(.empty):hover { transform: scale(1.05); box-shadow: 0 2px 8px rgba(0,0,0,.12); z-index: 1; }
    .att-cal-cell.empty { background: transparent; border: none; cursor: default; }
    .att-cal-cell.att-cal-today { border: 2px solid var(--bs-primary); font-weight: bold; }
    .att-cal-cell.att-cal-green { background: #d4edda; border-color: #c3e6cb; }
    .att-cal-cell.att-cal-yellow { background: #fff3cd; border-color: #ffeeba; }
    .att-cal-cell.att-cal-red { background: #f8d7da; border-color: #f5c6cb; }
    .att-cal-num { font-size: 16px; font-weight: bold; }
    .att-cal-pct { font-size: 11px; color: #555; }
    .att-cal-mini { font-size: 9px; color: #888; }
    .att-btn.excused { background: #f0f0f0; color: #6c757d; }
    .att-btn.excused.selected { background: #6c757d; color: #fff; }
    .att-name-click:hover { background: rgba(0,0,0,0.03); border-radius: 6px; }
    .sticky-start { position: sticky; right: 0; background: #fff; z-index: 1; }
  `;
  document.head.appendChild(style);
})();
