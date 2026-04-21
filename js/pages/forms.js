/* ===== BHT v5.3 — Forms Management ===== */
Object.assign(Pages, {
  forms() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div><h1><i class="bi bi-ui-checks-grid me-2"></i>\u05D8\u05E4\u05E1\u05D9\u05DD</h1><p class="text-muted">\u05E0\u05D9\u05D4\u05D5\u05DC \u05D8\u05E4\u05E1\u05D9\u05DD \u05D3\u05D9\u05D2\u05D9\u05D8\u05DC\u05D9\u05D9\u05DD \u05DC\u05D4\u05D5\u05E8\u05D9\u05DD</p></div>
        <div class="d-flex gap-2">
          <button class="btn btn-primary btn-sm" onclick="Pages.createForm()"><i class="bi bi-plus-lg me-1"></i>\u05D8\u05D5\u05E4\u05E1 \u05D7\u05D3\u05E9</button>
        </div>
      </div>

      <!-- Stats -->
      <div class="row g-3 mb-3">
        <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-primary" id="frm-total">0</div><small class="text-muted">\u05D8\u05E4\u05E1\u05D9\u05DD</small></div></div>
        <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-success" id="frm-active">0</div><small class="text-muted">\u05E4\u05E2\u05D9\u05DC\u05D9\u05DD</small></div></div>
        <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-info" id="frm-responses">0</div><small class="text-muted">\u05EA\u05E9\u05D5\u05D1\u05D5\u05EA</small></div></div>
        <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-warning" id="frm-recent">0</div><small class="text-muted">\u05D4\u05D9\u05D5\u05DD</small></div></div>
      </div>

      <!-- Forms list -->
      <div id="frm-list">${Utils.skeleton(3)}</div>

      <!-- Create/Edit modal -->
      <div class="modal fade" id="frm-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
        <div class="modal-header"><h5 class="modal-title">\u05D8\u05D5\u05E4\u05E1 \u05D7\u05D3\u05E9</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body">
          <div class="row g-3">
            <div class="col-12"><label class="form-label">\u05E9\u05DD \u05D4\u05D8\u05D5\u05E4\u05E1</label><input class="form-control" id="ff-title" placeholder="\u05DC\u05DE\u05E9\u05DC: \u05D8\u05D5\u05E4\u05E1 \u05D4\u05E8\u05E9\u05DE\u05D4 \u05EA\u05E9\u05E4\u05F4\u05D6"></div>
            <div class="col-12"><label class="form-label">\u05EA\u05D9\u05D0\u05D5\u05E8</label><textarea class="form-control" id="ff-desc" rows="2" placeholder="\u05EA\u05D9\u05D0\u05D5\u05E8 \u05E7\u05E6\u05E8 \u05E9\u05DC \u05D4\u05D8\u05D5\u05E4\u05E1"></textarea></div>
            <div class="col-6"><label class="form-label">\u05E1\u05D8\u05D8\u05D5\u05E1</label><select class="form-select" id="ff-status"><option value="\u05E4\u05E2\u05D9\u05DC">\u05E4\u05E2\u05D9\u05DC</option><option value="\u05D8\u05D9\u05D5\u05D8\u05D4">\u05D8\u05D9\u05D5\u05D8\u05D4</option><option value="\u05E1\u05D2\u05D5\u05E8">\u05E1\u05D2\u05D5\u05E8</option></select></div>
            <div class="col-6"><label class="form-label">\u05E6\u05D1\u05E2</label><input type="color" class="form-control form-control-color" id="ff-color" value="#2563eb"></div>
          </div>
        </div>
        <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveForm()">\u05E9\u05DE\u05D9\u05E8\u05D4</button></div>
      </div></div></div>
    `;
  },

  _formsData: [],
  _formsEditId: null,

  async formsInit() {
    // Load forms from data or use demo data
    try {
      this._formsData = await App.getData('\u05D8\u05E4\u05E1\u05D9\u05DD') || [];
    } catch(e) {
      this._formsData = [];
    }

    // If no data, show demo forms
    if (!this._formsData.length) {
      this._formsData = [
        { _id: 'demo', '\u05E9\u05DD': '\u05D8\u05D5\u05E4\u05E1 \u05D4\u05E8\u05E9\u05DE\u05D4 - \u05EA\u05E9\u05E4\u05F4\u05D6', '\u05EA\u05D9\u05D0\u05D5\u05E8': '\u05D8\u05D5\u05E4\u05E1 \u05D4\u05E8\u05E9\u05DE\u05D4 \u05DC\u05DE\u05D5\u05E1\u05D3 \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05E6\u05D1\u05E2': '#2563eb', '\u05EA\u05E9\u05D5\u05D1\u05D5\u05EA': 47, '\u05EA\u05D0\u05E8\u05D9\u05DA': '2026-04-01' },
        { _id: 'trip1', '\u05E9\u05DD': '\u05D0\u05D9\u05E9\u05D5\u05E8 \u05D8\u05D9\u05D5\u05DC \u05E9\u05E0\u05EA\u05D9', '\u05EA\u05D9\u05D0\u05D5\u05E8': '\u05D0\u05D9\u05E9\u05D5\u05E8 \u05D4\u05E9\u05EA\u05EA\u05E4\u05D5\u05EA \u05D1\u05D8\u05D9\u05D5\u05DC \u05D4\u05E9\u05E0\u05EA\u05D9', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05E6\u05D1\u05E2': '#16a34a', '\u05EA\u05E9\u05D5\u05D1\u05D5\u05EA': 23, '\u05EA\u05D0\u05E8\u05D9\u05DA': '2026-04-10' },
        { _id: 'health1', '\u05E9\u05DD': '\u05D4\u05E6\u05D4\u05E8\u05EA \u05D1\u05E8\u05D9\u05D0\u05D5\u05EA', '\u05EA\u05D9\u05D0\u05D5\u05E8': '\u05D4\u05E6\u05D4\u05E8\u05EA \u05D1\u05E8\u05D9\u05D0\u05D5\u05EA \u05E9\u05E0\u05EA\u05D9\u05EA', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E1\u05D2\u05D5\u05E8', '\u05E6\u05D1\u05E2': '#9333ea', '\u05EA\u05E9\u05D5\u05D1\u05D5\u05EA': 65, '\u05EA\u05D0\u05E8\u05D9\u05DA': '2025-09-01' },
        { _id: 'survey1', '\u05E9\u05DD': '\u05E1\u05E7\u05E8 \u05E9\u05D1\u05D9\u05E2\u05D5\u05EA \u05D4\u05D5\u05E8\u05D9\u05DD', '\u05EA\u05D9\u05D0\u05D5\u05E8': '\u05E1\u05E7\u05E8 \u05E9\u05D1\u05D9\u05E2\u05D5\u05EA \u05D4\u05D5\u05E8\u05D9\u05DD \u05DC\u05E9\u05E0\u05EA \u05D4\u05DC\u05D9\u05DE\u05D5\u05D3\u05D9\u05DD', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05D8\u05D9\u05D5\u05D8\u05D4', '\u05E6\u05D1\u05E2': '#f59e0b', '\u05EA\u05E9\u05D5\u05D1\u05D5\u05EA': 12, '\u05EA\u05D0\u05E8\u05D9\u05DA': '2026-03-15' }
      ];
    }

    this.renderForms();
  },

  renderForms() {
    const forms = this._formsData;
    const total = forms.length;
    const active = forms.filter(f => f['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E4\u05E2\u05D9\u05DC').length;
    const responses = forms.reduce((s, f) => s + (parseInt(f['\u05EA\u05E9\u05D5\u05D1\u05D5\u05EA']) || 0), 0);

    document.getElementById('frm-total').textContent = total;
    document.getElementById('frm-active').textContent = active;
    document.getElementById('frm-responses').textContent = responses;
    document.getElementById('frm-recent').textContent = forms.filter(f => {
      const d = f['\u05EA\u05D0\u05E8\u05D9\u05DA'];
      return d && (Date.now() - new Date(d).getTime()) < 86400000;
    }).length;

    if (!forms.length) {
      document.getElementById('frm-list').innerHTML = `<div class="empty-state"><i class="bi bi-ui-checks"></i><h5>\u05D0\u05D9\u05DF \u05D8\u05E4\u05E1\u05D9\u05DD</h5><p>\u05DC\u05D7\u05E5 \u05E2\u05DC "\u05D8\u05D5\u05E4\u05E1 \u05D7\u05D3\u05E9" \u05DC\u05D9\u05E6\u05D9\u05E8\u05EA \u05D4\u05D8\u05D5\u05E4\u05E1 \u05D4\u05E8\u05D0\u05E9\u05D5\u05DF</p></div>`;
      return;
    }

    const statusBadge = (s) => {
      const map = { '\u05E4\u05E2\u05D9\u05DC': 'success', '\u05D8\u05D9\u05D5\u05D8\u05D4': 'secondary', '\u05E1\u05D2\u05D5\u05E8': 'danger' };
      return `<span class="badge bg-${map[s]||'secondary'}">${s||'\u05D8\u05D9\u05D5\u05D8\u05D4'}</span>`;
    };

    document.getElementById('frm-list').innerHTML = forms.map(f => `
      <div class="card mb-3 overflow-hidden hover-lift" style="border-right:4px solid ${f['\u05E6\u05D1\u05E2']||'#2563eb'}">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start">
            <div class="flex-grow-1">
              <h5 class="fw-bold mb-1">${Utils.esc(f['\u05E9\u05DD']||'')}</h5>
              <p class="text-muted small mb-2">${Utils.esc(f['\u05EA\u05D9\u05D0\u05D5\u05E8']||'')}</p>
              <div class="d-flex align-items-center gap-3 small">
                ${statusBadge(f['\u05E1\u05D8\u05D8\u05D5\u05E1'])}
                <span class="text-muted"><i class="bi bi-chat-square-text me-1"></i>${f['\u05EA\u05E9\u05D5\u05D1\u05D5\u05EA']||0} \u05EA\u05E9\u05D5\u05D1\u05D5\u05EA</span>
                ${f['\u05EA\u05D0\u05E8\u05D9\u05DA'] ? `<span class="text-muted"><i class="bi bi-calendar3 me-1"></i>${f['\u05EA\u05D0\u05E8\u05D9\u05DA']}</span>` : ''}
              </div>
            </div>
            <div class="d-flex gap-1">
              <a href="form.html?id=${f._id||'demo'}" target="_blank" class="btn btn-sm btn-outline-primary rounded-pill" title="\u05EA\u05E6\u05D5\u05D2\u05D4 \u05DE\u05E7\u05D3\u05D9\u05DE\u05D4">
                <i class="bi bi-eye me-1"></i>\u05EA\u05E6\u05D5\u05D2\u05D4
              </a>
              <button class="btn btn-sm btn-outline-secondary rounded-pill" onclick="Pages.copyFormLink('${f._id||'demo'}')" title="\u05D4\u05E2\u05EA\u05E7 \u05E7\u05D9\u05E9\u05D5\u05E8">
                <i class="bi bi-link-45deg"></i>
              </button>
              <button class="btn btn-sm btn-outline-success rounded-pill" onclick="Pages.shareFormWhatsApp('${f._id||'demo'}', '${Utils.esc(f['\u05E9\u05DD']||'')}')" title="\u05E9\u05DC\u05D7 \u05D1WhatsApp">
                <i class="bi bi-whatsapp"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  },

  createForm() {
    this._formsEditId = null;
    document.getElementById('ff-title').value = '';
    document.getElementById('ff-desc').value = '';
    document.getElementById('ff-status').value = '\u05E4\u05E2\u05D9\u05DC';
    document.getElementById('ff-color').value = '#2563eb';
    new bootstrap.Modal(document.getElementById('frm-modal')).show();
  },

  async saveForm() {
    const title = document.getElementById('ff-title').value.trim();
    if (!title) { App.toast('\u05E0\u05D0 \u05DC\u05D4\u05D6\u05D9\u05DF \u05E9\u05DD \u05DC\u05D8\u05D5\u05E4\u05E1', 'warning'); return; }
    const form = {
      '\u05E9\u05DD': title,
      '\u05EA\u05D9\u05D0\u05D5\u05E8': document.getElementById('ff-desc').value.trim(),
      '\u05E1\u05D8\u05D8\u05D5\u05E1': document.getElementById('ff-status').value,
      '\u05E6\u05D1\u05E2': document.getElementById('ff-color').value,
      '\u05EA\u05E9\u05D5\u05D1\u05D5\u05EA': 0,
      '\u05EA\u05D0\u05E8\u05D9\u05DA': new Date().toISOString().slice(0,10),
      _id: 'form_' + Date.now()
    };
    this._formsData.push(form);
    this.renderForms();
    bootstrap.Modal.getInstance(document.getElementById('frm-modal'))?.hide();
    App.toast('\u05D4\u05D8\u05D5\u05E4\u05E1 \u05E0\u05D5\u05E6\u05E8 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4', 'success');
  },

  copyFormLink(id) {
    const url = location.origin + location.pathname.replace('index.html','').replace(/#.*$/,'') + 'form.html?id=' + id;
    navigator.clipboard.writeText(url).then(() => {
      App.toast('\u05D4\u05E7\u05D9\u05E9\u05D5\u05E8 \u05D4\u05D5\u05E2\u05EA\u05E7', 'success');
    }).catch(() => {
      prompt('\u05D4\u05E2\u05EA\u05E7 \u05D0\u05EA \u05D4\u05E7\u05D9\u05E9\u05D5\u05E8:', url);
    });
  },

  shareFormWhatsApp(id, name) {
    const url = location.origin + location.pathname.replace('index.html','').replace(/#.*$/,'') + 'form.html?id=' + id;
    const text = encodeURIComponent(`\u05E9\u05DC\u05D5\u05DD,\n\u05E0\u05D0 \u05DC\u05DE\u05DC\u05D0 \u05D0\u05EA \u05D4\u05D8\u05D5\u05E4\u05E1: ${name}\n${url}`);
    window.open('https://wa.me/?text=' + text, '_blank');
  }
});
