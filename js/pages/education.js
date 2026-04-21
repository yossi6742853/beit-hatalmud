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
     ACADEMICS
     ====================================================================== */
  academics() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-journal-text me-2"></i>\u05DE\u05D1\u05D7\u05E0\u05D9\u05DD \u05D5\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD</h1></div><button class="btn btn-primary btn-sm" onclick="Pages.showAddExam()"><i class="bi bi-plus-lg me-1"></i>\u05DE\u05D1\u05D7\u05DF \u05D7\u05D3\u05E9</button></div><div class="row g-2 mb-3"><div class="col-auto"><span class="badge bg-primary fs-6" id="aca-total">0 \u05DE\u05D1\u05D7\u05E0\u05D9\u05DD</span></div><div class="col-auto"><span class="badge bg-success fs-6" id="aca-avg">\u05DE\u05DE\u05D5\u05E6\u05E2: --</span></div></div><div id="aca-list">${Utils.skeleton(3)}</div><div id="aca-grades-section" style="display:none" class="mt-3"></div><div class="modal fade" id="aca-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">\u05DE\u05D1\u05D7\u05DF \u05D7\u05D3\u05E9</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row g-3"><div class="col-6"><label class="form-label">\u05DE\u05E7\u05E6\u05D5\u05E2</label><input class="form-control" id="af-subject"></div><div class="col-6"><label class="form-label">\u05DB\u05D9\u05EA\u05D4</label><input class="form-control" id="af-class"></div><div class="col-6"><label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA</label><input type="date" class="form-control" id="af-date"></div><div class="col-12"><label class="form-label">\u05EA\u05D9\u05D0\u05D5\u05E8</label><input class="form-control" id="af-desc"></div></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveExam()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
  },
  _acaExams: [], _acaGrades: [],
  async academicsInit() {
    this._acaExams = await App.getData('\u05DE\u05D1\u05D7\u05E0\u05D9\u05DD'); this._acaGrades = await App.getData('\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD'); this.renderAca();
  },
  renderAca() {
    document.getElementById('aca-total').textContent = this._acaExams.length + ' \u05DE\u05D1\u05D7\u05E0\u05D9\u05DD';
    const allG = this._acaGrades.map(g => parseFloat(g['\u05E6\u05D9\u05D5\u05DF'])||0).filter(g => g>0);
    const avg = allG.length ? (allG.reduce((a,b)=>a+b,0)/allG.length).toFixed(1) : '--';
    document.getElementById('aca-avg').textContent = '\u05DE\u05DE\u05D5\u05E6\u05E2: ' + avg;
    if (!this._acaExams.length) { document.getElementById('aca-list').innerHTML = '<div class="empty-state"><i class="bi bi-journal-text"></i><h5>\u05D0\u05D9\u05DF \u05DE\u05D1\u05D7\u05E0\u05D9\u05DD</h5></div>'; return; }
    const gMap = {}; this._acaGrades.forEach(g => { const eid = g['\u05DE\u05D1\u05D7\u05DF_\u05DE\u05D6\u05D4\u05D4']||''; if (!gMap[eid]) gMap[eid]=[]; gMap[eid].push(parseFloat(g['\u05E6\u05D9\u05D5\u05DF'])||0); });
    document.getElementById('aca-list').innerHTML = `<div class="card"><table class="table table-bht mb-0"><thead><tr><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05DE\u05E7\u05E6\u05D5\u05E2</th><th>\u05DB\u05D9\u05EA\u05D4</th><th>\u05EA\u05D9\u05D0\u05D5\u05E8</th><th>\u05DE\u05DE\u05D5\u05E6\u05E2</th><th></th></tr></thead><tbody>${this._acaExams.map(e => { const eid=e['\u05DE\u05D6\u05D4\u05D4']||e.id; const g=gMap[eid]||[]; const ea=g.length?(g.reduce((a,b)=>a+b,0)/g.length).toFixed(1):'--'; const ac=ea!=='--'?(parseFloat(ea)>=70?'text-success':parseFloat(ea)>=55?'text-warning':'text-danger'):''; return `<tr style="cursor:pointer" onclick="Pages.viewGrades('${eid}')"><td>${e['\u05EA\u05D0\u05E8\u05D9\u05DA']||''}</td><td><span class="badge bg-info">${e['\u05DE\u05E7\u05E6\u05D5\u05E2']||''}</span></td><td>${e['\u05DB\u05D9\u05EA\u05D4']||''}</td><td>${e['\u05EA\u05D9\u05D0\u05D5\u05E8']||''}</td><td class="fw-bold ${ac}">${ea} <small class="text-muted">(${g.length})</small></td><td onclick="event.stopPropagation()"><button class="btn btn-sm btn-outline-danger" onclick="Pages.deleteExam('${eid}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button></td></tr>`; }).join('')}</tbody></table></div>`;
  },
  showAddExam() { document.getElementById('af-date').value = Utils.todayISO(); new bootstrap.Modal(document.getElementById('aca-modal')).show(); },
  async saveExam() {
    const row = { '\u05DE\u05E7\u05E6\u05D5\u05E2': document.getElementById('af-subject').value.trim(), '\u05DB\u05D9\u05EA\u05D4': document.getElementById('af-class').value.trim(), '\u05EA\u05D0\u05E8\u05D9\u05DA': document.getElementById('af-date').value, '\u05EA\u05D9\u05D0\u05D5\u05E8': document.getElementById('af-desc').value.trim() };
    if (!row['\u05DE\u05E7\u05E6\u05D5\u05E2']) { Utils.toast('\u05D7\u05E1\u05E8 \u05DE\u05E7\u05E6\u05D5\u05E2', 'warning'); return; }
    try { await App.apiCall('add', '\u05DE\u05D1\u05D7\u05E0\u05D9\u05DD', { row }); bootstrap.Modal.getInstance(document.getElementById('aca-modal')).hide(); Utils.toast('\u05DE\u05D1\u05D7\u05DF \u05E0\u05E9\u05DE\u05E8'); this.academicsInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4', 'danger'); }
  },
  async deleteExam(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4','\u05DC\u05DE\u05D7\u05D5\u05E7 \u05DE\u05D1\u05D7\u05DF \u05D6\u05D4?')) return;
    try { await App.apiCall('delete','\u05DE\u05D1\u05D7\u05E0\u05D9\u05DD',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.academicsInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },
  async viewGrades(examId) {
    var section = document.getElementById('aca-grades-section'); if (!section) return;
    section.style.display = '';
    section.innerHTML = '<div class="card p-3"><div class="text-center py-3"><div class="spinner-border spinner-border-sm"></div> \u05D8\u05D5\u05E2\u05DF...</div></div>';
    var exam = this._acaExams.find(function(e){ return String(e['\u05DE\u05D6\u05D4\u05D4']||e.id) === String(examId); });
    var examClass = exam ? (exam['\u05DB\u05D9\u05EA\u05D4']||'') : '';
    var students = await App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
    var classStudents = examClass ? students.filter(function(s){ return (s['\u05DB\u05D9\u05EA\u05D4']||'') === examClass && (s['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') !== '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC'; }) : students.filter(function(s){ return (s['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') !== '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC'; });
    var examGrades = this._acaGrades.filter(function(g){ return String(g['\u05DE\u05D1\u05D7\u05DF_\u05DE\u05D6\u05D4\u05D4']||'') === String(examId); });
    var gradeMap = {}; examGrades.forEach(function(g){ gradeMap[g['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4']||g['\u05E9\u05DD']||''] = g; });
    var examLabel = (exam?(exam['\u05DE\u05E7\u05E6\u05D5\u05E2']||''):'') + (examClass?' ('+examClass+')':'');
    var html = '<div class="card p-3"><div class="d-flex justify-content-between align-items-center mb-3"><h6 class="fw-bold mb-0"><i class="bi bi-pencil-square me-2"></i>\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD: ' + examLabel + '</h6><button class="btn btn-sm btn-outline-secondary" onclick="document.getElementById(\'aca-grades-section\').style.display=\'none\'"><i class="bi bi-x-lg"></i></button></div><table class="table table-sm table-bht mb-0"><thead><tr><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th style="width:120px">\u05E6\u05D9\u05D5\u05DF</th><th style="width:200px">\u05D4\u05E2\u05E8\u05D5\u05EA</th><th style="width:80px"></th></tr></thead><tbody>';
    classStudents.forEach(function(s){
      var sid = Utils.rowId(s), name = Utils.fullName(s);
      var existing = gradeMap[sid] || gradeMap[name];
      var grade = existing ? (existing['\u05E6\u05D9\u05D5\u05DF']||'') : '';
      var notes = existing ? (existing['\u05D4\u05E2\u05E8\u05D5\u05EA']||'') : '';
      html += '<tr><td class="fw-medium">' + name + '</td><td><input type="number" class="form-control form-control-sm" id="grade-' + sid + '" value="' + grade + '" min="0" max="100"></td><td><input class="form-control form-control-sm" id="gnote-' + sid + '" value="' + notes + '"></td><td><button class="btn btn-sm btn-outline-primary" onclick="Pages.saveGrade(\'' + examId + '\',\'' + sid + '\',\'' + name.replace(/'/g,'') + '\')" title="\u05E9\u05DE\u05D5\u05E8"><i class="bi bi-check-lg"></i></button></td></tr>';
    });
    html += '</tbody></table></div>';
    section.innerHTML = html;
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },
  async saveGrade(examId, studentId, studentName) {
    var grade = document.getElementById('grade-' + studentId)?.value || '';
    var notes = document.getElementById('gnote-' + studentId)?.value || '';
    if (!grade) { Utils.toast('\u05D7\u05E1\u05E8 \u05E6\u05D9\u05D5\u05DF', 'warning'); return; }
    var existing = this._acaGrades.find(function(g){ return String(g['\u05DE\u05D1\u05D7\u05DF_\u05DE\u05D6\u05D4\u05D4']||'') === String(examId) && (String(g['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4']||'') === String(studentId) || (g['\u05E9\u05DD']||'') === studentName); });
    try {
      if (existing) {
        await App.apiCall('update', '\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD', { id: existing.id || existing['\u05DE\u05D6\u05D4\u05D4'], row: { '\u05E6\u05D9\u05D5\u05DF': grade, '\u05D4\u05E2\u05E8\u05D5\u05EA': notes } });
      } else {
        await App.apiCall('add', '\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD', { row: { '\u05DE\u05D1\u05D7\u05DF_\u05DE\u05D6\u05D4\u05D4': examId, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': studentId, '\u05E9\u05DD': studentName, '\u05E6\u05D9\u05D5\u05DF': grade, '\u05D4\u05E2\u05E8\u05D5\u05EA': notes } });
      }
      Utils.toast('\u05E6\u05D9\u05D5\u05DF \u05E0\u05E9\u05DE\u05E8');
      this._acaGrades = await App.getData('\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD');
      this.renderAca();
    } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4', 'danger'); }
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
