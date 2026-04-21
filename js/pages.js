/* ===== BHT v5.0 — All Page Renderers ===== */

const Pages = {

  /* ======================================================================
     DASHBOARD
     ====================================================================== */
  dashboard() {
    return `
      <div class="page-header">
        <h1><i class="bi bi-speedometer2 me-2"></i>\u05DC\u05D5\u05D7 \u05D1\u05E7\u05E8\u05D4</h1>
        <p>${Utils.dayName()} | ${Utils.formatDate(new Date())}</p>
      </div>

      <!-- Stats Row -->
      <div class="row g-3 mb-4" id="dash-stats">
        <div class="col-6 col-md-3">
          <div class="card stat-card p-3">
            <div class="stat-icon"><i class="bi bi-people-fill"></i></div>
            <div class="stat-value" id="stat-students">--</div>
            <div class="stat-label">\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card stat-card p-3">
            <div class="stat-icon"><i class="bi bi-calendar-check-fill"></i></div>
            <div class="stat-value text-success" id="stat-attendance">--</div>
            <div class="stat-label">\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D4\u05D9\u05D5\u05DD</div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card stat-card p-3">
            <div class="stat-icon"><i class="bi bi-person-badge-fill"></i></div>
            <div class="stat-value text-primary" id="stat-staff">--</div>
            <div class="stat-label">\u05D0\u05E0\u05E9\u05D9 \u05E6\u05D5\u05D5\u05EA</div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card stat-card p-3">
            <div class="stat-icon"><i class="bi bi-cash-stack"></i></div>
            <div class="stat-value text-warning" id="stat-debt">--</div>
            <div class="stat-label">\u05D7\u05D5\u05D1\u05D5\u05EA \u05E4\u05EA\u05D5\u05D7\u05D9\u05DD</div>
          </div>
        </div>
      </div>

      <div class="row g-3">
        <!-- Attendance Chart -->
        <div class="col-lg-8">
          <div class="card p-3">
            <h6 class="fw-bold mb-3"><i class="bi bi-bar-chart-fill me-2 text-primary"></i>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D4\u05D9\u05D5\u05DD</h6>
            <div class="chart-container" style="height:260px">
              <canvas id="chart-attendance"></canvas>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="col-lg-4">
          <div class="card p-3">
            <h6 class="fw-bold mb-3"><i class="bi bi-lightning-fill me-2 text-warning"></i>\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA \u05DE\u05D4\u05D9\u05E8\u05D5\u05EA</h6>
            <div class="d-grid gap-2">
              <a href="#attendance" class="btn btn-outline-primary d-flex align-items-center gap-2">
                <i class="bi bi-calendar-check"></i>\u05E1\u05DE\u05DF \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA
              </a>
              <a href="#students" class="btn btn-outline-success d-flex align-items-center gap-2">
                <i class="bi bi-person-plus"></i>\u05E6\u05E4\u05D4 \u05D1\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD
              </a>
              <a href="#phone" class="btn btn-outline-info d-flex align-items-center gap-2">
                <i class="bi bi-telephone"></i>\u05D7\u05D9\u05D9\u05D2
              </a>
              <a href="#finance" class="btn btn-outline-warning d-flex align-items-center gap-2">
                <i class="bi bi-cash"></i>\u05DB\u05E1\u05E4\u05D9\u05DD
              </a>
            </div>
          </div>

          <!-- Finance Pie -->
          <div class="card p-3 mt-3">
            <h6 class="fw-bold mb-3"><i class="bi bi-pie-chart-fill me-2 text-success"></i>\u05DE\u05E6\u05D1 \u05DB\u05E1\u05E4\u05D9</h6>
            <div class="chart-container" style="height:200px">
              <canvas id="chart-finance"></canvas>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="card p-3 mt-3">
        <h6 class="fw-bold mb-3"><i class="bi bi-clock-history me-2 text-info"></i>\u05E4\u05E2\u05D9\u05DC\u05D5\u05EA \u05D0\u05D7\u05E8\u05D5\u05E0\u05D5\u05EA</h6>
        <div id="activity-feed">
          <div class="text-muted text-center py-3">\u05D8\u05D5\u05E2\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD...</div>
        </div>
      </div>
    `;
  },

  async dashboardInit() {
    const students = await App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
    const staff = await App.getData('\u05E6\u05D5\u05D5\u05EA');
    const finance = await App.getData('\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3');
    const attendance = await App.getData('\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA');

    // Stats
    const activeStudents = students.filter(s => s['\u05E1\u05D8\u05D8\u05D5\u05E1'] !== '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC');
    document.getElementById('stat-students').textContent = activeStudents.length;
    document.getElementById('stat-staff').textContent = staff.length;

    // Attendance today
    const todayAtt = attendance.filter(a => a['\u05EA\u05D0\u05E8\u05D9\u05DA'] === Utils.todayISO());
    const present = todayAtt.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E0\u05D5\u05DB\u05D7');
    const pctStr = todayAtt.length > 0 ? Math.round(present.length / todayAtt.length * 100) + '%' : '--';
    document.getElementById('stat-attendance').textContent = pctStr;

    // Finance debts
    const totalDebt = finance.reduce((s, f) => s + (Number(f['\u05D9\u05EA\u05E8\u05D4']) || 0), 0);
    document.getElementById('stat-debt').textContent = Utils.formatCurrency(totalDebt);

    // Attendance Chart
    const attCtx = document.getElementById('chart-attendance');
    if (attCtx) {
      const labels = ['\u05E0\u05D5\u05DB\u05D7', '\u05D7\u05D9\u05E1\u05D5\u05E8', '\u05D0\u05D9\u05D7\u05D5\u05E8'];
      const absent = todayAtt.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D7\u05D9\u05E1\u05D5\u05E8');
      const late = todayAtt.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D0\u05D9\u05D7\u05D5\u05E8');
      App.charts.att = new Chart(attCtx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            data: [present.length, absent.length, late.length],
            backgroundColor: ['#0f9d58', '#ea4335', '#f9ab00'],
            borderRadius: 8,
            barPercentage: 0.6
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, ticks: { stepSize: 1 } },
            x: { grid: { display: false } }
          }
        }
      });
    }

    // Finance Pie
    const finCtx = document.getElementById('chart-finance');
    if (finCtx) {
      const totalPaid = finance.reduce((s, f) => s + (Number(f['\u05E9\u05D5\u05DC\u05DD']) || 0), 0);
      App.charts.fin = new Chart(finCtx, {
        type: 'doughnut',
        data: {
          labels: ['\u05E9\u05D5\u05DC\u05DD', '\u05D9\u05EA\u05E8\u05D4'],
          datasets: [{
            data: [totalPaid, totalDebt],
            backgroundColor: ['#0f9d58', '#ea4335'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          cutout: '65%',
          plugins: {
            legend: { position: 'bottom', labels: { font: { family: 'Heebo' } } }
          }
        }
      });
    }

    // Activity feed
    const feed = document.getElementById('activity-feed');
    const activities = [
      { icon: 'calendar-check', color: 'success', text: `\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D4\u05D9\u05D5\u05DD: ${present.length}/${todayAtt.length} \u05E0\u05D5\u05DB\u05D7\u05D9\u05DD`, time: '\u05D4\u05D9\u05D5\u05DD' },
      { icon: 'cash', color: 'warning', text: `${finance.filter(f => Number(f['\u05D9\u05EA\u05E8\u05D4']) > 0).length} \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05E2\u05DD \u05D7\u05D5\u05D1 \u05E4\u05EA\u05D5\u05D7`, time: '\u05D4\u05D9\u05D5\u05DD' },
      { icon: 'people', color: 'primary', text: `${activeStudents.length} \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05E4\u05E2\u05D9\u05DC\u05D9\u05DD`, time: '\u05DE\u05E2\u05D5\u05D3\u05DB\u05DF' },
      { icon: 'person-badge', color: 'info', text: `${staff.length} \u05D0\u05E0\u05E9\u05D9 \u05E6\u05D5\u05D5\u05EA`, time: '\u05DE\u05E2\u05D5\u05D3\u05DB\u05DF' }
    ];
    feed.innerHTML = activities.map(a => `
      <div class="d-flex align-items-center gap-3 py-2 border-bottom">
        <div class="avatar avatar-sm" style="background:var(--bht-${a.color})"><i class="bi bi-${a.icon}" style="font-size:.8rem"></i></div>
        <div class="flex-grow-1"><span>${a.text}</span></div>
        <small class="text-muted">${a.time}</small>
      </div>
    `).join('');
  },

  /* ======================================================================
     STUDENTS LIST
     ====================================================================== */
  students() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div>
          <h1><i class="bi bi-people-fill me-2"></i>\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</h1>
          <p id="students-count"></p>
        </div>
        <button class="btn btn-primary" onclick="Pages.showStudentForm()">
          <i class="bi bi-plus-lg me-1"></i>\u05D4\u05D5\u05E1\u05E4\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3
        </button>
      </div>

      <!-- Filters -->
      <div class="card p-3 mb-3">
        <div class="row g-2 align-items-center">
          <div class="col-md-6">
            <div class="search-box">
              <i class="bi bi-search"></i>
              <input type="text" class="form-control" id="students-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05EA\u05DC\u05DE\u05D9\u05D3...">
            </div>
          </div>
          <div class="col-md-3">
            <select class="form-select" id="students-class-filter">
              <option value="">\u05DB\u05DC \u05D4\u05DB\u05D9\u05EA\u05D5\u05EA</option>
            </select>
          </div>
          <div class="col-md-3">
            <select class="form-select" id="students-status-filter">
              <option value="">\u05DB\u05DC \u05D4\u05E1\u05D8\u05D8\u05D5\u05E1\u05D9\u05DD</option>
              <option value="\u05E4\u05E2\u05D9\u05DC">\u05E4\u05E2\u05D9\u05DC</option>
              <option value="\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC">\u05DC\u05D0 \u05E4\u05E2\u05D9\u05DC</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Student List -->
      <div id="students-list">${Utils.skeleton(4)}</div>

      <!-- Add/Edit Modal -->
      <div class="modal fade" id="student-modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="student-modal-title">\u05D4\u05D5\u05E1\u05E4\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <input type="hidden" id="sf-id">
              <div class="mb-3">
                <label class="form-label">\u05E9\u05DD \u05DE\u05DC\u05D0</label>
                <input type="text" class="form-control" id="sf-name" required>
              </div>
              <div class="row g-3">
                <div class="col-6">
                  <label class="form-label">\u05DB\u05D9\u05EA\u05D4</label>
                  <input type="text" class="form-control" id="sf-class">
                </div>
                <div class="col-6">
                  <label class="form-label">\u05D8\u05DC\u05E4\u05D5\u05DF</label>
                  <input type="tel" class="form-control" id="sf-phone" dir="ltr">
                </div>
              </div>
              <div class="row g-3 mt-1">
                <div class="col-6">
                  <label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA \u05DC\u05D9\u05D3\u05D4</label>
                  <input type="date" class="form-control" id="sf-birthdate">
                </div>
                <div class="col-6">
                  <label class="form-label">\u05E1\u05D8\u05D8\u05D5\u05E1</label>
                  <select class="form-select" id="sf-status">
                    <option value="\u05E4\u05E2\u05D9\u05DC">\u05E4\u05E2\u05D9\u05DC</option>
                    <option value="\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC">\u05DC\u05D0 \u05E4\u05E2\u05D9\u05DC</option>
                  </select>
                </div>
              </div>
              <div class="mb-3 mt-3">
                <label class="form-label">\u05DB\u05EA\u05D5\u05D1\u05EA</label>
                <input type="text" class="form-control" id="sf-address">
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button>
              <button class="btn btn-primary" onclick="Pages.saveStudent()">\u05E9\u05DE\u05D9\u05E8\u05D4</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  _studentsData: [],

  async studentsInit() {
    const data = await App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
    this._studentsData = data;

    // Populate class filter
    const classes = [...new Set(data.map(s => s['\u05DB\u05D9\u05EA\u05D4']).filter(Boolean))].sort();
    const classFilter = document.getElementById('students-class-filter');
    classes.forEach(c => {
      classFilter.insertAdjacentHTML('beforeend', `<option value="${c}">${c}</option>`);
    });

    // Bind search and filters
    const render = () => this.renderStudentsList();
    document.getElementById('students-search').addEventListener('input', Utils.debounce(render, 200));
    document.getElementById('students-class-filter').addEventListener('change', render);
    document.getElementById('students-status-filter').addEventListener('change', render);

    this.renderStudentsList();
  },

  renderStudentsList() {
    const search = (document.getElementById('students-search')?.value || '').trim().toLowerCase();
    const classF = document.getElementById('students-class-filter')?.value || '';
    const statusF = document.getElementById('students-status-filter')?.value || '';

    let filtered = this._studentsData.filter(s => {
      if (search && !(s['\u05E9\u05DD'] || '').toLowerCase().includes(search)) return false;
      if (classF && s['\u05DB\u05D9\u05EA\u05D4'] !== classF) return false;
      if (statusF && s['\u05E1\u05D8\u05D8\u05D5\u05E1'] !== statusF) return false;
      return true;
    });

    document.getElementById('students-count').textContent = `${filtered.length} \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD`;

    if (filtered.length === 0) {
      document.getElementById('students-list').innerHTML = `<div class="empty-state"><i class="bi bi-search"></i><h5>\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</h5></div>`;
      return;
    }

    const html = `<div class="row g-3">${filtered.map(s => {
      const name = s['\u05E9\u05DD'] || '';
      const cls = s['\u05DB\u05D9\u05EA\u05D4'] || '';
      const age = Utils.calcAge(s['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4']);
      const status = s['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '';
      return `
        <div class="col-md-6 col-lg-4">
          <div class="card card-clickable p-3" onclick="location.hash='student/${s.id}'">
            <div class="d-flex align-items-center gap-3">
              ${Utils.avatarHTML(name)}
              <div class="flex-grow-1 min-width-0">
                <div class="fw-bold text-truncate">${name}</div>
                <small class="text-muted">\u05DB\u05D9\u05EA\u05D4 ${cls}${age ? ' | \u05D2\u05D9\u05DC ' + age : ''}</small>
              </div>
              ${Utils.statusBadge(status)}
            </div>
          </div>
        </div>`;
    }).join('')}</div>`;

    document.getElementById('students-list').innerHTML = html;
  },

  showStudentForm(student = null) {
    document.getElementById('student-modal-title').textContent = student ? '\u05E2\u05E8\u05D9\u05DB\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3' : '\u05D4\u05D5\u05E1\u05E4\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3';
    document.getElementById('sf-id').value = student?.id || '';
    document.getElementById('sf-name').value = student?.['\u05E9\u05DD'] || '';
    document.getElementById('sf-class').value = student?.['\u05DB\u05D9\u05EA\u05D4'] || '';
    document.getElementById('sf-phone').value = student?.['\u05D8\u05DC\u05E4\u05D5\u05DF'] || '';
    document.getElementById('sf-birthdate').value = student?.['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4'] || '';
    document.getElementById('sf-status').value = student?.['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '\u05E4\u05E2\u05D9\u05DC';
    document.getElementById('sf-address').value = student?.['\u05DB\u05EA\u05D5\u05D1\u05EA'] || '';
    new bootstrap.Modal(document.getElementById('student-modal')).show();
  },

  async saveStudent() {
    const id = document.getElementById('sf-id').value;
    const row = {
      '\u05E9\u05DD': document.getElementById('sf-name').value.trim(),
      '\u05DB\u05D9\u05EA\u05D4': document.getElementById('sf-class').value.trim(),
      '\u05D8\u05DC\u05E4\u05D5\u05DF': document.getElementById('sf-phone').value.trim(),
      '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': document.getElementById('sf-birthdate').value,
      '\u05E1\u05D8\u05D8\u05D5\u05E1': document.getElementById('sf-status').value,
      '\u05DB\u05EA\u05D5\u05D1\u05EA': document.getElementById('sf-address').value.trim()
    };
    if (!row['\u05E9\u05DD']) { Utils.toast('\u05E0\u05D0 \u05DC\u05D4\u05D6\u05D9\u05DF \u05E9\u05DD', 'warning'); return; }

    try {
      if (id) {
        await App.apiCall('update', '\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD', { id, row });
      } else {
        await App.apiCall('add', '\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD', { row });
      }
      bootstrap.Modal.getInstance(document.getElementById('student-modal')).hide();
      Utils.toast(id ? '\u05EA\u05DC\u05DE\u05D9\u05D3 \u05E2\u05D5\u05D3\u05DB\u05DF' : '\u05EA\u05DC\u05DE\u05D9\u05D3 \u05E0\u05D5\u05E1\u05E3', 'success');
      this.studentsInit();
    } catch(e) {
      Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05E9\u05DE\u05D9\u05E8\u05D4', 'danger');
    }
  },

  /* ======================================================================
     STUDENT CARD
     ====================================================================== */
  student(id) {
    return `
      <div id="student-card-content">${Utils.skeleton(3)}</div>
    `;
  },

  async studentInit(id) {
    const students = await App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
    const s = students.find(x => String(x.id) === String(id));
    if (!s) {
      document.getElementById('student-card-content').innerHTML = `
        <div class="empty-state"><i class="bi bi-person-x"></i><h5>\u05EA\u05DC\u05DE\u05D9\u05D3 \u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0</h5>
        <a href="#students" class="btn btn-primary mt-2">\u05D7\u05D6\u05E8\u05D4 \u05DC\u05E8\u05E9\u05D9\u05DE\u05D4</a></div>`;
      return;
    }

    const name = s['\u05E9\u05DD'] || '';
    const age = Utils.calcAge(s['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4']);

    // Get related data
    const attendance = await App.getData('\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA');
    const studentAtt = attendance.filter(a => a['\u05EA\u05DC\u05DE\u05D9\u05D3'] === name);
    const presentCount = studentAtt.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E0\u05D5\u05DB\u05D7').length;
    const attPct = studentAtt.length ? Math.round(presentCount / studentAtt.length * 100) : 0;

    const finance = await App.getData('\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3');
    const sf = finance.find(f => f['\u05EA\u05DC\u05DE\u05D9\u05D3'] === name) || {};

    document.getElementById('student-card-content').innerHTML = `
      <a href="#students" class="btn btn-link text-decoration-none mb-2"><i class="bi bi-arrow-right me-1"></i>\u05D7\u05D6\u05E8\u05D4 \u05DC\u05E8\u05E9\u05D9\u05DE\u05D4</a>

      <div class="card overflow-hidden mb-3">
        <div class="student-header">
          ${Utils.avatarHTML(name, 'xl')}
          <h3 class="fw-bold mt-2 mb-1">${name}</h3>
          <div>\u05DB\u05D9\u05EA\u05D4 ${s['\u05DB\u05D9\u05EA\u05D4'] || '--'}${age ? ` | \u05D2\u05D9\u05DC ${age}` : ''}</div>
          ${Utils.statusBadge(s['\u05E1\u05D8\u05D8\u05D5\u05E1'])}
        </div>
      </div>

      <!-- Tabs -->
      <ul class="nav nav-tabs-bht mb-3" role="tablist">
        <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" href="#tab-info">\u05DE\u05D9\u05D3\u05E2</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-att">\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-fin">\u05DB\u05E1\u05E4\u05D9\u05DD</a></li>
      </ul>

      <div class="tab-content">
        <!-- Info Tab -->
        <div class="tab-pane fade show active" id="tab-info">
          <div class="card p-3">
            <div class="row g-3">
              <div class="col-sm-6">
                <label class="form-label text-muted small">\u05E9\u05DD \u05DE\u05DC\u05D0</label>
                <div class="fw-bold">${name}</div>
              </div>
              <div class="col-sm-6">
                <label class="form-label text-muted small">\u05DB\u05D9\u05EA\u05D4</label>
                <div class="fw-bold">${s['\u05DB\u05D9\u05EA\u05D4'] || '--'}</div>
              </div>
              <div class="col-sm-6">
                <label class="form-label text-muted small">\u05D8\u05DC\u05E4\u05D5\u05DF</label>
                <div class="fw-bold" dir="ltr">${Utils.formatPhone(s['\u05D8\u05DC\u05E4\u05D5\u05DF'])}</div>
              </div>
              <div class="col-sm-6">
                <label class="form-label text-muted small">\u05EA\u05D0\u05E8\u05D9\u05DA \u05DC\u05D9\u05D3\u05D4</label>
                <div class="fw-bold">${Utils.formatDate(s['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4'])}</div>
              </div>
              <div class="col-12">
                <label class="form-label text-muted small">\u05DB\u05EA\u05D5\u05D1\u05EA</label>
                <div class="fw-bold">${s['\u05DB\u05EA\u05D5\u05D1\u05EA'] || '--'}</div>
              </div>
            </div>
            <div class="mt-3">
              <button class="btn btn-outline-primary btn-sm" onclick="Pages.showStudentForm(Pages._studentsData.find(x=>x.id==${s.id}))">
                <i class="bi bi-pencil me-1"></i>\u05E2\u05E8\u05D9\u05DB\u05D4
              </button>
            </div>
          </div>
        </div>

        <!-- Attendance Tab -->
        <div class="tab-pane fade" id="tab-att">
          <div class="row g-3 mb-3">
            <div class="col-4">
              <div class="card p-3 text-center">
                <div class="fs-3 fw-bold text-success">${attPct}%</div>
                <small class="text-muted">\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</small>
              </div>
            </div>
            <div class="col-4">
              <div class="card p-3 text-center">
                <div class="fs-3 fw-bold text-primary">${presentCount}</div>
                <small class="text-muted">\u05D9\u05DE\u05D9 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</small>
              </div>
            </div>
            <div class="col-4">
              <div class="card p-3 text-center">
                <div class="fs-3 fw-bold text-danger">${studentAtt.length - presentCount}</div>
                <small class="text-muted">\u05D7\u05D9\u05E1\u05D5\u05E8\u05D9\u05DD</small>
              </div>
            </div>
          </div>
          ${studentAtt.length === 0 ? '<div class="text-muted text-center py-3">\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</div>' :
          `<div class="card"><table class="table table-bht mb-0">
            <thead><tr><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th></tr></thead>
            <tbody>${studentAtt.slice(-10).reverse().map(a => `
              <tr><td>${Utils.formatDateShort(a['\u05EA\u05D0\u05E8\u05D9\u05DA'])}</td>
              <td>${a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E0\u05D5\u05DB\u05D7' ? '<span class="badge bg-success">\u05E0\u05D5\u05DB\u05D7</span>' : '<span class="badge bg-danger">\u05D7\u05D9\u05E1\u05D5\u05E8</span>'}</td></tr>
            `).join('')}</tbody></table></div>`}
        </div>

        <!-- Finance Tab -->
        <div class="tab-pane fade" id="tab-fin">
          <div class="card p-3">
            <div class="row g-3 text-center mb-3">
              <div class="col-4">
                <div class="fs-5 fw-bold">${Utils.formatCurrency(sf['\u05E1\u05DB\u05D5\u05DD'] || 0)}</div>
                <small class="text-muted">\u05E1\u05D4"\u05DB \u05E9\u05DB"\u05DC</small>
              </div>
              <div class="col-4">
                <div class="fs-5 fw-bold text-success">${Utils.formatCurrency(sf['\u05E9\u05D5\u05DC\u05DD'] || 0)}</div>
                <small class="text-muted">\u05E9\u05D5\u05DC\u05DD</small>
              </div>
              <div class="col-4">
                <div class="fs-5 fw-bold text-danger">${Utils.formatCurrency(sf['\u05D9\u05EA\u05E8\u05D4'] || 0)}</div>
                <small class="text-muted">\u05D9\u05EA\u05E8\u05D4</small>
              </div>
            </div>
            ${sf['\u05E1\u05DB\u05D5\u05DD'] ? `
            <div class="finance-progress">
              <div class="finance-progress-bar bg-success" style="width:${Math.round((sf['\u05E9\u05D5\u05DC\u05DD']||0)/(sf['\u05E1\u05DB\u05D5\u05DD']||1)*100)}%"></div>
            </div>
            <small class="text-muted mt-1 d-block">${Math.round((sf['\u05E9\u05D5\u05DC\u05DD']||0)/(sf['\u05E1\u05DB\u05D5\u05DD']||1)*100)}% \u05E9\u05D5\u05DC\u05DD</small>
            ` : '<div class="text-muted text-center">\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9 \u05DB\u05E1\u05E4\u05D9\u05DD</div>'}
          </div>
        </div>
      </div>
    `;
  },

  /* ======================================================================
     ATTENDANCE
     ====================================================================== */
  attendance() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div>
          <h1><i class="bi bi-calendar-check-fill me-2"></i>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</h1>
          <p>${Utils.dayName()} | ${Utils.formatDate(new Date())}</p>
        </div>
        <button class="btn btn-success" id="save-attendance-btn" onclick="Pages.saveAttendance()">
          <i class="bi bi-check-lg me-1"></i>\u05E9\u05DE\u05D5\u05E8 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA
        </button>
      </div>

      <div class="card p-3 mb-3">
        <div class="row g-2 align-items-center">
          <div class="col-md-4">
            <div class="search-box">
              <i class="bi bi-search"></i>
              <input type="text" class="form-control" id="att-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9...">
            </div>
          </div>
          <div class="col-md-3">
            <input type="date" class="form-control" id="att-date" value="${Utils.todayISO()}">
          </div>
          <div class="col-md-5 d-flex gap-2 flex-wrap">
            <button class="btn btn-outline-success btn-sm" onclick="Pages.markAll('present')"><i class="bi bi-check-all me-1"></i>\u05D4\u05DB\u05DC \u05E0\u05D5\u05DB\u05D7\u05D9\u05DD</button>
            <button class="btn btn-outline-danger btn-sm" onclick="Pages.markAll('absent')"><i class="bi bi-x-circle me-1"></i>\u05D4\u05DB\u05DC \u05D7\u05E1\u05E8\u05D9\u05DD</button>
            <span class="badge bg-secondary align-self-center" title="\u05E7\u05D9\u05E6\u05D5\u05E8\u05D9 \u05DE\u05E7\u05DC\u05D3\u05EA">P/A/L</span>
          </div>
        </div>
      </div>

      <div class="card p-2 mb-3">
        <div class="d-flex gap-3 justify-content-center py-2" id="att-summary">
          <span class="badge bg-success">\u05E0\u05D5\u05DB\u05D7\u05D9\u05DD: <strong id="att-present">0</strong></span>
          <span class="badge bg-danger">\u05D7\u05E1\u05E8\u05D9\u05DD: <strong id="att-absent">0</strong></span>
          <span class="badge bg-warning text-dark">\u05D0\u05D9\u05D7\u05D5\u05E8: <strong id="att-late">0</strong></span>
        </div>
      </div>

      <div id="att-list">${Utils.skeleton(5)}</div>
    `;
  },

  _attState: {},

  async attendanceInit() {
    const students = await App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
    const active = students.filter(s => s['\u05E1\u05D8\u05D8\u05D5\u05E1'] !== '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC');
    this._attStudents = active;

    // Load existing attendance for today
    const attendance = await App.getData('\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA');
    const today = document.getElementById('att-date').value;
    this._attState = {};
    active.forEach(s => {
      const existing = attendance.find(a => a['\u05EA\u05DC\u05DE\u05D9\u05D3'] === s['\u05E9\u05DD'] && a['\u05EA\u05D0\u05E8\u05D9\u05DA'] === today);
      const status = existing ? existing['\u05E1\u05D8\u05D8\u05D5\u05E1'] : '';
      this._attState[s.id] = status === '\u05E0\u05D5\u05DB\u05D7' ? 'present' : status === '\u05D7\u05D9\u05E1\u05D5\u05E8' ? 'absent' : status === '\u05D0\u05D9\u05D7\u05D5\u05E8' ? 'late' : '';
    });

    // Bind search
    document.getElementById('att-search').addEventListener('input', Utils.debounce(() => this.renderAttList(), 200));
    document.getElementById('att-date').addEventListener('change', () => this.attendanceInit());

    // Keyboard shortcuts
    document.addEventListener('keydown', this._attKeyHandler = (e) => {
      if (App.currentPage !== 'attendance') return;
      if (e.target.tagName === 'INPUT') return;
      const focused = document.querySelector('.att-row.focused');
      if (!focused) return;
      const sid = focused.dataset.id;
      if (e.key === 'p' || e.key === 'P') { this.toggleAtt(sid, 'present'); e.preventDefault(); }
      if (e.key === 'a' || e.key === 'A') { this.toggleAtt(sid, 'absent'); e.preventDefault(); }
      if (e.key === 'l' || e.key === 'L') { this.toggleAtt(sid, 'late'); e.preventDefault(); }
      if (e.key === 'ArrowDown') { const next = focused.nextElementSibling; if (next) { focused.classList.remove('focused'); next.classList.add('focused'); next.scrollIntoView({block:'nearest'}); } e.preventDefault(); }
      if (e.key === 'ArrowUp') { const prev = focused.previousElementSibling; if (prev) { focused.classList.remove('focused'); prev.classList.add('focused'); prev.scrollIntoView({block:'nearest'}); } e.preventDefault(); }
    });

    this.renderAttList();
  },

  renderAttList() {
    const search = (document.getElementById('att-search')?.value || '').trim().toLowerCase();
    const filtered = this._attStudents.filter(s => {
      if (search && !(s['\u05E9\u05DD'] || '').toLowerCase().includes(search)) return false;
      return true;
    });

    const html = filtered.map((s, i) => {
      const name = s['\u05E9\u05DD'];
      const state = this._attState[s.id] || '';
      return `
        <div class="d-flex align-items-center gap-3 p-3 border-bottom att-row ${i===0?'focused':''}" data-id="${s.id}" onclick="this.parentElement.querySelectorAll('.att-row').forEach(r=>r.classList.remove('focused'));this.classList.add('focused')">
          ${Utils.avatarHTML(name)}
          <div class="flex-grow-1">
            <div class="fw-bold">${name}</div>
            <small class="text-muted">\u05DB\u05D9\u05EA\u05D4 ${s['\u05DB\u05D9\u05EA\u05D4'] || '--'}</small>
          </div>
          <div class="d-flex gap-2">
            <div class="att-btn ${state==='present'?'present selected':''}" onclick="event.stopPropagation();Pages.toggleAtt(${s.id},'present')" title="\u05E0\u05D5\u05DB\u05D7 (P)">
              <i class="bi bi-check-lg"></i>
            </div>
            <div class="att-btn ${state==='absent'?'absent selected':''}" onclick="event.stopPropagation();Pages.toggleAtt(${s.id},'absent')" title="\u05D7\u05D9\u05E1\u05D5\u05E8 (A)">
              <i class="bi bi-x-lg"></i>
            </div>
            <div class="att-btn ${state==='late'?'late selected':''}" onclick="event.stopPropagation();Pages.toggleAtt(${s.id},'late')" title="\u05D0\u05D9\u05D7\u05D5\u05E8 (L)">
              <i class="bi bi-clock"></i>
            </div>
          </div>
        </div>`;
    }).join('');

    document.getElementById('att-list').innerHTML = `<div class="card">${html}</div>`;
    this.updateAttSummary();
  },

  toggleAtt(id, status) {
    this._attState[id] = this._attState[id] === status ? '' : status;
    this.renderAttList();
  },

  markAll(status) {
    this._attStudents.forEach(s => { this._attState[s.id] = status; });
    this.renderAttList();
  },

  updateAttSummary() {
    const vals = Object.values(this._attState);
    document.getElementById('att-present').textContent = vals.filter(v => v === 'present').length;
    document.getElementById('att-absent').textContent = vals.filter(v => v === 'absent').length;
    document.getElementById('att-late').textContent = vals.filter(v => v === 'late').length;
  },

  async saveAttendance() {
    const date = document.getElementById('att-date').value;
    const statusMap = { present: '\u05E0\u05D5\u05DB\u05D7', absent: '\u05D7\u05D9\u05E1\u05D5\u05E8', late: '\u05D0\u05D9\u05D7\u05D5\u05E8' };
    const rows = [];
    this._attStudents.forEach(s => {
      const st = this._attState[s.id];
      if (st) {
        rows.push({ '\u05EA\u05DC\u05DE\u05D9\u05D3': s['\u05E9\u05DD'], '\u05EA\u05D0\u05E8\u05D9\u05DA': date, '\u05E1\u05D8\u05D8\u05D5\u05E1': statusMap[st] });
      }
    });

    if (rows.length === 0) {
      Utils.toast('\u05DC\u05D0 \u05E1\u05D5\u05DE\u05E0\u05D5 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD', 'warning');
      return;
    }

    try {
      await App.apiCall('bulkAdd', '\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA', { rows });
      Utils.toast(`\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05E0\u05E9\u05DE\u05E8\u05D4: ${rows.length} \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD`, 'success');
    } catch(e) {
      // Save locally as fallback
      const key = 'bht_att_' + date;
      localStorage.setItem(key, JSON.stringify(rows));
      Utils.toast('\u05E0\u05E9\u05DE\u05E8 \u05DE\u05E7\u05D5\u05DE\u05D9\u05EA (\u05D0\u05D5\u05E4\u05DC\u05D9\u05D9\u05DF)', 'info');
    }
  },

  /* ======================================================================
     STAFF
     ====================================================================== */
  staff() {
    return `
      <div class="page-header">
        <h1><i class="bi bi-person-badge-fill me-2"></i>\u05E6\u05D5\u05D5\u05EA</h1>
        <p id="staff-count"></p>
      </div>
      <div class="card p-3 mb-3">
        <div class="search-box">
          <i class="bi bi-search"></i>
          <input type="text" class="form-control" id="staff-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05D0\u05D9\u05E9 \u05E6\u05D5\u05D5\u05EA...">
        </div>
      </div>
      <div id="staff-list">${Utils.skeleton(3)}</div>
    `;
  },

  async staffInit() {
    const data = await App.getData('\u05E6\u05D5\u05D5\u05EA');
    this._staffData = data;

    document.getElementById('staff-search').addEventListener('input', Utils.debounce(() => this.renderStaffList(), 200));
    this.renderStaffList();
  },

  renderStaffList() {
    const search = (document.getElementById('staff-search')?.value || '').trim().toLowerCase();
    const filtered = (this._staffData || []).filter(s => {
      if (search && !(s['\u05E9\u05DD'] || '').toLowerCase().includes(search)) return false;
      return true;
    });

    document.getElementById('staff-count').textContent = `${filtered.length} \u05D0\u05E0\u05E9\u05D9 \u05E6\u05D5\u05D5\u05EA`;

    if (filtered.length === 0) {
      document.getElementById('staff-list').innerHTML = `<div class="empty-state"><i class="bi bi-person-badge"></i><h5>\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05D0\u05E0\u05E9\u05D9 \u05E6\u05D5\u05D5\u05EA</h5></div>`;
      return;
    }

    document.getElementById('staff-list').innerHTML = `<div class="row g-3">${filtered.map(s => {
      const name = s['\u05E9\u05DD'] || '';
      const role = s['\u05EA\u05E4\u05E7\u05D9\u05D3'] || '';
      const phone = s['\u05D8\u05DC\u05E4\u05D5\u05DF'] || '';
      return `
        <div class="col-md-6 col-lg-4">
          <div class="card p-3">
            <div class="d-flex align-items-center gap-3">
              ${Utils.avatarHTML(name, 'lg')}
              <div class="flex-grow-1">
                <div class="fw-bold fs-6">${name}</div>
                <div class="text-muted small">${role}</div>
                ${phone ? `<div class="mt-1"><a href="#phone" onclick="Pages._dialNumber='${phone}'" class="text-decoration-none small"><i class="bi bi-telephone me-1"></i>${Utils.formatPhone(phone)}</a></div>` : ''}
              </div>
              ${Utils.statusBadge(s['\u05E1\u05D8\u05D8\u05D5\u05E1'])}
            </div>
          </div>
        </div>`;
    }).join('')}</div>`;
  },

  /* ======================================================================
     FINANCE
     ====================================================================== */
  finance() {
    return `
      <div class="page-header">
        <h1><i class="bi bi-cash-stack me-2"></i>\u05DB\u05E1\u05E4\u05D9\u05DD</h1>
        <p>\u05DE\u05E2\u05E7\u05D1 \u05E9\u05DB\u05E8 \u05DC\u05D9\u05DE\u05D5\u05D3</p>
      </div>

      <!-- Summary Cards -->
      <div class="row g-3 mb-4" id="fin-stats">
        <div class="col-md-4">
          <div class="card p-3 text-center">
            <div class="fs-4 fw-bold" id="fin-total">--</div>
            <small class="text-muted">\u05E1\u05D4"\u05DB \u05DB\u05D5\u05DC\u05DC</small>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card p-3 text-center">
            <div class="fs-4 fw-bold text-success" id="fin-paid">--</div>
            <small class="text-muted">\u05E0\u05D2\u05D1\u05D4</small>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card p-3 text-center">
            <div class="fs-4 fw-bold text-danger" id="fin-debt">--</div>
            <small class="text-muted">\u05D7\u05D5\u05D1</small>
          </div>
        </div>
      </div>

      <!-- Filter -->
      <div class="card p-3 mb-3">
        <div class="row g-2">
          <div class="col-md-6">
            <div class="search-box">
              <i class="bi bi-search"></i>
              <input type="text" class="form-control" id="fin-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05EA\u05DC\u05DE\u05D9\u05D3...">
            </div>
          </div>
          <div class="col-md-3">
            <select class="form-select" id="fin-filter">
              <option value="">\u05D4\u05DB\u05DC</option>
              <option value="debt">\u05D7\u05D5\u05D1\u05D5\u05EA \u05D1\u05DC\u05D1\u05D3</option>
              <option value="paid">\u05E9\u05D5\u05DC\u05DD</option>
            </select>
          </div>
        </div>
      </div>

      <div id="fin-list">${Utils.skeleton(4)}</div>
    `;
  },

  async financeInit() {
    const data = await App.getData('\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3');
    this._finData = data;

    const total = data.reduce((s, f) => s + (Number(f['\u05E1\u05DB\u05D5\u05DD']) || 0), 0);
    const paid = data.reduce((s, f) => s + (Number(f['\u05E9\u05D5\u05DC\u05DD']) || 0), 0);
    const debt = data.reduce((s, f) => s + (Number(f['\u05D9\u05EA\u05E8\u05D4']) || 0), 0);

    document.getElementById('fin-total').textContent = Utils.formatCurrency(total);
    document.getElementById('fin-paid').textContent = Utils.formatCurrency(paid);
    document.getElementById('fin-debt').textContent = Utils.formatCurrency(debt);

    document.getElementById('fin-search').addEventListener('input', Utils.debounce(() => this.renderFinList(), 200));
    document.getElementById('fin-filter').addEventListener('change', () => this.renderFinList());
    this.renderFinList();
  },

  renderFinList() {
    const search = (document.getElementById('fin-search')?.value || '').trim().toLowerCase();
    const filter = document.getElementById('fin-filter')?.value || '';

    let filtered = (this._finData || []).filter(f => {
      if (search && !(f['\u05EA\u05DC\u05DE\u05D9\u05D3'] || '').toLowerCase().includes(search)) return false;
      if (filter === 'debt' && !(Number(f['\u05D9\u05EA\u05E8\u05D4']) > 0)) return false;
      if (filter === 'paid' && Number(f['\u05D9\u05EA\u05E8\u05D4']) > 0) return false;
      return true;
    });

    if (filtered.length === 0) {
      document.getElementById('fin-list').innerHTML = `<div class="empty-state"><i class="bi bi-cash"></i><h5>\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05E8\u05E9\u05D5\u05DE\u05D5\u05EA</h5></div>`;
      return;
    }

    document.getElementById('fin-list').innerHTML = `<div class="card"><table class="table table-bht mb-0">
      <thead><tr><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th>\u05E1\u05DB\u05D5\u05DD</th><th>\u05E9\u05D5\u05DC\u05DD</th><th>\u05D9\u05EA\u05E8\u05D4</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th><th>\u05D4\u05EA\u05E7\u05D3\u05DE\u05D5\u05EA</th></tr></thead>
      <tbody>${filtered.map(f => {
        const total = Number(f['\u05E1\u05DB\u05D5\u05DD']) || 0;
        const paid = Number(f['\u05E9\u05D5\u05DC\u05DD']) || 0;
        const debt = Number(f['\u05D9\u05EA\u05E8\u05D4']) || 0;
        const pct = total ? Math.round(paid / total * 100) : 0;
        const statusCls = debt <= 0 ? 'success' : debt > total * 0.5 ? 'danger' : 'warning';
        const statusText = debt <= 0 ? '\u05E9\u05D5\u05DC\u05DD' : '\u05D7\u05D5\u05D1';
        return `<tr>
          <td><div class="d-flex align-items-center gap-2">${Utils.avatarHTML(f['\u05EA\u05DC\u05DE\u05D9\u05D3'], 'sm')}<span class="fw-bold">${f['\u05EA\u05DC\u05DE\u05D9\u05D3']}</span></div></td>
          <td>${Utils.formatCurrency(total)}</td>
          <td class="text-success">${Utils.formatCurrency(paid)}</td>
          <td class="text-danger fw-bold">${Utils.formatCurrency(debt)}</td>
          <td><span class="badge bg-${statusCls}">${statusText}</span></td>
          <td style="min-width:120px"><div class="finance-progress"><div class="finance-progress-bar bg-${statusCls}" style="width:${pct}%"></div></div><small class="text-muted">${pct}%</small></td>
        </tr>`;
      }).join('')}</tbody></table></div>`;
  },

  /* ======================================================================
     PHONE DIALER
     ====================================================================== */
  _dialNumber: '',

  phone() {
    const num = this._dialNumber || '';
    return `
      <div class="page-header">
        <h1><i class="bi bi-telephone-fill me-2"></i>\u05D8\u05DC\u05E4\u05D5\u05DF</h1>
        <p>\u05D7\u05D9\u05D9\u05D2 \u05D9\u05E9\u05D9\u05E8 \u05D3\u05E8\u05DA \u05D4\u05DE\u05E2\u05E8\u05DB\u05EA</p>
      </div>

      <div class="row g-4">
        <!-- Dialer -->
        <div class="col-md-5">
          <div class="card p-3">
            <div class="dialer-display" id="dial-display">${num}</div>
            <div class="dialer-grid">
              ${[1,2,3,4,5,6,7,8,9,'*',0,'#'].map(d => `
                <button class="dialer-btn" onclick="Pages.dialPress('${d}')">${d}</button>
              `).join('')}
            </div>
            <div class="d-flex gap-2 justify-content-center mt-2">
              <button class="dialer-btn dialer-delete" onclick="Pages.dialBackspace()" title="\u05DE\u05D7\u05E7">
                <i class="bi bi-backspace"></i>
              </button>
              <button class="dialer-btn dialer-call" onclick="Pages.makeCall()" title="\u05D7\u05D9\u05D9\u05D2">
                <i class="bi bi-telephone-fill"></i>
              </button>
              <button class="dialer-btn" onclick="Pages.dialClear()" title="\u05E0\u05E7\u05D4" style="color:var(--bht-danger)">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Recent Contacts -->
        <div class="col-md-7">
          <div class="card p-3">
            <h6 class="fw-bold mb-3"><i class="bi bi-people me-2"></i>\u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8</h6>
            <div id="phone-contacts">\u05D8\u05D5\u05E2\u05DF...</div>
          </div>

          <div class="card p-3 mt-3">
            <h6 class="fw-bold mb-3"><i class="bi bi-clock-history me-2"></i>\u05E9\u05D9\u05D7\u05D5\u05EA \u05D0\u05D7\u05E8\u05D5\u05E0\u05D5\u05EA</h6>
            <div id="call-history">
              <div class="text-muted text-center py-2">\u05D0\u05D9\u05DF \u05E9\u05D9\u05D7\u05D5\u05EA \u05D0\u05D7\u05E8\u05D5\u05E0\u05D5\u05EA</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async phoneInit() {
    // Load contacts from staff + parents
    const staff = await App.getData('\u05E6\u05D5\u05D5\u05EA');
    const contacts = staff.filter(s => s['\u05D8\u05DC\u05E4\u05D5\u05DF']).map(s => ({
      name: s['\u05E9\u05DD'],
      phone: s['\u05D8\u05DC\u05E4\u05D5\u05DF'],
      role: s['\u05EA\u05E4\u05E7\u05D9\u05D3'] || ''
    }));

    const container = document.getElementById('phone-contacts');
    if (contacts.length === 0) {
      container.innerHTML = '<div class="text-muted text-center">\u05D0\u05D9\u05DF \u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8</div>';
      return;
    }

    container.innerHTML = contacts.map(c => `
      <div class="d-flex align-items-center gap-3 py-2 border-bottom clickable" onclick="Pages.quickDial('${c.phone}')">
        ${Utils.avatarHTML(c.name, 'sm')}
        <div class="flex-grow-1">
          <div class="fw-bold small">${c.name}</div>
          <small class="text-muted">${c.role}</small>
        </div>
        <small dir="ltr" class="text-muted">${Utils.formatPhone(c.phone)}</small>
        <i class="bi bi-telephone text-success"></i>
      </div>
    `).join('');

    // Show call history
    this.renderCallHistory();

    // If we have a pre-set number, show it
    if (this._dialNumber) {
      document.getElementById('dial-display').textContent = this._dialNumber;
    }
  },

  dialPress(d) {
    const el = document.getElementById('dial-display');
    el.textContent = (el.textContent || '') + d;
  },

  dialBackspace() {
    const el = document.getElementById('dial-display');
    el.textContent = (el.textContent || '').slice(0, -1);
  },

  dialClear() {
    document.getElementById('dial-display').textContent = '';
  },

  quickDial(phone) {
    document.getElementById('dial-display').textContent = phone.replace(/\D/g, '');
    this.makeCall();
  },

  async makeCall() {
    const number = (document.getElementById('dial-display').textContent || '').replace(/\D/g, '');
    if (!number || number.length < 9) {
      Utils.toast('\u05E0\u05D0 \u05DC\u05D4\u05D6\u05D9\u05DF \u05DE\u05E1\u05E4\u05E8 \u05D8\u05DC\u05E4\u05D5\u05DF \u05EA\u05E7\u05D9\u05DF', 'warning');
      return;
    }

    try {
      const resp = await fetch(`http://192.168.1.100:5053/api/call?number=${number}`);
      if (resp.ok) {
        Utils.toast(`\u05DE\u05D7\u05D9\u05D9\u05D2 \u05DC${Utils.formatPhone(number)}...`, 'success');
        // Save to history
        const history = JSON.parse(localStorage.getItem('bht_call_history') || '[]');
        history.unshift({ number, time: new Date().toISOString() });
        localStorage.setItem('bht_call_history', JSON.stringify(history.slice(0, 20)));
        this.renderCallHistory();
      } else {
        throw new Error('call failed');
      }
    } catch(e) {
      Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05D7\u05D9\u05D5\u05D2 - \u05D5\u05D3\u05D0 \u05E9\u05E9\u05E8\u05EA \u05D4\u05D8\u05DC\u05E4\u05D5\u05DF \u05E4\u05E2\u05D9\u05DC', 'danger');
    }
  },

  renderCallHistory() {
    const el = document.getElementById('call-history');
    if (!el) return;
    const history = JSON.parse(localStorage.getItem('bht_call_history') || '[]');
    if (history.length === 0) {
      el.innerHTML = '<div class="text-muted text-center py-2">\u05D0\u05D9\u05DF \u05E9\u05D9\u05D7\u05D5\u05EA \u05D0\u05D7\u05E8\u05D5\u05E0\u05D5\u05EA</div>';
      return;
    }
    el.innerHTML = history.slice(0, 10).map(h => `
      <div class="d-flex align-items-center gap-2 py-1 border-bottom small clickable" onclick="Pages.quickDial('${h.number}')">
        <i class="bi bi-telephone-outbound text-success"></i>
        <span dir="ltr">${Utils.formatPhone(h.number)}</span>
        <span class="text-muted ms-auto">${Utils.formatDateShort(h.time)}</span>
      </div>
    `).join('');
  },

  /* ======================================================================
     CAMERAS
     ====================================================================== */
  cameras() {
    const baseUrl = 'http://192.168.1.100:5051';
    // Common camera names for a school
    const cams = [
      { name: '\u05DB\u05E0\u05D9\u05E1\u05D4 \u05E8\u05D0\u05E9\u05D9\u05EA', path: '/cam/1' },
      { name: '\u05D7\u05E6\u05E8', path: '/cam/2' },
      { name: '\u05DB\u05D9\u05EA\u05D4 \u05D0', path: '/cam/3' },
      { name: '\u05DB\u05D9\u05EA\u05D4 \u05D1', path: '/cam/4' },
      { name: '\u05DE\u05E1\u05D3\u05E8\u05D5\u05DF', path: '/cam/5' },
      { name: '\u05D7\u05D3\u05E8 \u05D0\u05D5\u05DB\u05DC', path: '/cam/6' }
    ];

    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div>
          <h1><i class="bi bi-camera-video-fill me-2"></i>\u05DE\u05E6\u05DC\u05DE\u05D5\u05EA</h1>
          <p>\u05E6\u05E4\u05D9\u05D9\u05D4 \u05D7\u05D9\u05D4 \u05DE\u05DE\u05E6\u05DC\u05DE\u05D5\u05EA \u05D4\u05DE\u05D5\u05E1\u05D3</p>
        </div>
        <button class="btn btn-outline-primary btn-sm" onclick="Pages.refreshCameras()">
          <i class="bi bi-arrow-clockwise me-1"></i>\u05E8\u05E2\u05E0\u05D5\u05DF
        </button>
      </div>

      <div class="row g-3">
        ${cams.map((c, i) => `
          <div class="col-md-6 col-lg-4">
            <div class="camera-feed" id="cam-${i}">
              <img src="${baseUrl}${c.path}/snapshot?t=${Date.now()}" alt="${c.name}" onerror="this.style.display='none';this.parentElement.innerHTML+='<div class=\\'d-flex align-items-center justify-content-center h-100 text-white\\' style=\\'min-height:200px\\'><div class=\\'text-center\\'><i class=\\'bi bi-camera-video-off fs-1 d-block mb-2\\'></i><small>\u05DC\u05D0 \u05D6\u05DE\u05D9\u05DF</small></div></div>'">
              <div class="camera-label"><i class="bi bi-circle-fill text-danger me-1" style="font-size:.5rem"></i>${c.name}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="card p-3 mt-3">
        <h6 class="fw-bold mb-2"><i class="bi bi-fullscreen me-2"></i>\u05EA\u05E6\u05D5\u05D2\u05D4 \u05DE\u05DC\u05D0\u05D4</h6>
        <p class="text-muted small">\u05DC\u05D7\u05E5 \u05E2\u05DC \u05DE\u05E6\u05DC\u05DE\u05D4 \u05DC\u05E6\u05E4\u05D9\u05D9\u05D4 \u05DE\u05DC\u05D0\u05D4. \u05DC\u05E6\u05E4\u05D9\u05D9\u05D4 \u05D1\u05DE\u05E1\u05DA \u05DE\u05DC\u05D0:</p>
        <a href="${baseUrl}" target="_blank" class="btn btn-primary">
          <i class="bi bi-box-arrow-up-left me-1"></i>\u05E4\u05EA\u05D7 \u05DE\u05E2\u05E8\u05DB\u05EA \u05DE\u05E6\u05DC\u05DE\u05D5\u05EA
        </a>
      </div>
    `;
  },

  camerasInit() {
    // Auto-refresh every 10 seconds
    this._camInterval = setInterval(() => {
      if (App.currentPage !== 'cameras') {
        clearInterval(this._camInterval);
        return;
      }
      document.querySelectorAll('.camera-feed img').forEach(img => {
        const src = img.src.split('?')[0];
        img.src = src + '?t=' + Date.now();
      });
    }, 10000);
  },

  refreshCameras() {
    document.querySelectorAll('.camera-feed img').forEach(img => {
      const src = img.src.split('?')[0];
      img.src = src + '?t=' + Date.now();
    });
    Utils.toast('\u05DE\u05E6\u05DC\u05DE\u05D5\u05EA \u05E8\u05D5\u05E2\u05E0\u05E0\u05D5', 'success');
  },

  /* ======================================================================
     SETTINGS
     ====================================================================== */
  settings() {
    const currentTheme = localStorage.getItem(App.THEME_KEY) || 'light';
    const apiUrl = localStorage.getItem('bht_api_url') || App.API_URL;

    return `
      <div class="page-header">
        <h1><i class="bi bi-gear-fill me-2"></i>\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA</h1>
        <p>\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA \u05DE\u05E2\u05E8\u05DB\u05EA</p>
      </div>

      <div class="row g-3">
        <!-- Appearance -->
        <div class="col-md-6">
          <div class="card p-3">
            <h6 class="fw-bold mb-3"><i class="bi bi-palette me-2"></i>\u05DE\u05E8\u05D0\u05D4</h6>
            <div class="form-check form-switch mb-3">
              <input class="form-check-input" type="checkbox" id="set-dark" ${currentTheme==='dark'?'checked':''}>
              <label class="form-check-label" for="set-dark">\u05DE\u05E6\u05D1 \u05DB\u05D4\u05D4</label>
            </div>
          </div>
        </div>

        <!-- API -->
        <div class="col-md-6">
          <div class="card p-3">
            <h6 class="fw-bold mb-3"><i class="bi bi-cloud me-2"></i>\u05D7\u05D9\u05D1\u05D5\u05E8 API</h6>
            <div class="mb-3">
              <label class="form-label">\u05DB\u05EA\u05D5\u05D1\u05EA API</label>
              <input type="url" class="form-control" id="set-api" value="${apiUrl}" dir="ltr">
            </div>
            <button class="btn btn-primary btn-sm" onclick="Pages.saveApiUrl()">
              <i class="bi bi-check me-1"></i>\u05E9\u05DE\u05D5\u05E8
            </button>
          </div>
        </div>

        <!-- Cache -->
        <div class="col-md-6">
          <div class="card p-3">
            <h6 class="fw-bold mb-3"><i class="bi bi-database me-2"></i>\u05DE\u05D8\u05DE\u05D5\u05DF</h6>
            <p class="text-muted small">\u05E0\u05D9\u05E7\u05D5\u05D9 \u05DE\u05D8\u05DE\u05D5\u05DF \u05D9\u05D0\u05DC\u05E5 \u05D0\u05EA \u05D4\u05DE\u05E2\u05E8\u05DB\u05EA \u05DC\u05D8\u05E2\u05D5\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05DE\u05D7\u05D3\u05E9 \u05DE\u05D4\u05E9\u05E8\u05EA.</p>
            <button class="btn btn-outline-warning btn-sm" onclick="Pages.clearCache()">
              <i class="bi bi-trash me-1"></i>\u05E0\u05E7\u05D4 \u05DE\u05D8\u05DE\u05D5\u05DF
            </button>
          </div>
        </div>

        <!-- PIN -->
        <div class="col-md-6">
          <div class="card p-3">
            <h6 class="fw-bold mb-3"><i class="bi bi-shield-lock me-2"></i>\u05D0\u05D1\u05D8\u05D7\u05D4</h6>
            <div class="mb-3">
              <label class="form-label">\u05E9\u05D9\u05E0\u05D5\u05D9 \u05E7\u05D5\u05D3 PIN</label>
              <input type="password" class="form-control" id="set-pin" maxlength="6" placeholder="\u05E7\u05D5\u05D3 \u05D7\u05D3\u05E9" inputmode="numeric">
            </div>
            <button class="btn btn-primary btn-sm" onclick="Pages.changePin()">
              <i class="bi bi-key me-1"></i>\u05E2\u05D3\u05DB\u05D5\u05DF
            </button>
          </div>
        </div>

        <!-- System Info -->
        <div class="col-12">
          <div class="card p-3">
            <h6 class="fw-bold mb-3"><i class="bi bi-info-circle me-2"></i>\u05DE\u05D9\u05D3\u05E2 \u05DE\u05E2\u05E8\u05DB\u05EA</h6>
            <div class="row g-2 small">
              <div class="col-sm-6"><strong>\u05D2\u05E8\u05E1\u05D4:</strong> 5.0</div>
              <div class="col-sm-6"><strong>\u05E4\u05DC\u05D8\u05E4\u05D5\u05E8\u05DE\u05D4:</strong> GitHub Pages + Google Sheets</div>
              <div class="col-sm-6"><strong>\u05DE\u05D5\u05E1\u05D3:</strong> \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3</div>
              <div class="col-sm-6"><strong>\u05DE\u05E4\u05EA\u05D7:</strong> \u05D9\u05D5\u05E1\u05E3 \u05E9\u05E0\u05D9\u05D9\u05D3\u05E8</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  settingsInit() {
    document.getElementById('set-dark').addEventListener('change', (e) => {
      const theme = e.target.checked ? 'dark' : 'light';
      localStorage.setItem(App.THEME_KEY, theme);
      App.applyTheme();
    });
  },

  saveApiUrl() {
    const url = document.getElementById('set-api').value.trim();
    if (!url) { Utils.toast('\u05E0\u05D0 \u05DC\u05D4\u05D6\u05D9\u05DF \u05DB\u05EA\u05D5\u05D1\u05EA', 'warning'); return; }
    localStorage.setItem('bht_api_url', url);
    App.API_URL = url;
    Utils.toast('\u05DB\u05EA\u05D5\u05D1\u05EA API \u05E2\u05D5\u05D3\u05DB\u05E0\u05D4', 'success');
  },

  clearCache() {
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith(App.CACHE_PREFIX)) localStorage.removeItem(k);
    });
    Utils.toast('\u05DE\u05D8\u05DE\u05D5\u05DF \u05E0\u05D5\u05E7\u05D4 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4', 'success');
  },

  changePin() {
    const pin = document.getElementById('set-pin').value.trim();
    if (pin.length < 4) { Utils.toast('\u05D4\u05E7\u05D5\u05D3 \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05DB\u05D9\u05DC 4-6 \u05E1\u05E4\u05E8\u05D5\u05EA', 'warning'); return; }
    localStorage.setItem(App.PIN_KEY, Utils.hashPin(pin));
    document.getElementById('set-pin').value = '';
    Utils.toast('\u05E7\u05D5\u05D3 PIN \u05E2\u05D5\u05D3\u05DB\u05DF \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4', 'success');
  }
};
