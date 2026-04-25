/* ===== BHT v5.3 — Print Center (מרכז הדפסה) ===== */
Object.assign(Pages, {

  /* ---------- template definitions ---------- */
  _pcTemplates: [

    { id: 'student_card',   name: 'כרטיס תלמיד',      icon: 'bi-person-badge-fill', color: 'primary',  desc: 'כרטיס זיהוי תלמיד עם פרטים אישיים ותמונה' },
    { id: 'attendance',     name: 'דוח נוכחות',        icon: 'bi-calendar-check-fill', color: 'success', desc: 'דוח נוכחות לפי תלמיד או כיתה ותקופה' },
    { id: 'certificate',    name: 'תעודה/דיפלומה',     icon: 'bi-award-fill',        color: 'warning',  desc: 'תעודת הצטיינות, סיום או הוקרה' },
    { id: 'trip_list',      name: 'רשימת תלמידים לטיול', icon: 'bi-geo-alt-fill',     color: 'info',     desc: 'רשימה שמית לטיול עם פרטי זיהוי, טלפון והערות רפואיות' },
    { id: 'class_roster',   name: 'רשימה שמית לפי כיתה', icon: 'bi-list-ul',          color: 'secondary',desc: 'רשימת תלמידים מלאה עם כל הפרטים הטכניים' },
    { id: 'empty_attendance',name: 'טופס נוכחות ריק',    icon: 'bi-check2-square',    color: 'success',  desc: 'טופס נוכחות ריק להדפסה עם שמות תלמידים ותיבות סימון' },
    { id: 'registration',   name: 'טופס רישום חדש',     icon: 'bi-pencil-square',     color: 'danger',   desc: 'טופס רישום ריק לתלמיד חדש — להדפסה ומילוי ידני' }
  ],

  /* ---------- demo data ---------- */
  _pcStudents: [

    { name: 'יוסף כהן',       id: 'S001', cls: "כיתה א'", phone: '050-1234567', parent: 'אברהם כהן' },
    { name: 'משה לוי',         id: 'S002', cls: "כיתה א'", phone: '050-2345678', parent: 'יצחק לוי' },
    { name: 'אברהם גולדברג',  id: 'S003', cls: "כיתה ב'", phone: '050-3456789', parent: 'דוד גולדברג' }
  ],

  _pcClasses: ["כיתה א'", "כיתה ב'", "כיתה ג'", "כיתה ד'"],

  _pcHistoryLS: 'bht_printcenter_history',
  _pcSelectedTemplate: null,
  _pcNextHistId: 100,

  /* ---------- history persistence ---------- */
  _pcGetHistory() {
    try { return JSON.parse(localStorage.getItem(this._pcHistoryLS) || '[]'); } catch { return []; }
  },
  _pcSaveHistory(arr) {
    localStorage.setItem(this._pcHistoryLS, JSON.stringify(arr.slice(0, 100)));
  },

  /* ---------- main render ---------- */
  printcenter() {
    const tpls = this._pcTemplates;
    const hist = this._pcGetHistory();
    const today = new Date().toISOString().slice(0, 10);
    const todayCount = hist.filter(h => h.date === today).length;

    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div>
          <h1><i class="bi bi-printer-fill me-2"></i>מרכז הדפסה</h1>
          <p class="text-muted mb-0">תבניות מוכנות, הפקה והדפסה של מסמכים</p>
        </div>
        <div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-outline-danger btn-sm" onclick="Pages._pcClearHistory()"><i class="bi bi-trash me-1"></i>נקה היסטוריה</button>
        </div>
      </div>

      <!-- Stats -->
      <div class="row g-3 mb-4">
        <div class="col-6 col-md-3">
          <div class="card p-3 text-center">
            <div class="fs-4 fw-bold text-primary">${hist.length}</div>
            <small class="text-muted">סה"כ הודפסו</small>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card p-3 text-center">
            <div class="fs-4 fw-bold text-success">${todayCount}</div>
            <small class="text-muted">היום</small>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card p-3 text-center">
            <div class="fs-4 fw-bold text-warning">${tpls.length}</div>
            <small class="text-muted">תבניות זמינות</small>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card p-3 text-center">
            <div class="fs-4 fw-bold text-info">${this._pcStudents.length}</div>
            <small class="text-muted">תלמידים</small>
          </div>
        </div>
      </div>

      <!-- Template Grid -->
      <h5 class="mb-3"><i class="bi bi-grid-3x3-gap me-2"></i>תבניות להדפסה</h5>
      <div class="row g-3 mb-4">
        ${tpls.map(t => `
          <div class="col-6 col-md-3">
            <div class="card pc-tpl-card h-100 border-0 shadow-sm" role="button"
                 onclick="Pages._pcSelectTemplate('${t.id}')" id="pc-tpl-${t.id}">
              <div class="card-body text-center p-3">
                <div class="mb-2">
                  <span class="d-inline-flex align-items-center justify-content-center rounded-circle bg-${t.color} bg-opacity-10"
                        style="width:56px;height:56px">
                    <i class="bi ${t.icon} fs-3 text-${t.color}"></i>
                  </span>
                </div>
                <h6 class="card-title mb-1">${t.name}</h6>
                <small class="text-muted">${t.desc}</small>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Customization Panel (shown after template selection) -->
      <div id="pc-customize-panel" class="card mb-4" style="display:none">
        <div class="card-header bg-light d-flex justify-content-between align-items-center">
          <h6 class="mb-0"><i class="bi bi-sliders me-2"></i>התאמה אישית — <span id="pc-tpl-name"></span></h6>
          <button class="btn btn-sm btn-outline-secondary" onclick="Pages._pcCloseCustomize()"><i class="bi bi-x-lg"></i></button>
        </div>
        <div class="card-body">
          <div class="row g-3">
            <!-- Student/Class Selection -->
            <div class="col-md-4">
              <label class="form-label fw-bold">כיתה</label>
              <select class="form-select form-select-sm" id="pc-class" onchange="Pages._pcFilterStudents()">
                <option value="">כל הכיתות</option>
                ${this._pcClasses.map(c => `<option value="${c}">${c}</option>`).join('')}
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label fw-bold">תלמיד</label>
              <select class="form-select form-select-sm" id="pc-student">
                <option value="">כל התלמידים</option>
                ${this._pcStudents.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label fw-bold">תאריך</label>
              <input type="date" class="form-control form-control-sm" id="pc-date" value="${today}">
            </div>

            <!-- Date range for reports -->
            <div class="col-md-4" id="pc-date-range-wrap" style="display:none">
              <label class="form-label fw-bold">תאריך התחלה</label>
              <input type="date" class="form-control form-control-sm" id="pc-date-from">
            </div>
            <div class="col-md-4" id="pc-date-range-to-wrap" style="display:none">
              <label class="form-label fw-bold">תאריך סיום</label>
              <input type="date" class="form-control form-control-sm" id="pc-date-to" value="${today}">
            </div>

            <!-- Custom header/footer -->
            <div class="col-md-6">
              <label class="form-label fw-bold">כותרת מותאמת (אופציונלי)</label>
              <input type="text" class="form-control form-control-sm" id="pc-custom-header" placeholder="כותרת מותאמת...">
            </div>
            <div class="col-md-6">
              <label class="form-label fw-bold">כותרת תחתונה (אופציונלי)</label>
              <input type="text" class="form-control form-control-sm" id="pc-custom-footer" placeholder="הערת שוליים...">
            </div>

            <!-- Logo toggle -->
            <div class="col-md-4">
              <div class="form-check form-switch mt-4">
                <input class="form-check-input" type="checkbox" id="pc-show-logo" checked>
                <label class="form-check-label" for="pc-show-logo">הצג לוגו מוסד</label>
              </div>
            </div>

            <!-- Letter body for parent_letter -->
            <div class="col-12" id="pc-letter-body-wrap" style="display:none">
              <label class="form-label fw-bold">תוכן המכתב</label>
              <textarea class="form-control form-control-sm" id="pc-letter-body" rows="4" placeholder="כתוב כאן את תוכן המכתב..."></textarea>
            </div>

            <!-- Invoice fields -->
            <div class="col-12" id="pc-invoice-wrap" style="display:none">
              <div class="row g-3">
                <div class="col-md-4">
                  <label class="form-label fw-bold">סכום</label>
                  <input type="number" class="form-control form-control-sm" id="pc-invoice-amount" value="1500" min="0">
                </div>
                <div class="col-md-4">
                  <label class="form-label fw-bold">תיאור</label>
                  <input type="text" class="form-control form-control-sm" id="pc-invoice-desc" value="שכר לימוד חודשי">
                </div>
                <div class="col-md-4">
                  <label class="form-label fw-bold">מספר חשבונית</label>
                  <input type="text" class="form-control form-control-sm" id="pc-invoice-num" value="${1000 + hist.length + 1}">
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="d-flex gap-2 mt-3 flex-wrap">
            <button class="btn btn-primary btn-sm" onclick="Pages._pcPreview()">
              <i class="bi bi-eye me-1"></i>תצוגה מקדימה
            </button>
            <button class="btn btn-success btn-sm" onclick="Pages._pcPrintDirect()">
              <i class="bi bi-printer me-1"></i>הדפסה ישירה
            </button>
            <button class="btn btn-outline-info btn-sm" onclick="Pages._pcBatchPrint()">
              <i class="bi bi-people-fill me-1"></i>הדפסה קבוצתית לכיתה
            </button>
          </div>
        </div>
      </div>

      <!-- Preview Area -->
      <div id="pc-preview-area" class="card mb-4" style="display:none">
        <div class="card-header bg-light d-flex justify-content-between align-items-center">
          <h6 class="mb-0"><i class="bi bi-eye me-2"></i>תצוגה מקדימה</h6>
          <div class="d-flex gap-2">
            <button class="btn btn-success btn-sm" onclick="Pages._pcPrintFromPreview()"><i class="bi bi-printer me-1"></i>הדפס</button>
            <button class="btn btn-outline-secondary btn-sm" onclick="document.getElementById('pc-preview-area').style.display='none'"><i class="bi bi-x-lg"></i></button>
          </div>
        </div>
        <div class="card-body p-0" id="pc-preview-body" style="max-height:600px;overflow-y:auto"></div>
      </div>

      <!-- Batch Print Modal -->
      <div class="modal fade" id="pcBatchModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"><i class="bi bi-people-fill me-2"></i>הדפסה קבוצתית</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label fw-bold">כיתה</label>
                <select class="form-select form-select-sm" id="pc-batch-class" onchange="Pages._pcBatchFilterStudents()">
                  ${this._pcClasses.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">תלמידים</label>
                <div id="pc-batch-students" class="border rounded p-2" style="max-height:200px;overflow-y:auto"></div>
                <div class="mt-2 d-flex gap-2">
                  <button class="btn btn-outline-secondary btn-xs px-2 py-0" style="font-size:.75rem"
                    onclick="document.querySelectorAll('.pc-batch-chk').forEach(c=>c.checked=true)">בחר הכל</button>
                  <button class="btn btn-outline-secondary btn-xs px-2 py-0" style="font-size:.75rem"
                    onclick="document.querySelectorAll('.pc-batch-chk').forEach(c=>c.checked=false)">נקה הכל</button>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary btn-sm" data-bs-dismiss="modal">ביטול</button>
              <button class="btn btn-success btn-sm" onclick="Pages._pcBatchExecute()"><i class="bi bi-printer me-1"></i>הדפס לכולם</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Print History -->
      <h5 class="mb-3"><i class="bi bi-clock-history me-2"></i>היסטוריית הדפסות</h5>
      ${hist.length === 0 ? `
        <div class="card p-4 text-center text-muted">
          <i class="bi bi-printer fs-1 d-block mb-2 opacity-50"></i>
          <p>אין היסטוריית הדפסות עדיין. בחר תבנית להתחלה.</p>
        </div>
      ` : `
        <div class="card">
          <div class="table-responsive">
            <table class="table table-hover mb-0 align-middle">
              <thead class="table-light">
                <tr>
                  <th>#</th>
                  <th>תבנית</th>
                  <th>תלמיד/כיתה</th>
                  <th>תאריך</th>
                  <th>פרטים</th>
                  <th class="text-center" style="width:100px">פעולות</th>
                </tr>
              </thead>
              <tbody>
                ${hist.slice(0, 25).map((h, i) => `
                  <tr>
                    <td class="text-muted">${i + 1}</td>
                    <td>${this._pcTemplateBadge(h.templateId)}</td>
                    <td>${h.target || '—'}</td>
                    <td>${h.date}</td>
                    <td class="text-muted" style="max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${h.details || ''}</td>
                    <td class="text-center">
                      <button class="btn btn-sm btn-outline-primary me-1" onclick="Pages._pcReprintFromHistory(${h.id})" title="הדפס שוב"><i class="bi bi-printer"></i></button>
                      <button class="btn btn-sm btn-outline-danger" onclick="Pages._pcDeleteHistory(${h.id})" title="מחק"><i class="bi bi-trash"></i></button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `}

      <!-- Styles -->
      <style>
        .pc-tpl-card:hover { transform: translateY(-3px); box-shadow: 0 6px 20px rgba(0,0,0,.12); }
        .pc-tpl-card { transition: all .2s ease; cursor: pointer; }
        .pc-tpl-card.active { ring: 2px solid var(--bs-primary); box-shadow: 0 0 0 3px rgba(13,110,253,.25); }
        .bg-purple { background-color: rgba(111,66,193,.1) !important; }
        .text-purple { color: #6f42c1 !important; }
        .bg-teal { background-color: rgba(32,201,151,.1) !important; }
        .text-teal { color: #20c997 !important; }
      </style>
    `;
  },

  /* ---------- Init ---------- */
  _pcUseDemo: false,

  printcenterLoadDemo() {
    this._pcUseDemo = true;
    App.navigate('printcenter');
  },

  async printcenterInit() {
    this._pcSelectedTemplate = null;

    // Load REAL student data from API
    try {
      const raw = await App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
      if (raw && raw.length) {
        this._pcStudents = raw.map(s => ({
          name: Utils.fullName(s),
          id: Utils.rowId(s) || s['\u05DE\u05D6\u05D4\u05D4'] || '',
          cls: s['\u05DB\u05D9\u05EA\u05D4'] || '',
          phone: s['\u05D8\u05DC\u05E4\u05D5\u05DF'] || '',
          parent: ((s['\u05E9\u05DD_\u05D0\u05D1'] || '') + ' ' + (s['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4'] || '')).trim() || '',
          birthDate: s['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4'] || '',
          address: s['\u05DB\u05EA\u05D5\u05D1\u05EA'] || '',
          city: s['\u05E2\u05D9\u05E8'] || '',
          idNumber: s['\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA'] || s['\u05EA_\u05D6'] || s['\u05DE\u05D6\u05D4\u05D4'] || '',
          parentPhone: s['\u05D8\u05DC\u05E4\u05D5\u05DF_\u05D4\u05D5\u05E8\u05D9\u05DD'] || s['\u05D8\u05DC\u05E4\u05D5\u05DF_\u05D0\u05D1'] || '',
          medicalNotes: s['\u05D4\u05E2\u05E8\u05D5\u05EA_\u05E8\u05E4\u05D5\u05D0\u05D9\u05D5\u05EA'] || s['\u05D4\u05E2\u05E8\u05D5\u05EA'] || '',
          _raw: s
        }));
        this._pcClasses = [...new Set(this._pcStudents.map(s => s.cls).filter(Boolean))].sort();

        // Update class dropdowns
        const classSelects = document.querySelectorAll('#pc-class, #pc-batch-class');
        classSelects.forEach(sel => {
          const val = sel.value;
          const isMain = sel.id === 'pc-class';
          sel.innerHTML = (isMain ? '<option value="">\u05DB\u05DC \u05D4\u05DB\u05D9\u05EA\u05D5\u05EA</option>' : '') +
            this._pcClasses.map(c => `<option value="${c}">${c}</option>`).join('');
          if (val) sel.value = val;
        });

        // Update student dropdown
        const studentSel = document.getElementById('pc-student');
        if (studentSel) {
          studentSel.innerHTML = '<option value="">\u05DB\u05DC \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</option>' +
            this._pcStudents.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
        }

        // Update student count stat
        const statEl = document.querySelector('#students-count-stat');
        if (statEl) statEl.textContent = this._pcStudents.length;
      }
    } catch (e) {
      console.warn('Print Center: could not load student data from API, using defaults', e);
    }

    // Also try to load medical data for trip list
    try {
      const medRaw = await App.getData('\u05DE\u05D9\u05D3\u05E2_\u05E8\u05E4\u05D5\u05D0\u05D9');
      if (medRaw && medRaw.length) {
        this._pcMedicalData = medRaw;
      }
    } catch (e) { /* optional */ }

    // Also try to load parent data
    try {
      const parentsRaw = await App.getData('\u05D4\u05D5\u05E8\u05D9\u05DD');
      if (parentsRaw && parentsRaw.length) {
        this._pcParentsData = parentsRaw;
      }
    } catch (e) { /* optional */ }

    // Pre-populate batch student list
    this._pcBatchFilterStudents();
  },

  /* ---------- Template badge ---------- */
  _pcTemplateBadge(tplId) {
    const t = this._pcTemplates.find(x => x.id === tplId);
    if (!t) return tplId;
    return `<span class="badge bg-${t.color} bg-opacity-10 text-${t.color}"><i class="bi ${t.icon} me-1"></i>${t.name}</span>`;
  },

  /* ---------- Select template ---------- */
  _pcSelectTemplate(tplId) {
    this._pcSelectedTemplate = tplId;
    const tpl = this._pcTemplates.find(t => t.id === tplId);
    // Highlight card
    document.querySelectorAll('.pc-tpl-card').forEach(c => c.classList.remove('active'));
    const card = document.getElementById('pc-tpl-' + tplId);
    if (card) card.classList.add('active');

    // Show customize panel
    const panel = document.getElementById('pc-customize-panel');
    panel.style.display = '';
    document.getElementById('pc-tpl-name').textContent = tpl.name;

    // Show/hide conditional fields
    const dateRange = ['attendance', 'grades'].includes(tplId);
    document.getElementById('pc-date-range-wrap').style.display = dateRange ? '' : 'none';
    document.getElementById('pc-date-range-to-wrap').style.display = dateRange ? '' : 'none';
    document.getElementById('pc-letter-body-wrap').style.display = tplId === 'parent_letter' ? '' : 'none';
    document.getElementById('pc-invoice-wrap').style.display = tplId === 'invoice' ? '' : 'none';

    // For registration form (blank), hide student/class selectors since not needed
    const hideStudentSel = tplId === 'registration';
    const studentSel = document.getElementById('pc-student');
    if (studentSel) studentSel.closest('.col-md-4').style.display = hideStudentSel ? 'none' : '';

    // Hide preview
    document.getElementById('pc-preview-area').style.display = 'none';
  },

  _pcCloseCustomize() {
    document.getElementById('pc-customize-panel').style.display = 'none';
    document.getElementById('pc-preview-area').style.display = 'none';
    document.querySelectorAll('.pc-tpl-card').forEach(c => c.classList.remove('active'));
    this._pcSelectedTemplate = null;
  },

  /* ---------- Filter students by class ---------- */
  _pcFilterStudents() {
    const cls = document.getElementById('pc-class').value;
    const sel = document.getElementById('pc-student');
    const filtered = cls ? this._pcStudents.filter(s => s.cls === cls) : this._pcStudents;
    sel.innerHTML = '<option value="">כל התלמידים</option>' +
      filtered.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
  },

  /* ---------- Batch filter ---------- */
  _pcBatchFilterStudents() {
    const clsSel = document.getElementById('pc-batch-class');
    if (!clsSel) return;
    const cls = clsSel.value;
    const students = this._pcStudents.filter(s => s.cls === cls);
    const wrap = document.getElementById('pc-batch-students');
    if (!wrap) return;
    wrap.innerHTML = students.map(s => `
      <div class="form-check">
        <input class="form-check-input pc-batch-chk" type="checkbox" value="${s.id}" id="pcb-${s.id}" checked>
        <label class="form-check-label" for="pcb-${s.id}">${s.name}</label>
      </div>
    `).join('');
  },

  /* ---------- Get current options ---------- */
  _pcGetOptions() {
    const studentId = document.getElementById('pc-student')?.value || '';
    const student = this._pcStudents.find(s => s.id === studentId);
    const cls = document.getElementById('pc-class')?.value || '';
    return {
      templateId: this._pcSelectedTemplate,
      student,
      studentId,
      cls,
      date: document.getElementById('pc-date')?.value || new Date().toISOString().slice(0, 10),
      dateFrom: document.getElementById('pc-date-from')?.value || '',
      dateTo: document.getElementById('pc-date-to')?.value || '',
      customHeader: document.getElementById('pc-custom-header')?.value || '',
      customFooter: document.getElementById('pc-custom-footer')?.value || '',
      showLogo: document.getElementById('pc-show-logo')?.checked !== false,
      letterBody: document.getElementById('pc-letter-body')?.value || '',
      invoiceAmount: document.getElementById('pc-invoice-amount')?.value || '0',
      invoiceDesc: document.getElementById('pc-invoice-desc')?.value || '',
      invoiceNum: document.getElementById('pc-invoice-num')?.value || '',
    };
  },

  /* ---------- Preview ---------- */
  _pcPreview() {
    if (!this._pcSelectedTemplate) return;
    const opts = this._pcGetOptions();
    const html = this._pcBuildDocument(opts);
    const area = document.getElementById('pc-preview-area');
    document.getElementById('pc-preview-body').innerHTML = `<div class="p-3">${html}</div>`;
    area.style.display = '';
    area.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },

  /* ---------- Print Direct ---------- */
  _pcPrintDirect() {
    if (!this._pcSelectedTemplate) return;
    const opts = this._pcGetOptions();
    const html = this._pcBuildDocument(opts);
    this._pcOpenPrintWindow(html);
    this._pcAddHistory(opts);
  },

  /* ---------- Print from preview ---------- */
  _pcPrintFromPreview() {
    const body = document.getElementById('pc-preview-body')?.innerHTML || '';
    if (!body) return;
    const opts = this._pcGetOptions();
    // Extract the inner document HTML from preview
    const html = this._pcBuildDocument(opts);
    this._pcOpenPrintWindow(html);
    this._pcAddHistory(opts);
  },

  /* ---------- Batch print ---------- */
  _pcBatchPrint() {
    if (!this._pcSelectedTemplate) return;
    const modal = new bootstrap.Modal(document.getElementById('pcBatchModal'));
    this._pcBatchFilterStudents();
    modal.show();
  },

  _pcBatchExecute() {
    const checked = document.querySelectorAll('.pc-batch-chk:checked');
    if (checked.length === 0) { Utils.toast('לא נבחרו תלמידים', 'warning'); return; }

    const ids = Array.from(checked).map(c => c.value);
    const students = ids.map(id => this._pcStudents.find(s => s.id === id)).filter(Boolean);

    // Build combined document for all students
    let combinedHtml = '';
    students.forEach((student, i) => {
      const opts = { ...this._pcGetOptions(), student, studentId: student.id };
      combinedHtml += this._pcBuildDocument(opts);
      if (i < students.length - 1) {
        combinedHtml += '<div style="page-break-after: always"></div>';
      }
    });

    this._pcOpenPrintWindow(combinedHtml);

    // Add history entries
    students.forEach(student => {
      const opts = { ...this._pcGetOptions(), student, studentId: student.id };
      this._pcAddHistory(opts);
    });

    bootstrap.Modal.getInstance(document.getElementById('pcBatchModal'))?.hide();
    Utils.toast(`נשלחו ${students.length} מסמכים להדפסה`, 'success');
    // Re-render to update history
    if (typeof App !== 'undefined' && App.navigate) App.navigate('printcenter');
  },

  /* ---------- History management ---------- */
  _pcAddHistory(opts) {
    const hist = this._pcGetHistory();
    const tpl = this._pcTemplates.find(t => t.id === opts.templateId);
    hist.unshift({
      id: this._pcNextHistId++,
      templateId: opts.templateId,
      target: opts.student ? opts.student.name : (opts.cls || 'כללי'),
      date: opts.date,
      details: tpl ? tpl.name : opts.templateId,
      opts: JSON.parse(JSON.stringify(opts)),
    });
    this._pcSaveHistory(hist);
  },

  _pcReprintFromHistory(id) {
    const hist = this._pcGetHistory();
    const entry = hist.find(h => h.id === id);
    if (!entry || !entry.opts) return;
    const html = this._pcBuildDocument(entry.opts);
    this._pcOpenPrintWindow(html);
    Utils.toast('נשלח להדפסה', 'success');
  },

  _pcDeleteHistory(id) {
    let hist = this._pcGetHistory();
    hist = hist.filter(h => h.id !== id);
    this._pcSaveHistory(hist);
    if (typeof App !== 'undefined' && App.navigate) App.navigate('printcenter');
  },

  _pcClearHistory() {
    if (!confirm('למחוק את כל היסטוריית ההדפסות?')) return;
    localStorage.removeItem(this._pcHistoryLS);
    if (typeof App !== 'undefined' && App.navigate) App.navigate('printcenter');
  },

  /* =================================================================
     PRINT WINDOW
     ================================================================= */
  _pcOpenPrintWindow(bodyHtml) {
    const w = window.open('', '_blank', 'width=800,height=900');
    if (!w) { Utils.toast('חלון ההדפסה נחסם — אפשר חלונות קופצים', 'danger'); return; }
    w.document.write(`<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<title>בית התלמוד — הדפסה</title>
<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;700;900&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Heebo', 'David', sans-serif;
    direction: rtl;
    color: #1a1a1a;
    line-height: 1.6;
    padding: 20px;
    background: #fff;
  }
  .pc-doc {
    max-width: 750px;
    margin: 0 auto;
    padding: 40px;
    border: 2px solid #1a3e5c;
    border-radius: 8px;
    position: relative;
  }
  .pc-doc::before {
    content: '';
    position: absolute;
    inset: 4px;
    border: 1px solid #d0d7de;
    border-radius: 6px;
    pointer-events: none;
  }
  .pc-header {
    text-align: center;
    border-bottom: 3px double #1a3e5c;
    padding-bottom: 16px;
    margin-bottom: 24px;
  }
  .pc-logo-placeholder {
    width: 80px; height: 80px;
    border: 2px dashed #adb5bd;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
    color: #6c757d;
    font-size: 0.75rem;
  }
  .pc-inst-name {
    font-size: 1.8rem;
    font-weight: 700;
    color: #1a3e5c;
  }
  .pc-inst-sub {
    font-size: 0.95rem;
    color: #555;
  }
  .pc-title {
    font-size: 1.4rem;
    font-weight: 700;
    text-align: center;
    margin: 16px 0;
    color: #1a3e5c;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 8px;
  }
  .pc-body { margin: 20px 0; }
  .pc-field { margin-bottom: 8px; }
  .pc-field-label { font-weight: 700; display: inline-block; min-width: 120px; }
  .pc-table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
  }
  .pc-table th, .pc-table td {
    border: 1px solid #333;
    padding: 8px 12px;
    text-align: right;
  }
  .pc-table th {
    background: #1a3e5c;
    color: #fff;
    font-weight: 600;
  }
  .pc-table tr:nth-child(even) { background: #f8f9fa; }
  .pc-footer {
    border-top: 2px solid #1a3e5c;
    margin-top: 32px;
    padding-top: 12px;
    text-align: center;
    font-size: 0.85rem;
    color: #666;
  }
  .pc-signature {
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
  }
  .pc-sig-box {
    text-align: center;
    min-width: 150px;
  }
  .pc-sig-line {
    border-top: 1px solid #333;
    margin-top: 40px;
    padding-top: 4px;
    font-size: 0.85rem;
  }
  .pc-cert-frame {
    border: 8px double #b8860b;
    border-radius: 12px;
    padding: 40px 50px;
    background: linear-gradient(135deg, #fffef5 0%, #fff9e6 50%, #fffef5 100%);
    text-align: center;
    max-width: 750px;
    margin: 0 auto;
    position: relative;
  }
  .pc-cert-frame::before {
    content: '';
    position: absolute;
    inset: 6px;
    border: 2px solid #d4a853;
    border-radius: 8px;
    pointer-events: none;
  }
  .pc-cert-title { font-size: 2rem; font-weight: 900; color: #b8860b; margin: 16px 0 8px; }
  .pc-cert-student { font-size: 1.6rem; font-weight: 700; color: #1a3e5c; margin: 24px 0; }
  .pc-cert-text { font-size: 1.1rem; color: #333; margin: 16px 0; }

  .no-print { margin: 20px auto; text-align: center; }
  .no-print button {
    padding: 10px 32px;
    font-size: 1rem;
    font-family: 'Heebo', sans-serif;
    background: #1a3e5c;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin: 0 8px;
  }
  .no-print button:hover { background: #15334d; }
  .no-print .btn-close-print { background: #6c757d; }
  .no-print .btn-close-print:hover { background: #565e64; }

  @media print {
    body { padding: 0; }
    .no-print { display: none !important; }
    .pc-doc, .pc-cert-frame { border-color: #000; }
    .pc-doc::before { border-color: #999; }
  }
</style>
</head>
<body>
  <div class="no-print">
    <button onclick="window.print()">🖨️ הדפס</button>
    <button class="btn-close-print" onclick="window.close()">סגור</button>
  </div>
  ${bodyHtml}
</body>
</html>`);
    w.document.close();
  },

  /* =================================================================
     DOCUMENT BUILDERS
     ================================================================= */
  _pcBuildDocument(opts) {
    switch (opts.templateId) {
      case 'student_card':     return this._pcBuildStudentCard(opts);
      case 'attendance':       return this._pcBuildAttendance(opts);
      case 'certificate':      return this._pcBuildCertificate(opts);
      case 'invoice':          return this._pcBuildInvoice(opts);
      case 'grades':           return this._pcBuildGrades(opts);
      case 'class_list':       return this._pcBuildClassList(opts);
      case 'parent_letter':    return this._pcBuildParentLetter(opts);
      case 'registration':     return this._pcBuildRegistration(opts);
      case 'trip_list':        return this._pcBuildTripList(opts);
      case 'class_roster':     return this._pcBuildClassRoster(opts);
      case 'empty_attendance': return this._pcBuildEmptyAttendance(opts);
      default: return '<p>\u05EA\u05D1\u05E0\u05D9\u05EA \u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D4</p>';
    }
  },

  _pcDocHeader(opts, title) {
    return `
      <div class="pc-header">
        ${opts.showLogo ? '<div class="pc-logo-placeholder">לוגו</div>' : ''}
        <div class="pc-inst-name">בית התלמוד</div>
        <div class="pc-inst-sub">מוסד חינוכי תורני</div>
        ${opts.customHeader ? `<div style="margin-top:8px;font-weight:600;color:#333">${opts.customHeader}</div>` : ''}
      </div>
      <div class="pc-title">${title}</div>
    `;
  },

  _pcDocFooter(opts) {
    return `
      <div class="pc-footer">
        ${opts.customFooter || 'בית התלמוד — מוסד חינוכי תורני | טלפון: 02-1234567 | פקס: 02-7654321'}
        <div style="margin-top:4px;font-size:.75rem;color:#999">הופק בתאריך: ${opts.date}</div>
      </div>
    `;
  },

  _pcDocSignature() {
    return `
      <div class="pc-signature">
        <div class="pc-sig-box">
          <div class="pc-sig-line">חתימת המנהל</div>
        </div>
        <div class="pc-sig-box">
          <div class="pc-sig-line">חותמת המוסד</div>
        </div>
      </div>
    `;
  },

  /* --- Student Card --- */
  _pcBuildStudentCard(opts) {
    const s = opts.student || this._pcStudents[0];
    return `
      <div class="pc-doc" style="max-width:450px">
        ${this._pcDocHeader(opts, 'כרטיס תלמיד')}
        <div class="pc-body" style="text-align:center">
          <div style="width:100px;height:100px;border-radius:50%;background:#e9ecef;display:inline-flex;align-items:center;justify-content:center;font-size:2rem;font-weight:700;color:#1a3e5c;margin-bottom:16px;border:3px solid #1a3e5c">
            ${s.name.split(' ').map(w => w[0]).join('')}
          </div>
          <h3 style="color:#1a3e5c;margin-bottom:16px">${s.name}</h3>
          <div style="text-align:right;max-width:280px;margin:0 auto">
            <div class="pc-field"><span class="pc-field-label">מס\' תלמיד:</span> ${s.id}</div>
            <div class="pc-field"><span class="pc-field-label">כיתה:</span> ${s.cls}</div>
            <div class="pc-field"><span class="pc-field-label">טלפון:</span> ${s.phone}</div>
            <div class="pc-field"><span class="pc-field-label">הורה:</span> ${s.parent}</div>
            <div class="pc-field"><span class="pc-field-label">שנת לימודים:</span> תשפ"ו</div>
          </div>
        </div>
        ${this._pcDocFooter(opts)}
      </div>
    `;
  },

  /* --- Attendance Report --- */
  _pcBuildAttendance(opts) {
    const s = opts.student;
    const students = s ? [s] : (opts.cls ? this._pcStudents.filter(x => x.cls === opts.cls) : this._pcStudents);
    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי'];
    const statuses = ['נוכח', 'נוכח', 'נוכח', 'חיסור', 'נוכח', 'איחור', 'נוכח'];

    return `
      <div class="pc-doc">
        ${this._pcDocHeader(opts, s ? `דוח נוכחות — ${s.name}` : `דוח נוכחות${opts.cls ? ' — ' + opts.cls : ''}`)}
        <div class="pc-body">
          ${opts.dateFrom ? `<div class="pc-field"><span class="pc-field-label">תקופה:</span> ${opts.dateFrom} עד ${opts.dateTo || opts.date}</div>` : ''}
          <table class="pc-table">
            <thead>
              <tr>
                <th>שם התלמיד</th>
                ${days.map(d => `<th>${d}</th>`).join('')}
                <th>% נוכחות</th>
              </tr>
            </thead>
            <tbody>
              ${students.map(st => {
                const row = days.map(() => statuses[Math.floor(Math.random() * statuses.length)]);
                const present = row.filter(r => r === 'נוכח').length;
                const pct = Math.round((present / days.length) * 100);
                return `<tr>
                  <td style="font-weight:600">${st.name}</td>
                  ${row.map(r => `<td style="color:${r === 'נוכח' ? '#198754' : r === 'איחור' ? '#fd7e14' : '#dc3545'}">${r}</td>`).join('')}
                  <td style="font-weight:700">${pct}%</td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
        ${this._pcDocSignature()}
        ${this._pcDocFooter(opts)}
      </div>
    `;
  },

  /* --- Certificate --- */
  _pcBuildCertificate(opts) {
    const s = opts.student || this._pcStudents[0];
    return `
      <div class="pc-cert-frame">
        ${opts.showLogo ? '<div class="pc-logo-placeholder" style="border-color:#b8860b;color:#b8860b">לוגו</div>' : ''}
        <div style="font-size:1rem;letter-spacing:6px;color:#b8860b;margin-bottom:4px">✦ ✦ ✦</div>
        <div class="pc-inst-name" style="color:#1a3e5c">בית התלמוד</div>
        <div class="pc-inst-sub">מוסד חינוכי תורני</div>
        ${opts.customHeader ? `<div style="margin-top:8px;font-weight:600">${opts.customHeader}</div>` : ''}
        <div class="pc-cert-title">תעודת הצטיינות</div>
        <div style="font-size:1rem;color:#666">מוענקת בזאת ל</div>
        <div class="pc-cert-student">${s.name}</div>
        <div class="pc-cert-text">
          על הישגים מצוינים בלימודים ובהתנהגות<br>
          במהלך שנת הלימודים תשפ"ו
        </div>
        <div style="margin-top:16px;color:#666">${s.cls}</div>
        <div style="margin-top:8px;color:#888;font-size:.9rem">תאריך: ${opts.date}</div>
        <div style="display:flex;justify-content:space-between;margin-top:40px;padding:0 40px;width:100%">
          <div style="text-align:center">
            <div style="border-top:1px solid #333;padding-top:4px;min-width:120px;font-size:.85rem">חתימת המנהל</div>
          </div>
          <div style="text-align:center">
            <div style="border-top:1px solid #333;padding-top:4px;min-width:120px;font-size:.85rem">חותמת המוסד</div>
          </div>
        </div>
        ${opts.customFooter ? `<div style="margin-top:16px;font-size:.8rem;color:#888">${opts.customFooter}</div>` : ''}
      </div>
    `;
  },

  /* --- Invoice / Receipt --- */
  _pcBuildInvoice(opts) {
    const s = opts.student || this._pcStudents[0];
    const amount = parseFloat(opts.invoiceAmount) || 0;
    const vat = Math.round(amount * 0.17);
    const total = amount + vat;

    return `
      <div class="pc-doc">
        ${this._pcDocHeader(opts, 'חשבונית / קבלה')}
        <div class="pc-body">
          <div style="display:flex;justify-content:space-between;margin-bottom:16px">
            <div>
              <div class="pc-field"><span class="pc-field-label">מספר חשבונית:</span> ${opts.invoiceNum || '—'}</div>
              <div class="pc-field"><span class="pc-field-label">תאריך:</span> ${opts.date}</div>
            </div>
            <div>
              <div class="pc-field"><span class="pc-field-label">לכבוד:</span> ${s.parent}</div>
              <div class="pc-field"><span class="pc-field-label">עבור:</span> ${s.name} (${s.cls})</div>
            </div>
          </div>
          <table class="pc-table">
            <thead>
              <tr>
                <th>#</th>
                <th>תיאור</th>
                <th>סכום</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>${opts.invoiceDesc || 'שכר לימוד'}</td>
                <td>₪${amount.toLocaleString()}</td>
              </tr>
              <tr>
                <td colspan="2" style="text-align:left;font-weight:600">סה"כ לפני מע"מ</td>
                <td>₪${amount.toLocaleString()}</td>
              </tr>
              <tr>
                <td colspan="2" style="text-align:left">מע"מ (17%)</td>
                <td>₪${vat.toLocaleString()}</td>
              </tr>
              <tr style="background:#1a3e5c;color:#fff">
                <td colspan="2" style="text-align:left;font-weight:700;border-color:#1a3e5c">סה"כ לתשלום</td>
                <td style="font-weight:700;font-size:1.1rem;border-color:#1a3e5c">₪${total.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
          <div style="margin-top:16px;padding:12px;background:#f8f9fa;border-radius:6px;font-size:.9rem">
            <strong>אופן תשלום:</strong> מזומן / העברה בנקאית / שיקים<br>
            <strong>תנאי תשלום:</strong> שוטף + 30
          </div>
        </div>
        ${this._pcDocSignature()}
        ${this._pcDocFooter(opts)}
      </div>
    `;
  },

  /* --- Grade Report --- */
  _pcBuildGrades(opts) {
    const s = opts.student || this._pcStudents[0];
    const subjects = [
      { name: 'גמרא', grade: 92 }, { name: 'חומש', grade: 88 },
      { name: 'הלכה', grade: 95 }, { name: 'נ"ך', grade: 85 },
      { name: 'משנה', grade: 90 }, { name: 'מוסר', grade: 87 },
      { name: 'אנגלית', grade: 78 }, { name: 'חשבון', grade: 82 },
    ];
    const avg = Math.round(subjects.reduce((sum, s) => sum + s.grade, 0) / subjects.length);

    return `
      <div class="pc-doc">
        ${this._pcDocHeader(opts, `דוח ציונים — ${s.name}`)}
        <div class="pc-body">
          <div class="pc-field"><span class="pc-field-label">תלמיד:</span> ${s.name}</div>
          <div class="pc-field"><span class="pc-field-label">כיתה:</span> ${s.cls}</div>
          <div class="pc-field"><span class="pc-field-label">מס\' תלמיד:</span> ${s.id}</div>
          ${opts.dateFrom ? `<div class="pc-field"><span class="pc-field-label">תקופה:</span> ${opts.dateFrom} עד ${opts.dateTo || opts.date}</div>` : ''}
          <table class="pc-table">
            <thead>
              <tr>
                <th>מקצוע</th>
                <th>ציון</th>
                <th>הערכה</th>
              </tr>
            </thead>
            <tbody>
              ${subjects.map(subj => {
                const rating = subj.grade >= 90 ? 'מצוין' : subj.grade >= 80 ? 'טוב מאוד' : subj.grade >= 70 ? 'טוב' : 'מספיק';
                const color = subj.grade >= 90 ? '#198754' : subj.grade >= 80 ? '#0d6efd' : subj.grade >= 70 ? '#fd7e14' : '#dc3545';
                return `<tr>
                  <td style="font-weight:600">${subj.name}</td>
                  <td style="color:${color};font-weight:700">${subj.grade}</td>
                  <td>${rating}</td>
                </tr>`;
              }).join('')}
              <tr style="background:#1a3e5c;color:#fff">
                <td style="font-weight:700;border-color:#1a3e5c">ממוצע כללי</td>
                <td style="font-weight:700;font-size:1.1rem;border-color:#1a3e5c">${avg}</td>
                <td style="border-color:#1a3e5c">${avg >= 90 ? 'מצוין' : avg >= 80 ? 'טוב מאוד' : 'טוב'}</td>
              </tr>
            </tbody>
          </table>
          <div style="margin-top:16px;padding:12px;background:#f8f9fa;border-radius:6px;font-size:.9rem">
            <strong>הערות המחנך:</strong> תלמיד שקדן ומשתתף באופן פעיל בשיעורים. ממשיך להתקדם בצורה יפה.
          </div>
        </div>
        ${this._pcDocSignature()}
        ${this._pcDocFooter(opts)}
      </div>
    `;
  },

  /* --- Class List --- */
  _pcBuildClassList(opts) {
    const cls = opts.cls || this._pcClasses[0];
    const students = opts.cls ? this._pcStudents.filter(s => s.cls === cls) : this._pcStudents;

    return `
      <div class="pc-doc">
        ${this._pcDocHeader(opts, `רשימת כיתה — ${cls}`)}
        <div class="pc-body">
          <div class="pc-field"><span class="pc-field-label">שנת לימודים:</span> תשפ"ו</div>
          <div class="pc-field"><span class="pc-field-label">מספר תלמידים:</span> ${students.length}</div>
          <table class="pc-table">
            <thead>
              <tr>
                <th style="width:40px">#</th>
                <th>שם התלמיד</th>
                <th>מס\' תלמיד</th>
                <th>טלפון</th>
                <th>שם הורה</th>
              </tr>
            </thead>
            <tbody>
              ${students.map((s, i) => `
                <tr>
                  <td>${i + 1}</td>
                  <td style="font-weight:600">${s.name}</td>
                  <td>${s.id}</td>
                  <td dir="ltr" style="text-align:right">${s.phone}</td>
                  <td>${s.parent}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        ${this._pcDocSignature()}
        ${this._pcDocFooter(opts)}
      </div>
    `;
  },

  /* --- Parent Letter --- */
  _pcBuildParentLetter(opts) {
    const s = opts.student || this._pcStudents[0];
    const body = opts.letterBody || 'הננו להודיעכם כי בית התלמוד מתכבד להזמין אתכם לערב הורים שיתקיים בע"ה ביום רביעי הקרוב בשעה 20:00 באולם המוסד.\n\nנשמח לראותכם ולשתף אתכם בהתקדמות בנכם בלימודים.';

    return `
      <div class="pc-doc">
        ${this._pcDocHeader(opts, 'מכתב להורים')}
        <div class="pc-body">
          <div style="margin-bottom:20px">
            <div>ב"ה, ${opts.date}</div>
          </div>
          <div style="margin-bottom:16px">
            <div style="font-weight:700">לכבוד</div>
            <div>הורי התלמיד ${s.name}</div>
            <div>משפחת ${s.parent}</div>
          </div>
          <div style="font-weight:700;margin-bottom:12px;font-size:1.1rem">הנדון: ${opts.customHeader || 'הודעה מבית התלמוד'}</div>
          <div style="white-space:pre-wrap;line-height:1.8;margin-bottom:24px">${body}</div>
          <div style="margin-bottom:8px">בברכה,</div>
          <div style="font-weight:700">הנהלת בית התלמוד</div>
        </div>
        ${this._pcDocSignature()}
        ${this._pcDocFooter(opts)}
      </div>
    `;
  },

  /* --- Registration Form --- */
  _pcBuildRegistration(opts) {
    const fieldStyle = 'border-bottom:1px solid #333;display:inline-block;min-width:200px;height:24px;margin-right:8px';

    return `
      <div class="pc-doc">
        ${this._pcDocHeader(opts, 'טופס רישום תלמיד חדש')}
        <div class="pc-body">
          <h6 style="color:#1a3e5c;border-bottom:1px solid #e0e0e0;padding-bottom:6px;margin-bottom:12px">פרטי התלמיד</h6>
          <div class="pc-field">שם פרטי: <span style="${fieldStyle}"></span> שם משפחה: <span style="${fieldStyle}"></span></div>
          <div class="pc-field">תאריך לידה: <span style="${fieldStyle}"></span> תעודת זהות: <span style="${fieldStyle}"></span></div>
          <div class="pc-field">כתובת: <span style="${fieldStyle};min-width:400px"></span></div>
          <div class="pc-field">כיתה מבוקשת: <span style="${fieldStyle}"></span></div>

          <h6 style="color:#1a3e5c;border-bottom:1px solid #e0e0e0;padding-bottom:6px;margin:20px 0 12px">פרטי ההורים</h6>
          <div class="pc-field">שם האב: <span style="${fieldStyle}"></span> טלפון: <span style="${fieldStyle}"></span></div>
          <div class="pc-field">שם האם: <span style="${fieldStyle}"></span> טלפון: <span style="${fieldStyle}"></span></div>
          <div class="pc-field">דוא"ל: <span style="${fieldStyle};min-width:300px"></span></div>

          <h6 style="color:#1a3e5c;border-bottom:1px solid #e0e0e0;padding-bottom:6px;margin:20px 0 12px">מידע רפואי</h6>
          <div class="pc-field">אלרגיות: <span style="${fieldStyle};min-width:400px"></span></div>
          <div class="pc-field">תרופות קבועות: <span style="${fieldStyle};min-width:400px"></span></div>
          <div class="pc-field">הערות רפואיות: <span style="${fieldStyle};min-width:400px"></span></div>

          <h6 style="color:#1a3e5c;border-bottom:1px solid #e0e0e0;padding-bottom:6px;margin:20px 0 12px">רקע לימודי</h6>
          <div class="pc-field">מוסד קודם: <span style="${fieldStyle}"></span> כיתה אחרונה: <span style="${fieldStyle}"></span></div>
          <div class="pc-field">הערות: <span style="${fieldStyle};min-width:400px"></span></div>

          <div style="margin-top:32px;padding:12px;background:#f8f9fa;border-radius:6px;font-size:.85rem">
            <strong>הצהרה:</strong> אני מאשר/ת כי כל הפרטים שמסרתי נכונים ומדויקים. אני מתחייב/ת לעדכן את המוסד בכל שינוי.
          </div>

          <div style="display:flex;justify-content:space-between;margin-top:32px">
            <div style="text-align:center">
              <div style="border-top:1px solid #333;padding-top:4px;min-width:150px;font-size:.85rem">חתימת ההורה</div>
            </div>
            <div style="text-align:center">
              <div style="border-top:1px solid #333;padding-top:4px;min-width:120px;font-size:.85rem">תאריך</div>
            </div>
            <div style="text-align:center">
              <div style="border-top:1px solid #333;padding-top:4px;min-width:150px;font-size:.85rem">חתימת המזכירות</div>
            </div>
          </div>
        </div>
        ${this._pcDocFooter(opts)}
      </div>
    `;
  },

  /* --- Trip Student List (רשימת תלמידים לטיול) --- */
  _pcBuildTripList(opts) {
    const cls = opts.cls || '';
    const students = cls ? this._pcStudents.filter(s => s.cls === cls) : this._pcStudents;

    // Enrich with medical data if available
    const medMap = {};
    if (this._pcMedicalData) {
      this._pcMedicalData.forEach(m => {
        const key = m['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4'] || m['\u05EA\u05DC\u05DE\u05D9\u05D3'] || m['\u05DE\u05D6\u05D4\u05D4'] || m['\u05E9\u05DD'] || '';
        if (key) medMap[key] = (m['\u05D4\u05E2\u05E8\u05D5\u05EA'] || m['\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA'] || m['\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA'] || m['\u05DE\u05D2\u05D1\u05DC\u05D5\u05EA'] || '').trim();
      });
    }

    return `
      <div class="pc-doc">
        ${this._pcDocHeader(opts, '\u05E8\u05E9\u05D9\u05DE\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05DC\u05D8\u05D9\u05D5\u05DC' + (cls ? ' \u2014 ' + cls : ''))}
        <div class="pc-body">
          <div class="pc-field"><span class="pc-field-label">\u05EA\u05D0\u05E8\u05D9\u05DA:</span> ${opts.date}</div>
          <div class="pc-field"><span class="pc-field-label">\u05DE\u05E1\u05E4\u05E8 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD:</span> ${students.length}</div>
          ${opts.customHeader ? `<div class="pc-field"><span class="pc-field-label">\u05D9\u05E2\u05D3 \u05D4\u05D8\u05D9\u05D5\u05DC:</span> ${opts.customHeader}</div>` : ''}
          <table class="pc-table">
            <thead>
              <tr>
                <th style="width:30px">#</th>
                <th>\u05E9\u05DD \u05DE\u05DC\u05D0</th>
                <th>\u05EA.\u05D6.</th>
                <th>\u05EA\u05D0\u05E8\u05D9\u05DA \u05DC\u05D9\u05D3\u05D4</th>
                <th>\u05D8\u05DC\u05E4\u05D5\u05DF</th>
                <th>\u05DB\u05EA\u05D5\u05D1\u05EA</th>
                <th>\u05D4\u05E2\u05E8\u05D5\u05EA \u05E8\u05E4\u05D5\u05D0\u05D9\u05D5\u05EA</th>
                <th style="width:100px">\u05D7\u05EA\u05D9\u05DE\u05EA \u05D4\u05D5\u05E8\u05D4</th>
              </tr>
            </thead>
            <tbody>
              ${students.map((s, i) => {
                const medNote = medMap[s.id] || medMap[s.name] || s.medicalNotes || '';
                return `<tr>
                  <td>${i + 1}</td>
                  <td style="font-weight:600">${s.name}</td>
                  <td>${s.idNumber}</td>
                  <td>${s.birthDate}</td>
                  <td dir="ltr" style="text-align:right">${s.phone}</td>
                  <td>${s.address}${s.city ? ', ' + s.city : ''}</td>
                  <td style="color:${medNote ? '#dc3545' : '#6c757d'};font-size:.85rem">${medNote || '\u05D0\u05D9\u05DF'}</td>
                  <td style="border-bottom:1px solid #999"></td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
          <div style="margin-top:20px;padding:12px;background:#f8f9fa;border-radius:6px;font-size:.85rem">
            <strong>\u05D4\u05E6\u05D4\u05E8\u05D4:</strong> \u05D0\u05E0\u05D9 \u05DE\u05D0\u05E9\u05E8/\u05EA \u05D0\u05EA \u05D4\u05E9\u05EA\u05EA\u05E4\u05D5\u05EA \u05D1\u05E0\u05D9/\u05D1\u05EA\u05D9 \u05D1\u05D8\u05D9\u05D5\u05DC \u05D4\u05DE\u05D5\u05E1\u05D3\u05D9 \u05D1\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05E0\u05E7\u05D5\u05D1.
          </div>
        </div>
        ${this._pcDocSignature()}
        ${this._pcDocFooter(opts)}
      </div>
    `;
  },

  /* --- Class Roster (רשימה שמית לפי כיתה) --- */
  _pcBuildClassRoster(opts) {
    const cls = opts.cls || this._pcClasses[0] || '';
    const students = cls ? this._pcStudents.filter(s => s.cls === cls) : this._pcStudents;

    // Enrich with parent data if available
    const parentMap = {};
    if (this._pcParentsData) {
      this._pcParentsData.forEach(p => {
        const key = p['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4'] || p['\u05EA\u05DC\u05DE\u05D9\u05D3'] || p['\u05DE\u05D6\u05D4\u05D4'] || '';
        if (key && !parentMap[key]) parentMap[key] = p;
      });
    }

    return `
      <div class="pc-doc">
        ${this._pcDocHeader(opts, '\u05E8\u05E9\u05D9\u05DE\u05D4 \u05E9\u05DE\u05D9\u05EA \u05DC\u05E4\u05D9 \u05DB\u05D9\u05EA\u05D4' + (cls ? ' \u2014 ' + cls : ''))}
        <div class="pc-body">
          <div class="pc-field"><span class="pc-field-label">\u05E9\u05E0\u05EA \u05DC\u05D9\u05DE\u05D5\u05D3\u05D9\u05DD:</span> \u05EA\u05E9\u05E4"\u05D5</div>
          <div class="pc-field"><span class="pc-field-label">\u05DE\u05E1\u05E4\u05E8 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD:</span> ${students.length}</div>
          <table class="pc-table" style="font-size:.85rem">
            <thead>
              <tr>
                <th style="width:28px">#</th>
                <th>\u05E9\u05DD</th>
                <th>\u05EA.\u05D6.</th>
                <th>\u05EA.\u05DC\u05D9\u05D3\u05D4</th>
                <th>\u05D8\u05DC\u05E4\u05D5\u05DF</th>
                <th>\u05DB\u05EA\u05D5\u05D1\u05EA</th>
                <th>\u05E2\u05D9\u05E8</th>
                <th>\u05D4\u05D5\u05E8\u05D9\u05DD</th>
                <th>\u05D8\u05DC\u05E4\u05D5\u05DF \u05D4\u05D5\u05E8\u05D9\u05DD</th>
              </tr>
            </thead>
            <tbody>
              ${students.map((s, i) => {
                const pData = parentMap[s.id] || {};
                const parentName = s.parent || ((pData['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9']||'') + ' ' + (pData['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4']||'')).trim();
                const parentPh = s.parentPhone || pData['\u05D8\u05DC\u05E4\u05D5\u05DF'] || '';
                return `<tr>
                  <td>${i + 1}</td>
                  <td style="font-weight:600">${s.name}</td>
                  <td>${s.idNumber}</td>
                  <td>${s.birthDate}</td>
                  <td dir="ltr" style="text-align:right">${s.phone}</td>
                  <td>${s.address}</td>
                  <td>${s.city}</td>
                  <td>${parentName}</td>
                  <td dir="ltr" style="text-align:right">${parentPh}</td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
        ${this._pcDocSignature()}
        ${this._pcDocFooter(opts)}
      </div>
    `;
  },

  /* --- Empty Attendance Form (טופס נוכחות ריק) --- */
  _pcBuildEmptyAttendance(opts) {
    const cls = opts.cls || this._pcClasses[0] || '';
    const students = cls ? this._pcStudents.filter(s => s.cls === cls) : this._pcStudents;

    return `
      <div class="pc-doc">
        ${this._pcDocHeader(opts, '\u05D8\u05D5\u05E4\u05E1 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA' + (cls ? ' \u2014 ' + cls : ''))}
        <div class="pc-body">
          <div class="pc-field"><span class="pc-field-label">\u05EA\u05D0\u05E8\u05D9\u05DA:</span> ${opts.date}</div>
          <div class="pc-field"><span class="pc-field-label">\u05DB\u05D9\u05EA\u05D4:</span> ${cls || '\u05DB\u05DC \u05D4\u05DB\u05D9\u05EA\u05D5\u05EA'}</div>
          <div class="pc-field"><span class="pc-field-label">\u05DE\u05E1\u05E4\u05E8 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD:</span> ${students.length}</div>
          <table class="pc-table">
            <thead>
              <tr>
                <th style="width:30px">#</th>
                <th>\u05E9\u05DD \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3</th>
                <th style="width:70px;text-align:center">\u05E0\u05D5\u05DB\u05D7</th>
                <th style="width:70px;text-align:center">\u05D7\u05D9\u05E1\u05D5\u05E8</th>
                <th style="width:70px;text-align:center">\u05D0\u05D9\u05D7\u05D5\u05E8</th>
                <th>\u05D4\u05E2\u05E8\u05D5\u05EA</th>
              </tr>
            </thead>
            <tbody>
              ${students.map((s, i) => `
                <tr>
                  <td>${i + 1}</td>
                  <td style="font-weight:600">${s.name}</td>
                  <td style="text-align:center"><span style="display:inline-block;width:20px;height:20px;border:2px solid #333;border-radius:3px"></span></td>
                  <td style="text-align:center"><span style="display:inline-block;width:20px;height:20px;border:2px solid #333;border-radius:3px"></span></td>
                  <td style="text-align:center"><span style="display:inline-block;width:20px;height:20px;border:2px solid #333;border-radius:3px"></span></td>
                  <td style="border-bottom:1px dotted #999;min-width:120px"></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div style="margin-top:24px;display:flex;justify-content:space-between">
            <div>
              <div class="pc-field"><span class="pc-field-label">\u05E1\u05D4"\u05DB \u05E0\u05D5\u05DB\u05D7\u05D9\u05DD:</span> _____</div>
              <div class="pc-field"><span class="pc-field-label">\u05E1\u05D4"\u05DB \u05D7\u05D9\u05E1\u05D5\u05E8\u05D9\u05DD:</span> _____</div>
              <div class="pc-field"><span class="pc-field-label">\u05E1\u05D4"\u05DB \u05D0\u05D9\u05D7\u05D5\u05E8\u05D9\u05DD:</span> _____</div>
            </div>
            <div style="text-align:center;min-width:150px">
              <div style="border-top:1px solid #333;padding-top:4px;margin-top:60px;font-size:.85rem">\u05D7\u05EA\u05D9\u05DE\u05EA \u05D4\u05DE\u05D7\u05E0\u05DA</div>
            </div>
          </div>
        </div>
        ${this._pcDocFooter(opts)}
      </div>
    `;
  },

});
