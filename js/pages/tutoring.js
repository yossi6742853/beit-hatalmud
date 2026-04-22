/* ===== BHT v5.3 — Tutoring (\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9 \u05E2\u05D6\u05E8) ===== */
Object.assign(Pages, {
  _tutors: [
    { id: 1, name: '\u05D4\u05E8\u05D1 \u05D0\u05D1\u05E8\u05D4\u05DD \u05DB\u05D4\u05DF', subjects: ['\u05D2\u05DE\u05E8\u05D0', '\u05D4\u05DC\u05DB\u05D4'], rate: 80, availability: '\u05D0-\u05D4 8:00-16:00', rating: 5, sessions: 0, hours: 0 },
    { id: 2, name: '\u05D4\u05E8\u05D1 \u05DE\u05E9\u05D4 \u05DC\u05D5\u05D9', subjects: ['\u05D7\u05D5\u05DE\u05E9', '\u05E0\u05F4\u05DA'], rate: 70, availability: '\u05D0-\u05D3 9:00-14:00', rating: 4.5, sessions: 0, hours: 0 },
    { id: 3, name: '\u05D4\u05E8\u05D1 \u05D3\u05D5\u05D3 \u05E4\u05E8\u05D9\u05D3\u05DE\u05DF', subjects: ['\u05DE\u05EA\u05DE\u05D8\u05D9\u05E7\u05D4', '\u05D0\u05E0\u05D2\u05DC\u05D9\u05EA'], rate: 90, availability: '\u05D1-\u05D4 10:00-18:00', rating: 4.8, sessions: 0, hours: 0 },
    { id: 4, name: '\u05D4\u05E8\u05D1 \u05D0\u05DC\u05D9\u05D4\u05D5 \u05E9\u05E4\u05D9\u05E8\u05D0', subjects: ['\u05D2\u05DE\u05E8\u05D0', '\u05DE\u05E9\u05E0\u05D4'], rate: 85, availability: '\u05D0-\u05D5 8:00-20:00', rating: 4.7, sessions: 0, hours: 0 },
    { id: 5, name: '\u05D4\u05E8\u05D1 \u05D9\u05E2\u05E7\u05D1 \u05E8\u05D5\u05D6\u05E0\u05D1\u05E8\u05D2', subjects: ['\u05D7\u05D5\u05DE\u05E9', '\u05D4\u05DC\u05DB\u05D4', '\u05DE\u05D5\u05E1\u05E8'], rate: 75, availability: '\u05D0-\u05D2 12:00-17:00', rating: 4.3, sessions: 0, hours: 0 }
  ],

  _tutorSessions: [
    { id: 1, tutorId: 1, student: '\u05D9\u05D5\u05E1\u05E3 \u05DB\u05D4\u05DF', subject: '\u05D2\u05DE\u05E8\u05D0', date: '2026-04-22', time: '09:00', duration: 1.5, rate: 80, status: 'completed' },
    { id: 2, tutorId: 3, student: '\u05DE\u05E9\u05D4 \u05DC\u05D5\u05D9', subject: '\u05DE\u05EA\u05DE\u05D8\u05D9\u05E7\u05D4', date: '2026-04-22', time: '10:00', duration: 1, rate: 90, status: 'completed' },
    { id: 3, tutorId: 2, student: '\u05D0\u05D1\u05E8\u05D4\u05DD \u05D2\u05D5\u05DC\u05D3\u05D1\u05E8\u05D2', subject: '\u05D7\u05D5\u05DE\u05E9', date: '2026-04-21', time: '11:00', duration: 1, rate: 70, status: 'completed' },
    { id: 4, tutorId: 4, student: '\u05D3\u05D5\u05D3 \u05E4\u05E8\u05D9\u05D3\u05DE\u05DF', subject: '\u05D2\u05DE\u05E8\u05D0', date: '2026-04-21', time: '14:00', duration: 2, rate: 85, status: 'completed' },
    { id: 5, tutorId: 5, student: '\u05D0\u05DC\u05D9\u05D4\u05D5 \u05E9\u05E4\u05D9\u05E8\u05D0', subject: '\u05D4\u05DC\u05DB\u05D4', date: '2026-04-20', time: '12:00', duration: 1, rate: 75, status: 'completed' },
    { id: 6, tutorId: 1, student: '\u05D9\u05E2\u05E7\u05D1 \u05E8\u05D5\u05D6\u05E0\u05D1\u05E8\u05D2', subject: '\u05D4\u05DC\u05DB\u05D4', date: '2026-04-20', time: '09:00', duration: 1, rate: 80, status: 'completed' },
    { id: 7, tutorId: 3, student: '\u05E0\u05EA\u05E0\u05D0\u05DC \u05D5\u05D9\u05D9\u05E1', subject: '\u05D0\u05E0\u05D2\u05DC\u05D9\u05EA', date: '2026-04-19', time: '10:00', duration: 1.5, rate: 90, status: 'completed' },
    { id: 8, tutorId: 2, student: '\u05E9\u05DE\u05D5\u05D0\u05DC \u05D4\u05D5\u05E8\u05D1\u05D9\u05E5', subject: '\u05E0\u05F4\u05DA', date: '2026-04-18', time: '13:00', duration: 1, rate: 70, status: 'completed' },
    { id: 9, tutorId: 4, student: '\u05E8\u05E4\u05D0\u05DC \u05DE\u05D6\u05E8\u05D7\u05D9', subject: '\u05DE\u05E9\u05E0\u05D4', date: '2026-04-17', time: '15:00', duration: 1.5, rate: 85, status: 'completed' },
    { id: 10, tutorId: 1, student: '\u05D7\u05D9\u05D9\u05DD \u05D1\u05E8\u05E7\u05D5\u05D1\u05D9\u05E5', subject: '\u05D2\u05DE\u05E8\u05D0', date: '2026-04-16', time: '09:00', duration: 2, rate: 80, status: 'completed' },
    { id: 11, tutorId: 5, student: '\u05D9\u05D5\u05E1\u05E3 \u05DB\u05D4\u05DF', subject: '\u05DE\u05D5\u05E1\u05E8', date: '2026-04-15', time: '14:00', duration: 1, rate: 75, status: 'completed' },
    { id: 12, tutorId: 3, student: '\u05D3\u05D5\u05D3 \u05E4\u05E8\u05D9\u05D3\u05DE\u05DF', subject: '\u05DE\u05EA\u05DE\u05D8\u05D9\u05E7\u05D4', date: '2026-04-14', time: '10:00', duration: 1, rate: 90, status: 'completed' },
    { id: 13, tutorId: 2, student: '\u05DE\u05E9\u05D4 \u05DC\u05D5\u05D9', subject: '\u05D7\u05D5\u05DE\u05E9', date: '2026-04-23', time: '11:00', duration: 1, rate: 70, status: 'scheduled' },
    { id: 14, tutorId: 1, student: '\u05D0\u05D1\u05E8\u05D4\u05DD \u05D2\u05D5\u05DC\u05D3\u05D1\u05E8\u05D2', subject: '\u05D2\u05DE\u05E8\u05D0', date: '2026-04-23', time: '09:00', duration: 1.5, rate: 80, status: 'scheduled' },
    { id: 15, tutorId: 4, student: '\u05E0\u05EA\u05E0\u05D0\u05DC \u05D5\u05D9\u05D9\u05E1', subject: '\u05D2\u05DE\u05E8\u05D0', date: '2026-04-24', time: '14:00', duration: 1, rate: 85, status: 'scheduled' }
  ],

  _tutorNextId: 16,

  tutoring() {
    const tutors = this._tutors;
    const sessions = this._tutorSessions;
    const today = Utils.todayISO();

    // Calculate tutor stats
    tutors.forEach(t => {
      const ts = sessions.filter(s => s.tutorId === t.id);
      t.sessions = ts.length;
      t.hours = ts.reduce((sum, s) => sum + s.duration, 0);
    });

    // Monthly stats (current month)
    const now = new Date();
    const monthPrefix = now.toISOString().slice(0, 7);
    const monthSessions = sessions.filter(s => s.date.startsWith(monthPrefix));
    const totalSessions = sessions.length;
    const monthHours = monthSessions.reduce((s, x) => s + x.duration, 0);
    const activeTutors = tutors.filter(t => sessions.some(s => s.tutorId === t.id)).length;
    const totalCost = monthSessions.reduce((s, x) => s + (x.duration * x.rate), 0);

    const statusMap = { completed: { label: '\u05D4\u05D5\u05E9\u05DC\u05DD', color: 'success' }, scheduled: { label: '\u05DE\u05EA\u05D5\u05DB\u05E0\u05DF', color: 'primary' }, cancelled: { label: '\u05D1\u05D5\u05D8\u05DC', color: 'danger' } };

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

    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div><h1><i class="bi bi-person-workspace me-2"></i>\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9 \u05E2\u05D6\u05E8</h1><p class="text-muted mb-0">\u05E0\u05D9\u05D4\u05D5\u05DC \u05E9\u05D9\u05E2\u05D5\u05E8\u05D9\u05DD \u05E4\u05E8\u05D8\u05D9\u05D9\u05DD, \u05DE\u05EA\u05D2\u05D1\u05E8\u05D9\u05DD \u05D5\u05E2\u05DC\u05D5\u05D9\u05D5\u05EA</p></div>
      <button class="btn btn-primary btn-sm" onclick="Pages._tutorShowAdd()"><i class="bi bi-plus-lg me-1"></i>\u05E9\u05D9\u05E2\u05D5\u05E8 \u05D7\u05D3\u05E9</button>
    </div>

    <!-- Stats -->
    <div class="row g-3 mb-3">
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-primary">${totalSessions}</div><small class="text-muted">\u05E1\u05D4\u05F4\u05DB \u05E9\u05D9\u05E2\u05D5\u05E8\u05D9\u05DD</small></div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-info">${monthHours}</div><small class="text-muted">\u05E9\u05E2\u05D5\u05EA \u05D4\u05D7\u05D5\u05D3\u05E9</small></div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-success">${activeTutors}</div><small class="text-muted">\u05DE\u05EA\u05D2\u05D1\u05E8\u05D9\u05DD \u05E4\u05E2\u05D9\u05DC\u05D9\u05DD</small></div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-warning">${totalCost.toLocaleString()} \u20AA</div><small class="text-muted">\u05E2\u05DC\u05D5\u05EA \u05D4\u05D7\u05D5\u05D3\u05E9</small></div></div>
    </div>

    <!-- Tutor Profile Cards -->
    <h5 class="fw-bold mb-3"><i class="bi bi-people me-2"></i>\u05DE\u05EA\u05D2\u05D1\u05E8\u05D9\u05DD</h5>
    <div class="row g-3 mb-4">
      ${tutors.map(t => {
        const tMonthSessions = monthSessions.filter(s => s.tutorId === t.id);
        const tMonthHours = tMonthSessions.reduce((s, x) => s + x.duration, 0);
        const tMonthCost = tMonthSessions.reduce((s, x) => s + (x.duration * x.rate), 0);
        return `
        <div class="col-md-6 col-lg-4">
          <div class="card h-100 hover-lift">
            <div class="card-body">
              <div class="d-flex align-items-center gap-3 mb-3">
                <div class="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center" style="width:48px;height:48px">
                  <span class="fw-bold text-primary">${t.name.split(' ').slice(-1)[0].substring(0, 2)}</span>
                </div>
                <div class="flex-grow-1">
                  <h6 class="fw-bold mb-0">${t.name}</h6>
                  <div class="small">${stars(t.rating)} <span class="text-muted ms-1">${t.rating}</span></div>
                </div>
              </div>
              <div class="d-flex flex-wrap gap-1 mb-2">
                ${t.subjects.map(s => `<span class="badge bg-primary bg-opacity-10 text-primary">${s}</span>`).join('')}
              </div>
              <div class="small text-muted mb-2"><i class="bi bi-clock me-1"></i>${t.availability}</div>
              <div class="d-flex justify-content-between small border-top pt-2 mt-2">
                <span><strong>${t.rate} \u20AA</strong>/\u05E9\u05E2\u05D4</span>
                <span>${tMonthSessions.length} \u05E9\u05D9\u05E2\u05D5\u05E8\u05D9\u05DD</span>
                <span>${tMonthHours} \u05E9\u05E2\u05D5\u05EA</span>
                <span>${tMonthCost.toLocaleString()} \u20AA</span>
              </div>
            </div>
          </div>
        </div>`;
      }).join('')}
    </div>

    <!-- Monthly Summary per Tutor -->
    <h5 class="fw-bold mb-3"><i class="bi bi-bar-chart me-2"></i>\u05E1\u05D9\u05DB\u05D5\u05DD \u05D7\u05D5\u05D3\u05E9\u05D9</h5>
    <div class="card mb-4">
      <div class="table-responsive">
        <table class="table table-sm table-hover align-middle mb-0">
          <thead class="table-light"><tr><th>\u05DE\u05EA\u05D2\u05D1\u05E8</th><th>\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9\u05DD</th><th>\u05E9\u05E2\u05D5\u05EA</th><th>\u05E2\u05DC\u05D5\u05EA</th><th>\u05E0\u05EA\u05D7 \u05DE\u05E1\u05DA</th></tr></thead>
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
                <td><div class="progress" style="height:18px"><div class="progress-bar" style="width:${pct}%">${pct}%</div></div></td>
              </tr>`;
            }).join('')}
            <tr class="table-light fw-bold">
              <td>\u05E1\u05D4\u05F4\u05DB</td>
              <td>${monthSessions.length}</td>
              <td>${monthHours}</td>
              <td>${totalCost.toLocaleString()} \u20AA</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Sessions Table -->
    <h5 class="fw-bold mb-3"><i class="bi bi-journal-text me-2"></i>\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9\u05DD</h5>
    <div class="card">
      <div class="table-responsive">
        <table class="table table-sm table-hover align-middle mb-0">
          <thead class="table-light"><tr><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05DE\u05EA\u05D2\u05D1\u05E8</th><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th>\u05E0\u05D5\u05E9\u05D0</th><th>\u05E9\u05E2\u05D4</th><th>\u05DE\u05E9\u05DA</th><th>\u05E2\u05DC\u05D5\u05EA</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th><th></th></tr></thead>
          <tbody>
            ${[...sessions].sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time)).map(s => {
              const tutor = tutors.find(t => t.id === s.tutorId);
              const cost = s.duration * s.rate;
              const st = statusMap[s.status] || { label: s.status, color: 'secondary' };
              return `<tr>
                <td>${s.date}</td>
                <td>${tutor ? tutor.name : ''}</td>
                <td>${s.student}</td>
                <td><span class="badge bg-primary bg-opacity-10 text-primary">${s.subject}</span></td>
                <td>${s.time}</td>
                <td>${s.duration} \u05E9\u05E2\u05D5\u05EA</td>
                <td>${cost} \u20AA</td>
                <td><span class="badge bg-${st.color}">${st.label}</span></td>
                <td><button class="btn btn-outline-danger btn-sm" onclick="Pages._tutorDelete(${s.id})" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button></td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Session Modal -->
    <div class="modal fade" id="tutor-add-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title"><i class="bi bi-plus-circle me-2"></i>\u05E9\u05D9\u05E2\u05D5\u05E8 \u05E2\u05D6\u05E8 \u05D7\u05D3\u05E9</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <div class="mb-3"><label class="form-label">\u05DE\u05EA\u05D2\u05D1\u05E8</label>
          <select class="form-select" id="ts-tutor">${tutors.map(t => `<option value="${t.id}">${t.name} (${t.rate} \u20AA/\u05E9\u05E2\u05D4)</option>`).join('')}</select></div>
        <div class="mb-3"><label class="form-label">\u05EA\u05DC\u05DE\u05D9\u05D3</label><input type="text" class="form-control" id="ts-student" placeholder="\u05E9\u05DD \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3"></div>
        <div class="mb-3"><label class="form-label">\u05E0\u05D5\u05E9\u05D0</label>
          <select class="form-select" id="ts-subject">
            <option>\u05D2\u05DE\u05E8\u05D0</option><option>\u05D7\u05D5\u05DE\u05E9</option><option>\u05D4\u05DC\u05DB\u05D4</option><option>\u05DE\u05E9\u05E0\u05D4</option><option>\u05E0\u05F4\u05DA</option><option>\u05DE\u05EA\u05DE\u05D8\u05D9\u05E7\u05D4</option><option>\u05D0\u05E0\u05D2\u05DC\u05D9\u05EA</option><option>\u05DE\u05D5\u05E1\u05E8</option><option>\u05D0\u05D7\u05E8</option>
          </select></div>
        <div class="row g-3 mb-3">
          <div class="col-6"><label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA</label><input type="date" class="form-control" id="ts-date" value="${today}"></div>
          <div class="col-6"><label class="form-label">\u05E9\u05E2\u05D4</label><input type="time" class="form-control" id="ts-time" value="09:00"></div>
        </div>
        <div class="row g-3 mb-3">
          <div class="col-6"><label class="form-label">\u05DE\u05E9\u05DA (\u05E9\u05E2\u05D5\u05EA)</label><input type="number" class="form-control" id="ts-duration" min="0.5" step="0.5" value="1"></div>
          <div class="col-6"><label class="form-label">\u05EA\u05E2\u05E8\u05D9\u05E3 \u05E9\u05E2\u05EA\u05D9 (\u20AA)</label><input type="number" class="form-control" id="ts-rate" min="0" value="80"></div>
        </div>
      </div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages._tutorSave()">\u05E9\u05DE\u05D5\u05E8</button></div>
    </div></div></div>`;
  },

  tutoringInit() {},

  _tutorShowAdd() {
    // Auto-fill rate when tutor changes
    const modal = document.getElementById('tutor-add-modal');
    const tutorSel = modal.querySelector('#ts-tutor');
    const rateInput = modal.querySelector('#ts-rate');
    tutorSel.onchange = () => {
      const t = this._tutors.find(x => x.id === +tutorSel.value);
      if (t) rateInput.value = t.rate;
    };
    // Set initial rate
    const firstTutor = this._tutors[0];
    if (firstTutor) rateInput.value = firstTutor.rate;
    new bootstrap.Modal(modal).show();
  },

  _tutorSave() {
    const tutorId = +document.getElementById('ts-tutor').value;
    const student = document.getElementById('ts-student').value.trim();
    const subject = document.getElementById('ts-subject').value;
    const date = document.getElementById('ts-date').value;
    const time = document.getElementById('ts-time').value;
    const duration = parseFloat(document.getElementById('ts-duration').value) || 1;
    const rate = parseFloat(document.getElementById('ts-rate').value) || 0;

    if (!student) {
      Utils.toast('\u05E0\u05D0 \u05DC\u05D4\u05D6\u05D9\u05DF \u05E9\u05DD \u05EA\u05DC\u05DE\u05D9\u05D3', 'warning');
      return;
    }

    const status = date < Utils.todayISO() ? 'completed' : 'scheduled';
    this._tutorSessions.push({ id: this._tutorNextId++, tutorId, student, subject, date, time, duration, rate, status });
    bootstrap.Modal.getInstance(document.getElementById('tutor-add-modal'))?.hide();
    Utils.toast('\u05D4\u05E9\u05D9\u05E2\u05D5\u05E8 \u05E0\u05D5\u05E1\u05E3 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4', 'success');
    App.loadPage('tutoring');
  },

  _tutorDelete(id) {
    if (!confirm('\u05DC\u05DE\u05D7\u05D5\u05E7 \u05E9\u05D9\u05E2\u05D5\u05E8 \u05D6\u05D4?')) return;
    this._tutorSessions = this._tutorSessions.filter(s => s.id !== id);
    Utils.toast('\u05D4\u05E9\u05D9\u05E2\u05D5\u05E8 \u05E0\u05DE\u05D7\u05E7', 'success');
    App.loadPage('tutoring');
  }
});
