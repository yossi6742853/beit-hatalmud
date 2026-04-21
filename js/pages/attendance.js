/* ===== BHT v5.3 — Attendance ===== */
Object.assign(Pages, {
  /* ======================================================================
     ATTENDANCE
     ====================================================================== */
  attendance() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div><h1><i class="bi bi-calendar-check-fill me-2"></i>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</h1><p>${Utils.dayName()} | ${Utils.formatDate(new Date())}</p></div>
        <button class="btn btn-success" onclick="Pages.saveAttendance()"><i class="bi bi-check-lg me-1"></i>\u05E9\u05DE\u05D5\u05E8 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</button>
      </div>
      <div class="card p-3 mb-3"><div class="row g-2 align-items-center">
        <div class="col-md-3"><div class="search-box"><i class="bi bi-search"></i><input type="text" class="form-control" id="att-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9..."></div></div>
        <div class="col-md-2"><input type="date" class="form-control" id="att-date" value="${Utils.todayISO()}"></div>
        <div class="col-md-2"><select class="form-select" id="att-class-filter"><option value="">\u05DB\u05DC \u05D4\u05DB\u05D9\u05EA\u05D5\u05EA</option></select></div>
        <div class="col-md-5 d-flex gap-2 flex-wrap">
          <button class="btn btn-outline-success btn-sm" onclick="Pages.markAll('present')"><i class="bi bi-check-all me-1"></i>\u05D4\u05DB\u05DC \u05E0\u05D5\u05DB\u05D7\u05D9\u05DD</button>
          <button class="btn btn-outline-danger btn-sm" onclick="Pages.markAll('absent')"><i class="bi bi-x-circle me-1"></i>\u05D4\u05DB\u05DC \u05D7\u05E1\u05E8\u05D9\u05DD</button>
          <button class="btn btn-outline-info btn-sm" onclick="Pages.copyAttSummary()"><i class="bi bi-clipboard me-1"></i>\u05D4\u05E2\u05EA\u05E7</button>
          <button class="btn btn-outline-secondary btn-sm" onclick="Pages.printAttendance()"><i class="bi bi-printer me-1"></i>\u05D4\u05D3\u05E4\u05E1</button>
          <span class="badge bg-secondary align-self-center" title="\u05E7\u05D9\u05E6\u05D5\u05E8\u05D9 \u05DE\u05E7\u05DC\u05D3\u05EA">P/A/L</span>
        </div>
      </div></div>
      <div class="card p-2 mb-3"><div class="d-flex gap-3 justify-content-center py-2">
        <span class="badge bg-success">\u05E0\u05D5\u05DB\u05D7\u05D9\u05DD: <strong id="att-present">0</strong></span>
        <span class="badge bg-danger">\u05D7\u05E1\u05E8\u05D9\u05DD: <strong id="att-absent">0</strong></span>
        <span class="badge bg-warning text-dark">\u05D0\u05D9\u05D7\u05D5\u05E8: <strong id="att-late">0</strong></span>
      </div></div>
      <div id="att-list">${Utils.skeleton(5)}</div>
    `;
  },
  _attState: {}, _attStudents: [], _attListenersAdded: false,
  async attendanceInit() {
    const students = await App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
    const active = students.filter(s => (s['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') !== '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC');
    active.forEach(s => { s._fullName = Utils.fullName(s); s._id = Utils.rowId(s); });
    this._attStudents = active;
    const attendance = await App.getData('\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA');
    const today = document.getElementById('att-date').value;
    this._attState = {};
    active.forEach(s => {
      const sId = s._id; const sName = s._fullName;
      const existing = attendance.find(a => (String(a['\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4']||'')===String(sId) || (a['\u05E9\u05DD']||a['\u05EA\u05DC\u05DE\u05D9\u05D3']||'')===sName) && a['\u05EA\u05D0\u05E8\u05D9\u05DA'] === today);
      this._attState[s._id] = existing ? (existing['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E0\u05D5\u05DB\u05D7' ? 'present' : existing['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D7\u05D9\u05E1\u05D5\u05E8' ? 'absent' : 'late') : '';
    });
    // Populate class filter
    const classes = [...new Set(active.map(s => s['\u05DB\u05D9\u05EA\u05D4']).filter(Boolean))].sort();
    const classFilter = document.getElementById('att-class-filter');
    const curVal = classFilter.value;
    classFilter.innerHTML = '<option value="">\u05DB\u05DC \u05D4\u05DB\u05D9\u05EA\u05D5\u05EA</option>' + classes.map(c => `<option value="${c}">${c}</option>`).join('');
    if (curVal) classFilter.value = curVal;
    if (!this._attListenersAdded) {
      this._attListenersAdded = true;
      document.getElementById('att-search').addEventListener('input', Utils.debounce(() => this.renderAttList(), 200));
      document.getElementById('att-date').addEventListener('change', () => this.attendanceInit());
      document.getElementById('att-class-filter').addEventListener('change', () => this.renderAttList());
    }
    this.renderAttList();
    this.bindAttKeyboard();
  },
  renderAttList() {
    const search = (document.getElementById('att-search')?.value || '').trim().toLowerCase();
    const classF = document.getElementById('att-class-filter')?.value || '';
    const filtered = this._attStudents.filter(s => {
      if (search && !(s._fullName || '').toLowerCase().includes(search)) return false;
      if (classF && s['\u05DB\u05D9\u05EA\u05D4'] !== classF) return false;
      return true;
    });
    const html = filtered.map((s, i) => {
      const name = s._fullName; const sid = s._id; const state = this._attState[sid] || '';
      return `<div class="d-flex align-items-center gap-3 p-3 border-bottom att-row" data-id="${sid}">${Utils.avatarHTML(name)}<div class="flex-grow-1"><div class="fw-bold">${name}</div><small class="text-muted">\u05DB\u05D9\u05EA\u05D4 ${s['\u05DB\u05D9\u05EA\u05D4'] || '--'}</small></div><div class="d-flex gap-2"><div class="att-btn ${state==='present'?'present selected':''}" onclick="Pages.toggleAtt('${sid}','present')" title="\u05E0\u05D5\u05DB\u05D7 (P)"><i class="bi bi-check-lg"></i></div><div class="att-btn ${state==='absent'?'absent selected':''}" onclick="Pages.toggleAtt('${sid}','absent')" title="\u05D7\u05D9\u05E1\u05D5\u05E8 (A)"><i class="bi bi-x-lg"></i></div><div class="att-btn ${state==='late'?'late selected':''}" onclick="Pages.toggleAtt('${sid}','late')" title="\u05D0\u05D9\u05D7\u05D5\u05E8 (L)"><i class="bi bi-clock"></i></div></div></div>`;
    }).join('');
    document.getElementById('att-list').innerHTML = `<div class="card">${html}</div>`;
    this.updateAttSummary();
  },
  toggleAtt(id, status) { this._attState[String(id)] = this._attState[String(id)] === status ? '' : status; this.renderAttList(); },
  markAll(status) { this._attStudents.forEach(s => { this._attState[s._id] = status; }); this.renderAttList(); },
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
    this._attStudents.forEach(s => { const st = this._attState[s._id]; if (st) rows.push({ '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': s._id, '\u05E9\u05DD': s._fullName, '\u05DB\u05D9\u05EA\u05D4': s['\u05DB\u05D9\u05EA\u05D4']||'', '\u05EA\u05D0\u05E8\u05D9\u05DA': date, '\u05E1\u05D8\u05D8\u05D5\u05E1': statusMap[st] }); });
    if (rows.length === 0) { Utils.toast('\u05DC\u05D0 \u05E1\u05D5\u05DE\u05E0\u05D5 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD', 'warning'); return; }
    try { await App.apiCall('bulkAdd', '\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA', { rows }); Utils.toast(`\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05E0\u05E9\u05DE\u05E8\u05D4: ${rows.length} \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD`, 'success'); } catch(e) { localStorage.setItem('bht_att_' + date, JSON.stringify(rows)); Utils.toast('\u05E0\u05E9\u05DE\u05E8 \u05DE\u05E7\u05D5\u05DE\u05D9\u05EA', 'info'); }
  },
  _attKeyListener: null,
  bindAttKeyboard() {
    if (this._attKeyListener) document.removeEventListener('keydown', this._attKeyListener);
    this._attKeyListener = (e) => {
      if (App.currentPage !== 'attendance') return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const rows = document.querySelectorAll('.att-row');
      const hovered = document.querySelector('.att-row:hover');
      if (!hovered) return;
      const id = hovered.dataset.id;
      if (!id) return;
      if (e.key === 'p' || e.key === 'P' || e.key === '\u05E0') this.toggleAtt(id, 'present');
      if (e.key === 'a' || e.key === 'A' || e.key === '\u05D7') this.toggleAtt(id, 'absent');
      if (e.key === 'l' || e.key === 'L' || e.key === '\u05D0') this.toggleAtt(id, 'late');
    };
    document.addEventListener('keydown', this._attKeyListener);
  },
  copyAttSummary() {
    const vals = Object.values(this._attState);
    const p = vals.filter(v => v === 'present').length;
    const a = vals.filter(v => v === 'absent').length;
    const l = vals.filter(v => v === 'late').length;
    const date = document.getElementById('att-date').value;
    const absentNames = this._attStudents.filter(s => this._attState[s._id] === 'absent').map(s => s._fullName);
    let text = `\u05E1\u05D9\u05DB\u05D5\u05DD \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA ${date}\n\u05E0\u05D5\u05DB\u05D7\u05D9\u05DD: ${p} | \u05D7\u05E1\u05E8\u05D9\u05DD: ${a} | \u05D0\u05D9\u05D7\u05D5\u05E8: ${l}`;
    if (absentNames.length) text += '\n\u05D7\u05E1\u05E8\u05D9\u05DD: ' + absentNames.join(', ');
    navigator.clipboard.writeText(text).then(() => Utils.toast('\u05D4\u05D5\u05E2\u05EA\u05E7 \u05DC\u05DC\u05D5\u05D7')).catch(() => Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05D4\u05E2\u05EA\u05E7\u05D4','danger'));
  },
  printAttendance() {
    const win = window.open('','','width=800,height=600');
    const date = document.getElementById('att-date').value;
    const rows = this._attStudents.map(s => {
      const st = this._attState[s._id] || '';
      const label = st === 'present' ? '\u05E0\u05D5\u05DB\u05D7' : st === 'absent' ? '\u05D7\u05E1\u05E8' : st === 'late' ? '\u05D0\u05D9\u05D7\u05D5\u05E8' : '--';
      return `<tr><td>${s._fullName}</td><td>${s['\u05DB\u05D9\u05EA\u05D4']||''}</td><td>${label}</td></tr>`;
    }).join('');
    win.document.write(`<html dir="rtl"><head><title>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA ${date}</title><style>body{font-family:Heebo,sans-serif}table{width:100%;border-collapse:collapse}td,th{border:1px solid #ddd;padding:8px;text-align:right}th{background:#f5f5f5}</style></head><body><h2>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA - ${date}</h2><table><thead><tr><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th>\u05DB\u05D9\u05EA\u05D4</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th></tr></thead><tbody>${rows}</tbody></table></body></html>`);
    win.document.close();
    win.print();
  },


  /* ======================================================================
     ATTENDANCE MONTHLY
     ====================================================================== */
  attendance_monthly() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div><h1><i class="bi bi-calendar-month me-2"></i>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D7\u05D5\u05D3\u05E9\u05D9\u05EA</h1></div>
        <div class="d-flex gap-2"><input type="month" class="form-control form-control-sm" id="attm-month" style="width:180px"><button class="btn btn-outline-secondary btn-sm" onclick="Pages.loadAttMonthly()"><i class="bi bi-arrow-clockwise"></i></button></div>
      </div>
      <div class="row g-3 mb-3">
        <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-success" id="attm-pct">--</div><small>\u05D0\u05D7\u05D5\u05D6 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</small></div></div>
        <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold" id="attm-days">--</div><small>\u05D9\u05DE\u05D9 \u05DC\u05D9\u05DE\u05D5\u05D3</small></div></div>
        <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-primary" id="attm-students">--</div><small>\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</small></div></div>
        <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-danger" id="attm-absent">--</div><small>\u05D7\u05D9\u05E1\u05D5\u05E8\u05D9\u05DD</small></div></div>
      </div>
      <div id="attm-table">${Utils.skeleton(3)}</div>
    `;
  },
  _attmListenersAdded: false,
  async attendance_monthlyInit() {
    const d = new Date(); document.getElementById('attm-month').value = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    if (!this._attmListenersAdded) {
      this._attmListenersAdded = true;
      document.getElementById('attm-month').addEventListener('change', () => this.loadAttMonthly());
    }
    this.loadAttMonthly();
  },
  async loadAttMonthly() {
    const month = document.getElementById('attm-month').value; if (!month) return;
    const att = await App.getData('\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA');
    const monthAtt = att.filter(a => (a['\u05EA\u05D0\u05E8\u05D9\u05DA']||'').startsWith(month));
    const students = [...new Set(monthAtt.map(a => a['\u05E9\u05DD']||a['\u05EA\u05DC\u05DE\u05D9\u05D3']||''))];
    const days = [...new Set(monthAtt.map(a => a['\u05EA\u05D0\u05E8\u05D9\u05DA']))].sort();
    const present = monthAtt.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05E0\u05D5\u05DB\u05D7').length;
    const absentC = monthAtt.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1'] === '\u05D7\u05D9\u05E1\u05D5\u05E8').length;
    document.getElementById('attm-pct').textContent = monthAtt.length ? Math.round(present/monthAtt.length*100)+'%' : '--';
    document.getElementById('attm-days').textContent = days.length;
    document.getElementById('attm-students').textContent = students.length;
    document.getElementById('attm-absent').textContent = absentC;
    if (!students.length) { document.getElementById('attm-table').innerHTML = '<div class="text-muted text-center py-3">\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05DC\u05D7\u05D5\u05D3\u05E9 \u05D6\u05D4</div>'; return; }
    let html = '<div class="card table-responsive"><table class="table table-sm table-bht mb-0"><thead><tr><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th>';
    days.forEach(d => { html += `<th class="text-center" style="font-size:10px">${d.substring(8)}</th>`; });
    html += '<th>\u05D0\u05D7\u05D5\u05D6</th></tr></thead><tbody>';
    students.forEach(st => {
      html += `<tr><td class="fw-bold small">${st}</td>`;
      let pCnt = 0;
      days.forEach(d => {
        const rec = monthAtt.find(a => (a['\u05E9\u05DD']||a['\u05EA\u05DC\u05DE\u05D9\u05D3']||'')===st && a['\u05EA\u05D0\u05E8\u05D9\u05DA']===d);
        const s = rec ? rec['\u05E1\u05D8\u05D8\u05D5\u05E1'] : '';
        if (s === '\u05E0\u05D5\u05DB\u05D7') pCnt++;
        const cls = s==='\u05E0\u05D5\u05DB\u05D7' ? 'bg-success' : s==='\u05D7\u05D9\u05E1\u05D5\u05E8' ? 'bg-danger' : s==='\u05D0\u05D9\u05D7\u05D5\u05E8' ? 'bg-warning' : '';
        html += `<td class="text-center">${cls ? `<span class="badge ${cls}" style="font-size:8px;width:16px;height:16px;display:inline-block;border-radius:50%"></span>` : '-'}</td>`;
      });
      const pct = days.length ? Math.round(pCnt/days.length*100) : 0;
      html += `<td class="fw-bold ${pct>=80?'text-success':pct>=60?'text-warning':'text-danger'}">${pct}%</td></tr>`;
    });
    html += '</tbody></table></div>';
    document.getElementById('attm-table').innerHTML = html;
    document.getElementById('attm-table').innerHTML += this._renderAttHeatmap(att);
  },
  _renderAttHeatmap(att) {
    // Build 365-day heatmap
    const today = new Date();
    const counts = {};
    att.forEach(a => {
      const d = a['\u05EA\u05D0\u05E8\u05D9\u05DA']||'';
      if (!d) return;
      if (!counts[d]) counts[d] = {p:0,a:0,t:0};
      counts[d].t++;
      if (a['\u05E1\u05D8\u05D8\u05D5\u05E1']==='\u05E0\u05D5\u05DB\u05D7') counts[d].p++;
      else counts[d].a++;
    });

    let html = '<div class="card p-3 mt-3"><h6 class="fw-bold"><i class="bi bi-grid-3x3 me-2"></i>\u05DE\u05E4\u05EA \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05E9\u05E0\u05EA\u05D9\u05EA</h6><div style="overflow-x:auto"><div style="display:flex;gap:2px;direction:ltr">';

    for (let w = 51; w >= 0; w--) {
      html += '<div style="display:flex;flex-direction:column;gap:2px">';
      for (let d = 0; d < 7; d++) {
        const date = new Date(today);
        date.setDate(date.getDate() - (w * 7 + (6 - d)));
        const ds = date.toISOString().slice(0,10);
        const c = counts[ds];
        let color = '#ebedf0'; // no data
        if (c) {
          const pct = c.t ? c.p / c.t : 0;
          if (pct >= 0.9) color = '#216e39';
          else if (pct >= 0.7) color = '#30a14e';
          else if (pct >= 0.5) color = '#40c463';
          else if (pct > 0) color = '#9be9a8';
          else color = '#ea4335';
        }
        html += `<div style="width:12px;height:12px;border-radius:2px;background:${color}" title="${ds}${c?' ('+c.p+'/'+c.t+')':''}"></div>`;
      }
      html += '</div>';
    }
    html += '</div><div class="d-flex gap-2 mt-2 small text-muted"><span>\u05E4\u05D7\u05D5\u05EA</span>';
    ['#ebedf0','#9be9a8','#40c463','#30a14e','#216e39'].forEach(c => {
      html += `<div style="width:12px;height:12px;border-radius:2px;background:${c}"></div>`;
    });
    html += '<span>\u05D9\u05D5\u05EA\u05E8</span></div></div>';
    return html;
  },
});
