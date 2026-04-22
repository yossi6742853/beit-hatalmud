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
     PETTY CASH — Comprehensive Module v2.0
     ====================================================================== */

  /* ---------- Category definitions ---------- */
  _pcCategories: {
    '\u05E6\u05D9\u05D5\u05D3 \u05DE\u05E9\u05E8\u05D3': { icon: 'bi-pen', color: '#2563eb' },
    '\u05E0\u05D9\u05E7\u05D9\u05D5\u05DF': { icon: 'bi-stars', color: '#16a34a' },
    '\u05DE\u05D6\u05D5\u05DF': { icon: 'bi-cup-hot', color: '#f59e0b' },
    '\u05E0\u05E1\u05D9\u05E2\u05D5\u05EA': { icon: 'bi-bus-front', color: '#8b5cf6' },
    '\u05EA\u05D9\u05E7\u05D5\u05E0\u05D9\u05DD': { icon: 'bi-wrench-adjustable', color: '#dc2626' },
    '\u05E9\u05D5\u05E0\u05D5\u05EA': { icon: 'bi-three-dots', color: '#06b6d4' }
  },

  _pcStartingBalance: 2000,

  /* ---------- Demo data: 30 transactions ---------- */
  _pcDemoData() {
    const cats = Object.keys(this._pcCategories);
    const descs = {
      '\u05E6\u05D9\u05D5\u05D3 \u05DE\u05E9\u05E8\u05D3': ['\u05E0\u05D9\u05D9\u05E8 \u05E6\u05D9\u05DC\u05D5\u05DD','\u05D8\u05D5\u05E0\u05E8\u05D9\u05DD \u05DC\u05DE\u05D3\u05E4\u05E1\u05EA','\u05DE\u05D7\u05D1\u05E8\u05D5\u05EA','\u05E7\u05DC\u05E1\u05E8\u05D9\u05DD','\u05E0\u05D9\u05D9\u05E8 \u05D4\u05E2\u05EA\u05E7\u05D4','\u05EA\u05D9\u05E7\u05D9\u05D5\u05EA'],
      '\u05E0\u05D9\u05E7\u05D9\u05D5\u05DF': ['\u05D7\u05D5\u05DE\u05E8\u05D9 \u05E0\u05D9\u05E7\u05D9\u05D5\u05DF','\u05E1\u05D1\u05D5\u05DF \u05DC\u05E8\u05E6\u05E4\u05D4','\u05DE\u05D2\u05D1\u05D5\u05E0\u05D9\u05DD','\u05E9\u05E7\u05D9\u05D5\u05EA \u05E0\u05D9\u05D9\u05DC\u05D5\u05DF','\u05D0\u05E1\u05E4\u05E7\u05EA \u05DE\u05D9\u05DD'],
      '\u05DE\u05D6\u05D5\u05DF': ['\u05DB\u05D9\u05D1\u05D5\u05D3 \u05DC\u05E6\u05D5\u05D5\u05EA','\u05D7\u05D8\u05D9\u05E4\u05D9\u05DD \u05DC\u05D0\u05D9\u05E8\u05D5\u05E2','\u05E9\u05EA\u05D9\u05D9\u05D4 \u05D5\u05E2\u05D5\u05D2\u05D9\u05D5\u05EA','\u05D7\u05DC\u05D1 \u05D5\u05D2\u05D1\u05D9\u05E0\u05D4','\u05DE\u05D9\u05DD \u05DE\u05D9\u05E0\u05E8\u05DC\u05D9\u05DD'],
      '\u05E0\u05E1\u05D9\u05E2\u05D5\u05EA': ['\u05DE\u05D5\u05E0\u05D9\u05EA \u05DC\u05D8\u05D9\u05D5\u05DC','\u05D3\u05DC\u05E7 \u05DC\u05E8\u05DB\u05D1','\u05D0\u05D5\u05D8\u05D5\u05D1\u05D5\u05E1 \u05DC\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD','\u05D4\u05E1\u05E2\u05D4 \u05DC\u05D9\u05E9\u05D9\u05D1\u05D4'],
      '\u05EA\u05D9\u05E7\u05D5\u05E0\u05D9\u05DD': ['\u05EA\u05D9\u05E7\u05D5\u05DF \u05DE\u05D6\u05D2\u05DF','\u05D4\u05D7\u05DC\u05E4\u05EA \u05DE\u05E0\u05E2\u05D5\u05DC','\u05E6\u05D1\u05D9\u05E2\u05EA \u05E7\u05D9\u05E8','\u05EA\u05D9\u05E7\u05D5\u05DF \u05D7\u05E9\u05DE\u05DC','\u05E9\u05E8\u05D1\u05E8\u05D1'],
      '\u05E9\u05D5\u05E0\u05D5\u05EA': ['\u05DE\u05EA\u05E0\u05D4 \u05DC\u05DE\u05D1\u05E7\u05E8','\u05D4\u05D5\u05E6\u05D0\u05D5\u05EA \u05D7\u05D3-\u05E4\u05E2\u05DE\u05D9\u05D5\u05EA','\u05D0\u05D9\u05E8\u05D5\u05E2 \u05E7\u05D8\u05DF','\u05E6\u05D3\u05E7\u05D4']
    };
    const now = new Date();
    const entries = [];
    // 30 transactions spread over 6 months
    for (let i = 0; i < 30; i++) {
      const mOff = Math.floor(i / 5);
      const day = 1 + (i * 3) % 28;
      const mo = new Date(now.getFullYear(), now.getMonth() - mOff, day);
      const moStr = `${mo.getFullYear()}-${String(mo.getMonth()+1).padStart(2,'0')}-${String(mo.getDate()).padStart(2,'0')}`;
      const isIncome = (i % 7 === 0); // ~4 incomes out of 30
      const cat = isIncome ? '' : cats[i % cats.length];
      const descArr = isIncome ? ['\u05D4\u05E4\u05E7\u05D3\u05D4 \u05DE\u05D4\u05E0\u05D4\u05DC\u05D4','\u05D4\u05D7\u05D6\u05E8 \u05E2\u05D5\u05D3\u05E3','\u05D4\u05E9\u05DC\u05DE\u05D4 \u05DE\u05D4\u05D5\u05E8\u05D9\u05DD','\u05DE\u05D9\u05DE\u05D5\u05DF \u05E7\u05D5\u05E4\u05D4'] : (descs[cat] || ['\u05E4\u05E2\u05D5\u05DC\u05D4']);
      const receiptNum = isIncome ? '' : String(1000 + i);
      entries.push({
        '\u05DE\u05D6\u05D4\u05D4': 'pc-' + (i + 1),
        '\u05EA\u05D0\u05E8\u05D9\u05DA': moStr,
        '\u05E1\u05D5\u05D2': isIncome ? '\u05D4\u05DB\u05E0\u05E1\u05D4' : '\u05D4\u05D5\u05E6\u05D0\u05D4',
        '\u05EA\u05D9\u05D0\u05D5\u05E8': descArr[i % descArr.length],
        '\u05E1\u05DB\u05D5\u05DD': isIncome ? (300 + Math.round(Math.random() * 700)) : (15 + Math.round(Math.random() * 250)),
        '\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4': cat,
        '\u05E7\u05D1\u05DC\u05D4': receiptNum
      });
    }
    // Sort by date ascending
    entries.sort((a, b) => a['\u05EA\u05D0\u05E8\u05D9\u05DA'].localeCompare(b['\u05EA\u05D0\u05E8\u05D9\u05DA']));
    return entries;
  },

  /* ---------- Main page render ---------- */
  pettycash() {
    const catOpts = Object.keys(this._pcCategories).map(c => `<option value="${c}">${c}</option>`).join('');
    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div><h1><i class="bi bi-cash-coin me-2"></i>\u05E7\u05D5\u05E4\u05D4 \u05E7\u05D8\u05E0\u05D4</h1></div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-secondary btn-sm" onclick="Pages.showCashCount()"><i class="bi bi-calculator me-1"></i>\u05E1\u05E4\u05D9\u05E8\u05EA \u05E7\u05D5\u05E4\u05D4</button>
        <button class="btn btn-primary btn-sm" onclick="Pages.showAddPc()"><i class="bi bi-plus-lg me-1"></i>\u05E4\u05E2\u05D5\u05DC\u05D4 \u05D7\u05D3\u05E9\u05D4</button>
      </div>
    </div>

    <!-- Balance card -->
    <div class="card mb-3 border-0 shadow-sm" style="background:linear-gradient(135deg,#1e3a5f,#2563eb);">
      <div class="card-body text-white text-center py-4">
        <div class="text-white-50 mb-1">\u05D9\u05EA\u05E8\u05EA \u05E7\u05D5\u05E4\u05D4 \u05E0\u05D5\u05DB\u05D7\u05D9\u05EA</div>
        <div class="display-4 fw-bold" id="pc-balance">\u20AA0</div>
        <div class="d-flex justify-content-center gap-4 mt-3">
          <div><i class="bi bi-arrow-down-circle text-success-subtle fs-5 me-1"></i><span id="pc-in" class="fw-semibold">0</span><br><small class="text-white-50">\u05D4\u05DB\u05E0\u05E1\u05D5\u05EA</small></div>
          <div><i class="bi bi-arrow-up-circle text-danger-subtle fs-5 me-1"></i><span id="pc-out" class="fw-semibold">0</span><br><small class="text-white-50">\u05D4\u05D5\u05E6\u05D0\u05D5\u05EA</small></div>
          <div><i class="bi bi-receipt fs-5 me-1"></i><span id="pc-count" class="fw-semibold">0</span><br><small class="text-white-50">\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA</small></div>
        </div>
      </div>
    </div>

    <!-- Trend arrows row -->
    <div class="row g-2 mb-3">
      <div class="col-md-4 col-6"><div class="card p-3 text-center" id="pc-trend-in"><div class="fs-5 fw-bold text-success" id="pc-month-in">\u20AA0</div><small>\u05D4\u05DB\u05E0\u05E1\u05D5\u05EA \u05D4\u05D7\u05D5\u05D3\u05E9</small><div id="pc-trend-in-arrow"></div></div></div>
      <div class="col-md-4 col-6"><div class="card p-3 text-center" id="pc-trend-out"><div class="fs-5 fw-bold text-danger" id="pc-month-out">\u20AA0</div><small>\u05D4\u05D5\u05E6\u05D0\u05D5\u05EA \u05D4\u05D7\u05D5\u05D3\u05E9</small><div id="pc-trend-out-arrow"></div></div></div>
      <div class="col-md-4 col-12"><div class="card p-3 text-center"><div class="fs-5 fw-bold text-primary" id="pc-month-net">\u20AA0</div><small>\u05E0\u05D8\u05D5 \u05D4\u05D7\u05D5\u05D3\u05E9</small></div></div>
    </div>

    <!-- Category breakdown cards -->
    <div class="row g-2 mb-3" id="pc-cat-cards"></div>

    <!-- Charts row -->
    <div class="row g-3 mb-3">
      <div class="col-md-7"><div class="card p-3"><h6 class="mb-3"><i class="bi bi-bar-chart me-1"></i>\u05E1\u05D9\u05DB\u05D5\u05DD \u05D7\u05D5\u05D3\u05E9\u05D9</h6><canvas id="pc-monthly-chart" height="220"></canvas></div></div>
      <div class="col-md-5"><div class="card p-3"><h6 class="mb-3"><i class="bi bi-pie-chart me-1"></i>\u05E4\u05D9\u05DC\u05D5\u05D7 \u05DC\u05E4\u05D9 \u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4</h6><canvas id="pc-cat-chart" height="220"></canvas></div></div>
    </div>

    <!-- Filter bar -->
    <div class="card p-2 mb-3">
      <div class="d-flex flex-wrap gap-2 align-items-center">
        <input type="text" class="form-control form-control-sm" id="pc-filter-text" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9..." style="max-width:200px" oninput="Pages.filterPcTable()">
        <select class="form-select form-select-sm" id="pc-filter-type" style="max-width:130px" onchange="Pages.filterPcTable()">
          <option value="">\u05DB\u05DC \u05D4\u05E1\u05D5\u05D2\u05D9\u05DD</option>
          <option value="\u05D4\u05DB\u05E0\u05E1\u05D4">\u05D4\u05DB\u05E0\u05E1\u05D4</option>
          <option value="\u05D4\u05D5\u05E6\u05D0\u05D4">\u05D4\u05D5\u05E6\u05D0\u05D4</option>
        </select>
        <select class="form-select form-select-sm" id="pc-filter-cat" style="max-width:150px" onchange="Pages.filterPcTable()">
          <option value="">\u05DB\u05DC \u05D4\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D5\u05EA</option>
          ${catOpts}
        </select>
      </div>
    </div>

    <!-- Transaction log table -->
    <div id="pc-list">${Utils.skeleton(3)}</div>

    <!-- Add/Edit Transaction Modal -->
    <div class="modal fade" id="pc-modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="pc-modal-title">\u05E4\u05E2\u05D5\u05DC\u05D4 \u05D7\u05D3\u05E9\u05D4</h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">\u05E1\u05D5\u05D2</label>
                <select class="form-select" id="pcf-type" onchange="Pages.pcTypeChanged()">
                  <option value="\u05D4\u05DB\u05E0\u05E1\u05D4">\u05D4\u05DB\u05E0\u05E1\u05D4</option>
                  <option value="\u05D4\u05D5\u05E6\u05D0\u05D4">\u05D4\u05D5\u05E6\u05D0\u05D4</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA</label>
                <input type="date" class="form-control" id="pcf-date">
              </div>
              <div class="col-md-6">
                <label class="form-label">\u05E1\u05DB\u05D5\u05DD (\u20AA)</label>
                <input type="number" class="form-control" id="pcf-amount" min="0" step="0.01">
              </div>
              <div class="col-md-6" id="pcf-cat-wrap">
                <label class="form-label">\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4</label>
                <select class="form-select" id="pcf-cat">
                  ${catOpts}
                </select>
              </div>
              <div class="col-12">
                <label class="form-label">\u05EA\u05D9\u05D0\u05D5\u05E8</label>
                <input class="form-control" id="pcf-desc" placeholder="\u05EA\u05D9\u05D0\u05D5\u05E8 \u05D4\u05E4\u05E2\u05D5\u05DC\u05D4">
              </div>
              <div class="col-md-6">
                <label class="form-label">\u05DE\u05E1\u05E4\u05E8 \u05E7\u05D1\u05DC\u05D4</label>
                <input class="form-control" id="pcf-receipt" placeholder="\u05D0\u05D5\u05E4\u05E6\u05D9\u05D5\u05E0\u05DC\u05D9">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary btn-sm" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button>
            <button class="btn btn-primary btn-sm" onclick="Pages.savePc()"><i class="bi bi-check-lg me-1"></i>\u05E9\u05DE\u05D5\u05E8</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Cash Count Modal -->
    <div class="modal fade" id="pc-count-modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><i class="bi bi-calculator me-2"></i>\u05E1\u05E4\u05D9\u05E8\u05EA \u05E7\u05D5\u05E4\u05D4</h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <p class="text-muted">\u05D4\u05D6\u05D9\u05E0\u05D5 \u05D0\u05EA \u05DB\u05DE\u05D5\u05EA \u05D4\u05E9\u05D8\u05E8\u05D5\u05EA \u05D5\u05D4\u05DE\u05D8\u05D1\u05E2\u05D5\u05EA \u05E9\u05D1\u05E7\u05D5\u05E4\u05D4:</p>
            <div class="row g-2 mb-3">
              <div class="col-4"><label class="form-label">\u20AA200</label><input type="number" class="form-control form-control-sm pc-denom" data-val="200" min="0" value="0" oninput="Pages.calcCashCount()"></div>
              <div class="col-4"><label class="form-label">\u20AA100</label><input type="number" class="form-control form-control-sm pc-denom" data-val="100" min="0" value="0" oninput="Pages.calcCashCount()"></div>
              <div class="col-4"><label class="form-label">\u20AA50</label><input type="number" class="form-control form-control-sm pc-denom" data-val="50" min="0" value="0" oninput="Pages.calcCashCount()"></div>
              <div class="col-4"><label class="form-label">\u20AA20</label><input type="number" class="form-control form-control-sm pc-denom" data-val="20" min="0" value="0" oninput="Pages.calcCashCount()"></div>
              <div class="col-4"><label class="form-label">\u20AA10</label><input type="number" class="form-control form-control-sm pc-denom" data-val="10" min="0" value="0" oninput="Pages.calcCashCount()"></div>
              <div class="col-4"><label class="form-label">\u05DE\u05D8\u05D1\u05E2\u05D5\u05EA</label><input type="number" class="form-control form-control-sm" id="pc-coins" min="0" value="0" step="0.5" oninput="Pages.calcCashCount()"></div>
            </div>
            <hr>
            <div class="row text-center">
              <div class="col-4">
                <div class="text-muted small">\u05E1\u05E4\u05D9\u05E8\u05D4 \u05E4\u05D9\u05D6\u05D9\u05EA</div>
                <div class="fs-4 fw-bold text-primary" id="pc-physical-count">\u20AA0</div>
              </div>
              <div class="col-4">
                <div class="text-muted small">\u05D9\u05EA\u05E8\u05D4 \u05D1\u05DE\u05E2\u05E8\u05DB\u05EA</div>
                <div class="fs-4 fw-bold" id="pc-system-bal">\u20AA0</div>
              </div>
              <div class="col-4">
                <div class="text-muted small">\u05D4\u05E4\u05E8\u05E9</div>
                <div class="fs-4 fw-bold" id="pc-diff">\u20AA0</div>
              </div>
            </div>
            <div class="alert mt-3 d-none" id="pc-count-alert"></div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary btn-sm" data-bs-dismiss="modal">\u05E1\u05D2\u05D5\u05E8</button>
          </div>
        </div>
      </div>
    </div>`;
  },

  _pcData: [],
  _pcEditId: null,
  _pcMonthlyChart: null,
  _pcCatChart: null,

  async pettycashInit() {
    try {
      this._pcData = await App.getData('\u05E7\u05D5\u05E4\u05D4_\u05E7\u05D8\u05E0\u05D4');
    } catch(e) {
      this._pcData = [];
    }
    if (!this._pcData || !this._pcData.length) this._pcData = this._pcDemoData();
    this.renderPc();
  },

  renderPc() {
    const data = this._pcData;
    const startBal = this._pcStartingBalance;
    let tIn = startBal, tOut = 0;
    const now = new Date();
    const curMonth = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
    let mIn = 0, mOut = 0, prevMIn = 0, prevMOut = 0;
    const prevMonth = now.getMonth() === 0
      ? `${now.getFullYear()-1}-12`
      : `${now.getFullYear()}-${String(now.getMonth()).padStart(2,'0')}`;
    const catTotals = {};

    data.forEach(r => {
      const a = parseFloat(r['\u05E1\u05DB\u05D5\u05DD']) || 0;
      const isIn = r['\u05E1\u05D5\u05D2'] === '\u05D4\u05DB\u05E0\u05E1\u05D4';
      const mo = (r['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '').substring(0, 7);
      if (isIn) { tIn += a; } else { tOut += a; }
      if (mo === curMonth) { if (isIn) mIn += a; else mOut += a; }
      if (mo === prevMonth) { if (isIn) prevMIn += a; else prevMOut += a; }
      if (!isIn && r['\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4']) {
        catTotals[r['\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4']] = (catTotals[r['\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4']] || 0) + a;
      }
    });

    const balance = tIn - tOut;

    // Balance card
    document.getElementById('pc-balance').textContent = '\u20AA' + balance.toLocaleString();
    document.getElementById('pc-in').textContent = '\u20AA' + tIn.toLocaleString();
    document.getElementById('pc-out').textContent = '\u20AA' + tOut.toLocaleString();
    document.getElementById('pc-count').textContent = data.length;

    // Month trends
    document.getElementById('pc-month-in').textContent = '\u20AA' + mIn.toLocaleString();
    document.getElementById('pc-month-out').textContent = '\u20AA' + mOut.toLocaleString();
    document.getElementById('pc-month-net').textContent = '\u20AA' + (mIn - mOut).toLocaleString();
    const trendArrow = (cur, prev) => {
      if (prev === 0) return '';
      const pct = Math.round(((cur - prev) / prev) * 100);
      if (pct > 0) return `<small class="text-danger"><i class="bi bi-arrow-up"></i> ${pct}%</small>`;
      if (pct < 0) return `<small class="text-success"><i class="bi bi-arrow-down"></i> ${Math.abs(pct)}%</small>`;
      return '<small class="text-muted">\u2014</small>';
    };
    document.getElementById('pc-trend-in-arrow').innerHTML = trendArrow(mIn, prevMIn);
    document.getElementById('pc-trend-out-arrow').innerHTML = trendArrow(mOut, prevMOut);

    // Category cards
    const catHtml = Object.entries(this._pcCategories).map(([name, cfg]) => {
      const total = catTotals[name] || 0;
      return `<div class="col-md-2 col-4"><div class="card p-2 text-center h-100">
        <i class="bi ${cfg.icon} fs-4" style="color:${cfg.color}"></i>
        <div class="fw-bold small mt-1">${name}</div>
        <div class="text-muted small">\u20AA${total.toLocaleString()}</div>
      </div></div>`;
    }).join('');
    document.getElementById('pc-cat-cards').innerHTML = catHtml;

    // Render table
    this._renderPcTable(data, startBal);

    // Charts
    this._renderPcMonthlyChart(data);
    this._renderPcCatChart(catTotals);
  },

  _renderPcTable(data, startBal) {
    if (!data.length) {
      document.getElementById('pc-list').innerHTML = '<div class="empty-state"><i class="bi bi-cash-coin"></i><h5>\u05D0\u05D9\u05DF \u05E4\u05E2\u05D5\u05DC\u05D5\u05EA</h5></div>';
      return;
    }
    let bal = startBal;
    const cats = this._pcCategories;
    const rows = data.map(r => {
      const a = parseFloat(r['\u05E1\u05DB\u05D5\u05DD']) || 0;
      const isIn = r['\u05E1\u05D5\u05D2'] === '\u05D4\u05DB\u05E0\u05E1\u05D4';
      const pcId = r.id || r['\u05DE\u05D6\u05D4\u05D4'] || Utils.rowId(r);
      if (isIn) bal += a; else bal -= a;
      const catCfg = cats[r['\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4']] || {};
      const catBadge = r['\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4']
        ? `<span class="badge" style="background:${catCfg.color || '#6c757d'}"><i class="bi ${catCfg.icon || ''} me-1"></i>${r['\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4']}</span>`
        : '<span class="text-muted">\u2014</span>';
      return `<tr data-type="${r['\u05E1\u05D5\u05D2']}" data-cat="${r['\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4'] || ''}" data-desc="${(r['\u05EA\u05D9\u05D0\u05D5\u05E8']||'').toLowerCase()}">
        <td><small>${r['\u05EA\u05D0\u05E8\u05D9\u05DA'] || ''}</small></td>
        <td><span class="badge ${isIn ? 'bg-success' : 'bg-danger'}">${r['\u05E1\u05D5\u05D2']}</span></td>
        <td>${r['\u05EA\u05D9\u05D0\u05D5\u05E8'] || ''}</td>
        <td>${catBadge}</td>
        <td class="fw-bold ${isIn ? 'text-success' : 'text-danger'}">${isIn ? '+' : '-'}\u20AA${a.toLocaleString()}</td>
        <td><small>${r['\u05E7\u05D1\u05DC\u05D4'] || ''}</small></td>
        <td class="fw-bold">\u20AA${bal.toLocaleString()}</td>
        <td>
          <button class="btn btn-sm btn-outline-primary me-1" onclick="Pages.editPc('${pcId}')" title="\u05E2\u05E8\u05D9\u05DB\u05D4"><i class="bi bi-pencil"></i></button>
          <button class="btn btn-sm btn-outline-danger" onclick="Pages.deletePc('${pcId}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button>
        </td>
      </tr>`;
    }).join('');
    document.getElementById('pc-list').innerHTML = `<div class="card"><div class="table-responsive"><table class="table table-bht table-hover mb-0">
      <thead><tr><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05E1\u05D5\u05D2</th><th>\u05EA\u05D9\u05D0\u05D5\u05E8</th><th>\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4</th><th>\u05E1\u05DB\u05D5\u05DD</th><th>\u05E7\u05D1\u05DC\u05D4</th><th>\u05D9\u05EA\u05E8\u05D4</th><th></th></tr></thead>
      <tbody>${rows}</tbody>
    </table></div></div>`;
  },

  filterPcTable() {
    const text = (document.getElementById('pc-filter-text').value || '').toLowerCase();
    const type = document.getElementById('pc-filter-type').value;
    const cat = document.getElementById('pc-filter-cat').value;
    document.querySelectorAll('#pc-list tbody tr').forEach(tr => {
      const matchText = !text || (tr.dataset.desc || '').includes(text);
      const matchType = !type || tr.dataset.type === type;
      const matchCat = !cat || tr.dataset.cat === cat;
      tr.style.display = (matchText && matchType && matchCat) ? '' : 'none';
    });
  },

  /* ---------- Monthly bar chart (income vs expenses) ---------- */
  _renderPcMonthlyChart(data) {
    const months = {};
    data.forEach(r => {
      const mo = (r['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '').substring(0, 7);
      if (!mo) return;
      if (!months[mo]) months[mo] = { in: 0, out: 0 };
      const a = parseFloat(r['\u05E1\u05DB\u05D5\u05DD']) || 0;
      if (r['\u05E1\u05D5\u05D2'] === '\u05D4\u05DB\u05E0\u05E1\u05D4') months[mo].in += a;
      else months[mo].out += a;
    });
    const labels = Object.keys(months).sort();
    const incomeData = labels.map(l => months[l].in);
    const expenseData = labels.map(l => months[l].out);
    const ctx = document.getElementById('pc-monthly-chart');
    if (!ctx) return;
    if (this._pcMonthlyChart) this._pcMonthlyChart.destroy();
    this._pcMonthlyChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: '\u05D4\u05DB\u05E0\u05E1\u05D5\u05EA', data: incomeData, backgroundColor: 'rgba(22,163,74,0.7)', borderRadius: 4 },
          { label: '\u05D4\u05D5\u05E6\u05D0\u05D5\u05EA', data: expenseData, backgroundColor: 'rgba(220,38,38,0.7)', borderRadius: 4 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'top' } },
        scales: { y: { beginAtZero: true, ticks: { callback: v => '\u20AA' + v } } }
      }
    });
  },

  /* ---------- Category pie chart ---------- */
  _renderPcCatChart(catTotals) {
    const cats = this._pcCategories;
    const labels = Object.keys(cats).filter(c => catTotals[c] > 0);
    const values = labels.map(c => catTotals[c]);
    const colors = labels.map(c => cats[c].color);
    const ctx = document.getElementById('pc-cat-chart');
    if (!ctx) return;
    if (this._pcCatChart) this._pcCatChart.destroy();
    if (!labels.length) { ctx.parentElement.innerHTML += '<div class="text-center text-muted mt-3">\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD</div>'; return; }
    this._pcCatChart = new Chart(ctx, {
      type: 'doughnut',
      data: { labels, datasets: [{ data: values, backgroundColor: colors, borderWidth: 2, borderColor: '#fff' }] },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { padding: 12 } },
          tooltip: { callbacks: { label: ctx2 => `${ctx2.label}: \u20AA${ctx2.raw.toLocaleString()} (${Math.round(ctx2.raw / values.reduce((a,b)=>a+b,0) * 100)}%)` } }
        }
      }
    });
  },

  /* ---------- Add / Edit ---------- */
  showAddPc() {
    this._pcEditId = null;
    document.getElementById('pc-modal-title').textContent = '\u05E4\u05E2\u05D5\u05DC\u05D4 \u05D7\u05D3\u05E9\u05D4';
    document.getElementById('pcf-type').value = '\u05D4\u05D5\u05E6\u05D0\u05D4';
    document.getElementById('pcf-desc').value = '';
    document.getElementById('pcf-amount').value = '';
    document.getElementById('pcf-date').value = Utils.todayISO();
    document.getElementById('pcf-receipt').value = '';
    document.getElementById('pcf-cat').value = Object.keys(this._pcCategories)[0];
    this.pcTypeChanged();
    new bootstrap.Modal(document.getElementById('pc-modal')).show();
  },

  pcTypeChanged() {
    const isIncome = document.getElementById('pcf-type').value === '\u05D4\u05DB\u05E0\u05E1\u05D4';
    document.getElementById('pcf-cat-wrap').style.display = isIncome ? 'none' : '';
  },

  async savePc() {
    const type = document.getElementById('pcf-type').value;
    const row = {
      '\u05E1\u05D5\u05D2': type,
      '\u05EA\u05D9\u05D0\u05D5\u05E8': document.getElementById('pcf-desc').value.trim(),
      '\u05E1\u05DB\u05D5\u05DD': document.getElementById('pcf-amount').value,
      '\u05EA\u05D0\u05E8\u05D9\u05DA': document.getElementById('pcf-date').value || Utils.todayISO(),
      '\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4': type === '\u05D4\u05D5\u05E6\u05D0\u05D4' ? document.getElementById('pcf-cat').value : '',
      '\u05E7\u05D1\u05DC\u05D4': document.getElementById('pcf-receipt').value.trim()
    };
    if (!row['\u05EA\u05D9\u05D0\u05D5\u05E8'] || !row['\u05E1\u05DB\u05D5\u05DD']) {
      Utils.toast('\u05D7\u05E1\u05E8 \u05EA\u05D9\u05D0\u05D5\u05E8 \u05D5\u05E1\u05DB\u05D5\u05DD', 'warning');
      return;
    }
    try {
      if (this._pcEditId) {
        await App.apiCall('update', '\u05E7\u05D5\u05E4\u05D4_\u05E7\u05D8\u05E0\u05D4', { id: this._pcEditId, row });
        this._pcEditId = null;
      } else {
        await App.apiCall('add', '\u05E7\u05D5\u05E4\u05D4_\u05E7\u05D8\u05E0\u05D4', { row });
      }
      bootstrap.Modal.getInstance(document.getElementById('pc-modal')).hide();
      Utils.toast('\u05E0\u05E9\u05DE\u05E8');
      this.pettycashInit();
    } catch(e) {
      Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4', 'danger');
    }
  },

  /* ---------- Delete ---------- */
  async deletePc(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4', '\u05DC\u05DE\u05D7\u05D5\u05E7 \u05E4\u05E2\u05D5\u05DC\u05D4 \u05D6\u05D5?')) return;
    try {
      await App.apiCall('delete', '\u05E7\u05D5\u05E4\u05D4_\u05E7\u05D8\u05E0\u05D4', { id });
      Utils.toast('\u05E0\u05DE\u05D7\u05E7');
      this.pettycashInit();
    } catch(e) {
      Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4', 'danger');
    }
  },

  /* ---------- Edit ---------- */
  editPc(id) {
    const item = this._pcData.find(r => (r.id || r['\u05DE\u05D6\u05D4\u05D4'] || '') == id);
    if (!item) return;
    this._pcEditId = id;
    document.getElementById('pc-modal-title').textContent = '\u05E2\u05E8\u05D9\u05DB\u05EA \u05E4\u05E2\u05D5\u05DC\u05D4';
    document.getElementById('pcf-type').value = item['\u05E1\u05D5\u05D2'] || '\u05D4\u05D5\u05E6\u05D0\u05D4';
    document.getElementById('pcf-desc').value = item['\u05EA\u05D9\u05D0\u05D5\u05E8'] || '';
    document.getElementById('pcf-amount').value = item['\u05E1\u05DB\u05D5\u05DD'] || '';
    document.getElementById('pcf-date').value = item['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '';
    document.getElementById('pcf-cat').value = item['\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4'] || Object.keys(this._pcCategories)[0];
    document.getElementById('pcf-receipt').value = item['\u05E7\u05D1\u05DC\u05D4'] || '';
    this.pcTypeChanged();
    new bootstrap.Modal(document.getElementById('pc-modal')).show();
  },

  /* ---------- Cash Count / Reconciliation ---------- */
  showCashCount() {
    // Reset denomination fields
    document.querySelectorAll('.pc-denom').forEach(el => el.value = '0');
    document.getElementById('pc-coins').value = '0';
    // Calculate system balance
    let bal = this._pcStartingBalance;
    this._pcData.forEach(r => {
      const a = parseFloat(r['\u05E1\u05DB\u05D5\u05DD']) || 0;
      if (r['\u05E1\u05D5\u05D2'] === '\u05D4\u05DB\u05E0\u05E1\u05D4') bal += a; else bal -= a;
    });
    document.getElementById('pc-system-bal').textContent = '\u20AA' + bal.toLocaleString();
    document.getElementById('pc-physical-count').textContent = '\u20AA0';
    document.getElementById('pc-diff').textContent = '\u20AA0';
    document.getElementById('pc-diff').className = 'fs-4 fw-bold';
    document.getElementById('pc-count-alert').classList.add('d-none');
    new bootstrap.Modal(document.getElementById('pc-count-modal')).show();
  },

  calcCashCount() {
    let total = 0;
    document.querySelectorAll('.pc-denom').forEach(el => {
      total += (parseInt(el.value) || 0) * parseInt(el.dataset.val);
    });
    total += parseFloat(document.getElementById('pc-coins').value) || 0;

    // System balance
    let sysBal = this._pcStartingBalance;
    this._pcData.forEach(r => {
      const a = parseFloat(r['\u05E1\u05DB\u05D5\u05DD']) || 0;
      if (r['\u05E1\u05D5\u05D2'] === '\u05D4\u05DB\u05E0\u05E1\u05D4') sysBal += a; else sysBal -= a;
    });

    const diff = total - sysBal;
    document.getElementById('pc-physical-count').textContent = '\u20AA' + total.toLocaleString();
    document.getElementById('pc-diff').textContent = (diff >= 0 ? '+' : '') + '\u20AA' + diff.toLocaleString();
    document.getElementById('pc-diff').className = 'fs-4 fw-bold ' + (diff === 0 ? 'text-success' : 'text-danger');

    const alert = document.getElementById('pc-count-alert');
    alert.classList.remove('d-none');
    if (diff === 0) {
      alert.className = 'alert mt-3 alert-success';
      alert.innerHTML = '<i class="bi bi-check-circle me-2"></i>\u05DE\u05E6\u05D5\u05D9\u05DF! \u05D4\u05E7\u05D5\u05E4\u05D4 \u05DE\u05D0\u05D5\u05D6\u05E0\u05EA.';
    } else {
      alert.className = 'alert mt-3 alert-warning';
      alert.innerHTML = `<i class="bi bi-exclamation-triangle me-2"></i>\u05D4\u05E4\u05E8\u05E9 \u05E9\u05DC ${diff > 0 ? '\u05E2\u05D5\u05D3\u05E3' : '\u05D7\u05E1\u05E8'} \u20AA${Math.abs(diff).toLocaleString()}`;
    }
  },


  /* ======================================================================
     BUDGET — Comprehensive Management Module v2.0
     ====================================================================== */

  /* ---------- Budget category definitions with allocations ---------- */
  _budgCategories: {
    '\u05DE\u05E9\u05DB\u05D5\u05E8\u05D5\u05EA': { icon: 'bi-people-fill', color: '#2563eb', allocated: 220000 },
    '\u05EA\u05D7\u05D6\u05D5\u05E7\u05D4': { icon: 'bi-tools', color: '#dc2626', allocated: 80000 },
    '\u05E6\u05D9\u05D5\u05D3': { icon: 'bi-box-seam', color: '#16a34a', allocated: 45000 },
    '\u05D7\u05E9\u05DE\u05DC/\u05DE\u05D9\u05DD': { icon: 'bi-lightning', color: '#f59e0b', allocated: 60000 },
    '\u05EA\u05D5\u05DB\u05E0\u05D9\u05D5\u05EA': { icon: 'bi-mortarboard', color: '#8b5cf6', allocated: 55000 },
    '\u05D0\u05D7\u05E8': { icon: 'bi-three-dots', color: '#06b6d4', allocated: 40000 }
  },

  _budgAnnualBudget: 500000,

  /* ---------- Demo data: 50 expense entries ---------- */
  _budgDemoData() {
    const vendors = [
      '\u05DE\u05E9\u05DB\u05D5\u05E8\u05D5\u05EA \u05D0.\u05D1.','\u05D7\u05E9\u05DE\u05DC \u05D9\u05E9\u05E8\u05D0\u05DC','\u05DE\u05E9\u05E8\u05D3 \u05D4\u05D7\u05D9\u05E0\u05D5\u05DA','\u05DE\u05E9\u05E8\u05D3\u05D9 \u05D0\u05D5\u05E4\u05D9\u05E1','\u05D3\u05E4\u05D5\u05E1 \u05D4\u05D6\u05D4\u05D1',
      '\u05E9\u05D5\u05E4\u05E8\u05E1\u05DC','\u05D0\u05D5\u05E4\u05D9\u05E1 \u05D3\u05D9\u05E4\u05D5','\u05D7\u05D1\u05E8\u05EA \u05D4\u05D7\u05E9\u05DE\u05DC','\u05DE\u05D6\u05D2\u05DF \u05D4\u05DE\u05D5\u05E1\u05D3','\u05E7\u05D8\u05E8\u05D9\u05E0\u05D2 \u05E4\u05DC\u05D5\u05E1',
      '\u05D8\u05D5\u05D1 \u05D8\u05E2\u05DD','\u05E1\u05E4\u05E8\u05D9 \u05DC\u05DE\u05D3\u05DF','\u05D3\u05D5\u05D0\u05E8 \u05D4\u05D9\u05E9\u05E8\u05D0\u05DC\u05D9','\u05DE\u05E9\u05EA\u05DC\u05D5\u05EA \u05D4\u05D9\u05E8\u05D3\u05DF','\u05D0\u05DC\u05E7\u05D8\u05E8\u05D4 \u05D9\u05E8\u05D5\u05E9\u05DC\u05D9\u05DD'
    ];
    const descs = {
      '\u05DE\u05E9\u05DB\u05D5\u05E8\u05D5\u05EA': ['\u05DE\u05E9\u05DB\u05D5\u05E8\u05EA \u05E8"\u05DE','\u05DE\u05E9\u05DB\u05D5\u05E8\u05EA \u05DE\u05E9\u05D2\u05D9\u05D7','\u05DE\u05E9\u05DB\u05D5\u05E8\u05EA \u05DE\u05D6\u05DB\u05D9\u05E8\u05D4','\u05E9\u05DB\u05E8 \u05DE\u05E0\u05D4\u05DC','\u05E9\u05DB\u05E8 \u05D0\u05D7\u05D6\u05E7\u05D4','\u05D1\u05D5\u05E0\u05D5\u05E1 \u05D7\u05D2\u05D9\u05DD','\u05E9\u05DB\u05E8 \u05E9\u05DE\u05E9','\u05DE\u05E9\u05DB\u05D5\u05E8\u05EA \u05DE\u05D3\u05E8\u05D9\u05DA'],
      '\u05EA\u05D7\u05D6\u05D5\u05E7\u05D4': ['\u05EA\u05D9\u05E7\u05D5\u05DF \u05D2\u05D2','\u05E6\u05D1\u05D9\u05E2\u05EA \u05E7\u05D9\u05E8\u05D5\u05EA','\u05EA\u05D9\u05E7\u05D5\u05DF \u05DE\u05D6\u05D2\u05E0\u05D9\u05DD','\u05D7\u05D5\u05DE\u05E8\u05D9 \u05D1\u05E0\u05D9\u05D9\u05DF','\u05E0\u05D9\u05E7\u05D9\u05D5\u05DF \u05E9\u05E0\u05EA\u05D9','\u05EA\u05D9\u05E7\u05D5\u05DF \u05D0\u05D9\u05E0\u05E1\u05D8\u05DC\u05E6\u05D9\u05D4'],
      '\u05E6\u05D9\u05D5\u05D3': ['\u05E0\u05D9\u05D9\u05E8 \u05E6\u05D9\u05DC\u05D5\u05DD','\u05D8\u05D5\u05E0\u05E8\u05D9\u05DD','\u05D7\u05D5\u05DE\u05E8\u05D9 \u05E0\u05D9\u05E7\u05D9\u05D5\u05DF','\u05E7\u05DC\u05E1\u05E8\u05D9\u05DD','\u05E1\u05E4\u05E8\u05D9 \u05DC\u05D9\u05DE\u05D5\u05D3','\u05DE\u05D7\u05D1\u05E8\u05D5\u05EA \u05D5\u05DE\u05D7\u05E7\u05D9\u05DD'],
      '\u05D7\u05E9\u05DE\u05DC/\u05DE\u05D9\u05DD': ['\u05D7\u05E9\u05DE\u05DC \u05D7\u05D5\u05D3\u05E9\u05D9','\u05DE\u05D9\u05DD \u05D7\u05D5\u05D3\u05E9\u05D9','\u05D0\u05E8\u05E0\u05D5\u05E0\u05D4','\u05D2\u05D6 \u05D1\u05D9\u05E9\u05D5\u05DC','\u05D7\u05E9\u05DE\u05DC \u05DE\u05D6\u05D2\u05E0\u05D9\u05DD','\u05D7\u05D9\u05DE\u05D5\u05DD'],
      '\u05EA\u05D5\u05DB\u05E0\u05D9\u05D5\u05EA': ['\u05E1\u05D3\u05E0\u05D4 \u05D7\u05E0\u05D5\u05DB\u05D4','\u05E9\u05D1\u05EA\u05D5\u05DF','\u05D8\u05D9\u05D5\u05DC \u05E9\u05E0\u05EA\u05D9','\u05EA\u05D7\u05E8\u05D5\u05EA \u05DC\u05DE\u05D9\u05D3\u05D4','\u05E1\u05E4\u05E8\u05D9\u05D4 \u05D7\u05D3\u05E9\u05D4','\u05DE\u05D7\u05E9\u05D1\u05D9\u05DD \u05DC\u05DE\u05D9\u05D3\u05D4'],
      '\u05D0\u05D7\u05E8': ['\u05D1\u05D9\u05D8\u05D5\u05D7','\u05D4\u05D5\u05E6\u05D0\u05D5\u05EA \u05DE\u05E9\u05E4\u05D8\u05D9\u05D5\u05EA','\u05D0\u05D9\u05E8\u05D5\u05E2\u05D9\u05DD','\u05E9\u05D5\u05E0\u05D5\u05EA','\u05D4\u05D5\u05E6\u05D0\u05D5\u05EA \u05D7\u05D3-\u05E4\u05E2\u05DE\u05D9\u05D5\u05EA','\u05DE\u05EA\u05E0\u05D5\u05EA']
    };
    const cats = Object.keys(this._budgCategories);
    const now = new Date();
    const entries = [];
    // Monthly salary entries (12 months x 1 = 12)
    for (let m = 0; m < 12; m++) {
      const mo = new Date(now.getFullYear(), m, 1);
      const moStr = `${mo.getFullYear()}-${String(mo.getMonth()+1).padStart(2,'0')}`;
      entries.push({
        '\u05DE\u05D6\u05D4\u05D4': 'bdg-' + (entries.length + 1),
        '\u05EA\u05D0\u05E8\u05D9\u05DA': `${moStr}-01`,
        '\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4': '\u05DE\u05E9\u05DB\u05D5\u05E8\u05D5\u05EA',
        '\u05EA\u05D9\u05D0\u05D5\u05E8': descs['\u05DE\u05E9\u05DB\u05D5\u05E8\u05D5\u05EA'][m % descs['\u05DE\u05E9\u05DB\u05D5\u05E8\u05D5\u05EA'].length],
        '\u05E1\u05DB\u05D5\u05DD': 15000 + Math.round(Math.random() * 5000),
        '\u05E1\u05E4\u05E7': vendors[0],
        '\u05DE\u05E1\u05E4\u05E8_\u05E7\u05D1\u05DC\u05D4': 'R-' + (1000 + entries.length)
      });
    }
    // Other expenses spread across months (38 more to reach 50)
    for (let i = 0; i < 38; i++) {
      const catIdx = (i % 5) + 1; // skip salaries (index 0), cycle through rest
      const cat = cats[catIdx];
      const m = i % 12;
      const mo = new Date(now.getFullYear(), m, 1);
      const moStr = `${mo.getFullYear()}-${String(mo.getMonth()+1).padStart(2,'0')}`;
      const day = 2 + (i % 26);
      const catDescs = descs[cat] || descs['\u05D0\u05D7\u05E8'];
      const amounts = {
        '\u05EA\u05D7\u05D6\u05D5\u05E7\u05D4': 2000 + Math.round(Math.random() * 8000),
        '\u05E6\u05D9\u05D5\u05D3': 500 + Math.round(Math.random() * 3000),
        '\u05D7\u05E9\u05DE\u05DC/\u05DE\u05D9\u05DD': 1500 + Math.round(Math.random() * 4000),
        '\u05EA\u05D5\u05DB\u05E0\u05D9\u05D5\u05EA': 1000 + Math.round(Math.random() * 5000),
        '\u05D0\u05D7\u05E8': 300 + Math.round(Math.random() * 3000)
      };
      entries.push({
        '\u05DE\u05D6\u05D4\u05D4': 'bdg-' + (entries.length + 1),
        '\u05EA\u05D0\u05E8\u05D9\u05DA': `${moStr}-${String(day).padStart(2,'0')}`,
        '\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4': cat,
        '\u05EA\u05D9\u05D0\u05D5\u05E8': catDescs[i % catDescs.length],
        '\u05E1\u05DB\u05D5\u05DD': amounts[cat] || 1000,
        '\u05E1\u05E4\u05E7': vendors[(i + 1) % vendors.length],
        '\u05DE\u05E1\u05E4\u05E8_\u05E7\u05D1\u05DC\u05D4': 'R-' + (1000 + entries.length)
      });
    }
    return entries.sort((a, b) => (b['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '').localeCompare(a['\u05EA\u05D0\u05E8\u05D9\u05DA'] || ''));
  },

  /* ---------- Last year demo (for comparison) ---------- */
  _budgLastYearData() {
    const cats = Object.keys(this._budgCategories);
    const months = {};
    for (let m = 0; m < 12; m++) {
      const key = String(m + 1).padStart(2, '0');
      months[key] = {};
      cats.forEach(c => {
        const alloc = this._budgCategories[c].allocated;
        months[key][c] = Math.round(alloc / 12 * (0.7 + Math.random() * 0.5));
      });
    }
    return months;
  },

  /* ---------- Main budget page HTML ---------- */
  budget() {
    const catKeys = Object.keys(this._budgCategories);
    const catOptions = catKeys.map(c => `<option value="${c}">${c}</option>`).join('');

    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
      <div>
        <h1><i class="bi bi-wallet2 me-2"></i>\u05EA\u05E7\u05E6\u05D9\u05D1 \u05E9\u05E0\u05EA\u05D9</h1>
        <p class="text-muted mb-0">\u05E0\u05D9\u05D4\u05D5\u05DC \u05EA\u05E7\u05E6\u05D9\u05D1 \u05DE\u05E7\u05D9\u05E3 \u2014 \u05E9\u05E0\u05EA ${new Date().getFullYear()}</p>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-secondary btn-sm" onclick="Pages.budgExport()"><i class="bi bi-download me-1"></i>\u05D9\u05D9\u05E6\u05D5\u05D0</button>
        <button class="btn btn-primary btn-sm" onclick="Pages.showAddBudget()"><i class="bi bi-plus-lg me-1"></i>\u05D4\u05D5\u05E6\u05D0\u05D4 \u05D7\u05D3\u05E9\u05D4</button>
      </div>
    </div>

    <!-- Budget Overview Cards -->
    <div class="row g-3 mb-4">
      <div class="col-6 col-md-3">
        <div class="card p-3 text-center border-0 shadow-sm">
          <i class="bi bi-bank fs-3 text-primary mb-1"></i>
          <div class="fs-3 fw-bold text-primary" id="budg-annual">\u20AA0</div>
          <small class="text-muted">\u05EA\u05E7\u05E6\u05D9\u05D1 \u05E9\u05E0\u05EA\u05D9</small>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card p-3 text-center border-0 shadow-sm">
          <i class="bi bi-cash-stack fs-3 text-danger mb-1"></i>
          <div class="fs-3 fw-bold text-danger" id="budg-spent">\u20AA0</div>
          <small class="text-muted">\u05D4\u05D5\u05E6\u05D0\u05D5\u05EA \u05D1\u05E4\u05D5\u05E2\u05DC</small>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card p-3 text-center border-0 shadow-sm">
          <i class="bi bi-piggy-bank fs-3 text-success mb-1"></i>
          <div class="fs-3 fw-bold text-success" id="budg-remaining">\u20AA0</div>
          <small class="text-muted">\u05D9\u05EA\u05E8\u05D4</small>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card p-3 text-center border-0 shadow-sm">
          <i class="bi bi-speedometer2 fs-3 text-warning mb-1"></i>
          <div class="fs-3 fw-bold" id="budg-pct">0%</div>
          <div class="progress mt-2" style="height:8px">
            <div class="progress-bar" id="budg-pct-bar" style="width:0%"></div>
          </div>
          <small class="text-muted">\u05E0\u05D9\u05E6\u05D5\u05DC\u05D5\u05EA</small>
        </div>
      </div>
    </div>

    <!-- Budget Alerts -->
    <div id="budg-alerts" class="mb-3"></div>

    <!-- Category Breakdown -->
    <h5 class="mb-3"><i class="bi bi-grid-3x3-gap me-2"></i>\u05E4\u05D9\u05E8\u05D5\u05D8 \u05DC\u05E4\u05D9 \u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4</h5>
    <div class="row g-3 mb-4" id="budg-cats"></div>

    <!-- Charts Row -->
    <div class="row g-3 mb-4">
      <div class="col-lg-7">
        <div class="card border-0 shadow-sm p-3">
          <h6 class="mb-3"><i class="bi bi-bar-chart me-2"></i>\u05EA\u05E7\u05E6\u05D9\u05D1 \u05DE\u05D5\u05DC \u05D1\u05D9\u05E6\u05D5\u05E2 \u2014 \u05DE\u05D2\u05DE\u05D4 \u05D7\u05D5\u05D3\u05E9\u05D9\u05EA</h6>
          <canvas id="budg-trend-chart" height="260"></canvas>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="card border-0 shadow-sm p-3">
          <h6 class="mb-3"><i class="bi bi-pie-chart me-2"></i>\u05D4\u05EA\u05E4\u05DC\u05D2\u05D5\u05EA \u05DC\u05E4\u05D9 \u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4</h6>
          <canvas id="budg-pie-chart" height="260"></canvas>
        </div>
      </div>
    </div>

    <!-- Annual Comparison -->
    <div class="card border-0 shadow-sm p-3 mb-4">
      <h6 class="mb-3"><i class="bi bi-arrow-left-right me-2"></i>\u05D4\u05E9\u05D5\u05D5\u05D0\u05D4 \u05E9\u05E0\u05EA\u05D9\u05EA: ${new Date().getFullYear()} \u05DE\u05D5\u05DC ${new Date().getFullYear() - 1}</h6>
      <canvas id="budg-compare-chart" height="220"></canvas>
    </div>

    <!-- Filter bar -->
    <div class="card border-0 shadow-sm p-3 mb-3">
      <div class="row g-2 align-items-end">
        <div class="col-md-3">
          <label class="form-label small">\u05D7\u05D9\u05E4\u05D5\u05E9</label>
          <input class="form-control form-control-sm" id="budg-search" placeholder="\u05D7\u05E4\u05E9 \u05EA\u05D9\u05D0\u05D5\u05E8, \u05E1\u05E4\u05E7..." oninput="Pages.filterBudgetTable()">
        </div>
        <div class="col-md-2">
          <label class="form-label small">\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4</label>
          <select class="form-select form-select-sm" id="budg-filter-cat" onchange="Pages.filterBudgetTable()">
            <option value="">\u05D4\u05DB\u05DC</option>
            ${catOptions}
          </select>
        </div>
        <div class="col-md-2">
          <label class="form-label small">\u05DE\u05D7\u05D5\u05D3\u05E9</label>
          <select class="form-select form-select-sm" id="budg-filter-month" onchange="Pages.filterBudgetTable()">
            <option value="">\u05D4\u05DB\u05DC</option>
            <option value="01">\u05D9\u05E0\u05D5\u05D0\u05E8</option><option value="02">\u05E4\u05D1\u05E8\u05D5\u05D0\u05E8</option><option value="03">\u05DE\u05E8\u05E5</option>
            <option value="04">\u05D0\u05E4\u05E8\u05D9\u05DC</option><option value="05">\u05DE\u05D0\u05D9</option><option value="06">\u05D9\u05D5\u05E0\u05D9</option>
            <option value="07">\u05D9\u05D5\u05DC\u05D9</option><option value="08">\u05D0\u05D5\u05D2\u05D5\u05E1\u05D8</option><option value="09">\u05E1\u05E4\u05D8\u05DE\u05D1\u05E8</option>
            <option value="10">\u05D0\u05D5\u05E7\u05D8\u05D5\u05D1\u05E8</option><option value="11">\u05E0\u05D5\u05D1\u05DE\u05D1\u05E8</option><option value="12">\u05D3\u05E6\u05DE\u05D1\u05E8</option>
          </select>
        </div>
        <div class="col-md-2">
          <label class="form-label small">\u05DE\u05D9\u05D9\u05DF \u05DC\u05E4\u05D9</label>
          <select class="form-select form-select-sm" id="budg-sort" onchange="Pages.filterBudgetTable()">
            <option value="date-desc">\u05EA\u05D0\u05E8\u05D9\u05DA (\u05D7\u05D3\u05E9\u2190\u05D9\u05E9\u05DF)</option>
            <option value="date-asc">\u05EA\u05D0\u05E8\u05D9\u05DA (\u05D9\u05E9\u05DF\u2190\u05D7\u05D3\u05E9)</option>
            <option value="amount-desc">\u05E1\u05DB\u05D5\u05DD (\u05D2\u05D1\u05D5\u05D4\u2190\u05E0\u05DE\u05D5\u05DA)</option>
            <option value="amount-asc">\u05E1\u05DB\u05D5\u05DD (\u05E0\u05DE\u05D5\u05DA\u2190\u05D2\u05D1\u05D5\u05D4)</option>
            <option value="cat">\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4</option>
          </select>
        </div>
        <div class="col-md-3 text-end">
          <span class="badge bg-secondary" id="budg-count-badge">0 \u05E8\u05E9\u05D5\u05DE\u05D5\u05EA</span>
        </div>
      </div>
    </div>

    <!-- Expense Log Table -->
    <div id="budg-list">${Utils.skeletonTable(8, 7)}</div>

    <!-- Add/Edit Expense Modal -->
    <div class="modal fade" id="budg-modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><i class="bi bi-receipt me-2"></i>\u05D4\u05D5\u05E6\u05D0\u05D4 \u05D7\u05D3\u05E9\u05D4</h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="row g-3">
              <div class="col-6">
                <label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA</label>
                <input type="date" class="form-control" id="bgf-date">
              </div>
              <div class="col-6">
                <label class="form-label">\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4</label>
                <select class="form-select" id="bgf-cat">
                  ${catOptions}
                </select>
              </div>
              <div class="col-12">
                <label class="form-label">\u05EA\u05D9\u05D0\u05D5\u05E8</label>
                <input class="form-control" id="bgf-desc" placeholder="\u05EA\u05D9\u05D0\u05D5\u05E8 \u05D4\u05D4\u05D5\u05E6\u05D0\u05D4">
              </div>
              <div class="col-6">
                <label class="form-label">\u05E1\u05DB\u05D5\u05DD (\u20AA)</label>
                <input type="number" class="form-control" id="bgf-amount" min="0" step="0.01">
              </div>
              <div class="col-6">
                <label class="form-label">\u05DE\u05E1\u05E4\u05E8 \u05E7\u05D1\u05DC\u05D4</label>
                <input class="form-control" id="bgf-receipt" placeholder="\u05DE\u05E1\u05E4\u05E8 \u05E7\u05D1\u05DC\u05D4/\u05D7\u05E9\u05D1\u05D5\u05E0\u05D9\u05EA">
              </div>
              <div class="col-12">
                <label class="form-label">\u05E1\u05E4\u05E7</label>
                <input class="form-control" id="bgf-vendor" placeholder="\u05E9\u05DD \u05D4\u05E1\u05E4\u05E7">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button>
            <button class="btn btn-primary" onclick="Pages.saveBudget()"><i class="bi bi-check-lg me-1"></i>\u05E9\u05DE\u05D5\u05E8</button>
          </div>
        </div>
      </div>
    </div>`;
  },

  _budgData: [],
  _budgEditId: null,
  _budgFilteredData: [],

  async budgetInit() {
    let data = await App.getData('\u05EA\u05E7\u05E6\u05D9\u05D1');
    if (!data || !data.length) data = this._budgDemoData();
    this._budgData = data;
    this._budgFilteredData = [...data];
    this.renderBudget();
  },

  renderBudget() {
    const data = this._budgData;
    const totalBudget = this._budgAnnualBudget;
    const totalSpent = data.reduce((s, r) => s + (parseFloat(r['\u05E1\u05DB\u05D5\u05DD']) || 0), 0);
    const remaining = totalBudget - totalSpent;
    const pct = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

    // Overview cards
    document.getElementById('budg-annual').textContent = Utils.formatCurrency(totalBudget);
    document.getElementById('budg-spent').textContent = Utils.formatCurrency(totalSpent);
    document.getElementById('budg-remaining').textContent = Utils.formatCurrency(remaining);
    const pctEl = document.getElementById('budg-pct');
    pctEl.textContent = pct + '%';
    pctEl.className = 'fs-3 fw-bold ' + (pct >= 90 ? 'text-danger' : pct >= 70 ? 'text-warning' : 'text-success');
    const bar = document.getElementById('budg-pct-bar');
    bar.style.width = Math.min(pct, 100) + '%';
    bar.className = 'progress-bar ' + (pct >= 90 ? 'bg-danger' : pct >= 70 ? 'bg-warning' : 'bg-success');

    // Category breakdown
    this._renderBudgCategories(data);

    // Alerts
    this._renderBudgAlerts(data);

    // Charts
    this._renderBudgTrendChart(data);
    this._renderBudgPieChart(data);
    this._renderBudgCompareChart(data);

    // Table
    this.filterBudgetTable();
  },

  /* ---------- Category cards ---------- */
  _renderBudgCategories(data) {
    const container = document.getElementById('budg-cats');
    const cats = this._budgCategories;
    let html = '';
    Object.entries(cats).forEach(([name, cfg]) => {
      const spent = data.filter(r => r['\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4'] === name)
        .reduce((s, r) => s + (parseFloat(r['\u05E1\u05DB\u05D5\u05DD']) || 0), 0);
      const remaining = cfg.allocated - spent;
      const pct = cfg.allocated > 0 ? Math.round((spent / cfg.allocated) * 100) : 0;
      const isOver = pct >= 80;
      const barColor = pct >= 90 ? 'bg-danger' : pct >= 80 ? 'bg-warning' : 'bg-success';
      html += `
        <div class="col-md-4 col-sm-6">
          <div class="card border-0 shadow-sm p-3 h-100 ${isOver ? 'border-start border-4 border-danger' : ''}">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div class="d-flex align-items-center gap-2">
                <div class="rounded-circle d-flex align-items-center justify-content-center" style="width:36px;height:36px;background:${cfg.color}20">
                  <i class="bi ${cfg.icon}" style="color:${cfg.color};font-size:1.1rem"></i>
                </div>
                <span class="fw-bold">${name}</span>
              </div>
              ${isOver ? '<span class="badge bg-danger"><i class="bi bi-exclamation-triangle me-1"></i>\u05D7\u05E8\u05D9\u05D2\u05D4</span>' : ''}
            </div>
            <div class="row g-1 mb-2 small">
              <div class="col-4 text-center">
                <div class="text-muted">\u05D4\u05E7\u05E6\u05D0\u05D4</div>
                <div class="fw-bold" style="color:${cfg.color}">${Utils.formatCurrency(cfg.allocated)}</div>
              </div>
              <div class="col-4 text-center">
                <div class="text-muted">\u05E0\u05D5\u05E6\u05DC</div>
                <div class="fw-bold text-danger">${Utils.formatCurrency(spent)}</div>
              </div>
              <div class="col-4 text-center">
                <div class="text-muted">\u05E0\u05D5\u05EA\u05E8</div>
                <div class="fw-bold ${remaining < 0 ? 'text-danger' : 'text-success'}">${Utils.formatCurrency(remaining)}</div>
              </div>
            </div>
            <div class="progress" style="height:6px">
              <div class="progress-bar ${barColor}" style="width:${Math.min(pct, 100)}%"></div>
            </div>
            <div class="text-end mt-1"><small class="text-muted">${pct}%</small></div>
          </div>
        </div>`;
    });
    container.innerHTML = html;
  },

  /* ---------- Budget alerts ---------- */
  _renderBudgAlerts(data) {
    const container = document.getElementById('budg-alerts');
    const cats = this._budgCategories;
    let alerts = '';
    Object.entries(cats).forEach(([name, cfg]) => {
      const spent = data.filter(r => r['\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4'] === name)
        .reduce((s, r) => s + (parseFloat(r['\u05E1\u05DB\u05D5\u05DD']) || 0), 0);
      const pct = cfg.allocated > 0 ? Math.round((spent / cfg.allocated) * 100) : 0;
      if (pct >= 100) {
        alerts += `<div class="alert alert-danger py-2 d-flex align-items-center gap-2"><i class="bi bi-exclamation-octagon-fill"></i><strong>${name}</strong> \u05D7\u05E8\u05D2 \u05DE\u05D4\u05EA\u05E7\u05E6\u05D9\u05D1! (${pct}%) \u2014 \u05D7\u05E8\u05D9\u05D2\u05D4 \u05E9\u05DC ${Utils.formatCurrency(spent - cfg.allocated)}</div>`;
      } else if (pct >= 80) {
        alerts += `<div class="alert alert-warning py-2 d-flex align-items-center gap-2"><i class="bi bi-exclamation-triangle-fill"></i><strong>${name}</strong> \u05DE\u05EA\u05E7\u05E8\u05D1 \u05DC\u05D2\u05D1\u05D5\u05DC (${pct}%) \u2014 \u05E0\u05D5\u05EA\u05E8\u05D5 ${Utils.formatCurrency(cfg.allocated - spent)}</div>`;
      }
    });
    container.innerHTML = alerts;
  },

  /* ---------- Monthly trend bar chart ---------- */
  _renderBudgTrendChart(data) {
    const ctx = document.getElementById('budg-trend-chart');
    if (!ctx) return;
    if (App.charts.budgTrend) { App.charts.budgTrend.destroy(); App.charts.budgTrend = null; }

    const monthlyBudget = Math.round(this._budgAnnualBudget / 12);
    const months = {};
    for (let m = 1; m <= 12; m++) months[String(m).padStart(2, '0')] = 0;
    data.forEach(r => {
      const d = r['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '';
      const mo = d.substring(5, 7);
      if (months[mo] !== undefined) months[mo] += parseFloat(r['\u05E1\u05DB\u05D5\u05DD']) || 0;
    });

    const labels = Utils.HEB_MONTHS;
    const actual = Object.values(months).map(v => Math.round(v));
    const budgetLine = new Array(12).fill(monthlyBudget);

    App.charts.budgTrend = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: '\u05D1\u05D9\u05E6\u05D5\u05E2 \u05D1\u05E4\u05D5\u05E2\u05DC', data: actual, backgroundColor: actual.map(v => v > monthlyBudget ? '#dc262680' : '#2563eb80'), borderColor: actual.map(v => v > monthlyBudget ? '#dc2626' : '#2563eb'), borderWidth: 1, borderRadius: 4 },
          { label: '\u05EA\u05E7\u05E6\u05D9\u05D1 \u05D7\u05D5\u05D3\u05E9\u05D9', data: budgetLine, type: 'line', borderColor: '#f59e0b', borderWidth: 2, borderDash: [5, 5], pointRadius: 0, fill: false }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom', labels: { font: { family: 'Heebo', size: 11 } } } },
        scales: {
          y: { beginAtZero: true, ticks: { callback: v => '\u20AA' + (v / 1000).toFixed(0) + 'K' } },
          x: { ticks: { font: { family: 'Heebo', size: 10 } } }
        }
      }
    });
  },

  /* ---------- Category pie/doughnut chart ---------- */
  _renderBudgPieChart(data) {
    const ctx = document.getElementById('budg-pie-chart');
    if (!ctx) return;
    if (App.charts.budgPie) { App.charts.budgPie.destroy(); App.charts.budgPie = null; }

    const cats = {};
    const colors = [];
    data.forEach(r => {
      const c = r['\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4'] || '\u05D0\u05D7\u05E8';
      cats[c] = (cats[c] || 0) + (parseFloat(r['\u05E1\u05DB\u05D5\u05DD']) || 0);
    });
    Object.keys(cats).forEach(c => {
      colors.push(this._budgCategories[c] ? this._budgCategories[c].color : '#94a3b8');
    });

    App.charts.budgPie = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(cats),
        datasets: [{ data: Object.values(cats).map(v => Math.round(v)), backgroundColor: colors, borderWidth: 2, borderColor: '#fff' }]
      },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: '55%',
        plugins: {
          legend: { position: 'bottom', labels: { font: { family: 'Heebo', size: 11 }, padding: 12 } },
          tooltip: { callbacks: { label: ctx2 => `${ctx2.label}: \u20AA${ctx2.raw.toLocaleString()} (${Math.round(ctx2.raw / Object.values(cats).reduce((a,b)=>a+b,0) * 100)}%)` } }
        }
      }
    });
  },

  /* ---------- Annual comparison chart ---------- */
  _renderBudgCompareChart(data) {
    const ctx = document.getElementById('budg-compare-chart');
    if (!ctx) return;
    if (App.charts.budgCompare) { App.charts.budgCompare.destroy(); App.charts.budgCompare = null; }

    // This year totals per month
    const thisYear = {};
    for (let m = 1; m <= 12; m++) thisYear[String(m).padStart(2, '0')] = 0;
    data.forEach(r => {
      const d = r['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '';
      const mo = d.substring(5, 7);
      if (thisYear[mo] !== undefined) thisYear[mo] += parseFloat(r['\u05E1\u05DB\u05D5\u05DD']) || 0;
    });

    // Last year (demo)
    const lastYearMonths = this._budgLastYearData();
    const lastYearTotals = {};
    Object.entries(lastYearMonths).forEach(([mo, cats]) => {
      lastYearTotals[mo] = Object.values(cats).reduce((a, b) => a + b, 0);
    });

    App.charts.budgCompare = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Utils.HEB_MONTHS,
        datasets: [
          { label: `${new Date().getFullYear()}`, data: Object.values(thisYear).map(v => Math.round(v)), backgroundColor: '#2563eb80', borderColor: '#2563eb', borderWidth: 1, borderRadius: 4 },
          { label: `${new Date().getFullYear() - 1}`, data: Object.values(lastYearTotals).map(v => Math.round(v)), backgroundColor: '#94a3b840', borderColor: '#94a3b8', borderWidth: 1, borderRadius: 4 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom', labels: { font: { family: 'Heebo', size: 11 } } } },
        scales: {
          y: { beginAtZero: true, ticks: { callback: v => '\u20AA' + (v / 1000).toFixed(0) + 'K' } },
          x: { ticks: { font: { family: 'Heebo', size: 10 } } }
        }
      }
    });
  },

  /* ---------- Filter / sort expense table ---------- */
  filterBudgetTable() {
    const search = (document.getElementById('budg-search')?.value || '').trim().toLowerCase();
    const catFilter = document.getElementById('budg-filter-cat')?.value || '';
    const monthFilter = document.getElementById('budg-filter-month')?.value || '';
    const sortVal = document.getElementById('budg-sort')?.value || 'date-desc';

    let filtered = this._budgData.filter(r => {
      if (catFilter && r['\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4'] !== catFilter) return false;
      if (monthFilter) {
        const d = r['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '';
        if (d.substring(5, 7) !== monthFilter) return false;
      }
      if (search) {
        const txt = [r['\u05EA\u05D9\u05D0\u05D5\u05E8'], r['\u05E1\u05E4\u05E7'], r['\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4'], r['\u05DE\u05E1\u05E4\u05E8_\u05E7\u05D1\u05DC\u05D4']].join(' ').toLowerCase();
        if (!txt.includes(search)) return false;
      }
      return true;
    });

    // Sort
    switch (sortVal) {
      case 'date-asc': filtered.sort((a, b) => (a['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '').localeCompare(b['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '')); break;
      case 'date-desc': filtered.sort((a, b) => (b['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '').localeCompare(a['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '')); break;
      case 'amount-desc': filtered.sort((a, b) => (parseFloat(b['\u05E1\u05DB\u05D5\u05DD']) || 0) - (parseFloat(a['\u05E1\u05DB\u05D5\u05DD']) || 0)); break;
      case 'amount-asc': filtered.sort((a, b) => (parseFloat(a['\u05E1\u05DB\u05D5\u05DD']) || 0) - (parseFloat(b['\u05E1\u05DB\u05D5\u05DD']) || 0)); break;
      case 'cat': filtered.sort((a, b) => (a['\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4'] || '').localeCompare(b['\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4'] || '')); break;
    }

    this._budgFilteredData = filtered;
    const filteredTotal = filtered.reduce((s, r) => s + (parseFloat(r['\u05E1\u05DB\u05D5\u05DD']) || 0), 0);

    document.getElementById('budg-count-badge').textContent = filtered.length + ' \u05E8\u05E9\u05D5\u05DE\u05D5\u05EA \u2022 ' + Utils.formatCurrency(filteredTotal);

    if (!filtered.length) {
      document.getElementById('budg-list').innerHTML = '<div class="empty-state py-4 text-center"><i class="bi bi-wallet2 fs-1 text-muted"></i><h5 class="mt-2">\u05D0\u05D9\u05DF \u05D4\u05D5\u05E6\u05D0\u05D5\u05EA \u05DC\u05D4\u05E6\u05D9\u05D2</h5></div>';
      return;
    }

    const catColors = {};
    Object.entries(this._budgCategories).forEach(([name, cfg]) => { catColors[name] = cfg.color; });

    let cum = 0;
    document.getElementById('budg-list').innerHTML = `
      <div class="card border-0 shadow-sm">
        <div class="table-responsive">
          <table class="table table-bht table-hover mb-0">
            <thead>
              <tr>
                <th style="width:40px">#</th>
                <th>\u05EA\u05D0\u05E8\u05D9\u05DA</th>
                <th>\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4</th>
                <th>\u05EA\u05D9\u05D0\u05D5\u05E8</th>
                <th>\u05E1\u05DB\u05D5\u05DD</th>
                <th>\u05DE\u05E6\u05D8\u05D1\u05E8</th>
                <th>\u05E1\u05E4\u05E7</th>
                <th>\u05E7\u05D1\u05DC\u05D4</th>
                <th style="width:80px"></th>
              </tr>
            </thead>
            <tbody>
              ${filtered.map((r, idx) => {
                const a = parseFloat(r['\u05E1\u05DB\u05D5\u05DD']) || 0;
                const bgId = r.id || r['\u05DE\u05D6\u05D4\u05D4'] || Utils.rowId(r);
                cum += a;
                const cat = r['\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4'] || '\u05D0\u05D7\u05E8';
                const catColor = catColors[cat] || '#94a3b8';
                const catIcon = (this._budgCategories[cat] || {}).icon || 'bi-three-dots';
                return `<tr>
                  <td class="text-muted small">${idx + 1}</td>
                  <td class="small">${Utils.formatDateShort(r['\u05EA\u05D0\u05E8\u05D9\u05DA'])}</td>
                  <td><span class="badge" style="background:${catColor}20;color:${catColor}"><i class="bi ${catIcon} me-1"></i>${cat}</span></td>
                  <td>${r['\u05EA\u05D9\u05D0\u05D5\u05E8'] || ''}</td>
                  <td class="fw-bold text-danger">${Utils.formatCurrency(a)}</td>
                  <td class="fw-bold small">${Utils.formatCurrency(cum)}</td>
                  <td class="small">${r['\u05E1\u05E4\u05E7'] || ''}</td>
                  <td class="small text-muted">${r['\u05DE\u05E1\u05E4\u05E8_\u05E7\u05D1\u05DC\u05D4'] || ''}</td>
                  <td>
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="Pages.editBudgetItem('${bgId}')" title="\u05E2\u05E8\u05D9\u05DB\u05D4"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-outline-danger" onclick="Pages.deleteBudgetItem('${bgId}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button>
                  </td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  },

  /* ---------- Add/Edit/Delete budget items ---------- */
  showAddBudget() {
    this._budgEditId = null;
    document.getElementById('bgf-date').value = Utils.todayISO();
    document.getElementById('bgf-cat').value = Object.keys(this._budgCategories)[0];
    document.getElementById('bgf-desc').value = '';
    document.getElementById('bgf-amount').value = '';
    document.getElementById('bgf-receipt').value = '';
    document.getElementById('bgf-vendor').value = '';
    document.querySelector('#budg-modal .modal-title').innerHTML = '<i class="bi bi-receipt me-2"></i>\u05D4\u05D5\u05E6\u05D0\u05D4 \u05D7\u05D3\u05E9\u05D4';
    new bootstrap.Modal(document.getElementById('budg-modal')).show();
  },

  async saveBudget() {
    const row = {
      '\u05EA\u05D0\u05E8\u05D9\u05DA': document.getElementById('bgf-date').value,
      '\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4': document.getElementById('bgf-cat').value,
      '\u05EA\u05D9\u05D0\u05D5\u05E8': document.getElementById('bgf-desc').value.trim(),
      '\u05E1\u05DB\u05D5\u05DD': document.getElementById('bgf-amount').value,
      '\u05E1\u05E4\u05E7': document.getElementById('bgf-vendor').value.trim(),
      '\u05DE\u05E1\u05E4\u05E8_\u05E7\u05D1\u05DC\u05D4': document.getElementById('bgf-receipt').value.trim()
    };
    if (!row['\u05E1\u05DB\u05D5\u05DD'] || !row['\u05EA\u05D9\u05D0\u05D5\u05E8']) {
      Utils.toast('\u05E0\u05D0 \u05DC\u05DE\u05DC\u05D0 \u05EA\u05D9\u05D0\u05D5\u05E8 \u05D5\u05E1\u05DB\u05D5\u05DD', 'warning');
      return;
    }
    try {
      if (this._budgEditId) {
        await App.apiCall('update', '\u05EA\u05E7\u05E6\u05D9\u05D1', { id: this._budgEditId, row });
        this._budgEditId = null;
      } else {
        await App.apiCall('add', '\u05EA\u05E7\u05E6\u05D9\u05D1', { row });
      }
      bootstrap.Modal.getInstance(document.getElementById('budg-modal')).hide();
      Utils.toast('\u05E0\u05E9\u05DE\u05E8 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4');
      this.budgetInit();
    } catch (e) {
      Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4', 'danger');
    }
  },

  async deleteBudgetItem(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4', '\u05DC\u05DE\u05D7\u05D5\u05E7 \u05E8\u05E9\u05D5\u05DE\u05D4 \u05D6\u05D5?')) return;
    try {
      await App.apiCall('delete', '\u05EA\u05E7\u05E6\u05D9\u05D1', { id });
      Utils.toast('\u05E0\u05DE\u05D7\u05E7');
      this.budgetInit();
    } catch (e) {
      Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4', 'danger');
    }
  },

  editBudgetItem(id) {
    const item = this._budgData.find(r => (r.id || r['\u05DE\u05D6\u05D4\u05D4'] || '') == id);
    if (!item) return;
    document.getElementById('bgf-date').value = item['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '';
    document.getElementById('bgf-cat').value = item['\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4'] || '';
    document.getElementById('bgf-desc').value = item['\u05EA\u05D9\u05D0\u05D5\u05E8'] || '';
    document.getElementById('bgf-amount').value = item['\u05E1\u05DB\u05D5\u05DD'] || '';
    document.getElementById('bgf-vendor').value = item['\u05E1\u05E4\u05E7'] || '';
    document.getElementById('bgf-receipt').value = item['\u05DE\u05E1\u05E4\u05E8_\u05E7\u05D1\u05DC\u05D4'] || '';
    this._budgEditId = id;
    document.querySelector('#budg-modal .modal-title').innerHTML = '<i class="bi bi-pencil me-2"></i>\u05E2\u05E8\u05D9\u05DB\u05EA \u05D4\u05D5\u05E6\u05D0\u05D4';
    new bootstrap.Modal(document.getElementById('budg-modal')).show();
  },

  /* ---------- Export to CSV ---------- */
  budgExport() {
    const data = this._budgFilteredData.length ? this._budgFilteredData : this._budgData;
    if (!data.length) { Utils.toast('\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05DC\u05D9\u05D9\u05E6\u05D5\u05D0', 'warning'); return; }
    const headers = ['\u05EA\u05D0\u05E8\u05D9\u05DA', '\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4', '\u05EA\u05D9\u05D0\u05D5\u05E8', '\u05E1\u05DB\u05D5\u05DD', '\u05E1\u05E4\u05E7', '\u05DE\u05E1\u05E4\u05E8_\u05E7\u05D1\u05DC\u05D4'];
    let csv = '\uFEFF' + headers.join(',') + '\n';
    data.forEach(r => {
      csv += headers.map(h => '"' + (r[h] || '').toString().replace(/"/g, '""') + '"').join(',') + '\n';
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `\u05EA\u05E7\u05E6\u05D9\u05D1_${Utils.todayISO()}.csv`;
    a.click(); URL.revokeObjectURL(url);
    Utils.toast('\u05E7\u05D5\u05D1\u05E5 \u05D9\u05D5\u05E6\u05D0 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4');
  },
});
