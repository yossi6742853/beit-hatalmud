/* ===== BHT v5.3 — Hebrew Calendar (\u05DC\u05D5\u05D7 \u05E9\u05E0\u05D4 \u05E2\u05D1\u05E8\u05D9) ===== */
Object.assign(Pages, {
  _hcViewDate: null,
  _hcEvents: [
    { date: '2026-04-26', title: '\u05DE\u05E1\u05D9\u05D1\u05EA \u05D4\u05D5\u05E8\u05D9\u05DD', type: 'event' },
    { date: '2026-04-30', title: '\u05DE\u05D1\u05D7\u05DF \u05D7\u05D5\u05D3\u05E9\u05D9', type: 'event' },
    { date: '2026-05-05', title: '\u05D8\u05D9\u05D5\u05DC \u05E9\u05E0\u05EA\u05D9', type: 'event' },
    { date: '2026-05-10', title: '\u05D0\u05E1\u05D9\u05E4\u05EA \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD', type: 'event' },
    { date: '2026-05-20', title: '\u05D9\u05D5\u05DD \u05E4\u05EA\u05D5\u05D7', type: 'event' }
  ],

  // Hebrew holidays with approximate Gregorian dates for 5786 (2025-2026)
  _hcHolidays: [
    { name: '\u05E8\u05D0\u05E9 \u05D4\u05E9\u05E0\u05D4', type: 'chag', gDates: ['2025-09-23', '2025-09-24'] },
    { name: '\u05E6\u05D5\u05DD \u05D2\u05D3\u05DC\u05D9\u05D4', type: 'fast', gDates: ['2025-09-25'] },
    { name: '\u05D9\u05D5\u05DD \u05DB\u05D9\u05E4\u05D5\u05E8', type: 'chag', gDates: ['2025-10-02'] },
    { name: '\u05E1\u05D5\u05DB\u05D5\u05EA', type: 'chag', gDates: ['2025-10-07', '2025-10-08'] },
    { name: '\u05E9\u05DE\u05D9\u05E0\u05D9 \u05E2\u05E6\u05E8\u05EA', type: 'chag', gDates: ['2025-10-14'] },
    { name: '\u05E9\u05DE\u05D7\u05EA \u05EA\u05D5\u05E8\u05D4', type: 'chag', gDates: ['2025-10-15'] },
    { name: '\u05D7\u05E0\u05D5\u05DB\u05D4', type: 'chag', gDates: ['2025-12-15', '2025-12-16', '2025-12-17', '2025-12-18', '2025-12-19', '2025-12-20', '2025-12-21', '2025-12-22'] },
    { name: '\u05E6\u05D5\u05DD \u05D8\u05D1\u05EA', type: 'fast', gDates: ['2026-01-04'] },
    { name: '\u05D8\u05F4\u05D5 \u05D1\u05E9\u05D1\u05D8', type: 'chag', gDates: ['2026-02-09'] },
    { name: '\u05EA\u05E2\u05E0\u05D9\u05EA \u05D0\u05E1\u05EA\u05E8', type: 'fast', gDates: ['2026-03-02'] },
    { name: '\u05E4\u05D5\u05E8\u05D9\u05DD', type: 'chag', gDates: ['2026-03-03'] },
    { name: '\u05E9\u05D5\u05E9\u05DF \u05E4\u05D5\u05E8\u05D9\u05DD', type: 'chag', gDates: ['2026-03-04'] },
    { name: '\u05E4\u05E1\u05D7', type: 'chag', gDates: ['2026-04-02', '2026-04-03', '2026-04-08', '2026-04-09'] },
    { name: '\u05D7\u05D5\u05DC \u05D4\u05DE\u05D5\u05E2\u05D3 \u05E4\u05E1\u05D7', type: 'chag', gDates: ['2026-04-04', '2026-04-05', '2026-04-06', '2026-04-07'] },
    { name: '\u05D9\u05D5\u05DD \u05D4\u05E9\u05D5\u05D0\u05D4', type: 'chag', gDates: ['2026-04-22'] },
    { name: '\u05D9\u05D5\u05DD \u05D4\u05D6\u05D9\u05DB\u05E8\u05D5\u05DF', type: 'chag', gDates: ['2026-04-29'] },
    { name: '\u05D9\u05D5\u05DD \u05D4\u05E2\u05E6\u05DE\u05D0\u05D5\u05EA', type: 'chag', gDates: ['2026-04-30'] },
    { name: '\u05DC\u05F4\u05D2 \u05D1\u05E2\u05D5\u05DE\u05E8', type: 'chag', gDates: ['2026-05-12'] },
    { name: '\u05D9\u05D5\u05DD \u05D9\u05E8\u05D5\u05E9\u05DC\u05D9\u05DD', type: 'chag', gDates: ['2026-05-22'] },
    { name: '\u05E9\u05D1\u05D5\u05E2\u05D5\u05EA', type: 'chag', gDates: ['2026-05-22', '2026-05-23'] },
    { name: '\u05E6\u05D5\u05DD \u05D9\u05F4\u05D6 \u05D1\u05EA\u05DE\u05D5\u05D6', type: 'fast', gDates: ['2026-07-07'] },
    { name: '\u05EA\u05E9\u05E2\u05D4 \u05D1\u05D0\u05D1', type: 'fast', gDates: ['2026-07-28'] }
  ],

  // Weekly parsha list (simplified, for Nisan-Tishrei cycle)
  _hcParshiot: {
    '2026-04-18': '\u05E9\u05DE\u05D9\u05E0\u05D9',
    '2026-04-25': '\u05EA\u05D6\u05E8\u05D9\u05E2-\u05DE\u05E6\u05D5\u05E8\u05E2',
    '2026-05-02': '\u05D0\u05D7\u05E8\u05D9 \u05DE\u05D5\u05EA-\u05E7\u05D3\u05D5\u05E9\u05D9\u05DD',
    '2026-05-09': '\u05D0\u05DE\u05D5\u05E8',
    '2026-05-16': '\u05D1\u05D4\u05E8-\u05D1\u05D7\u05E7\u05D5\u05EA\u05D9',
    '2026-05-23': '\u05D1\u05DE\u05D3\u05D1\u05E8',
    '2026-05-30': '\u05E0\u05E9\u05D0',
    '2026-06-06': '\u05D1\u05D4\u05E2\u05DC\u05D5\u05EA\u05DA',
    '2026-06-13': '\u05E9\u05DC\u05D7-\u05DC\u05DA',
    '2026-06-20': '\u05E7\u05E8\u05D7',
    '2026-06-27': '\u05D7\u05E7\u05EA-\u05D1\u05DC\u05E7',
    '2026-07-04': '\u05E4\u05D9\u05E0\u05D7\u05E1',
    '2026-07-11': '\u05DE\u05D8\u05D5\u05EA-\u05DE\u05E1\u05E2\u05D9',
    '2026-07-18': '\u05D3\u05D1\u05E8\u05D9\u05DD',
    '2026-07-25': '\u05D5\u05D0\u05EA\u05D7\u05E0\u05DF',
    '2026-08-01': '\u05E2\u05E7\u05D1',
    '2026-08-08': '\u05E8\u05D0\u05D4',
    '2026-08-15': '\u05E9\u05D5\u05E4\u05D8\u05D9\u05DD',
    '2026-08-22': '\u05DB\u05D9 \u05EA\u05E6\u05D0',
    '2026-08-29': '\u05DB\u05D9 \u05EA\u05D1\u05D5\u05D0',
    '2026-09-05': '\u05E0\u05E6\u05D1\u05D9\u05DD-\u05D5\u05D9\u05DC\u05DA'
  },

  hebrewcal() {
    const hebFmt = new Intl.DateTimeFormat('he-IL-u-ca-hebrew', { day: 'numeric', month: 'long', year: 'numeric' });
    const hebDay = new Intl.DateTimeFormat('he-IL-u-ca-hebrew', { day: 'numeric' });
    const hebMonth = new Intl.DateTimeFormat('he-IL-u-ca-hebrew', { month: 'long', year: 'numeric' });

    const vd = this._hcViewDate || new Date();
    this._hcViewDate = vd;
    const year = vd.getFullYear(), month = vd.getMonth();
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const startDay = first.getDay();
    const today = new Date();
    const todayISO = Utils.todayISO();

    const hebMonthStr = hebMonth.format(first);
    const gregMonth = vd.toLocaleDateString('he-IL', { month: 'long', year: 'numeric' });

    const typeColors = { shabbat: 'primary', chag: 'danger', fast: 'secondary' };
    const typeLabels = { shabbat: '\u05E9\u05D1\u05EA', chag: '\u05D7\u05D2', fast: '\u05E6\u05D5\u05DD' };

    // Get holiday for a date
    const getHolidayForDate = (dateISO) => {
      for (const h of this._hcHolidays) {
        if (h.gDates.includes(dateISO)) return h;
      }
      return null;
    };

    // Get event for a date
    const getEventForDate = (dateISO) => this._hcEvents.filter(e => e.date === dateISO);

    // Find next holiday
    const upcomingHolidays = [];
    for (let i = 0; i < 90; i++) {
      const dt = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
      const iso = dt.toISOString().slice(0, 10);
      const hol = getHolidayForDate(iso);
      if (hol && !upcomingHolidays.find(u => u.name === hol.name)) {
        upcomingHolidays.push({ ...hol, date: iso, daysUntil: i, hebDate: hebFmt.format(dt), gregDate: dt.toLocaleDateString('he-IL') });
      }
    }
    const nextHoliday = upcomingHolidays[0];
    const daysUntilNext = nextHoliday ? nextHoliday.daysUntil : '-';

    // Find current week's parsha
    const getShabbatDate = () => {
      const d = new Date(today);
      d.setDate(d.getDate() + (6 - d.getDay()));
      return d.toISOString().slice(0, 10);
    };
    const shabbatDate = getShabbatDate();
    const currentParsha = this._hcParshiot[shabbatDate] || '';

    // Build calendar grid
    let calendarRows = '';
    let cellCount = 0;
    calendarRows += '<tr>';
    for (let i = 0; i < startDay; i++) { calendarRows += '<td class="bg-light"></td>'; cellCount++; }
    for (let d = 1; d <= last.getDate(); d++) {
      const dt = new Date(year, month, d);
      const iso = dt.toISOString().slice(0, 10);
      const isToday = iso === todayISO;
      const isShabbat = dt.getDay() === 6;
      const hol = getHolidayForDate(iso);
      const events = getEventForDate(iso);
      const hebD = hebDay.format(dt);

      let bgClass = '';
      let borderClass = isToday ? 'border border-3 border-primary rounded' : '';
      if (isShabbat) bgClass = 'bg-primary bg-opacity-10';
      else if (hol && hol.type === 'chag') bgClass = 'bg-danger bg-opacity-10';
      else if (hol && hol.type === 'fast') bgClass = 'bg-secondary bg-opacity-10';

      calendarRows += `<td class="${bgClass} ${borderClass} position-relative" style="height:72px;vertical-align:top;cursor:default">
        <div class="d-flex justify-content-between px-1">
          <span class="fw-bold small ${isShabbat ? 'text-primary' : ''}">${d}</span>
          <span class="small text-muted">${hebD}</span>
        </div>
        ${hol ? `<div class="small fw-bold text-${typeColors[hol.type]} text-truncate px-1" style="font-size:0.7rem">${hol.name}</div>` : ''}
        ${events.map(e => `<div class="small text-truncate px-1" style="font-size:0.65rem"><span class="badge bg-info p-0 px-1">\u25CF</span> ${e.title}</div>`).join('')}
      </td>`;
      cellCount++;
      if (cellCount % 7 === 0 && d < last.getDate()) calendarRows += '</tr><tr>';
    }
    const remaining = (7 - cellCount % 7) % 7;
    for (let i = 0; i < remaining; i++) calendarRows += '<td class="bg-light"></td>';
    calendarRows += '</tr>';

    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div><h1><i class="bi bi-calendar-heart me-2"></i>\u05DC\u05D5\u05D7 \u05E9\u05E0\u05D4 \u05E2\u05D1\u05E8\u05D9</h1><p class="text-muted mb-0">\u05DC\u05D5\u05D7 \u05E9\u05E0\u05D4 \u05E2\u05D1\u05E8\u05D9 \u05E2\u05DD \u05D7\u05D2\u05D9\u05DD, \u05D0\u05D9\u05E8\u05D5\u05E2\u05D9\u05DD \u05D5\u05E4\u05E8\u05E9\u05EA \u05D4\u05E9\u05D1\u05D5\u05E2</p></div>
      <div class="btn-group btn-group-sm">
        <button class="btn btn-outline-primary" onclick="Pages._hcNav(-1)"><i class="bi bi-chevron-right"></i></button>
        <button class="btn btn-outline-primary" onclick="Pages._hcToday()">\u05D4\u05D9\u05D5\u05DD</button>
        <button class="btn btn-outline-primary" onclick="Pages._hcNav(1)"><i class="bi bi-chevron-left"></i></button>
      </div>
    </div>

    <!-- Stats Row -->
    <div class="row g-3 mb-3">
      <div class="col-6 col-md-3">
        <div class="card p-3 text-center">
          <div class="fs-2 fw-bold text-primary">${daysUntilNext}</div>
          <small class="text-muted">\u05D9\u05DE\u05D9\u05DD \u05DC${nextHoliday ? nextHoliday.name : '\u05D7\u05D2 \u05D4\u05D1\u05D0'}</small>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card p-3 text-center">
          <div class="fs-5 fw-bold text-success">${currentParsha || '-'}</div>
          <small class="text-muted">\u05E4\u05E8\u05E9\u05EA \u05D4\u05E9\u05D1\u05D5\u05E2</small>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card p-3 text-center">
          <div class="fs-5 fw-bold text-info">${hebMonthStr}</div>
          <small class="text-muted">\u05D7\u05D5\u05D3\u05E9 \u05E2\u05D1\u05E8\u05D9</small>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card p-3 text-center">
          <div class="fs-5 fw-bold text-warning">${gregMonth}</div>
          <small class="text-muted">\u05D7\u05D5\u05D3\u05E9 \u05DC\u05D5\u05E2\u05D6\u05D9</small>
        </div>
      </div>
    </div>

    <!-- Month Title -->
    <div class="text-center mb-2">
      <h4 class="fw-bold mb-0">${hebMonthStr}</h4>
      <small class="text-muted">${gregMonth}</small>
    </div>

    <!-- Legend -->
    <div class="d-flex gap-2 justify-content-center mb-3 flex-wrap">
      <span class="badge bg-primary bg-opacity-10 text-primary border">\u05E9\u05D1\u05EA</span>
      <span class="badge bg-danger bg-opacity-10 text-danger border">\u05D7\u05D2</span>
      <span class="badge bg-secondary bg-opacity-10 text-secondary border">\u05E6\u05D5\u05DD</span>
      <span class="badge bg-info bg-opacity-10 text-info border">\u25CF \u05D0\u05D9\u05E8\u05D5\u05E2</span>
    </div>

    <!-- Calendar Grid -->
    <div class="card mb-4">
      <div class="table-responsive">
        <table class="table table-bordered text-center mb-0" style="table-layout:fixed">
          <thead class="table-light">
            <tr>
              <th>\u05D0\u05F3</th><th>\u05D1\u05F3</th><th>\u05D2\u05F3</th><th>\u05D3\u05F3</th><th>\u05D4\u05F3</th><th>\u05D5\u05F3</th><th class="text-primary">\u05E9\u05D1\u05EA</th>
            </tr>
          </thead>
          <tbody>${calendarRows}</tbody>
        </table>
      </div>
    </div>

    <!-- Weekly Parsha -->
    ${currentParsha ? `
    <div class="card mb-4 border-primary">
      <div class="card-body d-flex align-items-center gap-3">
        <div class="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center" style="width:48px;height:48px">
          <i class="bi bi-book text-primary fs-4"></i>
        </div>
        <div>
          <h6 class="fw-bold mb-0">\u05E4\u05E8\u05E9\u05EA \u05D4\u05E9\u05D1\u05D5\u05E2: ${currentParsha}</h6>
          <small class="text-muted">\u05E9\u05D1\u05EA ${shabbatDate}</small>
        </div>
      </div>
    </div>` : ''}

    <!-- Upcoming Holidays -->
    <h5 class="fw-bold mb-3"><i class="bi bi-calendar-event me-2"></i>\u05D7\u05D2\u05D9\u05DD \u05D5\u05D0\u05D9\u05E8\u05D5\u05E2\u05D9\u05DD \u05E7\u05E8\u05D5\u05D1\u05D9\u05DD (90 \u05D9\u05D5\u05DD)</h5>
    ${upcomingHolidays.length ? `
    <div class="card">
      <div class="list-group list-group-flush">
        ${upcomingHolidays.map(u => `
          <div class="list-group-item d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center gap-2">
              <span class="badge bg-${typeColors[u.type]}">${typeLabels[u.type]}</span>
              <strong>${u.name}</strong>
            </div>
            <div class="d-flex align-items-center gap-3">
              <small class="text-muted">${u.gregDate}</small>
              <small class="text-muted">${u.hebDate}</small>
              <span class="badge bg-primary bg-opacity-10 text-primary">${u.daysUntil === 0 ? '\u05D4\u05D9\u05D5\u05DD!' : '\u05D1\u05E2\u05D5\u05D3 ' + u.daysUntil + ' \u05D9\u05DE\u05D9\u05DD'}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>` : '<p class="text-muted">\u05D0\u05D9\u05DF \u05D7\u05D2\u05D9\u05DD \u05E7\u05E8\u05D5\u05D1\u05D9\u05DD</p>'}`;
  },

  hebrewcalInit() {},

  _hcNav(dir) {
    if (!this._hcViewDate) this._hcViewDate = new Date();
    this._hcViewDate.setMonth(this._hcViewDate.getMonth() + dir);
    App.loadPage('hebrewcal');
  },

  _hcToday() {
    this._hcViewDate = new Date();
    App.loadPage('hebrewcal');
  }
});
