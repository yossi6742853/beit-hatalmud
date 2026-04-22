/* ===== BHT v5.4 — Finance (Professional Upgrade) ===== */
Object.assign(Pages, {
  /* ======================================================================
     FINANCE — Revenue Dashboard, Payments, Plans, Invoices, Charts
     ====================================================================== */

  /* ---------- Demo data generator ---------- */
  _finDemoData() {
    const names = [
      '\u05D9\u05D5\u05E1\u05E3 \u05DB\u05D4\u05DF','\u05DE\u05E9\u05D4 \u05DC\u05D5\u05D9','\u05D0\u05D1\u05E8\u05D4\u05DD \u05D9\u05E6\u05D7\u05E7\u05D9','\u05D3\u05D5\u05D3 \u05E9\u05DE\u05E2\u05D5\u05E0\u05D9',
      '\u05D9\u05E2\u05E7\u05D1 \u05E4\u05E8\u05D9\u05D3\u05DE\u05DF','\u05E9\u05DE\u05D5\u05D0\u05DC \u05D1\u05E8\u05D2\u05E8','\u05D0\u05DC\u05D9\u05D4\u05D5 \u05D2\u05D5\u05DC\u05D3\u05E9\u05D8\u05D9\u05D9\u05DF','\u05D7\u05D9\u05D9\u05DD \u05E8\u05D5\u05D6\u05E0\u05D1\u05E8\u05D2',
      '\u05E0\u05EA\u05E0\u05D0\u05DC \u05D5\u05D9\u05E0\u05E8','\u05E8\u05E4\u05D0\u05DC \u05DE\u05D6\u05E8\u05D7\u05D9','\u05D0\u05E8\u05D9\u05D4 \u05DB\u05E5','\u05DE\u05E0\u05D7\u05DD \u05DE\u05E0\u05D3\u05DC',
      '\u05D1\u05E0\u05D9\u05DE\u05D9\u05DF \u05E9\u05E8\u05D1\u05D9\u05D8','\u05E2\u05DE\u05D9\u05EA\u05D9 \u05D4\u05D5\u05E8\u05D5\u05D1\u05D9\u05E5','\u05D2\u05D3 \u05E8\u05D5\u05EA\u05DD','\u05E6\u05D1\u05D9 \u05E4\u05D5\u05DC\u05E7',
      '\u05D0\u05D9\u05EA\u05DF \u05D1\u05DC\u05D5\u05DA','\u05E2\u05D5\u05D6\u05D9 \u05E7\u05E4\u05DC\u05DF','\u05D9\u05D4\u05D5\u05E0\u05EA\u05DF \u05E9\u05E4\u05D9\u05E8\u05D0','\u05D0\u05E9\u05E8 \u05D0\u05DC\u05D1\u05D6'
    ];
    const statuses = ['\u05E9\u05D5\u05DC\u05DD','\u05E9\u05D5\u05DC\u05DD','\u05E9\u05D5\u05DC\u05DD','\u05E9\u05D5\u05DC\u05DD','\u05E9\u05D5\u05DC\u05DD','\u05E9\u05D5\u05DC\u05DD','\u05E9\u05D5\u05DC\u05DD','\u05E9\u05D5\u05DC\u05DD',
      '\u05D7\u05D5\u05D1','\u05D7\u05D5\u05D1','\u05D7\u05D5\u05D1','\u05D7\u05D5\u05D1','\u05D7\u05DC\u05E7\u05D9','\u05D7\u05DC\u05E7\u05D9','\u05D7\u05DC\u05E7\u05D9',
      '\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8','\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8','\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8','\u05D7\u05D5\u05D1','\u05E9\u05D5\u05DC\u05DD'];
    const methods = ['\u05DE\u05D6\u05D5\u05DE\u05DF','\u05D4\u05E2\u05D1\u05E8\u05D4',"\u05E6'\u05E7",'\u05D0\u05E9\u05E8\u05D0\u05D9'];
    const amounts = [1200,1500,800,2000,1800,950,1100,1600,2200,1350,900,1750,1400,1050,2500,1650,1300,1900,700,2100];
    const now = new Date();
    return names.map((nm, i) => {
      const mOff = Math.floor(i / 5); // spread across months
      const mo = new Date(now.getFullYear(), now.getMonth() - mOff, 1);
      const moStr = `${mo.getFullYear()}-${String(mo.getMonth()+1).padStart(2,'0')}`;
      const dueDate = new Date(mo.getFullYear(), mo.getMonth(), 10 + (i % 20));
      const paidDate = statuses[i] === '\u05E9\u05D5\u05DC\u05DD' ? new Date(mo.getFullYear(), mo.getMonth(), 12 + (i % 15)) : null;
      const partialAmt = statuses[i] === '\u05D7\u05DC\u05E7\u05D9' ? Math.round(amounts[i] * 0.4) : 0;
      return {
        '\u05DE\u05D6\u05D4\u05D4': 'demo-' + (i+1),
        '\u05E9\u05DD': nm,
        '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 'stu-' + (i+1),
        '\u05D7\u05D5\u05D3\u05E9': moStr,
        '\u05E1\u05DB\u05D5\u05DD': amounts[i],
        '\u05E1\u05D8\u05D8\u05D5\u05E1': statuses[i],
        '\u05D0\u05DE\u05E6\u05E2\u05D9_\u05EA\u05E9\u05DC\u05D5\u05DD': methods[i % 4],
        '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05EA\u05E9\u05DC\u05D5\u05DD': paidDate ? paidDate.toISOString().slice(0,10) : '',
        '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E2\u05D3': dueDate.toISOString().slice(0,10),
        '\u05DE\u05E1\u05E4\u05E8_\u05E7\u05D1\u05DC\u05D4': statuses[i] === '\u05E9\u05D5\u05DC\u05DD' ? 'R-' + String(1000 + i) : '',
        '\u05E9\u05D5\u05DC\u05DD_\u05D7\u05DC\u05E7\u05D9': partialAmt,
        '\u05D4\u05E2\u05E8\u05D5\u05EA': i % 5 === 0 ? '\u05EA\u05E9\u05DC\u05D5\u05DD \u05D1\u05D0\u05D9\u05D7\u05D5\u05E8' : '',
        '\u05EA\u05D5\u05DB\u05E0\u05D9\u05EA_\u05EA\u05E9\u05DC\u05D5\u05DD': i < 6 ? `${Math.min(i+1,3)}/${3}` : ''
      };
    });
  },

  /* ---------- Main page HTML ---------- */
  finance() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div>
          <h1><i class="bi bi-cash-stack me-2"></i>\u05DB\u05E1\u05E4\u05D9\u05DD</h1>
          <p class="text-muted mb-0">\u05DE\u05E2\u05E7\u05D1 \u05D4\u05DB\u05E0\u05E1\u05D5\u05EA \u05D5\u05D2\u05D1\u05D9\u05D9\u05D4</p>
        </div>
        <div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-primary btn-sm" onclick="Pages.showAddPayment()"><i class="bi bi-plus-lg me-1"></i>\u05EA\u05E9\u05DC\u05D5\u05DD \u05D7\u05D3\u05E9</button>
          <button class="btn btn-outline-info btn-sm" onclick="Pages.showInvoiceModal()"><i class="bi bi-receipt me-1"></i>\u05D7\u05E9\u05D1\u05D5\u05E0\u05D9\u05EA</button>
          <button class="btn btn-outline-success btn-sm" onclick="Pages.exportFinCSV()"><i class="bi bi-download me-1"></i>CSV</button>
        </div>
      </div>

      <!-- Revenue Dashboard -->
      <div class="row g-3 mb-4" id="fin-dashboard">
        <div class="col-6 col-md-3">
          <div class="card stat-card p-3">
            <div class="d-flex align-items-center justify-content-between">
              <div><div class="stat-value fs-4 fw-bold" id="fin-total">--</div><div class="stat-label text-muted">\u05E1\u05D4"\u05DB \u05D4\u05DB\u05E0\u05E1\u05D5\u05EA</div></div>
              <div class="stat-icon gradient-primary"><i class="bi bi-currency-exchange"></i></div>
            </div>
            <div class="mt-2" id="fin-total-trend"></div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card stat-card p-3">
            <div class="d-flex align-items-center justify-content-between">
              <div><div class="stat-value fs-4 fw-bold text-danger" id="fin-debt">--</div><div class="stat-label text-muted">\u05D7\u05D5\u05D1\u05D5\u05EA \u05E4\u05EA\u05D5\u05D7\u05D9\u05DD</div></div>
              <div class="stat-icon gradient-danger"><i class="bi bi-exclamation-triangle-fill"></i></div>
            </div>
            <div class="mt-2" id="fin-debt-trend"></div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card stat-card p-3">
            <div class="d-flex align-items-center justify-content-between">
              <div><div class="stat-value fs-4 fw-bold text-success" id="fin-month-collected">--</div><div class="stat-label text-muted">\u05D2\u05D1\u05D9\u05D9\u05D4 \u05D4\u05D7\u05D5\u05D3\u05E9</div></div>
              <div class="stat-icon gradient-success"><i class="bi bi-graph-up-arrow"></i></div>
            </div>
            <div class="mt-2" id="fin-month-trend"></div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card stat-card p-3">
            <div class="d-flex align-items-center justify-content-between">
              <div><div class="stat-value fs-4 fw-bold text-warning" id="fin-overdue-amt">--</div><div class="stat-label text-muted">\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8</div></div>
              <div class="stat-icon gradient-warning"><i class="bi bi-clock-history"></i></div>
            </div>
            <div class="mt-2" id="fin-overdue-trend"></div>
          </div>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="row g-3 mb-4">
        <div class="col-md-5"><div class="card p-3"><h6 class="fw-bold mb-3"><i class="bi bi-bar-chart-fill text-primary me-2"></i>\u05D4\u05DB\u05E0\u05E1\u05D5\u05EA \u05D7\u05D5\u05D3\u05E9\u05D9\u05D5\u05EA</h6><canvas id="fin-chart-monthly" height="200"></canvas></div></div>
        <div class="col-md-4"><div class="card p-3"><h6 class="fw-bold mb-3"><i class="bi bi-pie-chart-fill text-info me-2"></i>\u05D0\u05DE\u05E6\u05E2\u05D9 \u05EA\u05E9\u05DC\u05D5\u05DD</h6><canvas id="fin-chart-methods" height="200"></canvas></div></div>
        <div class="col-md-3"><div class="card p-3"><h6 class="fw-bold mb-3"><i class="bi bi-activity text-success me-2"></i>\u05E9\u05D9\u05E2\u05D5\u05E8 \u05D2\u05D1\u05D9\u05D9\u05D4</h6><canvas id="fin-chart-rate" height="200"></canvas></div></div>
      </div>

      <!-- Overdue Alerts -->
      <div id="fin-overdue-section" class="mb-4" style="display:none"></div>

      <!-- Payment Plans -->
      <div id="fin-plans-section" class="mb-4" style="display:none"></div>

      <!-- Filters & Bulk Actions -->
      <div class="card p-3 mb-3">
        <div class="row g-2 align-items-end">
          <div class="col-md-4">
            <div class="search-box"><i class="bi bi-search"></i><input type="text" class="form-control" id="fin-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05EA\u05DC\u05DE\u05D9\u05D3..."></div>
          </div>
          <div class="col-md-2">
            <select class="form-select form-select-sm" id="fin-filter">
              <option value="">\u05DB\u05DC \u05D4\u05E1\u05D8\u05D8\u05D5\u05E1\u05D9\u05DD</option>
              <option value="\u05E9\u05D5\u05DC\u05DD">\u05E9\u05D5\u05DC\u05DD</option>
              <option value="\u05D7\u05D5\u05D1">\u05D7\u05D5\u05D1</option>
              <option value="\u05D7\u05DC\u05E7\u05D9">\u05D7\u05DC\u05E7\u05D9</option>
              <option value="\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8">\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8</option>
            </select>
          </div>
          <div class="col-md-2">
            <select class="form-select form-select-sm" id="fin-method-filter">
              <option value="">\u05DB\u05DC \u05D0\u05DE\u05E6\u05E2\u05D9\u05DD</option>
              <option value="\u05DE\u05D6\u05D5\u05DE\u05DF">\u05DE\u05D6\u05D5\u05DE\u05DF</option>
              <option value="\u05D4\u05E2\u05D1\u05E8\u05D4">\u05D4\u05E2\u05D1\u05E8\u05D4</option>
              <option value="\u05E6'\u05E7">\u05E6'\u05E7</option>
              <option value="\u05D0\u05E9\u05E8\u05D0\u05D9">\u05D0\u05E9\u05E8\u05D0\u05D9</option>
            </select>
          </div>
          <div class="col-md-2">
            <select class="form-select form-select-sm" id="fin-month-filter">
              <option value="">\u05DB\u05DC \u05D4\u05D7\u05D5\u05D3\u05E9\u05D9\u05DD</option>
            </select>
          </div>
          <div class="col-md-2 d-flex gap-1 flex-wrap">
            <button class="btn btn-outline-warning btn-sm" onclick="Pages.bulkMarkPaid()" title="\u05E1\u05DE\u05DF \u05E0\u05D1\u05D7\u05E8\u05D9\u05DD \u05DB\u05E9\u05D5\u05DC\u05DD"><i class="bi bi-check2-all me-1"></i>\u05E1\u05DE\u05DF \u05E9\u05D5\u05DC\u05DD</button>
            <button class="btn btn-outline-danger btn-sm" onclick="Pages.bulkSendReminders()" title="\u05E9\u05DC\u05D7 \u05EA\u05D6\u05DB\u05D5\u05E8\u05EA \u05EA\u05E9\u05DC\u05D5\u05DD"><i class="bi bi-envelope me-1"></i>\u05EA\u05D6\u05DB\u05D5\u05E8\u05D5\u05EA</button>
          </div>
        </div>
      </div>

      <!-- Payment Table -->
      <div id="fin-list">${Utils.skeleton(4)}</div>

      <!-- Projection -->
      <div id="fin-projection-wrap"></div>

      <!-- Print area (hidden) -->
      <div id="fin-print-area" style="display:none"></div>
    `;
  },

  /* ---------- State ---------- */
  _finData: [],
  _finSelectedIds: [],
  _finSortCol: '',
  _finSortAsc: true,

  /* ---------- Init ---------- */
  async financeInit() {
    try {
      this._finData = await App.getData('\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3');
    } catch(e) {
      this._finData = [];
    }
    // Use demo data if no real data
    if (!this._finData || !this._finData.length) {
      this._finData = this._finDemoData();
    }
    this._finSelectedIds = [];

    this._finComputeDashboard();
    this._finPopulateMonthFilter();
    this._finRenderCharts();
    this._finRenderOverdue();
    this._finRenderPlans();
    this.renderFinList();

    // Projection
    const projWrap = document.getElementById('fin-projection-wrap');
    if (projWrap) projWrap.innerHTML = this._renderFinProjection(this._finData);

    // Event listeners
    document.getElementById('fin-search')?.addEventListener('input', Utils.debounce(() => this.renderFinList(), 200));
    document.getElementById('fin-filter')?.addEventListener('change', () => this.renderFinList());
    document.getElementById('fin-method-filter')?.addEventListener('change', () => this.renderFinList());
    document.getElementById('fin-month-filter')?.addEventListener('change', () => this.renderFinList());
  },

  /* ---------- Dashboard KPIs ---------- */
  _finComputeDashboard() {
    const data = this._finData || [];
    const total = data.reduce((s,f) => s + (Number(f['\u05E1\u05DB\u05D5\u05DD']) || 0), 0);
    const paid = data.filter(f => (f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') === '\u05E9\u05D5\u05DC\u05DD').reduce((s,f) => s + (Number(f['\u05E1\u05DB\u05D5\u05DD']) || 0), 0);
    const partial = data.filter(f => (f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') === '\u05D7\u05DC\u05E7\u05D9').reduce((s,f) => s + (Number(f['\u05E9\u05D5\u05DC\u05DD_\u05D7\u05DC\u05E7\u05D9']) || 0), 0);
    const debt = total - paid - partial;

    // This month collections
    const now = new Date();
    const curMonth = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
    const monthCollected = data.filter(f => (f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') === '\u05E9\u05D5\u05DC\u05DD' && (f['\u05D7\u05D5\u05D3\u05E9']||'') === curMonth)
      .reduce((s,f) => s + (Number(f['\u05E1\u05DB\u05D5\u05DD']) || 0), 0);

    // Overdue
    const today = new Date(); today.setHours(0,0,0,0);
    const overdue = data.filter(f => {
      const st = f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'';
      if (st === '\u05E9\u05D5\u05DC\u05DD') return false;
      const due = f['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E2\u05D3'] ? new Date(f['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E2\u05D3']) : null;
      return due && due < today;
    }).reduce((s,f) => s + (Number(f['\u05E1\u05DB\u05D5\u05DD']) || 0), 0);

    // Collection rate for trend
    const rate = total > 0 ? Math.round((paid + partial) / total * 100) : 0;

    document.getElementById('fin-total').textContent = Utils.formatCurrency(total);
    document.getElementById('fin-debt').textContent = Utils.formatCurrency(debt);
    document.getElementById('fin-month-collected').textContent = Utils.formatCurrency(monthCollected);
    document.getElementById('fin-overdue-amt').textContent = Utils.formatCurrency(overdue);

    // Trend indicators
    const trendHTML = (pct, label) => {
      const icon = pct >= 0 ? 'bi-arrow-up-short' : 'bi-arrow-down-short';
      const cls = pct >= 0 ? 'text-success' : 'text-danger';
      return `<small class="${cls}"><i class="bi ${icon}"></i>${Math.abs(pct)}% ${label}</small>`;
    };
    const el = id => document.getElementById(id);
    el('fin-total-trend').innerHTML = trendHTML(rate, '\u05E9\u05D9\u05E2\u05D5\u05E8 \u05D2\u05D1\u05D9\u05D9\u05D4');
    el('fin-debt-trend').innerHTML = `<small class="text-muted">${data.filter(f=>(f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05D7\u05D5\u05D1').length} \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD</small>`;
    el('fin-month-trend').innerHTML = `<small class="text-muted">\u05D7\u05D5\u05D3\u05E9 ${curMonth}</small>`;
    el('fin-overdue-trend').innerHTML = overdue > 0 ? `<small class="text-danger"><i class="bi bi-exclamation-circle me-1"></i>\u05D3\u05D5\u05E8\u05E9 \u05D8\u05D9\u05E4\u05D5\u05DC</small>` : `<small class="text-success"><i class="bi bi-check-circle me-1"></i>\u05D0\u05D9\u05DF \u05D0\u05D9\u05D7\u05D5\u05E8\u05D9\u05DD</small>`;
  },

  /* ---------- Populate month filter ---------- */
  _finPopulateMonthFilter() {
    const months = new Set();
    (this._finData || []).forEach(f => { if (f['\u05D7\u05D5\u05D3\u05E9']) months.add(f['\u05D7\u05D5\u05D3\u05E9']); });
    const sel = document.getElementById('fin-month-filter');
    if (!sel) return;
    const sorted = [...months].sort().reverse();
    sel.innerHTML = '<option value="">\u05DB\u05DC \u05D4\u05D7\u05D5\u05D3\u05E9\u05D9\u05DD</option>' + sorted.map(m => `<option value="${m}">${m}</option>`).join('');
  },

  /* ---------- Charts ---------- */
  _finRenderCharts() {
    // Destroy existing
    if (App.charts.finMonthly) { App.charts.finMonthly.destroy(); App.charts.finMonthly = null; }
    if (App.charts.finMethods) { App.charts.finMethods.destroy(); App.charts.finMethods = null; }
    if (App.charts.finRate) { App.charts.finRate.destroy(); App.charts.finRate = null; }

    const data = this._finData || [];

    // 1) Monthly income bar chart
    const monthMap = {};
    data.forEach(f => {
      const m = f['\u05D7\u05D5\u05D3\u05E9'] || '';
      if (!m) return;
      if (!monthMap[m]) monthMap[m] = { charged: 0, collected: 0 };
      monthMap[m].charged += Number(f['\u05E1\u05DB\u05D5\u05DD']) || 0;
      if ((f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') === '\u05E9\u05D5\u05DC\u05DD') {
        monthMap[m].collected += Number(f['\u05E1\u05DB\u05D5\u05DD']) || 0;
      } else if ((f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') === '\u05D7\u05DC\u05E7\u05D9') {
        monthMap[m].collected += Number(f['\u05E9\u05D5\u05DC\u05DD_\u05D7\u05DC\u05E7\u05D9']) || 0;
      }
    });
    const mKeys = Object.keys(monthMap).sort().slice(-6);
    const ctxMonthly = document.getElementById('fin-chart-monthly');
    if (ctxMonthly && mKeys.length) {
      App.charts.finMonthly = new Chart(ctxMonthly, {
        type: 'bar',
        data: {
          labels: mKeys,
          datasets: [
            { label: '\u05D7\u05D9\u05D5\u05D1', data: mKeys.map(m => monthMap[m].charged), backgroundColor: 'rgba(37,99,235,0.7)', borderRadius: 6 },
            { label: '\u05E0\u05D2\u05D1\u05D4', data: mKeys.map(m => monthMap[m].collected), backgroundColor: 'rgba(22,163,74,0.7)', borderRadius: 6 }
          ]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } }, scales: { y: { beginAtZero: true, ticks: { callback: v => '\u20AA' + v.toLocaleString() } } } }
      });
    }

    // 2) Payment method pie chart
    const methodMap = {};
    data.filter(f => (f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') === '\u05E9\u05D5\u05DC\u05DD').forEach(f => {
      const method = f['\u05D0\u05DE\u05E6\u05E2\u05D9_\u05EA\u05E9\u05DC\u05D5\u05DD'] || '\u05DC\u05D0 \u05E6\u05D5\u05D9\u05DF';
      methodMap[method] = (methodMap[method] || 0) + (Number(f['\u05E1\u05DB\u05D5\u05DD']) || 0);
    });
    const ctxMethods = document.getElementById('fin-chart-methods');
    if (ctxMethods && Object.keys(methodMap).length) {
      App.charts.finMethods = new Chart(ctxMethods, {
        type: 'doughnut',
        data: {
          labels: Object.keys(methodMap),
          datasets: [{ data: Object.values(methodMap), backgroundColor: ['#2563eb','#16a34a','#f59e0b','#dc2626','#8b5cf6','#06b6d4'], borderWidth: 0 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } } }
      });
    }

    // 3) Collection rate line chart
    const ctxRate = document.getElementById('fin-chart-rate');
    if (ctxRate && mKeys.length) {
      const rates = mKeys.map(m => monthMap[m].charged > 0 ? Math.round(monthMap[m].collected / monthMap[m].charged * 100) : 0);
      App.charts.finRate = new Chart(ctxRate, {
        type: 'line',
        data: {
          labels: mKeys,
          datasets: [{ label: '\u05E9\u05D9\u05E2\u05D5\u05E8 \u05D2\u05D1\u05D9\u05D9\u05D4 %', data: rates, borderColor: '#16a34a', backgroundColor: 'rgba(22,163,74,0.1)', tension: 0.3, fill: true, pointRadius: 4, pointBackgroundColor: '#16a34a' }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, max: 100, ticks: { callback: v => v + '%' } } } }
      });
    }
  },

  /* ---------- Overdue alerts ---------- */
  _finRenderOverdue() {
    const section = document.getElementById('fin-overdue-section');
    if (!section) return;
    const today = new Date(); today.setHours(0,0,0,0);
    const overdue = (this._finData || []).filter(f => {
      const st = f['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '';
      if (st === '\u05E9\u05D5\u05DC\u05DD') return false;
      const due = f['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E2\u05D3'] ? new Date(f['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E2\u05D3']) : null;
      return due && due < today;
    }).map(f => {
      const due = new Date(f['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E2\u05D3']);
      const days = Math.floor((today - due) / 86400000);
      return { ...f, _daysOverdue: days };
    }).sort((a,b) => b._daysOverdue - a._daysOverdue);

    if (!overdue.length) { section.style.display = 'none'; return; }
    section.style.display = '';
    section.innerHTML = `
      <div class="card border-danger">
        <div class="card-header bg-danger bg-opacity-10 d-flex align-items-center gap-2">
          <i class="bi bi-exclamation-triangle-fill text-danger fs-5"></i>
          <h6 class="fw-bold mb-0 text-danger">\u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD \u05D1\u05D0\u05D9\u05D7\u05D5\u05E8 (${overdue.length})</h6>
        </div>
        <div class="card-body p-0">
          <table class="table table-bht mb-0">
            <thead><tr><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th>\u05E1\u05DB\u05D5\u05DD</th><th>\u05EA\u05D0\u05E8\u05D9\u05DA \u05D9\u05E2\u05D3</th><th>\u05D9\u05DE\u05D9 \u05D0\u05D9\u05D7\u05D5\u05E8</th><th>\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA</th></tr></thead>
            <tbody>${overdue.map(f => {
              const nm = f['\u05E9\u05DD'] || f['\u05EA\u05DC\u05DE\u05D9\u05D3'] || '';
              const amt = Number(f['\u05E1\u05DB\u05D5\u05DD']) || 0;
              const fId = Utils.rowId(f);
              const urgency = f._daysOverdue > 30 ? 'danger' : f._daysOverdue > 14 ? 'warning' : 'info';
              return `<tr class="table-danger bg-opacity-10">
                <td><div class="d-flex align-items-center gap-2">${Utils.avatarHTML(nm,'sm')}<span class="fw-bold">${nm}</span></div></td>
                <td class="fw-bold">${Utils.formatCurrency(amt)}</td>
                <td>${Utils.formatDateShort(f['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E2\u05D3'])}</td>
                <td><span class="badge bg-${urgency}">${f._daysOverdue} \u05D9\u05DE\u05D9\u05DD</span></td>
                <td>
                  <button class="btn btn-sm btn-success me-1" onclick="Pages.markPaymentPaid('${fId}')" title="\u05E1\u05DE\u05DF \u05DB\u05E9\u05D5\u05DC\u05DD"><i class="bi bi-check-lg"></i></button>
                  <button class="btn btn-sm btn-outline-primary" onclick="Pages.showAddPayment('${fId}')" title="\u05E2\u05E8\u05D9\u05DB\u05D4"><i class="bi bi-pencil"></i></button>
                </td>
              </tr>`;
            }).join('')}</tbody>
          </table>
        </div>
      </div>`;
  },

  /* ---------- Payment plans ---------- */
  _finRenderPlans() {
    const section = document.getElementById('fin-plans-section');
    if (!section) return;
    // Group by student and show installment progress
    const planStudents = {};
    (this._finData || []).forEach(f => {
      const plan = f['\u05EA\u05D5\u05DB\u05E0\u05D9\u05EA_\u05EA\u05E9\u05DC\u05D5\u05DD'] || '';
      if (!plan) return;
      const nm = f['\u05E9\u05DD'] || f['\u05EA\u05DC\u05DE\u05D9\u05D3'] || '';
      if (!planStudents[nm]) planStudents[nm] = { payments: [], plan };
      planStudents[nm].payments.push(f);
    });

    if (!Object.keys(planStudents).length) { section.style.display = 'none'; return; }
    section.style.display = '';

    let html = `<div class="card"><div class="card-header"><h6 class="fw-bold mb-0"><i class="bi bi-calendar2-check me-2 text-primary"></i>\u05EA\u05D5\u05DB\u05E0\u05D9\u05D5\u05EA \u05EA\u05E9\u05DC\u05D5\u05DD</h6></div><div class="card-body"><div class="row g-3">`;
    for (const [name, info] of Object.entries(planStudents)) {
      const parts = info.plan.split('/');
      const current = parseInt(parts[0]) || 0;
      const total = parseInt(parts[1]) || 1;
      const pct = Math.min(Math.round(current / total * 100), 100);
      const totalAmt = info.payments.reduce((s,f) => s + (Number(f['\u05E1\u05DB\u05D5\u05DD']) || 0), 0);
      const paidAmt = info.payments.filter(f => (f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') === '\u05E9\u05D5\u05DC\u05DD').reduce((s,f) => s + (Number(f['\u05E1\u05DB\u05D5\u05DD']) || 0), 0);
      const barColor = pct >= 100 ? 'bg-success' : pct >= 50 ? 'bg-primary' : 'bg-warning';
      html += `
        <div class="col-md-4">
          <div class="border rounded p-3">
            <div class="d-flex align-items-center gap-2 mb-2">${Utils.avatarHTML(name,'sm')}<strong>${name}</strong></div>
            <div class="d-flex justify-content-between small text-muted mb-1"><span>\u05EA\u05E9\u05DC\u05D5\u05DD ${current}/${total}</span><span>${Utils.formatCurrency(paidAmt)} / ${Utils.formatCurrency(totalAmt)}</span></div>
            <div class="progress" style="height:8px"><div class="progress-bar ${barColor}" style="width:${pct}%"></div></div>
          </div>
        </div>`;
    }
    html += '</div></div></div>';
    section.innerHTML = html;
  },

  /* ---------- Projection ---------- */
  _renderFinProjection(data) {
    const months = {};
    data.forEach(f => {
      const m = f['\u05D7\u05D5\u05D3\u05E9']||'';
      if (!m) return;
      if (!months[m]) months[m] = {charged:0, paid:0};
      months[m].charged += Number(f['\u05E1\u05DB\u05D5\u05DD'])||0;
      if ((f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05E9\u05D5\u05DC\u05DD') months[m].paid += Number(f['\u05E1\u05DB\u05D5\u05DD'])||0;
    });
    const mKeys = Object.keys(months).sort().slice(-6);
    if (mKeys.length < 2) return '';
    const avgRate = mKeys.reduce((s,m) => s + (months[m].charged ? months[m].paid/months[m].charged : 0), 0) / mKeys.length;
    const avgCharge = mKeys.reduce((s,m) => s + months[m].charged, 0) / mKeys.length;
    const projected3 = Math.round(avgCharge * 3 * (1 - avgRate));
    return `<div class="card p-3 mt-3" id="fin-projection">
      <h6 class="fw-bold"><i class="bi bi-graph-up me-2 text-info"></i>\u05EA\u05D7\u05D6\u05D9\u05EA \u05DB\u05E1\u05E4\u05D9\u05EA</h6>
      <div class="row g-3 text-center">
        <div class="col-md-4"><div class="fs-5 fw-bold text-primary">${Math.round(avgRate*100)}%</div><small class="text-muted">\u05E9\u05D9\u05E2\u05D5\u05E8 \u05D2\u05D1\u05D9\u05D4 \u05DE\u05DE\u05D5\u05E6\u05E2</small></div>
        <div class="col-md-4"><div class="fs-5 fw-bold">${Utils.formatCurrency(Math.round(avgCharge))}</div><small class="text-muted">\u05D7\u05D9\u05D5\u05D1 \u05D7\u05D5\u05D3\u05E9\u05D9 \u05DE\u05DE\u05D5\u05E6\u05E2</small></div>
        <div class="col-md-4"><div class="fs-5 fw-bold text-danger">${Utils.formatCurrency(projected3)}</div><small class="text-muted">\u05D7\u05D5\u05D1 \u05E6\u05E4\u05D5\u05D9 \u05D1-3 \u05D7\u05D5\u05D3\u05E9\u05D9\u05DD</small></div>
      </div>
    </div>`;
  },

  /* ---------- Status helpers ---------- */
  _finStatusBadge(status) {
    const map = {
      '\u05E9\u05D5\u05DC\u05DD': { cls: 'bg-success', icon: 'bi-check-circle-fill' },
      '\u05D7\u05D5\u05D1': { cls: 'bg-danger', icon: 'bi-x-circle-fill' },
      '\u05D7\u05DC\u05E7\u05D9': { cls: 'bg-warning text-dark', icon: 'bi-pie-chart-fill' },
      '\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8': { cls: 'bg-secondary', icon: 'bi-clock-fill' }
    };
    const m = map[status] || { cls: 'bg-secondary', icon: 'bi-question-circle' };
    return `<span class="badge ${m.cls}"><i class="bi ${m.icon} me-1"></i>${status || '\u05DC\u05D0 \u05D9\u05D3\u05D5\u05E2'}</span>`;
  },

  _finMethodIcon(method) {
    const map = {
      '\u05DE\u05D6\u05D5\u05DE\u05DF': 'bi-cash',
      '\u05D4\u05E2\u05D1\u05E8\u05D4': 'bi-bank',
      "\u05E6'\u05E7": 'bi-credit-card-2-front',
      '\u05D0\u05E9\u05E8\u05D0\u05D9': 'bi-credit-card'
    };
    const icon = map[method] || 'bi-wallet2';
    return `<i class="bi ${icon} me-1 text-muted"></i>${method || ''}`;
  },

  /* ---------- Render payment table ---------- */
  renderFinList() {
    const search = (document.getElementById('fin-search')?.value || '').trim().toLowerCase();
    const filter = document.getElementById('fin-filter')?.value || '';
    const methodFilter = document.getElementById('fin-method-filter')?.value || '';
    const monthFilter = document.getElementById('fin-month-filter')?.value || '';

    let filtered = (this._finData || []).filter(f => {
      const nm = (f['\u05E9\u05DD'] || f['\u05EA\u05DC\u05DE\u05D9\u05D3'] || '').toLowerCase();
      if (search && !nm.includes(search)) return false;
      const st = f['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '';
      if (filter && st !== filter) return false;
      if (methodFilter && (f['\u05D0\u05DE\u05E6\u05E2\u05D9_\u05EA\u05E9\u05DC\u05D5\u05DD']||'') !== methodFilter) return false;
      if (monthFilter && (f['\u05D7\u05D5\u05D3\u05E9']||'') !== monthFilter) return false;
      return true;
    });

    // Sorting
    if (this._finSortCol) {
      filtered.sort((a,b) => {
        let va = a[this._finSortCol] || '', vb = b[this._finSortCol] || '';
        if (this._finSortCol === '\u05E1\u05DB\u05D5\u05DD') { va = Number(va)||0; vb = Number(vb)||0; }
        if (va < vb) return this._finSortAsc ? -1 : 1;
        if (va > vb) return this._finSortAsc ? 1 : -1;
        return 0;
      });
    }

    const container = document.getElementById('fin-list');
    if (!container) return;

    if (!filtered.length) {
      container.innerHTML = '<div class="empty-state"><i class="bi bi-cash"></i><h5>\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD</h5><p class="text-muted">\u05E0\u05E1\u05D4 \u05DC\u05E9\u05E0\u05D5\u05EA \u05D0\u05EA \u05D4\u05E1\u05D9\u05E0\u05D5\u05DF</p></div>';
      return;
    }

    const allChecked = this._finSelectedIds.length === filtered.length && filtered.length > 0;
    const sortIcon = col => {
      if (this._finSortCol !== col) return '<i class="bi bi-arrow-down-up text-muted opacity-25 ms-1"></i>';
      return this._finSortAsc ? '<i class="bi bi-sort-up text-primary ms-1"></i>' : '<i class="bi bi-sort-down text-primary ms-1"></i>';
    };

    // Summary bar
    const totalFiltered = filtered.reduce((s,f) => s + (Number(f['\u05E1\u05DB\u05D5\u05DD'])||0), 0);
    const paidFiltered = filtered.filter(f=>(f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05E9\u05D5\u05DC\u05DD').reduce((s,f)=>s+(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0),0);

    container.innerHTML = `
      ${this._finSelectedIds.length ? `<div class="alert alert-info py-2 d-flex align-items-center gap-2 mb-2"><i class="bi bi-check2-square me-1"></i><strong>${this._finSelectedIds.length}</strong> \u05E0\u05D1\u05D7\u05E8\u05D5</div>` : ''}
      <div class="d-flex justify-content-between align-items-center mb-2">
        <small class="text-muted">\u05DE\u05E6\u05D9\u05D2 ${filtered.length} \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD | \u05E1\u05D4"\u05DB ${Utils.formatCurrency(totalFiltered)} | \u05E0\u05D2\u05D1\u05D4 ${Utils.formatCurrency(paidFiltered)}</small>
      </div>
      <div class="card">
        <div class="table-responsive">
          <table class="table table-bht table-hover mb-0">
            <thead>
              <tr>
                <th style="width:40px"><input type="checkbox" class="form-check-input" ${allChecked?'checked':''} onchange="Pages.toggleFinCheckAll()"></th>
                <th class="cursor-pointer" onclick="Pages.sortFinCol('\u05E9\u05DD')">\u05EA\u05DC\u05DE\u05D9\u05D3 ${sortIcon('\u05E9\u05DD')}</th>
                <th class="cursor-pointer" onclick="Pages.sortFinCol('\u05D7\u05D5\u05D3\u05E9')">\u05D7\u05D5\u05D3\u05E9 ${sortIcon('\u05D7\u05D5\u05D3\u05E9')}</th>
                <th class="cursor-pointer" onclick="Pages.sortFinCol('\u05E1\u05DB\u05D5\u05DD')">\u05E1\u05DB\u05D5\u05DD ${sortIcon('\u05E1\u05DB\u05D5\u05DD')}</th>
                <th class="cursor-pointer" onclick="Pages.sortFinCol('\u05E1\u05D8\u05D8\u05D5\u05E1')">\u05E1\u05D8\u05D8\u05D5\u05E1 ${sortIcon('\u05E1\u05D8\u05D8\u05D5\u05E1')}</th>
                <th>\u05D0\u05DE\u05E6\u05E2\u05D9</th>
                <th class="cursor-pointer" onclick="Pages.sortFinCol('\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E2\u05D3')">\u05EA\u05D0\u05E8\u05D9\u05DA \u05D9\u05E2\u05D3 ${sortIcon('\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E2\u05D3')}</th>
                <th>\u05E7\u05D1\u05DC\u05D4</th>
                <th style="width:130px">\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.map(f => {
                const fId = Utils.rowId(f);
                const nm = f['\u05E9\u05DD'] || f['\u05EA\u05DC\u05DE\u05D9\u05D3'] || '';
                const amt = Number(f['\u05E1\u05DB\u05D5\u05DD']) || 0;
                const st = f['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '';
                const chk = this._finSelectedIds.includes(fId) ? 'checked' : '';
                const isPaid = st === '\u05E9\u05D5\u05DC\u05DD';
                const receipt = f['\u05DE\u05E1\u05E4\u05E8_\u05E7\u05D1\u05DC\u05D4'] || '';
                // Highlight overdue rows
                const today = new Date(); today.setHours(0,0,0,0);
                const dueDate = f['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E2\u05D3'] ? new Date(f['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E2\u05D3']) : null;
                const isOverdue = !isPaid && dueDate && dueDate < today;
                const rowCls = isOverdue ? 'table-danger bg-opacity-10' : '';
                return `<tr class="${rowCls}">
                  <td><input type="checkbox" class="form-check-input" ${chk} onchange="Pages.toggleFinCheck('${fId}')"></td>
                  <td><div class="d-flex align-items-center gap-2">${Utils.avatarHTML(nm,'sm')}<span class="fw-bold">${nm}</span></div></td>
                  <td>${f['\u05D7\u05D5\u05D3\u05E9'] || ''}</td>
                  <td class="fw-bold">${Utils.formatCurrency(amt)}</td>
                  <td>${this._finStatusBadge(st)}</td>
                  <td>${this._finMethodIcon(f['\u05D0\u05DE\u05E6\u05E2\u05D9_\u05EA\u05E9\u05DC\u05D5\u05DD'])}</td>
                  <td>${Utils.formatDateShort(f['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E2\u05D3'])}</td>
                  <td>${receipt ? `<span class="badge bg-light text-dark border"><i class="bi bi-receipt me-1"></i>${receipt}</span>` : ''}</td>
                  <td>
                    <div class="btn-group btn-group-sm">
                      ${!isPaid ? `<button class="btn btn-outline-success" onclick="Pages.markPaymentPaid('${fId}')" title="\u05E1\u05DE\u05DF \u05DB\u05E9\u05D5\u05DC\u05DD"><i class="bi bi-check-lg"></i></button>` : ''}
                      <button class="btn btn-outline-primary" onclick="Pages.showAddPayment('${fId}')" title="\u05E2\u05E8\u05D9\u05DB\u05D4"><i class="bi bi-pencil"></i></button>
                      <button class="btn btn-outline-info" onclick="Pages.printReceipt('${fId}')" title="\u05D4\u05D3\u05E4\u05E1 \u05E7\u05D1\u05DC\u05D4"><i class="bi bi-printer"></i></button>
                      <button class="btn btn-outline-danger" onclick="Pages.deletePayment('${fId}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button>
                    </div>
                  </td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  },

  /* ---------- Sort ---------- */
  sortFinCol(col) {
    if (this._finSortCol === col) { this._finSortAsc = !this._finSortAsc; }
    else { this._finSortCol = col; this._finSortAsc = true; }
    this.renderFinList();
  },

  /* ---------- Quick payment modal ---------- */
  showAddPayment(editId) {
    const editing = editId ? (this._finData || []).find(f => Utils.rowId(f) === editId) : null;
    const title = editing ? '\u05E2\u05E8\u05D9\u05DB\u05EA \u05EA\u05E9\u05DC\u05D5\u05DD' : '\u05EA\u05E9\u05DC\u05D5\u05DD \u05D7\u05D3\u05E9';
    const html = `<div class="modal fade" id="fin-modal-dyn" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title"><i class="bi bi-cash-stack me-2"></i>${title}</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <div class="row g-3">
          <div class="col-12"><label class="form-label">\u05EA\u05DC\u05DE\u05D9\u05D3</label><select class="form-select" id="ff-student"></select></div>
          <div class="col-6"><label class="form-label">\u05D7\u05D5\u05D3\u05E9</label><input type="month" class="form-control" id="ff-month"></div>
          <div class="col-6"><label class="form-label">\u05E1\u05DB\u05D5\u05DD</label><input type="number" class="form-control" id="ff-amount" min="0" step="1"></div>
          <div class="col-6"><label class="form-label">\u05E1\u05D8\u05D8\u05D5\u05E1</label>
            <select class="form-select" id="ff-status">
              <option value="\u05D7\u05D5\u05D1">\u05D7\u05D5\u05D1</option>
              <option value="\u05E9\u05D5\u05DC\u05DD">\u05E9\u05D5\u05DC\u05DD</option>
              <option value="\u05D7\u05DC\u05E7\u05D9">\u05D7\u05DC\u05E7\u05D9</option>
              <option value="\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8">\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8</option>
            </select>
          </div>
          <div class="col-6"><label class="form-label">\u05D0\u05DE\u05E6\u05E2\u05D9 \u05EA\u05E9\u05DC\u05D5\u05DD</label>
            <select class="form-select" id="ff-method">
              <option>\u05DE\u05D6\u05D5\u05DE\u05DF</option>
              <option>\u05D4\u05E2\u05D1\u05E8\u05D4</option>
              <option>\u05E6'\u05E7</option>
              <option>\u05D0\u05E9\u05E8\u05D0\u05D9</option>
            </select>
          </div>
          <div class="col-6"><label class="form-label">\u05DE\u05E1\u05E4\u05E8 \u05E7\u05D1\u05DC\u05D4</label><input class="form-control" id="ff-receipt" placeholder="R-1001"></div>
          <div class="col-6"><label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA \u05D9\u05E2\u05D3</label><input type="date" class="form-control" id="ff-due-date"></div>
          <div class="col-12"><label class="form-label">\u05D4\u05E2\u05E8\u05D5\u05EA</label><textarea class="form-control" id="ff-notes" rows="2"></textarea></div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button>
        <button class="btn btn-primary" onclick="Pages.savePayment('${editId||''}')">\u05E9\u05DE\u05D5\u05E8</button>
      </div>
    </div></div></div>`;

    document.getElementById('fin-modal-dyn')?.remove();
    document.body.insertAdjacentHTML('beforeend', html);

    // Populate student list
    App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD').then(students => {
      const sel = document.getElementById('ff-student');
      if (!sel) return;
      sel.innerHTML = '<option value="">\u05D1\u05D7\u05E8 \u05EA\u05DC\u05DE\u05D9\u05D3</option>' + students.map(s => `<option value="${Utils.rowId(s)}">${Utils.fullName(s)}</option>`).join('');
      if (editing) {
        const match = students.find(s => Utils.rowId(s) === editing['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4']);
        if (match) sel.value = Utils.rowId(match);
      }
    }).catch(() => {});

    // Set defaults or editing values
    const d = new Date();
    const defMonth = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    document.getElementById('ff-month').value = editing ? (editing['\u05D7\u05D5\u05D3\u05E9']||defMonth) : defMonth;
    if (editing) {
      document.getElementById('ff-amount').value = editing['\u05E1\u05DB\u05D5\u05DD'] || '';
      document.getElementById('ff-status').value = editing['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '\u05D7\u05D5\u05D1';
      document.getElementById('ff-method').value = editing['\u05D0\u05DE\u05E6\u05E2\u05D9_\u05EA\u05E9\u05DC\u05D5\u05DD'] || '\u05DE\u05D6\u05D5\u05DE\u05DF';
      document.getElementById('ff-receipt').value = editing['\u05DE\u05E1\u05E4\u05E8_\u05E7\u05D1\u05DC\u05D4'] || '';
      document.getElementById('ff-due-date').value = editing['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E2\u05D3'] || '';
      document.getElementById('ff-notes').value = editing['\u05D4\u05E2\u05E8\u05D5\u05EA'] || '';
    }

    new bootstrap.Modal(document.getElementById('fin-modal-dyn')).show();
  },

  async savePayment(editId) {
    const sel = document.getElementById('ff-student');
    const status = document.getElementById('ff-status').value;
    const row = {
      '\u05E9\u05DD': sel?.selectedOptions[0]?.text || '',
      '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': sel?.value || '',
      '\u05D7\u05D5\u05D3\u05E9': document.getElementById('ff-month').value,
      '\u05E1\u05DB\u05D5\u05DD': document.getElementById('ff-amount').value,
      '\u05E1\u05D8\u05D8\u05D5\u05E1': status,
      '\u05D0\u05DE\u05E6\u05E2\u05D9_\u05EA\u05E9\u05DC\u05D5\u05DD': document.getElementById('ff-method').value,
      '\u05DE\u05E1\u05E4\u05E8_\u05E7\u05D1\u05DC\u05D4': document.getElementById('ff-receipt').value.trim(),
      '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E2\u05D3': document.getElementById('ff-due-date').value,
      '\u05D4\u05E2\u05E8\u05D5\u05EA': document.getElementById('ff-notes').value.trim(),
      '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05EA\u05E9\u05DC\u05D5\u05DD': status === '\u05E9\u05D5\u05DC\u05DD' ? Utils.todayISO() : ''
    };
    if (!row['\u05E9\u05DD'] || !row['\u05E1\u05DB\u05D5\u05DD']) { Utils.toast('\u05D7\u05E1\u05E8 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD','warning'); return; }
    try {
      if (editId) {
        await App.apiCall('update', '\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3', { id: editId, row });
      } else {
        await App.apiCall('add', '\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3', { row });
      }
      bootstrap.Modal.getInstance(document.getElementById('fin-modal-dyn'))?.hide();
      Utils.toast(editId ? '\u05EA\u05E9\u05DC\u05D5\u05DD \u05E2\u05D5\u05D3\u05DB\u05DF' : '\u05EA\u05E9\u05DC\u05D5\u05DD \u05E0\u05D5\u05E1\u05E3');
      this.financeInit();
    } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },

  async deletePayment(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4','\u05DC\u05DE\u05D7\u05D5\u05E7 \u05EA\u05E9\u05DC\u05D5\u05DD \u05D6\u05D4?')) return;
    try { await App.apiCall('delete','\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.financeInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },

  async markPaymentPaid(id) {
    try {
      await App.apiCall('update','\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3',{id, row:{'\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05E9\u05D5\u05DC\u05DD','\u05EA\u05D0\u05E8\u05D9\u05DA_\u05EA\u05E9\u05DC\u05D5\u05DD':Utils.todayISO()}});
      Utils.toast('\u05E1\u05D5\u05DE\u05DF \u05DB\u05E9\u05D5\u05DC\u05DD');
      this.financeInit();
    } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },

  /* ---------- CSV Export ---------- */
  exportFinCSV() {
    const rows = this._finData || [];
    if (!rows.length) { Utils.toast('\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD','warning'); return; }
    let csv = '\uFEFF\u05EA\u05DC\u05DE\u05D9\u05D3,\u05D7\u05D5\u05D3\u05E9,\u05E1\u05DB\u05D5\u05DD,\u05E1\u05D8\u05D8\u05D5\u05E1,\u05D0\u05DE\u05E6\u05E2\u05D9,\u05EA\u05D0\u05E8\u05D9\u05DA \u05D9\u05E2\u05D3,\u05EA\u05D0\u05E8\u05D9\u05DA \u05EA\u05E9\u05DC\u05D5\u05DD,\u05DE\u05E1\u05E4\u05E8 \u05E7\u05D1\u05DC\u05D4,\u05D4\u05E2\u05E8\u05D5\u05EA\n';
    rows.forEach(f => {
      csv += `"${f['\u05E9\u05DD']||f['\u05EA\u05DC\u05DE\u05D9\u05D3']||''}","${f['\u05D7\u05D5\u05D3\u05E9']||''}","${f['\u05E1\u05DB\u05D5\u05DD']||''}","${f['\u05E1\u05D8\u05D8\u05D5\u05E1']||''}","${f['\u05D0\u05DE\u05E6\u05E2\u05D9_\u05EA\u05E9\u05DC\u05D5\u05DD']||''}","${f['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E2\u05D3']||''}","${f['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05EA\u05E9\u05DC\u05D5\u05DD']||''}","${f['\u05DE\u05E1\u05E4\u05E8_\u05E7\u05D1\u05DC\u05D4']||''}","${f['\u05D4\u05E2\u05E8\u05D5\u05EA']||''}"\n`;
    });
    const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'finance_'+Utils.todayISO()+'.csv'; link.click();
    Utils.toast('\u05E7\u05D5\u05D1\u05E5 CSV \u05D9\u05D5\u05E6\u05D0');
  },

  /* ---------- Checkbox selection ---------- */
  toggleFinCheck(id) {
    const idx = this._finSelectedIds.indexOf(id);
    if (idx === -1) this._finSelectedIds.push(id); else this._finSelectedIds.splice(idx, 1);
    this.renderFinList();
  },
  toggleFinCheckAll() {
    if (this._finSelectedIds.length === this._finData.length) { this._finSelectedIds = []; }
    else { this._finSelectedIds = this._finData.map(f => Utils.rowId(f)); }
    this.renderFinList();
  },

  /* ---------- Bulk actions ---------- */
  async bulkMarkPaid() {
    if (!this._finSelectedIds.length) { Utils.toast('\u05D1\u05D7\u05E8 \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD','warning'); return; }
    if (!await Utils.confirm('\u05E1\u05D9\u05DE\u05D5\u05DF \u05DB\u05E9\u05D5\u05DC\u05DD', this._finSelectedIds.length + ' \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD \u05D9\u05E1\u05D5\u05DE\u05E0\u05D5 \u05DB\u05E9\u05D5\u05DC\u05DD?')) return;
    let done = 0;
    for (const id of this._finSelectedIds) {
      try { await App.apiCall('update','\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3',{id, row:{'\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05E9\u05D5\u05DC\u05DD','\u05EA\u05D0\u05E8\u05D9\u05DA_\u05EA\u05E9\u05DC\u05D5\u05DD':Utils.todayISO()}}); done++; } catch(e) {}
    }
    this._finSelectedIds = [];
    Utils.toast(done + ' \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD \u05E2\u05D5\u05D3\u05DB\u05E0\u05D5');
    this.financeInit();
  },

  async bulkSendReminders() {
    const unpaid = this._finSelectedIds.length
      ? this._finSelectedIds
      : (this._finData || []).filter(f => (f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') !== '\u05E9\u05D5\u05DC\u05DD').map(f => Utils.rowId(f));
    if (!unpaid.length) { Utils.toast('\u05D0\u05D9\u05DF \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD \u05DC\u05E9\u05DC\u05D9\u05D7\u05D4','info'); return; }
    if (!await Utils.confirm('\u05E9\u05DC\u05D9\u05D7\u05EA \u05EA\u05D6\u05DB\u05D5\u05E8\u05D5\u05EA', `\u05DC\u05E9\u05DC\u05D5\u05D7 \u05EA\u05D6\u05DB\u05D5\u05E8\u05EA \u05EA\u05E9\u05DC\u05D5\u05DD \u05DC-${unpaid.length} \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD?`)) return;
    // In real scenario this would call an API to send reminders
    Utils.toast(`\u05E0\u05E9\u05DC\u05D7\u05D5 ${unpaid.length} \u05EA\u05D6\u05DB\u05D5\u05E8\u05D5\u05EA`);
    this._finSelectedIds = [];
    this.renderFinList();
  },

  /* ---------- Invoice modal ---------- */
  showInvoiceModal() {
    const html = `<div class="modal fade" id="fin-invoice-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title"><i class="bi bi-receipt me-2"></i>\u05D9\u05E6\u05D9\u05E8\u05EA \u05D7\u05E9\u05D1\u05D5\u05E0\u05D9\u05EA</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <div class="row g-3 mb-3">
          <div class="col-md-6"><label class="form-label">\u05EA\u05DC\u05DE\u05D9\u05D3</label><select class="form-select" id="inv-student"></select></div>
          <div class="col-md-3"><label class="form-label">\u05DE\u05D7\u05D5\u05D3\u05E9</label><input type="month" class="form-control" id="inv-from"></div>
          <div class="col-md-3"><label class="form-label">\u05E2\u05D3 \u05D7\u05D5\u05D3\u05E9</label><input type="month" class="form-control" id="inv-to"></div>
        </div>
        <button class="btn btn-primary btn-sm mb-3" onclick="Pages.generateInvoice()">\u05D4\u05E4\u05E7 \u05D7\u05E9\u05D1\u05D5\u05E0\u05D9\u05EA</button>
        <div id="inv-preview" class="border rounded p-3 bg-white" style="display:none"></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">\u05E1\u05D2\u05D5\u05E8</button>
        <button class="btn btn-success" onclick="Pages.printInvoice()"><i class="bi bi-printer me-1"></i>\u05D4\u05D3\u05E4\u05E1</button>
      </div>
    </div></div></div>`;
    document.getElementById('fin-invoice-modal')?.remove();
    document.body.insertAdjacentHTML('beforeend', html);

    App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD').then(students => {
      const sel = document.getElementById('inv-student');
      if (!sel) return;
      sel.innerHTML = '<option value="">\u05D1\u05D7\u05E8 \u05EA\u05DC\u05DE\u05D9\u05D3</option>' + students.map(s => `<option value="${Utils.fullName(s)}">${Utils.fullName(s)}</option>`).join('');
    }).catch(() => {});

    const d = new Date();
    const curM = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    document.getElementById('inv-from').value = curM;
    document.getElementById('inv-to').value = curM;
    new bootstrap.Modal(document.getElementById('fin-invoice-modal')).show();
  },

  generateInvoice() {
    const studentName = document.getElementById('inv-student')?.value || '';
    const from = document.getElementById('inv-from')?.value || '';
    const to = document.getElementById('inv-to')?.value || '';
    if (!studentName) { Utils.toast('\u05D1\u05D7\u05E8 \u05EA\u05DC\u05DE\u05D9\u05D3','warning'); return; }

    const records = (this._finData || []).filter(f => {
      const nm = f['\u05E9\u05DD'] || f['\u05EA\u05DC\u05DE\u05D9\u05D3'] || '';
      if (nm !== studentName) return false;
      const m = f['\u05D7\u05D5\u05D3\u05E9'] || '';
      if (from && m < from) return false;
      if (to && m > to) return false;
      return true;
    });

    const total = records.reduce((s,f) => s + (Number(f['\u05E1\u05DB\u05D5\u05DD'])||0), 0);
    const paid = records.filter(f=>(f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05E9\u05D5\u05DC\u05DD').reduce((s,f)=>s+(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0),0);

    const preview = document.getElementById('inv-preview');
    if (!preview) return;
    preview.style.display = '';
    preview.innerHTML = `
      <div id="inv-content" dir="rtl" style="font-family:Heebo,sans-serif;">
        <div class="text-center mb-4">
          <h3 class="fw-bold">\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3</h3>
          <p class="text-muted mb-0">\u05D7\u05E9\u05D1\u05D5\u05E0\u05D9\u05EA \u05E9\u05DB\u05E8 \u05DC\u05D9\u05DE\u05D5\u05D3</p>
          <hr>
        </div>
        <div class="row mb-3">
          <div class="col-6"><strong>\u05DC\u05DB\u05D1\u05D5\u05D3:</strong> ${studentName}</div>
          <div class="col-6 text-start"><strong>\u05EA\u05D0\u05E8\u05D9\u05DA:</strong> ${Utils.formatDate(new Date())}</div>
        </div>
        <div class="row mb-3">
          <div class="col-6"><strong>\u05EA\u05E7\u05D5\u05E4\u05D4:</strong> ${from} \u05E2\u05D3 ${to}</div>
          <div class="col-6 text-start"><strong>\u05DE\u05E1\u05E4\u05E8 \u05D7\u05E9\u05D1\u05D5\u05E0\u05D9\u05EA:</strong> INV-${Date.now().toString(36).toUpperCase()}</div>
        </div>
        <table class="table table-bordered" style="font-size:14px">
          <thead class="table-light"><tr><th>#</th><th>\u05D7\u05D5\u05D3\u05E9</th><th>\u05E1\u05DB\u05D5\u05DD</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th><th>\u05D0\u05DE\u05E6\u05E2\u05D9</th></tr></thead>
          <tbody>${records.map((f,i) => `<tr>
            <td>${i+1}</td><td>${f['\u05D7\u05D5\u05D3\u05E9']||''}</td>
            <td>${Utils.formatCurrency(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0)}</td>
            <td>${f['\u05E1\u05D8\u05D8\u05D5\u05E1']||''}</td>
            <td>${f['\u05D0\u05DE\u05E6\u05E2\u05D9_\u05EA\u05E9\u05DC\u05D5\u05DD']||''}</td>
          </tr>`).join('')}</tbody>
          <tfoot class="table-light">
            <tr><td colspan="2" class="fw-bold">\u05E1\u05D4"\u05DB</td><td class="fw-bold">${Utils.formatCurrency(total)}</td><td colspan="2"></td></tr>
            <tr><td colspan="2" class="fw-bold text-success">\u05E9\u05D5\u05DC\u05DD</td><td class="fw-bold text-success">${Utils.formatCurrency(paid)}</td><td colspan="2"></td></tr>
            <tr><td colspan="2" class="fw-bold text-danger">\u05D9\u05EA\u05E8\u05D4</td><td class="fw-bold text-danger">${Utils.formatCurrency(total - paid)}</td><td colspan="2"></td></tr>
          </tfoot>
        </table>
        <div class="text-center mt-4 text-muted"><small>\u05EA\u05D5\u05D3\u05D4 \u05E9\u05D1\u05D7\u05E8\u05EA\u05DD \u05D1\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3</small></div>
      </div>`;
  },

  printInvoice() {
    const content = document.getElementById('inv-content');
    if (!content) { Utils.toast('\u05D4\u05E4\u05E7 \u05D7\u05E9\u05D1\u05D5\u05E0\u05D9\u05EA \u05EA\u05D7\u05D9\u05DC\u05D4','warning'); return; }
    const w = window.open('', '_blank', 'width=800,height=600');
    w.document.write(`<!DOCTYPE html><html dir="rtl"><head><title>\u05D7\u05E9\u05D1\u05D5\u05E0\u05D9\u05EA</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;700&display=swap" rel="stylesheet">
      <style>body{font-family:Heebo,sans-serif;padding:40px}@media print{body{padding:20px}}</style>
    </head><body>${content.outerHTML}<script>setTimeout(()=>{window.print();window.close()},500)<\/script></body></html>`);
    w.document.close();
  },

  /* ---------- Receipt printing ---------- */
  printReceipt(id) {
    const rec = (this._finData || []).find(f => Utils.rowId(f) === id);
    if (!rec) return;
    const nm = rec['\u05E9\u05DD'] || rec['\u05EA\u05DC\u05DE\u05D9\u05D3'] || '';
    const amt = Number(rec['\u05E1\u05DB\u05D5\u05DD']) || 0;
    const receiptNum = rec['\u05DE\u05E1\u05E4\u05E8_\u05E7\u05D1\u05DC\u05D4'] || 'R-' + Date.now().toString(36).toUpperCase();

    const w = window.open('', '_blank', 'width=400,height=500');
    w.document.write(`<!DOCTYPE html><html dir="rtl"><head><title>\u05E7\u05D1\u05DC\u05D4</title>
      <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;700&display=swap" rel="stylesheet">
      <style>
        body{font-family:Heebo,sans-serif;padding:30px;max-width:380px;margin:0 auto}
        .receipt-header{text-align:center;border-bottom:2px solid #333;padding-bottom:15px;margin-bottom:20px}
        .receipt-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px dashed #ccc}
        .receipt-total{display:flex;justify-content:space-between;padding:12px 0;border-top:2px solid #333;font-size:1.2em;font-weight:bold;margin-top:10px}
        .receipt-footer{text-align:center;margin-top:30px;font-size:0.85em;color:#666}
        @media print{body{padding:10px}}
      </style>
    </head><body>
      <div class="receipt-header">
        <h3 style="margin:0;font-weight:700">\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3</h3>
        <p style="margin:5px 0 0;color:#666">\u05E7\u05D1\u05DC\u05D4</p>
      </div>
      <div class="receipt-row"><span>\u05DE\u05E1\u05E4\u05E8 \u05E7\u05D1\u05DC\u05D4:</span><strong>${receiptNum}</strong></div>
      <div class="receipt-row"><span>\u05EA\u05D0\u05E8\u05D9\u05DA:</span><span>${Utils.formatDate(new Date())}</span></div>
      <div class="receipt-row"><span>\u05EA\u05DC\u05DE\u05D9\u05D3:</span><strong>${nm}</strong></div>
      <div class="receipt-row"><span>\u05D7\u05D5\u05D3\u05E9:</span><span>${rec['\u05D7\u05D5\u05D3\u05E9']||''}</span></div>
      <div class="receipt-row"><span>\u05D0\u05DE\u05E6\u05E2\u05D9:</span><span>${rec['\u05D0\u05DE\u05E6\u05E2\u05D9_\u05EA\u05E9\u05DC\u05D5\u05DD']||''}</span></div>
      <div class="receipt-row"><span>\u05E1\u05D8\u05D8\u05D5\u05E1:</span><span>${rec['\u05E1\u05D8\u05D8\u05D5\u05E1']||''}</span></div>
      <div class="receipt-total"><span>\u05E1\u05DB\u05D5\u05DD:</span><span>${Utils.formatCurrency(amt)}</span></div>
      <div class="receipt-footer">
        <p>\u05EA\u05D5\u05D3\u05D4 \u05E2\u05DC \u05EA\u05E9\u05DC\u05D5\u05DE\u05DA!</p>
        <p>\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3 \u2022 ${Utils.formatDate(new Date())}</p>
      </div>
      <script>setTimeout(()=>{window.print();window.close()},500)<\/script>
    </body></html>`);
    w.document.close();
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
    let bal=0; document.getElementById('pc-list').innerHTML = `<div class="card"><table class="table table-bht mb-0"><thead><tr><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05E1\u05D5\u05D2</th><th>\u05EA\u05D9\u05D0\u05D5\u05E8</th><th>\u05E1\u05DB\u05D5\u05DD</th><th>\u05D9\u05EA\u05E8\u05D4</th><th></th></tr></thead><tbody>${this._pcData.map(r => { const a=parseFloat(r['\u05E1\u05DB\u05D5\u05DD'])||0; const pcId=r.id||r['\u05DE\u05D6\u05D4\u05D4']||Utils.rowId(r); if (r['\u05E1\u05D5\u05D2']==='\u05D4\u05DB\u05E0\u05E1\u05D4') bal+=a; else bal-=a; return `<tr><td>${r['\u05EA\u05D0\u05E8\u05D9\u05DA']||''}</td><td><span class="badge ${r['\u05E1\u05D5\u05D2']==='\u05D4\u05DB\u05E0\u05E1\u05D4'?'bg-success':'bg-danger'}">${r['\u05E1\u05D5\u05D2']}</span></td><td>${r['\u05EA\u05D9\u05D0\u05D5\u05E8']||''}</td><td class="fw-bold ${r['\u05E1\u05D5\u05D2']==='\u05D4\u05DB\u05E0\u05E1\u05D4'?'text-success':'text-danger'}">${r['\u05E1\u05D5\u05D2']==='\u05D4\u05DB\u05E0\u05E1\u05D4'?'+':'-'}\u20AA${a}</td><td class="fw-bold">\u20AA${bal}</td><td><button class="btn btn-sm btn-outline-primary me-1" onclick="Pages.editPc('${pcId}')" title="\u05E2\u05E8\u05D9\u05DB\u05D4"><i class="bi bi-pencil"></i></button><button class="btn btn-sm btn-outline-danger" onclick="Pages.deletePc('${pcId}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button></td></tr>`; }).join('')}</tbody></table></div>`;
  },
  showAddPc() { this._pcEditId=null; document.getElementById('pcf-type').value='\u05D4\u05DB\u05E0\u05E1\u05D4'; document.getElementById('pcf-desc').value=''; document.getElementById('pcf-amount').value=''; new bootstrap.Modal(document.getElementById('pc-modal')).show(); },
  async savePc() { const row = {'\u05E1\u05D5\u05D2':document.getElementById('pcf-type').value,'\u05EA\u05D9\u05D0\u05D5\u05E8':document.getElementById('pcf-desc').value.trim(),'\u05E1\u05DB\u05D5\u05DD':document.getElementById('pcf-amount').value,'\u05EA\u05D0\u05E8\u05D9\u05DA':Utils.todayISO()}; if (!row['\u05EA\u05D9\u05D0\u05D5\u05E8']||!row['\u05E1\u05DB\u05D5\u05DD']) { Utils.toast('\u05D7\u05E1\u05E8 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD','warning'); return; } try { if (this._pcEditId) { await App.apiCall('update','\u05E7\u05D5\u05E4\u05D4_\u05E7\u05D8\u05E0\u05D4',{id:this._pcEditId,row}); this._pcEditId=null; } else { await App.apiCall('add','\u05E7\u05D5\u05E4\u05D4_\u05E7\u05D8\u05E0\u05D4',{row}); } bootstrap.Modal.getInstance(document.getElementById('pc-modal')).hide(); Utils.toast('\u05E0\u05E9\u05DE\u05E8'); this.pettycashInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); } },
  async deletePc(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4','\u05DC\u05DE\u05D7\u05D5\u05E7 \u05E4\u05E2\u05D5\u05DC\u05D4 \u05D6\u05D5?')) return;
    try { await App.apiCall('delete','\u05E7\u05D5\u05E4\u05D4_\u05E7\u05D8\u05E0\u05D4',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.pettycashInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },
  editPc(id) {
    var item = this._pcData.find(function(r){ return (r.id||r['\u05DE\u05D6\u05D4\u05D4']||'') == id; });
    if (!item) return;
    document.getElementById('pcf-type').value = item['\u05E1\u05D5\u05D2'] || '\u05D4\u05DB\u05E0\u05E1\u05D4';
    document.getElementById('pcf-desc').value = item['\u05EA\u05D9\u05D0\u05D5\u05E8'] || '';
    document.getElementById('pcf-amount').value = item['\u05E1\u05DB\u05D5\u05DD'] || '';
    this._pcEditId = id;
    new bootstrap.Modal(document.getElementById('pc-modal')).show();
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
    let cum=0; document.getElementById('budg-list').innerHTML = `<div class="card"><table class="table table-bht mb-0"><thead><tr><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4</th><th>\u05EA\u05D9\u05D0\u05D5\u05E8</th><th>\u05E1\u05DB\u05D5\u05DD</th><th>\u05DE\u05E6\u05D8\u05D1\u05E8</th><th>\u05E1\u05E4\u05E7</th><th></th></tr></thead><tbody>${this._budgData.map(r => { const a=parseFloat(r['\u05E1\u05DB\u05D5\u05DD'])||0; const bgId=r.id||r['\u05DE\u05D6\u05D4\u05D4']||Utils.rowId(r); cum+=a; return `<tr><td>${r['\u05EA\u05D0\u05E8\u05D9\u05DA']||''}</td><td><span class="badge bg-secondary">${r['\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4']||''}</span></td><td>${r['\u05EA\u05D9\u05D0\u05D5\u05E8']||''}</td><td class="fw-bold text-danger">${Utils.formatCurrency(a)}</td><td class="fw-bold">${Utils.formatCurrency(cum)}</td><td>${r['\u05E1\u05E4\u05E7']||''}</td><td><button class="btn btn-sm btn-outline-primary me-1" onclick="Pages.editBudgetItem('${bgId}')" title="\u05E2\u05E8\u05D9\u05DB\u05D4"><i class="bi bi-pencil"></i></button><button class="btn btn-sm btn-outline-danger" onclick="Pages.deleteBudgetItem('${bgId}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button></td></tr>`; }).join('')}</tbody></table></div>`;
  },
  showAddBudget() { this._budgEditId=null; document.getElementById('bgf-date').value=Utils.todayISO(); document.getElementById('bgf-cat').value=''; document.getElementById('bgf-desc').value=''; document.getElementById('bgf-amount').value=''; document.getElementById('bgf-vendor').value=''; new bootstrap.Modal(document.getElementById('budg-modal')).show(); },
  async saveBudget() { const row={'\u05EA\u05D0\u05E8\u05D9\u05DA':document.getElementById('bgf-date').value,'\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4':document.getElementById('bgf-cat').value,'\u05EA\u05D9\u05D0\u05D5\u05E8':document.getElementById('bgf-desc').value.trim(),'\u05E1\u05DB\u05D5\u05DD':document.getElementById('bgf-amount').value,'\u05E1\u05E4\u05E7':document.getElementById('bgf-vendor').value.trim()}; try { if (this._budgEditId) { await App.apiCall('update','\u05EA\u05E7\u05E6\u05D9\u05D1',{id:this._budgEditId,row}); this._budgEditId=null; } else { await App.apiCall('add','\u05EA\u05E7\u05E6\u05D9\u05D1',{row}); } bootstrap.Modal.getInstance(document.getElementById('budg-modal')).hide(); Utils.toast('\u05E0\u05E9\u05DE\u05E8'); this.budgetInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); } },
  async deleteBudgetItem(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4','\u05DC\u05DE\u05D7\u05D5\u05E7 \u05E8\u05E9\u05D5\u05DE\u05D4 \u05D6\u05D5?')) return;
    try { await App.apiCall('delete','\u05EA\u05E7\u05E6\u05D9\u05D1',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.budgetInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },
  editBudgetItem(id) {
    var item = this._budgData.find(function(r){ return (r.id||r['\u05DE\u05D6\u05D4\u05D4']||'') == id; });
    if (!item) return;
    document.getElementById('bgf-date').value = item['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '';
    document.getElementById('bgf-cat').value = item['\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4'] || '';
    document.getElementById('bgf-desc').value = item['\u05EA\u05D9\u05D0\u05D5\u05E8'] || '';
    document.getElementById('bgf-amount').value = item['\u05E1\u05DB\u05D5\u05DD'] || '';
    document.getElementById('bgf-vendor').value = item['\u05E1\u05E4\u05E7'] || '';
    this._budgEditId = id;
    new bootstrap.Modal(document.getElementById('budg-modal')).show();
  },
});
