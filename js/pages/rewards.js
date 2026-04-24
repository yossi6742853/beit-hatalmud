/* ===== BHT v5.3 — Rewards (פרסים ותגמולים) ===== */
Object.assign(Pages, {
  _rewardStudents: [
    { name: 'יוסף כהן', points: 450, redeemed: 2 },
    { name: 'משה לוי', points: 380, redeemed: 1 },
    { name: 'אברהם גולדברג', points: 320, redeemed: 3 },
    { name: 'דוד פרידמן', points: 290, redeemed: 1 },
    { name: 'אליהו שפירא', points: 210, redeemed: 0 },
    { name: 'יעקב רוזנברג', points: 185, redeemed: 1 },
    { name: 'חיים ברקוביץ', points: 160, redeemed: 0 },
    { name: 'נתנאל וייס', points: 140, redeemed: 2 },
    { name: 'שמואל הורביץ', points: 120, redeemed: 0 },
    { name: 'רפאל מזרחי', points: 95, redeemed: 1 }
  ],
  _prizes: [
    { id: 1, name: 'ספר לבחירה', cost: 50, icon: 'bi-book', category: 'לימודי', stock: 15 },
    { id: 2, name: 'פיצה אישית', cost: 80, icon: 'bi-emoji-smile', category: 'אוכל', stock: 10 },
    { id: 3, name: 'יום חופשי', cost: 150, icon: 'bi-calendar-heart', category: 'חוויה', stock: 5 },
    { id: 4, name: 'שובר מתנה 50 ש"ח', cost: 200, icon: 'bi-gift', category: 'שוברים', stock: 8 },
    { id: 5, name: 'טיול מיוחד', cost: 500, icon: 'bi-geo-alt', category: 'חוויה', stock: 3 },
    { id: 6, name: 'כדורגל חדש', cost: 120, icon: 'bi-dribbble', category: 'ספורט', stock: 4 },
    { id: 7, name: 'ארוחה עם הרב', cost: 250, icon: 'bi-cup-hot', category: 'חוויה', stock: 2 },
    { id: 8, name: 'כרטיס סרט', cost: 100, icon: 'bi-film', category: 'בידור', stock: 6 }
  ],
  _redeemHist: [
    { student: 'יוסף כהן', prize: 'פיצה אישית', date: '2026-04-18', cost: 80 },
    { student: 'יוסף כהן', prize: 'ספר לבחירה', date: '2026-04-12', cost: 50 },
    { student: 'אברהם גולדברג', prize: 'ספר לבחירה', date: '2026-04-15', cost: 50 },
    { student: 'אברהם גולדברג', prize: 'שובר מתנה 50 ש"ח', date: '2026-04-10', cost: 200 },
    { student: 'אברהם גולדברג', prize: 'כדורגל חדש', date: '2026-04-02', cost: 120 },
    { student: 'דוד פרידמן', prize: 'פיצה אישית', date: '2026-04-08', cost: 80 },
    { student: 'משה לוי', prize: 'כרטיס סרט', date: '2026-04-20', cost: 100 },
    { student: 'נתנאל וייס', prize: 'ספר לבחירה', date: '2026-04-05', cost: 50 },
    { student: 'נתנאל וייס', prize: 'פיצה אישית', date: '2026-03-28', cost: 80 },
    { student: 'יעקב רוזנברג', prize: 'ספר לבחירה', date: '2026-04-14', cost: 50 },
    { student: 'רפאל מזרחי', prize: 'ספר לבחירה', date: '2026-04-01', cost: 50 }
  ],

  rewards() {
    const students = this._rewardStudents;
    const sorted = [...students].sort((a, b) => b.points - a.points);
    const totalPts = students.reduce((s, x) => s + x.points, 0);
    const totalRedeemed = this._redeemHist.length;
    const medalColors = ['warning', 'secondary', 'info'];
    const medalIcons = ['bi-trophy-fill', 'bi-trophy-fill', 'bi-trophy-fill'];

    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div><h1><i class="bi bi-gift me-2"></i>פרסים ותגמולים</h1><p class="text-muted mb-0">ניהול נקודות ופרסים לתלמידים</p></div>
      <button class="btn btn-primary btn-sm" onclick="Pages._rewardShowGrant()"><i class="bi bi-plus-lg me-1"></i>הענק נקודות</button>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-primary">${totalPts.toLocaleString()}</div><small class="text-muted">נקודות פעילות</small></div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-success">${totalRedeemed}</div><small class="text-muted">מימושים</small></div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-warning">${this._prizes.length}</div><small class="text-muted">פרסים בקטלוג</small></div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-info">${students.length}</div><small class="text-muted">תלמידים עם נקודות</small></div></div>
    </div>

    <!-- Top 3 Podium -->
    <div class="card p-4 mb-3">
      <h5 class="mb-3 fw-bold"><i class="bi bi-trophy me-2 text-warning"></i>מובילים</h5>
      <div class="d-flex justify-content-center align-items-end gap-4 flex-wrap">
        ${sorted.length >= 2 ? `
        <div class="text-center" style="order:1">
          <div class="mb-2"><i class="bi bi-trophy-fill text-secondary fs-2"></i></div>
          ${Utils.avatarHTML(sorted[1].name, 'md')}
          <div class="fw-bold mt-1">${sorted[1].name}</div>
          <span class="badge bg-secondary">${sorted[1].points} נק'</span>
          <div class="bg-secondary bg-opacity-25 rounded-top mt-2" style="width:80px;height:60px"></div>
        </div>` : ''}
        ${sorted.length >= 1 ? `
        <div class="text-center" style="order:2">
          <div class="mb-2"><i class="bi bi-trophy-fill text-warning fs-1"></i></div>
          ${Utils.avatarHTML(sorted[0].name, 'md')}
          <div class="fw-bold mt-1">${sorted[0].name}</div>
          <span class="badge bg-warning text-dark">${sorted[0].points} נק'</span>
          <div class="bg-warning bg-opacity-25 rounded-top mt-2" style="width:80px;height:90px"></div>
        </div>` : ''}
        ${sorted.length >= 3 ? `
        <div class="text-center" style="order:3">
          <div class="mb-2"><i class="bi bi-trophy-fill text-info fs-3"></i></div>
          ${Utils.avatarHTML(sorted[2].name, 'md')}
          <div class="fw-bold mt-1">${sorted[2].name}</div>
          <span class="badge bg-info">${sorted[2].points} נק'</span>
          <div class="bg-info bg-opacity-25 rounded-top mt-2" style="width:80px;height:40px"></div>
        </div>` : ''}
      </div>
    </div>

    <ul class="nav nav-tabs mb-3" id="reward-tabs">
      <li class="nav-item"><a class="nav-link active" href="#" onclick="Pages._rewardTab('board',event)"><i class="bi bi-list-ol me-1"></i>טבלת נקודות</a></li>
      <li class="nav-item"><a class="nav-link" href="#" onclick="Pages._rewardTab('prizes',event)"><i class="bi bi-shop me-1"></i>קטלוג פרסים</a></li>
      <li class="nav-item"><a class="nav-link" href="#" onclick="Pages._rewardTab('history',event)"><i class="bi bi-clock-history me-1"></i>היסטוריית מימושים</a></li>
    </ul>

    <!-- Leaderboard -->
    <div id="reward-board-tab">
      <div class="card">
        <table class="table table-bht mb-0">
          <thead><tr><th style="width:50px">#</th><th>תלמיד</th><th>נקודות</th><th>מימושים</th><th class="text-center">פעולות</th></tr></thead>
          <tbody>
            ${sorted.map((s, i) => `
            <tr>
              <td>${i < 3 ? `<span class="badge bg-${medalColors[i]} p-2"><i class="bi ${medalIcons[i]}"></i> ${i + 1}</span>` : `<span class="text-muted">${i + 1}</span>`}</td>
              <td><div class="d-flex align-items-center gap-2">${Utils.avatarHTML(s.name, 'xs')}<span class="fw-bold">${s.name}</span></div></td>
              <td><span class="fw-bold text-primary fs-6">${s.points}</span></td>
              <td>${s.redeemed}</td>
              <td class="text-center"><button class="btn btn-sm btn-outline-success" onclick="Pages._rewardQuickGrant('${s.name}')"><i class="bi bi-plus-circle"></i></button></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Prize Catalog -->
    <div id="reward-prizes-tab" style="display:none">
      <div class="row g-3">
        ${this._prizes.map(p => `
        <div class="col-md-4 col-lg-3">
          <div class="card h-100 text-center p-3">
            <div class="py-3"><i class="bi ${p.icon} text-primary" style="font-size:3rem"></i></div>
            <h6 class="fw-bold">${p.name}</h6>
            <div class="small text-muted mb-2">${p.category}</div>
            <div class="mb-2"><span class="badge bg-primary fs-6">${p.cost} נקודות</span></div>
            <div class="small text-muted mb-3">מלאי: ${p.stock}</div>
            <button class="btn btn-sm btn-outline-primary mt-auto" onclick="Pages._rewardRedeem(${p.id})"><i class="bi bi-bag-check me-1"></i>מימוש</button>
          </div>
        </div>`).join('')}
      </div>
    </div>

    <!-- Redemption History -->
    <div id="reward-history-tab" style="display:none">
      <div class="card">
        <table class="table table-bht mb-0">
          <thead><tr><th>תלמיד</th><th>פרס</th><th>נקודות</th><th>תאריך</th></tr></thead>
          <tbody>
            ${[...this._redeemHist].sort((a, b) => b.date.localeCompare(a.date)).map(r => `
            <tr>
              <td><div class="d-flex align-items-center gap-2">${Utils.avatarHTML(r.student, 'xs')}<span class="fw-bold">${r.student}</span></div></td>
              <td>${r.prize}</td>
              <td class="text-danger fw-bold">-${r.cost}</td>
              <td>${Utils.formatDateShort(r.date)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Grant Points Modal -->
    <div class="modal fade" id="reward-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title"><i class="bi bi-plus-circle me-2"></i>הענקת נקודות</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <div class="mb-3"><label class="form-label">תלמיד</label><select class="form-select" id="rf-student">${students.map(s => `<option>${s.name}</option>`).join('')}</select></div>
        <div class="mb-3"><label class="form-label">נקודות</label><input type="number" class="form-control" id="rf-points" value="10" min="1"></div>
        <div class="mb-3"><label class="form-label">סיבה</label><select class="form-select" id="rf-reason">
          <option>הישג לימודי</option><option>התנהגות מצוינת</option><option>עזרה לחבר</option><option>נוכחות מלאה</option><option>מבחן מצוין</option><option>אחר</option>
        </select></div>
        <div class="mb-3"><label class="form-label">הערות</label><input class="form-control" id="rf-notes"></div>
      </div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">ביטול</button><button class="btn btn-primary" onclick="Pages._rewardSaveGrant()">הענק</button></div>
    </div></div></div>`;
  },

  async rewardsInit() {
    // Try loading from API, fall back to demo data
    try {
      const apiData = await App.getData('פרסים');
      if (apiData && apiData.length) {
        this._rewardStudents = apiData.filter(r => r['סוג'] === 'תלמיד' || !r['סוג']).map((row, i) => ({
          name: row['שם'] || row.name || '',
          points: parseInt(row['נקודות'] || row.points) || 0,
          redeemed: parseInt(row['מימושים'] || row.redeemed) || 0
        }));
        const prizes = apiData.filter(r => r['סוג'] === 'פרס');
        if (prizes.length) {
          this._prizes = prizes.map((row, i) => ({
            id: row._id || row.id || i + 1,
            name: row['שם'] || row.name || '',
            cost: parseInt(row['עלות'] || row.cost) || 0,
            icon: row['אייקון'] || row.icon || 'bi-gift',
            category: row['קטגוריה'] || row.category || '',
            stock: parseInt(row['מלאי'] || row.stock) || 0
          }));
        }
      }
    } catch(e) { /* keep demo data */ }
  },

  _rewardTab(tab, e) {
    e.preventDefault();
    document.querySelectorAll('#reward-tabs .nav-link').forEach(l => l.classList.remove('active'));
    e.currentTarget.classList.add('active');
    ['board', 'prizes', 'history'].forEach(t => {
      const el = document.getElementById('reward-' + t + '-tab');
      if (el) el.style.display = t === tab ? '' : 'none';
    });
  },

  _rewardShowGrant() {
    new bootstrap.Modal(document.getElementById('reward-modal')).show();
  },

  async _rewardSaveGrant() {
    const name = document.getElementById('rf-student')?.value;
    const pts = parseInt(document.getElementById('rf-points')?.value) || 0;
    if (pts <= 0) { Utils.toast('יש להזין מספר נקודות חיובי', 'warning'); return; }
    const student = this._rewardStudents.find(s => s.name === name);
    if (student) student.points += pts;

    // Save to API
    try {
      await App.apiCall('add', 'פרסים', { row: { 'שם': name, 'נקודות': pts, 'סיבה': document.getElementById('rf-reason')?.value || '', 'תאריך': new Date().toISOString().slice(0, 10) } });
    } catch(e) { /* localStorage fallback */ }

    bootstrap.Modal.getInstance(document.getElementById('reward-modal'))?.hide();
    Utils.toast(`${pts} נקודות הוענקו ל${name}!`);
    App.navigate('rewards');
  },

  _rewardQuickGrant(name) {
    const student = this._rewardStudents.find(s => s.name === name);
    if (student) { student.points += 10; Utils.toast(`+10 נקודות ל${name}!`); App.navigate('rewards'); }
  },

  _rewardRedeem(prizeId) {
    const prize = this._prizes.find(p => p.id === prizeId);
    if (!prize) return;
    Utils.toast(`מימוש "${prize.name}" — נדרשות ${prize.cost} נקודות. בחר תלמיד לביצוע.`, 'info');
  }
});
