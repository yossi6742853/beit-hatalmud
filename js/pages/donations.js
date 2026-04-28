/* ===== BHT v5.4 — Donations & Fundraising (Full Upgrade) ===== */
Object.assign(Pages, {
  /* ======================================================================
     DONATIONS — Dashboard, Donor Cards, Campaigns, Receipts, Charts
     ====================================================================== */

  /* ---------- Demo data: 20 donations from 12 donors, 2 campaigns ---------- */
  _donDemoData() {
    return [
      { id: 'd01', donor: '\u05E8\' \u05E9\u05DC\u05DE\u05D4 \u05D2\u05D5\u05DC\u05D3\u05D1\u05E8\u05D2', amount: 5000, method: '\u05D4\u05E2\u05D1\u05E8\u05D4', purpose: '\u05EA\u05E8\u05D5\u05DE\u05D4 \u05DB\u05DC\u05DC\u05D9\u05EA', date: '2026-04-15', receipt: 'R-1001', dedication: '\u05DC\u05E2\u05D9\u05DC\u05D5\u05D9 \u05E0\u05E9\u05DE\u05EA \u05D0\u05D1\u05D9\u05D4\u05DD \u05D1\u05DF \u05D9\u05E6\u05D7\u05E7', campaign: 'camp1' },
      { id: 'd02', donor: '\u05DE\u05E9\u05E4\u05D7\u05EA \u05DB\u05D4\u05DF', amount: 1000, method: '\u05DE\u05D6\u05D5\u05DE\u05DF', purpose: '\u05DC\u05D6\u05DB\u05E8 \u05E0\u05E9\u05DE\u05D4', date: '2026-04-10', receipt: 'R-1002', dedication: '\u05DC\u05D6\u05DB\u05E8 \u05D0\u05D1\u05D9\u05D4\u05DD \u05D1\u05DF \u05D9\u05E6\u05D7\u05E7', campaign: '' },
      { id: 'd03', donor: '\u05E8\' \u05D9\u05E2\u05E7\u05D1 \u05DC\u05D5\u05D9', amount: 2500, method: "\u05E6'\u05E7", purpose: '\u05EA\u05E8\u05D5\u05DE\u05D4 \u05DB\u05DC\u05DC\u05D9\u05EA', date: '2026-03-28', receipt: 'R-1003', dedication: '', campaign: 'camp1' }
    ];
  },

  _donCampaigns() {
    return [
      { id: 'camp1', name: '\u05E7\u05DE\u05E4\u05D9\u05D9\u05DF \u05E4\u05E1\u05D7 \u05EA\u05E9\u05E4\u05F4\u05D5', goal: 50000, deadline: '2026-04-30', desc: '\u05D2\u05D9\u05D5\u05E1 \u05EA\u05E8\u05D5\u05DE\u05D5\u05EA \u05DC\u05E4\u05E2\u05D9\u05DC\u05D5\u05D9\u05D5\u05EA \u05E4\u05E1\u05D7', active: true },
      { id: 'camp2', name: '\u05E7\u05E8\u05DF \u05D1\u05E0\u05D9\u05D9\u05DF \u05D7\u05D3\u05E9', goal: 100000, deadline: '2026-09-01', desc: '\u05D4\u05E8\u05D7\u05D1\u05EA \u05D0\u05D5\u05DC\u05DD \u05D4\u05DC\u05D9\u05DE\u05D5\u05D3\u05D9\u05DD \u2014 \u05E7\u05D5\u05DE\u05D4 \u05E0\u05D5\u05E1\u05E4\u05EA', active: true }
    ];
  },

  /* ---------- State ---------- */
  _donSort: { col: 'date', dir: 'desc' },
  _donFilterMethod: '',
  _donFilterPurpose: '',
  _donChartMonth: null,
  _donChartMethod: null,

  /* ---------- Main page HTML ---------- */
  donations() {
    const today = Utils.todayISO();
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div>
          <h1><i class="bi bi-heart-fill me-2 text-danger"></i>\u05EA\u05E8\u05D5\u05DE\u05D5\u05EA \u05D5\u05EA\u05D5\u05DE\u05DB\u05D9\u05DD</h1>
          <p class="text-muted mb-0">\u05E0\u05D9\u05D4\u05D5\u05DC \u05EA\u05E8\u05D5\u05DE\u05D5\u05EA, \u05EA\u05D5\u05E8\u05DE\u05D9\u05DD \u05D5\u05E7\u05DE\u05E4\u05D9\u05D9\u05E0\u05D9\u05DD</p>
        </div>
        <div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-outline-secondary btn-sm" onclick="Pages.donShowCampaignModal()"><i class="bi bi-flag-fill me-1"></i>\u05E7\u05DE\u05E4\u05D9\u05D9\u05DF \u05D7\u05D3\u05E9</button>
          <button class="btn btn-primary btn-sm" onclick="Pages.donShowAddModal()"><i class="bi bi-plus-lg me-1"></i>\u05EA\u05E8\u05D5\u05DE\u05D4 \u05D7\u05D3\u05E9\u05D4</button>
        </div>
      </div>

      <!-- Dashboard Stats -->
      <div class="row g-3 mb-4">
        <div class="col-6 col-md-3">
          <div class="card stat-card p-3">
            <div class="stat-icon gradient-success"><i class="bi bi-cash-stack"></i></div>
            <div class="stat-value" id="don-total">\u20AA0</div>
            <div class="stat-label">\u05E1\u05D4"\u05DB \u05EA\u05E8\u05D5\u05DE\u05D5\u05EA</div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card stat-card p-3">
            <div class="stat-icon gradient-primary"><i class="bi bi-calendar-month"></i></div>
            <div class="stat-value" id="don-month">\u20AA0</div>
            <div class="stat-label">\u05D4\u05D7\u05D5\u05D3\u05E9</div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card stat-card p-3">
            <div class="stat-icon gradient-info"><i class="bi bi-calendar-check"></i></div>
            <div class="stat-value" id="don-year">\u20AA0</div>
            <div class="stat-label">\u05D4\u05E9\u05E0\u05D4</div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card stat-card p-3">
            <div class="stat-icon gradient-warning"><i class="bi bi-graph-up-arrow"></i></div>
            <div class="stat-value" id="don-avg">\u20AA0</div>
            <div class="stat-label">\u05DE\u05DE\u05D5\u05E6\u05E2 \u05DC\u05EA\u05E8\u05D5\u05DE\u05D4</div>
          </div>
        </div>
      </div>

      <!-- Top Donors -->
      <div class="card mb-4">
        <div class="card-header bg-transparent d-flex justify-content-between align-items-center">
          <h5 class="mb-0"><i class="bi bi-star-fill text-warning me-2"></i>\u05EA\u05D5\u05E8\u05DE\u05D9\u05DD \u05DE\u05D5\u05D1\u05D9\u05DC\u05D9\u05DD</h5>
        </div>
        <div class="card-body p-3" id="don-top-donors">${Utils.skeleton(2)}</div>
      </div>

      <!-- Active Campaigns -->
      <div class="card mb-4">
        <div class="card-header bg-transparent d-flex justify-content-between align-items-center">
          <h5 class="mb-0"><i class="bi bi-flag-fill text-primary me-2"></i>\u05E7\u05DE\u05E4\u05D9\u05D9\u05E0\u05D9\u05DD \u05E4\u05E2\u05D9\u05DC\u05D9\u05DD</h5>
          <button class="btn btn-sm btn-outline-primary" onclick="Pages.donShowCampaignModal()"><i class="bi bi-plus-lg me-1"></i>\u05D7\u05D3\u05E9</button>
        </div>
        <div class="card-body p-3" id="don-campaigns">${Utils.skeleton(2)}</div>
      </div>

      <!-- Charts Row -->
      <div class="row g-3 mb-4">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header bg-transparent"><h6 class="mb-0"><i class="bi bi-bar-chart-fill text-primary me-2"></i>\u05EA\u05E8\u05D5\u05DE\u05D5\u05EA \u05D7\u05D5\u05D3\u05E9\u05D9\u05D5\u05EA</h6></div>
            <div class="card-body" style="height:280px"><canvas id="don-chart-monthly"></canvas></div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-header bg-transparent"><h6 class="mb-0"><i class="bi bi-pie-chart-fill text-info me-2"></i>\u05E4\u05D9\u05DC\u05D5\u05D7 \u05DC\u05E4\u05D9 \u05D0\u05DE\u05E6\u05E2\u05D9</h6></div>
            <div class="card-body" style="height:280px"><canvas id="don-chart-method"></canvas></div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="card mb-3">
        <div class="card-body py-2 d-flex flex-wrap gap-2 align-items-center">
          <i class="bi bi-funnel text-muted"></i>
          <select class="form-select form-select-sm" style="width:auto" id="don-filter-method" onchange="Pages.donApplyFilters()">
            <option value="">\u05DB\u05DC \u05D0\u05DE\u05E6\u05E2\u05D9\u05DD</option>
            <option value="\u05DE\u05D6\u05D5\u05DE\u05DF">\u05DE\u05D6\u05D5\u05DE\u05DF</option>
            <option value="\u05E6'\u05E7">\u05E6'\u05E7</option>
            <option value="\u05D4\u05E2\u05D1\u05E8\u05D4">\u05D4\u05E2\u05D1\u05E8\u05D4</option>
            <option value="\u05D0\u05E9\u05E8\u05D0\u05D9">\u05D0\u05E9\u05E8\u05D0\u05D9</option>
          </select>
          <select class="form-select form-select-sm" style="width:auto" id="don-filter-purpose" onchange="Pages.donApplyFilters()">
            <option value="">\u05DB\u05DC \u05D4\u05DE\u05D8\u05E8\u05D5\u05EA</option>
            <option value="\u05EA\u05E8\u05D5\u05DE\u05D4 \u05DB\u05DC\u05DC\u05D9\u05EA">\u05EA\u05E8\u05D5\u05DE\u05D4 \u05DB\u05DC\u05DC\u05D9\u05EA</option>
            <option value="\u05EA\u05E8\u05D5\u05DE\u05D4 \u05E9\u05E0\u05EA\u05D9\u05EA">\u05EA\u05E8\u05D5\u05DE\u05D4 \u05E9\u05E0\u05EA\u05D9\u05EA</option>
            <option value="\u05DC\u05D6\u05DB\u05E8 \u05E0\u05E9\u05DE\u05D4">\u05DC\u05D6\u05DB\u05E8 \u05E0\u05E9\u05DE\u05D4</option>
            <option value="\u05E7\u05E8\u05DF \u05D1\u05E0\u05D9\u05D9\u05DF">\u05E7\u05E8\u05DF \u05D1\u05E0\u05D9\u05D9\u05DF</option>
          </select>
          <input type="text" class="form-control form-control-sm" style="width:180px" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05EA\u05D5\u05E8\u05DD..." id="don-search" oninput="Pages.donApplyFilters()">
          <span class="badge bg-secondary" id="don-result-count"></span>
        </div>
      </div>

      <!-- Donation History Table -->
      <div class="card mb-4">
        <div class="card-header bg-transparent d-flex justify-content-between align-items-center">
          <h5 class="mb-0"><i class="bi bi-table me-2"></i>\u05D4\u05D9\u05E1\u05D8\u05D5\u05E8\u05D9\u05D9\u05EA \u05EA\u05E8\u05D5\u05DE\u05D5\u05EA</h5>
          <button class="btn btn-sm btn-outline-success" onclick="Pages.donExportCSV()"><i class="bi bi-download me-1"></i>\u05D9\u05D9\u05E6\u05D5\u05D0 CSV</button>
        </div>
        <div class="table-responsive" id="don-table-wrap">${Utils.skeleton(4)}</div>
      </div>

      <!-- Add Donation Modal -->
      <div class="modal fade" id="don-add-modal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"><i class="bi bi-heart-fill text-danger me-2"></i>\u05EA\u05E8\u05D5\u05DE\u05D4 \u05D7\u05D3\u05E9\u05D4</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">\u05E9\u05DD \u05EA\u05D5\u05E8\u05DD <span class="text-danger">*</span></label>
                  <input class="form-control" id="donf-donor" placeholder="\u05E9\u05DD \u05DE\u05DC\u05D0" list="don-donor-list">
                  <datalist id="don-donor-list"></datalist>
                </div>
                <div class="col-md-6">
                  <label class="form-label">\u05E1\u05DB\u05D5\u05DD <span class="text-danger">*</span></label>
                  <div class="input-group">
                    <span class="input-group-text">\u20AA</span>
                    <input type="number" class="form-control" id="donf-amount" min="1" placeholder="0">
                  </div>
                </div>
                <div class="col-md-4">
                  <label class="form-label">\u05D0\u05DE\u05E6\u05E2\u05D9 \u05EA\u05E9\u05DC\u05D5\u05DD</label>
                  <select class="form-select" id="donf-method">
                    <option value="\u05DE\u05D6\u05D5\u05DE\u05DF">\u05DE\u05D6\u05D5\u05DE\u05DF</option>
                    <option value="\u05E6'\u05E7">\u05E6'\u05E7</option>
                    <option value="\u05D4\u05E2\u05D1\u05E8\u05D4">\u05D4\u05E2\u05D1\u05E8\u05D4</option>
                    <option value="\u05D0\u05E9\u05E8\u05D0\u05D9">\u05D0\u05E9\u05E8\u05D0\u05D9</option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label class="form-label">\u05DE\u05D8\u05E8\u05D4</label>
                  <select class="form-select" id="donf-purpose">
                    <option value="\u05EA\u05E8\u05D5\u05DE\u05D4 \u05DB\u05DC\u05DC\u05D9\u05EA">\u05EA\u05E8\u05D5\u05DE\u05D4 \u05DB\u05DC\u05DC\u05D9\u05EA</option>
                    <option value="\u05EA\u05E8\u05D5\u05DE\u05D4 \u05E9\u05E0\u05EA\u05D9\u05EA">\u05EA\u05E8\u05D5\u05DE\u05D4 \u05E9\u05E0\u05EA\u05D9\u05EA</option>
                    <option value="\u05DC\u05D6\u05DB\u05E8 \u05E0\u05E9\u05DE\u05D4">\u05DC\u05D6\u05DB\u05E8 \u05E0\u05E9\u05DE\u05D4</option>
                    <option value="\u05E7\u05E8\u05DF \u05D1\u05E0\u05D9\u05D9\u05DF">\u05E7\u05E8\u05DF \u05D1\u05E0\u05D9\u05D9\u05DF</option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA</label>
                  <input type="date" class="form-control" id="donf-date" value="${today}">
                </div>
                <div class="col-md-4">
                  <label class="form-label">\u05DE\u05E1\u05E4\u05E8 \u05E7\u05D1\u05DC\u05D4</label>
                  <input class="form-control" id="donf-receipt" placeholder="\u05D0\u05D5\u05D8\u05D5\u05DE\u05D8\u05D9">
                </div>
                <div class="col-md-4">
                  <label class="form-label">\u05E7\u05DE\u05E4\u05D9\u05D9\u05DF</label>
                  <select class="form-select" id="donf-campaign">
                    <option value="">\u05DC\u05DC\u05D0 \u05E7\u05DE\u05E4\u05D9\u05D9\u05DF</option>
                  </select>
                </div>
                <div class="col-md-4">
                  <!-- spacer -->
                </div>
                <div class="col-12">
                  <label class="form-label">\u05D4\u05E7\u05D3\u05E9\u05D4</label>
                  <input class="form-control" id="donf-dedication" placeholder="\u05DC\u05E2\u05D9\u05DC\u05D5\u05D9 \u05E0\u05E9\u05DE\u05EA / \u05DC\u05D6\u05DB\u05E8 / \u05DC\u05E8\u05E4\u05D5\u05D0\u05D4">
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button>
              <button class="btn btn-primary" onclick="Pages.donSave()"><i class="bi bi-check-lg me-1"></i>\u05E9\u05DE\u05D5\u05E8 \u05EA\u05E8\u05D5\u05DE\u05D4</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Campaign Modal -->
      <div class="modal fade" id="don-campaign-modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"><i class="bi bi-flag-fill text-primary me-2"></i>\u05E7\u05DE\u05E4\u05D9\u05D9\u05DF \u05D7\u05D3\u05E9</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="row g-3">
                <div class="col-12"><label class="form-label">\u05E9\u05DD \u05E7\u05DE\u05E4\u05D9\u05D9\u05DF <span class="text-danger">*</span></label><input class="form-control" id="campf-name"></div>
                <div class="col-md-6"><label class="form-label">\u05D9\u05E2\u05D3 \u05D2\u05D9\u05D5\u05E1 <span class="text-danger">*</span></label><div class="input-group"><span class="input-group-text">\u20AA</span><input type="number" class="form-control" id="campf-goal" min="1"></div></div>
                <div class="col-md-6"><label class="form-label">\u05D3\u05D3\u05DC\u05D9\u05D9\u05DF</label><input type="date" class="form-control" id="campf-deadline"></div>
                <div class="col-12"><label class="form-label">\u05EA\u05D9\u05D0\u05D5\u05E8</label><textarea class="form-control" id="campf-desc" rows="2"></textarea></div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button>
              <button class="btn btn-primary" onclick="Pages.donSaveCampaign()"><i class="bi bi-check-lg me-1"></i>\u05E6\u05D5\u05E8 \u05E7\u05DE\u05E4\u05D9\u05D9\u05DF</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Receipt Modal (print-friendly) -->
      <div class="modal fade" id="don-receipt-modal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"><i class="bi bi-receipt me-2"></i>\u05E7\u05D1\u05DC\u05D4 \u05DC\u05D4\u05D3\u05E4\u05E1\u05D4</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body p-0" id="don-receipt-body"></div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">\u05E1\u05D2\u05D5\u05E8</button>
              <button class="btn btn-primary" onclick="Pages.donPrintReceipt()"><i class="bi bi-printer me-1"></i>\u05D4\u05D3\u05E4\u05E1\u05D4</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /* ---------- Init ---------- */
  _donUseDemo: false,

  donLoadDemo() {
    this._donUseDemo = true;
    this._donLiveData = this._donDemoData();
    this.donationsInit();
    Utils.toast('\u05E0\u05D8\u05E2\u05E0\u05D5 \u05E0\u05EA\u05D5\u05E0\u05D9 \u05D3\u05DE\u05D5', 'info');
  },

  /* Map raw קופה_קטנה record to donation object */
  _donMapRow(r) {
    return {
      id: r['\u05DE\u05D6\u05D4\u05D4'] || 'd' + Math.random().toString(36).slice(2,8),
      donor: r['\u05E1\u05E4\u05E7'] || r['\u05E9\u05DD_\u05D4\u05DE\u05D5\u05D8\u05D1'] || '\u05DC\u05D0 \u05D9\u05D3\u05D5\u05E2',
      amount: parseFloat(r['\u05E1\u05DB\u05D5\u05DD']) || 0,
      method: r['\u05DE\u05E7\u05D5\u05E8'] || '',
      purpose: r['\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4'] || '',
      date: r['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '',
      receipt: r['\u05D9\u05E9_\u05E7\u05D1\u05DC\u05D4'] === '\u05DB\u05DF' ? ('R-' + (r['\u05DE\u05E1\u05E4\u05E8_\u05E1\u05D9\u05D3\u05D5\u05E8\u05D9'] || '')) : '',
      dedication: r['\u05EA\u05D9\u05D0\u05D5\u05E8'] || '',
      campaign: ''
    };
  },

  donationsInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    let data;
    try {
      const raw = _gc('\u05E7\u05D5\u05E4\u05D4_\u05E7\u05D8\u05E0\u05D4');
      if (raw && raw.length) {
        data = raw.map(r => this._donMapRow(r));
      } else if (this._donUseDemo) {
        data = this._donDemoData();
      } else {
        data = [];
      }
    } catch(e) {
      data = this._donUseDemo ? this._donDemoData() : [];
    }

    // Empty state
    if (!data.length && !this._donUseDemo) {
      document.getElementById('don-top-donors').innerHTML = '';
      document.getElementById('don-campaigns').innerHTML = '';
      const tableWrap = document.getElementById('don-table-wrap');
      if (tableWrap) tableWrap.innerHTML = '<div class="empty-state text-center py-5"><i class="bi bi-heart fs-1 text-muted d-block mb-2"></i><h5>\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05E2\u05D3\u05D9\u05D9\u05DF</h5><p class="text-muted">\u05D4\u05D5\u05E1\u05E3 \u05EA\u05E8\u05D5\u05DE\u05D4 \u05E8\u05D0\u05E9\u05D5\u05E0\u05D4</p><a href="#" class="btn btn-sm btn-outline-secondary mt-2" onclick="Pages.donLoadDemo();return false"><i class="bi bi-database me-1"></i>\u05D8\u05E2\u05DF \u05D3\u05DE\u05D5</a></div>';
      return;
    }

    this._donLiveData = data;
    const campaigns = this._donCampaigns();
    const now = new Date();
    const thisMonth = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
    const thisYear = String(now.getFullYear());

    // Dashboard stats
    const total = data.reduce((s, d) => s + d.amount, 0);
    const monthTotal = data.filter(d => d.date.startsWith(thisMonth)).reduce((s, d) => s + d.amount, 0);
    const yearTotal = data.filter(d => d.date.startsWith(thisYear)).reduce((s, d) => s + d.amount, 0);
    const avg = data.length ? Math.round(total / data.length) : 0;

    document.getElementById('don-total').textContent = Utils.formatCurrency(total);
    document.getElementById('don-month').textContent = Utils.formatCurrency(monthTotal);
    document.getElementById('don-year').textContent = Utils.formatCurrency(yearTotal);
    document.getElementById('don-avg').textContent = Utils.formatCurrency(avg);

    // Top donors
    this._donRenderTopDonors(data);

    // Campaigns
    this._donRenderCampaigns(data, campaigns);

    // Populate donor datalist for add modal
    const uniqueDonors = [...new Set(data.map(d => d.donor))];
    const dl = document.getElementById('don-donor-list');
    if (dl) dl.innerHTML = uniqueDonors.map(n => `<option value="${n}">`).join('');

    // Populate campaign select
    const campSel = document.getElementById('donf-campaign');
    if (campSel) {
      campaigns.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = c.name;
        campSel.appendChild(opt);
      });
    }

    // Table
    this._donRenderTable(data);

    // Charts
    this._donRenderCharts(data);
  },

  /* ---------- Top Donors ---------- */
  _donRenderTopDonors(data) {
    const donorMap = {};
    data.forEach(d => {
      if (!donorMap[d.donor]) donorMap[d.donor] = { total: 0, count: 0, lastDate: '' };
      donorMap[d.donor].total += d.amount;
      donorMap[d.donor].count++;
      if (d.date > donorMap[d.donor].lastDate) donorMap[d.donor].lastDate = d.date;
    });
    const sorted = Object.entries(donorMap).sort((a, b) => b[1].total - a[1].total).slice(0, 6);
    const medals = ['bi-trophy-fill text-warning', 'bi-trophy-fill text-secondary', 'bi-trophy-fill text-bronze'];

    const html = `<div class="row g-3">${sorted.map(([name, info], i) => {
      const medal = i < 3 ? `<i class="bi ${medals[i]} ms-2"></i>` : '';
      return `
        <div class="col-md-4 col-sm-6">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body p-3">
              <div class="d-flex align-items-center gap-3 mb-2">
                ${Utils.avatarHTML(name)}
                <div class="flex-grow-1 min-width-0">
                  <div class="fw-bold text-truncate">${name}${medal}</div>
                  <small class="text-muted">${info.count} \u05EA\u05E8\u05D5\u05DE\u05D5\u05EA</small>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <span class="fs-5 fw-bold text-success">${Utils.formatCurrency(info.total)}</span>
                <small class="text-muted">\u05D0\u05D7\u05E8\u05D5\u05DF: ${Utils.formatDateShort(info.lastDate)}</small>
              </div>
            </div>
          </div>
        </div>`;
    }).join('')}</div>`;

    document.getElementById('don-top-donors').innerHTML = html;
  },

  /* ---------- Campaigns ---------- */
  _donRenderCampaigns(data, campaigns) {
    if (!campaigns.length) {
      document.getElementById('don-campaigns').innerHTML = '<p class="text-muted text-center py-3">\u05D0\u05D9\u05DF \u05E7\u05DE\u05E4\u05D9\u05D9\u05E0\u05D9\u05DD \u05E4\u05E2\u05D9\u05DC\u05D9\u05DD</p>';
      return;
    }

    const html = `<div class="row g-3">${campaigns.map(c => {
      const raised = data.filter(d => d.campaign === c.id).reduce((s, d) => s + d.amount, 0);
      const pct = Math.min(100, Math.round((raised / c.goal) * 100));
      const daysLeft = (() => {
        if (!c.deadline) return 0;
        const dl = new Date(c.deadline); dl.setHours(0,0,0,0);
        const today = new Date(); today.setHours(0,0,0,0);
        return isNaN(dl.getTime()) ? 0 : Math.max(0, Math.round((dl - today) / 86400000));
      })();
      const donorCount = new Set(data.filter(d => d.campaign === c.id).map(d => d.donor)).size;
      const barColor = pct >= 100 ? 'bg-success' : pct >= 60 ? 'bg-primary' : pct >= 30 ? 'bg-warning' : 'bg-danger';

      return `
        <div class="col-md-6">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body p-3">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h6 class="mb-1"><i class="bi bi-flag-fill text-primary me-1"></i>${c.name}</h6>
                  <small class="text-muted">${c.desc}</small>
                </div>
                ${c.active ? '<span class="badge bg-success">\u05E4\u05E2\u05D9\u05DC</span>' : '<span class="badge bg-secondary">\u05D4\u05E1\u05EA\u05D9\u05D9\u05DD</span>'}
              </div>
              <div class="mb-2">
                <div class="d-flex justify-content-between small mb-1">
                  <span>${Utils.formatCurrency(raised)} / ${Utils.formatCurrency(c.goal)}</span>
                  <span class="fw-bold">${pct}%</span>
                </div>
                <div class="progress" style="height:10px">
                  <div class="progress-bar ${barColor} progress-bar-striped progress-bar-animated" style="width:${pct}%"></div>
                </div>
              </div>
              <div class="d-flex justify-content-between small text-muted">
                <span><i class="bi bi-people me-1"></i>${donorCount} \u05EA\u05D5\u05E8\u05DE\u05D9\u05DD</span>
                <span><i class="bi bi-clock me-1"></i>${daysLeft > 0 ? daysLeft + ' \u05D9\u05DE\u05D9\u05DD \u05E0\u05D5\u05EA\u05E8\u05D5' : '\u05D4\u05E1\u05EA\u05D9\u05D9\u05DD'}</span>
              </div>
            </div>
          </div>
        </div>`;
    }).join('')}</div>`;

    document.getElementById('don-campaigns').innerHTML = html;
  },

  /* ---------- Table ---------- */
  _donGetFilteredData() {
    let data = this._donLiveData || this._donDemoData();
    const method = document.getElementById('don-filter-method')?.value || '';
    const purpose = document.getElementById('don-filter-purpose')?.value || '';
    const search = (document.getElementById('don-search')?.value || '').trim().toLowerCase();

    if (method) data = data.filter(d => d.method === method);
    if (purpose) data = data.filter(d => d.purpose === purpose);
    if (search) data = data.filter(d => d.donor.toLowerCase().includes(search) || (d.dedication || '').toLowerCase().includes(search));

    // Sort
    const { col, dir } = this._donSort;
    data.sort((a, b) => {
      let va = a[col], vb = b[col];
      if (col === 'amount') { va = Number(va); vb = Number(vb); }
      if (va < vb) return dir === 'asc' ? -1 : 1;
      if (va > vb) return dir === 'asc' ? 1 : -1;
      return 0;
    });
    return data;
  },

  _donRenderTable(dataOverride) {
    const data = dataOverride || this._donGetFilteredData();
    const sortIcon = (col) => {
      if (this._donSort.col !== col) return '<i class="bi bi-chevron-expand text-muted opacity-50"></i>';
      return this._donSort.dir === 'asc' ? '<i class="bi bi-chevron-up text-primary"></i>' : '<i class="bi bi-chevron-down text-primary"></i>';
    };

    const methodBadge = (m) => {
      const colors = { '\u05DE\u05D6\u05D5\u05DE\u05DF': 'success', "\u05E6'\u05E7": 'info', '\u05D4\u05E2\u05D1\u05E8\u05D4': 'primary', '\u05D0\u05E9\u05E8\u05D0\u05D9': 'warning' };
      return `<span class="badge bg-${colors[m] || 'secondary'}">${m}</span>`;
    };

    const countEl = document.getElementById('don-result-count');
    if (countEl) countEl.textContent = data.length + ' \u05EA\u05E8\u05D5\u05DE\u05D5\u05EA';

    const html = `
      <table class="table table-bht table-hover mb-0">
        <thead>
          <tr>
            <th style="cursor:pointer" onclick="Pages.donSortBy('donor')">\u05EA\u05D5\u05E8\u05DD ${sortIcon('donor')}</th>
            <th style="cursor:pointer" onclick="Pages.donSortBy('amount')">\u05E1\u05DB\u05D5\u05DD ${sortIcon('amount')}</th>
            <th>\u05D0\u05DE\u05E6\u05E2\u05D9</th>
            <th>\u05DE\u05D8\u05E8\u05D4</th>
            <th style="cursor:pointer" onclick="Pages.donSortBy('date')">\u05EA\u05D0\u05E8\u05D9\u05DA ${sortIcon('date')}</th>
            <th>\u05E7\u05D1\u05DC\u05D4</th>
            <th>\u05D4\u05E7\u05D3\u05E9\u05D4</th>
            <th>\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA</th>
          </tr>
        </thead>
        <tbody>
          ${data.map(d => `
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  ${Utils.avatarHTML(d.donor, 'sm')}
                  <span class="fw-bold">${d.donor}</span>
                </div>
              </td>
              <td class="fw-bold text-success">${Utils.formatCurrency(d.amount)}</td>
              <td>${methodBadge(d.method)}</td>
              <td><span class="small">${d.purpose}</span></td>
              <td>${Utils.formatDateShort(d.date)}</td>
              <td><span class="badge bg-light text-dark">${d.receipt || '-'}</span></td>
              <td class="small text-muted">${d.dedication || '-'}</td>
              <td>
                <div class="btn-group btn-group-sm">
                  <button class="btn btn-outline-secondary" onclick="Pages.donShowReceipt('${d.id}')" title="\u05E7\u05D1\u05DC\u05D4"><i class="bi bi-receipt"></i></button>
                  <button class="btn btn-outline-danger" onclick="Pages.donDelete('${d.id}')" title="\u05DE\u05D7\u05D9\u05E7\u05D4"><i class="bi bi-trash"></i></button>
                </div>
              </td>
            </tr>`).join('')}
        </tbody>
      </table>`;

    document.getElementById('don-table-wrap').innerHTML = data.length ? html : '<p class="text-muted text-center py-4">\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05E8\u05D5\u05DE\u05D5\u05EA</p>';
  },

  /* ---------- Sort ---------- */
  donSortBy(col) {
    if (this._donSort.col === col) {
      this._donSort.dir = this._donSort.dir === 'asc' ? 'desc' : 'asc';
    } else {
      this._donSort = { col, dir: col === 'amount' ? 'desc' : 'asc' };
    }
    this._donRenderTable();
  },

  /* ---------- Filter ---------- */
  donApplyFilters() {
    this._donRenderTable();
  },

  /* ---------- Charts ---------- */
  _donRenderCharts(data) {
    // Monthly bar chart
    const monthMap = {};
    data.forEach(d => {
      const m = d.date.slice(0, 7);
      monthMap[m] = (monthMap[m] || 0) + d.amount;
    });
    const months = Object.keys(monthMap).sort();
    const monthLabels = months.map(m => {
      const [y, mo] = m.split('-');
      return Utils.HEB_MONTHS[parseInt(mo) - 1] + ' ' + y;
    });
    const monthValues = months.map(m => monthMap[m]);

    const ctxMonth = document.getElementById('don-chart-monthly');
    if (ctxMonth) {
      if (this._donChartMonth) this._donChartMonth.destroy();
      this._donChartMonth = new Chart(ctxMonth, {
        type: 'bar',
        data: {
          labels: monthLabels,
          datasets: [{
            label: '\u05E1\u05DB\u05D5\u05DD \u05EA\u05E8\u05D5\u05DE\u05D5\u05EA',
            data: monthValues,
            backgroundColor: ['#1a73e8', '#34a853', '#fbbc04', '#ea4335', '#6366f1', '#ec4899'],
            borderRadius: 6,
            borderSkipped: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: ctx => '\u20AA' + ctx.raw.toLocaleString('he-IL')
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { callback: v => '\u20AA' + v.toLocaleString('he-IL') }
            }
          }
        }
      });
    }

    // Method pie chart
    const methodMap = {};
    data.forEach(d => {
      methodMap[d.method] = (methodMap[d.method] || 0) + d.amount;
    });
    const methodLabels = Object.keys(methodMap);
    const methodValues = Object.values(methodMap);
    const pieColors = ['#34a853', '#4285f4', '#fbbc04', '#ea4335'];

    const ctxMethod = document.getElementById('don-chart-method');
    if (ctxMethod) {
      if (this._donChartMethod) this._donChartMethod.destroy();
      this._donChartMethod = new Chart(ctxMethod, {
        type: 'doughnut',
        data: {
          labels: methodLabels,
          datasets: [{
            data: methodValues,
            backgroundColor: pieColors,
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
                  const pct = Math.round(ctx.raw / total * 100);
                  return ctx.label + ': \u20AA' + ctx.raw.toLocaleString('he-IL') + ' (' + pct + '%)';
                }
              }
            }
          }
        }
      });
    }
  },

  /* ---------- Add Donation Modal ---------- */
  donShowAddModal() {
    const modal = document.getElementById('don-add-modal');
    if (!modal) return;
    // Reset form
    ['donf-donor','donf-amount','donf-receipt','donf-dedication'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    const dateEl = document.getElementById('donf-date');
    if (dateEl) dateEl.value = Utils.todayISO();
    // Auto receipt number
    const receiptEl = document.getElementById('donf-receipt');
    if (receiptEl) receiptEl.value = 'R-' + (1020 + Math.floor(Math.random() * 100));

    new bootstrap.Modal(modal).show();
  },

  async donSave() {
    const donor = document.getElementById('donf-donor')?.value?.trim();
    const amount = parseFloat(document.getElementById('donf-amount')?.value);
    if (!donor) { Utils.toast('\u05E0\u05D0 \u05DC\u05D4\u05D6\u05D9\u05DF \u05E9\u05DD \u05EA\u05D5\u05E8\u05DD', 'danger'); return; }
    if (!amount || amount <= 0) { Utils.toast('\u05E0\u05D0 \u05DC\u05D4\u05D6\u05D9\u05DF \u05E1\u05DB\u05D5\u05DD \u05EA\u05E7\u05D9\u05DF', 'danger'); return; }

    const donation = {
      id: 'd' + Date.now(),
      donor,
      amount,
      method: document.getElementById('donf-method')?.value || '\u05DE\u05D6\u05D5\u05DE\u05DF',
      purpose: document.getElementById('donf-purpose')?.value || '\u05EA\u05E8\u05D5\u05DE\u05D4 \u05DB\u05DC\u05DC\u05D9\u05EA',
      date: document.getElementById('donf-date')?.value || Utils.todayISO(),
      receipt: document.getElementById('donf-receipt')?.value || '',
      dedication: document.getElementById('donf-dedication')?.value || '',
      campaign: document.getElementById('donf-campaign')?.value || ''
    };

    // Save to API
    try {
      await App.apiCall('add', 'קופה_קטנה', { row: donation });
    } catch(e) {
      /* API save failed, keeping locally */
    }
    if (this._donLiveData) this._donLiveData.push(donation);
    Utils.toast(`\u05EA\u05E8\u05D5\u05DE\u05D4 \u05E2\u05DC \u05E1\u05DA ${Utils.formatCurrency(amount)} \u05DE${donor} \u05E0\u05E9\u05DE\u05E8\u05D4 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4!`);
    bootstrap.Modal.getInstance(document.getElementById('don-add-modal'))?.hide();
    this._donRenderTable();
    this._donRenderCharts(this._donLiveData || this._donDemoData());
  },

  /* ---------- Campaign Modal ---------- */
  donShowCampaignModal() {
    const modal = document.getElementById('don-campaign-modal');
    if (!modal) return;
    ['campf-name','campf-goal','campf-deadline','campf-desc'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    new bootstrap.Modal(modal).show();
  },

  donSaveCampaign() {
    const name = document.getElementById('campf-name')?.value?.trim();
    const goal = parseFloat(document.getElementById('campf-goal')?.value);
    if (!name) { Utils.toast('\u05E0\u05D0 \u05DC\u05D4\u05D6\u05D9\u05DF \u05E9\u05DD \u05E7\u05DE\u05E4\u05D9\u05D9\u05DF', 'danger'); return; }
    if (!goal || goal <= 0) { Utils.toast('\u05E0\u05D0 \u05DC\u05D4\u05D6\u05D9\u05DF \u05D9\u05E2\u05D3 \u05D2\u05D9\u05D5\u05E1', 'danger'); return; }

    Utils.toast(`\u05E7\u05DE\u05E4\u05D9\u05D9\u05DF "${name}" \u05E0\u05D5\u05E6\u05E8 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4!`);
    bootstrap.Modal.getInstance(document.getElementById('don-campaign-modal'))?.hide();
  },

  /* ---------- Receipt Generator ---------- */
  donShowReceipt(donId) {
    const data = this._donLiveData || this._donDemoData();
    const d = data.find(x => x.id === donId);
    if (!d) return;

    const amountWords = this._donAmountToWords(d.amount);
    const receiptHTML = `
      <div id="don-receipt-print" style="padding:40px; direction:rtl; font-family:'Heebo',sans-serif; max-width:700px; margin:auto;">
        <!-- Header -->
        <div style="text-align:center; border-bottom:3px double #1a73e8; padding-bottom:20px; margin-bottom:25px;">
          <h2 style="color:#1a73e8; margin:0">\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3</h2>
          <p style="margin:5px 0; color:#666">\u05DE\u05D5\u05E1\u05D3 \u05D7\u05D9\u05E0\u05D5\u05DB\u05D9 \u05EA\u05D5\u05E8\u05E0\u05D9</p>
          <p style="margin:0; font-size:13px; color:#999">\u05E2\u05DE\u05D5\u05EA\u05D4 \u05E8\u05E9\u05D5\u05DE\u05D4 (\u05E2"\u05E8) | \u05DE\u05E1' 580123456</p>
        </div>

        <!-- Receipt Title -->
        <div style="text-align:center; margin-bottom:25px;">
          <h3 style="background:#f0f7ff; display:inline-block; padding:8px 30px; border-radius:8px; color:#1a73e8; border:1px solid #d0e3ff">\u05E7\u05D1\u05DC\u05D4 \u05DE\u05E1' ${d.receipt || '-'}</h3>
        </div>

        <!-- Details -->
        <table style="width:100%; border-collapse:collapse; margin-bottom:25px; font-size:15px">
          <tr style="border-bottom:1px solid #eee">
            <td style="padding:10px; font-weight:bold; width:130px; color:#555">\u05EA\u05D0\u05E8\u05D9\u05DA:</td>
            <td style="padding:10px">${Utils.formatDate(d.date)}</td>
          </tr>
          <tr style="border-bottom:1px solid #eee">
            <td style="padding:10px; font-weight:bold; color:#555">\u05D4\u05EA\u05E7\u05D1\u05DC \u05DE\u05D0\u05EA:</td>
            <td style="padding:10px; font-size:16px; font-weight:bold">${d.donor}</td>
          </tr>
          <tr style="border-bottom:1px solid #eee">
            <td style="padding:10px; font-weight:bold; color:#555">\u05E1\u05DB\u05D5\u05DD:</td>
            <td style="padding:10px">
              <span style="font-size:22px; font-weight:bold; color:#0f9d58">${Utils.formatCurrency(d.amount)}</span>
              <br><span style="font-size:13px; color:#888">(${amountWords})</span>
            </td>
          </tr>
          <tr style="border-bottom:1px solid #eee">
            <td style="padding:10px; font-weight:bold; color:#555">\u05D0\u05DE\u05E6\u05E2\u05D9:</td>
            <td style="padding:10px">${d.method}</td>
          </tr>
          <tr style="border-bottom:1px solid #eee">
            <td style="padding:10px; font-weight:bold; color:#555">\u05DE\u05D8\u05E8\u05D4:</td>
            <td style="padding:10px">${d.purpose}</td>
          </tr>
          ${d.dedication ? `<tr style="border-bottom:1px solid #eee">
            <td style="padding:10px; font-weight:bold; color:#555">\u05D4\u05E7\u05D3\u05E9\u05D4:</td>
            <td style="padding:10px; font-style:italic">${d.dedication}</td>
          </tr>` : ''}
        </table>

        <!-- Tax Info -->
        <div style="background:#f8f9fa; padding:15px; border-radius:8px; margin-bottom:25px; font-size:13px; color:#666; border:1px solid #e9ecef">
          <i class="bi bi-info-circle"></i>
          \u05EA\u05E8\u05D5\u05DE\u05D4 \u05D6\u05D5 \u05DE\u05D5\u05DB\u05E8\u05EA \u05DB\u05E0\u05D9\u05DB\u05D5\u05D9 \u05DE\u05E1 \u05DC\u05E4\u05D9 \u05E1\u05E2\u05D9\u05E3 46 \u05DC\u05E4\u05E7\u05D5\u05D3\u05EA \u05DE\u05E1 \u05D4\u05DB\u05E0\u05E1\u05D4.
          \u05D4\u05EA\u05E8\u05D5\u05DE\u05D4 \u05E0\u05D9\u05EA\u05E0\u05D4 \u05DC\u05DE\u05D5\u05E1\u05D3 \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3 (\u05E2"\u05E8) \u05DE\u05E1\u05E4\u05E8 580123456.
        </div>

        <!-- Signature -->
        <div style="display:flex; justify-content:space-between; margin-top:40px; padding-top:20px">
          <div style="text-align:center">
            <div style="border-top:1px solid #333; width:180px; margin-top:40px; padding-top:5px">\u05D7\u05EA\u05D9\u05DE\u05D4 \u05D5\u05D7\u05D5\u05EA\u05DD</div>
          </div>
          <div style="text-align:center">
            <div style="border-top:1px solid #333; width:180px; margin-top:40px; padding-top:5px">\u05D4\u05E0\u05D4\u05DC\u05EA \u05D4\u05DE\u05D5\u05E1\u05D3</div>
          </div>
        </div>

        <!-- Footer -->
        <div style="text-align:center; margin-top:30px; padding-top:15px; border-top:1px solid #ddd; font-size:11px; color:#aaa">
          \u05D4\u05D5\u05E0\u05E4\u05E7 \u05D1\u05D0\u05DE\u05E6\u05E2\u05D5\u05EA \u05DE\u05E2\u05E8\u05DB\u05EA \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3 | ${Utils.formatDate(new Date())}
        </div>
      </div>`;

    document.getElementById('don-receipt-body').innerHTML = receiptHTML;
    new bootstrap.Modal(document.getElementById('don-receipt-modal')).show();
  },

  donPrintReceipt() {
    const content = document.getElementById('don-receipt-print');
    if (!content) return;
    const win = window.open('', '_blank');
    win.document.write(`
      <!DOCTYPE html>
      <html dir="rtl" lang="he">
      <head>
        <meta charset="UTF-8">
        <title>\u05E7\u05D1\u05DC\u05D4 - \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3</title>
        <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;700&display=swap" rel="stylesheet">
        <style>body{font-family:'Heebo',sans-serif;margin:0;padding:20px}@media print{body{padding:0}}</style>
      </head>
      <body>${content.innerHTML}</body>
      </html>`);
    win.document.close();
    setTimeout(() => { win.print(); }, 300);
  },

  /* ---------- Amount to Hebrew words (simplified) ---------- */
  _donAmountToWords(n) {
    const ones = ['', '\u05D0\u05D7\u05D3', '\u05E9\u05E0\u05D9\u05D9\u05DD', '\u05E9\u05DC\u05D5\u05E9\u05D4', '\u05D0\u05E8\u05D1\u05E2\u05D4', '\u05D7\u05DE\u05D9\u05E9\u05D4', '\u05E9\u05D9\u05E9\u05D4', '\u05E9\u05D1\u05E2\u05D4', '\u05E9\u05DE\u05D5\u05E0\u05D4', '\u05EA\u05E9\u05E2\u05D4'];
    const tens = ['', '\u05E2\u05E9\u05E8', '\u05E2\u05E9\u05E8\u05D9\u05DD', '\u05E9\u05DC\u05D5\u05E9\u05D9\u05DD', '\u05D0\u05E8\u05D1\u05E2\u05D9\u05DD', '\u05D7\u05DE\u05D9\u05E9\u05D9\u05DD', '\u05E9\u05D9\u05E9\u05D9\u05DD', '\u05E9\u05D1\u05E2\u05D9\u05DD', '\u05E9\u05DE\u05D5\u05E0\u05D9\u05DD', '\u05EA\u05E9\u05E2\u05D9\u05DD'];
    const hundreds = ['', '\u05DE\u05D0\u05D4', '\u05DE\u05D0\u05EA\u05D9\u05D9\u05DD', '\u05E9\u05DC\u05D5\u05E9 \u05DE\u05D0\u05D5\u05EA', '\u05D0\u05E8\u05D1\u05E2 \u05DE\u05D0\u05D5\u05EA', '\u05D7\u05DE\u05E9 \u05DE\u05D0\u05D5\u05EA', '\u05E9\u05E9 \u05DE\u05D0\u05D5\u05EA', '\u05E9\u05D1\u05E2 \u05DE\u05D0\u05D5\u05EA', '\u05E9\u05DE\u05D5\u05E0\u05D4 \u05DE\u05D0\u05D5\u05EA', '\u05EA\u05E9\u05E2 \u05DE\u05D0\u05D5\u05EA'];

    if (n === 0) return '\u05D0\u05E4\u05E1 \u05E9\u05E7\u05DC\u05D9\u05DD';
    const parts = [];
    const thousands = Math.floor(n / 1000);
    const remainder = n % 1000;
    if (thousands > 0) {
      if (thousands === 1) parts.push('\u05D0\u05DC\u05E3');
      else if (thousands === 2) parts.push('\u05D0\u05DC\u05E4\u05D9\u05D9\u05DD');
      else if (thousands < 10) parts.push(ones[thousands] + ' \u05D0\u05DC\u05E4\u05D9\u05DD');
      else parts.push(n.toLocaleString('he-IL'));
    }
    if (remainder > 0) {
      const h = Math.floor(remainder / 100);
      const t = Math.floor((remainder % 100) / 10);
      const o = remainder % 10;
      if (h > 0) parts.push(hundreds[h]);
      if (t > 0) parts.push(tens[t]);
      if (o > 0 && t !== 1) parts.push(ones[o]);
    }
    return parts.join(' \u05D5') + ' \u05E9\u05E7\u05DC\u05D9\u05DD';
  },

  /* ---------- Delete (demo) ---------- */
  async donDelete(donId) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05EA \u05EA\u05E8\u05D5\u05DE\u05D4', '\u05DC\u05DE\u05D7\u05D5\u05E7 \u05EA\u05E8\u05D5\u05DE\u05D4 \u05D6\u05D5?')) return;
    try {
      await App.apiCall('delete', 'קופה_קטנה', { id: donId });
    } catch(e) {
      /* API delete failed */
    }
    if (this._donLiveData) {
      this._donLiveData = this._donLiveData.filter(d => d.id !== donId);
    }
    Utils.toast('\u05EA\u05E8\u05D5\u05DE\u05D4 \u05E0\u05DE\u05D7\u05E7\u05D4', 'warning');
    this._donRenderTable();
  },

  /* ---------- CSV Export ---------- */
  donExportCSV() {
    const data = this._donGetFilteredData();
    const headers = ['\u05EA\u05D5\u05E8\u05DD','\u05E1\u05DB\u05D5\u05DD','\u05D0\u05DE\u05E6\u05E2\u05D9','\u05DE\u05D8\u05E8\u05D4','\u05EA\u05D0\u05E8\u05D9\u05DA','\u05E7\u05D1\u05DC\u05D4','\u05D4\u05E7\u05D3\u05E9\u05D4'];
    const rows = data.map(d => [d.donor, d.amount, d.method, d.purpose, d.date, d.receipt, d.dedication].map(v => `"${(v||'').toString().replace(/"/g,'""')}"`).join(','));
    const csv = '\uFEFF' + [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `\u05EA\u05E8\u05D5\u05DE\u05D5\u05EA_${Utils.todayISO()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    Utils.toast('\u05E7\u05D5\u05D1\u05E5 CSV \u05D9\u05D5\u05E8\u05D3 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4');
  }
});
