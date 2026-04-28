/* ===== BHT v6.0 — Rewards & Gamification (פרסים ותגמולים) ===== */
Object.assign(Pages, {

  /* ======================================================================
     DEMO DATA — 15 students, 10 prizes, 20 redemptions
     ====================================================================== */
  _rewardStudents: [

    { id: 'S1',  name: 'יוסף כהן',       class: 'כיתה א', points: 520,  totalEarned: 650,  redeemed: 3 },
    { id: 'S2',  name: 'משה לוי',         class: 'כיתה א', points: 410,  totalEarned: 510,  redeemed: 2 },
    { id: 'S3',  name: 'אברהם גולדברג',   class: 'כיתה א', points: 380,  totalEarned: 750,  redeemed: 5 }
  ],

  _prizes: [

    { id: 1,  name: 'ספר לבחירה',       cost: 50,  icon: 'bi-book',           category: 'לימודי', stock: 15 },
    { id: 2,  name: 'פיצה אישית',       cost: 80,  icon: 'bi-emoji-smile',    category: 'אוכל',   stock: 10 },
    { id: 3,  name: 'יום חופשי',         cost: 150, icon: 'bi-calendar-heart', category: 'חוויה',  stock: 5 }
  ],

  _redeemHist: [

    { id: 1,  student: 'יוסף כהן',       prize: 'פיצה אישית',       date: '2026-04-18', cost: 80,  category: 'אוכל' },
    { id: 2,  student: 'יוסף כהן',       prize: 'ספר לבחירה',       date: '2026-04-12', cost: 50,  category: 'לימודי' },
    { id: 3,  student: 'אברהם גולדברג',  prize: 'ספר לבחירה',       date: '2026-04-15', cost: 50,  category: 'לימודי' }
  ],

  /* Point grant history for weekly/monthly champion tracking */
  _rewardGrants: [

    { student: 'יוסף כהן',       amount: 50,  category: 'grades',     date: '2026-04-20', reason: 'מבחן מצוין' },
    { student: 'יוסף כהן',       amount: 30,  category: 'attendance', date: '2026-04-18', reason: 'נוכחות מלאה' },
    { student: 'יוסף כהן',       amount: 20,  category: 'behavior',   date: '2026-04-15', reason: 'התנהגות מצוינת' }
  ],

  /* ======================================================================
     LEVEL SYSTEM — every 100 totalEarned points = 1 level (max 10)
     ====================================================================== */
  _rewardLevels: [

    { min: 0,   max: 99,   level: 1,  name: 'ברונזה',  badge: 'bg-secondary',  icon: 'bi-shield' },
    { min: 100, max: 199,  level: 2,  name: 'ברונזה+', badge: 'bg-secondary',  icon: 'bi-shield-fill' },
    { min: 200, max: 299,  level: 3,  name: 'כסף',     badge: 'bg-info',       icon: 'bi-shield' }
  ],

  _rwdGetLevel(totalEarned) {
    return this._rewardLevels.find(l => totalEarned >= l.min && totalEarned <= l.max) || this._rewardLevels[0];
  },

  _rwdLevelProgress(totalEarned) {
    const lvl = this._rwdGetLevel(totalEarned);
    if (lvl.level === 10) return 100;
    const rangeSize = lvl.max - lvl.min + 1;
    return Math.round(((totalEarned - lvl.min) / rangeSize) * 100);
  },

  _rwdLevelBadge(totalEarned) {
    const lvl = this._rwdGetLevel(totalEarned);
    return '<span class="badge ' + lvl.badge + '"><i class="bi ' + lvl.icon + ' me-1"></i>' + lvl.name + ' (Lv.' + lvl.level + ')</span>';
  },

  /* ======================================================================
     CATEGORY HELPERS
     ====================================================================== */
  _rwdCategoryLabels: {
    attendance: 'נוכחות',
    grades: 'ציונים',
    behavior: 'התנהגות',
    special: 'מיוחד'
  },

  _rwdCategoryIcons: {
    attendance: 'bi-calendar-check',
    grades: 'bi-mortarboard',
    behavior: 'bi-heart',
    special: 'bi-star'
  },

  _rwdCategoryColors: {
    attendance: 'success',
    grades: 'primary',
    behavior: 'warning',
    special: 'danger'
  },

  /* ======================================================================
     WEEKLY / MONTHLY CHAMPION CALCULATION
     ====================================================================== */
  _rwdGetChampion(period) {
    const now = new Date();
    const grants = this._rewardGrants;
    let start;
    if (period === 'week') {
      start = new Date(now);
      start.setDate(start.getDate() - 7);
    } else {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
    }
    const startStr = start.toISOString().slice(0, 10);
    const filtered = grants.filter(g => g.date >= startStr);
    const byStudent = {};
    filtered.forEach(g => {
      byStudent[g.student] = (byStudent[g.student] || 0) + g.amount;
    });
    let champion = null;
    let maxPts = 0;
    Object.entries(byStudent).forEach(function(entry) {
      if (entry[1] > maxPts) { maxPts = entry[1]; champion = entry[0]; }
    });
    return { name: champion, points: maxPts };
  },

  /* ======================================================================
     CLASS COMPETITION DATA
     ====================================================================== */
  _rwdClassPoints() {
    var byClass = {};
    this._rewardStudents.forEach(function(s) {
      byClass[s.class] = (byClass[s.class] || 0) + s.points;
    });
    return byClass;
  },

  /* ======================================================================
     MAIN RENDER
     ====================================================================== */
  rewards() {
    var students = this._rewardStudents;
    var sorted = students.slice().sort(function(a, b) { return b.points - a.points; });
    var totalPts = students.reduce(function(s, x) { return s + x.points; }, 0);
    var totalEarnedAll = students.reduce(function(s, x) { return s + x.totalEarned; }, 0);
    var totalRedeemed = this._redeemHist.length;
    var totalStock = this._prizes.reduce(function(s, p) { return s + p.stock; }, 0);

    var weekChamp = this._rwdGetChampion('week');
    var monthChamp = this._rwdGetChampion('month');
    var classPoints = this._rwdClassPoints();

    return '\n' +
    '<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">' +
      '<div><h1><i class="bi bi-gift me-2"></i>\u05E4\u05E8\u05E1\u05D9\u05DD \u05D5\u05EA\u05D2\u05DE\u05D5\u05DC\u05D9\u05DD</h1>' +
      '<p class="text-muted mb-0">\u05DE\u05E2\u05E8\u05DB\u05EA \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA, \u05E8\u05DE\u05D5\u05EA \u05D5\u05E4\u05E8\u05E1\u05D9\u05DD \u05DC\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</p></div>' +
      '<div class="d-flex gap-2">' +
        '<button class="btn btn-success btn-sm" onclick="Pages._rewardShowGrant()"><i class="bi bi-plus-lg me-1"></i>\u05D4\u05E2\u05E0\u05E7 \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA</button>' +
        '<button class="btn btn-outline-primary btn-sm" onclick="Pages._rwdExportCSV()"><i class="bi bi-download me-1"></i>\u05D9\u05D9\u05E6\u05D5\u05D0</button>' +
      '</div>' +
    '</div>' +

    /* ---------- Stats cards ---------- */
    '<div class="row g-3 mb-3">' +
      '<div class="col-6 col-md-3"><div class="card p-3 text-center border-start border-primary border-4">' +
        '<div class="fs-4 fw-bold text-primary">' + totalPts.toLocaleString() + '</div>' +
        '<small class="text-muted">\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA</small></div></div>' +
      '<div class="col-6 col-md-3"><div class="card p-3 text-center border-start border-success border-4">' +
        '<div class="fs-4 fw-bold text-success">' + totalRedeemed + '</div>' +
        '<small class="text-muted">\u05DE\u05D9\u05DE\u05D5\u05E9\u05D9\u05DD</small></div></div>' +
      '<div class="col-6 col-md-3"><div class="card p-3 text-center border-start border-warning border-4">' +
        '<div class="fs-4 fw-bold text-warning">' + totalStock + '</div>' +
        '<small class="text-muted">\u05E4\u05E8\u05E1\u05D9\u05DD \u05D1\u05DE\u05DC\u05D0\u05D9</small></div></div>' +
      '<div class="col-6 col-md-3"><div class="card p-3 text-center border-start border-info border-4">' +
        '<div class="fs-4 fw-bold text-info">' + students.length + '</div>' +
        '<small class="text-muted">\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05E4\u05E2\u05D9\u05DC\u05D9\u05DD</small></div></div>' +
    '</div>' +

    /* ---------- Champions row ---------- */
    '<div class="row g-3 mb-3">' +
      '<div class="col-md-6">' +
        '<div class="card p-3">' +
          '<div class="d-flex align-items-center gap-3">' +
            '<div class="rounded-circle bg-warning bg-opacity-25 d-flex align-items-center justify-content-center" style="width:50px;height:50px"><i class="bi bi-star-fill text-warning fs-4"></i></div>' +
            '<div>' +
              '<div class="text-muted small">\u05D0\u05DC\u05D5\u05E3 \u05D4\u05E9\u05D1\u05D5\u05E2</div>' +
              '<div class="fw-bold fs-5">' + (weekChamp.name || '\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD') + '</div>' +
              (weekChamp.points ? '<span class="badge bg-warning text-dark">' + weekChamp.points + ' \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA</span>' : '') +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="col-md-6">' +
        '<div class="card p-3">' +
          '<div class="d-flex align-items-center gap-3">' +
            '<div class="rounded-circle bg-primary bg-opacity-25 d-flex align-items-center justify-content-center" style="width:50px;height:50px"><i class="bi bi-trophy-fill text-primary fs-4"></i></div>' +
            '<div>' +
              '<div class="text-muted small">\u05D0\u05DC\u05D5\u05E3 \u05D4\u05D7\u05D5\u05D3\u05E9</div>' +
              '<div class="fw-bold fs-5">' + (monthChamp.name || '\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD') + '</div>' +
              (monthChamp.points ? '<span class="badge bg-primary">' + monthChamp.points + ' \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA</span>' : '') +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +

    /* ---------- Top 3 podium ---------- */
    '<div class="card p-4 mb-3">' +
      '<h5 class="mb-3 fw-bold"><i class="bi bi-trophy me-2 text-warning"></i>\u05DE\u05D5\u05D1\u05D9\u05DC\u05D9\u05DD</h5>' +
      '<div class="d-flex justify-content-center align-items-end gap-4 flex-wrap">' +
        (sorted.length >= 2 ?
        '<div class="text-center" style="order:1">' +
          '<div class="mb-2"><i class="bi bi-trophy-fill text-secondary fs-2"></i></div>' +
          Utils.avatarHTML(sorted[1].name, 'md') +
          '<div class="fw-bold mt-1">' + sorted[1].name + '</div>' +
          '<span class="badge bg-secondary">' + sorted[1].points + ' \u05E0\u05E7\'</span>' +
          this._rwdLevelBadge(sorted[1].totalEarned) +
          '<div class="bg-secondary bg-opacity-25 rounded-top mt-2" style="width:80px;height:60px"></div>' +
        '</div>' : '') +
        (sorted.length >= 1 ?
        '<div class="text-center" style="order:2">' +
          '<div class="mb-2"><i class="bi bi-trophy-fill text-warning fs-1"></i></div>' +
          Utils.avatarHTML(sorted[0].name, 'md') +
          '<div class="fw-bold mt-1">' + sorted[0].name + '</div>' +
          '<span class="badge bg-warning text-dark">' + sorted[0].points + ' \u05E0\u05E7\'</span>' +
          this._rwdLevelBadge(sorted[0].totalEarned) +
          '<div class="bg-warning bg-opacity-25 rounded-top mt-2" style="width:80px;height:90px"></div>' +
        '</div>' : '') +
        (sorted.length >= 3 ?
        '<div class="text-center" style="order:3">' +
          '<div class="mb-2"><i class="bi bi-trophy-fill text-info fs-3"></i></div>' +
          Utils.avatarHTML(sorted[2].name, 'md') +
          '<div class="fw-bold mt-1">' + sorted[2].name + '</div>' +
          '<span class="badge bg-info">' + sorted[2].points + ' \u05E0\u05E7\'</span>' +
          this._rwdLevelBadge(sorted[2].totalEarned) +
          '<div class="bg-info bg-opacity-25 rounded-top mt-2" style="width:80px;height:40px"></div>' +
        '</div>' : '') +
      '</div>' +
    '</div>' +

    /* ---------- Tabs ---------- */
    '<ul class="nav nav-tabs mb-3" id="reward-tabs">' +
      '<li class="nav-item"><a class="nav-link active" href="#" onclick="Pages._rewardTab(\'board\',event)"><i class="bi bi-list-ol me-1"></i>\u05D8\u05D1\u05DC\u05EA \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA</a></li>' +
      '<li class="nav-item"><a class="nav-link" href="#" onclick="Pages._rewardTab(\'prizes\',event)"><i class="bi bi-shop me-1"></i>\u05E7\u05D8\u05DC\u05D5\u05D2 \u05E4\u05E8\u05E1\u05D9\u05DD</a></li>' +
      '<li class="nav-item"><a class="nav-link" href="#" onclick="Pages._rewardTab(\'history\',event)"><i class="bi bi-clock-history me-1"></i>\u05D4\u05D9\u05E1\u05D8\u05D5\u05E8\u05D9\u05D9\u05EA \u05DE\u05D9\u05DE\u05D5\u05E9\u05D9\u05DD</a></li>' +
      '<li class="nav-item"><a class="nav-link" href="#" onclick="Pages._rewardTab(\'classes\',event)"><i class="bi bi-bar-chart me-1"></i>\u05EA\u05D7\u05E8\u05D5\u05EA \u05DB\u05D9\u05EA\u05D5\u05EA</a></li>' +
      '<li class="nav-item"><a class="nav-link" href="#" onclick="Pages._rewardTab(\'levels\',event)"><i class="bi bi-shield me-1"></i>\u05E8\u05DE\u05D5\u05EA</a></li>' +
    '</ul>' +

    /* ---------- TAB: Leaderboard ---------- */
    '<div id="reward-board-tab">' +
      '<div class="mb-3 d-flex gap-2 flex-wrap">' +
        '<input type="text" class="form-control form-control-sm" style="max-width:250px" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05EA\u05DC\u05DE\u05D9\u05D3..." id="rwd-search" oninput="Pages._rwdFilterBoard()">' +
        '<select class="form-select form-select-sm" style="max-width:160px" id="rwd-class-filter" onchange="Pages._rwdFilterBoard()">' +
          '<option value="">\u05DB\u05DC \u05D4\u05DB\u05D9\u05EA\u05D5\u05EA</option>' +
          '<option>\u05DB\u05D9\u05EA\u05D4 \u05D0</option><option>\u05DB\u05D9\u05EA\u05D4 \u05D1</option><option>\u05DB\u05D9\u05EA\u05D4 \u05D2</option><option>\u05DB\u05D9\u05EA\u05D4 \u05D3</option>' +
        '</select>' +
      '</div>' +
      '<div class="card">' +
        '<table class="table table-bht mb-0">' +
          '<thead><tr><th style="width:50px">#</th><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th>\u05DB\u05D9\u05EA\u05D4</th><th>\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA</th><th>\u05E8\u05DE\u05D4</th><th>\u05D4\u05EA\u05E7\u05D3\u05DE\u05D5\u05EA</th><th>\u05DE\u05D9\u05DE\u05D5\u05E9\u05D9\u05DD</th><th class="text-center">\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA</th></tr></thead>' +
          '<tbody id="rwd-board-body">' +
            sorted.map(function(s, i) {
              var medalColors = ['warning', 'secondary', 'info'];
              var medal = i < 3 ? '<span class="badge bg-' + medalColors[i] + ' p-2"><i class="bi bi-trophy-fill"></i> ' + (i + 1) + '</span>' : '<span class="text-muted">' + (i + 1) + '</span>';
              var lvl = Pages._rwdGetLevel(s.totalEarned);
              var progress = Pages._rwdLevelProgress(s.totalEarned);
              return '<tr data-name="' + s.name + '" data-class="' + s.class + '">' +
                '<td>' + medal + '</td>' +
                '<td><div class="d-flex align-items-center gap-2">' + Utils.avatarHTML(s.name, 'xs') + '<span class="fw-bold">' + s.name + '</span></div></td>' +
                '<td><span class="badge bg-light text-dark">' + s.class + '</span></td>' +
                '<td><span class="fw-bold text-primary fs-6">' + s.points + '</span></td>' +
                '<td>' +
                  '<div class="d-flex align-items-center gap-2">' +
                    '<span class="badge ' + lvl.badge + '"><i class="bi ' + lvl.icon + ' me-1"></i>' + lvl.name + '</span>' +
                    '<div class="progress flex-grow-1" style="height:6px;min-width:60px" title="' + progress + '% \u05DC\u05E8\u05DE\u05D4 \u05D4\u05D1\u05D0\u05D4">' +
                      '<div class="progress-bar bg-' + lvl.badge.replace('bg-', '') + '" style="width:' + progress + '%"></div>' +
                    '</div>' +
                  '</div>' +
                '</td>' +
                '<td class="text-muted">' + s.totalEarned + '</td>' +
                '<td>' + s.redeemed + '</td>' +
                '<td class="text-center">' +
                  '<button class="btn btn-sm btn-outline-success" onclick="Pages._rewardQuickGrant(\'' + s.name + '\')" title="+10 \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA"><i class="bi bi-plus-circle"></i></button> ' +
                  '<button class="btn btn-sm btn-outline-primary" onclick="Pages._rwdShowStudentCard(\'' + s.id + '\')" title="\u05DB\u05E8\u05D8\u05D9\u05E1 \u05EA\u05DC\u05DE\u05D9\u05D3"><i class="bi bi-person-badge"></i></button>' +
                '</td>' +
              '</tr>';
            }).join('') +
          '</tbody>' +
        '</table>' +
      '</div>' +
    '</div>' +

    /* ---------- TAB: Prize catalog ---------- */
    '<div id="reward-prizes-tab" style="display:none">' +
      '<div class="mb-3 d-flex gap-2 flex-wrap">' +
        '<select class="form-select form-select-sm" style="max-width:160px" id="rwd-prize-cat" onchange="Pages._rwdFilterPrizes()">' +
          '<option value="">\u05DB\u05DC \u05D4\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D5\u05EA</option>' +
          '<option>\u05DC\u05D9\u05DE\u05D5\u05D3\u05D9</option><option>\u05D0\u05D5\u05DB\u05DC</option><option>\u05D7\u05D5\u05D5\u05D9\u05D4</option><option>\u05E9\u05D5\u05D1\u05E8\u05D9\u05DD</option><option>\u05E1\u05E4\u05D5\u05E8\u05D8</option><option>\u05D1\u05D9\u05D3\u05D5\u05E8</option>' +
        '</select>' +
        '<select class="form-select form-select-sm" style="max-width:160px" id="rwd-prize-sort" onchange="Pages._rwdFilterPrizes()">' +
          '<option value="cost-asc">\u05DE\u05D7\u05D9\u05E8: \u05E0\u05DE\u05D5\u05DA \u05DC\u05D2\u05D1\u05D5\u05D4</option>' +
          '<option value="cost-desc">\u05DE\u05D7\u05D9\u05E8: \u05D2\u05D1\u05D5\u05D4 \u05DC\u05E0\u05DE\u05D5\u05DA</option>' +
          '<option value="stock">\u05DC\u05E4\u05D9 \u05DE\u05DC\u05D0\u05D9</option>' +
        '</select>' +
      '</div>' +
      '<div class="row g-3" id="rwd-prizes-grid">' +
        this._prizes.map(function(p) {
          return '<div class="col-md-4 col-lg-3 rwd-prize-card" data-cat="' + p.category + '" data-cost="' + p.cost + '" data-stock="' + p.stock + '">' +
            '<div class="card h-100 text-center p-3 position-relative">' +
              (p.stock <= 2 ? '<span class="position-absolute top-0 start-0 m-2 badge bg-danger">\u05DE\u05DC\u05D0\u05D9 \u05E0\u05DE\u05D5\u05DA!</span>' : '') +
              '<div class="py-3"><i class="bi ' + p.icon + ' text-primary" style="font-size:3rem"></i></div>' +
              '<h6 class="fw-bold">' + p.name + '</h6>' +
              '<div class="small text-muted mb-2"><i class="bi bi-tag me-1"></i>' + p.category + '</div>' +
              '<div class="mb-2"><span class="badge bg-primary fs-6">' + p.cost + ' \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA</span></div>' +
              '<div class="d-flex justify-content-center align-items-center gap-1 mb-3">' +
                '<i class="bi bi-box-seam text-muted"></i>' +
                '<span class="small text-muted">\u05DE\u05DC\u05D0\u05D9: </span>' +
                '<span class="fw-bold ' + (p.stock <= 2 ? 'text-danger' : 'text-success') + '">' + p.stock + '</span>' +
              '</div>' +
              '<button class="btn btn-sm btn-outline-primary mt-auto" onclick="Pages._rewardRedeem(' + p.id + ')"' + (p.stock === 0 ? ' disabled' : '') + '><i class="bi bi-bag-check me-1"></i>\u05DE\u05D9\u05DE\u05D5\u05E9</button>' +
            '</div>' +
          '</div>';
        }).join('') +
      '</div>' +
    '</div>' +

    /* ---------- TAB: Redemption history ---------- */
    '<div id="reward-history-tab" style="display:none">' +
      '<div class="mb-3 d-flex gap-2 flex-wrap">' +
        '<input type="text" class="form-control form-control-sm" style="max-width:250px" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9..." id="rwd-hist-search" oninput="Pages._rwdFilterHistory()">' +
        '<select class="form-select form-select-sm" style="max-width:160px" id="rwd-hist-cat" onchange="Pages._rwdFilterHistory()">' +
          '<option value="">\u05DB\u05DC \u05D4\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D5\u05EA</option>' +
          '<option>\u05DC\u05D9\u05DE\u05D5\u05D3\u05D9</option><option>\u05D0\u05D5\u05DB\u05DC</option><option>\u05D7\u05D5\u05D5\u05D9\u05D4</option><option>\u05E9\u05D5\u05D1\u05E8\u05D9\u05DD</option><option>\u05E1\u05E4\u05D5\u05E8\u05D8</option><option>\u05D1\u05D9\u05D3\u05D5\u05E8</option>' +
        '</select>' +
      '</div>' +
      '<div class="card">' +
        '<table class="table table-bht mb-0">' +
          '<thead><tr><th>#</th><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th>\u05E4\u05E8\u05E1</th><th>\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4</th><th>\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA</th><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th></tr></thead>' +
          '<tbody id="rwd-hist-body">' +
            this._redeemHist.slice().sort(function(a, b) { return (b.date||'').localeCompare(a.date||''); }).map(function(r, i) {
              return '<tr data-student="' + r.student + '" data-cat="' + r.category + '">' +
                '<td class="text-muted">' + (i + 1) + '</td>' +
                '<td><div class="d-flex align-items-center gap-2">' + Utils.avatarHTML(r.student, 'xs') + '<span class="fw-bold">' + r.student + '</span></div></td>' +
                '<td>' + r.prize + '</td>' +
                '<td><span class="badge bg-light text-dark">' + r.category + '</span></td>' +
                '<td class="text-danger fw-bold">-' + r.cost + '</td>' +
                '<td>' + Utils.formatDateShort(r.date) + '</td>' +
              '</tr>';
            }).join('') +
          '</tbody>' +
        '</table>' +
      '</div>' +
      '<div class="mt-3 text-muted small">\u05E1\u05D4"\u05DB \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA \u05E9\u05DE\u05D5\u05DE\u05E9\u05D5: <strong>' + this._redeemHist.reduce(function(s, r) { return s + r.cost; }, 0).toLocaleString() + '</strong></div>' +
    '</div>' +

    /* ---------- TAB: Class competition ---------- */
    '<div id="reward-classes-tab" style="display:none">' +
      '<div class="card p-4">' +
        '<h5 class="fw-bold mb-3"><i class="bi bi-bar-chart me-2 text-primary"></i>\u05EA\u05D7\u05E8\u05D5\u05EA \u05DB\u05D9\u05EA\u05D5\u05EA</h5>' +
        '<div style="height:300px;position:relative"><canvas id="rwd-class-chart"></canvas></div>' +
      '</div>' +
      '<div class="row g-3 mt-2">' +
        Object.entries(classPoints).map(function(entry, i) {
          var colors = ['primary', 'success', 'warning', 'info', 'danger'];
          return '<div class="col-md-3"><div class="card p-3 text-center">' +
            '<div class="fs-5 fw-bold text-' + colors[i % colors.length] + '">' + entry[1].toLocaleString() + '</div>' +
            '<small class="text-muted">' + entry[0] + '</small>' +
          '</div></div>';
        }).join('') +
      '</div>' +
    '</div>' +

    /* ---------- TAB: Levels ---------- */
    '<div id="reward-levels-tab" style="display:none">' +
      '<div class="card p-4 mb-3">' +
        '<h5 class="fw-bold mb-3"><i class="bi bi-shield me-2"></i>\u05DE\u05E2\u05E8\u05DB\u05EA \u05E8\u05DE\u05D5\u05EA</h5>' +
        '<div class="row g-2">' +
          this._rewardLevels.map(function(l) {
            var count = students.filter(function(s) { return s.totalEarned >= l.min && s.totalEarned <= l.max; }).length;
            return '<div class="col-md-6 col-lg-4">' +
              '<div class="card p-3 d-flex flex-row align-items-center gap-3 ' + (count > 0 ? '' : 'opacity-50') + '">' +
                '<span class="badge ' + l.badge + ' p-2 fs-6"><i class="bi ' + l.icon + '"></i></span>' +
                '<div class="flex-grow-1">' +
                  '<div class="fw-bold">' + l.name + ' (Lv.' + l.level + ')</div>' +
                  '<small class="text-muted">' + l.min + '-' + (l.level === 10 ? '∞' : l.max) + ' \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA</small>' +
                '</div>' +
                '<span class="badge bg-light text-dark fs-6">' + count + '</span>' +
              '</div>' +
            '</div>';
          }).join('') +
        '</div>' +
      '</div>' +
      '<div class="card p-4">' +
        '<h5 class="fw-bold mb-3"><i class="bi bi-people me-2"></i>\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05DC\u05E4\u05D9 \u05E8\u05DE\u05D4</h5>' +
        '<div class="table-responsive"><table class="table table-bht mb-0">' +
          '<thead><tr><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th>\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA \u05E0\u05E6\u05D1\u05E8\u05D5\u05EA</th><th>\u05E8\u05DE\u05D4</th><th>\u05D4\u05EA\u05E7\u05D3\u05DE\u05D5\u05EA \u05DC\u05E8\u05DE\u05D4 \u05D4\u05D1\u05D0\u05D4</th></tr></thead>' +
          '<tbody>' +
            sorted.map(function(s) {
              var lvl = Pages._rwdGetLevel(s.totalEarned);
              var progress = Pages._rwdLevelProgress(s.totalEarned);
              var nextPts = lvl.level < 10 ? (lvl.max + 1 - s.totalEarned) : 0;
              return '<tr>' +
                '<td><div class="d-flex align-items-center gap-2">' + Utils.avatarHTML(s.name, 'xs') + '<span class="fw-bold">' + s.name + '</span></div></td>' +
                '<td>' + s.totalEarned + '</td>' +
                '<td><span class="badge ' + lvl.badge + '"><i class="bi ' + lvl.icon + ' me-1"></i>' + lvl.name + ' (Lv.' + lvl.level + ')</span></td>' +
                '<td>' +
                  (lvl.level < 10 ?
                    '<div class="d-flex align-items-center gap-2">' +
                      '<div class="progress flex-grow-1" style="height:8px"><div class="progress-bar bg-' + lvl.badge.replace('bg-', '') + '" style="width:' + progress + '%"></div></div>' +
                      '<small class="text-muted text-nowrap">' + nextPts + ' \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA</small>' +
                    '</div>'
                  : '<span class="badge bg-dark">\u05E8\u05DE\u05D4 \u05DE\u05E7\u05E1\u05D9\u05DE\u05DC\u05D9\u05EA!</span>') +
                '</td>' +
              '</tr>';
            }).join('') +
          '</tbody>' +
        '</table></div>' +
      '</div>' +
    '</div>' +

    /* ---------- Student Card Modal ---------- */
    '<div class="modal fade" id="rwd-student-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">' +
      '<div class="modal-header"><h5 class="modal-title"><i class="bi bi-person-badge me-2"></i>\u05DB\u05E8\u05D8\u05D9\u05E1 \u05EA\u05DC\u05DE\u05D9\u05D3</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>' +
      '<div class="modal-body" id="rwd-student-card-body">\u05D8\u05D5\u05E2\u05DF...</div>' +
    '</div></div></div>' +

    /* ---------- Grant Points Modal ---------- */
    '<div class="modal fade" id="reward-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">' +
      '<div class="modal-header bg-success text-white"><h5 class="modal-title"><i class="bi bi-plus-circle me-2"></i>\u05D4\u05E2\u05E0\u05E7\u05EA \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA</h5><button class="btn-close btn-close-white" data-bs-dismiss="modal"></button></div>' +
      '<div class="modal-body">' +
        '<div class="mb-3"><label class="form-label fw-bold">\u05EA\u05DC\u05DE\u05D9\u05D3</label>' +
          '<select class="form-select" id="rf-student">' + students.map(function(s) { return '<option value="' + s.name + '">' + s.name + ' (' + s.class + ')</option>'; }).join('') + '</select></div>' +
        '<div class="mb-3"><label class="form-label fw-bold">\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA</label>' +
          '<div class="d-flex gap-2 mb-2">' +
            '<button class="btn btn-sm btn-outline-primary" onclick="document.getElementById(\'rf-points\').value=5">5</button>' +
            '<button class="btn btn-sm btn-outline-primary" onclick="document.getElementById(\'rf-points\').value=10">10</button>' +
            '<button class="btn btn-sm btn-outline-primary" onclick="document.getElementById(\'rf-points\').value=20">20</button>' +
            '<button class="btn btn-sm btn-outline-primary" onclick="document.getElementById(\'rf-points\').value=50">50</button>' +
          '</div>' +
          '<input type="number" class="form-control" id="rf-points" value="10" min="1" max="500">' +
        '</div>' +
        '<div class="mb-3"><label class="form-label fw-bold">\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4</label>' +
          '<select class="form-select" id="rf-category">' +
            '<option value="attendance">\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA</option>' +
            '<option value="grades">\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD</option>' +
            '<option value="behavior">\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</option>' +
            '<option value="special">\u05DE\u05D9\u05D5\u05D7\u05D3</option>' +
          '</select></div>' +
        '<div class="mb-3"><label class="form-label fw-bold">\u05E1\u05D9\u05D1\u05D4</label>' +
          '<select class="form-select" id="rf-reason">' +
            '<option>\u05D4\u05D9\u05E9\u05D2 \u05DC\u05D9\u05DE\u05D5\u05D3\u05D9</option><option>\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA \u05DE\u05E6\u05D5\u05D9\u05E0\u05EA</option><option>\u05E2\u05D6\u05E8\u05D4 \u05DC\u05D7\u05D1\u05E8</option><option>\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05DE\u05DC\u05D0\u05D4</option><option>\u05DE\u05D1\u05D7\u05DF \u05DE\u05E6\u05D5\u05D9\u05DF</option><option>\u05DE\u05E0\u05D4\u05D9\u05D2\u05D5\u05EA</option><option>\u05EA\u05E8\u05D5\u05DE\u05D4 \u05DC\u05DE\u05D5\u05E1\u05D3</option><option>\u05D0\u05D7\u05E8</option>' +
          '</select></div>' +
        '<div class="mb-3"><label class="form-label fw-bold">\u05D4\u05E2\u05E8\u05D5\u05EA</label><input class="form-control" id="rf-notes" placeholder="\u05D0\u05D5\u05E4\u05E6\u05D9\u05D5\u05E0\u05DC\u05D9..."></div>' +
      '</div>' +
      '<div class="modal-footer">' +
        '<button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button>' +
        '<button class="btn btn-success" onclick="Pages._rewardSaveGrant()"><i class="bi bi-check-lg me-1"></i>\u05D4\u05E2\u05E0\u05E7</button>' +
      '</div>' +
    '</div></div></div>' +

    /* ---------- Redeem Modal ---------- */
    '<div class="modal fade" id="rwd-redeem-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">' +
      '<div class="modal-header bg-primary text-white"><h5 class="modal-title"><i class="bi bi-bag-check me-2"></i>\u05DE\u05D9\u05DE\u05D5\u05E9 \u05E4\u05E8\u05E1</h5><button class="btn-close btn-close-white" data-bs-dismiss="modal"></button></div>' +
      '<div class="modal-body" id="rwd-redeem-body"></div>' +
      '<div class="modal-footer">' +
        '<button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button>' +
        '<button class="btn btn-primary" id="rwd-redeem-confirm" onclick="Pages._rwdConfirmRedeem()">\u05D0\u05E9\u05E8 \u05DE\u05D9\u05DE\u05D5\u05E9</button>' +
      '</div>' +
    '</div></div></div>';
  },

  /* ======================================================================
     INIT — load data + render chart
     ====================================================================== */
  _rewardsUseDemo: false,

  rewardsLoadDemo() {
    this._rewardsUseDemo = true;
    App.navigate('rewards');
  },

  rewardsInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    // Try loading from API
    try {
      var apiData = _gc('\u05E4\u05E8\u05E1\u05D9\u05DD');
      if (apiData && apiData.length) {
        this._rewardStudents = apiData.filter(function(r) { return r['\u05E1\u05D5\u05D2'] === '\u05EA\u05DC\u05DE\u05D9\u05D3' || !r['\u05E1\u05D5\u05D2']; }).map(function(row, i) {
          return {
            id: row._id || row.id || 'S' + (i + 1),
            name: row['\u05E9\u05DD'] || row.name || '',
            class: row['\u05DB\u05D9\u05EA\u05D4'] || row.class || '',
            points: parseInt(row['\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA'] || row.points) || 0,
            totalEarned: parseInt(row['\u05E1\u05D4\u05DB_\u05E0\u05E6\u05D1\u05E8'] || row.totalEarned) || 0,
            redeemed: parseInt(row['\u05DE\u05D9\u05DE\u05D5\u05E9\u05D9\u05DD'] || row.redeemed) || 0
          };
        });
        var prizes = apiData.filter(function(r) { return r['\u05E1\u05D5\u05D2'] === '\u05E4\u05E8\u05E1'; });
        if (prizes.length) {
          this._prizes = prizes.map(function(row, i) {
            return {
              id: row._id || row.id || i + 1,
              name: row['\u05E9\u05DD'] || row.name || '',
              cost: parseInt(row['\u05E2\u05DC\u05D5\u05EA'] || row.cost) || 0,
              icon: row['\u05D0\u05D9\u05D9\u05E7\u05D5\u05DF'] || row.icon || 'bi-gift',
              category: row['\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4'] || row.category || '',
              stock: parseInt(row['\u05DE\u05DC\u05D0\u05D9'] || row.stock) || 0
            };
          });
        }
      }
    } catch(e) { /* keep current data */ }

    // If no API data and demo not requested, clear hardcoded
    if (!this._rewardsUseDemo && this._rewardStudents?.length && this._rewardStudents[0]?.id === 'S1') {
      this._rewardStudents = [];
    }

    // Render class competition chart
    this._rwdRenderClassChart();
  },

  /* ======================================================================
     CLASS CHART
     ====================================================================== */
  _rwdRenderClassChart() {
    var ctx = document.getElementById('rwd-class-chart');
    if (!ctx) return;
    if (App.charts['rwdClass']) App.charts['rwdClass'].destroy();
    var classData = this._rwdClassPoints();
    var labels = Object.keys(classData);
    var values = Object.values(classData);
    var colors = ['rgba(37,99,235,0.7)', 'rgba(15,157,88,0.7)', 'rgba(249,171,0,0.7)', 'rgba(234,67,53,0.7)', 'rgba(139,92,246,0.7)'];
    var borderColors = ['#2563eb', '#0f9d58', '#f9ab00', '#ea4335', '#8b5cf6'];

    App.charts['rwdClass'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA',
          data: values,
          backgroundColor: colors.slice(0, labels.length),
          borderColor: borderColors.slice(0, labels.length),
          borderWidth: 2,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(ctx2) { return ctx2.parsed.x + ' \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA'; }
            }
          }
        },
        scales: {
          x: { beginAtZero: true, grid: { display: false } },
          y: { grid: { display: false } }
        }
      }
    });
  },

  /* ======================================================================
     TAB SWITCHING
     ====================================================================== */
  _rewardTab(tab, e) {
    e.preventDefault();
    document.querySelectorAll('#reward-tabs .nav-link').forEach(function(l) { l.classList.remove('active'); });
    e.currentTarget.classList.add('active');
    ['board', 'prizes', 'history', 'classes', 'levels'].forEach(function(t) {
      var el = document.getElementById('reward-' + t + '-tab');
      if (el) el.style.display = t === tab ? '' : 'none';
    });
    if (tab === 'classes') Pages._rwdRenderClassChart();
  },

  /* ======================================================================
     SEARCH / FILTER
     ====================================================================== */
  _rwdFilterBoard() {
    var search = (document.getElementById('rwd-search')?.value || '').trim().toLowerCase();
    var classFilter = document.getElementById('rwd-class-filter')?.value || '';
    document.querySelectorAll('#rwd-board-body tr').forEach(function(tr) {
      var name = (tr.dataset.name || '').toLowerCase();
      var cls = tr.dataset.class || '';
      var matchSearch = !search || name.indexOf(search) >= 0;
      var matchClass = !classFilter || cls === classFilter;
      tr.style.display = matchSearch && matchClass ? '' : 'none';
    });
  },

  _rwdFilterPrizes() {
    var cat = document.getElementById('rwd-prize-cat')?.value || '';
    var sort = document.getElementById('rwd-prize-sort')?.value || 'cost-asc';
    var cards = Array.from(document.querySelectorAll('.rwd-prize-card'));
    cards.forEach(function(c) {
      var cardCat = c.dataset.cat || '';
      c.style.display = !cat || cardCat === cat ? '' : 'none';
    });
    // Sort visible cards
    var grid = document.getElementById('rwd-prizes-grid');
    if (!grid) return;
    var sorted = cards.slice().sort(function(a, b) {
      if (sort === 'cost-asc') return parseInt(a.dataset.cost) - parseInt(b.dataset.cost);
      if (sort === 'cost-desc') return parseInt(b.dataset.cost) - parseInt(a.dataset.cost);
      return parseInt(a.dataset.stock) - parseInt(b.dataset.stock);
    });
    sorted.forEach(function(c) { grid.appendChild(c); });
  },

  _rwdFilterHistory() {
    var search = (document.getElementById('rwd-hist-search')?.value || '').trim().toLowerCase();
    var cat = document.getElementById('rwd-hist-cat')?.value || '';
    document.querySelectorAll('#rwd-hist-body tr').forEach(function(tr) {
      var student = (tr.dataset.student || '').toLowerCase();
      var trCat = tr.dataset.cat || '';
      var matchSearch = !search || student.indexOf(search) >= 0;
      var matchCat = !cat || trCat === cat;
      tr.style.display = matchSearch && matchCat ? '' : 'none';
    });
  },

  /* ======================================================================
     GRANT POINTS
     ====================================================================== */
  _rewardShowGrant() {
    new bootstrap.Modal(document.getElementById('reward-modal')).show();
  },

  async _rewardSaveGrant() {
    var name = document.getElementById('rf-student')?.value;
    var pts = parseInt(document.getElementById('rf-points')?.value) || 0;
    var category = document.getElementById('rf-category')?.value || 'special';
    var reason = document.getElementById('rf-reason')?.value || '';
    var notes = document.getElementById('rf-notes')?.value || '';

    if (pts <= 0) { Utils.toast('\u05D9\u05E9 \u05DC\u05D4\u05D6\u05D9\u05DF \u05DE\u05E1\u05E4\u05E8 \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA \u05D7\u05D9\u05D5\u05D1\u05D9', 'warning'); return; }
    if (pts > 500) { Utils.toast('\u05DE\u05E7\u05E1\u05D9\u05DE\u05D5\u05DD 500 \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA \u05DC\u05D4\u05E2\u05E0\u05E7\u05D4', 'warning'); return; }

    var student = this._rewardStudents.find(function(s) { return s.name === name; });
    if (student) {
      student.points += pts;
      student.totalEarned += pts;
    }

    // Record the grant
    this._rewardGrants.push({
      student: name,
      amount: pts,
      category: category,
      date: new Date().toISOString().slice(0, 10),
      reason: reason + (notes ? ' - ' + notes : '')
    });

    // Save to API
    try {
      await App.apiCall('add', '\u05E4\u05E8\u05E1\u05D9\u05DD', { row: {
        '\u05E9\u05DD': name,
        '\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA': pts,
        '\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4': category,
        '\u05E1\u05D9\u05D1\u05D4': reason,
        '\u05EA\u05D0\u05E8\u05D9\u05DA': new Date().toISOString().slice(0, 10)
      }});
    } catch(e) { /* localStorage fallback */ }

    bootstrap.Modal.getInstance(document.getElementById('reward-modal'))?.hide();
    var catLabel = this._rwdCategoryLabels[category] || category;
    Utils.toast(pts + ' \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA \u05D4\u05D5\u05E2\u05E0\u05E7\u05D5 \u05DC' + name + ' (' + catLabel + ')!');
    App.navigate('rewards');
  },

  _rewardQuickGrant(name) {
    var student = this._rewardStudents.find(function(s) { return s.name === name; });
    if (student) {
      student.points += 10;
      student.totalEarned += 10;
      this._rewardGrants.push({
        student: name, amount: 10, category: 'special',
        date: new Date().toISOString().slice(0, 10), reason: '\u05D4\u05E2\u05E0\u05E7\u05D4 \u05DE\u05D4\u05D9\u05E8\u05D4'
      });
      Utils.toast('+10 \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA \u05DC' + name + '!');
      App.navigate('rewards');
    }
  },

  /* ======================================================================
     REDEEM PRIZE
     ====================================================================== */
  _rwdRedeemPrizeId: null,

  _rewardRedeem(prizeId) {
    var prize = this._prizes.find(function(p) { return p.id === prizeId; });
    if (!prize) return;
    if (prize.stock <= 0) { Utils.toast('\u05D4\u05E4\u05E8\u05E1 \u05D0\u05D6\u05DC!', 'warning'); return; }

    this._rwdRedeemPrizeId = prizeId;
    var eligible = this._rewardStudents.filter(function(s) { return s.points >= prize.cost; });

    var body = '<div class="text-center mb-3">' +
      '<i class="bi ' + prize.icon + ' text-primary" style="font-size:3rem"></i>' +
      '<h5 class="fw-bold mt-2">' + prize.name + '</h5>' +
      '<span class="badge bg-primary fs-6">' + prize.cost + ' \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA</span>' +
      '<div class="small text-muted mt-1">\u05DE\u05DC\u05D0\u05D9: ' + prize.stock + '</div>' +
    '</div>';

    if (eligible.length === 0) {
      body += '<div class="alert alert-warning">\u05D0\u05D9\u05DF \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05E2\u05DD \u05DE\u05E1\u05E4\u05D9\u05E7 \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA \u05DC\u05E4\u05E8\u05E1 \u05D6\u05D4.</div>';
      document.getElementById('rwd-redeem-confirm')?.setAttribute('disabled', '');
    } else {
      body += '<div class="mb-3"><label class="form-label fw-bold">\u05D1\u05D7\u05E8 \u05EA\u05DC\u05DE\u05D9\u05D3</label>' +
        '<select class="form-select" id="rwd-redeem-student">' +
          eligible.map(function(s) { return '<option value="' + s.name + '">' + s.name + ' (' + s.points + ' \u05E0\u05E7\')</option>'; }).join('') +
        '</select></div>';
      document.getElementById('rwd-redeem-confirm')?.removeAttribute('disabled');
    }

    document.getElementById('rwd-redeem-body').innerHTML = body;
    new bootstrap.Modal(document.getElementById('rwd-redeem-modal')).show();
  },

  async _rwdConfirmRedeem() {
    var prizeId = this._rwdRedeemPrizeId;
    var prize = this._prizes.find(function(p) { return p.id === prizeId; });
    if (!prize) return;

    var studentName = document.getElementById('rwd-redeem-student')?.value;
    if (!studentName) return;

    var student = this._rewardStudents.find(function(s) { return s.name === studentName; });
    if (!student || student.points < prize.cost) {
      Utils.toast('\u05D0\u05D9\u05DF \u05DE\u05E1\u05E4\u05D9\u05E7 \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA!', 'danger');
      return;
    }

    // Deduct points and update stock
    student.points -= prize.cost;
    student.redeemed += 1;
    prize.stock -= 1;

    // Add to history
    this._redeemHist.push({
      id: this._redeemHist.length + 1,
      student: studentName,
      prize: prize.name,
      date: new Date().toISOString().slice(0, 10),
      cost: prize.cost,
      category: prize.category
    });

    // Save to API
    try {
      await App.apiCall('add', '\u05E4\u05E8\u05E1\u05D9\u05DD', { row: {
        '\u05E1\u05D5\u05D2': '\u05DE\u05D9\u05DE\u05D5\u05E9',
        '\u05E9\u05DD': studentName,
        '\u05E4\u05E8\u05E1': prize.name,
        '\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA': -prize.cost,
        '\u05EA\u05D0\u05E8\u05D9\u05DA': new Date().toISOString().slice(0, 10)
      }});
    } catch(e) { /* fallback */ }

    bootstrap.Modal.getInstance(document.getElementById('rwd-redeem-modal'))?.hide();
    Utils.toast('\u05DE\u05D9\u05DE\u05D5\u05E9 \u05D1\u05D5\u05E6\u05E2! ' + studentName + ' \u05DE\u05D9\u05DE\u05E9 "' + prize.name + '"');
    App.navigate('rewards');
  },

  /* ======================================================================
     STUDENT CARD (modal with individual stats)
     ====================================================================== */
  _rwdShowStudentCard(studentId) {
    var student = this._rewardStudents.find(function(s) { return s.id === studentId; });
    if (!student) return;

    var lvl = this._rwdGetLevel(student.totalEarned);
    var progress = this._rwdLevelProgress(student.totalEarned);
    var nextPts = lvl.level < 10 ? (lvl.max + 1 - student.totalEarned) : 0;

    // Student's grants by category
    var grants = this._rewardGrants.filter(function(g) { return g.student === student.name; });
    var byCat = {};
    grants.forEach(function(g) {
      byCat[g.category] = (byCat[g.category] || 0) + g.amount;
    });

    // Student's redemptions
    var redemptions = this._redeemHist.filter(function(r) { return r.student === student.name; });

    var body = document.getElementById('rwd-student-card-body');
    body.innerHTML =
      '<div class="text-center mb-4">' +
        Utils.avatarHTML(student.name, 'lg') +
        '<h4 class="fw-bold mt-2">' + student.name + '</h4>' +
        '<span class="badge bg-light text-dark">' + student.class + '</span> ' +
        '<span class="badge ' + lvl.badge + '"><i class="bi ' + lvl.icon + ' me-1"></i>' + lvl.name + ' (Lv.' + lvl.level + ')</span>' +
      '</div>' +

      '<div class="row g-3 mb-4">' +
        '<div class="col-4 text-center"><div class="card p-2"><div class="fs-5 fw-bold text-primary">' + student.points + '</div><small class="text-muted">\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA</small></div></div>' +
        '<div class="col-4 text-center"><div class="card p-2"><div class="fs-5 fw-bold text-success">' + student.totalEarned + '</div><small class="text-muted">\u05E1\u05D4"\u05DB \u05E0\u05E6\u05D1\u05E8</small></div></div>' +
        '<div class="col-4 text-center"><div class="card p-2"><div class="fs-5 fw-bold text-warning">' + student.redeemed + '</div><small class="text-muted">\u05DE\u05D9\u05DE\u05D5\u05E9\u05D9\u05DD</small></div></div>' +
      '</div>' +

      /* Progress to next level */
      (lvl.level < 10 ?
        '<div class="mb-4">' +
          '<div class="d-flex justify-content-between small text-muted mb-1"><span>\u05D4\u05EA\u05E7\u05D3\u05DE\u05D5\u05EA \u05DC\u05E8\u05DE\u05D4 \u05D4\u05D1\u05D0\u05D4</span><span>' + nextPts + ' \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA</span></div>' +
          '<div class="progress" style="height:12px"><div class="progress-bar bg-' + lvl.badge.replace('bg-', '') + ' progress-bar-striped progress-bar-animated" style="width:' + progress + '%"></div></div>' +
        '</div>' : '<div class="alert alert-dark text-center mb-4"><i class="bi bi-star-fill me-1"></i>\u05E8\u05DE\u05D4 \u05DE\u05E7\u05E1\u05D9\u05DE\u05DC\u05D9\u05EA!</div>') +

      /* Points by category */
      '<h6 class="fw-bold mb-2"><i class="bi bi-pie-chart me-1"></i>\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA \u05DC\u05E4\u05D9 \u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4</h6>' +
      '<div class="row g-2 mb-4">' +
        Object.entries(byCat).map(function(entry) {
          var catKey = entry[0];
          var catPts = entry[1];
          var label = Pages._rwdCategoryLabels[catKey] || catKey;
          var color = Pages._rwdCategoryColors[catKey] || 'secondary';
          var icon = Pages._rwdCategoryIcons[catKey] || 'bi-circle';
          return '<div class="col-6"><div class="d-flex align-items-center gap-2 p-2 border rounded">' +
            '<i class="bi ' + icon + ' text-' + color + '"></i>' +
            '<div class="flex-grow-1"><small class="text-muted">' + label + '</small><div class="fw-bold">' + catPts + '</div></div>' +
          '</div></div>';
        }).join('') +
      '</div>' +

      /* Recent redemptions */
      (redemptions.length > 0 ?
        '<h6 class="fw-bold mb-2"><i class="bi bi-bag-check me-1"></i>\u05DE\u05D9\u05DE\u05D5\u05E9\u05D9\u05DD \u05D0\u05D7\u05E8\u05D5\u05E0\u05D9\u05DD</h6>' +
        '<div class="list-group">' +
          redemptions.slice(-5).reverse().map(function(r) {
            return '<div class="list-group-item d-flex justify-content-between align-items-center">' +
              '<div><strong>' + r.prize + '</strong><br><small class="text-muted">' + Utils.formatDateShort(r.date) + '</small></div>' +
              '<span class="badge bg-danger">-' + r.cost + '</span>' +
            '</div>';
          }).join('') +
        '</div>' : '<p class="text-muted small">\u05D0\u05D9\u05DF \u05DE\u05D9\u05DE\u05D5\u05E9\u05D9\u05DD \u05E2\u05D3\u05D9\u05D9\u05DF.</p>');

    new bootstrap.Modal(document.getElementById('rwd-student-modal')).show();
  },

  /* ======================================================================
     CSV EXPORT
     ====================================================================== */
  _rwdExportCSV() {
    var rows = ['\u05E9\u05DD,\u05DB\u05D9\u05EA\u05D4,\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA,\u05E1\u05D4\u05DB \u05E0\u05E6\u05D1\u05E8,\u05E8\u05DE\u05D4,\u05DE\u05D9\u05DE\u05D5\u05E9\u05D9\u05DD'];
    this._rewardStudents.forEach(function(s) {
      var lvl = Pages._rwdGetLevel(s.totalEarned);
      rows.push(s.name + ',' + s.class + ',' + s.points + ',' + s.totalEarned + ',' + lvl.name + ' (Lv.' + lvl.level + '),' + s.redeemed);
    });
    var csv = '\uFEFF' + rows.join('\n');
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = '\u05E4\u05E8\u05E1\u05D9\u05DD_\u05D5\u05EA\u05D2\u05DE\u05D5\u05DC\u05D9\u05DD.csv';
    link.click();
    URL.revokeObjectURL(link.href);
    Utils.toast('\u05E7\u05D5\u05D1\u05E5 CSV \u05D9\u05D5\u05E8\u05D3 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4!');
  }
});
