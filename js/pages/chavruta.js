/* ===== BHT v5.3 — Chavruta (\u05d7\u05d1\u05e8\u05d5\u05ea\u05d5\u05ea) ===== */
Object.assign(Pages, {
  _chavPairs: [

    { id: 1, s1: '\u05d9\u05d5\u05e1\u05e3 \u05db\u05d4\u05df', s2: '\u05de\u05e9\u05d4 \u05dc\u05d5\u05d9', subject: '\u05d2\u05de\u05e8\u05d0', level: '\u05de\u05ea\u05e7\u05d3\u05dd', schedule: '\u05d0-\u05d2 09:00-10:30', status: '\u05e4\u05e2\u05d9\u05dc', sessions: 24, lastSession: '2026-04-21', notes: '\u05de\u05e1\u05db\u05ea \u05d1\u05d1\u05d0 \u05de\u05e6\u05d9\u05e2\u05d0 \u05e4\u05e8\u05e7 \u05d1' },
    { id: 2, s1: '\u05d0\u05d1\u05e8\u05d4\u05dd \u05d2\u05d5\u05dc\u05d3\u05d1\u05e8\u05d2', s2: '\u05d3\u05d5\u05d3 \u05e4\u05e8\u05d9\u05d3\u05de\u05df', subject: '\u05d4\u05dc\u05db\u05d4', level: '\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', schedule: '\u05d1-\u05d3 11:00-12:00', status: '\u05e4\u05e2\u05d9\u05dc', sessions: 18, lastSession: '2026-04-22', notes: '\u05d4\u05dc\u05db\u05d5\u05ea \u05e9\u05d1\u05ea' },
    { id: 3, s1: '\u05d0\u05dc\u05d9\u05d4\u05d5 \u05e9\u05e4\u05d9\u05e8\u05d0', s2: '\u05d9\u05e2\u05e7\u05d1 \u05e8\u05d5\u05d6\u05e0\u05d1\u05e8\u05d2', subject: '\u05de\u05e9\u05e0\u05d4', level: '\u05de\u05ea\u05d7\u05d9\u05dc', schedule: '\u05d0-\u05d4 08:00-09:00', status: '\u05e4\u05e2\u05d9\u05dc', sessions: 31, lastSession: '2026-04-22', notes: '\u05de\u05e1\u05db\u05ea \u05d1\u05e8\u05db\u05d5\u05ea' }
  ],

  _chavSessionLog: [

    { id: 1, pairId: 1, date: '2026-04-21', duration: 90, topic: '\u05e1\u05d5\u05d2\u05d9\u05d0 \u05e9\u05dc \u05e9\u05e0\u05d9\u05dd \u05d0\u05d5\u05d7\u05d6\u05d9\u05df', rating: 5 },
    { id: 2, pairId: 2, date: '2026-04-22', duration: 60, topic: '\u05d4\u05dc\u05db\u05d5\u05ea \u05d4\u05d3\u05dc\u05e7\u05ea \u05e0\u05e8\u05d5\u05ea', rating: 4 },
    { id: 3, pairId: 3, date: '2026-04-22', duration: 60, topic: '\u05e4\u05e8\u05e7 \u05d2 \u05de\u05e9\u05e0\u05d4 \u05d4-\u05d7', rating: 5 }
  ],

  chavruta() {
    const pairs = this._chavPairs;
    const sessions = this._chavSessionLog;
    const active = pairs.filter(p => p.status === '\u05e4\u05e2\u05d9\u05dc').length;
    const paused = pairs.filter(p => p.status === '\u05de\u05d5\u05e9\u05d4\u05d4').length;
    const weekSessions = sessions.filter(s => s.date >= '2026-04-17').length;
    const weekHours = Math.round(sessions.filter(s => s.date >= '2026-04-17').reduce((sum, s) => sum + s.duration, 0) / 60 * 10) / 10;
    const totalHours = Math.round(sessions.reduce((sum, s) => sum + s.duration, 0) / 60 * 10) / 10;
    const avgRating = sessions.length ? (sessions.reduce((s, x) => s + x.rating, 0) / sessions.length).toFixed(1) : 0;
    const subjects = ['\u05d2\u05de\u05e8\u05d0', '\u05d4\u05dc\u05db\u05d4', '\u05de\u05e9\u05e0\u05d4', '\u05d7\u05d5\u05de\u05e9'];
    const levels = ['\u05de\u05ea\u05d7\u05d9\u05dc', '\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', '\u05de\u05ea\u05e7\u05d3\u05dd'];
    const statusColors = { '\u05e4\u05e2\u05d9\u05dc': 'success', '\u05de\u05d5\u05e9\u05d4\u05d4': 'warning', '\u05dc\u05d0 \u05e4\u05e2\u05d9\u05dc': 'secondary' };
    const subjectColors = { '\u05d2\u05de\u05e8\u05d0': 'primary', '\u05d4\u05dc\u05db\u05d4': 'success', '\u05de\u05e9\u05e0\u05d4': 'info', '\u05d7\u05d5\u05de\u05e9': 'warning' };
    const subjectIcons = { '\u05d2\u05de\u05e8\u05d0': 'book', '\u05d4\u05dc\u05db\u05d4': 'journal-bookmark', '\u05de\u05e9\u05e0\u05d4': 'bookmarks', '\u05d7\u05d5\u05de\u05e9': 'book-half' };

    // subject breakdown
    const subjCounts = {};
    pairs.forEach(p => { subjCounts[p.subject] = (subjCounts[p.subject] || 0) + 1; });

    // weekly schedule grid data
    const dayNames = ['\u05d0\'', '\u05d1\'', '\u05d2\'', '\u05d3\'', '\u05d4\''];

    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div><h1><i class="bi bi-person-hearts me-2"></i>\u05d7\u05d1\u05e8\u05d5\u05ea\u05d5\u05ea</h1><p class="text-muted mb-0">\u05e9\u05d9\u05d1\u05d5\u05e5 \u05d5\u05e0\u05d9\u05d4\u05d5\u05dc \u05d7\u05d1\u05e8\u05d5\u05ea\u05d5\u05ea \u05dc\u05d9\u05de\u05d5\u05d3</p></div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-info btn-sm" onclick="Pages._chavSuggest()"><i class="bi bi-lightbulb me-1"></i>\u05d4\u05e6\u05e2 \u05e9\u05d9\u05d1\u05d5\u05e5</button>
        <button class="btn btn-primary btn-sm" onclick="Pages._chavShowAdd()"><i class="bi bi-plus-lg me-1"></i>\u05d7\u05d1\u05e8\u05d5\u05ea\u05d0 \u05d7\u05d3\u05e9\u05d4</button>
      </div>
    </div>

    <!-- Stats -->
    <div class="row g-3 mb-3">
      <div class="col-6 col-md-3"><div class="card p-3 text-center">
        <div class="fs-4 fw-bold text-primary">${pairs.length}</div>
        <small class="text-muted">\u05e1\u05d4"\u05db \u05d7\u05d1\u05e8\u05d5\u05ea\u05d5\u05ea</small>
      </div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center">
        <div class="fs-4 fw-bold text-success">${active}</div>
        <small class="text-muted">\u05e4\u05e2\u05d9\u05dc\u05d5\u05ea</small>
      </div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center">
        <div class="fs-4 fw-bold text-info">${weekSessions}</div>
        <small class="text-muted">\u05de\u05e4\u05d2\u05e9\u05d9\u05dd \u05d4\u05e9\u05d1\u05d5\u05e2</small>
      </div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center">
        <div class="fs-4 fw-bold text-warning">${weekHours}</div>
        <small class="text-muted">\u05e9\u05e2\u05d5\u05ea \u05d4\u05e9\u05d1\u05d5\u05e2</small>
      </div></div>
    </div>

    <!-- Extra stats row -->
    <div class="row g-3 mb-3">
      <div class="col-md-4"><div class="card p-3">
        <h6 class="mb-2"><i class="bi bi-pie-chart me-2"></i>\u05e4\u05d9\u05dc\u05d5\u05d7 \u05dc\u05e4\u05d9 \u05e0\u05d5\u05e9\u05d0</h6>
        <div class="d-flex gap-2 flex-wrap">
          ${Object.entries(subjCounts).map(([s, c]) => `<span class="badge bg-${subjectColors[s] || 'secondary'} px-3 py-2"><i class="bi bi-${subjectIcons[s] || 'book'} me-1"></i>${s}: ${c}</span>`).join('')}
        </div>
      </div></div>
      <div class="col-md-4"><div class="card p-3 text-center">
        <div class="small text-muted mb-1">\u05e1\u05d4"\u05db \u05e9\u05e2\u05d5\u05ea \u05dc\u05d9\u05de\u05d5\u05d3</div>
        <div class="fs-3 fw-bold text-primary">${totalHours}</div>
        <div class="small text-muted">${sessions.length} \u05de\u05e4\u05d2\u05e9\u05d9\u05dd</div>
      </div></div>
      <div class="col-md-4"><div class="card p-3 text-center">
        <div class="small text-muted mb-1">\u05d3\u05d9\u05e8\u05d5\u05d2 \u05de\u05de\u05d5\u05e6\u05e2</div>
        <div class="fs-3 fw-bold text-warning">${avgRating} <i class="bi bi-star-fill text-warning" style="font-size:0.8em"></i></div>
        <div class="small text-muted">\u05de\u05ea\u05d5\u05da 5</div>
      </div></div>
    </div>

    <!-- Filters -->
    <div class="d-flex gap-2 mb-3 flex-wrap">
      <input class="form-control form-control-sm" id="chav-search" placeholder="\u05d7\u05d9\u05e4\u05d5\u05e9..." style="max-width:220px" oninput="Pages._chavFilter()">
      <select class="form-select form-select-sm" id="chav-subj-filter" style="max-width:150px" onchange="Pages._chavFilter()">
        <option value="">\u05db\u05dc \u05d4\u05e0\u05d5\u05e9\u05d0\u05d9\u05dd</option>${subjects.map(s => `<option>${s}</option>`).join('')}
      </select>
      <select class="form-select form-select-sm" id="chav-level-filter" style="max-width:140px" onchange="Pages._chavFilter()">
        <option value="">\u05db\u05dc \u05d4\u05e8\u05de\u05d5\u05ea</option>${levels.map(l => `<option>${l}</option>`).join('')}
      </select>
      <select class="form-select form-select-sm" id="chav-status-filter" style="max-width:140px" onchange="Pages._chavFilter()">
        <option value="">\u05db\u05dc \u05d4\u05e1\u05d8\u05d8\u05d5\u05e1\u05d9\u05dd</option><option>\u05e4\u05e2\u05d9\u05dc</option><option>\u05de\u05d5\u05e9\u05d4\u05d4</option><option>\u05dc\u05d0 \u05e4\u05e2\u05d9\u05dc</option>
      </select>
    </div>

    <!-- Tabs -->
    <ul class="nav nav-tabs mb-3" id="chav-tabs">
      <li class="nav-item"><a class="nav-link active" href="#" onclick="Pages._chavTab('pairs',event)"><i class="bi bi-people me-1"></i>\u05d7\u05d1\u05e8\u05d5\u05ea\u05d5\u05ea</a></li>
      <li class="nav-item"><a class="nav-link" href="#" onclick="Pages._chavTab('log',event)"><i class="bi bi-journal-text me-1"></i>\u05d9\u05d5\u05de\u05df \u05de\u05e4\u05d2\u05e9\u05d9\u05dd</a></li>
      <li class="nav-item"><a class="nav-link" href="#" onclick="Pages._chavTab('schedule',event)"><i class="bi bi-calendar-week me-1"></i>\u05de\u05e2\u05e8\u05db\u05ea \u05e9\u05e2\u05d5\u05ea</a></li>
    </ul>

    <!-- Pairs Cards -->
    <div id="chav-pairs-tab">
      <div class="row g-3" id="chav-cards">
        ${!pairs.length ? '<div class="col-12 text-center text-muted py-5"><i class="bi bi-person-hearts fs-1 d-block mb-2"></i>\u05d0\u05d9\u05df \u05d7\u05d1\u05e8\u05d5\u05ea\u05d5\u05ea<br><button class="btn btn-outline-primary btn-sm mt-2" onclick="Pages.chavrutaLoadDemo()"><i class="bi bi-play-circle me-1"></i>\u05d8\u05e2\u05df \u05d3\u05de\u05d5</button></div>' : ''}
        ${pairs.map(p => {
          const pairSessions = sessions.filter(s => s.pairId === p.id);
          const pairAvgRating = pairSessions.length ? (pairSessions.reduce((s, x) => s + x.rating, 0) / pairSessions.length).toFixed(1) : '-';
          const pairTotalHours = Math.round(pairSessions.reduce((s, x) => s + x.duration, 0) / 60 * 10) / 10;
          return `
        <div class="col-md-6 chav-card" data-subject="${p.subject}" data-status="${p.status}" data-level="${p.level}" data-search="${p.s1} ${p.s2} ${p.subject} ${p.notes}">
          <div class="card p-3 h-100">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <span class="badge bg-${statusColors[p.status]}">${p.status}</span>
              <div class="d-flex gap-1">
                <span class="badge bg-${subjectColors[p.subject] || 'secondary'}-subtle text-${subjectColors[p.subject] || 'secondary'}"><i class="bi bi-${subjectIcons[p.subject] || 'book'} me-1"></i>${p.subject}</span>
                <span class="badge bg-light text-dark border">${p.level}</span>
              </div>
            </div>
            <div class="d-flex align-items-center gap-3 mb-3">
              <div class="text-center">
                ${Utils.avatarHTML(p.s1, 'sm')}
                <div class="small fw-bold mt-1">${p.s1}</div>
              </div>
              <div class="text-center flex-shrink-0">
                <i class="bi bi-arrow-left-right text-primary fs-5"></i>
              </div>
              <div class="text-center">
                ${Utils.avatarHTML(p.s2, 'sm')}
                <div class="small fw-bold mt-1">${p.s2}</div>
              </div>
            </div>
            <div class="small text-muted mb-1"><i class="bi bi-clock me-1"></i>${p.schedule}</div>
            <div class="small text-muted mb-2"><i class="bi bi-journal me-1"></i>${p.notes}</div>
            <!-- Pair mini stats -->
            <div class="row g-2 mb-2">
              <div class="col-4 text-center"><div class="bg-light rounded p-1"><div class="fw-bold small">${p.sessions}</div><div style="font-size:0.65rem" class="text-muted">\u05de\u05e4\u05d2\u05e9\u05d9\u05dd</div></div></div>
              <div class="col-4 text-center"><div class="bg-light rounded p-1"><div class="fw-bold small">${pairTotalHours}h</div><div style="font-size:0.65rem" class="text-muted">\u05e9\u05e2\u05d5\u05ea</div></div></div>
              <div class="col-4 text-center"><div class="bg-light rounded p-1"><div class="fw-bold small">${pairAvgRating} <i class="bi bi-star-fill text-warning" style="font-size:0.6em"></i></div><div style="font-size:0.65rem" class="text-muted">\u05d3\u05d9\u05e8\u05d5\u05d2</div></div></div>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
              <span class="small text-muted">\u05d0\u05d7\u05e8\u05d5\u05df: ${Utils.formatDateShort(p.lastSession)}</span>
              <button class="btn btn-sm btn-outline-primary" onclick="Pages._chavLogSession(${p.id})"><i class="bi bi-plus-circle me-1"></i>\u05de\u05e4\u05d2\u05e9</button>
            </div>
          </div>
        </div>`;
        }).join('')}
      </div>
    </div>

    <!-- Session Log -->
    <div id="chav-log-tab" style="display:none">
      <div class="card">
        <div class="table-responsive">
          <table class="table table-bht mb-0">
            <thead><tr><th>\u05ea\u05d0\u05e8\u05d9\u05da</th><th>\u05d7\u05d1\u05e8\u05d5\u05ea\u05d0</th><th>\u05e0\u05d5\u05e9\u05d0</th><th>\u05de\u05e9\u05da (\u05d3\u05e7')</th><th>\u05e0\u05d5\u05e9\u05d0 \u05e0\u05dc\u05de\u05d3</th><th>\u05d3\u05d9\u05e8\u05d5\u05d2</th></tr></thead>
            <tbody>
              ${[...sessions].sort((a, b) => (b.date||'').localeCompare(a.date||'') || b.id - a.id).map(s => {
                const pair = pairs.find(p => p.id === s.pairId);
                const stars = '\u2605'.repeat(s.rating) + '\u2606'.repeat(5 - s.rating);
                return `<tr>
                  <td>${Utils.formatDateShort(s.date)}</td>
                  <td><div class="d-flex align-items-center gap-1">${pair ? Utils.avatarHTML(pair.s1, 'xs') : ''}${pair ? Utils.avatarHTML(pair.s2, 'xs') : ''}<span class="fw-bold ms-1">${pair ? pair.s1.split(' ')[0] + ' + ' + pair.s2.split(' ')[0] : '?'}</span></div></td>
                  <td><span class="badge bg-${subjectColors[pair?.subject] || 'secondary'}-subtle text-${subjectColors[pair?.subject] || 'secondary'}">${pair?.subject || '-'}</span></td>
                  <td>${s.duration}</td>
                  <td class="small">${s.topic}</td>
                  <td class="text-warning">${stars}</td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Weekly Schedule Grid -->
    <div id="chav-schedule-tab" style="display:none">
      <div class="card p-3">
        <h6 class="mb-3"><i class="bi bi-calendar-week me-2"></i>\u05de\u05e2\u05e8\u05db\u05ea \u05e9\u05e2\u05d5\u05ea \u05e9\u05d1\u05d5\u05e2\u05d9\u05ea</h6>
        <div class="table-responsive">
          <table class="table table-bordered text-center mb-0" style="table-layout:fixed">
            <thead><tr><th style="width:80px">\u05e9\u05e2\u05d4</th>${dayNames.map(d => `<th>${d}</th>`).join('')}</tr></thead>
            <tbody>
              ${this._chavScheduleGrid(pairs, dayNames)}
            </tbody>
          </table>
        </div>
        <div class="d-flex gap-2 flex-wrap mt-3">
          ${subjects.map(s => `<span class="badge bg-${subjectColors[s] || 'secondary'}">${s}</span>`).join('')}
        </div>
      </div>
    </div>

    <!-- Suggestion Modal -->
    <div class="modal fade" id="chav-suggest-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title"><i class="bi bi-lightbulb me-2 text-warning"></i>\u05d4\u05e6\u05e2\u05d5\u05ea \u05e9\u05d9\u05d1\u05d5\u05e5</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body" id="chav-suggest-body"></div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05e1\u05d2\u05d5\u05e8</button></div>
    </div></div></div>

    <!-- Add Pair Modal -->
    <div class="modal fade" id="chav-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title"><i class="bi bi-person-hearts me-2"></i>\u05d7\u05d1\u05e8\u05d5\u05ea\u05d0 \u05d7\u05d3\u05e9\u05d4</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <div class="row g-3">
          <div class="col-6"><label class="form-label">\u05ea\u05dc\u05de\u05d9\u05d3 1</label><input class="form-control" id="chf-s1" placeholder="\u05e9\u05dd \u05de\u05dc\u05d0"></div>
          <div class="col-6"><label class="form-label">\u05ea\u05dc\u05de\u05d9\u05d3 2</label><input class="form-control" id="chf-s2" placeholder="\u05e9\u05dd \u05de\u05dc\u05d0"></div>
          <div class="col-6"><label class="form-label">\u05e0\u05d5\u05e9\u05d0</label><select class="form-select" id="chf-subject">${subjects.map(s => `<option>${s}</option>`).join('')}</select></div>
          <div class="col-6"><label class="form-label">\u05e8\u05de\u05d4</label><select class="form-select" id="chf-level">${levels.map(l => `<option>${l}</option>`).join('')}</select></div>
          <div class="col-12"><label class="form-label">\u05dc\u05d5\u05d7 \u05d6\u05de\u05e0\u05d9\u05dd</label><input class="form-control" id="chf-schedule" placeholder="\u05dc\u05d3\u05d5\u05d2\u05de\u05d0: \u05d0-\u05d2 09:00-10:30"></div>
          <div class="col-12"><label class="form-label">\u05d4\u05e2\u05e8\u05d5\u05ea</label><input class="form-control" id="chf-notes" placeholder="\u05e0\u05d5\u05e9\u05d0 \u05e0\u05dc\u05de\u05d3, \u05de\u05e1\u05db\u05ea, \u05d5\u05db\u05d3'"></div>
        </div>
      </div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05d1\u05d9\u05d8\u05d5\u05dc</button><button class="btn btn-primary" onclick="Pages._chavSave()"><i class="bi bi-check-lg me-1"></i>\u05e9\u05de\u05d5\u05e8</button></div>
    </div></div></div>

    <!-- Log Session Modal -->
    <div class="modal fade" id="chav-session-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title"><i class="bi bi-journal-plus me-2"></i>\u05e8\u05d9\u05e9\u05d5\u05dd \u05de\u05e4\u05d2\u05e9</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <input type="hidden" id="csf-pairId">
        <div class="row g-3">
          <div class="col-6"><label class="form-label">\u05ea\u05d0\u05e8\u05d9\u05da</label><input type="date" class="form-control" id="csf-date" value="2026-04-22"></div>
          <div class="col-6"><label class="form-label">\u05de\u05e9\u05da (\u05d3\u05e7')</label><input type="number" class="form-control" id="csf-duration" value="60"></div>
          <div class="col-12"><label class="form-label">\u05e0\u05d5\u05e9\u05d0 \u05e0\u05dc\u05de\u05d3</label><input class="form-control" id="csf-topic" placeholder="\u05de\u05d4 \u05dc\u05de\u05d3\u05d5?"></div>
          <div class="col-12">
            <label class="form-label">\u05d3\u05d9\u05e8\u05d5\u05d2</label>
            <div class="d-flex gap-2" id="csf-rating-container">
              ${[1,2,3,4,5].map(r => `<button type="button" class="btn btn-outline-warning btn-sm csf-star" data-val="${r}" onclick="Pages._chavSetRating(${r})"><i class="bi bi-star${r <= 4 ? '-fill' : ''}"></i></button>`).join('')}
            </div>
            <input type="hidden" id="csf-rating" value="4">
          </div>
        </div>
      </div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05d1\u05d9\u05d8\u05d5\u05dc</button><button class="btn btn-primary" onclick="Pages._chavSaveSession()"><i class="bi bi-check-lg me-1"></i>\u05e9\u05de\u05d5\u05e8</button></div>
    </div></div></div>`;
  },

  _chavUseDemo: false,

  chavrutaLoadDemo() {
    this._chavUseDemo = true;
    App.navigate('chavruta');
  },

  chavrutaInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];

    // Try dedicated chavruta sheet first
    try {
      const apiData = _gc('\u05D7\u05D1\u05E8\u05D5\u05EA\u05D5\u05EA');
      if (apiData && apiData.length) {
        this._chavPairs = apiData;
        return;
      }
    } catch(e) { console.error('Error:', e); }

    // Build pairs from real students in DATA_CACHE
    const students = _gc('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
    if (students && students.length >= 2) {
      const active = students.filter(s => s['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E4\u05E2\u05D9\u05DC');
      // Group by class
      const byClass = {};
      active.forEach(s => {
        const cls = s['\u05DB\u05D9\u05EA\u05D4'] || '\u05DC\u05DC\u05D0';
        if (!byClass[cls]) byClass[cls] = [];
        byClass[cls].push(s);
      });
      const subjects = ['\u05D2\u05DE\u05E8\u05D0', '\u05D4\u05DC\u05DB\u05D4', '\u05DE\u05E9\u05E0\u05D4', '\u05D7\u05D5\u05DE\u05E9'];
      const levels = ['\u05DE\u05EA\u05D7\u05D9\u05DC', '\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9', '\u05DE\u05EA\u05E7\u05D3\u05DD'];
      const pairs = [];
      let id = 1;
      Object.entries(byClass).forEach(([cls, list]) => {
        // Pair consecutive students in each class
        for (let i = 0; i + 1 < list.length && pairs.length < 20; i += 2) {
          const s1 = list[i], s2 = list[i + 1];
          const name1 = (s1['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9'] || '') + ' ' + (s1['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4'] || '');
          const name2 = (s2['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9'] || '') + ' ' + (s2['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4'] || '');
          pairs.push({
            id: id++,
            s1: name1.trim(),
            s2: name2.trim(),
            subject: subjects[id % subjects.length],
            level: levels[id % levels.length],
            schedule: '\u05D0-\u05D4 09:00-10:00',
            status: '\u05E4\u05E2\u05D9\u05DC',
            sessions: Math.floor(Math.random() * 20) + 1,
            lastSession: Utils.todayISO(),
            notes: '\u05DB\u05D9\u05EA\u05D4 ' + cls
          });
        }
      });
      if (pairs.length) {
        this._chavPairs = pairs;
        this._chavSessionLog = [];
        return;
      }
    }

    // If no demo flag, clear hardcoded data
    if (!this._chavUseDemo && this._chavPairs.length && this._chavPairs[0]?.id === 1) {
      this._chavPairs = [];
      this._chavSessionLog = [];
    }
  },

  _chavScheduleGrid(pairs, dayNames) {
    // Build time slots from 08:00 to 17:00
    const slots = [];
    for (let h = 8; h <= 16; h++) {
      slots.push(`${String(h).padStart(2,'0')}:00`);
    }
    const dayLetters = ['\u05d0', '\u05d1', '\u05d2', '\u05d3', '\u05d4'];
    const subjectColors = { '\u05d2\u05de\u05e8\u05d0': 'primary', '\u05d4\u05dc\u05db\u05d4': 'success', '\u05de\u05e9\u05e0\u05d4': 'info', '\u05d7\u05d5\u05de\u05e9': 'warning' };
    const activePairs = pairs.filter(p => p.status === '\u05e4\u05e2\u05d9\u05dc');

    return slots.map(slot => {
      const slotH = parseInt(slot);
      return `<tr><td class="fw-bold small bg-light">${slot}</td>${dayLetters.map(day => {
        const matching = activePairs.filter(p => {
          // Parse schedule like "א-ג 09:00-10:30"
          const parts = p.schedule.split(' ');
          if (parts.length < 2) return false;
          const dayRange = parts[0];
          const timeRange = parts[1];
          const [startTime] = timeRange.split('-');
          const startH = parseInt(startTime);
          const endH = parseInt(timeRange.split('-')[1]);
          // Check day
          const dayChars = dayRange.split('-');
          const dayStart = dayLetters.indexOf(dayChars[0]);
          const dayEnd = dayLetters.indexOf(dayChars[1] || dayChars[0]);
          const dayIdx = dayLetters.indexOf(day);
          if (dayIdx < dayStart || dayIdx > dayEnd) return false;
          // Check time
          return slotH >= startH && slotH < endH;
        });
        if (!matching.length) return '<td></td>';
        return `<td class="p-1">${matching.map(p =>
          `<div class="badge bg-${subjectColors[p.subject] || 'secondary'} d-block mb-1 text-truncate" style="font-size:0.65rem" title="${p.s1} + ${p.s2}">${p.s1.split(' ')[0]}+${p.s2.split(' ')[0]}</div>`
        ).join('')}</td>`;
      }).join('')}</tr>`;
    }).join('');
  },

  _chavTab(tab, e) {
    e.preventDefault();
    document.querySelectorAll('#chav-tabs .nav-link').forEach(l => l.classList.remove('active'));
    e.currentTarget.classList.add('active');
    ['pairs', 'log', 'schedule'].forEach(t => {
      const el = document.getElementById('chav-' + t + '-tab');
      if (el) el.style.display = t === tab ? '' : 'none';
    });
  },

  _chavFilter() {
    const q = (document.getElementById('chav-search')?.value || '').toLowerCase();
    const subj = document.getElementById('chav-subj-filter')?.value || '';
    const level = document.getElementById('chav-level-filter')?.value || '';
    const stat = document.getElementById('chav-status-filter')?.value || '';
    document.querySelectorAll('.chav-card').forEach(card => {
      const matchSearch = !q || (card.dataset.search || '').toLowerCase().includes(q);
      const matchSubj = !subj || card.dataset.subject === subj;
      const matchLevel = !level || card.dataset.level === level;
      const matchStat = !stat || card.dataset.status === stat;
      card.style.display = matchSearch && matchSubj && matchLevel && matchStat ? '' : 'none';
    });
  },

  _chavShowAdd() {
    const modal = document.getElementById('chav-modal');
    if (!modal) return;
    modal.querySelectorAll('input').forEach(function(el) { el.value = ''; });
    // Populate student datalists from DATA_CACHE
    var _gc2 = function(s) { return (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : []; };
    var studs = _gc2('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
    var s1 = document.getElementById('chf-s1');
    var s2 = document.getElementById('chf-s2');
    if (studs.length && s1 && s2) {
      var listId1 = 'chav-dl-s1', listId2 = 'chav-dl-s2';
      var opts = studs.map(function(s) {
        var nm = ((s['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9']||'') + ' ' + (s['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4']||'')).trim();
        return '<option value="' + nm + '">';
      }).join('');
      [listId1, listId2].forEach(function(lid) {
        var existing = document.getElementById(lid);
        if (existing) existing.remove();
        var dl = document.createElement('datalist');
        dl.id = lid; dl.innerHTML = opts;
        document.body.appendChild(dl);
      });
      s1.setAttribute('list', listId1);
      s2.setAttribute('list', listId2);
    }
    new bootstrap.Modal(modal).show();
  },

  _chavSave() {
    const s1 = document.getElementById('chf-s1')?.value?.trim();
    const s2 = document.getElementById('chf-s2')?.value?.trim();
    if (!s1 || !s2) { Utils.toast('\u05d9\u05e9 \u05dc\u05de\u05dc\u05d0 \u05e9\u05e0\u05d9 \u05ea\u05dc\u05de\u05d9\u05d3\u05d9\u05dd', 'warning'); return; }
    this._chavPairs.push({
      id: this._chavPairs.length + 1, s1, s2,
      subject: document.getElementById('chf-subject').value,
      level: document.getElementById('chf-level').value,
      schedule: document.getElementById('chf-schedule')?.value || '',
      status: '\u05e4\u05e2\u05d9\u05dc', sessions: 0, lastSession: '-',
      notes: document.getElementById('chf-notes')?.value || ''
    });
    bootstrap.Modal.getInstance(document.getElementById('chav-modal'))?.hide();
    Utils.toast('\u05d7\u05d1\u05e8\u05d5\u05ea\u05d0 \u05e0\u05d5\u05e1\u05e4\u05d4 \u05d1\u05d4\u05e6\u05dc\u05d7\u05d4!');
    App.navigate('chavruta');
  },

  _chavLogSession(pairId) {
    document.getElementById('csf-pairId').value = pairId;
    document.getElementById('csf-date').value = '2026-04-22';
    document.getElementById('csf-duration').value = '60';
    document.getElementById('csf-topic').value = '';
    document.getElementById('csf-rating').value = '4';
    Pages._chavSetRating(4);
    new bootstrap.Modal(document.getElementById('chav-session-modal')).show();
  },

  _chavSetRating(val) {
    document.getElementById('csf-rating').value = val;
    document.querySelectorAll('.csf-star').forEach(btn => {
      const v = parseInt(btn.dataset.val);
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = v <= val ? 'bi bi-star-fill' : 'bi bi-star';
      }
      btn.classList.toggle('btn-warning', v <= val);
      btn.classList.toggle('btn-outline-warning', v > val);
    });
  },

  _chavSaveSession() {
    const pairId = parseInt(document.getElementById('csf-pairId').value);
    const topic = document.getElementById('csf-topic')?.value?.trim();
    if (!topic) { Utils.toast('\u05d9\u05e9 \u05dc\u05de\u05dc\u05d0 \u05e0\u05d5\u05e9\u05d0 \u05e0\u05dc\u05de\u05d3', 'warning'); return; }
    const date = document.getElementById('csf-date')?.value || '2026-04-22';
    const duration = parseInt(document.getElementById('csf-duration')?.value) || 60;
    const rating = parseInt(document.getElementById('csf-rating')?.value) || 4;
    this._chavSessionLog.push({
      id: this._chavSessionLog.length + 1,
      pairId, date, duration, topic, rating
    });
    // Update pair
    const pair = this._chavPairs.find(p => p.id === pairId);
    if (pair) {
      pair.sessions++;
      pair.lastSession = date;
    }
    bootstrap.Modal.getInstance(document.getElementById('chav-session-modal'))?.hide();
    Utils.toast('\u05de\u05e4\u05d2\u05e9 \u05e0\u05e8\u05e9\u05dd \u05d1\u05d4\u05e6\u05dc\u05d7\u05d4!');
    App.navigate('chavruta');
  },

  _chavSuggest() {
    const pairs = this._chavPairs;
    const suggestions = [];
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];

    // Get paired student names
    const pairedNames = new Set();
    pairs.forEach(p => { pairedNames.add(p.s1); pairedNames.add(p.s2); });

    // Find unpaired students from DATA_CACHE
    const students = _gc('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD').filter(s => s['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E4\u05E2\u05D9\u05DC');
    const unpaired = students.filter(s => {
      const fullName = ((s['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9'] || '') + ' ' + (s['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4'] || '')).trim();
      return !pairedNames.has(fullName);
    });

    // Group unpaired by class and suggest pairs
    const byClass = {};
    unpaired.forEach(s => {
      const cls = s['\u05DB\u05D9\u05EA\u05D4'] || '';
      if (!byClass[cls]) byClass[cls] = [];
      byClass[cls].push(s);
    });
    const subjects = ['\u05D2\u05DE\u05E8\u05D0', '\u05D4\u05DC\u05DB\u05D4', '\u05DE\u05E9\u05E0\u05D4', '\u05D7\u05D5\u05DE\u05E9'];

    Object.entries(byClass).forEach(([cls, list]) => {
      for (let i = 0; i + 1 < list.length && suggestions.length < 5; i += 2) {
        const n1 = ((list[i]['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9'] || '') + ' ' + (list[i]['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4'] || '')).trim();
        const n2 = ((list[i+1]['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9'] || '') + ' ' + (list[i+1]['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4'] || '')).trim();
        suggestions.push({
          s1: n1, s2: n2,
          subject: subjects[i % subjects.length],
          level: '\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9',
          reason: '\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05DE\u05DB\u05D9\u05EA\u05D4 ' + cls + ' \u05DC\u05DC\u05D0 \u05D7\u05D1\u05E8\u05D5\u05EA\u05D0 \u05E4\u05E2\u05D9\u05DC\u05D4'
        });
      }
    });

    // Paused pairs suggestions
    const pausedPairs = pairs.filter(p => p.status === '\u05DE\u05D5\u05E9\u05D4\u05D4' || p.status === '\u05DC\u05D0 \u05E4\u05E2\u05D9\u05DC');
    pausedPairs.forEach(p => {
      if (suggestions.length < 8) {
        suggestions.push({
          s1: p.s1, s2: p.s2,
          subject: p.subject, level: p.level,
          reason: '\u05D7\u05D1\u05E8\u05D5\u05EA\u05D0 \u05DE\u05D5\u05E9\u05D4\u05D4 \u2014 \u05DB\u05D3\u05D0\u05D9 \u05DC\u05D7\u05D3\u05E9 \u05D0\u05D5\u05EA\u05D4'
        });
      }
    });

    // Fallback if no suggestions
    if (!suggestions.length) {
      suggestions.push({
        s1: '\u05D0\u05D9\u05DF \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD', s2: '\u05DC\u05E9\u05D9\u05D1\u05D5\u05E5',
        subject: '\u05D2\u05DE\u05E8\u05D0', level: '\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9',
        reason: '\u05DB\u05DC \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05DB\u05D1\u05E8 \u05DE\u05E9\u05D5\u05D1\u05E6\u05D9\u05DD \u05DC\u05D7\u05D1\u05E8\u05D5\u05EA\u05D0'
      });
    }

    const subjectColors = { '\u05d2\u05de\u05e8\u05d0': 'primary', '\u05d4\u05dc\u05db\u05d4': 'success', '\u05de\u05e9\u05e0\u05d4': 'info', '\u05d7\u05d5\u05de\u05e9': 'warning' };
    const body = document.getElementById('chav-suggest-body');
    if (body) {
      body.innerHTML = `
        <div class="mb-3 text-muted small"><i class="bi bi-info-circle me-1"></i>\u05d4\u05d4\u05e6\u05e2\u05d5\u05ea \u05de\u05d1\u05d5\u05e1\u05e1\u05d5\u05ea \u05e2\u05dc \u05d4\u05ea\u05d0\u05de\u05ea \u05e0\u05d5\u05e9\u05d0 \u05d5\u05e8\u05de\u05d4</div>
        ${suggestions.map((s, i) => `
        <div class="card p-3 mb-2 border-start border-3 border-${subjectColors[s.subject] || 'primary'}">
          <div class="d-flex align-items-center gap-3 mb-2">
            <div class="text-center">
              ${Utils.avatarHTML(s.s1, 'xs')}
              <div style="font-size:0.7rem" class="fw-bold">${s.s1.split(' ')[0]}</div>
            </div>
            <i class="bi bi-arrow-left-right text-primary"></i>
            <div class="text-center">
              ${Utils.avatarHTML(s.s2, 'xs')}
              <div style="font-size:0.7rem" class="fw-bold">${s.s2.split(' ')[0]}</div>
            </div>
            <div class="ms-auto d-flex gap-1">
              <span class="badge bg-${subjectColors[s.subject] || 'secondary'}">${s.subject}</span>
              <span class="badge bg-light text-dark border">${s.level}</span>
            </div>
          </div>
          <div class="small text-muted"><i class="bi bi-lightbulb me-1 text-warning"></i>${s.reason}</div>
        </div>`).join('')}`;
    }
    new bootstrap.Modal(document.getElementById('chav-suggest-modal')).show();
  }
});
