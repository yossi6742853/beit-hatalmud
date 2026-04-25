/* ===== BHT v5.3 — Gradebook (גיליון ציונים) ===== */
Object.assign(Pages, {

  /* ======================================================================
     GRADEBOOK — Spreadsheet-style grade management
     ====================================================================== */
  gradebook() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div><h1><i class="bi bi-table me-2"></i>\u05D2\u05D9\u05DC\u05D9\u05D5\u05DF \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD</h1></div>
        <div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-primary btn-sm" onclick="Pages.showAddExamCol()"><i class="bi bi-plus-lg me-1"></i>\u05D4\u05D5\u05E1\u05E3 \u05DE\u05D1\u05D7\u05DF</button>
          <button class="btn btn-outline-success btn-sm" onclick="Pages.exportGradebookCSV()"><i class="bi bi-download me-1"></i>\u05D9\u05D9\u05E6\u05D5\u05D0 CSV</button>
          <button class="btn btn-outline-secondary btn-sm" onclick="Pages.printGradebook()"><i class="bi bi-printer me-1"></i>\u05D4\u05D3\u05E4\u05E1\u05D4</button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="row g-3 mb-3">
        <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-primary" id="gb-exam-count">0</div><small>\u05DE\u05D1\u05D7\u05E0\u05D9\u05DD</small></div></div>
        <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-success" id="gb-avg">--</div><small>\u05DE\u05DE\u05D5\u05E6\u05E2 \u05DB\u05DC\u05DC\u05D9</small></div></div>
        <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-warning" id="gb-highest">--</div><small>\u05E6\u05D9\u05D5\u05DF \u05D2\u05D1\u05D5\u05D4 \u05D1\u05D9\u05D5\u05EA\u05E8</small></div></div>
        <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-info" id="gb-assessed">0</div><small>\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05DE\u05D5\u05E2\u05E8\u05DB\u05D9\u05DD</small></div></div>
      </div>

      <!-- Filters -->
      <div class="card p-3 mb-3">
        <div class="row g-2 align-items-center">
          <div class="col-md-4">
            <select class="form-select form-select-sm" id="gb-class-filter" onchange="Pages.renderGradebook()">
              <option value="">\u05DB\u05DC \u05D4\u05DB\u05D9\u05EA\u05D5\u05EA</option>
            </select>
          </div>
          <div class="col-md-4">
            <select class="form-select form-select-sm" id="gb-subject-filter" onchange="Pages.renderGradebook()">
              <option value="">\u05DB\u05DC \u05D4\u05DE\u05E7\u05E6\u05D5\u05E2\u05D5\u05EA</option>
            </select>
          </div>
          <div class="col-md-4">
            <div class="search-box"><i class="bi bi-search"></i><input type="text" class="form-control form-control-sm" id="gb-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05EA\u05DC\u05DE\u05D9\u05D3..." oninput="Pages.renderGradebook()"></div>
          </div>
        </div>
      </div>

      <!-- Spreadsheet Table -->
      <div class="card mb-3" id="gb-table-wrap">
        <div class="table-responsive" style="max-height:65vh;overflow:auto">
          <div id="gb-table">${Utils.skeletonTable(8, 6)}</div>
        </div>
      </div>

      <!-- Grade Distribution Chart -->
      <div class="row g-3 mb-3">
        <div class="col-md-12">
          <div class="card p-3">
            <h6 class="fw-bold mb-3"><i class="bi bi-bar-chart-fill me-2"></i>\u05D4\u05EA\u05E4\u05DC\u05D2\u05D5\u05EA \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD</h6>
            <canvas id="gb-dist-chart" height="200"></canvas>
          </div>
        </div>
      </div>

      <!-- Add Exam Modal -->
      <div class="modal fade" id="gb-exam-modal" tabindex="-1">
        <div class="modal-dialog"><div class="modal-content">
          <div class="modal-header"><h5 class="modal-title">\u05D4\u05D5\u05E1\u05E4\u05EA \u05DE\u05D1\u05D7\u05DF / \u05E2\u05D1\u05D5\u05D3\u05D4</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
          <div class="modal-body">
            <div class="row g-3">
              <div class="col-12"><label class="form-label">\u05E9\u05DD \u05D4\u05DE\u05D1\u05D7\u05DF</label><input class="form-control" id="gb-ef-name" placeholder="\u05DC\u05DE\u05E9\u05DC: \u05DE\u05D1\u05D7\u05DF \u05D7\u05D5\u05DE\u05E9 1"></div>
              <div class="col-6"><label class="form-label">\u05DE\u05E7\u05E6\u05D5\u05E2</label><input class="form-control" id="gb-ef-subject" placeholder="\u05D2\u05DE\u05E8\u05D0"></div>
              <div class="col-6"><label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA</label><input type="date" class="form-control" id="gb-ef-date"></div>
              <div class="col-6"><label class="form-label">\u05E6\u05D9\u05D5\u05DF \u05DE\u05E7\u05E1\u05D9\u05DE\u05DC\u05D9</label><input type="number" class="form-control" id="gb-ef-max" value="100"></div>
              <div class="col-6"><label class="form-label">\u05DE\u05E9\u05E7\u05DC (%)</label><input type="number" class="form-control" id="gb-ef-weight" value="100" min="0" max="100"></div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button>
            <button class="btn btn-primary" onclick="Pages.saveExamCol()">\u05D4\u05D5\u05E1\u05E3</button>
          </div>
        </div></div>
      </div>

      <!-- Student Detail Modal -->
      <div class="modal fade" id="gb-student-modal" tabindex="-1">
        <div class="modal-dialog modal-lg"><div class="modal-content">
          <div class="modal-header"><h5 class="modal-title" id="gb-sm-title">\u05E4\u05E8\u05D8\u05D9 \u05EA\u05DC\u05DE\u05D9\u05D3</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
          <div class="modal-body">
            <div class="row g-3 mb-3">
              <div class="col-4 text-center"><div class="fs-3 fw-bold text-primary" id="gb-sm-avg">--</div><small>\u05DE\u05DE\u05D5\u05E6\u05E2</small></div>
              <div class="col-4 text-center"><div class="fs-3 fw-bold text-success" id="gb-sm-high">--</div><small>\u05D2\u05D1\u05D5\u05D4 \u05D1\u05D9\u05D5\u05EA\u05E8</small></div>
              <div class="col-4 text-center"><div class="fs-3 fw-bold text-danger" id="gb-sm-low">--</div><small>\u05E0\u05DE\u05D5\u05DA \u05D1\u05D9\u05D5\u05EA\u05E8</small></div>
            </div>
            <canvas id="gb-student-chart" height="250"></canvas>
            <div class="mt-3" id="gb-sm-details"></div>
          </div>
        </div></div>
      </div>
    `;
  },

  /* ---- State ---- */
  _gbStudents: [],
  _gbExams: [],
  _gbGrades: {},  // { "studentId_examId": grade }
  _gbCharts: {},
  _GB_STORAGE_KEY: 'bht_gradebook_data',

  /* ---- Demo Data ---- */
  _gbDemoData() {
    const students = [

      { id: 's1', '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D9\u05D5\u05E1\u05E3', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05DB\u05D4\u05DF', '\u05DB\u05D9\u05EA\u05D4': '\u05D0' },
      { id: 's2', '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05DE\u05E9\u05D4', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05DC\u05D5\u05D9', '\u05DB\u05D9\u05EA\u05D4': '\u05D0' },
      { id: 's3', '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D0\u05D1\u05E8\u05D4\u05DD', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05D9\u05E6\u05D7\u05E7\u05D9', '\u05DB\u05D9\u05EA\u05D4': '\u05D0' }
  ];

    const exams = [
      { id: 'e1', name: '\u05DE\u05D1\u05D7\u05DF \u05D2\u05DE\u05E8\u05D0 1', subject: '\u05D2\u05DE\u05E8\u05D0', date: '2026-01-15', maxScore: 100, weight: 100 },
      { id: 'e2', name: '\u05DE\u05D1\u05D7\u05DF \u05D7\u05D5\u05DE\u05E9 1', subject: '\u05D7\u05D5\u05DE\u05E9', date: '2026-01-22', maxScore: 100, weight: 100 },
      { id: 'e3', name: '\u05E2\u05D1\u05D5\u05D3\u05D4 \u05D4\u05DC\u05DB\u05D4', subject: '\u05D4\u05DC\u05DB\u05D4', date: '2026-02-05', maxScore: 100, weight: 80 },
      { id: 'e4', name: '\u05DE\u05D1\u05D7\u05DF \u05D2\u05DE\u05E8\u05D0 2', subject: '\u05D2\u05DE\u05E8\u05D0', date: '2026-02-20', maxScore: 100, weight: 100 },
      { id: 'e5', name: '\u05DE\u05D1\u05D7\u05DF \u05D7\u05D5\u05DE\u05E9 2', subject: '\u05D7\u05D5\u05DE\u05E9', date: '2026-03-10', maxScore: 100, weight: 100 },
      { id: 'e6', name: '\u05E2\u05D1\u05D5\u05D3\u05D4 \u05DE\u05E9\u05E0\u05D4', subject: '\u05DE\u05E9\u05E0\u05D4', date: '2026-03-25', maxScore: 100, weight: 60 }
    ];

    // Realistic grades
    const gradeSeeds = {
      s1:  [92, 88, 95, 90, 85, 91],
      s2:  [78, 82, 70, 75, 80, 73],
      s3:  [95, 90, 88, 97, 92, 94]
    };

    const grades = {};
    students.forEach(s => {
      exams.forEach((ex, i) => {
        grades[s.id + '_' + ex.id] = gradeSeeds[s.id][i];
      });
    });

    return { students, exams, grades };
  },

  /* ---- Init ---- */
  async gradebookInit() {
    // Try loading from API first
    let loaded = false;
    try {
      const apiGrades = await App.getData('ציונים');
      if (apiGrades && apiGrades.length) {
        // API returns flat grade rows — build grades map
        this._gbGrades = {};
        apiGrades.forEach(row => {
          if (row.studentId && row.examId) {
            this._gbGrades[row.studentId + '_' + row.examId] = row.grade;
          }
        });
        loaded = true;
      }
    } catch(e) { /* fall through */ }

    try {
      const apiStudents = await App.getData('תלמידים');
      if (apiStudents && apiStudents.length) {
        this._gbStudents = apiStudents.map((s, i) => ({
          id: s.id || ('s' + (i + 1)),
          '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': s['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9'] || s.firstName || '',
          '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': s['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4'] || s.lastName || '',
          '\u05DB\u05D9\u05EA\u05D4': s['\u05DB\u05D9\u05EA\u05D4'] || s.class || ''
        }));
        loaded = true;
      }
    } catch(e) { /* fall through */ }

    try {
      const apiExams = await App.getData('מבחנים');
      if (apiExams && apiExams.length) {
        this._gbExams = apiExams.map((ex, i) => ({
          id: ex.id || ('e' + (i + 1)),
          name: ex.name || ex['\u05E9\u05DD'] || '',
          subject: ex.subject || ex['\u05DE\u05E7\u05E6\u05D5\u05E2'] || '',
          date: ex.date || ex['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '',
          maxScore: ex.maxScore || 100,
          weight: ex.weight || 100
        }));
        loaded = true;
      }
    } catch(e) { /* fall through */ }

    if (!loaded) {
      // Load from localStorage
      const saved = localStorage.getItem(this._GB_STORAGE_KEY);
      if (saved) {
        try {
          const data = JSON.parse(saved);
          this._gbStudents = data.students || [];
          this._gbExams = data.exams || [];
          this._gbGrades = data.grades || {};
          loaded = this._gbStudents.length > 0;
        } catch(e) { /* fall through */ }
      }
    }

    if (!loaded && !this._gbUseDemo) {
      // Show empty state
      this._gbStudents = [];
      this._gbExams = [];
      this._gbGrades = {};
      const tableEl = document.getElementById('gb-table');
      if (tableEl) tableEl.innerHTML = '<div class="empty-state text-center py-5"><i class="bi bi-table fs-1 text-muted d-block mb-2"></i><h5>\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05E2\u05D3\u05D9\u05D9\u05DF</h5><p class="text-muted">\u05D4\u05D5\u05E1\u05E3 \u05DE\u05D1\u05D7\u05DF \u05E8\u05D0\u05E9\u05D5\u05DF</p><a href="#" class="btn btn-sm btn-outline-secondary mt-2" onclick="Pages.gbLoadDemo();return false"><i class="bi bi-database me-1"></i>\u05D8\u05E2\u05DF \u05D3\u05DE\u05D5</a></div>';
      return;
    }

    if (!loaded && this._gbUseDemo) {
      this._loadDemoGradebook();
    }

    this._populateGbFilters();
    this.renderGradebook();
  },

  /* ---- Demo flag ---- */
  _gbUseDemo: false,

  gbLoadDemo() {
    this._gbUseDemo = true;
    this._loadDemoGradebook();
    this._populateGbFilters();
    this.renderGradebook();
    Utils.toast('\u05E0\u05D8\u05E2\u05E0\u05D5 \u05E0\u05EA\u05D5\u05E0\u05D9 \u05D3\u05DE\u05D5', 'info');
  },

  _loadDemoGradebook() {
    const demo = this._gbDemoData();
    this._gbStudents = demo.students;
    this._gbExams = demo.exams;
    this._gbGrades = demo.grades;
    this._saveGbData();
  },

  _saveGbData() {
    try {
      localStorage.setItem(this._GB_STORAGE_KEY, JSON.stringify({
        students: this._gbStudents,
        exams: this._gbExams,
        grades: this._gbGrades
      }));
    } catch(e) { /* gradebook save failed */ }
  },

  _populateGbFilters() {
    const classes = [...new Set(this._gbStudents.map(s => s['\u05DB\u05D9\u05EA\u05D4']).filter(Boolean))].sort();
    const subjects = [...new Set(this._gbExams.map(e => e.subject).filter(Boolean))].sort();

    const classSel = document.getElementById('gb-class-filter');
    if (classSel) {
      const cur = classSel.value;
      classSel.innerHTML = '<option value="">\u05DB\u05DC \u05D4\u05DB\u05D9\u05EA\u05D5\u05EA</option>' + classes.map(c => `<option value="${c}">${c}</option>`).join('');
      if (cur) classSel.value = cur;
    }

    const subSel = document.getElementById('gb-subject-filter');
    if (subSel) {
      const cur = subSel.value;
      subSel.innerHTML = '<option value="">\u05DB\u05DC \u05D4\u05DE\u05E7\u05E6\u05D5\u05E2\u05D5\u05EA</option>' + subjects.map(s => `<option value="${s}">${s}</option>`).join('');
      if (cur) subSel.value = cur;
    }
  },

  /* ---- Render Spreadsheet ---- */
  renderGradebook() {
    const classF = document.getElementById('gb-class-filter')?.value || '';
    const subjectF = document.getElementById('gb-subject-filter')?.value || '';
    const search = (document.getElementById('gb-search')?.value || '').trim().toLowerCase();

    // Filter students
    let students = this._gbStudents;
    if (classF) students = students.filter(s => s['\u05DB\u05D9\u05EA\u05D4'] === classF);
    if (search) students = students.filter(s => Utils.fullName(s).toLowerCase().includes(search));

    // Filter exams by subject
    let exams = this._gbExams;
    if (subjectF) exams = exams.filter(e => e.subject === subjectF);

    // Collect all grades for stats
    const allGrades = [];
    const assessedStudents = new Set();

    students.forEach(s => {
      exams.forEach(ex => {
        const g = this._gbGrades[s.id + '_' + ex.id];
        if (g !== undefined && g !== '' && g !== null) {
          allGrades.push(parseFloat(g));
          assessedStudents.add(s.id);
        }
      });
    });

    // Stats
    const avg = allGrades.length ? (allGrades.reduce((a, b) => a + b, 0) / allGrades.length).toFixed(1) : '--';
    const highest = allGrades.length ? Math.max(...allGrades) : '--';
    document.getElementById('gb-exam-count').textContent = exams.length;
    document.getElementById('gb-avg').textContent = avg;
    document.getElementById('gb-highest').textContent = highest;
    document.getElementById('gb-assessed').textContent = assessedStudents.size;

    if (!students.length || !exams.length) {
      document.getElementById('gb-table').innerHTML = '<div class="empty-state p-4"><i class="bi bi-table"></i><h5>\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05DC\u05D4\u05E6\u05D2\u05D4</h5></div>';
      return;
    }

    // Build spreadsheet table
    let html = '<table class="table table-sm table-bordered table-hover mb-0" id="gb-spread"><thead class="table-light"><tr>';
    html += '<th class="sticky-col" style="min-width:150px;position:sticky;right:0;background:#f8f9fa;z-index:2">\u05EA\u05DC\u05DE\u05D9\u05D3</th>';
    exams.forEach(ex => {
      html += `<th class="text-center" style="min-width:100px"><div class="small fw-bold">${ex.name}</div><div class="text-muted" style="font-size:0.7rem">${ex.subject} | ${Utils.formatDateShort(ex.date)}</div><div class="text-muted" style="font-size:0.65rem">\u05DE\u05E7\u05E1: ${ex.maxScore} | \u05DE\u05E9\u05E7\u05DC: ${ex.weight}%</div></th>`;
    });
    html += '<th class="text-center" style="min-width:80px;background:#e8f4fd">\u05DE\u05DE\u05D5\u05E6\u05E2</th></tr></thead><tbody>';

    students.forEach(s => {
      const sName = Utils.fullName(s);
      const sId = s.id;
      html += `<tr>`;
      html += `<td class="sticky-col fw-bold" style="position:sticky;right:0;background:#fff;z-index:1;cursor:pointer" onclick="Pages.showStudentGbDetail('${sId}')">${Utils.avatarHTML ? Utils.avatarHTML(sName, 'sm') + ' ' : ''}${sName}</td>`;

      let rowSum = 0, rowCount = 0;
      exams.forEach(ex => {
        const key = sId + '_' + ex.id;
        const val = this._gbGrades[key];
        const numVal = val !== undefined && val !== '' && val !== null ? parseFloat(val) : '';
        const bgColor = numVal !== '' ? (numVal >= 90 ? 'rgba(25,135,84,0.15)' : numVal >= 70 ? 'rgba(255,193,7,0.15)' : 'rgba(220,53,69,0.15)') : '';
        const textColor = numVal !== '' ? (numVal >= 90 ? '#198754' : numVal >= 70 ? '#856404' : '#dc3545') : '';

        if (numVal !== '') { rowSum += numVal; rowCount++; }

        html += `<td class="text-center p-0" style="background:${bgColor}"><input type="number" min="0" max="${ex.maxScore}" class="form-control form-control-sm text-center border-0 bg-transparent" style="color:${textColor};font-weight:600" value="${numVal !== '' ? numVal : ''}" data-key="${key}" data-max="${ex.maxScore}" onblur="Pages.onGbCellBlur(this)" onkeydown="Pages.onGbCellKey(event,this)"></td>`;
      });

      const rowAvg = rowCount > 0 ? (rowSum / rowCount).toFixed(1) : '--';
      const rowAvgColor = rowAvg !== '--' ? (parseFloat(rowAvg) >= 90 ? 'text-success' : parseFloat(rowAvg) >= 70 ? 'text-warning' : 'text-danger') : '';
      html += `<td class="text-center fw-bold ${rowAvgColor}" style="background:#e8f4fd">${rowAvg}</td></tr>`;
    });

    // Column averages row
    html += '<tr class="table-light"><td class="fw-bold" style="position:sticky;right:0;background:#f8f9fa;z-index:1">\u05DE\u05DE\u05D5\u05E6\u05E2 \u05E2\u05DE\u05D5\u05D3\u05D4</td>';
    let totalSum = 0, totalCount = 0;
    exams.forEach(ex => {
      let colSum = 0, colCount = 0;
      students.forEach(s => {
        const val = this._gbGrades[s.id + '_' + ex.id];
        if (val !== undefined && val !== '' && val !== null) { colSum += parseFloat(val); colCount++; }
      });
      const colAvg = colCount > 0 ? (colSum / colCount).toFixed(1) : '--';
      if (colCount > 0) { totalSum += colSum / colCount; totalCount++; }
      const colColor = colAvg !== '--' ? (parseFloat(colAvg) >= 90 ? 'text-success' : parseFloat(colAvg) >= 70 ? 'text-warning' : 'text-danger') : '';
      html += `<td class="text-center fw-bold ${colColor}">${colAvg}</td>`;
    });
    const grandAvg = totalCount > 0 ? (totalSum / totalCount).toFixed(1) : '--';
    html += `<td class="text-center fw-bold" style="background:#d0e8f7">${grandAvg}</td></tr>`;

    html += '</tbody></table>';
    document.getElementById('gb-table').innerHTML = html;

    // Render distribution chart
    this._renderGbDistChart(allGrades);
  },

  /* ---- Cell editing ---- */
  onGbCellBlur(input) {
    const key = input.dataset.key;
    const max = parseFloat(input.dataset.max) || 100;
    let val = input.value.trim();

    if (val === '') {
      delete this._gbGrades[key];
    } else {
      val = Math.min(Math.max(parseFloat(val) || 0, 0), max);
      input.value = val;
      this._gbGrades[key] = val;
    }

    this._saveGbData();
    // Sync grade to API
    if (val !== '') {
      const [studentId, examId] = key.split('_');
      try { App.apiCall('update', 'ציונים', { id: key, row: { studentId, examId, grade: val } }); } catch(e2) {}
    }
    this.renderGradebook();
  },

  onGbCellKey(e, input) {
    if (e.key === 'Enter') {
      e.preventDefault();
      input.blur();
    } else if (e.key === 'Tab') {
      // Default tab behavior works fine
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const row = input.closest('tr');
      const cellIndex = input.closest('td').cellIndex;
      const targetRow = e.key === 'ArrowDown' ? row.nextElementSibling : row.previousElementSibling;
      if (targetRow) {
        const targetCell = targetRow.cells[cellIndex];
        const targetInput = targetCell?.querySelector('input');
        if (targetInput) targetInput.focus();
      }
    }
  },

  /* ---- Add Exam Column ---- */
  showAddExamCol() {
    document.getElementById('gb-ef-date').value = Utils.todayISO();
    document.getElementById('gb-ef-name').value = '';
    document.getElementById('gb-ef-subject').value = '';
    document.getElementById('gb-ef-max').value = '100';
    document.getElementById('gb-ef-weight').value = '100';
    new bootstrap.Modal(document.getElementById('gb-exam-modal')).show();
  },

  saveExamCol() {
    const name = document.getElementById('gb-ef-name').value.trim();
    const subject = document.getElementById('gb-ef-subject').value.trim();
    const date = document.getElementById('gb-ef-date').value;
    const maxScore = parseInt(document.getElementById('gb-ef-max').value) || 100;
    const weight = parseInt(document.getElementById('gb-ef-weight').value) || 100;

    if (!name) { Utils.toast('\u05D7\u05E1\u05E8 \u05E9\u05DD \u05DE\u05D1\u05D7\u05DF', 'warning'); return; }

    const newExam = {
      id: 'e' + Date.now(),
      name,
      subject,
      date,
      maxScore,
      weight
    };
    this._gbExams.push(newExam);

    this._saveGbData();
    try { App.apiCall('add', 'מבחנים', { row: newExam }); } catch(e) {}
    this._populateGbFilters();
    this.renderGradebook();
    bootstrap.Modal.getInstance(document.getElementById('gb-exam-modal')).hide();
    Utils.toast('\u05DE\u05D1\u05D7\u05DF \u05E0\u05D5\u05E1\u05E3 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4');
  },

  /* ---- Student Detail Modal ---- */
  showStudentGbDetail(studentId) {
    const student = this._gbStudents.find(s => s.id === studentId);
    if (!student) return;
    const sName = Utils.fullName(student);

    document.getElementById('gb-sm-title').textContent = '\u05E4\u05E8\u05D8\u05D9 \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD: ' + sName;

    const grades = [];
    const labels = [];
    this._gbExams.forEach(ex => {
      const val = this._gbGrades[studentId + '_' + ex.id];
      labels.push(ex.name);
      grades.push(val !== undefined && val !== '' && val !== null ? parseFloat(val) : null);
    });

    const validGrades = grades.filter(g => g !== null);
    const avg = validGrades.length ? (validGrades.reduce((a, b) => a + b, 0) / validGrades.length).toFixed(1) : '--';
    const high = validGrades.length ? Math.max(...validGrades) : '--';
    const low = validGrades.length ? Math.min(...validGrades) : '--';

    document.getElementById('gb-sm-avg').textContent = avg;
    document.getElementById('gb-sm-high').textContent = high;
    document.getElementById('gb-sm-low').textContent = low;

    // Detail table
    let detailHtml = '<table class="table table-sm table-bordered mt-3"><thead><tr><th>\u05DE\u05D1\u05D7\u05DF</th><th>\u05DE\u05E7\u05E6\u05D5\u05E2</th><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05E6\u05D9\u05D5\u05DF</th><th>\u05DE\u05E9\u05E7\u05DC</th></tr></thead><tbody>';
    this._gbExams.forEach((ex, i) => {
      const g = grades[i];
      const color = g !== null ? (g >= 90 ? 'text-success' : g >= 70 ? 'text-warning' : 'text-danger') : '';
      detailHtml += `<tr><td>${ex.name}</td><td>${ex.subject}</td><td>${Utils.formatDateShort(ex.date)}</td><td class="fw-bold ${color}">${g !== null ? g : '-'}</td><td>${ex.weight}%</td></tr>`;
    });
    detailHtml += '</tbody></table>';
    document.getElementById('gb-sm-details').innerHTML = detailHtml;

    // Chart
    if (this._gbCharts.student) { try { this._gbCharts.student.destroy(); } catch(e){} }
    const ctx = document.getElementById('gb-student-chart');
    if (ctx && typeof Chart !== 'undefined') {
      this._gbCharts.student = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: '\u05E6\u05D9\u05D5\u05DF',
            data: grades.map(g => g !== null ? g : 0),
            backgroundColor: grades.map(g => g === null ? '#dee2e6' : g >= 90 ? 'rgba(25,135,84,0.7)' : g >= 70 ? 'rgba(255,193,7,0.7)' : 'rgba(220,53,69,0.7)'),
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, max: 100, title: { display: true, text: '\u05E6\u05D9\u05D5\u05DF' } },
            x: { ticks: { maxRotation: 45 } }
          }
        }
      });
    }

    new bootstrap.Modal(document.getElementById('gb-student-modal')).show();
  },

  /* ---- Distribution Chart ---- */
  _renderGbDistChart(allGrades) {
    if (this._gbCharts.dist) { try { this._gbCharts.dist.destroy(); } catch(e){} }
    const ctx = document.getElementById('gb-dist-chart');
    if (!ctx || typeof Chart === 'undefined') return;

    // Bucket grades: 0-9, 10-19, ..., 90-100
    const buckets = Array(10).fill(0);
    const bucketLabels = ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89', '90-100'];
    allGrades.forEach(g => {
      const idx = Math.min(Math.floor(g / 10), 9);
      buckets[idx]++;
    });

    const colors = bucketLabels.map((_, i) => i >= 9 ? 'rgba(25,135,84,0.7)' : i >= 7 ? 'rgba(255,193,7,0.7)' : 'rgba(220,53,69,0.7)');

    this._gbCharts.dist = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: bucketLabels,
        datasets: [{
          label: '\u05DE\u05E1\u05E4\u05E8 \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD',
          data: buckets,
          backgroundColor: colors,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: { display: false }
        },
        scales: {
          y: { beginAtZero: true, title: { display: true, text: '\u05DE\u05E1\u05E4\u05E8 \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD' }, ticks: { stepSize: 1 } },
          x: { title: { display: true, text: '\u05D8\u05D5\u05D5\u05D7 \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD' } }
        }
      }
    });
  },

  /* ---- Export CSV ---- */
  exportGradebookCSV() {
    const classF = document.getElementById('gb-class-filter')?.value || '';
    const subjectF = document.getElementById('gb-subject-filter')?.value || '';

    let students = this._gbStudents;
    if (classF) students = students.filter(s => s['\u05DB\u05D9\u05EA\u05D4'] === classF);

    let exams = this._gbExams;
    if (subjectF) exams = exams.filter(e => e.subject === subjectF);

    // BOM for Hebrew encoding
    let csv = '\uFEFF';
    // Header
    csv += '\u05EA\u05DC\u05DE\u05D9\u05D3,\u05DB\u05D9\u05EA\u05D4';
    exams.forEach(ex => { csv += ',' + ex.name; });
    csv += ',\u05DE\u05DE\u05D5\u05E6\u05E2\n';

    students.forEach(s => {
      const name = Utils.fullName(s);
      csv += '"' + name + '","' + (s['\u05DB\u05D9\u05EA\u05D4'] || '') + '"';
      let sum = 0, cnt = 0;
      exams.forEach(ex => {
        const val = this._gbGrades[s.id + '_' + ex.id];
        if (val !== undefined && val !== '' && val !== null) {
          csv += ',' + val;
          sum += parseFloat(val); cnt++;
        } else {
          csv += ',';
        }
      });
      csv += ',' + (cnt > 0 ? (sum / cnt).toFixed(1) : '') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '\u05D2\u05D9\u05DC\u05D9\u05D5\u05DF_\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD_' + Utils.todayISO() + '.csv';
    a.click();
    URL.revokeObjectURL(url);
    Utils.toast('\u05E7\u05D5\u05D1\u05E5 CSV \u05D9\u05D5\u05E8\u05D3');
  },

  /* ---- Print ---- */
  printGradebook() {
    const tableEl = document.getElementById('gb-spread');
    if (!tableEl) { Utils.toast('\u05D0\u05D9\u05DF \u05D8\u05D1\u05DC\u05D4 \u05DC\u05D4\u05D3\u05E4\u05E1\u05D4', 'warning'); return; }

    const printWin = window.open('', '_blank');
    printWin.document.write(`<!DOCTYPE html><html dir="rtl" lang="he"><head><meta charset="UTF-8"><title>\u05D2\u05D9\u05DC\u05D9\u05D5\u05DF \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD</title><style>
      @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;700&display=swap');
      * { font-family: 'Heebo', sans-serif; direction: rtl; }
      body { padding: 20px; }
      h2 { text-align: center; margin-bottom: 10px; }
      .print-date { text-align: center; color: #666; margin-bottom: 20px; font-size: 14px; }
      table { width: 100%; border-collapse: collapse; font-size: 12px; }
      th, td { border: 1px solid #333; padding: 6px 8px; text-align: center; }
      th { background: #e9ecef; font-weight: 700; }
      @media print { body { padding: 0; } }
    </style></head><body>
      <h2>\u05D2\u05D9\u05DC\u05D9\u05D5\u05DF \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD — \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3</h2>
      <div class="print-date">${Utils.formatDate(new Date())}</div>
      ${tableEl.outerHTML.replace(/<input[^>]*value="([^"]*)"[^>]*>/g, '$1')}
    </body></html>`);
    printWin.document.close();
    setTimeout(() => { printWin.print(); }, 500);
  }
});
