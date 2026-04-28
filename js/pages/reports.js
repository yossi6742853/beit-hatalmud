/* ===== BHT v5.3 — Reports & Analytics (דוחות) ===== */
Object.assign(Pages, {
  /* ======================================================================
     REPORTS
     ====================================================================== */
  _reportsCharts: {},
  _reportsLS: 'bht_reports_history',
  _reportsScheduleLS: 'bht_reports_schedules',

  _reportCategories: [
    {
      id: 'attendance', icon: 'bi-calendar-check', color: 'primary', label: '\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA',
      types: [
        { id: 'att_daily', label: '\u05D3\u05D5\u05D7 \u05D9\u05D5\u05DE\u05D9' },
        { id: 'att_weekly', label: '\u05D3\u05D5\u05D7 \u05E9\u05D1\u05D5\u05E2\u05D9' },
        { id: 'att_monthly', label: '\u05D3\u05D5\u05D7 \u05D7\u05D5\u05D3\u05E9\u05D9' },
        { id: 'att_by_class', label: '\u05DC\u05E4\u05D9 \u05DB\u05D9\u05EA\u05D4' }
      ]
    },
    {
      id: 'finance', icon: 'bi-cash-stack', color: 'success', label: '\u05DB\u05E1\u05E4\u05D9\u05DD',
      types: [
        { id: 'fin_income', label: '\u05D3\u05D5\u05D7 \u05D4\u05DB\u05E0\u05E1\u05D5\u05EA' },
        { id: 'fin_debts', label: '\u05D3\u05D5\u05D7 \u05D7\u05D5\u05D1\u05D5\u05EA' },
        { id: 'fin_payments', label: '\u05E4\u05D9\u05E8\u05D5\u05D8 \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD' },
        { id: 'fin_summary', label: '\u05E1\u05D9\u05DB\u05D5\u05DD \u05DB\u05E1\u05E4\u05D9' }
      ]
    },
    {
      id: 'academic', icon: 'bi-mortarboard', color: 'info', label: '\u05DC\u05D9\u05DE\u05D5\u05D3\u05D9\u05DD',
      types: [
        { id: 'acad_grades', label: '\u05D3\u05D5\u05D7 \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD' },
        { id: 'acad_exams', label: '\u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05DE\u05D1\u05D7\u05E0\u05D9\u05DD' },
        { id: 'acad_progress', label: '\u05D4\u05EA\u05E7\u05D3\u05DE\u05D5\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD' }
      ]
    },
    {
      id: 'behavior', icon: 'bi-emoji-smile', color: 'warning', label: '\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA',
      types: [
        { id: 'beh_summary', label: '\u05E1\u05D9\u05DB\u05D5\u05DD \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA' },
        { id: 'beh_trends', label: '\u05DE\u05D2\u05DE\u05D5\u05EA \u05DC\u05D0\u05D5\u05E8\u05DA \u05D6\u05DE\u05DF' },
        { id: 'beh_by_student', label: '\u05DC\u05E4\u05D9 \u05EA\u05DC\u05DE\u05D9\u05D3' }
      ]
    },
    {
      id: 'staff', icon: 'bi-person-badge', color: 'danger', label: '\u05E6\u05D5\u05D5\u05EA',
      types: [
        { id: 'staff_attendance', label: '\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05E6\u05D5\u05D5\u05EA' },
        { id: 'staff_hours', label: '\u05E9\u05E2\u05D5\u05EA \u05E2\u05D1\u05D5\u05D3\u05D4' },
        { id: 'staff_salary', label: '\u05D3\u05D5\u05D7 \u05E9\u05DB\u05E8' }
      ]
    }
  ],

  _getReportsHistory() {
    try { return JSON.parse(localStorage.getItem(this._reportsLS) || '[]'); } catch(e) { return []; }
  },
  _saveReportsHistory(arr) {
    localStorage.setItem(this._reportsLS, JSON.stringify(arr.slice(0, 50)));
  },
  _getSchedules() {
    try { return JSON.parse(localStorage.getItem(this._reportsScheduleLS) || '[]'); } catch(e) { return []; }
  },
  _saveSchedules(arr) {
    localStorage.setItem(this._reportsScheduleLS, JSON.stringify(arr));
  },

  _reportTypeLabel(typeId) {
    for (const cat of this._reportCategories) {
      for (const t of cat.types) {
        if (t.id === typeId) return t.label;
      }
    }
    return typeId;
  },
  _reportCatLabel(typeId) {
    for (const cat of this._reportCategories) {
      for (const t of cat.types) {
        if (t.id === typeId) return cat.label;
      }
    }
    return '';
  },
  _reportCatColor(typeId) {
    for (const cat of this._reportCategories) {
      for (const t of cat.types) {
        if (t.id === typeId) return cat.color;
      }
    }
    return 'secondary';
  },

  reports() {
    const history = this._getReportsHistory();
    const schedules = this._getSchedules();
    const lastGenerated = history.length ? Utils.formatDate(new Date(history[0].date)) : '\u05D0\u05D9\u05DF';

    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div>
          <h1><i class="bi bi-file-earmark-bar-graph me-2"></i>\u05D3\u05D5\u05D7\u05D5\u05EA \u05D5\u05E0\u05D9\u05EA\u05D5\u05D7\u05D9\u05DD</h1>
          <p class="text-muted">\u05D4\u05E4\u05E7\u05EA \u05D3\u05D5\u05D7\u05D5\u05EA, \u05D2\u05E8\u05E4\u05D9\u05DD \u05D5\u05E0\u05D9\u05EA\u05D5\u05D7\u05D9\u05DD \u05E2\u05D1\u05D5\u05E8 \u05D4\u05DE\u05D5\u05E1\u05D3</p>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="row g-3 mb-4">
        <div class="col-6 col-md-4">
          <div class="card stat-card p-3">
            <div class="stat-icon gradient-primary"><i class="bi bi-file-earmark-text-fill"></i></div>
            <div class="stat-value">${history.length}</div>
            <div class="stat-label">\u05D3\u05D5\u05D7\u05D5\u05EA \u05E9\u05D4\u05D5\u05E4\u05E7\u05D5</div>
          </div>
        </div>
        <div class="col-6 col-md-4">
          <div class="card stat-card p-3">
            <div class="stat-icon gradient-success"><i class="bi bi-clock-history"></i></div>
            <div class="stat-value">${schedules.length}</div>
            <div class="stat-label">\u05D3\u05D5\u05D7\u05D5\u05EA \u05DE\u05EA\u05D5\u05D6\u05DE\u05E0\u05D9\u05DD</div>
          </div>
        </div>
        <div class="col-6 col-md-4">
          <div class="card stat-card p-3">
            <div class="stat-icon gradient-info"><i class="bi bi-calendar-event"></i></div>
            <div class="stat-value fs-6">${lastGenerated}</div>
            <div class="stat-label">\u05D4\u05E4\u05E7\u05D4 \u05D0\u05D7\u05E8\u05D5\u05E0\u05D4</div>
          </div>
        </div>
      </div>

      <!-- Report Categories Grid -->
      <h5 class="fw-bold mb-3"><i class="bi bi-grid-3x3-gap me-2"></i>\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D5\u05EA \u05D3\u05D5\u05D7\u05D5\u05EA</h5>
      <div class="row g-3 mb-4">
        ${this._reportCategories.map(cat => `
          <div class="col-md-6 col-lg-4">
            <div class="card p-3 h-100 card-top-${cat.color}">
              <h6 class="fw-bold mb-3"><i class="bi ${cat.icon} me-2 text-${cat.color}"></i>${cat.label}</h6>
              <div class="list-group list-group-flush">
                ${cat.types.map(t => `
                  <a href="javascript:void(0)" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center px-0 border-0"
                     onclick="Pages.selectReportType('${t.id}')">
                    <span>${t.label}</span>
                    <i class="bi bi-chevron-left text-muted"></i>
                  </a>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Report Generator -->
      <div class="card p-4 mb-4" id="report-generator">
        <h5 class="fw-bold mb-3"><i class="bi bi-gear me-2"></i>\u05DE\u05D7\u05D5\u05DC\u05DC \u05D3\u05D5\u05D7\u05D5\u05EA</h5>
        <div class="row g-3">
          <div class="col-md-3">
            <label class="form-label">\u05E1\u05D5\u05D2 \u05D3\u05D5\u05D7</label>
            <select class="form-select" id="rpt-type">
              <option value="">\u05D1\u05D7\u05E8 \u05E1\u05D5\u05D2 \u05D3\u05D5\u05D7...</option>
              ${this._reportCategories.map(cat =>
                `<optgroup label="${cat.label}">
                  ${cat.types.map(t => `<option value="${t.id}">${t.label}</option>`).join('')}
                </optgroup>`
              ).join('')}
            </select>
          </div>
          <div class="col-md-2">
            <label class="form-label">\u05DE\u05EA\u05D0\u05E8\u05D9\u05DA</label>
            <input type="date" class="form-control" id="rpt-from">
          </div>
          <div class="col-md-2">
            <label class="form-label">\u05E2\u05D3 \u05EA\u05D0\u05E8\u05D9\u05DA</label>
            <input type="date" class="form-control" id="rpt-to">
          </div>
          <div class="col-md-2">
            <label class="form-label">\u05DB\u05D9\u05EA\u05D4</label>
            <select class="form-select" id="rpt-class">
              <option value="">\u05D4\u05DB\u05DC</option>
              <option value="\u05D0">\u05DB\u05D9\u05EA\u05D4 \u05D0'</option>
              <option value="\u05D1">\u05DB\u05D9\u05EA\u05D4 \u05D1'</option>
              <option value="\u05D2">\u05DB\u05D9\u05EA\u05D4 \u05D2'</option>
              <option value="\u05D3">\u05DB\u05D9\u05EA\u05D4 \u05D3'</option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">\u05E4\u05D5\u05E8\u05DE\u05D8</label>
            <div class="d-flex gap-2">
              <select class="form-select" id="rpt-format">
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="print">\u05D4\u05D3\u05E4\u05E1\u05D4</option>
              </select>
              <button class="btn btn-primary" onclick="Pages.generateReport()">
                <i class="bi bi-play-fill"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="mt-3 d-flex gap-2">
          <button class="btn btn-outline-secondary btn-sm" onclick="Pages.showScheduleModal()">
            <i class="bi bi-clock me-1"></i>\u05EA\u05D6\u05DE\u05D5\u05DF \u05D3\u05D5\u05D7
          </button>
        </div>
      </div>

      <!-- Charts Section -->
      <h5 class="fw-bold mb-3"><i class="bi bi-bar-chart-line me-2"></i>\u05D2\u05E8\u05E4\u05D9\u05DD \u05D5\u05E0\u05D9\u05EA\u05D5\u05D7\u05D9\u05DD</h5>
      <div class="row g-3 mb-4">
        <div class="col-lg-6">
          <div class="card p-3">
            <h6 class="fw-bold mb-2"><i class="bi bi-graph-up me-2 text-primary"></i>\u05DE\u05D2\u05DE\u05EA \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</h6>
            <div class="chart-container" style="height:280px"><canvas id="rpt-chart-attendance"></canvas></div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card p-3">
            <h6 class="fw-bold mb-2"><i class="bi bi-bar-chart me-2 text-info"></i>\u05D4\u05EA\u05E4\u05DC\u05D2\u05D5\u05EA \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD</h6>
            <div class="chart-container" style="height:280px"><canvas id="rpt-chart-grades"></canvas></div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card p-3">
            <h6 class="fw-bold mb-2"><i class="bi bi-pie-chart me-2 text-success"></i>\u05E1\u05D9\u05DB\u05D5\u05DD \u05DB\u05E1\u05E4\u05D9</h6>
            <div class="chart-container" style="height:280px"><canvas id="rpt-chart-finance"></canvas></div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card p-3">
            <h6 class="fw-bold mb-2"><i class="bi bi-diamond me-2 text-warning"></i>\u05E1\u05D8\u05D8\u05D9\u05E1\u05D8\u05D9\u05E7\u05EA \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</h6>
            <div class="chart-container" style="height:280px"><canvas id="rpt-chart-behavior"></canvas></div>
          </div>
        </div>
      </div>

      <!-- Scheduled Reports -->
      <div class="card p-3 mb-4" id="scheduled-reports-section" style="${schedules.length ? '' : 'display:none'}">
        <h5 class="fw-bold mb-3"><i class="bi bi-clock-history me-2"></i>\u05D3\u05D5\u05D7\u05D5\u05EA \u05DE\u05EA\u05D5\u05D6\u05DE\u05E0\u05D9\u05DD</h5>
        <div id="scheduled-reports-list"></div>
      </div>

      <!-- Recent Reports History -->
      <div class="card p-3 mb-4">
        <h5 class="fw-bold mb-3"><i class="bi bi-journal-text me-2"></i>\u05D4\u05D9\u05E1\u05D8\u05D5\u05E8\u05D9\u05D9\u05EA \u05D3\u05D5\u05D7\u05D5\u05EA</h5>
        <div id="reports-history">
          ${history.length ? '' : '<div class="text-center text-muted py-4"><i class="bi bi-inbox fs-1 d-block mb-2"></i>\u05DC\u05D0 \u05D4\u05D5\u05E4\u05E7\u05D5 \u05D3\u05D5\u05D7\u05D5\u05EA \u05E2\u05D3\u05D9\u05D9\u05DF</div>'}
        </div>
      </div>
    `;
  },

  reportsInit() {
    // Set default dates (last 30 days)
    const today = new Date();
    const monthAgo = new Date(today);
    monthAgo.setDate(monthAgo.getDate() - 30);
    const toEl = document.getElementById('rpt-to');
    const fromEl = document.getElementById('rpt-from');
    if (toEl) toEl.value = today.toISOString().split('T')[0];
    if (fromEl) fromEl.value = monthAgo.toISOString().split('T')[0];

    // Populate class filter from store if available
    this._populateClassFilter();

    // Render charts with demo data
    this._renderReportCharts();

    // Render history table
    this._renderReportsHistory();

    // Render scheduled reports
    this._renderScheduledReports();
  },

  _populateClassFilter() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    try {
      const students = _gc('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
      if (!students || !students.length) return;
      const classes = [...new Set(students.map(s => s['\u05DB\u05D9\u05EA\u05D4'] || '').filter(Boolean))].sort();
      const sel = document.getElementById('rpt-class');
      if (!sel) return;
      sel.innerHTML = '<option value="">\u05D4\u05DB\u05DC</option>' +
        classes.map(c => `<option value="${c}">${c}</option>`).join('');
    } catch(e) {
      // Keep default options on error
    }
  },

  _renderReportCharts() {
    // Destroy old charts
    Object.keys(App.charts).forEach(k => {
      if (k.startsWith('rpt-')) {
        try { App.charts[k].destroy(); } catch(e) { /* silent */ }
        delete App.charts[k];
      }
    });

    // --- Attendance Trend (Line) ---
    const attCtx = document.getElementById('rpt-chart-attendance');
    if (attCtx) {
      const days = ['\u05E8\u05D0\u05E9\u05D5\u05DF', '\u05E9\u05E0\u05D9', '\u05E9\u05DC\u05D9\u05E9\u05D9', '\u05E8\u05D1\u05D9\u05E2\u05D9', '\u05D7\u05DE\u05D9\u05E9\u05D9', '\u05E9\u05D9\u05E9\u05D9'];
      const present = [42, 45, 40, 44, 43, 46];
      const absent  = [3, 0, 5, 1, 2, 0];
      App.charts['rpt-att'] = new Chart(attCtx, {
        type: 'line',
        data: {
          labels: days,
          datasets: [
            {
              label: '\u05E0\u05D5\u05DB\u05D7\u05D9\u05DD',
              data: present,
              borderColor: '#4f46e5',
              backgroundColor: 'rgba(79,70,229,0.1)',
              fill: true,
              tension: 0.4
            },
            {
              label: '\u05D7\u05E1\u05E8\u05D9\u05DD',
              data: absent,
              borderColor: '#ef4444',
              backgroundColor: 'rgba(239,68,68,0.1)',
              fill: true,
              tension: 0.4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'top', rtl: true } },
          scales: { y: { beginAtZero: true } }
        }
      });
    }

    // --- Grade Distribution (Bar) ---
    const gradeCtx = document.getElementById('rpt-chart-grades');
    if (gradeCtx) {
      App.charts['rpt-grades'] = new Chart(gradeCtx, {
        type: 'bar',
        data: {
          labels: ['100-90', '89-80', '79-70', '69-60', '59-0'],
          datasets: [{
            label: '\u05DE\u05E1\u05E4\u05E8 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD',
            data: [12, 18, 8, 5, 2],
            backgroundColor: ['#22c55e', '#84cc16', '#eab308', '#f97316', '#ef4444'],
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } }
        }
      });
    }

    // --- Financial Summary (Doughnut) ---
    const finCtx = document.getElementById('rpt-chart-finance');
    if (finCtx) {
      App.charts['rpt-finance'] = new Chart(finCtx, {
        type: 'doughnut',
        data: {
          labels: ['\u05E0\u05D2\u05D1\u05D4', '\u05D7\u05D5\u05D1\u05D5\u05EA', '\u05D4\u05E0\u05D7\u05D5\u05EA'],
          datasets: [{
            data: [72000, 18000, 5000],
            backgroundColor: ['#22c55e', '#ef4444', '#eab308'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', rtl: true }
          }
        }
      });
    }

    // --- Behavior Stats (Radar) ---
    const behCtx = document.getElementById('rpt-chart-behavior');
    if (behCtx) {
      App.charts['rpt-behavior'] = new Chart(behCtx, {
        type: 'radar',
        data: {
          labels: ['\u05DE\u05E9\u05DE\u05E2\u05EA', '\u05E9\u05D9\u05EA\u05D5\u05E3 \u05E4\u05E2\u05D5\u05DC\u05D4', '\u05D4\u05DB\u05E0\u05EA \u05E9\u05D9\u05E2\u05D5\u05E8\u05D9\u05DD', '\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA \u05D1\u05D4\u05E4\u05E1\u05E7\u05D4', '\u05E2\u05D6\u05E8\u05D4 \u05D4\u05D3\u05D3\u05D9\u05EA', '\u05DB\u05D9\u05D1\u05D5\u05D3 \u05DC\u05E6\u05D5\u05D5\u05EA'],
          datasets: [
            {
              label: '\u05DB\u05D9\u05EA\u05D4 \u05D0\'',
              data: [85, 78, 90, 82, 88, 92],
              borderColor: '#4f46e5',
              backgroundColor: 'rgba(79,70,229,0.15)',
              pointBackgroundColor: '#4f46e5'
            },
            {
              label: '\u05DB\u05D9\u05EA\u05D4 \u05D1\'',
              data: [75, 82, 85, 78, 80, 88],
              borderColor: '#06b6d4',
              backgroundColor: 'rgba(6,182,212,0.15)',
              pointBackgroundColor: '#06b6d4'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'top', rtl: true } },
          scales: {
            r: {
              beginAtZero: true,
              max: 100,
              ticks: { stepSize: 20 }
            }
          }
        }
      });
    }
  },

  selectReportType(typeId) {
    const sel = document.getElementById('rpt-type');
    if (sel) {
      sel.value = typeId;
      sel.focus();
      // Scroll to generator
      document.getElementById('report-generator')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    Utils.toast('\u05E0\u05D1\u05D7\u05E8: ' + this._reportTypeLabel(typeId), 'info');
  },

  generateReport() {
    const typeId = document.getElementById('rpt-type')?.value;
    const from = document.getElementById('rpt-from')?.value;
    const to = document.getElementById('rpt-to')?.value;
    const cls = document.getElementById('rpt-class')?.value;
    const format = document.getElementById('rpt-format')?.value || 'pdf';

    if (!typeId) {
      Utils.toast('\u05D9\u05E9 \u05DC\u05D1\u05D7\u05D5\u05E8 \u05E1\u05D5\u05D2 \u05D3\u05D5\u05D7', 'warning');
      return;
    }

    // Simulate generation
    const entry = {
      id: Date.now().toString(36),
      type: typeId,
      typeLabel: this._reportTypeLabel(typeId),
      catLabel: this._reportCatLabel(typeId),
      color: this._reportCatColor(typeId),
      from: from || '',
      to: to || '',
      class: cls || '\u05D4\u05DB\u05DC',
      format,
      date: new Date().toISOString()
    };

    const history = this._getReportsHistory();
    history.unshift(entry);
    this._saveReportsHistory(history);

    // Update stat card
    const statEl = document.querySelector('.stat-value');
    if (statEl) statEl.textContent = history.length;

    this._renderReportsHistory();

    const formatLabels = { pdf: 'PDF', excel: 'Excel', print: '\u05D4\u05D3\u05E4\u05E1\u05D4' };
    Utils.toast(`\u05D3\u05D5\u05D7 "${entry.typeLabel}" \u05D4\u05D5\u05E4\u05E7 \u05D1\u05E4\u05D5\u05E8\u05DE\u05D8 ${formatLabels[format] || format}`);

    if (format === 'print') {
      this._simulatePrintReport(entry);
    }
  },

  _simulatePrintReport(entry) {
    const printWin = window.open('', '_blank');
    if (!printWin) { Utils.toast('\u05D7\u05DC\u05D5\u05DF \u05E7\u05D5\u05E4\u05E5 \u05D7\u05D5\u05E1\u05DD \u05D0\u05EA \u05D4\u05D7\u05DC\u05D5\u05DF \u05D4\u05E7\u05D5\u05E4\u05E5', 'warning'); return; }
    printWin.document.write(`<!DOCTYPE html><html dir="rtl" lang="he"><head><meta charset="utf-8">
      <title>${entry.typeLabel}</title>
      <style>body{font-family:Heebo,sans-serif;padding:40px;direction:rtl}
      h1{color:#4f46e5;border-bottom:2px solid #4f46e5;padding-bottom:10px}
      .meta{color:#666;margin-bottom:20px}table{width:100%;border-collapse:collapse;margin-top:20px}
      th,td{border:1px solid #ddd;padding:8px;text-align:right}th{background:#f8f9fa}
      @media print{body{padding:20px}}</style></head><body>
      <h1>\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3 - ${entry.typeLabel}</h1>
      <div class="meta">\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4: ${entry.catLabel} | \u05DB\u05D9\u05EA\u05D4: ${entry.class} | \u05EA\u05D0\u05E8\u05D9\u05DA: ${entry.from || '-'} \u05E2\u05D3 ${entry.to || '-'}</div>
      <p>\u05D3\u05D5\u05D7 \u05D6\u05D4 \u05D4\u05D5\u05E4\u05E7 \u05D0\u05D5\u05D8\u05D5\u05DE\u05D8\u05D9\u05EA. \u05D4\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05D9\u05D5\u05E6\u05D2\u05D5 \u05DB\u05D0\u05DF \u05DB\u05E9\u05D4\u05DE\u05E2\u05E8\u05DB\u05EA \u05DE\u05D7\u05D5\u05D1\u05E8\u05EA \u05DC\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05D0\u05DE\u05D9\u05EA\u05D9\u05D9\u05DD.</p>
      <table><thead><tr><th>#</th><th>\u05E4\u05E8\u05D8</th><th>\u05E2\u05E8\u05DA</th></tr></thead>
      <tbody><tr><td>1</td><td>\u05E0\u05EA\u05D5\u05DF \u05DC\u05D3\u05D5\u05D2\u05DE\u05D4</td><td>--</td></tr></tbody></table>
      </body></html>`);
    printWin.document.close();
    setTimeout(() => printWin.print(), 500);
  },

  _renderReportsHistory() {
    const el = document.getElementById('reports-history');
    if (!el) return;
    const history = this._getReportsHistory();
    if (!history.length) {
      el.innerHTML = '<div class="text-center text-muted py-4"><i class="bi bi-inbox fs-1 d-block mb-2"></i>\u05DC\u05D0 \u05D4\u05D5\u05E4\u05E7\u05D5 \u05D3\u05D5\u05D7\u05D5\u05EA \u05E2\u05D3\u05D9\u05D9\u05DF</div>';
      return;
    }
    const formatIcons = { pdf: 'bi-file-pdf text-danger', excel: 'bi-file-excel text-success', print: 'bi-printer text-secondary' };
    el.innerHTML = `<table class="table table-bht mb-0">
      <thead><tr><th>\u05E1\u05D5\u05D2 \u05D3\u05D5\u05D7</th><th>\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4</th><th>\u05DB\u05D9\u05EA\u05D4</th><th>\u05EA\u05D0\u05E8\u05D9\u05DB\u05D9\u05DD</th><th>\u05E4\u05D5\u05E8\u05DE\u05D8</th><th>\u05E0\u05D5\u05E6\u05E8</th><th></th></tr></thead>
      <tbody>
        ${history.slice(0, 20).map(h => `<tr>
          <td class="fw-bold">${h.typeLabel || h.type}</td>
          <td><span class="badge bg-${h.color || 'secondary'}">${h.catLabel || ''}</span></td>
          <td>${h.class || '\u05D4\u05DB\u05DC'}</td>
          <td>${h.from ? Utils.formatDateShort(h.from) + ' - ' + Utils.formatDateShort(h.to) : '-'}</td>
          <td><i class="bi ${formatIcons[h.format] || 'bi-file-text'}"></i> ${h.format?.toUpperCase() || ''}</td>
          <td>${Utils.formatDate(new Date(h.date))}</td>
          <td>
            <button class="btn btn-sm btn-outline-primary" onclick="Pages.reRunReport('${h.id}')" title="\u05D4\u05E4\u05E7 \u05E9\u05D5\u05D1"><i class="bi bi-arrow-repeat"></i></button>
            <button class="btn btn-sm btn-outline-danger" onclick="Pages.deleteReport('${h.id}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button>
          </td>
        </tr>`).join('')}
      </tbody>
    </table>
    ${history.length > 20 ? `<div class="text-center mt-2"><small class="text-muted">\u05DE\u05E6\u05D9\u05D2 20 \u05DE\u05EA\u05D5\u05DA ${history.length}</small></div>` : ''}`;
  },

  reRunReport(id) {
    const history = this._getReportsHistory();
    const entry = history.find(h => h.id === id);
    if (!entry) return;
    // Pre-fill generator
    const sel = document.getElementById('rpt-type');
    if (sel) sel.value = entry.type;
    if (entry.from) document.getElementById('rpt-from').value = entry.from;
    if (entry.to) document.getElementById('rpt-to').value = entry.to;
    if (entry.class) document.getElementById('rpt-class').value = entry.class;
    if (entry.format) document.getElementById('rpt-format').value = entry.format;
    document.getElementById('report-generator')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    Utils.toast('\u05E4\u05E8\u05D8\u05D9 \u05D4\u05D3\u05D5\u05D7 \u05E0\u05D8\u05E2\u05E0\u05D5. \u05DC\u05D7\u05E5 \u05E2\u05DC \u05D4\u05E4\u05E7\u05D4.', 'info');
  },

  deleteReport(id) {
    const history = this._getReportsHistory().filter(h => h.id !== id);
    this._saveReportsHistory(history);
    this._renderReportsHistory();
    Utils.toast('\u05D3\u05D5\u05D7 \u05E0\u05DE\u05D7\u05E7');
  },

  // --- Schedule Reports ---
  showScheduleModal() {
    const typeId = document.getElementById('rpt-type')?.value;
    if (!typeId) {
      Utils.toast('\u05D9\u05E9 \u05DC\u05D1\u05D7\u05D5\u05E8 \u05E1\u05D5\u05D2 \u05D3\u05D5\u05D7 \u05DC\u05E4\u05E0\u05D9 \u05EA\u05D6\u05DE\u05D5\u05DF', 'warning');
      return;
    }
    document.getElementById('rpt-schedule-modal')?.remove();
    const html = `<div class="modal fade" id="rpt-schedule-modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><i class="bi bi-clock me-2"></i>\u05EA\u05D6\u05DE\u05D5\u05DF \u05D3\u05D5\u05D7</h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">\u05E1\u05D5\u05D2 \u05D3\u05D5\u05D7</label>
              <input type="text" class="form-control" value="${this._reportTypeLabel(typeId)}" disabled>
            </div>
            <div class="mb-3">
              <label class="form-label">\u05EA\u05D3\u05D9\u05E8\u05D5\u05EA</label>
              <select class="form-select" id="sched-freq">
                <option value="daily">\u05D9\u05D5\u05DE\u05D9</option>
                <option value="weekly">\u05E9\u05D1\u05D5\u05E2\u05D9</option>
                <option value="monthly" selected>\u05D7\u05D5\u05D3\u05E9\u05D9</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">\u05E4\u05D5\u05E8\u05DE\u05D8</label>
              <select class="form-select" id="sched-format">
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button>
            <button class="btn btn-primary" onclick="Pages.saveSchedule('${typeId}')">\u05E9\u05DE\u05D5\u05E8 \u05EA\u05D6\u05DE\u05D5\u05DF</button>
          </div>
        </div>
      </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', html);
    new bootstrap.Modal(document.getElementById('rpt-schedule-modal')).show();
  },

  saveSchedule(typeId) {
    const freq = document.getElementById('sched-freq')?.value || 'monthly';
    const format = document.getElementById('sched-format')?.value || 'pdf';
    const schedules = this._getSchedules();
    schedules.push({
      id: Date.now().toString(36),
      type: typeId,
      typeLabel: this._reportTypeLabel(typeId),
      catLabel: this._reportCatLabel(typeId),
      color: this._reportCatColor(typeId),
      freq,
      format,
      createdAt: new Date().toISOString()
    });
    this._saveSchedules(schedules);

    bootstrap.Modal.getInstance(document.getElementById('rpt-schedule-modal'))?.hide();
    Utils.toast('\u05EA\u05D6\u05DE\u05D5\u05DF \u05E0\u05E9\u05DE\u05E8');

    // Show scheduled section
    const section = document.getElementById('scheduled-reports-section');
    if (section) section.style.display = '';
    this._renderScheduledReports();
  },

  _renderScheduledReports() {
    const el = document.getElementById('scheduled-reports-list');
    if (!el) return;
    const schedules = this._getSchedules();
    if (!schedules.length) {
      const section = document.getElementById('scheduled-reports-section');
      if (section) section.style.display = 'none';
      return;
    }
    const freqLabels = { daily: '\u05D9\u05D5\u05DE\u05D9', weekly: '\u05E9\u05D1\u05D5\u05E2\u05D9', monthly: '\u05D7\u05D5\u05D3\u05E9\u05D9' };
    el.innerHTML = schedules.map(s => `
      <div class="d-flex justify-content-between align-items-center border-bottom py-2">
        <div>
          <span class="badge bg-${s.color || 'secondary'} me-2">${s.catLabel || ''}</span>
          <strong>${s.typeLabel || s.type}</strong>
          <small class="text-muted ms-2">${freqLabels[s.freq] || s.freq} | ${s.format?.toUpperCase()}</small>
        </div>
        <button class="btn btn-sm btn-outline-danger" onclick="Pages.deleteSchedule('${s.id}')"><i class="bi bi-trash"></i></button>
      </div>
    `).join('');
  },

  deleteSchedule(id) {
    const schedules = this._getSchedules().filter(s => s.id !== id);
    this._saveSchedules(schedules);
    this._renderScheduledReports();
    Utils.toast('\u05EA\u05D6\u05DE\u05D5\u05DF \u05E0\u05DE\u05D7\u05E7');
  }
});
