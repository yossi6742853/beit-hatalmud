/* ===== BHT v5.3 — Education ===== */
Object.assign(Pages, {
  /* ======================================================================
     ACADEMICS — Full Exam & Grade Management
     ====================================================================== */

  /* --- Demo data --- */
  _acaDemoStudents: [
    {'\u05DE\u05D6\u05D4\u05D4':'s1','\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9':'\u05D9\u05D5\u05E1\u05E3','\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4':'\u05DB\u05D4\u05DF','\u05DB\u05D9\u05EA\u05D4':'\u05D0','\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05E4\u05E2\u05D9\u05DC'},
    {'\u05DE\u05D6\u05D4\u05D4':'s2','\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9':'\u05DE\u05E9\u05D4','\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4':'\u05DC\u05D5\u05D9','\u05DB\u05D9\u05EA\u05D4':'\u05D0','\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05E4\u05E2\u05D9\u05DC'},
    {'\u05DE\u05D6\u05D4\u05D4':'s3','\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9':'\u05D0\u05D1\u05E8\u05D4\u05DD','\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4':'\u05D9\u05E6\u05D7\u05E7\u05D9','\u05DB\u05D9\u05EA\u05D4':'\u05D0','\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05E4\u05E2\u05D9\u05DC'},
    {'\u05DE\u05D6\u05D4\u05D4':'s4','\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9':'\u05D9\u05E2\u05E7\u05D1','\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4':'\u05E4\u05E8\u05D9\u05D3\u05DE\u05DF','\u05DB\u05D9\u05EA\u05D4':'\u05D0','\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05E4\u05E2\u05D9\u05DC'},
    {'\u05DE\u05D6\u05D4\u05D4':'s5','\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9':'\u05D3\u05D5\u05D3','\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4':'\u05E9\u05E4\u05D9\u05E8\u05D0','\u05DB\u05D9\u05EA\u05D4':'\u05D1','\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05E4\u05E2\u05D9\u05DC'},
    {'\u05DE\u05D6\u05D4\u05D4':'s6','\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9':'\u05E9\u05DE\u05D5\u05D0\u05DC','\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4':'\u05D0\u05D6\u05D5\u05DC\u05D0\u05D9','\u05DB\u05D9\u05EA\u05D4':'\u05D1','\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05E4\u05E2\u05D9\u05DC'},
    {'\u05DE\u05D6\u05D4\u05D4':'s7','\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9':'\u05D0\u05DC\u05D9\u05D4\u05D5','\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4':'\u05D1\u05DF \u05D3\u05D5\u05D3','\u05DB\u05D9\u05EA\u05D4':'\u05D1','\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05E4\u05E2\u05D9\u05DC'},
    {'\u05DE\u05D6\u05D4\u05D4':'s8','\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9':'\u05E0\u05EA\u05E0\u05D0\u05DC','\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4':'\u05D2\u05D5\u05DC\u05D3\u05D1\u05E8\u05D2','\u05DB\u05D9\u05EA\u05D4':'\u05D1','\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05E4\u05E2\u05D9\u05DC'},
    {'\u05DE\u05D6\u05D4\u05D4':'s9','\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9':'\u05D7\u05D9\u05D9\u05DD','\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4':'\u05E8\u05D1\u05D9\u05E0\u05D5\u05D1\u05D9\u05E5','\u05DB\u05D9\u05EA\u05D4':'\u05D0','\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05E4\u05E2\u05D9\u05DC'},
    {'\u05DE\u05D6\u05D4\u05D4':'s10','\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9':'\u05D0\u05E8\u05D9\u05D4','\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4':'\u05DC\u05D5\u05D9\u05E0\u05E9\u05D8\u05D9\u05D9\u05DF','\u05DB\u05D9\u05EA\u05D4':'\u05D0','\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05E4\u05E2\u05D9\u05DC'},
    {'\u05DE\u05D6\u05D4\u05D4':'s11','\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9':'\u05E8\u05E4\u05D0\u05DC','\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4':'\u05D0\u05D1\u05E8\u05DE\u05D5\u05D1\u05D9\u05E5','\u05DB\u05D9\u05EA\u05D4':'\u05D1','\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05E4\u05E2\u05D9\u05DC'},
    {'\u05DE\u05D6\u05D4\u05D4':'s12','\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9':'\u05D1\u05E0\u05D9\u05DE\u05D9\u05DF','\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4':'\u05E9\u05D8\u05E8\u05E0\u05D1\u05E8\u05D2','\u05DB\u05D9\u05EA\u05D4':'\u05D1','\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05E4\u05E2\u05D9\u05DC'}
  ],
  _acaDemoExams: [
    {'\u05DE\u05D6\u05D4\u05D4':'e1','\u05E9\u05DD':'\u05DE\u05D1\u05D7\u05DF \u05D2\u05DE\u05E8\u05D0 \u05D0','\u05DE\u05E7\u05E6\u05D5\u05E2':'\u05D2\u05DE\u05E8\u05D0','\u05DB\u05D9\u05EA\u05D4':'\u05D0','\u05EA\u05D0\u05E8\u05D9\u05DA':'2026-03-15','\u05E0\u05D9\u05E7\u05D5\u05D3_\u05DE\u05E7\u05E1\u05D9\u05DE\u05DC\u05D9':'100','\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05D4\u05D5\u05E9\u05DC\u05DD'},
    {'\u05DE\u05D6\u05D4\u05D4':'e2','\u05E9\u05DD':'\u05DE\u05D1\u05D7\u05DF \u05D7\u05D5\u05DE\u05E9 \u05D0','\u05DE\u05E7\u05E6\u05D5\u05E2':'\u05D7\u05D5\u05DE\u05E9','\u05DB\u05D9\u05EA\u05D4':'\u05D0','\u05EA\u05D0\u05E8\u05D9\u05DA':'2026-03-20','\u05E0\u05D9\u05E7\u05D5\u05D3_\u05DE\u05E7\u05E1\u05D9\u05DE\u05DC\u05D9':'100','\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05D4\u05D5\u05E9\u05DC\u05DD'},
    {'\u05DE\u05D6\u05D4\u05D4':'e3','\u05E9\u05DD':'\u05DE\u05D1\u05D7\u05DF \u05D4\u05DC\u05DB\u05D4 \u05D0','\u05DE\u05E7\u05E6\u05D5\u05E2':'\u05D4\u05DC\u05DB\u05D4','\u05DB\u05D9\u05EA\u05D4':'\u05D0','\u05EA\u05D0\u05E8\u05D9\u05DA':'2026-04-01','\u05E0\u05D9\u05E7\u05D5\u05D3_\u05DE\u05E7\u05E1\u05D9\u05DE\u05DC\u05D9':'100','\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05D4\u05D5\u05E9\u05DC\u05DD'},
    {'\u05DE\u05D6\u05D4\u05D4':'e4','\u05E9\u05DD':'\u05DE\u05D1\u05D7\u05DF \u05E0"\u05DA \u05D0','\u05DE\u05E7\u05E6\u05D5\u05E2':'\u05E0"\u05DA','\u05DB\u05D9\u05EA\u05D4':'\u05D0','\u05EA\u05D0\u05E8\u05D9\u05DA':'2026-04-10','\u05E0\u05D9\u05E7\u05D5\u05D3_\u05DE\u05E7\u05E1\u05D9\u05DE\u05DC\u05D9':'100','\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05DE\u05EA\u05D5\u05DB\u05E0\u05DF'},
    {'\u05DE\u05D6\u05D4\u05D4':'e5','\u05E9\u05DD':'\u05DE\u05D1\u05D7\u05DF \u05D2\u05DE\u05E8\u05D0 \u05D1','\u05DE\u05E7\u05E6\u05D5\u05E2':'\u05D2\u05DE\u05E8\u05D0','\u05DB\u05D9\u05EA\u05D4':'\u05D1','\u05EA\u05D0\u05E8\u05D9\u05DA':'2026-03-18','\u05E0\u05D9\u05E7\u05D5\u05D3_\u05DE\u05E7\u05E1\u05D9\u05DE\u05DC\u05D9':'100','\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05D4\u05D5\u05E9\u05DC\u05DD'},
    {'\u05DE\u05D6\u05D4\u05D4':'e6','\u05E9\u05DD':'\u05DE\u05D1\u05D7\u05DF \u05D7\u05D5\u05DE\u05E9 \u05D1','\u05DE\u05E7\u05E6\u05D5\u05E2':'\u05D7\u05D5\u05DE\u05E9','\u05DB\u05D9\u05EA\u05D4':'\u05D1','\u05EA\u05D0\u05E8\u05D9\u05DA':'2026-03-25','\u05E0\u05D9\u05E7\u05D5\u05D3_\u05DE\u05E7\u05E1\u05D9\u05DE\u05DC\u05D9':'100','\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05D4\u05D5\u05E9\u05DC\u05DD'},
    {'\u05DE\u05D6\u05D4\u05D4':'e7','\u05E9\u05DD':'\u05DE\u05D1\u05D7\u05DF \u05D4\u05DC\u05DB\u05D4 \u05D1','\u05DE\u05E7\u05E6\u05D5\u05E2':'\u05D4\u05DC\u05DB\u05D4','\u05DB\u05D9\u05EA\u05D4':'\u05D1','\u05EA\u05D0\u05E8\u05D9\u05DA':'2026-04-05','\u05E0\u05D9\u05E7\u05D5\u05D3_\u05DE\u05E7\u05E1\u05D9\u05DE\u05DC\u05D9':'100','\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05D4\u05D5\u05E9\u05DC\u05DD'},
    {'\u05DE\u05D6\u05D4\u05D4':'e8','\u05E9\u05DD':'\u05DE\u05D1\u05D7\u05DF \u05E0"\u05DA \u05D1','\u05DE\u05E7\u05E6\u05D5\u05E2':'\u05E0"\u05DA','\u05DB\u05D9\u05EA\u05D4':'\u05D1','\u05EA\u05D0\u05E8\u05D9\u05DA':'2026-04-15','\u05E0\u05D9\u05E7\u05D5\u05D3_\u05DE\u05E7\u05E1\u05D9\u05DE\u05DC\u05D9':'100','\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05DE\u05EA\u05D5\u05DB\u05E0\u05DF'}
  ],
  _acaDemoGrades: null,
  _getAcaDemoGrades() {
    if (this._acaDemoGrades) return this._acaDemoGrades;
    // Generate grades: 12 students x 8 exams
    const grades = [];
    const scoreMap = {
      's1':  [92,88,95,90,0,0,0,0], 's2':  [78,65,72,0,0,0,0,0], 's3':  [85,91,88,82,0,0,0,0],
      's4':  [60,55,48,0,0,0,0,0], 's5':  [0,0,0,0,88,92,85,78], 's6':  [0,0,0,0,72,68,75,0],
      's7':  [0,0,0,0,95,90,98,92], 's8':  [0,0,0,0,58,62,55,0], 's9':  [70,82,76,68,0,0,0,0],
      's10': [98,95,100,94,0,0,0,0], 's11': [0,0,0,0,80,85,78,82], 's12': [0,0,0,0,45,50,42,0]
    };
    const examIds = ['e1','e2','e3','e4','e5','e6','e7','e8'];
    Object.keys(scoreMap).forEach(sid => {
      const st = this._acaDemoStudents.find(s => s['\u05DE\u05D6\u05D4\u05D4'] === sid);
      scoreMap[sid].forEach((score, i) => {
        if (score > 0) {
          grades.push({
            '\u05DE\u05D6\u05D4\u05D4': 'g_' + sid + '_' + examIds[i],
            '\u05DE\u05D1\u05D7\u05DF_\u05DE\u05D6\u05D4\u05D4': examIds[i],
            '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': sid,
            '\u05E9\u05DD': st ? Utils.fullName(st) : sid,
            '\u05E6\u05D9\u05D5\u05DF': String(score),
            '\u05D4\u05E2\u05E8\u05D5\u05EA': ''
          });
        }
      });
    });
    this._acaDemoGrades = grades;
    return grades;
  },

  /* --- Page render --- */
  academics() {
    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div><h1><i class="bi bi-journal-text me-2"></i>\u05DE\u05D1\u05D7\u05E0\u05D9\u05DD \u05D5\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD</h1></div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-secondary btn-sm" onclick="Pages.acaToggleDemo()"><i class="bi bi-database me-1"></i><span id="aca-demo-btn">\u05D8\u05E2\u05DF \u05D3\u05DE\u05D5</span></button>
        <button class="btn btn-primary btn-sm" onclick="Pages.showAddExam()"><i class="bi bi-plus-lg me-1"></i>\u05DE\u05D1\u05D7\u05DF \u05D7\u05D3\u05E9</button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="row g-3 mb-3" id="aca-stats">
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-3 fw-bold text-primary" id="aca-stat-total">0</div><small class="text-muted">\u05E1\u05D4"\u05DB \u05DE\u05D1\u05D7\u05E0\u05D9\u05DD</small></div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-3 fw-bold text-success" id="aca-stat-avg">--</div><small class="text-muted">\u05DE\u05DE\u05D5\u05E6\u05E2 \u05DB\u05DC\u05DC\u05D9</small></div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-3 fw-bold text-info" id="aca-stat-above80">0</div><small class="text-muted">\u05DE\u05E2\u05DC 80%</small></div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-3 fw-bold text-danger" id="aca-stat-failing">0</div><small class="text-muted">\u05E0\u05DB\u05E9\u05DC\u05D9\u05DD (< 55)</small></div></div>
    </div>

    <!-- Subject Cards -->
    <div class="row g-3 mb-3" id="aca-subject-cards"></div>

    <!-- Filter -->
    <div class="d-flex gap-2 mb-3 flex-wrap">
      <select class="form-select form-select-sm" id="aca-filter-class" style="width:140px" onchange="Pages.renderAca()">
        <option value="">\u05DB\u05DC \u05D4\u05DB\u05D9\u05EA\u05D5\u05EA</option>
      </select>
      <select class="form-select form-select-sm" id="aca-filter-subject" style="width:140px" onchange="Pages.renderAca()">
        <option value="">\u05DB\u05DC \u05D4\u05DE\u05E7\u05E6\u05D5\u05E2\u05D5\u05EA</option>
      </select>
      <select class="form-select form-select-sm" id="aca-filter-status" style="width:140px" onchange="Pages.renderAca()">
        <option value="">\u05DB\u05DC \u05D4\u05E1\u05D8\u05D8\u05D5\u05E1\u05D9\u05DD</option>
        <option value="\u05D4\u05D5\u05E9\u05DC\u05DD">\u05D4\u05D5\u05E9\u05DC\u05DD</option>
        <option value="\u05DE\u05EA\u05D5\u05DB\u05E0\u05DF">\u05DE\u05EA\u05D5\u05DB\u05E0\u05DF</option>
      </select>
    </div>

    <!-- Exam List -->
    <div id="aca-list">${Utils.skeleton(3)}</div>

    <!-- Grades Section (opens inline) -->
    <div id="aca-grades-section" style="display:none" class="mt-3"></div>

    <!-- Student Profile Section -->
    <div id="aca-student-profile" style="display:none" class="mt-3"></div>

    <!-- Distribution Chart Section -->
    <div id="aca-distribution" style="display:none" class="mt-3"></div>

    <!-- Report Card Section -->
    <div id="aca-report-card" style="display:none" class="mt-3"></div>

    <!-- Create Exam Modal -->
    <div class="modal fade" id="aca-modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header"><h5 class="modal-title">\u05DE\u05D1\u05D7\u05DF \u05D7\u05D3\u05E9</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
          <div class="modal-body">
            <div class="row g-3">
              <div class="col-12"><label class="form-label">\u05E9\u05DD \u05D4\u05DE\u05D1\u05D7\u05DF</label><input class="form-control" id="af-name" placeholder="\u05DC\u05DE\u05E9\u05DC: \u05DE\u05D1\u05D7\u05DF \u05D2\u05DE\u05E8\u05D0 \u05D0'"></div>
              <div class="col-6"><label class="form-label">\u05DE\u05E7\u05E6\u05D5\u05E2</label><input class="form-control" id="af-subject" list="af-subject-list"><datalist id="af-subject-list"><option value="\u05D2\u05DE\u05E8\u05D0"><option value="\u05D7\u05D5\u05DE\u05E9"><option value="\u05D4\u05DC\u05DB\u05D4"><option value='\u05E0"\u05DA'></datalist></div>
              <div class="col-6"><label class="form-label">\u05DB\u05D9\u05EA\u05D4</label><input class="form-control" id="af-class"></div>
              <div class="col-6"><label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA</label><input type="date" class="form-control" id="af-date"></div>
              <div class="col-6"><label class="form-label">\u05E0\u05D9\u05E7\u05D5\u05D3 \u05DE\u05E7\u05E1\u05D9\u05DE\u05DC\u05D9</label><input type="number" class="form-control" id="af-maxscore" value="100" min="1"></div>
              <div class="col-12"><label class="form-label">\u05EA\u05D9\u05D0\u05D5\u05E8</label><input class="form-control" id="af-desc"></div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button>
            <button class="btn btn-primary" onclick="Pages.saveExam()">\u05E9\u05DE\u05D5\u05E8</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Student Select Modal (for profile) -->
    <div class="modal fade" id="aca-student-modal" tabindex="-1">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header"><h5 class="modal-title">\u05D1\u05D7\u05E8 \u05EA\u05DC\u05DE\u05D9\u05D3</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
          <div class="modal-body">
            <input class="form-control mb-2" id="aca-student-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9..." oninput="Pages.filterStudentList()">
            <div id="aca-student-list" style="max-height:300px;overflow-y:auto"></div>
          </div>
        </div>
      </div>
    </div>`;
  },

  _acaExams: [], _acaGrades: [], _acaStudents: [], _acaUseDemo: false,

  async academicsInit() {
    // Try real data first
    const [exams, grades, students] = await Promise.all([
      App.getData('\u05DE\u05D1\u05D7\u05E0\u05D9\u05DD').catch(() => []),
      App.getData('\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD').catch(() => []),
      App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD').catch(() => [])
    ]);
    this._acaExams = exams;
    this._acaGrades = grades;
    this._acaStudents = students;

    // If no data and not explicitly using demo, auto-enable demo
    if (!exams.length && !grades.length) {
      this._acaUseDemo = true;
    }
    this._acaApplyData();
    this._acaPopulateFilters();
    this.renderAca();
  },

  _acaApplyData() {
    if (this._acaUseDemo) {
      this._acaActiveExams = [...this._acaDemoExams];
      this._acaActiveGrades = this._getAcaDemoGrades();
      this._acaActiveStudents = [...this._acaDemoStudents];
    } else {
      this._acaActiveExams = this._acaExams;
      this._acaActiveGrades = this._acaGrades;
      this._acaActiveStudents = this._acaStudents;
    }
    const btn = document.getElementById('aca-demo-btn');
    if (btn) btn.textContent = this._acaUseDemo ? '\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05D0\u05DE\u05D9\u05EA\u05D9\u05D9\u05DD' : '\u05D8\u05E2\u05DF \u05D3\u05DE\u05D5';
  },

  acaToggleDemo() {
    this._acaUseDemo = !this._acaUseDemo;
    this._acaApplyData();
    this._acaPopulateFilters();
    this.renderAca();
    Utils.toast(this._acaUseDemo ? '\u05DE\u05E6\u05D9\u05D2 \u05E0\u05EA\u05D5\u05E0\u05D9 \u05D3\u05DE\u05D5' : '\u05DE\u05E6\u05D9\u05D2 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05D0\u05DE\u05D9\u05EA\u05D9\u05D9\u05DD', 'info');
  },

  _acaPopulateFilters() {
    const exams = this._acaActiveExams;
    const classes = [...new Set(exams.map(e => e['\u05DB\u05D9\u05EA\u05D4']).filter(Boolean))].sort();
    const subjects = [...new Set(exams.map(e => e['\u05DE\u05E7\u05E6\u05D5\u05E2']).filter(Boolean))].sort();
    const classSel = document.getElementById('aca-filter-class');
    const subjSel = document.getElementById('aca-filter-subject');
    if (classSel) {
      const cur = classSel.value;
      classSel.innerHTML = '<option value="">\u05DB\u05DC \u05D4\u05DB\u05D9\u05EA\u05D5\u05EA</option>' + classes.map(c => `<option value="${c}">${c}</option>`).join('');
      classSel.value = cur;
    }
    if (subjSel) {
      const cur = subjSel.value;
      subjSel.innerHTML = '<option value="">\u05DB\u05DC \u05D4\u05DE\u05E7\u05E6\u05D5\u05E2\u05D5\u05EA</option>' + subjects.map(s => `<option value="${s}">${s}</option>`).join('');
      subjSel.value = cur;
    }
  },

  renderAca() {
    const exams = this._acaActiveExams || [];
    const grades = this._acaActiveGrades || [];
    const classF = document.getElementById('aca-filter-class')?.value || '';
    const subjF = document.getElementById('aca-filter-subject')?.value || '';
    const statusF = document.getElementById('aca-filter-status')?.value || '';

    let filtered = exams;
    if (classF) filtered = filtered.filter(e => (e['\u05DB\u05D9\u05EA\u05D4']||'') === classF);
    if (subjF) filtered = filtered.filter(e => (e['\u05DE\u05E7\u05E6\u05D5\u05E2']||'') === subjF);
    if (statusF) filtered = filtered.filter(e => (e['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') === statusF);

    // Build grade map per exam
    const gMap = {};
    grades.forEach(g => {
      const eid = g['\u05DE\u05D1\u05D7\u05DF_\u05DE\u05D6\u05D4\u05D4']||'';
      if (!gMap[eid]) gMap[eid] = [];
      gMap[eid].push(parseFloat(g['\u05E6\u05D9\u05D5\u05DF'])||0);
    });

    // All grades flat
    const allG = grades.map(g => parseFloat(g['\u05E6\u05D9\u05D5\u05DF'])||0).filter(g => g > 0);
    const avg = allG.length ? (allG.reduce((a,b) => a+b, 0) / allG.length).toFixed(1) : '--';

    // Per-student averages
    const studentAvgs = {};
    grades.forEach(g => {
      const sid = g['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4']||g['\u05E9\u05DD']||'';
      const score = parseFloat(g['\u05E6\u05D9\u05D5\u05DF'])||0;
      if (!sid || score <= 0) return;
      if (!studentAvgs[sid]) studentAvgs[sid] = { sum: 0, count: 0 };
      studentAvgs[sid].sum += score;
      studentAvgs[sid].count++;
    });
    const above80 = Object.values(studentAvgs).filter(s => (s.sum/s.count) >= 80).length;
    const failing = Object.values(studentAvgs).filter(s => (s.sum/s.count) < 55).length;

    // Stats cards
    document.getElementById('aca-stat-total').textContent = exams.length;
    document.getElementById('aca-stat-avg').textContent = avg;
    document.getElementById('aca-stat-above80').textContent = above80;
    document.getElementById('aca-stat-failing').textContent = failing;

    // Subject cards
    this._renderSubjectCards(exams, grades, gMap);

    // Exam list
    if (!filtered.length) {
      document.getElementById('aca-list').innerHTML = '<div class="empty-state"><i class="bi bi-journal-text"></i><h5>\u05D0\u05D9\u05DF \u05DE\u05D1\u05D7\u05E0\u05D9\u05DD</h5></div>';
      return;
    }

    document.getElementById('aca-list').innerHTML = `<div class="card"><div class="table-responsive"><table class="table table-bht mb-0">
      <thead><tr>
        <th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05E9\u05DD</th><th>\u05DE\u05E7\u05E6\u05D5\u05E2</th><th>\u05DB\u05D9\u05EA\u05D4</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th><th>\u05DE\u05DE\u05D5\u05E6\u05E2</th><th>\u05D2\u05D1\u05D5\u05D4 / \u05E0\u05DE\u05D5\u05DA</th><th></th>
      </tr></thead>
      <tbody>${filtered.map(e => {
        const eid = e['\u05DE\u05D6\u05D4\u05D4']||e.id;
        const g = gMap[eid]||[];
        const ea = g.length ? (g.reduce((a,b) => a+b, 0)/g.length).toFixed(1) : '--';
        const max = parseFloat(e['\u05E0\u05D9\u05E7\u05D5\u05D3_\u05DE\u05E7\u05E1\u05D9\u05DE\u05DC\u05D9'])||100;
        const highest = g.length ? Math.max(...g) : '--';
        const lowest = g.length ? Math.min(...g) : '--';
        const ac = ea !== '--' ? (parseFloat(ea) >= 70 ? 'text-success' : parseFloat(ea) >= 55 ? 'text-warning' : 'text-danger') : '';
        const statusBadge = (e['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') === '\u05D4\u05D5\u05E9\u05DC\u05DD'
          ? '<span class="badge bg-success">\u05D4\u05D5\u05E9\u05DC\u05DD</span>'
          : '<span class="badge bg-warning text-dark">\u05DE\u05EA\u05D5\u05DB\u05E0\u05DF</span>';
        return `<tr style="cursor:pointer" onclick="Pages.viewGrades('${eid}')">
          <td>${Utils.formatDateShort(e['\u05EA\u05D0\u05E8\u05D9\u05DA'])}</td>
          <td class="fw-medium">${e['\u05E9\u05DD']||e['\u05EA\u05D9\u05D0\u05D5\u05E8']||''}</td>
          <td><span class="badge bg-info">${e['\u05DE\u05E7\u05E6\u05D5\u05E2']||''}</span></td>
          <td>${e['\u05DB\u05D9\u05EA\u05D4']||''}</td>
          <td>${statusBadge}</td>
          <td class="fw-bold ${ac}">${ea} <small class="text-muted">(${g.length})</small></td>
          <td><small>${highest !== '--' ? '\u2191'+highest+' \u2193'+lowest : ''}</small></td>
          <td onclick="event.stopPropagation()">
            <div class="d-flex gap-1">
              <button class="btn btn-sm btn-outline-info" onclick="Pages.showDistribution('${eid}')" title="\u05D4\u05EA\u05E4\u05DC\u05D2\u05D5\u05EA"><i class="bi bi-bar-chart"></i></button>
              <button class="btn btn-sm btn-outline-danger" onclick="Pages.deleteExam('${eid}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button>
            </div>
          </td>
        </tr>`;
      }).join('')}</tbody></table></div></div>

      <div class="mt-3 d-flex gap-2 flex-wrap">
        <button class="btn btn-outline-primary btn-sm" onclick="Pages.showStudentSelect()"><i class="bi bi-person-lines-fill me-1"></i>\u05E4\u05E8\u05D5\u05E4\u05D9\u05DC \u05EA\u05DC\u05DE\u05D9\u05D3</button>
        <button class="btn btn-outline-success btn-sm" onclick="Pages.showReportSelect()"><i class="bi bi-printer me-1"></i>\u05D4\u05E4\u05E7 \u05EA\u05E2\u05D5\u05D3\u05D4</button>
      </div>`;
  },

  _renderSubjectCards(exams, grades, gMap) {
    const subjects = {};
    exams.forEach(e => {
      const subj = e['\u05DE\u05E7\u05E6\u05D5\u05E2']||'';
      if (!subj) return;
      if (!subjects[subj]) subjects[subj] = { exams: [], grades: [] };
      subjects[subj].exams.push(e);
      const eid = e['\u05DE\u05D6\u05D4\u05D4']||e.id;
      (gMap[eid]||[]).forEach(g => subjects[subj].grades.push(g));
    });

    const container = document.getElementById('aca-subject-cards');
    if (!container) return;

    const subjKeys = Object.keys(subjects).sort();
    if (!subjKeys.length) { container.innerHTML = ''; return; }

    const colors = ['primary','success','info','warning','danger','secondary'];
    container.innerHTML = subjKeys.map((subj, i) => {
      const s = subjects[subj];
      const avg = s.grades.length ? (s.grades.reduce((a,b) => a+b, 0)/s.grades.length).toFixed(1) : '--';
      const highest = s.grades.length ? Math.max(...s.grades) : '--';
      const lowest = s.grades.length ? Math.min(...s.grades) : '--';
      const color = colors[i % colors.length];
      // Trend: compare last 2 exam averages
      let trend = '';
      if (s.exams.length >= 2) {
        const sorted = s.exams.slice().sort((a,b) => (a['\u05EA\u05D0\u05E8\u05D9\u05DA']||'').localeCompare(b['\u05EA\u05D0\u05E8\u05D9\u05DA']||''));
        const last2 = sorted.slice(-2);
        const avg1 = this._examAvg(last2[0], gMap);
        const avg2 = this._examAvg(last2[1], gMap);
        if (avg1 !== null && avg2 !== null) {
          const diff = avg2 - avg1;
          trend = diff > 2 ? '<i class="bi bi-arrow-up-circle-fill text-success"></i>' :
                  diff < -2 ? '<i class="bi bi-arrow-down-circle-fill text-danger"></i>' :
                  '<i class="bi bi-dash-circle text-secondary"></i>';
        }
      }
      return `<div class="col-6 col-md-3">
        <div class="card border-${color}" style="border-width:2px;cursor:pointer" onclick="document.getElementById('aca-filter-subject').value='${subj}';Pages.renderAca();">
          <div class="card-body p-3">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <h6 class="fw-bold mb-0 text-${color}">${subj}</h6>
              ${trend}
            </div>
            <div class="fs-4 fw-bold">${avg}</div>
            <div class="small text-muted">${s.exams.length} \u05DE\u05D1\u05D7\u05E0\u05D9\u05DD</div>
            <div class="d-flex justify-content-between small mt-1">
              <span class="text-success">\u2191 ${highest}</span>
              <span class="text-danger">\u2193 ${lowest}</span>
            </div>
          </div>
        </div>
      </div>`;
    }).join('');
  },

  _examAvg(exam, gMap) {
    if (!exam) return null;
    const eid = exam['\u05DE\u05D6\u05D4\u05D4']||exam.id;
    const g = gMap[eid]||[];
    return g.length ? g.reduce((a,b) => a+b, 0)/g.length : null;
  },

  showAddExam() {
    document.getElementById('af-date').value = Utils.todayISO();
    document.getElementById('af-name').value = '';
    document.getElementById('af-subject').value = '';
    document.getElementById('af-class').value = '';
    document.getElementById('af-maxscore').value = '100';
    document.getElementById('af-desc').value = '';
    new bootstrap.Modal(document.getElementById('aca-modal')).show();
  },

  async saveExam() {
    const name = document.getElementById('af-name').value.trim();
    const subject = document.getElementById('af-subject').value.trim();
    const cls = document.getElementById('af-class').value.trim();
    const maxScore = document.getElementById('af-maxscore').value || '100';
    if (!name && !subject) { Utils.toast('\u05D7\u05E1\u05E8 \u05E9\u05DD \u05D0\u05D5 \u05DE\u05E7\u05E6\u05D5\u05E2', 'warning'); return; }

    if (this._acaUseDemo) {
      // Add to demo data
      const eid = 'e' + Date.now();
      this._acaDemoExams.push({
        '\u05DE\u05D6\u05D4\u05D4': eid,
        '\u05E9\u05DD': name || subject,
        '\u05DE\u05E7\u05E6\u05D5\u05E2': subject,
        '\u05DB\u05D9\u05EA\u05D4': cls,
        '\u05EA\u05D0\u05E8\u05D9\u05DA': document.getElementById('af-date').value,
        '\u05E0\u05D9\u05E7\u05D5\u05D3_\u05DE\u05E7\u05E1\u05D9\u05DE\u05DC\u05D9': maxScore,
        '\u05EA\u05D9\u05D0\u05D5\u05E8': document.getElementById('af-desc').value.trim(),
        '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05DE\u05EA\u05D5\u05DB\u05E0\u05DF'
      });
      this._acaApplyData();
      this._acaPopulateFilters();
      bootstrap.Modal.getInstance(document.getElementById('aca-modal')).hide();
      Utils.toast('\u05DE\u05D1\u05D7\u05DF \u05E0\u05D5\u05E1\u05E3 (\u05D3\u05DE\u05D5)');
      this.renderAca();
      return;
    }

    const row = {
      '\u05E9\u05DD': name || subject,
      '\u05DE\u05E7\u05E6\u05D5\u05E2': subject,
      '\u05DB\u05D9\u05EA\u05D4': cls,
      '\u05EA\u05D0\u05E8\u05D9\u05DA': document.getElementById('af-date').value,
      '\u05E0\u05D9\u05E7\u05D5\u05D3_\u05DE\u05E7\u05E1\u05D9\u05DE\u05DC\u05D9': maxScore,
      '\u05EA\u05D9\u05D0\u05D5\u05E8': document.getElementById('af-desc').value.trim(),
      '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05DE\u05EA\u05D5\u05DB\u05E0\u05DF'
    };
    try {
      await App.apiCall('add', '\u05DE\u05D1\u05D7\u05E0\u05D9\u05DD', { row });
      bootstrap.Modal.getInstance(document.getElementById('aca-modal')).hide();
      Utils.toast('\u05DE\u05D1\u05D7\u05DF \u05E0\u05E9\u05DE\u05E8');
      this.academicsInit();
    } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4', 'danger'); }
  },

  async deleteExam(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4','\u05DC\u05DE\u05D7\u05D5\u05E7 \u05DE\u05D1\u05D7\u05DF \u05D6\u05D4?')) return;
    if (this._acaUseDemo) {
      this._acaDemoExams = this._acaDemoExams.filter(e => (e['\u05DE\u05D6\u05D4\u05D4']||e.id) !== id);
      this._acaDemoGrades = null; // force recalc
      this._acaApplyData();
      Utils.toast('\u05E0\u05DE\u05D7\u05E7');
      this.renderAca();
      return;
    }
    try { await App.apiCall('delete','\u05DE\u05D1\u05D7\u05E0\u05D9\u05DD',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.academicsInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },

  /* --- Grade entry (spreadsheet-style) --- */
  async viewGrades(examId) {
    const section = document.getElementById('aca-grades-section');
    if (!section) return;
    // Hide other sections
    document.getElementById('aca-student-profile').style.display = 'none';
    document.getElementById('aca-distribution').style.display = 'none';
    document.getElementById('aca-report-card').style.display = 'none';

    section.style.display = '';
    section.innerHTML = '<div class="card p-3"><div class="text-center py-3"><div class="spinner-border spinner-border-sm"></div> \u05D8\u05D5\u05E2\u05DF...</div></div>';

    const exams = this._acaActiveExams;
    const grades = this._acaActiveGrades;
    const students = this._acaActiveStudents.length ? this._acaActiveStudents : await App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD').catch(() => []);

    const exam = exams.find(e => String(e['\u05DE\u05D6\u05D4\u05D4']||e.id) === String(examId));
    const examClass = exam ? (exam['\u05DB\u05D9\u05EA\u05D4']||'') : '';
    const maxScore = parseFloat(exam?.['\u05E0\u05D9\u05E7\u05D5\u05D3_\u05DE\u05E7\u05E1\u05D9\u05DE\u05DC\u05D9'])||100;

    const classStudents = examClass
      ? students.filter(s => (s['\u05DB\u05D9\u05EA\u05D4']||'') === examClass && (s['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') !== '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC')
      : students.filter(s => (s['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') !== '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC');

    const examGrades = grades.filter(g => String(g['\u05DE\u05D1\u05D7\u05DF_\u05DE\u05D6\u05D4\u05D4']||'') === String(examId));
    const gradeMap = {};
    examGrades.forEach(g => { gradeMap[g['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4']||g['\u05E9\u05DD']||''] = g; });

    const examLabel = (exam ? (exam['\u05E9\u05DD']||exam['\u05DE\u05E7\u05E6\u05D5\u05E2']||'') : '') + (examClass ? ' (' + examClass + ')' : '');
    const gradeValues = examGrades.map(g => parseFloat(g['\u05E6\u05D9\u05D5\u05DF'])||0).filter(v => v > 0);
    const examAvg = gradeValues.length ? (gradeValues.reduce((a,b) => a+b, 0)/gradeValues.length).toFixed(1) : '--';

    let html = `<div class="card p-3">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h6 class="fw-bold mb-0"><i class="bi bi-pencil-square me-2"></i>\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD: ${examLabel}</h6>
          <small class="text-muted">\u05E0\u05D9\u05E7\u05D5\u05D3 \u05DE\u05E7\u05E1\u05D9\u05DE\u05DC\u05D9: ${maxScore} | \u05DE\u05DE\u05D5\u05E6\u05E2: ${examAvg} | ${gradeValues.length}/${classStudents.length} \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD</small>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-outline-primary" onclick="Pages.saveAllGrades('${examId}')" title="\u05E9\u05DE\u05D5\u05E8 \u05D4\u05DB\u05DC"><i class="bi bi-save me-1"></i>\u05E9\u05DE\u05D5\u05E8 \u05D4\u05DB\u05DC</button>
          <button class="btn btn-sm btn-outline-secondary" onclick="document.getElementById('aca-grades-section').style.display='none'"><i class="bi bi-x-lg"></i></button>
        </div>
      </div>
      <div class="table-responsive"><table class="table table-sm table-bht mb-0">
        <thead><tr><th>#</th><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th style="width:120px">\u05E6\u05D9\u05D5\u05DF</th><th style="width:60px">%</th><th style="width:200px">\u05D4\u05E2\u05E8\u05D5\u05EA</th><th style="width:80px"></th></tr></thead>
        <tbody>`;

    classStudents.forEach((s, idx) => {
      const sid = Utils.rowId(s), name = Utils.fullName(s);
      const existing = gradeMap[sid] || gradeMap[name];
      const grade = existing ? (existing['\u05E6\u05D9\u05D5\u05DF']||'') : '';
      const notes = existing ? (existing['\u05D4\u05E2\u05E8\u05D5\u05EA']||'') : '';
      const pct = grade ? Math.round((parseFloat(grade)/maxScore)*100) : '';
      const pctClass = pct >= 80 ? 'text-success' : pct >= 55 ? 'text-warning' : pct ? 'text-danger' : '';
      html += `<tr>
        <td class="text-muted">${idx+1}</td>
        <td class="fw-medium">${Utils.avatarHTML(name,'sm')} ${name}</td>
        <td><input type="number" class="form-control form-control-sm" id="grade-${sid}" value="${grade}" min="0" max="${maxScore}" oninput="Pages._updateGradePct('${sid}',${maxScore})"></td>
        <td class="fw-bold ${pctClass}" id="gpct-${sid}">${pct}${pct ? '%' : ''}</td>
        <td><input class="form-control form-control-sm" id="gnote-${sid}" value="${notes}"></td>
        <td><button class="btn btn-sm btn-outline-primary" onclick="Pages.saveGrade('${examId}','${sid}','${name.replace(/'/g,'')}')" title="\u05E9\u05DE\u05D5\u05E8"><i class="bi bi-check-lg"></i></button></td>
      </tr>`;
    });

    html += '</tbody></table></div></div>';
    section.innerHTML = html;
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },

  _updateGradePct(sid, maxScore) {
    const input = document.getElementById('grade-' + sid);
    const pctEl = document.getElementById('gpct-' + sid);
    if (!input || !pctEl) return;
    const val = parseFloat(input.value) || 0;
    const pct = Math.round((val / maxScore) * 100);
    pctEl.textContent = val ? pct + '%' : '';
    pctEl.className = 'fw-bold ' + (pct >= 80 ? 'text-success' : pct >= 55 ? 'text-warning' : 'text-danger');
  },

  async saveAllGrades(examId) {
    const exams = this._acaActiveExams;
    const students = this._acaActiveStudents;
    const exam = exams.find(e => String(e['\u05DE\u05D6\u05D4\u05D4']||e.id) === String(examId));
    const examClass = exam ? (exam['\u05DB\u05D9\u05EA\u05D4']||'') : '';
    const classStudents = examClass
      ? students.filter(s => (s['\u05DB\u05D9\u05EA\u05D4']||'') === examClass && (s['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') !== '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC')
      : students.filter(s => (s['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') !== '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC');

    let saved = 0;
    for (const s of classStudents) {
      const sid = Utils.rowId(s);
      const grade = document.getElementById('grade-' + sid)?.value || '';
      if (!grade) continue;
      const name = Utils.fullName(s);
      try {
        await this.saveGrade(examId, sid, name.replace(/'/g, ''), true);
        saved++;
      } catch(e) {}
    }
    Utils.toast(`${saved} \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD \u05E0\u05E9\u05DE\u05E8\u05D5`);
    if (!this._acaUseDemo) {
      this._acaGrades = await App.getData('\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD').catch(() => []);
      this._acaApplyData();
    }
    this.renderAca();
  },

  async saveGrade(examId, studentId, studentName, silent) {
    const grade = document.getElementById('grade-' + studentId)?.value || '';
    const notes = document.getElementById('gnote-' + studentId)?.value || '';
    if (!grade) { if (!silent) Utils.toast('\u05D7\u05E1\u05E8 \u05E6\u05D9\u05D5\u05DF', 'warning'); return; }

    if (this._acaUseDemo) {
      // Update demo data
      const existing = this._acaActiveGrades.find(g =>
        String(g['\u05DE\u05D1\u05D7\u05DF_\u05DE\u05D6\u05D4\u05D4']||'') === String(examId) &&
        (String(g['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4']||'') === String(studentId) || (g['\u05E9\u05DD']||'') === studentName)
      );
      if (existing) {
        existing['\u05E6\u05D9\u05D5\u05DF'] = grade;
        existing['\u05D4\u05E2\u05E8\u05D5\u05EA'] = notes;
      } else {
        const newG = {
          '\u05DE\u05D6\u05D4\u05D4': 'g_' + studentId + '_' + examId,
          '\u05DE\u05D1\u05D7\u05DF_\u05DE\u05D6\u05D4\u05D4': examId,
          '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': studentId,
          '\u05E9\u05DD': studentName,
          '\u05E6\u05D9\u05D5\u05DF': grade,
          '\u05D4\u05E2\u05E8\u05D5\u05EA': notes
        };
        this._acaActiveGrades.push(newG);
        if (this._acaDemoGrades) this._acaDemoGrades.push(newG);
      }
      if (!silent) Utils.toast('\u05E6\u05D9\u05D5\u05DF \u05E0\u05E9\u05DE\u05E8');
      this.renderAca();
      return;
    }

    const existing = this._acaGrades.find(g =>
      String(g['\u05DE\u05D1\u05D7\u05DF_\u05DE\u05D6\u05D4\u05D4']||'') === String(examId) &&
      (String(g['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4']||'') === String(studentId) || (g['\u05E9\u05DD']||'') === studentName)
    );
    try {
      if (existing) {
        await App.apiCall('update', '\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD', { id: existing.id || existing['\u05DE\u05D6\u05D4\u05D4'], row: { '\u05E6\u05D9\u05D5\u05DF': grade, '\u05D4\u05E2\u05E8\u05D5\u05EA': notes } });
      } else {
        await App.apiCall('add', '\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD', { row: { '\u05DE\u05D1\u05D7\u05DF_\u05DE\u05D6\u05D4\u05D4': examId, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': studentId, '\u05E9\u05DD': studentName, '\u05E6\u05D9\u05D5\u05DF': grade, '\u05D4\u05E2\u05E8\u05D5\u05EA': notes } });
      }
      if (!silent) Utils.toast('\u05E6\u05D9\u05D5\u05DF \u05E0\u05E9\u05DE\u05E8');
      this._acaGrades = await App.getData('\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD');
      this._acaApplyData();
      this.renderAca();
    } catch(e) { if (!silent) Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4', 'danger'); }
  },

  /* --- Grade Distribution (Histogram) --- */
  showDistribution(examId) {
    const section = document.getElementById('aca-distribution');
    if (!section) return;
    document.getElementById('aca-grades-section').style.display = 'none';
    document.getElementById('aca-student-profile').style.display = 'none';
    document.getElementById('aca-report-card').style.display = 'none';
    section.style.display = '';

    const grades = this._acaActiveGrades.filter(g => String(g['\u05DE\u05D1\u05D7\u05DF_\u05DE\u05D6\u05D4\u05D4']||'') === String(examId));
    const exam = this._acaActiveExams.find(e => String(e['\u05DE\u05D6\u05D4\u05D4']||e.id) === String(examId));
    const examLabel = exam ? (exam['\u05E9\u05DD']||exam['\u05DE\u05E7\u05E6\u05D5\u05E2']||'') : '';

    // Build histogram buckets: 0-10, 10-20, ..., 90-100
    const buckets = Array(10).fill(0);
    const bucketLabels = ['0-9','10-19','20-29','30-39','40-49','50-59','60-69','70-79','80-89','90-100'];
    grades.forEach(g => {
      const score = parseFloat(g['\u05E6\u05D9\u05D5\u05DF'])||0;
      const idx = Math.min(Math.floor(score / 10), 9);
      buckets[idx]++;
    });

    section.innerHTML = `<div class="card p-3">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h6 class="fw-bold mb-0"><i class="bi bi-bar-chart me-2"></i>\u05D4\u05EA\u05E4\u05DC\u05D2\u05D5\u05EA \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD: ${examLabel}</h6>
        <button class="btn btn-sm btn-outline-secondary" onclick="document.getElementById('aca-distribution').style.display='none'"><i class="bi bi-x-lg"></i></button>
      </div>
      <div style="max-width:600px;margin:0 auto"><canvas id="aca-dist-chart"></canvas></div>
    </div>`;

    section.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Destroy old chart
    if (App.charts.acaDist) { try { App.charts.acaDist.destroy(); } catch(e) {} }

    const ctx = document.getElementById('aca-dist-chart');
    if (ctx && typeof Chart !== 'undefined') {
      App.charts.acaDist = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: bucketLabels,
          datasets: [{
            label: '\u05DE\u05E1\u05E4\u05E8 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD',
            data: buckets,
            backgroundColor: buckets.map((_, i) => i < 5 ? 'rgba(220,53,69,0.7)' : i < 7 ? 'rgba(255,193,7,0.7)' : 'rgba(25,135,84,0.7)'),
            borderColor: buckets.map((_, i) => i < 5 ? '#dc3545' : i < 7 ? '#ffc107' : '#198754'),
            borderWidth: 1,
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: true, text: '\u05D4\u05EA\u05E4\u05DC\u05D2\u05D5\u05EA \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD', font: { size: 16, family: 'Heebo' } }
          },
          scales: {
            y: { beginAtZero: true, ticks: { stepSize: 1 }, title: { display: true, text: '\u05DE\u05E1\u05E4\u05E8 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD' } },
            x: { title: { display: true, text: '\u05D8\u05D5\u05D5\u05D7 \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD' } }
          }
        }
      });
    }
  },

  /* --- Student Academic Profile --- */
  showStudentSelect() {
    const students = this._acaActiveStudents;
    const list = document.getElementById('aca-student-list');
    if (!list) return;
    this._acaStudentListAll = students;
    list.innerHTML = students.map(s => {
      const name = Utils.fullName(s);
      const sid = Utils.rowId(s);
      return `<div class="d-flex align-items-center gap-2 p-2 rounded hover-bg" style="cursor:pointer" onclick="Pages.showStudentProfile('${sid}');bootstrap.Modal.getInstance(document.getElementById('aca-student-modal')).hide();">
        ${Utils.avatarHTML(name,'sm')} <span>${name}</span> <small class="text-muted ms-auto">${s['\u05DB\u05D9\u05EA\u05D4']||''}</small>
      </div>`;
    }).join('');
    document.getElementById('aca-student-search').value = '';
    new bootstrap.Modal(document.getElementById('aca-student-modal')).show();
  },

  filterStudentList() {
    const q = (document.getElementById('aca-student-search')?.value || '').trim().toLowerCase();
    const list = document.getElementById('aca-student-list');
    if (!list) return;
    const students = this._acaStudentListAll || [];
    const filtered = q ? students.filter(s => Utils.fullName(s).toLowerCase().includes(q)) : students;
    list.innerHTML = filtered.map(s => {
      const name = Utils.fullName(s);
      const sid = Utils.rowId(s);
      return `<div class="d-flex align-items-center gap-2 p-2 rounded hover-bg" style="cursor:pointer" onclick="Pages.showStudentProfile('${sid}');bootstrap.Modal.getInstance(document.getElementById('aca-student-modal')).hide();">
        ${Utils.avatarHTML(name,'sm')} <span>${name}</span> <small class="text-muted ms-auto">${s['\u05DB\u05D9\u05EA\u05D4']||''}</small>
      </div>`;
    }).join('');
  },

  showStudentProfile(studentId) {
    const section = document.getElementById('aca-student-profile');
    if (!section) return;
    document.getElementById('aca-grades-section').style.display = 'none';
    document.getElementById('aca-distribution').style.display = 'none';
    document.getElementById('aca-report-card').style.display = 'none';
    section.style.display = '';

    const grades = this._acaActiveGrades;
    const exams = this._acaActiveExams;
    const students = this._acaActiveStudents;
    const student = students.find(s => String(Utils.rowId(s)) === String(studentId));
    const studentName = student ? Utils.fullName(student) : studentId;

    // Get student's grades
    const studentGrades = grades.filter(g =>
      String(g['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4']||'') === String(studentId) ||
      (g['\u05E9\u05DD']||'') === studentName
    );

    // Match with exams
    const gradeData = studentGrades.map(g => {
      const exam = exams.find(e => String(e['\u05DE\u05D6\u05D4\u05D4']||e.id) === String(g['\u05DE\u05D1\u05D7\u05DF_\u05DE\u05D6\u05D4\u05D4']||''));
      return {
        exam: exam,
        score: parseFloat(g['\u05E6\u05D9\u05D5\u05DF'])||0,
        subject: exam ? (exam['\u05DE\u05E7\u05E6\u05D5\u05E2']||'') : '',
        date: exam ? (exam['\u05EA\u05D0\u05E8\u05D9\u05DA']||'') : '',
        label: exam ? (exam['\u05E9\u05DD']||exam['\u05DE\u05E7\u05E6\u05D5\u05E2']||'') : '',
        notes: g['\u05D4\u05E2\u05E8\u05D5\u05EA']||''
      };
    }).sort((a,b) => (a.date||'').localeCompare(b.date||''));

    const avg = gradeData.length ? (gradeData.reduce((a,b) => a + b.score, 0) / gradeData.length).toFixed(1) : '--';
    const highest = gradeData.length ? Math.max(...gradeData.map(g => g.score)) : '--';
    const lowest = gradeData.length ? Math.min(...gradeData.map(g => g.score)) : '--';

    section.innerHTML = `<div class="card p-3">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="d-flex align-items-center gap-3">
          ${Utils.avatarHTML(studentName,'lg')}
          <div>
            <h5 class="fw-bold mb-0">${studentName}</h5>
            <small class="text-muted">\u05DB\u05D9\u05EA\u05D4: ${student?.['\u05DB\u05D9\u05EA\u05D4']||'--'} | \u05DE\u05DE\u05D5\u05E6\u05E2: <span class="fw-bold">${avg}</span> | \u05D2\u05D1\u05D5\u05D4: ${highest} | \u05E0\u05DE\u05D5\u05DA: ${lowest}</small>
          </div>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-outline-success" onclick="Pages.generateReportCard('${studentId}')"><i class="bi bi-printer me-1"></i>\u05EA\u05E2\u05D5\u05D3\u05D4</button>
          <button class="btn btn-sm btn-outline-secondary" onclick="document.getElementById('aca-student-profile').style.display='none'"><i class="bi bi-x-lg"></i></button>
        </div>
      </div>
      <div style="max-width:700px;margin:0 auto" class="mb-3"><canvas id="aca-student-chart"></canvas></div>
      <div class="table-responsive"><table class="table table-sm table-bht mb-0">
        <thead><tr><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05DE\u05D1\u05D7\u05DF</th><th>\u05DE\u05E7\u05E6\u05D5\u05E2</th><th>\u05E6\u05D9\u05D5\u05DF</th><th>\u05D4\u05E2\u05E8\u05D5\u05EA</th></tr></thead>
        <tbody>${gradeData.map(g => {
          const cls = g.score >= 80 ? 'text-success' : g.score >= 55 ? 'text-warning' : 'text-danger';
          return `<tr><td>${Utils.formatDateShort(g.date)}</td><td>${g.label}</td><td><span class="badge bg-info">${g.subject}</span></td><td class="fw-bold ${cls}">${g.score}</td><td class="small">${g.notes}</td></tr>`;
        }).join('')}</tbody>
      </table></div>
    </div>`;

    section.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Bar chart
    if (App.charts.acaStudent) { try { App.charts.acaStudent.destroy(); } catch(e) {} }
    const ctx = document.getElementById('aca-student-chart');
    if (ctx && typeof Chart !== 'undefined' && gradeData.length) {
      App.charts.acaStudent = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: gradeData.map(g => g.label),
          datasets: [{
            label: '\u05E6\u05D9\u05D5\u05DF',
            data: gradeData.map(g => g.score),
            backgroundColor: gradeData.map(g => g.score >= 80 ? 'rgba(25,135,84,0.7)' : g.score >= 55 ? 'rgba(255,193,7,0.7)' : 'rgba(220,53,69,0.7)'),
            borderColor: gradeData.map(g => g.score >= 80 ? '#198754' : g.score >= 55 ? '#ffc107' : '#dc3545'),
            borderWidth: 1,
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: true, text: '\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD \u05DC\u05E4\u05D9 \u05DE\u05D1\u05D7\u05DF', font: { size: 14, family: 'Heebo' } }
          },
          scales: {
            y: { beginAtZero: true, max: 105, title: { display: true, text: '\u05E6\u05D9\u05D5\u05DF' } }
          }
        }
      });
    }
  },

  /* --- Report Card --- */
  showReportSelect() {
    // Reuse the student select modal for report cards
    const students = this._acaActiveStudents;
    const list = document.getElementById('aca-student-list');
    if (!list) return;
    this._acaStudentListAll = students;
    list.innerHTML = students.map(s => {
      const name = Utils.fullName(s);
      const sid = Utils.rowId(s);
      return `<div class="d-flex align-items-center gap-2 p-2 rounded hover-bg" style="cursor:pointer" onclick="Pages.generateReportCard('${sid}');bootstrap.Modal.getInstance(document.getElementById('aca-student-modal')).hide();">
        ${Utils.avatarHTML(name,'sm')} <span>${name}</span> <small class="text-muted ms-auto">${s['\u05DB\u05D9\u05EA\u05D4']||''}</small>
      </div>`;
    }).join('');
    document.getElementById('aca-student-search').value = '';
    new bootstrap.Modal(document.getElementById('aca-student-modal')).show();
  },

  generateReportCard(studentId) {
    const section = document.getElementById('aca-report-card');
    if (!section) return;
    document.getElementById('aca-grades-section').style.display = 'none';
    document.getElementById('aca-distribution').style.display = 'none';
    document.getElementById('aca-student-profile').style.display = 'none';
    section.style.display = '';

    const grades = this._acaActiveGrades;
    const exams = this._acaActiveExams;
    const students = this._acaActiveStudents;
    const student = students.find(s => String(Utils.rowId(s)) === String(studentId));
    const studentName = student ? Utils.fullName(student) : '';
    const studentClass = student?.['\u05DB\u05D9\u05EA\u05D4'] || '';

    const studentGrades = grades.filter(g =>
      String(g['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4']||'') === String(studentId) ||
      (g['\u05E9\u05DD']||'') === studentName
    );

    // Group by subject
    const bySubject = {};
    studentGrades.forEach(g => {
      const exam = exams.find(e => String(e['\u05DE\u05D6\u05D4\u05D4']||e.id) === String(g['\u05DE\u05D1\u05D7\u05DF_\u05DE\u05D6\u05D4\u05D4']||''));
      const subj = exam ? (exam['\u05DE\u05E7\u05E6\u05D5\u05E2']||'') : '\u05DB\u05DC\u05DC\u05D9';
      if (!bySubject[subj]) bySubject[subj] = [];
      bySubject[subj].push({
        score: parseFloat(g['\u05E6\u05D9\u05D5\u05DF'])||0,
        exam: exam ? (exam['\u05E9\u05DD']||exam['\u05DE\u05E7\u05E6\u05D5\u05E2']||'') : '',
        date: exam ? (exam['\u05EA\u05D0\u05E8\u05D9\u05DA']||'') : ''
      });
    });

    const allScores = studentGrades.map(g => parseFloat(g['\u05E6\u05D9\u05D5\u05DF'])||0).filter(s => s > 0);
    const totalAvg = allScores.length ? (allScores.reduce((a,b) => a+b, 0) / allScores.length).toFixed(1) : '--';

    const today = new Date();
    const dateStr = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;

    section.innerHTML = `<div class="card p-4" id="report-card-print">
      <div class="d-flex justify-content-between align-items-start mb-3 d-print-none">
        <h6 class="fw-bold"><i class="bi bi-printer me-2"></i>\u05EA\u05E2\u05D5\u05D3\u05D4</h6>
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-primary" onclick="Pages.printReportCard()"><i class="bi bi-printer me-1"></i>\u05D4\u05D3\u05E4\u05E1</button>
          <button class="btn btn-sm btn-outline-secondary" onclick="document.getElementById('aca-report-card').style.display='none'"><i class="bi bi-x-lg"></i></button>
        </div>
      </div>
      <div style="border:2px solid #1a73e8;border-radius:12px;padding:24px;max-width:700px;margin:0 auto">
        <div class="text-center mb-4">
          <h3 class="fw-bold" style="color:#1a73e8">\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3</h3>
          <h4 class="fw-bold">\u05EA\u05E2\u05D5\u05D3\u05EA \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD</h4>
          <hr style="border-color:#1a73e8">
        </div>
        <div class="row mb-4">
          <div class="col-6"><strong>\u05E9\u05DD \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3:</strong> ${studentName}</div>
          <div class="col-3"><strong>\u05DB\u05D9\u05EA\u05D4:</strong> ${studentClass}</div>
          <div class="col-3"><strong>\u05EA\u05D0\u05E8\u05D9\u05DA:</strong> ${dateStr}</div>
        </div>
        <table class="table table-bordered mb-4">
          <thead class="table-primary"><tr><th>\u05DE\u05E7\u05E6\u05D5\u05E2</th><th>\u05DE\u05D1\u05D7\u05E0\u05D9\u05DD</th><th>\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD</th><th>\u05DE\u05DE\u05D5\u05E6\u05E2</th></tr></thead>
          <tbody>${Object.keys(bySubject).map(subj => {
            const items = bySubject[subj];
            const subjAvg = (items.reduce((a,b) => a + b.score, 0) / items.length).toFixed(1);
            const avgClass = parseFloat(subjAvg) >= 80 ? 'text-success' : parseFloat(subjAvg) >= 55 ? 'text-warning' : 'text-danger';
            return `<tr>
              <td class="fw-bold">${subj}</td>
              <td><small>${items.map(i => i.exam).join(', ')}</small></td>
              <td><small>${items.map(i => i.score).join(', ')}</small></td>
              <td class="fw-bold ${avgClass} fs-5">${subjAvg}</td>
            </tr>`;
          }).join('')}</tbody>
        </table>
        <div class="text-center p-3 rounded" style="background:#f0f4ff">
          <h5 class="mb-0">\u05DE\u05DE\u05D5\u05E6\u05E2 \u05DB\u05DC\u05DC\u05D9: <span class="fw-bold fs-3" style="color:#1a73e8">${totalAvg}</span></h5>
        </div>
        <div class="row mt-4 text-center">
          <div class="col-6"><div class="border-top pt-2 mt-4">\u05D7\u05EA\u05D9\u05DE\u05EA \u05DE\u05D7\u05E0\u05DA</div></div>
          <div class="col-6"><div class="border-top pt-2 mt-4">\u05D7\u05EA\u05D9\u05DE\u05EA \u05DE\u05E0\u05D4\u05DC</div></div>
        </div>
      </div>
    </div>`;

    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },

  printReportCard() {
    const content = document.getElementById('report-card-print');
    if (!content) return;
    const printWin = window.open('', '_blank');
    printWin.document.write(`<!DOCTYPE html><html dir="rtl" lang="he"><head>
      <meta charset="UTF-8"><title>\u05EA\u05E2\u05D5\u05D3\u05D4</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;700&display=swap" rel="stylesheet">
      <style>body{font-family:'Heebo',sans-serif;padding:20px}.d-print-none{display:none!important}</style>
    </head><body>${content.innerHTML}</body></html>`);
    printWin.document.close();
    setTimeout(() => { printWin.print(); }, 500);
  },


  /* ======================================================================
     RANKINGS — Comprehensive Student Achievement System
     ====================================================================== */

  /* --- Demo data: 20 students with composite scores --- */
  _rankDemoStudents: [
    {id:'r1',  name:'\u05D9\u05D5\u05E1\u05E3 \u05DB\u05D4\u05DF',       cls:'\u05D0', att:96, gradeAvg:92, behPts:18, prevRank:2},
    {id:'r2',  name:'\u05DE\u05E9\u05D4 \u05DC\u05D5\u05D9',        cls:'\u05D0', att:88, gradeAvg:78, behPts:12, prevRank:4},
    {id:'r3',  name:'\u05D0\u05D1\u05E8\u05D4\u05DD \u05D9\u05E6\u05D7\u05E7\u05D9',  cls:'\u05D0', att:94, gradeAvg:87, behPts:15, prevRank:1},
    {id:'r4',  name:'\u05D9\u05E2\u05E7\u05D1 \u05E4\u05E8\u05D9\u05D3\u05DE\u05DF',   cls:'\u05D0', att:72, gradeAvg:55, behPts:4,  prevRank:12},
    {id:'r5',  name:'\u05D3\u05D5\u05D3 \u05E9\u05E4\u05D9\u05E8\u05D0',      cls:'\u05D1', att:91, gradeAvg:85, behPts:14, prevRank:5},
    {id:'r6',  name:'\u05E9\u05DE\u05D5\u05D0\u05DC \u05D0\u05D6\u05D5\u05DC\u05D0\u05D9',   cls:'\u05D1', att:82, gradeAvg:71, behPts:8,  prevRank:9},
    {id:'r7',  name:'\u05D0\u05DC\u05D9\u05D4\u05D5 \u05D1\u05DF \u05D3\u05D5\u05D3',   cls:'\u05D1', att:98, gradeAvg:95, behPts:20, prevRank:3},
    {id:'r8',  name:'\u05E0\u05EA\u05E0\u05D0\u05DC \u05D2\u05D5\u05DC\u05D3\u05D1\u05E8\u05D2',  cls:'\u05D1', att:68, gradeAvg:58, behPts:3,  prevRank:15},
    {id:'r9',  name:'\u05D7\u05D9\u05D9\u05DD \u05E8\u05D1\u05D9\u05E0\u05D5\u05D1\u05D9\u05E5', cls:'\u05D0', att:90, gradeAvg:76, behPts:11, prevRank:6},
    {id:'r10', name:'\u05D0\u05E8\u05D9\u05D4 \u05DC\u05D5\u05D9\u05E0\u05E9\u05D8\u05D9\u05D9\u05DF', cls:'\u05D0', att:99, gradeAvg:98, behPts:19, prevRank:1},
    {id:'r11', name:'\u05E8\u05E4\u05D0\u05DC \u05D0\u05D1\u05E8\u05DE\u05D5\u05D1\u05D9\u05E5', cls:'\u05D1', att:85, gradeAvg:80, behPts:13, prevRank:7},
    {id:'r12', name:'\u05D1\u05E0\u05D9\u05DE\u05D9\u05DF \u05E9\u05D8\u05E8\u05E0\u05D1\u05E8\u05D2', cls:'\u05D1', att:70, gradeAvg:48, behPts:2,  prevRank:18},
    {id:'r13', name:'\u05D9\u05E9\u05E8\u05D0\u05DC \u05D0\u05D3\u05DC\u05E8',    cls:'\u05D0', att:93, gradeAvg:84, behPts:16, prevRank:8},
    {id:'r14', name:'\u05DE\u05E0\u05D7\u05DD \u05D4\u05D5\u05E8\u05D5\u05D1\u05D9\u05E5',  cls:'\u05D1', att:87, gradeAvg:73, behPts:10, prevRank:10},
    {id:'r15', name:'\u05E2\u05DE\u05D9\u05EA\u05D9 \u05E4\u05E8\u05DC',     cls:'\u05D0', att:78, gradeAvg:62, behPts:6,  prevRank:14},
    {id:'r16', name:'\u05D0\u05D9\u05EA\u05DF \u05D3\u05D4\u05DF',       cls:'\u05D1', att:95, gradeAvg:90, behPts:17, prevRank:4},
    {id:'r17', name:'\u05E0\u05D7\u05DE\u05DF \u05D1\u05D5\u05D8\u05E8\u05D0\u05E9\u05D5\u05D9\u05DC\u05D9', cls:'\u05D0', att:80, gradeAvg:68, behPts:7, prevRank:11},
    {id:'r18', name:'\u05D3\u05E0\u05D9\u05D0\u05DC \u05D5\u05D9\u05E0\u05E8',    cls:'\u05D1', att:75, gradeAvg:60, behPts:5,  prevRank:16},
    {id:'r19', name:'\u05D0\u05D4\u05E8\u05DF \u05DE\u05D6\u05E8\u05D7\u05D9',   cls:'\u05D0', att:92, gradeAvg:88, behPts:15, prevRank:6},
    {id:'r20', name:'\u05E9\u05DC\u05DE\u05D4 \u05D1\u05E8\u05D2\u05E8',    cls:'\u05D1', att:65, gradeAvg:45, behPts:1,  prevRank:20}
  ],

  _rankUseDemo: true,
  _rankActiveTab: 'overall',
  _rankChart: null,

  _rankCalcComposite(s) {
    // Weighted composite: attendance 30%, grades 40%, behavior 30%
    return Math.round(s.att * 0.3 + s.gradeAvg * 0.4 + (s.behPts / 20 * 100) * 0.3);
  },

  _rankGetSorted(tab) {
    const students = this._rankUseDemo ? [...this._rankDemoStudents] : [...(this._rankLiveStudents || [])];
    students.forEach(s => { s.composite = this._rankCalcComposite(s); });
    switch(tab) {
      case 'attendance': students.sort((a,b) => b.att - a.att); break;
      case 'academics':  students.sort((a,b) => b.gradeAvg - a.gradeAvg); break;
      case 'behavior':   students.sort((a,b) => b.behPts - a.behPts); break;
      default:           students.sort((a,b) => b.composite - a.composite); break;
    }
    return students;
  },

  rankings() {
    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div><h1><i class="bi bi-trophy-fill me-2"></i>\u05D3\u05D9\u05E8\u05D5\u05D2\u05D9\u05DD \u05D5\u05D4\u05D9\u05E9\u05D2\u05D9\u05DD</h1></div>
      <button class="btn btn-outline-secondary btn-sm" onclick="Pages._rankUseDemo=!Pages._rankUseDemo;Pages.rankingsInit()">
        <i class="bi bi-database me-1"></i><span id="rank-demo-btn">\u05D8\u05E2\u05DF \u05D3\u05DE\u05D5</span>
      </button>
    </div>

    <!-- Monthly MVP -->
    <div id="rank-mvp" class="mb-3"></div>

    <!-- Category Tabs -->
    <ul class="nav nav-pills mb-3 gap-1 flex-wrap" id="rank-tabs">
      <li class="nav-item"><a class="nav-link active" href="#" data-tab="overall" onclick="Pages.switchRankTab('overall',this);return false"><i class="bi bi-bar-chart-fill me-1"></i>\u05DB\u05DC\u05DC\u05D9</a></li>
      <li class="nav-item"><a class="nav-link" href="#" data-tab="attendance" onclick="Pages.switchRankTab('attendance',this);return false"><i class="bi bi-calendar-check me-1"></i>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</a></li>
      <li class="nav-item"><a class="nav-link" href="#" data-tab="academics" onclick="Pages.switchRankTab('academics',this);return false"><i class="bi bi-journal-text me-1"></i>\u05DC\u05D9\u05DE\u05D5\u05D3\u05D9\u05DD</a></li>
      <li class="nav-item"><a class="nav-link" href="#" data-tab="behavior" onclick="Pages.switchRankTab('behavior',this);return false"><i class="bi bi-emoji-smile me-1"></i>\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</a></li>
    </ul>

    <!-- Podium -->
    <div class="row g-3 mb-4 justify-content-center align-items-end" id="rank-podium"></div>

    <!-- Full Leaderboard -->
    <div id="rank-table" class="mb-4">${Utils.skeleton(3)}</div>

    <!-- Class Comparison Radar Chart -->
    <div class="card mb-4" id="rank-radar-card">
      <div class="card-body">
        <h6 class="fw-bold mb-3"><i class="bi bi-diagram-3 me-2"></i>\u05D4\u05E9\u05D5\u05D5\u05D0\u05EA \u05DB\u05D9\u05EA\u05D5\u05EA</h6>
        <div style="max-width:450px;margin:auto"><canvas id="rank-radar-chart"></canvas></div>
      </div>
    </div>

    <!-- Student Detail Modal -->
    <div class="modal fade" id="rank-detail-modal" tabindex="-1"><div class="modal-dialog modal-dialog-centered"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title" id="rank-detail-title">\u05E4\u05E8\u05D5\u05E4\u05D9\u05DC \u05EA\u05DC\u05DE\u05D9\u05D3</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body" id="rank-detail-body"></div>
    </div></div></div>`;
  },

  async rankingsInit() {
    // Update demo toggle text
    const btn = document.getElementById('rank-demo-btn');
    if (btn) btn.textContent = this._rankUseDemo ? '\u05D8\u05E2\u05DF \u05D3\u05DE\u05D5' : '\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05D7\u05D9\u05D9\u05DD';

    // Load live data if not demo
    if (!this._rankUseDemo) {
      await this._rankLoadLiveData();
    }

    this._rankActiveTab = 'overall';
    // Reset tabs UI
    document.querySelectorAll('#rank-tabs .nav-link').forEach(el => {
      el.classList.toggle('active', el.dataset.tab === 'overall');
    });
    this.renderRankings();
  },

  async _rankLoadLiveData() {
    try {
      const [students, beh, att, grades] = await Promise.all([
        App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD'),
        App.getData('\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA'),
        App.getData('\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA'),
        App.getData('\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD')
      ]);
      // Build per-student metrics
      const map = {};
      students.forEach(s => {
        const id = s['\u05DE\u05D6\u05D4\u05D4'] || Utils.rowId(s);
        const name = Utils.fullName(s);
        if (!name) return;
        map[name] = {id, name, cls: s['\u05DB\u05D9\u05EA\u05D4'] || '-', att: 0, _attTotal: 0, _attPresent: 0, gradeAvg: 0, _gradeSum: 0, _gradeCount: 0, behPts: 0, prevRank: 0};
      });
      att.forEach(a => {
        const n = a['\u05E9\u05DD'] || a['\u05EA\u05DC\u05DE\u05D9\u05D3'] || ''; if (!n || !map[n]) return;
        map[n]._attTotal++; if (a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E0\u05D5\u05DB\u05D7') map[n]._attPresent++;
      });
      grades.forEach(g => {
        const n = g['\u05E9\u05DD'] || ''; const sc = parseFloat(g['\u05E6\u05D9\u05D5\u05DF']); if (!n || !map[n] || isNaN(sc)) return;
        map[n]._gradeSum += sc; map[n]._gradeCount++;
      });
      beh.forEach(r => {
        const n = r['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3'] || r['\u05E9\u05DD'] || r['\u05EA\u05DC\u05DE\u05D9\u05D3'] || ''; if (!n || !map[n]) return;
        if (r['\u05E1\u05D5\u05D2'] === '\u05D7\u05D9\u05D5\u05D1\u05D9') map[n].behPts++; else if (r['\u05E1\u05D5\u05D2'] === '\u05E9\u05DC\u05D9\u05DC\u05D9') map[n].behPts--;
      });
      Object.values(map).forEach(s => {
        s.att = s._attTotal ? Math.round(s._attPresent / s._attTotal * 100) : 0;
        s.gradeAvg = s._gradeCount ? Math.round(s._gradeSum / s._gradeCount) : 0;
        s.behPts = Math.max(0, Math.min(20, s.behPts));
        s.prevRank = 0; // no previous data
      });
      this._rankLiveStudents = Object.values(map).filter(s => s.att > 0 || s.gradeAvg > 0 || s.behPts > 0);
    } catch(e) {
      this._rankLiveStudents = [];
    }
  },

  switchRankTab(tab, el) {
    this._rankActiveTab = tab;
    document.querySelectorAll('#rank-tabs .nav-link').forEach(a => a.classList.remove('active'));
    if (el) el.classList.add('active');
    this.renderRankings();
  },

  renderRankings() {
    const tab = this._rankActiveTab;
    const sorted = this._rankGetSorted(tab);

    if (!sorted.length) {
      document.getElementById('rank-podium').innerHTML = '';
      document.getElementById('rank-table').innerHTML = '<div class="empty-state"><i class="bi bi-trophy"></i><h5>\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD</h5></div>';
      document.getElementById('rank-mvp').innerHTML = '';
      return;
    }

    // Monthly MVP
    const mvp = sorted[0];
    document.getElementById('rank-mvp').innerHTML = `
      <div class="card border-warning position-relative overflow-hidden" style="border-width:2px;background:linear-gradient(135deg,#fffbeb 0%,#fef3c7 50%,#fffbeb 100%)">
        <div class="card-body text-center py-4">
          <div class="position-absolute top-0 start-0 w-100 h-100" style="background:radial-gradient(circle at 50% 0%,rgba(251,191,36,0.15) 0%,transparent 70%);pointer-events:none"></div>
          <div class="d-flex align-items-center justify-content-center gap-3 position-relative">
            <div class="rank-mvp-star"><i class="bi bi-star-fill text-warning fs-1"></i></div>
            <div>
              <small class="text-muted d-block fw-semibold">\u2B50 \u05EA\u05DC\u05DE\u05D9\u05D3 \u05D4\u05D7\u05D5\u05D3\u05E9 \u2B50</small>
              <div class="d-flex align-items-center justify-content-center gap-2 mt-1">
                ${Utils.avatarHTML(mvp.name, 'sm')}
                <h4 class="fw-bold mb-0">${mvp.name}</h4>
              </div>
              <div class="mt-2 d-flex gap-2 justify-content-center flex-wrap">
                <span class="badge bg-warning text-dark">\u05E6\u05D9\u05D5\u05DF \u05DB\u05DC\u05DC\u05D9: ${mvp.composite}</span>
                <span class="badge bg-success">\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA: ${mvp.att}%</span>
                <span class="badge bg-primary">\u05DE\u05DE\u05D5\u05E6\u05E2: ${mvp.gradeAvg}</span>
                <span class="badge bg-info">\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA: ${mvp.behPts}</span>
              </div>
            </div>
            <div class="rank-mvp-star"><i class="bi bi-star-fill text-warning fs-1"></i></div>
          </div>
        </div>
      </div>`;

    // Podium - top 3 with animated styling
    const podiumOrder = sorted.length >= 3
      ? [{d:sorted[1],pos:'silver',medal:'\uD83E\uDD48',color:'#94a3b8',h:'120px',order:1},{d:sorted[0],pos:'gold',medal:'\uD83E\uDD47',color:'#fbbf24',h:'160px',order:2},{d:sorted[2],pos:'bronze',medal:'\uD83E\uDD49',color:'#d97706',h:'100px',order:3}]
      : sorted.length >= 1
        ? [{d:sorted[0],pos:'gold',medal:'\uD83E\uDD47',color:'#fbbf24',h:'160px',order:1}]
        : [];

    const scoreKey = tab === 'attendance' ? 'att' : tab === 'academics' ? 'gradeAvg' : tab === 'behavior' ? 'behPts' : 'composite';
    const scoreLabel = tab === 'attendance' ? '%' : tab === 'behavior' ? ' \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA' : '';

    document.getElementById('rank-podium').innerHTML = podiumOrder.map(p => {
      const rank = p.pos === 'gold' ? 1 : p.pos === 'silver' ? 2 : 3;
      const trendHTML = this._rankTrendArrow(p.d, rank);
      return `
      <div class="col-auto text-center rank-podium-entry" style="order:${p.order}">
        <div class="rank-podium-block" style="--podium-color:${p.color};--podium-h:${p.h}">
          <div class="rank-medal-icon">${p.medal}</div>
          ${Utils.avatarHTML(p.d.name)}
          <h6 class="fw-bold mt-2 mb-0">${p.d.name}</h6>
          <small class="text-muted">\u05DB\u05D9\u05EA\u05D4 ${p.d.cls}</small>
          <div class="fs-4 fw-bold mt-1" style="color:${p.color}">${p.d[scoreKey]}${scoreLabel}</div>
          ${trendHTML}
          <div class="rank-podium-base" style="height:${p.h};background:linear-gradient(180deg,${p.color}33 0%,${p.color}11 100%);border-top:3px solid ${p.color}"></div>
        </div>
      </div>`;
    }).join('');

    // Full leaderboard table
    const max = sorted[0][scoreKey] || 1;
    document.getElementById('rank-table').innerHTML = `
    <div class="card">
      <div class="table-responsive">
        <table class="table table-bht table-hover mb-0">
          <thead>
            <tr>
              <th style="width:50px">#</th>
              <th>\u05EA\u05DC\u05DE\u05D9\u05D3</th>
              <th>\u05DB\u05D9\u05EA\u05D4</th>
              <th>\u05E6\u05D9\u05D5\u05DF \u05DB\u05DC\u05DC\u05D9</th>
              <th>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA %</th>
              <th>\u05DE\u05DE\u05D5\u05E6\u05E2 \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD</th>
              <th>\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</th>
              <th>\u05DE\u05D2\u05DE\u05D4</th>
              <th style="min-width:120px">\u05D2\u05E8\u05E3</th>
            </tr>
          </thead>
          <tbody>
            ${sorted.map((d, i) => {
              const rank = i + 1;
              const w = Math.max(5, Math.round(d[scoreKey] / max * 100));
              const c = i === 0 ? '#fbbf24' : i === 1 ? '#94a3b8' : i === 2 ? '#d97706' : '#2563eb';
              const medalIcon = i === 0 ? '\uD83E\uDD47' : i === 1 ? '\uD83E\uDD48' : i === 2 ? '\uD83E\uDD49' : '';
              const trendHTML = this._rankTrendArrow(d, rank);
              return `<tr class="rank-row ${i < 3 ? 'rank-top3' : ''}" style="cursor:pointer" onclick="Pages.showRankDetail('${d.id}')">
                <td class="fw-bold">${medalIcon || rank}</td>
                <td><div class="d-flex align-items-center gap-2">${Utils.avatarHTML(d.name,'sm')}<span class="fw-medium">${d.name}</span></div></td>
                <td><span class="badge bg-secondary">${d.cls}</span></td>
                <td class="fw-bold">${d.composite}</td>
                <td>${this._rankMiniBar(d.att, 100, d.att >= 90 ? '#10b981' : d.att >= 75 ? '#f59e0b' : '#ef4444')}</td>
                <td>${this._rankMiniBar(d.gradeAvg, 100, d.gradeAvg >= 80 ? '#10b981' : d.gradeAvg >= 60 ? '#f59e0b' : '#ef4444')}</td>
                <td class="fw-bold">${d.behPts}</td>
                <td>${trendHTML}</td>
                <td><div class="progress" style="height:18px"><div class="progress-bar" style="width:${w}%;background:${c};transition:width .6s ease">${d[scoreKey]}${scoreLabel}</div></div></td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>`;

    // Radar chart - class comparison
    this._renderRankRadar(sorted);

    // Inject podium CSS animation
    if (!document.getElementById('rank-anim-style')) {
      const style = document.createElement('style');
      style.id = 'rank-anim-style';
      style.textContent = `
        .rank-podium-entry { animation: rankSlideUp .5s ease both; }
        .rank-podium-entry:nth-child(1) { animation-delay:.1s; }
        .rank-podium-entry:nth-child(2) { animation-delay:.25s; }
        .rank-podium-entry:nth-child(3) { animation-delay:.4s; }
        @keyframes rankSlideUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        .rank-podium-block { position:relative; padding:16px 24px 0; }
        .rank-podium-base { border-radius:8px 8px 0 0; margin-top:8px; width:100%; }
        .rank-medal-icon { font-size:2.5rem; line-height:1; }
        .rank-top3 td { background:rgba(251,191,36,0.04); }
        .rank-row:hover td { background:rgba(37,99,235,0.06)!important; }
        .rank-trend-up { color:#10b981; font-weight:700; }
        .rank-trend-down { color:#ef4444; font-weight:700; }
        .rank-trend-same { color:#94a3b8; }
        .rank-mvp-star { animation: rankPulse 2s ease-in-out infinite; }
        @keyframes rankPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }
        .rank-mini-bar { display:inline-flex; align-items:center; gap:4px; }
        .rank-mini-bar-track { width:50px; height:6px; background:#e5e7eb; border-radius:3px; overflow:hidden; }
        .rank-mini-bar-fill { height:100%; border-radius:3px; transition:width .4s ease; }
        .rank-breakdown-bar { height:24px; border-radius:4px; overflow:hidden; display:flex; }
        .rank-breakdown-bar > div { display:flex; align-items:center; justify-content:center; color:#fff; font-size:0.75rem; font-weight:600; transition:width .4s ease; }
      `;
      document.head.appendChild(style);
    }
  },

  _rankTrendArrow(student, currentRank) {
    if (!student.prevRank || student.prevRank === 0) return '<span class="rank-trend-same"><i class="bi bi-dash"></i></span>';
    const diff = student.prevRank - currentRank;
    if (diff > 0) return `<span class="rank-trend-up"><i class="bi bi-arrow-up-short"></i>${diff}</span>`;
    if (diff < 0) return `<span class="rank-trend-down"><i class="bi bi-arrow-down-short"></i>${Math.abs(diff)}</span>`;
    return '<span class="rank-trend-same"><i class="bi bi-dash"></i></span>';
  },

  _rankMiniBar(val, max, color) {
    const pct = Math.round(val / max * 100);
    return `<div class="rank-mini-bar"><span class="fw-semibold" style="min-width:30px">${val}</span><div class="rank-mini-bar-track"><div class="rank-mini-bar-fill" style="width:${pct}%;background:${color}"></div></div></div>`;
  },

  _renderRankRadar(sorted) {
    const canvas = document.getElementById('rank-radar-chart');
    if (!canvas) return;
    // Group by class
    const classes = {};
    sorted.forEach(s => {
      if (!classes[s.cls]) classes[s.cls] = {att:[], grade:[], beh:[], composite:[]};
      classes[s.cls].att.push(s.att);
      classes[s.cls].grade.push(s.gradeAvg);
      classes[s.cls].beh.push(s.behPts / 20 * 100);
      classes[s.cls].composite.push(s.composite);
    });
    const avg = arr => arr.length ? Math.round(arr.reduce((a,b)=>a+b,0)/arr.length) : 0;
    const labels = ['\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA','\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD','\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA','\u05E6\u05D9\u05D5\u05DF \u05DB\u05DC\u05DC\u05D9'];
    const colors = ['rgba(37,99,235,0.7)','rgba(16,185,129,0.7)','rgba(239,68,68,0.7)','rgba(245,158,11,0.7)','rgba(139,92,246,0.7)'];
    const datasets = Object.keys(classes).map((cls,i) => ({
      label: '\u05DB\u05D9\u05EA\u05D4 ' + cls,
      data: [avg(classes[cls].att), avg(classes[cls].grade), avg(classes[cls].beh), avg(classes[cls].composite)],
      backgroundColor: colors[i % colors.length].replace('0.7','0.15'),
      borderColor: colors[i % colors.length],
      borderWidth: 2,
      pointBackgroundColor: colors[i % colors.length],
      pointRadius: 4
    }));
    if (this._rankChart) { this._rankChart.destroy(); this._rankChart = null; }
    this._rankChart = new Chart(canvas, {
      type: 'radar',
      data: { labels, datasets },
      options: {
        responsive: true,
        scales: { r: { beginAtZero: true, max: 100, ticks: { stepSize: 20, font:{family:'Heebo'} }, pointLabels: { font:{family:'Heebo',size:13,weight:'600'} } } },
        plugins: { legend: { labels: { font:{family:'Heebo',size:12} } } }
      }
    });
  },

  showRankDetail(id) {
    const students = this._rankUseDemo ? this._rankDemoStudents : (this._rankLiveStudents || []);
    const s = students.find(st => st.id === id);
    if (!s) return;
    s.composite = this._rankCalcComposite(s);
    const sorted = this._rankGetSorted('overall');
    const rank = sorted.findIndex(st => st.id === id) + 1;

    // Score breakdown percentages
    const attContrib = Math.round(s.att * 0.3);
    const gradeContrib = Math.round(s.gradeAvg * 0.4);
    const behContrib = Math.round((s.behPts / 20 * 100) * 0.3);
    const total = attContrib + gradeContrib + behContrib;
    const attPct = total ? Math.round(attContrib / total * 100) : 33;
    const gradePct = total ? Math.round(gradeContrib / total * 100) : 33;
    const behPct = total ? 100 - attPct - gradePct : 34;

    const trendHTML = this._rankTrendArrow(s, rank);

    document.getElementById('rank-detail-title').textContent = s.name;
    document.getElementById('rank-detail-body').innerHTML = `
      <div class="text-center mb-3">
        ${Utils.avatarHTML(s.name)}
        <h5 class="fw-bold mt-2 mb-0">${s.name}</h5>
        <span class="badge bg-secondary mt-1">\u05DB\u05D9\u05EA\u05D4 ${s.cls}</span>
        <div class="mt-1">\u05D3\u05D9\u05E8\u05D5\u05D2 \u05E0\u05D5\u05DB\u05D7\u05D9: <strong>#${rank}</strong> ${trendHTML}</div>
      </div>

      <h6 class="fw-bold mb-2"><i class="bi bi-pie-chart me-1"></i>\u05E4\u05D9\u05E8\u05D5\u05D8 \u05E0\u05D9\u05E7\u05D5\u05D3</h6>
      <div class="rank-breakdown-bar mb-2">
        <div style="width:${attPct}%;background:#10b981" title="\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA ${attContrib}">${attContrib}</div>
        <div style="width:${gradePct}%;background:#2563eb" title="\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD ${gradeContrib}">${gradeContrib}</div>
        <div style="width:${behPct}%;background:#f59e0b" title="\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA ${behContrib}">${behContrib}</div>
      </div>
      <div class="d-flex gap-3 mb-3 flex-wrap justify-content-center" style="font-size:.85rem">
        <span><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#10b981"></span> \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA (30%)</span>
        <span><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#2563eb"></span> \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD (40%)</span>
        <span><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#f59e0b"></span> \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA (30%)</span>
      </div>

      <div class="row g-2 text-center">
        <div class="col-6 col-md-3">
          <div class="card p-2"><div class="fs-4 fw-bold text-primary">${s.composite}</div><small class="text-muted">\u05E6\u05D9\u05D5\u05DF \u05DB\u05DC\u05DC\u05D9</small></div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card p-2"><div class="fs-4 fw-bold" style="color:#10b981">${s.att}%</div><small class="text-muted">\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</small></div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card p-2"><div class="fs-4 fw-bold" style="color:#2563eb">${s.gradeAvg}</div><small class="text-muted">\u05DE\u05DE\u05D5\u05E6\u05E2 \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD</small></div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card p-2"><div class="fs-4 fw-bold" style="color:#f59e0b">${s.behPts}</div><small class="text-muted">\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</small></div>
        </div>
      </div>`;
    new bootstrap.Modal(document.getElementById('rank-detail-modal')).show();
  },


  /* ======================================================================
     MIVTZA (LEARNING CAMPAIGN)
     ====================================================================== */
  mivtza() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-award-fill me-2"></i>\u05DE\u05D1\u05E6\u05E2 \u05DC\u05D9\u05DE\u05D5\u05D3</h1></div><button class="btn btn-primary btn-sm" onclick="Pages.showAddMvz()"><i class="bi bi-plus-lg me-1"></i>\u05D3\u05D9\u05D5\u05D5\u05D7</button></div><div class="card mb-3" id="mvz-leaderboard" style="display:none"><div class="card-body"><h6 class="fw-bold"><i class="bi bi-trophy-fill text-warning me-2"></i>\u05DE\u05D5\u05D1\u05D9\u05DC\u05D9\u05DD</h6><div id="mvz-top"></div></div></div><div class="card mb-3" id="mvz-totals" style="display:none"><div class="card-body"><h6 class="fw-bold"><i class="bi bi-calculator me-2"></i>\u05E1\u05D9\u05DB\u05D5\u05DD \u05DC\u05E4\u05D9 \u05EA\u05DC\u05DE\u05D9\u05D3</h6><div class="table-responsive"><table class="table table-sm table-bht mb-0"><thead><tr><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th>\u05E9\u05D7\u05E8\u05D9\u05EA</th><th>\u05DE\u05E0\u05D7\u05D4</th><th>\u05DE\u05E2\u05E8\u05D9\u05D1</th><th>\u05DC\u05D9\u05DE\u05D5\u05D3</th><th class="fw-bold">\u05E1\u05D4"\u05DB</th></tr></thead><tbody id="mvz-totals-body"></tbody></table></div></div></div><div id="mvz-list">${Utils.skeleton(3)}</div><div class="modal fade" id="mvz-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">\u05D3\u05D9\u05D5\u05D5\u05D7 \u05DE\u05D1\u05E6\u05E2</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row g-3"><div class="col-12"><label class="form-label">\u05EA\u05DC\u05DE\u05D9\u05D3</label><select class="form-select" id="mvf-student"></select></div><div class="col-6"><label class="form-label">\u05E9\u05D7\u05E8\u05D9\u05EA</label><input type="number" class="form-control" id="mvf-shacharit" value="0"></div><div class="col-6"><label class="form-label">\u05DE\u05E0\u05D7\u05D4</label><input type="number" class="form-control" id="mvf-mincha" value="0"></div><div class="col-6"><label class="form-label">\u05DE\u05E2\u05E8\u05D9\u05D1</label><input type="number" class="form-control" id="mvf-maariv" value="0"></div><div class="col-6"><label class="form-label">\u05DC\u05D9\u05DE\u05D5\u05D3 \u05E2\u05E6\u05DE\u05D9</label><input type="number" class="form-control" id="mvf-self" value="0"></div></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveMvz()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
  },
  _mvzData: [],
  async mivtzaInit() { this._mvzData = await App.getData('\u05DE\u05D1\u05E6\u05E2_\u05DC\u05D9\u05DE\u05D5\u05D3'); this.renderMvz(); },
  renderMvz() {
    const scores = {}; const totals = {}; this._mvzData.forEach(r => { const n=r['\u05E9\u05DD']||''; if (!n) return; scores[n]=(scores[n]||0)+(parseFloat(r['\u05E1\u05D4_\u05DB'])||0); if (!totals[n]) totals[n]={sh:0,mn:0,ma:0,se:0,total:0}; totals[n].sh+=(parseFloat(r['\u05E9\u05D7\u05E8\u05D9\u05EA'])||0); totals[n].mn+=(parseFloat(r['\u05DE\u05E0\u05D7\u05D4'])||0); totals[n].ma+=(parseFloat(r['\u05DE\u05E2\u05E8\u05D9\u05D1'])||0); totals[n].se+=(parseFloat(r['\u05DC\u05D9\u05DE\u05D5\u05D3_\u05E2\u05E6\u05DE\u05D9'])||0); totals[n].total+=(parseFloat(r['\u05E1\u05D4_\u05DB'])||0); });
    const sorted = Object.keys(scores).sort((a,b)=>scores[b]-scores[a]).slice(0,5);
    if (sorted.length) { document.getElementById('mvz-leaderboard').style.display=''; document.getElementById('mvz-top').innerHTML = sorted.map((n,i) => `<div class="d-flex align-items-center gap-2 mb-1"><span class="fw-bold" style="width:25px">${['&#129351;','&#129352;','&#129353;','4','5'][i]}</span><span class="flex-grow-1">${n}</span><span class="badge bg-primary">${scores[n]}</span></div>`).join(''); }
    // Totals per student
    const totalsSorted = Object.keys(totals).sort((a,b)=>totals[b].total-totals[a].total);
    const totalsEl = document.getElementById('mvz-totals');
    const totalsBody = document.getElementById('mvz-totals-body');
    if (totalsEl && totalsBody && totalsSorted.length) {
      totalsEl.style.display = '';
      totalsBody.innerHTML = totalsSorted.map(n => { const t=totals[n]; return `<tr><td class="fw-bold">${n}</td><td>${t.sh}</td><td>${t.mn}</td><td>${t.ma}</td><td>${t.se}</td><td class="fw-bold text-primary">${t.total}</td></tr>`; }).join('');
    } else if (totalsEl) { totalsEl.style.display = 'none'; }
    if (!this._mvzData.length) { document.getElementById('mvz-list').innerHTML = '<div class="empty-state"><i class="bi bi-award"></i><h5>\u05D0\u05D9\u05DF \u05D3\u05D9\u05D5\u05D5\u05D7\u05D9\u05DD</h5></div>'; return; }
    document.getElementById('mvz-list').innerHTML = `<div class="card"><table class="table table-bht mb-0"><thead><tr><th>\u05E9\u05DD</th><th>\u05E9\u05D7\u05E8\u05D9\u05EA</th><th>\u05DE\u05E0\u05D7\u05D4</th><th>\u05DE\u05E2\u05E8\u05D9\u05D1</th><th>\u05DC\u05D9\u05DE\u05D5\u05D3</th><th class="fw-bold">\u05E1\u05D4"\u05DB</th><th></th></tr></thead><tbody>${this._mvzData.map(r => `<tr><td class="fw-bold">${r['\u05E9\u05DD']||''}</td><td>${r['\u05E9\u05D7\u05E8\u05D9\u05EA']||0}</td><td>${r['\u05DE\u05E0\u05D7\u05D4']||0}</td><td>${r['\u05DE\u05E2\u05E8\u05D9\u05D1']||0}</td><td>${r['\u05DC\u05D9\u05DE\u05D5\u05D3_\u05E2\u05E6\u05DE\u05D9']||0}</td><td class="fw-bold text-primary">${r['\u05E1\u05D4_\u05DB']||0}</td><td><button class="btn btn-sm btn-outline-danger" onclick="Pages.deleteMvz('${r.id||r['\u05DE\u05D6\u05D4\u05D4']||""}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button></td></tr>`).join('')}</tbody></table></div>`;
  },
  async showAddMvz() { const students = await App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD'); document.getElementById('mvf-student').innerHTML = '<option value="">\u05D1\u05D7\u05E8</option>' + students.map(s=>`<option value="${Utils.rowId(s)}">${Utils.fullName(s)}</option>`).join(''); new bootstrap.Modal(document.getElementById('mvz-modal')).show(); },
  async saveMvz() { const sel=document.getElementById('mvf-student'); const sh=parseInt(document.getElementById('mvf-shacharit').value)||0; const mn=parseInt(document.getElementById('mvf-mincha').value)||0; const ma=parseInt(document.getElementById('mvf-maariv').value)||0; const se=parseInt(document.getElementById('mvf-self').value)||0; const row = {'\u05E9\u05DD':sel.selectedOptions[0]?.text||'','\u05E9\u05D7\u05E8\u05D9\u05EA':sh,'\u05DE\u05E0\u05D7\u05D4':mn,'\u05DE\u05E2\u05E8\u05D9\u05D1':ma,'\u05DC\u05D9\u05DE\u05D5\u05D3_\u05E2\u05E6\u05DE\u05D9':se,'\u05E1\u05D4_\u05DB':sh+mn+ma+se}; try { await App.apiCall('add','\u05DE\u05D1\u05E6\u05E2_\u05DC\u05D9\u05DE\u05D5\u05D3',{row}); bootstrap.Modal.getInstance(document.getElementById('mvz-modal')).hide(); Utils.toast('\u05D3\u05D9\u05D5\u05D5\u05D7 \u05E0\u05E9\u05DE\u05E8'); this.mivtzaInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); } },
  async deleteCampaign(id) { return this.deleteMvz(id); },
  async deleteMvz(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4','\u05DC\u05DE\u05D7\u05D5\u05E7 \u05D3\u05D9\u05D5\u05D5\u05D7 \u05D6\u05D4?')) return;
    try { await App.apiCall('delete','\u05DE\u05D1\u05E6\u05E2_\u05DC\u05D9\u05DE\u05D5\u05D3',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.mivtzaInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },
});
