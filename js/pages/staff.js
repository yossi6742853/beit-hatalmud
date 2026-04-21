/* ===== BHT v5.3 — Staff ===== */
Object.assign(Pages, {
  /* ======================================================================
     STAFF
     ====================================================================== */
  staff() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div><h1><i class="bi bi-person-badge-fill me-2"></i>\u05E6\u05D5\u05D5\u05EA</h1><p id="staff-count"></p></div>
      <div class="d-flex gap-2">
        <button class="btn btn-primary btn-sm" onclick="Pages.showAddStaff()"><i class="bi bi-plus-lg me-1"></i>\u05D4\u05D5\u05E1\u05E3 \u05E2\u05D5\u05D1\u05D3</button>
        <button class="btn btn-outline-info btn-sm" onclick="Pages.showStaffAttendance()"><i class="bi bi-calendar-check me-1"></i>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05E6\u05D5\u05D5\u05EA</button>
        <button class="btn btn-outline-warning btn-sm" onclick="Pages.showStaffMissingDocs()"><i class="bi bi-exclamation-triangle me-1"></i>\u05DE\u05E1\u05DE\u05DB\u05D9\u05DD \u05D7\u05E1\u05E8\u05D9\u05DD</button>
      </div>
    </div>
    <div class="card p-3 mb-3"><div class="search-box"><i class="bi bi-search"></i><input type="text" class="form-control" id="staff-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05D0\u05D9\u05E9 \u05E6\u05D5\u05D5\u05EA..."></div></div>
    <div id="staff-att-section" class="mb-3" style="display:none"></div>
    <div id="staff-missing-docs" class="mb-3" style="display:none"></div>
    <div id="staff-list">${Utils.skeleton(3)}</div>`;
  },
  _staffData: [],
  async staffInit() {
    const data = await App.getData('\u05E6\u05D5\u05D5\u05EA'); this._staffData = data;
    document.getElementById('staff-search').addEventListener('input', Utils.debounce(() => this.renderStaffList(), 200));
    this.renderStaffList();
  },
  renderStaffList() {
    const search = (document.getElementById('staff-search')?.value || '').trim().toLowerCase();
    const filtered = (this._staffData || []).filter(s => !search || (Utils.fullName(s)).toLowerCase().includes(search));
    document.getElementById('staff-count').textContent = `${filtered.length} \u05D0\u05E0\u05E9\u05D9 \u05E6\u05D5\u05D5\u05EA`;
    if (filtered.length === 0) { document.getElementById('staff-list').innerHTML = `<div class="empty-state"><i class="bi bi-person-badge"></i><h5>\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5</h5></div>`; return; }
    document.getElementById('staff-list').innerHTML = `<div class="row g-3">${filtered.map(s => {
      const name = Utils.fullName(s); const role = s['\u05EA\u05E4\u05E7\u05D9\u05D3'] || ''; const phone = s['\u05D8\u05DC\u05E4\u05D5\u05DF'] || ''; const sid = Utils.rowId(s);
      return `<div class="col-md-6 col-lg-4"><div class="card p-3"><div class="d-flex align-items-center gap-3 cursor-pointer" onclick="location.hash='staff_card/${sid}'">${Utils.avatarHTML(name, 'lg')}<div class="flex-grow-1"><div class="fw-bold fs-6">${name}</div><div class="text-muted small">${role}</div>${phone ? `<div class="mt-1 small"><i class="bi bi-telephone me-1"></i>${Utils.formatPhone(phone)}</div>` : ''}</div>${Utils.statusBadge(s['\u05E1\u05D8\u05D8\u05D5\u05E1'])}</div><div class="d-flex gap-1 mt-2 border-top pt-2"><button class="btn btn-sm btn-outline-primary" onclick="event.stopPropagation();Pages.showAddStaff(Pages._staffData.find(x=>x===Pages._staffData.filter(z=>String(Utils.rowId(z))==='${sid}')[0]))"><i class="bi bi-pencil me-1"></i>\u05E2\u05E8\u05D5\u05DA</button><button class="btn btn-sm btn-outline-danger" onclick="event.stopPropagation();Pages.deleteStaff('${sid}')"><i class="bi bi-trash me-1"></i>\u05DE\u05D7\u05E7</button>${phone?`<a href="https://wa.me/972${phone.replace(/^0/,'')}" target="_blank" class="btn btn-sm btn-outline-success ms-auto" onclick="event.stopPropagation()"><i class="bi bi-whatsapp"></i></a>`:''}</div></div></div>`;
    }).join('')}</div>`;
  },
  showAddStaff(staff = null) {
    const title = staff ? '\u05E2\u05E8\u05D9\u05DB\u05EA \u05E2\u05D5\u05D1\u05D3' : '\u05D4\u05D5\u05E1\u05E4\u05EA \u05E2\u05D5\u05D1\u05D3 \u05E6\u05D5\u05D5\u05EA';
    const name = staff ? Utils.fullName(staff) : '';
    const html = `<div class="modal fade" id="staff-modal-dyn" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5>${title}</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row g-3"><div class="col-12"><label class="form-label">\u05E9\u05DD</label><input class="form-control" id="stf-name" value="${name}"></div><div class="col-6"><label class="form-label">\u05EA\u05E4\u05E7\u05D9\u05D3</label><input class="form-control" id="stf-role" value="${staff?.['\u05EA\u05E4\u05E7\u05D9\u05D3']||''}"></div><div class="col-6"><label class="form-label">\u05D8\u05DC\u05E4\u05D5\u05DF</label><input class="form-control" id="stf-phone" value="${staff?.['\u05D8\u05DC\u05E4\u05D5\u05DF']||''}"></div><div class="col-12"><label class="form-label">\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC</label><input class="form-control" id="stf-email" value="${staff?.['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC']||''}"></div></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveStaff('${staff?Utils.rowId(staff):''}')">\u05E9\u05DE\u05D9\u05E8\u05D4</button></div></div></div></div>`;
    document.getElementById('staff-modal-dyn')?.remove();
    document.body.insertAdjacentHTML('beforeend', html);
    new bootstrap.Modal(document.getElementById('staff-modal-dyn')).show();
  },
  async saveStaff(existingId) {
    const fullName = document.getElementById('stf-name').value.trim();
    const parts = fullName.split(/\s+/);
    const row = {'\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9':parts[0]||'','\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4':parts.slice(1).join(' ')||'','\u05EA\u05E4\u05E7\u05D9\u05D3':document.getElementById('stf-role').value.trim(),'\u05D8\u05DC\u05E4\u05D5\u05DF':document.getElementById('stf-phone').value.trim(),'\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC':document.getElementById('stf-email').value.trim(),'\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05E4\u05E2\u05D9\u05DC'};
    if (!row['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9']) { Utils.toast('\u05D7\u05E1\u05E8 \u05E9\u05DD','warning'); return; }
    try { if (existingId) { await App.apiCall('update','\u05E6\u05D5\u05D5\u05EA',{id:existingId,row}); } else { await App.apiCall('add','\u05E6\u05D5\u05D5\u05EA',{row}); } bootstrap.Modal.getInstance(document.getElementById('staff-modal-dyn')).hide(); Utils.toast(existingId?'\u05E2\u05D5\u05D3\u05DB\u05DF':'\u05E0\u05D5\u05E1\u05E3'); this.staffInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },
  async deleteStaff(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05EA \u05E2\u05D5\u05D1\u05D3','\u05D4\u05D0\u05DD \u05DC\u05DE\u05D7\u05D5\u05E7 \u05E2\u05D5\u05D1\u05D3 \u05D6\u05D4?')) return;
    try { await App.apiCall('delete','\u05E6\u05D5\u05D5\u05EA',{id}); Utils.toast('\u05E2\u05D5\u05D1\u05D3 \u05E0\u05DE\u05D7\u05E7'); this.staffInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },
  // --- Staff Attendance ---
  async showStaffAttendance() {
    const section = document.getElementById('staff-att-section');
    if (section.style.display !== 'none') { section.style.display = 'none'; return; }
    section.style.display = '';
    section.innerHTML = '<div class="card p-3"><h6 class="fw-bold mb-3"><i class="bi bi-calendar-check me-2 text-info"></i>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05E6\u05D5\u05D5\u05EA \u05DC\u05D4\u05D9\u05D5\u05DD</h6><div class="text-center py-3"><div class="spinner-border spinner-border-sm"></div> \u05D8\u05D5\u05E2\u05DF...</div></div>';
    const staff = this._staffData || [];
    const todayISO = Utils.todayISO();
    let attData = [];
    try { attData = await App.getData('\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA_\u05E6\u05D5\u05D5\u05EA'); } catch(e) { /* sheet may not exist */ }
    const todayAtt = attData.filter(a => a['\u05EA\u05D0\u05E8\u05D9\u05DA'] === todayISO);
    const attMap = {};
    todayAtt.forEach(a => { attMap[a['\u05E9\u05DD_\u05E2\u05D5\u05D1\u05D3'] || a['\u05DE\u05D6\u05D4\u05D4_\u05E2\u05D5\u05D1\u05D3'] || ''] = a['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '\u05E0\u05D5\u05DB\u05D7'; });
    this._stfAttData = {};
    section.innerHTML = `<div class="card p-3"><div class="d-flex justify-content-between align-items-center mb-3"><h6 class="fw-bold mb-0"><i class="bi bi-calendar-check me-2 text-info"></i>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05E6\u05D5\u05D5\u05EA - ${todayISO}</h6><button class="btn btn-success btn-sm" onclick="Pages.saveStaffAtt()"><i class="bi bi-check-lg me-1"></i>\u05E9\u05DE\u05D5\u05E8</button></div><div class="table-responsive"><table class="table table-bht mb-0"><thead><tr><th>\u05E2\u05D5\u05D1\u05D3</th><th>\u05EA\u05E4\u05E7\u05D9\u05D3</th><th>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</th></tr></thead><tbody>${staff.map(s => {
      const name = Utils.fullName(s); const sid = Utils.rowId(s);
      const status = attMap[name] || '';
      this._stfAttData[sid] = status;
      return `<tr><td class="fw-bold">${name}</td><td class="text-muted">${s['\u05EA\u05E4\u05E7\u05D9\u05D3']||''}</td><td><div class="btn-group btn-group-sm" role="group"><button class="btn btn-outline-success ${status==='\u05E0\u05D5\u05DB\u05D7'?'active':''}" onclick="Pages.setStfAtt('${sid}','\u05E0\u05D5\u05DB\u05D7',this)"><i class="bi bi-check-circle"></i></button><button class="btn btn-outline-danger ${status==='\u05D7\u05D9\u05E1\u05D5\u05E8'?'active':''}" onclick="Pages.setStfAtt('${sid}','\u05D7\u05D9\u05E1\u05D5\u05E8',this)"><i class="bi bi-x-circle"></i></button><button class="btn btn-outline-warning ${status==='\u05D0\u05D9\u05D7\u05D5\u05E8'?'active':''}" onclick="Pages.setStfAtt('${sid}','\u05D0\u05D9\u05D7\u05D5\u05E8',this)"><i class="bi bi-clock"></i></button></div></td></tr>`;
    }).join('')}</tbody></table></div></div>`;
  },
  _stfAttData: {},
  setStfAtt(sid, status, btn) {
    this._stfAttData[sid] = status;
    const grp = btn.closest('.btn-group');
    grp.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  },
  async saveStaffAtt() {
    const todayISO = Utils.todayISO();
    const staff = this._staffData || [];
    const records = [];
    for (const s of staff) {
      const sid = Utils.rowId(s);
      const status = this._stfAttData[sid];
      if (status) records.push({ '\u05E9\u05DD_\u05E2\u05D5\u05D1\u05D3': Utils.fullName(s), '\u05DE\u05D6\u05D4\u05D4_\u05E2\u05D5\u05D1\u05D3': sid, '\u05EA\u05D0\u05E8\u05D9\u05DA': todayISO, '\u05E1\u05D8\u05D8\u05D5\u05E1': status });
    }
    if (!records.length) { Utils.toast('\u05DC\u05D0 \u05E1\u05D5\u05DE\u05DF \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA', 'warning'); return; }
    try {
      for (const rec of records) await App.apiCall('add', '\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA_\u05E6\u05D5\u05D5\u05EA', { row: rec });
      Utils.toast(`${records.length} \u05E8\u05E9\u05D5\u05DE\u05D5\u05EA \u05E0\u05E9\u05DE\u05E8\u05D5`);
    } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4', 'danger'); }
  },
  // --- Staff Missing Docs ---
  async showStaffMissingDocs() {
    const section = document.getElementById('staff-missing-docs');
    if (section.style.display !== 'none') { section.style.display = 'none'; return; }
    section.style.display = '';
    section.innerHTML = '<div class="card p-3"><div class="text-center py-3"><div class="spinner-border spinner-border-sm"></div> \u05D1\u05D5\u05D3\u05E7...</div></div>';
    const staff = this._staffData || [];
    let staffDocs = [];
    try { staffDocs = await App.getData('\u05DE\u05E1\u05DE\u05DB\u05D9_\u05E6\u05D5\u05D5\u05EA'); } catch(e) {}
    const requiredDocs = ['\u05EA\u05E2\u05D5\u05D3\u05EA \u05D6\u05D4\u05D5\u05EA', '\u05EA\u05E2\u05D5\u05D3\u05EA \u05DE\u05E9\u05D8\u05E8\u05D4', '\u05EA\u05DC\u05D5\u05E9 \u05DE\u05E9\u05DB\u05D5\u05E8\u05EA', '\u05D0\u05D9\u05E9\u05D5\u05E8 \u05DE\u05E9\u05D8\u05E8\u05D4'];
    const missing = [];
    staff.forEach(s => {
      const name = Utils.fullName(s); const sid = Utils.rowId(s);
      const hasDocs = staffDocs.filter(d => d['\u05DE\u05D6\u05D4\u05D4_\u05E2\u05D5\u05D1\u05D3'] === sid || d['\u05E9\u05DD_\u05E2\u05D5\u05D1\u05D3'] === name);
      const hasDocTypes = hasDocs.map(d => d['\u05E1\u05D5\u05D2_\u05DE\u05E1\u05DE\u05DA'] || '');
      const missingTypes = requiredDocs.filter(r => !hasDocTypes.includes(r));
      if (missingTypes.length > 0) missing.push({ name, role: s['\u05EA\u05E4\u05E7\u05D9\u05D3'] || '', missing: missingTypes });
    });
    if (!missing.length) {
      section.innerHTML = '<div class="card p-3"><div class="text-center text-success py-3"><i class="bi bi-check-circle fs-3"></i><p class="mt-2">\u05DB\u05DC \u05D4\u05DE\u05E1\u05DE\u05DB\u05D9\u05DD \u05D4\u05E0\u05D3\u05E8\u05E9\u05D9\u05DD \u05E7\u05D9\u05D9\u05DE\u05D9\u05DD</p></div></div>';
      return;
    }
    section.innerHTML = `<div class="card p-3"><h6 class="fw-bold mb-3"><i class="bi bi-exclamation-triangle me-2 text-warning"></i>\u05DE\u05E1\u05DE\u05DB\u05D9\u05DD \u05D7\u05E1\u05E8\u05D9\u05DD (${missing.length} \u05E2\u05D5\u05D1\u05D3\u05D9\u05DD)</h6><div class="table-responsive"><table class="table table-bht mb-0"><thead><tr><th>\u05E2\u05D5\u05D1\u05D3</th><th>\u05EA\u05E4\u05E7\u05D9\u05D3</th><th>\u05DE\u05E1\u05DE\u05DB\u05D9\u05DD \u05D7\u05E1\u05E8\u05D9\u05DD</th></tr></thead><tbody>${missing.map(m => `<tr><td class="fw-bold">${m.name}</td><td class="text-muted">${m.role}</td><td>${m.missing.map(t => `<span class="badge bg-danger me-1">${t}</span>`).join('')}</td></tr>`).join('')}</tbody></table></div></div>`;
  },


  /* ======================================================================
     STAFF CARD
     ====================================================================== */
  staff_card(id) { return `<div id="staff-card-content">${Utils.skeleton(2)}</div>`; },
  async staff_cardInit(id) {
    const staff = await App.getData('\u05E6\u05D5\u05D5\u05EA');
    const s = staff.find(x => String(Utils.rowId(x)) === String(id) || String(x.id) === String(id));
    if (!s) { document.getElementById('staff-card-content').innerHTML = `<div class="empty-state"><i class="bi bi-person-x"></i><h5>\u05E2\u05D5\u05D1\u05D3 \u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0</h5><a href="#staff" class="btn btn-primary mt-2">\u05D7\u05D6\u05E8\u05D4</a></div>`; return; }
    const name = Utils.fullName(s);
    document.getElementById('staff-card-content').innerHTML = `
      <a href="#staff" class="btn btn-link text-decoration-none mb-2"><i class="bi bi-arrow-right me-1"></i>\u05D7\u05D6\u05E8\u05D4 \u05DC\u05E6\u05D5\u05D5\u05EA</a>
      <div class="card overflow-hidden mb-3"><div class="student-header">${Utils.avatarHTML(name, 'xl')}<h3 class="fw-bold mt-2 mb-1">${name}</h3><div>${s['\u05EA\u05E4\u05E7\u05D9\u05D3']||''}</div>${Utils.statusBadge(s['\u05E1\u05D8\u05D8\u05D5\u05E1'])}</div></div>
      <div class="card p-3"><div class="row g-3">
        <div class="col-sm-6"><label class="form-label text-muted small">\u05D8\u05DC\u05E4\u05D5\u05DF</label><div class="fw-bold" dir="ltr">${Utils.formatPhone(s['\u05D8\u05DC\u05E4\u05D5\u05DF'])}</div></div>
        <div class="col-sm-6"><label class="form-label text-muted small">\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC</label><div class="fw-bold">${s['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC']||'--'}</div></div>
        <div class="col-sm-6"><label class="form-label text-muted small">\u05DE\u05E7\u05E6\u05D5\u05E2</label><div class="fw-bold">${s['\u05DE\u05E7\u05E6\u05D5\u05E2']||s['\u05EA\u05E4\u05E7\u05D9\u05D3']||'--'}</div></div>
        <div class="col-sm-6"><label class="form-label text-muted small">\u05DB\u05D9\u05EA\u05D5\u05EA</label><div class="fw-bold">${s['\u05DB\u05D9\u05EA\u05D5\u05EA']||'--'}</div></div>
        <div class="col-12"><label class="form-label text-muted small">\u05D4\u05E2\u05E8\u05D5\u05EA</label><div>${s['\u05D4\u05E2\u05E8\u05D5\u05EA']||'--'}</div></div>
      </div></div>`;
  },


  /* ======================================================================
     STAFF SALARY
     ====================================================================== */
  staff_salary() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-cash-stack me-2"></i>\u05E9\u05DB\u05E8 \u05E6\u05D5\u05D5\u05EA</h1></div><button class="btn btn-primary btn-sm" onclick="Pages.showAddSalary()"><i class="bi bi-plus-lg me-1"></i>\u05EA\u05E9\u05DC\u05D5\u05DD \u05D7\u05D3\u05E9</button></div><div class="row g-3 mb-3"><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold" id="sal-total">\u20AA0</div><small class="text-muted">\u05E1\u05D4"\u05DB \u05DE\u05E9\u05DB\u05D5\u05E8\u05D5\u05EA</small></div></div><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-success" id="sal-paid">\u20AA0</div><small class="text-muted">\u05E9\u05D5\u05DC\u05DD</small></div></div><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-danger" id="sal-pending">\u20AA0</div><small class="text-muted">\u05DC\u05EA\u05E9\u05DC\u05D5\u05DD</small></div></div><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-primary" id="sal-count">0</div><small class="text-muted">\u05E8\u05E9\u05D5\u05DE\u05D5\u05EA</small></div></div></div><div class="card p-3 mb-3"><div class="row g-2"><div class="col-md-4"><input type="month" class="form-control" id="sal-month"></div><div class="col-md-4"><div class="search-box"><i class="bi bi-search"></i><input type="text" class="form-control" id="sal-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05E2\u05D5\u05D1\u05D3..."></div></div></div></div><div id="sal-list">${Utils.skeleton(4)}</div><div class="modal fade" id="sal-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">\u05EA\u05E9\u05DC\u05D5\u05DD \u05D7\u05D3\u05E9</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row g-3"><div class="col-12"><label class="form-label">\u05E2\u05D5\u05D1\u05D3</label><select class="form-select" id="salf-staff"></select></div><div class="col-6"><label class="form-label">\u05D7\u05D5\u05D3\u05E9</label><input type="month" class="form-control" id="salf-month"></div><div class="col-6"><label class="form-label">\u05E1\u05DB\u05D5\u05DD</label><input type="number" class="form-control" id="salf-amount"></div><div class="col-12"><label class="form-label">\u05D4\u05E2\u05E8\u05D5\u05EA</label><input class="form-control" id="salf-notes"></div></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveSalary()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
  },
  _salData: [],
  async staff_salaryInit() {
    this._salData = await App.getData('\u05E9\u05DB\u05E8_\u05E6\u05D5\u05D5\u05EA');
    const d = new Date(); document.getElementById('sal-month').value = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    document.getElementById('sal-month').addEventListener('change', () => this.renderSalary());
    document.getElementById('sal-search').addEventListener('input', Utils.debounce(() => this.renderSalary(), 200));
    this.renderSalary();
  },
  renderSalary() {
    const month = document.getElementById('sal-month')?.value||'';
    const search = (document.getElementById('sal-search')?.value||'').trim().toLowerCase();
    let filtered = (this._salData||[]).filter(r => {
      if (month && !(r['\u05D7\u05D5\u05D3\u05E9']||'').startsWith(month)) return false;
      if (search && !(r['\u05E9\u05DD']||'').toLowerCase().includes(search)) return false;
      return true;
    });
    const total = filtered.reduce((s,r)=>s+(parseFloat(r['\u05E1\u05DB\u05D5\u05DD'])||0),0);
    const paid = filtered.filter(r=>(r['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05E9\u05D5\u05DC\u05DD').reduce((s,r)=>s+(parseFloat(r['\u05E1\u05DB\u05D5\u05DD'])||0),0);
    document.getElementById('sal-total').textContent = Utils.formatCurrency(total);
    document.getElementById('sal-paid').textContent = Utils.formatCurrency(paid);
    document.getElementById('sal-pending').textContent = Utils.formatCurrency(total-paid);
    document.getElementById('sal-count').textContent = filtered.length;
    if (!filtered.length) { document.getElementById('sal-list').innerHTML = '<div class="empty-state"><i class="bi bi-cash-stack"></i><h5>\u05D0\u05D9\u05DF \u05DE\u05E9\u05DB\u05D5\u05E8\u05D5\u05EA</h5></div>'; return; }
    document.getElementById('sal-list').innerHTML = `<div class="card"><table class="table table-bht mb-0"><thead><tr><th>\u05E2\u05D5\u05D1\u05D3</th><th>\u05D7\u05D5\u05D3\u05E9</th><th>\u05E1\u05DB\u05D5\u05DD</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th><th>\u05D4\u05E2\u05E8\u05D5\u05EA</th><th>\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA</th></tr></thead><tbody>${filtered.map(r => {const isPaid=(r['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05E9\u05D5\u05DC\u05DD'; return `<tr><td><div class="d-flex align-items-center gap-2">${Utils.avatarHTML(r['\u05E9\u05DD']||'','sm')}<span class="fw-bold">${r['\u05E9\u05DD']||''}</span></div></td><td>${r['\u05D7\u05D5\u05D3\u05E9']||''}</td><td class="fw-bold">${Utils.formatCurrency(parseFloat(r['\u05E1\u05DB\u05D5\u05DD'])||0)}</td><td><span class="badge bg-${isPaid?'success':'warning'}">${r['\u05E1\u05D8\u05D8\u05D5\u05E1']||'\u05DC\u05EA\u05E9\u05DC\u05D5\u05DD'}</span></td><td class="small">${r['\u05D4\u05E2\u05E8\u05D5\u05EA']||''}</td><td>${!isPaid?`<button class="btn btn-sm btn-outline-success" onclick="Pages.markSalPaid('${Utils.rowId(r)}')"><i class="bi bi-check-lg"></i></button>`:''}</td></tr>`}).join('')}</tbody></table></div>`;
  },
  async showAddSalary() {
    const staff = await App.getData('\u05E6\u05D5\u05D5\u05EA');
    document.getElementById('salf-staff').innerHTML = '<option value="">\u05D1\u05D7\u05E8</option>' + staff.map(s=>`<option value="${Utils.rowId(s)}">${Utils.fullName(s)}</option>`).join('');
    const d=new Date(); document.getElementById('salf-month').value=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    new bootstrap.Modal(document.getElementById('sal-modal')).show();
  },
  async saveSalary() {
    const sel=document.getElementById('salf-staff');
    const row = {'\u05E9\u05DD':sel.selectedOptions[0]?.text||'','\u05D7\u05D5\u05D3\u05E9':document.getElementById('salf-month').value,'\u05E1\u05DB\u05D5\u05DD':document.getElementById('salf-amount').value,'\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05DC\u05EA\u05E9\u05DC\u05D5\u05DD','\u05D4\u05E2\u05E8\u05D5\u05EA':document.getElementById('salf-notes').value.trim()};
    if (!row['\u05E9\u05DD']||!row['\u05E1\u05DB\u05D5\u05DD']) { Utils.toast('\u05D7\u05E1\u05E8 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD','warning'); return; }
    try { await App.apiCall('add','\u05E9\u05DB\u05E8_\u05E6\u05D5\u05D5\u05EA',{row}); bootstrap.Modal.getInstance(document.getElementById('sal-modal')).hide(); Utils.toast('\u05DE\u05E9\u05DB\u05D5\u05E8\u05EA \u05E0\u05D5\u05E1\u05E4\u05D4'); this.staff_salaryInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },
  async markSalPaid(id) { try { await App.apiCall('update','\u05E9\u05DB\u05E8_\u05E6\u05D5\u05D5\u05EA',{id,row:{'\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05E9\u05D5\u05DC\u05DD'}}); Utils.toast('\u05E1\u05D5\u05DE\u05DF \u05DB\u05E9\u05D5\u05DC\u05DD'); this.staff_salaryInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); } },
});
