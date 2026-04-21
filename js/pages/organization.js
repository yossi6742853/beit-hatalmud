/* ===== BHT v5.3 — Organization ===== */
Object.assign(Pages, {
  /* ======================================================================
     TASKS (KANBAN)
     ====================================================================== */
  tasks() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-kanban me-2"></i>\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA</h1></div><div class="d-flex gap-2"><div class="input-group input-group-sm" style="width:300px"><input class="form-control" id="quick-task" placeholder="\u05DE\u05E9\u05D9\u05DE\u05D4 \u05D7\u05D3\u05E9\u05D4..." onkeydown="if(event.key==='Enter')Pages.quickAddTask()"><button class="btn btn-primary" onclick="Pages.quickAddTask()"><i class="bi bi-plus-lg"></i></button></div></div></div><div class="row g-3"><div class="col-md-4"><div class="card p-3" style="min-height:300px"><h6 class="fw-bold text-center mb-3"><span class="badge bg-secondary">\u05D7\u05D3\u05E9</span> <span id="task-new-c" class="badge bg-light text-dark"></span></h6><div id="task-new"></div></div></div><div class="col-md-4"><div class="card p-3" style="min-height:300px"><h6 class="fw-bold text-center mb-3"><span class="badge bg-primary">\u05D1\u05EA\u05D4\u05DC\u05D9\u05DA</span> <span id="task-prog-c" class="badge bg-light text-dark"></span></h6><div id="task-prog"></div></div></div><div class="col-md-4"><div class="card p-3" style="min-height:300px"><h6 class="fw-bold text-center mb-3"><span class="badge bg-success">\u05D4\u05D5\u05E9\u05DC\u05DD</span> <span id="task-done-c" class="badge bg-light text-dark"></span></h6><div id="task-done"></div></div></div></div>`;
  },
  _taskData: [],
  async tasksInit() { this._taskData = await App.getData('\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA'); this.renderTasks(); },
  renderTasks() {
    const cols = {'\u05D7\u05D3\u05E9':[],'\u05D1\u05EA\u05D4\u05DC\u05D9\u05DA':[],'\u05D4\u05D5\u05E9\u05DC\u05DD':[]};
    (this._taskData||[]).forEach(t => { const s=t['\u05E1\u05D8\u05D8\u05D5\u05E1']||'\u05D7\u05D3\u05E9'; if (cols[s]) cols[s].push(t); else cols['\u05D7\u05D3\u05E9'].push(t); });
    const prC = {'\u05D3\u05D7\u05D5\u05E3':'danger','\u05D2\u05D1\u05D5\u05D4':'warning','\u05E8\u05D2\u05D9\u05DC':'primary','\u05E0\u05DE\u05D5\u05DA':'secondary'};
    const renderCol = (tasks) => !tasks.length ? '<div class="text-muted text-center small py-3">\u05E8\u05D9\u05E7</div>' : tasks.map(t => { const pc=prC[t['\u05E2\u05D3\u05D9\u05E4\u05D5\u05EA']]||'secondary'; const due=t['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E2\u05D3']||''; const ov=due&&due<Utils.todayISO()&&t['\u05E1\u05D8\u05D8\u05D5\u05E1']!=='\u05D4\u05D5\u05E9\u05DC\u05DD'; return `<div class="card mb-2 ${ov?'border-danger':''}" style="border-right:4px solid var(--bs-${pc})"><div class="card-body p-2"><div class="d-flex justify-content-between"><h6 class="card-title mb-1 small fw-bold">${t['\u05DB\u05D5\u05EA\u05E8\u05EA']||''}</h6><span class="badge bg-${pc}" style="font-size:9px">${t['\u05E2\u05D3\u05D9\u05E4\u05D5\u05EA']||''}</span></div>${t['\u05EA\u05D9\u05D0\u05D5\u05E8']?`<p class="card-text small text-muted mb-1">${t['\u05EA\u05D9\u05D0\u05D5\u05E8']}</p>`:''}<div class="small text-muted">${t['\u05D0\u05D7\u05E8\u05D0\u05D9']?'<i class="bi bi-person me-1"></i>'+t['\u05D0\u05D7\u05E8\u05D0\u05D9']:''}${due?' <i class="bi bi-calendar ms-1 me-1"></i>'+due:''}</div><div class="mt-1 btn-group btn-group-sm">${t['\u05E1\u05D8\u05D8\u05D5\u05E1']!=='\u05D1\u05EA\u05D4\u05DC\u05D9\u05DA'?`<button class="btn btn-outline-primary" onclick="Pages.moveTask('${t.id||t['\u05DE\u05D6\u05D4\u05D4']}','\u05D1\u05EA\u05D4\u05DC\u05D9\u05DA')"><i class="bi bi-play"></i></button>`:''}${t['\u05E1\u05D8\u05D8\u05D5\u05E1']!=='\u05D4\u05D5\u05E9\u05DC\u05DD'?`<button class="btn btn-outline-success" onclick="Pages.moveTask('${t.id||t['\u05DE\u05D6\u05D4\u05D4']}','\u05D4\u05D5\u05E9\u05DC\u05DD')"><i class="bi bi-check"></i></button>`:''}<button class="btn btn-outline-danger" onclick="Pages.deleteTask('${t.id||t['\u05DE\u05D6\u05D4\u05D4']}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button></div></div></div>`; }).join('');
    document.getElementById('task-new').innerHTML = renderCol(cols['\u05D7\u05D3\u05E9']);
    document.getElementById('task-prog').innerHTML = renderCol(cols['\u05D1\u05EA\u05D4\u05DC\u05D9\u05DA']);
    document.getElementById('task-done').innerHTML = renderCol(cols['\u05D4\u05D5\u05E9\u05DC\u05DD']);
    document.getElementById('task-new-c').textContent = cols['\u05D7\u05D3\u05E9'].length||'';
    document.getElementById('task-prog-c').textContent = cols['\u05D1\u05EA\u05D4\u05DC\u05D9\u05DA'].length||'';
    document.getElementById('task-done-c').textContent = cols['\u05D4\u05D5\u05E9\u05DC\u05DD'].length||'';
  },
  async quickAddTask() { const inp=document.getElementById('quick-task'); const title=(inp?inp.value:'').trim(); if (!title) return; try { await App.apiCall('add','\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA',{row:{'\u05DB\u05D5\u05EA\u05E8\u05EA':title,'\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05D7\u05D3\u05E9','\u05E2\u05D3\u05D9\u05E4\u05D5\u05EA':'\u05E8\u05D2\u05D9\u05DC','\u05EA\u05D0\u05E8\u05D9\u05DA':Utils.todayISO()}}); if (inp) inp.value=''; Utils.toast('\u05DE\u05E9\u05D9\u05DE\u05D4 \u05E0\u05D5\u05E1\u05E4\u05D4'); this.tasksInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); } },
  async moveTask(id, status) { try { await App.apiCall('update','\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA',{id,row:{'\u05E1\u05D8\u05D8\u05D5\u05E1':status}}); Utils.toast('\u05E2\u05D5\u05D3\u05DB\u05DF'); this.tasksInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); } },
  async deleteTask(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4','\u05DC\u05DE\u05D7\u05D5\u05E7 \u05DE\u05E9\u05D9\u05DE\u05D4 \u05D6\u05D5?')) return;
    try { await App.apiCall('delete','\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.tasksInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },


  /* ======================================================================
     CALENDAR
     ====================================================================== */
  calendar() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div class="d-flex gap-2 align-items-center"><button class="btn btn-sm btn-outline-secondary" onclick="Pages.changeMonth(-1)"><i class="bi bi-chevron-right"></i></button><h5 class="mb-0 fw-bold" id="cal-title">--</h5><button class="btn btn-sm btn-outline-secondary" onclick="Pages.changeMonth(1)"><i class="bi bi-chevron-left"></i></button><button class="btn btn-sm btn-outline-primary" onclick="Pages.goToday()">\u05D4\u05D9\u05D5\u05DD</button></div><button class="btn btn-primary btn-sm" onclick="Pages.showAddEvent()"><i class="bi bi-plus-lg me-1"></i>\u05D0\u05D9\u05E8\u05D5\u05E2 \u05D7\u05D3\u05E9</button></div><div class="d-flex gap-2 mb-2 small"><span class="badge bg-primary">\u05D0\u05D9\u05E8\u05D5\u05E2</span><span class="badge bg-danger">\u05D7\u05D2</span><span class="badge bg-success">\u05D7\u05D5\u05E4\u05E9\u05D4</span><span class="badge bg-warning">\u05DE\u05D1\u05D7\u05DF</span></div><div class="card p-0 overflow-hidden"><div class="row g-0 text-center bg-light border-bottom" style="font-weight:600;font-size:13px"><div class="col py-2">\u05E8\u05D0\u05E9\u05D5\u05DF</div><div class="col py-2">\u05E9\u05E0\u05D9</div><div class="col py-2">\u05E9\u05DC\u05D9\u05E9\u05D9</div><div class="col py-2">\u05E8\u05D1\u05D9\u05E2\u05D9</div><div class="col py-2">\u05D7\u05DE\u05D9\u05E9\u05D9</div><div class="col py-2">\u05E9\u05D9\u05E9\u05D9</div><div class="col py-2">\u05E9\u05D1\u05EA</div></div><div id="cal-grid"></div></div><div id="cal-events" class="mt-3"></div><div class="modal fade" id="cal-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">\u05D0\u05D9\u05E8\u05D5\u05E2 \u05D7\u05D3\u05E9</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row g-3"><div class="col-12"><label class="form-label">\u05DB\u05D5\u05EA\u05E8\u05EA</label><input class="form-control" id="cf-title"></div><div class="col-6"><label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA</label><input type="date" class="form-control" id="cf-date"></div><div class="col-6"><label class="form-label">\u05E1\u05D5\u05D2</label><select class="form-select" id="cf-type"><option>\u05D0\u05D9\u05E8\u05D5\u05E2</option><option>\u05D7\u05D2</option><option>\u05D7\u05D5\u05E4\u05E9\u05D4</option><option>\u05DE\u05D1\u05D7\u05DF</option></select></div><div class="col-12"><label class="form-label">\u05D4\u05E2\u05E8\u05D5\u05EA</label><textarea class="form-control" id="cf-notes" rows="2"></textarea></div></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveCalEvent()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
  },
  _calYear: 0, _calMonth: 0, _calEvents: [],
  async calendarInit() { const d=new Date(); this._calYear=d.getFullYear(); this._calMonth=d.getMonth(); this.loadCalendar(); },
  changeMonth(dir) { this._calMonth+=dir; if (this._calMonth>11){this._calMonth=0;this._calYear++;} if(this._calMonth<0){this._calMonth=11;this._calYear--;} this.loadCalendar(); },
  goToday() { const d=new Date(); this._calYear=d.getFullYear(); this._calMonth=d.getMonth(); this.loadCalendar(); },
  async loadCalendar() {
    const months = ['\u05D9\u05E0\u05D5\u05D0\u05E8','\u05E4\u05D1\u05E8\u05D5\u05D0\u05E8','\u05DE\u05E8\u05E5','\u05D0\u05E4\u05E8\u05D9\u05DC','\u05DE\u05D0\u05D9','\u05D9\u05D5\u05E0\u05D9','\u05D9\u05D5\u05DC\u05D9','\u05D0\u05D5\u05D2\u05D5\u05E1\u05D8','\u05E1\u05E4\u05D8\u05DE\u05D1\u05E8','\u05D0\u05D5\u05E7\u05D8\u05D5\u05D1\u05E8','\u05E0\u05D5\u05D1\u05DE\u05D1\u05E8','\u05D3\u05E6\u05DE\u05D1\u05E8'];
    document.getElementById('cal-title').textContent = months[this._calMonth]+' '+this._calYear;
    this._calEvents = await App.getData('\u05DC\u05D5\u05D7_\u05E9\u05E0\u05D4');
    const monthStr = this._calYear+'-'+String(this._calMonth+1).padStart(2,'0');
    const mEvents = this._calEvents.filter(e => (e['\u05EA\u05D0\u05E8\u05D9\u05DA']||'').startsWith(monthStr));
    const evMap = {}; mEvents.forEach(e => { const d=String(e['\u05EA\u05D0\u05E8\u05D9\u05DA']||'').substring(0,10); if (!evMap[d]) evMap[d]=[]; evMap[d].push(e); });
    const first = new Date(this._calYear, this._calMonth, 1); const startDay=first.getDay(); const daysInMonth=new Date(this._calYear,this._calMonth+1,0).getDate(); const today=Utils.todayISO();
    let html='',dayNum=1;
    for (let week=0;week<6;week++) { if (dayNum>daysInMonth&&week>0) break; html+='<div class="row g-0">'; for (let dow=0;dow<7;dow++) { if ((week===0&&dow<startDay)||dayNum>daysInMonth) { html+='<div class="col border-bottom border-end p-2" style="min-height:80px"></div>'; } else { const ds=this._calYear+'-'+String(this._calMonth+1).padStart(2,'0')+'-'+String(dayNum).padStart(2,'0'); const isT=ds===today; const evts=evMap[ds]||[]; html+=`<div class="col border-bottom border-end p-2${isT?' bg-primary bg-opacity-10':''}" style="min-height:80px;cursor:pointer" onclick="Pages.showAddEvent('${ds}')"><div class="${isT?'badge bg-primary rounded-circle':'fw-bold small'}">${dayNum}</div>`; evts.forEach(e => { const cs={'חג':'danger','חופשה':'success','מבחן':'warning'}; const c=cs[e['\u05E1\u05D5\u05D2']]||'primary'; html+=`<div class="badge bg-${c} text-wrap mb-1 d-inline-flex align-items-center gap-1" style="font-size:10px" onclick="event.stopPropagation()">${e['\u05DB\u05D5\u05EA\u05E8\u05EA']||''}<span style="cursor:pointer" onclick="Pages.deleteCalEvent('${e.id||e['\u05DE\u05D6\u05D4\u05D4']}')">&times;</span></div> `; }); html+='</div>'; dayNum++; } } html+='</div>'; }
    document.getElementById('cal-grid').innerHTML = html;
  },
  showAddEvent(date) { document.getElementById('cf-date').value = date || Utils.todayISO(); new bootstrap.Modal(document.getElementById('cal-modal')).show(); },
  async saveCalEvent() { const row = {'\u05DB\u05D5\u05EA\u05E8\u05EA':document.getElementById('cf-title').value.trim(),'\u05EA\u05D0\u05E8\u05D9\u05DA':document.getElementById('cf-date').value,'\u05E1\u05D5\u05D2':document.getElementById('cf-type').value,'\u05D4\u05E2\u05E8\u05D5\u05EA':document.getElementById('cf-notes').value.trim()}; if (!row['\u05DB\u05D5\u05EA\u05E8\u05EA']) { Utils.toast('\u05D7\u05E1\u05E8\u05D4 \u05DB\u05D5\u05EA\u05E8\u05EA','warning'); return; } try { await App.apiCall('add','\u05DC\u05D5\u05D7_\u05E9\u05E0\u05D4',{row}); bootstrap.Modal.getInstance(document.getElementById('cal-modal')).hide(); Utils.toast('\u05D0\u05D9\u05E8\u05D5\u05E2 \u05E0\u05D5\u05E1\u05E3'); this.loadCalendar(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); } },
  async deleteCalEvent(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4','\u05DC\u05DE\u05D7\u05D5\u05E7 \u05D0\u05D9\u05E8\u05D5\u05E2 \u05D6\u05D4?')) return;
    try { await App.apiCall('delete','\u05DC\u05D5\u05D7_\u05E9\u05E0\u05D4',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.loadCalendar(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },


  /* ======================================================================
     DOCUMENTS — Full Document Management System
     ====================================================================== */
  documents() {
    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div><h1><i class="bi bi-folder-fill me-2"></i>\u05DE\u05E1\u05DE\u05DB\u05D9\u05DD</h1><p>\u05E0\u05D9\u05D4\u05D5\u05DC \u05DE\u05E1\u05DE\u05DB\u05D9\u05DD, \u05E6\u05E4\u05D9\u05D9\u05D4 \u05D5\u05D4\u05E2\u05DC\u05D0\u05D4</p></div>
      <div class="d-flex gap-2">
        <button class="btn btn-primary btn-sm" onclick="Pages.showUploadDoc()"><i class="bi bi-cloud-upload me-1"></i>\u05D4\u05E2\u05DC\u05D0\u05D4</button>
        <button class="btn btn-outline-warning btn-sm" onclick="Pages.showMissingDocs()"><i class="bi bi-exclamation-triangle me-1"></i>\u05D7\u05E1\u05E8\u05D9\u05DD</button>
      </div>
    </div>
    <ul class="nav nav-tabs-bht mb-3">
      <li class="nav-item"><a class="nav-link active" href="#" onclick="Pages._docTab='students';Pages._renderDocs();return false"><i class="bi bi-people me-1"></i>\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</a></li>
      <li class="nav-item"><a class="nav-link" href="#" onclick="Pages._docTab='staff';Pages._renderDocs();return false"><i class="bi bi-person-badge me-1"></i>\u05E6\u05D5\u05D5\u05EA</a></li>
      <li class="nav-item"><a class="nav-link" href="#" onclick="Pages._docTab='all';Pages._renderDocs();return false"><i class="bi bi-files me-1"></i>\u05DB\u05DC \u05D4\u05E7\u05D1\u05E6\u05D9\u05DD</a></li>
    </ul>
    <div class="card p-3 mb-3">
      <div class="row g-2">
        <div class="col-md-6"><div class="search-box"><i class="bi bi-search"></i><input class="form-control" id="doc-search" placeholder="\u05D7\u05E4\u05E9 \u05DE\u05E1\u05DE\u05DA..." oninput="Pages._renderDocs()"></div></div>
        <div class="col-md-3"><select class="form-select" id="doc-type-filter" onchange="Pages._renderDocs()"><option value="">\u05DB\u05DC \u05D4\u05E1\u05D5\u05D2\u05D9\u05DD</option><option>\u05EA\u05E2\u05D5\u05D3\u05EA \u05D6\u05D4\u05D5\u05EA</option><option>\u05D0\u05D9\u05E9\u05D5\u05E8 \u05E8\u05E4\u05D5\u05D0\u05D9</option><option>\u05D8\u05D5\u05E4\u05E1 \u05D4\u05E8\u05E9\u05DE\u05D4</option><option>\u05D0\u05D9\u05E9\u05D5\u05E8 \u05E6\u05D9\u05DC\u05D5\u05DD</option><option>\u05EA\u05E2\u05D5\u05D3\u05EA \u05D4\u05D5\u05E8\u05D0\u05D4</option><option>\u05D0\u05D9\u05E9\u05D5\u05E8 \u05DE\u05E9\u05D8\u05E8\u05D4</option><option>\u05D0\u05D7\u05E8</option></select></div>
        <div class="col-md-3"><select class="form-select" id="doc-status-filter" onchange="Pages._renderDocs()"><option value="">\u05DB\u05DC \u05D4\u05E1\u05D8\u05D8\u05D5\u05E1\u05D9\u05DD</option><option value="\u05D4\u05EA\u05E7\u05D1\u05DC">\u05D4\u05EA\u05E7\u05D1\u05DC</option><option value="\u05D7\u05E1\u05E8">\u05D7\u05E1\u05E8</option><option value="\u05DE\u05DE\u05EA\u05D9\u05DF">\u05DE\u05DE\u05EA\u05D9\u05DF</option></select></div>
      </div>
    </div>
    <div class="row g-3 mb-3">
      <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-primary" id="doc-total">0</div><small>\u05E1\u05D4"\u05DB \u05DE\u05E1\u05DE\u05DB\u05D9\u05DD</small></div></div>
      <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-success" id="doc-received">0</div><small>\u05D4\u05EA\u05E7\u05D1\u05DC\u05D5</small></div></div>
      <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-danger" id="doc-missing">0</div><small>\u05D7\u05E1\u05E8\u05D9\u05DD</small></div></div>
      <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-warning" id="doc-pending">0</div><small>\u05DE\u05DE\u05EA\u05D9\u05E0\u05D9\u05DD</small></div></div>
    </div>
    <div id="doc-list">${Utils.skeleton(4)}</div>
    <!-- Upload Modal -->
    <div class="modal fade" id="upload-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5>\u05D4\u05E2\u05DC\u05D0\u05EA \u05DE\u05E1\u05DE\u05DA</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body">
      <div class="mb-3"><label class="form-label">\u05E9\u05D9\u05D9\u05DA \u05DC</label><select class="form-select" id="upload-owner"></select></div>
      <div class="mb-3"><label class="form-label">\u05E1\u05D5\u05D2 \u05DE\u05E1\u05DE\u05DA</label><select class="form-select" id="upload-type"><option>\u05EA\u05E2\u05D5\u05D3\u05EA \u05D6\u05D4\u05D5\u05EA</option><option>\u05D0\u05D9\u05E9\u05D5\u05E8 \u05E8\u05E4\u05D5\u05D0\u05D9</option><option>\u05D8\u05D5\u05E4\u05E1 \u05D4\u05E8\u05E9\u05DE\u05D4</option><option>\u05D0\u05D9\u05E9\u05D5\u05E8 \u05E6\u05D9\u05DC\u05D5\u05DD</option><option>\u05EA\u05E2\u05D5\u05D3\u05EA \u05D4\u05D5\u05E8\u05D0\u05D4</option><option>\u05D0\u05D9\u05E9\u05D5\u05E8 \u05DE\u05E9\u05D8\u05E8\u05D4</option><option>\u05D0\u05D7\u05E8</option></select></div>
      <div class="mb-3"><label class="form-label">\u05E7\u05D5\u05D1\u05E5</label><input type="file" class="form-control" id="upload-file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"></div>
      <div class="mb-3"><label class="form-label">\u05D4\u05E2\u05E8\u05D5\u05EA</label><input class="form-control" id="upload-notes"></div>
    </div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.uploadDoc()"><i class="bi bi-cloud-upload me-1"></i>\u05D4\u05E2\u05DC\u05D4</button></div></div></div></div>
    <!-- Viewer Modal -->
    <div class="modal fade" id="doc-viewer-modal" tabindex="-1"><div class="modal-dialog modal-xl"><div class="modal-content"><div class="modal-header"><h5 id="viewer-title">\u05E6\u05E4\u05D9\u05D9\u05D4 \u05D1\u05DE\u05E1\u05DE\u05DA</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body p-0" id="viewer-body" style="min-height:500px"></div></div></div></div>
  `;
  },

  _docTab: 'students', _docsData: [], _studentsForDocs: [], _staffForDocs: [],
  _requiredStudentDocs: ['\u05EA\u05E2\u05D5\u05D3\u05EA \u05D6\u05D4\u05D5\u05EA','\u05D0\u05D9\u05E9\u05D5\u05E8 \u05E8\u05E4\u05D5\u05D0\u05D9','\u05D8\u05D5\u05E4\u05E1 \u05D4\u05E8\u05E9\u05DE\u05D4','\u05D0\u05D9\u05E9\u05D5\u05E8 \u05E6\u05D9\u05DC\u05D5\u05DD','\u05D0\u05D9\u05E9\u05D5\u05E8 \u05D4\u05D5\u05E8\u05D9\u05DD \u05DC\u05D8\u05D9\u05D5\u05DC'],
  _requiredStaffDocs: ['\u05EA\u05E2\u05D5\u05D3\u05EA \u05D6\u05D4\u05D5\u05EA','\u05EA\u05E2\u05D5\u05D3\u05EA \u05D4\u05D5\u05E8\u05D0\u05D4','\u05D0\u05D9\u05E9\u05D5\u05E8 \u05DE\u05E9\u05D8\u05E8\u05D4','\u05D0\u05D9\u05E9\u05D5\u05E8 \u05E8\u05E4\u05D5\u05D0\u05D9'],

  async documentsInit() {
    const [docs, students, staff] = await Promise.all([
      App.getData('\u05DE\u05E1\u05DE\u05DB\u05D9_\u05EA\u05DC\u05DE\u05D9\u05D3').catch(()=>[]),
      App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD').catch(()=>[]),
      App.getData('\u05E6\u05D5\u05D5\u05EA').catch(()=>[])
    ]);
    this._docsData = docs;
    this._studentsForDocs = students.filter(s => (s['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') !== '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC');
    this._staffForDocs = staff.filter(s => (s['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') !== '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC');
    this._renderDocs();
  },

  _renderDocs() {
    const search = (document.getElementById('doc-search')?.value||'').toLowerCase();
    const typeF = document.getElementById('doc-type-filter')?.value||'';
    const statusF = document.getElementById('doc-status-filter')?.value||'';

    // Update tab active state
    document.querySelectorAll('.nav-tabs-bht .nav-link').forEach((a,i) => {
      a.classList.toggle('active', ['students','staff','all'][i] === this._docTab);
    });

    let items = [];
    if (this._docTab === 'students' || this._docTab === 'all') {
      this._studentsForDocs.forEach(s => {
        const name = Utils.fullName(s);
        const sid = Utils.rowId(s);
        this._requiredStudentDocs.forEach(docType => {
          const doc = this._docsData.find(d => (d['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3']||d['\u05E9\u05DD']||'')===name && (d['\u05E1\u05D5\u05D2_\u05DE\u05E1\u05DE\u05DA']||d['\u05E1\u05D5\u05D2']||'')===docType);
          items.push({ name, id: sid, type: docType, status: doc ? (doc['\u05E1\u05D8\u05D8\u05D5\u05E1']||'\u05D4\u05EA\u05E7\u05D1\u05DC') : '\u05D7\u05E1\u05E8', date: doc?.['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05E7\u05D1\u05DC\u05D4']||'', url: doc?.['\u05E7\u05D9\u05E9\u05D5\u05E8']||doc?.['url']||'', entity: 'student', notes: doc?.['\u05D4\u05E2\u05E8\u05D5\u05EA']||'' });
        });
      });
    }
    if (this._docTab === 'staff' || this._docTab === 'all') {
      this._staffForDocs.forEach(s => {
        const name = Utils.fullName(s);
        const sid = Utils.rowId(s);
        this._requiredStaffDocs.forEach(docType => {
          const doc = this._docsData.find(d => (d['\u05E9\u05DD_\u05E2\u05D5\u05D1\u05D3']||d['\u05E9\u05DD']||'')===name && (d['\u05E1\u05D5\u05D2_\u05DE\u05E1\u05DE\u05DA']||d['\u05E1\u05D5\u05D2']||'')===docType);
          items.push({ name, id: sid, type: docType, status: doc ? (doc['\u05E1\u05D8\u05D8\u05D5\u05E1']||'\u05D4\u05EA\u05E7\u05D1\u05DC') : '\u05D7\u05E1\u05E8', date: doc?.['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05E7\u05D1\u05DC\u05D4']||'', url: doc?.['\u05E7\u05D9\u05E9\u05D5\u05E8']||doc?.['url']||'', entity: 'staff', notes: doc?.['\u05D4\u05E2\u05E8\u05D5\u05EA']||'' });
        });
      });
    }

    // Filter
    if (search) items = items.filter(i => i.name.toLowerCase().includes(search) || i.type.toLowerCase().includes(search));
    if (typeF) items = items.filter(i => i.type === typeF);
    if (statusF) items = items.filter(i => i.status === statusF);

    // Stats
    const received = items.filter(i => i.status === '\u05D4\u05EA\u05E7\u05D1\u05DC').length;
    const missing = items.filter(i => i.status === '\u05D7\u05E1\u05E8').length;
    const pending = items.filter(i => i.status === '\u05DE\u05DE\u05EA\u05D9\u05DF').length;
    document.getElementById('doc-total').textContent = items.length;
    document.getElementById('doc-received').textContent = received;
    document.getElementById('doc-missing').textContent = missing;
    document.getElementById('doc-pending').textContent = pending;

    if (!items.length) { document.getElementById('doc-list').innerHTML = '<div class="empty-state"><i class="bi bi-folder"></i><h5>\u05D0\u05D9\u05DF \u05DE\u05E1\u05DE\u05DB\u05D9\u05DD</h5></div>'; return; }

    // Group by person
    const grouped = {};
    items.forEach(i => { if (!grouped[i.name]) grouped[i.name]=[]; grouped[i.name].push(i); });

    const statusIcon = {
      '\u05D4\u05EA\u05E7\u05D1\u05DC': '<i class="bi bi-check-circle-fill text-success"></i>',
      '\u05D7\u05E1\u05E8': '<i class="bi bi-x-circle-fill text-danger"></i>',
      '\u05DE\u05DE\u05EA\u05D9\u05DF': '<i class="bi bi-clock-fill text-warning"></i>'
    };
    const statusBadge = {
      '\u05D4\u05EA\u05E7\u05D1\u05DC': 'bg-success', '\u05D7\u05E1\u05E8': 'bg-danger', '\u05DE\u05DE\u05EA\u05D9\u05DF': 'bg-warning'
    };

    document.getElementById('doc-list').innerHTML = Object.keys(grouped).map(name => {
      const docs = grouped[name];
      const completePct = Math.round(docs.filter(d => d.status === '\u05D4\u05EA\u05E7\u05D1\u05DC').length / docs.length * 100);
      return `<div class="card mb-3 p-3">
        <div class="d-flex align-items-center gap-3 mb-2">
          ${Utils.avatarHTML(name)}
          <div class="flex-grow-1">
            <div class="fw-bold">${name}</div>
            <div class="progress mt-1" style="height:6px"><div class="progress-bar bg-success" style="width:${completePct}%"></div></div>
          </div>
          <span class="badge bg-${completePct===100?'success':completePct>=50?'warning':'danger'}">${completePct}%</span>
        </div>
        <div class="table-responsive"><table class="table table-sm mb-0"><tbody>
          ${docs.map(d => `<tr>
            <td style="width:30px">${statusIcon[d.status]||''}</td>
            <td class="fw-medium">${d.type}</td>
            <td><span class="badge ${statusBadge[d.status]||'bg-secondary'}">${d.status}</span></td>
            <td class="small text-muted">${d.date ? Utils.formatDateShort(d.date) : '--'}</td>
            <td>
              ${d.url ? `<button class="btn btn-sm btn-outline-primary" onclick="Pages.viewDoc('${d.url}','${d.type} - ${name}')"><i class="bi bi-eye"></i></button>` : ''}
              ${d.status==='\u05D7\u05E1\u05E8' ? `<button class="btn btn-sm btn-outline-success" onclick="Pages.markDocReceived('${name.replace(/'/g,"\\'")}','${d.type}')"><i class="bi bi-check"></i></button>` : ''}
            </td>
          </tr>`).join('')}
        </tbody></table></div>
      </div>`;
    }).join('');
  },

  viewDoc(url, title) {
    document.getElementById('viewer-title').textContent = title || '\u05E6\u05E4\u05D9\u05D9\u05D4 \u05D1\u05DE\u05E1\u05DE\u05DA';
    const body = document.getElementById('viewer-body');
    const ext = (url.split('.').pop()||'').toLowerCase().split('?')[0];
    if (['jpg','jpeg','png','gif','webp'].includes(ext)) {
      body.innerHTML = `<img src="${url}" style="width:100%;max-height:80vh;object-fit:contain" alt="${title}">`;
    } else if (ext === 'pdf') {
      body.innerHTML = `<iframe src="${url}" style="width:100%;height:80vh;border:none"></iframe>`;
    } else {
      // Use Google Docs Viewer for office files
      body.innerHTML = `<iframe src="https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true" style="width:100%;height:80vh;border:none"></iframe>`;
    }
    new bootstrap.Modal(document.getElementById('doc-viewer-modal')).show();
  },

  async showUploadDoc() {
    const sel = document.getElementById('upload-owner');
    const students = this._studentsForDocs || [];
    const staff = this._staffForDocs || [];
    sel.innerHTML = '<option value="">\u05D1\u05D7\u05E8...</option>' +
      '<optgroup label="\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD">' + students.map(s => `<option value="student:${Utils.rowId(s)}">${Utils.fullName(s)}</option>`).join('') + '</optgroup>' +
      '<optgroup label="\u05E6\u05D5\u05D5\u05EA">' + staff.map(s => `<option value="staff:${Utils.rowId(s)}">${Utils.fullName(s)}</option>`).join('') + '</optgroup>';
    document.getElementById('upload-file').value = '';
    document.getElementById('upload-notes').value = '';
    new bootstrap.Modal(document.getElementById('upload-modal')).show();
  },

  async uploadDoc() {
    const owner = document.getElementById('upload-owner').value;
    const type = document.getElementById('upload-type').value;
    const file = document.getElementById('upload-file').files[0];
    const notes = document.getElementById('upload-notes').value.trim();
    if (!owner || !file) { Utils.toast('\u05D1\u05D7\u05E8 \u05D1\u05E2\u05DC\u05D9\u05DD \u05D5\u05E7\u05D5\u05D1\u05E5','\u05D0\u05D6\u05D4\u05E8\u05D4'); return; }

    const [entity, id] = owner.split(':');
    const ownerName = document.getElementById('upload-owner').selectedOptions[0]?.text || '';

    // Convert file to base64 for API
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result.split(',')[1];
      try {
        const row = {
          '\u05E9\u05DD': ownerName,
          '\u05E1\u05D5\u05D2_\u05DE\u05E1\u05DE\u05DA': type,
          '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05D4\u05EA\u05E7\u05D1\u05DC',
          '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05E7\u05D1\u05DC\u05D4': Utils.todayISO(),
          '\u05E9\u05DD_\u05E7\u05D5\u05D1\u05E5': file.name,
          '\u05D4\u05E2\u05E8\u05D5\u05EA': notes,
          '\u05E7\u05D5\u05D1\u05E5_base64': base64
        };
        if (entity === 'student') row['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3'] = ownerName;
        else row['\u05E9\u05DD_\u05E2\u05D5\u05D1\u05D3'] = ownerName;

        await App.apiCall('add', '\u05DE\u05E1\u05DE\u05DB\u05D9_\u05EA\u05DC\u05DE\u05D9\u05D3', { row });
        bootstrap.Modal.getInstance(document.getElementById('upload-modal'))?.hide();
        Utils.toast('\u05DE\u05E1\u05DE\u05DA \u05D4\u05D5\u05E2\u05DC\u05D4 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4!');
        this.documentsInit();
      } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05D4\u05E2\u05DC\u05D0\u05D4','danger'); }
    };
    reader.readAsDataURL(file);
  },

  async markDocReceived(name, type) {
    try {
      const row = { '\u05E9\u05DD': name, '\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3': name, '\u05E1\u05D5\u05D2_\u05DE\u05E1\u05DE\u05DA': type, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05D4\u05EA\u05E7\u05D1\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05E7\u05D1\u05DC\u05D4': Utils.todayISO() };
      await App.apiCall('add', '\u05DE\u05E1\u05DE\u05DB\u05D9_\u05EA\u05DC\u05DE\u05D9\u05D3', { row });
      Utils.toast('\u05DE\u05E1\u05DE\u05DA \u05E1\u05D5\u05DE\u05DF \u05DB\u05D4\u05EA\u05E7\u05D1\u05DC');
      this.documentsInit();
    } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },

  showMissingDocs() {
    const missing = [];
    this._studentsForDocs.forEach(s => {
      const name = Utils.fullName(s);
      const docs = this._docsData.filter(d => (d['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3']||d['\u05E9\u05DD']||'') === name);
      const missingTypes = this._requiredStudentDocs.filter(t => !docs.find(d => (d['\u05E1\u05D5\u05D2_\u05DE\u05E1\u05DE\u05DA']||d['\u05E1\u05D5\u05D2']||'') === t));
      if (missingTypes.length) missing.push({ name, types: missingTypes });
    });
    this._staffForDocs.forEach(s => {
      const name = Utils.fullName(s);
      const docs = this._docsData.filter(d => (d['\u05E9\u05DD_\u05E2\u05D5\u05D1\u05D3']||d['\u05E9\u05DD']||'') === name);
      const missingTypes = this._requiredStaffDocs.filter(t => !docs.find(d => (d['\u05E1\u05D5\u05D2_\u05DE\u05E1\u05DE\u05DA']||d['\u05E1\u05D5\u05D2']||'') === t));
      if (missingTypes.length) missing.push({ name, types: missingTypes, isStaff: true });
    });

    const html = `<div class="modal fade" id="missing-docs-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header bg-danger text-white"><h5><i class="bi bi-exclamation-triangle me-2"></i>\u05DE\u05E1\u05DE\u05DB\u05D9\u05DD \u05D7\u05E1\u05E8\u05D9\u05DD (${missing.length} \u05D0\u05E0\u05E9\u05D9\u05DD)</h5><button class="btn-close btn-close-white" data-bs-dismiss="modal"></button></div><div class="modal-body">
      ${missing.length ? missing.map(m => `<div class="d-flex align-items-center gap-3 py-2 border-bottom">${Utils.avatarHTML(m.name,'sm')}<div class="flex-grow-1"><span class="fw-bold">${m.name}</span>${m.isStaff ? ' <span class="badge bg-info">\u05E6\u05D5\u05D5\u05EA</span>' : ''}</div><div>${m.types.map(t => `<span class="badge bg-danger me-1">${t}</span>`).join('')}</div></div>`).join('') : '<div class="text-success text-center py-3"><i class="bi bi-check-circle fs-1"></i><h5>\u05DB\u05DC \u05D4\u05DE\u05E1\u05DE\u05DB\u05D9\u05DD \u05D4\u05EA\u05E7\u05D1\u05DC\u05D5!</h5></div>'}
    </div></div></div></div>`;
    document.getElementById('missing-docs-modal')?.remove();
    document.body.insertAdjacentHTML('beforeend', html);
    new bootstrap.Modal(document.getElementById('missing-docs-modal')).show();
  },


  /* ======================================================================
     COMMITTEES
     ====================================================================== */
  committees() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-people me-2"></i>\u05D5\u05E2\u05D3\u05D5\u05EA</h1></div><button class="btn btn-primary btn-sm" onclick="Pages.showAddComm()"><i class="bi bi-plus-lg me-1"></i>\u05D5\u05E2\u05D3\u05D4 \u05D7\u05D3\u05E9\u05D4</button></div><div id="comm-list">${Utils.skeleton(3)}</div><div class="modal fade" id="committee-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">\u05D5\u05E2\u05D3\u05D4 \u05D7\u05D3\u05E9\u05D4</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row g-3"><div class="col-12"><label class="form-label">\u05E9\u05DD</label><input class="form-control" id="cmf-name"></div><div class="col-12"><label class="form-label">\u05D7\u05D1\u05E8\u05D9\u05DD</label><input class="form-control" id="cmf-members" placeholder="\u05E9\u05DE\u05D5\u05EA \u05DE\u05D5\u05E4\u05E8\u05D3\u05D9\u05DD \u05D1\u05E4\u05E1\u05D9\u05E7"></div><div class="col-12"><label class="form-label">\u05EA\u05D9\u05D0\u05D5\u05E8</label><textarea class="form-control" id="cmf-desc" rows="2"></textarea></div></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveCommittee()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
  },
  _commtData: [],
  async committeesInit() { this._commtData = await App.getData('\u05D5\u05E2\u05D3\u05D5\u05EA'); this.renderCommittees(); },
  renderCommittees() {
    if (!this._commtData.length) { document.getElementById('comm-list').innerHTML = '<div class="empty-state"><i class="bi bi-people"></i><h5>\u05D0\u05D9\u05DF \u05D5\u05E2\u05D3\u05D5\u05EA</h5></div>'; return; }
    document.getElementById('comm-list').innerHTML = `<div class="row g-3">${this._commtData.map(c => `<div class="col-md-6"><div class="card p-3"><h6 class="fw-bold"><i class="bi bi-people-fill me-2 text-primary"></i>${c['\u05E9\u05DD']||''}</h6><div class="small text-muted mb-2">${c['\u05EA\u05D9\u05D0\u05D5\u05E8']||''}</div><div class="small"><i class="bi bi-person me-1"></i><strong>\u05D7\u05D1\u05E8\u05D9\u05DD:</strong> ${c['\u05D7\u05D1\u05E8\u05D9\u05DD']||'--'}</div>${c['\u05E4\u05D2\u05D9\u05E9\u05D4_\u05D4\u05D1\u05D0\u05D4']?`<div class="small mt-1"><i class="bi bi-calendar me-1"></i>\u05E4\u05D2\u05D9\u05E9\u05D4 \u05D4\u05D1\u05D0\u05D4: ${c['\u05E4\u05D2\u05D9\u05E9\u05D4_\u05D4\u05D1\u05D0\u05D4']}</div>`:''}</div></div>`).join('')}</div>`;
  },
  showAddComm() { new bootstrap.Modal(document.getElementById('committee-modal')).show(); },
  async saveCommittee() { const row = {'\u05E9\u05DD':document.getElementById('cmf-name').value.trim(),'\u05D7\u05D1\u05E8\u05D9\u05DD':document.getElementById('cmf-members').value.trim(),'\u05EA\u05D9\u05D0\u05D5\u05E8':document.getElementById('cmf-desc').value.trim()}; if (!row['\u05E9\u05DD']) { Utils.toast('\u05D7\u05E1\u05E8 \u05E9\u05DD','warning'); return; } try { await App.apiCall('add','\u05D5\u05E2\u05D3\u05D5\u05EA',{row}); bootstrap.Modal.getInstance(document.getElementById('committee-modal')).hide(); Utils.toast('\u05D5\u05E2\u05D3\u05D4 \u05E0\u05D5\u05E1\u05E4\u05D4'); this.committeesInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); } },
  async deleteCommittee(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4','\u05DC\u05DE\u05D7\u05D5\u05E7 \u05D5\u05E2\u05D3\u05D4 \u05D6\u05D5?')) return;
    try { await App.apiCall('delete','\u05D5\u05E2\u05D3\u05D5\u05EA',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.committeesInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },


  /* ======================================================================
     TRIPS
     ====================================================================== */
  trips() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-geo-alt-fill me-2"></i>\u05D8\u05D9\u05D5\u05DC\u05D9\u05DD</h1></div><button class="btn btn-primary btn-sm" onclick="Pages.showAddTrip()"><i class="bi bi-plus-lg me-1"></i>\u05D8\u05D9\u05D5\u05DC \u05D7\u05D3\u05E9</button></div><div class="row g-3" id="trip-cards">${Utils.skeleton(3)}</div><div class="modal fade" id="trip-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">\u05D8\u05D9\u05D5\u05DC \u05D7\u05D3\u05E9</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row g-3"><div class="col-12"><label class="form-label">\u05D9\u05E2\u05D3</label><input class="form-control" id="tf-dest"></div><div class="col-6"><label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05EA\u05D7\u05DC\u05D4</label><input type="date" class="form-control" id="tf-start"></div><div class="col-6"><label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA \u05E1\u05D9\u05D5\u05DD</label><input type="date" class="form-control" id="tf-end"></div><div class="col-12"><label class="form-label">\u05EA\u05D9\u05D0\u05D5\u05E8</label><textarea class="form-control" id="tf-desc" rows="2"></textarea></div></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveTrip()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
  },
  _tripData: [],
  async tripsInit() { this._tripData = await App.getData('\u05D8\u05D9\u05D5\u05DC\u05D9\u05DD'); this.renderTrips(); },
  renderTrips() {
    if (!this._tripData.length) { document.getElementById('trip-cards').innerHTML = '<div class="col-12"><div class="empty-state"><i class="bi bi-geo-alt"></i><h5>\u05D0\u05D9\u05DF \u05D8\u05D9\u05D5\u05DC\u05D9\u05DD</h5></div></div>'; return; }
    const stC = {'\u05DE\u05EA\u05D5\u05DB\u05E0\u05DF':'primary','\u05D0\u05D5\u05E9\u05E8':'success','\u05D1\u05D5\u05E6\u05E2':'info','\u05D1\u05D5\u05D8\u05DC':'danger'};
    document.getElementById('trip-cards').innerHTML = this._tripData.map(t => { const tId=t.id||t['\u05DE\u05D6\u05D4\u05D4']||Utils.rowId(t); return `<div class="col-md-6"><div class="card p-3"><div class="d-flex justify-content-between"><h6 class="fw-bold"><i class="bi bi-geo-alt-fill text-primary me-1"></i>${t['\u05D9\u05E2\u05D3']||''}</h6><div class="d-flex align-items-center gap-2"><span class="badge bg-${stC[t['\u05E1\u05D8\u05D8\u05D5\u05E1']]||'secondary'}">${t['\u05E1\u05D8\u05D8\u05D5\u05E1']||''}</span><button class="btn btn-sm btn-outline-primary me-1" onclick="Pages.editTrip('${tId}')" title="\u05E2\u05E8\u05D9\u05DB\u05D4"><i class="bi bi-pencil"></i></button><button class="btn btn-sm btn-outline-danger" onclick="Pages.deleteTrip('${tId}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button></div></div><div class="small text-muted"><i class="bi bi-calendar me-1"></i>${t['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05EA\u05D7\u05DC\u05D4']||''} ${t['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05E1\u05D9\u05D5\u05DD']?' - '+t['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05E1\u05D9\u05D5\u05DD']:''}</div>${t['\u05EA\u05D9\u05D0\u05D5\u05E8']?`<p class="small mb-0 mt-1">${t['\u05EA\u05D9\u05D0\u05D5\u05E8']}</p>`:''}</div></div>`; }).join('');
  },
  showAddTrip() { this._tripEditId=null; document.getElementById('tf-dest').value=''; document.getElementById('tf-start').value=''; document.getElementById('tf-end').value=''; document.getElementById('tf-desc').value=''; new bootstrap.Modal(document.getElementById('trip-modal')).show(); },
  async saveTrip() { const row = {'\u05D9\u05E2\u05D3':document.getElementById('tf-dest').value.trim(),'\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05EA\u05D7\u05DC\u05D4':document.getElementById('tf-start').value,'\u05EA\u05D0\u05E8\u05D9\u05DA_\u05E1\u05D9\u05D5\u05DD':document.getElementById('tf-end').value,'\u05EA\u05D9\u05D0\u05D5\u05E8':document.getElementById('tf-desc').value.trim(),'\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05DE\u05EA\u05D5\u05DB\u05E0\u05DF'}; if (!row['\u05D9\u05E2\u05D3']) { Utils.toast('\u05D7\u05E1\u05E8 \u05D9\u05E2\u05D3','warning'); return; } try { if (this._tripEditId) { await App.apiCall('update','\u05D8\u05D9\u05D5\u05DC\u05D9\u05DD',{id:this._tripEditId,row}); this._tripEditId=null; } else { await App.apiCall('add','\u05D8\u05D9\u05D5\u05DC\u05D9\u05DD',{row}); } bootstrap.Modal.getInstance(document.getElementById('trip-modal')).hide(); Utils.toast('\u05E0\u05E9\u05DE\u05E8'); this.tripsInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); } },
  async deleteTrip(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4','\u05DC\u05DE\u05D7\u05D5\u05E7 \u05D8\u05D9\u05D5\u05DC \u05D6\u05D4?')) return;
    try { await App.apiCall('delete','\u05D8\u05D9\u05D5\u05DC\u05D9\u05DD',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.tripsInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },
  editTrip(id) {
    var item = this._tripData.find(function(r){ return (r.id||r['\u05DE\u05D6\u05D4\u05D4']||'') == id; });
    if (!item) return;
    document.getElementById('tf-dest').value = item['\u05D9\u05E2\u05D3'] || '';
    document.getElementById('tf-start').value = item['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05EA\u05D7\u05DC\u05D4'] || '';
    document.getElementById('tf-end').value = item['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05E1\u05D9\u05D5\u05DD'] || '';
    document.getElementById('tf-desc').value = item['\u05EA\u05D9\u05D0\u05D5\u05E8'] || '';
    this._tripEditId = id;
    new bootstrap.Modal(document.getElementById('trip-modal')).show();
  },


  /* ======================================================================
     INSTITUTIONS
     ====================================================================== */
  institutions() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div><h1><i class="bi bi-building me-2"></i>\u05DE\u05E1\u05D2\u05E8\u05D5\u05EA</h1><p id="inst-count"></p></div>
      <button class="btn btn-primary btn-sm" onclick="Pages.showAddInst()"><i class="bi bi-plus-lg me-1"></i>\u05DE\u05E1\u05D2\u05E8\u05EA \u05D7\u05D3\u05E9\u05D4</button>
    </div>
    <div id="inst-list">${Utils.skeleton(3)}</div>
    <div class="modal fade" id="inst-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title">\u05DE\u05E1\u05D2\u05E8\u05EA \u05D7\u05D3\u05E9\u05D4</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body"><div class="row g-3">
        <div class="col-12"><label class="form-label">\u05E9\u05DD</label><input class="form-control" id="instf-name"></div>
        <div class="col-6"><label class="form-label">\u05E7\u05D5\u05D3</label><input class="form-control" id="instf-code"></div>
        <div class="col-6"><label class="form-label">\u05E6\u05D1\u05E2</label><input type="color" class="form-control form-control-color" id="instf-color" value="#2563eb"></div>
        <div class="col-12"><label class="form-label">\u05EA\u05D9\u05D0\u05D5\u05E8</label><textarea class="form-control" id="instf-desc" rows="2"></textarea></div>
        <div class="col-12"><label class="form-label">\u05E1\u05D8\u05D8\u05D5\u05E1</label><select class="form-select" id="instf-status"><option value="\u05E4\u05E2\u05D9\u05DC">\u05E4\u05E2\u05D9\u05DC</option><option value="\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC">\u05DC\u05D0 \u05E4\u05E2\u05D9\u05DC</option></select></div>
      </div></div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveInst()">\u05E9\u05DE\u05D5\u05E8</button></div>
    </div></div></div>`;
  },
  _instData: [],
  _instEditId: null,
  async institutionsInit() {
    this._instData = await App.getData('\u05DE\u05E1\u05D2\u05E8\u05D5\u05EA');
    this.renderInst();
  },
  renderInst() {
    const data = this._instData;
    document.getElementById('inst-count').textContent = `${data.length} \u05DE\u05E1\u05D2\u05E8\u05D5\u05EA`;
    if (!data.length) { document.getElementById('inst-list').innerHTML = '<div class="empty-state"><i class="bi bi-building"></i><h5>\u05D0\u05D9\u05DF \u05DE\u05E1\u05D2\u05E8\u05D5\u05EA</h5></div>'; return; }
    document.getElementById('inst-list').innerHTML = `<div class="row g-3">${data.map(i => {
      const iid = Utils.rowId(i);
      return `<div class="col-md-6 col-lg-4"><div class="card p-3"><div class="d-flex align-items-center gap-3"><div class="avatar" style="background:${i['\u05E6\u05D1\u05E2']||'#2563eb'}">${(i['\u05E9\u05DD']||'')[0]||'?'}</div><div class="flex-grow-1"><h6 class="fw-bold mb-0">${i['\u05E9\u05DD']||''}</h6><small class="text-muted">${i['\u05E7\u05D5\u05D3']||''}</small></div>${Utils.statusBadge(i['\u05E1\u05D8\u05D8\u05D5\u05E1'])}</div>${i['\u05EA\u05D9\u05D0\u05D5\u05E8']?`<p class="small mt-2 mb-1">${i['\u05EA\u05D9\u05D0\u05D5\u05E8']}</p>`:''}<div class="d-flex gap-1 mt-2"><button class="btn btn-sm btn-outline-primary" onclick="Pages.editInst('${iid}')"><i class="bi bi-pencil me-1"></i>\u05E2\u05E8\u05D9\u05DB\u05D4</button><button class="btn btn-sm btn-outline-danger" onclick="Pages.deleteInst('${iid}')"><i class="bi bi-trash me-1"></i>\u05DE\u05D7\u05D9\u05E7\u05D4</button></div></div></div>`;
    }).join('')}</div>`;
  },
  showAddInst() {
    this._instEditId = null;
    document.getElementById('instf-name').value = '';
    document.getElementById('instf-code').value = '';
    document.getElementById('instf-color').value = '#2563eb';
    document.getElementById('instf-desc').value = '';
    document.getElementById('instf-status').value = '\u05E4\u05E2\u05D9\u05DC';
    document.querySelector('#inst-modal .modal-title').textContent = '\u05DE\u05E1\u05D2\u05E8\u05EA \u05D7\u05D3\u05E9\u05D4';
    new bootstrap.Modal(document.getElementById('inst-modal')).show();
  },
  editInst(id) {
    const i = this._instData.find(x => String(Utils.rowId(x)) === String(id));
    if (!i) return;
    this._instEditId = id;
    document.getElementById('instf-name').value = i['\u05E9\u05DD'] || '';
    document.getElementById('instf-code').value = i['\u05E7\u05D5\u05D3'] || '';
    document.getElementById('instf-color').value = i['\u05E6\u05D1\u05E2'] || '#2563eb';
    document.getElementById('instf-desc').value = i['\u05EA\u05D9\u05D0\u05D5\u05E8'] || '';
    document.getElementById('instf-status').value = i['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '\u05E4\u05E2\u05D9\u05DC';
    document.querySelector('#inst-modal .modal-title').textContent = '\u05E2\u05E8\u05D9\u05DB\u05EA \u05DE\u05E1\u05D2\u05E8\u05EA';
    new bootstrap.Modal(document.getElementById('inst-modal')).show();
  },
  async saveInst() {
    const row = {
      '\u05E9\u05DD': document.getElementById('instf-name').value.trim(),
      '\u05E7\u05D5\u05D3': document.getElementById('instf-code').value.trim(),
      '\u05E6\u05D1\u05E2': document.getElementById('instf-color').value,
      '\u05EA\u05D9\u05D0\u05D5\u05E8': document.getElementById('instf-desc').value.trim(),
      '\u05E1\u05D8\u05D8\u05D5\u05E1': document.getElementById('instf-status').value
    };
    if (!row['\u05E9\u05DD']) { Utils.toast('\u05D7\u05E1\u05E8 \u05E9\u05DD', 'warning'); return; }
    try {
      if (this._instEditId) { await App.apiCall('update', '\u05DE\u05E1\u05D2\u05E8\u05D5\u05EA', { id: this._instEditId, row }); }
      else { await App.apiCall('add', '\u05DE\u05E1\u05D2\u05E8\u05D5\u05EA', { row }); }
      bootstrap.Modal.getInstance(document.getElementById('inst-modal')).hide();
      Utils.toast(this._instEditId ? '\u05E2\u05D5\u05D3\u05DB\u05DF' : '\u05DE\u05E1\u05D2\u05E8\u05EA \u05E0\u05D5\u05E1\u05E4\u05D4');
      this._instEditId = null;
      this.institutionsInit();
    } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4', 'danger'); }
  },
  async deleteInst(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4', '\u05DC\u05DE\u05D7\u05D5\u05E7 \u05DE\u05E1\u05D2\u05E8\u05EA \u05D6\u05D5?')) return;
    try { await App.apiCall('delete', '\u05DE\u05E1\u05D2\u05E8\u05D5\u05EA', { id }); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.institutionsInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4', 'danger'); }
  },


  /* ======================================================================
     MEDICAL
     ====================================================================== */
  medical() {
    return `<div class="page-header"><h1><i class="bi bi-heart-pulse me-2"></i>\u05DE\u05D9\u05D3\u05E2 \u05E8\u05E4\u05D5\u05D0\u05D9</h1></div><div class="card p-3 mb-3"><div class="search-box"><i class="bi bi-search"></i><input type="text" class="form-control" id="med-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05EA\u05DC\u05DE\u05D9\u05D3..."></div></div><div id="med-list">${Utils.skeleton(3)}</div><div class="modal fade" id="med-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">\u05E2\u05E8\u05D9\u05DB\u05EA \u05DE\u05D9\u05D3\u05E2 \u05E8\u05E4\u05D5\u05D0\u05D9</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><input type="hidden" id="medf-sid"><div class="mb-3"><label class="form-label">\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA</label><input class="form-control" id="medf-allergies"></div><div class="mb-3"><label class="form-label">\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA</label><input class="form-control" id="medf-meds"></div><div class="mb-3"><label class="form-label">\u05D4\u05E2\u05E8\u05D5\u05EA</label><textarea class="form-control" id="medf-notes" rows="3"></textarea></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveMedical()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
  },
  _medData: [],
  async medicalInit() {
    const students = await App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
    const medical = await App.getData('\u05DE\u05D9\u05D3\u05E2_\u05E8\u05E4\u05D5\u05D0\u05D9');
    this._medData = students.filter(s=>(s['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')!=='\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC').map(s => {
      const name = Utils.fullName(s); const sid = Utils.rowId(s);
      const med = medical.find(m => String(m['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4']||'') === String(sid));
      return { name, id: sid, cls: s['\u05DB\u05D9\u05EA\u05D4']||'', med };
    });
    document.getElementById('med-search').addEventListener('input', Utils.debounce(() => this.renderMedical(), 200));
    this.renderMedical();
  },
  renderMedical() {
    const search = (document.getElementById('med-search')?.value||'').trim().toLowerCase();
    const filtered = this._medData.filter(r => !search || r.name.toLowerCase().includes(search));
    if (!filtered.length) { document.getElementById('med-list').innerHTML = '<div class="empty-state"><i class="bi bi-heart-pulse"></i><h5>\u05D0\u05D9\u05DF \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</h5></div>'; return; }
    document.getElementById('med-list').innerHTML = `<div class="row g-3">${filtered.map(r => {
      const m = r.med;
      const hasMed = m && (m['\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA']||m['\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA']||m['\u05D4\u05E2\u05E8\u05D5\u05EA']);
      return `<div class="col-md-6"><div class="card p-3 ${hasMed?'medical-card':''}"><div class="d-flex align-items-center gap-3 mb-2">${Utils.avatarHTML(r.name)}<div><div class="fw-bold">${r.name}</div><small class="text-muted">\u05DB\u05D9\u05EA\u05D4 ${r.cls}</small></div>${hasMed?'<span class="badge bg-danger ms-auto">\u05DE\u05D9\u05D3\u05E2 \u05E8\u05E4\u05D5\u05D0\u05D9</span>':'<span class="badge bg-success ms-auto">\u05EA\u05E7\u05D9\u05DF</span>'}<button class="btn btn-sm btn-outline-primary ms-2" onclick="Pages.openMedicalEdit('${r.id}','${r.name}')"><i class="bi bi-pencil"></i></button></div><div class="mt-2"><button class="btn btn-sm btn-outline-primary" onclick="Pages.openMedicalEdit('${r.id}','${r.name.replace(/'/g,'')}')"><i class="bi bi-pencil me-1"></i>\u05E2\u05E8\u05D9\u05DB\u05D4</button></div>${''}</div>${hasMed?`<div class="small">${m['\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA']?`<div><i class="bi bi-exclamation-triangle text-warning me-1"></i><strong>\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA:</strong> ${m['\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA']}</div>`:''}${m['\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA']?`<div><i class="bi bi-capsule text-primary me-1"></i><strong>\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA:</strong> ${m['\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA']}</div>`:''}${m['\u05D4\u05E2\u05E8\u05D5\u05EA']?`<div><i class="bi bi-info-circle text-info me-1"></i>${m['\u05D4\u05E2\u05E8\u05D5\u05EA']}</div>`:''}</div>`:''}</div></div>`;
    }).join('')}</div>`;
  },
  openMedicalEdit(studentId, studentName) {
    var item = this._medData.find(function(r){ return r.id == studentId; });
    var med = item ? item.med : null;
    document.getElementById('medf-sid').value = studentId;
    document.getElementById('medf-allergies').value = med ? (med['\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA']||'') : '';
    document.getElementById('medf-meds').value = med ? (med['\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA']||'') : '';
    document.getElementById('medf-notes').value = med ? (med['\u05D4\u05E2\u05E8\u05D5\u05EA']||'') : '';
    new bootstrap.Modal(document.getElementById('med-modal')).show();
  },
  async saveMedical() {
    var sid = document.getElementById('medf-sid').value;
    var row = {'\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': sid, '\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA': document.getElementById('medf-allergies').value.trim(), '\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA': document.getElementById('medf-meds').value.trim(), '\u05D4\u05E2\u05E8\u05D5\u05EA': document.getElementById('medf-notes').value.trim()};
    var item = this._medData.find(function(r){ return r.id == sid; });
    var existing = item ? item.med : null;
    try {
      if (existing && (existing.id || existing['\u05DE\u05D6\u05D4\u05D4'])) {
        await App.apiCall('update', '\u05DE\u05D9\u05D3\u05E2_\u05E8\u05E4\u05D5\u05D0\u05D9', { id: existing.id || existing['\u05DE\u05D6\u05D4\u05D4'], row: row });
      } else {
        await App.apiCall('add', '\u05DE\u05D9\u05D3\u05E2_\u05E8\u05E4\u05D5\u05D0\u05D9', { row: row });
      }
      bootstrap.Modal.getInstance(document.getElementById('med-modal')).hide();
      Utils.toast('\u05E0\u05E9\u05DE\u05E8');
      this.medicalInit();
    } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4', 'danger'); }
  },


  /* ======================================================================
     SCHEDULE (WEEKLY GRID)
     ====================================================================== */
  schedule() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-table me-2"></i>\u05DE\u05E2\u05E8\u05DB\u05EA \u05E9\u05E2\u05D5\u05EA</h1></div><div class="d-flex gap-2"><select class="form-select form-select-sm" id="sch-class" style="width:150px"><option value="">\u05DB\u05DC \u05D4\u05DB\u05D9\u05EA\u05D5\u05EA</option></select><button class="btn btn-primary btn-sm" onclick="Pages.showAddLesson()"><i class="bi bi-plus-lg me-1"></i>\u05E9\u05D9\u05E2\u05D5\u05E8</button></div></div><div id="sch-grid" class="card p-0 overflow-auto">${Utils.skeleton(3)}</div><div class="modal fade" id="sch-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">\u05E9\u05D9\u05E2\u05D5\u05E8 \u05D7\u05D3\u05E9</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row g-3"><div class="col-6"><label class="form-label">\u05D9\u05D5\u05DD</label><select class="form-select" id="schf-day"><option>\u05E8\u05D0\u05E9\u05D5\u05DF</option><option>\u05E9\u05E0\u05D9</option><option>\u05E9\u05DC\u05D9\u05E9\u05D9</option><option>\u05E8\u05D1\u05D9\u05E2\u05D9</option><option>\u05D7\u05DE\u05D9\u05E9\u05D9</option><option>\u05E9\u05D9\u05E9\u05D9</option></select></div><div class="col-6"><label class="form-label">\u05E9\u05E2\u05D4</label><select class="form-select" id="schf-hour">${[1,2,3,4,5,6,7,8].map(h=>`<option>\u05E9\u05E2\u05D4 ${h}</option>`).join('')}</select></div><div class="col-6"><label class="form-label">\u05DE\u05E7\u05E6\u05D5\u05E2</label><input class="form-control" id="schf-subject"></div><div class="col-6"><label class="form-label">\u05DE\u05DC\u05DE\u05D3</label><input class="form-control" id="schf-teacher"></div><div class="col-6"><label class="form-label">\u05DB\u05D9\u05EA\u05D4</label><input class="form-control" id="schf-class"></div><div class="col-6"><label class="form-label">\u05D7\u05D3\u05E8</label><input class="form-control" id="schf-room"></div></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveLesson()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
  },
  _schData: [],
  async scheduleInit() {
    this._schData = await App.getData('\u05DE\u05E2\u05E8\u05DB\u05EA_\u05E9\u05E2\u05D5\u05EA');
    const classes = [...new Set(this._schData.map(l=>l['\u05DB\u05D9\u05EA\u05D4']).filter(Boolean))].sort();
    const sel = document.getElementById('sch-class');
    classes.forEach(c => sel.insertAdjacentHTML('beforeend',`<option value="${c}">${c}</option>`));
    sel.addEventListener('change', () => this.renderSchedule());
    this.renderSchedule();
  },
  renderSchedule() {
    const clsF = document.getElementById('sch-class')?.value||'';
    const filtered = clsF ? this._schData.filter(l=>(l['\u05DB\u05D9\u05EA\u05D4']||'')===clsF) : this._schData;
    const days = ['\u05E8\u05D0\u05E9\u05D5\u05DF','\u05E9\u05E0\u05D9','\u05E9\u05DC\u05D9\u05E9\u05D9','\u05E8\u05D1\u05D9\u05E2\u05D9','\u05D7\u05DE\u05D9\u05E9\u05D9','\u05E9\u05D9\u05E9\u05D9'];
    const hours = ['\u05E9\u05E2\u05D4 1','\u05E9\u05E2\u05D4 2','\u05E9\u05E2\u05D4 3','\u05E9\u05E2\u05D4 4','\u05E9\u05E2\u05D4 5','\u05E9\u05E2\u05D4 6','\u05E9\u05E2\u05D4 7','\u05E9\u05E2\u05D4 8'];
    let html = '<table class="table table-sm table-bordered mb-0" style="font-size:.8rem"><thead><tr><th class="text-center" style="width:80px">\u05E9\u05E2\u05D4</th>';
    days.forEach(d => html+=`<th class="text-center">${d}</th>`);
    html += '</tr></thead><tbody>';
    hours.forEach(h => {
      html += `<tr><td class="fw-bold text-center bg-light">${h}</td>`;
      days.forEach(d => {
        const lesson = filtered.find(l => (l['\u05D9\u05D5\u05DD']||'')===d && (l['\u05E9\u05E2\u05D4']||'')===h);
        if (lesson) {
          const colors = ['#e3f2fd','#e8f5e9','#fff3e0','#fce4ec','#f3e5f5','#e0f2f1'];
          const bg = colors[Math.abs((lesson['\u05DE\u05E7\u05E6\u05D5\u05E2']||'').charCodeAt(0))%colors.length];
          html += `<td class="schedule-cell" style="background:${bg}"><div class="fw-bold">${lesson['\u05DE\u05E7\u05E6\u05D5\u05E2']||''}</div><div class="text-muted" style="font-size:.7rem">${lesson['\u05DE\u05DC\u05DE\u05D3']||''}</div>${lesson['\u05D7\u05D3\u05E8']?`<span class="badge bg-secondary">${lesson['\u05D7\u05D3\u05E8']}</span>`:''}<button class="btn btn-outline-danger p-0 border-0" style="font-size:.6rem" onclick="Pages.deleteLesson('${lesson.id||lesson['\u05DE\u05D6\u05D4\u05D4']}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-x-circle"></i></button></td>`;
        } else {
          html += '<td class="schedule-cell text-center text-muted">-</td>';
        }
      });
      html += '</tr>';
    });
    html += '</tbody></table>';
    document.getElementById('sch-grid').innerHTML = html;
  },
  showAddLesson() { new bootstrap.Modal(document.getElementById('sch-modal')).show(); },
  async saveLesson() {
    const row = {'\u05D9\u05D5\u05DD':document.getElementById('schf-day').value,'\u05E9\u05E2\u05D4':document.getElementById('schf-hour').value,'\u05DE\u05E7\u05E6\u05D5\u05E2':document.getElementById('schf-subject').value.trim(),'\u05DE\u05DC\u05DE\u05D3':document.getElementById('schf-teacher').value.trim(),'\u05DB\u05D9\u05EA\u05D4':document.getElementById('schf-class').value.trim(),'\u05D7\u05D3\u05E8':document.getElementById('schf-room').value.trim()};
    if (!row['\u05DE\u05E7\u05E6\u05D5\u05E2']) { Utils.toast('\u05D7\u05E1\u05E8 \u05DE\u05E7\u05E6\u05D5\u05E2','warning'); return; }
    try { await App.apiCall('add','\u05DE\u05E2\u05E8\u05DB\u05EA_\u05E9\u05E2\u05D5\u05EA',{row}); bootstrap.Modal.getInstance(document.getElementById('sch-modal')).hide(); Utils.toast('\u05E9\u05D9\u05E2\u05D5\u05E8 \u05E0\u05D5\u05E1\u05E3'); this.scheduleInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },
  async deleteLesson(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4','\u05DC\u05DE\u05D7\u05D5\u05E7 \u05E9\u05D9\u05E2\u05D5\u05E8 \u05D6\u05D4?')) return;
    try { await App.apiCall('delete','\u05DE\u05E2\u05E8\u05DB\u05EA_\u05E9\u05E2\u05D5\u05EA',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.scheduleInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },
});
