/* ===== BHT v5.5 — Communication (Real Data) ===== */
Object.assign(Pages, {
  /* ======================================================================
     PARENTS — Comprehensive Parent Management Module (v5.5)
     ====================================================================== */

  /* --- State --- */
  _parData: [],
  _parStudents: [],
  _parCommLog: [],
  _parMeetings: [],
  _parEditId: null,
  _parTab: 'cards',
  _parSearch: '',
  _parFilterClass: '',
  _parFilterRelation: '',

  parents() {
    return `
      <!-- Stats Cards -->
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div><h1><i class="bi bi-house-heart-fill me-2"></i>\u05D4\u05D5\u05E8\u05D9\u05DD</h1><p class="text-muted mb-0">\u05E0\u05D9\u05D4\u05D5\u05DC \u05D4\u05D5\u05E8\u05D9\u05DD, \u05DE\u05E9\u05E4\u05D7\u05D5\u05EA \u05D5\u05E7\u05E9\u05E8 \u05E2\u05DD \u05D4\u05DE\u05D5\u05E1\u05D3</p></div>
        <div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-primary btn-sm" onclick="Pages.showAddParent()"><i class="bi bi-plus-lg me-1"></i>\u05D4\u05D5\u05E1\u05E3 \u05D4\u05D5\u05E8\u05D4</button>
          <button class="btn btn-outline-info btn-sm" onclick="Pages._parShowMeetingModal()"><i class="bi bi-calendar-plus me-1"></i>\u05E7\u05D1\u05E2 \u05E4\u05D2\u05D9\u05E9\u05D4</button>
          <button class="btn btn-outline-success btn-sm" onclick="Pages.bulkSMS()"><i class="bi bi-chat-left-text me-1"></i>\u05E9\u05DC\u05D9\u05D7\u05EA SMS \u05E7\u05D1\u05D5\u05E6\u05EA\u05D9\u05EA</button>
        </div>
      </div>

      <div class="row g-3 mb-3" id="par-stats-row"></div>

      <!-- Search & Filters -->
      <div class="card p-3 mb-3">
        <div class="d-flex gap-2 flex-wrap align-items-center">
          <div class="search-box flex-fill" style="max-width:350px"><i class="bi bi-search"></i><input type="text" class="form-control" id="par-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05DC\u05E4\u05D9 \u05E9\u05DD, \u05D9\u05DC\u05D3, \u05DB\u05D9\u05EA\u05D4..."></div>
          <select class="form-select form-select-sm" style="width:auto;min-width:120px" id="par-filter-class" onchange="Pages._parFilterClass=this.value;Pages.renderParents()">
            <option value="">\u05DB\u05DC \u05D4\u05DB\u05D9\u05EA\u05D5\u05EA</option>
          </select>
          <select class="form-select form-select-sm" style="width:auto;min-width:100px" id="par-filter-relation" onchange="Pages._parFilterRelation=this.value;Pages.renderParents()">
            <option value="">\u05DB\u05DC \u05D4\u05E7\u05E9\u05E8\u05D9\u05DD</option>
            <option value="\u05D0\u05D1">\u05D0\u05D1</option>
            <option value="\u05D0\u05DD">\u05D0\u05DD</option>
            <option value="\u05D0\u05E4\u05D5\u05D8\u05E8\u05D5\u05E4\u05D5\u05E1">\u05D0\u05E4\u05D5\u05D8\u05E8\u05D5\u05E4\u05D5\u05E1</option>
          </select>
        </div>
      </div>

      <!-- Tabs -->
      <ul class="nav nav-tabs mb-3" id="par-tabs">
        <li class="nav-item"><a class="nav-link active" href="#" data-par-tab="cards" onclick="Pages._parTab='cards';Pages.renderParents();return false"><i class="bi bi-grid me-1"></i>\u05DB\u05E8\u05D8\u05D9\u05E1\u05D9\u05DD</a></li>
        <li class="nav-item"><a class="nav-link" href="#" data-par-tab="family" onclick="Pages._parTab='family';Pages.renderParents();return false"><i class="bi bi-diagram-3 me-1"></i>\u05EA\u05E6\u05D5\u05D2\u05EA \u05DE\u05E9\u05E4\u05D7\u05D5\u05EA</a></li>
        <li class="nav-item"><a class="nav-link" href="#" data-par-tab="meetings" onclick="Pages._parTab='meetings';Pages.renderParents();return false"><i class="bi bi-calendar-check me-1"></i>\u05E4\u05D2\u05D9\u05E9\u05D5\u05EA</a></li>
        <li class="nav-item"><a class="nav-link" href="#" data-par-tab="table" onclick="Pages._parTab='table';Pages.renderParents();return false"><i class="bi bi-table me-1"></i>\u05D8\u05D1\u05DC\u05D4</a></li>
      </ul>

      <div id="par-list">${Utils.skeleton(3)}</div>

      <!-- Add/Edit Parent Modal -->
      <div class="modal fade" id="par-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
        <div class="modal-header"><h5 class="modal-title">\u05D4\u05D5\u05E1\u05E4\u05EA \u05D4\u05D5\u05E8\u05D4</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body"><div class="row g-3">
          <div class="col-md-6"><label class="form-label">\u05E9\u05DD \u05DE\u05DC\u05D0</label><input class="form-control" id="pf-name"></div>
          <div class="col-md-3"><label class="form-label">\u05E7\u05E9\u05E8</label><select class="form-select" id="pf-relation"><option>\u05D0\u05D1</option><option>\u05D0\u05DD</option><option>\u05D0\u05E4\u05D5\u05D8\u05E8\u05D5\u05E4\u05D5\u05E1</option></select></div>
          <div class="col-md-3"><label class="form-label">\u05E1\u05D8\u05D8\u05D5\u05E1</label><select class="form-select" id="pf-status"><option value="\u05E4\u05E2\u05D9\u05DC">\u05E4\u05E2\u05D9\u05DC</option><option value="\u05DC\u05D0 \u05E4\u05E2\u05D9\u05DC">\u05DC\u05D0 \u05E4\u05E2\u05D9\u05DC</option></select></div>
          <div class="col-md-6"><label class="form-label">\u05D8\u05DC\u05E4\u05D5\u05DF</label><input class="form-control" id="pf-phone" dir="ltr"></div>
          <div class="col-md-6"><label class="form-label">\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC</label><input class="form-control" id="pf-email" type="email" dir="ltr"></div>
          <div class="col-12"><label class="form-label">\u05DB\u05EA\u05D5\u05D1\u05EA</label><input class="form-control" id="pf-address"></div>
          <div class="col-md-6"><label class="form-label">\u05E9\u05DD \u05DE\u05E9\u05E4\u05D7\u05D4</label><input class="form-control" id="pf-family" placeholder="\u05DE\u05E9\u05E4\u05D7\u05EA \u05DB\u05D4\u05DF, \u05DE\u05E9\u05E4\u05D7\u05EA \u05DC\u05D5\u05D9..."></div>
          <div class="col-md-6"><label class="form-label">\u05D9\u05DC\u05D3\u05D9\u05DD (\u05D1\u05D7\u05E8 \u05DE\u05D4\u05E8\u05E9\u05D9\u05DE\u05D4)</label><div id="pf-children-list" class="border rounded p-2" style="max-height:120px;overflow-y:auto"></div></div>
          <div class="col-12"><label class="form-label">\u05D4\u05E2\u05E8\u05D5\u05EA</label><textarea class="form-control" id="pf-notes" rows="2"></textarea></div>
        </div></div>
        <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveParent()"><i class="bi bi-check-lg me-1"></i>\u05E9\u05DE\u05D9\u05E8\u05D4</button></div>
      </div></div></div>

      <!-- Meeting Scheduler Modal -->
      <div class="modal fade" id="par-meeting-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
        <div class="modal-header"><h5 class="modal-title"><i class="bi bi-calendar-plus me-2"></i>\u05E7\u05D1\u05D9\u05E2\u05EA \u05E4\u05D2\u05D9\u05E9\u05D4</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body"><div class="row g-3">
          <div class="col-12"><label class="form-label">\u05D4\u05D5\u05E8\u05D4</label><select class="form-select" id="pm-parent"></select></div>
          <div class="col-6"><label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA</label><input class="form-control" id="pm-date" type="date"></div>
          <div class="col-6"><label class="form-label">\u05E9\u05E2\u05D4</label><input class="form-control" id="pm-time" type="time"></div>
          <div class="col-12"><label class="form-label">\u05E1\u05D9\u05D1\u05D4 / \u05E0\u05D5\u05E9\u05D0</label><input class="form-control" id="pm-reason"></div>
        </div></div>
        <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages._parSaveMeeting()"><i class="bi bi-check-lg me-1"></i>\u05E7\u05D1\u05E2</button></div>
      </div></div></div>

      <!-- Communication Log Modal -->
      <div class="modal fade" id="par-commlog-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
        <div class="modal-header"><h5 class="modal-title"><i class="bi bi-clock-history me-2"></i>\u05D9\u05D5\u05DE\u05DF \u05EA\u05E7\u05E9\u05D5\u05E8\u05EA</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body" id="par-commlog-body"></div>
      </div></div></div>

      <!-- Broadcast SMS Modal -->
      <div class="modal fade" id="comm-bulk-sms-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
        <div class="modal-header"><h5 class="modal-title"><i class="bi bi-chat-left-text me-2"></i>\u05E9\u05DC\u05D9\u05D7\u05EA SMS \u05E7\u05D1\u05D5\u05E6\u05EA\u05D9\u05EA</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body">
          <label class="form-label">\u05D4\u05D5\u05D3\u05E2\u05D4 \u05DC\u05DB\u05DC \u05D4\u05D4\u05D5\u05E8\u05D9\u05DD:</label>
          <textarea class="form-control" id="bulk-sms-text" rows="4" placeholder="\u05DB\u05EA\u05D1 \u05D0\u05EA \u05D4\u05D4\u05D5\u05D3\u05E2\u05D4 \u05DB\u05D0\u05DF..."></textarea>
        </div>
        <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-success" onclick="Pages._bulkSMSSend()"><i class="bi bi-send me-1"></i>\u05E9\u05DC\u05D7</button></div>
      </div></div></div>

      <!-- New Call Log Modal -->
      <div class="modal fade" id="comm-new-call-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
        <div class="modal-header"><h5 class="modal-title"><i class="bi bi-telephone-plus me-2"></i>\u05E8\u05D9\u05E9\u05D5\u05DD \u05E9\u05D9\u05D7\u05D4 \u05D7\u05D3\u05E9\u05D4</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body"><div class="row g-3">
          <div class="col-12"><label class="form-label">\u05E9\u05DD \u05D4\u05E0\u05DE\u05E2\u05DF</label><input class="form-control" id="ncl-name" placeholder="\u05E9\u05DD \u05D4\u05D0\u05D3\u05DD \u05E9\u05D0\u05D9\u05EA\u05D5 \u05D3\u05D9\u05D1\u05E8\u05EA\u05DD"></div>
          <div class="col-12"><label class="form-label">\u05E0\u05D5\u05E9\u05D0 \u05D4\u05E9\u05D9\u05D7\u05D4</label><input class="form-control" id="ncl-subject" placeholder="\u05E0\u05D5\u05E9\u05D0 \u05D4\u05E9\u05D9\u05D7\u05D4"></div>
          <div class="col-12"><label class="form-label">\u05EA\u05E7\u05E6\u05D9\u05E8 \u05E7\u05E6\u05E8</label><textarea class="form-control" id="ncl-summary" rows="3" placeholder="\u05EA\u05E7\u05E6\u05D9\u05E8 \u05DE\u05D4\u05E9\u05D9\u05D7\u05D4"></textarea></div>
        </div></div>
        <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages._saveNewCallLog()"><i class="bi bi-check-lg me-1"></i>\u05E9\u05DE\u05D5\u05E8</button></div>
      </div></div></div>

      <!-- Edit Call Log Modal -->
      <div class="modal fade" id="comm-edit-call-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
        <div class="modal-header"><h5 class="modal-title"><i class="bi bi-pencil me-2"></i>\u05E2\u05D3\u05DB\u05D5\u05DF \u05E8\u05E9\u05D5\u05DE\u05EA \u05E9\u05D9\u05D7\u05D4</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body"><div class="row g-3">
          <div class="col-12"><label class="form-label">\u05E1\u05D8\u05D8\u05D5\u05E1</label>
            <select class="form-select" id="ecl-status">
              <option value="\u05D1\u05D5\u05E6\u05E2">\u05D1\u05D5\u05E6\u05E2</option>
              <option value="\u05DC\u05D0 \u05E0\u05E2\u05E0\u05D4">\u05DC\u05D0 \u05E0\u05E2\u05E0\u05D4</option>
              <option value="\u05D7\u05D6\u05E8\u05D5 \u05D0\u05DC\u05D9">\u05D7\u05D6\u05E8\u05D5 \u05D0\u05DC\u05D9</option>
              <option value="\u05D4\u05E9\u05D0\u05D9\u05E8\u05D5 \u05D4\u05D5\u05D3\u05E2\u05D4">\u05D4\u05E9\u05D0\u05D9\u05E8\u05D5 \u05D4\u05D5\u05D3\u05E2\u05D4</option>
            </select>
          </div>
          <div class="col-12"><label class="form-label">\u05EA\u05E7\u05E6\u05D9\u05E8</label><textarea class="form-control" id="ecl-summary" rows="3"></textarea></div>
        </div></div>
        <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages._saveEditCallLog()"><i class="bi bi-check-lg me-1"></i>\u05E9\u05DE\u05D5\u05E8</button></div>
      </div></div></div>
    `;
  },

  parentsInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    this._parData = _gc('\u05D4\u05D5\u05E8\u05D9\u05DD');
    this._parStudents = _gc('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
    this._parCommLog = _gc('\u05EA\u05E7\u05E9\u05D5\u05E8\u05EA_\u05D4\u05D5\u05E8\u05D9\u05DD');
    this._parMeetings = [];
    this._parTab = 'cards';
    this._parSearch = '';
    this._parFilterClass = '';
    this._parFilterRelation = '';

    // Build class filter options
    const classSet = new Set();
    this._parStudents.forEach(s => { if (s['\u05DB\u05D9\u05EA\u05D4']) classSet.add(s['\u05DB\u05D9\u05EA\u05D4']); });
    const classSelect = document.getElementById('par-filter-class');
    if (classSelect) {
      [...classSet].sort().forEach(c => {
        const opt = document.createElement('option');
        opt.value = c; opt.textContent = '\u05DB\u05D9\u05EA\u05D4 ' + c;
        classSelect.appendChild(opt);
      });
    }

    document.getElementById('par-search')?.addEventListener('input', Utils.debounce(() => {
      this._parSearch = document.getElementById('par-search').value;
      this.renderParents();
    }, 200));

    this._parRenderStats();
    this.renderParents();
  },

  /* --- Stats Cards --- */
  _parRenderStats() {
    const data = this._parData;
    const families = new Set(data.map(p => p['\u05DE\u05E9\u05E4\u05D7\u05D4'] || p['\u05E9\u05DD']));
    const withEmail = data.filter(p => p['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC']).length;
    const emailPct = data.length ? Math.round(withEmail / data.length * 100) : 0;
    const active = data.filter(p => (p['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '\u05E4\u05E2\u05D9\u05DC') === '\u05E4\u05E2\u05D9\u05DC').length;

    const el = document.getElementById('par-stats-row');
    if (!el) return;
    el.innerHTML = `
      <div class="col-6 col-md-3"><div class="card p-3 text-center border-start border-4 border-primary">
        <div class="fs-3 fw-bold text-primary">${data.length}</div>
        <div class="small text-muted">\u05E1\u05D4"\u05DB \u05D4\u05D5\u05E8\u05D9\u05DD</div>
      </div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center border-start border-4 border-success">
        <div class="fs-3 fw-bold text-success">${families.size}</div>
        <div class="small text-muted">\u05DE\u05E9\u05E4\u05D7\u05D5\u05EA</div>
      </div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center border-start border-4 border-info">
        <div class="fs-3 fw-bold text-info">${emailPct}%</div>
        <div class="small text-muted">\u05E2\u05DD \u05D0\u05D9\u05DE\u05D9\u05D9\u05DC</div>
      </div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center border-start border-4 border-warning">
        <div class="fs-3 fw-bold text-warning">${active}</div>
        <div class="small text-muted">\u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8 \u05E4\u05E2\u05D9\u05DC\u05D9\u05DD</div>
      </div></div>`;
  },

  /* --- Get children for a parent --- */
  _parGetChildren(parent) {
    const family = parent['\u05DE\u05E9\u05E4\u05D7\u05D4'] || '';
    if (!family) return [];
    return this._parStudents.filter(s => (s['\u05DE\u05E9\u05E4\u05D7\u05D4'] || '') === family);
  },

  /* --- Filter logic --- */
  _parGetFiltered() {
    const search = (this._parSearch || '').trim().toLowerCase();
    const fClass = this._parFilterClass;
    const fRelation = this._parFilterRelation;

    return this._parData.filter(p => {
      // Search filter
      if (search) {
        const name = (p['\u05E9\u05DD'] || '').toLowerCase();
        const phone = (p['\u05D8\u05DC\u05E4\u05D5\u05DF'] || '').toLowerCase();
        const family = (p['\u05DE\u05E9\u05E4\u05D7\u05D4'] || '').toLowerCase();
        const children = this._parGetChildren(p).map(c => (c['\u05E9\u05DD'] || '').toLowerCase()).join(' ');
        if (!name.includes(search) && !phone.includes(search) && !family.includes(search) && !children.includes(search)) return false;
      }
      // Class filter
      if (fClass) {
        const children = this._parGetChildren(p);
        if (!children.some(c => c['\u05DB\u05D9\u05EA\u05D4'] === fClass)) return false;
      }
      // Relation filter
      if (fRelation && (p['\u05E7\u05E9\u05E8'] || '') !== fRelation) return false;
      return true;
    });
  },

  /* --- Main render dispatcher --- */
  renderParents() {
    // Update tab active state
    document.querySelectorAll('#par-tabs .nav-link').forEach(a => {
      a.classList.toggle('active', a.dataset.parTab === this._parTab);
    });

    const el = document.getElementById('par-list');
    if (!el) return;
    const filtered = this._parGetFiltered();

    if (this._parTab === 'cards') this._parRenderCards(el, filtered);
    else if (this._parTab === 'family') this._parRenderFamily(el, filtered);
    else if (this._parTab === 'meetings') this._parRenderMeetings(el);
    else if (this._parTab === 'table') this._parRenderTable(el, filtered);
  },

  /* --- CARDS VIEW --- */
  _parRenderCards(el, filtered) {
    if (!filtered.length) {
      el.innerHTML = !this._parData.length
        ? '<div class="empty-state"><i class="bi bi-house-heart"></i><h5>\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05E2\u05D3\u05D9\u05D9\u05DF \u2013 \u05D4\u05D5\u05E1\u05E3 \u05E8\u05E9\u05D5\u05DE\u05D4 \u05E8\u05D0\u05E9\u05D5\u05E0\u05D4</h5></div>'
        : '<div class="empty-state"><i class="bi bi-house-heart"></i><h5>\u05D0\u05D9\u05DF \u05D4\u05D5\u05E8\u05D9\u05DD</h5></div>';
      return;
    }
    el.innerHTML = `<div class="row g-3">${filtered.map(p => {
      const pid = p.id || Utils.rowId(p);
      const children = this._parGetChildren(p);
      const phone = p['\u05D8\u05DC\u05E4\u05D5\u05DF'] || '';
      const cleanPhone = phone.replace(/[-\s]/g, '').replace(/^0/, '972');
      const statusBadge = (p['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '\u05E4\u05E2\u05D9\u05DC') === '\u05E4\u05E2\u05D9\u05DC'
        ? '<span class="badge bg-success">\u05E4\u05E2\u05D9\u05DC</span>'
        : '<span class="badge bg-secondary">\u05DC\u05D0 \u05E4\u05E2\u05D9\u05DC</span>';
      const relationIcon = (p['\u05E7\u05E9\u05E8'] || '') === '\u05D0\u05DD' ? 'bi-gender-female text-danger' : 'bi-gender-male text-primary';
      const commCount = this._parCommLog.filter(c => c['\u05D4\u05D5\u05E8\u05D4_id'] === pid).length;

      return `<div class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm hover-lift">
          <div class="card-body">
            <div class="d-flex align-items-center gap-3 mb-3">
              ${Utils.avatarHTML ? Utils.avatarHTML(p['\u05E9\u05DD'], 'md') : '<div class="avatar-md bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold">' + (p['\u05E9\u05DD']||'').substring(0,2) + '</div>'}
              <div class="flex-fill">
                <h6 class="fw-bold mb-1">
                  <a href="#parent_card/${pid}" class="text-decoration-none text-dark">${Utils.escapeHTML(p['\u05E9\u05DD'] || '')}</a>
                </h6>
                <div class="d-flex align-items-center gap-2">
                  <span class="badge bg-light text-dark border"><i class="bi ${relationIcon} me-1"></i>${Utils.escapeHTML(p['\u05E7\u05E9\u05E8'] || '')}</span>
                  ${statusBadge}
                </div>
              </div>
            </div>

            <!-- Children -->
            ${children.length ? `<div class="mb-2">
              <small class="text-muted d-block mb-1"><i class="bi bi-people me-1"></i>\u05D9\u05DC\u05D3\u05D9\u05DD:</small>
              <div class="d-flex flex-wrap gap-1">
                ${children.map(c => `<span class="badge bg-primary bg-opacity-10 text-primary">${Utils.escapeHTML(c['\u05E9\u05DD']||'')} <small>(\u05DB\u05D9\u05EA\u05D4 ${Utils.escapeHTML(c['\u05DB\u05D9\u05EA\u05D4']||'')})</small></span>`).join('')}
              </div>
            </div>` : ''}

            <!-- Contact info -->
            <div class="small text-muted mb-2">
              ${phone ? `<div><i class="bi bi-telephone me-1"></i><span dir="ltr">${Utils.formatPhone ? Utils.formatPhone(phone) : phone}</span></div>` : ''}
              ${p['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC'] ? `<div><i class="bi bi-envelope me-1"></i>${p['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC']}</div>` : ''}
              ${p['\u05DB\u05EA\u05D5\u05D1\u05EA'] ? `<div><i class="bi bi-geo-alt me-1"></i>${p['\u05DB\u05EA\u05D5\u05D1\u05EA']}</div>` : ''}
            </div>

            ${commCount ? `<div class="small"><span class="badge bg-info bg-opacity-10 text-info"><i class="bi bi-chat-dots me-1"></i>${commCount} \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA</span></div>` : ''}
          </div>
          <div class="card-footer bg-transparent border-top-0 pt-0">
            <div class="d-flex gap-1 flex-wrap">
              ${phone ? `<a href="tel:${phone}" class="btn btn-sm btn-outline-primary" title="\u05D7\u05D9\u05D9\u05D2"><i class="bi bi-telephone"></i></a>` : ''}
              ${phone ? `<a href="sms:${phone}" class="btn btn-sm btn-outline-success" title="SMS"><i class="bi bi-chat-left-text"></i></a>` : ''}
              <button class="btn btn-sm btn-outline-secondary" onclick="Pages._parShowCommLog(${pid})" title="\u05D9\u05D5\u05DE\u05DF \u05EA\u05E7\u05E9\u05D5\u05E8\u05EA"><i class="bi bi-clock-history"></i></button>
              <div class="ms-auto d-flex gap-1">
                <button class="btn btn-sm btn-outline-primary" onclick="Pages.editParent('${pid}')"><i class="bi bi-pencil"></i></button>
                <button class="btn btn-sm btn-outline-danger" onclick="Pages.deleteParent('${pid}')"><i class="bi bi-trash"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    }).join('')}</div>
    <div class="mt-2 text-muted small">\u05DE\u05E6\u05D9\u05D2 ${filtered.length} \u05DE\u05EA\u05D5\u05DA ${this._parData.length} \u05D4\u05D5\u05E8\u05D9\u05DD</div>`;
  },

  /* --- FAMILY VIEW --- */
  _parRenderFamily(el, filtered) {
    // Group by family
    const familyMap = {};
    filtered.forEach(p => {
      const fam = p['\u05DE\u05E9\u05E4\u05D7\u05D4'] || p['\u05E9\u05DD'] || '\u05DC\u05D0 \u05DE\u05E9\u05D5\u05D9\u05DA';
      if (!familyMap[fam]) familyMap[fam] = { parents: [], children: [] };
      familyMap[fam].parents.push(p);
    });
    // Add children per family
    Object.keys(familyMap).forEach(fam => {
      familyMap[fam].children = this._parStudents.filter(s => (s['\u05DE\u05E9\u05E4\u05D7\u05D4'] || '') === fam);
    });

    if (!Object.keys(familyMap).length) {
      el.innerHTML = '<div class="empty-state"><i class="bi bi-diagram-3"></i><h5>\u05D0\u05D9\u05DF \u05DE\u05E9\u05E4\u05D7\u05D5\u05EA</h5></div>';
      return;
    }

    el.innerHTML = `<div class="row g-3">${Object.entries(familyMap).map(([fam, data]) => {
      const father = data.parents.find(p => p['\u05E7\u05E9\u05E8'] === '\u05D0\u05D1');
      const mother = data.parents.find(p => p['\u05E7\u05E9\u05E8'] === '\u05D0\u05DD');

      return `<div class="col-md-6">
        <div class="card h-100 shadow-sm">
          <div class="card-header bg-primary bg-opacity-10 border-0">
            <h6 class="mb-0 fw-bold"><i class="bi bi-house-heart me-2 text-primary"></i>\u05DE\u05E9\u05E4\u05D7\u05EA ${fam}</h6>
          </div>
          <div class="card-body">
            <div class="row g-2 mb-3">
              ${father ? `<div class="col-6">
                <div class="border rounded p-2 bg-light">
                  <div class="d-flex align-items-center gap-2 mb-1">
                    ${Utils.avatarHTML ? Utils.avatarHTML(father['\u05E9\u05DD'], 'sm') : ''}
                    <div>
                      <div class="fw-bold small">${father['\u05E9\u05DD']}</div>
                      <span class="badge bg-primary" style="font-size:0.65rem">\u05D0\u05D1</span>
                    </div>
                  </div>
                  <div class="small text-muted" dir="ltr">${Utils.formatPhone ? Utils.formatPhone(father['\u05D8\u05DC\u05E4\u05D5\u05DF']) : father['\u05D8\u05DC\u05E4\u05D5\u05DF'] || ''}</div>
                </div>
              </div>` : ''}
              ${mother ? `<div class="col-6">
                <div class="border rounded p-2 bg-light">
                  <div class="d-flex align-items-center gap-2 mb-1">
                    ${Utils.avatarHTML ? Utils.avatarHTML(mother['\u05E9\u05DD'], 'sm') : ''}
                    <div>
                      <div class="fw-bold small">${mother['\u05E9\u05DD']}</div>
                      <span class="badge bg-danger" style="font-size:0.65rem">\u05D0\u05DD</span>
                    </div>
                  </div>
                  <div class="small text-muted" dir="ltr">${Utils.formatPhone ? Utils.formatPhone(mother['\u05D8\u05DC\u05E4\u05D5\u05DF']) : mother['\u05D8\u05DC\u05E4\u05D5\u05DF'] || ''}</div>
                </div>
              </div>` : ''}
            </div>

            ${data.children.length ? `
              <div class="mb-2"><small class="text-muted fw-bold"><i class="bi bi-mortarboard me-1"></i>\u05D9\u05DC\u05D3\u05D9\u05DD (${data.children.length}):</small></div>
              <div class="d-flex flex-wrap gap-1">
                ${data.children.map(c => `<span class="badge bg-success bg-opacity-10 text-success border">${c['\u05E9\u05DD']} <small class="text-muted">(\u05DB\u05D9\u05EA\u05D4 ${c['\u05DB\u05D9\u05EA\u05D4'] || ''})</small></span>`).join('')}
              </div>` : '<div class="text-muted small">\u05D0\u05D9\u05DF \u05D9\u05DC\u05D3\u05D9\u05DD \u05DE\u05E9\u05D5\u05D9\u05DB\u05D9\u05DD</div>'}

            ${data.parents[0]['\u05DB\u05EA\u05D5\u05D1\u05EA'] ? `<div class="mt-2 small text-muted"><i class="bi bi-geo-alt me-1"></i>${data.parents[0]['\u05DB\u05EA\u05D5\u05D1\u05EA']}</div>` : ''}
          </div>
          <div class="card-footer bg-transparent d-flex gap-1">
            ${data.parents.map(p => {
              const ph = (p['\u05D8\u05DC\u05E4\u05D5\u05DF'] || '').replace(/[-\s]/g, '').replace(/^0/, '972');
              const rawPh = (p['\u05D8\u05DC\u05E4\u05D5\u05DF'] || '').replace(/[-\s]/g, '');
              return rawPh ? `<a href="tel:${rawPh}" class="btn btn-sm btn-outline-primary" title="\u05D7\u05D9\u05D9\u05D2 ${p['\u05E9\u05DD']}"><i class="bi bi-telephone me-1"></i>${p['\u05E7\u05E9\u05E8']}</a>` : '';
            }).join('')}
          </div>
        </div>
      </div>`;
    }).join('')}</div>
    <div class="mt-2 text-muted small">${Object.keys(familyMap).length} \u05DE\u05E9\u05E4\u05D7\u05D5\u05EA</div>`;
  },

  /* --- MEETINGS VIEW --- */
  _parRenderMeetings(el) {
    const meetings = this._parMeetings;
    if (!meetings.length) {
      el.innerHTML = '<div class="empty-state"><i class="bi bi-calendar-check"></i><h5>\u05D0\u05D9\u05DF \u05E4\u05D2\u05D9\u05E9\u05D5\u05EA \u05DE\u05EA\u05D5\u05DB\u05E0\u05E0\u05D5\u05EA</h5><p class="text-muted">\u05DC\u05D7\u05E6\u05D5 "\u05E7\u05D1\u05E2 \u05E4\u05D2\u05D9\u05E9\u05D4" \u05DC\u05D4\u05EA\u05D7\u05DC\u05D4</p></div>';
      return;
    }

    const getParentName = (id) => {
      const p = this._parData.find(x => (x.id || Utils.rowId(x)) === id);
      return p ? p['\u05E9\u05DD'] : '\u05DC\u05D0 \u05D9\u05D3\u05D5\u05E2';
    };

    const rows = meetings.map(m => {
      const statusClass = m['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D1\u05D5\u05E6\u05E2' ? 'success' : m['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D1\u05D5\u05D8\u05DC' ? 'danger' : 'warning';
      return `<tr>
        <td class="fw-bold">${getParentName(m['\u05D4\u05D5\u05E8\u05D4_id'])}</td>
        <td>${m['\u05EA\u05D0\u05E8\u05D9\u05DA'] || ''}</td>
        <td>${m['\u05E9\u05E2\u05D4'] || ''}</td>
        <td>${m['\u05E1\u05D9\u05D1\u05D4'] || ''}</td>
        <td><span class="badge bg-${statusClass}">${m['\u05E1\u05D8\u05D8\u05D5\u05E1']}</span></td>
        <td class="text-nowrap">
          <button class="btn btn-sm btn-outline-success" onclick="Pages._parCompleteMeeting(${meetings.indexOf(m)})" title="\u05D1\u05D5\u05E6\u05E2"><i class="bi bi-check-lg"></i></button>
          <button class="btn btn-sm btn-outline-danger" onclick="Pages._parCancelMeeting(${meetings.indexOf(m)})" title="\u05D1\u05D8\u05DC"><i class="bi bi-x-lg"></i></button>
        </td>
      </tr>`;
    }).join('');

    el.innerHTML = `
      <div class="card"><div class="table-responsive"><table class="table table-bht table-hover mb-0">
        <thead><tr><th>\u05D4\u05D5\u05E8\u05D4</th><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05E9\u05E2\u05D4</th><th>\u05E1\u05D9\u05D1\u05D4</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th><th>\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA</th></tr></thead>
        <tbody>${rows}</tbody></table></div></div>
      <div class="mt-2 text-muted small">${meetings.length} \u05E4\u05D2\u05D9\u05E9\u05D5\u05EA</div>`;
  },

  /* --- TABLE VIEW --- */
  _parRenderTable(el, filtered) {
    if (!filtered.length) {
      el.innerHTML = '<div class="empty-state"><i class="bi bi-house-heart"></i><h5>\u05D0\u05D9\u05DF \u05D4\u05D5\u05E8\u05D9\u05DD</h5></div>';
      return;
    }
    el.innerHTML = `<div class="card"><div class="table-responsive"><table class="table table-bht table-hover mb-0"><thead><tr>
      <th>\u05E9\u05DD</th><th>\u05E7\u05E9\u05E8</th><th>\u05D9\u05DC\u05D3\u05D9\u05DD</th><th>\u05D8\u05DC\u05E4\u05D5\u05DF</th><th>\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th><th>\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA</th>
    </tr></thead><tbody>${filtered.map(p => {
      const pid = p.id || Utils.rowId(p);
      const children = this._parGetChildren(p);
      const phone = p['\u05D8\u05DC\u05E4\u05D5\u05DF'] || '';
      const cleanPhone = phone.replace(/[-\s]/g, '').replace(/^0/, '972');
      const statusBadge = (p['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '\u05E4\u05E2\u05D9\u05DC') === '\u05E4\u05E2\u05D9\u05DC' ? 'success' : 'secondary';

      return `<tr>
        <td class="fw-bold"><a href="#parent_card/${pid}" class="text-decoration-none">${Utils.avatarHTML ? Utils.avatarHTML(p['\u05E9\u05DD'], 'sm') : ''} ${p['\u05E9\u05DD'] || ''}</a></td>
        <td><span class="badge bg-${p['\u05E7\u05E9\u05E8'] === '\u05D0\u05DD' ? 'danger' : 'primary'} bg-opacity-10 text-${p['\u05E7\u05E9\u05E8'] === '\u05D0\u05DD' ? 'danger' : 'primary'}">${p['\u05E7\u05E9\u05E8'] || ''}</span></td>
        <td class="small">${children.map(c => c['\u05E9\u05DD']).join(', ') || '--'}</td>
        <td dir="ltr">${Utils.formatPhone ? Utils.formatPhone(phone) : phone}</td>
        <td class="small">${p['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC'] || '--'}</td>
        <td><span class="badge bg-${statusBadge}">${p['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '\u05E4\u05E2\u05D9\u05DC'}</span></td>
        <td class="text-nowrap">
          ${phone ? `<a href="tel:${phone}" class="btn btn-sm btn-outline-primary me-1" title="\u05D7\u05D9\u05D9\u05D2"><i class="bi bi-telephone"></i></a>` : ''}
          ${phone ? `<a href="sms:${phone}" class="btn btn-sm btn-outline-success me-1" title="SMS"><i class="bi bi-chat-left-text"></i></a>` : ''}
          <button class="btn btn-sm btn-outline-primary me-1" onclick="Pages.editParent('${pid}')"><i class="bi bi-pencil"></i></button>
          <button class="btn btn-sm btn-outline-danger" onclick="Pages.deleteParent('${pid}')"><i class="bi bi-trash"></i></button>
        </td>
      </tr>`;
    }).join('')}</tbody></table></div></div>
    <div class="mt-2 text-muted small">\u05DE\u05E6\u05D9\u05D2 ${filtered.length} \u05DE\u05EA\u05D5\u05DA ${this._parData.length} \u05D4\u05D5\u05E8\u05D9\u05DD</div>`;
  },

  /* --- Communication Log Modal --- */
  _parShowCommLog(parentId) {
    const p = this._parData.find(x => (x.id || Utils.rowId(x)) == parentId);
    const name = p ? p['\u05E9\u05DD'] : '';
    const logs = this._parCommLog.filter(c => c['\u05D4\u05D5\u05E8\u05D4_id'] == parentId);
    const body = document.getElementById('par-commlog-body');
    if (!body) return;

    const channelIcon = (ch) => {
      if (ch === 'phone') return '<i class="bi bi-telephone text-success"></i>';
      if (ch === 'email') return '<i class="bi bi-envelope text-info"></i>';
      if (ch === 'sms') return '<i class="bi bi-chat-left-text text-primary"></i>';
      return '<i class="bi bi-chat-dots text-secondary"></i>';
    };

    if (!logs.length) {
      body.innerHTML = `<div class="text-center py-4">
        <i class="bi bi-chat-dots fs-1 text-muted"></i>
        <h6 class="mt-2">\u05D0\u05D9\u05DF \u05D4\u05D9\u05E1\u05D8\u05D5\u05E8\u05D9\u05EA \u05EA\u05E7\u05E9\u05D5\u05E8\u05EA \u05E2\u05D1\u05D5\u05E8 ${name}</h6>
      </div>`;
    } else {
      body.innerHTML = `
        <h6 class="mb-3"><i class="bi bi-person me-1"></i>${name}</h6>
        <div class="timeline">${logs.map(l => `
          <div class="d-flex align-items-start gap-3 mb-3 pb-3 border-bottom">
            <div class="fs-4">${channelIcon(l['\u05D0\u05DE\u05E6\u05E2\u05D9'])}</div>
            <div class="flex-fill">
              <div class="fw-bold small">${l['\u05EA\u05D0\u05E8\u05D9\u05DA']}</div>
              <div>${l['\u05EA\u05D5\u05DB\u05DF']}</div>
            </div>
          </div>`).join('')}
        </div>`;
    }
    { const t = document.querySelector('#par-commlog-modal .modal-title'); if (t) t.innerHTML = `<i class="bi bi-clock-history me-2"></i>\u05D9\u05D5\u05DE\u05DF \u05EA\u05E7\u05E9\u05D5\u05E8\u05EA \u2014 ${Utils.escapeHTML(name||'')}`; }
    new bootstrap.Modal(document.getElementById('par-commlog-modal')).show();
  },

  /* --- Meeting Scheduler --- */
  _parShowMeetingModal(parentId) {
    const select = document.getElementById('pm-parent');
    if (select) {
      select.innerHTML = this._parData.map(p => {
        const pid = p.id || Utils.rowId(p);
        const sel = pid == parentId ? 'selected' : '';
        return `<option value="${pid}" ${sel}>${p['\u05E9\u05DD'] || ''}</option>`;
      }).join('');
    }
    document.getElementById('pm-date').value = '';
    document.getElementById('pm-time').value = '';
    document.getElementById('pm-reason').value = '';
    new bootstrap.Modal(document.getElementById('par-meeting-modal')).show();
  },

  _parSaveMeeting() {
    const parentId = parseInt(document.getElementById('pm-parent').value);
    const date = document.getElementById('pm-date').value;
    const time = document.getElementById('pm-time').value;
    const reason = document.getElementById('pm-reason').value.trim();
    if (!date || !time || !reason) { Utils.toast('\u05E0\u05D0 \u05DC\u05DE\u05DC\u05D0 \u05D0\u05EA \u05DB\u05DC \u05D4\u05E9\u05D3\u05D5\u05EA', 'warning'); return; }
    // Convert date to dd/mm/yyyy
    const [y, m, d] = date.split('-');
    const dateStr = `${d}/${m}/${y}`;
    this._parMeetings.push({
      '\u05D4\u05D5\u05E8\u05D4_id': parentId,
      '\u05EA\u05D0\u05E8\u05D9\u05DA': dateStr,
      '\u05E9\u05E2\u05D4': time,
      '\u05E1\u05D9\u05D1\u05D4': reason,
      '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05DE\u05EA\u05D5\u05DB\u05E0\u05DF'
    });
    bootstrap.Modal.getInstance(document.getElementById('par-meeting-modal'))?.hide();
    Utils.toast('\u05E4\u05D2\u05D9\u05E9\u05D4 \u05E0\u05E7\u05D1\u05E2\u05D4');
    if (this._parTab === 'meetings') this.renderParents();
  },

  _parCompleteMeeting(idx) {
    if (this._parMeetings[idx]) {
      this._parMeetings[idx]['\u05E1\u05D8\u05D8\u05D5\u05E1'] = '\u05D1\u05D5\u05E6\u05E2';
      Utils.toast('\u05E4\u05D2\u05D9\u05E9\u05D4 \u05E1\u05D5\u05DE\u05E0\u05D4 \u05DB\u05D1\u05D5\u05E6\u05E2\u05D4');
      this.renderParents();
    }
  },

  _parCancelMeeting(idx) {
    if (this._parMeetings[idx]) {
      this._parMeetings[idx]['\u05E1\u05D8\u05D8\u05D5\u05E1'] = '\u05D1\u05D5\u05D8\u05DC';
      Utils.toast('\u05E4\u05D2\u05D9\u05E9\u05D4 \u05D1\u05D5\u05D8\u05DC\u05D4');
      this.renderParents();
    }
  },

  /* --- Add/Edit Parent --- */
  showAddParent() {
    this._parEditId = null;
    document.getElementById('pf-name').value = '';
    document.getElementById('pf-relation').value = '\u05D0\u05D1';
    document.getElementById('pf-status').value = '\u05E4\u05E2\u05D9\u05DC';
    document.getElementById('pf-phone').value = '';
    document.getElementById('pf-email').value = '';
    document.getElementById('pf-address').value = '';
    document.getElementById('pf-family').value = '';
    document.getElementById('pf-notes').value = '';
    this._parRenderChildrenCheckboxes([]);
    document.querySelector('#par-modal .modal-title').textContent = '\u05D4\u05D5\u05E1\u05E4\u05EA \u05D4\u05D5\u05E8\u05D4';
    new bootstrap.Modal(document.getElementById('par-modal')).show();
  },

  editParent(id) {
    const p = this._parData.find(x => String(x.id || Utils.rowId(x)) === String(id));
    if (!p) return;
    this._parEditId = id;
    document.getElementById('pf-name').value = p['\u05E9\u05DD'] || '';
    document.getElementById('pf-relation').value = p['\u05E7\u05E9\u05E8'] || '\u05D0\u05D1';
    document.getElementById('pf-status').value = p['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '\u05E4\u05E2\u05D9\u05DC';
    document.getElementById('pf-phone').value = p['\u05D8\u05DC\u05E4\u05D5\u05DF'] || '';
    document.getElementById('pf-email').value = p['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC'] || '';
    document.getElementById('pf-address').value = p['\u05DB\u05EA\u05D5\u05D1\u05EA'] || '';
    document.getElementById('pf-family').value = p['\u05DE\u05E9\u05E4\u05D7\u05D4'] || '';
    document.getElementById('pf-notes').value = p['\u05D4\u05E2\u05E8\u05D5\u05EA'] || '';
    const children = this._parGetChildren(p);
    this._parRenderChildrenCheckboxes(children.map(c => c['\u05E9\u05DD']));
    document.querySelector('#par-modal .modal-title').textContent = '\u05E2\u05E8\u05D9\u05DB\u05EA \u05D4\u05D5\u05E8\u05D4';
    new bootstrap.Modal(document.getElementById('par-modal')).show();
  },

  _parRenderChildrenCheckboxes(selectedNames) {
    const container = document.getElementById('pf-children-list');
    if (!container) return;
    if (!this._parStudents.length) {
      container.innerHTML = '<div class="text-muted small">\u05D0\u05D9\u05DF \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05D1\u05DE\u05E2\u05E8\u05DB\u05EA</div>';
      return;
    }
    container.innerHTML = this._parStudents.map((s, i) => {
      const name = s['\u05E9\u05DD'] || '';
      const checked = selectedNames.includes(name) ? 'checked' : '';
      return `<div class="form-check"><input class="form-check-input pf-child-cb" type="checkbox" value="${name}" id="pfc-${i}" ${checked}><label class="form-check-label small" for="pfc-${i}">${name} <span class="text-muted">(\u05DB\u05D9\u05EA\u05D4 ${s['\u05DB\u05D9\u05EA\u05D4'] || ''})</span></label></div>`;
    }).join('');
  },

  async saveParent() {
    if (!Utils.acquireLock('saveParent')) return;
    const row = {
      '\u05E9\u05DD': document.getElementById('pf-name').value.trim(),
      '\u05E7\u05E9\u05E8': document.getElementById('pf-relation').value,
      '\u05E1\u05D8\u05D8\u05D5\u05E1': document.getElementById('pf-status').value,
      '\u05D8\u05DC\u05E4\u05D5\u05DF': document.getElementById('pf-phone').value.trim(),
      '\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC': document.getElementById('pf-email').value.trim(),
      '\u05DB\u05EA\u05D5\u05D1\u05EA': document.getElementById('pf-address').value.trim(),
      '\u05DE\u05E9\u05E4\u05D7\u05D4': document.getElementById('pf-family').value.trim(),
      '\u05D4\u05E2\u05E8\u05D5\u05EA': document.getElementById('pf-notes').value.trim()
    };
    if (!row['\u05E9\u05DD']) { Utils.toast('\u05D7\u05E1\u05E8 \u05E9\u05DD', 'warning'); Utils.releaseLock('saveParent'); return; }
    try {
      if (this._parEditId) {
        await App.apiCall('update', '\u05D4\u05D5\u05E8\u05D9\u05DD', { id: this._parEditId, row });
      } else {
        row.id = Date.now();
        await App.apiCall('add', '\u05D4\u05D5\u05E8\u05D9\u05DD', { row });
      }
      bootstrap.Modal.getInstance(document.getElementById('par-modal'))?.hide();
      App.clearFormDraft('par-modal');
      Utils.toast(this._parEditId ? '\u05E2\u05D5\u05D3\u05DB\u05DF' : '\u05D4\u05D5\u05E8\u05D4 \u05E0\u05D5\u05E1\u05E3');
      this._parEditId = null;
      this.parentsInit();
    } catch (e) {
      Utils.errorToast('save');
    } finally {
      Utils.releaseLock('saveParent');
    }
  },

  async deleteParent(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05EA \u05D4\u05D5\u05E8\u05D4', '\u05D4\u05D0\u05DD \u05DC\u05DE\u05D7\u05D5\u05E7 \u05D4\u05D5\u05E8\u05D4 \u05D6\u05D4?')) return;
    try {
      await App.apiCall('delete', '\u05D4\u05D5\u05E8\u05D9\u05DD', { id });
      Utils.toast('\u05D4\u05D5\u05E8\u05D4 \u05E0\u05DE\u05D7\u05E7');
      this.parentsInit();
    } catch (e) {
      Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05DE\u05D7\u05D9\u05E7\u05D4', 'danger');
    }
  },

  bulkSMS() {
    const el = document.getElementById('bulk-sms-text');
    if (el) el.value = '';
    new bootstrap.Modal(document.getElementById('comm-bulk-sms-modal')).show();
  },

  _bulkSMSSend() {
    const msg = (document.getElementById('bulk-sms-text')?.value || '').trim();
    if (!msg) { Utils.toast('\u05E0\u05D0 \u05D4\u05D6\u05DF \u05D4\u05D5\u05D3\u05E2\u05D4', 'warning'); return; }
    bootstrap.Modal.getInstance(document.getElementById('comm-bulk-sms-modal'))?.hide();
    let sent = 0;
    this._parData.forEach(p => {
      if (!p['\u05D8\u05DC\u05E4\u05D5\u05DF']) return;
      const phone = p['\u05D8\u05DC\u05E4\u05D5\u05DF'].replace(/[-\s]/g, '');
      window.open(`sms:${phone}?body=${encodeURIComponent(msg)}`, '_blank');
      sent++;
    });
    Utils.toast(`${sent} \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA SMS \u05E0\u05E9\u05DC\u05D7\u05D5`);
  },


  /* ======================================================================
     PARENT CARD — Detailed View
     ====================================================================== */
  parent_card(id) { return `<div id="parent-card-content">${Utils.skeleton(2)}</div>`; },
  async parent_cardInit(id) {
    const [parents, students] = await Promise.all([
      App.getData('\u05D4\u05D5\u05E8\u05D9\u05DD').catch(() => []),
      App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD').catch(() => [])
    ]);
    const allParents = parents || [];
    const allStudents = students || [];
    const p = allParents.find(x => String(x.id || Utils.rowId(x)) === String(id));
    if (!p) { document.getElementById('parent-card-content').innerHTML = '<div class="empty-state"><i class="bi bi-person-x"></i><h5>\u05D4\u05D5\u05E8\u05D4 \u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0</h5></div>'; return; }

    const family = p['\u05DE\u05E9\u05E4\u05D7\u05D4'] || '';
    const children = allStudents.filter(s => (s['\u05DE\u05E9\u05E4\u05D7\u05D4'] || '') === family);
    const familyParents = allParents.filter(x => (x['\u05DE\u05E9\u05E4\u05D7\u05D4'] || '') === family && x !== p);
    const commLogs = (this._parCommLog || []).filter(c => c['\u05D4\u05D5\u05E8\u05D4_id'] == id);
    const meetings = (this._parMeetings || []).filter(m => m['\u05D4\u05D5\u05E8\u05D4_id'] == id);
    const phone = p['\u05D8\u05DC\u05E4\u05D5\u05DF'] || '';
    const cleanPhone = phone.replace(/[-\s]/g, '').replace(/^0/, '972');
    const statusBadge = (p['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '\u05E4\u05E2\u05D9\u05DC') === '\u05E4\u05E2\u05D9\u05DC'
      ? '<span class="badge bg-success fs-6">\u05E4\u05E2\u05D9\u05DC</span>'
      : '<span class="badge bg-secondary fs-6">\u05DC\u05D0 \u05E4\u05E2\u05D9\u05DC</span>';

    const channelIcon = (ch) => {
      if (ch === 'phone') return '<i class="bi bi-telephone text-success"></i>';
      if (ch === 'email') return '<i class="bi bi-envelope text-info"></i>';
      if (ch === 'sms') return '<i class="bi bi-chat-left-text text-primary"></i>';
      return '<i class="bi bi-chat-dots text-secondary"></i>';
    };

    document.getElementById('parent-card-content').innerHTML = `
      <a href="#parents" class="btn btn-link text-decoration-none mb-3"><i class="bi bi-arrow-right me-1"></i>\u05D7\u05D6\u05E8\u05D4 \u05DC\u05E8\u05E9\u05D9\u05DE\u05EA \u05D4\u05D5\u05E8\u05D9\u05DD</a>

      <!-- Profile Header -->
      <div class="card p-4 mb-3 shadow-sm">
        <div class="d-flex align-items-center gap-3 mb-3">
          ${Utils.avatarHTML ? Utils.avatarHTML(p['\u05E9\u05DD'], 'lg') : ''}
          <div class="flex-fill">
            <h3 class="fw-bold mb-1">${p['\u05E9\u05DD'] || ''}</h3>
            <div class="d-flex align-items-center gap-2 flex-wrap">
              <span class="badge bg-${p['\u05E7\u05E9\u05E8'] === '\u05D0\u05DD' ? 'danger' : 'primary'}">${p['\u05E7\u05E9\u05E8'] || ''}</span>
              ${statusBadge}
              ${family ? `<span class="badge bg-info bg-opacity-10 text-info">\u05DE\u05E9\u05E4\u05D7\u05EA ${family}</span>` : ''}
            </div>
          </div>
          <div class="d-flex gap-2">
            ${phone ? `<a href="tel:${phone}" class="btn btn-outline-primary"><i class="bi bi-telephone me-1"></i>\u05D7\u05D9\u05D9\u05D2</a>` : ''}
            ${phone ? `<a href="sms:${phone.replace(/[-\s]/g,'')}" class="btn btn-success"><i class="bi bi-chat-left-text me-1"></i>SMS</a>` : ''}
            <button class="btn btn-outline-primary" onclick="Pages.editParent('${id}')"><i class="bi bi-pencil me-1"></i>\u05E2\u05E8\u05D9\u05DB\u05D4</button>
          </div>
        </div>

        <div class="row g-3">
          <div class="col-sm-4"><label class="form-label text-muted small">\u05D8\u05DC\u05E4\u05D5\u05DF</label><div class="fw-bold" dir="ltr">${Utils.formatPhone ? Utils.formatPhone(phone) : phone || '--'}</div></div>
          <div class="col-sm-4"><label class="form-label text-muted small">\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC</label><div class="fw-bold">${p['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC'] || '--'}</div></div>
          <div class="col-sm-4"><label class="form-label text-muted small">\u05DB\u05EA\u05D5\u05D1\u05EA</label><div class="fw-bold">${p['\u05DB\u05EA\u05D5\u05D1\u05EA'] || '--'}</div></div>
        </div>
        ${p['\u05D4\u05E2\u05E8\u05D5\u05EA'] ? `<div class="mt-3 p-2 bg-light rounded"><small class="text-muted">\u05D4\u05E2\u05E8\u05D5\u05EA:</small> ${p['\u05D4\u05E2\u05E8\u05D5\u05EA']}</div>` : ''}
      </div>

      <div class="row g-3">
        <!-- Children -->
        <div class="col-md-6">
          <div class="card p-3 h-100 shadow-sm">
            <h6 class="fw-bold mb-3"><i class="bi bi-mortarboard me-2 text-success"></i>\u05D9\u05DC\u05D3\u05D9\u05DD (${children.length})</h6>
            ${children.length ? children.map(c => `
              <div class="d-flex align-items-center gap-2 mb-2 p-2 border rounded bg-light">
                ${Utils.avatarHTML ? Utils.avatarHTML(c['\u05E9\u05DD'], 'sm') : ''}
                <div>
                  <div class="fw-bold">${c['\u05E9\u05DD']}</div>
                  <small class="text-muted">\u05DB\u05D9\u05EA\u05D4 ${c['\u05DB\u05D9\u05EA\u05D4'] || ''}</small>
                </div>
              </div>`).join('') : '<div class="text-muted">\u05D0\u05D9\u05DF \u05D9\u05DC\u05D3\u05D9\u05DD \u05DE\u05E9\u05D5\u05D9\u05DB\u05D9\u05DD</div>'}
          </div>
        </div>

        <!-- Family members -->
        <div class="col-md-6">
          <div class="card p-3 h-100 shadow-sm">
            <h6 class="fw-bold mb-3"><i class="bi bi-house-heart me-2 text-primary"></i>\u05D1\u05E0\u05D9 \u05DE\u05E9\u05E4\u05D7\u05D4</h6>
            ${familyParents.length ? familyParents.map(fp => `
              <div class="d-flex align-items-center gap-2 mb-2 p-2 border rounded bg-light">
                ${Utils.avatarHTML ? Utils.avatarHTML(fp['\u05E9\u05DD'], 'sm') : ''}
                <div>
                  <div class="fw-bold">${fp['\u05E9\u05DD']}</div>
                  <span class="badge bg-${fp['\u05E7\u05E9\u05E8'] === '\u05D0\u05DD' ? 'danger' : 'primary'}" style="font-size:0.65rem">${fp['\u05E7\u05E9\u05E8']}</span>
                </div>
                <div class="ms-auto small text-muted" dir="ltr">${Utils.formatPhone ? Utils.formatPhone(fp['\u05D8\u05DC\u05E4\u05D5\u05DF']) : fp['\u05D8\u05DC\u05E4\u05D5\u05DF'] || ''}</div>
              </div>`).join('') : '<div class="text-muted">\u05D0\u05D9\u05DF \u05D1\u05E0\u05D9 \u05DE\u05E9\u05E4\u05D7\u05D4 \u05E0\u05D5\u05E1\u05E4\u05D9\u05DD</div>'}
          </div>
        </div>

        <!-- Communication Log -->
        <div class="col-md-6">
          <div class="card p-3 h-100 shadow-sm">
            <h6 class="fw-bold mb-3"><i class="bi bi-clock-history me-2 text-info"></i>\u05D9\u05D5\u05DE\u05DF \u05EA\u05E7\u05E9\u05D5\u05E8\u05EA (${commLogs.length})</h6>
            ${commLogs.length ? commLogs.map(l => `
              <div class="d-flex align-items-start gap-2 mb-2 pb-2 border-bottom">
                ${channelIcon(l['\u05D0\u05DE\u05E6\u05E2\u05D9'])}
                <div class="flex-fill">
                  <div class="small text-muted">${l['\u05EA\u05D0\u05E8\u05D9\u05DA']}</div>
                  <div class="small">${l['\u05EA\u05D5\u05DB\u05DF']}</div>
                </div>
              </div>`).join('') : '<div class="text-muted">\u05D0\u05D9\u05DF \u05D4\u05D9\u05E1\u05D8\u05D5\u05E8\u05D9\u05D4</div>'}
          </div>
        </div>

        <!-- Meetings -->
        <div class="col-md-6">
          <div class="card p-3 h-100 shadow-sm">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h6 class="fw-bold mb-0"><i class="bi bi-calendar-check me-2 text-warning"></i>\u05E4\u05D2\u05D9\u05E9\u05D5\u05EA (${meetings.length})</h6>
              <button class="btn btn-sm btn-outline-primary" onclick="Pages._parShowMeetingModal(${id})"><i class="bi bi-plus-lg"></i></button>
            </div>
            ${meetings.length ? meetings.map(m => {
              const mStatus = m['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D1\u05D5\u05E6\u05E2' ? 'success' : m['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D1\u05D5\u05D8\u05DC' ? 'danger' : 'warning';
              return `<div class="d-flex align-items-center gap-2 mb-2 p-2 border rounded bg-light">
                <i class="bi bi-calendar-event text-${mStatus}"></i>
                <div class="flex-fill">
                  <div class="fw-bold small">${m['\u05EA\u05D0\u05E8\u05D9\u05DA']} ${m['\u05E9\u05E2\u05D4']}</div>
                  <div class="small text-muted">${m['\u05E1\u05D9\u05D1\u05D4']}</div>
                </div>
                <span class="badge bg-${mStatus}">${m['\u05E1\u05D8\u05D8\u05D5\u05E1']}</span>
              </div>`;
            }).join('') : '<div class="text-muted">\u05D0\u05D9\u05DF \u05E4\u05D2\u05D9\u05E9\u05D5\u05EA</div>'}
          </div>
        </div>
      </div>
    `;
  },


  /* ======================================================================
     COMMUNICATIONS  (v5.4 — full upgrade)
     ====================================================================== */
  communications() {
    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div><h1><i class="bi bi-chat-dots me-2"></i>\u05EA\u05E7\u05E9\u05D5\u05E8\u05EA</h1><p class="text-muted mb-0">\u05E0\u05D9\u05D4\u05D5\u05DC \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA, \u05EA\u05D1\u05E0\u05D9\u05D5\u05EA \u05D5\u05E1\u05E4\u05E8 \u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8</p></div>
    </div>

    <!-- Stats Cards -->
    <div class="row g-3 mb-3" id="comm-stats-row"></div>

    <!-- Tabs -->
    <ul class="nav nav-tabs mb-3" id="comm-tabs">
      <li class="nav-item"><a class="nav-link active" href="#" data-comm-tab="compose" onclick="Pages._commTab='compose';Pages.renderComm();return false"><i class="bi bi-pencil-square me-1"></i>\u05D7\u05D9\u05D1\u05D5\u05E8</a></li>
      <li class="nav-item"><a class="nav-link" href="#" data-comm-tab="templates" onclick="Pages._commTab='templates';Pages.renderComm();return false"><i class="bi bi-telephone me-1"></i>\u05EA\u05D1\u05E0\u05D9\u05D5\u05EA</a></li>
      <li class="nav-item"><a class="nav-link" href="#" data-comm-tab="calllog" onclick="Pages._commTab='calllog';Pages.renderComm();return false"><i class="bi bi-journal-text me-1"></i>\u05D9\u05D5\u05DE\u05DF \u05E9\u05D9\u05D7\u05D5\u05EA</a></li>
      <li class="nav-item"><a class="nav-link" href="#" data-comm-tab="history" onclick="Pages._commTab='history';Pages.renderComm();return false"><i class="bi bi-clock-history me-1"></i>\u05D4\u05D9\u05E1\u05D8\u05D5\u05E8\u05D9\u05D4</a></li>
      <li class="nav-item"><a class="nav-link" href="#" data-comm-tab="contacts" onclick="Pages._commTab='contacts';Pages.renderComm();return false"><i class="bi bi-person-lines-fill me-1"></i>\u05E1\u05E4\u05E8 \u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8</a></li>
      <li class="nav-item"><a class="nav-link" href="#" data-comm-tab="protocols" onclick="Pages._commTab='protocols';Pages.renderComm();return false"><i class="bi bi-journal-bookmark me-1"></i>\u05E4\u05E8\u05D5\u05D8\u05D5\u05E7\u05D5\u05DC \u05E4\u05D2\u05D9\u05E9\u05D5\u05EA</a></li>
    </ul>
    <div id="comm-content">${Utils.skeleton(3)}</div>`;
  },

  /* --- Communication state --- */
  _commData: [],
  _commTab: 'compose',
  _commParents: [],
  _commStudents: [],
  _commClasses: [],
  _commSelectedClasses: new Set(),
  _commRecipientMode: 'class',   // 'class' | 'all' | 'individual'
  _commSelectedIndividuals: new Set(),
  _commDelivery: 'sms',     // 'sms' | 'phone' | 'email'
  _commContactSearch: '',
  _commHistorySearch: '',

  /* --- 7 Phone/SMS Templates --- */
  _phoneTemplates: [
    {title:'\u05D4\u05E2\u05D3\u05E8\u05D5\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3', icon:'bi-exclamation-triangle', color:'danger',
     text:'\u05E9\u05DC\u05D5\u05DD {\u05E9\u05DD_\u05D4\u05D5\u05E8\u05D4},\n\u05E8\u05E6\u05D9\u05E0\u05D5 \u05DC\u05E2\u05D3\u05DB\u05DF \u05E9\u05D1\u05E0\u05DB\u05DD {\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3} \u05DC\u05D0 \u05D4\u05D2\u05D9\u05E2 \u05D4\u05D9\u05D5\u05DD \u05DC\u05DE\u05D5\u05E1\u05D3.\n\u05E0\u05E9\u05DE\u05D7 \u05DC\u05D3\u05E2\u05EA \u05D0\u05DD \u05D4\u05DB\u05DC \u05D1\u05E1\u05D3\u05E8.\n\u05D1\u05D1\u05E8\u05DB\u05D4,\n\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3'},
    {title:'\u05EA\u05D6\u05DB\u05D5\u05E8\u05EA \u05EA\u05E9\u05DC\u05D5\u05DD', icon:'bi-cash-coin', color:'warning',
     text:'\u05E9\u05DC\u05D5\u05DD {\u05E9\u05DD_\u05D4\u05D5\u05E8\u05D4},\n\u05D6\u05D5\u05D4\u05D9 \u05EA\u05D6\u05DB\u05D5\u05E8\u05EA \u05E2\u05DC \u05EA\u05E9\u05DC\u05D5\u05DD \u05E9\u05DB\u05E8 \u05DC\u05D9\u05DE\u05D5\u05D3 \u05DC\u05D7\u05D5\u05D3\u05E9 \u05D4\u05E0\u05D5\u05DB\u05D7\u05D9.\n\u05E1\u05DB\u05D5\u05DD: {\u05E1\u05DB\u05D5\u05DD}\n\u05E0\u05D0 \u05DC\u05D4\u05E1\u05D3\u05D9\u05E8 \u05D1\u05D4\u05E7\u05D3\u05DD.\n\u05EA\u05D5\u05D3\u05D4,\n\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3'},
    {title:'\u05D4\u05D6\u05DE\u05E0\u05D4 \u05DC\u05E4\u05D2\u05D9\u05E9\u05D4', icon:'bi-calendar-event', color:'primary',
     text:'\u05E9\u05DC\u05D5\u05DD {\u05E9\u05DD_\u05D4\u05D5\u05E8\u05D4},\n\u05D4\u05E0\u05DA\u05DD \u05DE\u05D5\u05D6\u05DE\u05E0\u05D9\u05DD \u05DC\u05E4\u05D2\u05D9\u05E9\u05D4 \u05D1\u05DE\u05D5\u05E1\u05D3.\n\u05EA\u05D0\u05E8\u05D9\u05DA: {\u05EA\u05D0\u05E8\u05D9\u05DA}\n\u05E9\u05E2\u05D4: {\u05E9\u05E2\u05D4}\n\u05E0\u05D5\u05E9\u05D0: {\u05E0\u05D5\u05E9\u05D0}\n\u05E0\u05E9\u05DE\u05D7 \u05DC\u05E8\u05D0\u05D5\u05EA\u05DB\u05DD!\n\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3'},
    {title:'\u05EA\u05E2\u05D5\u05D3\u05EA \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD', icon:'bi-clipboard-data', color:'info',
     text:'\u05E9\u05DC\u05D5\u05DD {\u05E9\u05DD_\u05D4\u05D5\u05E8\u05D4},\n\u05EA\u05E2\u05D5\u05D3\u05EA \u05D4\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD \u05E2\u05D1\u05D5\u05E8 {\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3} \u05DE\u05D5\u05DB\u05E0\u05D4.\n\u05E0\u05D9\u05EA\u05DF \u05DC\u05E6\u05E4\u05D5\u05EA \u05D1\u05D4 \u05D1\u05DE\u05E2\u05E8\u05DB\u05EA.\n\u05D1\u05D1\u05E8\u05DB\u05D4,\n\u05E6\u05D5\u05D5\u05EA \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3'},
    {title:'\u05D0\u05D9\u05E8\u05D5\u05E2 / \u05D8\u05D9\u05D5\u05DC', icon:'bi-bus-front', color:'success',
     text:'\u05E9\u05DC\u05D5\u05DD \u05DC\u05D4\u05D5\u05E8\u05D9\u05DD,\n\u05DC\u05D9\u05D3\u05D9\u05E2\u05EA\u05DB\u05DD, \u05D0\u05D9\u05E8\u05D5\u05E2 \u05E7\u05E8\u05D5\u05D1 \u05D1\u05DE\u05D5\u05E1\u05D3:\n{\u05D0\u05D9\u05E8\u05D5\u05E2}\n\u05EA\u05D0\u05E8\u05D9\u05DA: {\u05EA\u05D0\u05E8\u05D9\u05DA}\n\u05E0\u05D0 \u05DC\u05DE\u05DC\u05D0 \u05D0\u05EA \u05D0\u05D9\u05E9\u05D5\u05E8 \u05D4\u05D4\u05D5\u05E8\u05D9\u05DD.\n\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3'},
    {title:'\u05D4\u05D5\u05D3\u05E2\u05EA \u05D7\u05D9\u05E8\u05D5\u05DD', icon:'bi-megaphone-fill', color:'danger',
     text:'\u05D4\u05D5\u05D3\u05E2\u05D4 \u05D3\u05D7\u05D5\u05E4\u05D4!\n\n{\u05D4\u05D5\u05D3\u05E2\u05D4}\n\n\u05DC\u05E4\u05E8\u05D8\u05D9\u05DD \u05E0\u05D0 \u05DC\u05D9\u05E6\u05D5\u05E8 \u05E7\u05E9\u05E8 \u05E2\u05DD \u05D4\u05DE\u05D5\u05E1\u05D3.\n\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3'},
    {title:'\u05D4\u05D5\u05D3\u05E2\u05D4 \u05D7\u05D5\u05E4\u05E9\u05D9\u05EA', icon:'bi-chat-text', color:'secondary',
     text:'\u05E9\u05DC\u05D5\u05DD \u05DC\u05D4\u05D5\u05E8\u05D9 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9 \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3,\n\n{\u05D4\u05D5\u05D3\u05E2\u05D4}\n\n\u05D1\u05D1\u05E8\u05DB\u05D4,\n\u05D4\u05E0\u05D4\u05DC\u05EA \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3'}
  ],

  /* --- Init --- */
  async communicationsInit() {
    const [commData, students, parents] = await Promise.all([
      App.getData('\u05EA\u05E7\u05E9\u05D5\u05E8\u05EA').catch(() => []),
      App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD').catch(() => []),
      App.getData('\u05D4\u05D5\u05E8\u05D9\u05DD').catch(() => [])
    ]);
    this._commData = commData || [];
    this._commStudents = students || [];
    this._commParents = parents || [];
    // Build class list
    const classSet = new Set();
    (students || []).forEach(s => { if (s['\u05DB\u05D9\u05EA\u05D4']) classSet.add(s['\u05DB\u05D9\u05EA\u05D4']); });
    this._commClasses = [...classSet].sort();
    this._commSelectedClasses = new Set();
    this._commSelectedIndividuals = new Set();
    this._commRecipientMode = 'class';
    this._commDelivery = 'sms';
    this._commContactSearch = '';
    this._commHistorySearch = '';
    this._commCallLog = [];
    this._commCallLogSearch = '';
    this._commTab = 'compose';
    this._renderCommStats();
    this.renderComm();
  },

  /* --- Stats cards --- */
  _renderCommStats() {
    const data = this._commData;
    const today = new Date();
    const todayStr = today.toLocaleDateString('he-IL');
    const weekAgo = new Date(today); weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date(today); monthAgo.setDate(monthAgo.getDate() - 30);

    const parseDate = (s) => {
      if (!s) return null;
      const p = s.split('/');
      if (p.length === 3) return new Date(+p[2], +p[1]-1, +p[0]);
      return new Date(s);
    };
    const sentToday = data.filter(r => r['\u05EA\u05D0\u05E8\u05D9\u05DA'] === todayStr).length;
    const sentWeek = data.filter(r => { const d = parseDate(r['\u05EA\u05D0\u05E8\u05D9\u05DA']); return d && d >= weekAgo; }).length;
    const sentMonth = data.filter(r => { const d = parseDate(r['\u05EA\u05D0\u05E8\u05D9\u05DA']); return d && d >= monthAgo; }).length;
    const readCount = data.filter(r => r['\u05E0\u05E7\u05E8\u05D0']).length;
    const responseRate = data.length ? Math.round(readCount / data.length * 100) : 0;

    const el = document.getElementById('comm-stats-row');
    if (!el) return;
    el.innerHTML = `
      <div class="col-6 col-md-3"><div class="card p-3 text-center border-start border-4 border-primary">
        <div class="fs-3 fw-bold text-primary">${sentToday}</div>
        <div class="small text-muted">\u05E0\u05E9\u05DC\u05D7\u05D5 \u05D4\u05D9\u05D5\u05DD</div>
      </div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center border-start border-4 border-success">
        <div class="fs-3 fw-bold text-success">${sentWeek}</div>
        <div class="small text-muted">\u05D4\u05E9\u05D1\u05D5\u05E2</div>
      </div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center border-start border-4 border-info">
        <div class="fs-3 fw-bold text-info">${sentMonth}</div>
        <div class="small text-muted">\u05D4\u05D7\u05D5\u05D3\u05E9</div>
      </div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center border-start border-4 border-warning">
        <div class="fs-3 fw-bold text-warning">${responseRate}%</div>
        <div class="small text-muted">\u05D0\u05D7\u05D5\u05D6 \u05E7\u05E8\u05D9\u05D0\u05D4</div>
      </div></div>`;
  },

  /* --- Tab rendering --- */
  renderComm() {
    document.querySelectorAll('#comm-tabs .nav-link').forEach(a => {
      a.classList.toggle('active', a.dataset.commTab === this._commTab);
    });
    const el = document.getElementById('comm-content');
    // Show empty state only when there are no parents at all to communicate with
    if (!this._commParents.length) {
      el.innerHTML = '<div class="empty-state"><i class="bi bi-chat-dots"></i><h5>\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05E2\u05D3\u05D9\u05D9\u05DF \u2013 \u05D4\u05D5\u05E1\u05E3 \u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8 \u05E8\u05D0\u05E9\u05D5\u05DF</h5></div>';
      return;
    }
    if (this._commTab === 'compose') this._renderCommCompose(el);
    else if (this._commTab === 'templates') this._renderCommTemplates(el);
    else if (this._commTab === 'calllog') this._renderCommCallLog(el);
    else if (this._commTab === 'history') this._renderCommHistory(el);
    else if (this._commTab === 'contacts') this._renderCommContacts(el);
    else if (this._commTab === 'protocols') this._renderCommProtocols(el);
  },

  /* --- PROTOCOLS TAB (meeting protocols) --- */
  _commProtocols: null,
  _PROTOCOLS_LS_KEY: 'bht_meeting_protocols',

  _loadProtocols() {
    if (this._commProtocols) return this._commProtocols;
    try {
      var stored = localStorage.getItem(this._PROTOCOLS_LS_KEY);
      this._commProtocols = stored ? JSON.parse(stored) : [];
    } catch(e) { this._commProtocols = []; }
    return this._commProtocols;
  },

  _saveProtocols() {
    Utils.safeSetItem(this._PROTOCOLS_LS_KEY, JSON.stringify(this._commProtocols || []));
  },

  _renderCommProtocols(el) {
    var protocols = this._loadProtocols();
    var rows = protocols.sort(function(a,b){ return (b.date||'').localeCompare(a.date||''); }).map(function(p, i){
      return '<div class="card mb-2 p-3">' +
        '<div class="d-flex justify-content-between align-items-start">' +
          '<div>' +
            '<h6 class="fw-bold mb-1"><i class="bi bi-journal-bookmark me-1 text-primary"></i>' + (p.date || '') + '</h6>' +
            '<div class="small text-muted mb-1"><i class="bi bi-people me-1"></i>\u05DE\u05E9\u05EA\u05EA\u05E4\u05D9\u05DD: ' + (p.participants || '-') + '</div>' +
            '<div class="small mb-1"><strong>\u05E0\u05D5\u05E9\u05D0\u05D9\u05DD:</strong> ' + (p.topics || '-') + '</div>' +
            '<div class="small"><strong>\u05D4\u05D7\u05DC\u05D8\u05D5\u05EA:</strong> ' + (p.decisions || '-') + '</div>' +
          '</div>' +
          '<button class="btn btn-outline-danger btn-sm" onclick="Pages._deleteProtocol(' + i + ')" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button>' +
        '</div></div>';
    }).join('');

    el.innerHTML = '<div class="d-flex justify-content-between align-items-center mb-3">' +
      '<h5 class="mb-0"><i class="bi bi-journal-bookmark me-2"></i>\u05E4\u05E8\u05D5\u05D8\u05D5\u05E7\u05D5\u05DC \u05E4\u05D2\u05D9\u05E9\u05D5\u05EA (' + protocols.length + ')</h5>' +
      '<button class="btn btn-primary btn-sm" onclick="Pages._showProtocolModal()"><i class="bi bi-plus-lg me-1"></i>\u05D4\u05D5\u05E1\u05E3 \u05E4\u05E8\u05D5\u05D8\u05D5\u05E7\u05D5\u05DC</button>' +
    '</div>' +
    (rows || '<div class="text-center py-5 text-muted"><i class="bi bi-journal-bookmark fs-1 d-block mb-2"></i>\u05D0\u05D9\u05DF \u05E4\u05E8\u05D5\u05D8\u05D5\u05E7\u05D5\u05DC\u05D9\u05DD \u05E2\u05D3\u05D9\u05D9\u05DF</div>') +
    '<!-- Protocol Modal -->' +
    '<div class="modal fade" id="protocol-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">' +
      '<div class="modal-header"><h5 class="modal-title"><i class="bi bi-journal-bookmark me-2"></i>\u05E4\u05E8\u05D5\u05D8\u05D5\u05E7\u05D5\u05DC \u05D7\u05D3\u05E9</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>' +
      '<div class="modal-body"><div class="row g-3">' +
        '<div class="col-12"><label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA</label><input class="form-control" id="proto-date" type="date"></div>' +
        '<div class="col-12"><label class="form-label">\u05DE\u05E9\u05EA\u05EA\u05E4\u05D9\u05DD</label><input class="form-control" id="proto-participants" placeholder="\u05E9\u05DE\u05D5\u05EA \u05DE\u05D5\u05E4\u05E8\u05D3\u05D9\u05DD \u05D1\u05E4\u05E1\u05D9\u05E7\u05D9\u05DD"></div>' +
        '<div class="col-12"><label class="form-label">\u05E0\u05D5\u05E9\u05D0\u05D9\u05DD \u05E9\u05E0\u05D3\u05D5\u05E0\u05D5</label><textarea class="form-control" id="proto-topics" rows="3"></textarea></div>' +
        '<div class="col-12"><label class="form-label">\u05D4\u05D7\u05DC\u05D8\u05D5\u05EA</label><textarea class="form-control" id="proto-decisions" rows="3"></textarea></div>' +
      '</div></div>' +
      '<div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages._saveProtocol()"><i class="bi bi-check-lg me-1"></i>\u05E9\u05DE\u05D9\u05E8\u05D4</button></div>' +
    '</div></div></div>';
  },

  _showProtocolModal() {
    var el = document.getElementById('proto-date');
    if (el) el.value = new Date().toISOString().slice(0,10);
    var p = document.getElementById('proto-participants'); if(p) p.value = '';
    var t = document.getElementById('proto-topics'); if(t) t.value = '';
    var d = document.getElementById('proto-decisions'); if(d) d.value = '';
    new bootstrap.Modal(document.getElementById('protocol-modal')).show();
  },

  _saveProtocol() {
    var date = (document.getElementById('proto-date') || {}).value || '';
    var participants = (document.getElementById('proto-participants') || {}).value || '';
    var topics = (document.getElementById('proto-topics') || {}).value || '';
    var decisions = (document.getElementById('proto-decisions') || {}).value || '';
    if (!date) { Utils.toast('\u05E0\u05D0 \u05DC\u05D4\u05D6\u05D9\u05DF \u05EA\u05D0\u05E8\u05D9\u05DA', 'warning'); return; }
    this._loadProtocols();
    this._commProtocols.push({ date: date, participants: participants, topics: topics, decisions: decisions });
    this._saveProtocols();
    bootstrap.Modal.getInstance(document.getElementById('protocol-modal'))?.hide();
    Utils.toast('\u05E4\u05E8\u05D5\u05D8\u05D5\u05E7\u05D5\u05DC \u05E0\u05E9\u05DE\u05E8', 'success');
    this.renderComm();
  },

  _deleteProtocol(index) {
    this._loadProtocols();
    this._commProtocols.splice(index, 1);
    this._saveProtocols();
    Utils.toast('\u05E4\u05E8\u05D5\u05D8\u05D5\u05E7\u05D5\u05DC \u05E0\u05DE\u05D7\u05E7', 'success');
    this.renderComm();
  },

  /* --- COMPOSE TAB --- */
  _renderCommCompose(el) {
    const classChecks = this._commClasses.map(c => {
      const checked = this._commSelectedClasses.has(c) ? 'checked' : '';
      return `<div class="form-check form-check-inline">
        <input class="form-check-input comm-class-cb" type="checkbox" value="${c}" id="cc-${c}" ${checked} onchange="Pages._toggleCommClass('${c}')">
        <label class="form-check-label" for="cc-${c}">${c}</label>
      </div>`;
    }).join('');
    const allChecked = this._commSelectedClasses.size === this._commClasses.length && this._commClasses.length > 0 ? 'checked' : '';
    const contacts = this._commParents;
    const selectedCount = this._getCommRecipients().length;
    const msgVal = document.getElementById('comm-msg')?.value || '';
    const subjectVal = document.getElementById('comm-subject')?.value || '';

    el.innerHTML = `<div class="row g-3">
      <div class="col-lg-8">
        <div class="card p-3">
          <!-- Delivery method toggle -->
          <div class="mb-3">
            <label class="form-label fw-bold"><i class="bi bi-broadcast me-1"></i>\u05D0\u05DE\u05E6\u05E2\u05D9 \u05E9\u05DC\u05D9\u05D7\u05D4</label>
            <div class="btn-group w-100" role="group">
              <input type="radio" class="btn-check" name="comm-delivery" id="cd-sms" value="sms" ${this._commDelivery==='sms'?'checked':''} onchange="Pages._commDelivery='sms'">
              <label class="btn btn-outline-primary" for="cd-sms"><i class="bi bi-chat-left-text me-1"></i>SMS</label>
              <input type="radio" class="btn-check" name="comm-delivery" id="cd-phone" value="phone" ${this._commDelivery==='phone'?'checked':''} onchange="Pages._commDelivery='phone'">
              <label class="btn btn-outline-success" for="cd-phone"><i class="bi bi-telephone me-1"></i>\u05E9\u05D9\u05D7\u05D4 \u05D8\u05DC\u05E4\u05D5\u05E0\u05D9\u05EA</label>
              <input type="radio" class="btn-check" name="comm-delivery" id="cd-email" value="email" ${this._commDelivery==='email'?'checked':''} onchange="Pages._commDelivery='email'">
              <label class="btn btn-outline-info" for="cd-email"><i class="bi bi-envelope me-1"></i>\u05D3\u05D5\u05D0\u05E8</label>
            </div>
          </div>

          <!-- Recipient mode -->
          <div class="mb-3">
            <label class="form-label fw-bold"><i class="bi bi-people me-1"></i>\u05E0\u05DE\u05E2\u05E0\u05D9\u05DD</label>
            <div class="btn-group w-100 mb-2" role="group">
              <input type="radio" class="btn-check" name="comm-rmode" id="cr-class" value="class" ${this._commRecipientMode==='class'?'checked':''} onchange="Pages._commRecipientMode='class';Pages._renderCommCompose(document.getElementById('comm-content'))">
              <label class="btn btn-outline-secondary btn-sm" for="cr-class"><i class="bi bi-diagram-3 me-1"></i>\u05DC\u05E4\u05D9 \u05DB\u05D9\u05EA\u05D4</label>
              <input type="radio" class="btn-check" name="comm-rmode" id="cr-all" value="all" ${this._commRecipientMode==='all'?'checked':''} onchange="Pages._commRecipientMode='all';Pages._renderCommCompose(document.getElementById('comm-content'))">
              <label class="btn btn-outline-secondary btn-sm" for="cr-all"><i class="bi bi-people-fill me-1"></i>\u05DB\u05DC \u05D4\u05DE\u05D5\u05E1\u05D3</label>
              <input type="radio" class="btn-check" name="comm-rmode" id="cr-ind" value="individual" ${this._commRecipientMode==='individual'?'checked':''} onchange="Pages._commRecipientMode='individual';Pages._renderCommCompose(document.getElementById('comm-content'))">
              <label class="btn btn-outline-secondary btn-sm" for="cr-ind"><i class="bi bi-person me-1"></i>\u05D0\u05D9\u05E9\u05D9</label>
            </div>

            ${this._commRecipientMode === 'class' ? `
              <div class="p-2 border rounded bg-light">
                <div class="form-check form-check-inline border-end pe-3 me-3">
                  <input class="form-check-input" type="checkbox" id="cc-all" ${allChecked} onchange="Pages._toggleCommAll(this.checked)">
                  <label class="form-check-label fw-bold" for="cc-all">\u05D1\u05D7\u05E8 \u05D4\u05DB\u05DC</label>
                </div>
                ${classChecks}
              </div>` : ''}

            ${this._commRecipientMode === 'individual' ? `
              <div class="p-2 border rounded bg-light" style="max-height:200px;overflow-y:auto">
                ${contacts.map((p,i) => {
                  const name = p['\u05E9\u05DD'] || '';
                  const checked = this._commSelectedIndividuals.has(i) ? 'checked' : '';
                  return `<div class="form-check"><input class="form-check-input" type="checkbox" id="ci-${i}" ${checked} onchange="Pages._toggleCommIndividual(${i})"><label class="form-check-label" for="ci-${i}">${name} <small class="text-muted">(${p['\u05DB\u05D9\u05EA\u05D4']||''})</small></label></div>`;
                }).join('')}
              </div>` : ''}

            <div class="mt-2">
              <span class="badge bg-primary"><i class="bi bi-people-fill me-1"></i>${selectedCount} \u05E0\u05DE\u05E2\u05E0\u05D9\u05DD \u05E0\u05D1\u05D7\u05E8\u05D5</span>
            </div>
          </div>

          <!-- Subject -->
          <div class="mb-3">
            <label class="form-label fw-bold"><i class="bi bi-tag me-1"></i>\u05E0\u05D5\u05E9\u05D0</label>
            <input class="form-control" id="comm-subject" placeholder="\u05E0\u05D5\u05E9\u05D0 \u05D4\u05D4\u05D5\u05D3\u05E2\u05D4 (\u05D0\u05D5\u05E4\u05E6\u05D9\u05D5\u05E0\u05DC\u05D9)" value="${subjectVal}">
          </div>

          <!-- Message body -->
          <div class="mb-3">
            <label class="form-label fw-bold"><i class="bi bi-chat-left-text me-1"></i>\u05D4\u05D5\u05D3\u05E2\u05D4</label>
            <textarea class="form-control" id="comm-msg" rows="8" placeholder="\u05D4\u05E7\u05DC\u05D3 \u05D4\u05D5\u05D3\u05E2\u05D4 \u05DB\u05D0\u05DF..." oninput="Pages._updateCommCharCount()" style="font-size:1rem;line-height:1.6">${msgVal}</textarea>
            <div class="d-flex justify-content-between mt-1">
              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-outline-secondary" onclick="Pages._commInsertVar('{\\u05E9\\u05DD_\\u05D4\\u05D5\\u05E8\\u05D4}')" title="\u05D4\u05DB\u05E0\u05E1 \u05E9\u05DD \u05D4\u05D5\u05E8\u05D4"><i class="bi bi-braces"></i> \u05E9\u05DD</button>
                <button class="btn btn-sm btn-outline-secondary" onclick="Pages._commInsertVar('{\\u05E9\\u05DD_\\u05EA\\u05DC\\u05DE\\u05D9\\u05D3}')" title="\u05D4\u05DB\u05E0\u05E1 \u05E9\u05DD \u05EA\u05DC\u05DE\u05D9\u05D3"><i class="bi bi-braces"></i> \u05EA\u05DC\u05DE\u05D9\u05D3</button>
              </div>
              <small class="text-muted" id="comm-char-count">${msgVal.length} \u05EA\u05D5\u05D5\u05D9\u05DD</small>
            </div>
          </div>

          <!-- Send button -->
          <div class="d-flex gap-2 flex-wrap">
            <button class="btn btn-success btn-lg" onclick="Pages.sendComm()">
              <i class="bi bi-send-fill me-1"></i>\u05E9\u05DC\u05D7 \u05D4\u05D5\u05D3\u05E2\u05D4
            </button>
            <button class="btn btn-outline-secondary" onclick="document.getElementById('comm-msg').value='';document.getElementById('comm-subject').value='';Pages._updateCommCharCount()">
              <i class="bi bi-eraser me-1"></i>\u05E0\u05E7\u05D4
            </button>
          </div>
        </div>
      </div>

      <!-- Quick templates sidebar -->
      <div class="col-lg-4">
        <div class="card p-3">
          <h6 class="fw-bold mb-3"><i class="bi bi-lightning me-1 text-warning"></i>\u05EA\u05D1\u05E0\u05D9\u05D5\u05EA \u05DE\u05D4\u05D9\u05E8\u05D5\u05EA</h6>
          <div class="d-grid gap-2">
            ${this._phoneTemplates.map((t,i) => `
              <button class="btn btn-outline-${t.color} btn-sm text-start" onclick="Pages._useCommTemplate(${i})">
                <i class="bi ${t.icon} me-1"></i>${t.title}
              </button>`).join('')}
          </div>
        </div>
      </div>
    </div>`;
  },

  /* --- TEMPLATES TAB --- */
  _renderCommTemplates(el) {
    const cards = this._phoneTemplates.map((t, i) => {
      const preview = t.text.replace(/\n/g, '<br>');
      return `<div class="col-md-6 col-lg-4">
        <div class="card h-100 border-0 shadow-sm border-top border-3 border-${t.color}">
          <div class="card-body">
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="badge bg-${t.color} bg-opacity-10 text-${t.color} p-2 rounded-circle">
                <i class="bi ${t.icon} fs-5"></i>
              </span>
              <h6 class="card-title mb-0 fw-bold">${t.title}</h6>
            </div>
            <div class="card-text small text-muted p-2 bg-light rounded" style="min-height:80px;max-height:140px;overflow-y:auto">${preview}</div>
          </div>
          <div class="card-footer bg-transparent border-0 pt-0 d-flex gap-2">
            <button class="btn btn-outline-primary btn-sm flex-fill" onclick="Pages._useCommTemplate(${i})"><i class="bi bi-pencil-square me-1"></i>\u05D4\u05E9\u05EA\u05DE\u05E9</button>
            <button class="btn btn-outline-secondary btn-sm" onclick="Pages._copyCommTemplate(${i})" title="\u05D4\u05E2\u05EA\u05E7"><i class="bi bi-clipboard"></i></button>
          </div>
        </div>
      </div>`;
    }).join('');
    el.innerHTML = `<div class="row g-3">${cards}</div>`;
  },

  /* --- CALL LOG TAB --- */
  _commCallLog: [],
  _commCallLogSearch: '',

  _renderCommCallLog(el) {
    const search = this._commCallLogSearch.toLowerCase();
    const logs = this._commCallLog || [];
    const filtered = search
      ? logs.filter(r => (r['\u05E0\u05DE\u05E2\u05E0\u05D9\u05DD']||'').toLowerCase().includes(search) || (r['\u05E0\u05D5\u05E9\u05D0']||'').toLowerCase().includes(search) || (r['\u05EA\u05E7\u05E6\u05D9\u05E8']||'').toLowerCase().includes(search))
      : logs;

    const statusBadge = (s) => {
      const map = {'\u05D1\u05D5\u05E6\u05E2': 'success', '\u05DC\u05D0 \u05E0\u05E2\u05E0\u05D4': 'danger', '\u05D7\u05D6\u05E8\u05D5 \u05D0\u05DC\u05D9': 'warning', '\u05D4\u05E9\u05D0\u05D9\u05E8\u05D5 \u05D4\u05D5\u05D3\u05E2\u05D4': 'info'};
      return `<span class="badge bg-${map[s]||'secondary'}">${s||'\u05DC\u05D0 \u05D9\u05D3\u05D5\u05E2'}</span>`;
    };

    const rows = filtered.map((r, i) => `<tr>
      <td>${i+1}</td>
      <td>${r['\u05EA\u05D0\u05E8\u05D9\u05DA']||''}</td>
      <td>${r['\u05E9\u05E2\u05D4']||''}</td>
      <td class="fw-bold">${r['\u05E0\u05DE\u05E2\u05E0\u05D9\u05DD']||''}</td>
      <td>${r['\u05E0\u05D5\u05E9\u05D0']||''}</td>
      <td class="small">${(r['\u05EA\u05E7\u05E6\u05D9\u05E8']||'').substring(0,60)}</td>
      <td>${statusBadge(r['\u05E1\u05D8\u05D8\u05D5\u05E1'])}</td>
      <td>
        <div class="btn-group btn-group-sm">
          <button class="btn btn-outline-warning" onclick="Pages._editCallLog(${i})" title="\u05E2\u05E8\u05D9\u05DB\u05D4"><i class="bi bi-pencil"></i></button>
          <button class="btn btn-outline-danger" onclick="Pages._deleteCallLog(${i})" title="\u05DE\u05D7\u05D9\u05E7\u05D4"><i class="bi bi-trash"></i></button>
        </div>
      </td>
    </tr>`).join('');

    el.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="fw-bold mb-0"><i class="bi bi-journal-text me-2"></i>\u05D9\u05D5\u05DE\u05DF \u05E9\u05D9\u05D7\u05D5\u05EA \u05D8\u05DC\u05E4\u05D5\u05E0\u05D9\u05D5\u05EA</h5>
        <button class="btn btn-primary btn-sm" onclick="Pages._addCallLog()"><i class="bi bi-plus-lg me-1"></i>\u05E8\u05D9\u05E9\u05D5\u05DD \u05E9\u05D9\u05D7\u05D4</button>
      </div>
      <div class="input-group input-group-sm mb-3" style="max-width:400px">
        <span class="input-group-text"><i class="bi bi-search"></i></span>
        <input type="text" class="form-control" id="calllog-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05D1\u05D9\u05D5\u05DE\u05DF..." value="${this._commCallLogSearch}" oninput="Pages._commCallLogSearch=this.value;Pages._renderCommCallLog(document.getElementById('comm-content'))">
      </div>
      ${!filtered.length ? '<div class="text-center text-muted py-5"><i class="bi bi-journal display-1"></i><h5 class="mt-3">\u05D0\u05D9\u05DF \u05E9\u05D9\u05D7\u05D5\u05EA \u05D1\u05D9\u05D5\u05DE\u05DF</h5><p>\u05DC\u05D7\u05E5 "\u05E8\u05D9\u05E9\u05D5\u05DD \u05E9\u05D9\u05D7\u05D4" \u05DC\u05D4\u05D5\u05E1\u05E4\u05EA \u05E8\u05E9\u05D5\u05DE\u05D4 \u05E8\u05D0\u05E9\u05D5\u05E0\u05D4</p></div>' : `
      <div class="card"><div class="table-responsive"><table class="table table-bht table-hover mb-0">
        <thead><tr><th>#</th><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05E9\u05E2\u05D4</th><th>\u05E9\u05DD</th><th>\u05E0\u05D5\u05E9\u05D0</th><th>\u05EA\u05E7\u05E6\u05D9\u05E8</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th><th>\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA</th></tr></thead>
        <tbody>${rows}</tbody></table></div></div>`}
      <div class="text-muted small mt-2">${filtered.length} \u05E9\u05D9\u05D7\u05D5\u05EA \u05D1\u05D9\u05D5\u05DE\u05DF</div>`;
  },

  _addCallLog() {
    const nEl = document.getElementById('ncl-name');
    const sEl = document.getElementById('ncl-subject');
    const smEl = document.getElementById('ncl-summary');
    if (nEl) nEl.value = '';
    if (sEl) sEl.value = '';
    if (smEl) smEl.value = '';
    new bootstrap.Modal(document.getElementById('comm-new-call-modal')).show();
  },

  _saveNewCallLog() {
    const name = (document.getElementById('ncl-name')?.value || '').trim();
    if (!name) { Utils.toast('\u05E9\u05DD \u05D4\u05E0\u05DE\u05E2\u05DF \u05D4\u05D5\u05D0 \u05E9\u05D3\u05D4 \u05D7\u05D5\u05D1\u05D4', 'warning'); return; }
    const subject = (document.getElementById('ncl-subject')?.value || '').trim();
    const summary = (document.getElementById('ncl-summary')?.value || '').trim();
    bootstrap.Modal.getInstance(document.getElementById('comm-new-call-modal'))?.hide();
    const now = new Date();
    this._commCallLog.unshift({
      '\u05EA\u05D0\u05E8\u05D9\u05DA': now.toLocaleDateString('he-IL'),
      '\u05E9\u05E2\u05D4': now.toLocaleTimeString('he-IL', {hour:'2-digit',minute:'2-digit'}),
      '\u05E0\u05DE\u05E2\u05E0\u05D9\u05DD': name,
      '\u05E0\u05D5\u05E9\u05D0': subject,
      '\u05EA\u05E7\u05E6\u05D9\u05E8': summary,
      '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05D1\u05D5\u05E6\u05E2'
    });
    Utils.toast('\u05E9\u05D9\u05D7\u05D4 \u05E0\u05E8\u05E9\u05DE\u05D4 \u05D1\u05D9\u05D5\u05DE\u05DF', 'success');
    this._renderCommCallLog(document.getElementById('comm-content'));
  },

  _editCallLog(idx) {
    const log = this._commCallLog[idx];
    if (!log) return;
    this._editCallLogIdx = idx;
    const statusEl = document.getElementById('ecl-status');
    const summaryEl = document.getElementById('ecl-summary');
    if (statusEl) statusEl.value = log['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '\u05D1\u05D5\u05E6\u05E2';
    if (summaryEl) summaryEl.value = log['\u05EA\u05E7\u05E6\u05D9\u05E8'] || '';
    new bootstrap.Modal(document.getElementById('comm-edit-call-modal')).show();
  },

  _saveEditCallLog() {
    const idx = this._editCallLogIdx;
    const log = this._commCallLog[idx];
    if (!log) return;
    const status = (document.getElementById('ecl-status')?.value || '').trim();
    const summary = (document.getElementById('ecl-summary')?.value || '').trim();
    if (status) log['\u05E1\u05D8\u05D8\u05D5\u05E1'] = status;
    log['\u05EA\u05E7\u05E6\u05D9\u05E8'] = summary;
    bootstrap.Modal.getInstance(document.getElementById('comm-edit-call-modal'))?.hide();
    Utils.toast('\u05E8\u05E9\u05D5\u05DE\u05D4 \u05E2\u05D5\u05D3\u05DB\u05E0\u05D4', 'success');
    this._renderCommCallLog(document.getElementById('comm-content'));
  },

  async _deleteCallLog(idx) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05EA \u05E8\u05E9\u05D5\u05DE\u05D4', '\u05DC\u05DE\u05D7\u05D5\u05E7 \u05E8\u05E9\u05D5\u05DE\u05D4 \u05D6\u05D5?')) return;
    this._commCallLog.splice(idx, 1);
    Utils.toast('\u05E8\u05E9\u05D5\u05DE\u05D4 \u05E0\u05DE\u05D7\u05E7\u05D4', 'success');
    this._renderCommCallLog(document.getElementById('comm-content'));
  },

  /* --- HISTORY TAB --- */
  _renderCommHistory(el) {
    const search = this._commHistorySearch.toLowerCase();
    const filtered = search
      ? this._commData.filter(r => (r['\u05E0\u05DE\u05E2\u05E0\u05D9\u05DD']||'').toLowerCase().includes(search) || (r['\u05D4\u05D5\u05D3\u05E2\u05D4']||'').toLowerCase().includes(search) || (r['\u05E0\u05D5\u05E9\u05D0']||'').toLowerCase().includes(search))
      : this._commData;

    if (!this._commData.length) {
      el.innerHTML = '<div class="empty-state"><i class="bi bi-chat-dots"></i><h5>\u05D0\u05D9\u05DF \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05E9\u05E0\u05E9\u05DC\u05D7\u05D5</h5><p class="text-muted">\u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05E9\u05EA\u05E9\u05DC\u05D7\u05D5 \u05D9\u05D5\u05E4\u05D9\u05E2\u05D5 \u05DB\u05D0\u05DF</p></div>';
      return;
    }

    const deliveryIcon = (m) => {
      const d = m['\u05D0\u05DE\u05E6\u05E2\u05D9'] || 'sms';
      if (d === 'sms') return '<i class="bi bi-chat-left-text text-primary" title="SMS"></i>';
      if (d === 'email') return '<i class="bi bi-envelope text-info" title="\u05D3\u05D5\u05D0\u05E8"></i>';
      if (d === 'phone') return '<i class="bi bi-telephone text-success" title="\u05D8\u05DC\u05E4\u05D5\u05DF"></i>';
      return '<i class="bi bi-telephone text-success" title="\u05D8\u05DC\u05E4\u05D5\u05DF"></i>';
    };

    const rows = filtered.map(r => {
      const status = r['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '\u05D8\u05D9\u05D5\u05D8\u05D4';
      const badgeClass = status === '\u05E0\u05E9\u05DC\u05D7' ? 'success' : 'secondary';
      const read = r['\u05E0\u05E7\u05E8\u05D0'] ? '<i class="bi bi-check2-all text-primary" title="\u05E0\u05E7\u05E8\u05D0"></i>' : '<i class="bi bi-check2 text-muted" title="\u05DC\u05D0 \u05E0\u05E7\u05E8\u05D0"></i>';
      return `<tr>
        <td class="text-nowrap">${r['\u05EA\u05D0\u05E8\u05D9\u05DA'] || ''}</td>
        <td>${r['\u05E0\u05DE\u05E2\u05E0\u05D9\u05DD'] || ''}</td>
        <td class="fw-bold">${r['\u05E0\u05D5\u05E9\u05D0'] || ''}</td>
        <td class="small text-truncate" style="max-width:250px">${(r['\u05D4\u05D5\u05D3\u05E2\u05D4'] || '').substring(0, 80)}</td>
        <td class="text-center">${deliveryIcon(r)}</td>
        <td class="text-center">${read}</td>
        <td><span class="badge bg-${badgeClass}">${status}</span></td>
      </tr>`;
    }).join('');

    el.innerHTML = `
      <div class="card p-3 mb-3">
        <div class="search-box"><i class="bi bi-search"></i>
          <input type="text" class="form-control" id="comm-history-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05D1\u05D4\u05D9\u05E1\u05D8\u05D5\u05E8\u05D9\u05D4..." value="${this._commHistorySearch}" oninput="Pages._commHistorySearch=this.value;Pages._renderCommHistory(document.getElementById('comm-content'))">
        </div>
      </div>
      <div class="card"><div class="table-responsive"><table class="table table-bht table-hover mb-0">
        <thead><tr><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05E0\u05DE\u05E2\u05E0\u05D9\u05DD</th><th>\u05E0\u05D5\u05E9\u05D0</th><th>\u05EA\u05D5\u05DB\u05DF</th><th>\u05D0\u05DE\u05E6\u05E2\u05D9</th><th>\u05E0\u05E7\u05E8\u05D0</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th></tr></thead>
        <tbody>${rows}</tbody></table></div></div>
      <div class="mt-2 text-muted small">\u05DE\u05E6\u05D9\u05D2 ${filtered.length} \u05DE\u05EA\u05D5\u05DA ${this._commData.length} \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA</div>`;
  },

  /* --- CONTACTS TAB --- */
  _renderCommContacts(el) {
    const search = this._commContactSearch.toLowerCase();
    const contacts = this._commParents;
    const filtered = search
      ? contacts.filter(p => (p['\u05E9\u05DD']||'').toLowerCase().includes(search) || (p['\u05D8\u05DC\u05E4\u05D5\u05DF']||'').includes(search) || (p['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC']||'').toLowerCase().includes(search) || (p['\u05EA\u05DC\u05DE\u05D9\u05D3']||'').toLowerCase().includes(search))
      : contacts;

    const rows = filtered.map(p => {
      const phone = p['\u05D8\u05DC\u05E4\u05D5\u05DF'] || '';
      const cleanPhone = phone.replace(/[-\s]/g,'').replace(/^0/,'972');
      return `<tr>
        <td>${Utils.avatarHTML ? Utils.avatarHTML(p['\u05E9\u05DD'],'sm') : ''} <span class="fw-bold">${p['\u05E9\u05DD']||''}</span></td>
        <td><span class="badge bg-secondary">${p['\u05E7\u05E9\u05E8']||''}</span></td>
        <td>${p['\u05EA\u05DC\u05DE\u05D9\u05D3']||''}</td>
        <td>${p['\u05DB\u05D9\u05EA\u05D4']||''}</td>
        <td dir="ltr">${Utils.formatPhone ? Utils.formatPhone(phone) : phone}</td>
        <td class="small">${p['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC']||''}</td>
        <td class="text-nowrap">
          ${phone ? `<a href="tel:${phone}" class="btn btn-sm btn-outline-primary me-1" title="\u05D7\u05D9\u05D9\u05D2"><i class="bi bi-telephone"></i></a>` : ''}
          ${phone ? `<a href="sms:${phone}" class="btn btn-sm btn-outline-success me-1" title="SMS"><i class="bi bi-chat-left-text"></i></a>` : ''}
        </td>
      </tr>`;
    }).join('');

    el.innerHTML = `
      <div class="card p-3 mb-3">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div class="search-box flex-fill" style="max-width:400px"><i class="bi bi-search"></i>
            <input type="text" class="form-control" id="comm-contact-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05D0\u05D9\u05E9 \u05E7\u05E9\u05E8..." value="${this._commContactSearch}" oninput="Pages._commContactSearch=this.value;Pages._renderCommContacts(document.getElementById('comm-content'))">
          </div>
          <span class="badge bg-info">${filtered.length} \u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8</span>
        </div>
      </div>
      <div class="card"><div class="table-responsive"><table class="table table-bht table-hover mb-0">
        <thead><tr><th>\u05E9\u05DD</th><th>\u05E7\u05E9\u05E8</th><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th>\u05DB\u05D9\u05EA\u05D4</th><th>\u05D8\u05DC\u05E4\u05D5\u05DF</th><th>\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC</th><th>\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA</th></tr></thead>
        <tbody>${rows}</tbody></table></div></div>`;
  },

  /* --- Helper methods --- */
  _toggleCommClass(cls) {
    if (this._commSelectedClasses.has(cls)) this._commSelectedClasses.delete(cls);
    else this._commSelectedClasses.add(cls);
    this._renderCommCompose(document.getElementById('comm-content'));
  },
  _toggleCommAll(checked) {
    if (checked) this._commClasses.forEach(c => this._commSelectedClasses.add(c));
    else this._commSelectedClasses.clear();
    this._renderCommCompose(document.getElementById('comm-content'));
  },
  _toggleCommIndividual(idx) {
    if (this._commSelectedIndividuals.has(idx)) this._commSelectedIndividuals.delete(idx);
    else this._commSelectedIndividuals.add(idx);
    this._renderCommCompose(document.getElementById('comm-content'));
  },
  _getCommRecipients() {
    if (this._commRecipientMode === 'all') {
      return this._commParents.filter(p => p['\u05D8\u05DC\u05E4\u05D5\u05DF']).map(p => ({
        name: p['\u05E9\u05DD'] || '', phone: p['\u05D8\u05DC\u05E4\u05D5\u05DF'], email: p['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC'] || '', studentName: p['\u05EA\u05DC\u05DE\u05D9\u05D3'] || ''
      }));
    }
    if (this._commRecipientMode === 'individual') {
      return [...this._commSelectedIndividuals].map(i => this._commParents[i]).filter(p => p && p['\u05D8\u05DC\u05E4\u05D5\u05DF']).map(p => ({
        name: p['\u05E9\u05DD'] || '', phone: p['\u05D8\u05DC\u05E4\u05D5\u05DF'], email: p['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC'] || '', studentName: p['\u05EA\u05DC\u05DE\u05D9\u05D3'] || ''
      }));
    }
    // class mode
    if (!this._commSelectedClasses.size) return [];
    const studentIds = new Set();
    const studentNames = {};
    this._commStudents.forEach(s => {
      if (this._commSelectedClasses.has(s['\u05DB\u05D9\u05EA\u05D4'])) {
        const id = s['\u05DE\u05D6\u05D4\u05D4'] || s['\u05E9\u05DD'];
        studentIds.add(id);
        studentNames[id] = s['\u05E9\u05DD'];
      }
    });
    // Also match contacts by class
    const recipients = [];
    this._commParents.forEach(p => {
      const phone = p['\u05D8\u05DC\u05E4\u05D5\u05DF'];
      if (!phone) return;
      const studentRef = p['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3'] || p['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4'] || p['\u05EA\u05DC\u05DE\u05D9\u05D3'] || '';
      if (studentIds.has(studentRef) || studentIds.has(p['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3']) || this._commSelectedClasses.has(p['\u05DB\u05D9\u05EA\u05D4'])) {
        recipients.push({ name: p['\u05E9\u05DD'] || '', phone, email: p['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC'] || '', studentName: studentNames[studentRef] || p['\u05EA\u05DC\u05DE\u05D9\u05D3'] || '' });
      }
    });
    return recipients;
  },
  _updateCommCharCount() {
    const msg = document.getElementById('comm-msg')?.value || '';
    const counter = document.getElementById('comm-char-count');
    if (counter) counter.textContent = msg.length + ' \u05EA\u05D5\u05D5\u05D9\u05DD';
  },
  _commInsertVar(varName) {
    const ta = document.getElementById('comm-msg');
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const text = ta.value;
    ta.value = text.substring(0, start) + varName + text.substring(end);
    ta.selectionStart = ta.selectionEnd = start + varName.length;
    ta.focus();
    this._updateCommCharCount();
  },
  _useCommTemplate(idx) {
    const tpl = this._phoneTemplates[idx];
    if (!tpl) return;
    this._commTab = 'compose';
    this.renderComm();
    setTimeout(() => {
      const ta = document.getElementById('comm-msg');
      const subj = document.getElementById('comm-subject');
      if (ta) { ta.value = tpl.text; this._updateCommCharCount(); }
      if (subj) subj.value = tpl.title;
    }, 50);
  },
  _copyCommTemplate(idx) {
    const tpl = this._phoneTemplates[idx];
    if (!tpl) return;
    navigator.clipboard.writeText(tpl.text).then(() => {
      Utils.toast('\u05EA\u05D1\u05E0\u05D9\u05EA \u05D4\u05D5\u05E2\u05EA\u05E7\u05D4');
    }).catch(() => { Utils.toast('\u05DC\u05D0 \u05E0\u05D9\u05EA\u05DF \u05DC\u05D4\u05E2\u05EA\u05D9\u05E7', 'danger'); });
  },

  /* --- Send message --- */
  async sendComm() {
    if (!Utils.acquireLock('sendComm', 3000)) return;
    const msg = document.getElementById('comm-msg')?.value?.trim();
    if (!msg) { Utils.toast('\u05D4\u05E7\u05DC\u05D3 \u05D4\u05D5\u05D3\u05E2\u05D4', 'warning'); Utils.releaseLock('sendComm'); return; }
    const subject = document.getElementById('comm-subject')?.value?.trim() || '';
    const recipients = this._getCommRecipients();
    if (!recipients.length) { Utils.toast('\u05D0\u05D9\u05DF \u05E0\u05DE\u05E2\u05E0\u05D9\u05DD \u05E0\u05D1\u05D7\u05E8\u05D9\u05DD', 'warning'); Utils.releaseLock('sendComm'); return; }

    let sent = 0;
    const delivery = this._commDelivery;

    // Shabbat / Yom Tov guard for SMS/email (phone calls are immediate, no message body)
    const blockReason = Utils.shabbatBlock && Utils.shabbatBlock();
    if (blockReason && delivery !== 'phone') {
      const ok = await Utils.confirm('\u05D6\u05DE\u05DF \u05DC\u05D0 \u05E8\u05D2\u05D9\u05DC \u05DC\u05E9\u05DC\u05D9\u05D7\u05D4', `\u05DB\u05E2\u05EA ${blockReason}. \u05D4\u05D0\u05DD \u05D1\u05DB\u05DC \u05D6\u05D0\u05EA \u05DC\u05E9\u05DC\u05D5\u05D7 \u05E2\u05DB\u05E9\u05D9\u05D5?`);
      if (!ok) { Utils.releaseLock('sendComm'); return; }
    }

    if (delivery === 'phone') {
      // Phone call mode - open dialer for first recipient, log the call
      recipients.forEach(t => {
        const phone = t.phone.replace(/[-\s]/g, '');
        window.open(`tel:${phone}`, '_self');
        sent++;
      });
      // Log the call
      this._commCallLog.unshift({
        '\u05EA\u05D0\u05E8\u05D9\u05DA': new Date().toLocaleDateString('he-IL'),
        '\u05E9\u05E2\u05D4': new Date().toLocaleTimeString('he-IL', {hour:'2-digit',minute:'2-digit'}),
        '\u05E0\u05DE\u05E2\u05E0\u05D9\u05DD': recipients.map(r => r.name).join(', '),
        '\u05E0\u05D5\u05E9\u05D0': subject,
        '\u05EA\u05E7\u05E6\u05D9\u05E8': msg.substring(0, 200),
        '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05D1\u05D5\u05E6\u05E2'
      });
    } else if (delivery === 'sms') {
      recipients.forEach(t => {
        const phone = t.phone.replace(/[-\s]/g, '');
        // Personalize: replace {שם_הורה}/{שם_תלמיד}/{שם} placeholders per recipient
        const personalMsg = String(msg)
          .replace(/\{שם_הורה\}/g, t.name || '')
          .replace(/\{שם_תלמיד\}/g, t.studentName || '')
          .replace(/\{שם\}/g, t.name || '');
        window.open(`sms:${phone}?body=${encodeURIComponent(personalMsg)}`, '_blank');
        sent++;
      });
    } else if (delivery === 'email') {
      const emails = recipients.map(t => t.email).filter(Boolean);
      if (!emails.length) { Utils.toast('\u05D0\u05D9\u05DF \u05DB\u05EA\u05D5\u05D1\u05D5\u05EA \u05D0\u05D9\u05DE\u05D9\u05D9\u05DC \u05DC\u05E0\u05DE\u05E2\u05E0\u05D9\u05DD \u05D4\u05E0\u05D1\u05D7\u05E8\u05D9\u05DD', 'warning'); return; }
      const subjectEnc = encodeURIComponent(subject || '\u05D4\u05D5\u05D3\u05E2\u05D4 \u05DE\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3');
      window.open(`mailto:${emails.join(',')}?subject=${subjectEnc}&body=${encodeURIComponent(msg)}`, '_blank');
      sent = emails.length;
    }

    // Determine recipient label
    let recipientStr;
    if (this._commRecipientMode === 'all') recipientStr = '\u05DB\u05DC \u05D4\u05D4\u05D5\u05E8\u05D9\u05DD';
    else if (this._commRecipientMode === 'individual') recipientStr = recipients.map(r => r.name).join(', ');
    else recipientStr = this._commSelectedClasses.size ? [...this._commSelectedClasses].join(', ') : '\u05DB\u05DC \u05D4\u05D4\u05D5\u05E8\u05D9\u05DD';

    // Save to history
    const now = new Date();
    const dateStr = now.toLocaleDateString('he-IL');
    const record = {
      '\u05EA\u05D0\u05E8\u05D9\u05DA': dateStr,
      '\u05E0\u05DE\u05E2\u05E0\u05D9\u05DD': recipientStr,
      '\u05E0\u05D5\u05E9\u05D0': subject,
      '\u05D4\u05D5\u05D3\u05E2\u05D4': msg.substring(0, 200),
      '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E0\u05E9\u05DC\u05D7',
      '\u05D0\u05DE\u05E6\u05E2\u05D9': delivery,
      '\u05E0\u05E7\u05E8\u05D0': false
    };
    try {
      await App.apiCall('add', '\u05EA\u05E7\u05E9\u05D5\u05E8\u05EA', record);
    } catch(e) { /* silent */ }
    this._commData.unshift(record);
    this._renderCommStats();
    Utils.toast(`${sent} \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05E0\u05E9\u05DC\u05D7\u05D5 \u05D1${delivery === 'phone' ? '\u05D8\u05DC\u05E4\u05D5\u05DF' : delivery === 'sms' ? 'SMS' : '\u05D3\u05D5\u05D0\u05E8'}`);
    Utils.releaseLock('sendComm');
  },


  /* ======================================================================
     AI ASSISTANT — Comprehensive Chat Interface
     ====================================================================== */
  ai_assistant() {
    const chips = [
      {text:'\u05DB\u05DE\u05D4 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05D9\u05E9?', icon:'bi-people', color:'primary'},
      {text:'\u05DE\u05D9 \u05E0\u05E2\u05D3\u05E8 \u05D4\u05D9\u05D5\u05DD?', icon:'bi-person-x', color:'danger'},
      {text:'\u05E1\u05D8\u05D8\u05D5\u05E1 \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD', icon:'bi-cash-coin', color:'success'},
      {text:'\u05E6\u05D9\u05D5\u05E0\u05D9 \u05DB\u05D9\u05EA\u05D4 \u05D0', icon:'bi-mortarboard', color:'info'},
      {text:'\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA \u05E4\u05EA\u05D5\u05D7\u05D5\u05EA', icon:'bi-list-task', color:'warning'},
      {text:'\u05D0\u05D9\u05E8\u05D5\u05E2\u05D9\u05DD \u05D4\u05E9\u05D1\u05D5\u05E2', icon:'bi-calendar-event', color:'secondary'},
      {text:'\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05D1\u05E1\u05D9\u05DB\u05D5\u05DF', icon:'bi-exclamation-triangle', color:'danger'},
      {text:'\u05E1\u05D9\u05DB\u05D5\u05DD \u05D9\u05D5\u05DE\u05D9', icon:'bi-clipboard-data', color:'primary'}
    ];
    const chipsHtml = chips.map(c =>
      `<button class="btn btn-outline-${c.color} btn-sm rounded-pill px-3 py-1" onclick="Pages.askSample('${c.text}')"><i class="bi ${c.icon} me-1"></i>${c.text}</button>`
    ).join('');

    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div>
        <h1><i class="bi bi-robot me-2"></i>\u05E2\u05D5\u05D6\u05E8 \u05D7\u05DB\u05DD</h1>
        <p class="text-muted mb-0">\u05E9\u05D0\u05DC \u05E9\u05D0\u05DC\u05D5\u05EA \u05E2\u05DC \u05D4\u05DE\u05D5\u05E1\u05D3, \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD, \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA, \u05DB\u05E1\u05E4\u05D9\u05DD \u05D5\u05E2\u05D5\u05D3</p>
      </div>
      <button class="btn btn-outline-danger btn-sm" onclick="Pages.clearAiChat()"><i class="bi bi-trash me-1"></i>\u05E0\u05E7\u05D4 \u05E9\u05D9\u05D7\u05D4</button>
    </div>

    <div class="card border-0 shadow-sm" style="display:flex;flex-direction:column;height:calc(100vh - 220px);min-height:500px">
      <!-- Chat messages area -->
      <div id="ai-chat" style="flex:1;overflow-y:auto;padding:1.25rem;background:var(--bht-body-bg)">
        <div id="ai-welcome" class="text-center py-5">
          <div class="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle mb-3" style="width:80px;height:80px">
            <i class="bi bi-robot fs-1 text-primary"></i>
          </div>
          <h4 class="fw-bold mb-2">\u05E9\u05DC\u05D5\u05DD! \u05D0\u05E0\u05D9 \u05D4\u05E2\u05D5\u05D6\u05E8 \u05D4\u05D7\u05DB\u05DD \u05E9\u05DC \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3</h4>
          <p class="text-muted mb-4">\u05E9\u05D0\u05DC \u05D0\u05D5\u05EA\u05D9 \u05DB\u05DC \u05E9\u05D0\u05DC\u05D4 \u05E2\u05DC \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA, \u05DB\u05E1\u05E4\u05D9\u05DD, \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD, \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD \u05D5\u05E2\u05D5\u05D3</p>
          <div class="d-flex flex-wrap justify-content-center gap-2 px-3" id="ai-chips">
            ${chipsHtml}
          </div>
        </div>
      </div>

      <!-- Input bar -->
      <div class="border-top p-3" style="background:var(--bht-card-bg)">
        <div class="input-group input-group-lg">
          <button class="btn btn-outline-secondary" id="ai-mic-btn" onclick="Pages.toggleAiMic()" title="\u05D4\u05E7\u05DC\u05D3\u05D4 \u05E7\u05D5\u05DC\u05D9\u05EA" aria-label="\u05D4\u05E7\u05DC\u05D3\u05D4 \u05E7\u05D5\u05DC\u05D9\u05EA"><i class="bi bi-mic" id="ai-mic-icon"></i></button>
          <input type="text" class="form-control" id="ai-input" placeholder="\u05D4\u05E7\u05DC\u05D3 \u05E9\u05D0\u05DC\u05D4..." onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();Pages.sendAi()}" style="font-size:1rem">
          <button class="btn btn-primary px-4" onclick="Pages.sendAi()" id="ai-send-btn"><i class="bi bi-send-fill"></i> \u05E9\u05DC\u05D7</button>
        </div>
      </div>
    </div>`;
  },

  _aiHistory: [],

  _aiFormatTime(date) {
    return date.toLocaleTimeString('he-IL', {hour:'2-digit', minute:'2-digit'});
  },

  _aiRenderBubble(role, text, time) {
    if (role === 'user') {
      return `<div class="d-flex justify-content-start mb-3 ai-msg-row">
        <div class="d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-circle flex-shrink-0 me-2" style="width:36px;height:36px;font-size:0.85rem"><i class="bi bi-person-fill"></i></div>
        <div>
          <div class="bg-primary text-white rounded-3 p-2 px-3 shadow-sm" style="max-width:min(80%,520px);border-bottom-right-radius:4px!important">${text}</div>
          <small class="text-muted d-block mt-1" style="font-size:0.7rem">${time}</small>
        </div>
      </div>`;
    }
    return `<div class="d-flex justify-content-end mb-3 ai-msg-row">
      <div class="order-1">
        <div class="bg-white border rounded-3 p-2 px-3 shadow-sm" style="max-width:min(85%,600px);border-bottom-left-radius:4px!important">${text}</div>
        <small class="text-muted d-block mt-1 text-end" style="font-size:0.7rem">${time}</small>
      </div>
      <div class="d-inline-flex align-items-center justify-content-center bg-info bg-opacity-10 text-info rounded-circle flex-shrink-0 ms-2 order-2" style="width:36px;height:36px;font-size:0.85rem"><i class="bi bi-robot"></i></div>
    </div>`;
  },

  _aiRenderAll() {
    const chat = document.getElementById('ai-chat');
    if (!chat) return;
    if (!this._aiHistory.length) {
      const welcome = document.getElementById('ai-welcome');
      if (!welcome) location.hash = '#ai_assistant';
      return;
    }
    chat.innerHTML = this._aiHistory.map(m => this._aiRenderBubble(m.role, m.text, m.time || '')).join('');
    chat.scrollTop = chat.scrollHeight;
  },

  ai_assistantInit() {
    document.getElementById('ai-input')?.focus();
    try {
      this._aiHistory = JSON.parse(localStorage.getItem('bht_ai_history') || '[]');
      if (this._aiHistory.length) {
        this._aiRenderAll();
      }
    } catch(e) { /* silent */ }
  },

  _aiSimulateTyping(finalHtml) {
    const chat = document.getElementById('ai-chat');
    if (!chat) return;
    const typingId = 'ai-typing-' + Date.now();
    chat.innerHTML += `<div class="d-flex justify-content-end mb-3" id="${typingId}">
      <div class="order-1">
        <div class="bg-white border rounded-3 p-2 px-3 shadow-sm" style="max-width:min(85%,600px)">
          <span class="ai-typing-dots"><span>.</span><span>.</span><span>.</span></span>
        </div>
      </div>
      <div class="d-inline-flex align-items-center justify-content-center bg-info bg-opacity-10 text-info rounded-circle flex-shrink-0 ms-2 order-2" style="width:36px;height:36px;font-size:0.85rem"><i class="bi bi-robot"></i></div>
    </div>`;
    chat.scrollTop = chat.scrollHeight;

    setTimeout(() => {
      const el = document.getElementById(typingId);
      const time = this._aiFormatTime(new Date());
      if (el) {
        el.outerHTML = this._aiRenderBubble('ai', finalHtml, time);
        this._aiHistory.push({role:'ai', text:finalHtml, time});
        sessionStorage.setItem('bht_ai_history', JSON.stringify(this._aiHistory));
        chat.scrollTop = chat.scrollHeight;
      }
    }, 1500);
  },

  askSample(q) {
    const input = document.getElementById('ai-input');
    if (input) input.value = q;
    this.sendAi();
  },

  toggleAiMic() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { Utils.toast('הדפדפן לא תומך בהקלטה קולית', 'warning'); return; }
    if (this._aiRec && this._aiRec._on) { this._aiRec.stop(); return; }
    const rec = new SR();
    rec.lang = 'he-IL'; rec.interimResults = true; rec.continuous = false;
    const input = document.getElementById('ai-input');
    const icon = document.getElementById('ai-mic-icon');
    rec.onstart = () => { rec._on = true; if (icon) { icon.classList.replace('bi-mic', 'bi-mic-fill'); icon.classList.add('text-danger'); } };
    rec.onresult = (e) => {
      let t = ''; for (const r of e.results) t += r[0].transcript;
      if (input) input.value = t;
      if (e.results[e.results.length - 1].isFinal) { rec.stop(); this.sendAi(); }
    };
    rec.onend = () => { rec._on = false; if (icon) { icon.classList.replace('bi-mic-fill', 'bi-mic'); icon.classList.remove('text-danger'); } };
    rec.onerror = () => { rec._on = false; Utils.toast('שגיאת מיקרופון — בדוק הרשאות', 'danger'); };
    this._aiRec = rec; rec.start();
  },

  clearAiChat() {
    this._aiHistory = [];
    sessionStorage.removeItem('bht_ai_history');
    const chat = document.getElementById('ai-chat');
    if (chat) {
      const chips = [
        {text:'\u05DB\u05DE\u05D4 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05D9\u05E9?', icon:'bi-people', color:'primary'},
        {text:'\u05DE\u05D9 \u05E0\u05E2\u05D3\u05E8 \u05D4\u05D9\u05D5\u05DD?', icon:'bi-person-x', color:'danger'},
        {text:'\u05E1\u05D8\u05D8\u05D5\u05E1 \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD', icon:'bi-cash-coin', color:'success'},
        {text:'\u05E6\u05D9\u05D5\u05E0\u05D9 \u05DB\u05D9\u05EA\u05D4 \u05D0', icon:'bi-mortarboard', color:'info'},
        {text:'\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA \u05E4\u05EA\u05D5\u05D7\u05D5\u05EA', icon:'bi-list-task', color:'warning'},
        {text:'\u05D0\u05D9\u05E8\u05D5\u05E2\u05D9\u05DD \u05D4\u05E9\u05D1\u05D5\u05E2', icon:'bi-calendar-event', color:'secondary'},
        {text:'\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05D1\u05E1\u05D9\u05DB\u05D5\u05DF', icon:'bi-exclamation-triangle', color:'danger'},
        {text:'\u05E1\u05D9\u05DB\u05D5\u05DD \u05D9\u05D5\u05DE\u05D9', icon:'bi-clipboard-data', color:'primary'}
      ];
      chat.innerHTML = `<div id="ai-welcome" class="text-center py-5">
        <div class="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle mb-3" style="width:80px;height:80px">
          <i class="bi bi-robot fs-1 text-primary"></i>
        </div>
        <h4 class="fw-bold mb-2">\u05E9\u05D9\u05D7\u05D4 \u05E0\u05D5\u05E7\u05EA\u05D4</h4>
        <p class="text-muted mb-4">\u05D0\u05E4\u05E9\u05E8 \u05DC\u05E9\u05D0\u05D5\u05DC \u05E9\u05D0\u05DC\u05D4 \u05D7\u05D3\u05E9\u05D4 \u05D0\u05D5 \u05DC\u05D1\u05D7\u05D5\u05E8 \u05DE\u05D4\u05D4\u05E6\u05E2\u05D5\u05EA</p>
        <div class="d-flex flex-wrap justify-content-center gap-2 px-3">
          ${chips.map(c => `<button class="btn btn-outline-${c.color} btn-sm rounded-pill px-3 py-1" onclick="Pages.askSample('${c.text}')"><i class="bi ${c.icon} me-1"></i>${c.text}</button>`).join('')}
        </div>
      </div>`;
    }
    Utils.toast('\u05D4\u05E9\u05D9\u05D7\u05D4 \u05E0\u05D5\u05E7\u05EA\u05D4', 'success');
  },

  async sendAi() {
    const input = document.getElementById('ai-input');
    const q = input?.value?.trim();
    if (!q) return;
    input.value = '';
    const chat = document.getElementById('ai-chat');
    if (!chat) return;

    // Remove welcome message if present
    const welcome = document.getElementById('ai-welcome');
    if (welcome) welcome.remove();

    // Add user message bubble
    const userTime = this._aiFormatTime(new Date());
    chat.innerHTML += this._aiRenderBubble('user', q, userTime);
    this._aiHistory.push({role:'user', text:q, time:userTime});
    sessionStorage.setItem('bht_ai_history', JSON.stringify(this._aiHistory));

    // Add typing indicator
    const loadingId = 'ai-loading-' + Date.now();
    chat.innerHTML += `<div class="d-flex justify-content-end mb-3" id="${loadingId}">
      <div class="order-1">
        <div class="bg-white border rounded-3 p-2 px-3 shadow-sm" style="max-width:min(85%,600px)">
          <span class="ai-typing-dots"><span>.</span><span>.</span><span>.</span></span>
        </div>
      </div>
      <div class="d-inline-flex align-items-center justify-content-center bg-info bg-opacity-10 text-info rounded-circle flex-shrink-0 ms-2 order-2" style="width:36px;height:36px;font-size:0.85rem"><i class="bi bi-robot"></i></div>
    </div>`;
    chat.scrollTop = chat.scrollHeight;

    // Disable send button
    const sendBtn = document.getElementById('ai-send-btn');
    if (sendBtn) { sendBtn.disabled = true; sendBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span>'; }

    try {
      // Build context from real data
      const [students, att, fin, beh, staff] = await Promise.all([
        App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD').catch(()=>[]),
        App.getData('\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA').catch(()=>[]),
        App.getData('\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3').catch(()=>[]),
        App.getData('\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA').catch(()=>[]),
        App.getData('\u05E6\u05D5\u05D5\u05EA').catch(()=>[])
      ]);

      const active = students.filter(s => (s['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') !== '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC');
      const todayAtt = att.filter(a => a['\u05EA\u05D0\u05E8\u05D9\u05DA'] === Utils.todayISO());
      const present = todayAtt.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E0\u05D5\u05DB\u05D7').length;
      const totalFin = fin.reduce((s,f) => s+(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0), 0);
      const paidFin = fin.filter(f => (f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05E9\u05D5\u05DC\u05DD').reduce((s,f) => s+(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0), 0);
      const posB = beh.filter(b => b['\u05E1\u05D5\u05D2']==='\u05D7\u05D9\u05D5\u05D1\u05D9').length;
      const negB = beh.filter(b => b['\u05E1\u05D5\u05D2']==='\u05E9\u05DC\u05D9\u05DC\u05D9').length;

      const context = '\u05D0\u05EA\u05D4 \u05E2\u05D5\u05D6\u05E8 AI \u05E9\u05DC \u05DE\u05D5\u05E1\u05D3 \u05D7\u05D9\u05E0\u05D5\u05DB\u05D9 "\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3". \u05E2\u05E0\u05D4 \u05D1\u05E2\u05D1\u05E8\u05D9\u05EA \u05D1\u05E6\u05D5\u05E8\u05D4 \u05DE\u05D5\u05E2\u05D9\u05DC\u05D4 \u05D5\u05EA\u05DE\u05E6\u05D9\u05EA\u05D9\u05EA.\n\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05E2\u05D3\u05DB\u05E0\u05D9\u05D9\u05DD:\n- ' + active.length + ' \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05E4\u05E2\u05D9\u05DC\u05D9\u05DD\n- ' + staff.length + ' \u05D0\u05E0\u05E9\u05D9 \u05E6\u05D5\u05D5\u05EA\n- \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D4\u05D9\u05D5\u05DD: ' + present + '/' + (todayAtt.length || active.length) + ' (' + (todayAtt.length ? Math.round(present/todayAtt.length*100) : 0) + '%)\n- \u05DB\u05E1\u05E4\u05D9\u05DD: \u05E1\u05D4"\u05DB ' + totalFin + ' \u05E9"\u05D7, \u05E0\u05D2\u05D1\u05D4 ' + paidFin + ' \u05E9"\u05D7, \u05D7\u05D5\u05D1 ' + (totalFin-paidFin) + ' \u05E9"\u05D7\n- \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA: ' + posB + ' \u05D7\u05D9\u05D5\u05D1\u05D9, ' + negB + ' \u05E9\u05DC\u05D9\u05DC\u05D9\n- \u05DB\u05D9\u05EA\u05D5\u05EA: ' + [...new Set(active.map(s=>s['\u05DB\u05D9\u05EA\u05D4']).filter(Boolean))].join(', ');

      // Call Gemini via App.geminiAsk (server-side proxy keeps key off-client)
      let response = null;
      try {
        response = await App.geminiAsk(
          context + '\n\n\u05E9\u05D0\u05DC\u05EA \u05D4\u05DE\u05E9\u05EA\u05DE\u05E9: ' + q,
          { temperature: 0.7, maxOutputTokens: 1024 }
        );
      } catch(e) {
        console.warn('geminiAsk failed:', e.message);
      }

      if (!response) response = '\u05DC\u05D0 \u05D4\u05E6\u05DC\u05D7\u05EA\u05D9 \u05DC\u05E7\u05D1\u05DC \u05EA\u05E9\u05D5\u05D1\u05D4. \u05E0\u05E1\u05D4 \u05E9\u05D5\u05D1.';

      // Format response (convert **bold** to <strong>, newlines to <br>)
      const formatted = response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
      const aiTime = this._aiFormatTime(new Date());

      const el = document.getElementById(loadingId);
      if (el) el.outerHTML = this._aiRenderBubble('ai', formatted, aiTime);

      this._aiHistory.push({role:'ai', text:formatted, time:aiTime});
      sessionStorage.setItem('bht_ai_history', JSON.stringify(this._aiHistory));
    } catch(e) {
      const aiTime = this._aiFormatTime(new Date());
      const el = document.getElementById(loadingId);
      if (el) el.outerHTML = this._aiRenderBubble('ai', '<span class="text-danger"><i class="bi bi-exclamation-circle me-1"></i>\u05E9\u05D2\u05D9\u05D0\u05D4: ' + (e.message || '\u05DC\u05D0 \u05E0\u05D9\u05EA\u05DF \u05DC\u05D4\u05EA\u05D7\u05D1\u05E8') + '</span>', aiTime);
    }

    // Re-enable send button
    if (sendBtn) { sendBtn.disabled = false; sendBtn.innerHTML = '<i class="bi bi-send-fill"></i> \u05E9\u05DC\u05D7'; }
    chat.scrollTop = chat.scrollHeight;
    input?.focus();
  },


  /* ======================================================================
     FORMS
     ====================================================================== */
  /* --- Form Builder State --- */
  _formsData: [],
  _formResponses: [],
  _formsTab: 'list',
  _editingForm: null,
  _formFields: [],
  _formColors: ['#4285f4','#34a853','#ea4335','#fbbc04','#673ab7','#ff6d00'],
  _fieldTypes: [
    {value:'text', label:'\u05D8\u05E7\u05E1\u05D8', icon:'bi-type'},
    {value:'textarea', label:'\u05D8\u05E7\u05E1\u05D8 \u05D0\u05E8\u05D5\u05DA', icon:'bi-text-paragraph'},
    {value:'select', label:'\u05D1\u05D7\u05D9\u05E8\u05D4', icon:'bi-list-ul'},
    {value:'checkbox', label:'\u05EA\u05D9\u05D1\u05EA \u05E1\u05D9\u05DE\u05D5\u05DF', icon:'bi-check-square'},
    {value:'date', label:'\u05EA\u05D0\u05E8\u05D9\u05DA', icon:'bi-calendar-date'},
    {value:'number', label:'\u05DE\u05E1\u05E4\u05E8', icon:'bi-123'},
    {value:'email', label:'\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC', icon:'bi-envelope'},
    {value:'phone', label:'\u05D8\u05DC\u05E4\u05D5\u05DF', icon:'bi-telephone'},
    {value:'rating', label:'\u05D3\u05D9\u05E8\u05D5\u05D2 1-5', icon:'bi-star'},
    {value:'yesno', label:'\u05DB\u05DF/\u05DC\u05D0', icon:'bi-toggle-on'}
  ],

  _builtInForms: [
    {title:'\u05D0\u05D9\u05E9\u05D5\u05E8 \u05D4\u05D5\u05E8\u05D9\u05DD \u05DC\u05D8\u05D9\u05D5\u05DC', color:'#2563eb', fields:[
      {type:'text',label:'\u05E9\u05DD \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3',required:true},
      {type:'text',label:'\u05DB\u05D9\u05EA\u05D4',required:true},
      {type:'text',label:'\u05E9\u05DD \u05D4\u05D4\u05D5\u05E8\u05D4',required:true},
      {type:'text',label:'\u05D8\u05DC\u05E4\u05D5\u05DF \u05D4\u05D5\u05E8\u05D4',required:true},
      {type:'text',label:'\u05D9\u05E2\u05D3 \u05D4\u05D8\u05D9\u05D5\u05DC',required:true},
      {type:'date',label:'\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05D8\u05D9\u05D5\u05DC',required:true},
      {type:'yesno',label:'\u05D0\u05E0\u05D9 \u05DE\u05D0\u05E9\u05E8/\u05EA \u05D0\u05EA \u05D4\u05E9\u05EA\u05EA\u05E4\u05D5\u05EA \u05D1\u05E0\u05D9/\u05D1\u05EA\u05D9 \u05D1\u05D8\u05D9\u05D5\u05DC',required:true},
      {type:'textarea',label:'\u05D4\u05E2\u05E8\u05D5\u05EA \u05D1\u05E8\u05D9\u05D0\u05D5\u05EA\u05D9\u05D5\u05EA / \u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA'},
      {type:'text',label:'\u05E9\u05DD \u05DE\u05DC\u05D0 (\u05D7\u05EA\u05D9\u05DE\u05D4 \u05D3\u05D9\u05D2\u05D9\u05D8\u05DC\u05D9\u05EA)',required:true}
    ]},
    {title:'\u05D8\u05D5\u05E4\u05E1 \u05D4\u05E8\u05E9\u05DE\u05D4 \u05DC\u05DE\u05D5\u05E1\u05D3', color:'#0f9d58', fields:[
      {type:'text',label:'\u05E9\u05DD \u05E4\u05E8\u05D8\u05D9',required:true},
      {type:'text',label:'\u05E9\u05DD \u05DE\u05E9\u05E4\u05D7\u05D4',required:true},
      {type:'date',label:'\u05EA\u05D0\u05E8\u05D9\u05DA \u05DC\u05D9\u05D3\u05D4',required:true},
      {type:'text',label:'\u05DB\u05EA\u05D5\u05D1\u05EA \u05DE\u05D2\u05D5\u05E8\u05D9\u05DD',required:true},
      {type:'text',label:'\u05E9\u05DD \u05D4\u05D0\u05D1',required:true},
      {type:'phone',label:'\u05D8\u05DC\u05E4\u05D5\u05DF \u05D4\u05D0\u05D1',required:true},
      {type:'text',label:'\u05E9\u05DD \u05D4\u05D0\u05DD',required:true},
      {type:'phone',label:'\u05D8\u05DC\u05E4\u05D5\u05DF \u05D4\u05D0\u05DD',required:true},
      {type:'email',label:'\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC'},
      {type:'select',label:'\u05DB\u05D9\u05EA\u05D4 \u05DE\u05D1\u05D5\u05E7\u05E9\u05EA',options:'\u05D0,\u05D1,\u05D2,\u05D3,\u05D4,\u05D5'},
      {type:'textarea',label:'\u05DE\u05D9\u05D3\u05E2 \u05E8\u05E4\u05D5\u05D0\u05D9 \u05D7\u05E9\u05D5\u05D1'},
      {type:'textarea',label:'\u05D4\u05E2\u05E8\u05D5\u05EA \u05E0\u05D5\u05E1\u05E4\u05D5\u05EA'}
    ]},
    {title:'\u05D0\u05D9\u05E9\u05D5\u05E8 \u05E6\u05D9\u05DC\u05D5\u05DD \u05EA\u05DC\u05DE\u05D9\u05D3', color:'#f9ab00', fields:[
      {type:'text',label:'\u05E9\u05DD \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3',required:true},
      {type:'text',label:'\u05DB\u05D9\u05EA\u05D4',required:true},
      {type:'text',label:'\u05E9\u05DD \u05D4\u05D4\u05D5\u05E8\u05D4',required:true},
      {type:'yesno',label:'\u05D0\u05E0\u05D9 \u05DE\u05D0\u05E9\u05E8/\u05EA \u05E6\u05D9\u05DC\u05D5\u05DD \u05D1\u05E0\u05D9/\u05D1\u05EA\u05D9 \u05DC\u05E6\u05E8\u05DB\u05D9 \u05D4\u05DE\u05D5\u05E1\u05D3',required:true},
      {type:'yesno',label:'\u05D0\u05E0\u05D9 \u05DE\u05D0\u05E9\u05E8/\u05EA \u05E4\u05E8\u05E1\u05D5\u05DD \u05D1\u05E8\u05E9\u05EA\u05D5\u05EA \u05D4\u05D7\u05D1\u05E8\u05EA\u05D9\u05D5\u05EA'},
      {type:'text',label:'\u05D7\u05EA\u05D9\u05DE\u05D4 \u05D3\u05D9\u05D2\u05D9\u05D8\u05DC\u05D9\u05EA',required:true}
    ]},
    {title:'\u05D3\u05D5\u05D7 \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA \u05E9\u05D1\u05D5\u05E2\u05D9', color:'#ea4335', fields:[
      {type:'text',label:'\u05E9\u05DD \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3',required:true},
      {type:'text',label:'\u05DB\u05D9\u05EA\u05D4',required:true},
      {type:'text',label:'\u05E9\u05DD \u05D4\u05DE\u05D7\u05E0\u05DA',required:true},
      {type:'date',label:'\u05E9\u05D1\u05D5\u05E2 \u05DE-\u05EA\u05D0\u05E8\u05D9\u05DA',required:true},
      {type:'rating',label:'\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA \u05DB\u05DC\u05DC\u05D9\u05EA'},
      {type:'rating',label:'\u05DE\u05E2\u05D5\u05E8\u05D1\u05D5\u05EA \u05D1\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9\u05DD'},
      {type:'rating',label:'\u05D9\u05D7\u05E1\u05D9\u05DD \u05E2\u05DD \u05D7\u05D1\u05E8\u05D9\u05DD'},
      {type:'textarea',label:'\u05D4\u05E2\u05E8\u05D5\u05EA \u05D4\u05DE\u05D7\u05E0\u05DA'},
      {type:'textarea',label:'\u05D4\u05DE\u05DC\u05E6\u05D5\u05EA \u05DC\u05E9\u05D9\u05E4\u05D5\u05E8'}
    ]},
    {title:'\u05D1\u05E7\u05E9\u05EA \u05D7\u05D5\u05E4\u05E9\u05D4', color:'#8b5cf6', fields:[
      {type:'text',label:'\u05E9\u05DD \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3',required:true},
      {type:'text',label:'\u05DB\u05D9\u05EA\u05D4',required:true},
      {type:'text',label:'\u05E9\u05DD \u05D4\u05D4\u05D5\u05E8\u05D4',required:true},
      {type:'date',label:'\u05DE\u05EA\u05D0\u05E8\u05D9\u05DA',required:true},
      {type:'date',label:'\u05E2\u05D3 \u05EA\u05D0\u05E8\u05D9\u05DA',required:true},
      {type:'select',label:'\u05E1\u05D9\u05D1\u05D4',options:'\u05DE\u05D7\u05DC\u05D4,\u05D0\u05D9\u05E8\u05D5\u05E2 \u05DE\u05E9\u05E4\u05D7\u05EA\u05D9,\u05D8\u05D9\u05D5\u05DC,\u05D0\u05D7\u05E8'},
      {type:'textarea',label:'\u05E4\u05D9\u05E8\u05D5\u05D8'},
      {type:'phone',label:'\u05D8\u05DC\u05E4\u05D5\u05DF \u05DC\u05D9\u05E6\u05D9\u05E8\u05EA \u05E7\u05E9\u05E8',required:true}
    ]}
  ],

  forms() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div><h1><i class="bi bi-ui-checks me-2"></i>\u05D8\u05E4\u05E1\u05D9\u05DD</h1></div>
        <button class="btn btn-primary btn-sm" onclick="Pages.showFormTemplates()"><i class="bi bi-plus-lg me-1"></i>\u05E6\u05D5\u05E8 \u05D8\u05D5\u05E4\u05E1 \u05D7\u05D3\u05E9</button>
      </div>

      <!-- Tabs -->
      <ul class="nav nav-tabs mb-3" id="forms-tabs">
        <li class="nav-item"><a class="nav-link active" href="#" onclick="Pages.switchFormsTab('list');return false"><i class="bi bi-collection me-1"></i>\u05D8\u05E4\u05E1\u05D9\u05DD \u05E9\u05DC\u05D9</a></li>
        <li class="nav-item"><a class="nav-link" href="#" onclick="Pages.switchFormsTab('responses');return false"><i class="bi bi-inbox me-1"></i>\u05EA\u05E9\u05D5\u05D1\u05D5\u05EA</a></li>
      </ul>

      <div id="forms-content">${Utils.skeleton(3)}</div>

      <!-- Form Builder Modal (large) -->
      <div class="modal fade" id="form-builder-modal" tabindex="-1"><div class="modal-dialog modal-xl"><div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="form-builder-title">\u05D8\u05D5\u05E4\u05E1 \u05D7\u05D3\u05E9</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <input type="hidden" id="fb-id">
          <div class="row g-3 mb-3">
            <div class="col-md-8">
              <label class="form-label fw-bold">\u05DB\u05D5\u05EA\u05E8\u05EA \u05D4\u05D8\u05D5\u05E4\u05E1</label>
              <input type="text" class="form-control form-control-lg" id="fb-title" placeholder="\u05DB\u05D5\u05EA\u05E8\u05EA \u05D4\u05D8\u05D5\u05E4\u05E1">
            </div>
            <div class="col-md-4">
              <label class="form-label fw-bold">\u05E6\u05D1\u05E2</label>
              <div class="d-flex gap-2" id="fb-colors"></div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">\u05EA\u05D9\u05D0\u05D5\u05E8</label>
            <textarea class="form-control" id="fb-desc" rows="2" placeholder="\u05EA\u05D9\u05D0\u05D5\u05E8 \u05D4\u05D8\u05D5\u05E4\u05E1 (\u05D0\u05D5\u05E4\u05E6\u05D9\u05D5\u05E0\u05DC\u05D9)"></textarea>
          </div>

          <hr>
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h6 class="fw-bold mb-0"><i class="bi bi-list-check me-2"></i>\u05E9\u05D3\u05D5\u05EA</h6>
            <div class="dropdown">
              <button class="btn btn-outline-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown"><i class="bi bi-plus-lg me-1"></i>\u05D4\u05D5\u05E1\u05E3 \u05E9\u05D3\u05D4</button>
              <ul class="dropdown-menu" id="fb-add-field-menu"></ul>
            </div>
          </div>
          <div id="fb-fields-list"></div>
          <div id="fb-fields-empty" class="text-center text-muted py-4" style="display:none">
            <i class="bi bi-arrow-up-circle" style="font-size:2rem"></i>
            <p class="mt-2">\u05DC\u05D7\u05E5 "\u05D4\u05D5\u05E1\u05E3 \u05E9\u05D3\u05D4" \u05DB\u05D3\u05D9 \u05DC\u05D4\u05EA\u05D7\u05D9\u05DC</p>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button>
          <button class="btn btn-success" onclick="Pages.saveForm(false)"><i class="bi bi-save me-1"></i>\u05E9\u05DE\u05D9\u05E8\u05D4 (\u05D8\u05D9\u05D5\u05D8\u05D4)</button>
          <button class="btn btn-primary" onclick="Pages.saveForm(true)"><i class="bi bi-send me-1"></i>\u05E9\u05DE\u05D9\u05E8\u05D4 \u05D5\u05E4\u05E8\u05E1\u05D5\u05DD</button>
        </div>
      </div></div></div>

      <!-- Form Preview Modal -->
      <div class="modal fade" id="form-preview-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">\u05EA\u05E6\u05D5\u05D2\u05D4 \u05DE\u05E7\u05D3\u05D9\u05DE\u05D4</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body" id="form-preview-body"></div>
        <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05E1\u05D2\u05D5\u05E8</button></div>
      </div></div></div>
    `;
  },

  formsInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    try {
      this._formsData = _gc('\u05D8\u05E4\u05E1\u05D9\u05DD');
    } catch(e) { this._formsData = []; }
    this._formsTab = 'list';
    this._renderFormsContent();
  },

  switchFormsTab(tab) {
    this._formsTab = tab;
    document.querySelectorAll('#forms-tabs .nav-link').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('#forms-tabs .nav-link')[tab === 'list' ? 0 : 1].classList.add('active');
    this._renderFormsContent();
  },

  _renderFormsContent() {
    const el = document.getElementById('forms-content');
    if (this._formsTab === 'list') {
      this._renderFormsList(el);
    } else {
      this._renderFormResponses(el);
    }
  },

  _renderFormsList(container) {
    const data = this._formsData;
    if (!data.length) {
      container.innerHTML = '<div class="empty-state"><i class="bi bi-ui-checks"></i><h5>\u05D0\u05D9\u05DF \u05D8\u05E4\u05E1\u05D9\u05DD</h5><p class="text-muted">\u05E6\u05D5\u05E8 \u05D8\u05D5\u05E4\u05E1 \u05D7\u05D3\u05E9 \u05DC\u05D4\u05EA\u05D7\u05D9\u05DC</p></div>';
      return;
    }
    container.innerHTML = `<div class="row g-3">${data.map(f => {
      const id = Utils.rowId(f);
      const title = f['\u05DB\u05D5\u05EA\u05E8\u05EA'] || '\u05D8\u05D5\u05E4\u05E1 \u05DC\u05DC\u05D0 \u05E9\u05DD';
      const desc = f['\u05EA\u05D9\u05D0\u05D5\u05E8'] || '';
      const status = f['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '\u05D8\u05D9\u05D5\u05D8\u05D4';
      const isPublished = status === '\u05E4\u05E2\u05D9\u05DC';
      const color = f['\u05E6\u05D1\u05E2'] || '#4285f4';
      const responseCount = f['\u05EA\u05E9\u05D5\u05D1\u05D5\u05EA'] || 0;
      const created = f['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E6\u05D9\u05E8\u05D4'] || '';
      let fieldsCount = 0;
      try { const fields = JSON.parse(f['\u05E9\u05D3\u05D5\u05EA'] || '[]'); fieldsCount = fields.length; } catch(e) { /* silent */ }
      return `<div class="col-md-6 col-lg-4">
        <div class="card h-100" style="border-top:4px solid ${color}">
          <div class="card-body p-3">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h6 class="fw-bold mb-0">${title}</h6>
              <span class="badge bg-${isPublished ? 'success' : 'secondary'}">${isPublished ? '\u05E4\u05E2\u05D9\u05DC' : '\u05D8\u05D9\u05D5\u05D8\u05D4'}</span>
            </div>
            ${desc ? `<p class="small text-muted mb-2">${desc}</p>` : ''}
            <div class="d-flex gap-3 small text-muted mb-3">
              <span><i class="bi bi-list-check me-1"></i>${fieldsCount} \u05E9\u05D3\u05D5\u05EA</span>
              <span><i class="bi bi-inbox me-1"></i>${responseCount} \u05EA\u05E9\u05D5\u05D1\u05D5\u05EA</span>
              ${created ? `<span><i class="bi bi-calendar me-1"></i>${created}</span>` : ''}
            </div>
          </div>
          <div class="card-footer bg-transparent border-top-0 p-3 pt-0">
            <div class="d-flex gap-1 flex-wrap">
              <button class="btn btn-outline-primary btn-sm" onclick="Pages.editForm('${id}')" title="\u05E2\u05E8\u05D9\u05DB\u05D4"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-outline-info btn-sm" onclick="Pages.previewForm('${id}')" title="\u05EA\u05E6\u05D5\u05D2\u05D4 \u05DE\u05E7\u05D3\u05D9\u05DE\u05D4"><i class="bi bi-eye"></i></button>
              <button class="btn btn-outline-success btn-sm" onclick="Pages.copyFormLink('${id}')" title="\u05D4\u05E2\u05EA\u05E7 \u05E7\u05D9\u05E9\u05D5\u05E8"><i class="bi bi-link-45deg"></i></button>
              <button class="btn btn-outline-danger btn-sm ms-auto" onclick="Pages.deleteForm('${id}')" title="\u05DE\u05D7\u05D9\u05E7\u05D4"><i class="bi bi-trash"></i></button>
            </div>
          </div>
        </div>
      </div>`;
    }).join('')}</div>`;
  },

  _renderFormResponses(container) {
    const forms = this._formsData;
    if (!forms.length) {
      container.innerHTML = '<div class="empty-state"><i class="bi bi-inbox"></i><h5>\u05D0\u05D9\u05DF \u05D8\u05E4\u05E1\u05D9\u05DD</h5><p class="text-muted">\u05E6\u05D5\u05E8 \u05D8\u05D5\u05E4\u05E1 \u05E7\u05D5\u05D3\u05DD</p></div>';
      return;
    }
    container.innerHTML = `
      <div class="card p-3 mb-3">
        <div class="row g-3 align-items-end">
          <div class="col-md-5">
            <label class="form-label fw-bold">\u05D1\u05D7\u05E8 \u05D8\u05D5\u05E4\u05E1</label>
            <select class="form-select" id="resp-form-select" onchange="Pages.loadFormResponses(this.value)">
              <option value="">\u2014 \u05D1\u05D7\u05E8 \u05D8\u05D5\u05E4\u05E1 \u2014</option>
              ${forms.map(f => `<option value="${Utils.rowId(f)}">${f['\u05DB\u05D5\u05EA\u05E8\u05EA'] || '\u05DC\u05DC\u05D0 \u05E9\u05DD'}</option>`).join('')}
            </select>
          </div>
          <div class="col-md-3">
            <span class="badge bg-info" id="resp-count-badge" style="display:none"></span>
          </div>
          <div class="col-md-4 text-start">
            <button class="btn btn-outline-success btn-sm" id="resp-export-btn" onclick="Pages.exportFormResponsesCSV()" style="display:none"><i class="bi bi-download me-1"></i>\u05D9\u05D9\u05E6\u05D5\u05D0 CSV</button>
          </div>
        </div>
      </div>
      <div id="resp-table-container">
        <div class="text-center text-muted py-5"><i class="bi bi-hand-index" style="font-size:2rem"></i><p class="mt-2">\u05D1\u05D7\u05E8 \u05D8\u05D5\u05E4\u05E1 \u05DC\u05E6\u05E4\u05D9\u05D9\u05D4 \u05D1\u05EA\u05E9\u05D5\u05D1\u05D5\u05EA</p></div>
      </div>
    `;
  },

  showFormTemplates() {
    const html = `<div class="modal fade" id="form-templates-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><h5>\u05D1\u05D7\u05E8 \u05EA\u05D1\u05E0\u05D9\u05EA \u05D8\u05D5\u05E4\u05E1</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body">
      <div class="row g-3">
        <div class="col-md-4"><div class="card p-3 text-center card-clickable" onclick="bootstrap.Modal.getInstance(document.getElementById('form-templates-modal'))?.hide();Pages.showCreateForm()"><i class="bi bi-plus-circle fs-1 text-primary"></i><h6 class="mt-2 fw-bold">\u05D8\u05D5\u05E4\u05E1 \u05E8\u05D9\u05E7</h6><small class="text-muted">\u05D4\u05EA\u05D7\u05DC \u05DE\u05D0\u05E4\u05E1</small></div></div>
        ${this._builtInForms.map((f,i) => `<div class="col-md-4"><div class="card p-3 text-center card-clickable" style="border-top:3px solid ${f.color}" onclick="Pages.useFormTemplate(${i})"><i class="bi bi-file-earmark-text fs-1" style="color:${f.color}"></i><h6 class="mt-2 fw-bold">${f.title}</h6><small class="text-muted">${f.fields.length} \u05E9\u05D3\u05D5\u05EA</small></div></div>`).join('')}
      </div>
    </div></div></div></div>`;
    document.getElementById('form-templates-modal')?.remove();
    document.body.insertAdjacentHTML('beforeend', html);
    new bootstrap.Modal(document.getElementById('form-templates-modal')).show();
  },

  useFormTemplate(idx) {
    bootstrap.Modal.getInstance(document.getElementById('form-templates-modal'))?.hide();
    const tmpl = this._builtInForms[idx];
    this._editingForm = null;
    this._formFields = tmpl.fields.map((f,i) => ({...f, id: 'f'+i}));
    document.getElementById('fb-id').value = '';
    document.getElementById('fb-title').value = tmpl.title;
    document.getElementById('fb-desc').value = '';
    document.getElementById('form-builder-title').textContent = '\u05D8\u05D5\u05E4\u05E1 \u05D7\u05D3\u05E9';
    this._renderColorPicker(tmpl.color);
    this._renderFieldTypeMenu();
    this._renderFormFieldsEditor();
    new bootstrap.Modal(document.getElementById('form-builder-modal')).show();
  },

  showCreateForm() {
    this._editingForm = null;
    this._formFields = [];
    document.getElementById('fb-id').value = '';
    document.getElementById('fb-title').value = '';
    document.getElementById('fb-desc').value = '';
    document.getElementById('form-builder-title').textContent = '\u05D8\u05D5\u05E4\u05E1 \u05D7\u05D3\u05E9';
    this._renderColorPicker('#4285f4');
    this._renderFieldTypeMenu();
    this._renderFormFieldsEditor();
    new bootstrap.Modal(document.getElementById('form-builder-modal')).show();
  },

  editForm(id) {
    const form = this._formsData.find(f => Utils.rowId(f) === id);
    if (!form) { Utils.toast('\u05D8\u05D5\u05E4\u05E1 \u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0', 'danger'); return; }
    this._editingForm = id;
    document.getElementById('fb-id').value = id;
    document.getElementById('fb-title').value = form['\u05DB\u05D5\u05EA\u05E8\u05EA'] || '';
    document.getElementById('fb-desc').value = form['\u05EA\u05D9\u05D0\u05D5\u05E8'] || '';
    document.getElementById('form-builder-title').textContent = '\u05E2\u05E8\u05D9\u05DB\u05EA \u05D8\u05D5\u05E4\u05E1';
    this._renderColorPicker(form['\u05E6\u05D1\u05E2'] || '#4285f4');
    try { this._formFields = JSON.parse(form['\u05E9\u05D3\u05D5\u05EA'] || '[]'); } catch(e) { this._formFields = []; }
    this._renderFieldTypeMenu();
    this._renderFormFieldsEditor();
    new bootstrap.Modal(document.getElementById('form-builder-modal')).show();
  },

  _renderColorPicker(selected) {
    const el = document.getElementById('fb-colors');
    el.innerHTML = this._formColors.map(c =>
      `<div onclick="Pages._selectFormColor('${c}')" class="rounded-circle border border-2 ${c === selected ? 'border-dark' : 'border-transparent'}" style="width:32px;height:32px;background:${c};cursor:pointer" data-color="${c}"></div>`
    ).join('');
    el.dataset.selected = selected;
  },

  _selectFormColor(color) {
    document.getElementById('fb-colors').dataset.selected = color;
    document.querySelectorAll('#fb-colors > div').forEach(d => {
      d.classList.toggle('border-dark', d.dataset.color === color);
      d.classList.toggle('border-transparent', d.dataset.color !== color);
    });
  },

  _renderFieldTypeMenu() {
    document.getElementById('fb-add-field-menu').innerHTML = this._fieldTypes.map(t =>
      `<li><a class="dropdown-item" href="#" onclick="Pages.addFormField('${t.value}');return false"><i class="bi ${t.icon} me-2"></i>${t.label}</a></li>`
    ).join('');
  },

  addFormField(type) {
    const typeObj = this._fieldTypes.find(t => t.value === type);
    this._formFields.push({
      id: 'f' + Date.now() + Math.random().toString(36).slice(2,6),
      type: type,
      label: typeObj ? typeObj.label : type,
      required: false,
      options: type === 'select' ? ['\u05D0\u05E4\u05E9\u05E8\u05D5\u05EA 1', '\u05D0\u05E4\u05E9\u05E8\u05D5\u05EA 2'] : []
    });
    this._renderFormFieldsEditor();
  },

  removeFormField(idx) {
    this._formFields.splice(idx, 1);
    this._renderFormFieldsEditor();
  },

  moveFormField(idx, dir) {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= this._formFields.length) return;
    const temp = this._formFields[idx];
    this._formFields[idx] = this._formFields[newIdx];
    this._formFields[newIdx] = temp;
    this._renderFormFieldsEditor();
  },

  _renderFormFieldsEditor() {
    const list = document.getElementById('fb-fields-list');
    const empty = document.getElementById('fb-fields-empty');
    if (!this._formFields.length) {
      list.innerHTML = '';
      empty.style.display = '';
      return;
    }
    empty.style.display = 'none';
    list.innerHTML = this._formFields.map((field, idx) => {
      const typeObj = this._fieldTypes.find(t => t.value === field.type);
      const typeName = typeObj ? typeObj.label : field.type;
      const typeIcon = typeObj ? typeObj.icon : 'bi-question-circle';
      const isSelect = field.type === 'select';
      return `
        <div class="card mb-2 border-start border-3" style="border-color:var(--bht-primary,#4285f4)!important">
          <div class="card-body p-3">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div class="d-flex align-items-center gap-2">
                <span class="badge bg-light text-dark"><i class="bi ${typeIcon} me-1"></i>${typeName}</span>
                <span class="text-muted small">#${idx + 1}</span>
              </div>
              <div class="d-flex gap-1">
                <button class="btn btn-sm btn-outline-secondary py-0 px-1" onclick="Pages.moveFormField(${idx},-1)" ${idx === 0 ? 'disabled' : ''} title="\u05D4\u05E2\u05DC\u05D4"><i class="bi bi-arrow-up"></i></button>
                <button class="btn btn-sm btn-outline-secondary py-0 px-1" onclick="Pages.moveFormField(${idx},1)" ${idx === this._formFields.length - 1 ? 'disabled' : ''} title="\u05D4\u05D5\u05E8\u05D3\u05D4"><i class="bi bi-arrow-down"></i></button>
                <button class="btn btn-sm btn-outline-danger py-0 px-1" onclick="Pages.removeFormField(${idx})" title="\u05D4\u05E1\u05E8"><i class="bi bi-x-lg"></i></button>
              </div>
            </div>
            <div class="row g-2">
              <div class="${isSelect ? 'col-md-6' : 'col-md-9'}">
                <input type="text" class="form-control form-control-sm" value="${this._escAttr(field.label)}" placeholder="\u05EA\u05D5\u05D5\u05D9\u05EA \u05D4\u05E9\u05D3\u05D4" onchange="Pages._updateFieldProp(${idx},'label',this.value)">
              </div>
              <div class="col-md-3">
                <div class="form-check form-switch mt-1">
                  <input class="form-check-input" type="checkbox" id="fb-req-${idx}" ${field.required ? 'checked' : ''} onchange="Pages._updateFieldProp(${idx},'required',this.checked)">
                  <label class="form-check-label small" for="fb-req-${idx}">\u05D7\u05D5\u05D1\u05D4</label>
                </div>
              </div>
              ${isSelect ? `<div class="col-md-6">
                <input type="text" class="form-control form-control-sm" value="${this._escAttr((field.options||[]).join(', '))}" placeholder="\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA (\u05DE\u05D5\u05E4\u05E8\u05D3\u05D5\u05EA \u05D1\u05E4\u05E1\u05D9\u05E7)" onchange="Pages._updateFieldOptions(${idx},this.value)">
                <small class="text-muted">\u05D4\u05E4\u05E8\u05D3 \u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA \u05D1\u05E4\u05E1\u05D9\u05E7</small>
              </div>` : ''}
            </div>
          </div>
        </div>`;
    }).join('');
  },

  _escAttr(str) {
    return String(str || '').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  },

  _updateFieldProp(idx, prop, val) {
    if (this._formFields[idx]) this._formFields[idx][prop] = val;
  },

  _updateFieldOptions(idx, val) {
    if (this._formFields[idx]) {
      this._formFields[idx].options = val.split(',').map(s => s.trim()).filter(Boolean);
    }
  },

  async saveForm(publish) {
    const title = document.getElementById('fb-title').value.trim();
    if (!title) { Utils.toast('\u05E0\u05D0 \u05DC\u05D4\u05D6\u05D9\u05DF \u05DB\u05D5\u05EA\u05E8\u05EA \u05DC\u05D8\u05D5\u05E4\u05E1', 'danger'); return; }
    const id = document.getElementById('fb-id').value;
    const color = document.getElementById('fb-colors').dataset.selected || '#4285f4';
    const desc = document.getElementById('fb-desc').value.trim();
    const status = publish ? '\u05E4\u05E2\u05D9\u05DC' : '\u05D8\u05D9\u05D5\u05D8\u05D4';
    const fieldsJson = JSON.stringify(this._formFields);
    const row = {
      '\u05DB\u05D5\u05EA\u05E8\u05EA': title,
      '\u05EA\u05D9\u05D0\u05D5\u05E8': desc,
      '\u05E6\u05D1\u05E2': color,
      '\u05E1\u05D8\u05D8\u05D5\u05E1': status,
      '\u05E9\u05D3\u05D5\u05EA': fieldsJson,
      '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E6\u05D9\u05E8\u05D4': id ? undefined : Utils.formatDate(new Date()),
      '\u05EA\u05E9\u05D5\u05D1\u05D5\u05EA': '0'
    };
    // Remove undefined keys
    Object.keys(row).forEach(k => { if (row[k] === undefined) delete row[k]; });
    try {
      if (id) {
        await App.apiCall('update', '\u05D8\u05E4\u05E1\u05D9\u05DD', { id, row });
      } else {
        await App.apiCall('add', '\u05D8\u05E4\u05E1\u05D9\u05DD', { row });
      }
      bootstrap.Modal.getInstance(document.getElementById('form-builder-modal'))?.hide();
      Utils.toast(id ? '\u05D8\u05D5\u05E4\u05E1 \u05E2\u05D5\u05D3\u05DB\u05DF' : '\u05D8\u05D5\u05E4\u05E1 \u05E0\u05D5\u05E6\u05E8');
      this.formsInit();
    } catch(e) {
      Utils.errorToast('save');
    }
  },

  async deleteForm(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05EA \u05D8\u05D5\u05E4\u05E1', '\u05D4\u05D0\u05DD \u05DC\u05DE\u05D7\u05D5\u05E7 \u05D8\u05D5\u05E4\u05E1 \u05D6\u05D4? \u05DB\u05DC \u05D4\u05EA\u05E9\u05D5\u05D1\u05D5\u05EA \u05D9\u05D9\u05DE\u05D7\u05E7\u05D5.')) return;
    try {
      await App.apiCall('delete', '\u05D8\u05E4\u05E1\u05D9\u05DD', { id });
      Utils.toast('\u05D8\u05D5\u05E4\u05E1 \u05E0\u05DE\u05D7\u05E7');
      this.formsInit();
    } catch(e) {
      Utils.errorToast('generic');
    }
  },

  copyFormLink(id) {
    const form = this._formsData.find(f => Utils.rowId(f) === id);
    const title = form ? (form['\u05DB\u05D5\u05EA\u05E8\u05EA'] || '') : '';
    const link = `${location.origin}${location.pathname}#forms/fill/${id}`;
    navigator.clipboard.writeText(link).then(() => {
      Utils.toast('\u05E7\u05D9\u05E9\u05D5\u05E8 \u05D4\u05D5\u05E2\u05EA\u05E7: ' + title);
    }).catch(() => {
      Utils.toast('\u05DC\u05D0 \u05E0\u05D9\u05EA\u05DF \u05DC\u05D4\u05E2\u05EA\u05D9\u05E7', 'danger');
    });
  },

  previewForm(id) {
    const form = this._formsData.find(f => Utils.rowId(f) === id);
    if (!form) return;
    let fields = [];
    try { fields = JSON.parse(form['\u05E9\u05D3\u05D5\u05EA'] || '[]'); } catch(e) { /* silent */ }
    const color = form['\u05E6\u05D1\u05E2'] || '#4285f4';
    const title = form['\u05DB\u05D5\u05EA\u05E8\u05EA'] || '';
    const desc = form['\u05EA\u05D9\u05D0\u05D5\u05E8'] || '';

    let html = `<div class="p-3 rounded mb-3" style="background:${color};color:#fff">
      <h4 class="mb-1">${title}</h4>
      ${desc ? `<p class="mb-0 opacity-75">${desc}</p>` : ''}
    </div>`;

    if (!fields.length) {
      html += '<p class="text-muted text-center">\u05D0\u05D9\u05DF \u05E9\u05D3\u05D5\u05EA \u05D1\u05D8\u05D5\u05E4\u05E1 \u05D6\u05D4</p>';
    } else {
      html += fields.map(f => {
        const req = f.required ? ' <span class="text-danger">*</span>' : '';
        let input = '';
        switch(f.type) {
          case 'text': input = '<input type="text" class="form-control" disabled>'; break;
          case 'textarea': input = '<textarea class="form-control" rows="3" disabled></textarea>'; break;
          case 'select': input = `<select class="form-select" disabled><option>\u2014 \u05D1\u05D7\u05E8 \u2014</option>${(f.options||[]).map(o=>`<option>${o}</option>`).join('')}</select>`; break;
          case 'checkbox': input = '<div class="form-check"><input class="form-check-input" type="checkbox" disabled><label class="form-check-label">\u05DB\u05DF</label></div>'; break;
          case 'date': input = '<input type="date" class="form-control" disabled>'; break;
          case 'number': input = '<input type="number" class="form-control" disabled>'; break;
          case 'email': input = '<input type="email" class="form-control" disabled dir="ltr">'; break;
          case 'phone': input = '<input type="tel" class="form-control" disabled dir="ltr">'; break;
          case 'rating': input = '<div class="d-flex gap-1">' + [1,2,3,4,5].map(n => `<i class="bi bi-star text-warning" style="font-size:1.5rem;cursor:pointer"></i>`).join('') + '</div>'; break;
          case 'yesno': input = '<div class="btn-group"><button class="btn btn-outline-success btn-sm" disabled>\u05DB\u05DF</button><button class="btn btn-outline-danger btn-sm" disabled>\u05DC\u05D0</button></div>'; break;
          default: input = '<input type="text" class="form-control" disabled>';
        }
        return `<div class="mb-3"><label class="form-label fw-bold">${f.label}${req}</label>${input}</div>`;
      }).join('');
    }
    document.getElementById('form-preview-body').innerHTML = html;
    new bootstrap.Modal(document.getElementById('form-preview-modal')).show();
  },

  async loadFormResponses(formId) {
    const container = document.getElementById('resp-table-container');
    const badge = document.getElementById('resp-count-badge');
    const exportBtn = document.getElementById('resp-export-btn');
    if (!formId) {
      container.innerHTML = '<div class="text-center text-muted py-5"><i class="bi bi-hand-index" style="font-size:2rem"></i><p class="mt-2">\u05D1\u05D7\u05E8 \u05D8\u05D5\u05E4\u05E1 \u05DC\u05E6\u05E4\u05D9\u05D9\u05D4 \u05D1\u05EA\u05E9\u05D5\u05D1\u05D5\u05EA</p></div>';
      badge.style.display = 'none';
      exportBtn.style.display = 'none';
      return;
    }
    container.innerHTML = Utils.skeleton(2);
    try {
      const allResponses = await App.getData('\u05EA\u05E9\u05D5\u05D1\u05D5\u05EA_\u05D8\u05E4\u05E1\u05D9\u05DD');
      this._formResponses = allResponses.filter(r => r['\u05DE\u05D6\u05D4\u05D4_\u05D8\u05D5\u05E4\u05E1'] === formId);
    } catch(e) {
      this._formResponses = [];
    }

    const form = this._formsData.find(f => Utils.rowId(f) === formId);
    let fields = [];
    try { fields = JSON.parse((form || {})['\u05E9\u05D3\u05D5\u05EA'] || '[]'); } catch(e) { /* silent */ }

    badge.textContent = this._formResponses.length + ' \u05EA\u05E9\u05D5\u05D1\u05D5\u05EA';
    badge.style.display = '';
    exportBtn.style.display = '';
    exportBtn.dataset.formId = formId;

    if (!this._formResponses.length) {
      container.innerHTML = '<div class="text-center text-muted py-5"><i class="bi bi-inbox" style="font-size:2rem"></i><p class="mt-2">\u05D0\u05D9\u05DF \u05EA\u05E9\u05D5\u05D1\u05D5\u05EA \u05DC\u05D8\u05D5\u05E4\u05E1 \u05D6\u05D4</p></div>';
      return;
    }

    // Build table
    const fieldLabels = fields.map(f => f.label);
    const headerCols = ['\u05EA\u05D0\u05E8\u05D9\u05DA', '\u05E9\u05DD \u05DE\u05DE\u05DC\u05D0', ...fieldLabels];
    container.innerHTML = `
      <div class="table-responsive">
        <table class="table table-sm table-striped">
          <thead><tr>${headerCols.map(h => `<th>${h}</th>`).join('')}</tr></thead>
          <tbody>${this._formResponses.map(resp => {
            let respData = {};
            try { respData = JSON.parse(resp['\u05EA\u05E9\u05D5\u05D1\u05D5\u05EA'] || '{}'); } catch(e) { /* silent */ }
            const date = resp['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '';
            const name = resp['\u05E9\u05DD'] || '';
            const fieldValues = fields.map(f => {
              const val = respData[f.id] || respData[f.label] || '';
              if (f.type === 'checkbox') return val ? '\u2713' : '\u2717';
              if (f.type === 'rating') return val ? '\u2605'.repeat(Number(val)) : '';
              if (f.type === 'yesno') return val === 'yes' ? '\u05DB\u05DF' : val === 'no' ? '\u05DC\u05D0' : val;
              return val;
            });
            return `<tr><td class="small">${date}</td><td>${name}</td>${fieldValues.map(v => `<td class="small">${v}</td>`).join('')}</tr>`;
          }).join('')}</tbody>
        </table>
      </div>`;
  },

  exportFormResponsesCSV() {
    const formId = document.getElementById('resp-export-btn').dataset.formId;
    const form = this._formsData.find(f => Utils.rowId(f) === formId);
    if (!form || !this._formResponses.length) { Utils.toast('\u05D0\u05D9\u05DF \u05EA\u05E9\u05D5\u05D1\u05D5\u05EA \u05DC\u05D9\u05D9\u05E6\u05D5\u05D0', 'info'); return; }
    let fields = [];
    try { fields = JSON.parse(form['\u05E9\u05D3\u05D5\u05EA'] || '[]'); } catch(e) { /* silent */ }

    const headers = ['\u05EA\u05D0\u05E8\u05D9\u05DA', '\u05E9\u05DD \u05DE\u05DE\u05DC\u05D0', ...fields.map(f => f.label)];
    const rows = this._formResponses.map(resp => {
      let respData = {};
      try { respData = JSON.parse(resp['\u05EA\u05E9\u05D5\u05D1\u05D5\u05EA'] || '{}'); } catch(e) { /* silent */ }
      return [
        resp['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '',
        resp['\u05E9\u05DD'] || '',
        ...fields.map(f => respData[f.id] || respData[f.label] || '')
      ];
    });

    const BOM = '\uFEFF';
    const csvContent = BOM + [headers, ...rows].map(row =>
      row.map(cell => '"' + String(cell).replace(/"/g, '""') + '"').join(',')
    ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (form['\u05DB\u05D5\u05EA\u05E8\u05EA'] || 'form') + '_responses.csv';
    a.click();
    URL.revokeObjectURL(url);
    Utils.toast('\u05E7\u05D5\u05D1\u05E5 CSV \u05D9\u05D5\u05E8\u05D3');
  },
});
