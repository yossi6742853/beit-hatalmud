/* ===== BHT v5.3 — Parent Portal (פורטל הורים) ===== */
Object.assign(Pages, {
  _portalParents: [
    { name: 'רחל כהן', student: 'יוסף כהן', phone: '050-1234567', registered: '2026-03-10', lastLogin: '2026-04-22 08:30', active: true },
    { name: 'שרה לוי', student: 'משה לוי', phone: '052-2345678', registered: '2026-03-12', lastLogin: '2026-04-21 14:15', active: true },
    { name: 'דבורה גולדברג', student: 'אברהם גולדברג', phone: '054-3456789', registered: '2026-03-15', lastLogin: '2026-04-22 09:00', active: true },
    { name: 'יעל פרידמן', student: 'דוד פרידמן', phone: '050-4567890', registered: '2026-03-18', lastLogin: '2026-04-20 16:45', active: true },
    { name: 'מירי שפירא', student: 'אליהו שפירא', phone: '053-5678901', registered: '2026-03-20', lastLogin: '2026-04-19 10:00', active: true },
    { name: 'חנה רוזנברג', student: 'יעקב רוזנברג', phone: '052-6789012', registered: '2026-04-01', lastLogin: '2026-04-18 11:30', active: false },
    { name: 'לאה ברקוביץ', student: 'חיים ברקוביץ', phone: '050-7890123', registered: '2026-04-05', lastLogin: '2026-04-22 07:45', active: true },
    { name: 'רבקה וייס', student: 'נתנאל וייס', phone: '054-8901234', registered: '2026-04-08', lastLogin: '2026-04-17 09:20', active: false },
    { name: 'אסתר הורביץ', student: 'שמואל הורביץ', phone: '053-9012345', registered: '2026-04-10', lastLogin: '2026-04-21 13:00', active: true },
    { name: 'שושנה מזרחי', student: 'רפאל מזרחי', phone: '050-0123456', registered: '2026-04-12', lastLogin: '2026-04-16 15:30', active: false }
  ],

  parentportal() {
    const parents = this._portalParents;
    const registered = parents.length;
    const activeWeek = parents.filter(p => p.lastLogin >= '2026-04-17').length;
    const activeToday = parents.filter(p => p.lastLogin.startsWith('2026-04-22')).length;
    const regLink = location.origin + location.pathname.replace('index.html', '') + 'form.html';

    const accessFeatures = [
      { icon: 'bi-calendar-check', title: 'נוכחות', desc: 'צפייה בנוכחות הילד' },
      { icon: 'bi-journal-bookmark', title: 'ציונים', desc: 'ציונים והתקדמות לימודית' },
      { icon: 'bi-emoji-smile', title: 'התנהגות', desc: 'דוחות התנהגות ומשוב' },
      { icon: 'bi-chat-dots', title: 'תקשורת', desc: 'הודעות מהצוות' },
      { icon: 'bi-file-earmark', title: 'מסמכים', desc: 'טפסים ואישורים' },
      { icon: 'bi-credit-card', title: 'תשלומים', desc: 'מצב שכר לימוד' }
    ];

    return `
    <div class="page-header">
      <h1><i class="bi bi-people-fill me-2"></i>פורטל הורים</h1>
      <p class="text-muted mb-0">ממשק גישה והרשמת הורים</p>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-primary">${registered}</div><small class="text-muted">הורים רשומים</small></div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-success">${activeWeek}</div><small class="text-muted">פעילים השבוע</small></div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-info">${activeToday}</div><small class="text-muted">פעילים היום</small></div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-warning">${Math.round(activeWeek / registered * 100)}%</div><small class="text-muted">אחוז פעילות</small></div></div>
    </div>

    <div class="row g-3 mb-3">
      <!-- Registration Link -->
      <div class="col-lg-6">
        <div class="card p-4 h-100">
          <h5 class="fw-bold mb-3"><i class="bi bi-link-45deg me-2 text-primary"></i>קישור לטופס הרשמה</h5>
          <p class="text-muted">שתף קישור זה עם הורים חדשים:</p>
          <div class="input-group mb-3">
            <input class="form-control" id="reg-link" value="${regLink}" readonly dir="ltr">
            <button class="btn btn-primary" onclick="Utils.copyText(document.getElementById('reg-link').value);Utils.toast('הקישור הועתק!')"><i class="bi bi-clipboard me-1"></i>העתק</button>
          </div>
          <div class="d-flex gap-2 flex-wrap">
            <button class="btn btn-success btn-sm" onclick="window.open('https://wa.me/?text='+encodeURIComponent('שלום, הנה קישור לטופס ההרשמה לבית התלמוד: '+document.getElementById('reg-link').value))"><i class="bi bi-whatsapp me-1"></i>שלח בWhatsApp</button>
            <button class="btn btn-outline-primary btn-sm" onclick="Utils.toast('הקישור נשלח ב-SMS','info')"><i class="bi bi-phone me-1"></i>שלח SMS</button>
          </div>
        </div>
      </div>

      <!-- QR Code -->
      <div class="col-lg-6">
        <div class="card p-4 h-100">
          <h5 class="fw-bold mb-3"><i class="bi bi-qr-code me-2"></i>QR Code לטופס</h5>
          <p class="text-muted">הדפס והדבק בכניסה למוסד:</p>
          <div class="text-center p-4 bg-light rounded" style="max-width:200px;margin:0 auto">
            <div class="border border-2 border-dark p-3 rounded">
              <div class="d-flex flex-wrap justify-content-center gap-1" style="width:120px;margin:0 auto">
                ${Array.from({length: 64}, () => `<div style="width:12px;height:12px;background:${Math.random()>0.4?'#000':'#fff'}"></div>`).join('')}
              </div>
            </div>
            <small class="text-muted d-block mt-2">סרוק לטופס הרשמה</small>
          </div>
          <div class="text-center mt-3">
            <button class="btn btn-outline-secondary btn-sm" onclick="Utils.toast('הדפסת QR...','info')"><i class="bi bi-printer me-1"></i>הדפס</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Parent Access Overview -->
    <div class="card p-4 mb-3">
      <h5 class="fw-bold mb-3"><i class="bi bi-shield-check me-2 text-success"></i>מה ההורים יכולים לראות?</h5>
      <div class="row g-3">
        ${accessFeatures.map(f => `
        <div class="col-md-4 col-lg-2">
          <div class="text-center p-3 bg-light rounded h-100">
            <i class="bi ${f.icon} text-primary d-block mb-2" style="font-size:2rem"></i>
            <div class="fw-bold small">${f.title}</div>
            <div class="small text-muted">${f.desc}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>

    <!-- Recent Logins -->
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0"><i class="bi bi-clock-history me-2"></i>כניסות אחרונות</h5>
        <input class="form-control form-control-sm" id="portal-search" placeholder="חיפוש..." style="max-width:200px" oninput="Pages._portalFilter()">
      </div>
      <div class="table-responsive">
        <table class="table table-bht mb-0">
          <thead><tr><th>הורה</th><th>תלמיד</th><th>טלפון</th><th>נרשם</th><th>כניסה אחרונה</th><th>סטטוס</th></tr></thead>
          <tbody id="portal-tbody">
            ${[...parents].sort((a, b) => b.lastLogin.localeCompare(a.lastLogin)).map(p => `
            <tr class="portal-row" data-search="${p.name} ${p.student} ${p.phone}">
              <td><div class="d-flex align-items-center gap-2">${Utils.avatarHTML(p.name, 'xs')}<span class="fw-bold">${p.name}</span></div></td>
              <td>${p.student}</td>
              <td dir="ltr" class="text-muted">${p.phone}</td>
              <td>${Utils.formatDateShort(p.registered)}</td>
              <td class="small">${p.lastLogin}</td>
              <td><span class="badge bg-${p.active ? 'success' : 'secondary'}"><i class="bi bi-circle-fill me-1" style="font-size:0.5rem"></i>${p.active ? 'פעיל' : 'לא פעיל'}</span></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
  },

  parentportalInit() {},

  _portalFilter() {
    const q = (document.getElementById('portal-search')?.value || '').toLowerCase();
    document.querySelectorAll('.portal-row').forEach(row => {
      row.style.display = !q || (row.dataset.search || '').toLowerCase().includes(q) ? '' : 'none';
    });
  }
});
