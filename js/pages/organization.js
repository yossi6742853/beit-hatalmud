/* ===== BHT v5.3 — Organization ===== */
Object.assign(Pages, {

  /* ======================================================================
     ORGANIZATION HUB — Main overview page
     ====================================================================== */
  organization() {
    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div><h1><i class="bi bi-building me-2"></i>\u05D0\u05E8\u05D2\u05D5\u05DF</h1>
      <p class="text-muted mb-0">\u05DE\u05D9\u05D3\u05E2 \u05DB\u05DC\u05DC\u05D9, \u05DB\u05D9\u05EA\u05D5\u05EA, \u05D5\u05E2\u05D3\u05D5\u05EA \u05D5\u05DC\u05D5\u05D7 \u05E9\u05E0\u05D4</p></div>
    </div>

    <!-- Statistics Dashboard -->
    <div class="row g-3 mb-4">
      <div class="col-6 col-md-3"><div class="card p-3 text-center">
        <i class="bi bi-people-fill fs-3 text-primary"></i>
        <div class="fs-3 fw-bold text-primary" id="org-stat-students">0</div>
        <small class="text-muted">\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</small>
      </div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center">
        <i class="bi bi-easel-fill fs-3 text-success"></i>
        <div class="fs-3 fw-bold text-success" id="org-stat-classes">0</div>
        <small class="text-muted">\u05DB\u05D9\u05EA\u05D5\u05EA</small>
      </div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center">
        <i class="bi bi-person-badge-fill fs-3 text-warning"></i>
        <div class="fs-3 fw-bold text-warning" id="org-stat-staff">0</div>
        <small class="text-muted">\u05E6\u05D5\u05D5\u05EA</small>
      </div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center">
        <i class="bi bi-cash-stack fs-3 text-info"></i>
        <div class="fs-3 fw-bold text-info" id="org-stat-budget">\u20AA0</div>
        <small class="text-muted">\u05EA\u05E7\u05E6\u05D9\u05D1 \u05E9\u05E0\u05EA\u05D9</small>
      </div></div>
    </div>

    <!-- Institution Info Card -->
    <div class="card mb-4">
      <div class="card-header bg-primary text-white d-flex align-items-center gap-2">
        <i class="bi bi-info-circle-fill"></i>
        <span class="fw-bold">\u05E4\u05E8\u05D8\u05D9 \u05D4\u05DE\u05D5\u05E1\u05D3</span>
        <button class="btn btn-sm btn-outline-light ms-auto" onclick="Pages.editOrgInfo()"><i class="bi bi-pencil me-1"></i>\u05E2\u05E8\u05D9\u05DB\u05D4</button>
      </div>
      <div class="card-body" id="org-info-card">
        <div class="row g-3">
          <div class="col-md-2 text-center">
            <div id="org-logo" class="border rounded d-flex align-items-center justify-content-center mx-auto" style="width:100px;height:100px;background:#f0f4ff">
              <i class="bi bi-mortarboard-fill fs-1 text-primary"></i>
            </div>
          </div>
          <div class="col-md-5">
            <div class="mb-2"><i class="bi bi-building me-2 text-primary"></i><strong>\u05E9\u05DD:</strong> <span id="org-name">\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3</span></div>
            <div class="mb-2"><i class="bi bi-geo-alt me-2 text-danger"></i><strong>\u05DB\u05EA\u05D5\u05D1\u05EA:</strong> <span id="org-address">\u05E8\u05D7\u05D5\u05D1 \u05D4\u05E8\u05D1 \u05E7\u05D5\u05E7 12, \u05D1\u05E0\u05D9 \u05D1\u05E8\u05E7</span></div>
            <div class="mb-2"><i class="bi bi-telephone me-2 text-success"></i><strong>\u05D8\u05DC\u05E4\u05D5\u05DF:</strong> <span id="org-phone">02-123-4567</span></div>
            <div class="mb-2"><i class="bi bi-envelope me-2 text-info"></i><strong>\u05D3\u05D5\u05D0"\u05DC:</strong> <span id="org-email">office@bht.edu</span></div>
          </div>
          <div class="col-md-5">
            <div class="mb-2"><i class="bi bi-person-fill me-2 text-warning"></i><strong>\u05E8\u05D0\u05E9 \u05D4\u05DE\u05D5\u05E1\u05D3:</strong> <span id="org-principal">\u05D4\u05E8\u05D1 \u05D9\u05E8\u05D5\u05E9\u05DC\u05DE\u05D9</span></div>
            <div class="mb-2"><i class="bi bi-calendar-event me-2 text-secondary"></i><strong>\u05E9\u05E0\u05EA \u05D9\u05E1\u05D5\u05D3:</strong> <span id="org-founded">\u05EA\u05E9\u05E2"\u05D3 (2004)</span></div>
            <div class="mb-2"><i class="bi bi-clock me-2 text-primary"></i><strong>\u05E9\u05E2\u05D5\u05EA \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA:</strong> <span id="org-hours">07:30 - 17:00</span></div>
            <div class="mb-2"><i class="bi bi-globe me-2 text-info"></i><strong>\u05D0\u05EA\u05E8:</strong> <span id="org-website">www.bht.edu</span></div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <!-- LEFT COLUMN -->
      <div class="col-lg-7">
        <!-- Class Management -->
        <div class="card mb-4">
          <div class="card-header d-flex align-items-center gap-2">
            <i class="bi bi-easel-fill text-success"></i>
            <span class="fw-bold">\u05E0\u05D9\u05D4\u05D5\u05DC \u05DB\u05D9\u05EA\u05D5\u05EA</span>
            <span class="badge bg-success ms-auto" id="org-class-count">0</span>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table table-sm table-hover mb-0">
                <thead class="table-light"><tr>
                  <th>\u05DB\u05D9\u05EA\u05D4</th>
                  <th>\u05DE\u05D7\u05E0\u05DA</th>
                  <th>\u05D7\u05D3\u05E8</th>
                  <th>\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</th>
                  <th></th>
                </tr></thead>
                <tbody id="org-class-table"></tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Committee Management -->
        <div class="card mb-4">
          <div class="card-header d-flex align-items-center gap-2">
            <i class="bi bi-people-fill text-primary"></i>
            <span class="fw-bold">\u05D5\u05E2\u05D3\u05D5\u05EA</span>
            <span class="badge bg-primary ms-auto" id="org-comm-count">0</span>
          </div>
          <div class="card-body p-0" id="org-committees-list"></div>
        </div>
      </div>

      <!-- RIGHT COLUMN -->
      <div class="col-lg-5">
        <!-- Academic Year Timeline -->
        <div class="card mb-4">
          <div class="card-header d-flex align-items-center gap-2">
            <i class="bi bi-calendar3 text-warning"></i>
            <span class="fw-bold">\u05E6\u05D9\u05E8 \u05D4\u05D6\u05DE\u05DF \u2014 \u05E9\u05E0\u05D4"\u05DC \u05EA\u05E9\u05E4"\u05D5</span>
          </div>
          <div class="card-body" id="org-timeline"></div>
        </div>

        <!-- Upcoming Events -->
        <div class="card mb-4">
          <div class="card-header d-flex align-items-center gap-2">
            <i class="bi bi-calendar-event text-danger"></i>
            <span class="fw-bold">\u05D0\u05D9\u05E8\u05D5\u05E2\u05D9\u05DD \u05E7\u05E8\u05D5\u05D1\u05D9\u05DD</span>
          </div>
          <div class="card-body p-0" id="org-events-list"></div>
        </div>

        <!-- Contact Information -->
        <div class="card mb-4">
          <div class="card-header d-flex align-items-center gap-2">
            <i class="bi bi-person-lines-fill text-info"></i>
            <span class="fw-bold">\u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8</span>
          </div>
          <div class="card-body p-0" id="org-contacts-list"></div>
        </div>
      </div>
    </div>

    <!-- Edit Institution Modal -->
    <div class="modal fade" id="org-edit-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title">\u05E2\u05E8\u05D9\u05DB\u05EA \u05E4\u05E8\u05D8\u05D9 \u05DE\u05D5\u05E1\u05D3</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body"><div class="row g-3">
        <div class="col-12"><label class="form-label">\u05E9\u05DD \u05D4\u05DE\u05D5\u05E1\u05D3</label><input class="form-control" id="orgf-name"></div>
        <div class="col-12"><label class="form-label">\u05DB\u05EA\u05D5\u05D1\u05EA</label><input class="form-control" id="orgf-address"></div>
        <div class="col-6"><label class="form-label">\u05D8\u05DC\u05E4\u05D5\u05DF</label><input class="form-control" id="orgf-phone"></div>
        <div class="col-6"><label class="form-label">\u05D3\u05D5\u05D0"\u05DC</label><input class="form-control" id="orgf-email"></div>
        <div class="col-6"><label class="form-label">\u05E8\u05D0\u05E9 \u05D4\u05DE\u05D5\u05E1\u05D3</label><input class="form-control" id="orgf-principal"></div>
        <div class="col-6"><label class="form-label">\u05E9\u05E0\u05EA \u05D9\u05E1\u05D5\u05D3</label><input class="form-control" id="orgf-founded"></div>
        <div class="col-6"><label class="form-label">\u05E9\u05E2\u05D5\u05EA \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA</label><input class="form-control" id="orgf-hours"></div>
        <div class="col-6"><label class="form-label">\u05D0\u05EA\u05E8</label><input class="form-control" id="orgf-website"></div>
      </div></div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveOrgInfo()">\u05E9\u05DE\u05D5\u05E8</button></div>
    </div></div></div>
    `;
  },

  /* -- Demo data -- */
  _orgDemoInfo: {
    name: '\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3',
    address: '\u05E8\u05D7\u05D5\u05D1 \u05D4\u05E8\u05D1 \u05E7\u05D5\u05E7 12, \u05D1\u05E0\u05D9 \u05D1\u05E8\u05E7',
    phone: '02-123-4567',
    email: 'office@bht.edu',
    principal: '\u05D4\u05E8\u05D1 \u05D9\u05E8\u05D5\u05E9\u05DC\u05DE\u05D9',
    founded: '\u05EA\u05E9\u05E2"\u05D3 (2004)',
    hours: '07:30 - 17:00',
    website: 'www.bht.edu'
  },

  _orgDemoClasses: [],

  _orgDemoCommittees: [],

  _orgDemoTimeline: [],

  _orgDemoContacts: [],

  /* -- Init -- */
  organizationInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    // Gather real data where available, fallback to demo
    let students = [], staff = [], classes = [], committees = [], events = [], budget = [];
    try {
      students = _gc('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
      staff = _gc('\u05E6\u05D5\u05D5\u05EA');
      committees = _gc('\u05D5\u05E2\u05D3\u05D5\u05EA');
      events = _gc('\u05DC\u05D5\u05D7_\u05E9\u05E0\u05D4');
      budget = _gc('\u05EA\u05E7\u05E6\u05D9\u05D1');
    } catch(e) { /* use demo */ }

    const activeStudents = students.filter(s => (s['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') !== '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC');
    const activeStaff = staff.filter(s => (s['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') !== '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC');

    // Build class list from students data or demo
    const classMap = {};
    activeStudents.forEach(s => {
      const cls = s['\u05DB\u05D9\u05EA\u05D4'] || '';
      if (cls) {
        if (!classMap[cls]) classMap[cls] = { name: cls, students: 0, teacher: '', room: '' };
        classMap[cls].students++;
      }
    });
    classes = Object.values(classMap);
    // Don't auto-load demo classes — show zero if no data

    // Statistics
    const totalStudents = activeStudents.length || (classes.length ? classes.reduce((s, c) => s + (c.students||0), 0) : 0);
    const totalClasses = classes.length;
    const totalStaff = activeStaff.length;
    const totalBudget = budget.reduce((s, b) => s + (parseFloat(b['\u05E1\u05DB\u05D5\u05DD'] || b['\u05EA\u05E7\u05E6\u05D9\u05D1'] || 0)), 0);

    document.getElementById('org-stat-students').textContent = totalStudents;
    document.getElementById('org-stat-classes').textContent = totalClasses;
    document.getElementById('org-stat-staff').textContent = totalStaff;
    document.getElementById('org-stat-budget').textContent = '\u20AA' + totalBudget.toLocaleString();

    // Load saved org info
    const saved = App.store?.orgInfo || null;
    if (saved) {
      document.getElementById('org-name').textContent = saved.name || this._orgDemoInfo.name;
      document.getElementById('org-address').textContent = saved.address || this._orgDemoInfo.address;
      document.getElementById('org-phone').textContent = saved.phone || this._orgDemoInfo.phone;
      document.getElementById('org-email').textContent = saved.email || this._orgDemoInfo.email;
      document.getElementById('org-principal').textContent = saved.principal || this._orgDemoInfo.principal;
      document.getElementById('org-founded').textContent = saved.founded || this._orgDemoInfo.founded;
      document.getElementById('org-hours').textContent = saved.hours || this._orgDemoInfo.hours;
      document.getElementById('org-website').textContent = saved.website || this._orgDemoInfo.website;
    }

    // Render class table
    document.getElementById('org-class-count').textContent = totalClasses;
    const colors = ['primary','success','warning','info','danger','secondary'];
    document.getElementById('org-class-table').innerHTML = classes.map((c, i) => {
      const clr = c.color || colors[i % colors.length];
      return `<tr>
        <td><span class="badge bg-${clr}">${c.name}</span></td>
        <td>${c.teacher || '--'}</td>
        <td>${c.room || '--'}</td>
        <td><span class="badge bg-light text-dark"><i class="bi bi-people me-1"></i>${c.students}</span></td>
        <td><button class="btn btn-sm btn-outline-primary" onclick="App.navigate('schedule')" title="\u05DE\u05E2\u05E8\u05DB\u05EA"><i class="bi bi-table"></i></button></td>
      </tr>`;
    }).join('');

    // Render committees
    const commData = committees.length ? committees : [];
    document.getElementById('org-comm-count').textContent = commData.length;
    if (!commData.length) {
      document.getElementById('org-committees-list').innerHTML = '<div class="p-3 text-center text-muted">\u05D0\u05D9\u05DF \u05D5\u05E2\u05D3\u05D5\u05EA</div>';
    } else {
      document.getElementById('org-committees-list').innerHTML = '<div class="list-group list-group-flush">' + commData.map(c => {
        const stColor = (c.status || c['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '') === '\u05E4\u05E2\u05D9\u05DC' ? 'success' : 'secondary';
        const stLabel = c.status || c['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '\u05E4\u05E2\u05D9\u05DC';
        const nm = c.nextMeeting || c['\u05E4\u05D2\u05D9\u05E9\u05D4_\u05D4\u05D1\u05D0\u05D4'] || '';
        const membersRaw = c.members || c['\u05D7\u05D1\u05E8\u05D9\u05DD'] || '';
        const membersStr = Array.isArray(membersRaw) ? membersRaw.map(m => m.name || m).join(', ') : membersRaw;
        const memberCount = Array.isArray(membersRaw) ? membersRaw.length : (typeof membersRaw === 'string' && membersRaw ? membersRaw.split(',').length : 0);
        const icon = c.icon || 'people';
        return `<div class="list-group-item" style="cursor:pointer" onclick="App.navigate('committees')">
          <div class="d-flex align-items-center gap-2 mb-1">
            <i class="bi bi-${icon}-fill text-primary"></i>
            <span class="fw-bold">${c.name || c['\u05E9\u05DD'] || ''}</span>
            <span class="badge bg-${stColor} ms-auto">${stLabel}</span>
          </div>
          <div class="small text-muted"><i class="bi bi-person me-1"></i>${memberCount} \u05D7\u05D1\u05E8\u05D9\u05DD</div>
          ${nm ? `<div class="small mt-1"><i class="bi bi-calendar-check text-primary me-1"></i>\u05E4\u05D2\u05D9\u05E9\u05D4 \u05D4\u05D1\u05D0\u05D4: <strong>${nm}</strong></div>` : ''}
        </div>`;
      }).join('') + '</div>';
    }

    // Render timeline
    this._renderOrgTimeline();

    // Render upcoming events
    const today = Utils.todayISO();
    const upcoming = (events.length ? events : []).filter(e => (e['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '') >= today).sort((a, b) => (a['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '').localeCompare(b['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '')).slice(0, 8);
    const typeColors = { '\u05D0\u05D9\u05E8\u05D5\u05E2': 'primary', '\u05D7\u05D2': 'danger', '\u05D7\u05D5\u05E4\u05E9\u05D4': 'success', '\u05DE\u05D1\u05D7\u05DF': 'warning' };
    if (!upcoming.length) {
      document.getElementById('org-events-list').innerHTML = '<div class="p-3 text-center text-muted"><i class="bi bi-calendar-x fs-3 d-block mb-2"></i>\u05D0\u05D9\u05DF \u05D0\u05D9\u05E8\u05D5\u05E2\u05D9\u05DD \u05E7\u05E8\u05D5\u05D1\u05D9\u05DD<br><a href="#" onclick="App.navigate(\'calendar\');return false" class="small">\u05E6\u05E4\u05D9\u05D9\u05D4 \u05D1\u05DC\u05D5\u05D7 \u05D4\u05E9\u05E0\u05D4</a></div>';
    } else {
      document.getElementById('org-events-list').innerHTML = '<div class="list-group list-group-flush">' + upcoming.map(e => {
        const tc = typeColors[e['\u05E1\u05D5\u05D2']] || 'secondary';
        return `<div class="list-group-item d-flex align-items-center gap-2">
          <span class="badge bg-${tc}">${e['\u05E1\u05D5\u05D2'] || '\u05D0\u05D9\u05E8\u05D5\u05E2'}</span>
          <span class="flex-grow-1">${e['\u05DB\u05D5\u05EA\u05E8\u05EA'] || ''}</span>
          <small class="text-muted">${e['\u05EA\u05D0\u05E8\u05D9\u05DA'] || ''}</small>
        </div>`;
      }).join('') + '</div>';
    }

    // Render contacts (use saved or show empty)
    const contacts = (App.store?.orgContacts) || [];
    if (!contacts.length) {
      document.getElementById('org-contacts-list').innerHTML = '<div class="p-3 text-center text-muted">\u05D0\u05D9\u05DF \u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8</div>';
    } else {
    document.getElementById('org-contacts-list').innerHTML = '<div class="list-group list-group-flush">' + contacts.map(c => {
      return `<div class="list-group-item">
        <div class="d-flex align-items-center gap-2 mb-1">
          <div class="avatar avatar-sm bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center rounded-circle" style="width:36px;height:36px"><i class="bi bi-${c.icon}"></i></div>
          <div class="flex-grow-1">
            <div class="fw-bold small">${c.name}</div>
            <div class="text-muted" style="font-size:11px">${c.role}</div>
          </div>
        </div>
        <div class="small">
          <a href="tel:${c.phone}" class="text-decoration-none me-3"><i class="bi bi-telephone me-1"></i>${c.phone}</a>
          <a href="mailto:${c.email}" class="text-decoration-none"><i class="bi bi-envelope me-1"></i>${c.email}</a>
        </div>
      </div>`;
    }).join('') + '</div>';
    }

    Utils.toast('\u05D0\u05E8\u05D2\u05D5\u05DF \u05E0\u05D8\u05E2\u05DF');
  },

  _renderOrgTimeline() {
    const items = this._orgDemoTimeline;
    const today = new Date();
    const yearStart = new Date('2025-09-01');
    const yearEnd = new Date('2026-08-31');
    const totalDays = (yearEnd - yearStart) / (1000 * 60 * 60 * 24);

    let html = '<div class="position-relative" style="min-height:' + (items.length * 52 + 20) + 'px">';

    // Today marker
    const todayPct = Math.max(0, Math.min(100, ((today - yearStart) / (1000 * 60 * 60 * 24) / totalDays) * 100));
    html += `<div class="position-absolute" style="right:${todayPct}%;top:0;bottom:0;width:2px;background:red;z-index:2" title="\u05D4\u05D9\u05D5\u05DD"></div>`;

    items.forEach((item, i) => {
      const s = new Date(item.start);
      const e = new Date(item.end);
      const startPct = Math.max(0, ((s - yearStart) / (1000 * 60 * 60 * 24) / totalDays) * 100);
      const widthPct = Math.max(3, ((e - s) / (1000 * 60 * 60 * 24) / totalDays) * 100);
      const isPast = e < today;
      const isCurrent = s <= today && e >= today;

      html += `<div class="position-absolute d-flex align-items-center gap-1" style="top:${i * 52 + 10}px;right:${startPct}%;width:${widthPct}%;height:40px">
        <div class="rounded-pill bg-${item.color}${isPast ? ' bg-opacity-50' : ''} text-white px-2 py-1 w-100 text-center small fw-bold d-flex align-items-center justify-content-center gap-1 ${isCurrent ? 'shadow' : ''}" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;border:${isCurrent ? '2px solid var(--bs-' + item.color + ')' : 'none'}">
          <i class="bi bi-${item.icon}"></i>
          <span>${item.label}</span>
        </div>
      </div>`;
    });

    html += '</div>';

    // Month labels
    const months = ['\u05E1\u05E4\u05D8','\u05D0\u05D5\u05E7','\u05E0\u05D5\u05D1','\u05D3\u05E6\u05DE','\u05D9\u05E0\u05D5','\u05E4\u05D1\u05E8','\u05DE\u05E8\u05E5','\u05D0\u05E4\u05E8','\u05DE\u05D0\u05D9','\u05D9\u05D5\u05E0','\u05D9\u05D5\u05DC','\u05D0\u05D5\u05D2'];
    html += '<div class="d-flex justify-content-between mt-2 border-top pt-2">';
    months.forEach(m => { html += `<span class="text-muted" style="font-size:10px">${m}</span>`; });
    html += '</div>';

    document.getElementById('org-timeline').innerHTML = html;
  },

  editOrgInfo() {
    const info = App.store?.orgInfo || this._orgDemoInfo;
    document.getElementById('orgf-name').value = info.name || '';
    document.getElementById('orgf-address').value = info.address || '';
    document.getElementById('orgf-phone').value = info.phone || '';
    document.getElementById('orgf-email').value = info.email || '';
    document.getElementById('orgf-principal').value = info.principal || '';
    document.getElementById('orgf-founded').value = info.founded || '';
    document.getElementById('orgf-hours').value = info.hours || '';
    document.getElementById('orgf-website').value = info.website || '';
    new bootstrap.Modal(document.getElementById('org-edit-modal')).show();
  },

  saveOrgInfo() {
    const info = {
      name: document.getElementById('orgf-name').value.trim(),
      address: document.getElementById('orgf-address').value.trim(),
      phone: document.getElementById('orgf-phone').value.trim(),
      email: document.getElementById('orgf-email').value.trim(),
      principal: document.getElementById('orgf-principal').value.trim(),
      founded: document.getElementById('orgf-founded').value.trim(),
      hours: document.getElementById('orgf-hours').value.trim(),
      website: document.getElementById('orgf-website').value.trim()
    };
    if (!App.store) App.store = {};
    App.store.orgInfo = info;
    try { localStorage.setItem('bht_org_info', JSON.stringify(info)); } catch(e) { /* silent */ }

    // Update display
    document.getElementById('org-name').textContent = info.name || this._orgDemoInfo.name;
    document.getElementById('org-address').textContent = info.address || this._orgDemoInfo.address;
    document.getElementById('org-phone').textContent = info.phone || this._orgDemoInfo.phone;
    document.getElementById('org-email').textContent = info.email || this._orgDemoInfo.email;
    document.getElementById('org-principal').textContent = info.principal || this._orgDemoInfo.principal;
    document.getElementById('org-founded').textContent = info.founded || this._orgDemoInfo.founded;
    document.getElementById('org-hours').textContent = info.hours || this._orgDemoInfo.hours;
    document.getElementById('org-website').textContent = info.website || this._orgDemoInfo.website;

    bootstrap.Modal.getInstance(document.getElementById('org-edit-modal'))?.hide();
    Utils.toast('\u05E4\u05E8\u05D8\u05D9 \u05D4\u05DE\u05D5\u05E1\u05D3 \u05E2\u05D5\u05D3\u05DB\u05E0\u05D5');
  },


  /* ======================================================================
     TASKS (KANBAN) — Full Kanban Board v2
     ====================================================================== */
  tasks() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div><h1><i class="bi bi-kanban me-2"></i>\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA</h1></div>
        <div class="d-flex gap-2 flex-wrap align-items-center">
          <div class="input-group input-group-sm" style="width:220px">
            <span class="input-group-text"><i class="bi bi-search"></i></span>
            <input class="form-control" id="task-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9..." oninput="Pages.filterTasks()">
          </div>
          <select class="form-select form-select-sm" id="task-filter-priority" style="width:130px" onchange="Pages.filterTasks()">
            <option value="">\u05DB\u05DC \u05D4\u05E2\u05D3\u05D9\u05E4\u05D5\u05D9\u05D5\u05EA</option>
            <option value="\u05D3\u05D7\u05D5\u05E3">\u05D3\u05D7\u05D5\u05E3</option>
            <option value="\u05D2\u05D1\u05D5\u05D4">\u05D2\u05D1\u05D5\u05D4</option>
            <option value="\u05E8\u05D2\u05D9\u05DC">\u05E8\u05D2\u05D9\u05DC</option>
            <option value="\u05E0\u05DE\u05D5\u05DA">\u05E0\u05DE\u05D5\u05DA</option>
          </select>
          <button class="btn btn-primary btn-sm" onclick="Pages.showAddTaskModal()"><i class="bi bi-plus-lg me-1"></i>\u05DE\u05E9\u05D9\u05DE\u05D4 \u05D7\u05D3\u05E9\u05D4</button>
        </div>
      </div>

      <!-- Stats Row -->
      <div class="row g-3 mb-3">
        <div class="col-6 col-md-3"><div class="card p-3 text-center border-start border-4 border-primary"><div class="fs-3 fw-bold text-primary" id="task-stat-total">0</div><small class="text-muted">\u05E1\u05D4"\u05DB \u05DE\u05E9\u05D9\u05DE\u05D5\u05EA</small></div></div>
        <div class="col-6 col-md-3"><div class="card p-3 text-center border-start border-4 border-warning"><div class="fs-3 fw-bold text-warning" id="task-stat-prog">0</div><small class="text-muted">\u05D1\u05EA\u05D4\u05DC\u05D9\u05DA</small></div></div>
        <div class="col-6 col-md-3"><div class="card p-3 text-center border-start border-4 border-success"><div class="fs-3 fw-bold text-success" id="task-stat-done">0</div><small class="text-muted">\u05D4\u05D5\u05E9\u05DC\u05DE\u05D5 \u05D4\u05D9\u05D5\u05DD</small></div></div>
        <div class="col-6 col-md-3"><div class="card p-3 text-center border-start border-4 border-danger"><div class="fs-3 fw-bold text-danger" id="task-stat-overdue">0</div><small class="text-muted">\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8</small></div></div>
      </div>

      <!-- Quick Add Bar -->
      <div class="card mb-3 border-0 shadow-sm">
        <div class="card-body p-2">
          <div class="d-flex gap-2 flex-wrap align-items-end">
            <div class="flex-grow-1" style="min-width:180px">
              <label class="form-label small mb-0 fw-bold">\u05DB\u05D5\u05EA\u05E8\u05EA</label>
              <input class="form-control form-control-sm" id="quick-task" placeholder="\u05DE\u05E9\u05D9\u05DE\u05D4 \u05D7\u05D3\u05E9\u05D4..." onkeydown="if(event.key==='Enter')Pages.quickAddTask()">
            </div>
            <div style="min-width:140px">
              <label class="form-label small mb-0">\u05D0\u05D7\u05E8\u05D0\u05D9</label>
              <input class="form-control form-control-sm" id="quick-task-assignee" list="staff-datalist" placeholder="\u05D1\u05D7\u05E8...">
              <datalist id="staff-datalist"></datalist>
            </div>
            <div style="width:110px">
              <label class="form-label small mb-0">\u05E2\u05D3\u05D9\u05E4\u05D5\u05EA</label>
              <select class="form-select form-select-sm" id="quick-task-priority">
                <option value="\u05E8\u05D2\u05D9\u05DC">\u05E8\u05D2\u05D9\u05DC</option>
                <option value="\u05D2\u05D1\u05D5\u05D4">\u05D2\u05D1\u05D5\u05D4</option>
                <option value="\u05D3\u05D7\u05D5\u05E3">\u05D3\u05D7\u05D5\u05E3</option>
                <option value="\u05E0\u05DE\u05D5\u05DA">\u05E0\u05DE\u05D5\u05DA</option>
              </select>
            </div>
            <div style="width:140px">
              <label class="form-label small mb-0">\u05EA\u05D0\u05E8\u05D9\u05DA \u05D9\u05E2\u05D3</label>
              <input type="date" class="form-control form-control-sm" id="quick-task-due">
            </div>
            <button class="btn btn-primary btn-sm" onclick="Pages.quickAddTask()"><i class="bi bi-plus-lg me-1"></i>\u05D4\u05D5\u05E1\u05E3</button>
          </div>
        </div>
      </div>

      <!-- Kanban Columns -->
      <div class="row g-3" id="task-kanban">
        <!-- \u05DC\u05D1\u05D9\u05E6\u05D5\u05E2 -->
        <div class="col-md-4">
          <div class="card h-100" style="background:#f8f9fa;border-top:3px solid var(--bs-secondary)">
            <div class="card-header bg-transparent d-flex justify-content-between align-items-center py-2">
              <span class="fw-bold"><i class="bi bi-circle me-1 text-secondary"></i>\u05DC\u05D1\u05D9\u05E6\u05D5\u05E2</span>
              <span class="badge bg-secondary rounded-pill" id="task-new-c">0</span>
            </div>
            <div class="card-body p-2" id="task-new" style="min-height:250px;max-height:70vh;overflow-y:auto"></div>
          </div>
        </div>
        <!-- \u05D1\u05EA\u05D4\u05DC\u05D9\u05DA -->
        <div class="col-md-4">
          <div class="card h-100" style="background:#eff6ff;border-top:3px solid var(--bs-primary)">
            <div class="card-header bg-transparent d-flex justify-content-between align-items-center py-2">
              <span class="fw-bold"><i class="bi bi-play-circle me-1 text-primary"></i>\u05D1\u05EA\u05D4\u05DC\u05D9\u05DA</span>
              <span class="badge bg-primary rounded-pill" id="task-prog-c">0</span>
            </div>
            <div class="card-body p-2" id="task-prog" style="min-height:250px;max-height:70vh;overflow-y:auto"></div>
          </div>
        </div>
        <!-- \u05D4\u05D5\u05E9\u05DC\u05DD -->
        <div class="col-md-4">
          <div class="card h-100" style="background:#f0fdf4;border-top:3px solid var(--bs-success)">
            <div class="card-header bg-transparent d-flex justify-content-between align-items-center py-2">
              <span class="fw-bold"><i class="bi bi-check-circle me-1 text-success"></i>\u05D4\u05D5\u05E9\u05DC\u05DD</span>
              <span class="badge bg-success rounded-pill" id="task-done-c">0</span>
            </div>
            <div class="card-body p-2" id="task-done" style="min-height:250px;max-height:70vh;overflow-y:auto"></div>
          </div>
        </div>
      </div>

      <!-- Add Task Modal -->
      <div class="modal fade" id="task-modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"><i class="bi bi-plus-circle me-2"></i>\u05DE\u05E9\u05D9\u05DE\u05D4 \u05D7\u05D3\u05E9\u05D4</h5>
              <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="row g-3">
                <div class="col-12">
                  <label class="form-label fw-bold">\u05DB\u05D5\u05EA\u05E8\u05EA <span class="text-danger">*</span></label>
                  <input class="form-control" id="tf-title" placeholder="\u05E9\u05DD \u05D4\u05DE\u05E9\u05D9\u05DE\u05D4">
                </div>
                <div class="col-12">
                  <label class="form-label">\u05EA\u05D9\u05D0\u05D5\u05E8</label>
                  <textarea class="form-control" id="tf-desc" rows="2" placeholder="\u05E4\u05E8\u05D8\u05D9\u05DD \u05E0\u05D5\u05E1\u05E4\u05D9\u05DD..."></textarea>
                </div>
                <div class="col-6">
                  <label class="form-label">\u05D0\u05D7\u05E8\u05D0\u05D9</label>
                  <input class="form-control" id="tf-assignee" placeholder="\u05E9\u05DD \u05D4\u05D0\u05D7\u05E8\u05D0\u05D9">
                </div>
                <div class="col-6">
                  <label class="form-label">\u05E2\u05D3\u05D9\u05E4\u05D5\u05EA</label>
                  <select class="form-select" id="tf-priority">
                    <option value="\u05E8\u05D2\u05D9\u05DC">\u05E8\u05D2\u05D9\u05DC</option>
                    <option value="\u05E0\u05DE\u05D5\u05DA">\u05E0\u05DE\u05D5\u05DA</option>
                    <option value="\u05D2\u05D1\u05D5\u05D4">\u05D2\u05D1\u05D5\u05D4</option>
                    <option value="\u05D3\u05D7\u05D5\u05E3">\u05D3\u05D7\u05D5\u05E3</option>
                  </select>
                </div>
                <div class="col-6">
                  <label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA \u05D9\u05E2\u05D3</label>
                  <input type="date" class="form-control" id="tf-due">
                </div>
                <div class="col-6">
                  <label class="form-label">\u05E1\u05D8\u05D8\u05D5\u05E1</label>
                  <select class="form-select" id="tf-status">
                    <option value="\u05D7\u05D3\u05E9">\u05DC\u05D1\u05D9\u05E6\u05D5\u05E2</option>
                    <option value="\u05D1\u05EA\u05D4\u05DC\u05D9\u05DA">\u05D1\u05EA\u05D4\u05DC\u05D9\u05DA</option>
                    <option value="\u05D4\u05D5\u05E9\u05DC\u05DD">\u05D4\u05D5\u05E9\u05DC\u05DD</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button>
              <button class="btn btn-primary" onclick="Pages.saveNewTask()"><i class="bi bi-check-lg me-1"></i>\u05E9\u05DE\u05D5\u05E8</button>
            </div>
          </div>
        </div>
      </div>`;
  },

  _taskData: [],
  _taskFilteredData: null,

  _taskUseDemo: false,

  taskLoadDemo() {
    this._taskUseDemo = true;
    this._taskData = this._getDemoTasks();
    this._taskFilteredData = null;
    this.filterTasks();
    Utils.toast('\u05E0\u05D8\u05E2\u05E0\u05D5 \u05E0\u05EA\u05D5\u05E0\u05D9 \u05D3\u05DE\u05D5', 'info');
  },

  tasksInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    this._taskData = _gc('\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA');
    // Only use demo if explicitly toggled by user
    if ((!this._taskData || this._taskData.length === 0) && this._taskUseDemo) {
      this._taskData = this._getDemoTasks();
    }
    this._taskFilteredData = null;
    // Populate staff datalist for quick-add assignee
    const staffDL = document.getElementById('staff-datalist');
    if (staffDL) {
      const staff = _gc('\u05E6\u05D5\u05D5\u05EA').filter(s => (s['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') !== '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC');
      staffDL.innerHTML = staff.map(s => {
        const name = ((s['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9']||'') + ' ' + (s['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4']||'')).trim() || (typeof Utils !== 'undefined' && Utils.fullName ? Utils.fullName(s) : '');
        return name ? '<option value="' + name + '">' : '';
      }).filter(Boolean).join('');
    }
    this.filterTasks();
  },

  _getDemoTasks() {
    // Lightweight: generate minimal test data on demand
    const d = (offset) => { const dt = new Date(); dt.setDate(dt.getDate() + offset); return dt.toISOString().substring(0,10); };
    return [
      { id:'demo1', 'כותרת':'משימה לדוגמה', 'סטטוס':'חדש', 'עדיפות':'רגיל', 'תאריך_יעד':d(3) },
      { id:'demo2', 'כותרת':'משימה בתהליך', 'סטטוס':'בתהליך', 'עדיפות':'גבוה', 'תאריך_יעד':d(1) },
      { id:'demo3', 'כותרת':'משימה שהושלמה', 'סטטוס':'הושלם', 'עדיפות':'נמוך', 'תאריך_יעד':d(-1) }
    ];
  },

  filterTasks() {
    const search = (document.getElementById('task-search')?.value || '').trim().toLowerCase();
    const priority = document.getElementById('task-filter-priority')?.value || '';
    let data = this._taskData || [];
    if (search) {
      data = data.filter(t =>
        (t['\u05DB\u05D5\u05EA\u05E8\u05EA']||'').toLowerCase().includes(search) ||
        (t['\u05EA\u05D9\u05D0\u05D5\u05E8']||'').toLowerCase().includes(search) ||
        (t['\u05D0\u05D7\u05E8\u05D0\u05D9']||'').toLowerCase().includes(search)
      );
    }
    if (priority) {
      data = data.filter(t => t['\u05E2\u05D3\u05D9\u05E4\u05D5\u05EA'] === priority);
    }
    this._taskFilteredData = data;
    this.renderTasks();
  },

  renderTasks() {
    const data = this._taskFilteredData || this._taskData || [];
    const allData = this._taskData || [];
    const today = Utils.todayISO();

    // Empty state when no data — render empty columns instead of returning early
    if (!allData.length) {
      const el = (id) => document.getElementById(id);
      const emptyCol = '<div class="text-muted text-center small py-4"><i class="bi bi-inbox fs-3 d-block mb-2 opacity-50"></i>\u05D0\u05D9\u05DF \u05DE\u05E9\u05D9\u05DE\u05D5\u05EA</div>';
      if (el('task-new')) el('task-new').innerHTML = emptyCol;
      if (el('task-prog')) el('task-prog').innerHTML = emptyCol;
      if (el('task-done')) el('task-done').innerHTML = emptyCol;
      if (el('task-new-c')) el('task-new-c').textContent = 0;
      if (el('task-prog-c')) el('task-prog-c').textContent = 0;
      if (el('task-done-c')) el('task-done-c').textContent = 0;
      if (el('task-stat-total')) el('task-stat-total').textContent = 0;
      if (el('task-stat-prog')) el('task-stat-prog').textContent = 0;
      if (el('task-stat-done')) el('task-stat-done').textContent = 0;
      if (el('task-stat-overdue')) el('task-stat-overdue').textContent = 0;
      return;
    }

    // Build columns
    const cols = { '\u05D7\u05D3\u05E9':[], '\u05D1\u05EA\u05D4\u05DC\u05D9\u05DA':[], '\u05D4\u05D5\u05E9\u05DC\u05DD':[] };
    data.forEach(t => {
      const s = t['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '\u05D7\u05D3\u05E9';
      if (cols[s]) cols[s].push(t); else cols['\u05D7\u05D3\u05E9'].push(t);
    });

    // Stats (always from full data)
    const overdue = allData.filter(t => {
      const due = t['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E2\u05D3'] || '';
      return due && due < today && t['\u05E1\u05D8\u05D8\u05D5\u05E1'] !== '\u05D4\u05D5\u05E9\u05DC\u05DD';
    }).length;
    const doneToday = allData.filter(t => t['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D4\u05D5\u05E9\u05DC\u05DD' && (t['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E2\u05D3'] || t['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '') === today).length;
    const inProgress = allData.filter(t => t['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D1\u05EA\u05D4\u05DC\u05D9\u05DA').length;

    const el = (id) => document.getElementById(id);
    if (el('task-stat-total')) el('task-stat-total').textContent = allData.length;
    if (el('task-stat-prog')) el('task-stat-prog').textContent = inProgress;
    if (el('task-stat-done')) el('task-stat-done').textContent = doneToday;
    if (el('task-stat-overdue')) el('task-stat-overdue').textContent = overdue;

    // Priority colors & icons
    const prC = { '\u05D3\u05D7\u05D5\u05E3':'danger', '\u05D2\u05D1\u05D5\u05D4':'warning', '\u05E8\u05D2\u05D9\u05DC':'primary', '\u05E0\u05DE\u05D5\u05DA':'secondary' };
    const prI = { '\u05D3\u05D7\u05D5\u05E3':'bi-exclamation-triangle-fill', '\u05D2\u05D1\u05D5\u05D4':'bi-arrow-up', '\u05E8\u05D2\u05D9\u05DC':'bi-dash', '\u05E0\u05DE\u05D5\u05DA':'bi-arrow-down' };

    // Avatar helper
    const avatar = (name) => {
      if (!name) return '';
      const initials = name.trim().split(/\s+/).map(w => w[0]).join('').substring(0,2);
      const colors = ['#2563eb','#0f9d58','#ea4335','#f9ab00','#8b5cf6','#06b6d4','#ec4899'];
      const ci = name.split('').reduce((a,c) => a+c.charCodeAt(0), 0) % colors.length;
      return `<span class="d-inline-flex align-items-center justify-content-center rounded-circle text-white fw-bold" style="width:26px;height:26px;font-size:11px;background:${colors[ci]}" title="${name}">${initials}</span>`;
    };

    // Due date display helper
    const dueDisplay = (due) => {
      if (!due) return '';
      const diff = Math.ceil((new Date(due) - new Date(today)) / 86400000);
      let cls = 'text-muted', icon = 'bi-calendar', label = due;
      if (diff < 0) { cls = 'text-danger fw-bold'; icon = 'bi-exclamation-circle-fill'; label = `\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8 (${Math.abs(diff)} \u05D9\u05DE\u05D9\u05DD)`; }
      else if (diff === 0) { cls = 'text-warning fw-bold'; label = '\u05D4\u05D9\u05D5\u05DD'; }
      else if (diff === 1) { cls = 'text-info'; label = '\u05DE\u05D7\u05E8'; }
      else if (diff <= 3) { cls = 'text-info'; label = `\u05D1\u05E2\u05D5\u05D3 ${diff} \u05D9\u05DE\u05D9\u05DD`; }
      return `<span class="${cls}" style="font-size:11px"><i class="bi ${icon} me-1"></i>${label}</span>`;
    };

    // Render a single task card
    const renderCard = (t) => {
      const pc = prC[t['\u05E2\u05D3\u05D9\u05E4\u05D5\u05EA']] || 'secondary';
      const pi = prI[t['\u05E2\u05D3\u05D9\u05E4\u05D5\u05EA']] || 'bi-dash';
      const due = t['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E2\u05D3'] || '';
      const isOverdue = due && due < today && t['\u05E1\u05D8\u05D8\u05D5\u05E1'] !== '\u05D4\u05D5\u05E9\u05DC\u05DD';
      const isDone = t['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D4\u05D5\u05E9\u05DC\u05DD';
      const tid = t.id || t['\u05DE\u05D6\u05D4\u05D4'];
      const status = t['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '\u05D7\u05D3\u05E9';

      // Movement buttons
      let moveLeft = '', moveRight = '';
      if (status === '\u05D7\u05D3\u05E9') {
        moveRight = `<button class="btn btn-sm btn-outline-primary py-0 px-1" onclick="Pages.moveTask('${tid}','\u05D1\u05EA\u05D4\u05DC\u05D9\u05DA')" title="\u05D4\u05E2\u05D1\u05E8 \u05DC\u05D1\u05EA\u05D4\u05DC\u05D9\u05DA"><i class="bi bi-arrow-left"></i></button>`;
      } else if (status === '\u05D1\u05EA\u05D4\u05DC\u05D9\u05DA') {
        moveLeft = `<button class="btn btn-sm btn-outline-secondary py-0 px-1" onclick="Pages.moveTask('${tid}','\u05D7\u05D3\u05E9')" title="\u05D4\u05D7\u05D6\u05E8 \u05DC\u05DC\u05D1\u05D9\u05E6\u05D5\u05E2"><i class="bi bi-arrow-right"></i></button>`;
        moveRight = `<button class="btn btn-sm btn-outline-success py-0 px-1" onclick="Pages.moveTask('${tid}','\u05D4\u05D5\u05E9\u05DC\u05DD')" title="\u05D4\u05E2\u05D1\u05E8 \u05DC\u05D4\u05D5\u05E9\u05DC\u05DD"><i class="bi bi-arrow-left"></i></button>`;
      } else {
        moveLeft = `<button class="btn btn-sm btn-outline-primary py-0 px-1" onclick="Pages.moveTask('${tid}','\u05D1\u05EA\u05D4\u05DC\u05D9\u05DA')" title="\u05D4\u05D7\u05D6\u05E8 \u05DC\u05D1\u05EA\u05D4\u05DC\u05D9\u05DA"><i class="bi bi-arrow-right"></i></button>`;
      }

      return `
        <div class="card mb-2 shadow-sm task-card ${isOverdue ? 'border-danger border-2' : ''} ${isDone ? 'opacity-75' : ''}"
             style="border-right:4px solid var(--bs-${pc});transition:all .2s"
             draggable="true"
             ondragstart="Pages._dragTaskStart(event,'${tid}','${status}')"
             ondragend="Pages._dragTaskEnd(event)">
          <div class="card-body p-2">
            <div class="d-flex justify-content-between align-items-start mb-1">
              <h6 class="card-title mb-0 small fw-bold ${isDone ? 'text-decoration-line-through text-muted' : ''}" style="line-height:1.4">${t['\u05DB\u05D5\u05EA\u05E8\u05EA'] || ''}</h6>
              <span class="badge bg-${pc} ms-1 d-flex align-items-center gap-1" style="font-size:10px;white-space:nowrap"><i class="bi ${pi}"></i>${t['\u05E2\u05D3\u05D9\u05E4\u05D5\u05EA'] || ''}</span>
            </div>
            ${t['\u05EA\u05D9\u05D0\u05D5\u05E8'] ? `<p class="card-text small text-muted mb-1" style="line-height:1.3">${t['\u05EA\u05D9\u05D0\u05D5\u05E8'].length > 60 ? t['\u05EA\u05D9\u05D0\u05D5\u05E8'].substring(0,60)+'...' : t['\u05EA\u05D9\u05D0\u05D5\u05E8']}</p>` : ''}
            <div class="d-flex justify-content-between align-items-center mt-2">
              <div class="d-flex align-items-center gap-2">
                ${avatar(t['\u05D0\u05D7\u05E8\u05D0\u05D9'])}
                ${dueDisplay(due)}
              </div>
              <div class="d-flex gap-1">
                ${moveLeft}${moveRight}
                <button class="btn btn-sm btn-outline-danger py-0 px-1" onclick="Pages.deleteTask('${tid}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash3"></i></button>
              </div>
            </div>
          </div>
        </div>`;
    };

    // Render columns
    const renderCol = (tasks) => !tasks.length
      ? '<div class="text-muted text-center small py-4"><i class="bi bi-inbox fs-3 d-block mb-2 opacity-50"></i>\u05D0\u05D9\u05DF \u05DE\u05E9\u05D9\u05DE\u05D5\u05EA</div>'
      : tasks.map(renderCard).join('');

    if (el('task-new')) el('task-new').innerHTML = renderCol(cols['\u05D7\u05D3\u05E9']);
    if (el('task-prog')) el('task-prog').innerHTML = renderCol(cols['\u05D1\u05EA\u05D4\u05DC\u05D9\u05DA']);
    if (el('task-done')) el('task-done').innerHTML = renderCol(cols['\u05D4\u05D5\u05E9\u05DC\u05DD']);
    if (el('task-new-c')) el('task-new-c').textContent = cols['\u05D7\u05D3\u05E9'].length;
    if (el('task-prog-c')) el('task-prog-c').textContent = cols['\u05D1\u05EA\u05D4\u05DC\u05D9\u05DA'].length;
    if (el('task-done-c')) el('task-done-c').textContent = cols['\u05D4\u05D5\u05E9\u05DC\u05DD'].length;

    // Setup drop zones
    document.querySelectorAll('#task-kanban .card-body[id^="task-"]').forEach(zone => {
      zone.ondragover = (e) => { e.preventDefault(); zone.style.background = 'rgba(37,99,235,0.08)'; };
      zone.ondragleave = () => { zone.style.background = ''; };
      zone.ondrop = (e) => { e.preventDefault(); zone.style.background = ''; Pages._dropTask(e, zone.id); };
    });
  },

  // Drag & drop support
  _dragTaskId: null,
  _dragTaskStatus: null,
  _dragTaskStart(e, id, status) {
    this._dragTaskId = id;
    this._dragTaskStatus = status;
    e.target.closest('.task-card').style.opacity = '0.4';
    e.dataTransfer.effectAllowed = 'move';
  },
  _dragTaskEnd(e) {
    e.target.closest('.task-card').style.opacity = '';
  },
  _dropTask(e, zoneId) {
    if (!this._dragTaskId) return;
    const statusMap = { 'task-new':'\u05D7\u05D3\u05E9', 'task-prog':'\u05D1\u05EA\u05D4\u05DC\u05D9\u05DA', 'task-done':'\u05D4\u05D5\u05E9\u05DC\u05DD' };
    const newStatus = statusMap[zoneId];
    if (newStatus && newStatus !== this._dragTaskStatus) {
      this.moveTask(this._dragTaskId, newStatus);
    }
    this._dragTaskId = null;
    this._dragTaskStatus = null;
  },

  showAddTaskModal() {
    ['tf-title','tf-desc','tf-assignee'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    const due = document.getElementById('tf-due'); if (due) due.value = '';
    const pri = document.getElementById('tf-priority'); if (pri) pri.value = '\u05E8\u05D2\u05D9\u05DC';
    const st = document.getElementById('tf-status'); if (st) st.value = '\u05D7\u05D3\u05E9';
    new bootstrap.Modal(document.getElementById('task-modal')).show();
  },

  async saveNewTask() {
    const title = (document.getElementById('tf-title')?.value || '').trim();
    if (!title) { Utils.toast('\u05D7\u05E1\u05E8\u05D4 \u05DB\u05D5\u05EA\u05E8\u05EA','warning'); return; }
    const row = {
      '\u05DB\u05D5\u05EA\u05E8\u05EA': title,
      '\u05EA\u05D9\u05D0\u05D5\u05E8': (document.getElementById('tf-desc')?.value || '').trim(),
      '\u05D0\u05D7\u05E8\u05D0\u05D9': (document.getElementById('tf-assignee')?.value || '').trim(),
      '\u05E2\u05D3\u05D9\u05E4\u05D5\u05EA': document.getElementById('tf-priority')?.value || '\u05E8\u05D2\u05D9\u05DC',
      '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E2\u05D3': document.getElementById('tf-due')?.value || '',
      '\u05E1\u05D8\u05D8\u05D5\u05E1': document.getElementById('tf-status')?.value || '\u05D7\u05D3\u05E9',
      '\u05EA\u05D0\u05E8\u05D9\u05DA': Utils.todayISO()
    };
    try {
      await App.apiCall('add','\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA',{row});
      bootstrap.Modal.getInstance(document.getElementById('task-modal'))?.hide();
      Utils.toast('\u05DE\u05E9\u05D9\u05DE\u05D4 \u05E0\u05D5\u05E1\u05E4\u05D4');
      this.tasksInit();
    } catch(e) {
      Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger');
    }
  },

  async quickAddTask() {
    const inp = document.getElementById('quick-task');
    const title = (inp ? inp.value : '').trim();
    if (!title) { Utils.toast('\u05D4\u05D6\u05DF \u05DB\u05D5\u05EA\u05E8\u05EA','warning'); return; }
    const assignee = (document.getElementById('quick-task-assignee')?.value || '').trim();
    const priority = document.getElementById('quick-task-priority')?.value || '\u05E8\u05D2\u05D9\u05DC';
    const due = document.getElementById('quick-task-due')?.value || '';
    const row = {
      '\u05DB\u05D5\u05EA\u05E8\u05EA': title,
      '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05D7\u05D3\u05E9',
      '\u05E2\u05D3\u05D9\u05E4\u05D5\u05EA': priority,
      '\u05EA\u05D0\u05E8\u05D9\u05DA': Utils.todayISO()
    };
    if (assignee) row['\u05D0\u05D7\u05E8\u05D0\u05D9'] = assignee;
    if (due) row['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E2\u05D3'] = due;
    try {
      await App.apiCall('add','\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA',{row});
      if (inp) inp.value = '';
      const assigneeInp = document.getElementById('quick-task-assignee'); if (assigneeInp) assigneeInp.value = '';
      const priSel = document.getElementById('quick-task-priority'); if (priSel) priSel.value = '\u05E8\u05D2\u05D9\u05DC';
      const dueInp = document.getElementById('quick-task-due'); if (dueInp) dueInp.value = '';
      Utils.toast('\u05DE\u05E9\u05D9\u05DE\u05D4 \u05E0\u05D5\u05E1\u05E4\u05D4');
      this.tasksInit();
    } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },

  async moveTask(id, status) {
    // Optimistic update for responsiveness
    const task = (this._taskData || []).find(t => (t.id || t['\u05DE\u05D6\u05D4\u05D4']) === id);
    if (task) { task['\u05E1\u05D8\u05D8\u05D5\u05E1'] = status; this.filterTasks(); }
    try {
      await App.apiCall('update','\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA',{id,row:{'\u05E1\u05D8\u05D8\u05D5\u05E1':status}});
      Utils.toast('\u05E2\u05D5\u05D3\u05DB\u05DF');
    } catch(e) {
      Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger');
      this.tasksInit(); // Revert on failure
    }
  },

  async deleteTask(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4','\u05DC\u05DE\u05D7\u05D5\u05E7 \u05DE\u05E9\u05D9\u05DE\u05D4 \u05D6\u05D5?')) return;
    try {
      await App.apiCall('delete','\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA',{id});
      Utils.toast('\u05E0\u05DE\u05D7\u05E7');
      this.tasksInit();
    } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },


  /* ======================================================================
     CALENDAR
     ====================================================================== */
  calendar() {
    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div>
        <h1><i class="bi bi-calendar3 me-2"></i>\u05DC\u05D5\u05D7 \u05E9\u05E0\u05D4</h1>
        <p class="text-muted mb-0">\u05E0\u05D9\u05D4\u05D5\u05DC \u05D0\u05D9\u05E8\u05D5\u05E2\u05D9\u05DD, \u05D7\u05D2\u05D9\u05DD, \u05DE\u05D1\u05D7\u05E0\u05D9\u05DD \u05D5\u05E4\u05D2\u05D9\u05E9\u05D5\u05EA</p>
      </div>
      <div class="d-flex gap-2 align-items-center">
        <div class="btn-group btn-group-sm">
          <button class="btn btn-outline-secondary" id="cal-view-month" onclick="Pages._calView='month';Pages.renderCalView()"><i class="bi bi-grid-3x3 me-1"></i>\u05D7\u05D5\u05D3\u05E9\u05D9</button>
          <button class="btn btn-outline-secondary" id="cal-view-week" onclick="Pages._calView='week';Pages.renderCalView()"><i class="bi bi-calendar-week me-1"></i>\u05E9\u05D1\u05D5\u05E2\u05D9</button>
        </div>
        <button class="btn btn-primary btn-sm" onclick="Pages.showAddEvent()"><i class="bi bi-plus-lg me-1"></i>\u05D0\u05D9\u05E8\u05D5\u05E2 \u05D7\u05D3\u05E9</button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="row g-3 mb-3">
      <div class="col-6 col-md-3"><div class="card p-3 text-center">
        <i class="bi bi-calendar-check fs-3 text-primary"></i>
        <div class="fs-3 fw-bold text-primary" id="cal-stat-total">0</div>
        <small class="text-muted">\u05E1\u05D4"\u05DB \u05D0\u05D9\u05E8\u05D5\u05E2\u05D9\u05DD</small>
      </div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center">
        <i class="bi bi-calendar-month fs-3 text-success"></i>
        <div class="fs-3 fw-bold text-success" id="cal-stat-month">0</div>
        <small class="text-muted">\u05D4\u05D7\u05D5\u05D3\u05E9</small>
      </div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center">
        <i class="bi bi-clock fs-3 text-warning"></i>
        <div class="fs-3 fw-bold text-warning" id="cal-stat-upcoming">0</div>
        <small class="text-muted">\u05E7\u05E8\u05D5\u05D1\u05D9\u05DD</small>
      </div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center">
        <i class="bi bi-tags fs-3 text-info"></i>
        <div class="fs-3 fw-bold text-info" id="cal-stat-categories">0</div>
        <small class="text-muted">\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D5\u05EA</small>
      </div></div>
    </div>

    <div class="row g-3">
      <!-- Main Calendar Area -->
      <div class="col-lg-9">
        <!-- Navigation -->
        <div class="card mb-3">
          <div class="card-body py-2 d-flex justify-content-between align-items-center">
            <div class="d-flex gap-2 align-items-center">
              <button class="btn btn-sm btn-outline-secondary" onclick="Pages.changeMonth(-1)"><i class="bi bi-chevron-right"></i></button>
              <h5 class="mb-0 fw-bold" id="cal-title">--</h5>
              <button class="btn btn-sm btn-outline-secondary" onclick="Pages.changeMonth(1)"><i class="bi bi-chevron-left"></i></button>
              <button class="btn btn-sm btn-outline-primary" onclick="Pages.goToday()">\u05D4\u05D9\u05D5\u05DD</button>
            </div>
            <div class="d-flex gap-2 small flex-wrap">
              <span class="badge bg-primary" style="cursor:pointer" onclick="Pages._calFilter=Pages._calFilter==='event'?'':'event';Pages.renderCalView()"><i class="bi bi-circle-fill me-1" style="font-size:8px"></i>\u05D0\u05D9\u05E8\u05D5\u05E2</span>
              <span class="badge bg-success" style="cursor:pointer" onclick="Pages._calFilter=Pages._calFilter==='meeting'?'':'meeting';Pages.renderCalView()"><i class="bi bi-circle-fill me-1" style="font-size:8px"></i>\u05E4\u05D2\u05D9\u05E9\u05D4</span>
              <span class="badge bg-danger" style="cursor:pointer" onclick="Pages._calFilter=Pages._calFilter==='holiday'?'':'holiday';Pages.renderCalView()"><i class="bi bi-circle-fill me-1" style="font-size:8px"></i>\u05D7\u05D2</span>
              <span class="badge bg-warning text-dark" style="cursor:pointer" onclick="Pages._calFilter=Pages._calFilter==='exam'?'':'exam';Pages.renderCalView()"><i class="bi bi-circle-fill me-1" style="font-size:8px"></i>\u05DE\u05D1\u05D7\u05DF</span>
              <span class="badge bg-secondary" style="cursor:pointer" onclick="Pages._calFilter=Pages._calFilter==='other'?'':'other';Pages.renderCalView()"><i class="bi bi-circle-fill me-1" style="font-size:8px"></i>\u05D0\u05D7\u05E8</span>
            </div>
          </div>
        </div>

        <!-- Calendar Grid -->
        <div class="card p-0 overflow-hidden">
          <div class="row g-0 text-center bg-light border-bottom" style="font-weight:600;font-size:13px">
            <div class="col py-2">\u05E8\u05D0\u05E9\u05D5\u05DF</div><div class="col py-2">\u05E9\u05E0\u05D9</div><div class="col py-2">\u05E9\u05DC\u05D9\u05E9\u05D9</div><div class="col py-2">\u05E8\u05D1\u05D9\u05E2\u05D9</div><div class="col py-2">\u05D7\u05DE\u05D9\u05E9\u05D9</div><div class="col py-2">\u05E9\u05D9\u05E9\u05D9</div><div class="col py-2">\u05E9\u05D1\u05EA</div>
          </div>
          <div id="cal-grid"></div>
        </div>

        <!-- Day Detail Panel -->
        <div class="card mt-3 d-none" id="cal-day-panel">
          <div class="card-header bg-light d-flex justify-content-between align-items-center">
            <h6 class="mb-0 fw-bold"><i class="bi bi-calendar-day me-2"></i><span id="cal-day-title"></span></h6>
            <div class="d-flex gap-2">
              <button class="btn btn-sm btn-primary" id="cal-day-add-btn" onclick="Pages.showAddEvent()"><i class="bi bi-plus-lg me-1"></i>\u05D4\u05D5\u05E1\u05E3 \u05D0\u05D9\u05E8\u05D5\u05E2</button>
              <button class="btn btn-sm btn-outline-secondary" onclick="document.getElementById('cal-day-panel').classList.add('d-none')"><i class="bi bi-x-lg"></i></button>
            </div>
          </div>
          <div class="card-body p-0" id="cal-day-events"></div>
        </div>
      </div>

      <!-- Upcoming Events Sidebar -->
      <div class="col-lg-3">
        <div class="card">
          <div class="card-header bg-light">
            <h6 class="mb-0 fw-bold"><i class="bi bi-clock-history me-2"></i>\u05D0\u05D9\u05E8\u05D5\u05E2\u05D9\u05DD \u05E7\u05E8\u05D5\u05D1\u05D9\u05DD</h6>
          </div>
          <div class="card-body p-0" id="cal-upcoming" style="max-height:600px;overflow-y:auto"></div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Event Modal -->
    <div class="modal fade" id="cal-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="cal-modal-title"><i class="bi bi-calendar-plus me-2"></i>\u05D0\u05D9\u05E8\u05D5\u05E2 \u05D7\u05D3\u05E9</h5>
        <button class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <div class="row g-3">
          <div class="col-12">
            <label class="form-label fw-medium">\u05DB\u05D5\u05EA\u05E8\u05EA <span class="text-danger">*</span></label>
            <input class="form-control" id="cf-title" placeholder="\u05E9\u05DD \u05D4\u05D0\u05D9\u05E8\u05D5\u05E2">
          </div>
          <div class="col-6">
            <label class="form-label fw-medium">\u05EA\u05D0\u05E8\u05D9\u05DA <span class="text-danger">*</span></label>
            <input type="date" class="form-control" id="cf-date">
          </div>
          <div class="col-6">
            <label class="form-label fw-medium">\u05E1\u05D5\u05D2</label>
            <select class="form-select" id="cf-type">
              <option value="\u05D0\u05D9\u05E8\u05D5\u05E2">\u05D0\u05D9\u05E8\u05D5\u05E2</option>
              <option value="\u05E4\u05D2\u05D9\u05E9\u05D4">\u05E4\u05D2\u05D9\u05E9\u05D4</option>
              <option value="\u05D7\u05D2">\u05D7\u05D2</option>
              <option value="\u05DE\u05D1\u05D7\u05DF">\u05DE\u05D1\u05D7\u05DF</option>
              <option value="\u05D0\u05D7\u05E8">\u05D0\u05D7\u05E8</option>
            </select>
          </div>
          <div class="col-6">
            <label class="form-label fw-medium">\u05E9\u05E2\u05EA \u05D4\u05EA\u05D7\u05DC\u05D4</label>
            <input type="time" class="form-control" id="cf-start-time">
          </div>
          <div class="col-6">
            <label class="form-label fw-medium">\u05E9\u05E2\u05EA \u05E1\u05D9\u05D5\u05DD</label>
            <input type="time" class="form-control" id="cf-end-time">
          </div>
          <div class="col-12">
            <label class="form-label fw-medium">\u05DE\u05D9\u05E7\u05D5\u05DD</label>
            <input class="form-control" id="cf-location" placeholder="\u05DE\u05D9\u05E7\u05D5\u05DD \u05D4\u05D0\u05D9\u05E8\u05D5\u05E2">
          </div>
          <div class="col-12">
            <label class="form-label fw-medium">\u05EA\u05D9\u05D0\u05D5\u05E8</label>
            <textarea class="form-control" id="cf-notes" rows="2" placeholder="\u05E4\u05E8\u05D8\u05D9\u05DD \u05E0\u05D5\u05E1\u05E4\u05D9\u05DD..."></textarea>
          </div>
          <div class="col-12">
            <label class="form-label fw-medium">\u05D7\u05D6\u05E8\u05D4</label>
            <select class="form-select" id="cf-recurring">
              <option value="">\u05DC\u05DC\u05D0 \u05D7\u05D6\u05E8\u05D4</option>
              <option value="weekly">\u05E9\u05D1\u05D5\u05E2\u05D9</option>
              <option value="biweekly">\u05D3\u05D5-\u05E9\u05D1\u05D5\u05E2\u05D9</option>
              <option value="monthly">\u05D7\u05D5\u05D3\u05E9\u05D9</option>
            </select>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button>
        <button class="btn btn-primary" onclick="Pages.saveCalEvent()"><i class="bi bi-check-lg me-1"></i>\u05E9\u05DE\u05D5\u05E8</button>
      </div>
    </div></div></div>

    <!-- Event Detail Modal -->
    <div class="modal fade" id="cal-event-detail" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header" id="cal-detail-header">
        <h5 class="modal-title" id="cal-detail-title"></h5>
        <button class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body" id="cal-detail-body"></div>
      <div class="modal-footer">
        <button class="btn btn-outline-danger btn-sm" id="cal-detail-delete"><i class="bi bi-trash me-1"></i>\u05DE\u05D7\u05E7</button>
        <button class="btn btn-secondary" data-bs-dismiss="modal">\u05E1\u05D2\u05D5\u05E8</button>
      </div>
    </div></div></div>`;
  },

  _calYear: 0, _calMonth: 0, _calEvents: [], _calView: 'month', _calFilter: '', _calSelectedDay: '',
  _calTypeColors: {
    '\u05D0\u05D9\u05E8\u05D5\u05E2': { bg: 'primary', icon: 'bi-calendar-event', label: '\u05D0\u05D9\u05E8\u05D5\u05E2' },
    '\u05E4\u05D2\u05D9\u05E9\u05D4': { bg: 'success', icon: 'bi-people', label: '\u05E4\u05D2\u05D9\u05E9\u05D4' },
    '\u05D7\u05D2': { bg: 'danger', icon: 'bi-star', label: '\u05D7\u05D2' },
    '\u05DE\u05D1\u05D7\u05DF': { bg: 'warning', icon: 'bi-pencil-square', label: '\u05DE\u05D1\u05D7\u05DF' },
    '\u05D0\u05D7\u05E8': { bg: 'secondary', icon: 'bi-bookmark', label: '\u05D0\u05D7\u05E8' },
    '\u05D7\u05D5\u05E4\u05E9\u05D4': { bg: 'success', icon: 'bi-people', label: '\u05D7\u05D5\u05E4\u05E9\u05D4' }
  },
  _calMonthNames: ['\u05D9\u05E0\u05D5\u05D0\u05E8','\u05E4\u05D1\u05E8\u05D5\u05D0\u05E8','\u05DE\u05E8\u05E5','\u05D0\u05E4\u05E8\u05D9\u05DC','\u05DE\u05D0\u05D9','\u05D9\u05D5\u05E0\u05D9','\u05D9\u05D5\u05DC\u05D9','\u05D0\u05D5\u05D2\u05D5\u05E1\u05D8','\u05E1\u05E4\u05D8\u05DE\u05D1\u05E8','\u05D0\u05D5\u05E7\u05D8\u05D5\u05D1\u05E8','\u05E0\u05D5\u05D1\u05DE\u05D1\u05E8','\u05D3\u05E6\u05DE\u05D1\u05E8'],
  _calDayNames: ['\u05E8\u05D0\u05E9\u05D5\u05DF','\u05E9\u05E0\u05D9','\u05E9\u05DC\u05D9\u05E9\u05D9','\u05E8\u05D1\u05D9\u05E2\u05D9','\u05D7\u05DE\u05D9\u05E9\u05D9','\u05E9\u05D9\u05E9\u05D9','\u05E9\u05D1\u05EA'],

  // Demo data: 20 events across 3 months
  _calDemoEvents: [],

  calendarInit() {
    const d = new Date();
    this._calYear = d.getFullYear();
    this._calMonth = d.getMonth();
    this._calView = 'month';
    this._calFilter = '';
    this._calSelectedDay = '';
    // Set active view button
    document.getElementById('cal-view-month')?.classList.add('active');
    document.getElementById('cal-view-week')?.classList.remove('active');
    this.loadCalendar();
  },

  changeMonth(dir) {
    if (this._calView === 'week') {
      // Move by 7 days
      const curr = new Date(this._calYear, this._calMonth, this._calWeekStart || 1);
      curr.setDate(curr.getDate() + dir * 7);
      this._calYear = curr.getFullYear();
      this._calMonth = curr.getMonth();
      this._calWeekStart = curr.getDate();
    } else {
      this._calMonth += dir;
      if (this._calMonth > 11) { this._calMonth = 0; this._calYear++; }
      if (this._calMonth < 0) { this._calMonth = 11; this._calYear--; }
    }
    this.loadCalendar();
  },

  goToday() {
    const d = new Date();
    this._calYear = d.getFullYear();
    this._calMonth = d.getMonth();
    this._calWeekStart = d.getDate() - d.getDay();
    this.loadCalendar();
  },

  _calGetTypeInfo(type) {
    const filterMap = { '\u05D0\u05D9\u05E8\u05D5\u05E2':'event', '\u05E4\u05D2\u05D9\u05E9\u05D4':'meeting', '\u05D7\u05D5\u05E4\u05E9\u05D4':'meeting', '\u05D7\u05D2':'holiday', '\u05DE\u05D1\u05D7\u05DF':'exam', '\u05D0\u05D7\u05E8':'other' };
    return { ...(this._calTypeColors[type] || this._calTypeColors['\u05D0\u05D7\u05E8']), filterKey: filterMap[type] || 'other' };
  },

  _calFilterEvents(events) {
    if (!this._calFilter) return events;
    return events.filter(e => {
      const info = this._calGetTypeInfo(e['\u05E1\u05D5\u05D2'] || '');
      return info.filterKey === this._calFilter;
    });
  },

  _calUseDemo: false,

  calLoadDemo() {
    this._calUseDemo = true;
    this._calEvents = this._calDemoEvents;
    this.renderCalView();
    Utils.toast('\u05E0\u05D8\u05E2\u05E0\u05D5 \u05E0\u05EA\u05D5\u05E0\u05D9 \u05D3\u05DE\u05D5', 'info');
  },

  loadCalendar() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    let serverEvents = [];
    try { serverEvents = _gc('\u05DC\u05D5\u05D7_\u05E9\u05E0\u05D4'); } catch(e) { /* no data */ }
    // Use API data if available, otherwise demo only if explicitly toggled
    this._calEvents = serverEvents.length ? serverEvents : (this._calUseDemo ? this._calDemoEvents : []);
    this.renderCalView();
  },

  renderCalView() {
    // Update view toggle buttons
    document.getElementById('cal-view-month')?.classList.toggle('active', this._calView === 'month');
    document.getElementById('cal-view-week')?.classList.toggle('active', this._calView === 'week');

    // Update title
    if (this._calView === 'month') {
      document.getElementById('cal-title').textContent = this._calMonthNames[this._calMonth] + ' ' + this._calYear;
    } else {
      const ws = new Date(this._calYear, this._calMonth, this._calWeekStart || 1);
      const we = new Date(ws); we.setDate(we.getDate() + 6);
      document.getElementById('cal-title').textContent = ws.getDate() + '-' + we.getDate() + ' ' + this._calMonthNames[this._calMonth] + ' ' + this._calYear;
    }

    // Update stats
    this._updateCalStats();

    // Render grid
    if (this._calView === 'month') {
      this._renderMonthGrid();
    } else {
      this._renderWeekGrid();
    }

    // Render upcoming sidebar
    this._renderUpcoming();

    // Hide day panel
    document.getElementById('cal-day-panel')?.classList.add('d-none');

    // Show empty state notice if no events
    if (!this._calEvents.length) {
      const upcoming = document.getElementById('cal-upcoming');
      if (upcoming) upcoming.innerHTML = '<div class="text-center py-4"><i class="bi bi-calendar-x fs-1 text-muted d-block mb-2"></i><h6>\u05D0\u05D9\u05DF \u05D0\u05D9\u05E8\u05D5\u05E2\u05D9\u05DD \u05E7\u05E8\u05D5\u05D1\u05D9\u05DD</h6><p class="text-muted small">\u05DC\u05D7\u05E5 "\u05D0\u05D9\u05E8\u05D5\u05E2 \u05D7\u05D3\u05E9" \u05DC\u05D4\u05D5\u05E1\u05E4\u05D4</p></div>';
    }
  },

  _updateCalStats() {
    const today = Utils.todayISO();
    const allEvents = this._calEvents;
    const monthStr = this._calYear + '-' + String(this._calMonth + 1).padStart(2, '0');
    const monthEvents = allEvents.filter(e => (e['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '').startsWith(monthStr));
    const upcoming = allEvents.filter(e => (e['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '') >= today);
    const categories = new Set(allEvents.map(e => e['\u05E1\u05D5\u05D2'] || '\u05D0\u05D7\u05E8'));

    document.getElementById('cal-stat-total').textContent = allEvents.length;
    document.getElementById('cal-stat-month').textContent = monthEvents.length;
    document.getElementById('cal-stat-upcoming').textContent = upcoming.length;
    document.getElementById('cal-stat-categories').textContent = categories.size;
  },

  _renderMonthGrid() {
    const monthStr = this._calYear + '-' + String(this._calMonth + 1).padStart(2, '0');
    let filtered = this._calFilterEvents(this._calEvents);
    const mEvents = filtered.filter(e => (e['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '').startsWith(monthStr));
    const evMap = {};
    mEvents.forEach(e => {
      const d = String(e['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '').substring(0, 10);
      if (!evMap[d]) evMap[d] = [];
      evMap[d].push(e);
    });

    const first = new Date(this._calYear, this._calMonth, 1);
    const startDay = first.getDay();
    const daysInMonth = new Date(this._calYear, this._calMonth + 1, 0).getDate();
    const today = Utils.todayISO();

    let html = '';
    let dayNum = 1;
    for (let week = 0; week < 6; week++) {
      if (dayNum > daysInMonth && week > 0) break;
      html += '<div class="row g-0">';
      for (let dow = 0; dow < 7; dow++) {
        if ((week === 0 && dow < startDay) || dayNum > daysInMonth) {
          html += '<div class="col border-bottom border-end p-1" style="min-height:90px"></div>';
        } else {
          const ds = this._calYear + '-' + String(this._calMonth + 1).padStart(2, '0') + '-' + String(dayNum).padStart(2, '0');
          const isT = ds === today;
          const isSel = ds === this._calSelectedDay;
          const evts = evMap[ds] || [];
          const bgClass = isT ? ' bg-primary bg-opacity-10' : isSel ? ' bg-info bg-opacity-10' : '';
          html += `<div class="col border-bottom border-end p-1${bgClass}" style="min-height:90px;cursor:pointer;transition:background .15s" onclick="Pages.selectCalDay('${ds}')" onmouseenter="this.style.backgroundColor='rgba(var(--bs-primary-rgb),0.05)'" onmouseleave="this.style.backgroundColor=''">`;
          html += `<div class="d-flex justify-content-between align-items-center mb-1">`;
          html += `<span class="${isT ? 'badge bg-primary rounded-circle' : 'fw-bold small'}">${dayNum}</span>`;
          if (evts.length > 0) html += `<span class="badge bg-light text-dark border" style="font-size:9px">${evts.length}</span>`;
          html += '</div>';

          // Show event dots (max 3 visible, then +N)
          const maxShow = 3;
          evts.slice(0, maxShow).forEach(e => {
            const info = this._calGetTypeInfo(e['\u05E1\u05D5\u05D2'] || '');
            const time = e['\u05E9\u05E2\u05EA_\u05D4\u05EA\u05D7\u05DC\u05D4'] || '';
            html += `<div class="rounded px-1 mb-1 text-white text-truncate bg-${info.bg}" style="font-size:10px;line-height:1.5;cursor:pointer" onclick="event.stopPropagation();Pages.showEventDetail('${e.id || e['\u05DE\u05D6\u05D4\u05D4'] || ''}')" title="${e['\u05DB\u05D5\u05EA\u05E8\u05EA'] || ''}">${time ? '<span class="opacity-75">' + time + '</span> ' : ''}${e['\u05DB\u05D5\u05EA\u05E8\u05EA'] || ''}</div>`;
          });
          if (evts.length > maxShow) {
            html += `<div class="text-muted text-center" style="font-size:9px">+${evts.length - maxShow} \u05E0\u05D5\u05E1\u05E4\u05D9\u05DD</div>`;
          }
          html += '</div>';
          dayNum++;
        }
      }
      html += '</div>';
    }
    document.getElementById('cal-grid').innerHTML = html;
  },

  _renderWeekGrid() {
    const today = Utils.todayISO();
    const ws = new Date(this._calYear, this._calMonth, this._calWeekStart || 1);
    // Adjust to start of week (Sunday)
    ws.setDate(ws.getDate() - ws.getDay());
    let filtered = this._calFilterEvents(this._calEvents);

    let html = '';
    for (let dow = 0; dow < 7; dow++) {
      const d = new Date(ws);
      d.setDate(d.getDate() + dow);
      const ds = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      const isT = ds === today;
      const dayEvents = filtered.filter(e => (e['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '').substring(0, 10) === ds);
      const bgClass = isT ? 'bg-primary bg-opacity-10' : '';

      html += `<div class="row g-0 border-bottom ${bgClass}" style="cursor:pointer" onclick="Pages.selectCalDay('${ds}')">`;
      html += `<div class="col-2 col-md-1 p-2 text-center border-end">
        <div class="small text-muted">${this._calDayNames[dow]}</div>
        <div class="${isT ? 'badge bg-primary rounded-circle fs-5' : 'fs-5 fw-bold'}">${d.getDate()}</div>
      </div>`;
      html += '<div class="col p-2">';
      if (dayEvents.length === 0) {
        html += '<div class="text-muted small p-1">\u05D0\u05D9\u05DF \u05D0\u05D9\u05E8\u05D5\u05E2\u05D9\u05DD</div>';
      } else {
        dayEvents.forEach(e => {
          const info = this._calGetTypeInfo(e['\u05E1\u05D5\u05D2'] || '');
          const time = e['\u05E9\u05E2\u05EA_\u05D4\u05EA\u05D7\u05DC\u05D4'] || '';
          const endTime = e['\u05E9\u05E2\u05EA_\u05E1\u05D9\u05D5\u05DD'] || '';
          const loc = e['\u05DE\u05D9\u05E7\u05D5\u05DD'] || '';
          html += `<div class="d-flex align-items-center gap-2 p-1 rounded mb-1" style="background:rgba(var(--bs-${info.bg}-rgb),0.1);cursor:pointer" onclick="event.stopPropagation();Pages.showEventDetail('${e.id || e['\u05DE\u05D6\u05D4\u05D4'] || ''}')">
            <div class="rounded-circle bg-${info.bg}" style="width:10px;height:10px;min-width:10px"></div>
            <div class="flex-grow-1">
              <div class="fw-medium small">${e['\u05DB\u05D5\u05EA\u05E8\u05EA'] || ''}</div>
              <div class="text-muted" style="font-size:11px">
                ${time ? '<i class="bi bi-clock me-1"></i>' + time + (endTime ? ' - ' + endTime : '') : ''}
                ${loc ? ' <i class="bi bi-geo-alt me-1"></i>' + loc : ''}
              </div>
            </div>
            <span class="badge bg-${info.bg}" style="font-size:10px">${info.label}</span>
          </div>`;
        });
      }
      html += '</div></div>';
    }
    document.getElementById('cal-grid').innerHTML = html;
  },

  selectCalDay(dateStr) {
    this._calSelectedDay = dateStr;
    const panel = document.getElementById('cal-day-panel');
    panel.classList.remove('d-none');

    // Format date for display
    const d = new Date(dateStr + 'T00:00:00');
    const dayName = this._calDayNames[d.getDay()];
    document.getElementById('cal-day-title').textContent = dayName + ', ' + d.getDate() + ' ' + this._calMonthNames[d.getMonth()] + ' ' + d.getFullYear();
    document.getElementById('cal-day-add-btn').setAttribute('onclick', `Pages.showAddEvent('${dateStr}')`);

    // Get events for this day
    const filtered = this._calFilterEvents(this._calEvents);
    const dayEvents = filtered.filter(e => (e['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '').substring(0, 10) === dateStr);

    if (dayEvents.length === 0) {
      document.getElementById('cal-day-events').innerHTML = '<div class="text-center text-muted py-4"><i class="bi bi-calendar-x fs-1 d-block mb-2"></i>\u05D0\u05D9\u05DF \u05D0\u05D9\u05E8\u05D5\u05E2\u05D9\u05DD \u05D1\u05D9\u05D5\u05DD \u05D6\u05D4</div>';
      return;
    }

    document.getElementById('cal-day-events').innerHTML = '<div class="list-group list-group-flush">' + dayEvents.map(e => {
      const info = this._calGetTypeInfo(e['\u05E1\u05D5\u05D2'] || '');
      const time = e['\u05E9\u05E2\u05EA_\u05D4\u05EA\u05D7\u05DC\u05D4'] || '';
      const endTime = e['\u05E9\u05E2\u05EA_\u05E1\u05D9\u05D5\u05DD'] || '';
      const loc = e['\u05DE\u05D9\u05E7\u05D5\u05DD'] || '';
      const notes = e['\u05D4\u05E2\u05E8\u05D5\u05EA'] || '';
      return `<div class="list-group-item list-group-item-action" style="cursor:pointer;border-right:4px solid var(--bs-${info.bg})" onclick="Pages.showEventDetail('${e.id || e['\u05DE\u05D6\u05D4\u05D4'] || ''}')">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <h6 class="mb-1 fw-bold"><i class="bi ${info.icon} me-1 text-${info.bg}"></i>${e['\u05DB\u05D5\u05EA\u05E8\u05EA'] || ''}</h6>
            <div class="small text-muted">
              ${time ? '<i class="bi bi-clock me-1"></i>' + time + (endTime ? ' - ' + endTime : '') + '  ' : ''}
              ${loc ? '<i class="bi bi-geo-alt me-1"></i>' + loc : ''}
            </div>
            ${notes ? '<div class="small mt-1 text-muted">' + notes.substring(0, 80) + (notes.length > 80 ? '...' : '') + '</div>' : ''}
          </div>
          <span class="badge bg-${info.bg}">${info.label}</span>
        </div>
      </div>`;
    }).join('') + '</div>';

    // Re-render grid to show selection highlight (month view only)
    if (this._calView === 'month') this._renderMonthGrid();
  },

  _renderUpcoming() {
    const today = Utils.todayISO();
    const upcoming = this._calEvents
      .filter(e => (e['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '') >= today)
      .sort((a, b) => (a['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '').localeCompare(b['\u05EA\u05D0\u05E8\u05D9\u05DA'] || ''))
      .slice(0, 10);

    const container = document.getElementById('cal-upcoming');
    if (!upcoming.length) {
      container.innerHTML = '<div class="text-center text-muted py-4"><i class="bi bi-calendar-check fs-2 d-block mb-2"></i>\u05D0\u05D9\u05DF \u05D0\u05D9\u05E8\u05D5\u05E2\u05D9\u05DD \u05E7\u05E8\u05D5\u05D1\u05D9\u05DD</div>';
      return;
    }

    container.innerHTML = '<div class="list-group list-group-flush">' + upcoming.map(e => {
      const info = this._calGetTypeInfo(e['\u05E1\u05D5\u05D2'] || '');
      const eventDate = e['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '';
      const time = e['\u05E9\u05E2\u05EA_\u05D4\u05EA\u05D7\u05DC\u05D4'] || '';
      const daysUntil = Math.ceil((new Date(eventDate + 'T00:00:00') - new Date(today + 'T00:00:00')) / 86400000);
      let countdown = '';
      if (daysUntil === 0) countdown = '<span class="badge bg-danger">\u05D4\u05D9\u05D5\u05DD</span>';
      else if (daysUntil === 1) countdown = '<span class="badge bg-warning text-dark">\u05DE\u05D7\u05E8</span>';
      else countdown = `<span class="badge bg-light text-dark border">${daysUntil} \u05D9\u05DE\u05D9\u05DD</span>`;

      const d = new Date(eventDate + 'T00:00:00');
      const dayName = this._calDayNames[d.getDay()];
      const dateDisplay = d.getDate() + '/' + (d.getMonth() + 1);

      return `<div class="list-group-item list-group-item-action px-3 py-2" style="cursor:pointer;border-right:3px solid var(--bs-${info.bg})" onclick="Pages.showEventDetail('${e.id || e['\u05DE\u05D6\u05D4\u05D4'] || ''}')">
        <div class="d-flex justify-content-between align-items-center mb-1">
          <span class="fw-medium small text-truncate">${e['\u05DB\u05D5\u05EA\u05E8\u05EA'] || ''}</span>
          ${countdown}
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <span class="text-muted" style="font-size:11px"><i class="bi bi-calendar me-1"></i>${dayName}, ${dateDisplay}${time ? ' | ' + time : ''}</span>
          <span class="badge bg-${info.bg}" style="font-size:9px">${info.label}</span>
        </div>
      </div>`;
    }).join('') + '</div>';
  },

  showEventDetail(eventId) {
    const ev = this._calEvents.find(e => (e.id || e['\u05DE\u05D6\u05D4\u05D4'] || '') === eventId);
    if (!ev) return;

    const info = this._calGetTypeInfo(ev['\u05E1\u05D5\u05D2'] || '');
    const header = document.getElementById('cal-detail-header');
    header.className = 'modal-header bg-' + info.bg + ' text-white';
    document.getElementById('cal-detail-title').innerHTML = '<i class="bi ' + info.icon + ' me-2"></i>' + (ev['\u05DB\u05D5\u05EA\u05E8\u05EA'] || '');

    const time = ev['\u05E9\u05E2\u05EA_\u05D4\u05EA\u05D7\u05DC\u05D4'] || '';
    const endTime = ev['\u05E9\u05E2\u05EA_\u05E1\u05D9\u05D5\u05DD'] || '';
    const loc = ev['\u05DE\u05D9\u05E7\u05D5\u05DD'] || '';
    const notes = ev['\u05D4\u05E2\u05E8\u05D5\u05EA'] || '';
    const dateStr = ev['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '';
    const d = dateStr ? new Date(dateStr + 'T00:00:00') : null;
    const dateDisplay = d ? this._calDayNames[d.getDay()] + ', ' + d.getDate() + ' ' + this._calMonthNames[d.getMonth()] + ' ' + d.getFullYear() : '';

    let bodyHtml = '<div class="p-1">';
    bodyHtml += `<div class="mb-3"><span class="badge bg-${info.bg} fs-6"><i class="bi ${info.icon} me-1"></i>${info.label}</span></div>`;
    bodyHtml += `<div class="row g-3">`;
    bodyHtml += `<div class="col-12"><div class="d-flex align-items-center gap-2"><i class="bi bi-calendar text-${info.bg} fs-5"></i><div><div class="small text-muted">\u05EA\u05D0\u05E8\u05D9\u05DA</div><div class="fw-medium">${dateDisplay}</div></div></div></div>`;
    if (time) {
      bodyHtml += `<div class="col-12"><div class="d-flex align-items-center gap-2"><i class="bi bi-clock text-${info.bg} fs-5"></i><div><div class="small text-muted">\u05E9\u05E2\u05D4</div><div class="fw-medium">${time}${endTime ? ' - ' + endTime : ''}</div></div></div></div>`;
    }
    if (loc) {
      bodyHtml += `<div class="col-12"><div class="d-flex align-items-center gap-2"><i class="bi bi-geo-alt text-${info.bg} fs-5"></i><div><div class="small text-muted">\u05DE\u05D9\u05E7\u05D5\u05DD</div><div class="fw-medium">${loc}</div></div></div></div>`;
    }
    if (notes) {
      bodyHtml += `<div class="col-12"><div class="d-flex align-items-start gap-2"><i class="bi bi-text-paragraph text-${info.bg} fs-5"></i><div><div class="small text-muted">\u05EA\u05D9\u05D0\u05D5\u05E8</div><div>${notes}</div></div></div></div>`;
    }
    bodyHtml += '</div></div>';

    document.getElementById('cal-detail-body').innerHTML = bodyHtml;
    document.getElementById('cal-detail-delete').setAttribute('onclick', `Pages.deleteCalEvent('${eventId}')`);
    new bootstrap.Modal(document.getElementById('cal-event-detail')).show();
  },

  showAddEvent(date) {
    document.getElementById('cf-title').value = '';
    document.getElementById('cf-date').value = date || Utils.todayISO();
    document.getElementById('cf-type').value = '\u05D0\u05D9\u05E8\u05D5\u05E2';
    document.getElementById('cf-start-time').value = '';
    document.getElementById('cf-end-time').value = '';
    document.getElementById('cf-location').value = '';
    document.getElementById('cf-notes').value = '';
    document.getElementById('cf-recurring').value = '';
    document.getElementById('cal-modal-title').innerHTML = '<i class="bi bi-calendar-plus me-2"></i>\u05D0\u05D9\u05E8\u05D5\u05E2 \u05D7\u05D3\u05E9';
    new bootstrap.Modal(document.getElementById('cal-modal')).show();
  },

  async saveCalEvent() {
    const title = document.getElementById('cf-title').value.trim();
    const date = document.getElementById('cf-date').value;
    const type = document.getElementById('cf-type').value;
    const startTime = document.getElementById('cf-start-time').value;
    const endTime = document.getElementById('cf-end-time').value;
    const location = document.getElementById('cf-location').value.trim();
    const notes = document.getElementById('cf-notes').value.trim();
    const recurring = document.getElementById('cf-recurring').value;

    if (!title) { Utils.toast('\u05D7\u05E1\u05E8\u05D4 \u05DB\u05D5\u05EA\u05E8\u05EA', 'warning'); return; }
    if (!date) { Utils.toast('\u05D7\u05E1\u05E8 \u05EA\u05D0\u05E8\u05D9\u05DA', 'warning'); return; }

    // Build events to add (handle recurring)
    const eventsToAdd = [];
    const baseRow = {
      '\u05DB\u05D5\u05EA\u05E8\u05EA': title,
      '\u05EA\u05D0\u05E8\u05D9\u05DA': date,
      '\u05E1\u05D5\u05D2': type,
      '\u05E9\u05E2\u05EA_\u05D4\u05EA\u05D7\u05DC\u05D4': startTime,
      '\u05E9\u05E2\u05EA_\u05E1\u05D9\u05D5\u05DD': endTime,
      '\u05DE\u05D9\u05E7\u05D5\u05DD': location,
      '\u05D4\u05E2\u05E8\u05D5\u05EA': notes
    };
    eventsToAdd.push(baseRow);

    if (recurring) {
      const intervalDays = recurring === 'weekly' ? 7 : recurring === 'biweekly' ? 14 : 30;
      const count = recurring === 'monthly' ? 6 : 12; // 6 months or 12 weeks
      const baseDate = new Date(date + 'T00:00:00');
      for (let i = 1; i <= count; i++) {
        const nd = new Date(baseDate);
        if (recurring === 'monthly') {
          nd.setMonth(nd.getMonth() + i);
        } else {
          nd.setDate(nd.getDate() + intervalDays * i);
        }
        const ds = nd.getFullYear() + '-' + String(nd.getMonth() + 1).padStart(2, '0') + '-' + String(nd.getDate()).padStart(2, '0');
        eventsToAdd.push({ ...baseRow, '\u05EA\u05D0\u05E8\u05D9\u05DA': ds });
      }
    }

    try {
      for (const row of eventsToAdd) {
        await App.apiCall('add', '\u05DC\u05D5\u05D7_\u05E9\u05E0\u05D4', { row });
      }
      bootstrap.Modal.getInstance(document.getElementById('cal-modal'))?.hide();
      Utils.toast(`\u05E0\u05D5\u05E1\u05E4\u05D5 ${eventsToAdd.length} \u05D0\u05D9\u05E8\u05D5\u05E2\u05D9\u05DD`);
      await this.loadCalendar();
    } catch (e) {
      Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05E9\u05DE\u05D9\u05E8\u05D4', 'danger');
    }
  },

  async deleteCalEvent(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4', '\u05DC\u05DE\u05D7\u05D5\u05E7 \u05D0\u05D9\u05E8\u05D5\u05E2 \u05D6\u05D4?')) return;
    try {
      await App.apiCall('delete', '\u05DC\u05D5\u05D7_\u05E9\u05E0\u05D4', { id });
      // Close detail modal if open
      bootstrap.Modal.getInstance(document.getElementById('cal-event-detail'))?.hide();
      Utils.toast('\u05D0\u05D9\u05E8\u05D5\u05E2 \u05E0\u05DE\u05D7\u05E7');
      await this.loadCalendar();
    } catch (e) {
      Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4', 'danger');
    }
  },

  _calWeekStart: 1,


  /* ======================================================================
     DOCUMENTS — Comprehensive Filing & Cataloging System v3
     4-tab interface: students, parents, staff, general
     Cross-referencing, required checklists, expiry tracking
     ====================================================================== */

  // ── Document type definitions per entity ──
  _docCategories: {
    // Student document types
    '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': { label: '\u05EA\u05E2\u05D5\u05D3\u05EA \u05D6\u05D4\u05D5\u05EA', icon: 'bi-person-vcard', color: 'primary', required: true, entity: 'student' },
    '\u05D0\u05D9\u05E9\u05D5\u05E8_\u05E8\u05E4\u05D5\u05D0\u05D9': { label: '\u05D0\u05D9\u05E9\u05D5\u05E8 \u05E8\u05E4\u05D5\u05D0\u05D9', icon: 'bi-heart-pulse', color: 'danger', required: true, entity: 'student' },
    '\u05D8\u05D5\u05E4\u05E1_\u05D4\u05E8\u05E9\u05DE\u05D4': { label: '\u05D8\u05D5\u05E4\u05E1 \u05D4\u05E8\u05E9\u05DE\u05D4', icon: 'bi-pencil-square', color: 'success', required: true, entity: 'student' },
    '\u05EA\u05E2\u05D5\u05D3\u05D4_\u05D0\u05D7\u05E8\u05D5\u05E0\u05D4': { label: '\u05EA\u05E2\u05D5\u05D3\u05D4 \u05D0\u05D7\u05E8\u05D5\u05E0\u05D4', icon: 'bi-award', color: 'warning', required: true, entity: 'student' },
    '\u05E6\u05D9\u05DC\u05D5\u05DD_\u05EA\u05DE\u05D5\u05E0\u05D4': { label: '\u05E6\u05D9\u05DC\u05D5\u05DD \u05EA\u05DE\u05D5\u05E0\u05D4', icon: 'bi-camera', color: 'info', required: true, entity: 'student' },
    // Parent document types
    '\u05D4\u05EA\u05DB\u05EA\u05D1\u05D5\u05EA': { label: '\u05D4\u05EA\u05DB\u05EA\u05D1\u05D5\u05EA', icon: 'bi-envelope-paper', color: 'info', required: false, entity: 'parent' },
    '\u05E7\u05D1\u05DC\u05D5\u05EA_\u05EA\u05E9\u05DC\u05D5\u05DD': { label: '\u05E7\u05D1\u05DC\u05D5\u05EA \u05EA\u05E9\u05DC\u05D5\u05DD', icon: 'bi-receipt', color: 'success', required: false, entity: 'parent' },
    '\u05E1\u05D9\u05DB\u05D5\u05DE\u05D9_\u05E4\u05D2\u05D9\u05E9\u05D4': { label: '\u05E1\u05D9\u05DB\u05D5\u05DE\u05D9 \u05E4\u05D2\u05D9\u05E9\u05D4', icon: 'bi-journal-text', color: 'primary', required: false, entity: 'parent' },
    // Staff document types
    '\u05D7\u05D5\u05D6\u05D4': { label: '\u05D7\u05D5\u05D6\u05D4', icon: 'bi-file-earmark-text', color: 'primary', required: true, entity: 'staff' },
    '\u05EA\u05E2\u05D5\u05D3\u05D5\u05EA_\u05E6\u05D5\u05D5\u05EA': { label: '\u05EA\u05E2\u05D5\u05D3\u05D5\u05EA', icon: 'bi-award', color: 'warning', required: false, entity: 'staff' },
    '\u05E8\u05D9\u05E9\u05D9\u05D5\u05DF': { label: '\u05E8\u05D9\u05E9\u05D9\u05D5\u05DF', icon: 'bi-shield-check', color: 'danger', required: true, entity: 'staff', hasExpiry: true },
    '\u05E7\u05D5\u05E8\u05D5\u05EA_\u05D7\u05D9\u05D9\u05DD': { label: '\u05E7\u05D5\u05E8\u05D5\u05EA \u05D7\u05D9\u05D9\u05DD', icon: 'bi-file-person', color: 'info', required: false, entity: 'staff' },
    // General document types
    '\u05E8\u05D2\u05D5\u05DC\u05E6\u05D9\u05D4': { label: '\u05E8\u05D2\u05D5\u05DC\u05E6\u05D9\u05D4', icon: 'bi-building', color: 'primary', required: false, entity: 'general' },
    '\u05D1\u05D9\u05D8\u05D5\u05D7': { label: '\u05D1\u05D9\u05D8\u05D5\u05D7', icon: 'bi-shield-fill', color: 'success', required: false, entity: 'general' },
    '\u05E8\u05D9\u05E9\u05D5\u05D9': { label: '\u05E8\u05D9\u05E9\u05D5\u05D9', icon: 'bi-patch-check', color: 'warning', required: false, entity: 'general' },
    '\u05E4\u05E8\u05D5\u05D8\u05D5\u05E7\u05D5\u05DC\u05D9\u05DD': { label: '\u05E4\u05E8\u05D5\u05D8\u05D5\u05E7\u05D5\u05DC\u05D9\u05DD', icon: 'bi-clipboard-check', color: 'info', required: false, entity: 'general' },
    '\u05D0\u05D7\u05E8': { label: '\u05D0\u05D7\u05E8', icon: 'bi-file-earmark', color: 'secondary', required: false, entity: 'any' }
  },
  _docCategoryKeys: [
    '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA','\u05D0\u05D9\u05E9\u05D5\u05E8_\u05E8\u05E4\u05D5\u05D0\u05D9','\u05D8\u05D5\u05E4\u05E1_\u05D4\u05E8\u05E9\u05DE\u05D4','\u05EA\u05E2\u05D5\u05D3\u05D4_\u05D0\u05D7\u05E8\u05D5\u05E0\u05D4','\u05E6\u05D9\u05DC\u05D5\u05DD_\u05EA\u05DE\u05D5\u05E0\u05D4',
    '\u05D4\u05EA\u05DB\u05EA\u05D1\u05D5\u05EA','\u05E7\u05D1\u05DC\u05D5\u05EA_\u05EA\u05E9\u05DC\u05D5\u05DD','\u05E1\u05D9\u05DB\u05D5\u05DE\u05D9_\u05E4\u05D2\u05D9\u05E9\u05D4',
    '\u05D7\u05D5\u05D6\u05D4','\u05EA\u05E2\u05D5\u05D3\u05D5\u05EA_\u05E6\u05D5\u05D5\u05EA','\u05E8\u05D9\u05E9\u05D9\u05D5\u05DF','\u05E7\u05D5\u05E8\u05D5\u05EA_\u05D7\u05D9\u05D9\u05DD',
    '\u05E8\u05D2\u05D5\u05DC\u05E6\u05D9\u05D4','\u05D1\u05D9\u05D8\u05D5\u05D7','\u05E8\u05D9\u05E9\u05D5\u05D9','\u05E4\u05E8\u05D5\u05D8\u05D5\u05E7\u05D5\u05DC\u05D9\u05DD','\u05D0\u05D7\u05E8'
  ],

  // ── Required document category keys per entity type ──
  _requiredStudentDocKeys: ['\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA','\u05D0\u05D9\u05E9\u05D5\u05E8_\u05E8\u05E4\u05D5\u05D0\u05D9','\u05D8\u05D5\u05E4\u05E1_\u05D4\u05E8\u05E9\u05DE\u05D4','\u05EA\u05E2\u05D5\u05D3\u05D4_\u05D0\u05D7\u05E8\u05D5\u05E0\u05D4','\u05E6\u05D9\u05DC\u05D5\u05DD_\u05EA\u05DE\u05D5\u05E0\u05D4'],
  _requiredStaffDocKeys: ['\u05D7\u05D5\u05D6\u05D4','\u05E8\u05D9\u05E9\u05D9\u05D5\u05DF'],
  _parentDocKeys: ['\u05D4\u05EA\u05DB\u05EA\u05D1\u05D5\u05EA','\u05E7\u05D1\u05DC\u05D5\u05EA_\u05EA\u05E9\u05DC\u05D5\u05DD','\u05E1\u05D9\u05DB\u05D5\u05DE\u05D9_\u05E4\u05D2\u05D9\u05E9\u05D4'],
  _generalDocKeys: ['\u05E8\u05D2\u05D5\u05DC\u05E6\u05D9\u05D4','\u05D1\u05D9\u05D8\u05D5\u05D7','\u05E8\u05D9\u05E9\u05D5\u05D9','\u05E4\u05E8\u05D5\u05D8\u05D5\u05E7\u05D5\u05DC\u05D9\u05DD'],
  _studentDocKeys: ['\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA','\u05D0\u05D9\u05E9\u05D5\u05E8_\u05E8\u05E4\u05D5\u05D0\u05D9','\u05D8\u05D5\u05E4\u05E1_\u05D4\u05E8\u05E9\u05DE\u05D4','\u05EA\u05E2\u05D5\u05D3\u05D4_\u05D0\u05D7\u05E8\u05D5\u05E0\u05D4','\u05E6\u05D9\u05DC\u05D5\u05DD_\u05EA\u05DE\u05D5\u05E0\u05D4'],
  _staffDocKeys: ['\u05D7\u05D5\u05D6\u05D4','\u05EA\u05E2\u05D5\u05D3\u05D5\u05EA_\u05E6\u05D5\u05D5\u05EA','\u05E8\u05D9\u05E9\u05D9\u05D5\u05DF','\u05E7\u05D5\u05E8\u05D5\u05EA_\u05D7\u05D9\u05D9\u05DD'],

  // localStorage key for doc metadata
  _DOC_LS_KEY: 'bht_documents_meta_v3',

  _getLocalDocs() {
    try { return JSON.parse(localStorage.getItem(this._DOC_LS_KEY) || '[]'); } catch(e) { return []; }
  },
  _saveLocalDocs(docs) {
    localStorage.setItem(this._DOC_LS_KEY, JSON.stringify(docs));
  },
  _addLocalDoc(doc) {
    const docs = this._getLocalDocs();
    doc.id = 'doc_' + Date.now() + '_' + Math.random().toString(36).slice(2,7);
    doc.uploadDate = doc.uploadDate || Utils.todayISO();
    docs.push(doc);
    this._saveLocalDocs(docs);
    return doc;
  },
  _deleteLocalDoc(id) {
    const docs = this._getLocalDocs().filter(d => d.id !== id);
    this._saveLocalDocs(docs);
  },

  _docsUseDemo: false,

  docsLoadDemo() {
    this._docsUseDemo = true;
    this._ensureDemoData();
    this._localDocs = this._getLocalDocs();
    this._renderDocs();
    Utils.toast('\u05E0\u05D8\u05E2\u05E0\u05D5 \u05E0\u05EA\u05D5\u05E0\u05D9 \u05D3\u05DE\u05D5', 'info');
  },

  _ensureDemoData() {
    // No auto-demo - only load when explicitly called
  },

  // ── Main documents() page render ──
  documents() {
    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div><h1><i class="bi bi-archive-fill me-2"></i>\u05DE\u05E2\u05E8\u05DB\u05EA \u05EA\u05D9\u05D5\u05E7</h1>
      <p class="text-muted mb-0">\u05E0\u05D9\u05D4\u05D5\u05DC \u05DE\u05E1\u05DE\u05DB\u05D9\u05DD \u05DC\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD, \u05D4\u05D5\u05E8\u05D9\u05DD, \u05E6\u05D5\u05D5\u05EA \u05D5\u05DE\u05D5\u05E1\u05D3</p></div>
      <div class="d-flex gap-2 flex-wrap">
        ${typeof DRIVE_CATALOG !== 'undefined' && DRIVE_CATALOG.privateFolderLink ? '<a href="' + DRIVE_CATALOG.privateFolderLink + '" target="_blank" rel="noopener" class="btn btn-outline-primary btn-sm"><i class="bi bi-google me-1"></i>\u05E4\u05EA\u05D7 \u05D1-Drive</a>' : ''}
        <button class="btn btn-primary btn-sm" onclick="Pages.showUploadDoc()"><i class="bi bi-cloud-upload me-1"></i>\u05D4\u05E2\u05DC\u05D0\u05D4</button>
        <button class="btn btn-success btn-sm" onclick="Pages.showBulkUpload()"><i class="bi bi-files me-1"></i>\u05D4\u05E2\u05DC\u05D0\u05D4 \u05DE\u05E8\u05D5\u05D1\u05D4</button>
        <button class="btn btn-outline-warning btn-sm" onclick="Pages.showMissingDocs()"><i class="bi bi-exclamation-triangle me-1"></i>\u05D7\u05E1\u05E8\u05D9\u05DD</button>
      </div>
    </div>

    <!-- Dashboard Stats -->
    <div class="row g-3 mb-3">
      <div class="col-6 col-lg-3"><div class="card p-3 text-center border-start border-primary border-3">
        <i class="bi bi-files fs-3 text-primary"></i>
        <div class="fs-3 fw-bold text-primary" id="doc-total">0</div>
        <small class="text-muted">\u05E1\u05D4"\u05DB \u05DE\u05E1\u05DE\u05DB\u05D9\u05DD</small>
      </div></div>
      <div class="col-6 col-lg-3"><div class="card p-3 text-center border-start border-success border-3">
        <i class="bi bi-folder-check fs-3 text-success"></i>
        <div class="fs-3 fw-bold text-success" id="doc-complete-students">0</div>
        <small class="text-muted">\u05EA\u05D9\u05E7\u05D9\u05D5\u05EA \u05DE\u05DC\u05D0\u05D5\u05EA</small>
      </div></div>
      <div class="col-6 col-lg-3"><div class="card p-3 text-center border-start border-danger border-3">
        <i class="bi bi-exclamation-diamond fs-3 text-danger"></i>
        <div class="fs-3 fw-bold text-danger" id="doc-missing">0</div>
        <small class="text-muted">\u05D7\u05E1\u05E8\u05D9\u05DD \u05E0\u05D3\u05E8\u05E9\u05D9\u05DD</small>
      </div></div>
      <div class="col-6 col-lg-3"><div class="card p-3 text-center border-start border-info border-3">
        <i class="bi bi-clock-history fs-3 text-info"></i>
        <div class="fs-3 fw-bold text-info" id="doc-recent-uploads">0</div>
        <small class="text-muted">\u05D4\u05D5\u05E2\u05DC\u05D5 \u05D4\u05E9\u05D1\u05D5\u05E2</small>
      </div></div>
    </div>

    <!-- Missing docs alert bar -->
    <div id="doc-alert-bar" class="d-none"></div>

    <!-- 4-Tab Navigation -->
    <ul class="nav nav-tabs-bht mb-3" id="doc-tabs">
      <li class="nav-item"><a class="nav-link active" href="#" data-doc-tab="students" onclick="Pages._docActiveTab='students';Pages._renderDocs();return false"><i class="bi bi-mortarboard me-1"></i>\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</a></li>
      <li class="nav-item"><a class="nav-link" href="#" data-doc-tab="parents" onclick="Pages._docActiveTab='parents';Pages._renderDocs();return false"><i class="bi bi-people me-1"></i>\u05D4\u05D5\u05E8\u05D9\u05DD</a></li>
      <li class="nav-item"><a class="nav-link" href="#" data-doc-tab="staff" onclick="Pages._docActiveTab='staff';Pages._renderDocs();return false"><i class="bi bi-person-badge me-1"></i>\u05E6\u05D5\u05D5\u05EA</a></li>
      <li class="nav-item"><a class="nav-link" href="#" data-doc-tab="general" onclick="Pages._docActiveTab='general';Pages._renderDocs();return false"><i class="bi bi-building me-1"></i>\u05DB\u05DC\u05DC\u05D9</a></li>
    </ul>

    <!-- Search & Filter Bar -->
    <div class="card p-3 mb-3">
      <div class="row g-2">
        <div class="col-md-4"><div class="search-box"><i class="bi bi-search"></i><input class="form-control" id="doc-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05D1\u05DB\u05DC \u05D4\u05DE\u05E1\u05DE\u05DB\u05D9\u05DD..." oninput="Pages._renderDocs()"></div></div>
        <div class="col-md-3"><select class="form-select" id="doc-cat-filter" onchange="Pages._renderDocs()">
          <option value="">\u05DB\u05DC \u05D4\u05E1\u05D5\u05D2\u05D9\u05DD</option>
        </select></div>
        <div class="col-md-3"><select class="form-select" id="doc-entity-filter" onchange="Pages._renderDocs()">
          <option value="">\u05DB\u05DC \u05D4\u05D0\u05E0\u05E9\u05D9\u05DD</option>
        </select></div>
        <div class="col-md-2"><button class="btn btn-outline-secondary w-100" onclick="document.getElementById('doc-search').value='';document.getElementById('doc-cat-filter').value='';document.getElementById('doc-entity-filter').value='';Pages._renderDocs()" title="\u05E0\u05E7\u05D4 \u05E1\u05D9\u05E0\u05D5\u05DF"><i class="bi bi-x-lg me-1"></i>\u05E0\u05E7\u05D4</button></div>
      </div>
    </div>

    <div id="doc-list">${Utils.skeleton(4)}</div>

    <!-- Upload Modal -->
    <div class="modal fade" id="upload-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header bg-primary text-white"><h5><i class="bi bi-cloud-upload me-2"></i>\u05D4\u05E2\u05DC\u05D0\u05EA \u05DE\u05E1\u05DE\u05DA</h5><button class="btn-close btn-close-white" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <div class="mb-3"><label class="form-label fw-bold">\u05E1\u05D5\u05D2 \u05D9\u05E9\u05D5\u05EA</label>
          <select class="form-select" id="upload-entity-type" onchange="Pages._onUploadEntityTypeChange()">
            <option value="student">\u05EA\u05DC\u05DE\u05D9\u05D3</option>
            <option value="parent">\u05D4\u05D5\u05E8\u05D4</option>
            <option value="staff">\u05E6\u05D5\u05D5\u05EA</option>
            <option value="general">\u05DB\u05DC\u05DC\u05D9 - \u05DE\u05D5\u05E1\u05D3</option>
          </select>
        </div>
        <div class="mb-3" id="upload-owner-wrap"><label class="form-label fw-bold">\u05E9\u05D9\u05D9\u05DA \u05DC\u05D9\u05E9\u05D5\u05EA</label><select class="form-select" id="upload-owner"></select></div>
        <div class="mb-3"><label class="form-label fw-bold">\u05E1\u05D5\u05D2 \u05DE\u05E1\u05DE\u05DA</label><select class="form-select" id="upload-type"></select></div>
        <div class="mb-3"><label class="form-label fw-bold">\u05EA\u05D9\u05D0\u05D5\u05E8</label><input class="form-control" id="upload-desc" placeholder="\u05EA\u05D9\u05D0\u05D5\u05E8 \u05E7\u05E6\u05E8 \u05E9\u05DC \u05D4\u05DE\u05E1\u05DE\u05DA"></div>
        <div class="mb-3" id="upload-expiry-wrap" style="display:none"><label class="form-label fw-bold">\u05EA\u05D0\u05E8\u05D9\u05DA \u05EA\u05E4\u05D5\u05D2\u05D4</label><input type="date" class="form-control" id="upload-expiry"></div>
        <div class="mb-3" id="upload-version-wrap" style="display:none">
          <label class="form-label fw-bold">\u05DE\u05E1\u05E4\u05E8 \u05D2\u05E8\u05E1\u05D4</label><input class="form-control" id="upload-version" placeholder="\u05DC\u05DE\u05E9\u05DC: 1.0, 2.1">
        </div>
        <div class="mb-3">
          <label class="form-label fw-bold">\u05E7\u05D5\u05D1\u05E5</label>
          <div class="border rounded p-4 text-center bg-light" id="upload-drop-zone" style="cursor:pointer;border-style:dashed!important">
            <i class="bi bi-cloud-arrow-up fs-1 text-muted"></i>
            <p class="text-muted mb-1">\u05D2\u05E8\u05D5\u05E8 \u05E7\u05D5\u05D1\u05E5 \u05DC\u05DB\u05D0\u05DF \u05D0\u05D5 \u05DC\u05D7\u05E5 \u05DC\u05D1\u05D7\u05D9\u05E8\u05D4</p>
            <small class="text-muted">PDF, JPG, PNG, DOC, DOCX, XLS, XLSX</small>
            <input type="file" class="d-none" id="upload-file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx">
          </div>
          <div id="upload-file-info" class="mt-2 d-none">
            <div class="d-flex align-items-center gap-2 p-2 bg-light rounded">
              <i class="bi bi-file-earmark text-primary fs-5"></i>
              <span id="upload-file-name" class="flex-grow-1 fw-medium"></span>
              <span id="upload-file-size" class="text-muted small"></span>
              <button class="btn btn-sm btn-outline-danger" onclick="document.getElementById('upload-file').value='';document.getElementById('upload-file-info').classList.add('d-none')"><i class="bi bi-x"></i></button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.uploadDoc()"><i class="bi bi-cloud-upload me-1"></i>\u05D4\u05E2\u05DC\u05D4</button></div>
    </div></div></div>

    <!-- Bulk Upload Modal -->
    <div class="modal fade" id="bulk-upload-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
      <div class="modal-header bg-success text-white"><h5><i class="bi bi-files me-2"></i>\u05D4\u05E2\u05DC\u05D0\u05D4 \u05DE\u05E8\u05D5\u05D1\u05D4</h5><button class="btn-close btn-close-white" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <div class="mb-3"><label class="form-label fw-bold">\u05E1\u05D5\u05D2 \u05DE\u05E1\u05DE\u05DA</label><select class="form-select" id="bulk-type"></select></div>
        <div class="mb-3"><label class="form-label fw-bold">\u05D1\u05D7\u05E8 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</label>
          <div class="border rounded p-2" style="max-height:200px;overflow-y:auto" id="bulk-students-list"></div>
          <div class="mt-1"><button class="btn btn-sm btn-outline-primary" onclick="document.querySelectorAll('#bulk-students-list input').forEach(c=>c.checked=true)">\u05D1\u05D7\u05E8 \u05D4\u05DB\u05DC</button> <button class="btn btn-sm btn-outline-secondary" onclick="document.querySelectorAll('#bulk-students-list input').forEach(c=>c.checked=false)">\u05E0\u05E7\u05D4 \u05D4\u05DB\u05DC</button></div>
        </div>
        <div class="mb-3"><label class="form-label fw-bold">\u05EA\u05D9\u05D0\u05D5\u05E8</label><input class="form-control" id="bulk-desc" placeholder="\u05EA\u05D9\u05D0\u05D5\u05E8 \u05DE\u05E9\u05D5\u05EA\u05E3 \u05DC\u05DB\u05DC \u05D4\u05DE\u05E1\u05DE\u05DB\u05D9\u05DD"></div>
        <div class="alert alert-info small"><i class="bi bi-info-circle me-1"></i>\u05D4\u05E2\u05DC\u05D0\u05D4 \u05DE\u05E8\u05D5\u05D1\u05D4 \u05EA\u05D9\u05E6\u05D5\u05E8 \u05E8\u05E9\u05D5\u05DE\u05EA \u05DE\u05E1\u05DE\u05DA \u05DC\u05DB\u05DC \u05EA\u05DC\u05DE\u05D9\u05D3 \u05E9\u05E0\u05D1\u05D7\u05E8</div>
      </div>
      <div class="modal-footer">
        <span class="me-auto text-muted small" id="bulk-count">0 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05E0\u05D1\u05D7\u05E8\u05D5</span>
        <button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button>
        <button class="btn btn-success" onclick="Pages.doBulkUpload()"><i class="bi bi-files me-1"></i>\u05D4\u05E2\u05DC\u05D4 \u05DC\u05E0\u05D1\u05D7\u05E8\u05D9\u05DD</button>
      </div>
    </div></div></div>

    <!-- Viewer Modal -->
    <div class="modal fade" id="doc-viewer-modal" tabindex="-1"><div class="modal-dialog modal-xl"><div class="modal-content">
      <div class="modal-header"><h5 id="viewer-title">\u05E6\u05E4\u05D9\u05D9\u05D4 \u05D1\u05DE\u05E1\u05DE\u05DA</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body p-0" id="viewer-body" style="min-height:500px"></div>
    </div></div></div>

    <!-- Entity Folder Modal (student/parent/staff detail) -->
    <div class="modal fade" id="student-folder-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
      <div class="modal-header"><h5 id="folder-title">\u05EA\u05D9\u05E7\u05D9\u05D9\u05EA \u05D9\u05E9\u05D5\u05EA</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body" id="folder-body"></div>
    </div></div></div>
  `;
  },

  // ── State ──
  _docActiveTab: 'students', _docsData: [], _studentsForDocs: [], _staffForDocs: [], _parentsForDocs: [], _localDocs: [],
  _requiredStudentDocs: ['\u05EA\u05E2\u05D5\u05D3\u05EA \u05D6\u05D4\u05D5\u05EA','\u05D0\u05D9\u05E9\u05D5\u05E8 \u05E8\u05E4\u05D5\u05D0\u05D9','\u05D8\u05D5\u05E4\u05E1 \u05D4\u05E8\u05E9\u05DE\u05D4','\u05EA\u05E2\u05D5\u05D3\u05D4 \u05D0\u05D7\u05E8\u05D5\u05E0\u05D4','\u05E6\u05D9\u05DC\u05D5\u05DD \u05EA\u05DE\u05D5\u05E0\u05D4'],
  _requiredStaffDocs: ['\u05D7\u05D5\u05D6\u05D4','\u05EA\u05E2\u05D5\u05D3\u05D5\u05EA','\u05E8\u05D9\u05E9\u05D9\u05D5\u05DF','\u05E7\u05D5\u05E8\u05D5\u05EA \u05D7\u05D9\u05D9\u05DD'],

  // ── Drive catalog data ──
  _driveFolders: null,
  _driveCatalog: null,

  // ── Init ──
  async documentsInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    const docs = _gc('\u05E7\u05D1\u05E6\u05D9\u05DD_\u05DE\u05E6\u05D5\u05E8\u05E4\u05D9\u05DD');
    const students = _gc('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
    const staff = _gc('\u05E6\u05D5\u05D5\u05EA');
    const parents = _gc('\u05D4\u05D5\u05E8\u05D9\u05DD');
    this._docsData = docs;
    this._localDocs = this._getLocalDocs();
    this._studentsForDocs = students.filter(s => (s['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') !== '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC');
    this._staffForDocs = staff.filter(s => (s['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') !== '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC');
    this._parentsForDocs = parents;

    // Load Drive catalog from global DRIVE_CATALOG (drive-catalog.js)
    if (typeof DRIVE_CATALOG !== 'undefined' && DRIVE_CATALOG.folders) {
      this._driveCatalog = DRIVE_CATALOG;
      this._driveFolders = null; // not needed — use DRIVE_CATALOG.byName directly
    } else {
      // Fallback: try loading from JSON files
      try {
        const resp = await fetch('student_folder_search_results.json');
        this._driveFolders = await resp.json();
      } catch(e) { this._driveFolders = null; }
      try {
        const resp2 = await fetch('student_docs_catalog.json');
        this._driveCatalog = await resp2.json();
      } catch(e) { this._driveCatalog = null; }
    }

    // Populate entity filter dropdown based on active tab
    this._populateFilters();

    // Setup drag-drop on upload zone
    setTimeout(() => {
      const zone = document.getElementById('upload-drop-zone');
      if (zone) {
        zone.onclick = () => document.getElementById('upload-file').click();
        zone.ondragover = e => { e.preventDefault(); zone.classList.add('border-primary','bg-primary','bg-opacity-10'); };
        zone.ondragleave = () => { zone.classList.remove('border-primary','bg-primary','bg-opacity-10'); };
        zone.ondrop = e => { e.preventDefault(); zone.classList.remove('border-primary','bg-primary','bg-opacity-10'); const f=e.dataTransfer.files[0]; if(f){const dt=new DataTransfer();dt.items.add(f);document.getElementById('upload-file').files=dt.files;Pages._showFileInfo(f);} };
        document.getElementById('upload-file').onchange = e => { if(e.target.files[0]) Pages._showFileInfo(e.target.files[0]); };
      }
    }, 100);

    this._renderDocs();
  },

  _populateFilters() {
    // Category filter based on active tab
    const catFilter = document.getElementById('doc-cat-filter');
    if (catFilter) {
      let keys;
      if (this._docActiveTab === 'students') keys = this._studentDocKeys;
      else if (this._docActiveTab === 'parents') keys = this._parentDocKeys;
      else if (this._docActiveTab === 'staff') keys = this._staffDocKeys;
      else keys = this._generalDocKeys;
      catFilter.innerHTML = '<option value="">\u05DB\u05DC \u05D4\u05E1\u05D5\u05D2\u05D9\u05DD</option>' +
        keys.map(k => `<option value="${k}">${this._docCategories[k]?.label||k}</option>`).join('') +
        `<option value="\u05D0\u05D7\u05E8">\u05D0\u05D7\u05E8</option>`;
    }

    // Entity filter
    const entityFilter = document.getElementById('doc-entity-filter');
    if (entityFilter) {
      let names = [];
      if (this._docActiveTab === 'students') {
        names = this._studentsForDocs.map(s => Utils.fullName(s));
      } else if (this._docActiveTab === 'parents') {
        names = this._parentsForDocs.map(p => (p['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9']||'') + ' ' + (p['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4']||'')).map(n => n.trim()).filter(Boolean);
        if (!names.length) names = this._parentsForDocs.map(p => Utils.fullName(p)).filter(Boolean);
      } else if (this._docActiveTab === 'staff') {
        names = this._staffForDocs.map(s => Utils.fullName(s));
      }
      // Also add locally-referenced names
      const localForTab = this._localDocs.filter(d => d.entity === this._docActiveTab || (this._docActiveTab === 'students' && d.entity === 'student'));
      localForTab.forEach(d => { if (d.ownerName && !names.includes(d.ownerName)) names.push(d.ownerName); });

      const sorted = [...new Set(names)].sort((a,b) => a.localeCompare(b,'he'));
      entityFilter.innerHTML = '<option value="">\u05DB\u05DC \u05D4\u05D0\u05E0\u05E9\u05D9\u05DD</option>' +
        sorted.map(n => `<option value="${n}">${n}</option>`).join('');
    }
  },

  _showFileInfo(file) {
    const info = document.getElementById('upload-file-info');
    if (!info) return;
    info.classList.remove('d-none');
    document.getElementById('upload-file-name').textContent = file.name;
    const kb = (file.size/1024).toFixed(1);
    document.getElementById('upload-file-size').textContent = kb > 1024 ? (kb/1024).toFixed(1)+'MB' : kb+'KB';
  },

  _getAllDocsFlat() {
    const items = [];
    // From server data (קבצים_מצורפים sheet)
    this._docsData.forEach(d => {
      const entity = d['\u05E1\u05D5\u05D2_\u05D9\u05E9\u05D5\u05EA'] || (d['\u05E9\u05DD_\u05E2\u05D5\u05D1\u05D3'] ? 'staff' : (d['\u05E9\u05DD_\u05D4\u05D5\u05E8\u05D4'] ? 'parent' : 'student'));
      items.push({
        id: d['_rowId'] || '',
        ownerName: d['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3'] || d['\u05E9\u05DD_\u05E2\u05D5\u05D1\u05D3'] || d['\u05E9\u05DD_\u05D4\u05D5\u05E8\u05D4'] || d['\u05E9\u05DD'] || '',
        studentName: d['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3'] || d['\u05E9\u05DD'] || '', // backward compat
        category: d['\u05E1\u05D5\u05D2_\u05DE\u05E1\u05DE\u05DA'] || d['\u05E1\u05D5\u05D2'] || '\u05D0\u05D7\u05E8',
        fileName: d['\u05E9\u05DD_\u05E7\u05D5\u05D1\u05E5'] || '',
        description: d['\u05D4\u05E2\u05E8\u05D5\u05EA'] || '',
        uploadDate: d['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05E7\u05D1\u05DC\u05D4'] || '',
        expiryDate: d['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05EA\u05E4\u05D5\u05D2\u05D4'] || '',
        version: d['\u05D2\u05E8\u05E1\u05D4'] || '',
        url: d['\u05E7\u05D9\u05E9\u05D5\u05E8'] || d['url'] || '',
        status: d['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '\u05D4\u05EA\u05E7\u05D1\u05DC',
        entity: entity,
        linkedStudent: d['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3'] || '',
        source: 'server'
      });
    });
    // From localStorage
    this._localDocs.forEach(d => {
      items.push({ ...d, ownerName: d.ownerName || d.studentName || '', source: 'local' });
    });
    return items;
  },

  _catKeyToLabel(key) {
    return this._docCategories[key]?.label || key;
  },
  _catKeyInfo(key) {
    return this._docCategories[key] || this._docCategories['\u05D0\u05D7\u05E8'];
  },

  // ── Main render dispatcher ──
  _renderDocs() {
    const search = (document.getElementById('doc-search')?.value||'').toLowerCase();
    const catF = document.getElementById('doc-cat-filter')?.value||'';
    const entityF = document.getElementById('doc-entity-filter')?.value||'';

    // Update tab active state
    document.querySelectorAll('#doc-tabs .nav-link').forEach(a => {
      a.classList.toggle('active', a.getAttribute('data-doc-tab') === this._docActiveTab);
    });

    // Refresh category filter options when tab changes
    this._populateFilters();

    let allDocs = this._getAllDocsFlat();

    // Tab-level entity filter
    if (this._docActiveTab === 'students') allDocs = allDocs.filter(d => d.entity === 'student');
    else if (this._docActiveTab === 'parents') allDocs = allDocs.filter(d => d.entity === 'parent');
    else if (this._docActiveTab === 'staff') allDocs = allDocs.filter(d => d.entity === 'staff');
    else if (this._docActiveTab === 'general') allDocs = allDocs.filter(d => d.entity === 'general');

    // Apply user filters
    if (search) allDocs = allDocs.filter(d =>
      (d.ownerName||'').toLowerCase().includes(search) ||
      (d.fileName||'').toLowerCase().includes(search) ||
      (d.description||'').toLowerCase().includes(search) ||
      this._catKeyToLabel(d.category).toLowerCase().includes(search)
    );
    if (catF) allDocs = allDocs.filter(d => d.category === catF);
    if (entityF) allDocs = allDocs.filter(d => d.ownerName === entityF);

    // ── Compute dashboard stats (across ALL docs, not just filtered tab) ──
    const totalAllDocs = this._getAllDocsFlat();
    document.getElementById('doc-total').textContent = totalAllDocs.length;

    // Complete student folders
    const reqKeys = this._requiredStudentDocKeys;
    let completeCount = 0;
    let totalMissingRequired = 0;
    const allStudentNames = new Set();
    this._studentsForDocs.forEach(s => allStudentNames.add(Utils.fullName(s)));
    totalAllDocs.filter(d => d.entity === 'student').forEach(d => { if(d.ownerName) allStudentNames.add(d.ownerName); });

    allStudentNames.forEach(name => {
      const sDocs = totalAllDocs.filter(d => (d.ownerName === name || d.studentName === name) && d.entity === 'student');
      const hasCats = new Set(sDocs.map(d => d.category));
      const missing = reqKeys.filter(k => !hasCats.has(k));
      if (missing.length === 0) completeCount++;
      totalMissingRequired += missing.length;
    });

    document.getElementById('doc-complete-students').textContent = completeCount;
    document.getElementById('doc-missing').textContent = totalMissingRequired;

    // Recent uploads (last 7 days)
    const weekAgo = new Date(Date.now() - 7*86400000).toISOString().slice(0,10);
    const recentCount = totalAllDocs.filter(d => (d.uploadDate||'') >= weekAgo).length;
    document.getElementById('doc-recent-uploads').textContent = recentCount;

    // ── Alert bar for students missing required docs ──
    const alertBar = document.getElementById('doc-alert-bar');
    if (alertBar) {
      const studentsMissingDocs = [];
      allStudentNames.forEach(name => {
        const sDocs = totalAllDocs.filter(d => (d.ownerName === name || d.studentName === name) && d.entity === 'student');
        const hasCats = new Set(sDocs.map(d => d.category));
        const missing = reqKeys.filter(k => !hasCats.has(k));
        if (missing.length) studentsMissingDocs.push(name);
      });
      if (studentsMissingDocs.length > 0) {
        alertBar.className = 'alert alert-danger d-flex align-items-center gap-2 mb-3';
        alertBar.innerHTML = `<i class="bi bi-exclamation-triangle-fill"></i>
          <span><strong>${studentsMissingDocs.length} \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</strong> \u05D7\u05E1\u05E8\u05D9\u05DD \u05DE\u05E1\u05DE\u05DB\u05D9\u05DD \u05E0\u05D3\u05E8\u05E9\u05D9\u05DD</span>
          <button class="btn btn-sm btn-outline-danger ms-auto" onclick="Pages.showMissingDocs()"><i class="bi bi-list-check me-1"></i>\u05E6\u05E4\u05D4 \u05E4\u05D9\u05E8\u05D5\u05D8</button>`;
      } else {
        alertBar.className = 'd-none';
      }
    }

    // ── Expired license alert for staff ──
    const today = Utils.todayISO();
    const expiredDocs = totalAllDocs.filter(d => d.entity === 'staff' && d.expiryDate && d.expiryDate < today);

    // ── Render based on active tab ──
    if (this._docActiveTab === 'students') this._renderStudentFolders(allDocs);
    else if (this._docActiveTab === 'parents') this._renderParentDocs(allDocs);
    else if (this._docActiveTab === 'staff') this._renderStaffDocs(allDocs);
    else if (this._docActiveTab === 'general') this._renderGeneralDocs(allDocs);
  },

  // ── Helper: find Drive folder info for a student ──
  _findDriveFolder(studentName, studentId) {
    // Primary: use DRIVE_CATALOG.byName (from drive-catalog.js)
    if (typeof DRIVE_CATALOG !== 'undefined' && DRIVE_CATALOG.byName) {
      const entry = DRIVE_CATALOG.byName[studentName];
      if (entry) {
        return { folder_id: entry.folderId, folder_name: entry.name, folder_link: entry.folderLink, parent_folder: '', source: 'catalog', docs: entry.docs || [] };
      }
      // Try partial match by last name / first name
      if (studentName) {
        const parts = studentName.split(' ');
        for (const p of parts) {
          if (p.length > 1 && DRIVE_CATALOG.byName[p]) {
            const e = DRIVE_CATALOG.byName[p];
            return { folder_id: e.folderId, folder_name: e.name, folder_link: e.folderLink, parent_folder: '', source: 'catalog', docs: e.docs || [] };
          }
        }
      }
    }
    // Fallback: legacy _driveFolders JSON
    if (!this._driveFolders) return null;
    const matched = (this._driveFolders.matched_in_parents || []);
    let found = matched.find(m => m.student === studentName || m.student_id === studentId);
    if (found) return { folder_id: found.folder_id, folder_name: found.folder_name, parent_folder: found.parent_folder, source: 'matched' };
    const searched = (this._driveFolders.found_via_search || []);
    found = searched.find(m => m.student === studentName || m.student_id === studentId);
    if (found) return { folder_id: found.folder_id, folder_name: found.folder_name, parent_folder: '', source: 'search' };
    const missing = (this._driveFolders.missing || []);
    const isMissing = missing.find(m => m.name === studentName || m.id === studentId);
    if (isMissing) return { missing: true };
    return null;
  },

  // ── Helper: get catalog doc count for a folder_id ──
  _getDriveCatalogInfo(folderId) {
    // Primary: use DRIVE_CATALOG.folders (from drive-catalog.js)
    if (typeof DRIVE_CATALOG !== 'undefined' && DRIVE_CATALOG.folders) {
      const entry = DRIVE_CATALOG.folders.find(f => f.folderId === folderId);
      return entry || null;
    }
    // Fallback: legacy array catalog
    if (!this._driveCatalog || !folderId) return null;
    if (Array.isArray(this._driveCatalog)) {
      const entry = this._driveCatalog.find(c => c.folderId === folderId);
      return entry || null;
    }
    return null;
  },

  // ═══════════════════════════════════════════════════════
  // TAB 1: Student Folders - each student as a folder card
  // ═══════════════════════════════════════════════════════
  _renderStudentFolders(allDocs) {
    const studentMap = {};
    this._studentsForDocs.forEach(s => {
      const name = Utils.fullName(s);
      if (!studentMap[name]) studentMap[name] = { name, docs: [], id: Utils.rowId(s), raw: s };
    });
    allDocs.forEach(d => {
      const n = d.ownerName || d.studentName;
      if (!studentMap[n]) studentMap[n] = { name: n, docs: [], id: '', raw: null };
      studentMap[n].docs.push(d);
    });

    const students = Object.values(studentMap).sort((a,b) => {
      const reqKeys = this._requiredStudentDocKeys;
      const aComplete = reqKeys.every(k => a.docs.some(d => d.category === k));
      const bComplete = reqKeys.every(k => b.docs.some(d => d.category === k));
      if (aComplete !== bComplete) return aComplete ? 1 : -1;
      return a.name.localeCompare(b.name,'he');
    });

    if (!students.length) {
      document.getElementById('doc-list').innerHTML = '<div class="empty-state"><i class="bi bi-folder"></i><h5>\u05D0\u05D9\u05DF \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05D1\u05DE\u05E2\u05E8\u05DB\u05EA</h5><p>\u05D4\u05D5\u05E1\u05E3 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05D3\u05E8\u05DA \u05D3\u05E3 \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</p></div>';
      return;
    }

    const reqKeys = this._requiredStudentDocKeys;
    document.getElementById('doc-list').innerHTML = `<div class="row g-3">${students.map(s => {
      const docCount = s.docs.length;
      const hasCats = new Set(s.docs.map(d => d.category));
      const completePct = reqKeys.length ? Math.round(reqKeys.filter(k => hasCats.has(k)).length / reqKeys.length * 100) : 100;
      const missingReq = reqKeys.filter(k => !hasCats.has(k));
      const pctClass = completePct === 100 ? 'success' : completePct >= 50 ? 'warning' : 'danger';
      const initials = s.name.split(' ').map(w => w[0]).join('').slice(0,2);

      // Drive folder lookup — prefer DRIVE_CATALOG.byName
      const driveInfo = this._findDriveFolder(s.name, s.id);
      let driveDocCount = 0;
      if (driveInfo && !driveInfo.missing) {
        if (driveInfo.docs && driveInfo.docs.length) {
          driveDocCount = driveInfo.docs.length;
        } else {
          const catalogInfo = this._getDriveCatalogInfo(driveInfo.folder_id);
          driveDocCount = catalogInfo && catalogInfo.docs ? catalogInfo.docs.length : (catalogInfo && catalogInfo.documents ? catalogInfo.documents.length : 0);
        }
      }

      // Required doc checklist icons
      const checklistIcons = reqKeys.map(k => {
        const info = this._docCategories[k];
        const has = hasCats.has(k);
        return `<span class="me-1" title="${info?.label||k}: ${has?'\u05E7\u05D9\u05D9\u05DD':'\u05D7\u05E1\u05E8'}" style="opacity:${has?1:0.3}"><i class="bi ${has?'bi-check-circle-fill':'bi-x-circle'} text-${has?'success':'danger'}"></i></span>`;
      }).join('');

      // Drive link button — use folderLink from DRIVE_CATALOG when available
      let driveBtn = '';
      if (driveInfo && !driveInfo.missing && driveInfo.folder_id) {
        const driveLink = driveInfo.folder_link || ('https://drive.google.com/drive/folders/' + driveInfo.folder_id);
        driveBtn = `<a href="${driveLink}" target="_blank" rel="noopener" class="btn btn-sm btn-outline-primary" onclick="event.stopPropagation()" title="\u05E4\u05EA\u05D7 \u05D1-Drive${driveInfo.parent_folder ? ' (' + driveInfo.parent_folder + ')' : ''}"><i class="bi bi-google me-1"></i>\u05E4\u05EA\u05D7 \u05D1-Drive${driveDocCount ? ' (' + driveDocCount + ')' : ''}</a>`;
      } else if (driveInfo && driveInfo.missing) {
        driveBtn = `<span class="badge bg-warning bg-opacity-10 text-warning" title="\u05D0\u05D9\u05DF \u05EA\u05D9\u05E7\u05D9\u05D9\u05D4 \u05D1-Drive"><i class="bi bi-exclamation-triangle me-1"></i>\u05D0\u05D9\u05DF \u05EA\u05D9\u05E7\u05D9\u05D9\u05D4</span>`;
      }

      return `<div class="col-md-6 col-lg-4">
        <div class="card h-100 ${missingReq.length?'border-danger border-opacity-50':''}" style="cursor:pointer" onclick="Pages.openEntityFolder('student','${s.name.replace(/'/g,"&#39;")}')">
          <div class="card-body">
            <div class="d-flex align-items-center gap-3 mb-2">
              ${Utils.avatarHTML ? Utils.avatarHTML(s.name) : `<div class="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style="width:42px;height:42px;font-size:14px">${initials}</div>`}
              <div class="flex-grow-1">
                <div class="fw-bold">${s.name}</div>
                <div class="d-flex align-items-center gap-2 mt-1">
                  <div class="progress flex-grow-1" style="height:6px"><div class="progress-bar bg-${pctClass}" style="width:${completePct}%"></div></div>
                  <small class="text-${pctClass} fw-bold">${completePct}%</small>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div>${checklistIcons}</div>
              <div class="d-flex align-items-center gap-2">
                <span class="badge bg-${pctClass === 'success' ? 'success' : 'secondary'} bg-opacity-10 text-${pctClass === 'success' ? 'success' : 'dark'}">${docCount} \u05DE\u05E1\u05DE\u05DB\u05D9\u05DD</span>
                ${driveDocCount ? `<span class="badge bg-primary bg-opacity-10 text-primary" title="\u05DE\u05E1\u05DE\u05DB\u05D9\u05DD \u05D1-Drive">${driveDocCount} \u05D1-Drive</span>` : ''}
              </div>
            </div>
            ${driveBtn ? `<div class="mt-2 d-flex gap-2 align-items-center">${driveBtn}</div>` : ''}
            ${missingReq.length ? `<div class="mt-2">${missingReq.map(k => `<span class="badge bg-danger bg-opacity-10 text-danger me-1 small"><i class="bi bi-exclamation-circle me-1"></i>${this._catKeyToLabel(k)}</span>`).join('')}</div>` : ''}
          </div>
        </div>
      </div>`;
    }).join('')}</div>`;
  },

  // ═══════════════════════════════════════════════════════
  // TAB 2: Parent Documents
  // ═══════════════════════════════════════════════════════
  _renderParentDocs(allDocs) {
    // Build parent map - link to their students
    const parentMap = {};
    this._parentsForDocs.forEach(p => {
      const name = (p['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9']||'') + ' ' + (p['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4']||'');
      const pName = name.trim() || Utils.fullName(p);
      if (!pName) return;
      const linkedStudent = p['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3'] || p['\u05EA\u05DC\u05DE\u05D9\u05D3'] || '';
      if (!parentMap[pName]) parentMap[pName] = { name: pName, docs: [], linkedStudents: new Set(), raw: p };
      if (linkedStudent) parentMap[pName].linkedStudents.add(linkedStudent);
    });
    allDocs.forEach(d => {
      const n = d.ownerName;
      if (!parentMap[n]) parentMap[n] = { name: n, docs: [], linkedStudents: new Set(), raw: null };
      parentMap[n].docs.push(d);
      if (d.linkedStudent) parentMap[n].linkedStudents.add(d.linkedStudent);
    });

    const parents = Object.values(parentMap).sort((a,b) => a.name.localeCompare(b.name,'he'));

    if (!parents.length) {
      document.getElementById('doc-list').innerHTML = '<div class="empty-state"><i class="bi bi-people"></i><h5>\u05D0\u05D9\u05DF \u05DE\u05E1\u05DE\u05DB\u05D9 \u05D4\u05D5\u05E8\u05D9\u05DD</h5><p>\u05D4\u05D5\u05E1\u05E3 \u05D4\u05D5\u05E8\u05D9\u05DD \u05D3\u05E8\u05DA \u05D3\u05E3 \u05D4\u05D4\u05D5\u05E8\u05D9\u05DD \u05D5\u05D4\u05E2\u05DC\u05D4 \u05DE\u05E1\u05DE\u05DB\u05D9\u05DD</p></div>';
      return;
    }

    document.getElementById('doc-list').innerHTML = `<div class="row g-3">${parents.map(p => {
      const initials = p.name.split(' ').map(w => w[0]).join('').slice(0,2);
      const linkedArr = [...p.linkedStudents];
      const docTypes = this._parentDocKeys.map(k => {
        const info = this._docCategories[k];
        const has = p.docs.some(d => d.category === k);
        return `<span class="badge bg-${has?info.color:'secondary'} bg-opacity-${has?'10':'25'} text-${has?info.color:'muted'} me-1 small"><i class="bi ${info.icon} me-1"></i>${info.label}</span>`;
      }).join('');

      return `<div class="col-md-6 col-lg-4">
        <div class="card h-100" style="cursor:pointer" onclick="Pages.openEntityFolder('parent','${p.name.replace(/'/g,"&#39;")}')">
          <div class="card-body">
            <div class="d-flex align-items-center gap-3 mb-2">
              ${Utils.avatarHTML ? Utils.avatarHTML(p.name) : `<div class="avatar bg-info text-white rounded-circle d-flex align-items-center justify-content-center" style="width:42px;height:42px;font-size:14px">${initials}</div>`}
              <div class="flex-grow-1">
                <div class="fw-bold">${p.name}</div>
                ${linkedArr.length ? `<div class="text-muted small"><i class="bi bi-link-45deg me-1"></i>${linkedArr.map(s => `<a href="#" onclick="event.stopPropagation();Pages._docActiveTab='students';Pages._renderDocs();setTimeout(()=>Pages.openEntityFolder('student','${s.replace(/'/g,"&#39;")}'),200);return false" class="text-primary">${s}</a>`).join(', ')}</div>` : ''}
              </div>
              <span class="badge bg-primary bg-opacity-10 text-primary">${p.docs.length}</span>
            </div>
            <div class="d-flex flex-wrap gap-1">${docTypes}</div>
          </div>
        </div>
      </div>`;
    }).join('')}</div>`;
  },

  // ═══════════════════════════════════════════════════════
  // TAB 3: Staff Documents with expiry tracking
  // ═══════════════════════════════════════════════════════
  _renderStaffDocs(allDocs) {
    const staffMap = {};
    this._staffForDocs.forEach(s => {
      const name = Utils.fullName(s);
      if (!staffMap[name]) staffMap[name] = { name, docs: [], id: Utils.rowId(s), raw: s, role: s['\u05EA\u05E4\u05E7\u05D9\u05D3']||s['\u05EA\u05E4\u05E7\u05D9\u05D3_\u05E6\u05D5\u05D5\u05EA']||'' };
    });
    allDocs.forEach(d => {
      const n = d.ownerName;
      if (!staffMap[n]) staffMap[n] = { name: n, docs: [], id: '', raw: null, role: '' };
      staffMap[n].docs.push(d);
    });

    const staffList = Object.values(staffMap).sort((a,b) => {
      const reqKeys = this._requiredStaffDocKeys;
      const aComplete = reqKeys.every(k => a.docs.some(d => d.category === k));
      const bComplete = reqKeys.every(k => b.docs.some(d => d.category === k));
      if (aComplete !== bComplete) return aComplete ? 1 : -1;
      return a.name.localeCompare(b.name,'he');
    });

    if (!staffList.length) {
      document.getElementById('doc-list').innerHTML = '<div class="empty-state"><i class="bi bi-person-badge"></i><h5>\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9 \u05E6\u05D5\u05D5\u05EA</h5></div>';
      return;
    }

    const today = Utils.todayISO();
    const soonDate = new Date(Date.now() + 30*86400000).toISOString().slice(0,10);
    const reqKeys = this._requiredStaffDocKeys;

    document.getElementById('doc-list').innerHTML = `<div class="row g-3">${staffList.map(s => {
      const hasCats = new Set(s.docs.map(d => d.category));
      const completePct = reqKeys.length ? Math.round(reqKeys.filter(k => hasCats.has(k)).length / reqKeys.length * 100) : 100;
      const pctClass = completePct === 100 ? 'success' : completePct >= 50 ? 'warning' : 'danger';
      const initials = s.name.split(' ').map(w => w[0]).join('').slice(0,2);

      // Expiry check for license docs
      const expiryAlerts = s.docs.filter(d => d.expiryDate).map(d => {
        const isExpired = d.expiryDate < today;
        const isSoon = !isExpired && d.expiryDate < soonDate;
        if (isExpired) return `<span class="badge bg-danger me-1 small"><i class="bi bi-exclamation-triangle me-1"></i>${this._catKeyToLabel(d.category)} \u05E4\u05D2 \u05EA\u05D5\u05E7\u05E3</span>`;
        if (isSoon) return `<span class="badge bg-warning text-dark me-1 small"><i class="bi bi-clock me-1"></i>${this._catKeyToLabel(d.category)} \u05E4\u05D2 \u05D1\u05E7\u05E8\u05D5\u05D1</span>`;
        return '';
      }).filter(Boolean).join('');

      // Doc type checklist
      const docChecklist = this._staffDocKeys.map(k => {
        const info = this._docCategories[k];
        const has = hasCats.has(k);
        const isReq = reqKeys.includes(k);
        return `<span class="me-1" title="${info?.label||k}: ${has?'\u05E7\u05D9\u05D9\u05DD':'\u05D7\u05E1\u05E8'}" style="opacity:${has?1:0.3}"><i class="bi ${has?'bi-check-circle-fill':(isReq?'bi-x-circle':'bi-circle')} text-${has?'success':(isReq?'danger':'muted')}"></i></span>`;
      }).join('');

      return `<div class="col-md-6 col-lg-4">
        <div class="card h-100" style="cursor:pointer" onclick="Pages.openEntityFolder('staff','${s.name.replace(/'/g,"&#39;")}')">
          <div class="card-body">
            <div class="d-flex align-items-center gap-3 mb-2">
              ${Utils.avatarHTML ? Utils.avatarHTML(s.name) : `<div class="avatar bg-warning text-white rounded-circle d-flex align-items-center justify-content-center" style="width:42px;height:42px;font-size:14px">${initials}</div>`}
              <div class="flex-grow-1">
                <div class="fw-bold">${s.name}</div>
                ${s.role ? `<div class="text-muted small">${s.role}</div>` : ''}
                <div class="d-flex align-items-center gap-2 mt-1">
                  <div class="progress flex-grow-1" style="height:6px"><div class="progress-bar bg-${pctClass}" style="width:${completePct}%"></div></div>
                  <small class="text-${pctClass} fw-bold">${completePct}%</small>
                </div>
              </div>
              <span class="badge bg-${pctClass === 'success'?'success':'secondary'} bg-opacity-10 text-${pctClass === 'success'?'success':'dark'}">${s.docs.length}</span>
            </div>
            <div class="mb-1">${docChecklist}</div>
            ${expiryAlerts ? `<div class="mt-1">${expiryAlerts}</div>` : ''}
          </div>
        </div>
      </div>`;
    }).join('')}</div>`;
  },

  // ═══════════════════════════════════════════════════════
  // TAB 4: General / Institution Documents with versioning
  // ═══════════════════════════════════════════════════════
  _renderGeneralDocs(allDocs) {
    // Group by category
    const catGroups = {};
    this._generalDocKeys.forEach(k => { catGroups[k] = []; });
    catGroups['\u05D0\u05D7\u05E8'] = [];
    allDocs.forEach(d => {
      const cat = catGroups[d.category] !== undefined ? d.category : '\u05D0\u05D7\u05E8';
      catGroups[cat].push(d);
    });

    const hasAny = allDocs.length > 0;

    document.getElementById('doc-list').innerHTML = `<div class="row g-3">${Object.entries(catGroups).map(([key, docs]) => {
      const info = this._docCategories[key] || this._docCategories['\u05D0\u05D7\u05E8'];
      docs.sort((a,b) => (b.uploadDate||'').localeCompare(a.uploadDate||''));

      return `<div class="col-md-6 col-lg-4">
        <div class="card h-100">
          <div class="card-header bg-${info.color} bg-opacity-10 d-flex align-items-center gap-2">
            <i class="bi ${info.icon} text-${info.color} fs-5"></i>
            <span class="fw-bold">${info.label}</span>
            <span class="badge bg-${info.color} ms-auto">${docs.length}</span>
          </div>
          <div class="card-body p-0">
            ${docs.length ? `<div class="list-group list-group-flush" style="max-height:300px;overflow-y:auto">
              ${docs.map(d => `
                <div class="list-group-item d-flex align-items-center gap-2 py-2">
                  <i class="bi bi-file-earmark-text text-${info.color}"></i>
                  <div class="flex-grow-1 small">
                    <div class="fw-medium">${d.fileName||d.description||'\u05DE\u05E1\u05DE\u05DA'}</div>
                    <div class="text-muted">${d.description||''} ${d.version ? '<span class="badge bg-secondary bg-opacity-25 text-dark">v'+d.version+'</span>' : ''}</div>
                  </div>
                  <small class="text-muted">${d.uploadDate ? Utils.formatDateShort(d.uploadDate) : ''}</small>
                  <div class="btn-group btn-group-sm">
                    ${d.url ? `<button class="btn btn-outline-primary p-0 px-1" onclick="event.stopPropagation();Pages.viewDoc('${d.url}','${(d.fileName||'').replace(/'/g,"&#39;")}')"><i class="bi bi-eye"></i></button>` : ''}
                    ${d.source==='local'?`<button class="btn btn-outline-danger p-0 px-1" onclick="event.stopPropagation();Pages.deleteDoc('${d.id}')"><i class="bi bi-trash"></i></button>`:''}
                  </div>
                </div>`).join('')}
            </div>` : '<div class="text-center text-muted py-4"><i class="bi bi-inbox fs-3"></i><p class="small mb-0">\u05D0\u05D9\u05DF \u05DE\u05E1\u05DE\u05DB\u05D9\u05DD</p></div>'}
          </div>
          <div class="card-footer p-2">
            <button class="btn btn-sm btn-outline-${info.color} w-100" onclick="Pages.showUploadDoc(null,'general','${key}')"><i class="bi bi-plus-lg me-1"></i>\u05D4\u05D5\u05E1\u05E3 \u05DE\u05E1\u05DE\u05DA</button>
          </div>
        </div>
      </div>`;
    }).join('')}</div>`;
  },

  // ═══════════════════════════════════════════════════════
  // Entity Folder Modal (unified for student/parent/staff)
  // ═══════════════════════════════════════════════════════
  openEntityFolder(entityType, name) {
    const allDocs = this._getAllDocsFlat().filter(d => d.ownerName === name || d.studentName === name);
    const title = document.getElementById('folder-title');
    const body = document.getElementById('folder-body');

    const entityLabels = { student: '\u05EA\u05D9\u05E7\u05D9\u05D9\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3', parent: '\u05DE\u05E1\u05DE\u05DB\u05D9 \u05D4\u05D5\u05E8\u05D4', staff: '\u05DE\u05E1\u05DE\u05DB\u05D9 \u05E2\u05D5\u05D1\u05D3' };
    const entityColors = { student: 'primary', parent: 'info', staff: 'warning' };
    if (title) title.innerHTML = `<i class="bi bi-folder2-open me-2 text-${entityColors[entityType]||'primary'}"></i>${entityLabels[entityType]||'\u05EA\u05D9\u05E7\u05D9\u05D9\u05D4'}: ${name}`;

    let catKeys, reqKeys;
    if (entityType === 'student') { catKeys = this._studentDocKeys; reqKeys = this._requiredStudentDocKeys; }
    else if (entityType === 'parent') { catKeys = this._parentDocKeys; reqKeys = []; }
    else if (entityType === 'staff') { catKeys = this._staffDocKeys; reqKeys = this._requiredStaffDocKeys; }
    else { catKeys = this._generalDocKeys; reqKeys = []; }

    // Completion
    const hasCats = new Set(allDocs.map(d => d.category));
    const completePct = reqKeys.length ? Math.round(reqKeys.filter(k => hasCats.has(k)).length / reqKeys.length * 100) : 100;
    const pctClass = completePct === 100 ? 'success' : completePct >= 50 ? 'warning' : 'danger';

    let html = `<div class="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom">
      ${Utils.avatarHTML ? Utils.avatarHTML(name,'lg') : ''}
      <div class="flex-grow-1">
        <h5 class="mb-1">${name}</h5>
        <span class="text-muted">${allDocs.length} \u05DE\u05E1\u05DE\u05DB\u05D9\u05DD</span>
        ${reqKeys.length ? `<div class="d-flex align-items-center gap-2 mt-1">
          <div class="progress flex-grow-1" style="height:8px;max-width:200px"><div class="progress-bar bg-${pctClass}" style="width:${completePct}%"></div></div>
          <small class="text-${pctClass} fw-bold">${completePct}% \u05D4\u05E9\u05DC\u05DE\u05D4</small>
        </div>` : ''}
      </div>
      <button class="btn btn-sm btn-primary" onclick="bootstrap.Modal.getInstance(document.getElementById('student-folder-modal'))?.hide();setTimeout(()=>Pages.showUploadDoc('${name.replace(/'/g,"&#39;")}','${entityType}'),300)"><i class="bi bi-cloud-upload me-1"></i>\u05D4\u05E2\u05DC\u05D0\u05D4</button>
    </div>`;

    // Cross-reference: if parent, show link to student folders
    if (entityType === 'parent') {
      const parent = this._parentsForDocs.find(p => {
        const pn = ((p['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9']||'') + ' ' + (p['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4']||'')).trim();
        return pn === name || Utils.fullName(p) === name;
      });
      if (parent) {
        const linkedStudent = parent['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3'] || parent['\u05EA\u05DC\u05DE\u05D9\u05D3'] || '';
        if (linkedStudent) {
          html += `<div class="alert alert-info small mb-3"><i class="bi bi-link-45deg me-1"></i>\u05DE\u05E7\u05D5\u05E9\u05E8 \u05DC\u05EA\u05D9\u05E7\u05D9\u05D9\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3:
            <a href="#" onclick="bootstrap.Modal.getInstance(document.getElementById('student-folder-modal'))?.hide();setTimeout(()=>{Pages._docActiveTab='students';Pages._renderDocs();Pages.openEntityFolder('student','${linkedStudent.replace(/'/g,"&#39;")}')},300);return false" class="fw-bold">${linkedStudent}</a>
          </div>`;
        }
      }
    }

    // Show categories as sections
    const today = Utils.todayISO();
    catKeys.forEach(key => {
      const info = this._docCategories[key];
      if (!info) return;
      const catDocs = allDocs.filter(d => d.category === key);
      const isReq = reqKeys.includes(key);
      const hasDocs = catDocs.length > 0;

      html += `<div class="mb-3">
        <div class="d-flex align-items-center gap-2 mb-2">
          <i class="bi ${info.icon} text-${info.color}"></i>
          <span class="fw-bold">${info.label}</span>
          ${isReq ? '<span class="badge bg-danger bg-opacity-10 text-danger small">\u05E0\u05D3\u05E8\u05E9</span>' : ''}
          ${hasDocs ? `<span class="badge bg-success bg-opacity-10 text-success ms-auto"><i class="bi bi-check me-1"></i>${catDocs.length}</span>` :
            (isReq ? `<span class="badge bg-danger ms-auto">\u05D7\u05E1\u05E8</span>
              <button class="btn btn-sm btn-outline-primary ms-1" onclick="bootstrap.Modal.getInstance(document.getElementById('student-folder-modal'))?.hide();setTimeout(()=>Pages.showUploadDoc('${name.replace(/'/g,"&#39;")}','${entityType}','${key}'),300)"><i class="bi bi-cloud-upload"></i></button>` :
              '<span class="badge bg-secondary bg-opacity-25 ms-auto">\u05E8\u05D9\u05E7</span>')}
        </div>
        ${catDocs.length ? `<div class="list-group">
          ${catDocs.map(d => {
            const isExpired = d.expiryDate && d.expiryDate < today;
            return `<div class="list-group-item d-flex align-items-center gap-2 ${isExpired?'border-danger':''}">
              <i class="bi bi-file-earmark text-${info.color}"></i>
              <div class="flex-grow-1">
                <div class="small fw-medium">${d.fileName||'\u05DE\u05E1\u05DE\u05DA'}</div>
                <div class="text-muted" style="font-size:0.75rem">
                  ${d.description||''} ${d.uploadDate ? '&middot; '+Utils.formatDateShort(d.uploadDate) : ''}
                  ${d.version ? ' &middot; <span class="badge bg-secondary bg-opacity-25 text-dark" style="font-size:0.65rem">v'+d.version+'</span>' : ''}
                  ${d.expiryDate ? ' &middot; <span class="'+(isExpired?'text-danger fw-bold':'text-warning')+'">\u05EA\u05E4\u05D5\u05D2\u05D4: '+Utils.formatDateShort(d.expiryDate)+'</span>' : ''}
                </div>
              </div>
              <div class="btn-group btn-group-sm">
                ${d.url ? `<button class="btn btn-outline-primary" onclick="Pages.viewDoc('${d.url}','${(d.fileName||'').replace(/'/g,"&#39;")}')"><i class="bi bi-eye"></i></button>` : ''}
                ${d.source==='local'?`<button class="btn btn-outline-danger" onclick="Pages.deleteDoc('${d.id}');Pages.openEntityFolder('${entityType}','${name.replace(/'/g,"&#39;")}')"><i class="bi bi-trash"></i></button>`:''}
              </div>
            </div>`;
          }).join('')}
        </div>` : ''}
      </div>`;
    });

    // Also show "other" docs not matching any category
    const otherDocs = allDocs.filter(d => !catKeys.includes(d.category) && d.category !== '\u05D0\u05D7\u05E8');
    const miscDocs = allDocs.filter(d => d.category === '\u05D0\u05D7\u05E8');
    const extraDocs = [...otherDocs, ...miscDocs];
    if (extraDocs.length) {
      html += `<div class="mb-3">
        <div class="d-flex align-items-center gap-2 mb-2">
          <i class="bi bi-file-earmark text-secondary"></i>
          <span class="fw-bold">\u05D0\u05D7\u05E8</span>
          <span class="badge bg-secondary bg-opacity-10 text-secondary ms-auto">${extraDocs.length}</span>
        </div>
        <div class="list-group">
          ${extraDocs.map(d => `<div class="list-group-item d-flex align-items-center gap-2">
            <i class="bi bi-file-earmark text-muted"></i>
            <div class="flex-grow-1">
              <div class="small fw-medium">${d.fileName||'\u05DE\u05E1\u05DE\u05DA'}</div>
              <div class="text-muted" style="font-size:0.75rem">${d.description||''} ${d.uploadDate ? '&middot; '+Utils.formatDateShort(d.uploadDate) : ''}</div>
            </div>
            <div class="btn-group btn-group-sm">
              ${d.url ? `<button class="btn btn-outline-primary" onclick="Pages.viewDoc('${d.url}','${(d.fileName||'').replace(/'/g,"&#39;")}')"><i class="bi bi-eye"></i></button>` : ''}
              ${d.source==='local'?`<button class="btn btn-outline-danger" onclick="Pages.deleteDoc('${d.id}');Pages.openEntityFolder('${entityType}','${name.replace(/'/g,"&#39;")}')"><i class="bi bi-trash"></i></button>`:''}
            </div>
          </div>`).join('')}
        </div>
      </div>`;
    }

    // Cross-reference: show docs from other tabs that reference this entity
    const crossRefDocs = this._getAllDocsFlat().filter(d => d.linkedStudent === name && d.entity !== entityType);
    if (crossRefDocs.length) {
      html += `<div class="mt-3 pt-3 border-top">
        <h6 class="text-muted"><i class="bi bi-link-45deg me-1"></i>\u05DE\u05E1\u05DE\u05DB\u05D9\u05DD \u05DE\u05E7\u05D5\u05E9\u05E8\u05D9\u05DD \u05DE\u05D8\u05D0\u05D1\u05D9\u05DD \u05D0\u05D7\u05E8\u05D9\u05DD</h6>
        <div class="list-group">
          ${crossRefDocs.map(d => `<div class="list-group-item d-flex align-items-center gap-2 py-2">
            <span class="badge bg-${d.entity==='parent'?'info':'warning'}">${d.entity==='parent'?'\u05D4\u05D5\u05E8\u05D4':'\u05E6\u05D5\u05D5\u05EA'}</span>
            <span class="small fw-medium">${d.ownerName}</span>
            <span class="small text-muted">${this._catKeyToLabel(d.category)}</span>
            <span class="small text-muted ms-auto">${d.uploadDate ? Utils.formatDateShort(d.uploadDate) : ''}</span>
          </div>`).join('')}
        </div>
      </div>`;
    }

    if (body) body.innerHTML = html;
    new bootstrap.Modal(document.getElementById('student-folder-modal')).show();
  },

  // backward compat
  openStudentFolder(studentName) { this.openEntityFolder('student', studentName); },

  // ── View Document ──
  viewDoc(url, title) {
    document.getElementById('viewer-title').textContent = title || '\u05E6\u05E4\u05D9\u05D9\u05D4 \u05D1\u05DE\u05E1\u05DE\u05DA';
    const body = document.getElementById('viewer-body');
    const ext = (url.split('.').pop()||'').toLowerCase().split('?')[0];
    if (['jpg','jpeg','png','gif','webp'].includes(ext)) {
      body.innerHTML = `<img src="${url}" style="width:100%;max-height:80vh;object-fit:contain" alt="${title}">`;
    } else if (ext === 'pdf') {
      body.innerHTML = `<iframe src="${url}" style="width:100%;height:80vh;border:none"></iframe>`;
    } else {
      body.innerHTML = `<iframe src="https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true" style="width:100%;height:80vh;border:none"></iframe>`;
    }
    new bootstrap.Modal(document.getElementById('doc-viewer-modal')).show();
  },

  // ── Upload Modal Logic ──
  _onUploadEntityTypeChange() {
    const entityType = document.getElementById('upload-entity-type')?.value || 'student';
    const ownerWrap = document.getElementById('upload-owner-wrap');
    const typeSelect = document.getElementById('upload-type');
    const expiryWrap = document.getElementById('upload-expiry-wrap');
    const versionWrap = document.getElementById('upload-version-wrap');

    // Show/hide owner selection for 'general'
    if (ownerWrap) ownerWrap.style.display = entityType === 'general' ? 'none' : '';
    if (expiryWrap) expiryWrap.style.display = entityType === 'staff' ? '' : 'none';
    if (versionWrap) versionWrap.style.display = entityType === 'general' ? '' : 'none';

    // Populate type options
    let keys;
    if (entityType === 'student') keys = this._studentDocKeys;
    else if (entityType === 'parent') keys = this._parentDocKeys;
    else if (entityType === 'staff') keys = this._staffDocKeys;
    else keys = this._generalDocKeys;
    if (typeSelect) {
      typeSelect.innerHTML = keys.map(k => `<option value="${k}">${this._docCategories[k]?.label||k}</option>`).join('') +
        `<option value="\u05D0\u05D7\u05E8">\u05D0\u05D7\u05E8</option>`;
    }

    // Populate owner dropdown
    this._populateUploadOwner(entityType);
  },

  _populateUploadOwner(entityType) {
    const sel = document.getElementById('upload-owner');
    if (!sel) return;
    let options = '<option value="">\u05D1\u05D7\u05E8...</option>';
    if (entityType === 'student') {
      options += this._studentsForDocs.map(s => `<option value="${Utils.fullName(s)}">${Utils.fullName(s)}</option>`).join('');
    } else if (entityType === 'parent') {
      const parentNames = this._parentsForDocs.map(p => {
        const n = ((p['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9']||'') + ' ' + (p['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4']||'')).trim();
        return n || Utils.fullName(p);
      }).filter(Boolean);
      options += [...new Set(parentNames)].sort((a,b)=>a.localeCompare(b,'he')).map(n => `<option value="${n}">${n}</option>`).join('');
    } else if (entityType === 'staff') {
      options += this._staffForDocs.map(s => `<option value="${Utils.fullName(s)}">${Utils.fullName(s)}</option>`).join('');
    }
    sel.innerHTML = options;
  },

  async showUploadDoc(preselectedOwner, preselectedEntityType, preselectedCategory) {
    const entityTypeEl = document.getElementById('upload-entity-type');
    if (entityTypeEl && preselectedEntityType) entityTypeEl.value = preselectedEntityType;

    // Trigger entity type change to populate dropdowns
    this._onUploadEntityTypeChange();

    // Pre-select owner
    if (preselectedOwner) {
      const sel = document.getElementById('upload-owner');
      if (sel) sel.value = preselectedOwner;
    }

    // Pre-select category
    if (preselectedCategory) {
      const typeEl = document.getElementById('upload-type');
      if (typeEl) typeEl.value = preselectedCategory;
    }

    document.getElementById('upload-file').value = '';
    document.getElementById('upload-desc').value = '';
    document.getElementById('upload-expiry') && (document.getElementById('upload-expiry').value = '');
    document.getElementById('upload-version') && (document.getElementById('upload-version').value = '');
    document.getElementById('upload-file-info')?.classList.add('d-none');
    new bootstrap.Modal(document.getElementById('upload-modal')).show();
  },

  async uploadDoc() {
    const entityType = document.getElementById('upload-entity-type')?.value || 'student';
    const ownerName = entityType === 'general' ? '\u05DE\u05D5\u05E1\u05D3' : (document.getElementById('upload-owner')?.value || '');
    const catKey = document.getElementById('upload-type')?.value || '\u05D0\u05D7\u05E8';
    const file = document.getElementById('upload-file').files[0];
    const desc = document.getElementById('upload-desc').value.trim();
    const expiry = document.getElementById('upload-expiry')?.value || '';
    const version = document.getElementById('upload-version')?.value || '';

    if (entityType !== 'general' && !ownerName) { Utils.toast('\u05D1\u05D7\u05E8 \u05D9\u05E9\u05D5\u05EA','\u05D0\u05D6\u05D4\u05E8\u05D4'); return; }

    const docMeta = {
      ownerName: ownerName,
      studentName: entityType === 'student' ? ownerName : '', // backward compat
      category: catKey,
      fileName: file ? file.name : (this._catKeyToLabel(catKey) + ' - ' + ownerName),
      description: desc,
      fileSize: file ? (file.size/1024).toFixed(0)+'KB' : '',
      status: '\u05D4\u05EA\u05E7\u05D1\u05DC',
      entity: entityType,
      expiryDate: expiry,
      version: version,
      url: ''
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result.split(',')[1];
        try {
          const row = {
            '\u05E9\u05DD': ownerName,
            '\u05E1\u05D5\u05D2_\u05DE\u05E1\u05DE\u05DA': catKey,
            '\u05E1\u05D5\u05D2_\u05D9\u05E9\u05D5\u05EA': entityType,
            '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05D4\u05EA\u05E7\u05D1\u05DC',
            '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05E7\u05D1\u05DC\u05D4': Utils.todayISO(),
            '\u05E9\u05DD_\u05E7\u05D5\u05D1\u05E5': file.name,
            '\u05D4\u05E2\u05E8\u05D5\u05EA': desc,
            '\u05E7\u05D5\u05D1\u05E5_base64': base64
          };
          if (entityType === 'student') row['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3'] = ownerName;
          else if (entityType === 'staff') row['\u05E9\u05DD_\u05E2\u05D5\u05D1\u05D3'] = ownerName;
          else if (entityType === 'parent') row['\u05E9\u05DD_\u05D4\u05D5\u05E8\u05D4'] = ownerName;
          if (expiry) row['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05EA\u05E4\u05D5\u05D2\u05D4'] = expiry;
          if (version) row['\u05D2\u05E8\u05E1\u05D4'] = version;
          await App.apiCall('add', '\u05E7\u05D1\u05E6\u05D9\u05DD_\u05DE\u05E6\u05D5\u05E8\u05E4\u05D9\u05DD', { row });
        } catch(e) {
          this._addLocalDoc(docMeta);
        }
        bootstrap.Modal.getInstance(document.getElementById('upload-modal'))?.hide();
        Utils.toast('\u05DE\u05E1\u05DE\u05DA \u05D4\u05D5\u05E2\u05DC\u05D4 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4!');
        this.documentsInit();
      };
      reader.readAsDataURL(file);
    } else {
      this._addLocalDoc(docMeta);
      bootstrap.Modal.getInstance(document.getElementById('upload-modal'))?.hide();
      Utils.toast('\u05E8\u05E9\u05D5\u05DE\u05EA \u05DE\u05E1\u05DE\u05DA \u05E0\u05E9\u05DE\u05E8\u05D4');
      this.documentsInit();
    }
  },

  async deleteDoc(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4', '\u05DC\u05DE\u05D7\u05D5\u05E7 \u05DE\u05E1\u05DE\u05DA \u05D6\u05D4?')) return;
    this._deleteLocalDoc(id);
    this._localDocs = this._getLocalDocs();
    Utils.toast('\u05DE\u05E1\u05DE\u05DA \u05E0\u05DE\u05D7\u05E7');
    this._renderDocs();
  },

  showBulkUpload() {
    const list = document.getElementById('bulk-students-list');
    if (!list) return;

    // Populate bulk type options with student doc types
    const bulkType = document.getElementById('bulk-type');
    if (bulkType) {
      bulkType.innerHTML = this._studentDocKeys.map(k => `<option value="${k}">${this._docCategories[k]?.label||k}</option>`).join('') +
        `<option value="\u05D0\u05D7\u05E8">\u05D0\u05D7\u05E8</option>`;
    }

    const names = new Set();
    this._studentsForDocs.forEach(s => names.add(Utils.fullName(s)));
    this._localDocs.filter(d => d.entity === 'student').forEach(d => { if(d.ownerName) names.add(d.ownerName); });
    const sorted = [...names].sort((a,b) => a.localeCompare(b,'he'));

    list.innerHTML = sorted.map(n => `
      <div class="form-check py-1 px-2">
        <input class="form-check-input" type="checkbox" value="${n}" id="bulk-s-${n.replace(/\s/g,'_')}" onchange="Pages._updateBulkCount()">
        <label class="form-check-label" for="bulk-s-${n.replace(/\s/g,'_')}">${n}</label>
      </div>`).join('');

    document.getElementById('bulk-desc').value = '';
    this._updateBulkCount();
    new bootstrap.Modal(document.getElementById('bulk-upload-modal')).show();
  },

  _updateBulkCount() {
    const checked = document.querySelectorAll('#bulk-students-list input:checked').length;
    const el = document.getElementById('bulk-count');
    if (el) el.textContent = checked + ' \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05E0\u05D1\u05D7\u05E8\u05D5';
  },

  doBulkUpload() {
    const catKey = document.getElementById('bulk-type').value;
    const desc = document.getElementById('bulk-desc').value.trim();
    const checked = [...document.querySelectorAll('#bulk-students-list input:checked')].map(c => c.value);
    if (!checked.length) { Utils.toast('\u05D1\u05D7\u05E8 \u05DC\u05E4\u05D7\u05D5\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3 \u05D0\u05D7\u05D3','\u05D0\u05D6\u05D4\u05E8\u05D4'); return; }

    checked.forEach(name => {
      this._addLocalDoc({
        ownerName: name,
        studentName: name,
        category: catKey,
        fileName: this._catKeyToLabel(catKey) + ' - ' + name,
        description: desc || '\u05D4\u05E2\u05DC\u05D0\u05D4 \u05DE\u05E8\u05D5\u05D1\u05D4',
        status: '\u05D4\u05EA\u05E7\u05D1\u05DC',
        entity: 'student'
      });
    });

    bootstrap.Modal.getInstance(document.getElementById('bulk-upload-modal'))?.hide();
    Utils.toast(`${checked.length} \u05DE\u05E1\u05DE\u05DB\u05D9\u05DD \u05E0\u05D5\u05E6\u05E8\u05D5 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4`);
    this._localDocs = this._getLocalDocs();
    this._renderDocs();
  },

  async markDocReceived(name, type, entityType) {
    try {
      const row = { '\u05E9\u05DD': name, '\u05E1\u05D5\u05D2_\u05DE\u05E1\u05DE\u05DA': type, '\u05E1\u05D5\u05D2_\u05D9\u05E9\u05D5\u05EA': entityType||'student', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05D4\u05EA\u05E7\u05D1\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05E7\u05D1\u05DC\u05D4': Utils.todayISO() };
      if (entityType === 'student') row['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3'] = name;
      else if (entityType === 'staff') row['\u05E9\u05DD_\u05E2\u05D5\u05D1\u05D3'] = name;
      else if (entityType === 'parent') row['\u05E9\u05DD_\u05D4\u05D5\u05E8\u05D4'] = name;
      await App.apiCall('add', '\u05E7\u05D1\u05E6\u05D9\u05DD_\u05DE\u05E6\u05D5\u05E8\u05E4\u05D9\u05DD', { row });
      Utils.toast('\u05DE\u05E1\u05DE\u05DA \u05E1\u05D5\u05DE\u05DF \u05DB\u05D4\u05EA\u05E7\u05D1\u05DC');
      this.documentsInit();
    } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },

  showMissingDocs() {
    const allDocs = this._getAllDocsFlat();
    const missing = [];

    // Check students
    this._studentsForDocs.forEach(s => {
      const name = Utils.fullName(s);
      const sDocs = allDocs.filter(d => (d.ownerName === name || d.studentName === name) && d.entity === 'student');
      const hasCats = new Set(sDocs.map(d => d.category));
      const missingCats = this._requiredStudentDocKeys.filter(k => !hasCats.has(k));
      if (missingCats.length) missing.push({ name, types: missingCats.map(k => this._catKeyToLabel(k)), typeKeys: missingCats, entityType: 'student' });
    });

    // Check staff
    this._staffForDocs.forEach(s => {
      const name = Utils.fullName(s);
      const sDocs = allDocs.filter(d => d.ownerName === name && d.entity === 'staff');
      const hasCats = new Set(sDocs.map(d => d.category));
      const missingCats = this._requiredStaffDocKeys.filter(k => !hasCats.has(k));
      if (missingCats.length) missing.push({ name, types: missingCats.map(k => this._catKeyToLabel(k)), typeKeys: missingCats, entityType: 'staff' });
    });

    // Check expired staff docs
    const today = Utils.todayISO();
    const expired = allDocs.filter(d => d.entity === 'staff' && d.expiryDate && d.expiryDate < today);

    missing.sort((a,b) => b.types.length - a.types.length);

    const html = `<div class="modal fade" id="missing-docs-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
      <div class="modal-header bg-danger text-white"><h5><i class="bi bi-exclamation-triangle me-2"></i>\u05DE\u05E1\u05DE\u05DB\u05D9\u05DD \u05D7\u05E1\u05E8\u05D9\u05DD (${missing.length} \u05D0\u05E0\u05E9\u05D9\u05DD)</h5><button class="btn-close btn-close-white" data-bs-dismiss="modal"></button></div>
      <div class="modal-body" style="max-height:60vh;overflow-y:auto">
        ${expired.length ? `<div class="alert alert-danger small mb-3"><i class="bi bi-clock-history me-1"></i><strong>${expired.length} \u05DE\u05E1\u05DE\u05DB\u05D9\u05DD \u05E4\u05D2\u05D9 \u05EA\u05D5\u05E7\u05E3:</strong> ${expired.map(d => d.ownerName + ' - ' + this._catKeyToLabel(d.category)).join(', ')}</div>` : ''}
        ${missing.length ? `
          <div class="alert alert-warning small mb-3"><i class="bi bi-info-circle me-1"></i>\u05DE\u05E1\u05DE\u05DB\u05D9\u05DD \u05E0\u05D3\u05E8\u05E9\u05D9\u05DD \u05DC\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD: ${this._requiredStudentDocKeys.map(k => this._catKeyToLabel(k)).join(', ')}</div>
          ${missing.map(m => `<div class="d-flex align-items-center gap-3 py-2 border-bottom">
            ${Utils.avatarHTML ? Utils.avatarHTML(m.name,'sm') : ''}
            <div class="flex-grow-1">
              <span class="fw-bold">${m.name}</span>
              ${m.entityType === 'staff' ? ' <span class="badge bg-warning text-dark">\u05E6\u05D5\u05D5\u05EA</span>' : ''}
            </div>
            <div class="d-flex flex-wrap gap-1">${m.types.map(t => `<span class="badge bg-danger">${t}</span>`).join('')}</div>
            <button class="btn btn-sm btn-outline-primary" onclick="bootstrap.Modal.getInstance(document.getElementById('missing-docs-modal'))?.hide();setTimeout(()=>Pages.showUploadDoc('${m.name.replace(/'/g,"&#39;")}','${m.entityType}'),300)" title="\u05D4\u05E2\u05DC\u05D0\u05D4"><i class="bi bi-cloud-upload"></i></button>
          </div>`).join('')}
        ` : '<div class="text-success text-center py-4"><i class="bi bi-check-circle fs-1 d-block mb-2"></i><h5>\u05DB\u05DC \u05D4\u05DE\u05E1\u05DE\u05DB\u05D9\u05DD \u05D4\u05E0\u05D3\u05E8\u05E9\u05D9\u05DD \u05D4\u05EA\u05E7\u05D1\u05DC\u05D5!</h5></div>'}
      </div>
    </div></div></div>`;
    document.getElementById('missing-docs-modal')?.remove();
    document.body.insertAdjacentHTML('beforeend', html);
    new bootstrap.Modal(document.getElementById('missing-docs-modal')).show();
  },


  /* ======================================================================
     COMMITTEES — Comprehensive Committee Management
     ====================================================================== */

  // ── Demo Data ──
  _commDemoCommittees: [],

  _commDemoMeetings: [],

  _commtData: [],
  _commMeetings: [],
  _commFilter: '',
  _commView: 'cards', // 'cards' | 'meeting-log'
  _commSelectedId: null,

  committees() {
    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div>
        <h1><i class="bi bi-people me-2"></i>\u05D5\u05E2\u05D3\u05D5\u05EA</h1>
        <p class="text-muted mb-0">\u05E0\u05D9\u05D4\u05D5\u05DC \u05D5\u05E2\u05D3\u05D5\u05EA, \u05D7\u05D1\u05E8\u05D9\u05DD, \u05D9\u05E9\u05D9\u05D1\u05D5\u05EA \u05D5\u05D4\u05E6\u05D1\u05E2\u05D5\u05EA</p>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-primary btn-sm" onclick="Pages.showScheduleMeetingModal()"><i class="bi bi-calendar-plus me-1"></i>\u05E7\u05D1\u05E2 \u05D9\u05E9\u05D9\u05D1\u05D4</button>
        <button class="btn btn-primary btn-sm" onclick="Pages.showAddComm()"><i class="bi bi-plus-lg me-1"></i>\u05D5\u05E2\u05D3\u05D4 \u05D7\u05D3\u05E9\u05D4</button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="row g-3 mb-4">
      <div class="col-6 col-md-3"><div class="card p-3 text-center">
        <i class="bi bi-people-fill fs-3 text-primary"></i>
        <div class="fs-3 fw-bold text-primary" id="comm-stat-total">0</div>
        <small class="text-muted">\u05E1\u05D4"\u05DB \u05D5\u05E2\u05D3\u05D5\u05EA</small>
      </div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center">
        <i class="bi bi-check-circle-fill fs-3 text-success"></i>
        <div class="fs-3 fw-bold text-success" id="comm-stat-active">0</div>
        <small class="text-muted">\u05E4\u05E2\u05D9\u05DC\u05D5\u05EA</small>
      </div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center">
        <i class="bi bi-calendar-event fs-3 text-info"></i>
        <div class="fs-3 fw-bold text-info" id="comm-stat-upcoming">0</div>
        <small class="text-muted">\u05D9\u05E9\u05D9\u05D1\u05D5\u05EA \u05E7\u05E8\u05D5\u05D1\u05D5\u05EA</small>
      </div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center">
        <i class="bi bi-person-check-fill fs-3 text-warning"></i>
        <div class="fs-3 fw-bold text-warning" id="comm-stat-members">0</div>
        <small class="text-muted">\u05E1\u05D4"\u05DB \u05D7\u05D1\u05E8\u05D9\u05DD</small>
      </div></div>
    </div>

    <!-- View Toggle + Filter -->
    <div class="card p-3 mb-4">
      <div class="row g-2 align-items-end">
        <div class="col-md-4">
          <label class="form-label small">\u05E1\u05D9\u05E0\u05D5\u05DF \u05DC\u05E4\u05D9 \u05E1\u05D8\u05D8\u05D5\u05E1</label>
          <select class="form-select form-select-sm" id="comm-filter-status" onchange="Pages._commFilter=this.value;Pages.renderCommittees()">
            <option value="">\u05D4\u05DB\u05DC</option>
            <option value="\u05E4\u05E2\u05D9\u05DC">\u05E4\u05E2\u05D9\u05DC\u05D5\u05EA</option>
            <option value="\u05DC\u05D0 \u05E4\u05E2\u05D9\u05DC">\u05DC\u05D0 \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA</option>
          </select>
        </div>
        <div class="col-md-4"></div>
        <div class="col-md-4 text-end">
          <div class="btn-group btn-group-sm">
            <button class="btn btn-outline-primary active" id="comm-view-cards" onclick="Pages._commView='cards';Pages.renderCommittees()"><i class="bi bi-grid-3x2-gap-fill me-1"></i>\u05DB\u05E8\u05D8\u05D9\u05E1\u05D9\u05DD</button>
            <button class="btn btn-outline-primary" id="comm-view-log" onclick="Pages._commView='meeting-log';Pages.renderCommittees()"><i class="bi bi-journal-text me-1"></i>\u05D9\u05D5\u05DE\u05DF \u05D9\u05E9\u05D9\u05D1\u05D5\u05EA</button>
          </div>
        </div>
      </div>
    </div>

    <div id="comm-list">${Utils.skeleton(3)}</div>

    <!-- Add/Edit Committee Modal -->
    <div class="modal fade" id="committee-modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header"><h5 class="modal-title" id="comm-modal-title">\u05D5\u05E2\u05D3\u05D4 \u05D7\u05D3\u05E9\u05D4</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
          <div class="modal-body">
            <div class="row g-3">
              <div class="col-12"><label class="form-label">\u05E9\u05DD \u05D4\u05D5\u05E2\u05D3\u05D4</label><input class="form-control" id="cmf-name"></div>
              <div class="col-12"><label class="form-label">\u05DE\u05D8\u05E8\u05D4</label><textarea class="form-control" id="cmf-purpose" rows="2" placeholder="\u05EA\u05D7\u05D5\u05DD \u05D0\u05D7\u05E8\u05D9\u05D5\u05EA \u05D5\u05DE\u05D8\u05E8\u05D5\u05EA \u05D4\u05D5\u05E2\u05D3\u05D4"></textarea></div>
              <div class="col-md-6"><label class="form-label">\u05E1\u05D8\u05D8\u05D5\u05E1</label>
                <select class="form-select" id="cmf-status">
                  <option value="\u05E4\u05E2\u05D9\u05DC">\u05E4\u05E2\u05D9\u05DC</option>
                  <option value="\u05DC\u05D0 \u05E4\u05E2\u05D9\u05DC">\u05DC\u05D0 \u05E4\u05E2\u05D9\u05DC</option>
                </select>
              </div>
              <div class="col-md-6"><label class="form-label">\u05D9\u05E9\u05D9\u05D1\u05D4 \u05D4\u05D1\u05D0\u05D4</label><input type="date" class="form-control" id="cmf-next-meeting"></div>
            </div>
          </div>
          <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveCommittee()">\u05E9\u05DE\u05D5\u05E8</button></div>
        </div>
      </div>
    </div>

    <!-- Member Management Modal -->
    <div class="modal fade" id="comm-member-modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header"><h5 class="modal-title">\u05E0\u05D9\u05D4\u05D5\u05DC \u05D7\u05D1\u05E8\u05D9\u05DD</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
          <div class="modal-body">
            <div id="comm-member-list" class="mb-3"></div>
            <hr>
            <h6>\u05D4\u05D5\u05E1\u05E4\u05EA \u05D7\u05D1\u05E8</h6>
            <div class="row g-2">
              <div class="col-7"><input class="form-control form-control-sm" id="cmm-name" placeholder="\u05E9\u05DD \u05DE\u05DC\u05D0"></div>
              <div class="col-3">
                <select class="form-select form-select-sm" id="cmm-role">
                  <option value="\u05D7\u05D1\u05E8">\u05D7\u05D1\u05E8</option>
                  <option value="\u05D9\u05D5&quot;\u05E8">\u05D9\u05D5"\u05E8</option>
                  <option value="\u05DE\u05D6\u05DB\u05D9\u05E8">\u05DE\u05D6\u05DB\u05D9\u05E8</option>
                </select>
              </div>
              <div class="col-2"><button class="btn btn-sm btn-primary w-100" onclick="Pages.addCommMember()"><i class="bi bi-plus-lg"></i></button></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Schedule Meeting Modal -->
    <div class="modal fade" id="comm-schedule-modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header"><h5 class="modal-title">\u05E7\u05D1\u05D9\u05E2\u05EA \u05D9\u05E9\u05D9\u05D1\u05D4</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
          <div class="modal-body">
            <div class="row g-3">
              <div class="col-12"><label class="form-label">\u05D5\u05E2\u05D3\u05D4</label>
                <select class="form-select" id="cms-committee"></select>
              </div>
              <div class="col-md-6"><label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA</label><input type="date" class="form-control" id="cms-date"></div>
              <div class="col-md-6"><label class="form-label">\u05E9\u05E2\u05D4</label><input type="time" class="form-control" id="cms-time"></div>
              <div class="col-12"><label class="form-label">\u05DE\u05D9\u05E7\u05D5\u05DD</label><input class="form-control" id="cms-location" placeholder="\u05D7\u05D3\u05E8 \u05DE\u05D5\u05E8\u05D9\u05DD / \u05DE\u05E9\u05E8\u05D3 / \u05D6\u05D5\u05DD"></div>
              <div class="col-12"><label class="form-label">\u05E1\u05D3\u05E8 \u05D9\u05D5\u05DD</label><textarea class="form-control" id="cms-agenda" rows="3" placeholder="\u05E0\u05D5\u05E9\u05D0\u05D9\u05DD \u05DC\u05D3\u05D9\u05D5\u05DF..."></textarea></div>
            </div>
          </div>
          <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveScheduledMeeting()">\u05E7\u05D1\u05E2</button></div>
        </div>
      </div>
    </div>

    <!-- Meeting Minutes Modal -->
    <div class="modal fade" id="comm-minutes-modal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header"><h5 class="modal-title" id="comm-minutes-title">\u05E4\u05E8\u05D5\u05D8\u05D5\u05E7\u05D5\u05DC \u05D9\u05E9\u05D9\u05D1\u05D4</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
          <div class="modal-body" id="comm-minutes-body"></div>
        </div>
      </div>
    </div>

    <!-- Committee Detail Modal -->
    <div class="modal fade" id="comm-detail-modal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header"><h5 class="modal-title" id="comm-detail-title">\u05E4\u05E8\u05D8\u05D9 \u05D5\u05E2\u05D3\u05D4</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
          <div class="modal-body" id="comm-detail-body"></div>
        </div>
      </div>
    </div>
    `;
  },

  _commtUseDemo: false,

  commtLoadDemo() {
    this._commtUseDemo = true;
    this._commtData = this._commDemoCommittees;
    this._commMeetings = this._commDemoMeetings;
    this.renderCommittees();
    Utils.toast('\u05E0\u05D8\u05E2\u05E0\u05D5 \u05E0\u05EA\u05D5\u05E0\u05D9 \u05D3\u05DE\u05D5', 'info');
  },

  committeesInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    try {
      const raw = _gc('\u05D5\u05E2\u05D3\u05D5\u05EA');
      this._commtData = raw && raw.length ? raw : (this._commtUseDemo ? this._commDemoCommittees : []);
    } catch(e) {
      this._commtData = this._commtUseDemo ? this._commDemoCommittees : [];
    }
    this._commMeetings = this._commtData.length ? [] : (this._commtUseDemo ? this._commDemoMeetings : []);
    this.renderCommittees();
  },

  _commGetAllMembers() {
    const all = new Set();
    this._commtData.forEach(c => {
      const members = c.members || [];
      if (Array.isArray(members)) members.forEach(m => all.add(m.name || m));
      else if (typeof members === 'string') members.split(',').forEach(n => all.add(n.trim()));
    });
    return all;
  },

  renderCommittees() {
    const data = this._commtData || [];
    const filter = this._commFilter;
    const filtered = filter ? data.filter(c => (c.status || '\u05E4\u05E2\u05D9\u05DC') === filter) : data;
    const today = Utils.todayISO();

    // Empty state
    if (!data.length) {
      const el = document.getElementById('comm-list');
      if (el) el.innerHTML = '<div class="empty-state"><i class="bi bi-people"></i><h5>\u05D0\u05D9\u05DF \u05D5\u05E2\u05D3\u05D5\u05EA \u05E2\u05D3\u05D9\u05D9\u05DF</h5><p class="text-muted">\u05DC\u05D7\u05E5 "\u05D5\u05E2\u05D3\u05D4 \u05D7\u05D3\u05E9\u05D4" \u05DC\u05D4\u05D5\u05E1\u05E4\u05D4</p></div>';
      return;
    }

    // Stats
    const active = data.filter(c => (c.status || '\u05E4\u05E2\u05D9\u05DC') === '\u05E4\u05E2\u05D9\u05DC').length;
    const upcoming = data.filter(c => c.nextMeeting && c.nextMeeting >= today).length;
    const totalMembers = this._commGetAllMembers().size;
    document.getElementById('comm-stat-total').textContent = data.length;
    document.getElementById('comm-stat-active').textContent = active;
    document.getElementById('comm-stat-upcoming').textContent = upcoming;
    document.getElementById('comm-stat-members').textContent = totalMembers;

    // Toggle active class on view buttons
    document.getElementById('comm-view-cards').classList.toggle('active', this._commView === 'cards');
    document.getElementById('comm-view-log').classList.toggle('active', this._commView === 'meeting-log');

    if (this._commView === 'meeting-log') {
      this._renderCommMeetingLog();
      return;
    }

    // Cards view
    if (!filtered.length) {
      document.getElementById('comm-list').innerHTML = '<div class="empty-state"><i class="bi bi-people"></i><h5>\u05D0\u05D9\u05DF \u05D5\u05E2\u05D3\u05D5\u05EA</h5></div>';
      return;
    }

    document.getElementById('comm-list').innerHTML = `<div class="row g-3">${filtered.map(c => {
      const stColor = (c.status || '\u05E4\u05E2\u05D9\u05DC') === '\u05E4\u05E2\u05D9\u05DC' ? 'success' : 'secondary';
      const stLabel = c.status || '\u05E4\u05E2\u05D9\u05DC';
      const icon = c.icon || 'people';
      const members = Array.isArray(c.members) ? c.members : [];
      const memberCount = members.length || (typeof c.members === 'string' ? c.members.split(',').length : 0);
      const nm = c.nextMeeting || '';
      const meetingCount = this._commMeetings.filter(m => m.committeeId === c.id).length;
      const chair = members.find(m => m.role === '\u05D9\u05D5"\u05E8');

      return `<div class="col-md-6 col-xl-4">
        <div class="card h-100 border-start border-4 border-${stColor}" style="cursor:pointer" onclick="Pages.showCommDetail('${c.id}')">
          <div class="card-body">
            <div class="d-flex align-items-start justify-content-between mb-2">
              <div class="d-flex align-items-center gap-2">
                <div class="rounded-circle bg-${stColor} bg-opacity-10 d-flex align-items-center justify-content-center" style="width:40px;height:40px">
                  <i class="bi bi-${icon}-fill text-${stColor} fs-5"></i>
                </div>
                <div>
                  <h6 class="fw-bold mb-0">${c.name || c['\u05E9\u05DD'] || ''}</h6>
                  ${chair ? `<small class="text-muted">\u05D9\u05D5"\u05E8: ${chair.name}</small>` : ''}
                </div>
              </div>
              <span class="badge bg-${stColor}">${stLabel}</span>
            </div>
            <p class="small text-muted mb-2">${c.purpose || c['\u05EA\u05D9\u05D0\u05D5\u05E8'] || ''}</p>
            <div class="d-flex flex-wrap gap-2 mb-2">
              <span class="badge bg-light text-dark"><i class="bi bi-person me-1"></i>${memberCount} \u05D7\u05D1\u05E8\u05D9\u05DD</span>
              <span class="badge bg-light text-dark"><i class="bi bi-journal-text me-1"></i>${meetingCount} \u05D9\u05E9\u05D9\u05D1\u05D5\u05EA</span>
            </div>
            ${nm ? `<div class="small"><i class="bi bi-calendar-check text-primary me-1"></i>\u05D9\u05E9\u05D9\u05D1\u05D4 \u05D4\u05D1\u05D0\u05D4: <strong>${nm}</strong>${nm < today ? ' <span class="badge bg-warning text-dark">\u05E2\u05D1\u05E8</span>' : ''}</div>` : '<div class="small text-muted"><i class="bi bi-calendar-x me-1"></i>\u05DC\u05D0 \u05E0\u05E7\u05D1\u05E2\u05D4 \u05D9\u05E9\u05D9\u05D1\u05D4</div>'}
            ${members.length ? `<div class="mt-2 d-flex flex-wrap gap-1">${members.slice(0,4).map(m => {
              const initials = (m.name || m).split(' ').slice(0,2).map(w=>w[0]).join('');
              const roleColor = m.role === '\u05D9\u05D5"\u05E8' ? 'primary' : m.role === '\u05DE\u05D6\u05DB\u05D9\u05E8' ? 'info' : 'secondary';
              return `<span class="badge bg-${roleColor} bg-opacity-10 text-${roleColor}" title="${m.name||m} \u2014 ${m.role||'\u05D7\u05D1\u05E8'}">${initials}</span>`;
            }).join('')}${members.length > 4 ? `<span class="badge bg-light text-dark">+${members.length-4}</span>` : ''}</div>` : ''}
          </div>
          <div class="card-footer bg-transparent border-top-0 pt-0">
            <div class="d-flex gap-1">
              <button class="btn btn-sm btn-outline-primary flex-fill" onclick="event.stopPropagation();Pages.showCommMembers('${c.id}')" title="\u05D7\u05D1\u05E8\u05D9\u05DD"><i class="bi bi-person-gear"></i></button>
              <button class="btn btn-sm btn-outline-info flex-fill" onclick="event.stopPropagation();Pages.showScheduleMeetingModal('${c.id}')" title="\u05E7\u05D1\u05E2 \u05D9\u05E9\u05D9\u05D1\u05D4"><i class="bi bi-calendar-plus"></i></button>
              <button class="btn btn-sm btn-outline-danger flex-fill" onclick="event.stopPropagation();Pages.deleteCommittee('${c.id}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button>
            </div>
          </div>
        </div>
      </div>`;
    }).join('')}</div>`;
  },

  // ── Meeting Log View ──
  _renderCommMeetingLog() {
    const meetings = [...this._commMeetings].sort((a,b) => b.date.localeCompare(a.date));
    if (!meetings.length) {
      document.getElementById('comm-list').innerHTML = '<div class="empty-state"><i class="bi bi-journal-text"></i><h5>\u05D0\u05D9\u05DF \u05D9\u05E9\u05D9\u05D1\u05D5\u05EA</h5></div>';
      return;
    }
    const commMap = {};
    this._commtData.forEach(c => commMap[c.id] = c);

    document.getElementById('comm-list').innerHTML = `
      <div class="card">
        <div class="table-responsive">
          <table class="table table-hover mb-0 align-middle">
            <thead class="table-light"><tr>
              <th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05E9\u05E2\u05D4</th><th>\u05D5\u05E2\u05D3\u05D4</th><th>\u05DE\u05D9\u05E7\u05D5\u05DD</th><th>\u05DE\u05E9\u05EA\u05EA\u05E4\u05D9\u05DD</th><th>\u05D4\u05D7\u05DC\u05D8\u05D5\u05EA</th><th>\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA</th><th>\u05D4\u05E6\u05D1\u05E2\u05D5\u05EA</th><th></th>
            </tr></thead>
            <tbody>${meetings.map(mt => {
              const comm = commMap[mt.committeeId] || {};
              return `<tr style="cursor:pointer" onclick="Pages.showMeetingMinutes('${mt.id}')">
                <td class="fw-bold">${mt.date}</td>
                <td>${mt.time || '--'}</td>
                <td><span class="badge bg-primary bg-opacity-10 text-primary">${comm.name || '--'}</span></td>
                <td><i class="bi bi-geo-alt me-1"></i>${mt.location || '--'}</td>
                <td><span class="badge bg-light text-dark">${(mt.attendees||[]).length}</span></td>
                <td><span class="badge bg-light text-dark">${(mt.decisions||[]).length}</span></td>
                <td><span class="badge bg-light text-dark">${(mt.actionItems||[]).length}</span></td>
                <td>${(mt.votes||[]).length ? `<span class="badge bg-warning text-dark"><i class="bi bi-hand-thumbs-up me-1"></i>${mt.votes.length}</span>` : '<span class="text-muted">--</span>'}</td>
                <td><button class="btn btn-sm btn-outline-primary" onclick="event.stopPropagation();Pages.showMeetingMinutes('${mt.id}')"><i class="bi bi-eye"></i></button></td>
              </tr>`;
            }).join('')}</tbody>
          </table>
        </div>
      </div>`;
  },

  // ── Committee Detail Modal ──
  showCommDetail(commId) {
    const c = this._commtData.find(x => x.id === commId);
    if (!c) return;
    const meetings = this._commMeetings.filter(m => m.committeeId === commId).sort((a,b) => b.date.localeCompare(a.date));
    const members = Array.isArray(c.members) ? c.members : [];
    const stColor = (c.status || '\u05E4\u05E2\u05D9\u05DC') === '\u05E4\u05E2\u05D9\u05DC' ? 'success' : 'secondary';

    document.getElementById('comm-detail-title').textContent = c.name || '';
    document.getElementById('comm-detail-body').innerHTML = `
      <div class="d-flex align-items-center gap-2 mb-3">
        <span class="badge bg-${stColor} fs-6">${c.status || '\u05E4\u05E2\u05D9\u05DC'}</span>
        ${c.nextMeeting ? `<span class="badge bg-info bg-opacity-10 text-info"><i class="bi bi-calendar me-1"></i>\u05D9\u05E9\u05D9\u05D1\u05D4 \u05D4\u05D1\u05D0\u05D4: ${c.nextMeeting}</span>` : ''}
      </div>
      <p class="text-muted">${c.purpose || c['\u05EA\u05D9\u05D0\u05D5\u05E8'] || ''}</p>

      <h6 class="fw-bold mt-3 mb-2"><i class="bi bi-person-lines-fill me-2 text-primary"></i>\u05D7\u05D1\u05E8\u05D9\u05DD (${members.length})</h6>
      ${members.length ? `<div class="table-responsive"><table class="table table-sm"><thead><tr><th>\u05E9\u05DD</th><th>\u05EA\u05E4\u05E7\u05D9\u05D3</th></tr></thead><tbody>${members.map(m => {
        const roleColor = m.role === '\u05D9\u05D5"\u05E8' ? 'primary' : m.role === '\u05DE\u05D6\u05DB\u05D9\u05E8' ? 'info' : 'secondary';
        return `<tr><td>${m.name || m}</td><td><span class="badge bg-${roleColor}">${m.role || '\u05D7\u05D1\u05E8'}</span></td></tr>`;
      }).join('')}</tbody></table></div>` : '<p class="text-muted">\u05D0\u05D9\u05DF \u05D7\u05D1\u05E8\u05D9\u05DD</p>'}

      <h6 class="fw-bold mt-3 mb-2"><i class="bi bi-journal-text me-2 text-info"></i>\u05D4\u05D9\u05E1\u05D8\u05D5\u05E8\u05D9\u05D9\u05EA \u05D9\u05E9\u05D9\u05D1\u05D5\u05EA (${meetings.length})</h6>
      ${meetings.length ? `<div class="list-group list-group-flush">${meetings.map(mt => `
        <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" style="cursor:pointer" onclick="Pages.showMeetingMinutes('${mt.id}');bootstrap.Modal.getInstance(document.getElementById('comm-detail-modal')).hide()">
          <div>
            <strong>${mt.date}</strong> ${mt.time || ''} <span class="text-muted">\u2014 ${mt.location || ''}</span>
            <div class="small text-muted">${mt.agenda || ''}</div>
          </div>
          <div class="d-flex gap-1">
            <span class="badge bg-light text-dark" title="\u05D4\u05D7\u05DC\u05D8\u05D5\u05EA">${(mt.decisions||[]).length} <i class="bi bi-check2"></i></span>
            ${(mt.votes||[]).length ? `<span class="badge bg-warning text-dark" title="\u05D4\u05E6\u05D1\u05E2\u05D5\u05EA">${mt.votes.length} <i class="bi bi-hand-thumbs-up"></i></span>` : ''}
          </div>
        </div>`).join('')}</div>` : '<p class="text-muted">\u05D0\u05D9\u05DF \u05D9\u05E9\u05D9\u05D1\u05D5\u05EA</p>'}
    `;
    new bootstrap.Modal(document.getElementById('comm-detail-modal')).show();
  },

  // ── Meeting Minutes Modal ──
  showMeetingMinutes(meetingId) {
    const mt = this._commMeetings.find(m => m.id === meetingId);
    if (!mt) return;
    const comm = this._commtData.find(c => c.id === mt.committeeId) || {};

    document.getElementById('comm-minutes-title').textContent = `\u05E4\u05E8\u05D5\u05D8\u05D5\u05E7\u05D5\u05DC \u2014 ${comm.name || ''} \u2014 ${mt.date}`;
    document.getElementById('comm-minutes-body').innerHTML = `
      <div class="row g-3 mb-3">
        <div class="col-md-4"><div class="card bg-light p-2 text-center"><i class="bi bi-calendar3 text-primary me-1"></i><strong>${mt.date}</strong> ${mt.time || ''}</div></div>
        <div class="col-md-4"><div class="card bg-light p-2 text-center"><i class="bi bi-geo-alt text-primary me-1"></i>${mt.location || '--'}</div></div>
        <div class="col-md-4"><div class="card bg-light p-2 text-center"><i class="bi bi-people text-primary me-1"></i>${(mt.attendees||[]).length} \u05DE\u05E9\u05EA\u05EA\u05E4\u05D9\u05DD</div></div>
      </div>

      <h6 class="fw-bold"><i class="bi bi-card-text me-2 text-muted"></i>\u05E1\u05D3\u05E8 \u05D9\u05D5\u05DD</h6>
      <p class="mb-3">${mt.agenda || '--'}</p>

      <h6 class="fw-bold"><i class="bi bi-person-check me-2 text-muted"></i>\u05DE\u05E9\u05EA\u05EA\u05E4\u05D9\u05DD</h6>
      <div class="d-flex flex-wrap gap-1 mb-3">${(mt.attendees||[]).map(a => `<span class="badge bg-primary bg-opacity-10 text-primary">${a}</span>`).join('')}</div>

      <h6 class="fw-bold"><i class="bi bi-check-circle me-2 text-success"></i>\u05D4\u05D7\u05DC\u05D8\u05D5\u05EA</h6>
      ${(mt.decisions||[]).length ? `<ul class="list-group list-group-flush mb-3">${mt.decisions.map(d => `<li class="list-group-item"><i class="bi bi-check2 text-success me-2"></i>${d}</li>`).join('')}</ul>` : '<p class="text-muted mb-3">\u05D0\u05D9\u05DF \u05D4\u05D7\u05DC\u05D8\u05D5\u05EA</p>'}

      <h6 class="fw-bold"><i class="bi bi-list-task me-2 text-warning"></i>\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA \u05E4\u05E2\u05D5\u05DC\u05D4</h6>
      ${(mt.actionItems||[]).length ? `<ul class="list-group list-group-flush mb-3">${mt.actionItems.map(ai => `<li class="list-group-item"><i class="bi bi-arrow-return-left text-warning me-2"></i>${ai}</li>`).join('')}</ul>` : '<p class="text-muted mb-3">\u05D0\u05D9\u05DF \u05DE\u05E9\u05D9\u05DE\u05D5\u05EA</p>'}

      ${(mt.votes||[]).length ? `
      <h6 class="fw-bold"><i class="bi bi-hand-thumbs-up me-2 text-info"></i>\u05D4\u05E6\u05D1\u05E2\u05D5\u05EA</h6>
      <div class="table-responsive"><table class="table table-sm"><thead><tr><th>\u05E0\u05D5\u05E9\u05D0</th><th>\u05D1\u05E2\u05D3</th><th>\u05E0\u05D2\u05D3</th><th>\u05E0\u05DE\u05E0\u05E2</th><th>\u05EA\u05D5\u05E6\u05D0\u05D4</th></tr></thead>
      <tbody>${mt.votes.map(v => {
        const total = v.inFavor + v.against + v.abstain;
        const passed = v.inFavor > v.against;
        return `<tr>
          <td class="fw-bold">${v.topic}</td>
          <td><span class="badge bg-success">${v.inFavor}</span></td>
          <td><span class="badge bg-danger">${v.against}</span></td>
          <td><span class="badge bg-secondary">${v.abstain}</span></td>
          <td><span class="badge bg-${passed ? 'success' : 'danger'}">${passed ? '\u05D0\u05D5\u05E9\u05E8' : '\u05E0\u05D3\u05D7\u05D4'}</span></td>
        </tr>`;
      }).join('')}</tbody></table></div>` : ''}
    `;
    new bootstrap.Modal(document.getElementById('comm-minutes-modal')).show();
  },

  // ── Add/Edit Committee ──
  showAddComm(commId) {
    this._commSelectedId = commId || null;
    const c = commId ? this._commtData.find(x => x.id === commId) : null;
    document.getElementById('comm-modal-title').textContent = c ? '\u05E2\u05E8\u05D9\u05DB\u05EA \u05D5\u05E2\u05D3\u05D4' : '\u05D5\u05E2\u05D3\u05D4 \u05D7\u05D3\u05E9\u05D4';
    document.getElementById('cmf-name').value = c ? (c.name || '') : '';
    document.getElementById('cmf-purpose').value = c ? (c.purpose || '') : '';
    document.getElementById('cmf-status').value = c ? (c.status || '\u05E4\u05E2\u05D9\u05DC') : '\u05E4\u05E2\u05D9\u05DC';
    document.getElementById('cmf-next-meeting').value = c ? (c.nextMeeting || '') : '';
    new bootstrap.Modal(document.getElementById('committee-modal')).show();
  },

  async saveCommittee() {
    const name = document.getElementById('cmf-name').value.trim();
    const purpose = document.getElementById('cmf-purpose').value.trim();
    const status = document.getElementById('cmf-status').value;
    const nextMeeting = document.getElementById('cmf-next-meeting').value;

    if (!name) { Utils.toast('\u05D7\u05E1\u05E8 \u05E9\u05DD','warning'); return; }

    if (this._commSelectedId) {
      // Update existing
      const c = this._commtData.find(x => x.id === this._commSelectedId);
      if (c) { c.name = name; c.purpose = purpose; c.status = status; c.nextMeeting = nextMeeting; }
    } else {
      // Add new
      const newId = 'cm' + Date.now();
      this._commtData.push({ id: newId, name, purpose, status, nextMeeting, icon:'people', members:[] });
    }

    try {
      const row = {'\u05E9\u05DD': name, '\u05EA\u05D9\u05D0\u05D5\u05E8': purpose, '\u05E1\u05D8\u05D8\u05D5\u05E1': status, '\u05E4\u05D2\u05D9\u05E9\u05D4_\u05D4\u05D1\u05D0\u05D4': nextMeeting};
      if (this._commSelectedId) {
        await App.apiCall('update','\u05D5\u05E2\u05D3\u05D5\u05EA',{id: this._commSelectedId, row});
      } else {
        await App.apiCall('add','\u05D5\u05E2\u05D3\u05D5\u05EA',{row});
      }
    } catch(e) { /* demo mode */ }

    bootstrap.Modal.getInstance(document.getElementById('committee-modal')).hide();
    Utils.toast(this._commSelectedId ? '\u05D5\u05E2\u05D3\u05D4 \u05E2\u05D5\u05D3\u05DB\u05E0\u05D4' : '\u05D5\u05E2\u05D3\u05D4 \u05E0\u05D5\u05E1\u05E4\u05D4');
    this._commSelectedId = null;
    this.renderCommittees();
  },

  async deleteCommittee(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4','\u05DC\u05DE\u05D7\u05D5\u05E7 \u05D5\u05E2\u05D3\u05D4 \u05D6\u05D5?')) return;
    this._commtData = this._commtData.filter(c => c.id !== id);
    this._commMeetings = this._commMeetings.filter(m => m.committeeId !== id);
    try { await App.apiCall('delete','\u05D5\u05E2\u05D3\u05D5\u05EA',{id}); } catch(e) { /* silent */ }
    Utils.toast('\u05E0\u05DE\u05D7\u05E7');
    this.renderCommittees();
  },

  // ── Member Management ──
  showCommMembers(commId) {
    this._commSelectedId = commId;
    this._renderCommMemberList();
    new bootstrap.Modal(document.getElementById('comm-member-modal')).show();
  },

  _renderCommMemberList() {
    const c = this._commtData.find(x => x.id === this._commSelectedId);
    if (!c) return;
    const members = Array.isArray(c.members) ? c.members : [];
    document.getElementById('comm-member-list').innerHTML = members.length ? `
      <div class="list-group list-group-flush">${members.map((m, i) => {
        const roleColor = m.role === '\u05D9\u05D5"\u05E8' ? 'primary' : m.role === '\u05DE\u05D6\u05DB\u05D9\u05E8' ? 'info' : 'secondary';
        const initials = (m.name || '').split(' ').slice(0,2).map(w=>w[0]||'').join('');
        return `<div class="list-group-item d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-2">
            <span class="badge bg-${roleColor} rounded-circle" style="width:32px;height:32px;line-height:32px;font-size:0.75rem">${initials}</span>
            <div><strong>${m.name || m}</strong><br><small class="text-muted">${m.role || '\u05D7\u05D1\u05E8'}</small></div>
          </div>
          <button class="btn btn-sm btn-outline-danger" onclick="Pages.removeCommMember(${i})"><i class="bi bi-x-lg"></i></button>
        </div>`;
      }).join('')}</div>` : '<p class="text-muted text-center">\u05D0\u05D9\u05DF \u05D7\u05D1\u05E8\u05D9\u05DD \u05E2\u05D3\u05D9\u05D9\u05DF</p>';
  },

  addCommMember() {
    const name = document.getElementById('cmm-name').value.trim();
    const role = document.getElementById('cmm-role').value;
    if (!name) { Utils.toast('\u05D7\u05E1\u05E8 \u05E9\u05DD','warning'); return; }
    const c = this._commtData.find(x => x.id === this._commSelectedId);
    if (!c) return;
    if (!Array.isArray(c.members)) c.members = [];
    c.members.push({name, role});
    document.getElementById('cmm-name').value = '';
    this._renderCommMemberList();
    this.renderCommittees();
    Utils.toast('\u05D7\u05D1\u05E8 \u05E0\u05D5\u05E1\u05E3');
  },

  removeCommMember(index) {
    const c = this._commtData.find(x => x.id === this._commSelectedId);
    if (!c || !Array.isArray(c.members)) return;
    c.members.splice(index, 1);
    this._renderCommMemberList();
    this.renderCommittees();
    Utils.toast('\u05D7\u05D1\u05E8 \u05D4\u05D5\u05E1\u05E8');
  },

  // ── Schedule Meeting ──
  showScheduleMeetingModal(commId) {
    const sel = document.getElementById('cms-committee');
    sel.innerHTML = this._commtData.map(c => `<option value="${c.id}" ${c.id === commId ? 'selected' : ''}>${c.name || c['\u05E9\u05DD'] || ''}</option>`).join('');
    document.getElementById('cms-date').value = '';
    document.getElementById('cms-time').value = '';
    document.getElementById('cms-location').value = '';
    document.getElementById('cms-agenda').value = '';
    new bootstrap.Modal(document.getElementById('comm-schedule-modal')).show();
  },

  saveScheduledMeeting() {
    const committeeId = document.getElementById('cms-committee').value;
    const date = document.getElementById('cms-date').value;
    const time = document.getElementById('cms-time').value;
    const location = document.getElementById('cms-location').value.trim();
    const agenda = document.getElementById('cms-agenda').value.trim();

    if (!committeeId || !date) { Utils.toast('\u05D7\u05E1\u05E8 \u05D5\u05E2\u05D3\u05D4 \u05D5\u05EA\u05D0\u05E8\u05D9\u05DA','warning'); return; }

    const newMeeting = {
      id: 'mt' + Date.now(),
      committeeId, date, time, location, agenda,
      attendees: [], decisions: [], actionItems: [], votes: []
    };
    this._commMeetings.push(newMeeting);

    // Update committee next meeting if this is upcoming
    const c = this._commtData.find(x => x.id === committeeId);
    if (c && (!c.nextMeeting || date < c.nextMeeting || c.nextMeeting < Utils.todayISO())) {
      c.nextMeeting = date;
    }

    bootstrap.Modal.getInstance(document.getElementById('comm-schedule-modal')).hide();
    Utils.toast('\u05D9\u05E9\u05D9\u05D1\u05D4 \u05E0\u05E7\u05D1\u05E2\u05D4');
    this.renderCommittees();
  },


  /* ======================================================================
     TRIPS — Comprehensive Trips/Excursions Management
     ====================================================================== */
  _tripDemoData: [
    { '\u05DE\u05D6\u05D4\u05D4':'t1', '\u05E9\u05DD':'\u05D8\u05D9\u05D5\u05DC \u05E2\u05DE\u05E7 \u05D4\u05D0\u05DC\u05D4 \u05D5\u05E4\u05D0\u05E8\u05E7 \u05D1\u05E8\u05D9\u05D8\u05E0\u05D9\u05D4', '\u05EA\u05D0\u05E8\u05D9\u05DA':'2026-04-23', '\u05D9\u05E2\u05D3':'\u05E2\u05DE\u05E7 \u05D4\u05D0\u05DC\u05D4, \u05E4\u05D0\u05E8\u05E7 \u05D1\u05E8\u05D9\u05D8\u05E0\u05D9\u05D4', '\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05D1\u05D5\u05E6\u05E2', '\u05DE\u05E9\u05EA\u05EA\u05E4\u05D9\u05DD':'40', '\u05E2\u05DC\u05D5\u05EA_\u05DC\u05EA\u05DC\u05DE\u05D9\u05D3':'50', '\u05D0\u05D7\u05E8\u05D0\u05D9':'\u05D4\u05E8\u05D1 \u05D9\u05E8\u05D5\u05E9\u05DC\u05DE\u05D9', '\u05D4\u05E2\u05E8\u05D5\u05EA':'\u05D9\u05E6\u05D9\u05D0\u05D4 10:00, \u05D7\u05D6\u05E8\u05D4 14:30. \u05DB\u05D5\u05DC\u05DC \u05D0\u05E8\u05D5\u05D7\u05EA \u05E6\u05D4\u05E8\u05D9\u05D9\u05DD. \u05D0\u05D9\u05E9\u05D5\u05E8 \u05DC\u05E9\u05DB\u05D4 3874682.' },
    { '\u05DE\u05D6\u05D4\u05D4':'t2', '\u05E9\u05DD':'\u05D8\u05D9\u05D5\u05DC \u05E1\u05D5\u05E3 \u05E9\u05E0\u05D4 - \u05D9\u05E8\u05D5\u05E9\u05DC\u05D9\u05DD', '\u05EA\u05D0\u05E8\u05D9\u05DA':'2026-06-15', '\u05D9\u05E2\u05D3':'\u05D9\u05E8\u05D5\u05E9\u05DC\u05D9\u05DD \u2014 \u05D4\u05E8 \u05D4\u05D6\u05D9\u05EA\u05D9\u05DD, \u05D4\u05DB\u05D5\u05EA\u05DC', '\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05DE\u05EA\u05D5\u05DB\u05E0\u05DF', '\u05DE\u05E9\u05EA\u05EA\u05E4\u05D9\u05DD':'45', '\u05E2\u05DC\u05D5\u05EA_\u05DC\u05EA\u05DC\u05DE\u05D9\u05D3':'80', '\u05D0\u05D7\u05E8\u05D0\u05D9':'\u05D4\u05E8\u05D1 \u05D9\u05E8\u05D5\u05E9\u05DC\u05DE\u05D9', '\u05D4\u05E2\u05E8\u05D5\u05EA':'\u05D8\u05D9\u05D5\u05DC \u05E9\u05E0\u05EA\u05D9 \u05E2\u05DD \u05DC\u05D9\u05E0\u05D4' }
  ],

  trips() {
    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div>
        <h1><i class="bi bi-geo-alt-fill me-2"></i>\u05D8\u05D9\u05D5\u05DC\u05D9\u05DD</h1>
        <p class="text-muted mb-0">\u05E0\u05D9\u05D4\u05D5\u05DC \u05D8\u05D9\u05D5\u05DC\u05D9\u05DD, \u05DE\u05E9\u05EA\u05EA\u05E4\u05D9\u05DD \u05D5\u05EA\u05E7\u05E6\u05D9\u05D1</p>
      </div>
      <div class="d-flex gap-2">
        <div class="btn-group btn-group-sm" id="trip-view-toggle">
          <button class="btn btn-outline-primary active" onclick="Pages.setTripView('cards')"><i class="bi bi-grid-3x2-gap-fill"></i></button>
          <button class="btn btn-outline-primary" onclick="Pages.setTripView('timeline')"><i class="bi bi-clock-history"></i></button>
          <button class="btn btn-outline-primary" onclick="Pages.setTripView('gallery')"><i class="bi bi-images"></i></button>
        </div>
        <button class="btn btn-primary btn-sm" onclick="Pages.showAddTrip()"><i class="bi bi-plus-lg me-1"></i>\u05D8\u05D9\u05D5\u05DC \u05D7\u05D3\u05E9</button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="row g-3 mb-4">
      <div class="col-6 col-md-3"><div class="card p-3 text-center">
        <i class="bi bi-geo-alt-fill fs-3 text-primary"></i>
        <div class="fs-3 fw-bold text-primary" id="trip-stat-total">0</div>
        <small class="text-muted">\u05E1\u05D4"\u05DB \u05D8\u05D9\u05D5\u05DC\u05D9\u05DD</small>
      </div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center">
        <i class="bi bi-calendar-event fs-3 text-info"></i>
        <div class="fs-3 fw-bold text-info" id="trip-stat-upcoming">0</div>
        <small class="text-muted">\u05E7\u05E8\u05D5\u05D1\u05D9\u05DD</small>
      </div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center">
        <i class="bi bi-check-circle-fill fs-3 text-success"></i>
        <div class="fs-3 fw-bold text-success" id="trip-stat-completed">0</div>
        <small class="text-muted">\u05D1\u05D5\u05E6\u05E2\u05D5</small>
      </div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center">
        <i class="bi bi-cash-stack fs-3 text-warning"></i>
        <div class="fs-3 fw-bold text-warning" id="trip-stat-spent">\u20AA0</div>
        <small class="text-muted">\u05E1\u05D4"\u05DB \u05D4\u05D5\u05E6\u05D0\u05D5\u05EA</small>
      </div></div>
    </div>

    <!-- Filter bar -->
    <div class="card p-3 mb-4">
      <div class="row g-2 align-items-end">
        <div class="col-md-3">
          <label class="form-label small">\u05E1\u05D9\u05E0\u05D5\u05DF \u05DC\u05E4\u05D9 \u05E1\u05D8\u05D8\u05D5\u05E1</label>
          <select class="form-select form-select-sm" id="trip-filter-status" onchange="Pages.renderTrips()">
            <option value="">\u05D4\u05DB\u05DC</option>
            <option value="\u05DE\u05EA\u05D5\u05DB\u05E0\u05DF">\u05DE\u05EA\u05D5\u05DB\u05E0\u05DF</option>
            <option value="\u05D0\u05D5\u05E9\u05E8">\u05D0\u05D5\u05E9\u05E8</option>
            <option value="\u05D1\u05D5\u05E6\u05E2">\u05D1\u05D5\u05E6\u05E2</option>
            <option value="\u05D1\u05D5\u05D8\u05DC">\u05D1\u05D5\u05D8\u05DC</option>
          </select>
        </div>
        <div class="col-md-3">
          <label class="form-label small">\u05E1\u05D9\u05E0\u05D5\u05DF \u05DC\u05E4\u05D9 \u05DB\u05D9\u05EA\u05D4</label>
          <select class="form-select form-select-sm" id="trip-filter-class" onchange="Pages.renderTrips()">
            <option value="">\u05D4\u05DB\u05DC</option>
            <option value="\u05D0">\u05DB\u05D9\u05EA\u05D4 \u05D0'</option>
            <option value="\u05D1">\u05DB\u05D9\u05EA\u05D4 \u05D1'</option>
            <option value="\u05D2">\u05DB\u05D9\u05EA\u05D4 \u05D2'</option>
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label small">\u05D7\u05D9\u05E4\u05D5\u05E9</label>
          <input type="search" class="form-control form-control-sm" id="trip-search" placeholder="\u05D7\u05E4\u05E9 \u05D9\u05E2\u05D3..." oninput="Pages.renderTrips()">
        </div>
        <div class="col-md-2">
          <button class="btn btn-outline-secondary btn-sm w-100" onclick="Pages.resetTripFilters()"><i class="bi bi-x-circle me-1"></i>\u05E0\u05E7\u05D4</button>
        </div>
      </div>
    </div>

    <!-- Main content area -->
    <div id="trip-cards">${Utils.skeleton(3)}</div>

    <!-- Budget Summary -->
    <div class="card p-3 mt-4" id="trip-budget-section">
      <h6 class="fw-bold mb-3"><i class="bi bi-bar-chart-fill text-warning me-2"></i>\u05E1\u05D9\u05DB\u05D5\u05DD \u05EA\u05E7\u05E6\u05D9\u05D1\u05D9</h6>
      <div class="row g-3" id="trip-budget-content"></div>
    </div>

    <!-- Create/Edit Trip Modal (enhanced with schedule, equipment, emergency) -->
    <div class="modal fade" id="trip-modal" tabindex="-1"><div class="modal-dialog modal-xl"><div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title"><i class="bi bi-geo-alt me-2"></i>\u05D8\u05D9\u05D5\u05DC \u05D7\u05D3\u05E9</h5>
        <button class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <ul class="nav nav-tabs mb-3" id="trip-form-tabs">
          <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" href="#tf-tab-details">\u05E4\u05E8\u05D8\u05D9\u05DD</a></li>
          <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tf-tab-schedule"><i class="bi bi-clock me-1"></i>\u05DC\u05D5\u05D7 \u05D6\u05DE\u05E0\u05D9\u05DD</a></li>
          <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tf-tab-logistics">\u05DC\u05D5\u05D2\u05D9\u05E1\u05D8\u05D9\u05E7\u05D4</a></li>
          <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tf-tab-equipment"><i class="bi bi-backpack me-1"></i>\u05E6\u05D9\u05D5\u05D3</a></li>
          <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tf-tab-emergency"><i class="bi bi-telephone-fill me-1"></i>\u05D7\u05D9\u05E8\u05D5\u05DD</a></li>
          <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tf-tab-budget">\u05EA\u05E7\u05E6\u05D9\u05D1</a></li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane fade show active" id="tf-tab-details">
            <div class="row g-3">
              <div class="col-md-8"><label class="form-label">\u05D9\u05E2\u05D3</label><input class="form-control" id="tf-dest" placeholder="\u05DC\u05D3\u05D5\u05D2\u05DE\u05D4: \u05D9\u05E8\u05D5\u05E9\u05DC\u05D9\u05DD \u05D4\u05E2\u05EA\u05D9\u05E7\u05D4"></div>
              <div class="col-md-4"><label class="form-label">\u05DB\u05D9\u05EA\u05D4</label>
                <select class="form-select" id="tf-class">
                  <option value="">\u05D1\u05D7\u05E8...</option>
                  <option value="\u05D0">\u05DB\u05D9\u05EA\u05D4 \u05D0'</option>
                  <option value="\u05D1">\u05DB\u05D9\u05EA\u05D4 \u05D1'</option>
                  <option value="\u05D2">\u05DB\u05D9\u05EA\u05D4 \u05D2'</option>
                  <option value="\u05D0+\u05D1">\u05D0'+\u05D1'</option>
                  <option value="\u05D0+\u05D1+\u05D2">\u05DB\u05DC \u05D4\u05DE\u05D5\u05E1\u05D3</option>
                </select>
              </div>
              <div class="col-md-6"><label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05EA\u05D7\u05DC\u05D4</label><input type="date" class="form-control" id="tf-start"></div>
              <div class="col-md-6"><label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA \u05E1\u05D9\u05D5\u05DD</label><input type="date" class="form-control" id="tf-end"></div>
              <div class="col-12"><label class="form-label">\u05EA\u05D9\u05D0\u05D5\u05E8</label><textarea class="form-control" id="tf-desc" rows="3" placeholder="\u05EA\u05D0\u05E8 \u05D0\u05EA \u05D4\u05D8\u05D9\u05D5\u05DC..."></textarea></div>
              <div class="col-md-6"><label class="form-label">\u05E1\u05D8\u05D8\u05D5\u05E1</label>
                <select class="form-select" id="tf-status">
                  <option value="\u05DE\u05EA\u05D5\u05DB\u05E0\u05DF">\u05DE\u05EA\u05D5\u05DB\u05E0\u05DF</option>
                  <option value="\u05D0\u05D5\u05E9\u05E8">\u05D0\u05D5\u05E9\u05E8</option>
                  <option value="\u05D1\u05D5\u05E6\u05E2">\u05D1\u05D5\u05E6\u05E2</option>
                  <option value="\u05D1\u05D5\u05D8\u05DC">\u05D1\u05D5\u05D8\u05DC</option>
                </select>
              </div>
            </div>
          </div>
          <!-- Schedule Tab -->
          <div class="tab-pane fade" id="tf-tab-schedule">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h6 class="fw-bold mb-0"><i class="bi bi-clock-history me-1"></i>\u05DC\u05D5\u05D7 \u05D6\u05DE\u05E0\u05D9\u05DD \u05DE\u05E4\u05D5\u05E8\u05D8</h6>
              <button class="btn btn-sm btn-outline-primary" onclick="Pages.addTripScheduleSlot()"><i class="bi bi-plus-lg me-1"></i>\u05D4\u05D5\u05E1\u05E3 \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA</button>
            </div>
            <div id="tf-schedule-list">
              <div class="text-center text-muted py-4"><i class="bi bi-clock fs-1 d-block mb-2"></i>\u05DC\u05D7\u05E5 "\u05D4\u05D5\u05E1\u05E3 \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA" \u05DC\u05D1\u05E0\u05D5\u05EA \u05D0\u05EA \u05DC\u05D5\u05D7 \u05D4\u05D6\u05DE\u05E0\u05D9\u05DD</div>
            </div>
          </div>
          <div class="tab-pane fade" id="tf-tab-logistics">
            <div class="row g-3">
              <div class="col-md-6"><label class="form-label"><i class="bi bi-bus-front me-1"></i>\u05D4\u05E1\u05E2\u05D4</label>
                <select class="form-select" id="tf-transport">
                  <option value="\u05D0\u05D5\u05D8\u05D5\u05D1\u05D5\u05E1">\u05D0\u05D5\u05D8\u05D5\u05D1\u05D5\u05E1</option>
                  <option value="\u05DE\u05D9\u05E0\u05D9\u05D1\u05D5\u05E1">\u05DE\u05D9\u05E0\u05D9\u05D1\u05D5\u05E1</option>
                  <option value="\u05E8\u05DB\u05D1\u05EA">\u05E8\u05DB\u05D1\u05EA</option>
                  <option value="\u05D4\u05DC\u05D9\u05DB\u05D4 \u05D1\u05E8\u05D2\u05DC">\u05D4\u05DC\u05D9\u05DB\u05D4 \u05D1\u05E8\u05D2\u05DC</option>
                  <option value="\u05D0\u05D7\u05E8">\u05D0\u05D7\u05E8</option>
                </select>
              </div>
              <div class="col-md-6"><label class="form-label"><i class="bi bi-egg-fried me-1"></i>\u05D0\u05E8\u05D5\u05D7\u05D5\u05EA</label>
                <select class="form-select" id="tf-meals">
                  <option value="\u05D0\u05E8\u05D5\u05D7\u05EA \u05E6\u05D4\u05E8\u05D9\u05D9\u05DD">\u05D0\u05E8\u05D5\u05D7\u05EA \u05E6\u05D4\u05E8\u05D9\u05D9\u05DD</option>
                  <option value="\u05D0\u05E8\u05D5\u05D7\u05EA \u05E6\u05D4\u05E8\u05D9\u05D9\u05DD \u05D0\u05E8\u05D5\u05D6\u05D4">\u05D0\u05E8\u05D5\u05D7\u05EA \u05E6\u05D4\u05E8\u05D9\u05D9\u05DD \u05D0\u05E8\u05D5\u05D6\u05D4</option>
                  <option value="\u05D0\u05E8\u05D5\u05D7\u05EA \u05D1\u05D5\u05E7\u05E8 + \u05E6\u05D4\u05E8\u05D9\u05D9\u05DD">\u05D0\u05E8\u05D5\u05D7\u05EA \u05D1\u05D5\u05E7\u05E8 + \u05E6\u05D4\u05E8\u05D9\u05D9\u05DD</option>
                  <option value="\u05D0\u05E8\u05D5\u05D7\u05EA \u05D1\u05D5\u05E7\u05E8 + \u05E6\u05D4\u05E8\u05D9\u05D9\u05DD + \u05E2\u05E8\u05D1">\u05D1\u05D5\u05E7\u05E8 + \u05E6\u05D4\u05E8\u05D9\u05D9\u05DD + \u05E2\u05E8\u05D1</option>
                  <option value="\u05DC\u05DC\u05D0 \u05D0\u05E8\u05D5\u05D7\u05D5\u05EA">\u05DC\u05DC\u05D0 \u05D0\u05E8\u05D5\u05D7\u05D5\u05EA</option>
                </select>
              </div>
              <div class="col-12">
                <label class="form-label"><i class="bi bi-people me-1"></i>\u05DE\u05E9\u05EA\u05EA\u05E4\u05D9\u05DD (\u05DE\u05E1\u05E4\u05E8)</label>
                <input type="number" class="form-control" id="tf-participants" min="0" placeholder="0">
              </div>
            </div>
          </div>
          <!-- Equipment Tab -->
          <div class="tab-pane fade" id="tf-tab-equipment">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h6 class="fw-bold mb-0"><i class="bi bi-backpack me-1"></i>\u05E8\u05E9\u05D9\u05DE\u05EA \u05E6\u05D9\u05D5\u05D3 \u05E0\u05D3\u05E8\u05E9</h6>
              <button class="btn btn-sm btn-outline-primary" onclick="Pages.addTripEquipmentItem()"><i class="bi bi-plus-lg me-1"></i>\u05D4\u05D5\u05E1\u05E3 \u05E4\u05E8\u05D9\u05D8</button>
            </div>
            <div class="mb-3">
              <div class="btn-group btn-group-sm">
                <button class="btn btn-outline-secondary" onclick="Pages.loadEquipmentPreset('hiking')"><i class="bi bi-signpost-2 me-1"></i>\u05D8\u05D9\u05D5\u05DC \u05E8\u05D2\u05DC\u05D9</button>
                <button class="btn btn-outline-secondary" onclick="Pages.loadEquipmentPreset('water')"><i class="bi bi-water me-1"></i>\u05D8\u05D9\u05D5\u05DC \u05DE\u05D9\u05DD</button>
                <button class="btn btn-outline-secondary" onclick="Pages.loadEquipmentPreset('overnight')"><i class="bi bi-moon-stars me-1"></i>\u05DC\u05D9\u05E0\u05D4</button>
                <button class="btn btn-outline-secondary" onclick="Pages.loadEquipmentPreset('basic')"><i class="bi bi-bag me-1"></i>\u05D1\u05E1\u05D9\u05E1\u05D9</button>
              </div>
            </div>
            <div id="tf-equipment-list">
              <div class="text-center text-muted py-4"><i class="bi bi-backpack fs-1 d-block mb-2"></i>\u05DC\u05D7\u05E5 "\u05D4\u05D5\u05E1\u05E3 \u05E4\u05E8\u05D9\u05D8" \u05D0\u05D5 \u05D1\u05D7\u05E8 \u05EA\u05D1\u05E0\u05D9\u05EA \u05DE\u05D5\u05DB\u05E0\u05D4</div>
            </div>
          </div>
          <!-- Emergency Contacts Tab -->
          <div class="tab-pane fade" id="tf-tab-emergency">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h6 class="fw-bold mb-0"><i class="bi bi-telephone-fill me-1"></i>\u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8 \u05DC\u05D7\u05D9\u05E8\u05D5\u05DD</h6>
              <button class="btn btn-sm btn-outline-primary" onclick="Pages.addTripEmergencyContact()"><i class="bi bi-plus-lg me-1"></i>\u05D4\u05D5\u05E1\u05E3 \u05D0\u05D9\u05E9 \u05E7\u05E9\u05E8</button>
            </div>
            <div class="alert alert-info small mb-3">
              <i class="bi bi-info-circle me-1"></i>\u05D4\u05D5\u05E1\u05E3 \u05DE\u05E1\u05E4\u05E8\u05D9 \u05D8\u05DC\u05E4\u05D5\u05DF \u05DC\u05D7\u05D9\u05E8\u05D5\u05DD: \u05DE\u05DC\u05D5\u05D5\u05D4, \u05D0\u05D7\u05E8\u05D0\u05D9, \u05DE\u05D3"\u05D0, \u05D4\u05E0\u05D4\u05DC\u05EA \u05D4\u05DE\u05D5\u05E1\u05D3
            </div>
            <div id="tf-emergency-list">
              <div class="text-center text-muted py-4"><i class="bi bi-telephone fs-1 d-block mb-2"></i>\u05D0\u05D9\u05DF \u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8 \u05E2\u05D3\u05D9\u05D9\u05DF</div>
            </div>
          </div>
          <div class="tab-pane fade" id="tf-tab-budget">
            <div class="row g-3">
              <div class="col-md-6"><label class="form-label">\u05E2\u05DC\u05D5\u05EA \u05DC\u05EA\u05DC\u05DE\u05D9\u05D3 (\u20AA)</label><input type="number" class="form-control" id="tf-cost" min="0" step="5" placeholder="0"></div>
              <div class="col-md-6">
                <label class="form-label">\u05E2\u05DC\u05D5\u05EA \u05DB\u05D5\u05DC\u05DC\u05EA \u05DE\u05D7\u05D5\u05E9\u05D1\u05EA</label>
                <div class="form-control bg-light" id="tf-total-calc">\u20AA0</div>
              </div>
              <div class="col-md-6"><label class="form-label">\u05EA\u05E9\u05DC\u05D5\u05DD \u05E9\u05E0\u05D2\u05D1\u05D4 (\u20AA)</label><input type="number" class="form-control" id="tf-paid" min="0" step="10" placeholder="0"></div>
              <div class="col-md-6">
                <label class="form-label">\u05D9\u05EA\u05E8\u05D4</label>
                <div class="form-control bg-light" id="tf-remaining-calc">\u20AA0</div>
              </div>
            </div>
            <div class="mt-3 p-3 bg-light rounded">
              <small class="text-muted"><i class="bi bi-info-circle me-1"></i>\u05D4\u05E2\u05DC\u05D5\u05EA \u05D4\u05DB\u05D5\u05DC\u05DC\u05EA \u05DE\u05D7\u05D5\u05E9\u05D1\u05EA \u05D0\u05D5\u05D8\u05D5\u05DE\u05D8\u05D9\u05EA: \u05E2\u05DC\u05D5\u05EA \u05DC\u05EA\u05DC\u05DE\u05D9\u05D3 x \u05DE\u05E1\u05E4\u05E8 \u05DE\u05E9\u05EA\u05EA\u05E4\u05D9\u05DD</small>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button>
        <button class="btn btn-primary" onclick="Pages.saveTrip()"><i class="bi bi-check-lg me-1"></i>\u05E9\u05DE\u05D5\u05E8</button>
      </div>
    </div></div></div>

    <!-- Participants Modal -->
    <div class="modal fade" id="trip-participants-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
      <div class="modal-header bg-info text-white">
        <h5 class="modal-title"><i class="bi bi-people me-2"></i>\u05E0\u05D9\u05D4\u05D5\u05DC \u05DE\u05E9\u05EA\u05EA\u05E4\u05D9\u05DD</h5>
        <button class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h6 class="mb-0" id="trip-part-title"></h6>
          <div class="d-flex gap-2">
            <span class="badge bg-success" id="trip-part-approved">0 \u05D0\u05D9\u05E9\u05D5\u05E8\u05D9\u05DD</span>
            <span class="badge bg-warning" id="trip-part-pending">0 \u05DE\u05DE\u05EA\u05D9\u05E0\u05D9\u05DD</span>
          </div>
        </div>
        <div class="progress mb-3" style="height:8px">
          <div class="progress-bar bg-success" id="trip-part-progress" style="width:0%"></div>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text"><i class="bi bi-search"></i></span>
          <input type="search" class="form-control" id="trip-part-search" placeholder="\u05D7\u05E4\u05E9 \u05EA\u05DC\u05DE\u05D9\u05D3..." oninput="Pages.filterTripParticipants()">
        </div>
        <div class="list-group" id="trip-part-list"></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">\u05E1\u05D2\u05D5\u05E8</button>
      </div>
    </div></div></div>

    <!-- Trip Checklist Modal (auto-generated from students) -->
    <div class="modal fade" id="trip-checklist-modal" tabindex="-1"><div class="modal-dialog modal-fullscreen"><div class="modal-content">
      <div class="modal-header bg-success text-white">
        <h5 class="modal-title"><i class="bi bi-list-check me-2"></i>\u05E6\u05D9\u05E7\u05DC\u05D9\u05E1\u05D8 \u05D8\u05D9\u05D5\u05DC</h5>
        <div class="d-flex gap-2 align-items-center">
          <span class="badge bg-light text-dark" id="trip-cl-name"></span>
          <button class="btn btn-sm btn-outline-light" onclick="Pages.printTripList()"><i class="bi bi-printer me-1"></i>\u05D4\u05D3\u05E4\u05E1\u05D4</button>
          <button class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
      </div>
      <div class="modal-body">
        <!-- Checklist stats -->
        <div class="row g-3 mb-4" id="trip-cl-stats"></div>
        <!-- Filter -->
        <div class="card p-3 mb-3">
          <div class="row g-2 align-items-end">
            <div class="col-md-4">
              <input type="search" class="form-control form-control-sm" id="trip-cl-search" placeholder="\u05D7\u05E4\u05E9 \u05EA\u05DC\u05DE\u05D9\u05D3..." oninput="Pages.filterTripChecklist()">
            </div>
            <div class="col-md-3">
              <select class="form-select form-select-sm" id="trip-cl-filter-perm" onchange="Pages.filterTripChecklist()">
                <option value="">\u05DB\u05DC \u05D4\u05D0\u05D9\u05E9\u05D5\u05E8\u05D9\u05DD</option>
                <option value="signed">\u05D7\u05EA\u05D5\u05DD</option>
                <option value="pending">\u05DE\u05DE\u05EA\u05D9\u05DF</option>
              </select>
            </div>
            <div class="col-md-3">
              <select class="form-select form-select-sm" id="trip-cl-filter-pay" onchange="Pages.filterTripChecklist()">
                <option value="">\u05DB\u05DC \u05D4\u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD</option>
                <option value="paid">\u05E9\u05D5\u05DC\u05DD</option>
                <option value="unpaid">\u05DC\u05D0 \u05E9\u05D5\u05DC\u05DD</option>
              </select>
            </div>
            <div class="col-md-2">
              <button class="btn btn-outline-secondary btn-sm w-100" onclick="Pages.resetTripChecklistFilters()"><i class="bi bi-x-lg me-1"></i>\u05E0\u05E7\u05D4</button>
            </div>
          </div>
        </div>
        <!-- Checklist table -->
        <div class="table-responsive" id="trip-cl-table-wrap"></div>
      </div>
    </div></div></div>`;
  },

  _tripData: [],
  _tripEditId: null,
  _tripView: 'cards',
  _tripParticipants: {},

  _tripUseDemo: false,

  tripLoadDemo() {
    this._tripUseDemo = true;
    this._tripData = this._tripDemoData;
    this._updateTripStats();
    this.renderTrips();
    this._renderTripBudget();
    Utils.toast('\u05E0\u05D8\u05E2\u05E0\u05D5 \u05E0\u05EA\u05D5\u05E0\u05D9 \u05D3\u05DE\u05D5', 'info');
  },

  tripsInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    let data = _gc('\u05D8\u05D9\u05D5\u05DC\u05D9\u05DD');
    if (!data || !data.length) data = this._tripUseDemo ? this._tripDemoData : [];
    this._tripData = data;
    this._updateTripStats();
    this.renderTrips();
    this._renderTripBudget();
    this._setupTripBudgetCalc();
  },

  _updateTripStats() {
    const data = this._tripData;
    const today = new Date().toISOString().slice(0, 10);
    const total = data.length;
    const completed = data.filter(t => t['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D1\u05D5\u05E6\u05E2').length;
    const upcoming = data.filter(t => t['\u05E1\u05D8\u05D8\u05D5\u05E1'] !== '\u05D1\u05D5\u05E6\u05E2' && t['\u05E1\u05D8\u05D8\u05D5\u05E1'] !== '\u05D1\u05D5\u05D8\u05DC').length;
    const totalSpent = data.reduce((s, t) => {
      const cost = Number(t['\u05E2\u05DC\u05D5\u05EA_\u05DC\u05EA\u05DC\u05DE\u05D9\u05D3'] || 0);
      const parts = Number(t['\u05DE\u05E9\u05EA\u05EA\u05E4\u05D9\u05DD'] || 0);
      return s + (cost * parts);
    }, 0);

    const el = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
    el('trip-stat-total', total);
    el('trip-stat-upcoming', upcoming);
    el('trip-stat-completed', completed);
    el('trip-stat-spent', '\u20AA' + totalSpent.toLocaleString());
  },

  _getFilteredTrips() {
    let data = [...this._tripData];
    const statusFilter = document.getElementById('trip-filter-status')?.value || '';
    const classFilter = document.getElementById('trip-filter-class')?.value || '';
    const search = (document.getElementById('trip-search')?.value || '').trim().toLowerCase();

    if (statusFilter) data = data.filter(t => t['\u05E1\u05D8\u05D8\u05D5\u05E1'] === statusFilter);
    if (classFilter) data = data.filter(t => (t['\u05DB\u05D9\u05EA\u05D4'] || '').includes(classFilter));
    if (search) data = data.filter(t => (t['\u05D9\u05E2\u05D3'] || '').toLowerCase().includes(search) || (t['\u05EA\u05D9\u05D0\u05D5\u05E8'] || '').toLowerCase().includes(search));
    return data;
  },

  resetTripFilters() {
    const el = id => document.getElementById(id);
    if (el('trip-filter-status')) el('trip-filter-status').value = '';
    if (el('trip-filter-class')) el('trip-filter-class').value = '';
    if (el('trip-search')) el('trip-search').value = '';
    this.renderTrips();
  },

  setTripView(view) {
    this._tripView = view;
    document.querySelectorAll('#trip-view-toggle .btn').forEach(b => b.classList.remove('active'));
    const idx = { cards: 0, timeline: 1, gallery: 2 }[view] || 0;
    document.querySelectorAll('#trip-view-toggle .btn')[idx]?.classList.add('active');
    this.renderTrips();
  },

  renderTrips() {
    const data = this._getFilteredTrips();
    const container = document.getElementById('trip-cards');
    if (!container) return;

    if (!data.length) {
      const hasActiveFilter = (document.getElementById('trip-filter-status')?.value || document.getElementById('trip-filter-class')?.value || (document.getElementById('trip-search')?.value || '').trim());
      container.innerHTML = hasActiveFilter
        ? '<div class="empty-state text-center py-5"><i class="bi bi-geo-alt fs-1 text-muted"></i><h5 class="mt-3">\u05D0\u05D9\u05DF \u05D8\u05D9\u05D5\u05DC\u05D9\u05DD \u05EA\u05D5\u05D0\u05DE\u05D9\u05DD \u05DC\u05D7\u05D9\u05E4\u05D5\u05E9</h5><p class="text-muted">\u05E0\u05E1\u05D4 \u05DC\u05E9\u05E0\u05D5\u05EA \u05D0\u05EA \u05D4\u05E1\u05D9\u05E0\u05D5\u05DF</p></div>'
        : '<div class="empty-state text-center py-5"><i class="bi bi-geo-alt fs-1 text-muted"></i><h5 class="mt-3">\u05D0\u05D9\u05DF \u05D8\u05D9\u05D5\u05DC\u05D9\u05DD \u05E2\u05D3\u05D9\u05D9\u05DF</h5><p class="text-muted">\u05DC\u05D7\u05E5 "\u05D8\u05D9\u05D5\u05DC \u05D7\u05D3\u05E9" \u05DC\u05D4\u05D5\u05E1\u05E4\u05D4</p></div>';
      return;
    }

    if (this._tripView === 'timeline') {
      this._renderTripTimeline(data, container);
    } else if (this._tripView === 'gallery') {
      this._renderTripGallery(data, container);
    } else {
      this._renderTripCards(data, container);
    }
  },

  _renderTripCards(data, container) {
    const stC = {'\u05DE\u05EA\u05D5\u05DB\u05E0\u05DF':'primary','\u05D0\u05D5\u05E9\u05E8':'success','\u05D1\u05D5\u05E6\u05E2':'info','\u05D1\u05D5\u05D8\u05DC':'danger'};
    const stI = {'\u05DE\u05EA\u05D5\u05DB\u05E0\u05DF':'bi-hourglass-split','\u05D0\u05D5\u05E9\u05E8':'bi-check-circle','\u05D1\u05D5\u05E6\u05E2':'bi-trophy','\u05D1\u05D5\u05D8\u05DC':'bi-x-circle'};
    const today = new Date().toISOString().slice(0, 10);

    container.innerHTML = '<div class="row g-3">' + data.map(t => {
      const tId = t.id || t['\u05DE\u05D6\u05D4\u05D4'] || Utils.rowId(t);
      const status = t['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '\u05DE\u05EA\u05D5\u05DB\u05E0\u05DF';
      const color = stC[status] || 'secondary';
      const icon = stI[status] || 'bi-geo-alt';
      const cost = Number(t['\u05E2\u05DC\u05D5\u05EA_\u05DC\u05EA\u05DC\u05DE\u05D9\u05D3'] || 0);
      const parts = Number(t['\u05DE\u05E9\u05EA\u05EA\u05E4\u05D9\u05DD'] || 0);
      const approved = Number(t['\u05D0\u05D9\u05E9\u05D5\u05E8\u05D9\u05DD'] || 0);
      const totalCost = cost * parts;
      const paid = Number(t['\u05EA\u05E9\u05DC\u05D5\u05DD'] || 0);
      const paidPct = totalCost > 0 ? Math.round((paid / totalCost) * 100) : 0;
      const permPct = parts > 0 ? Math.round((approved / parts) * 100) : 0;
      const startDate = t['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05EA\u05D7\u05DC\u05D4'] || '';
      const endDate = t['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05E1\u05D9\u05D5\u05DD'] || '';
      const daysUntil = startDate ? Math.ceil((new Date(startDate) - new Date()) / 86400000) : null;
      const daysLabel = daysUntil !== null && daysUntil > 0 ? `<span class="badge bg-warning text-dark">\u05D1\u05E2\u05D5\u05D3 ${daysUntil} \u05D9\u05DE\u05D9\u05DD</span>` : '';

      return `<div class="col-md-6">
        <div class="card h-100 border-start border-4 border-${color}" style="transition:transform .15s" onmouseenter="this.style.transform='translateY(-2px)'" onmouseleave="this.style.transform=''">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="fw-bold mb-1"><i class="bi bi-geo-alt-fill text-${color} me-1"></i>${t['\u05D9\u05E2\u05D3'] || ''}</h6>
                <div class="d-flex flex-wrap gap-1 mb-1">
                  <span class="badge bg-${color}"><i class="bi ${icon} me-1"></i>${status}</span>
                  ${t['\u05DB\u05D9\u05EA\u05D4'] ? `<span class="badge bg-secondary">\u05DB\u05D9\u05EA\u05D4 ${t['\u05DB\u05D9\u05EA\u05D4']}</span>` : ''}
                  ${daysLabel}
                </div>
              </div>
              <div class="dropdown">
                <button class="btn btn-sm btn-light" data-bs-toggle="dropdown"><i class="bi bi-three-dots-vertical"></i></button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><a class="dropdown-item" href="#" onclick="Pages.editTrip('${tId}');return false"><i class="bi bi-pencil me-2"></i>\u05E2\u05E8\u05D9\u05DB\u05D4</a></li>
                  <li><a class="dropdown-item" href="#" onclick="Pages.showTripParticipants('${tId}');return false"><i class="bi bi-people me-2"></i>\u05DE\u05E9\u05EA\u05EA\u05E4\u05D9\u05DD</a></li>
                  <li><a class="dropdown-item" href="#" onclick="Pages.showTripChecklist('${tId}');return false"><i class="bi bi-list-check me-2"></i>\u05E6\u05D9\u05E7\u05DC\u05D9\u05E1\u05D8</a></li>
                  <li><a class="dropdown-item" href="#" onclick="Pages.printTripList('${tId}');return false"><i class="bi bi-printer me-2"></i>\u05D4\u05D3\u05E4\u05E1\u05D4</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item text-danger" href="#" onclick="Pages.deleteTrip('${tId}');return false"><i class="bi bi-trash me-2"></i>\u05DE\u05D7\u05D9\u05E7\u05D4</a></li>
                </ul>
              </div>
            </div>

            <div class="row g-2 mb-2">
              <div class="col-6"><small class="text-muted"><i class="bi bi-calendar me-1"></i>${startDate}${endDate && endDate !== startDate ? ' - ' + endDate : ''}</small></div>
              <div class="col-6 text-end"><small class="text-muted"><i class="bi bi-bus-front me-1"></i>${t['\u05D4\u05E1\u05E2\u05D4'] || '--'}</small></div>
            </div>

            ${t['\u05EA\u05D9\u05D0\u05D5\u05E8'] ? `<p class="small text-muted mb-2">${t['\u05EA\u05D9\u05D0\u05D5\u05E8']}</p>` : ''}

            <div class="row g-2 mb-2">
              <div class="col-4 text-center">
                <div class="border rounded p-2"><div class="fw-bold text-primary">${parts}</div><small class="text-muted">\u05DE\u05E9\u05EA\u05EA\u05E4\u05D9\u05DD</small></div>
              </div>
              <div class="col-4 text-center">
                <div class="border rounded p-2"><div class="fw-bold text-success">\u20AA${cost}</div><small class="text-muted">\u05DC\u05EA\u05DC\u05DE\u05D9\u05D3</small></div>
              </div>
              <div class="col-4 text-center">
                <div class="border rounded p-2"><div class="fw-bold text-warning">\u20AA${totalCost.toLocaleString()}</div><small class="text-muted">\u05E1\u05D4"\u05DB</small></div>
              </div>
            </div>

            <!-- Permission slips progress -->
            <div class="mb-2">
              <div class="d-flex justify-content-between mb-1">
                <small>\u05D0\u05D9\u05E9\u05D5\u05E8\u05D9 \u05D4\u05D5\u05E8\u05D9\u05DD</small>
                <small class="fw-bold">${approved}/${parts} (${permPct}%)</small>
              </div>
              <div class="progress" style="height:6px">
                <div class="progress-bar bg-success" style="width:${permPct}%"></div>
              </div>
            </div>

            <!-- Payment progress -->
            <div>
              <div class="d-flex justify-content-between mb-1">
                <small>\u05EA\u05E9\u05DC\u05D5\u05DD</small>
                <small class="fw-bold">\u20AA${paid.toLocaleString()} / \u20AA${totalCost.toLocaleString()} (${paidPct}%)</small>
              </div>
              <div class="progress" style="height:6px">
                <div class="progress-bar bg-warning" style="width:${paidPct}%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    }).join('') + '</div>';
  },

  _renderTripTimeline(data, container) {
    const sorted = [...data].sort((a, b) => (a['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05EA\u05D7\u05DC\u05D4'] || '').localeCompare(b['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05EA\u05D7\u05DC\u05D4'] || ''));
    const stC = {'\u05DE\u05EA\u05D5\u05DB\u05E0\u05DF':'primary','\u05D0\u05D5\u05E9\u05E8':'success','\u05D1\u05D5\u05E6\u05E2':'info','\u05D1\u05D5\u05D8\u05DC':'danger'};
    const today = new Date().toISOString().slice(0, 10);

    container.innerHTML = `
    <div class="position-relative" style="padding-right:30px">
      <div class="position-absolute" style="right:14px;top:0;bottom:0;width:3px;background:linear-gradient(to bottom,var(--bs-primary),var(--bs-info))"></div>
      ${sorted.map(t => {
        const tId = t.id || t['\u05DE\u05D6\u05D4\u05D4'] || Utils.rowId(t);
        const status = t['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '';
        const color = stC[status] || 'secondary';
        const startDate = t['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05EA\u05D7\u05DC\u05D4'] || '';
        const isPast = startDate < today;
        const cost = Number(t['\u05E2\u05DC\u05D5\u05EA_\u05DC\u05EA\u05DC\u05DE\u05D9\u05D3'] || 0);
        const parts = Number(t['\u05DE\u05E9\u05EA\u05EA\u05E4\u05D9\u05DD'] || 0);

        return `<div class="d-flex align-items-start mb-4 ${isPast ? 'opacity-75' : ''}">
          <div class="flex-grow-1">
            <div class="card border-${color}">
              <div class="card-body p-3">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <h6 class="fw-bold mb-0"><i class="bi bi-geo-alt-fill text-${color} me-1"></i>${t['\u05D9\u05E2\u05D3'] || ''}</h6>
                  <span class="badge bg-${color}">${status}</span>
                </div>
                <div class="d-flex gap-3 small text-muted">
                  <span><i class="bi bi-calendar me-1"></i>${startDate}</span>
                  ${t['\u05DB\u05D9\u05EA\u05D4'] ? `<span><i class="bi bi-easel me-1"></i>\u05DB\u05D9\u05EA\u05D4 ${t['\u05DB\u05D9\u05EA\u05D4']}</span>` : ''}
                  <span><i class="bi bi-people me-1"></i>${parts} \u05DE\u05E9\u05EA\u05EA\u05E4\u05D9\u05DD</span>
                  <span><i class="bi bi-cash me-1"></i>\u20AA${(cost * parts).toLocaleString()}</span>
                </div>
                ${t['\u05EA\u05D9\u05D0\u05D5\u05E8'] ? `<p class="small mb-0 mt-1">${t['\u05EA\u05D9\u05D0\u05D5\u05E8']}</p>` : ''}
              </div>
            </div>
          </div>
          <div class="position-relative d-flex flex-column align-items-center" style="width:30px;flex-shrink:0">
            <div class="rounded-circle bg-${color} border border-3 border-white" style="width:16px;height:16px;z-index:1"></div>
          </div>
        </div>`;
      }).join('')}
    </div>`;
  },

  _renderTripGallery(data, container) {
    const completed = data.filter(t => t['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D1\u05D5\u05E6\u05E2');
    const upcoming = data.filter(t => t['\u05E1\u05D8\u05D8\u05D5\u05E1'] !== '\u05D1\u05D5\u05E6\u05E2' && t['\u05E1\u05D8\u05D8\u05D5\u05E1'] !== '\u05D1\u05D5\u05D8\u05DC');

    const starRating = (rating) => {
      const r = Number(rating) || 0;
      let html = '';
      for (let i = 1; i <= 5; i++) {
        html += `<i class="bi bi-star${i <= r ? '-fill text-warning' : ' text-muted'}"></i>`;
      }
      return html;
    };

    const galleryCard = (t, isPast) => {
      const tId = t.id || t['\u05DE\u05D6\u05D4\u05D4'] || Utils.rowId(t);
      const cost = Number(t['\u05E2\u05DC\u05D5\u05EA_\u05DC\u05EA\u05DC\u05DE\u05D9\u05D3'] || 0);
      const parts = Number(t['\u05DE\u05E9\u05EA\u05EA\u05E4\u05D9\u05DD'] || 0);
      const colors = ['#667eea', '#764ba2', '#43e97b', '#fa709a', '#a18cd1', '#fbc2eb', '#fccb90', '#84fab0'];
      const bgColor = colors[Math.abs((t['\u05D9\u05E2\u05D3'] || '').length) % colors.length];

      return `<div class="col-md-4 col-sm-6">
        <div class="card h-100 overflow-hidden">
          <div class="position-relative" style="height:140px;background:linear-gradient(135deg,${bgColor},${bgColor}88);display:flex;align-items:center;justify-content:center">
            <i class="bi bi-geo-alt-fill" style="font-size:3rem;color:rgba(255,255,255,.5)"></i>
            <div class="position-absolute bottom-0 start-0 end-0 p-2" style="background:linear-gradient(transparent,rgba(0,0,0,.6))">
              <h6 class="text-white mb-0 fw-bold">${t['\u05D9\u05E2\u05D3'] || ''}</h6>
            </div>
          </div>
          <div class="card-body p-3">
            <div class="d-flex justify-content-between mb-2">
              <small class="text-muted"><i class="bi bi-calendar me-1"></i>${t['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05EA\u05D7\u05DC\u05D4'] || ''}</small>
              ${t['\u05DB\u05D9\u05EA\u05D4'] ? `<span class="badge bg-secondary">\u05DB\u05D9\u05EA\u05D4 ${t['\u05DB\u05D9\u05EA\u05D4']}</span>` : ''}
            </div>
            ${t['\u05EA\u05D9\u05D0\u05D5\u05E8'] ? `<p class="small text-muted mb-2">${t['\u05EA\u05D9\u05D0\u05D5\u05E8']}</p>` : ''}
            <div class="d-flex justify-content-between align-items-center">
              <small><i class="bi bi-people me-1"></i>${parts} \u05DE\u05E9\u05EA\u05EA\u05E4\u05D9\u05DD</small>
              <small class="fw-bold text-primary">\u20AA${(cost * parts).toLocaleString()}</small>
            </div>
            ${isPast ? `<div class="mt-2 text-center">${starRating(t['\u05D3\u05D9\u05E8\u05D5\u05D2'])}</div>` : ''}
          </div>
        </div>
      </div>`;
    };

    let html = '';
    if (upcoming.length) {
      html += `<h5 class="fw-bold mb-3"><i class="bi bi-calendar-event text-primary me-2"></i>\u05D8\u05D9\u05D5\u05DC\u05D9\u05DD \u05E7\u05E8\u05D5\u05D1\u05D9\u05DD</h5>
        <div class="row g-3 mb-4">${upcoming.map(t => galleryCard(t, false)).join('')}</div>`;
    }
    if (completed.length) {
      html += `<h5 class="fw-bold mb-3"><i class="bi bi-trophy text-success me-2"></i>\u05D8\u05D9\u05D5\u05DC\u05D9\u05DD \u05E9\u05D1\u05D5\u05E6\u05E2\u05D5</h5>
        <div class="row g-3">${completed.map(t => galleryCard(t, true)).join('')}</div>`;
    }
    container.innerHTML = html;
  },

  _renderTripBudget() {
    const el = document.getElementById('trip-budget-content');
    if (!el) return;
    const data = this._tripData;

    const totalBudget = data.reduce((s, t) => s + (Number(t['\u05E2\u05DC\u05D5\u05EA_\u05DC\u05EA\u05DC\u05DE\u05D9\u05D3'] || 0) * Number(t['\u05DE\u05E9\u05EA\u05EA\u05E4\u05D9\u05DD'] || 0)), 0);
    const totalPaid = data.reduce((s, t) => s + Number(t['\u05EA\u05E9\u05DC\u05D5\u05DD'] || 0), 0);
    const totalRemaining = totalBudget - totalPaid;
    const paidPct = totalBudget > 0 ? Math.round((totalPaid / totalBudget) * 100) : 0;

    el.innerHTML = `
      <div class="col-md-4">
        <div class="text-center">
          <div class="fs-4 fw-bold text-primary">\u20AA${totalBudget.toLocaleString()}</div>
          <small class="text-muted">\u05EA\u05E7\u05E6\u05D9\u05D1 \u05DB\u05D5\u05DC\u05DC</small>
        </div>
      </div>
      <div class="col-md-4">
        <div class="text-center">
          <div class="fs-4 fw-bold text-success">\u20AA${totalPaid.toLocaleString()}</div>
          <small class="text-muted">\u05E0\u05D2\u05D1\u05D4</small>
        </div>
      </div>
      <div class="col-md-4">
        <div class="text-center">
          <div class="fs-4 fw-bold text-danger">\u20AA${totalRemaining.toLocaleString()}</div>
          <small class="text-muted">\u05D9\u05EA\u05E8\u05D4 \u05DC\u05D2\u05D1\u05D9\u05D9\u05D4</small>
        </div>
      </div>
      <div class="col-12">
        <div class="d-flex justify-content-between mb-1">
          <small>\u05D4\u05EA\u05E7\u05D3\u05DE\u05D5\u05EA \u05D2\u05D1\u05D9\u05D9\u05D4</small>
          <small class="fw-bold">${paidPct}%</small>
        </div>
        <div class="progress" style="height:10px">
          <div class="progress-bar bg-success" style="width:${paidPct}%"></div>
        </div>
      </div>
      <div class="col-12 mt-2">
        <table class="table table-sm table-hover mb-0">
          <thead><tr><th>\u05D8\u05D9\u05D5\u05DC</th><th>\u05DE\u05E9\u05EA\u05EA\u05E4\u05D9\u05DD</th><th>\u05E2\u05DC\u05D5\u05EA \u05DB\u05D5\u05DC\u05DC\u05EA</th><th>\u05E0\u05D2\u05D1\u05D4</th><th>\u05D9\u05EA\u05E8\u05D4</th></tr></thead>
          <tbody>${data.map(t => {
            const cost = Number(t['\u05E2\u05DC\u05D5\u05EA_\u05DC\u05EA\u05DC\u05DE\u05D9\u05D3'] || 0) * Number(t['\u05DE\u05E9\u05EA\u05EA\u05E4\u05D9\u05DD'] || 0);
            const paid = Number(t['\u05EA\u05E9\u05DC\u05D5\u05DD'] || 0);
            const rem = cost - paid;
            return `<tr>
              <td class="fw-bold">${t['\u05D9\u05E2\u05D3'] || ''}</td>
              <td>${t['\u05DE\u05E9\u05EA\u05EA\u05E4\u05D9\u05DD'] || 0}</td>
              <td>\u20AA${cost.toLocaleString()}</td>
              <td class="text-success">\u20AA${paid.toLocaleString()}</td>
              <td class="${rem > 0 ? 'text-danger' : 'text-success'}">\u20AA${rem.toLocaleString()}</td>
            </tr>`;
          }).join('')}</tbody>
        </table>
      </div>`;
  },

  _setupTripBudgetCalc() {
    const costEl = document.getElementById('tf-cost');
    const partEl = document.getElementById('tf-participants');
    const paidEl = document.getElementById('tf-paid');
    const calcTotal = () => {
      const c = Number(costEl?.value || 0);
      const p = Number(partEl?.value || 0);
      const paid = Number(paidEl?.value || 0);
      const total = c * p;
      const totalEl = document.getElementById('tf-total-calc');
      const remEl = document.getElementById('tf-remaining-calc');
      if (totalEl) totalEl.textContent = '\u20AA' + total.toLocaleString();
      if (remEl) remEl.textContent = '\u20AA' + (total - paid).toLocaleString();
    };
    costEl?.addEventListener('input', calcTotal);
    partEl?.addEventListener('input', calcTotal);
    paidEl?.addEventListener('input', calcTotal);
  },

  showAddTrip() {
    this._tripEditId = null;
    this._tripFormSchedule = [];
    this._tripFormEquipment = [];
    this._tripFormEmergency = [];
    document.getElementById('tf-dest').value = '';
    document.getElementById('tf-class').value = '';
    document.getElementById('tf-start').value = '';
    document.getElementById('tf-end').value = '';
    document.getElementById('tf-desc').value = '';
    document.getElementById('tf-status').value = '\u05DE\u05EA\u05D5\u05DB\u05E0\u05DF';
    document.getElementById('tf-transport').value = '\u05D0\u05D5\u05D8\u05D5\u05D1\u05D5\u05E1';
    document.getElementById('tf-meals').value = '\u05D0\u05E8\u05D5\u05D7\u05EA \u05E6\u05D4\u05E8\u05D9\u05D9\u05DD';
    document.getElementById('tf-participants').value = '';
    document.getElementById('tf-cost').value = '';
    document.getElementById('tf-paid').value = '';
    document.getElementById('tf-total-calc').textContent = '\u20AA0';
    document.getElementById('tf-remaining-calc').textContent = '\u20AA0';
    this._renderTripScheduleList();
    this._renderTripEquipmentList();
    this._renderTripEmergencyList();
    document.querySelector('#trip-modal .modal-title').innerHTML = '<i class="bi bi-geo-alt me-2"></i>\u05D8\u05D9\u05D5\u05DC \u05D7\u05D3\u05E9';
    // Reset to first tab
    const firstTab = document.querySelector('#trip-form-tabs .nav-link');
    if (firstTab) new bootstrap.Tab(firstTab).show();
    new bootstrap.Modal(document.getElementById('trip-modal')).show();
  },

  async saveTrip() {
    const row = {
      '\u05D9\u05E2\u05D3': document.getElementById('tf-dest').value.trim(),
      '\u05DB\u05D9\u05EA\u05D4': document.getElementById('tf-class').value,
      '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05EA\u05D7\u05DC\u05D4': document.getElementById('tf-start').value,
      '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05E1\u05D9\u05D5\u05DD': document.getElementById('tf-end').value,
      '\u05EA\u05D9\u05D0\u05D5\u05E8': document.getElementById('tf-desc').value.trim(),
      '\u05E1\u05D8\u05D8\u05D5\u05E1': document.getElementById('tf-status').value,
      '\u05D4\u05E1\u05E2\u05D4': document.getElementById('tf-transport').value,
      '\u05D0\u05E8\u05D5\u05D7\u05D5\u05EA': document.getElementById('tf-meals').value,
      '\u05DE\u05E9\u05EA\u05EA\u05E4\u05D9\u05DD': Number(document.getElementById('tf-participants').value) || 0,
      '\u05E2\u05DC\u05D5\u05EA_\u05DC\u05EA\u05DC\u05DE\u05D9\u05D3': Number(document.getElementById('tf-cost').value) || 0,
      '\u05EA\u05E9\u05DC\u05D5\u05DD': Number(document.getElementById('tf-paid').value) || 0,
      '\u05D0\u05D9\u05E9\u05D5\u05E8\u05D9\u05DD': 0,
      '\u05DC\u05D5\u05D7_\u05D6\u05DE\u05E0\u05D9\u05DD': JSON.stringify(this._tripFormSchedule || []),
      '\u05E6\u05D9\u05D5\u05D3': JSON.stringify(this._tripFormEquipment || []),
      '\u05D0\u05E0\u05E9\u05D9_\u05E7\u05E9\u05E8_\u05D7\u05D9\u05E8\u05D5\u05DD': JSON.stringify(this._tripFormEmergency || [])
    };
    if (!row['\u05D9\u05E2\u05D3']) { Utils.toast('\u05D7\u05E1\u05E8 \u05D9\u05E2\u05D3', 'warning'); return; }
    try {
      if (this._tripEditId) {
        await App.apiCall('update', '\u05D8\u05D9\u05D5\u05DC\u05D9\u05DD', { id: this._tripEditId, row });
        this._tripEditId = null;
      } else {
        await App.apiCall('add', '\u05D8\u05D9\u05D5\u05DC\u05D9\u05DD', { row });
      }
      bootstrap.Modal.getInstance(document.getElementById('trip-modal')).hide();
      Utils.toast('\u05E0\u05E9\u05DE\u05E8');
      this.tripsInit();
    } catch (e) {
      // If API fails (demo mode), update local data
      if (this._tripEditId) {
        const idx = this._tripData.findIndex(t => (t.id || Utils.rowId(t)) == this._tripEditId);
        if (idx >= 0) Object.assign(this._tripData[idx], row);
        this._tripEditId = null;
      } else {
        row.id = 't' + Date.now();
        this._tripData.push(row);
      }
      bootstrap.Modal.getInstance(document.getElementById('trip-modal'))?.hide();
      Utils.toast('\u05E0\u05E9\u05DE\u05E8 (\u05DE\u05E7\u05D5\u05DE\u05D9)');
      this._updateTripStats();
      this.renderTrips();
      this._renderTripBudget();
    }
  },

  async deleteTrip(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4', '\u05DC\u05DE\u05D7\u05D5\u05E7 \u05D8\u05D9\u05D5\u05DC \u05D6\u05D4?')) return;
    try {
      await App.apiCall('delete', '\u05D8\u05D9\u05D5\u05DC\u05D9\u05DD', { id });
      Utils.toast('\u05E0\u05DE\u05D7\u05E7');
      this.tripsInit();
    } catch (e) {
      // Demo mode fallback
      this._tripData = this._tripData.filter(t => (t.id || Utils.rowId(t)) != id);
      Utils.toast('\u05E0\u05DE\u05D7\u05E7');
      this._updateTripStats();
      this.renderTrips();
      this._renderTripBudget();
    }
  },

  editTrip(id) {
    const item = this._tripData.find(r => String(r.id || r['\u05DE\u05D6\u05D4\u05D4'] || Utils.rowId(r)) === String(id));
    if (!item) return;
    this._tripEditId = id;
    document.getElementById('tf-dest').value = item['\u05D9\u05E2\u05D3'] || '';
    document.getElementById('tf-class').value = item['\u05DB\u05D9\u05EA\u05D4'] || '';
    document.getElementById('tf-start').value = item['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05EA\u05D7\u05DC\u05D4'] || '';
    document.getElementById('tf-end').value = item['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05E1\u05D9\u05D5\u05DD'] || '';
    document.getElementById('tf-desc').value = item['\u05EA\u05D9\u05D0\u05D5\u05E8'] || '';
    document.getElementById('tf-status').value = item['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '\u05DE\u05EA\u05D5\u05DB\u05E0\u05DF';
    document.getElementById('tf-transport').value = item['\u05D4\u05E1\u05E2\u05D4'] || '\u05D0\u05D5\u05D8\u05D5\u05D1\u05D5\u05E1';
    document.getElementById('tf-meals').value = item['\u05D0\u05E8\u05D5\u05D7\u05D5\u05EA'] || '\u05D0\u05E8\u05D5\u05D7\u05EA \u05E6\u05D4\u05E8\u05D9\u05D9\u05DD';
    document.getElementById('tf-participants').value = item['\u05DE\u05E9\u05EA\u05EA\u05E4\u05D9\u05DD'] || '';
    document.getElementById('tf-cost').value = item['\u05E2\u05DC\u05D5\u05EA_\u05DC\u05EA\u05DC\u05DE\u05D9\u05D3'] || '';
    document.getElementById('tf-paid').value = item['\u05EA\u05E9\u05DC\u05D5\u05DD'] || '';
    // Trigger budget calc
    const total = (Number(item['\u05E2\u05DC\u05D5\u05EA_\u05DC\u05EA\u05DC\u05DE\u05D9\u05D3'] || 0)) * (Number(item['\u05DE\u05E9\u05EA\u05EA\u05E4\u05D9\u05DD'] || 0));
    const paid = Number(item['\u05EA\u05E9\u05DC\u05D5\u05DD'] || 0);
    document.getElementById('tf-total-calc').textContent = '\u20AA' + total.toLocaleString();
    document.getElementById('tf-remaining-calc').textContent = '\u20AA' + (total - paid).toLocaleString();
    // Load schedule, equipment, emergency
    try { this._tripFormSchedule = JSON.parse(item['\u05DC\u05D5\u05D7_\u05D6\u05DE\u05E0\u05D9\u05DD'] || '[]'); } catch(e) { this._tripFormSchedule = []; }
    try { this._tripFormEquipment = JSON.parse(item['\u05E6\u05D9\u05D5\u05D3'] || '[]'); } catch(e) { this._tripFormEquipment = []; }
    try { this._tripFormEmergency = JSON.parse(item['\u05D0\u05E0\u05E9\u05D9_\u05E7\u05E9\u05E8_\u05D7\u05D9\u05E8\u05D5\u05DD'] || '[]'); } catch(e) { this._tripFormEmergency = []; }
    this._renderTripScheduleList();
    this._renderTripEquipmentList();
    this._renderTripEmergencyList();
    document.querySelector('#trip-modal .modal-title').innerHTML = '<i class="bi bi-pencil me-2"></i>\u05E2\u05E8\u05D9\u05DB\u05EA \u05D8\u05D9\u05D5\u05DC';
    const firstTab = document.querySelector('#trip-form-tabs .nav-link');
    if (firstTab) new bootstrap.Tab(firstTab).show();
    new bootstrap.Modal(document.getElementById('trip-modal')).show();
  },

  showTripParticipants(tripId) {
    const trip = this._tripData.find(t => String(t.id || Utils.rowId(t)) === String(tripId));
    if (!trip) return;

    const titleEl = document.getElementById('trip-part-title');
    if (titleEl) titleEl.textContent = trip['\u05D9\u05E2\u05D3'] || '';

    const parts = Number(trip['\u05DE\u05E9\u05EA\u05EA\u05E4\u05D9\u05DD'] || 0);
    const approved = Number(trip['\u05D0\u05D9\u05E9\u05D5\u05E8\u05D9\u05DD'] || 0);
    const pending = parts - approved;

    document.getElementById('trip-part-approved').textContent = approved + ' \u05D0\u05D9\u05E9\u05D5\u05E8\u05D9\u05DD';
    document.getElementById('trip-part-pending').textContent = pending + ' \u05DE\u05DE\u05EA\u05D9\u05E0\u05D9\u05DD';
    const pct = parts > 0 ? Math.round((approved / parts) * 100) : 0;
    document.getElementById('trip-part-progress').style.width = pct + '%';

    // Generate student list from API data or empty
    const demoNames = [];

    const listEl = document.getElementById('trip-part-list');
    this._tripPartTripId = tripId;
    this._tripPartNames = demoNames.slice(0, parts);

    let html = '';
    for (let i = 0; i < Math.min(parts, demoNames.length); i++) {
      const isApproved = i < approved;
      html += `<div class="list-group-item d-flex justify-content-between align-items-center trip-part-item">
        <div class="d-flex align-items-center gap-2">
          <div class="avatar avatar-sm" style="width:32px;height:32px;font-size:.75rem;background:${isApproved ? 'var(--bs-success)' : 'var(--bs-warning)'}">${demoNames[i][0]}</div>
          <span>${demoNames[i]}</span>
        </div>
        <div class="d-flex align-items-center gap-2">
          <span class="badge bg-${isApproved ? 'success' : 'warning'}">${isApproved ? '\u05D0\u05D9\u05E9\u05D5\u05E8 \u05D4\u05EA\u05E7\u05D1\u05DC' : '\u05DE\u05DE\u05EA\u05D9\u05DF \u05DC\u05D0\u05D9\u05E9\u05D5\u05E8'}</span>
          <button class="btn btn-sm btn-outline-${isApproved ? 'success' : 'primary'}" onclick="Pages.toggleTripPermission('${tripId}',${i})" title="${isApproved ? '\u05D1\u05D8\u05DC \u05D0\u05D9\u05E9\u05D5\u05E8' : '\u05D0\u05E9\u05E8 \u05D0\u05D9\u05E9\u05D5\u05E8'}">
            <i class="bi bi-${isApproved ? 'check-circle-fill' : 'circle'}"></i>
          </button>
        </div>
      </div>`;
    }
    listEl.innerHTML = html;

    new bootstrap.Modal(document.getElementById('trip-participants-modal')).show();
  },

  filterTripParticipants() {
    const search = (document.getElementById('trip-part-search')?.value || '').toLowerCase();
    document.querySelectorAll('.trip-part-item').forEach(el => {
      const name = el.querySelector('span')?.textContent?.toLowerCase() || '';
      el.style.display = name.includes(search) ? '' : 'none';
    });
  },

  toggleTripPermission(tripId, idx) {
    const trip = this._tripData.find(t => String(t.id || Utils.rowId(t)) === String(tripId));
    if (!trip) return;
    const approved = Number(trip['\u05D0\u05D9\u05E9\u05D5\u05E8\u05D9\u05DD'] || 0);
    // Toggle: if idx < approved, we are un-approving; otherwise approving
    if (idx < approved) {
      trip['\u05D0\u05D9\u05E9\u05D5\u05E8\u05D9\u05DD'] = approved - 1;
    } else {
      trip['\u05D0\u05D9\u05E9\u05D5\u05E8\u05D9\u05DD'] = approved + 1;
    }
    // Re-render participants modal
    this.showTripParticipants(tripId);
    this._updateTripStats();
    this.renderTrips();
  },


  /* ======================================================================
     TRIPS — Schedule, Equipment, Emergency, Checklist, Print
     ====================================================================== */
  _tripFormSchedule: [],
  _tripFormEquipment: [],
  _tripFormEmergency: [],
  _tripChecklistData: [],
  _tripChecklistTripId: null,

  // --- Schedule management ---
  addTripScheduleSlot() {
    this._tripFormSchedule.push({ time: '', activity: '', notes: '' });
    this._renderTripScheduleList();
    // Focus last time input
    setTimeout(() => {
      const inputs = document.querySelectorAll('.tf-sched-time');
      if (inputs.length) inputs[inputs.length - 1].focus();
    }, 50);
  },

  removeTripScheduleSlot(idx) {
    this._tripFormSchedule.splice(idx, 1);
    this._renderTripScheduleList();
  },

  _updateTripScheduleSlot(idx, field, value) {
    if (this._tripFormSchedule[idx]) this._tripFormSchedule[idx][field] = value;
  },

  _renderTripScheduleList() {
    const el = document.getElementById('tf-schedule-list');
    if (!el) return;
    const items = this._tripFormSchedule;
    if (!items.length) {
      el.innerHTML = '<div class="text-center text-muted py-4"><i class="bi bi-clock fs-1 d-block mb-2"></i>\u05DC\u05D7\u05E5 "\u05D4\u05D5\u05E1\u05E3 \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA" \u05DC\u05D1\u05E0\u05D5\u05EA \u05D0\u05EA \u05DC\u05D5\u05D7 \u05D4\u05D6\u05DE\u05E0\u05D9\u05DD</div>';
      return;
    }
    el.innerHTML = items.map((s, i) => `
      <div class="card p-2 mb-2 border-start border-3 border-primary">
        <div class="row g-2 align-items-center">
          <div class="col-md-2">
            <input type="time" class="form-control form-control-sm tf-sched-time" value="${s.time || ''}" onchange="Pages._updateTripScheduleSlot(${i},'time',this.value)" placeholder="\u05E9\u05E2\u05D4">
          </div>
          <div class="col-md-4">
            <input type="text" class="form-control form-control-sm" value="${Utils.escapeHTML ? Utils.escapeHTML(s.activity||'') : (s.activity||'').replace(/</g,'&lt;')}" onchange="Pages._updateTripScheduleSlot(${i},'activity',this.value)" placeholder="\u05E4\u05E2\u05D9\u05DC\u05D5\u05EA">
          </div>
          <div class="col-md-5">
            <input type="text" class="form-control form-control-sm" value="${Utils.escapeHTML ? Utils.escapeHTML(s.notes||'') : (s.notes||'').replace(/</g,'&lt;')}" onchange="Pages._updateTripScheduleSlot(${i},'notes',this.value)" placeholder="\u05D4\u05E2\u05E8\u05D5\u05EA">
          </div>
          <div class="col-md-1 text-end">
            <button class="btn btn-sm btn-outline-danger" onclick="Pages.removeTripScheduleSlot(${i})"><i class="bi bi-x"></i></button>
          </div>
        </div>
      </div>
    `).join('');
  },

  // --- Equipment management ---
  _equipmentPresets: {
    hiking: ['\u05DB\u05D5\u05D1\u05E2', '\u05E0\u05E2\u05DC\u05D9 \u05D4\u05DC\u05D9\u05DB\u05D4', '\u05DE\u05D9\u05DD (2 \u05DC\u05D9\u05D8\u05E8)', '\u05DB\u05D5\u05D1\u05E2 \u05E8\u05D0\u05E9', '\u05E7\u05E8\u05DD \u05D4\u05D2\u05E0\u05D4', '\u05D0\u05E8\u05D5\u05D7\u05EA \u05E6\u05D4\u05E8\u05D9\u05D9\u05DD', '\u05E2\u05E8\u05DB\u05EA \u05E2\u05D6\u05E8\u05D4 \u05E8\u05D0\u05E9\u05D5\u05E0\u05D4'],
    water: ['\u05D1\u05D2\u05D3 \u05D9\u05DD', '\u05DE\u05D2\u05D1\u05EA', '\u05DB\u05E4\u05DB\u05E4\u05D9\u05DD / \u05E1\u05E0\u05D3\u05DC\u05D9\u05DD', '\u05DE\u05D9\u05DD (3 \u05DC\u05D9\u05D8\u05E8)', '\u05E7\u05E8\u05DD \u05D4\u05D2\u05E0\u05D4', '\u05DB\u05D5\u05D1\u05E2', '\u05D0\u05E8\u05D5\u05D7\u05EA \u05E6\u05D4\u05E8\u05D9\u05D9\u05DD'],
    overnight: ['\u05E9\u05E7 \u05E9\u05D9\u05E0\u05D4', '\u05DB\u05E8\u05D9\u05EA \u05E9\u05D9\u05E0\u05D4', '\u05E4\u05E0\u05E1', '\u05D1\u05D2\u05D3\u05D9 \u05D4\u05D7\u05DC\u05E4\u05D4', '\u05DE\u05D1\u05E8\u05E9\u05EA \u05E9\u05D9\u05E0\u05D9\u05D9\u05DD', '\u05E1\u05D9\u05D3\u05D5\u05E8\u05D9\u05DD', '\u05DE\u05D9\u05DD (3 \u05DC\u05D9\u05D8\u05E8)', '\u05D0\u05E8\u05D5\u05D7\u05D5\u05EA'],
    basic: ['\u05DB\u05D5\u05D1\u05E2', '\u05DE\u05D9\u05DD (1.5 \u05DC\u05D9\u05D8\u05E8)', '\u05D0\u05E8\u05D5\u05D7\u05EA \u05E6\u05D4\u05E8\u05D9\u05D9\u05DD', '\u05DB\u05D5\u05D1\u05E2 \u05E8\u05D0\u05E9']
  },

  loadEquipmentPreset(type) {
    const items = this._equipmentPresets[type] || [];
    this._tripFormEquipment = items.map(name => ({ name, required: true }));
    this._renderTripEquipmentList();
    Utils.toast('\u05E0\u05D8\u05E2\u05E0\u05D4 \u05EA\u05D1\u05E0\u05D9\u05EA: ' + items.length + ' \u05E4\u05E8\u05D9\u05D8\u05D9\u05DD');
  },

  addTripEquipmentItem() {
    this._tripFormEquipment.push({ name: '', required: true });
    this._renderTripEquipmentList();
    setTimeout(() => {
      const inputs = document.querySelectorAll('.tf-equip-name');
      if (inputs.length) inputs[inputs.length - 1].focus();
    }, 50);
  },

  removeTripEquipmentItem(idx) {
    this._tripFormEquipment.splice(idx, 1);
    this._renderTripEquipmentList();
  },

  _updateTripEquipmentItem(idx, field, value) {
    if (this._tripFormEquipment[idx]) this._tripFormEquipment[idx][field] = value;
  },

  _renderTripEquipmentList() {
    const el = document.getElementById('tf-equipment-list');
    if (!el) return;
    const items = this._tripFormEquipment;
    if (!items.length) {
      el.innerHTML = '<div class="text-center text-muted py-4"><i class="bi bi-backpack fs-1 d-block mb-2"></i>\u05DC\u05D7\u05E5 "\u05D4\u05D5\u05E1\u05E3 \u05E4\u05E8\u05D9\u05D8" \u05D0\u05D5 \u05D1\u05D7\u05E8 \u05EA\u05D1\u05E0\u05D9\u05EA \u05DE\u05D5\u05DB\u05E0\u05D4</div>';
      return;
    }
    el.innerHTML = items.map((eq, i) => `
      <div class="d-flex align-items-center gap-2 mb-2">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" ${eq.required ? 'checked' : ''} onchange="Pages._updateTripEquipmentItem(${i},'required',this.checked)">
        </div>
        <input type="text" class="form-control form-control-sm tf-equip-name" value="${Utils.escapeHTML ? Utils.escapeHTML(eq.name||'') : (eq.name||'').replace(/</g,'&lt;')}" onchange="Pages._updateTripEquipmentItem(${i},'name',this.value)" placeholder="\u05E9\u05DD \u05D4\u05E4\u05E8\u05D9\u05D8">
        <button class="btn btn-sm btn-outline-danger" onclick="Pages.removeTripEquipmentItem(${i})"><i class="bi bi-x"></i></button>
      </div>
    `).join('');
  },

  // --- Emergency contacts management ---
  addTripEmergencyContact() {
    this._tripFormEmergency.push({ name: '', role: '', phone: '', phone2: '' });
    this._renderTripEmergencyList();
    setTimeout(() => {
      const inputs = document.querySelectorAll('.tf-emerg-name');
      if (inputs.length) inputs[inputs.length - 1].focus();
    }, 50);
  },

  removeTripEmergencyContact(idx) {
    this._tripFormEmergency.splice(idx, 1);
    this._renderTripEmergencyList();
  },

  _updateTripEmergencyContact(idx, field, value) {
    if (this._tripFormEmergency[idx]) this._tripFormEmergency[idx][field] = value;
  },

  _renderTripEmergencyList() {
    const el = document.getElementById('tf-emergency-list');
    if (!el) return;
    const items = this._tripFormEmergency;
    if (!items.length) {
      el.innerHTML = '<div class="text-center text-muted py-4"><i class="bi bi-telephone fs-1 d-block mb-2"></i>\u05D0\u05D9\u05DF \u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8 \u05E2\u05D3\u05D9\u05D9\u05DF</div>';
      return;
    }
    el.innerHTML = items.map((c, i) => `
      <div class="card p-2 mb-2 border-start border-3 border-danger">
        <div class="row g-2 align-items-center">
          <div class="col-md-3">
            <input type="text" class="form-control form-control-sm tf-emerg-name" value="${Utils.escapeHTML ? Utils.escapeHTML(c.name||'') : (c.name||'').replace(/</g,'&lt;')}" onchange="Pages._updateTripEmergencyContact(${i},'name',this.value)" placeholder="\u05E9\u05DD">
          </div>
          <div class="col-md-3">
            <select class="form-select form-select-sm" onchange="Pages._updateTripEmergencyContact(${i},'role',this.value)">
              <option value="" ${!c.role?'selected':''}>\u05EA\u05E4\u05E7\u05D9\u05D3...</option>
              <option value="\u05DE\u05DC\u05D5\u05D5\u05D4" ${c.role==='\u05DE\u05DC\u05D5\u05D5\u05D4'?'selected':''}>\u05DE\u05DC\u05D5\u05D5\u05D4</option>
              <option value="\u05D0\u05D7\u05E8\u05D0\u05D9" ${c.role==='\u05D0\u05D7\u05E8\u05D0\u05D9'?'selected':''}>\u05D0\u05D7\u05E8\u05D0\u05D9</option>
              <option value="\u05DE\u05D3"\u05D0" ${c.role==='\u05DE\u05D3"\u05D0'?'selected':''}>\u05DE\u05D3"\u05D0</option>
              <option value="\u05D4\u05E0\u05D4\u05DC\u05EA \u05D4\u05DE\u05D5\u05E1\u05D3" ${c.role==='\u05D4\u05E0\u05D4\u05DC\u05EA \u05D4\u05DE\u05D5\u05E1\u05D3'?'selected':''}>\u05D4\u05E0\u05D4\u05DC\u05EA \u05D4\u05DE\u05D5\u05E1\u05D3</option>
              <option value="\u05D0\u05D7\u05E8" ${c.role==='\u05D0\u05D7\u05E8'?'selected':''}>\u05D0\u05D7\u05E8</option>
            </select>
          </div>
          <div class="col-md-2">
            <input type="tel" class="form-control form-control-sm" dir="ltr" value="${c.phone||''}" onchange="Pages._updateTripEmergencyContact(${i},'phone',this.value)" placeholder="\u05D8\u05DC\u05E4\u05D5\u05DF 1">
          </div>
          <div class="col-md-2">
            <input type="tel" class="form-control form-control-sm" dir="ltr" value="${c.phone2||''}" onchange="Pages._updateTripEmergencyContact(${i},'phone2',this.value)" placeholder="\u05D8\u05DC\u05E4\u05D5\u05DF 2">
          </div>
          <div class="col-md-2 text-end">
            <button class="btn btn-sm btn-outline-danger" onclick="Pages.removeTripEmergencyContact(${i})"><i class="bi bi-x"></i></button>
          </div>
        </div>
      </div>
    `).join('');
  },

  // --- Trip Checklist (auto-generated from students) ---
  showTripChecklist(tripId) {
    const trip = this._tripData.find(t => String(t.id || t['\u05DE\u05D6\u05D4\u05D4'] || Utils.rowId(t)) === String(tripId));
    if (!trip) { Utils.toast('\u05D8\u05D9\u05D5\u05DC \u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0', 'warning'); return; }

    this._tripChecklistTripId = tripId;
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    const allStudents = _gc('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
    const parents = _gc('\u05D4\u05D5\u05E8\u05D9\u05DD');
    const medical = _gc('\u05DE\u05D9\u05D3\u05E2_\u05E8\u05E4\u05D5\u05D0\u05D9');
    const finance = _gc('\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3');
    const tripClass = trip['\u05DB\u05D9\u05EA\u05D4'] || '';

    // Filter students by class
    let students = allStudents;
    if (tripClass) {
      const classes = tripClass.split('+');
      students = allStudents.filter(s => {
        const sc = s['\u05DB\u05D9\u05EA\u05D4'] || '';
        return classes.some(c => sc.includes(c));
      });
    }

    // Build checklist data per student
    const approved = Number(trip['\u05D0\u05D9\u05E9\u05D5\u05E8\u05D9\u05DD'] || 0);
    // Load saved checklist state if exists
    let savedState = {};
    try { savedState = JSON.parse(trip['\u05E6\u05D9\u05E7\u05DC\u05D9\u05E1\u05D8'] || '{}'); } catch(e) { /* ignore */ }

    this._tripChecklistData = students.map((s, idx) => {
      const sid = Utils.rowId(s);
      const name = Utils.fullName(s);
      const studentId = s['\u05EA\u05D6'] || s['\u05DE\u05E1\u05E4\u05E8_\u05D6\u05D4\u05D5\u05EA'] || '';
      const phone = s['\u05D8\u05DC\u05E4\u05D5\u05DF'] || s['\u05E0\u05D9\u05D9\u05D3'] || '';
      const cls = s['\u05DB\u05D9\u05EA\u05D4'] || '';

      // Find parent info
      const parent = parents.find(p => {
        const pName = (p['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3'] || '');
        return pName === name || String(p['\u05DE\u05D6\u05D4\u05D4_\u05EA\u05DC\u05DE\u05D9\u05D3'] || '') === String(sid);
      });
      const parentName = parent ? ((parent['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9'] || '') + ' ' + (parent['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4'] || '')).trim() || parent['\u05E9\u05DD'] || '' : '';
      const parentPhone = parent ? (parent['\u05D8\u05DC\u05E4\u05D5\u05DF'] || parent['\u05E0\u05D9\u05D9\u05D3'] || '') : '';

      // Find medical info
      const med = medical.find(m => {
        const mName = m['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3'] || m['\u05E9\u05DD'] || '';
        return mName === name || String(m['\u05DE\u05D6\u05D4\u05D4_\u05EA\u05DC\u05DE\u05D9\u05D3'] || '') === String(sid);
      });
      const medNotes = med ? (med['\u05D4\u05E2\u05E8\u05D5\u05EA'] || med['\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA'] || med['\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA'] || '') : '';

      // Saved state per student
      const state = savedState[sid] || {};

      return {
        sid, name, studentId, phone, cls,
        parentName, parentPhone, medNotes,
        permSigned: state.permSigned || (idx < approved),
        paid: state.paid || false
      };
    });

    // Update modal
    document.getElementById('trip-cl-name').textContent = trip['\u05D9\u05E2\u05D3'] || '';
    this._renderTripChecklist();
    new bootstrap.Modal(document.getElementById('trip-checklist-modal')).show();
  },

  _renderTripChecklist() {
    const data = this._getFilteredChecklist();
    const allData = this._tripChecklistData;
    const totalSigned = allData.filter(s => s.permSigned).length;
    const totalPaid = allData.filter(s => s.paid).length;
    const totalMed = allData.filter(s => s.medNotes).length;
    const signPct = allData.length > 0 ? Math.round((totalSigned / allData.length) * 100) : 0;
    const payPct = allData.length > 0 ? Math.round((totalPaid / allData.length) * 100) : 0;

    // Stats
    document.getElementById('trip-cl-stats').innerHTML = `
      <div class="col-6 col-md-3"><div class="card p-3 text-center">
        <div class="fs-3 fw-bold text-primary">${allData.length}</div>
        <small class="text-muted">\u05E1\u05D4"\u05DB \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</small>
      </div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center">
        <div class="fs-3 fw-bold text-success">${totalSigned}</div>
        <small class="text-muted">\u05D0\u05D9\u05E9\u05D5\u05E8\u05D9 \u05D4\u05D5\u05E8\u05D9\u05DD (${signPct}%)</small>
        <div class="progress mt-1" style="height:4px"><div class="progress-bar bg-success" style="width:${signPct}%"></div></div>
      </div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center">
        <div class="fs-3 fw-bold text-warning">${totalPaid}</div>
        <small class="text-muted">\u05E9\u05D9\u05DC\u05DE\u05D5 (${payPct}%)</small>
        <div class="progress mt-1" style="height:4px"><div class="progress-bar bg-warning" style="width:${payPct}%"></div></div>
      </div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center">
        <div class="fs-3 fw-bold text-danger">${totalMed}</div>
        <small class="text-muted">\u05D4\u05E2\u05E8\u05D5\u05EA \u05E8\u05E4\u05D5\u05D0\u05D9\u05D5\u05EA</small>
      </div></div>`;

    // Table
    const wrap = document.getElementById('trip-cl-table-wrap');
    if (!data.length) {
      wrap.innerHTML = '<div class="text-center py-5 text-muted"><i class="bi bi-people fs-1 d-block mb-2"></i>\u05D0\u05D9\u05DF \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05DC\u05D4\u05E6\u05D9\u05D2</div>';
      return;
    }
    wrap.innerHTML = `
      <table class="table table-hover table-sm align-middle">
        <thead class="table-light">
          <tr>
            <th style="width:30px">#</th>
            <th>\u05EA\u05DC\u05DE\u05D9\u05D3</th>
            <th>\u05EA.\u05D6. / \u05DE\u05D6\u05D4\u05D4</th>
            <th>\u05DB\u05D9\u05EA\u05D4</th>
            <th>\u05D8\u05DC\u05E4\u05D5\u05DF</th>
            <th>\u05D4\u05D5\u05E8\u05D4</th>
            <th>\u05D8\u05DC\u05E4\u05D5\u05DF \u05D4\u05D5\u05E8\u05D4</th>
            <th>\u05D4\u05E2\u05E8\u05D5\u05EA \u05E8\u05E4\u05D5\u05D0\u05D9\u05D5\u05EA</th>
            <th>\u05D0\u05D9\u05E9\u05D5\u05E8 \u05D4\u05D5\u05E8\u05D9\u05DD</th>
            <th>\u05EA\u05E9\u05DC\u05D5\u05DD</th>
          </tr>
        </thead>
        <tbody>${data.map((s, i) => {
          const medBadge = s.medNotes
            ? `<span class="badge bg-danger" title="${(Utils.escapeHTML ? Utils.escapeHTML(s.medNotes) : s.medNotes.replace(/</g,'&lt;').replace(/"/g,'&quot;'))}">\u05D9\u05E9 \u05D4\u05E2\u05E8\u05D5\u05EA</span>`
            : '<span class="text-muted">-</span>';
          return `<tr class="trip-cl-row">
            <td class="text-muted">${i + 1}</td>
            <td class="fw-bold">${Utils.avatarHTML ? Utils.avatarHTML(s.name, 'sm') : ''} ${s.name}</td>
            <td dir="ltr">${s.studentId || '-'}</td>
            <td>${s.cls || '-'}</td>
            <td dir="ltr">${s.phone || '-'}</td>
            <td>${s.parentName || '-'}</td>
            <td dir="ltr">${s.parentPhone ? `<a href="tel:${s.parentPhone}" class="text-decoration-none">${s.parentPhone}</a>` : '-'}</td>
            <td>${medBadge}</td>
            <td>
              <button class="btn btn-sm btn-${s.permSigned ? 'success' : 'outline-warning'}" onclick="Pages.toggleChecklistPerm(${i})">
                <i class="bi bi-${s.permSigned ? 'check-circle-fill' : 'circle'}"></i>
                ${s.permSigned ? '\u05D7\u05EA\u05D5\u05DD' : '\u05DE\u05DE\u05EA\u05D9\u05DF'}
              </button>
            </td>
            <td>
              <button class="btn btn-sm btn-${s.paid ? 'success' : 'outline-danger'}" onclick="Pages.toggleChecklistPay(${i})">
                <i class="bi bi-${s.paid ? 'check-circle-fill' : 'circle'}"></i>
                ${s.paid ? '\u05E9\u05D5\u05DC\u05DD' : '\u05DC\u05D0 \u05E9\u05D5\u05DC\u05DD'}
              </button>
            </td>
          </tr>`;
        }).join('')}</tbody>
      </table>`;
  },

  _getFilteredChecklist() {
    let data = [...this._tripChecklistData];
    const search = (document.getElementById('trip-cl-search')?.value || '').trim().toLowerCase();
    const permFilter = document.getElementById('trip-cl-filter-perm')?.value || '';
    const payFilter = document.getElementById('trip-cl-filter-pay')?.value || '';
    if (search) data = data.filter(s => s.name.toLowerCase().includes(search) || (s.studentId || '').includes(search));
    if (permFilter === 'signed') data = data.filter(s => s.permSigned);
    if (permFilter === 'pending') data = data.filter(s => !s.permSigned);
    if (payFilter === 'paid') data = data.filter(s => s.paid);
    if (payFilter === 'unpaid') data = data.filter(s => !s.paid);
    return data;
  },

  filterTripChecklist() {
    this._renderTripChecklist();
  },

  resetTripChecklistFilters() {
    const el = id => document.getElementById(id);
    if (el('trip-cl-search')) el('trip-cl-search').value = '';
    if (el('trip-cl-filter-perm')) el('trip-cl-filter-perm').value = '';
    if (el('trip-cl-filter-pay')) el('trip-cl-filter-pay').value = '';
    this._renderTripChecklist();
  },

  toggleChecklistPerm(idx) {
    if (this._tripChecklistData[idx]) {
      this._tripChecklistData[idx].permSigned = !this._tripChecklistData[idx].permSigned;
      this._renderTripChecklist();
    }
  },

  toggleChecklistPay(idx) {
    if (this._tripChecklistData[idx]) {
      this._tripChecklistData[idx].paid = !this._tripChecklistData[idx].paid;
      this._renderTripChecklist();
    }
  },

  // --- Print Trip List ---
  printTripList(tripId) {
    // If called from dropdown (with tripId), load checklist first
    if (tripId && tripId !== true) {
      const trip = this._tripData.find(t => String(t.id || t['\u05DE\u05D6\u05D4\u05D4'] || Utils.rowId(t)) === String(tripId));
      if (!trip) { Utils.toast('\u05D8\u05D9\u05D5\u05DC \u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0', 'warning'); return; }
      // Build checklist data silently
      this.showTripChecklist(tripId);
      // Wait for modal to show then print
      setTimeout(() => this._executeTripPrint(trip), 300);
      return;
    }
    // Called from checklist modal (no tripId or true)
    const trip = this._tripData.find(t => String(t.id || t['\u05DE\u05D6\u05D4\u05D4'] || Utils.rowId(t)) === String(this._tripChecklistTripId));
    if (!trip) return;
    this._executeTripPrint(trip);
  },

  _executeTripPrint(trip) {
    const data = this._tripChecklistData;
    let schedule = [];
    try { schedule = JSON.parse(trip['\u05DC\u05D5\u05D7_\u05D6\u05DE\u05E0\u05D9\u05DD'] || '[]'); } catch(e) { /* ignore */ }
    let equipment = [];
    try { equipment = JSON.parse(trip['\u05E6\u05D9\u05D5\u05D3'] || '[]'); } catch(e) { /* ignore */ }
    let emergency = [];
    try { emergency = JSON.parse(trip['\u05D0\u05E0\u05E9\u05D9_\u05E7\u05E9\u05E8_\u05D7\u05D9\u05E8\u05D5\u05DD'] || '[]'); } catch(e) { /* ignore */ }

    const totalSigned = data.filter(s => s.permSigned).length;
    const totalPaid = data.filter(s => s.paid).length;

    const printWin = window.open('', '_blank');
    printWin.document.write(`<!DOCTYPE html><html dir="rtl" lang="he"><head>
      <meta charset="UTF-8">
      <title>\u05E8\u05E9\u05D9\u05DE\u05EA \u05D8\u05D9\u05D5\u05DC - ${trip['\u05D9\u05E2\u05D3'] || ''}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Heebo', sans-serif; padding: 20px; font-size: 12px; color: #333; direction: rtl; }
        h1 { font-size: 22px; margin-bottom: 5px; }
        h2 { font-size: 16px; margin: 15px 0 8px; border-bottom: 2px solid #2563eb; padding-bottom: 4px; color: #2563eb; }
        .header { text-align: center; margin-bottom: 20px; border-bottom: 3px solid #333; padding-bottom: 10px; }
        .header p { color: #666; font-size: 14px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 15px; }
        .info-item { background: #f8f9fa; padding: 8px; border-radius: 4px; }
        .info-item strong { display: block; color: #2563eb; font-size: 11px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
        th, td { border: 1px solid #dee2e6; padding: 6px 8px; text-align: right; }
        th { background: #e9ecef; font-weight: 700; font-size: 11px; }
        td { font-size: 11px; }
        .badge { display: inline-block; padding: 2px 6px; border-radius: 3px; font-size: 10px; font-weight: 700; }
        .badge-success { background: #d1fae5; color: #065f46; }
        .badge-warning { background: #fef3c7; color: #92400e; }
        .badge-danger { background: #fee2e2; color: #991b1b; }
        .schedule-item { display: flex; gap: 10px; padding: 4px 0; border-bottom: 1px dotted #ddd; }
        .schedule-time { font-weight: 700; min-width: 50px; color: #2563eb; }
        .equip-list { columns: 2; list-style: none; }
        .equip-list li { padding: 2px 0; }
        .equip-list li::before { content: "\\2610 "; }
        .emergency-table th { background: #fee2e2; }
        .summary { display: flex; gap: 20px; justify-content: center; margin: 10px 0; }
        .summary-item { text-align: center; }
        .summary-item .num { font-size: 20px; font-weight: 700; }
        @media print { body { padding: 10px; } }
      </style>
    </head><body>
      <div class="header">
        <h1>\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3 - \u05E8\u05E9\u05D9\u05DE\u05EA \u05D8\u05D9\u05D5\u05DC</h1>
        <p>${trip['\u05D9\u05E2\u05D3'] || ''} | ${trip['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05EA\u05D7\u05DC\u05D4'] || ''} ${trip['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05E1\u05D9\u05D5\u05DD'] && trip['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05E1\u05D9\u05D5\u05DD'] !== trip['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05EA\u05D7\u05DC\u05D4'] ? '- ' + trip['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05E1\u05D9\u05D5\u05DD'] : ''}</p>
      </div>

      <div class="info-grid">
        <div class="info-item"><strong>\u05DB\u05D9\u05EA\u05D4</strong>${trip['\u05DB\u05D9\u05EA\u05D4'] || '\u05DB\u05DC \u05D4\u05DE\u05D5\u05E1\u05D3'}</div>
        <div class="info-item"><strong>\u05D4\u05E1\u05E2\u05D4</strong>${trip['\u05D4\u05E1\u05E2\u05D4'] || '-'}</div>
        <div class="info-item"><strong>\u05D0\u05E8\u05D5\u05D7\u05D5\u05EA</strong>${trip['\u05D0\u05E8\u05D5\u05D7\u05D5\u05EA'] || '-'}</div>
      </div>

      <div class="summary">
        <div class="summary-item"><div class="num">${data.length}</div><div>\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</div></div>
        <div class="summary-item"><div class="num" style="color:green">${totalSigned}</div><div>\u05D0\u05D9\u05E9\u05D5\u05E8\u05D9\u05DD</div></div>
        <div class="summary-item"><div class="num" style="color:orange">${totalPaid}</div><div>\u05E9\u05D9\u05DC\u05DE\u05D5</div></div>
      </div>

      ${trip['\u05EA\u05D9\u05D0\u05D5\u05E8'] ? `<h2>\u05EA\u05D9\u05D0\u05D5\u05E8</h2><p>${trip['\u05EA\u05D9\u05D0\u05D5\u05E8']}</p>` : ''}

      ${schedule.length ? `<h2>\u05DC\u05D5\u05D7 \u05D6\u05DE\u05E0\u05D9\u05DD</h2>
        ${schedule.map(s => `<div class="schedule-item"><span class="schedule-time">${s.time || ''}</span><span>${s.activity || ''}</span>${s.notes ? `<span style="color:#666"> - ${s.notes}</span>` : ''}</div>`).join('')}` : ''}

      ${equipment.length ? `<h2>\u05E6\u05D9\u05D5\u05D3 \u05E0\u05D3\u05E8\u05E9</h2>
        <ul class="equip-list">${equipment.map(e => `<li>${e.name || ''}</li>`).join('')}</ul>` : ''}

      <h2>\u05E8\u05E9\u05D9\u05DE\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</h2>
      <table>
        <thead><tr>
          <th>#</th><th>\u05E9\u05DD</th><th>\u05EA.\u05D6.</th><th>\u05DB\u05D9\u05EA\u05D4</th><th>\u05D8\u05DC\u05E4\u05D5\u05DF</th>
          <th>\u05D4\u05D5\u05E8\u05D4</th><th>\u05D8\u05DC\u05E4\u05D5\u05DF \u05D4\u05D5\u05E8\u05D4</th><th>\u05E8\u05E4\u05D5\u05D0\u05D9</th>
          <th>\u05D0\u05D9\u05E9\u05D5\u05E8</th><th>\u05EA\u05E9\u05DC\u05D5\u05DD</th>
        </tr></thead>
        <tbody>${data.map((s, i) => `<tr>
          <td>${i + 1}</td>
          <td><strong>${s.name}</strong></td>
          <td>${s.studentId || '-'}</td>
          <td>${s.cls || '-'}</td>
          <td>${s.phone || '-'}</td>
          <td>${s.parentName || '-'}</td>
          <td>${s.parentPhone || '-'}</td>
          <td>${s.medNotes ? `<span class="badge badge-danger">${s.medNotes}</span>` : '-'}</td>
          <td><span class="badge ${s.permSigned ? 'badge-success' : 'badge-warning'}">${s.permSigned ? '\u05D7\u05EA\u05D5\u05DD' : '\u05DE\u05DE\u05EA\u05D9\u05DF'}</span></td>
          <td><span class="badge ${s.paid ? 'badge-success' : 'badge-warning'}">${s.paid ? '\u05E9\u05D5\u05DC\u05DD' : '\u05DC\u05D0'}</span></td>
        </tr>`).join('')}</tbody>
      </table>

      ${emergency.length ? `<h2 class="emergency-title">\u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8 \u05DC\u05D7\u05D9\u05E8\u05D5\u05DD</h2>
        <table class="emergency-table"><thead><tr><th>\u05E9\u05DD</th><th>\u05EA\u05E4\u05E7\u05D9\u05D3</th><th>\u05D8\u05DC\u05E4\u05D5\u05DF 1</th><th>\u05D8\u05DC\u05E4\u05D5\u05DF 2</th></tr></thead>
        <tbody>${emergency.map(c => `<tr><td><strong>${c.name || ''}</strong></td><td>${c.role || ''}</td><td>${c.phone || ''}</td><td>${c.phone2 || ''}</td></tr>`).join('')}</tbody></table>` : ''}

      <div style="text-align:center;margin-top:20px;color:#999;font-size:10px">
        \u05D4\u05D5\u05D3\u05E4\u05E1 \u05D1\u05EA\u05D0\u05E8\u05D9\u05DA: ${new Date().toLocaleDateString('he-IL')} | \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3
      </div>
    </body></html>`);
    printWin.document.close();
    setTimeout(() => { printWin.focus(); printWin.print(); }, 500);
  },


  /* ======================================================================
     INSTITUTIONS
     ====================================================================== */
  _instTypes: {
    '\u05D1\u05D9\u05EA \u05E1\u05E4\u05E8': { icon: 'bi-book', color: '#2563eb', label: '\u05D1\u05D9\u05EA \u05E1\u05E4\u05E8' },
    '\u05D9\u05E9\u05D9\u05D1\u05D4': { icon: 'bi-mortarboard', color: '#7c3aed', label: '\u05D9\u05E9\u05D9\u05D1\u05D4' },
    '\u05DB\u05D5\u05DC\u05DC': { icon: 'bi-journal-richtext', color: '#059669', label: '\u05DB\u05D5\u05DC\u05DC' },
    '\u05D0\u05E8\u05D2\u05D5\u05DF': { icon: 'bi-people', color: '#d97706', label: '\u05D0\u05E8\u05D2\u05D5\u05DF' },
    '\u05DE\u05DE\u05E9\u05DC\u05EA\u05D9': { icon: 'bi-bank', color: '#dc2626', label: '\u05DE\u05DE\u05E9\u05DC\u05EA\u05D9' }
  },
  _instDemoData: [],
  institutions() {
    const typeOptions = Object.keys(this._instTypes).map(t => `<option value="${t}">${t}</option>`).join('');
    return `
    <!-- Stats Cards -->
    <div class="row g-3 mb-3" id="inst-stats"></div>

    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
      <div><h1><i class="bi bi-building me-2"></i>\u05DE\u05D5\u05E1\u05D3\u05D5\u05EA</h1><p class="text-muted mb-0" id="inst-count"></p></div>
      <button class="btn btn-primary" onclick="Pages.showAddInst()"><i class="bi bi-plus-lg me-1"></i>\u05DE\u05D5\u05E1\u05D3 \u05D7\u05D3\u05E9</button>
    </div>

    <!-- Search & Filter -->
    <div class="card p-3 mb-3">
      <div class="row g-2 align-items-end">
        <div class="col-md-6">
          <div class="search-box"><i class="bi bi-search"></i><input type="text" class="form-control" id="inst-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05DC\u05E4\u05D9 \u05E9\u05DD..."></div>
        </div>
        <div class="col-md-4">
          <select class="form-select" id="inst-type-filter">
            <option value="">\u05DB\u05DC \u05D4\u05E1\u05D5\u05D2\u05D9\u05DD</option>
            ${typeOptions}
          </select>
        </div>
        <div class="col-md-2">
          <button class="btn btn-outline-secondary w-100" onclick="document.getElementById('inst-search').value='';document.getElementById('inst-type-filter').value='';Pages.renderInst()"><i class="bi bi-x-lg me-1"></i>\u05E0\u05E7\u05D4</button>
        </div>
      </div>
    </div>

    <div id="inst-list">${Utils.skeleton(3)}</div>

    <!-- Add/Edit Modal -->
    <div class="modal fade" id="inst-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title">\u05DE\u05D5\u05E1\u05D3 \u05D7\u05D3\u05E9</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body"><div class="row g-3">
        <div class="col-md-6"><label class="form-label">\u05E9\u05DD \u05D4\u05DE\u05D5\u05E1\u05D3</label><input class="form-control" id="instf-name" required></div>
        <div class="col-md-6"><label class="form-label">\u05E1\u05D5\u05D2</label><select class="form-select" id="instf-type">${typeOptions}</select></div>
        <div class="col-12"><label class="form-label">\u05DB\u05EA\u05D5\u05D1\u05EA</label><input class="form-control" id="instf-address" placeholder="\u05E8\u05D7\u05D5\u05D1, \u05DE\u05E1\u05E4\u05E8, \u05E2\u05D9\u05E8"></div>
        <div class="col-md-6"><label class="form-label">\u05D8\u05DC\u05E4\u05D5\u05DF</label><input class="form-control" id="instf-phone" type="tel" dir="ltr"></div>
        <div class="col-md-6"><label class="form-label">\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC</label><input class="form-control" id="instf-email" type="email" dir="ltr"></div>
        <div class="col-12"><label class="form-label">\u05D0\u05D9\u05E9 \u05E7\u05E9\u05E8</label><input class="form-control" id="instf-contact"></div>
        <div class="col-12"><label class="form-label">\u05D4\u05E2\u05E8\u05D5\u05EA</label><textarea class="form-control" id="instf-notes" rows="2"></textarea></div>
      </div></div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveInst()"><i class="bi bi-check-lg me-1"></i>\u05E9\u05DE\u05D5\u05E8</button></div>
    </div></div></div>`;
  },
  _instData: [],
  _instEditId: null,
  _instUseDemo: false,

  instLoadDemo() {
    this._instUseDemo = true;
    this._instData = this._instDemoData;
    this.renderInst();
    Utils.toast('\u05E0\u05D8\u05E2\u05E0\u05D5 \u05E0\u05EA\u05D5\u05E0\u05D9 \u05D3\u05DE\u05D5', 'info');
  },

  institutionsInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    let data = _gc('\u05DE\u05E1\u05D2\u05E8\u05D5\u05EA');
    if (!data || !data.length) {
      data = this._instUseDemo ? this._instDemoData : [];
    }
    this._instData = data;
    document.getElementById('inst-search').addEventListener('input', Utils.debounce(() => this.renderInst(), 200));
    document.getElementById('inst-type-filter').addEventListener('change', () => this.renderInst());
    this.renderInst();
  },
  _instFiltered() {
    let data = this._instData;
    const q = (document.getElementById('inst-search')?.value || '').trim().toLowerCase();
    const typeFilter = document.getElementById('inst-type-filter')?.value || '';
    if (q) data = data.filter(i => (i['\u05E9\u05DD']||'').toLowerCase().includes(q) || (i['\u05D0\u05D9\u05E9_\u05E7\u05E9\u05E8']||'').toLowerCase().includes(q) || (i['\u05DB\u05EA\u05D5\u05D1\u05EA']||'').toLowerCase().includes(q));
    if (typeFilter) data = data.filter(i => (i['\u05E1\u05D5\u05D2']||'') === typeFilter);
    return data;
  },
  renderInst() {
    const allData = this._instData;
    const data = this._instFiltered();
    const types = this._instTypes;

    // Stats cards
    const typeCounts = {};
    Object.keys(types).forEach(t => typeCounts[t] = 0);
    allData.forEach(i => { const t = i['\u05E1\u05D5\u05D2']||''; if (typeCounts[t] !== undefined) typeCounts[t]++; });

    document.getElementById('inst-stats').innerHTML = `
      <div class="col-6 col-md-2"><div class="card p-3 text-center border-primary border-2">
        <div class="fs-2 fw-bold text-primary">${allData.length}</div>
        <small class="text-muted">\u05E1\u05D4"\u05DB \u05DE\u05D5\u05E1\u05D3\u05D5\u05EA</small>
      </div></div>
      ${Object.entries(types).map(([key, t]) => `
        <div class="col-6 col-md-2"><div class="card p-3 text-center" style="border-top:3px solid ${t.color}; cursor:pointer" onclick="document.getElementById('inst-type-filter').value='${key}';Pages.renderInst()">
          <div class="fs-2 fw-bold" style="color:${t.color}">${typeCounts[key]||0}</div>
          <small class="text-muted"><i class="bi ${t.icon} me-1"></i>${t.label}</small>
        </div></div>
      `).join('')}`;

    document.getElementById('inst-count').textContent = data.length === allData.length
      ? `${allData.length} \u05DE\u05D5\u05E1\u05D3\u05D5\u05EA`
      : `\u05DE\u05E6\u05D9\u05D2 ${data.length} \u05DE\u05EA\u05D5\u05DA ${allData.length}`;

    if (!data.length) {
      const hasActiveFilter = ((document.getElementById('inst-search')?.value || '').trim() || document.getElementById('inst-type-filter')?.value);
      document.getElementById('inst-list').innerHTML = hasActiveFilter
        ? '<div class="empty-state"><i class="bi bi-building"></i><h5>\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05DE\u05D5\u05E1\u05D3\u05D5\u05EA</h5><p class="text-muted">\u05E0\u05E1\u05D4 \u05DC\u05E9\u05E0\u05D5\u05EA \u05D0\u05EA \u05D4\u05D7\u05D9\u05E4\u05D5\u05E9</p></div>'
        : '<div class="empty-state"><i class="bi bi-building"></i><h5>\u05D0\u05D9\u05DF \u05DE\u05D5\u05E1\u05D3\u05D5\u05EA \u05E2\u05D3\u05D9\u05D9\u05DF</h5><p class="text-muted">\u05DC\u05D7\u05E5 "\u05DE\u05D5\u05E1\u05D3 \u05D7\u05D3\u05E9" \u05DC\u05D4\u05D5\u05E1\u05E4\u05D4</p></div>';
      return;
    }

    document.getElementById('inst-list').innerHTML = `<div class="row g-3">${data.map(i => {
      const iid = Utils.rowId(i);
      const typeKey = i['\u05E1\u05D5\u05D2'] || '';
      const typeInfo = types[typeKey] || { icon: 'bi-building', color: '#6b7280', label: typeKey || '\u05DC\u05DC\u05D0 \u05E1\u05D5\u05D2' };
      const initial = (i['\u05E9\u05DD']||'?')[0];
      return `<div class="col-md-6 col-lg-4">
        <div class="card p-3 h-100">
          <div class="d-flex align-items-start gap-3 mb-2">
            <div class="avatar" style="background:${typeInfo.color};min-width:48px;height:48px;font-size:1.2rem">${initial}</div>
            <div class="flex-grow-1 min-width-0">
              <h6 class="fw-bold mb-1">${i['\u05E9\u05DD']||''}</h6>
              <span class="badge" style="background:${typeInfo.color}15;color:${typeInfo.color};border:1px solid ${typeInfo.color}40"><i class="bi ${typeInfo.icon} me-1"></i>${typeInfo.label}</span>
            </div>
          </div>
          <div class="small text-muted mb-2">
            ${i['\u05DB\u05EA\u05D5\u05D1\u05EA'] ? `<div class="mb-1"><i class="bi bi-geo-alt me-1"></i>${i['\u05DB\u05EA\u05D5\u05D1\u05EA']}</div>` : ''}
            ${i['\u05D8\u05DC\u05E4\u05D5\u05DF'] ? `<div class="mb-1"><i class="bi bi-telephone me-1"></i><a href="tel:${i['\u05D8\u05DC\u05E4\u05D5\u05DF']}" class="text-decoration-none">${i['\u05D8\u05DC\u05E4\u05D5\u05DF']}</a></div>` : ''}
            ${i['\u05D0\u05D9\u05E9_\u05E7\u05E9\u05E8'] ? `<div class="mb-1"><i class="bi bi-person me-1"></i>${i['\u05D0\u05D9\u05E9_\u05E7\u05E9\u05E8']}</div>` : ''}
            ${i['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC'] ? `<div class="mb-1"><i class="bi bi-envelope me-1"></i><a href="mailto:${i['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC']}" class="text-decoration-none">${i['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC']}</a></div>` : ''}
          </div>
          ${i['\u05D4\u05E2\u05E8\u05D5\u05EA'] ? `<p class="small text-muted border-top pt-2 mb-2">${i['\u05D4\u05E2\u05E8\u05D5\u05EA']}</p>` : ''}
          <div class="d-flex gap-1 mt-auto">
            <button class="btn btn-sm btn-outline-primary" onclick="Pages.editInst('${iid}')"><i class="bi bi-pencil me-1"></i>\u05E2\u05E8\u05D9\u05DB\u05D4</button>
            <button class="btn btn-sm btn-outline-danger" onclick="Pages.deleteInst('${iid}')"><i class="bi bi-trash me-1"></i>\u05DE\u05D7\u05D9\u05E7\u05D4</button>
          </div>
        </div>
      </div>`;
    }).join('')}</div>`;
  },
  showAddInst() {
    this._instEditId = null;
    document.getElementById('instf-name').value = '';
    document.getElementById('instf-type').value = Object.keys(this._instTypes)[0];
    document.getElementById('instf-address').value = '';
    document.getElementById('instf-phone').value = '';
    document.getElementById('instf-email').value = '';
    document.getElementById('instf-contact').value = '';
    document.getElementById('instf-notes').value = '';
    document.querySelector('#inst-modal .modal-title').textContent = '\u05DE\u05D5\u05E1\u05D3 \u05D7\u05D3\u05E9';
    new bootstrap.Modal(document.getElementById('inst-modal')).show();
  },
  editInst(id) {
    const i = this._instData.find(x => String(Utils.rowId(x)) === String(id));
    if (!i) return;
    this._instEditId = id;
    document.getElementById('instf-name').value = i['\u05E9\u05DD'] || '';
    document.getElementById('instf-type').value = i['\u05E1\u05D5\u05D2'] || Object.keys(this._instTypes)[0];
    document.getElementById('instf-address').value = i['\u05DB\u05EA\u05D5\u05D1\u05EA'] || '';
    document.getElementById('instf-phone').value = i['\u05D8\u05DC\u05E4\u05D5\u05DF'] || '';
    document.getElementById('instf-email').value = i['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC'] || '';
    document.getElementById('instf-contact').value = i['\u05D0\u05D9\u05E9_\u05E7\u05E9\u05E8'] || '';
    document.getElementById('instf-notes').value = i['\u05D4\u05E2\u05E8\u05D5\u05EA'] || '';
    document.querySelector('#inst-modal .modal-title').textContent = '\u05E2\u05E8\u05D9\u05DB\u05EA \u05DE\u05D5\u05E1\u05D3';
    new bootstrap.Modal(document.getElementById('inst-modal')).show();
  },
  async saveInst() {
    const row = {
      '\u05E9\u05DD': document.getElementById('instf-name').value.trim(),
      '\u05E1\u05D5\u05D2': document.getElementById('instf-type').value,
      '\u05DB\u05EA\u05D5\u05D1\u05EA': document.getElementById('instf-address').value.trim(),
      '\u05D8\u05DC\u05E4\u05D5\u05DF': document.getElementById('instf-phone').value.trim(),
      '\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC': document.getElementById('instf-email').value.trim(),
      '\u05D0\u05D9\u05E9_\u05E7\u05E9\u05E8': document.getElementById('instf-contact').value.trim(),
      '\u05D4\u05E2\u05E8\u05D5\u05EA': document.getElementById('instf-notes').value.trim()
    };
    if (!row['\u05E9\u05DD']) { Utils.toast('\u05D7\u05E1\u05E8 \u05E9\u05DD \u05DE\u05D5\u05E1\u05D3', 'warning'); return; }
    try {
      if (this._instEditId) { await App.apiCall('update', '\u05DE\u05E1\u05D2\u05E8\u05D5\u05EA', { id: this._instEditId, row }); }
      else { await App.apiCall('add', '\u05DE\u05E1\u05D2\u05E8\u05D5\u05EA', { row }); }
      bootstrap.Modal.getInstance(document.getElementById('inst-modal')).hide();
      Utils.toast(this._instEditId ? '\u05DE\u05D5\u05E1\u05D3 \u05E2\u05D5\u05D3\u05DB\u05DF' : '\u05DE\u05D5\u05E1\u05D3 \u05E0\u05D5\u05E1\u05E3');
      this._instEditId = null;
      this.institutionsInit();
    } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4', 'danger'); }
  },
  async deleteInst(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4', '\u05DC\u05DE\u05D7\u05D5\u05E7 \u05DE\u05D5\u05E1\u05D3 \u05D6\u05D4?')) return;
    try { await App.apiCall('delete', '\u05DE\u05E1\u05D2\u05E8\u05D5\u05EA', { id }); Utils.toast('\u05DE\u05D5\u05E1\u05D3 \u05E0\u05DE\u05D7\u05E7'); this.institutionsInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4', 'danger'); }
  },


  /* ======================================================================
     MEDICAL
     ====================================================================== */
  medical() {
    return `<div class="page-header"><h1><i class="bi bi-heart-pulse me-2"></i>\u05DE\u05D9\u05D3\u05E2 \u05E8\u05E4\u05D5\u05D0\u05D9</h1></div><div class="card p-3 mb-3"><div class="search-box"><i class="bi bi-search"></i><input type="text" class="form-control" id="med-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05EA\u05DC\u05DE\u05D9\u05D3..."></div></div><div id="med-list">${Utils.skeleton(3)}</div><div class="modal fade" id="med-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">\u05E2\u05E8\u05D9\u05DB\u05EA \u05DE\u05D9\u05D3\u05E2 \u05E8\u05E4\u05D5\u05D0\u05D9</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><input type="hidden" id="medf-sid"><div class="mb-3"><label class="form-label">\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA</label><input class="form-control" id="medf-allergies"></div><div class="mb-3"><label class="form-label">\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA</label><input class="form-control" id="medf-meds"></div><div class="mb-3"><label class="form-label">\u05D4\u05E2\u05E8\u05D5\u05EA</label><textarea class="form-control" id="medf-notes" rows="3"></textarea></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveMedical()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
  },
  _medData: [],
  medicalInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    const students = _gc('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
    const medical = _gc('\u05DE\u05D9\u05D3\u05E2_\u05E8\u05E4\u05D5\u05D0\u05D9');
    this._medData = students.filter(s=>(s['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')!=='\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC').map(s => {
      const name = Utils.fullName(s); const sid = Utils.rowId(s);
      const med = medical.find(m => String(m['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4']||'') === String(sid));
      return { name, id: sid, cls: s['\u05DB\u05D9\u05EA\u05D4']||'', med };
    });
    document.getElementById('med-search').addEventListener('input', Utils.debounce(() => this.renderMedical(), 200));
    this.renderMedical();
  },
  renderMedical() {
    const search = (document.getElementById('med-search')?.value||'').trim().toLowerCase();
    const filtered = this._medData.filter(r => !search || r.name.toLowerCase().includes(search));
    if (!filtered.length) { document.getElementById('med-list').innerHTML = '<div class="empty-state"><i class="bi bi-heart-pulse"></i><h5>\u05D0\u05D9\u05DF \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</h5></div>'; return; }
    document.getElementById('med-list').innerHTML = `<div class="row g-3">${filtered.map(r => {
      const m = r.med;
      const hasMed = m && (m['\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA']||m['\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA']||m['\u05D4\u05E2\u05E8\u05D5\u05EA']);
      return `<div class="col-md-6"><div class="card p-3 ${hasMed?'medical-card':''}"><div class="d-flex align-items-center gap-3 mb-2">${Utils.avatarHTML(r.name)}<div><div class="fw-bold">${r.name}</div><small class="text-muted">\u05DB\u05D9\u05EA\u05D4 ${r.cls}</small></div>${hasMed?'<span class="badge bg-danger ms-auto">\u05DE\u05D9\u05D3\u05E2 \u05E8\u05E4\u05D5\u05D0\u05D9</span>':'<span class="badge bg-success ms-auto">\u05EA\u05E7\u05D9\u05DF</span>'}<button class="btn btn-sm btn-outline-primary ms-2" onclick="Pages.openMedicalEdit('${r.id}','${r.name}')"><i class="bi bi-pencil"></i></button></div><div class="mt-2"><button class="btn btn-sm btn-outline-primary" onclick="Pages.openMedicalEdit('${r.id}','${r.name.replace(/'/g,'')}')"><i class="bi bi-pencil me-1"></i>\u05E2\u05E8\u05D9\u05DB\u05D4</button></div>${''}</div>${hasMed?`<div class="small">${m['\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA']?`<div><i class="bi bi-exclamation-triangle text-warning me-1"></i><strong>\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA:</strong> ${m['\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA']}</div>`:''}${m['\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA']?`<div><i class="bi bi-capsule text-primary me-1"></i><strong>\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA:</strong> ${m['\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA']}</div>`:''}${m['\u05D4\u05E2\u05E8\u05D5\u05EA']?`<div><i class="bi bi-info-circle text-info me-1"></i>${m['\u05D4\u05E2\u05E8\u05D5\u05EA']}</div>`:''}</div>`:''}</div></div>`;
    }).join('')}</div>`;
  },
  openMedicalEdit(studentId, studentName) {
    var item = this._medData.find(function(r){ return r.id == studentId; });
    var med = item ? item.med : null;
    document.getElementById('medf-sid').value = studentId;
    document.getElementById('medf-allergies').value = med ? (med['\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA']||'') : '';
    document.getElementById('medf-meds').value = med ? (med['\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA']||'') : '';
    document.getElementById('medf-notes').value = med ? (med['\u05D4\u05E2\u05E8\u05D5\u05EA']||'') : '';
    new bootstrap.Modal(document.getElementById('med-modal')).show();
  },
  async saveMedical() {
    var sid = document.getElementById('medf-sid').value;
    var row = {'\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': sid, '\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA': document.getElementById('medf-allergies').value.trim(), '\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA': document.getElementById('medf-meds').value.trim(), '\u05D4\u05E2\u05E8\u05D5\u05EA': document.getElementById('medf-notes').value.trim()};
    var item = this._medData.find(function(r){ return r.id == sid; });
    var existing = item ? item.med : null;
    try {
      if (existing && (existing.id || existing['\u05DE\u05D6\u05D4\u05D4'])) {
        await App.apiCall('update', '\u05DE\u05D9\u05D3\u05E2_\u05E8\u05E4\u05D5\u05D0\u05D9', { id: existing.id || existing['\u05DE\u05D6\u05D4\u05D4'], row: row });
      } else {
        await App.apiCall('add', '\u05DE\u05D9\u05D3\u05E2_\u05E8\u05E4\u05D5\u05D0\u05D9', { row: row });
      }
      bootstrap.Modal.getInstance(document.getElementById('med-modal')).hide();
      Utils.toast('\u05E0\u05E9\u05DE\u05E8');
      this.medicalInit();
    } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4', 'danger'); }
  },


  /* ======================================================================
     SCHEDULE (WEEKLY GRID)
     ====================================================================== */
  schedule() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-table me-2"></i>\u05DE\u05E2\u05E8\u05DB\u05EA \u05E9\u05E2\u05D5\u05EA</h1></div><div class="d-flex gap-2"><select class="form-select form-select-sm" id="sch-class" style="width:150px"><option value="">\u05DB\u05DC \u05D4\u05DB\u05D9\u05EA\u05D5\u05EA</option></select><button class="btn btn-primary btn-sm" onclick="Pages.showAddLesson()"><i class="bi bi-plus-lg me-1"></i>\u05E9\u05D9\u05E2\u05D5\u05E8</button></div></div><div id="sch-grid" class="card p-0 overflow-auto">${Utils.skeleton(3)}</div><div class="modal fade" id="sch-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">\u05E9\u05D9\u05E2\u05D5\u05E8 \u05D7\u05D3\u05E9</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row g-3"><div class="col-6"><label class="form-label">\u05D9\u05D5\u05DD</label><select class="form-select" id="schf-day"><option>\u05E8\u05D0\u05E9\u05D5\u05DF</option><option>\u05E9\u05E0\u05D9</option><option>\u05E9\u05DC\u05D9\u05E9\u05D9</option><option>\u05E8\u05D1\u05D9\u05E2\u05D9</option><option>\u05D7\u05DE\u05D9\u05E9\u05D9</option><option>\u05E9\u05D9\u05E9\u05D9</option></select></div><div class="col-6"><label class="form-label">\u05E9\u05E2\u05D4</label><select class="form-select" id="schf-hour">${[1,2,3,4,5,6,7,8].map(h=>`<option>\u05E9\u05E2\u05D4 ${h}</option>`).join('')}</select></div><div class="col-6"><label class="form-label">\u05DE\u05E7\u05E6\u05D5\u05E2</label><input class="form-control" id="schf-subject"></div><div class="col-6"><label class="form-label">\u05DE\u05DC\u05DE\u05D3</label><input class="form-control" id="schf-teacher"></div><div class="col-6"><label class="form-label">\u05DB\u05D9\u05EA\u05D4</label><input class="form-control" id="schf-class"></div><div class="col-6"><label class="form-label">\u05D7\u05D3\u05E8</label><input class="form-control" id="schf-room"></div></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveLesson()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
  },
  _schData: [],
  scheduleInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    this._schData = _gc('\u05DE\u05E2\u05E8\u05DB\u05EA_\u05E9\u05E2\u05D5\u05EA');
    const classes = [...new Set(this._schData.map(l=>l['\u05DB\u05D9\u05EA\u05D4']).filter(Boolean))].sort();
    const sel = document.getElementById('sch-class');
    classes.forEach(c => sel.insertAdjacentHTML('beforeend',`<option value="${c}">${c}</option>`));
    sel.addEventListener('change', () => this.renderSchedule());
    this.renderSchedule();
  },
  renderSchedule() {
    const clsF = document.getElementById('sch-class')?.value||'';
    const filtered = clsF ? this._schData.filter(l=>(l['\u05DB\u05D9\u05EA\u05D4']||'')===clsF) : this._schData;
    const days = ['\u05E8\u05D0\u05E9\u05D5\u05DF','\u05E9\u05E0\u05D9','\u05E9\u05DC\u05D9\u05E9\u05D9','\u05E8\u05D1\u05D9\u05E2\u05D9','\u05D7\u05DE\u05D9\u05E9\u05D9','\u05E9\u05D9\u05E9\u05D9'];
    const hours = ['\u05E9\u05E2\u05D4 1','\u05E9\u05E2\u05D4 2','\u05E9\u05E2\u05D4 3','\u05E9\u05E2\u05D4 4','\u05E9\u05E2\u05D4 5','\u05E9\u05E2\u05D4 6','\u05E9\u05E2\u05D4 7','\u05E9\u05E2\u05D4 8'];
    let html = '<table class="table table-sm table-bordered mb-0" style="font-size:.8rem"><thead><tr><th class="text-center" style="width:80px">\u05E9\u05E2\u05D4</th>';
    days.forEach(d => html+=`<th class="text-center">${d}</th>`);
    html += '</tr></thead><tbody>';
    hours.forEach(h => {
      html += `<tr><td class="fw-bold text-center bg-light">${h}</td>`;
      days.forEach(d => {
        const lesson = filtered.find(l => (l['\u05D9\u05D5\u05DD']||'')===d && (l['\u05E9\u05E2\u05D4']||'')===h);
        if (lesson) {
          const colors = ['#e3f2fd','#e8f5e9','#fff3e0','#fce4ec','#f3e5f5','#e0f2f1'];
          const bg = colors[Math.abs((lesson['\u05DE\u05E7\u05E6\u05D5\u05E2']||'').charCodeAt(0))%colors.length];
          html += `<td class="schedule-cell" style="background:${bg}"><div class="fw-bold">${lesson['\u05DE\u05E7\u05E6\u05D5\u05E2']||''}</div><div class="text-muted" style="font-size:.7rem">${lesson['\u05DE\u05DC\u05DE\u05D3']||''}</div>${lesson['\u05D7\u05D3\u05E8']?`<span class="badge bg-secondary">${lesson['\u05D7\u05D3\u05E8']}</span>`:''}<button class="btn btn-outline-danger p-0 border-0" style="font-size:.6rem" onclick="Pages.deleteLesson('${lesson.id||lesson['\u05DE\u05D6\u05D4\u05D4']}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-x-circle"></i></button></td>`;
        } else {
          html += '<td class="schedule-cell text-center text-muted">-</td>';
        }
      });
      html += '</tr>';
    });
    html += '</tbody></table>';
    document.getElementById('sch-grid').innerHTML = html;
  },
  showAddLesson() { new bootstrap.Modal(document.getElementById('sch-modal')).show(); },
  async saveLesson() {
    const row = {'\u05D9\u05D5\u05DD':document.getElementById('schf-day').value,'\u05E9\u05E2\u05D4':document.getElementById('schf-hour').value,'\u05DE\u05E7\u05E6\u05D5\u05E2':document.getElementById('schf-subject').value.trim(),'\u05DE\u05DC\u05DE\u05D3':document.getElementById('schf-teacher').value.trim(),'\u05DB\u05D9\u05EA\u05D4':document.getElementById('schf-class').value.trim(),'\u05D7\u05D3\u05E8':document.getElementById('schf-room').value.trim()};
    if (!row['\u05DE\u05E7\u05E6\u05D5\u05E2']) { Utils.toast('\u05D7\u05E1\u05E8 \u05DE\u05E7\u05E6\u05D5\u05E2','warning'); return; }
    try { await App.apiCall('add','\u05DE\u05E2\u05E8\u05DB\u05EA_\u05E9\u05E2\u05D5\u05EA',{row}); bootstrap.Modal.getInstance(document.getElementById('sch-modal')).hide(); Utils.toast('\u05E9\u05D9\u05E2\u05D5\u05E8 \u05E0\u05D5\u05E1\u05E3'); this.scheduleInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },
  async deleteLesson(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05D4','\u05DC\u05DE\u05D7\u05D5\u05E7 \u05E9\u05D9\u05E2\u05D5\u05E8 \u05D6\u05D4?')) return;
    try { await App.apiCall('delete','\u05DE\u05E2\u05E8\u05DB\u05EA_\u05E9\u05E2\u05D5\u05EA',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.scheduleInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },
});
