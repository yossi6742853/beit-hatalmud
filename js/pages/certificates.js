/* ===== BHT v5.3 — Certificates (תעודות ודיפלומות) ===== */
Object.assign(Pages, {

  /* ---------- template definitions ---------- */
  _certTemplates: [
    { id: 'report',       name: 'תעודת סוף שנה',    icon: 'bi-journal-bookmark-fill', color: 'primary',  desc: 'תעודה מסכמת לסוף שנת הלימודים עם ציונים והערכות' },
    { id: 'achievement',  name: 'תעודת הצטיינות',   icon: 'bi-star-fill',             color: 'warning',  desc: 'הוקרה לתלמידים מצטיינים בלימודים או בהתנהגות' },
    { id: 'completion',   name: 'תעודת סיום',        icon: 'bi-mortarboard-fill',      color: 'success',  desc: 'אישור סיום מסלול לימודים, קורס או תוכנית' },
    { id: 'appreciation', name: 'תעודת הוקרה',       icon: 'bi-heart-fill',            color: 'danger',   desc: 'הכרת תודה על תרומה מיוחדת למוסד או לקהילה' },
  ],

  /* ---------- demo students ---------- */
  _certStudents: [
    'יוסף כהן', 'משה לוי', 'אברהם גולדברג', 'דוד פרידמן', 'אליהו שפירא',
    'יעקב רוזנברג', 'חיים ברקוביץ', 'נתנאל וייס', 'שמואל הורביץ', 'רפאל מזרחי',
    'עמנואל שטרן', 'בנימין אדלר', 'מנחם פלדמן', 'אהרן קליין', 'ישראל גרוס',
  ],

  _certClasses: ["כיתה א'", "כיתה ב'", "כיתה ג'", "כיתה ד'"],

  /* ---------- demo generated history ---------- */
  _certHistory: [
    { id: 1,  student: 'יוסף כהן',       type: 'report',       date: '2026-04-20', text: 'תעודת סוף שנה תשפ"ו — הצטיין בלימודיו' },
    { id: 2,  student: 'משה לוי',         type: 'achievement',  date: '2026-04-18', text: 'הצטיינות יתרה במסכת ברכות' },
    { id: 3,  student: 'אברהם גולדברג',  type: 'completion',   date: '2026-04-15', text: 'סיים בהצלחה מסלול "שס בעל פה"' },
    { id: 4,  student: 'דוד פרידמן',      type: 'appreciation', date: '2026-04-14', text: 'תודה על ארגון שבת גיבוש' },
    { id: 5,  student: 'אליהו שפירא',    type: 'report',       date: '2026-04-12', text: 'תעודת סוף שנה תשפ"ו — מעורבות חברתית' },
    { id: 6,  student: 'יעקב רוזנברג',   type: 'achievement',  date: '2026-04-10', text: 'תלמיד השבוע — שבוע פרשת שמיני' },
    { id: 7,  student: 'חיים ברקוביץ',   type: 'completion',   date: '2026-04-08', text: 'סיים קורס חזנות למתחילים' },
    { id: 8,  student: 'נתנאל וייס',     type: 'appreciation', date: '2026-04-05', text: 'הוקרה על סיוע בספרייה' },
    { id: 9,  student: 'שמואל הורביץ',   type: 'report',       date: '2026-03-28', text: 'תעודת סוף סמסטר א\' — ציונים מעולים' },
    { id: 10, student: 'רפאל מזרחי',     type: 'achievement',  date: '2026-03-20', text: 'מקום ראשון בחידון תנ"ך' },
  ],

  _certNextId: 11,
  _certFilter: '',

  /* ---------- main render ---------- */
  certificates() {
    const tpls = this._certTemplates;
    const hist = this._certHistory;
    const thisMonth = hist.filter(h => h.date >= '2026-04-01').length;

    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div>
          <h1><i class="bi bi-award-fill me-2"></i>תעודות ודיפלומות</h1>
          <p class="text-muted mb-0">יצירת תעודות, הפקה ומעקב</p>
        </div>
        <div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-outline-info btn-sm" onclick="Pages._certBatch()"><i class="bi bi-people-fill me-1"></i>הפקה קבוצתית</button>
          <button class="btn btn-primary btn-sm" onclick="Pages._certShowGenerator()"><i class="bi bi-plus-lg me-1"></i>תעודה חדשה</button>
        </div>
      </div>

      <!-- Stats -->
      <div class="row g-3 mb-4">
        <div class="col-6 col-md-3">
          <div class="card p-3 text-center">
            <div class="fs-4 fw-bold text-primary">${hist.length}</div>
            <small class="text-muted">סה"כ הופקו</small>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card p-3 text-center">
            <div class="fs-4 fw-bold text-success">${thisMonth}</div>
            <small class="text-muted">החודש</small>
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
            <div class="fs-4 fw-bold text-info">${this._certStudents.length}</div>
            <small class="text-muted">תלמידים</small>
          </div>
        </div>
      </div>

      <!-- Template Cards -->
      <h5 class="fw-bold mb-3"><i class="bi bi-layout-text-window-reverse me-2"></i>תבניות תעודה</h5>
      <div class="row g-3 mb-4">
        ${tpls.map(t => `
        <div class="col-6 col-lg-3">
          <div class="card h-100 border-${t.color} border-2 cert-tpl-card" style="cursor:pointer" onclick="Pages._certShowGenerator('${t.id}')">
            <div class="card-body text-center p-3">
              <div class="mb-2"><i class="bi ${t.icon} fs-1 text-${t.color}"></i></div>
              <h6 class="fw-bold mb-1">${t.name}</h6>
              <small class="text-muted">${t.desc}</small>
            </div>
            <div class="card-footer bg-${t.color} bg-opacity-10 border-0 text-center py-2">
              <small class="text-${t.color} fw-bold"><i class="bi bi-plus-circle me-1"></i>צור תעודה</small>
            </div>
          </div>
        </div>`).join('')}
      </div>

      <!-- History -->
      <div class="card">
        <div class="card-header bg-white d-flex justify-content-between align-items-center flex-wrap gap-2 py-3">
          <h5 class="mb-0 fw-bold"><i class="bi bi-clock-history me-2"></i>היסטוריית תעודות</h5>
          <input type="text" class="form-control form-control-sm" style="max-width:250px" placeholder="חיפוש..." id="cert-search" oninput="Pages._certFilterHistory(this.value)">
        </div>
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>#</th>
                <th>תלמיד</th>
                <th>סוג תעודה</th>
                <th>תאריך</th>
                <th>תוכן</th>
                <th class="text-center">פעולות</th>
              </tr>
            </thead>
            <tbody id="cert-history-body">
              ${this._certRenderHistoryRows(hist)}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Generator Modal -->
      <div class="modal fade" id="certGeneratorModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"><i class="bi bi-award me-2"></i>הפקת תעודה</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label fw-bold">סוג תעודה</label>
                  <select class="form-select" id="cert-type">
                    ${tpls.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-bold">תלמיד</label>
                  <select class="form-select" id="cert-student">
                    ${this._certStudents.map(s => `<option value="${s}">${s}</option>`).join('')}
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-bold">תאריך</label>
                  <input type="date" class="form-control" id="cert-date" value="2026-04-22">
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-bold">חתימת מנהל</label>
                  <input type="text" class="form-control" id="cert-principal" value="הרב יעקב ירושלמי" placeholder="שם המנהל">
                </div>
                <div class="col-12">
                  <label class="form-label fw-bold">תוכן התעודה</label>
                  <textarea class="form-control" id="cert-text" rows="3" placeholder="טקסט מותאם אישית לתעודה..."></textarea>
                </div>
              </div>
              <hr>
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h6 class="fw-bold mb-0"><i class="bi bi-eye me-2"></i>תצוגה מקדימה</h6>
                <button class="btn btn-outline-primary btn-sm" onclick="Pages._certRefreshPreview()"><i class="bi bi-arrow-clockwise me-1"></i>רענן</button>
              </div>
              <div id="cert-preview-area"></div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary btn-sm" data-bs-dismiss="modal">ביטול</button>
              <button class="btn btn-success btn-sm" onclick="Pages._certGenerate()"><i class="bi bi-check-lg me-1"></i>הפק ושמור</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Batch Modal -->
      <div class="modal fade" id="certBatchModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"><i class="bi bi-people-fill me-2"></i>הפקה קבוצתית</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label fw-bold">סוג תעודה</label>
                <select class="form-select" id="cert-batch-type">
                  ${tpls.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">כיתה</label>
                <select class="form-select" id="cert-batch-class">
                  ${this._certClasses.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">תוכן אחיד</label>
                <textarea class="form-control" id="cert-batch-text" rows="2" placeholder="טקסט שיופיע בכל התעודות..."></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">תלמידים בכיתה</label>
                <div id="cert-batch-students" class="border rounded p-2" style="max-height:200px;overflow-y:auto">
                  ${this._certStudents.map(s => `
                    <div class="form-check">
                      <input class="form-check-input cert-batch-chk" type="checkbox" value="${s}" id="bchk-${s.replace(/\s/g,'_')}" checked>
                      <label class="form-check-label" for="bchk-${s.replace(/\s/g,'_')}">${s}</label>
                    </div>
                  `).join('')}
                </div>
                <div class="mt-2 d-flex gap-2">
                  <button class="btn btn-outline-secondary btn-xs px-2 py-0" style="font-size:.75rem" onclick="document.querySelectorAll('.cert-batch-chk').forEach(c=>c.checked=true)">בחר הכל</button>
                  <button class="btn btn-outline-secondary btn-xs px-2 py-0" style="font-size:.75rem" onclick="document.querySelectorAll('.cert-batch-chk').forEach(c=>c.checked=false)">נקה הכל</button>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary btn-sm" data-bs-dismiss="modal">ביטול</button>
              <button class="btn btn-success btn-sm" onclick="Pages._certBatchGenerate()"><i class="bi bi-check-lg me-1"></i>הפק לכולם</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Print Preview Modal -->
      <div class="modal fade" id="certPrintModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"><i class="bi bi-printer me-2"></i>תצוגת הדפסה</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body p-0" id="cert-print-body"></div>
            <div class="modal-footer">
              <button class="btn btn-secondary btn-sm" data-bs-dismiss="modal">סגור</button>
              <button class="btn btn-primary btn-sm" onclick="Pages._certPrint()"><i class="bi bi-printer me-1"></i>הדפס</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Certificate print styles -->
      <style>
        .cert-tpl-card:hover { transform: translateY(-3px); box-shadow: 0 6px 20px rgba(0,0,0,.12); }
        .cert-tpl-card { transition: all .2s ease; }

        .cert-frame {
          position: relative;
          border: 8px double #b8860b;
          border-radius: 12px;
          padding: 40px 50px;
          margin: 16px;
          background: linear-gradient(135deg, #fffef5 0%, #fff9e6 50%, #fffef5 100%);
          min-height: 500px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .cert-frame::before {
          content: '';
          position: absolute;
          inset: 6px;
          border: 2px solid #d4a853;
          border-radius: 8px;
          pointer-events: none;
        }
        .cert-frame::after {
          content: '';
          position: absolute;
          inset: 12px;
          border: 1px dashed #e8c96880;
          border-radius: 6px;
          pointer-events: none;
        }

        .cert-frame.cert-report { border-color: #1a5276; }
        .cert-frame.cert-report::before { border-color: #2980b9; }
        .cert-frame.cert-achievement { border-color: #b8860b; }
        .cert-frame.cert-achievement::before { border-color: #d4a853; }
        .cert-frame.cert-completion { border-color: #1e7e34; }
        .cert-frame.cert-completion::before { border-color: #28a745; }
        .cert-frame.cert-appreciation { border-color: #922b21; }
        .cert-frame.cert-appreciation::before { border-color: #c0392b; }

        .cert-header-ornament {
          font-size: 2rem;
          color: #b8860b;
          letter-spacing: 8px;
          margin-bottom: 8px;
        }
        .cert-institution {
          font-size: 1.8rem;
          font-weight: 700;
          color: #1a3e5c;
          margin-bottom: 4px;
        }
        .cert-subtitle {
          font-size: .95rem;
          color: #666;
          margin-bottom: 20px;
        }
        .cert-title {
          font-size: 2rem;
          font-weight: 800;
          margin: 16px 0;
          padding: 8px 32px;
          border-top: 2px solid #b8860b;
          border-bottom: 2px solid #b8860b;
        }
        .cert-student-name {
          font-size: 1.8rem;
          font-weight: 700;
          color: #1a3e5c;
          margin: 16px 0 8px;
        }
        .cert-text {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #333;
          max-width: 500px;
          margin: 12px auto 24px;
        }
        .cert-footer {
          margin-top: auto;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding-top: 24px;
        }
        .cert-sig {
          text-align: center;
          min-width: 150px;
        }
        .cert-sig-line {
          border-top: 2px solid #333;
          width: 150px;
          margin: 0 auto 4px;
        }
        .cert-sig-label {
          font-size: .85rem;
          color: #666;
        }
        .cert-sig-name {
          font-size: .95rem;
          font-weight: 600;
          color: #333;
        }
        .cert-seal {
          width: 80px;
          height: 80px;
          border: 3px solid #b8860b;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: .65rem;
          color: #b8860b;
          font-weight: 700;
          text-align: center;
          line-height: 1.2;
          background: radial-gradient(circle, #fff9e6, #fff5d6);
        }
        .cert-date {
          font-size: .9rem;
          color: #666;
        }
        .cert-corner { position: absolute; width: 40px; height: 40px; }
        .cert-corner svg { width: 100%; height: 100%; fill: #b8860b; opacity: .4; }
        .cert-corner-tl { top: 18px; right: 18px; }
        .cert-corner-tr { top: 18px; left: 18px; transform: scaleX(-1); }
        .cert-corner-bl { bottom: 18px; right: 18px; transform: scaleY(-1); }
        .cert-corner-br { bottom: 18px; left: 18px; transform: scale(-1); }

        @media print {
          body * { visibility: hidden !important; }
          #cert-print-body, #cert-print-body * { visibility: visible !important; }
          #cert-print-body { position: absolute; top: 0; right: 0; left: 0; }
          .cert-frame { box-shadow: none !important; margin: 0 !important; }
        }
      </style>
    `;
  },

  certificatesInit() {
    // nothing extra needed — static demo
  },

  /* ---------- helpers ---------- */
  _certTemplateName(id) {
    const t = this._certTemplates.find(t => t.id === id);
    return t ? t.name : id;
  },
  _certTemplateBadge(id) {
    const t = this._certTemplates.find(t => t.id === id);
    if (!t) return `<span class="badge bg-secondary">${id}</span>`;
    return `<span class="badge bg-${t.color}"><i class="bi ${t.icon} me-1"></i>${t.name}</span>`;
  },

  _certRenderHistoryRows(list) {
    if (!list.length) return '<tr><td colspan="6" class="text-center text-muted py-4">אין תעודות</td></tr>';
    return list.map((h, i) => `
      <tr>
        <td class="text-muted">${h.id}</td>
        <td class="fw-bold">${typeof Utils !== 'undefined' && Utils.avatarHTML ? Utils.avatarHTML(h.student, 'sm') + ' ' : ''}${h.student}</td>
        <td>${this._certTemplateBadge(h.type)}</td>
        <td>${h.date}</td>
        <td class="text-muted" style="max-width:250px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${h.text}</td>
        <td class="text-center">
          <button class="btn btn-sm btn-outline-primary me-1" onclick="Pages._certPreviewFromHistory(${h.id})" title="תצוגה מקדימה"><i class="bi bi-eye"></i></button>
          <button class="btn btn-sm btn-outline-success" onclick="Pages._certPrintFromHistory(${h.id})" title="הדפסה"><i class="bi bi-printer"></i></button>
        </td>
      </tr>
    `).join('');
  },

  _certFilterHistory(q) {
    this._certFilter = q.trim().toLowerCase();
    const filtered = this._certHistory.filter(h =>
      !this._certFilter ||
      h.student.toLowerCase().includes(this._certFilter) ||
      h.text.toLowerCase().includes(this._certFilter) ||
      this._certTemplateName(h.type).includes(this._certFilter)
    );
    const body = document.getElementById('cert-history-body');
    if (body) body.innerHTML = this._certRenderHistoryRows(filtered);
  },

  /* ---------- corner ornament SVG ---------- */
  _certCornerSVG() {
    return `<svg viewBox="0 0 40 40"><path d="M0 0 C10 0 20 5 25 15 C30 25 35 35 40 40 L40 35 C35 30 25 20 20 12 C15 5 8 0 0 0 Z"/><path d="M0 10 C8 10 14 14 18 22 C22 28 28 34 35 40 L30 40 C24 34 18 28 14 20 C10 14 6 10 0 10 Z" opacity=".5"/></svg>`;
  },

  /* ---------- build certificate HTML ---------- */
  _certBuildHTML(type, student, date, text, principal) {
    const tpl = this._certTemplates.find(t => t.id === type) || this._certTemplates[0];
    const corner = this._certCornerSVG();
    const hebrewDate = date || '2026-04-22';

    const defaultTexts = {
      report: 'השלים/ה את שנת הלימודים בהצלחה רבה ובהתמדה ראויה לציון',
      achievement: 'הצטיין/ה באופן מיוחד בלימודים ובמידות טובות',
      completion: 'סיים/ה בהצלחה את מסלול הלימודים המלא',
      appreciation: 'על תרומה מיוחדת ומסירות נפש למען המוסד והקהילה',
    };
    const content = text || defaultTexts[type] || '';

    return `
      <div class="cert-frame cert-${type}">
        <div class="cert-corner cert-corner-tl">${corner}</div>
        <div class="cert-corner cert-corner-tr">${corner}</div>
        <div class="cert-corner cert-corner-bl">${corner}</div>
        <div class="cert-corner cert-corner-br">${corner}</div>

        <div class="cert-header-ornament">\u2726 \u2726 \u2726</div>
        <div class="cert-institution">בית התלמוד</div>
        <div class="cert-subtitle">מוסד חינוכי תורני</div>

        <div class="cert-title text-${tpl.color}">${tpl.name}</div>

        <div style="font-size:1rem;color:#666;margin-bottom:4px">מוענקת בזאת ל</div>
        <div class="cert-student-name">${student || '---'}</div>

        <div class="cert-text">${content}</div>

        <div class="cert-footer">
          <div class="cert-sig">
            <div class="cert-sig-name">${principal || 'הרב יעקב ירושלמי'}</div>
            <div class="cert-sig-line"></div>
            <div class="cert-sig-label">חתימת המנהל</div>
          </div>
          <div class="cert-seal">חותמת<br>המוסד</div>
          <div class="cert-date">
            <div>${hebrewDate}</div>
            <div style="font-size:.75rem;color:#999">תאריך הנפקה</div>
          </div>
        </div>
      </div>
    `;
  },

  /* ---------- show generator modal ---------- */
  _certShowGenerator(preselect) {
    if (preselect) {
      setTimeout(() => {
        const sel = document.getElementById('cert-type');
        if (sel) sel.value = preselect;
      }, 100);
    }
    const modal = new bootstrap.Modal(document.getElementById('certGeneratorModal'));
    modal.show();
    setTimeout(() => this._certRefreshPreview(), 200);
  },

  _certRefreshPreview() {
    const type = document.getElementById('cert-type')?.value || 'report';
    const student = document.getElementById('cert-student')?.value || '';
    const date = document.getElementById('cert-date')?.value || '';
    const text = document.getElementById('cert-text')?.value || '';
    const principal = document.getElementById('cert-principal')?.value || '';
    const area = document.getElementById('cert-preview-area');
    if (area) {
      area.innerHTML = this._certBuildHTML(type, student, date, text, principal);
      area.querySelector('.cert-frame').style.transform = 'scale(0.7)';
      area.querySelector('.cert-frame').style.transformOrigin = 'top center';
      area.querySelector('.cert-frame').style.marginBottom = '-120px';
    }
  },

  /* ---------- generate (save) ---------- */
  _certGenerate() {
    const type = document.getElementById('cert-type')?.value;
    const student = document.getElementById('cert-student')?.value;
    const date = document.getElementById('cert-date')?.value;
    const text = document.getElementById('cert-text')?.value;

    const entry = {
      id: this._certNextId++,
      student,
      type,
      date: date || '2026-04-22',
      text: text || this._certTemplateName(type),
    };
    this._certHistory.unshift(entry);

    bootstrap.Modal.getInstance(document.getElementById('certGeneratorModal'))?.hide();

    if (typeof App !== 'undefined' && App.toast) App.toast('התעודה הופקה בהצלחה!', 'success');

    // refresh history table
    const body = document.getElementById('cert-history-body');
    if (body) body.innerHTML = this._certRenderHistoryRows(this._certHistory);

    // update stats
    this._certUpdateStats();
  },

  _certUpdateStats() {
    // Re-render the page stats by finding stat cards
    const cards = document.querySelectorAll('.card.p-3.text-center .fs-4');
    if (cards.length >= 2) {
      cards[0].textContent = this._certHistory.length;
      const thisMonth = this._certHistory.filter(h => h.date >= '2026-04-01').length;
      cards[1].textContent = thisMonth;
    }
  },

  /* ---------- batch generation ---------- */
  _certBatch() {
    const modal = new bootstrap.Modal(document.getElementById('certBatchModal'));
    modal.show();
  },

  _certBatchGenerate() {
    const type = document.getElementById('cert-batch-type')?.value;
    const text = document.getElementById('cert-batch-text')?.value || this._certTemplateName(type);
    const checked = document.querySelectorAll('.cert-batch-chk:checked');
    let count = 0;

    checked.forEach(chk => {
      const student = chk.value;
      this._certHistory.unshift({
        id: this._certNextId++,
        student,
        type,
        date: '2026-04-22',
        text,
      });
      count++;
    });

    bootstrap.Modal.getInstance(document.getElementById('certBatchModal'))?.hide();

    if (typeof App !== 'undefined' && App.toast) App.toast(`הופקו ${count} תעודות בהצלחה!`, 'success');

    const body = document.getElementById('cert-history-body');
    if (body) body.innerHTML = this._certRenderHistoryRows(this._certHistory);
    this._certUpdateStats();
  },

  /* ---------- preview / print from history ---------- */
  _certPreviewFromHistory(id) {
    const h = this._certHistory.find(x => x.id === id);
    if (!h) return;
    const printBody = document.getElementById('cert-print-body');
    if (printBody) printBody.innerHTML = this._certBuildHTML(h.type, h.student, h.date, h.text);
    const modal = new bootstrap.Modal(document.getElementById('certPrintModal'));
    modal.show();
  },

  _certPrintFromHistory(id) {
    this._certPreviewFromHistory(id);
    setTimeout(() => this._certPrint(), 400);
  },

  _certPrint() {
    window.print();
  },

});
