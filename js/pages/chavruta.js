/* ===== BHT v5.3 — Chavruta (חברותות) ===== */
Object.assign(Pages, {
  chavruta() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-person-hearts me-2"></i>\u05D7\u05D1\u05E8\u05D5\u05EA\u05D5\u05EA</h1><p>\u05E9\u05D9\u05D1\u05D5\u05E5 \u05D5\u05E0\u05D9\u05D4\u05D5\u05DC \u05D7\u05D1\u05E8\u05D5\u05EA\u05D5\u05EA \u05DC\u05D9\u05DE\u05D5\u05D3</p></div><button class="btn btn-primary btn-sm" onclick="Pages.showAddChavruta()"><i class="bi bi-plus-lg me-1"></i>\u05D7\u05D1\u05E8\u05D5\u05EA\u05D0 \u05D7\u05D3\u05E9\u05D4</button></div>
    <div class="row g-3 mb-3"><div class="col-md-4"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-primary" id="chav-total">0</div><small>\u05D7\u05D1\u05E8\u05D5\u05EA\u05D5\u05EA</small></div></div><div class="col-md-4"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-success" id="chav-active">0</div><small>\u05E4\u05E2\u05D9\u05DC\u05D5\u05EA</small></div></div><div class="col-md-4"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-warning" id="chav-unmatched">0</div><small>\u05DC\u05DC\u05D0 \u05D7\u05D1\u05E8\u05D5\u05EA\u05D0</small></div></div></div>
    <div id="chav-list">${Utils.skeleton(3)}</div>`;
  },
  _chavData: [],
  async chavrutaInit() {
    const students = await App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD').catch(()=>[]);
    const active = students.filter(s=>(s['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')!=='\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC');
    // Generate demo chavruta pairs
    const pairs = [];
    for (let i = 0; i < active.length - 1; i += 2) {
      pairs.push({student1: Utils.fullName(active[i]), student2: Utils.fullName(active[i+1]), subject: ['\u05D2\u05DE\u05E8\u05D0','\u05D4\u05DC\u05DB\u05D4','\u05DE\u05E9\u05E0\u05D4','\u05D7\u05D5\u05DE\u05E9'][i%4], status: i < 6 ? '\u05E4\u05E2\u05D9\u05DC' : '\u05DC\u05D0 \u05E4\u05E2\u05D9\u05DC'});
    }
    this._chavData = pairs;
    document.getElementById('chav-total').textContent = pairs.length;
    document.getElementById('chav-active').textContent = pairs.filter(p=>p.status==='\u05E4\u05E2\u05D9\u05DC').length;
    document.getElementById('chav-unmatched').textContent = active.length % 2;

    document.getElementById('chav-list').innerHTML = pairs.length ? `<div class="row g-3">${pairs.map(p => `<div class="col-md-6"><div class="card p-3"><div class="d-flex align-items-center gap-3">${Utils.avatarHTML(p.student1,'sm')}<div class="text-center"><i class="bi bi-arrow-left-right text-primary"></i><div class="small text-muted">${p.subject}</div></div>${Utils.avatarHTML(p.student2,'sm')}<div class="flex-grow-1"><div class="fw-bold">${p.student1}</div><div class="fw-bold">${p.student2}</div></div>${Utils.statusBadge(p.status)}</div></div></div>`).join('')}</div>` : '<div class="empty-state"><i class="bi bi-person-hearts"></i><h5>\u05D0\u05D9\u05DF \u05D7\u05D1\u05E8\u05D5\u05EA\u05D5\u05EA</h5></div>';
  },
  showAddChavruta() { Utils.toast('\u05E9\u05D9\u05D1\u05D5\u05E5 \u05D7\u05D1\u05E8\u05D5\u05EA\u05D5\u05EA \u05D0\u05D5\u05D8\u05D5\u05DE\u05D8\u05D9 \u05D1\u05E7\u05E8\u05D5\u05D1','info'); }
});
