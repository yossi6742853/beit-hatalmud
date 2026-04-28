/* ===== BHT v5.3 — Homework (שיעורי בית) — Standalone Module ===== */
Object.assign(Pages, {

  /* ======================================================================
     DEMO DATA
     ====================================================================== */
  _hwDemoStudents: null,
  _hwDemoAssignments: null,
  _hwDemoSubmissions: null,

  _hwGenerateDemo() {
    if (this._hwDemoStudents) return;

    const firstNames = ['\u05D9\u05D5\u05E1\u05E3','\u05DE\u05E9\u05D4','\u05D0\u05D1\u05E8\u05D4\u05DD'];
    const lastNames = ['\u05DB\u05D4\u05DF','\u05DC\u05D5\u05D9','\u05D9\u05E9\u05E8\u05D0\u05DC\u05D9'];
    const classes = ['\u05DB\u05D9\u05EA\u05D4 \u05D0', '\u05DB\u05D9\u05EA\u05D4 \u05D1'];

    this._hwDemoStudents = firstNames.map((fn, i) => ({
      '\u05DE\u05D6\u05D4\u05D4': 'S' + (i + 1),
      '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': fn,
      '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': lastNames[i],
      '\u05DB\u05D9\u05EA\u05D4': classes[i < 8 ? 0 : 1],
      _fullName: fn + ' ' + lastNames[i],
      _id: 'S' + (i + 1)
    }));

    const subjects = ['\u05D2\u05DE\u05E8\u05D0', '\u05D7\u05D5\u05DE\u05E9', '\u05D4\u05DC\u05DB\u05D4', '\u05E0"\u05DA'];
    const subjectIcons = { '\u05D2\u05DE\u05E8\u05D0': 'bi-book', '\u05D7\u05D5\u05DE\u05E9': 'bi-calculator', '\u05D4\u05DC\u05DB\u05D4': 'bi-journal-text', '\u05E0"\u05DA': 'bi-bookshelf' };
    const subjectColors = { '\u05D2\u05DE\u05E8\u05D0': 'primary', '\u05D7\u05D5\u05DE\u05E9': 'success', '\u05D4\u05DC\u05DB\u05D4': 'info', '\u05E0"\u05DA': 'warning' };

    const today = new Date();
    const d = (offset) => { const dt = new Date(today); dt.setDate(dt.getDate() + offset); return dt.toISOString().slice(0, 10); };

    // 12 assignments across 4 subjects, 2 classes, various dates
    this._hwDemoAssignments = [

      { '\u05DE\u05D6\u05D4\u05D4': 'hw1', '\u05DB\u05D5\u05EA\u05E8\u05EA': '\u05E1\u05D5\u05D2\u05D9\u05D4 \u05D3\u05E3 \u05DC"\u05D1', '\u05DE\u05E7\u05E6\u05D5\u05E2': '\u05D2\u05DE\u05E8\u05D0', '\u05DB\u05D9\u05EA\u05D4': '\u05DB\u05D9\u05EA\u05D4 \u05D0', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DE\u05EA\u05DF': d(-10), '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4': d(-3), '\u05EA\u05D9\u05D0\u05D5\u05E8': '\u05DC\u05DC\u05DE\u05D5\u05D3 \u05D0\u05EA \u05D4\u05E1\u05D5\u05D2\u05D9\u05D4 \u05E2\u05DD \u05E8\u05E9"\u05D9 \u05D5\u05EA\u05D5\u05E1\u05E4\u05D5\u05EA' },
      { '\u05DE\u05D6\u05D4\u05D4': 'hw2', '\u05DB\u05D5\u05EA\u05E8\u05EA': '\u05EA\u05E8\u05D2\u05D9\u05DC \u05D7\u05D5\u05DE\u05E9 \u05E2\u05DE\u05D5\u05D3 10', '\u05DE\u05E7\u05E6\u05D5\u05E2': '\u05D7\u05D5\u05DE\u05E9', '\u05DB\u05D9\u05EA\u05D4': '\u05DB\u05D9\u05EA\u05D4 \u05D0', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DE\u05EA\u05DF': d(-8), '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4': d(-1), '\u05EA\u05D9\u05D0\u05D5\u05E8': '\u05DC\u05E4\u05EA\u05D5\u05E8 \u05EA\u05E8\u05D2\u05D9\u05DC\u05D9\u05DD 1-15 \u05DE\u05E2\u05DE\u05D5\u05D3 10' },
      { '\u05DE\u05D6\u05D4\u05D4': 'hw3', '\u05DB\u05D5\u05EA\u05E8\u05EA': '\u05D4\u05DC\u05DB\u05D5\u05EA \u05E9\u05D1\u05EA - \u05E4\u05E8\u05E7 \u05D9"', '\u05DE\u05E7\u05E6\u05D5\u05E2': '\u05D4\u05DC\u05DB\u05D4', '\u05DB\u05D9\u05EA\u05D4': '\u05DB\u05D9\u05EA\u05D4 \u05D0', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DE\u05EA\u05DF': d(-7), '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4': d(0), '\u05EA\u05D9\u05D0\u05D5\u05E8': '\u05DC\u05D7\u05D6\u05D5\u05E8 \u05E2\u05DC \u05D4\u05DC\u05DB\u05D5\u05EA \u05E9\u05D1\u05EA \u05E4\u05E8\u05E7 \u05D9\u05D5"\u05D3' }
  ];

    // Generate per-student submissions for each assignment
    const statusOptions = ['\u05D4\u05D5\u05D2\u05E9', '\u05DE\u05DE\u05EA\u05D9\u05DF', '\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8', '\u05E4\u05D8\u05D5\u05E8'];
    this._hwDemoSubmissions = [];

    this._hwDemoAssignments.forEach(hw => {
      const hwClass = hw['\u05DB\u05D9\u05EA\u05D4'];
      const classStudents = this._hwDemoStudents.filter(s => s['\u05DB\u05D9\u05EA\u05D4'] === hwClass);
      const dueDate = hw['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4'];
      const isPast = dueDate < today.toISOString().slice(0, 10);

      classStudents.forEach((s, si) => {
        let status;
        const rand = Math.random();
        if (isPast) {
          // Past due: mostly submitted, some late, few pending
          if (rand < 0.55) status = '\u05D4\u05D5\u05D2\u05E9';
          else if (rand < 0.75) status = '\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8';
          else if (rand < 0.90) status = '\u05DE\u05DE\u05EA\u05D9\u05DF';
          else status = '\u05E4\u05D8\u05D5\u05E8';
        } else {
          // Future/today: mix of submitted and pending
          if (rand < 0.35) status = '\u05D4\u05D5\u05D2\u05E9';
          else if (rand < 0.85) status = '\u05DE\u05DE\u05EA\u05D9\u05DF';
          else status = '\u05E4\u05D8\u05D5\u05E8';
        }

        this._hwDemoSubmissions.push({
          '\u05DE\u05D6\u05D4\u05D4': 'sub_' + hw['\u05DE\u05D6\u05D4\u05D4'] + '_' + s._id,
          '\u05E9\u05D9\u05E2\u05D5\u05E8_\u05DE\u05D6\u05D4\u05D4': hw['\u05DE\u05D6\u05D4\u05D4'],
          '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': s._id,
          '\u05E9\u05DD': s._fullName,
          '\u05E1\u05D8\u05D8\u05D5\u05E1': status,
          '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4': status === '\u05D4\u05D5\u05D2\u05E9' ? (isPast ? hw['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4'] : d(-Math.floor(Math.random() * 3))) : ''
        });
      });
    });
  },

  /* ======================================================================
     STATE
     ====================================================================== */
  _hwData: [],
  _hwSubmissions: [],
  _hwStudents: [],
  _hwView: 'cards', // 'cards' | 'calendar' | 'overdue' | 'student'
  _hwSelectedStudent: null,
  _hwSelectedAssignment: null,

  /* ======================================================================
     MAIN PAGE RENDER
     ====================================================================== */
  homework() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
        <div>
          <h1><i class="bi bi-book me-2"></i>\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9 \u05D1\u05D9\u05EA</h1>
        </div>
        <div class="d-flex gap-2 flex-wrap">
          <select class="form-select form-select-sm" id="hw-subject-filter" style="width:140px" onchange="Pages.hwApplyFilters()">
            <option value="">\u05DB\u05DC \u05D4\u05DE\u05E7\u05E6\u05D5\u05E2\u05D5\u05EA</option>
          </select>
          <select class="form-select form-select-sm" id="hw-class-filter" style="width:140px" onchange="Pages.hwApplyFilters()">
            <option value="">\u05DB\u05DC \u05D4\u05DB\u05D9\u05EA\u05D5\u05EA</option>
          </select>
          <div class="btn-group btn-group-sm">
            <button class="btn btn-outline-secondary active" id="hw-view-cards" onclick="Pages.hwSetView('cards')" title="\u05DB\u05E8\u05D8\u05D9\u05E1\u05D9\u05DD"><i class="bi bi-grid-3x2-gap"></i></button>
            <button class="btn btn-outline-secondary" id="hw-view-calendar" onclick="Pages.hwSetView('calendar')" title="\u05DC\u05D5\u05D7 \u05E9\u05E0\u05D4"><i class="bi bi-calendar-week"></i></button>
            <button class="btn btn-outline-secondary" id="hw-view-overdue" onclick="Pages.hwSetView('overdue')" title="\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8"><i class="bi bi-exclamation-triangle"></i></button>
          </div>
          <button class="btn btn-primary btn-sm" onclick="Pages.hwShowAddModal()">
            <i class="bi bi-plus-lg me-1"></i>\u05E9\u05D9\u05E2\u05D5\u05E8 \u05D7\u05D3\u05E9
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="row g-3 mb-3" id="hw-stats"></div>

      <!-- Overdue Alerts -->
      <div id="hw-overdue-alerts" class="mb-3"></div>

      <!-- Main Content Area -->
      <div id="hw-content">${Utils.skeleton(4)}</div>

      <!-- Create/Edit Assignment Modal -->
      <div class="modal fade" id="hw-modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"><i class="bi bi-book me-2"></i>\u05E9\u05D9\u05E2\u05D5\u05E8 \u05D1\u05D9\u05EA \u05D7\u05D3\u05E9</h5>
              <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="row g-3">
                <div class="col-12">
                  <label class="form-label">\u05DB\u05D5\u05EA\u05E8\u05EA</label>
                  <input class="form-control" id="hf-title" placeholder="\u05DB\u05D5\u05EA\u05E8\u05EA \u05D4\u05E9\u05D9\u05E2\u05D5\u05E8">
                </div>
                <div class="col-6">
                  <label class="form-label">\u05DE\u05E7\u05E6\u05D5\u05E2</label>
                  <select class="form-select" id="hf-subject">
                    <option value="\u05D2\u05DE\u05E8\u05D0">\u05D2\u05DE\u05E8\u05D0</option>
                    <option value="\u05D7\u05D5\u05DE\u05E9">\u05D7\u05D5\u05DE\u05E9</option>
                    <option value="\u05D4\u05DC\u05DB\u05D4">\u05D4\u05DC\u05DB\u05D4</option>
                    <option value="\u05E0&quot;\u05DA">\u05E0"\u05DA</option>
                  </select>
                </div>
                <div class="col-6">
                  <label class="form-label">\u05DB\u05D9\u05EA\u05D4</label>
                  <select class="form-select" id="hf-class">
                    <option value="\u05DB\u05D9\u05EA\u05D4 \u05D0">\u05DB\u05D9\u05EA\u05D4 \u05D0</option>
                    <option value="\u05DB\u05D9\u05EA\u05D4 \u05D1">\u05DB\u05D9\u05EA\u05D4 \u05D1</option>
                  </select>
                </div>
                <div class="col-6">
                  <label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA \u05DE\u05EA\u05DF</label>
                  <input type="date" class="form-control" id="hf-given">
                </div>
                <div class="col-6">
                  <label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05D2\u05E9\u05D4</label>
                  <input type="date" class="form-control" id="hf-due">
                </div>
                <div class="col-12">
                  <label class="form-label">\u05EA\u05D9\u05D0\u05D5\u05E8</label>
                  <textarea class="form-control" id="hf-desc" rows="3" placeholder="\u05EA\u05D9\u05D0\u05D5\u05E8 \u05D4\u05E9\u05D9\u05E2\u05D5\u05E8..."></textarea>
                </div>
                <div class="col-12">
                  <label class="form-label"><i class="bi bi-paperclip me-1"></i>\u05E7\u05D5\u05D1\u05E5 \u05DE\u05E6\u05D5\u05E8\u05E3</label>
                  <input type="file" class="form-control" id="hf-file" disabled>
                  <small class="text-muted">\u05D4\u05E2\u05DC\u05D0\u05EA \u05E7\u05D1\u05E6\u05D9\u05DD \u05EA\u05D4\u05D9\u05D4 \u05D6\u05DE\u05D9\u05E0\u05D4 \u05D1\u05E7\u05E8\u05D5\u05D1</small>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button>
              <button class="btn btn-primary" onclick="Pages.hwSave()"><i class="bi bi-check-lg me-1"></i>\u05E9\u05DE\u05D5\u05E8</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Submission Tracking Modal -->
      <div class="modal fade" id="hw-submissions-modal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="hw-sub-title">\u05DE\u05E2\u05E7\u05D1 \u05D4\u05D2\u05E9\u05D5\u05EA</h5>
              <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body" id="hw-sub-body"></div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">\u05E1\u05D2\u05D5\u05E8</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Student Profile Modal -->
      <div class="modal fade" id="hw-student-modal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="hw-student-title">\u05E4\u05E8\u05D5\u05E4\u05D9\u05DC \u05EA\u05DC\u05DE\u05D9\u05D3</h5>
              <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body" id="hw-student-body"></div>
          </div>
        </div>
      </div>
    `;
  },

  /* ======================================================================
     INIT
     ====================================================================== */
  /* ---- Demo flag ---- */
  _hwUseDemo: false,

  hwLoadDemo() {
    this._hwUseDemo = true;
    this._hwGenerateDemo();
    this._hwData = this._hwDemoAssignments;
    this._hwSubmissions = this._hwDemoSubmissions;
    this._hwStudents = this._hwDemoStudents;
    this.homeworkInit();
    Utils.toast('\u05E0\u05D8\u05E2\u05E0\u05D5 \u05E0\u05EA\u05D5\u05E0\u05D9 \u05D3\u05DE\u05D5', 'info');
  },

  homeworkInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];

    // Load data: real cache first, then demo, then empty
    if (this._hwUseDemo) {
      this._hwGenerateDemo();
      this._hwData = this._hwDemoAssignments;
      this._hwSubmissions = this._hwDemoSubmissions;
      this._hwStudents = this._hwDemoStudents;
    } else {
      const apiData = _gc('\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9_\u05D1\u05D9\u05EA');
      this._hwData = (apiData && apiData.length) ? apiData : [];
      this._hwSubmissions = _gc('\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9_\u05D1\u05D9\u05EA_\u05D4\u05D2\u05E9\u05D5\u05EA') || [];
      this._hwStudents = [];
      try {
        const stuData = _gc('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
        if (stuData && stuData.length) {
          this._hwStudents = stuData.map(s => {
            s._fullName = Utils.fullName(s);
            s._id = Utils.rowId(s);
            return s;
          });
        }
      } catch(e) { /* silent */ }
    }

    // Empty state with nice UI and quick-add form
    if (!this._hwData.length && !this._hwUseDemo) {
      document.getElementById('hw-stats').innerHTML = '';
      document.getElementById('hw-overdue-alerts').innerHTML = '';
      document.getElementById('hw-content').innerHTML = `
        <div class="text-center py-5">
          <div class="mb-3"><i class="bi bi-journal-bookmark" style="font-size:4rem;color:#dee2e6"></i></div>
          <h4 class="text-muted mb-2">\u05D0\u05D9\u05DF \u05E9\u05D9\u05E2\u05D5\u05E8\u05D9 \u05D1\u05D9\u05EA</h4>
          <p class="text-muted mb-4">\u05D4\u05D5\u05E1\u05E3 \u05E9\u05D9\u05E2\u05D5\u05E8 \u05D1\u05D9\u05EA \u05E8\u05D0\u05E9\u05D5\u05DF \u05D0\u05D5 \u05D8\u05E2\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9 \u05D3\u05DE\u05D5</p>
          <div class="d-flex justify-content-center gap-2 mb-4">
            <button class="btn btn-primary" onclick="Pages.hwShowAddModal()"><i class="bi bi-plus-lg me-1"></i>\u05D4\u05D5\u05E1\u05E3 \u05E9\u05D9\u05E2\u05D5\u05E8 \u05D1\u05D9\u05EA</button>
            <button class="btn btn-outline-secondary" onclick="Pages.hwLoadDemo()"><i class="bi bi-database me-1"></i>\u05D8\u05E2\u05DF \u05D3\u05DE\u05D5</button>
          </div>
          <div class="card mx-auto" style="max-width:480px">
            <div class="card-body">
              <h6 class="card-title mb-3"><i class="bi bi-lightning me-1"></i>\u05D4\u05D5\u05E1\u05E4\u05D4 \u05DE\u05D4\u05D9\u05E8\u05D4</h6>
              <div class="row g-2">
                <div class="col-6"><input class="form-control form-control-sm" id="hw-quick-subject" placeholder="\u05DE\u05E7\u05E6\u05D5\u05E2"></div>
                <div class="col-6"><input class="form-control form-control-sm" id="hw-quick-class" placeholder="\u05DB\u05D9\u05EA\u05D4"></div>
                <div class="col-12"><input class="form-control form-control-sm" id="hw-quick-desc" placeholder="\u05EA\u05D9\u05D0\u05D5\u05E8 \u05D4\u05E9\u05D9\u05E2\u05D5\u05E8"></div>
                <div class="col-6"><input type="date" class="form-control form-control-sm" id="hw-quick-due" title="\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05D2\u05E9\u05D4"></div>
                <div class="col-6"><button class="btn btn-primary btn-sm w-100" onclick="Pages.hwQuickAdd()"><i class="bi bi-plus-lg me-1"></i>\u05D4\u05D5\u05E1\u05E3</button></div>
              </div>
            </div>
          </div>
        </div>`;
      return;
    }

    // Populate filters
    const subjects = [...new Set(this._hwData.map(r => r['\u05DE\u05E7\u05E6\u05D5\u05E2']).filter(Boolean))].sort();
    const classes = [...new Set(this._hwData.map(r => r['\u05DB\u05D9\u05EA\u05D4']).filter(Boolean))].sort();
    const subSel = document.getElementById('hw-subject-filter');
    const clsSel = document.getElementById('hw-class-filter');
    if (subSel) {
      const cur = subSel.value;
      subSel.innerHTML = '<option value="">\u05DB\u05DC \u05D4\u05DE\u05E7\u05E6\u05D5\u05E2\u05D5\u05EA</option>' + subjects.map(s => `<option value="${s}">${s}</option>`).join('');
      subSel.value = cur;
    }
    if (clsSel) {
      const cur = clsSel.value;
      clsSel.innerHTML = '<option value="">\u05DB\u05DC \u05D4\u05DB\u05D9\u05EA\u05D5\u05EA</option>' + classes.map(c => `<option value="${c}">${c}</option>`).join('');
      clsSel.value = cur;
    }

    this.hwRenderStats();
    this.hwRenderOverdueAlerts();
    this.hwRenderContent();
  },

  /* ======================================================================
     HELPERS
     ====================================================================== */
  _hwFilteredData() {
    const subjectFilter = document.getElementById('hw-subject-filter')?.value || '';
    const classFilter = document.getElementById('hw-class-filter')?.value || '';
    let data = this._hwData;
    if (subjectFilter) data = data.filter(r => (r['\u05DE\u05E7\u05E6\u05D5\u05E2'] || '') === subjectFilter);
    if (classFilter) data = data.filter(r => (r['\u05DB\u05D9\u05EA\u05D4'] || '') === classFilter);
    return data;
  },

  _hwSubjectColor(subject) {
    const map = { '\u05D2\u05DE\u05E8\u05D0': 'primary', '\u05D7\u05D5\u05DE\u05E9': 'success', '\u05D4\u05DC\u05DB\u05D4': 'info', '\u05E0"\u05DA': 'warning' };
    return map[subject] || 'secondary';
  },

  _hwSubjectIcon(subject) {
    const map = { '\u05D2\u05DE\u05E8\u05D0': 'bi-book', '\u05D7\u05D5\u05DE\u05E9': 'bi-calculator', '\u05D4\u05DC\u05DB\u05D4': 'bi-journal-text', '\u05E0"\u05DA': 'bi-bookshelf' };
    return map[subject] || 'bi-book';
  },

  _hwGetSubmissions(hwId) {
    return this._hwSubmissions.filter(s => s['\u05E9\u05D9\u05E2\u05D5\u05E8_\u05DE\u05D6\u05D4\u05D4'] === hwId);
  },

  _hwDaysLeft(dueDate) {
    if (!dueDate) return null;
    return Math.ceil((new Date(dueDate) - new Date()) / 86400000);
  },

  _hwIsOverdue(hw) {
    const due = hw['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4'];
    if (!due) return false;
    const subs = this._hwGetSubmissions(hw['\u05DE\u05D6\u05D4\u05D4']);
    const pending = subs.filter(s => s['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05DE\u05DE\u05EA\u05D9\u05DF').length;
    return due < Utils.todayISO() && pending > 0;
  },

  /* ======================================================================
     STATS CARDS
     ====================================================================== */
  hwRenderStats() {
    const data = this._hwData;
    const today = Utils.todayISO();
    const total = data.length;

    let totalSubs = 0, submittedSubs = 0, overdueCount = 0, pendingSubs = 0;
    data.forEach(hw => {
      const subs = this._hwGetSubmissions(hw['\u05DE\u05D6\u05D4\u05D4']);
      totalSubs += subs.length;
      submittedSubs += subs.filter(s => s['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D4\u05D5\u05D2\u05E9').length;
      pendingSubs += subs.filter(s => s['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05DE\u05DE\u05EA\u05D9\u05DF').length;
      if (this._hwIsOverdue(hw)) overdueCount++;
    });

    const submittedPct = totalSubs > 0 ? Math.round((submittedSubs / totalSubs) * 100) : 0;

    const el = document.getElementById('hw-stats');
    if (!el) return;
    el.innerHTML = `
      <div class="col-6 col-md-3">
        <div class="card p-3 text-center">
          <div class="fs-3 fw-bold text-primary">${total}</div>
          <small class="text-muted">\u05E1\u05D4"\u05DB \u05E9\u05D9\u05E2\u05D5\u05E8\u05D9\u05DD</small>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card p-3 text-center">
          <div class="fs-3 fw-bold text-warning">${pendingSubs}</div>
          <small class="text-muted">\u05DE\u05DE\u05EA\u05D9\u05E0\u05D9\u05DD \u05DC\u05D4\u05D2\u05E9\u05D4</small>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card p-3 text-center">
          <div class="fs-3 fw-bold text-success">${submittedPct}%</div>
          <small class="text-muted">\u05D0\u05D7\u05D5\u05D6 \u05D4\u05D2\u05E9\u05D4</small>
          <div class="progress mt-1" style="height:5px">
            <div class="progress-bar bg-success" style="width:${submittedPct}%"></div>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card p-3 text-center ${overdueCount > 0 ? 'border-danger' : ''}" style="${overdueCount > 0 ? 'border-width:2px' : ''}">
          <div class="fs-3 fw-bold text-danger">${overdueCount}</div>
          <small class="text-muted">\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8</small>
        </div>
      </div>
    `;
  },

  /* ======================================================================
     OVERDUE ALERTS
     ====================================================================== */
  hwRenderOverdueAlerts() {
    const el = document.getElementById('hw-overdue-alerts');
    if (!el) return;
    const overdue = this._hwData.filter(hw => this._hwIsOverdue(hw));
    if (!overdue.length) { el.innerHTML = ''; return; }

    el.innerHTML = `
      <div class="alert alert-danger d-flex align-items-start gap-2" role="alert">
        <i class="bi bi-exclamation-triangle-fill fs-5 mt-1"></i>
        <div class="flex-grow-1">
          <strong>${overdue.length} \u05E9\u05D9\u05E2\u05D5\u05E8\u05D9\u05DD \u05D1\u05D0\u05D9\u05D7\u05D5\u05E8!</strong>
          <div class="mt-1">${overdue.map(hw => {
            const days = Math.abs(this._hwDaysLeft(hw['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4']));
            const subs = this._hwGetSubmissions(hw['\u05DE\u05D6\u05D4\u05D4']);
            const pending = subs.filter(s => s['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05DE\u05DE\u05EA\u05D9\u05DF').length;
            return `<span class="badge bg-danger me-1 mb-1 cursor-pointer" onclick="Pages.hwShowSubmissions('${hw['\u05DE\u05D6\u05D4\u05D4']}')" style="cursor:pointer">${Utils.escapeHTML(hw['\u05DB\u05D5\u05EA\u05E8\u05EA']||'')} (${days} \u05D9\u05DE\u05D9\u05DD, ${pending} \u05DE\u05DE\u05EA\u05D9\u05E0\u05D9\u05DD)</span>`;
          }).join('')}</div>
        </div>
      </div>
    `;
  },

  /* ======================================================================
     VIEW SWITCHING
     ====================================================================== */
  hwSetView(view) {
    this._hwView = view;
    ['cards', 'calendar', 'overdue'].forEach(v => {
      const btn = document.getElementById('hw-view-' + v);
      if (btn) btn.classList.toggle('active', v === view);
    });
    this.hwRenderContent();
  },

  hwApplyFilters() {
    this.hwRenderStats();
    this.hwRenderOverdueAlerts();
    this.hwRenderContent();
  },

  hwRenderContent() {
    const el = document.getElementById('hw-content');
    if (!el) return;
    switch (this._hwView) {
      case 'cards': this._hwRenderCards(el); break;
      case 'calendar': this._hwRenderCalendar(el); break;
      case 'overdue': this._hwRenderOverdueView(el); break;
    }
  },

  /* ======================================================================
     CARDS VIEW
     ====================================================================== */
  _hwRenderCards(el) {
    const data = this._hwFilteredData();
    if (!data.length) {
      el.innerHTML = '<div class="empty-state"><i class="bi bi-book"></i><h5>\u05D0\u05D9\u05DF \u05E9\u05D9\u05E2\u05D5\u05E8\u05D9 \u05D1\u05D9\u05EA</h5><p>\u05DC\u05D7\u05E5 "\u05E9\u05D9\u05E2\u05D5\u05E8 \u05D7\u05D3\u05E9" \u05DC\u05D4\u05D5\u05E1\u05E4\u05D4</p></div>';
      return;
    }

    const today = Utils.todayISO();
    let html = '<div class="row g-3">';
    data.slice().sort((a, b) => (a['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4'] || '').localeCompare(b['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4'] || '')).forEach(hw => {
      const hwId = hw['\u05DE\u05D6\u05D4\u05D4'];
      const due = hw['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4'] || '';
      const overdue = this._hwIsOverdue(hw);
      const daysLeft = this._hwDaysLeft(due);
      const subs = this._hwGetSubmissions(hwId);
      const submitted = subs.filter(s => s['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D4\u05D5\u05D2\u05E9').length;
      const late = subs.filter(s => s['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8').length;
      const total = subs.length;
      const pct = total > 0 ? Math.round(((submitted + late) / total) * 100) : 0;
      const color = this._hwSubjectColor(hw['\u05DE\u05E7\u05E6\u05D5\u05E2']);
      const icon = this._hwSubjectIcon(hw['\u05DE\u05E7\u05E6\u05D5\u05E2']);

      let daysBadge = '';
      if (daysLeft !== null) {
        if (overdue) daysBadge = `<span class="badge bg-danger"><i class="bi bi-exclamation-circle me-1"></i>\u05E2\u05D1\u05E8 ${Math.abs(daysLeft)} \u05D9\u05DE\u05D9\u05DD</span>`;
        else if (daysLeft === 0) daysBadge = '<span class="badge bg-warning text-dark"><i class="bi bi-clock me-1"></i>\u05D4\u05D9\u05D5\u05DD!</span>';
        else if (daysLeft <= 2) daysBadge = `<span class="badge bg-warning text-dark">${daysLeft} \u05D9\u05DE\u05D9\u05DD</span>`;
        else daysBadge = `<span class="badge bg-success">${daysLeft} \u05D9\u05DE\u05D9\u05DD</span>`;
      }

      html += `
        <div class="col-md-6 col-lg-4">
          <div class="card h-100 ${overdue ? 'border-danger' : ''}" style="${overdue ? 'border-width:2px' : ''}">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <span class="badge bg-${color} me-1"><i class="${icon} me-1"></i>${hw['\u05DE\u05E7\u05E6\u05D5\u05E2'] || ''}</span>
                  <span class="badge bg-secondary">${hw['\u05DB\u05D9\u05EA\u05D4'] || ''}</span>
                </div>
                ${daysBadge}
              </div>
              <h6 class="fw-bold mb-1">${hw['\u05DB\u05D5\u05EA\u05E8\u05EA'] || hw['\u05DE\u05E7\u05E6\u05D5\u05E2'] || ''}</h6>
              <p class="small text-muted mb-2">${hw['\u05EA\u05D9\u05D0\u05D5\u05E8'] || ''}</p>
              <div class="small text-muted mb-2">
                <i class="bi bi-calendar-event me-1"></i>\u05E0\u05D9\u05EA\u05DF: ${Utils.formatDateShort(hw['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DE\u05EA\u05DF'])}
                ${due ? ' | \u05D4\u05D2\u05E9\u05D4: ' + Utils.formatDateShort(due) : ''}
              </div>
              <div class="d-flex align-items-center gap-2 mb-2">
                <div class="progress flex-grow-1" style="height:8px">
                  <div class="progress-bar bg-success" style="width:${pct}%" title="\u05D4\u05D5\u05D2\u05E9\u05D5"></div>
                </div>
                <small class="text-nowrap fw-bold">${submitted + late}/${total}</small>
              </div>
              <div class="d-flex gap-2 flex-wrap">
                <button class="btn btn-sm btn-outline-primary" onclick="Pages.hwShowSubmissions('${hwId}')">
                  <i class="bi bi-people me-1"></i>\u05DE\u05E2\u05E7\u05D1 \u05D4\u05D2\u05E9\u05D5\u05EA
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="Pages.hwDelete('${hwId}')">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    });
    html += '</div>';

    // Student list below cards
    html += this._hwRenderStudentList();
    el.innerHTML = html;
  },

  /* ======================================================================
     STUDENT LIST (below cards)
     ====================================================================== */
  _hwRenderStudentList() {
    const classFilter = document.getElementById('hw-class-filter')?.value || '';
    const students = classFilter ? this._hwStudents.filter(s => s['\u05DB\u05D9\u05EA\u05D4'] === classFilter) : this._hwStudents;
    if (!students.length) return '';

    let html = `
      <div class="card mt-4">
        <div class="card-header">
          <h6 class="mb-0"><i class="bi bi-people-fill me-2"></i>\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD - \u05DC\u05D7\u05E5 \u05DC\u05E4\u05E8\u05D5\u05E4\u05D9\u05DC</h6>
        </div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover table-bht mb-0">
              <thead><tr>
                <th>\u05E9\u05DD</th><th>\u05DB\u05D9\u05EA\u05D4</th><th>\u05D4\u05D5\u05D2\u05E9\u05D5</th><th>\u05DE\u05DE\u05EA\u05D9\u05E0\u05D9\u05DD</th><th>\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8</th><th>\u05D0\u05D7\u05D5\u05D6</th>
              </tr></thead>
              <tbody>
    `;

    students.forEach(s => {
      const mySubs = this._hwSubmissions.filter(sub => sub['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4'] === s._id);
      const submitted = mySubs.filter(sub => sub['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D4\u05D5\u05D2\u05E9').length;
      const pending = mySubs.filter(sub => sub['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05DE\u05DE\u05EA\u05D9\u05DF').length;
      const late = mySubs.filter(sub => sub['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8').length;
      const total = mySubs.length;
      const pct = total > 0 ? Math.round(((submitted + late) / total) * 100) : 0;
      const initials = Utils.getInitials(s._fullName);
      const colorIdx = parseInt(s._id.replace('S', '')) % Utils.AVATAR_COLORS.length;
      const avatarColor = Utils.AVATAR_COLORS[colorIdx];

      html += `
        <tr style="cursor:pointer" onclick="Pages.hwShowStudentProfile('${s._id}')">
          <td>
            <div class="d-flex align-items-center gap-2">
              <div class="avatar-sm" style="background:${avatarColor};color:#fff;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:bold">${initials}</div>
              <span>${s._fullName}</span>
            </div>
          </td>
          <td>${s['\u05DB\u05D9\u05EA\u05D4']}</td>
          <td><span class="badge bg-success">${submitted}</span></td>
          <td><span class="badge bg-warning text-dark">${pending}</span></td>
          <td><span class="badge bg-danger">${late}</span></td>
          <td>
            <div class="d-flex align-items-center gap-2">
              <div class="progress flex-grow-1" style="height:6px;min-width:60px">
                <div class="progress-bar bg-success" style="width:${pct}%"></div>
              </div>
              <small class="fw-bold">${pct}%</small>
            </div>
          </td>
        </tr>
      `;
    });

    html += '</tbody></table></div></div></div>';
    return html;
  },

  /* ======================================================================
     CALENDAR VIEW
     ====================================================================== */
  _hwRenderCalendar(el) {
    const data = this._hwFilteredData();
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday

    const dayNames = ['\u05E8\u05D0\u05E9\u05D5\u05DF', '\u05E9\u05E0\u05D9', '\u05E9\u05DC\u05D9\u05E9\u05D9', '\u05E8\u05D1\u05D9\u05E2\u05D9', '\u05D7\u05DE\u05D9\u05E9\u05D9', '\u05E9\u05D9\u05E9\u05D9', '\u05E9\u05D1\u05EA'];
    const todayISO = Utils.todayISO();

    let html = `
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h6 class="mb-0"><i class="bi bi-calendar-week me-2"></i>\u05DC\u05D5\u05D7 \u05E9\u05D1\u05D5\u05E2\u05D9</h6>
          <div class="d-flex gap-2">
            <button class="btn btn-sm btn-outline-secondary" onclick="Pages._hwCalWeekOffset=(Pages._hwCalWeekOffset||0)-1;Pages.hwRenderContent()"><i class="bi bi-chevron-right"></i></button>
            <button class="btn btn-sm btn-outline-secondary" onclick="Pages._hwCalWeekOffset=0;Pages.hwRenderContent()">\u05D4\u05E9\u05D1\u05D5\u05E2</button>
            <button class="btn btn-sm btn-outline-secondary" onclick="Pages._hwCalWeekOffset=(Pages._hwCalWeekOffset||0)+1;Pages.hwRenderContent()"><i class="bi bi-chevron-left"></i></button>
          </div>
        </div>
        <div class="card-body p-0">
          <div class="row g-0">
    `;

    const weekOffset = this._hwCalWeekOffset || 0;
    for (let d = 0; d < 7; d++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + d + (weekOffset * 7));
      const dateISO = date.toISOString().slice(0, 10);
      const isToday = dateISO === todayISO;
      const isShabbat = d === 6;

      // Find assignments due on this day
      const dayHW = data.filter(hw => hw['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4'] === dateISO);
      // Find assignments given on this day
      const dayGiven = data.filter(hw => hw['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DE\u05EA\u05DF'] === dateISO);

      html += `
        <div class="col border-end ${isShabbat ? 'bg-light' : ''}" style="min-height:150px">
          <div class="p-2 border-bottom ${isToday ? 'bg-primary text-white' : 'bg-light'}">
            <div class="fw-bold small">${dayNames[d]}</div>
            <div class="small">${date.getDate()}/${date.getMonth() + 1}</div>
          </div>
          <div class="p-2">
      `;

      dayHW.forEach(hw => {
        const color = this._hwSubjectColor(hw['\u05DE\u05E7\u05E6\u05D5\u05E2']);
        const subs = this._hwGetSubmissions(hw['\u05DE\u05D6\u05D4\u05D4']);
        const submitted = subs.filter(s => s['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D4\u05D5\u05D2\u05E9' || s['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8').length;
        html += `<div class="badge bg-${color} d-block mb-1 text-start text-truncate" style="cursor:pointer;max-width:100%" onclick="Pages.hwShowSubmissions('${hw['\u05DE\u05D6\u05D4\u05D4']}')" title="${Utils.escapeHTML(hw['\u05DB\u05D5\u05EA\u05E8\u05EA'] || '')}"><i class="bi bi-arrow-left-circle me-1"></i>${Utils.escapeHTML(hw['\u05DB\u05D5\u05EA\u05E8\u05EA'] || hw['\u05DE\u05E7\u05E6\u05D5\u05E2'] || '')} <small>(${submitted}/${subs.length})</small></div>`;
      });

      dayGiven.forEach(hw => {
        html += `<div class="badge bg-outline-secondary border d-block mb-1 text-start text-truncate text-muted" style="max-width:100%" title="\u05E0\u05D9\u05EA\u05DF: ${Utils.escapeHTML(hw['\u05DB\u05D5\u05EA\u05E8\u05EA'] || '')}"><i class="bi bi-arrow-right-circle me-1"></i>${Utils.escapeHTML(hw['\u05DB\u05D5\u05EA\u05E8\u05EA'] || hw['\u05DE\u05E7\u05E6\u05D5\u05E2'] || '')}</div>`;
      });

      if (!dayHW.length && !dayGiven.length) {
        html += '<div class="text-muted small text-center mt-2">-</div>';
      }

      html += '</div></div>';
    }

    html += '</div></div></div>';
    el.innerHTML = html;
  },

  _hwCalWeekOffset: 0,

  /* ======================================================================
     OVERDUE VIEW
     ====================================================================== */
  _hwRenderOverdueView(el) {
    const overdue = this._hwFilteredData().filter(hw => this._hwIsOverdue(hw));
    if (!overdue.length) {
      el.innerHTML = '<div class="empty-state"><i class="bi bi-check-circle text-success"></i><h5>\u05D0\u05D9\u05DF \u05E9\u05D9\u05E2\u05D5\u05E8\u05D9\u05DD \u05D1\u05D0\u05D9\u05D7\u05D5\u05E8</h5><p>\u05DB\u05DC \u05D4\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9\u05DD \u05D4\u05D5\u05D2\u05E9\u05D5 \u05D1\u05D6\u05DE\u05DF</p></div>';
      return;
    }

    let html = '<div class="row g-3">';
    overdue.sort((a, b) => (a['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4'] || '').localeCompare(b['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4'] || '')).forEach(hw => {
      const hwId = hw['\u05DE\u05D6\u05D4\u05D4'];
      const days = Math.abs(this._hwDaysLeft(hw['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4']));
      const subs = this._hwGetSubmissions(hwId);
      const pending = subs.filter(s => s['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05DE\u05DE\u05EA\u05D9\u05DF');
      const color = this._hwSubjectColor(hw['\u05DE\u05E7\u05E6\u05D5\u05E2']);

      html += `
        <div class="col-md-6">
          <div class="card border-danger" style="border-width:2px">
            <div class="card-body">
              <div class="d-flex justify-content-between mb-2">
                <span class="badge bg-${color}">${hw['\u05DE\u05E7\u05E6\u05D5\u05E2']}</span>
                <span class="badge bg-danger"><i class="bi bi-exclamation-triangle me-1"></i>\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8 ${days} \u05D9\u05DE\u05D9\u05DD</span>
              </div>
              <h6 class="fw-bold">${hw['\u05DB\u05D5\u05EA\u05E8\u05EA'] || hw['\u05DE\u05E7\u05E6\u05D5\u05E2']}</h6>
              <div class="small text-muted mb-2">${hw['\u05DB\u05D9\u05EA\u05D4']} | \u05D4\u05D2\u05E9\u05D4: ${Utils.formatDateShort(hw['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4'])}</div>
              <div class="mb-2">
                <strong class="small">\u05DE\u05DE\u05EA\u05D9\u05E0\u05D9\u05DD (${pending.length}):</strong>
                <div class="mt-1">${pending.map(p => `<span class="badge bg-warning text-dark me-1 mb-1">${p['\u05E9\u05DD']}</span>`).join('')}</div>
              </div>
              <button class="btn btn-sm btn-outline-primary" onclick="Pages.hwShowSubmissions('${hwId}')">
                <i class="bi bi-people me-1"></i>\u05E4\u05EA\u05D7 \u05DE\u05E2\u05E7\u05D1
              </button>
            </div>
          </div>
        </div>
      `;
    });
    html += '</div>';
    el.innerHTML = html;
  },

  /* ======================================================================
     SUBMISSION TRACKING MODAL
     ====================================================================== */
  hwShowSubmissions(hwId) {
    const hw = this._hwData.find(h => h['\u05DE\u05D6\u05D4\u05D4'] === hwId);
    if (!hw) return;

    const subs = this._hwGetSubmissions(hwId);
    const titleEl = document.getElementById('hw-sub-title');
    const bodyEl = document.getElementById('hw-sub-body');
    if (titleEl) titleEl.textContent = '\u05DE\u05E2\u05E7\u05D1 \u05D4\u05D2\u05E9\u05D5\u05EA: ' + (hw['\u05DB\u05D5\u05EA\u05E8\u05EA'] || hw['\u05DE\u05E7\u05E6\u05D5\u05E2']);

    const submitted = subs.filter(s => s['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D4\u05D5\u05D2\u05E9').length;
    const pending = subs.filter(s => s['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05DE\u05DE\u05EA\u05D9\u05DF').length;
    const late = subs.filter(s => s['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8').length;
    const excused = subs.filter(s => s['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E4\u05D8\u05D5\u05E8').length;

    let html = `
      <div class="row g-2 mb-3">
        <div class="col-3"><div class="text-center p-2 rounded bg-success bg-opacity-10"><div class="fw-bold text-success">${submitted}</div><small>\u05D4\u05D5\u05D2\u05E9</small></div></div>
        <div class="col-3"><div class="text-center p-2 rounded bg-warning bg-opacity-10"><div class="fw-bold text-warning">${pending}</div><small>\u05DE\u05DE\u05EA\u05D9\u05DF</small></div></div>
        <div class="col-3"><div class="text-center p-2 rounded bg-danger bg-opacity-10"><div class="fw-bold text-danger">${late}</div><small>\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8</small></div></div>
        <div class="col-3"><div class="text-center p-2 rounded bg-secondary bg-opacity-10"><div class="fw-bold text-secondary">${excused}</div><small>\u05E4\u05D8\u05D5\u05E8</small></div></div>
      </div>
      <div class="table-responsive">
        <table class="table table-hover table-bht mb-0">
          <thead><tr><th style="width:40px"></th><th>\u05E9\u05DD</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th><th>\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05D2\u05E9\u05D4</th><th>\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA</th></tr></thead>
          <tbody>
    `;

    const statusBadge = (st) => {
      const map = {
        '\u05D4\u05D5\u05D2\u05E9': 'bg-success',
        '\u05DE\u05DE\u05EA\u05D9\u05DF': 'bg-warning text-dark',
        '\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8': 'bg-danger',
        '\u05E4\u05D8\u05D5\u05E8': 'bg-secondary'
      };
      return `<span class="badge ${map[st] || 'bg-secondary'}">${st}</span>`;
    };

    subs.forEach(sub => {
      const subId = sub['\u05DE\u05D6\u05D4\u05D4'];
      const isSubmitted = sub['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D4\u05D5\u05D2\u05E9';
      html += `
        <tr>
          <td>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" ${isSubmitted ? 'checked' : ''} onchange="Pages.hwToggleSubmission('${subId}', this.checked)">
            </div>
          </td>
          <td>${sub['\u05E9\u05DD']}</td>
          <td>${statusBadge(sub['\u05E1\u05D8\u05D8\u05D5\u05E1'])}</td>
          <td>${sub['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4'] ? Utils.formatDateShort(sub['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4']) : '-'}</td>
          <td>
            <div class="btn-group btn-group-sm">
              <button class="btn btn-outline-success btn-sm" onclick="Pages.hwSetSubStatus('${subId}','\u05D4\u05D5\u05D2\u05E9')" title="\u05D4\u05D5\u05D2\u05E9"><i class="bi bi-check-lg"></i></button>
              <button class="btn btn-outline-danger btn-sm" onclick="Pages.hwSetSubStatus('${subId}','\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8')" title="\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8"><i class="bi bi-clock-history"></i></button>
              <button class="btn btn-outline-secondary btn-sm" onclick="Pages.hwSetSubStatus('${subId}','\u05E4\u05D8\u05D5\u05E8')" title="\u05E4\u05D8\u05D5\u05E8"><i class="bi bi-dash-circle"></i></button>
            </div>
          </td>
        </tr>
      `;
    });

    html += '</tbody></table></div>';
    if (bodyEl) bodyEl.innerHTML = html;
    new bootstrap.Modal(document.getElementById('hw-submissions-modal')).show();
  },

  hwToggleSubmission(subId, checked) {
    const sub = this._hwSubmissions.find(s => s['\u05DE\u05D6\u05D4\u05D4'] === subId);
    if (!sub) return;
    sub['\u05E1\u05D8\u05D8\u05D5\u05E1'] = checked ? '\u05D4\u05D5\u05D2\u05E9' : '\u05DE\u05DE\u05EA\u05D9\u05DF';
    if (checked) sub['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4'] = Utils.todayISO();
    else sub['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4'] = '';
    // Re-render the submission modal
    const hwId = sub['\u05E9\u05D9\u05E2\u05D5\u05E8_\u05DE\u05D6\u05D4\u05D4'];
    this.hwShowSubmissions(hwId);
    this.hwRenderStats();
    this.hwRenderOverdueAlerts();
  },

  hwSetSubStatus(subId, status) {
    const sub = this._hwSubmissions.find(s => s['\u05DE\u05D6\u05D4\u05D4'] === subId);
    if (!sub) return;
    sub['\u05E1\u05D8\u05D8\u05D5\u05E1'] = status;
    if (status === '\u05D4\u05D5\u05D2\u05E9') sub['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4'] = Utils.todayISO();
    const hwId = sub['\u05E9\u05D9\u05E2\u05D5\u05E8_\u05DE\u05D6\u05D4\u05D4'];
    this.hwShowSubmissions(hwId);
    this.hwRenderStats();
    this.hwRenderOverdueAlerts();
    Utils.toast('\u05E1\u05D8\u05D8\u05D5\u05E1 \u05E2\u05D5\u05D3\u05DB\u05DF');
  },

  /* ======================================================================
     STUDENT HOMEWORK PROFILE
     ====================================================================== */
  hwShowStudentProfile(studentId) {
    const student = this._hwStudents.find(s => s._id === studentId);
    if (!student) return;

    const titleEl = document.getElementById('hw-student-title');
    const bodyEl = document.getElementById('hw-student-body');
    if (titleEl) titleEl.textContent = '\u05E4\u05E8\u05D5\u05E4\u05D9\u05DC: ' + student._fullName;

    const mySubs = this._hwSubmissions.filter(s => s['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4'] === studentId);
    const submitted = mySubs.filter(s => s['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D4\u05D5\u05D2\u05E9').length;
    const pending = mySubs.filter(s => s['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05DE\u05DE\u05EA\u05D9\u05DF').length;
    const late = mySubs.filter(s => s['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8').length;
    const excused = mySubs.filter(s => s['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E4\u05D8\u05D5\u05E8').length;
    const total = mySubs.length;
    const pct = total > 0 ? Math.round(((submitted + late) / total) * 100) : 0;

    const initials = Utils.getInitials(student._fullName);
    const colorIdx = parseInt(studentId.replace('S', '')) % Utils.AVATAR_COLORS.length;
    const avatarColor = Utils.AVATAR_COLORS[colorIdx];

    let html = `
      <div class="text-center mb-3">
        <div class="d-inline-flex align-items-center justify-content-center rounded-circle mb-2" style="width:64px;height:64px;background:${avatarColor};color:#fff;font-size:1.5rem;font-weight:bold">${initials}</div>
        <h5 class="mb-0">${student._fullName}</h5>
        <small class="text-muted">${student['\u05DB\u05D9\u05EA\u05D4']}</small>
      </div>
      <div class="row g-2 mb-3">
        <div class="col-3"><div class="text-center p-2 rounded bg-success bg-opacity-10"><div class="fw-bold text-success">${submitted}</div><small>\u05D4\u05D5\u05D2\u05E9</small></div></div>
        <div class="col-3"><div class="text-center p-2 rounded bg-warning bg-opacity-10"><div class="fw-bold text-warning">${pending}</div><small>\u05DE\u05DE\u05EA\u05D9\u05DF</small></div></div>
        <div class="col-3"><div class="text-center p-2 rounded bg-danger bg-opacity-10"><div class="fw-bold text-danger">${late}</div><small>\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8</small></div></div>
        <div class="col-3"><div class="text-center p-2 rounded bg-secondary bg-opacity-10"><div class="fw-bold text-secondary">${excused}</div><small>\u05E4\u05D8\u05D5\u05E8</small></div></div>
      </div>
      <div class="d-flex align-items-center gap-2 mb-3">
        <span class="small">\u05D0\u05D7\u05D5\u05D6 \u05D4\u05D2\u05E9\u05D4:</span>
        <div class="progress flex-grow-1" style="height:10px">
          <div class="progress-bar bg-success" style="width:${pct}%"></div>
        </div>
        <span class="fw-bold">${pct}%</span>
      </div>
      <div class="table-responsive">
        <table class="table table-hover table-bht mb-0">
          <thead><tr><th>\u05E9\u05D9\u05E2\u05D5\u05E8</th><th>\u05DE\u05E7\u05E6\u05D5\u05E2</th><th>\u05D4\u05D2\u05E9\u05D4</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th></tr></thead>
          <tbody>
    `;

    mySubs.forEach(sub => {
      const hw = this._hwData.find(h => h['\u05DE\u05D6\u05D4\u05D4'] === sub['\u05E9\u05D9\u05E2\u05D5\u05E8_\u05DE\u05D6\u05D4\u05D4']);
      if (!hw) return;
      const statusMap = {
        '\u05D4\u05D5\u05D2\u05E9': 'bg-success',
        '\u05DE\u05DE\u05EA\u05D9\u05DF': 'bg-warning text-dark',
        '\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8': 'bg-danger',
        '\u05E4\u05D8\u05D5\u05E8': 'bg-secondary'
      };
      html += `
        <tr>
          <td>${hw['\u05DB\u05D5\u05EA\u05E8\u05EA'] || hw['\u05DE\u05E7\u05E6\u05D5\u05E2']}</td>
          <td><span class="badge bg-${this._hwSubjectColor(hw['\u05DE\u05E7\u05E6\u05D5\u05E2'])}">${hw['\u05DE\u05E7\u05E6\u05D5\u05E2']}</span></td>
          <td>${Utils.formatDateShort(hw['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4'])}</td>
          <td><span class="badge ${statusMap[sub['\u05E1\u05D8\u05D8\u05D5\u05E1']] || 'bg-secondary'}">${sub['\u05E1\u05D8\u05D8\u05D5\u05E1']}</span></td>
        </tr>
      `;
    });

    html += '</tbody></table></div>';
    if (bodyEl) bodyEl.innerHTML = html;
    new bootstrap.Modal(document.getElementById('hw-student-modal')).show();
  },

  /* ======================================================================
     CRUD OPERATIONS
     ====================================================================== */
  hwShowAddModal() {
    document.getElementById('hf-title').value = '';
    document.getElementById('hf-desc').value = '';
    document.getElementById('hf-given').value = Utils.todayISO();
    document.getElementById('hf-due').value = '';
    new bootstrap.Modal(document.getElementById('hw-modal')).show();
  },

  async hwQuickAdd() {
    const subject = (document.getElementById('hw-quick-subject') || {}).value || '';
    const cls = (document.getElementById('hw-quick-class') || {}).value || '';
    const desc = (document.getElementById('hw-quick-desc') || {}).value || '';
    const due = (document.getElementById('hw-quick-due') || {}).value || '';
    if (!subject.trim() || !due) { Utils.toast('\u05DE\u05DC\u05D0 \u05DE\u05E7\u05E6\u05D5\u05E2 \u05D5\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05D2\u05E9\u05D4', 'warning'); return; }
    const row = {
      '\u05DB\u05D5\u05EA\u05E8\u05EA': subject.trim() + (cls ? ' \u2014 ' + cls : ''),
      '\u05DE\u05E7\u05E6\u05D5\u05E2': subject.trim(),
      '\u05DB\u05D9\u05EA\u05D4': cls.trim(),
      '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DE\u05EA\u05DF': Utils.todayISO(),
      '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4': due,
      '\u05EA\u05D9\u05D0\u05D5\u05E8': desc.trim(),
      '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC'
    };
    try {
      await App.apiCall('add', '\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9_\u05D1\u05D9\u05EA', { row });
      Utils.toast('\u05E9\u05D9\u05E2\u05D5\u05E8 \u05D1\u05D9\u05EA \u05E0\u05D5\u05E1\u05E3');
      this.homeworkInit();
    } catch (e) {
      row['\u05DE\u05D6\u05D4\u05D4'] = 'hw_' + Date.now();
      this._hwData.push(row);
      Utils.toast('\u05E9\u05D9\u05E2\u05D5\u05E8 \u05D1\u05D9\u05EA \u05E0\u05D5\u05E1\u05E3 (\u05DE\u05E7\u05D5\u05DE\u05D9)');
      this.homeworkInit();
    }
  },

  async hwSave() {
    const title = document.getElementById('hf-title').value.trim();
    const subject = document.getElementById('hf-subject').value;
    const cls = document.getElementById('hf-class').value;
    const given = document.getElementById('hf-given').value;
    const due = document.getElementById('hf-due').value;
    const desc = document.getElementById('hf-desc').value.trim();

    if (!title) { Utils.toast('\u05D7\u05E1\u05E8 \u05DB\u05D5\u05EA\u05E8\u05EA', 'warning'); return; }
    if (!due) { Utils.toast('\u05D7\u05E1\u05E8 \u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05D2\u05E9\u05D4', 'warning'); return; }

    const row = {
      '\u05DB\u05D5\u05EA\u05E8\u05EA': title,
      '\u05DE\u05E7\u05E6\u05D5\u05E2': subject,
      '\u05DB\u05D9\u05EA\u05D4': cls,
      '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DE\u05EA\u05DF': given,
      '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4': due,
      '\u05EA\u05D9\u05D0\u05D5\u05E8': desc,
      '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC'
    };

    try {
      await App.apiCall('add', '\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9_\u05D1\u05D9\u05EA', { row });
      bootstrap.Modal.getInstance(document.getElementById('hw-modal'))?.hide();
      Utils.toast('\u05E9\u05D9\u05E2\u05D5\u05E8 \u05D1\u05D9\u05EA \u05E0\u05D5\u05E1\u05E3');
      this.homeworkInit();
    } catch (e) {
      // Add to local demo data as fallback
      const newId = 'hw_' + Date.now();
      row['\u05DE\u05D6\u05D4\u05D4'] = newId;
      this._hwDemoAssignments.push(row);

      // Generate submissions for the new assignment
      const classStudents = this._hwStudents.filter(s => s['\u05DB\u05D9\u05EA\u05D4'] === cls);
      classStudents.forEach(s => {
        this._hwDemoSubmissions.push({
          '\u05DE\u05D6\u05D4\u05D4': 'sub_' + newId + '_' + s._id,
          '\u05E9\u05D9\u05E2\u05D5\u05E8_\u05DE\u05D6\u05D4\u05D4': newId,
          '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': s._id,
          '\u05E9\u05DD': s._fullName,
          '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05DE\u05DE\u05EA\u05D9\u05DF',
          '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4': ''
        });
      });

      bootstrap.Modal.getInstance(document.getElementById('hw-modal'))?.hide();
      Utils.toast('\u05E9\u05D9\u05E2\u05D5\u05E8 \u05D1\u05D9\u05EA \u05E0\u05D5\u05E1\u05E3 (\u05DE\u05E7\u05D5\u05DE\u05D9)');
      this.homeworkInit();
    }
  },

  async hwDelete(hwId) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4', '\u05DC\u05DE\u05D7\u05D5\u05E7 \u05E9\u05D9\u05E2\u05D5\u05E8 \u05D1\u05D9\u05EA \u05D6\u05D4?')) return;
    try {
      await App.apiCall('delete', '\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9_\u05D1\u05D9\u05EA', { id: hwId });
      Utils.toast('\u05E0\u05DE\u05D7\u05E7');
      this.homeworkInit();
    } catch (e) {
      // Remove from local demo data
      this._hwDemoAssignments = this._hwDemoAssignments.filter(h => h['\u05DE\u05D6\u05D4\u05D4'] !== hwId);
      this._hwDemoSubmissions = this._hwDemoSubmissions.filter(s => s['\u05E9\u05D9\u05E2\u05D5\u05E8_\u05DE\u05D6\u05D4\u05D4'] !== hwId);
      Utils.toast('\u05E0\u05DE\u05D7\u05E7');
      this.homeworkInit();
    }
  }
});
