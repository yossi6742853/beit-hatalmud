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
      </div>

      <!-- Quick Actions -->
      <div class="card mb-4 border-0 shadow-sm">
        <div class="card-body py-3">
          <div class="d-flex align-items-center gap-2 mb-3">
            <i class="bi bi-lightning-charge-fill text-warning"></i>
            <h6 class="fw-bold mb-0">\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA \u05DE\u05D4\u05D9\u05E8\u05D5\u05EA</h6>
          </div>
          <div class="row g-2">
            <div class="col-6 col-md-2">
              <a href="#students" class="btn btn-outline-primary w-100 py-2 d-flex flex-column align-items-center gap-1">
                <i class="bi bi-person-plus-fill fs-5"></i>
                <small>\u05D4\u05D5\u05E1\u05E3 \u05EA\u05DC\u05DE\u05D9\u05D3</small>
              </a>
            </div>
            <div class="col-6 col-md-2">
              <a href="#attendance" class="btn btn-outline-success w-100 py-2 d-flex flex-column align-items-center gap-1">
                <i class="bi bi-calendar-check-fill fs-5"></i>
                <small>\u05E8\u05E9\u05D5\u05DD \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</small>
              </a>
            </div>
            <div class="col-6 col-md-2">
              <a href="#communications" class="btn btn-outline-info w-100 py-2 d-flex flex-column align-items-center gap-1">
                <i class="bi bi-chat-dots-fill fs-5"></i>
                <small>\u05E9\u05DC\u05D7 \u05D4\u05D5\u05D3\u05E2\u05D4</small>
              </a>
            </div>
            <div class="col-6 col-md-2">
              <a href="#finance" class="btn btn-outline-warning w-100 py-2 d-flex flex-column align-items-center gap-1">
                <i class="bi bi-credit-card-fill fs-5"></i>
                <small>\u05D4\u05D5\u05E1\u05E3 \u05EA\u05E9\u05DC\u05D5\u05DD</small>
              </a>
            </div>
            <div class="col-6 col-md-2">
              <a href="#checklist" class="btn btn-outline-danger w-100 py-2 d-flex flex-column align-items-center gap-1">
                <i class="bi bi-list-task fs-5"></i>
                <small>\u05E6\u05D5\u05E8 \u05DE\u05E9\u05D9\u05DE\u05D4</small>
              </a>
            </div>
            <div class="col-6 col-md-2">
              <a href="#reports" class="btn btn-outline-secondary w-100 py-2 d-flex flex-column align-items-center gap-1">
                <i class="bi bi-file-earmark-bar-graph-fill fs-5"></i>
                <small>\u05D3\u05D5\u05D7 \u05DE\u05D4\u05D9\u05E8</small>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Cards Row -->
      <div class="row g-3 mb-4" id="dash-stats">
        <div class="col-6 col-lg-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body d-flex align-items-center gap-3">
              <div class="rounded-3 d-flex align-items-center justify-content-center" style="width:48px;height:48px;background:linear-gradient(135deg,#3b82f6,#1d4ed8)">
                <i class="bi bi-people-fill text-white fs-5"></i>
              </div>
              <div>
                <div class="fs-3 fw-bold lh-1" id="stat-students">--</div>
                <small class="text-muted">\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05E4\u05E2\u05D9\u05DC\u05D9\u05DD</small>
              </div>
            </div>
          </div>
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

      <!-- Today's Summary Row: Attendance Doughnut + Recent Payments + Upcoming Events -->
      <div class="row g-3 mb-4">
        <div class="col-lg-4">
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
      </div>

      <!-- Recent Activity Feed -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <h6 class="fw-bold mb-3">
            <i class="bi bi-clock-history me-2 text-info"></i>\u05E4\u05E2\u05D9\u05DC\u05D5\u05D9\u05D5\u05EA \u05D0\u05D7\u05E8\u05D5\u05E0\u05D5\u05EA
          </h6>
          <div id="activity-feed"><div class="text-muted text-center py-4">\u05D8\u05D5\u05E2\u05DF...</div></div>
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

  /* ---- Dashboard Init: populate all sections with real API data ---- */
  async dashboardInit() {
    // Load ALL 6 sheets in parallel
    let students, finance, attendance, calendar, tasks, activityLog;
    try {
      [students, finance, attendance, calendar, tasks, activityLog] = await Promise.all([
        App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD'),
        App.getData('\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3'),
        App.getData('\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA'),
        App.getData('\u05DC\u05D5\u05D7_\u05E9\u05E0\u05D4').catch(() => []),
        App.getData('\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA').catch(() => []),
        App.getData('\u05D9\u05D5\u05DE\u05DF_\u05E4\u05E2\u05D9\u05DC\u05D5\u05EA').catch(() => [])
      ]);
    } catch(e) {
      console.error('Dashboard data load error:', e);
      students = []; finance = []; attendance = []; calendar = []; tasks = []; activityLog = [];
    }
    if (!students) students = [];
    if (!finance) finance = [];
    if (!attendance) attendance = [];
    if (!calendar) calendar = [];
    if (!tasks) tasks = [];
    if (!activityLog) activityLog = [];

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

    // === 6. System Health ===
    this._initSystemHealth();
  },

  /* ---- Helper: safe setText ---- */
  _setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  },

  /* ---- System Health section ---- */
  _initSystemHealth() {
    // Modules loaded
    const moduleCount = Object.keys(Pages).filter(k => typeof Pages[k] === 'function' && !k.startsWith('_')).length;
    this._setText('health-modules', Math.floor(moduleCount / 2) + ' \u05DE\u05D5\u05D3\u05D5\u05DC\u05D9\u05DD');

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

    // Last backup (use store timestamp)
    const lastSync = App.store && App.store._lastSync
      ? Utils.timeAgo(App.store._lastSync)
      : '\u05D4\u05D9\u05D5\u05DD, ' + new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
    this._setText('health-backup', lastSync);
  }
});
