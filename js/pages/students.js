/* ===== BHT v5.4 — Students (Full Upgrade) ===== */
Object.assign(Pages, {

  /* ---- state ---- */
  _studentsData: [],
  _studentsView: localStorage.getItem('bht_students_view') || 'cards',
  _studentsSort: { col: 'name', asc: true },
  _studentsSelected: new Set(),
  _studentsUseDemo: false,

  _studentsDemoData() {
    const names = [
      ['\u05D9\u05D5\u05E1\u05E3','\u05DB\u05D4\u05DF'],['\u05DE\u05E9\u05D4','\u05DC\u05D5\u05D9'],['\u05D0\u05D1\u05E8\u05D4\u05DD','\u05D9\u05E6\u05D7\u05E7\u05D9'],
      ['\u05D3\u05D5\u05D3','\u05E4\u05E8\u05D9\u05D3\u05DE\u05DF'],['\u05D9\u05E2\u05E7\u05D1','\u05E9\u05E4\u05D9\u05E8\u05D0'],['\u05E9\u05DE\u05D5\u05D0\u05DC','\u05D1\u05E8\u05D2\u05E8'],
      ['\u05D0\u05DC\u05D9\u05D4\u05D5','\u05D2\u05D5\u05DC\u05D3\u05E9\u05D8\u05D9\u05D9\u05DF'],['\u05D7\u05D9\u05D9\u05DD','\u05E8\u05D5\u05D6\u05E0\u05D1\u05E8\u05D2'],
      ['\u05E0\u05EA\u05E0\u05D0\u05DC','\u05D5\u05D9\u05E0\u05E8'],['\u05E8\u05E4\u05D0\u05DC','\u05DE\u05D6\u05E8\u05D7\u05D9'],
      ['\u05E8\u05D0\u05D5\u05D1\u05DF','\u05D3\u05D4\u05DF'],['\u05E9\u05DE\u05E2\u05D5\u05DF','\u05D0\u05DC\u05D1\u05D6'],
      ['\u05D2\u05D3','\u05E7\u05E4\u05DC\u05DF'],['\u05D0\u05E9\u05E8','\u05D4\u05DC\u05DC'],['\u05DE\u05E0\u05D7\u05DD','\u05D1\u05DF \u05D3\u05D5\u05D3']
    ];
    const classes = ['\u05DB\u05D9\u05EA\u05D4 \u05D0','\u05DB\u05D9\u05EA\u05D4 \u05D1'];
    return names.map(([fn,ln], i) => ({
      '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': fn, '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': ln,
      '\u05DB\u05D9\u05EA\u05D4': classes[i < 8 ? 0 : 1],
      '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC',
      '\u05D8\u05DC\u05E4\u05D5\u05DF': '050' + String(1234567 + i),
      '\u05DE\u05D2\u05D3\u05E8': '\u05D6\u05DB\u05E8',
      '\u05DE\u05D6\u05D4\u05D4': 'S' + (i + 1),
      _row: i + 2
    }));
  },

  studentsLoadDemo() {
    this._studentsUseDemo = true;
    this._studentsData = this._studentsDemoData();
    this._studentsSelected = new Set();
    this._studentsData.forEach(s => { s._fullName = Utils.fullName(s); s._id = Utils.rowId(s); });
    const classes = [...new Set(this._studentsData.map(s => s['\u05DB\u05D9\u05EA\u05D4']).filter(Boolean))].sort();
    this._classColors = {};
    classes.forEach(c => this._getClassColor(c));
    this.renderStudentsStats(this._studentsData, classes);
    this.renderStudentsList();
    Utils.toast('\u05E0\u05D8\u05E2\u05E0\u05D5 \u05E0\u05EA\u05D5\u05E0\u05D9 \u05D3\u05DE\u05D5', 'info');
  },

  /* ---- class-based avatar colors ---- */
  _classColors: {},
  _CLASS_PALETTE: [
    '#1a73e8','#0f9d58','#f9ab00','#6366f1','#ea4335',
    '#ec4899','#14b8a6','#f97316','#8b5cf6','#06b6d4'
  ],
  _getClassColor(cls) {
    if (!cls) return '#6c757d';
    if (!this._classColors[cls]) {
      const idx = Object.keys(this._classColors).length % this._CLASS_PALETTE.length;
      this._classColors[cls] = this._CLASS_PALETTE[idx];
    }
    return this._classColors[cls];
  },

  /* ======================================================================
     STUDENTS LIST PAGE
     ====================================================================== */
  students() {
    return `
      <!-- Statistics Header -->
      <div id="students-stats" class="row g-3 mb-3"></div>

      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div>
          <h1><i class="bi bi-people-fill me-2"></i>\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</h1>
          <p id="students-count" class="text-muted mb-0"></p>
        </div>
        <div class="d-flex gap-2 flex-wrap">
          <div class="btn-group" role="group">
            <button class="btn btn-outline-secondary btn-sm ${this._studentsView === 'cards' ? 'active' : ''}" onclick="Pages.setStudentsView('cards')" title="\u05EA\u05E6\u05D5\u05D2\u05EA \u05DB\u05E8\u05D8\u05D9\u05E1\u05D9\u05DD"><i class="bi bi-grid-3x3-gap-fill"></i></button>
            <button class="btn btn-outline-secondary btn-sm ${this._studentsView === 'table' ? 'active' : ''}" onclick="Pages.setStudentsView('table')" title="\u05EA\u05E6\u05D5\u05D2\u05EA \u05D8\u05D1\u05DC\u05D4"><i class="bi bi-table"></i></button>
          </div>
          <button class="btn btn-primary btn-sm" onclick="Pages.showStudentForm()"><i class="bi bi-plus-lg me-1"></i>\u05D4\u05D5\u05E1\u05E4\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3</button>
          <button class="btn btn-outline-primary btn-sm" onclick="Pages.showBulkAddStudents()"><i class="bi bi-people me-1"></i>\u05D4\u05D5\u05E1\u05E4\u05D4 \u05DE\u05E8\u05D5\u05D1\u05D4</button>
          <button class="btn btn-outline-info btn-sm" onclick="Pages.showImportCSV()"><i class="bi bi-upload me-1"></i>\u05D9\u05D9\u05D1\u05D5\u05D0 CSV</button>
          <button class="btn btn-outline-success btn-sm" onclick="Pages.exportStudentsCSV()"><i class="bi bi-download me-1"></i>\u05D9\u05D9\u05E6\u05D5\u05D0 CSV</button>
        </div>
      </div>

      <!-- Filters -->
      <div class="card p-3 mb-3">
        <div class="row g-2 align-items-center">
          <div class="col-md-5">
            <div class="search-box"><i class="bi bi-search"></i>
              <input type="text" class="form-control" id="students-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05EA\u05DC\u05DE\u05D9\u05D3...">
            </div>
          </div>
          <div class="col-md-3">
            <select class="form-select" id="students-class-filter">
              <option value="">\u05DB\u05DC \u05D4\u05DB\u05D9\u05EA\u05D5\u05EA</option>
            </select>
          </div>
          <div class="col-md-2">
            <select class="form-select" id="students-status-filter">
              <option value="">\u05DB\u05DC \u05D4\u05E1\u05D8\u05D8\u05D5\u05E1\u05D9\u05DD</option>
              <option value="\u05E4\u05E2\u05D9\u05DC">\u05E4\u05E2\u05D9\u05DC</option>
              <option value="\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC">\u05DC\u05D0 \u05E4\u05E2\u05D9\u05DC</option>
            </select>
          </div>
          <div class="col-md-2 text-start">
            <button class="btn btn-outline-secondary btn-sm w-100" onclick="Pages.clearStudentFilters()">
              <i class="bi bi-x-circle me-1"></i>\u05E0\u05E7\u05D4
            </button>
          </div>
        </div>
      </div>

      <!-- Bulk Actions Bar (hidden by default) -->
      <div id="students-bulk-bar" class="card bg-primary text-white p-2 mb-3 d-none">
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
          <div class="d-flex align-items-center gap-2">
            <input type="checkbox" class="form-check-input" id="students-select-all" onchange="Pages.toggleSelectAll(this.checked)">
            <span id="students-selected-count">0 \u05E0\u05D1\u05D7\u05E8\u05D5</span>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-light btn-sm" onclick="Pages.bulkMessage()"><i class="bi bi-chat-dots me-1"></i>\u05E9\u05DC\u05D7 \u05D4\u05D5\u05D3\u05E2\u05D4</button>
            <button class="btn btn-light btn-sm" onclick="Pages.bulkExport()"><i class="bi bi-download me-1"></i>\u05D9\u05D9\u05E6\u05D5\u05D0</button>
            <button class="btn btn-danger btn-sm" onclick="Pages.bulkDelete()"><i class="bi bi-trash me-1"></i>\u05DE\u05D7\u05D9\u05E7\u05D4</button>
            <button class="btn btn-outline-light btn-sm" onclick="Pages.clearSelection()"><i class="bi bi-x-lg"></i></button>
          </div>
        </div>
      </div>

      <!-- Student List/Table -->
      <div id="students-list">${Utils.skeleton(4)}</div>

      <!-- Add/Edit Student Modal -->
      <div class="modal fade" id="student-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
        <div class="modal-header"><h5 class="modal-title" id="student-modal-title">\u05D4\u05D5\u05E1\u05E4\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body">
          <input type="hidden" id="sf-id">
          <div class="row g-3">
            <div class="col-md-6"><label class="form-label">\u05E9\u05DD \u05E4\u05E8\u05D8\u05D9 *</label><input type="text" class="form-control" id="sf-first-name" required></div>
            <div class="col-md-6"><label class="form-label">\u05E9\u05DD \u05DE\u05E9\u05E4\u05D7\u05D4</label><input type="text" class="form-control" id="sf-last-name"></div>
          </div>
          <div class="row g-3 mt-1">
            <div class="col-md-4"><label class="form-label">\u05DB\u05D9\u05EA\u05D4</label><input type="text" class="form-control" id="sf-class"></div>
            <div class="col-md-4"><label class="form-label">\u05D8\u05DC\u05E4\u05D5\u05DF</label><input type="tel" class="form-control" id="sf-phone" dir="ltr"></div>
            <div class="col-md-4"><label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA \u05DC\u05D9\u05D3\u05D4</label><input type="date" class="form-control" id="sf-birthdate"></div>
          </div>
          <div class="row g-3 mt-1">
            <div class="col-md-4"><label class="form-label">\u05E1\u05D8\u05D8\u05D5\u05E1</label>
              <select class="form-select" id="sf-status">
                <option value="\u05E4\u05E2\u05D9\u05DC">\u05E4\u05E2\u05D9\u05DC</option>
                <option value="\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC">\u05DC\u05D0 \u05E4\u05E2\u05D9\u05DC</option>
              </select>
            </div>
            <div class="col-md-4"><label class="form-label">\u05DE\u05D2\u05D3\u05E8</label>
              <select class="form-select" id="sf-gender">
                <option value="">\u05D1\u05D7\u05E8...</option>
                <option value="\u05D6\u05DB\u05E8">\u05D6\u05DB\u05E8</option>
                <option value="\u05E0\u05E7\u05D1\u05D4">\u05E0\u05E7\u05D1\u05D4</option>
              </select>
            </div>
            <div class="col-md-4"><label class="form-label">\u05EA\u05E2\u05D5\u05D3\u05EA \u05D6\u05D4\u05D5\u05EA</label><input type="text" class="form-control" id="sf-id-number"></div>
          </div>
          <div class="row g-3 mt-1">
            <div class="col-md-6"><label class="form-label">\u05DB\u05EA\u05D5\u05D1\u05EA</label><input type="text" class="form-control" id="sf-address"></div>
            <div class="col-md-6"><label class="form-label">\u05E2\u05D9\u05E8</label><input type="text" class="form-control" id="sf-city"></div>
          </div>
          <div class="row g-3 mt-1">
            <div class="col-md-6"><label class="form-label">\u05D1\u05D9\u05EA \u05E1\u05E4\u05E8 \u05E7\u05D5\u05D3\u05DD</label><input type="text" class="form-control" id="sf-prev-school"></div>
            <div class="col-md-6"><label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05E8\u05E9\u05DE\u05D4</label><input type="date" class="form-control" id="sf-enroll-date"></div>
          </div>
          <div class="mb-3 mt-3"><label class="form-label">\u05D4\u05E2\u05E8\u05D5\u05EA</label><textarea class="form-control" id="sf-notes" rows="2"></textarea></div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button>
          <button class="btn btn-primary" onclick="Pages.saveStudent()"><i class="bi bi-check-lg me-1"></i>\u05E9\u05DE\u05D9\u05E8\u05D4</button>
        </div>
      </div></div></div>
    `;
  },

  async studentsInit() {
    let data;
    try {
      data = await App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
    } catch(e) {
      data = [];
    }
    if (!data || !data.length) {
      if (this._studentsUseDemo) {
        data = this._studentsDemoData();
      } else {
        data = [];
      }
    }
    this._studentsData = data;
    this._studentsSelected = new Set();
    data.forEach(s => { s._fullName = Utils.fullName(s); s._id = Utils.rowId(s); });

    // Populate class filter
    const classes = [...new Set(data.map(s => s['\u05DB\u05D9\u05EA\u05D4']).filter(Boolean))].sort();
    const classFilter = document.getElementById('students-class-filter');
    if (classFilter) {
      classes.forEach(c => { classFilter.insertAdjacentHTML('beforeend', `<option value="${c}">${c}</option>`); });
    }

    // Assign class colors
    this._classColors = {};
    classes.forEach(c => this._getClassColor(c));

    // Bind events
    const render = () => this.renderStudentsList();
    document.getElementById('students-search')?.addEventListener('input', Utils.debounce(render, 200));
    document.getElementById('students-class-filter')?.addEventListener('change', render);
    document.getElementById('students-status-filter')?.addEventListener('change', render);

    // Render stats + list
    this.renderStudentsStats(data, classes);
    this.renderStudentsList();
  },

  /* ---- Statistics Header ---- */
  renderStudentsStats(data, classes) {
    const container = document.getElementById('students-stats');
    if (!container) return;
    const total = data.length;
    const active = data.filter(s => s['\u05E1\u05D8\u05D8\u05D5\u05E1'] !== '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC').length;
    const male = data.filter(s => (s['\u05DE\u05D2\u05D3\u05E8']||'') === '\u05D6\u05DB\u05E8').length;
    const female = data.filter(s => (s['\u05DE\u05D2\u05D3\u05E8']||'') === '\u05E0\u05E7\u05D1\u05D4').length;
    const unknown = total - male - female;

    // Per-class mini bars
    const classStats = classes.map(c => {
      const count = data.filter(s => s['\u05DB\u05D9\u05EA\u05D4'] === c).length;
      const pct = total ? Math.round(count / total * 100) : 0;
      const color = this._getClassColor(c);
      return `<div class="d-flex align-items-center gap-2 mb-1">
        <span class="badge" style="background:${color};min-width:50px">${c}</span>
        <div class="progress flex-grow-1" style="height:8px">
          <div class="progress-bar" style="width:${pct}%;background:${color}"></div>
        </div>
        <small class="text-muted" style="min-width:40px">${count}</small>
      </div>`;
    }).join('');

    container.innerHTML = `
      <div class="col-md-3">
        <div class="card p-3 text-center">
          <div class="fs-2 fw-bold text-primary">${total}</div>
          <small class="text-muted">\u05E1\u05D4"\u05DB \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</small>
          <div class="mt-1"><span class="badge bg-success">${active} \u05E4\u05E2\u05D9\u05DC\u05D9\u05DD</span>
          ${total - active > 0 ? `<span class="badge bg-secondary ms-1">${total - active} \u05DC\u05D0 \u05E4\u05E2\u05D9\u05DC\u05D9\u05DD</span>` : ''}</div>
        </div>
      </div>
      <div class="col-md-5">
        <div class="card p-3">
          <div class="fw-bold mb-2"><i class="bi bi-bar-chart me-1"></i>\u05E4\u05D9\u05DC\u05D5\u05D7 \u05DC\u05E4\u05D9 \u05DB\u05D9\u05EA\u05D5\u05EA</div>
          ${classStats || '<div class="text-muted small">\u05D0\u05D9\u05DF \u05DB\u05D9\u05EA\u05D5\u05EA</div>'}
        </div>
      </div>
      <div class="col-md-4">
        <div class="card p-3 text-center">
          <div class="fw-bold mb-2"><i class="bi bi-gender-ambiguous me-1"></i>\u05E4\u05D9\u05DC\u05D5\u05D7 \u05DE\u05D2\u05D3\u05E8</div>
          <div class="d-flex justify-content-center gap-3">
            <div><div class="fs-4 fw-bold text-primary">${male}</div><small class="text-muted">\u05D6\u05DB\u05E8</small></div>
            <div><div class="fs-4 fw-bold text-danger">${female}</div><small class="text-muted">\u05E0\u05E7\u05D1\u05D4</small></div>
            ${unknown > 0 ? `<div><div class="fs-4 fw-bold text-secondary">${unknown}</div><small class="text-muted">\u05DC\u05D0 \u05E6\u05D5\u05D9\u05DF</small></div>` : ''}
          </div>
          ${total > 0 ? `<div class="progress mt-2" style="height:6px">
            <div class="progress-bar bg-primary" style="width:${Math.round(male/total*100)}%"></div>
            <div class="progress-bar bg-danger" style="width:${Math.round(female/total*100)}%"></div>
            <div class="progress-bar bg-secondary" style="width:${Math.round(unknown/total*100)}%"></div>
          </div>` : ''}
        </div>
      </div>
    `;
  },

  /* ---- View Toggle ---- */
  setStudentsView(view) {
    this._studentsView = view;
    localStorage.setItem('bht_students_view', view);
    document.querySelectorAll('.btn-group .btn').forEach(b => b.classList.remove('active'));
    const btns = document.querySelectorAll('.btn-group .btn');
    if (view === 'cards' && btns[0]) btns[0].classList.add('active');
    if (view === 'table' && btns[1]) btns[1].classList.add('active');
    this.renderStudentsList();
  },

  /* ---- Clear Filters ---- */
  clearStudentFilters() {
    const search = document.getElementById('students-search');
    const classF = document.getElementById('students-class-filter');
    const statusF = document.getElementById('students-status-filter');
    if (search) search.value = '';
    if (classF) classF.value = '';
    if (statusF) statusF.value = '';
    this.renderStudentsList();
  },

  /* ---- Render List ---- */
  renderStudentsList() {
    const search = (document.getElementById('students-search')?.value || '').trim().toLowerCase();
    const classF = document.getElementById('students-class-filter')?.value || '';
    const statusF = document.getElementById('students-status-filter')?.value || '';

    let filtered = this._studentsData.filter(s => {
      if (search && !(s._fullName || '').toLowerCase().includes(search) && !(s['\u05D8\u05DC\u05E4\u05D5\u05DF']||'').includes(search)) return false;
      if (classF && s['\u05DB\u05D9\u05EA\u05D4'] !== classF) return false;
      if (statusF && s['\u05E1\u05D8\u05D8\u05D5\u05E1'] !== statusF) return false;
      return true;
    });

    // Sort for table view
    if (this._studentsView === 'table') {
      const { col, asc } = this._studentsSort;
      filtered.sort((a, b) => {
        let va, vb;
        switch (col) {
          case 'name': va = a._fullName || ''; vb = b._fullName || ''; break;
          case 'class': va = a['\u05DB\u05D9\u05EA\u05D4'] || ''; vb = b['\u05DB\u05D9\u05EA\u05D4'] || ''; break;
          case 'age':
            va = Utils.calcAge(a['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4']) || 0;
            vb = Utils.calcAge(b['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4']) || 0;
            return asc ? va - vb : vb - va;
          case 'phone': va = a['\u05D8\u05DC\u05E4\u05D5\u05DF'] || ''; vb = b['\u05D8\u05DC\u05E4\u05D5\u05DF'] || ''; break;
          case 'status': va = a['\u05E1\u05D8\u05D8\u05D5\u05E1'] || ''; vb = b['\u05E1\u05D8\u05D8\u05D5\u05E1'] || ''; break;
          default: va = ''; vb = '';
        }
        if (typeof va === 'string') return asc ? va.localeCompare(vb, 'he') : vb.localeCompare(va, 'he');
        return asc ? va - vb : vb - va;
      });
    }

    document.getElementById('students-count').textContent = `${filtered.length} \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD`;

    if (filtered.length === 0) {
      const isReallyEmpty = !this._studentsData.length && !this._studentsUseDemo;
      document.getElementById('students-list').innerHTML = isReallyEmpty
        ? '<div class="empty-state text-center py-5"><i class="bi bi-people fs-1 text-muted d-block mb-2"></i><h5>\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05E2\u05D3\u05D9\u05D9\u05DF</h5><p class="text-muted">\u05D4\u05D5\u05E1\u05E3 \u05EA\u05DC\u05DE\u05D9\u05D3 \u05E8\u05D0\u05E9\u05D5\u05DF</p><a href="#" class="btn btn-sm btn-outline-secondary mt-2" onclick="Pages.studentsLoadDemo();return false"><i class="bi bi-database me-1"></i>\u05D8\u05E2\u05DF \u05D3\u05DE\u05D5</a></div>'
        : '<div class="empty-state"><i class="bi bi-search"></i><h5>\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</h5></div>';
      return;
    }

    if (this._studentsView === 'table') {
      this._renderStudentsTable(filtered);
    } else {
      this._renderStudentsCards(filtered);
    }
    this._updateBulkBar();
  },

  /* ---- Cards View ---- */
  _renderStudentsCards(filtered) {
    document.getElementById('students-list').innerHTML = `<div class="row g-3">${filtered.map(s => {
      const name = s._fullName || '';
      const cls = s['\u05DB\u05D9\u05EA\u05D4'] || '';
      const age = Utils.calcAge(s['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4']);
      const phone = s['\u05D8\u05DC\u05E4\u05D5\u05DF'] || '';
      const classColor = this._getClassColor(cls);
      const isSelected = this._studentsSelected.has(s._id);
      const initials = Utils.getInitials(name);

      return `<div class="col-md-6 col-lg-4">
        <div class="card card-clickable p-3 ${isSelected ? 'border-primary border-2' : ''}" style="border-top:3px solid ${classColor}">
          <div class="d-flex align-items-start gap-3">
            <div class="position-relative" onclick="event.stopPropagation();Pages.toggleStudent('${s._id}')">
              <div class="avatar" style="background:${classColor};cursor:pointer">${initials}</div>
              ${isSelected ? '<i class="bi bi-check-circle-fill text-primary position-absolute" style="bottom:-2px;left:-2px;font-size:.8rem;background:#fff;border-radius:50%"></i>' : ''}
            </div>
            <div class="flex-grow-1 min-width-0" onclick="location.hash='student/${s._id}'" style="cursor:pointer">
              <div class="fw-bold text-truncate">${name}</div>
              <small class="text-muted">\u05DB\u05D9\u05EA\u05D4 ${cls}${age ? ' | \u05D2\u05D9\u05DC ' + age : ''}</small>
              ${phone ? `<div class="small text-muted mt-1" dir="ltr"><i class="bi bi-telephone me-1"></i>${Utils.formatPhone(phone)}</div>` : ''}
            </div>
            <div class="d-flex flex-column align-items-end gap-1">
              ${Utils.statusBadge(s['\u05E1\u05D8\u05D8\u05D5\u05E1'])}
              <div class="d-flex gap-1">
                <button class="btn btn-sm btn-outline-primary" onclick="event.stopPropagation();Pages.showStudentForm(Pages._studentsData.find(x=>x._id==='${s._id}'))" title="\u05E2\u05E8\u05D9\u05DB\u05D4"><i class="bi bi-pencil"></i></button>
                <button class="btn btn-sm btn-outline-danger" onclick="event.stopPropagation();Pages.deleteStudent('${s._id}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    }).join('')}</div>`;
  },

  /* ---- Table View ---- */
  _renderStudentsTable(filtered) {
    const sortIcon = (col) => {
      if (this._studentsSort.col !== col) return '<i class="bi bi-arrow-down-up text-muted opacity-25 ms-1"></i>';
      return this._studentsSort.asc
        ? '<i class="bi bi-sort-up text-primary ms-1"></i>'
        : '<i class="bi bi-sort-down text-primary ms-1"></i>';
    };

    document.getElementById('students-list').innerHTML = `
      <div class="card">
        <div class="table-responsive">
          <table class="table table-bht table-hover mb-0">
            <thead>
              <tr>
                <th style="width:40px"><input type="checkbox" class="form-check-input" onchange="Pages.toggleSelectAll(this.checked)" ${this._studentsSelected.size === filtered.length && filtered.length > 0 ? 'checked' : ''}></th>
                <th style="cursor:pointer" onclick="Pages.sortStudents('name')">\u05E9\u05DD ${sortIcon('name')}</th>
                <th style="cursor:pointer" onclick="Pages.sortStudents('class')">\u05DB\u05D9\u05EA\u05D4 ${sortIcon('class')}</th>
                <th style="cursor:pointer" onclick="Pages.sortStudents('age')">\u05D2\u05D9\u05DC ${sortIcon('age')}</th>
                <th style="cursor:pointer" onclick="Pages.sortStudents('phone')">\u05D8\u05DC\u05E4\u05D5\u05DF ${sortIcon('phone')}</th>
                <th style="cursor:pointer" onclick="Pages.sortStudents('status')">\u05E1\u05D8\u05D8\u05D5\u05E1 ${sortIcon('status')}</th>
                <th>\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.map(s => {
                const name = s._fullName || '';
                const cls = s['\u05DB\u05D9\u05EA\u05D4'] || '';
                const age = Utils.calcAge(s['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4']);
                const phone = s['\u05D8\u05DC\u05E4\u05D5\u05DF'] || '';
                const classColor = this._getClassColor(cls);
                const isSelected = this._studentsSelected.has(s._id);
                return `<tr class="${isSelected ? 'table-primary' : ''}" style="cursor:pointer" onclick="location.hash='student/${s._id}'">
                  <td onclick="event.stopPropagation()"><input type="checkbox" class="form-check-input" ${isSelected ? 'checked' : ''} onchange="Pages.toggleStudent('${s._id}')"></td>
                  <td>
                    <div class="d-flex align-items-center gap-2">
                      <div class="avatar avatar-sm" style="background:${classColor}">${Utils.getInitials(name)}</div>
                      <span class="fw-bold">${name}</span>
                    </div>
                  </td>
                  <td><span class="badge" style="background:${classColor}">${cls}</span></td>
                  <td>${age || '--'}</td>
                  <td dir="ltr">${Utils.formatPhone(phone)}</td>
                  <td>${Utils.statusBadge(s['\u05E1\u05D8\u05D8\u05D5\u05E1'])}</td>
                  <td onclick="event.stopPropagation()">
                    <div class="d-flex gap-1">
                      <button class="btn btn-sm btn-outline-primary" onclick="Pages.showStudentForm(Pages._studentsData.find(x=>x._id==='${s._id}'))" title="\u05E2\u05E8\u05D9\u05DB\u05D4"><i class="bi bi-pencil"></i></button>
                      <button class="btn btn-sm btn-outline-danger" onclick="Pages.deleteStudent('${s._id}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button>
                    </div>
                  </td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  },

  /* ---- Sort ---- */
  sortStudents(col) {
    if (this._studentsSort.col === col) {
      this._studentsSort.asc = !this._studentsSort.asc;
    } else {
      this._studentsSort = { col, asc: true };
    }
    this.renderStudentsList();
  },

  /* ---- Selection / Bulk ---- */
  toggleStudent(id) {
    if (this._studentsSelected.has(id)) {
      this._studentsSelected.delete(id);
    } else {
      this._studentsSelected.add(id);
    }
    this.renderStudentsList();
  },

  toggleSelectAll(checked) {
    const search = (document.getElementById('students-search')?.value || '').trim().toLowerCase();
    const classF = document.getElementById('students-class-filter')?.value || '';
    const statusF = document.getElementById('students-status-filter')?.value || '';

    const filtered = this._studentsData.filter(s => {
      if (search && !(s._fullName || '').toLowerCase().includes(search) && !(s['\u05D8\u05DC\u05E4\u05D5\u05DF']||'').includes(search)) return false;
      if (classF && s['\u05DB\u05D9\u05EA\u05D4'] !== classF) return false;
      if (statusF && s['\u05E1\u05D8\u05D8\u05D5\u05E1'] !== statusF) return false;
      return true;
    });

    if (checked) {
      filtered.forEach(s => this._studentsSelected.add(s._id));
    } else {
      this._studentsSelected.clear();
    }
    this.renderStudentsList();
  },

  clearSelection() {
    this._studentsSelected.clear();
    this.renderStudentsList();
  },

  _updateBulkBar() {
    const bar = document.getElementById('students-bulk-bar');
    const countEl = document.getElementById('students-selected-count');
    if (!bar) return;
    if (this._studentsSelected.size > 0) {
      bar.classList.remove('d-none');
      if (countEl) countEl.textContent = `${this._studentsSelected.size} \u05E0\u05D1\u05D7\u05E8\u05D5`;
    } else {
      bar.classList.add('d-none');
    }
  },

  /* ---- Bulk Actions ---- */
  bulkMessage() {
    const selected = this._studentsData.filter(s => this._studentsSelected.has(s._id));
    const phones = selected.map(s => s['\u05D8\u05DC\u05E4\u05D5\u05DF']).filter(Boolean);
    if (!phones.length) { Utils.toast('\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05DE\u05E1\u05E4\u05E8\u05D9 \u05D8\u05DC\u05E4\u05D5\u05DF', 'warning'); return; }
    const names = selected.map(s => s._fullName).join(', ');
    const msg = prompt(`\u05E9\u05DC\u05D7 \u05D4\u05D5\u05D3\u05E2\u05D4 \u05DC-${selected.length} \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD:\n${names}`);
    if (!msg) return;
    // Open WhatsApp for each (limit to 5)
    const toSend = phones.slice(0, 5);
    toSend.forEach((ph, i) => {
      const num = ph.replace(/\D/g, '').replace(/^0/, '972');
      setTimeout(() => window.open(`https://wa.me/${num}?text=${encodeURIComponent(msg)}`, '_blank'), i * 500);
    });
    if (phones.length > 5) Utils.toast(`\u05E0\u05E4\u05EA\u05D7\u05D5 5 \u05DE\u05EA\u05D5\u05DA ${phones.length}. \u05E9\u05DC\u05D7 \u05D1\u05E7\u05D1\u05D5\u05E6\u05D5\u05EA \u05E7\u05D8\u05E0\u05D5\u05EA \u05D9\u05D5\u05EA\u05E8.`, 'info');
    else Utils.toast(`\u05D4\u05D5\u05D3\u05E2\u05D4 \u05E0\u05E9\u05DC\u05D7\u05D4 \u05DC-${toSend.length} \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD`);
  },

  bulkExport() {
    const selected = this._studentsData.filter(s => this._studentsSelected.has(s._id));
    if (!selected.length) { Utils.toast('\u05DC\u05D0 \u05E0\u05D1\u05D7\u05E8\u05D5 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD', 'warning'); return; }
    this._exportCSV(selected, 'selected_students');
  },

  async bulkDelete() {
    const count = this._studentsSelected.size;
    if (!count) return;
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD', `\u05D4\u05D0\u05DD \u05DC\u05DE\u05D7\u05D5\u05E7 ${count} \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD?`)) return;
    let deleted = 0;
    for (const id of this._studentsSelected) {
      try { await App.apiCall('delete', '\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD', { id }); deleted++; } catch (e) {}
    }
    this._studentsSelected.clear();
    Utils.toast(`${deleted} \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05E0\u05DE\u05D7\u05E7\u05D5`);
    this.studentsInit();
  },

  /* ---- Add/Edit Form ---- */
  showStudentForm(student = null) {
    document.getElementById('student-modal-title').textContent = student ? '\u05E2\u05E8\u05D9\u05DB\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3' : '\u05D4\u05D5\u05E1\u05E4\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3';
    document.getElementById('sf-id').value = student ? Utils.rowId(student) : '';
    document.getElementById('sf-first-name').value = student?.['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9'] || '';
    document.getElementById('sf-last-name').value = student?.['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4'] || '';
    document.getElementById('sf-class').value = student?.['\u05DB\u05D9\u05EA\u05D4'] || '';
    document.getElementById('sf-phone').value = student?.['\u05D8\u05DC\u05E4\u05D5\u05DF'] || '';
    document.getElementById('sf-birthdate').value = student?.['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4'] || '';
    document.getElementById('sf-status').value = student?.['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '\u05E4\u05E2\u05D9\u05DC';
    document.getElementById('sf-gender').value = student?.['\u05DE\u05D2\u05D3\u05E8'] || '';
    document.getElementById('sf-id-number').value = student?.['\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA'] || '';
    document.getElementById('sf-address').value = student?.['\u05DB\u05EA\u05D5\u05D1\u05EA'] || '';
    document.getElementById('sf-city').value = student?.['\u05E2\u05D9\u05E8'] || '';
    document.getElementById('sf-prev-school').value = student?.['\u05D1\u05D9\u05EA_\u05E1\u05E4\u05E8_\u05E7\u05D5\u05D3\u05DD'] || '';
    document.getElementById('sf-enroll-date').value = student?.['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05E8\u05E9\u05DE\u05D4'] || '';
    document.getElementById('sf-notes').value = student?.['\u05D4\u05E2\u05E8\u05D5\u05EA'] || '';
    new bootstrap.Modal(document.getElementById('student-modal')).show();
  },

  async saveStudent() {
    const id = document.getElementById('sf-id').value;
    const firstName = document.getElementById('sf-first-name').value.trim();
    const lastName = document.getElementById('sf-last-name').value.trim();
    if (!firstName) { Utils.toast('\u05E0\u05D0 \u05DC\u05D4\u05D6\u05D9\u05DF \u05E9\u05DD \u05E4\u05E8\u05D8\u05D9', 'warning'); return; }

    const phone = document.getElementById('sf-phone').value.trim();
    if (phone && !/^0\d{8,9}$/.test(phone.replace(/[-\s]/g, ''))) { Utils.toast('\u05DE\u05E1\u05E4\u05E8 \u05D8\u05DC\u05E4\u05D5\u05DF \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF', 'warning'); return; }

    const row = {
      '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': firstName,
      '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': lastName,
      '\u05DB\u05D9\u05EA\u05D4': document.getElementById('sf-class').value.trim(),
      '\u05D8\u05DC\u05E4\u05D5\u05DF': phone,
      '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': document.getElementById('sf-birthdate').value,
      '\u05E1\u05D8\u05D8\u05D5\u05E1': document.getElementById('sf-status').value,
      '\u05DE\u05D2\u05D3\u05E8': document.getElementById('sf-gender').value,
      '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': document.getElementById('sf-id-number').value.trim(),
      '\u05DB\u05EA\u05D5\u05D1\u05EA': document.getElementById('sf-address').value.trim(),
      '\u05E2\u05D9\u05E8': document.getElementById('sf-city').value.trim(),
      '\u05D1\u05D9\u05EA_\u05E1\u05E4\u05E8_\u05E7\u05D5\u05D3\u05DD': document.getElementById('sf-prev-school').value.trim(),
      '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05E8\u05E9\u05DE\u05D4': document.getElementById('sf-enroll-date').value,
      '\u05D4\u05E2\u05E8\u05D5\u05EA': document.getElementById('sf-notes').value.trim(),
    };

    try {
      if (id) { await App.apiCall('update', '\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD', { id, row }); }
      else { await App.apiCall('add', '\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD', { row }); }
      bootstrap.Modal.getInstance(document.getElementById('student-modal')).hide();
      Utils.toast(id ? '\u05EA\u05DC\u05DE\u05D9\u05D3 \u05E2\u05D5\u05D3\u05DB\u05DF' : '\u05EA\u05DC\u05DE\u05D9\u05D3 \u05E0\u05D5\u05E1\u05E3', 'success');
      this.studentsInit();
    } catch (e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05E9\u05DE\u05D9\u05E8\u05D4', 'danger'); }
  },

  async deleteStudent(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3', '\u05D4\u05D0\u05DD \u05DC\u05DE\u05D7\u05D5\u05E7 \u05D0\u05EA \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3?')) return;
    try {
      await App.apiCall('delete', '\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD', { id });
      Utils.toast('\u05EA\u05DC\u05DE\u05D9\u05D3 \u05E0\u05DE\u05D7\u05E7');
      this.studentsInit();
    } catch (e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4', 'danger'); }
  },

  /* ---- CSV Export ---- */
  _exportCSV(rows, filename) {
    if (!rows.length) { Utils.toast('\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD', 'warning'); return; }
    let csv = '\uFEFF\u05E9\u05DD,\u05DB\u05D9\u05EA\u05D4,\u05D8\u05DC\u05E4\u05D5\u05DF,\u05E1\u05D8\u05D8\u05D5\u05E1,\u05EA\u05D0\u05E8\u05D9\u05DA \u05DC\u05D9\u05D3\u05D4,\u05DB\u05EA\u05D5\u05D1\u05EA,\u05DE\u05D2\u05D3\u05E8,\u05E2\u05D9\u05E8\n';
    rows.forEach(s => {
      csv += `"${Utils.fullName(s)}","${s['\u05DB\u05D9\u05EA\u05D4']||''}","${s['\u05D8\u05DC\u05E4\u05D5\u05DF']||''}","${s['\u05E1\u05D8\u05D8\u05D5\u05E1']||''}","${s['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4']||''}","${s['\u05DB\u05EA\u05D5\u05D1\u05EA']||''}","${s['\u05DE\u05D2\u05D3\u05E8']||''}","${s['\u05E2\u05D9\u05E8']||''}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename + '_' + Utils.todayISO() + '.csv';
    link.click();
    Utils.toast('\u05E7\u05D5\u05D1\u05E5 CSV \u05D9\u05D5\u05E6\u05D0');
  },

  exportStudentsCSV() {
    this._exportCSV(this._studentsData || [], 'students');
  },

  /* ---- Bulk Add (paste) ---- */
  showBulkAddStudents() {
    document.getElementById('bulk-student-modal')?.remove();
    const html = `<div class="modal fade" id="bulk-student-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><h5>\u05D4\u05D5\u05E1\u05E4\u05D4 \u05DE\u05E8\u05D5\u05D1\u05D4</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body">
    <p class="text-muted small">\u05D4\u05D3\u05D1\u05E7 \u05E9\u05DE\u05D5\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD, \u05D0\u05D7\u05D3 \u05D1\u05DB\u05DC \u05E9\u05D5\u05E8\u05D4. \u05E4\u05D5\u05E8\u05DE\u05D8: \u05E9\u05DD \u05E4\u05E8\u05D8\u05D9 \u05E9\u05DD \u05DE\u05E9\u05E4\u05D7\u05D4, \u05DB\u05D9\u05EA\u05D4</p>
    <textarea class="form-control" id="bulk-students-text" rows="10" placeholder="\u05D9\u05D5\u05E1\u05E3 \u05DB\u05D4\u05DF, \u05D0\n\u05DE\u05E9\u05D4 \u05DC\u05D5\u05D9, \u05D1\n\u05D0\u05D1\u05E8\u05D4\u05DD \u05D2\u05D5\u05DC\u05D3\u05E9\u05D8\u05D9\u05D9\u05DF, \u05D0"></textarea>
    </div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveBulkStudents()">\u05D4\u05D5\u05E1\u05E3 \u05D4\u05DB\u05DC</button></div></div></div></div>`;
    document.body.insertAdjacentHTML('beforeend', html);
    new bootstrap.Modal(document.getElementById('bulk-student-modal')).show();
  },

  async saveBulkStudents() {
    const text = document.getElementById('bulk-students-text')?.value?.trim();
    if (!text) { Utils.toast('\u05D4\u05D3\u05D1\u05E7 \u05E9\u05DE\u05D5\u05EA', 'warning'); return; }
    const lines = text.split('\n').filter(l => l.trim());
    let added = 0;
    for (const line of lines) {
      const parts = line.split(',');
      const nameParts = (parts[0] || '').trim().split(/\s+/);
      const cls = (parts[1] || '').trim();
      const row = { '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': nameParts[0] || '', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': nameParts.slice(1).join(' ') || '', '\u05DB\u05D9\u05EA\u05D4': cls, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC' };
      if (row['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9']) {
        try { await App.apiCall('add', '\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD', { row }); added++; } catch (e) {}
      }
    }
    bootstrap.Modal.getInstance(document.getElementById('bulk-student-modal'))?.hide();
    Utils.toast(added + ' \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05E0\u05D5\u05E1\u05E4\u05D5');
    this.studentsInit();
  },

  /* ---- Import CSV ---- */
  showImportCSV() {
    document.getElementById('import-csv-modal')?.remove();
    const template = '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9,\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4,\u05DB\u05D9\u05EA\u05D4,\u05D8\u05DC\u05E4\u05D5\u05DF,\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4,\u05E1\u05D8\u05D8\u05D5\u05E1,\u05DB\u05EA\u05D5\u05D1\u05EA,\u05DE\u05D2\u05D3\u05E8';
    const html = `<div class="modal fade" id="import-csv-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
      <div class="modal-header"><h5>\u05D9\u05D9\u05D1\u05D5\u05D0 CSV</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <div class="alert alert-info small">
          <i class="bi bi-info-circle me-1"></i>\u05D4\u05D3\u05D1\u05E7 \u05EA\u05D5\u05DB\u05DF CSV \u05DB\u05D0\u05DF. \u05D4\u05E9\u05D5\u05E8\u05D4 \u05D4\u05E8\u05D0\u05E9\u05D5\u05E0\u05D4 \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05D9\u05D5\u05EA \u05DB\u05D5\u05EA\u05E8\u05D5\u05EA.
          <br><button class="btn btn-sm btn-outline-info mt-1" onclick="Pages._downloadCSVTemplate()">\u05D4\u05D5\u05E8\u05D3 \u05EA\u05D1\u05E0\u05D9\u05EA</button>
        </div>
        <textarea class="form-control font-monospace" id="import-csv-text" rows="12" dir="ltr" placeholder="${template}\n\u05D9\u05D5\u05E1\u05E3,\u05DB\u05D4\u05DF,\u05D0,050-1234567,2010-01-01,\u05E4\u05E2\u05D9\u05DC,\u05D9\u05E8\u05D5\u05E9\u05DC\u05D9\u05DD,\u05D6\u05DB\u05E8"></textarea>
        <div id="import-csv-preview" class="mt-3"></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button>
        <button class="btn btn-outline-primary" onclick="Pages._previewCSV()">\u05EA\u05E6\u05D5\u05D2\u05D4 \u05DE\u05E7\u05D3\u05D9\u05DE\u05D4</button>
        <button class="btn btn-primary" onclick="Pages._importCSV()">\u05D9\u05D9\u05D1\u05D0 \u05D4\u05DB\u05DC</button>
      </div>
    </div></div></div>`;
    document.body.insertAdjacentHTML('beforeend', html);
    new bootstrap.Modal(document.getElementById('import-csv-modal')).show();
  },

  _downloadCSVTemplate() {
    const csv = '\uFEFF\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9,\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4,\u05DB\u05D9\u05EA\u05D4,\u05D8\u05DC\u05E4\u05D5\u05DF,\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4,\u05E1\u05D8\u05D8\u05D5\u05E1,\u05DB\u05EA\u05D5\u05D1\u05EA,\u05DE\u05D2\u05D3\u05E8\n';
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'students_template.csv';
    link.click();
  },

  _parseCSV(text) {
    const lines = text.trim().split('\n').filter(l => l.trim());
    if (lines.length < 2) return [];
    const headers = lines[0].split(',').map(h => h.trim());
    return lines.slice(1).map(line => {
      const vals = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      const obj = {};
      headers.forEach((h, i) => { obj[h] = vals[i] || ''; });
      return obj;
    });
  },

  _previewCSV() {
    const text = document.getElementById('import-csv-text')?.value;
    if (!text?.trim()) { Utils.toast('\u05D4\u05D3\u05D1\u05E7 \u05EA\u05D5\u05DB\u05DF CSV', 'warning'); return; }
    const rows = this._parseCSV(text);
    if (!rows.length) { Utils.toast('\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05E9\u05D5\u05E8\u05D5\u05EA', 'warning'); return; }
    const preview = document.getElementById('import-csv-preview');
    preview.innerHTML = `<div class="alert alert-success small"><i class="bi bi-check-circle me-1"></i>\u05E0\u05DE\u05E6\u05D0\u05D5 ${rows.length} \u05E9\u05D5\u05E8\u05D5\u05EA \u05DC\u05D9\u05D9\u05D1\u05D5\u05D0</div>
      <div class="table-responsive" style="max-height:200px;overflow:auto"><table class="table table-sm table-bordered"><thead><tr>
      ${Object.keys(rows[0]).map(h => `<th class="small">${h}</th>`).join('')}
      </tr></thead><tbody>${rows.slice(0, 5).map(r => `<tr>${Object.values(r).map(v => `<td class="small">${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
      ${rows.length > 5 ? `<small class="text-muted">\u05D5\u05E2\u05D5\u05D3 ${rows.length - 5} \u05E9\u05D5\u05E8\u05D5\u05EA...</small>` : ''}`;
  },

  async _importCSV() {
    const text = document.getElementById('import-csv-text')?.value;
    if (!text?.trim()) { Utils.toast('\u05D4\u05D3\u05D1\u05E7 \u05EA\u05D5\u05DB\u05DF CSV', 'warning'); return; }
    const rows = this._parseCSV(text);
    if (!rows.length) { Utils.toast('\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05E9\u05D5\u05E8\u05D5\u05EA', 'warning'); return; }
    let added = 0;
    for (const r of rows) {
      if (!r['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9']) continue;
      const row = {
        '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': r['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9'] || '',
        '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': r['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4'] || '',
        '\u05DB\u05D9\u05EA\u05D4': r['\u05DB\u05D9\u05EA\u05D4'] || '',
        '\u05D8\u05DC\u05E4\u05D5\u05DF': r['\u05D8\u05DC\u05E4\u05D5\u05DF'] || '',
        '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': r['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4'] || '',
        '\u05E1\u05D8\u05D8\u05D5\u05E1': r['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '\u05E4\u05E2\u05D9\u05DC',
        '\u05DB\u05EA\u05D5\u05D1\u05EA': r['\u05DB\u05EA\u05D5\u05D1\u05EA'] || '',
        '\u05DE\u05D2\u05D3\u05E8': r['\u05DE\u05D2\u05D3\u05E8'] || '',
      };
      try { await App.apiCall('add', '\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD', { row }); added++; } catch (e) {}
    }
    bootstrap.Modal.getInstance(document.getElementById('import-csv-modal'))?.hide();
    Utils.toast(`${added} \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05D9\u05D5\u05D1\u05D0\u05D5`);
    this.studentsInit();
  },


  /* ======================================================================
     PRINT STUDENT REPORT CARD
     ====================================================================== */
  async printStudentCard(id) {
    const students = await App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
    const s = students.find(x => String(Utils.rowId(x)) === String(id));
    if (!s) return;
    const name = Utils.fullName(s);
    const att = await App.getData('\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA');
    const studentAtt = att.filter(a => (a['\u05E9\u05DD']||a['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3']||a['\u05EA\u05DC\u05DE\u05D9\u05D3']||'') === name || String(a['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4']||a['\u05EA\u05DC\u05DE\u05D9\u05D3']||'') === String(id));
    const present = studentAtt.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E0\u05D5\u05DB\u05D7').length;
    const attPct = studentAtt.length ? Math.round(present/studentAtt.length*100) : 0;

    const grades = await App.getData('\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD').catch(()=>[]);
    const studentGrades = grades.filter(g => (g['\u05E9\u05DD']||g['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3']||g['\u05EA\u05DC\u05DE\u05D9\u05D3']||'') === name || String(g['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4']||g['\u05EA\u05DC\u05DE\u05D9\u05D3']||'') === String(id));
    const avgGrade = studentGrades.length ? Math.round(studentGrades.reduce((s,g)=>s+(Number(g['\u05E6\u05D9\u05D5\u05DF']||g['grade']||0)),0)/studentGrades.length) : null;

    const behavior = await App.getData('\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA').catch(()=>[]);
    const studentBeh = behavior.filter(b => (b['\u05E9\u05DD']||b['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3']||b['\u05EA\u05DC\u05DE\u05D9\u05D3']||'') === name || String(b['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4']||b['\u05EA\u05DC\u05DE\u05D9\u05D3']||'') === String(id));
    const posB = studentBeh.filter(b => (b['\u05E1\u05D5\u05D2']||'') === '\u05D7\u05D9\u05D5\u05D1\u05D9').length;
    const negB = studentBeh.filter(b => (b['\u05E1\u05D5\u05D2']||'') === '\u05E9\u05DC\u05D9\u05DC\u05D9').length;

    const gradesTableRows = studentGrades.length > 0 ? studentGrades.slice(-20).reverse().map(g => {
      const grade = Number(g['\u05E6\u05D9\u05D5\u05DF']||g['grade']||0);
      return `<tr><td>${g['\u05DE\u05E7\u05E6\u05D5\u05E2']||g['subject']||''}</td><td>${g['\u05DE\u05D1\u05D7\u05DF']||g['exam']||''}</td><td style="font-weight:700;color:${grade>=80?'#0f9d58':grade>=60?'#f9ab00':'#ea4335'}">${grade}</td></tr>`;
    }).join('') : '';

    const win = window.open('','','width=800,height=600');
    win.document.write(`<html dir="rtl"><head><title>\u05DB\u05E8\u05D8\u05D9\u05E1 \u05EA\u05DC\u05DE\u05D9\u05D3 - ${name}</title>
      <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;700&display=swap" rel="stylesheet">
      <style>*{font-family:Heebo,sans-serif;margin:0;box-sizing:border-box}body{padding:2rem;max-width:800px;margin:0 auto;color:#1a1a1a}
      h1{color:#2563eb;border-bottom:3px solid #2563eb;padding-bottom:.5rem;margin-bottom:1rem;font-size:1.6rem}
      h2{color:#374151;font-size:1.1rem;margin:1.5rem 0 .5rem;border-bottom:1px solid #e5e7eb;padding-bottom:.3rem}
      table{width:100%;border-collapse:collapse;margin:.5rem 0}td,th{border:1px solid #ddd;padding:8px 10px;text-align:right}
      th{background:#f8f9fa;font-weight:700;font-size:.9rem}.stat{display:inline-block;text-align:center;padding:.8rem 1.5rem;border:1px solid #ddd;border-radius:8px;margin:.3rem}
      .stat .value{font-size:1.8rem;font-weight:700}.stat .label{font-size:.8rem;color:#6b7280}
      .logo{text-align:center;color:#2563eb;font-size:1.5rem;font-weight:700;margin-bottom:.5rem}
      .footer{text-align:center;margin-top:2rem;color:#999;font-size:.8rem;border-top:1px solid #eee;padding-top:.5rem}
      @media print{body{padding:1rem}}</style></head><body>
      <div class="logo">\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3</div>
      <h1>\u05DB\u05E8\u05D8\u05D9\u05E1 \u05EA\u05DC\u05DE\u05D9\u05D3</h1>
      <table><tr><th>\u05E9\u05DD</th><td>${name}</td><th>\u05DB\u05D9\u05EA\u05D4</th><td>${s['\u05DB\u05D9\u05EA\u05D4']||''}</td></tr>
      <tr><th>\u05D8\u05DC\u05E4\u05D5\u05DF</th><td>${s['\u05D8\u05DC\u05E4\u05D5\u05DF']||''}</td><th>\u05EA\u05D0\u05E8\u05D9\u05DA \u05DC\u05D9\u05D3\u05D4</th><td>${Utils.formatDate(s['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4'])}</td></tr>
      <tr><th>\u05DB\u05EA\u05D5\u05D1\u05EA</th><td colspan="3">${s['\u05DB\u05EA\u05D5\u05D1\u05EA']||''}</td></tr></table>

      <div style="text-align:center;margin:1.2rem 0">
        <div class="stat"><div class="value" style="color:${attPct>=80?'#0f9d58':attPct>=60?'#f9ab00':'#ea4335'}">${attPct}%</div><div class="label">\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</div></div>
        <div class="stat"><div class="value">${studentAtt.length}</div><div class="label">\u05D9\u05DE\u05D9 \u05E8\u05D9\u05E9\u05D5\u05DD</div></div>
        ${avgGrade !== null ? `<div class="stat"><div class="value" style="color:${avgGrade>=80?'#0f9d58':avgGrade>=60?'#f9ab00':'#ea4335'}">${avgGrade}</div><div class="label">\u05DE\u05DE\u05D5\u05E6\u05E2 \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD</div></div>` : ''}
        <div class="stat"><div class="value" style="color:${(posB-negB)>=0?'#0f9d58':'#ea4335'}">${posB-negB>=0?'+':''}${posB-negB}</div><div class="label">\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</div></div>
      </div>

      ${gradesTableRows ? `<h2>\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD</h2><table><tr><th>\u05DE\u05E7\u05E6\u05D5\u05E2</th><th>\u05DE\u05D1\u05D7\u05DF</th><th>\u05E6\u05D9\u05D5\u05DF</th></tr>${gradesTableRows}</table>` : ''}

      <div class="footer">\u05D4\u05D5\u05E4\u05E7 \u05D1-${Utils.formatDate(new Date())} | \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3</div>
    </body></html>`);
    win.document.close();
    win.print();
  },

  /* ======================================================================
     STUDENT CARD (Detail Page — 10 tabs)
     ====================================================================== */
  student(id) { return `<div id="student-card-content">${Utils.skeleton(3)}</div>`; },

  async studentInit(id) {
    const students = await App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
    const s = students.find(x => String(Utils.rowId(x)) === String(id) || String(x.id) === String(id));
    if (!s) {
      document.getElementById('student-card-content').innerHTML = `<div class="empty-state"><i class="bi bi-person-x"></i><h5>\u05EA\u05DC\u05DE\u05D9\u05D3 \u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0</h5><a href="#students" class="btn btn-primary mt-2">\u05D7\u05D6\u05E8\u05D4 \u05DC\u05E8\u05E9\u05D9\u05DE\u05D4</a></div>`;
      return;
    }
    const sId = String(Utils.rowId(s));
    const name = Utils.fullName(s);
    const age = Utils.calcAge(s['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4']);
    const phone = s['\u05D8\u05DC\u05E4\u05D5\u05DF'] || '';
    const cls = s['\u05DB\u05D9\u05EA\u05D4'] || '';
    const classColor = this._getClassColor(cls);

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
      <!-- Back + Actions -->
      <div class="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
        <a href="#students" class="btn btn-link text-decoration-none"><i class="bi bi-arrow-right me-1"></i>\u05D7\u05D6\u05E8\u05D4 \u05DC\u05E8\u05E9\u05D9\u05DE\u05D4</a>
        <div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-outline-secondary btn-sm" onclick="Pages.printStudentCard('${sId}')"><i class="bi bi-printer me-1"></i>\u05D4\u05D3\u05E4\u05E1\u05D4</button>
          <button class="btn btn-outline-primary btn-sm" onclick="Pages.showStudentForm(Pages._studentsData.find(x=>String(Utils.rowId(x))==='${sId}'))"><i class="bi bi-pencil me-1"></i>\u05E2\u05E8\u05D9\u05DB\u05D4</button>
          ${primaryPhone ? `<a href="${waLink(primaryPhone)}" target="_blank" class="btn btn-success btn-sm"><i class="bi bi-whatsapp me-1"></i>WhatsApp</a>` : ''}
          ${parentPhone && parentPhone !== phone ? `<a href="${waLink(parentPhone, '\u05E9\u05DC\u05D5\u05DD, \u05D0\u05E0\u05D9 \u05E4\u05D5\u05E0\u05D4 \u05DE\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3 \u05D1\u05E0\u05D5\u05D2\u05E2 \u05DC' + name)}" target="_blank" class="btn btn-outline-success btn-sm"><i class="bi bi-whatsapp me-1"></i>WhatsApp \u05DC\u05D4\u05D5\u05E8\u05D9\u05DD</a>` : ''}
          <button class="btn btn-outline-danger btn-sm" onclick="Pages.deleteStudent('${sId}')"><i class="bi bi-trash me-1"></i>\u05DE\u05D7\u05D9\u05E7\u05D4</button>
        </div>
      </div>

      <!-- Profile Header -->
      <div class="card overflow-hidden mb-3">
        <div class="student-header" style="border-top:4px solid ${classColor}">
          <div class="avatar avatar-xl" style="background:${classColor}">${Utils.getInitials(name)}</div>
          <h3 class="fw-bold mt-2 mb-1">${name}</h3>
          <div>\u05DB\u05D9\u05EA\u05D4 <span class="badge" style="background:${classColor}">${cls || '--'}</span>${age ? ` | \u05D2\u05D9\u05DC ${age}` : ''}</div>
          ${Utils.statusBadge(s['\u05E1\u05D8\u05D8\u05D5\u05E1'])}
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="row g-3 mb-3">
        <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold ${attPct >= 80 ? 'text-success' : attPct >= 60 ? 'text-warning' : 'text-danger'}">${attPct}%</div><small class="text-muted">\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</small><div class="progress mt-2" style="height:4px"><div class="progress-bar ${attPct >= 80 ? 'bg-success' : 'bg-warning'}" style="width:${attPct}%"></div></div></div></div>
        <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold ${(posB-negB) >= 0 ? 'text-success' : 'text-danger'}">${posB-negB >= 0 ? '+' : ''}${posB-negB}</div><small class="text-muted">\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</small></div></div>
        <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold">${Utils.formatCurrency(sfDebt)}</div><small class="text-muted">${sfDebt > 0 ? '\u05D7\u05D5\u05D1' : '\u05DE\u05D0\u05D5\u05D6\u05DF'}</small></div></div>
        <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-primary">${studentAtt.length}</div><small class="text-muted">\u05D9\u05DE\u05D9 \u05E8\u05D9\u05E9\u05D5\u05DD</small></div></div>
      </div>

      <!-- Tabs -->
      <ul class="nav nav-tabs-bht mb-3 flex-nowrap overflow-auto" role="tablist" style="white-space:nowrap">
        <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" href="#tab-info"><i class="bi bi-info-circle me-1"></i>\u05DE\u05D9\u05D3\u05E2</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-att"><i class="bi bi-calendar-check me-1"></i>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-grades"><i class="bi bi-mortarboard me-1"></i>\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-beh"><i class="bi bi-emoji-smile me-1"></i>\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-fin"><i class="bi bi-cash-stack me-1"></i>\u05DB\u05E1\u05E4\u05D9\u05DD</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-parents"><i class="bi bi-people me-1"></i>\u05D4\u05D5\u05E8\u05D9\u05DD</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-docs"><i class="bi bi-folder me-1"></i>\u05DE\u05E1\u05DE\u05DB\u05D9\u05DD</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-comm"><i class="bi bi-chat-dots me-1"></i>\u05EA\u05E7\u05E9\u05D5\u05E8\u05EA</a></li>
      </ul>
      <div class="tab-content">

        <!-- 1. Info -->
        <div class="tab-pane fade show active" id="tab-info"><div class="card p-3"><div class="row g-3">
          <div class="col-sm-6"><label class="form-label text-muted small">\u05E9\u05DD</label><div class="fw-bold">${name}</div></div>
          <div class="col-sm-6"><label class="form-label text-muted small">\u05DB\u05D9\u05EA\u05D4</label><div class="fw-bold">${cls || '--'}</div></div>
          <div class="col-sm-6"><label class="form-label text-muted small">\u05D8\u05DC\u05E4\u05D5\u05DF</label><div class="fw-bold" dir="ltr">${Utils.formatPhone(phone)}</div></div>
          <div class="col-sm-6"><label class="form-label text-muted small">\u05EA\u05D0\u05E8\u05D9\u05DA \u05DC\u05D9\u05D3\u05D4</label><div class="fw-bold">${Utils.formatDate(s['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4'])}</div></div>
          <div class="col-sm-6"><label class="form-label text-muted small">\u05E1\u05D8\u05D8\u05D5\u05E1</label><div>${Utils.statusBadge(s['\u05E1\u05D8\u05D8\u05D5\u05E1'])}</div></div>
          <div class="col-sm-6"><label class="form-label text-muted small">\u05DE\u05D2\u05D3\u05E8</label><div class="fw-bold">${s['\u05DE\u05D2\u05D3\u05E8'] || '--'}</div></div>
          <div class="col-sm-6"><label class="form-label text-muted small">\u05DB\u05EA\u05D5\u05D1\u05EA</label><div class="fw-bold">${s['\u05DB\u05EA\u05D5\u05D1\u05EA'] || '--'}</div></div>
          <div class="col-sm-6"><label class="form-label text-muted small">\u05E2\u05D9\u05E8</label><div class="fw-bold">${s['\u05E2\u05D9\u05E8'] || s['\u05e2\u05d9\u05e8'] || '--'}</div></div>
          <div class="col-sm-6"><label class="form-label text-muted small">\u05EA\u05E2\u05D5\u05D3\u05EA \u05D6\u05D4\u05D5\u05EA</label><div class="fw-bold">${s['\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA'] || s['\u05ea\u05e2\u05d5\u05d3\u05ea_\u05d6\u05d4\u05d5\u05ea'] || '--'}</div></div>
          <div class="col-sm-6"><label class="form-label text-muted small">\u05D1\u05D9\u05EA \u05E1\u05E4\u05E8 \u05E7\u05D5\u05D3\u05DD</label><div class="fw-bold">${s['\u05D1\u05D9\u05EA_\u05E1\u05E4\u05E8_\u05E7\u05D5\u05D3\u05DD'] || s['\u05d1\u05d9\u05ea_\u05e1\u05e4\u05e8_\u05e7\u05d5\u05d3\u05dd'] || '--'}</div></div>
          <div class="col-sm-6"><label class="form-label text-muted small">\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05E8\u05E9\u05DE\u05D4</label><div class="fw-bold">${Utils.formatDate(s['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05E8\u05E9\u05DE\u05D4'] || s['\u05ea\u05d0\u05e8\u05d9\u05da_\u05d4\u05e8\u05e9\u05de\u05d4'] || '')}</div></div>
          <div class="col-sm-6"><label class="form-label text-muted small">\u05DE\u05E1\u05E4\u05E8 \u05D0\u05D7\u05D9\u05DD</label><div class="fw-bold">${s['\u05DE\u05E1\u05E4\u05E8_\u05D0\u05D7\u05D9\u05DD'] || s['\u05de\u05e1\u05e4\u05e8_\u05d0\u05d7\u05d9\u05dd'] || '--'}</div></div>
          <div class="col-sm-6"><label class="form-label text-muted small">\u05E2\u05D3\u05D4</label><div class="fw-bold">${s['\u05E2\u05D3\u05D4'] || s['\u05e2\u05d3\u05d4'] || '--'}</div></div>
          <div class="col-sm-6"><label class="form-label text-muted small">\u05D1\u05D9\u05EA \u05DB\u05E0\u05E1\u05EA</label><div class="fw-bold">${s['\u05D1\u05D9\u05EA_\u05DB\u05E0\u05E1\u05EA'] || s['\u05d1\u05d9\u05ea_\u05db\u05e0\u05e1\u05ea'] || '--'}</div></div>
          ${s['\u05D4\u05E2\u05E8\u05D5\u05EA'] ? `<div class="col-12"><label class="form-label text-muted small">\u05D4\u05E2\u05E8\u05D5\u05EA</label><div>${s['\u05D4\u05E2\u05E8\u05D5\u05EA']}</div></div>` : ''}
        </div></div></div>

        <!-- 2. Attendance -->
        <div class="tab-pane fade" id="tab-att"><div class="row g-3 mb-3">
          <div class="col-4"><div class="card p-3 text-center"><div class="fs-3 fw-bold text-success">${attPct}%</div><small class="text-muted">\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</small></div></div>
          <div class="col-4"><div class="card p-3 text-center"><div class="fs-3 fw-bold text-primary">${presentCount}</div><small class="text-muted">\u05D9\u05DE\u05D9 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</small></div></div>
          <div class="col-4"><div class="card p-3 text-center"><div class="fs-3 fw-bold text-danger">${studentAtt.length - presentCount}</div><small class="text-muted">\u05D7\u05D9\u05E1\u05D5\u05E8\u05D9\u05DD</small></div></div>
        </div>${studentAtt.length === 0 ? '<div class="text-muted text-center py-3">\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</div>' :
        `<div class="card"><table class="table table-bht mb-0"><thead><tr><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th><th>\u05D4\u05E2\u05E8\u05D4</th></tr></thead><tbody>${studentAtt.slice(-15).reverse().map(a => `<tr><td>${Utils.formatDateShort(a['\u05EA\u05D0\u05E8\u05D9\u05DA'])}</td><td>${a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E0\u05D5\u05DB\u05D7' ? '<span class="badge bg-success">\u05E0\u05D5\u05DB\u05D7</span>' : a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D0\u05D9\u05D7\u05D5\u05E8' ? '<span class="badge bg-warning text-dark">\u05D0\u05D9\u05D7\u05D5\u05E8</span>' : '<span class="badge bg-danger">\u05D7\u05D9\u05E1\u05D5\u05E8</span>'}</td><td class="text-muted small">${a['\u05D4\u05E2\u05E8\u05D4']||''}</td></tr>`).join('')}</tbody></table></div>`}</div>

        <!-- 3. Grades -->
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

        <!-- 4. Behavior -->
        <div class="tab-pane fade" id="tab-beh"><div class="d-flex gap-3 mb-3"><span class="badge bg-success p-2"><i class="bi bi-hand-thumbs-up me-1"></i>+${posB} \u05D7\u05D9\u05D5\u05D1\u05D9</span><span class="badge bg-danger p-2"><i class="bi bi-hand-thumbs-down me-1"></i>-${negB} \u05E9\u05DC\u05D9\u05DC\u05D9</span><span class="badge bg-secondary p-2">\u05E1\u05D4"\u05DB ${studentBeh.length}</span></div>
          ${studentBeh.length === 0 ? '<div class="text-muted text-center">\u05D0\u05D9\u05DF \u05D3\u05D9\u05D5\u05D5\u05D7\u05D9 \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</div>' :
          `<div class="card"><table class="table table-sm mb-0"><thead><tr><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05E1\u05D5\u05D2</th><th>\u05EA\u05D9\u05D0\u05D5\u05E8</th><th>\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA</th></tr></thead><tbody>${studentBeh.slice(-15).reverse().map(b => `<tr><td>${Utils.formatDateShort(b['\u05EA\u05D0\u05E8\u05D9\u05DA'])}</td><td><span class="badge bg-${b['\u05E1\u05D5\u05D2']==='\u05D7\u05D9\u05D5\u05D1\u05D9'?'success':'danger'}">${b['\u05E1\u05D5\u05D2']||''}</span></td><td>${b['\u05EA\u05D9\u05D0\u05D5\u05E8']||''}</td><td class="text-muted small">${b['\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA']||b['points']||''}</td></tr>`).join('')}</tbody></table></div>`}</div>

        <!-- 5. Finance -->
        <div class="tab-pane fade" id="tab-fin"><div class="card p-3"><div class="row g-3 text-center mb-3">
          <div class="col-4"><div class="fs-5 fw-bold">${Utils.formatCurrency(sfTotal || 0)}</div><small class="text-muted">\u05E1\u05D4"\u05DB</small></div>
          <div class="col-4"><div class="fs-5 fw-bold text-success">${Utils.formatCurrency(sfPaid || 0)}</div><small class="text-muted">\u05E9\u05D5\u05DC\u05DD</small></div>
          <div class="col-4"><div class="fs-5 fw-bold text-danger">${Utils.formatCurrency(sfDebt || 0)}</div><small class="text-muted">\u05D9\u05EA\u05E8\u05D4</small></div>
        </div>${sfTotal ? `<div class="finance-progress"><div class="finance-progress-bar bg-success" style="width:${Math.round((sfPaid||0)/(sfTotal||1)*100)}%"></div></div><small class="text-muted mt-1 d-block">${Math.round((sfPaid||0)/(sfTotal||1)*100)}% \u05E9\u05D5\u05DC\u05DD</small>` : '<div class="text-muted text-center">\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9 \u05DB\u05E1\u05E4\u05D9\u05DD</div>'}
        ${studentFin.length > 0 ? `<hr><table class="table table-sm mb-0"><thead><tr><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05EA\u05D9\u05D0\u05D5\u05E8</th><th>\u05E1\u05DB\u05D5\u05DD</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th></tr></thead><tbody>${studentFin.slice(-10).reverse().map(f => `<tr><td>${Utils.formatDateShort(f['\u05EA\u05D0\u05E8\u05D9\u05DA']||'')}</td><td>${f['\u05EA\u05D9\u05D0\u05D5\u05E8']||f['\u05E4\u05D9\u05E8\u05D5\u05D8']||''}</td><td>${Utils.formatCurrency(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0)}</td><td><span class="badge bg-${(f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')=== '\u05E9\u05D5\u05DC\u05DD'?'success':'danger'}">${f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'\u05DC\u05D0 \u05E9\u05D5\u05DC\u05DD'}</span></td></tr>`).join('')}</tbody></table>` : ''}
        </div></div>

        <!-- 6. Parents -->
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

        <!-- 7. Documents -->
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

        <!-- 8. Communication -->
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
});
