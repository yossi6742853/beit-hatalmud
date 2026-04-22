/* ===== BHT v5.4 — Staff (Enhanced) ===== */
Object.assign(Pages, {

  /* ======================================================================
     DEMO DATA
     ====================================================================== */
  _staffDemoData: [
    { שם_פרטי:'אברהם', שם_משפחה:'כהן', תפקיד:'מורה', טלפון:'0501234567', אימייל:'avraham@bht.org', סטטוס:'פעיל', תאריך_התחלה:'2019-09-01', כישורים:'תעודת הוראה, תואר ראשון', כיתות:'א,ב,ג', משכורת_בסיס:8500, בונוסים:500, ניכויים:850, הערות:'ותיק במוסד' },
    { שם_פרטי:'יצחק', שם_משפחה:'לוי', תפקיד:'רב', טלפון:'0529876543', אימייל:'yitzchak@bht.org', סטטוס:'פעיל', תאריך_התחלה:'2018-03-15', כישורים:'סמיכה לרבנות, דיינות', כיתות:'ד,ה', משכורת_בסיס:9500, בונוסים:0, ניכויים:950, הערות:'ר"מ בכיר' },
    { שם_פרטי:'יעקב', שם_משפחה:'ישראלי', תפקיד:'מנהל', טלפון:'0531112233', אימייל:'yaakov@bht.org', סטטוס:'פעיל', תאריך_התחלה:'2017-01-10', כישורים:'MBA, ניהול חינוכי', כיתות:'', משכורת_בסיס:12000, בונוסים:1500, ניכויים:1350, הערות:'מנהל המוסד' },
    { שם_פרטי:'משה', שם_משפחה:'פרידמן', תפקיד:'מורה', טלפון:'0541234567', אימייל:'moshe@bht.org', סטטוס:'פעיל', תאריך_התחלה:'2021-09-01', כישורים:'תעודת הוראה', כיתות:'ג,ד', משכורת_בסיס:7800, בונוסים:300, ניכויים:810, הערות:'' },
    { שם_פרטי:'דוד', שם_משפחה:'שוורץ', תפקיד:'עוזר הוראה', טלפון:'0551234567', אימייל:'david@bht.org', סטטוס:'פעיל', תאריך_התחלה:'2023-09-01', כישורים:'סטודנט שנה ג', כיתות:'א,ב', משכורת_בסיס:5500, בונוסים:0, ניכויים:550, הערות:'עוזר הוראה' },
    { שם_פרטי:'שמעון', שם_משפחה:'גולדשטיין', תפקיד:'רב', טלפון:'0521234567', אימייל:'shimon@bht.org', סטטוס:'פעיל', תאריך_התחלה:'2020-09-01', כישורים:'סמיכה לרבנות', כיתות:'ו', משכורת_בסיס:9000, בונוסים:400, ניכויים:940, הערות:'מגיד שיעור' },
    { שם_פרטי:'ראובן', שם_משפחה:'ברגר', תפקיד:'תחזוקה', טלפון:'0501112233', אימייל:'', סטטוס:'פעיל', תאריך_התחלה:'2022-01-15', כישורים:'חשמלאי מוסמך', כיתות:'', משכורת_בסיס:6500, בונוסים:200, ניכויים:670, הערות:'אחראי תחזוקת מבנה' },
    { שם_פרטי:'נפתלי', שם_משפחה:'וייס', תפקיד:'מנהל', טלפון:'0541112233', אימייל:'naftali@bht.org', סטטוס:'לא_פעיל', תאריך_התחלה:'2016-09-01', כישורים:'MBA, חשבונאות', כיתות:'', משכורת_בסיס:11000, בונוסים:0, ניכויים:1100, הערות:'חופשה ללא תשלום' },
    { שם_פרטי:'גד', שם_משפחה:'רוזנברג', תפקיד:'עוזר הוראה', טלפון:'0551112233', אימייל:'gad@bht.org', סטטוס:'פעיל', תאריך_התחלה:'2024-09-01', כישורים:'סטודנט שנה ב', כיתות:'ד,ה', משכורת_בסיס:5000, בונוסים:0, ניכויים:500, הערות:'' },
    { שם_פרטי:'אשר', שם_משפחה:'הלפרין', תפקיד:'תחזוקה', טלפון:'0501234568', אימייל:'', סטטוס:'פעיל', תאריך_התחלה:'2023-03-01', כישורים:'שרברב מוסמך, מיזוג', כיתות:'', משכורת_בסיס:6200, בונוסים:150, ניכויים:635, הערות:'אחראי מיזוג ואינסטלציה' }
  ],

  /* ======================================================================
     ROLE DEFINITIONS
     ====================================================================== */
  _staffRoles: [
    { key: 'מורה',       icon: 'bi-book',          color: 'primary' },
    { key: 'מנהל',       icon: 'bi-briefcase',     color: 'info' },
    { key: 'תחזוקה',     icon: 'bi-tools',         color: 'secondary' },
    { key: 'רב',         icon: 'bi-mortarboard',   color: 'success' },
    { key: 'עוזר הוראה', icon: 'bi-person-plus',   color: 'warning' }
  ],

  /* ======================================================================
     STAFF MAIN PAGE
     ====================================================================== */
  staff() {
    const roleFilters = this._staffRoles.map(r =>
      `<button class="btn btn-outline-${r.color} btn-sm staff-role-filter" data-role="${r.key}" onclick="Pages.toggleRoleFilter('${r.key}',this)"><i class="bi ${r.icon} me-1"></i>${r.key}</button>`
    ).join('');

    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div><h1><i class="bi bi-person-badge-fill me-2"></i>צוות</h1><p id="staff-count"></p></div>
      <div class="d-flex gap-2 flex-wrap">
        <button class="btn btn-primary btn-sm" onclick="Pages.showAddStaff()"><i class="bi bi-plus-lg me-1"></i>הוסף עובד</button>
        <button class="btn btn-outline-info btn-sm" onclick="Pages.toggleStaffView('schedule')"><i class="bi bi-calendar-week me-1"></i>מערכת שעות</button>
        <button class="btn btn-outline-success btn-sm" onclick="Pages.toggleStaffView('salary')"><i class="bi bi-cash-stack me-1"></i>שכר</button>
        <button class="btn btn-outline-warning btn-sm" onclick="Pages.toggleStaffView('attendance')"><i class="bi bi-calendar-check me-1"></i>נוכחות</button>
        <button class="btn btn-outline-secondary btn-sm" onclick="Pages.exportStaffCSV()"><i class="bi bi-download me-1"></i>ייצוא CSV</button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="row g-3 mb-3" id="staff-stats">
      <div class="col-6 col-md-3"><div class="card stat-card p-3"><div class="stat-icon gradient-primary"><i class="bi bi-people-fill"></i></div><div class="stat-value" id="stst-total">--</div><div class="stat-label">סה"כ צוות</div></div></div>
      <div class="col-6 col-md-3"><div class="card stat-card p-3"><div class="stat-icon gradient-success"><i class="bi bi-check-circle-fill"></i></div><div class="stat-value" id="stst-active">--</div><div class="stat-label">פעילים היום</div></div></div>
      <div class="col-6 col-md-3"><div class="card stat-card p-3"><div class="stat-icon gradient-info"><i class="bi bi-clock-history"></i></div><div class="stat-value" id="stst-tenure">--</div><div class="stat-label">ממוצע ותק (שנים)</div></div></div>
      <div class="col-6 col-md-3"><div class="card stat-card p-3"><div class="stat-icon gradient-warning"><i class="bi bi-diagram-3-fill"></i></div><div class="stat-value" id="stst-roles">--</div><div class="stat-label">תפקידים</div></div></div>
    </div>

    <!-- Roles Breakdown Mini -->
    <div class="card p-3 mb-3" id="staff-roles-breakdown"></div>

    <!-- Search + Role Filters -->
    <div class="card p-3 mb-3">
      <div class="d-flex flex-wrap gap-2 align-items-center">
        <div class="search-box flex-grow-1"><i class="bi bi-search"></i><input type="text" class="form-control" id="staff-search" placeholder="חיפוש איש צוות..."></div>
        <div class="d-flex gap-1 flex-wrap">${roleFilters}
          <button class="btn btn-outline-dark btn-sm staff-role-filter" data-role="" onclick="Pages.clearRoleFilter()"><i class="bi bi-x-lg me-1"></i>הכל</button>
        </div>
      </div>
    </div>

    <!-- Toggleable Sections -->
    <div id="staff-extra-section" class="mb-3" style="display:none"></div>

    <!-- Staff Grid -->
    <div id="staff-list">${Utils.skeleton(3)}</div>

    <!-- Expanded Staff Detail -->
    <div id="staff-detail-panel" class="mb-3" style="display:none"></div>`;
  },

  _staffData: [],
  _staffActiveRole: '',
  _staffExpandedId: null,
  _staffCurrentView: null,

  async staffInit() {
    let data = await App.getData('צוות');
    if (!data || data.length === 0) {
      // Use demo data
      data = this._staffDemoData.map((d, i) => ({ ...d, _row: i + 2 }));
    }
    this._staffData = data;
    this._staffActiveRole = '';
    this._staffExpandedId = null;
    this._staffCurrentView = null;
    document.getElementById('staff-search').addEventListener('input', Utils.debounce(() => this.renderStaffList(), 200));
    this.renderStaffStats();
    this.renderRolesBreakdown();
    this.renderStaffList();
  },

  /* ---------- Stats ---------- */
  renderStaffStats() {
    const data = this._staffData || [];
    const active = data.filter(s => (s['סטטוס'] || 'פעיל') === 'פעיל');
    const now = new Date();
    const tenures = active.map(s => {
      const start = s['תאריך_התחלה'] || s['תאריך_קליטה'] || '';
      if (!start) return 0;
      return (now - new Date(start)) / (365.25 * 24 * 3600000);
    }).filter(t => t > 0);
    const avgTenure = tenures.length ? (tenures.reduce((a, b) => a + b, 0) / tenures.length).toFixed(1) : '--';
    const roles = new Set(data.map(s => s['תפקיד'] || '').filter(Boolean));

    document.getElementById('stst-total').textContent = data.length;
    document.getElementById('stst-active').textContent = active.length;
    document.getElementById('stst-tenure').textContent = avgTenure;
    document.getElementById('stst-roles').textContent = roles.size;
  },

  /* ---------- Roles Breakdown ---------- */
  renderRolesBreakdown() {
    const data = this._staffData || [];
    const roleCounts = {};
    data.forEach(s => {
      const r = s['תפקיד'] || 'אחר';
      roleCounts[r] = (roleCounts[r] || 0) + 1;
    });
    const total = data.length || 1;
    const container = document.getElementById('staff-roles-breakdown');
    if (!container) return;
    container.innerHTML = `<div class="d-flex justify-content-between align-items-center mb-2"><h6 class="fw-bold mb-0"><i class="bi bi-diagram-3 me-2"></i>פילוח תפקידים</h6></div>
    <div class="d-flex flex-wrap gap-3">${Object.entries(roleCounts).map(([role, count]) => {
      const roleDef = this._staffRoles.find(r => r.key === role);
      const color = roleDef ? roleDef.color : 'secondary';
      const icon = roleDef ? roleDef.icon : 'bi-person';
      const pct = Math.round(count / total * 100);
      return `<div class="d-flex align-items-center gap-2">
        <span class="badge bg-${color} fs-6"><i class="bi ${icon} me-1"></i>${count}</span>
        <div><div class="small fw-bold">${role}</div><div class="text-muted" style="font-size:0.75rem">${pct}%</div></div>
      </div>`;
    }).join('')}</div>`;
  },

  /* ---------- Role filter ---------- */
  toggleRoleFilter(role, btn) {
    if (this._staffActiveRole === role) {
      this._staffActiveRole = '';
      btn.classList.remove('active');
    } else {
      this._staffActiveRole = role;
      document.querySelectorAll('.staff-role-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }
    this.renderStaffList();
  },
  clearRoleFilter() {
    this._staffActiveRole = '';
    document.querySelectorAll('.staff-role-filter').forEach(b => b.classList.remove('active'));
    this.renderStaffList();
  },

  /* ---------- Staff Grid ---------- */
  renderStaffList() {
    const search = (document.getElementById('staff-search')?.value || '').trim().toLowerCase();
    const role = this._staffActiveRole;
    const filtered = (this._staffData || []).filter(s => {
      const name = Utils.fullName(s).toLowerCase();
      if (search && !name.includes(search) && !(s['תפקיד'] || '').toLowerCase().includes(search) && !(s['טלפון'] || '').includes(search)) return false;
      if (role && (s['תפקיד'] || '') !== role) return false;
      return true;
    });
    document.getElementById('staff-count').textContent = `${filtered.length} אנשי צוות`;
    if (filtered.length === 0) {
      document.getElementById('staff-list').innerHTML = `<div class="empty-state"><i class="bi bi-person-badge"></i><h5>לא נמצאו</h5></div>`;
      return;
    }
    document.getElementById('staff-list').innerHTML = `<div class="row g-3">${filtered.map(s => {
      const name = Utils.fullName(s);
      const roleVal = s['תפקיד'] || '';
      const phone = s['טלפון'] || '';
      const email = s['אימייל'] || '';
      const sid = Utils.rowId(s);
      const status = s['סטטוס'] || 'פעיל';
      const isActive = status === 'פעיל';
      const roleDef = this._staffRoles.find(r => r.key === roleVal);
      const roleColor = roleDef ? roleDef.color : 'secondary';
      const roleIcon = roleDef ? roleDef.icon : 'bi-person';
      const expanded = this._staffExpandedId === sid;

      return `<div class="col-md-6 col-lg-4"><div class="card p-3 ${!isActive ? 'opacity-50' : ''}">
        <div class="d-flex align-items-center gap-3 cursor-pointer" onclick="Pages.toggleStaffDetail('${sid}')">
          ${Utils.avatarHTML(name, 'lg')}
          <div class="flex-grow-1">
            <div class="fw-bold fs-6">${name}</div>
            <div class="small"><span class="badge bg-${roleColor}"><i class="bi ${roleIcon} me-1"></i>${roleVal}</span></div>
            ${phone ? `<div class="mt-1 small"><i class="bi bi-telephone me-1"></i>${Utils.formatPhone(phone)}</div>` : ''}
            ${email ? `<div class="small text-muted"><i class="bi bi-envelope me-1"></i>${email}</div>` : ''}
          </div>
          ${Utils.statusBadge(status)}
        </div>

        <!-- Expanded Detail -->
        <div class="staff-detail-expand ${expanded ? '' : 'd-none'}" id="staff-expand-${sid}">
          <hr class="my-2">
          <div class="row g-2 small">
            <div class="col-6"><span class="text-muted">תאריך קליטה:</span><br><strong>${s['תאריך_התחלה'] || s['תאריך_קליטה'] || '--'}</strong></div>
            <div class="col-6"><span class="text-muted">כישורים:</span><br><strong>${s['כישורים'] || '--'}</strong></div>
            <div class="col-6"><span class="text-muted">כיתות:</span><br><strong>${s['כיתות'] || '--'}</strong></div>
            <div class="col-6"><span class="text-muted">משכורת בסיס:</span><br><strong>${s['משכורת_בסיס'] ? Utils.formatCurrency(+s['משכורת_בסיס']) : '--'}</strong></div>
            <div class="col-12"><span class="text-muted">הערות:</span><br>${s['הערות'] || '--'}</div>
          </div>
          <div class="d-flex gap-1 mt-2">
            <button class="btn btn-sm btn-outline-info" onclick="event.stopPropagation();Pages.showStaffDocs('${sid}','${name}')"><i class="bi bi-file-earmark me-1"></i>מסמכים</button>
            <button class="btn btn-sm btn-outline-primary" onclick="event.stopPropagation();Pages.showAddStaff(Pages._staffData.find(z=>String(Utils.rowId(z))==='${sid}'))"><i class="bi bi-pencil me-1"></i>עריכה</button>
            <button class="btn btn-sm btn-outline-danger" onclick="event.stopPropagation();Pages.deleteStaff('${sid}')"><i class="bi bi-trash me-1"></i>מחק</button>
            ${phone ? `<a href="https://wa.me/972${phone.replace(/^0/, '')}" target="_blank" class="btn btn-sm btn-outline-success ms-auto" onclick="event.stopPropagation()"><i class="bi bi-whatsapp"></i></a>` : ''}
          </div>
        </div>

        <!-- Collapsed Actions -->
        <div class="d-flex gap-1 mt-2 border-top pt-2 ${expanded ? 'd-none' : ''}" id="staff-actions-${sid}">
          <button class="btn btn-sm btn-outline-primary" onclick="event.stopPropagation();Pages.showAddStaff(Pages._staffData.find(z=>String(Utils.rowId(z))==='${sid}'))"><i class="bi bi-pencil me-1"></i>ערוך</button>
          <button class="btn btn-sm btn-outline-danger" onclick="event.stopPropagation();Pages.deleteStaff('${sid}')"><i class="bi bi-trash me-1"></i>מחק</button>
          ${phone ? `<a href="https://wa.me/972${phone.replace(/^0/, '')}" target="_blank" class="btn btn-sm btn-outline-success ms-auto" onclick="event.stopPropagation()"><i class="bi bi-whatsapp"></i></a>` : ''}
        </div>
      </div></div>`;
    }).join('')}</div>`;
  },

  /* ---------- Toggle expand card ---------- */
  toggleStaffDetail(sid) {
    if (this._staffExpandedId === sid) {
      this._staffExpandedId = null;
    } else {
      // Collapse previous
      if (this._staffExpandedId) {
        const prev = document.getElementById('staff-expand-' + this._staffExpandedId);
        const prevActions = document.getElementById('staff-actions-' + this._staffExpandedId);
        if (prev) prev.classList.add('d-none');
        if (prevActions) prevActions.classList.remove('d-none');
      }
      this._staffExpandedId = sid;
    }
    const detail = document.getElementById('staff-expand-' + sid);
    const actions = document.getElementById('staff-actions-' + sid);
    if (detail) detail.classList.toggle('d-none');
    if (actions) actions.classList.toggle('d-none');
  },

  /* ---------- Toggle extra views ---------- */
  toggleStaffView(view) {
    const section = document.getElementById('staff-extra-section');
    if (this._staffCurrentView === view) {
      section.style.display = 'none';
      this._staffCurrentView = null;
      return;
    }
    this._staffCurrentView = view;
    section.style.display = '';
    section.innerHTML = '<div class="card p-3 text-center"><div class="spinner-border spinner-border-sm"></div> טוען...</div>';
    if (view === 'schedule') this._renderScheduleView(section);
    else if (view === 'salary') this._renderSalaryView(section);
    else if (view === 'attendance') this._renderAttendanceView(section);
  },

  /* ======================================================================
     STAFF SCHEDULE — Weekly Grid
     ====================================================================== */
  _renderScheduleView(container) {
    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי'];
    const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
    const staff = (this._staffData || []).filter(s => (s['סטטוס'] || 'פעיל') === 'פעיל');

    // Generate a deterministic schedule from demo data
    const scheduleMap = {};
    staff.forEach((s, idx) => {
      const name = Utils.fullName(s);
      const role = s['תפקיד'] || '';
      // Teachers/rabbis: most hours, maintenance: fewer, admin: mid
      let dayCount = 5, hourStart = 0, hourEnd = 7;
      if (role === 'תחזוקה') { dayCount = 5; hourStart = 0; hourEnd = 5; }
      else if (role === 'מנהל') { dayCount = 5; hourStart = 1; hourEnd = 8; }
      else if (role === 'עוזר הוראה') { dayCount = 4; hourStart = 0; hourEnd = 5; }

      for (let d = 0; d < dayCount && d < 6; d++) {
        for (let h = hourStart; h <= hourEnd && h < hours.length; h++) {
          // Only assign partial hours based on index to avoid overlap
          if ((h + idx) % 3 === 0) continue;
          const key = `${d}-${h}`;
          if (!scheduleMap[key]) scheduleMap[key] = [];
          scheduleMap[key].push(name);
        }
      }
    });

    container.innerHTML = `<div class="card p-3">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h6 class="fw-bold mb-0"><i class="bi bi-calendar-week me-2 text-info"></i>מערכת שעות צוות</h6>
        <button class="btn btn-sm btn-outline-dark" onclick="Pages.toggleStaffView('schedule')"><i class="bi bi-x-lg"></i></button>
      </div>
      <div class="table-responsive"><table class="table table-bordered table-sm mb-0 text-center">
        <thead class="table-light"><tr><th style="width:70px">שעה</th>${days.map(d => `<th>${d}</th>`).join('')}</tr></thead>
        <tbody>${hours.map((h, hi) => `<tr>
          <td class="fw-bold small">${h}</td>
          ${days.map((_, di) => {
            const key = `${di}-${hi}`;
            const names = scheduleMap[key] || [];
            return `<td class="small p-1">${names.length > 0 ? names.map(n => `<span class="badge bg-light text-dark border mb-1 d-inline-block">${n.split(' ')[0]}</span>`).join(' ') : '<span class="text-muted">-</span>'}</td>`;
          }).join('')}
        </tr>`).join('')}</tbody>
      </table></div>
    </div>`;
  },

  /* ======================================================================
     SALARY OVERVIEW
     ====================================================================== */
  _renderSalaryView(container) {
    const staff = (this._staffData || []).filter(s => (s['סטטוס'] || 'פעיל') === 'פעיל');
    let totalBase = 0, totalBonus = 0, totalDeduct = 0, totalNet = 0;

    const rows = staff.map(s => {
      const name = Utils.fullName(s);
      const base = parseFloat(s['משכורת_בסיס']) || 0;
      const bonus = parseFloat(s['בונוסים']) || 0;
      const deduct = parseFloat(s['ניכויים']) || 0;
      const net = base + bonus - deduct;
      totalBase += base; totalBonus += bonus; totalDeduct += deduct; totalNet += net;
      return { name, role: s['תפקיד'] || '', base, bonus, deduct, net };
    });

    container.innerHTML = `<div class="card p-3">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h6 class="fw-bold mb-0"><i class="bi bi-cash-stack me-2 text-success"></i>סקירת שכר</h6>
        <button class="btn btn-sm btn-outline-dark" onclick="Pages.toggleStaffView('salary')"><i class="bi bi-x-lg"></i></button>
      </div>
      <div class="row g-3 mb-3">
        <div class="col-6 col-md-3"><div class="card p-2 text-center border-primary"><div class="fs-5 fw-bold">${Utils.formatCurrency(totalBase)}</div><small class="text-muted">בסיס</small></div></div>
        <div class="col-6 col-md-3"><div class="card p-2 text-center border-success"><div class="fs-5 fw-bold text-success">${Utils.formatCurrency(totalBonus)}</div><small class="text-muted">בונוסים</small></div></div>
        <div class="col-6 col-md-3"><div class="card p-2 text-center border-danger"><div class="fs-5 fw-bold text-danger">${Utils.formatCurrency(totalDeduct)}</div><small class="text-muted">ניכויים</small></div></div>
        <div class="col-6 col-md-3"><div class="card p-2 text-center border-dark"><div class="fs-5 fw-bold">${Utils.formatCurrency(totalNet)}</div><small class="text-muted">נטו לתשלום</small></div></div>
      </div>
      <div class="table-responsive"><table class="table table-bht mb-0" id="staff-salary-table">
        <thead><tr><th>עובד</th><th>תפקיד</th><th>בסיס</th><th>בונוסים</th><th>ניכויים</th><th>נטו</th></tr></thead>
        <tbody>${rows.map(r => `<tr>
          <td><div class="d-flex align-items-center gap-2">${Utils.avatarHTML(r.name, 'sm')}<span class="fw-bold">${r.name}</span></div></td>
          <td class="text-muted">${r.role}</td>
          <td>${Utils.formatCurrency(r.base)}</td>
          <td class="text-success">${r.bonus > 0 ? '+' + Utils.formatCurrency(r.bonus) : '-'}</td>
          <td class="text-danger">${r.deduct > 0 ? '-' + Utils.formatCurrency(r.deduct) : '-'}</td>
          <td class="fw-bold">${Utils.formatCurrency(r.net)}</td>
        </tr>`).join('')}
        </tbody>
        <tfoot class="table-light"><tr class="fw-bold">
          <td colspan="2">סה"כ</td>
          <td>${Utils.formatCurrency(totalBase)}</td>
          <td class="text-success">${Utils.formatCurrency(totalBonus)}</td>
          <td class="text-danger">${Utils.formatCurrency(totalDeduct)}</td>
          <td>${Utils.formatCurrency(totalNet)}</td>
        </tr></tfoot>
      </table></div>
    </div>`;
  },

  /* ======================================================================
     ATTENDANCE TRACKING — Check-in/out log
     ====================================================================== */
  _stfAttData: {},
  _stfAttLog: [],

  async _renderAttendanceView(container) {
    const staff = this._staffData || [];
    const todayISO = Utils.todayISO();
    let attData = [];
    try { attData = await App.getData('נוכחות_צוות'); } catch (e) { /* sheet may not exist */ }
    const todayAtt = attData.filter(a => a['תאריך'] === todayISO);
    const attMap = {};
    todayAtt.forEach(a => {
      const key = a['שם_עובד'] || a['מזהה_עובד'] || '';
      attMap[key] = { status: a['סטטוס'] || 'נוכח', checkIn: a['כניסה'] || '', checkOut: a['יציאה'] || '' };
    });

    // Generate demo attendance if empty
    if (todayAtt.length === 0) {
      const statuses = ['נוכח', 'נוכח', 'נוכח', 'נוכח', 'נוכח', 'נוכח', 'חיסור', 'איחור', 'נוכח', 'נוכח'];
      const times = ['07:45', '08:02', '07:55', '08:10', '08:30', '07:50', '', '08:45', '08:00', '07:58'];
      staff.forEach((s, i) => {
        const name = Utils.fullName(s);
        attMap[name] = { status: statuses[i] || 'נוכח', checkIn: times[i] || '', checkOut: '' };
      });
    }

    this._stfAttData = {};
    const present = Object.values(attMap).filter(a => a.status === 'נוכח').length;
    const absent = Object.values(attMap).filter(a => a.status === 'חיסור').length;
    const late = Object.values(attMap).filter(a => a.status === 'איחור').length;

    container.innerHTML = `<div class="card p-3">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h6 class="fw-bold mb-0"><i class="bi bi-calendar-check me-2 text-warning"></i>נוכחות צוות - ${todayISO}</h6>
        <div class="d-flex gap-2">
          <button class="btn btn-success btn-sm" onclick="Pages.saveStaffAtt()"><i class="bi bi-check-lg me-1"></i>שמור</button>
          <button class="btn btn-sm btn-outline-dark" onclick="Pages.toggleStaffView('attendance')"><i class="bi bi-x-lg"></i></button>
        </div>
      </div>
      <div class="row g-2 mb-3">
        <div class="col-4"><div class="card p-2 text-center bg-success bg-opacity-10"><div class="fs-5 fw-bold text-success">${present}</div><small>נוכחים</small></div></div>
        <div class="col-4"><div class="card p-2 text-center bg-danger bg-opacity-10"><div class="fs-5 fw-bold text-danger">${absent}</div><small>חיסורים</small></div></div>
        <div class="col-4"><div class="card p-2 text-center bg-warning bg-opacity-10"><div class="fs-5 fw-bold text-warning">${late}</div><small>איחורים</small></div></div>
      </div>
      <div class="table-responsive"><table class="table table-bht mb-0">
        <thead><tr><th>עובד</th><th>תפקיד</th><th>כניסה</th><th>יציאה</th><th>סטטוס</th></tr></thead>
        <tbody>${staff.map(s => {
          const name = Utils.fullName(s);
          const sid = Utils.rowId(s);
          const att = attMap[name] || {};
          const status = att.status || '';
          this._stfAttData[sid] = status;
          const statusColor = status === 'נוכח' ? 'success' : status === 'חיסור' ? 'danger' : status === 'איחור' ? 'warning' : 'secondary';
          return `<tr>
            <td><div class="d-flex align-items-center gap-2">${Utils.avatarHTML(name, 'sm')}<span class="fw-bold">${name}</span></div></td>
            <td class="text-muted">${s['תפקיד'] || ''}</td>
            <td><input type="time" class="form-control form-control-sm" style="width:100px" value="${att.checkIn || ''}" id="stf-checkin-${sid}"></td>
            <td><input type="time" class="form-control form-control-sm" style="width:100px" value="${att.checkOut || ''}" id="stf-checkout-${sid}"></td>
            <td><div class="btn-group btn-group-sm" role="group">
              <button class="btn btn-outline-success ${status === 'נוכח' ? 'active' : ''}" onclick="Pages.setStfAtt('${sid}','נוכח',this)" title="נוכח"><i class="bi bi-check-circle"></i></button>
              <button class="btn btn-outline-danger ${status === 'חיסור' ? 'active' : ''}" onclick="Pages.setStfAtt('${sid}','חיסור',this)" title="חיסור"><i class="bi bi-x-circle"></i></button>
              <button class="btn btn-outline-warning ${status === 'איחור' ? 'active' : ''}" onclick="Pages.setStfAtt('${sid}','איחור',this)" title="איחור"><i class="bi bi-clock"></i></button>
            </div></td>
          </tr>`;
        }).join('')}</tbody>
      </table></div>
    </div>`;
  },

  setStfAtt(sid, status, btn) {
    this._stfAttData[sid] = status;
    const grp = btn.closest('.btn-group');
    grp.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  },

  async saveStaffAtt() {
    const todayISO = Utils.todayISO();
    const staff = this._staffData || [];
    const records = [];
    for (const s of staff) {
      const sid = Utils.rowId(s);
      const status = this._stfAttData[sid];
      if (status) {
        const checkIn = document.getElementById('stf-checkin-' + sid)?.value || '';
        const checkOut = document.getElementById('stf-checkout-' + sid)?.value || '';
        records.push({
          'שם_עובד': Utils.fullName(s),
          'מזהה_עובד': sid,
          'תאריך': todayISO,
          'סטטוס': status,
          'כניסה': checkIn,
          'יציאה': checkOut
        });
      }
    }
    if (!records.length) { Utils.toast('לא סומן נוכחות', 'warning'); return; }
    try {
      for (const rec of records) await App.apiCall('add', 'נוכחות_צוות', { row: rec });
      Utils.toast(`${records.length} רשומות נשמרו`);
    } catch (e) { Utils.toast('שגיאה', 'danger'); }
  },

  /* ======================================================================
     DOCUMENT MANAGEMENT — Per-staff
     ====================================================================== */
  async showStaffDocs(sid, name) {
    let staffDocs = [];
    try { staffDocs = await App.getData('מסמכי_צוות'); } catch (e) {}
    const docs = staffDocs.filter(d => d['מזהה_עובד'] === sid || d['שם_עובד'] === name);
    const requiredDocs = ['תעודת זהות', 'תעודת משטרה', 'תלוש משכורת', 'אישור משטרה'];
    const hasDocTypes = docs.map(d => d['סוג_מסמך'] || '');
    const missingTypes = requiredDocs.filter(r => !hasDocTypes.includes(r));

    const html = `<div class="modal fade" id="staff-docs-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title"><i class="bi bi-file-earmark-text me-2"></i>מסמכי ${name}</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        ${missingTypes.length > 0 ? `<div class="alert alert-warning mb-3"><i class="bi bi-exclamation-triangle me-2"></i>מסמכים חסרים: ${missingTypes.map(t => `<span class="badge bg-danger me-1">${t}</span>`).join('')}</div>` : `<div class="alert alert-success mb-3"><i class="bi bi-check-circle me-2"></i>כל המסמכים הנדרשים קיימים</div>`}
        ${docs.length > 0 ? `<table class="table table-bht mb-3"><thead><tr><th>סוג</th><th>תאריך העלאה</th><th>הערות</th></tr></thead><tbody>${docs.map(d => `<tr><td><i class="bi bi-file-earmark me-1"></i>${d['סוג_מסמך'] || ''}</td><td>${d['תאריך'] || ''}</td><td>${d['הערות'] || ''}</td></tr>`).join('')}</tbody></table>` : '<p class="text-muted text-center">אין מסמכים</p>'}
        <h6 class="fw-bold mt-3">הוספת מסמך</h6>
        <div class="row g-2">
          <div class="col-md-4"><select class="form-select" id="doc-type"><option value="">סוג מסמך</option>${requiredDocs.map(d => `<option value="${d}">${d}</option>`).join('')}<option value="אחר">אחר</option></select></div>
          <div class="col-md-4"><input type="date" class="form-control" id="doc-date" value="${Utils.todayISO()}"></div>
          <div class="col-md-4"><input class="form-control" id="doc-notes" placeholder="הערות"></div>
          <div class="col-12"><button class="btn btn-primary btn-sm" onclick="Pages.addStaffDoc('${sid}','${name}')"><i class="bi bi-plus-lg me-1"></i>הוסף מסמך</button></div>
        </div>
      </div>
    </div></div></div>`;
    document.getElementById('staff-docs-modal')?.remove();
    document.body.insertAdjacentHTML('beforeend', html);
    new bootstrap.Modal(document.getElementById('staff-docs-modal')).show();
  },

  async addStaffDoc(sid, name) {
    const type = document.getElementById('doc-type').value;
    const date = document.getElementById('doc-date').value;
    const notes = document.getElementById('doc-notes').value.trim();
    if (!type) { Utils.toast('בחר סוג מסמך', 'warning'); return; }
    try {
      await App.apiCall('add', 'מסמכי_צוות', { row: { 'מזהה_עובד': sid, 'שם_עובד': name, 'סוג_מסמך': type, 'תאריך': date, 'הערות': notes } });
      Utils.toast('מסמך נוסף');
      bootstrap.Modal.getInstance(document.getElementById('staff-docs-modal')).hide();
    } catch (e) { Utils.toast('שגיאה', 'danger'); }
  },

  /* ======================================================================
     ADD / EDIT STAFF MODAL
     ====================================================================== */
  showAddStaff(staff = null) {
    const title = staff ? 'עריכת עובד' : 'הוספת עובד צוות';
    const name = staff ? Utils.fullName(staff) : '';
    const roleOptions = this._staffRoles.map(r =>
      `<option value="${r.key}" ${(staff?.['תפקיד'] || '') === r.key ? 'selected' : ''}>${r.key}</option>`
    ).join('');

    const html = `<div class="modal fade" id="staff-modal-dyn" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
      <div class="modal-header"><h5>${title}</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body"><div class="row g-3">
        <div class="col-md-6"><label class="form-label">שם מלא</label><input class="form-control" id="stf-name" value="${name}"></div>
        <div class="col-md-6"><label class="form-label">תפקיד</label><select class="form-select" id="stf-role"><option value="">בחר תפקיד</option>${roleOptions}</select></div>
        <div class="col-md-6"><label class="form-label">טלפון</label><input class="form-control" id="stf-phone" value="${staff?.['טלפון'] || ''}" dir="ltr"></div>
        <div class="col-md-6"><label class="form-label">אימייל</label><input class="form-control" id="stf-email" value="${staff?.['אימייל'] || ''}" dir="ltr"></div>
        <div class="col-md-6"><label class="form-label">תאריך קליטה</label><input type="date" class="form-control" id="stf-hiredate" value="${staff?.['תאריך_התחלה'] || staff?.['תאריך_קליטה'] || ''}"></div>
        <div class="col-md-6"><label class="form-label">סטטוס</label><select class="form-select" id="stf-status"><option value="פעיל" ${(staff?.['סטטוס'] || '') === 'פעיל' || !staff ? 'selected' : ''}>פעיל</option><option value="לא_פעיל" ${(staff?.['סטטוס'] || '') === 'לא_פעיל' ? 'selected' : ''}>לא פעיל</option><option value="חופשה" ${(staff?.['סטטוס'] || '') === 'חופשה' ? 'selected' : ''}>חופשה</option></select></div>
        <div class="col-md-12"><label class="form-label">כישורים</label><input class="form-control" id="stf-qualifications" value="${staff?.['כישורים'] || ''}" placeholder="תעודת הוראה, תואר..."></div>
        <div class="col-md-6"><label class="form-label">כיתות</label><input class="form-control" id="stf-classes" value="${staff?.['כיתות'] || ''}" placeholder="א,ב,ג"></div>
        <div class="col-md-6"><label class="form-label">משכורת בסיס</label><input type="number" class="form-control" id="stf-salary" value="${staff?.['משכורת_בסיס'] || ''}" dir="ltr"></div>
        <div class="col-md-4"><label class="form-label">בונוסים</label><input type="number" class="form-control" id="stf-bonus" value="${staff?.['בונוסים'] || ''}" dir="ltr"></div>
        <div class="col-md-4"><label class="form-label">ניכויים</label><input type="number" class="form-control" id="stf-deductions" value="${staff?.['ניכויים'] || ''}" dir="ltr"></div>
        <div class="col-md-4"><label class="form-label">נטו</label><input class="form-control" id="stf-net" disabled dir="ltr"></div>
        <div class="col-12"><label class="form-label">הערות</label><textarea class="form-control" id="stf-notes" rows="2">${staff?.['הערות'] || ''}</textarea></div>
      </div></div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">ביטול</button><button class="btn btn-primary" onclick="Pages.saveStaff('${staff ? Utils.rowId(staff) : ''}')">שמירה</button></div>
    </div></div></div>`;
    document.getElementById('staff-modal-dyn')?.remove();
    document.body.insertAdjacentHTML('beforeend', html);
    new bootstrap.Modal(document.getElementById('staff-modal-dyn')).show();

    // Auto-calc net
    const calcNet = () => {
      const base = parseFloat(document.getElementById('stf-salary')?.value) || 0;
      const bonus = parseFloat(document.getElementById('stf-bonus')?.value) || 0;
      const deduct = parseFloat(document.getElementById('stf-deductions')?.value) || 0;
      const netEl = document.getElementById('stf-net');
      if (netEl) netEl.value = Utils.formatCurrency(base + bonus - deduct);
    };
    ['stf-salary', 'stf-bonus', 'stf-deductions'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', calcNet);
    });
    calcNet();
  },

  async saveStaff(existingId) {
    const fullName = document.getElementById('stf-name').value.trim();
    const parts = fullName.split(/\s+/);
    const row = {
      'שם_פרטי': parts[0] || '',
      'שם_משפחה': parts.slice(1).join(' ') || '',
      'תפקיד': document.getElementById('stf-role').value,
      'טלפון': document.getElementById('stf-phone').value.trim(),
      'אימייל': document.getElementById('stf-email').value.trim(),
      'סטטוס': document.getElementById('stf-status').value,
      'תאריך_התחלה': document.getElementById('stf-hiredate').value,
      'כישורים': document.getElementById('stf-qualifications').value.trim(),
      'כיתות': document.getElementById('stf-classes').value.trim(),
      'משכורת_בסיס': document.getElementById('stf-salary').value,
      'בונוסים': document.getElementById('stf-bonus').value,
      'ניכויים': document.getElementById('stf-deductions').value,
      'הערות': document.getElementById('stf-notes').value.trim()
    };
    if (!row['שם_פרטי']) { Utils.toast('חסר שם', 'warning'); return; }
    try {
      if (existingId) {
        await App.apiCall('update', 'צוות', { id: existingId, row });
      } else {
        await App.apiCall('add', 'צוות', { row });
      }
      bootstrap.Modal.getInstance(document.getElementById('staff-modal-dyn')).hide();
      Utils.toast(existingId ? 'עודכן' : 'נוסף');
      this.staffInit();
    } catch (e) { Utils.toast('שגיאה', 'danger'); }
  },

  async deleteStaff(id) {
    if (!await Utils.confirm('מחיקת עובד', 'האם למחוק עובד זה?')) return;
    try {
      await App.apiCall('delete', 'צוות', { id });
      Utils.toast('עובד נמחק');
      this.staffInit();
    } catch (e) { Utils.toast('שגיאה', 'danger'); }
  },

  /* ======================================================================
     EXPORT CSV
     ====================================================================== */
  exportStaffCSV() {
    const data = this._staffData || [];
    if (!data.length) { Utils.toast('אין נתונים לייצוא', 'warning'); return; }
    let csv = '\uFEFF'; // BOM for Hebrew
    const headers = ['שם', 'תפקיד', 'טלפון', 'אימייל', 'סטטוס', 'תאריך קליטה', 'כישורים', 'כיתות', 'משכורת בסיס'];
    csv += headers.join(',') + '\n';
    data.forEach(s => {
      const row = [
        '"' + Utils.fullName(s) + '"',
        '"' + (s['תפקיד'] || '') + '"',
        '"' + (s['טלפון'] || '') + '"',
        '"' + (s['אימייל'] || '') + '"',
        '"' + (s['סטטוס'] || '') + '"',
        '"' + (s['תאריך_התחלה'] || s['תאריך_קליטה'] || '') + '"',
        '"' + (s['כישורים'] || '') + '"',
        '"' + (s['כיתות'] || '') + '"',
        s['משכורת_בסיס'] || ''
      ];
      csv += row.join(',') + '\n';
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'staff_' + Utils.todayISO() + '.csv';
    link.click();
    Utils.toast('CSV יוצא');
  },

  /* ======================================================================
     STAFF CARD (detail page via hash)
     ====================================================================== */
  staff_card(id) { return `<div id="staff-card-content">${Utils.skeleton(2)}</div>`; },

  async staff_cardInit(id) {
    let staff = await App.getData('צוות');
    if (!staff || staff.length === 0) staff = this._staffDemoData.map((d, i) => ({ ...d, _row: i + 2 }));
    const s = staff.find(x => String(Utils.rowId(x)) === String(id) || String(x.id) === String(id));
    if (!s) {
      document.getElementById('staff-card-content').innerHTML = `<div class="empty-state"><i class="bi bi-person-x"></i><h5>עובד לא נמצא</h5><a href="#staff" class="btn btn-primary mt-2">חזרה</a></div>`;
      return;
    }
    const name = Utils.fullName(s);
    const base = parseFloat(s['משכורת_בסיס']) || 0;
    const bonus = parseFloat(s['בונוסים']) || 0;
    const deduct = parseFloat(s['ניכויים']) || 0;
    const net = base + bonus - deduct;
    const hireDate = s['תאריך_התחלה'] || s['תאריך_קליטה'] || '';
    const tenure = hireDate ? ((new Date() - new Date(hireDate)) / (365.25 * 24 * 3600000)).toFixed(1) : '--';

    // Try to get attendance record
    let attData = [];
    try { attData = await App.getData('נוכחות_צוות'); } catch (e) {}
    const myAtt = attData.filter(a => a['שם_עובד'] === name || a['מזהה_עובד'] === String(id));
    const presentDays = myAtt.filter(a => a['סטטוס'] === 'נוכח').length;
    const totalDays = myAtt.length || 1;
    const attPct = Math.round(presentDays / totalDays * 100);

    // Try to get documents
    let staffDocs = [];
    try { staffDocs = await App.getData('מסמכי_צוות'); } catch (e) {}
    const docs = staffDocs.filter(d => d['מזהה_עובד'] === String(id) || d['שם_עובד'] === name);

    document.getElementById('staff-card-content').innerHTML = `
      <a href="#staff" class="btn btn-link text-decoration-none mb-2"><i class="bi bi-arrow-right me-1"></i>חזרה לצוות</a>

      <!-- Header Card -->
      <div class="card overflow-hidden mb-3">
        <div class="student-header">
          ${Utils.avatarHTML(name, 'xl')}
          <h3 class="fw-bold mt-2 mb-1">${name}</h3>
          <div class="mb-1">${s['תפקיד'] || ''}</div>
          ${Utils.statusBadge(s['סטטוס'])}
          <div class="mt-2 small text-white-50">ותק: ${tenure} שנים</div>
        </div>
      </div>

      <!-- Info Grid -->
      <div class="row g-3 mb-3">
        <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold mb-3"><i class="bi bi-person-vcard me-2"></i>פרטים אישיים</h6>
          <div class="row g-2">
            <div class="col-sm-6"><label class="form-label text-muted small">טלפון</label><div class="fw-bold" dir="ltr">${Utils.formatPhone(s['טלפון'])}</div></div>
            <div class="col-sm-6"><label class="form-label text-muted small">אימייל</label><div class="fw-bold">${s['אימייל'] || '--'}</div></div>
            <div class="col-sm-6"><label class="form-label text-muted small">תאריך קליטה</label><div class="fw-bold">${hireDate || '--'}</div></div>
            <div class="col-sm-6"><label class="form-label text-muted small">סטטוס</label><div>${Utils.statusBadge(s['סטטוס'])}</div></div>
          </div>
        </div></div>

        <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold mb-3"><i class="bi bi-award me-2"></i>מקצועי</h6>
          <div class="row g-2">
            <div class="col-sm-6"><label class="form-label text-muted small">כישורים</label><div class="fw-bold">${s['כישורים'] || '--'}</div></div>
            <div class="col-sm-6"><label class="form-label text-muted small">כיתות</label><div class="fw-bold">${s['כיתות'] || '--'}</div></div>
            <div class="col-12"><label class="form-label text-muted small">הערות</label><div>${s['הערות'] || '--'}</div></div>
          </div>
        </div></div>
      </div>

      <!-- Salary -->
      <div class="card p-3 mb-3"><h6 class="fw-bold mb-3"><i class="bi bi-cash-stack me-2 text-success"></i>נתוני שכר</h6>
        <div class="row g-3">
          <div class="col-3"><div class="text-center"><div class="fs-5 fw-bold">${Utils.formatCurrency(base)}</div><small class="text-muted">בסיס</small></div></div>
          <div class="col-3"><div class="text-center"><div class="fs-5 fw-bold text-success">${Utils.formatCurrency(bonus)}</div><small class="text-muted">בונוסים</small></div></div>
          <div class="col-3"><div class="text-center"><div class="fs-5 fw-bold text-danger">${Utils.formatCurrency(deduct)}</div><small class="text-muted">ניכויים</small></div></div>
          <div class="col-3"><div class="text-center"><div class="fs-5 fw-bold text-primary">${Utils.formatCurrency(net)}</div><small class="text-muted">נטו</small></div></div>
        </div>
      </div>

      <!-- Attendance Summary -->
      <div class="card p-3 mb-3"><h6 class="fw-bold mb-3"><i class="bi bi-calendar-check me-2 text-info"></i>נוכחות</h6>
        <div class="row g-3 align-items-center">
          <div class="col-md-4 text-center">
            <div class="fs-3 fw-bold ${attPct >= 80 ? 'text-success' : attPct >= 60 ? 'text-warning' : 'text-danger'}">${myAtt.length > 0 ? attPct + '%' : '--'}</div>
            <small class="text-muted">אחוז נוכחות</small>
          </div>
          <div class="col-md-4 text-center">
            <div class="fs-4 fw-bold">${presentDays}</div><small class="text-muted">ימי נוכחות</small>
          </div>
          <div class="col-md-4 text-center">
            <div class="fs-4 fw-bold">${myAtt.length}</div><small class="text-muted">סה"כ ימים מתועדים</small>
          </div>
        </div>
      </div>

      <!-- Documents -->
      <div class="card p-3 mb-3"><h6 class="fw-bold mb-3"><i class="bi bi-file-earmark-text me-2 text-warning"></i>מסמכים (${docs.length})</h6>
        ${docs.length > 0 ? `<table class="table table-bht mb-0"><thead><tr><th>סוג</th><th>תאריך</th><th>הערות</th></tr></thead><tbody>${docs.map(d => `<tr><td><i class="bi bi-file-earmark me-1"></i>${d['סוג_מסמך'] || ''}</td><td>${d['תאריך'] || ''}</td><td>${d['הערות'] || ''}</td></tr>`).join('')}</tbody></table>` : '<p class="text-muted text-center">אין מסמכים</p>'}
        <button class="btn btn-outline-primary btn-sm mt-2" onclick="Pages.showStaffDocs('${id}','${name}')"><i class="bi bi-plus-lg me-1"></i>הוסף מסמך</button>
      </div>

      <!-- Actions -->
      <div class="d-flex gap-2">
        <button class="btn btn-primary" onclick="Pages.showAddStaff(Pages._staffData.find(z=>String(Utils.rowId(z))==='${id}'))"><i class="bi bi-pencil me-1"></i>ערוך</button>
        <button class="btn btn-outline-danger" onclick="Pages.deleteStaff('${id}')"><i class="bi bi-trash me-1"></i>מחק</button>
        ${s['טלפון'] ? `<a href="https://wa.me/972${(s['טלפון'] || '').replace(/^0/, '')}" target="_blank" class="btn btn-success"><i class="bi bi-whatsapp me-1"></i>WhatsApp</a>` : ''}
      </div>`;
  },


  /* ======================================================================
     STAFF SALARY PAGE (standalone)
     ====================================================================== */
  staff_salary() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-cash-stack me-2"></i>שכר צוות</h1></div><button class="btn btn-primary btn-sm" onclick="Pages.showAddSalary()"><i class="bi bi-plus-lg me-1"></i>תשלום חדש</button></div><div class="row g-3 mb-3"><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold" id="sal-total">\u20AA0</div><small class="text-muted">סה"כ משכורות</small></div></div><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-success" id="sal-paid">\u20AA0</div><small class="text-muted">שולם</small></div></div><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-danger" id="sal-pending">\u20AA0</div><small class="text-muted">לתשלום</small></div></div><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-primary" id="sal-count">0</div><small class="text-muted">רשומות</small></div></div></div><div class="card p-3 mb-3"><div class="row g-2"><div class="col-md-4"><input type="month" class="form-control" id="sal-month"></div><div class="col-md-4"><div class="search-box"><i class="bi bi-search"></i><input type="text" class="form-control" id="sal-search" placeholder="חיפוש עובד..."></div></div></div></div><div id="sal-list">${Utils.skeleton(4)}</div><div class="modal fade" id="sal-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">תשלום חדש</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row g-3"><div class="col-12"><label class="form-label">עובד</label><select class="form-select" id="salf-staff"></select></div><div class="col-6"><label class="form-label">חודש</label><input type="month" class="form-control" id="salf-month"></div><div class="col-6"><label class="form-label">סכום</label><input type="number" class="form-control" id="salf-amount"></div><div class="col-12"><label class="form-label">הערות</label><input class="form-control" id="salf-notes"></div></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">ביטול</button><button class="btn btn-primary" onclick="Pages.saveSalary()">שמור</button></div></div></div></div>`;
  },
  _salData: [],
  async staff_salaryInit() {
    this._salData = await App.getData('שכר_צוות');
    const d = new Date(); document.getElementById('sal-month').value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    document.getElementById('sal-month').addEventListener('change', () => this.renderSalary());
    document.getElementById('sal-search').addEventListener('input', Utils.debounce(() => this.renderSalary(), 200));
    this.renderSalary();
  },
  renderSalary() {
    const month = document.getElementById('sal-month')?.value || '';
    const search = (document.getElementById('sal-search')?.value || '').trim().toLowerCase();
    let filtered = (this._salData || []).filter(r => {
      if (month && !(r['חודש'] || '').startsWith(month)) return false;
      if (search && !(r['שם'] || '').toLowerCase().includes(search)) return false;
      return true;
    });
    const total = filtered.reduce((s, r) => s + (parseFloat(r['סכום']) || 0), 0);
    const paid = filtered.filter(r => (r['סטטוס'] || '') === 'שולם').reduce((s, r) => s + (parseFloat(r['סכום']) || 0), 0);
    document.getElementById('sal-total').textContent = Utils.formatCurrency(total);
    document.getElementById('sal-paid').textContent = Utils.formatCurrency(paid);
    document.getElementById('sal-pending').textContent = Utils.formatCurrency(total - paid);
    document.getElementById('sal-count').textContent = filtered.length;
    if (!filtered.length) { document.getElementById('sal-list').innerHTML = '<div class="empty-state"><i class="bi bi-cash-stack"></i><h5>אין משכורות</h5></div>'; return; }
    document.getElementById('sal-list').innerHTML = `<div class="card"><table class="table table-bht mb-0"><thead><tr><th>עובד</th><th>חודש</th><th>סכום</th><th>סטטוס</th><th>הערות</th><th>פעולות</th></tr></thead><tbody>${filtered.map(r => { const isPaid = (r['סטטוס'] || '') === 'שולם'; return `<tr><td><div class="d-flex align-items-center gap-2">${Utils.avatarHTML(r['שם'] || '', 'sm')}<span class="fw-bold">${r['שם'] || ''}</span></div></td><td>${r['חודש'] || ''}</td><td class="fw-bold">${Utils.formatCurrency(parseFloat(r['סכום']) || 0)}</td><td><span class="badge bg-${isPaid ? 'success' : 'warning'}">${r['סטטוס'] || 'לתשלום'}</span></td><td class="small">${r['הערות'] || ''}</td><td>${!isPaid ? `<button class="btn btn-sm btn-outline-success" onclick="Pages.markSalPaid('${Utils.rowId(r)}')"><i class="bi bi-check-lg"></i></button>` : ''}</td></tr>` }).join('')}</tbody></table></div>`;
  },
  async showAddSalary() {
    const staff = await App.getData('צוות');
    document.getElementById('salf-staff').innerHTML = '<option value="">בחר</option>' + (staff || []).map(s => `<option value="${Utils.rowId(s)}">${Utils.fullName(s)}</option>`).join('');
    const d = new Date(); document.getElementById('salf-month').value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    new bootstrap.Modal(document.getElementById('sal-modal')).show();
  },
  async saveSalary() {
    const sel = document.getElementById('salf-staff');
    const row = { 'שם': sel.selectedOptions[0]?.text || '', 'חודש': document.getElementById('salf-month').value, 'סכום': document.getElementById('salf-amount').value, 'סטטוס': 'לתשלום', 'הערות': document.getElementById('salf-notes').value.trim() };
    if (!row['שם'] || !row['סכום']) { Utils.toast('חסר נתונים', 'warning'); return; }
    try { await App.apiCall('add', 'שכר_צוות', { row }); bootstrap.Modal.getInstance(document.getElementById('sal-modal')).hide(); Utils.toast('משכורת נוספה'); this.staff_salaryInit(); } catch (e) { Utils.toast('שגיאה', 'danger'); }
  },
  async markSalPaid(id) { try { await App.apiCall('update', 'שכר_צוות', { id, row: { 'סטטוס': 'שולם' } }); Utils.toast('סומן כשולם'); this.staff_salaryInit(); } catch (e) { Utils.toast('שגיאה', 'danger'); } },

  /* ======================================================================
     LEGACY — Staff Attendance (old toggle, kept for backward compat)
     ====================================================================== */
  async showStaffAttendance() {
    this.toggleStaffView('attendance');
  },
  async showStaffMissingDocs() {
    // Quick missing docs check
    const staff = this._staffData || [];
    let staffDocs = [];
    try { staffDocs = await App.getData('מסמכי_צוות'); } catch (e) {}
    const requiredDocs = ['תעודת זהות', 'תעודת משטרה', 'תלוש משכורת', 'אישור משטרה'];
    const missing = [];
    staff.forEach(s => {
      const name = Utils.fullName(s); const sid = Utils.rowId(s);
      const hasDocs = staffDocs.filter(d => d['מזהה_עובד'] === sid || d['שם_עובד'] === name);
      const hasDocTypes = hasDocs.map(d => d['סוג_מסמך'] || '');
      const missingTypes = requiredDocs.filter(r => !hasDocTypes.includes(r));
      if (missingTypes.length > 0) missing.push({ name, role: s['תפקיד'] || '', missing: missingTypes });
    });
    const section = document.getElementById('staff-extra-section');
    section.style.display = '';
    this._staffCurrentView = 'missingDocs';
    if (!missing.length) {
      section.innerHTML = '<div class="card p-3"><div class="text-center text-success py-3"><i class="bi bi-check-circle fs-3"></i><p class="mt-2">כל המסמכים הנדרשים קיימים</p></div></div>';
      return;
    }
    section.innerHTML = `<div class="card p-3"><div class="d-flex justify-content-between align-items-center mb-3"><h6 class="fw-bold mb-0"><i class="bi bi-exclamation-triangle me-2 text-warning"></i>מסמכים חסרים (${missing.length} עובדים)</h6><button class="btn btn-sm btn-outline-dark" onclick="document.getElementById('staff-extra-section').style.display='none';Pages._staffCurrentView=null"><i class="bi bi-x-lg"></i></button></div><div class="table-responsive"><table class="table table-bht mb-0"><thead><tr><th>עובד</th><th>תפקיד</th><th>מסמכים חסרים</th></tr></thead><tbody>${missing.map(m => `<tr><td class="fw-bold">${m.name}</td><td class="text-muted">${m.role}</td><td>${m.missing.map(t => `<span class="badge bg-danger me-1">${t}</span>`).join('')}</td></tr>`).join('')}</tbody></table></div></div>`;
  }
});
