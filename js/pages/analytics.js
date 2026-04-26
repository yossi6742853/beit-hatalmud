/* ===== BHT v6.0 — Analytics Dashboard (אנליטיקס) ===== */
Object.assign(Pages, {

  /* ---------- Demo data generators ---------- */
  _analyticsDemoNames: [
    '\u05d9\u05d5\u05e1\u05e3 \u05db\u05d4\u05df','\u05de\u05e9\u05d4 \u05dc\u05d5\u05d9','\u05d0\u05d1\u05e8\u05d4\u05dd \u05d9\u05e6\u05d7\u05e7\u05d9',
    '\u05d3\u05d5\u05d3 \u05e9\u05de\u05e2\u05d5\u05e0\u05d9','\u05d9\u05e2\u05e7\u05d1 \u05e4\u05e8\u05d9\u05d3\u05de\u05df','\u05e9\u05de\u05d5\u05d0\u05dc \u05d1\u05e8\u05d2\u05e8',
    '\u05d0\u05dc\u05d9\u05d4\u05d5 \u05d2\u05d5\u05dc\u05d3\u05e9\u05d8\u05d9\u05d9\u05df','\u05d7\u05d9\u05d9\u05dd \u05e8\u05d5\u05d6\u05e0\u05d1\u05e8\u05d2',
    '\u05e0\u05ea\u05e0\u05d0\u05dc \u05d5\u05d9\u05e0\u05e8','\u05e8\u05e4\u05d0\u05dc \u05de\u05d6\u05e8\u05d7\u05d9',
    '\u05d0\u05e8\u05d9\u05d4 \u05db\u05e5','\u05de\u05e0\u05d7\u05dd \u05de\u05e0\u05d3\u05dc',
    '\u05d1\u05e0\u05d9\u05de\u05d9\u05df \u05e9\u05e8\u05d1\u05d9\u05d8','\u05e2\u05de\u05d9\u05ea\u05d9 \u05d4\u05d5\u05e8\u05d5\u05d1\u05d9\u05e5',
    '\u05d2\u05d3 \u05e8\u05d5\u05ea\u05dd','\u05e6\u05d1\u05d9 \u05e4\u05d5\u05dc\u05e7',
    '\u05d0\u05d9\u05ea\u05df \u05d1\u05dc\u05d5\u05da','\u05e2\u05d5\u05d6\u05d9 \u05e7\u05e4\u05dc\u05df',
    '\u05d9\u05d4\u05d5\u05e0\u05ea\u05df \u05e9\u05e4\u05d9\u05e8\u05d0','\u05d0\u05e9\u05e8 \u05d0\u05dc\u05d1\u05d6',
    '\u05e9\u05dc\u05de\u05d4 \u05d3\u05d4\u05df','\u05d9\u05e9\u05e8\u05d0\u05dc \u05d0\u05d3\u05dc\u05e8',
    '\u05d0\u05d4\u05e8\u05df \u05d1\u05d5\u05e8\u05e0\u05e9\u05d8\u05d9\u05d9\u05df','\u05e0\u05d7\u05de\u05df \u05e8\u05d5\u05d8\u05de\u05df'
  ],

  _analyticsClasses: [
    '\u05db\u05d9\u05ea\u05d4 \u05d0', // כיתה א
    '\u05db\u05d9\u05ea\u05d4 \u05d1', // כיתה ב
    '\u05db\u05d9\u05ea\u05d4 \u05d2', // כיתה ג
    '\u05db\u05d9\u05ea\u05d4 \u05d3'  // כיתה ד
  ],

  _analyticsSubjects: [
    '\u05d2\u05de\u05e8\u05d0', // גמרא
    '\u05d7\u05d5\u05de\u05e9', // חומש
    '\u05d4\u05dc\u05db\u05d4', // הלכה
    '\u05de\u05e9\u05e0\u05d4', // משנה
    '\u05e0\u05d1\u05d9\u05d0\u05d9\u05dd' // נביאים
  ],

  _analyticsMonthNames: [
    '\u05ea\u05e9\u05e8\u05d9','\u05d7\u05e9\u05d5\u05df','\u05db\u05e1\u05dc\u05d5',
    '\u05d8\u05d1\u05ea','\u05e9\u05d1\u05d8','\u05d0\u05d3\u05e8',
    '\u05e0\u05d9\u05e1\u05df','\u05d0\u05d9\u05d9\u05e8','\u05e1\u05d9\u05d5\u05df',
    '\u05ea\u05de\u05d5\u05d6','\u05d0\u05d1','\u05d0\u05dc\u05d5\u05dc'
  ],

  _anRand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; },

  _anDemoKPI() {
    return {
      attendanceRate: 87,
      attendanceTrend: [82, 85, 83, 88, 86, 90, 87, 89, 85, 88, 91, 87],
      gradeAvg: 76.4,
      gradeTrend: [72, 74, 73, 75, 76, 74, 77, 75, 78, 76, 77, 76],
      collectionRate: 91,
      collectionTrend: [85, 88, 87, 90, 89, 92, 91, 93, 90, 92, 94, 91],
      activeStudents: 24,
      studentsTrend: [18, 19, 20, 20, 21, 22, 22, 23, 23, 24, 24, 24],
      taskCompletion: 73,
      tasksTrend: [60, 65, 68, 70, 72, 71, 75, 73, 74, 76, 72, 73],
      parentEngagement: 64,
      parentTrend: [45, 50, 52, 55, 58, 60, 59, 62, 63, 65, 64, 64]
    };
  },

  _anDemoAtRisk() {
    return [
      { name: '\u05d3\u05d5\u05d3 \u05e9\u05de\u05e2\u05d5\u05e0\u05d9', cls: '\u05db\u05d9\u05ea\u05d4 \u05d1', att: 58, grade: 52, reason: '\u05e0\u05d5\u05db\u05d7\u05d5\u05ea \u05e0\u05de\u05d5\u05db\u05d4 + \u05e6\u05d9\u05d5\u05e0\u05d9\u05dd \u05e0\u05de\u05d5\u05db\u05d9\u05dd' },
      { name: '\u05e0\u05ea\u05e0\u05d0\u05dc \u05d5\u05d9\u05e0\u05e8', cls: '\u05db\u05d9\u05ea\u05d4 \u05d0', att: 65, grade: 55, reason: '\u05d4\u05d9\u05e2\u05d3\u05e8\u05d5\u05ea \u05e8\u05d1\u05d5\u05ea' },
      { name: '\u05d0\u05e8\u05d9\u05d4 \u05db\u05e5', cls: '\u05db\u05d9\u05ea\u05d4 \u05d2', att: 69, grade: 48, reason: '\u05e6\u05d9\u05d5\u05e0\u05d9\u05dd \u05e0\u05de\u05d5\u05db\u05d9\u05dd \u05de\u05d0\u05d5\u05d3' },
      { name: '\u05e2\u05d5\u05d6\u05d9 \u05e7\u05e4\u05dc\u05df', cls: '\u05db\u05d9\u05ea\u05d4 \u05d3', att: 62, grade: 58, reason: '\u05d4\u05d9\u05e2\u05d3\u05e8\u05d5\u05ea + \u05d1\u05e2\u05d9\u05d5\u05ea \u05d4\u05ea\u05e0\u05d4\u05d2\u05d5\u05ea' },
      { name: '\u05e9\u05dc\u05de\u05d4 \u05d3\u05d4\u05df', cls: '\u05db\u05d9\u05ea\u05d4 \u05d1', att: 67, grade: 59, reason: '\u05e0\u05d5\u05db\u05d7\u05d5\u05ea \u05e0\u05de\u05d5\u05db\u05d4' }
    ];
  },

  /* ---------- Sparkline SVG generator ---------- */
  _sparkline(data, color, w = 80, h = 28) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const step = w / (data.length - 1);
    const pts = data.map((v, i) => `${i * step},${h - ((v - min) / range) * (h - 4) - 2}`).join(' ');
    return `<svg width="${w}" height="${h}" class="d-inline-block align-middle">
      <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="${(data.length - 1) * step}" cy="${h - ((data[data.length - 1] - min) / range) * (h - 4) - 2}" r="3" fill="${color}"/>
    </svg>`;
  },

  /* ---------- KPI Card builder ---------- */
  _kpiCard(icon, iconColor, label, value, suffix, trend, sparkColor, bgClass) {
    const lastTwo = trend.slice(-2);
    const diff = lastTwo[1] - lastTwo[0];
    const arrow = diff > 0 ? '\u05e2\u05dc\u05d9\u05d9\u05d4' : diff < 0 ? '\u05d9\u05e8\u05d9\u05d3\u05d4' : '\u05dc\u05dc\u05d0 \u05e9\u05d9\u05e0\u05d5\u05d9';
    const arrowIcon = diff > 0 ? 'bi-arrow-up-short text-success' : diff < 0 ? 'bi-arrow-down-short text-danger' : 'bi-dash text-muted';
    return `
      <div class="col-lg-2 col-md-4 col-sm-6">
        <div class="card border-0 shadow-sm h-100 ${bgClass || ''}">
          <div class="card-body p-3">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div class="rounded-3 p-2" style="background:${iconColor}15">
                <i class="bi ${icon} fs-5" style="color:${iconColor}"></i>
              </div>
              ${this._sparkline(trend, sparkColor)}
            </div>
            <h3 class="fw-bold mb-0">${value}${suffix ? `<small class="fs-6 fw-normal text-muted me-1">${suffix}</small>` : ''}</h3>
            <div class="d-flex justify-content-between align-items-center mt-1">
              <small class="text-muted">${label}</small>
              <small class="${arrowIcon.replace('bi-', '').includes('success') ? 'text-success' : arrowIcon.replace('bi-', '').includes('danger') ? 'text-danger' : 'text-muted'}">
                <i class="bi ${arrowIcon}"></i>${Math.abs(diff)}
              </small>
            </div>
          </div>
        </div>
      </div>`;
  },

  /* ---------- Demo flag ---------- */
  _anUseDemo: false,

  anLoadDemo() {
    this._anUseDemo = true;
    this.analyticsInit();
    Utils.toast('\u05E0\u05D8\u05E2\u05E0\u05D5 \u05E0\u05EA\u05D5\u05E0\u05D9 \u05D3\u05DE\u05D5', 'info');
  },

  /* ---------- Main Analytics HTML ---------- */
  analytics() {
    const classes = this._analyticsClasses;
    const classOptions = classes.map(c => `<option value="${c}">${c}</option>`).join('');

    return `
      <!-- Page Header -->
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2 mb-4">
        <div>
          <h1><i class="bi bi-graph-up-arrow me-2 text-primary"></i>\u05d0\u05e0\u05dc\u05d9\u05d8\u05d9\u05e7\u05e1</h1>
          <p class="text-muted mb-0">\u05de\u05e8\u05db\u05d6 \u05e0\u05ea\u05d5\u05e0\u05d9\u05dd \u05de\u05ea\u05e7\u05d3\u05dd \u2014 \u05ea\u05de\u05d5\u05e0\u05ea \u05de\u05e6\u05d1 \u05d4\u05de\u05d5\u05e1\u05d3</p>
        </div>
        <div class="d-flex gap-2 flex-wrap align-items-center">
          <div class="input-group input-group-sm" style="max-width:320px">
            <span class="input-group-text"><i class="bi bi-calendar-range"></i></span>
            <input type="date" id="an-date-from" class="form-control" title="\u05de\u05ea\u05d0\u05e8\u05d9\u05da">
            <span class="input-group-text">\u05e2\u05d3</span>
            <input type="date" id="an-date-to" class="form-control" title="\u05e2\u05d3 \u05ea\u05d0\u05e8\u05d9\u05da">
            <button class="btn btn-outline-primary" onclick="Pages._anApplyDateFilter()" title="\u05e1\u05e0\u05df"><i class="bi bi-funnel"></i></button>
          </div>
          <button class="btn btn-outline-success btn-sm" onclick="Pages._anExport()">
            <i class="bi bi-printer me-1"></i>\u05d4\u05d3\u05e4\u05e1\u05d4 / PDF
          </button>
        </div>
      </div>

      <!-- KPI Cards (populated by analyticsInit) -->
      <div class="row g-3 mb-4" id="an-kpi-row">
        <div class="text-center py-3 text-muted">\u05D8\u05D5\u05E2\u05DF...</div>
      </div>

      <!-- Charts Section -->
      <div class="row g-3 mb-4">
        <!-- Monthly Attendance Trend -->
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-transparent border-0 pb-0">
              <h6 class="fw-bold mb-0"><i class="bi bi-graph-up me-1 text-success"></i>\u05de\u05d2\u05de\u05ea \u05e0\u05d5\u05db\u05d7\u05d5\u05ea \u05d7\u05d5\u05d3\u05e9\u05d9\u05ea</h6>
            </div>
            <div class="card-body" style="height:280px">
              <canvas id="an-chart-attendance"></canvas>
            </div>
          </div>
        </div>

        <!-- Grade Distribution -->
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-transparent border-0 pb-0">
              <h6 class="fw-bold mb-0"><i class="bi bi-bar-chart-fill me-1 text-indigo"></i>\u05d4\u05ea\u05e4\u05dc\u05d2\u05d5\u05ea \u05e6\u05d9\u05d5\u05e0\u05d9\u05dd \u05dc\u05e4\u05d9 \u05de\u05e7\u05e6\u05d5\u05e2</h6>
            </div>
            <div class="card-body" style="height:280px">
              <canvas id="an-chart-grades"></canvas>
            </div>
          </div>
        </div>

        <!-- Revenue vs Expenses -->
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-transparent border-0 pb-0">
              <h6 class="fw-bold mb-0"><i class="bi bi-currency-exchange me-1 text-warning"></i>\u05d4\u05db\u05e0\u05e1\u05d5\u05ea \u05de\u05d5\u05dc \u05d4\u05d5\u05e6\u05d0\u05d5\u05ea</h6>
            </div>
            <div class="card-body" style="height:280px">
              <canvas id="an-chart-revenue"></canvas>
            </div>
          </div>
        </div>

        <!-- Student Growth -->
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-transparent border-0 pb-0">
              <h6 class="fw-bold mb-0"><i class="bi bi-trending-up me-1 text-primary"></i>\u05d2\u05d9\u05d3\u05d5\u05dc \u05ea\u05dc\u05de\u05d9\u05d3\u05d9\u05dd \u05dc\u05d0\u05d5\u05e8\u05da \u05e9\u05e0\u05d9\u05dd</h6>
            </div>
            <div class="card-body" style="height:280px">
              <canvas id="an-chart-growth"></canvas>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Row: At-Risk + Comparative -->
      <div class="row g-3 mb-4">
        <!-- At-Risk Students -->
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm h-100 border-start border-danger border-3">
            <div class="card-header bg-transparent border-0 pb-0 d-flex justify-content-between align-items-center">
              <h6 class="fw-bold mb-0 text-danger"><i class="bi bi-exclamation-triangle-fill me-1"></i>\u05ea\u05dc\u05de\u05d9\u05d3\u05d9\u05dd \u05d1\u05e1\u05d9\u05db\u05d5\u05df</h6>
              <span class="badge bg-danger">${atRisk.length} \u05ea\u05dc\u05de\u05d9\u05d3\u05d9\u05dd</span>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-hover mb-0 small">
                  <thead class="table-light">
                    <tr>
                      <th>\u05e9\u05dd</th>
                      <th>\u05db\u05d9\u05ea\u05d4</th>
                      <th>\u05e0\u05d5\u05db\u05d7\u05d5\u05ea</th>
                      <th>\u05e6\u05d9\u05d5\u05df</th>
                      <th>\u05e4\u05d9\u05e8\u05d5\u05d8</th>
                    </tr>
                  </thead>
                  <tbody id="an-atrisk-body"></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Comparative Analysis -->
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-transparent border-0 pb-0">
              <h6 class="fw-bold mb-0"><i class="bi bi-arrow-left-right me-1 text-info"></i>\u05d4\u05e9\u05d5\u05d5\u05d0\u05d4 \u05d1\u05d9\u05df \u05db\u05d9\u05ea\u05d5\u05ea</h6>
            </div>
            <div class="card-body">
              <div class="row g-2 mb-3">
                <div class="col-5">
                  <select id="an-compare-a" class="form-select form-select-sm" onchange="Pages._anUpdateCompare()">
                    <option value="">\u05d1\u05d7\u05e8 \u05db\u05d9\u05ea\u05d4...</option>
                    ${classOptions}
                  </select>
                </div>
                <div class="col-2 text-center align-self-center">
                  <i class="bi bi-arrow-left-right text-muted"></i>
                </div>
                <div class="col-5">
                  <select id="an-compare-b" class="form-select form-select-sm" onchange="Pages._anUpdateCompare()">
                    <option value="">\u05d1\u05d7\u05e8 \u05db\u05d9\u05ea\u05d4...</option>
                    ${classOptions}
                  </select>
                </div>
              </div>
              <div id="an-compare-result">
                <div class="text-center text-muted py-4">
                  <i class="bi bi-hand-index fs-3 d-block mb-2"></i>
                  \u05d1\u05d7\u05e8 \u05e9\u05ea\u05d9 \u05db\u05d9\u05ea\u05d5\u05ea \u05dc\u05d4\u05e9\u05d5\u05d5\u05d0\u05d4
                </div>
              </div>
              <canvas id="an-chart-compare" style="display:none;height:200px"></canvas>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /* ---------- Init — build all charts ---------- */
  async analyticsInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    // Try loading real data from API
    let apiStudents, apiAttendance, apiGrades, apiFinance;
    try {
      [apiStudents, apiAttendance, apiGrades, apiFinance] = await Promise.all([
        _gc('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD'),
        _gc('\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA'),
        _gc('\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD'),
        _gc('\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3')
      ]);
    } catch(e) {
      apiStudents = []; apiAttendance = []; apiGrades = []; apiFinance = [];
    }

    const hasData = apiStudents.length || apiAttendance.length || apiGrades.length;

    // If no data and not demo, show empty state
    if (!hasData && !this._anUseDemo) {
      const kpiRow = document.getElementById('an-kpi-row');
      if (kpiRow) kpiRow.innerHTML = '<div class="col-12"><div class="empty-state text-center py-5"><i class="bi bi-graph-up-arrow fs-1 text-muted d-block mb-2"></i><h5>\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05DE\u05E1\u05E4\u05D9\u05E7\u05D9\u05DD \u05DC\u05E0\u05D9\u05EA\u05D5\u05D7</h5><p class="text-muted">\u05D4\u05D5\u05E1\u05E3 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05DC\u05DE\u05D5\u05D3\u05D5\u05DC\u05D9\u05DD \u05D4\u05E9\u05D5\u05E0\u05D9\u05DD \u05DB\u05D3\u05D9 \u05DC\u05E8\u05D0\u05D5\u05EA \u05E0\u05D9\u05EA\u05D5\u05D7\u05D9\u05DD</p><a href="#" class="btn btn-sm btn-outline-secondary mt-2" onclick="Pages.anLoadDemo();return false"><i class="bi bi-database me-1"></i>\u05D8\u05E2\u05DF \u05D3\u05DE\u05D5</a></div></div>';
      return;
    }

    let kpi;
    if (hasData) {
      const totalStudents = apiStudents.length || 0;
      const attRecords = apiAttendance || [];
      const gradeRecords = apiGrades || [];
      const finRecords = apiFinance || [];
      const attRate = attRecords.length > 0
        ? Math.round(attRecords.filter(r => r['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E0\u05D5\u05DB\u05D7' || r['status'] === '\u05E0\u05D5\u05DB\u05D7').length / attRecords.length * 100)
        : 0;
      const gradeAvg = gradeRecords.length > 0
        ? Math.round(gradeRecords.reduce((s, r) => s + (parseFloat(r['\u05E6\u05D9\u05D5\u05DF'] || r['grade']) || 0), 0) / gradeRecords.length * 10) / 10
        : 0;
      const collectionRate = finRecords.length > 0
        ? Math.round(finRecords.filter(r => r['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E9\u05D5\u05DC\u05DD' || r['status'] === '\u05E9\u05D5\u05DC\u05DD').length / finRecords.length * 100)
        : 0;
      kpi = this._anDemoKPI();
      kpi.attendanceRate = attRate;
      kpi.gradeAvg = gradeAvg;
      kpi.collectionRate = collectionRate;
      kpi.activeStudents = totalStudents;
    } else {
      kpi = this._anDemoKPI();
    }

    // Populate KPI cards
    const kpiRow = document.getElementById('an-kpi-row');
    if (kpiRow) {
      kpiRow.innerHTML = [
        this._kpiCard('bi-calendar-check-fill', '#10b981', '\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA', kpi.attendanceRate, '%', kpi.attendanceTrend, '#10b981'),
        this._kpiCard('bi-mortarboard-fill', '#6366f1', '\u05DE\u05DE\u05D5\u05E6\u05E2 \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD', kpi.gradeAvg, '', kpi.gradeTrend, '#6366f1'),
        this._kpiCard('bi-cash-coin', '#f59e0b', '\u05E9\u05D9\u05E2\u05D5\u05E8 \u05D2\u05D1\u05D9\u05D9\u05D4', kpi.collectionRate, '%', kpi.collectionTrend, '#f59e0b'),
        this._kpiCard('bi-people-fill', '#3b82f6', '\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05E4\u05E2\u05D9\u05DC\u05D9\u05DD', kpi.activeStudents, '', kpi.studentsTrend, '#3b82f6'),
        this._kpiCard('bi-check2-circle', '#8b5cf6', '\u05D4\u05E9\u05DC\u05DE\u05EA \u05DE\u05E9\u05D9\u05DE\u05D5\u05EA', kpi.taskCompletion, '%', kpi.tasksTrend, '#8b5cf6'),
        this._kpiCard('bi-chat-heart-fill', '#ec4899', '\u05DE\u05E2\u05D5\u05E8\u05D1\u05D5\u05EA \u05D4\u05D5\u05E8\u05D9\u05DD', kpi.parentEngagement, '%', kpi.parentTrend, '#ec4899')
      ].join('');
    }

    // Populate at-risk table
    const atRisk = this._anDemoAtRisk();
    const atRiskBody = document.getElementById('an-atrisk-body');
    if (atRiskBody) {
      atRiskBody.innerHTML = atRisk.map(s => `
        <tr class="table-danger">
          <td class="fw-semibold">${s.name}</td>
          <td>${s.cls}</td>
          <td><span class="badge ${s.att < 65 ? 'bg-danger' : 'bg-warning text-dark'}">${s.att}%</span></td>
          <td><span class="badge ${s.grade < 55 ? 'bg-danger' : 'bg-warning text-dark'}">${s.grade}</span></td>
          <td class="text-muted small">${s.reason}</td>
        </tr>
      `).join('');
    }

    const months = this._analyticsMonthNames;
    const subjects = this._analyticsSubjects;
    const classes = this._analyticsClasses;

    // Set default date range (last 12 months)
    const now = new Date();
    const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    const fromEl = document.getElementById('an-date-from');
    const toEl = document.getElementById('an-date-to');
    if (fromEl) fromEl.value = yearAgo.toISOString().slice(0, 10);
    if (toEl) toEl.value = now.toISOString().slice(0, 10);

    // Destroy previous charts
    ['anChartAtt', 'anChartGrades', 'anChartRevenue', 'anChartGrowth', 'anChartCompare'].forEach(k => {
      if (App.charts[k]) { App.charts[k].destroy(); App.charts[k] = null; }
    });

    const rtlTooltip = {
      rtl: true,
      textDirection: 'rtl',
      titleFont: { family: 'Heebo' },
      bodyFont: { family: 'Heebo' }
    };

    // === 1. Monthly Attendance Trend (Line) ===
    const attCtx = document.getElementById('an-chart-attendance');
    if (attCtx) {
      App.charts.anChartAtt = new Chart(attCtx, {
        type: 'line',
        data: {
          labels: months,
          datasets: [{
            label: '\u05e0\u05d5\u05db\u05d7\u05d5\u05ea %',
            data: kpi.attendanceTrend,
            borderColor: '#10b981',
            backgroundColor: 'rgba(16,185,129,0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 7,
            pointBackgroundColor: '#10b981',
            borderWidth: 2.5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { ...rtlTooltip, callbacks: { label: ctx => `\u05e0\u05d5\u05db\u05d7\u05d5\u05ea: ${ctx.parsed.y}%` } }
          },
          scales: {
            y: { min: 50, max: 100, ticks: { callback: v => v + '%', font: { family: 'Heebo' } }, grid: { color: 'rgba(0,0,0,0.05)' } },
            x: { ticks: { font: { family: 'Heebo', size: 11 } }, grid: { display: false } }
          }
        }
      });
    }

    // === 2. Grade Distribution by Subject (Grouped Bar) ===
    const gradeCtx = document.getElementById('an-chart-grades');
    if (gradeCtx) {
      const gradeColors = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b'];
      const gradeData = classes.map((cls, ci) =>
        ({
          label: cls,
          data: subjects.map(() => this._anRand(55, 95)),
          backgroundColor: gradeColors[ci],
          borderRadius: 4,
          barPercentage: 0.7,
          categoryPercentage: 0.8
        })
      );
      App.charts.anChartGrades = new Chart(gradeCtx, {
        type: 'bar',
        data: { labels: subjects, datasets: gradeData },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top', rtl: true, labels: { font: { family: 'Heebo', size: 11 }, usePointStyle: true, pointStyle: 'rectRounded' } },
            tooltip: rtlTooltip
          },
          scales: {
            y: { min: 0, max: 100, ticks: { font: { family: 'Heebo' } }, grid: { color: 'rgba(0,0,0,0.05)' } },
            x: { ticks: { font: { family: 'Heebo', size: 11 } }, grid: { display: false } }
          }
        }
      });
    }

    // === 3. Revenue vs Expenses (Stacked Bar, 6 months) ===
    const revCtx = document.getElementById('an-chart-revenue');
    if (revCtx) {
      const last6 = months.slice(-6);
      const revenue =  [42000, 38000, 45000, 41000, 47000, 44000];
      const expenses = [28000, 31000, 29000, 33000, 30000, 32000];
      App.charts.anChartRevenue = new Chart(revCtx, {
        type: 'bar',
        data: {
          labels: last6,
          datasets: [
            {
              label: '\u05d4\u05db\u05e0\u05e1\u05d5\u05ea',
              data: revenue,
              backgroundColor: '#10b981',
              borderRadius: { topLeft: 4, topRight: 4 },
              barPercentage: 0.6
            },
            {
              label: '\u05d4\u05d5\u05e6\u05d0\u05d5\u05ea',
              data: expenses,
              backgroundColor: '#ef4444',
              borderRadius: { topLeft: 4, topRight: 4 },
              barPercentage: 0.6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top', rtl: true, labels: { font: { family: 'Heebo', size: 11 }, usePointStyle: true, pointStyle: 'rectRounded' } },
            tooltip: { ...rtlTooltip, callbacks: { label: ctx => `${ctx.dataset.label}: \u20aa${ctx.parsed.y.toLocaleString()}` } }
          },
          scales: {
            x: { stacked: true, ticks: { font: { family: 'Heebo', size: 11 } }, grid: { display: false } },
            y: { stacked: true, ticks: { callback: v => '\u20aa' + (v / 1000) + 'K', font: { family: 'Heebo' } }, grid: { color: 'rgba(0,0,0,0.05)' } }
          }
        }
      });
    }

    // === 4. Student Growth over Years (Line) ===
    const growthCtx = document.getElementById('an-chart-growth');
    if (growthCtx) {
      const years = ['\u05ea\u05e9\u05e4\u05f4\u05d0', '\u05ea\u05e9\u05e4\u05f4\u05d1', '\u05ea\u05e9\u05e4\u05f4\u05d2', '\u05ea\u05e9\u05e4\u05f4\u05d3', '\u05ea\u05e9\u05e4\u05f4\u05d4', '\u05ea\u05e9\u05e4\u05f4\u05d5', '\u05ea\u05e9\u05e4\u05f4\u05d6'];
      const counts = [8, 12, 15, 18, 20, 22, 24];
      App.charts.anChartGrowth = new Chart(growthCtx, {
        type: 'line',
        data: {
          labels: years,
          datasets: [{
            label: '\u05de\u05e1\u05e4\u05e8 \u05ea\u05dc\u05de\u05d9\u05d3\u05d9\u05dd',
            data: counts,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59,130,246,0.1)',
            fill: true,
            tension: 0.3,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointBackgroundColor: '#3b82f6',
            borderWidth: 2.5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { ...rtlTooltip, callbacks: { label: ctx => `${ctx.parsed.y} \u05ea\u05dc\u05de\u05d9\u05d3\u05d9\u05dd` } }
          },
          scales: {
            y: { min: 0, ticks: { stepSize: 5, font: { family: 'Heebo' } }, grid: { color: 'rgba(0,0,0,0.05)' } },
            x: { ticks: { font: { family: 'Heebo', size: 11 } }, grid: { display: false } }
          }
        }
      });
    }
  },

  /* ---------- Comparative Analysis ---------- */
  _anClassDemoData(className) {
    const seed = className.charCodeAt(className.length - 1);
    return {
      students: 5 + (seed % 4),
      attendance: 75 + (seed % 20),
      gradeAvg: 65 + (seed % 25),
      tasksDone: 60 + (seed % 30),
      topSubject: this._analyticsSubjects[seed % this._analyticsSubjects.length],
      monthlyAtt: this._analyticsMonthNames.map((_, i) => 70 + ((seed + i * 3) % 25)),
      monthlyGrades: this._analyticsMonthNames.map((_, i) => 60 + ((seed + i * 5) % 30))
    };
  },

  _anUpdateCompare() {
    const a = document.getElementById('an-compare-a')?.value;
    const b = document.getElementById('an-compare-b')?.value;
    const result = document.getElementById('an-compare-result');
    const canvas = document.getElementById('an-chart-compare');
    if (!a || !b || !result) return;

    const dA = this._anClassDemoData(a);
    const dB = this._anClassDemoData(b);

    const bar = (label, vA, vB, suffix = '') => {
      const max = Math.max(vA, vB, 1);
      return `
        <div class="mb-3">
          <div class="d-flex justify-content-between small fw-semibold mb-1">
            <span>${label}</span>
          </div>
          <div class="d-flex align-items-center gap-2 mb-1">
            <span class="badge bg-primary-subtle text-primary" style="min-width:60px">${a}</span>
            <div class="progress flex-grow-1" style="height:20px">
              <div class="progress-bar bg-primary" style="width:${(vA / max) * 100}%">${vA}${suffix}</div>
            </div>
          </div>
          <div class="d-flex align-items-center gap-2">
            <span class="badge bg-info-subtle text-info" style="min-width:60px">${b}</span>
            <div class="progress flex-grow-1" style="height:20px">
              <div class="progress-bar bg-info" style="width:${(vB / max) * 100}%">${vB}${suffix}</div>
            </div>
          </div>
        </div>`;
    };

    result.innerHTML = `
      ${bar('\u05ea\u05dc\u05de\u05d9\u05d3\u05d9\u05dd', dA.students, dB.students)}
      ${bar('\u05e0\u05d5\u05db\u05d7\u05d5\u05ea', dA.attendance, dB.attendance, '%')}
      ${bar('\u05de\u05de\u05d5\u05e6\u05e2 \u05e6\u05d9\u05d5\u05e0\u05d9\u05dd', dA.gradeAvg, dB.gradeAvg)}
      ${bar('\u05d4\u05e9\u05dc\u05de\u05ea \u05de\u05e9\u05d9\u05de\u05d5\u05ea', dA.tasksDone, dB.tasksDone, '%')}
    `;

    // Update comparison chart
    if (canvas) {
      canvas.style.display = 'block';
      if (App.charts.anChartCompare) App.charts.anChartCompare.destroy();
      App.charts.anChartCompare = new Chart(canvas, {
        type: 'radar',
        data: {
          labels: ['\u05e0\u05d5\u05db\u05d7\u05d5\u05ea', '\u05e6\u05d9\u05d5\u05e0\u05d9\u05dd', '\u05de\u05e9\u05d9\u05de\u05d5\u05ea', '\u05de\u05e2\u05d5\u05e8\u05d1\u05d5\u05ea', '\u05d4\u05ea\u05e0\u05d4\u05d2\u05d5\u05ea'],
          datasets: [
            {
              label: a,
              data: [dA.attendance, dA.gradeAvg, dA.tasksDone, 70 + (a.charCodeAt(a.length - 1) % 20), 65 + (a.charCodeAt(a.length - 1) % 25)],
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59,130,246,0.15)',
              pointBackgroundColor: '#3b82f6',
              borderWidth: 2
            },
            {
              label: b,
              data: [dB.attendance, dB.gradeAvg, dB.tasksDone, 70 + (b.charCodeAt(b.length - 1) % 20), 65 + (b.charCodeAt(b.length - 1) % 25)],
              borderColor: '#06b6d4',
              backgroundColor: 'rgba(6,182,212,0.15)',
              pointBackgroundColor: '#06b6d4',
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top', rtl: true, labels: { font: { family: 'Heebo', size: 11 }, usePointStyle: true } }
          },
          scales: {
            r: {
              min: 0, max: 100,
              pointLabels: { font: { family: 'Heebo', size: 11 } },
              ticks: { display: false },
              grid: { color: 'rgba(0,0,0,0.08)' }
            }
          }
        }
      });
    }
  },

  /* ---------- Date Filter ---------- */
  _anApplyDateFilter() {
    const from = document.getElementById('an-date-from')?.value;
    const to = document.getElementById('an-date-to')?.value;
    if (!from || !to) {
      if (typeof App !== 'undefined' && App.toast) App.toast('\u05d9\u05e9 \u05dc\u05d1\u05d7\u05d5\u05e8 \u05d8\u05d5\u05d5\u05d7 \u05ea\u05d0\u05e8\u05d9\u05db\u05d9\u05dd', 'warning');
      return;
    }
    // In production this would re-query data; with demo data we refresh charts
    if (typeof App !== 'undefined' && App.toast) App.toast(`\u05de\u05e1\u05d5\u05e0\u05df \u05dc\u05ea\u05d0\u05e8\u05d9\u05db\u05d9\u05dd ${from} \u05e2\u05d3 ${to}`, 'success');
    this.analyticsInit();
  },

  /* ---------- Export / Print ---------- */
  _anExport() {
    const content = document.getElementById('page-content') || document.getElementById('main-content') || document.body;
    const printWin = window.open('', '_blank');
    printWin.document.write(`<!DOCTYPE html>
      <html dir="rtl" lang="he">
      <head>
        <meta charset="utf-8">
        <title>\u05d0\u05e0\u05dc\u05d9\u05d8\u05d9\u05e7\u05e1 \u2014 \u05d1\u05d9\u05ea \u05d4\u05ea\u05dc\u05de\u05d5\u05d3</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
          body { font-family: 'Heebo', sans-serif; direction: rtl; padding: 20px; }
          @media print { .no-print { display: none !important; } }
          canvas { max-width: 100%; }
        </style>
      </head>
      <body>
        <h2 class="mb-3"><i class="bi bi-graph-up-arrow me-2"></i>\u05d3\u05d5\u05d7 \u05d0\u05e0\u05dc\u05d9\u05d8\u05d9\u05e7\u05e1 \u2014 ${new Date().toLocaleDateString('he-IL')}</h2>
        ${content.innerHTML}
        <script>setTimeout(()=>window.print(),500)<\/script>
      </body></html>`);
    printWin.document.close();
  }

});
