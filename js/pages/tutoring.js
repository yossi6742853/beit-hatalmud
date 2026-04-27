/* ===== BHT v5.3 — Tutoring (שיעורי עזר) ===== */
Object.assign(Pages, {
  _tutors: [
    { id: 1, name: 'הרב אברהם כהן', subjects: ['גמרא', 'הלכה'], rate: 80, availability: 'א-ה 8:00-16:00', rating: 5, phone: '050-1234567', bio: 'מלמד מנוסה עם 15 שנות ניסיון בהוראת גמרא', paid: 960, owed: 240 },
    { id: 2, name: 'הרב משה לוי', subjects: ['חומש', 'נ"ך'], rate: 70, availability: 'א-ד 9:00-14:00', rating: 4.5, phone: '050-2345678', bio: 'מומחה בהוראת תנ"ך לכל הגילאים', paid: 560, owed: 140 },
    { id: 3, name: 'הרב דוד פרידמן', subjects: ['מתמטיקה', 'אנגלית'], rate: 90, availability: 'ב-ה 10:00-18:00', rating: 4.8, phone: '050-3456789', bio: 'תואר ראשון במתמטיקה, מתמחה בהכנה לבגרויות', paid: 810, owed: 270 },
    { id: 4, name: 'הרב אליהו שפירא', subjects: ['גמרא', 'משנה'], rate: 85, availability: 'א-ו 8:00-20:00', rating: 4.7, phone: '050-4567890', bio: 'ראש כולל לשעבר, בקיא בש"ס', paid: 680, owed: 340 },
    { id: 5, name: 'הרב יעקב רוזנברג', subjects: ['חומש', 'הלכה', 'מוסר'], rate: 75, availability: 'א-ג 12:00-17:00', rating: 4.3, phone: '050-5678901', bio: 'משפיע רוחני ומלמד ותיק', paid: 450, owed: 150 },
    { id: 6, name: 'הרב שמעון ברקוביץ', subjects: ['מתמטיקה', 'פיזיקה', 'מחשבים'], rate: 95, availability: 'ב-ה 14:00-20:00', rating: 4.9, phone: '050-6789012', bio: 'מהנדס תוכנה לשעבר, מלמד מדעים', paid: 570, owed: 380 }
  ],

  _tutorSessions: [

    { id: 1, tutorId: 1, student: 'יוסף כהן', subject: 'גמרא', date: '2026-04-22', time: '09:00', duration: 1.5, rate: 80, status: 'completed', notes: 'סוגיא דאין מעמידין', feedback: 5 },
    { id: 2, tutorId: 3, student: 'משה לוי', subject: 'מתמטיקה', date: '2026-04-22', time: '10:00', duration: 1, rate: 90, status: 'completed', notes: 'משוואות ריבועיות', feedback: 4 },
    { id: 3, tutorId: 2, student: 'אברהם גולדברג', subject: 'חומש', date: '2026-04-21', time: '11:00', duration: 1, rate: 70, status: 'completed', notes: 'פרשת שמיני', feedback: 5 }
  ],

  _tutorNextId: 21,
  _tutorViewMode: 'all',

  tutoring() {
    const tutors = this._tutors;
    const sessions = this._tutorSessions;
    const today = Utils.todayISO();

    // Calculate tutor stats
    tutors.forEach(t => {
      const ts = sessions.filter(s => s.tutorId === t.id);
      t.sessions = ts.length;
      t.hours = ts.reduce((sum, s) => sum + s.duration, 0);
      t.avgFeedback = ts.filter(s => s.feedback > 0).length > 0 ? (ts.filter(s => s.feedback > 0).reduce((sum, s) => sum + s.feedback, 0) / ts.filter(s => s.feedback > 0).length).toFixed(1) : '-';
    });

    // Monthly stats
    const now = new Date();
    const monthPrefix = now.toISOString().slice(0, 7);
    const monthSessions = sessions.filter(s => s.date.startsWith(monthPrefix));
    const totalSessions = sessions.length;
    const completedSessions = sessions.filter(s => s.status === 'completed').length;
    const scheduledSessions = sessions.filter(s => s.status === 'scheduled').length;
    const monthHours = monthSessions.reduce((s, x) => s + x.duration, 0);
    const activeTutors = tutors.filter(t => sessions.some(s => s.tutorId === t.id)).length;
    const totalCost = monthSessions.reduce((s, x) => s + (x.duration * x.rate), 0);
    const avgRating = sessions.filter(s => s.feedback > 0).length > 0 ? (sessions.filter(s => s.feedback > 0).reduce((s, x) => s + x.feedback, 0) / sessions.filter(s => s.feedback > 0).length).toFixed(1) : '-';
    const totalOwed = tutors.reduce((s, t) => s + t.owed, 0);
    const totalPaid = tutors.reduce((s, t) => s + t.paid, 0);

    const statusMap = { completed: { label: 'הושלם', color: 'success', icon: 'bi-check-circle' }, scheduled: { label: 'מתוכנן', color: 'primary', icon: 'bi-clock' }, cancelled: { label: 'בוטל', color: 'danger', icon: 'bi-x-circle' } };

    // Stars helper
    const stars = (rating) => {
      let html = '';
      for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) html += '<i class="bi bi-star-fill text-warning"></i>';
        else if (i - 0.5 <= rating) html += '<i class="bi bi-star-half text-warning"></i>';
        else html += '<i class="bi bi-star text-muted"></i>';
      }
      return html;
    };

    // Weekly calendar data
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    const weekDays = [];
    const dayNames = ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'שבת'];
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + i);
      weekDays.push({ date: d.toISOString().slice(0, 10), name: dayNames[i], day: d.getDate(), isToday: d.toISOString().slice(0, 10) === today });
    }
    const calHours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

    // Subject colors
    const subjectColors = { 'גמרא': '#2563eb', 'הלכה': '#16a34a', 'חומש': '#9333ea', 'משנה': '#f59e0b', 'נ"ך': '#06b6d4', 'מתמטיקה': '#ef4444', 'אנגלית': '#ec4899', 'מוסר': '#8b5cf6', 'מחשבים': '#14b8a6', 'פיזיקה': '#f97316' };

    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div><h1><i class="bi bi-person-workspace me-2"></i>שיעורי עזר</h1><p class="text-muted mb-0">ניהול שיעורים פרטיים, מתגברים ועלויות</p></div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-info btn-sm" onclick="Pages._tutorExport()"><i class="bi bi-download me-1"></i>ייצוא</button>
        <button class="btn btn-primary btn-sm" onclick="Pages._tutorShowAdd()"><i class="bi bi-plus-lg me-1"></i>שיעור חדש</button>
      </div>
    </div>

    <!-- Stats -->
    <div class="row g-3 mb-3">
      <div class="col-6 col-md-2"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-primary">${totalSessions}</div><small class="text-muted">סה"כ שיעורים</small></div></div>
      <div class="col-6 col-md-2"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-info">${monthHours}</div><small class="text-muted">שעות החודש</small></div></div>
      <div class="col-6 col-md-2"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-success">${activeTutors}/${tutors.length}</div><small class="text-muted">מתגברים פעילים</small></div></div>
      <div class="col-6 col-md-2"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-warning">${totalCost.toLocaleString()} \u20AA</div><small class="text-muted">עלות החודש</small></div></div>
      <div class="col-6 col-md-2"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-danger">${totalOwed.toLocaleString()} \u20AA</div><small class="text-muted">חוב למתגברים</small></div></div>
      <div class="col-6 col-md-2"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-secondary">${avgRating} <i class="bi bi-star-fill text-warning fs-5"></i></div><small class="text-muted">דירוג ממוצע</small></div></div>
    </div>

    <!-- Tutor Profile Cards -->
    <h5 class="fw-bold mb-3"><i class="bi bi-people me-2"></i>מתגברים</h5>
    <div class="row g-3 mb-4">
      ${tutors.map(t => {
        const tMonthSessions = monthSessions.filter(s => s.tutorId === t.id);
        const tMonthHours = tMonthSessions.reduce((s, x) => s + x.duration, 0);
        const tMonthCost = tMonthSessions.reduce((s, x) => s + (x.duration * x.rate), 0);
        const completedByTutor = sessions.filter(s => s.tutorId === t.id && s.status === 'completed').length;
        const scheduledByTutor = sessions.filter(s => s.tutorId === t.id && s.status === 'scheduled').length;
        return `
        <div class="col-md-6 col-lg-4">
          <div class="card h-100 hover-lift">
            <div class="card-body">
              <div class="d-flex align-items-center gap-3 mb-3">
                <div class="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center position-relative" style="width:56px;height:56px">
                  <span class="fw-bold text-primary fs-5">${t.name.split(' ').slice(-1)[0].substring(0, 2)}</span>
                  <span class="position-absolute bottom-0 end-0 bg-success rounded-circle border border-2 border-white" style="width:12px;height:12px" title="פעיל"></span>
                </div>
                <div class="flex-grow-1">
                  <h6 class="fw-bold mb-0">${t.name}</h6>
                  <div class="small">${stars(t.rating)} <span class="text-muted ms-1">${t.rating}</span></div>
                  <div class="small text-muted"><i class="bi bi-telephone me-1"></i>${t.phone}</div>
                </div>
              </div>

              <p class="small text-muted mb-2" style="font-size:0.8rem">${t.bio}</p>

              <div class="d-flex flex-wrap gap-1 mb-2">
                ${t.subjects.map(s => `<span class="badge" style="background:${subjectColors[s] || '#6b7280'}20;color:${subjectColors[s] || '#6b7280'}">${s}</span>`).join('')}
              </div>
              <div class="small text-muted mb-2"><i class="bi bi-clock me-1"></i>${t.availability}</div>

              <div class="border-top pt-2 mt-2">
                <div class="row g-1 text-center small">
                  <div class="col-3"><strong class="text-primary">${t.rate} \u20AA</strong><br><span class="text-muted" style="font-size:0.7rem">לשעה</span></div>
                  <div class="col-3"><strong>${tMonthSessions.length}</strong><br><span class="text-muted" style="font-size:0.7rem">החודש</span></div>
                  <div class="col-3"><strong>${tMonthHours}</strong><br><span class="text-muted" style="font-size:0.7rem">שעות</span></div>
                  <div class="col-3"><strong>${tMonthCost.toLocaleString()}</strong><br><span class="text-muted" style="font-size:0.7rem">\u20AA</span></div>
                </div>
              </div>

              <!-- Payment status -->
              <div class="mt-2 pt-2 border-top">
                <div class="d-flex justify-content-between small mb-1">
                  <span class="text-muted">תשלום</span>
                  <span>${t.owed > 0 ? `<span class="text-danger fw-bold">${t.owed} \u20AA חוב</span>` : '<span class="text-success">שולם</span>'}</span>
                </div>
                <div class="progress" style="height:6px">
                  <div class="progress-bar bg-success" style="width:${Math.round(t.paid / (t.paid + t.owed) * 100)}%"></div>
                  <div class="progress-bar bg-danger" style="width:${Math.round(t.owed / (t.paid + t.owed) * 100)}%"></div>
                </div>
                <div class="d-flex justify-content-between" style="font-size:0.65rem">
                  <span class="text-success">שולם: ${t.paid} \u20AA</span>
                  <span class="text-danger">חוב: ${t.owed} \u20AA</span>
                </div>
              </div>

              <div class="d-flex gap-1 mt-2">
                <button class="btn btn-outline-primary btn-sm flex-grow-1" onclick="Pages._tutorShowAdd(${t.id})"><i class="bi bi-plus me-1"></i>שיעור</button>
                <button class="btn btn-outline-success btn-sm" onclick="Pages._tutorPay(${t.id})" title="תשלום"><i class="bi bi-cash-coin"></i></button>
              </div>
            </div>
          </div>
        </div>`;
      }).join('')}
    </div>

    <!-- Weekly Calendar -->
    <h5 class="fw-bold mb-3"><i class="bi bi-calendar-week me-2"></i>לוח שבועי</h5>
    <div class="card mb-4">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-bordered table-sm mb-0 text-center" style="table-layout:fixed">
            <thead class="table-light">
              <tr>
                <th style="width:70px">שעה</th>
                ${weekDays.map(d => `<th class="${d.isToday ? 'bg-primary bg-opacity-10' : ''}">${d.name}<br><small>${d.day}</small></th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${calHours.map(h => `
                <tr>
                  <td class="fw-bold small text-muted">${h}</td>
                  ${weekDays.map(d => {
                    const slot = sessions.filter(s => s.date === d.date && s.time === h);
                    if (slot.length) {
                      return `<td class="p-1">${slot.map(s => {
                        const tutor = tutors.find(t => t.id === s.tutorId);
                        const color = subjectColors[s.subject] || '#6b7280';
                        return `<div class="badge w-100 text-truncate" style="background:${color};font-size:0.6rem" title="${tutor ? tutor.name : ''}: ${s.student} — ${s.subject}">${s.student.split(' ')[0]}</div>`;
                      }).join('')}</td>`;
                    }
                    return `<td class="${d.isToday ? 'bg-light' : ''}"></td>`;
                  }).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Monthly Summary per Tutor -->
    <h5 class="fw-bold mb-3"><i class="bi bi-bar-chart me-2"></i>סיכום חודשי</h5>
    <div class="card mb-4">
      <div class="card-body p-3">
        <!-- Chart placeholder -->
        <div class="row g-3 mb-3">
          ${tutors.map(t => {
            const ms = monthSessions.filter(s => s.tutorId === t.id);
            const mh = ms.reduce((s, x) => s + x.duration, 0);
            const mc = ms.reduce((s, x) => s + (x.duration * x.rate), 0);
            const maxHours = Math.max(...tutors.map(t2 => monthSessions.filter(s2 => s2.tutorId === t2.id).reduce((s, x) => s + x.duration, 0)), 1);
            const pct = Math.round((mh / maxHours) * 100);
            return `
            <div class="col-md-6">
              <div class="d-flex align-items-center gap-2 mb-1">
                <span class="fw-bold small" style="min-width:120px">${t.name.split(' ').slice(-1)[0]}</span>
                <div class="flex-grow-1">
                  <div class="progress" style="height:24px">
                    <div class="progress-bar bg-primary" style="width:${pct}%">
                      <span class="small">${mh}ש | ${mc}\u20AA</span>
                    </div>
                  </div>
                </div>
                <span class="badge bg-light text-dark border small">${ms.length} שיעורים</span>
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-sm table-hover align-middle mb-0">
          <thead class="table-light"><tr><th>מתגבר</th><th>שיעורים</th><th>שעות</th><th>עלות</th><th>דירוג</th><th>שולם</th><th>חוב</th><th>נתח</th></tr></thead>
          <tbody>
            ${tutors.map(t => {
              const ms = monthSessions.filter(s => s.tutorId === t.id);
              const mh = ms.reduce((s, x) => s + x.duration, 0);
              const mc = ms.reduce((s, x) => s + (x.duration * x.rate), 0);
              const pct = monthHours > 0 ? Math.round((mh / monthHours) * 100) : 0;
              return `<tr>
                <td class="fw-bold">${t.name}</td>
                <td>${ms.length}</td>
                <td>${mh}</td>
                <td>${mc.toLocaleString()} \u20AA</td>
                <td>${stars(t.rating)}</td>
                <td class="text-success">${t.paid.toLocaleString()} \u20AA</td>
                <td class="text-danger">${t.owed.toLocaleString()} \u20AA</td>
                <td><div class="progress" style="height:18px"><div class="progress-bar" style="width:${pct}%">${pct}%</div></div></td>
              </tr>`;
            }).join('')}
            <tr class="table-light fw-bold">
              <td>סה"כ</td>
              <td>${monthSessions.length}</td>
              <td>${monthHours}</td>
              <td>${totalCost.toLocaleString()} \u20AA</td>
              <td>${avgRating} <i class="bi bi-star-fill text-warning"></i></td>
              <td class="text-success">${totalPaid.toLocaleString()} \u20AA</td>
              <td class="text-danger">${totalOwed.toLocaleString()} \u20AA</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Sessions Table -->
    <h5 class="fw-bold mb-3"><i class="bi bi-journal-text me-2"></i>שיעורים
      <span class="badge bg-primary ms-1">${totalSessions}</span>
      <div class="btn-group btn-group-sm ms-3">
        <button class="btn ${this._tutorViewMode === 'all' ? 'btn-primary' : 'btn-outline-primary'} btn-sm" onclick="Pages._tutorSetView('all')">הכל</button>
        <button class="btn ${this._tutorViewMode === 'scheduled' ? 'btn-primary' : 'btn-outline-primary'} btn-sm" onclick="Pages._tutorSetView('scheduled')">מתוכננים</button>
        <button class="btn ${this._tutorViewMode === 'completed' ? 'btn-primary' : 'btn-outline-primary'} btn-sm" onclick="Pages._tutorSetView('completed')">הושלמו</button>
      </div>
    </h5>
    <div class="card">
      <div class="card-body p-2">
        <input type="text" class="form-control form-control-sm" id="tutor-search" placeholder="חיפוש שיעור..." oninput="Pages._tutorSearch(this.value)">
      </div>
      <div class="table-responsive">
        <table class="table table-sm table-hover align-middle mb-0">
          <thead class="table-light"><tr><th>תאריך</th><th>מתגבר</th><th>תלמיד</th><th>נושא</th><th>שעה</th><th>משך</th><th>עלות</th><th>דירוג</th><th>סטטוס</th><th>הערות</th><th></th></tr></thead>
          <tbody id="tutor-sessions-body">
            ${[...sessions].filter(s => this._tutorViewMode === 'all' || s.status === this._tutorViewMode).sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time)).map(s => {
              const tutor = tutors.find(t => t.id === s.tutorId);
              const cost = s.duration * s.rate;
              const st = statusMap[s.status] || { label: s.status, color: 'secondary', icon: 'bi-question-circle' };
              const color = subjectColors[s.subject] || '#6b7280';
              const feedbackStars = s.feedback > 0 ? stars(s.feedback) : '<span class="text-muted small">-</span>';
              return `<tr data-search="${tutor ? tutor.name : ''} ${s.student} ${s.subject} ${s.notes}">
                <td class="small">${s.date}</td>
                <td>${tutor ? tutor.name.split(' ').slice(-1)[0] : ''}</td>
                <td><strong>${s.student}</strong></td>
                <td><span class="badge" style="background:${color}20;color:${color}">${s.subject}</span></td>
                <td>${s.time}</td>
                <td>${s.duration} שעות</td>
                <td class="fw-bold">${cost} \u20AA</td>
                <td>${feedbackStars}</td>
                <td><span class="badge bg-${st.color}"><i class="${st.icon} me-1"></i>${st.label}</span></td>
                <td class="small text-muted text-truncate" style="max-width:120px" title="${s.notes}">${s.notes}</td>
                <td><button class="btn btn-outline-danger btn-sm" onclick="Pages._tutorDelete(${s.id})" title="מחק"><i class="bi bi-trash"></i></button></td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Session Modal -->
    <div class="modal fade" id="tutor-add-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header bg-primary bg-opacity-10"><h5 class="modal-title"><i class="bi bi-plus-circle me-2"></i>שיעור עזר חדש</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <div class="mb-3"><label class="form-label fw-bold">מתגבר</label>
          <select class="form-select" id="ts-tutor" onchange="Pages._tutorAutoRate()">
            ${tutors.map(t => `<option value="${t.id}">${t.name} (${t.rate} \u20AA/שעה) — ${t.subjects.join(', ')}</option>`).join('')}
          </select></div>
        <div class="mb-3"><label class="form-label fw-bold">תלמיד</label><input type="text" class="form-control" id="ts-student" placeholder="שם התלמיד"></div>
        <div class="mb-3"><label class="form-label fw-bold">נושא</label>
          <select class="form-select" id="ts-subject">
            <option>גמרא</option><option>חומש</option><option>הלכה</option><option>משנה</option><option>נ"ך</option><option>מתמטיקה</option><option>אנגלית</option><option>מוסר</option><option>מחשבים</option><option>פיזיקה</option><option>אחר</option>
          </select></div>
        <div class="row g-3 mb-3">
          <div class="col-6"><label class="form-label fw-bold">תאריך</label><input type="date" class="form-control" id="ts-date" value="${today}"></div>
          <div class="col-6"><label class="form-label fw-bold">שעה</label><input type="time" class="form-control" id="ts-time" value="09:00"></div>
        </div>
        <div class="row g-3 mb-3">
          <div class="col-6"><label class="form-label fw-bold">משך (שעות)</label><input type="number" class="form-control" id="ts-duration" min="0.5" step="0.5" value="1"></div>
          <div class="col-6"><label class="form-label fw-bold">תעריף שעתי (\u20AA)</label><input type="number" class="form-control" id="ts-rate" min="0" value="80"></div>
        </div>
        <div class="mb-3"><label class="form-label fw-bold">הערות</label><textarea class="form-control" id="ts-notes" rows="2" placeholder="נושאים שנלמדו..."></textarea></div>
        <div class="alert alert-info small" id="ts-cost-preview"><i class="bi bi-calculator me-1"></i>עלות משוערת: <strong>80 \u20AA</strong></div>
      </div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">ביטול</button><button class="btn btn-primary" onclick="Pages._tutorSave()"><i class="bi bi-check-lg me-1"></i>שמור</button></div>
    </div></div></div>`;
  },

  _tutorUseDemo: false,

  tutoringLoadDemo() {
    this._tutorUseDemo = true;
    App.navigate('tutoring');
  },

  tutoringInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    // Try API first, then localStorage, fall back to demo
    try {
      const apiData = _gc('\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9_\u05E2\u05D6\u05E8');
      if (apiData && apiData.length > 0) {
        if (apiData.tutors) this._tutors = apiData.tutors;
        if (apiData.sessions) this._tutorSessions = apiData.sessions;
      } else {
        this._tutorLoadFromStorage();
      }
    } catch (e) {
      this._tutorLoadFromStorage();
    }

    // Update cost preview on changes
    const updateCost = () => {
      const dur = parseFloat(document.getElementById('ts-duration')?.value) || 1;
      const rate = parseFloat(document.getElementById('ts-rate')?.value) || 0;
      const preview = document.getElementById('ts-cost-preview');
      if (preview) preview.innerHTML = `<i class="bi bi-calculator me-1"></i>עלות משוערת: <strong>${(dur * rate).toLocaleString()} \u20AA</strong>`;
    };
    document.getElementById('ts-duration')?.addEventListener('input', updateCost);
    document.getElementById('ts-rate')?.addEventListener('input', updateCost);
  },

  _tutorLoadFromStorage() {
    const saved = localStorage.getItem('bht_tutoring');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.tutors) this._tutors = data.tutors;
        if (data.sessions) this._tutorSessions = data.sessions;
        if (data.nextId) this._tutorNextId = data.nextId;
      } catch (e) { /* use defaults */ }
    }
  },

  _tutorSaveToStorage() {
    localStorage.setItem('bht_tutoring', JSON.stringify({
      tutors: this._tutors,
      sessions: this._tutorSessions,
      nextId: this._tutorNextId
    }));
  },

  _tutorAutoRate() {
    const tutorId = +document.getElementById('ts-tutor').value;
    const t = this._tutors.find(x => x.id === tutorId);
    if (t) {
      document.getElementById('ts-rate').value = t.rate;
      // Update subject dropdown to match tutor's first subject
      const subjectSel = document.getElementById('ts-subject');
      if (t.subjects.length > 0) {
        for (let i = 0; i < subjectSel.options.length; i++) {
          if (t.subjects.includes(subjectSel.options[i].value)) {
            subjectSel.selectedIndex = i;
            break;
          }
        }
      }
    }
  },

  _tutorShowAdd(tutorId) {
    if (tutorId) {
      document.getElementById('ts-tutor').value = tutorId;
      this._tutorAutoRate();
    } else {
      const firstTutor = this._tutors[0];
      if (firstTutor) document.getElementById('ts-rate').value = firstTutor.rate;
    }
    new bootstrap.Modal(document.getElementById('tutor-add-modal')).show();
  },

  async _tutorSave() {
    const tutorId = +document.getElementById('ts-tutor').value;
    const student = document.getElementById('ts-student').value.trim();
    const subject = document.getElementById('ts-subject').value;
    const date = document.getElementById('ts-date').value;
    const time = document.getElementById('ts-time').value;
    const duration = parseFloat(document.getElementById('ts-duration').value) || 1;
    const rate = parseFloat(document.getElementById('ts-rate').value) || 0;
    const notes = document.getElementById('ts-notes').value.trim();

    if (!student) {
      Utils.toast('נא להזין שם תלמיד', 'warning');
      return;
    }

    const status = date < Utils.todayISO() ? 'completed' : 'scheduled';
    const newSession = { id: this._tutorNextId++, tutorId, student, subject, date, time, duration, rate, status, notes, feedback: 0 };
    this._tutorSessions.push(newSession);
    try { await App.apiCall('add', '\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9_\u05E2\u05D6\u05E8', { row: newSession }); } catch (e) { /* localStorage fallback */ }
    this._tutorSaveToStorage();
    bootstrap.Modal.getInstance(document.getElementById('tutor-add-modal'))?.hide();
    Utils.toast('השיעור נוסף בהצלחה', 'success');
    App.loadPage('tutoring');
  },

  async _tutorDelete(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4', '\u05DC\u05DE\u05D7\u05D5\u05E7 \u05E9\u05D9\u05E2\u05D5\u05E8 \u05D6\u05D4?')) return;
    this._tutorSessions = this._tutorSessions.filter(s => s.id !== id);
    try { await App.apiCall('delete', '\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9_\u05E2\u05D6\u05E8', { id }); } catch (e) { /* localStorage fallback */ }
    this._tutorSaveToStorage();
    Utils.toast('השיעור נמחק', 'success');
    App.loadPage('tutoring');
  },

  _tutorSetView(mode) {
    this._tutorViewMode = mode;
    App.loadPage('tutoring');
  },

  _tutorSearch(query) {
    const rows = document.querySelectorAll('#tutor-sessions-body tr');
    const q = query.trim().toLowerCase();
    rows.forEach(tr => {
      const text = (tr.dataset.search || '').toLowerCase();
      tr.style.display = !q || text.includes(q) ? '' : 'none';
    });
  },

  async _tutorPay(tutorId) {
    const tutor = this._tutors.find(t => t.id === tutorId);
    if (!tutor) return;
    if (tutor.owed <= 0) { Utils.toast('אין חוב למתגבר זה', 'info'); return; }
    const amount = prompt(`תשלום ל${tutor.name}\nחוב: ${tutor.owed} \u20AA\nכמה לשלם?`, tutor.owed);
    if (!amount) return;
    const pay = Math.min(parseFloat(amount), tutor.owed);
    tutor.paid += pay;
    tutor.owed -= pay;
    try { await App.apiCall('update', '\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9_\u05E2\u05D6\u05E8', { id: tutorId, row: tutor }); } catch (e) { /* localStorage fallback */ }
    this._tutorSaveToStorage();
    Utils.toast(`שולם ${pay} \u20AA ל${tutor.name}`, 'success');
    App.loadPage('tutoring');
  },

  _tutorExport() {
    Utils.toast('הנתונים יוצאו בהצלחה', 'success');
  }
});
