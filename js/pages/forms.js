/* ===== BHT v5.3 — Forms Management (טפסים) ===== */
Object.assign(Pages, {
  _formsFieldTypes: [
    { type: 'text', label: 'טקסט', icon: 'bi-fonts', placeholder: 'שדה טקסט חופשי' },
    { type: 'number', label: 'מספר', icon: 'bi-123', placeholder: 'ערך מספרי' },
    { type: 'select', label: 'בחירה', icon: 'bi-list-ul', placeholder: 'רשימת אפשרויות' },
    { type: 'checkbox', label: 'תיבת סימון', icon: 'bi-check-square', placeholder: 'כן/לא' },
    { type: 'radio', label: 'בחירה יחידה', icon: 'bi-record-circle', placeholder: 'בחירת אפשרות אחת' },
    { type: 'date', label: 'תאריך', icon: 'bi-calendar3', placeholder: 'בחירת תאריך' },
    { type: 'textarea', label: 'טקסט ארוך', icon: 'bi-text-paragraph', placeholder: 'טקסט מרובה שורות' },
    { type: 'email', label: 'אימייל', icon: 'bi-envelope', placeholder: 'כתובת מייל' },
    { type: 'phone', label: 'טלפון', icon: 'bi-telephone', placeholder: 'מספר טלפון' },
    { type: 'file', label: 'קובץ', icon: 'bi-paperclip', placeholder: 'העלאת קובץ' }
  ],

  _formsUseDemo: false,

  _formsDemoData: [
    { _id: 'f0', name: '', desc: '', status: '\u05D8\u05D9\u05D5\u05D8\u05D4', color: '#2563eb', date: '',
      fields: [], responses: [] }
  ],

  _formsEditId: null,
  _formsViewId: null,
  _formFields: [],
  _formDragIdx: -1,
  _formsFilter: 'all',
  _formsSearch: '',
  _formsSortBy: 'date',
  _formsRespAllData: [],

  forms() {
    const forms = this._formsData;
    const total = forms.length;
    const active = forms.filter(f => f.status === 'פעיל').length;
    const draft = forms.filter(f => f.status === 'טיוטה').length;
    const closed = forms.filter(f => f.status === 'סגור').length;
    const totalResponses = forms.reduce((s, f) => s + (f.responses ? f.responses.length : 0), 0);
    const todayResponses = forms.reduce((s, f) => {
      return s + (f.responses || []).filter(r => r.date === Utils.todayISO()).length;
    }, 0);
    const avgResponses = total > 0 ? Math.round(totalResponses / total) : 0;
    const totalFields = forms.reduce((s, f) => s + (f.fields ? f.fields.length : 0), 0);

    const statusBadge = (s) => {
      const map = { 'פעיל': 'success', 'טיוטה': 'secondary', 'סגור': 'danger' };
      return `<span class="badge bg-${map[s] || 'secondary'}">${s || 'טיוטה'}</span>`;
    };

    // Filter forms
    let filtered = [...forms];
    if (this._formsFilter !== 'all') {
      filtered = filtered.filter(f => f.status === this._formsFilter);
    }
    if (this._formsSearch) {
      const q = this._formsSearch.toLowerCase();
      filtered = filtered.filter(f => f.name.toLowerCase().includes(q) || (f.desc || '').toLowerCase().includes(q));
    }
    // Sort forms
    if (this._formsSortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name, 'he'));
    } else if (this._formsSortBy === 'responses') {
      filtered.sort((a, b) => (b.responses || []).length - (a.responses || []).length);
    } else {
      filtered.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    }

    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div><h1><i class="bi bi-ui-checks-grid me-2"></i>טפסים</h1><p class="text-muted mb-0">בניית טפסים דיגיטליים, תשובות וניתוח</p></div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-info btn-sm" onclick="Pages._formFromTemplate()"><i class="bi bi-file-earmark-plus me-1"></i>מתבנית</button>
        <button class="btn btn-primary btn-sm" onclick="Pages._formCreate()"><i class="bi bi-plus-lg me-1"></i>טופס חדש</button>
      </div>
    </div>

    <!-- Stats -->
    <div class="row g-3 mb-3">
      <div class="col-6 col-md-2"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-primary">${total}</div><small class="text-muted">טפסים</small></div></div>
      <div class="col-6 col-md-2"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-success">${active}</div><small class="text-muted">פעילים</small></div></div>
      <div class="col-6 col-md-2"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-info">${totalResponses}</div><small class="text-muted">תשובות</small></div></div>
      <div class="col-6 col-md-2"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-warning">${todayResponses}</div><small class="text-muted">היום</small></div></div>
      <div class="col-6 col-md-2"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-secondary">${avgResponses}</div><small class="text-muted">ממוצע/טופס</small></div></div>
      <div class="col-6 col-md-2"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-danger">${totalFields}</div><small class="text-muted">סה"כ שדות</small></div></div>
    </div>

    <!-- Filter & Search Bar -->
    <div class="card p-3 mb-3">
      <div class="row g-2 align-items-center">
        <div class="col-md-4">
          <div class="input-group input-group-sm">
            <span class="input-group-text"><i class="bi bi-search"></i></span>
            <input type="text" class="form-control" id="frm-search-input" placeholder="חיפוש טופס..." value="${this._formsSearch}" oninput="Pages._formsSearch=this.value;App.loadPage('forms')">
          </div>
        </div>
        <div class="col-md-3">
          <div class="btn-group btn-group-sm w-100">
            <button class="btn ${this._formsFilter === 'all' ? 'btn-primary' : 'btn-outline-primary'}" onclick="Pages._formsFilter='all';App.loadPage('forms')">הכל (${total})</button>
            <button class="btn ${this._formsFilter === 'פעיל' ? 'btn-success' : 'btn-outline-success'}" onclick="Pages._formsFilter='פעיל';App.loadPage('forms')">פעיל (${active})</button>
            <button class="btn ${this._formsFilter === 'טיוטה' ? 'btn-secondary' : 'btn-outline-secondary'}" onclick="Pages._formsFilter='טיוטה';App.loadPage('forms')">טיוטה (${draft})</button>
            <button class="btn ${this._formsFilter === 'סגור' ? 'btn-danger' : 'btn-outline-danger'}" onclick="Pages._formsFilter='סגור';App.loadPage('forms')">סגור (${closed})</button>
          </div>
        </div>
        <div class="col-md-3">
          <select class="form-select form-select-sm" onchange="Pages._formsSortBy=this.value;App.loadPage('forms')">
            <option value="date" ${this._formsSortBy === 'date' ? 'selected' : ''}>מיון: תאריך</option>
            <option value="name" ${this._formsSortBy === 'name' ? 'selected' : ''}>מיון: שם</option>
            <option value="responses" ${this._formsSortBy === 'responses' ? 'selected' : ''}>מיון: תשובות</option>
          </select>
        </div>
        <div class="col-md-2 text-end">
          <span class="text-muted small">${filtered.length} מתוך ${total}</span>
        </div>
      </div>
    </div>

    <!-- Forms List -->
    <div id="frm-list">
      ${!filtered.length ? `<div class="empty-state text-center py-5"><i class="bi bi-ui-checks display-1 text-muted"></i><h5 class="mt-3">${this._formsSearch || this._formsFilter !== 'all' ? 'לא נמצאו תוצאות' : 'אין טפסים'}</h5><p class="text-muted">${this._formsSearch || this._formsFilter !== 'all' ? 'נסה לשנות את סינון החיפוש' : 'לחץ על "טופס חדש" ליצירת הטופס הראשון'}</p></div>` :
      filtered.map(f => {
        const respCount = f.responses ? f.responses.length : 0;
        const fieldCount = f.fields ? f.fields.length : 0;
        const lastResp = f.responses && f.responses.length > 0 ? f.responses[f.responses.length - 1].date : '-';
        return `
        <div class="card mb-3 hover-lift" style="border-right:4px solid ${f.color || '#2563eb'}">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start">
              <div class="flex-grow-1">
                <div class="d-flex align-items-center gap-2 mb-1">
                  <h5 class="fw-bold mb-0">${f.name}</h5>
                  ${statusBadge(f.status)}
                </div>
                <p class="text-muted small mb-2">${f.desc}</p>
                <div class="d-flex align-items-center gap-3 small flex-wrap">
                  <span class="text-muted"><i class="bi bi-list-check me-1"></i>${fieldCount} שדות</span>
                  <span class="text-muted"><i class="bi bi-chat-square-text me-1"></i>${respCount} תשובות</span>
                  <span class="text-muted"><i class="bi bi-calendar3 me-1"></i>נוצר: ${f.date}</span>
                  <span class="text-muted"><i class="bi bi-clock-history me-1"></i>אחרון: ${lastResp}</span>
                </div>
                <!-- Field type badges -->
                <div class="d-flex flex-wrap gap-1 mt-2">
                  ${(f.fields || []).slice(0, 6).map(fld => {
                    const ft = typeof fld === 'string' ? { name: fld, type: 'text' } : fld;
                    const typeInfo = Pages._formsFieldTypes.find(t => t.type === ft.type) || { icon: 'bi-fonts', label: ft.type };
                    return `<span class="badge bg-light text-dark border" style="font-size:0.7rem"><i class="${typeInfo.icon} me-1"></i>${ft.name}</span>`;
                  }).join('')}
                  ${(f.fields || []).length > 6 ? `<span class="badge bg-light text-dark border" style="font-size:0.7rem">+${f.fields.length - 6} עוד</span>` : ''}
                </div>
              </div>
              <div class="d-flex flex-column gap-1">
                <button class="btn btn-sm btn-outline-primary rounded-pill" onclick="Pages._formViewResponses('${f._id}')" title="תשובות">
                  <i class="bi bi-eye me-1"></i>${respCount}
                </button>
                <button class="btn btn-sm btn-outline-info rounded-pill" onclick="Pages._formPreview('${f._id}')" title="תצוגה מקדימה">
                  <i class="bi bi-eye-fill"></i>
                </button>
                <button class="btn btn-sm btn-outline-warning rounded-pill" onclick="Pages._formEdit('${f._id}')" title="עריכה">
                  <i class="bi bi-pencil"></i>
                </button>
                <div class="dropdown">
                  <button class="btn btn-sm btn-outline-secondary rounded-pill" data-bs-toggle="dropdown" title="עוד">
                    <i class="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="#" onclick="Pages._formCopyLink('${f._id}');return false"><i class="bi bi-link-45deg me-2"></i>העתק קישור</a></li>
                    <li><a class="dropdown-item" href="#" onclick="Pages._formSharePhone('${f._id}');return false"><i class="bi bi-telephone me-2"></i>\u05E9\u05D9\u05EA\u05D5\u05E3 \u05D1\u05D8\u05DC\u05E4\u05D5\u05DF</a></li>
                    <li><a class="dropdown-item" href="#" onclick="Pages._formShowQR('${f._id}');return false"><i class="bi bi-qr-code me-2"></i>QR Code</a></li>
                    <li><a class="dropdown-item" href="#" onclick="Pages._formShareEmail('${f._id}');return false"><i class="bi bi-envelope me-2"></i>שליחה במייל</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" onclick="Pages._formDuplicate('${f._id}');return false"><i class="bi bi-copy me-2"></i>שכפול טופס</a></li>
                    <li><a class="dropdown-item" href="#" onclick="Pages._formToggleStatus('${f._id}');return false"><i class="bi bi-toggle-on me-2"></i>${f.status === 'פעיל' ? 'סגור' : 'הפעל'} טופס</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item text-danger" href="#" onclick="Pages._formDelete('${f._id}');return false"><i class="bi bi-trash me-2"></i>מחיקה</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;}).join('')}
    </div>

    <!-- Responses Panel (hidden by default) -->
    <div id="frm-responses" class="d-none">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="fw-bold mb-0"><i class="bi bi-chat-square-text me-2"></i>תשובות: <span id="frm-resp-title"></span></h5>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-success btn-sm" onclick="Pages._formExportCSV()"><i class="bi bi-file-earmark-spreadsheet me-1"></i>CSV</button>
          <button class="btn btn-outline-info btn-sm" onclick="Pages._formExportJSON()"><i class="bi bi-filetype-json me-1"></i>JSON</button>
          <button class="btn btn-outline-warning btn-sm" onclick="Pages._formPrintResponses()"><i class="bi bi-printer me-1"></i>הדפסה</button>
          <button class="btn btn-outline-secondary btn-sm" onclick="Pages._formCloseResponses()"><i class="bi bi-arrow-right me-1"></i>חזרה</button>
        </div>
      </div>
      <!-- Response Stats -->
      <div id="frm-resp-stats" class="mb-3"></div>
      <!-- Response Chart Area -->
      <div id="frm-resp-charts" class="mb-3"></div>
      <!-- Daily Response Chart -->
      <div id="frm-resp-timeline" class="mb-3"></div>
      <div class="card">
        <div class="card-body p-2">
          <div class="row g-2 align-items-center">
            <div class="col-md-8"><input type="text" class="form-control form-control-sm" id="frm-resp-search" placeholder="חיפוש תשובה..." oninput="Pages._formSearchResp(this.value)"></div>
            <div class="col-md-4 text-end"><span class="text-muted small" id="frm-resp-count"></span></div>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table table-sm table-hover align-middle mb-0">
            <thead class="table-light" id="frm-resp-head"></thead>
            <tbody id="frm-resp-body"></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Create/Edit Form Modal -->
    <div class="modal fade" id="frm-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
      <div class="modal-header bg-primary bg-opacity-10"><h5 class="modal-title" id="frm-modal-title"><i class="bi bi-plus-circle me-2"></i>טופס חדש</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <div class="row g-3">
          <div class="col-12"><label class="form-label fw-bold">שם הטופס</label><input class="form-control" id="ff-title" placeholder="למשל: טופס הרשמה תשפ&quot;ז"></div>
          <div class="col-12"><label class="form-label fw-bold">תיאור</label><textarea class="form-control" id="ff-desc" rows="2" placeholder="תיאור קצר של הטופס"></textarea></div>
          <div class="col-4"><label class="form-label fw-bold">סטטוס</label>
            <select class="form-select" id="ff-status"><option value="פעיל">פעיל</option><option value="טיוטה">טיוטה</option><option value="סגור">סגור</option></select></div>
          <div class="col-4"><label class="form-label fw-bold">צבע</label><input type="color" class="form-control form-control-color w-100" id="ff-color" value="#2563eb"></div>
          <div class="col-4"></div>
          <div class="col-12">
            <label class="form-label fw-bold">שדות הטופס <span class="text-muted fw-normal small">(גרור לשינוי סדר)</span></label>
            <div id="ff-fields-list" class="mb-3" style="min-height:40px"></div>

            <div class="card p-3 bg-light">
              <h6 class="fw-bold mb-2"><i class="bi bi-plus-circle me-1"></i>הוספת שדה</h6>
              <div class="row g-2">
                <div class="col-md-4"><input type="text" class="form-control form-control-sm" id="ff-new-field" placeholder="שם השדה"></div>
                <div class="col-md-3">
                  <select class="form-select form-select-sm" id="ff-new-type" onchange="Pages._formToggleOptions(this.value)">
                    ${this._formsFieldTypes.map(ft => `<option value="${ft.type}">${ft.label}</option>`).join('')}
                  </select>
                </div>
                <div class="col-md-3"><input type="text" class="form-control form-control-sm" id="ff-new-options" placeholder="אפשרויות (פסיק)" style="display:none"></div>
                <div class="col-md-1">
                  <div class="form-check form-check-inline mt-1">
                    <input class="form-check-input" type="checkbox" id="ff-new-required" checked>
                    <label class="form-check-label small" for="ff-new-required">חובה</label>
                  </div>
                </div>
                <div class="col-md-1">
                  <button class="btn btn-primary btn-sm w-100" onclick="Pages._formAddField()"><i class="bi bi-plus-lg"></i></button>
                </div>
              </div>
              <!-- Quick add buttons for common field types -->
              <div class="d-flex flex-wrap gap-1 mt-2">
                ${this._formsFieldTypes.map(ft => `<button class="btn btn-outline-secondary btn-sm" style="font-size:0.7rem" onclick="Pages._formQuickAdd('${ft.type}')" title="${ft.label}"><i class="${ft.icon} me-1"></i>${ft.label}</button>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline-info" onclick="Pages._formPreviewFromBuilder()"><i class="bi bi-eye me-1"></i>תצוגה מקדימה</button>
        <button class="btn btn-secondary" data-bs-dismiss="modal">ביטול</button>
        <button class="btn btn-primary" onclick="Pages._formSave()"><i class="bi bi-check-lg me-1"></i>שמירה</button>
      </div>
    </div></div></div>

    <!-- Preview Modal -->
    <div class="modal fade" id="frm-preview-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
      <div class="modal-header bg-info bg-opacity-10"><h5 class="modal-title" id="frm-preview-title"><i class="bi bi-eye me-2"></i>תצוגה מקדימה</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body" id="frm-preview-body"></div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">סגור</button></div>
    </div></div></div>

    <!-- QR Modal -->
    <div class="modal fade" id="frm-qr-modal" tabindex="-1"><div class="modal-dialog modal-sm"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title"><i class="bi bi-qr-code me-2"></i>שיתוף QR</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body text-center" id="frm-qr-body"></div>
    </div></div></div>

    <!-- Response Detail Modal -->
    <div class="modal fade" id="frm-resp-detail-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
      <div class="modal-header bg-primary bg-opacity-10"><h5 class="modal-title"><i class="bi bi-card-text me-2"></i>פרטי תשובה</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body" id="frm-resp-detail-body"></div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">סגור</button></div>
    </div></div></div>

    <!-- Template Modal -->
    <div class="modal fade" id="frm-template-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header bg-info bg-opacity-10"><h5 class="modal-title"><i class="bi bi-file-earmark-plus me-2"></i>בחר תבנית</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body" id="frm-template-body"></div>
    </div></div></div>`;
  },

  formsLoadDemo() {
    this._formsUseDemo = true;
    this._formsData = this._formsDemoData;
    App.navigate('forms');
  },

  async formsInit() {
    // Try loading from API
    this._formsData = this._formsUseDemo ? this._formsDemoData : [];
    try {
      const apiData = await App.getData('טפסים');
      if (apiData && apiData.length) {
        this._formsData = apiData.map(row => ({
          _id: row._id || row.id || 'f_' + Date.now(),
          name: row['שם'] || row.name || '',
          desc: row['תיאור'] || row.desc || '',
          status: row['סטטוס'] || row.status || 'פעיל',
          color: row['צבע'] || row.color || '#2563eb',
          date: row['תאריך'] || row.date || '',
          fields: row.fields ? (typeof row.fields === 'string' ? JSON.parse(row.fields) : row.fields) : [],
          responses: row.responses ? (typeof row.responses === 'string' ? JSON.parse(row.responses) : row.responses) : []
        }));
      }
    } catch(e) { /* keep current data */ }
    // Show options input if needed
    setTimeout(() => Pages._formToggleOptions(document.getElementById('ff-new-type')?.value), 100);
  },

  /* ========== Form Link Helper ========== */
  _formGetLink(id) {
    return location.origin + location.pathname.replace(/[^/]*$/, '') + 'form.html?id=' + id;
  },

  /* ========== Create / Edit ========== */
  _formCreate() {
    this._formsEditId = null;
    this._formFields = [];
    document.getElementById('ff-title').value = '';
    document.getElementById('ff-desc').value = '';
    document.getElementById('ff-status').value = 'פעיל';
    document.getElementById('ff-color').value = '#2563eb';
    document.getElementById('frm-modal-title').innerHTML = '<i class="bi bi-plus-circle me-2"></i>טופס חדש';
    this._formRenderFields();
    this._formToggleOptions('text');
    new bootstrap.Modal(document.getElementById('frm-modal')).show();
  },

  _formEdit(id) {
    const form = this._formsData.find(f => f._id === id);
    if (!form) return;
    this._formsEditId = id;
    this._formFields = (form.fields || []).map(f => ({ ...f }));
    document.getElementById('ff-title').value = form.name;
    document.getElementById('ff-desc').value = form.desc || '';
    document.getElementById('ff-status').value = form.status || 'פעיל';
    document.getElementById('ff-color').value = form.color || '#2563eb';
    document.getElementById('frm-modal-title').innerHTML = '<i class="bi bi-pencil me-2"></i>עריכת טופס';
    this._formRenderFields();
    this._formToggleOptions('text');
    new bootstrap.Modal(document.getElementById('frm-modal')).show();
  },

  _formToggleOptions(type) {
    const el = document.getElementById('ff-new-options');
    if (!el) return;
    const needsOptions = ['select', 'radio'].includes(type);
    el.style.display = needsOptions ? '' : 'none';
    if (needsOptions) el.placeholder = 'אפשרויות (מופרד בפסיק)';
  },

  _formQuickAdd(type) {
    const ft = this._formsFieldTypes.find(t => t.type === type);
    if (!ft) return;
    document.getElementById('ff-new-type').value = type;
    document.getElementById('ff-new-field').value = ft.label;
    this._formToggleOptions(type);
    document.getElementById('ff-new-field').focus();
  },

  _formAddField() {
    const nameInput = document.getElementById('ff-new-field');
    const typeInput = document.getElementById('ff-new-type');
    const optionsInput = document.getElementById('ff-new-options');
    const requiredInput = document.getElementById('ff-new-required');
    const val = nameInput.value.trim();
    if (!val) { Utils.toast('נא להזין שם שדה', 'warning'); return; }

    const options = optionsInput.value.trim() ? optionsInput.value.split(',').map(o => o.trim()).filter(Boolean) : [];
    // Validate: select/radio need options
    if (['select', 'radio'].includes(typeInput.value) && !options.length) {
      Utils.toast('שדה בחירה/רדיו חייב אפשרויות (מופרד בפסיק)', 'warning');
      optionsInput.focus();
      return;
    }
    this._formFields.push({ name: val, type: typeInput.value, required: requiredInput.checked, options });
    nameInput.value = '';
    optionsInput.value = '';
    this._formRenderFields();
  },

  _formRemoveField(idx) {
    this._formFields.splice(idx, 1);
    this._formRenderFields();
  },

  _formMoveField(fromIdx, dir) {
    const toIdx = fromIdx + dir;
    if (toIdx < 0 || toIdx >= this._formFields.length) return;
    const tmp = this._formFields[fromIdx];
    this._formFields[fromIdx] = this._formFields[toIdx];
    this._formFields[toIdx] = tmp;
    this._formRenderFields();
  },

  _formEditField(idx) {
    const f = this._formFields[idx];
    if (!f) return;
    const newName = prompt('שם השדה:', f.name);
    if (newName === null) return;
    if (newName.trim()) f.name = newName.trim();
    if (['select', 'radio'].includes(f.type)) {
      const newOpts = prompt('אפשרויות (מופרד בפסיק):', (f.options || []).join(', '));
      if (newOpts !== null) f.options = newOpts.split(',').map(o => o.trim()).filter(Boolean);
    }
    f.required = confirm('שדה חובה?');
    this._formRenderFields();
  },

  _formRenderFields() {
    const container = document.getElementById('ff-fields-list');
    if (!container) return;
    if (!this._formFields.length) {
      container.innerHTML = '<div class="text-muted small text-center py-3 border rounded bg-light">אין שדות -- הוסף שדות למטה</div>';
      return;
    }
    container.innerHTML = this._formFields.map((f, i) => {
      const ft = this._formsFieldTypes.find(t => t.type === f.type) || { icon: 'bi-fonts', label: f.type };
      return `
      <div class="d-flex align-items-center gap-2 mb-2 p-2 border rounded bg-white" draggable="true" ondragstart="Pages._formDragStart(event,${i})" ondragover="event.preventDefault()" ondrop="Pages._formDrop(event,${i})">
        <div class="d-flex flex-column">
          <button class="btn btn-sm p-0 text-muted" onclick="Pages._formMoveField(${i},-1)" ${i === 0 ? 'disabled' : ''}><i class="bi bi-chevron-up"></i></button>
          <button class="btn btn-sm p-0 text-muted" onclick="Pages._formMoveField(${i},1)" ${i === this._formFields.length - 1 ? 'disabled' : ''}><i class="bi bi-chevron-down"></i></button>
        </div>
        <span class="badge bg-primary bg-opacity-10 text-primary">${i + 1}</span>
        <i class="${ft.icon} text-muted"></i>
        <span class="flex-grow-1 fw-bold">${f.name}</span>
        <span class="badge bg-light text-dark border small">${ft.label}</span>
        ${f.required ? '<span class="badge bg-danger bg-opacity-10 text-danger small">חובה</span>' : ''}
        ${f.options && f.options.length > 0 ? `<span class="badge bg-info bg-opacity-10 text-info small">${f.options.length} אפשרויות</span>` : ''}
        <button class="btn btn-sm btn-outline-warning" onclick="Pages._formEditField(${i})" title="ערוך"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-sm btn-outline-danger" onclick="Pages._formRemoveField(${i})"><i class="bi bi-x"></i></button>
      </div>`;
    }).join('');
  },

  _formDragStart(e, idx) {
    this._formDragIdx = idx;
    e.dataTransfer.effectAllowed = 'move';
  },

  _formDrop(e, toIdx) {
    e.preventDefault();
    const fromIdx = this._formDragIdx;
    if (fromIdx < 0 || fromIdx === toIdx) return;
    const item = this._formFields.splice(fromIdx, 1)[0];
    this._formFields.splice(toIdx, 0, item);
    this._formRenderFields();
  },

  async _formSave() {
    const title = document.getElementById('ff-title').value.trim();
    if (!title) { Utils.toast('נא להזין שם לטופס', 'warning'); return; }
    if (!this._formFields.length) { Utils.toast('נא להוסיף שדות לטופס', 'warning'); return; }

    if (this._formsEditId) {
      // Update existing form
      const form = this._formsData.find(f => f._id === this._formsEditId);
      if (form) {
        form.name = title;
        form.desc = document.getElementById('ff-desc').value.trim();
        form.status = document.getElementById('ff-status').value;
        form.color = document.getElementById('ff-color').value;
        form.fields = [...this._formFields];

        // Update API
        try {
          await App.apiCall('update', 'טפסים', { id: form._id, row: {
            'שם': form.name, 'תיאור': form.desc, 'סטטוס': form.status,
            'צבע': form.color, 'fields': JSON.stringify(form.fields)
          }});
        } catch(e) { /* local update ok */ }

        Utils.toast('הטופס עודכן בהצלחה', 'success');
      }
    } else {
      // Create new form
      const form = {
        _id: 'form_' + Date.now(),
        name: title,
        desc: document.getElementById('ff-desc').value.trim(),
        status: document.getElementById('ff-status').value,
        color: document.getElementById('ff-color').value,
        date: Utils.todayISO(),
        fields: [...this._formFields],
        responses: []
      };
      this._formsData.push(form);

      // Save to API
      try {
        await App.apiCall('add', 'טפסים', { row: {
          'שם': form.name, 'תיאור': form.desc, 'סטטוס': form.status,
          'צבע': form.color, 'תאריך': form.date,
          'fields': JSON.stringify(form.fields)
        }});
      } catch(e) { /* localStorage fallback */ }

      Utils.toast('הטופס נוצר בהצלחה', 'success');
    }

    bootstrap.Modal.getInstance(document.getElementById('frm-modal'))?.hide();
    App.loadPage('forms');
  },

  /* ========== Duplicate Form ========== */
  _formDuplicate(id) {
    const form = this._formsData.find(f => f._id === id);
    if (!form) return;
    const dup = {
      _id: 'form_' + Date.now(),
      name: form.name + ' (העתק)',
      desc: form.desc,
      status: 'טיוטה',
      color: form.color,
      date: Utils.todayISO(),
      fields: JSON.parse(JSON.stringify(form.fields)),
      responses: []
    };
    this._formsData.push(dup);
    Utils.toast('הטופס שוכפל בהצלחה', 'success');
    App.loadPage('forms');
  },

  /* ========== Toggle Status ========== */
  _formToggleStatus(id) {
    const form = this._formsData.find(f => f._id === id);
    if (!form) return;
    if (form.status === 'פעיל') form.status = 'סגור';
    else form.status = 'פעיל';
    Utils.toast(`סטטוס הטופס שונה ל${form.status}`, 'success');
    App.loadPage('forms');
  },

  /* ========== Templates ========== */
  _formTemplates: [
    { name: 'טופס הרשמה', desc: 'טופס הרשמה בסיסי עם פרטי תלמיד והורים', icon: 'bi-person-plus', color: '#2563eb',
      fields: [
        { name: 'שם התלמיד', type: 'text', required: true, options: [] },
        { name: 'שם הורה', type: 'text', required: true, options: [] },
        { name: 'טלפון', type: 'phone', required: true, options: [] },
        { name: 'אימייל', type: 'email', required: false, options: [] },
        { name: 'כיתה', type: 'select', required: true, options: ['כיתה א', 'כיתה ב', 'כיתה ג', 'כיתה ד', 'כיתה ה', 'כיתה ו'] },
        { name: 'הערות', type: 'textarea', required: false, options: [] }
      ]
    },
    { name: 'אישור טיול', desc: 'אישור השתתפות בטיול עם פרטים רפואיים', icon: 'bi-geo-alt', color: '#16a34a',
      fields: [
        { name: 'שם התלמיד', type: 'text', required: true, options: [] },
        { name: 'שם הורה', type: 'text', required: true, options: [] },
        { name: 'אלרגיות', type: 'textarea', required: false, options: [] },
        { name: 'אישור רפואי', type: 'checkbox', required: true, options: [] },
        { name: 'הערות', type: 'textarea', required: false, options: [] }
      ]
    },
    { name: 'הצהרת בריאות', desc: 'הצהרת בריאות שנתית עם פרטים רפואיים', icon: 'bi-heart-pulse', color: '#9333ea',
      fields: [
        { name: 'שם התלמיד', type: 'text', required: true, options: [] },
        { name: 'שם הורה', type: 'text', required: true, options: [] },
        { name: 'בעיות רפואיות', type: 'textarea', required: false, options: [] },
        { name: 'אלרגיות', type: 'textarea', required: false, options: [] },
        { name: 'תרופות', type: 'textarea', required: false, options: [] },
        { name: 'קופת חולים', type: 'select', required: true, options: ['כללית', 'מכבי', 'מאוחדת', 'לאומית'] },
        { name: 'חתימה', type: 'checkbox', required: true, options: [] }
      ]
    },
    { name: 'סקר שביעות רצון', desc: 'סקר שביעות רצון עם דירוגים', icon: 'bi-star', color: '#f59e0b',
      fields: [
        { name: 'שם (אופציונלי)', type: 'text', required: false, options: [] },
        { name: 'דירוג כללי', type: 'radio', required: true, options: ['1', '2', '3', '4', '5'] },
        { name: 'מה אהבתם?', type: 'textarea', required: false, options: [] },
        { name: 'מה לשפר?', type: 'textarea', required: false, options: [] }
      ]
    },
    { name: 'בקשת תשלום', desc: 'טופס בקשה לתשלום חריג או פריסה', icon: 'bi-cash-stack', color: '#ef4444',
      fields: [
        { name: 'שם ההורה', type: 'text', required: true, options: [] },
        { name: 'טלפון', type: 'phone', required: true, options: [] },
        { name: 'שם התלמיד', type: 'text', required: true, options: [] },
        { name: 'סכום', type: 'number', required: true, options: [] },
        { name: 'מספר תשלומים', type: 'select', required: true, options: ['1', '2', '3', '4', '6', '10', '12'] },
        { name: 'סיבה', type: 'textarea', required: true, options: [] }
      ]
    },
    { name: 'משוב אירוע', desc: 'משוב מאירוע או פעילות', icon: 'bi-calendar-event', color: '#06b6d4',
      fields: [
        { name: 'שם', type: 'text', required: false, options: [] },
        { name: 'כיצד נודע לך?', type: 'select', required: false, options: ['פייסבוק', 'חבר', 'פלייר', 'אחר'] },
        { name: 'דירוג', type: 'radio', required: true, options: ['מצוין', 'טוב', 'בינוני', 'גרוע'] },
        { name: 'הערות', type: 'textarea', required: false, options: [] }
      ]
    }
  ],

  _formFromTemplate() {
    const body = document.getElementById('frm-template-body');
    body.innerHTML = this._formTemplates.map((t, i) => `
      <div class="card mb-2 hover-lift" style="cursor:pointer;border-right:4px solid ${t.color}" onclick="Pages._formApplyTemplate(${i})">
        <div class="card-body py-3">
          <div class="d-flex align-items-center gap-3">
            <div class="rounded-circle d-flex align-items-center justify-content-center" style="width:44px;height:44px;background:${t.color}15;color:${t.color}">
              <i class="bi ${t.icon} fs-5"></i>
            </div>
            <div>
              <h6 class="fw-bold mb-0">${t.name}</h6>
              <small class="text-muted">${t.desc}</small>
              <div class="mt-1"><span class="badge bg-light text-dark border" style="font-size:0.7rem">${t.fields.length} שדות</span></div>
            </div>
          </div>
        </div>
      </div>
    `).join('');
    new bootstrap.Modal(document.getElementById('frm-template-modal')).show();
  },

  _formApplyTemplate(idx) {
    const t = this._formTemplates[idx];
    if (!t) return;
    bootstrap.Modal.getInstance(document.getElementById('frm-template-modal'))?.hide();
    setTimeout(() => {
      this._formsEditId = null;
      this._formFields = JSON.parse(JSON.stringify(t.fields));
      document.getElementById('ff-title').value = t.name;
      document.getElementById('ff-desc').value = t.desc;
      document.getElementById('ff-status').value = 'פעיל';
      document.getElementById('ff-color').value = t.color;
      document.getElementById('frm-modal-title').innerHTML = '<i class="bi bi-plus-circle me-2"></i>טופס חדש מתבנית';
      this._formRenderFields();
      this._formToggleOptions('text');
      new bootstrap.Modal(document.getElementById('frm-modal')).show();
    }, 300);
  },

  /* ========== Preview ========== */
  _formPreview(id) {
    const form = this._formsData.find(f => f._id === id);
    if (!form) return;
    this._renderPreview(form.name, form.fields || [], form.color);
  },

  _formPreviewFromBuilder() {
    const title = document.getElementById('ff-title').value.trim() || 'טופס ללא שם';
    const color = document.getElementById('ff-color').value;
    this._renderPreview(title, this._formFields, color);
  },

  _renderPreview(title, fields, color) {
    document.getElementById('frm-preview-title').innerHTML = `<i class="bi bi-eye me-2"></i>${title}`;
    const body = document.getElementById('frm-preview-body');
    if (!fields.length) {
      body.innerHTML = '<div class="text-muted text-center py-4">אין שדות להציג</div>';
    } else {
      body.innerHTML = `
        <div class="p-3 rounded mb-3" style="background:${color}10;border-right:4px solid ${color}">
          <h5 class="fw-bold" style="color:${color}">${title}</h5>
        </div>
        <form onsubmit="event.preventDefault();Pages._formDemoSubmit(this)">
          ${fields.map((f, i) => {
            const fld = typeof f === 'string' ? { name: f, type: 'text', required: false, options: [] } : f;
            const req = fld.required ? ' <span class="text-danger">*</span>' : '';
            const ft = this._formsFieldTypes.find(t => t.type === fld.type) || { icon: 'bi-fonts', label: fld.type };
            let input = '';
            switch (fld.type) {
              case 'text':
                input = `<input type="text" class="form-control" name="field_${i}" placeholder="${fld.name}" ${fld.required ? 'required' : ''}>`;
                break;
              case 'number':
                input = `<input type="number" class="form-control" name="field_${i}" placeholder="0" ${fld.required ? 'required' : ''}>`;
                break;
              case 'email':
                input = `<input type="email" class="form-control" dir="ltr" name="field_${i}" placeholder="email@example.com" ${fld.required ? 'required' : ''}>`;
                break;
              case 'phone':
                input = `<input type="tel" class="form-control" dir="ltr" name="field_${i}" placeholder="050-0000000" ${fld.required ? 'required' : ''}>`;
                break;
              case 'date':
                input = `<input type="date" class="form-control" name="field_${i}" ${fld.required ? 'required' : ''}>`;
                break;
              case 'textarea':
                input = `<textarea class="form-control" name="field_${i}" rows="3" placeholder="${fld.name}" ${fld.required ? 'required' : ''}></textarea>`;
                break;
              case 'select':
                input = `<select class="form-select" name="field_${i}" ${fld.required ? 'required' : ''}><option value="">-- בחר --</option>${(fld.options || []).map(o => `<option>${o}</option>`).join('')}</select>`;
                break;
              case 'checkbox':
                input = `<div class="form-check"><input class="form-check-input" type="checkbox" name="field_${i}" id="prev-${i}"><label class="form-check-label" for="prev-${i}">${fld.name}</label></div>`;
                break;
              case 'radio':
                input = (fld.options || []).map((o, j) => `<div class="form-check"><input class="form-check-input" type="radio" name="field_${i}" id="prev-${i}-${j}" value="${o}"><label class="form-check-label" for="prev-${i}-${j}">${o}</label></div>`).join('');
                break;
              case 'file':
                input = `<input type="file" class="form-control" name="field_${i}">`;
                break;
              default:
                input = `<input type="text" class="form-control" name="field_${i}" placeholder="${fld.name}">`;
            }
            return `<div class="mb-3">
              <label class="form-label fw-bold"><i class="${ft.icon} text-muted me-1"></i>${fld.name}${req}</label>
              ${input}
            </div>`;
          }).join('')}
          <button type="submit" class="btn btn-primary w-100"><i class="bi bi-send me-1"></i>שליחה</button>
        </form>`;
    }
    new bootstrap.Modal(document.getElementById('frm-preview-modal')).show();
  },

  _formDemoSubmit(formEl) {
    const formData = new FormData(formEl);
    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    Utils.toast('הטופס נשלח בהצלחה (תצוגה מקדימה)', 'success');
    formEl.reset();
  },

  /* ========== Responses View ========== */
  _formViewResponses(id) {
    const form = this._formsData.find(f => f._id === id);
    if (!form) return;
    this._formsViewId = id;
    this._formsRespAllData = form.responses || [];

    document.getElementById('frm-list').classList.add('d-none');
    document.getElementById('frm-responses').classList.remove('d-none');
    document.getElementById('frm-resp-title').textContent = form.name;

    const fields = (form.fields || []).map(f => typeof f === 'string' ? f : f.name);
    const responses = form.responses || [];

    // Stats
    const statsDiv = document.getElementById('frm-resp-stats');
    const completionRate = responses.length > 0
      ? Math.round(responses.filter(r => {
          const data = typeof r.data === 'object' ? r.data : {};
          const filled = fields.filter(f => data[f] && data[f].toString().trim()).length;
          return filled >= fields.length * 0.8;
        }).length / responses.length * 100)
      : 0;

    // Date range
    const dates = responses.map(r => r.date).filter(Boolean).sort();
    const firstDate = dates[0] || '-';
    const lastDate = dates[dates.length - 1] || '-';

    statsDiv.innerHTML = `
      <div class="row g-2">
        <div class="col-md-3"><div class="card p-2 text-center"><strong class="text-primary fs-4">${responses.length}</strong><br><small class="text-muted">תשובות</small></div></div>
        <div class="col-md-3"><div class="card p-2 text-center"><strong class="text-success fs-4">${fields.length}</strong><br><small class="text-muted">שדות</small></div></div>
        <div class="col-md-2"><div class="card p-2 text-center"><strong class="text-info fs-5">${firstDate}</strong><br><small class="text-muted">ראשון</small></div></div>
        <div class="col-md-2"><div class="card p-2 text-center"><strong class="text-warning fs-5">${lastDate}</strong><br><small class="text-muted">אחרון</small></div></div>
        <div class="col-md-2"><div class="card p-2 text-center"><strong class="text-danger fs-4">${completionRate}%</strong><br><small class="text-muted">מילוי מלא</small></div></div>
      </div>`;

    // Charts for select/radio fields
    const chartsDiv = document.getElementById('frm-resp-charts');
    const chartableFields = (form.fields || []).filter(f => typeof f !== 'string' && (f.type === 'select' || f.type === 'radio') && f.options && f.options.length > 0);
    if (chartableFields.length > 0 && responses.length > 0) {
      chartsDiv.innerHTML = `<div class="row g-3">${chartableFields.map(cf => {
        const counts = {};
        (cf.options || []).forEach(o => counts[o] = 0);
        responses.forEach(r => {
          const val = typeof r.data === 'object' ? r.data[cf.name] : '';
          if (val && counts[val] !== undefined) counts[val]++;
          else if (val) counts[val] = (counts[val] || 0) + 1;
        });
        const max = Math.max(...Object.values(counts), 1);
        const total = Object.values(counts).reduce((a, b) => a + b, 0);
        const colors = ['#2563eb', '#16a34a', '#f59e0b', '#ef4444', '#9333ea', '#06b6d4', '#ec4899', '#f97316', '#84cc16', '#6366f1'];
        return `<div class="col-md-6"><div class="card p-3">
          <h6 class="fw-bold small mb-2"><i class="bi bi-bar-chart me-1"></i>${cf.name}</h6>
          ${Object.entries(counts).map(([label, count], ci) => `
            <div class="d-flex align-items-center gap-2 mb-1">
              <span class="small" style="min-width:60px">${label}</span>
              <div class="flex-grow-1"><div class="progress" style="height:20px"><div class="progress-bar" style="width:${Math.round(count / max * 100)}%;background:${colors[ci % colors.length]}">${count} (${total > 0 ? Math.round(count / total * 100) : 0}%)</div></div></div>
            </div>
          `).join('')}
        </div></div>`;
      }).join('')}</div>`;
    } else {
      chartsDiv.innerHTML = '';
    }

    // Timeline: responses per date
    const timelineDiv = document.getElementById('frm-resp-timeline');
    if (responses.length > 1) {
      const byDate = {};
      responses.forEach(r => { byDate[r.date] = (byDate[r.date] || 0) + 1; });
      const sortedDates = Object.keys(byDate).sort();
      const maxByDate = Math.max(...Object.values(byDate), 1);
      timelineDiv.innerHTML = `<div class="card p-3">
        <h6 class="fw-bold small mb-2"><i class="bi bi-graph-up me-1"></i>תשובות לפי תאריך</h6>
        <div class="d-flex align-items-end gap-1" style="height:80px">
          ${sortedDates.map(d => {
            const h = Math.max(Math.round(byDate[d] / maxByDate * 70), 4);
            return `<div class="flex-fill text-center" title="${d}: ${byDate[d]} תשובות">
              <div class="bg-primary rounded-top mx-auto" style="height:${h}px;min-width:8px;max-width:40px;opacity:0.8"></div>
              <div class="small text-muted" style="font-size:0.6rem;overflow:hidden;text-overflow:ellipsis">${d.slice(5)}</div>
            </div>`;
          }).join('')}
        </div>
      </div>`;
    } else {
      timelineDiv.innerHTML = '';
    }

    // Table
    const thead = document.getElementById('frm-resp-head');
    const tbody = document.getElementById('frm-resp-body');
    const countEl = document.getElementById('frm-resp-count');
    if (countEl) countEl.textContent = `${responses.length} תשובות`;

    if (!responses.length) {
      thead.innerHTML = '<tr><th>תאריך</th><th>תלמיד/הורה</th><th>נתונים</th></tr>';
      tbody.innerHTML = '<tr><td colspan="3" class="text-center text-muted py-4">אין תשובות עדיין</td></tr>';
      return;
    }

    thead.innerHTML = `<tr><th>#</th><th>תאריך</th><th>שם</th>${fields.map(f => `<th>${f}</th>`).join('')}<th>פעולות</th></tr>`;
    tbody.innerHTML = responses.map((r, i) => {
      const dataVals = fields.map(f => {
        if (typeof r.data === 'object') {
          const v = r.data[f];
          if (v === undefined || v === null || v === '') return '<span class="text-muted">-</span>';
          // Truncate long text
          const s = String(v);
          return s.length > 40 ? s.substring(0, 40) + '...' : s;
        }
        return r.data || '-';
      });
      return `<tr data-search="${r.student} ${JSON.stringify(r.data)}">
        <td class="text-muted">${i + 1}</td>
        <td>${r.date}</td>
        <td class="fw-bold">${r.student}</td>
        ${dataVals.map(v => `<td class="small">${v}</td>`).join('')}
        <td>
          <div class="d-flex gap-1">
            <button class="btn btn-sm btn-outline-info p-1" onclick="Pages._formViewResponseDetail(${i})" title="צפייה"><i class="bi bi-eye"></i></button>
            <button class="btn btn-sm btn-outline-danger p-1" onclick="Pages._formDeleteResponse(${i})" title="מחיקה"><i class="bi bi-trash"></i></button>
          </div>
        </td>
      </tr>`;
    }).join('');
  },

  _formViewResponseDetail(idx) {
    const form = this._formsData.find(f => f._id === this._formsViewId);
    if (!form || !form.responses || !form.responses[idx]) return;
    const r = form.responses[idx];
    const fields = (form.fields || []).map(f => typeof f === 'string' ? f : f.name);

    const body = document.getElementById('frm-resp-detail-body');
    body.innerHTML = `
      <div class="mb-3 p-3 rounded" style="background:${form.color}10;border-right:4px solid ${form.color}">
        <h5 class="fw-bold mb-1" style="color:${form.color}">${r.student}</h5>
        <small class="text-muted"><i class="bi bi-calendar3 me-1"></i>${r.date}</small>
      </div>
      <div class="list-group">
        ${fields.map(f => {
          const val = typeof r.data === 'object' ? (r.data[f] || '') : '';
          const fld = (form.fields || []).find(ff => (typeof ff === 'string' ? ff : ff.name) === f);
          const typeInfo = fld && typeof fld !== 'string'
            ? (Pages._formsFieldTypes.find(t => t.type === fld.type) || { icon: 'bi-fonts', label: fld.type })
            : { icon: 'bi-fonts', label: 'טקסט' };
          return `<div class="list-group-item">
            <div class="d-flex justify-content-between">
              <small class="text-muted"><i class="${typeInfo.icon} me-1"></i>${f}</small>
              ${fld && typeof fld !== 'string' && fld.required ? '<span class="badge bg-danger bg-opacity-10 text-danger" style="font-size:0.65rem">חובה</span>' : ''}
            </div>
            <div class="fw-bold mt-1">${val || '<span class="text-muted">לא מולא</span>'}</div>
          </div>`;
        }).join('')}
      </div>`;
    new bootstrap.Modal(document.getElementById('frm-resp-detail-modal')).show();
  },

  _formDeleteResponse(idx) {
    const form = this._formsData.find(f => f._id === this._formsViewId);
    if (!form || !form.responses) return;
    if (!confirm('למחוק תשובה זו?')) return;
    form.responses.splice(idx, 1);
    Utils.toast('התשובה נמחקה', 'success');
    this._formViewResponses(this._formsViewId);
  },

  _formCloseResponses() {
    document.getElementById('frm-list').classList.remove('d-none');
    document.getElementById('frm-responses').classList.add('d-none');
    this._formsViewId = null;
  },

  _formSearchResp(query) {
    const rows = document.querySelectorAll('#frm-resp-body tr');
    const q = query.trim().toLowerCase();
    let visible = 0;
    rows.forEach(tr => {
      const text = (tr.dataset.search || '').toLowerCase();
      const show = !q || text.includes(q);
      tr.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    const countEl = document.getElementById('frm-resp-count');
    const form = this._formsData.find(f => f._id === this._formsViewId);
    const total = form ? (form.responses || []).length : 0;
    if (countEl) countEl.textContent = q ? `${visible} מתוך ${total} תשובות` : `${total} תשובות`;
  },

  /* ========== Export ========== */
  _formExportCSV() {
    const form = this._formsData.find(f => f._id === this._formsViewId);
    if (!form || !form.responses || !form.responses.length) {
      Utils.toast('אין נתונים לייצוא', 'warning');
      return;
    }
    const fields = (form.fields || []).map(f => typeof f === 'string' ? f : f.name);
    const BOM = '\uFEFF';
    const header = ['#', 'תאריך', 'שם', ...fields].join(',');
    const rows = form.responses.map((r, i) => {
      const vals = fields.map(f => {
        const v = typeof r.data === 'object' ? (r.data[f] || '') : '';
        // Escape CSV: wrap in quotes, escape internal quotes
        return '"' + String(v).replace(/"/g, '""') + '"';
      });
      return [i + 1, r.date, '"' + r.student + '"', ...vals].join(',');
    });
    const csv = BOM + header + '\n' + rows.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${form.name}_responses_${Utils.todayISO()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    Utils.toast('קובץ CSV יוצא בהצלחה', 'success');
  },

  _formExportJSON() {
    const form = this._formsData.find(f => f._id === this._formsViewId);
    if (!form || !form.responses || !form.responses.length) {
      Utils.toast('אין נתונים לייצוא', 'warning');
      return;
    }
    const exportData = {
      formName: form.name,
      formDesc: form.desc,
      exportDate: Utils.todayISO(),
      fields: (form.fields || []).map(f => typeof f === 'string' ? { name: f, type: 'text' } : f),
      responses: form.responses
    };
    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${form.name}_responses_${Utils.todayISO()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    Utils.toast('קובץ JSON יוצא בהצלחה', 'success');
  },

  _formPrintResponses() {
    const form = this._formsData.find(f => f._id === this._formsViewId);
    if (!form || !form.responses || !form.responses.length) {
      Utils.toast('אין נתונים להדפסה', 'warning');
      return;
    }
    const fields = (form.fields || []).map(f => typeof f === 'string' ? f : f.name);
    const printWin = window.open('', '_blank');
    printWin.document.write(`<!DOCTYPE html><html dir="rtl" lang="he"><head>
      <meta charset="UTF-8">
      <title>${form.name} - תשובות</title>
      <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;600;700&display=swap" rel="stylesheet">
      <style>
        * { font-family: 'Heebo', sans-serif; }
        body { padding: 2rem; direction: rtl; }
        h1 { color: ${form.color}; }
        table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: right; font-size: 0.85rem; }
        th { background: #f3f4f6; font-weight: 600; }
        tr:nth-child(even) { background: #fafafa; }
        .meta { color: #666; font-size: 0.85rem; margin-bottom: 1rem; }
        @media print { body { padding: 0.5rem; } }
      </style>
    </head><body>
      <h1>${form.name}</h1>
      <p class="meta">${form.desc || ''}<br>תאריך הפקה: ${Utils.todayISO()} | ${form.responses.length} תשובות</p>
      <table>
        <thead><tr><th>#</th><th>תאריך</th><th>שם</th>${fields.map(f => `<th>${f}</th>`).join('')}</tr></thead>
        <tbody>${form.responses.map((r, i) => `<tr>
          <td>${i + 1}</td><td>${r.date}</td><td>${r.student}</td>
          ${fields.map(f => `<td>${typeof r.data === 'object' ? (r.data[f] || '') : ''}</td>`).join('')}
        </tr>`).join('')}</tbody>
      </table>
    </body></html>`);
    printWin.document.close();
    printWin.print();
  },

  /* ========== Share Functions ========== */
  _formCopyLink(id) {
    const url = this._formGetLink(id);
    navigator.clipboard.writeText(url).then(() => {
      Utils.toast('הקישור הועתק ללוח', 'success');
    }).catch(() => {
      prompt('העתק את הקישור:', url);
    });
  },

  _formSharePhone(id) {
    const form = this._formsData.find(f => f._id === id);
    if (!form) return;
    const url = this._formGetLink(id);
    const text = `\u05E9\u05DC\u05D5\u05DD,\n\u05E0\u05D0 \u05DC\u05DE\u05DC\u05D0 \u05D0\u05EA \u05D4\u05D8\u05D5\u05E4\u05E1: ${form.name}\n${url}`;
    navigator.clipboard.writeText(text).then(() => {
      Utils.toast('\u05D4\u05D8\u05E7\u05E1\u05D8 \u05D4\u05D5\u05E2\u05EA\u05E7 \u05DC\u05DC\u05D5\u05D7 - \u05E0\u05D9\u05EA\u05DF \u05DC\u05E9\u05DC\u05D5\u05D7 \u05D1SMS', 'success');
    }).catch(() => {
      prompt('\u05D4\u05E2\u05EA\u05E7 \u05D0\u05EA \u05D4\u05D8\u05E7\u05E1\u05D8:', text);
    });
  },

  _formShareEmail(id) {
    const form = this._formsData.find(f => f._id === id);
    if (!form) return;
    const url = this._formGetLink(id);
    const subject = encodeURIComponent(form.name);
    const body = encodeURIComponent(`שלום,\n\nנא למלא את הטופס "${form.name}":\n${url}\n\nתודה,\nבית התלמוד`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_self');
  },

  _formShowQR(id) {
    const form = this._formsData.find(f => f._id === id);
    if (!form) return;
    const url = this._formGetLink(id);

    // Generate QR code as SVG using a simple QR matrix algorithm
    const qrSvg = this._generateQRSvg(url);

    document.getElementById('frm-qr-body').innerHTML = `
      <div class="border rounded p-4 mb-3 bg-white">
        <div style="width:200px;height:200px;margin:0 auto" id="frm-qr-image">
          ${qrSvg}
        </div>
      </div>
      <p class="fw-bold mb-1">${form.name}</p>
      <p class="small text-muted mb-2">סרוק את הקוד לפתיחת הטופס</p>
      <div class="input-group input-group-sm mb-2">
        <input type="text" class="form-control" value="${url}" readonly id="frm-qr-url">
        <button class="btn btn-outline-primary" onclick="navigator.clipboard.writeText(document.getElementById('frm-qr-url').value);Utils.toast('הועתק','success')"><i class="bi bi-clipboard"></i></button>
      </div>
      <div class="d-flex gap-2 justify-content-center">
        <button class="btn btn-sm btn-outline-primary" onclick="Pages._formSharePhone('${id}')"><i class="bi bi-telephone me-1"></i>\u05D8\u05DC\u05E4\u05D5\u05DF</button>
        <button class="btn btn-sm btn-outline-info" onclick="Pages._formShareEmail('${id}')"><i class="bi bi-envelope me-1"></i>\u05D3\u05D5\u05D0\u05E8</button>
      </div>`;
    new bootstrap.Modal(document.getElementById('frm-qr-modal')).show();
  },

  /**
   * Generate a simple QR code as SVG using a basic encoding.
   * Uses Google Charts API fallback rendered as an image for real QR.
   */
  _generateQRSvg(text) {
    // Use Google Charts API to generate QR image
    const encoded = encodeURIComponent(text);
    const qrUrl = `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${encoded}&choe=UTF-8`;
    return `<img src="${qrUrl}" alt="QR Code" width="200" height="200" style="image-rendering:pixelated"
      onerror="this.outerHTML='<div style=\\'width:200px;height:200px;display:flex;align-items:center;justify-content:center;border:2px dashed #ccc;border-radius:12px\\'><div class=\\'text-center\\'><i class=\\'bi bi-qr-code\\' style=\\'font-size:3rem;color:#ccc\\'></i><br><small style=\\'color:#999\\'>QR לא זמין</small></div></div>'">`;
  },

  /* ========== Delete ========== */
  async _formDelete(id) {
    if (!confirm('למחוק טופס זה? כל התשובות ימחקו גם כן.')) return;
    this._formsData = this._formsData.filter(f => f._id !== id);

    // Delete from API
    try { await App.apiCall('delete', 'טפסים', { id }); } catch(e) { /* ok */ }

    Utils.toast('הטופס נמחק', 'success');
    App.loadPage('forms');
  }
});
