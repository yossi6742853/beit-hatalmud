/* ===== BHT v5.0 — All Page Renderers (30+ pages) ===== */
/* Exact copy of Apps Script version, adapted for GitHub Pages */

const Pages = {

  /* ======================================================================
     DASHBOARD
     ====================================================================== */
  dashboard() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div>
          <h1><i class="bi bi-speedometer2 me-2"></i>לוח בקרה</h1>
          <p>${Utils.dayName()} | ${Utils.formatDate(new Date())}</p>
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
    const [students, staff, finance, attendance, calendar, schedule, tasks, homework] = await Promise.all([
      App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD'),
      App.getData('\u05E6\u05D5\u05D5\u05EA'),
      App.getData('\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3'),
      App.getData('\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA'),
      App.getData('\u05DC\u05D5\u05D7_\u05E9\u05E0\u05D4').catch(() => []),
      App.getData('\u05DE\u05E2\u05E8\u05DB\u05EA_\u05E9\u05E2\u05D5\u05EA').catch(() => []),
      App.getData('\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA').catch(() => []),
      App.getData('\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9_\u05D1\u05D9\u05EA').catch(() => [])
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

  /* ======================================================================
     STUDENTS LIST
     ====================================================================== */
  students() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div><h1><i class="bi bi-people-fill me-2"></i>\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</h1><p id="students-count"></p></div>
        <div class="d-flex gap-2"><button class="btn btn-primary" onclick="Pages.showStudentForm()"><i class="bi bi-plus-lg me-1"></i>\u05D4\u05D5\u05E1\u05E4\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3</button><button class="btn btn-outline-success btn-sm" onclick="Pages.exportStudentsCSV()"><i class="bi bi-download me-1"></i>CSV</button></div>
      </div>
      <div class="card p-3 mb-3"><div class="row g-2 align-items-center">
        <div class="col-md-6"><div class="search-box"><i class="bi bi-search"></i><input type="text" class="form-control" id="students-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05EA\u05DC\u05DE\u05D9\u05D3..."></div></div>
        <div class="col-md-3"><select class="form-select" id="students-class-filter"><option value="">\u05DB\u05DC \u05D4\u05DB\u05D9\u05EA\u05D5\u05EA</option></select></div>
        <div class="col-md-3"><select class="form-select" id="students-status-filter"><option value="">\u05DB\u05DC \u05D4\u05E1\u05D8\u05D8\u05D5\u05E1\u05D9\u05DD</option><option value="\u05E4\u05E2\u05D9\u05DC">\u05E4\u05E2\u05D9\u05DC</option><option value="\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC">\u05DC\u05D0 \u05E4\u05E2\u05D9\u05DC</option></select></div>
      </div></div>
      <div id="students-list">${Utils.skeleton(4)}</div>
      <div class="modal fade" id="student-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
        <div class="modal-header"><h5 class="modal-title" id="student-modal-title">\u05D4\u05D5\u05E1\u05E4\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body">
          <input type="hidden" id="sf-id">
          <div class="mb-3"><label class="form-label">\u05E9\u05DD \u05DE\u05DC\u05D0</label><input type="text" class="form-control" id="sf-name" required></div>
          <div class="row g-3"><div class="col-6"><label class="form-label">\u05DB\u05D9\u05EA\u05D4</label><input type="text" class="form-control" id="sf-class"></div><div class="col-6"><label class="form-label">\u05D8\u05DC\u05E4\u05D5\u05DF</label><input type="tel" class="form-control" id="sf-phone" dir="ltr"></div></div>
          <div class="row g-3 mt-1"><div class="col-6"><label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA \u05DC\u05D9\u05D3\u05D4</label><input type="date" class="form-control" id="sf-birthdate"></div><div class="col-6"><label class="form-label">\u05E1\u05D8\u05D8\u05D5\u05E1</label><select class="form-select" id="sf-status"><option value="\u05E4\u05E2\u05D9\u05DC">\u05E4\u05E2\u05D9\u05DC</option><option value="\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC">\u05DC\u05D0 \u05E4\u05E2\u05D9\u05DC</option></select></div></div>
          <div class="mb-3 mt-3"><label class="form-label">\u05DB\u05EA\u05D5\u05D1\u05EA</label><input type="text" class="form-control" id="sf-address"></div>
        </div>
        <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveStudent()">\u05E9\u05DE\u05D9\u05E8\u05D4</button></div>
      </div></div></div>
    `;
  },
  _studentsData: [],
  async studentsInit() {
    const data = await App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
    this._studentsData = data;
    data.forEach(s => { s._fullName = Utils.fullName(s); s._id = Utils.rowId(s); });
    const classes = [...new Set(data.map(s => s['\u05DB\u05D9\u05EA\u05D4']).filter(Boolean))].sort();
    const classFilter = document.getElementById('students-class-filter');
    classes.forEach(c => { classFilter.insertAdjacentHTML('beforeend', `<option value="${c}">${c}</option>`); });
    const render = () => this.renderStudentsList();
    document.getElementById('students-search').addEventListener('input', Utils.debounce(render, 200));
    document.getElementById('students-class-filter').addEventListener('change', render);
    document.getElementById('students-status-filter').addEventListener('change', render);
    this.renderStudentsList();
  },
  renderStudentsList() {
    const search = (document.getElementById('students-search')?.value || '').trim().toLowerCase();
    const classF = document.getElementById('students-class-filter')?.value || '';
    const statusF = document.getElementById('students-status-filter')?.value || '';
    let filtered = this._studentsData.filter(s => {
      if (search && !(s._fullName || '').toLowerCase().includes(search)) return false;
      if (classF && s['\u05DB\u05D9\u05EA\u05D4'] !== classF) return false;
      if (statusF && s['\u05E1\u05D8\u05D8\u05D5\u05E1'] !== statusF) return false;
      return true;
    });
    document.getElementById('students-count').textContent = `${filtered.length} \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD`;
    if (filtered.length === 0) { document.getElementById('students-list').innerHTML = `<div class="empty-state"><i class="bi bi-search"></i><h5>\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</h5></div>`; return; }
    document.getElementById('students-list').innerHTML = `<div class="row g-3">${filtered.map(s => {
      const name = s._fullName || ''; const cls = s['\u05DB\u05D9\u05EA\u05D4'] || ''; const age = Utils.calcAge(s['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4']);
      return `<div class="col-md-6 col-lg-4"><div class="card card-clickable p-3" onclick="location.hash='student/${s._id}'"><div class="d-flex align-items-center gap-3">${Utils.avatarHTML(name)}<div class="flex-grow-1 min-width-0"><div class="fw-bold text-truncate">${name}</div><small class="text-muted">\u05DB\u05D9\u05EA\u05D4 ${cls}${age ? ' | \u05D2\u05D9\u05DC ' + age : ''}</small></div><div class="d-flex align-items-center gap-2">${Utils.statusBadge(s['\u05E1\u05D8\u05D8\u05D5\u05E1'])}<button class="btn btn-sm btn-outline-danger" onclick="event.stopPropagation();Pages.deleteStudent('${s._id}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button></div></div></div></div>`;
    }).join('')}</div>`;
  },
  showStudentForm(student = null) {
    document.getElementById('student-modal-title').textContent = student ? '\u05E2\u05E8\u05D9\u05DB\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3' : '\u05D4\u05D5\u05E1\u05E4\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3';
    document.getElementById('sf-id').value = student ? Utils.rowId(student) : '';
    document.getElementById('sf-name').value = student ? Utils.fullName(student) : '';
    document.getElementById('sf-class').value = student?.['\u05DB\u05D9\u05EA\u05D4'] || '';
    document.getElementById('sf-phone').value = student?.['\u05D8\u05DC\u05E4\u05D5\u05DF'] || '';
    document.getElementById('sf-birthdate').value = student?.['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4'] || '';
    document.getElementById('sf-status').value = student?.['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '\u05E4\u05E2\u05D9\u05DC';
    document.getElementById('sf-address').value = student?.['\u05DB\u05EA\u05D5\u05D1\u05EA'] || '';
    new bootstrap.Modal(document.getElementById('student-modal')).show();
  },
  async saveStudent() {
    const id = document.getElementById('sf-id').value;
    const fullName = document.getElementById('sf-name').value.trim(); const nameParts = fullName.split(/\s+/); const firstName = nameParts[0]||''; const lastName = nameParts.slice(1).join(' ')||'';
    const row = { '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': firstName, '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': lastName, '\u05DB\u05D9\u05EA\u05D4': document.getElementById('sf-class').value.trim(), '\u05D8\u05DC\u05E4\u05D5\u05DF': document.getElementById('sf-phone').value.trim(), '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': document.getElementById('sf-birthdate').value, '\u05E1\u05D8\u05D8\u05D5\u05E1': document.getElementById('sf-status').value, '\u05DB\u05EA\u05D5\u05D1\u05EA': document.getElementById('sf-address').value.trim() };
    if (!firstName) { Utils.toast('\u05E0\u05D0 \u05DC\u05D4\u05D6\u05D9\u05DF \u05E9\u05DD', 'warning'); return; }
    try {
      if (id) { await App.apiCall('update', '\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD', { id, row }); } else { await App.apiCall('add', '\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD', { row }); }
      bootstrap.Modal.getInstance(document.getElementById('student-modal')).hide();
      Utils.toast(id ? '\u05EA\u05DC\u05DE\u05D9\u05D3 \u05E2\u05D5\u05D3\u05DB\u05DF' : '\u05EA\u05DC\u05DE\u05D9\u05D3 \u05E0\u05D5\u05E1\u05E3', 'success');
      this.studentsInit();
    } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05E9\u05DE\u05D9\u05E8\u05D4', 'danger'); }
  },
  async deleteStudent(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3','\u05D4\u05D0\u05DD \u05DC\u05DE\u05D7\u05D5\u05E7 \u05D0\u05EA \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3?')) return;
    try { await App.apiCall('delete','\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD',{id}); Utils.toast('\u05EA\u05DC\u05DE\u05D9\u05D3 \u05E0\u05DE\u05D7\u05E7'); this.studentsInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },
  exportStudentsCSV() {
    const rows = this._studentsData || [];
    if (!rows.length) { Utils.toast('\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD','warning'); return; }
    let csv = '\uFEFF' + '\u05E9\u05DD,\u05DB\u05D9\u05EA\u05D4,\u05D8\u05DC\u05E4\u05D5\u05DF,\u05E1\u05D8\u05D8\u05D5\u05E1,\u05EA\u05D0\u05E8\u05D9\u05DA \u05DC\u05D9\u05D3\u05D4,\u05DB\u05EA\u05D5\u05D1\u05EA\n';
    rows.forEach(s => { csv += `"${Utils.fullName(s)}","${s['\u05DB\u05D9\u05EA\u05D4']||''}","${s['\u05D8\u05DC\u05E4\u05D5\u05DF']||''}","${s['\u05E1\u05D8\u05D8\u05D5\u05E1']||''}","${s['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4']||''}","${s['\u05DB\u05EA\u05D5\u05D1\u05EA']||''}"\n`; });
    const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'students_'+Utils.todayISO()+'.csv'; link.click();
    Utils.toast('\u05E7\u05D5\u05D1\u05E5 CSV \u05D9\u05D5\u05E6\u05D0');
  },

  /* ======================================================================
     STUDENT CARD (10 tabs)
     ====================================================================== */
  student(id) { return `<div id="student-card-content">${Utils.skeleton(3)}</div>`; },
  async studentInit(id) {
    const students = await App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
    const s = students.find(x => String(Utils.rowId(x)) === String(id) || String(x.id) === String(id));
    if (!s) { document.getElementById('student-card-content').innerHTML = `<div class="empty-state"><i class="bi bi-person-x"></i><h5>\u05EA\u05DC\u05DE\u05D9\u05D3 \u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0</h5><a href="#students" class="btn btn-primary mt-2">\u05D7\u05D6\u05E8\u05D4 \u05DC\u05E8\u05E9\u05D9\u05DE\u05D4</a></div>`; return; }
    const sId = String(Utils.rowId(s)); const name = Utils.fullName(s); const age = Utils.calcAge(s['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4']);
    const phone = s['\u05D8\u05DC\u05E4\u05D5\u05DF'] || '';
    const matchId = r => String(r['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4']||r['\u05EA\u05DC\u05DE\u05D9\u05D3']||'') === sId;
    const matchName = r => (r['\u05E9\u05DD']||r['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3']||r['\u05EA\u05DC\u05DE\u05D9\u05D3']||'') === name;
    const match = r => matchId(r) || matchName(r);

    // Load all data in parallel
    const [attendance, finance, behavior, parents, medical, homework, grades, documents] = await Promise.all([
      App.getData('\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA'),
      App.getData('\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3'),
      App.getData('\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA'),
      App.getData('\u05D4\u05D5\u05E8\u05D9\u05DD').catch(()=>[]),
      App.getData('\u05DE\u05D9\u05D3\u05E2_\u05E8\u05E4\u05D5\u05D0\u05D9').catch(()=>[]),
      App.getData('\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9_\u05D1\u05D9\u05EA').catch(()=>[]),
      App.getData('\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD').catch(()=>[]),
      App.getData('\u05DE\u05E1\u05DE\u05DB\u05D9_\u05EA\u05DC\u05DE\u05D9\u05D3').catch(()=>[])
    ]);

    // Attendance
    const studentAtt = attendance.filter(match);
    const presentCount = studentAtt.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E0\u05D5\u05DB\u05D7').length;
    const attPct = studentAtt.length ? Math.round(presentCount / studentAtt.length * 100) : 0;

    // Finance
    const studentFin = finance.filter(match);
    const sfTotal = studentFin.reduce((t,f)=>t+(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0),0);
    const sfPaid = studentFin.filter(f=>(f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05E9\u05D5\u05DC\u05DD').reduce((t,f)=>t+(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0),0);
    const sfDebt = sfTotal - sfPaid;

    // Behavior
    const studentBeh = (behavior||[]).filter(match);
    const posB = studentBeh.filter(b => (b['\u05E1\u05D5\u05D2']||'') === '\u05D7\u05D9\u05D5\u05D1\u05D9').length;
    const negB = studentBeh.filter(b => (b['\u05E1\u05D5\u05D2']||'') === '\u05E9\u05DC\u05D9\u05DC\u05D9').length;

    // Parents, Medical, Homework, Grades, Documents
    const studentParents = (parents||[]).filter(match);
    const studentMed = (medical||[]).filter(match);
    const studentHW = (homework||[]).filter(match);
    const studentGrades = (grades||[]).filter(match);
    const studentDocs = (documents||[]).filter(match);

    // WhatsApp helper
    const waLink = (ph, text='') => { const num = (ph||'').replace(/\D/g,'').replace(/^0/,'972'); return num ? `https://wa.me/${num}${text?'?text='+encodeURIComponent(text):''}` : '#'; };
    const parentPhone = studentParents.length ? (studentParents[0]['\u05D8\u05DC\u05E4\u05D5\u05DF']||'') : '';
    const primaryPhone = phone || parentPhone;

    document.getElementById('student-card-content').innerHTML = `
      <div class="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
        <a href="#students" class="btn btn-link text-decoration-none"><i class="bi bi-arrow-right me-1"></i>\u05D7\u05D6\u05E8\u05D4 \u05DC\u05E8\u05E9\u05D9\u05DE\u05D4</a>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-primary btn-sm" onclick="Pages.showStudentForm(Pages._studentsData.find(x=>String(Utils.rowId(x))==='${sId}'))"><i class="bi bi-pencil me-1"></i>\u05E2\u05E8\u05D9\u05DB\u05D4</button>
          ${primaryPhone ? `<a href="${waLink(primaryPhone)}" target="_blank" class="btn btn-success btn-sm"><i class="bi bi-whatsapp me-1"></i>WhatsApp</a>` : ''}
          <button class="btn btn-outline-danger btn-sm" onclick="Pages.deleteStudent('${sId}')"><i class="bi bi-trash me-1"></i>\u05DE\u05D7\u05D9\u05E7\u05D4</button>
        </div>
      </div>
      <div class="card overflow-hidden mb-3"><div class="student-header">${Utils.avatarHTML(name, 'xl')}<h3 class="fw-bold mt-2 mb-1">${name}</h3><div>\u05DB\u05D9\u05EA\u05D4 ${s['\u05DB\u05D9\u05EA\u05D4'] || '--'}${age ? ` | \u05D2\u05D9\u05DC ${age}` : ''}</div>${Utils.statusBadge(s['\u05E1\u05D8\u05D8\u05D5\u05E1'])}</div></div>
      <ul class="nav nav-tabs-bht mb-3 flex-nowrap overflow-auto" role="tablist" style="white-space:nowrap">
        <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" href="#tab-info"><i class="bi bi-info-circle me-1"></i>\u05DE\u05D9\u05D3\u05E2</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-parents"><i class="bi bi-people me-1"></i>\u05D4\u05D5\u05E8\u05D9\u05DD</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-att"><i class="bi bi-calendar-check me-1"></i>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-beh"><i class="bi bi-emoji-smile me-1"></i>\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-medical"><i class="bi bi-heart-pulse me-1"></i>\u05E8\u05E4\u05D5\u05D0\u05D9</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-hw"><i class="bi bi-journal-text me-1"></i>\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9 \u05D1\u05D9\u05EA</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-fin"><i class="bi bi-cash-stack me-1"></i>\u05DB\u05E1\u05E4\u05D9\u05DD</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-grades"><i class="bi bi-mortarboard me-1"></i>\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-docs"><i class="bi bi-folder me-1"></i>\u05DE\u05E1\u05DE\u05DB\u05D9\u05DD</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-comm"><i class="bi bi-chat-dots me-1"></i>\u05EA\u05E7\u05E9\u05D5\u05E8\u05EA</a></li>
      </ul>
      <div class="tab-content">

        <!-- 1. \u05DE\u05D9\u05D3\u05E2 -->
        <div class="tab-pane fade show active" id="tab-info"><div class="card p-3"><div class="row g-3">
          <div class="col-sm-6"><label class="form-label text-muted small">\u05E9\u05DD</label><div class="fw-bold">${name}</div></div>
          <div class="col-sm-6"><label class="form-label text-muted small">\u05DB\u05D9\u05EA\u05D4</label><div class="fw-bold">${s['\u05DB\u05D9\u05EA\u05D4'] || '--'}</div></div>
          <div class="col-sm-6"><label class="form-label text-muted small">\u05D8\u05DC\u05E4\u05D5\u05DF</label><div class="fw-bold" dir="ltr">${Utils.formatPhone(phone)}</div></div>
          <div class="col-sm-6"><label class="form-label text-muted small">\u05EA\u05D0\u05E8\u05D9\u05DA \u05DC\u05D9\u05D3\u05D4</label><div class="fw-bold">${Utils.formatDate(s['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4'])}</div></div>
          <div class="col-sm-6"><label class="form-label text-muted small">\u05E1\u05D8\u05D8\u05D5\u05E1</label><div>${Utils.statusBadge(s['\u05E1\u05D8\u05D8\u05D5\u05E1'])}</div></div>
          <div class="col-sm-6"><label class="form-label text-muted small">\u05DB\u05EA\u05D5\u05D1\u05EA</label><div class="fw-bold">${s['\u05DB\u05EA\u05D5\u05D1\u05EA'] || '--'}</div></div>
          ${s['\u05D4\u05E2\u05E8\u05D5\u05EA'] ? `<div class="col-12"><label class="form-label text-muted small">\u05D4\u05E2\u05E8\u05D5\u05EA</label><div>${s['\u05D4\u05E2\u05E8\u05D5\u05EA']}</div></div>` : ''}
        </div></div></div>

        <!-- 2. \u05D4\u05D5\u05E8\u05D9\u05DD -->
        <div class="tab-pane fade" id="tab-parents">${studentParents.length === 0
          ? '<div class="empty-state py-4"><i class="bi bi-people"></i><h6>\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05D4\u05D5\u05E8\u05D9\u05DD \u05DE\u05E9\u05D5\u05D9\u05DB\u05D9\u05DD</h6></div>'
          : `<div class="row g-3">${studentParents.map(p => {
              const pName = ((p['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9']||'') + ' ' + (p['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4']||'')).trim();
              const pPhone = p['\u05D8\u05DC\u05E4\u05D5\u05DF']||'';
              const pEmail = p['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC']||p['email']||'';
              const pRelation = p['\u05E7\u05E8\u05D1\u05D4']||p['\u05E7\u05E9\u05E8']||'';
              return `<div class="col-md-6"><div class="card p-3">
                <div class="d-flex align-items-center gap-3 mb-2">${Utils.avatarHTML(pName||'\u05D4\u05D5\u05E8\u05D4')}<div>
                  <div class="fw-bold">${pName||'\u05DC\u05DC\u05D0 \u05E9\u05DD'}</div>
                  ${pRelation ? `<small class="text-muted">${pRelation}</small>` : ''}
                </div></div>
                ${pPhone ? `<div class="d-flex align-items-center gap-2 mb-1"><i class="bi bi-telephone text-muted"></i><span dir="ltr">${Utils.formatPhone(pPhone)}</span></div>` : ''}
                ${pEmail ? `<div class="d-flex align-items-center gap-2 mb-2"><i class="bi bi-envelope text-muted"></i><span>${pEmail}</span></div>` : ''}
                <div class="d-flex gap-2 mt-2">
                  ${pPhone ? `<a href="${waLink(pPhone, '\u05E9\u05DC\u05D5\u05DD, \u05D0\u05E0\u05D9 \u05E4\u05D5\u05E0\u05D4 \u05DE\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3 \u05D1\u05E0\u05D5\u05D2\u05E2 \u05DC' + name)}" target="_blank" class="btn btn-success btn-sm"><i class="bi bi-whatsapp me-1"></i>WhatsApp</a>` : ''}
                  ${pPhone ? `<a href="tel:${pPhone}" class="btn btn-outline-primary btn-sm"><i class="bi bi-telephone me-1"></i>\u05D4\u05EA\u05E7\u05E9\u05E8</a>` : ''}
                </div>
              </div></div>`;
            }).join('')}</div>`
        }</div>

        <!-- 3. \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA -->
        <div class="tab-pane fade" id="tab-att"><div class="row g-3 mb-3">
          <div class="col-4"><div class="card p-3 text-center"><div class="fs-3 fw-bold text-success">${attPct}%</div><small class="text-muted">\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</small></div></div>
          <div class="col-4"><div class="card p-3 text-center"><div class="fs-3 fw-bold text-primary">${presentCount}</div><small class="text-muted">\u05D9\u05DE\u05D9 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</small></div></div>
          <div class="col-4"><div class="card p-3 text-center"><div class="fs-3 fw-bold text-danger">${studentAtt.length - presentCount}</div><small class="text-muted">\u05D7\u05D9\u05E1\u05D5\u05E8\u05D9\u05DD</small></div></div>
        </div>${studentAtt.length === 0 ? '<div class="text-muted text-center py-3">\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</div>' :
        `<div class="card"><table class="table table-bht mb-0"><thead><tr><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th><th>\u05D4\u05E2\u05E8\u05D4</th></tr></thead><tbody>${studentAtt.slice(-15).reverse().map(a => `<tr><td>${Utils.formatDateShort(a['\u05EA\u05D0\u05E8\u05D9\u05DA'])}</td><td>${a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E0\u05D5\u05DB\u05D7' ? '<span class="badge bg-success">\u05E0\u05D5\u05DB\u05D7</span>' : a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D0\u05D9\u05D7\u05D5\u05E8' ? '<span class="badge bg-warning text-dark">\u05D0\u05D9\u05D7\u05D5\u05E8</span>' : '<span class="badge bg-danger">\u05D7\u05D9\u05E1\u05D5\u05E8</span>'}</td><td class="text-muted small">${a['\u05D4\u05E2\u05E8\u05D4']||''}</td></tr>`).join('')}</tbody></table></div>`}</div>

        <!-- 4. \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA -->
        <div class="tab-pane fade" id="tab-beh"><div class="d-flex gap-3 mb-3"><span class="badge bg-success p-2"><i class="bi bi-hand-thumbs-up me-1"></i>+${posB} \u05D7\u05D9\u05D5\u05D1\u05D9</span><span class="badge bg-danger p-2"><i class="bi bi-hand-thumbs-down me-1"></i>-${negB} \u05E9\u05DC\u05D9\u05DC\u05D9</span><span class="badge bg-secondary p-2">\u05E1\u05D4"\u05DB ${studentBeh.length}</span></div>
          ${studentBeh.length === 0 ? '<div class="text-muted text-center">\u05D0\u05D9\u05DF \u05D3\u05D9\u05D5\u05D5\u05D7\u05D9 \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</div>' :
          `<div class="card"><table class="table table-sm mb-0"><thead><tr><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05E1\u05D5\u05D2</th><th>\u05EA\u05D9\u05D0\u05D5\u05E8</th><th>\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA</th></tr></thead><tbody>${studentBeh.slice(-15).reverse().map(b => `<tr><td>${Utils.formatDateShort(b['\u05EA\u05D0\u05E8\u05D9\u05DA'])}</td><td><span class="badge bg-${b['\u05E1\u05D5\u05D2']==='\u05D7\u05D9\u05D5\u05D1\u05D9'?'success':'danger'}">${b['\u05E1\u05D5\u05D2']||''}</span></td><td>${b['\u05EA\u05D9\u05D0\u05D5\u05E8']||''}</td><td class="text-muted small">${b['\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA']||b['points']||''}</td></tr>`).join('')}</tbody></table></div>`}</div>

        <!-- 5. \u05E8\u05E4\u05D5\u05D0\u05D9 -->
        <div class="tab-pane fade" id="tab-medical">${studentMed.length === 0
          ? '<div class="empty-state py-4"><i class="bi bi-heart-pulse"></i><h6>\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0 \u05DE\u05D9\u05D3\u05E2 \u05E8\u05E4\u05D5\u05D0\u05D9</h6></div>'
          : `<div class="row g-3">${studentMed.map(m => `<div class="col-12"><div class="card p-3">
              <div class="row g-3">
                ${m['\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA']||m['allergies'] ? `<div class="col-sm-6"><div class="d-flex align-items-start gap-2"><i class="bi bi-exclamation-triangle text-warning fs-5"></i><div><label class="form-label text-muted small mb-0">\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA</label><div class="fw-bold">${m['\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA']||m['allergies']}</div></div></div></div>` : ''}
                ${m['\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA']||m['medications'] ? `<div class="col-sm-6"><div class="d-flex align-items-start gap-2"><i class="bi bi-capsule text-primary fs-5"></i><div><label class="form-label text-muted small mb-0">\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA</label><div class="fw-bold">${m['\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA']||m['medications']}</div></div></div></div>` : ''}
                ${m['\u05DE\u05D2\u05D1\u05DC\u05D5\u05EA']||m['limitations'] ? `<div class="col-sm-6"><div class="d-flex align-items-start gap-2"><i class="bi bi-shield-exclamation text-danger fs-5"></i><div><label class="form-label text-muted small mb-0">\u05DE\u05D2\u05D1\u05DC\u05D5\u05EA</label><div class="fw-bold">${m['\u05DE\u05D2\u05D1\u05DC\u05D5\u05EA']||m['limitations']}</div></div></div></div>` : ''}
                ${m['\u05E7\u05D5\u05E4\u05EA_\u05D7\u05D5\u05DC\u05D9\u05DD']||m['insurance'] ? `<div class="col-sm-6"><div class="d-flex align-items-start gap-2"><i class="bi bi-hospital text-info fs-5"></i><div><label class="form-label text-muted small mb-0">\u05E7\u05D5\u05E4\u05EA \u05D7\u05D5\u05DC\u05D9\u05DD</label><div class="fw-bold">${m['\u05E7\u05D5\u05E4\u05EA_\u05D7\u05D5\u05DC\u05D9\u05DD']||m['insurance']}</div></div></div></div>` : ''}
                ${m['\u05D4\u05E2\u05E8\u05D5\u05EA']||m['notes'] ? `<div class="col-12"><label class="form-label text-muted small">\u05D4\u05E2\u05E8\u05D5\u05EA</label><div>${m['\u05D4\u05E2\u05E8\u05D5\u05EA']||m['notes']}</div></div>` : ''}
              </div>
            </div></div>`).join('')}</div>`
        }</div>

        <!-- 6. \u05E9\u05D9\u05E2\u05D5\u05E8\u05D9 \u05D1\u05D9\u05EA -->
        <div class="tab-pane fade" id="tab-hw">${studentHW.length === 0
          ? '<div class="empty-state py-4"><i class="bi bi-journal-text"></i><h6>\u05D0\u05D9\u05DF \u05E9\u05D9\u05E2\u05D5\u05E8\u05D9 \u05D1\u05D9\u05EA</h6></div>'
          : `<div class="row g-3">${studentHW.slice(-15).reverse().map(hw => {
              const hwStatus = hw['\u05E1\u05D8\u05D8\u05D5\u05E1']||'';
              const statusColor = hwStatus === '\u05D4\u05D5\u05D2\u05E9' ? 'success' : hwStatus === '\u05D7\u05E1\u05E8' ? 'danger' : hwStatus === '\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8' ? 'warning' : 'secondary';
              return `<div class="col-md-6"><div class="card p-3">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <div><div class="fw-bold">${hw['\u05E0\u05D5\u05E9\u05D0']||hw['\u05DE\u05E7\u05E6\u05D5\u05E2']||hw['subject']||'\u05E9\u05D9\u05E2\u05D5\u05E8'}</div>
                  <small class="text-muted">${Utils.formatDateShort(hw['\u05EA\u05D0\u05E8\u05D9\u05DA']||hw['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4']||'')}</small></div>
                  <span class="badge bg-${statusColor}">${hwStatus||'\u05DC\u05D0 \u05D9\u05D3\u05D5\u05E2'}</span>
                </div>
                ${hw['\u05EA\u05D9\u05D0\u05D5\u05E8']||hw['description']||'' ? `<div class="text-muted small">${hw['\u05EA\u05D9\u05D0\u05D5\u05E8']||hw['description']||''}</div>` : ''}
                ${hw['\u05E6\u05D9\u05D5\u05DF']||hw['grade']||'' ? `<div class="mt-1"><span class="badge bg-info">\u05E6\u05D9\u05D5\u05DF: ${hw['\u05E6\u05D9\u05D5\u05DF']||hw['grade']}</span></div>` : ''}
              </div></div>`;
            }).join('')}</div>`
        }</div>

        <!-- 7. \u05DB\u05E1\u05E4\u05D9\u05DD -->
        <div class="tab-pane fade" id="tab-fin"><div class="card p-3"><div class="row g-3 text-center mb-3">
          <div class="col-4"><div class="fs-5 fw-bold">${Utils.formatCurrency(sfTotal || 0)}</div><small class="text-muted">\u05E1\u05D4"\u05DB</small></div>
          <div class="col-4"><div class="fs-5 fw-bold text-success">${Utils.formatCurrency(sfPaid || 0)}</div><small class="text-muted">\u05E9\u05D5\u05DC\u05DD</small></div>
          <div class="col-4"><div class="fs-5 fw-bold text-danger">${Utils.formatCurrency(sfDebt || 0)}</div><small class="text-muted">\u05D9\u05EA\u05E8\u05D4</small></div>
        </div>${sfTotal ? `<div class="finance-progress"><div class="finance-progress-bar bg-success" style="width:${Math.round((sfPaid||0)/(sfTotal||1)*100)}%"></div></div><small class="text-muted mt-1 d-block">${Math.round((sfPaid||0)/(sfTotal||1)*100)}% \u05E9\u05D5\u05DC\u05DD</small>` : '<div class="text-muted text-center">\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9 \u05DB\u05E1\u05E4\u05D9\u05DD</div>'}
        ${studentFin.length > 0 ? `<hr><table class="table table-sm mb-0"><thead><tr><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05EA\u05D9\u05D0\u05D5\u05E8</th><th>\u05E1\u05DB\u05D5\u05DD</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th></tr></thead><tbody>${studentFin.slice(-10).reverse().map(f => `<tr><td>${Utils.formatDateShort(f['\u05EA\u05D0\u05E8\u05D9\u05DA']||'')}</td><td>${f['\u05EA\u05D9\u05D0\u05D5\u05E8']||f['\u05E4\u05D9\u05E8\u05D5\u05D8']||''}</td><td>${Utils.formatCurrency(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0)}</td><td><span class="badge bg-${(f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')=== '\u05E9\u05D5\u05DC\u05DD'?'success':'danger'}">${f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'\u05DC\u05D0 \u05E9\u05D5\u05DC\u05DD'}</span></td></tr>`).join('')}</tbody></table>` : ''}
        </div></div>

        <!-- 8. \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD -->
        <div class="tab-pane fade" id="tab-grades">${studentGrades.length === 0
          ? '<div class="empty-state py-4"><i class="bi bi-mortarboard"></i><h6>\u05D0\u05D9\u05DF \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD</h6></div>'
          : `<div class="card"><table class="table table-bht mb-0"><thead><tr><th>\u05DE\u05E7\u05E6\u05D5\u05E2</th><th>\u05DE\u05D1\u05D7\u05DF</th><th>\u05E6\u05D9\u05D5\u05DF</th><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th></tr></thead><tbody>${studentGrades.slice(-15).reverse().map(g => {
              const grade = Number(g['\u05E6\u05D9\u05D5\u05DF']||g['grade']||0);
              const gradeColor = grade >= 80 ? 'success' : grade >= 60 ? 'warning' : 'danger';
              return `<tr><td>${g['\u05DE\u05E7\u05E6\u05D5\u05E2']||g['subject']||''}</td><td>${g['\u05DE\u05D1\u05D7\u05DF']||g['exam']||''}</td><td><span class="badge bg-${gradeColor} fs-6">${grade}</span></td><td>${Utils.formatDateShort(g['\u05EA\u05D0\u05E8\u05D9\u05DA']||'')}</td></tr>`;
            }).join('')}</tbody></table></div>
          ${studentGrades.length >= 2 ? `<div class="card p-3 mt-3"><div class="d-flex justify-content-around text-center">
            <div><div class="fs-4 fw-bold text-primary">${Math.round(studentGrades.reduce((sm,g)=>sm+(Number(g['\u05E6\u05D9\u05D5\u05DF']||g['grade']||0)),0)/studentGrades.length)}</div><small class="text-muted">\u05DE\u05DE\u05D5\u05E6\u05E2</small></div>
            <div><div class="fs-4 fw-bold text-success">${Math.max(...studentGrades.map(g=>Number(g['\u05E6\u05D9\u05D5\u05DF']||g['grade']||0)))}</div><small class="text-muted">\u05D2\u05D1\u05D5\u05D4 \u05D1\u05D9\u05D5\u05EA\u05E8</small></div>
            <div><div class="fs-4 fw-bold text-danger">${Math.min(...studentGrades.map(g=>Number(g['\u05E6\u05D9\u05D5\u05DF']||g['grade']||0)))}</div><small class="text-muted">\u05E0\u05DE\u05D5\u05DA \u05D1\u05D9\u05D5\u05EA\u05E8</small></div>
            <div><div class="fs-4 fw-bold">${studentGrades.length}</div><small class="text-muted">\u05DE\u05D1\u05D7\u05E0\u05D9\u05DD</small></div>
          </div></div>` : ''}`
        }</div>

        <!-- 9. \u05DE\u05E1\u05DE\u05DB\u05D9\u05DD -->
        <div class="tab-pane fade" id="tab-docs">${studentDocs.length === 0
          ? '<div class="empty-state py-4"><i class="bi bi-folder"></i><h6>\u05D0\u05D9\u05DF \u05DE\u05E1\u05DE\u05DB\u05D9\u05DD</h6></div>'
          : `<div class="list-group">${studentDocs.map(d => {
              const docStatus = d['\u05E1\u05D8\u05D8\u05D5\u05E1']||d['status']||'';
              const isOk = docStatus === '\u05D4\u05D5\u05D2\u05E9' || docStatus === '\u05EA\u05E7\u05D9\u05DF' || docStatus === 'ok';
              return `<div class="list-group-item d-flex align-items-center gap-3">
                <i class="bi bi-${isOk ? 'check-circle-fill text-success' : 'circle text-muted'} fs-5"></i>
                <div class="flex-grow-1">
                  <div class="fw-bold">${d['\u05E9\u05DD_\u05DE\u05E1\u05DE\u05DA']||d['\u05E1\u05D5\u05D2']||d['name']||'\u05DE\u05E1\u05DE\u05DA'}</div>
                  ${d['\u05D4\u05E2\u05E8\u05D5\u05EA']||d['notes']||'' ? `<small class="text-muted">${d['\u05D4\u05E2\u05E8\u05D5\u05EA']||d['notes']}</small>` : ''}
                </div>
                <span class="badge bg-${isOk ? 'success' : 'warning'}">${docStatus||'\u05D7\u05E1\u05E8'}</span>
              </div>`;
            }).join('')}</div>`
        }</div>

        <!-- 10. \u05EA\u05E7\u05E9\u05D5\u05E8\u05EA -->
        <div class="tab-pane fade" id="tab-comm"><div class="card p-3">
          <h6 class="fw-bold mb-3"><i class="bi bi-chat-dots me-2"></i>\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA \u05EA\u05E7\u05E9\u05D5\u05E8\u05EA</h6>
          <div class="row g-3">
            ${primaryPhone ? `<div class="col-sm-6"><a href="${waLink(primaryPhone, '\u05E9\u05DC\u05D5\u05DD, \u05D0\u05E0\u05D9 \u05E4\u05D5\u05E0\u05D4 \u05DE\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3 \u05D1\u05E0\u05D5\u05D2\u05E2 \u05DC' + name)}" target="_blank" class="btn btn-success w-100 py-3"><i class="bi bi-whatsapp fs-4 d-block mb-1"></i>WhatsApp \u05DC\u05EA\u05DC\u05DE\u05D9\u05D3</a></div>` : ''}
            ${parentPhone && parentPhone !== phone ? `<div class="col-sm-6"><a href="${waLink(parentPhone, '\u05E9\u05DC\u05D5\u05DD, \u05D0\u05E0\u05D9 \u05E4\u05D5\u05E0\u05D4 \u05DE\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3 \u05D1\u05E0\u05D5\u05D2\u05E2 \u05DC' + name)}" target="_blank" class="btn btn-success w-100 py-3"><i class="bi bi-whatsapp fs-4 d-block mb-1"></i>WhatsApp \u05DC\u05D4\u05D5\u05E8\u05D9\u05DD</a></div>` : ''}
            ${primaryPhone ? `<div class="col-sm-6"><a href="tel:${primaryPhone}" class="btn btn-outline-primary w-100 py-3"><i class="bi bi-telephone fs-4 d-block mb-1"></i>\u05D4\u05EA\u05E7\u05E9\u05E8 \u05DC\u05EA\u05DC\u05DE\u05D9\u05D3</a></div>` : ''}
            ${parentPhone && parentPhone !== phone ? `<div class="col-sm-6"><a href="tel:${parentPhone}" class="btn btn-outline-primary w-100 py-3"><i class="bi bi-telephone fs-4 d-block mb-1"></i>\u05D4\u05EA\u05E7\u05E9\u05E8 \u05DC\u05D4\u05D5\u05E8\u05D9\u05DD</a></div>` : ''}
          </div>
          ${!primaryPhone && !parentPhone ? '<div class="text-muted text-center py-3">\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05E4\u05E8\u05D8\u05D9 \u05D9\u05E6\u05D9\u05E8\u05EA \u05E7\u05E9\u05E8</div>' : ''}
          ${studentParents.length > 0 ? `<hr><h6 class="fw-bold mb-2">\u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8</h6><div class="list-group">${studentParents.map(p => {
            const pName = ((p['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9']||'') + ' ' + (p['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4']||'')).trim();
            const pPh = p['\u05D8\u05DC\u05E4\u05D5\u05DF']||'';
            return `<div class="list-group-item d-flex align-items-center justify-content-between">
              <div><strong>${pName||'\u05D4\u05D5\u05E8\u05D4'}</strong> ${p['\u05E7\u05E8\u05D1\u05D4']||p['\u05E7\u05E9\u05E8']||''}<br><small class="text-muted" dir="ltr">${Utils.formatPhone(pPh)}</small></div>
              <div class="d-flex gap-2">
                ${pPh ? `<a href="${waLink(pPh)}" target="_blank" class="btn btn-sm btn-success"><i class="bi bi-whatsapp"></i></a>` : ''}
                ${pPh ? `<a href="tel:${pPh}" class="btn btn-sm btn-outline-primary"><i class="bi bi-telephone"></i></a>` : ''}
              </div>
            </div>`;
          }).join('')}</div>` : ''}
        </div></div>

      </div>
    `;
  },

  /* ======================================================================
     ATTENDANCE
     ====================================================================== */
  attendance() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div><h1><i class="bi bi-calendar-check-fill me-2"></i>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</h1><p>${Utils.dayName()} | ${Utils.formatDate(new Date())}</p></div>
        <button class="btn btn-success" onclick="Pages.saveAttendance()"><i class="bi bi-check-lg me-1"></i>\u05E9\u05DE\u05D5\u05E8 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</button>
      </div>
      <div class="card p-3 mb-3"><div class="row g-2 align-items-center">
        <div class="col-md-4"><div class="search-box"><i class="bi bi-search"></i><input type="text" class="form-control" id="att-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9..."></div></div>
        <div class="col-md-3"><input type="date" class="form-control" id="att-date" value="${Utils.todayISO()}"></div>
        <div class="col-md-5 d-flex gap-2 flex-wrap">
          <button class="btn btn-outline-success btn-sm" onclick="Pages.markAll('present')"><i class="bi bi-check-all me-1"></i>\u05D4\u05DB\u05DC \u05E0\u05D5\u05DB\u05D7\u05D9\u05DD</button>
          <button class="btn btn-outline-danger btn-sm" onclick="Pages.markAll('absent')"><i class="bi bi-x-circle me-1"></i>\u05D4\u05DB\u05DC \u05D7\u05E1\u05E8\u05D9\u05DD</button>
          <button class="btn btn-outline-info btn-sm" onclick="Pages.copyAttSummary()"><i class="bi bi-clipboard me-1"></i>\u05D4\u05E2\u05EA\u05E7</button>
          <button class="btn btn-outline-secondary btn-sm" onclick="Pages.printAttendance()"><i class="bi bi-printer me-1"></i>\u05D4\u05D3\u05E4\u05E1</button>
          <span class="badge bg-secondary align-self-center" title="\u05E7\u05D9\u05E6\u05D5\u05E8\u05D9 \u05DE\u05E7\u05DC\u05D3\u05EA">P/A/L</span>
        </div>
      </div></div>
      <div class="card p-2 mb-3"><div class="d-flex gap-3 justify-content-center py-2">
        <span class="badge bg-success">\u05E0\u05D5\u05DB\u05D7\u05D9\u05DD: <strong id="att-present">0</strong></span>
        <span class="badge bg-danger">\u05D7\u05E1\u05E8\u05D9\u05DD: <strong id="att-absent">0</strong></span>
        <span class="badge bg-warning text-dark">\u05D0\u05D9\u05D7\u05D5\u05E8: <strong id="att-late">0</strong></span>
      </div></div>
      <div id="att-list">${Utils.skeleton(5)}</div>
    `;
  },
  _attState: {}, _attStudents: [], _attListenersAdded: false,
  async attendanceInit() {
    const students = await App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
    const active = students.filter(s => (s['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') !== '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC');
    active.forEach(s => { s._fullName = Utils.fullName(s); s._id = Utils.rowId(s); });
    this._attStudents = active;
    const attendance = await App.getData('\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA');
    const today = document.getElementById('att-date').value;
    this._attState = {};
    active.forEach(s => {
      const sId = s._id; const sName = s._fullName;
      const existing = attendance.find(a => (String(a['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4']||'')===String(sId) || (a['\u05E9\u05DD']||a['\u05EA\u05DC\u05DE\u05D9\u05D3']||'')===sName) && a['\u05EA\u05D0\u05E8\u05D9\u05DA'] === today);
      this._attState[s._id] = existing ? (existing['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E0\u05D5\u05DB\u05D7' ? 'present' : existing['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D7\u05D9\u05E1\u05D5\u05E8' ? 'absent' : 'late') : '';
    });
    if (!this._attListenersAdded) {
      this._attListenersAdded = true;
      document.getElementById('att-search').addEventListener('input', Utils.debounce(() => this.renderAttList(), 200));
      document.getElementById('att-date').addEventListener('change', () => this.attendanceInit());
    }
    this.renderAttList();
    this.bindAttKeyboard();
  },
  renderAttList() {
    const search = (document.getElementById('att-search')?.value || '').trim().toLowerCase();
    const filtered = this._attStudents.filter(s => !search || (s._fullName || '').toLowerCase().includes(search));
    const html = filtered.map((s, i) => {
      const name = s._fullName; const sid = s._id; const state = this._attState[sid] || '';
      return `<div class="d-flex align-items-center gap-3 p-3 border-bottom att-row" data-id="${sid}">${Utils.avatarHTML(name)}<div class="flex-grow-1"><div class="fw-bold">${name}</div><small class="text-muted">\u05DB\u05D9\u05EA\u05D4 ${s['\u05DB\u05D9\u05EA\u05D4'] || '--'}</small></div><div class="d-flex gap-2"><div class="att-btn ${state==='present'?'present selected':''}" onclick="Pages.toggleAtt('${sid}','present')" title="\u05E0\u05D5\u05DB\u05D7 (P)"><i class="bi bi-check-lg"></i></div><div class="att-btn ${state==='absent'?'absent selected':''}" onclick="Pages.toggleAtt('${sid}','absent')" title="\u05D7\u05D9\u05E1\u05D5\u05E8 (A)"><i class="bi bi-x-lg"></i></div><div class="att-btn ${state==='late'?'late selected':''}" onclick="Pages.toggleAtt('${sid}','late')" title="\u05D0\u05D9\u05D7\u05D5\u05E8 (L)"><i class="bi bi-clock"></i></div></div></div>`;
    }).join('');
    document.getElementById('att-list').innerHTML = `<div class="card">${html}</div>`;
    this.updateAttSummary();
  },
  toggleAtt(id, status) { this._attState[String(id)] = this._attState[String(id)] === status ? '' : status; this.renderAttList(); },
  markAll(status) { this._attStudents.forEach(s => { this._attState[s._id] = status; }); this.renderAttList(); },
  updateAttSummary() {
    const vals = Object.values(this._attState);
    document.getElementById('att-present').textContent = vals.filter(v => v === 'present').length;
    document.getElementById('att-absent').textContent = vals.filter(v => v === 'absent').length;
    document.getElementById('att-late').textContent = vals.filter(v => v === 'late').length;
  },
  async saveAttendance() {
    const date = document.getElementById('att-date').value;
    const statusMap = { present: '\u05E0\u05D5\u05DB\u05D7', absent: '\u05D7\u05D9\u05E1\u05D5\u05E8', late: '\u05D0\u05D9\u05D7\u05D5\u05E8' };
    const rows = [];
    this._attStudents.forEach(s => { const st = this._attState[s._id]; if (st) rows.push({ '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': s._id, '\u05E9\u05DD': s._fullName, '\u05DB\u05D9\u05EA\u05D4': s['\u05DB\u05D9\u05EA\u05D4']||'', '\u05EA\u05D0\u05E8\u05D9\u05DA': date, '\u05E1\u05D8\u05D8\u05D5\u05E1': statusMap[st] }); });
    if (rows.length === 0) { Utils.toast('\u05DC\u05D0 \u05E1\u05D5\u05DE\u05E0\u05D5 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD', 'warning'); return; }
    try { await App.apiCall('bulkAdd', '\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA', { rows }); Utils.toast(`\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05E0\u05E9\u05DE\u05E8\u05D4: ${rows.length} \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD`, 'success'); } catch(e) { localStorage.setItem('bht_att_' + date, JSON.stringify(rows)); Utils.toast('\u05E0\u05E9\u05DE\u05E8 \u05DE\u05E7\u05D5\u05DE\u05D9\u05EA', 'info'); }
  },
  _attKeyListener: null,
  bindAttKeyboard() {
    if (this._attKeyListener) document.removeEventListener('keydown', this._attKeyListener);
    this._attKeyListener = (e) => {
      if (App.currentPage !== 'attendance') return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const rows = document.querySelectorAll('.att-row');
      const hovered = document.querySelector('.att-row:hover');
      if (!hovered) return;
      const id = hovered.dataset.id;
      if (!id) return;
      if (e.key === 'p' || e.key === 'P' || e.key === '\u05E0') this.toggleAtt(id, 'present');
      if (e.key === 'a' || e.key === 'A' || e.key === '\u05D7') this.toggleAtt(id, 'absent');
      if (e.key === 'l' || e.key === 'L' || e.key === '\u05D0') this.toggleAtt(id, 'late');
    };
    document.addEventListener('keydown', this._attKeyListener);
  },
  copyAttSummary() {
    const vals = Object.values(this._attState);
    const p = vals.filter(v => v === 'present').length;
    const a = vals.filter(v => v === 'absent').length;
    const l = vals.filter(v => v === 'late').length;
    const date = document.getElementById('att-date').value;
    const absentNames = this._attStudents.filter(s => this._attState[s._id] === 'absent').map(s => s._fullName);
    let text = `\u05E1\u05D9\u05DB\u05D5\u05DD \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA ${date}\n\u05E0\u05D5\u05DB\u05D7\u05D9\u05DD: ${p} | \u05D7\u05E1\u05E8\u05D9\u05DD: ${a} | \u05D0\u05D9\u05D7\u05D5\u05E8: ${l}`;
    if (absentNames.length) text += '\n\u05D7\u05E1\u05E8\u05D9\u05DD: ' + absentNames.join(', ');
    navigator.clipboard.writeText(text).then(() => Utils.toast('\u05D4\u05D5\u05E2\u05EA\u05E7 \u05DC\u05DC\u05D5\u05D7')).catch(() => Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05D4\u05E2\u05EA\u05E7\u05D4','danger'));
  },
  printAttendance() {
    const win = window.open('','','width=800,height=600');
    const date = document.getElementById('att-date').value;
    const rows = this._attStudents.map(s => {
      const st = this._attState[s._id] || '';
      const label = st === 'present' ? '\u05E0\u05D5\u05DB\u05D7' : st === 'absent' ? '\u05D7\u05E1\u05E8' : st === 'late' ? '\u05D0\u05D9\u05D7\u05D5\u05E8' : '--';
      return `<tr><td>${s._fullName}</td><td>${s['\u05DB\u05D9\u05EA\u05D4']||''}</td><td>${label}</td></tr>`;
    }).join('');
    win.document.write(`<html dir="rtl"><head><title>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA ${date}</title><style>body{font-family:Heebo,sans-serif}table{width:100%;border-collapse:collapse}td,th{border:1px solid #ddd;padding:8px;text-align:right}th{background:#f5f5f5}</style></head><body><h2>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA - ${date}</h2><table><thead><tr><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th>\u05DB\u05D9\u05EA\u05D4</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th></tr></thead><tbody>${rows}</tbody></table></body></html>`);
    win.document.close();
    win.print();
  },

  /* ======================================================================
     ATTENDANCE MONTHLY
     ====================================================================== */
  attendance_monthly() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div><h1><i class="bi bi-calendar-month me-2"></i>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D7\u05D5\u05D3\u05E9\u05D9\u05EA</h1></div>
        <div class="d-flex gap-2"><input type="month" class="form-control form-control-sm" id="attm-month" style="width:180px"><button class="btn btn-outline-secondary btn-sm" onclick="Pages.loadAttMonthly()"><i class="bi bi-arrow-clockwise"></i></button></div>
      </div>
      <div class="row g-3 mb-3">
        <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-success" id="attm-pct">--</div><small>\u05D0\u05D7\u05D5\u05D6 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</small></div></div>
        <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold" id="attm-days">--</div><small>\u05D9\u05DE\u05D9 \u05DC\u05D9\u05DE\u05D5\u05D3</small></div></div>
        <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-primary" id="attm-students">--</div><small>\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</small></div></div>
        <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-danger" id="attm-absent">--</div><small>\u05D7\u05D9\u05E1\u05D5\u05E8\u05D9\u05DD</small></div></div>
      </div>
      <div id="attm-table">${Utils.skeleton(3)}</div>
    `;
  },
  _attmListenersAdded: false,
  async attendance_monthlyInit() {
    const d = new Date(); document.getElementById('attm-month').value = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    if (!this._attmListenersAdded) {
      this._attmListenersAdded = true;
      document.getElementById('attm-month').addEventListener('change', () => this.loadAttMonthly());
    }
    this.loadAttMonthly();
  },
  async loadAttMonthly() {
    const month = document.getElementById('attm-month').value; if (!month) return;
    const att = await App.getData('\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA');
    const monthAtt = att.filter(a => (a['\u05EA\u05D0\u05E8\u05D9\u05DA']||'').startsWith(month));
    const students = [...new Set(monthAtt.map(a => a['\u05E9\u05DD']||a['\u05EA\u05DC\u05DE\u05D9\u05D3']||''))];
    const days = [...new Set(monthAtt.map(a => a['\u05EA\u05D0\u05E8\u05D9\u05DA']))].sort();
    const present = monthAtt.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E0\u05D5\u05DB\u05D7').length;
    const absentC = monthAtt.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D7\u05D9\u05E1\u05D5\u05E8').length;
    document.getElementById('attm-pct').textContent = monthAtt.length ? Math.round(present/monthAtt.length*100)+'%' : '--';
    document.getElementById('attm-days').textContent = days.length;
    document.getElementById('attm-students').textContent = students.length;
    document.getElementById('attm-absent').textContent = absentC;
    if (!students.length) { document.getElementById('attm-table').innerHTML = '<div class="text-muted text-center py-3">\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05DC\u05D7\u05D5\u05D3\u05E9 \u05D6\u05D4</div>'; return; }
    let html = '<div class="card table-responsive"><table class="table table-sm table-bht mb-0"><thead><tr><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th>';
    days.forEach(d => { html += `<th class="text-center" style="font-size:10px">${d.substring(8)}</th>`; });
    html += '<th>\u05D0\u05D7\u05D5\u05D6</th></tr></thead><tbody>';
    students.forEach(st => {
      html += `<tr><td class="fw-bold small">${st}</td>`;
      let pCnt = 0;
      days.forEach(d => {
        const rec = monthAtt.find(a => (a['\u05E9\u05DD']||a['\u05EA\u05DC\u05DE\u05D9\u05D3']||'')===st && a['\u05EA\u05D0\u05E8\u05D9\u05DA']===d);
        const s = rec ? rec['\u05E1\u05D8\u05D8\u05D5\u05E1'] : '';
        if (s === '\u05E0\u05D5\u05DB\u05D7') pCnt++;
        const cls = s==='\u05E0\u05D5\u05DB\u05D7' ? 'bg-success' : s==='\u05D7\u05D9\u05E1\u05D5\u05E8' ? 'bg-danger' : s==='\u05D0\u05D9\u05D7\u05D5\u05E8' ? 'bg-warning' : '';
        html += `<td class="text-center">${cls ? `<span class="badge ${cls}" style="font-size:8px;width:16px;height:16px;display:inline-block;border-radius:50%"></span>` : '-'}</td>`;
      });
      const pct = days.length ? Math.round(pCnt/days.length*100) : 0;
      html += `<td class="fw-bold ${pct>=80?'text-success':pct>=60?'text-warning':'text-danger'}">${pct}%</td></tr>`;
    });
    html += '</tbody></table></div>';
    document.getElementById('attm-table').innerHTML = html;
  },

  /* ======================================================================
     STAFF
     ====================================================================== */
  staff() {
    return `<div class="page-header"><h1><i class="bi bi-person-badge-fill me-2"></i>\u05E6\u05D5\u05D5\u05EA</h1><p id="staff-count"></p></div><div class="card p-3 mb-3"><div class="search-box"><i class="bi bi-search"></i><input type="text" class="form-control" id="staff-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05D0\u05D9\u05E9 \u05E6\u05D5\u05D5\u05EA..."></div></div><div id="staff-list">${Utils.skeleton(3)}</div>`;
  },
  _staffData: [],
  async staffInit() {
    const data = await App.getData('\u05E6\u05D5\u05D5\u05EA'); this._staffData = data;
    document.getElementById('staff-search').addEventListener('input', Utils.debounce(() => this.renderStaffList(), 200));
    this.renderStaffList();
  },
  renderStaffList() {
    const search = (document.getElementById('staff-search')?.value || '').trim().toLowerCase();
    const filtered = (this._staffData || []).filter(s => !search || (Utils.fullName(s)).toLowerCase().includes(search));
    document.getElementById('staff-count').textContent = `${filtered.length} \u05D0\u05E0\u05E9\u05D9 \u05E6\u05D5\u05D5\u05EA`;
    if (filtered.length === 0) { document.getElementById('staff-list').innerHTML = `<div class="empty-state"><i class="bi bi-person-badge"></i><h5>\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5</h5></div>`; return; }
    document.getElementById('staff-list').innerHTML = `<div class="row g-3">${filtered.map(s => {
      const name = Utils.fullName(s); const role = s['\u05EA\u05E4\u05E7\u05D9\u05D3'] || ''; const phone = s['\u05D8\u05DC\u05E4\u05D5\u05DF'] || ''; const sid = Utils.rowId(s);
      return `<div class="col-md-6 col-lg-4"><div class="card p-3 card-clickable" onclick="location.hash='staff_card/${sid}'"><div class="d-flex align-items-center gap-3">${Utils.avatarHTML(name, 'lg')}<div class="flex-grow-1"><div class="fw-bold fs-6">${name}</div><div class="text-muted small">${role}</div>${phone ? `<div class="mt-1 small"><i class="bi bi-telephone me-1"></i>${Utils.formatPhone(phone)}</div>` : ''}</div>${Utils.statusBadge(s['\u05E1\u05D8\u05D8\u05D5\u05E1'])}</div></div></div>`;
    }).join('')}</div>`;
  },
  showAddStaff(staff = null) {
    const title = staff ? '\u05E2\u05E8\u05D9\u05DB\u05EA \u05E2\u05D5\u05D1\u05D3' : '\u05D4\u05D5\u05E1\u05E4\u05EA \u05E2\u05D5\u05D1\u05D3 \u05E6\u05D5\u05D5\u05EA';
    const name = staff ? Utils.fullName(staff) : '';
    const html = `<div class="modal fade" id="staff-modal-dyn" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5>${title}</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row g-3"><div class="col-12"><label class="form-label">\u05E9\u05DD</label><input class="form-control" id="stf-name" value="${name}"></div><div class="col-6"><label class="form-label">\u05EA\u05E4\u05E7\u05D9\u05D3</label><input class="form-control" id="stf-role" value="${staff?.['\u05EA\u05E4\u05E7\u05D9\u05D3']||''}"></div><div class="col-6"><label class="form-label">\u05D8\u05DC\u05E4\u05D5\u05DF</label><input class="form-control" id="stf-phone" value="${staff?.['\u05D8\u05DC\u05E4\u05D5\u05DF']||''}"></div><div class="col-12"><label class="form-label">\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC</label><input class="form-control" id="stf-email" value="${staff?.['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC']||''}"></div></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveStaff('${staff?Utils.rowId(staff):''}')">\u05E9\u05DE\u05D9\u05E8\u05D4</button></div></div></div></div>`;
    document.getElementById('staff-modal-dyn')?.remove();
    document.body.insertAdjacentHTML('beforeend', html);
    new bootstrap.Modal(document.getElementById('staff-modal-dyn')).show();
  },
  async saveStaff(existingId) {
    const fullName = document.getElementById('stf-name').value.trim();
    const parts = fullName.split(/\s+/);
    const row = {'\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9':parts[0]||'','\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4':parts.slice(1).join(' ')||'','\u05EA\u05E4\u05E7\u05D9\u05D3':document.getElementById('stf-role').value.trim(),'\u05D8\u05DC\u05E4\u05D5\u05DF':document.getElementById('stf-phone').value.trim(),'\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC':document.getElementById('stf-email').value.trim(),'\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05E4\u05E2\u05D9\u05DC'};
    if (!row['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9']) { Utils.toast('\u05D7\u05E1\u05E8 \u05E9\u05DD','warning'); return; }
    try { if (existingId) { await App.apiCall('update','\u05E6\u05D5\u05D5\u05EA',{id:existingId,row}); } else { await App.apiCall('add','\u05E6\u05D5\u05D5\u05EA',{row}); } bootstrap.Modal.getInstance(document.getElementById('staff-modal-dyn')).hide(); Utils.toast(existingId?'\u05E2\u05D5\u05D3\u05DB\u05DF':'\u05E0\u05D5\u05E1\u05E3'); this.staffInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },
  async deleteStaff(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05EA \u05E2\u05D5\u05D1\u05D3','\u05D4\u05D0\u05DD \u05DC\u05DE\u05D7\u05D5\u05E7 \u05E2\u05D5\u05D1\u05D3 \u05D6\u05D4?')) return;
    try { await App.apiCall('delete','\u05E6\u05D5\u05D5\u05EA',{id}); Utils.toast('\u05E2\u05D5\u05D1\u05D3 \u05E0\u05DE\u05D7\u05E7'); this.staffInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },

  /* ======================================================================
     STAFF CARD
     ====================================================================== */
  staff_card(id) { return `<div id="staff-card-content">${Utils.skeleton(2)}</div>`; },
  async staff_cardInit(id) {
    const staff = await App.getData('\u05E6\u05D5\u05D5\u05EA');
    const s = staff.find(x => String(Utils.rowId(x)) === String(id) || String(x.id) === String(id));
    if (!s) { document.getElementById('staff-card-content').innerHTML = `<div class="empty-state"><i class="bi bi-person-x"></i><h5>\u05E2\u05D5\u05D1\u05D3 \u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0</h5><a href="#staff" class="btn btn-primary mt-2">\u05D7\u05D6\u05E8\u05D4</a></div>`; return; }
    const name = Utils.fullName(s);
    document.getElementById('staff-card-content').innerHTML = `
      <a href="#staff" class="btn btn-link text-decoration-none mb-2"><i class="bi bi-arrow-right me-1"></i>\u05D7\u05D6\u05E8\u05D4 \u05DC\u05E6\u05D5\u05D5\u05EA</a>
      <div class="card overflow-hidden mb-3"><div class="student-header">${Utils.avatarHTML(name, 'xl')}<h3 class="fw-bold mt-2 mb-1">${name}</h3><div>${s['\u05EA\u05E4\u05E7\u05D9\u05D3']||''}</div>${Utils.statusBadge(s['\u05E1\u05D8\u05D8\u05D5\u05E1'])}</div></div>
      <div class="card p-3"><div class="row g-3">
        <div class="col-sm-6"><label class="form-label text-muted small">\u05D8\u05DC\u05E4\u05D5\u05DF</label><div class="fw-bold" dir="ltr">${Utils.formatPhone(s['\u05D8\u05DC\u05E4\u05D5\u05DF'])}</div></div>
        <div class="col-sm-6"><label class="form-label text-muted small">\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC</label><div class="fw-bold">${s['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC']||'--'}</div></div>
        <div class="col-sm-6"><label class="form-label text-muted small">\u05DE\u05E7\u05E6\u05D5\u05E2</label><div class="fw-bold">${s['\u05DE\u05E7\u05E6\u05D5\u05E2']||s['\u05EA\u05E4\u05E7\u05D9\u05D3']||'--'}</div></div>
        <div class="col-sm-6"><label class="form-label text-muted small">\u05DB\u05D9\u05EA\u05D5\u05EA</label><div class="fw-bold">${s['\u05DB\u05D9\u05EA\u05D5\u05EA']||'--'}</div></div>
        <div class="col-12"><label class="form-label text-muted small">\u05D4\u05E2\u05E8\u05D5\u05EA</label><div>${s['\u05D4\u05E2\u05E8\u05D5\u05EA']||'--'}</div></div>
      </div></div>`;
  },

  /* ======================================================================
     PARENTS
     ====================================================================== */
  parents() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div><h1><i class="bi bi-house-heart-fill me-2"></i>\u05D4\u05D5\u05E8\u05D9\u05DD</h1><p id="par-count"></p></div>
        <div class="d-flex gap-2">
          <button class="btn btn-primary btn-sm" onclick="Pages.showAddParent()"><i class="bi bi-plus-lg me-1"></i>\u05D4\u05D5\u05E1\u05E3</button>
          <button class="btn btn-outline-success btn-sm" onclick="Pages.bulkWhatsApp()"><i class="bi bi-whatsapp me-1"></i>\u05E9\u05DC\u05D9\u05D7\u05D4 \u05E7\u05D1\u05D5\u05E6\u05EA\u05D9\u05EA</button>
        </div>
      </div>
      <div class="card p-3 mb-3"><div class="search-box"><i class="bi bi-search"></i><input type="text" class="form-control" id="par-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05D4\u05D5\u05E8\u05D4..."></div></div>
      <div id="par-list">${Utils.skeleton(3)}</div>
      <div class="modal fade" id="par-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
        <div class="modal-header"><h5 class="modal-title">\u05D4\u05D5\u05E1\u05E4\u05EA \u05D4\u05D5\u05E8\u05D4</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body"><div class="row g-3">
          <div class="col-12"><label class="form-label">\u05E9\u05DD</label><input class="form-control" id="pf-name"></div>
          <div class="col-6"><label class="form-label">\u05E7\u05E9\u05E8</label><select class="form-select" id="pf-relation"><option>\u05D0\u05D1</option><option>\u05D0\u05DD</option><option>\u05D0\u05E4\u05D5\u05D8\u05E8\u05D5\u05E4\u05D5\u05E1</option></select></div>
          <div class="col-6"><label class="form-label">\u05D8\u05DC\u05E4\u05D5\u05DF</label><input class="form-control" id="pf-phone"></div>
          <div class="col-12"><label class="form-label">\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC</label><input class="form-control" id="pf-email"></div>
        </div></div>
        <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveParent()">\u05E9\u05DE\u05D9\u05E8\u05D4</button></div>
      </div></div></div>
    `;
  },
  _parData: [],
  async parentsInit() {
    this._parData = await App.getData('\u05D4\u05D5\u05E8\u05D9\u05DD');
    document.getElementById('par-search').addEventListener('input', Utils.debounce(() => this.renderParents(), 200));
    this.renderParents();
  },
  renderParents() {
    const search = (document.getElementById('par-search')?.value || '').trim().toLowerCase();
    const filtered = this._parData.filter(p => !search || (p['\u05E9\u05DD']||'').toLowerCase().includes(search) || (p['\u05D8\u05DC\u05E4\u05D5\u05DF']||'').includes(search));
    document.getElementById('par-count').textContent = `${filtered.length} \u05D4\u05D5\u05E8\u05D9\u05DD`;
    if (!filtered.length) { document.getElementById('par-list').innerHTML = '<div class="empty-state"><i class="bi bi-house-heart"></i><h5>\u05D0\u05D9\u05DF \u05D4\u05D5\u05E8\u05D9\u05DD</h5></div>'; return; }
    document.getElementById('par-list').innerHTML = `<div class="card"><table class="table table-bht mb-0"><thead><tr><th>\u05E9\u05DD</th><th>\u05E7\u05E9\u05E8</th><th>\u05D8\u05DC\u05E4\u05D5\u05DF</th><th>\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA</th></tr></thead><tbody>${filtered.map(p => `<tr><td class="fw-bold">${p['\u05E9\u05DD']||''}</td><td>${p['\u05E7\u05E9\u05E8']||''}</td><td dir="ltr">${Utils.formatPhone(p['\u05D8\u05DC\u05E4\u05D5\u05DF'])}</td><td>${p['\u05D8\u05DC\u05E4\u05D5\u05DF'] ? `<a href="https://wa.me/972${(p['\u05D8\u05DC\u05E4\u05D5\u05DF']||'').replace(/^0/,'')}" target="_blank" class="btn btn-sm btn-outline-success"><i class="bi bi-whatsapp"></i></a>` : ''}</td></tr>`).join('')}</tbody></table></div>`;
  },
  showAddParent() { new bootstrap.Modal(document.getElementById('par-modal')).show(); },
  async saveParent() {
    const row = { '\u05E9\u05DD': document.getElementById('pf-name').value.trim(), '\u05E7\u05E9\u05E8': document.getElementById('pf-relation').value, '\u05D8\u05DC\u05E4\u05D5\u05DF': document.getElementById('pf-phone').value.trim(), '\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC': document.getElementById('pf-email').value.trim() };
    if (!row['\u05E9\u05DD']) { Utils.toast('\u05D7\u05E1\u05E8 \u05E9\u05DD', 'warning'); return; }
    try { await App.apiCall('add', '\u05D4\u05D5\u05E8\u05D9\u05DD', { row }); bootstrap.Modal.getInstance(document.getElementById('par-modal')).hide(); Utils.toast('\u05D4\u05D5\u05E8\u05D4 \u05E0\u05D5\u05E1\u05E3'); this.parentsInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4', 'danger'); }
  },
  bulkWhatsApp() { const msg = prompt('\u05D4\u05D5\u05D3\u05E2\u05D4 \u05DC\u05DB\u05DC \u05D4\u05D4\u05D5\u05E8\u05D9\u05DD:'); if (!msg) return; let sent=0; this._parData.forEach(p => { if (!p['\u05D8\u05DC\u05E4\u05D5\u05DF']) return; window.open(`https://wa.me/972${p['\u05D8\u05DC\u05E4\u05D5\u05DF'].replace(/^0/,'')}?text=${encodeURIComponent(msg)}`,'_blank'); sent++; }); Utils.toast(`${sent} \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05E0\u05E9\u05DC\u05D7\u05D5`); },

  /* ======================================================================
     PARENT CARD
     ====================================================================== */
  parent_card(id) { return `<div id="parent-card-content">${Utils.skeleton(2)}</div>`; },
  async parent_cardInit(id) {
    const parents = await App.getData('\u05D4\u05D5\u05E8\u05D9\u05DD');
    const p = parents.find(x => String(Utils.rowId(x)) === String(id) || String(x.id) === String(id));
    if (!p) { document.getElementById('parent-card-content').innerHTML = '<div class="empty-state"><i class="bi bi-person-x"></i><h5>\u05D4\u05D5\u05E8\u05D4 \u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0</h5></div>'; return; }
    document.getElementById('parent-card-content').innerHTML = `<a href="#parents" class="btn btn-link text-decoration-none mb-2"><i class="bi bi-arrow-right me-1"></i>\u05D7\u05D6\u05E8\u05D4</a><div class="card p-3"><div class="d-flex align-items-center gap-3 mb-3">${Utils.avatarHTML(p['\u05E9\u05DD'],'lg')}<div><h4 class="fw-bold mb-1">${p['\u05E9\u05DD']||''}</h4><span class="badge bg-secondary">${p['\u05E7\u05E9\u05E8']||''}</span></div></div><div class="row g-3"><div class="col-sm-6"><label class="form-label text-muted small">\u05D8\u05DC\u05E4\u05D5\u05DF</label><div class="fw-bold" dir="ltr">${Utils.formatPhone(p['\u05D8\u05DC\u05E4\u05D5\u05DF'])}</div></div><div class="col-sm-6"><label class="form-label text-muted small">\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC</label><div class="fw-bold">${p['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC']||'--'}</div></div></div></div>`;
  },

  /* ======================================================================
     FINANCE
     ====================================================================== */
  finance() {
    return `<div class="page-header"><h1><i class="bi bi-cash-stack me-2"></i>\u05DB\u05E1\u05E4\u05D9\u05DD</h1></div><div class="row g-3 mb-4"><div class="col-md-4"><div class="card p-3 text-center"><div class="fs-4 fw-bold" id="fin-total">--</div><small class="text-muted">\u05E1\u05D4"\u05DB</small></div></div><div class="col-md-4"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-success" id="fin-paid">--</div><small class="text-muted">\u05E0\u05D2\u05D1\u05D4</small></div></div><div class="col-md-4"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-danger" id="fin-debt">--</div><small class="text-muted">\u05D7\u05D5\u05D1</small></div></div></div><div class="card p-3 mb-3"><div class="row g-2"><div class="col-md-6"><div class="search-box"><i class="bi bi-search"></i><input type="text" class="form-control" id="fin-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05EA\u05DC\u05DE\u05D9\u05D3..."></div></div><div class="col-md-3"><select class="form-select" id="fin-filter"><option value="">\u05D4\u05DB\u05DC</option><option value="debt">\u05D7\u05D5\u05D1\u05D5\u05EA</option><option value="paid">\u05E9\u05D5\u05DC\u05DD</option></select></div><div class="col-md-3 d-flex gap-2"><button class="btn btn-primary btn-sm" onclick="Pages.showAddPayment()"><i class="bi bi-plus-lg me-1"></i>\u05EA\u05E9\u05DC\u05D5\u05DD</button><button class="btn btn-outline-success btn-sm" onclick="Pages.exportFinCSV()"><i class="bi bi-download me-1"></i>CSV</button></div></div></div><div id="fin-list">${Utils.skeleton(4)}</div>`;
  },
  _finData: [],
  async financeInit() {
    this._finData = await App.getData('\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3');
    const total = this._finData.reduce((s,f) => s+(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0),0);
    const paid = this._finData.filter(f=>(f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05E9\u05D5\u05DC\u05DD').reduce((s,f) => s+(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0),0);
    const debt = total - paid;
    document.getElementById('fin-total').textContent = Utils.formatCurrency(total);
    document.getElementById('fin-paid').textContent = Utils.formatCurrency(paid);
    document.getElementById('fin-debt').textContent = Utils.formatCurrency(debt);
    document.getElementById('fin-search').addEventListener('input', Utils.debounce(() => this.renderFinList(), 200));
    document.getElementById('fin-filter').addEventListener('change', () => this.renderFinList());
    this.renderFinList();
  },
  renderFinList() {
    const search = (document.getElementById('fin-search')?.value || '').trim().toLowerCase();
    const filter = document.getElementById('fin-filter')?.value || '';
    let filtered = (this._finData || []).filter(f => { const nm=f['\u05E9\u05DD']||f['\u05EA\u05DC\u05DE\u05D9\u05D3']||''; if (search && !nm.toLowerCase().includes(search)) return false; const isPaid=(f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05E9\u05D5\u05DC\u05DD'; if (filter==='debt'&&isPaid) return false; if (filter==='paid'&&!isPaid) return false; return true; });
    if (!filtered.length) { document.getElementById('fin-list').innerHTML = '<div class="empty-state"><i class="bi bi-cash"></i><h5>\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5</h5></div>'; return; }
    document.getElementById('fin-list').innerHTML = `<div class="card"><table class="table table-bht mb-0"><thead><tr><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th>\u05D7\u05D5\u05D3\u05E9</th><th>\u05E1\u05DB\u05D5\u05DD</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th><th>\u05D0\u05DE\u05E6\u05E2\u05D9</th><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th></tr></thead><tbody>${filtered.map(f => { const nm=f['\u05E9\u05DD']||f['\u05EA\u05DC\u05DE\u05D9\u05D3']||''; const amt=Number(f['\u05E1\u05DB\u05D5\u05DD'])||0; const isPaid=(f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05E9\u05D5\u05DC\u05DD'; const sc=isPaid?'success':'danger'; return `<tr><td><div class="d-flex align-items-center gap-2">${Utils.avatarHTML(nm,'sm')}<span class="fw-bold">${nm}</span></div></td><td>${f['\u05D7\u05D5\u05D3\u05E9']||''}</td><td class="fw-bold">${Utils.formatCurrency(amt)}</td><td><span class="badge bg-${sc}">${f['\u05E1\u05D8\u05D8\u05D5\u05E1']||''}</span></td><td>${f['\u05D0\u05DE\u05E6\u05E2\u05D9_\u05EA\u05E9\u05DC\u05D5\u05DD']||''}</td><td>${Utils.formatDateShort(f['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05EA\u05E9\u05DC\u05D5\u05DD'])}</td></tr>`; }).join('')}</tbody></table></div>`;
  },
  showAddPayment() {
    const html = `<div class="modal fade" id="fin-modal-dyn" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5>\u05EA\u05E9\u05DC\u05D5\u05DD \u05D7\u05D3\u05E9</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row g-3"><div class="col-12"><label class="form-label">\u05EA\u05DC\u05DE\u05D9\u05D3</label><select class="form-select" id="ff-student"></select></div><div class="col-6"><label class="form-label">\u05D7\u05D5\u05D3\u05E9</label><input type="month" class="form-control" id="ff-month"></div><div class="col-6"><label class="form-label">\u05E1\u05DB\u05D5\u05DD</label><input type="number" class="form-control" id="ff-amount"></div><div class="col-6"><label class="form-label">\u05E1\u05D8\u05D8\u05D5\u05E1</label><select class="form-select" id="ff-status"><option value="\u05D7\u05D5\u05D1">\u05D7\u05D5\u05D1</option><option value="\u05E9\u05D5\u05DC\u05DD">\u05E9\u05D5\u05DC\u05DD</option></select></div><div class="col-6"><label class="form-label">\u05D0\u05DE\u05E6\u05E2\u05D9</label><select class="form-select" id="ff-method"><option>\u05DE\u05D6\u05D5\u05DE\u05DF</option><option>\u05D4\u05E2\u05D1\u05E8\u05D4</option><option>\u05E6'\u05E7</option><option>\u05D0\u05E9\u05E8\u05D0\u05D9</option></select></div></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.savePayment()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
    document.getElementById('fin-modal-dyn')?.remove();
    document.body.insertAdjacentHTML('beforeend', html);
    App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD').then(students => {
      const sel = document.getElementById('ff-student');
      sel.innerHTML = '<option value="">\u05D1\u05D7\u05E8</option>' + students.map(s => `<option value="${Utils.rowId(s)}">${Utils.fullName(s)}</option>`).join('');
    });
    const d = new Date(); document.getElementById('ff-month').value = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    new bootstrap.Modal(document.getElementById('fin-modal-dyn')).show();
  },
  async savePayment() {
    const sel = document.getElementById('ff-student');
    const row = {'\u05E9\u05DD':sel.selectedOptions[0]?.text||'','\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4':sel.value,'\u05D7\u05D5\u05D3\u05E9':document.getElementById('ff-month').value,'\u05E1\u05DB\u05D5\u05DD':document.getElementById('ff-amount').value,'\u05E1\u05D8\u05D8\u05D5\u05E1':document.getElementById('ff-status').value,'\u05D0\u05DE\u05E6\u05E2\u05D9_\u05EA\u05E9\u05DC\u05D5\u05DD':document.getElementById('ff-method').value,'\u05EA\u05D0\u05E8\u05D9\u05DA_\u05EA\u05E9\u05DC\u05D5\u05DD':Utils.todayISO()};
    if (!row['\u05E9\u05DD']||!row['\u05E1\u05DB\u05D5\u05DD']) { Utils.toast('\u05D7\u05E1\u05E8 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD','warning'); return; }
    try { await App.apiCall('add','\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3',{row}); bootstrap.Modal.getInstance(document.getElementById('fin-modal-dyn')).hide(); Utils.toast('\u05EA\u05E9\u05DC\u05D5\u05DD \u05E0\u05D5\u05E1\u05E3'); this.financeInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },
  async deletePayment(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4','\u05DC\u05DE\u05D7\u05D5\u05E7 \u05EA\u05E9\u05DC\u05D5\u05DD \u05D6\u05D4?')) return;
    try { await App.apiCall('delete','\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.financeInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },
  async markPaymentPaid(id) {
    try { await App.apiCall('update','\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3',{id,row:{'\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05E9\u05D5\u05DC\u05DD','\u05EA\u05D0\u05E8\u05D9\u05DA_\u05EA\u05E9\u05DC\u05D5\u05DD':Utils.todayISO()}}); Utils.toast('\u05E1\u05D5\u05DE\u05DF \u05DB\u05E9\u05D5\u05DC\u05DD'); this.financeInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },
  exportFinCSV() {
    const rows = this._finData || [];
    if (!rows.length) { Utils.toast('\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD','warning'); return; }
    let csv = '\uFEFF' + '\u05EA\u05DC\u05DE\u05D9\u05D3,\u05D7\u05D5\u05D3\u05E9,\u05E1\u05DB\u05D5\u05DD,\u05E1\u05D8\u05D8\u05D5\u05E1,\u05D0\u05DE\u05E6\u05E2\u05D9,\u05EA\u05D0\u05E8\u05D9\u05DA\n';
    rows.forEach(f => { csv += `"${f['\u05E9\u05DD']||f['\u05EA\u05DC\u05DE\u05D9\u05D3']||''}","${f['\u05D7\u05D5\u05D3\u05E9']||''}","${f['\u05E1\u05DB\u05D5\u05DD']||''}","${f['\u05E1\u05D8\u05D8\u05D5\u05E1']||''}","${f['\u05D0\u05DE\u05E6\u05E2\u05D9_\u05EA\u05E9\u05DC\u05D5\u05DD']||''}","${f['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05EA\u05E9\u05DC\u05D5\u05DD']||''}"\n`; });
    const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'finance_'+Utils.todayISO()+'.csv'; link.click();
    Utils.toast('\u05E7\u05D5\u05D1\u05E5 CSV \u05D9\u05D5\u05E6\u05D0');
  },

  /* ======================================================================
     BEHAVIOR
     ====================================================================== */
  behavior() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-star-half me-2"></i>\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</h1></div><button class="btn btn-primary btn-sm" onclick="Pages.showAddBeh()"><i class="bi bi-plus-lg me-1"></i>\u05D3\u05D9\u05D5\u05D5\u05D7 \u05D7\u05D3\u05E9</button></div><div class="row g-3 mb-3"><div class="col-md-4"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-success" id="beh-pos">0</div><small>\u05D7\u05D9\u05D5\u05D1\u05D9</small></div></div><div class="col-md-4"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-danger" id="beh-neg">0</div><small>\u05E9\u05DC\u05D9\u05DC\u05D9</small></div></div><div class="col-md-4"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-primary" id="beh-total">0</div><small>\u05E1\u05D4"\u05DB</small></div></div></div><div class="card mb-3" id="beh-leaderboard" style="display:none"><div class="card-body"><h6 class="fw-bold"><i class="bi bi-trophy-fill text-warning me-2"></i>\u05DE\u05D5\u05D1\u05D9\u05DC\u05D9\u05DD</h6><div id="beh-top"></div></div></div><div id="beh-list">${Utils.skeleton(3)}</div><div class="modal fade" id="beh-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">\u05D3\u05D9\u05D5\u05D5\u05D7 \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row g-3"><div class="col-12"><label class="form-label">\u05EA\u05DC\u05DE\u05D9\u05D3</label><select class="form-select" id="bf-student"></select></div><div class="col-6"><label class="form-label">\u05E1\u05D5\u05D2</label><select class="form-select" id="bf-type"><option>\u05D7\u05D9\u05D5\u05D1\u05D9</option><option>\u05E9\u05DC\u05D9\u05DC\u05D9</option><option>\u05D4\u05E2\u05E8\u05D4</option></select></div><div class="col-6"><label class="form-label">\u05D7\u05D5\u05DE\u05E8\u05D4</label><select class="form-select" id="bf-severity"><option value="1">1 \u05E7\u05DC</option><option value="3" selected>3 \u05D1\u05D9\u05E0\u05D5\u05E0\u05D9</option><option value="5">5 \u05D7\u05DE\u05D5\u05E8</option></select></div><div class="col-12"><label class="form-label">\u05EA\u05D9\u05D0\u05D5\u05E8</label><textarea class="form-control" id="bf-desc" rows="3"></textarea></div></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveBeh()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
  },
  _behData: [],
  async behaviorInit() {
    this._behData = await App.getData('\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA'); this.renderBeh();
  },
  renderBeh() {
    const rows = this._behData || [];
    const pos = rows.filter(r => r['\u05E1\u05D5\u05D2']==='\u05D7\u05D9\u05D5\u05D1\u05D9').length;
    const neg = rows.filter(r => r['\u05E1\u05D5\u05D2']==='\u05E9\u05DC\u05D9\u05DC\u05D9').length;
    document.getElementById('beh-pos').textContent = pos;
    document.getElementById('beh-neg').textContent = neg;
    document.getElementById('beh-total').textContent = rows.length;
    // Leaderboard
    const scores = {};
    rows.forEach(r => { const n = r['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3']||r['\u05E9\u05DD']||r['\u05EA\u05DC\u05DE\u05D9\u05D3']||''; if (!n) return; if (!scores[n]) scores[n]={p:0,n:0}; if (r['\u05E1\u05D5\u05D2']==='\u05D7\u05D9\u05D5\u05D1\u05D9') scores[n].p++; else if (r['\u05E1\u05D5\u05D2']==='\u05E9\u05DC\u05D9\u05DC\u05D9') scores[n].n++; });
    const sorted = Object.keys(scores).sort((a,b) => (scores[b].p-scores[b].n)-(scores[a].p-scores[a].n)).slice(0,5);
    if (sorted.length) { document.getElementById('beh-leaderboard').style.display=''; document.getElementById('beh-top').innerHTML = sorted.map((n,i) => { const net = scores[n].p-scores[n].n; return `<div class="d-flex align-items-center gap-2 mb-1"><span class="fw-bold" style="width:25px">${['&#129351;','&#129352;','&#129353;','4','5'][i]}</span><span class="flex-grow-1">${n}</span><span class="badge ${net>=0?'bg-success':'bg-danger'}">${net>=0?'+':''}${net}</span></div>`; }).join(''); }
    if (!rows.length) { document.getElementById('beh-list').innerHTML = '<div class="empty-state"><i class="bi bi-star"></i><h5>\u05D0\u05D9\u05DF \u05D3\u05D9\u05D5\u05D5\u05D7\u05D9\u05DD</h5></div>'; return; }
    document.getElementById('beh-list').innerHTML = rows.slice().reverse().slice(0,50).map(r => { const tc = r['\u05E1\u05D5\u05D2']==='\u05D7\u05D9\u05D5\u05D1\u05D9'?'success':r['\u05E1\u05D5\u05D2']==='\u05E9\u05DC\u05D9\u05DC\u05D9'?'danger':'secondary'; const nm=r['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3']||r['\u05E9\u05DD']||r['\u05EA\u05DC\u05DE\u05D9\u05D3']||''; const rid=r.id||r['\u05DE\u05D6\u05D4\u05D4']||Utils.rowId(r); return `<div class="card p-3 mb-2"><div class="d-flex justify-content-between"><div><span class="badge bg-${tc} me-2">${r['\u05E1\u05D5\u05D2']||''}</span><strong>${nm}</strong></div><div class="d-flex align-items-center gap-2"><small class="text-muted">${Utils.formatDateShort(r['\u05EA\u05D0\u05E8\u05D9\u05DA'])}</small><button class="btn btn-sm btn-outline-danger" onclick="Pages.deleteBeh('${rid}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button></div></div><p class="mb-0 mt-1 small">${r['\u05EA\u05D9\u05D0\u05D5\u05E8']||''}</p></div>`; }).join('');
  },
  async showAddBeh() { const students = this._studentsData?.length ? this._studentsData : await App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD'); const sel = document.getElementById('bf-student'); if (sel) { sel.innerHTML = '<option value="">\u05D1\u05D7\u05E8</option>' + students.map(s => `<option value="${Utils.rowId(s)}">${Utils.fullName(s)}</option>`).join(''); } new bootstrap.Modal(document.getElementById('beh-modal')).show(); },
  async saveBeh() {
    const row = { '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': document.getElementById('bf-student').value, '\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3': document.getElementById('bf-student').selectedOptions[0]?.text || '', '\u05E1\u05D5\u05D2': document.getElementById('bf-type').value, '\u05D7\u05D5\u05DE\u05E8\u05D4': document.getElementById('bf-severity').value, '\u05EA\u05D9\u05D0\u05D5\u05E8': document.getElementById('bf-desc').value.trim(), '\u05EA\u05D0\u05E8\u05D9\u05DA': Utils.todayISO() };
    try { await App.apiCall('add', '\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA', { row }); bootstrap.Modal.getInstance(document.getElementById('beh-modal')).hide(); Utils.toast('\u05D3\u05D9\u05D5\u05D5\u05D7 \u05E0\u05E9\u05DE\u05E8'); this.behaviorInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4', 'danger'); }
  },
  async deleteBeh(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4','\u05DC\u05DE\u05D7\u05D5\u05E7 \u05D3\u05D9\u05D5\u05D5\u05D7 \u05D6\u05D4?')) return;
    try { await App.apiCall('delete','\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.behaviorInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },

  /* ======================================================================
     HOMEWORK
     ====================================================================== */
  homework() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-book me-2"></i>\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9 \u05D1\u05D9\u05EA</h1></div><button class="btn btn-primary btn-sm" onclick="Pages.showAddHw()"><i class="bi bi-plus-lg me-1"></i>\u05E9\u05D9\u05E2\u05D5\u05E8 \u05D1\u05D9\u05EA \u05D7\u05D3\u05E9</button></div><div class="row g-3" id="hw-cards">${Utils.skeleton(3)}</div><div class="modal fade" id="hw-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">\u05E9\u05D9\u05E2\u05D5\u05E8 \u05D1\u05D9\u05EA \u05D7\u05D3\u05E9</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row g-3"><div class="col-6"><label class="form-label">\u05DE\u05E7\u05E6\u05D5\u05E2</label><input class="form-control" id="hf-subject"></div><div class="col-6"><label class="form-label">\u05DB\u05D9\u05EA\u05D4</label><input class="form-control" id="hf-class"></div><div class="col-6"><label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA \u05DE\u05EA\u05DF</label><input type="date" class="form-control" id="hf-given"></div><div class="col-6"><label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05D2\u05E9\u05D4</label><input type="date" class="form-control" id="hf-due"></div><div class="col-12"><label class="form-label">\u05EA\u05D9\u05D0\u05D5\u05E8</label><textarea class="form-control" id="hf-desc" rows="3"></textarea></div></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveHw()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
  },
  _hwData: [],
  async homeworkInit() { this._hwData = await App.getData('\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9_\u05D1\u05D9\u05EA'); this.renderHw(); },
  renderHw() {
    const today = Utils.todayISO();
    if (!this._hwData.length) { document.getElementById('hw-cards').innerHTML = '<div class="col-12"><div class="empty-state"><i class="bi bi-book"></i><h5>\u05D0\u05D9\u05DF \u05E9\u05D9\u05E2\u05D5\u05E8\u05D9 \u05D1\u05D9\u05EA</h5></div></div>'; return; }
    document.getElementById('hw-cards').innerHTML = this._hwData.slice().reverse().map(r => {
      const due = r['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4']||''; const overdue = due && due < today && r['\u05E1\u05D8\u05D8\u05D5\u05E1']!=='\u05D4\u05D5\u05E9\u05DC\u05DD';
      const daysLeft = due ? Math.ceil((new Date(due)-new Date())/86400000) : null;
      const hwId=r.id||r['\u05DE\u05D6\u05D4\u05D4']||Utils.rowId(r); const isDone=(r['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05D4\u05D5\u05E9\u05DC\u05DD';
      return `<div class="col-md-6"><div class="card p-3 ${overdue?'border-danger':''}" style="border-width:2px"><div class="d-flex justify-content-between mb-2"><div><span class="badge bg-primary me-1">${r['\u05E1\u05D5\u05D2']||r['\u05DE\u05E7\u05E6\u05D5\u05E2']||''}</span><span class="badge bg-secondary">${r['\u05DB\u05D9\u05EA\u05D4']||''}</span>${isDone?'<span class="badge bg-success ms-1">\u05D4\u05D5\u05E9\u05DC\u05DD</span>':''}</div>${daysLeft!==null?`<span class="badge ${overdue?'bg-danger':daysLeft<=2?'bg-warning':'bg-success'}">${overdue?'\u05E2\u05D1\u05E8 \u05DE\u05D5\u05E2\u05D3!':daysLeft===0?'\u05D4\u05D9\u05D5\u05DD!':daysLeft+' \u05D9\u05DE\u05D9\u05DD'}</span>`:''}</div><h6 class="fw-bold">${r['\u05DE\u05E7\u05E6\u05D5\u05E2']||''}</h6><p class="small mb-1">${r['\u05EA\u05D9\u05D0\u05D5\u05E8']||''}</p><div class="small text-muted"><i class="bi bi-calendar me-1"></i>\u05E0\u05D9\u05EA\u05DF: ${r['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DE\u05EA\u05DF']||''} ${due?' | \u05D4\u05D2\u05E9\u05D4: '+due:''}</div><div class="mt-2 d-flex gap-2">${!isDone?`<button class="btn btn-sm btn-outline-success" onclick="Pages.markHwDone('${hwId}')"><i class="bi bi-check-lg me-1"></i>\u05D4\u05D5\u05E9\u05DC\u05DD</button>`:''}<button class="btn btn-sm btn-outline-danger" onclick="Pages.deleteHw('${hwId}')"><i class="bi bi-trash me-1"></i>\u05DE\u05D7\u05E7</button></div></div></div>`;
    }).join('');
  },
  showAddHw() { document.getElementById('hf-given').value = Utils.todayISO(); new bootstrap.Modal(document.getElementById('hw-modal')).show(); },
  async saveHw() {
    const row = { '\u05DE\u05E7\u05E6\u05D5\u05E2': document.getElementById('hf-subject').value.trim(), '\u05DB\u05D9\u05EA\u05D4': document.getElementById('hf-class').value.trim(), '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DE\u05EA\u05DF': document.getElementById('hf-given').value, '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4': document.getElementById('hf-due').value, '\u05EA\u05D9\u05D0\u05D5\u05E8': document.getElementById('hf-desc').value.trim(), '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC' };
    if (!row['\u05DE\u05E7\u05E6\u05D5\u05E2']) { Utils.toast('\u05D7\u05E1\u05E8 \u05DE\u05E7\u05E6\u05D5\u05E2', 'warning'); return; }
    try { await App.apiCall('add', '\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9_\u05D1\u05D9\u05EA', { row }); bootstrap.Modal.getInstance(document.getElementById('hw-modal')).hide(); Utils.toast('\u05E9\u05D9\u05E2\u05D5\u05E8 \u05D1\u05D9\u05EA \u05E0\u05D5\u05E1\u05E3'); this.homeworkInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4', 'danger'); }
  },
  async deleteHw(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4','\u05DC\u05DE\u05D7\u05D5\u05E7 \u05E9\u05D9\u05E2\u05D5\u05E8 \u05D1\u05D9\u05EA \u05D6\u05D4?')) return;
    try { await App.apiCall('delete','\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9_\u05D1\u05D9\u05EA',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.homeworkInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },
  async markHwDone(id) {
    try { await App.apiCall('update','\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9_\u05D1\u05D9\u05EA',{id,row:{'\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05D4\u05D5\u05E9\u05DC\u05DD'}}); Utils.toast('\u05E1\u05D5\u05DE\u05DF \u05DB\u05D4\u05D5\u05E9\u05DC\u05DD'); this.homeworkInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },

  /* ======================================================================
     ACADEMICS
     ====================================================================== */
  academics() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-journal-text me-2"></i>\u05DE\u05D1\u05D7\u05E0\u05D9\u05DD \u05D5\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD</h1></div><button class="btn btn-primary btn-sm" onclick="Pages.showAddExam()"><i class="bi bi-plus-lg me-1"></i>\u05DE\u05D1\u05D7\u05DF \u05D7\u05D3\u05E9</button></div><div class="row g-2 mb-3"><div class="col-auto"><span class="badge bg-primary fs-6" id="aca-total">0 \u05DE\u05D1\u05D7\u05E0\u05D9\u05DD</span></div><div class="col-auto"><span class="badge bg-success fs-6" id="aca-avg">\u05DE\u05DE\u05D5\u05E6\u05E2: --</span></div></div><div id="aca-list">${Utils.skeleton(3)}</div><div class="modal fade" id="aca-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">\u05DE\u05D1\u05D7\u05DF \u05D7\u05D3\u05E9</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row g-3"><div class="col-6"><label class="form-label">\u05DE\u05E7\u05E6\u05D5\u05E2</label><input class="form-control" id="af-subject"></div><div class="col-6"><label class="form-label">\u05DB\u05D9\u05EA\u05D4</label><input class="form-control" id="af-class"></div><div class="col-6"><label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA</label><input type="date" class="form-control" id="af-date"></div><div class="col-12"><label class="form-label">\u05EA\u05D9\u05D0\u05D5\u05E8</label><input class="form-control" id="af-desc"></div></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveExam()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
  },
  _acaExams: [], _acaGrades: [],
  async academicsInit() {
    this._acaExams = await App.getData('\u05DE\u05D1\u05D7\u05E0\u05D9\u05DD'); this._acaGrades = await App.getData('\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD'); this.renderAca();
  },
  renderAca() {
    document.getElementById('aca-total').textContent = this._acaExams.length + ' \u05DE\u05D1\u05D7\u05E0\u05D9\u05DD';
    const allG = this._acaGrades.map(g => parseFloat(g['\u05E6\u05D9\u05D5\u05DF'])||0).filter(g => g>0);
    const avg = allG.length ? (allG.reduce((a,b)=>a+b,0)/allG.length).toFixed(1) : '--';
    document.getElementById('aca-avg').textContent = '\u05DE\u05DE\u05D5\u05E6\u05E2: ' + avg;
    if (!this._acaExams.length) { document.getElementById('aca-list').innerHTML = '<div class="empty-state"><i class="bi bi-journal-text"></i><h5>\u05D0\u05D9\u05DF \u05DE\u05D1\u05D7\u05E0\u05D9\u05DD</h5></div>'; return; }
    const gMap = {}; this._acaGrades.forEach(g => { const eid = g['\u05DE\u05D1\u05D7\u05DF_\u05DE\u05D6\u05D4\u05D4']||''; if (!gMap[eid]) gMap[eid]=[]; gMap[eid].push(parseFloat(g['\u05E6\u05D9\u05D5\u05DF'])||0); });
    document.getElementById('aca-list').innerHTML = `<div class="card"><table class="table table-bht mb-0"><thead><tr><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05DE\u05E7\u05E6\u05D5\u05E2</th><th>\u05DB\u05D9\u05EA\u05D4</th><th>\u05EA\u05D9\u05D0\u05D5\u05E8</th><th>\u05DE\u05DE\u05D5\u05E6\u05E2</th></tr></thead><tbody>${this._acaExams.map(e => { const g=gMap[e['\u05DE\u05D6\u05D4\u05D4']||e.id]||[]; const ea=g.length?(g.reduce((a,b)=>a+b,0)/g.length).toFixed(1):'--'; const ac=ea!=='--'?(parseFloat(ea)>=70?'text-success':parseFloat(ea)>=55?'text-warning':'text-danger'):''; return `<tr><td>${e['\u05EA\u05D0\u05E8\u05D9\u05DA']||''}</td><td><span class="badge bg-info">${e['\u05DE\u05E7\u05E6\u05D5\u05E2']||''}</span></td><td>${e['\u05DB\u05D9\u05EA\u05D4']||''}</td><td>${e['\u05EA\u05D9\u05D0\u05D5\u05E8']||''}</td><td class="fw-bold ${ac}">${ea} <small class="text-muted">(${g.length})</small></td></tr>`; }).join('')}</tbody></table></div>`;
  },
  showAddExam() { document.getElementById('af-date').value = Utils.todayISO(); new bootstrap.Modal(document.getElementById('aca-modal')).show(); },
  async saveExam() {
    const row = { '\u05DE\u05E7\u05E6\u05D5\u05E2': document.getElementById('af-subject').value.trim(), '\u05DB\u05D9\u05EA\u05D4': document.getElementById('af-class').value.trim(), '\u05EA\u05D0\u05E8\u05D9\u05DA': document.getElementById('af-date').value, '\u05EA\u05D9\u05D0\u05D5\u05E8': document.getElementById('af-desc').value.trim() };
    if (!row['\u05DE\u05E7\u05E6\u05D5\u05E2']) { Utils.toast('\u05D7\u05E1\u05E8 \u05DE\u05E7\u05E6\u05D5\u05E2', 'warning'); return; }
    try { await App.apiCall('add', '\u05DE\u05D1\u05D7\u05E0\u05D9\u05DD', { row }); bootstrap.Modal.getInstance(document.getElementById('aca-modal')).hide(); Utils.toast('\u05DE\u05D1\u05D7\u05DF \u05E0\u05E9\u05DE\u05E8'); this.academicsInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4', 'danger'); }
  },
  async deleteExam(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4','\u05DC\u05DE\u05D7\u05D5\u05E7 \u05DE\u05D1\u05D7\u05DF \u05D6\u05D4?')) return;
    try { await App.apiCall('delete','\u05DE\u05D1\u05D7\u05E0\u05D9\u05DD',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.academicsInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },

  /* ======================================================================
     RANKINGS
     ====================================================================== */
  rankings() {
    return `<div class="page-header"><h1><i class="bi bi-trophy-fill me-2"></i>\u05D3\u05D9\u05E8\u05D5\u05D2\u05D9\u05DD</h1></div><div class="card p-3 mb-3"><select class="form-select" id="rank-type"><option value="behavior">\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</option><option value="attendance">\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</option></select></div><div class="row g-3 mb-4 justify-content-center" id="rank-podium" style="display:none"><div class="col-auto text-center" id="rank-silver"></div><div class="col-auto text-center" id="rank-gold"></div><div class="col-auto text-center" id="rank-bronze"></div></div><div id="rank-table">${Utils.skeleton(3)}</div>`;
  },
  async rankingsInit() {
    document.getElementById('rank-type').addEventListener('change', () => this.loadRankings());
    this.loadRankings();
  },
  async loadRankings() {
    const type = document.getElementById('rank-type').value;
    let data = [];
    if (type === 'behavior') {
      const beh = await App.getData('\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA');
      const scores = {};
      beh.forEach(r => { const n=r['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3']||r['\u05E9\u05DD']||r['\u05EA\u05DC\u05DE\u05D9\u05D3']||''; if (!n) return; if (!scores[n]) scores[n]=0; if (r['\u05E1\u05D5\u05D2']==='\u05D7\u05D9\u05D5\u05D1\u05D9') scores[n]++; else if (r['\u05E1\u05D5\u05D2']==='\u05E9\u05DC\u05D9\u05DC\u05D9') scores[n]--; });
      data = Object.keys(scores).map(n => ({name:n, score:scores[n]})).sort((a,b)=>b.score-a.score);
    } else {
      const att = await App.getData('\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA');
      const counts = {};
      att.forEach(a => { const n=a['\u05E9\u05DD']||a['\u05EA\u05DC\u05DE\u05D9\u05D3']||''; if (!n) return; if (!counts[n]) counts[n]={p:0,t:0}; counts[n].t++; if (a['\u05E1\u05D8\u05D8\u05D5\u05E1']==='\u05E0\u05D5\u05DB\u05D7') counts[n].p++; });
      data = Object.keys(counts).map(n => ({name:n, score:counts[n].t?Math.round(counts[n].p/counts[n].t*100):0})).sort((a,b)=>b.score-a.score);
    }
    if (!data.length) { document.getElementById('rank-table').innerHTML = '<div class="empty-state"><i class="bi bi-trophy"></i><h5>\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD</h5></div>'; document.getElementById('rank-podium').style.display='none'; return; }
    const max = data[0].score || 1;
    // Podium
    if (data.length >= 3) {
      document.getElementById('rank-podium').style.display = '';
      [{el:'rank-gold',idx:0,color:'#fbbf24',sz:'80px'},{el:'rank-silver',idx:1,color:'#94a3b8',sz:'64px'},{el:'rank-bronze',idx:2,color:'#d97706',sz:'56px'}].forEach(m => {
        const d = data[m.idx]; document.getElementById(m.el).innerHTML = `<div style="font-size:${m.sz};color:${m.color}"><i class="bi bi-trophy-fill"></i></div><h6 class="fw-bold mt-1">${d.name}</h6><div class="fs-4 fw-bold">${d.score}</div>`;
      });
    }
    document.getElementById('rank-table').innerHTML = `<div class="card"><table class="table table-bht mb-0"><thead><tr><th>#</th><th>\u05E9\u05DD</th><th>\u05E0\u05D9\u05E7\u05D5\u05D3</th><th>\u05D2\u05E8\u05E3</th></tr></thead><tbody>${data.slice(0,20).map((d,i) => { const w=Math.max(5,Math.round(d.score/max*100)); const c=i===0?'#fbbf24':i===1?'#94a3b8':i===2?'#d97706':'#2563eb'; return `<tr><td class="fw-bold">${i+1}</td><td class="fw-medium">${d.name}</td><td class="fw-bold">${d.score}</td><td><div class="progress" style="height:20px"><div class="progress-bar" style="width:${w}%;background:${c}">${d.score}</div></div></td></tr>`; }).join('')}</tbody></table></div>`;
  },

  /* ======================================================================
     TASKS (KANBAN)
     ====================================================================== */
  tasks() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-kanban me-2"></i>\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA</h1></div><div class="d-flex gap-2"><div class="input-group input-group-sm" style="width:300px"><input class="form-control" id="quick-task" placeholder="\u05DE\u05E9\u05D9\u05DE\u05D4 \u05D7\u05D3\u05E9\u05D4..." onkeydown="if(event.key==='Enter')Pages.quickAddTask()"><button class="btn btn-primary" onclick="Pages.quickAddTask()"><i class="bi bi-plus-lg"></i></button></div></div></div><div class="row g-3"><div class="col-md-4"><div class="card p-3" style="min-height:300px"><h6 class="fw-bold text-center mb-3"><span class="badge bg-secondary">\u05D7\u05D3\u05E9</span> <span id="task-new-c" class="badge bg-light text-dark"></span></h6><div id="task-new"></div></div></div><div class="col-md-4"><div class="card p-3" style="min-height:300px"><h6 class="fw-bold text-center mb-3"><span class="badge bg-primary">\u05D1\u05EA\u05D4\u05DC\u05D9\u05DA</span> <span id="task-prog-c" class="badge bg-light text-dark"></span></h6><div id="task-prog"></div></div></div><div class="col-md-4"><div class="card p-3" style="min-height:300px"><h6 class="fw-bold text-center mb-3"><span class="badge bg-success">\u05D4\u05D5\u05E9\u05DC\u05DD</span> <span id="task-done-c" class="badge bg-light text-dark"></span></h6><div id="task-done"></div></div></div></div>`;
  },
  _taskData: [],
  async tasksInit() { this._taskData = await App.getData('\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA'); this.renderTasks(); },
  renderTasks() {
    const cols = {'\u05D7\u05D3\u05E9':[],'\u05D1\u05EA\u05D4\u05DC\u05D9\u05DA':[],'\u05D4\u05D5\u05E9\u05DC\u05DD':[]};
    (this._taskData||[]).forEach(t => { const s=t['\u05E1\u05D8\u05D8\u05D5\u05E1']||'\u05D7\u05D3\u05E9'; if (cols[s]) cols[s].push(t); else cols['\u05D7\u05D3\u05E9'].push(t); });
    const prC = {'\u05D3\u05D7\u05D5\u05E3':'danger','\u05D2\u05D1\u05D5\u05D4':'warning','\u05E8\u05D2\u05D9\u05DC':'primary','\u05E0\u05DE\u05D5\u05DA':'secondary'};
    const renderCol = (tasks) => !tasks.length ? '<div class="text-muted text-center small py-3">\u05E8\u05D9\u05E7</div>' : tasks.map(t => { const pc=prC[t['\u05E2\u05D3\u05D9\u05E4\u05D5\u05EA']]||'secondary'; const due=t['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E2\u05D3']||''; const ov=due&&due<Utils.todayISO()&&t['\u05E1\u05D8\u05D8\u05D5\u05E1']!=='\u05D4\u05D5\u05E9\u05DC\u05DD'; return `<div class="card mb-2 ${ov?'border-danger':''}" style="border-right:4px solid var(--bs-${pc})"><div class="card-body p-2"><div class="d-flex justify-content-between"><h6 class="card-title mb-1 small fw-bold">${t['\u05DB\u05D5\u05EA\u05E8\u05EA']||''}</h6><span class="badge bg-${pc}" style="font-size:9px">${t['\u05E2\u05D3\u05D9\u05E4\u05D5\u05EA']||''}</span></div>${t['\u05EA\u05D9\u05D0\u05D5\u05E8']?`<p class="card-text small text-muted mb-1">${t['\u05EA\u05D9\u05D0\u05D5\u05E8']}</p>`:''}<div class="small text-muted">${t['\u05D0\u05D7\u05E8\u05D0\u05D9']?'<i class="bi bi-person me-1"></i>'+t['\u05D0\u05D7\u05E8\u05D0\u05D9']:''}${due?' <i class="bi bi-calendar ms-1 me-1"></i>'+due:''}</div><div class="mt-1 btn-group btn-group-sm">${t['\u05E1\u05D8\u05D8\u05D5\u05E1']!=='\u05D1\u05EA\u05D4\u05DC\u05D9\u05DA'?`<button class="btn btn-outline-primary" onclick="Pages.moveTask('${t.id||t['\u05DE\u05D6\u05D4\u05D4']}','\u05D1\u05EA\u05D4\u05DC\u05D9\u05DA')"><i class="bi bi-play"></i></button>`:''}${t['\u05E1\u05D8\u05D8\u05D5\u05E1']!=='\u05D4\u05D5\u05E9\u05DC\u05DD'?`<button class="btn btn-outline-success" onclick="Pages.moveTask('${t.id||t['\u05DE\u05D6\u05D4\u05D4']}','\u05D4\u05D5\u05E9\u05DC\u05DD')"><i class="bi bi-check"></i></button>`:''}<button class="btn btn-outline-danger" onclick="Pages.deleteTask('${t.id||t['\u05DE\u05D6\u05D4\u05D4']}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button></div></div></div>`; }).join('');
    document.getElementById('task-new').innerHTML = renderCol(cols['\u05D7\u05D3\u05E9']);
    document.getElementById('task-prog').innerHTML = renderCol(cols['\u05D1\u05EA\u05D4\u05DC\u05D9\u05DA']);
    document.getElementById('task-done').innerHTML = renderCol(cols['\u05D4\u05D5\u05E9\u05DC\u05DD']);
    document.getElementById('task-new-c').textContent = cols['\u05D7\u05D3\u05E9'].length||'';
    document.getElementById('task-prog-c').textContent = cols['\u05D1\u05EA\u05D4\u05DC\u05D9\u05DA'].length||'';
    document.getElementById('task-done-c').textContent = cols['\u05D4\u05D5\u05E9\u05DC\u05DD'].length||'';
  },
  async quickAddTask() { const inp=document.getElementById('quick-task'); const title=(inp?inp.value:'').trim(); if (!title) return; try { await App.apiCall('add','\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA',{row:{'\u05DB\u05D5\u05EA\u05E8\u05EA':title,'\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05D7\u05D3\u05E9','\u05E2\u05D3\u05D9\u05E4\u05D5\u05EA':'\u05E8\u05D2\u05D9\u05DC','\u05EA\u05D0\u05E8\u05D9\u05DA':Utils.todayISO()}}); if (inp) inp.value=''; Utils.toast('\u05DE\u05E9\u05D9\u05DE\u05D4 \u05E0\u05D5\u05E1\u05E4\u05D4'); this.tasksInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); } },
  async moveTask(id, status) { try { await App.apiCall('update','\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA',{id,row:{'\u05E1\u05D8\u05D8\u05D5\u05E1':status}}); Utils.toast('\u05E2\u05D5\u05D3\u05DB\u05DF'); this.tasksInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); } },
  async deleteTask(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4','\u05DC\u05DE\u05D7\u05D5\u05E7 \u05DE\u05E9\u05D9\u05DE\u05D4 \u05D6\u05D5?')) return;
    try { await App.apiCall('delete','\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.tasksInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },

  /* ======================================================================
     CALENDAR
     ====================================================================== */
  calendar() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div class="d-flex gap-2 align-items-center"><button class="btn btn-sm btn-outline-secondary" onclick="Pages.changeMonth(-1)"><i class="bi bi-chevron-right"></i></button><h5 class="mb-0 fw-bold" id="cal-title">--</h5><button class="btn btn-sm btn-outline-secondary" onclick="Pages.changeMonth(1)"><i class="bi bi-chevron-left"></i></button><button class="btn btn-sm btn-outline-primary" onclick="Pages.goToday()">\u05D4\u05D9\u05D5\u05DD</button></div><button class="btn btn-primary btn-sm" onclick="Pages.showAddEvent()"><i class="bi bi-plus-lg me-1"></i>\u05D0\u05D9\u05E8\u05D5\u05E2 \u05D7\u05D3\u05E9</button></div><div class="d-flex gap-2 mb-2 small"><span class="badge bg-primary">\u05D0\u05D9\u05E8\u05D5\u05E2</span><span class="badge bg-danger">\u05D7\u05D2</span><span class="badge bg-success">\u05D7\u05D5\u05E4\u05E9\u05D4</span><span class="badge bg-warning">\u05DE\u05D1\u05D7\u05DF</span></div><div class="card p-0 overflow-hidden"><div class="row g-0 text-center bg-light border-bottom" style="font-weight:600;font-size:13px"><div class="col py-2">\u05E8\u05D0\u05E9\u05D5\u05DF</div><div class="col py-2">\u05E9\u05E0\u05D9</div><div class="col py-2">\u05E9\u05DC\u05D9\u05E9\u05D9</div><div class="col py-2">\u05E8\u05D1\u05D9\u05E2\u05D9</div><div class="col py-2">\u05D7\u05DE\u05D9\u05E9\u05D9</div><div class="col py-2">\u05E9\u05D9\u05E9\u05D9</div><div class="col py-2">\u05E9\u05D1\u05EA</div></div><div id="cal-grid"></div></div><div id="cal-events" class="mt-3"></div><div class="modal fade" id="cal-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">\u05D0\u05D9\u05E8\u05D5\u05E2 \u05D7\u05D3\u05E9</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row g-3"><div class="col-12"><label class="form-label">\u05DB\u05D5\u05EA\u05E8\u05EA</label><input class="form-control" id="cf-title"></div><div class="col-6"><label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA</label><input type="date" class="form-control" id="cf-date"></div><div class="col-6"><label class="form-label">\u05E1\u05D5\u05D2</label><select class="form-select" id="cf-type"><option>\u05D0\u05D9\u05E8\u05D5\u05E2</option><option>\u05D7\u05D2</option><option>\u05D7\u05D5\u05E4\u05E9\u05D4</option><option>\u05DE\u05D1\u05D7\u05DF</option></select></div><div class="col-12"><label class="form-label">\u05D4\u05E2\u05E8\u05D5\u05EA</label><textarea class="form-control" id="cf-notes" rows="2"></textarea></div></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveCalEvent()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
  },
  _calYear: 0, _calMonth: 0, _calEvents: [],
  async calendarInit() { const d=new Date(); this._calYear=d.getFullYear(); this._calMonth=d.getMonth(); this.loadCalendar(); },
  changeMonth(dir) { this._calMonth+=dir; if (this._calMonth>11){this._calMonth=0;this._calYear++;} if(this._calMonth<0){this._calMonth=11;this._calYear--;} this.loadCalendar(); },
  goToday() { const d=new Date(); this._calYear=d.getFullYear(); this._calMonth=d.getMonth(); this.loadCalendar(); },
  async loadCalendar() {
    const months = ['\u05D9\u05E0\u05D5\u05D0\u05E8','\u05E4\u05D1\u05E8\u05D5\u05D0\u05E8','\u05DE\u05E8\u05E5','\u05D0\u05E4\u05E8\u05D9\u05DC','\u05DE\u05D0\u05D9','\u05D9\u05D5\u05E0\u05D9','\u05D9\u05D5\u05DC\u05D9','\u05D0\u05D5\u05D2\u05D5\u05E1\u05D8','\u05E1\u05E4\u05D8\u05DE\u05D1\u05E8','\u05D0\u05D5\u05E7\u05D8\u05D5\u05D1\u05E8','\u05E0\u05D5\u05D1\u05DE\u05D1\u05E8','\u05D3\u05E6\u05DE\u05D1\u05E8'];
    document.getElementById('cal-title').textContent = months[this._calMonth]+' '+this._calYear;
    this._calEvents = await App.getData('\u05DC\u05D5\u05D7_\u05E9\u05E0\u05D4');
    const monthStr = this._calYear+'-'+String(this._calMonth+1).padStart(2,'0');
    const mEvents = this._calEvents.filter(e => (e['\u05EA\u05D0\u05E8\u05D9\u05DA']||'').startsWith(monthStr));
    const evMap = {}; mEvents.forEach(e => { const d=String(e['\u05EA\u05D0\u05E8\u05D9\u05DA']||'').substring(0,10); if (!evMap[d]) evMap[d]=[]; evMap[d].push(e); });
    const first = new Date(this._calYear, this._calMonth, 1); const startDay=first.getDay(); const daysInMonth=new Date(this._calYear,this._calMonth+1,0).getDate(); const today=Utils.todayISO();
    let html='',dayNum=1;
    for (let week=0;week<6;week++) { if (dayNum>daysInMonth&&week>0) break; html+='<div class="row g-0">'; for (let dow=0;dow<7;dow++) { if ((week===0&&dow<startDay)||dayNum>daysInMonth) { html+='<div class="col border-bottom border-end p-2" style="min-height:80px"></div>'; } else { const ds=this._calYear+'-'+String(this._calMonth+1).padStart(2,'0')+'-'+String(dayNum).padStart(2,'0'); const isT=ds===today; const evts=evMap[ds]||[]; html+=`<div class="col border-bottom border-end p-2${isT?' bg-primary bg-opacity-10':''}" style="min-height:80px"><div class="${isT?'badge bg-primary rounded-circle':'fw-bold small'}">${dayNum}</div>`; evts.forEach(e => { const cs={'חג':'danger','חופשה':'success','מבחן':'warning'}; const c=cs[e['\u05E1\u05D5\u05D2']]||'primary'; html+=`<div class="badge bg-${c} text-wrap mb-1" style="font-size:10px">${e['\u05DB\u05D5\u05EA\u05E8\u05EA']||''}</div> `; }); html+='</div>'; dayNum++; } } html+='</div>'; }
    document.getElementById('cal-grid').innerHTML = html;
  },
  showAddEvent() { document.getElementById('cf-date').value = Utils.todayISO(); new bootstrap.Modal(document.getElementById('cal-modal')).show(); },
  async saveCalEvent() { const row = {'\u05DB\u05D5\u05EA\u05E8\u05EA':document.getElementById('cf-title').value.trim(),'\u05EA\u05D0\u05E8\u05D9\u05DA':document.getElementById('cf-date').value,'\u05E1\u05D5\u05D2':document.getElementById('cf-type').value,'\u05D4\u05E2\u05E8\u05D5\u05EA':document.getElementById('cf-notes').value.trim()}; if (!row['\u05DB\u05D5\u05EA\u05E8\u05EA']) { Utils.toast('\u05D7\u05E1\u05E8\u05D4 \u05DB\u05D5\u05EA\u05E8\u05EA','warning'); return; } try { await App.apiCall('add','\u05DC\u05D5\u05D7_\u05E9\u05E0\u05D4',{row}); bootstrap.Modal.getInstance(document.getElementById('cal-modal')).hide(); Utils.toast('\u05D0\u05D9\u05E8\u05D5\u05E2 \u05E0\u05D5\u05E1\u05E3'); this.loadCalendar(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); } },
  async deleteCalEvent(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4','\u05DC\u05DE\u05D7\u05D5\u05E7 \u05D0\u05D9\u05E8\u05D5\u05E2 \u05D6\u05D4?')) return;
    try { await App.apiCall('delete','\u05DC\u05D5\u05D7_\u05E9\u05E0\u05D4',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.loadCalendar(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },

  /* ======================================================================
     COMMUNICATIONS
     ====================================================================== */
  communications() {
    return `<div class="page-header"><h1><i class="bi bi-chat-dots me-2"></i>\u05EA\u05E7\u05E9\u05D5\u05E8\u05EA</h1></div><ul class="nav nav-tabs mb-3"><li class="nav-item"><a class="nav-link active" href="#" onclick="Pages._commTab='history';Pages.renderComm();return false">\u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05E9\u05E0\u05E9\u05DC\u05D7\u05D5</a></li><li class="nav-item"><a class="nav-link" href="#" onclick="Pages._commTab='send';Pages.renderComm();return false">\u05E9\u05DC\u05D7 \u05D4\u05D5\u05D3\u05E2\u05D4</a></li></ul><div id="comm-content">${Utils.skeleton(3)}</div>`;
  },
  _commData: [], _commTab: 'history',
  async communicationsInit() { this._commData = await App.getData('\u05EA\u05E7\u05E9\u05D5\u05E8\u05EA'); this._commTab='history'; this.renderComm(); },
  renderComm() {
    if (this._commTab === 'send') {
      document.getElementById('comm-content').innerHTML = `<div class="card p-3"><div class="mb-3"><label class="form-label">\u05D4\u05D5\u05D3\u05E2\u05D4</label><textarea class="form-control" id="comm-msg" rows="5" placeholder="\u05D4\u05E7\u05DC\u05D3 \u05DB\u05D0\u05DF..."></textarea></div><button class="btn btn-success" onclick="Pages.sendComm()"><i class="bi bi-whatsapp me-1"></i>\u05E9\u05DC\u05D7 \u05DC\u05DB\u05DC \u05D4\u05D4\u05D5\u05E8\u05D9\u05DD</button></div>`;
    } else {
      if (!this._commData.length) { document.getElementById('comm-content').innerHTML = '<div class="empty-state"><i class="bi bi-chat-dots"></i><h5>\u05D0\u05D9\u05DF \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA</h5></div>'; return; }
      document.getElementById('comm-content').innerHTML = `<div class="card"><table class="table table-bht mb-0"><thead><tr><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05E0\u05DE\u05E2\u05E0\u05D9\u05DD</th><th>\u05EA\u05D5\u05DB\u05DF</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th></tr></thead><tbody>${this._commData.map(r => `<tr><td>${r['\u05EA\u05D0\u05E8\u05D9\u05DA']||''}</td><td>${r['\u05E0\u05DE\u05E2\u05E0\u05D9\u05DD']||''}</td><td class="small">${(r['\u05D4\u05D5\u05D3\u05E2\u05D4']||'').substring(0,60)}</td><td><span class="badge bg-${r['\u05E1\u05D8\u05D8\u05D5\u05E1']==='\u05E0\u05E9\u05DC\u05D7'?'success':'secondary'}">${r['\u05E1\u05D8\u05D8\u05D5\u05E1']||'\u05D8\u05D9\u05D5\u05D8\u05D4'}</span></td></tr>`).join('')}</tbody></table></div>`;
    }
  },
  async sendComm() { const msg = document.getElementById('comm-msg')?.value?.trim(); if (!msg) { Utils.toast('\u05D4\u05E7\u05DC\u05D3 \u05D4\u05D5\u05D3\u05E2\u05D4','warning'); return; } const parents = await App.getData('\u05D4\u05D5\u05E8\u05D9\u05DD'); let sent=0; parents.forEach(p => { if (!p['\u05D8\u05DC\u05E4\u05D5\u05DF']) return; window.open(`https://wa.me/972${p['\u05D8\u05DC\u05E4\u05D5\u05DF'].replace(/^0/,'')}?text=${encodeURIComponent(msg)}`,'_blank'); sent++; }); Utils.toast(`${sent} \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05E0\u05E9\u05DC\u05D7\u05D5`); },

  /* ======================================================================
     DOCUMENTS
     ====================================================================== */
  documents() {
    return `<div class="page-header"><h1><i class="bi bi-folder-fill me-2"></i>\u05DE\u05E1\u05DE\u05DB\u05D9\u05DD</h1></div><div id="docs-list">${Utils.skeleton(3)}</div>`;
  },
  async documentsInit() {
    const docs = await App.getData('\u05DE\u05E1\u05DE\u05DB\u05D9_\u05EA\u05DC\u05DE\u05D9\u05D3');
    if (!docs.length) { document.getElementById('docs-list').innerHTML = '<div class="empty-state"><i class="bi bi-folder"></i><h5>\u05D0\u05D9\u05DF \u05DE\u05E1\u05DE\u05DB\u05D9\u05DD</h5></div>'; return; }
    document.getElementById('docs-list').innerHTML = `<div class="card"><table class="table table-bht mb-0"><thead><tr><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th>\u05E1\u05D5\u05D2</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th></tr></thead><tbody>${docs.map(d => `<tr><td>${d['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3']||''}</td><td>${d['\u05E1\u05D5\u05D2_\u05DE\u05E1\u05DE\u05DA']||''}</td><td><span class="badge bg-${d['\u05E1\u05D8\u05D8\u05D5\u05E1']==='\u05D4\u05EA\u05E7\u05D1\u05DC'?'success':'warning'}">${d['\u05E1\u05D8\u05D8\u05D5\u05E1']||''}</span></td><td>${Utils.formatDateShort(d['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05E7\u05D1\u05DC\u05D4'])}</td></tr>`).join('')}</tbody></table></div>`;
  },

  /* ======================================================================
     COMMITTEES
     ====================================================================== */
  committees() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-people me-2"></i>\u05D5\u05E2\u05D3\u05D5\u05EA</h1></div><button class="btn btn-primary btn-sm" onclick="Pages.showAddComm()"><i class="bi bi-plus-lg me-1"></i>\u05D5\u05E2\u05D3\u05D4 \u05D7\u05D3\u05E9\u05D4</button></div><div id="comm-list">${Utils.skeleton(3)}</div><div class="modal fade" id="committee-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">\u05D5\u05E2\u05D3\u05D4 \u05D7\u05D3\u05E9\u05D4</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row g-3"><div class="col-12"><label class="form-label">\u05E9\u05DD</label><input class="form-control" id="cmf-name"></div><div class="col-12"><label class="form-label">\u05D7\u05D1\u05E8\u05D9\u05DD</label><input class="form-control" id="cmf-members" placeholder="\u05E9\u05DE\u05D5\u05EA \u05DE\u05D5\u05E4\u05E8\u05D3\u05D9\u05DD \u05D1\u05E4\u05E1\u05D9\u05E7"></div><div class="col-12"><label class="form-label">\u05EA\u05D9\u05D0\u05D5\u05E8</label><textarea class="form-control" id="cmf-desc" rows="2"></textarea></div></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveCommittee()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
  },
  _commtData: [],
  async committeesInit() { this._commtData = await App.getData('\u05D5\u05E2\u05D3\u05D5\u05EA'); this.renderCommittees(); },
  renderCommittees() {
    if (!this._commtData.length) { document.getElementById('comm-list').innerHTML = '<div class="empty-state"><i class="bi bi-people"></i><h5>\u05D0\u05D9\u05DF \u05D5\u05E2\u05D3\u05D5\u05EA</h5></div>'; return; }
    document.getElementById('comm-list').innerHTML = `<div class="row g-3">${this._commtData.map(c => `<div class="col-md-6"><div class="card p-3"><h6 class="fw-bold"><i class="bi bi-people-fill me-2 text-primary"></i>${c['\u05E9\u05DD']||''}</h6><div class="small text-muted mb-2">${c['\u05EA\u05D9\u05D0\u05D5\u05E8']||''}</div><div class="small"><i class="bi bi-person me-1"></i><strong>\u05D7\u05D1\u05E8\u05D9\u05DD:</strong> ${c['\u05D7\u05D1\u05E8\u05D9\u05DD']||'--'}</div>${c['\u05E4\u05D2\u05D9\u05E9\u05D4_\u05D4\u05D1\u05D0\u05D4']?`<div class="small mt-1"><i class="bi bi-calendar me-1"></i>\u05E4\u05D2\u05D9\u05E9\u05D4 \u05D4\u05D1\u05D0\u05D4: ${c['\u05E4\u05D2\u05D9\u05E9\u05D4_\u05D4\u05D1\u05D0\u05D4']}</div>`:''}</div></div>`).join('')}</div>`;
  },
  showAddComm() { new bootstrap.Modal(document.getElementById('committee-modal')).show(); },
  async saveCommittee() { const row = {'\u05E9\u05DD':document.getElementById('cmf-name').value.trim(),'\u05D7\u05D1\u05E8\u05D9\u05DD':document.getElementById('cmf-members').value.trim(),'\u05EA\u05D9\u05D0\u05D5\u05E8':document.getElementById('cmf-desc').value.trim()}; if (!row['\u05E9\u05DD']) { Utils.toast('\u05D7\u05E1\u05E8 \u05E9\u05DD','warning'); return; } try { await App.apiCall('add','\u05D5\u05E2\u05D3\u05D5\u05EA',{row}); bootstrap.Modal.getInstance(document.getElementById('committee-modal')).hide(); Utils.toast('\u05D5\u05E2\u05D3\u05D4 \u05E0\u05D5\u05E1\u05E4\u05D4'); this.committeesInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); } },
  async deleteCommittee(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4','\u05DC\u05DE\u05D7\u05D5\u05E7 \u05D5\u05E2\u05D3\u05D4 \u05D6\u05D5?')) return;
    try { await App.apiCall('delete','\u05D5\u05E2\u05D3\u05D5\u05EA',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.committeesInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },

  /* ======================================================================
     PETTY CASH
     ====================================================================== */
  pettycash() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-cash-coin me-2"></i>\u05E7\u05D5\u05E4\u05D4 \u05E7\u05D8\u05E0\u05D4</h1></div><button class="btn btn-primary btn-sm" onclick="Pages.showAddPc()"><i class="bi bi-plus-lg me-1"></i>\u05E4\u05E2\u05D5\u05DC\u05D4 \u05D7\u05D3\u05E9\u05D4</button></div><div class="row g-2 mb-3"><div class="col-md-3 col-6"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-success" id="pc-in">\u20AA0</div><small>\u05D4\u05DB\u05E0\u05E1\u05D5\u05EA</small></div></div><div class="col-md-3 col-6"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-danger" id="pc-out">\u20AA0</div><small>\u05D4\u05D5\u05E6\u05D0\u05D5\u05EA</small></div></div><div class="col-md-3 col-6"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-primary" id="pc-balance">\u20AA0</div><small>\u05D9\u05EA\u05E8\u05D4</small></div></div><div class="col-md-3 col-6"><div class="card p-3 text-center"><div class="fs-4 fw-bold" id="pc-count">0</div><small>\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA</small></div></div></div><div id="pc-list">${Utils.skeleton(3)}</div><div class="modal fade" id="pc-modal" tabindex="-1"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">\u05E4\u05E2\u05D5\u05DC\u05D4 \u05D7\u05D3\u05E9\u05D4</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="mb-3"><label class="form-label">\u05E1\u05D5\u05D2</label><select class="form-select" id="pcf-type"><option>\u05D4\u05DB\u05E0\u05E1\u05D4</option><option>\u05D4\u05D5\u05E6\u05D0\u05D4</option></select></div><div class="mb-3"><label class="form-label">\u05EA\u05D9\u05D0\u05D5\u05E8</label><input class="form-control" id="pcf-desc"></div><div class="mb-3"><label class="form-label">\u05E1\u05DB\u05D5\u05DD</label><input type="number" class="form-control" id="pcf-amount"></div></div><div class="modal-footer"><button class="btn btn-secondary btn-sm" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary btn-sm" onclick="Pages.savePc()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
  },
  _pcData: [],
  async pettycashInit() { this._pcData = await App.getData('\u05E7\u05D5\u05E4\u05D4_\u05E7\u05D8\u05E0\u05D4'); this.renderPc(); },
  renderPc() {
    let tIn=0, tOut=0; this._pcData.forEach(r => { const a=parseFloat(r['\u05E1\u05DB\u05D5\u05DD'])||0; if (r['\u05E1\u05D5\u05D2']==='\u05D4\u05DB\u05E0\u05E1\u05D4') tIn+=a; else tOut+=a; });
    document.getElementById('pc-in').textContent = '\u20AA'+tIn.toLocaleString();
    document.getElementById('pc-out').textContent = '\u20AA'+tOut.toLocaleString();
    document.getElementById('pc-balance').textContent = '\u20AA'+(tIn-tOut).toLocaleString();
    document.getElementById('pc-count').textContent = this._pcData.length;
    if (!this._pcData.length) { document.getElementById('pc-list').innerHTML = '<div class="empty-state"><i class="bi bi-cash-coin"></i><h5>\u05D0\u05D9\u05DF \u05E4\u05E2\u05D5\u05DC\u05D5\u05EA</h5></div>'; return; }
    let bal=0; document.getElementById('pc-list').innerHTML = `<div class="card"><table class="table table-bht mb-0"><thead><tr><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05E1\u05D5\u05D2</th><th>\u05EA\u05D9\u05D0\u05D5\u05E8</th><th>\u05E1\u05DB\u05D5\u05DD</th><th>\u05D9\u05EA\u05E8\u05D4</th><th></th></tr></thead><tbody>${this._pcData.map(r => { const a=parseFloat(r['\u05E1\u05DB\u05D5\u05DD'])||0; const pcId=r.id||r['\u05DE\u05D6\u05D4\u05D4']||Utils.rowId(r); if (r['\u05E1\u05D5\u05D2']==='\u05D4\u05DB\u05E0\u05E1\u05D4') bal+=a; else bal-=a; return `<tr><td>${r['\u05EA\u05D0\u05E8\u05D9\u05DA']||''}</td><td><span class="badge ${r['\u05E1\u05D5\u05D2']==='\u05D4\u05DB\u05E0\u05E1\u05D4'?'bg-success':'bg-danger'}">${r['\u05E1\u05D5\u05D2']}</span></td><td>${r['\u05EA\u05D9\u05D0\u05D5\u05E8']||''}</td><td class="fw-bold ${r['\u05E1\u05D5\u05D2']==='\u05D4\u05DB\u05E0\u05E1\u05D4'?'text-success':'text-danger'}">${r['\u05E1\u05D5\u05D2']==='\u05D4\u05DB\u05E0\u05E1\u05D4'?'+':'-'}\u20AA${a}</td><td class="fw-bold">\u20AA${bal}</td><td><button class="btn btn-sm btn-outline-danger" onclick="Pages.deletePc('${pcId}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button></td></tr>`; }).join('')}</tbody></table></div>`;
  },
  showAddPc() { new bootstrap.Modal(document.getElementById('pc-modal')).show(); },
  async savePc() { const row = {'\u05E1\u05D5\u05D2':document.getElementById('pcf-type').value,'\u05EA\u05D9\u05D0\u05D5\u05E8':document.getElementById('pcf-desc').value.trim(),'\u05E1\u05DB\u05D5\u05DD':document.getElementById('pcf-amount').value,'\u05EA\u05D0\u05E8\u05D9\u05DA':Utils.todayISO()}; if (!row['\u05EA\u05D9\u05D0\u05D5\u05E8']||!row['\u05E1\u05DB\u05D5\u05DD']) { Utils.toast('\u05D7\u05E1\u05E8 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD','warning'); return; } try { await App.apiCall('add','\u05E7\u05D5\u05E4\u05D4_\u05E7\u05D8\u05E0\u05D4',{row}); bootstrap.Modal.getInstance(document.getElementById('pc-modal')).hide(); Utils.toast('\u05E4\u05E2\u05D5\u05DC\u05D4 \u05E0\u05D5\u05E1\u05E4\u05D4'); this.pettycashInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); } },
  async deletePc(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4','\u05DC\u05DE\u05D7\u05D5\u05E7 \u05E4\u05E2\u05D5\u05DC\u05D4 \u05D6\u05D5?')) return;
    try { await App.apiCall('delete','\u05E7\u05D5\u05E4\u05D4_\u05E7\u05D8\u05E0\u05D4',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.pettycashInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },

  /* ======================================================================
     TRIPS
     ====================================================================== */
  trips() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-geo-alt-fill me-2"></i>\u05D8\u05D9\u05D5\u05DC\u05D9\u05DD</h1></div><button class="btn btn-primary btn-sm" onclick="Pages.showAddTrip()"><i class="bi bi-plus-lg me-1"></i>\u05D8\u05D9\u05D5\u05DC \u05D7\u05D3\u05E9</button></div><div class="row g-3" id="trip-cards">${Utils.skeleton(3)}</div><div class="modal fade" id="trip-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">\u05D8\u05D9\u05D5\u05DC \u05D7\u05D3\u05E9</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row g-3"><div class="col-12"><label class="form-label">\u05D9\u05E2\u05D3</label><input class="form-control" id="tf-dest"></div><div class="col-6"><label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05EA\u05D7\u05DC\u05D4</label><input type="date" class="form-control" id="tf-start"></div><div class="col-6"><label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA \u05E1\u05D9\u05D5\u05DD</label><input type="date" class="form-control" id="tf-end"></div><div class="col-12"><label class="form-label">\u05EA\u05D9\u05D0\u05D5\u05E8</label><textarea class="form-control" id="tf-desc" rows="2"></textarea></div></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveTrip()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
  },
  _tripData: [],
  async tripsInit() { this._tripData = await App.getData('\u05D8\u05D9\u05D5\u05DC\u05D9\u05DD'); this.renderTrips(); },
  renderTrips() {
    if (!this._tripData.length) { document.getElementById('trip-cards').innerHTML = '<div class="col-12"><div class="empty-state"><i class="bi bi-geo-alt"></i><h5>\u05D0\u05D9\u05DF \u05D8\u05D9\u05D5\u05DC\u05D9\u05DD</h5></div></div>'; return; }
    const stC = {'\u05DE\u05EA\u05D5\u05DB\u05E0\u05DF':'primary','\u05D0\u05D5\u05E9\u05E8':'success','\u05D1\u05D5\u05E6\u05E2':'info','\u05D1\u05D5\u05D8\u05DC':'danger'};
    document.getElementById('trip-cards').innerHTML = this._tripData.map(t => { const tId=t.id||t['\u05DE\u05D6\u05D4\u05D4']||Utils.rowId(t); return `<div class="col-md-6"><div class="card p-3"><div class="d-flex justify-content-between"><h6 class="fw-bold"><i class="bi bi-geo-alt-fill text-primary me-1"></i>${t['\u05D9\u05E2\u05D3']||''}</h6><div class="d-flex align-items-center gap-2"><span class="badge bg-${stC[t['\u05E1\u05D8\u05D8\u05D5\u05E1']]||'secondary'}">${t['\u05E1\u05D8\u05D8\u05D5\u05E1']||''}</span><button class="btn btn-sm btn-outline-danger" onclick="Pages.deleteTrip('${tId}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button></div></div><div class="small text-muted"><i class="bi bi-calendar me-1"></i>${t['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05EA\u05D7\u05DC\u05D4']||''} ${t['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05E1\u05D9\u05D5\u05DD']?' - '+t['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05E1\u05D9\u05D5\u05DD']:''}</div>${t['\u05EA\u05D9\u05D0\u05D5\u05E8']?`<p class="small mb-0 mt-1">${t['\u05EA\u05D9\u05D0\u05D5\u05E8']}</p>`:''}</div></div>`; }).join('');
  },
  showAddTrip() { new bootstrap.Modal(document.getElementById('trip-modal')).show(); },
  async saveTrip() { const row = {'\u05D9\u05E2\u05D3':document.getElementById('tf-dest').value.trim(),'\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05EA\u05D7\u05DC\u05D4':document.getElementById('tf-start').value,'\u05EA\u05D0\u05E8\u05D9\u05DA_\u05E1\u05D9\u05D5\u05DD':document.getElementById('tf-end').value,'\u05EA\u05D9\u05D0\u05D5\u05E8':document.getElementById('tf-desc').value.trim(),'\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05DE\u05EA\u05D5\u05DB\u05E0\u05DF'}; if (!row['\u05D9\u05E2\u05D3']) { Utils.toast('\u05D7\u05E1\u05E8 \u05D9\u05E2\u05D3','warning'); return; } try { await App.apiCall('add','\u05D8\u05D9\u05D5\u05DC\u05D9\u05DD',{row}); bootstrap.Modal.getInstance(document.getElementById('trip-modal')).hide(); Utils.toast('\u05D8\u05D9\u05D5\u05DC \u05E0\u05D5\u05E1\u05E3'); this.tripsInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); } },
  async deleteTrip(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4','\u05DC\u05DE\u05D7\u05D5\u05E7 \u05D8\u05D9\u05D5\u05DC \u05D6\u05D4?')) return;
    try { await App.apiCall('delete','\u05D8\u05D9\u05D5\u05DC\u05D9\u05DD',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.tripsInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },

  /* ======================================================================
     BUDGET
     ====================================================================== */
  budget() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-wallet2 me-2"></i>\u05EA\u05E7\u05E6\u05D9\u05D1</h1></div><button class="btn btn-primary btn-sm" onclick="Pages.showAddBudget()"><i class="bi bi-plus-lg me-1"></i>\u05D4\u05D5\u05E6\u05D0\u05D4 \u05D7\u05D3\u05E9\u05D4</button></div><div class="row g-2 mb-3"><div class="col-md-4"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-danger" id="budg-total">\u20AA0</div><small>\u05E1\u05D4"\u05DB \u05D4\u05D5\u05E6\u05D0\u05D5\u05EA</small></div></div><div class="col-md-4"><div class="card p-3 text-center"><div class="fs-4 fw-bold" id="budg-count">0</div><small>\u05E8\u05E9\u05D5\u05DE\u05D5\u05EA</small></div></div><div class="col-md-4"><div class="card p-3"><canvas id="budg-chart" height="100"></canvas></div></div></div><div id="budg-list">${Utils.skeleton(3)}</div><div class="modal fade" id="budg-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">\u05D4\u05D5\u05E6\u05D0\u05D4 \u05D7\u05D3\u05E9\u05D4</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row g-3"><div class="col-6"><label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA</label><input type="date" class="form-control" id="bgf-date"></div><div class="col-6"><label class="form-label">\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4</label><select class="form-select" id="bgf-cat"><option>\u05E6\u05D9\u05D5\u05D3</option><option>\u05D0\u05D5\u05DB\u05DC</option><option>\u05EA\u05D7\u05D1\u05D5\u05E8\u05D4</option><option>\u05EA\u05D7\u05D6\u05D5\u05E7\u05D4</option><option>\u05D7\u05D9\u05E0\u05D5\u05DA</option><option>\u05D0\u05D7\u05E8</option></select></div><div class="col-12"><label class="form-label">\u05EA\u05D9\u05D0\u05D5\u05E8</label><input class="form-control" id="bgf-desc"></div><div class="col-6"><label class="form-label">\u05E1\u05DB\u05D5\u05DD</label><input type="number" class="form-control" id="bgf-amount"></div><div class="col-6"><label class="form-label">\u05E1\u05E4\u05E7</label><input class="form-control" id="bgf-vendor"></div></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveBudget()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
  },
  _budgData: [],
  async budgetInit() { this._budgData = await App.getData('\u05EA\u05E7\u05E6\u05D9\u05D1'); this.renderBudget(); },
  renderBudget() {
    const total = this._budgData.reduce((s,r)=>s+(parseFloat(r['\u05E1\u05DB\u05D5\u05DD'])||0),0);
    document.getElementById('budg-total').textContent = Utils.formatCurrency(total);
    document.getElementById('budg-count').textContent = this._budgData.length;
    // Category chart
    const cats = {}; this._budgData.forEach(r => { const c=r['\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4']||'\u05D0\u05D7\u05E8'; cats[c]=(cats[c]||0)+(parseFloat(r['\u05E1\u05DB\u05D5\u05DD'])||0); });
    const ctx = document.getElementById('budg-chart');
    if (ctx && Object.keys(cats).length) { App.charts.budg = new Chart(ctx, { type:'doughnut', data:{ labels:Object.keys(cats), datasets:[{data:Object.values(cats), backgroundColor:['#2563eb','#16a34a','#f59e0b','#dc2626','#8b5cf6','#06b6d4'], borderWidth:0}] }, options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{font:{size:10}}}}} }); }
    if (!this._budgData.length) { document.getElementById('budg-list').innerHTML = '<div class="empty-state"><i class="bi bi-wallet2"></i><h5>\u05D0\u05D9\u05DF \u05D4\u05D5\u05E6\u05D0\u05D5\u05EA</h5></div>'; return; }
    let cum=0; document.getElementById('budg-list').innerHTML = `<div class="card"><table class="table table-bht mb-0"><thead><tr><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4</th><th>\u05EA\u05D9\u05D0\u05D5\u05E8</th><th>\u05E1\u05DB\u05D5\u05DD</th><th>\u05DE\u05E6\u05D8\u05D1\u05E8</th><th>\u05E1\u05E4\u05E7</th><th></th></tr></thead><tbody>${this._budgData.map(r => { const a=parseFloat(r['\u05E1\u05DB\u05D5\u05DD'])||0; const bgId=r.id||r['\u05DE\u05D6\u05D4\u05D4']||Utils.rowId(r); cum+=a; return `<tr><td>${r['\u05EA\u05D0\u05E8\u05D9\u05DA']||''}</td><td><span class="badge bg-secondary">${r['\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4']||''}</span></td><td>${r['\u05EA\u05D9\u05D0\u05D5\u05E8']||''}</td><td class="fw-bold text-danger">${Utils.formatCurrency(a)}</td><td class="fw-bold">${Utils.formatCurrency(cum)}</td><td>${r['\u05E1\u05E4\u05E7']||''}</td><td><button class="btn btn-sm btn-outline-danger" onclick="Pages.deleteBudgetItem('${bgId}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button></td></tr>`; }).join('')}</tbody></table></div>`;
  },
  showAddBudget() { document.getElementById('bgf-date').value=Utils.todayISO(); new bootstrap.Modal(document.getElementById('budg-modal')).show(); },
  async saveBudget() { const row={'\u05EA\u05D0\u05E8\u05D9\u05DA':document.getElementById('bgf-date').value,'\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4':document.getElementById('bgf-cat').value,'\u05EA\u05D9\u05D0\u05D5\u05E8':document.getElementById('bgf-desc').value.trim(),'\u05E1\u05DB\u05D5\u05DD':document.getElementById('bgf-amount').value,'\u05E1\u05E4\u05E7':document.getElementById('bgf-vendor').value.trim()}; try { await App.apiCall('add','\u05EA\u05E7\u05E6\u05D9\u05D1',{row}); bootstrap.Modal.getInstance(document.getElementById('budg-modal')).hide(); Utils.toast('\u05D4\u05D5\u05E6\u05D0\u05D4 \u05E0\u05D5\u05E1\u05E4\u05D4'); this.budgetInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); } },
  async deleteBudgetItem(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4','\u05DC\u05DE\u05D7\u05D5\u05E7 \u05E8\u05E9\u05D5\u05DE\u05D4 \u05D6\u05D5?')) return;
    try { await App.apiCall('delete','\u05EA\u05E7\u05E6\u05D9\u05D1',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.budgetInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },

  /* ======================================================================
     MIVTZA (LEARNING CAMPAIGN)
     ====================================================================== */
  mivtza() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-award-fill me-2"></i>\u05DE\u05D1\u05E6\u05E2 \u05DC\u05D9\u05DE\u05D5\u05D3</h1></div><button class="btn btn-primary btn-sm" onclick="Pages.showAddMvz()"><i class="bi bi-plus-lg me-1"></i>\u05D3\u05D9\u05D5\u05D5\u05D7</button></div><div class="card mb-3" id="mvz-leaderboard" style="display:none"><div class="card-body"><h6 class="fw-bold"><i class="bi bi-trophy-fill text-warning me-2"></i>\u05DE\u05D5\u05D1\u05D9\u05DC\u05D9\u05DD</h6><div id="mvz-top"></div></div></div><div id="mvz-list">${Utils.skeleton(3)}</div><div class="modal fade" id="mvz-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">\u05D3\u05D9\u05D5\u05D5\u05D7 \u05DE\u05D1\u05E6\u05E2</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row g-3"><div class="col-12"><label class="form-label">\u05EA\u05DC\u05DE\u05D9\u05D3</label><select class="form-select" id="mvf-student"></select></div><div class="col-6"><label class="form-label">\u05E9\u05D7\u05E8\u05D9\u05EA</label><input type="number" class="form-control" id="mvf-shacharit" value="0"></div><div class="col-6"><label class="form-label">\u05DE\u05E0\u05D7\u05D4</label><input type="number" class="form-control" id="mvf-mincha" value="0"></div><div class="col-6"><label class="form-label">\u05DE\u05E2\u05E8\u05D9\u05D1</label><input type="number" class="form-control" id="mvf-maariv" value="0"></div><div class="col-6"><label class="form-label">\u05DC\u05D9\u05DE\u05D5\u05D3 \u05E2\u05E6\u05DE\u05D9</label><input type="number" class="form-control" id="mvf-self" value="0"></div></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveMvz()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
  },
  _mvzData: [],
  async mivtzaInit() { this._mvzData = await App.getData('\u05DE\u05D1\u05E6\u05E2_\u05DC\u05D9\u05DE\u05D5\u05D3'); this.renderMvz(); },
  renderMvz() {
    const scores = {}; this._mvzData.forEach(r => { const n=r['\u05E9\u05DD']||''; if (!n) return; scores[n]=(scores[n]||0)+(parseFloat(r['\u05E1\u05D4_\u05DB'])||0); });
    const sorted = Object.keys(scores).sort((a,b)=>scores[b]-scores[a]).slice(0,5);
    if (sorted.length) { document.getElementById('mvz-leaderboard').style.display=''; document.getElementById('mvz-top').innerHTML = sorted.map((n,i) => `<div class="d-flex align-items-center gap-2 mb-1"><span class="fw-bold" style="width:25px">${['&#129351;','&#129352;','&#129353;','4','5'][i]}</span><span class="flex-grow-1">${n}</span><span class="badge bg-primary">${scores[n]}</span></div>`).join(''); }
    if (!this._mvzData.length) { document.getElementById('mvz-list').innerHTML = '<div class="empty-state"><i class="bi bi-award"></i><h5>\u05D0\u05D9\u05DF \u05D3\u05D9\u05D5\u05D5\u05D7\u05D9\u05DD</h5></div>'; return; }
    document.getElementById('mvz-list').innerHTML = `<div class="card"><table class="table table-bht mb-0"><thead><tr><th>\u05E9\u05DD</th><th>\u05E9\u05D7\u05E8\u05D9\u05EA</th><th>\u05DE\u05E0\u05D7\u05D4</th><th>\u05DE\u05E2\u05E8\u05D9\u05D1</th><th>\u05DC\u05D9\u05DE\u05D5\u05D3</th><th class="fw-bold">\u05E1\u05D4"\u05DB</th></tr></thead><tbody>${this._mvzData.map(r => `<tr><td class="fw-bold">${r['\u05E9\u05DD']||''}</td><td>${r['\u05E9\u05D7\u05E8\u05D9\u05EA']||0}</td><td>${r['\u05DE\u05E0\u05D7\u05D4']||0}</td><td>${r['\u05DE\u05E2\u05E8\u05D9\u05D1']||0}</td><td>${r['\u05DC\u05D9\u05DE\u05D5\u05D3_\u05E2\u05E6\u05DE\u05D9']||0}</td><td class="fw-bold text-primary">${r['\u05E1\u05D4_\u05DB']||0}</td></tr>`).join('')}</tbody></table></div>`;
  },
  async showAddMvz() { const students = await App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD'); document.getElementById('mvf-student').innerHTML = '<option value="">\u05D1\u05D7\u05E8</option>' + students.map(s=>`<option value="${Utils.rowId(s)}">${Utils.fullName(s)}</option>`).join(''); new bootstrap.Modal(document.getElementById('mvz-modal')).show(); },
  async saveMvz() { const sel=document.getElementById('mvf-student'); const sh=parseInt(document.getElementById('mvf-shacharit').value)||0; const mn=parseInt(document.getElementById('mvf-mincha').value)||0; const ma=parseInt(document.getElementById('mvf-maariv').value)||0; const se=parseInt(document.getElementById('mvf-self').value)||0; const row = {'\u05E9\u05DD':sel.selectedOptions[0]?.text||'','\u05E9\u05D7\u05E8\u05D9\u05EA':sh,'\u05DE\u05E0\u05D7\u05D4':mn,'\u05DE\u05E2\u05E8\u05D9\u05D1':ma,'\u05DC\u05D9\u05DE\u05D5\u05D3_\u05E2\u05E6\u05DE\u05D9':se,'\u05E1\u05D4_\u05DB':sh+mn+ma+se}; try { await App.apiCall('add','\u05DE\u05D1\u05E6\u05E2_\u05DC\u05D9\u05DE\u05D5\u05D3',{row}); bootstrap.Modal.getInstance(document.getElementById('mvz-modal')).hide(); Utils.toast('\u05D3\u05D9\u05D5\u05D5\u05D7 \u05E0\u05E9\u05DE\u05E8'); this.mivtzaInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); } },
  async deleteMvz(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4','\u05DC\u05DE\u05D7\u05D5\u05E7 \u05D3\u05D9\u05D5\u05D5\u05D7 \u05D6\u05D4?')) return;
    try { await App.apiCall('delete','\u05DE\u05D1\u05E6\u05E2_\u05DC\u05D9\u05DE\u05D5\u05D3',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.mivtzaInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },

  /* ======================================================================
     REPORTS
     ====================================================================== */
  reports() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div><h1><i class="bi bi-file-earmark-bar-graph me-2"></i>\u05D3\u05D5\u05D7\u05D5\u05EA</h1></div>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-secondary btn-sm" onclick="window.print()"><i class="bi bi-printer me-1"></i>\u05D4\u05D3\u05E4\u05E1</button>
        </div>
      </div>
      <ul class="nav nav-pills mb-3" id="rpt-tabs">
        <li class="nav-item"><a class="nav-link active" href="#" data-rpt="overview">\u05E1\u05E7\u05D9\u05E8\u05D4 \u05DB\u05DC\u05DC\u05D9\u05EA</a></li>
        <li class="nav-item"><a class="nav-link" href="#" data-rpt="attendance">\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</a></li>
        <li class="nav-item"><a class="nav-link" href="#" data-rpt="finance">\u05DB\u05E1\u05E4\u05D9\u05DD</a></li>
        <li class="nav-item"><a class="nav-link" href="#" data-rpt="behavior">\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</a></li>
        <li class="nav-item"><a class="nav-link" href="#" data-rpt="classes">\u05DB\u05D9\u05EA\u05D5\u05EA</a></li>
      </ul>
      <div id="rpt-content">${Utils.skeleton(3)}</div>`;
  },
  async reportsInit() {
    document.querySelectorAll('#rpt-tabs .nav-link').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('#rpt-tabs .nav-link').forEach(x => x.classList.remove('active'));
        a.classList.add('active');
        this.loadReport(a.dataset.rpt);
      });
    });
    this.loadReport('overview');
  },
  async loadReport(type) {
    const c = document.getElementById('rpt-content');
    c.innerHTML = '<div class="text-center py-5"><div class="spinner-border"></div></div>';

    const [students, att, fin, beh] = await Promise.all([
      App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD').catch(()=>[]),
      App.getData('\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA').catch(()=>[]),
      App.getData('\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3').catch(()=>[]),
      App.getData('\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA').catch(()=>[])
    ]);
    const active = students.filter(s => (s['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') !== '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC');

    if (type === 'overview') {
      const present = att.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1']==='\u05E0\u05D5\u05DB\u05D7').length;
      const absent = att.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1']==='\u05D7\u05D9\u05E1\u05D5\u05E8').length;
      const totalFin = fin.reduce((s,f) => s+(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0), 0);
      const paidFin = fin.filter(f => (f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05E9\u05D5\u05DC\u05DD').reduce((s,f) => s+(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0), 0);
      const posB = beh.filter(b => b['\u05E1\u05D5\u05D2']==='\u05D7\u05D9\u05D5\u05D1\u05D9').length;
      const negB = beh.filter(b => b['\u05E1\u05D5\u05D2']==='\u05E9\u05DC\u05D9\u05DC\u05D9').length;

      c.innerHTML = `
        <div class="row g-3 mb-4">
          <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-primary">${active.length}</div><small>\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05E4\u05E2\u05D9\u05DC\u05D9\u05DD</small></div></div>
          <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-success">${att.length ? Math.round(present/att.length*100) : 0}%</div><small>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05DE\u05DE\u05D5\u05E6\u05E2\u05EA</small></div></div>
          <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-danger">${Utils.formatCurrency(totalFin-paidFin)}</div><small>\u05D7\u05D5\u05D1 \u05E4\u05EA\u05D5\u05D7</small></div></div>
          <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-warning">${posB-negB}</div><small>\u05E0\u05D9\u05E7\u05D5\u05D3 \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA \u05E0\u05D8\u05D5</small></div></div>
        </div>
        <div class="row g-3">
          <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold"><i class="bi bi-bar-chart me-2"></i>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</h6><div style="height:250px"><canvas id="rpt-att-chart"></canvas></div></div></div>
          <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold"><i class="bi bi-pie-chart me-2"></i>\u05DE\u05E6\u05D1 \u05DB\u05E1\u05E4\u05D9</h6><div style="height:250px"><canvas id="rpt-fin-chart"></canvas></div></div></div>
          <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold"><i class="bi bi-star me-2"></i>\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</h6><div style="height:250px"><canvas id="rpt-beh-chart"></canvas></div></div></div>
          <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold"><i class="bi bi-people me-2"></i>\u05DB\u05D9\u05EA\u05D5\u05EA</h6><div style="height:250px"><canvas id="rpt-cls-chart"></canvas></div></div></div>
        </div>`;

      // Attendance bar
      const attCtx = document.getElementById('rpt-att-chart');
      if (attCtx) App.charts.rptAtt = new Chart(attCtx, {type:'bar', data:{labels:['\u05E0\u05D5\u05DB\u05D7','\u05D7\u05D9\u05E1\u05D5\u05E8','\u05D0\u05D9\u05D7\u05D5\u05E8'], datasets:[{data:[present, absent, att.filter(a=>a['\u05E1\u05D8\u05D8\u05D5\u05E1']==='\u05D0\u05D9\u05D7\u05D5\u05E8').length], backgroundColor:['#0f9d58','#ea4335','#f9ab00'], borderRadius:8}]}, options:{responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}}});

      // Finance doughnut
      const finCtx = document.getElementById('rpt-fin-chart');
      if (finCtx) App.charts.rptFin = new Chart(finCtx, {type:'doughnut', data:{labels:['\u05E9\u05D5\u05DC\u05DD','\u05D7\u05D5\u05D1'], datasets:[{data:[paidFin, totalFin-paidFin], backgroundColor:['#0f9d58','#ea4335'], borderWidth:0}]}, options:{responsive:true, maintainAspectRatio:false, cutout:'60%', plugins:{legend:{position:'bottom'}}}});

      // Behavior bar
      const behCtx = document.getElementById('rpt-beh-chart');
      if (behCtx) App.charts.rptBeh = new Chart(behCtx, {type:'bar', data:{labels:['\u05D7\u05D9\u05D5\u05D1\u05D9','\u05E9\u05DC\u05D9\u05DC\u05D9','\u05D4\u05E2\u05E8\u05D4'], datasets:[{data:[posB, negB, beh.filter(b=>b['\u05E1\u05D5\u05D2']==='\u05D4\u05E2\u05E8\u05D4').length], backgroundColor:['#0f9d58','#ea4335','#4285f4'], borderRadius:8}]}, options:{responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}}});

      // Classes pie
      const classes = {}; active.forEach(s => { const cl = s['\u05DB\u05D9\u05EA\u05D4']||'\u05D0\u05D7\u05E8'; classes[cl]=(classes[cl]||0)+1; });
      const clsCtx = document.getElementById('rpt-cls-chart');
      if (clsCtx) App.charts.rptCls = new Chart(clsCtx, {type:'pie', data:{labels:Object.keys(classes), datasets:[{data:Object.values(classes), backgroundColor:['#2563eb','#0f9d58','#f9ab00','#ea4335','#8b5cf6','#06b6d4','#ec4899'], borderWidth:0}]}, options:{responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'bottom'}}}});
    }
    else if (type === 'attendance') {
      // Group by date, last 14 days
      const byDate = {};
      att.forEach(a => { const d = a['\u05EA\u05D0\u05E8\u05D9\u05DA']||''; if (!d) return; if (!byDate[d]) byDate[d]={p:0,a:0,l:0}; if (a['\u05E1\u05D8\u05D8\u05D5\u05E1']==='\u05E0\u05D5\u05DB\u05D7') byDate[d].p++; else if (a['\u05E1\u05D8\u05D8\u05D5\u05E1']==='\u05D7\u05D9\u05E1\u05D5\u05E8') byDate[d].a++; else byDate[d].l++; });
      const dates = Object.keys(byDate).sort().slice(-14);

      // Per student attendance ranking
      const perStudent = {};
      att.forEach(a => { const n = a['\u05E9\u05DD']||a['\u05EA\u05DC\u05DE\u05D9\u05D3']||''; if (!n) return; if (!perStudent[n]) perStudent[n]={p:0,t:0}; perStudent[n].t++; if (a['\u05E1\u05D8\u05D8\u05D5\u05E1']==='\u05E0\u05D5\u05DB\u05D7') perStudent[n].p++; });
      const ranked = Object.keys(perStudent).map(n => ({name:n, pct:perStudent[n].t?Math.round(perStudent[n].p/perStudent[n].t*100):0})).sort((a,b)=>a.pct-b.pct);

      c.innerHTML = `
        <div class="card p-3 mb-3"><h6 class="fw-bold">\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA 14 \u05D9\u05DE\u05D9\u05DD \u05D0\u05D7\u05E8\u05D5\u05E0\u05D9\u05DD</h6><div style="height:300px"><canvas id="rpt-att14"></canvas></div></div>
        <div class="card p-3"><h6 class="fw-bold">\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05D1\u05E1\u05D9\u05DB\u05D5\u05DF (\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05E0\u05DE\u05D5\u05DB\u05D4)</h6>
          ${ranked.filter(r=>r.pct<80).length ? `<table class="table table-sm table-bht"><thead><tr><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th>\u05D0\u05D7\u05D5\u05D6 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</th><th>\u05DE\u05E6\u05D1</th></tr></thead><tbody>${ranked.filter(r=>r.pct<80).map(r => `<tr><td class="fw-bold">${r.name}</td><td>${r.pct}%</td><td><div class="progress" style="height:20px;width:120px"><div class="progress-bar ${r.pct>=60?'bg-warning':'bg-danger'}" style="width:${r.pct}%">${r.pct}%</div></div></td></tr>`).join('')}</tbody></table>` : '<div class="text-success text-center py-3"><i class="bi bi-check-circle me-1"></i>\u05DB\u05DC \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05DE\u05E2\u05DC 80% \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</div>'}
        </div>`;

      const att14Ctx = document.getElementById('rpt-att14');
      if (att14Ctx && dates.length) App.charts.rptAtt14 = new Chart(att14Ctx, {type:'bar', data:{labels:dates.map(d=>d.substring(5)), datasets:[{label:'\u05E0\u05D5\u05DB\u05D7',data:dates.map(d=>byDate[d].p),backgroundColor:'#0f9d58'},{label:'\u05D7\u05D9\u05E1\u05D5\u05E8',data:dates.map(d=>byDate[d].a),backgroundColor:'#ea4335'},{label:'\u05D0\u05D9\u05D7\u05D5\u05E8',data:dates.map(d=>byDate[d].l),backgroundColor:'#f9ab00'}]}, options:{responsive:true, maintainAspectRatio:false, scales:{x:{stacked:true},y:{stacked:true,beginAtZero:true}}, plugins:{legend:{position:'top'}}}});
    }
    else if (type === 'finance') {
      // Monthly breakdown
      const byMonth = {};
      fin.forEach(f => { const m = f['\u05D7\u05D5\u05D3\u05E9']||''; if (!m) return; if (!byMonth[m]) byMonth[m]={total:0,paid:0}; byMonth[m].total += Number(f['\u05E1\u05DB\u05D5\u05DD'])||0; if ((f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05E9\u05D5\u05DC\u05DD') byMonth[m].paid += Number(f['\u05E1\u05DB\u05D5\u05DD'])||0; });
      const months = Object.keys(byMonth).sort().slice(-6);

      c.innerHTML = `
        <div class="row g-3 mb-3">
          <div class="col-md-4"><div class="card p-3 text-center"><div class="fs-3 fw-bold">${Utils.formatCurrency(fin.reduce((s,f)=>s+(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0),0))}</div><small>\u05E1\u05D4"\u05DB</small></div></div>
          <div class="col-md-4"><div class="card p-3 text-center"><div class="fs-3 fw-bold text-success">${Utils.formatCurrency(fin.filter(f=>(f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05E9\u05D5\u05DC\u05DD').reduce((s,f)=>s+(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0),0))}</div><small>\u05E0\u05D2\u05D1\u05D4</small></div></div>
          <div class="col-md-4"><div class="card p-3 text-center"><div class="fs-3 fw-bold text-danger">${Utils.formatCurrency(fin.filter(f=>(f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')!=='\u05E9\u05D5\u05DC\u05DD').reduce((s,f)=>s+(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0),0))}</div><small>\u05D7\u05D5\u05D1</small></div></div>
        </div>
        <div class="card p-3"><h6 class="fw-bold">\u05DE\u05D2\u05DE\u05D4 \u05D7\u05D5\u05D3\u05E9\u05D9\u05EA</h6><div style="height:300px"><canvas id="rpt-fin-monthly"></canvas></div></div>`;

      const fmCtx = document.getElementById('rpt-fin-monthly');
      if (fmCtx && months.length) App.charts.rptFinM = new Chart(fmCtx, {type:'bar', data:{labels:months, datasets:[{label:'\u05D7\u05D9\u05D5\u05D1',data:months.map(m=>byMonth[m].total),backgroundColor:'rgba(37,99,235,.3)',borderColor:'#2563eb',borderWidth:2},{label:'\u05D2\u05D1\u05D9\u05D4',data:months.map(m=>byMonth[m].paid),backgroundColor:'rgba(15,157,88,.3)',borderColor:'#0f9d58',borderWidth:2}]}, options:{responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'top'}}}});
    }
    else if (type === 'behavior') {
      const scores = {};
      beh.forEach(r => { const n = r['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3']||r['\u05E9\u05DD']||r['\u05EA\u05DC\u05DE\u05D9\u05D3']||''; if (!n) return; if (!scores[n]) scores[n]={p:0,n:0}; if (r['\u05E1\u05D5\u05D2']==='\u05D7\u05D9\u05D5\u05D1\u05D9') scores[n].p++; else if (r['\u05E1\u05D5\u05D2']==='\u05E9\u05DC\u05D9\u05DC\u05D9') scores[n].n++; });
      const sorted = Object.keys(scores).map(n => ({name:n, net:scores[n].p-scores[n].n, pos:scores[n].p, neg:scores[n].n})).sort((a,b)=>b.net-a.net);

      c.innerHTML = `
        <div class="card p-3 mb-3"><h6 class="fw-bold">\u05E0\u05D9\u05E7\u05D5\u05D3 \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA \u05DC\u05E4\u05D9 \u05EA\u05DC\u05DE\u05D9\u05D3</h6><div style="height:350px"><canvas id="rpt-beh-rank"></canvas></div></div>
        <div class="card p-3"><h6 class="fw-bold">\u05D8\u05D1\u05DC\u05D4 \u05DE\u05E4\u05D5\u05E8\u05D8\u05EA</h6><table class="table table-sm table-bht"><thead><tr><th>#</th><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th>\u05D7\u05D9\u05D5\u05D1\u05D9</th><th>\u05E9\u05DC\u05D9\u05DC\u05D9</th><th>\u05E0\u05D8\u05D5</th></tr></thead><tbody>${sorted.map((r,i) => `<tr><td>${i+1}</td><td class="fw-bold">${r.name}</td><td class="text-success">${r.pos}</td><td class="text-danger">${r.neg}</td><td class="fw-bold ${r.net>=0?'text-success':'text-danger'}">${r.net>=0?'+':''}${r.net}</td></tr>`).join('')}</tbody></table></div>`;

      const brCtx = document.getElementById('rpt-beh-rank');
      if (brCtx && sorted.length) App.charts.rptBehR = new Chart(brCtx, {type:'bar', data:{labels:sorted.slice(0,15).map(r=>r.name), datasets:[{label:'\u05D7\u05D9\u05D5\u05D1\u05D9',data:sorted.slice(0,15).map(r=>r.pos),backgroundColor:'#0f9d58'},{label:'\u05E9\u05DC\u05D9\u05DC\u05D9',data:sorted.slice(0,15).map(r=>-r.neg),backgroundColor:'#ea4335'}]}, options:{responsive:true, maintainAspectRatio:false, indexAxis:'y', scales:{x:{stacked:true},y:{stacked:true}}, plugins:{legend:{position:'top'}}}});
    }
    else if (type === 'classes') {
      const classes = {};
      active.forEach(s => { const cls = s['\u05DB\u05D9\u05EA\u05D4']||'\u05D0\u05D7\u05E8'; if (!classes[cls]) classes[cls]=[]; classes[cls].push(s); });

      c.innerHTML = `<div class="row g-3">${Object.keys(classes).sort().map(cls => {
        const list = classes[cls];
        return `<div class="col-md-6"><div class="card p-3"><h6 class="fw-bold"><i class="bi bi-people-fill text-primary me-2"></i>\u05DB\u05D9\u05EA\u05D4 ${cls} <span class="badge bg-primary">${list.length}</span></h6><div class="mt-2">${list.map(s => `<div class="d-flex align-items-center gap-2 py-1 border-bottom">${Utils.avatarHTML(Utils.fullName(s),'sm')}<a href="#student/${Utils.rowId(s)}" class="text-decoration-none">${Utils.fullName(s)}</a></div>`).join('')}</div></div></div>`;
      }).join('')}</div>`;
    }
  },

  /* ======================================================================
     INSTITUTIONS
     ====================================================================== */
  institutions() {
    return `<div class="page-header"><h1><i class="bi bi-building me-2"></i>\u05DE\u05E1\u05D2\u05E8\u05D5\u05EA</h1></div><div id="inst-list">${Utils.skeleton(3)}</div>`;
  },
  async institutionsInit() {
    const data = await App.getData('\u05DE\u05E1\u05D2\u05E8\u05D5\u05EA');
    if (!data.length) { document.getElementById('inst-list').innerHTML = '<div class="empty-state"><i class="bi bi-building"></i><h5>\u05D0\u05D9\u05DF \u05DE\u05E1\u05D2\u05E8\u05D5\u05EA</h5></div>'; return; }
    document.getElementById('inst-list').innerHTML = `<div class="row g-3">${data.map(i => `<div class="col-md-6 col-lg-4"><div class="card p-3"><div class="d-flex align-items-center gap-3"><div class="avatar" style="background:${i['\u05E6\u05D1\u05E2']||'#2563eb'}">${(i['\u05E9\u05DD']||'')[0]||'?'}</div><div><h6 class="fw-bold mb-0">${i['\u05E9\u05DD']||''}</h6><small class="text-muted">${i['\u05E7\u05D5\u05D3']||''}</small></div>${Utils.statusBadge(i['\u05E1\u05D8\u05D8\u05D5\u05E1'])}</div>${i['\u05EA\u05D9\u05D0\u05D5\u05E8']?`<p class="small mt-2 mb-0">${i['\u05EA\u05D9\u05D0\u05D5\u05E8']}</p>`:''}</div></div>`).join('')}</div>`;
  },

  /* ======================================================================
     HUB
     ====================================================================== */
  hub() {
    return `<div class="page-header"><h1><i class="bi bi-grid-fill me-2"></i>\u05DE\u05E8\u05DB\u05D6 \u05DE\u05D9\u05D3\u05E2</h1></div><div class="row g-3">${[
      {page:'students',icon:'bi-people-fill',color:'primary',label:'\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD'},
      {page:'staff',icon:'bi-person-badge-fill',color:'success',label:'\u05E6\u05D5\u05D5\u05EA'},
      {page:'parents',icon:'bi-house-heart-fill',color:'warning',label:'\u05D4\u05D5\u05E8\u05D9\u05DD'},
      {page:'attendance',icon:'bi-calendar-check-fill',color:'info',label:'\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA'},
      {page:'finance',icon:'bi-cash-stack',color:'danger',label:'\u05DB\u05E1\u05E4\u05D9\u05DD'},
      {page:'behavior',icon:'bi-star-half',color:'primary',label:'\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA'},
      {page:'homework',icon:'bi-book',color:'success',label:'\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9 \u05D1\u05D9\u05EA'},
      {page:'academics',icon:'bi-journal-text',color:'info',label:'\u05DE\u05D1\u05D7\u05E0\u05D9\u05DD'},
      {page:'tasks',icon:'bi-kanban',color:'warning',label:'\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA'},
      {page:'calendar',icon:'bi-calendar3',color:'primary',label:'\u05DC\u05D5\u05D7 \u05E9\u05E0\u05D4'},
      {page:'reports',icon:'bi-file-earmark-bar-graph',color:'danger',label:'\u05D3\u05D5\u05D7\u05D5\u05EA'},
      {page:'communications',icon:'bi-chat-dots',color:'success',label:'\u05EA\u05E7\u05E9\u05D5\u05E8\u05EA'}
    ].map(p => `<div class="col-6 col-md-4 col-lg-3"><a href="#${p.page}" class="card p-3 text-center text-decoration-none card-clickable"><i class="bi ${p.icon} fs-1 text-${p.color}"></i><div class="fw-bold mt-2">${p.label}</div></a></div>`).join('')}</div>`;
  },
  hubInit() {},

  /* ======================================================================
     AI ASSISTANT
     ====================================================================== */
  ai_assistant() {
    return `<div class="page-header"><h1><i class="bi bi-robot me-2"></i>\u05E2\u05D5\u05D6\u05E8 \u05D7\u05DB\u05DD</h1></div><div class="card p-3"><div class="mb-3" id="ai-chat" style="height:400px;overflow-y:auto;border:1px solid var(--bs-border-color);border-radius:8px;padding:1rem;background:var(--bs-body-bg)"><div class="text-muted text-center py-5"><i class="bi bi-robot fs-1"></i><p>\u05E9\u05D0\u05DC \u05D0\u05D5\u05EA\u05D9 \u05E9\u05D0\u05DC\u05D4 \u05E2\u05DC \u05D4\u05DE\u05D5\u05E1\u05D3</p></div></div><div class="input-group"><input type="text" class="form-control" id="ai-input" placeholder="\u05E9\u05D0\u05DC \u05E9\u05D0\u05DC\u05D4..." onkeydown="if(event.key==='Enter')Pages.sendAi()"><button class="btn btn-primary" onclick="Pages.sendAi()"><i class="bi bi-send"></i></button></div></div>`;
  },
  ai_assistantInit() { document.getElementById('ai-input')?.focus(); },
  async sendAi() {
    const input = document.getElementById('ai-input'); const q = input?.value?.trim(); if (!q) return; input.value = '';
    const chat = document.getElementById('ai-chat');
    chat.innerHTML += `<div class="d-flex justify-content-start mb-2"><div class="badge bg-primary text-wrap p-2" style="max-width:80%">${q}</div></div>`;
    chat.innerHTML += `<div class="d-flex justify-content-end mb-2"><div class="badge bg-secondary text-wrap p-2"><div class="spinner-border spinner-border-sm"></div> \u05D7\u05D5\u05E9\u05D1...</div></div>`;
    chat.scrollTop = chat.scrollHeight;
    // Simulate AI response with summary data
    try {
      const students = await App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
      const response = `\u05D1\u05DE\u05D5\u05E1\u05D3 ${students.length} \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD. \u05D0\u05E0\u05D9 \u05E2\u05D5\u05D6\u05E8 AI \u05DE\u05E7\u05D5\u05DE\u05D9 \u2014 \u05D7\u05D9\u05D1\u05D5\u05E8 \u05DC\u05E9\u05E8\u05EA \u05E0\u05D3\u05E8\u05E9 \u05DC\u05EA\u05E9\u05D5\u05D1\u05D5\u05EA \u05DE\u05DC\u05D0\u05D5\u05EA.`;
      chat.lastElementChild.innerHTML = `<div class="badge bg-secondary text-wrap p-2" style="max-width:80%">${response}</div>`;
    } catch(e) { chat.lastElementChild.innerHTML = `<div class="badge bg-danger text-wrap p-2">\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05E7\u05D1\u05DC\u05EA \u05EA\u05E9\u05D5\u05D1\u05D4</div>`; }
    chat.scrollTop = chat.scrollHeight;
  },

  /* ======================================================================
     FORMS
     ====================================================================== */
  forms() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-ui-checks me-2"></i>\u05D8\u05E4\u05E1\u05D9\u05DD</h1></div><button class="btn btn-primary btn-sm" onclick="Utils.toast('\u05D9\u05E6\u05D9\u05E8\u05EA \u05D8\u05E4\u05E1\u05D9\u05DD \u05D6\u05DE\u05D9\u05E0\u05D4 \u05D1\u05D2\u05E8\u05E1\u05D4 \u05D4\u05DE\u05DC\u05D0\u05D4','info')"><i class="bi bi-plus-lg me-1"></i>\u05D8\u05D5\u05E4\u05E1 \u05D7\u05D3\u05E9</button></div><div id="forms-list">${Utils.skeleton(2)}</div>`;
  },
  async formsInit() {
    const data = await App.getData('\u05D8\u05E4\u05E1\u05D9\u05DD');
    if (!data.length) { document.getElementById('forms-list').innerHTML = '<div class="empty-state"><i class="bi bi-ui-checks"></i><h5>\u05D0\u05D9\u05DF \u05D8\u05E4\u05E1\u05D9\u05DD</h5><p class="text-muted">\u05E6\u05D5\u05E8 \u05D8\u05D5\u05E4\u05E1 \u05D7\u05D3\u05E9 \u05DC\u05D4\u05EA\u05D7\u05D9\u05DC</p></div>'; return; }
    document.getElementById('forms-list').innerHTML = `<div class="row g-3">${data.map(f => `<div class="col-md-6 col-lg-4"><div class="card p-3"><h6 class="fw-bold">${f['\u05DB\u05D5\u05EA\u05E8\u05EA']||''}</h6><p class="small text-muted">${f['\u05EA\u05D9\u05D0\u05D5\u05E8']||''}</p><span class="badge bg-${f['\u05E1\u05D8\u05D8\u05D5\u05E1']==='\u05E4\u05E2\u05D9\u05DC'?'success':'secondary'}">${f['\u05E1\u05D8\u05D8\u05D5\u05E1']||''}</span></div></div>`).join('')}</div>`;
  },

  /* ======================================================================
     HELP
     ====================================================================== */
  help() {
    return `<div class="page-header"><h1><i class="bi bi-question-circle-fill me-2"></i>\u05E2\u05D6\u05E8\u05D4</h1></div>
      <div class="row g-3">
        <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold"><i class="bi bi-keyboard me-2"></i>\u05E7\u05D9\u05E6\u05D5\u05E8\u05D9 \u05DE\u05E7\u05DC\u05D3\u05EA</h6><ul class="small mb-0"><li><strong>P</strong> \u2014 \u05E0\u05D5\u05DB\u05D7</li><li><strong>A</strong> \u2014 \u05D7\u05D9\u05E1\u05D5\u05E8</li><li><strong>L</strong> \u2014 \u05D0\u05D9\u05D7\u05D5\u05E8</li><li><strong>Esc</strong> \u2014 \u05E1\u05D2\u05D5\u05E8 \u05D7\u05DC\u05D5\u05E0\u05D5\u05EA</li></ul></div></div>
        <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold"><i class="bi bi-info-circle me-2"></i>\u05D0\u05D5\u05D3\u05D5\u05EA</h6><ul class="small mb-0"><li>\u05D2\u05E8\u05E1\u05D4: 5.0 (GitHub Pages)</li><li>\u05E4\u05DC\u05D8\u05E4\u05D5\u05E8\u05DE\u05D4: GitHub Pages + Google Sheets API</li><li>\u05DE\u05E4\u05EA\u05D7: \u05D9\u05D5\u05E1\u05E3 \u05E9\u05E0\u05D9\u05D9\u05D3\u05E8</li></ul></div></div>
        <div class="col-12"><div class="card p-3"><h6 class="fw-bold"><i class="bi bi-book me-2"></i>\u05D3\u05E4\u05D9\u05DD \u05D6\u05DE\u05D9\u05E0\u05D9\u05DD</h6><div class="row g-2">${[
          {p:'dashboard',l:'\u05DC\u05D5\u05D7 \u05D1\u05E7\u05E8\u05D4'},{p:'students',l:'\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD'},{p:'staff',l:'\u05E6\u05D5\u05D5\u05EA'},{p:'parents',l:'\u05D4\u05D5\u05E8\u05D9\u05DD'},
          {p:'attendance',l:'\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA'},{p:'behavior',l:'\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA'},{p:'homework',l:'\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9 \u05D1\u05D9\u05EA'},{p:'academics',l:'\u05DE\u05D1\u05D7\u05E0\u05D9\u05DD'},
          {p:'tasks',l:'\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA'},{p:'calendar',l:'\u05DC\u05D5\u05D7 \u05E9\u05E0\u05D4'},{p:'finance',l:'\u05DB\u05E1\u05E4\u05D9\u05DD'},{p:'pettycash',l:'\u05E7\u05D5\u05E4\u05D4 \u05E7\u05D8\u05E0\u05D4'},
          {p:'budget',l:'\u05EA\u05E7\u05E6\u05D9\u05D1'},{p:'trips',l:'\u05D8\u05D9\u05D5\u05DC\u05D9\u05DD'},{p:'mivtza',l:'\u05DE\u05D1\u05E6\u05E2 \u05DC\u05D9\u05DE\u05D5\u05D3'},{p:'reports',l:'\u05D3\u05D5\u05D7\u05D5\u05EA'},
          {p:'rankings',l:'\u05D3\u05D9\u05E8\u05D5\u05D2\u05D9\u05DD'},{p:'communications',l:'\u05EA\u05E7\u05E9\u05D5\u05E8\u05EA'},{p:'documents',l:'\u05DE\u05E1\u05DE\u05DB\u05D9\u05DD'},{p:'committees',l:'\u05D5\u05E2\u05D3\u05D5\u05EA'},
          {p:'institutions',l:'\u05DE\u05E1\u05D2\u05E8\u05D5\u05EA'},{p:'ai_assistant',l:'\u05E2\u05D5\u05D6\u05E8 AI'},{p:'forms',l:'\u05D8\u05E4\u05E1\u05D9\u05DD'},{p:'help',l:'\u05E2\u05D6\u05E8\u05D4'}
        ].map(x => `<div class="col-6 col-md-3"><a href="#${x.p}" class="text-decoration-none small">${x.l}</a></div>`).join('')}</div></div></div>
      </div>`;
  },
  helpInit() {},

  /* ======================================================================
     PHONE DIALER
     ====================================================================== */
  _dialNumber: '',
  phone() {
    const num = this._dialNumber || '';
    return `<div class="page-header"><h1><i class="bi bi-telephone-fill me-2"></i>\u05D8\u05DC\u05E4\u05D5\u05DF</h1></div><div class="row g-4"><div class="col-md-5"><div class="card p-3"><div class="dialer-display" id="dial-display">${num}</div><div class="dialer-grid">${[1,2,3,4,5,6,7,8,9,'*',0,'#'].map(d=>`<button class="dialer-btn" onclick="Pages.dialPress('${d}')">${d}</button>`).join('')}</div><div class="d-flex gap-2 justify-content-center mt-2"><button class="dialer-btn dialer-delete" onclick="Pages.dialBackspace()"><i class="bi bi-backspace"></i></button><button class="dialer-btn dialer-call" onclick="Pages.makeCall()"><i class="bi bi-telephone-fill"></i></button><button class="dialer-btn" onclick="Pages.dialClear()" style="color:var(--bht-danger,#dc3545)"><i class="bi bi-x-lg"></i></button></div></div></div><div class="col-md-7"><div class="card p-3"><h6 class="fw-bold mb-3"><i class="bi bi-people me-2"></i>\u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8</h6><div id="phone-contacts">\u05D8\u05D5\u05E2\u05DF...</div></div></div></div>`;
  },
  async phoneInit() {
    const staff = await App.getData('\u05E6\u05D5\u05D5\u05EA');
    const contacts = staff.filter(s=>s['\u05D8\u05DC\u05E4\u05D5\u05DF']).map(s=>({name:Utils.fullName(s),phone:s['\u05D8\u05DC\u05E4\u05D5\u05DF'],role:s['\u05EA\u05E4\u05E7\u05D9\u05D3']||''}));
    document.getElementById('phone-contacts').innerHTML = contacts.length ? contacts.map(c=>`<div class="d-flex align-items-center gap-3 py-2 border-bottom clickable" onclick="Pages.quickDial('${c.phone}')">${Utils.avatarHTML(c.name,'sm')}<div class="flex-grow-1"><div class="fw-bold small">${c.name}</div><small class="text-muted">${c.role}</small></div><small dir="ltr">${Utils.formatPhone(c.phone)}</small></div>`).join('') : '<div class="text-muted text-center">\u05D0\u05D9\u05DF \u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8</div>';
  },
  dialPress(d) { const el=document.getElementById('dial-display'); el.textContent=(el.textContent||'')+d; },
  dialBackspace() { const el=document.getElementById('dial-display'); el.textContent=(el.textContent||'').slice(0,-1); },
  dialClear() { document.getElementById('dial-display').textContent=''; },
  quickDial(phone) { document.getElementById('dial-display').textContent=phone.replace(/\D/g,''); this.makeCall(); },
  async makeCall() { const number=(document.getElementById('dial-display').textContent||'').replace(/\D/g,''); if (!number||number.length<9) { Utils.toast('\u05DE\u05E1\u05E4\u05E8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF','warning'); return; } try { const resp = await fetch(`http://192.168.1.100:5053/api/call?number=${number}`); if (resp.ok) { Utils.toast(`\u05DE\u05D7\u05D9\u05D9\u05D2 \u05DC${Utils.formatPhone(number)}...`); } else throw new Error(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05D7\u05D9\u05D5\u05D2','danger'); } },

  /* ======================================================================
     CAMERAS
     ====================================================================== */
  cameras() {
    const baseUrl = 'http://192.168.1.100:5051';
    const cams = [{name:'\u05DB\u05E0\u05D9\u05E1\u05D4',path:'/cam/1'},{name:'\u05D7\u05E6\u05E8',path:'/cam/2'},{name:'\u05DB\u05D9\u05EA\u05D4 \u05D0',path:'/cam/3'},{name:'\u05DB\u05D9\u05EA\u05D4 \u05D1',path:'/cam/4'}];
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-camera-video-fill me-2"></i>\u05DE\u05E6\u05DC\u05DE\u05D5\u05EA</h1></div><button class="btn btn-outline-primary btn-sm" onclick="Pages.refreshCameras()"><i class="bi bi-arrow-clockwise me-1"></i>\u05E8\u05E2\u05E0\u05D5\u05DF</button></div><div class="row g-3">${cams.map((c,i)=>`<div class="col-md-6"><div class="camera-feed" id="cam-${i}"><img src="${baseUrl}${c.path}/snapshot?t=${Date.now()}" alt="${c.name}" onerror="this.style.display='none';this.parentElement.innerHTML+='<div class=\\'text-center text-white p-5\\'><i class=\\'bi bi-camera-video-off fs-1\\'></i><br><small>\u05DC\u05D0 \u05D6\u05DE\u05D9\u05DF</small></div>'"><div class="camera-label"><i class="bi bi-circle-fill text-danger me-1" style="font-size:.5rem"></i>${c.name}</div></div></div>`).join('')}</div><div class="card p-3 mt-3"><a href="${baseUrl}" target="_blank" class="btn btn-primary"><i class="bi bi-box-arrow-up-left me-1"></i>\u05E4\u05EA\u05D7 \u05DE\u05E2\u05E8\u05DB\u05EA \u05DE\u05E6\u05DC\u05DE\u05D5\u05EA</a></div>`;
  },
  camerasInit() { this._camInterval = setInterval(() => { if (App.currentPage !== 'cameras') { clearInterval(this._camInterval); return; } document.querySelectorAll('.camera-feed img').forEach(img => { const src=img.src.split('?')[0]; img.src=src+'?t='+Date.now(); }); }, 10000); },
  refreshCameras() { document.querySelectorAll('.camera-feed img').forEach(img => { const src=img.src.split('?')[0]; img.src=src+'?t='+Date.now(); }); Utils.toast('\u05DE\u05E6\u05DC\u05DE\u05D5\u05EA \u05E8\u05D5\u05E2\u05E0\u05E0\u05D5'); },

  /* ======================================================================
     SETTINGS
     ====================================================================== */
  settings() {
    const currentTheme = localStorage.getItem(App.THEME_KEY) || 'light';
    const apiUrl = localStorage.getItem('bht_api_url') || App.API_URL;
    return `<div class="page-header"><h1><i class="bi bi-gear-fill me-2"></i>\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA</h1></div><div class="row g-3">
      <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold mb-3"><i class="bi bi-palette me-2"></i>\u05DE\u05E8\u05D0\u05D4</h6><div class="form-check form-switch mb-3"><input class="form-check-input" type="checkbox" id="set-dark" ${currentTheme==='dark'?'checked':''}><label class="form-check-label" for="set-dark">\u05DE\u05E6\u05D1 \u05DB\u05D4\u05D4</label></div></div></div>
      <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold mb-3"><i class="bi bi-cloud me-2"></i>\u05D7\u05D9\u05D1\u05D5\u05E8 API</h6><div class="mb-3"><label class="form-label">\u05DB\u05EA\u05D5\u05D1\u05EA API</label><input type="url" class="form-control" id="set-api" value="${apiUrl}" dir="ltr"></div><button class="btn btn-primary btn-sm" onclick="Pages.saveApiUrl()"><i class="bi bi-check me-1"></i>\u05E9\u05DE\u05D5\u05E8</button></div></div>
      <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold mb-3"><i class="bi bi-database me-2"></i>\u05DE\u05D8\u05DE\u05D5\u05DF</h6><button class="btn btn-outline-warning btn-sm" onclick="Pages.clearCache()"><i class="bi bi-trash me-1"></i>\u05E0\u05E7\u05D4 \u05DE\u05D8\u05DE\u05D5\u05DF</button></div></div>
      <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold mb-3"><i class="bi bi-shield-lock me-2"></i>\u05D0\u05D1\u05D8\u05D7\u05D4</h6><div class="mb-3"><label class="form-label">\u05E7\u05D5\u05D3 PIN \u05D7\u05D3\u05E9</label><input type="password" class="form-control" id="set-pin" maxlength="6" inputmode="numeric"></div><button class="btn btn-primary btn-sm" onclick="Pages.changePin()"><i class="bi bi-key me-1"></i>\u05E2\u05D3\u05DB\u05D5\u05DF</button></div></div>
      <div class="col-12"><div class="card p-3"><h6 class="fw-bold mb-3"><i class="bi bi-info-circle me-2"></i>\u05DE\u05D9\u05D3\u05E2 \u05DE\u05E2\u05E8\u05DB\u05EA</h6><div class="row g-2 small"><div class="col-sm-6"><strong>\u05D2\u05E8\u05E1\u05D4:</strong> 5.0</div><div class="col-sm-6"><strong>\u05E4\u05DC\u05D8\u05E4\u05D5\u05E8\u05DE\u05D4:</strong> GitHub Pages + Google Sheets</div><div class="col-sm-6"><strong>\u05DE\u05D5\u05E1\u05D3:</strong> \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3</div><div class="col-sm-6"><strong>\u05DE\u05E4\u05EA\u05D7:</strong> \u05D9\u05D5\u05E1\u05E3 \u05E9\u05E0\u05D9\u05D9\u05D3\u05E8</div></div></div></div></div>`;
  },
  settingsInit() { document.getElementById('set-dark').addEventListener('change', (e) => { localStorage.setItem(App.THEME_KEY, e.target.checked ? 'dark' : 'light'); App.applyTheme(); }); },
  saveApiUrl() { const url=document.getElementById('set-api').value.trim(); if (!url) { Utils.toast('\u05D7\u05E1\u05E8\u05D4 \u05DB\u05EA\u05D5\u05D1\u05EA','warning'); return; } localStorage.setItem('bht_api_url',url); App.API_URL=url; Utils.toast('API \u05E2\u05D5\u05D3\u05DB\u05DF'); },
  clearCache() { Object.keys(localStorage).forEach(k => { if (k.startsWith(App.CACHE_PREFIX)) localStorage.removeItem(k); }); Utils.toast('\u05DE\u05D8\u05DE\u05D5\u05DF \u05E0\u05D5\u05E7\u05D4'); },
  changePin() { const pin=document.getElementById('set-pin').value.trim(); if (pin.length<4) { Utils.toast('\u05D4\u05E7\u05D5\u05D3 \u05D7\u05D9\u05D9\u05D1 4-6 \u05E1\u05E4\u05E8\u05D5\u05EA','warning'); return; } localStorage.setItem(App.PIN_KEY, Utils.hashPin(pin)); document.getElementById('set-pin').value=''; Utils.toast('PIN \u05E2\u05D5\u05D3\u05DB\u05DF'); },

  /* ======================================================================
     STAFF SALARY
     ====================================================================== */
  staff_salary() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-cash-stack me-2"></i>\u05E9\u05DB\u05E8 \u05E6\u05D5\u05D5\u05EA</h1></div><button class="btn btn-primary btn-sm" onclick="Pages.showAddSalary()"><i class="bi bi-plus-lg me-1"></i>\u05EA\u05E9\u05DC\u05D5\u05DD \u05D7\u05D3\u05E9</button></div><div class="row g-3 mb-3"><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold" id="sal-total">\u20AA0</div><small class="text-muted">\u05E1\u05D4"\u05DB \u05DE\u05E9\u05DB\u05D5\u05E8\u05D5\u05EA</small></div></div><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-success" id="sal-paid">\u20AA0</div><small class="text-muted">\u05E9\u05D5\u05DC\u05DD</small></div></div><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-danger" id="sal-pending">\u20AA0</div><small class="text-muted">\u05DC\u05EA\u05E9\u05DC\u05D5\u05DD</small></div></div><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-primary" id="sal-count">0</div><small class="text-muted">\u05E8\u05E9\u05D5\u05DE\u05D5\u05EA</small></div></div></div><div class="card p-3 mb-3"><div class="row g-2"><div class="col-md-4"><input type="month" class="form-control" id="sal-month"></div><div class="col-md-4"><div class="search-box"><i class="bi bi-search"></i><input type="text" class="form-control" id="sal-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05E2\u05D5\u05D1\u05D3..."></div></div></div></div><div id="sal-list">${Utils.skeleton(4)}</div><div class="modal fade" id="sal-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">\u05EA\u05E9\u05DC\u05D5\u05DD \u05D7\u05D3\u05E9</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row g-3"><div class="col-12"><label class="form-label">\u05E2\u05D5\u05D1\u05D3</label><select class="form-select" id="salf-staff"></select></div><div class="col-6"><label class="form-label">\u05D7\u05D5\u05D3\u05E9</label><input type="month" class="form-control" id="salf-month"></div><div class="col-6"><label class="form-label">\u05E1\u05DB\u05D5\u05DD</label><input type="number" class="form-control" id="salf-amount"></div><div class="col-12"><label class="form-label">\u05D4\u05E2\u05E8\u05D5\u05EA</label><input class="form-control" id="salf-notes"></div></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveSalary()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
  },
  _salData: [],
  async staff_salaryInit() {
    this._salData = await App.getData('\u05E9\u05DB\u05E8_\u05E6\u05D5\u05D5\u05EA');
    const d = new Date(); document.getElementById('sal-month').value = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    document.getElementById('sal-month').addEventListener('change', () => this.renderSalary());
    document.getElementById('sal-search').addEventListener('input', Utils.debounce(() => this.renderSalary(), 200));
    this.renderSalary();
  },
  renderSalary() {
    const month = document.getElementById('sal-month')?.value||'';
    const search = (document.getElementById('sal-search')?.value||'').trim().toLowerCase();
    let filtered = (this._salData||[]).filter(r => {
      if (month && !(r['\u05D7\u05D5\u05D3\u05E9']||'').startsWith(month)) return false;
      if (search && !(r['\u05E9\u05DD']||'').toLowerCase().includes(search)) return false;
      return true;
    });
    const total = filtered.reduce((s,r)=>s+(parseFloat(r['\u05E1\u05DB\u05D5\u05DD'])||0),0);
    const paid = filtered.filter(r=>(r['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05E9\u05D5\u05DC\u05DD').reduce((s,r)=>s+(parseFloat(r['\u05E1\u05DB\u05D5\u05DD'])||0),0);
    document.getElementById('sal-total').textContent = Utils.formatCurrency(total);
    document.getElementById('sal-paid').textContent = Utils.formatCurrency(paid);
    document.getElementById('sal-pending').textContent = Utils.formatCurrency(total-paid);
    document.getElementById('sal-count').textContent = filtered.length;
    if (!filtered.length) { document.getElementById('sal-list').innerHTML = '<div class="empty-state"><i class="bi bi-cash-stack"></i><h5>\u05D0\u05D9\u05DF \u05DE\u05E9\u05DB\u05D5\u05E8\u05D5\u05EA</h5></div>'; return; }
    document.getElementById('sal-list').innerHTML = `<div class="card"><table class="table table-bht mb-0"><thead><tr><th>\u05E2\u05D5\u05D1\u05D3</th><th>\u05D7\u05D5\u05D3\u05E9</th><th>\u05E1\u05DB\u05D5\u05DD</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th><th>\u05D4\u05E2\u05E8\u05D5\u05EA</th><th>\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA</th></tr></thead><tbody>${filtered.map(r => {const isPaid=(r['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05E9\u05D5\u05DC\u05DD'; return `<tr><td><div class="d-flex align-items-center gap-2">${Utils.avatarHTML(r['\u05E9\u05DD']||'','sm')}<span class="fw-bold">${r['\u05E9\u05DD']||''}</span></div></td><td>${r['\u05D7\u05D5\u05D3\u05E9']||''}</td><td class="fw-bold">${Utils.formatCurrency(parseFloat(r['\u05E1\u05DB\u05D5\u05DD'])||0)}</td><td><span class="badge bg-${isPaid?'success':'warning'}">${r['\u05E1\u05D8\u05D8\u05D5\u05E1']||'\u05DC\u05EA\u05E9\u05DC\u05D5\u05DD'}</span></td><td class="small">${r['\u05D4\u05E2\u05E8\u05D5\u05EA']||''}</td><td>${!isPaid?`<button class="btn btn-sm btn-outline-success" onclick="Pages.markSalPaid('${Utils.rowId(r)}')"><i class="bi bi-check-lg"></i></button>`:''}</td></tr>`}).join('')}</tbody></table></div>`;
  },
  async showAddSalary() {
    const staff = await App.getData('\u05E6\u05D5\u05D5\u05EA');
    document.getElementById('salf-staff').innerHTML = '<option value="">\u05D1\u05D7\u05E8</option>' + staff.map(s=>`<option value="${Utils.rowId(s)}">${Utils.fullName(s)}</option>`).join('');
    const d=new Date(); document.getElementById('salf-month').value=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    new bootstrap.Modal(document.getElementById('sal-modal')).show();
  },
  async saveSalary() {
    const sel=document.getElementById('salf-staff');
    const row = {'\u05E9\u05DD':sel.selectedOptions[0]?.text||'','\u05D7\u05D5\u05D3\u05E9':document.getElementById('salf-month').value,'\u05E1\u05DB\u05D5\u05DD':document.getElementById('salf-amount').value,'\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05DC\u05EA\u05E9\u05DC\u05D5\u05DD','\u05D4\u05E2\u05E8\u05D5\u05EA':document.getElementById('salf-notes').value.trim()};
    if (!row['\u05E9\u05DD']||!row['\u05E1\u05DB\u05D5\u05DD']) { Utils.toast('\u05D7\u05E1\u05E8 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD','warning'); return; }
    try { await App.apiCall('add','\u05E9\u05DB\u05E8_\u05E6\u05D5\u05D5\u05EA',{row}); bootstrap.Modal.getInstance(document.getElementById('sal-modal')).hide(); Utils.toast('\u05DE\u05E9\u05DB\u05D5\u05E8\u05EA \u05E0\u05D5\u05E1\u05E4\u05D4'); this.staff_salaryInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },
  async markSalPaid(id) { try { await App.apiCall('update','\u05E9\u05DB\u05E8_\u05E6\u05D5\u05D5\u05EA',{id,row:{'\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05E9\u05D5\u05DC\u05DD'}}); Utils.toast('\u05E1\u05D5\u05DE\u05DF \u05DB\u05E9\u05D5\u05DC\u05DD'); this.staff_salaryInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); } },

  /* ======================================================================
     MEDICAL
     ====================================================================== */
  medical() {
    return `<div class="page-header"><h1><i class="bi bi-heart-pulse me-2"></i>\u05DE\u05D9\u05D3\u05E2 \u05E8\u05E4\u05D5\u05D0\u05D9</h1></div><div class="card p-3 mb-3"><div class="search-box"><i class="bi bi-search"></i><input type="text" class="form-control" id="med-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05EA\u05DC\u05DE\u05D9\u05D3..."></div></div><div id="med-list">${Utils.skeleton(3)}</div>`;
  },
  _medData: [],
  async medicalInit() {
    const students = await App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
    const medical = await App.getData('\u05DE\u05D9\u05D3\u05E2_\u05E8\u05E4\u05D5\u05D0\u05D9');
    this._medData = students.filter(s=>(s['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')!=='\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC').map(s => {
      const name = Utils.fullName(s); const sid = Utils.rowId(s);
      const med = medical.find(m => String(m['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4']||'') === String(sid));
      return { name, id: sid, cls: s['\u05DB\u05D9\u05EA\u05D4']||'', med };
    });
    document.getElementById('med-search').addEventListener('input', Utils.debounce(() => this.renderMedical(), 200));
    this.renderMedical();
  },
  renderMedical() {
    const search = (document.getElementById('med-search')?.value||'').trim().toLowerCase();
    const filtered = this._medData.filter(r => !search || r.name.toLowerCase().includes(search));
    if (!filtered.length) { document.getElementById('med-list').innerHTML = '<div class="empty-state"><i class="bi bi-heart-pulse"></i><h5>\u05D0\u05D9\u05DF \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</h5></div>'; return; }
    document.getElementById('med-list').innerHTML = `<div class="row g-3">${filtered.map(r => {
      const m = r.med;
      const hasMed = m && (m['\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA']||m['\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA']||m['\u05D4\u05E2\u05E8\u05D5\u05EA']);
      return `<div class="col-md-6"><div class="card p-3 ${hasMed?'medical-card':''}"><div class="d-flex align-items-center gap-3 mb-2">${Utils.avatarHTML(r.name)}<div><div class="fw-bold">${r.name}</div><small class="text-muted">\u05DB\u05D9\u05EA\u05D4 ${r.cls}</small></div>${hasMed?'<span class="badge bg-danger ms-auto">\u05DE\u05D9\u05D3\u05E2 \u05E8\u05E4\u05D5\u05D0\u05D9</span>':'<span class="badge bg-success ms-auto">\u05EA\u05E7\u05D9\u05DF</span>'}</div>${hasMed?`<div class="small">${m['\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA']?`<div><i class="bi bi-exclamation-triangle text-warning me-1"></i><strong>\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA:</strong> ${m['\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA']}</div>`:''}${m['\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA']?`<div><i class="bi bi-capsule text-primary me-1"></i><strong>\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA:</strong> ${m['\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA']}</div>`:''}${m['\u05D4\u05E2\u05E8\u05D5\u05EA']?`<div><i class="bi bi-info-circle text-info me-1"></i>${m['\u05D4\u05E2\u05E8\u05D5\u05EA']}</div>`:''}</div>`:''}</div></div>`;
    }).join('')}</div>`;
  },

  /* ======================================================================
     SCHEDULE (WEEKLY GRID)
     ====================================================================== */
  schedule() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-table me-2"></i>\u05DE\u05E2\u05E8\u05DB\u05EA \u05E9\u05E2\u05D5\u05EA</h1></div><div class="d-flex gap-2"><select class="form-select form-select-sm" id="sch-class" style="width:150px"><option value="">\u05DB\u05DC \u05D4\u05DB\u05D9\u05EA\u05D5\u05EA</option></select><button class="btn btn-primary btn-sm" onclick="Pages.showAddLesson()"><i class="bi bi-plus-lg me-1"></i>\u05E9\u05D9\u05E2\u05D5\u05E8</button></div></div><div id="sch-grid" class="card p-0 overflow-auto">${Utils.skeleton(3)}</div><div class="modal fade" id="sch-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">\u05E9\u05D9\u05E2\u05D5\u05E8 \u05D7\u05D3\u05E9</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row g-3"><div class="col-6"><label class="form-label">\u05D9\u05D5\u05DD</label><select class="form-select" id="schf-day"><option>\u05E8\u05D0\u05E9\u05D5\u05DF</option><option>\u05E9\u05E0\u05D9</option><option>\u05E9\u05DC\u05D9\u05E9\u05D9</option><option>\u05E8\u05D1\u05D9\u05E2\u05D9</option><option>\u05D7\u05DE\u05D9\u05E9\u05D9</option><option>\u05E9\u05D9\u05E9\u05D9</option></select></div><div class="col-6"><label class="form-label">\u05E9\u05E2\u05D4</label><select class="form-select" id="schf-hour">${[1,2,3,4,5,6,7,8].map(h=>`<option>\u05E9\u05E2\u05D4 ${h}</option>`).join('')}</select></div><div class="col-6"><label class="form-label">\u05DE\u05E7\u05E6\u05D5\u05E2</label><input class="form-control" id="schf-subject"></div><div class="col-6"><label class="form-label">\u05DE\u05DC\u05DE\u05D3</label><input class="form-control" id="schf-teacher"></div><div class="col-6"><label class="form-label">\u05DB\u05D9\u05EA\u05D4</label><input class="form-control" id="schf-class"></div><div class="col-6"><label class="form-label">\u05D7\u05D3\u05E8</label><input class="form-control" id="schf-room"></div></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveLesson()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
  },
  _schData: [],
  async scheduleInit() {
    this._schData = await App.getData('\u05DE\u05E2\u05E8\u05DB\u05EA_\u05E9\u05E2\u05D5\u05EA');
    const classes = [...new Set(this._schData.map(l=>l['\u05DB\u05D9\u05EA\u05D4']).filter(Boolean))].sort();
    const sel = document.getElementById('sch-class');
    classes.forEach(c => sel.insertAdjacentHTML('beforeend',`<option value="${c}">${c}</option>`));
    sel.addEventListener('change', () => this.renderSchedule());
    this.renderSchedule();
  },
  renderSchedule() {
    const clsF = document.getElementById('sch-class')?.value||'';
    const filtered = clsF ? this._schData.filter(l=>(l['\u05DB\u05D9\u05EA\u05D4']||'')===clsF) : this._schData;
    const days = ['\u05E8\u05D0\u05E9\u05D5\u05DF','\u05E9\u05E0\u05D9','\u05E9\u05DC\u05D9\u05E9\u05D9','\u05E8\u05D1\u05D9\u05E2\u05D9','\u05D7\u05DE\u05D9\u05E9\u05D9','\u05E9\u05D9\u05E9\u05D9'];
    const hours = ['\u05E9\u05E2\u05D4 1','\u05E9\u05E2\u05D4 2','\u05E9\u05E2\u05D4 3','\u05E9\u05E2\u05D4 4','\u05E9\u05E2\u05D4 5','\u05E9\u05E2\u05D4 6','\u05E9\u05E2\u05D4 7','\u05E9\u05E2\u05D4 8'];
    let html = '<table class="table table-sm table-bordered mb-0" style="font-size:.8rem"><thead><tr><th class="text-center" style="width:80px">\u05E9\u05E2\u05D4</th>';
    days.forEach(d => html+=`<th class="text-center">${d}</th>`);
    html += '</tr></thead><tbody>';
    hours.forEach(h => {
      html += `<tr><td class="fw-bold text-center bg-light">${h}</td>`;
      days.forEach(d => {
        const lesson = filtered.find(l => (l['\u05D9\u05D5\u05DD']||'')===d && (l['\u05E9\u05E2\u05D4']||'')===h);
        if (lesson) {
          const colors = ['#e3f2fd','#e8f5e9','#fff3e0','#fce4ec','#f3e5f5','#e0f2f1'];
          const bg = colors[Math.abs((lesson['\u05DE\u05E7\u05E6\u05D5\u05E2']||'').charCodeAt(0))%colors.length];
          html += `<td class="schedule-cell" style="background:${bg}"><div class="fw-bold">${lesson['\u05DE\u05E7\u05E6\u05D5\u05E2']||''}</div><div class="text-muted" style="font-size:.7rem">${lesson['\u05DE\u05DC\u05DE\u05D3']||''}</div>${lesson['\u05D7\u05D3\u05E8']?`<span class="badge bg-secondary">${lesson['\u05D7\u05D3\u05E8']}</span>`:''}</td>`;
        } else {
          html += '<td class="schedule-cell text-center text-muted">-</td>';
        }
      });
      html += '</tr>';
    });
    html += '</tbody></table>';
    document.getElementById('sch-grid').innerHTML = html;
  },
  showAddLesson() { new bootstrap.Modal(document.getElementById('sch-modal')).show(); },
  async saveLesson() {
    const row = {'\u05D9\u05D5\u05DD':document.getElementById('schf-day').value,'\u05E9\u05E2\u05D4':document.getElementById('schf-hour').value,'\u05DE\u05E7\u05E6\u05D5\u05E2':document.getElementById('schf-subject').value.trim(),'\u05DE\u05DC\u05DE\u05D3':document.getElementById('schf-teacher').value.trim(),'\u05DB\u05D9\u05EA\u05D4':document.getElementById('schf-class').value.trim(),'\u05D7\u05D3\u05E8':document.getElementById('schf-room').value.trim()};
    if (!row['\u05DE\u05E7\u05E6\u05D5\u05E2']) { Utils.toast('\u05D7\u05E1\u05E8 \u05DE\u05E7\u05E6\u05D5\u05E2','warning'); return; }
    try { await App.apiCall('add','\u05DE\u05E2\u05E8\u05DB\u05EA_\u05E9\u05E2\u05D5\u05EA',{row}); bootstrap.Modal.getInstance(document.getElementById('sch-modal')).hide(); Utils.toast('\u05E9\u05D9\u05E2\u05D5\u05E8 \u05E0\u05D5\u05E1\u05E3'); this.scheduleInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },

  /* ======================================================================
     USER MANAGEMENT
     ====================================================================== */
  user_management() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-shield-lock me-2"></i>\u05E0\u05D9\u05D4\u05D5\u05DC \u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD</h1></div><button class="btn btn-primary btn-sm" onclick="Pages.showAddUser()"><i class="bi bi-person-plus me-1"></i>\u05DE\u05E9\u05EA\u05DE\u05E9 \u05D7\u05D3\u05E9</button></div><div class="row g-3 mb-3"><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-primary" id="um-total">0</div><small>\u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD</small></div></div><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-danger" id="um-admin">0</div><small>\u05DE\u05E0\u05D4\u05DC\u05D9\u05DD</small></div></div><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-success" id="um-teacher">0</div><small>\u05DE\u05DC\u05DE\u05D3\u05D9\u05DD</small></div></div><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-warning" id="um-parent">0</div><small>\u05D4\u05D5\u05E8\u05D9\u05DD</small></div></div></div><div id="um-list">${Utils.skeleton(3)}</div><div class="modal fade" id="um-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="um-modal-title">\u05DE\u05E9\u05EA\u05DE\u05E9 \u05D7\u05D3\u05E9</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row g-3"><div class="col-12"><label class="form-label">\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC</label><input type="email" class="form-control" id="umf-email" dir="ltr"></div><div class="col-6"><label class="form-label">\u05EA\u05E4\u05E7\u05D9\u05D3</label><select class="form-select" id="umf-role"><option value="admin">\u05DE\u05E0\u05D4\u05DC</option><option value="secretary">\u05DE\u05D6\u05DB\u05D9\u05E8\u05D5\u05EA</option><option value="teacher" selected>\u05DE\u05DC\u05DE\u05D3</option><option value="parent">\u05D4\u05D5\u05E8\u05D4</option></select></div><div class="col-6"><label class="form-label">\u05E1\u05D9\u05E1\u05DE\u05D4</label><input type="password" class="form-control" id="umf-password"></div></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveUser()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
  },
  _umData: [],
  async user_managementInit() {
    this._umData = await App.getData('\u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD');
    this.renderUsers();
  },
  renderUsers() {
    const data = this._umData||[];
    document.getElementById('um-total').textContent = data.length;
    document.getElementById('um-admin').textContent = data.filter(u=>(u['\u05EA\u05E4\u05E7\u05D9\u05D3']||'').includes('admin')).length;
    document.getElementById('um-teacher').textContent = data.filter(u=>(u['\u05EA\u05E4\u05E7\u05D9\u05D3']||'').includes('teacher')).length;
    document.getElementById('um-parent').textContent = data.filter(u=>(u['\u05EA\u05E4\u05E7\u05D9\u05D3']||'').includes('parent')).length;
    const roleLabels = {admin:'\u05DE\u05E0\u05D4\u05DC',secretary:'\u05DE\u05D6\u05DB\u05D9\u05E8\u05D5\u05EA',teacher:'\u05DE\u05DC\u05DE\u05D3',parent:'\u05D4\u05D5\u05E8\u05D4'};
    const roleColors = {admin:'danger',secretary:'primary',teacher:'success',parent:'warning'};
    if (!data.length) { document.getElementById('um-list').innerHTML = '<div class="empty-state"><i class="bi bi-shield-lock"></i><h5>\u05D0\u05D9\u05DF \u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD</h5></div>'; return; }
    document.getElementById('um-list').innerHTML = `<div class="card"><table class="table table-bht mb-0"><thead><tr><th>\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC</th><th>\u05EA\u05E4\u05E7\u05D9\u05D3</th><th>\u05DB\u05E0\u05D9\u05E1\u05D4 \u05D0\u05D7\u05E8\u05D5\u05E0\u05D4</th><th>\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA</th></tr></thead><tbody>${data.map(u => {const role=u['\u05EA\u05E4\u05E7\u05D9\u05D3']||'teacher'; return `<tr><td class="fw-bold">${u['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC']||u['\u05E9\u05DD']||''}</td><td><span class="badge bg-${roleColors[role]||'secondary'}">${roleLabels[role]||role}</span></td><td class="small text-muted">${u['\u05DB\u05E0\u05D9\u05E1\u05D4_\u05D0\u05D7\u05E8\u05D5\u05E0\u05D4']||'--'}</td><td><button class="btn btn-sm btn-outline-danger" onclick="Pages.removeUser('${Utils.rowId(u)}')"><i class="bi bi-trash"></i></button></td></tr>`}).join('')}</tbody></table></div>`;
  },
  showAddUser() { document.getElementById('um-modal-title').textContent = '\u05DE\u05E9\u05EA\u05DE\u05E9 \u05D7\u05D3\u05E9'; new bootstrap.Modal(document.getElementById('um-modal')).show(); },
  async saveUser() {
    const row = {'\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC':document.getElementById('umf-email').value.trim(),'\u05EA\u05E4\u05E7\u05D9\u05D3':document.getElementById('umf-role').value,'\u05E1\u05D9\u05E1\u05DE\u05D4':document.getElementById('umf-password').value};
    if (!row['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC']) { Utils.toast('\u05D7\u05E1\u05E8 \u05D0\u05D9\u05DE\u05D9\u05D9\u05DC','warning'); return; }
    try { await App.apiCall('add','\u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD',{row}); bootstrap.Modal.getInstance(document.getElementById('um-modal')).hide(); Utils.toast('\u05DE\u05E9\u05EA\u05DE\u05E9 \u05E0\u05D5\u05E1\u05E3'); this.user_managementInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },
  async removeUser(id) { if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05EA \u05DE\u05E9\u05EA\u05DE\u05E9','\u05D4\u05D0\u05DD \u05DC\u05DE\u05D7\u05D5\u05E7 \u05DE\u05E9\u05EA\u05DE\u05E9 \u05D6\u05D4?')) return; try { await App.apiCall('delete','\u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.user_managementInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); } },

  /* ======================================================================
     ACTIVITY LOG
     ====================================================================== */
  activity_log() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-clock-history me-2"></i>\u05D9\u05D5\u05DE\u05DF \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA</h1></div><div class="d-flex gap-2"><input type="date" class="form-control form-control-sm" id="log-date" style="width:160px"><div class="search-box"><i class="bi bi-search"></i><input type="text" class="form-control form-control-sm" id="log-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9..." style="width:180px"></div></div></div><div id="log-list">${Utils.skeleton(5)}</div>`;
  },
  _logData: [],
  async activity_logInit() {
    this._logData = await App.getData('\u05D9\u05D5\u05DE\u05DF_\u05E4\u05E2\u05D9\u05DC\u05D5\u05EA');
    document.getElementById('log-date').value = Utils.todayISO();
    document.getElementById('log-date').addEventListener('change', () => this.renderLog());
    document.getElementById('log-search').addEventListener('input', Utils.debounce(() => this.renderLog(), 200));
    this.renderLog();
  },
  renderLog() {
    const dateF = document.getElementById('log-date')?.value||'';
    const search = (document.getElementById('log-search')?.value||'').trim().toLowerCase();
    let filtered = (this._logData||[]).filter(r => {
      if (dateF && !(r['\u05EA\u05D0\u05E8\u05D9\u05DA']||'').startsWith(dateF)) return false;
      if (search && !(r['\u05E4\u05E2\u05D5\u05DC\u05D4']||'').toLowerCase().includes(search) && !(r['\u05D9\u05E9\u05D5\u05EA']||'').toLowerCase().includes(search)) return false;
      return true;
    }).slice().reverse();
    if (!filtered.length) { document.getElementById('log-list').innerHTML = '<div class="empty-state"><i class="bi bi-clock-history"></i><h5>\u05D0\u05D9\u05DF \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA</h5></div>'; return; }
    const typeIcons = {'\u05D4\u05D5\u05E1\u05E4\u05D4':'plus-circle','\u05E2\u05D3\u05DB\u05D5\u05DF':'pencil','\u05DE\u05D7\u05D9\u05E7\u05D4':'trash','\u05DB\u05E0\u05D9\u05E1\u05D4':'box-arrow-in-right'};
    const typeColors = {'\u05D4\u05D5\u05E1\u05E4\u05D4':'success','\u05E2\u05D3\u05DB\u05D5\u05DF':'primary','\u05DE\u05D7\u05D9\u05E7\u05D4':'danger','\u05DB\u05E0\u05D9\u05E1\u05D4':'info'};
    document.getElementById('log-list').innerHTML = `<div class="card p-3">${filtered.slice(0,100).map(r => {
      const t=r['\u05E1\u05D5\u05D2']||''; const ic=typeIcons[t]||'activity'; const cl=typeColors[t]||'secondary';
      return `<div class="activity-item d-flex align-items-start gap-3 py-2 border-bottom"><div class="avatar avatar-sm" style="background:var(--bht-${cl},#6c757d)"><i class="bi bi-${ic}" style="font-size:.7rem"></i></div><div class="flex-grow-1"><div class="small"><strong>${r['\u05D9\u05E9\u05D5\u05EA']||''}</strong> <span class="badge bg-${cl}" style="font-size:.65rem">${t}</span></div><div class="small text-muted">${r['\u05E4\u05E2\u05D5\u05DC\u05D4']||''}</div></div><small class="text-muted">${r['\u05E9\u05E2\u05D4']||Utils.formatDateShort(r['\u05EA\u05D0\u05E8\u05D9\u05DA'])}</small></div>`;
    }).join('')}</div>`;
  }
};
