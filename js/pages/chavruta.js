/* ===== BHT v5.3 — Chavruta (חברותות) ===== */
Object.assign(Pages, {
  _chavPairs: [
    { id: 1, s1: 'יוסף כהן', s2: 'משה לוי', subject: 'גמרא', level: 'מתקדם', schedule: 'א-ג 09:00-10:30', status: 'פעיל', sessions: 24, lastSession: '2026-04-21', notes: 'מסכת בבא מציעא פרק ב' },
    { id: 2, s1: 'אברהם גולדברג', s2: 'דוד פרידמן', subject: 'הלכה', level: 'בינוני', schedule: 'ב-ד 11:00-12:00', status: 'פעיל', sessions: 18, lastSession: '2026-04-22', notes: 'הלכות שבת' },
    { id: 3, s1: 'אליהו שפירא', s2: 'יעקב רוזנברג', subject: 'משנה', level: 'מתחיל', schedule: 'א-ה 08:00-09:00', status: 'פעיל', sessions: 31, lastSession: '2026-04-22', notes: 'מסכת ברכות' },
    { id: 4, s1: 'חיים ברקוביץ', s2: 'נתנאל וייס', subject: 'חומש', level: 'מתקדם', schedule: 'ג-ה 14:00-15:30', status: 'פעיל', sessions: 12, lastSession: '2026-04-20', notes: 'פרשת השבוע עם רש"י' },
    { id: 5, s1: 'שמואל הורביץ', s2: 'רפאל מזרחי', subject: 'גמרא', level: 'בינוני', schedule: 'א-ד 10:00-11:30', status: 'פעיל', sessions: 20, lastSession: '2026-04-21', notes: 'מסכת שבת' },
    { id: 6, s1: 'מנחם שטרן', s2: 'אהרן פישר', subject: 'הלכה', level: 'מתקדם', schedule: 'ב-ה 13:00-14:00', status: 'מושהה', sessions: 8, lastSession: '2026-04-10', notes: 'הלכות ברכות' },
    { id: 7, s1: 'ישראל קליין', s2: 'בנימין אדלר', subject: 'משנה', level: 'מתחיל', schedule: 'א-ג 15:00-16:00', status: 'פעיל', sessions: 15, lastSession: '2026-04-22', notes: 'מסכת פאה' },
    { id: 8, s1: 'צבי הירש', s2: 'גדליה שוורץ', subject: 'גמרא', level: 'בינוני', schedule: 'ב-ד 09:00-10:30', status: 'לא פעיל', sessions: 5, lastSession: '2026-03-28', notes: 'הופסק זמנית' }
  ],
  _chavSessionLog: [
    { pairId: 1, date: '2026-04-21', duration: 90, notes: 'סיימו סוגיא של שנים אוחזין' },
    { pairId: 2, date: '2026-04-22', duration: 60, notes: 'הלכות הדלקת נרות' },
    { pairId: 3, date: '2026-04-22', duration: 60, notes: 'פרק ג משנה ה-ח' },
    { pairId: 5, date: '2026-04-21', duration: 90, notes: 'דף כ"ג עמוד א' },
    { pairId: 7, date: '2026-04-22', duration: 60, notes: 'משנה ד-ו' },
    { pairId: 4, date: '2026-04-20', duration: 90, notes: 'פרשת אחרי מות' },
    { pairId: 1, date: '2026-04-19', duration: 90, notes: 'חזרה על דף ח' },
    { pairId: 3, date: '2026-04-21', duration: 60, notes: 'פרק ג משנה א-ד' }
  ],

  chavruta() {
    const pairs = this._chavPairs;
    const active = pairs.filter(p => p.status === 'פעיל').length;
    const paused = pairs.filter(p => p.status === 'מושהה').length;
    const weekSessions = this._chavSessionLog.filter(s => s.date >= '2026-04-17').length;
    const weekHours = Math.round(this._chavSessionLog.filter(s => s.date >= '2026-04-17').reduce((sum, s) => sum + s.duration, 0) / 60 * 10) / 10;
    const subjects = ['גמרא', 'הלכה', 'משנה', 'חומש'];
    const levels = ['מתחיל', 'בינוני', 'מתקדם'];
    const statusColors = { 'פעיל': 'success', 'מושהה': 'warning', 'לא פעיל': 'secondary' };

    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div><h1><i class="bi bi-person-hearts me-2"></i>חברותות</h1><p class="text-muted mb-0">שיבוץ וניהול חברותות לימוד</p></div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-info btn-sm" onclick="Pages._chavSuggest()"><i class="bi bi-lightbulb me-1"></i>הצע שיבוץ</button>
        <button class="btn btn-primary btn-sm" onclick="Pages._chavShowAdd()"><i class="bi bi-plus-lg me-1"></i>חברותא חדשה</button>
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-primary">${pairs.length}</div><small class="text-muted">סה"כ חברותות</small></div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-success">${active}</div><small class="text-muted">פעילות</small></div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-info">${weekSessions}</div><small class="text-muted">מפגשים השבוע</small></div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-warning">${weekHours}</div><small class="text-muted">שעות השבוע</small></div></div>
    </div>

    <div class="d-flex gap-2 mb-3 flex-wrap">
      <input class="form-control form-control-sm" id="chav-search" placeholder="חיפוש..." style="max-width:220px" oninput="Pages._chavFilter()">
      <select class="form-select form-select-sm" id="chav-subj-filter" style="max-width:150px" onchange="Pages._chavFilter()">
        <option value="">כל הנושאים</option>${subjects.map(s => `<option>${s}</option>`).join('')}
      </select>
      <select class="form-select form-select-sm" id="chav-status-filter" style="max-width:140px" onchange="Pages._chavFilter()">
        <option value="">כל הסטטוסים</option><option>פעיל</option><option>מושהה</option><option>לא פעיל</option>
      </select>
    </div>

    <ul class="nav nav-tabs mb-3" id="chav-tabs">
      <li class="nav-item"><a class="nav-link active" href="#" onclick="Pages._chavTab('pairs',event)"><i class="bi bi-people me-1"></i>חברותות</a></li>
      <li class="nav-item"><a class="nav-link" href="#" onclick="Pages._chavTab('log',event)"><i class="bi bi-journal-text me-1"></i>יומן מפגשים</a></li>
    </ul>

    <div id="chav-pairs-tab">
      <div class="row g-3" id="chav-cards">
        ${pairs.map(p => `
        <div class="col-md-6 chav-card" data-subject="${p.subject}" data-status="${p.status}" data-search="${p.s1} ${p.s2} ${p.subject}">
          <div class="card p-3 h-100">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <span class="badge bg-${statusColors[p.status]}">${p.status}</span>
              <div class="d-flex gap-1">
                <span class="badge bg-primary-subtle text-primary">${p.subject}</span>
                <span class="badge bg-info-subtle text-info">${p.level}</span>
              </div>
            </div>
            <div class="d-flex align-items-center gap-3 mb-3">
              <div class="text-center">
                ${Utils.avatarHTML(p.s1, 'sm')}
                <div class="small fw-bold mt-1">${p.s1}</div>
              </div>
              <div class="text-center flex-shrink-0">
                <i class="bi bi-arrow-left-right text-primary fs-5"></i>
              </div>
              <div class="text-center">
                ${Utils.avatarHTML(p.s2, 'sm')}
                <div class="small fw-bold mt-1">${p.s2}</div>
              </div>
            </div>
            <div class="small text-muted mb-1"><i class="bi bi-clock me-1"></i>${p.schedule}</div>
            <div class="small text-muted mb-1"><i class="bi bi-journal me-1"></i>${p.notes}</div>
            <div class="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
              <span class="small text-muted">${p.sessions} מפגשים</span>
              <span class="small text-muted">אחרון: ${Utils.formatDateShort(p.lastSession)}</span>
            </div>
          </div>
        </div>`).join('')}
      </div>
    </div>

    <div id="chav-log-tab" style="display:none">
      <div class="card">
        <table class="table table-bht mb-0">
          <thead><tr><th>תאריך</th><th>חברותא</th><th>משך (דק')</th><th>הערות</th></tr></thead>
          <tbody>
            ${this._chavSessionLog.sort((a, b) => b.date.localeCompare(a.date)).map(s => {
              const pair = pairs.find(p => p.id === s.pairId);
              return `<tr><td>${Utils.formatDateShort(s.date)}</td><td class="fw-bold">${pair ? pair.s1 + ' + ' + pair.s2 : '?'}</td><td>${s.duration}</td><td class="small">${s.notes}</td></tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div class="modal fade" id="chav-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title"><i class="bi bi-person-hearts me-2"></i>חברותא חדשה</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <div class="row g-3">
          <div class="col-6"><label class="form-label">תלמיד 1</label><input class="form-control" id="chf-s1"></div>
          <div class="col-6"><label class="form-label">תלמיד 2</label><input class="form-control" id="chf-s2"></div>
          <div class="col-6"><label class="form-label">נושא</label><select class="form-select" id="chf-subject">${subjects.map(s => `<option>${s}</option>`).join('')}</select></div>
          <div class="col-6"><label class="form-label">רמה</label><select class="form-select" id="chf-level">${levels.map(l => `<option>${l}</option>`).join('')}</select></div>
          <div class="col-12"><label class="form-label">לוח זמנים</label><input class="form-control" id="chf-schedule" placeholder="לדוגמא: א-ג 09:00-10:30"></div>
          <div class="col-12"><label class="form-label">הערות</label><input class="form-control" id="chf-notes"></div>
        </div>
      </div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">ביטול</button><button class="btn btn-primary" onclick="Pages._chavSave()">שמור</button></div>
    </div></div></div>`;
  },

  chavrutaInit() {},

  _chavTab(tab, e) {
    e.preventDefault();
    document.querySelectorAll('#chav-tabs .nav-link').forEach(l => l.classList.remove('active'));
    e.currentTarget.classList.add('active');
    document.getElementById('chav-pairs-tab').style.display = tab === 'pairs' ? '' : 'none';
    document.getElementById('chav-log-tab').style.display = tab === 'log' ? '' : 'none';
  },

  _chavFilter() {
    const q = (document.getElementById('chav-search')?.value || '').toLowerCase();
    const subj = document.getElementById('chav-subj-filter')?.value || '';
    const stat = document.getElementById('chav-status-filter')?.value || '';
    document.querySelectorAll('.chav-card').forEach(card => {
      const matchSearch = !q || (card.dataset.search || '').toLowerCase().includes(q);
      const matchSubj = !subj || card.dataset.subject === subj;
      const matchStat = !stat || card.dataset.status === stat;
      card.style.display = matchSearch && matchSubj && matchStat ? '' : 'none';
    });
  },

  _chavShowAdd() {
    new bootstrap.Modal(document.getElementById('chav-modal')).show();
  },

  _chavSave() {
    const s1 = document.getElementById('chf-s1')?.value?.trim();
    const s2 = document.getElementById('chf-s2')?.value?.trim();
    if (!s1 || !s2) { Utils.toast('יש למלא שני תלמידים', 'warning'); return; }
    this._chavPairs.push({
      id: this._chavPairs.length + 1, s1, s2,
      subject: document.getElementById('chf-subject').value,
      level: document.getElementById('chf-level').value,
      schedule: document.getElementById('chf-schedule')?.value || '',
      status: 'פעיל', sessions: 0, lastSession: '-',
      notes: document.getElementById('chf-notes')?.value || ''
    });
    bootstrap.Modal.getInstance(document.getElementById('chav-modal'))?.hide();
    Utils.toast('חברותא נוספה בהצלחה!');
    App.navigate('chavruta');
  },

  _chavSuggest() {
    Utils.toast('מנתח התאמות לפי רמה ונושא...', 'info');
    setTimeout(() => {
      Utils.toast('הצעה: שמואל הורביץ + מנחם שטרן — גמרא רמה בינוני-מתקדם', 'success');
    }, 1000);
  }
});
