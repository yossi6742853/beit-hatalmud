/* ===== BHT v5.3 — Rooms Management (ניהול חדרים) ===== */
Object.assign(Pages, {
  _rooms: [
    { id: 1, name: 'בית מדרש גדול', capacity: 80, type: 'אולם', equipment: ['מקרן', 'מיקרופון', 'לוח לבן', 'מיזוג', 'מערכת שמע'], icon: 'bi-building', floor: 1, status: 'active' },
    { id: 2, name: 'כיתה א', capacity: 30, type: 'כיתה', equipment: ['לוח לבן', 'מקרן', 'מיזוג'], icon: 'bi-easel', floor: 1, status: 'active' },
    { id: 3, name: 'כיתה ב', capacity: 25, type: 'כיתה', equipment: ['לוח לבן', 'מיזוג'], icon: 'bi-easel', floor: 1, status: 'active' },
    { id: 4, name: 'חדר מורים', capacity: 12, type: 'משרד', equipment: ['מקרן', 'מדפסת', 'מיזוג', 'מחשב'], icon: 'bi-people', floor: 2, status: 'active' },
    { id: 5, name: 'ספרייה', capacity: 20, type: 'ספרייה', equipment: ['מחשבים', 'מדפסת', 'מיזוג', 'סורק'], icon: 'bi-book', floor: 2, status: 'active' },
    { id: 6, name: 'חדר ישיבות', capacity: 8, type: 'משרד', equipment: ['שולחן', 'מקרן', 'מיזוג', 'לוח לבן'], icon: 'bi-display', floor: 2, status: 'active' },
    { id: 7, name: 'כיתה ג', capacity: 28, type: 'כיתה', equipment: ['לוח לבן', 'מיזוג', 'מקרן'], icon: 'bi-easel', floor: 1, status: 'active' },
    { id: 8, name: 'חדר מחשבים', capacity: 15, type: 'מעבדה', equipment: ['מחשבים', 'מקרן', 'מיזוג', 'מדפסת', 'רשת'], icon: 'bi-pc-display', floor: 2, status: 'maintenance' }
  ],

  _roomBookings: [
    { id: 1, roomId: 1, person: 'הרב כהן', date: '2026-04-22', start: '08:00', end: '10:00', purpose: 'שיעור כללי', recurring: true, color: '#2563eb' },
    { id: 2, roomId: 2, person: 'הרב לוי', date: '2026-04-22', start: '08:30', end: '12:00', purpose: 'כיתה א - גמרא', recurring: true, color: '#16a34a' },
    { id: 3, roomId: 3, person: 'הרב גולדברג', date: '2026-04-22', start: '09:00', end: '11:00', purpose: 'כיתה ב - חומש', recurring: true, color: '#9333ea' },
    { id: 4, roomId: 4, person: 'הרב פרידמן', date: '2026-04-22', start: '10:00', end: '11:00', purpose: 'ישיבת צוות', recurring: false, color: '#f59e0b' },
    { id: 5, roomId: 1, person: 'הרב שפירא', date: '2026-04-22', start: '14:00', end: '16:00', purpose: 'שיעור אחה"צ', recurring: true, color: '#ef4444' },
    { id: 6, roomId: 5, person: 'הרב רוזנברג', date: '2026-04-22', start: '13:00', end: '15:00', purpose: 'שעת ספרייה', recurring: false, color: '#06b6d4' },
    { id: 7, roomId: 2, person: 'הרב לוי', date: '2026-04-23', start: '08:30', end: '12:00', purpose: 'כיתה א - גמרא', recurring: true, color: '#16a34a' },
    { id: 8, roomId: 6, person: 'הרב כהן', date: '2026-04-23', start: '10:00', end: '12:00', purpose: 'ישיבה אישית', recurring: false, color: '#f59e0b' },
    { id: 9, roomId: 3, person: 'הרב גולדברג', date: '2026-04-23', start: '09:00', end: '11:00', purpose: 'כיתה ב - חומש', recurring: true, color: '#9333ea' },
    { id: 10, roomId: 1, person: 'הרב מזרחי', date: '2026-04-24', start: '16:00', end: '18:00', purpose: 'ארוע מיוחד', recurring: false, color: '#ec4899' },
    { id: 11, roomId: 7, person: 'הרב אברהם', date: '2026-04-22', start: '08:00', end: '10:30', purpose: 'כיתה ג - הלכה', recurring: true, color: '#8b5cf6' },
    { id: 12, roomId: 7, person: 'הרב אברהם', date: '2026-04-22', start: '14:00', end: '16:00', purpose: 'כיתה ג - נ"ך', recurring: true, color: '#8b5cf6' },
    { id: 13, roomId: 4, person: 'הרב פרידמן', date: '2026-04-24', start: '09:00', end: '10:00', purpose: 'פגישת הורים', recurring: false, color: '#f59e0b' },
    { id: 14, roomId: 5, person: 'הרב רוזנברג', date: '2026-04-24', start: '10:00', end: '12:00', purpose: 'חוג קריאה', recurring: false, color: '#06b6d4' },
    { id: 15, roomId: 6, person: 'הרב שפירא', date: '2026-04-25', start: '09:00', end: '10:30', purpose: 'ישיבת הנהלה', recurring: false, color: '#ef4444' }
  ],

  _roomNextId: 16,
  _roomSelectedFilter: 'all',

  rooms() {
    const rooms = this._rooms;
    const bookings = this._roomBookings;
    const today = Utils.todayISO();
    const now = new Date();
    const currentTime = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    const filter = this._roomSelectedFilter || 'all';

    // Stats
    const todayBookings = bookings.filter(b => b.date === today);
    const activeRooms = rooms.filter(r => r.status === 'active');
    const occupiedNow = activeRooms.filter(r => {
      return todayBookings.some(b => b.roomId === r.id && b.start <= currentTime && b.end > currentTime);
    });
    const availableNow = activeRooms.length - occupiedNow.length;
    const maintenanceRooms = rooms.filter(r => r.status === 'maintenance');
    const totalCapacity = rooms.reduce((s, r) => s + r.capacity, 0);
    const weekBookings = bookings.filter(b => {
      const d = new Date(b.date);
      const diff = (d - new Date(today)) / 86400000;
      return diff >= 0 && diff < 7;
    });

    // Room status helper
    const getRoomStatus = (room) => {
      if (room.status === 'maintenance') return { status: 'maintenance', label: 'תחזוקה', color: 'warning', who: '', until: '' };
      const active = todayBookings.find(b => b.roomId === room.id && b.start <= currentTime && b.end > currentTime);
      if (active) return { status: 'occupied', label: 'תפוס', color: 'danger', who: active.person, until: active.end, purpose: active.purpose };
      const next = todayBookings.filter(b => b.roomId === room.id && b.start > currentTime).sort((a, b) => a.start.localeCompare(b.start))[0];
      if (next) return { status: 'available', label: 'פנוי', color: 'success', who: '', next: next.start, nextPurpose: next.purpose };
      return { status: 'available', label: 'פנוי', color: 'success', who: '' };
    };

    // Week days for calendar grid
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay()); // Sunday
    const weekDays = [];
    const dayNames = ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'שבת'];
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + i);
      weekDays.push({ date: d.toISOString().slice(0, 10), name: dayNames[i], day: d.getDate(), isToday: d.toISOString().slice(0, 10) === today });
    }

    // Hours grid
    const hours = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

    // Room type filter options
    const roomTypes = [...new Set(rooms.map(r => r.type))];

    // Utilization calculation
    const utilizationPct = todayBookings.length > 0 ? Math.round((occupiedNow.length / activeRooms.length) * 100) : 0;

    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div><h1><i class="bi bi-door-open me-2"></i>ניהול חדרים</h1><p class="text-muted mb-0">הזמנת חדרים, מעקב ולוח זמנים שבועי</p></div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-secondary btn-sm" onclick="Pages._roomPrint()" title="הדפסה"><i class="bi bi-printer me-1"></i>הדפסה</button>
        <button class="btn btn-primary btn-sm" onclick="Pages._roomShowBook()"><i class="bi bi-plus-lg me-1"></i>הזמנה חדשה</button>
      </div>
    </div>

    <!-- Stats -->
    <div class="row g-3 mb-3">
      <div class="col-6 col-md-2"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-primary">${rooms.length}</div><small class="text-muted">סה"כ חדרים</small></div></div>
      <div class="col-6 col-md-2"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-danger">${todayBookings.length}</div><small class="text-muted">הזמנות היום</small></div></div>
      <div class="col-6 col-md-2"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-success">${availableNow}</div><small class="text-muted">פנויים כעת</small></div></div>
      <div class="col-6 col-md-2"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-warning">${occupiedNow.length}</div><small class="text-muted">תפוסים כעת</small></div></div>
      <div class="col-6 col-md-2"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-info">${weekBookings.length}</div><small class="text-muted">הזמנות השבוע</small></div></div>
      <div class="col-6 col-md-2"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-secondary">${totalCapacity}</div><small class="text-muted">קיבולת כללית</small></div></div>
    </div>

    <!-- Utilization bar -->
    <div class="card mb-3 p-3">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span class="fw-bold small">תפוסה נוכחית</span>
        <span class="badge bg-${utilizationPct > 80 ? 'danger' : utilizationPct > 50 ? 'warning' : 'success'}">${utilizationPct}%</span>
      </div>
      <div class="progress" style="height:12px">
        <div class="progress-bar bg-${utilizationPct > 80 ? 'danger' : utilizationPct > 50 ? 'warning' : 'success'}" style="width:${utilizationPct}%"></div>
      </div>
    </div>

    <!-- Room Type Filter -->
    <div class="d-flex align-items-center gap-2 mb-3 flex-wrap">
      <span class="fw-bold small"><i class="bi bi-funnel me-1"></i>סינון:</span>
      <button class="btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}" onclick="Pages._roomFilter('all')">הכל</button>
      ${roomTypes.map(t => `<button class="btn btn-sm ${filter === t ? 'btn-primary' : 'btn-outline-primary'}" onclick="Pages._roomFilter('${t}')">${t}</button>`).join('')}
      <button class="btn btn-sm ${filter === 'available' ? 'btn-success' : 'btn-outline-success'}" onclick="Pages._roomFilter('available')">פנויים בלבד</button>
    </div>

    <!-- Room Cards -->
    <h5 class="fw-bold mb-3"><i class="bi bi-grid me-2"></i>חדרים</h5>
    <div class="row g-3 mb-4">
      ${rooms.filter(r => {
        if (filter === 'all') return true;
        if (filter === 'available') return getRoomStatus(r).status === 'available';
        return r.type === filter;
      }).map(r => {
        const st = getRoomStatus(r);
        const todayCount = todayBookings.filter(b => b.roomId === r.id).length;
        const capacityPct = Math.round((todayCount / 8) * 100);
        const nextBookings = bookings.filter(b => b.roomId === r.id && b.date >= today).sort((a, b) => a.date.localeCompare(b.date) || a.start.localeCompare(b.start));
        return `
        <div class="col-md-6 col-lg-3">
          <div class="card h-100 hover-lift" style="border-right:4px solid var(--bs-${st.color})">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div class="d-flex align-items-center gap-2">
                  <div class="rounded-circle bg-${st.color} bg-opacity-10 d-flex align-items-center justify-content-center" style="width:44px;height:44px">
                    <i class="${r.icon} text-${st.color} fs-5"></i>
                  </div>
                  <div>
                    <h6 class="fw-bold mb-0">${r.name}</h6>
                    <small class="text-muted">${r.type} | קומה ${r.floor}</small>
                  </div>
                </div>
                <span class="badge bg-${st.color}">${st.label}</span>
              </div>

              <!-- Capacity Bar -->
              <div class="mb-2">
                <div class="d-flex justify-content-between small text-muted mb-1">
                  <span><i class="bi bi-people me-1"></i>${r.capacity} מקומות</span>
                  <span>${todayCount} הזמנות היום</span>
                </div>
                <div class="progress" style="height:6px">
                  <div class="progress-bar bg-${st.color}" style="width:${Math.min(capacityPct, 100)}%"></div>
                </div>
              </div>

              <!-- Equipment List -->
              <div class="d-flex flex-wrap gap-1 mb-2">
                ${r.equipment.map(e => `<span class="badge bg-light text-dark border" style="font-size:0.7rem"><i class="bi bi-check-circle me-1"></i>${e}</span>`).join('')}
              </div>

              ${st.who ? `<div class="small text-danger mb-1"><i class="bi bi-person-fill me-1"></i>${st.who} — ${st.purpose || ''} <span class="text-muted">עד ${st.until}</span></div>` : ''}
              ${st.next ? `<div class="small text-muted mb-1"><i class="bi bi-clock me-1"></i>הבא: ${st.next} — ${st.nextPurpose || ''}</div>` : ''}

              <div class="d-flex gap-1 mt-2 pt-2 border-top">
                <button class="btn btn-outline-primary btn-sm flex-grow-1" onclick="Pages._roomShowBook(${r.id})"><i class="bi bi-calendar-plus me-1"></i>הזמן</button>
                <button class="btn btn-outline-info btn-sm" onclick="Pages._roomShowDetails(${r.id})" title="פרטים"><i class="bi bi-info-circle"></i></button>
              </div>
            </div>
          </div>
        </div>`;
      }).join('')}
    </div>

    <!-- Weekly Calendar Grid -->
    <h5 class="fw-bold mb-3"><i class="bi bi-calendar-week me-2"></i>לוח שבועי
      <select class="form-select form-select-sm d-inline-block w-auto ms-2" id="room-cal-filter" onchange="Pages._roomCalFilter(this.value)">
        <option value="all">כל החדרים</option>
        ${rooms.map(r => `<option value="${r.id}">${r.name}</option>`).join('')}
      </select>
    </h5>
    <div class="card mb-4">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-bordered table-sm mb-0 text-center" style="table-layout:fixed">
            <thead class="table-light">
              <tr>
                <th style="width:70px">שעה</th>
                ${weekDays.map(d => `<th class="${d.isToday ? 'bg-primary bg-opacity-10' : ''} ${d.name === 'שבת' ? 'text-primary' : ''}">${d.name}<br><small class="text-muted">${d.day}</small></th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${hours.map(h => `
                <tr>
                  <td class="fw-bold small text-muted align-middle">${h}</td>
                  ${weekDays.map(d => {
                    const slot = bookings.filter(b => b.date === d.date && b.start <= h && b.end > h);
                    if (slot.length) {
                      return `<td class="p-1" style="vertical-align:top">${slot.map(s => {
                        const room = rooms.find(r => r.id === s.roomId);
                        return `<div class="badge w-100 text-truncate mb-1" style="background:${s.color || '#2563eb'};font-size:0.65rem;cursor:pointer" title="${room ? room.name : ''}: ${s.person} — ${s.purpose}" onclick="Pages._roomShowBookingInfo(${s.id})">${room ? room.name.substring(0, 6) : ''}</div>`;
                      }).join('')}</td>`;
                    }
                    return `<td class="${d.isToday ? 'bg-light' : ''} ${d.name === 'שבת' ? 'bg-primary bg-opacity-5' : ''}" style="cursor:pointer" onclick="Pages._roomShowBook(0,'${d.date}','${h}')"></td>`;
                  }).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Active Bookings -->
    <h5 class="fw-bold mb-3"><i class="bi bi-list-check me-2"></i>הזמנות פעילות
      <span class="badge bg-primary ms-2">${bookings.length}</span>
    </h5>
    <div class="card mb-4">
      <div class="card-body p-2">
        <div class="input-group input-group-sm mb-2">
          <span class="input-group-text"><i class="bi bi-search"></i></span>
          <input type="text" class="form-control" id="room-search" placeholder="חיפוש הזמנה..." oninput="Pages._roomSearchBookings(this.value)">
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-sm table-hover align-middle mb-0">
          <thead class="table-light"><tr><th>חדר</th><th>מזמין</th><th>תאריך</th><th>שעות</th><th>מטרה</th><th>חוזר</th><th>סטטוס</th><th></th></tr></thead>
          <tbody id="room-bookings-body">
            ${bookings.sort((a, b) => a.date.localeCompare(b.date) || a.start.localeCompare(b.start)).map(b => {
              const room = rooms.find(r => r.id === b.roomId);
              const isPast = b.date < today || (b.date === today && b.end <= currentTime);
              const isNow = b.date === today && b.start <= currentTime && b.end > currentTime;
              const statusBadge = isNow ? '<span class="badge bg-danger"><i class="bi bi-broadcast me-1"></i>עכשיו</span>' : isPast ? '<span class="badge bg-secondary">הסתיים</span>' : '<span class="badge bg-success">מתוכנן</span>';
              const duration = ((parseInt(b.end.split(':')[0]) * 60 + parseInt(b.end.split(':')[1])) - (parseInt(b.start.split(':')[0]) * 60 + parseInt(b.start.split(':')[1]))) / 60;
              return `<tr class="${isNow ? 'table-warning' : isPast ? 'opacity-50' : ''}" data-search="${room ? room.name : ''} ${b.person} ${b.purpose}">
                <td><i class="${room ? room.icon : 'bi-door-open'} me-1 text-primary"></i>${room ? room.name : ''}</td>
                <td><strong>${b.person}</strong></td>
                <td>${b.date}</td>
                <td>${b.start} - ${b.end} <small class="text-muted">(${duration}ש)</small></td>
                <td>${b.purpose}</td>
                <td>${b.recurring ? '<i class="bi bi-arrow-repeat text-primary" title="חוזר"></i>' : ''}</td>
                <td>${statusBadge}</td>
                <td>${!isPast ? `<button class="btn btn-outline-danger btn-sm" onclick="Pages._roomCancel(${b.id})" title="בטל"><i class="bi bi-x-lg"></i></button>` : ''}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Book Room Modal -->
    <div class="modal fade" id="room-book-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header bg-primary bg-opacity-10"><h5 class="modal-title"><i class="bi bi-calendar-plus me-2"></i>הזמנת חדר</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <div class="mb-3"><label class="form-label fw-bold">חדר</label>
          <select class="form-select" id="rb-room" onchange="Pages._roomCheckConflictLive()">
            ${rooms.filter(r => r.status === 'active').map(r => `<option value="${r.id}">${r.name} (קיבולת: ${r.capacity}) — ${r.type}</option>`).join('')}
          </select></div>
        <div class="mb-3"><label class="form-label fw-bold">שם המזמין</label><input type="text" class="form-control" id="rb-person" placeholder="למשל: הרב כהן"></div>
        <div class="mb-3"><label class="form-label fw-bold">תאריך</label><input type="date" class="form-control" id="rb-date" value="${today}" onchange="Pages._roomCheckConflictLive()"></div>
        <div class="row g-3 mb-3">
          <div class="col-6"><label class="form-label fw-bold">שעת התחלה</label><input type="time" class="form-control" id="rb-start" value="08:00" onchange="Pages._roomCheckConflictLive()"></div>
          <div class="col-6"><label class="form-label fw-bold">שעת סיום</label><input type="time" class="form-control" id="rb-end" value="09:00" onchange="Pages._roomCheckConflictLive()"></div>
        </div>
        <div class="mb-3"><label class="form-label fw-bold">מטרה</label><input type="text" class="form-control" id="rb-purpose" placeholder="למשל: שיעור כללי"></div>
        <div class="mb-3"><label class="form-label fw-bold">צבע</label><input type="color" class="form-control form-control-color" id="rb-color" value="#2563eb"></div>
        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" id="rb-recurring">
          <label class="form-check-label" for="rb-recurring">הזמנה חוזרת שבועית</label>
        </div>
        <div id="rb-conflict-alert" class="d-none"></div>
      </div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">ביטול</button><button class="btn btn-primary" onclick="Pages._roomSave()"><i class="bi bi-check-lg me-1"></i>שמור הזמנה</button></div>
    </div></div></div>

    <!-- Room Details Modal -->
    <div class="modal fade" id="room-details-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title" id="room-detail-title"></h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body" id="room-detail-body"></div>
    </div></div></div>

    <!-- Booking Info Modal -->
    <div class="modal fade" id="room-booking-info-modal" tabindex="-1"><div class="modal-dialog modal-sm"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title">פרטי הזמנה</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body" id="room-booking-info-body"></div>
    </div></div></div>`;
  },

  _roomsUseDemo: false,

  roomsLoadDemo() {
    this._roomsUseDemo = true;
    App.navigate('rooms');
  },

  async roomsInit() {
    // Try API first, then localStorage, fall back to demo
    try {
      const apiData = await App.getData('\u05D7\u05D3\u05E8\u05D9\u05DD');
      if (apiData && apiData.length > 0) {
        if (apiData.rooms) this._rooms = apiData.rooms;
        if (apiData.bookings) this._roomBookings = apiData.bookings;
      } else {
        this._roomLoadFromStorage();
      }
    } catch (e) {
      this._roomLoadFromStorage();
    }
    // If still has hardcoded demo and not flagged, clear
    if (!this._roomsUseDemo && this._rooms.length && this._rooms[0]?.id === 1 && this._rooms[0]?.name === 'בית מדרש גדול') {
      this._rooms = [];
      this._roomBookings = [];
    }
  },

  _roomLoadFromStorage() {
    const saved = localStorage.getItem('bht_rooms');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.rooms) this._rooms = data.rooms;
        if (data.bookings) this._roomBookings = data.bookings;
        if (data.nextId) this._roomNextId = data.nextId;
      } catch (e) { /* use defaults */ }
    }
  },

  _roomSaveToStorage() {
    localStorage.setItem('bht_rooms', JSON.stringify({
      rooms: this._rooms,
      bookings: this._roomBookings,
      nextId: this._roomNextId
    }));
  },

  _roomFilter(type) {
    this._roomSelectedFilter = type;
    App.loadPage('rooms');
  },

  _roomShowBook(roomId, date, time) {
    if (roomId) document.getElementById('rb-room').value = roomId;
    if (date) document.getElementById('rb-date').value = date;
    if (time) {
      document.getElementById('rb-start').value = time;
      const endH = (parseInt(time.split(':')[0]) + 1).toString().padStart(2, '0');
      document.getElementById('rb-end').value = endH + ':00';
    }
    this._roomCheckConflictLive();
    new bootstrap.Modal(document.getElementById('room-book-modal')).show();
  },

  _roomCheckConflictLive() {
    const roomId = +document.getElementById('rb-room').value;
    const date = document.getElementById('rb-date').value;
    const start = document.getElementById('rb-start').value;
    const end = document.getElementById('rb-end').value;
    const alertDiv = document.getElementById('rb-conflict-alert');
    if (!date || !start || !end) { alertDiv.classList.add('d-none'); return; }

    const conflicts = this._roomBookings.filter(b => b.roomId === roomId && b.date === date && b.start < end && b.end > start);
    if (conflicts.length) {
      alertDiv.className = 'alert alert-danger small';
      alertDiv.innerHTML = '<i class="bi bi-exclamation-triangle me-1"></i><strong>התנגשות!</strong> החדר תפוס בשעות אלו:<br>' +
        conflicts.map(c => `${c.start}-${c.end}: ${c.person} — ${c.purpose}`).join('<br>');
    } else {
      alertDiv.className = 'alert alert-success small';
      alertDiv.innerHTML = '<i class="bi bi-check-circle me-1"></i>החדר פנוי בשעות אלו';
    }
  },

  async _roomSave() {
    const roomId = +document.getElementById('rb-room').value;
    const person = document.getElementById('rb-person').value.trim();
    const date = document.getElementById('rb-date').value;
    const start = document.getElementById('rb-start').value;
    const end = document.getElementById('rb-end').value;
    const purpose = document.getElementById('rb-purpose').value.trim();
    const color = document.getElementById('rb-color').value;
    const recurring = document.getElementById('rb-recurring').checked;

    if (!person || !date || !start || !end) {
      Utils.toast('נא למלא את כל השדות', 'warning');
      return;
    }
    if (start >= end) {
      Utils.toast('שעת סיום חייבת להיות אחרי שעת ההתחלה', 'warning');
      return;
    }

    // Check conflict
    const conflict = this._roomBookings.find(b => b.roomId === roomId && b.date === date && b.start < end && b.end > start);
    if (conflict) {
      Utils.toast(`החדר תפוס בשעות אלו (מזמין: ${conflict.person})`, 'danger');
      return;
    }

    const newBooking = { id: this._roomNextId++, roomId, person, date, start, end, purpose, color, recurring };
    this._roomBookings.push(newBooking);
    try { await App.apiCall('add', '\u05D7\u05D3\u05E8\u05D9\u05DD', { row: newBooking }); } catch (e) { /* localStorage fallback */ }
    this._roomSaveToStorage();
    bootstrap.Modal.getInstance(document.getElementById('room-book-modal'))?.hide();
    Utils.toast('ההזמנה נשמרה בהצלחה', 'success');
    App.loadPage('rooms');
  },

  async _roomCancel(id) {
    if (!confirm('לבטל הזמנה זו?')) return;
    this._roomBookings = this._roomBookings.filter(b => b.id !== id);
    try { await App.apiCall('delete', '\u05D7\u05D3\u05E8\u05D9\u05DD', { id }); } catch (e) { /* localStorage fallback */ }
    this._roomSaveToStorage();
    Utils.toast('ההזמנה בוטלה', 'success');
    App.loadPage('rooms');
  },

  _roomSearchBookings(query) {
    const rows = document.querySelectorAll('#room-bookings-body tr');
    const q = query.trim().toLowerCase();
    rows.forEach(tr => {
      const text = (tr.dataset.search || '').toLowerCase();
      tr.style.display = !q || text.includes(q) ? '' : 'none';
    });
  },

  _roomShowDetails(roomId) {
    const room = this._rooms.find(r => r.id === roomId);
    if (!room) return;
    const bookings = this._roomBookings.filter(b => b.roomId === roomId).sort((a, b) => a.date.localeCompare(b.date) || a.start.localeCompare(b.start));
    const today = Utils.todayISO();
    const upcoming = bookings.filter(b => b.date >= today);
    const past = bookings.filter(b => b.date < today);

    document.getElementById('room-detail-title').innerHTML = `<i class="${room.icon} me-2"></i>${room.name}`;
    document.getElementById('room-detail-body').innerHTML = `
      <div class="row g-3 mb-3">
        <div class="col-4"><div class="card p-2 text-center"><strong>${room.capacity}</strong><br><small class="text-muted">מקומות</small></div></div>
        <div class="col-4"><div class="card p-2 text-center"><strong>${room.type}</strong><br><small class="text-muted">סוג</small></div></div>
        <div class="col-4"><div class="card p-2 text-center"><strong>קומה ${room.floor}</strong><br><small class="text-muted">מיקום</small></div></div>
      </div>
      <h6 class="fw-bold mb-2"><i class="bi bi-tools me-1"></i>ציוד</h6>
      <div class="d-flex flex-wrap gap-1 mb-3">${room.equipment.map(e => `<span class="badge bg-primary bg-opacity-10 text-primary">${e}</span>`).join('')}</div>
      <h6 class="fw-bold mb-2"><i class="bi bi-calendar-check me-1"></i>הזמנות קרובות (${upcoming.length})</h6>
      ${upcoming.length ? `<div class="list-group list-group-flush mb-3">${upcoming.slice(0, 10).map(b => `
        <div class="list-group-item d-flex justify-content-between small">
          <span>${b.date} ${b.start}-${b.end}</span>
          <span><strong>${b.person}</strong> — ${b.purpose}</span>
        </div>`).join('')}</div>` : '<p class="text-muted small">אין הזמנות קרובות</p>'}
      <div class="small text-muted">סה"כ ${bookings.length} הזמנות | ${past.length} שעברו | ${upcoming.length} עתידיות</div>`;
    new bootstrap.Modal(document.getElementById('room-details-modal')).show();
  },

  _roomShowBookingInfo(id) {
    const b = this._roomBookings.find(x => x.id === id);
    if (!b) return;
    const room = this._rooms.find(r => r.id === b.roomId);
    document.getElementById('room-booking-info-body').innerHTML = `
      <div class="text-center mb-3">
        <div class="rounded-circle bg-primary bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-2" style="width:60px;height:60px">
          <i class="${room ? room.icon : 'bi-door-open'} text-primary fs-3"></i>
        </div>
        <h6 class="fw-bold">${room ? room.name : ''}</h6>
      </div>
      <table class="table table-sm">
        <tr><td class="text-muted">מזמין</td><td class="fw-bold">${b.person}</td></tr>
        <tr><td class="text-muted">תאריך</td><td>${b.date}</td></tr>
        <tr><td class="text-muted">שעות</td><td>${b.start} - ${b.end}</td></tr>
        <tr><td class="text-muted">מטרה</td><td>${b.purpose}</td></tr>
        <tr><td class="text-muted">חוזר</td><td>${b.recurring ? 'כן' : 'לא'}</td></tr>
      </table>`;
    new bootstrap.Modal(document.getElementById('room-booking-info-modal')).show();
  },

  _roomCalFilter(val) {
    // Re-render with filtered calendar - simplified for demo
    App.loadPage('rooms');
  },

  _roomPrint() {
    window.print();
  }
});
