Object.assign(Pages, {
  donations() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-heart-fill me-2"></i>תרומות ותומכים</h1></div><button class="btn btn-primary btn-sm" onclick="Pages.showAddDonation()"><i class="bi bi-plus-lg me-1"></i>תרומה חדשה</button></div>
      <div class="row g-3 mb-3"><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-success" id="don-total">\u20AA0</div><small>סה"כ תרומות</small></div></div><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-primary" id="don-count">0</div><small>תורמים</small></div></div><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold" id="don-month">\u20AA0</div><small>החודש</small></div></div><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-warning" id="don-avg">\u20AA0</div><small>ממוצע לתרומה</small></div></div></div>
      <div id="don-list">${Utils.skeleton(3)}</div>
      <div class="modal fade" id="don-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5>תרומה חדשה</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row g-3"><div class="col-6"><label class="form-label">שם תורם</label><input class="form-control" id="donf-name"></div><div class="col-6"><label class="form-label">סכום</label><input type="number" class="form-control" id="donf-amount"></div><div class="col-6"><label class="form-label">טלפון</label><input class="form-control" id="donf-phone"></div><div class="col-6"><label class="form-label">אמצעי</label><select class="form-select" id="donf-method"><option>מזומן</option><option>העברה</option><option>צ'ק</option><option>אשראי</option></select></div><div class="col-12"><label class="form-label">הערות</label><input class="form-control" id="donf-notes"></div></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">ביטול</button><button class="btn btn-primary" onclick="Pages.saveDonation()">שמור</button></div></div></div></div>`;
  },
  _donData: [
    {name:'\u05E8\' \u05E9\u05DC\u05DE\u05D4 \u05D2\u05D5\u05DC\u05D3\u05D1\u05E8\u05D2',amount:5000,method:'\u05D4\u05E2\u05D1\u05E8\u05D4',date:'2026-04-15',notes:'\u05EA\u05E8\u05D5\u05DE\u05D4 \u05D7\u05D5\u05D3\u05E9\u05D9\u05EA'},
    {name:'\u05DE\u05E9\u05E4\u05D7\u05EA \u05DB\u05D4\u05DF',amount:1000,method:'\u05DE\u05D6\u05D5\u05DE\u05DF',date:'2026-04-10',notes:'\u05DC\u05D6\u05DB\u05E8 \u05D0\u05D1\u05D9\u05D4\u05DD'},
    {name:'\u05E8\' \u05D9\u05E2\u05E7\u05D1 \u05DC\u05D5\u05D9',amount:2500,method:'\u05E6\'\u05E7',date:'2026-03-28',notes:''},
    {name:'\u05E2\u05DE\u05D5\u05EA\u05EA \u05D0\u05D5\u05E8 \u05D4\u05D7\u05D9\u05D9\u05DD',amount:10000,method:'\u05D4\u05E2\u05D1\u05E8\u05D4',date:'2026-03-15',notes:'\u05EA\u05E8\u05D5\u05DE\u05D4 \u05E9\u05E0\u05EA\u05D9\u05EA'},
    {name:'\u05DE\u05E9\u05E4\u05D7\u05EA \u05E4\u05E8\u05D9\u05D3\u05DE\u05DF',amount:500,method:'\u05DE\u05D6\u05D5\u05DE\u05DF',date:'2026-04-01',notes:''}
  ],
  async donationsInit() {
    const total = this._donData.reduce((s,d)=>s+d.amount,0);
    document.getElementById('don-total').textContent = Utils.formatCurrency(total);
    document.getElementById('don-count').textContent = this._donData.length;
    document.getElementById('don-month').textContent = Utils.formatCurrency(this._donData.filter(d=>(d.date||'').startsWith('2026-04')).reduce((s,d)=>s+d.amount,0));
    document.getElementById('don-avg').textContent = Utils.formatCurrency(Math.round(total/this._donData.length));
    document.getElementById('don-list').innerHTML = `<div class="card"><table class="table table-bht mb-0"><thead><tr><th>תורם</th><th>סכום</th><th>אמצעי</th><th>תאריך</th><th>הערות</th></tr></thead><tbody>${this._donData.map(d=>`<tr><td class="fw-bold">${d.name}</td><td class="fw-bold text-success">${Utils.formatCurrency(d.amount)}</td><td><span class="badge bg-secondary">${d.method}</span></td><td>${Utils.formatDateShort(d.date)}</td><td class="small">${d.notes||''}</td></tr>`).join('')}</tbody></table></div>`;
  },
  showAddDonation() { new bootstrap.Modal(document.getElementById('don-modal')).show(); },
  async saveDonation() { Utils.toast('\u05EA\u05E8\u05D5\u05DE\u05D4 \u05E0\u05E9\u05DE\u05E8\u05D4!'); bootstrap.Modal.getInstance(document.getElementById('don-modal'))?.hide(); }
});
