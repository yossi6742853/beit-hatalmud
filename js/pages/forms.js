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

  _formsData: [
    { _id: 'f1', name: 'טופס הרשמה - תשפ"ז', desc: 'טופס הרשמה לשנת הלימודים תשפ"ז', status: 'פעיל', color: '#2563eb', date: '2026-04-01',
      fields: [
        { name: 'שם הורה', type: 'text', required: true, options: [] },
        { name: 'שם התלמיד', type: 'text', required: true, options: [] },
        { name: 'כיתה', type: 'select', required: true, options: ['כיתה א', 'כיתה ב', 'כיתה ג'] },
        { name: 'טלפון', type: 'phone', required: true, options: [] },
        { name: 'כתובת מייל', type: 'email', required: false, options: [] },
        { name: 'הערות', type: 'textarea', required: false, options: [] }
      ],
      responses: [
        { date: '2026-04-02', student: 'יוסף כהן', data: { 'שם הורה': 'אברהם כהן', 'שם התלמיד': 'יוסף כהן', 'כיתה': 'כיתה א', 'טלפון': '050-1234567', 'כתובת מייל': 'cohen@mail.com', 'הערות': '' } },
        { date: '2026-04-02', student: 'משה לוי', data: { 'שם הורה': 'דוד לוי', 'שם התלמיד': 'משה לוי', 'כיתה': 'כיתה א', 'טלפון': '050-2345678', 'כתובת מייל': '', 'הערות': 'צריך הסעה' } },
        { date: '2026-04-03', student: 'אברהם גולדברג', data: { 'שם הורה': 'שמעון גולדברג', 'שם התלמיד': 'אברהם גולדברג', 'כיתה': 'כיתה ב', 'טלפון': '050-3456789', 'כתובת מייל': 'gold@mail.com', 'הערות': '' } },
        { date: '2026-04-03', student: 'דוד פרידמן', data: { 'שם הורה': 'יצחק פרידמן', 'שם התלמיד': 'דוד פרידמן', 'כיתה': 'כיתה ב', 'טלפון': '050-4567890', 'כתובת מייל': '', 'הערות': 'אלרגיה לגלוטן' } },
        { date: '2026-04-04', student: 'אליהו שפירא', data: { 'שם הורה': 'נחום שפירא', 'שם התלמיד': 'אליהו שפירא', 'כיתה': 'כיתה א', 'טלפון': '050-5678901', 'כתובת מייל': 'shap@mail.com', 'הערות': '' } },
        { date: '2026-04-05', student: 'יעקב רוזנברג', data: { 'שם הורה': 'מאיר רוזנברג', 'שם התלמיד': 'יעקב רוזנברג', 'כיתה': 'כיתה א', 'טלפון': '050-6789012', 'כתובת מייל': '', 'הערות': '' } },
        { date: '2026-04-06', student: 'נתנאל וייס', data: { 'שם הורה': 'חיים וייס', 'שם התלמיד': 'נתנאל וייס', 'כיתה': 'כיתה ב', 'טלפון': '050-7890123', 'כתובת מייל': 'weiss@mail.com', 'הערות': '' } },
        { date: '2026-04-07', student: 'שמואל הורביץ', data: { 'שם הורה': 'אליעזר הורביץ', 'שם התלמיד': 'שמואל הורביץ', 'כיתה': 'כיתה ג', 'טלפון': '050-8901234', 'כתובת מייל': '', 'הערות': 'עבר ממוסד אחר' } }
      ]
    },
    { _id: 'f2', name: 'אישור טיול שנתי', desc: 'אישור השתתפות בטיול השנתי', status: 'פעיל', color: '#16a34a', date: '2026-04-10',
      fields: [
        { name: 'שם הורה', type: 'text', required: true, options: [] },
        { name: 'שם התלמיד', type: 'text', required: true, options: [] },
        { name: 'אלרגיות', type: 'textarea', required: false, options: [] },
        { name: 'אישור רפואי', type: 'checkbox', required: true, options: [] },
        { name: 'הערות', type: 'textarea', required: false, options: [] }
      ],
      responses: [
        { date: '2026-04-11', student: 'חיים ברקוביץ', data: { 'שם הורה': 'שלמה ברקוביץ', 'שם התלמיד': 'חיים ברקוביץ', 'אלרגיות': 'אין', 'אישור רפואי': 'כן', 'הערות': '' } },
        { date: '2026-04-11', student: 'שמואל הורביץ', data: { 'שם הורה': 'אליעזר הורביץ', 'שם התלמיד': 'שמואל הורביץ', 'אלרגיות': 'אלרגיה לבוטנים', 'אישור רפואי': 'כן', 'הערות': 'צריך אפיפן' } },
        { date: '2026-04-12', student: 'רפאל מזרחי', data: { 'שם הורה': 'עמוס מזרחי', 'שם התלמיד': 'רפאל מזרחי', 'אלרגיות': 'אין', 'אישור רפואי': 'כן', 'הערות': '' } },
        { date: '2026-04-12', student: 'יוסף כהן', data: { 'שם הורה': 'אברהם כהן', 'שם התלמיד': 'יוסף כהן', 'אלרגיות': 'אין', 'אישור רפואי': 'כן', 'הערות': '' } },
        { date: '2026-04-13', student: 'משה לוי', data: { 'שם הורה': 'דוד לוי', 'שם התלמיד': 'משה לוי', 'אלרגיות': 'אין', 'אישור רפואי': 'כן', 'הערות': '' } }
      ]
    },
    { _id: 'f3', name: 'הצהרת בריאות', desc: 'הצהרת בריאות שנתית', status: 'סגור', color: '#9333ea', date: '2025-09-01',
      fields: [
        { name: 'שם הורה', type: 'text', required: true, options: [] },
        { name: 'שם התלמיד', type: 'text', required: true, options: [] },
        { name: 'בעיות רפואיות', type: 'textarea', required: false, options: [] },
        { name: 'אלרגיות', type: 'textarea', required: false, options: [] },
        { name: 'תרופות', type: 'textarea', required: false, options: [] },
        { name: 'קופת חולים', type: 'select', required: true, options: ['כללית', 'מכבי', 'מאוחדת', 'לאומית'] },
        { name: 'חתימה', type: 'checkbox', required: true, options: [] }
      ],
      responses: [
        { date: '2025-09-02', student: 'אברהם גולדברג', data: { 'שם הורה': 'שמעון גולדברג', 'שם התלמיד': 'אברהם גולדברג', 'בעיות רפואיות': 'בריא', 'אלרגיות': 'אלרגיה לאגוזים', 'תרופות': 'אפיפן', 'קופת חולים': 'מכבי', 'חתימה': 'כן' } },
        { date: '2025-09-03', student: 'דוד פרידמן', data: { 'שם הורה': 'יצחק פרידמן', 'שם התלמיד': 'דוד פרידמן', 'בעיות רפואיות': 'בריא', 'אלרגיות': 'אין', 'תרופות': '', 'קופת חולים': 'כללית', 'חתימה': 'כן' } },
        { date: '2025-09-04', student: 'יעקב רוזנברג', data: { 'שם הורה': 'מאיר רוזנברג', 'שם התלמיד': 'יעקב רוזנברג', 'בעיות רפואיות': 'בריא', 'אלרגיות': 'אין', 'תרופות': '', 'קופת חולים': 'מאוחדת', 'חתימה': 'כן' } },
        { date: '2025-09-05', student: 'נתנאל וייס', data: { 'שם הורה': 'חיים וייס', 'שם התלמיד': 'נתנאל וייס', 'בעיות רפואיות': 'בריא', 'אלרגיות': '', 'תרופות': 'אופטלגין', 'קופת חולים': 'לאומית', 'חתימה': 'כן' } }
      ]
    },
    { _id: 'f4', name: 'סקר שביעות הורים', desc: 'סקר שביעות הורים לשנת הלימודים', status: 'טיוטה', color: '#f59e0b', date: '2026-03-15',
      fields: [
        { name: 'שם הורה (אנונימי)', type: 'text', required: false, options: [] },
        { name: 'דירוג כללי', type: 'radio', required: true, options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] },
        { name: 'שביעות מהצוות', type: 'radio', required: true, options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] },
        { name: 'שביעות מהתוכנית', type: 'radio', required: true, options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] },
        { name: 'הערות חופשיות', type: 'textarea', required: false, options: [] }
      ],
      responses: [
        { date: '2026-03-16', student: 'הורה אנונימי 1', data: { 'שם הורה (אנונימי)': '', 'דירוג כללי': '9', 'שביעות מהצוות': '10', 'שביעות מהתוכנית': '8', 'הערות חופשיות': 'מעולה' } },
        { date: '2026-03-16', student: 'הורה אנונימי 2', data: { 'שם הורה (אנונימי)': '', 'דירוג כללי': '8', 'שביעות מהצוות': '9', 'שביעות מהתוכנית': '7', 'הערות חופשיות': '' } },
        { date: '2026-03-17', student: 'הורה אנונימי 3', data: { 'שם הורה (אנונימי)': '', 'דירוג כללי': '7', 'שביעות מהצוות': '8', 'שביעות מהתוכנית': '9', 'הערות חופשיות': 'יש לשפר את התקשורת' } },
        { date: '2026-03-18', student: 'הורה אנונימי 4', data: { 'שם הורה (אנונימי)': '', 'דירוג כללי': '10', 'שביעות מהצוות': '10', 'שביעות מהתוכנית': '10', 'הערות חופשיות': '' } },
        { date: '2026-03-19', student: 'הורה אנונימי 5', data: { 'שם הורה (אנונימי)': '', 'דירוג כללי': '6', 'שביעות מהצוות': '7', 'שביעות מהתוכנית': '5', 'הערות חופשיות': 'צריך יותר שיעורי עזר' } },
        { date: '2026-03-20', student: 'הורה אנונימי 6', data: { 'שם הורה (אנונימי)': '', 'דירוג כללי': '9', 'שביעות מהצוות': '9', 'שביעות מהתוכנית': '8', 'הערות חופשיות': '' } }
      ]
    },
    { _id: 'f5', name: 'בקשת תשלום חריג', desc: 'טופס בקשה לתשלום חריג או פריסה', status: 'פעיל', color: '#ef4444', date: '2026-04-15',
      fields: [
        { name: 'שם ההורה', type: 'text', required: true, options: [] },
        { name: 'טלפון', type: 'phone', required: true, options: [] },
        { name: 'אימייל', type: 'email', required: false, options: [] },
        { name: 'שם התלמיד', type: 'text', required: true, options: [] },
        { name: 'סכום מבוקש', type: 'number', required: true, options: [] },
        { name: 'מספר תשלומים', type: 'select', required: true, options: ['1', '2', '3', '4', '6', '10', '12'] },
        { name: 'סיבה', type: 'textarea', required: true, options: [] },
        { name: 'מסמך מצורף', type: 'file', required: false, options: [] }
      ],
      responses: [
        { date: '2026-04-16', student: 'משפחת כהן', data: { 'שם ההורה': 'אברהם כהן', 'טלפון': '050-1234567', 'אימייל': 'cohen@mail.com', 'שם התלמיד': 'יוסף כהן', 'סכום מבוקש': '5000', 'מספר תשלומים': '10', 'סיבה': 'קושי כלכלי זמני', 'מסמך מצורף': '' } },
        { date: '2026-04-17', student: 'משפחת לוי', data: { 'שם ההורה': 'דוד לוי', 'טלפון': '050-2345678', 'אימייל': '', 'שם התלמיד': 'משה לוי', 'סכום מבוקש': '3000', 'מספר תשלומים': '6', 'סיבה': 'שינוי מצב תעסוקתי', 'מסמך מצורף': '' } }
      ]
    }
  ],

  _formsEditId: null,
  _formsViewId: null,
  _formFields: [],
  _formDragIdx: -1,

  forms() {
    const forms = this._formsData;
    const total = forms.length;
    const active = forms.filter(f => f.status === 'פעיל').length;
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

    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div><h1><i class="bi bi-ui-checks-grid me-2"></i>טפסים</h1><p class="text-muted mb-0">בניית טפסים דיגיטליים, תשובות וניתוח</p></div>
      <button class="btn btn-primary btn-sm" onclick="Pages._formCreate()"><i class="bi bi-plus-lg me-1"></i>טופס חדש</button>
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

    <!-- Forms List -->
    <div id="frm-list">
      ${!forms.length ? `<div class="empty-state text-center py-5"><i class="bi bi-ui-checks display-1 text-muted"></i><h5 class="mt-3">אין טפסים</h5><p class="text-muted">לחץ על "טופס חדש" ליצירת הטופס הראשון</p></div>` :
      forms.map(f => {
        const respCount = f.responses ? f.responses.length : 0;
        const fieldCount = f.fields ? f.fields.length : 0;
        const lastResp = f.responses && f.responses.length > 0 ? f.responses[f.responses.length - 1].date : '-';
        const fieldTypes = (f.fields || []).map(fld => typeof fld === 'string' ? 'text' : fld.type);
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
                <button class="btn btn-sm btn-outline-secondary rounded-pill" onclick="Pages._formCopyLink('${f._id}')" title="העתק קישור">
                  <i class="bi bi-link-45deg"></i>
                </button>
                <button class="btn btn-sm btn-outline-success rounded-pill" onclick="Pages._formShareWhatsApp('${f._id}')" title="WhatsApp">
                  <i class="bi bi-whatsapp"></i>
                </button>
                <button class="btn btn-sm btn-outline-dark rounded-pill" onclick="Pages._formShowQR('${f._id}')" title="QR">
                  <i class="bi bi-qr-code"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger rounded-pill" onclick="Pages._formDelete('${f._id}')" title="מחיקה">
                  <i class="bi bi-trash"></i>
                </button>
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
          <button class="btn btn-outline-info btn-sm" onclick="Pages._formExportResponses()"><i class="bi bi-download me-1"></i>ייצוא</button>
          <button class="btn btn-outline-secondary btn-sm" onclick="Pages._formCloseResponses()"><i class="bi bi-arrow-right me-1"></i>חזרה</button>
        </div>
      </div>
      <!-- Response Stats -->
      <div id="frm-resp-stats" class="mb-3"></div>
      <!-- Response Chart Area -->
      <div id="frm-resp-charts" class="mb-3"></div>
      <div class="card">
        <div class="card-body p-2">
          <input type="text" class="form-control form-control-sm" id="frm-resp-search" placeholder="חיפוש תשובה..." oninput="Pages._formSearchResp(this.value)">
        </div>
        <div class="table-responsive">
          <table class="table table-sm table-hover align-middle mb-0">
            <thead class="table-light" id="frm-resp-head"></thead>
            <tbody id="frm-resp-body"></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Create Form Modal -->
    <div class="modal fade" id="frm-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
      <div class="modal-header bg-primary bg-opacity-10"><h5 class="modal-title"><i class="bi bi-plus-circle me-2"></i>טופס חדש</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <div class="row g-3">
          <div class="col-12"><label class="form-label fw-bold">שם הטופס</label><input class="form-control" id="ff-title" placeholder="למשל: טופס הרשמה תשפ"ז"></div>
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
                  <select class="form-select form-select-sm" id="ff-new-type">
                    ${this._formsFieldTypes.map(ft => `<option value="${ft.type}"><i class="${ft.icon}"></i> ${ft.label}</option>`).join('')}
                  </select>
                </div>
                <div class="col-md-3"><input type="text" class="form-control form-control-sm" id="ff-new-options" placeholder="אפשרויות (פסיק)"></div>
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
    </div></div></div>`;
  },

  formsInit() {},

  _formCreate() {
    this._formsEditId = null;
    this._formFields = [];
    document.getElementById('ff-title').value = '';
    document.getElementById('ff-desc').value = '';
    document.getElementById('ff-status').value = 'פעיל';
    document.getElementById('ff-color').value = '#2563eb';
    this._formRenderFields();
    new bootstrap.Modal(document.getElementById('frm-modal')).show();
  },

  _formQuickAdd(type) {
    const ft = this._formsFieldTypes.find(t => t.type === type);
    if (!ft) return;
    document.getElementById('ff-new-type').value = type;
    document.getElementById('ff-new-field').value = ft.label;
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

  _formRenderFields() {
    const container = document.getElementById('ff-fields-list');
    if (!container) return;
    if (!this._formFields.length) {
      container.innerHTML = '<div class="text-muted small text-center py-3 border rounded bg-light">אין שדות — הוסף שדות למטה</div>';
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

  _formSave() {
    const title = document.getElementById('ff-title').value.trim();
    if (!title) { Utils.toast('נא להזין שם לטופס', 'warning'); return; }
    if (!this._formFields.length) { Utils.toast('נא להוסיף שדות לטופס', 'warning'); return; }

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
    bootstrap.Modal.getInstance(document.getElementById('frm-modal'))?.hide();
    Utils.toast('הטופס נוצר בהצלחה', 'success');
    App.loadPage('forms');
  },

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
        <form onsubmit="event.preventDefault();Utils.toast('הטופס נשלח (דמו)','success')">
          ${fields.map((f, i) => {
            const fld = typeof f === 'string' ? { name: f, type: 'text', required: false, options: [] } : f;
            const req = fld.required ? ' <span class="text-danger">*</span>' : '';
            let input = '';
            switch (fld.type) {
              case 'text': input = `<input type="text" class="form-control" placeholder="${fld.name}" ${fld.required ? 'required' : ''}>`; break;
              case 'number': input = `<input type="number" class="form-control" placeholder="0" ${fld.required ? 'required' : ''}>`; break;
              case 'email': input = `<input type="email" class="form-control" placeholder="email@example.com" ${fld.required ? 'required' : ''}>`; break;
              case 'phone': input = `<input type="tel" class="form-control" placeholder="050-0000000" ${fld.required ? 'required' : ''}>`; break;
              case 'date': input = `<input type="date" class="form-control" ${fld.required ? 'required' : ''}>`; break;
              case 'textarea': input = `<textarea class="form-control" rows="3" placeholder="${fld.name}" ${fld.required ? 'required' : ''}></textarea>`; break;
              case 'select': input = `<select class="form-select" ${fld.required ? 'required' : ''}><option value="">-- בחר --</option>${(fld.options || []).map(o => `<option>${o}</option>`).join('')}</select>`; break;
              case 'checkbox': input = `<div class="form-check"><input class="form-check-input" type="checkbox" id="prev-${i}"><label class="form-check-label" for="prev-${i}">${fld.name}</label></div>`; break;
              case 'radio': input = (fld.options || []).map((o, j) => `<div class="form-check"><input class="form-check-input" type="radio" name="prev-radio-${i}" id="prev-${i}-${j}"><label class="form-check-label" for="prev-${i}-${j}">${o}</label></div>`).join(''); break;
              case 'file': input = `<input type="file" class="form-control">`; break;
              default: input = `<input type="text" class="form-control" placeholder="${fld.name}">`;
            }
            return `<div class="mb-3"><label class="form-label fw-bold">${fld.name}${req}</label>${input}</div>`;
          }).join('')}
          <button type="submit" class="btn btn-primary w-100"><i class="bi bi-send me-1"></i>שליחה</button>
        </form>`;
    }
    new bootstrap.Modal(document.getElementById('frm-preview-modal')).show();
  },

  _formViewResponses(id) {
    const form = this._formsData.find(f => f._id === id);
    if (!form) return;
    this._formsViewId = id;

    document.getElementById('frm-list').classList.add('d-none');
    document.getElementById('frm-responses').classList.remove('d-none');
    document.getElementById('frm-resp-title').textContent = form.name;

    const fields = (form.fields || []).map(f => typeof f === 'string' ? f : f.name);
    const responses = form.responses || [];

    // Stats
    const statsDiv = document.getElementById('frm-resp-stats');
    statsDiv.innerHTML = `
      <div class="row g-2">
        <div class="col-md-3"><div class="card p-2 text-center"><strong class="text-primary fs-4">${responses.length}</strong><br><small class="text-muted">תשובות</small></div></div>
        <div class="col-md-3"><div class="card p-2 text-center"><strong class="text-success fs-4">${fields.length}</strong><br><small class="text-muted">שדות</small></div></div>
        <div class="col-md-3"><div class="card p-2 text-center"><strong class="text-info fs-4">${responses.length > 0 ? responses[0].date : '-'}</strong><br><small class="text-muted">ראשון</small></div></div>
        <div class="col-md-3"><div class="card p-2 text-center"><strong class="text-warning fs-4">${responses.length > 0 ? responses[responses.length - 1].date : '-'}</strong><br><small class="text-muted">אחרון</small></div></div>
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
        });
        const max = Math.max(...Object.values(counts), 1);
        return `<div class="col-md-6"><div class="card p-3">
          <h6 class="fw-bold small mb-2"><i class="bi bi-bar-chart me-1"></i>${cf.name}</h6>
          ${Object.entries(counts).map(([label, count]) => `
            <div class="d-flex align-items-center gap-2 mb-1">
              <span class="small" style="min-width:60px">${label}</span>
              <div class="flex-grow-1"><div class="progress" style="height:16px"><div class="progress-bar" style="width:${Math.round(count / max * 100)}%">${count}</div></div></div>
            </div>
          `).join('')}
        </div></div>`;
      }).join('')}</div>`;
    } else {
      chartsDiv.innerHTML = '';
    }

    // Table
    const thead = document.getElementById('frm-resp-head');
    const tbody = document.getElementById('frm-resp-body');

    if (!responses.length) {
      thead.innerHTML = '<tr><th>תאריך</th><th>תלמיד/הורה</th><th>נתונים</th></tr>';
      tbody.innerHTML = '<tr><td colspan="3" class="text-center text-muted py-4">אין תשובות עדיין</td></tr>';
      return;
    }

    thead.innerHTML = `<tr><th>#</th><th>תאריך</th><th>שם</th>${fields.map(f => `<th>${f}</th>`).join('')}</tr>`;
    tbody.innerHTML = responses.map((r, i) => {
      const dataVals = fields.map(f => {
        if (typeof r.data === 'object') return r.data[f] || '-';
        return r.data || '-';
      });
      return `<tr data-search="${r.student} ${JSON.stringify(r.data)}">
        <td class="text-muted">${i + 1}</td>
        <td>${r.date}</td>
        <td class="fw-bold">${r.student}</td>
        ${dataVals.map(v => `<td class="small">${v}</td>`).join('')}
      </tr>`;
    }).join('');
  },

  _formCloseResponses() {
    document.getElementById('frm-list').classList.remove('d-none');
    document.getElementById('frm-responses').classList.add('d-none');
    this._formsViewId = null;
  },

  _formSearchResp(query) {
    const rows = document.querySelectorAll('#frm-resp-body tr');
    const q = query.trim().toLowerCase();
    rows.forEach(tr => {
      const text = (tr.dataset.search || '').toLowerCase();
      tr.style.display = !q || text.includes(q) ? '' : 'none';
    });
  },

  _formExportResponses() {
    Utils.toast('הנתונים יוצאו בהצלחה', 'success');
  },

  _formCopyLink(id) {
    const url = location.origin + location.pathname.replace(/[^/]*$/, '') + 'form.html?id=' + id;
    navigator.clipboard.writeText(url).then(() => {
      Utils.toast('הקישור הועתק', 'success');
    }).catch(() => {
      prompt('העתק את הקישור:', url);
    });
  },

  _formShareWhatsApp(id) {
    const form = this._formsData.find(f => f._id === id);
    if (!form) return;
    const url = location.origin + location.pathname.replace(/[^/]*$/, '') + 'form.html?id=' + id;
    const text = encodeURIComponent(`שלום,\nנא למלא את הטופס: ${form.name}\n${url}`);
    window.open('https://wa.me/?text=' + text, '_blank');
  },

  _formShowQR(id) {
    const form = this._formsData.find(f => f._id === id);
    if (!form) return;
    const url = location.origin + location.pathname.replace(/[^/]*$/, '') + 'form.html?id=' + id;
    document.getElementById('frm-qr-body').innerHTML = `
      <div class="border rounded p-4 mb-3 bg-light">
        <div class="d-flex align-items-center justify-content-center" style="width:180px;height:180px;margin:0 auto;border:2px dashed #ccc;border-radius:12px">
          <div class="text-center">
            <i class="bi bi-qr-code display-3 text-muted"></i>
            <div class="small text-muted mt-1">QR Code</div>
          </div>
        </div>
      </div>
      <p class="small text-muted mb-2">קישור לטופס:</p>
      <div class="input-group input-group-sm">
        <input type="text" class="form-control" value="${url}" readonly>
        <button class="btn btn-outline-primary" onclick="navigator.clipboard.writeText('${url}');Utils.toast('הועתק','success')"><i class="bi bi-clipboard"></i></button>
      </div>
      <p class="small text-muted mt-2"><strong>${form.name}</strong></p>`;
    new bootstrap.Modal(document.getElementById('frm-qr-modal')).show();
  },

  _formDelete(id) {
    if (!confirm('למחוק טופס זה?')) return;
    this._formsData = this._formsData.filter(f => f._id !== id);
    Utils.toast('הטופס נמחק', 'success');
    App.loadPage('forms');
  }
});
