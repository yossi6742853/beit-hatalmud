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
    { id: 'registration',   name: 'טופס רישום חדש',     icon: 'bi-pencil-square',     color: 'danger',   desc: 'טופס רישום ריק לתלמיד חדש — להדפסה ומילוי ידני' },
    { id: 'phone_list',     name: 'מספרי טלפון לפי כיתה', icon: 'bi-telephone-fill',   color: 'teal',     desc: 'ספר טלפונים להדפסה — תלמידים והורים לפי כיתה' },
    { id: 'attendance_monthly', name: 'דוח נוכחות חודשי', icon: 'bi-calendar2-range-fill', color: 'success', desc: 'טבלת נוכחות חודשית — שורה לתלמיד, עמודה לכל יום בחודש' },
    { id: 'behavior_report',    name: '\u05D3\u05D5\u05D7 \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA \u05D7\u05D5\u05D3\u05E9\u05D9', icon: 'bi-star-half',          color: 'danger',   desc: '\u05E1\u05D9\u05DB\u05D5\u05DD \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA \u05D7\u05D5\u05D3\u05E9\u05D9 \u05DC\u05DB\u05DC \u05EA\u05DC\u05DE\u05D9\u05D3 \u2014 \u05D7\u05D9\u05D5\u05D1\u05D9/\u05E9\u05DC\u05D9\u05DC\u05D9, \u05E0\u05D9\u05E7\u05D5\u05D3 \u05E0\u05D8\u05D5, \u05D0\u05D9\u05E8\u05D5\u05E2 \u05D0\u05D7\u05E8\u05D5\u05DF' },
    { id: 'finance_summary',   name: '\u05D3\u05D5\u05D7 \u05DB\u05E1\u05E4\u05D9 \u05D7\u05D5\u05D3\u05E9\u05D9', icon: 'bi-cash-stack',         color: 'success',  desc: '\u05E1\u05D9\u05DB\u05D5\u05DD \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD \u05D7\u05D5\u05D3\u05E9\u05D9 \u2014 \u05D7\u05D9\u05D5\u05D1\u05D9\u05DD, \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD, \u05D9\u05EA\u05E8\u05D5\u05EA' },
    { id: 'parent_letter',     name: '\u05DE\u05DB\u05EA\u05D1 \u05DC\u05D4\u05D5\u05E8\u05D9\u05DD',    icon: 'bi-envelope-paper-fill', color: 'purple',   desc: '\u05DE\u05DB\u05EA\u05D1 \u05DE\u05D5\u05D3\u05E4\u05E1 \u05DC\u05D4\u05D5\u05E8\u05D9\u05DD \u2014 \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA, \u05D0\u05D9\u05E9\u05D5\u05E8\u05D9 \u05D8\u05D9\u05D5\u05DC, \u05EA\u05D6\u05DB\u05D5\u05E8\u05D5\u05EA \u05EA\u05E9\u05DC\u05D5\u05DD \u05D5\u05D4\u05D6\u05DE\u05E0\u05D5\u05EA' },
    { id: 'student_attendance', name: '\u05D3\u05D5\u05D7 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3', icon: 'bi-person-check-fill', color: 'info', desc: '\u05E1\u05D9\u05DB\u05D5\u05DD \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D0\u05D9\u05E9\u05D9 \u05DC\u05EA\u05DC\u05DE\u05D9\u05D3 \u2014 \u05E4\u05D9\u05E8\u05D5\u05D8 \u05D7\u05D5\u05D3\u05E9\u05D9, \u05D0\u05D7\u05D5\u05D6\u05D9\u05DD \u05D5\u05D2\u05E8\u05E3' },
    { id: 'medication_list',    name: '\u05E8\u05E9\u05D9\u05DE\u05EA \u05EA\u05E8\u05D5\u05E4\u05D5\u05EA',   icon: 'bi-capsule',             color: 'danger',   desc: '\u05E8\u05E9\u05D9\u05DE\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05E2\u05DD \u05EA\u05E8\u05D5\u05E4\u05D5\u05EA \u05E7\u05D1\u05D5\u05E2\u05D5\u05EA, \u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA \u05D5\u05D0\u05D9\u05E9 \u05E7\u05E9\u05E8 \u05DC\u05D7\u05D9\u05E8\u05D5\u05DD' },
    { id: 'pettycash_report',   name: '\u05D3\u05D5\u05D7 \u05E7\u05D5\u05E4\u05D4 \u05E7\u05D8\u05E0\u05D4',  icon: 'bi-wallet2',             color: 'success',  desc: '\u05D3\u05D5\u05D7 \u05D4\u05D5\u05E6\u05D0\u05D5\u05EA \u05D5\u05D4\u05DB\u05E0\u05E1\u05D5\u05EA \u05DE\u05E7\u05D5\u05E4\u05D4 \u05E7\u05D8\u05E0\u05D4 \u05DC\u05E4\u05D9 \u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4 \u05D5\u05D7\u05D5\u05D3\u05E9' },
    { id: 'staff_salary',       name: '\u05D3\u05D5\u05D7 \u05E9\u05DB\u05E8 \u05E2\u05D5\u05D1\u05D3\u05D9\u05DD', icon: 'bi-cash-coin',          color: 'info',     desc: '\u05E8\u05D9\u05DB\u05D5\u05D6 \u05E9\u05DB\u05E8 \u05E2\u05D5\u05D1\u05D3\u05D9\u05DD \u05DC\u05E4\u05D9 \u05D7\u05D5\u05D3\u05E9 \u2014 \u05E9\u05DB\u05E8 \u05D1\u05E1\u05D9\u05E1, \u05E0\u05E1\u05D9\u05E2\u05D5\u05EA, \u05E4\u05E0\u05E1\u05D9\u05D4' },
    { id: 'mivtza_report',     name: '\u05D3\u05D5\u05D7 \u05DE\u05D1\u05E6\u05E2 \u05DC\u05D9\u05DE\u05D5\u05D3', icon: 'bi-trophy-fill',        color: 'warning',  desc: '\u05D3\u05D5\u05D7 \u05DE\u05D1\u05E6\u05E2 "\u05D9\u05EA\u05D2\u05D1\u05E8 \u05DB\u05D0\u05E8\u05D9" \u2014 \u05E9\u05D7\u05E8\u05D9\u05EA, \u05DE\u05E0\u05D7\u05D4, \u05DE\u05E2\u05E8\u05D9\u05D1, \u05D7\u05D1\u05E8\u05D5\u05EA\u05D0, \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA' },
    { id: 'staff_directory',   name: '\u05E1\u05E4\u05E8 \u05D8\u05DC\u05E4\u05D5\u05E0\u05D9\u05DD \u05E6\u05D5\u05D5\u05EA', icon: 'bi-person-lines-fill',  color: 'teal',     desc: '\u05E8\u05E9\u05D9\u05DE\u05EA \u05DB\u05DC \u05D0\u05E0\u05E9\u05D9 \u05D4\u05E6\u05D5\u05D5\u05EA \u05E2\u05DD \u05D8\u05DC\u05E4\u05D5\u05DF, \u05EA\u05E4\u05E7\u05D9\u05D3, \u05D5\u05EA\u05D7\u05D5\u05DD \u05D0\u05D7\u05E8\u05D9\u05D5\u05EA' },
    { id: 'daily_summary',    name: '\u05E1\u05D9\u05DB\u05D5\u05DD \u05D9\u05D5\u05DE\u05D9',       icon: 'bi-calendar-day',       color: 'purple',   desc: '\u05E1\u05D9\u05DB\u05D5\u05DD \u05D9\u05D5\u05DE\u05D9 \u05DE\u05E8\u05D5\u05DB\u05D6 \u2014 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD, \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA, \u05DE\u05E9\u05D9\u05DE\u05D5\u05EA, \u05DE\u05D9\u05D9\u05DC\u05D9\u05DD \u05D5\u05D4\u05EA\u05E8\u05D0\u05D5\u05EA' },
    { id: 'parent_directory', name: '\u05E8\u05E9\u05D9\u05DE\u05EA \u05D4\u05D5\u05E8\u05D9\u05DD',    icon: 'bi-people-fill',        color: 'primary',  desc: '\u05E8\u05E9\u05D9\u05DE\u05EA \u05DB\u05DC \u05D4\u05D4\u05D5\u05E8\u05D9\u05DD \u05E2\u05DD \u05D8\u05DC\u05E4\u05D5\u05DF, \u05E7\u05E9\u05E8 \u05DC\u05EA\u05DC\u05DE\u05D9\u05D3 \u05D5\u05E2\u05D9\u05E1\u05D5\u05E7' },
    { id: 'grade_report',     name: '\u05D3\u05D5\u05D7 \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD',       icon: 'bi-mortarboard-fill',   color: 'indigo',   desc: '\u05D3\u05D5\u05D7 \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD \u05DC\u05E4\u05D9 \u05DE\u05E7\u05E6\u05D5\u05E2 \u05D5\u05DB\u05D9\u05EA\u05D4 \u2014 \u05DE\u05DE\u05D5\u05E6\u05E2\u05D9\u05DD \u05D5\u05D4\u05E2\u05E8\u05D5\u05EA' }
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
    try { return JSON.parse(localStorage.getItem(this._pcHistoryLS) || '[]'); } catch(e) { return []; }
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

            <!-- Letter type & body for parent_letter -->
            <div class="col-md-4" id="pc-letter-type-wrap" style="display:none">
              <label class="form-label fw-bold">\u05E1\u05D5\u05D2 \u05DE\u05DB\u05EA\u05D1</label>
              <select class="form-select form-select-sm" id="pc-letter-type" onchange="Pages._pcFillLetterTemplate()">
                <option value="general">\u05D4\u05D5\u05D3\u05E2\u05D4 \u05DB\u05DC\u05DC\u05D9\u05EA</option>
                <option value="trip_permission">\u05D0\u05D9\u05E9\u05D5\u05E8 \u05D8\u05D9\u05D5\u05DC</option>
                <option value="fee_reminder">\u05EA\u05D6\u05DB\u05D5\u05E8\u05EA \u05EA\u05E9\u05DC\u05D5\u05DD</option>
                <option value="meeting_invite">\u05D4\u05D6\u05DE\u05E0\u05D4 \u05DC\u05E4\u05D2\u05D9\u05E9\u05D4</option>
                <option value="trip_announcement">\u05D4\u05D5\u05D3\u05E2\u05D4 \u05E2\u05DC \u05D8\u05D9\u05D5\u05DC</option>
                <option value="custom">\u05DE\u05DB\u05EA\u05D1 \u05D7\u05D5\u05E4\u05E9\u05D9</option>
              </select>
            </div>
            <div class="col-md-4" id="pc-letter-target-wrap" style="display:none">
              <label class="form-label fw-bold">\u05D4\u05D3\u05E4\u05E1\u05D4 \u05E2\u05D1\u05D5\u05E8</label>
              <select class="form-select form-select-sm" id="pc-letter-target">
                <option value="selected">\u05EA\u05DC\u05DE\u05D9\u05D3 \u05E0\u05D1\u05D7\u05E8 / \u05DB\u05D9\u05EA\u05D4</option>
                <option value="all">\u05DB\u05DC \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</option>
              </select>
            </div>
            <div class="col-12" id="pc-letter-body-wrap" style="display:none">
              <label class="form-label fw-bold">\u05EA\u05D5\u05DB\u05DF \u05D4\u05DE\u05DB\u05EA\u05D1</label>
              <textarea class="form-control form-control-sm" id="pc-letter-body" rows="6" placeholder="\u05DB\u05EA\u05D5\u05D1 \u05DB\u05D0\u05DF \u05D0\u05EA \u05EA\u05D5\u05DB\u05DF \u05D4\u05DE\u05DB\u05EA\u05D1..." dir="rtl"></textarea>
              <small class="text-muted">\u05EA\u05D2\u05D9\u05D5\u05EA \u05D6\u05DE\u05D9\u05E0\u05D5\u05EA: {student} = \u05E9\u05DD \u05EA\u05DC\u05DE\u05D9\u05D3, {parent} = \u05E9\u05DD \u05D4\u05D5\u05E8\u05D4, {family} = \u05E9\u05DD \u05DE\u05E9\u05E4\u05D7\u05D4, {class} = \u05DB\u05D9\u05EA\u05D4, {date} = \u05EA\u05D0\u05E8\u05D9\u05DA</small>
            </div>

            <!-- Month selector for attendance_monthly -->
            <div class="col-md-4" id="pc-month-wrap" style="display:none">
              <label class="form-label fw-bold">\u05D7\u05D5\u05D3\u05E9</label>
              <input type="month" class="form-control form-control-sm" id="pc-month" value="${today.slice(0, 7)}">
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

  printcenterInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    this._pcSelectedTemplate = null;

    // Load REAL student data from API
    try {
      const raw = _gc('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
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

    // Load attendance data for monthly report
    try {
      var attRaw = _gc('\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA');
      if (attRaw && attRaw.length) {
        this._pcAttendanceData = attRaw;
      }
    } catch (e) { /* optional */ }

    // Also try to load medical data for trip list
    try {
      const medRaw = _gc('\u05DE\u05D9\u05D3\u05E2_\u05E8\u05E4\u05D5\u05D0\u05D9');
      if (medRaw && medRaw.length) {
        this._pcMedicalData = medRaw;
      }
    } catch (e) { /* optional */ }

    // Also try to load parent data
    try {
      const parentsRaw = _gc('\u05D4\u05D5\u05E8\u05D9\u05DD');
      if (parentsRaw && parentsRaw.length) {
        this._pcParentsData = parentsRaw;
      }
    } catch (e) { /* optional */ }

    // Load behavior data for behavior report
    try {
      const behRaw = _gc('\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA');
      if (behRaw && behRaw.length) {
        this._pcBehaviorData = behRaw;
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
    const isLetter = tplId === 'parent_letter';
    document.getElementById('pc-letter-type-wrap').style.display = isLetter ? '' : 'none';
    document.getElementById('pc-letter-target-wrap').style.display = isLetter ? '' : 'none';
    document.getElementById('pc-letter-body-wrap').style.display = isLetter ? '' : 'none';
    if (isLetter) { this._pcFillLetterTemplate(); }
    document.getElementById('pc-invoice-wrap').style.display = tplId === 'invoice' ? '' : 'none';
    var monthWrap = document.getElementById('pc-month-wrap');
    if (monthWrap) monthWrap.style.display = (tplId === 'attendance_monthly' || tplId === 'behavior_report' || tplId === 'finance_summary' || tplId === 'student_attendance') ? '' : 'none';

    // For registration/phone_list, hide student selector since not needed
    const hideStudentSel = tplId === 'registration' || tplId === 'phone_list';
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
      letterType: document.getElementById('pc-letter-type')?.value || 'general',
      letterTarget: document.getElementById('pc-letter-target')?.value || 'selected',
      invoiceAmount: document.getElementById('pc-invoice-amount')?.value || '0',
      invoiceDesc: document.getElementById('pc-invoice-desc')?.value || '',
      invoiceNum: document.getElementById('pc-invoice-num')?.value || '',
      month: document.getElementById('pc-month')?.value || new Date().toISOString().slice(0, 7),
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

  async _pcClearHistory() {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05EA \u05D4\u05D9\u05E1\u05D8\u05D5\u05E8\u05D9\u05D4', '\u05DC\u05DE\u05D7\u05D5\u05E7 \u05D0\u05EA \u05DB\u05DC \u05D4\u05D9\u05E1\u05D8\u05D5\u05E8\u05D9\u05D9\u05EA \u05D4\u05D4\u05D3\u05E4\u05E1\u05D5\u05EA?')) return;
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
      case 'phone_list':      return this._pcBuildPhoneList(opts);
      case 'attendance_monthly': return this._pcBuildAttendanceMonthly(opts);
      case 'behavior_report':    return this._pcBuildBehaviorReport(opts);
      case 'finance_summary':    return this._pcBuildFinanceSummary(opts);
      case 'student_attendance': return this._pcBuildStudentAttendance(opts);
      case 'medication_list':    return this._pcBuildMedicationList(opts);
      case 'pettycash_report':   return this._pcBuildPettyCashReport(opts);
      case 'staff_salary':       return this._pcBuildStaffSalary(opts);
      case 'mivtza_report':      return this._pcBuildMivtzaReport(opts);
      case 'staff_directory':    return this._pcBuildStaffDirectory(opts);
      case 'daily_summary':      return this._pcBuildDailySummary(opts);
      case 'parent_directory':   return this._pcBuildParentDirectory(opts);
      case 'grade_report':       return this._pcBuildGradeReport(opts);
      default: return '<p>\u05EA\u05D1\u05E0\u05D9\u05EA \u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D4</p>';
    }
  },

  _pcDocHeader(opts, title) {
    const printDate = opts.date || new Date().toLocaleDateString('he-IL');
    return `
      <div class="pc-header">
        ${opts.showLogo ? `<div style="text-align:center;margin-bottom:16px">
          <div style="display:flex;justify-content:center;align-items:center;margin-bottom:8px">
            <img src="img/logo-bht.png" style="height:64px" alt="\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3">
          </div>
          <h2 style="margin:0;font-family:Heebo;font-weight:800;letter-spacing:.5px">\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3</h2>
          <p style="margin:4px 0 0;font-size:12px;color:#666">\u05E8\u05D7\u05F3 \u05E0\u05D7\u05DC \u05E9\u05D5\u05E8\u05E7, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9 | \u05D8\u05DC: 02-1234567</p>
          <div style="font-size:10px;color:#999;margin-top:2px">\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05D3\u05E4\u05E1\u05D4: ${printDate}</div>
        </div>` : `<div class="pc-inst-name" style="font-weight:800">\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3</div><div class="pc-inst-sub">\u05DE\u05D5\u05E1\u05D3 \u05D7\u05D9\u05E0\u05D5\u05DB\u05D9 \u05EA\u05D5\u05E8\u05E0\u05D9</div><div style="font-size:10px;color:#999;margin-top:2px">\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05D3\u05E4\u05E1\u05D4: ${printDate}</div>`}
        ${opts.customHeader ? `<div style="margin-top:8px;font-weight:600;color:#333">${opts.customHeader}</div>` : ''}
        <hr style="border:none;border-top:2px solid #333;margin:12px 0 8px">
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
          <img src="img/signature.png" style="height:40px;margin-bottom:4px;opacity:.85" alt="חתימה">
          <div class="pc-sig-line">חתימת המנהל</div>
        </div>
        <div class="pc-sig-box">
          <img src="img/stamp-bht.png" style="height:50px;margin-bottom:4px;opacity:.85" alt="חותמת">
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
        ${opts.showLogo ? '<img src="img/logo-bht.png" style="height:60px;margin-bottom:8px" alt="בית התלמוד">' : ''}
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

  /* --- Parent Letter: template definitions --- */
  _pcLetterTemplates: {
    general: {
      subject: '\u05D4\u05D5\u05D3\u05E2\u05D4 \u05DB\u05DC\u05DC\u05D9\u05EA',
      body: '\u05DC\u05DB\u05D1\u05D5\u05D3 \u05D4\u05D5\u05E8\u05D9 {student}, \u05E9\u05DC\u05D5\u05DD \u05D5\u05D1\u05E8\u05DB\u05D4.\n\n\u05D4\u05E0\u05E0\u05D5 \u05DC\u05D4\u05D5\u05D3\u05D9\u05E2\u05DB\u05DD \u05DB\u05D9 \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3 \u05DE\u05EA\u05DB\u05D1\u05D3 \u05DC\u05D4\u05D6\u05DE\u05D9\u05DF \u05D0\u05EA\u05DB\u05DD \u05DC\u05E2\u05E8\u05D1 \u05D4\u05D5\u05E8\u05D9\u05DD \u05E9\u05D9\u05EA\u05E7\u05D9\u05D9\u05DD \u05D1\u05E2"\u05D4 \u05D1\u05D9\u05D5\u05DD \u05E8\u05D1\u05D9\u05E2\u05D9 \u05D4\u05E7\u05E8\u05D5\u05D1 \u05D1\u05E9\u05E2\u05D4 20:00 \u05D1\u05D0\u05D5\u05DC\u05DD \u05D4\u05DE\u05D5\u05E1\u05D3.\n\n\u05E0\u05E9\u05DE\u05D7 \u05DC\u05E8\u05D0\u05D5\u05EA\u05DB\u05DD \u05D5\u05DC\u05E9\u05EA\u05E3 \u05D0\u05EA\u05DB\u05DD \u05D1\u05D4\u05EA\u05E7\u05D3\u05DE\u05D5\u05EA \u05D1\u05E0\u05DB\u05DD \u05D1\u05DC\u05D9\u05DE\u05D5\u05D3\u05D9\u05DD.'
    },
    trip_permission: {
      subject: '\u05D0\u05D9\u05E9\u05D5\u05E8 \u05D4\u05E9\u05EA\u05EA\u05E4\u05D5\u05EA \u05D1\u05D8\u05D9\u05D5\u05DC',
      body: '\u05D4\u05E8\u05D9\u05E0\u05D9 \u05DE\u05D0\u05E9\u05E8/\u05EA \u05D0\u05EA \u05D1\u05E0\u05D9/\u05D1\u05EA\u05D9 {student} \u05DE\u05DB\u05D9\u05EA\u05D4 {class} \u05DC\u05D4\u05E9\u05EA\u05EA\u05E3 \u05D1\u05D8\u05D9\u05D5\u05DC \u05E9\u05D9\u05EA\u05E7\u05D9\u05D9\u05DD \u05D1\u05E2"\u05D4 \u05D1\u05EA\u05D0\u05E8\u05D9\u05DA ____________.\n\n\u05D9\u05D3\u05D5\u05E2 \u05DC\u05D9 \u05DB\u05D9 \u05D4\u05D8\u05D9\u05D5\u05DC \u05DB\u05D5\u05DC\u05DC \u05E0\u05E1\u05D9\u05E2\u05D4 \u05D1\u05D0\u05D5\u05D8\u05D5\u05D1\u05D5\u05E1 \u05D5\u05DB\u05D9 \u05D9\u05E9 \u05DC\u05D3\u05D0\u05D5\u05D2 \u05DC\u05D1\u05E8\u05D9\u05D0\u05D5\u05EA \u05D5\u05DC\u05DE\u05D6\u05D5\u05DF \u05DE\u05EA\u05D0\u05D9\u05DD.\n\n\u05E0\u05D0 \u05DC\u05D4\u05D7\u05D6\u05D9\u05E8 \u05D8\u05D5\u05E4\u05E1 \u05D6\u05D4 \u05D7\u05EA\u05D5\u05DD \u05DC\u05DE\u05D5\u05E1\u05D3 \u05E2\u05D3 \u05EA\u05D0\u05E8\u05D9\u05DA ____________.\n\n\u05D7\u05EA\u05D9\u05DE\u05EA \u05D4\u05D5\u05E8\u05D4: ________________    \u05EA\u05D0\u05E8\u05D9\u05DA: ________________'
    },
    fee_reminder: {
      subject: '\u05EA\u05D6\u05DB\u05D5\u05E8\u05EA \u05EA\u05E9\u05DC\u05D5\u05DD',
      body: '\u05DC\u05DB\u05D1\u05D5\u05D3 \u05DE\u05E9\u05E4\u05D7\u05EA {family},\n\n\u05DC\u05D4\u05DC\u05DF \u05E2\u05D3\u05DB\u05D5\u05DF \u05D1\u05E0\u05D5\u05D2\u05E2 \u05DC\u05E9\u05DB\u05E8 \u05DC\u05D9\u05DE\u05D5\u05D3 \u05E2\u05D1\u05D5\u05E8 \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3 {student} \u05DE\u05DB\u05D9\u05EA\u05D4 {class}.\n\n\u05E2\u05DC \u05E4\u05D9 \u05E8\u05D9\u05E9\u05D5\u05DE\u05D9\u05E0\u05D5, \u05E7\u05D9\u05D9\u05DD \u05D7\u05D5\u05D1 \u05E4\u05EA\u05D5\u05D7 \u05D1\u05E1\u05DA ____________ \u05E9"\u05D7.\n\n\u05E0\u05D0 \u05DC\u05D4\u05E1\u05D3\u05D9\u05E8 \u05D0\u05EA \u05D4\u05EA\u05E9\u05DC\u05D5\u05DD \u05D1\u05D4\u05E7\u05D3\u05DD \u05D4\u05D0\u05E4\u05E9\u05E8\u05D9 \u05D1\u05D0\u05DE\u05E6\u05E2\u05D5\u05EA \u05D4\u05E2\u05D1\u05E8\u05D4 \u05D1\u05E0\u05E7\u05D0\u05D9\u05EA / \u05D4\u05DE\u05D7\u05D0\u05D4 / \u05DE\u05D6\u05D5\u05DE\u05DF, \u05D0\u05D5 \u05DC\u05E4\u05E0\u05D5\u05EA \u05DC\u05DE\u05D6\u05DB\u05D9\u05E8\u05D5\u05EA \u05DC\u05EA\u05D9\u05D0\u05D5\u05DD \u05EA\u05DB\u05E0\u05D9\u05EA \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD.\n\n\u05D1\u05D1\u05E8\u05DB\u05D4 \u05D5\u05D1\u05D4\u05D5\u05E7\u05E8\u05D4.'
    },
    meeting_invite: {
      subject: '\u05D4\u05D6\u05DE\u05E0\u05D4 \u05DC\u05E4\u05D2\u05D9\u05E9\u05D4',
      body: '\u05D4\u05E0\u05DB\u05DD \u05DE\u05D5\u05D6\u05DE\u05E0\u05D9\u05DD \u05DC\u05E4\u05D2\u05D9\u05E9\u05D4 \u05D1\u05E0\u05D5\u05E9\u05D0 {student} \u05DE\u05DB\u05D9\u05EA\u05D4 {class}.\n\n\u05D4\u05E4\u05D2\u05D9\u05E9\u05D4 \u05EA\u05EA\u05E7\u05D9\u05D9\u05DD \u05D1\u05E2"\u05D4 \u05D1\u05EA\u05D0\u05E8\u05D9\u05DA ____________ \u05D1\u05E9\u05E2\u05D4 ____________ \u05D1\u05DE\u05E9\u05E8\u05D3\u05D9 \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3.\n\n\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA\u05DB\u05DD \u05D7\u05E9\u05D5\u05D1\u05D4 \u05DC\u05E0\u05D5 \u05DE\u05D0\u05D5\u05D3 \u05D5\u05E0\u05E9\u05DE\u05D7 \u05DC\u05E8\u05D0\u05D5\u05EA\u05DB\u05DD.\n\n\u05E0\u05D0 \u05DC\u05D0\u05E9\u05E8 \u05D0\u05EA \u05D4\u05D2\u05E2\u05EA\u05DB\u05DD \u05D1\u05D8\u05DC\u05E4\u05D5\u05DF \u05DC\u05DE\u05D6\u05DB\u05D9\u05E8\u05D5\u05EA: 02-1234567.'
    },
    trip_announcement: {
      subject: '\u05D4\u05D5\u05D3\u05E2\u05D4 \u05E2\u05DC \u05D8\u05D9\u05D5\u05DC',
      body: '\u05E1"\u05D3\n\n\u05DC\u05DB\u05D1\u05D5\u05D3 \u05D4\u05D5\u05E8\u05D9 \u05D4\u05D1\u05D7\u05D5\u05E8\u05D9\u05DD \u05D4\u05D9\u05E7\u05E8\u05D9\u05DD\n\u05E9\u05DC\u05D5\u05DD \u05D5\u05D1\u05E8\u05DB\u05D4\n\n\u05D1\u05E9\u05D1\u05D7 \u05D5\u05D4\u05D5\u05D3\u05D9\u05D4 \u05DC\u05D4\u05E9\u05D9"\u05EA \u05E2\u05DC \u05D4\u05D4\u05EA\u05D7\u05DC\u05D4 \u05D4\u05E0\u05E4\u05DC\u05D0\u05D4 \u05E9\u05DC \u05D6\u05DE\u05DF \u05E7\u05D9\u05D9\u05E5.\n\n\u05E0\u05E6\u05D0 \u05D0\u05D9"\u05D4 \u05DC\u05D8\u05D9\u05D5\u05DC \u05D9\u05D5\u05DE\u05D9 \u05DE\u05D0\u05EA\u05D2\u05E8 \u05D5\u05DE\u05D4\u05E0\u05D4, \u05D1\u05D0\u05D6\u05D5\u05E8 ____________\n\n\u05DB\u05D5\u05DC\u05DC \u05D0\u05E8\u05D5\u05D7\u05EA \u05E6\u05D4\u05E8\u05D9\u05D9\u05DD\n\n\u05D1\u05D9\u05D5\u05DD ____________\n\n\u2022 \u05EA\u05E4\u05D9\u05DC\u05EA \u05E9\u05D7\u05E8\u05D9\u05EA \u05DB\u05E8\u05D2\u05D9\u05DC\n\u2022 \u05D9\u05E6\u05D9\u05D0\u05D4 \u05D1\u05E9\u05E2\u05D4 10:00\n\u2022 \u05D7\u05D6\u05E8\u05D4 \u05DE\u05E9\u05D5\u05E2\u05E8\u05EA \u2013 14:30\n\n50 \u20AA - \u05D1\u05DE\u05D6\u05D5\u05DE\u05DF \u05D1\u05DC\u05D1\u05D3!\n\n\u05D9\u05E9 \u05DC\u05D4\u05D1\u05D9\u05D0:\n\u2022 \u05DB\u05D5\u05D1\u05E2 \u05E9\u05DE\u05E9\n\u2022 \u05DE\u05D9\u05DD (\u05DC\u05E4\u05D7\u05D5\u05EA 3 \u05DC\u05D9\u05D8\u05E8)\n\u2022 \u05E0\u05E2\u05DC\u05D9\u05D9\u05DD \u05D8\u05D5\u05D1\u05D5\u05EA \u05DC\u05D4\u05DC\u05D9\u05DB\u05D4\n\n\u05D1\u05D1\u05E8\u05DB\u05D4,\n\u05D4\u05E8\u05D1 \u05D0\u05D4\u05D5\u05D3 \u05D9\u05E8\u05D5\u05E9\u05DC\u05DE\u05D9\n\u05DE\u05E0\u05D4\u05DC \u05D7\u05D9\u05E0\u05D5\u05DB\u05D9\n\u05DE\u05DB\u05D9\u05E0\u05D4 \u05DC\u05E6\u05E2\u05D9\u05E8\u05D9\u05DD \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3\n02-5476989 - \u05E9\u05DC\u05D5\u05D7\u05D4 3'
    },
    custom: {
      subject: '\u05DE\u05DB\u05EA\u05D1 \u05DE\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3',
      body: ''
    }
  },

  /* --- Fill letter body from template type --- */
  _pcFillLetterTemplate() {
    var sel = document.getElementById('pc-letter-type');
    var bodyEl = document.getElementById('pc-letter-body');
    if (!sel || !bodyEl) return;
    var type = sel.value;
    var tpl = this._pcLetterTemplates[type];
    if (tpl) {
      bodyEl.value = tpl.body;
      var headerEl = document.getElementById('pc-custom-header');
      if (headerEl && tpl.subject) headerEl.value = tpl.subject;
    }
  },

  /* --- Parent Letter (mail-merge, multi-student) --- */
  _pcBuildParentLetter(opts) {
    var letterType = opts.letterType || 'general';
    var tpl = this._pcLetterTemplates[letterType] || this._pcLetterTemplates.general;
    var bodyTemplate = opts.letterBody || tpl.body;
    var subject = opts.customHeader || tpl.subject;

    // Determine target students
    var students;
    if (opts.letterTarget === 'all') {
      var cls = opts.cls;
      students = cls ? this._pcStudents.filter(function(s) { return s.cls === cls; }) : this._pcStudents;
    } else if (opts.student) {
      students = [opts.student];
    } else {
      var cls2 = opts.cls;
      students = cls2 ? this._pcStudents.filter(function(s) { return s.cls === cls2; }) : [this._pcStudents[0]];
    }

    var self = this;
    return students.map(function(s) {
      // Mail-merge: replace placeholders
      var body = bodyTemplate
        .replace(/\{student\}/g, s.name)
        .replace(/\{parent\}/g, s.parent || '')
        .replace(/\{family\}/g, s.parent || '')
        .replace(/\{class\}/g, s.cls || '')
        .replace(/\{date\}/g, opts.date || '');

      var mergedSubject = subject
        .replace(/\{student\}/g, s.name)
        .replace(/\{parent\}/g, s.parent || '')
        .replace(/\{family\}/g, s.parent || '')
        .replace(/\{class\}/g, s.cls || '')
        .replace(/\{date\}/g, opts.date || '');

      return '\
      <div class="pc-doc">\
        ' + self._pcDocHeader(opts, '\u05DE\u05DB\u05EA\u05D1 \u05DC\u05D4\u05D5\u05E8\u05D9\u05DD') + '\
        <div class="pc-body">\
          <div style="margin-bottom:20px">\
            <div>\u05D1"\u05D4, ' + (opts.date || '') + '</div>\
          </div>\
          <div style="margin-bottom:16px">\
            <div style="font-weight:700">\u05DC\u05DB\u05D1\u05D5\u05D3</div>\
            <div>\u05D4\u05D5\u05E8\u05D9 \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3 ' + s.name + '</div>\
            <div>\u05DE\u05E9\u05E4\u05D7\u05EA ' + (s.parent || '') + '</div>\
          </div>\
          <div style="font-weight:700;margin-bottom:12px;font-size:1.1rem">\u05D4\u05E0\u05D3\u05D5\u05DF: ' + mergedSubject + '</div>\
          <div style="white-space:pre-wrap;line-height:1.8;margin-bottom:24px">' + body + '</div>\
          <div style="margin-top:30px;margin-bottom:8px">\u05D1\u05D1\u05E8\u05DB\u05D4,</div>\
          <div style="font-weight:700">\u05D4\u05E0\u05D4\u05DC\u05EA \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3</div>\
        </div>\
        ' + self._pcDocSignature() + '\
        ' + self._pcDocFooter(opts) + '\
      </div>';
    }).join('<div style="page-break-after:always"></div>');
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

  /* --- Phone List (מספרי טלפון לפי כיתה) --- */
  _pcBuildPhoneList(opts) {
    const cls = opts.cls || '';
    const students = (cls ? this._pcStudents.filter(s => s.cls === cls) : this._pcStudents)
      .slice().sort((a, b) => a.name.localeCompare(b.name, 'he'));

    // Build parent lookup from parents data
    const parentMap = {};
    if (this._pcParentsData) {
      this._pcParentsData.forEach(p => {
        const key = p['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4'] || p['\u05EA\u05DC\u05DE\u05D9\u05D3'] || p['\u05DE\u05D6\u05D4\u05D4'] || '';
        if (key) {
          if (!parentMap[key]) parentMap[key] = {};
          const rel = (p['\u05E7\u05E8\u05D1\u05D4'] || p['\u05E7\u05E8\u05D1\u05EA_\u05DE\u05E9\u05E4\u05D7\u05D4'] || '').trim();
          const name = ((p['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9'] || '') + ' ' + (p['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4'] || '')).trim();
          const phone = p['\u05D8\u05DC\u05E4\u05D5\u05DF'] || p['\u05E0\u05D9\u05D9\u05D3'] || '';
          if (rel === '\u05D0\u05DD' || rel === '\u05D0\u05DE\u05D0') {
            parentMap[key].motherName = name;
            parentMap[key].motherPhone = phone;
          } else {
            // Default to father
            if (!parentMap[key].fatherName) {
              parentMap[key].fatherName = name;
              parentMap[key].fatherPhone = phone;
            }
          }
        }
      });
    }

    return `
      <div class="pc-doc">
        ${this._pcDocHeader(opts, '\u05E1\u05E4\u05E8 \u05D8\u05DC\u05E4\u05D5\u05E0\u05D9\u05DD' + (cls ? ' \u2014 ' + cls : ''))}
        <div class="pc-body">
          <div class="pc-field"><span class="pc-field-label">\u05DB\u05D9\u05EA\u05D4:</span> ${cls || '\u05DB\u05DC \u05D4\u05DB\u05D9\u05EA\u05D5\u05EA'}</div>
          <div class="pc-field"><span class="pc-field-label">\u05DE\u05E1\u05E4\u05E8 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD:</span> ${students.length}</div>
          <table class="pc-table" style="font-size:.85rem">
            <thead>
              <tr>
                <th style="width:28px">#</th>
                <th>\u05E9\u05DD \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3</th>
                <th>\u05D8\u05DC\u05E4\u05D5\u05DF \u05EA\u05DC\u05DE\u05D9\u05D3</th>
                <th>\u05E9\u05DD \u05D0\u05D1</th>
                <th>\u05D8\u05DC\u05E4\u05D5\u05DF \u05D0\u05D1</th>
                <th>\u05E9\u05DD \u05D0\u05DD</th>
                <th>\u05D8\u05DC\u05E4\u05D5\u05DF \u05D0\u05DD</th>
                <th>\u05DB\u05EA\u05D5\u05D1\u05EA</th>
              </tr>
            </thead>
            <tbody>
              ${students.map((s, i) => {
                const pd = parentMap[s.id] || {};
                const fatherName = pd.fatherName || s.parent || '';
                const fatherPhone = pd.fatherPhone || s.parentPhone || '';
                const motherName = pd.motherName || '';
                const motherPhone = pd.motherPhone || '';
                const addr = (s.address || '') + (s.city ? ', ' + s.city : '');
                return `<tr>
                  <td>${i + 1}</td>
                  <td style="font-weight:600">${s.name}</td>
                  <td dir="ltr" style="text-align:right">${s.phone}</td>
                  <td>${fatherName}</td>
                  <td dir="ltr" style="text-align:right">${fatherPhone}</td>
                  <td>${motherName}</td>
                  <td dir="ltr" style="text-align:right">${motherPhone}</td>
                  <td>${addr}</td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
        ${this._pcDocFooter(opts)}
      </div>
    `;
  },

  /* --- Monthly Attendance Report (דוח נוכחות חודשי) --- */
  _pcBuildAttendanceMonthly(opts) {
    var monthStr = opts.month || new Date().toISOString().slice(0, 7);
    var parts = monthStr.split('-');
    var year = parseInt(parts[0], 10);
    var monthIdx = parseInt(parts[1], 10) - 1;
    var daysInMonth = new Date(year, monthIdx + 1, 0).getDate();

    var heMonths = ['\u05D9\u05E0\u05D5\u05D0\u05E8', '\u05E4\u05D1\u05E8\u05D5\u05D0\u05E8', '\u05DE\u05E8\u05E5', '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05DE\u05D0\u05D9', '\u05D9\u05D5\u05E0\u05D9',
                    '\u05D9\u05D5\u05DC\u05D9', '\u05D0\u05D5\u05D2\u05D5\u05E1\u05D8', '\u05E1\u05E4\u05D8\u05DE\u05D1\u05E8', '\u05D0\u05D5\u05E7\u05D8\u05D5\u05D1\u05E8', '\u05E0\u05D5\u05D1\u05DE\u05D1\u05E8', '\u05D3\u05E6\u05DE\u05D1\u05E8'];
    var monthName = heMonths[monthIdx] + ' ' + year;

    // Filter students by class if selected
    var cls = opts.cls || '';
    var students = cls ? this._pcStudents.filter(function(s) { return s.cls === cls; }) : this._pcStudents;

    // Build attendance lookup: key = "studentId|date" or "studentName|date" -> status
    var attMap = {};
    var attendance = this._pcAttendanceData || [];
    attendance.forEach(function(a) {
      var aDate = a['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '';
      if (!aDate) return;
      // Normalize date
      if (aDate.length !== 10) {
        try { var d = new Date(aDate); if (!isNaN(d.getTime())) aDate = d.toISOString().slice(0, 10); } catch(e) { return; }
      }
      if (aDate.slice(0, 7) !== monthStr) return;
      var sId = String(a['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4'] || '');
      var sName = a['\u05E9\u05DD'] || a['\u05EA\u05DC\u05DE\u05D9\u05D3'] || '';
      var status = a['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '';
      var day = parseInt(aDate.slice(8, 10), 10);
      if (sId) attMap[sId + '|' + day] = status;
      if (sName) attMap[sName + '|' + day] = status;
    });

    // Status display helpers
    var statusSymbol = function(st) {
      if (!st) return '';
      if (st === '\u05E0\u05D5\u05DB\u05D7') return '\u2713';
      if (st === '\u05D7\u05D9\u05E1\u05D5\u05E8') return '\u2717';
      if (st === '\u05D0\u05D9\u05D7\u05D5\u05E8') return '\u23F0';
      if (st === '\u05E4\u05D8\u05D5\u05E8') return '\u2713';
      return st.charAt(0);
    };
    var statusColor = function(st) {
      if (st === '\u05E0\u05D5\u05DB\u05D7') return '#198754';
      if (st === '\u05D7\u05D9\u05E1\u05D5\u05E8') return '#dc3545';
      if (st === '\u05D0\u05D9\u05D7\u05D5\u05E8') return '#fd7e14';
      if (st === '\u05E4\u05D8\u05D5\u05E8') return '#6c757d';
      return '#333';
    };

    // Day headers — skip Shabbat (Saturday)
    var dayHeaders = '';
    var activeDays = [];
    for (var d = 1; d <= daysInMonth; d++) {
      var dt = new Date(year, monthIdx, d);
      if (dt.getDay() === 6) continue; // Skip Shabbat
      activeDays.push(d);
      var dayName = ['\u05D0', '\u05D1', '\u05D2', '\u05D3', '\u05D4', '\u05D5', '\u05E9'][dt.getDay()];
      dayHeaders += '<th style="width:24px;font-size:.6rem;padding:2px;text-align:center;writing-mode:vertical-rl">' + d + '<br>' + dayName + '</th>';
    }

    // Summary totals
    var totalPresent = 0, totalAbsent = 0, totalLate = 0;

    // Student rows
    var rows = students.map(function(s, idx) {
      var sPresent = 0, sAbsent = 0, sLate = 0, sCounted = 0;
      var cells = activeDays.map(function(day) {
        var st = attMap[s.id + '|' + day] || attMap[s.name + '|' + day] || '';
        var sym = statusSymbol(st);
        var clr = statusColor(st);
        if (st === '\u05E0\u05D5\u05DB\u05D7' || st === '\u05E4\u05D8\u05D5\u05E8') { sPresent++; sCounted++; }
        else if (st === '\u05D7\u05D9\u05E1\u05D5\u05E8') { sAbsent++; sCounted++; }
        else if (st === '\u05D0\u05D9\u05D7\u05D5\u05E8') { sLate++; sCounted++; }
        return '<td style="text-align:center;padding:2px;font-size:.75rem;color:' + clr + '">' + sym + '</td>';
      }).join('');
      totalPresent += sPresent;
      totalAbsent += sAbsent;
      totalLate += sLate;
      var pct = sCounted > 0 ? Math.round((sPresent / sCounted) * 100) : '-';
      return '<tr><td style="font-weight:600;white-space:nowrap;font-size:.8rem">' + (idx + 1) + '</td><td style="font-weight:600;white-space:nowrap;font-size:.8rem">' + s.name + '</td>' + cells + '<td style="font-weight:700;text-align:center;font-size:.8rem">' + pct + (pct !== '-' ? '%' : '') + '</td></tr>';
    }).join('');

    // Summary row
    var summaryRow = '<tr style="background:#1a3e5c;color:#fff;font-weight:600"><td colspan="2" style="border-color:#1a3e5c;font-size:.8rem">\u05E1\u05D4"\u05DB</td>';
    summaryRow += activeDays.map(function(day) {
      var dayP = 0, dayA = 0, dayL = 0;
      students.forEach(function(s) {
        var st = attMap[s.id + '|' + day] || attMap[s.name + '|' + day] || '';
        if (st === '\u05E0\u05D5\u05DB\u05D7' || st === '\u05E4\u05D8\u05D5\u05E8') dayP++;
        else if (st === '\u05D7\u05D9\u05E1\u05D5\u05E8') dayA++;
        else if (st === '\u05D0\u05D9\u05D7\u05D5\u05E8') dayL++;
      });
      var total = dayP + dayA + dayL;
      return '<td style="text-align:center;padding:2px;font-size:.6rem;border-color:#1a3e5c">' + (total > 0 ? dayP : '') + '</td>';
    }).join('');
    summaryRow += '<td style="text-align:center;font-size:.75rem;border-color:#1a3e5c">' + totalPresent + '/' + (totalPresent + totalAbsent + totalLate) + '</td></tr>';

    return '<div class="pc-doc" style="max-width:100%">' +
      this._pcDocHeader(opts, '\u05D3\u05D5\u05D7 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D7\u05D5\u05D3\u05E9\u05D9 \u2014 ' + monthName + (cls ? ' \u2014 ' + cls : '')) +
      '<div class="pc-body">' +
        '<div style="display:flex;gap:24px;margin-bottom:12px">' +
          '<div class="pc-field"><span class="pc-field-label">\u05DE\u05E1\u05E4\u05E8 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD:</span> ' + students.length + '</div>' +
          '<div class="pc-field"><span class="pc-field-label">\u05D9\u05DE\u05D9 \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA:</span> ' + activeDays.length + '</div>' +
        '</div>' +
        '<div style="margin-bottom:8px;font-size:.75rem;color:#666">\u05DE\u05E7\u05E8\u05D0: <span style="color:#198754">\u2713 \u05E0\u05D5\u05DB\u05D7</span> &nbsp; <span style="color:#dc3545">\u2717 \u05D7\u05D9\u05E1\u05D5\u05E8</span> &nbsp; <span style="color:#fd7e14">\u23F0 \u05D0\u05D9\u05D7\u05D5\u05E8</span></div>' +
        '<div style="overflow-x:auto">' +
        '<table class="pc-table" style="font-size:.75rem">' +
          '<thead><tr><th style="width:28px">#</th><th style="min-width:100px">\u05E9\u05DD</th>' + dayHeaders + '<th style="width:50px">%</th></tr></thead>' +
          '<tbody>' + rows + summaryRow + '</tbody>' +
        '</table></div>' +
        '<div style="margin-top:16px;display:flex;gap:24px;font-size:.85rem">' +
          '<div><strong style="color:#198754">\u05E0\u05D5\u05DB\u05D7\u05D9\u05DD:</strong> ' + totalPresent + '</div>' +
          '<div><strong style="color:#dc3545">\u05D7\u05D9\u05E1\u05D5\u05E8\u05D9\u05DD:</strong> ' + totalAbsent + '</div>' +
          '<div><strong style="color:#fd7e14">\u05D0\u05D9\u05D7\u05D5\u05E8\u05D9\u05DD:</strong> ' + totalLate + '</div>' +
        '</div>' +
      '</div>' +
      this._pcDocSignature() +
      this._pcDocFooter(opts) +
    '</div>';
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

  /* --- Behavior Report (monthly) --- */
  _pcBuildBehaviorReport(opts) {
    var behData = this._pcBehaviorData || [];
    var month = opts.month || new Date().toISOString().slice(0, 7); // "YYYY-MM"
    var cls = opts.cls || '';

    // Filter by selected month
    var monthRows = behData.filter(function(r) {
      var d = r['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '';
      if (!d) return false;
      // Support both YYYY-MM-DD and DD/MM/YYYY formats
      var dateStr = '';
      if (d.indexOf('-') !== -1) {
        dateStr = d.slice(0, 7);
      } else if (d.indexOf('/') !== -1) {
        var parts = d.split('/');
        if (parts.length >= 3) dateStr = parts[2] + '-' + parts[1].padStart(2, '0');
      }
      return dateStr === month;
    });

    // Filter by class if selected
    if (cls) {
      monthRows = monthRows.filter(function(r) { return (r['\u05DB\u05D9\u05EA\u05D4'] || '') === cls; });
    }

    // Aggregate per student
    var studentMap = {};
    monthRows.forEach(function(r) {
      var name = r['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3'] || r['\u05E9\u05DD'] || r['\u05EA\u05DC\u05DE\u05D9\u05D3'] || '\u05DC\u05D0 \u05D9\u05D3\u05D5\u05E2';
      if (!studentMap[name]) studentMap[name] = { positive: 0, negative: 0, lastDate: '', lastDesc: '' };
      var type = (r['\u05E1\u05D5\u05D2'] || '').trim();
      var pts = parseInt(r['\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA'] || r['\u05D7\u05D5\u05DE\u05E8\u05D4'] || '0', 10);
      var isPositive = type === '\u05D7\u05D9\u05D5\u05D1\u05D9' || pts > 0;
      var isNegative = type === '\u05E9\u05DC\u05D9\u05DC\u05D9' || pts < 0;
      if (isPositive) studentMap[name].positive += Math.abs(pts) || 1;
      else if (isNegative) studentMap[name].negative += Math.abs(pts) || 1;
      else if (pts > 0) studentMap[name].positive += pts;
      else if (pts < 0) studentMap[name].negative += Math.abs(pts);

      var dt = r['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '';
      if (dt > studentMap[name].lastDate) {
        studentMap[name].lastDate = dt;
        studentMap[name].lastDesc = r['\u05EA\u05D9\u05D0\u05D5\u05E8'] || r['\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4'] || '';
      }
    });

    var students = Object.keys(studentMap).sort();
    var monthLabel = month; // e.g. "2026-04"
    try {
      var mParts = month.split('-');
      var hebrewMonths = ['\u05D9\u05E0\u05D5\u05D0\u05E8','\u05E4\u05D1\u05E8\u05D5\u05D0\u05E8','\u05DE\u05E8\u05E5','\u05D0\u05E4\u05E8\u05D9\u05DC','\u05DE\u05D0\u05D9','\u05D9\u05D5\u05E0\u05D9','\u05D9\u05D5\u05DC\u05D9','\u05D0\u05D5\u05D2\u05D5\u05E1\u05D8','\u05E1\u05E4\u05D8\u05DE\u05D1\u05E8','\u05D0\u05D5\u05E7\u05D8\u05D5\u05D1\u05E8','\u05E0\u05D5\u05D1\u05DE\u05D1\u05E8','\u05D3\u05E6\u05DE\u05D1\u05E8'];
      monthLabel = hebrewMonths[parseInt(mParts[1], 10) - 1] + ' ' + mParts[0];
    } catch(e) { /* silent */ }

    return '\
      <div class="pc-doc">\
        ' + this._pcDocHeader(opts, '\u05D3\u05D5\u05D7 \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA \u05D7\u05D5\u05D3\u05E9\u05D9' + (cls ? ' \u2014 ' + cls : '')) + '\
        <div class="pc-body">\
          <div class="pc-field"><span class="pc-field-label">\u05D7\u05D5\u05D3\u05E9:</span> ' + monthLabel + '</div>\
          <div class="pc-field"><span class="pc-field-label">\u05E1\u05D4"\u05DB \u05D0\u05D9\u05E8\u05D5\u05E2\u05D9\u05DD:</span> ' + monthRows.length + '</div>\
          <div class="pc-field"><span class="pc-field-label">\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD:</span> ' + students.length + '</div>\
          ' + (students.length === 0
            ? '<p style="text-align:center;color:#999;margin-top:20px">\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9 \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA \u05DC\u05D7\u05D5\u05D3\u05E9 \u05D6\u05D4</p>'
            : '<table class="pc-table">\
              <thead><tr>\
                <th style="width:30px">#</th>\
                <th>\u05E9\u05DD \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3</th>\
                <th style="text-align:center">\u05D7\u05D9\u05D5\u05D1\u05D9</th>\
                <th style="text-align:center">\u05E9\u05DC\u05D9\u05DC\u05D9</th>\
                <th style="text-align:center">\u05E0\u05D9\u05E7\u05D5\u05D3 \u05E0\u05D8\u05D5</th>\
                <th>\u05D0\u05D9\u05E8\u05D5\u05E2 \u05D0\u05D7\u05E8\u05D5\u05DF</th>\
              </tr></thead>\
              <tbody>' + students.map(function(name, i) {
                var s = studentMap[name];
                var net = s.positive - s.negative;
                var netColor = net > 0 ? '#198754' : net < 0 ? '#dc3545' : '#666';
                var netSign = net > 0 ? '+' : '';
                return '<tr>\
                  <td>' + (i + 1) + '</td>\
                  <td style="font-weight:600">' + name + '</td>\
                  <td style="text-align:center;color:#198754;font-weight:600">' + s.positive + '</td>\
                  <td style="text-align:center;color:#dc3545;font-weight:600">' + s.negative + '</td>\
                  <td style="text-align:center;font-weight:700;color:' + netColor + '">' + netSign + net + '</td>\
                  <td style="font-size:.85rem;color:#555">' + (s.lastDesc || '\u2014') + ' <small style="color:#999">(' + (s.lastDate || '') + ')</small></td>\
                </tr>';
              }).join('') + '</tbody>\
            </table>') + '\
        </div>\
        ' + this._pcDocFooter(opts) + '\
      </div>\
    ';
  },

  /* --- Finance Summary --- */
  _pcBuildFinanceSummary(opts) {
    var _gc = function(s) { return (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : []; };
    var tuition = _gc('\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3');
    var month = (opts.month || new Date().toISOString().slice(0, 7));
    var monthLabel = month;
    try {
      var d = new Date(month + '-01');
      monthLabel = d.toLocaleDateString('he-IL', { month: 'long', year: 'numeric' });
    } catch(e) { /* silent */ }

    // Filter by month
    var filtered = tuition.filter(function(r) {
      var dt = r['\u05EA\u05D0\u05E8\u05D9\u05DA'] || r['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05EA\u05E9\u05DC\u05D5\u05DD'] || '';
      return dt.slice(0, 7) === month;
    });

    // Stats
    var totalBilled = 0, totalPaid = 0, totalPending = 0;
    filtered.forEach(function(r) {
      var amt = parseFloat(r['\u05E1\u05DB\u05D5\u05DD'] || r['\u05E1\u05D4"\u05DB'] || 0);
      var status = (r['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '').trim();
      totalBilled += amt;
      if (status === '\u05E9\u05D5\u05DC\u05DD') { totalPaid += amt; } else { totalPending += amt; }
    });

    var rows = filtered.map(function(r, i) {
      var name = r['\u05E9\u05DD'] || r['\u05EA\u05DC\u05DE\u05D9\u05D3'] || r['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3'] || '\u2014';
      var amt = parseFloat(r['\u05E1\u05DB\u05D5\u05DD'] || r['\u05E1\u05D4"\u05DB'] || 0);
      var status = (r['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '').trim();
      var isPaid = status === '\u05E9\u05D5\u05DC\u05DD';
      var date = r['\u05EA\u05D0\u05E8\u05D9\u05DA'] || r['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05EA\u05E9\u05DC\u05D5\u05DD'] || '\u2014';
      var method = r['\u05D0\u05DE\u05E6\u05E2\u05D9_\u05EA\u05E9\u05DC\u05D5\u05DD'] || r['\u05D0\u05DE\u05E6\u05E2\u05D9'] || '\u2014';
      return '<tr>' +
        '<td>' + (i + 1) + '</td>' +
        '<td style="font-weight:600">' + name + '</td>' +
        '<td style="text-align:center">\u20AA' + amt.toLocaleString() + '</td>' +
        '<td style="text-align:center"><span style="padding:2px 10px;border-radius:12px;font-size:.85rem;background:' + (isPaid ? '#d1e7dd' : '#fff3cd') + ';color:' + (isPaid ? '#0f5132' : '#664d03') + '">' + (isPaid ? '\u05E9\u05D5\u05DC\u05DD' : '\u05DE\u05DE\u05EA\u05D9\u05DF') + '</span></td>' +
        '<td style="text-align:center;font-size:.85rem">' + date + '</td>' +
        '<td style="text-align:center;font-size:.85rem">' + method + '</td>' +
        '</tr>';
    }).join('');

    return '\
      <div class="pc-doc">\
        ' + this._pcDocHeader(opts, '\u05D3\u05D5\u05D7 \u05DB\u05E1\u05E4\u05D9 \u2014 ' + monthLabel) + '\
        <div class="pc-body">\
          <div style="display:flex;gap:16px;margin-bottom:20px;flex-wrap:wrap">\
            <div style="flex:1;min-width:140px;background:#e8f5e9;border-radius:8px;padding:12px;text-align:center">\
              <div style="font-size:.8rem;color:#2e7d32">\u05E1\u05D4"\u05DB \u05D7\u05D9\u05D5\u05D1\u05D9\u05DD</div>\
              <div style="font-size:1.4rem;font-weight:700;color:#1b5e20">\u20AA' + totalBilled.toLocaleString() + '</div>\
            </div>\
            <div style="flex:1;min-width:140px;background:#e3f2fd;border-radius:8px;padding:12px;text-align:center">\
              <div style="font-size:.8rem;color:#1565c0">\u05E9\u05D5\u05DC\u05DD</div>\
              <div style="font-size:1.4rem;font-weight:700;color:#0d47a1">\u20AA' + totalPaid.toLocaleString() + '</div>\
            </div>\
            <div style="flex:1;min-width:140px;background:#fff3e0;border-radius:8px;padding:12px;text-align:center">\
              <div style="font-size:.8rem;color:#e65100">\u05DE\u05DE\u05EA\u05D9\u05DF \u05DC\u05EA\u05E9\u05DC\u05D5\u05DD</div>\
              <div style="font-size:1.4rem;font-weight:700;color:#bf360c">\u20AA' + totalPending.toLocaleString() + '</div>\
            </div>\
          </div>\
          ' + (filtered.length === 0
            ? '<p style="text-align:center;color:#999;margin-top:20px">\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9 \u05EA\u05E9\u05DC\u05D5\u05DD \u05DC\u05D7\u05D5\u05D3\u05E9 \u05D6\u05D4</p>'
            : '<table class="pc-table">\
              <thead><tr>\
                <th style="width:30px">#</th>\
                <th>\u05E9\u05DD \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3</th>\
                <th style="text-align:center">\u05E1\u05DB\u05D5\u05DD</th>\
                <th style="text-align:center">\u05E1\u05D8\u05D8\u05D5\u05E1</th>\
                <th style="text-align:center">\u05EA\u05D0\u05E8\u05D9\u05DA</th>\
                <th style="text-align:center">\u05D0\u05DE\u05E6\u05E2\u05D9 \u05EA\u05E9\u05DC\u05D5\u05DD</th>\
              </tr></thead>\
              <tbody>' + rows + '</tbody>\
            </table>') + '\
        </div>\
        ' + this._pcDocFooter(opts) + '\
      </div>\
    ';
  },

  /* --- Student Attendance Report (individual) --- */
  _pcBuildStudentAttendance(opts) {
    var s = opts.student || this._pcStudents[0];
    if (!s) return '<p style="text-align:center;color:#999">\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</p>';

    var month = opts.month || new Date().toISOString().slice(0, 7);
    var yearNum = parseInt(month.split('-')[0], 10);
    var monthNum = parseInt(month.split('-')[1], 10);
    var monthNames = ['', '\u05D9\u05E0\u05D5\u05D0\u05E8', '\u05E4\u05D1\u05E8\u05D5\u05D0\u05E8', '\u05DE\u05E8\u05E5', '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05DE\u05D0\u05D9', '\u05D9\u05D5\u05E0\u05D9', '\u05D9\u05D5\u05DC\u05D9', '\u05D0\u05D5\u05D2\u05D5\u05E1\u05D8', '\u05E1\u05E4\u05D8\u05DE\u05D1\u05E8', '\u05D0\u05D5\u05E7\u05D8\u05D5\u05D1\u05E8', '\u05E0\u05D5\u05D1\u05DE\u05D1\u05E8', '\u05D3\u05E6\u05DE\u05D1\u05E8'];

    // Gather attendance records for this student
    var attData = this._pcAttendanceData || [];
    var studentName = s.name;
    var studentId = s.id;
    var records = attData.filter(function(r) {
      var rName = (r['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9'] || r['\u05E9\u05DD'] || r['\u05EA\u05DC\u05DE\u05D9\u05D3'] || '').trim();
      var rId = r['\u05DE\u05D6\u05D4\u05D4'] || r['id'] || '';
      return rName === studentName || (studentId && rId === studentId);
    });

    // Categorize by month
    var monthMap = {};
    var totalPresent = 0, totalAbsent = 0, totalLate = 0, totalDays = 0;
    records.forEach(function(r) {
      var d = r['\u05EA\u05D0\u05E8\u05D9\u05DA'] || r['date'] || '';
      var status = (r['\u05E1\u05D8\u05D8\u05D5\u05E1'] || r['status'] || '').trim();
      if (!d) return;
      var ds = String(d).slice(0, 7);
      if (!monthMap[ds]) monthMap[ds] = { present: 0, absent: 0, late: 0, total: 0 };
      monthMap[ds].total++;
      totalDays++;
      if (status === '\u05E0\u05D5\u05DB\u05D7' || status === '\u05E0\u05D5\u05DB\u05D7/\u05EA') { monthMap[ds].present++; totalPresent++; }
      else if (status === '\u05D7\u05D9\u05E1\u05D5\u05E8') { monthMap[ds].absent++; totalAbsent++; }
      else if (status === '\u05D0\u05D9\u05D7\u05D5\u05E8') { monthMap[ds].late++; totalLate++; }
      else { monthMap[ds].present++; totalPresent++; }
    });

    var pct = totalDays > 0 ? Math.round((totalPresent / totalDays) * 100) : 0;
    var pctColor = pct >= 90 ? '#0f9d58' : pct >= 75 ? '#f9ab00' : '#ea4335';

    // Build monthly breakdown rows
    var sortedMonths = Object.keys(monthMap).sort();
    var monthRows = sortedMonths.map(function(mk) {
      var mm = monthMap[mk];
      var mPct = mm.total > 0 ? Math.round((mm.present / mm.total) * 100) : 0;
      var mi = parseInt(mk.split('-')[1], 10);
      var mName = monthNames[mi] || mk;
      return '<tr>' +
        '<td>' + mName + ' ' + mk.split('-')[0] + '</td>' +
        '<td style="text-align:center">' + mm.total + '</td>' +
        '<td style="text-align:center">' + mm.present + '</td>' +
        '<td style="text-align:center">' + mm.absent + '</td>' +
        '<td style="text-align:center">' + mm.late + '</td>' +
        '<td style="text-align:center;font-weight:700;color:' + (mPct >= 90 ? '#0f9d58' : mPct >= 75 ? '#f9ab00' : '#ea4335') + '">' + mPct + '%</td>' +
        '</tr>';
    }).join('');

    if (!monthRows) {
      monthRows = '<tr><td colspan="6" style="text-align:center;color:#999">\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</td></tr>';
    }

    return '\
      <div class="pc-doc">\
        ' + this._pcDocHeader(opts, '\u05D3\u05D5\u05D7 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3') + '\
        <div class="pc-body">\
          <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:20px">\
            <div class="pc-field" style="flex:1;min-width:200px"><span class="pc-field-label">\u05E9\u05DD \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3:</span> ' + s.name + '</div>\
            <div class="pc-field" style="flex:1;min-width:200px"><span class="pc-field-label">\u05DB\u05D9\u05EA\u05D4:</span> ' + (s.cls || '\u2014') + '</div>\
          </div>\
          <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:24px">\
            <div style="flex:1;min-width:120px;background:#e8f5e9;border-radius:8px;padding:12px;text-align:center">\
              <div style="font-size:.8rem;color:#2e7d32">\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</div>\
              <div style="font-size:1.4rem;font-weight:700;color:#1b5e20">' + totalPresent + '</div>\
            </div>\
            <div style="flex:1;min-width:120px;background:#ffebee;border-radius:8px;padding:12px;text-align:center">\
              <div style="font-size:.8rem;color:#c62828">\u05D7\u05D9\u05E1\u05D5\u05E8\u05D9\u05DD</div>\
              <div style="font-size:1.4rem;font-weight:700;color:#b71c1c">' + totalAbsent + '</div>\
            </div>\
            <div style="flex:1;min-width:120px;background:#fff3e0;border-radius:8px;padding:12px;text-align:center">\
              <div style="font-size:.8rem;color:#e65100">\u05D0\u05D9\u05D7\u05D5\u05E8\u05D9\u05DD</div>\
              <div style="font-size:1.4rem;font-weight:700;color:#bf360c">' + totalLate + '</div>\
            </div>\
            <div style="flex:1;min-width:120px;background:#e3f2fd;border-radius:8px;padding:12px;text-align:center">\
              <div style="font-size:.8rem;color:#1565c0">\u05E1\u05D4"\u05DB \u05D9\u05DE\u05D9\u05DD</div>\
              <div style="font-size:1.4rem;font-weight:700;color:#0d47a1">' + totalDays + '</div>\
            </div>\
          </div>\
          <div style="text-align:center;margin-bottom:24px">\
            <div style="font-size:.9rem;color:#555;margin-bottom:4px">\u05D0\u05D7\u05D5\u05D6 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</div>\
            <div style="font-size:2.2rem;font-weight:900;color:' + pctColor + '">' + pct + '%</div>\
            <div style="width:200px;height:10px;background:#e0e0e0;border-radius:5px;margin:8px auto;overflow:hidden">\
              <div style="width:' + pct + '%;height:100%;background:' + pctColor + ';border-radius:5px"></div>\
            </div>\
          </div>\
          <h4 style="font-size:1.1rem;color:#1a3e5c;margin-bottom:8px">\u05E4\u05D9\u05E8\u05D5\u05D8 \u05D7\u05D5\u05D3\u05E9\u05D9</h4>\
          <table class="pc-table">\
            <thead><tr>\
              <th>\u05D7\u05D5\u05D3\u05E9</th>\
              <th style="text-align:center">\u05E1\u05D4"\u05DB \u05D9\u05DE\u05D9\u05DD</th>\
              <th style="text-align:center">\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</th>\
              <th style="text-align:center">\u05D7\u05D9\u05E1\u05D5\u05E8\u05D9\u05DD</th>\
              <th style="text-align:center">\u05D0\u05D9\u05D7\u05D5\u05E8\u05D9\u05DD</th>\
              <th style="text-align:center">\u05D0\u05D7\u05D5\u05D6 %</th>\
            </tr></thead>\
            <tbody>' + monthRows + '</tbody>\
            <tfoot><tr style="font-weight:700;background:#f0f4f8">\
              <td>\u05E1\u05D4"\u05DB</td>\
              <td style="text-align:center">' + totalDays + '</td>\
              <td style="text-align:center">' + totalPresent + '</td>\
              <td style="text-align:center">' + totalAbsent + '</td>\
              <td style="text-align:center">' + totalLate + '</td>\
              <td style="text-align:center;color:' + pctColor + '">' + pct + '%</td>\
            </tr></tfoot>\
          </table>\
        </div>\
        ' + this._pcDocFooter(opts) + '\
      </div>\
    ';
  },

  /* ---------- Grade Report Template ---------- */
  _pcBuildGradeReport(opts) {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    const exams = _gc('\u05DE\u05D1\u05D7\u05E0\u05D9\u05DD');
    const grades = _gc('\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD');
    const students = _gc('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
    const today = new Date().toLocaleDateString('he-IL');
    if (!grades.length) return '<div style="text-align:center;padding:40px;color:#999">\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9 \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD</div>';

    // Group grades by subject (from exams)
    const examMap = {};
    exams.forEach(e => { examMap[e['\u05DE\u05D6\u05D4\u05D4']] = e; });
    const subjects = {};
    grades.forEach(g => {
      const exam = examMap[g['\u05DE\u05D6\u05D4\u05D4_\u05DE\u05D1\u05D7\u05DF']] || {};
      const subj = exam['\u05DE\u05E7\u05E6\u05D5\u05E2'] || '\u05DB\u05DC\u05DC\u05D9';
      if (!subjects[subj]) subjects[subj] = [];
      const score = Number(g['\u05E6\u05D9\u05D5\u05DF'] || 0);
      const sid = g['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4'] || '';
      const student = students.find(s => (s['\u05DE\u05D6\u05D4\u05D4']||'') === sid);
      const name = student ? ((student['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9']||'')+' '+(student['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4']||'')).trim() : '';
      if (score > 0) subjects[subj].push({ name, score });
    });

    const subjRows = Object.entries(subjects).map(([subj, gs]) => {
      const avg = Math.round(gs.reduce((s,g) => s + g.score, 0) / gs.length);
      const top = gs.sort((a,b) => b.score - a.score).slice(0,3).map(g => g.name + ' (' + g.score + ')').join(', ');
      return `<tr><td style="font-weight:bold">${subj}</td><td>${gs.length}</td><td style="font-weight:bold;color:${avg >= 80 ? '#059669' : avg >= 60 ? '#d97706' : '#dc2626'}">${avg}</td><td style="font-size:11px">${top}</td></tr>`;
    }).join('');

    const allScores = grades.map(g => Number(g['\u05E6\u05D9\u05D5\u05DF']||0)).filter(n => n > 0);
    const totalAvg = allScores.length ? Math.round(allScores.reduce((a,b)=>a+b,0)/allScores.length) : 0;

    return `
      <div style="font-family:Heebo,sans-serif;direction:rtl;padding:20px">
        <div style="text-align:center;margin-bottom:20px">
          <h2 style="margin:0">\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3</h2>
          <h3 style="margin:5px 0;color:#4f46e5">\u05D3\u05D5\u05D7 \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD \u05DC\u05E4\u05D9 \u05DE\u05E7\u05E6\u05D5\u05E2</h3>
          <p style="color:#666">${today} | ${grades.length} \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD | \u05DE\u05DE\u05D5\u05E6\u05E2 \u05DB\u05DC\u05DC\u05D9: <strong>${totalAvg}</strong></p>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:13px" border="1" cellpadding="6">
          <thead style="background:#e0e7ff;font-weight:bold"><tr><th>\u05DE\u05E7\u05E6\u05D5\u05E2</th><th>\u05DE\u05D1\u05D7\u05E0\u05D9\u05DD</th><th>\u05DE\u05DE\u05D5\u05E6\u05E2</th><th>\u05DE\u05D5\u05D1\u05D9\u05DC\u05D9\u05DD</th></tr></thead>
          <tbody>${subjRows}</tbody>
        </table>
        <p style="text-align:center;color:#999;font-size:11px;margin-top:10px">\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3 | \u05E1\u05D5\u05D3\u05D9</p>
      </div>`;
  },

  /* ---------- Parent Directory Template ---------- */
  _pcBuildParentDirectory(opts) {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    const parents = _gc('\u05D4\u05D5\u05E8\u05D9\u05DD');
    const students = _gc('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
    const today = new Date().toLocaleDateString('he-IL');
    if (!parents.length) return '<div style="text-align:center;padding:40px;color:#999">\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9 \u05D4\u05D5\u05E8\u05D9\u05DD</div>';

    const rows = parents.map((p, i) => {
      const sid = p['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4'] || '';
      const student = students.find(s => (s['\u05DE\u05D6\u05D4\u05D4']||'') === sid);
      const sName = student ? ((student['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9']||'')+' '+(student['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4']||'')).trim() : '';
      const cls = student ? (student['\u05DB\u05D9\u05EA\u05D4']||'') : '';
      return `<tr>
        <td>${i+1}</td>
        <td style="font-weight:bold">${p['\u05E9\u05DD']||''}</td>
        <td>${p['\u05E7\u05E9\u05E8']||''}</td>
        <td dir="ltr">${p['\u05D8\u05DC\u05E4\u05D5\u05DF']||''}</td>
        <td>${sName}</td>
        <td>${cls}</td>
        <td style="font-size:11px">${p['\u05E2\u05D9\u05E1\u05D5\u05E7']||''}</td>
      </tr>`;
    }).join('');

    return `
      <div style="font-family:Heebo,sans-serif;direction:rtl;padding:20px">
        <div style="text-align:center;margin-bottom:20px">
          <h2 style="margin:0">\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3 \u2014 \u05DE\u05DB\u05D9\u05E0\u05D4 \u05DC\u05E6\u05E2\u05D9\u05E8\u05D9\u05DD</h2>
          <h3 style="margin:5px 0;color:#2563eb">\u05E8\u05E9\u05D9\u05DE\u05EA \u05D4\u05D5\u05E8\u05D9\u05DD</h3>
          <p style="color:#666">${today} | ${parents.length} \u05D4\u05D5\u05E8\u05D9\u05DD</p>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:12px" border="1" cellpadding="5">
          <thead style="background:#dbeafe;font-weight:bold">
            <tr><th>#</th><th>\u05E9\u05DD \u05D4\u05D5\u05E8\u05D4</th><th>\u05E7\u05E9\u05E8</th><th>\u05D8\u05DC\u05E4\u05D5\u05DF</th><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th>\u05DB\u05D9\u05EA\u05D4</th><th>\u05E2\u05D9\u05E1\u05D5\u05E7</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        <p style="text-align:center;color:#999;font-size:11px;margin-top:10px">02-547-6989 | \u05E0\u05D4\u05E8 \u05D4\u05D9\u05E8\u05D3\u05DF 106, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9</p>
      </div>`;
  },

  /* ---------- Daily Summary Template ---------- */
  _pcBuildDailySummary(opts) {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    const students = _gc('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
    const staff = _gc('\u05E6\u05D5\u05D5\u05EA');
    const parents = _gc('\u05D4\u05D5\u05E8\u05D9\u05DD');
    const tasks = _gc('\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA');
    const med = _gc('\u05DE\u05D9\u05D3\u05E2_\u05E8\u05E4\u05D5\u05D0\u05D9');
    const emails = (typeof EMAIL_CACHE !== 'undefined' && EMAIL_CACHE) ? EMAIL_CACHE.inbox || [] : [];
    const today = new Date();
    const todayStr = today.toLocaleDateString('he-IL', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
    const hebrewDate = (typeof Utils !== 'undefined' && Utils.hebrewDateFull) ? Utils.hebrewDateFull() : '';

    const activeStudents = students.filter(s => (s['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') !== '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC');
    const medsCount = med.filter(r => (r['\u05EA\u05E8\u05D5\u05E4\u05D4_adhd']||'').length > 0 || (r['\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA']||'').length > 0).length;
    const unreadEmails = emails.filter(e => e.unread).length;
    const activeTasks = tasks.filter(t => (t['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') !== '\u05D4\u05D5\u05E9\u05DC\u05DD').length;
    const recentEmails = emails.slice(0, 5).map(e => {
      const sender = (e.from||'').replace(/<[^>]+>/g,'').replace(/"/g,'').trim().substring(0,30);
      return `<li>${e.subject||'(\u05DC\u05DC\u05D0 \u05E0\u05D5\u05E9\u05D0)'} \u2014 <small>${sender}</small></li>`;
    }).join('');

    return `
      <div style="font-family:Heebo,sans-serif;direction:rtl;padding:20px;max-width:700px;margin:0 auto">
        <div style="text-align:center;margin-bottom:20px;border-bottom:3px double #333;padding-bottom:15px">
          <h2 style="margin:0">\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3 \u2014 \u05DE\u05DB\u05D9\u05E0\u05D4 \u05DC\u05E6\u05E2\u05D9\u05E8\u05D9\u05DD</h2>
          <h3 style="margin:5px 0;color:#7c3aed">\u05E1\u05D9\u05DB\u05D5\u05DD \u05D9\u05D5\u05DE\u05D9</h3>
          <p style="color:#666;margin:0">${todayStr}${hebrewDate ? ' | ' + hebrewDate : ''}</p>
        </div>

        <div style="display:flex;justify-content:space-around;margin-bottom:20px;text-align:center">
          <div><div style="font-size:28px;font-weight:bold;color:#2563eb">${activeStudents.length}</div><small>\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</small></div>
          <div><div style="font-size:28px;font-weight:bold;color:#059669">${staff.length}</div><small>\u05E6\u05D5\u05D5\u05EA</small></div>
          <div><div style="font-size:28px;font-weight:bold;color:#d97706">${parents.length}</div><small>\u05D4\u05D5\u05E8\u05D9\u05DD</small></div>
          <div><div style="font-size:28px;font-weight:bold;color:#dc2626">${medsCount}</div><small>\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA</small></div>
        </div>

        <div style="margin-bottom:15px;padding:10px;background:#ede9fe;border-radius:8px">
          <strong>\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA \u05E4\u05EA\u05D5\u05D7\u05D5\u05EA:</strong> ${activeTasks || '\u05D0\u05D9\u05DF'}
          ${activeTasks ? ' | <strong>\u05D3\u05D5\u05D0\u05E8 \u05DC\u05D0 \u05E0\u05E7\u05E8\u05D0:</strong> ' + unreadEmails : ''}
        </div>

        ${recentEmails ? `<div style="margin-bottom:15px"><h5>\u05D3\u05D5\u05D0\u05E8 \u05D0\u05D7\u05E8\u05D5\u05DF:</h5><ol style="font-size:13px;padding-right:20px">${recentEmails}</ol></div>` : ''}

        <div style="margin-bottom:15px;border:1px solid #e5e7eb;border-radius:8px;padding:10px">
          <h5 style="margin:0 0 8px">\u05E4\u05EA\u05E7\u05D9\u05EA \u05D9\u05D5\u05DE\u05D9\u05EA:</h5>
          <div style="min-height:60px;border:1px dashed #ccc;border-radius:4px;padding:8px;color:#999;font-size:13px">
            ${localStorage.getItem('bht_quick_note') || '\u05D0\u05D9\u05DF \u05E4\u05EA\u05E7\u05D9\u05D5\u05EA'}
          </div>
        </div>

        <div style="text-align:center;color:#999;font-size:11px;border-top:1px solid #e5e7eb;padding-top:10px">
          \u05E0\u05D4\u05E8 \u05D4\u05D9\u05E8\u05D3\u05DF 106, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9 | 02-547-6989 | \u05D4\u05D5\u05E4\u05E7 \u05DE\u05DE\u05E2\u05E8\u05DB\u05EA \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3
        </div>
      </div>`;
  },

  /* ---------- Staff Directory Template ---------- */
  _pcBuildStaffDirectory(opts) {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    const staff = _gc('\u05E6\u05D5\u05D5\u05EA');
    const today = new Date().toLocaleDateString('he-IL');
    if (!staff.length) return '<div style="text-align:center;padding:40px;color:#999">\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9 \u05E6\u05D5\u05D5\u05EA</div>';

    const rows = staff.map((s, i) => {
      const name = ((s['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9']||'') + ' ' + (s['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4']||'')).trim() || '\u05DC\u05D0 \u05D9\u05D3\u05D5\u05E2';
      const role = s['\u05EA\u05E4\u05E7\u05D9\u05D3'] || '';
      const phone = s['\u05D8\u05DC\u05E4\u05D5\u05DF'] || '';
      const email = s['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC'] || '';
      const area = s['\u05EA\u05D7\u05D5\u05DD'] || s['\u05DE\u05E1\u05D2\u05E8\u05EA'] || '';
      return `<tr><td>${i+1}</td><td style="font-weight:bold">${name}</td><td>${role}</td><td dir="ltr">${phone}</td><td dir="ltr" style="font-size:11px">${email}</td><td>${area}</td></tr>`;
    }).join('');

    return `
      <div style="font-family:Heebo,sans-serif;direction:rtl;padding:20px">
        <div style="text-align:center;margin-bottom:20px">
          <h2 style="margin:0">\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3 \u2014 \u05DE\u05DB\u05D9\u05E0\u05D4 \u05DC\u05E6\u05E2\u05D9\u05E8\u05D9\u05DD</h2>
          <h3 style="margin:5px 0;color:#0d9488">\u05E1\u05E4\u05E8 \u05D8\u05DC\u05E4\u05D5\u05E0\u05D9\u05DD \u2014 \u05E6\u05D5\u05D5\u05EA \u05D4\u05DE\u05D5\u05E1\u05D3</h3>
          <p style="color:#666">${today} | ${staff.length} \u05D0\u05E0\u05E9\u05D9 \u05E6\u05D5\u05D5\u05EA</p>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:12px" border="1" cellpadding="5">
          <thead style="background:#ccfbf1;font-weight:bold"><tr><th>#</th><th>\u05E9\u05DD</th><th>\u05EA\u05E4\u05E7\u05D9\u05D3</th><th>\u05D8\u05DC\u05E4\u05D5\u05DF</th><th>\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC</th><th>\u05EA\u05D7\u05D5\u05DD</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
        <div style="margin-top:15px;text-align:center;font-size:12px;color:#666">
          <strong>\u05DE\u05E9\u05E8\u05D3 \u05D4\u05DE\u05D5\u05E1\u05D3:</strong> 02-547-6989 | \u05E0\u05D4\u05E8 \u05D4\u05D9\u05E8\u05D3\u05DF 106, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9
        </div>
      </div>`;
  },

  /* ---------- Mivtza Limud Report Template ---------- */
  _pcBuildMivtzaReport(opts) {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    const mvData = _gc('\u05DE\u05D1\u05E6\u05E2_\u05DC\u05D9\u05DE\u05D5\u05D3');
    const today = new Date().toLocaleDateString('he-IL');
    if (!mvData.length) return '<div style="text-align:center;padding:40px;color:#999">\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9 \u05DE\u05D1\u05E6\u05E2</div>';

    // Sort by total units desc
    const sorted = [...mvData].sort((a, b) => (Number(b['\u05E1\u05D4_\u05DB_\u05D9\u05D7\u05D9\u05D3\u05D5\u05EA'])||0) - (Number(a['\u05E1\u05D4_\u05DB_\u05D9\u05D7\u05D9\u05D3\u05D5\u05EA'])||0));
    const fmt = n => new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS', maximumFractionDigits: 0 }).format(n);
    let totalUnits = 0, totalShekel = 0;

    const rows = sorted.map((r, i) => {
      const units = Number(r['\u05E1\u05D4_\u05DB_\u05D9\u05D7\u05D9\u05D3\u05D5\u05EA']||0);
      const shekel = Number(r['\u05E1\u05D4_\u05DB_\u05E9\u05E7\u05DC\u05D9\u05DD']||0);
      totalUnits += units; totalShekel += shekel;
      const medal = i === 0 ? '\u05E4\u05E8\u05E1 \u05E8\u05D0\u05E9\u05D5\u05DF' : i === 1 ? '\u05E4\u05E8\u05E1 \u05E9\u05E0\u05D9' : i === 2 ? '\u05E4\u05E8\u05E1 \u05E9\u05DC\u05D9\u05E9\u05D9' : '';
      return `<tr${i < 3 ? ' style="background:#fef3c7"' : ''}>
        <td>${i + 1}${medal ? ' \u2B50' : ''}</td>
        <td style="font-weight:bold">${r['\u05E9\u05DD']||''}</td>
        <td>${r['\u05E9\u05D7\u05E8\u05D9\u05EA']||0}</td>
        <td>${r['\u05DE\u05E0\u05D7\u05D4']||0}</td>
        <td>${r['\u05DE\u05E2\u05E8\u05D9\u05D1']||0}</td>
        <td>${r['\u05D7\u05D1\u05E8\u05D5\u05EA\u05D0']||0}</td>
        <td>${r['\u05DC\u05D9\u05DE\u05D5\u05D3_\u05E2\u05E6\u05DE\u05D9']||0}</td>
        <td style="font-weight:bold">${units}</td>
        <td style="color:green;font-weight:bold">${fmt(shekel)}</td>
      </tr>`;
    }).join('');

    return `
      <div style="font-family:Heebo,sans-serif;direction:rtl;padding:20px">
        <div style="text-align:center;margin-bottom:20px">
          <h2 style="margin:0">\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3</h2>
          <h3 style="margin:5px 0;color:#d97706">\u05DE\u05D1\u05E6\u05E2 "\u05D9\u05EA\u05D2\u05D1\u05E8 \u05DB\u05D0\u05E8\u05D9" \u2014 \u05D3\u05D5\u05D7 \u05E1\u05D9\u05DB\u05D5\u05DD</h3>
          <p style="color:#666">${today} | ${sorted.length} \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD | ${totalUnits} \u05D9\u05D7\u05D9\u05D3\u05D5\u05EA | ${fmt(totalShekel)}</p>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:12px" border="1" cellpadding="5">
          <thead style="background:#fef3c7;font-weight:bold">
            <tr><th>#</th><th>\u05E9\u05DD</th><th>\u05E9\u05D7\u05E8\u05D9\u05EA</th><th>\u05DE\u05E0\u05D7\u05D4</th><th>\u05DE\u05E2\u05E8\u05D9\u05D1</th><th>\u05D7\u05D1\u05E8\u05D5\u05EA\u05D0</th><th>\u05E2\u05E6\u05DE\u05D9</th><th>\u05D9\u05D7\u05D9\u05D3\u05D5\u05EA</th><th>\u05E1\u05DB\u05D5\u05DD</th></tr>
          </thead>
          <tbody>${rows}</tbody>
          <tfoot style="background:#fffbeb;font-weight:bold">
            <tr><td colspan="7">\u05E1\u05D4"\u05DB</td><td>${totalUnits}</td><td style="color:green">${fmt(totalShekel)}</td></tr>
          </tfoot>
        </table>
        <p style="text-align:center;color:#999;font-size:11px;margin-top:10px">\u05E1\u05D5\u05D3\u05D9 | \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3</p>
      </div>`;
  },

  /* ---------- Staff Salary Report Template ---------- */
  _pcBuildStaffSalary(opts) {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    const salData = _gc('\u05E9\u05DB\u05E8_\u05E6\u05D5\u05D5\u05EA');
    const today = new Date().toLocaleDateString('he-IL');
    if (!salData.length) return '<div style="text-align:center;padding:40px;color:#999">\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9 \u05E9\u05DB\u05E8</div>';

    // Get latest month
    const months = [...new Set(salData.map(r => r['\u05D7\u05D5\u05D3\u05E9'] || ''))].sort().reverse();
    const latestMonth = months[0] || '';
    const monthData = salData.filter(r => (r['\u05D7\u05D5\u05D3\u05E9'] || '') === latestMonth);
    const fmt = n => new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS', maximumFractionDigits: 0 }).format(n);
    let totalSalary = 0;

    const rows = monthData.map((r, i) => {
      const base = Number(r['\u05E9\u05DB\u05E8_\u05D1\u05E1\u05D9\u05E1'] || 0);
      const travel = Number(r['\u05E0\u05E1\u05D9\u05E2\u05D5\u05EA'] || 0);
      const total = Number(r['\u05E1\u05D4_\u05DB'] || base + travel);
      totalSalary += total;
      return `<tr>
        <td>${i + 1}</td>
        <td style="font-weight:bold">${r['\u05E9\u05DD'] || ''}</td>
        <td>${fmt(base)}</td>
        <td>${travel ? fmt(travel) : '\u2014'}</td>
        <td>${r['\u05E4\u05E0\u05E1\u05D9\u05D4'] || '\u2014'}</td>
        <td style="font-weight:bold">${fmt(total)}</td>
        <td>${r['\u05E1\u05D8\u05D8\u05D5\u05E1'] || ''}</td>
      </tr>`;
    }).join('');

    return `
      <div style="font-family:Heebo,sans-serif;direction:rtl;padding:20px">
        <div style="text-align:center;margin-bottom:20px">
          <h2 style="margin:0">\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3 \u2014 \u05DE\u05DB\u05D9\u05E0\u05D4 \u05DC\u05E6\u05E2\u05D9\u05E8\u05D9\u05DD</h2>
          <h3 style="margin:5px 0;color:#0ea5e9">\u05D3\u05D5\u05D7 \u05E9\u05DB\u05E8 \u05E2\u05D5\u05D1\u05D3\u05D9\u05DD \u2014 ${latestMonth}</h3>
          <p style="color:#666">\u05EA\u05D0\u05E8\u05D9\u05DA: ${today} | ${monthData.length} \u05E2\u05D5\u05D1\u05D3\u05D9\u05DD</p>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:12px" border="1" cellpadding="5">
          <thead style="background:#e0f2fe;font-weight:bold">
            <tr><th>#</th><th>\u05E9\u05DD</th><th>\u05E9\u05DB\u05E8 \u05D1\u05E1\u05D9\u05E1</th><th>\u05E0\u05E1\u05D9\u05E2\u05D5\u05EA</th><th>\u05E4\u05E0\u05E1\u05D9\u05D4</th><th>\u05E1\u05D4"\u05DB</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th></tr>
          </thead>
          <tbody>${rows}</tbody>
          <tfoot style="background:#f0f9ff;font-weight:bold">
            <tr><td colspan="5">\u05E1\u05D4"\u05DB \u05DB\u05DC\u05DC\u05D9</td><td colspan="2">${fmt(totalSalary)}</td></tr>
          </tfoot>
        </table>
        <p style="text-align:center;color:#999;font-size:11px;margin-top:10px">\u05E1\u05D5\u05D3\u05D9 | \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3</p>
      </div>`;
  },

  /* ---------- Petty Cash Report Template ---------- */
  _pcBuildPettyCashReport(opts) {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    const pcData = _gc('\u05E7\u05D5\u05E4\u05D4_\u05E7\u05D8\u05E0\u05D4');
    const today = new Date().toLocaleDateString('he-IL');

    if (!pcData.length) return '<div style="text-align:center;padding:40px;color:#999">\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9 \u05E7\u05D5\u05E4\u05D4 \u05E7\u05D8\u05E0\u05D4</div>';

    // Group by category
    const cats = {};
    let totalIn = 0, totalOut = 0;
    pcData.forEach(r => {
      const cat = r['\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4'] || '\u05D0\u05D7\u05E8';
      const amount = Math.abs(Number(r['\u05E1\u05DB\u05D5\u05DD']) || 0);
      const isIncome = (r['\u05E1\u05D5\u05D2'] || '').includes('\u05D4\u05DB\u05E0\u05E1\u05D4');
      if (!cats[cat]) cats[cat] = { in: 0, out: 0, count: 0 };
      if (isIncome) { cats[cat].in += amount; totalIn += amount; }
      else { cats[cat].out += amount; totalOut += amount; }
      cats[cat].count++;
    });

    const fmt = n => new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS', maximumFractionDigits: 0 }).format(n);
    const catRows = Object.entries(cats).sort((a, b) => b[1].out - a[1].out).map(([cat, d]) =>
      `<tr><td style="font-weight:bold">${cat}</td><td>${d.count}</td><td style="color:green">${d.in ? fmt(d.in) : '\u2014'}</td><td style="color:red">${d.out ? fmt(d.out) : '\u2014'}</td></tr>`
    ).join('');

    return `
      <div style="font-family:Heebo,sans-serif;direction:rtl;padding:20px">
        <div style="text-align:center;margin-bottom:20px">
          <h2 style="margin:0">\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3 \u2014 \u05DE\u05DB\u05D9\u05E0\u05D4 \u05DC\u05E6\u05E2\u05D9\u05E8\u05D9\u05DD</h2>
          <h3 style="margin:5px 0;color:#059669">\u05D3\u05D5\u05D7 \u05E7\u05D5\u05E4\u05D4 \u05E7\u05D8\u05E0\u05D4</h3>
          <p style="color:#666">\u05EA\u05D0\u05E8\u05D9\u05DA: ${today} | ${pcData.length} \u05E8\u05E9\u05D5\u05DE\u05D5\u05EA</p>
        </div>
        <div style="display:flex;justify-content:center;gap:30px;margin-bottom:20px">
          <div style="text-align:center"><div style="font-size:24px;font-weight:bold;color:green">${fmt(totalIn)}</div><small>\u05E1\u05D4"\u05DB \u05D4\u05DB\u05E0\u05E1\u05D5\u05EA</small></div>
          <div style="text-align:center"><div style="font-size:24px;font-weight:bold;color:red">${fmt(totalOut)}</div><small>\u05E1\u05D4"\u05DB \u05D4\u05D5\u05E6\u05D0\u05D5\u05EA</small></div>
          <div style="text-align:center"><div style="font-size:24px;font-weight:bold;color:${totalIn - totalOut >= 0 ? 'green' : 'red'}">${fmt(totalIn - totalOut)}</div><small>\u05D9\u05EA\u05E8\u05D4</small></div>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:13px" border="1" cellpadding="6">
          <thead style="background:#d1fae5;font-weight:bold"><tr><th>\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4</th><th>\u05E8\u05E9\u05D5\u05DE\u05D5\u05EA</th><th>\u05D4\u05DB\u05E0\u05E1\u05D5\u05EA</th><th>\u05D4\u05D5\u05E6\u05D0\u05D5\u05EA</th></tr></thead>
          <tbody>${catRows}</tbody>
          <tfoot style="background:#f0fdf4;font-weight:bold"><tr><td>\u05E1\u05D4"\u05DB</td><td>${pcData.length}</td><td style="color:green">${fmt(totalIn)}</td><td style="color:red">${fmt(totalOut)}</td></tr></tfoot>
        </table>
        <p style="text-align:center;color:#999;font-size:11px;margin-top:10px">\u05D4\u05D5\u05E4\u05E7 \u05DE\u05DE\u05E2\u05E8\u05DB\u05EA \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3 | \u05E1\u05D5\u05D3\u05D9</p>
      </div>`;
  },

  /* ---------- Medication List Template ---------- */
  _pcBuildMedicationList(opts) {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    const medData = _gc('\u05DE\u05D9\u05D3\u05E2_\u05E8\u05E4\u05D5\u05D0\u05D9');
    const students = _gc('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
    const today = new Date().toLocaleDateString('he-IL');

    // Find students with medications
    const withMeds = medData.filter(r => {
      const meds = (r['\u05EA\u05E8\u05D5\u05E4\u05D4_adhd'] || '') + ',' + (r['\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA'] || '');
      return meds.replace(/,/g, '').trim().length > 0;
    }).map(r => {
      const sid = r['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4'] || r['\u05DE\u05D6\u05D4\u05D4'] || '';
      const student = students.find(s => (s['\u05DE\u05D6\u05D4\u05D4'] || '') === sid);
      const name = student ? ((student['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9']||'') + ' ' + (student['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4']||'')).trim() : '\u05DC\u05D0 \u05D9\u05D3\u05D5\u05E2';
      const cls = student ? (student['\u05DB\u05D9\u05EA\u05D4'] || '') : '';
      const allMeds = ((r['\u05EA\u05E8\u05D5\u05E4\u05D4_adhd'] || '') + ', ' + (r['\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA'] || '')).split(/[,،;]\s*/).filter(Boolean).join(', ');
      const allergies = r['\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA'] || '';
      const notes = r['\u05D3\u05E8\u05D9\u05E9\u05D5\u05EA_\u05DE\u05D9\u05D5\u05D7\u05D3\u05D5\u05EA'] || r['\u05D4\u05E2\u05E8\u05D5\u05EA'] || '';
      const emergency = r['\u05D0\u05D9\u05E9_\u05E7\u05E9\u05E8_\u05D7\u05D9\u05E8\u05D5\u05DD'] || r['\u05D0\u05D9\u05E9_\u05E7\u05E9\u05E8'] || '';
      const emergencyPh = r['\u05D8\u05DC\u05E4\u05D5\u05DF_\u05D7\u05D9\u05E8\u05D5\u05DD'] || '';
      return { name, cls, meds: allMeds, allergies, notes, emergency, emergencyPh };
    });

    if (!withMeds.length) {
      return '<div style="text-align:center;padding:40px;color:#999">\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05E2\u05DD \u05EA\u05E8\u05D5\u05E4\u05D5\u05EA \u05E7\u05D1\u05D5\u05E2\u05D5\u05EA</div>';
    }

    const rows = withMeds.map((s, i) => `
      <tr>
        <td style="font-weight:bold">${i + 1}</td>
        <td style="font-weight:bold">${s.name}</td>
        <td>${s.cls}</td>
        <td style="color:#c0392b;font-weight:bold">${s.meds}</td>
        <td style="color:#e67e22">${s.allergies || '\u2014'}</td>
        <td>${s.notes || '\u2014'}</td>
        <td style="font-size:11px">${s.emergency}${s.emergencyPh ? '<br>' + s.emergencyPh : ''}</td>
      </tr>`).join('');

    return `
      <div style="font-family:Heebo,sans-serif;direction:rtl;padding:20px">
        <div style="text-align:center;margin-bottom:20px">
          <h2 style="margin:0">\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3 \u2014 \u05DE\u05DB\u05D9\u05E0\u05D4 \u05DC\u05E6\u05E2\u05D9\u05E8\u05D9\u05DD</h2>
          <h3 style="margin:5px 0;color:#c0392b">\u05E8\u05E9\u05D9\u05DE\u05EA \u05EA\u05E8\u05D5\u05E4\u05D5\u05EA \u05E7\u05D1\u05D5\u05E2\u05D5\u05EA</h3>
          <p style="color:#666">\u05EA\u05D0\u05E8\u05D9\u05DA: ${today} | ${withMeds.length} \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</p>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:13px" border="1" cellpadding="6">
          <thead style="background:#f8d7da;font-weight:bold">
            <tr><th>#</th><th>\u05E9\u05DD</th><th>\u05DB\u05D9\u05EA\u05D4</th><th>\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA</th><th>\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA</th><th>\u05D4\u05E2\u05E8\u05D5\u05EA</th><th>\u05D0\u05D9\u05E9 \u05E7\u05E9\u05E8</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        <div style="margin-top:15px;padding:10px;background:#fff3cd;border:1px solid #ffc107;border-radius:5px;font-size:12px">
          <strong>\u05D4\u05E2\u05E8\u05D4 \u05D7\u05E9\u05D5\u05D1\u05D4:</strong> \u05D9\u05E9 \u05DC\u05D5\u05D5\u05D3\u05D0 \u05E9\u05DC\u05D9\u05D7\u05EA \u05EA\u05E8\u05D5\u05E4\u05D5\u05EA \u05DC\u05DB\u05DC \u05EA\u05DC\u05DE\u05D9\u05D3. \u05D1\u05DE\u05E7\u05E8\u05D4 \u05E9\u05E0\u05D2\u05DE\u05E8\u05D5 \u05D4\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA \u2014 \u05DC\u05D9\u05D9\u05D3\u05E2 \u05D0\u05EA \u05D4\u05D4\u05D5\u05E8\u05D9\u05DD \u05DE\u05D9\u05D3!
        </div>
        <p style="text-align:center;color:#999;font-size:11px;margin-top:10px">\u05D4\u05D5\u05E4\u05E7 \u05DE\u05DE\u05E2\u05E8\u05DB\u05EA \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3 | \u05E1\u05D5\u05D3\u05D9</p>
      </div>`;
  },

});
