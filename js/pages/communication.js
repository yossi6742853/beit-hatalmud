/* ===== BHT v5.3 — Communication ===== */
Object.assign(Pages, {
  /* ======================================================================
     PARENTS
     ====================================================================== */
  parents() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div><h1><i class="bi bi-house-heart-fill me-2"></i>\u05D4\u05D5\u05E8\u05D9\u05DD</h1><p id="par-count"></p></div>
        <div class="d-flex gap-2">
          <button class="btn btn-primary btn-sm" onclick="Pages.showAddParent()"><i class="bi bi-plus-lg me-1"></i>\u05D4\u05D5\u05E1\u05E3</button>
          <button class="btn btn-outline-success btn-sm" onclick="Pages.bulkWhatsApp()"><i class="bi bi-whatsapp me-1"></i>\u05E9\u05DC\u05D9\u05D7\u05D4 \u05E7\u05D1\u05D5\u05E6\u05EA\u05D9\u05EA</button>
        </div>
      </div>
      <div class="card p-3 mb-3"><div class="search-box"><i class="bi bi-search"></i><input type="text" class="form-control" id="par-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05D4\u05D5\u05E8\u05D4..."></div></div>
      <div id="par-list">${Utils.skeleton(3)}</div>
      <div class="modal fade" id="par-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
        <div class="modal-header"><h5 class="modal-title">\u05D4\u05D5\u05E1\u05E4\u05EA \u05D4\u05D5\u05E8\u05D4</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body"><div class="row g-3">
          <div class="col-12"><label class="form-label">\u05E9\u05DD</label><input class="form-control" id="pf-name"></div>
          <div class="col-6"><label class="form-label">\u05E7\u05E9\u05E8</label><select class="form-select" id="pf-relation"><option>\u05D0\u05D1</option><option>\u05D0\u05DD</option><option>\u05D0\u05E4\u05D5\u05D8\u05E8\u05D5\u05E4\u05D5\u05E1</option></select></div>
          <div class="col-6"><label class="form-label">\u05D8\u05DC\u05E4\u05D5\u05DF</label><input class="form-control" id="pf-phone"></div>
          <div class="col-12"><label class="form-label">\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC</label><input class="form-control" id="pf-email"></div>
        </div></div>
        <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveParent()">\u05E9\u05DE\u05D9\u05E8\u05D4</button></div>
      </div></div></div>
    `;
  },
  _parData: [],
  _parEditId: null,
  async parentsInit() {
    this._parData = await App.getData('\u05D4\u05D5\u05E8\u05D9\u05DD');
    document.getElementById('par-search').addEventListener('input', Utils.debounce(() => this.renderParents(), 200));
    this.renderParents();
  },
  renderParents() {
    const search = (document.getElementById('par-search')?.value || '').trim().toLowerCase();
    const filtered = this._parData.filter(p => !search || (p['\u05E9\u05DD']||'').toLowerCase().includes(search) || (p['\u05D8\u05DC\u05E4\u05D5\u05DF']||'').includes(search));
    document.getElementById('par-count').textContent = `${filtered.length} \u05D4\u05D5\u05E8\u05D9\u05DD`;
    if (!filtered.length) { document.getElementById('par-list').innerHTML = '<div class="empty-state"><i class="bi bi-house-heart"></i><h5>\u05D0\u05D9\u05DF \u05D4\u05D5\u05E8\u05D9\u05DD</h5></div>'; return; }
    document.getElementById('par-list').innerHTML = `<div class="card"><table class="table table-bht mb-0"><thead><tr><th>\u05E9\u05DD</th><th>\u05E7\u05E9\u05E8</th><th>\u05D8\u05DC\u05E4\u05D5\u05DF</th><th>\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC</th><th>\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA</th></tr></thead><tbody>${filtered.map(p => {
      const pid = Utils.rowId(p);
      return `<tr><td class="fw-bold"><a href="#parent_card/${pid}" class="text-decoration-none">${p['\u05E9\u05DD']||''}</a></td><td>${p['\u05E7\u05E9\u05E8']||''}</td><td dir="ltr">${Utils.formatPhone(p['\u05D8\u05DC\u05E4\u05D5\u05DF'])}</td><td>${p['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC']||''}</td><td class="text-nowrap">${p['\u05D8\u05DC\u05E4\u05D5\u05DF'] ? `<a href="https://wa.me/972${(p['\u05D8\u05DC\u05E4\u05D5\u05DF']||'').replace(/^0/,'')}" target="_blank" class="btn btn-sm btn-outline-success me-1"><i class="bi bi-whatsapp"></i></a>` : ''}<button class="btn btn-sm btn-outline-primary me-1" onclick="Pages.editParent('${pid}')"><i class="bi bi-pencil"></i></button><button class="btn btn-sm btn-outline-danger" onclick="Pages.deleteParent('${pid}')"><i class="bi bi-trash"></i></button></td></tr>`;
    }).join('')}</tbody></table></div>`;
  },
  showAddParent() { this._parEditId = null; document.getElementById('pf-name').value = ''; document.getElementById('pf-relation').value = '\u05D0\u05D1'; document.getElementById('pf-phone').value = ''; document.getElementById('pf-email').value = ''; document.querySelector('#par-modal .modal-title').textContent = '\u05D4\u05D5\u05E1\u05E4\u05EA \u05D4\u05D5\u05E8\u05D4'; new bootstrap.Modal(document.getElementById('par-modal')).show(); },
  editParent(id) {
    const p = this._parData.find(x => String(Utils.rowId(x)) === String(id));
    if (!p) return;
    this._parEditId = id;
    document.getElementById('pf-name').value = p['\u05E9\u05DD'] || '';
    document.getElementById('pf-relation').value = p['\u05E7\u05E9\u05E8'] || '\u05D0\u05D1';
    document.getElementById('pf-phone').value = p['\u05D8\u05DC\u05E4\u05D5\u05DF'] || '';
    document.getElementById('pf-email').value = p['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC'] || '';
    document.querySelector('#par-modal .modal-title').textContent = '\u05E2\u05E8\u05D9\u05DB\u05EA \u05D4\u05D5\u05E8\u05D4';
    new bootstrap.Modal(document.getElementById('par-modal')).show();
  },
  async saveParent() {
    const row = { '\u05E9\u05DD': document.getElementById('pf-name').value.trim(), '\u05E7\u05E9\u05E8': document.getElementById('pf-relation').value, '\u05D8\u05DC\u05E4\u05D5\u05DF': document.getElementById('pf-phone').value.trim(), '\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC': document.getElementById('pf-email').value.trim() };
    if (!row['\u05E9\u05DD']) { Utils.toast('\u05D7\u05E1\u05E8 \u05E9\u05DD', 'warning'); return; }
    try {
      if (this._parEditId) { await App.apiCall('update', '\u05D4\u05D5\u05E8\u05D9\u05DD', { id: this._parEditId, row }); } else { await App.apiCall('add', '\u05D4\u05D5\u05E8\u05D9\u05DD', { row }); }
      bootstrap.Modal.getInstance(document.getElementById('par-modal')).hide(); Utils.toast(this._parEditId ? '\u05E2\u05D5\u05D3\u05DB\u05DF' : '\u05D4\u05D5\u05E8\u05D4 \u05E0\u05D5\u05E1\u05E3'); this._parEditId = null; this.parentsInit();
    } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4', 'danger'); }
  },
  async deleteParent(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05EA \u05D4\u05D5\u05E8\u05D4', '\u05D4\u05D0\u05DD \u05DC\u05DE\u05D7\u05D5\u05E7 \u05D4\u05D5\u05E8\u05D4 \u05D6\u05D4?')) return;
    try { await App.apiCall('delete', '\u05D4\u05D5\u05E8\u05D9\u05DD', { id }); Utils.toast('\u05D4\u05D5\u05E8\u05D4 \u05E0\u05DE\u05D7\u05E7'); this.parentsInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4', 'danger'); }
  },
  bulkWhatsApp() { const msg = prompt('\u05D4\u05D5\u05D3\u05E2\u05D4 \u05DC\u05DB\u05DC \u05D4\u05D4\u05D5\u05E8\u05D9\u05DD:'); if (!msg) return; let sent=0; this._parData.forEach(p => { if (!p['\u05D8\u05DC\u05E4\u05D5\u05DF']) return; window.open(`https://wa.me/972${p['\u05D8\u05DC\u05E4\u05D5\u05DF'].replace(/^0/,'')}?text=${encodeURIComponent(msg)}`,'_blank'); sent++; }); Utils.toast(`${sent} \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05E0\u05E9\u05DC\u05D7\u05D5`); },


  /* ======================================================================
     PARENT CARD
     ====================================================================== */
  parent_card(id) { return `<div id="parent-card-content">${Utils.skeleton(2)}</div>`; },
  async parent_cardInit(id) {
    const parents = await App.getData('\u05D4\u05D5\u05E8\u05D9\u05DD');
    const p = parents.find(x => String(Utils.rowId(x)) === String(id) || String(x.id) === String(id));
    if (!p) { document.getElementById('parent-card-content').innerHTML = '<div class="empty-state"><i class="bi bi-person-x"></i><h5>\u05D4\u05D5\u05E8\u05D4 \u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0</h5></div>'; return; }
    document.getElementById('parent-card-content').innerHTML = `<a href="#parents" class="btn btn-link text-decoration-none mb-2"><i class="bi bi-arrow-right me-1"></i>\u05D7\u05D6\u05E8\u05D4</a><div class="card p-3"><div class="d-flex align-items-center gap-3 mb-3">${Utils.avatarHTML(p['\u05E9\u05DD'],'lg')}<div><h4 class="fw-bold mb-1">${p['\u05E9\u05DD']||''}</h4><span class="badge bg-secondary">${p['\u05E7\u05E9\u05E8']||''}</span></div></div><div class="row g-3"><div class="col-sm-6"><label class="form-label text-muted small">\u05D8\u05DC\u05E4\u05D5\u05DF</label><div class="fw-bold" dir="ltr">${Utils.formatPhone(p['\u05D8\u05DC\u05E4\u05D5\u05DF'])}</div></div><div class="col-sm-6"><label class="form-label text-muted small">\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC</label><div class="fw-bold">${p['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC']||'--'}</div></div></div></div>`;
  },


  /* ======================================================================
     COMMUNICATIONS
     ====================================================================== */
  communications() {
    return `<div class="page-header"><h1><i class="bi bi-chat-dots me-2"></i>\u05EA\u05E7\u05E9\u05D5\u05E8\u05EA</h1></div>
    <ul class="nav nav-tabs mb-3" id="comm-tabs">
      <li class="nav-item"><a class="nav-link active" href="#" data-comm-tab="history" onclick="Pages._commTab='history';Pages.renderComm();return false"><i class="bi bi-clock-history me-1"></i>\u05D4\u05D9\u05E1\u05D8\u05D5\u05E8\u05D9\u05D4</a></li>
      <li class="nav-item"><a class="nav-link" href="#" data-comm-tab="send" onclick="Pages._commTab='send';Pages.renderComm();return false"><i class="bi bi-send me-1"></i>\u05E9\u05DC\u05D9\u05D7\u05D4</a></li>
      <li class="nav-item"><a class="nav-link" href="#" data-comm-tab="templates" onclick="Pages._commTab='templates';Pages.renderComm();return false"><i class="bi bi-file-earmark-text me-1"></i>\u05EA\u05D1\u05E0\u05D9\u05D5\u05EA</a></li>
    </ul>
    <div id="comm-content">${Utils.skeleton(3)}</div>`;
  },
  _commData: [], _commTab: 'history', _commParents: [], _commStudents: [], _commClasses: [], _commSelectedClasses: new Set(),
  _waTemplates: [
    {title:'\u05D1\u05E8\u05D5\u05DB\u05D9\u05DD \u05D4\u05D1\u05D0\u05D9\u05DD', icon:'bi-emoji-smile', text:'\u05E9\u05DC\u05D5\u05DD {\u05E9\u05DD_\u05D4\u05D5\u05E8\u05D4},\n\u05D1\u05E8\u05D5\u05DB\u05D9\u05DD \u05D4\u05D1\u05D0\u05D9\u05DD \u05DC\u05DE\u05D5\u05E1\u05D3 \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3!\n\u05D1\u05E0\u05DB\u05DD {\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3} \u05D4\u05EA\u05E7\u05D1\u05DC \u05DC\u05DB\u05D9\u05EA\u05D4 {\u05DB\u05D9\u05EA\u05D4}.\n\u05E0\u05E9\u05DE\u05D7 \u05DC\u05E9\u05EA\u05E3 \u05E4\u05E2\u05D5\u05DC\u05D4,\n\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3'},
    {title:'\u05EA\u05D6\u05DB\u05D5\u05E8\u05EA \u05EA\u05E9\u05DC\u05D5\u05DD', icon:'bi-cash', text:'\u05E9\u05DC\u05D5\u05DD {\u05E9\u05DD_\u05D4\u05D5\u05E8\u05D4},\n\u05D6\u05D5\u05D4\u05D9 \u05EA\u05D6\u05DB\u05D5\u05E8\u05EA \u05E2\u05DC \u05EA\u05E9\u05DC\u05D5\u05DD \u05E9\u05DB\u05E8 \u05DC\u05D9\u05DE\u05D5\u05D3 \u05DC\u05D7\u05D5\u05D3\u05E9 \u05D4\u05E0\u05D5\u05DB\u05D7\u05D9.\n\u05E1\u05DB\u05D5\u05DD: {\u05E1\u05DB\u05D5\u05DD}\n\u05E0\u05D0 \u05DC\u05D4\u05E1\u05D3\u05D9\u05E8 \u05D1\u05D4\u05E7\u05D3\u05DD.\n\u05EA\u05D5\u05D3\u05D4,\n\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3'},
    {title:'\u05D4\u05E2\u05D3\u05E8\u05D5\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3', icon:'bi-exclamation-triangle', text:'\u05E9\u05DC\u05D5\u05DD {\u05E9\u05DD_\u05D4\u05D5\u05E8\u05D4},\n\u05E8\u05E6\u05D9\u05E0\u05D5 \u05DC\u05E2\u05D3\u05DB\u05DF \u05E9\u05D1\u05E0\u05DB\u05DD {\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3} \u05DC\u05D0 \u05D4\u05D2\u05D9\u05E2 \u05D4\u05D9\u05D5\u05DD \u05DC\u05DE\u05D5\u05E1\u05D3.\n\u05E0\u05E9\u05DE\u05D7 \u05DC\u05D3\u05E2\u05EA \u05D0\u05DD \u05D4\u05DB\u05DC \u05D1\u05E1\u05D3\u05E8.\n\u05D1\u05D1\u05E8\u05DB\u05D4,\n\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3'},
    {title:'\u05D0\u05D9\u05E8\u05D5\u05E2 \u05E7\u05E8\u05D5\u05D1', icon:'bi-calendar-event', text:'\u05E9\u05DC\u05D5\u05DD,\n\u05DC\u05D9\u05D3\u05D9\u05E2\u05EA\u05DB\u05DD, \u05D0\u05D9\u05E8\u05D5\u05E2 \u05E7\u05E8\u05D5\u05D1 \u05D1\u05DE\u05D5\u05E1\u05D3:\n{\u05D0\u05D9\u05E8\u05D5\u05E2}\n\u05EA\u05D0\u05E8\u05D9\u05DA: {\u05EA\u05D0\u05E8\u05D9\u05DA}\n\u05E0\u05E9\u05DE\u05D7 \u05DC\u05E8\u05D0\u05D5\u05EA\u05DB\u05DD!\n\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3'},
    {title:'\u05E1\u05D9\u05DB\u05D5\u05DD \u05E9\u05D1\u05D5\u05E2\u05D9', icon:'bi-clipboard-data', text:'\u05E9\u05DC\u05D5\u05DD {\u05E9\u05DD_\u05D4\u05D5\u05E8\u05D4},\n\u05E1\u05D9\u05DB\u05D5\u05DD \u05E9\u05D1\u05D5\u05E2\u05D9 \u05E2\u05D1\u05D5\u05E8 {\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3}:\n\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA: {\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA}\n\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA: {\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA}\n\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9 \u05D1\u05D9\u05EA: {\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9\u05DD}\n\u05D1\u05D1\u05E8\u05DB\u05D4,\n\u05E6\u05D5\u05D5\u05EA \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3'},
    {title:'\u05D4\u05D5\u05D3\u05E2\u05EA \u05D7\u05D5\u05E4\u05E9\u05D4', icon:'bi-sun', text:'\u05E9\u05DC\u05D5\u05DD \u05DC\u05D4\u05D5\u05E8\u05D9\u05DD,\n\u05DC\u05D9\u05D3\u05D9\u05E2\u05EA\u05DB\u05DD, \u05D4\u05DE\u05D5\u05E1\u05D3 \u05D9\u05D4\u05D9\u05D4 \u05E1\u05D2\u05D5\u05E8 \u05D1:\n{\u05EA\u05D0\u05E8\u05D9\u05DB\u05D9\u05DD}\n\u05E1\u05D9\u05D1\u05D4: {\u05E1\u05D9\u05D1\u05D4}\n\u05D7\u05D6\u05E8\u05D4 \u05DC\u05DC\u05D9\u05DE\u05D5\u05D3\u05D9\u05DD: {\u05D7\u05D6\u05E8\u05D4}\n\u05D1\u05D1\u05E8\u05DB\u05D4,\n\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3'},
    {title:'\u05D4\u05D5\u05D3\u05E2\u05D4 \u05DB\u05DC\u05DC\u05D9\u05EA', icon:'bi-chat-text', text:'\u05E9\u05DC\u05D5\u05DD \u05DC\u05D4\u05D5\u05E8\u05D9 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9 \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3,\n{\u05D4\u05D5\u05D3\u05E2\u05D4}\n\u05D1\u05D1\u05E8\u05DB\u05D4,\n\u05D4\u05E0\u05D4\u05DC\u05EA \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3'}
  ],
  async communicationsInit() {
    const [commData, students, parents] = await Promise.all([
      App.getData('\u05EA\u05E7\u05E9\u05D5\u05E8\u05EA').catch(() => []),
      App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD').catch(() => []),
      App.getData('\u05D4\u05D5\u05E8\u05D9\u05DD').catch(() => [])
    ]);
    this._commData = commData;
    this._commStudents = students;
    this._commParents = parents;
    // Build class list from students
    const classSet = new Set();
    students.forEach(s => { if (s['\u05DB\u05D9\u05EA\u05D4']) classSet.add(s['\u05DB\u05D9\u05EA\u05D4']); });
    this._commClasses = [...classSet].sort();
    this._commSelectedClasses = new Set();
    this._commTab = 'history';
    this.renderComm();
  },
  renderComm() {
    // Update active tab
    document.querySelectorAll('#comm-tabs .nav-link').forEach(a => {
      a.classList.toggle('active', a.dataset.commTab === this._commTab);
    });
    const el = document.getElementById('comm-content');
    if (this._commTab === 'history') {
      this._renderCommHistory(el);
    } else if (this._commTab === 'send') {
      this._renderCommSend(el);
    } else {
      this._renderCommTemplates(el);
    }
  },
  _renderCommHistory(el) {
    if (!this._commData.length) {
      el.innerHTML = '<div class="empty-state"><i class="bi bi-chat-dots"></i><h5>\u05D0\u05D9\u05DF \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05E9\u05E0\u05E9\u05DC\u05D7\u05D5</h5><p class="text-muted">\u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05E9\u05EA\u05E9\u05DC\u05D7\u05D5 \u05D9\u05D5\u05E4\u05D9\u05E2\u05D5 \u05DB\u05D0\u05DF</p></div>';
      return;
    }
    const rows = this._commData.map(r => {
      const status = r['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '\u05D8\u05D9\u05D5\u05D8\u05D4';
      const badgeClass = status === '\u05E0\u05E9\u05DC\u05D7' ? 'success' : 'secondary';
      return `<tr>
        <td>${r['\u05EA\u05D0\u05E8\u05D9\u05DA'] || ''}</td>
        <td>${r['\u05E0\u05DE\u05E2\u05E0\u05D9\u05DD'] || ''}</td>
        <td class="small text-truncate" style="max-width:250px">${(r['\u05D4\u05D5\u05D3\u05E2\u05D4'] || '').substring(0, 80)}</td>
        <td><span class="badge bg-${badgeClass}">${status}</span></td>
      </tr>`;
    }).join('');
    el.innerHTML = `<div class="card"><div class="table-responsive"><table class="table table-bht table-hover mb-0">
      <thead><tr><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05E0\u05DE\u05E2\u05E0\u05D9\u05DD</th><th>\u05EA\u05D5\u05DB\u05DF</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th></tr></thead>
      <tbody>${rows}</tbody></table></div></div>`;
  },
  _renderCommSend(el) {
    const classChecks = this._commClasses.map(c => {
      const checked = this._commSelectedClasses.has(c) ? 'checked' : '';
      return `<div class="form-check form-check-inline">
        <input class="form-check-input comm-class-cb" type="checkbox" value="${c}" id="cc-${c}" ${checked} onchange="Pages._toggleCommClass('${c}')">
        <label class="form-check-label" for="cc-${c}">${c}</label>
      </div>`;
    }).join('');
    const allChecked = this._commSelectedClasses.size === this._commClasses.length && this._commClasses.length > 0 ? 'checked' : '';
    const selectedCount = this._getCommRecipients().length;
    const msgVal = document.getElementById('comm-msg')?.value || '';
    el.innerHTML = `<div class="card p-3">
      <h6 class="mb-2"><i class="bi bi-people me-1"></i>\u05D1\u05D7\u05E8 \u05E0\u05DE\u05E2\u05E0\u05D9\u05DD \u05DC\u05E4\u05D9 \u05DB\u05D9\u05EA\u05D4</h6>
      <div class="mb-3 p-2 border rounded bg-light">
        <div class="form-check form-check-inline border-end pe-3 me-3">
          <input class="form-check-input" type="checkbox" id="cc-all" ${allChecked} onchange="Pages._toggleCommAll(this.checked)">
          <label class="form-check-label fw-bold" for="cc-all">\u05D1\u05D7\u05E8 \u05D4\u05DB\u05DC</label>
        </div>
        ${classChecks}
      </div>
      <div class="mb-2 d-flex justify-content-between align-items-center">
        <span class="badge bg-primary"><i class="bi bi-people-fill me-1"></i>${selectedCount} \u05E0\u05DE\u05E2\u05E0\u05D9\u05DD \u05E0\u05D1\u05D7\u05E8\u05D5</span>
      </div>
      <div class="mb-3">
        <label class="form-label fw-bold">\u05D4\u05D5\u05D3\u05E2\u05D4</label>
        <textarea class="form-control" id="comm-msg" rows="6" placeholder="\u05D4\u05E7\u05DC\u05D3 \u05D4\u05D5\u05D3\u05E2\u05D4 \u05DB\u05D0\u05DF..." oninput="Pages._updateCommCharCount()">${msgVal}</textarea>
        <div class="d-flex justify-content-end mt-1"><small class="text-muted" id="comm-char-count">${msgVal.length} \u05EA\u05D5\u05D5\u05D9\u05DD</small></div>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-success" onclick="Pages.sendComm()"><i class="bi bi-whatsapp me-1"></i>\u05E9\u05DC\u05D7 \u05D1\u05D5\u05D5\u05D0\u05D8\u05E1\u05D0\u05E4</button>
      </div>
    </div>`;
  },
  _renderCommTemplates(el) {
    const cards = this._waTemplates.map((t, i) => {
      const preview = t.text.replace(/\n/g, '<br>').substring(0, 120) + (t.text.length > 120 ? '...' : '');
      return `<div class="col-md-6 col-lg-4">
        <div class="card h-100 border-0 shadow-sm">
          <div class="card-body">
            <h6 class="card-title"><i class="bi ${t.icon} me-1 text-primary"></i>${t.title}</h6>
            <p class="card-text small text-muted" style="min-height:60px">${preview}</p>
          </div>
          <div class="card-footer bg-transparent border-0 pt-0">
            <button class="btn btn-outline-primary btn-sm w-100" onclick="Pages._useCommTemplate(${i})"><i class="bi bi-pencil-square me-1"></i>\u05D4\u05E9\u05EA\u05DE\u05E9</button>
          </div>
        </div>
      </div>`;
    }).join('');
    el.innerHTML = `<div class="row g-3">${cards}</div>`;
  },
  _toggleCommClass(cls) {
    if (this._commSelectedClasses.has(cls)) this._commSelectedClasses.delete(cls);
    else this._commSelectedClasses.add(cls);
    this._renderCommSend(document.getElementById('comm-content'));
  },
  _toggleCommAll(checked) {
    if (checked) this._commClasses.forEach(c => this._commSelectedClasses.add(c));
    else this._commSelectedClasses.clear();
    this._renderCommSend(document.getElementById('comm-content'));
  },
  _getCommRecipients() {
    if (!this._commSelectedClasses.size) return [];
    // Get student IDs for selected classes
    const studentIds = new Set();
    const studentNames = {};
    this._commStudents.forEach(s => {
      if (this._commSelectedClasses.has(s['\u05DB\u05D9\u05EA\u05D4'])) {
        const id = s['\u05DE\u05D6\u05D4\u05D4'] || s['\u05E9\u05DD'];
        studentIds.add(id);
        studentNames[id] = s['\u05E9\u05DD'];
      }
    });
    // Find parents with phones who match those students
    const recipients = [];
    this._commParents.forEach(p => {
      const phone = p['\u05D8\u05DC\u05E4\u05D5\u05DF'];
      if (!phone) return;
      const studentRef = p['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3'] || p['\u05DE\u05D6\u05D4\u05D4_\u05EA\u05DC\u05DE\u05D9\u05D3'] || '';
      if (studentIds.has(studentRef) || studentIds.has(p['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3'])) {
        recipients.push({ name: p['\u05E9\u05DD'] || '', phone, studentName: studentNames[studentRef] || p['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3'] || '' });
      }
    });
    return recipients;
  },
  _updateCommCharCount() {
    const msg = document.getElementById('comm-msg')?.value || '';
    const counter = document.getElementById('comm-char-count');
    if (counter) counter.textContent = msg.length + ' \u05EA\u05D5\u05D5\u05D9\u05DD';
  },
  _useCommTemplate(idx) {
    const tpl = this._waTemplates[idx];
    if (!tpl) return;
    this._commTab = 'send';
    this.renderComm();
    setTimeout(() => {
      const ta = document.getElementById('comm-msg');
      if (ta) { ta.value = tpl.text; this._updateCommCharCount(); }
    }, 50);
  },
  async sendComm() {
    const msg = document.getElementById('comm-msg')?.value?.trim();
    if (!msg) { Utils.toast('\u05D4\u05E7\u05DC\u05D3 \u05D4\u05D5\u05D3\u05E2\u05D4', 'warning'); return; }
    const recipients = this._getCommRecipients();
    // If no class selected, send to ALL parents
    let targets = recipients;
    if (!targets.length) {
      targets = this._commParents.filter(p => p['\u05D8\u05DC\u05E4\u05D5\u05DF']).map(p => ({ name: p['\u05E9\u05DD'] || '', phone: p['\u05D8\u05DC\u05E4\u05D5\u05DF'], studentName: '' }));
    }
    if (!targets.length) { Utils.toast('\u05D0\u05D9\u05DF \u05E0\u05DE\u05E2\u05E0\u05D9\u05DD \u05E2\u05DD \u05D8\u05DC\u05E4\u05D5\u05DF', 'warning'); return; }
    let sent = 0;
    targets.forEach(t => {
      const phone = t.phone.replace(/[-\s]/g, '').replace(/^0/, '972');
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
      sent++;
    });
    // Save to history
    try {
      const now = new Date();
      const dateStr = now.toLocaleDateString('he-IL');
      const recipientStr = this._commSelectedClasses.size ? [...this._commSelectedClasses].join(', ') : '\u05DB\u05DC \u05D4\u05D4\u05D5\u05E8\u05D9\u05DD';
      await App.apiCall('add', '\u05EA\u05E7\u05E9\u05D5\u05E8\u05EA', {
        '\u05EA\u05D0\u05E8\u05D9\u05DA': dateStr,
        '\u05E0\u05DE\u05E2\u05E0\u05D9\u05DD': recipientStr,
        '\u05D4\u05D5\u05D3\u05E2\u05D4': msg.substring(0, 200),
        '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E0\u05E9\u05DC\u05D7'
      });
      this._commData.unshift({
        '\u05EA\u05D0\u05E8\u05D9\u05DA': dateStr,
        '\u05E0\u05DE\u05E2\u05E0\u05D9\u05DD': recipientStr,
        '\u05D4\u05D5\u05D3\u05E2\u05D4': msg.substring(0, 200),
        '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E0\u05E9\u05DC\u05D7'
      });
    } catch(e) { /* silent */ }
    Utils.toast(`${sent} \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05E0\u05E9\u05DC\u05D7\u05D5`);
  },


  /* ======================================================================
     AI ASSISTANT
     ====================================================================== */
  ai_assistant() {
    return `
    <div class="page-header"><h1><i class="bi bi-robot me-2"></i>\u05E2\u05D5\u05D6\u05E8 \u05D7\u05DB\u05DD</h1><p>\u05E9\u05D0\u05DC \u05E9\u05D0\u05DC\u05D5\u05EA \u05E2\u05DC \u05D4\u05DE\u05D5\u05E1\u05D3, \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD, \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA, \u05DB\u05E1\u05E4\u05D9\u05DD \u05D5\u05E2\u05D5\u05D3</p></div>
    <div class="row g-3">
      <div class="col-lg-8">
        <div class="card p-3">
          <div id="ai-chat" style="height:450px;overflow-y:auto;border:1px solid var(--bht-border);border-radius:12px;padding:1rem;background:var(--bht-body-bg)">
            <div class="text-center py-4">
              <i class="bi bi-robot fs-1 text-primary"></i>
              <h5 class="mt-2">\u05E9\u05DC\u05D5\u05DD! \u05D0\u05E0\u05D9 \u05D4\u05E2\u05D5\u05D6\u05E8 \u05D4\u05D7\u05DB\u05DD \u05E9\u05DC \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3</h5>
              <p class="text-muted small">\u05E9\u05D0\u05DC \u05D0\u05D5\u05EA\u05D9 \u05E2\u05DC \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA, \u05DB\u05E1\u05E4\u05D9\u05DD, \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD, \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD \u05D5\u05E2\u05D5\u05D3</p>
            </div>
          </div>
          <div class="input-group mt-3">
            <input type="text" class="form-control form-control-lg" id="ai-input" placeholder="\u05D4\u05E7\u05DC\u05D3 \u05E9\u05D0\u05DC\u05D4..." onkeydown="if(event.key==='Enter')Pages.sendAi()">
            <button class="btn btn-primary px-4" onclick="Pages.sendAi()"><i class="bi bi-send-fill"></i></button>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card p-3">
          <h6 class="fw-bold mb-3"><i class="bi bi-lightbulb me-2 text-warning"></i>\u05E9\u05D0\u05DC\u05D5\u05EA \u05DC\u05D3\u05D5\u05D2\u05DE\u05D4</h6>
          <div class="d-grid gap-2">
            <button class="btn btn-outline-primary btn-sm text-start" onclick="Pages.askSample('\u05DB\u05DE\u05D4 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05D9\u05E9 \u05D1\u05DE\u05D5\u05E1\u05D3?')"><i class="bi bi-people me-2"></i>\u05DB\u05DE\u05D4 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05D9\u05E9 \u05D1\u05DE\u05D5\u05E1\u05D3?</button>
            <button class="btn btn-outline-success btn-sm text-start" onclick="Pages.askSample('\u05DE\u05D4 \u05DE\u05E6\u05D1 \u05D4\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D4\u05E9\u05D1\u05D5\u05E2?')"><i class="bi bi-calendar-check me-2"></i>\u05DE\u05D4 \u05DE\u05E6\u05D1 \u05D4\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D4\u05E9\u05D1\u05D5\u05E2?</button>
            <button class="btn btn-outline-danger btn-sm text-start" onclick="Pages.askSample('\u05DB\u05DE\u05D4 \u05D7\u05D5\u05D1\u05D5\u05EA \u05E4\u05EA\u05D5\u05D7\u05D9\u05DD \u05D9\u05E9?')"><i class="bi bi-cash me-2"></i>\u05DB\u05DE\u05D4 \u05D7\u05D5\u05D1\u05D5\u05EA \u05E4\u05EA\u05D5\u05D7\u05D9\u05DD \u05D9\u05E9?</button>
            <button class="btn btn-outline-warning btn-sm text-start" onclick="Pages.askSample('\u05EA\u05DF \u05E1\u05D9\u05DB\u05D5\u05DD \u05DB\u05DC\u05DC\u05D9 \u05E9\u05DC \u05D4\u05DE\u05D5\u05E1\u05D3')"><i class="bi bi-bar-chart me-2"></i>\u05EA\u05DF \u05E1\u05D9\u05DB\u05D5\u05DD \u05DB\u05DC\u05DC\u05D9</button>
            <button class="btn btn-outline-info btn-sm text-start" onclick="Pages.askSample('\u05DE\u05D9 \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05E2\u05DD \u05D4\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D4\u05E0\u05DE\u05D5\u05DB\u05D4?')"><i class="bi bi-exclamation-triangle me-2"></i>\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05D1\u05E1\u05D9\u05DB\u05D5\u05DF</button>
            <button class="btn btn-outline-secondary btn-sm text-start" onclick="Pages.askSample('\u05EA\u05DB\u05D9\u05DF \u05D3\u05D5\u05D7 \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA')"><i class="bi bi-star me-2"></i>\u05D3\u05D5\u05D7 \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</button>
          </div>
        </div>
        <div class="card p-3 mt-3">
          <h6 class="fw-bold mb-2"><i class="bi bi-clock-history me-2"></i>\u05D4\u05D9\u05E1\u05D8\u05D5\u05E8\u05D9\u05D4</h6>
          <button class="btn btn-outline-danger btn-sm" onclick="Pages.clearAiChat()"><i class="bi bi-trash me-1"></i>\u05E0\u05E7\u05D4 \u05E9\u05D9\u05D7\u05D4</button>
        </div>
      </div>
    </div>`;
  },
  _aiHistory: [],
  ai_assistantInit() {
    document.getElementById('ai-input')?.focus();
    try {
      this._aiHistory = JSON.parse(sessionStorage.getItem('bht_ai_history') || '[]');
      if (this._aiHistory.length) {
        const chat = document.getElementById('ai-chat');
        chat.innerHTML = this._aiHistory.map(m =>
          m.role === 'user'
            ? `<div class="d-flex justify-content-start mb-3"><div class="bg-primary text-white rounded-3 p-2 px-3" style="max-width:80%">${m.text}</div></div>`
            : `<div class="d-flex justify-content-end mb-3"><div class="bg-light rounded-3 p-2 px-3 border" style="max-width:85%">${m.text}</div></div>`
        ).join('');
        chat.scrollTop = chat.scrollHeight;
      }
    } catch(e) {}
  },
  askSample(q) { document.getElementById('ai-input').value = q; this.sendAi(); },
  clearAiChat() { this._aiHistory = []; sessionStorage.removeItem('bht_ai_history'); document.getElementById('ai-chat').innerHTML = '<div class="text-center py-4 text-muted"><i class="bi bi-robot fs-1"></i><p>\u05E9\u05D9\u05D7\u05D4 \u05E0\u05D5\u05E7\u05EA\u05D4</p></div>'; },
  async sendAi() {
    const input = document.getElementById('ai-input');
    const q = input?.value?.trim();
    if (!q) return;
    input.value = '';
    const chat = document.getElementById('ai-chat');

    // Remove welcome message
    const welcome = chat.querySelector('.text-center.py-4');
    if (welcome) welcome.remove();

    // Add user message
    chat.innerHTML += `<div class="d-flex justify-content-start mb-3"><div class="bg-primary text-white rounded-3 p-2 px-3" style="max-width:80%">${q}</div></div>`;
    this._aiHistory.push({role:'user', text:q});

    // Add loading
    const loadingId = 'ai-loading-' + Date.now();
    chat.innerHTML += `<div class="d-flex justify-content-end mb-3" id="${loadingId}"><div class="bg-light rounded-3 p-2 px-3 border"><div class="spinner-border spinner-border-sm text-primary me-2"></div>\u05D7\u05D5\u05E9\u05D1...</div></div>`;
    chat.scrollTop = chat.scrollHeight;

    try {
      // Build context from real data
      const [students, att, fin, beh, staff] = await Promise.all([
        App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD').catch(()=>[]),
        App.getData('\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA').catch(()=>[]),
        App.getData('\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3').catch(()=>[]),
        App.getData('\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA').catch(()=>[]),
        App.getData('\u05E6\u05D5\u05D5\u05EA').catch(()=>[])
      ]);

      const active = students.filter(s => (s['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') !== '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC');
      const todayAtt = att.filter(a => a['\u05EA\u05D0\u05E8\u05D9\u05DA'] === Utils.todayISO());
      const present = todayAtt.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E0\u05D5\u05DB\u05D7').length;
      const totalFin = fin.reduce((s,f) => s+(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0), 0);
      const paidFin = fin.filter(f => (f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05E9\u05D5\u05DC\u05DD').reduce((s,f) => s+(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0), 0);
      const posB = beh.filter(b => b['\u05E1\u05D5\u05D2']==='\u05D7\u05D9\u05D5\u05D1\u05D9').length;
      const negB = beh.filter(b => b['\u05E1\u05D5\u05D2']==='\u05E9\u05DC\u05D9\u05DC\u05D9').length;

      const context = '\u05D0\u05EA\u05D4 \u05E2\u05D5\u05D6\u05E8 AI \u05E9\u05DC \u05DE\u05D5\u05E1\u05D3 \u05D7\u05D9\u05E0\u05D5\u05DB\u05D9 "\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3". \u05E2\u05E0\u05D4 \u05D1\u05E2\u05D1\u05E8\u05D9\u05EA \u05D1\u05E6\u05D5\u05E8\u05D4 \u05DE\u05D5\u05E2\u05D9\u05DC\u05D4 \u05D5\u05EA\u05DE\u05E6\u05D9\u05EA\u05D9\u05EA.\n\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05E2\u05D3\u05DB\u05E0\u05D9\u05D9\u05DD:\n- ' + active.length + ' \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05E4\u05E2\u05D9\u05DC\u05D9\u05DD\n- ' + staff.length + ' \u05D0\u05E0\u05E9\u05D9 \u05E6\u05D5\u05D5\u05EA\n- \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D4\u05D9\u05D5\u05DD: ' + present + '/' + (todayAtt.length || active.length) + ' (' + (todayAtt.length ? Math.round(present/todayAtt.length*100) : 0) + '%)\n- \u05DB\u05E1\u05E4\u05D9\u05DD: \u05E1\u05D4"\u05DB ' + totalFin + ' \u05E9"\u05D7, \u05E0\u05D2\u05D1\u05D4 ' + paidFin + ' \u05E9"\u05D7, \u05D7\u05D5\u05D1 ' + (totalFin-paidFin) + ' \u05E9"\u05D7\n- \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA: ' + posB + ' \u05D7\u05D9\u05D5\u05D1\u05D9, ' + negB + ' \u05E9\u05DC\u05D9\u05DC\u05D9\n- \u05DB\u05D9\u05EA\u05D5\u05EA: ' + [...new Set(active.map(s=>s['\u05DB\u05D9\u05EA\u05D4']).filter(Boolean))].join(', ');

      // Call Gemini API
      const apiKey = 'AIzaSyB4slohbaWuVF1Fb4hUEKxR3Kxu2ItonWY';
      const models = ['gemini-2.0-flash','gemini-1.5-flash','gemini-1.5-pro'];
      let response = null;

      for (const model of models) {
        try {
          const resp = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent?key=' + apiKey, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
              contents: [{parts:[{text: context + '\n\n\u05E9\u05D0\u05DC\u05EA \u05D4\u05DE\u05E9\u05EA\u05DE\u05E9: ' + q}]}],
              generationConfig: {temperature:0.7, maxOutputTokens:1024}
            })
          });
          if (!resp.ok) continue;
          const json = await resp.json();
          response = json.candidates?.[0]?.content?.parts?.[0]?.text;
          if (response) break;
        } catch(e) { continue; }
      }

      if (!response) response = '\u05DC\u05D0 \u05D4\u05E6\u05DC\u05D7\u05EA\u05D9 \u05DC\u05E7\u05D1\u05DC \u05EA\u05E9\u05D5\u05D1\u05D4. \u05E0\u05E1\u05D4 \u05E9\u05D5\u05D1.';

      // Format response (convert **bold** to <strong>, newlines to <br>)
      const formatted = response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');

      const el = document.getElementById(loadingId);
      if (el) el.innerHTML = '<div class="bg-light rounded-3 p-2 px-3 border" style="max-width:85%">' + formatted + '</div>';

      this._aiHistory.push({role:'ai', text:formatted});
      sessionStorage.setItem('bht_ai_history', JSON.stringify(this._aiHistory));
    } catch(e) {
      const el = document.getElementById(loadingId);
      if (el) el.innerHTML = '<div class="bg-danger bg-opacity-10 text-danger rounded-3 p-2 px-3 border border-danger" style="max-width:85%">\u05E9\u05D2\u05D9\u05D0\u05D4: ' + (e.message || '\u05DC\u05D0 \u05E0\u05D9\u05EA\u05DF \u05DC\u05D4\u05EA\u05D7\u05D1\u05E8') + '</div>';
    }
    chat.scrollTop = chat.scrollHeight;
  },


  /* ======================================================================
     FORMS
     ====================================================================== */
  /* --- Form Builder State --- */
  _formsData: [],
  _formResponses: [],
  _formsTab: 'list',
  _editingForm: null,
  _formFields: [],
  _formColors: ['#4285f4','#34a853','#ea4335','#fbbc04','#673ab7','#ff6d00'],
  _fieldTypes: [
    {value:'text', label:'\u05D8\u05E7\u05E1\u05D8', icon:'bi-type'},
    {value:'textarea', label:'\u05D8\u05E7\u05E1\u05D8 \u05D0\u05E8\u05D5\u05DA', icon:'bi-text-paragraph'},
    {value:'select', label:'\u05D1\u05D7\u05D9\u05E8\u05D4', icon:'bi-list-ul'},
    {value:'checkbox', label:'\u05EA\u05D9\u05D1\u05EA \u05E1\u05D9\u05DE\u05D5\u05DF', icon:'bi-check-square'},
    {value:'date', label:'\u05EA\u05D0\u05E8\u05D9\u05DA', icon:'bi-calendar-date'},
    {value:'number', label:'\u05DE\u05E1\u05E4\u05E8', icon:'bi-123'},
    {value:'email', label:'\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC', icon:'bi-envelope'},
    {value:'phone', label:'\u05D8\u05DC\u05E4\u05D5\u05DF', icon:'bi-telephone'},
    {value:'rating', label:'\u05D3\u05D9\u05E8\u05D5\u05D2 1-5', icon:'bi-star'},
    {value:'yesno', label:'\u05DB\u05DF/\u05DC\u05D0', icon:'bi-toggle-on'}
  ],

  _builtInForms: [
    {title:'\u05D0\u05D9\u05E9\u05D5\u05E8 \u05D4\u05D5\u05E8\u05D9\u05DD \u05DC\u05D8\u05D9\u05D5\u05DC', color:'#2563eb', fields:[
      {type:'text',label:'\u05E9\u05DD \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3',required:true},
      {type:'text',label:'\u05DB\u05D9\u05EA\u05D4',required:true},
      {type:'text',label:'\u05E9\u05DD \u05D4\u05D4\u05D5\u05E8\u05D4',required:true},
      {type:'text',label:'\u05D8\u05DC\u05E4\u05D5\u05DF \u05D4\u05D5\u05E8\u05D4',required:true},
      {type:'text',label:'\u05D9\u05E2\u05D3 \u05D4\u05D8\u05D9\u05D5\u05DC',required:true},
      {type:'date',label:'\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05D8\u05D9\u05D5\u05DC',required:true},
      {type:'yesno',label:'\u05D0\u05E0\u05D9 \u05DE\u05D0\u05E9\u05E8/\u05EA \u05D0\u05EA \u05D4\u05E9\u05EA\u05EA\u05E4\u05D5\u05EA \u05D1\u05E0\u05D9/\u05D1\u05EA\u05D9 \u05D1\u05D8\u05D9\u05D5\u05DC',required:true},
      {type:'textarea',label:'\u05D4\u05E2\u05E8\u05D5\u05EA \u05D1\u05E8\u05D9\u05D0\u05D5\u05EA\u05D9\u05D5\u05EA / \u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA'},
      {type:'text',label:'\u05E9\u05DD \u05DE\u05DC\u05D0 (\u05D7\u05EA\u05D9\u05DE\u05D4 \u05D3\u05D9\u05D2\u05D9\u05D8\u05DC\u05D9\u05EA)',required:true}
    ]},
    {title:'\u05D8\u05D5\u05E4\u05E1 \u05D4\u05E8\u05E9\u05DE\u05D4 \u05DC\u05DE\u05D5\u05E1\u05D3', color:'#0f9d58', fields:[
      {type:'text',label:'\u05E9\u05DD \u05E4\u05E8\u05D8\u05D9',required:true},
      {type:'text',label:'\u05E9\u05DD \u05DE\u05E9\u05E4\u05D7\u05D4',required:true},
      {type:'date',label:'\u05EA\u05D0\u05E8\u05D9\u05DA \u05DC\u05D9\u05D3\u05D4',required:true},
      {type:'text',label:'\u05DB\u05EA\u05D5\u05D1\u05EA \u05DE\u05D2\u05D5\u05E8\u05D9\u05DD',required:true},
      {type:'text',label:'\u05E9\u05DD \u05D4\u05D0\u05D1',required:true},
      {type:'phone',label:'\u05D8\u05DC\u05E4\u05D5\u05DF \u05D4\u05D0\u05D1',required:true},
      {type:'text',label:'\u05E9\u05DD \u05D4\u05D0\u05DD',required:true},
      {type:'phone',label:'\u05D8\u05DC\u05E4\u05D5\u05DF \u05D4\u05D0\u05DD',required:true},
      {type:'email',label:'\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC'},
      {type:'select',label:'\u05DB\u05D9\u05EA\u05D4 \u05DE\u05D1\u05D5\u05E7\u05E9\u05EA',options:'\u05D0,\u05D1,\u05D2,\u05D3,\u05D4,\u05D5'},
      {type:'textarea',label:'\u05DE\u05D9\u05D3\u05E2 \u05E8\u05E4\u05D5\u05D0\u05D9 \u05D7\u05E9\u05D5\u05D1'},
      {type:'textarea',label:'\u05D4\u05E2\u05E8\u05D5\u05EA \u05E0\u05D5\u05E1\u05E4\u05D5\u05EA'}
    ]},
    {title:'\u05D0\u05D9\u05E9\u05D5\u05E8 \u05E6\u05D9\u05DC\u05D5\u05DD \u05EA\u05DC\u05DE\u05D9\u05D3', color:'#f9ab00', fields:[
      {type:'text',label:'\u05E9\u05DD \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3',required:true},
      {type:'text',label:'\u05DB\u05D9\u05EA\u05D4',required:true},
      {type:'text',label:'\u05E9\u05DD \u05D4\u05D4\u05D5\u05E8\u05D4',required:true},
      {type:'yesno',label:'\u05D0\u05E0\u05D9 \u05DE\u05D0\u05E9\u05E8/\u05EA \u05E6\u05D9\u05DC\u05D5\u05DD \u05D1\u05E0\u05D9/\u05D1\u05EA\u05D9 \u05DC\u05E6\u05E8\u05DB\u05D9 \u05D4\u05DE\u05D5\u05E1\u05D3',required:true},
      {type:'yesno',label:'\u05D0\u05E0\u05D9 \u05DE\u05D0\u05E9\u05E8/\u05EA \u05E4\u05E8\u05E1\u05D5\u05DD \u05D1\u05E8\u05E9\u05EA\u05D5\u05EA \u05D4\u05D7\u05D1\u05E8\u05EA\u05D9\u05D5\u05EA'},
      {type:'text',label:'\u05D7\u05EA\u05D9\u05DE\u05D4 \u05D3\u05D9\u05D2\u05D9\u05D8\u05DC\u05D9\u05EA',required:true}
    ]},
    {title:'\u05D3\u05D5\u05D7 \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA \u05E9\u05D1\u05D5\u05E2\u05D9', color:'#ea4335', fields:[
      {type:'text',label:'\u05E9\u05DD \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3',required:true},
      {type:'text',label:'\u05DB\u05D9\u05EA\u05D4',required:true},
      {type:'text',label:'\u05E9\u05DD \u05D4\u05DE\u05D7\u05E0\u05DA',required:true},
      {type:'date',label:'\u05E9\u05D1\u05D5\u05E2 \u05DE-\u05EA\u05D0\u05E8\u05D9\u05DA',required:true},
      {type:'rating',label:'\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA \u05DB\u05DC\u05DC\u05D9\u05EA'},
      {type:'rating',label:'\u05DE\u05E2\u05D5\u05E8\u05D1\u05D5\u05EA \u05D1\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9\u05DD'},
      {type:'rating',label:'\u05D9\u05D7\u05E1\u05D9\u05DD \u05E2\u05DD \u05D7\u05D1\u05E8\u05D9\u05DD'},
      {type:'textarea',label:'\u05D4\u05E2\u05E8\u05D5\u05EA \u05D4\u05DE\u05D7\u05E0\u05DA'},
      {type:'textarea',label:'\u05D4\u05DE\u05DC\u05E6\u05D5\u05EA \u05DC\u05E9\u05D9\u05E4\u05D5\u05E8'}
    ]},
    {title:'\u05D1\u05E7\u05E9\u05EA \u05D7\u05D5\u05E4\u05E9\u05D4', color:'#8b5cf6', fields:[
      {type:'text',label:'\u05E9\u05DD \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3',required:true},
      {type:'text',label:'\u05DB\u05D9\u05EA\u05D4',required:true},
      {type:'text',label:'\u05E9\u05DD \u05D4\u05D4\u05D5\u05E8\u05D4',required:true},
      {type:'date',label:'\u05DE\u05EA\u05D0\u05E8\u05D9\u05DA',required:true},
      {type:'date',label:'\u05E2\u05D3 \u05EA\u05D0\u05E8\u05D9\u05DA',required:true},
      {type:'select',label:'\u05E1\u05D9\u05D1\u05D4',options:'\u05DE\u05D7\u05DC\u05D4,\u05D0\u05D9\u05E8\u05D5\u05E2 \u05DE\u05E9\u05E4\u05D7\u05EA\u05D9,\u05D8\u05D9\u05D5\u05DC,\u05D0\u05D7\u05E8'},
      {type:'textarea',label:'\u05E4\u05D9\u05E8\u05D5\u05D8'},
      {type:'phone',label:'\u05D8\u05DC\u05E4\u05D5\u05DF \u05DC\u05D9\u05E6\u05D9\u05E8\u05EA \u05E7\u05E9\u05E8',required:true}
    ]}
  ],

  forms() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div><h1><i class="bi bi-ui-checks me-2"></i>\u05D8\u05E4\u05E1\u05D9\u05DD</h1></div>
        <button class="btn btn-primary btn-sm" onclick="Pages.showFormTemplates()"><i class="bi bi-plus-lg me-1"></i>\u05E6\u05D5\u05E8 \u05D8\u05D5\u05E4\u05E1 \u05D7\u05D3\u05E9</button>
      </div>

      <!-- Tabs -->
      <ul class="nav nav-tabs mb-3" id="forms-tabs">
        <li class="nav-item"><a class="nav-link active" href="#" onclick="Pages.switchFormsTab('list');return false"><i class="bi bi-collection me-1"></i>\u05D8\u05E4\u05E1\u05D9\u05DD \u05E9\u05DC\u05D9</a></li>
        <li class="nav-item"><a class="nav-link" href="#" onclick="Pages.switchFormsTab('responses');return false"><i class="bi bi-inbox me-1"></i>\u05EA\u05E9\u05D5\u05D1\u05D5\u05EA</a></li>
      </ul>

      <div id="forms-content">${Utils.skeleton(3)}</div>

      <!-- Form Builder Modal (large) -->
      <div class="modal fade" id="form-builder-modal" tabindex="-1"><div class="modal-dialog modal-xl"><div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="form-builder-title">\u05D8\u05D5\u05E4\u05E1 \u05D7\u05D3\u05E9</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <input type="hidden" id="fb-id">
          <div class="row g-3 mb-3">
            <div class="col-md-8">
              <label class="form-label fw-bold">\u05DB\u05D5\u05EA\u05E8\u05EA \u05D4\u05D8\u05D5\u05E4\u05E1</label>
              <input type="text" class="form-control form-control-lg" id="fb-title" placeholder="\u05DB\u05D5\u05EA\u05E8\u05EA \u05D4\u05D8\u05D5\u05E4\u05E1">
            </div>
            <div class="col-md-4">
              <label class="form-label fw-bold">\u05E6\u05D1\u05E2</label>
              <div class="d-flex gap-2" id="fb-colors"></div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">\u05EA\u05D9\u05D0\u05D5\u05E8</label>
            <textarea class="form-control" id="fb-desc" rows="2" placeholder="\u05EA\u05D9\u05D0\u05D5\u05E8 \u05D4\u05D8\u05D5\u05E4\u05E1 (\u05D0\u05D5\u05E4\u05E6\u05D9\u05D5\u05E0\u05DC\u05D9)"></textarea>
          </div>

          <hr>
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h6 class="fw-bold mb-0"><i class="bi bi-list-check me-2"></i>\u05E9\u05D3\u05D5\u05EA</h6>
            <div class="dropdown">
              <button class="btn btn-outline-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown"><i class="bi bi-plus-lg me-1"></i>\u05D4\u05D5\u05E1\u05E3 \u05E9\u05D3\u05D4</button>
              <ul class="dropdown-menu" id="fb-add-field-menu"></ul>
            </div>
          </div>
          <div id="fb-fields-list"></div>
          <div id="fb-fields-empty" class="text-center text-muted py-4" style="display:none">
            <i class="bi bi-arrow-up-circle" style="font-size:2rem"></i>
            <p class="mt-2">\u05DC\u05D7\u05E5 "\u05D4\u05D5\u05E1\u05E3 \u05E9\u05D3\u05D4" \u05DB\u05D3\u05D9 \u05DC\u05D4\u05EA\u05D7\u05D9\u05DC</p>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button>
          <button class="btn btn-success" onclick="Pages.saveForm(false)"><i class="bi bi-save me-1"></i>\u05E9\u05DE\u05D9\u05E8\u05D4 (\u05D8\u05D9\u05D5\u05D8\u05D4)</button>
          <button class="btn btn-primary" onclick="Pages.saveForm(true)"><i class="bi bi-send me-1"></i>\u05E9\u05DE\u05D9\u05E8\u05D4 \u05D5\u05E4\u05E8\u05E1\u05D5\u05DD</button>
        </div>
      </div></div></div>

      <!-- Form Preview Modal -->
      <div class="modal fade" id="form-preview-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">\u05EA\u05E6\u05D5\u05D2\u05D4 \u05DE\u05E7\u05D3\u05D9\u05DE\u05D4</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body" id="form-preview-body"></div>
        <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05E1\u05D2\u05D5\u05E8</button></div>
      </div></div></div>
    `;
  },

  async formsInit() {
    try {
      this._formsData = await App.getData('\u05D8\u05E4\u05E1\u05D9\u05DD');
    } catch(e) { this._formsData = []; }
    this._formsTab = 'list';
    this._renderFormsContent();
  },

  switchFormsTab(tab) {
    this._formsTab = tab;
    document.querySelectorAll('#forms-tabs .nav-link').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('#forms-tabs .nav-link')[tab === 'list' ? 0 : 1].classList.add('active');
    this._renderFormsContent();
  },

  _renderFormsContent() {
    const el = document.getElementById('forms-content');
    if (this._formsTab === 'list') {
      this._renderFormsList(el);
    } else {
      this._renderFormResponses(el);
    }
  },

  _renderFormsList(container) {
    const data = this._formsData;
    if (!data.length) {
      container.innerHTML = '<div class="empty-state"><i class="bi bi-ui-checks"></i><h5>\u05D0\u05D9\u05DF \u05D8\u05E4\u05E1\u05D9\u05DD</h5><p class="text-muted">\u05E6\u05D5\u05E8 \u05D8\u05D5\u05E4\u05E1 \u05D7\u05D3\u05E9 \u05DC\u05D4\u05EA\u05D7\u05D9\u05DC</p></div>';
      return;
    }
    container.innerHTML = `<div class="row g-3">${data.map(f => {
      const id = Utils.rowId(f);
      const title = f['\u05DB\u05D5\u05EA\u05E8\u05EA'] || '\u05D8\u05D5\u05E4\u05E1 \u05DC\u05DC\u05D0 \u05E9\u05DD';
      const desc = f['\u05EA\u05D9\u05D0\u05D5\u05E8'] || '';
      const status = f['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '\u05D8\u05D9\u05D5\u05D8\u05D4';
      const isPublished = status === '\u05E4\u05E2\u05D9\u05DC';
      const color = f['\u05E6\u05D1\u05E2'] || '#4285f4';
      const responseCount = f['\u05EA\u05E9\u05D5\u05D1\u05D5\u05EA'] || 0;
      const created = f['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E6\u05D9\u05E8\u05D4'] || '';
      let fieldsCount = 0;
      try { const fields = JSON.parse(f['\u05E9\u05D3\u05D5\u05EA'] || '[]'); fieldsCount = fields.length; } catch(e) {}
      return `<div class="col-md-6 col-lg-4">
        <div class="card h-100" style="border-top:4px solid ${color}">
          <div class="card-body p-3">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h6 class="fw-bold mb-0">${title}</h6>
              <span class="badge bg-${isPublished ? 'success' : 'secondary'}">${isPublished ? '\u05E4\u05E2\u05D9\u05DC' : '\u05D8\u05D9\u05D5\u05D8\u05D4'}</span>
            </div>
            ${desc ? `<p class="small text-muted mb-2">${desc}</p>` : ''}
            <div class="d-flex gap-3 small text-muted mb-3">
              <span><i class="bi bi-list-check me-1"></i>${fieldsCount} \u05E9\u05D3\u05D5\u05EA</span>
              <span><i class="bi bi-inbox me-1"></i>${responseCount} \u05EA\u05E9\u05D5\u05D1\u05D5\u05EA</span>
              ${created ? `<span><i class="bi bi-calendar me-1"></i>${created}</span>` : ''}
            </div>
          </div>
          <div class="card-footer bg-transparent border-top-0 p-3 pt-0">
            <div class="d-flex gap-1 flex-wrap">
              <button class="btn btn-outline-primary btn-sm" onclick="Pages.editForm('${id}')" title="\u05E2\u05E8\u05D9\u05DB\u05D4"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-outline-info btn-sm" onclick="Pages.previewForm('${id}')" title="\u05EA\u05E6\u05D5\u05D2\u05D4 \u05DE\u05E7\u05D3\u05D9\u05DE\u05D4"><i class="bi bi-eye"></i></button>
              <button class="btn btn-outline-success btn-sm" onclick="Pages.copyFormLink('${id}')" title="\u05D4\u05E2\u05EA\u05E7 \u05E7\u05D9\u05E9\u05D5\u05E8"><i class="bi bi-link-45deg"></i></button>
              <button class="btn btn-outline-danger btn-sm ms-auto" onclick="Pages.deleteForm('${id}')" title="\u05DE\u05D7\u05D9\u05E7\u05D4"><i class="bi bi-trash"></i></button>
            </div>
          </div>
        </div>
      </div>`;
    }).join('')}</div>`;
  },

  _renderFormResponses(container) {
    const forms = this._formsData;
    if (!forms.length) {
      container.innerHTML = '<div class="empty-state"><i class="bi bi-inbox"></i><h5>\u05D0\u05D9\u05DF \u05D8\u05E4\u05E1\u05D9\u05DD</h5><p class="text-muted">\u05E6\u05D5\u05E8 \u05D8\u05D5\u05E4\u05E1 \u05E7\u05D5\u05D3\u05DD</p></div>';
      return;
    }
    container.innerHTML = `
      <div class="card p-3 mb-3">
        <div class="row g-3 align-items-end">
          <div class="col-md-5">
            <label class="form-label fw-bold">\u05D1\u05D7\u05E8 \u05D8\u05D5\u05E4\u05E1</label>
            <select class="form-select" id="resp-form-select" onchange="Pages.loadFormResponses(this.value)">
              <option value="">\u2014 \u05D1\u05D7\u05E8 \u05D8\u05D5\u05E4\u05E1 \u2014</option>
              ${forms.map(f => `<option value="${Utils.rowId(f)}">${f['\u05DB\u05D5\u05EA\u05E8\u05EA'] || '\u05DC\u05DC\u05D0 \u05E9\u05DD'}</option>`).join('')}
            </select>
          </div>
          <div class="col-md-3">
            <span class="badge bg-info" id="resp-count-badge" style="display:none"></span>
          </div>
          <div class="col-md-4 text-start">
            <button class="btn btn-outline-success btn-sm" id="resp-export-btn" onclick="Pages.exportFormResponsesCSV()" style="display:none"><i class="bi bi-download me-1"></i>\u05D9\u05D9\u05E6\u05D5\u05D0 CSV</button>
          </div>
        </div>
      </div>
      <div id="resp-table-container">
        <div class="text-center text-muted py-5"><i class="bi bi-hand-index" style="font-size:2rem"></i><p class="mt-2">\u05D1\u05D7\u05E8 \u05D8\u05D5\u05E4\u05E1 \u05DC\u05E6\u05E4\u05D9\u05D9\u05D4 \u05D1\u05EA\u05E9\u05D5\u05D1\u05D5\u05EA</p></div>
      </div>
    `;
  },

  showFormTemplates() {
    const html = `<div class="modal fade" id="form-templates-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><h5>\u05D1\u05D7\u05E8 \u05EA\u05D1\u05E0\u05D9\u05EA \u05D8\u05D5\u05E4\u05E1</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body">
      <div class="row g-3">
        <div class="col-md-4"><div class="card p-3 text-center card-clickable" onclick="bootstrap.Modal.getInstance(document.getElementById('form-templates-modal')).hide();Pages.showCreateForm()"><i class="bi bi-plus-circle fs-1 text-primary"></i><h6 class="mt-2 fw-bold">\u05D8\u05D5\u05E4\u05E1 \u05E8\u05D9\u05E7</h6><small class="text-muted">\u05D4\u05EA\u05D7\u05DC \u05DE\u05D0\u05E4\u05E1</small></div></div>
        ${this._builtInForms.map((f,i) => `<div class="col-md-4"><div class="card p-3 text-center card-clickable" style="border-top:3px solid ${f.color}" onclick="Pages.useFormTemplate(${i})"><i class="bi bi-file-earmark-text fs-1" style="color:${f.color}"></i><h6 class="mt-2 fw-bold">${f.title}</h6><small class="text-muted">${f.fields.length} \u05E9\u05D3\u05D5\u05EA</small></div></div>`).join('')}
      </div>
    </div></div></div></div>`;
    document.getElementById('form-templates-modal')?.remove();
    document.body.insertAdjacentHTML('beforeend', html);
    new bootstrap.Modal(document.getElementById('form-templates-modal')).show();
  },

  useFormTemplate(idx) {
    bootstrap.Modal.getInstance(document.getElementById('form-templates-modal'))?.hide();
    const tmpl = this._builtInForms[idx];
    this._editingForm = null;
    this._formFields = tmpl.fields.map((f,i) => ({...f, id: 'f'+i}));
    document.getElementById('fb-id').value = '';
    document.getElementById('fb-title').value = tmpl.title;
    document.getElementById('fb-desc').value = '';
    document.getElementById('form-builder-title').textContent = '\u05D8\u05D5\u05E4\u05E1 \u05D7\u05D3\u05E9';
    this._renderColorPicker(tmpl.color);
    this._renderFieldTypeMenu();
    this._renderFormFieldsEditor();
    new bootstrap.Modal(document.getElementById('form-builder-modal')).show();
  },

  showCreateForm() {
    this._editingForm = null;
    this._formFields = [];
    document.getElementById('fb-id').value = '';
    document.getElementById('fb-title').value = '';
    document.getElementById('fb-desc').value = '';
    document.getElementById('form-builder-title').textContent = '\u05D8\u05D5\u05E4\u05E1 \u05D7\u05D3\u05E9';
    this._renderColorPicker('#4285f4');
    this._renderFieldTypeMenu();
    this._renderFormFieldsEditor();
    new bootstrap.Modal(document.getElementById('form-builder-modal')).show();
  },

  editForm(id) {
    const form = this._formsData.find(f => Utils.rowId(f) === id);
    if (!form) { Utils.toast('\u05D8\u05D5\u05E4\u05E1 \u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0', 'danger'); return; }
    this._editingForm = id;
    document.getElementById('fb-id').value = id;
    document.getElementById('fb-title').value = form['\u05DB\u05D5\u05EA\u05E8\u05EA'] || '';
    document.getElementById('fb-desc').value = form['\u05EA\u05D9\u05D0\u05D5\u05E8'] || '';
    document.getElementById('form-builder-title').textContent = '\u05E2\u05E8\u05D9\u05DB\u05EA \u05D8\u05D5\u05E4\u05E1';
    this._renderColorPicker(form['\u05E6\u05D1\u05E2'] || '#4285f4');
    try { this._formFields = JSON.parse(form['\u05E9\u05D3\u05D5\u05EA'] || '[]'); } catch(e) { this._formFields = []; }
    this._renderFieldTypeMenu();
    this._renderFormFieldsEditor();
    new bootstrap.Modal(document.getElementById('form-builder-modal')).show();
  },

  _renderColorPicker(selected) {
    const el = document.getElementById('fb-colors');
    el.innerHTML = this._formColors.map(c =>
      `<div onclick="Pages._selectFormColor('${c}')" class="rounded-circle border border-2 ${c === selected ? 'border-dark' : 'border-transparent'}" style="width:32px;height:32px;background:${c};cursor:pointer" data-color="${c}"></div>`
    ).join('');
    el.dataset.selected = selected;
  },

  _selectFormColor(color) {
    document.getElementById('fb-colors').dataset.selected = color;
    document.querySelectorAll('#fb-colors > div').forEach(d => {
      d.classList.toggle('border-dark', d.dataset.color === color);
      d.classList.toggle('border-transparent', d.dataset.color !== color);
    });
  },

  _renderFieldTypeMenu() {
    document.getElementById('fb-add-field-menu').innerHTML = this._fieldTypes.map(t =>
      `<li><a class="dropdown-item" href="#" onclick="Pages.addFormField('${t.value}');return false"><i class="bi ${t.icon} me-2"></i>${t.label}</a></li>`
    ).join('');
  },

  addFormField(type) {
    const typeObj = this._fieldTypes.find(t => t.value === type);
    this._formFields.push({
      id: 'f' + Date.now() + Math.random().toString(36).slice(2,6),
      type: type,
      label: typeObj ? typeObj.label : type,
      required: false,
      options: type === 'select' ? ['\u05D0\u05E4\u05E9\u05E8\u05D5\u05EA 1', '\u05D0\u05E4\u05E9\u05E8\u05D5\u05EA 2'] : []
    });
    this._renderFormFieldsEditor();
  },

  removeFormField(idx) {
    this._formFields.splice(idx, 1);
    this._renderFormFieldsEditor();
  },

  moveFormField(idx, dir) {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= this._formFields.length) return;
    const temp = this._formFields[idx];
    this._formFields[idx] = this._formFields[newIdx];
    this._formFields[newIdx] = temp;
    this._renderFormFieldsEditor();
  },

  _renderFormFieldsEditor() {
    const list = document.getElementById('fb-fields-list');
    const empty = document.getElementById('fb-fields-empty');
    if (!this._formFields.length) {
      list.innerHTML = '';
      empty.style.display = '';
      return;
    }
    empty.style.display = 'none';
    list.innerHTML = this._formFields.map((field, idx) => {
      const typeObj = this._fieldTypes.find(t => t.value === field.type);
      const typeName = typeObj ? typeObj.label : field.type;
      const typeIcon = typeObj ? typeObj.icon : 'bi-question-circle';
      const isSelect = field.type === 'select';
      return `
        <div class="card mb-2 border-start border-3" style="border-color:var(--bht-primary,#4285f4)!important">
          <div class="card-body p-3">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div class="d-flex align-items-center gap-2">
                <span class="badge bg-light text-dark"><i class="bi ${typeIcon} me-1"></i>${typeName}</span>
                <span class="text-muted small">#${idx + 1}</span>
              </div>
              <div class="d-flex gap-1">
                <button class="btn btn-sm btn-outline-secondary py-0 px-1" onclick="Pages.moveFormField(${idx},-1)" ${idx === 0 ? 'disabled' : ''} title="\u05D4\u05E2\u05DC\u05D4"><i class="bi bi-arrow-up"></i></button>
                <button class="btn btn-sm btn-outline-secondary py-0 px-1" onclick="Pages.moveFormField(${idx},1)" ${idx === this._formFields.length - 1 ? 'disabled' : ''} title="\u05D4\u05D5\u05E8\u05D3\u05D4"><i class="bi bi-arrow-down"></i></button>
                <button class="btn btn-sm btn-outline-danger py-0 px-1" onclick="Pages.removeFormField(${idx})" title="\u05D4\u05E1\u05E8"><i class="bi bi-x-lg"></i></button>
              </div>
            </div>
            <div class="row g-2">
              <div class="${isSelect ? 'col-md-6' : 'col-md-9'}">
                <input type="text" class="form-control form-control-sm" value="${this._escAttr(field.label)}" placeholder="\u05EA\u05D5\u05D5\u05D9\u05EA \u05D4\u05E9\u05D3\u05D4" onchange="Pages._updateFieldProp(${idx},'label',this.value)">
              </div>
              <div class="col-md-3">
                <div class="form-check form-switch mt-1">
                  <input class="form-check-input" type="checkbox" id="fb-req-${idx}" ${field.required ? 'checked' : ''} onchange="Pages._updateFieldProp(${idx},'required',this.checked)">
                  <label class="form-check-label small" for="fb-req-${idx}">\u05D7\u05D5\u05D1\u05D4</label>
                </div>
              </div>
              ${isSelect ? `<div class="col-md-6">
                <input type="text" class="form-control form-control-sm" value="${this._escAttr((field.options||[]).join(', '))}" placeholder="\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA (\u05DE\u05D5\u05E4\u05E8\u05D3\u05D5\u05EA \u05D1\u05E4\u05E1\u05D9\u05E7)" onchange="Pages._updateFieldOptions(${idx},this.value)">
                <small class="text-muted">\u05D4\u05E4\u05E8\u05D3 \u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA \u05D1\u05E4\u05E1\u05D9\u05E7</small>
              </div>` : ''}
            </div>
          </div>
        </div>`;
    }).join('');
  },

  _escAttr(str) {
    return String(str || '').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  },

  _updateFieldProp(idx, prop, val) {
    if (this._formFields[idx]) this._formFields[idx][prop] = val;
  },

  _updateFieldOptions(idx, val) {
    if (this._formFields[idx]) {
      this._formFields[idx].options = val.split(',').map(s => s.trim()).filter(Boolean);
    }
  },

  async saveForm(publish) {
    const title = document.getElementById('fb-title').value.trim();
    if (!title) { Utils.toast('\u05E0\u05D0 \u05DC\u05D4\u05D6\u05D9\u05DF \u05DB\u05D5\u05EA\u05E8\u05EA \u05DC\u05D8\u05D5\u05E4\u05E1', 'danger'); return; }
    const id = document.getElementById('fb-id').value;
    const color = document.getElementById('fb-colors').dataset.selected || '#4285f4';
    const desc = document.getElementById('fb-desc').value.trim();
    const status = publish ? '\u05E4\u05E2\u05D9\u05DC' : '\u05D8\u05D9\u05D5\u05D8\u05D4';
    const fieldsJson = JSON.stringify(this._formFields);
    const row = {
      '\u05DB\u05D5\u05EA\u05E8\u05EA': title,
      '\u05EA\u05D9\u05D0\u05D5\u05E8': desc,
      '\u05E6\u05D1\u05E2': color,
      '\u05E1\u05D8\u05D8\u05D5\u05E1': status,
      '\u05E9\u05D3\u05D5\u05EA': fieldsJson,
      '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E6\u05D9\u05E8\u05D4': id ? undefined : Utils.formatDate(new Date()),
      '\u05EA\u05E9\u05D5\u05D1\u05D5\u05EA': '0'
    };
    // Remove undefined keys
    Object.keys(row).forEach(k => { if (row[k] === undefined) delete row[k]; });
    try {
      if (id) {
        await App.apiCall('update', '\u05D8\u05E4\u05E1\u05D9\u05DD', { id, row });
      } else {
        await App.apiCall('add', '\u05D8\u05E4\u05E1\u05D9\u05DD', { row });
      }
      bootstrap.Modal.getInstance(document.getElementById('form-builder-modal')).hide();
      Utils.toast(id ? '\u05D8\u05D5\u05E4\u05E1 \u05E2\u05D5\u05D3\u05DB\u05DF' : '\u05D8\u05D5\u05E4\u05E1 \u05E0\u05D5\u05E6\u05E8');
      this.formsInit();
    } catch(e) {
      Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05E9\u05DE\u05D9\u05E8\u05D4', 'danger');
    }
  },

  async deleteForm(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05EA \u05D8\u05D5\u05E4\u05E1', '\u05D4\u05D0\u05DD \u05DC\u05DE\u05D7\u05D5\u05E7 \u05D8\u05D5\u05E4\u05E1 \u05D6\u05D4? \u05DB\u05DC \u05D4\u05EA\u05E9\u05D5\u05D1\u05D5\u05EA \u05D9\u05D9\u05DE\u05D7\u05E7\u05D5.')) return;
    try {
      await App.apiCall('delete', '\u05D8\u05E4\u05E1\u05D9\u05DD', { id });
      Utils.toast('\u05D8\u05D5\u05E4\u05E1 \u05E0\u05DE\u05D7\u05E7');
      this.formsInit();
    } catch(e) {
      Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4', 'danger');
    }
  },

  copyFormLink(id) {
    const form = this._formsData.find(f => Utils.rowId(f) === id);
    const title = form ? (form['\u05DB\u05D5\u05EA\u05E8\u05EA'] || '') : '';
    const link = `${location.origin}${location.pathname}#forms/fill/${id}`;
    navigator.clipboard.writeText(link).then(() => {
      Utils.toast('\u05E7\u05D9\u05E9\u05D5\u05E8 \u05D4\u05D5\u05E2\u05EA\u05E7: ' + title);
    }).catch(() => {
      Utils.toast('\u05DC\u05D0 \u05E0\u05D9\u05EA\u05DF \u05DC\u05D4\u05E2\u05EA\u05D9\u05E7', 'danger');
    });
  },

  previewForm(id) {
    const form = this._formsData.find(f => Utils.rowId(f) === id);
    if (!form) return;
    let fields = [];
    try { fields = JSON.parse(form['\u05E9\u05D3\u05D5\u05EA'] || '[]'); } catch(e) {}
    const color = form['\u05E6\u05D1\u05E2'] || '#4285f4';
    const title = form['\u05DB\u05D5\u05EA\u05E8\u05EA'] || '';
    const desc = form['\u05EA\u05D9\u05D0\u05D5\u05E8'] || '';

    let html = `<div class="p-3 rounded mb-3" style="background:${color};color:#fff">
      <h4 class="mb-1">${title}</h4>
      ${desc ? `<p class="mb-0 opacity-75">${desc}</p>` : ''}
    </div>`;

    if (!fields.length) {
      html += '<p class="text-muted text-center">\u05D0\u05D9\u05DF \u05E9\u05D3\u05D5\u05EA \u05D1\u05D8\u05D5\u05E4\u05E1 \u05D6\u05D4</p>';
    } else {
      html += fields.map(f => {
        const req = f.required ? ' <span class="text-danger">*</span>' : '';
        let input = '';
        switch(f.type) {
          case 'text': input = '<input type="text" class="form-control" disabled>'; break;
          case 'textarea': input = '<textarea class="form-control" rows="3" disabled></textarea>'; break;
          case 'select': input = `<select class="form-select" disabled><option>\u2014 \u05D1\u05D7\u05E8 \u2014</option>${(f.options||[]).map(o=>`<option>${o}</option>`).join('')}</select>`; break;
          case 'checkbox': input = '<div class="form-check"><input class="form-check-input" type="checkbox" disabled><label class="form-check-label">\u05DB\u05DF</label></div>'; break;
          case 'date': input = '<input type="date" class="form-control" disabled>'; break;
          case 'number': input = '<input type="number" class="form-control" disabled>'; break;
          case 'email': input = '<input type="email" class="form-control" disabled dir="ltr">'; break;
          case 'phone': input = '<input type="tel" class="form-control" disabled dir="ltr">'; break;
          case 'rating': input = '<div class="d-flex gap-1">' + [1,2,3,4,5].map(n => `<i class="bi bi-star text-warning" style="font-size:1.5rem;cursor:pointer"></i>`).join('') + '</div>'; break;
          case 'yesno': input = '<div class="btn-group"><button class="btn btn-outline-success btn-sm" disabled>\u05DB\u05DF</button><button class="btn btn-outline-danger btn-sm" disabled>\u05DC\u05D0</button></div>'; break;
          default: input = '<input type="text" class="form-control" disabled>';
        }
        return `<div class="mb-3"><label class="form-label fw-bold">${f.label}${req}</label>${input}</div>`;
      }).join('');
    }
    document.getElementById('form-preview-body').innerHTML = html;
    new bootstrap.Modal(document.getElementById('form-preview-modal')).show();
  },

  async loadFormResponses(formId) {
    const container = document.getElementById('resp-table-container');
    const badge = document.getElementById('resp-count-badge');
    const exportBtn = document.getElementById('resp-export-btn');
    if (!formId) {
      container.innerHTML = '<div class="text-center text-muted py-5"><i class="bi bi-hand-index" style="font-size:2rem"></i><p class="mt-2">\u05D1\u05D7\u05E8 \u05D8\u05D5\u05E4\u05E1 \u05DC\u05E6\u05E4\u05D9\u05D9\u05D4 \u05D1\u05EA\u05E9\u05D5\u05D1\u05D5\u05EA</p></div>';
      badge.style.display = 'none';
      exportBtn.style.display = 'none';
      return;
    }
    container.innerHTML = Utils.skeleton(2);
    try {
      const allResponses = await App.getData('\u05EA\u05E9\u05D5\u05D1\u05D5\u05EA_\u05D8\u05E4\u05E1\u05D9\u05DD');
      this._formResponses = allResponses.filter(r => r['\u05DE\u05D6\u05D4\u05D4_\u05D8\u05D5\u05E4\u05E1'] === formId);
    } catch(e) {
      this._formResponses = [];
    }

    const form = this._formsData.find(f => Utils.rowId(f) === formId);
    let fields = [];
    try { fields = JSON.parse((form || {})['\u05E9\u05D3\u05D5\u05EA'] || '[]'); } catch(e) {}

    badge.textContent = this._formResponses.length + ' \u05EA\u05E9\u05D5\u05D1\u05D5\u05EA';
    badge.style.display = '';
    exportBtn.style.display = '';
    exportBtn.dataset.formId = formId;

    if (!this._formResponses.length) {
      container.innerHTML = '<div class="text-center text-muted py-5"><i class="bi bi-inbox" style="font-size:2rem"></i><p class="mt-2">\u05D0\u05D9\u05DF \u05EA\u05E9\u05D5\u05D1\u05D5\u05EA \u05DC\u05D8\u05D5\u05E4\u05E1 \u05D6\u05D4</p></div>';
      return;
    }

    // Build table
    const fieldLabels = fields.map(f => f.label);
    const headerCols = ['\u05EA\u05D0\u05E8\u05D9\u05DA', '\u05E9\u05DD \u05DE\u05DE\u05DC\u05D0', ...fieldLabels];
    container.innerHTML = `
      <div class="table-responsive">
        <table class="table table-sm table-striped">
          <thead><tr>${headerCols.map(h => `<th>${h}</th>`).join('')}</tr></thead>
          <tbody>${this._formResponses.map(resp => {
            let respData = {};
            try { respData = JSON.parse(resp['\u05EA\u05E9\u05D5\u05D1\u05D5\u05EA'] || '{}'); } catch(e) {}
            const date = resp['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '';
            const name = resp['\u05E9\u05DD'] || '';
            const fieldValues = fields.map(f => {
              const val = respData[f.id] || respData[f.label] || '';
              if (f.type === 'checkbox') return val ? '\u2713' : '\u2717';
              if (f.type === 'rating') return val ? '\u2605'.repeat(Number(val)) : '';
              if (f.type === 'yesno') return val === 'yes' ? '\u05DB\u05DF' : val === 'no' ? '\u05DC\u05D0' : val;
              return val;
            });
            return `<tr><td class="small">${date}</td><td>${name}</td>${fieldValues.map(v => `<td class="small">${v}</td>`).join('')}</tr>`;
          }).join('')}</tbody>
        </table>
      </div>`;
  },

  exportFormResponsesCSV() {
    const formId = document.getElementById('resp-export-btn').dataset.formId;
    const form = this._formsData.find(f => Utils.rowId(f) === formId);
    if (!form || !this._formResponses.length) { Utils.toast('\u05D0\u05D9\u05DF \u05EA\u05E9\u05D5\u05D1\u05D5\u05EA \u05DC\u05D9\u05D9\u05E6\u05D5\u05D0', 'info'); return; }
    let fields = [];
    try { fields = JSON.parse(form['\u05E9\u05D3\u05D5\u05EA'] || '[]'); } catch(e) {}

    const headers = ['\u05EA\u05D0\u05E8\u05D9\u05DA', '\u05E9\u05DD \u05DE\u05DE\u05DC\u05D0', ...fields.map(f => f.label)];
    const rows = this._formResponses.map(resp => {
      let respData = {};
      try { respData = JSON.parse(resp['\u05EA\u05E9\u05D5\u05D1\u05D5\u05EA'] || '{}'); } catch(e) {}
      return [
        resp['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '',
        resp['\u05E9\u05DD'] || '',
        ...fields.map(f => respData[f.id] || respData[f.label] || '')
      ];
    });

    const BOM = '\uFEFF';
    const csvContent = BOM + [headers, ...rows].map(row =>
      row.map(cell => '"' + String(cell).replace(/"/g, '""') + '"').join(',')
    ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (form['\u05DB\u05D5\u05EA\u05E8\u05EA'] || 'form') + '_responses.csv';
    a.click();
    URL.revokeObjectURL(url);
    Utils.toast('\u05E7\u05D5\u05D1\u05E5 CSV \u05D9\u05D5\u05E8\u05D3');
  },
});
