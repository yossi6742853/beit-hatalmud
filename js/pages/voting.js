Object.assign(Pages, {
  _polls: [
    {id:1,q:'\u05DE\u05EA\u05D9 \u05DC\u05E7\u05D9\u05D9\u05DD \u05D0\u05EA \u05D4\u05D8\u05D9\u05D5\u05DC \u05D4\u05E9\u05E0\u05EA\u05D9?',opts:['\u05D0\u05D9\u05D9\u05E8','\u05E1\u05D9\u05D5\u05DF','\u05EA\u05DE\u05D5\u05D6'],votes:[12,8,5],closed:false},
    {id:2,q:'\u05E0\u05D5\u05E9\u05D0 \u05DC\u05E9\u05D1\u05EA \u05D7\u05D9\u05D6\u05D5\u05E7',opts:['\u05D4\u05E8\u05E6\u05D0\u05EA \u05E8\u05D1','\u05E1\u05D9\u05D5\u05E8 \u05E9\u05D5\u05DC\u05D7\u05DF','\u05E1\u05E2\u05D5\u05D3\u05D4 \u05DE\u05E9\u05D5\u05EA\u05E4\u05EA'],votes:[15,7,10],closed:false},
    {id:3,q:'\u05E9\u05D1\u05D9\u05E2\u05D5\u05EA \u05D4\u05D5\u05E8\u05D9\u05DD - \u05D4\u05D0\u05DD \u05D0\u05EA\u05DD \u05DE\u05E8\u05D5\u05E6\u05D9\u05DD?',opts:['\u05DE\u05D0\u05D5\u05D3 \u05DE\u05E8\u05D5\u05E6\u05D4','\u05DE\u05E8\u05D5\u05E6\u05D4','\u05E1\u05D1\u05D9\u05E8','\u05DC\u05D0 \u05DE\u05E8\u05D5\u05E6\u05D4'],votes:[20,15,3,1],closed:true}
  ],
  voting() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-bar-chart-fill me-2"></i>\u05D4\u05E6\u05D1\u05E2\u05D5\u05EA \u05D5\u05E1\u05E7\u05E8\u05D9\u05DD</h1></div><button class="btn btn-primary btn-sm" onclick="Pages._addPoll()"><i class="bi bi-plus-lg me-1"></i>\u05E1\u05E7\u05E8 \u05D7\u05D3\u05E9</button></div>
      <div class="row g-3 mb-3"><div class="col-md-4"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-primary">${this._polls.length}</div><small>\u05E1\u05E7\u05E8\u05D9\u05DD</small></div></div><div class="col-md-4"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-success">${this._polls.reduce((s,p)=>s+p.votes.reduce((a,b)=>a+b,0),0)}</div><small>\u05E1\u05D4"\u05DB \u05D4\u05E6\u05D1\u05E2\u05D5\u05EA</small></div></div><div class="col-md-4"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-warning">${this._polls.filter(p=>!p.closed).length}</div><small>\u05E4\u05E2\u05D9\u05DC\u05D9\u05DD</small></div></div></div>
      <div id="poll-list"></div>`;
  },
  votingInit() {
    const el = document.getElementById('poll-list');
    el.innerHTML = this._polls.map(p => {
      const total = p.votes.reduce((a,b)=>a+b,0);
      const cid = 'poll-chart-'+p.id;
      return `<div class="card mb-3 p-3"><div class="d-flex justify-content-between"><h5>${p.q}</h5><span class="badge bg-${p.closed?'secondary':'success'}">${p.closed?'\u05E0\u05E1\u05D2\u05E8':'\u05E4\u05E2\u05D9\u05DC'}</span></div><div style="max-width:400px;max-height:200px"><canvas id="${cid}"></canvas></div>${!p.closed?'<div class="mt-2 d-flex gap-2 flex-wrap">'+p.opts.map((o,i)=>`<button class="btn btn-outline-primary btn-sm" onclick="Pages._vote(${p.id},${i})">${o}</button>`).join('')+'</div>':''}<div class="text-muted small mt-1">${total} \u05D4\u05E6\u05D1\u05E2\u05D5\u05EA</div></div>`;
    }).join('');
    this._polls.forEach(p => {
      const ctx = document.getElementById('poll-chart-'+p.id);
      if(ctx) new Chart(ctx,{type:'bar',data:{labels:p.opts,datasets:[{label:'\u05D4\u05E6\u05D1\u05E2\u05D5\u05EA',data:p.votes,backgroundColor:['#2563eb','#16a34a','#f59e0b','#ef4444']}]},options:{indexAxis:'y',responsive:true,plugins:{legend:{display:false}},scales:{x:{beginAtZero:true,ticks:{stepSize:1}}}}});
    });
  },
  _vote(pid,oi) { const p=this._polls.find(x=>x.id===pid); if(p&&!p.closed){p.votes[oi]++;App.navigate('voting');Utils.toast('\u05D4\u05E6\u05D1\u05E2\u05D4 \u05E0\u05E7\u05DC\u05D8\u05D4!');} },
  _addPoll() { Utils.toast('\u05D8\u05D5\u05E4\u05E1 \u05D9\u05E6\u05D9\u05E8\u05EA \u05E1\u05E7\u05E8 \u05D9\u05D5\u05D5\u05E1\u05E3 \u05D1\u05E7\u05E8\u05D5\u05D1','info'); }
});
