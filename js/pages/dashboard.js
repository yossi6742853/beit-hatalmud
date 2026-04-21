/* ===== BHT v5.3 — Dashboard ===== */
Object.assign(Pages, {
  /* ======================================================================
     DASHBOARD
     ====================================================================== */
  _getParasha() {
    const parashot = ['בראשית','נח','לך לך','וירא','חיי שרה','תולדות','ויצא','וישלח','וישב','מקץ','ויגש','ויחי',
      'שמות','וארא','בא','בשלח','יתרו','משפטים','תרומה','תצוה','כי תשא','ויקהל','פקודי',
      'ויקרא','צו','שמיני','תזריע','מצורע','אחרי מות','קדושים','אמור','בהר','בחוקותי',
      'במדבר','נשא','בהעלותך','שלח','קרח','חוקת','בלק','פינחס','מטות','מסעי',
      'דברים','ואתחנן','עקב','ראה','שופטים','כי תצא','כי תבוא','ניצבים','וילך','האזינו','וזאת הברכה'];
    // Approximate: use week of year mod 54
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const week = Math.ceil((now - start) / 604800000);
    return parashot[week % parashot.length];
  },

  dashboard() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div>
          <h1><i class="bi bi-speedometer2 me-2"></i>לוח בקרה</h1>
          <p>${Utils.dayName()} | ${Utils.formatDate(new Date())}${Utils.hebrewDateFull() ? ' | ' + Utils.hebrewDateFull() : ''}</p>
        </div>
        <div id="dash-notifications"></div>
      </div>

      <!-- Stat Cards with Gradient Icons -->
      <div class="row g-3 mb-4" id="dash-stats">
        <div class="col-6 col-md-3"><div class="card stat-card p-3"><div class="stat-icon gradient-primary"><i class="bi bi-people-fill"></i></div><div class="stat-value" id="stat-students">--</div><div class="stat-label">תלמידים פעילים</div></div></div>
        <div class="col-6 col-md-3"><div class="card stat-card p-3"><div class="stat-icon gradient-success"><i class="bi bi-calendar-check-fill"></i></div><div class="stat-value" id="stat-attendance">--</div><div class="stat-label">נוכחות היום</div></div></div>
        <div class="col-6 col-md-3"><div class="card stat-card p-3"><div class="stat-icon gradient-info"><i class="bi bi-person-badge-fill"></i></div><div class="stat-value" id="stat-staff">--</div><div class="stat-label">אנשי צוות</div></div></div>
        <div class="col-6 col-md-3"><div class="card stat-card p-3"><div class="stat-icon gradient-warning"><i class="bi bi-cash-stack"></i></div><div class="stat-value" id="stat-debt">--</div><div class="stat-label">חובות פתוחים</div></div></div>
      </div>

      <!-- Executive KPI Section -->
      <div class="row g-3 mb-4" id="dash-kpi" style="display:none">
        <div class="col-md-3"><div class="card p-3 card-top-primary"><small class="text-muted">ממוצע נוכחות חודשי</small><div class="d-flex align-items-end gap-2"><span class="fs-3 fw-bold" id="kpi-att-pct">--</span><span class="badge" id="kpi-att-trend"></span></div></div></div>
        <div class="col-md-3"><div class="card p-3 card-top-success"><small class="text-muted">שיעור גביה</small><div class="d-flex align-items-end gap-2"><span class="fs-3 fw-bold" id="kpi-collection">--</span><span class="badge" id="kpi-col-trend"></span></div></div></div>
        <div class="col-md-3"><div class="card p-3 card-top-warning"><small class="text-muted">ניקוד התנהגות ממוצע</small><div class="d-flex align-items-end gap-2"><span class="fs-3 fw-bold" id="kpi-beh-score">--</span><span class="badge" id="kpi-beh-trend"></span></div></div></div>
        <div class="col-md-3"><div class="card p-3 card-top-danger"><small class="text-muted">תלמידים בסיכון</small><div class="d-flex align-items-end gap-2"><span class="fs-3 fw-bold text-danger" id="kpi-at-risk">--</span><small class="text-muted" id="kpi-risk-detail"></small></div></div></div>
      </div>

      <!-- Parasha + Daily Schedule -->
      <div class="row g-3 mb-4">
        <div class="col-lg-4">
          <div class="card p-3" style="border-right:4px solid #8b5cf6">
            <h6 class="fw-bold"><i class="bi bi-book-half me-2 text-purple"></i>פרשת השבוע</h6>
            <div class="fs-4 fw-bold text-gradient" id="dash-parasha">--</div>
            <div class="mt-2 small text-muted" id="dash-shabbat"></div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="card p-3">
            <h6 class="fw-bold"><i class="bi bi-clock-history me-2 text-info"></i>סדר היום</h6>
            <div class="small" id="daily-routine"></div>
          </div>
        </div>
      </div>

      <!-- Row 2: Weekly Attendance Chart + Finance Doughnut -->
      <div class="row g-3 mb-3">
        <div class="col-lg-8">
          <div class="card p-3">
            <h6 class="fw-bold mb-3"><i class="bi bi-bar-chart-fill me-2 text-primary"></i>נוכחות שבועית <small class="text-muted fw-normal">(7 ימים אחרונים)</small></h6>
            <div class="chart-container" style="height:260px"><canvas id="chart-attendance"></canvas></div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card p-3 h-100">
            <h6 class="fw-bold mb-3"><i class="bi bi-pie-chart-fill me-2 text-success"></i>מצב כספי</h6>
            <div class="chart-container position-relative" style="height:220px">
              <canvas id="chart-finance"></canvas>
              <div id="finance-center-text" style="position:absolute;top:45%;left:50%;transform:translate(-50%,-50%);text-align:center;pointer-events:none">
                <div class="fw-bold fs-5" id="finance-total">--</div>
                <div class="text-muted small">סה״כ</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Row 3: Class Breakdown + Quick Actions + AI Insight -->
      <div class="row g-3 mb-3">
        <div class="col-lg-4">
          <div class="card p-3 h-100">
            <h6 class="fw-bold mb-3"><i class="bi bi-diagram-3-fill me-2 text-purple"></i>פילוח לפי כיתות</h6>
            <div id="class-breakdown"><div class="text-muted text-center py-3">טוען...</div></div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card p-3 h-100">
            <h6 class="fw-bold mb-3"><i class="bi bi-lightning-fill me-2 text-warning"></i>פעולות מהירות</h6>
            <div class="row g-2">
              <div class="col-6"><a href="#attendance" class="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2 py-2"><i class="bi bi-calendar-check"></i>נוכחות</a></div>
              <div class="col-6"><a href="#students" class="btn btn-outline-success w-100 d-flex align-items-center justify-content-center gap-2 py-2"><i class="bi bi-person-plus"></i>תלמיד</a></div>
              <div class="col-6"><a href="#tasks" class="btn btn-outline-info w-100 d-flex align-items-center justify-content-center gap-2 py-2"><i class="bi bi-kanban"></i>משימות</a></div>
              <div class="col-6"><a href="#finance" class="btn btn-outline-warning w-100 d-flex align-items-center justify-content-center gap-2 py-2"><i class="bi bi-cash"></i>כספים</a></div>
              <div class="col-6"><a href="#behavior" class="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 py-2"><i class="bi bi-clipboard-data"></i>התנהגות</a></div>
              <div class="col-6"><a href="#communications" class="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2 py-2"><i class="bi bi-whatsapp"></i>WhatsApp</a></div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card p-3 h-100 border-start border-4 border-info">
            <h6 class="fw-bold mb-3"><i class="bi bi-robot me-2 text-info"></i>תובנה חכמה</h6>
            <div id="ai-insight"><div class="text-muted text-center py-3"><div class="spinner-border spinner-border-sm me-2"></div>מנתח...</div></div>
          </div>
        </div>
      </div>

      <!-- Birthday Alerts -->
      <div class="card p-3 mt-3 mb-3" id="dash-birthdays" style="display:none">
        <h6 class="fw-bold"><i class="bi bi-cake2 me-2 text-danger"></i>ימי הולדת השבוע</h6>
        <div id="birthday-list"></div>
      </div>

      <!-- Row 4: Today's Schedule + Upcoming Events -->
      <div class="row g-3 mb-3">
        <div class="col-lg-6">
          <div class="card p-3 h-100">
            <h6 class="fw-bold mb-3"><i class="bi bi-clock-fill me-2 text-primary"></i>מערכת שעות היום</h6>
            <div id="today-schedule"><div class="text-muted text-center py-3">טוען...</div></div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card p-3 h-100">
            <h6 class="fw-bold mb-3"><i class="bi bi-calendar-event-fill me-2 text-danger"></i>אירועים קרובים</h6>
            <div id="upcoming-events"><div class="text-muted text-center py-3">טוען...</div></div>
          </div>
        </div>
      </div>

      <!-- Row 5: Activity Feed -->
      <div class="card p-3">
        <h6 class="fw-bold mb-3"><i class="bi bi-clock-history me-2 text-info"></i>פעילויות אחרונות</h6>
        <div id="activity-feed"><div class="text-muted text-center py-3">טוען נתונים...</div></div>
      </div>
    `;
  },

  async dashboardInit() {
    // Load all data in parallel
    const [students, staff, finance, attendance, calendar, schedule, tasks, homework, beh] = await Promise.all([
      App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD'),
      App.getData('\u05E6\u05D5\u05D5\u05EA'),
      App.getData('\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3'),
      App.getData('\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA'),
      App.getData('\u05DC\u05D5\u05D7_\u05E9\u05E0\u05D4').catch(() => []),
      App.getData('\u05DE\u05E2\u05E8\u05DB\u05EA_\u05E9\u05E2\u05D5\u05EA').catch(() => []),
      App.getData('\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA').catch(() => []),
      App.getData('\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9_\u05D1\u05D9\u05EA').catch(() => []),
      App.getData('\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA').catch(() => [])
    ]);

    const activeStudents = students.filter(s => (s['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') !== '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC');
    const todayISO = Utils.todayISO();
    const todayAtt = attendance.filter(a => a['\u05EA\u05D0\u05E8\u05D9\u05DA'] === todayISO);
    const present = todayAtt.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E0\u05D5\u05DB\u05D7');
    const absent = todayAtt.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D7\u05D9\u05E1\u05D5\u05E8');
    const late = todayAtt.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D0\u05D9\u05D7\u05D5\u05E8');
    const attPct = todayAtt.length > 0 ? Math.round(present.length / todayAtt.length * 100) : 0;
    const unpaidFinance = finance.filter(f => (f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') !== '\u05E9\u05D5\u05DC\u05DD');
    const totalDebt = unpaidFinance.reduce((s, f) => s + (Number(f['\u05E1\u05DB\u05D5\u05DD'])||0), 0);
    const totalPaid = finance.filter(f => (f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') === '\u05E9\u05D5\u05DC\u05DD').reduce((s, f) => s + (Number(f['\u05E1\u05DB\u05D5\u05DD'])||0), 0);

    // === 1. Stat Cards ===
    document.getElementById('stat-students').textContent = activeStudents.length;
    document.getElementById('stat-attendance').textContent = todayAtt.length > 0 ? attPct + '%' : '--';
    document.getElementById('stat-staff').textContent = staff.length;
    document.getElementById('stat-debt').textContent = Utils.formatCurrency(totalDebt);

    // === 1b. Executive KPI Section ===
    const kpiEl = document.getElementById('dash-kpi');
    if (kpiEl) {
      kpiEl.style.display = '';

      // Attendance %
      const kpiAttPct = attendance.length ? Math.round(attendance.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E0\u05D5\u05DB\u05D7').length / attendance.length * 100) : 0;
      document.getElementById('kpi-att-pct').textContent = kpiAttPct + '%';
      document.getElementById('kpi-att-trend').className = 'badge ' + (kpiAttPct >= 85 ? 'bg-success' : kpiAttPct >= 70 ? 'bg-warning' : 'bg-danger');
      document.getElementById('kpi-att-trend').innerHTML = kpiAttPct >= 85 ? '<i class="bi bi-arrow-up"></i> \u05D8\u05D5\u05D1' : kpiAttPct >= 70 ? '<i class="bi bi-dash"></i> \u05D1\u05D9\u05E0\u05D5\u05E0\u05D9' : '<i class="bi bi-arrow-down"></i> \u05E0\u05DE\u05D5\u05DA';

      // Collection rate
      const totalAmt = totalPaid + totalDebt;
      const colRate = totalAmt > 0 ? Math.round(totalPaid / totalAmt * 100) : 0;
      document.getElementById('kpi-collection').textContent = colRate + '%';
      document.getElementById('kpi-col-trend').className = 'badge ' + (colRate >= 80 ? 'bg-success' : colRate >= 50 ? 'bg-warning' : 'bg-danger');
      document.getElementById('kpi-col-trend').innerHTML = colRate >= 80 ? '<i class="bi bi-arrow-up"></i> \u05D8\u05D5\u05D1' : '<i class="bi bi-arrow-down"></i> \u05E0\u05DE\u05D5\u05DA';

      // Behavior score
      const posB = beh.filter(b => b['\u05E1\u05D5\u05D2'] === '\u05D7\u05D9\u05D5\u05D1\u05D9').length;
      const negB = beh.filter(b => b['\u05E1\u05D5\u05D2'] === '\u05E9\u05DC\u05D9\u05DC\u05D9').length;
      const behNet = posB - negB;
      document.getElementById('kpi-beh-score').textContent = (behNet >= 0 ? '+' : '') + behNet;
      document.getElementById('kpi-beh-trend').className = 'badge ' + (behNet >= 0 ? 'bg-success' : 'bg-danger');
      document.getElementById('kpi-beh-trend').textContent = behNet >= 0 ? '\u05D7\u05D9\u05D5\u05D1\u05D9' : '\u05E9\u05DC\u05D9\u05DC\u05D9';

      // At-risk students (attendance < 70% or behavior < -3)
      const studentAtt = {};
      attendance.forEach(a => { const n = a['\u05E9\u05DD'] || ''; if (!n) return; if (!studentAtt[n]) studentAtt[n] = { p: 0, t: 0 }; studentAtt[n].t++; if (a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E0\u05D5\u05DB\u05D7') studentAtt[n].p++; });
      const studentBeh = {};
      beh.forEach(b => { const n = b['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3'] || b['\u05E9\u05DD'] || ''; if (!n) return; if (!studentBeh[n]) studentBeh[n] = 0; if (b['\u05E1\u05D5\u05D2'] === '\u05D7\u05D9\u05D5\u05D1\u05D9') studentBeh[n]++; else if (b['\u05E1\u05D5\u05D2'] === '\u05E9\u05DC\u05D9\u05DC\u05D9') studentBeh[n]--; });

      let atRisk = 0;
      const reasons = [];
      Object.keys(studentAtt).forEach(n => {
        const pct = studentAtt[n].t ? Math.round(studentAtt[n].p / studentAtt[n].t * 100) : 100;
        if (pct < 70) { atRisk++; reasons.push(n + ' (\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA ' + pct + '%)'); }
      });
      Object.keys(studentBeh).forEach(n => {
        if (studentBeh[n] < -3 && !reasons.find(r => r.startsWith(n))) { atRisk++; reasons.push(n + ' (\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA)'); }
      });

      document.getElementById('kpi-at-risk').textContent = atRisk;
      document.getElementById('kpi-risk-detail').textContent = atRisk ? reasons.slice(0, 3).join(', ') : '\u05D0\u05D9\u05DF \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05D1\u05E1\u05D9\u05DB\u05D5\u05DF';
    }

    // === 2. Notifications Badge ===
    const pendingTasks = tasks.filter(t => (t['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') !== '\u05D4\u05D5\u05E9\u05DC\u05DD').length;
    const overdueHW = homework.filter(h => {
      const due = h['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4'] || '';
      return due && due < todayISO && (h['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') !== '\u05D4\u05D5\u05D2\u05E9';
    }).length;
    const totalNotifications = unpaidFinance.length + pendingTasks + overdueHW;
    const notifEl = document.getElementById('dash-notifications');
    if (notifEl && totalNotifications > 0) {
      notifEl.innerHTML =
        '<span class="badge bg-danger rounded-pill fs-6 px-3 py-2">' +
          '<i class="bi bi-bell-fill me-1"></i>' + totalNotifications + ' \u05D4\u05EA\u05E8\u05D0\u05D5\u05EA' +
        '</span>' +
        '<div class="small text-muted mt-1">' +
          (unpaidFinance.length ? '<span class="me-2"><i class="bi bi-cash text-warning"></i> ' + unpaidFinance.length + ' \u05D7\u05D5\u05D1\u05D5\u05EA</span>' : '') +
          (pendingTasks ? '<span class="me-2"><i class="bi bi-kanban text-info"></i> ' + pendingTasks + ' \u05DE\u05E9\u05D9\u05DE\u05D5\u05EA</span>' : '') +
          (overdueHW ? '<span><i class="bi bi-journal-x text-danger"></i> ' + overdueHW + ' \u05E9\u05D9\u05E2\u05D5\u05E8\u05D9\u05DD</span>' : '') +
        '</div>';
    }

    // === 3. Weekly Attendance Chart (last 7 days) ===
    const attCtx = document.getElementById('chart-attendance');
    if (attCtx) {
      const last7 = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const iso = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
        const dayAtt = attendance.filter(a => a['\u05EA\u05D0\u05E8\u05D9\u05DA'] === iso);
        last7.push({
          label: Utils.HEB_DAYS[d.getDay()],
          present: dayAtt.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E0\u05D5\u05DB\u05D7').length,
          absent: dayAtt.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D7\u05D9\u05E1\u05D5\u05E8').length,
          late: dayAtt.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D0\u05D9\u05D7\u05D5\u05E8').length
        });
      }
      App.charts.att = new Chart(attCtx, {
        type: 'bar',
        data: {
          labels: last7.map(d => d.label),
          datasets: [
            { label: '\u05E0\u05D5\u05DB\u05D7', data: last7.map(d => d.present), backgroundColor: '#0f9d58', borderRadius: 6, barPercentage: 0.7 },
            { label: '\u05D7\u05D9\u05E1\u05D5\u05E8', data: last7.map(d => d.absent), backgroundColor: '#ea4335', borderRadius: 6, barPercentage: 0.7 },
            { label: '\u05D0\u05D9\u05D7\u05D5\u05E8', data: last7.map(d => d.late), backgroundColor: '#f9ab00', borderRadius: 6, barPercentage: 0.7 }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top', labels: { font: { family: 'Heebo', size: 12 }, usePointStyle: true, pointStyle: 'circle' } }
          },
          scales: {
            y: { beginAtZero: true, stacked: true, ticks: { stepSize: 1 } },
            x: { stacked: true, grid: { display: false } }
          }
        }
      });
    }

    // === 4. Finance Doughnut with Center Text ===
    const finCtx = document.getElementById('chart-finance');
    if (finCtx) {
      const totalAll = totalPaid + totalDebt;
      document.getElementById('finance-total').textContent = Utils.formatCurrency(totalAll);
      App.charts.fin = new Chart(finCtx, {
        type: 'doughnut',
        data: {
          labels: ['\u05E9\u05D5\u05DC\u05DD', '\u05D9\u05EA\u05E8\u05D4'],
          datasets: [{ data: [totalPaid, totalDebt], backgroundColor: ['#0f9d58', '#ea4335'], borderWidth: 0, hoverOffset: 8 }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '68%',
          plugins: {
            legend: { position: 'bottom', labels: { font: { family: 'Heebo' }, usePointStyle: true, pointStyle: 'circle', padding: 12 } },
            tooltip: {
              callbacks: {
                label: function(ctx) { return ctx.label + ': ' + Utils.formatCurrency(ctx.raw); }
              }
            }
          }
        }
      });
    }

    // === 5. Class Breakdown ===
    const classBreakdown = {};
    activeStudents.forEach(s => {
      const cls = s['\u05DB\u05D9\u05EA\u05D4'] || '\u05DC\u05DC\u05D0 \u05DB\u05D9\u05EA\u05D4';
      classBreakdown[cls] = (classBreakdown[cls] || 0) + 1;
    });
    const cbEl = document.getElementById('class-breakdown');
    if (cbEl) {
      const sorted = Object.entries(classBreakdown).sort((a, b) => a[0].localeCompare(b[0], 'he'));
      if (sorted.length > 0) {
        let cbHtml = '<table class="table table-sm table-hover mb-0"><thead><tr><th>\u05DB\u05D9\u05EA\u05D4</th><th>\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</th><th></th></tr></thead><tbody>';
        sorted.forEach(function(entry) {
          const cls = entry[0], count = entry[1];
          const pct = Math.round(count / activeStudents.length * 100);
          cbHtml += '<tr><td class="fw-bold">' + cls + '</td><td>' + count + '</td><td style="width:40%"><div class="progress" style="height:6px"><div class="progress-bar" style="width:' + pct + '%;background:var(--bht-gradient-primary)"></div></div></td></tr>';
        });
        cbHtml += '</tbody></table>';
        cbEl.innerHTML = cbHtml;
      } else {
        cbEl.innerHTML = '<div class="text-muted text-center py-3">\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD</div>';
      }
    }

    // === 5b. Birthday Alerts ===
    const birthdays = Utils.getUpcomingBirthdays(activeStudents, 7);
    if (birthdays.length) {
      const bdEl = document.getElementById('dash-birthdays');
      if (bdEl) {
        bdEl.style.display = '';
        document.getElementById('birthday-list').innerHTML = birthdays.map(b =>
          `<div class="d-flex align-items-center gap-2 py-1 border-bottom">
            ${Utils.avatarHTML(b.name, 'sm')}
            <div class="flex-grow-1">
              <span class="fw-bold">${b.name}</span>
              <small class="text-muted ms-2">${b.hebrewDate} | ${b.daysUntil === 0 ? '\uD83C\uDF82 \u05D4\u05D9\u05D5\u05DD!' : '\u05D1\u05E2\u05D5\u05D3 ' + b.daysUntil + ' \u05D9\u05DE\u05D9\u05DD'}</small>
            </div>
            <span class="badge bg-light text-dark">\u05D2\u05D9\u05DC ${b.age}</span>
          </div>`
        ).join('');
      }
    }

    // === 6. Today's Schedule ===
    const schedEl = document.getElementById('today-schedule');
    if (schedEl) {
      const dayNum = new Date().getDay();
      const dayName = Utils.HEB_DAYS[dayNum];
      const todayLessons = schedule.filter(function(s) { return (s['\u05D9\u05D5\u05DD']||'') === dayName || (s['\u05D9\u05D5\u05DD']||'').includes(dayName); });
      if (todayLessons.length > 0) {
        schedEl.innerHTML = todayLessons.map(function(l) {
          return '<div class="d-flex align-items-center gap-3 py-2 border-bottom">' +
            '<div class="avatar avatar-sm" style="background:var(--bht-gradient-info)"><i class="bi bi-book" style="font-size:.8rem;color:#fff"></i></div>' +
            '<div class="flex-grow-1">' +
              '<div class="fw-bold">' + (l['\u05E9\u05DD_\u05E9\u05D9\u05E2\u05D5\u05E8'] || l['\u05DE\u05E7\u05E6\u05D5\u05E2'] || '--') + '</div>' +
              '<small class="text-muted">' + (l['\u05DB\u05D9\u05EA\u05D4'] || '') + ' ' + (l['\u05DE\u05DC\u05DE\u05D3'] || '') + '</small>' +
            '</div>' +
            '<span class="badge bg-light text-dark">' + (l['\u05E9\u05E2\u05D4'] || l['\u05E9\u05E2\u05EA_\u05D4\u05EA\u05D7\u05DC\u05D4'] || '') + '</span>' +
          '</div>';
        }).join('');
      } else {
        schedEl.innerHTML = '<div class="text-muted text-center py-3"><i class="bi bi-calendar-x me-2"></i>\u05D0\u05D9\u05DF \u05E9\u05D9\u05E2\u05D5\u05E8\u05D9\u05DD \u05D4\u05D9\u05D5\u05DD</div>';
      }
    }

    // === 7. Upcoming Events ===
    const eventsEl = document.getElementById('upcoming-events');
    if (eventsEl) {
      const upcoming = calendar
        .filter(function(e) { return (e['\u05EA\u05D0\u05E8\u05D9\u05DA']||'') >= todayISO; })
        .sort(function(a, b) { return (a['\u05EA\u05D0\u05E8\u05D9\u05DA']||'').localeCompare(b['\u05EA\u05D0\u05E8\u05D9\u05DA']||''); })
        .slice(0, 5);
      if (upcoming.length > 0) {
        eventsEl.innerHTML = upcoming.map(function(e) {
          const eventDate = e['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '';
          const isToday = eventDate === todayISO;
          return '<div class="d-flex align-items-center gap-3 py-2 border-bottom">' +
            '<div class="avatar avatar-sm" style="background:' + (isToday ? 'var(--bht-gradient-danger)' : 'var(--bht-gradient-purple)') + '">' +
              '<i class="bi bi-calendar-event" style="font-size:.8rem;color:#fff"></i>' +
            '</div>' +
            '<div class="flex-grow-1">' +
              '<div class="fw-bold">' + (e['\u05E9\u05DD'] || e['\u05E0\u05D5\u05E9\u05D0'] || e['\u05EA\u05D9\u05D0\u05D5\u05E8'] || '--') + '</div>' +
              '<small class="text-muted">' + Utils.formatDateShort(eventDate) + '</small>' +
            '</div>' +
            (isToday ? '<span class="badge bg-danger">\u05D4\u05D9\u05D5\u05DD</span>' : '') +
          '</div>';
        }).join('');
      } else {
        eventsEl.innerHTML = '<div class="text-muted text-center py-3"><i class="bi bi-calendar-x me-2"></i>\u05D0\u05D9\u05DF \u05D0\u05D9\u05E8\u05D5\u05E2\u05D9\u05DD \u05E7\u05E8\u05D5\u05D1\u05D9\u05DD</div>';
      }
    }

    // === 8. Activity Feed ===
    const feed = document.getElementById('activity-feed');
    if (feed) {
      let activities = [];
      // Try loading יומן_פעילות
      let activityLog = [];
      try { activityLog = await App.getData('\u05D9\u05D5\u05DE\u05DF_\u05E4\u05E2\u05D9\u05DC\u05D5\u05EA'); } catch(e) {}

      if (activityLog.length > 0) {
        activities = activityLog
          .sort(function(a, b) { return (b['\u05EA\u05D0\u05E8\u05D9\u05DA']||'').localeCompare(a['\u05EA\u05D0\u05E8\u05D9\u05DA']||''); })
          .slice(0, 10)
          .map(function(a) {
            return {
              icon: a['\u05D0\u05D9\u05E7\u05D5\u05DF'] || 'activity',
              color: 'primary',
              text: a['\u05EA\u05D9\u05D0\u05D5\u05E8'] || a['\u05E4\u05E2\u05D5\u05DC\u05D4'] || '',
              time: Utils.formatDateShort(a['\u05EA\u05D0\u05E8\u05D9\u05DA']) || ''
            };
          });
      }

      // Generate from data if no activity log
      if (activities.length === 0) {
        activities = [
          { icon: 'calendar-check', color: 'success', text: '\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D4\u05D9\u05D5\u05DD: ' + present.length + '/' + todayAtt.length + ' \u05E0\u05D5\u05DB\u05D7\u05D9\u05DD (' + attPct + '%)', time: '\u05D4\u05D9\u05D5\u05DD' },
          { icon: 'person-x', color: 'danger', text: absent.length + ' \u05D7\u05D9\u05E1\u05D5\u05E8\u05D9\u05DD, ' + late.length + ' \u05D0\u05D9\u05D7\u05D5\u05E8\u05D9\u05DD', time: '\u05D4\u05D9\u05D5\u05DD' },
          { icon: 'cash', color: 'warning', text: unpaidFinance.length + ' \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05E2\u05DD \u05D7\u05D5\u05D1 \u05E4\u05EA\u05D5\u05D7 \u05D1\u05E1\u05DA ' + Utils.formatCurrency(totalDebt), time: '\u05D4\u05D9\u05D5\u05DD' },
          { icon: 'people', color: 'primary', text: activeStudents.length + ' \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05E4\u05E2\u05D9\u05DC\u05D9\u05DD \u05D1-' + Object.keys(classBreakdown).length + ' \u05DB\u05D9\u05EA\u05D5\u05EA', time: '\u05DE\u05E2\u05D5\u05D3\u05DB\u05DF' },
          { icon: 'person-badge', color: 'info', text: staff.length + ' \u05D0\u05E0\u05E9\u05D9 \u05E6\u05D5\u05D5\u05EA \u05E4\u05E2\u05D9\u05DC\u05D9\u05DD', time: '\u05DE\u05E2\u05D5\u05D3\u05DB\u05DF' },
          { icon: 'cash-stack', color: 'success', text: '\u05E1\u05D4\u05F4\u05DB \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD: ' + Utils.formatCurrency(totalPaid), time: '\u05DE\u05E2\u05D5\u05D3\u05DB\u05DF' }
        ];
        if (pendingTasks > 0) activities.splice(3, 0, { icon: 'kanban', color: 'info', text: pendingTasks + ' \u05DE\u05E9\u05D9\u05DE\u05D5\u05EA \u05E4\u05EA\u05D5\u05D7\u05D5\u05EA', time: '\u05D4\u05D9\u05D5\u05DD' });
        if (overdueHW > 0) activities.splice(3, 0, { icon: 'journal-x', color: 'danger', text: overdueHW + ' \u05E9\u05D9\u05E2\u05D5\u05E8\u05D9 \u05D1\u05D9\u05EA \u05D1\u05D0\u05D9\u05D7\u05D5\u05E8', time: '\u05D4\u05D9\u05D5\u05DD' });
      }

      feed.innerHTML = activities.slice(0, 10).map(function(a) {
        return '<div class="d-flex align-items-center gap-3 py-2 border-bottom">' +
          '<div class="avatar avatar-sm" style="background:var(--bht-' + a.color + ',#6c757d)"><i class="bi bi-' + a.icon + '" style="font-size:.8rem"></i></div>' +
          '<div class="flex-grow-1"><span>' + a.text + '</span></div>' +
          '<small class="text-muted">' + a.time + '</small>' +
        '</div>';
      }).join('');
    }

    // === Parasha + Shabbat Times ===
    const parashaEl = document.getElementById('dash-parasha');
    if (parashaEl) {
      parashaEl.textContent = 'פרשת ' + this._getParasha();
      // Approximate Shabbat times for Beit Shemesh (lat ~31.75)
      const fri = new Date();
      fri.setDate(fri.getDate() + (5 - fri.getDay() + 7) % 7); // next Friday
      const sunset = '19:10'; // approximate April sunset Beit Shemesh
      document.getElementById('dash-shabbat').innerHTML = `<i class="bi bi-clock me-1"></i>הדלקת נרות: ${sunset} | צאת שבת: 20:15`;
    }

    // === Daily Schedule (סדר יום) ===
    const routineEl = document.getElementById('daily-routine');
    if (routineEl) {
      const routine = [
        {time:'06:45', name:'שחרית', icon:'bi-sunrise'},
        {time:'07:30', name:'ארוחת בוקר', icon:'bi-cup-hot'},
        {time:'08:00', name:'סדר א\' - גמרא', icon:'bi-book'},
        {time:'09:30', name:'שיעור כללי', icon:'bi-mortarboard'},
        {time:'10:30', name:'הפסקה', icon:'bi-pause-circle'},
        {time:'10:45', name:'סדר ב\' - הלכה', icon:'bi-journal-text'},
        {time:'12:00', name:'מנחה', icon:'bi-sun'},
        {time:'12:30', name:'ארוחת צהריים', icon:'bi-egg-fried'},
        {time:'13:30', name:'סדר ג\' - חזרה', icon:'bi-arrow-repeat'},
        {time:'15:00', name:'שיעורי העשרה', icon:'bi-lightbulb'},
        {time:'16:00', name:'סיום', icon:'bi-door-open'}
      ];
      const now2 = new Date();
      const nowMin = now2.getHours()*60 + now2.getMinutes();
      routineEl.innerHTML = routine.map(r => {
        const [h,m] = r.time.split(':').map(Number);
        const rMin = h*60+m;
        const isCurrent = nowMin >= rMin && nowMin < rMin+60;
        return `<div class="d-flex align-items-center gap-2 py-1 ${isCurrent?'bg-primary bg-opacity-10 rounded px-2 fw-bold':''}">
          <span style="width:45px" class="small ${isCurrent?'text-primary':''}">${r.time}</span>
          <i class="bi ${r.icon} ${isCurrent?'text-primary':'text-muted'}"></i>
          <span>${r.name}</span>
          ${isCurrent?'<span class="badge bg-primary ms-auto">עכשיו</span>':''}
        </div>`;
      }).join('');
    }

    // === 9. AI Insight ===
    const aiEl = document.getElementById('ai-insight');
    if (aiEl) {
      const insights = [];
      if (todayAtt.length > 0) {
        insights.push('\u05D4\u05D9\u05D5\u05DD \u05D9\u05E9 ' + present.length + ' \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05E0\u05D5\u05DB\u05D7\u05D9\u05DD \u05DE\u05EA\u05D5\u05DA ' + todayAtt.length + ' (' + attPct + '%).');
        if (absent.length > 0) insights.push(absent.length + ' \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05D7\u05E1\u05E8\u05D9\u05DD \u05D4\u05D9\u05D5\u05DD.');
        if (attPct >= 90) insights.push('\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05DE\u05E6\u05D5\u05D9\u05E0\u05EA!');
        else if (attPct < 70) insights.push('\u26A0 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05E0\u05DE\u05D5\u05DB\u05D4 \u2014 \u05DB\u05D3\u05D0\u05D9 \u05DC\u05D1\u05D3\u05D5\u05E7.');
      } else {
        insights.push('\u05D8\u05E8\u05DD \u05E0\u05E8\u05E9\u05DE\u05D4 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05DC\u05D4\u05D9\u05D5\u05DD.');
      }
      if (totalDebt > 0) {
        insights.push('\u05D9\u05E9 ' + unpaidFinance.length + ' \u05D7\u05D5\u05D1\u05D5\u05EA \u05E4\u05EA\u05D5\u05D7\u05D9\u05DD \u05D1\u05E1\u05DA ' + Utils.formatCurrency(totalDebt) + '.');
      } else {
        insights.push('\u05D0\u05D9\u05DF \u05D7\u05D5\u05D1\u05D5\u05EA \u05E4\u05EA\u05D5\u05D7\u05D9\u05DD \u2014 \u05DE\u05E6\u05D5\u05D9\u05DF!');
      }
      if (pendingTasks > 0) insights.push(pendingTasks + ' \u05DE\u05E9\u05D9\u05DE\u05D5\u05EA \u05DE\u05DE\u05EA\u05D9\u05E0\u05D5\u05EA \u05DC\u05D8\u05D9\u05E4\u05D5\u05DC.');
      const topClass = Object.entries(classBreakdown).sort(function(a,b) { return b[1]-a[1]; })[0];
      if (topClass) insights.push('\u05D4\u05DB\u05D9\u05EA\u05D4 \u05D4\u05D2\u05D3\u05D5\u05DC\u05D4 \u05D1\u05D9\u05D5\u05EA\u05E8: "' + topClass[0] + '" \u05E2\u05DD ' + topClass[1] + ' \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD.');

      aiEl.innerHTML =
        '<div class="d-flex align-items-start gap-2">' +
          '<i class="bi bi-stars text-info fs-4"></i>' +
          '<div>' + insights.map(function(t) { return '<p class="mb-1">' + t + '</p>'; }).join('') + '</div>' +
        '</div>';
    }
  },
});
