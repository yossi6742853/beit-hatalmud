/* ===== BHT v5.3 — Parent Portal (פורטל הורים) ===== */
Object.assign(Pages, {
  _portalParents: [

    { id: 1, name: 'רחל כהן', student: 'יוסף כהן', phone: '050-1234567', email: 'rachel@email.com', registered: '2026-03-10', lastLogin: '2026-04-22 08:30', device: 'iPhone 15', logins: 47, active: true, satisfaction: 5 },
    { id: 2, name: 'שרה לוי', student: 'משה לוי', phone: '052-2345678', email: 'sara@email.com', registered: '2026-03-12', lastLogin: '2026-04-21 14:15', device: 'Android', logins: 32, active: true, satisfaction: 4 },
    { id: 3, name: 'דבורה גולדברג', student: 'אברהם גולדברג', phone: '054-3456789', email: 'dvora@email.com', registered: '2026-03-15', lastLogin: '2026-04-22 09:00', device: 'Chrome Desktop', logins: 55, active: true, satisfaction: 5 }
  ],

  _portalInvites: [
    { id: 1, name: 'תמר כץ', student: 'דניאל כץ', phone: '050-5556677', sent: '2026-04-20', status: 'ממתין' },
    { id: 2, name: 'הדסה ליבוביץ', student: 'משה ליבוביץ', phone: '054-8889900', sent: '2026-04-18', status: 'ממתין' },
    { id: 3, name: 'אביגיל רוט', student: 'יצחק רוט', phone: '052-2223344', sent: '2026-04-15', status: 'נשלח שוב' },
    { id: 4, name: 'נעמי בלוי', student: 'שלום בלוי', phone: '053-6667788', sent: '2026-04-10', status: 'פג תוקף' }
  ],

  parentportal() {
    const parents = this._portalParents;
    const invites = this._portalInvites;
    const registered = parents.length;
    const activeWeek = parents.filter(p => p.lastLogin >= '2026-04-17').length;
    const activeToday = parents.filter(p => p.lastLogin.startsWith('2026-04-22')).length;
    const loginRate = Math.round(activeWeek / registered * 100);
    const totalLogins = parents.reduce((s, p) => s + p.logins, 0);
    const regLink = location.origin + location.pathname.replace('index.html', '') + 'form.html';

    // Satisfaction breakdown
    const satLabels = ['\u05DE\u05D0\u05D5\u05D3 \u05DE\u05E8\u05D5\u05E6\u05D4', '\u05DE\u05E8\u05D5\u05E6\u05D4', '\u05E1\u05D1\u05D9\u05E8', '\u05DC\u05D0 \u05DE\u05E8\u05D5\u05E6\u05D4', '\u05DE\u05D0\u05D5\u05DB\u05D6\u05D1'];
    const satCounts = [
      parents.filter(p => p.satisfaction === 5).length,
      parents.filter(p => p.satisfaction === 4).length,
      parents.filter(p => p.satisfaction === 3).length,
      parents.filter(p => p.satisfaction === 2).length,
      parents.filter(p => p.satisfaction === 1).length
    ];
    const satColors = ['#198754', '#20c997', '#ffc107', '#fd7e14', '#dc3545'];
    const satMax = Math.max(...satCounts, 1);
    const avgSat = (parents.reduce((s, p) => s + p.satisfaction, 0) / parents.length).toFixed(1);

    const accessFeatures = [

      { icon: 'bi-calendar-check', title: '\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA', desc: '\u05E6\u05E4\u05D9\u05D9\u05D4 \u05D1\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D4\u05D9\u05DC\u05D3', color: 'primary' },
      { icon: 'bi-journal-bookmark', title: '\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD', desc: '\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD \u05D5\u05D4\u05EA\u05E7\u05D3\u05DE\u05D5\u05EA \u05DC\u05D9\u05DE\u05D5\u05D3\u05D9\u05EA', color: 'success' },
      { icon: 'bi-emoji-smile', title: '\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA', desc: '\u05D3\u05D5\u05D7\u05D5\u05EA \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA \u05D5\u05DE\u05E9\u05D5\u05D1', color: 'warning' }
  ];

    const deviceIcon = (d) => {
      if (d.includes('iPhone') || d.includes('iPad')) return 'bi-apple';
      if (d.includes('Android') || d.includes('Samsung')) return 'bi-phone';
      return 'bi-laptop';
    };

    const loginFrequency = (logins, registered) => {
      const days = Math.max(1, Math.round((new Date('2026-04-22') - new Date(registered)) / 86400000));
      const rate = logins / days;
      if (rate >= 1) return { text: '\u05D9\u05D5\u05DE\u05D9', cls: 'success' };
      if (rate >= 0.3) return { text: '\u05EA\u05DB\u05D5\u05E4\u05EA\u05D9', cls: 'primary' };
      if (rate >= 0.1) return { text: '\u05E9\u05D1\u05D5\u05E2\u05D9', cls: 'warning' };
      return { text: '\u05E0\u05D3\u05D9\u05E8', cls: 'secondary' };
    };

    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div>
        <h1><i class="bi bi-people-fill me-2"></i>\u05E4\u05D5\u05E8\u05D8\u05DC \u05D4\u05D5\u05E8\u05D9\u05DD</h1>
        <p class="text-muted mb-0">\u05DE\u05DE\u05E9\u05E7 \u05D2\u05D9\u05E9\u05D4, \u05D4\u05E8\u05E9\u05DE\u05D4 \u05D5\u05E0\u05D9\u05D4\u05D5\u05DC \u05D4\u05D5\u05E8\u05D9\u05DD</p>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-success btn-sm" onclick="Pages._portalExport()"><i class="bi bi-download me-1"></i>\u05D9\u05D9\u05E6\u05D5\u05D0 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD</button>
        <button class="btn btn-primary btn-sm" onclick="Pages._portalShowInvite()"><i class="bi bi-send me-1"></i>\u05E9\u05DC\u05D7 \u05D4\u05D6\u05DE\u05E0\u05D4</button>
      </div>
    </div>

    <!-- Stats Row -->
    <div class="row g-3 mb-3">
      <div class="col-6 col-md-3">
        <div class="card p-3 text-center border-start border-4 border-primary">
          <div class="fs-3 fw-bold text-primary">${registered}</div>
          <small class="text-muted">\u05D4\u05D5\u05E8\u05D9\u05DD \u05E8\u05E9\u05D5\u05DE\u05D9\u05DD</small>
          <div class="progress mt-2" style="height:4px"><div class="progress-bar bg-primary" style="width:${Math.min(100, registered * 5)}%"></div></div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card p-3 text-center border-start border-4 border-success">
          <div class="fs-3 fw-bold text-success">${activeWeek}</div>
          <small class="text-muted">\u05E4\u05E2\u05D9\u05DC\u05D9\u05DD \u05D4\u05E9\u05D1\u05D5\u05E2</small>
          <div class="progress mt-2" style="height:4px"><div class="progress-bar bg-success" style="width:${Math.round(activeWeek/registered*100)}%"></div></div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card p-3 text-center border-start border-4 border-info">
          <div class="fs-3 fw-bold text-info">${loginRate}%</div>
          <small class="text-muted">\u05D0\u05D7\u05D5\u05D6 \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA</small>
          <div class="progress mt-2" style="height:4px"><div class="progress-bar bg-info" style="width:${loginRate}%"></div></div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card p-3 text-center border-start border-4 border-warning">
          <div class="fs-3 fw-bold text-warning">${totalLogins}</div>
          <small class="text-muted">\u05E1\u05D4"\u05DB \u05DB\u05E0\u05D9\u05E1\u05D5\u05EA</small>
          <div class="progress mt-2" style="height:4px"><div class="progress-bar bg-warning" style="width:100%"></div></div>
        </div>
      </div>
    </div>

    <div class="row g-3 mb-3">
      <!-- Registration Link & Share -->
      <div class="col-lg-5">
        <div class="card p-4 h-100">
          <h5 class="fw-bold mb-3"><i class="bi bi-link-45deg me-2 text-primary"></i>\u05E7\u05D9\u05E9\u05D5\u05E8 \u05DC\u05D8\u05D5\u05E4\u05E1 \u05D4\u05E8\u05E9\u05DE\u05D4</h5>
          <p class="text-muted small">\u05E9\u05EA\u05E3 \u05E7\u05D9\u05E9\u05D5\u05E8 \u05D6\u05D4 \u05E2\u05DD \u05D4\u05D5\u05E8\u05D9\u05DD \u05D7\u05D3\u05E9\u05D9\u05DD \u05DC\u05D4\u05E8\u05E9\u05DE\u05D4 \u05DC\u05E4\u05D5\u05E8\u05D8\u05DC:</p>
          <div class="input-group mb-3">
            <input class="form-control form-control-sm" id="reg-link" value="${regLink}" readonly dir="ltr">
            <button class="btn btn-primary btn-sm" onclick="Utils.copyText(document.getElementById('reg-link').value);Utils.toast('\u05D4\u05E7\u05D9\u05E9\u05D5\u05E8 \u05D4\u05D5\u05E2\u05EA\u05E7!')"><i class="bi bi-clipboard me-1"></i>\u05D4\u05E2\u05EA\u05E7</button>
          </div>
          <div class="d-flex gap-2 flex-wrap mb-3">
            <button class="btn btn-success btn-sm" onclick="window.open('https://wa.me/?text='+encodeURIComponent('\\u05E9\\u05DC\\u05D5\\u05DD, \\u05D4\\u05E0\\u05D4 \\u05E7\\u05D9\\u05E9\\u05D5\\u05E8 \\u05DC\\u05D8\\u05D5\\u05E4\\u05E1 \\u05D4\\u05E8\\u05E9\\u05DE\\u05D4 \\u05DC\\u05D1\\u05D9\\u05EA \\u05D4\\u05EA\\u05DC\\u05DE\\u05D5\\u05D3: '+document.getElementById('reg-link').value))">
              <i class="bi bi-whatsapp me-1"></i>WhatsApp
            </button>
            <button class="btn btn-outline-primary btn-sm" onclick="Utils.toast('\u05D4\u05E7\u05D9\u05E9\u05D5\u05E8 \u05E0\u05E9\u05DC\u05D7 \u05D1-SMS','info')">
              <i class="bi bi-phone me-1"></i>SMS
            </button>
            <button class="btn btn-outline-info btn-sm" onclick="Utils.copyText('\u05E9\u05DC\u05D5\u05DD, \u05D4\u05E0\u05D4 \u05E7\u05D9\u05E9\u05D5\u05E8 \u05DC\u05D8\u05D5\u05E4\u05E1 \u05D4\u05E8\u05E9\u05DE\u05D4 \u05DC\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3: '+document.getElementById('reg-link').value);Utils.toast('\u05D4\u05D5\u05D3\u05E2\u05D4 \u05D4\u05D5\u05E2\u05EA\u05E7\u05D4!')">
              <i class="bi bi-envelope me-1"></i>\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC
            </button>
          </div>
          <div class="alert alert-light border small mb-0 d-flex align-items-center gap-2">
            <i class="bi bi-info-circle text-primary"></i>
            <span>\u05D4\u05E7\u05D9\u05E9\u05D5\u05E8 \u05D1\u05D8\u05D5\u05D7 \u05D5\u05E0\u05D2\u05D9\u05E9 \u05DC\u05DB\u05DC \u05D4\u05D5\u05E8\u05D4 \u05E9\u05D8\u05E8\u05DD \u05E0\u05E8\u05E9\u05DD</span>
          </div>
        </div>
      </div>

      <!-- QR Code -->
      <div class="col-lg-3">
        <div class="card p-4 h-100 text-center">
          <h5 class="fw-bold mb-3"><i class="bi bi-qr-code me-2"></i>QR Code</h5>
          <div class="mx-auto p-3 bg-white border border-2 border-dark rounded" style="width:160px;height:160px">
            <div class="d-flex flex-wrap justify-content-center" style="width:128px;height:128px;margin:0 auto;gap:0">
              ${(() => {
                const size = 16;
                let pixels = '';
                // Deterministic QR-like pattern
                for (let r = 0; r < size; r++) {
                  for (let c = 0; c < size; c++) {
                    const corner = (r < 4 && c < 4) || (r < 4 && c >= size-4) || (r >= size-4 && c < 4);
                    const border = corner && (r === 0 || r === 3 || r === size-4 || r === size-1 || c === 0 || c === 3 || c === size-4 || c === size-1);
                    const inner = corner && r >= 1 && r <= 2 && c >= 1 && c <= 2 || corner && r >= size-3 && r <= size-2 && c >= 1 && c <= 2 || corner && r >= 1 && r <= 2 && c >= size-3 && c <= size-2;
                    const black = border || inner || (!corner && ((r * 7 + c * 13) % 3 === 0));
                    pixels += `<div style="width:8px;height:8px;background:${black ? '#000' : '#fff'}"></div>`;
                  }
                }
                return pixels;
              })()}
            </div>
          </div>
          <small class="text-muted d-block mt-2">\u05E1\u05E8\u05D5\u05E7 \u05DC\u05D8\u05D5\u05E4\u05E1 \u05D4\u05E8\u05E9\u05DE\u05D4</small>
          <div class="d-flex justify-content-center gap-2 mt-3">
            <button class="btn btn-outline-secondary btn-sm" onclick="Utils.toast('\u05D4\u05D3\u05E4\u05E1\u05EA QR...','info')"><i class="bi bi-printer me-1"></i>\u05D4\u05D3\u05E4\u05E1</button>
            <button class="btn btn-outline-primary btn-sm" onclick="Utils.toast('\u05D4\u05D5\u05E8\u05D3 QR...','info')"><i class="bi bi-download me-1"></i>\u05D4\u05D5\u05E8\u05D3</button>
          </div>
        </div>
      </div>

      <!-- Satisfaction Survey -->
      <div class="col-lg-4">
        <div class="card p-4 h-100">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="fw-bold mb-0"><i class="bi bi-star-fill me-2 text-warning"></i>\u05E1\u05E7\u05E8 \u05E9\u05D1\u05D9\u05E2\u05D5\u05EA \u05E8\u05E6\u05D5\u05DF</h5>
            <span class="badge bg-warning-subtle text-warning fs-6">${avgSat} <i class="bi bi-star-fill" style="font-size:0.7rem"></i></span>
          </div>
          ${satLabels.map((label, i) => `
          <div class="d-flex align-items-center gap-2 mb-2">
            <span class="small text-nowrap" style="width:80px">${label}</span>
            <div class="flex-grow-1">
              <div class="progress" style="height:20px">
                <div class="progress-bar" style="width:${Math.round(satCounts[i]/satMax*100)}%;background:${satColors[i]}">
                  <span class="small fw-bold">${satCounts[i]}</span>
                </div>
              </div>
            </div>
          </div>`).join('')}
          <div class="text-center mt-2 small text-muted">\u05DE\u05EA\u05D5\u05DA ${parents.length} \u05DE\u05E9\u05D9\u05D1\u05D9\u05DD</div>
        </div>
      </div>
    </div>

    <!-- 8 Feature Cards -->
    <div class="card p-4 mb-3">
      <h5 class="fw-bold mb-3"><i class="bi bi-shield-check me-2 text-success"></i>\u05DE\u05D4 \u05D4\u05D4\u05D5\u05E8\u05D9\u05DD \u05D9\u05DB\u05D5\u05DC\u05D9\u05DD \u05DC\u05E8\u05D0\u05D5\u05EA?</h5>
      <div class="row g-3">
        ${accessFeatures.map(f => `
        <div class="col-6 col-md-3">
          <div class="text-center p-3 bg-${f.color}-subtle rounded h-100 position-relative overflow-hidden">
            <div class="position-absolute top-0 start-0 w-100 h-100 opacity-10" style="background:linear-gradient(135deg,var(--bs-${f.color}) 0%,transparent 60%)"></div>
            <i class="bi ${f.icon} text-${f.color} d-block mb-2 position-relative" style="font-size:2.5rem"></i>
            <div class="fw-bold small position-relative">${f.title}</div>
            <div class="small text-muted position-relative">${f.desc}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>

    <!-- Tabs: Logins / Invites -->
    <ul class="nav nav-tabs mb-3" id="portal-tabs">
      <li class="nav-item"><a class="nav-link active" href="#" onclick="Pages._portalTab('logins',event)"><i class="bi bi-clock-history me-1"></i>\u05DB\u05E0\u05D9\u05E1\u05D5\u05EA \u05D0\u05D7\u05E8\u05D5\u05E0\u05D5\u05EA (${parents.length})</a></li>
      <li class="nav-item"><a class="nav-link" href="#" onclick="Pages._portalTab('invites',event)"><i class="bi bi-send me-1"></i>\u05D4\u05D6\u05DE\u05E0\u05D5\u05EA \u05DE\u05DE\u05EA\u05D9\u05E0\u05D5\u05EA (${invites.filter(i=>i.status==='\u05DE\u05DE\u05EA\u05D9\u05DF').length})</a></li>
    </ul>

    <!-- Logins Table -->
    <div id="portal-logins-tab">
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <span class="fw-bold">\u05D4\u05D5\u05E8\u05D9\u05DD \u05E8\u05E9\u05D5\u05DE\u05D9\u05DD</span>
          <div class="d-flex gap-2">
            <input class="form-control form-control-sm" id="portal-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9..." style="max-width:200px" oninput="Pages._portalFilter()">
            <select class="form-select form-select-sm" id="portal-status-filter" style="max-width:130px" onchange="Pages._portalFilter()">
              <option value="">\u05D4\u05DB\u05DC</option>
              <option value="active">\u05E4\u05E2\u05D9\u05DC\u05D9\u05DD</option>
              <option value="inactive">\u05DC\u05D0 \u05E4\u05E2\u05D9\u05DC\u05D9\u05DD</option>
            </select>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table table-bht mb-0">
            <thead><tr><th>\u05D4\u05D5\u05E8\u05D4</th><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th>\u05D8\u05DC\u05E4\u05D5\u05DF</th><th>\u05DB\u05E0\u05D9\u05E1\u05D4 \u05D0\u05D7\u05E8\u05D5\u05E0\u05D4</th><th>\u05DE\u05DB\u05E9\u05D9\u05E8</th><th>\u05EA\u05D3\u05D9\u05E8\u05D5\u05EA</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th><th>\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA</th></tr></thead>
            <tbody id="portal-tbody">
              ${[...parents].sort((a, b) => b.lastLogin.localeCompare(a.lastLogin)).map(p => {
                const freq = loginFrequency(p.logins, p.registered);
                return `
              <tr class="portal-row" data-search="${p.name} ${p.student} ${p.phone}" data-active="${p.active}">
                <td><div class="d-flex align-items-center gap-2">${Utils.avatarHTML(p.name, 'xs')}<div><span class="fw-bold">${p.name}</span></div></div></td>
                <td>${p.student}</td>
                <td dir="ltr" class="text-muted small">${p.phone}</td>
                <td class="small">${p.lastLogin}</td>
                <td><i class="bi ${deviceIcon(p.device)} me-1 text-muted"></i><span class="small">${p.device}</span></td>
                <td><span class="badge bg-${freq.cls}-subtle text-${freq.cls}">${freq.text}</span></td>
                <td><span class="badge bg-${p.active ? 'success' : 'secondary'}"><i class="bi bi-circle-fill me-1" style="font-size:0.4rem"></i>${p.active ? '\u05E4\u05E2\u05D9\u05DC' : '\u05DC\u05D0 \u05E4\u05E2\u05D9\u05DC'}</span></td>
                <td class="text-center fw-bold">${p.logins}</td>
              </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
        <div class="card-footer small text-muted d-flex justify-content-between">
          <span>\u05DE\u05E6\u05D9\u05D2 ${parents.length} \u05D4\u05D5\u05E8\u05D9\u05DD</span>
          <span>\u05DE\u05DE\u05D5\u05D9\u05DF \u05DC\u05E4\u05D9 \u05DB\u05E0\u05D9\u05E1\u05D4 \u05D0\u05D7\u05E8\u05D5\u05E0\u05D4</span>
        </div>
      </div>
    </div>

    <!-- Invites Tab -->
    <div id="portal-invites-tab" style="display:none">
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <span class="fw-bold"><i class="bi bi-send me-2"></i>\u05E0\u05D9\u05D4\u05D5\u05DC \u05D4\u05D6\u05DE\u05E0\u05D5\u05EA</span>
          <button class="btn btn-primary btn-sm" onclick="Pages._portalShowInvite()"><i class="bi bi-plus me-1"></i>\u05D4\u05D6\u05DE\u05E0\u05D4 \u05D7\u05D3\u05E9\u05D4</button>
        </div>
        <div class="table-responsive">
          <table class="table table-bht mb-0">
            <thead><tr><th>\u05E9\u05DD \u05D4\u05D5\u05E8\u05D4</th><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th>\u05D8\u05DC\u05E4\u05D5\u05DF</th><th>\u05E0\u05E9\u05DC\u05D7 \u05D1\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th><th>\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA</th></tr></thead>
            <tbody>
              ${invites.map(inv => {
                const statusColor = inv.status === '\u05DE\u05DE\u05EA\u05D9\u05DF' ? 'warning' : inv.status === '\u05E0\u05E9\u05DC\u05D7 \u05E9\u05D5\u05D1' ? 'info' : 'secondary';
                return `
              <tr>
                <td class="fw-bold">${inv.name}</td>
                <td>${inv.student}</td>
                <td dir="ltr" class="text-muted small">${inv.phone}</td>
                <td>${Utils.formatDateShort(inv.sent)}</td>
                <td><span class="badge bg-${statusColor}">${inv.status}</span></td>
                <td>
                  <div class="d-flex gap-1">
                    <button class="btn btn-outline-primary btn-sm" style="padding:2px 8px;font-size:0.75rem" onclick="Utils.toast('\u05D4\u05D6\u05DE\u05E0\u05D4 \u05E0\u05E9\u05DC\u05D7\u05D4 \u05E9\u05D5\u05D1!')"><i class="bi bi-arrow-repeat"></i></button>
                    <button class="btn btn-outline-danger btn-sm" style="padding:2px 8px;font-size:0.75rem" onclick="Utils.toast('\u05D4\u05D6\u05DE\u05E0\u05D4 \u05D1\u05D5\u05D8\u05DC\u05D4','warning')"><i class="bi bi-x-lg"></i></button>
                  </div>
                </td>
              </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Invite Modal -->
    <div class="modal fade" id="portal-invite-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title"><i class="bi bi-send me-2"></i>\u05E9\u05DC\u05D7 \u05D4\u05D6\u05DE\u05E0\u05D4</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <div class="row g-3">
          <div class="col-6"><label class="form-label">\u05E9\u05DD \u05D4\u05D5\u05E8\u05D4</label><input class="form-control" id="inv-name" placeholder="\u05E9\u05DD \u05DE\u05DC\u05D0"></div>
          <div class="col-6"><label class="form-label">\u05E9\u05DD \u05EA\u05DC\u05DE\u05D9\u05D3</label><input class="form-control" id="inv-student" placeholder="\u05E9\u05DD \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3"></div>
          <div class="col-6"><label class="form-label">\u05D8\u05DC\u05E4\u05D5\u05DF</label><input class="form-control" id="inv-phone" placeholder="050-0000000" dir="ltr"></div>
          <div class="col-6">
            <label class="form-label">\u05E9\u05DC\u05D7 \u05D3\u05E8\u05DA</label>
            <select class="form-select" id="inv-method">
              <option value="whatsapp">WhatsApp</option>
              <option value="sms">SMS</option>
              <option value="email">\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC</option>
            </select>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button>
        <button class="btn btn-primary" onclick="Pages._portalSendInvite()"><i class="bi bi-send me-1"></i>\u05E9\u05DC\u05D7</button>
      </div>
    </div></div></div>`;
  },

  _portalUseDemo: false,

  parentportalLoadDemo() {
    this._portalUseDemo = true;
    App.navigate('parentportal');
  },

  async parentportalInit() {
    // Try loading parents from API
    try {
      const apiData = await App.getData('הורים');
      if (apiData && apiData.length) {
        this._portalParents = apiData.map((row, i) => ({
          id: row._id || row.id || i + 1,
          name: row['שם'] || row.name || '',
          student: row['תלמיד'] || row.student || '',
          phone: row['טלפון'] || row.phone || '',
          email: row['אימייל'] || row.email || '',
          registered: row['תאריך_רישום'] || row.registered || '',
          lastLogin: row['כניסה_אחרונה'] || row.lastLogin || '',
          device: row['מכשיר'] || row.device || '',
          logins: parseInt(row['כניסות'] || row.logins) || 0,
          active: row['פעיל'] === 'כן' || row.active === true,
          satisfaction: parseInt(row['שביעות_רצון'] || row.satisfaction) || 4
        }));
      }
    } catch(e) { /* keep current data */ }

    // If no API data and demo not requested, clear hardcoded
    if (!this._portalUseDemo && this._portalParents?.length && this._portalParents[0]?.id === 1 && this._portalParents[0]?.name?.includes('יוסף')) {
      this._portalParents = [];
    }

    // Auto-refresh active count (clear previous interval to prevent leaks)
    if (this._portalRefreshTimer) clearInterval(this._portalRefreshTimer);
    this._portalRefreshTimer = setInterval(() => {
      if (App.currentPage !== 'parentportal') { clearInterval(this._portalRefreshTimer); return; }
      const badge = document.querySelector('#portal-tabs .nav-link.active .badge');
      if (badge) badge.textContent = this._portalParents.filter(p => p.active).length;
    }, 60000);
  },

  _portalTab(tab, e) {
    e.preventDefault();
    document.querySelectorAll('#portal-tabs .nav-link').forEach(l => l.classList.remove('active'));
    e.currentTarget.classList.add('active');
    document.getElementById('portal-logins-tab').style.display = tab === 'logins' ? '' : 'none';
    document.getElementById('portal-invites-tab').style.display = tab === 'invites' ? '' : 'none';
  },

  _portalFilter() {
    const q = (document.getElementById('portal-search')?.value || '').toLowerCase();
    const statusF = document.getElementById('portal-status-filter')?.value || '';
    document.querySelectorAll('.portal-row').forEach(row => {
      const matchQ = !q || (row.dataset.search || '').toLowerCase().includes(q);
      const matchStatus = !statusF || (statusF === 'active' && row.dataset.active === 'true') || (statusF === 'inactive' && row.dataset.active === 'false');
      row.style.display = matchQ && matchStatus ? '' : 'none';
    });
    // Update counter
    const visible = document.querySelectorAll('.portal-row:not([style*="display: none"])').length;
    const footer = document.querySelector('#portal-logins-tab .card-footer span');
    if (footer) footer.textContent = `\u05DE\u05E6\u05D9\u05D2 ${visible} \u05D4\u05D5\u05E8\u05D9\u05DD`;
  },

  _portalShowInvite() {
    new bootstrap.Modal(document.getElementById('portal-invite-modal')).show();
  },

  _portalSendInvite() {
    const name = document.getElementById('inv-name')?.value?.trim();
    const student = document.getElementById('inv-student')?.value?.trim();
    const phone = document.getElementById('inv-phone')?.value?.trim();
    if (!name || !student || !phone) { Utils.toast('\u05D9\u05E9 \u05DC\u05DE\u05DC\u05D0 \u05D0\u05EA \u05DB\u05DC \u05D4\u05E9\u05D3\u05D5\u05EA', 'warning'); return; }
    this._portalInvites.unshift({
      id: this._portalInvites.length + 1, name, student, phone,
      sent: new Date().toISOString().slice(0, 10), status: '\u05DE\u05DE\u05EA\u05D9\u05DF'
    });
    bootstrap.Modal.getInstance(document.getElementById('portal-invite-modal'))?.hide();
    Utils.toast('\u05D4\u05D6\u05DE\u05E0\u05D4 \u05E0\u05E9\u05DC\u05D7\u05D4 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4!');
    App.navigate('parentportal');
  },

  _portalExport() {
    const csv = '\u05E9\u05DD,\u05EA\u05DC\u05DE\u05D9\u05D3,\u05D8\u05DC\u05E4\u05D5\u05DF,\u05DB\u05E0\u05D9\u05E1\u05D4 \u05D0\u05D7\u05E8\u05D5\u05E0\u05D4,\u05E1\u05D8\u05D8\u05D5\u05E1\n' +
      this._portalParents.map(p => `${p.name},${p.student},${p.phone},${p.lastLogin},${p.active ? '\u05E4\u05E2\u05D9\u05DC' : '\u05DC\u05D0 \u05E4\u05E2\u05D9\u05DC'}`).join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'parents_export.csv';
    a.click();
    Utils.toast('\u05E7\u05D5\u05D1\u05E5 \u05D9\u05D5\u05E6\u05D0 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4!');
  }
});
