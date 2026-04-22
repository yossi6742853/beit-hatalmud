/* ===== BHT v5.3 — Voting (הצבעות וסקרים) ===== */
Object.assign(Pages, {
  _polls: [
    { id: 1, q: 'מתי לקיים את הטיול השנתי?', opts: ['אייר', 'סיון', 'תמוז'], votes: [12, 8, 5], closed: false, endDate: '2026-04-30', created: '2026-04-15', author: 'מזכירות' },
    { id: 2, q: 'נושא לשבת חיזוק', opts: ['הרצאת רב', 'סיור שולחן', 'סעודה משותפת'], votes: [15, 7, 10], closed: false, endDate: '2026-04-25', created: '2026-04-18', author: 'ועד תלמידים' },
    { id: 3, q: 'שביעות הורים - האם אתם מרוצים?', opts: ['מאוד מרוצה', 'מרוצה', 'סביר', 'לא מרוצה'], votes: [20, 15, 3, 1], closed: true, endDate: '2026-04-10', created: '2026-04-01', author: 'הנהלה' },
    { id: 4, q: 'איזה ספר ללמוד בשיעור הכללי?', opts: ['מסילת ישרים', 'חובות הלבבות', 'שמירת הלשון'], votes: [9, 14, 6], closed: false, endDate: '2026-05-01', created: '2026-04-20', author: 'ר"מ' },
    { id: 5, q: 'האם להוסיף שיעור ערב?', opts: ['כן', 'לא', 'אולי - תלוי בשעה'], votes: [22, 4, 11], closed: true, endDate: '2026-04-05', created: '2026-03-28', author: 'הנהלה' }
  ],

  voting() {
    const polls = this._polls;
    const totalVotes = polls.reduce((s, p) => s + p.votes.reduce((a, b) => a + b, 0), 0);
    const activePolls = polls.filter(p => !p.closed);
    const closedPolls = polls.filter(p => p.closed);
    const participation = polls.length ? Math.round(totalVotes / polls.length) : 0;

    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div><h1><i class="bi bi-bar-chart-fill me-2"></i>הצבעות וסקרים</h1><p class="text-muted mb-0">ניהול סקרים והצבעות</p></div>
      <button class="btn btn-primary btn-sm" onclick="Pages._pollShowAdd()"><i class="bi bi-plus-lg me-1"></i>סקר חדש</button>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-primary">${polls.length}</div><small class="text-muted">סה"כ סקרים</small></div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-success">${activePolls.length}</div><small class="text-muted">פעילים</small></div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-info">${totalVotes}</div><small class="text-muted">סה"כ הצבעות</small></div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-warning">${participation}</div><small class="text-muted">ממוצע הצבעות לסקר</small></div></div>
    </div>

    <ul class="nav nav-tabs mb-3" id="poll-tabs">
      <li class="nav-item"><a class="nav-link active" href="#" onclick="Pages._pollTab('active',event)"><i class="bi bi-lightning me-1"></i>פעילים (${activePolls.length})</a></li>
      <li class="nav-item"><a class="nav-link" href="#" onclick="Pages._pollTab('closed',event)"><i class="bi bi-archive me-1"></i>ארכיון (${closedPolls.length})</a></li>
    </ul>

    <div id="poll-active-tab">
      ${activePolls.length ? activePolls.map(p => this._pollCard(p)).join('') : '<div class="empty-state"><i class="bi bi-bar-chart"></i><h5>אין סקרים פעילים</h5></div>'}
    </div>

    <div id="poll-closed-tab" style="display:none">
      ${closedPolls.length ? closedPolls.map(p => this._pollCard(p)).join('') : '<div class="empty-state"><i class="bi bi-archive"></i><h5>אין סקרים בארכיון</h5></div>'}
    </div>

    <!-- Add Poll Modal -->
    <div class="modal fade" id="poll-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title"><i class="bi bi-bar-chart me-2"></i>סקר חדש</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <div class="mb-3"><label class="form-label">שאלה</label><input class="form-control" id="pf-question" placeholder="מה השאלה?"></div>
        <div class="mb-3">
          <label class="form-label">אפשרויות</label>
          <div id="pf-options">
            <div class="input-group mb-2"><input class="form-control pf-opt" placeholder="אפשרות 1"><button class="btn btn-outline-danger btn-sm" onclick="this.closest('.input-group').remove()"><i class="bi bi-x"></i></button></div>
            <div class="input-group mb-2"><input class="form-control pf-opt" placeholder="אפשרות 2"><button class="btn btn-outline-danger btn-sm" onclick="this.closest('.input-group').remove()"><i class="bi bi-x"></i></button></div>
          </div>
          <button class="btn btn-outline-primary btn-sm" onclick="Pages._pollAddOpt()"><i class="bi bi-plus me-1"></i>הוסף אפשרות</button>
        </div>
        <div class="mb-3"><label class="form-label">תאריך סיום</label><input type="date" class="form-control" id="pf-enddate"></div>
      </div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">ביטול</button><button class="btn btn-primary" onclick="Pages._pollSave()">צור סקר</button></div>
    </div></div></div>`;
  },

  _pollCard(p) {
    const total = p.votes.reduce((a, b) => a + b, 0);
    const maxVote = Math.max(...p.votes);
    const colors = ['primary', 'success', 'warning', 'danger', 'info', 'secondary'];
    return `
    <div class="card mb-3 p-3">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <div>
          <h5 class="mb-1">${p.q}</h5>
          <div class="small text-muted"><i class="bi bi-person me-1"></i>${p.author} | <i class="bi bi-calendar me-1"></i>${Utils.formatDateShort(p.created)}${p.endDate ? ' | מסתיים: ' + Utils.formatDateShort(p.endDate) : ''}</div>
        </div>
        <span class="badge bg-${p.closed ? 'secondary' : 'success'}">${p.closed ? 'נסגר' : 'פעיל'}</span>
      </div>
      <div class="my-3">
        ${p.opts.map((o, i) => {
          const pct = total ? Math.round(p.votes[i] / total * 100) : 0;
          const isMax = p.votes[i] === maxVote && total > 0;
          return `
          <div class="mb-2">
            <div class="d-flex justify-content-between small mb-1">
              <span class="${isMax ? 'fw-bold' : ''}">${o}${isMax ? ' <i class="bi bi-star-fill text-warning"></i>' : ''}</span>
              <span class="text-muted">${p.votes[i]} (${pct}%)</span>
            </div>
            <div class="progress" style="height:22px">
              <div class="progress-bar bg-${colors[i % colors.length]}" style="width:${pct}%"></div>
            </div>
          </div>`;
        }).join('')}
      </div>
      ${!p.closed ? `<div class="d-flex gap-2 flex-wrap border-top pt-2">
        ${p.opts.map((o, i) => `<button class="btn btn-outline-${colors[i % colors.length]} btn-sm" onclick="Pages._vote(${p.id},${i})"><i class="bi bi-hand-index me-1"></i>${o}</button>`).join('')}
      </div>` : ''}
      <div class="text-muted small mt-2"><i class="bi bi-people me-1"></i>${total} הצבעות</div>
    </div>`;
  },

  votingInit() {},

  _pollTab(tab, e) {
    e.preventDefault();
    document.querySelectorAll('#poll-tabs .nav-link').forEach(l => l.classList.remove('active'));
    e.currentTarget.classList.add('active');
    document.getElementById('poll-active-tab').style.display = tab === 'active' ? '' : 'none';
    document.getElementById('poll-closed-tab').style.display = tab === 'closed' ? '' : 'none';
  },

  _vote(pid, oi) {
    const p = this._polls.find(x => x.id === pid);
    if (p && !p.closed) {
      p.votes[oi]++;
      Utils.toast('הצבעה נקלטה!');
      App.navigate('voting');
    }
  },

  _pollShowAdd() {
    new bootstrap.Modal(document.getElementById('poll-modal')).show();
  },

  _pollAddOpt() {
    const container = document.getElementById('pf-options');
    const count = container.querySelectorAll('.pf-opt').length + 1;
    const div = document.createElement('div');
    div.className = 'input-group mb-2';
    div.innerHTML = `<input class="form-control pf-opt" placeholder="אפשרות ${count}"><button class="btn btn-outline-danger btn-sm" onclick="this.closest('.input-group').remove()"><i class="bi bi-x"></i></button>`;
    container.appendChild(div);
  },

  _pollSave() {
    const q = document.getElementById('pf-question')?.value?.trim();
    const opts = [...document.querySelectorAll('.pf-opt')].map(i => i.value.trim()).filter(Boolean);
    const endDate = document.getElementById('pf-enddate')?.value || '';
    if (!q) { Utils.toast('יש להזין שאלה', 'warning'); return; }
    if (opts.length < 2) { Utils.toast('נדרשות לפחות 2 אפשרויות', 'warning'); return; }
    this._polls.unshift({
      id: this._polls.length + 1, q, opts, votes: opts.map(() => 0),
      closed: false, endDate, created: new Date().toISOString().slice(0, 10), author: 'מזכירות'
    });
    bootstrap.Modal.getInstance(document.getElementById('poll-modal'))?.hide();
    Utils.toast('סקר נוצר בהצלחה!');
    App.navigate('voting');
  }
});
