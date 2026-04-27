/* ===== BHT v5.4 — Voting & Polls (הצבעות וסקרים) — Full Upgrade ===== */
Object.assign(Pages, {

  /* ======================================================================
     VOTING — Stats, Active Polls, Vote Interface, Create Poll, Archive
     ====================================================================== */

  /* ---------- Demo data: 6 polls (3 active, 3 closed) ---------- */
  _pollData() {
    return [
      {
        id: 'p01', question: 'מתי לקיים את הטיול השנתי?',
        options: ['חודש אייר', 'חודש סיון', 'חודש תמוז', 'חודש אלול'],
        votes: [18, 12, 7, 3], anonymous: false,
        closed: false, endDate: '2026-05-15', created: '2026-04-10',
        author: 'מזכירות', category: 'אירועים',
        voters: { 'p01-0': ['יוסי כ.', 'דוד ש.', 'אברהם ל.'], 'p01-1': ['משה ר.', 'חיים ב.'], 'p01-2': ['נתן ג.'], 'p01-3': [] }
      },
      {
        id: 'p02', question: 'נושא לשבת חיזוק הקרובה',
        options: ['הרצאת הרב הראשי', 'פאנל עם בוגרים', 'סעודה משותפת עם שירה', 'שיעור מוסר מיוחד'],
        votes: [22, 15, 19, 8], anonymous: false,
        closed: false, endDate: '2026-04-28', created: '2026-04-18',
        author: 'ועד תלמידים', category: 'לימודים',
        voters: {}
      },
      {
        id: 'p03', question: 'האם להוסיף חוג ערב נוסף למערכת?',
        options: ['בהחלט כן', 'רק אם זה אחרי 20:00', 'לא צריך', 'אני לא משתתף בחוגים'],
        votes: [31, 14, 5, 2], anonymous: true,
        closed: false, endDate: '2026-05-01', created: '2026-04-20',
        author: 'הנהלה', category: 'מנהלה',
        voters: {}
      },
      {
        id: 'p04', question: 'שביעות רצון הורים מהמוסד - סיכום שנתי',
        options: ['מאוד מרוצה', 'מרוצה', 'סביר', 'לא מרוצה', 'לא מרוצה כלל'],
        votes: [28, 19, 6, 2, 1], anonymous: true,
        closed: true, endDate: '2026-04-01', created: '2026-03-15',
        author: 'הנהלה', category: 'משוב',
        voters: {}
      }
    ];
  },

  /* ---------- State ---------- */
  _pollState: {
    polls: null,
    voted: {},       // { pollId: optionIndex }
    tab: 'active',
    search: '',
    filterCat: '',
    sortBy: 'date',  // date | votes | endDate
    animatedBars: new Set()
  },

  /* ---------- Initialize polls on first load ---------- */
  _pollEnsureData() {
    if (!this._pollState.polls) {
      this._pollState.polls = this._pollData();
    }
    return this._pollState.polls;
  },

  /* ---------- Helpers ---------- */
  _pollColors: ['primary', 'success', 'warning', 'danger', 'info', 'secondary', 'dark'],
  _pollCategoryIcons: {
    'אירועים': 'calendar-event',
    'לימודים': 'book',
    'מנהלה': 'gear',
    'משוב': 'chat-square-text',
    'כללי': 'megaphone'
  },

  _pollTimeLeft(endDate) {
    const now = new Date();
    const end = new Date(endDate + 'T23:59:59');
    const diff = end - now;
    if (diff <= 0) return { text: 'הסתיים', urgent: true };
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    if (days > 3) return { text: `${days} ימים`, urgent: false };
    if (days > 0) return { text: `${days} ימים ${hours} שעות`, urgent: true };
    return { text: `${hours} שעות`, urgent: true };
  },

  _pollTotalVotes(p) {
    return p.votes.reduce((a, b) => a + b, 0);
  },

  _pollWinnerIndex(p) {
    const total = this._pollTotalVotes(p);
    if (total === 0) return -1;
    return p.votes.indexOf(Math.max(...p.votes));
  },

  _pollCategories() {
    const polls = this._pollEnsureData();
    const cats = new Set(polls.map(p => p.category).filter(Boolean));
    return [...cats].sort();
  },

  /* ---------- Main page HTML ---------- */
  voting() {
    const polls = this._pollEnsureData();
    const st = this._pollState;

    // Stats
    const totalPolls = polls.length;
    const activePolls = polls.filter(p => !p.closed);
    const closedPolls = polls.filter(p => p.closed);
    const totalVotes = polls.reduce((s, p) => s + this._pollTotalVotes(p), 0);
    const avgVotes = totalPolls ? Math.round(totalVotes / totalPolls) : 0;
    const participation = totalPolls ? Math.round((Object.keys(st.voted).length / activePolls.length) * 100) || 0 : 0;
    const mostActive = polls.reduce((best, p) => this._pollTotalVotes(p) > this._pollTotalVotes(best) ? p : best, polls[0]);

    // Filter
    let filtered = polls.filter(p => st.tab === 'active' ? !p.closed : p.closed);
    if (st.search) {
      const q = st.search.toLowerCase();
      filtered = filtered.filter(p => p.question.toLowerCase().includes(q) || p.author.toLowerCase().includes(q));
    }
    if (st.filterCat) {
      filtered = filtered.filter(p => p.category === st.filterCat);
    }

    // Sort
    filtered.sort((a, b) => {
      if (st.sortBy === 'votes') return this._pollTotalVotes(b) - this._pollTotalVotes(a);
      if (st.sortBy === 'endDate') return new Date(a.endDate) - new Date(b.endDate);
      return new Date(b.created) - new Date(a.created);
    });

    const cats = this._pollCategories();
    const activeCount = activePolls.length;
    const closedCount = closedPolls.length;

    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2 mb-4">
      <div>
        <h1 class="mb-1"><i class="bi bi-bar-chart-fill me-2 text-primary"></i>הצבעות וסקרים</h1>
        <p class="text-muted mb-0">ניהול סקרים, הצבעות ומשובים | ${totalPolls} סקרים במערכת</p>
      </div>
      <button class="btn btn-primary" onclick="Pages._pollShowCreate()">
        <i class="bi bi-plus-circle me-1"></i>סקר חדש
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="row g-3 mb-4">
      <div class="col-6 col-lg-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body text-center p-3">
            <div class="d-flex align-items-center justify-content-center mb-2">
              <div class="rounded-circle bg-primary bg-opacity-10 p-2 me-2">
                <i class="bi bi-bar-chart-line fs-5 text-primary"></i>
              </div>
            </div>
            <div class="fs-3 fw-bold text-primary">${totalPolls}</div>
            <small class="text-muted">סה"כ סקרים</small>
          </div>
        </div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body text-center p-3">
            <div class="d-flex align-items-center justify-content-center mb-2">
              <div class="rounded-circle bg-success bg-opacity-10 p-2 me-2">
                <i class="bi bi-lightning-charge fs-5 text-success"></i>
              </div>
            </div>
            <div class="fs-3 fw-bold text-success">${activeCount}</div>
            <small class="text-muted">סקרים פעילים</small>
          </div>
        </div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body text-center p-3">
            <div class="d-flex align-items-center justify-content-center mb-2">
              <div class="rounded-circle bg-info bg-opacity-10 p-2 me-2">
                <i class="bi bi-hand-index-thumb fs-5 text-info"></i>
              </div>
            </div>
            <div class="fs-3 fw-bold text-info">${totalVotes}</div>
            <small class="text-muted">סה"כ הצבעות</small>
          </div>
        </div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body text-center p-3">
            <div class="d-flex align-items-center justify-content-center mb-2">
              <div class="rounded-circle bg-warning bg-opacity-10 p-2 me-2">
                <i class="bi bi-graph-up fs-5 text-warning"></i>
              </div>
            </div>
            <div class="fs-3 fw-bold text-warning">${avgVotes}</div>
            <small class="text-muted">ממוצע לסקר</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Most Popular Poll Banner -->
    ${mostActive ? `
    <div class="alert alert-info border-0 shadow-sm d-flex align-items-center mb-4">
      <i class="bi bi-trophy-fill fs-4 me-3 text-info"></i>
      <div>
        <strong>הסקר הפופולרי ביותר:</strong> ${mostActive.question}
        <span class="badge bg-info ms-2">${this._pollTotalVotes(mostActive)} הצבעות</span>
      </div>
    </div>` : ''}

    <!-- Tabs -->
    <ul class="nav nav-pills mb-3" id="poll-tabs">
      <li class="nav-item">
        <a class="nav-link ${st.tab === 'active' ? 'active' : ''}" href="#" onclick="Pages._pollSwitchTab('active',event)">
          <i class="bi bi-lightning-charge me-1"></i>פעילים
          <span class="badge bg-white text-primary ms-1">${activeCount}</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link ${st.tab === 'closed' ? 'active' : ''}" href="#" onclick="Pages._pollSwitchTab('closed',event)">
          <i class="bi bi-archive me-1"></i>ארכיון
          <span class="badge bg-white text-secondary ms-1">${closedCount}</span>
        </a>
      </li>
    </ul>

    <!-- Toolbar: search, filter, sort -->
    <div class="row g-2 mb-3">
      <div class="col-md-5">
        <div class="input-group">
          <span class="input-group-text bg-white"><i class="bi bi-search"></i></span>
          <input type="text" class="form-control" id="poll-search" placeholder="חיפוש לפי שאלה או יוצר..."
                 value="${st.search}" oninput="Pages._pollSearch(this.value)">
          ${st.search ? '<button class="btn btn-outline-secondary" onclick="Pages._pollSearch(\'\')"><i class="bi bi-x"></i></button>' : ''}
        </div>
      </div>
      <div class="col-md-3">
        <select class="form-select" id="poll-filter-cat" onchange="Pages._pollFilterCat(this.value)">
          <option value="">כל הקטגוריות</option>
          ${cats.map(c => `<option value="${c}" ${st.filterCat === c ? 'selected' : ''}>${c}</option>`).join('')}
        </select>
      </div>
      <div class="col-md-4">
        <div class="btn-group w-100" role="group">
          <button class="btn btn-${st.sortBy === 'date' ? 'primary' : 'outline-primary'} btn-sm" onclick="Pages._pollSort('date')">
            <i class="bi bi-calendar me-1"></i>תאריך
          </button>
          <button class="btn btn-${st.sortBy === 'votes' ? 'primary' : 'outline-primary'} btn-sm" onclick="Pages._pollSort('votes')">
            <i class="bi bi-sort-numeric-down me-1"></i>הצבעות
          </button>
          <button class="btn btn-${st.sortBy === 'endDate' ? 'primary' : 'outline-primary'} btn-sm" onclick="Pages._pollSort('endDate')">
            <i class="bi bi-hourglass me-1"></i>סיום
          </button>
        </div>
      </div>
    </div>

    <!-- Poll Cards -->
    <div id="poll-cards-container">
      ${filtered.length ? filtered.map((p, idx) => this._pollRenderCard(p, idx)).join('') :
        `<div class="text-center py-5">
          <i class="bi bi-${st.tab === 'active' ? 'bar-chart' : 'archive'} display-1 text-muted opacity-25"></i>
          <h5 class="text-muted mt-3">${st.tab === 'active' ? 'אין סקרים פעילים' : 'אין סקרים בארכיון'}</h5>
          <p class="text-muted">${st.search || st.filterCat ? 'נסה לשנות את מסנני החיפוש' : st.tab === 'active' ? 'צור סקר חדש כדי להתחיל' : 'סקרים שנסגרו יופיעו כאן'}</p>
          ${st.tab === 'active' && !st.search ? '<button class="btn btn-primary btn-sm" onclick="Pages._pollShowCreate()"><i class="bi bi-plus-circle me-1"></i>צור סקר חדש</button>' : ''}
        </div>`}
    </div>

    <!-- Create Poll Modal -->
    <div class="modal fade" id="poll-create-modal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title"><i class="bi bi-plus-circle me-2"></i>יצירת סקר חדש</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="row g-3">
              <div class="col-12">
                <label class="form-label fw-bold"><i class="bi bi-question-circle me-1"></i>שאלת הסקר</label>
                <input type="text" class="form-control form-control-lg" id="pf-question" placeholder="מה תרצה לשאול?">
              </div>
              <div class="col-md-6">
                <label class="form-label fw-bold"><i class="bi bi-tag me-1"></i>קטגוריה</label>
                <select class="form-select" id="pf-category">
                  <option value="כללי">כללי</option>
                  <option value="לימודים">לימודים</option>
                  <option value="אירועים">אירועים</option>
                  <option value="מנהלה">מנהלה</option>
                  <option value="משוב">משוב</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label fw-bold"><i class="bi bi-calendar me-1"></i>תאריך סיום</label>
                <input type="date" class="form-control" id="pf-enddate">
              </div>
              <div class="col-12">
                <label class="form-label fw-bold"><i class="bi bi-list-ul me-1"></i>אפשרויות תשובה</label>
                <div id="pf-options-list">
                  <div class="input-group mb-2 pf-opt-row">
                    <span class="input-group-text bg-primary text-white fw-bold">1</span>
                    <input type="text" class="form-control pf-opt-input" placeholder="אפשרות ראשונה">
                    <button class="btn btn-outline-danger" onclick="Pages._pollRemoveOpt(this)" title="הסר">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                  <div class="input-group mb-2 pf-opt-row">
                    <span class="input-group-text bg-primary text-white fw-bold">2</span>
                    <input type="text" class="form-control pf-opt-input" placeholder="אפשרות שנייה">
                    <button class="btn btn-outline-danger" onclick="Pages._pollRemoveOpt(this)" title="הסר">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
                <button class="btn btn-outline-primary btn-sm mt-1" onclick="Pages._pollAddOption()">
                  <i class="bi bi-plus-circle me-1"></i>הוסף אפשרות
                </button>
              </div>
              <div class="col-12">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="pf-anonymous">
                  <label class="form-check-label" for="pf-anonymous">
                    <i class="bi bi-incognito me-1"></i>הצבעה אנונימית
                    <small class="text-muted d-block">המצביעים לא יוצגו בתוצאות</small>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              <i class="bi bi-x me-1"></i>ביטול
            </button>
            <button type="button" class="btn btn-primary" onclick="Pages._pollCreate()">
              <i class="bi bi-check-circle me-1"></i>צור סקר
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Vote Confirmation Modal -->
    <div class="modal fade" id="poll-vote-modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title" id="poll-vote-title"><i class="bi bi-check-circle me-2"></i>אישור הצבעה</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body text-center" id="poll-vote-body"></div>
          <div class="modal-footer justify-content-center">
            <button class="btn btn-secondary" data-bs-dismiss="modal">ביטול</button>
            <button class="btn btn-success" id="poll-vote-confirm" onclick="Pages._pollConfirmVote()">
              <i class="bi bi-hand-index me-1"></i>אשר הצבעה
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Poll Detail Modal -->
    <div class="modal fade" id="poll-detail-modal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="poll-detail-title"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" id="poll-detail-body"></div>
        </div>
      </div>
    </div>`;
  },

  /* ---------- Render a single poll card ---------- */
  _pollRenderCard(p, idx) {
    const total = this._pollTotalVotes(p);
    const winnerIdx = this._pollWinnerIndex(p);
    const colors = this._pollColors;
    const hasVoted = this._pollState.voted[p.id] !== undefined;
    const showResults = p.closed || hasVoted;
    const timeLeft = !p.closed ? this._pollTimeLeft(p.endDate) : null;
    const catIcon = this._pollCategoryIcons[p.category] || 'megaphone';
    const animDelay = idx * 80;

    return `
    <div class="card mb-3 border-0 shadow-sm poll-card" style="animation: fadeInUp 0.4s ease ${animDelay}ms both">
      <div class="card-body p-4">
        <!-- Header -->
        <div class="d-flex justify-content-between align-items-start mb-3">
          <div class="flex-grow-1">
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="badge bg-${p.closed ? 'secondary' : 'success'} bg-opacity-${p.closed ? '75' : '100'}">
                <i class="bi bi-${p.closed ? 'lock' : 'unlock'} me-1"></i>${p.closed ? 'נסגר' : 'פעיל'}
              </span>
              <span class="badge bg-light text-dark">
                <i class="bi bi-${catIcon} me-1"></i>${p.category}
              </span>
              ${p.anonymous ? '<span class="badge bg-dark"><i class="bi bi-incognito me-1"></i>אנונימי</span>' : ''}
              ${timeLeft && timeLeft.urgent ? `<span class="badge bg-danger"><i class="bi bi-hourglass-split me-1"></i>${timeLeft.text}</span>` : ''}
            </div>
            <h5 class="mb-1 fw-bold">${p.question}</h5>
            <div class="small text-muted">
              <i class="bi bi-person me-1"></i>${p.author}
              <span class="mx-2">|</span>
              <i class="bi bi-calendar-plus me-1"></i>נוצר: ${Utils.formatDateShort(p.created)}
              ${p.endDate ? `<span class="mx-2">|</span><i class="bi bi-calendar-check me-1"></i>סיום: ${Utils.formatDateShort(p.endDate)}` : ''}
              ${timeLeft && !timeLeft.urgent ? `<span class="mx-2">|</span><i class="bi bi-hourglass me-1"></i>נותרו ${timeLeft.text}` : ''}
            </div>
          </div>
          <div class="dropdown">
            <button class="btn btn-light btn-sm" data-bs-toggle="dropdown">
              <i class="bi bi-three-dots-vertical"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="#" onclick="Pages._pollShowDetail('${p.id}');return false">
                <i class="bi bi-eye me-2"></i>פרטים מלאים
              </a></li>
              ${!p.closed ? `<li><a class="dropdown-item" href="#" onclick="Pages._pollClose('${p.id}');return false">
                <i class="bi bi-lock me-2"></i>סגור סקר
              </a></li>` : `<li><a class="dropdown-item" href="#" onclick="Pages._pollReopen('${p.id}');return false">
                <i class="bi bi-unlock me-2"></i>פתח מחדש
              </a></li>`}
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item text-danger" href="#" onclick="Pages._pollDelete('${p.id}');return false">
                <i class="bi bi-trash me-2"></i>מחק
              </a></li>
            </ul>
          </div>
        </div>

        <!-- Results / Vote Interface -->
        ${showResults ? this._pollRenderResults(p, total, winnerIdx, colors) : this._pollRenderVoteInterface(p, colors)}

        <!-- Footer -->
        <div class="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
          <div class="text-muted small">
            <i class="bi bi-people-fill me-1"></i><strong>${total}</strong> הצבעות
            ${hasVoted ? '<span class="badge bg-success bg-opacity-10 text-success ms-2"><i class="bi bi-check-circle me-1"></i>הצבעת</span>' : ''}
          </div>
          <button class="btn btn-outline-primary btn-sm" onclick="Pages._pollShowDetail('${p.id}')">
            <i class="bi bi-bar-chart-line me-1"></i>פרטים
          </button>
        </div>
      </div>
    </div>`;
  },

  /* ---------- Render animated progress bars (results view) ---------- */
  _pollRenderResults(p, total, winnerIdx, colors) {
    return `<div class="poll-results">
      ${p.options.map((opt, i) => {
        const pct = total ? Math.round(p.votes[i] / total * 100) : 0;
        const isWinner = i === winnerIdx && total > 0;
        const color = colors[i % colors.length];
        return `
        <div class="mb-3">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span class="${isWinner ? 'fw-bold' : ''}">
              ${isWinner ? '<i class="bi bi-trophy-fill text-warning me-1"></i>' : ''}
              ${opt}
            </span>
            <span class="text-muted small">
              <strong>${p.votes[i]}</strong> (${pct}%)
            </span>
          </div>
          <div class="progress" style="height: 28px; border-radius: 8px; overflow: hidden;">
            <div class="progress-bar bg-${color} poll-bar-animate ${isWinner ? 'progress-bar-striped progress-bar-animated' : ''}"
                 role="progressbar"
                 data-target-width="${pct}"
                 style="width: 0%; transition: width 1s ease-out ${i * 150}ms; border-radius: 8px; font-size: 0.85rem; font-weight: 600;"
                 aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
              ${pct >= 10 ? pct + '%' : ''}
            </div>
          </div>
        </div>`;
      }).join('')}
    </div>`;
  },

  /* ---------- Render radio button vote interface ---------- */
  _pollRenderVoteInterface(p, colors) {
    return `
    <div class="poll-vote-interface">
      <div class="mb-2 text-muted small"><i class="bi bi-info-circle me-1"></i>בחר אפשרות אחת והצבע:</div>
      ${p.options.map((opt, i) => {
        const color = colors[i % colors.length];
        return `
        <div class="form-check poll-option-radio mb-2 p-3 border rounded-3 bg-light bg-opacity-50"
             style="cursor:pointer; transition: all 0.2s ease;"
             onclick="this.querySelector('input').checked=true; document.querySelectorAll('.poll-option-radio[data-poll=\\'${p.id}\\']').forEach(el=>el.classList.remove('border-primary','bg-primary','bg-opacity-10')); this.classList.add('border-primary','bg-primary','bg-opacity-10')"
             data-poll="${p.id}">
          <input class="form-check-input" type="radio" name="vote-${p.id}" id="vote-${p.id}-${i}" value="${i}">
          <label class="form-check-label w-100 fw-medium" for="vote-${p.id}-${i}" style="cursor:pointer">
            <span class="badge bg-${color} me-2">${i + 1}</span>${opt}
          </label>
        </div>`;
      }).join('')}
      <div class="text-center mt-3">
        <button class="btn btn-success px-4" onclick="Pages._pollSubmitVote('${p.id}')">
          <i class="bi bi-hand-index-thumb me-1"></i>הצבע
        </button>
      </div>
    </div>`;
  },

  /* ---------- Init: animate progress bars ---------- */
  _votingUseDemo: false,

  votingLoadDemo() {
    this._votingUseDemo = true;
    App.navigate('voting');
  },

  votingInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    // Try loading from API, fall back to demo data
    try {
      const apiData = _gc('הצבעות');
      if (apiData && apiData.length) {
        this._pollState.polls = apiData.map(row => ({
          id: row._id || row.id || 'p_' + Date.now(),
          question: row['שאלה'] || row.question || '',
          options: row.options ? (typeof row.options === 'string' ? JSON.parse(row.options) : row.options) : [],
          votes: row.votes ? (typeof row.votes === 'string' ? JSON.parse(row.votes) : row.votes) : [],
          anonymous: row['אנונימי'] === 'כן' || row.anonymous === true,
          closed: row['סגור'] === 'כן' || row.closed === true,
          endDate: row['תאריך_סיום'] || row.endDate || '',
          created: row['תאריך_יצירה'] || row.created || '',
          author: row['יוצר'] || row.author || 'מזכירות',
          category: row['קטגוריה'] || row.category || 'כללי',
          voters: row.voters ? (typeof row.voters === 'string' ? JSON.parse(row.voters) : row.voters) : {}
        }));
      }
    } catch(e) { /* keep current data */ }

    // If no API data and demo not requested, clear hardcoded
    if (!this._votingUseDemo && this._votingPolls?.length && this._votingPolls[0]?.id === 1) {
      this._votingPolls = [];
    }

    // Animate progress bars after render
    requestAnimationFrame(() => {
      setTimeout(() => {
        document.querySelectorAll('.poll-bar-animate').forEach(bar => {
          const target = bar.getAttribute('data-target-width');
          bar.style.width = target + '%';
        });
      }, 100);
    });

    // Auto-close expired polls
    const polls = this._pollEnsureData();
    const today = new Date().toISOString().slice(0, 10);
    polls.forEach(p => {
      if (!p.closed && p.endDate && p.endDate < today) {
        p.closed = true;
      }
    });

    // Add CSS animation keyframes if not present
    if (!document.getElementById('poll-animations')) {
      const style = document.createElement('style');
      style.id = 'poll-animations';
      style.textContent = `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .poll-card:hover { transform: translateY(-2px); transition: transform 0.2s ease; }
        .poll-option-radio:hover { background-color: rgba(var(--bs-primary-rgb), 0.05) !important; border-color: var(--bs-primary) !important; }
        .poll-pulse { animation: pollPulse 0.6s ease; }
        @keyframes pollPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
      `;
      document.head.appendChild(style);
    }
  },

  /* ---------- Tab switching ---------- */
  _pollSwitchTab(tab, e) {
    e && e.preventDefault();
    this._pollState.tab = tab;
    this._pollState.search = '';
    this._pollState.filterCat = '';
    App.navigate('voting');
  },

  /* ---------- Search ---------- */
  _pollSearch(val) {
    this._pollState.search = val;
    App.navigate('voting');
  },

  /* ---------- Filter by category ---------- */
  _pollFilterCat(val) {
    this._pollState.filterCat = val;
    App.navigate('voting');
  },

  /* ---------- Sort ---------- */
  _pollSort(by) {
    this._pollState.sortBy = by;
    App.navigate('voting');
  },

  /* ---------- Submit vote (show confirmation) ---------- */
  _pollSubmitVote(pid) {
    const selected = document.querySelector(`input[name="vote-${pid}"]:checked`);
    if (!selected) {
      Utils.toast('יש לבחור אפשרות לפני הצבעה', 'warning');
      return;
    }
    const polls = this._pollEnsureData();
    const poll = polls.find(p => p.id === pid);
    if (!poll) return;
    const optIdx = parseInt(selected.value);
    const optText = poll.options[optIdx];

    // Store pending vote
    this._pollPendingVote = { pid, optIdx };

    // Show confirmation modal
    const body = document.getElementById('poll-vote-body');
    body.innerHTML = `
      <div class="py-3">
        <i class="bi bi-question-circle display-4 text-primary mb-3 d-block"></i>
        <h6 class="mb-2">${poll.question}</h6>
        <div class="alert alert-light border mt-3">
          <strong>הבחירה שלך:</strong><br>
          <span class="fs-5 text-primary fw-bold">${optText}</span>
        </div>
        ${poll.anonymous ? '<div class="text-muted small"><i class="bi bi-incognito me-1"></i>סקר אנונימי - הצבעתך לא תוצג</div>' : ''}
      </div>`;
    new bootstrap.Modal(document.getElementById('poll-vote-modal')).show();
  },

  /* ---------- Confirm vote ---------- */
  async _pollConfirmVote() {
    const pending = this._pollPendingVote;
    if (!pending) return;

    const polls = this._pollEnsureData();
    const poll = polls.find(p => p.id === pending.pid);
    if (!poll || poll.closed) return;

    // Record vote
    poll.votes[pending.optIdx]++;
    this._pollState.voted[pending.pid] = pending.optIdx;
    this._pollPendingVote = null;

    // Save updated votes to API
    try {
      await App.apiCall('update', 'הצבעות', { id: pending.pid, row: { 'votes': JSON.stringify(poll.votes) } });
    } catch(e) { /* ok */ }

    // Close modal and refresh
    bootstrap.Modal.getInstance(document.getElementById('poll-vote-modal'))?.hide();
    Utils.toast('ההצבעה נקלטה בהצלחה!', 'success');
    App.navigate('voting');
  },

  /* ---------- Show poll detail modal ---------- */
  _pollShowDetail(pid) {
    const polls = this._pollEnsureData();
    const p = polls.find(x => x.id === pid);
    if (!p) return;

    const total = this._pollTotalVotes(p);
    const winnerIdx = this._pollWinnerIndex(p);
    const colors = this._pollColors;
    const catIcon = this._pollCategoryIcons[p.category] || 'megaphone';

    document.getElementById('poll-detail-title').innerHTML =
      `<i class="bi bi-bar-chart-line me-2"></i>${p.question}`;

    let html = `
    <div class="row g-3 mb-4">
      <div class="col-md-3 text-center">
        <div class="card bg-light p-3">
          <div class="fs-3 fw-bold text-primary">${total}</div>
          <small class="text-muted">סה"כ הצבעות</small>
        </div>
      </div>
      <div class="col-md-3 text-center">
        <div class="card bg-light p-3">
          <div class="fs-3 fw-bold text-success">${p.options.length}</div>
          <small class="text-muted">אפשרויות</small>
        </div>
      </div>
      <div class="col-md-3 text-center">
        <div class="card bg-light p-3">
          <div class="fs-6 fw-bold text-info"><i class="bi bi-${catIcon} me-1"></i>${p.category}</div>
          <small class="text-muted">קטגוריה</small>
        </div>
      </div>
      <div class="col-md-3 text-center">
        <div class="card bg-light p-3">
          <div class="fs-6 fw-bold ${p.closed ? 'text-secondary' : 'text-success'}">
            <i class="bi bi-${p.closed ? 'lock' : 'unlock'} me-1"></i>${p.closed ? 'נסגר' : 'פעיל'}
          </div>
          <small class="text-muted">סטטוס</small>
        </div>
      </div>
    </div>

    <h6 class="fw-bold mb-3"><i class="bi bi-bar-chart-steps me-1"></i>תוצאות מפורטות</h6>
    <table class="table table-hover align-middle">
      <thead class="table-light">
        <tr>
          <th>#</th>
          <th>אפשרות</th>
          <th class="text-center">הצבעות</th>
          <th class="text-center">אחוז</th>
          <th style="width:40%">גרף</th>
        </tr>
      </thead>
      <tbody>`;

    // Sort options by votes desc for detail view
    const sorted = p.options.map((opt, i) => ({ opt, votes: p.votes[i], idx: i }))
      .sort((a, b) => b.votes - a.votes);

    sorted.forEach((item, rank) => {
      const pct = total ? Math.round(item.votes / total * 100) : 0;
      const color = colors[item.idx % colors.length];
      const isWinner = item.idx === winnerIdx && total > 0;
      html += `
        <tr class="${isWinner ? 'table-warning' : ''}">
          <td><span class="badge bg-${color}">${rank + 1}</span></td>
          <td class="${isWinner ? 'fw-bold' : ''}">
            ${isWinner ? '<i class="bi bi-trophy-fill text-warning me-1"></i>' : ''}${item.opt}
          </td>
          <td class="text-center fw-bold">${item.votes}</td>
          <td class="text-center">${pct}%</td>
          <td>
            <div class="progress" style="height:20px">
              <div class="progress-bar bg-${color}" style="width:${pct}%">${pct}%</div>
            </div>
          </td>
        </tr>`;
    });

    html += `</tbody></table>

    <div class="row g-3 mt-3">
      <div class="col-md-6">
        <div class="card bg-light p-3">
          <h6 class="fw-bold mb-2"><i class="bi bi-info-circle me-1"></i>מידע</h6>
          <div class="small">
            <div class="mb-1"><strong>יוצר:</strong> ${p.author}</div>
            <div class="mb-1"><strong>נוצר:</strong> ${Utils.formatDateShort(p.created)}</div>
            <div class="mb-1"><strong>תאריך סיום:</strong> ${Utils.formatDateShort(p.endDate)}</div>
            <div class="mb-1"><strong>אנונימי:</strong> ${p.anonymous ? 'כן' : 'לא'}</div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card bg-light p-3">
          <h6 class="fw-bold mb-2"><i class="bi bi-graph-up me-1"></i>סטטיסטיקות</h6>
          <div class="small">
            <div class="mb-1"><strong>סה"כ הצבעות:</strong> ${total}</div>
            <div class="mb-1"><strong>אפשרות מובילה:</strong> ${winnerIdx >= 0 ? p.options[winnerIdx] : '-'}</div>
            <div class="mb-1"><strong>ממוצע לאפשרות:</strong> ${p.options.length ? Math.round(total / p.options.length) : 0}</div>
            <div class="mb-1"><strong>פער בין 1 ל-2:</strong> ${sorted.length >= 2 ? sorted[0].votes - sorted[1].votes + ' הצבעות' : '-'}</div>
          </div>
        </div>
      </div>
    </div>`;

    document.getElementById('poll-detail-body').innerHTML = html;
    new bootstrap.Modal(document.getElementById('poll-detail-modal')).show();
  },

  /* ---------- Create poll modal ---------- */
  _pollShowCreate() {
    // Reset form
    const modal = document.getElementById('poll-create-modal');
    if (!modal) return;
    const qInput = modal.querySelector('#pf-question');
    if (qInput) qInput.value = '';
    const catSelect = modal.querySelector('#pf-category');
    if (catSelect) catSelect.value = 'כללי';
    const dateInput = modal.querySelector('#pf-enddate');
    if (dateInput) {
      const d = new Date();
      d.setDate(d.getDate() + 7);
      dateInput.value = d.toISOString().slice(0, 10);
    }
    const anon = modal.querySelector('#pf-anonymous');
    if (anon) anon.checked = false;

    // Reset options to 2
    const optList = document.getElementById('pf-options-list');
    if (optList) {
      optList.innerHTML = `
        <div class="input-group mb-2 pf-opt-row">
          <span class="input-group-text bg-primary text-white fw-bold">1</span>
          <input type="text" class="form-control pf-opt-input" placeholder="אפשרות ראשונה">
          <button class="btn btn-outline-danger" onclick="Pages._pollRemoveOpt(this)" title="הסר"><i class="bi bi-trash"></i></button>
        </div>
        <div class="input-group mb-2 pf-opt-row">
          <span class="input-group-text bg-primary text-white fw-bold">2</span>
          <input type="text" class="form-control pf-opt-input" placeholder="אפשרות שנייה">
          <button class="btn btn-outline-danger" onclick="Pages._pollRemoveOpt(this)" title="הסר"><i class="bi bi-trash"></i></button>
        </div>`;
    }

    new bootstrap.Modal(modal).show();
  },

  /* ---------- Add option in create modal ---------- */
  _pollAddOption() {
    const list = document.getElementById('pf-options-list');
    if (!list) return;
    const count = list.querySelectorAll('.pf-opt-row').length + 1;
    if (count > 10) {
      Utils.toast('מקסימום 10 אפשרויות', 'warning');
      return;
    }
    const div = document.createElement('div');
    div.className = 'input-group mb-2 pf-opt-row';
    div.innerHTML = `
      <span class="input-group-text bg-primary text-white fw-bold">${count}</span>
      <input type="text" class="form-control pf-opt-input" placeholder="אפשרות ${count}">
      <button class="btn btn-outline-danger" onclick="Pages._pollRemoveOpt(this)" title="הסר"><i class="bi bi-trash"></i></button>`;
    list.appendChild(div);
    div.querySelector('input').focus();
    this._pollRenumberOptions();
  },

  /* ---------- Remove option ---------- */
  _pollRemoveOpt(btn) {
    const list = document.getElementById('pf-options-list');
    const rows = list.querySelectorAll('.pf-opt-row');
    if (rows.length <= 2) {
      Utils.toast('נדרשות לפחות 2 אפשרויות', 'warning');
      return;
    }
    btn.closest('.pf-opt-row').remove();
    this._pollRenumberOptions();
  },

  /* ---------- Renumber option labels ---------- */
  _pollRenumberOptions() {
    const list = document.getElementById('pf-options-list');
    if (!list) return;
    list.querySelectorAll('.pf-opt-row').forEach((row, i) => {
      const badge = row.querySelector('.input-group-text');
      if (badge) badge.textContent = i + 1;
    });
  },

  /* ---------- Create poll ---------- */
  async _pollCreate() {
    const q = document.getElementById('pf-question')?.value?.trim();
    const cat = document.getElementById('pf-category')?.value || 'כללי';
    const endDate = document.getElementById('pf-enddate')?.value || '';
    const anonymous = document.getElementById('pf-anonymous')?.checked || false;
    const opts = [...document.querySelectorAll('.pf-opt-input')]
      .map(inp => inp.value.trim()).filter(Boolean);

    // Validation
    if (!q) {
      Utils.toast('יש להזין שאלה', 'warning');
      document.getElementById('pf-question')?.focus();
      return;
    }
    if (opts.length < 2) {
      Utils.toast('נדרשות לפחות 2 אפשרויות מלאות', 'warning');
      return;
    }
    if (!endDate) {
      Utils.toast('יש לבחור תאריך סיום', 'warning');
      return;
    }
    if (new Date(endDate) <= new Date()) {
      Utils.toast('תאריך הסיום חייב להיות בעתיד', 'warning');
      return;
    }

    // Check duplicates
    const unique = new Set(opts.map(o => o.toLowerCase()));
    if (unique.size !== opts.length) {
      Utils.toast('אפשרויות כפולות — יש לתקן', 'warning');
      return;
    }

    const polls = this._pollEnsureData();
    const newId = 'p' + String(polls.length + 1).padStart(2, '0') + '_' + Date.now();
    polls.unshift({
      id: newId,
      question: q,
      options: opts,
      votes: opts.map(() => 0),
      anonymous,
      closed: false,
      endDate,
      created: new Date().toISOString().slice(0, 10),
      author: 'מזכירות',
      category: cat,
      voters: {}
    });

    // Save to API
    try {
      await App.apiCall('add', 'הצבעות', { row: {
        'שאלה': q, 'קטגוריה': cat, 'תאריך_סיום': endDate,
        'אנונימי': anonymous ? 'כן' : 'לא', 'יוצר': 'מזכירות',
        'תאריך_יצירה': new Date().toISOString().slice(0, 10),
        'options': JSON.stringify(opts), 'votes': JSON.stringify(opts.map(() => 0))
      }});
    } catch(e) { /* localStorage fallback */ }

    bootstrap.Modal.getInstance(document.getElementById('poll-create-modal'))?.hide();
    Utils.toast('הסקר נוצר בהצלחה!', 'success');
    this._pollState.tab = 'active';
    App.navigate('voting');
  },

  /* ---------- Close poll ---------- */
  _pollClose(pid) {
    const polls = this._pollEnsureData();
    const p = polls.find(x => x.id === pid);
    if (p) {
      p.closed = true;
      Utils.toast('הסקר נסגר', 'info');
      App.navigate('voting');
    }
  },

  /* ---------- Reopen poll ---------- */
  _pollReopen(pid) {
    const polls = this._pollEnsureData();
    const p = polls.find(x => x.id === pid);
    if (p) {
      p.closed = false;
      Utils.toast('הסקר נפתח מחדש', 'success');
      App.navigate('voting');
    }
  },

  /* ---------- Delete poll ---------- */
  async _pollDelete(pid) {
    const polls = this._pollEnsureData();
    const idx = polls.findIndex(x => x.id === pid);
    if (idx === -1) return;
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05EA \u05E1\u05E7\u05E8', '\u05DC\u05DE\u05D7\u05D5\u05E7 \u05D0\u05EA \u05D4\u05E1\u05E7\u05E8? \u05E4\u05E2\u05D5\u05DC\u05D4 \u05D6\u05D5 \u05D1\u05DC\u05EA\u05D9 \u05D4\u05E4\u05D9\u05DB\u05D4.')) return;
    polls.splice(idx, 1);
    // Clean voted state
    delete this._pollState.voted[pid];

    // Delete from API
    try { await App.apiCall('delete', 'הצבעות', { id: pid }); } catch(e) { /* ok */ }

    Utils.toast('הסקר נמחק', 'info');
    App.navigate('voting');
  }
});
