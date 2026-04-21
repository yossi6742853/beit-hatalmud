/* ===== BHT v5.3 — Students ===== */
Object.assign(Pages, {
  /* ======================================================================
     STUDENTS LIST
     ====================================================================== */
  students() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div><h1><i class="bi bi-people-fill me-2"></i>\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</h1><p id="students-count"></p></div>
        <div class="d-flex gap-2"><button class="btn btn-primary" onclick="Pages.showStudentForm()"><i class="bi bi-plus-lg me-1"></i>\u05D4\u05D5\u05E1\u05E4\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3</button><button class="btn btn-outline-primary btn-sm" onclick="Pages.showBulkAddStudents()"><i class="bi bi-people me-1"></i>\u05D4\u05D5\u05E1\u05E4\u05D4 \u05DE\u05E8\u05D5\u05D1\u05D4</button><button class="btn btn-outline-success btn-sm" onclick="Pages.exportStudentsCSV()"><i class="bi bi-download me-1"></i>CSV</button></div>
      </div>
      <div class="card p-3 mb-3"><div class="row g-2 align-items-center">
        <div class="col-md-6"><div class="search-box"><i class="bi bi-search"></i><input type="text" class="form-control" id="students-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05EA\u05DC\u05DE\u05D9\u05D3..."></div></div>
        <div class="col-md-3"><select class="form-select" id="students-class-filter"><option value="">\u05DB\u05DC \u05D4\u05DB\u05D9\u05EA\u05D5\u05EA</option></select></div>
        <div class="col-md-3"><select class="form-select" id="students-status-filter"><option value="">\u05DB\u05DC \u05D4\u05E1\u05D8\u05D8\u05D5\u05E1\u05D9\u05DD</option><option value="\u05E4\u05E2\u05D9\u05DC">\u05E4\u05E2\u05D9\u05DC</option><option value="\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC">\u05DC\u05D0 \u05E4\u05E2\u05D9\u05DC</option></select></div>
      </div></div>
      <div id="students-list">${Utils.skeleton(4)}</div>
      <div class="modal fade" id="student-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
        <div class="modal-header"><h5 class="modal-title" id="student-modal-title">\u05D4\u05D5\u05E1\u05E4\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body">
          <input type="hidden" id="sf-id">
          <div class="mb-3"><label class="form-label">\u05E9\u05DD \u05DE\u05DC\u05D0</label><input type="text" class="form-control" id="sf-name" required></div>
          <div class="row g-3"><div class="col-6"><label class="form-label">\u05DB\u05D9\u05EA\u05D4</label><input type="text" class="form-control" id="sf-class"></div><div class="col-6"><label class="form-label">\u05D8\u05DC\u05E4\u05D5\u05DF</label><input type="tel" class="form-control" id="sf-phone" dir="ltr"></div></div>
          <div class="row g-3 mt-1"><div class="col-6"><label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA \u05DC\u05D9\u05D3\u05D4</label><input type="date" class="form-control" id="sf-birthdate"></div><div class="col-6"><label class="form-label">\u05E1\u05D8\u05D8\u05D5\u05E1</label><select class="form-select" id="sf-status"><option value="\u05E4\u05E2\u05D9\u05DC">\u05E4\u05E2\u05D9\u05DC</option><option value="\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC">\u05DC\u05D0 \u05E4\u05E2\u05D9\u05DC</option></select></div></div>
          <div class="mb-3 mt-3"><label class="form-label">\u05DB\u05EA\u05D5\u05D1\u05EA</label><input type="text" class="form-control" id="sf-address"></div>
        </div>
        <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveStudent()">\u05E9\u05DE\u05D9\u05E8\u05D4</button></div>
      </div></div></div>
    `;
  },
  _studentsData: [],
  async studentsInit() {
    const data = await App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
    this._studentsData = data;
    data.forEach(s => { s._fullName = Utils.fullName(s); s._id = Utils.rowId(s); });
    const classes = [...new Set(data.map(s => s['\u05DB\u05D9\u05EA\u05D4']).filter(Boolean))].sort();
    const classFilter = document.getElementById('students-class-filter');
    classes.forEach(c => { classFilter.insertAdjacentHTML('beforeend', `<option value="${c}">${c}</option>`); });
    const render = () => this.renderStudentsList();
    document.getElementById('students-search').addEventListener('input', Utils.debounce(render, 200));
    document.getElementById('students-class-filter').addEventListener('change', render);
    document.getElementById('students-status-filter').addEventListener('change', render);
    this.renderStudentsList();
  },
  renderStudentsList() {
    const search = (document.getElementById('students-search')?.value || '').trim().toLowerCase();
    const classF = document.getElementById('students-class-filter')?.value || '';
    const statusF = document.getElementById('students-status-filter')?.value || '';
    let filtered = this._studentsData.filter(s => {
      if (search && !(s._fullName || '').toLowerCase().includes(search)) return false;
      if (classF && s['\u05DB\u05D9\u05EA\u05D4'] !== classF) return false;
      if (statusF && s['\u05E1\u05D8\u05D8\u05D5\u05E1'] !== statusF) return false;
      return true;
    });
    document.getElementById('students-count').textContent = `${filtered.length} \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD`;
    if (filtered.length === 0) { document.getElementById('students-list').innerHTML = `<div class="empty-state"><i class="bi bi-search"></i><h5>\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</h5></div>`; return; }
    document.getElementById('students-list').innerHTML = `<div class="row g-3">${filtered.map(s => {
      const name = s._fullName || ''; const cls = s['\u05DB\u05D9\u05EA\u05D4'] || ''; const age = Utils.calcAge(s['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4']);
      return `<div class="col-md-6 col-lg-4"><div class="card card-clickable p-3" onclick="location.hash='student/${s._id}'"><div class="d-flex align-items-center gap-3">${Utils.avatarHTML(name)}<div class="flex-grow-1 min-width-0"><div class="fw-bold text-truncate">${name}</div><small class="text-muted">\u05DB\u05D9\u05EA\u05D4 ${cls}${age ? ' | \u05D2\u05D9\u05DC ' + age : ''}</small></div><div class="d-flex align-items-center gap-2">${Utils.statusBadge(s['\u05E1\u05D8\u05D8\u05D5\u05E1'])}<button class="btn btn-sm btn-outline-danger" onclick="event.stopPropagation();Pages.deleteStudent('${s._id}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button></div></div></div></div>`;
    }).join('')}</div>`;
  },
  showStudentForm(student = null) {
    document.getElementById('student-modal-title').textContent = student ? '\u05E2\u05E8\u05D9\u05DB\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3' : '\u05D4\u05D5\u05E1\u05E4\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3';
    document.getElementById('sf-id').value = student ? Utils.rowId(student) : '';
    document.getElementById('sf-name').value = student ? Utils.fullName(student) : '';
    document.getElementById('sf-class').value = student?.['\u05DB\u05D9\u05EA\u05D4'] || '';
    document.getElementById('sf-phone').value = student?.['\u05D8\u05DC\u05E4\u05D5\u05DF'] || '';
    document.getElementById('sf-birthdate').value = student?.['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4'] || '';
    document.getElementById('sf-status').value = student?.['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '\u05E4\u05E2\u05D9\u05DC';
    document.getElementById('sf-address').value = student?.['\u05DB\u05EA\u05D5\u05D1\u05EA'] || '';
    new bootstrap.Modal(document.getElementById('student-modal')).show();
  },
  async saveStudent() {
    const id = document.getElementById('sf-id').value;
    const fullName = document.getElementById('sf-name').value.trim(); const nameParts = fullName.split(/\s+/); const firstName = nameParts[0]||''; const lastName = nameParts.slice(1).join(' ')||'';
    const row = { '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': firstName, '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': lastName, '\u05DB\u05D9\u05EA\u05D4': document.getElementById('sf-class').value.trim(), '\u05D8\u05DC\u05E4\u05D5\u05DF': document.getElementById('sf-phone').value.trim(), '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': document.getElementById('sf-birthdate').value, '\u05E1\u05D8\u05D8\u05D5\u05E1': document.getElementById('sf-status').value, '\u05DB\u05EA\u05D5\u05D1\u05EA': document.getElementById('sf-address').value.trim() };
    if (!firstName) { Utils.toast('\u05E0\u05D0 \u05DC\u05D4\u05D6\u05D9\u05DF \u05E9\u05DD', 'warning'); return; }
    const phone = document.getElementById('sf-phone').value.trim();
    if (phone && !/^0\d{8,9}$/.test(phone.replace(/[-\s]/g,''))) { Utils.toast('\u05DE\u05E1\u05E4\u05E8 \u05D8\u05DC\u05E4\u05D5\u05DF \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF','warning'); return; }
    try {
      if (id) { await App.apiCall('update', '\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD', { id, row }); } else { await App.apiCall('add', '\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD', { row }); }
      bootstrap.Modal.getInstance(document.getElementById('student-modal')).hide();
      Utils.toast(id ? '\u05EA\u05DC\u05DE\u05D9\u05D3 \u05E2\u05D5\u05D3\u05DB\u05DF' : '\u05EA\u05DC\u05DE\u05D9\u05D3 \u05E0\u05D5\u05E1\u05E3', 'success');
      this.studentsInit();
    } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05E9\u05DE\u05D9\u05E8\u05D4', 'danger'); }
  },
  async deleteStudent(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3','\u05D4\u05D0\u05DD \u05DC\u05DE\u05D7\u05D5\u05E7 \u05D0\u05EA \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3?')) return;
    try { await App.apiCall('delete','\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD',{id}); Utils.toast('\u05EA\u05DC\u05DE\u05D9\u05D3 \u05E0\u05DE\u05D7\u05E7'); this.studentsInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },
  exportStudentsCSV() {
    const rows = this._studentsData || [];
    if (!rows.length) { Utils.toast('\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD','warning'); return; }
    let csv = '\uFEFF' + '\u05E9\u05DD,\u05DB\u05D9\u05EA\u05D4,\u05D8\u05DC\u05E4\u05D5\u05DF,\u05E1\u05D8\u05D8\u05D5\u05E1,\u05EA\u05D0\u05E8\u05D9\u05DA \u05DC\u05D9\u05D3\u05D4,\u05DB\u05EA\u05D5\u05D1\u05EA\n';
    rows.forEach(s => { csv += `"${Utils.fullName(s)}","${s['\u05DB\u05D9\u05EA\u05D4']||''}","${s['\u05D8\u05DC\u05E4\u05D5\u05DF']||''}","${s['\u05E1\u05D8\u05D8\u05D5\u05E1']||''}","${s['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4']||''}","${s['\u05DB\u05EA\u05D5\u05D1\u05EA']||''}"\n`; });
    const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'students_'+Utils.todayISO()+'.csv'; link.click();
    Utils.toast('\u05E7\u05D5\u05D1\u05E5 CSV \u05D9\u05D5\u05E6\u05D0');
  },
  showBulkAddStudents() {
    const html = `<div class="modal fade" id="bulk-student-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><h5>\u05D4\u05D5\u05E1\u05E4\u05D4 \u05DE\u05E8\u05D5\u05D1\u05D4</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body">
    <p class="text-muted small">\u05D4\u05D3\u05D1\u05E7 \u05E9\u05DE\u05D5\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD, \u05D0\u05D7\u05D3 \u05D1\u05DB\u05DC \u05E9\u05D5\u05E8\u05D4. \u05E4\u05D5\u05E8\u05DE\u05D8: \u05E9\u05DD \u05E4\u05E8\u05D8\u05D9 \u05E9\u05DD \u05DE\u05E9\u05E4\u05D7\u05D4, \u05DB\u05D9\u05EA\u05D4</p>
    <textarea class="form-control" id="bulk-students-text" rows="10" placeholder="\u05D9\u05D5\u05E1\u05E3 \u05DB\u05D4\u05DF, \u05D0\n\u05DE\u05E9\u05D4 \u05DC\u05D5\u05D9, \u05D1\n\u05D0\u05D1\u05E8\u05D4\u05DD \u05D2\u05D5\u05DC\u05D3\u05E9\u05D8\u05D9\u05D9\u05DF, \u05D0"></textarea>
  </div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveBulkStudents()">\u05D4\u05D5\u05E1\u05E3 \u05D4\u05DB\u05DC</button></div></div></div></div>`;
    document.getElementById('bulk-student-modal')?.remove();
    document.body.insertAdjacentHTML('beforeend', html);
    new bootstrap.Modal(document.getElementById('bulk-student-modal')).show();
  },
  async saveBulkStudents() {
    const text = document.getElementById('bulk-students-text')?.value?.trim();
    if (!text) { Utils.toast('\u05D4\u05D3\u05D1\u05E7 \u05E9\u05DE\u05D5\u05EA','warning'); return; }
    const lines = text.split('\n').filter(l => l.trim());
    let added = 0;
    for (const line of lines) {
      const parts = line.split(',');
      const nameParts = (parts[0]||'').trim().split(/\s+/);
      const cls = (parts[1]||'').trim();
      const row = {'\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': nameParts[0]||'', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': nameParts.slice(1).join(' ')||'', '\u05DB\u05D9\u05EA\u05D4': cls, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC'};
      if (row['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9']) {
        try { await App.apiCall('add','\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD',{row}); added++; } catch(e) {}
      }
    }
    bootstrap.Modal.getInstance(document.getElementById('bulk-student-modal'))?.hide();
    Utils.toast(added + ' \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05E0\u05D5\u05E1\u05E4\u05D5');
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
      <div class="logo">\uD83C\uDF93 \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3</div>
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
     STUDENT CARD (10 tabs)
     ====================================================================== */
  student(id) { return `<div id="student-card-content">${Utils.skeleton(3)}</div>`; },
  async studentInit(id) {
    const students = await App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
    const s = students.find(x => String(Utils.rowId(x)) === String(id) || String(x.id) === String(id));
    if (!s) { document.getElementById('student-card-content').innerHTML = `<div class="empty-state"><i class="bi bi-person-x"></i><h5>\u05EA\u05DC\u05DE\u05D9\u05D3 \u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0</h5><a href="#students" class="btn btn-primary mt-2">\u05D7\u05D6\u05E8\u05D4 \u05DC\u05E8\u05E9\u05D9\u05DE\u05D4</a></div>`; return; }
    const sId = String(Utils.rowId(s)); const name = Utils.fullName(s); const age = Utils.calcAge(s['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4']);
    const phone = s['\u05D8\u05DC\u05E4\u05D5\u05DF'] || '';
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
      <div class="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
        <a href="#students" class="btn btn-link text-decoration-none"><i class="bi bi-arrow-right me-1"></i>\u05D7\u05D6\u05E8\u05D4 \u05DC\u05E8\u05E9\u05D9\u05DE\u05D4</a>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-secondary btn-sm" onclick="Pages.printStudentCard('${sId}')"><i class="bi bi-printer me-1"></i>\u05D4\u05D3\u05E4\u05E1\u05D4</button>
          <button class="btn btn-outline-primary btn-sm" onclick="Pages.showStudentForm(Pages._studentsData.find(x=>String(Utils.rowId(x))==='${sId}'))"><i class="bi bi-pencil me-1"></i>\u05E2\u05E8\u05D9\u05DB\u05D4</button>
          ${primaryPhone ? `<a href="${waLink(primaryPhone)}" target="_blank" class="btn btn-success btn-sm"><i class="bi bi-whatsapp me-1"></i>WhatsApp</a>` : ''}
          ${parentPhone && parentPhone !== phone ? `<a href="${waLink(parentPhone, '\u05E9\u05DC\u05D5\u05DD, \u05D0\u05E0\u05D9 \u05E4\u05D5\u05E0\u05D4 \u05DE\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3 \u05D1\u05E0\u05D5\u05D2\u05E2 \u05DC' + name)}" target="_blank" class="btn btn-outline-success btn-sm"><i class="bi bi-whatsapp me-1"></i>WhatsApp \u05DC\u05D4\u05D5\u05E8\u05D9\u05DD</a>` : ''}
          <button class="btn btn-outline-danger btn-sm" onclick="Pages.deleteStudent('${sId}')"><i class="bi bi-trash me-1"></i>\u05DE\u05D7\u05D9\u05E7\u05D4</button>
        </div>
      </div>
      <div class="card overflow-hidden mb-3"><div class="student-header">${Utils.avatarHTML(name, 'xl')}<h3 class="fw-bold mt-2 mb-1">${name}</h3><div>\u05DB\u05D9\u05EA\u05D4 ${s['\u05DB\u05D9\u05EA\u05D4'] || '--'}${age ? ` | \u05D2\u05D9\u05DC ${age}` : ''}</div>${Utils.statusBadge(s['\u05E1\u05D8\u05D8\u05D5\u05E1'])}</div></div>
      <div class="row g-3 mb-3">
        <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold ${attPct >= 80 ? 'text-success' : attPct >= 60 ? 'text-warning' : 'text-danger'}">${attPct}%</div><small class="text-muted">\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</small><div class="progress mt-2" style="height:4px"><div class="progress-bar ${attPct >= 80 ? 'bg-success' : 'bg-warning'}" style="width:${attPct}%"></div></div></div></div>
        <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold ${(posB-negB) >= 0 ? 'text-success' : 'text-danger'}">${posB-negB >= 0 ? '+' : ''}${posB-negB}</div><small class="text-muted">\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</small></div></div>
        <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold">${Utils.formatCurrency(sfDebt)}</div><small class="text-muted">${sfDebt > 0 ? '\u05D7\u05D5\u05D1' : '\u05DE\u05D0\u05D5\u05D6\u05DF'}</small></div></div>
        <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-primary">${studentAtt.length}</div><small class="text-muted">\u05D9\u05DE\u05D9 \u05E8\u05D9\u05E9\u05D5\u05DD</small></div></div>
      </div>
      <ul class="nav nav-tabs-bht mb-3 flex-nowrap overflow-auto" role="tablist" style="white-space:nowrap">
        <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" href="#tab-info"><i class="bi bi-info-circle me-1"></i>\u05DE\u05D9\u05D3\u05E2</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-parents"><i class="bi bi-people me-1"></i>\u05D4\u05D5\u05E8\u05D9\u05DD</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-att"><i class="bi bi-calendar-check me-1"></i>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-beh"><i class="bi bi-emoji-smile me-1"></i>\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-medical"><i class="bi bi-heart-pulse me-1"></i>\u05E8\u05E4\u05D5\u05D0\u05D9</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-hw"><i class="bi bi-journal-text me-1"></i>\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9 \u05D1\u05D9\u05EA</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-fin"><i class="bi bi-cash-stack me-1"></i>\u05DB\u05E1\u05E4\u05D9\u05DD</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-grades"><i class="bi bi-mortarboard me-1"></i>\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-docs"><i class="bi bi-folder me-1"></i>\u05DE\u05E1\u05DE\u05DB\u05D9\u05DD</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-comm"><i class="bi bi-chat-dots me-1"></i>\u05EA\u05E7\u05E9\u05D5\u05E8\u05EA</a></li>
      </ul>
      <div class="tab-content">

        <!-- 1. \u05DE\u05D9\u05D3\u05E2 -->
        <div class="tab-pane fade show active" id="tab-info"><div class="card p-3"><div class="row g-3">
          <div class="col-sm-6"><label class="form-label text-muted small">\u05E9\u05DD</label><div class="fw-bold">${name}</div></div>
          <div class="col-sm-6"><label class="form-label text-muted small">\u05DB\u05D9\u05EA\u05D4</label><div class="fw-bold">${s['\u05DB\u05D9\u05EA\u05D4'] || '--'}</div></div>
          <div class="col-sm-6"><label class="form-label text-muted small">\u05D8\u05DC\u05E4\u05D5\u05DF</label><div class="fw-bold" dir="ltr">${Utils.formatPhone(phone)}</div></div>
          <div class="col-sm-6"><label class="form-label text-muted small">\u05EA\u05D0\u05E8\u05D9\u05DA \u05DC\u05D9\u05D3\u05D4</label><div class="fw-bold">${Utils.formatDate(s['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4'])}</div></div>
          <div class="col-sm-6"><label class="form-label text-muted small">\u05E1\u05D8\u05D8\u05D5\u05E1</label><div>${Utils.statusBadge(s['\u05E1\u05D8\u05D8\u05D5\u05E1'])}</div></div>
          <div class="col-sm-6"><label class="form-label text-muted small">\u05DB\u05EA\u05D5\u05D1\u05EA</label><div class="fw-bold">${s['\u05DB\u05EA\u05D5\u05D1\u05EA'] || '--'}</div></div>
          <div class="col-sm-6"><label class="form-label text-muted small">\u05EA\u05E2\u05D5\u05D3\u05EA \u05D6\u05D4\u05D5\u05EA</label><div class="fw-bold">${s['\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA'] || s['\u05ea\u05e2\u05d5\u05d3\u05ea_\u05d6\u05d4\u05d5\u05ea'] || '--'}</div></div>
          <div class="col-sm-6"><label class="form-label text-muted small">\u05E2\u05D9\u05E8</label><div class="fw-bold">${s['\u05E2\u05D9\u05E8'] || s['\u05e2\u05d9\u05e8'] || '--'}</div></div>
          <div class="col-sm-6"><label class="form-label text-muted small">\u05E2\u05D3\u05D4</label><div class="fw-bold">${s['\u05E2\u05D3\u05D4'] || s['\u05e2\u05d3\u05d4'] || '--'}</div></div>
          <div class="col-sm-6"><label class="form-label text-muted small">\u05D1\u05D9\u05EA \u05DB\u05E0\u05E1\u05EA</label><div class="fw-bold">${s['\u05D1\u05D9\u05EA_\u05DB\u05E0\u05E1\u05EA'] || s['\u05d1\u05d9\u05ea_\u05db\u05e0\u05e1\u05ea'] || '--'}</div></div>
          <div class="col-sm-6"><label class="form-label text-muted small">\u05DE\u05E1\u05E4\u05E8 \u05D0\u05D7\u05D9\u05DD</label><div class="fw-bold">${s['\u05DE\u05E1\u05E4\u05E8_\u05D0\u05D7\u05D9\u05DD'] || s['\u05de\u05e1\u05e4\u05e8_\u05d0\u05d7\u05d9\u05dd'] || '--'}</div></div>
          <div class="col-sm-6"><label class="form-label text-muted small">\u05D1\u05D9\u05EA \u05E1\u05E4\u05E8 \u05E7\u05D5\u05D3\u05DD</label><div class="fw-bold">${s['\u05D1\u05D9\u05EA_\u05E1\u05E4\u05E8_\u05E7\u05D5\u05D3\u05DD'] || s['\u05d1\u05d9\u05ea_\u05e1\u05e4\u05e8_\u05e7\u05d5\u05d3\u05dd'] || '--'}</div></div>
          <div class="col-sm-6"><label class="form-label text-muted small">\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05E8\u05E9\u05DE\u05D4</label><div class="fw-bold">${Utils.formatDate(s['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05E8\u05E9\u05DE\u05D4'] || s['\u05ea\u05d0\u05e8\u05d9\u05da_\u05d4\u05e8\u05e9\u05de\u05d4'] || '')}</div></div>
          ${s['\u05D4\u05E2\u05E8\u05D5\u05EA'] ? `<div class="col-12"><label class="form-label text-muted small">\u05D4\u05E2\u05E8\u05D5\u05EA</label><div>${s['\u05D4\u05E2\u05E8\u05D5\u05EA']}</div></div>` : ''}
        </div></div></div>

        <!-- 2. \u05D4\u05D5\u05E8\u05D9\u05DD -->
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

        <!-- 3. \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA -->
        <div class="tab-pane fade" id="tab-att"><div class="row g-3 mb-3">
          <div class="col-4"><div class="card p-3 text-center"><div class="fs-3 fw-bold text-success">${attPct}%</div><small class="text-muted">\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</small></div></div>
          <div class="col-4"><div class="card p-3 text-center"><div class="fs-3 fw-bold text-primary">${presentCount}</div><small class="text-muted">\u05D9\u05DE\u05D9 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</small></div></div>
          <div class="col-4"><div class="card p-3 text-center"><div class="fs-3 fw-bold text-danger">${studentAtt.length - presentCount}</div><small class="text-muted">\u05D7\u05D9\u05E1\u05D5\u05E8\u05D9\u05DD</small></div></div>
        </div>${studentAtt.length === 0 ? '<div class="text-muted text-center py-3">\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</div>' :
        `<div class="card"><table class="table table-bht mb-0"><thead><tr><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th><th>\u05D4\u05E2\u05E8\u05D4</th></tr></thead><tbody>${studentAtt.slice(-15).reverse().map(a => `<tr><td>${Utils.formatDateShort(a['\u05EA\u05D0\u05E8\u05D9\u05DA'])}</td><td>${a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E0\u05D5\u05DB\u05D7' ? '<span class="badge bg-success">\u05E0\u05D5\u05DB\u05D7</span>' : a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D0\u05D9\u05D7\u05D5\u05E8' ? '<span class="badge bg-warning text-dark">\u05D0\u05D9\u05D7\u05D5\u05E8</span>' : '<span class="badge bg-danger">\u05D7\u05D9\u05E1\u05D5\u05E8</span>'}</td><td class="text-muted small">${a['\u05D4\u05E2\u05E8\u05D4']||''}</td></tr>`).join('')}</tbody></table></div>`}</div>

        <!-- 4. \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA -->
        <div class="tab-pane fade" id="tab-beh"><div class="d-flex gap-3 mb-3"><span class="badge bg-success p-2"><i class="bi bi-hand-thumbs-up me-1"></i>+${posB} \u05D7\u05D9\u05D5\u05D1\u05D9</span><span class="badge bg-danger p-2"><i class="bi bi-hand-thumbs-down me-1"></i>-${negB} \u05E9\u05DC\u05D9\u05DC\u05D9</span><span class="badge bg-secondary p-2">\u05E1\u05D4"\u05DB ${studentBeh.length}</span></div>
          ${studentBeh.length === 0 ? '<div class="text-muted text-center">\u05D0\u05D9\u05DF \u05D3\u05D9\u05D5\u05D5\u05D7\u05D9 \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</div>' :
          `<div class="card"><table class="table table-sm mb-0"><thead><tr><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05E1\u05D5\u05D2</th><th>\u05EA\u05D9\u05D0\u05D5\u05E8</th><th>\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA</th></tr></thead><tbody>${studentBeh.slice(-15).reverse().map(b => `<tr><td>${Utils.formatDateShort(b['\u05EA\u05D0\u05E8\u05D9\u05DA'])}</td><td><span class="badge bg-${b['\u05E1\u05D5\u05D2']==='\u05D7\u05D9\u05D5\u05D1\u05D9'?'success':'danger'}">${b['\u05E1\u05D5\u05D2']||''}</span></td><td>${b['\u05EA\u05D9\u05D0\u05D5\u05E8']||''}</td><td class="text-muted small">${b['\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA']||b['points']||''}</td></tr>`).join('')}</tbody></table></div>`}</div>

        <!-- 5. \u05E8\u05E4\u05D5\u05D0\u05D9 -->
        <div class="tab-pane fade" id="tab-medical">${studentMed.length === 0
          ? '<div class="empty-state py-4"><i class="bi bi-heart-pulse"></i><h6>\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0 \u05DE\u05D9\u05D3\u05E2 \u05E8\u05E4\u05D5\u05D0\u05D9</h6></div>'
          : `<div class="row g-3">${studentMed.map(m => `<div class="col-12"><div class="card p-3">
              <div class="row g-3">
                ${m['\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA']||m['allergies'] ? `<div class="col-sm-6"><div class="d-flex align-items-start gap-2"><i class="bi bi-exclamation-triangle text-warning fs-5"></i><div><label class="form-label text-muted small mb-0">\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA</label><div class="fw-bold">${m['\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA']||m['allergies']}</div></div></div></div>` : ''}
                ${m['\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA']||m['medications'] ? `<div class="col-sm-6"><div class="d-flex align-items-start gap-2"><i class="bi bi-capsule text-primary fs-5"></i><div><label class="form-label text-muted small mb-0">\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA</label><div class="fw-bold">${m['\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA']||m['medications']}</div></div></div></div>` : ''}
                ${m['\u05DE\u05D2\u05D1\u05DC\u05D5\u05EA']||m['limitations'] ? `<div class="col-sm-6"><div class="d-flex align-items-start gap-2"><i class="bi bi-shield-exclamation text-danger fs-5"></i><div><label class="form-label text-muted small mb-0">\u05DE\u05D2\u05D1\u05DC\u05D5\u05EA</label><div class="fw-bold">${m['\u05DE\u05D2\u05D1\u05DC\u05D5\u05EA']||m['limitations']}</div></div></div></div>` : ''}
                ${m['\u05E7\u05D5\u05E4\u05EA_\u05D7\u05D5\u05DC\u05D9\u05DD']||m['insurance'] ? `<div class="col-sm-6"><div class="d-flex align-items-start gap-2"><i class="bi bi-hospital text-info fs-5"></i><div><label class="form-label text-muted small mb-0">\u05E7\u05D5\u05E4\u05EA \u05D7\u05D5\u05DC\u05D9\u05DD</label><div class="fw-bold">${m['\u05E7\u05D5\u05E4\u05EA_\u05D7\u05D5\u05DC\u05D9\u05DD']||m['insurance']}</div></div></div></div>` : ''}
                ${m['\u05D4\u05E2\u05E8\u05D5\u05EA']||m['notes'] ? `<div class="col-12"><label class="form-label text-muted small">\u05D4\u05E2\u05E8\u05D5\u05EA</label><div>${m['\u05D4\u05E2\u05E8\u05D5\u05EA']||m['notes']}</div></div>` : ''}
              </div>
            </div></div>`).join('')}</div>`
        }</div>

        <!-- 6. \u05E9\u05D9\u05E2\u05D5\u05E8\u05D9 \u05D1\u05D9\u05EA -->
        <div class="tab-pane fade" id="tab-hw">${studentHW.length === 0
          ? '<div class="empty-state py-4"><i class="bi bi-journal-text"></i><h6>\u05D0\u05D9\u05DF \u05E9\u05D9\u05E2\u05D5\u05E8\u05D9 \u05D1\u05D9\u05EA</h6></div>'
          : `<div class="row g-3">${studentHW.slice(-15).reverse().map(hw => {
              const hwStatus = hw['\u05E1\u05D8\u05D8\u05D5\u05E1']||'';
              const statusColor = hwStatus === '\u05D4\u05D5\u05D2\u05E9' ? 'success' : hwStatus === '\u05D7\u05E1\u05E8' ? 'danger' : hwStatus === '\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8' ? 'warning' : 'secondary';
              return `<div class="col-md-6"><div class="card p-3">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <div><div class="fw-bold">${hw['\u05E0\u05D5\u05E9\u05D0']||hw['\u05DE\u05E7\u05E6\u05D5\u05E2']||hw['subject']||'\u05E9\u05D9\u05E2\u05D5\u05E8'}</div>
                  <small class="text-muted">${Utils.formatDateShort(hw['\u05EA\u05D0\u05E8\u05D9\u05DA']||hw['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4']||'')}</small></div>
                  <span class="badge bg-${statusColor}">${hwStatus||'\u05DC\u05D0 \u05D9\u05D3\u05D5\u05E2'}</span>
                </div>
                ${hw['\u05EA\u05D9\u05D0\u05D5\u05E8']||hw['description']||'' ? `<div class="text-muted small">${hw['\u05EA\u05D9\u05D0\u05D5\u05E8']||hw['description']||''}</div>` : ''}
                ${hw['\u05E6\u05D9\u05D5\u05DF']||hw['grade']||'' ? `<div class="mt-1"><span class="badge bg-info">\u05E6\u05D9\u05D5\u05DF: ${hw['\u05E6\u05D9\u05D5\u05DF']||hw['grade']}</span></div>` : ''}
              </div></div>`;
            }).join('')}</div>`
        }</div>

        <!-- 7. \u05DB\u05E1\u05E4\u05D9\u05DD -->
        <div class="tab-pane fade" id="tab-fin"><div class="card p-3"><div class="row g-3 text-center mb-3">
          <div class="col-4"><div class="fs-5 fw-bold">${Utils.formatCurrency(sfTotal || 0)}</div><small class="text-muted">\u05E1\u05D4"\u05DB</small></div>
          <div class="col-4"><div class="fs-5 fw-bold text-success">${Utils.formatCurrency(sfPaid || 0)}</div><small class="text-muted">\u05E9\u05D5\u05DC\u05DD</small></div>
          <div class="col-4"><div class="fs-5 fw-bold text-danger">${Utils.formatCurrency(sfDebt || 0)}</div><small class="text-muted">\u05D9\u05EA\u05E8\u05D4</small></div>
        </div>${sfTotal ? `<div class="finance-progress"><div class="finance-progress-bar bg-success" style="width:${Math.round((sfPaid||0)/(sfTotal||1)*100)}%"></div></div><small class="text-muted mt-1 d-block">${Math.round((sfPaid||0)/(sfTotal||1)*100)}% \u05E9\u05D5\u05DC\u05DD</small>` : '<div class="text-muted text-center">\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9 \u05DB\u05E1\u05E4\u05D9\u05DD</div>'}
        ${studentFin.length > 0 ? `<hr><table class="table table-sm mb-0"><thead><tr><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05EA\u05D9\u05D0\u05D5\u05E8</th><th>\u05E1\u05DB\u05D5\u05DD</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th></tr></thead><tbody>${studentFin.slice(-10).reverse().map(f => `<tr><td>${Utils.formatDateShort(f['\u05EA\u05D0\u05E8\u05D9\u05DA']||'')}</td><td>${f['\u05EA\u05D9\u05D0\u05D5\u05E8']||f['\u05E4\u05D9\u05E8\u05D5\u05D8']||''}</td><td>${Utils.formatCurrency(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0)}</td><td><span class="badge bg-${(f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')=== '\u05E9\u05D5\u05DC\u05DD'?'success':'danger'}">${f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'\u05DC\u05D0 \u05E9\u05D5\u05DC\u05DD'}</span></td></tr>`).join('')}</tbody></table>` : ''}
        </div></div>

        <!-- 8. \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD -->
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

        <!-- 9. \u05DE\u05E1\u05DE\u05DB\u05D9\u05DD -->
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

        <!-- 10. \u05EA\u05E7\u05E9\u05D5\u05E8\u05EA -->
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
