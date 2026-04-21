/* ===== BHT v5.3 — Admin ===== */
Object.assign(Pages, {
  /* ======================================================================
     REPORTS
     ====================================================================== */
  reports() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div><h1><i class="bi bi-file-earmark-bar-graph me-2"></i>\u05D3\u05D5\u05D7\u05D5\u05EA</h1></div>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-secondary btn-sm" onclick="window.print()"><i class="bi bi-printer me-1"></i>\u05D4\u05D3\u05E4\u05E1</button>
        </div>
      </div>
      <ul class="nav nav-pills mb-3" id="rpt-tabs">
        <li class="nav-item"><a class="nav-link active" href="#" data-rpt="overview">\u05E1\u05E7\u05D9\u05E8\u05D4 \u05DB\u05DC\u05DC\u05D9\u05EA</a></li>
        <li class="nav-item"><a class="nav-link" href="#" data-rpt="attendance">\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</a></li>
        <li class="nav-item"><a class="nav-link" href="#" data-rpt="finance">\u05DB\u05E1\u05E4\u05D9\u05DD</a></li>
        <li class="nav-item"><a class="nav-link" href="#" data-rpt="behavior">\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</a></li>
        <li class="nav-item"><a class="nav-link" href="#" data-rpt="classes">\u05DB\u05D9\u05EA\u05D5\u05EA</a></li>
      </ul>
      <div id="rpt-content">${Utils.skeleton(3)}</div>`;
  },
  async reportsInit() {
    document.querySelectorAll('#rpt-tabs .nav-link').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('#rpt-tabs .nav-link').forEach(x => x.classList.remove('active'));
        a.classList.add('active');
        this.loadReport(a.dataset.rpt);
      });
    });
    this.loadReport('overview');
  },
  async loadReport(type) {
    const c = document.getElementById('rpt-content');
    c.innerHTML = '<div class="text-center py-5"><div class="spinner-border"></div></div>';

    const [students, att, fin, beh] = await Promise.all([
      App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD').catch(()=>[]),
      App.getData('\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA').catch(()=>[]),
      App.getData('\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3').catch(()=>[]),
      App.getData('\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA').catch(()=>[])
    ]);
    const active = students.filter(s => (s['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') !== '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC');

    if (type === 'overview') {
      const present = att.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1']==='\u05E0\u05D5\u05DB\u05D7').length;
      const absent = att.filter(a => a['\u05E1\u05D8\u05D8\u05D5\u05E1']==='\u05D7\u05D9\u05E1\u05D5\u05E8').length;
      const totalFin = fin.reduce((s,f) => s+(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0), 0);
      const paidFin = fin.filter(f => (f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05E9\u05D5\u05DC\u05DD').reduce((s,f) => s+(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0), 0);
      const posB = beh.filter(b => b['\u05E1\u05D5\u05D2']==='\u05D7\u05D9\u05D5\u05D1\u05D9').length;
      const negB = beh.filter(b => b['\u05E1\u05D5\u05D2']==='\u05E9\u05DC\u05D9\u05DC\u05D9').length;

      c.innerHTML = `
        <div class="row g-3 mb-4">
          <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-primary">${active.length}</div><small>\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05E4\u05E2\u05D9\u05DC\u05D9\u05DD</small></div></div>
          <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-success">${att.length ? Math.round(present/att.length*100) : 0}%</div><small>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05DE\u05DE\u05D5\u05E6\u05E2\u05EA</small></div></div>
          <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-danger">${Utils.formatCurrency(totalFin-paidFin)}</div><small>\u05D7\u05D5\u05D1 \u05E4\u05EA\u05D5\u05D7</small></div></div>
          <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-2 fw-bold text-warning">${posB-negB}</div><small>\u05E0\u05D9\u05E7\u05D5\u05D3 \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA \u05E0\u05D8\u05D5</small></div></div>
        </div>
        <div class="row g-3">
          <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold"><i class="bi bi-bar-chart me-2"></i>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</h6><div style="height:250px"><canvas id="rpt-att-chart"></canvas></div></div></div>
          <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold"><i class="bi bi-pie-chart me-2"></i>\u05DE\u05E6\u05D1 \u05DB\u05E1\u05E4\u05D9</h6><div style="height:250px"><canvas id="rpt-fin-chart"></canvas></div></div></div>
          <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold"><i class="bi bi-star me-2"></i>\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</h6><div style="height:250px"><canvas id="rpt-beh-chart"></canvas></div></div></div>
          <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold"><i class="bi bi-people me-2"></i>\u05DB\u05D9\u05EA\u05D5\u05EA</h6><div style="height:250px"><canvas id="rpt-cls-chart"></canvas></div></div></div>
        </div>`;

      // Attendance bar
      const attCtx = document.getElementById('rpt-att-chart');
      if (attCtx) App.charts.rptAtt = new Chart(attCtx, {type:'bar', data:{labels:['\u05E0\u05D5\u05DB\u05D7','\u05D7\u05D9\u05E1\u05D5\u05E8','\u05D0\u05D9\u05D7\u05D5\u05E8'], datasets:[{data:[present, absent, att.filter(a=>a['\u05E1\u05D8\u05D8\u05D5\u05E1']==='\u05D0\u05D9\u05D7\u05D5\u05E8').length], backgroundColor:['#0f9d58','#ea4335','#f9ab00'], borderRadius:8}]}, options:{responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}}});

      // Finance doughnut
      const finCtx = document.getElementById('rpt-fin-chart');
      if (finCtx) App.charts.rptFin = new Chart(finCtx, {type:'doughnut', data:{labels:['\u05E9\u05D5\u05DC\u05DD','\u05D7\u05D5\u05D1'], datasets:[{data:[paidFin, totalFin-paidFin], backgroundColor:['#0f9d58','#ea4335'], borderWidth:0}]}, options:{responsive:true, maintainAspectRatio:false, cutout:'60%', plugins:{legend:{position:'bottom'}}}});

      // Behavior bar
      const behCtx = document.getElementById('rpt-beh-chart');
      if (behCtx) App.charts.rptBeh = new Chart(behCtx, {type:'bar', data:{labels:['\u05D7\u05D9\u05D5\u05D1\u05D9','\u05E9\u05DC\u05D9\u05DC\u05D9','\u05D4\u05E2\u05E8\u05D4'], datasets:[{data:[posB, negB, beh.filter(b=>b['\u05E1\u05D5\u05D2']==='\u05D4\u05E2\u05E8\u05D4').length], backgroundColor:['#0f9d58','#ea4335','#4285f4'], borderRadius:8}]}, options:{responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}}});

      // Classes pie
      const classes = {}; active.forEach(s => { const cl = s['\u05DB\u05D9\u05EA\u05D4']||'\u05D0\u05D7\u05E8'; classes[cl]=(classes[cl]||0)+1; });
      const clsCtx = document.getElementById('rpt-cls-chart');
      if (clsCtx) App.charts.rptCls = new Chart(clsCtx, {type:'pie', data:{labels:Object.keys(classes), datasets:[{data:Object.values(classes), backgroundColor:['#2563eb','#0f9d58','#f9ab00','#ea4335','#8b5cf6','#06b6d4','#ec4899'], borderWidth:0}]}, options:{responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'bottom'}}}});
    }
    else if (type === 'attendance') {
      // Group by date, last 14 days
      const byDate = {};
      att.forEach(a => { const d = a['\u05EA\u05D0\u05E8\u05D9\u05DA']||''; if (!d) return; if (!byDate[d]) byDate[d]={p:0,a:0,l:0}; if (a['\u05E1\u05D8\u05D8\u05D5\u05E1']==='\u05E0\u05D5\u05DB\u05D7') byDate[d].p++; else if (a['\u05E1\u05D8\u05D8\u05D5\u05E1']==='\u05D7\u05D9\u05E1\u05D5\u05E8') byDate[d].a++; else byDate[d].l++; });
      const dates = Object.keys(byDate).sort().slice(-14);

      // Per student attendance ranking
      const perStudent = {};
      att.forEach(a => { const n = a['\u05E9\u05DD']||a['\u05EA\u05DC\u05DE\u05D9\u05D3']||''; if (!n) return; if (!perStudent[n]) perStudent[n]={p:0,t:0}; perStudent[n].t++; if (a['\u05E1\u05D8\u05D8\u05D5\u05E1']==='\u05E0\u05D5\u05DB\u05D7') perStudent[n].p++; });
      const ranked = Object.keys(perStudent).map(n => ({name:n, pct:perStudent[n].t?Math.round(perStudent[n].p/perStudent[n].t*100):0})).sort((a,b)=>a.pct-b.pct);

      c.innerHTML = `
        <div class="card p-3 mb-3"><h6 class="fw-bold">\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA 14 \u05D9\u05DE\u05D9\u05DD \u05D0\u05D7\u05E8\u05D5\u05E0\u05D9\u05DD</h6><div style="height:300px"><canvas id="rpt-att14"></canvas></div></div>
        <div class="card p-3"><h6 class="fw-bold">\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05D1\u05E1\u05D9\u05DB\u05D5\u05DF (\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05E0\u05DE\u05D5\u05DB\u05D4)</h6>
          ${ranked.filter(r=>r.pct<80).length ? `<table class="table table-sm table-bht"><thead><tr><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th>\u05D0\u05D7\u05D5\u05D6 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</th><th>\u05DE\u05E6\u05D1</th></tr></thead><tbody>${ranked.filter(r=>r.pct<80).map(r => `<tr><td class="fw-bold">${r.name}</td><td>${r.pct}%</td><td><div class="progress" style="height:20px;width:120px"><div class="progress-bar ${r.pct>=60?'bg-warning':'bg-danger'}" style="width:${r.pct}%">${r.pct}%</div></div></td></tr>`).join('')}</tbody></table>` : '<div class="text-success text-center py-3"><i class="bi bi-check-circle me-1"></i>\u05DB\u05DC \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05DE\u05E2\u05DC 80% \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</div>'}
        </div>`;

      const att14Ctx = document.getElementById('rpt-att14');
      if (att14Ctx && dates.length) App.charts.rptAtt14 = new Chart(att14Ctx, {type:'bar', data:{labels:dates.map(d=>d.substring(5)), datasets:[{label:'\u05E0\u05D5\u05DB\u05D7',data:dates.map(d=>byDate[d].p),backgroundColor:'#0f9d58'},{label:'\u05D7\u05D9\u05E1\u05D5\u05E8',data:dates.map(d=>byDate[d].a),backgroundColor:'#ea4335'},{label:'\u05D0\u05D9\u05D7\u05D5\u05E8',data:dates.map(d=>byDate[d].l),backgroundColor:'#f9ab00'}]}, options:{responsive:true, maintainAspectRatio:false, scales:{x:{stacked:true},y:{stacked:true,beginAtZero:true}}, plugins:{legend:{position:'top'}}}});
    }
    else if (type === 'finance') {
      // Monthly breakdown
      const byMonth = {};
      fin.forEach(f => { const m = f['\u05D7\u05D5\u05D3\u05E9']||''; if (!m) return; if (!byMonth[m]) byMonth[m]={total:0,paid:0}; byMonth[m].total += Number(f['\u05E1\u05DB\u05D5\u05DD'])||0; if ((f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05E9\u05D5\u05DC\u05DD') byMonth[m].paid += Number(f['\u05E1\u05DB\u05D5\u05DD'])||0; });
      const months = Object.keys(byMonth).sort().slice(-6);

      c.innerHTML = `
        <div class="row g-3 mb-3">
          <div class="col-md-4"><div class="card p-3 text-center"><div class="fs-3 fw-bold">${Utils.formatCurrency(fin.reduce((s,f)=>s+(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0),0))}</div><small>\u05E1\u05D4"\u05DB</small></div></div>
          <div class="col-md-4"><div class="card p-3 text-center"><div class="fs-3 fw-bold text-success">${Utils.formatCurrency(fin.filter(f=>(f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')==='\u05E9\u05D5\u05DC\u05DD').reduce((s,f)=>s+(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0),0))}</div><small>\u05E0\u05D2\u05D1\u05D4</small></div></div>
          <div class="col-md-4"><div class="card p-3 text-center"><div class="fs-3 fw-bold text-danger">${Utils.formatCurrency(fin.filter(f=>(f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'')!=='\u05E9\u05D5\u05DC\u05DD').reduce((s,f)=>s+(Number(f['\u05E1\u05DB\u05D5\u05DD'])||0),0))}</div><small>\u05D7\u05D5\u05D1</small></div></div>
        </div>
        <div class="card p-3"><h6 class="fw-bold">\u05DE\u05D2\u05DE\u05D4 \u05D7\u05D5\u05D3\u05E9\u05D9\u05EA</h6><div style="height:300px"><canvas id="rpt-fin-monthly"></canvas></div></div>`;

      const fmCtx = document.getElementById('rpt-fin-monthly');
      if (fmCtx && months.length) App.charts.rptFinM = new Chart(fmCtx, {type:'bar', data:{labels:months, datasets:[{label:'\u05D7\u05D9\u05D5\u05D1',data:months.map(m=>byMonth[m].total),backgroundColor:'rgba(37,99,235,.3)',borderColor:'#2563eb',borderWidth:2},{label:'\u05D2\u05D1\u05D9\u05D4',data:months.map(m=>byMonth[m].paid),backgroundColor:'rgba(15,157,88,.3)',borderColor:'#0f9d58',borderWidth:2}]}, options:{responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'top'}}}});
    }
    else if (type === 'behavior') {
      const scores = {};
      beh.forEach(r => { const n = r['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3']||r['\u05E9\u05DD']||r['\u05EA\u05DC\u05DE\u05D9\u05D3']||''; if (!n) return; if (!scores[n]) scores[n]={p:0,n:0}; if (r['\u05E1\u05D5\u05D2']==='\u05D7\u05D9\u05D5\u05D1\u05D9') scores[n].p++; else if (r['\u05E1\u05D5\u05D2']==='\u05E9\u05DC\u05D9\u05DC\u05D9') scores[n].n++; });
      const sorted = Object.keys(scores).map(n => ({name:n, net:scores[n].p-scores[n].n, pos:scores[n].p, neg:scores[n].n})).sort((a,b)=>b.net-a.net);

      c.innerHTML = `
        <div class="card p-3 mb-3"><h6 class="fw-bold">\u05E0\u05D9\u05E7\u05D5\u05D3 \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA \u05DC\u05E4\u05D9 \u05EA\u05DC\u05DE\u05D9\u05D3</h6><div style="height:350px"><canvas id="rpt-beh-rank"></canvas></div></div>
        <div class="card p-3"><h6 class="fw-bold">\u05D8\u05D1\u05DC\u05D4 \u05DE\u05E4\u05D5\u05E8\u05D8\u05EA</h6><table class="table table-sm table-bht"><thead><tr><th>#</th><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th>\u05D7\u05D9\u05D5\u05D1\u05D9</th><th>\u05E9\u05DC\u05D9\u05DC\u05D9</th><th>\u05E0\u05D8\u05D5</th></tr></thead><tbody>${sorted.map((r,i) => `<tr><td>${i+1}</td><td class="fw-bold">${r.name}</td><td class="text-success">${r.pos}</td><td class="text-danger">${r.neg}</td><td class="fw-bold ${r.net>=0?'text-success':'text-danger'}">${r.net>=0?'+':''}${r.net}</td></tr>`).join('')}</tbody></table></div>`;

      const brCtx = document.getElementById('rpt-beh-rank');
      if (brCtx && sorted.length) App.charts.rptBehR = new Chart(brCtx, {type:'bar', data:{labels:sorted.slice(0,15).map(r=>r.name), datasets:[{label:'\u05D7\u05D9\u05D5\u05D1\u05D9',data:sorted.slice(0,15).map(r=>r.pos),backgroundColor:'#0f9d58'},{label:'\u05E9\u05DC\u05D9\u05DC\u05D9',data:sorted.slice(0,15).map(r=>-r.neg),backgroundColor:'#ea4335'}]}, options:{responsive:true, maintainAspectRatio:false, indexAxis:'y', scales:{x:{stacked:true},y:{stacked:true}}, plugins:{legend:{position:'top'}}}});
    }
    else if (type === 'classes') {
      const classes = {};
      active.forEach(s => { const cls = s['\u05DB\u05D9\u05EA\u05D4']||'\u05D0\u05D7\u05E8'; if (!classes[cls]) classes[cls]=[]; classes[cls].push(s); });

      c.innerHTML = `<div class="row g-3">${Object.keys(classes).sort().map(cls => {
        const list = classes[cls];
        return `<div class="col-md-6"><div class="card p-3"><h6 class="fw-bold"><i class="bi bi-people-fill text-primary me-2"></i>\u05DB\u05D9\u05EA\u05D4 ${cls} <span class="badge bg-primary">${list.length}</span></h6><div class="mt-2">${list.map(s => `<div class="d-flex align-items-center gap-2 py-1 border-bottom">${Utils.avatarHTML(Utils.fullName(s),'sm')}<a href="#student/${Utils.rowId(s)}" class="text-decoration-none">${Utils.fullName(s)}</a></div>`).join('')}</div></div></div>`;
      }).join('')}</div>`;
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
      this._timerSeconds--;
      if (this._timerSeconds <= 0) {
        clearInterval(this._timerInterval);
        this._timerInterval = null;
        this._timerSeconds = 0;
        Utils.toast('\u23F0 \u05D4\u05E9\u05D9\u05E2\u05D5\u05E8 \u05D4\u05E1\u05EA\u05D9\u05D9\u05DD!','warning');
        try { new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAABBBAABACIWAAAiVgAEABAAAABkYXRhO28T/w==').play(); } catch(e){}
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
     HELP
     ====================================================================== */
  help() {
    return `<div class="page-header"><h1><i class="bi bi-question-circle-fill me-2"></i>\u05E2\u05D6\u05E8\u05D4</h1></div>
      <div class="row g-3">
        <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold"><i class="bi bi-keyboard me-2"></i>\u05E7\u05D9\u05E6\u05D5\u05E8\u05D9 \u05DE\u05E7\u05DC\u05D3\u05EA</h6><ul class="small mb-0"><li><strong>P</strong> \u2014 \u05E0\u05D5\u05DB\u05D7</li><li><strong>A</strong> \u2014 \u05D7\u05D9\u05E1\u05D5\u05E8</li><li><strong>L</strong> \u2014 \u05D0\u05D9\u05D7\u05D5\u05E8</li><li><strong>Esc</strong> \u2014 \u05E1\u05D2\u05D5\u05E8 \u05D7\u05DC\u05D5\u05E0\u05D5\u05EA</li></ul></div></div>
        <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold"><i class="bi bi-info-circle me-2"></i>\u05D0\u05D5\u05D3\u05D5\u05EA</h6><ul class="small mb-0"><li>\u05D2\u05E8\u05E1\u05D4: 5.0 (GitHub Pages)</li><li>\u05E4\u05DC\u05D8\u05E4\u05D5\u05E8\u05DE\u05D4: GitHub Pages + Google Sheets API</li><li>\u05DE\u05E4\u05EA\u05D7: \u05D9\u05D5\u05E1\u05E3 \u05E9\u05E0\u05D9\u05D9\u05D3\u05E8</li></ul></div></div>
        <div class="col-12"><div class="card p-3"><h6 class="fw-bold"><i class="bi bi-book me-2"></i>\u05D3\u05E4\u05D9\u05DD \u05D6\u05DE\u05D9\u05E0\u05D9\u05DD</h6><div class="row g-2">${[
          {p:'dashboard',l:'\u05DC\u05D5\u05D7 \u05D1\u05E7\u05E8\u05D4'},{p:'students',l:'\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD'},{p:'staff',l:'\u05E6\u05D5\u05D5\u05EA'},{p:'parents',l:'\u05D4\u05D5\u05E8\u05D9\u05DD'},
          {p:'attendance',l:'\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA'},{p:'behavior',l:'\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA'},{p:'homework',l:'\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9 \u05D1\u05D9\u05EA'},{p:'academics',l:'\u05DE\u05D1\u05D7\u05E0\u05D9\u05DD'},
          {p:'tasks',l:'\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA'},{p:'calendar',l:'\u05DC\u05D5\u05D7 \u05E9\u05E0\u05D4'},{p:'finance',l:'\u05DB\u05E1\u05E4\u05D9\u05DD'},{p:'pettycash',l:'\u05E7\u05D5\u05E4\u05D4 \u05E7\u05D8\u05E0\u05D4'},
          {p:'budget',l:'\u05EA\u05E7\u05E6\u05D9\u05D1'},{p:'trips',l:'\u05D8\u05D9\u05D5\u05DC\u05D9\u05DD'},{p:'mivtza',l:'\u05DE\u05D1\u05E6\u05E2 \u05DC\u05D9\u05DE\u05D5\u05D3'},{p:'reports',l:'\u05D3\u05D5\u05D7\u05D5\u05EA'},
          {p:'rankings',l:'\u05D3\u05D9\u05E8\u05D5\u05D2\u05D9\u05DD'},{p:'communications',l:'\u05EA\u05E7\u05E9\u05D5\u05E8\u05EA'},{p:'documents',l:'\u05DE\u05E1\u05DE\u05DB\u05D9\u05DD'},{p:'committees',l:'\u05D5\u05E2\u05D3\u05D5\u05EA'},
          {p:'institutions',l:'\u05DE\u05E1\u05D2\u05E8\u05D5\u05EA'},{p:'ai_assistant',l:'\u05E2\u05D5\u05D6\u05E8 AI'},{p:'forms',l:'\u05D8\u05E4\u05E1\u05D9\u05DD'},{p:'help',l:'\u05E2\u05D6\u05E8\u05D4'}
        ].map(x => `<div class="col-6 col-md-3"><a href="#${x.p}" class="text-decoration-none small">${x.l}</a></div>`).join('')}</div></div></div>
      </div>`;
  },
  helpInit() {},


  /* ======================================================================
     PHONE DIALER
     ====================================================================== */
  _dialNumber: '',
  phone() {
    const num = this._dialNumber || '';
    return `<div class="page-header"><h1><i class="bi bi-telephone-fill me-2"></i>\u05D8\u05DC\u05E4\u05D5\u05DF</h1></div><div class="row g-4"><div class="col-md-5"><div class="card p-3"><div class="dialer-display" id="dial-display">${num}</div><div class="dialer-grid">${[1,2,3,4,5,6,7,8,9,'*',0,'#'].map(d=>`<button class="dialer-btn" onclick="Pages.dialPress('${d}')">${d}</button>`).join('')}</div><div class="d-flex gap-2 justify-content-center mt-2"><button class="dialer-btn dialer-delete" onclick="Pages.dialBackspace()"><i class="bi bi-backspace"></i></button><button class="dialer-btn dialer-call" onclick="Pages.makeCall()"><i class="bi bi-telephone-fill"></i></button><button class="dialer-btn" onclick="Pages.dialClear()" style="color:var(--bht-danger,#dc3545)"><i class="bi bi-x-lg"></i></button></div></div></div><div class="col-md-7"><div class="card p-3"><h6 class="fw-bold mb-3"><i class="bi bi-people me-2"></i>\u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8</h6><div id="phone-contacts">\u05D8\u05D5\u05E2\u05DF...</div></div></div></div>`;
  },
  async phoneInit() {
    const staff = await App.getData('\u05E6\u05D5\u05D5\u05EA');
    const contacts = staff.filter(s=>s['\u05D8\u05DC\u05E4\u05D5\u05DF']).map(s=>({name:Utils.fullName(s),phone:s['\u05D8\u05DC\u05E4\u05D5\u05DF'],role:s['\u05EA\u05E4\u05E7\u05D9\u05D3']||''}));
    document.getElementById('phone-contacts').innerHTML = contacts.length ? contacts.map(c=>`<div class="d-flex align-items-center gap-3 py-2 border-bottom clickable" onclick="Pages.quickDial('${c.phone}')">${Utils.avatarHTML(c.name,'sm')}<div class="flex-grow-1"><div class="fw-bold small">${c.name}</div><small class="text-muted">${c.role}</small></div><small dir="ltr">${Utils.formatPhone(c.phone)}</small></div>`).join('') : '<div class="text-muted text-center">\u05D0\u05D9\u05DF \u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8</div>';
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
     SETTINGS
     ====================================================================== */
  settings() {
    const currentTheme = localStorage.getItem(App.THEME_KEY) || 'light';
    const apiUrl = localStorage.getItem('bht_api_url') || App.API_URL;
    return `<div class="page-header"><h1><i class="bi bi-gear-fill me-2"></i>\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA</h1></div><div class="row g-3">
      <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold mb-3"><i class="bi bi-palette me-2"></i>\u05DE\u05E8\u05D0\u05D4</h6><div class="form-check form-switch mb-3"><input class="form-check-input" type="checkbox" id="set-dark" ${currentTheme==='dark'?'checked':''}><label class="form-check-label" for="set-dark">\u05DE\u05E6\u05D1 \u05DB\u05D4\u05D4</label></div></div></div>
      <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold mb-3"><i class="bi bi-cloud me-2"></i>\u05D7\u05D9\u05D1\u05D5\u05E8 API</h6><div class="mb-3"><label class="form-label">\u05DB\u05EA\u05D5\u05D1\u05EA API</label><input type="url" class="form-control" id="set-api" value="${apiUrl}" dir="ltr"></div><button class="btn btn-primary btn-sm" onclick="Pages.saveApiUrl()"><i class="bi bi-check me-1"></i>\u05E9\u05DE\u05D5\u05E8</button></div></div>
      <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold mb-3"><i class="bi bi-database me-2"></i>\u05DE\u05D8\u05DE\u05D5\u05DF</h6><button class="btn btn-outline-warning btn-sm" onclick="Pages.clearCache()"><i class="bi bi-trash me-1"></i>\u05E0\u05E7\u05D4 \u05DE\u05D8\u05DE\u05D5\u05DF</button></div></div>
      <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold mb-3"><i class="bi bi-shield-lock me-2"></i>\u05D0\u05D1\u05D8\u05D7\u05D4</h6><div class="mb-3"><label class="form-label">\u05E7\u05D5\u05D3 PIN \u05D7\u05D3\u05E9</label><input type="password" class="form-control" id="set-pin" maxlength="6" inputmode="numeric"></div><button class="btn btn-primary btn-sm" onclick="Pages.changePin()"><i class="bi bi-key me-1"></i>\u05E2\u05D3\u05DB\u05D5\u05DF</button></div></div>

      <!-- Backup & Export -->
      <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold mb-3"><i class="bi bi-cloud-download me-2 text-primary"></i>\u05D2\u05D9\u05D1\u05D5\u05D9 \u05D5\u05D9\u05D9\u05E6\u05D5\u05D0</h6>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-outline-primary btn-sm" onclick="Pages.backupNow()"><i class="bi bi-cloud-arrow-up me-1"></i>\u05D2\u05D9\u05D1\u05D5\u05D9 \u05D1\u05E9\u05E8\u05EA</button>
          <button class="btn btn-outline-success btn-sm" onclick="Pages.exportAllData()"><i class="bi bi-download me-1"></i>\u05D9\u05D9\u05E6\u05D5\u05D0 \u05DB\u05DC \u05D4\u05DE\u05D9\u05D3\u05E2</button>
        </div>
        <div id="backup-result" class="mt-2"></div>
      </div></div>

      <!-- Self-Check -->
      <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold mb-3"><i class="bi bi-heart-pulse me-2 text-danger"></i>\u05D1\u05D3\u05D9\u05E7\u05EA \u05DE\u05E2\u05E8\u05DB\u05EA</h6>
        <button class="btn btn-outline-danger btn-sm" onclick="Pages.runSelfCheck()"><i class="bi bi-activity me-1"></i>\u05D4\u05E4\u05E2\u05DC \u05D1\u05D3\u05D9\u05E7\u05D4</button>
        <div id="selfcheck-result" class="mt-2"></div>
      </div></div>

      <!-- Email Actions -->
      <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold mb-3"><i class="bi bi-envelope me-2 text-info"></i>\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC</h6>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-outline-info btn-sm" onclick="Pages.sendStatusEmail()"><i class="bi bi-envelope-check me-1"></i>\u05E9\u05DC\u05D7 \u05D3\u05D5\u05D7 \u05D9\u05D5\u05DE\u05D9</button>
          <button class="btn btn-outline-warning btn-sm" onclick="Pages.sendPayReminders()"><i class="bi bi-cash-coin me-1"></i>\u05EA\u05D6\u05DB\u05D5\u05E8\u05EA \u05EA\u05E9\u05DC\u05D5\u05DD</button>
          <button class="btn btn-outline-success btn-sm" onclick="Pages.sendBehSummary()"><i class="bi bi-clipboard-data me-1"></i>\u05E1\u05D9\u05DB\u05D5\u05DD \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</button>
        </div>
        <div id="email-result" class="mt-2"></div>
      </div></div>

      <!-- Data Import -->
      <div class="col-md-6"><div class="card p-3"><h6 class="fw-bold mb-3"><i class="bi bi-box-arrow-in-down me-2 text-success"></i>\u05D9\u05D9\u05D1\u05D5\u05D0 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD</h6>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-outline-success btn-sm" onclick="Pages.runImport()"><i class="bi bi-arrow-repeat me-1"></i>\u05D9\u05D9\u05D1\u05D5\u05D0 \u05DE\u05DE\u05E7\u05D5\u05E8</button>
          <button class="btn btn-outline-secondary btn-sm" onclick="Pages.runSeed()"><i class="bi bi-magic me-1"></i>\u05E0\u05EA\u05D5\u05E0\u05D9 \u05D3\u05D5\u05D2\u05DE\u05D0</button>
        </div>
        <div id="import-result" class="mt-2"></div>
      </div></div>

      <div class="col-12"><div class="card p-3"><h6 class="fw-bold mb-3"><i class="bi bi-info-circle me-2"></i>\u05DE\u05D9\u05D3\u05E2 \u05DE\u05E2\u05E8\u05DB\u05EA</h6><div class="row g-2 small"><div class="col-sm-6"><strong>\u05D2\u05E8\u05E1\u05D4:</strong> 5.0</div><div class="col-sm-6"><strong>\u05E4\u05DC\u05D8\u05E4\u05D5\u05E8\u05DE\u05D4:</strong> GitHub Pages + Google Sheets</div><div class="col-sm-6"><strong>\u05DE\u05D5\u05E1\u05D3:</strong> \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3</div><div class="col-sm-6"><strong>\u05DE\u05E4\u05EA\u05D7:</strong> \u05D9\u05D5\u05E1\u05E3 \u05E9\u05E0\u05D9\u05D9\u05D3\u05E8</div></div></div></div></div>`;
  },
  settingsInit() { document.getElementById('set-dark').addEventListener('change', (e) => { localStorage.setItem(App.THEME_KEY, e.target.checked ? 'dark' : 'light'); App.applyTheme(); }); },
  saveApiUrl() { const url=document.getElementById('set-api').value.trim(); if (!url) { Utils.toast('\u05D7\u05E1\u05E8\u05D4 \u05DB\u05EA\u05D5\u05D1\u05EA','warning'); return; } localStorage.setItem('bht_api_url',url); App.API_URL=url; Utils.toast('API \u05E2\u05D5\u05D3\u05DB\u05DF'); },
  clearCache() { Object.keys(localStorage).forEach(k => { if (k.startsWith(App.CACHE_PREFIX)) localStorage.removeItem(k); }); Utils.toast('\u05DE\u05D8\u05DE\u05D5\u05DF \u05E0\u05D5\u05E7\u05D4'); },
  changePin() { const pin=document.getElementById('set-pin').value.trim(); if (pin.length<4) { Utils.toast('\u05D4\u05E7\u05D5\u05D3 \u05D7\u05D9\u05D9\u05D1 4-6 \u05E1\u05E4\u05E8\u05D5\u05EA','warning'); return; } localStorage.setItem(App.PIN_KEY, Utils.hashPin(pin)); document.getElementById('set-pin').value=''; Utils.toast('PIN \u05E2\u05D5\u05D3\u05DB\u05DF'); },
  // --- Backup ---
  async backupNow() {
    const el = document.getElementById('backup-result');
    el.innerHTML = '<div class="spinner-border spinner-border-sm"></div> \u05DE\u05D2\u05D1\u05D4...';
    try {
      const res = await App.apiCall('run', 'createBackup', {});
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
      for (const s of sheets) {
        try { allData[s] = await App.getData(s); } catch(e) { allData[s] = []; }
        loaded++;
        el.innerHTML = `<div class="spinner-border spinner-border-sm"></div> \u05DE\u05D9\u05D9\u05E6\u05D0... ${loaded}/${sheets.length}`;
      }
      Utils.exportJSON(allData, 'bht_backup_' + Utils.todayISO() + '.json');
      el.innerHTML = '<div class="text-success"><i class="bi bi-check-circle me-1"></i>\u05D2\u05D9\u05D1\u05D5\u05D9 \u05D4\u05D5\u05E9\u05DC\u05DD!</div>';
      Utils.toast('\u05D2\u05D9\u05D1\u05D5\u05D9 \u05D4\u05D5\u05E9\u05DC\u05DD!');
    } catch(e) { el.innerHTML = '<div class="text-danger"><i class="bi bi-x-circle me-1"></i>\u05E9\u05D2\u05D9\u05D0\u05D4</div>'; }
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


  /* ======================================================================
     USER MANAGEMENT
     ====================================================================== */
  user_management() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-shield-lock me-2"></i>\u05E0\u05D9\u05D4\u05D5\u05DC \u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD</h1></div><button class="btn btn-primary btn-sm" onclick="Pages.showAddUser()"><i class="bi bi-person-plus me-1"></i>\u05DE\u05E9\u05EA\u05DE\u05E9 \u05D7\u05D3\u05E9</button></div><div class="row g-3 mb-3"><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-primary" id="um-total">0</div><small>\u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD</small></div></div><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-danger" id="um-admin">0</div><small>\u05DE\u05E0\u05D4\u05DC\u05D9\u05DD</small></div></div><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-success" id="um-teacher">0</div><small>\u05DE\u05DC\u05DE\u05D3\u05D9\u05DD</small></div></div><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-warning" id="um-parent">0</div><small>\u05D4\u05D5\u05E8\u05D9\u05DD</small></div></div></div><div id="um-list">${Utils.skeleton(3)}</div><div class="modal fade" id="um-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="um-modal-title">\u05DE\u05E9\u05EA\u05DE\u05E9 \u05D7\u05D3\u05E9</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row g-3"><div class="col-12"><label class="form-label">\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC</label><input type="email" class="form-control" id="umf-email" dir="ltr"></div><div class="col-6"><label class="form-label">\u05EA\u05E4\u05E7\u05D9\u05D3</label><select class="form-select" id="umf-role"><option value="admin">\u05DE\u05E0\u05D4\u05DC</option><option value="secretary">\u05DE\u05D6\u05DB\u05D9\u05E8\u05D5\u05EA</option><option value="teacher" selected>\u05DE\u05DC\u05DE\u05D3</option><option value="parent">\u05D4\u05D5\u05E8\u05D4</option></select></div><div class="col-6"><label class="form-label">\u05E1\u05D9\u05E1\u05DE\u05D4</label><input type="password" class="form-control" id="umf-password"></div></div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveUser()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
  },
  _umData: [],
  async user_managementInit() {
    this._umData = await App.getData('\u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD');
    this.renderUsers();
  },
  renderUsers() {
    const data = this._umData||[];
    document.getElementById('um-total').textContent = data.length;
    document.getElementById('um-admin').textContent = data.filter(u=>(u['\u05EA\u05E4\u05E7\u05D9\u05D3']||'').includes('admin')).length;
    document.getElementById('um-teacher').textContent = data.filter(u=>(u['\u05EA\u05E4\u05E7\u05D9\u05D3']||'').includes('teacher')).length;
    document.getElementById('um-parent').textContent = data.filter(u=>(u['\u05EA\u05E4\u05E7\u05D9\u05D3']||'').includes('parent')).length;
    const roleLabels = {admin:'\u05DE\u05E0\u05D4\u05DC',secretary:'\u05DE\u05D6\u05DB\u05D9\u05E8\u05D5\u05EA',teacher:'\u05DE\u05DC\u05DE\u05D3',parent:'\u05D4\u05D5\u05E8\u05D4'};
    const roleColors = {admin:'danger',secretary:'primary',teacher:'success',parent:'warning'};
    if (!data.length) { document.getElementById('um-list').innerHTML = '<div class="empty-state"><i class="bi bi-shield-lock"></i><h5>\u05D0\u05D9\u05DF \u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD</h5></div>'; return; }
    document.getElementById('um-list').innerHTML = `<div class="card"><table class="table table-bht mb-0"><thead><tr><th>\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC</th><th>\u05EA\u05E4\u05E7\u05D9\u05D3</th><th>\u05DB\u05E0\u05D9\u05E1\u05D4 \u05D0\u05D7\u05E8\u05D5\u05E0\u05D4</th><th>\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA</th></tr></thead><tbody>${data.map(u => {const role=u['\u05EA\u05E4\u05E7\u05D9\u05D3']||'teacher'; return `<tr><td class="fw-bold">${u['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC']||u['\u05E9\u05DD']||''}</td><td><span class="badge bg-${roleColors[role]||'secondary'}">${roleLabels[role]||role}</span></td><td class="small text-muted">${u['\u05DB\u05E0\u05D9\u05E1\u05D4_\u05D0\u05D7\u05E8\u05D5\u05E0\u05D4']||'--'}</td><td><button class="btn btn-sm btn-outline-danger" onclick="Pages.removeUser('${Utils.rowId(u)}')"><i class="bi bi-trash"></i></button></td></tr>`}).join('')}</tbody></table></div>`;
  },
  showAddUser() { document.getElementById('um-modal-title').textContent = '\u05DE\u05E9\u05EA\u05DE\u05E9 \u05D7\u05D3\u05E9'; new bootstrap.Modal(document.getElementById('um-modal')).show(); },
  async saveUser() {
    const row = {'\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC':document.getElementById('umf-email').value.trim(),'\u05EA\u05E4\u05E7\u05D9\u05D3':document.getElementById('umf-role').value,'\u05E1\u05D9\u05E1\u05DE\u05D4':document.getElementById('umf-password').value};
    if (!row['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC']) { Utils.toast('\u05D7\u05E1\u05E8 \u05D0\u05D9\u05DE\u05D9\u05D9\u05DC','warning'); return; }
    try { await App.apiCall('add','\u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD',{row}); bootstrap.Modal.getInstance(document.getElementById('um-modal')).hide(); Utils.toast('\u05DE\u05E9\u05EA\u05DE\u05E9 \u05E0\u05D5\u05E1\u05E3'); this.user_managementInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },
  async removeUser(id) { if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05EA \u05DE\u05E9\u05EA\u05DE\u05E9','\u05D4\u05D0\u05DD \u05DC\u05DE\u05D7\u05D5\u05E7 \u05DE\u05E9\u05EA\u05DE\u05E9 \u05D6\u05D4?')) return; try { await App.apiCall('delete','\u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD',{id}); Utils.toast('\u05E0\u05DE\u05D7\u05E7'); this.user_managementInit(); } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); } },


  /* ======================================================================
     ACTIVITY LOG
     ====================================================================== */
  activity_log() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-clock-history me-2"></i>\u05D9\u05D5\u05DE\u05DF \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA</h1></div><div class="d-flex gap-2"><input type="date" class="form-control form-control-sm" id="log-date" style="width:160px"><div class="search-box"><i class="bi bi-search"></i><input type="text" class="form-control form-control-sm" id="log-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9..." style="width:180px"></div></div></div><div id="log-list">${Utils.skeleton(5)}</div>`;
  },
  _logData: [],
  async activity_logInit() {
    this._logData = await App.getData('\u05D9\u05D5\u05DE\u05DF_\u05E4\u05E2\u05D9\u05DC\u05D5\u05EA');
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
    if (!filtered.length) { document.getElementById('log-list').innerHTML = '<div class="empty-state"><i class="bi bi-clock-history"></i><h5>\u05D0\u05D9\u05DF \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA</h5></div>'; return; }
    const typeIcons = {'\u05D4\u05D5\u05E1\u05E4\u05D4':'plus-circle','\u05E2\u05D3\u05DB\u05D5\u05DF':'pencil','\u05DE\u05D7\u05D9\u05E7\u05D4':'trash','\u05DB\u05E0\u05D9\u05E1\u05D4':'box-arrow-in-right'};
    const typeColors = {'\u05D4\u05D5\u05E1\u05E4\u05D4':'success','\u05E2\u05D3\u05DB\u05D5\u05DF':'primary','\u05DE\u05D7\u05D9\u05E7\u05D4':'danger','\u05DB\u05E0\u05D9\u05E1\u05D4':'info'};
    document.getElementById('log-list').innerHTML = `<div class="card p-3">${filtered.slice(0,100).map(r => {
      const t=r['\u05E1\u05D5\u05D2']||''; const ic=typeIcons[t]||'activity'; const cl=typeColors[t]||'secondary';
      return `<div class="activity-item d-flex align-items-start gap-3 py-2 border-bottom"><div class="avatar avatar-sm" style="background:var(--bht-${cl},#6c757d)"><i class="bi bi-${ic}" style="font-size:.7rem"></i></div><div class="flex-grow-1"><div class="small"><strong>${r['\u05D9\u05E9\u05D5\u05EA']||''}</strong> <span class="badge bg-${cl}" style="font-size:.65rem">${t}</span></div><div class="small text-muted">${r['\u05E4\u05E2\u05D5\u05DC\u05D4']||''}</div></div><small class="text-muted">${r['\u05E9\u05E2\u05D4']||Utils.formatDateShort(r['\u05EA\u05D0\u05E8\u05D9\u05DA'])}</small></div>`;
    }).join('')}</div>`;
  }
});
