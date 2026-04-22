/* ===== BHT v5.3 — Rooms Management (\u05E0\u05D9\u05D4\u05D5\u05DC \u05D7\u05D3\u05E8\u05D9\u05DD) ===== */
Object.assign(Pages, {
  _rooms: [
    { id: 1, name: '\u05D1\u05D9\u05EA \u05DE\u05D3\u05E8\u05E9 \u05D2\u05D3\u05D5\u05DC', capacity: 80, type: '\u05D0\u05D5\u05DC\u05DD', equipment: ['\u05DE\u05E7\u05E8\u05DF', '\u05DE\u05D9\u05E7\u05E8\u05D5\u05E4\u05D5\u05DF', '\u05DC\u05D5\u05D7 \u05DC\u05D1\u05DF'], icon: 'bi-building' },
    { id: 2, name: '\u05DB\u05D9\u05EA\u05D4 \u05D0', capacity: 30, type: '\u05DB\u05D9\u05EA\u05D4', equipment: ['\u05DC\u05D5\u05D7 \u05DC\u05D1\u05DF', '\u05DE\u05E7\u05E8\u05DF'], icon: 'bi-easel' },
    { id: 3, name: '\u05DB\u05D9\u05EA\u05D4 \u05D1', capacity: 25, type: '\u05DB\u05D9\u05EA\u05D4', equipment: ['\u05DC\u05D5\u05D7 \u05DC\u05D1\u05DF'], icon: 'bi-easel' },
    { id: 4, name: '\u05D7\u05D3\u05E8 \u05DE\u05D5\u05E8\u05D9\u05DD', capacity: 12, type: '\u05DE\u05E9\u05E8\u05D3', equipment: ['\u05DE\u05E7\u05E8\u05DF', '\u05DE\u05D3\u05E4\u05E1\u05EA', '\u05DE\u05D9\u05D6\u05D5\u05D2'], icon: 'bi-people' },
    { id: 5, name: '\u05E1\u05E4\u05E8\u05D9\u05D9\u05D4', capacity: 20, type: '\u05E1\u05E4\u05E8\u05D9\u05D9\u05D4', equipment: ['\u05DE\u05D7\u05E9\u05D1\u05D9\u05DD', '\u05DE\u05D3\u05E4\u05E1\u05EA'], icon: 'bi-book' },
    { id: 6, name: '\u05D7\u05D3\u05E8 \u05D9\u05E9\u05D9\u05D1\u05D5\u05EA', capacity: 8, type: '\u05DE\u05E9\u05E8\u05D3', equipment: ['\u05E9\u05D5\u05DC\u05D7\u05DF', '\u05DE\u05E7\u05E8\u05DF'], icon: 'bi-display' }
  ],

  _roomBookings: [
    { id: 1, roomId: 1, person: '\u05D4\u05E8\u05D1 \u05DB\u05D4\u05DF', date: '2026-04-22', start: '08:00', end: '10:00', purpose: '\u05E9\u05D9\u05E2\u05D5\u05E8 \u05DB\u05DC\u05DC\u05D9' },
    { id: 2, roomId: 2, person: '\u05D4\u05E8\u05D1 \u05DC\u05D5\u05D9', date: '2026-04-22', start: '08:30', end: '12:00', purpose: '\u05DB\u05D9\u05EA\u05D4 \u05D0 - \u05D2\u05DE\u05E8\u05D0' },
    { id: 3, roomId: 3, person: '\u05D4\u05E8\u05D1 \u05D2\u05D5\u05DC\u05D3\u05D1\u05E8\u05D2', date: '2026-04-22', start: '09:00', end: '11:00', purpose: '\u05DB\u05D9\u05EA\u05D4 \u05D1 - \u05D7\u05D5\u05DE\u05E9' },
    { id: 4, roomId: 4, person: '\u05D4\u05E8\u05D1 \u05E4\u05E8\u05D9\u05D3\u05DE\u05DF', date: '2026-04-22', start: '10:00', end: '11:00', purpose: '\u05D9\u05E9\u05D9\u05D1\u05EA \u05E6\u05D5\u05D5\u05EA' },
    { id: 5, roomId: 1, person: '\u05D4\u05E8\u05D1 \u05E9\u05E4\u05D9\u05E8\u05D0', date: '2026-04-22', start: '14:00', end: '16:00', purpose: '\u05E9\u05D9\u05E2\u05D5\u05E8 \u05D0\u05D7\u05D4\u05F4\u05E6' },
    { id: 6, roomId: 5, person: '\u05D4\u05E8\u05D1 \u05E8\u05D5\u05D6\u05E0\u05D1\u05E8\u05D2', date: '2026-04-22', start: '13:00', end: '15:00', purpose: '\u05E9\u05E2\u05EA \u05E1\u05E4\u05E8\u05D9\u05D9\u05D4' },
    { id: 7, roomId: 2, person: '\u05D4\u05E8\u05D1 \u05DC\u05D5\u05D9', date: '2026-04-23', start: '08:30', end: '12:00', purpose: '\u05DB\u05D9\u05EA\u05D4 \u05D0 - \u05D2\u05DE\u05E8\u05D0' },
    { id: 8, roomId: 6, person: '\u05D4\u05E8\u05D1 \u05DB\u05D4\u05DF', date: '2026-04-23', start: '10:00', end: '12:00', purpose: '\u05D9\u05E9\u05D9\u05D1\u05D4 \u05D0\u05D9\u05E9\u05D9\u05EA' },
    { id: 9, roomId: 3, person: '\u05D4\u05E8\u05D1 \u05D2\u05D5\u05DC\u05D3\u05D1\u05E8\u05D2', date: '2026-04-23', start: '09:00', end: '11:00', purpose: '\u05DB\u05D9\u05EA\u05D4 \u05D1 - \u05D7\u05D5\u05DE\u05E9' },
    { id: 10, roomId: 1, person: '\u05D4\u05E8\u05D1 \u05DE\u05D6\u05E8\u05D7\u05D9', date: '2026-04-24', start: '16:00', end: '18:00', purpose: '\u05D0\u05E8\u05D5\u05E2 \u05DE\u05D9\u05D5\u05D7\u05D3' }
  ],

  _roomNextId: 11,

  rooms() {
    const rooms = this._rooms;
    const bookings = this._roomBookings;
    const today = Utils.todayISO();
    const now = new Date();
    const currentTime = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');

    // Stats
    const todayBookings = bookings.filter(b => b.date === today);
    const occupiedNow = rooms.filter(r => {
      return todayBookings.some(b => b.roomId === r.id && b.start <= currentTime && b.end > currentTime);
    });
    const availableNow = rooms.length - occupiedNow.length;
    const maintenanceRooms = 0;

    // Room status helper
    const getRoomStatus = (room) => {
      const active = todayBookings.find(b => b.roomId === room.id && b.start <= currentTime && b.end > currentTime);
      if (active) return { status: 'occupied', label: '\u05EA\u05E4\u05D5\u05E1', color: 'danger', who: active.person, until: active.end };
      const next = todayBookings.filter(b => b.roomId === room.id && b.start > currentTime).sort((a, b) => a.start.localeCompare(b.start))[0];
      if (next) return { status: 'available', label: '\u05E4\u05E0\u05D5\u05D9', color: 'success', who: '', next: next.start };
      return { status: 'available', label: '\u05E4\u05E0\u05D5\u05D9', color: 'success', who: '' };
    };

    // Week days for calendar grid
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay()); // Sunday
    const weekDays = [];
    const dayNames = ['\u05D0\u05F3', '\u05D1\u05F3', '\u05D2\u05F3', '\u05D3\u05F3', '\u05D4\u05F3', '\u05D5\u05F3', '\u05E9\u05D1\u05EA'];
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + i);
      weekDays.push({ date: d.toISOString().slice(0, 10), name: dayNames[i], day: d.getDate(), isToday: d.toISOString().slice(0, 10) === today });
    }

    // Hours grid
    const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div><h1><i class="bi bi-door-open me-2"></i>\u05E0\u05D9\u05D4\u05D5\u05DC \u05D7\u05D3\u05E8\u05D9\u05DD</h1><p class="text-muted mb-0">\u05D4\u05D6\u05DE\u05E0\u05EA \u05D7\u05D3\u05E8\u05D9\u05DD, \u05DE\u05E2\u05E7\u05D1 \u05D5\u05DC\u05D5\u05D7 \u05D6\u05DE\u05E0\u05D9\u05DD</p></div>
      <button class="btn btn-primary btn-sm" onclick="Pages._roomShowBook()"><i class="bi bi-plus-lg me-1"></i>\u05D4\u05D6\u05DE\u05E0\u05D4 \u05D7\u05D3\u05E9\u05D4</button>
    </div>

    <!-- Stats -->
    <div class="row g-3 mb-3">
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-primary">${rooms.length}</div><small class="text-muted">\u05E1\u05D4\u05F4\u05DB \u05D7\u05D3\u05E8\u05D9\u05DD</small></div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-danger">${todayBookings.length}</div><small class="text-muted">\u05D4\u05D6\u05DE\u05E0\u05D5\u05EA \u05D4\u05D9\u05D5\u05DD</small></div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-success">${availableNow}</div><small class="text-muted">\u05E4\u05E0\u05D5\u05D9\u05D9\u05DD \u05DB\u05E2\u05EA</small></div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-warning">${occupiedNow.length}</div><small class="text-muted">\u05EA\u05E4\u05D5\u05E1\u05D9\u05DD \u05DB\u05E2\u05EA</small></div></div>
    </div>

    <!-- Room Cards -->
    <h5 class="fw-bold mb-3"><i class="bi bi-grid me-2"></i>\u05D7\u05D3\u05E8\u05D9\u05DD</h5>
    <div class="row g-3 mb-4">
      ${rooms.map(r => {
        const st = getRoomStatus(r);
        const todayCount = todayBookings.filter(b => b.roomId === r.id).length;
        return `
        <div class="col-md-4 col-lg-4">
          <div class="card h-100 hover-lift" style="border-right:4px solid var(--bs-${st.color})">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div class="d-flex align-items-center gap-2">
                  <div class="rounded-circle bg-${st.color} bg-opacity-10 d-flex align-items-center justify-content-center" style="width:40px;height:40px">
                    <i class="${r.icon} text-${st.color} fs-5"></i>
                  </div>
                  <div>
                    <h6 class="fw-bold mb-0">${r.name}</h6>
                    <small class="text-muted">${r.type}</small>
                  </div>
                </div>
                <span class="badge bg-${st.color}">${st.label}</span>
              </div>
              <div class="d-flex gap-3 small text-muted mb-2">
                <span><i class="bi bi-people me-1"></i>${r.capacity} \u05DE\u05E7\u05D5\u05DE\u05D5\u05EA</span>
                <span><i class="bi bi-calendar-check me-1"></i>${todayCount} \u05D4\u05D9\u05D5\u05DD</span>
              </div>
              <div class="d-flex flex-wrap gap-1 mb-2">
                ${r.equipment.map(e => `<span class="badge bg-light text-dark border">${e}</span>`).join('')}
              </div>
              ${st.who ? `<div class="small text-danger"><i class="bi bi-person-fill me-1"></i>${st.who} \u05E2\u05D3 ${st.until}</div>` : ''}
              ${st.next ? `<div class="small text-muted"><i class="bi bi-clock me-1"></i>\u05D4\u05D1\u05D0: ${st.next}</div>` : ''}
            </div>
          </div>
        </div>`;
      }).join('')}
    </div>

    <!-- Weekly Calendar Grid -->
    <h5 class="fw-bold mb-3"><i class="bi bi-calendar-week me-2"></i>\u05DC\u05D5\u05D7 \u05E9\u05D1\u05D5\u05E2\u05D9</h5>
    <div class="card mb-4">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-bordered table-sm mb-0 text-center" style="table-layout:fixed">
            <thead class="table-light">
              <tr>
                <th style="width:80px">\u05E9\u05E2\u05D4</th>
                ${weekDays.map(d => `<th class="${d.isToday ? 'bg-primary bg-opacity-10' : ''}">${d.name}<br><small>${d.day}</small></th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${hours.map(h => `
                <tr>
                  <td class="fw-bold small text-muted">${h}</td>
                  ${weekDays.map(d => {
                    const slot = bookings.filter(b => b.date === d.date && b.start <= h && b.end > h);
                    if (slot.length) {
                      return `<td class="bg-primary bg-opacity-10 small p-1">${slot.map(s => {
                        const room = rooms.find(r => r.id === s.roomId);
                        return `<div class="badge bg-primary w-100 text-truncate mb-1" title="${room ? room.name : ''}: ${s.person}">${room ? room.name.substring(0, 8) : ''}</div>`;
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

    <!-- Active Bookings -->
    <h5 class="fw-bold mb-3"><i class="bi bi-list-check me-2"></i>\u05D4\u05D6\u05DE\u05E0\u05D5\u05EA \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA</h5>
    <div class="card">
      <div class="table-responsive">
        <table class="table table-sm table-hover align-middle mb-0">
          <thead class="table-light"><tr><th>\u05D7\u05D3\u05E8</th><th>\u05DE\u05D6\u05DE\u05D9\u05DF</th><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05E9\u05E2\u05D5\u05EA</th><th>\u05DE\u05D8\u05E8\u05D4</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th><th></th></tr></thead>
          <tbody>
            ${bookings.sort((a, b) => a.date.localeCompare(b.date) || a.start.localeCompare(b.start)).map(b => {
              const room = rooms.find(r => r.id === b.roomId);
              const isPast = b.date < today || (b.date === today && b.end <= currentTime);
              const isNow = b.date === today && b.start <= currentTime && b.end > currentTime;
              const statusBadge = isNow ? '<span class="badge bg-danger">\u05E2\u05DB\u05E9\u05D9\u05D5</span>' : isPast ? '<span class="badge bg-secondary">\u05D4\u05E1\u05EA\u05D9\u05D9\u05DD</span>' : '<span class="badge bg-success">\u05DE\u05EA\u05D5\u05DB\u05E0\u05DF</span>';
              return `<tr class="${isNow ? 'table-warning' : isPast ? 'opacity-50' : ''}">
                <td><i class="${room ? room.icon : 'bi-door-open'} me-1"></i>${room ? room.name : ''}</td>
                <td>${b.person}</td>
                <td>${b.date}</td>
                <td>${b.start} - ${b.end}</td>
                <td>${b.purpose}</td>
                <td>${statusBadge}</td>
                <td>${!isPast ? `<button class="btn btn-outline-danger btn-sm" onclick="Pages._roomCancel(${b.id})" title="\u05D1\u05D8\u05DC"><i class="bi bi-x-lg"></i></button>` : ''}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Book Room Modal -->
    <div class="modal fade" id="room-book-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title"><i class="bi bi-calendar-plus me-2"></i>\u05D4\u05D6\u05DE\u05E0\u05EA \u05D7\u05D3\u05E8</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <div class="mb-3"><label class="form-label">\u05D7\u05D3\u05E8</label>
          <select class="form-select" id="rb-room">${rooms.map(r => `<option value="${r.id}">${r.name} (\u05E7\u05D9\u05D1\u05D5\u05DC\u05EA: ${r.capacity})</option>`).join('')}</select></div>
        <div class="mb-3"><label class="form-label">\u05E9\u05DD \u05D4\u05DE\u05D6\u05DE\u05D9\u05DF</label><input type="text" class="form-control" id="rb-person" placeholder="\u05DC\u05DE\u05E9\u05DC: \u05D4\u05E8\u05D1 \u05DB\u05D4\u05DF"></div>
        <div class="mb-3"><label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA</label><input type="date" class="form-control" id="rb-date" value="${today}"></div>
        <div class="row g-3 mb-3">
          <div class="col-6"><label class="form-label">\u05E9\u05E2\u05EA \u05D4\u05EA\u05D7\u05DC\u05D4</label><input type="time" class="form-control" id="rb-start" value="08:00"></div>
          <div class="col-6"><label class="form-label">\u05E9\u05E2\u05EA \u05E1\u05D9\u05D5\u05DD</label><input type="time" class="form-control" id="rb-end" value="09:00"></div>
        </div>
        <div class="mb-3"><label class="form-label">\u05DE\u05D8\u05E8\u05D4</label><input type="text" class="form-control" id="rb-purpose" placeholder="\u05DC\u05DE\u05E9\u05DC: \u05E9\u05D9\u05E2\u05D5\u05E8 \u05DB\u05DC\u05DC\u05D9"></div>
      </div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages._roomSave()">\u05E9\u05DE\u05D5\u05E8 \u05D4\u05D6\u05DE\u05E0\u05D4</button></div>
    </div></div></div>`;
  },

  roomsInit() {},

  _roomShowBook() {
    new bootstrap.Modal(document.getElementById('room-book-modal')).show();
  },

  _roomSave() {
    const roomId = +document.getElementById('rb-room').value;
    const person = document.getElementById('rb-person').value.trim();
    const date = document.getElementById('rb-date').value;
    const start = document.getElementById('rb-start').value;
    const end = document.getElementById('rb-end').value;
    const purpose = document.getElementById('rb-purpose').value.trim();

    if (!person || !date || !start || !end) {
      Utils.toast('\u05E0\u05D0 \u05DC\u05DE\u05DC\u05D0 \u05D0\u05EA \u05DB\u05DC \u05D4\u05E9\u05D3\u05D5\u05EA', 'warning');
      return;
    }
    if (start >= end) {
      Utils.toast('\u05E9\u05E2\u05EA \u05E1\u05D9\u05D5\u05DD \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05D9\u05D5\u05EA \u05D0\u05D7\u05E8\u05D9 \u05E9\u05E2\u05EA \u05D4\u05D4\u05EA\u05D7\u05DC\u05D4', 'warning');
      return;
    }

    // Check conflict
    const conflict = this._roomBookings.find(b => b.roomId === roomId && b.date === date && b.start < end && b.end > start);
    if (conflict) {
      Utils.toast(`\u05D4\u05D7\u05D3\u05E8 \u05EA\u05E4\u05D5\u05E1 \u05D1\u05E9\u05E2\u05D5\u05EA \u05D0\u05DC\u05D5 (\u05DE\u05D6\u05DE\u05D9\u05DF: ${conflict.person})`, 'danger');
      return;
    }

    this._roomBookings.push({ id: this._roomNextId++, roomId, person, date, start, end, purpose });
    bootstrap.Modal.getInstance(document.getElementById('room-book-modal'))?.hide();
    Utils.toast('\u05D4\u05D4\u05D6\u05DE\u05E0\u05D4 \u05E0\u05E9\u05DE\u05E8\u05D4 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4', 'success');
    App.loadPage('rooms');
  },

  _roomCancel(id) {
    if (!confirm('\u05DC\u05D1\u05D8\u05DC \u05D4\u05D6\u05DE\u05E0\u05D4 \u05D6\u05D5?')) return;
    this._roomBookings = this._roomBookings.filter(b => b.id !== id);
    Utils.toast('\u05D4\u05D4\u05D6\u05DE\u05E0\u05D4 \u05D1\u05D5\u05D8\u05DC\u05D4', 'success');
    App.loadPage('rooms');
  }
});
