/* ===== BHT v5.4 — Payment Plans / Installments (תוכניות תשלום) ===== */
Object.assign(Pages, {
  /* ======================================================================
     PAYMENT PLANS — Templates, Student Cards, Installments, Overdue, Charts
     ====================================================================== */

  /* ---------- Plan templates ---------- */
  _ppTemplates: [
    { id: 'monthly',     name: '\u05D7\u05D5\u05D3\u05E9\u05D9 (10 \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD)', count: 10, label: '\u05D7\u05D5\u05D3\u05E9\u05D9' },
    { id: 'quarterly',   name: '\u05E8\u05D1\u05E2\u05D5\u05E0\u05D9 (4 \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD)', count: 4,  label: '\u05E8\u05D1\u05E2\u05D5\u05E0\u05D9' },
    { id: 'semiannual',  name: '\u05D7\u05E6\u05D9-\u05E9\u05E0\u05EA\u05D9 (2 \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD)', count: 2,  label: '\u05D7\u05E6\u05D9-\u05E9\u05E0\u05EA\u05D9' },
    { id: 'custom',      name: '\u05DE\u05D5\u05EA\u05D0\u05DD \u05D0\u05D9\u05E9\u05D9\u05EA', count: 0,  label: '\u05DE\u05D5\u05EA\u05D0\u05DD \u05D0\u05D9\u05E9\u05D9\u05EA' }
  ],

  /* ---------- State ---------- */
  _ppPlans: [],
  _ppFilter: 'all',       // all | active | completed | overdue
  _ppSearch: '',
  _ppChartCollection: null,
  _ppChartMonthly: null,
  _ppExpandedPlan: null,

  /* ---------- Demo data: 10 students with varied plans ---------- */
  _ppDemoData() {
    const students = [

      { name: '\u05D9\u05D5\u05E1\u05E3 \u05DB\u05D4\u05DF',       total: 12000, template: 'monthly',    start: '2025-09-01' },
      { name: '\u05DE\u05E9\u05D4 \u05DC\u05D5\u05D9',        total: 12000, template: 'monthly',    start: '2025-09-01' },
      { name: '\u05D0\u05D1\u05E8\u05D4\u05DD \u05D9\u05E6\u05D7\u05E7\u05D9',  total: 10000, template: 'quarterly',  start: '2025-09-01' }
  ];

    const now = new Date();
    const plans = students.map((s, idx) => {
      const tpl = this._ppTemplates.find(t => t.id === s.template);
      const count = s.template === 'custom' ? (s.customCount || 3) : tpl.count;
      const perInstallment = Math.round(s.total / count);
      const startDate = new Date(s.start);
      const monthGap = s.template === 'quarterly' ? 3 : s.template === 'semiannual' ? 6 : 1;

      const installments = [];
      for (let i = 0; i < count; i++) {
        const due = new Date(startDate.getFullYear(), startDate.getMonth() + i * monthGap, 10);
        const isPast = due <= now;
        // Simulate payment patterns: first students pay well, later ones have gaps
        let status = 'pending';
        let paidDate = '';
        if (isPast) {
          if (idx < 3 || (idx < 7 && i < count - 2)) {
            status = 'paid';
            paidDate = new Date(due.getFullYear(), due.getMonth(), due.getDate() + Math.floor(Math.random() * 5)).toISOString().slice(0, 10);
          } else if (idx >= 7 && i >= 3) {
            status = 'overdue';
          } else if (i < count - 1) {
            status = 'paid';
            paidDate = new Date(due.getFullYear(), due.getMonth(), due.getDate() + Math.floor(Math.random() * 10)).toISOString().slice(0, 10);
          } else {
            status = 'overdue';
          }
        }
        installments.push({
          num: i + 1,
          dueDate: due.toISOString().slice(0, 10),
          amount: i === count - 1 ? s.total - perInstallment * (count - 1) : perInstallment,
          status,
          paidDate
        });
      }
      return {
        id: 'plan-' + (idx + 1),
        studentName: s.name,
        studentId: 'stu-' + (idx + 1),
        total: s.total,
        template: s.template,
        templateLabel: tpl.label,
        startDate: s.start,
        installments,
        phone: '05' + (20 + idx) + '-' + String(1000000 + Math.floor(Math.random() * 9000000)).slice(0, 7),
        notes: ''
      };
    });
    return plans;
  },

  /* ---------- Computed helpers ---------- */
  _ppPlanStats(plan) {
    const paid = plan.installments.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
    const overdue = plan.installments.filter(i => i.status === 'overdue').reduce((s, i) => s + i.amount, 0);
    const pending = plan.installments.filter(i => i.status === 'pending').reduce((s, i) => s + i.amount, 0);
    const paidCount = plan.installments.filter(i => i.status === 'paid').length;
    const overdueCount = plan.installments.filter(i => i.status === 'overdue').length;
    const next = plan.installments.find(i => i.status === 'pending');
    const pct = Math.round(paid / plan.total * 100);
    const isCompleted = paidCount === plan.installments.length;
    const isOverdue = overdueCount > 0;
    return { paid, overdue, pending, paidCount, overdueCount, next, pct, isCompleted, isOverdue };
  },

  /* ---------- Main page HTML ---------- */
  paymentplans() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div>
          <h1><i class="bi bi-credit-card-2-front me-2"></i>\u05EA\u05D5\u05DB\u05E0\u05D9\u05D5\u05EA \u05EA\u05E9\u05DC\u05D5\u05DD</h1>
          <p class="text-muted mb-0">\u05E0\u05D9\u05D4\u05D5\u05DC \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD, \u05EA\u05D5\u05DB\u05E0\u05D9\u05D5\u05EA \u05D5\u05DE\u05E2\u05E7\u05D1 \u05D2\u05D1\u05D9\u05D9\u05D4</p>
        </div>
        <div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-warning btn-sm" onclick="Pages.ppShowOverdue()"><i class="bi bi-exclamation-triangle me-1"></i>\u05D7\u05D5\u05D1\u05D5\u05EA \u05D1\u05D0\u05D9\u05D7\u05D5\u05E8</button>
          <button class="btn btn-primary btn-sm" onclick="Pages.ppShowCreateModal()"><i class="bi bi-plus-lg me-1"></i>\u05EA\u05D5\u05DB\u05E0\u05D9\u05EA \u05D7\u05D3\u05E9\u05D4</button>
          <button class="btn btn-outline-success btn-sm" onclick="Pages.ppExportCSV()"><i class="bi bi-download me-1"></i>CSV</button>
        </div>
      </div>

      <!-- Stats Row -->
      <div class="row g-3 mb-4" id="pp-stats-row">
        <div class="col-6 col-md-3">
          <div class="card stat-card p-3">
            <div class="d-flex align-items-center justify-content-between">
              <div><div class="stat-value fs-4 fw-bold" id="pp-stat-total">--</div><div class="stat-label text-muted">\u05E1\u05D4"\u05DB \u05EA\u05D5\u05DB\u05E0\u05D9\u05D5\u05EA</div></div>
              <div class="stat-icon gradient-primary"><i class="bi bi-journals"></i></div>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card stat-card p-3">
            <div class="d-flex align-items-center justify-content-between">
              <div><div class="stat-value fs-4 fw-bold text-success" id="pp-stat-active">--</div><div class="stat-label text-muted">\u05EA\u05D5\u05DB\u05E0\u05D9\u05D5\u05EA \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA</div></div>
              <div class="stat-icon gradient-success"><i class="bi bi-check2-circle"></i></div>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card stat-card p-3">
            <div class="d-flex align-items-center justify-content-between">
              <div><div class="stat-value fs-4 fw-bold text-primary" id="pp-stat-rate">--</div><div class="stat-label text-muted">\u05D0\u05D7\u05D5\u05D6 \u05D2\u05D1\u05D9\u05D9\u05D4</div></div>
              <div class="stat-icon gradient-info"><i class="bi bi-percent"></i></div>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card stat-card p-3">
            <div class="d-flex align-items-center justify-content-between">
              <div><div class="stat-value fs-4 fw-bold text-danger" id="pp-stat-overdue">--</div><div class="stat-label text-muted">\u05D7\u05D5\u05D1 \u05D1\u05D0\u05D9\u05D7\u05D5\u05E8</div></div>
              <div class="stat-icon gradient-danger"><i class="bi bi-alarm"></i></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter & Search Bar -->
      <div class="card mb-4">
        <div class="card-body p-3">
          <div class="row g-2 align-items-center">
            <div class="col-md-5">
              <div class="input-group input-group-sm">
                <span class="input-group-text"><i class="bi bi-search"></i></span>
                <input type="text" class="form-control" id="pp-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05EA\u05DC\u05DE\u05D9\u05D3..." oninput="Pages.ppApplyFilter()">
              </div>
            </div>
            <div class="col-md-7">
              <div class="btn-group btn-group-sm w-100" role="group">
                <button class="btn btn-outline-secondary active" data-pp-filter="all" onclick="Pages.ppSetFilter('all')">\u05D4\u05DB\u05DC</button>
                <button class="btn btn-outline-success" data-pp-filter="active" onclick="Pages.ppSetFilter('active')">\u05E4\u05E2\u05D9\u05DC\u05D5\u05EA</button>
                <button class="btn btn-outline-primary" data-pp-filter="completed" onclick="Pages.ppSetFilter('completed')">\u05D4\u05D5\u05E9\u05DC\u05DE\u05D5</button>
                <button class="btn btn-outline-danger" data-pp-filter="overdue" onclick="Pages.ppSetFilter('overdue')">\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Student Plan Cards -->
      <div id="pp-cards-container" class="row g-3 mb-4">
        ${Utils.skeleton(3)}
      </div>

      <!-- Charts Row -->
      <div class="row g-3 mb-4">
        <div class="col-md-5">
          <div class="card">
            <div class="card-header"><i class="bi bi-pie-chart-fill me-2 text-primary"></i>\u05D0\u05D7\u05D5\u05D6 \u05D2\u05D1\u05D9\u05D9\u05D4</div>
            <div class="card-body" style="height:280px;"><canvas id="pp-chart-collection"></canvas></div>
          </div>
        </div>
        <div class="col-md-7">
          <div class="card">
            <div class="card-header"><i class="bi bi-bar-chart-fill me-2 text-success"></i>\u05E6\u05E4\u05D5\u05D9 \u05DE\u05D5\u05DC \u05DE\u05DE\u05E9\u05D9 \u05DC\u05E2\u05D5\u05DE\u05EA \u05D1\u05E4\u05D5\u05E2\u05DC</div>
            <div class="card-body" style="height:280px;"><canvas id="pp-chart-monthly"></canvas></div>
          </div>
        </div>
      </div>

      <!-- Overdue Dashboard (hidden by default) -->
      <div class="card mb-4 d-none" id="pp-overdue-section">
        <div class="card-header bg-danger text-white d-flex justify-content-between align-items-center">
          <span><i class="bi bi-exclamation-triangle-fill me-2"></i>\u05D7\u05D5\u05D1\u05D5\u05EA \u05D1\u05D0\u05D9\u05D7\u05D5\u05E8 \u2014 \u05DC\u05D5\u05D7 \u05D1\u05E7\u05E8\u05D4</span>
          <button class="btn btn-sm btn-outline-light" onclick="Pages.ppHideOverdue()"><i class="bi bi-x-lg"></i></button>
        </div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead><tr><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th>\u05EA\u05E9\u05DC\u05D5\u05DD</th><th>\u05EA\u05D0\u05E8\u05D9\u05DA \u05D9\u05E2\u05D3</th><th>\u05D9\u05DE\u05D9 \u05D0\u05D9\u05D7\u05D5\u05E8</th><th>\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA</th></tr></thead>
              <tbody id="pp-overdue-tbody"></tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Installment Detail Modal -->
      <div class="modal fade" id="pp-detail-modal" tabindex="-1">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="pp-detail-title">\u05E4\u05D9\u05E8\u05D5\u05D8 \u05EA\u05D5\u05DB\u05E0\u05D9\u05EA</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body" id="pp-detail-body"></div>
          </div>
        </div>
      </div>

      <!-- Create Plan Modal -->
      <div class="modal fade" id="pp-create-modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"><i class="bi bi-plus-circle me-2"></i>\u05EA\u05D5\u05DB\u05E0\u05D9\u05EA \u05EA\u05E9\u05DC\u05D5\u05DD \u05D7\u05D3\u05E9\u05D4</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label fw-bold">\u05E9\u05DD \u05EA\u05DC\u05DE\u05D9\u05D3</label>
                <select class="form-select" id="ppf-student">
                  <option value="">\u05D1\u05D7\u05E8 \u05EA\u05DC\u05DE\u05D9\u05D3...</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">\u05E1\u05DB\u05D5\u05DD \u05DB\u05D5\u05DC\u05DC</label>
                <div class="input-group">
                  <span class="input-group-text">\u20AA</span>
                  <input type="number" class="form-control" id="ppf-total" min="1" placeholder="0">
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">\u05EA\u05D1\u05E0\u05D9\u05EA</label>
                <select class="form-select" id="ppf-template" onchange="Pages.ppTemplateChange()">
                  <option value="monthly">\u05D7\u05D5\u05D3\u05E9\u05D9 (10 \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD)</option>
                  <option value="quarterly">\u05E8\u05D1\u05E2\u05D5\u05E0\u05D9 (4 \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD)</option>
                  <option value="semiannual">\u05D7\u05E6\u05D9-\u05E9\u05E0\u05EA\u05D9 (2 \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD)</option>
                  <option value="custom">\u05DE\u05D5\u05EA\u05D0\u05DD \u05D0\u05D9\u05E9\u05D9\u05EA</option>
                </select>
              </div>
              <div class="mb-3 d-none" id="ppf-custom-wrap">
                <label class="form-label fw-bold">\u05DE\u05E1\u05E4\u05E8 \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD</label>
                <input type="number" class="form-control" id="ppf-custom-count" min="1" max="36" value="6">
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05EA\u05D7\u05DC\u05D4</label>
                <input type="date" class="form-control" id="ppf-start">
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">\u05D4\u05E2\u05E8\u05D5\u05EA</label>
                <textarea class="form-control" id="ppf-notes" rows="2"></textarea>
              </div>
              <!-- Preview -->
              <div id="ppf-preview" class="border rounded p-2 bg-light d-none">
                <small class="text-muted fw-bold">\u05EA\u05E6\u05D5\u05D2\u05D4 \u05DE\u05E7\u05D3\u05D9\u05DE\u05D4:</small>
                <div id="ppf-preview-body" class="mt-2"></div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-outline-info btn-sm" onclick="Pages.ppPreviewPlan()"><i class="bi bi-eye me-1"></i>\u05EA\u05E6\u05D5\u05D2\u05D4 \u05DE\u05E7\u05D3\u05D9\u05DE\u05D4</button>
              <button class="btn btn-primary" onclick="Pages.ppCreatePlan()"><i class="bi bi-check-lg me-1"></i>\u05E6\u05D5\u05E8 \u05EA\u05D5\u05DB\u05E0\u05D9\u05EA</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /* ---------- Init ---------- */
  _ppUseDemo: false,

  paymentplansLoadDemo() {
    this._ppUseDemo = true;
    this._ppPlans = this._ppDemoData();
    this._ppFilter = 'all';
    this._ppSearch = '';
    this._ppRender();
    this._ppRenderCharts();
  },

  async paymentplansInit() {
    // Try API first, fall back to demo
    try {
      const apiData = await App.getData('\u05EA\u05D5\u05DB\u05E0\u05D9\u05D5\u05EA_\u05EA\u05E9\u05DC\u05D5\u05DD');
      if (apiData && apiData.length > 0) {
        this._ppPlans = apiData;
      } else {
        this._ppPlans = this._ppUseDemo ? this._ppDemoData() : [];
      }
    } catch (e) {
      this._ppPlans = this._ppUseDemo ? this._ppDemoData() : [];
    }
    this._ppFilter = 'all';
    this._ppSearch = '';
    this._ppRender();
    this._ppRenderCharts();
  },

  /* ---------- Render all ---------- */
  _ppRender() {
    const plans = this._ppFilteredPlans();
    this._ppRenderStats();
    this._ppRenderCards(plans);
  },

  _ppFilteredPlans() {
    let plans = this._ppPlans;
    if (this._ppSearch) {
      const q = this._ppSearch.toLowerCase();
      plans = plans.filter(p => p.studentName.toLowerCase().includes(q));
    }
    if (this._ppFilter === 'active') {
      plans = plans.filter(p => { const s = this._ppPlanStats(p); return !s.isCompleted; });
    } else if (this._ppFilter === 'completed') {
      plans = plans.filter(p => { const s = this._ppPlanStats(p); return s.isCompleted; });
    } else if (this._ppFilter === 'overdue') {
      plans = plans.filter(p => { const s = this._ppPlanStats(p); return s.isOverdue; });
    }
    return plans;
  },

  /* ---------- Stats ---------- */
  _ppRenderStats() {
    const plans = this._ppPlans;
    const totalPlans = plans.length;
    const active = plans.filter(p => !this._ppPlanStats(p).isCompleted).length;
    let totalExpected = 0, totalPaid = 0, totalOverdue = 0;
    plans.forEach(p => {
      const s = this._ppPlanStats(p);
      totalExpected += s.paid + s.overdue;
      totalPaid += s.paid;
      totalOverdue += s.overdue;
    });
    const rate = totalExpected > 0 ? Math.round(totalPaid / totalExpected * 100) : 0;

    const el = id => document.getElementById(id);
    el('pp-stat-total').textContent = totalPlans;
    el('pp-stat-active').textContent = active;
    el('pp-stat-rate').textContent = rate + '%';
    el('pp-stat-overdue').textContent = Utils.formatCurrency(totalOverdue);
  },

  /* ---------- Student plan cards ---------- */
  _ppRenderCards(plans) {
    const container = document.getElementById('pp-cards-container');
    if (!container) return;
    if (!plans.length) {
      container.innerHTML = '<div class="col-12 text-center text-muted py-5"><i class="bi bi-inbox fs-1 d-block mb-2"></i>\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05D5\u05DB\u05E0\u05D9\u05D5\u05EA</div>';
      return;
    }
    container.innerHTML = plans.map(plan => {
      const s = this._ppPlanStats(plan);
      const barColor = s.isCompleted ? 'success' : s.isOverdue ? 'danger' : 'primary';
      const statusBadge = s.isCompleted
        ? '<span class="badge bg-success">\u05D4\u05D5\u05E9\u05DC\u05DD</span>'
        : s.isOverdue
          ? '<span class="badge bg-danger">\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8</span>'
          : '<span class="badge bg-primary">\u05E4\u05E2\u05D9\u05DC</span>';
      const nextPayment = s.next
        ? `<small class="text-muted"><i class="bi bi-calendar-event me-1"></i>\u05D4\u05D1\u05D0: ${Utils.formatDateShort(s.next.dueDate)}</small>`
        : '<small class="text-success"><i class="bi bi-check-all me-1"></i>\u05D4\u05D5\u05E9\u05DC\u05DD</small>';

      return `
        <div class="col-md-6 col-lg-4">
          <div class="card h-100 hover-shadow" style="cursor:pointer" onclick="Pages.ppShowDetail('${plan.id}')">
            <div class="card-body p-3">
              <div class="d-flex align-items-center gap-2 mb-2">
                ${Utils.avatarHTML(plan.studentName)}
                <div class="flex-grow-1">
                  <h6 class="mb-0">${plan.studentName}</h6>
                  <small class="text-muted">${plan.templateLabel} &middot; ${plan.installments.length} \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD</small>
                </div>
                ${statusBadge}
              </div>
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="fw-bold text-success">${Utils.formatCurrency(s.paid)}</span>
                <span class="text-muted">/ ${Utils.formatCurrency(plan.total)}</span>
              </div>
              <div class="progress mb-2" style="height:8px;">
                <div class="progress-bar bg-${barColor}" style="width:${s.pct}%" role="progressbar"></div>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <span class="small">${s.pct}% \u05E9\u05D5\u05DC\u05DD</span>
                ${nextPayment}
              </div>
              ${s.overdueCount > 0 ? `<div class="mt-2"><span class="badge bg-danger bg-opacity-10 text-danger"><i class="bi bi-alarm me-1"></i>${s.overdueCount} \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD \u05D1\u05D0\u05D9\u05D7\u05D5\u05E8 (${Utils.formatCurrency(s.overdue)})</span></div>` : ''}
            </div>
          </div>
        </div>`;
    }).join('');
  },

  /* ---------- Filter controls ---------- */
  ppSetFilter(f) {
    this._ppFilter = f;
    document.querySelectorAll('[data-pp-filter]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.ppFilter === f);
    });
    this.ppApplyFilter();
  },

  ppApplyFilter() {
    this._ppSearch = (document.getElementById('pp-search')?.value || '').trim();
    this._ppRender();
  },

  /* ---------- Plan detail modal ---------- */
  ppShowDetail(planId) {
    const plan = this._ppPlans.find(p => p.id === planId);
    if (!plan) return;
    const s = this._ppPlanStats(plan);
    const titleEl = document.getElementById('pp-detail-title');
    const bodyEl = document.getElementById('pp-detail-body');
    if (titleEl) titleEl.textContent = plan.studentName + ' \u2014 ' + plan.templateLabel;
    if (!bodyEl) return;

    bodyEl.innerHTML = `
      <div class="row g-3 mb-3">
        <div class="col-4 text-center">
          <div class="fs-5 fw-bold text-success">${Utils.formatCurrency(s.paid)}</div>
          <small class="text-muted">\u05E9\u05D5\u05DC\u05DD</small>
        </div>
        <div class="col-4 text-center">
          <div class="fs-5 fw-bold text-danger">${Utils.formatCurrency(s.overdue)}</div>
          <small class="text-muted">\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8</small>
        </div>
        <div class="col-4 text-center">
          <div class="fs-5 fw-bold text-primary">${Utils.formatCurrency(s.pending)}</div>
          <small class="text-muted">\u05E0\u05D5\u05EA\u05E8</small>
        </div>
      </div>
      <div class="progress mb-3" style="height:10px;">
        <div class="progress-bar bg-success" style="width:${s.pct}%"></div>
        ${s.overdueCount > 0 ? `<div class="progress-bar bg-danger" style="width:${Math.round(s.overdue / plan.total * 100)}%"></div>` : ''}
      </div>
      <div class="table-responsive">
        <table class="table table-sm table-hover align-middle mb-0">
          <thead class="table-light">
            <tr><th>#</th><th>\u05EA\u05D0\u05E8\u05D9\u05DA \u05D9\u05E2\u05D3</th><th>\u05E1\u05DB\u05D5\u05DD</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th><th>\u05EA\u05D0\u05E8\u05D9\u05DA \u05EA\u05E9\u05DC\u05D5\u05DD</th><th>\u05E4\u05E2\u05D5\u05DC\u05D4</th></tr>
          </thead>
          <tbody>
            ${plan.installments.map(inst => {
              const statusClass = inst.status === 'paid' ? 'success' : inst.status === 'overdue' ? 'danger' : 'secondary';
              const statusIcon = inst.status === 'paid' ? 'check-circle-fill' : inst.status === 'overdue' ? 'alarm-fill' : 'clock';
              const statusText = inst.status === 'paid' ? '\u05E9\u05D5\u05DC\u05DD' : inst.status === 'overdue' ? '\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8' : '\u05DE\u05DE\u05EA\u05D9\u05DF';
              const toggleLabel = inst.status === 'paid' ? '\u05D1\u05D8\u05DC \u05EA\u05E9\u05DC\u05D5\u05DD' : '\u05E1\u05DE\u05DF \u05DB\u05E9\u05D5\u05DC\u05DD';
              const toggleIcon = inst.status === 'paid' ? 'x-circle' : 'check-lg';
              const toggleColor = inst.status === 'paid' ? 'outline-secondary' : 'success';
              return `<tr>
                <td class="fw-bold">${inst.num}</td>
                <td>${Utils.formatDateShort(inst.dueDate)}</td>
                <td class="fw-bold">${Utils.formatCurrency(inst.amount)}</td>
                <td><span class="badge bg-${statusClass}"><i class="bi bi-${statusIcon} me-1"></i>${statusText}</span></td>
                <td>${inst.paidDate ? Utils.formatDateShort(inst.paidDate) : '\u2014'}</td>
                <td>
                  <button class="btn btn-${toggleColor} btn-sm" onclick="Pages.ppTogglePayment('${plan.id}',${inst.num})">
                    <i class="bi bi-${toggleIcon} me-1"></i>${toggleLabel}
                  </button>
                </td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
      ${s.overdueCount > 0 ? `
      <div class="mt-3">
        <button class="btn btn-outline-success btn-sm" onclick="Pages.ppWhatsAppReminder('${plan.id}')">
          <i class="bi bi-whatsapp me-1"></i>\u05E9\u05DC\u05D7 \u05EA\u05D6\u05DB\u05D5\u05E8\u05EA \u05D5\u05D5\u05D0\u05D8\u05E1\u05D0\u05E4
        </button>
      </div>` : ''}
    `;

    const modal = new bootstrap.Modal(document.getElementById('pp-detail-modal'));
    modal.show();
  },

  /* ---------- Toggle payment status ---------- */
  async ppTogglePayment(planId, instNum) {
    const plan = this._ppPlans.find(p => p.id === planId);
    if (!plan) return;
    const inst = plan.installments.find(i => i.num === instNum);
    if (!inst) return;

    if (inst.status === 'paid') {
      inst.status = inst.dueDate < Utils.todayISO() ? 'overdue' : 'pending';
      inst.paidDate = '';
    } else {
      inst.status = 'paid';
      inst.paidDate = Utils.todayISO();
    }

    // Persist to API
    try {
      await App.apiCall('update', '\u05EA\u05D5\u05DB\u05E0\u05D9\u05D5\u05EA_\u05EA\u05E9\u05DC\u05D5\u05DD', { id: plan.id, row: plan });
    } catch (e) { /* fallback: local state already updated */ }

    // Re-render everything
    this._ppRender();
    this._ppRenderCharts();
    // Re-open detail modal with updated data
    this.ppShowDetail(planId);
    Utils.toast(inst.status === 'paid' ? '\u05EA\u05E9\u05DC\u05D5\u05DD \u05E1\u05D5\u05DE\u05DF \u05DB\u05E9\u05D5\u05DC\u05DD' : '\u05EA\u05E9\u05DC\u05D5\u05DD \u05D1\u05D5\u05D8\u05DC', inst.status === 'paid' ? 'success' : 'warning');
  },

  /* ---------- Overdue dashboard ---------- */
  ppShowOverdue() {
    const section = document.getElementById('pp-overdue-section');
    if (!section) return;
    section.classList.remove('d-none');

    // Collect all overdue installments across all plans, sorted by urgency (oldest first)
    const overdueItems = [];
    this._ppPlans.forEach(plan => {
      plan.installments.forEach(inst => {
        if (inst.status === 'overdue') {
          const daysLate = Math.floor((new Date() - new Date(inst.dueDate)) / 86400000);
          overdueItems.push({ plan, inst, daysLate });
        }
      });
    });
    overdueItems.sort((a, b) => b.daysLate - a.daysLate);

    const tbody = document.getElementById('pp-overdue-tbody');
    if (!tbody) return;

    if (!overdueItems.length) {
      tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted py-4"><i class="bi bi-emoji-smile fs-3 d-block mb-2"></i>\u05D0\u05D9\u05DF \u05D7\u05D5\u05D1\u05D5\u05EA \u05D1\u05D0\u05D9\u05D7\u05D5\u05E8!</td></tr>';
      return;
    }

    tbody.innerHTML = overdueItems.map(item => {
      const urgencyClass = item.daysLate > 60 ? 'table-danger' : item.daysLate > 30 ? 'table-warning' : '';
      return `<tr class="${urgencyClass}">
        <td>${Utils.avatarHTML(item.plan.studentName, 'sm')} ${item.plan.studentName}</td>
        <td class="fw-bold">${Utils.formatCurrency(item.inst.amount)}</td>
        <td>${Utils.formatDateShort(item.inst.dueDate)}</td>
        <td><span class="badge bg-danger">${item.daysLate} \u05D9\u05DE\u05D9\u05DD</span></td>
        <td>
          <button class="btn btn-success btn-sm" onclick="Pages.ppTogglePayment('${item.plan.id}',${item.inst.num})"><i class="bi bi-check-lg"></i></button>
          <button class="btn btn-outline-success btn-sm" onclick="Pages.ppWhatsAppReminder('${item.plan.id}')"><i class="bi bi-whatsapp"></i></button>
        </td>
      </tr>`;
    }).join('');

    section.scrollIntoView({ behavior: 'smooth' });
  },

  ppHideOverdue() {
    document.getElementById('pp-overdue-section')?.classList.add('d-none');
  },

  /* ---------- WhatsApp reminder ---------- */
  ppWhatsAppReminder(planId) {
    const plan = this._ppPlans.find(p => p.id === planId);
    if (!plan) return;
    const s = this._ppPlanStats(plan);
    const overdueInst = plan.installments.filter(i => i.status === 'overdue');
    if (!overdueInst.length) {
      Utils.toast('\u05D0\u05D9\u05DF \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD \u05D1\u05D0\u05D9\u05D7\u05D5\u05E8', 'info');
      return;
    }

    const totalOverdue = overdueInst.reduce((sum, i) => sum + i.amount, 0);
    const msg = [

      `\u05E9\u05DC\u05D5\u05DD \u05E8\u05D1,`,
      ``
  ].join('\n');

    const phone = plan.phone.replace(/-/g, '').replace(/^0/, '972');
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    Utils.toast('\u05D4\u05D5\u05D3\u05E2\u05D4 \u05E0\u05E9\u05DC\u05D7\u05D4 \u05D1\u05D5\u05D5\u05D0\u05D8\u05E1\u05D0\u05E4', 'success');
  },

  /* ---------- Charts ---------- */
  _ppRenderCharts() {
    const plans = this._ppPlans;

    // --- Collection rate pie chart ---
    let totalPaid = 0, totalOverdue = 0, totalPending = 0;
    plans.forEach(p => {
      const s = this._ppPlanStats(p);
      totalPaid += s.paid;
      totalOverdue += s.overdue;
      totalPending += s.pending;
    });

    const ctxPie = document.getElementById('pp-chart-collection');
    if (ctxPie) {
      if (this._ppChartCollection) this._ppChartCollection.destroy();
      this._ppChartCollection = new Chart(ctxPie, {
        type: 'doughnut',
        data: {
          labels: ['\u05E9\u05D5\u05DC\u05DD', '\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8', '\u05DE\u05DE\u05EA\u05D9\u05DF'],
          datasets: [{
            data: [totalPaid, totalOverdue, totalPending],
            backgroundColor: ['#34a853', '#ea4335', '#4285f4'],
            borderWidth: 2,
            borderColor: '#fff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', rtl: true, labels: { usePointStyle: true, padding: 12 } },
            tooltip: {
              callbacks: {
                label: ctx => {
                  const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                  const pct = total > 0 ? Math.round(ctx.raw / total * 100) : 0;
                  return ctx.label + ': \u20AA' + ctx.raw.toLocaleString('he-IL') + ' (' + pct + '%)';
                }
              }
            }
          }
        }
      });
    }

    // --- Monthly expected vs actual bar chart ---
    const monthMap = {};
    plans.forEach(p => {
      p.installments.forEach(inst => {
        const mo = inst.dueDate.slice(0, 7); // YYYY-MM
        if (!monthMap[mo]) monthMap[mo] = { expected: 0, actual: 0 };
        monthMap[mo].expected += inst.amount;
        if (inst.status === 'paid') monthMap[mo].actual += inst.amount;
      });
    });
    const months = Object.keys(monthMap).sort();
    const expectedData = months.map(m => monthMap[m].expected);
    const actualData = months.map(m => monthMap[m].actual);
    const monthLabels = months.map(m => {
      const [y, mo] = m.split('-');
      return Utils.HEB_MONTHS[parseInt(mo) - 1] + ' ' + y;
    });

    const ctxBar = document.getElementById('pp-chart-monthly');
    if (ctxBar) {
      if (this._ppChartMonthly) this._ppChartMonthly.destroy();
      this._ppChartMonthly = new Chart(ctxBar, {
        type: 'bar',
        data: {
          labels: monthLabels,
          datasets: [
            {
              label: '\u05E6\u05E4\u05D5\u05D9',
              data: expectedData,
              backgroundColor: 'rgba(66,133,244,0.3)',
              borderColor: '#4285f4',
              borderWidth: 1
            },
            {
              label: '\u05D1\u05E4\u05D5\u05E2\u05DC',
              data: actualData,
              backgroundColor: 'rgba(52,168,83,0.7)',
              borderColor: '#34a853',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: v => '\u20AA' + v.toLocaleString('he-IL')
              }
            }
          },
          plugins: {
            legend: { position: 'top', rtl: true, labels: { usePointStyle: true } },
            tooltip: {
              callbacks: {
                label: ctx => ctx.dataset.label + ': \u20AA' + ctx.raw.toLocaleString('he-IL')
              }
            }
          }
        }
      });
    }
  },

  /* ---------- Create plan modal ---------- */
  ppShowCreateModal() {
    // Populate student dropdown from existing plans (demo) + extras
    const sel = document.getElementById('ppf-student');
    if (sel) {
      const existing = new Set(this._ppPlans.map(p => p.studentName));
      const allStudents = [
        ...this._ppPlans.map(p => p.studentName),
        '\u05D1\u05E0\u05D9\u05DE\u05D9\u05DF \u05E9\u05E8\u05D1\u05D9\u05D8', '\u05E2\u05DE\u05D9\u05EA\u05D9 \u05D4\u05D5\u05E8\u05D5\u05D1\u05D9\u05E5', '\u05D2\u05D3 \u05E8\u05D5\u05EA\u05DD', '\u05E6\u05D1\u05D9 \u05E4\u05D5\u05DC\u05E7', '\u05D0\u05E9\u05E8 \u05D0\u05DC\u05D1\u05D6'
      ];
      const unique = [...new Set(allStudents)];
      sel.innerHTML = '<option value="">\u05D1\u05D7\u05E8 \u05EA\u05DC\u05DE\u05D9\u05D3...</option>' +
        unique.map(n => `<option value="${n}">${n}</option>`).join('');
    }
    const startEl = document.getElementById('ppf-start');
    if (startEl) startEl.value = Utils.todayISO();
    document.getElementById('ppf-total').value = '';
    document.getElementById('ppf-template').value = 'monthly';
    document.getElementById('ppf-notes').value = '';
    document.getElementById('ppf-custom-wrap')?.classList.add('d-none');
    document.getElementById('ppf-preview')?.classList.add('d-none');

    const modal = new bootstrap.Modal(document.getElementById('pp-create-modal'));
    modal.show();
  },

  ppTemplateChange() {
    const tpl = document.getElementById('ppf-template')?.value;
    const wrap = document.getElementById('ppf-custom-wrap');
    if (wrap) wrap.classList.toggle('d-none', tpl !== 'custom');
  },

  ppPreviewPlan() {
    const total = parseFloat(document.getElementById('ppf-total')?.value) || 0;
    const tplId = document.getElementById('ppf-template')?.value || 'monthly';
    const start = document.getElementById('ppf-start')?.value;
    if (!total || !start) {
      Utils.toast('\u05E0\u05D0 \u05DC\u05DE\u05DC\u05D0 \u05E1\u05DB\u05D5\u05DD \u05D5\u05EA\u05D0\u05E8\u05D9\u05DA', 'warning');
      return;
    }
    const tpl = this._ppTemplates.find(t => t.id === tplId);
    const count = tplId === 'custom' ? (parseInt(document.getElementById('ppf-custom-count')?.value) || 6) : tpl.count;
    const per = Math.round(total / count);
    const monthGap = tplId === 'quarterly' ? 3 : tplId === 'semiannual' ? 6 : 1;
    const startDate = new Date(start);

    let html = '<table class="table table-sm table-bordered mb-0"><thead><tr><th>#</th><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05E1\u05DB\u05D5\u05DD</th></tr></thead><tbody>';
    for (let i = 0; i < count; i++) {
      const due = new Date(startDate.getFullYear(), startDate.getMonth() + i * monthGap, startDate.getDate());
      const amt = i === count - 1 ? total - per * (count - 1) : per;
      html += `<tr><td>${i + 1}</td><td>${Utils.formatDateShort(due.toISOString().slice(0, 10))}</td><td>${Utils.formatCurrency(amt)}</td></tr>`;
    }
    html += '</tbody></table>';

    const preview = document.getElementById('ppf-preview');
    const body = document.getElementById('ppf-preview-body');
    if (preview) preview.classList.remove('d-none');
    if (body) body.innerHTML = html;
  },

  async ppCreatePlan() {
    const studentName = document.getElementById('ppf-student')?.value;
    const total = parseFloat(document.getElementById('ppf-total')?.value) || 0;
    const tplId = document.getElementById('ppf-template')?.value || 'monthly';
    const start = document.getElementById('ppf-start')?.value;
    const notes = document.getElementById('ppf-notes')?.value || '';

    if (!studentName) { Utils.toast('\u05E0\u05D0 \u05DC\u05D1\u05D7\u05D5\u05E8 \u05EA\u05DC\u05DE\u05D9\u05D3', 'danger'); return; }
    if (!total || total <= 0) { Utils.toast('\u05E0\u05D0 \u05DC\u05D4\u05D6\u05D9\u05DF \u05E1\u05DB\u05D5\u05DD \u05EA\u05E7\u05D9\u05DF', 'danger'); return; }
    if (!start) { Utils.toast('\u05E0\u05D0 \u05DC\u05D1\u05D7\u05D5\u05E8 \u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05EA\u05D7\u05DC\u05D4', 'danger'); return; }

    const tpl = this._ppTemplates.find(t => t.id === tplId);
    const count = tplId === 'custom' ? (parseInt(document.getElementById('ppf-custom-count')?.value) || 6) : tpl.count;
    const per = Math.round(total / count);
    const monthGap = tplId === 'quarterly' ? 3 : tplId === 'semiannual' ? 6 : 1;
    const startDate = new Date(start);

    const installments = [];
    for (let i = 0; i < count; i++) {
      const due = new Date(startDate.getFullYear(), startDate.getMonth() + i * monthGap, startDate.getDate());
      installments.push({
        num: i + 1,
        dueDate: due.toISOString().slice(0, 10),
        amount: i === count - 1 ? total - per * (count - 1) : per,
        status: 'pending',
        paidDate: ''
      });
    }

    const newPlan = {
      id: 'plan-' + Date.now(),
      studentName,
      studentId: 'stu-new-' + Date.now(),
      total,
      template: tplId,
      templateLabel: tpl.label,
      startDate: start,
      installments,
      phone: '050-0000000',
      notes
    };

    this._ppPlans.unshift(newPlan);

    // Persist to API
    try {
      await App.apiCall('add', '\u05EA\u05D5\u05DB\u05E0\u05D9\u05D5\u05EA_\u05EA\u05E9\u05DC\u05D5\u05DD', { row: newPlan });
    } catch (e) { /* fallback: local state already updated */ }

    this._ppRender();
    this._ppRenderCharts();

    bootstrap.Modal.getInstance(document.getElementById('pp-create-modal'))?.hide();
    Utils.toast(`\u05EA\u05D5\u05DB\u05E0\u05D9\u05EA \u05EA\u05E9\u05DC\u05D5\u05DD \u05E0\u05D5\u05E6\u05E8\u05D4 \u05DC${studentName}`, 'success');
  },

  /* ---------- Export CSV ---------- */
  ppExportCSV() {
    const rows = ['\u05EA\u05DC\u05DE\u05D9\u05D3,\u05EA\u05D1\u05E0\u05D9\u05EA,\u05E1\u05D4"\u05DB \u05DB\u05D5\u05DC\u05DC,\u05E9\u05D5\u05DC\u05DD,\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8,\u05E0\u05D5\u05EA\u05E8,\u05D0\u05D7\u05D5\u05D6 %'];
    this._ppPlans.forEach(p => {
      const s = this._ppPlanStats(p);
      rows.push(`${p.studentName},${p.templateLabel},${p.total},${s.paid},${s.overdue},${s.pending},${s.pct}%`);
    });
    const csv = '\uFEFF' + rows.join('\n');
    const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob);
    link.download = '\u05EA\u05D5\u05DB\u05E0\u05D9\u05D5\u05EA_\u05EA\u05E9\u05DC\u05D5\u05DD_' + Utils.todayISO() + '.csv'; link.click();
    Utils.toast('CSV \u05D9\u05D5\u05E6\u05D0');
  }
});
