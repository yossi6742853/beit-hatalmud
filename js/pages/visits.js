/* ===== BHT v5.3 — Visits (ביקורי הורים) ===== */
Object.assign(Pages, {
  _visits: [
    { id: 1, parent: 'רחל כהן', student: 'יוסף כהן', type: 'מתוכנן', date: '2026-04-20', time: '10:00', duration: 45, purpose: 'פגישה עם מחנך', notes: 'דנו על התקדמות בלימודים', status: 'הושלם' },
    { id: 2, parent: 'שרה לוי', student: 'משה לוי', type: 'הגעה ספונטנית', date: '2026-04-19', time: '11:30', duration: 20, purpose: 'הבאת מסמכים', notes: 'הביאה אישור רפואי', status: 'הושלם' },
    { id: 3, parent: 'דבורה גולדברג', student: 'אברהם גולדברג', type: 'אסיפת הורים', date: '2026-04-22', time: '09:00', duration: 0, purpose: 'אסיפת הורים כללית', notes: '', status: 'מתוכנן' },
    { id: 4, parent: 'יעל פרידמן', student: 'דוד פרידמן', type: 'מתוכנן', date: '2026-04-17', time: '14:00', duration: 30, purpose: 'דיון על התנהגות', notes: 'סוכם על תוכנית שיפור', status: 'הושלם' },
    { id: 5, parent: 'מירי שפירא', student: 'אליהו שפירא', type: 'הגעה ספונטנית', date: '2026-04-16', time: '08:30', duration: 10, purpose: 'מסירת הודעה', notes: '', status: 'הושלם' },
    { id: 6, parent: 'חנה רוזנברג', student: 'יעקב רוזנברג', type: 'מתוכנן', date: '2026-04-24', time: '10:30', duration: 0, purpose: 'פגישת מעקב', notes: 'המשך לפגישה קודמת', status: 'מתוכנן' },
    { id: 7, parent: 'לאה ברקוביץ', student: 'חיים ברקוביץ', type: 'אסיפת הורים', date: '2026-04-22', time: '09:00', duration: 0, purpose: 'אסיפת הורים כללית', notes: '', status: 'מתוכנן' },
    { id: 8, parent: 'רבקה וייס', student: 'נתנאל וייס', type: 'הגעה ספונטנית', date: '2026-04-21', time: '13:00', duration: 15, purpose: 'שאלה על שכ"ל', notes: 'הופנתה למזכירות', status: 'הושלם' },
    { id: 9, parent: 'אסתר הורביץ', student: 'שמואל הורביץ', type: 'מתוכנן', date: '2026-04-25', time: '11:00', duration: 0, purpose: 'פגישה עם יועץ', notes: '', status: 'מתוכנן' },
    { id: 10, parent: 'שושנה מזרחי', student: 'רפאל מזרחי', type: 'מתוכנן', date: '2026-04-15', time: '09:30', duration: 35, purpose: 'עדכון מצב לימודי', notes: 'שיפור ניכר', status: 'הושלם' }
  ],

  visits() {
    const visits = this._visits;
    const completed = visits.filter(v => v.status === 'הושלם');
    const scheduled = visits.filter(v => v.status === 'מתוכנן');
    const thisMonth = visits.filter(v => v.date >= '2026-04-01' && v.date <= '2026-04-30').length;
    const avgDuration = completed.length ? Math.round(completed.reduce((s, v) => s + v.duration, 0) / completed.length) : 0;
    const typeColors = { 'מתוכנן': 'primary', 'הגעה ספונטנית': 'warning', 'אסיפת הורים': 'info' };
    const statusColors = { 'הושלם': 'success', 'מתוכנן': 'primary', 'בוטל': 'danger' };

    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div><h1><i class="bi bi-person-walking me-2"></i>ביקורי הורים</h1><p class="text-muted mb-0">מעקב ותיאום ביקורי הורים</p></div>
      <button class="btn btn-primary btn-sm" onclick="Pages._visitShowAdd()"><i class="bi bi-plus-lg me-1"></i>תאם ביקור</button>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-primary">${visits.length}</div><small class="text-muted">סה"כ ביקורים</small></div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-success">${thisMonth}</div><small class="text-muted">החודש</small></div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-warning">${scheduled.length}</div><small class="text-muted">מתוכננים קרוב</small></div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-info">${avgDuration} דק'</div><small class="text-muted">משך ממוצע</small></div></div>
    </div>

    <div class="d-flex gap-2 mb-3 flex-wrap">
      <input class="form-control form-control-sm" id="visit-search" placeholder="חיפוש הורה/תלמיד..." style="max-width:220px" oninput="Pages._visitFilter()">
      <select class="form-select form-select-sm" id="visit-type-filter" style="max-width:160px" onchange="Pages._visitFilter()">
        <option value="">כל הסוגים</option><option>מתוכנן</option><option>הגעה ספונטנית</option><option>אסיפת הורים</option>
      </select>
      <select class="form-select form-select-sm" id="visit-status-filter" style="max-width:140px" onchange="Pages._visitFilter()">
        <option value="">כל הסטטוסים</option><option>הושלם</option><option>מתוכנן</option>
      </select>
    </div>

    <ul class="nav nav-tabs mb-3" id="visit-tabs">
      <li class="nav-item"><a class="nav-link active" href="#" onclick="Pages._visitTab('table',event)"><i class="bi bi-table me-1"></i>רשימה</a></li>
      <li class="nav-item"><a class="nav-link" href="#" onclick="Pages._visitTab('calendar',event)"><i class="bi bi-calendar3 me-1"></i>יומן</a></li>
    </ul>

    <!-- Table View -->
    <div id="visit-table-tab">
      <div class="card">
        <div class="table-responsive">
          <table class="table table-bht mb-0">
            <thead><tr><th>תאריך</th><th>שעה</th><th>הורה</th><th>תלמיד</th><th>סוג</th><th>מטרה</th><th>משך</th><th>סטטוס</th><th>הערות</th></tr></thead>
            <tbody id="visit-tbody">
              ${[...visits].sort((a, b) => b.date.localeCompare(a.date)).map(v => `
              <tr class="visit-row" data-type="${v.type}" data-status="${v.status}" data-search="${v.parent} ${v.student} ${v.purpose}">
                <td>${Utils.formatDateShort(v.date)}</td>
                <td>${v.time}</td>
                <td class="fw-bold">${v.parent}</td>
                <td>${v.student}</td>
                <td><span class="badge bg-${typeColors[v.type] || 'secondary'}">${v.type}</span></td>
                <td class="small">${v.purpose}</td>
                <td>${v.duration ? v.duration + ' דק\'' : '-'}</td>
                <td><span class="badge bg-${statusColors[v.status] || 'secondary'}">${v.status}</span></td>
                <td class="small text-muted">${v.notes || '-'}</td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Calendar View -->
    <div id="visit-calendar-tab" style="display:none">
      <div class="card p-3">
        <h5 class="mb-3"><i class="bi bi-calendar3 me-2"></i>יומן ביקורים — ניסן תשפ"ו</h5>
        ${this._visitCalendar(visits)}
      </div>
    </div>

    <!-- Schedule Visit Modal -->
    <div class="modal fade" id="visit-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title"><i class="bi bi-calendar-plus me-2"></i>תיאום ביקור</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <div class="row g-3">
          <div class="col-6"><label class="form-label">שם הורה</label><input class="form-control" id="vf-parent"></div>
          <div class="col-6"><label class="form-label">שם תלמיד</label><input class="form-control" id="vf-student"></div>
          <div class="col-6"><label class="form-label">סוג ביקור</label><select class="form-select" id="vf-type"><option>מתוכנן</option><option>הגעה ספונטנית</option><option>אסיפת הורים</option></select></div>
          <div class="col-6"><label class="form-label">מטרה</label><input class="form-control" id="vf-purpose" placeholder="מטרת הביקור"></div>
          <div class="col-4"><label class="form-label">תאריך</label><input type="date" class="form-control" id="vf-date"></div>
          <div class="col-4"><label class="form-label">שעה</label><input type="time" class="form-control" id="vf-time"></div>
          <div class="col-4"><label class="form-label">משך (דק')</label><input type="number" class="form-control" id="vf-duration" value="30"></div>
          <div class="col-12"><label class="form-label">הערות</label><textarea class="form-control" id="vf-notes" rows="2"></textarea></div>
        </div>
      </div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">ביטול</button><button class="btn btn-primary" onclick="Pages._visitSave()">שמור</button></div>
    </div></div></div>`;
  },

  visitsInit() {},

  _visitCalendar(visits) {
    // Simple week-based calendar for April 2026
    const days = ['א\'', 'ב\'', 'ג\'', 'ד\'', 'ה\'', 'ו\'', 'ש\''];
    const weeks = [
      [null,null,null,'2026-04-01','2026-04-02','2026-04-03','2026-04-04'],
      ['2026-04-05','2026-04-06','2026-04-07','2026-04-08','2026-04-09','2026-04-10','2026-04-11'],
      ['2026-04-12','2026-04-13','2026-04-14','2026-04-15','2026-04-16','2026-04-17','2026-04-18'],
      ['2026-04-19','2026-04-20','2026-04-21','2026-04-22','2026-04-23','2026-04-24','2026-04-25'],
      ['2026-04-26','2026-04-27','2026-04-28','2026-04-29','2026-04-30',null,null]
    ];
    const today = '2026-04-22';
    const typeColors = { 'מתוכנן': 'primary', 'הגעה ספונטנית': 'warning', 'אסיפת הורים': 'info' };

    return `<table class="table table-bordered text-center mb-0">
      <thead><tr>${days.map(d => `<th class="small">${d}</th>`).join('')}</tr></thead>
      <tbody>${weeks.map(week => `<tr>${week.map(day => {
        if (!day) return '<td class="bg-light"></td>';
        const dayNum = parseInt(day.slice(-2));
        const dayVisits = visits.filter(v => v.date === day);
        const isToday = day === today;
        return `<td class="${isToday ? 'bg-primary bg-opacity-10 border-primary' : ''}" style="vertical-align:top;min-height:60px">
          <div class="fw-bold small ${isToday ? 'text-primary' : ''}">${dayNum}</div>
          ${dayVisits.map(v => `<div class="badge bg-${typeColors[v.type] || 'secondary'} d-block mt-1 text-truncate" style="font-size:0.65rem" title="${v.parent} - ${v.purpose}">${v.time} ${v.parent.split(' ')[0]}</div>`).join('')}
        </td>`;
      }).join('')}</tr>`).join('')}</tbody>
    </table>`;
  },

  _visitTab(tab, e) {
    e.preventDefault();
    document.querySelectorAll('#visit-tabs .nav-link').forEach(l => l.classList.remove('active'));
    e.currentTarget.classList.add('active');
    document.getElementById('visit-table-tab').style.display = tab === 'table' ? '' : 'none';
    document.getElementById('visit-calendar-tab').style.display = tab === 'calendar' ? '' : 'none';
  },

  _visitFilter() {
    const q = (document.getElementById('visit-search')?.value || '').toLowerCase();
    const type = document.getElementById('visit-type-filter')?.value || '';
    const status = document.getElementById('visit-status-filter')?.value || '';
    document.querySelectorAll('.visit-row').forEach(row => {
      const matchQ = !q || (row.dataset.search || '').toLowerCase().includes(q);
      const matchType = !type || row.dataset.type === type;
      const matchStatus = !status || row.dataset.status === status;
      row.style.display = matchQ && matchType && matchStatus ? '' : 'none';
    });
  },

  _visitShowAdd() {
    new bootstrap.Modal(document.getElementById('visit-modal')).show();
  },

  _visitSave() {
    const parent = document.getElementById('vf-parent')?.value?.trim();
    const student = document.getElementById('vf-student')?.value?.trim();
    if (!parent || !student) { Utils.toast('יש למלא שם הורה ותלמיד', 'warning'); return; }
    this._visits.push({
      id: this._visits.length + 1, parent, student,
      type: document.getElementById('vf-type').value,
      date: document.getElementById('vf-date')?.value || new Date().toISOString().slice(0, 10),
      time: document.getElementById('vf-time')?.value || '09:00',
      duration: parseInt(document.getElementById('vf-duration')?.value) || 0,
      purpose: document.getElementById('vf-purpose')?.value || '',
      notes: document.getElementById('vf-notes')?.value || '',
      status: 'מתוכנן'
    });
    bootstrap.Modal.getInstance(document.getElementById('visit-modal'))?.hide();
    Utils.toast('ביקור תואם בהצלחה!');
    App.navigate('visits');
  }
});
