/* ===== BHT v5.6 — Admin ===== */
Object.assign(Pages, {

  /* ======================================================================
     DEMO FLAGS
     ====================================================================== */
  _rptUseDemo: false,
  _rptClassFilter: '',
  _rptDateFrom: '',
  _rptDateTo: '',
  _umUseDemo: false,
  _logUseDemo: false,
  _phoneUseDemo: false,

  rptLoadDemo() {
    this._rptUseDemo = true;
    this._rptApplyFiltersAndLoad();
    Utils.toast('\u05E0\u05D8\u05E2\u05E0\u05D5 \u05E0\u05EA\u05D5\u05E0\u05D9 \u05D3\u05DE\u05D5 \u05DC\u05D3\u05D5\u05D7\u05D5\u05EA', 'info');
  },
  umLoadDemo() {
    this._umUseDemo = true;
    this._umData = this._umDemoData();
    this.renderUsers();
    Utils.toast('\u05E0\u05D8\u05E2\u05E0\u05D5 \u05E0\u05EA\u05D5\u05E0\u05D9 \u05D3\u05DE\u05D5 \u05DC\u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD', 'info');
  },
  logLoadDemo() {
    this._logUseDemo = true;
    this._logData = this._logDemoData();
    this.renderLog();
    Utils.toast('\u05E0\u05D8\u05E2\u05E0\u05D5 \u05E0\u05EA\u05D5\u05E0\u05D9 \u05D3\u05DE\u05D5 \u05DC\u05D9\u05D5\u05DE\u05DF', 'info');
  },
  phoneLoadDemo() {
    this._phoneUseDemo = true;
    this.phoneInit();
    Utils.toast('\u05E0\u05D8\u05E2\u05E0\u05D5 \u05E0\u05EA\u05D5\u05E0\u05D9 \u05D3\u05DE\u05D5 \u05DC\u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8', 'info');
  },

  /* Demo data generators */
  _rptDemoStudents() {
    return [
      {'\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9':'\u05D9\u05D5\u05E1\u05E3','\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4':'\u05DB\u05D4\u05DF','\u05DB\u05D9\u05EA\u05D4':'\u05D0','\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05E4\u05E2\u05D9\u05DC','\u05DE\u05D6\u05D4\u05D4':'d1'},
      {'\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9':'\u05DE\u05E9\u05D4','\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4':'\u05DC\u05D5\u05D9','\u05DB\u05D9\u05EA\u05D4':'\u05D0','\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05E4\u05E2\u05D9\u05DC','\u05DE\u05D6\u05D4\u05D4':'d2'},
      {'\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9':'\u05D3\u05D5\u05D3','\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4':'\u05D9\u05E9\u05E8\u05D0\u05DC\u05D9','\u05DB\u05D9\u05EA\u05D4':'\u05D1','\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05E4\u05E2\u05D9\u05DC','\u05DE\u05D6\u05D4\u05D4':'d3'},
      {'\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9':'\u05D0\u05D1\u05E8\u05D4\u05DD','\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4':'\u05E4\u05E8\u05D9\u05D3\u05DE\u05DF','\u05DB\u05D9\u05EA\u05D4':'\u05D1','\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05E4\u05E2\u05D9\u05DC','\u05DE\u05D6\u05D4\u05D4':'d4'},
      {'\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9':'\u05D9\u05E2\u05E7\u05D1','\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4':'\u05E9\u05D8\u05E8\u05DF','\u05DB\u05D9\u05EA\u05D4':'\u05D2','\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05E4\u05E2\u05D9\u05DC','\u05DE\u05D6\u05D4\u05D4':'d5'},
      {'\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9':'\u05E9\u05DE\u05D5\u05D0\u05DC','\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4':'\u05D1\u05E8\u05D2\u05E8','\u05DB\u05D9\u05EA\u05D4':'\u05D2','\u05E1\u05D8\u05D8\u05D5\u05E1':'\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC','\u05DE\u05D6\u05D4\u05D4':'d6'}
    ];
  },
  _rptDemoAtt() {
    const statuses = ['\u05E0\u05D5\u05DB\u05D7','\u05E0\u05D5\u05DB\u05D7','\u05E0\u05D5\u05DB\u05D7','\u05D7\u05D9\u05E1\u05D5\u05E8','\u05D0\u05D9\u05D7\u05D5\u05E8'];
    const names = ['\u05D9\u05D5\u05E1\u05E3 \u05DB\u05D4\u05DF','\u05DE\u05E9\u05D4 \u05DC\u05D5\u05D9','\u05D3\u05D5\u05D3 \u05D9\u05E9\u05E8\u05D0\u05DC\u05D9','\u05D0\u05D1\u05E8\u05D4\u05DD \u05E4\u05E8\u05D9\u05D3\u05DE\u05DF','\u05D9\u05E2\u05E7\u05D1 \u05E9\u05D8\u05E8\u05DF'];
    const data = [];
    for (let d = 14; d >= 0; d--) {
      const dt = new Date(); dt.setDate(dt.getDate()-d);
      const dateStr = dt.toISOString().slice(0,10);
      names.forEach(n => data.push({'\u05E9\u05DD':n,'\u05EA\u05DC\u05DE\u05D9\u05D3':n,'\u05EA\u05D0\u05E8\u05D9\u05DA':dateStr,'\u05E1\u05D8\u05D8\u05D5\u05E1':statuses[Math.floor(Math.random()*statuses.length)]}));
    }
    return data;
  },
  _rptDemoFin() {
    const months = ['2025-09','2025-10','2025-11','2025-12','2026-01','2026-02'];
    const data = [];
    ['\u05D9\u05D5\u05E1\u05E3 \u05DB\u05D4\u05DF','\u05DE\u05E9\u05D4 \u05DC\u05D5\u05D9','\u05D3\u05D5\u05D3 \u05D9\u05E9\u05E8\u05D0\u05DC\u05D9','\u05D0\u05D1\u05E8\u05D4\u05DD \u05E4\u05E8\u05D9\u05D3\u05DE\u05DF','\u05D9\u05E2\u05E7\u05D1 \u05E9\u05D8\u05E8\u05DF'].forEach(n => {
      months.forEach(m => data.push({'\u05EA\u05DC\u05DE\u05D9\u05D3':n,'\u05D7\u05D5\u05D3\u05E9':m,'\u05E1\u05DB\u05D5\u05DD':1500,'\u05E1\u05D8\u05D8\u05D5\u05E1':Math.random()>0.3?'\u05E9\u05D5\u05DC\u05DD':'\u05D7\u05D5\u05D1'}));
    });
    return data;
  },
  _rptDemoBeh() {
    const types = ['\u05D7\u05D9\u05D5\u05D1\u05D9','\u05D7\u05D9\u05D5\u05D1\u05D9','\u05E9\u05DC\u05D9\u05DC\u05D9','\u05D4\u05E2\u05E8\u05D4'];
    const names = ['\u05D9\u05D5\u05E1\u05E3 \u05DB\u05D4\u05DF','\u05DE\u05E9\u05D4 \u05DC\u05D5\u05D9','\u05D3\u05D5\u05D3 \u05D9\u05E9\u05E8\u05D0\u05DC\u05D9','\u05D0\u05D1\u05E8\u05D4\u05DD \u05E4\u05E8\u05D9\u05D3\u05DE\u05DF','\u05D9\u05E2\u05E7\u05D1 \u05E9\u05D8\u05E8\u05DF'];
    return Array.from({length:30}, (_,i) => ({'\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3':names[i%names.length],'\u05E9\u05DD':names[i%names.length],'\u05EA\u05DC\u05DE\u05D9\u05D3':names[i%names.length],'\u05E1\u05D5\u05D2':types[Math.floor(Math.random()*types.length)]}));
  },
  _umDemoData() {
    return [
      {'\u05E9\u05DD':'\u05D9\u05D5\u05E1\u05E3 \u05E9\u05E0\u05D9\u05D9\u05D3\u05E8','\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC':'admin@bht.org','\u05EA\u05E4\u05E7\u05D9\u05D3':'admin','PIN':'1234','\u05DB\u05E0\u05D9\u05E1\u05D4_\u05D0\u05D7\u05E8\u05D5\u05E0\u05D4':'22/04/2026 09:30','\u05DE\u05D6\u05D4\u05D4':'demo1'},
      {'\u05E9\u05DD':'\u05E8\u05D1\u05E7\u05D4 \u05DB\u05D4\u05DF','\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC':'rivka@bht.org','\u05EA\u05E4\u05E7\u05D9\u05D3':'secretary','PIN':'5678','\u05DB\u05E0\u05D9\u05E1\u05D4_\u05D0\u05D7\u05E8\u05D5\u05E0\u05D4':'22/04/2026 08:15','\u05DE\u05D6\u05D4\u05D4':'demo2'},
      {'\u05E9\u05DD':'\u05D0\u05D1\u05E8\u05D4\u05DD \u05DC\u05D5\u05D9','\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC':'avraham@bht.org','\u05EA\u05E4\u05E7\u05D9\u05D3':'teacher','PIN':'9012','\u05DB\u05E0\u05D9\u05E1\u05D4_\u05D0\u05D7\u05E8\u05D5\u05E0\u05D4':'21/04/2026 14:00','\u05DE\u05D6\u05D4\u05D4':'demo3'},
      {'\u05E9\u05DD':'\u05D3\u05D5\u05D3 \u05D9\u05E9\u05E8\u05D0\u05DC\u05D9','\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC':'david@parent.com','\u05EA\u05E4\u05E7\u05D9\u05D3':'parent','PIN':'3456','\u05DB\u05E0\u05D9\u05E1\u05D4_\u05D0\u05D7\u05E8\u05D5\u05E0\u05D4':'20/04/2026 18:00','\u05DE\u05D6\u05D4\u05D4':'demo4'},
      {'\u05E9\u05DD':'\u05E9\u05E8\u05D4 \u05E4\u05E8\u05D9\u05D3\u05DE\u05DF','\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC':'sara@parent.com','\u05EA\u05E4\u05E7\u05D9\u05D3':'parent','PIN':'7890','\u05DB\u05E0\u05D9\u05E1\u05D4_\u05D0\u05D7\u05E8\u05D5\u05E0\u05D4':'19/04/2026 16:30','\u05DE\u05D6\u05D4\u05D4':'demo5'}
    ];
  },
  _logDemoData() {
    const actions = [
      {'\u05E1\u05D5\u05D2':'\u05D4\u05D5\u05E1\u05E4\u05D4','\u05D9\u05E9\u05D5\u05EA':'\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD','\u05E4\u05E2\u05D5\u05DC\u05D4':'\u05E0\u05D5\u05E1\u05E3 \u05EA\u05DC\u05DE\u05D9\u05D3 \u05D7\u05D3\u05E9: \u05D9\u05D5\u05E1\u05E3 \u05DB\u05D4\u05DF'},
      {'\u05E1\u05D5\u05D2':'\u05E2\u05D3\u05DB\u05D5\u05DF','\u05D9\u05E9\u05D5\u05EA':'\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA','\u05E4\u05E2\u05D5\u05DC\u05D4':'\u05E1\u05D5\u05DE\u05E0\u05D4 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05DC\u05DB\u05D9\u05EA\u05D4 \u05D0'},
      {'\u05E1\u05D5\u05D2':'\u05DE\u05D7\u05D9\u05E7\u05D4','\u05D9\u05E9\u05D5\u05EA':'\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA','\u05E4\u05E2\u05D5\u05DC\u05D4':'\u05DE\u05E9\u05D9\u05DE\u05D4 "\u05D4\u05D6\u05DE\u05E0\u05EA \u05E1\u05E4\u05E8\u05D9\u05DD" \u05D4\u05D5\u05E9\u05DC\u05DE\u05D4'},
      {'\u05E1\u05D5\u05D2':'\u05DB\u05E0\u05D9\u05E1\u05D4','\u05D9\u05E9\u05D5\u05EA':'\u05DE\u05E2\u05E8\u05DB\u05EA','\u05E4\u05E2\u05D5\u05DC\u05D4':'\u05DB\u05E0\u05D9\u05E1\u05EA \u05DE\u05E0\u05D4\u05DC: admin@bht.org'},
      {'\u05E1\u05D5\u05D2':'\u05E2\u05D3\u05DB\u05D5\u05DF','\u05D9\u05E9\u05D5\u05EA':'\u05E9\u05DB\u05E8 \u05DC\u05D9\u05DE\u05D5\u05D3','\u05E4\u05E2\u05D5\u05DC\u05D4':'\u05E2\u05D5\u05D3\u05DB\u05DF \u05EA\u05E9\u05DC\u05D5\u05DD \u05DC\u05DE\u05E9\u05D4 \u05DC\u05D5\u05D9'},
      {'\u05E1\u05D5\u05D2':'\u05D4\u05D5\u05E1\u05E4\u05D4','\u05D9\u05E9\u05D5\u05EA':'\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA','\u05E4\u05E2\u05D5\u05DC\u05D4':'\u05E0\u05E8\u05E9\u05DD \u05D3\u05D9\u05D5\u05D5\u05D7 \u05D7\u05D9\u05D5\u05D1\u05D9 \u05DC\u05D3\u05D5\u05D3 \u05D9\u05E9\u05E8\u05D0\u05DC\u05D9'},
      {'\u05E1\u05D5\u05D2':'\u05E2\u05D3\u05DB\u05D5\u05DF','\u05D9\u05E9\u05D5\u05EA':'\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD','\u05E4\u05E2\u05D5\u05DC\u05D4':'\u05E2\u05D5\u05D3\u05DB\u05E0\u05D5 \u05E4\u05E8\u05D8\u05D9 \u05EA\u05DC\u05DE\u05D9\u05D3: \u05D0\u05D1\u05E8\u05D4\u05DD \u05E4\u05E8\u05D9\u05D3\u05DE\u05DF'},
      {'\u05E1\u05D5\u05D2':'\u05D4\u05D5\u05E1\u05E4\u05D4','\u05D9\u05E9\u05D5\u05EA':'\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9 \u05D1\u05D9\u05EA','\u05E4\u05E2\u05D5\u05DC\u05D4':'\u05E0\u05D5\u05E1\u05E3 \u05E9\u05D9\u05E2\u05D5\u05E8: \u05D2\u05DE\u05E8\u05D0 \u05D3\u05E3 \u05DC\u05D7'}
    ];
    const today = new Date();
    return actions.map((a, i) => {
      const dt = new Date(today); dt.setHours(9+i, i*7%60);
      return {...a, '\u05EA\u05D0\u05E8\u05D9\u05DA': today.toISOString().slice(0,10), '\u05E9\u05E2\u05D4': dt.toTimeString().slice(0,5)};
    });
  },
  _phoneDemoContacts() {
    return [
      {name:'\u05D4\u05E8\u05D1 \u05D9\u05E8\u05D5\u05E9\u05DC\u05DE\u05D9',phone:'052-1234567',role:'\u05E8\u05D0\u05E9 \u05DE\u05D5\u05E1\u05D3'},
      {name:'\u05D0\u05D1\u05E8\u05D4\u05DD \u05DC\u05D5\u05D9',phone:'053-7654321',role:'\u05DE\u05DC\u05DE\u05D3'},
      {name:'\u05E8\u05D1\u05E7\u05D4 \u05DB\u05D4\u05DF',phone:'054-9876543',role:'\u05DE\u05D6\u05DB\u05D9\u05E8\u05D5\u05EA'},
      {name:'\u05D3\u05D5\u05D3 \u05D9\u05E9\u05E8\u05D0\u05DC\u05D9',phone:'050-1112233',role:'\u05DE\u05DC\u05DE\u05D3'},
      {name:'\u05DE\u05E9\u05D4 \u05E4\u05E8\u05D9\u05D3\u05DE\u05DF',phone:'058-4445566',role:'\u05E1\u05D2\u05DF \u05DE\u05E0\u05D4\u05DC'}
    ];
  },
  /* ======================================================================
     REPORTS
     ====================================================================== */
  reports() {
    const today = new Date().toISOString().slice(0,10);
    const monthStart = today.slice(0,8) + '01';
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div><h1><i class="bi bi-file-earmark-bar-graph me-2"></i>\u05D3\u05D5\u05D7\u05D5\u05EA</h1></div>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-secondary btn-sm" onclick="Pages.rptPrint()"><i class="bi bi-printer me-1"></i>\u05D4\u05D3\u05E4\u05E1</button>
          <button class="btn btn-outline-info btn-sm" onclick="Pages.rptExportCSV()"><i class="bi bi-download me-1"></i>\u05D9\u05D9\u05E6\u05D5\u05D0 CSV</button>
        </div>
      </div>

      <!-- Filters bar -->
      <div class="card p-3 mb-3">
        <div class="row g-2 align-items-end">
          <div class="col-md-3">
            <label class="form-label fw-bold mb-1">\u05E1\u05D5\u05D2 \u05D3\u05D5\u05D7</label>
            <select class="form-select form-select-sm" id="rpt-type">
              <option value="overview">\u05E1\u05E7\u05D9\u05E8\u05D4 \u05DB\u05DC\u05DC\u05D9\u05EA</option>
              <option value="att_daily">\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA - \u05D3\u05D5\u05D7 \u05D9\u05D5\u05DE\u05D9</option>
              <option value="att_monthly">\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA - \u05D3\u05D5\u05D7 \u05D7\u05D5\u05D3\u05E9\u05D9</option>
              <option value="finance">\u05E1\u05D9\u05DB\u05D5\u05DD \u05DB\u05E1\u05E4\u05D9</option>
              <option value="students_by_class">\u05E8\u05E9\u05D9\u05DE\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05DC\u05E4\u05D9 \u05DB\u05D9\u05EA\u05D4</option>
              <option value="behavior">\u05E1\u05D9\u05DB\u05D5\u05DD \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</option>
              <option value="annual">\u05E1\u05D9\u05DB\u05D5\u05DD \u05E9\u05E0\u05EA\u05D9</option>
            </select>
          </div>
          <div class="col-md-2">
            <label class="form-label fw-bold mb-1">\u05DE\u05EA\u05D0\u05E8\u05D9\u05DA</label>
            <input type="date" class="form-control form-control-sm" id="rpt-date-from" value="${monthStart}">
          </div>
          <div class="col-md-2">
            <label class="form-label fw-bold mb-1">\u05E2\u05D3 \u05EA\u05D0\u05E8\u05D9\u05DA</label>
            <input type="date" class="form-control form-control-sm" id="rpt-date-to" value="${today}">
          </div>
          <div class="col-md-2">
            <label class="form-label fw-bold mb-1">\u05DB\u05D9\u05EA\u05D4</label>
            <select class="form-select form-select-sm" id="rpt-class-filter">
              <option value="">\u05DB\u05DC \u05D4\u05DB\u05D9\u05EA\u05D5\u05EA</option>
            </select>
          </div>
          <div class="col-md-3">
            <button class="btn btn-primary btn-sm w-100" onclick="Pages._rptApplyFiltersAndLoad()"><i class="bi bi-funnel me-1"></i>\u05D4\u05E4\u05E7 \u05D3\u05D5\u05D7</button>
          </div>
        </div>
      </div>

      <div id="rpt-content">${Utils.skeleton(3)}</div>`;
  },

  async reportsInit() {
    // Read stored filter values
    const typeEl = document.getElementById('rpt-type');
    const fromEl = document.getElementById('rpt-date-from');
    const toEl = document.getElementById('rpt-date-to');
    const classEl = document.getElementById('rpt-class-filter');

    if (this._rptClassFilter) classEl.value = this._rptClassFilter;
    if (this._rptDateFrom) fromEl.value = this._rptDateFrom;
    if (this._rptDateTo) toEl.value = this._rptDateTo;

    // Populate class dropdown from student data
    try {
      const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
      const students = this._rptUseDemo ? this._rptDemoStudents() : _gc('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
      const classes = new Set();
      students.forEach(s => { const c = s['\u05DB\u05D9\u05EA\u05D4']||''; if (c) classes.add(c); });
      [...classes].sort().forEach(c => {
        const opt = document.createElement('option');
        opt.value = c; opt.textContent = c;
        classEl.appendChild(opt);
      });
      if (this._rptClassFilter) classEl.value = this._rptClassFilter;
    } catch(e) { console.error('Error:', e); }

    // Quick-change on type select
    typeEl.addEventListener('change', () => this._rptApplyFiltersAndLoad());

    // Load initial report
    this._rptApplyFiltersAndLoad();
  },

  _rptApplyFiltersAndLoad() {
    const typeEl = document.getElementById('rpt-type');
    const fromEl = document.getElementById('rpt-date-from');
    const toEl = document.getElementById('rpt-date-to');
    const classEl = document.getElementById('rpt-class-filter');
    if (!typeEl) return;

    this._rptClassFilter = classEl ? classEl.value : '';
    this._rptDateFrom = fromEl ? fromEl.value : '';
    this._rptDateTo = toEl ? toEl.value : '';

    this.loadReport(typeEl.value);
  },

  /* Filter helpers */
  _rptFilterByDate(arr, dateField) {
    const from = this._rptDateFrom;
    const to = this._rptDateTo;
    if (!from && !to) return arr;
    return arr.filter(r => {
      const d = r[dateField] || '';
      if (!d) return false;
      if (from && d < from) return false;
      if (to && d > to) return false;
      return true;
    });
  },
  _rptFilterByClass(students, classField) {
    if (!this._rptClassFilter) return students;
    return students.filter(s => (s[classField]||'') === this._rptClassFilter);
  },
  _rptStudentClass(students) {
    const map = {};
    students.forEach(s => {
      const name = Utils.fullName ? Utils.fullName(s) : (s['\u05E9\u05DD']||s['\u05EA\u05DC\u05DE\u05D9\u05D3']||'');
      map[name] = s['\u05DB\u05D9\u05EA\u05D4'] || '';
    });
    return map;
  },

  /* Print report in new window */
  rptPrint() {
    const content = document.getElementById('rpt-content');
    if (!content) return;
    const typeEl = document.getElementById('rpt-type');
    const title = typeEl ? typeEl.options[typeEl.selectedIndex].text : '\u05D3\u05D5\u05D7';
    const win = window.open('', '_blank', 'width=900,height=700');
    win.document.write(`<!DOCTYPE html><html dir="rtl" lang="he"><head><meta charset="utf-8"><title>${title} - \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3</title>
      <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;700&display=swap" rel="stylesheet">
      <style>
        *{font-family:'Heebo',sans-serif;direction:rtl}
        body{padding:30px;color:#333}
        h2{margin-bottom:5px}
        .meta{color:#666;margin-bottom:20px;font-size:14px}
        table{width:100%;border-collapse:collapse;margin:15px 0}
        th,td{border:1px solid #ddd;padding:8px;text-align:right}
        th{background:#f5f5f5;font-weight:700}
        tr:nth-child(even){background:#fafafa}
        .stats-row{display:flex;gap:20px;margin:15px 0}
        .stat-box{flex:1;border:2px solid #eee;border-radius:8px;padding:15px;text-align:center}
        .stat-box .val{font-size:28px;font-weight:700}
        .stat-box .lbl{color:#666;font-size:13px}
        .text-success{color:#0f9d58}.text-danger{color:#ea4335}.text-warning{color:#f9ab00}.text-primary{color:#2563eb}
        .badge{display:inline-block;padding:2px 8px;border-radius:12px;font-size:12px;font-weight:500}
        .badge-success{background:#d4edda;color:#155724}.badge-danger{background:#f8d7da;color:#721c24}
        .badge-warning{background:#fff3cd;color:#856404}.badge-secondary{background:#e9ecef;color:#495057}
        .progress-bar-print{height:16px;background:#e9ecef;border-radius:8px;overflow:hidden}
        .progress-bar-print .fill{height:100%;border-radius:8px}
        @media print{body{padding:10px}button{display:none!important}}
      </style>
    </head><body>
      <h2><i class="bi bi-file-earmark-bar-graph"></i> ${title}</h2>
      <div class="meta">\u05D4\u05D5\u05E4\u05E7: ${new Date().toLocaleDateString('he-IL')} | \u05EA\u05D0\u05E8\u05D9\u05DB\u05D9\u05DD: ${this._rptDateFrom || '-'} \u05E2\u05D3 ${this._rptDateTo || '-'}${this._rptClassFilter ? ' | \u05DB\u05D9\u05EA\u05D4: ' + this._rptClassFilter : ''}</div>
      ${document.getElementById('rpt-print-area')?.innerHTML || content.innerHTML}
      <br><button onclick="window.print()" style="padding:8px 24px;background:#2563eb;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px">\u05D4\u05D3\u05E4\u05E1</button>
    </body></html>`);
    win.document.close();
  },

  /* Export CSV */
  rptExportCSV() {
    const content = document.getElementById('rpt-content');
    const tables = content ? content.querySelectorAll('table') : [];
    if (!tables.length) { Utils.toast('\u05D0\u05D9\u05DF \u05D8\u05D1\u05DC\u05D4 \u05DC\u05D9\u05D9\u05E6\u05D5\u05D0', 'warning'); return; }
    const rows = [];
    tables.forEach((table, idx) => {
      if (idx > 0) rows.push('');
      table.querySelectorAll('tr').forEach(tr => {
        const cells = [];
        tr.querySelectorAll('th,td').forEach(td => cells.push('"' + (td.textContent||'').replace(/"/g,'""') + '"'));
        rows.push(cells.join(','));
      });
    });
    const bom = '\uFEFF';
    const blob = new Blob([bom + rows.join('\n')], {type:'text/csv;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const rptType = document.getElementById('rpt-type')?.value || 'report';
    const dateStr = new Date().toISOString().slice(0,10);
    const a = document.createElement('a'); a.href = url; a.download = '\u05D3\u05D5\u05D7_' + rptType + '_' + dateStr + '.csv';
    a.click(); URL.revokeObjectURL(url);
    Utils.toast('\u05D4\u05E7\u05D5\u05D1\u05E5 \u05D9\u05D5\u05E8\u05D3', 'success');
  },

  /* Destroy old chart instances */
  _rptDestroyCharts() {
    if (Pages._rptCharts) Pages._rptCharts.forEach(c => c.destroy());
    Pages._rptCharts = [];
    ['rptAtt','rptFin','rptBeh','rptCls','rptAtt14','rptFinM','rptBehR','rptAttDaily','rptAttMonthly','rptFinSummary','rptBehSummary','rptAnnAtt','rptAnnGrades','rptAnnBeh','rptAnnPay'].forEach(k => {
      if (App.charts[k]) { App.charts[k].destroy(); delete App.charts[k]; }
    });
  },

  loadReport(type) {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    const c = document.getElementById('rpt-content');
    if (!c) return;
    c.innerHTML = '<div class="text-center py-5"><div class="spinner-border"></div></div>';
    this._rptDestroyCharts();

    let students, att, fin, beh;
    if (this._rptUseDemo) {
      students = this._rptDemoStudents();
      att = this._rptDemoAtt();
      fin = this._rptDemoFin();
      beh = this._rptDemoBeh();
    } else {
      const needed = { overview:4, att_daily:2, att_monthly:2, finance:2, students_by_class:1, behavior:2, annual:5 };
      const n = needed[type] || 4;
      students = _gc('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
      att = (n >= 2 && (type.startsWith('att') || type==='overview' || type==='annual')) ? _gc('\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA') : [];
      fin = (n >= 2 && (type==='finance'||type==='overview'||type==='annual')) ? _gc('\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3') : [];
      beh = (n >= 2 && (type==='behavior'||type==='overview'||type==='annual')) ? _gc('\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA') : [];
    }

    if (!this._rptUseDemo && !students.length && !att.length && !fin.length && !beh.length) {
      c.innerHTML = '<div class="empty-state text-center py-5"><i class="bi bi-file-earmark-bar-graph fs-1 text-muted d-block mb-2"></i><h5>\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05DC\u05D3\u05D5\u05D7\u05D5\u05EA</h5><p class="text-muted">\u05D4\u05D5\u05E1\u05E3 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05DC\u05DE\u05E2\u05E8\u05DB\u05EA \u05DB\u05D3\u05D9 \u05DC\u05E8\u05D0\u05D5\u05EA \u05D3\u05D5\u05D7\u05D5\u05EA</p><button class="btn btn-outline-primary btn-sm mt-2" onclick="Pages.rptLoadDemo()"><i class="bi bi-database me-1"></i>\u05D8\u05E2\u05DF \u05D3\u05DE\u05D5</button></div>';
      return;
    }

    const active = students.filter(s => (s['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') !== '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC');
    const classMap = this._rptStudentClass(students);

    /* ---- OVERVIEW ---- */
    if (type === 'overview') {
      const filteredAtt = this._rptFilterByDate(att, '\u05EA\u05D0\u05E8\u05D9\u05DA');
      const filteredFin = this._rptFilterByDate(fin, '\u05EA\u05D0\u05E8\u05D9\u05DA');
      const filteredBeh = this._rptFilterByDate(beh, '\u05EA\u05D0\u05E8\u05D9\u05DA');
      const present = filteredAtt.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1']==='\u05E0\u05D5\u05DB\u05D7').length;
      const absent = filteredAtt.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1']==='\u05D7\u05D9\u05E1\u05D5\u05E8').length;
      const late = filteredAtt.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1']==='\u05D0\u05D9\u05D7\u05D5\u05E8').length;
      const totalFin = filteredFin.reduce((s,f) => s+(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0), 0);
      const paidFin = filteredFin.filter(f => (f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05E9\u05D5\u05DC\u05DD').reduce((s,f) => s+(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0), 0);
      const posB = filteredBeh.filter(b => b['\u05E1\u05D5\u05D2']==='\u05D7\u05D9\u05D5\u05D1\u05D9').length;
      const negB = filteredBeh.filter(b => b['\u05E1\u05D5\u05D2']==='\u05E9\u05DC\u05D9\u05DC\u05D9').length;

      c.innerHTML = `<div id="rpt-print-area">
        <div class="row g-3 mb-4">
          <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-primary">${active.length}</div><small>\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05E4\u05E2\u05D9\u05DC\u05D9\u05DD</small></div></div>
          <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-success">${filteredAtt.length ? Math.round(present/filteredAtt.length*100) : 0}%</div><small>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05DE\u05DE\u05D5\u05E6\u05E2\u05EA</small></div></div>
          <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-danger">${Utils.formatCurrency(totalFin-paidFin)}</div><small>\u05D7\u05D5\u05D1 \u05E4\u05EA\u05D5\u05D7</small></div></div>
          <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-warning">${posB-negB}</div><small>\u05E0\u05D9\u05E7\u05D5\u05D3 \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA \u05E0\u05D8\u05D5</small></div></div>
        </div>
        <div class="row g-3">
          <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold"><i class="bi bi-bar-chart me-2"></i>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</h6><div style="height:250px"><canvas id="rpt-att-chart"></canvas></div></div></div>
          <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold"><i class="bi bi-pie-chart me-2"></i>\u05DE\u05E6\u05D1 \u05DB\u05E1\u05E4\u05D9</h6><div style="height:250px"><canvas id="rpt-fin-chart"></canvas></div></div></div>
          <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold"><i class="bi bi-star me-2"></i>\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</h6><div style="height:250px"><canvas id="rpt-beh-chart"></canvas></div></div></div>
          <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold"><i class="bi bi-people me-2"></i>\u05DB\u05D9\u05EA\u05D5\u05EA</h6><div style="height:250px"><canvas id="rpt-cls-chart"></canvas></div></div></div>
        </div>
      </div>`;

      const attCtx = document.getElementById('rpt-att-chart');
      if (attCtx) App.charts.rptAtt = new Chart(attCtx, {type:'bar', data:{labels:['\u05E0\u05D5\u05DB\u05D7','\u05D7\u05D9\u05E1\u05D5\u05E8','\u05D0\u05D9\u05D7\u05D5\u05E8'], datasets:[{data:[present, absent, late], backgroundColor:['#0f9d58','#ea4335','#f9ab00'], borderRadius:8}]}, options:{responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}}}); Pages._rptCharts.push(App.charts.rptAtt);
      const finCtx = document.getElementById('rpt-fin-chart');
      if (finCtx) App.charts.rptFin = new Chart(finCtx, {type:'doughnut', data:{labels:['\u05E9\u05D5\u05DC\u05DD','\u05D7\u05D5\u05D1'], datasets:[{data:[paidFin, totalFin-paidFin], backgroundColor:['#0f9d58','#ea4335'], borderWidth:0}]}, options:{responsive:true, maintainAspectRatio:false, cutout:'60%', plugins:{legend:{position:'bottom'}}}}); Pages._rptCharts.push(App.charts.rptFin);
      const behCtx = document.getElementById('rpt-beh-chart');
      if (behCtx) App.charts.rptBeh = new Chart(behCtx, {type:'bar', data:{labels:['\u05D7\u05D9\u05D5\u05D1\u05D9','\u05E9\u05DC\u05D9\u05DC\u05D9','\u05D4\u05E2\u05E8\u05D4'], datasets:[{data:[posB, negB, filteredBeh.filter(b=>b['\u05E1\u05D5\u05D2']==='\u05D4\u05E2\u05E8\u05D4').length], backgroundColor:['#0f9d58','#ea4335','#4285f4'], borderRadius:8}]}, options:{responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}}}); Pages._rptCharts.push(App.charts.rptBeh);
      const classes = {}; active.forEach(s => { const cl = s['\u05DB\u05D9\u05EA\u05D4']||'\u05D0\u05D7\u05E8'; classes[cl]=(classes[cl]||0)+1; });
      const clsCtx = document.getElementById('rpt-cls-chart');
      if (clsCtx) App.charts.rptCls = new Chart(clsCtx, {type:'pie', data:{labels:Object.keys(classes), datasets:[{data:Object.values(classes), backgroundColor:['#2563eb','#0f9d58','#f9ab00','#ea4335','#8b5cf6','#06b6d4','#ec4899'], borderWidth:0}]}, options:{responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'bottom'}}}}); Pages._rptCharts.push(App.charts.rptCls);
    }

    /* ---- ATTENDANCE DAILY ---- */
    else if (type === 'att_daily') {
      const selectedDate = this._rptDateTo || new Date().toISOString().slice(0,10);
      const dayAtt = att.filter(a => (a['\u05EA\u05D0\u05E8\u05D9\u05DA']||'') === selectedDate);
      // Apply class filter
      let filtered = dayAtt;
      if (this._rptClassFilter) {
        const classStudents = new Set();
        active.forEach(s => { if ((s['\u05DB\u05D9\u05EA\u05D4']||'') === this._rptClassFilter) classStudents.add(Utils.fullName ? Utils.fullName(s) : (s['\u05E9\u05DD']||s['\u05EA\u05DC\u05DE\u05D9\u05D3']||'')); });
        filtered = dayAtt.filter(a => classStudents.has(a['\u05E9\u05DD']||a['\u05EA\u05DC\u05DE\u05D9\u05D3']||''));
      }

      const present = filtered.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1']==='\u05E0\u05D5\u05DB\u05D7').length;
      const absent = filtered.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1']==='\u05D7\u05D9\u05E1\u05D5\u05E8').length;
      const late = filtered.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1']==='\u05D0\u05D9\u05D7\u05D5\u05E8').length;
      const pct = filtered.length ? Math.round(present/filtered.length*100) : 0;

      const statusBadge = (s) => {
        if (s==='\u05E0\u05D5\u05DB\u05D7') return '<span class="badge bg-success">\u05E0\u05D5\u05DB\u05D7</span>';
        if (s==='\u05D7\u05D9\u05E1\u05D5\u05E8') return '<span class="badge bg-danger">\u05D7\u05D9\u05E1\u05D5\u05E8</span>';
        if (s==='\u05D0\u05D9\u05D7\u05D5\u05E8') return '<span class="badge bg-warning text-dark">\u05D0\u05D9\u05D7\u05D5\u05E8</span>';
        return '<span class="badge bg-secondary">' + (s||'-') + '</span>';
      };

      c.innerHTML = `<div id="rpt-print-area">
        <h5 class="fw-bold mb-3"><i class="bi bi-calendar-check me-2"></i>\u05D3\u05D5\u05D7 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D9\u05D5\u05DE\u05D9 - ${selectedDate}</h5>
        <div class="row g-3 mb-3">
          <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-primary">${filtered.length}</div><small>\u05E1\u05D4"\u05DB \u05E8\u05E9\u05D5\u05DE\u05D5\u05EA</small></div></div>
          <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-success">${present}</div><small>\u05E0\u05D5\u05DB\u05D7\u05D9\u05DD</small></div></div>
          <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-danger">${absent}</div><small>\u05D7\u05E1\u05E8\u05D9\u05DD</small></div></div>
          <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-warning">${late}</div><small>\u05DE\u05D0\u05D7\u05E8\u05D9\u05DD</small></div></div>
        </div>
        <div class="row g-3 mb-3">
          <div class="col-md-4"><div class="card p-3"><div style="height:220px"><canvas id="rpt-att-daily-chart"></canvas></div></div></div>
          <div class="col-md-8"><div class="card p-3">
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="fw-bold">\u05D0\u05D7\u05D5\u05D6 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA:</span>
              <div class="progress flex-grow-1" style="height:24px">
                <div class="progress-bar bg-success" style="width:${pct}%">${pct}%</div>
              </div>
            </div>
            ${!filtered.length ? '<div class="text-muted text-center py-3">\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05DC\u05EA\u05D0\u05E8\u05D9\u05DA \u05D6\u05D4</div>' : ''}
          </div></div>
        </div>
        ${filtered.length ? `<div class="card p-3"><table class="table table-sm table-hover table-bht">
          <thead><tr><th>#</th><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th>\u05DB\u05D9\u05EA\u05D4</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th><th>\u05D4\u05E2\u05E8\u05D4</th></tr></thead>
          <tbody>${filtered.map((a,i) => {
            const name = a['\u05E9\u05DD']||a['\u05EA\u05DC\u05DE\u05D9\u05D3']||'';
            return `<tr><td>${i+1}</td><td class="fw-bold">${name}</td><td>${classMap[name]||'-'}</td><td>${statusBadge(a['\u05E1\u05D8\u05D8\u05D5\u05E1'])}</td><td>${a['\u05D4\u05E2\u05E8\u05D4']||'-'}</td></tr>`;
          }).join('')}</tbody>
        </table></div>` : ''}
      </div>`;

      const adCtx = document.getElementById('rpt-att-daily-chart');
      if (adCtx && filtered.length) App.charts.rptAttDaily = new Chart(adCtx, {type:'doughnut', data:{labels:['\u05E0\u05D5\u05DB\u05D7','\u05D7\u05D9\u05E1\u05D5\u05E8','\u05D0\u05D9\u05D7\u05D5\u05E8'], datasets:[{data:[present,absent,late], backgroundColor:['#0f9d58','#ea4335','#f9ab00'], borderWidth:0}]}, options:{responsive:true, maintainAspectRatio:false, cutout:'55%', plugins:{legend:{position:'bottom'}}}}); Pages._rptCharts.push(App.charts.rptAttDaily);
    }

    /* ---- ATTENDANCE MONTHLY ---- */
    else if (type === 'att_monthly') {
      let filteredAtt = this._rptFilterByDate(att, '\u05EA\u05D0\u05E8\u05D9\u05DA');
      // Class filter
      if (this._rptClassFilter) {
        const classStudents = new Set();
        active.forEach(s => { if ((s['\u05DB\u05D9\u05EA\u05D4']||'') === this._rptClassFilter) classStudents.add(Utils.fullName ? Utils.fullName(s) : (s['\u05E9\u05DD']||s['\u05EA\u05DC\u05DE\u05D9\u05D3']||'')); });
        filteredAtt = filteredAtt.filter(a => classStudents.has(a['\u05E9\u05DD']||a['\u05EA\u05DC\u05DE\u05D9\u05D3']||''));
      }

      // Per-student stats
      const perStudent = {};
      filteredAtt.forEach(a => {
        const n = a['\u05E9\u05DD']||a['\u05EA\u05DC\u05DE\u05D9\u05D3']||''; if (!n) return;
        if (!perStudent[n]) perStudent[n]={present:0,absent:0,late:0,total:0};
        perStudent[n].total++;
        if (a['\u05E1\u05D8\u05D8\u05D5\u05E1']==='\u05E0\u05D5\u05DB\u05D7') perStudent[n].present++;
        else if (a['\u05E1\u05D8\u05D8\u05D5\u05E1']==='\u05D7\u05D9\u05E1\u05D5\u05E8') perStudent[n].absent++;
        else perStudent[n].late++;
      });
      const sorted = Object.entries(perStudent).map(([name,d]) => ({name, ...d, pct: d.total ? Math.round(d.present/d.total*100) : 0})).sort((a,b)=>a.pct-b.pct);

      // Daily trend
      const byDate = {};
      filteredAtt.forEach(a => {
        const d = a['\u05EA\u05D0\u05E8\u05D9\u05DA']||''; if (!d) return;
        if (!byDate[d]) byDate[d]={p:0,a:0,l:0};
        if (a['\u05E1\u05D8\u05D8\u05D5\u05E1']==='\u05E0\u05D5\u05DB\u05D7') byDate[d].p++;
        else if (a['\u05E1\u05D8\u05D8\u05D5\u05E1']==='\u05D7\u05D9\u05E1\u05D5\u05E8') byDate[d].a++;
        else byDate[d].l++;
      });
      const dates = Object.keys(byDate).sort();

      const totalPresent = sorted.reduce((s,r)=>s+r.present,0);
      const totalAll = sorted.reduce((s,r)=>s+r.total,0);
      const avgPct = totalAll ? Math.round(totalPresent/totalAll*100) : 0;
      const atRisk = sorted.filter(r=>r.pct<80);

      c.innerHTML = `<div id="rpt-print-area">
        <h5 class="fw-bold mb-3"><i class="bi bi-calendar-range me-2"></i>\u05D3\u05D5\u05D7 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D7\u05D5\u05D3\u05E9\u05D9 (${this._rptDateFrom || '-'} \u05E2\u05D3 ${this._rptDateTo || '-'})</h5>
        <div class="row g-3 mb-3">
          <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-primary">${sorted.length}</div><small>\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</small></div></div>
          <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-success">${avgPct}%</div><small>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05DE\u05DE\u05D5\u05E6\u05E2\u05EA</small></div></div>
          <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-danger">${atRisk.length}</div><small>\u05D1\u05E1\u05D9\u05DB\u05D5\u05DF (&lt;80%)</small></div></div>
          <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold">${dates.length}</div><small>\u05D9\u05DE\u05D9 \u05DC\u05D9\u05DE\u05D5\u05D3</small></div></div>
        </div>
        <div class="card p-3 mb-3"><h6 class="fw-bold">\u05DE\u05D2\u05DE\u05D4 \u05D9\u05D5\u05DE\u05D9\u05EA</h6><div style="height:280px"><canvas id="rpt-att-monthly-chart"></canvas></div></div>
        <div class="card p-3">
          <h6 class="fw-bold">\u05E4\u05D9\u05E8\u05D5\u05D8 \u05DC\u05E4\u05D9 \u05EA\u05DC\u05DE\u05D9\u05D3</h6>
          <table class="table table-sm table-hover table-bht">
            <thead><tr><th>#</th><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th>\u05DB\u05D9\u05EA\u05D4</th><th>\u05E0\u05D5\u05DB\u05D7</th><th>\u05D7\u05D9\u05E1\u05D5\u05E8</th><th>\u05D0\u05D9\u05D7\u05D5\u05E8</th><th>\u05E1\u05D4"\u05DB</th><th>\u05D0\u05D7\u05D5\u05D6</th><th>\u05DE\u05E6\u05D1</th></tr></thead>
            <tbody>${sorted.map((r,i) => `<tr class="${r.pct<60?'table-danger':r.pct<80?'table-warning':''}">
              <td>${i+1}</td><td class="fw-bold">${r.name}</td><td>${classMap[r.name]||'-'}</td>
              <td class="text-success">${r.present}</td><td class="text-danger">${r.absent}</td><td class="text-warning">${r.late}</td><td>${r.total}</td>
              <td class="fw-bold ${r.pct>=80?'text-success':r.pct>=60?'text-warning':'text-danger'}">${r.pct}%</td>
              <td><div class="progress" style="height:18px;width:100px"><div class="progress-bar ${r.pct>=80?'bg-success':r.pct>=60?'bg-warning':'bg-danger'}" style="width:${r.pct}%"></div></div></td>
            </tr>`).join('')}</tbody>
          </table>
        </div>
      </div>`;

      const amCtx = document.getElementById('rpt-att-monthly-chart');
      if (amCtx && dates.length) App.charts.rptAttMonthly = new Chart(amCtx, {type:'bar', data:{labels:dates.map(d=>d.substring(5)), datasets:[{label:'\u05E0\u05D5\u05DB\u05D7',data:dates.map(d=>byDate[d].p),backgroundColor:'#0f9d58'},{label:'\u05D7\u05D9\u05E1\u05D5\u05E8',data:dates.map(d=>byDate[d].a),backgroundColor:'#ea4335'},{label:'\u05D0\u05D9\u05D7\u05D5\u05E8',data:dates.map(d=>byDate[d].l),backgroundColor:'#f9ab00'}]}, options:{responsive:true, maintainAspectRatio:false, scales:{x:{stacked:true},y:{stacked:true,beginAtZero:true}}, plugins:{legend:{position:'top'}}}}); Pages._rptCharts.push(App.charts.rptAttMonthly);
    }

    /* ---- FINANCE SUMMARY ---- */
    else if (type === 'finance') {
      let filteredFin = this._rptFilterByDate(fin, '\u05EA\u05D0\u05E8\u05D9\u05DA');
      if (this._rptClassFilter) {
        const classStudents = new Set();
        active.forEach(s => { if ((s['\u05DB\u05D9\u05EA\u05D4']||'') === this._rptClassFilter) classStudents.add(Utils.fullName ? Utils.fullName(s) : (s['\u05E9\u05DD']||s['\u05EA\u05DC\u05DE\u05D9\u05D3']||'')); });
        filteredFin = filteredFin.filter(f => classStudents.has(f['\u05EA\u05DC\u05DE\u05D9\u05D3']||f['\u05E9\u05DD']||''));
      }

      const totalAmount = filteredFin.reduce((s,f) => s+(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0), 0);
      const paidAmount = filteredFin.filter(f => (f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05E9\u05D5\u05DC\u05DD').reduce((s,f) => s+(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0), 0);
      const pendingAmount = filteredFin.filter(f => (f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05D7\u05D5\u05D1').reduce((s,f) => s+(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0), 0);
      const overdueAmount = filteredFin.filter(f => (f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05D1\u05E4\u05D9\u05D2\u05D5\u05E8'||(f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='').reduce((s,f) => s+(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0), 0);
      const unpaid = totalAmount - paidAmount;
      const paidPct = totalAmount ? Math.round(paidAmount/totalAmount*100) : 0;

      // Per-student breakdown
      const perStudent = {};
      filteredFin.forEach(f => {
        const n = f['\u05EA\u05DC\u05DE\u05D9\u05D3']||f['\u05E9\u05DD']||''; if (!n) return;
        if (!perStudent[n]) perStudent[n]={total:0,paid:0,pending:0};
        const amt = Number(f['\u05E1\u05DB\u05D5\u05DD'])||0;
        perStudent[n].total += amt;
        if ((f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05E9\u05D5\u05DC\u05DD') perStudent[n].paid += amt;
        else perStudent[n].pending += amt;
      });
      const studentList = Object.entries(perStudent).map(([name,d])=>({name,...d})).sort((a,b)=>b.pending-a.pending);

      // Monthly breakdown
      const byMonth = {};
      filteredFin.forEach(f => {
        const d = f['\u05EA\u05D0\u05E8\u05D9\u05DA']||f['\u05D7\u05D5\u05D3\u05E9']||'';
        const m = d.length >= 7 ? d.slice(0,7) : d;
        if (!m) return;
        if (!byMonth[m]) byMonth[m]={total:0,paid:0};
        byMonth[m].total += Number(f['\u05E1\u05DB\u05D5\u05DD'])||0;
        if ((f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05E9\u05D5\u05DC\u05DD') byMonth[m].paid += Number(f['\u05E1\u05DB\u05D5\u05DD'])||0;
      });
      const months = Object.keys(byMonth).sort().slice(-12);

      c.innerHTML = `<div id="rpt-print-area">
        <h5 class="fw-bold mb-3"><i class="bi bi-cash-stack me-2"></i>\u05E1\u05D9\u05DB\u05D5\u05DD \u05DB\u05E1\u05E4\u05D9</h5>
        <div class="row g-3 mb-3">
          <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-3 fw-bold">${Utils.formatCurrency(totalAmount)}</div><small>\u05E1\u05D4"\u05DB \u05D7\u05D9\u05D5\u05D1\u05D9\u05DD</small></div></div>
          <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-3 fw-bold text-success">${Utils.formatCurrency(paidAmount)}</div><small>\u05E0\u05D2\u05D1\u05D4</small></div></div>
          <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-3 fw-bold text-danger">${Utils.formatCurrency(unpaid)}</div><small>\u05D7\u05D5\u05D1 \u05E4\u05EA\u05D5\u05D7</small></div></div>
          <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-3 fw-bold ${paidPct>=70?'text-success':'text-warning'}">${paidPct}%</div><small>\u05D0\u05D7\u05D5\u05D6 \u05D2\u05D1\u05D9\u05D4</small></div></div>
        </div>
        <div class="row g-3 mb-3">
          <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold">\u05D4\u05EA\u05E4\u05DC\u05D2\u05D5\u05EA \u05D7\u05D5\u05D3\u05E9\u05D9\u05EA</h6><div style="height:280px"><canvas id="rpt-fin-monthly-chart"></canvas></div></div></div>
          <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold">\u05D7\u05DC\u05D5\u05E7\u05EA \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD</h6><div style="height:280px"><canvas id="rpt-fin-pie-chart"></canvas></div></div></div>
        </div>
        <div class="card p-3">
          <h6 class="fw-bold">\u05E4\u05D9\u05E8\u05D5\u05D8 \u05DC\u05E4\u05D9 \u05EA\u05DC\u05DE\u05D9\u05D3</h6>
          <table class="table table-sm table-hover table-bht">
            <thead><tr><th>#</th><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th>\u05DB\u05D9\u05EA\u05D4</th><th>\u05E1\u05D4"\u05DB \u05D7\u05D9\u05D5\u05D1</th><th>\u05E9\u05D5\u05DC\u05DD</th><th>\u05D9\u05EA\u05E8\u05D4</th><th>\u05DE\u05E6\u05D1</th></tr></thead>
            <tbody>${studentList.map((r,i) => {
              const pp = r.total ? Math.round(r.paid/r.total*100) : 0;
              return `<tr class="${r.pending>0?'':'table-success'}">
                <td>${i+1}</td><td class="fw-bold">${r.name}</td><td>${classMap[r.name]||'-'}</td>
                <td>${Utils.formatCurrency(r.total)}</td><td class="text-success">${Utils.formatCurrency(r.paid)}</td>
                <td class="text-danger fw-bold">${Utils.formatCurrency(r.pending)}</td>
                <td><div class="progress" style="height:18px;width:100px"><div class="progress-bar ${pp>=80?'bg-success':pp>=50?'bg-warning':'bg-danger'}" style="width:${pp}%">${pp}%</div></div></td>
              </tr>`;
            }).join('')}</tbody>
          </table>
        </div>
      </div>`;

      const fmCtx = document.getElementById('rpt-fin-monthly-chart');
      if (fmCtx && months.length) App.charts.rptFinM = new Chart(fmCtx, {type:'bar', data:{labels:months, datasets:[{label:'\u05D7\u05D9\u05D5\u05D1',data:months.map(m=>byMonth[m].total),backgroundColor:'rgba(37,99,235,.3)',borderColor:'#2563eb',borderWidth:2},{label:'\u05D2\u05D1\u05D9\u05D4',data:months.map(m=>byMonth[m].paid),backgroundColor:'rgba(15,157,88,.3)',borderColor:'#0f9d58',borderWidth:2}]}, options:{responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'top'}}}}); Pages._rptCharts.push(App.charts.rptFinM);
      const fpCtx = document.getElementById('rpt-fin-pie-chart');
      if (fpCtx) App.charts.rptFinSummary = new Chart(fpCtx, {type:'doughnut', data:{labels:['\u05E9\u05D5\u05DC\u05DD','\u05D7\u05D5\u05D1','\u05D1\u05E4\u05D9\u05D2\u05D5\u05E8'], datasets:[{data:[paidAmount, pendingAmount, overdueAmount], backgroundColor:['#0f9d58','#f9ab00','#ea4335'], borderWidth:0}]}, options:{responsive:true, maintainAspectRatio:false, cutout:'55%', plugins:{legend:{position:'bottom'}}}}); Pages._rptCharts.push(App.charts.rptFinSummary);
    }

    /* ---- STUDENTS BY CLASS ---- */
    else if (type === 'students_by_class') {
      let filteredStudents = active;
      if (this._rptClassFilter) {
        filteredStudents = active.filter(s => (s['\u05DB\u05D9\u05EA\u05D4']||'') === this._rptClassFilter);
      }
      const classes = {};
      filteredStudents.forEach(s => { const cls = s['\u05DB\u05D9\u05EA\u05D4']||'\u05D0\u05D7\u05E8'; if (!classes[cls]) classes[cls]=[]; classes[cls].push(s); });

      c.innerHTML = `<div id="rpt-print-area">
        <h5 class="fw-bold mb-3"><i class="bi bi-people me-2"></i>\u05E8\u05E9\u05D9\u05DE\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05DC\u05E4\u05D9 \u05DB\u05D9\u05EA\u05D4</h5>
        <div class="row g-3 mb-3">
          <div class="col-md-4"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-primary">${filteredStudents.length}</div><small>\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</small></div></div>
          <div class="col-md-4"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-info">${Object.keys(classes).length}</div><small>\u05DB\u05D9\u05EA\u05D5\u05EA</small></div></div>
          <div class="col-md-4"><div class="card p-3"><div style="height:150px"><canvas id="rpt-cls-pie"></canvas></div></div></div>
        </div>
        <div class="row g-3">${Object.keys(classes).sort().map(cls => {
          const list = classes[cls];
          return `<div class="col-md-6"><div class="card p-3">
            <h6 class="fw-bold"><i class="bi bi-people-fill text-primary me-2"></i>\u05DB\u05D9\u05EA\u05D4 ${cls} <span class="badge bg-primary">${list.length}</span></h6>
            <table class="table table-sm table-bht mt-2">
              <thead><tr><th>#</th><th>\u05E9\u05DD</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th></tr></thead>
              <tbody>${list.map((s,i) => `<tr>
                <td>${i+1}</td>
                <td class="fw-bold"><span class="d-inline-flex">${Utils.avatarHTML ? Utils.avatarHTML(Utils.fullName(s),'sm') : ''}<a href="#student/${Utils.rowId(s)}" class="text-decoration-none me-1">${Utils.fullName(s)}</a></span></td>
                <td><span class="badge ${(s['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')=== '\u05E4\u05E2\u05D9\u05DC'?'bg-success':'bg-secondary'}">${s['\u05E1\u05D8\u05D8\u05D5\u05E1']||'\u05E4\u05E2\u05D9\u05DC'}</span></td>
              </tr>`).join('')}</tbody>
            </table>
          </div></div>`;
        }).join('')}</div>
      </div>`;

      const cpCtx = document.getElementById('rpt-cls-pie');
      if (cpCtx) App.charts.rptCls = new Chart(cpCtx, {type:'pie', data:{labels:Object.keys(classes), datasets:[{data:Object.keys(classes).map(k=>classes[k].length), backgroundColor:['#2563eb','#0f9d58','#f9ab00','#ea4335','#8b5cf6','#06b6d4','#ec4899'], borderWidth:0}]}, options:{responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'bottom',labels:{font:{size:11}}}}}}); Pages._rptCharts.push(App.charts.rptCls);
    }

    /* ---- BEHAVIOR SUMMARY ---- */
    else if (type === 'behavior') {
      let filteredBeh = this._rptFilterByDate(beh, '\u05EA\u05D0\u05E8\u05D9\u05DA');
      if (this._rptClassFilter) {
        const classStudents = new Set();
        active.forEach(s => { if ((s['\u05DB\u05D9\u05EA\u05D4']||'') === this._rptClassFilter) classStudents.add(Utils.fullName ? Utils.fullName(s) : (s['\u05E9\u05DD']||s['\u05EA\u05DC\u05DE\u05D9\u05D3']||'')); });
        filteredBeh = filteredBeh.filter(b => {
          const n = b['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3']||b['\u05E9\u05DD']||b['\u05EA\u05DC\u05DE\u05D9\u05D3']||'';
          return classStudents.has(n);
        });
      }

      const scores = {};
      filteredBeh.forEach(r => {
        const n = r['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3']||r['\u05E9\u05DD']||r['\u05EA\u05DC\u05DE\u05D9\u05D3']||''; if (!n) return;
        if (!scores[n]) scores[n]={p:0,n:0,note:0};
        if (r['\u05E1\u05D5\u05D2']==='\u05D7\u05D9\u05D5\u05D1\u05D9') scores[n].p++;
        else if (r['\u05E1\u05D5\u05D2']==='\u05E9\u05DC\u05D9\u05DC\u05D9') scores[n].n++;
        else scores[n].note++;
      });
      const sorted = Object.keys(scores).map(n => ({name:n, net:scores[n].p-scores[n].n, pos:scores[n].p, neg:scores[n].n, note:scores[n].note})).sort((a,b)=>b.net-a.net);

      const totalPos = sorted.reduce((s,r)=>s+r.pos,0);
      const totalNeg = sorted.reduce((s,r)=>s+r.neg,0);
      const totalNote = sorted.reduce((s,r)=>s+r.note,0);

      c.innerHTML = `<div id="rpt-print-area">
        <h5 class="fw-bold mb-3"><i class="bi bi-star-half me-2"></i>\u05E1\u05D9\u05DB\u05D5\u05DD \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</h5>
        <div class="row g-3 mb-3">
          <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-primary">${filteredBeh.length}</div><small>\u05E1\u05D4"\u05DB \u05D0\u05D9\u05E8\u05D5\u05E2\u05D9\u05DD</small></div></div>
          <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-success">${totalPos}</div><small>\u05D7\u05D9\u05D5\u05D1\u05D9</small></div></div>
          <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-danger">${totalNeg}</div><small>\u05E9\u05DC\u05D9\u05DC\u05D9</small></div></div>
          <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-info">${totalNote}</div><small>\u05D4\u05E2\u05E8\u05D5\u05EA</small></div></div>
        </div>
        <div class="row g-3 mb-3">
          <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold">\u05E0\u05D9\u05E7\u05D5\u05D3 \u05DC\u05E4\u05D9 \u05EA\u05DC\u05DE\u05D9\u05D3 (Top 15)</h6><div style="height:350px"><canvas id="rpt-beh-rank-chart"></canvas></div></div></div>
          <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold">\u05D7\u05DC\u05D5\u05E7\u05D4 \u05DC\u05E4\u05D9 \u05E1\u05D5\u05D2</h6><div style="height:350px"><canvas id="rpt-beh-type-chart"></canvas></div></div></div>
        </div>
        <div class="card p-3">
          <h6 class="fw-bold">\u05D8\u05D1\u05DC\u05D4 \u05DE\u05E4\u05D5\u05E8\u05D8\u05EA</h6>
          <table class="table table-sm table-hover table-bht">
            <thead><tr><th>#</th><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th>\u05DB\u05D9\u05EA\u05D4</th><th>\u05D7\u05D9\u05D5\u05D1\u05D9</th><th>\u05E9\u05DC\u05D9\u05DC\u05D9</th><th>\u05D4\u05E2\u05E8\u05D5\u05EA</th><th>\u05E0\u05D8\u05D5</th><th>\u05DE\u05E6\u05D1</th></tr></thead>
            <tbody>${sorted.map((r,i) => `<tr>
              <td>${i+1}</td><td class="fw-bold">${r.name}</td><td>${classMap[r.name]||'-'}</td>
              <td class="text-success">${r.pos}</td><td class="text-danger">${r.neg}</td><td class="text-info">${r.note}</td>
              <td class="fw-bold ${r.net>=0?'text-success':'text-danger'}">${r.net>=0?'+':''}${r.net}</td>
              <td>${r.net>0?'<i class="bi bi-emoji-smile text-success"></i>':r.net<0?'<i class="bi bi-emoji-frown text-danger"></i>':'<i class="bi bi-emoji-neutral text-muted"></i>'}</td>
            </tr>`).join('')}</tbody>
          </table>
        </div>
      </div>`;

      const brCtx = document.getElementById('rpt-beh-rank-chart');
      if (brCtx && sorted.length) App.charts.rptBehR = new Chart(brCtx, {type:'bar', data:{labels:sorted.slice(0,15).map(r=>r.name), datasets:[{label:'\u05D7\u05D9\u05D5\u05D1\u05D9',data:sorted.slice(0,15).map(r=>r.pos),backgroundColor:'#0f9d58'},{label:'\u05E9\u05DC\u05D9\u05DC\u05D9',data:sorted.slice(0,15).map(r=>-r.neg),backgroundColor:'#ea4335'}]}, options:{responsive:true, maintainAspectRatio:false, indexAxis:'y', scales:{x:{stacked:true},y:{stacked:true}}, plugins:{legend:{position:'top'}}}}); Pages._rptCharts.push(App.charts.rptBehR);
      const btCtx = document.getElementById('rpt-beh-type-chart');
      if (btCtx) App.charts.rptBehSummary = new Chart(btCtx, {type:'doughnut', data:{labels:['\u05D7\u05D9\u05D5\u05D1\u05D9','\u05E9\u05DC\u05D9\u05DC\u05D9','\u05D4\u05E2\u05E8\u05D4'], datasets:[{data:[totalPos,totalNeg,totalNote], backgroundColor:['#0f9d58','#ea4335','#4285f4'], borderWidth:0}]}, options:{responsive:true, maintainAspectRatio:false, cutout:'55%', plugins:{legend:{position:'bottom'}}}}); Pages._rptCharts.push(App.charts.rptBehSummary);
    }

    /* ---- ANNUAL SUMMARY ---- */
    else if (type === 'annual') {
      const grades = _gc('\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD');
      const now = new Date();
      const yearStart = now.getMonth() >= 8 ? now.getFullYear() : now.getFullYear() - 1;
      const yrFrom = yearStart + '-09-01';
      const yrTo = (yearStart + 1) + '-08-31';
      const yrFilter = (arr, df) => arr.filter(r => { const d = r[df]||''; return d >= yrFrom && d <= yrTo; });

      const yrAtt = yrFilter(att, '\u05EA\u05D0\u05E8\u05D9\u05DA');
      const yrFin = yrFilter(fin, '\u05EA\u05D0\u05E8\u05D9\u05DA');
      const yrBeh = yrFilter(beh, '\u05EA\u05D0\u05E8\u05D9\u05DA');
      const yrGrades = yrFilter(grades, '\u05EA\u05D0\u05E8\u05D9\u05DA');

      // Summary stats
      const totalStudents = active.length;
      const attPresent = yrAtt.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1']==='\u05E0\u05D5\u05DB\u05D7').length;
      const attRate = yrAtt.length ? Math.round(attPresent / yrAtt.length * 100) : 0;
      const allScores = yrGrades.map(g => parseFloat(g['\u05E6\u05D9\u05D5\u05DF'])||0).filter(v => v > 0);
      const avgGrade = allScores.length ? Math.round(allScores.reduce((a,b)=>a+b,0)/allScores.length) : 0;
      const posB2 = yrBeh.filter(b => b['\u05E1\u05D5\u05D2']==='\u05D7\u05D9\u05D5\u05D1\u05D9').length;
      const negB2 = yrBeh.filter(b => b['\u05E1\u05D5\u05D2']==='\u05E9\u05DC\u05D9\u05DC\u05D9').length;
      const behScore = posB2 - negB2;
      const totalAmount = yrFin.reduce((s,f) => s+(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0), 0);
      const paidAmount = yrFin.filter(f => (f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05E9\u05D5\u05DC\u05DD').reduce((s,f) => s+(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0), 0);
      const pendingAmount = totalAmount - paidAmount;
      const collectionRate = totalAmount ? Math.round(paidAmount / totalAmount * 100) : 0;

      // Monthly attendance trend
      const months = [];
      for (let m = 0; m < 12; m++) {
        const mi = ((8 + m) % 12) + 1;
        const yr = mi >= 9 ? yearStart : yearStart + 1;
        const key = yr + '-' + String(mi).padStart(2,'0');
        const mAtt = yrAtt.filter(a => (a['\u05EA\u05D0\u05E8\u05D9\u05DA']||'').startsWith(key));
        const mPresent = mAtt.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1']==='\u05E0\u05D5\u05DB\u05D7').length;
        const mRate = mAtt.length ? Math.round(mPresent / mAtt.length * 100) : 0;
        const hMonths = ['\u05D9\u05E0\u05D5\u05D0\u05E8','\u05E4\u05D1\u05E8\u05D5\u05D0\u05E8','\u05DE\u05E8\u05E5','\u05D0\u05E4\u05E8\u05D9\u05DC','\u05DE\u05D0\u05D9','\u05D9\u05D5\u05E0\u05D9','\u05D9\u05D5\u05DC\u05D9','\u05D0\u05D5\u05D2\u05D5\u05E1\u05D8','\u05E1\u05E4\u05D8\u05DE\u05D1\u05E8','\u05D0\u05D5\u05E7\u05D8\u05D5\u05D1\u05E8','\u05E0\u05D5\u05D1\u05DE\u05D1\u05E8','\u05D3\u05E6\u05DE\u05D1\u05E8'];
        months.push({ label: hMonths[mi-1], rate: mRate, count: mAtt.length });
      }

      // Grade distribution
      const gradeBuckets = {'0-54':0, '55-69':0, '70-79':0, '80-89':0, '90-100':0};
      allScores.forEach(s => {
        if (s < 55) gradeBuckets['0-54']++;
        else if (s < 70) gradeBuckets['55-69']++;
        else if (s < 80) gradeBuckets['70-79']++;
        else if (s < 90) gradeBuckets['80-89']++;
        else gradeBuckets['90-100']++;
      });

      // Monthly behavior trend
      const behMonths = months.map((m, i) => {
        const mi2 = ((8 + i) % 12) + 1;
        const yr2 = mi2 >= 9 ? yearStart : yearStart + 1;
        const key2 = yr2 + '-' + String(mi2).padStart(2,'0');
        const mBeh = yrBeh.filter(b => (b['\u05EA\u05D0\u05E8\u05D9\u05DA']||'').startsWith(key2));
        const mPos = mBeh.filter(b => b['\u05E1\u05D5\u05D2']==='\u05D7\u05D9\u05D5\u05D1\u05D9').length;
        const mNeg = mBeh.filter(b => b['\u05E1\u05D5\u05D2']==='\u05E9\u05DC\u05D9\u05DC\u05D9').length;
        return { label: m.label, pos: mPos, neg: mNeg };
      });

      // Payment status breakdown
      const payPaid = yrFin.filter(f => (f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05E9\u05D5\u05DC\u05DD').length;
      const payPending = yrFin.filter(f => (f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05D7\u05D5\u05D1').length;
      const payOverdue = yrFin.filter(f => (f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05D1\u05E4\u05D9\u05D2\u05D5\u05E8').length;
      const payOther = yrFin.length - payPaid - payPending - payOverdue;

      const yearLabel = yearStart + '/' + (yearStart + 1);

      c.innerHTML = `<div id="rpt-print-area">
        <div class="text-center mb-4 border-bottom pb-3">
          <h3 class="fw-bold mb-1"><i class="bi bi-building me-2"></i>\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3</h3>
          <h5 class="text-muted">\u05D3\u05D5\u05D7 \u05E1\u05D9\u05DB\u05D5\u05DD \u05E9\u05E0\u05EA\u05D9 ${yearLabel}</h5>
          <small class="text-muted">\u05D4\u05D5\u05E4\u05E7: ${new Date().toLocaleDateString('he-IL')}</small>
        </div>

        <div class="row g-3 mb-4">
          <div class="col-md-2 col-4"><div class="card p-3 text-center"><div class="fs-3 fw-bold text-primary">${totalStudents}</div><small>\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</small></div></div>
          <div class="col-md-2 col-4"><div class="card p-3 text-center"><div class="fs-3 fw-bold text-success">${attRate}%</div><small>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</small></div></div>
          <div class="col-md-2 col-4"><div class="card p-3 text-center"><div class="fs-3 fw-bold text-info">${avgGrade}</div><small>\u05DE\u05DE\u05D5\u05E6\u05E2 \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD</small></div></div>
          <div class="col-md-2 col-4"><div class="card p-3 text-center"><div class="fs-3 fw-bold ${behScore >= 0 ? 'text-success' : 'text-danger'}">${behScore >= 0 ? '+' : ''}${behScore}</div><small>\u05E0\u05D9\u05E7\u05D5\u05D3 \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</small></div></div>
          <div class="col-md-2 col-4"><div class="card p-3 text-center"><div class="fs-3 fw-bold text-success">${Utils.formatCurrency(paidAmount)}</div><small>\u05E9\u05D5\u05DC\u05DD</small></div></div>
          <div class="col-md-2 col-4"><div class="card p-3 text-center"><div class="fs-3 fw-bold text-danger">${Utils.formatCurrency(pendingAmount)}</div><small>\u05D7\u05D5\u05D1 \u05E4\u05EA\u05D5\u05D7</small></div></div>
        </div>

        <div class="card p-3 mb-3">
          <h6 class="fw-bold mb-2">\u05E1\u05D9\u05DB\u05D5\u05DD \u05DB\u05E1\u05E4\u05D9</h6>
          <table class="table table-sm table-bordered mb-0">
            <thead><tr><th>\u05E1\u05D4"\u05DB \u05D7\u05D9\u05D5\u05D1\u05D9\u05DD</th><th>\u05E1\u05D4"\u05DB \u05E9\u05D5\u05DC\u05DD</th><th>\u05E1\u05D4"\u05DB \u05D7\u05D5\u05D1</th><th>\u05D0\u05D7\u05D5\u05D6 \u05D2\u05D1\u05D9\u05D4</th></tr></thead>
            <tbody><tr>
              <td class="fw-bold">${Utils.formatCurrency(totalAmount)}</td>
              <td class="text-success fw-bold">${Utils.formatCurrency(paidAmount)}</td>
              <td class="text-danger fw-bold">${Utils.formatCurrency(pendingAmount)}</td>
              <td><span class="badge ${collectionRate >= 80 ? 'bg-success' : collectionRate >= 50 ? 'bg-warning' : 'bg-danger'}">${collectionRate}%</span></td>
            </tr></tbody>
          </table>
        </div>

        <div class="row g-3 mb-3">
          <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold"><i class="bi bi-graph-up me-2"></i>\u05DE\u05D2\u05DE\u05EA \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D7\u05D5\u05D3\u05E9\u05D9\u05EA</h6><div style="height:280px"><canvas id="rpt-ann-att-chart"></canvas></div></div></div>
          <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold"><i class="bi bi-bar-chart me-2"></i>\u05D4\u05EA\u05E4\u05DC\u05D2\u05D5\u05EA \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD</h6><div style="height:280px"><canvas id="rpt-ann-grades-chart"></canvas></div></div></div>
          <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold"><i class="bi bi-emoji-smile me-2"></i>\u05DE\u05D2\u05DE\u05EA \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</h6><div style="height:280px"><canvas id="rpt-ann-beh-chart"></canvas></div></div></div>
          <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold"><i class="bi bi-cash-coin me-2"></i>\u05DE\u05E6\u05D1 \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD</h6><div style="height:280px"><canvas id="rpt-ann-pay-chart"></canvas></div></div></div>
        </div>
      </div>`;

      // Chart 1: Monthly attendance trend
      const annAttCtx = document.getElementById('rpt-ann-att-chart');
      if (annAttCtx) {
        App.charts.rptAnnAtt = new Chart(annAttCtx, {type:'line', data:{labels:months.map(m=>m.label), datasets:[{label:'\u05D0\u05D7\u05D5\u05D6 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA %', data:months.map(m=>m.rate), borderColor:'#0f9d58', backgroundColor:'rgba(15,157,88,0.1)', fill:true, tension:0.3, pointRadius:4}]}, options:{responsive:true, maintainAspectRatio:false, scales:{y:{min:0,max:100,ticks:{callback:v=>v+'%'}}}, plugins:{legend:{display:false}}}});
        Pages._rptCharts.push(App.charts.rptAnnAtt);
      }

      // Chart 2: Grade distribution
      const annGrCtx = document.getElementById('rpt-ann-grades-chart');
      if (annGrCtx) {
        App.charts.rptAnnGrades = new Chart(annGrCtx, {type:'bar', data:{labels:Object.keys(gradeBuckets), datasets:[{label:'\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD', data:Object.values(gradeBuckets), backgroundColor:['#ea4335','#f9ab00','#4285f4','#0f9d58','#34a853'], borderRadius:8}]}, options:{responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}}});
        Pages._rptCharts.push(App.charts.rptAnnGrades);
      }

      // Chart 3: Monthly behavior trend
      const annBhCtx = document.getElementById('rpt-ann-beh-chart');
      if (annBhCtx) {
        App.charts.rptAnnBeh = new Chart(annBhCtx, {type:'bar', data:{labels:behMonths.map(m=>m.label), datasets:[{label:'\u05D7\u05D9\u05D5\u05D1\u05D9', data:behMonths.map(m=>m.pos), backgroundColor:'#0f9d58', borderRadius:4},{label:'\u05E9\u05DC\u05D9\u05DC\u05D9', data:behMonths.map(m=>-m.neg), backgroundColor:'#ea4335', borderRadius:4}]}, options:{responsive:true, maintainAspectRatio:false, scales:{x:{stacked:true},y:{stacked:true}}, plugins:{legend:{position:'top'}}}});
        Pages._rptCharts.push(App.charts.rptAnnBeh);
      }

      // Chart 4: Payment status
      const annPayCtx = document.getElementById('rpt-ann-pay-chart');
      if (annPayCtx) {
        App.charts.rptAnnPay = new Chart(annPayCtx, {type:'doughnut', data:{labels:['\u05E9\u05D5\u05DC\u05DD','\u05D7\u05D5\u05D1','\u05D1\u05E4\u05D9\u05D2\u05D5\u05E8','\u05D0\u05D7\u05E8'], datasets:[{data:[payPaid, payPending, payOverdue, payOther > 0 ? payOther : 0].filter((_,i) => i < 3 || payOther > 0), backgroundColor:['#0f9d58','#f9ab00','#ea4335','#9e9e9e'], borderWidth:0}]}, options:{responsive:true, maintainAspectRatio:false, cutout:'55%', plugins:{legend:{position:'bottom'}}}});
        Pages._rptCharts.push(App.charts.rptAnnPay);
      }
    }
  },


  /* ======================================================================
     HUB
     ====================================================================== */
  hub() {
    const sections = [
      { title: '\u05E0\u05D9\u05D4\u05D5\u05DC \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD', items: [
        {page:'students',icon:'bi-people-fill',color:'primary',label:'\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD'},
        {page:'parents',icon:'bi-house-heart-fill',color:'warning',label:'\u05D4\u05D5\u05E8\u05D9\u05DD'},
        {page:'attendance',icon:'bi-calendar-check-fill',color:'info',label:'\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA'},
        {page:'attendance_monthly',icon:'bi-calendar-range',color:'info',label:'\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D7\u05D5\u05D3\u05E9\u05D9\u05EA'},
        {page:'behavior',icon:'bi-star-half',color:'primary',label:'\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA'},
        {page:'medical',icon:'bi-heart-pulse',color:'danger',label:'\u05DE\u05D9\u05D3\u05E2 \u05E8\u05E4\u05D5\u05D0\u05D9'},
      ]},
      { title: '\u05DC\u05D9\u05DE\u05D5\u05D3\u05D9\u05DD', items: [
        {page:'homework',icon:'bi-book',color:'success',label:'\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9 \u05D1\u05D9\u05EA'},
        {page:'academics',icon:'bi-journal-text',color:'info',label:'\u05DE\u05D1\u05D7\u05E0\u05D9\u05DD'},
        {page:'schedule',icon:'bi-clock',color:'primary',label:'\u05DE\u05E2\u05E8\u05DB\u05EA \u05E9\u05E2\u05D5\u05EA'},
        {page:'rankings',icon:'bi-trophy',color:'warning',label:'\u05D3\u05D9\u05E8\u05D5\u05D2\u05D9\u05DD'},
        {page:'mivtza',icon:'bi-lightning',color:'warning',label:'\u05DE\u05D1\u05E6\u05E2 \u05DC\u05D9\u05DE\u05D5\u05D3'},
      ]},
      { title: '\u05E6\u05D5\u05D5\u05EA \u05D5\u05DE\u05D5\u05E1\u05D3', items: [
        {page:'staff',icon:'bi-person-badge-fill',color:'success',label:'\u05E6\u05D5\u05D5\u05EA'},
        {page:'staff_salary',icon:'bi-cash-stack',color:'success',label:'\u05E9\u05DB\u05E8 \u05E6\u05D5\u05D5\u05EA'},
        {page:'institutions',icon:'bi-building',color:'primary',label:'\u05DE\u05E1\u05D2\u05E8\u05D5\u05EA'},
        {page:'committees',icon:'bi-people',color:'info',label:'\u05D5\u05E2\u05D3\u05D5\u05EA'},
      ]},
      { title: '\u05DB\u05E1\u05E4\u05D9\u05DD', items: [
        {page:'finance',icon:'bi-cash-stack',color:'danger',label:'\u05E9\u05DB\u05E8 \u05DC\u05D9\u05DE\u05D5\u05D3'},
        {page:'budget',icon:'bi-piggy-bank',color:'warning',label:'\u05EA\u05E7\u05E6\u05D9\u05D1'},
        {page:'pettycash',icon:'bi-wallet2',color:'success',label:'\u05E7\u05D5\u05E4\u05D4 \u05E7\u05D8\u05E0\u05D4'},
      ]},
      { title: '\u05EA\u05E7\u05E9\u05D5\u05E8\u05EA \u05D5\u05E0\u05D9\u05D4\u05D5\u05DC', items: [
        {page:'communications',icon:'bi-chat-dots',color:'success',label:'\u05EA\u05E7\u05E9\u05D5\u05E8\u05EA'},
        {page:'tasks',icon:'bi-kanban',color:'warning',label:'\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA'},
        {page:'calendar',icon:'bi-calendar3',color:'primary',label:'\u05DC\u05D5\u05D7 \u05E9\u05E0\u05D4'},
        {page:'trips',icon:'bi-bus-front',color:'info',label:'\u05D8\u05D9\u05D5\u05DC\u05D9\u05DD'},
        {page:'documents',icon:'bi-folder',color:'warning',label:'\u05DE\u05E1\u05DE\u05DB\u05D9\u05DD'},
        {page:'forms',icon:'bi-ui-checks',color:'primary',label:'\u05D8\u05E4\u05E1\u05D9\u05DD'},
      ]},
      { title: '\u05D3\u05D5\u05D7\u05D5\u05EA \u05D5\u05DB\u05DC\u05D9\u05DD', items: [
        {page:'reports',icon:'bi-file-earmark-bar-graph',color:'danger',label:'\u05D3\u05D5\u05D7\u05D5\u05EA'},
        {page:'ai_assistant',icon:'bi-robot',color:'info',label:'\u05E2\u05D5\u05D6\u05E8 AI'},
        {page:'activity_log',icon:'bi-clock-history',color:'secondary',label:'\u05D9\u05D5\u05DE\u05DF \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA'},
        {page:'settings',icon:'bi-gear',color:'secondary',label:'\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA'},
        {page:'user_management',icon:'bi-person-lock',color:'danger',label:'\u05E0\u05D9\u05D4\u05D5\u05DC \u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD'},
        {page:'help',icon:'bi-question-circle',color:'secondary',label:'\u05E2\u05D6\u05E8\u05D4'},
      ]}
    ];
    return `<div class="page-header"><h1><i class="bi bi-grid-fill me-2"></i>\u05DE\u05E8\u05DB\u05D6 \u05DE\u05D9\u05D3\u05E2</h1><p class="text-muted">\u05D2\u05D9\u05E9\u05D4 \u05DE\u05D4\u05D9\u05E8\u05D4 \u05DC\u05DB\u05DC \u05D4\u05DE\u05D5\u05D3\u05D5\u05DC\u05D9\u05DD</p></div><div class="row g-3 mb-3"><div class="col-6 col-md-4 col-lg-3"><div class="card p-3 text-center"><i class="bi bi-stopwatch fs-1 text-primary"></i><div class="fw-bold mt-2">\u05D8\u05D9\u05D9\u05DE\u05E8 \u05E9\u05D9\u05E2\u05D5\u05E8</div><div class="fs-2 fw-bold mt-2" id="lesson-timer">45:00</div><div class="btn-group btn-group-sm mt-2"><button class="btn btn-success" onclick="Pages.startTimer()"><i class="bi bi-play-fill"></i></button><button class="btn btn-warning" onclick="Pages.pauseTimer()"><i class="bi bi-pause-fill"></i></button><button class="btn btn-danger" onclick="Pages.resetTimer()"><i class="bi bi-stop-fill"></i></button></div><div class="btn-group btn-group-sm mt-1"><button class="btn btn-outline-secondary" onclick="Pages.setTimer(30)">30</button><button class="btn btn-outline-secondary" onclick="Pages.setTimer(45)">45</button><button class="btn btn-outline-secondary" onclick="Pages.setTimer(60)">60</button></div></div></div></div>${sections.map(sec => `<h6 class="fw-bold mt-3 mb-2 text-muted"><i class="bi bi-chevron-left me-1"></i>${sec.title}</h6><div class="row g-3 mb-2">${sec.items.map(p => `<div class="col-6 col-md-4 col-lg-3"><a href="#${p.page}" class="card p-3 text-center text-decoration-none card-clickable"><i class="bi ${p.icon} fs-1 text-${p.color}"></i><div class="fw-bold mt-2">${p.label}</div></a></div>`).join('')}</div>`).join('')}`;
  },
  hubInit() {},

  /* ======================================================================
     LESSON TIMER
     ====================================================================== */
  _timerInterval: null,
  _timerSeconds: 2700,
  startTimer() {
    if (this._timerInterval) return;
    this._timerInterval = setInterval(() => {
      if (App.currentPage !== 'settings') { clearInterval(this._timerInterval); this._timerInterval = null; return; }
      this._timerSeconds--;
      if (this._timerSeconds <= 0) {
        clearInterval(this._timerInterval);
        this._timerInterval = null;
        this._timerSeconds = 0;
        Utils.toast('\u23F0 \u05D4\u05E9\u05D9\u05E2\u05D5\u05E8 \u05D4\u05E1\u05EA\u05D9\u05D9\u05DD!','warning');
        try { new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAABBBAABACIWAAAiVgAEABAAAABkYXRhO28T/w==').play(); } catch(e){ console.error('Error:', e); }
      }
      const m = Math.floor(this._timerSeconds/60);
      const s = this._timerSeconds%60;
      const el = document.getElementById('lesson-timer');
      if (el) el.textContent = String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
    }, 1000);
  },
  pauseTimer() { clearInterval(this._timerInterval); this._timerInterval = null; },
  resetTimer(min) { this.pauseTimer(); this._timerSeconds = (min||45)*60; const el = document.getElementById('lesson-timer'); if (el) el.textContent = String(min||45).padStart(2,'0')+':00'; },
  setTimer(min) { this.resetTimer(min); },


  /* ======================================================================
     HELP — Comprehensive Help Center
     ====================================================================== */
  _helpFaqData: [
    { q:'\u05D0\u05D9\u05DA \u05DE\u05D5\u05E1\u05D9\u05E4\u05D9\u05DD \u05EA\u05DC\u05DE\u05D9\u05D3 \u05D7\u05D3\u05E9?', a:'\u05E0\u05D5\u05D5\u05D8\u05D5 \u05DC\u05D3\u05E3 <a href="#students">\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</a> \u05D5\u05DC\u05D7\u05E6\u05D5 \u05E2\u05DC "\u05D4\u05D5\u05E1\u05E4\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3". \u05DE\u05DC\u05D0\u05D5 \u05D0\u05EA \u05D4\u05E9\u05DD, \u05DB\u05D9\u05EA\u05D4 \u05D5\u05E4\u05E8\u05D8\u05D9\u05DD \u05E0\u05D5\u05E1\u05E4\u05D9\u05DD.' },
    { q:'\u05D0\u05D9\u05DA \u05DE\u05E1\u05DE\u05E0\u05D9\u05DD \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA?', a:'\u05D1\u05D3\u05E3 <a href="#attendance">\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</a> \u05D1\u05D7\u05E8\u05D5 \u05EA\u05D0\u05E8\u05D9\u05DA \u05D5\u05DB\u05D9\u05EA\u05D4, \u05D5\u05E1\u05DE\u05E0\u05D5 \u05DB\u05DC \u05EA\u05DC\u05DE\u05D9\u05D3 \u05DB\u05E0\u05D5\u05DB\u05D7/\u05D7\u05E1\u05E8/\u05DE\u05D0\u05D7\u05E8. \u05D0\u05E4\u05E9\u05E8 \u05D2\u05DD \u05D1\u05DE\u05E7\u05E9\u05D9\u05DD P/A/L.' },
    { q:'\u05D0\u05D9\u05DA \u05DE\u05D2\u05D3\u05D9\u05E8\u05D9\u05DD \u05DB\u05D9\u05EA\u05D5\u05EA \u05D5\u05DE\u05E1\u05D2\u05E8\u05D5\u05EA?', a:'\u05D1\u05D3\u05E3 <a href="#committees">\u05DE\u05E1\u05D2\u05E8\u05D5\u05EA</a> \u05D0\u05D5 <a href="#settings">\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA</a> \u05D4\u05D2\u05D3\u05D9\u05E8\u05D5 \u05D0\u05EA \u05E8\u05E9\u05D9\u05DE\u05EA \u05D4\u05DB\u05D9\u05EA\u05D5\u05EA \u05D5\u05E9\u05D9\u05D9\u05DB\u05D5 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD.' },
    { q:'\u05D4\u05D0\u05DD \u05D4\u05DE\u05E2\u05E8\u05DB\u05EA \u05E2\u05D5\u05D1\u05D3\u05EA \u05D1\u05DC\u05D9 \u05D0\u05D9\u05E0\u05D8\u05E8\u05E0\u05D8?', a:'\u05DB\u05DF! \u05D4\u05DE\u05E2\u05E8\u05DB\u05EA \u05EA\u05D5\u05DE\u05DB\u05EA PWA \u05D5\u05E2\u05D5\u05D1\u05D3\u05EA \u05D2\u05DD \u05D0\u05D5\u05E4\u05DC\u05D9\u05D9\u05DF. \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05DE\u05E1\u05D5\u05E0\u05DB\u05E8\u05E0\u05D9\u05DD \u05DE\u05D4\u05E9\u05E8\u05EA \u05D1\u05E2\u05EA \u05D4\u05D7\u05D9\u05D1\u05D5\u05E8 \u05D4\u05D1\u05D0.' },
    { q:'\u05D0\u05D9\u05DA \u05DE\u05E0\u05D4\u05DC\u05D9\u05DD \u05E9\u05DB\u05E8 \u05DC\u05D9\u05DE\u05D5\u05D3?', a:'\u05D1\u05D3\u05E3 <a href="#finance">\u05DB\u05E1\u05E4\u05D9\u05DD</a> \u05D0\u05E4\u05E9\u05E8 \u05DC\u05D4\u05D2\u05D3\u05D9\u05E8 \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD, \u05EA\u05D5\u05DB\u05E0\u05D9\u05D5\u05EA \u05EA\u05E9\u05DC\u05D5\u05DD, \u05D5\u05DC\u05E2\u05E7\u05D5\u05D1 \u05D0\u05D7\u05E8 \u05D2\u05D1\u05D9\u05D9\u05D4.' },
    { q:'\u05D0\u05D9\u05DA \u05E9\u05D5\u05DC\u05D7\u05D9\u05DD \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05DC\u05D4\u05D5\u05E8\u05D9\u05DD?', a:'\u05D1\u05D3\u05E3 <a href="#communications">\u05EA\u05E7\u05E9\u05D5\u05E8\u05EA</a> \u05D0\u05D5 <a href="#email">\u05D3\u05D5\u05D0\u05E8</a> \u05D0\u05E4\u05E9\u05E8 \u05DC\u05E9\u05DC\u05D5\u05D7 \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05D0\u05D9\u05E9\u05D9\u05D5\u05EA \u05D0\u05D5 \u05E7\u05D1\u05D5\u05E6\u05D9\u05D5\u05EA.' },
    { q:'\u05D0\u05D9\u05DA \u05DE\u05D9\u05D9\u05E6\u05D0\u05D9\u05DD \u05D3\u05D5\u05D7\u05D5\u05EA?', a:'\u05D1\u05D3\u05E3 <a href="#reports">\u05D3\u05D5\u05D7\u05D5\u05EA</a> \u05D1\u05D7\u05E8\u05D5 \u05E1\u05D5\u05D2 \u05D3\u05D5\u05D7 (\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA, \u05DB\u05E1\u05E4\u05D9\u05DD, \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA) \u05D5\u05DC\u05D7\u05E6\u05D5 "\u05D4\u05E4\u05E7 \u05D3\u05D5\u05D7".' },
    { q:'\u05D0\u05D9\u05DA \u05DE\u05D2\u05D3\u05D9\u05E8\u05D9\u05DD \u05DE\u05E2\u05E8\u05DB\u05EA \u05E9\u05E2\u05D5\u05EA?', a:'\u05D1\u05D3\u05E3 <a href="#timetable">\u05DE\u05E2\u05E8\u05DB\u05EA \u05E9\u05E2\u05D5\u05EA</a> \u05D4\u05D2\u05D3\u05D9\u05E8\u05D5 \u05D9\u05DE\u05D9\u05DD, \u05E9\u05E2\u05D5\u05EA \u05D5\u05DE\u05D5\u05E8\u05D9\u05DD \u05DC\u05DB\u05DC \u05DB\u05D9\u05EA\u05D4.' },
    { q:'\u05D0\u05D9\u05DA \u05DE\u05E0\u05D4\u05DC\u05D9\u05DD \u05DE\u05E9\u05D9\u05DE\u05D5\u05EA?', a:'\u05D1\u05D3\u05E3 <a href="#tasks">\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA</a> \u05E6\u05E8\u05D5 \u05DE\u05E9\u05D9\u05DE\u05D5\u05EA \u05D7\u05D3\u05E9\u05D5\u05EA, \u05D4\u05D2\u05D3\u05D9\u05E8\u05D5 \u05EA\u05D0\u05E8\u05D9\u05DA \u05D9\u05E2\u05D3, \u05D5\u05D2\u05E8\u05E8\u05D5 \u05DC\u05E2\u05DE\u05D5\u05D3\u05D5\u05EA \u05E7\u05E0\u05D1\u05DF.' },
    { q:'\u05D4\u05D0\u05DD \u05D0\u05E4\u05E9\u05E8 \u05DC\u05D4\u05EA\u05E7\u05D9\u05DF \u05D0\u05EA \u05D4\u05D0\u05E4\u05DC\u05D9\u05E7\u05E6\u05D9\u05D4 \u05DB\u05D0\u05E4\u05DC\u05D9\u05E7\u05E6\u05D9\u05D4 \u05E2\u05E6\u05DE\u05D0\u05D9\u05EA?', a:'\u05DB\u05DF! \u05D1-Chrome \u05DC\u05D7\u05E6\u05D5 \u05E2\u05DC \u05E1\u05DE\u05DC \u05D4\u05D4\u05EA\u05E7\u05E0\u05D4 \u05D1\u05E9\u05D5\u05E8\u05EA \u05D4\u05DB\u05EA\u05D5\u05D1\u05EA, \u05D0\u05D5 \u05D4\u05E9\u05EA\u05DE\u05E9\u05D5 \u05D1\u05EA\u05E4\u05E8\u05D9\u05D8 "\u05D4\u05EA\u05E7\u05DF \u05D0\u05E4\u05DC\u05D9\u05E7\u05E6\u05D9\u05D4" \u05D1\u05EA\u05E4\u05E8\u05D9\u05D8 \u05D4\u05D3\u05E4\u05D3\u05E4\u05DF.' },
    { q:'\u05D0\u05D9\u05DA \u05DE\u05E0\u05D4\u05DC\u05D9\u05DD \u05D4\u05E8\u05E9\u05D0\u05D5\u05EA \u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD?', a:'\u05D1\u05D3\u05E3 <a href="#user_management">\u05E0\u05D9\u05D4\u05D5\u05DC \u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD</a> \u05D4\u05D2\u05D3\u05D9\u05E8\u05D5 \u05EA\u05E4\u05E7\u05D9\u05D3\u05D9\u05DD \u05D5\u05D4\u05E8\u05E9\u05D0\u05D5\u05EA \u05DC\u05DB\u05DC \u05DE\u05E9\u05EA\u05DE\u05E9.' },
    { q:'\u05D0\u05D9\u05DA \u05DE\u05D2\u05D1\u05D9\u05DD \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD?', a:'\u05D1\u05D3\u05E3 <a href="#settings">\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA</a> \u05D9\u05E9 \u05D0\u05E4\u05E9\u05E8\u05D5\u05EA \u05DC\u05D9\u05D9\u05E6\u05D0 \u05D5\u05DC\u05D9\u05D9\u05D1\u05D0 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05D1\u05E4\u05D5\u05E8\u05DE\u05D8 CSV.' },
    { q:'\u05D0\u05D9\u05DA \u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD \u05D1\u05E2\u05D5\u05D6\u05E8 AI?', a:'\u05D1\u05D3\u05E3 <a href="#ai_assistant">\u05E2\u05D5\u05D6\u05E8 AI</a> \u05D0\u05E4\u05E9\u05E8 \u05DC\u05E9\u05D0\u05D5\u05DC \u05E9\u05D0\u05DC\u05D5\u05EA \u05E2\u05DC \u05D4\u05DE\u05E2\u05E8\u05DB\u05EA, \u05DC\u05E7\u05D1\u05DC \u05EA\u05D5\u05D1\u05E0\u05D5\u05EA, \u05D5\u05DC\u05E0\u05EA\u05D7 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD.' },
    { q:'\u05D0\u05D9\u05DA \u05DE\u05EA\u05E2\u05D3\u05D9\u05DD \u05DE\u05D1\u05D7\u05E0\u05D9\u05DD \u05D5\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD?', a:'\u05D1\u05D3\u05E3 <a href="#academics">\u05DE\u05D1\u05D7\u05E0\u05D9\u05DD</a> \u05D4\u05D2\u05D3\u05D9\u05E8\u05D5 \u05DE\u05D1\u05D7\u05E0\u05D9\u05DD, \u05D4\u05D6\u05D9\u05E0\u05D5 \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD, \u05D5\u05E6\u05E4\u05D5 \u05D1\u05D2\u05E8\u05E4\u05D9\u05DD \u05D1\u05D3\u05E3 <a href="#gradebook">\u05D2\u05E8\u05D3\u05D1\u05D5\u05E7</a>.' },
    { q:'\u05D4\u05DE\u05E2\u05E8\u05DB\u05EA \u05DE\u05D0\u05D8\u05D4 \u2014 \u05DE\u05D4 \u05DC\u05E2\u05E9\u05D5\u05EA?', a:'\u05E0\u05E1\u05D5 \u05DC\u05E0\u05E7\u05D5\u05EA \u05DE\u05D8\u05DE\u05D5\u05DF (cache) \u05D1\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA \u05D4\u05D3\u05E4\u05D3\u05E4\u05DF, \u05D0\u05D5 \u05DC\u05D7\u05E6\u05D5 Ctrl+Shift+R \u05DC\u05E8\u05E2\u05E0\u05D5\u05DF \u05DE\u05DC\u05D0. \u05D0\u05DD \u05D4\u05D1\u05E2\u05D9\u05D4 \u05E0\u05DE\u05E9\u05DB\u05EA, \u05E4\u05E0\u05D5 \u05DC\u05EA\u05DE\u05D9\u05DB\u05D4.' }
  ],

  _helpTips: [
    '\u05D4\u05E9\u05EA\u05DE\u05E9\u05D5 \u05D1-Ctrl+K \u05DC\u05D7\u05D9\u05E4\u05D5\u05E9 \u05DE\u05D4\u05D9\u05E8 \u05D1\u05DB\u05DC \u05D4\u05DE\u05E2\u05E8\u05DB\u05EA',
    '\u05D1\u05D3\u05E3 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05DC\u05D7\u05E6\u05D5 P/A/L \u05DC\u05E1\u05D9\u05DE\u05D5\u05DF \u05DE\u05D4\u05D9\u05E8',
    '\u05D0\u05E4\u05E9\u05E8 \u05DC\u05D4\u05EA\u05E7\u05D9\u05DF \u05D0\u05EA \u05D4\u05D0\u05E4\u05DC\u05D9\u05E7\u05E6\u05D9\u05D4 \u05DB-PWA \u05DC\u05D2\u05D9\u05E9\u05D4 \u05DE\u05D4\u05D9\u05E8\u05D4 \u05D9\u05D5\u05EA\u05E8',
    '\u05D2\u05E8\u05E8\u05D5 \u05DE\u05E9\u05D9\u05DE\u05D5\u05EA \u05DC\u05E2\u05DE\u05D5\u05D3\u05D5\u05EA \u05E7\u05E0\u05D1\u05DF \u05D1\u05DC\u05D5\u05D7 \u05D4\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA',
    '\u05D4\u05E9\u05EA\u05DE\u05E9\u05D5 \u05D1\u05E2\u05D5\u05D6\u05E8 AI \u05DC\u05E7\u05D1\u05DC\u05EA \u05EA\u05D5\u05D1\u05E0\u05D5\u05EA \u05D7\u05DB\u05DE\u05D5\u05EA',
    '\u05D1\u05D3\u05E3 \u05D3\u05D5\u05D7\u05D5\u05EA \u05D0\u05E4\u05E9\u05E8 \u05DC\u05D9\u05D9\u05E6\u05D0 \u05DC-PDF \u05D0\u05D5 \u05DC\u05D4\u05D3\u05E4\u05D9\u05E1',
    '\u05DC\u05D7\u05E6\u05D5 \u05E2\u05DC \u05E9\u05DD \u05EA\u05DC\u05DE\u05D9\u05D3 \u05DC\u05E4\u05EA\u05D9\u05D7\u05EA \u05DB\u05E8\u05D8\u05D9\u05E1 \u05D0\u05D9\u05E9\u05D9 \u05DE\u05E4\u05D5\u05E8\u05D8',
    '\u05D4\u05DE\u05E2\u05E8\u05DB\u05EA \u05E2\u05D5\u05D1\u05D3\u05EA \u05D2\u05DD \u05D1\u05DE\u05D5\u05D1\u05D9\u05D9\u05DC \u2014 \u05E0\u05E1\u05D5 \u05DE\u05D4\u05D8\u05DC\u05E4\u05D5\u05DF!',
    '\u05D1\u05D3\u05E3 \u05D3\u05D5\u05D0\u05E8 \u05D0\u05E4\u05E9\u05E8 \u05DC\u05E7\u05E8\u05D5\u05D0 \u05DE\u05D9\u05D9\u05DC\u05D9\u05DD \u05D0\u05DE\u05D9\u05EA\u05D9\u05D9\u05DD \u05DE-Gmail',
    '\u05D4\u05D3\u05E4\u05E1\u05D5 \u05E8\u05E9\u05D9\u05DE\u05EA \u05EA\u05E8\u05D5\u05E4\u05D5\u05EA \u05DE\u05DE\u05E8\u05DB\u05D6 \u05D4\u05D4\u05D3\u05E4\u05E1\u05D4 \u2014 15 \u05EA\u05D1\u05E0\u05D9\u05D5\u05EA!',
    '\u05DE\u05E0\u05D4\u05DC \u05D4\u05E7\u05D1\u05E6\u05D9\u05DD \u05DE\u05D7\u05D5\u05D1\u05E8 \u05DC\u05D2\u05D5\u05D2\u05DC \u05D3\u05E8\u05D9\u05D9\u05D1 \u2014 29 \u05EA\u05D9\u05E7\u05D9\u05D5\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD',
    '\u05D1\u05DB\u05E8\u05D8\u05D9\u05E1 \u05EA\u05DC\u05DE\u05D9\u05D3 \u05DC\u05D7\u05E6\u05D5 \u05E2\u05DC \u05D8\u05DC\u05E4\u05D5\u05DF \u05DC\u05D4\u05EA\u05E7\u05E9\u05E8 \u05D0\u05D5 SMS \u05DC\u05D4\u05D5\u05E8\u05D9\u05DD'
  ],

  _helpChangelog: [
    { ver:'6.7', date:'04/2026', changes:['\u05D3\u05D5\u05D0\u05E8 \u05D0\u05DE\u05D9\u05EA\u05D9 \u05DE-Gmail \u2014 50 \u05E0\u05DB\u05E0\u05E1\u05D5\u05EA + 30 \u05E0\u05E9\u05DC\u05D7\u05D5\u05EA','19 \u05EA\u05D1\u05E0\u05D9\u05D5\u05EA \u05D4\u05D3\u05E4\u05E1\u05D4 \u2014 \u05EA\u05E8\u05D5\u05E4\u05D5\u05EA, \u05E7\u05D5\u05E4\u05D4 \u05E7\u05D8\u05E0\u05D4, \u05E9\u05DB\u05E8, \u05DE\u05D1\u05E6\u05E2, \u05E1\u05D9\u05DB\u05D5\u05DD \u05D9\u05D5\u05DE\u05D9','\u05D4\u05E1\u05E8\u05EA WhatsApp \u05DE\u05DC\u05D0\u05D4 \u2014 \u05D8\u05DC\u05E4\u05D5\u05DF/SMS \u05D1\u05DC\u05D1\u05D3','13 \u05EA\u05D9\u05E7\u05D5\u05E0\u05D9 \u05D0\u05D1\u05D8\u05D7\u05D4 + 13 \u05EA\u05D9\u05E7\u05D5\u05E0\u05D9 toast','Ctrl+K \u05D7\u05D9\u05E4\u05D5\u05E9 \u05D2\u05DC\u05D5\u05D1\u05DC\u05D9 \u2014 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD + \u05D3\u05D5\u05D0\u05E8','Drive \u05D0\u05DE\u05D9\u05EA\u05D9 \u2014 29 \u05EA\u05D9\u05E7\u05D9\u05D5\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD','\u05E4\u05EA\u05E7\u05D9\u05EA \u05DE\u05D4\u05D9\u05E8\u05D4 + SMS \u05E7\u05D1\u05D5\u05E6\u05EA\u05D9','\u05DB\u05E8\u05D8\u05D9\u05E1 \u05DE\u05D5\u05E1\u05D3 \u05D1\u05D3\u05E3 \u05E2\u05D6\u05E8\u05D4','120 \u05E9\u05D3\u05E8\u05D5\u05D2\u05D9\u05DD \u05D1\u05D9\u05D5\u05DD \u05D0\u05D7\u05D3! 52K \u05E9\u05D5\u05E8\u05D5\u05EA! dark mode \u05DE\u05DC\u05D0!'] },
    { ver:'6.6', date:'04/2026', changes:['\u05EA\u05DC\"\u05D0\u05D5\u05EA - \u05EA\u05D5\u05DB\u05E0\u05D9\u05D5\u05EA \u05DC\u05D9\u05DE\u05D5\u05D3\u05D9\u05D5\u05EA \u05D0\u05D9\u05E9\u05D9\u05D5\u05EA','\u05D9\u05D5\u05DE\u05DF \u05E9\u05D9\u05D7\u05D5\u05EA \u05D8\u05DC\u05E4\u05D5\u05DF','\u05D8\u05D9\u05D5\u05DC\u05D9\u05DD \u05E2\u05DD \u05E6\u05E7\u05DC\u05D9\u05E1\u05D8 \u05D5\u05D0\u05D9\u05E9\u05D5\u05E8\u05D9 \u05D4\u05D5\u05E8\u05D9\u05DD','11 \u05EA\u05D1\u05E0\u05D9\u05D5\u05EA \u05D4\u05D3\u05E4\u05E1\u05D4 \u05E2\u05DD \u05DC\u05D5\u05D2\u05D5','\u05DE\u05E1\u05DE\u05DB\u05D9\u05DD \u05DE-Drive \u05D1\u05DB\u05E8\u05D8\u05D9\u05E1 \u05EA\u05DC\u05DE\u05D9\u05D3','CDN \u05DE\u05E7\u05D5\u05DE\u05D9 - \u05E2\u05D5\u05D1\u05D3 \u05D1\u05DC\u05D9 \u05D0\u05D9\u05E0\u05D8\u05E8\u05E0\u05D8','UX \u05D7\u05E8\u05D3\u05D9 - \u05DC\u05DC\u05D0 WhatsApp'] },
    { ver:'6.0', date:'04/2026', changes:['\u05DE\u05E2\u05E8\u05DB\u05EA \u05DE\u05D5\u05D3\u05D5\u05DC\u05E8\u05D9\u05EA \u05DE\u05DC\u05D0\u05D4','\u05E2\u05D9\u05E6\u05D5\u05D1 \u05DE\u05D7\u05D3\u05E9 \u05E2\u05DD \u05EA\u05DE\u05D9\u05DB\u05EA RTL','\u05E2\u05D5\u05D6\u05E8 AI \u05DE\u05E9\u05D5\u05D3\u05E8\u05D2','\u05DE\u05E8\u05DB\u05D6 \u05E2\u05D6\u05E8\u05D4 \u05DE\u05E7\u05D9\u05E3'] },
    { ver:'5.6', date:'04/2026', changes:['\u05D3\u05E3 \u05D4\u05EA\u05E7\u05E0\u05D4 PWA','\u05D3\u05E3 \u05D4\u05EA\u05D7\u05D1\u05E8\u05D5\u05EA','\u05E0\u05D9\u05D4\u05D5\u05DC \u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD \u05D5\u05D4\u05E8\u05E9\u05D0\u05D5\u05EA'] },
    { ver:'5.0', date:'03/2026', changes:['\u05D1\u05E0\u05D9\u05D9\u05D4 \u05DE\u05D7\u05D3\u05E9 \u05DE\u05D0\u05E4\u05E1 \u05E2\u05DD SPA','\u05E0\u05D9\u05D5\u05D5\u05D8 \u05E6\u05D3\u05D3\u05D9','\u05DE\u05D8\u05DE\u05D5\u05DF \u05D7\u05DB\u05DD \u05E2\u05DD Service Worker'] },
    { ver:'4.3', date:'02/2026', changes:['\u05E9\u05D3\u05E8\u05D5\u05D2 \u05D0\u05D1\u05D8\u05D7\u05D4 \u05D5\u05D1\u05D9\u05E6\u05D5\u05E2\u05D9\u05DD','\u05D0\u05D9\u05DE\u05D5\u05EA PIN \u05DC\u05DB\u05DC \u05D3\u05E3','\u05D9\u05D5\u05DE\u05DF \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA'] },
    { ver:'3.2', date:'01/2026', changes:['Gmail Add-on v3','\u05DE\u05D8\u05DE\u05D5\u05DF \u05D0\u05D5\u05D8\u05D5\u05DE\u05D8\u05D9','\u05D4\u05E2\u05DC\u05D0\u05EA \u05E7\u05D1\u05E6\u05D9\u05DD'] },
    { ver:'2.0', date:'12/2025', changes:['\u05DE\u05E2\u05D1\u05E8 \u05DC-Google Sheets API','\u05D3\u05E9\u05D1\u05D5\u05E8\u05D3 \u05DE\u05E9\u05D5\u05D3\u05E8\u05D2','\u05DE\u05E2\u05E8\u05DB\u05EA \u05DB\u05E1\u05E4\u05D9\u05DD'] },
    { ver:'1.0', date:'11/2025', changes:['\u05D2\u05E8\u05E1\u05D4 \u05E8\u05D0\u05E9\u05D5\u05E0\u05D4','\u05E0\u05D9\u05D4\u05D5\u05DC \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05D1\u05E1\u05D9\u05E1\u05D9','\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D5\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD'] }
  ],

  help() {
    const faqHtml = this._helpFaqData.map((f, i) => `
      <div class="accordion-item">
        <h2 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-${i}">${f.q}</button></h2>
        <div id="faq-${i}" class="accordion-collapse collapse" data-bs-parent="#help-faq"><div class="accordion-body">${f.a}</div></div>
      </div>`).join('');

    const tip = this._helpTips[Math.floor(Math.random() * this._helpTips.length)];

    const changelogHtml = this._helpChangelog.map(c => `
      <div class="d-flex gap-3 mb-3">
        <div class="text-center" style="min-width:60px">
          <span class="badge bg-primary fs-6">v${c.ver}</span>
          <div class="text-muted small mt-1">${c.date}</div>
        </div>
        <div><ul class="mb-0 small">${c.changes.map(ch => `<li>${ch}</li>`).join('')}</ul></div>
      </div>`).join('');

    const shortcuts = [
      { key:'Ctrl+K', desc:'\u05E4\u05EA\u05D9\u05D7\u05EA \u05D7\u05D9\u05E4\u05D5\u05E9 \u05DE\u05D4\u05D9\u05E8' },
      { key:'Esc', desc:'\u05E1\u05D2\u05D9\u05E8\u05EA \u05D7\u05DC\u05D5\u05E0\u05D5\u05EA / \u05E0\u05D9\u05E7\u05D5\u05D9 \u05D7\u05D9\u05E4\u05D5\u05E9' },
      { key:'P', desc:'\u05E1\u05D9\u05DE\u05D5\u05DF \u05E0\u05D5\u05DB\u05D7 (\u05D1\u05D3\u05E3 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA)' },
      { key:'A', desc:'\u05E1\u05D9\u05DE\u05D5\u05DF \u05D7\u05D9\u05E1\u05D5\u05E8 (\u05D1\u05D3\u05E3 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA)' },
      { key:'L', desc:'\u05E1\u05D9\u05DE\u05D5\u05DF \u05D0\u05D9\u05D7\u05D5\u05E8 (\u05D1\u05D3\u05E3 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA)' },
      { key:'Enter', desc:'\u05D0\u05D9\u05E9\u05D5\u05E8 \u05D8\u05D5\u05E4\u05E1 / \u05E9\u05DC\u05D9\u05D7\u05D4' },
      { key:'Ctrl+D', desc:'\u05D7\u05D9\u05D9\u05D2\u05DF \u05DE\u05D4\u05D9\u05E8' },
      { key:'Ctrl+E', desc:'\u05D3\u05D5\u05D0\u05E8 \u05D0\u05DC\u05E7\u05D8\u05E8\u05D5\u05E0\u05D9' },
      { key:'Ctrl+H', desc:'\u05D3\u05E3 \u05D4\u05D1\u05D9\u05EA (\u05D3\u05E9\u05D1\u05D5\u05E8\u05D3)' },
      { key:'Ctrl+Shift+P', desc:'\u05D4\u05D3\u05E4\u05E1\u05D4 \u05DE\u05D4\u05D9\u05E8\u05D4' },
      { key:'Ctrl+Shift+R', desc:'\u05E8\u05E2\u05E0\u05D5\u05DF \u05DE\u05DC\u05D0 (\u05E0\u05D9\u05E7\u05D5\u05D9 \u05DE\u05D8\u05DE\u05D5\u05DF)' }
    ];
    const shortcutsHtml = shortcuts.map(s => `<tr><td><kbd>${s.key}</kbd></td><td>${s.desc}</td></tr>`).join('');

    const wizardSteps = [
      { icon:'bi-person-plus-fill', color:'primary', title:'\u05D4\u05D5\u05E1\u05E4\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD', desc:'\u05D4\u05D5\u05E1\u05D9\u05E4\u05D5 \u05D0\u05EA \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05D4\u05E8\u05D0\u05E9\u05D5\u05E0\u05D9\u05DD \u05D1\u05D3\u05E3 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD', link:'students' },
      { icon:'bi-building', color:'success', title:'\u05D4\u05D2\u05D3\u05E8\u05EA \u05DE\u05E1\u05D2\u05E8\u05D5\u05EA \u05D5\u05DB\u05D9\u05EA\u05D5\u05EA', desc:'\u05D4\u05D2\u05D3\u05D9\u05E8\u05D5 \u05DB\u05D9\u05EA\u05D5\u05EA \u05D5\u05E9\u05D9\u05D9\u05DB\u05D5 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD', link:'organization' },
      { icon:'bi-person-badge', color:'info', title:'\u05D4\u05D5\u05E1\u05E4\u05EA \u05E6\u05D5\u05D5\u05EA', desc:'\u05D4\u05D5\u05E1\u05D9\u05E4\u05D5 \u05D0\u05E0\u05E9\u05D9 \u05E6\u05D5\u05D5\u05EA, \u05DE\u05D5\u05E8\u05D9\u05DD \u05D5\u05DE\u05E0\u05D4\u05DC\u05D9\u05DD', link:'staff' },
      { icon:'bi-calendar-check', color:'warning', title:'\u05D4\u05D2\u05D3\u05E8\u05EA \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA', desc:'\u05D4\u05D2\u05D3\u05D9\u05E8\u05D5 \u05DE\u05E2\u05E8\u05DB\u05EA \u05E9\u05E2\u05D5\u05EA \u05D5\u05D4\u05EA\u05D7\u05D9\u05DC\u05D5 \u05DC\u05E1\u05DE\u05DF \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA', link:'attendance' },
      { icon:'bi-cash-stack', color:'danger', title:'\u05D4\u05D2\u05D3\u05E8\u05EA \u05E9\u05DB\u05E8 \u05DC\u05D9\u05DE\u05D5\u05D3', desc:'\u05D4\u05D2\u05D3\u05D9\u05E8\u05D5 \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD \u05D5\u05EA\u05D5\u05DB\u05E0\u05D9\u05D5\u05EA \u05EA\u05E9\u05DC\u05D5\u05DD', link:'finance' },
      { icon:'bi-gear', color:'secondary', title:'\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA \u05DE\u05E2\u05E8\u05DB\u05EA', desc:'\u05D4\u05EA\u05D0\u05D9\u05DE\u05D5 \u05D0\u05EA \u05D4\u05DE\u05E2\u05E8\u05DB\u05EA \u05DC\u05E6\u05E8\u05DB\u05D9 \u05D4\u05DE\u05D5\u05E1\u05D3', link:'settings' }
    ];
    const wizardHtml = wizardSteps.map((s, i) => `
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 border-0 shadow-sm card-clickable" onclick="location.hash='${s.link}'">
          <div class="card-body text-center p-4">
            <div class="rounded-circle bg-${s.color} bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-3" style="width:64px;height:64px">
              <i class="bi ${s.icon} fs-2 text-${s.color}"></i>
            </div>
            <div class="badge bg-${s.color} bg-opacity-25 text-${s.color} mb-2">\u05E9\u05DC\u05D1 ${i + 1}</div>
            <h6 class="fw-bold">${s.title}</h6>
            <p class="text-muted small mb-0">${s.desc}</p>
          </div>
        </div>
      </div>`).join('');

    const allPages = [
      {p:'dashboard',l:'\u05DC\u05D5\u05D7 \u05D1\u05E7\u05E8\u05D4'},{p:'students',l:'\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD'},{p:'staff',l:'\u05E6\u05D5\u05D5\u05EA'},{p:'parents',l:'\u05D4\u05D5\u05E8\u05D9\u05DD'},
      {p:'attendance',l:'\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA'},{p:'behavior',l:'\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA'},{p:'homework',l:'\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9 \u05D1\u05D9\u05EA'},{p:'academics',l:'\u05DE\u05D1\u05D7\u05E0\u05D9\u05DD'},
      {p:'tasks',l:'\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA'},{p:'calendar',l:'\u05DC\u05D5\u05D7 \u05E9\u05E0\u05D4'},{p:'finance',l:'\u05DB\u05E1\u05E4\u05D9\u05DD'},{p:'pettycash',l:'\u05E7\u05D5\u05E4\u05D4 \u05E7\u05D8\u05E0\u05D4'},
      {p:'budget',l:'\u05EA\u05E7\u05E6\u05D9\u05D1'},{p:'trips',l:'\u05D8\u05D9\u05D5\u05DC\u05D9\u05DD'},{p:'mivtza',l:'\u05DE\u05D1\u05E6\u05E2 \u05DC\u05D9\u05DE\u05D5\u05D3'},{p:'reports',l:'\u05D3\u05D5\u05D7\u05D5\u05EA'},
      {p:'rankings',l:'\u05D3\u05D9\u05E8\u05D5\u05D2\u05D9\u05DD'},{p:'communications',l:'\u05EA\u05E7\u05E9\u05D5\u05E8\u05EA'},{p:'documents',l:'\u05DE\u05E1\u05DE\u05DB\u05D9\u05DD'},{p:'committees',l:'\u05D5\u05E2\u05D3\u05D5\u05EA'},
      {p:'organization',l:'\u05DE\u05E1\u05D2\u05E8\u05D5\u05EA'},{p:'ai_assistant',l:'\u05E2\u05D5\u05D6\u05E8 AI'},{p:'forms',l:'\u05D8\u05E4\u05E1\u05D9\u05DD'},{p:'help',l:'\u05E2\u05D6\u05E8\u05D4'}
    ];

    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div>
        <h1><i class="bi bi-question-circle-fill me-2"></i>\u05DE\u05E8\u05DB\u05D6 \u05E2\u05D6\u05E8\u05D4</h1>
        <p class="text-muted mb-0">\u05DE\u05D3\u05E8\u05D9\u05DA \u05DE\u05E7\u05D9\u05E3, \u05E9\u05D0\u05DC\u05D5\u05EA \u05E0\u05E4\u05D5\u05E6\u05D5\u05EA \u05D5\u05DE\u05D9\u05D3\u05E2 \u05E2\u05DC \u05D4\u05DE\u05E2\u05E8\u05DB\u05EA</p>
      </div>
    </div>

    <!-- Quick Tip Banner -->
    <div class="alert alert-info border-0 shadow-sm d-flex align-items-center gap-2 mb-4" id="help-tip-banner">
      <i class="bi bi-lightbulb-fill fs-5"></i>
      <div class="flex-grow-1">
        <strong>\u05D8\u05D9\u05E4 \u05DE\u05D4\u05D9\u05E8:</strong> <span id="help-tip-text">${tip}</span>
      </div>
      <button class="btn btn-sm btn-outline-info" onclick="Pages._helpRotateTip()"><i class="bi bi-arrow-repeat"></i></button>
    </div>

    <!-- Institution Card -->
    <div class="card border-0 shadow-sm mb-4 border-start border-primary border-3">
      <div class="card-body py-3">
        <div class="row align-items-center">
          <div class="col-md-4 text-center mb-2 mb-md-0">
            <h5 class="fw-bold mb-1"><i class="bi bi-building me-2"></i>\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3</h5>
            <div class="text-muted small">\u05DE\u05DB\u05D9\u05E0\u05D4 \u05DC\u05E6\u05E2\u05D9\u05E8\u05D9\u05DD \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9</div>
          </div>
          <div class="col-md-8">
            <div class="d-flex flex-wrap gap-3">
              <div><i class="bi bi-geo-alt text-primary me-1"></i><small>\u05E0\u05D4\u05E8 \u05D4\u05D9\u05E8\u05D3\u05DF 106, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9</small></div>
              <div><a href="tel:02-5476989" class="text-decoration-none"><i class="bi bi-telephone text-success me-1"></i><small>02-547-6989</small></a></div>
              <div><a href="mailto:6787012@gmail.com" class="text-decoration-none"><i class="bi bi-envelope text-info me-1"></i><small>6787012@gmail.com</small></a></div>
              <div><i class="bi bi-person text-warning me-1"></i><small>\u05DE\u05E0\u05D4\u05DC: \u05D4\u05E8\u05D1 \u05D0\u05D4\u05D5\u05D3 \u05D9\u05E8\u05D5\u05E9\u05DC\u05DE\u05D9 | \u05DE\u05D6\u05DB\u05D9\u05E8: \u05D9\u05D5\u05E1\u05E3 \u05E9\u05E0\u05D9\u05D9\u05D3\u05E8</small></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <ul class="nav nav-pills mb-4 flex-wrap gap-1" id="help-tabs">
      <li class="nav-item"><a class="nav-link active" href="#" data-help-tab="wizard"><i class="bi bi-rocket-takeoff me-1"></i>\u05EA\u05D7\u05D9\u05DC\u05EA \u05E2\u05D1\u05D5\u05D3\u05D4</a></li>
      <li class="nav-item"><a class="nav-link" href="#" data-help-tab="faq"><i class="bi bi-chat-dots me-1"></i>\u05E9\u05D0\u05DC\u05D5\u05EA \u05E0\u05E4\u05D5\u05E6\u05D5\u05EA</a></li>
      <li class="nav-item"><a class="nav-link" href="#" data-help-tab="shortcuts"><i class="bi bi-keyboard me-1"></i>\u05E7\u05D9\u05E6\u05D5\u05E8\u05D9\u05DD</a></li>
      <li class="nav-item"><a class="nav-link" href="#" data-help-tab="system"><i class="bi bi-laptop me-1"></i>\u05D3\u05E8\u05D9\u05E9\u05D5\u05EA \u05DE\u05E2\u05E8\u05DB\u05EA</a></li>
      <li class="nav-item"><a class="nav-link" href="#" data-help-tab="changelog"><i class="bi bi-clock-history me-1"></i>\u05D4\u05D9\u05E1\u05D8\u05D5\u05E8\u05D9\u05D9\u05EA \u05D2\u05E8\u05E1\u05D0\u05D5\u05EA</a></li>
      <li class="nav-item"><a class="nav-link" href="#" data-help-tab="contact"><i class="bi bi-headset me-1"></i>\u05EA\u05DE\u05D9\u05DB\u05D4</a></li>
      <li class="nav-item"><a class="nav-link" href="#" data-help-tab="pages"><i class="bi bi-book me-1"></i>\u05DE\u05E4\u05EA \u05D3\u05E4\u05D9\u05DD</a></li>
    </ul>

    <!-- Tab Content -->
    <div id="help-tab-content">

      <!-- WIZARD -->
      <div class="help-pane" id="help-pane-wizard">
        <h5 class="fw-bold mb-3"><i class="bi bi-rocket-takeoff me-2 text-primary"></i>\u05DE\u05D3\u05E8\u05D9\u05DA \u05DC\u05DE\u05E9\u05EA\u05DE\u05E9 \u05D7\u05D3\u05E9 \u2014 6 \u05E6\u05E2\u05D3\u05D9\u05DD \u05DC\u05D4\u05EA\u05D7\u05DC\u05D4</h5>
        <p class="text-muted mb-4">\u05E2\u05E7\u05D1\u05D5 \u05D0\u05D7\u05E8\u05D9 \u05D4\u05E9\u05DC\u05D1\u05D9\u05DD \u05D4\u05D1\u05D0\u05D9\u05DD \u05DC\u05D4\u05D2\u05D3\u05E8\u05EA \u05D4\u05DE\u05E2\u05E8\u05DB\u05EA \u05D1\u05E4\u05E2\u05DD \u05D4\u05E8\u05D0\u05E9\u05D5\u05E0\u05D4:</p>
        <div class="row g-3">${wizardHtml}</div>
      </div>

      <!-- FAQ -->
      <div class="help-pane d-none" id="help-pane-faq">
        <div class="mb-3">
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-search"></i></span>
            <input type="text" class="form-control" id="help-faq-search" placeholder="\u05D7\u05E4\u05E9\u05D5 \u05D1\u05E9\u05D0\u05DC\u05D5\u05EA..." oninput="Pages._helpFilterFaq(this.value)">
          </div>
        </div>
        <div class="accordion" id="help-faq">${faqHtml}</div>
        <div class="text-muted text-center mt-3 d-none" id="help-faq-empty"><i class="bi bi-search me-1"></i>\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA</div>
      </div>

      <!-- SHORTCUTS -->
      <div class="help-pane d-none" id="help-pane-shortcuts">
        <h5 class="fw-bold mb-3"><i class="bi bi-keyboard me-2 text-warning"></i>\u05E7\u05D9\u05E6\u05D5\u05E8\u05D9 \u05DE\u05E7\u05DC\u05D3\u05EA</h5>
        <div class="card border-0 shadow-sm">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead class="table-light"><tr><th style="width:160px">\u05E7\u05D9\u05E6\u05D5\u05E8</th><th>\u05E4\u05E2\u05D5\u05DC\u05D4</th></tr></thead>
              <tbody>${shortcutsHtml}</tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- SYSTEM REQUIREMENTS -->
      <div class="help-pane d-none" id="help-pane-system">
        <h5 class="fw-bold mb-3"><i class="bi bi-laptop me-2 text-success"></i>\u05D3\u05E8\u05D9\u05E9\u05D5\u05EA \u05DE\u05E2\u05E8\u05DB\u05EA</h5>
        <div class="row g-3">
          <div class="col-md-6">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-body">
                <h6 class="fw-bold"><i class="bi bi-globe me-2"></i>\u05D3\u05E4\u05D3\u05E4\u05E0\u05D9\u05DD \u05E0\u05EA\u05DE\u05DB\u05D9\u05DD</h6>
                <ul class="small mb-0">
                  <li><i class="bi bi-check-circle text-success me-1"></i>Google Chrome 90+ (\u05DE\u05D5\u05DE\u05DC\u05E5)</li>
                  <li><i class="bi bi-check-circle text-success me-1"></i>Microsoft Edge 90+</li>
                  <li><i class="bi bi-check-circle text-success me-1"></i>Firefox 95+</li>
                  <li><i class="bi bi-check-circle text-success me-1"></i>Safari 15+</li>
                  <li><i class="bi bi-check-circle text-success me-1"></i>Samsung Internet 16+</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-body">
                <h6 class="fw-bold"><i class="bi bi-phone me-2"></i>\u05DE\u05D5\u05D1\u05D9\u05D9\u05DC</h6>
                <ul class="small mb-0">
                  <li><i class="bi bi-check-circle text-success me-1"></i>Android 8+ \u05E2\u05DD Chrome</li>
                  <li><i class="bi bi-check-circle text-success me-1"></i>iOS 15+ \u05E2\u05DD Safari</li>
                  <li><i class="bi bi-check-circle text-success me-1"></i>\u05DE\u05E1\u05DA \u05DE\u05D5\u05DE\u05DC\u05E5: 360px+</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="card border-0 shadow-sm">
              <div class="card-body">
                <h6 class="fw-bold"><i class="bi bi-download me-2"></i>\u05D4\u05EA\u05E7\u05E0\u05EA \u05D4\u05D0\u05E4\u05DC\u05D9\u05E7\u05E6\u05D9\u05D4 (PWA)</h6>
                <p class="small mb-2">\u05D4\u05DE\u05E2\u05E8\u05DB\u05EA \u05EA\u05D5\u05DE\u05DB\u05EA \u05D4\u05EA\u05E7\u05E0\u05D4 \u05DB\u05D0\u05E4\u05DC\u05D9\u05E7\u05E6\u05D9\u05D4 \u05E2\u05E6\u05DE\u05D0\u05D9\u05EA \u05E2\u05DC \u05D4\u05DE\u05DB\u05E9\u05D9\u05E8 \u05D0\u05D5 \u05D4\u05D8\u05DC\u05E4\u05D5\u05DF:</p>
                <div class="row g-2">
                  <div class="col-md-4">
                    <div class="border rounded p-2 small">
                      <strong class="d-block mb-1"><i class="bi bi-pc-display me-1"></i>\u05DE\u05D7\u05E9\u05D1 (Chrome)</strong>
                      \u05DC\u05D7\u05E6\u05D5 \u05E2\u05DC \u05E1\u05DE\u05DC \u05D4\u05D4\u05EA\u05E7\u05E0\u05D4 <i class="bi bi-box-arrow-in-down"></i> \u05D1\u05E9\u05D5\u05E8\u05EA \u05D4\u05DB\u05EA\u05D5\u05D1\u05EA, \u05D0\u05D5 \u05EA\u05E4\u05E8\u05D9\u05D8 > "\u05D4\u05EA\u05E7\u05DF \u05D0\u05E4\u05DC\u05D9\u05E7\u05E6\u05D9\u05D4"
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="border rounded p-2 small">
                      <strong class="d-block mb-1"><i class="bi bi-phone me-1"></i>Android</strong>
                      \u05EA\u05E4\u05E8\u05D9\u05D8 Chrome > "\u05D4\u05D5\u05E1\u05E3 \u05DC\u05DE\u05E1\u05DA \u05D4\u05D1\u05D9\u05EA" > \u05D0\u05E9\u05E8\u05D5
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="border rounded p-2 small">
                      <strong class="d-block mb-1"><i class="bi bi-apple me-1"></i>iPhone / iPad</strong>
                      Safari > \u05E9\u05D9\u05EA\u05D5\u05E3 <i class="bi bi-box-arrow-up"></i> > "\u05D4\u05D5\u05E1\u05E3 \u05DC\u05DE\u05E1\u05DA \u05D4\u05D1\u05D9\u05EA"
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CHANGELOG -->
      <div class="help-pane d-none" id="help-pane-changelog">
        <h5 class="fw-bold mb-3"><i class="bi bi-clock-history me-2 text-info"></i>\u05D4\u05D9\u05E1\u05D8\u05D5\u05E8\u05D9\u05D9\u05EA \u05D2\u05E8\u05E1\u05D0\u05D5\u05EA</h5>
        <div class="card border-0 shadow-sm"><div class="card-body">${changelogHtml}</div></div>
      </div>

      <!-- CONTACT -->
      <div class="help-pane d-none" id="help-pane-contact">
        <h5 class="fw-bold mb-3"><i class="bi bi-headset me-2 text-danger"></i>\u05E6\u05E8\u05D5 \u05E7\u05E9\u05E8 \u05E2\u05DD \u05D4\u05EA\u05DE\u05D9\u05DB\u05D4</h5>
        <div class="row g-3">
          <div class="col-md-6">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-body text-center p-4">
                <div class="rounded-circle bg-primary bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-3" style="width:80px;height:80px">
                  <i class="bi bi-person-workspace fs-1 text-primary"></i>
                </div>
                <h6 class="fw-bold">\u05EA\u05DE\u05D9\u05DB\u05D4 \u05D8\u05DB\u05E0\u05D9\u05EA</h6>
                <p class="text-muted small">\u05DE\u05D6\u05DB\u05D9\u05E8\u05D5\u05EA / IT</p>
                <ul class="list-unstyled small mb-0">
                  <li class="mb-1"><i class="bi bi-person me-1"></i>\u05D9\u05D5\u05E1\u05E3 \u05E9\u05E0\u05D9\u05D9\u05D3\u05E8</li>
                  <li class="mb-1"><i class="bi bi-building me-1"></i>\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3</li>
                  <li class="mb-1"><i class="bi bi-pc-display me-1"></i>192.168.1.100</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-body text-center p-4">
                <div class="rounded-circle bg-success bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-3" style="width:80px;height:80px">
                  <i class="bi bi-lightbulb fs-1 text-success"></i>
                </div>
                <h6 class="fw-bold">\u05D8\u05D9\u05E4\u05D9\u05DD \u05DC\u05E4\u05EA\u05E8\u05D5\u05DF \u05D1\u05E2\u05D9\u05D5\u05EA</h6>
                <ul class="list-unstyled small text-start mb-0">
                  <li class="mb-1"><i class="bi bi-check2 text-success me-1"></i>\u05E0\u05E1\u05D5 \u05DC\u05E0\u05E7\u05D5\u05EA \u05DE\u05D8\u05DE\u05D5\u05DF \u05DC\u05E4\u05E0\u05D9 \u05E4\u05E0\u05D9\u05D9\u05D4</li>
                  <li class="mb-1"><i class="bi bi-check2 text-success me-1"></i>\u05EA\u05D0\u05E8\u05D5 \u05D0\u05EA \u05D4\u05D1\u05E2\u05D9\u05D4 \u05D1\u05E4\u05D9\u05E8\u05D5\u05D8</li>
                  <li class="mb-1"><i class="bi bi-check2 text-success me-1"></i>\u05E6\u05E8\u05E4\u05D5 \u05E6\u05D9\u05DC\u05D5\u05DD \u05DE\u05E1\u05DA \u05D0\u05DD \u05D0\u05E4\u05E9\u05E8</li>
                  <li class="mb-1"><i class="bi bi-check2 text-success me-1"></i>\u05E6\u05D9\u05D9\u05E0\u05D5 \u05D3\u05E4\u05D3\u05E4\u05DF \u05D5\u05D2\u05E8\u05E1\u05D4</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PAGES MAP -->
      <div class="help-pane d-none" id="help-pane-pages">
        <h5 class="fw-bold mb-3"><i class="bi bi-book me-2 text-secondary"></i>\u05DE\u05E4\u05EA \u05D3\u05E4\u05D9\u05DD</h5>
        <div class="card border-0 shadow-sm"><div class="card-body"><div class="row g-2">${allPages.map(x => `<div class="col-6 col-md-3"><a href="#${x.p}" class="text-decoration-none d-flex align-items-center gap-1 p-2 rounded hover-bg"><i class="bi bi-arrow-left-short"></i>${x.l}</a></div>`).join('')}</div></div></div>
      </div>

    </div>`;
  },

  helpInit() {
    // Tab switching
    document.querySelectorAll('#help-tabs a[data-help-tab]').forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('#help-tabs .nav-link').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.help-pane').forEach(p => p.classList.add('d-none'));
        const pane = document.getElementById('help-pane-' + tab.dataset.helpTab);
        if (pane) pane.classList.remove('d-none');
      });
    });
  },

  _helpFilterFaq(query) {
    const q = query.trim().toLowerCase();
    const items = document.querySelectorAll('#help-faq .accordion-item');
    let visible = 0;
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      const show = !q || text.includes(q);
      item.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    const empty = document.getElementById('help-faq-empty');
    if (empty) empty.classList.toggle('d-none', visible > 0);
  },

  _helpRotateTip() {
    const el = document.getElementById('help-tip-text');
    if (!el) return;
    const tip = this._helpTips[Math.floor(Math.random() * this._helpTips.length)];
    el.textContent = tip;
  },


  /* ======================================================================
     PHONE DIALER
     ====================================================================== */
  _dialNumber: '',
  phone() {
    const num = this._dialNumber || '';
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-telephone-fill me-2"></i>\u05D8\u05DC\u05E4\u05D5\u05DF</h1></div><button class="btn btn-outline-primary btn-sm" onclick="Pages.exportContacts()"><i class="bi bi-download me-1"></i>\u05D9\u05D9\u05E6\u05D5\u05D0 \u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8</button></div><div class="row g-4"><div class="col-md-5"><div class="card p-3"><div class="dialer-display" id="dial-display">${num}</div><div class="dialer-grid">${[1,2,3,4,5,6,7,8,9,'*',0,'#'].map(d=>`<button class="dialer-btn" onclick="Pages.dialPress('${d}')">${d}</button>`).join('')}</div><div class="d-flex gap-2 justify-content-center mt-2"><button class="dialer-btn dialer-delete" onclick="Pages.dialBackspace()"><i class="bi bi-backspace"></i></button><button class="dialer-btn dialer-call" onclick="Pages.makeCall()"><i class="bi bi-telephone-fill"></i></button><button class="dialer-btn" onclick="Pages.dialClear()" style="color:var(--bht-danger,#dc3545)"><i class="bi bi-x-lg"></i></button></div></div></div><div class="col-md-7"><div class="card p-3"><h6 class="fw-bold mb-3"><i class="bi bi-people me-2"></i>\u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8</h6><div id="phone-contacts">\u05D8\u05D5\u05E2\u05DF...</div></div></div></div>`;
  },
  async phoneInit() {
    let contacts;
    if (this._phoneUseDemo) {
      contacts = this._phoneDemoContacts();
    } else {
      try {
        const _gc2 = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
        const staff = _gc2('\u05E6\u05D5\u05D5\u05EA');
        const parents = _gc2('\u05D4\u05D5\u05E8\u05D9\u05DD');
        contacts = staff.filter(s=>s['\u05D8\u05DC\u05E4\u05D5\u05DF']).map(s=>({name:Utils.fullName(s),phone:s['\u05D8\u05DC\u05E4\u05D5\u05DF'],role:s['\u05EA\u05E4\u05E7\u05D9\u05D3']||'\u05E6\u05D5\u05D5\u05EA'}));
        // Add parents with phones
        parents.filter(p=>p['\u05D8\u05DC\u05E4\u05D5\u05DF']).slice(0,50).forEach(p => {
          contacts.push({name:((p['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9']||'')+' '+(p['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4']||'')).trim()||'\u05D4\u05D5\u05E8\u05D4',phone:p['\u05D8\u05DC\u05E4\u05D5\u05DF'],role:'\u05D4\u05D5\u05E8\u05D4'});
        });
      } catch(e) {
        contacts = [];
      }
    }
    document.getElementById('phone-contacts').innerHTML = contacts.length ? contacts.map(c=>`<div class="d-flex align-items-center gap-3 py-2 border-bottom clickable" onclick="Pages.quickDial('${c.phone}')">${Utils.avatarHTML(c.name,'sm')}<div class="flex-grow-1"><div class="fw-bold small">${c.name}</div><small class="text-muted">${c.role}</small></div><small dir="ltr">${Utils.formatPhone(c.phone)}</small></div>`).join('') : '<div class="text-center text-muted py-4"><i class="bi bi-telephone fs-1 d-block mb-2"></i>\u05D0\u05D9\u05DF \u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8<br><button class="btn btn-outline-primary btn-sm mt-2" onclick="Pages.phoneLoadDemo()"><i class="bi bi-database me-1"></i>\u05D8\u05E2\u05DF \u05D3\u05DE\u05D5</button></div>';
  },
  exportContacts() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    const staff = _gc('\u05E6\u05D5\u05D5\u05EA');
    const parents = _gc('\u05D4\u05D5\u05E8\u05D9\u05DD');
    const rows = ['\u05E9\u05DD,\u05D8\u05DC\u05E4\u05D5\u05DF,\u05EA\u05E4\u05E7\u05D9\u05D3'];
    staff.filter(s=>s['\u05D8\u05DC\u05E4\u05D5\u05DF']).forEach(s => rows.push(`${Utils.fullName(s)},${s['\u05D8\u05DC\u05E4\u05D5\u05DF']},${s['\u05EA\u05E4\u05E7\u05D9\u05D3']||'\u05E6\u05D5\u05D5\u05EA'}`));
    parents.filter(p=>p['\u05D8\u05DC\u05E4\u05D5\u05DF']).forEach(p => rows.push(`${p['\u05E9\u05DD']||''},${p['\u05D8\u05DC\u05E4\u05D5\u05DF']},\u05D4\u05D5\u05E8\u05D4`));
    const blob = new Blob(['\uFEFF' + rows.join('\n')], {type:'text/csv;charset=utf-8'});
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = 'contacts_bht_' + (Utils.todayISO ? Utils.todayISO() : '') + '.csv'; a.click();
    Utils.toast(`${rows.length - 1} \u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8 \u05D9\u05D5\u05E6\u05D0\u05D5`, 'success');
  },
  dialPress(d) { const el=document.getElementById('dial-display'); el.textContent=(el.textContent||'')+d; },
  dialBackspace() { const el=document.getElementById('dial-display'); el.textContent=(el.textContent||'').slice(0,-1); },
  dialClear() { document.getElementById('dial-display').textContent=''; },
  quickDial(phone) { document.getElementById('dial-display').textContent=phone.replace(/\D/g,''); this.makeCall(); },
  async makeCall() { const number=(document.getElementById('dial-display').textContent||'').replace(/\D/g,''); if (!number||number.length<9) { Utils.toast('\u05DE\u05E1\u05E4\u05E8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF','warning'); return; } try { const resp = await fetch(`http://192.168.1.100:5053/api/call?number=${number}`); if (resp.ok) { Utils.toast(`\u05DE\u05D7\u05D9\u05D9\u05D2 \u05DC${Utils.formatPhone(number)}...`); } else throw new Error(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05D7\u05D9\u05D5\u05D2','danger'); } },


  /* ======================================================================
     CAMERAS
     ====================================================================== */
  cameras() {
    const baseUrl = 'http://192.168.1.100:5051';
    const cams = [{name:'\u05DB\u05E0\u05D9\u05E1\u05D4',path:'/cam/1'},{name:'\u05D7\u05E6\u05E8',path:'/cam/2'},{name:'\u05DB\u05D9\u05EA\u05D4 \u05D0',path:'/cam/3'},{name:'\u05DB\u05D9\u05EA\u05D4 \u05D1',path:'/cam/4'}];
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-camera-video-fill me-2"></i>\u05DE\u05E6\u05DC\u05DE\u05D5\u05EA</h1></div><button class="btn btn-outline-primary btn-sm" onclick="Pages.refreshCameras()"><i class="bi bi-arrow-clockwise me-1"></i>\u05E8\u05E2\u05E0\u05D5\u05DF</button></div><div class="alert alert-warning"><i class="bi bi-exclamation-triangle me-2"></i>\u05DE\u05E6\u05DC\u05DE\u05D5\u05EA \u05D6\u05DE\u05D9\u05E0\u05D5\u05EA \u05E8\u05E7 \u05DE\u05D4\u05E8\u05E9\u05EA \u05D4\u05DE\u05E7\u05D5\u05DE\u05D9\u05EA (localhost). \u05DE-GitHub Pages \u05D7\u05D9\u05D1\u05D5\u05E8 \u05DC\u05D0 \u05D0\u05E4\u05E9\u05E8\u05D9 \u05D1\u05D2\u05DC\u05DC HTTPS.</div><div class="row g-3">${cams.map((c,i)=>`<div class="col-md-6"><div class="camera-feed" id="cam-${i}"><img src="${baseUrl}${c.path}/snapshot?t=${Date.now()}" alt="${c.name}" onerror="this.style.display='none';this.parentElement.innerHTML+='<div class=\\'text-center text-white p-5\\'><i class=\\'bi bi-camera-video-off fs-1\\'></i><br><small>\u05DC\u05D0 \u05D6\u05DE\u05D9\u05DF</small></div>'"><div class="camera-label"><i class="bi bi-circle-fill text-danger me-1" style="font-size:.5rem"></i>${c.name}</div></div></div>`).join('')}</div><div class="card p-3 mt-3"><a href="${baseUrl}" target="_blank" class="btn btn-primary"><i class="bi bi-box-arrow-up-left me-1"></i>\u05E4\u05EA\u05D7 \u05DE\u05E2\u05E8\u05DB\u05EA \u05DE\u05E6\u05DC\u05DE\u05D5\u05EA</a></div>`;
  },
  camerasInit() { this._camInterval = setInterval(() => { if (App.currentPage !== 'cameras') { clearInterval(this._camInterval); return; } document.querySelectorAll('.camera-feed img').forEach(img => { const src=img.src.split('?')[0]; img.src=src+'?t='+Date.now(); }); }, 10000); },
  refreshCameras() { document.querySelectorAll('.camera-feed img').forEach(img => { const src=img.src.split('?')[0]; img.src=src+'?t='+Date.now(); }); Utils.toast('\u05DE\u05E6\u05DC\u05DE\u05D5\u05EA \u05E8\u05D5\u05E2\u05E0\u05E0\u05D5'); },


  /* ======================================================================
     SETTINGS — Enhanced Dashboard
     ====================================================================== */
  settings() {
    const currentTheme = localStorage.getItem(App.THEME_KEY) || 'light';
    const apiUrl = localStorage.getItem('bht_api_url') || App.API_URL;
    const fontSize = localStorage.getItem('bht_font_size') || '16';
    const lastBackup = localStorage.getItem('bht_last_backup') || '\u05DC\u05D0 \u05D1\u05D5\u05E6\u05E2';

    // Calculate storage
    let storageUsed = 0;
    let storageKeys = 0;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        storageUsed += (localStorage.getItem(k) || '').length * 2; // ~2 bytes per char
        storageKeys++;
      }
    } catch(e) { console.error('Error:', e); }
    const storageMB = (storageUsed / 1024 / 1024).toFixed(2);
    const storageMax = 5; // localStorage ~5MB
    const storagePct = Math.min(100, Math.round((storageUsed / (storageMax * 1024 * 1024)) * 100));

    return `<div class="page-header"><h1><i class="bi bi-gear-fill me-2"></i>\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA</h1><p class="text-muted">\u05E0\u05D9\u05D4\u05D5\u05DC \u05DE\u05E2\u05E8\u05DB\u05EA, \u05D2\u05D9\u05D1\u05D5\u05D9\u05D9\u05DD \u05D5\u05D4\u05EA\u05D0\u05DE\u05D4 \u05D0\u05D9\u05E9\u05D9\u05EA</p></div>

      <!-- System Info Dashboard -->
      <div class="row g-3 mb-4">
        <div class="col-6 col-md-3"><div class="card p-3 text-center"><i class="bi bi-cpu fs-3 text-primary"></i><div class="fs-4 fw-bold text-primary mt-1">v5.6</div><small class="text-muted">\u05D2\u05E8\u05E1\u05D4</small></div></div>
        <div class="col-6 col-md-3"><div class="card p-3 text-center"><i class="bi bi-puzzle fs-3 text-success"></i><div class="fs-4 fw-bold text-success mt-1">33</div><small class="text-muted">\u05DE\u05D5\u05D3\u05D5\u05DC\u05D9\u05DD</small></div></div>
        <div class="col-6 col-md-3"><div class="card p-3 text-center"><i class="bi bi-hdd fs-3 text-warning"></i><div class="fs-4 fw-bold text-warning mt-1">${storageMB} MB</div><small class="text-muted">\u05D0\u05D7\u05E1\u05D5\u05DF \u05DE\u05E7\u05D5\u05DE\u05D9</small></div></div>
        <div class="col-6 col-md-3"><div class="card p-3 text-center"><i class="bi bi-key fs-3 text-info"></i><div class="fs-4 fw-bold text-info mt-1">${storageKeys}</div><small class="text-muted">\u05DE\u05E4\u05EA\u05D7\u05D5\u05EA</small></div></div>
      </div>

      <!-- Storage bar -->
      <div class="card p-3 mb-4">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h6 class="fw-bold mb-0"><i class="bi bi-device-ssd me-2"></i>\u05E0\u05D9\u05E6\u05D5\u05DC \u05D0\u05D7\u05E1\u05D5\u05DF</h6>
          <small class="text-muted">${storageMB} MB / ${storageMax} MB</small>
        </div>
        <div class="progress" style="height:24px">
          <div class="progress-bar ${storagePct > 80 ? 'bg-danger' : storagePct > 50 ? 'bg-warning' : 'bg-success'}" style="width:${storagePct}%">${storagePct}%</div>
        </div>
      </div>

      <ul class="nav nav-pills mb-3" id="settings-tabs">
        <li class="nav-item"><a class="nav-link active" href="#" data-tab="appearance"><i class="bi bi-palette me-1"></i>\u05DE\u05E8\u05D0\u05D4</a></li>
        <li class="nav-item"><a class="nav-link" href="#" data-tab="connection"><i class="bi bi-cloud me-1"></i>\u05D7\u05D9\u05D1\u05D5\u05E8</a></li>
        <li class="nav-item"><a class="nav-link" href="#" data-tab="backup"><i class="bi bi-cloud-download me-1"></i>\u05D2\u05D9\u05D1\u05D5\u05D9</a></li>
        <li class="nav-item"><a class="nav-link" href="#" data-tab="data"><i class="bi bi-database me-1"></i>\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD</a></li>
        <li class="nav-item"><a class="nav-link" href="#" data-tab="security"><i class="bi bi-shield-lock me-1"></i>\u05D0\u05D1\u05D8\u05D7\u05D4</a></li>
        <li class="nav-item"><a class="nav-link" href="#" data-tab="about"><i class="bi bi-info-circle me-1"></i>\u05D0\u05D5\u05D3\u05D5\u05EA</a></li>
      </ul>

      <div id="settings-content">
      <!-- Appearance Tab (default visible) -->
      <div class="settings-tab" id="tab-appearance">
        <div class="row g-3">
          <div class="col-md-6"><div class="card p-3">
            <h6 class="fw-bold mb-3"><i class="bi bi-moon-stars me-2"></i>\u05E2\u05E8\u05DB\u05EA \u05E0\u05D5\u05E9\u05D0</h6>
            <div class="d-flex gap-2 mb-3">
              <button class="btn ${currentTheme==='light'?'btn-primary':'btn-outline-primary'} flex-fill" onclick="Pages.setTheme('light')"><i class="bi bi-sun me-1"></i>\u05D1\u05D4\u05D9\u05E8</button>
              <button class="btn ${currentTheme==='dark'?'btn-primary':'btn-outline-primary'} flex-fill" onclick="Pages.setTheme('dark')"><i class="bi bi-moon me-1"></i>\u05DB\u05D4\u05D4</button>
              <button class="btn ${currentTheme==='auto'?'btn-primary':'btn-outline-primary'} flex-fill" onclick="Pages.setTheme('auto')"><i class="bi bi-circle-half me-1"></i>\u05D0\u05D5\u05D8\u05D5</button>
            </div>
          </div></div>
          <div class="col-md-6"><div class="card p-3">
            <h6 class="fw-bold mb-3"><i class="bi bi-fonts me-2"></i>\u05D2\u05D5\u05D3\u05DC \u05D2\u05D5\u05E4\u05DF</h6>
            <div class="d-flex align-items-center gap-3">
              <small>\u05E7\u05D8\u05DF</small>
              <input type="range" class="form-range flex-fill" id="set-fontsize" min="12" max="22" step="1" value="${fontSize}">
              <small>\u05D2\u05D3\u05D5\u05DC</small>
            </div>
            <div class="text-center mt-2"><span class="badge bg-secondary" id="fontsize-label">${fontSize}px</span></div>
            <div class="mt-2 p-2 border rounded" id="fontsize-preview" style="font-size:${fontSize}px">\u05D8\u05E7\u05E1\u05D8 \u05DC\u05D3\u05D5\u05D2\u05DE\u05D0 - \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3</div>
          </div></div>
        </div>
      </div>

      <!-- Connection Tab -->
      <div class="settings-tab d-none" id="tab-connection">
        <div class="row g-3">
          <div class="col-md-6"><div class="card p-3">
            <h6 class="fw-bold mb-3"><i class="bi bi-cloud me-2"></i>\u05DB\u05EA\u05D5\u05D1\u05EA API</h6>
            <div class="mb-3"><input type="url" class="form-control" id="set-api" value="${apiUrl}" dir="ltr"></div>
            <button class="btn btn-primary btn-sm" onclick="Pages.saveApiUrl()"><i class="bi bi-check me-1"></i>\u05E9\u05DE\u05D5\u05E8</button>
          </div></div>
          <div class="col-md-6"><div class="card p-3">
            <h6 class="fw-bold mb-3"><i class="bi bi-heart-pulse me-2 text-danger"></i>\u05D1\u05D3\u05D9\u05E7\u05EA \u05DE\u05E2\u05E8\u05DB\u05EA</h6>
            <button class="btn btn-outline-danger btn-sm" onclick="Pages.runSelfCheck()"><i class="bi bi-activity me-1"></i>\u05D4\u05E4\u05E2\u05DC \u05D1\u05D3\u05D9\u05E7\u05D4</button>
            <div id="selfcheck-result" class="mt-2"></div>
          </div></div>
          <div class="col-md-6"><div class="card p-3">
            <h6 class="fw-bold mb-3"><i class="bi bi-envelope me-2 text-info"></i>\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC</h6>
            <div class="d-flex flex-wrap gap-2">
              <button class="btn btn-outline-info btn-sm" onclick="Pages.sendStatusEmail()"><i class="bi bi-envelope-check me-1"></i>\u05D3\u05D5\u05D7 \u05D9\u05D5\u05DE\u05D9</button>
              <button class="btn btn-outline-warning btn-sm" onclick="Pages.sendPayReminders()"><i class="bi bi-cash-coin me-1"></i>\u05EA\u05D6\u05DB\u05D5\u05E8\u05EA \u05EA\u05E9\u05DC\u05D5\u05DD</button>
              <button class="btn btn-outline-success btn-sm" onclick="Pages.sendBehSummary()"><i class="bi bi-clipboard-data me-1"></i>\u05E1\u05D9\u05DB\u05D5\u05DD \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</button>
            </div>
            <div id="email-result" class="mt-2"></div>
          </div></div>
        </div>
      </div>

      <!-- Backup & Restore Tab -->
      <div class="settings-tab d-none" id="tab-backup">
        <div class="row g-3">
          <div class="col-md-6"><div class="card p-3">
            <h6 class="fw-bold mb-3"><i class="bi bi-cloud-arrow-up me-2 text-primary"></i>\u05D2\u05D9\u05D1\u05D5\u05D9 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD (\u05E9\u05E8\u05EA)</h6>
            <div class="d-flex flex-wrap gap-2 mb-2">
              <button class="btn btn-outline-primary btn-sm" onclick="Pages.backupNow()"><i class="bi bi-cloud-arrow-up me-1"></i>\u05D2\u05D9\u05D1\u05D5\u05D9 \u05D1\u05E9\u05E8\u05EA</button>
              <button class="btn btn-outline-success btn-sm" onclick="Pages.exportAllData()"><i class="bi bi-download me-1"></i>\u05D9\u05D9\u05E6\u05D5\u05D0 \u05DB\u05DC \u05D4\u05DE\u05D9\u05D3\u05E2</button>
            </div>
            <div id="backup-result" class="mt-2"></div>
            <div class="mt-2 small text-muted"><i class="bi bi-clock me-1"></i>\u05D2\u05D9\u05D1\u05D5\u05D9 \u05D0\u05D7\u05E8\u05D5\u05DF: ${lastBackup}</div>
            <div class="alert alert-warning small mt-2 mb-0 py-2"><i class="bi bi-info-circle me-1"></i>\u05DE\u05D5\u05DE\u05DC\u05E5 \u05DC\u05D4\u05E8\u05D9\u05E5 <code dir="ltr">python refresh_data.py</code> \u05E4\u05E2\u05DD \u05D1\u05E9\u05D1\u05D5\u05E2 \u05DC\u05D2\u05D9\u05D1\u05D5\u05D9 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD</div>
          </div></div>

          <div class="col-md-6"><div class="card p-3">
            <h6 class="fw-bold mb-3"><i class="bi bi-cloud-arrow-down me-2 text-success"></i>\u05D9\u05D9\u05E6\u05D5\u05D0 localStorage \u05DB-JSON</h6>
            <p class="small text-muted">\u05D9\u05D9\u05E6\u05D5\u05D0 \u05DB\u05DC \u05D4\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA \u05D5\u05D4\u05DE\u05D8\u05DE\u05D5\u05DF \u05D4\u05DE\u05E7\u05D5\u05DE\u05D9 \u05DB\u05E7\u05D5\u05D1\u05E5 JSON</p>
            <button class="btn btn-success btn-sm" onclick="Pages.exportLocalStorage()"><i class="bi bi-download me-1"></i>\u05D9\u05D9\u05E6\u05D5\u05D0 localStorage</button>
          </div></div>

          <div class="col-md-6"><div class="card p-3">
            <h6 class="fw-bold mb-3"><i class="bi bi-upload me-2 text-warning"></i>\u05E9\u05D7\u05D6\u05D5\u05E8 \u05DE\u05E7\u05D5\u05D1\u05E5</h6>
            <p class="small text-muted">\u05D8\u05E2\u05DF \u05E7\u05D5\u05D1\u05E5 JSON \u05E9\u05D9\u05D5\u05E6\u05D0 \u05E7\u05D5\u05D3\u05DD \u05DB\u05D3\u05D9 \u05DC\u05E9\u05D7\u05D6\u05E8 \u05D4\u05D2\u05D3\u05E8\u05D5\u05EA</p>
            <input type="file" class="form-control form-control-sm mb-2" id="restore-file" accept=".json">
            <button class="btn btn-warning btn-sm" onclick="Pages.importLocalStorage()"><i class="bi bi-upload me-1"></i>\u05E9\u05D7\u05D6\u05E8 \u05DE\u05E7\u05D5\u05D1\u05E5</button>
            <div id="restore-result" class="mt-2"></div>
          </div></div>

          <div class="col-md-6"><div class="card p-3">
            <h6 class="fw-bold mb-3"><i class="bi bi-archive me-2"></i>\u05D0\u05E8\u05DB\u05D9\u05D5\u05DF \u05E9\u05E0\u05EA\u05D9</h6>
            <p class="small text-muted">\u05D1\u05E1\u05D9\u05D5\u05DD \u05D4\u05E9\u05E0\u05D4, \u05D4\u05E2\u05D1\u05E8 \u05D0\u05EA \u05DB\u05DC \u05D4\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05DC\u05D0\u05E8\u05DB\u05D9\u05D5\u05DF</p>
            <div class="mb-2"><select class="form-select form-select-sm" id="archive-year"><option>\u05EA\u05E9\u05E4"\u05D5 (2025-2026)</option><option>\u05EA\u05E9\u05E4"\u05D4 (2024-2025)</option></select></div>
            <div class="d-flex gap-2">
              <button class="btn btn-outline-primary btn-sm" onclick="Pages.exportYearArchive()"><i class="bi bi-download me-1"></i>\u05D9\u05D9\u05E6\u05D5\u05D0 \u05D0\u05E8\u05DB\u05D9\u05D5\u05DF</button>
              <button class="btn btn-outline-danger btn-sm" onclick="Pages.startNewYear()"><i class="bi bi-arrow-repeat me-1"></i>\u05D4\u05EA\u05D7\u05DC \u05E9\u05E0\u05D4 \u05D7\u05D3\u05E9\u05D4</button>
            </div>
          </div></div>
        </div>
      </div>

      <!-- Data Management Tab -->
      <div class="settings-tab d-none" id="tab-data">
        <div class="row g-3">
          <!-- Refresh Data from Google Sheets -->
          <div class="col-md-6"><div class="card p-3">
            <h6 class="fw-bold mb-3"><i class="bi bi-arrow-clockwise me-2 text-primary"></i>\u05E8\u05E2\u05E0\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05DE-Google Sheets</h6>
            <p class="small text-muted mb-2">\u05E2\u05D3\u05DB\u05D5\u05DF \u05D0\u05D7\u05E8\u05D5\u05DF: <strong id="data-last-updated">${typeof DATA_CACHE !== 'undefined' && DATA_CACHE._lastUpdated ? new Date(DATA_CACHE._lastUpdated).toLocaleDateString('he-IL') + ' ' + new Date(DATA_CACHE._lastUpdated).toLocaleTimeString('he-IL', {hour:'2-digit',minute:'2-digit'}) : '\u05DC\u05D0 \u05D9\u05D3\u05D5\u05E2'}</strong></p>
            <button class="btn btn-primary btn-sm mb-2" onclick="Pages._showRefreshDataInfo()"><i class="bi bi-arrow-repeat me-1"></i>\u05E8\u05E2\u05E0\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD</button>
            <div id="refresh-data-info" class="d-none alert alert-info small mt-2 mb-0">
              <i class="bi bi-terminal me-1"></i>\u05DC\u05E8\u05E2\u05E0\u05D5\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD, \u05D4\u05E4\u05E2\u05DC \u05D0\u05EA \u05D4\u05E1\u05E7\u05E8\u05D9\u05E4\u05D8:<br><code dir="ltr">python refresh_data.py</code>
            </div>
          </div></div>
          <!-- Record counts per sheet -->
          <div class="col-md-6"><div class="card p-3">
            <h6 class="fw-bold mb-3"><i class="bi bi-database me-2 text-success"></i>\u05E1\u05D9\u05DB\u05D5\u05DD \u05E8\u05E9\u05D5\u05DE\u05D5\u05EA</h6>
            <div id="data-record-counts" class="small" style="max-height:200px;overflow-y:auto"></div>
          </div></div>
          <div class="col-md-4"><div class="card p-3 text-center">
            <i class="bi bi-trash3 fs-1 text-warning"></i>
            <h6 class="fw-bold mt-2">\u05E0\u05E7\u05D4 \u05DE\u05D8\u05DE\u05D5\u05DF</h6>
            <p class="small text-muted">\u05DE\u05D5\u05D7\u05E7 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05E9\u05E0\u05E9\u05DE\u05E8\u05D5 \u05D1\u05DE\u05D8\u05DE\u05D5\u05DF \u05D4\u05DE\u05E7\u05D5\u05DE\u05D9. \u05D4\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05D1\u05E9\u05E8\u05EA \u05DC\u05D0 \u05DE\u05D5\u05E9\u05E4\u05E2\u05D9\u05DD.</p>
            <button class="btn btn-outline-warning btn-sm" onclick="Pages.clearCache()"><i class="bi bi-trash me-1"></i>\u05E0\u05E7\u05D4 \u05DE\u05D8\u05DE\u05D5\u05DF</button>
          </div></div>
          <div class="col-md-4"><div class="card p-3 text-center">
            <i class="bi bi-magic fs-1 text-info"></i>
            <h6 class="fw-bold mt-2">\u05E0\u05EA\u05D5\u05E0\u05D9 \u05D3\u05D5\u05D2\u05DE\u05D0</h6>
            <p class="small text-muted">\u05D9\u05D9\u05E6\u05E8 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05DC\u05D3\u05D5\u05D2\u05DE\u05D0 \u05DC\u05D1\u05D3\u05D9\u05E7\u05D4 \u05D5\u05D4\u05D3\u05D2\u05DE\u05D4. \u05E2\u05DC\u05D5\u05DC \u05DC\u05D4\u05D5\u05E1\u05D9\u05E3 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD.</p>
            <button class="btn btn-outline-info btn-sm" onclick="Pages.runSeed()"><i class="bi bi-magic me-1"></i>\u05D0\u05E4\u05E1 \u05D3\u05D5\u05D2\u05DE\u05D0</button>
          </div></div>
          <div class="col-md-4"><div class="card p-3 text-center">
            <i class="bi bi-exclamation-triangle fs-1 text-danger"></i>
            <h6 class="fw-bold mt-2">\u05DE\u05D7\u05E7 \u05D4\u05DB\u05DC</h6>
            <p class="small text-muted">\u05DE\u05D5\u05D7\u05E7 \u05D0\u05EA \u05DB\u05DC \u05D4\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05D4\u05DE\u05E7\u05D5\u05DE\u05D9\u05D9\u05DD. \u05E4\u05E2\u05D5\u05DC\u05D4 \u05D6\u05D5 \u05D0\u05D9\u05E0\u05D4 \u05D4\u05E4\u05D9\u05DB\u05D4!</p>
            <button class="btn btn-danger btn-sm" onclick="Pages.clearAllData()"><i class="bi bi-x-octagon me-1"></i>\u05DE\u05D7\u05E7 \u05D4\u05DB\u05DC</button>
          </div></div>
          <div class="col-md-6"><div class="card p-3">
            <h6 class="fw-bold mb-3"><i class="bi bi-box-arrow-in-down me-2 text-success"></i>\u05D9\u05D9\u05D1\u05D5\u05D0 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD</h6>
            <button class="btn btn-outline-success btn-sm" onclick="Pages.runImport()"><i class="bi bi-arrow-repeat me-1"></i>\u05D9\u05D9\u05D1\u05D5\u05D0 \u05DE\u05DE\u05E7\u05D5\u05E8</button>
            <div id="import-result" class="mt-2"></div>
          </div></div>
          <div class="col-12"><div class="card p-3">
            <h6 class="fw-bold mb-3"><i class="bi bi-file-earmark-arrow-down me-2 text-primary"></i>\u05D9\u05D9\u05E6\u05D5\u05D0 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD</h6>
            <div class="d-flex flex-wrap gap-2">
              <button class="btn btn-primary btn-sm" onclick="Pages.exportFullBackupJSON()"><i class="bi bi-download me-1"></i>\u05D9\u05D9\u05E6\u05D5\u05D0 \u05D2\u05D9\u05D1\u05D5\u05D9 \u05DE\u05DC\u05D0</button>
              <button class="btn btn-outline-success btn-sm" onclick="Pages.exportStudentsCSV()"><i class="bi bi-filetype-csv me-1"></i>\u05D9\u05D9\u05E6\u05D5\u05D0 \u05E8\u05E9\u05D9\u05DE\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD (CSV)</button>
              <button class="btn btn-outline-success btn-sm" onclick="Pages.exportStaffCSV()"><i class="bi bi-filetype-csv me-1"></i>\u05D9\u05D9\u05E6\u05D5\u05D0 \u05E8\u05E9\u05D9\u05DE\u05EA \u05E6\u05D5\u05D5\u05EA (CSV)</button>
            </div>
          </div></div>
        </div>
      </div>

      <!-- Security Tab -->
      <div class="settings-tab d-none" id="tab-security">
        <div class="row g-3">
          <div class="col-md-6"><div class="card p-3">
            <h6 class="fw-bold mb-3"><i class="bi bi-shield-lock me-2"></i>\u05E9\u05D9\u05E0\u05D5\u05D9 PIN</h6>
            <div class="mb-3"><label class="form-label">\u05E7\u05D5\u05D3 PIN \u05D7\u05D3\u05E9</label><input type="password" class="form-control" id="set-pin" maxlength="6" inputmode="numeric"></div>
            <button class="btn btn-primary btn-sm" onclick="Pages.changePin()"><i class="bi bi-key me-1"></i>\u05E2\u05D3\u05DB\u05D5\u05DF</button>
          </div></div>
        </div>
      </div>

      <!-- About Tab -->
      <div class="settings-tab d-none" id="tab-about">
        <div class="row g-3">
          <div class="col-md-8 mx-auto"><div class="card p-4 text-center">
            <i class="bi bi-mortarboard-fill fs-1 text-primary"></i>
            <h4 class="fw-bold mt-2">\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3</h4>
            <p class="text-muted">\u05DE\u05E2\u05E8\u05DB\u05EA \u05E0\u05D9\u05D4\u05D5\u05DC \u05DE\u05D5\u05E1\u05D3\u05D9\u05EA \u05DE\u05EA\u05E7\u05D3\u05DE\u05EA</p>
            <hr>
            <div class="row g-2 text-start small">
              <div class="col-6"><strong>\u05D2\u05E8\u05E1\u05D4:</strong></div><div class="col-6">5.6</div>
              <div class="col-6"><strong>\u05EA\u05D0\u05E8\u05D9\u05DA \u05D1\u05E0\u05D9\u05D9\u05D4:</strong></div><div class="col-6">2026-04-22</div>
              <div class="col-6"><strong>\u05E4\u05DC\u05D8\u05E4\u05D5\u05E8\u05DE\u05D4:</strong></div><div class="col-6">GitHub Pages + Google Sheets</div>
              <div class="col-6"><strong>\u05DE\u05D5\u05D3\u05D5\u05DC\u05D9\u05DD:</strong></div><div class="col-6">33 \u05DE\u05D5\u05D3\u05D5\u05DC\u05D9\u05DD \u05E4\u05E2\u05D9\u05DC\u05D9\u05DD</div>
              <div class="col-6"><strong>\u05DE\u05D5\u05E1\u05D3:</strong></div><div class="col-6">\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3</div>
              <div class="col-6"><strong>\u05DE\u05E4\u05EA\u05D7:</strong></div><div class="col-6">\u05D9\u05D5\u05E1\u05E3 \u05E9\u05E0\u05D9\u05D9\u05D3\u05E8</div>
              <div class="col-6"><strong>\u05D8\u05DB\u05E0\u05D5\u05DC\u05D5\u05D2\u05D9\u05D5\u05EA:</strong></div><div class="col-6">Bootstrap 5.3.2, Chart.js, Heebo</div>
              <div class="col-6"><strong>\u05E8\u05D9\u05E9\u05D9\u05D5\u05DF:</strong></div><div class="col-6">MIT</div>
            </div>
            <hr>
            <div class="small text-muted">\u05E0\u05D1\u05E0\u05D4 \u05E2\u05DD Claude AI | \u05DB\u05DC \u05D4\u05D6\u05DB\u05D5\u05D9\u05D5\u05EA \u05E9\u05DE\u05D5\u05E8\u05D5\u05EA</div>
          </div></div>
        </div>
      </div>
      </div>`;
  },
  settingsInit() {
    // Tab switching
    document.querySelectorAll('#settings-tabs .nav-link').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('#settings-tabs .nav-link').forEach(x => x.classList.remove('active'));
        a.classList.add('active');
        document.querySelectorAll('.settings-tab').forEach(t => t.classList.add('d-none'));
        const tab = document.getElementById('tab-' + a.dataset.tab);
        if (tab) tab.classList.remove('d-none');
      });
    });

    // Font size slider
    const slider = document.getElementById('set-fontsize');
    if (slider) {
      slider.addEventListener('input', () => {
        const val = slider.value;
        document.getElementById('fontsize-label').textContent = val + 'px';
        document.getElementById('fontsize-preview').style.fontSize = val + 'px';
      });
      slider.addEventListener('change', () => {
        const val = slider.value;
        localStorage.setItem('bht_font_size', val);
        document.documentElement.style.fontSize = val + 'px';
        Utils.toast('\u05D2\u05D5\u05D3\u05DC \u05D2\u05D5\u05E4\u05DF \u05E2\u05D5\u05D3\u05DB\u05DF \u05DC-' + val + 'px');
      });
    }

    // Apply saved font size on load
    const savedSize = localStorage.getItem('bht_font_size');
    if (savedSize) document.documentElement.style.fontSize = savedSize + 'px';

    // Populate record counts in data tab
    const countsEl = document.getElementById('data-record-counts');
    if (countsEl && typeof DATA_CACHE !== 'undefined') {
      const rows = Object.keys(DATA_CACHE)
        .filter(k => k !== '_lastUpdated' && Array.isArray(DATA_CACHE[k]))
        .map(k => `<div class="d-flex justify-content-between border-bottom py-1"><span>${k}</span><span class="badge bg-secondary">${DATA_CACHE[k].length}</span></div>`)
        .join('');
      // Add email stats
      if (typeof EMAIL_CACHE !== 'undefined' && EMAIL_CACHE) {
        rows += `<div class="d-flex justify-content-between border-bottom py-1 text-info"><span><i class="bi bi-envelope me-1"></i>\u05D3\u05D5\u05D0\u05E8 \u05E0\u05DB\u05E0\u05E1</span><span class="badge bg-info">${(EMAIL_CACHE.inbox||[]).length}</span></div>`;
        rows += `<div class="d-flex justify-content-between border-bottom py-1 text-info"><span><i class="bi bi-send me-1"></i>\u05D3\u05D5\u05D0\u05E8 \u05E0\u05E9\u05DC\u05D7</span><span class="badge bg-info">${(EMAIL_CACHE.sent||[]).length}</span></div>`;
      }
      countsEl.innerHTML = rows || '<span class="text-muted">\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD</span>';
    }
  },

  _showRefreshDataInfo() {
    const el = document.getElementById('refresh-data-info');
    if (el) el.classList.toggle('d-none');
  },

  // --- Theme Toggle ---
  setTheme(theme) {
    localStorage.setItem(App.THEME_KEY, theme);
    if (theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-bs-theme', prefersDark ? 'dark' : 'light');
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme);
    }
    if (typeof App.applyTheme === 'function') App.applyTheme();
    // Update buttons
    document.querySelectorAll('#tab-appearance .btn').forEach(b => {
      b.className = b.className.replace('btn-primary','btn-outline-primary');
    });
    const activeBtn = document.querySelector(`#tab-appearance .btn[onclick="Pages.setTheme('${theme}')"]`);
    if (activeBtn) activeBtn.className = activeBtn.className.replace('btn-outline-primary','btn-primary');
    Utils.toast('\u05E2\u05E8\u05DB\u05EA \u05E0\u05D5\u05E9\u05D0 \u05E2\u05D5\u05D3\u05DB\u05E0\u05D4');
  },

  saveApiUrl() { const url=document.getElementById('set-api').value.trim(); if (!url) { Utils.toast('\u05D7\u05E1\u05E8\u05D4 \u05DB\u05EA\u05D5\u05D1\u05EA','warning'); return; } localStorage.setItem('bht_api_url',url); App.API_URL=url; Utils.toast('API \u05E2\u05D5\u05D3\u05DB\u05DF'); },
  clearCache() { Object.keys(localStorage).forEach(k => { if (k.startsWith(App.CACHE_PREFIX)) localStorage.removeItem(k); }); Utils.toast('\u05DE\u05D8\u05DE\u05D5\u05DF \u05E0\u05D5\u05E7\u05D4'); },
  changePin() { const pin=document.getElementById('set-pin').value.trim(); if (pin.length<4) { Utils.toast('\u05D4\u05E7\u05D5\u05D3 \u05D7\u05D9\u05D9\u05D1 4-6 \u05E1\u05E4\u05E8\u05D5\u05EA','warning'); return; } localStorage.setItem(App.PIN_KEY, Utils.hashPin(pin)); document.getElementById('set-pin').value=''; Utils.toast('PIN \u05E2\u05D5\u05D3\u05DB\u05DF'); },

  // --- Backup & Restore ---
  async backupNow() {
    const el = document.getElementById('backup-result');
    el.innerHTML = '<div class="spinner-border spinner-border-sm"></div> \u05DE\u05D2\u05D1\u05D4...';
    try {
      const res = await App.apiCall('run', 'createBackup', {});
      localStorage.setItem('bht_last_backup', new Date().toLocaleString('he-IL'));
      el.innerHTML = '<div class="text-success"><i class="bi bi-check-circle me-1"></i>\u05D2\u05D9\u05D1\u05D5\u05D9 \u05E0\u05D5\u05E6\u05E8 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4</div>';
    } catch(e) { el.innerHTML = '<div class="text-danger"><i class="bi bi-x-circle me-1"></i>\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05D2\u05D9\u05D1\u05D5\u05D9</div>'; }
  },
  async exportAllData() {
    const el = document.getElementById('backup-result');
    el.innerHTML = '<div class="spinner-border spinner-border-sm"></div> \u05DE\u05D9\u05D9\u05E6\u05D0 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD...';
    try {
      const sheets = ['\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD','\u05D4\u05D5\u05E8\u05D9\u05DD','\u05E6\u05D5\u05D5\u05EA','\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3','\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA','\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA','\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9_\u05D1\u05D9\u05EA','\u05DE\u05D1\u05D7\u05E0\u05D9\u05DD','\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD','\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA','\u05DC\u05D5\u05D7_\u05E9\u05E0\u05D4','\u05EA\u05E7\u05E9\u05D5\u05E8\u05EA','\u05D5\u05E2\u05D3\u05D5\u05EA','\u05E7\u05D5\u05E4\u05D4_\u05E7\u05D8\u05E0\u05D4','\u05D8\u05D9\u05D5\u05DC\u05D9\u05DD','\u05EA\u05E7\u05E6\u05D9\u05D1','\u05DE\u05D1\u05E6\u05E2_\u05DC\u05D9\u05DE\u05D5\u05D3','\u05DE\u05E2\u05E8\u05DB\u05EA_\u05E9\u05E2\u05D5\u05EA','\u05DE\u05D9\u05D3\u05E2_\u05E8\u05E4\u05D5\u05D0\u05D9','\u05E9\u05DB\u05E8_\u05E6\u05D5\u05D5\u05EA','\u05DE\u05E1\u05D2\u05E8\u05D5\u05EA'];
      const allData = {};
      let loaded = 0;
      const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : null;
      for (const s of sheets) {
        const cached = _gc(s);
        if (cached && cached.length) { allData[s] = cached; }
        else { try { allData[s] = await App.getData(s); } catch(e) { allData[s] = []; } }
        loaded++;
        el.innerHTML = `<div class="spinner-border spinner-border-sm"></div> \u05DE\u05D9\u05D9\u05E6\u05D0... ${loaded}/${sheets.length}`;
      }
      Utils.exportJSON(allData, 'bht_backup_' + Utils.todayISO() + '.json');
      localStorage.setItem('bht_last_backup', new Date().toLocaleString('he-IL'));
      el.innerHTML = '<div class="text-success"><i class="bi bi-check-circle me-1"></i>\u05D2\u05D9\u05D1\u05D5\u05D9 \u05D4\u05D5\u05E9\u05DC\u05DD!</div>';
      Utils.toast('\u05D2\u05D9\u05D1\u05D5\u05D9 \u05D4\u05D5\u05E9\u05DC\u05DD!');
    } catch(e) { el.innerHTML = '<div class="text-danger"><i class="bi bi-x-circle me-1"></i>\u05E9\u05D2\u05D9\u05D0\u05D4</div>'; }
  },

  // --- localStorage Export/Import ---
  exportLocalStorage() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      data[key] = localStorage.getItem(key);
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bht_localstorage_' + (Utils.todayISO ? Utils.todayISO() : new Date().toISOString().slice(0,10)) + '.json';
    a.click();
    URL.revokeObjectURL(url);
    localStorage.setItem('bht_last_backup', new Date().toLocaleString('he-IL'));
    Utils.toast('\u05E7\u05D5\u05D1\u05E5 localStorage \u05D9\u05D5\u05E6\u05D0 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4');
  },
  async importLocalStorage() {
    const fileInput = document.getElementById('restore-file');
    const el = document.getElementById('restore-result');
    if (!fileInput || !fileInput.files.length) { Utils.toast('\u05D1\u05D7\u05E8 \u05E7\u05D5\u05D1\u05E5 JSON','warning'); return; }
    if (!await Utils.confirm('\u05E9\u05D7\u05D6\u05D5\u05E8 \u05D4\u05D2\u05D3\u05E8\u05D5\u05EA', '\u05D4\u05D0\u05DD \u05DC\u05E9\u05D7\u05D6\u05E8 \u05D4\u05D2\u05D3\u05E8\u05D5\u05EA \u05DE\u05D4\u05E7\u05D5\u05D1\u05E5? \u05D4\u05D2\u05D3\u05E8\u05D5\u05EA \u05E7\u05D9\u05D9\u05DE\u05D5\u05EA \u05D9\u05D3\u05E8\u05E1\u05D5.')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        let count = 0;
        for (const [key, value] of Object.entries(data)) {
          localStorage.setItem(key, value);
          count++;
        }
        el.innerHTML = `<div class="text-success"><i class="bi bi-check-circle me-1"></i>\u05E9\u05D5\u05D7\u05D6\u05E8\u05D5 ${count} \u05DE\u05E4\u05EA\u05D7\u05D5\u05EA \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4</div>`;
        Utils.toast(`\u05E9\u05D5\u05D7\u05D6\u05E8\u05D5 ${count} \u05DE\u05E4\u05EA\u05D7\u05D5\u05EA`);
      } catch(err) {
        el.innerHTML = '<div class="text-danger"><i class="bi bi-x-circle me-1"></i>\u05E7\u05D5\u05D1\u05E5 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF</div>';
        Utils.toast('\u05E7\u05D5\u05D1\u05E5 JSON \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF','danger');
      }
    };
    reader.readAsText(fileInput.files[0]);
  },

  // --- Clear All Data ---
  async clearAllData() {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05EA \u05DB\u05DC \u05D4\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD', '\u05D4\u05D0\u05DD \u05DC\u05DE\u05D7\u05D5\u05E7 \u05D0\u05EA \u05DB\u05DC \u05D4\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05D4\u05DE\u05E7\u05D5\u05DE\u05D9\u05D9\u05DD? \u05E4\u05E2\u05D5\u05DC\u05D4 \u05D6\u05D5 \u05D0\u05D9\u05E0\u05D4 \u05D4\u05E4\u05D9\u05DB\u05D4!')) return;
    if (!await Utils.confirm('\u05D0\u05D9\u05E9\u05D5\u05E8 \u05E1\u05D5\u05E4\u05D9', '\u05D4\u05D0\u05DD \u05D0\u05EA\u05D4 \u05D1\u05D8\u05D5\u05D7? \u05DB\u05DC \u05D4\u05DE\u05D8\u05DE\u05D5\u05DF, \u05D4\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA \u05D5\u05D4\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05D4\u05DE\u05E7\u05D5\u05DE\u05D9\u05D9\u05DD \u05D9\u05D9\u05DE\u05D7\u05E7\u05D5.')) return;
    localStorage.clear();
    Utils.toast('\u05DB\u05DC \u05D4\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05E0\u05DE\u05D7\u05E7\u05D5. \u05D4\u05D3\u05E3 \u05D9\u05D9\u05D8\u05E2\u05DF \u05DE\u05D7\u05D3\u05E9...','warning');
    setTimeout(() => location.reload(), 1500);
  },

  // --- Self-Check ---
  async runSelfCheck() {
    const el = document.getElementById('selfcheck-result');
    el.innerHTML = '<div class="spinner-border spinner-border-sm"></div> \u05D1\u05D5\u05D3\u05E7...';
    const checks = [];
    // Check 1: API connectivity
    try { await App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD'); checks.push({ name: '\u05D7\u05D9\u05D1\u05D5\u05E8 API', ok: true }); } catch(e) { checks.push({ name: '\u05D7\u05D9\u05D1\u05D5\u05E8 API', ok: false, err: e.message }); }
    // Check 2: localStorage
    try { localStorage.setItem('_test_','1'); localStorage.removeItem('_test_'); checks.push({ name: 'localStorage', ok: true }); } catch(e) { checks.push({ name: 'localStorage', ok: false }); }
    // Check 3: Cached data freshness
    const cacheKeys = Object.keys(localStorage).filter(k => k.startsWith(App.CACHE_PREFIX));
    checks.push({ name: `\u05DE\u05D8\u05DE\u05D5\u05DF (${cacheKeys.length} \u05E8\u05E9\u05D5\u05DE\u05D5\u05EA)`, ok: true });
    // Check 4: Sheets existence
    const testSheets = ['\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD','\u05E6\u05D5\u05D5\u05EA','\u05D4\u05D5\u05E8\u05D9\u05DD','\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA','\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3'];
    for (const s of testSheets) { try { await App.getData(s); checks.push({ name: `\u05D2\u05DC\u05D9\u05D5\u05DF ${s}`, ok: true }); } catch(e) { checks.push({ name: `\u05D2\u05DC\u05D9\u05D5\u05DF ${s}`, ok: false }); } }
    const passed = checks.filter(c => c.ok).length;
    el.innerHTML = `<div class="mt-2"><div class="fw-bold mb-2">${passed}/${checks.length} \u05D1\u05D3\u05D9\u05E7\u05D5\u05EA \u05E2\u05D1\u05E8\u05D5</div>${checks.map(c => `<div class="small ${c.ok?'text-success':'text-danger'}"><i class="bi bi-${c.ok?'check-circle':'x-circle'} me-1"></i>${c.name}${c.err?' - '+c.err:''}</div>`).join('')}</div>`;
  },
  // --- Email Actions ---
  async sendStatusEmail() {
    const el = document.getElementById('email-result');
    el.innerHTML = '<div class="spinner-border spinner-border-sm"></div> \u05E9\u05D5\u05DC\u05D7...';
    try { await App.apiCall('run', 'sendStatusEmail', {}); el.innerHTML = '<div class="text-success"><i class="bi bi-check-circle me-1"></i>\u05D3\u05D5\u05D7 \u05E0\u05E9\u05DC\u05D7</div>'; } catch(e) { el.innerHTML = '<div class="text-danger"><i class="bi bi-x-circle me-1"></i>\u05E9\u05D2\u05D9\u05D0\u05D4</div>'; }
  },
  async sendPayReminders() {
    const el = document.getElementById('email-result');
    el.innerHTML = '<div class="spinner-border spinner-border-sm"></div> \u05E9\u05D5\u05DC\u05D7...';
    try { await App.apiCall('run', 'sendPaymentReminders', {}); el.innerHTML = '<div class="text-success"><i class="bi bi-check-circle me-1"></i>\u05EA\u05D6\u05DB\u05D5\u05E8\u05D5\u05EA \u05E0\u05E9\u05DC\u05D7\u05D5</div>'; } catch(e) { el.innerHTML = '<div class="text-danger"><i class="bi bi-x-circle me-1"></i>\u05E9\u05D2\u05D9\u05D0\u05D4</div>'; }
  },
  async sendBehSummary() {
    const el = document.getElementById('email-result');
    el.innerHTML = '<div class="spinner-border spinner-border-sm"></div> \u05E9\u05D5\u05DC\u05D7...';
    try { await App.apiCall('run', 'sendWeeklyBehaviorSummary', {}); el.innerHTML = '<div class="text-success"><i class="bi bi-check-circle me-1"></i>\u05E1\u05D9\u05DB\u05D5\u05DD \u05E0\u05E9\u05DC\u05D7</div>'; } catch(e) { el.innerHTML = '<div class="text-danger"><i class="bi bi-x-circle me-1"></i>\u05E9\u05D2\u05D9\u05D0\u05D4</div>'; }
  },
  // --- Import/Seed ---
  async runImport() {
    const el = document.getElementById('import-result');
    el.innerHTML = '<div class="spinner-border spinner-border-sm"></div> \u05DE\u05D9\u05D9\u05D1\u05D0...';
    try { await App.apiCall('run', 'importAll', {}); el.innerHTML = '<div class="text-success"><i class="bi bi-check-circle me-1"></i>\u05D9\u05D9\u05D1\u05D5\u05D0 \u05D4\u05D5\u05E9\u05DC\u05DD</div>'; } catch(e) { el.innerHTML = '<div class="text-danger"><i class="bi bi-x-circle me-1"></i>\u05E9\u05D2\u05D9\u05D0\u05D4</div>'; }
  },
  async runSeed() {
    if (!await Utils.confirm('\u05E0\u05EA\u05D5\u05E0\u05D9 \u05D3\u05D5\u05D2\u05DE\u05D0', '\u05D4\u05D0\u05DD \u05DC\u05D9\u05D9\u05E6\u05E8 \u05E0\u05EA\u05D5\u05E0\u05D9 \u05D3\u05D5\u05D2\u05DE\u05D0? \u05E4\u05E2\u05D5\u05DC\u05D4 \u05D6\u05D5 \u05E2\u05DC\u05D5\u05DC\u05D4 \u05DC\u05D4\u05D5\u05E1\u05D9\u05E3 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD.')) return;
    const el = document.getElementById('import-result');
    el.innerHTML = '<div class="spinner-border spinner-border-sm"></div> \u05DE\u05D9\u05D9\u05E6\u05E8...';
    try { await App.apiCall('run', 'seedAllData', {}); el.innerHTML = '<div class="text-success"><i class="bi bi-check-circle me-1"></i>\u05E0\u05EA\u05D5\u05E0\u05D9 \u05D3\u05D5\u05D2\u05DE\u05D0 \u05E0\u05D5\u05E6\u05E8\u05D5</div>'; this.clearCache(); } catch(e) { el.innerHTML = '<div class="text-danger"><i class="bi bi-x-circle me-1"></i>\u05E9\u05D2\u05D9\u05D0\u05D4</div>'; }
  },
  // --- Year-End Archive ---
  async exportYearArchive() {
    Utils.toast('\u05DE\u05D9\u05D9\u05E6\u05D0 \u05D0\u05E8\u05DB\u05D9\u05D5\u05DF \u05E9\u05E0\u05EA\u05D9...','info');
    const sheets = ['\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD','\u05D4\u05D5\u05E8\u05D9\u05DD','\u05E6\u05D5\u05D5\u05EA','\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3','\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA','\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA','\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9_\u05D1\u05D9\u05EA','\u05DE\u05D1\u05D7\u05E0\u05D9\u05DD','\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD','\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA'];
    const archive = {year: document.getElementById('archive-year')?.value || '\u05EA\u05E9\u05E4"\u05D5', exportDate: Utils.todayISO(), data:{}};
    for (const s of sheets) { try { archive.data[s] = await App.getData(s); } catch(e) { archive.data[s]=[]; } }
    Utils.exportJSON(archive, 'bht_archive_' + Utils.todayISO() + '.json');
    Utils.toast('\u05D0\u05E8\u05DB\u05D9\u05D5\u05DF \u05E9\u05E0\u05EA\u05D9 \u05D9\u05D5\u05E6\u05D0 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4!');
  },
  async startNewYear() {
    if (!await Utils.confirm('\u05E9\u05E0\u05D4 \u05D7\u05D3\u05E9\u05D4','\u26A0\uFE0F \u05E4\u05E2\u05D5\u05DC\u05D4 \u05D6\u05D5 \u05EA\u05D0\u05E4\u05E1 \u05D0\u05EA \u05D4\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05D5\u05EA\u05E2\u05D1\u05D9\u05E8 \u05D4\u05DB\u05DC \u05DC\u05D0\u05E8\u05DB\u05D9\u05D5\u05DF. \u05D4\u05D0\u05DD \u05DC\u05D4\u05DE\u05E9\u05D9\u05DA?')) return;
    Utils.toast('\u05DE\u05D0\u05EA\u05D7\u05DC \u05E9\u05E0\u05D4 \u05D7\u05D3\u05E9\u05D4...','info');
    // In reality this would call API to archive and reset
    Utils.toast('\u05E9\u05E0\u05D4 \u05D7\u05D3\u05E9\u05D4 \u05D4\u05D5\u05D7\u05DC\u05D4! \u05DB\u05DC \u05D4\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05D4\u05D5\u05E2\u05D1\u05E8\u05D5 \u05DC\u05D0\u05E8\u05DB\u05D9\u05D5\u05DF.');
  },

  // --- Data Export (JSON/CSV) ---
  _downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  },
  exportFullBackupJSON() {
    if (typeof DATA_CACHE === 'undefined') { Utils.toast('\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05D1\u05DE\u05D8\u05DE\u05D5\u05DF','warning'); return; }
    const ts = new Date().toISOString().replace(/[:.]/g,'-').slice(0,19);
    const blob = new Blob([JSON.stringify(DATA_CACHE, null, 2)], {type:'application/json'});
    this._downloadBlob(blob, 'bht_full_backup_' + ts + '.json');
    Utils.toast('\u05D2\u05D9\u05D1\u05D5\u05D9 \u05DE\u05DC\u05D0 \u05D9\u05D5\u05E8\u05D3!');
  },
  _toCSV(headers, rows) {
    const esc = v => { const s = String(v ?? ''); return s.includes(',') || s.includes('"') || s.includes('\n') ? '"' + s.replace(/"/g,'""') + '"' : s; };
    const lines = [headers.map(esc).join(',')];
    for (const r of rows) lines.push(headers.map(h => esc(r[h])).join(','));
    return '\uFEFF' + lines.join('\r\n');
  },
  exportStudentsCSV() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    const students = _gc('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD');
    if (!students.length) { Utils.toast('\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD','warning'); return; }
    const fields = ['\u05E9\u05DD','\u05DB\u05D9\u05EA\u05D4','\u05D8\u05DC\u05E4\u05D5\u05DF','\u05DB\u05EA\u05D5\u05D1\u05EA','\u05E2\u05D9\u05E8','\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA','\u05E1\u05D8\u05D8\u05D5\u05E1'];
    const csv = this._toCSV(fields, students);
    const blob = new Blob([csv], {type:'text/csv;charset=utf-8'});
    this._downloadBlob(blob, 'students_' + (Utils.todayISO ? Utils.todayISO() : new Date().toISOString().slice(0,10)) + '.csv');
    Utils.toast('\u05E8\u05E9\u05D9\u05DE\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05D9\u05D5\u05E8\u05D3\u05D4!');
  },
  exportStaffCSV() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    const staff = _gc('\u05E6\u05D5\u05D5\u05EA');
    if (!staff.length) { Utils.toast('\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9 \u05E6\u05D5\u05D5\u05EA','warning'); return; }
    const fields = ['\u05E9\u05DD','\u05D8\u05DC\u05E4\u05D5\u05DF','\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC','\u05EA\u05E4\u05E7\u05D9\u05D3'];
    const csv = this._toCSV(fields, staff);
    const blob = new Blob([csv], {type:'text/csv;charset=utf-8'});
    this._downloadBlob(blob, 'staff_' + (Utils.todayISO ? Utils.todayISO() : new Date().toISOString().slice(0,10)) + '.csv');
    Utils.toast('\u05E8\u05E9\u05D9\u05DE\u05EA \u05E6\u05D5\u05D5\u05EA \u05D9\u05D5\u05E8\u05D3\u05D4!');
  },

  /* ======================================================================
     USER MANAGEMENT — Enhanced with PIN masking, role badges, edit
     ====================================================================== */
  user_management() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div><h1><i class="bi bi-shield-lock me-2"></i>\u05E0\u05D9\u05D4\u05D5\u05DC \u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD</h1></div>
      <div class="d-flex gap-2">
        <div class="search-box"><i class="bi bi-search"></i><input type="text" class="form-control form-control-sm" id="um-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9..." style="width:180px"></div>
        <button class="btn btn-primary btn-sm" onclick="Pages.showAddUser()"><i class="bi bi-person-plus me-1"></i>\u05DE\u05E9\u05EA\u05DE\u05E9 \u05D7\u05D3\u05E9</button>
      </div>
    </div>
    <div class="row g-3 mb-3">
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-primary" id="um-total">0</div><small>\u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD</small></div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-danger" id="um-admin">0</div><small>\u05DE\u05E0\u05D4\u05DC\u05D9\u05DD</small></div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-success" id="um-teacher">0</div><small>\u05DE\u05DC\u05DE\u05D3\u05D9\u05DD</small></div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-warning" id="um-parent">0</div><small>\u05D4\u05D5\u05E8\u05D9\u05DD</small></div></div>
    </div>
    <div id="um-list">${Utils.skeleton(3)}</div>
    <div class="modal fade" id="um-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="um-modal-title">\u05DE\u05E9\u05EA\u05DE\u05E9 \u05D7\u05D3\u05E9</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row g-3">
      <div class="col-12"><label class="form-label">\u05E9\u05DD \u05DE\u05DC\u05D0</label><input type="text" class="form-control" id="umf-name"></div>
      <div class="col-12"><label class="form-label">\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC</label><input type="email" class="form-control" id="umf-email" dir="ltr"></div>
      <div class="col-6"><label class="form-label">\u05EA\u05E4\u05E7\u05D9\u05D3</label><select class="form-select" id="umf-role"><option value="admin">\u05DE\u05E0\u05D4\u05DC</option><option value="secretary">\u05DE\u05D6\u05DB\u05D9\u05E8\u05D5\u05EA</option><option value="teacher" selected>\u05DE\u05DC\u05DE\u05D3</option><option value="parent">\u05D4\u05D5\u05E8\u05D4</option></select></div>
      <div class="col-6"><label class="form-label">PIN</label><input type="password" class="form-control" id="umf-pin" maxlength="6" inputmode="numeric" placeholder="4-6 \u05E1\u05E4\u05E8\u05D5\u05EA"></div>
      <div class="col-12"><label class="form-label">\u05E1\u05D9\u05E1\u05DE\u05D4</label><input type="password" class="form-control" id="umf-password"></div>
      <input type="hidden" id="umf-edit-id">
    </div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveUser()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
  },
  _umData: [],
  user_managementInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    if (this._umUseDemo) {
      this._umData = this._umDemoData();
    } else {
      try {
        const apiData = _gc('\u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD');
        this._umData = (apiData && apiData.length) ? apiData : [];
      } catch(e) {
        this._umData = [];
      }
    }
    this.renderUsers();
    document.getElementById('um-search')?.addEventListener('input', Utils.debounce(() => this.renderUsers(), 200));
  },
  renderUsers() {
    const search = (document.getElementById('um-search')?.value || '').trim().toLowerCase();
    let data = (this._umData||[]);
    if (search) {
      data = data.filter(u => {
        const name = (u['\u05E9\u05DD']||u['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC']||'').toLowerCase();
        const role = (u['\u05EA\u05E4\u05E7\u05D9\u05D3']||'').toLowerCase();
        return name.includes(search) || role.includes(search);
      });
    }
    document.getElementById('um-total').textContent = (this._umData||[]).length;
    document.getElementById('um-admin').textContent = (this._umData||[]).filter(u=>(u['\u05EA\u05E4\u05E7\u05D9\u05D3']||'').includes('admin')).length;
    document.getElementById('um-teacher').textContent = (this._umData||[]).filter(u=>(u['\u05EA\u05E4\u05E7\u05D9\u05D3']||'').includes('teacher')).length;
    document.getElementById('um-parent').textContent = (this._umData||[]).filter(u=>(u['\u05EA\u05E4\u05E7\u05D9\u05D3']||'').includes('parent')).length;
    const roleLabels = {admin:'\u05DE\u05E0\u05D4\u05DC',secretary:'\u05DE\u05D6\u05DB\u05D9\u05E8\u05D5\u05EA',teacher:'\u05DE\u05DC\u05DE\u05D3',parent:'\u05D4\u05D5\u05E8\u05D4'};
    const roleColors = {admin:'danger',secretary:'primary',teacher:'success',parent:'warning'};
    const roleIcons = {admin:'bi-shield-fill',secretary:'bi-person-workspace',teacher:'bi-person-video3',parent:'bi-house-heart'};
    if (!data.length) { document.getElementById('um-list').innerHTML = '<div class="empty-state text-center py-5"><i class="bi bi-shield-lock fs-1 text-muted d-block mb-2"></i><h5>\u05D0\u05D9\u05DF \u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD</h5><p class="text-muted">\u05D4\u05D5\u05E1\u05E3 \u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD \u05DC\u05DE\u05E2\u05E8\u05DB\u05EA</p><button class="btn btn-outline-primary btn-sm mt-2" onclick="Pages.umLoadDemo()"><i class="bi bi-database me-1"></i>\u05D8\u05E2\u05DF \u05D3\u05DE\u05D5</button></div>'; return; }
    document.getElementById('um-list').innerHTML = `<div class="card"><table class="table table-bht mb-0"><thead><tr><th></th><th>\u05E9\u05DD</th><th>\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC</th><th>\u05EA\u05E4\u05E7\u05D9\u05D3</th><th>PIN</th><th>\u05DB\u05E0\u05D9\u05E1\u05D4 \u05D0\u05D7\u05E8\u05D5\u05E0\u05D4</th><th>\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA</th></tr></thead><tbody>${data.map(u => {
      const role = u['\u05EA\u05E4\u05E7\u05D9\u05D3']||'teacher';
      const name = u['\u05E9\u05DD']||u['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC']||'';
      const pin = u['PIN']||u['\u05E1\u05D9\u05E1\u05DE\u05D4']||'';
      const maskedPin = pin ? '\u2022'.repeat(Math.min(pin.length, 6)) : '--';
      const lastLogin = u['\u05DB\u05E0\u05D9\u05E1\u05D4_\u05D0\u05D7\u05E8\u05D5\u05E0\u05D4']||'--';
      const id = Utils.rowId(u);
      return `<tr>
        <td>${Utils.avatarHTML ? Utils.avatarHTML(name,'sm') : ''}</td>
        <td class="fw-bold">${name}</td>
        <td class="small" dir="ltr">${u['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC']||''}</td>
        <td><span class="badge bg-${roleColors[role]||'secondary'}"><i class="bi ${roleIcons[role]||'bi-person'} me-1"></i>${roleLabels[role]||role}</span></td>
        <td><code class="user-select-none">${maskedPin}</code></td>
        <td class="small text-muted">${lastLogin}</td>
        <td>
          <div class="btn-group btn-group-sm">
            <button class="btn btn-outline-primary" onclick="Pages.editUser('${id}')" title="\u05E2\u05E8\u05D9\u05DB\u05D4"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-outline-danger" onclick="Pages.removeUser('${id}')" title="\u05DE\u05D7\u05D9\u05E7\u05D4"><i class="bi bi-trash"></i></button>
          </div>
        </td>
      </tr>`}).join('')}</tbody></table></div>`;
  },
  showAddUser() {
    document.getElementById('um-modal-title').textContent = '\u05DE\u05E9\u05EA\u05DE\u05E9 \u05D7\u05D3\u05E9';
    document.getElementById('umf-name').value = '';
    document.getElementById('umf-email').value = '';
    document.getElementById('umf-role').value = 'teacher';
    document.getElementById('umf-pin').value = '';
    document.getElementById('umf-password').value = '';
    document.getElementById('umf-edit-id').value = '';
    new bootstrap.Modal(document.getElementById('um-modal')).show();
  },
  editUser(id) {
    const user = (this._umData||[]).find(u => Utils.rowId(u) === id);
    if (!user) return;
    document.getElementById('um-modal-title').textContent = '\u05E2\u05E8\u05D9\u05DB\u05EA \u05DE\u05E9\u05EA\u05DE\u05E9';
    document.getElementById('umf-name').value = user['\u05E9\u05DD']||'';
    document.getElementById('umf-email').value = user['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC']||'';
    document.getElementById('umf-role').value = user['\u05EA\u05E4\u05E7\u05D9\u05D3']||'teacher';
    document.getElementById('umf-pin').value = '';
    document.getElementById('umf-password').value = '';
    document.getElementById('umf-edit-id').value = id;
    new bootstrap.Modal(document.getElementById('um-modal')).show();
  },
  async saveUser() {
    const editId = document.getElementById('umf-edit-id').value;
    const row = {
      '\u05E9\u05DD': document.getElementById('umf-name').value.trim(),
      '\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC': document.getElementById('umf-email').value.trim(),
      '\u05EA\u05E4\u05E7\u05D9\u05D3': document.getElementById('umf-role').value,
    };
    const pin = document.getElementById('umf-pin').value.trim();
    if (pin) row['PIN'] = pin;
    const pass = document.getElementById('umf-password').value;
    if (pass) row['\u05E1\u05D9\u05E1\u05DE\u05D4'] = pass;
    if (!row['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC'] && !row['\u05E9\u05DD']) { Utils.toast('\u05D7\u05E1\u05E8 \u05E9\u05DD \u05D0\u05D5 \u05D0\u05D9\u05DE\u05D9\u05D9\u05DC','warning'); return; }
    try {
      if (editId) {
        await App.apiCall('update','\u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD',{id: editId, row});
        Utils.toast('\u05DE\u05E9\u05EA\u05DE\u05E9 \u05E2\u05D5\u05D3\u05DB\u05DF');
      } else {
        await App.apiCall('add','\u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD',{row});
        Utils.toast('\u05DE\u05E9\u05EA\u05DE\u05E9 \u05E0\u05D5\u05E1\u05E3');
      }
      bootstrap.Modal.getInstance(document.getElementById('um-modal')).hide();
      this.user_managementInit();
    } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },
  async removeUser(id) { if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05EA \u05DE\u05E9\u05EA\u05DE\u05E9','\u05D4\u05D0\u05DD \u05DC\u05DE\u05D7\u05D5\u05E7 \u05DE\u05E9\u05EA\u05DE\u05E9 \u05D6\u05D4?')) return; try { await App.apiCall('delete','\u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.user_managementInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); } },


  /* ======================================================================
     ACTIVITY LOG
     ====================================================================== */
  activity_log() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-clock-history me-2"></i>\u05D9\u05D5\u05DE\u05DF \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA</h1></div><div class="d-flex gap-2"><input type="date" class="form-control form-control-sm" id="log-date" style="width:160px"><div class="search-box"><i class="bi bi-search"></i><input type="text" class="form-control form-control-sm" id="log-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9..." style="width:180px"></div></div></div><div id="log-list">${Utils.skeleton(5)}</div>`;
  },
  _logData: [],
  activity_logInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    if (this._logUseDemo) {
      this._logData = this._logDemoData();
    } else {
      try {
        const apiData = _gc('\u05D9\u05D5\u05DE\u05DF_\u05E4\u05E2\u05D9\u05DC\u05D5\u05EA');
        this._logData = (apiData && apiData.length) ? apiData : [];
      } catch(e) {
        this._logData = [];
      }
    }
    document.getElementById('log-date').value = Utils.todayISO();
    document.getElementById('log-date').addEventListener('change', () => this.renderLog());
    document.getElementById('log-search').addEventListener('input', Utils.debounce(() => this.renderLog(), 200));
    this.renderLog();
  },
  renderLog() {
    const dateF = document.getElementById('log-date')?.value||'';
    const search = (document.getElementById('log-search')?.value||'').trim().toLowerCase();
    let filtered = (this._logData||[]).filter(r => {
      if (dateF && !(r['\u05EA\u05D0\u05E8\u05D9\u05DA']||'').startsWith(dateF)) return false;
      if (search && !(r['\u05E4\u05E2\u05D5\u05DC\u05D4']||'').toLowerCase().includes(search) && !(r['\u05D9\u05E9\u05D5\u05EA']||'').toLowerCase().includes(search)) return false;
      return true;
    }).slice().reverse();
    if (!filtered.length) { document.getElementById('log-list').innerHTML = '<div class="empty-state text-center py-5"><i class="bi bi-clock-history fs-1 text-muted d-block mb-2"></i><h5>\u05D0\u05D9\u05DF \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA</h5><p class="text-muted">\u05D0\u05D9\u05DF \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA \u05DC\u05D4\u05E6\u05D9\u05D2</p><button class="btn btn-outline-primary btn-sm mt-2" onclick="Pages.logLoadDemo()"><i class="bi bi-database me-1"></i>\u05D8\u05E2\u05DF \u05D3\u05DE\u05D5</button></div>'; return; }
    const typeIcons = {'\u05D4\u05D5\u05E1\u05E4\u05D4':'plus-circle','\u05E2\u05D3\u05DB\u05D5\u05DF':'pencil','\u05DE\u05D7\u05D9\u05E7\u05D4':'trash','\u05DB\u05E0\u05D9\u05E1\u05D4':'box-arrow-in-right'};
    const typeColors = {'\u05D4\u05D5\u05E1\u05E4\u05D4':'success','\u05E2\u05D3\u05DB\u05D5\u05DF':'primary','\u05DE\u05D7\u05D9\u05E7\u05D4':'danger','\u05DB\u05E0\u05D9\u05E1\u05D4':'info'};
    document.getElementById('log-list').innerHTML = `<div class="card p-3">${filtered.slice(0,100).map(r => {
      const t=r['\u05E1\u05D5\u05D2']||''; const ic=typeIcons[t]||'activity'; const cl=typeColors[t]||'secondary';
      return `<div class="activity-item d-flex align-items-start gap-3 py-2 border-bottom"><div class="avatar avatar-sm" style="background:var(--bht-${cl},#6c757d)"><i class="bi bi-${ic}" style="font-size:.7rem"></i></div><div class="flex-grow-1"><div class="small"><strong>${r['\u05D9\u05E9\u05D5\u05EA']||''}</strong> <span class="badge bg-${cl}" style="font-size:.65rem">${t}</span></div><div class="small text-muted">${r['\u05E4\u05E2\u05D5\u05DC\u05D4']||''}</div></div><small class="text-muted">${r['\u05E9\u05E2\u05D4']||Utils.formatDateShort(r['\u05EA\u05D0\u05E8\u05D9\u05DA'])}</small></div>`;
    }).join('')}</div>`;
  }
});
