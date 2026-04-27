/* ===== BHT v6.0 — Dashboard (Professional Rewrite) ===== */
Object.assign(Pages, {

  /* ---- Time-based Hebrew greeting ---- */
  _greeting() {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return '\u05D1\u05D5\u05E7\u05E8 \u05D8\u05D5\u05D1';
    if (h >= 12 && h < 17) return '\u05E6\u05D4\u05E8\u05D9\u05D9\u05DD \u05D8\u05D5\u05D1\u05D9\u05DD';
    if (h >= 17 && h < 21) return '\u05E2\u05E8\u05D1 \u05D8\u05D5\u05D1';
    return '\u05DC\u05D9\u05DC\u05D4 \u05D8\u05D5\u05D1';
  },

  /* ---- Dashboard HTML ---- */
  dashboard() {
    const greeting = this._greeting();
    const hebrewDate = Utils.hebrewDateFull ? Utils.hebrewDateFull() : '';
    const todayFormatted = Utils.formatDate(new Date());

    return `
      <!-- Welcome Header -->
      <div class="page-header mb-4">
        <div class="d-flex justify-content-between align-items-start flex-wrap gap-3">
          <div>
            <h1 class="mb-1">
              <i class="bi bi-sun me-2 text-warning"></i>${greeting}
            </h1>
            <p class="text-muted mb-0">
              <i class="bi bi-calendar3 me-1"></i>${Utils.dayName()} | ${todayFormatted}${hebrewDate ? ' | <span class="text-primary fw-semibold">' + hebrewDate + '</span>' : ''}
            </p>
          </div>
          <div id="dash-notifications"></div>
        </div>
        <div class="mt-1"><span class="badge bg-light text-muted border" id="dash-data-date"><i class="bi bi-database me-1"></i>\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD: \u05D8\u05D5\u05E2\u05DF...</span></div>
      </div>

      <!-- Quick Actions -->
      <div class="card mb-4 border-0 shadow-sm">
        <div class="card-body py-3">
          <div class="d-flex align-items-center gap-2 mb-3">
            <i class="bi bi-lightning-charge-fill text-warning"></i>
            <h6 class="fw-bold mb-0">\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA \u05DE\u05D4\u05D9\u05E8\u05D5\u05EA</h6>
          </div>
          <div class="row g-3">
            <div class="col-6 col-md-3">
              <a href="#attendance" class="btn btn-success w-100 py-3 d-flex flex-column align-items-center gap-2 shadow-sm" style="font-size:1rem">
                <i class="bi bi-calendar-check-fill fs-3"></i>
                <span class="fw-bold">\u05E8\u05E9\u05D5\u05DD \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</span>
              </a>
            </div>
            <div class="col-6 col-md-3">
              <button class="btn btn-info text-white w-100 py-3 d-flex flex-column align-items-center gap-2 shadow-sm" style="font-size:1rem" onclick="Pages._openCallLogModal('','','')">
                <i class="bi bi-telephone-plus-fill fs-3"></i>
                <span class="fw-bold">\u05E8\u05E9\u05D5\u05DD \u05E9\u05D9\u05D7\u05D4</span>
              </button>
            </div>
            <div class="col-6 col-md-3">
              <a href="#printcenter" class="btn btn-warning w-100 py-3 d-flex flex-column align-items-center gap-2 shadow-sm" style="font-size:1rem">
                <i class="bi bi-printer-fill fs-3"></i>
                <span class="fw-bold">\u05D4\u05D3\u05E4\u05E1 \u05E8\u05E9\u05D9\u05DE\u05D4</span>
              </a>
            </div>
            <div class="col-6 col-md-3">
              <a href="#students" class="btn btn-primary w-100 py-3 d-flex flex-column align-items-center gap-2 shadow-sm" style="font-size:1rem">
                <i class="bi bi-people-fill fs-3"></i>
                <span class="fw-bold">\u05E6\u05E4\u05D4 \u05D1\u05EA\u05DC\u05DE\u05D9\u05D3</span>
              </a>
            </div>
          </div>
          <div class="row g-3 mt-1">
            <div class="col-4 col-md-2"><a href="#email" class="btn btn-outline-info w-100 py-2 d-flex flex-column align-items-center gap-1 small"><i class="bi bi-envelope-fill fs-5"></i>\u05D3\u05D5\u05D0\u05E8</a></div>
            <div class="col-4 col-md-2"><a href="#drive" class="btn btn-outline-success w-100 py-2 d-flex flex-column align-items-center gap-1 small"><i class="bi bi-folder2-open fs-5"></i>\u05E7\u05D1\u05E6\u05D9\u05DD</a></div>
            <div class="col-4 col-md-2"><a href="#behavior" class="btn btn-outline-danger w-100 py-2 d-flex flex-column align-items-center gap-1 small"><i class="bi bi-star-half fs-5"></i>\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</a></div>
            <div class="col-4 col-md-2"><a href="#medical" class="btn btn-outline-warning w-100 py-2 d-flex flex-column align-items-center gap-1 small"><i class="bi bi-heart-pulse fs-5"></i>\u05E8\u05E4\u05D5\u05D0\u05D9</a></div>
            <div class="col-4 col-md-2"><a href="#staff" class="btn btn-outline-secondary w-100 py-2 d-flex flex-column align-items-center gap-1 small"><i class="bi bi-person-badge fs-5"></i>\u05E6\u05D5\u05D5\u05EA</a></div>
            <div class="col-4 col-md-2"><a href="#reports" class="btn btn-outline-dark w-100 py-2 d-flex flex-column align-items-center gap-1 small"><i class="bi bi-file-earmark-bar-graph fs-5"></i>\u05D3\u05D5\u05D7\u05D5\u05EA</a></div>
          </div>
        </div>
      </div>

      <!-- Stats Cards Row -->
      <div class="row g-3 mb-4" id="dash-stats">
        <div class="col-6 col-lg-3">
          <a href="#students" class="card border-0 shadow-sm h-100 text-decoration-none card-clickable">
            <div class="card-body d-flex align-items-center gap-3">
              <div class="rounded-3 d-flex align-items-center justify-content-center" style="width:48px;height:48px;background:linear-gradient(135deg,#3b82f6,#1d4ed8)">
                <i class="bi bi-people-fill text-white fs-5"></i>
              </div>
              <div>
                <div class="fs-3 fw-bold lh-1" id="stat-students">--</div>
                <small class="text-muted">\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05E4\u05E2\u05D9\u05DC\u05D9\u05DD</small>
              </div>
            </div>
          </a>
        </div>
        <div class="col-6 col-lg-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body d-flex align-items-center gap-3">
              <div class="rounded-3 d-flex align-items-center justify-content-center" style="width:48px;height:48px;background:linear-gradient(135deg,#10b981,#059669)">
                <i class="bi bi-calendar-check-fill text-white fs-5"></i>
              </div>
              <div>
                <div class="fs-3 fw-bold lh-1" id="stat-attendance">--</div>
                <small class="text-muted">\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D4\u05D9\u05D5\u05DD</small>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 col-lg-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body d-flex align-items-center gap-3">
              <div class="rounded-3 d-flex align-items-center justify-content-center" style="width:48px;height:48px;background:linear-gradient(135deg,#f59e0b,#d97706)">
                <i class="bi bi-cash-stack text-white fs-5"></i>
              </div>
              <div>
                <div class="fs-3 fw-bold lh-1" id="stat-pending">--</div>
                <small class="text-muted">\u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD \u05DE\u05DE\u05EA\u05D9\u05E0\u05D9\u05DD</small>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 col-lg-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body d-flex align-items-center gap-3">
              <div class="rounded-3 d-flex align-items-center justify-content-center" style="width:48px;height:48px;background:linear-gradient(135deg,#8b5cf6,#6d28d9)">
                <i class="bi bi-list-task text-white fs-5"></i>
              </div>
              <div>
                <div class="fs-3 fw-bold lh-1" id="stat-tasks">--</div>
                <small class="text-muted">\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Absent Students Alert -->
      <div id="dash-absent-alert" class="mb-4" style="display:none"></div>

      <!-- Medication Alert -->
      <div id="dash-med-alert" class="mb-4" style="display:none"></div>

      <!-- Recent Calls (Prominent) + Attendance Doughnut Row -->
      <div class="row g-3 mb-4">
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm h-100 border-start border-success border-3">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="fw-bold mb-0">
                  <i class="bi bi-telephone-inbound-fill me-2 text-success"></i>\u05E9\u05D9\u05D7\u05D5\u05EA \u05D0\u05D7\u05E8\u05D5\u05E0\u05D5\u05EA
                </h6>
                <div class="d-flex gap-2">
                  <a href="#communications" class="btn btn-outline-secondary btn-sm">\u05DB\u05DC \u05D4\u05E9\u05D9\u05D7\u05D5\u05EA</a>
                  <button class="btn btn-success btn-sm" onclick="Pages._openCallLogModal('','','')"><i class="bi bi-plus-lg me-1"></i>\u05E9\u05D9\u05D7\u05D4 \u05D7\u05D3\u05E9\u05D4</button>
                </div>
              </div>
              <div id="recent-calls"><div class="text-muted text-center py-4">\u05D8\u05D5\u05E2\u05DF...</div></div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <h6 class="fw-bold mb-3">
                <i class="bi bi-pie-chart-fill me-2 text-success"></i>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D4\u05D9\u05D5\u05DD
              </h6>
              <div class="position-relative" style="height:200px">
                <canvas id="chart-att-doughnut"></canvas>
                <div id="att-center-label" style="position:absolute;top:45%;left:50%;transform:translate(-50%,-50%);text-align:center;pointer-events:none">
                  <div class="fs-3 fw-bold" id="att-center-pct">--</div>
                  <div class="text-muted small">\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</div>
                </div>
              </div>
              <div class="d-flex justify-content-around mt-3 small" id="att-legend">
                <span><i class="bi bi-circle-fill text-success me-1"></i>\u05E0\u05D5\u05DB\u05D7\u05D9\u05DD: <b id="att-present">0</b></span>
                <span><i class="bi bi-circle-fill text-danger me-1"></i>\u05D7\u05E1\u05E8\u05D9\u05DD: <b id="att-absent">0</b></span>
                <span><i class="bi bi-circle-fill text-warning me-1"></i>\u05D0\u05D9\u05D7\u05D5\u05E8: <b id="att-late">0</b></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Payments + Upcoming Events + New Documents -->
      <div class="row g-3 mb-4">
        <div class="col-lg-4">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <h6 class="fw-bold mb-3">
                <i class="bi bi-credit-card-2-front-fill me-2 text-warning"></i>\u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD \u05D0\u05D7\u05E8\u05D5\u05E0\u05D9\u05DD
              </h6>
              <div id="recent-payments"><div class="text-muted text-center py-4">\u05D8\u05D5\u05E2\u05DF...</div></div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <h6 class="fw-bold mb-3">
                <i class="bi bi-calendar-event-fill me-2 text-danger"></i>\u05D0\u05D9\u05E8\u05D5\u05E2\u05D9\u05DD \u05E7\u05E8\u05D5\u05D1\u05D9\u05DD
              </h6>
              <div id="upcoming-events"><div class="text-muted text-center py-4">\u05D8\u05D5\u05E2\u05DF...</div></div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <h6 class="fw-bold mb-3">
                <i class="bi bi-file-earmark-plus-fill me-2 text-primary"></i>\u05DE\u05E1\u05DE\u05DB\u05D9\u05DD \u05D7\u05D3\u05E9\u05D9\u05DD
              </h6>
              <div id="recent-documents"><div class="text-muted text-center py-4">\u05D8\u05D5\u05E2\u05DF...</div></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Emails + Activity Feed -->
      <div class="row g-3 mb-4">
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm h-100 border-start border-info border-3">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="fw-bold mb-0">
                  <i class="bi bi-envelope-fill me-2 text-info"></i>\u05D3\u05D5\u05D0\u05E8 \u05D0\u05D7\u05E8\u05D5\u05DF
                </h6>
                <a href="#email" class="btn btn-outline-info btn-sm">\u05E6\u05E4\u05D4 \u05D4\u05DB\u05DC</a>
              </div>
              <div id="recent-emails"><div class="text-muted text-center py-4">\u05D8\u05D5\u05E2\u05DF...</div></div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <h6 class="fw-bold mb-3">
                <i class="bi bi-clock-history me-2 text-info"></i>\u05E4\u05E2\u05D9\u05DC\u05D5\u05D9\u05D5\u05EA \u05D0\u05D7\u05E8\u05D5\u05E0\u05D5\u05EA
              </h6>
              <div id="activity-feed"><div class="text-muted text-center py-4">\u05D8\u05D5\u05E2\u05DF...</div></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Notes -->
      <div class="card border-0 shadow-sm mb-4 border-start border-warning border-3">
        <div class="card-body py-3">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h6 class="fw-bold mb-0"><i class="bi bi-sticky-fill me-2 text-warning"></i>\u05E4\u05EA\u05E7\u05D9\u05EA \u05DE\u05D4\u05D9\u05E8\u05D4</h6>
            <button class="btn btn-outline-warning btn-sm" onclick="Pages._dashSaveNote()" title="\u05E9\u05DE\u05D5\u05E8"><i class="bi bi-check-lg"></i></button>
          </div>
          <textarea class="form-control form-control-sm" id="dash-quick-note" rows="2" placeholder="\u05E8\u05E9\u05D5\u05DD \u05DE\u05E9\u05D4\u05D5 \u05DE\u05D4\u05D9\u05E8... (\u05E0\u05E9\u05DE\u05E8 \u05D0\u05D5\u05D8\u05D5\u05DE\u05D8\u05D9\u05EA)" style="resize:none"></textarea>
        </div>
      </div>

      <!-- System Health -->
      <div class="card border-0 shadow-sm">
        <div class="card-body">
          <h6 class="fw-bold mb-3">
            <i class="bi bi-heart-pulse-fill me-2 text-danger"></i>\u05D1\u05E8\u05D9\u05D0\u05D5\u05EA \u05DE\u05E2\u05E8\u05DB\u05EA
          </h6>
          <div class="row g-3" id="system-health">
            <div class="col-md-4">
              <div class="d-flex align-items-center gap-3 p-3 bg-light rounded-3">
                <i class="bi bi-puzzle-fill text-primary fs-4"></i>
                <div class="flex-grow-1">
                  <small class="text-muted d-block">\u05DE\u05D5\u05D3\u05D5\u05DC\u05D9\u05DD \u05D8\u05E2\u05D5\u05E0\u05D9\u05DD</small>
                  <span class="fw-bold" id="health-modules">--</span>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="p-3 bg-light rounded-3">
                <div class="d-flex align-items-center gap-3 mb-2">
                  <i class="bi bi-hdd-fill text-warning fs-4"></i>
                  <div class="flex-grow-1">
                    <small class="text-muted d-block">\u05D0\u05D7\u05E1\u05D5\u05DF \u05DE\u05E7\u05D5\u05DE\u05D9</small>
                    <span class="fw-bold" id="health-storage">--</span>
                  </div>
                </div>
                <div class="progress" style="height:6px">
                  <div class="progress-bar bg-warning" id="health-storage-bar" style="width:0%"></div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="d-flex align-items-center gap-3 p-3 bg-light rounded-3">
                <i class="bi bi-cloud-check-fill text-success fs-4"></i>
                <div class="flex-grow-1">
                  <small class="text-muted d-block">\u05D2\u05D9\u05D1\u05D5\u05D9 \u05D0\u05D7\u05E8\u05D5\u05DF</small>
                  <span class="fw-bold" id="health-backup">--</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /* ---- Dashboard Init: populate all sections with real DATA_CACHE data ---- */
  dashboardInit() {
    // Helper: load from DATA_CACHE (sync, no API calls)
    const _gc = (sheet) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[sheet]) ? DATA_CACHE[sheet] : [];

    const students = _gc('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
    const finance = _gc('\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3');
    const attendance = _gc('\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA');
    const calendar = _gc('\u05DC\u05D5\u05D7_\u05E9\u05E0\u05D4');
    const tasks = _gc('\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA');
    const activityLog = _gc('\u05D9\u05D5\u05DE\u05DF_\u05E4\u05E2\u05D9\u05DC\u05D5\u05EA');

    // --- Compute stats ---
    const activeStudents = students.filter(s => (s['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '') !== '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC');
    const todayISO = Utils.todayISO();
    const todayAtt = attendance.filter(a => a['\u05EA\u05D0\u05E8\u05D9\u05DA'] === todayISO);
    const presentCount = todayAtt.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E0\u05D5\u05DB\u05D7').length;
    const absentCount = todayAtt.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D7\u05D9\u05E1\u05D5\u05E8').length;
    const lateCount = todayAtt.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D0\u05D9\u05D7\u05D5\u05E8').length;
    const attPct = todayAtt.length > 0 ? Math.round(presentCount / todayAtt.length * 100) : 0;

    const unpaidFinance = finance.filter(f => (f['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '') !== '\u05E9\u05D5\u05DC\u05DD');
    const activeTasks = tasks.filter(t => (t['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '') !== '\u05D4\u05D5\u05E9\u05DC\u05DD').length;

    // --- Class breakdown ---
    const classCounts = {};
    activeStudents.forEach(s => {
      const cls = s['\u05DB\u05D9\u05EA\u05D4'] || s['\u05DE\u05E1\u05D2\u05E8\u05EA'] || '\u05DC\u05D0 \u05DE\u05E9\u05D5\u05D9\u05DA';
      classCounts[cls] = (classCounts[cls] || 0) + 1;
    });

    // === 0. Data freshness badge ===
    const dataDateEl = document.getElementById('dash-data-date');
    if (dataDateEl) {
      let parts = [];
      if (typeof DATA_CACHE !== 'undefined' && DATA_CACHE._lastUpdated) {
        const d = new Date(DATA_CACHE._lastUpdated);
        parts.push('<i class="bi bi-database me-1"></i>\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD: ' + d.toLocaleDateString('he-IL'));
      }
      if (typeof EMAIL_CACHE !== 'undefined' && EMAIL_CACHE && EMAIL_CACHE._lastUpdated) {
        const e = new Date(EMAIL_CACHE._lastUpdated);
        parts.push('<i class="bi bi-envelope me-1"></i>\u05D3\u05D5\u05D0\u05E8: ' + e.toLocaleDateString('he-IL'));
      }
      if (parts.length) dataDateEl.innerHTML = parts.join(' | ');
    }

    // === 0b. Stale data warning ===
    if (typeof DATA_CACHE !== 'undefined' && DATA_CACHE._lastUpdated) {
      const age = Math.floor((Date.now() - new Date(DATA_CACHE._lastUpdated).getTime()) / 86400000);
      if (age > 7 && dataDateEl) {
        dataDateEl.innerHTML += ' <span class="badge bg-warning text-dark ms-2"><i class="bi bi-exclamation-triangle me-1"></i>\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05D9\u05E9\u05E0\u05D9\u05DD (' + age + ' \u05D9\u05DE\u05D9\u05DD)</span>';
      }
    }

    // === 1. Stats Cards — REAL numbers only ===
    this._setText('stat-students', activeStudents.length);
    this._setText('stat-attendance', todayAtt.length > 0 ? attPct + '%' : '\u05DC\u05D0 \u05E0\u05E8\u05E9\u05DD');
    this._setText('stat-pending', unpaidFinance.length);
    this._setText('stat-tasks', activeTasks);

    // === 2. Attendance Doughnut — real today's data ===
    const attCtx = document.getElementById('chart-att-doughnut');
    if (attCtx) {
      const hasData = todayAtt.length > 0;

      this._setText('att-center-pct', hasData ? attPct + '%' : '--');
      this._setText('att-present', hasData ? presentCount : 0);
      this._setText('att-absent', hasData ? absentCount : 0);
      this._setText('att-late', hasData ? lateCount : 0);

      if (App.charts.attDoughnut) App.charts.attDoughnut.destroy();

      if (hasData) {
        App.charts.attDoughnut = new Chart(attCtx, {
          type: 'doughnut',
          data: {
            labels: ['\u05E0\u05D5\u05DB\u05D7\u05D9\u05DD', '\u05D7\u05E1\u05E8\u05D9\u05DD', '\u05D0\u05D9\u05D7\u05D5\u05E8'],
            datasets: [{
              data: [presentCount, absentCount, lateCount],
              backgroundColor: ['#10b981', '#ef4444', '#f59e0b'],
              borderWidth: 0,
              hoverOffset: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: ctx => ctx.label + ': ' + ctx.raw
                }
              }
            }
          }
        });
      } else {
        // No attendance data today — show empty state on canvas
        const ctx2d = attCtx.getContext('2d');
        ctx2d.clearRect(0, 0, attCtx.width, attCtx.height);
      }
    }

    // === 3. Recent Payments — last 5 from שכר_לימוד ===
    const paymentsEl = document.getElementById('recent-payments');
    if (paymentsEl) {
      if (finance.length === 0) {
        paymentsEl.innerHTML = '<div class="text-muted text-center py-4"><i class="bi bi-credit-card fs-3 d-block mb-2 text-muted"></i>\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD</div>';
      } else {
        const recentPayments = finance
          .sort((a, b) => (b['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '').localeCompare(a['\u05EA\u05D0\u05E8\u05D9\u05DA'] || ''))
          .slice(0, 5);

        if (recentPayments.length > 0) {
          paymentsEl.innerHTML = recentPayments.map(p => {
            const name = Utils.fullName(p) || p['\u05E9\u05DD'] || p['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3'] || '\u05DC\u05D0 \u05D9\u05D3\u05D5\u05E2';
            const amount = Number(p['\u05E1\u05DB\u05D5\u05DD']) || 0;
            const date = p['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '';
            const isPaid = (p['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '') === '\u05E9\u05D5\u05DC\u05DD';
            const statusIcon = isPaid ? 'check-lg' : 'clock';
            const statusColor = isPaid ? 'success' : 'warning';
            const statusBg = isPaid ? '#dcfce7' : '#fef3c7';
            return `<div class="d-flex align-items-center gap-2 py-2 border-bottom">
              <div class="rounded-circle d-flex align-items-center justify-content-center" style="width:32px;height:32px;background:${statusBg}">
                <i class="bi bi-${statusIcon} text-${statusColor}"></i>
              </div>
              <div class="flex-grow-1">
                <div class="fw-semibold small">${name}</div>
                <small class="text-muted">${Utils.formatDateShort(date)}</small>
              </div>
              <span class="badge bg-${statusColor}-subtle text-${statusColor}">${Utils.formatCurrency(amount)}</span>
            </div>`;
          }).join('');
        } else {
          paymentsEl.innerHTML = '<div class="text-muted text-center py-4"><i class="bi bi-credit-card fs-3 d-block mb-2 text-muted"></i>\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD</div>';
        }
      }
    }

    // === 4. Upcoming Events — next 5 from לוח_שנה ===
    const eventsEl = document.getElementById('upcoming-events');
    if (eventsEl) {
      if (calendar.length === 0) {
        eventsEl.innerHTML = '<div class="text-muted text-center py-4"><i class="bi bi-calendar-x fs-3 d-block mb-2 text-muted"></i>\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD</div>';
      } else {
        const upcoming = calendar
          .filter(e => (e['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '') >= todayISO)
          .sort((a, b) => (a['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '').localeCompare(b['\u05EA\u05D0\u05E8\u05D9\u05DA'] || ''))
          .slice(0, 5);

        if (upcoming.length > 0) {
          eventsEl.innerHTML = upcoming.map(e => {
            const eventDate = e['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '';
            const isToday = eventDate === todayISO;
            const title = e['\u05E9\u05DD'] || e['\u05E0\u05D5\u05E9\u05D0'] || e['\u05EA\u05D9\u05D0\u05D5\u05E8'] || '--';
            return `<div class="d-flex align-items-center gap-2 py-2 border-bottom">
              <div class="rounded-circle d-flex align-items-center justify-content-center" style="width:32px;height:32px;background:${isToday ? '#fee2e2' : '#ede9fe'}">
                <i class="bi bi-calendar-event ${isToday ? 'text-danger' : 'text-purple'}"></i>
              </div>
              <div class="flex-grow-1">
                <div class="fw-semibold small">${title}</div>
                <small class="text-muted">${Utils.formatDateShort(eventDate)}</small>
              </div>
              ${isToday ? '<span class="badge bg-danger">\u05D4\u05D9\u05D5\u05DD</span>' : ''}
            </div>`;
          }).join('');
        } else {
          eventsEl.innerHTML = '<div class="text-muted text-center py-4"><i class="bi bi-calendar-x fs-3 d-block mb-2 text-muted"></i>\u05D0\u05D9\u05DF \u05D0\u05D9\u05E8\u05D5\u05E2\u05D9\u05DD \u05E7\u05E8\u05D5\u05D1\u05D9\u05DD</div>';
        }
      }
    }

    // === 5. Activity Feed — last 10 from יומן_פעילות (NO fallback/demo data) ===
    const feedEl = document.getElementById('activity-feed');
    if (feedEl) {
      if (activityLog.length > 0) {
        const activities = activityLog
          .sort((a, b) => (b['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '').localeCompare(a['\u05EA\u05D0\u05E8\u05D9\u05DA'] || ''))
          .slice(0, 10);

        const typeIcons = {
          'success': '#dcfce7', 'primary': '#dbeafe', 'warning': '#fef3c7',
          'danger': '#fee2e2', 'info': '#cffafe', 'secondary': '#f3f4f6'
        };

        feedEl.innerHTML = activities.map(a => {
          const icon = a['\u05D0\u05D9\u05E7\u05D5\u05DF'] || 'activity';
          const color = a['\u05E6\u05D1\u05E2'] || 'primary';
          const text = a['\u05EA\u05D9\u05D0\u05D5\u05E8'] || a['\u05E4\u05E2\u05D5\u05DC\u05D4'] || '';
          const time = Utils.timeAgo ? Utils.timeAgo(a['\u05EA\u05D0\u05E8\u05D9\u05DA']) : Utils.formatDateShort(a['\u05EA\u05D0\u05E8\u05D9\u05DA']);
          const bg = typeIcons[color] || '#f3f4f6';
          return `<div class="d-flex align-items-center gap-3 py-2 border-bottom">
            <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style="width:36px;height:36px;background:${bg}">
              <i class="bi bi-${icon} text-${color}"></i>
            </div>
            <div class="flex-grow-1">
              <span class="small">${text}</span>
            </div>
            <small class="text-muted text-nowrap">${time}</small>
          </div>`;
        }).join('');
      } else {
        feedEl.innerHTML = '<div class="text-muted text-center py-4"><i class="bi bi-clock-history fs-3 d-block mb-2 text-muted"></i>\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD</div>';
      }
    }

    // === 5b. Absent Students Alert ===
    const absentAlertEl = document.getElementById('dash-absent-alert');
    if (absentAlertEl) {
      const absentStudents = todayAtt.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D7\u05D9\u05E1\u05D5\u05E8');
      if (absentStudents.length > 0) {
        const absentNames = absentStudents.slice(0, 8).map(a => {
          const s = students.find(st => (st['\u05DE\u05D6\u05D4\u05D4'] || st._row) === (a['\u05DE\u05D6\u05D4\u05D4_\u05EA\u05DC\u05DE\u05D9\u05D3'] || a['\u05DE\u05D6\u05D4\u05D4']));
          return s ? Utils.fullName(s) : (a['\u05E9\u05DD'] || a['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3'] || '\u05DC\u05D0 \u05D9\u05D3\u05D5\u05E2');
        });
        const moreCount = absentStudents.length > 8 ? absentStudents.length - 8 : 0;
        absentAlertEl.style.display = '';
        absentAlertEl.innerHTML = `<div class="alert alert-danger border-0 shadow-sm d-flex align-items-start gap-3 mb-0">
          <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style="width:42px;height:42px;background:#fee2e2">
            <i class="bi bi-person-x-fill text-danger fs-5"></i>
          </div>
          <div class="flex-grow-1">
            <h6 class="fw-bold mb-1"><i class="bi bi-exclamation-triangle-fill me-1"></i>\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05D7\u05E1\u05E8\u05D9\u05DD \u05D4\u05D9\u05D5\u05DD (${absentStudents.length})</h6>
            <div class="d-flex flex-wrap gap-1">
              ${absentNames.map(n => `<span class="badge bg-danger-subtle text-danger">${n}</span>`).join('')}
              ${moreCount > 0 ? `<span class="badge bg-secondary">\u05D5\u05E2\u05D5\u05D3 ${moreCount}...</span>` : ''}
            </div>
          </div>
          <a href="#attendance" class="btn btn-outline-danger btn-sm flex-shrink-0 align-self-center">\u05E6\u05E4\u05D4</a>
        </div>`;
      } else {
        absentAlertEl.style.display = 'none';
      }
    }

    // === 5b2. Medication Alert ===
    const medAlertEl = document.getElementById('dash-med-alert');
    if (medAlertEl) {
      const medData = _gc('\u05DE\u05D9\u05D3\u05E2_\u05E8\u05E4\u05D5\u05D0\u05D9');
      const withMeds = medData.filter(m => (m['\u05EA\u05E8\u05D5\u05E4\u05D4_adhd']||'').trim() || (m['\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA']||'').trim());
      if (withMeds.length > 0) {
        const medList = withMeds.slice(0, 6).map(m => {
          const sid = m['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4'] || '';
          const student = students.find(s => (s['\u05DE\u05D6\u05D4\u05D4']||'') === sid);
          const name = student ? Utils.fullName(student) : '\u05DC\u05D0 \u05D9\u05D3\u05D5\u05E2';
          const meds = ((m['\u05EA\u05E8\u05D5\u05E4\u05D4_adhd']||'') + ', ' + (m['\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA']||'')).replace(/^,\s*|,\s*$/g, '').trim();
          return `<span class="badge bg-warning-subtle text-warning border" title="${meds}">${name}</span>`;
        });
        medAlertEl.style.display = '';
        medAlertEl.innerHTML = `<div class="alert alert-warning border-0 shadow-sm d-flex align-items-start gap-3 mb-0">
          <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style="width:42px;height:42px;background:#fef3c7">
            <i class="bi bi-capsule text-warning fs-5"></i>
          </div>
          <div class="flex-grow-1">
            <h6 class="fw-bold mb-1"><i class="bi bi-capsule me-1"></i>\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05E2\u05DD \u05EA\u05E8\u05D5\u05E4\u05D5\u05EA \u05E7\u05D1\u05D5\u05E2\u05D5\u05EA (${withMeds.length})</h6>
            <div class="d-flex flex-wrap gap-1">${medList.join('')}${withMeds.length > 6 ? '<span class="badge bg-secondary">\u05D5\u05E2\u05D5\u05D3 ' + (withMeds.length - 6) + '...</span>' : ''}</div>
          </div>
          <a href="#medical" class="btn btn-outline-warning btn-sm flex-shrink-0 align-self-center">\u05E6\u05E4\u05D4</a>
        </div>`;
      } else {
        medAlertEl.style.display = 'none';
      }
    }

    // === 5b3. Birthday Alert ===
    const today = new Date();
    const todayMD = String(today.getMonth()+1).padStart(2,'0') + '-' + String(today.getDate()).padStart(2,'0');
    const birthdayStudents = students.filter(s => {
      const bd = s['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4'] || '';
      return bd && bd.slice(5) === todayMD;
    });
    if (birthdayStudents.length > 0) {
      const names = birthdayStudents.map(s => Utils.fullName(s));
      const alertHTML = `<div class="alert alert-warning border-0 shadow-sm d-flex align-items-center gap-3 mb-3">
        <div class="rounded-circle d-flex align-items-center justify-content-center" style="width:42px;height:42px;background:#fef3c7"><span style="font-size:24px">\u{1F382}</span></div>
        <div><h6 class="fw-bold mb-0">\u05D9\u05D5\u05DD \u05D4\u05D5\u05DC\u05D3\u05EA \u05D4\u05D9\u05D5\u05DD!</h6><span class="small">${names.join(', ')}</span></div>
      </div>`;
      const absentEl = document.getElementById('dash-absent-alert');
      if (absentEl) absentEl.insertAdjacentHTML('afterend', alertHTML);
    }

    // === 5c. Recent Documents (last 7 days) ===
    const docsEl = document.getElementById('recent-documents');
    if (docsEl) {
      const docs = _gc('\u05E7\u05D1\u05E6\u05D9\u05DD_\u05DE\u05E6\u05D5\u05E8\u05E4\u05D9\u05DD') || [];
      const staffDocs = _gc('\u05DE\u05E1\u05DE\u05DB\u05D9_\u05E6\u05D5\u05D5\u05EA') || [];
      const allDocs = [...docs, ...staffDocs];
      const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7);
      const weekAgoISO = weekAgo.toISOString().slice(0, 10);
      const recentDocs = allDocs.filter(d => (d['\u05EA\u05D0\u05E8\u05D9\u05DA'] || d['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05E2\u05DC\u05D0\u05D4'] || '') >= weekAgoISO)
        .sort((a, b) => (b['\u05EA\u05D0\u05E8\u05D9\u05DA'] || b['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05E2\u05DC\u05D0\u05D4'] || '').localeCompare(a['\u05EA\u05D0\u05E8\u05D9\u05DA'] || a['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05E2\u05DC\u05D0\u05D4'] || ''));
      if (recentDocs.length > 0) {
        docsEl.innerHTML = `<div class="d-flex align-items-center gap-2 mb-3"><span class="badge bg-primary fs-6">${recentDocs.length}</span><span class="small fw-bold">\u05DE\u05E1\u05DE\u05DB\u05D9\u05DD \u05D1-7 \u05D9\u05DE\u05D9\u05DD \u05D0\u05D7\u05E8\u05D5\u05E0\u05D9\u05DD</span></div>`
          + recentDocs.slice(0, 5).map(d => {
            const name = d['\u05E9\u05DD'] || d['\u05E0\u05D5\u05E9\u05D0'] || d['\u05E9\u05DD_\u05E7\u05D5\u05D1\u05E5'] || '\u05DE\u05E1\u05DE\u05DA';
            const date = d['\u05EA\u05D0\u05E8\u05D9\u05DA'] || d['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05E2\u05DC\u05D0\u05D4'] || '';
            return `<div class="d-flex align-items-center gap-2 py-2 border-bottom">
              <div class="rounded-circle d-flex align-items-center justify-content-center" style="width:32px;height:32px;background:#dbeafe">
                <i class="bi bi-file-earmark-text text-primary"></i>
              </div>
              <div class="flex-grow-1"><div class="fw-semibold small">${name}</div><small class="text-muted">${Utils.formatDateShort(date)}</small></div>
            </div>`;
          }).join('');
      } else {
        docsEl.innerHTML = '<div class="text-muted text-center py-4"><i class="bi bi-file-earmark fs-3 d-block mb-2 text-muted"></i>\u05D0\u05D9\u05DF \u05DE\u05E1\u05DE\u05DB\u05D9\u05DD \u05D7\u05D3\u05E9\u05D9\u05DD</div>';
      }
    }

    // === 5d. Recent Emails from EMAIL_CACHE ===
    const emailsEl = document.getElementById('recent-emails');
    if (emailsEl) {
      const emails = (typeof EMAIL_CACHE !== 'undefined' && EMAIL_CACHE && EMAIL_CACHE.inbox) ? EMAIL_CACHE.inbox : [];
      if (emails.length > 0) {
        const unreadCount = emails.filter(e => e.unread).length;
        emailsEl.innerHTML = (unreadCount > 0 ? `<div class="alert alert-info py-1 px-2 small mb-2"><i class="bi bi-envelope-exclamation me-1"></i>${unreadCount} \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05D7\u05D3\u05E9\u05D5\u05EA</div>` : '')
          + emails.slice(0, 5).map(e => {
            const senderName = (e.from || '').replace(/<[^>]+>/g, '').replace(/"/g, '').trim();
            const shortName = senderName.split(/\s+/).slice(0, 2).join(' ');
            const initials = shortName.length >= 2 ? shortName[0] + (shortName.split(/\s+/)[1] || '')[0] : shortName.substring(0, 2);
            const isUnread = e.unread;
            const dateStr = e.date ? new Date(e.date).toLocaleDateString('he-IL', {day:'numeric',month:'short'}) : '';
            return `<div class="d-flex align-items-center gap-2 py-2 border-bottom" style="cursor:pointer" onclick="location.hash='email'">
              <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style="width:32px;height:32px;background:${isUnread ? '#dbeafe' : '#f3f4f6'};color:${isUnread ? '#2563eb' : '#6b7280'};font-size:11px;font-weight:600">
                ${initials || '??'}
              </div>
              <div class="flex-grow-1 min-width-0">
                <div class="${isUnread ? 'fw-bold' : ''} small text-truncate">${shortName}</div>
                <div class="text-muted small text-truncate" style="max-width:250px">${e.subject || ''}</div>
              </div>
              <small class="text-muted flex-shrink-0">${dateStr}</small>
            </div>`;
          }).join('');
      } else {
        emailsEl.innerHTML = '<div class="text-muted text-center py-4"><i class="bi bi-envelope fs-3 d-block mb-2"></i>\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9 \u05D3\u05D5\u05D0\u05E8</div>';
      }
    }

    // === 6. Recent Phone Calls from localStorage ===
    const callsEl = document.getElementById('recent-calls');
    if (callsEl) {
      const recentCalls = JSON.parse(localStorage.getItem('bht_call_log') || '[]').slice(0, 5);
      if (recentCalls.length === 0) {
        callsEl.innerHTML = '<div class="text-muted text-center py-4"><i class="bi bi-telephone fs-3 d-block mb-2 text-muted"></i>\u05D0\u05D9\u05DF \u05E9\u05D9\u05D7\u05D5\u05EA \u05DE\u05EA\u05D5\u05E2\u05D3\u05D5\u05EA<br><small>\u05DC\u05D7\u05E5 + \u05DB\u05D3\u05D9 \u05DC\u05E8\u05E9\u05D5\u05DD \u05E9\u05D9\u05D7\u05D4</small></div>';
      } else {
        callsEl.innerHTML = recentCalls.map(c => {
          const displayName = c.studentName || c.parentName || '\u05DC\u05D0 \u05D9\u05D3\u05D5\u05E2';
          const dateStr = c.date ? Utils.formatDateShort(c.date) : '';
          return `<div class="d-flex align-items-center gap-2 py-2 border-bottom">
            <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style="width:32px;height:32px;background:#dcfce7">
              <i class="bi bi-telephone-fill text-success"></i>
            </div>
            <div class="flex-grow-1">
              <div class="fw-semibold small">${displayName}${c.parentName && c.studentName ? ' <span class="text-muted fw-normal">(' + c.parentName + ')</span>' : ''}</div>
              <small class="text-muted text-truncate d-block" style="max-width:200px">${c.summary || '\u05DC\u05DC\u05D0 \u05EA\u05E7\u05E6\u05D9\u05E8'}</small>
            </div>
            <div class="text-end">
              <small class="text-muted d-block">${dateStr}</small>
              <span class="badge bg-light text-dark">${c.duration || ''}</span>
            </div>
          </div>`;
        }).join('');
      }
    }

    // === 6b. Quick Notes ===
    const noteEl = document.getElementById('dash-quick-note');
    if (noteEl) {
      noteEl.value = localStorage.getItem('bht_quick_note') || '';
      noteEl.addEventListener('input', Utils.debounce(() => {
        localStorage.setItem('bht_quick_note', noteEl.value);
      }, 500));
    }

    // === 7. System Health ===
    this._initSystemHealth();
  },

  _dashSaveNote() {
    const noteEl = document.getElementById('dash-quick-note');
    if (noteEl) {
      localStorage.setItem('bht_quick_note', noteEl.value);
      Utils.toast('\u05E4\u05EA\u05E7\u05D9\u05EA \u05E0\u05E9\u05DE\u05E8\u05D4', 'success');
    }
  },

  /* ---- Helper: safe setText ---- */
  _setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  },

  /* ---- System Health section ---- */
  _initSystemHealth() {
    // Modules loaded — count unique page functions (render+init pairs = 1 module)
    const pageNames = new Set();
    Object.keys(Pages).forEach(k => {
      if (typeof Pages[k] === 'function' && !k.startsWith('_')) {
        const base = k.replace(/Init$/, '');
        pageNames.add(base);
      }
    });
    this._setText('health-modules', pageNames.size + ' \u05DE\u05D5\u05D3\u05D5\u05DC\u05D9\u05DD');

    // localStorage usage
    let storageUsed = 0;
    try {
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          storageUsed += (localStorage[key].length + key.length) * 2; // UTF-16
        }
      }
    } catch (e) { /* access denied */ }

    const storageMB = (storageUsed / (1024 * 1024)).toFixed(2);
    const storagePct = Math.min(Math.round((storageUsed / (5 * 1024 * 1024)) * 100), 100); // 5MB limit
    this._setText('health-storage', storageMB + ' MB / 5 MB');

    const storageBar = document.getElementById('health-storage-bar');
    if (storageBar) {
      storageBar.style.width = storagePct + '%';
      storageBar.className = 'progress-bar ' + (storagePct > 80 ? 'bg-danger' : storagePct > 50 ? 'bg-warning' : 'bg-success');
    }

    // Page load performance
    try {
      const perf = performance.getEntriesByType('navigation')[0];
      if (perf) {
        const loadTime = Math.round(perf.loadEventEnd - perf.startTime);
        const backupEl = document.getElementById('health-backup');
        if (backupEl) backupEl.parentElement.insertAdjacentHTML('afterend',
          `<div class="col-md-4"><div class="d-flex align-items-center gap-3 p-3 bg-light rounded-3"><i class="bi bi-speedometer2 text-info fs-4"></i><div class="flex-grow-1"><small class="text-muted d-block">\u05D6\u05DE\u05DF \u05D8\u05E2\u05D9\u05E0\u05D4</small><span class="fw-bold">${loadTime > 0 ? loadTime + 'ms' : '\u05DE\u05D4\u05D9\u05E8'}</span></div></div></div>`
        );
      }
    } catch(e) {}

    // Last backup (use store timestamp)
    const lastSync = App.store && App.store._lastSync
      ? Utils.timeAgo(App.store._lastSync)
      : '\u05D4\u05D9\u05D5\u05DD, ' + new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
    this._setText('health-backup', lastSync);
  }
});
