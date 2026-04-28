/* ===== BHT v5.4 — Transport (Full Upgrade) ===== */
Object.assign(Pages, {

  /* ======================================================================
     DEMO DATA
     ====================================================================== */
  _transportDrivers: [
    { id:'d1', name:'משה כהן',     phone:'0521234567', license:'7654321', licenseExpiry:'2027-08-15', vehicle:'מיניבוס מרצדס', vehicleNum:'12-345-67', seats:16, notes:'ותיק, 10 שנות ניסיון' },
    { id:'d2', name:'אברהם לוי',   phone:'0539876543', license:'1234567', licenseExpiry:'2026-12-01', vehicle:'מיניבוס פולקסווגן', vehicleNum:'23-456-78', seats:20, notes:'רישיון D' },
    { id:'d3', name:'דוד פרידמן',   phone:'0547654321', license:'9876543', licenseExpiry:'2027-03-20', vehicle:'אוטובוס זעיר', vehicleNum:'34-567-89', seats:24, notes:'גם מכונאי מוסמך' }
  ],

  _transportRoutes: [

    { id:'r1', name:'קו 1 — רמת בית שמש א\'', driverId:'d1', time:'07:15', color:'primary',
      stops:['רח\' נחל לכיש 12','רח\' נחל שורק 5','רח\' הרב עובדיה 8','כיכר הדקל','רח\' נחל אילון 3'] },
    { id:'r2', name:'קו 2 — רמת בית שמש ב\'', driverId:'d2', time:'07:20', color:'success',
      stops:['רח\' אלון 15','רח\' ברוש 7','כיכר המייסדים','רח\' תמר 22','רח\' ערבה 9'] },
    { id:'r3', name:'קו 3 — בית שמש ישנה', driverId:'d3', time:'07:10', color:'warning',
      stops:['רח\' הרצל 30','רח\' יפו 14','רח\' הרב קוק 6','רח\' בן גוריון 18','כיכר העיר','רח\' דוד המלך 2'] }
  ],

  _transportStudents() {
    const classes = ['א','ב','ג','ד','ה','ו'];
    const students = [

      { id:'s1',  name:'יוסף כהן',       klass:'א', routeId:'r1', stopIdx:0 },
      { id:'s2',  name:'משה לוי',        klass:'א', routeId:'r1', stopIdx:1 },
      { id:'s3',  name:'אברהם יצחקי',    klass:'א', routeId:'r1', stopIdx:2 }
  ];
    return students;
  },

  /* ======================================================================
     HELPERS
     ====================================================================== */
  _trGetDriver(driverId) {
    return this._transportDrivers.find(d => d.id === driverId);
  },

  _trStudentsForRoute(routeId) {
    return this._transportStudents().filter(s => s.routeId === routeId);
  },

  _trAllStudents() {
    return this._transportStudents();
  },

  _trRouteStudentCount(routeId) {
    return this._trStudentsForRoute(routeId).length;
  },

  _trTotalTransported() {
    return this._trAllStudents().length;
  },

  _trTotalSeats() {
    return this._transportDrivers.reduce((s, d) => s + d.seats, 0);
  },

  _trAvailableSeats() {
    return this._trTotalSeats() - this._trTotalTransported();
  },

  /* ======================================================================
     STATS CARDS
     ====================================================================== */
  _trStatsHTML() {
    const totalRoutes = this._transportRoutes.length;
    const totalStudents = this._trTotalTransported();
    const available = this._trAvailableSeats();
    const totalDrivers = this._transportDrivers.length;
    const occupancy = Math.round((totalStudents / this._trTotalSeats()) * 100);

    return `
    <div class="row g-3 mb-4">
      <div class="col-6 col-md-3">
        <div class="card text-center p-3 border-primary border-opacity-25">
          <div class="fs-2 fw-bold text-primary">${totalRoutes}</div>
          <div class="small text-muted"><i class="bi bi-signpost-2 me-1"></i>קווים פעילים</div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card text-center p-3 border-success border-opacity-25">
          <div class="fs-2 fw-bold text-success">${totalStudents}</div>
          <div class="small text-muted"><i class="bi bi-people me-1"></i>תלמידים מוסעים</div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card text-center p-3 border-warning border-opacity-25">
          <div class="fs-2 fw-bold text-warning">${available}</div>
          <div class="small text-muted"><i class="bi bi-box-arrow-in-down me-1"></i>מקומות פנויים</div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card text-center p-3 border-info border-opacity-25">
          <div class="fs-2 fw-bold text-info">${totalDrivers}</div>
          <div class="small text-muted"><i class="bi bi-person-vcard me-1"></i>נהגים</div>
        </div>
      </div>
    </div>
    <div class="mb-4">
      <div class="d-flex justify-content-between small mb-1">
        <span>תפוסה כללית</span><span class="fw-bold">${occupancy}%</span>
      </div>
      <div class="progress" style="height:8px">
        <div class="progress-bar bg-${occupancy > 85 ? 'danger' : occupancy > 60 ? 'warning' : 'success'}" style="width:${occupancy}%"></div>
      </div>
    </div>`;
  },

  /* ======================================================================
     ROUTE CARDS
     ====================================================================== */
  _trRouteCardsHTML() {
    return this._transportRoutes.map(route => {
      const driver = this._trGetDriver(route.driverId);
      const students = this._trStudentsForRoute(route.id);
      const count = students.length;
      const seats = driver ? driver.seats : 0;
      const pct = seats ? Math.round((count / seats) * 100) : 0;
      const barColor = pct > 85 ? 'danger' : pct > 60 ? 'warning' : 'success';

      // Group students by class
      const byClass = {};
      students.forEach(s => { (byClass[s.klass] = byClass[s.klass] || []).push(s); });

      const stopsHTML = route.stops.map((stop, i) => {
        const atStop = students.filter(s => s.stopIdx === i);
        return `<div class="d-flex align-items-start gap-2 py-1 ${i < route.stops.length - 1 ? 'border-bottom border-opacity-25' : ''}">
          <span class="badge bg-${route.color} bg-opacity-75 rounded-circle" style="width:22px;height:22px;line-height:22px;font-size:.7rem">${i + 1}</span>
          <div class="flex-grow-1">
            <div class="small fw-semibold">${stop}</div>
            ${atStop.length ? `<div class="text-muted" style="font-size:.75rem">${atStop.map(s => s.name).join(', ')}</div>` : ''}
          </div>
          <span class="badge bg-light text-dark" style="font-size:.7rem">${atStop.length} <i class="bi bi-person-fill"></i></span>
        </div>`;
      }).join('');

      const classChips = Object.keys(byClass).sort().map(k =>
        `<span class="badge bg-light text-dark border me-1 mb-1">${k}' (${byClass[k].length})</span>`
      ).join('');

      return `
      <div class="col-md-6 col-xl-6">
        <div class="card h-100 shadow-sm transport-route-card" data-route="${route.id}">
          <div class="card-header bg-${route.color} bg-opacity-10 d-flex justify-content-between align-items-center py-2">
            <h6 class="mb-0 fw-bold"><i class="bi bi-bus-front text-${route.color} me-2"></i>${route.name}</h6>
            <div class="d-flex gap-1">
              <button class="btn btn-sm btn-outline-${route.color} py-0 px-2" onclick="Pages.trEditRoute('${route.id}')" title="ערוך קו"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-sm btn-outline-danger py-0 px-2" onclick="Pages.trDeleteRoute('${route.id}')" title="מחק קו"><i class="bi bi-trash"></i></button>
            </div>
          </div>
          <div class="card-body pb-2">
            <!-- Driver + Time -->
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div class="small">
                <i class="bi bi-person-fill text-${route.color} me-1"></i><strong>${driver ? driver.name : '---'}</strong>
                ${driver ? `<a href="tel:${driver.phone}" class="ms-2 text-decoration-none"><i class="bi bi-telephone-fill text-success"></i></a>` : ''}
              </div>
              <span class="badge bg-${route.color} bg-opacity-75"><i class="bi bi-clock me-1"></i>${route.time}</span>
            </div>

            <!-- Vehicle -->
            ${driver ? `<div class="small text-muted mb-2"><i class="bi bi-truck me-1"></i>${driver.vehicle} | <span class="fw-semibold">${driver.vehicleNum}</span></div>` : ''}

            <!-- Capacity bar -->
            <div class="mb-2">
              <div class="d-flex justify-content-between small mb-1">
                <span>${count} / ${seats} מקומות</span>
                <span class="fw-bold text-${barColor}">${pct}%</span>
              </div>
              <div class="progress" style="height:6px">
                <div class="progress-bar bg-${barColor}" style="width:${pct}%"></div>
              </div>
            </div>

            <!-- Class breakdown -->
            <div class="mb-2">${classChips}</div>

            <!-- Stops -->
            <div class="border rounded p-2 bg-light bg-opacity-50" style="max-height:200px;overflow-y:auto">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <small class="fw-bold text-muted"><i class="bi bi-geo-alt me-1"></i>${route.stops.length} תחנות</small>
                <button class="btn btn-sm btn-link p-0 text-${route.color}" onclick="Pages.trEditStops('${route.id}')"><i class="bi bi-pencil-square"></i> ערוך</button>
              </div>
              ${stopsHTML}
            </div>
          </div>
          <div class="card-footer bg-transparent py-2 d-flex gap-2">
            <button class="btn btn-sm btn-outline-primary flex-fill" onclick="Pages.trAssignStudents('${route.id}')"><i class="bi bi-person-plus me-1"></i>שיוך תלמידים</button>
            <button class="btn btn-sm btn-outline-secondary" onclick="Pages.trShowRouteStudents('${route.id}')"><i class="bi bi-list-ul me-1"></i>רשימה</button>
          </div>
        </div>
      </div>`;
    }).join('');
  },

  /* ======================================================================
     DRIVER DIRECTORY
     ====================================================================== */
  _trDriverDirectoryHTML() {
    return `
    <div class="card shadow-sm mb-4">
      <div class="card-header bg-info bg-opacity-10 d-flex justify-content-between align-items-center">
        <h6 class="mb-0 fw-bold"><i class="bi bi-person-vcard me-2 text-info"></i>מאגר נהגים</h6>
        <button class="btn btn-sm btn-info" onclick="Pages.trAddDriver()"><i class="bi bi-plus-lg me-1"></i>הוסף נהג</button>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0 align-middle">
            <thead class="table-light">
              <tr>
                <th>שם</th><th>טלפון</th><th>רישיון</th><th>תוקף רישיון</th><th>רכב</th><th>לוחית</th><th>מקומות</th><th>קו משויך</th><th>פעולות</th>
              </tr>
            </thead>
            <tbody>
              ${this._transportDrivers.map(d => {
                const route = this._transportRoutes.find(r => r.driverId === d.id);
                const expDate = new Date(d.licenseExpiry);
                const now = new Date();
                const daysLeft = Math.ceil((expDate - now) / 86400000);
                const expBadge = daysLeft < 90 ? 'danger' : daysLeft < 180 ? 'warning' : 'success';
                return `<tr>
                  <td><div class="d-flex align-items-center gap-2">
                    <div class="rounded-circle bg-info bg-opacity-25 text-info d-flex align-items-center justify-content-center" style="width:36px;height:36px;font-size:.85rem;font-weight:700">${d.name.split(' ').map(w=>w[0]).join('')}</div>
                    <div><div class="fw-semibold">${d.name}</div><div class="text-muted" style="font-size:.75rem">${d.notes}</div></div>
                  </div></td>
                  <td><a href="tel:${d.phone}" class="text-decoration-none">${d.phone}</a></td>
                  <td><code>${d.license}</code></td>
                  <td><span class="badge bg-${expBadge}">${d.licenseExpiry}</span></td>
                  <td>${d.vehicle}</td>
                  <td><code>${d.vehicleNum}</code></td>
                  <td><span class="badge bg-secondary">${d.seats}</span></td>
                  <td>${route ? `<span class="badge bg-${route.color}">${route.name}</span>` : '<span class="text-muted">—</span>'}</td>
                  <td>
                    <button class="btn btn-sm btn-outline-info py-0 px-1" onclick="Pages.trEditDriver('${d.id}')" title="ערוך"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-outline-danger py-0 px-1" onclick="Pages.trDeleteDriver('${d.id}')" title="מחק"><i class="bi bi-trash"></i></button>
                  </td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
  },

  /* ======================================================================
     MAIN PAGE HTML
     ====================================================================== */
  transport() {
    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div>
        <h1><i class="bi bi-bus-front-fill me-2"></i>הסעות</h1>
        <p class="text-muted mb-0">ניהול קווי הסעה, נהגים ושיוך תלמידים</p>
      </div>
      <div class="d-flex gap-2 flex-wrap">
        <button class="btn btn-primary btn-sm" onclick="Pages.trAddRoute()"><i class="bi bi-plus-lg me-1"></i>קו חדש</button>
        <button class="btn btn-outline-info btn-sm" onclick="Pages.trToggleDrivers()"><i class="bi bi-person-vcard me-1"></i>נהגים</button>
        <button class="btn btn-outline-secondary btn-sm" onclick="Pages.trExportCSV()"><i class="bi bi-download me-1"></i>ייצוא</button>
      </div>
    </div>

    <!-- Stats -->
    ${this._trStatsHTML()}

    <!-- Tabs -->
    <ul class="nav nav-tabs mb-3" id="trTabs">
      <li class="nav-item"><a class="nav-link active" href="#" onclick="Pages.trSwitchTab('routes',this);return false"><i class="bi bi-signpost-2 me-1"></i>קווים</a></li>
      <li class="nav-item"><a class="nav-link" href="#" onclick="Pages.trSwitchTab('drivers',this);return false"><i class="bi bi-person-vcard me-1"></i>נהגים</a></li>
      <li class="nav-item"><a class="nav-link" href="#" onclick="Pages.trSwitchTab('students',this);return false"><i class="bi bi-people me-1"></i>תלמידים</a></li>
    </ul>

    <!-- Tab Content -->
    <div id="trTabContent">
      <div id="trTabRoutes">
        <div class="row g-3">${this._trRouteCardsHTML()}</div>
      </div>
      <div id="trTabDrivers" style="display:none">${this._trDriverDirectoryHTML()}</div>
      <div id="trTabStudents" style="display:none">${this._trStudentListHTML()}</div>
    </div>

    <!-- Route Modal -->
    <div class="modal fade" id="trRouteModal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
      <div class="modal-header bg-primary bg-opacity-10">
        <h5 class="modal-title" id="trRouteModalTitle"><i class="bi bi-signpost-2 me-2"></i>קו חדש</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="trRouteEditId">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label fw-semibold">שם הקו</label>
            <input type="text" class="form-control" id="trRouteName" placeholder="לדוגמה: קו 5 — שכונה">
          </div>
          <div class="col-md-3">
            <label class="form-label fw-semibold">שעת יציאה</label>
            <input type="time" class="form-control" id="trRouteTime" value="07:15">
          </div>
          <div class="col-md-3">
            <label class="form-label fw-semibold">נהג</label>
            <select class="form-select" id="trRouteDriver">
              <option value="">בחר נהג...</option>
            </select>
          </div>
          <div class="col-12">
            <label class="form-label fw-semibold"><i class="bi bi-geo-alt me-1"></i>תחנות (אחת בכל שורה, לפי סדר)</label>
            <textarea class="form-control" id="trRouteStops" rows="5" placeholder="רח' הרצל 10&#10;רח' יפו 5&#10;כיכר העיר"></textarea>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">ביטול</button>
        <button class="btn btn-primary" onclick="Pages.trSaveRoute()"><i class="bi bi-check-lg me-1"></i>שמור</button>
      </div>
    </div></div></div>

    <!-- Driver Modal -->
    <div class="modal fade" id="trDriverModal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header bg-info bg-opacity-10">
        <h5 class="modal-title" id="trDriverModalTitle"><i class="bi bi-person-vcard me-2"></i>נהג חדש</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="trDriverEditId">
        <div class="row g-3">
          <div class="col-md-6"><label class="form-label fw-semibold">שם מלא</label><input type="text" class="form-control" id="trDriverName"></div>
          <div class="col-md-6"><label class="form-label fw-semibold">טלפון</label><input type="tel" class="form-control" id="trDriverPhone"></div>
          <div class="col-md-6"><label class="form-label fw-semibold">מספר רישיון</label><input type="text" class="form-control" id="trDriverLicense"></div>
          <div class="col-md-6"><label class="form-label fw-semibold">תוקף רישיון</label><input type="date" class="form-control" id="trDriverLicenseExp"></div>
          <div class="col-md-6"><label class="form-label fw-semibold">סוג רכב</label><input type="text" class="form-control" id="trDriverVehicle"></div>
          <div class="col-md-3"><label class="form-label fw-semibold">לוחית רישוי</label><input type="text" class="form-control" id="trDriverVehicleNum"></div>
          <div class="col-md-3"><label class="form-label fw-semibold">מקומות</label><input type="number" class="form-control" id="trDriverSeats" value="16"></div>
          <div class="col-12"><label class="form-label fw-semibold">הערות</label><input type="text" class="form-control" id="trDriverNotes"></div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">ביטול</button>
        <button class="btn btn-info" onclick="Pages.trSaveDriver()"><i class="bi bi-check-lg me-1"></i>שמור</button>
      </div>
    </div></div></div>

    <!-- Assign Students Modal -->
    <div class="modal fade" id="trAssignModal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
      <div class="modal-header bg-success bg-opacity-10">
        <h5 class="modal-title" id="trAssignModalTitle"><i class="bi bi-person-plus me-2"></i>שיוך תלמידים</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="trAssignRouteId">
        <div class="mb-3">
          <input type="text" class="form-control" id="trAssignSearch" placeholder="חיפוש תלמיד..." oninput="Pages.trFilterAssign()">
        </div>
        <div id="trAssignList"></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">סגור</button>
        <button class="btn btn-success" onclick="Pages.trSaveAssignments()"><i class="bi bi-check-lg me-1"></i>שמור שיוך</button>
      </div>
    </div></div></div>

    <!-- Stops Editor Modal -->
    <div class="modal fade" id="trStopsModal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header bg-warning bg-opacity-10">
        <h5 class="modal-title"><i class="bi bi-geo-alt me-2"></i>עריכת תחנות</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="trStopsRouteId">
        <div id="trStopsList"></div>
        <div class="input-group mt-3">
          <input type="text" class="form-control" id="trNewStop" placeholder="שם תחנה חדשה...">
          <button class="btn btn-warning" onclick="Pages.trAddStop()"><i class="bi bi-plus-lg"></i></button>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">סגור</button>
        <button class="btn btn-warning" onclick="Pages.trSaveStops()"><i class="bi bi-check-lg me-1"></i>שמור</button>
      </div>
    </div></div></div>

    <!-- Route Students List Modal -->
    <div class="modal fade" id="trStudentsListModal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="trStudentsListTitle"><i class="bi bi-list-ul me-2"></i>רשימת תלמידים</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body" id="trStudentsListBody"></div>
    </div></div></div>
    `;
  },

  /* ======================================================================
     STUDENT LIST TAB
     ====================================================================== */
  _trStudentListHTML() {
    const students = this._trAllStudents();
    const classes = [...new Set(students.map(s => s.klass))].sort();

    let html = `
    <div class="mb-3 d-flex gap-2 flex-wrap align-items-center">
      <input type="text" class="form-control form-control-sm" style="max-width:250px" id="trStudentSearch" placeholder="חיפוש תלמיד..." oninput="Pages.trFilterStudentList()">
      <select class="form-select form-select-sm" style="max-width:120px" id="trStudentClassFilter" onchange="Pages.trFilterStudentList()">
        <option value="">כל הכיתות</option>
        ${classes.map(c => `<option value="${c}">כיתה ${c}'</option>`).join('')}
      </select>
      <select class="form-select form-select-sm" style="max-width:180px" id="trStudentRouteFilter" onchange="Pages.trFilterStudentList()">
        <option value="">כל הקווים</option>
        ${this._transportRoutes.map(r => `<option value="${r.id}">${r.name}</option>`).join('')}
      </select>
    </div>
    <div class="table-responsive">
      <table class="table table-hover align-middle mb-0">
        <thead class="table-light">
          <tr><th>#</th><th>שם</th><th>כיתה</th><th>קו</th><th>תחנה</th><th>פעולות</th></tr>
        </thead>
        <tbody id="trStudentListBody">`;

    students.forEach((s, i) => {
      const route = this._transportRoutes.find(r => r.id === s.routeId);
      const stop = route ? (route.stops[s.stopIdx] || '—') : '—';
      html += `<tr class="tr-student-row" data-name="${s.name}" data-class="${s.klass}" data-route="${s.routeId}">
        <td>${i + 1}</td>
        <td><div class="d-flex align-items-center gap-2">
          <div class="rounded-circle bg-primary bg-opacity-25 text-primary d-flex align-items-center justify-content-center" style="width:32px;height:32px;font-size:.8rem;font-weight:700">${s.name.split(' ').map(w=>w[0]).join('')}</div>
          <span class="fw-semibold">${s.name}</span>
        </div></td>
        <td><span class="badge bg-light text-dark border">${s.klass}'</span></td>
        <td>${route ? `<span class="badge bg-${route.color}">${route.name}</span>` : '—'}</td>
        <td class="small">${stop}</td>
        <td><button class="btn btn-sm btn-outline-danger py-0 px-1" onclick="Pages.trUnassignStudent('${s.id}')" title="הסר מקו"><i class="bi bi-x-lg"></i></button></td>
      </tr>`;
    });

    html += `</tbody></table></div>`;
    return html;
  },

  /* ======================================================================
     INIT
     ====================================================================== */
  _transportUseDemo: false,

  transportLoadDemo() {
    this._transportUseDemo = true;
    App.navigate('transport');
  },

  transportInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    // Try API first, fall back to demo/localStorage
    try {
      const apiData = _gc('\u05D4\u05E1\u05E2\u05D5\u05EA');
      if (apiData && apiData.length > 0) {
        if (apiData.drivers) this._transportDrivers = apiData.drivers;
        if (apiData.routes) this._transportRoutes = apiData.routes;
      } else {
        this._trLoadFromStorage();
      }
    } catch (e) {
      this._trLoadFromStorage();
    }
    // Activate first tab by default
    this._trCurrentTab = 'routes';

    // Show empty state if no routes
    if (!this._transportRoutes || !this._transportRoutes.length) {
      const routesContainer = document.querySelector('#trTabRoutes .row');
      if (routesContainer) {
        routesContainer.innerHTML = '<div class="col-12"><div class="card p-5 text-center text-muted">' +
          '<i class="bi bi-bus-front fs-1 d-block mb-2"></i>' +
          '<h5>\u05D0\u05D9\u05DF \u05DE\u05E1\u05DC\u05D5\u05DC\u05D9 \u05D4\u05E1\u05E2\u05D5\u05EA</h5>' +
          '<p>\u05D4\u05D5\u05E1\u05E3 \u05E7\u05D5 \u05D7\u05D3\u05E9 \u05DB\u05D3\u05D9 \u05DC\u05D4\u05EA\u05D7\u05D9\u05DC</p>' +
          '<button class="btn btn-primary btn-sm mt-2" onclick="Pages.trAddRoute()"><i class="bi bi-plus-lg me-1"></i>\u05E7\u05D5 \u05D7\u05D3\u05E9</button>' +
          '</div></div>';
      }
    }
  },

  _trLoadFromStorage() {
    const saved = localStorage.getItem('bht_transport');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.drivers) this._transportDrivers = data.drivers;
        if (data.routes) this._transportRoutes = data.routes;
      } catch (e) { /* use defaults */ }
    }
  },

  _trSaveToStorage() {
    localStorage.setItem('bht_transport', JSON.stringify({
      drivers: this._transportDrivers,
      routes: this._transportRoutes
    }));
  },

  /* ======================================================================
     TAB SWITCHING
     ====================================================================== */
  trSwitchTab(tab, el) {
    document.querySelectorAll('#trTabs .nav-link').forEach(a => a.classList.remove('active'));
    if (el) el.classList.add('active');
    ['routes','drivers','students'].forEach(t => {
      const panel = document.getElementById('trTab' + t.charAt(0).toUpperCase() + t.slice(1));
      if (panel) panel.style.display = t === tab ? '' : 'none';
    });
    this._trCurrentTab = tab;
  },

  trToggleDrivers() {
    const driversTab = document.querySelector('#trTabs .nav-link:nth-child(1)');
    if (this._trCurrentTab === 'drivers') {
      this.trSwitchTab('routes', document.querySelector('#trTabs .nav-item:first-child .nav-link'));
    } else {
      this.trSwitchTab('drivers', document.querySelector('#trTabs .nav-item:nth-child(2) .nav-link'));
    }
  },

  /* ======================================================================
     ROUTE CRUD
     ====================================================================== */
  trAddRoute() {
    document.getElementById('trRouteEditId').value = '';
    document.getElementById('trRouteName').value = '';
    document.getElementById('trRouteTime').value = '07:15';
    document.getElementById('trRouteStops').value = '';
    document.getElementById('trRouteModalTitle').textContent = 'קו חדש';

    // Populate driver select
    const sel = document.getElementById('trRouteDriver');
    sel.innerHTML = '<option value="">בחר נהג...</option>' +
      this._transportDrivers.map(d => `<option value="${d.id}">${d.name} (${d.vehicle})</option>`).join('');

    new bootstrap.Modal(document.getElementById('trRouteModal')).show();
  },

  trEditRoute(routeId) {
    const route = this._transportRoutes.find(r => r.id === routeId);
    if (!route) return;

    document.getElementById('trRouteEditId').value = route.id;
    document.getElementById('trRouteName').value = route.name;
    document.getElementById('trRouteTime').value = route.time;
    document.getElementById('trRouteStops').value = route.stops.join('\n');
    document.getElementById('trRouteModalTitle').textContent = 'עריכת קו — ' + route.name;

    const sel = document.getElementById('trRouteDriver');
    sel.innerHTML = '<option value="">בחר נהג...</option>' +
      this._transportDrivers.map(d => `<option value="${d.id}" ${d.id === route.driverId ? 'selected' : ''}>${d.name} (${d.vehicle})</option>`).join('');

    new bootstrap.Modal(document.getElementById('trRouteModal')).show();
  },

  async trSaveRoute() {
    const editId = document.getElementById('trRouteEditId').value;
    const name = document.getElementById('trRouteName').value.trim();
    const time = document.getElementById('trRouteTime').value;
    const driverId = document.getElementById('trRouteDriver').value;
    const stopsText = document.getElementById('trRouteStops').value.trim();
    const stops = stopsText ? stopsText.split('\n').map(s => s.trim()).filter(Boolean) : [];

    if (!name) { Utils.toast('יש להזין שם קו', 'warning'); return; }
    if (!driverId) { Utils.toast('יש לבחור נהג', 'warning'); return; }

    const colors = ['primary','success','warning','info','danger','secondary'];

    if (editId) {
      const route = this._transportRoutes.find(r => r.id === editId);
      if (route) {
        route.name = name;
        route.time = time;
        route.driverId = driverId;
        route.stops = stops;
        try { await App.apiCall('update', '\u05D4\u05E1\u05E2\u05D5\u05EA', { id: editId, row: route }); } catch (e) { /* localStorage fallback below */ }
        Utils.toast('הקו עודכן בהצלחה', 'success');
      }
    } else {
      const newRoute = {
        id: 'r' + (Date.now()), name, driverId, time,
        color: colors[this._transportRoutes.length % colors.length],
        stops
      };
      this._transportRoutes.push(newRoute);
      try { await App.apiCall('add', '\u05D4\u05E1\u05E2\u05D5\u05EA', { row: newRoute }); } catch (e) { /* localStorage fallback below */ }
      Utils.toast('קו חדש נוסף בהצלחה', 'success');
    }

    this._trSaveToStorage();
    bootstrap.Modal.getInstance(document.getElementById('trRouteModal'))?.hide();
    this._trRefresh();
  },

  async trDeleteRoute(routeId) {
    const route = this._transportRoutes.find(r => r.id === routeId);
    if (!route) return;
    if (!await Utils.confirm("מחיקה", `למחוק את "${route.name}"?`)) return;

    const idx = this._transportRoutes.indexOf(route);
    this._transportRoutes.splice(idx, 1);
    try { await App.apiCall('delete', '\u05D4\u05E1\u05E2\u05D5\u05EA', { id: routeId }); } catch (e) { /* localStorage fallback below */ }
    this._trSaveToStorage();
    Utils.toast('הקו נמחק', 'info');
    this._trRefresh();
  },

  /* ======================================================================
     DRIVER CRUD
     ====================================================================== */
  trAddDriver() {
    document.getElementById('trDriverEditId').value = '';
    document.getElementById('trDriverName').value = '';
    document.getElementById('trDriverPhone').value = '';
    document.getElementById('trDriverLicense').value = '';
    document.getElementById('trDriverLicenseExp').value = '';
    document.getElementById('trDriverVehicle').value = '';
    document.getElementById('trDriverVehicleNum').value = '';
    document.getElementById('trDriverSeats').value = '16';
    document.getElementById('trDriverNotes').value = '';
    document.getElementById('trDriverModalTitle').textContent = 'נהג חדש';
    new bootstrap.Modal(document.getElementById('trDriverModal')).show();
  },

  trEditDriver(driverId) {
    const d = this._transportDrivers.find(x => x.id === driverId);
    if (!d) return;
    document.getElementById('trDriverEditId').value = d.id;
    document.getElementById('trDriverName').value = d.name;
    document.getElementById('trDriverPhone').value = d.phone;
    document.getElementById('trDriverLicense').value = d.license;
    document.getElementById('trDriverLicenseExp').value = d.licenseExpiry;
    document.getElementById('trDriverVehicle').value = d.vehicle;
    document.getElementById('trDriverVehicleNum').value = d.vehicleNum;
    document.getElementById('trDriverSeats').value = d.seats;
    document.getElementById('trDriverNotes').value = d.notes;
    document.getElementById('trDriverModalTitle').textContent = 'עריכת נהג — ' + d.name;
    new bootstrap.Modal(document.getElementById('trDriverModal')).show();
  },

  async trSaveDriver() {
    const editId = document.getElementById('trDriverEditId').value;
    const name = document.getElementById('trDriverName').value.trim();
    const phone = document.getElementById('trDriverPhone').value.trim();
    const license = document.getElementById('trDriverLicense').value.trim();
    const licenseExpiry = document.getElementById('trDriverLicenseExp').value;
    const vehicle = document.getElementById('trDriverVehicle').value.trim();
    const vehicleNum = document.getElementById('trDriverVehicleNum').value.trim();
    const seats = parseInt(document.getElementById('trDriverSeats').value) || 16;
    const notes = document.getElementById('trDriverNotes').value.trim();

    if (!name || !phone) { Utils.toast('יש להזין שם וטלפון', 'warning'); return; }

    if (editId) {
      const d = this._transportDrivers.find(x => x.id === editId);
      if (d) {
        Object.assign(d, { name, phone, license, licenseExpiry, vehicle, vehicleNum, seats, notes });
        try { await App.apiCall('update', '\u05D4\u05E1\u05E2\u05D5\u05EA', { id: editId, row: d }); } catch (e) { /* localStorage fallback */ }
        Utils.toast('הנהג עודכן בהצלחה', 'success');
      }
    } else {
      const newDriver = { id: 'd' + Date.now(), name, phone, license, licenseExpiry, vehicle, vehicleNum, seats, notes };
      this._transportDrivers.push(newDriver);
      try { await App.apiCall('add', '\u05D4\u05E1\u05E2\u05D5\u05EA', { row: newDriver }); } catch (e) { /* localStorage fallback */ }
      Utils.toast('נהג חדש נוסף בהצלחה', 'success');
    }

    this._trSaveToStorage();
    bootstrap.Modal.getInstance(document.getElementById('trDriverModal'))?.hide();
    this._trRefresh();
  },

  async trDeleteDriver(driverId) {
    const d = this._transportDrivers.find(x => x.id === driverId);
    if (!d) return;
    if (!await Utils.confirm("מחיקה", `למחוק את הנהג "${d.name}"?`)) return;

    const idx = this._transportDrivers.indexOf(d);
    this._transportDrivers.splice(idx, 1);
    try { await App.apiCall('delete', '\u05D4\u05E1\u05E2\u05D5\u05EA', { id: driverId }); } catch (e) { /* localStorage fallback */ }
    this._trSaveToStorage();
    Utils.toast('הנהג נמחק', 'info');
    this._trRefresh();
  },

  /* ======================================================================
     STOP MANAGEMENT
     ====================================================================== */
  trEditStops(routeId) {
    const route = this._transportRoutes.find(r => r.id === routeId);
    if (!route) return;

    document.getElementById('trStopsRouteId').value = routeId;
    this._trRenderStopsList(route.stops);
    new bootstrap.Modal(document.getElementById('trStopsModal')).show();
  },

  _trRenderStopsList(stops) {
    const container = document.getElementById('trStopsList');
    container.innerHTML = stops.map((stop, i) => `
      <div class="d-flex align-items-center gap-2 py-2 ${i < stops.length - 1 ? 'border-bottom' : ''}" data-idx="${i}">
        <span class="badge bg-secondary rounded-circle" style="width:24px;height:24px;line-height:24px">${i + 1}</span>
        <input type="text" class="form-control form-control-sm tr-stop-input" value="${stop}">
        <button class="btn btn-sm btn-outline-secondary py-0" onclick="Pages.trMoveStop(${i},-1)" ${i === 0 ? 'disabled' : ''}><i class="bi bi-arrow-up"></i></button>
        <button class="btn btn-sm btn-outline-secondary py-0" onclick="Pages.trMoveStop(${i},1)" ${i === stops.length - 1 ? 'disabled' : ''}><i class="bi bi-arrow-down"></i></button>
        <button class="btn btn-sm btn-outline-danger py-0" onclick="Pages.trRemoveStop(${i})"><i class="bi bi-x-lg"></i></button>
      </div>
    `).join('');
  },

  _trGetCurrentStops() {
    return [...document.querySelectorAll('.tr-stop-input')].map(el => el.value.trim()).filter(Boolean);
  },

  trAddStop() {
    const input = document.getElementById('trNewStop');
    const val = input.value.trim();
    if (!val) return;

    const stops = this._trGetCurrentStops();
    stops.push(val);
    this._trRenderStopsList(stops);
    input.value = '';
  },

  trRemoveStop(idx) {
    const stops = this._trGetCurrentStops();
    stops.splice(idx, 1);
    this._trRenderStopsList(stops);
  },

  trMoveStop(idx, dir) {
    const stops = this._trGetCurrentStops();
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= stops.length) return;
    [stops[idx], stops[newIdx]] = [stops[newIdx], stops[idx]];
    this._trRenderStopsList(stops);
  },

  async trSaveStops() {
    const routeId = document.getElementById('trStopsRouteId').value;
    const route = this._transportRoutes.find(r => r.id === routeId);
    if (!route) return;

    route.stops = this._trGetCurrentStops();
    try { await App.apiCall('update', '\u05D4\u05E1\u05E2\u05D5\u05EA', { id: routeId, row: route }); } catch (e) { /* localStorage fallback */ }
    this._trSaveToStorage();
    Utils.toast('התחנות עודכנו', 'success');
    bootstrap.Modal.getInstance(document.getElementById('trStopsModal'))?.hide();
    this._trRefresh();
  },

  /* ======================================================================
     STUDENT ASSIGNMENT
     ====================================================================== */
  trAssignStudents(routeId) {
    const route = this._transportRoutes.find(r => r.id === routeId);
    if (!route) return;

    document.getElementById('trAssignRouteId').value = routeId;
    document.getElementById('trAssignModalTitle').innerHTML = `<i class="bi bi-person-plus me-2"></i>שיוך תלמידים — ${route.name}`;
    document.getElementById('trAssignSearch').value = '';

    this._trRenderAssignList(routeId);
    new bootstrap.Modal(document.getElementById('trAssignModal')).show();
  },

  _trRenderAssignList(routeId) {
    const allStudents = this._trAllStudents();
    const classes = [...new Set(allStudents.map(s => s.klass))].sort();
    const container = document.getElementById('trAssignList');

    let html = '';
    classes.forEach(klass => {
      const classStudents = allStudents.filter(s => s.klass === klass);
      html += `<div class="mb-3 tr-assign-class" data-class="${klass}">
        <h6 class="fw-bold border-bottom pb-1 mb-2">כיתה ${klass}'</h6>
        <div class="row g-2">`;
      classStudents.forEach(s => {
        const checked = s.routeId === routeId ? 'checked' : '';
        const otherRoute = s.routeId && s.routeId !== routeId ? this._transportRoutes.find(r => r.id === s.routeId) : null;
        html += `<div class="col-md-6 tr-assign-item" data-name="${s.name}">
          <div class="form-check border rounded p-2 ${checked ? 'bg-success bg-opacity-10 border-success' : ''}">
            <input class="form-check-input" type="checkbox" value="${s.id}" id="trAssign_${s.id}" ${checked}
              onchange="this.closest('.form-check').classList.toggle('bg-success',this.checked);this.closest('.form-check').classList.toggle('bg-opacity-10',this.checked);this.closest('.form-check').classList.toggle('border-success',this.checked)">
            <label class="form-check-label w-100" for="trAssign_${s.id}">
              <span class="fw-semibold">${s.name}</span>
              ${otherRoute ? `<span class="badge bg-${otherRoute.color} bg-opacity-50 ms-1" style="font-size:.65rem">${otherRoute.name}</span>` : ''}
            </label>
          </div>
        </div>`;
      });
      html += `</div></div>`;
    });

    container.innerHTML = html;
  },

  trFilterAssign() {
    const q = document.getElementById('trAssignSearch').value.trim().toLowerCase();
    document.querySelectorAll('.tr-assign-item').forEach(el => {
      el.style.display = !q || el.dataset.name.toLowerCase().includes(q) ? '' : 'none';
    });
  },

  trSaveAssignments() {
    const routeId = document.getElementById('trAssignRouteId').value;
    const checked = [...document.querySelectorAll('#trAssignList input[type=checkbox]')];

    // For demo purposes, just toast — in real app, this would persist to DB
    const assigned = checked.filter(c => c.checked).length;
    Utils.toast(`${assigned} תלמידים שויכו לקו`, 'success');
    bootstrap.Modal.getInstance(document.getElementById('trAssignModal'))?.hide();
  },

  trShowRouteStudents(routeId) {
    const route = this._transportRoutes.find(r => r.id === routeId);
    if (!route) return;

    const students = this._trStudentsForRoute(routeId);
    document.getElementById('trStudentsListTitle').innerHTML = `<i class="bi bi-list-ul me-2"></i>${route.name}`;

    let html = `<div class="table-responsive"><table class="table table-sm table-hover align-middle mb-0">
      <thead class="table-light"><tr><th>#</th><th>שם</th><th>כיתה</th><th>תחנה</th></tr></thead><tbody>`;
    students.forEach((s, i) => {
      const stop = route.stops[s.stopIdx] || '—';
      html += `<tr><td>${i+1}</td><td class="fw-semibold">${s.name}</td><td><span class="badge bg-light text-dark border">${s.klass}'</span></td><td class="small">${stop}</td></tr>`;
    });
    html += `</tbody></table></div>`;
    if (!students.length) html = '<div class="text-center text-muted py-4"><i class="bi bi-people fs-1 d-block mb-2"></i>אין תלמידים משויכים לקו זה</div>';

    document.getElementById('trStudentsListBody').innerHTML = html;
    new bootstrap.Modal(document.getElementById('trStudentsListModal')).show();
  },

  trUnassignStudent(studentId) {
    Utils.toast('התלמיד הוסר מהקו', 'info');
    // In real app: update DB, refresh list
  },

  /* ======================================================================
     STUDENT LIST FILTERING
     ====================================================================== */
  trFilterStudentList() {
    const q = (document.getElementById('trStudentSearch')?.value || '').trim().toLowerCase();
    const classFilter = document.getElementById('trStudentClassFilter')?.value || '';
    const routeFilter = document.getElementById('trStudentRouteFilter')?.value || '';

    document.querySelectorAll('.tr-student-row').forEach(row => {
      const matchName = !q || row.dataset.name.toLowerCase().includes(q);
      const matchClass = !classFilter || row.dataset.class === classFilter;
      const matchRoute = !routeFilter || row.dataset.route === routeFilter;
      row.style.display = matchName && matchClass && matchRoute ? '' : 'none';
    });
  },

  /* ======================================================================
     CSV EXPORT
     ====================================================================== */
  trExportCSV() {
    const students = this._trAllStudents();
    let csv = '\uFEFF' + 'שם,כיתה,קו,תחנה,נהג,טלפון נהג\n';
    students.forEach(s => {
      const route = this._transportRoutes.find(r => r.id === s.routeId);
      const driver = route ? this._trGetDriver(route.driverId) : null;
      const stop = route ? (route.stops[s.stopIdx] || '') : '';
      csv += `${s.name},${s.klass},${route ? route.name : ''},${stop},${driver ? driver.name : ''},${driver ? driver.phone : ''}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'transport_students.csv'; a.click();
    URL.revokeObjectURL(url);
    Utils.toast('הקובץ יורד...', 'success');
  },

  /* ======================================================================
     REFRESH
     ====================================================================== */
  _trRefresh() {
    // Re-render the route cards
    const routesContainer = document.querySelector('#trTabRoutes .row');
    if (routesContainer) routesContainer.innerHTML = this._trRouteCardsHTML();

    // Re-render drivers table
    const driversContainer = document.getElementById('trTabDrivers');
    if (driversContainer) driversContainer.innerHTML = this._trDriverDirectoryHTML();

    // Re-render students tab
    const studentsContainer = document.getElementById('trTabStudents');
    if (studentsContainer) studentsContainer.innerHTML = this._trStudentListHTML();

    // Update stats (replace the stats area)
    const statsRow = document.querySelector('.page-header')?.nextElementSibling;
    // Stats are inline so a full page refresh is simplest for demo
  }
});
