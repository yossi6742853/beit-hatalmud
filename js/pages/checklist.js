Object.assign(Pages, {
  checklist() {
    const items = [
      {id:'att',label:'\u05E1\u05D9\u05DE\u05D5\u05DF \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D1\u05D5\u05E7\u05E8',icon:'bi-calendar-check',done:false},
      {id:'pray',label:'\u05D1\u05D3\u05D9\u05E7\u05EA \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05EA\u05E4\u05D9\u05DC\u05D5\u05EA',icon:'bi-sunrise',done:false},
      {id:'mail',label:'\u05D1\u05D3\u05D9\u05E7\u05EA \u05D3\u05D5\u05D0\u05E8 \u05E0\u05DB\u05E0\u05E1',icon:'bi-envelope',done:false},
      {id:'hw',label:'\u05D1\u05D3\u05D9\u05E7\u05EA \u05E9\u05D9\u05E2\u05D5\u05E8\u05D9 \u05D1\u05D9\u05EA \u05E9\u05D4\u05D5\u05D2\u05E9\u05D5',icon:'bi-book',done:false},
      {id:'fin',label:'\u05D1\u05D3\u05D9\u05E7\u05EA \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD \u05E9\u05D4\u05EA\u05E7\u05D1\u05DC\u05D5',icon:'bi-cash',done:false},
      {id:'beh',label:'\u05D3\u05D9\u05D5\u05D5\u05D7 \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA \u05DC\u05E6\u05D5\u05D5\u05EA',icon:'bi-star',done:false},
      {id:'par',label:'\u05DE\u05E2\u05E0\u05D4 \u05DC\u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05D4\u05D5\u05E8\u05D9\u05DD',icon:'bi-chat',done:false},
      {id:'clean',label:'\u05D1\u05D3\u05D9\u05E7\u05EA \u05E0\u05D9\u05E7\u05D9\u05D5\u05DF \u05D4\u05DE\u05D5\u05E1\u05D3',icon:'bi-droplet',done:false},
      {id:'safe',label:'\u05D1\u05D3\u05D9\u05E7\u05EA \u05D1\u05D8\u05D9\u05D7\u05D5\u05EA',icon:'bi-shield-check',done:false},
      {id:'plan',label:'\u05EA\u05DB\u05E0\u05D5\u05DF \u05D9\u05D5\u05DD \u05DE\u05D7\u05E8',icon:'bi-calendar-plus',done:false}
    ];
    // Load saved state from localStorage
    const saved = JSON.parse(localStorage.getItem('bht_checklist_'+Utils.todayISO()) || '{}');
    return `<div class="page-header"><h1><i class="bi bi-check2-square me-2"></i>\u05E6'\u05E7\u05DC\u05D9\u05E1\u05D8 \u05D9\u05D5\u05DE\u05D9</h1><p>${Utils.dayName()} | ${Utils.formatDate(new Date())}</p></div>
      <div class="card p-3 mb-3"><div class="d-flex justify-content-between"><div><span class="fs-5 fw-bold" id="check-done">0</span>/<span id="check-total">${items.length}</span> \u05D4\u05D5\u05E9\u05DC\u05DE\u05D5</div><div class="progress flex-grow-1 ms-3 align-self-center" style="height:12px"><div class="progress-bar bg-success" id="check-progress" style="width:0%"></div></div></div></div>
      <div id="check-list">${items.map(i => `<div class="card mb-2 p-3 d-flex flex-row align-items-center gap-3 ${saved[i.id]?'bg-success bg-opacity-10':''}" onclick="Pages.toggleCheck('${i.id}',this)" style="cursor:pointer"><div class="form-check"><input class="form-check-input" type="checkbox" ${saved[i.id]?'checked':''} style="width:24px;height:24px"></div><i class="bi ${i.icon} fs-5 ${saved[i.id]?'text-success':'text-muted'}"></i><span class="fw-medium ${saved[i.id]?'text-decoration-line-through text-muted':''}">${i.label}</span></div>`).join('')}</div>`;
  },
  checklistInit() { this._updateCheckProgress(); },
  toggleCheck(id, el) {
    const saved = JSON.parse(localStorage.getItem('bht_checklist_'+Utils.todayISO()) || '{}');
    saved[id] = !saved[id];
    localStorage.setItem('bht_checklist_'+Utils.todayISO(), JSON.stringify(saved));
    const cb = el.querySelector('input'); cb.checked = saved[id];
    el.classList.toggle('bg-success', saved[id]); el.classList.toggle('bg-opacity-10', saved[id]);
    el.querySelector('i').classList.toggle('text-success', saved[id]); el.querySelector('i').classList.toggle('text-muted', !saved[id]);
    el.querySelector('span').classList.toggle('text-decoration-line-through', saved[id]); el.querySelector('span').classList.toggle('text-muted', saved[id]);
    this._updateCheckProgress();
  },
  _updateCheckProgress() {
    const saved = JSON.parse(localStorage.getItem('bht_checklist_'+Utils.todayISO()) || '{}');
    const done = Object.values(saved).filter(v=>v).length;
    const total = 10;
    document.getElementById('check-done').textContent = done;
    document.getElementById('check-progress').style.width = Math.round(done/total*100)+'%';
    if (done === total) Utils.toast('\u05DB\u05DC \u05D4\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA \u05D4\u05D5\u05E9\u05DC\u05DE\u05D5!','success');
  }
});
