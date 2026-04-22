/* ===== BHT v5.3 — Hebrew Calendar (לוח שנה עברי) ===== */
Object.assign(Pages, {
  _hcViewDate: null,
  _hcEvents: [
    { date: '2026-04-26', title: 'מסיבת הורים', type: 'event', color: '#2563eb' },
    { date: '2026-04-30', title: 'מבחן חודשי', type: 'event', color: '#ef4444' },
    { date: '2026-05-05', title: 'טיול שנתי', type: 'event', color: '#16a34a' },
    { date: '2026-05-10', title: 'אסיפת ציונים', type: 'event', color: '#f59e0b' },
    { date: '2026-05-14', title: 'יום ספורט', type: 'event', color: '#06b6d4' },
    { date: '2026-05-20', title: 'יום פתוח', type: 'event', color: '#9333ea' },
    { date: '2026-06-01', title: 'סיום זמן', type: 'event', color: '#ec4899' },
    { date: '2026-04-23', title: 'ישיבת צוות', type: 'event', color: '#8b5cf6' },
    { date: '2026-04-28', title: 'הרצאת הורים', type: 'event', color: '#14b8a6' }
  ],

  // Complete 5786 holiday database
  _hcHolidays: [
    { name: 'ראש השנה א׳', type: 'chag', gDates: ['2025-09-23'], emoji: '' },
    { name: 'ראש השנה ב׳', type: 'chag', gDates: ['2025-09-24'], emoji: '' },
    { name: 'צום גדליה', type: 'fast', gDates: ['2025-09-25'], emoji: '' },
    { name: 'יום כיפור', type: 'chag', gDates: ['2025-10-02'], emoji: '' },
    { name: 'סוכות א׳', type: 'chag', gDates: ['2025-10-07'], emoji: '' },
    { name: 'סוכות ב׳', type: 'chag', gDates: ['2025-10-08'], emoji: '' },
    { name: 'חול המועד סוכות', type: 'chol_hamoed', gDates: ['2025-10-09', '2025-10-10', '2025-10-11', '2025-10-12', '2025-10-13'], emoji: '' },
    { name: 'הושענא רבה', type: 'chag', gDates: ['2025-10-13'], emoji: '' },
    { name: 'שמיני עצרת', type: 'chag', gDates: ['2025-10-14'], emoji: '' },
    { name: 'שמחת תורה', type: 'chag', gDates: ['2025-10-15'], emoji: '' },
    { name: 'חנוכה א׳', type: 'chag', gDates: ['2025-12-15'], emoji: '' },
    { name: 'חנוכה', type: 'chag', gDates: ['2025-12-16', '2025-12-17', '2025-12-18', '2025-12-19', '2025-12-20', '2025-12-21', '2025-12-22'], emoji: '' },
    { name: 'צום טבת', type: 'fast', gDates: ['2026-01-04'], emoji: '' },
    { name: 'ט"ו בשבט', type: 'chag', gDates: ['2026-02-09'], emoji: '' },
    { name: 'תענית אסתר', type: 'fast', gDates: ['2026-03-02'], emoji: '' },
    { name: 'פורים', type: 'chag', gDates: ['2026-03-03'], emoji: '' },
    { name: 'שושן פורים', type: 'chag', gDates: ['2026-03-04'], emoji: '' },
    { name: 'פסח א׳', type: 'chag', gDates: ['2026-04-02'], emoji: '' },
    { name: 'פסח ב׳', type: 'chag', gDates: ['2026-04-03'], emoji: '' },
    { name: 'חול המועד פסח', type: 'chol_hamoed', gDates: ['2026-04-04', '2026-04-05', '2026-04-06', '2026-04-07'], emoji: '' },
    { name: 'שביעי של פסח', type: 'chag', gDates: ['2026-04-08'], emoji: '' },
    { name: 'אחרון של פסח', type: 'chag', gDates: ['2026-04-09'], emoji: '' },
    { name: 'יום השואה', type: 'memorial', gDates: ['2026-04-22'], emoji: '' },
    { name: 'יום הזיכרון', type: 'memorial', gDates: ['2026-04-29'], emoji: '' },
    { name: 'יום העצמאות', type: 'chag', gDates: ['2026-04-30'], emoji: '' },
    { name: 'פסח שני', type: 'minor', gDates: ['2026-05-02'], emoji: '' },
    { name: 'ל"ג בעומר', type: 'chag', gDates: ['2026-05-12'], emoji: '' },
    { name: 'יום ירושלים', type: 'chag', gDates: ['2026-05-22'], emoji: '' },
    { name: 'שבועות א׳', type: 'chag', gDates: ['2026-05-22'], emoji: '' },
    { name: 'שבועות ב׳', type: 'chag', gDates: ['2026-05-23'], emoji: '' },
    { name: 'צום י"ז בתמוז', type: 'fast', gDates: ['2026-07-07'], emoji: '' },
    { name: 'תשעה באב', type: 'fast', gDates: ['2026-07-28'], emoji: '' },
    { name: 'ט"ו באב', type: 'minor', gDates: ['2026-08-04'], emoji: '' }
  ],

  // Weekly parsha list for 5786
  _hcParshiot: {
    '2026-04-11': 'צו',
    '2026-04-18': 'שמיני',
    '2026-04-25': 'תזריע-מצורע',
    '2026-05-02': 'אחרי מות-קדושים',
    '2026-05-09': 'אמור',
    '2026-05-16': 'בהר-בחקותי',
    '2026-05-23': 'במדבר',
    '2026-05-30': 'נשא',
    '2026-06-06': 'בהעלותך',
    '2026-06-13': 'שלח-לך',
    '2026-06-20': 'קרח',
    '2026-06-27': 'חקת-בלק',
    '2026-07-04': 'פינחס',
    '2026-07-11': 'מטות-מסעי',
    '2026-07-18': 'דברים',
    '2026-07-25': 'ואתחנן',
    '2026-08-01': 'עקב',
    '2026-08-08': 'ראה',
    '2026-08-15': 'שופטים',
    '2026-08-22': 'כי תצא',
    '2026-08-29': 'כי תבוא',
    '2026-09-05': 'נצבים-וילך'
  },

  // Approximate zmanim for Jerusalem (hardcoded for simplicity)
  _hcZmanim: {
    1: { sunrise: '06:38', sunset: '16:54', candleLighting: '16:34' },
    2: { sunrise: '06:22', sunset: '17:17', candleLighting: '16:57' },
    3: { sunrise: '05:55', sunset: '17:38', candleLighting: '17:18' },
    4: { sunrise: '06:26', sunset: '19:01', candleLighting: '18:41' },  // after DST
    5: { sunrise: '05:50', sunset: '19:22', candleLighting: '19:02' },
    6: { sunrise: '05:18', sunset: '19:41', candleLighting: '19:21' },
    7: { sunrise: '04:57', sunset: '19:50', candleLighting: '19:30' },
    8: { sunrise: '05:02', sunset: '19:44', candleLighting: '19:24' },
    9: { sunrise: '05:22', sunset: '19:22', candleLighting: '19:02' },
    10: { sunrise: '05:46', sunset: '18:48', candleLighting: '18:28' },
    11: { sunrise: '06:10', sunset: '17:13', candleLighting: '16:53' },  // after DST end
    12: { sunrise: '06:33', sunset: '16:50', candleLighting: '16:30' }
  },

  // Omer count (Pesach second day = day 1: April 3, 2026)
  _hcOmerStart: '2026-04-03',

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

    const typeColors = { shabbat: 'primary', chag: 'danger', fast: 'secondary', chol_hamoed: 'info', memorial: 'dark', minor: 'warning' };
    const typeLabels = { shabbat: 'שבת', chag: 'חג', fast: 'צום', chol_hamoed: 'חוה"מ', memorial: 'זיכרון', minor: 'מועד' };

    // Get holidays for a date
    const getHolidaysForDate = (dateISO) => {
      return this._hcHolidays.filter(h => h.gDates.includes(dateISO));
    };

    // Get events for a date
    const getEventsForDate = (dateISO) => this._hcEvents.filter(e => e.date === dateISO);

    // Find next parsha
    const getShabbatDate = () => {
      const d = new Date(today);
      d.setDate(d.getDate() + (6 - d.getDay()));
      return d.toISOString().slice(0, 10);
    };
    const shabbatDate = getShabbatDate();
    const currentParsha = this._hcParshiot[shabbatDate] || '';

    // Omer count
    const omerStartDate = new Date(this._hcOmerStart);
    const todayDate = new Date(todayISO);
    const omerDay = Math.floor((todayDate - omerStartDate) / 86400000) + 1;
    const isOmerPeriod = omerDay >= 1 && omerDay <= 49;

    // Zmanim for current month
    const monthZmanim = this._hcZmanim[month + 1] || { sunrise: '-', sunset: '-', candleLighting: '-' };

    // Find upcoming holidays (next 120 days)
    const upcomingHolidays = [];
    const seenNames = new Set();
    for (let i = 0; i < 120; i++) {
      const dt = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
      const iso = dt.toISOString().slice(0, 10);
      const hols = getHolidaysForDate(iso);
      for (const hol of hols) {
        if (!seenNames.has(hol.name)) {
          seenNames.add(hol.name);
          upcomingHolidays.push({ ...hol, date: iso, daysUntil: i, hebDate: hebFmt.format(dt), gregDate: dt.toLocaleDateString('he-IL') });
        }
      }
    }
    const nextHoliday = upcomingHolidays[0];
    const daysUntilNext = nextHoliday ? nextHoliday.daysUntil : '-';

    // Events this month
    const monthEvents = this._hcEvents.filter(e => {
      const d = new Date(e.date);
      return d.getFullYear() === year && d.getMonth() === month;
    });

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
      const isFriday = dt.getDay() === 5;
      const hols = getHolidaysForDate(iso);
      const events = getEventsForDate(iso);
      const hebD = hebDay.format(dt);

      // Omer for this day
      const dayOmer = Math.floor((dt - omerStartDate) / 86400000) + 1;
      const showOmer = dayOmer >= 1 && dayOmer <= 49;

      let bgClass = '';
      let borderClass = isToday ? 'border border-3 border-primary rounded' : '';
      if (isShabbat) bgClass = 'bg-primary bg-opacity-10';
      else if (hols.some(h => h.type === 'chag')) bgClass = 'bg-danger bg-opacity-10';
      else if (hols.some(h => h.type === 'fast')) bgClass = 'bg-secondary bg-opacity-10';
      else if (hols.some(h => h.type === 'chol_hamoed')) bgClass = 'bg-info bg-opacity-10';
      else if (hols.some(h => h.type === 'memorial')) bgClass = 'bg-dark bg-opacity-10';

      calendarRows += `<td class="${bgClass} ${borderClass} position-relative" style="height:88px;vertical-align:top;cursor:default">
        <div class="d-flex justify-content-between px-1">
          <span class="fw-bold small ${isShabbat ? 'text-primary' : isToday ? 'text-white bg-primary rounded-circle px-1' : ''}">${d}</span>
          <span class="small text-muted">${hebD}</span>
        </div>
        ${hols.map(h => `<div class="small fw-bold text-${typeColors[h.type] || 'dark'} text-truncate px-1" style="font-size:0.65rem">${h.name}</div>`).join('')}
        ${events.map(e => `<div class="small text-truncate px-1" style="font-size:0.6rem"><span class="d-inline-block rounded-circle me-1" style="width:6px;height:6px;background:${e.color}"></span>${e.title}</div>`).join('')}
        ${showOmer ? `<div class="position-absolute bottom-0 start-0 px-1" style="font-size:0.55rem"><span class="text-muted">${dayOmer}</span></div>` : ''}
        ${isFriday ? `<div class="position-absolute bottom-0 end-0 px-1" style="font-size:0.55rem"><span class="text-warning"><i class="bi bi-brightness-high"></i></span></div>` : ''}
      </td>`;
      cellCount++;
      if (cellCount % 7 === 0 && d < last.getDate()) calendarRows += '</tr><tr>';
    }
    const remaining = (7 - cellCount % 7) % 7;
    for (let i = 0; i < remaining; i++) calendarRows += '<td class="bg-light"></td>';
    calendarRows += '</tr>';

    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div><h1><i class="bi bi-calendar-heart me-2"></i>לוח שנה עברי</h1><p class="text-muted mb-0">לוח שנה עברי עם חגים, אירועים, זמנים ופרשת השבוע</p></div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-secondary btn-sm" onclick="window.print()" title="הדפסה"><i class="bi bi-printer"></i></button>
        <div class="btn-group btn-group-sm">
          <button class="btn btn-outline-primary" onclick="Pages._hcNav(-1)"><i class="bi bi-chevron-right"></i></button>
          <button class="btn btn-primary" onclick="Pages._hcToday()">היום</button>
          <button class="btn btn-outline-primary" onclick="Pages._hcNav(1)"><i class="bi bi-chevron-left"></i></button>
        </div>
      </div>
    </div>

    <!-- Stats Row -->
    <div class="row g-3 mb-3">
      <div class="col-6 col-md-2">
        <div class="card p-3 text-center">
          <div class="fs-2 fw-bold text-primary">${daysUntilNext}</div>
          <small class="text-muted">ימים ל${nextHoliday ? nextHoliday.name : 'חג הבא'}</small>
        </div>
      </div>
      <div class="col-6 col-md-2">
        <div class="card p-3 text-center">
          <div class="fs-5 fw-bold text-success">${currentParsha || '-'}</div>
          <small class="text-muted">פרשת השבוע</small>
        </div>
      </div>
      <div class="col-6 col-md-2">
        <div class="card p-3 text-center">
          <div class="fs-5 fw-bold text-info">${hebMonthStr}</div>
          <small class="text-muted">חודש עברי</small>
        </div>
      </div>
      <div class="col-6 col-md-2">
        <div class="card p-3 text-center">
          <div class="fs-6 fw-bold text-warning"><i class="bi bi-sunrise me-1"></i>${monthZmanim.sunrise}</div>
          <small class="text-muted">נץ החמה</small>
        </div>
      </div>
      <div class="col-6 col-md-2">
        <div class="card p-3 text-center">
          <div class="fs-6 fw-bold text-danger"><i class="bi bi-sunset me-1"></i>${monthZmanim.sunset}</div>
          <small class="text-muted">שקיעה</small>
        </div>
      </div>
      <div class="col-6 col-md-2">
        <div class="card p-3 text-center">
          <div class="fs-6 fw-bold text-secondary">${isOmerPeriod ? `יום ${omerDay}` : '-'}</div>
          <small class="text-muted">ספירת העומר</small>
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
      <span class="badge bg-primary bg-opacity-10 text-primary border">שבת</span>
      <span class="badge bg-danger bg-opacity-10 text-danger border">חג</span>
      <span class="badge bg-secondary bg-opacity-10 text-secondary border">צום</span>
      <span class="badge bg-info bg-opacity-10 text-info border">חוה"מ</span>
      <span class="badge bg-dark bg-opacity-10 text-dark border">זיכרון</span>
      <span class="badge bg-warning bg-opacity-10 text-warning border">מועד</span>
    </div>

    <!-- Calendar Grid -->
    <div class="card mb-4">
      <div class="table-responsive">
        <table class="table table-bordered text-center mb-0" style="table-layout:fixed" id="hc-grid">
          <thead class="table-light">
            <tr>
              <th>א׳</th><th>ב׳</th><th>ג׳</th><th>ד׳</th><th>ה׳</th><th>ו׳</th><th class="text-primary">שבת</th>
            </tr>
          </thead>
          <tbody>${calendarRows}</tbody>
        </table>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-lg-6">
        <!-- Weekly Parsha -->
        ${currentParsha ? `
        <div class="card mb-4 border-primary">
          <div class="card-body d-flex align-items-center gap-3">
            <div class="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center" style="width:56px;height:56px">
              <i class="bi bi-book text-primary fs-3"></i>
            </div>
            <div>
              <h5 class="fw-bold mb-0">פרשת השבוע: ${currentParsha}</h5>
              <small class="text-muted">שבת ${shabbatDate}</small>
              <div class="small text-muted mt-1"><i class="bi bi-brightness-high me-1"></i>הדלקת נרות: ${monthZmanim.candleLighting}</div>
            </div>
          </div>
        </div>` : ''}

        <!-- Zmanim Card -->
        <div class="card mb-4">
          <div class="card-header bg-warning bg-opacity-10"><h6 class="fw-bold mb-0"><i class="bi bi-clock me-2"></i>זמנים — ${gregMonth}</h6></div>
          <div class="card-body">
            <div class="row g-2 text-center">
              <div class="col-4">
                <div class="card p-2 bg-light">
                  <i class="bi bi-sunrise text-warning fs-4"></i>
                  <div class="fw-bold">${monthZmanim.sunrise}</div>
                  <small class="text-muted">נץ החמה</small>
                </div>
              </div>
              <div class="col-4">
                <div class="card p-2 bg-light">
                  <i class="bi bi-sunset text-danger fs-4"></i>
                  <div class="fw-bold">${monthZmanim.sunset}</div>
                  <small class="text-muted">שקיעה</small>
                </div>
              </div>
              <div class="col-4">
                <div class="card p-2 bg-light">
                  <i class="bi bi-lamp text-info fs-4"></i>
                  <div class="fw-bold">${monthZmanim.candleLighting}</div>
                  <small class="text-muted">הדלקת נרות</small>
                </div>
              </div>
            </div>
            <div class="mt-3 small text-muted text-center">
              <i class="bi bi-geo-alt me-1"></i>זמנים משוערים לאזור ירושלים
            </div>
          </div>
        </div>

        <!-- Events This Month -->
        <div class="card mb-4">
          <div class="card-header bg-info bg-opacity-10"><h6 class="fw-bold mb-0"><i class="bi bi-calendar-event me-2"></i>אירועים בחודש (${monthEvents.length})</h6></div>
          ${monthEvents.length ? `
          <div class="list-group list-group-flush">
            ${monthEvents.sort((a, b) => a.date.localeCompare(b.date)).map(e => `
              <div class="list-group-item d-flex align-items-center gap-2">
                <span class="d-inline-block rounded-circle" style="width:10px;height:10px;background:${e.color};flex-shrink:0"></span>
                <div class="flex-grow-1">
                  <strong class="small">${e.title}</strong>
                  <div class="small text-muted">${e.date}</div>
                </div>
              </div>
            `).join('')}
          </div>` : '<div class="card-body text-muted small text-center">אין אירועים בחודש זה</div>'}
        </div>
      </div>

      <div class="col-lg-6">
        <!-- Upcoming Holidays -->
        <div class="card mb-4">
          <div class="card-header bg-danger bg-opacity-10"><h6 class="fw-bold mb-0"><i class="bi bi-calendar-heart me-2"></i>חגים ומועדים קרובים (120 יום)</h6></div>
          ${upcomingHolidays.length ? `
          <div class="list-group list-group-flush">
            ${upcomingHolidays.map(u => {
              const badgeColor = typeColors[u.type] || 'secondary';
              const badgeLabel = typeLabels[u.type] || u.type;
              return `
              <div class="list-group-item">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center gap-2">
                    <span class="badge bg-${badgeColor}">${badgeLabel}</span>
                    <strong>${u.name}</strong>
                  </div>
                  <span class="badge bg-primary bg-opacity-10 text-primary">${u.daysUntil === 0 ? 'היום!' : 'בעוד ' + u.daysUntil + ' ימים'}</span>
                </div>
                <div class="d-flex justify-content-between mt-1">
                  <small class="text-muted">${u.gregDate}</small>
                  <small class="text-muted">${u.hebDate}</small>
                </div>
                ${u.daysUntil <= 14 ? `<div class="progress mt-1" style="height:4px"><div class="progress-bar bg-${badgeColor}" style="width:${Math.max(100 - u.daysUntil * 7, 10)}%"></div></div>` : ''}
              </div>`;
            }).join('')}
          </div>` : '<div class="card-body text-muted small text-center">אין חגים קרובים</div>'}
        </div>

        <!-- Omer Counter -->
        ${isOmerPeriod ? `
        <div class="card mb-4 border-warning">
          <div class="card-header bg-warning bg-opacity-10"><h6 class="fw-bold mb-0"><i class="bi bi-hash me-2"></i>ספירת העומר</h6></div>
          <div class="card-body text-center">
            <div class="fs-1 fw-bold text-warning">${omerDay}</div>
            <div class="small text-muted mb-2">יום ${omerDay} לעומר</div>
            <div class="small text-muted">${Math.floor((omerDay - 1) / 7)} שבועות ו-${(omerDay - 1) % 7 + 1 === 7 ? 0 : (omerDay - 1) % 7} ימים</div>
            <div class="progress mt-2" style="height:8px">
              <div class="progress-bar bg-warning" style="width:${Math.round(omerDay / 49 * 100)}%"></div>
            </div>
            <small class="text-muted">${Math.round(omerDay / 49 * 100)}% עד שבועות</small>
          </div>
        </div>` : ''}

        <!-- Parsha Schedule -->
        <div class="card mb-4">
          <div class="card-header bg-primary bg-opacity-10"><h6 class="fw-bold mb-0"><i class="bi bi-book me-2"></i>פרשיות הקרובות</h6></div>
          <div class="list-group list-group-flush">
            ${Object.entries(this._hcParshiot).filter(([date]) => date >= todayISO).slice(0, 8).map(([date, parsha]) => {
              const d = new Date(date);
              const isThisWeek = date === shabbatDate;
              return `
              <div class="list-group-item d-flex justify-content-between align-items-center ${isThisWeek ? 'bg-primary bg-opacity-5' : ''}">
                <div>
                  <strong class="${isThisWeek ? 'text-primary' : ''}">${parsha}</strong>
                  ${isThisWeek ? ' <span class="badge bg-primary small">השבוע</span>' : ''}
                </div>
                <small class="text-muted">${date}</small>
              </div>`;
            }).join('')}
          </div>
        </div>
      </div>
    </div>`;
  },

  hebrewcalInit() {},

  _hcNav(dir) {
    if (!this._hcViewDate) this._hcViewDate = new Date();
    this._hcViewDate = new Date(this._hcViewDate.getFullYear(), this._hcViewDate.getMonth() + dir, 1);
    App.loadPage('hebrewcal');
  },

  _hcToday() {
    this._hcViewDate = new Date();
    App.loadPage('hebrewcal');
  }
});
