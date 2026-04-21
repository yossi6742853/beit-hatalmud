/* ===== BHT v5.3 — Finance ===== */
Object.assign(Pages, {
  /* ======================================================================
     FINANCE
     ====================================================================== */
  finance() {
    return `<div class="page-header"><h1><i class="bi bi-cash-stack me-2"></i>\u05DB\u05E1\u05E4\u05D9\u05DD</h1></div><div class="row g-3 mb-4"><div class="col-md-4"><div class="card p-3 text-center"><div class="fs-4 fw-bold" id="fin-total">--</div><small class="text-muted">\u05E1\u05D4"\u05DB</small></div></div><div class="col-md-4"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-success" id="fin-paid">--</div><small class="text-muted">\u05E0\u05D2\u05D1\u05D4</small></div></div><div class="col-md-4"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-danger" id="fin-debt">--</div><small class="text-muted">\u05D7\u05D5\u05D1</small></div></div></div><div class="card p-3 mb-3"><div class="row g-2"><div class="col-md-6"><div class="search-box"><i class="bi bi-search"></i><input type="text" class="form-control" id="fin-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05EA\u05DC\u05DE\u05D9\u05D3..."></div></div><div class="col-md-3"><select class="form-select" id="fin-filter"><option value="">\u05D4\u05DB\u05DC</option><option value="debt">\u05D7\u05D5\u05D1\u05D5\u05EA</option><option value="paid">\u05E9\u05D5\u05DC\u05DD</option></select></div><div class="col-md-3 d-flex gap-2"><button class="btn btn-primary btn-sm" onclick="Pages.showAddPayment()"><i class="bi bi-plus-lg me-1"></i>\u05EA\u05E9\u05DC\u05D5\u05DD</button><button class="btn btn-outline-warning btn-sm" onclick="Pages.bulkMarkPaid()"><i class="bi bi-check2-all me-1"></i>\u05E1\u05DE\u05DF \u05E0\u05D1\u05D7\u05E8\u05D9\u05DD</button><button class="btn btn-outline-success btn-sm" onclick="Pages.exportFinCSV()"><i class="bi bi-download me-1"></i>CSV</button></div></div></div><div id="fin-list">${Utils.skeleton(4)}</div>`;
  },
  _finData: [],
  async financeInit() {
    this._finData = await App.getData('\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3');
    const total = this._finData.reduce((s,f) => s+(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0),0);
    const paid = this._finData.filter(f=>(f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05E9\u05D5\u05DC\u05DD').reduce((s,f) => s+(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0),0);
    const debt = total - paid;
    document.getElementById('fin-total').textContent = Utils.formatCurrency(total);
    document.getElementById('fin-paid').textContent = Utils.formatCurrency(paid);
    document.getElementById('fin-debt').textContent = Utils.formatCurrency(debt);
    document.getElementById('fin-search').addEventListener('input', Utils.debounce(() => this.renderFinList(), 200));
    document.getElementById('fin-filter').addEventListener('change', () => this.renderFinList());
    this.renderFinList();
  },
  renderFinList() {
    const search = (document.getElementById('fin-search')?.value || '').trim().toLowerCase();
    const filter = document.getElementById('fin-filter')?.value || '';
    let filtered = (this._finData || []).filter(f => { const nm=f['\u05E9\u05DD']||f['\u05EA\u05DC\u05DE\u05D9\u05D3']||''; if (search && !nm.toLowerCase().includes(search)) return false; const isPaid=(f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05E9\u05D5\u05DC\u05DD'; if (filter==='debt'&&isPaid) return false; if (filter==='paid'&&!isPaid) return false; return true; });
    if (!filtered.length) { document.getElementById('fin-list').innerHTML = '<div class="empty-state"><i class="bi bi-cash"></i><h5>\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5</h5></div>'; return; }
    const allChecked = this._finSelectedIds.length === filtered.length && filtered.length > 0;
    document.getElementById('fin-list').innerHTML = `${this._finSelectedIds.length ? `<div class="alert alert-info py-2 d-flex align-items-center gap-2 mb-2"><strong>${this._finSelectedIds.length}</strong> \u05E0\u05D1\u05D7\u05E8\u05D5</div>` : ''}<div class="card"><table class="table table-bht mb-0"><thead><tr><th style="width:40px"><input type="checkbox" class="form-check-input" ${allChecked?'checked':''} onchange="Pages.toggleFinCheckAll()"></th><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th>\u05D7\u05D5\u05D3\u05E9</th><th>\u05E1\u05DB\u05D5\u05DD</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th><th>\u05D0\u05DE\u05E6\u05E2\u05D9</th><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th></tr></thead><tbody>${filtered.map(f => { const fId=Utils.rowId(f); const nm=f['\u05E9\u05DD']||f['\u05EA\u05DC\u05DE\u05D9\u05D3']||''; const amt=Number(f['\u05E1\u05DB\u05D5\u05DD'])||0; const isPaid=(f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05E9\u05D5\u05DC\u05DD'; const sc=isPaid?'success':'danger'; const chk=this._finSelectedIds.includes(fId)?'checked':''; return `<tr><td><input type="checkbox" class="form-check-input" ${chk} onchange="Pages.toggleFinCheck('${fId}')"></td><td><div class="d-flex align-items-center gap-2">${Utils.avatarHTML(nm,'sm')}<span class="fw-bold">${nm}</span></div></td><td>${f['\u05D7\u05D5\u05D3\u05E9']||''}</td><td class="fw-bold">${Utils.formatCurrency(amt)}</td><td><span class="badge bg-${sc}">${f['\u05E1\u05D8\u05D8\u05D5\u05E1']||''}</span></td><td>${f['\u05D0\u05DE\u05E6\u05E2\u05D9_\u05EA\u05E9\u05DC\u05D5\u05DD']||''}</td><td>${Utils.formatDateShort(f['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05EA\u05E9\u05DC\u05D5\u05DD'])}</td></tr>`; }).join('')}</tbody></table></div>`;
  },
  showAddPayment() {
    const html = `<div class="modal fade" id="fin-modal-dyn" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5>\u05EA\u05E9\u05DC\u05D5\u05DD \u05D7\u05D3\u05E9</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row g-3"><div class="col-12"><label class="form-label">\u05EA\u05DC\u05DE\u05D9\u05D3</label><select class="form-select" id="ff-student"></select></div><div class="col-6"><label class="form-label">\u05D7\u05D5\u05D3\u05E9</label><input type="month" class="form-control" id="ff-month"></div><div class="col-6"><label class="form-label">\u05E1\u05DB\u05D5\u05DD</label><input type="number" class="form-control" id="ff-amount"></div><div class="col-6"><label class="form-label">\u05E1\u05D8\u05D8\u05D5\u05E1</label><select class="form-select" id="ff-status"><option value="\u05D7\u05D5\u05D1">\u05D7\u05D5\u05D1</option><option value="\u05E9\u05D5\u05DC\u05DD">\u05E9\u05D5\u05DC\u05DD</option></select></div><div class="col-6"><label class="form-label">\u05D0\u05DE\u05E6\u05E2\u05D9</label><select class="form-select" id="ff-method"><option>\u05DE\u05D6\u05D5\u05DE\u05DF</option><option>\u05D4\u05E2\u05D1\u05E8\u05D4</option><option>\u05E6'\u05E7</option><option>\u05D0\u05E9\u05E8\u05D0\u05D9</option></select></div></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.savePayment()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
    document.getElementById('fin-modal-dyn')?.remove();
    document.body.insertAdjacentHTML('beforeend', html);
    App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD').then(students => {
      const sel = document.getElementById('ff-student');
      sel.innerHTML = '<option value="">\u05D1\u05D7\u05E8</option>' + students.map(s => `<option value="${Utils.rowId(s)}">${Utils.fullName(s)}</option>`).join('');
    });
    const d = new Date(); document.getElementById('ff-month').value = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    new bootstrap.Modal(document.getElementById('fin-modal-dyn')).show();
  },
  async savePayment() {
    const sel = document.getElementById('ff-student');
    const row = {'\u05E9\u05DD':sel.selectedOptions[0]?.text||'','\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4':sel.value,'\u05D7\u05D5\u05D3\u05E9':document.getElementById('ff-month').value,'\u05E1\u05DB\u05D5\u05DD':document.getElementById('ff-amount').value,'\u05E1\u05D8\u05D8\u05D5\u05E1':document.getElementById('ff-status').value,'\u05D0\u05DE\u05E6\u05E2\u05D9_\u05EA\u05E9\u05DC\u05D5\u05DD':document.getElementById('ff-method').value,'\u05EA\u05D0\u05E8\u05D9\u05DA_\u05EA\u05E9\u05DC\u05D5\u05DD':Utils.todayISO()};
    if (!row['\u05E9\u05DD']||!row['\u05E1\u05DB\u05D5\u05DD']) { Utils.toast('\u05D7\u05E1\u05E8 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD','warning'); return; }
    try { await App.apiCall('add','\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3',{row}); bootstrap.Modal.getInstance(document.getElementById('fin-modal-dyn')).hide(); Utils.toast('\u05EA\u05E9\u05DC\u05D5\u05DD \u05E0\u05D5\u05E1\u05E3'); this.financeInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },
  async deletePayment(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4','\u05DC\u05DE\u05D7\u05D5\u05E7 \u05EA\u05E9\u05DC\u05D5\u05DD \u05D6\u05D4?')) return;
    try { await App.apiCall('delete','\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.financeInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },
  async markPaymentPaid(id) {
    try { await App.apiCall('update','\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3',{id,row:{'\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05E9\u05D5\u05DC\u05DD','\u05EA\u05D0\u05E8\u05D9\u05DA_\u05EA\u05E9\u05DC\u05D5\u05DD':Utils.todayISO()}}); Utils.toast('\u05E1\u05D5\u05DE\u05DF \u05DB\u05E9\u05D5\u05DC\u05DD'); this.financeInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },
  exportFinCSV() {
    const rows = this._finData || [];
    if (!rows.length) { Utils.toast('\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD','warning'); return; }
    let csv = '\uFEFF' + '\u05EA\u05DC\u05DE\u05D9\u05D3,\u05D7\u05D5\u05D3\u05E9,\u05E1\u05DB\u05D5\u05DD,\u05E1\u05D8\u05D8\u05D5\u05E1,\u05D0\u05DE\u05E6\u05E2\u05D9,\u05EA\u05D0\u05E8\u05D9\u05DA\n';
    rows.forEach(f => { csv += `"${f['\u05E9\u05DD']||f['\u05EA\u05DC\u05DE\u05D9\u05D3']||''}","${f['\u05D7\u05D5\u05D3\u05E9']||''}","${f['\u05E1\u05DB\u05D5\u05DD']||''}","${f['\u05E1\u05D8\u05D8\u05D5\u05E1']||''}","${f['\u05D0\u05DE\u05E6\u05E2\u05D9_\u05EA\u05E9\u05DC\u05D5\u05DD']||''}","${f['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05EA\u05E9\u05DC\u05D5\u05DD']||''}"\n`; });
    const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'finance_'+Utils.todayISO()+'.csv'; link.click();
    Utils.toast('\u05E7\u05D5\u05D1\u05E5 CSV \u05D9\u05D5\u05E6\u05D0');
  },
  _finSelectedIds: [],
  toggleFinCheck(id) {
    const idx = this._finSelectedIds.indexOf(id);
    if (idx === -1) this._finSelectedIds.push(id); else this._finSelectedIds.splice(idx, 1);
    this.renderFinList();
  },
  toggleFinCheckAll() {
    if (this._finSelectedIds.length === this._finData.length) { this._finSelectedIds = []; }
    else { this._finSelectedIds = this._finData.map(f => Utils.rowId(f)); }
    this.renderFinList();
  },
  async bulkMarkPaid() {
    if (!this._finSelectedIds.length) { Utils.toast('\u05D1\u05D7\u05E8 \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD','warning'); return; }
    if (!await Utils.confirm('\u05E1\u05D9\u05DE\u05D5\u05DF \u05DB\u05E9\u05D5\u05DC\u05DD', this._finSelectedIds.length + ' \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD \u05D9\u05E1\u05D5\u05DE\u05E0\u05D5 \u05DB\u05E9\u05D5\u05DC\u05DD?')) return;
    let done = 0;
    for (const id of this._finSelectedIds) {
      try { await App.apiCall('update','\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3',{id, row:{'\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05E9\u05D5\u05DC\u05DD','\u05EA\u05D0\u05E8\u05D9\u05DA_\u05EA\u05E9\u05DC\u05D5\u05DD':Utils.todayISO()}}); done++; } catch(e) {}
    }
    this._finSelectedIds = [];
    Utils.toast(done + ' \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD \u05E2\u05D5\u05D3\u05DB\u05E0\u05D5');
    this.financeInit();
  },


  /* ======================================================================
     PETTY CASH
     ====================================================================== */
  pettycash() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-cash-coin me-2"></i>\u05E7\u05D5\u05E4\u05D4 \u05E7\u05D8\u05E0\u05D4</h1></div><button class="btn btn-primary btn-sm" onclick="Pages.showAddPc()"><i class="bi bi-plus-lg me-1"></i>\u05E4\u05E2\u05D5\u05DC\u05D4 \u05D7\u05D3\u05E9\u05D4</button></div><div class="row g-2 mb-3"><div class="col-md-3 col-6"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-success" id="pc-in">\u20AA0</div><small>\u05D4\u05DB\u05E0\u05E1\u05D5\u05EA</small></div></div><div class="col-md-3 col-6"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-danger" id="pc-out">\u20AA0</div><small>\u05D4\u05D5\u05E6\u05D0\u05D5\u05EA</small></div></div><div class="col-md-3 col-6"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-primary" id="pc-balance">\u20AA0</div><small>\u05D9\u05EA\u05E8\u05D4</small></div></div><div class="col-md-3 col-6"><div class="card p-3 text-center"><div class="fs-4 fw-bold" id="pc-count">0</div><small>\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA</small></div></div></div><div id="pc-list">${Utils.skeleton(3)}</div><div class="modal fade" id="pc-modal" tabindex="-1"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">\u05E4\u05E2\u05D5\u05DC\u05D4 \u05D7\u05D3\u05E9\u05D4</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="mb-3"><label class="form-label">\u05E1\u05D5\u05D2</label><select class="form-select" id="pcf-type"><option>\u05D4\u05DB\u05E0\u05E1\u05D4</option><option>\u05D4\u05D5\u05E6\u05D0\u05D4</option></select></div><div class="mb-3"><label class="form-label">\u05EA\u05D9\u05D0\u05D5\u05E8</label><input class="form-control" id="pcf-desc"></div><div class="mb-3"><label class="form-label">\u05E1\u05DB\u05D5\u05DD</label><input type="number" class="form-control" id="pcf-amount"></div></div><div class="modal-footer"><button class="btn btn-secondary btn-sm" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary btn-sm" onclick="Pages.savePc()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
  },
  _pcData: [],
  async pettycashInit() { this._pcData = await App.getData('\u05E7\u05D5\u05E4\u05D4_\u05E7\u05D8\u05E0\u05D4'); this.renderPc(); },
  renderPc() {
    let tIn=0, tOut=0; this._pcData.forEach(r => { const a=parseFloat(r['\u05E1\u05DB\u05D5\u05DD'])||0; if (r['\u05E1\u05D5\u05D2']==='\u05D4\u05DB\u05E0\u05E1\u05D4') tIn+=a; else tOut+=a; });
    document.getElementById('pc-in').textContent = '\u20AA'+tIn.toLocaleString();
    document.getElementById('pc-out').textContent = '\u20AA'+tOut.toLocaleString();
    document.getElementById('pc-balance').textContent = '\u20AA'+(tIn-tOut).toLocaleString();
    document.getElementById('pc-count').textContent = this._pcData.length;
    if (!this._pcData.length) { document.getElementById('pc-list').innerHTML = '<div class="empty-state"><i class="bi bi-cash-coin"></i><h5>\u05D0\u05D9\u05DF \u05E4\u05E2\u05D5\u05DC\u05D5\u05EA</h5></div>'; return; }
    let bal=0; document.getElementById('pc-list').innerHTML = `<div class="card"><table class="table table-bht mb-0"><thead><tr><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05E1\u05D5\u05D2</th><th>\u05EA\u05D9\u05D0\u05D5\u05E8</th><th>\u05E1\u05DB\u05D5\u05DD</th><th>\u05D9\u05EA\u05E8\u05D4</th><th></th></tr></thead><tbody>${this._pcData.map(r => { const a=parseFloat(r['\u05E1\u05DB\u05D5\u05DD'])||0; const pcId=r.id||r['\u05DE\u05D6\u05D4\u05D4']||Utils.rowId(r); if (r['\u05E1\u05D5\u05D2']==='\u05D4\u05DB\u05E0\u05E1\u05D4') bal+=a; else bal-=a; return `<tr><td>${r['\u05EA\u05D0\u05E8\u05D9\u05DA']||''}</td><td><span class="badge ${r['\u05E1\u05D5\u05D2']==='\u05D4\u05DB\u05E0\u05E1\u05D4'?'bg-success':'bg-danger'}">${r['\u05E1\u05D5\u05D2']}</span></td><td>${r['\u05EA\u05D9\u05D0\u05D5\u05E8']||''}</td><td class="fw-bold ${r['\u05E1\u05D5\u05D2']==='\u05D4\u05DB\u05E0\u05E1\u05D4'?'text-success':'text-danger'}">${r['\u05E1\u05D5\u05D2']==='\u05D4\u05DB\u05E0\u05E1\u05D4'?'+':'-'}\u20AA${a}</td><td class="fw-bold">\u20AA${bal}</td><td><button class="btn btn-sm btn-outline-primary me-1" onclick="Pages.editPc('${pcId}')" title="\u05E2\u05E8\u05D9\u05DB\u05D4"><i class="bi bi-pencil"></i></button><button class="btn btn-sm btn-outline-danger" onclick="Pages.deletePc('${pcId}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button></td></tr>`; }).join('')}</tbody></table></div>`;
  },
  showAddPc() { this._pcEditId=null; document.getElementById('pcf-type').value='\u05D4\u05DB\u05E0\u05E1\u05D4'; document.getElementById('pcf-desc').value=''; document.getElementById('pcf-amount').value=''; new bootstrap.Modal(document.getElementById('pc-modal')).show(); },
  async savePc() { const row = {'\u05E1\u05D5\u05D2':document.getElementById('pcf-type').value,'\u05EA\u05D9\u05D0\u05D5\u05E8':document.getElementById('pcf-desc').value.trim(),'\u05E1\u05DB\u05D5\u05DD':document.getElementById('pcf-amount').value,'\u05EA\u05D0\u05E8\u05D9\u05DA':Utils.todayISO()}; if (!row['\u05EA\u05D9\u05D0\u05D5\u05E8']||!row['\u05E1\u05DB\u05D5\u05DD']) { Utils.toast('\u05D7\u05E1\u05E8 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD','warning'); return; } try { if (this._pcEditId) { await App.apiCall('update','\u05E7\u05D5\u05E4\u05D4_\u05E7\u05D8\u05E0\u05D4',{id:this._pcEditId,row}); this._pcEditId=null; } else { await App.apiCall('add','\u05E7\u05D5\u05E4\u05D4_\u05E7\u05D8\u05E0\u05D4',{row}); } bootstrap.Modal.getInstance(document.getElementById('pc-modal')).hide(); Utils.toast('\u05E0\u05E9\u05DE\u05E8'); this.pettycashInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); } },
  async deletePc(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4','\u05DC\u05DE\u05D7\u05D5\u05E7 \u05E4\u05E2\u05D5\u05DC\u05D4 \u05D6\u05D5?')) return;
    try { await App.apiCall('delete','\u05E7\u05D5\u05E4\u05D4_\u05E7\u05D8\u05E0\u05D4',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.pettycashInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },
  editPc(id) {
    var item = this._pcData.find(function(r){ return (r.id||r['\u05DE\u05D6\u05D4\u05D4']||'') == id; });
    if (!item) return;
    document.getElementById('pcf-type').value = item['\u05E1\u05D5\u05D2'] || '\u05D4\u05DB\u05E0\u05E1\u05D4';
    document.getElementById('pcf-desc').value = item['\u05EA\u05D9\u05D0\u05D5\u05E8'] || '';
    document.getElementById('pcf-amount').value = item['\u05E1\u05DB\u05D5\u05DD'] || '';
    this._pcEditId = id;
    new bootstrap.Modal(document.getElementById('pc-modal')).show();
  },


  /* ======================================================================
     BUDGET
     ====================================================================== */
  budget() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-wallet2 me-2"></i>\u05EA\u05E7\u05E6\u05D9\u05D1</h1></div><button class="btn btn-primary btn-sm" onclick="Pages.showAddBudget()"><i class="bi bi-plus-lg me-1"></i>\u05D4\u05D5\u05E6\u05D0\u05D4 \u05D7\u05D3\u05E9\u05D4</button></div><div class="row g-2 mb-3"><div class="col-md-4"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-danger" id="budg-total">\u20AA0</div><small>\u05E1\u05D4"\u05DB \u05D4\u05D5\u05E6\u05D0\u05D5\u05EA</small></div></div><div class="col-md-4"><div class="card p-3 text-center"><div class="fs-4 fw-bold" id="budg-count">0</div><small>\u05E8\u05E9\u05D5\u05DE\u05D5\u05EA</small></div></div><div class="col-md-4"><div class="card p-3"><canvas id="budg-chart" height="100"></canvas></div></div></div><div id="budg-list">${Utils.skeleton(3)}</div><div class="modal fade" id="budg-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">\u05D4\u05D5\u05E6\u05D0\u05D4 \u05D7\u05D3\u05E9\u05D4</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row g-3"><div class="col-6"><label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA</label><input type="date" class="form-control" id="bgf-date"></div><div class="col-6"><label class="form-label">\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4</label><select class="form-select" id="bgf-cat"><option>\u05E6\u05D9\u05D5\u05D3</option><option>\u05D0\u05D5\u05DB\u05DC</option><option>\u05EA\u05D7\u05D1\u05D5\u05E8\u05D4</option><option>\u05EA\u05D7\u05D6\u05D5\u05E7\u05D4</option><option>\u05D7\u05D9\u05E0\u05D5\u05DA</option><option>\u05D0\u05D7\u05E8</option></select></div><div class="col-12"><label class="form-label">\u05EA\u05D9\u05D0\u05D5\u05E8</label><input class="form-control" id="bgf-desc"></div><div class="col-6"><label class="form-label">\u05E1\u05DB\u05D5\u05DD</label><input type="number" class="form-control" id="bgf-amount"></div><div class="col-6"><label class="form-label">\u05E1\u05E4\u05E7</label><input class="form-control" id="bgf-vendor"></div></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveBudget()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
  },
  _budgData: [],
  async budgetInit() { this._budgData = await App.getData('\u05EA\u05E7\u05E6\u05D9\u05D1'); this.renderBudget(); },
  renderBudget() {
    const total = this._budgData.reduce((s,r)=>s+(parseFloat(r['\u05E1\u05DB\u05D5\u05DD'])||0),0);
    document.getElementById('budg-total').textContent = Utils.formatCurrency(total);
    document.getElementById('budg-count').textContent = this._budgData.length;
    // Category chart
    const cats = {}; this._budgData.forEach(r => { const c=r['\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4']||'\u05D0\u05D7\u05E8'; cats[c]=(cats[c]||0)+(parseFloat(r['\u05E1\u05DB\u05D5\u05DD'])||0); });
    const ctx = document.getElementById('budg-chart');
    if (ctx && Object.keys(cats).length) { App.charts.budg = new Chart(ctx, { type:'doughnut', data:{ labels:Object.keys(cats), datasets:[{data:Object.values(cats), backgroundColor:['#2563eb','#16a34a','#f59e0b','#dc2626','#8b5cf6','#06b6d4'], borderWidth:0}] }, options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{font:{size:10}}}}} }); }
    if (!this._budgData.length) { document.getElementById('budg-list').innerHTML = '<div class="empty-state"><i class="bi bi-wallet2"></i><h5>\u05D0\u05D9\u05DF \u05D4\u05D5\u05E6\u05D0\u05D5\u05EA</h5></div>'; return; }
    let cum=0; document.getElementById('budg-list').innerHTML = `<div class="card"><table class="table table-bht mb-0"><thead><tr><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4</th><th>\u05EA\u05D9\u05D0\u05D5\u05E8</th><th>\u05E1\u05DB\u05D5\u05DD</th><th>\u05DE\u05E6\u05D8\u05D1\u05E8</th><th>\u05E1\u05E4\u05E7</th><th></th></tr></thead><tbody>${this._budgData.map(r => { const a=parseFloat(r['\u05E1\u05DB\u05D5\u05DD'])||0; const bgId=r.id||r['\u05DE\u05D6\u05D4\u05D4']||Utils.rowId(r); cum+=a; return `<tr><td>${r['\u05EA\u05D0\u05E8\u05D9\u05DA']||''}</td><td><span class="badge bg-secondary">${r['\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4']||''}</span></td><td>${r['\u05EA\u05D9\u05D0\u05D5\u05E8']||''}</td><td class="fw-bold text-danger">${Utils.formatCurrency(a)}</td><td class="fw-bold">${Utils.formatCurrency(cum)}</td><td>${r['\u05E1\u05E4\u05E7']||''}</td><td><button class="btn btn-sm btn-outline-primary me-1" onclick="Pages.editBudgetItem('${bgId}')" title="\u05E2\u05E8\u05D9\u05DB\u05D4"><i class="bi bi-pencil"></i></button><button class="btn btn-sm btn-outline-danger" onclick="Pages.deleteBudgetItem('${bgId}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button></td></tr>`; }).join('')}</tbody></table></div>`;
  },
  showAddBudget() { this._budgEditId=null; document.getElementById('bgf-date').value=Utils.todayISO(); document.getElementById('bgf-cat').value=''; document.getElementById('bgf-desc').value=''; document.getElementById('bgf-amount').value=''; document.getElementById('bgf-vendor').value=''; new bootstrap.Modal(document.getElementById('budg-modal')).show(); },
  async saveBudget() { const row={'\u05EA\u05D0\u05E8\u05D9\u05DA':document.getElementById('bgf-date').value,'\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4':document.getElementById('bgf-cat').value,'\u05EA\u05D9\u05D0\u05D5\u05E8':document.getElementById('bgf-desc').value.trim(),'\u05E1\u05DB\u05D5\u05DD':document.getElementById('bgf-amount').value,'\u05E1\u05E4\u05E7':document.getElementById('bgf-vendor').value.trim()}; try { if (this._budgEditId) { await App.apiCall('update','\u05EA\u05E7\u05E6\u05D9\u05D1',{id:this._budgEditId,row}); this._budgEditId=null; } else { await App.apiCall('add','\u05EA\u05E7\u05E6\u05D9\u05D1',{row}); } bootstrap.Modal.getInstance(document.getElementById('budg-modal')).hide(); Utils.toast('\u05E0\u05E9\u05DE\u05E8'); this.budgetInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); } },
  async deleteBudgetItem(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4','\u05DC\u05DE\u05D7\u05D5\u05E7 \u05E8\u05E9\u05D5\u05DE\u05D4 \u05D6\u05D5?')) return;
    try { await App.apiCall('delete','\u05EA\u05E7\u05E6\u05D9\u05D1',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.budgetInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },
  editBudgetItem(id) {
    var item = this._budgData.find(function(r){ return (r.id||r['\u05DE\u05D6\u05D4\u05D4']||'') == id; });
    if (!item) return;
    document.getElementById('bgf-date').value = item['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '';
    document.getElementById('bgf-cat').value = item['\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4'] || '';
    document.getElementById('bgf-desc').value = item['\u05EA\u05D9\u05D0\u05D5\u05E8'] || '';
    document.getElementById('bgf-amount').value = item['\u05E1\u05DB\u05D5\u05DD'] || '';
    document.getElementById('bgf-vendor').value = item['\u05E1\u05E4\u05E7'] || '';
    this._budgEditId = id;
    new bootstrap.Modal(document.getElementById('budg-modal')).show();
  },
});
