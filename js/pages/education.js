/* ===== BHT v5.3 — Education ===== */
Object.assign(Pages, {
  /* ======================================================================
     BEHAVIOR
     ====================================================================== */
  behavior() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-star-half me-2"></i>\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</h1></div><button class="btn btn-primary btn-sm" onclick="Pages.showAddBeh()"><i class="bi bi-plus-lg me-1"></i>\u05D3\u05D9\u05D5\u05D5\u05D7 \u05D7\u05D3\u05E9</button></div><div class="row g-3 mb-3"><div class="col-md-4"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-success" id="beh-pos">0</div><small>\u05D7\u05D9\u05D5\u05D1\u05D9</small></div></div><div class="col-md-4"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-danger" id="beh-neg">0</div><small>\u05E9\u05DC\u05D9\u05DC\u05D9</small></div></div><div class="col-md-4"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-primary" id="beh-total">0</div><small>\u05E1\u05D4"\u05DB</small></div></div></div><div class="card mb-3" id="beh-leaderboard" style="display:none"><div class="card-body"><h6 class="fw-bold"><i class="bi bi-trophy-fill text-warning me-2"></i>\u05DE\u05D5\u05D1\u05D9\u05DC\u05D9\u05DD</h6><div id="beh-top"></div></div></div><div id="beh-list">${Utils.skeleton(3)}</div><div class="modal fade" id="beh-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">\u05D3\u05D9\u05D5\u05D5\u05D7 \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row g-3"><div class="col-12"><label class="form-label">\u05EA\u05DC\u05DE\u05D9\u05D3</label><select class="form-select" id="bf-student"></select></div><div class="col-6"><label class="form-label">\u05E1\u05D5\u05D2</label><select class="form-select" id="bf-type"><option>\u05D7\u05D9\u05D5\u05D1\u05D9</option><option>\u05E9\u05DC\u05D9\u05DC\u05D9</option><option>\u05D4\u05E2\u05E8\u05D4</option></select></div><div class="col-6"><label class="form-label">\u05D7\u05D5\u05DE\u05E8\u05D4</label><select class="form-select" id="bf-severity"><option value="1">1 \u05E7\u05DC</option><option value="3" selected>3 \u05D1\u05D9\u05E0\u05D5\u05E0\u05D9</option><option value="5">5 \u05D7\u05DE\u05D5\u05E8</option></select></div><div class="col-12"><label class="form-label">\u05EA\u05D9\u05D0\u05D5\u05E8</label><textarea class="form-control" id="bf-desc" rows="3"></textarea></div></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveBeh()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
  },
  _behData: [],
  async behaviorInit() {
    this._behData = await App.getData('\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA'); this.renderBeh();
  },
  renderBeh() {
    const rows = this._behData || [];
    const pos = rows.filter(r => r['\u05E1\u05D5\u05D2']==='\u05D7\u05D9\u05D5\u05D1\u05D9').length;
    const neg = rows.filter(r => r['\u05E1\u05D5\u05D2']==='\u05E9\u05DC\u05D9\u05DC\u05D9').length;
    document.getElementById('beh-pos').textContent = pos;
    document.getElementById('beh-neg').textContent = neg;
    document.getElementById('beh-total').textContent = rows.length;
    // Leaderboard
    const scores = {};
    rows.forEach(r => { const n = r['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3']||r['\u05E9\u05DD']||r['\u05EA\u05DC\u05DE\u05D9\u05D3']||''; if (!n) return; if (!scores[n]) scores[n]={p:0,n:0}; if (r['\u05E1\u05D5\u05D2']==='\u05D7\u05D9\u05D5\u05D1\u05D9') scores[n].p++; else if (r['\u05E1\u05D5\u05D2']==='\u05E9\u05DC\u05D9\u05DC\u05D9') scores[n].n++; });
    const sorted = Object.keys(scores).sort((a,b) => (scores[b].p-scores[b].n)-(scores[a].p-scores[a].n)).slice(0,5);
    if (sorted.length) { document.getElementById('beh-leaderboard').style.display=''; document.getElementById('beh-top').innerHTML = sorted.map((n,i) => { const net = scores[n].p-scores[n].n; return `<div class="d-flex align-items-center gap-2 mb-1"><span class="fw-bold" style="width:25px">${['&#129351;','&#129352;','&#129353;','4','5'][i]}</span><span class="flex-grow-1">${n}</span><span class="badge ${net>=0?'bg-success':'bg-danger'}">${net>=0?'+':''}${net}</span></div>`; }).join(''); }
    if (!rows.length) { document.getElementById('beh-list').innerHTML = '<div class="empty-state"><i class="bi bi-star"></i><h5>\u05D0\u05D9\u05DF \u05D3\u05D9\u05D5\u05D5\u05D7\u05D9\u05DD</h5></div>'; return; }
    document.getElementById('beh-list').innerHTML = rows.slice().reverse().slice(0,50).map(r => { const tc = r['\u05E1\u05D5\u05D2']==='\u05D7\u05D9\u05D5\u05D1\u05D9'?'success':r['\u05E1\u05D5\u05D2']==='\u05E9\u05DC\u05D9\u05DC\u05D9'?'danger':'secondary'; const nm=r['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3']||r['\u05E9\u05DD']||r['\u05EA\u05DC\u05DE\u05D9\u05D3']||''; const rid=r.id||r['\u05DE\u05D6\u05D4\u05D4']||Utils.rowId(r); return `<div class="card p-3 mb-2"><div class="d-flex justify-content-between"><div><span class="badge bg-${tc} me-2">${r['\u05E1\u05D5\u05D2']||''}</span><strong>${nm}</strong></div><div class="d-flex align-items-center gap-2"><small class="text-muted">${Utils.formatDateShort(r['\u05EA\u05D0\u05E8\u05D9\u05DA'])}</small><button class="btn btn-sm btn-outline-danger" onclick="Pages.deleteBeh('${rid}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button></div></div><p class="mb-0 mt-1 small">${r['\u05EA\u05D9\u05D0\u05D5\u05E8']||''}</p></div>`; }).join('');
  },
  async showAddBeh() { const students = this._studentsData?.length ? this._studentsData : await App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD'); const sel = document.getElementById('bf-student'); if (sel) { sel.innerHTML = '<option value="">\u05D1\u05D7\u05E8</option>' + students.map(s => `<option value="${Utils.rowId(s)}">${Utils.fullName(s)}</option>`).join(''); } new bootstrap.Modal(document.getElementById('beh-modal')).show(); },
  async saveBeh() {
    const row = { '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': document.getElementById('bf-student').value, '\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3': document.getElementById('bf-student').selectedOptions[0]?.text || '', '\u05E1\u05D5\u05D2': document.getElementById('bf-type').value, '\u05D7\u05D5\u05DE\u05E8\u05D4': document.getElementById('bf-severity').value, '\u05EA\u05D9\u05D0\u05D5\u05E8': document.getElementById('bf-desc').value.trim(), '\u05EA\u05D0\u05E8\u05D9\u05DA': Utils.todayISO() };
    try { await App.apiCall('add', '\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA', { row }); bootstrap.Modal.getInstance(document.getElementById('beh-modal')).hide(); Utils.toast('\u05D3\u05D9\u05D5\u05D5\u05D7 \u05E0\u05E9\u05DE\u05E8'); this.behaviorInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4', 'danger'); }
  },
  async deleteBeh(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4','\u05DC\u05DE\u05D7\u05D5\u05E7 \u05D3\u05D9\u05D5\u05D5\u05D7 \u05D6\u05D4?')) return;
    try { await App.apiCall('delete','\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.behaviorInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },


  /* ======================================================================
     HOMEWORK
     ====================================================================== */
  homework() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-book me-2"></i>\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9 \u05D1\u05D9\u05EA</h1></div><div class="d-flex gap-2"><select class="form-select form-select-sm" id="hw-class-filter" style="width:150px" onchange="Pages.renderHw()"><option value="">\u05DB\u05DC \u05D4\u05DB\u05D9\u05EA\u05D5\u05EA</option></select><button class="btn btn-primary btn-sm" onclick="Pages.showAddHw()"><i class="bi bi-plus-lg me-1"></i>\u05E9\u05D9\u05E2\u05D5\u05E8 \u05D1\u05D9\u05EA \u05D7\u05D3\u05E9</button></div></div><div class="row g-3" id="hw-cards">${Utils.skeleton(3)}</div><div class="modal fade" id="hw-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">\u05E9\u05D9\u05E2\u05D5\u05E8 \u05D1\u05D9\u05EA \u05D7\u05D3\u05E9</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row g-3"><div class="col-6"><label class="form-label">\u05DE\u05E7\u05E6\u05D5\u05E2</label><input class="form-control" id="hf-subject"></div><div class="col-6"><label class="form-label">\u05DB\u05D9\u05EA\u05D4</label><input class="form-control" id="hf-class"></div><div class="col-6"><label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA \u05DE\u05EA\u05DF</label><input type="date" class="form-control" id="hf-given"></div><div class="col-6"><label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05D2\u05E9\u05D4</label><input type="date" class="form-control" id="hf-due"></div><div class="col-12"><label class="form-label">\u05EA\u05D9\u05D0\u05D5\u05E8</label><textarea class="form-control" id="hf-desc" rows="3"></textarea></div></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveHw()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
  },
  _hwData: [],
  async homeworkInit() {
    this._hwData = await App.getData('\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9_\u05D1\u05D9\u05EA');
    const classes = [...new Set(this._hwData.map(r => r['\u05DB\u05D9\u05EA\u05D4']).filter(Boolean))].sort();
    const sel = document.getElementById('hw-class-filter');
    if (sel) { const cur = sel.value; sel.innerHTML = '<option value="">\u05DB\u05DC \u05D4\u05DB\u05D9\u05EA\u05D5\u05EA</option>' + classes.map(c => `<option value="${c}">${c}</option>`).join(''); sel.value = cur; }
    this.renderHw();
  },
  renderHw() {
    const today = Utils.todayISO();
    const classFilter = document.getElementById('hw-class-filter')?.value || '';
    const data = classFilter ? this._hwData.filter(r => (r['\u05DB\u05D9\u05EA\u05D4']||'') === classFilter) : this._hwData;
    if (!data.length) { document.getElementById('hw-cards').innerHTML = '<div class="col-12"><div class="empty-state"><i class="bi bi-book"></i><h5>\u05D0\u05D9\u05DF \u05E9\u05D9\u05E2\u05D5\u05E8\u05D9 \u05D1\u05D9\u05EA</h5></div></div>'; return; }
    document.getElementById('hw-cards').innerHTML = data.slice().reverse().map(r => {
      const due = r['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4']||''; const overdue = due && due < today && r['\u05E1\u05D8\u05D8\u05D5\u05E1']!=='\u05D4\u05D5\u05E9\u05DC\u05DD';
      const daysLeft = due ? Math.ceil((new Date(due)-new Date())/86400000) : null;
      const hwId=r.id||r['\u05DE\u05D6\u05D4\u05D4']||Utils.rowId(r); const isDone=(r['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05D4\u05D5\u05E9\u05DC\u05DD';
      return `<div class="col-md-6"><div class="card p-3 ${overdue?'border-danger':''}" style="border-width:2px"><div class="d-flex justify-content-between mb-2"><div><span class="badge bg-primary me-1">${r['\u05E1\u05D5\u05D2']||r['\u05DE\u05E7\u05E6\u05D5\u05E2']||''}</span><span class="badge bg-secondary">${r['\u05DB\u05D9\u05EA\u05D4']||''}</span>${isDone?'<span class="badge bg-success ms-1">\u05D4\u05D5\u05E9\u05DC\u05DD</span>':''}</div>${daysLeft!==null?`<span class="badge ${overdue?'bg-danger':daysLeft<=2?'bg-warning':'bg-success'}">${overdue?'\u05E2\u05D1\u05E8 \u05DE\u05D5\u05E2\u05D3!':daysLeft===0?'\u05D4\u05D9\u05D5\u05DD!':daysLeft+' \u05D9\u05DE\u05D9\u05DD'}</span>`:''}</div><h6 class="fw-bold">${r['\u05DE\u05E7\u05E6\u05D5\u05E2']||''}</h6><p class="small mb-1">${r['\u05EA\u05D9\u05D0\u05D5\u05E8']||''}</p><div class="small text-muted"><i class="bi bi-calendar me-1"></i>\u05E0\u05D9\u05EA\u05DF: ${r['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DE\u05EA\u05DF']||''} ${due?' | \u05D4\u05D2\u05E9\u05D4: '+due:''}</div><div class="mt-2 d-flex gap-2">${!isDone?`<button class="btn btn-sm btn-outline-success" onclick="Pages.markHwDone('${hwId}')"><i class="bi bi-check-lg me-1"></i>\u05D4\u05D5\u05E9\u05DC\u05DD</button>`:''}<button class="btn btn-sm btn-outline-danger" onclick="Pages.deleteHw('${hwId}')"><i class="bi bi-trash me-1"></i>\u05DE\u05D7\u05E7</button></div></div></div>`;
    }).join('');
  },
  showAddHw() { document.getElementById('hf-given').value = Utils.todayISO(); new bootstrap.Modal(document.getElementById('hw-modal')).show(); },
  async saveHw() {
    const row = { '\u05DE\u05E7\u05E6\u05D5\u05E2': document.getElementById('hf-subject').value.trim(), '\u05DB\u05D9\u05EA\u05D4': document.getElementById('hf-class').value.trim(), '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DE\u05EA\u05DF': document.getElementById('hf-given').value, '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4': document.getElementById('hf-due').value, '\u05EA\u05D9\u05D0\u05D5\u05E8': document.getElementById('hf-desc').value.trim(), '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC' };
    if (!row['\u05DE\u05E7\u05E6\u05D5\u05E2']) { Utils.toast('\u05D7\u05E1\u05E8 \u05DE\u05E7\u05E6\u05D5\u05E2', 'warning'); return; }
    try { await App.apiCall('add', '\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9_\u05D1\u05D9\u05EA', { row }); bootstrap.Modal.getInstance(document.getElementById('hw-modal')).hide(); Utils.toast('\u05E9\u05D9\u05E2\u05D5\u05E8 \u05D1\u05D9\u05EA \u05E0\u05D5\u05E1\u05E3'); this.homeworkInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4', 'danger'); }
  },
  async deleteHw(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4','\u05DC\u05DE\u05D7\u05D5\u05E7 \u05E9\u05D9\u05E2\u05D5\u05E8 \u05D1\u05D9\u05EA \u05D6\u05D4?')) return;
    try { await App.apiCall('delete','\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9_\u05D1\u05D9\u05EA',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.homeworkInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },
  async markHwDone(id) {
    try { await App.apiCall('update','\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9_\u05D1\u05D9\u05EA',{id,row:{'\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05D4\u05D5\u05E9\u05DC\u05DD'}}); Utils.toast('\u05E1\u05D5\u05DE\u05DF \u05DB\u05D4\u05D5\u05E9\u05DC\u05DD'); this.homeworkInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },


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
     RANKINGS
     ====================================================================== */
  rankings() {
    return `<div class="page-header"><h1><i class="bi bi-trophy-fill me-2"></i>\u05D3\u05D9\u05E8\u05D5\u05D2\u05D9\u05DD</h1></div><div id="student-of-week" class="mb-3" style="display:none"></div><div class="card p-3 mb-3"><select class="form-select" id="rank-type"><option value="behavior">\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</option><option value="attendance">\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</option></select></div><div class="row g-3 mb-4 justify-content-center" id="rank-podium" style="display:none"><div class="col-auto text-center" id="rank-silver"></div><div class="col-auto text-center" id="rank-gold"></div><div class="col-auto text-center" id="rank-bronze"></div></div><div id="rank-table">${Utils.skeleton(3)}</div>`;
  },
  async rankingsInit() {
    document.getElementById('rank-type').addEventListener('change', () => this.loadRankings());
    this.loadRankings();
  },
  async loadRankings() {
    const type = document.getElementById('rank-type').value;
    let data = [];
    if (type === 'behavior') {
      const beh = await App.getData('\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA');
      const scores = {};
      beh.forEach(r => { const n=r['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3']||r['\u05E9\u05DD']||r['\u05EA\u05DC\u05DE\u05D9\u05D3']||''; if (!n) return; if (!scores[n]) scores[n]=0; if (r['\u05E1\u05D5\u05D2']==='\u05D7\u05D9\u05D5\u05D1\u05D9') scores[n]++; else if (r['\u05E1\u05D5\u05D2']==='\u05E9\u05DC\u05D9\u05DC\u05D9') scores[n]--; });
      data = Object.keys(scores).map(n => ({name:n, score:scores[n]})).sort((a,b)=>b.score-a.score);
    } else {
      const att = await App.getData('\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA');
      const counts = {};
      att.forEach(a => { const n=a['\u05E9\u05DD']||a['\u05EA\u05DC\u05DE\u05D9\u05D3']||''; if (!n) return; if (!counts[n]) counts[n]={p:0,t:0}; counts[n].t++; if (a['\u05E1\u05D8\u05D8\u05D5\u05E1']==='\u05E0\u05D5\u05DB\u05D7') counts[n].p++; });
      data = Object.keys(counts).map(n => ({name:n, score:counts[n].t?Math.round(counts[n].p/counts[n].t*100):0})).sort((a,b)=>b.score-a.score);
    }
    if (!data.length) { document.getElementById('rank-table').innerHTML = '<div class="empty-state"><i class="bi bi-trophy"></i><h5>\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD</h5></div>'; document.getElementById('rank-podium').style.display='none'; return; }
    const max = data[0].score || 1;
    // Podium
    if (data.length >= 3) {
      document.getElementById('rank-podium').style.display = '';
      [{el:'rank-gold',idx:0,color:'#fbbf24',sz:'80px'},{el:'rank-silver',idx:1,color:'#94a3b8',sz:'64px'},{el:'rank-bronze',idx:2,color:'#d97706',sz:'56px'}].forEach(m => {
        const d = data[m.idx]; document.getElementById(m.el).innerHTML = `<div style="font-size:${m.sz};color:${m.color}"><i class="bi bi-trophy-fill"></i></div><h6 class="fw-bold mt-1">${d.name}</h6><div class="fs-4 fw-bold">${d.score}</div>`;
      });
    }
    document.getElementById('rank-table').innerHTML = `<div class="card"><table class="table table-bht mb-0"><thead><tr><th>#</th><th>\u05E9\u05DD</th><th>\u05E0\u05D9\u05E7\u05D5\u05D3</th><th>\u05D2\u05E8\u05E3</th></tr></thead><tbody>${data.slice(0,20).map((d,i) => { const w=Math.max(5,Math.round(d.score/max*100)); const c=i===0?'#fbbf24':i===1?'#94a3b8':i===2?'#d97706':'#2563eb'; return `<tr><td class="fw-bold">${i+1}</td><td class="fw-medium">${d.name}</td><td class="fw-bold">${d.score}</td><td><div class="progress" style="height:20px"><div class="progress-bar" style="width:${w}%;background:${c}">${d.score}</div></div></td></tr>`; }).join('')}</tbody></table></div>`;

    // Student of the week
    const sowEl = document.getElementById('student-of-week');
    if (sowEl && data.length) {
      const weekData = data.filter(d => d.score > 0);
      const studentOfWeek = weekData.length ? weekData[0] : null;
      if (studentOfWeek) {
        sowEl.style.display = '';
        sowEl.innerHTML = `<div class="card border-warning" style="border-width:2px"><div class="card-body text-center"><div class="d-flex align-items-center justify-content-center gap-3"><i class="bi bi-star-fill text-warning fs-1"></i><div><small class="text-muted d-block">\u05EA\u05DC\u05DE\u05D9\u05D3 \u05D4\u05E9\u05D1\u05D5\u05E2</small><h4 class="fw-bold mb-0">${studentOfWeek.name}</h4><span class="badge bg-warning text-dark mt-1">${studentOfWeek.score} \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA</span></div><i class="bi bi-star-fill text-warning fs-1"></i></div></div></div>`;
      } else { sowEl.style.display = 'none'; }
    }
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
