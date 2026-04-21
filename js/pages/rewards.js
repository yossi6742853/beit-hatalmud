Object.assign(Pages, {
  _rewardStudents: [
    {name:'\u05D9\u05D5\u05E1\u05E3 \u05DB\u05D4\u05DF',points:450,redeemed:1},
    {name:'\u05DE\u05E9\u05D4 \u05DC\u05D5\u05D9',points:380,redeemed:0},
    {name:'\u05D0\u05D1\u05E8\u05D4\u05DD \u05D2\u05D5\u05DC\u05D3\u05D1\u05E8\u05D2',points:320,redeemed:2},
    {name:'\u05D3\u05D5\u05D3 \u05E4\u05E8\u05D9\u05D3\u05DE\u05DF',points:290,redeemed:1},
    {name:'\u05D0\u05DC\u05D9\u05D4\u05D5 \u05E9\u05E4\u05D9\u05E8\u05D0',points:210,redeemed:0}
  ],
  _prizes: [
    {name:'\u05E1\u05E4\u05E8 \u05DC\u05D1\u05D7\u05D9\u05E8\u05D4',cost:50,icon:'bi-book'},
    {name:'\u05E4\u05D9\u05E6\u05D4',cost:80,icon:'bi-emoji-smile'},
    {name:'\u05D9\u05D5\u05DD \u05D7\u05D5\u05E4\u05E9\u05D9',cost:150,icon:'bi-calendar-heart'},
    {name:'\u05E9\u05D5\u05D1\u05E8 \u05DE\u05EA\u05E0\u05D4',cost:200,icon:'bi-gift'},
    {name:'\u05D8\u05D9\u05D5\u05DC \u05DE\u05D9\u05D5\u05D7\u05D3',cost:500,icon:'bi-geo-alt'}
  ],
  _redeemHist: [
    {student:'\u05D9\u05D5\u05E1\u05E3 \u05DB\u05D4\u05DF',prize:'\u05E4\u05D9\u05E6\u05D4',date:'2026-04-18',cost:80},
    {student:'\u05D0\u05D1\u05E8\u05D4\u05DD \u05D2\u05D5\u05DC\u05D3\u05D1\u05E8\u05D2',prize:'\u05E1\u05E4\u05E8 \u05DC\u05D1\u05D7\u05D9\u05E8\u05D4',date:'2026-04-15',cost:50},
    {student:'\u05D0\u05D1\u05E8\u05D4\u05DD \u05D2\u05D5\u05DC\u05D3\u05D1\u05E8\u05D2',prize:'\u05E9\u05D5\u05D1\u05E8 \u05DE\u05EA\u05E0\u05D4',date:'2026-04-10',cost:200},
    {student:'\u05D3\u05D5\u05D3 \u05E4\u05E8\u05D9\u05D3\u05DE\u05DF',prize:'\u05E4\u05D9\u05E6\u05D4',date:'2026-04-08',cost:80}
  ],
  rewards() {
    const totalPts = this._rewardStudents.reduce((s,x)=>s+x.points,0);
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-gift me-2"></i>\u05E4\u05E8\u05E1\u05D9\u05DD \u05D5\u05EA\u05D2\u05DE\u05D5\u05DC\u05D9\u05DD</h1></div><button class="btn btn-primary btn-sm" onclick="Pages._grantPoints()"><i class="bi bi-plus-lg me-1"></i>\u05D4\u05E2\u05E0\u05E7 \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA</button></div>
      <div class="row g-3 mb-3"><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-primary">${totalPts}</div><small>\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA</small></div></div><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-success">${this._redeemHist.length}</div><small>\u05DE\u05D9\u05DE\u05D5\u05E9\u05D9\u05DD</small></div></div><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-warning">${this._prizes.length}</div><small>\u05E4\u05E8\u05E1\u05D9\u05DD \u05D1\u05E7\u05D8\u05DC\u05D5\u05D2</small></div></div><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold">${this._rewardStudents.length}</div><small>\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</small></div></div></div>
      <div class="row g-3"><div class="col-md-6"><div class="card p-3"><h5 class="mb-3"><i class="bi bi-trophy me-2"></i>\u05D8\u05D1\u05DC\u05EA \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA</h5><table class="table table-bht mb-0"><thead><tr><th>#</th><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th>\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA</th><th>\u05DE\u05D9\u05DE\u05D5\u05E9\u05D9\u05DD</th></tr></thead><tbody>${this._rewardStudents.map((s,i)=>`<tr><td><span class="badge bg-${i<3?['warning','secondary','info'][i]:'light text-dark'}">${i+1}</span></td><td class="fw-bold">${s.name}</td><td class="fw-bold text-primary">${s.points}</td><td>${s.redeemed}</td></tr>`).join('')}</tbody></table></div></div>
        <div class="col-md-6"><div class="card p-3"><h5 class="mb-3"><i class="bi bi-shop me-2"></i>\u05E7\u05D8\u05DC\u05D5\u05D2 \u05E4\u05E8\u05E1\u05D9\u05DD</h5>${this._prizes.map(p=>`<div class="d-flex justify-content-between align-items-center border-bottom py-2"><div><i class="bi ${p.icon} me-2 text-primary"></i>${p.name}</div><span class="badge bg-primary">${p.cost} \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA</span></div>`).join('')}</div>
        <div class="card p-3 mt-3"><h5 class="mb-3"><i class="bi bi-clock-history me-2"></i>\u05D4\u05D9\u05E1\u05D8\u05D5\u05E8\u05D9\u05D9\u05EA \u05DE\u05D9\u05DE\u05D5\u05E9\u05D9\u05DD</h5><table class="table table-bht table-sm mb-0"><thead><tr><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th>\u05E4\u05E8\u05E1</th><th>\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA</th><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th></tr></thead><tbody>${this._redeemHist.map(r=>`<tr><td>${r.student}</td><td>${r.prize}</td><td class="text-danger">-${r.cost}</td><td>${Utils.formatDateShort(r.date)}</td></tr>`).join('')}</tbody></table></div></div></div>`;
  },
  _grantPoints() { Utils.toast('\u05D8\u05D5\u05E4\u05E1 \u05D4\u05E2\u05E0\u05E7\u05EA \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA \u05D9\u05D5\u05D5\u05E1\u05E3 \u05D1\u05E7\u05E8\u05D5\u05D1','info'); }
});
