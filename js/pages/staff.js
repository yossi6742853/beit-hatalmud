/* ===== BHT v5.5 — Staff (Real Data) ===== */
Object.assign(Pages, {

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
        <button class="btn btn-outline-secondary btn-sm" onclick="Pages.exportStaffCSV()"><i class="bi bi-download me-1"></i>\u05D9\u05D9\u05E6\u05D5\u05D0 CSV</button>
        <button class="btn btn-outline-dark btn-sm" onclick="Pages.printStaffPhoneDirectory()"><i class="bi bi-printer me-1"></i>\u05D4\u05D3\u05E4\u05E1 \u05E1\u05E4\u05E8 \u05D8\u05DC\u05E4\u05D5\u05E0\u05D9\u05DD</button>
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

  staffInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    let data;
    try {
      data = _gc('\u05E6\u05D5\u05D5\u05EA');
    } catch(e) {
      data = [];
    }
    this._staffData = data || [];
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
      document.getElementById('staff-list').innerHTML = !this._staffData.length
        ? '<div class="empty-state text-center py-5"><i class="bi bi-person-badge fs-1 text-muted d-block mb-2"></i><h5>\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05E2\u05D3\u05D9\u05D9\u05DF</h5><p class="text-muted">\u05D4\u05D5\u05E1\u05E3 \u05D0\u05D9\u05E9 \u05E6\u05D5\u05D5\u05EA \u05E8\u05D0\u05E9\u05D5\u05DF</p></div>'
        : '<div class="empty-state"><i class="bi bi-person-badge"></i><h5>\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5</h5></div>';
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
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי'];
    const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

    // Load real schedule data from מערכת_שעות
    let scheduleData = [];
    try { scheduleData = _gc('מערכת_שעות'); } catch (e) {}

    const scheduleMap = {};
    if (scheduleData.length > 0) {
      scheduleData.forEach(entry => {
        const dayIdx = days.indexOf(entry['יום'] || '');
        const hour = entry['שעה'] || '';
        const hourIdx = hours.indexOf(hour);
        if (dayIdx >= 0 && hourIdx >= 0) {
          const key = `${dayIdx}-${hourIdx}`;
          if (!scheduleMap[key]) scheduleMap[key] = [];
          const name = entry['שם_עובד'] || entry['מורה'] || '';
          if (name) scheduleMap[key].push(name);
        }
      });
    }

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
     SALARY OVERVIEW (inline panel in staff page)
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
        <div class="d-flex gap-2">
          <a href="#staff_salary" class="btn btn-sm btn-primary"><i class="bi bi-box-arrow-up-left me-1"></i>ניהול שכר מלא</a>
          <button class="btn btn-sm btn-outline-dark" onclick="Pages.toggleStaffView('salary')"><i class="bi bi-x-lg"></i></button>
        </div>
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

  _renderAttendanceView(container) {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    const staff = this._staffData || [];
    const todayISO = Utils.todayISO();
    let attData = [];
    try { attData = _gc('נוכחות_צוות'); } catch (e) { /* sheet may not exist */ }
    const todayAtt = attData.filter(a => a['תאריך'] === todayISO);
    const attMap = {};
    todayAtt.forEach(a => {
      const key = a['שם_עובד'] || a['מזהה_עובד'] || '';
      attMap[key] = { status: a['סטטוס'] || 'נוכח', checkIn: a['כניסה'] || '', checkOut: a['יציאה'] || '' };
    });

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
  showStaffDocs(sid, name) {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    let staffDocs = [];
    try { staffDocs = _gc('מסמכי_צוות'); } catch (e) {}
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

  staff_cardInit(id) {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    let staff = [];
    try { staff = _gc('צוות'); } catch(e) {}
    if (!staff) staff = [];
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
    try { attData = _gc('נוכחות_צוות'); } catch (e) {}
    const myAtt = attData.filter(a => a['שם_עובד'] === name || a['מזהה_עובד'] === String(id));
    const presentDays = myAtt.filter(a => a['סטטוס'] === 'נוכח').length;
    const totalDays = myAtt.length || 1;
    const attPct = Math.round(presentDays / totalDays * 100);

    // Try to get documents
    let staffDocs = [];
    try { staffDocs = _gc('מסמכי_צוות'); } catch (e) {}
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
     STAFF SALARY PAGE — Comprehensive Payroll Management
     ====================================================================== */

  _salData: [],
  _salMonthlyData: [],
  _salPaymentFilter: 'all',
  _salChartInstance: null,

  staff_salary() {
    const now = new Date();
    const curMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div>
        <h1><i class="bi bi-cash-stack me-2"></i>ניהול שכר צוות</h1>
        <p class="text-muted mb-0">לוח בקרת שכר מקיף - חודש ${now.toLocaleDateString('he-IL', { month: 'long', year: 'numeric' })}</p>
      </div>
      <div class="d-flex gap-2 flex-wrap">
        <button class="btn btn-primary btn-sm" onclick="Pages.showBonusDeductionModal()"><i class="bi bi-plus-lg me-1"></i>בונוס / ניכוי</button>
        <button class="btn btn-outline-info btn-sm" onclick="Pages.showAnnualSummary()"><i class="bi bi-graph-up me-1"></i>סיכום שנתי</button>
        <a href="#staff" class="btn btn-outline-secondary btn-sm"><i class="bi bi-arrow-right me-1"></i>חזרה לצוות</a>
      </div>
    </div>

    <!-- Payroll Dashboard Cards -->
    <div class="row g-3 mb-3" id="sal-dashboard">
      <div class="col-6 col-lg-3">
        <div class="card stat-card p-3">
          <div class="stat-icon gradient-primary"><i class="bi bi-wallet2"></i></div>
          <div class="stat-value" id="sal-total-payroll">--</div>
          <div class="stat-label">עלות שכר חודשית</div>
        </div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="card stat-card p-3">
          <div class="stat-icon gradient-success"><i class="bi bi-cash-coin"></i></div>
          <div class="stat-value" id="sal-total-net">--</div>
          <div class="stat-label">נטו לתשלום</div>
        </div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="card stat-card p-3">
          <div class="stat-icon gradient-danger"><i class="bi bi-receipt-cutoff"></i></div>
          <div class="stat-value" id="sal-total-deductions">--</div>
          <div class="stat-label">סה"כ ניכויים</div>
        </div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="card stat-card p-3">
          <div class="stat-icon gradient-warning"><i class="bi bi-gift"></i></div>
          <div class="stat-value" id="sal-total-bonuses">--</div>
          <div class="stat-label">סה"כ בונוסים</div>
        </div>
      </div>
    </div>

    <!-- Filters & Search -->
    <div class="card p-3 mb-3">
      <div class="d-flex flex-wrap gap-2 align-items-center">
        <div class="search-box flex-grow-1">
          <i class="bi bi-search"></i>
          <input type="text" class="form-control" id="sal-search" placeholder="חיפוש עובד...">
        </div>
        <input type="month" class="form-control" style="max-width:180px" id="sal-month" value="${curMonth}">
        <div class="btn-group btn-group-sm">
          <button class="btn btn-outline-secondary active" onclick="Pages.filterSalPayment('all',this)">הכל</button>
          <button class="btn btn-outline-success" onclick="Pages.filterSalPayment('שולם',this)"><i class="bi bi-check-circle me-1"></i>שולם</button>
          <button class="btn btn-outline-warning" onclick="Pages.filterSalPayment('ממתין',this)"><i class="bi bi-clock me-1"></i>ממתין</button>
        </div>
      </div>
    </div>

    <!-- Salary Table -->
    <div class="card mb-3" id="sal-table-card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h6 class="fw-bold mb-0"><i class="bi bi-table me-2"></i>טבלת משכורות</h6>
        <span class="badge bg-primary" id="sal-count-badge">0 עובדים</span>
      </div>
      <div class="table-responsive" id="sal-list">${Utils.skeleton(4)}</div>
    </div>

    <!-- Monthly Comparison Chart -->
    <div class="card p-3 mb-3">
      <h6 class="fw-bold mb-3"><i class="bi bi-bar-chart-fill me-2 text-info"></i>השוואת עלויות שכר חודשית</h6>
      <div style="height:300px;position:relative">
        <canvas id="sal-monthly-chart"></canvas>
      </div>
    </div>

    <!-- Annual Summary Panel (hidden by default) -->
    <div id="sal-annual-panel" class="mb-3" style="display:none"></div>

    <!-- Bonus/Deduction Modal -->
    <div class="modal fade" id="sal-bonus-modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><i class="bi bi-plus-circle me-2"></i>הוספת בונוס / ניכוי</h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="row g-3">
              <div class="col-12">
                <label class="form-label">עובד</label>
                <select class="form-select" id="salf-bd-staff"></select>
              </div>
              <div class="col-6">
                <label class="form-label">סוג</label>
                <select class="form-select" id="salf-bd-type">
                  <option value="בונוס_הוראה">בונוס הוראה</option>
                  <option value="בונוס_ותק">בונוס ותק</option>
                  <option value="בונוס_אחר">בונוס אחר</option>
                  <option value="ניכוי_אחר">ניכוי אחר</option>
                </select>
              </div>
              <div class="col-6">
                <label class="form-label">סכום</label>
                <input type="number" class="form-control" id="salf-bd-amount" min="0" dir="ltr">
              </div>
              <div class="col-12">
                <label class="form-label">סיבה</label>
                <input class="form-control" id="salf-bd-reason" placeholder="סיבה לשינוי">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">ביטול</button>
            <button class="btn btn-primary" onclick="Pages.saveBonusDeduction()"><i class="bi bi-check-lg me-1"></i>שמור</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Payslip Modal -->
    <div class="modal fade" id="sal-payslip-modal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><i class="bi bi-file-earmark-text me-2"></i>תלוש משכורת</h5>
            <div class="d-flex gap-2">
              <button class="btn btn-sm btn-outline-primary" onclick="Pages.printPayslip()"><i class="bi bi-printer me-1"></i>הדפסה</button>
              <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>
          </div>
          <div class="modal-body" id="sal-payslip-content"></div>
        </div>
      </div>
    </div>`;
  },

  staff_salaryInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    let realData = [];
    try { realData = _gc('\u05E9\u05DB\u05E8_\u05E6\u05D5\u05D5\u05EA'); } catch (e) {}
    // Resolve real staff names from צוות sheet
    let staffList = [];
    try { staffList = _gc('\u05E6\u05D5\u05D5\u05EA'); } catch (e) {}
    const staffMap = {};
    (staffList || []).forEach(st => {
      const sid = String(Utils.rowId(st) || st['id'] || '');
      if (sid) staffMap[sid] = st;
    });
    // Enrich salary rows with real staff names/roles
    this._salData = ((realData && realData.length > 0) ? realData : []).map(r => {
      const ref = String(r['\u05E6\u05D5\u05D5\u05EA_\u05DE\u05D6\u05D4\u05D4'] || r['\u05E6\u05D5\u05D5\u05EA'] || r['staff_id'] || '');
      const staffRec = staffMap[ref];
      if (staffRec && !r['\u05E9\u05DD']) {
        r['\u05E9\u05DD'] = Utils.fullName ? Utils.fullName(staffRec) : (staffRec['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9'] || '') + ' ' + (staffRec['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4'] || '');
      }
      if (staffRec && !r['\u05EA\u05E4\u05E7\u05D9\u05D3']) {
        r['\u05EA\u05E4\u05E7\u05D9\u05D3'] = staffRec['\u05EA\u05E4\u05E7\u05D9\u05D3'] || '';
      }
      return r;
    });
    // Build monthly data from real salary records (grouped by חודש field)
    this._salMonthlyData = this._buildMonthlyFromData(this._salData);
    this._salPaymentFilter = 'all';
    document.getElementById('sal-search').addEventListener('input', Utils.debounce(() => this.renderSalary(), 200));
    document.getElementById('sal-month').addEventListener('change', () => this.renderSalary());
    this.renderSalary();
    this._renderSalaryChart();
  },

  /* ---------- Build monthly aggregates from real salary data ---------- */
  _buildMonthlyFromData(data) {
    if (!data.length) return [];
    // Group by month field or compute from current data for current month
    const monthMap = {};
    data.forEach(r => {
      const month = r['חודש'] || '';
      if (month) {
        if (!monthMap[month]) monthMap[month] = { base: 0, bonuses: 0, deductions: 0, net: 0 };
        const c = this._salCalcRow(r);
        monthMap[month].base += c.base;
        monthMap[month].bonuses += c.totalBonus;
        monthMap[month].deductions += c.totalDeductions;
        monthMap[month].net += c.net;
      }
    });
    // If no month grouping exists, just use current month total
    if (!Object.keys(monthMap).length) {
      const now = new Date();
      const key = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      const label = now.toLocaleDateString('he-IL', { month: 'short', year: 'numeric' });
      let base = 0, bonuses = 0, deductions = 0, net = 0;
      data.forEach(r => {
        const c = this._salCalcRow(r);
        base += c.base; bonuses += c.totalBonus; deductions += c.totalDeductions; net += c.net;
      });
      return [{ label, key, base, bonuses, deductions, net }];
    }
    return Object.entries(monthMap).sort((a, b) => a[0].localeCompare(b[0])).map(([key, d]) => {
      const parts = key.split('-');
      const md = parts.length === 2 ? new Date(+parts[0], +parts[1] - 1, 1) : new Date();
      const label = md.toLocaleDateString('he-IL', { month: 'short', year: 'numeric' });
      return { label, key, ...d };
    });
  },

  /* ---------- Helpers ---------- */
  _salCalcRow(r) {
    const base = parseFloat(r['משכורת_בסיס']) || 0;
    const b1 = parseFloat(r['בונוס_הוראה']) || 0;
    const b2 = parseFloat(r['בונוס_ותק']) || 0;
    const b3 = parseFloat(r['בונוס_אחר']) || 0;
    const totalBonus = b1 + b2 + b3;
    const gross = base + totalBonus;
    const tax = parseFloat(r['מס_הכנסה']) || 0;
    const insurance = parseFloat(r['ביטוח_לאומי']) || 0;
    const pension = parseFloat(r['קרן_פנסיה']) || 0;
    const otherDed = parseFloat(r['ניכוי_אחר']) || 0;
    const totalDeductions = tax + insurance + pension + otherDed;
    const net = gross - totalDeductions;
    return { base, b1, b2, b3, totalBonus, gross, tax, insurance, pension, otherDed, totalDeductions, net };
  },

  /* ---------- Filter payment status ---------- */
  filterSalPayment(filter, btn) {
    this._salPaymentFilter = filter;
    if (btn) {
      btn.closest('.btn-group').querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }
    this.renderSalary();
  },

  /* ---------- Main render ---------- */
  renderSalary() {
    const search = (document.getElementById('sal-search')?.value || '').trim().toLowerCase();
    const monthFilter = document.getElementById('sal-month')?.value || '';
    const payFilter = this._salPaymentFilter || 'all';

    let data = (this._salData || []).filter(r => {
      if (search && !(r['\u05E9\u05DD'] || '').toLowerCase().includes(search) && !(r['\u05EA\u05E4\u05E7\u05D9\u05D3'] || '').toLowerCase().includes(search)) return false;
      if (monthFilter && (r['\u05D7\u05D5\u05D3\u05E9'] || '').substring(0, 7) !== monthFilter) return false;
      if (payFilter !== 'all' && (r['\u05E1\u05D8\u05D8\u05D5\u05E1_\u05EA\u05E9\u05DC\u05D5\u05DD'] || '\u05DE\u05DE\u05EA\u05D9\u05DF') !== payFilter) return false;
      return true;
    });

    // Calculate totals
    let sumBase = 0, sumBonus = 0, sumDeduct = 0, sumNet = 0;
    const rows = data.map(r => {
      const c = this._salCalcRow(r);
      sumBase += c.base;
      sumBonus += c.totalBonus;
      sumDeduct += c.totalDeductions;
      sumNet += c.net;
      return { ...r, ...c };
    });

    // Update dashboard
    const totalPayroll = sumBase + sumBonus;
    document.getElementById('sal-total-payroll').textContent = Utils.formatCurrency(totalPayroll);
    document.getElementById('sal-total-net').textContent = Utils.formatCurrency(sumNet);
    document.getElementById('sal-total-deductions').textContent = Utils.formatCurrency(sumDeduct);
    document.getElementById('sal-total-bonuses').textContent = Utils.formatCurrency(sumBonus);
    document.getElementById('sal-count-badge').textContent = `${rows.length} עובדים`;

    if (!rows.length) {
      document.getElementById('sal-list').innerHTML = '<div class="empty-state p-4"><i class="bi bi-cash-stack"></i><h5>אין נתוני שכר</h5></div>';
      return;
    }

    document.getElementById('sal-list').innerHTML = `
      <table class="table table-bht mb-0">
        <thead>
          <tr>
            <th>עובד</th>
            <th>תפקיד</th>
            <th>בסיס</th>
            <th>בונוסים</th>
            <th class="text-muted">מס</th>
            <th class="text-muted">ביט"ל</th>
            <th class="text-muted">פנסיה</th>
            <th>ניכויים</th>
            <th>נטו</th>
            <th>סטטוס</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((r, idx) => {
            const name = r['שם'] || '';
            const role = r['תפקיד'] || '';
            const isPaid = (r['סטטוס_תשלום'] || 'ממתין') === 'שולם';
            const roleDef = this._staffRoles.find(rd => rd.key === role);
            const roleColor = roleDef ? roleDef.color : 'secondary';
            return `<tr>
              <td><div class="d-flex align-items-center gap-2">${Utils.avatarHTML(name, 'sm')}<span class="fw-bold">${name}</span></div></td>
              <td><span class="badge bg-${roleColor}">${role}</span></td>
              <td>${Utils.formatCurrency(r.base)}</td>
              <td class="text-success fw-bold">${r.totalBonus > 0 ? '+' + Utils.formatCurrency(r.totalBonus) : '-'}</td>
              <td class="text-muted small">${Utils.formatCurrency(r.tax)}</td>
              <td class="text-muted small">${Utils.formatCurrency(r.insurance)}</td>
              <td class="text-muted small">${Utils.formatCurrency(r.pension)}</td>
              <td class="text-danger fw-bold">-${Utils.formatCurrency(r.totalDeductions)}</td>
              <td class="fw-bold fs-6">${Utils.formatCurrency(r.net)}</td>
              <td>
                <button class="btn btn-sm btn-${isPaid ? 'success' : 'warning'}" onclick="Pages.toggleSalPayStatus(${idx})" title="${isPaid ? 'שולם - לחץ לשינוי' : 'ממתין - לחץ לסמן כשולם'}">
                  <i class="bi bi-${isPaid ? 'check-circle-fill' : 'clock-fill'} me-1"></i>${isPaid ? 'שולם' : 'ממתין'}
                </button>
              </td>
              <td>
                <div class="d-flex gap-1">
                  <button class="btn btn-sm btn-outline-info" onclick="Pages.showPayslip(${idx})" title="תלוש משכורת"><i class="bi bi-file-earmark-text"></i></button>
                  <button class="btn btn-sm btn-outline-primary" onclick="Pages.showBonusDeductionModal(${idx})" title="בונוס/ניכוי"><i class="bi bi-plus-circle"></i></button>
                </div>
              </td>
            </tr>`;
          }).join('')}
        </tbody>
        <tfoot class="table-light">
          <tr class="fw-bold">
            <td colspan="2">סה"כ (${rows.length} עובדים)</td>
            <td>${Utils.formatCurrency(sumBase)}</td>
            <td class="text-success">${Utils.formatCurrency(sumBonus)}</td>
            <td class="text-muted small" colspan="3">${Utils.formatCurrency(sumDeduct)}</td>
            <td class="text-danger">-${Utils.formatCurrency(sumDeduct)}</td>
            <td class="fs-6">${Utils.formatCurrency(sumNet)}</td>
            <td colspan="2"></td>
          </tr>
        </tfoot>
      </table>`;
  },

  /* ---------- Toggle payment status ---------- */
  toggleSalPayStatus(idx) {
    const r = this._salData[idx];
    if (!r) return;
    const current = r['סטטוס_תשלום'] || 'ממתין';
    r['סטטוס_תשלום'] = current === 'שולם' ? 'ממתין' : 'שולם';
    // Persist if has row id
    const rid = Utils.rowId(r);
    if (rid && r._row) {
      App.apiCall('update', 'שכר_צוות', { id: rid, row: { 'סטטוס_תשלום': r['סטטוס_תשלום'] } }).catch(() => {});
    }
    Utils.toast(r['סטטוס_תשלום'] === 'שולם' ? `${r['שם']} - סומן כשולם` : `${r['שם']} - סומן כממתין`);
    this.renderSalary();
  },

  /* ---------- Monthly comparison chart ---------- */
  _renderSalaryChart() {
    const canvas = document.getElementById('sal-monthly-chart');
    if (!canvas) return;
    if (this._salChartInstance) { this._salChartInstance.destroy(); this._salChartInstance = null; }

    const months = this._salMonthlyData || [];
    if (!months.length) { return; }
    this._salChartInstance = new Chart(canvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: months.map(m => m.label),
        datasets: [
          {
            label: 'בסיס',
            data: months.map(m => m.base),
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'בונוסים',
            data: months.map(m => m.bonuses),
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'ניכויים',
            data: months.map(m => m.deductions),
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { font: { family: 'Heebo' } } },
          tooltip: {
            rtl: true,
            textDirection: 'rtl',
            callbacks: {
              label: ctx => `${ctx.dataset.label}: ${Utils.formatCurrency(ctx.parsed.y)}`
            }
          }
        },
        scales: {
          x: { stacked: false, ticks: { font: { family: 'Heebo', size: 11 } } },
          y: {
            beginAtZero: true,
            ticks: {
              font: { family: 'Heebo' },
              callback: val => Utils.formatCurrency(val)
            }
          }
        }
      }
    });
  },

  /* ---------- Payslip generator ---------- */
  showPayslip(idx) {
    const r = this._salData[idx];
    if (!r) return;
    const c = this._salCalcRow(r);
    const name = r['שם'] || '';
    const role = r['תפקיד'] || '';
    const now = new Date();
    const monthStr = now.toLocaleDateString('he-IL', { month: 'long', year: 'numeric' });
    const dateStr = now.toLocaleDateString('he-IL');

    const content = document.getElementById('sal-payslip-content');
    content.innerHTML = `
      <div id="payslip-printable" style="direction:rtl;font-family:Heebo,sans-serif">
        <!-- Header -->
        <div class="text-center border-bottom pb-3 mb-3">
          <h4 class="fw-bold mb-1"><i class="bi bi-building me-2"></i>בית התלמוד</h4>
          <h5 class="text-muted">תלוש משכורת - ${monthStr}</h5>
          <small class="text-muted">תאריך הנפקה: ${dateStr}</small>
        </div>

        <!-- Employee Info -->
        <div class="row g-2 mb-3 p-2 bg-light rounded">
          <div class="col-md-4"><strong>שם עובד:</strong> ${name}</div>
          <div class="col-md-4"><strong>תפקיד:</strong> ${role}</div>
          <div class="col-md-4"><strong>סטטוס:</strong> <span class="badge bg-${(r['סטטוס_תשלום'] || 'ממתין') === 'שולם' ? 'success' : 'warning'}">${r['סטטוס_תשלום'] || 'ממתין'}</span></div>
        </div>

        <!-- Earnings -->
        <div class="card mb-3">
          <div class="card-header bg-success bg-opacity-10"><h6 class="fw-bold mb-0 text-success"><i class="bi bi-arrow-up-circle me-2"></i>הכנסות</h6></div>
          <div class="card-body p-0">
            <table class="table table-sm mb-0">
              <tbody>
                <tr><td>משכורת בסיס</td><td class="text-start fw-bold">${Utils.formatCurrency(c.base)}</td></tr>
                ${c.b1 > 0 ? `<tr><td>בונוס הוראה</td><td class="text-start text-success">+${Utils.formatCurrency(c.b1)}</td></tr>` : ''}
                ${c.b2 > 0 ? `<tr><td>בונוס ותק</td><td class="text-start text-success">+${Utils.formatCurrency(c.b2)}</td></tr>` : ''}
                ${c.b3 > 0 ? `<tr><td>בונוס אחר</td><td class="text-start text-success">+${Utils.formatCurrency(c.b3)}</td></tr>` : ''}
                <tr class="table-success fw-bold"><td>סה"כ ברוטו</td><td class="text-start">${Utils.formatCurrency(c.gross)}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Deductions -->
        <div class="card mb-3">
          <div class="card-header bg-danger bg-opacity-10"><h6 class="fw-bold mb-0 text-danger"><i class="bi bi-arrow-down-circle me-2"></i>ניכויים</h6></div>
          <div class="card-body p-0">
            <table class="table table-sm mb-0">
              <tbody>
                <tr><td>מס הכנסה</td><td class="text-start text-danger">-${Utils.formatCurrency(c.tax)}</td></tr>
                <tr><td>ביטוח לאומי</td><td class="text-start text-danger">-${Utils.formatCurrency(c.insurance)}</td></tr>
                <tr><td>קרן פנסיה</td><td class="text-start text-danger">-${Utils.formatCurrency(c.pension)}</td></tr>
                ${c.otherDed > 0 ? `<tr><td>ניכוי אחר</td><td class="text-start text-danger">-${Utils.formatCurrency(c.otherDed)}</td></tr>` : ''}
                <tr class="table-danger fw-bold"><td>סה"כ ניכויים</td><td class="text-start">-${Utils.formatCurrency(c.totalDeductions)}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Net Pay -->
        <div class="card border-primary mb-3">
          <div class="card-body text-center py-3">
            <div class="text-muted mb-1">נטו לתשלום</div>
            <div class="fs-2 fw-bold text-primary">${Utils.formatCurrency(c.net)}</div>
          </div>
        </div>

        <!-- Summary Bar -->
        <div class="d-flex gap-2 mb-2">
          <div class="flex-grow-1">
            <div class="progress" style="height:24px">
              <div class="progress-bar bg-success" style="width:${Math.round(c.net / c.gross * 100)}%" title="נטו">${Math.round(c.net / c.gross * 100)}% נטו</div>
              <div class="progress-bar bg-danger" style="width:${Math.round(c.totalDeductions / c.gross * 100)}%" title="ניכויים">${Math.round(c.totalDeductions / c.gross * 100)}% ניכויים</div>
            </div>
          </div>
        </div>

        <div class="text-center mt-3 text-muted small border-top pt-2">
          <i class="bi bi-info-circle me-1"></i>מסמך זה הונפק אוטומטית ממערכת בית התלמוד
        </div>
      </div>`;

    new bootstrap.Modal(document.getElementById('sal-payslip-modal')).show();
  },

  printPayslip() {
    const content = document.getElementById('payslip-printable');
    if (!content) return;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`<!DOCTYPE html><html dir="rtl" lang="he"><head>
      <meta charset="utf-8"><title>תלוש משכורת</title>
      <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;700&display=swap" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.css" rel="stylesheet">
      <style>body{font-family:Heebo,sans-serif;padding:30px;direction:rtl}@media print{body{padding:10px}.btn{display:none!important}}</style>
    </head><body>${content.outerHTML}
      <script>setTimeout(()=>{window.print();window.close()},500)<\/script>
    </body></html>`);
    printWindow.document.close();
  },

  /* ---------- Bonus / Deduction Modal ---------- */
  showBonusDeductionModal(preselectedIdx) {
    const select = document.getElementById('salf-bd-staff');
    if (!select) return;
    select.innerHTML = '<option value="">בחר עובד</option>' +
      (this._salData || []).map((s, i) => `<option value="${i}" ${i === preselectedIdx ? 'selected' : ''}>${s['שם'] || ''}</option>`).join('');
    document.getElementById('salf-bd-amount').value = '';
    document.getElementById('salf-bd-reason').value = '';
    document.getElementById('salf-bd-type').value = 'בונוס_הוראה';
    new bootstrap.Modal(document.getElementById('sal-bonus-modal')).show();
  },

  saveBonusDeduction() {
    const idx = parseInt(document.getElementById('salf-bd-staff').value);
    const type = document.getElementById('salf-bd-type').value;
    const amount = parseFloat(document.getElementById('salf-bd-amount').value) || 0;
    const reason = document.getElementById('salf-bd-reason').value.trim();

    if (isNaN(idx) || !this._salData[idx]) { Utils.toast('בחר עובד', 'warning'); return; }
    if (amount <= 0) { Utils.toast('הזן סכום חיובי', 'warning'); return; }

    const r = this._salData[idx];
    const prev = parseFloat(r[type]) || 0;
    r[type] = prev + amount;

    // Persist if possible
    const rid = Utils.rowId(r);
    if (rid && r._row) {
      App.apiCall('update', 'שכר_צוות', { id: rid, row: { [type]: r[type] } }).catch(() => {});
    }

    const typeLabel = type.replace(/_/g, ' ');
    Utils.toast(`${r['שם']}: ${typeLabel} +${Utils.formatCurrency(amount)}${reason ? ' (' + reason + ')' : ''}`);
    bootstrap.Modal.getInstance(document.getElementById('sal-bonus-modal')).hide();
    this.renderSalary();
  },

  /* ---------- Annual Summary ---------- */
  showAnnualSummary() {
    const panel = document.getElementById('sal-annual-panel');
    if (!panel) return;
    if (panel.style.display !== 'none') { panel.style.display = 'none'; return; }

    const data = this._salData || [];
    const months = this._salMonthlyData || [];

    // Calculate annual totals from monthly data
    const annualBase = months.reduce((s, m) => s + m.base, 0);
    const annualBonuses = months.reduce((s, m) => s + m.bonuses, 0);
    const annualDeductions = months.reduce((s, m) => s + m.deductions, 0);
    const annualNet = months.reduce((s, m) => s + m.net, 0);
    const annualTotal = annualBase + annualBonuses;

    // Current month stats
    let curMonthNet = 0, curMonthGross = 0;
    data.forEach(r => {
      const c = this._salCalcRow(r);
      curMonthNet += c.net;
      curMonthGross += c.gross;
    });

    const avgMonthly = annualTotal / 12;
    const avgSalary = data.length > 0 ? curMonthNet / data.length : 0;
    const budgetAnnual = 1200000; // Assumed annual budget
    const budgetUsed = Math.round(annualTotal / budgetAnnual * 100);

    // Breakdown by role
    const roleBreakdown = {};
    data.forEach(r => {
      const role = r['תפקיד'] || 'אחר';
      const c = this._salCalcRow(r);
      if (!roleBreakdown[role]) roleBreakdown[role] = { count: 0, totalGross: 0, totalNet: 0 };
      roleBreakdown[role].count++;
      roleBreakdown[role].totalGross += c.gross;
      roleBreakdown[role].totalNet += c.net;
    });

    panel.style.display = '';
    panel.innerHTML = `
    <div class="card p-3">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h6 class="fw-bold mb-0"><i class="bi bi-graph-up me-2 text-info"></i>סיכום שנתי - ${new Date().getFullYear()}</h6>
        <button class="btn btn-sm btn-outline-dark" onclick="document.getElementById('sal-annual-panel').style.display='none'"><i class="bi bi-x-lg"></i></button>
      </div>

      <!-- Annual KPIs -->
      <div class="row g-3 mb-3">
        <div class="col-6 col-lg-3">
          <div class="card p-3 text-center border-primary">
            <div class="fs-4 fw-bold">${Utils.formatCurrency(annualTotal)}</div>
            <small class="text-muted">עלות שנתית כוללת</small>
          </div>
        </div>
        <div class="col-6 col-lg-3">
          <div class="card p-3 text-center border-success">
            <div class="fs-4 fw-bold">${Utils.formatCurrency(avgMonthly)}</div>
            <small class="text-muted">ממוצע חודשי</small>
          </div>
        </div>
        <div class="col-6 col-lg-3">
          <div class="card p-3 text-center border-info">
            <div class="fs-4 fw-bold">${Utils.formatCurrency(avgSalary)}</div>
            <small class="text-muted">שכר ממוצע לעובד</small>
          </div>
        </div>
        <div class="col-6 col-lg-3">
          <div class="card p-3 text-center border-${budgetUsed > 90 ? 'danger' : budgetUsed > 70 ? 'warning' : 'success'}">
            <div class="fs-4 fw-bold">${budgetUsed}%</div>
            <small class="text-muted">ניצול תקציב שנתי</small>
            <div class="progress mt-1" style="height:6px">
              <div class="progress-bar bg-${budgetUsed > 90 ? 'danger' : budgetUsed > 70 ? 'warning' : 'success'}" style="width:${Math.min(budgetUsed, 100)}%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Annual Breakdown -->
      <div class="row g-3 mb-3">
        <div class="col-md-4">
          <div class="card p-2 text-center bg-primary bg-opacity-10">
            <div class="fw-bold fs-5">${Utils.formatCurrency(annualBase)}</div>
            <small>בסיס שנתי</small>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card p-2 text-center bg-success bg-opacity-10">
            <div class="fw-bold fs-5 text-success">${Utils.formatCurrency(annualBonuses)}</div>
            <small>בונוסים שנתיים</small>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card p-2 text-center bg-danger bg-opacity-10">
            <div class="fw-bold fs-5 text-danger">${Utils.formatCurrency(annualDeductions)}</div>
            <small>ניכויים שנתיים</small>
          </div>
        </div>
      </div>

      <!-- Role Breakdown Table -->
      <h6 class="fw-bold mb-2"><i class="bi bi-diagram-3 me-2"></i>פילוח לפי תפקיד</h6>
      <div class="table-responsive">
        <table class="table table-bht mb-0">
          <thead><tr><th>תפקיד</th><th>עובדים</th><th>ברוטו חודשי</th><th>נטו חודשי</th><th>ברוטו שנתי (x12)</th></tr></thead>
          <tbody>${Object.entries(roleBreakdown).map(([role, d]) => {
            const roleDef = this._staffRoles.find(rd => rd.key === role);
            const color = roleDef ? roleDef.color : 'secondary';
            return `<tr>
              <td><span class="badge bg-${color}">${role}</span></td>
              <td>${d.count}</td>
              <td>${Utils.formatCurrency(d.totalGross)}</td>
              <td>${Utils.formatCurrency(d.totalNet)}</td>
              <td class="fw-bold">${Utils.formatCurrency(d.totalGross * 12)}</td>
            </tr>`;
          }).join('')}</tbody>
        </table>
      </div>
    </div>`;
  },

  /* ---------- Legacy add salary (kept for backward compat) ---------- */
  async showAddSalary() { this.showBonusDeductionModal(); },
  async saveSalary() { this.saveBonusDeduction(); },
  async markSalPaid(id) {
    try {
      await App.apiCall('update', 'שכר_צוות', { id, row: { 'סטטוס_תשלום': 'שולם' } });
      Utils.toast('סומן כשולם');
      this.staff_salaryInit();
    } catch (e) { Utils.toast('שגיאה', 'danger'); }
  },

  /* ======================================================================
     LEGACY — Staff Attendance (old toggle, kept for backward compat)
     ====================================================================== */
  async showStaffAttendance() {
    this.toggleStaffView('attendance');
  },
  showStaffMissingDocs() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    // Quick missing docs check
    const staff = this._staffData || [];
    let staffDocs = [];
    try { staffDocs = _gc('מסמכי_צוות'); } catch (e) {}
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
