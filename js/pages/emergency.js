/* ===== BHT v5.3 — Emergency & Safety (חירום ובטיחות) ===== */
Object.assign(Pages, {

  /* ---------- Demo / Default Data ---------- */
  _emergencyDefaults() {
    return {
      drills: [
        { id: 1, date: '2026-03-15', type: 'שריפה', duration: 12, participants: 85, notes: 'פינוי תקין, זמן תגובה טוב' },
        { id: 2, date: '2026-02-20', type: 'רעידת אדמה', duration: 8, participants: 78, notes: 'חלק מהתלמידים לא ידעו לאן לפנות' },
        { id: 3, date: '2026-01-10', type: 'איום ביטחוני', duration: 15, participants: 90, notes: 'סגירת שערים בוצעה תוך 2 דקות' },
        { id: 4, date: '2025-12-05', type: 'חירום רפואי', duration: 10, participants: 30, notes: 'תרגול החייאה לצוות בלבד' },
        { id: 5, date: '2025-11-18', type: 'סגר', duration: 20, participants: 82, notes: 'נעילת כיתות ושקט מלא תוך 3 דקות' }
      ],
      contacts: [
        { id: 1, name: 'משטרה', phone: '100', icon: 'bi-shield-fill', color: 'primary' },
        { id: 2, name: 'כיבוי אש', phone: '102', icon: 'bi-fire', color: 'danger' },
        { id: 3, name: 'מגן דוד אדום', phone: '101', icon: 'bi-heart-pulse-fill', color: 'danger' },
        { id: 4, name: 'ביטחון המוסד', phone: '02-1234567', icon: 'bi-person-badge-fill', color: 'dark' },
        { id: 5, name: 'בית חולים קרוב', phone: '02-6555111', icon: 'bi-hospital-fill', color: 'info' },
        { id: 6, name: 'רעלים (מרכז רפואי)', phone: '04-8541000', icon: 'bi-exclamation-triangle-fill', color: 'warning' }
      ],
      studentContacts: [
        { name: 'יוסף כהן', class: 'א', parent: 'אברהם כהן', phone: '050-1234567' },
        { name: 'משה לוי', class: 'א', parent: 'יצחק לוי', phone: '052-2345678' },
        { name: 'דוד ישראלי', class: 'ב', parent: 'שמעון ישראלי', phone: '054-3456789' },
        { name: 'אהרן פרידמן', class: 'ב', parent: 'חיים פרידמן', phone: '058-4567890' },
        { name: 'שמואל רוזנברג', class: 'ג', parent: 'נחמן רוזנברג', phone: '053-5678901' },
        { name: 'יעקב גולדשטיין', class: 'ג', parent: 'מנחם גולדשטיין', phone: '050-6789012' },
        { name: 'נתנאל שפירא', class: 'א', parent: 'אליהו שפירא', phone: '052-7890123' },
        { name: 'חיים ברקוביץ', class: 'ב', parent: 'צבי ברקוביץ', phone: '054-8901234' }
      ]
    };
  },

  _emergencyLoadData() {
    const saved = localStorage.getItem('bht_emergency');
    if (saved) return JSON.parse(saved);
    const def = this._emergencyDefaults();
    localStorage.setItem('bht_emergency', JSON.stringify(def));
    return def;
  },

  _emergencySaveData(data) {
    localStorage.setItem('bht_emergency', JSON.stringify(data));
  },

  /* ---------- Procedures ---------- */
  _emergencyProcedures: [
    {
      id: 'fire', title: 'שריפה', icon: 'bi-fire', color: 'danger',
      steps: [
        'הפעל אזעקת שריפה',
        'התקשר לכיבוי אש — 102',
        'פנה את כל התלמידים לנקודת כינוס',
        'ספור את כל התלמידים לפי רשימות כיתה',
        'אל תחזור לבניין עד לאישור כבאים',
        'דווח לקב"ט המוסד'
      ]
    },
    {
      id: 'earthquake', title: 'רעידת אדמה', icon: 'bi-tsunami', color: 'warning',
      steps: [
        'הורה לכולם: "רגע, הישמר, החזק"',
        'התכופף מתחת לשולחן או ליד קיר פנימי',
        'התרחק מחלונות ומדפים',
        'המתן עד שהרעידה נפסקת',
        'פנה לנקודת כינוס חיצונית',
        'בדוק פצועים ודווח למגן דוד אדום — 101'
      ]
    },
    {
      id: 'security', title: 'איום ביטחוני', icon: 'bi-shield-exclamation', color: 'dark',
      steps: [
        'הודע לקב"ט המוסד מיידית',
        'נעל את כל הכניסות והשערים',
        'הכנס תלמידים לכיתות — סגור דלתות וחלונות',
        'התקשר למשטרה — 100',
        'שמור על שקט מוחלט',
        'המתן להוראות מגורמי הביטחון'
      ]
    },
    {
      id: 'medical', title: 'חירום רפואי', icon: 'bi-heart-pulse', color: 'info',
      steps: [
        'בדוק את מצב הנפגע — הכרה, נשימה, דופק',
        'התקשר למגן דוד אדום — 101',
        'הזעק חובש/מגיש עזרה ראשונה',
        'אל תזיז את הנפגע אלא אם יש סכנה מיידית',
        'הודע להורים',
        'תעד את האירוע ביומן רפואי'
      ]
    },
    {
      id: 'lockdown', title: 'סגר', icon: 'bi-lock-fill', color: 'secondary',
      steps: [
        'הודע בכריזה: "סגר — כולם בכיתות"',
        'נעל את כל דלתות הכיתות',
        'הורד תריסים/וילונות',
        'רכז תלמידים הרחק מדלתות וחלונות',
        'בצע ספירת תלמידים',
        'המתן להוראות קב"ט — אל תפתח דלת ללא אישור'
      ]
    }
  ],

  /* ---------- Render ---------- */
  emergency() {
    const data = this._emergencyLoadData();
    const drills = data.drills || [];
    const contacts = data.contacts || [];

    // Stats
    const today = new Date();
    const lastDrill = drills.length ? drills.reduce((a, b) => a.date > b.date ? a : b) : null;
    const daysSinceLast = lastDrill ? Math.floor((today - new Date(lastDrill.date)) / 86400000) : '---';
    const yearStart = new Date(today.getFullYear(), 0, 1).toISOString().slice(0, 10);
    const drillsThisYear = drills.filter(d => d.date >= yearStart).length;
    const totalStudents = (data.studentContacts || []).length;
    const withPhone = (data.studentContacts || []).filter(s => s.phone).length;
    const coverage = totalStudents ? Math.round(withPhone / totalStudents * 100) : 0;

    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div><h1><i class="bi bi-shield-fill-exclamation me-2 text-danger"></i>\u05D7\u05D9\u05E8\u05D5\u05DD \u05D5\u05D1\u05D8\u05D9\u05D7\u05D5\u05EA</h1>
        <p>\u05E0\u05D9\u05D4\u05D5\u05DC \u05DE\u05E6\u05D1\u05D9 \u05D7\u05D9\u05E8\u05D5\u05DD, \u05E0\u05D4\u05DC\u05D9\u05DD \u05D5\u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8</p></div>
      </div>

      <!-- Emergency Button -->
      <div class="text-center mb-4">
        <button class="btn btn-danger btn-lg px-5 py-3 shadow-lg" style="font-size:1.4rem;border-radius:16px;" onclick="Pages.activateEmergency()">
          <i class="bi bi-exclamation-octagon-fill me-2 fs-3"></i>\u05D4\u05E4\u05E2\u05DC \u05E0\u05D5\u05D4\u05DC \u05D7\u05D9\u05E8\u05D5\u05DD
        </button>
      </div>

      <!-- Stats Row -->
      <div class="row g-3 mb-4">
        <div class="col-md-4"><div class="card p-3 text-center border-start border-4 border-warning">
          <div class="fs-2 fw-bold text-warning">${daysSinceLast}</div>
          <small class="text-muted">\u05D9\u05DE\u05D9\u05DD \u05DE\u05D0\u05D6 \u05D4\u05EA\u05E8\u05D2\u05D9\u05DC \u05D4\u05D0\u05D7\u05E8\u05D5\u05DF</small>
        </div></div>
        <div class="col-md-4"><div class="card p-3 text-center border-start border-4 border-success">
          <div class="fs-2 fw-bold text-success">${drillsThisYear}</div>
          <small class="text-muted">\u05EA\u05E8\u05D2\u05D9\u05DC\u05D9\u05DD \u05D4\u05E9\u05E0\u05D4</small>
        </div></div>
        <div class="col-md-4"><div class="card p-3 text-center border-start border-4 border-info">
          <div class="fs-2 fw-bold text-info">${coverage}%</div>
          <small class="text-muted">\u05DB\u05D9\u05E1\u05D5\u05D9 \u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8 \u05D7\u05D9\u05E8\u05D5\u05DD</small>
        </div></div>
      </div>

      <!-- Emergency Contacts -->
      <div class="card mb-4">
        <div class="card-header bg-danger text-white"><i class="bi bi-telephone-fill me-2"></i>\u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8 \u05DC\u05D7\u05D9\u05E8\u05D5\u05DD</div>
        <div class="card-body"><div class="row g-3">
          ${contacts.map(c => `
            <div class="col-md-4 col-6">
              <div class="d-flex align-items-center gap-3 p-3 border rounded-3">
                <div class="rounded-circle bg-${c.color} bg-opacity-10 d-flex align-items-center justify-content-center" style="width:48px;height:48px">
                  <i class="bi ${c.icon} fs-4 text-${c.color}"></i>
                </div>
                <div>
                  <div class="fw-bold">${c.name}</div>
                  <a href="tel:${c.phone}" class="text-decoration-none fs-5 fw-bold text-${c.color}">${c.phone}</a>
                </div>
              </div>
            </div>
          `).join('')}
        </div></div>
      </div>

      <!-- Emergency Procedures -->
      <div class="card mb-4">
        <div class="card-header"><i class="bi bi-journal-check me-2"></i>\u05E0\u05D4\u05DC\u05D9 \u05D7\u05D9\u05E8\u05D5\u05DD</div>
        <div class="card-body">
          <div class="accordion" id="procAccordion">
            ${this._emergencyProcedures.map((p, i) => `
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#proc-${p.id}">
                    <i class="bi ${p.icon} me-2 text-${p.color}"></i>
                    <span class="fw-bold">${p.title}</span>
                  </button>
                </h2>
                <div id="proc-${p.id}" class="accordion-collapse collapse" data-bs-parent="#procAccordion">
                  <div class="accordion-body">
                    <ol class="list-group list-group-numbered">
                      ${p.steps.map(s => `<li class="list-group-item border-0 py-2"><i class="bi bi-arrow-left-circle me-2 text-${p.color}"></i>${s}</li>`).join('')}
                    </ol>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Student Emergency Contacts Quick-Lookup -->
      <div class="card mb-4">
        <div class="card-header"><i class="bi bi-person-lines-fill me-2"></i>\u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD — \u05D7\u05D9\u05E4\u05D5\u05E9 \u05DE\u05D4\u05D9\u05E8</div>
        <div class="card-body">
          <div class="search-box mb-3"><i class="bi bi-search"></i><input type="text" class="form-control" id="emg-student-search" placeholder="\u05D7\u05E4\u05E9 \u05DC\u05E4\u05D9 \u05E9\u05DD \u05EA\u05DC\u05DE\u05D9\u05D3..."></div>
          <div id="emg-student-list">
            ${this._renderStudentContacts(data.studentContacts || [], '')}
          </div>
        </div>
      </div>

      <!-- Safety Drill Log -->
      <div class="card mb-4">
        <div class="card-header d-flex justify-content-between align-items-center">
          <span><i class="bi bi-clipboard2-pulse me-2"></i>\u05D9\u05D5\u05DE\u05DF \u05EA\u05E8\u05D2\u05D9\u05DC\u05D9 \u05D1\u05D8\u05D9\u05D7\u05D5\u05EA</span>
          <button class="btn btn-success btn-sm" onclick="Pages.showAddDrillModal()"><i class="bi bi-plus-lg me-1"></i>\u05D4\u05D5\u05E1\u05E3 \u05EA\u05E8\u05D2\u05D9\u05DC</button>
        </div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead class="table-light"><tr>
                <th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05E1\u05D5\u05D2</th><th>\u05DE\u05E9\u05DA (\u05D3\u05E7\u05D5\u05EA)</th><th>\u05DE\u05E9\u05EA\u05EA\u05E4\u05D9\u05DD</th><th>\u05D4\u05E2\u05E8\u05D5\u05EA</th><th></th>
              </tr></thead>
              <tbody id="emg-drill-tbody">
                ${this._renderDrillRows(drills)}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Assembly Points Placeholder -->
      <div class="card mb-4">
        <div class="card-header"><i class="bi bi-geo-alt-fill me-2 text-success"></i>\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA \u05DB\u05D9\u05E0\u05D5\u05E1</div>
        <div class="card-body text-center py-5">
          <i class="bi bi-map display-1 text-muted"></i>
          <p class="text-muted mt-3 fs-5">\u05DE\u05E4\u05EA \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA \u05DB\u05D9\u05E0\u05D5\u05E1 — \u05D9\u05D5\u05E2\u05DC\u05D4 \u05D1\u05E7\u05E8\u05D5\u05D1</p>
          <div class="row g-3 mt-2 justify-content-center">
            <div class="col-auto"><div class="card p-3 text-center border-success border-2"><i class="bi bi-geo-alt-fill text-success fs-3"></i><div class="mt-1 fw-bold">\u05E0\u05E7\u05D5\u05D3\u05D4 \u05D0</div><small class="text-muted">\u05D7\u05E6\u05E8 \u05E7\u05D3\u05DE\u05D9</small></div></div>
            <div class="col-auto"><div class="card p-3 text-center border-primary border-2"><i class="bi bi-geo-alt-fill text-primary fs-3"></i><div class="mt-1 fw-bold">\u05E0\u05E7\u05D5\u05D3\u05D4 \u05D1</div><small class="text-muted">\u05DE\u05D2\u05E8\u05E9 \u05D0\u05D7\u05D5\u05E8\u05D9</small></div></div>
            <div class="col-auto"><div class="card p-3 text-center border-warning border-2"><i class="bi bi-geo-alt-fill text-warning fs-3"></i><div class="mt-1 fw-bold">\u05E0\u05E7\u05D5\u05D3\u05D4 \u05D2</div><small class="text-muted">\u05D7\u05E0\u05D9\u05D9\u05D4 \u05E6\u05D3\u05D3\u05D9\u05EA</small></div></div>
          </div>
        </div>
      </div>

      <!-- Add Drill Modal -->
      <div class="modal fade" id="addDrillModal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
        <div class="modal-header"><h5 class="modal-title"><i class="bi bi-plus-circle me-2"></i>\u05D4\u05D5\u05E1\u05E4\u05EA \u05EA\u05E8\u05D2\u05D9\u05DC</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body">
          <div class="mb-3"><label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA</label><input type="date" class="form-control" id="drill-date" value="${new Date().toISOString().slice(0,10)}"></div>
          <div class="mb-3"><label class="form-label">\u05E1\u05D5\u05D2 \u05EA\u05E8\u05D2\u05D9\u05DC</label>
            <select class="form-select" id="drill-type">
              <option value="\u05E9\u05E8\u05D9\u05E4\u05D4">\u05E9\u05E8\u05D9\u05E4\u05D4</option>
              <option value="\u05E8\u05E2\u05D9\u05D3\u05EA \u05D0\u05D3\u05DE\u05D4">\u05E8\u05E2\u05D9\u05D3\u05EA \u05D0\u05D3\u05DE\u05D4</option>
              <option value="\u05D0\u05D9\u05D5\u05DD \u05D1\u05D9\u05D8\u05D7\u05D5\u05E0\u05D9">\u05D0\u05D9\u05D5\u05DD \u05D1\u05D9\u05D8\u05D7\u05D5\u05E0\u05D9</option>
              <option value="\u05D7\u05D9\u05E8\u05D5\u05DD \u05E8\u05E4\u05D5\u05D0\u05D9">\u05D7\u05D9\u05E8\u05D5\u05DD \u05E8\u05E4\u05D5\u05D0\u05D9</option>
              <option value="\u05E1\u05D2\u05E8">\u05E1\u05D2\u05E8</option>
            </select>
          </div>
          <div class="mb-3"><label class="form-label">\u05DE\u05E9\u05DA (\u05D3\u05E7\u05D5\u05EA)</label><input type="number" class="form-control" id="drill-duration" min="1" value="10"></div>
          <div class="mb-3"><label class="form-label">\u05DE\u05E1\u05E4\u05E8 \u05DE\u05E9\u05EA\u05EA\u05E4\u05D9\u05DD</label><input type="number" class="form-control" id="drill-participants" min="1" value="80"></div>
          <div class="mb-3"><label class="form-label">\u05D4\u05E2\u05E8\u05D5\u05EA</label><textarea class="form-control" id="drill-notes" rows="3"></textarea></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button>
          <button type="button" class="btn btn-success" onclick="Pages.saveDrill()"><i class="bi bi-check-lg me-1"></i>\u05E9\u05DE\u05D5\u05E8</button>
        </div>
      </div></div></div>
    `;
  },

  /* ---------- Init ---------- */
  async emergencyInit() {
    // Try API first, then localStorage, fall back to defaults
    try {
      const apiData = await App.getData('\u05D7\u05D9\u05E8\u05D5\u05DD');
      if (apiData && (apiData.drills || apiData.contacts)) {
        this._emergencySaveData(apiData);
      }
    } catch (e) {
      // Use localStorage/defaults via _emergencyLoadData
    }

    const searchEl = document.getElementById('emg-student-search');
    if (searchEl) {
      searchEl.addEventListener('input', () => {
        const q = searchEl.value.trim();
        const data = this._emergencyLoadData();
        document.getElementById('emg-student-list').innerHTML =
          this._renderStudentContacts(data.studentContacts || [], q);
      });
    }
  },

  /* ---------- Helpers ---------- */
  _renderDrillRows(drills) {
    if (!drills.length) return '<tr><td colspan="6" class="text-center text-muted py-4">\u05D0\u05D9\u05DF \u05EA\u05E8\u05D2\u05D9\u05DC\u05D9\u05DD \u05E8\u05E9\u05D5\u05DE\u05D9\u05DD</td></tr>';
    const typeIcon = {
      '\u05E9\u05E8\u05D9\u05E4\u05D4': 'bi-fire text-danger',
      '\u05E8\u05E2\u05D9\u05D3\u05EA \u05D0\u05D3\u05DE\u05D4': 'bi-tsunami text-warning',
      '\u05D0\u05D9\u05D5\u05DD \u05D1\u05D9\u05D8\u05D7\u05D5\u05E0\u05D9': 'bi-shield-exclamation text-dark',
      '\u05D7\u05D9\u05E8\u05D5\u05DD \u05E8\u05E4\u05D5\u05D0\u05D9': 'bi-heart-pulse text-info',
      '\u05E1\u05D2\u05E8': 'bi-lock-fill text-secondary'
    };
    return [...drills].sort((a, b) => b.date.localeCompare(a.date)).map(d => `
      <tr>
        <td>${d.date}</td>
        <td><i class="bi ${typeIcon[d.type] || 'bi-question-circle'} me-1"></i>${d.type}</td>
        <td>${d.duration}</td>
        <td>${d.participants}</td>
        <td>${d.notes || ''}</td>
        <td><button class="btn btn-outline-danger btn-sm" onclick="Pages.deleteDrill(${d.id})" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button></td>
      </tr>
    `).join('');
  },

  _renderStudentContacts(students, query) {
    const q = (query || '').trim().toLowerCase();
    const filtered = q ? students.filter(s => s.name.toLowerCase().includes(q)) : students;
    if (!filtered.length) return '<div class="text-muted text-center py-3">\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA</div>';
    return `<div class="list-group">${filtered.map(s => `
      <div class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <i class="bi bi-person-fill me-2"></i>
          <span class="fw-bold">${s.name}</span>
          <span class="badge bg-light text-dark ms-2">\u05DB\u05D9\u05EA\u05D4 ${s.class}</span>
        </div>
        <div>
          <small class="text-muted me-2">${s.parent}</small>
          <a href="tel:${s.phone}" class="btn btn-sm btn-outline-success"><i class="bi bi-telephone me-1"></i>${s.phone}</a>
        </div>
      </div>
    `).join('')}</div>`;
  },

  /* ---------- Actions ---------- */
  activateEmergency() {
    if (!confirm('\u05D4\u05D0\u05DD \u05D0\u05EA\u05D4 \u05D1\u05D8\u05D5\u05D7 \u05E9\u05D1\u05E8\u05E6\u05D5\u05E0\u05DA \u05DC\u05D4\u05E4\u05E2\u05D9\u05DC \u05E0\u05D5\u05D4\u05DC \u05D7\u05D9\u05E8\u05D5\u05DD?\n\n\u05E4\u05E2\u05D5\u05DC\u05D4 \u05D6\u05D5 \u05EA\u05E9\u05DC\u05D7 \u05D4\u05EA\u05E8\u05D0\u05D5\u05EA \u05DC\u05DB\u05DC \u05D4\u05E6\u05D5\u05D5\u05EA.')) return;
    Utils.toast('\u05E0\u05D5\u05D4\u05DC \u05D7\u05D9\u05E8\u05D5\u05DD \u05D4\u05D5\u05E4\u05E2\u05DC! \u05D4\u05EA\u05E8\u05D0\u05D5\u05EA \u05E0\u05E9\u05DC\u05D7\u05D5.', 'danger');
  },

  showAddDrillModal() {
    // Reset form
    document.getElementById('drill-date').value = new Date().toISOString().slice(0, 10);
    document.getElementById('drill-type').selectedIndex = 0;
    document.getElementById('drill-duration').value = '10';
    document.getElementById('drill-participants').value = '80';
    document.getElementById('drill-notes').value = '';
    new bootstrap.Modal(document.getElementById('addDrillModal')).show();
  },

  async saveDrill() {
    const date = document.getElementById('drill-date').value;
    const type = document.getElementById('drill-type').value;
    const duration = parseInt(document.getElementById('drill-duration').value) || 0;
    const participants = parseInt(document.getElementById('drill-participants').value) || 0;
    const notes = document.getElementById('drill-notes').value.trim();

    if (!date || !type || !duration) {
      Utils.toast('\u05E0\u05D0 \u05DC\u05DE\u05DC\u05D0 \u05D0\u05EA \u05DB\u05DC \u05D4\u05E9\u05D3\u05D5\u05EA', 'warning');
      return;
    }

    const data = this._emergencyLoadData();
    const maxId = data.drills.reduce((mx, d) => Math.max(mx, d.id || 0), 0);
    const newDrill = { id: maxId + 1, date, type, duration, participants, notes };
    data.drills.push(newDrill);
    this._emergencySaveData(data);

    // Persist to API
    try { await App.apiCall('add', '\u05D7\u05D9\u05E8\u05D5\u05DD', { row: newDrill }); } catch (e) { /* localStorage already saved */ }

    // Close modal
    bootstrap.Modal.getInstance(document.getElementById('addDrillModal'))?.hide();
    Utils.toast('\u05EA\u05E8\u05D2\u05D9\u05DC \u05E0\u05E9\u05DE\u05E8 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4!', 'success');

    // Refresh drill table
    document.getElementById('emg-drill-tbody').innerHTML = this._renderDrillRows(data.drills);
  },

  async deleteDrill(id) {
    if (!confirm('\u05DC\u05DE\u05D7\u05D5\u05E7 \u05EA\u05E8\u05D2\u05D9\u05DC \u05D6\u05D4?')) return;
    const data = this._emergencyLoadData();
    data.drills = data.drills.filter(d => d.id !== id);
    this._emergencySaveData(data);
    try { await App.apiCall('delete', '\u05D7\u05D9\u05E8\u05D5\u05DD', { id }); } catch (e) { /* localStorage already saved */ }
    document.getElementById('emg-drill-tbody').innerHTML = this._renderDrillRows(data.drills);
    Utils.toast('\u05EA\u05E8\u05D2\u05D9\u05DC \u05E0\u05DE\u05D7\u05E7', 'info');
  }
});
