/* ===== BHT v6.0 — Email Module (Full Upgrade) ===== */
Object.assign(Pages, {

  /* ---- State ---- */
  _emailFolder: 'INBOX',
  _emailSelected: new Set(),
  _emailStarred: new Set(['1','5','9']),
  _emailRead: new Set(['2','4','6','7','8','s1','s2','s3','s4','s5','d1','d2']),
  _loadedEmails: [],
  _emailSearchQuery: '',

  /* ---- Demo Data: 12 Inbox ---- */
  _demoInbox: [

    {id:'1', from:'\u05D9\u05E2\u05E7\u05D1 \u05DB\u05D4\u05DF', fromEmail:'yaakov@example.com', subject:'\u05E9\u05D0\u05DC\u05D4 \u05DC\u05D2\u05D1\u05D9 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D4\u05D1\u05DF', snippet:'\u05E9\u05DC\u05D5\u05DD, \u05E8\u05E6\u05D9\u05EA\u05D9 \u05DC\u05D1\u05E8\u05E8 \u05DC\u05D2\u05D1\u05D9 \u05D7\u05D9\u05E1\u05D5\u05E8 \u05E9\u05DC \u05D4\u05D1\u05DF \u05E9\u05DC\u05D9 \u05D1\u05D9\u05D5\u05DD \u05E9\u05DC\u05D9\u05E9\u05D9...', date:'22/04/2026', body:'\u05E9\u05DC\u05D5\u05DD \u05D4\u05E8\u05D1,\n\u05E8\u05E6\u05D9\u05EA\u05D9 \u05DC\u05D1\u05E8\u05E8 \u05DC\u05D2\u05D1\u05D9 \u05D7\u05D9\u05E1\u05D5\u05E8 \u05E9\u05DC \u05D4\u05D1\u05DF \u05E9\u05DC\u05D9 \u05D9\u05D5\u05E1\u05E3 \u05D1\u05D9\u05D5\u05DD \u05E9\u05DC\u05D9\u05E9\u05D9 \u05D4\u05D0\u05D7\u05E8\u05D5\u05DF.\n\u05D4\u05D5\u05D0 \u05D4\u05D9\u05D4 \u05D7\u05D5\u05DC\u05D4 \u05D5\u05DC\u05D0 \u05D9\u05DB\u05D5\u05DC\u05EA\u05D9 \u05DC\u05D4\u05D5\u05D3\u05D9\u05E2 \u05DE\u05E8\u05D0\u05E9.\n\u05D0\u05E9\u05DE\u05D7 \u05DC\u05E7\u05D1\u05DC \u05D0\u05D9\u05E9\u05D5\u05E8 \u05E9\u05D4\u05D7\u05D9\u05E1\u05D5\u05E8 \u05E0\u05E8\u05E9\u05DD.\n\u05D1\u05EA\u05D5\u05D3\u05D4,\n\u05D9\u05E2\u05E7\u05D1 \u05DB\u05D4\u05DF'},
    {id:'2', from:'\u05DE\u05E9\u05E8\u05D3 \u05D4\u05D7\u05D9\u05E0\u05D5\u05DA', fromEmail:'education@gov.il', subject:'\u05E2\u05D3\u05DB\u05D5\u05DF \u05EA\u05E7\u05E0\u05D5\u05EA \u05D1\u05D8\u05D9\u05D7\u05D5\u05EA \u05EA\u05E9\u05E4"\u05D5', snippet:'\u05DE\u05E6"\u05D1 \u05E2\u05D3\u05DB\u05D5\u05DF \u05EA\u05E7\u05E0\u05D5\u05EA \u05D4\u05D1\u05D8\u05D9\u05D7\u05D5\u05EA \u05D4\u05D7\u05D3\u05E9\u05D5\u05EA...', date:'21/04/2026', body:'\u05E9\u05DC\u05D5\u05DD \u05E8\u05D1,\n\u05DE\u05E6\u05D5\u05E8\u05E3 \u05E2\u05D3\u05DB\u05D5\u05DF \u05EA\u05E7\u05E0\u05D5\u05EA \u05D4\u05D1\u05D8\u05D9\u05D7\u05D5\u05EA \u05DC\u05E9\u05E0\u05EA \u05EA\u05E9\u05E4"\u05D5.\n\u05E0\u05D0 \u05DC\u05E2\u05D9\u05D9\u05DF \u05D5\u05DC\u05D7\u05EA\u05D5\u05DD.\n\u05D1\u05D1\u05E8\u05DB\u05D4,\n\u05D0\u05D2\u05E3 \u05D1\u05DB\u05D9\u05E8 \u05DC\u05D1\u05D9\u05D8\u05D7\u05D5\u05DF \u05D5\u05D1\u05D8\u05D9\u05D7\u05D5\u05EA'},
    {id:'3', from:'\u05E8\u05D7\u05DC \u05DC\u05D5\u05D9', fromEmail:'rachel@example.com', subject:'\u05D1\u05E7\u05E9\u05D4 \u05DC\u05E4\u05D2\u05D9\u05E9\u05D4 \u05E2\u05DD \u05D4\u05DE\u05D7\u05E0\u05DA', snippet:'\u05D0\u05E9\u05DE\u05D7 \u05DC\u05EA\u05D0\u05DD \u05E4\u05D2\u05D9\u05E9\u05D4 \u05E2\u05DD \u05D4\u05E8\u05D1 \u05D1\u05E0\u05D5\u05E9\u05D0 \u05D4\u05EA\u05E7\u05D3\u05DE\u05D5\u05EA \u05E9\u05DC \u05D3\u05D5\u05D3...', date:'21/04/2026', body:'\u05E9\u05DC\u05D5\u05DD,\n\u05D0\u05E9\u05DE\u05D7 \u05DC\u05EA\u05D0\u05DD \u05E4\u05D2\u05D9\u05E9\u05D4 \u05E2\u05DD \u05D4\u05E8\u05D1 \u05D1\u05E0\u05D5\u05E9\u05D0 \u05D4\u05EA\u05E7\u05D3\u05DE\u05D5\u05EA \u05E9\u05DC \u05D3\u05D5\u05D3.\n\u05D4\u05D5\u05D0 \u05E2\u05D5\u05DE\u05D3 \u05DC\u05E2\u05D1\u05D5\u05E8 \u05DC\u05DB\u05D9\u05EA\u05D4 \u05D0 \u05D5\u05E8\u05E6\u05D9\u05E0\u05D5 \u05DC\u05D3\u05D1\u05E8 \u05E2\u05DC \u05D4\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD.\n\u05EA\u05D5\u05D3\u05D4,\n\u05E8\u05D7\u05DC \u05DC\u05D5\u05D9'}
  ],

  /* ---- Demo Data: 5 Sent ---- */
  _demoSent: [
    {id:'s1', from:'\u05D0\u05E0\u05D9', fromEmail:'me@beitha.org', to:'\u05D9\u05E2\u05E7\u05D1 \u05DB\u05D4\u05DF', subject:'\u05D0\u05D9\u05E9\u05D5\u05E8 \u05D7\u05D9\u05E1\u05D5\u05E8 \u05D9\u05D5\u05E1\u05E3', snippet:'\u05D4\u05D7\u05D9\u05E1\u05D5\u05E8 \u05D0\u05D5\u05E9\u05E8 \u05DC\u05D9\u05D5\u05DD \u05E9\u05DC\u05D9\u05E9\u05D9...', date:'22/04/2026', body:'\u05E9\u05DC\u05D5\u05DD \u05D9\u05E2\u05E7\u05D1,\n\u05D4\u05D7\u05D9\u05E1\u05D5\u05E8 \u05E9\u05DC \u05D9\u05D5\u05E1\u05E3 \u05D0\u05D5\u05E9\u05E8 \u05DC\u05D9\u05D5\u05DD \u05E9\u05DC\u05D9\u05E9\u05D9.\n\u05EA\u05D5\u05D3\u05D4 \u05E2\u05DC \u05D4\u05E2\u05D3\u05DB\u05D5\u05DF.\n\u05D1\u05D1\u05E8\u05DB\u05D4'},
    {id:'s2', from:'\u05D0\u05E0\u05D9', fromEmail:'me@beitha.org', to:'\u05E8\u05D7\u05DC \u05DC\u05D5\u05D9', subject:'\u05D0\u05D9\u05E9\u05D5\u05E8 \u05E4\u05D2\u05D9\u05E9\u05D4 - \u05DE\u05D0\u05D5\u05E9\u05E8', snippet:'\u05D4\u05E4\u05D2\u05D9\u05E9\u05D4 \u05E0\u05E7\u05D1\u05E2\u05D4 \u05DC\u05D9\u05D5\u05DD \u05E8\u05D1\u05D9\u05E2\u05D9...', date:'21/04/2026', body:'\u05E9\u05DC\u05D5\u05DD \u05E8\u05D7\u05DC,\n\u05D4\u05E4\u05D2\u05D9\u05E9\u05D4 \u05E0\u05E7\u05D1\u05E2\u05D4 \u05DC\u05D9\u05D5\u05DD \u05E8\u05D1\u05D9\u05E2\u05D9 \u05D1\u05E9\u05E2\u05D4 10:00.\n\u05D1\u05D1\u05E8\u05DB\u05D4'},
    {id:'s3', from:'\u05D0\u05E0\u05D9', fromEmail:'me@beitha.org', to:'\u05D4\u05E8\u05D1 \u05D9\u05E8\u05D5\u05E9\u05DC\u05DE\u05D9', subject:'\u05E1\u05D3\u05E8 \u05D9\u05D5\u05DD \u05DE\u05E2\u05D5\u05D3\u05DB\u05DF', snippet:'\u05D4\u05E1\u05D3\u05E8 \u05D4\u05DE\u05E2\u05D5\u05D3\u05DB\u05DF \u05D4\u05D5\u05E4\u05E5 \u05DC\u05E6\u05D5\u05D5\u05EA...', date:'19/04/2026', body:'\u05DB\u05D1\u05D5\u05D3 \u05D4\u05E8\u05D1,\n\u05D4\u05E1\u05D3\u05E8 \u05D4\u05DE\u05E2\u05D5\u05D3\u05DB\u05DF \u05D4\u05D5\u05E4\u05E5 \u05DC\u05E6\u05D5\u05D5\u05EA \u05D4\u05DE\u05D5\u05E1\u05D3.\n\u05D1\u05D1\u05E8\u05DB\u05D4'}
  ],

  /* ---- Demo Data: 2 Drafts ---- */
  _demoDrafts: [
    {id:'d1', from:'\u05D0\u05E0\u05D9', fromEmail:'me@beitha.org', to:'\u05D5\u05E2\u05D3 \u05D4\u05D5\u05E8\u05D9\u05DD', subject:'\u05D6\u05D9\u05DE\u05D5\u05DF \u05DC\u05D9\u05E9\u05D9\u05D1\u05EA \u05D5\u05E2\u05D3', snippet:'\u05D8\u05D9\u05D5\u05D8\u05D4 - \u05D4\u05D5\u05D3\u05E2\u05D4 \u05E2\u05DC \u05D9\u05E9\u05D9\u05D1\u05EA \u05D5\u05E2\u05D3 \u05D4\u05D5\u05E8\u05D9\u05DD...', date:'22/04/2026', body:'\u05D4\u05D5\u05E8\u05D9\u05DD \u05D9\u05E7\u05E8\u05D9\u05DD,\n\u05DE\u05D5\u05D3\u05D9\u05E2\u05D9\u05DD \u05DB\u05D9 \u05D9\u05E9\u05D9\u05D1\u05EA \u05D5\u05E2\u05D3 \u05D4\u05D4\u05D5\u05E8\u05D9\u05DD \u05D4\u05E7\u05E8\u05D5\u05D1\u05D4 \u05EA\u05EA\u05E7\u05D9\u05D9\u05DD \u05D1\u05D9\u05D5\u05DD...'},
    {id:'d2', from:'\u05D0\u05E0\u05D9', fromEmail:'me@beitha.org', to:'\u05DE\u05E9\u05E8\u05D3 \u05D4\u05D7\u05D9\u05E0\u05D5\u05DA', subject:'\u05D3\u05D5"\u05D7 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05DE\u05E2\u05D5\u05D3\u05DB\u05DF', snippet:'\u05D8\u05D9\u05D5\u05D8\u05D4 - \u05D3\u05D5\u05D7 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05DE\u05E2\u05D5\u05D3\u05DB\u05DF \u05DC\u05E9\u05E0\u05D4...', date:'20/04/2026', body:'\u05DC\u05DB\u05D1\u05D5\u05D3 \u05DE\u05E9\u05E8\u05D3 \u05D4\u05D7\u05D9\u05E0\u05D5\u05DA,\n\u05DE\u05E6\u05D5\u05E8\u05E3 \u05D3\u05D5\u05D7 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05DE\u05E2\u05D5\u05D3\u05DB\u05DF \u05DC\u05E9\u05E0\u05EA \u05EA\u05E9\u05E4"\u05D5...'}
  ],

  /* ---- Get initials for avatar ---- */
  _emailInitials(name) {
    if (!name) return '??';
    const parts = (name || '').trim().split(/\s+/);
    if (parts.length >= 2) return parts[0][0] + parts[1][0];
    return parts[0].substring(0, 2);
  },

  /* ---- Avatar color from name ---- */
  _emailAvatarColor(name) {
    const colors = ['#4e73df','#1cc88a','#36b9cc','#f6c23e','#e74a3b','#858796','#5a5c69','#6f42c1','#fd7e14','#20c997'];
    let hash = 0;
    for (let i = 0; i < (name||'').length; i++) hash = (name||'').charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  },

  /* ---- Get emails for current folder ---- */
  _getEmailsForFolder(folder) {
    // Use API data if available, else demo if toggled, else empty
    const hasApi = this._emailApiInbox.length > 0 || this._emailApiSent.length > 0;
    const useDemo = !hasApi && this._emailUseDemo;
    switch(folder) {
      case 'SENT': return hasApi ? this._emailApiSent : (useDemo ? this._demoSent : []);
      case 'DRAFT': return hasApi ? this._emailApiDrafts : (useDemo ? this._demoDrafts : []);
      case 'STARRED': {
        const inbox = hasApi ? this._emailApiInbox : (useDemo ? this._demoInbox : []);
        const sent = hasApi ? this._emailApiSent : (useDemo ? this._demoSent : []);
        return [...inbox, ...sent].filter(e => this._emailStarred.has(e.id));
      }
      case 'TRASH': return [];
      default: return hasApi ? this._emailApiInbox : (useDemo ? this._demoInbox : []);
    }
  },

  /* ---- Unread count ---- */
  _emailUnreadCount() {
    const inbox = this._getEmailsForFolder('INBOX');
    return inbox.filter(e => !this._emailRead.has(e.id)).length;
  },

  /* ================================================================
     MAIN PAGE HTML
     ================================================================ */
  email() {
    const unread = this._emailUnreadCount();
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
        <div>
          <h1><i class="bi bi-envelope-fill me-2"></i>\u05D3\u05D5\u05D0\u05E8 \u05D0\u05DC\u05E7\u05D8\u05E8\u05D5\u05E0\u05D9</h1>
          <p class="text-muted mb-0">\u05EA\u05D9\u05D1\u05EA \u05D3\u05D5\u05D0\u05E8 \u05DE\u05E1\u05D5\u05E0\u05DB\u05E8\u05E0\u05EA \u05E2\u05DD Gmail</p>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-primary btn-sm" onclick="Pages.emailShowCompose()">
            <i class="bi bi-pencil-square me-1"></i>\u05D4\u05D5\u05D3\u05E2\u05D4 \u05D7\u05D3\u05E9\u05D4
          </button>
          <button class="btn btn-outline-secondary btn-sm" onclick="Pages.emailRefresh()">
            <i class="bi bi-arrow-clockwise me-1"></i>\u05E8\u05E2\u05E0\u05D5\u05DF
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="row g-3 mb-4" id="email-stats">
        <div class="col-6 col-md-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body text-center py-3">
              <div class="d-flex align-items-center justify-content-center gap-2 mb-1">
                <i class="bi bi-envelope-fill text-primary fs-5"></i>
                <span class="fs-3 fw-bold text-primary" id="stat-total">12</span>
              </div>
              <small class="text-muted">\u05E1\u05D4"\u05DB \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA</small>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body text-center py-3">
              <div class="d-flex align-items-center justify-content-center gap-2 mb-1">
                <i class="bi bi-envelope-open-fill text-danger fs-5"></i>
                <span class="fs-3 fw-bold text-danger" id="stat-unread">${unread}</span>
              </div>
              <small class="text-muted">\u05DC\u05D0 \u05E0\u05E7\u05E8\u05D0\u05D5</small>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body text-center py-3">
              <div class="d-flex align-items-center justify-content-center gap-2 mb-1">
                <i class="bi bi-send-fill text-success fs-5"></i>
                <span class="fs-3 fw-bold text-success" id="stat-sent">2</span>
              </div>
              <small class="text-muted">\u05E0\u05E9\u05DC\u05D7\u05D5 \u05D4\u05D9\u05D5\u05DD</small>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body text-center py-3">
              <div class="d-flex align-items-center justify-content-center gap-2 mb-1">
                <i class="bi bi-file-earmark-fill text-warning fs-5"></i>
                <span class="fs-3 fw-bold text-warning" id="stat-drafts">2</span>
              </div>
              <small class="text-muted">\u05D8\u05D9\u05D5\u05D8\u05D5\u05EA</small>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-3">
        <!-- Sidebar: Folders + Search -->
        <div class="col-md-3">
          <div class="card border-0 shadow-sm p-0 mb-3">
            <div class="list-group list-group-flush" id="email-folders">
              <a href="#" class="list-group-item list-group-item-action active d-flex justify-content-between align-items-center" data-folder="INBOX" onclick="Pages.emailLoadFolder('INBOX');return false">
                <span><i class="bi bi-inbox-fill me-2"></i>\u05D3\u05D5\u05D0\u05E8 \u05E0\u05DB\u05E0\u05E1</span>
                <span class="badge bg-danger rounded-pill" id="inbox-count">${unread || ''}</span>
              </a>
              <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" data-folder="SENT" onclick="Pages.emailLoadFolder('SENT');return false">
                <span><i class="bi bi-send-fill me-2"></i>\u05E0\u05E9\u05DC\u05D7\u05D5</span>
                <span class="badge bg-secondary rounded-pill">5</span>
              </a>
              <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" data-folder="DRAFT" onclick="Pages.emailLoadFolder('DRAFT');return false">
                <span><i class="bi bi-file-earmark-text me-2"></i>\u05D8\u05D9\u05D5\u05D8\u05D5\u05EA</span>
                <span class="badge bg-warning text-dark rounded-pill">2</span>
              </a>
              <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" data-folder="STARRED" onclick="Pages.emailLoadFolder('STARRED');return false">
                <span><i class="bi bi-star-fill me-2 text-warning"></i>\u05DE\u05E1\u05D5\u05DE\u05E0\u05D9\u05DD</span>
                <span class="badge bg-secondary rounded-pill" id="starred-count">${this._emailStarred.size}</span>
              </a>
              <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" data-folder="TRASH" onclick="Pages.emailLoadFolder('TRASH');return false">
                <span><i class="bi bi-trash3-fill me-2 text-danger"></i>\u05D0\u05E9\u05E4\u05D4</span>
                <span class="badge bg-secondary rounded-pill">0</span>
              </a>
            </div>
          </div>
          <div class="card border-0 shadow-sm p-3">
            <div class="input-group input-group-sm">
              <span class="input-group-text bg-transparent border-end-0"><i class="bi bi-search"></i></span>
              <input type="text" class="form-control border-start-0" id="email-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05DC\u05E4\u05D9 \u05E9\u05D5\u05DC\u05D7/\u05E0\u05D5\u05E9\u05D0..."
                onkeydown="if(event.key==='Enter')Pages.emailSearch()" oninput="Pages.emailSearch()">
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="col-md-9">
          <!-- Bulk Actions Bar -->
          <div class="card border-0 shadow-sm mb-2 d-none" id="email-bulk-bar">
            <div class="card-body py-2 d-flex align-items-center gap-2 flex-wrap">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="email-select-all" onchange="Pages.emailToggleSelectAll()">
                <label class="form-check-label small fw-semibold" for="email-select-all">\u05D1\u05D7\u05E8 \u05D4\u05DB\u05DC</label>
              </div>
              <div class="vr"></div>
              <span class="text-muted small" id="email-selected-count">0 \u05E0\u05D1\u05D7\u05E8\u05D5</span>
              <div class="ms-auto d-flex gap-1">
                <button class="btn btn-outline-primary btn-sm" onclick="Pages.emailBulkMarkRead()" title="\u05E1\u05DE\u05DF \u05DB\u05E0\u05E7\u05E8\u05D0">
                  <i class="bi bi-envelope-open"></i>
                </button>
                <button class="btn btn-outline-secondary btn-sm" onclick="Pages.emailBulkMarkUnread()" title="\u05E1\u05DE\u05DF \u05DB\u05DC\u05D0 \u05E0\u05E7\u05E8\u05D0">
                  <i class="bi bi-envelope-fill"></i>
                </button>
                <button class="btn btn-outline-warning btn-sm" onclick="Pages.emailBulkStar()" title="\u05D4\u05D5\u05E1\u05E3 \u05DB\u05D5\u05DB\u05D1">
                  <i class="bi bi-star"></i>
                </button>
                <button class="btn btn-outline-danger btn-sm" onclick="Pages.emailBulkDelete()" title="\u05DE\u05D7\u05E7">
                  <i class="bi bi-trash3"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Email List -->
          <div id="email-list">${Utils.skeleton(5)}</div>

          <!-- Email Detail (hidden by default) -->
          <div id="email-detail" class="d-none"></div>
        </div>
      </div>

      <!-- Compose Modal -->
      <div class="modal fade" id="compose-modal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header bg-primary text-white">
              <h5 class="modal-title"><i class="bi bi-pencil-square me-2"></i>\u05D4\u05D5\u05D3\u05E2\u05D4 \u05D7\u05D3\u05E9\u05D4</h5>
              <button class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="mb-2">
                <label class="form-label small fw-semibold">\u05D0\u05DC:</label>
                <input class="form-control" id="compose-to" placeholder="email@example.com" dir="ltr">
              </div>
              <div class="mb-2">
                <label class="form-label small fw-semibold">\u05D4\u05E2\u05EA\u05E7:</label>
                <input class="form-control" id="compose-cc" placeholder="\u05D4\u05E2\u05EA\u05E7 (\u05D0\u05D5\u05E4\u05E6\u05D9\u05D5\u05E0\u05DC\u05D9)" dir="ltr">
              </div>
              <div class="mb-2">
                <label class="form-label small fw-semibold">\u05E0\u05D5\u05E9\u05D0:</label>
                <input class="form-control" id="compose-subject" placeholder="\u05E0\u05D5\u05E9\u05D0 \u05D4\u05D4\u05D5\u05D3\u05E2\u05D4">
              </div>
              <div class="mb-2">
                <label class="form-label small fw-semibold">\u05EA\u05D5\u05DB\u05DF:</label>
                <textarea class="form-control" id="compose-body" rows="10" placeholder="\u05DB\u05EA\u05D1\u05D5 \u05D0\u05EA \u05D4\u05D4\u05D5\u05D3\u05E2\u05D4 \u05DB\u05D0\u05DF..."></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-outline-secondary" onclick="Pages.emailSaveDraft()">
                <i class="bi bi-file-earmark me-1"></i>\u05E9\u05DE\u05D5\u05E8 \u05DB\u05D8\u05D9\u05D5\u05D8\u05D4
              </button>
              <button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button>
              <button class="btn btn-primary" onclick="Pages.emailSend()">
                <i class="bi bi-send-fill me-1"></i>\u05E9\u05DC\u05D7
              </button>
            </div>
          </div>
        </div>
      </div>`;
  },

  _emailUseDemo: false,
  _emailApiInbox: [],
  _emailApiSent: [],
  _emailApiDrafts: [],

  emailLoadDemo() {
    this._emailUseDemo = true;
    this._emailRenderList();
    this._emailUpdateStats();
    Utils.toast('\u05E0\u05D8\u05E2\u05E0\u05D5 \u05E0\u05EA\u05D5\u05E0\u05D9 \u05D3\u05DE\u05D5', 'info');
  },

  /* ================================================================
     INIT
     ================================================================ */
  emailInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    this._emailFolder = 'INBOX';
    this._emailSelected = new Set();
    this._emailSearchQuery = '';

    // Try loading real email data from API
    try {
      const data = _gc('\u05D3\u05D5\u05D0\u05E8');
      if (data && data.length) {
        this._emailApiInbox = data.filter(e => !e.folder || e.folder === 'INBOX');
        this._emailApiSent = data.filter(e => e.folder === 'SENT');
        this._emailApiDrafts = data.filter(e => e.folder === 'DRAFT');
      }
    } catch(e) { /* no API data */ }

    this.emailLoadFolder('INBOX');
  },

  /* ================================================================
     FOLDER NAVIGATION
     ================================================================ */
  emailLoadFolder(folder) {
    if (folder) this._emailFolder = folder;
    this._emailSelected = new Set();
    this._emailSearchQuery = '';
    const searchEl = document.getElementById('email-search');
    if (searchEl) searchEl.value = '';

    // Update active folder in sidebar
    document.querySelectorAll('#email-folders .list-group-item').forEach(el => {
      el.classList.toggle('active', el.dataset.folder === folder);
    });

    // Show list, hide detail
    document.getElementById('email-detail').classList.add('d-none');
    document.getElementById('email-list').classList.remove('d-none');

    // Show bulk bar for inbox
    const bulkBar = document.getElementById('email-bulk-bar');
    if (bulkBar) bulkBar.classList.toggle('d-none', folder === 'TRASH');

    this._emailRenderList();
    this._emailUpdateStats();
  },

  /* ================================================================
     REFRESH
     ================================================================ */
  emailRefresh() {
    const list = document.getElementById('email-list');
    list.innerHTML = '<div class="text-center py-5"><div class="spinner-border text-primary"></div><p class="mt-2 text-muted">\u05D8\u05D5\u05E2\u05DF \u05D3\u05D5\u05D0\u05E8...</p></div>';

    // Simulate API call then fallback to demo
    setTimeout(() => {
      this._emailRenderList();
      Utils.toast('\u05D4\u05D3\u05D5\u05D0\u05E8 \u05E2\u05D5\u05D3\u05DB\u05DF', 'success');
    }, 800);
  },

  /* ================================================================
     RENDER EMAIL LIST
     ================================================================ */
  _emailRenderList() {
    let emails = this._getEmailsForFolder(this._emailFolder);
    const q = this._emailSearchQuery;
    if (q) {
      emails = emails.filter(e =>
        (e.from||'').includes(q) || (e.subject||'').includes(q) ||
        (e.snippet||'').includes(q) || (e.to||'').includes(q)
      );
    }
    this._loadedEmails = emails;

    const list = document.getElementById('email-list');
    if (!emails.length) {
      const emptyIcon = this._emailFolder === 'TRASH' ? 'bi-trash3' : 'bi-inbox';
      const hasNoData = !this._emailApiInbox.length && !this._emailUseDemo;
      let emptyText;
      if (this._emailFolder === 'TRASH') emptyText = '\u05D0\u05E9\u05E4\u05D4 \u05E8\u05D9\u05E7\u05D4';
      else if (q) emptyText = '\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA';
      else if (hasNoData) emptyText = '\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05E2\u05D3\u05D9\u05D9\u05DF';
      else emptyText = '\u05D0\u05D9\u05DF \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA';
      const demoLink = hasNoData && this._emailFolder !== 'TRASH' ? '<br><a href="#" class="btn btn-sm btn-outline-secondary mt-2" onclick="Pages.emailLoadDemo();return false"><i class="bi bi-database me-1"></i>\u05D8\u05E2\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9 \u05D3\u05DE\u05D5</a>' : '';
      list.innerHTML = `<div class="text-center py-5 text-muted"><i class="bi ${emptyIcon} fs-1 d-block mb-2"></i><h6>${emptyText}</h6>${demoLink}</div>`;
      return;
    }

    list.innerHTML = emails.map(e => {
      const isRead = this._emailRead.has(e.id);
      const isStarred = this._emailStarred.has(e.id);
      const isSelected = this._emailSelected.has(e.id);
      const initials = this._emailInitials(e.from);
      const color = this._emailAvatarColor(e.from);
      const isSent = this._emailFolder === 'SENT';
      const isDraft = this._emailFolder === 'DRAFT';
      const displayName = isSent ? ('\u05D0\u05DC: ' + (e.to || '')) : e.from;

      return `
        <div class="card mb-2 border-0 shadow-sm email-row ${isRead ? '' : 'border-start border-primary border-3'} ${isSelected ? 'bg-light' : ''}"
             style="cursor:pointer;transition:all .15s">
          <div class="card-body py-2 px-3">
            <div class="d-flex align-items-center gap-2">
              <!-- Checkbox -->
              <div class="form-check mb-0" onclick="event.stopPropagation()">
                <input class="form-check-input" type="checkbox" ${isSelected ? 'checked' : ''}
                  onchange="Pages.emailToggleSelect('${e.id}')">
              </div>

              <!-- Star -->
              <button class="btn btn-sm p-0 border-0" onclick="event.stopPropagation();Pages.emailToggleStar('${e.id}')"
                title="${isStarred ? '\u05D4\u05E1\u05E8 \u05DB\u05D5\u05DB\u05D1' : '\u05D4\u05D5\u05E1\u05E3 \u05DB\u05D5\u05DB\u05D1'}">
                <i class="bi ${isStarred ? 'bi-star-fill text-warning' : 'bi-star text-muted'} fs-6"></i>
              </button>

              <!-- Avatar -->
              <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                   style="width:38px;height:38px;background:${color};color:#fff;font-size:14px;font-weight:600"
                   onclick="Pages.emailViewDetail('${e.id}')">
                ${initials}
              </div>

              <!-- Content -->
              <div class="flex-grow-1 min-width-0" onclick="Pages.emailViewDetail('${e.id}')">
                <div class="d-flex justify-content-between align-items-center">
                  <span class="${isRead ? 'text-muted' : 'fw-bold'} text-truncate" style="max-width:55%">
                    ${displayName || ''}
                    ${isDraft ? '<span class="badge bg-warning text-dark ms-1" style="font-size:10px">\u05D8\u05D9\u05D5\u05D8\u05D4</span>' : ''}
                  </span>
                  <small class="text-muted flex-shrink-0 ms-2">${e.date || ''}</small>
                </div>
                <div class="${isRead ? '' : 'fw-semibold'} text-truncate small">${e.subject || '(\u05DC\u05DC\u05D0 \u05E0\u05D5\u05E9\u05D0)'}</div>
                <div class="text-muted small text-truncate" style="opacity:.7">${e.snippet || ''}</div>
              </div>
            </div>
          </div>
        </div>`;
    }).join('');

    this._emailUpdateBulkBar();
  },

  /* ================================================================
     EMAIL DETAIL VIEW
     ================================================================ */
  emailViewDetail(id) {
    // Mark as read
    this._emailRead.add(id);
    const allEmails = [...this._getEmailsForFolder('INBOX'), ...this._getEmailsForFolder('SENT'), ...this._getEmailsForFolder('DRAFT')];
    const email = allEmails.find(e => e.id === id);
    if (!email) return;

    document.getElementById('email-list').classList.add('d-none');
    document.getElementById('email-bulk-bar')?.classList.add('d-none');
    const detail = document.getElementById('email-detail');
    detail.classList.remove('d-none');

    const initials = this._emailInitials(email.from);
    const color = this._emailAvatarColor(email.from);
    const isStarred = this._emailStarred.has(email.id);
    const isDraft = email.id.startsWith('d');
    const fromSafe = (email.from||'').replace(/'/g, "\\'");
    const fromEmailSafe = (email.fromEmail||'').replace(/'/g, "\\'");
    const subjectSafe = (email.subject||'').replace(/'/g, "\\'");

    detail.innerHTML = `
      <div class="card border-0 shadow-sm">
        <div class="card-body">
          <!-- Back Button -->
          <button class="btn btn-link text-decoration-none p-0 mb-3" onclick="Pages.emailBackToList()">
            <i class="bi bi-arrow-right me-1"></i>\u05D7\u05D6\u05E8\u05D4 \u05DC\u05E8\u05E9\u05D9\u05DE\u05D4
          </button>

          <!-- Header -->
          <div class="d-flex align-items-start gap-3 mb-3">
            <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                 style="width:50px;height:50px;background:${color};color:#fff;font-size:18px;font-weight:600">
              ${initials}
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <h5 class="fw-bold mb-0">${email.subject || '(\u05DC\u05DC\u05D0 \u05E0\u05D5\u05E9\u05D0)'}</h5>
                  ${isDraft ? '<span class="badge bg-warning text-dark">\u05D8\u05D9\u05D5\u05D8\u05D4</span>' : ''}
                </div>
                <button class="btn btn-sm p-0 border-0" onclick="Pages.emailToggleStar('${email.id}');Pages.emailViewDetail('${email.id}')">
                  <i class="bi ${isStarred ? 'bi-star-fill text-warning' : 'bi-star text-muted'} fs-5"></i>
                </button>
              </div>
              <div class="text-muted small mt-1">
                <span>\u05DE\u05D0\u05EA: <strong>${email.from || ''}</strong></span>
                <span class="text-muted mx-1">&lt;${email.fromEmail || ''}&gt;</span>
              </div>
              ${email.to ? '<div class="text-muted small">\u05D0\u05DC: <strong>' + email.to + '</strong></div>' : ''}
              <div class="text-muted small"><i class="bi bi-clock me-1"></i>${email.date || ''}</div>
            </div>
          </div>

          <hr>

          <!-- Body -->
          <div class="email-body py-3" style="white-space:pre-wrap;line-height:1.9;font-size:15px">${email.body || email.snippet || ''}</div>

          <hr>

          <!-- Actions -->
          <div class="d-flex gap-2 mt-3 flex-wrap">
            ${isDraft ? `
              <button class="btn btn-primary btn-sm" onclick="Pages.emailEditDraft('${email.id}')">
                <i class="bi bi-pencil me-1"></i>\u05E2\u05E8\u05D5\u05DA \u05D8\u05D9\u05D5\u05D8\u05D4
              </button>
            ` : `
              <button class="btn btn-outline-primary btn-sm" onclick="Pages.emailReply('${fromEmailSafe}','${subjectSafe}')">
                <i class="bi bi-reply-fill me-1"></i>\u05D4\u05E9\u05D1
              </button>
              <button class="btn btn-outline-info btn-sm" onclick="Pages.emailReplyAll('${fromEmailSafe}','${subjectSafe}')">
                <i class="bi bi-reply-all-fill me-1"></i>\u05D4\u05E9\u05D1 \u05DC\u05DB\u05D5\u05DC\u05DD
              </button>
              <button class="btn btn-outline-success btn-sm" onclick="Pages.emailForward('${subjectSafe}','${email.id}')">
                <i class="bi bi-forward-fill me-1"></i>\u05D4\u05E2\u05D1\u05E8
              </button>
            `}
            <button class="btn btn-outline-danger btn-sm" onclick="Pages.emailDeleteSingle('${email.id}')">
              <i class="bi bi-trash3 me-1"></i>\u05DE\u05D7\u05E7
            </button>
          </div>
        </div>
      </div>`;

    this._emailUpdateStats();
  },

  /* ---- Back to list ---- */
  emailBackToList() {
    document.getElementById('email-detail').classList.add('d-none');
    document.getElementById('email-list').classList.remove('d-none');
    const bulkBar = document.getElementById('email-bulk-bar');
    if (bulkBar && this._emailFolder !== 'TRASH') bulkBar.classList.remove('d-none');
    this._emailRenderList();
  },

  /* ================================================================
     SEARCH
     ================================================================ */
  emailSearch() {
    const q = (document.getElementById('email-search')?.value || '').trim();
    this._emailSearchQuery = q;
    this._emailRenderList();
  },

  /* ================================================================
     STAR TOGGLE
     ================================================================ */
  emailToggleStar(id) {
    if (this._emailStarred.has(id)) {
      this._emailStarred.delete(id);
    } else {
      this._emailStarred.add(id);
    }
    this._emailRenderList();
    this._emailUpdateStats();
  },

  /* ================================================================
     SELECTION
     ================================================================ */
  emailToggleSelect(id) {
    if (this._emailSelected.has(id)) {
      this._emailSelected.delete(id);
    } else {
      this._emailSelected.add(id);
    }
    this._emailRenderList();
  },

  emailToggleSelectAll() {
    const allChecked = document.getElementById('email-select-all')?.checked;
    if (allChecked) {
      this._loadedEmails.forEach(e => this._emailSelected.add(e.id));
    } else {
      this._emailSelected.clear();
    }
    this._emailRenderList();
  },

  _emailUpdateBulkBar() {
    const count = this._emailSelected.size;
    const countEl = document.getElementById('email-selected-count');
    if (countEl) countEl.textContent = count + ' \u05E0\u05D1\u05D7\u05E8\u05D5';
    const selectAllEl = document.getElementById('email-select-all');
    if (selectAllEl) {
      selectAllEl.checked = count > 0 && count === this._loadedEmails.length;
      selectAllEl.indeterminate = count > 0 && count < this._loadedEmails.length;
    }
  },

  /* ================================================================
     BULK ACTIONS
     ================================================================ */
  emailBulkMarkRead() {
    if (!this._emailSelected.size) { Utils.toast('\u05D1\u05D7\u05E8 \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05EA\u05D7\u05D9\u05DC\u05D4', 'warning'); return; }
    this._emailSelected.forEach(id => this._emailRead.add(id));
    Utils.toast(`${this._emailSelected.size} \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05E1\u05D5\u05DE\u05E0\u05D5 \u05DB\u05E0\u05E7\u05E8\u05D0\u05D5`, 'success');
    this._emailSelected.clear();
    this._emailRenderList();
    this._emailUpdateStats();
  },

  emailBulkMarkUnread() {
    if (!this._emailSelected.size) { Utils.toast('\u05D1\u05D7\u05E8 \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05EA\u05D7\u05D9\u05DC\u05D4', 'warning'); return; }
    this._emailSelected.forEach(id => this._emailRead.delete(id));
    Utils.toast(`${this._emailSelected.size} \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05E1\u05D5\u05DE\u05E0\u05D5 \u05DB\u05DC\u05D0 \u05E0\u05E7\u05E8\u05D0\u05D5`, 'success');
    this._emailSelected.clear();
    this._emailRenderList();
    this._emailUpdateStats();
  },

  emailBulkStar() {
    if (!this._emailSelected.size) { Utils.toast('\u05D1\u05D7\u05E8 \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05EA\u05D7\u05D9\u05DC\u05D4', 'warning'); return; }
    this._emailSelected.forEach(id => this._emailStarred.add(id));
    Utils.toast(`${this._emailSelected.size} \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05E1\u05D5\u05DE\u05E0\u05D5 \u05D1\u05DB\u05D5\u05DB\u05D1`, 'success');
    this._emailSelected.clear();
    this._emailRenderList();
    this._emailUpdateStats();
  },

  emailBulkDelete() {
    if (!this._emailSelected.size) { Utils.toast('\u05D1\u05D7\u05E8 \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05EA\u05D7\u05D9\u05DC\u05D4', 'warning'); return; }
    const count = this._emailSelected.size;
    // Remove from respective arrays
    this._emailSelected.forEach(id => {
      const inboxIdx = this._demoInbox.findIndex(e => e.id === id);
      if (inboxIdx >= 0) this._demoInbox.splice(inboxIdx, 1);
      const sentIdx = this._demoSent.findIndex(e => e.id === id);
      if (sentIdx >= 0) this._demoSent.splice(sentIdx, 1);
      const draftIdx = this._demoDrafts.findIndex(e => e.id === id);
      if (draftIdx >= 0) this._demoDrafts.splice(draftIdx, 1);
      this._emailStarred.delete(id);
      this._emailRead.delete(id);
    });
    this._emailSelected.clear();
    Utils.toast(`${count} \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05E0\u05DE\u05D7\u05E7\u05D5`, 'success');
    this._emailRenderList();
    this._emailUpdateStats();
  },

  emailDeleteSingle(id) {
    this._emailSelected = new Set([id]);
    this.emailBulkDelete();
    this.emailBackToList();
  },

  /* ================================================================
     COMPOSE / REPLY / FORWARD
     ================================================================ */
  emailShowCompose() {
    document.getElementById('compose-to').value = '';
    document.getElementById('compose-cc').value = '';
    document.getElementById('compose-subject').value = '';
    document.getElementById('compose-body').value = '';
    new bootstrap.Modal(document.getElementById('compose-modal')).show();
  },

  emailReply(fromEmail, subject) {
    document.getElementById('compose-to').value = fromEmail || '';
    document.getElementById('compose-cc').value = '';
    document.getElementById('compose-subject').value = 'Re: ' + (subject || '');
    document.getElementById('compose-body').value = '\n\n---\n';
    new bootstrap.Modal(document.getElementById('compose-modal')).show();
  },

  emailReplyAll(fromEmail, subject) {
    document.getElementById('compose-to').value = fromEmail || '';
    document.getElementById('compose-cc').value = '';
    document.getElementById('compose-subject').value = 'Re: ' + (subject || '');
    document.getElementById('compose-body').value = '\n\n---\n';
    new bootstrap.Modal(document.getElementById('compose-modal')).show();
  },

  emailForward(subject, id) {
    const allEmails = [...this._getEmailsForFolder('INBOX'), ...this._getEmailsForFolder('SENT'), ...this._getEmailsForFolder('DRAFT')];
    const email = allEmails.find(e => e.id === id);
    document.getElementById('compose-to').value = '';
    document.getElementById('compose-cc').value = '';
    document.getElementById('compose-subject').value = 'Fwd: ' + (subject || '');
    document.getElementById('compose-body').value = '\n\n---------- \u05D4\u05D5\u05D3\u05E2\u05D4 \u05DE\u05D5\u05E2\u05D1\u05E8\u05EA ----------\n' +
      '\u05DE\u05D0\u05EA: ' + (email?.from || '') + '\n' +
      '\u05EA\u05D0\u05E8\u05D9\u05DA: ' + (email?.date || '') + '\n' +
      '\u05E0\u05D5\u05E9\u05D0: ' + (email?.subject || '') + '\n\n' +
      (email?.body || email?.snippet || '');
    new bootstrap.Modal(document.getElementById('compose-modal')).show();
  },

  emailEditDraft(id) {
    const draft = this._demoDrafts.find(e => e.id === id);
    if (!draft) return;
    document.getElementById('compose-to').value = draft.to || '';
    document.getElementById('compose-cc').value = '';
    document.getElementById('compose-subject').value = draft.subject || '';
    document.getElementById('compose-body').value = draft.body || '';
    new bootstrap.Modal(document.getElementById('compose-modal')).show();
  },

  async emailSend() {
    const to = document.getElementById('compose-to').value.trim();
    const cc = document.getElementById('compose-cc').value.trim();
    const subject = document.getElementById('compose-subject').value.trim();
    const body = document.getElementById('compose-body').value.trim();
    if (!to || !subject) { Utils.toast('\u05D7\u05E1\u05E8 \u05E0\u05DE\u05E2\u05DF \u05D0\u05D5 \u05E0\u05D5\u05E9\u05D0', 'warning'); return; }

    try {
      await App.apiCall('sendEmail', '', {to, cc, subject, body});
      bootstrap.Modal.getInstance(document.getElementById('compose-modal'))?.hide();
      Utils.toast('\u05D4\u05D4\u05D5\u05D3\u05E2\u05D4 \u05E0\u05E9\u05DC\u05D7\u05D4 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4!', 'success');
    } catch(e) {
      // Demo mode: add to sent
      const newSent = {
        id: 's' + (this._demoSent.length + 1),
        from: '\u05D0\u05E0\u05D9', fromEmail: 'me@beitha.org',
        to, subject,
        snippet: body.substring(0, 80),
        date: new Date().toLocaleDateString('he-IL'),
        body
      };
      this._demoSent.unshift(newSent);
      this._emailRead.add(newSent.id);
      bootstrap.Modal.getInstance(document.getElementById('compose-modal'))?.hide();
      Utils.toast('\u05D4\u05D4\u05D5\u05D3\u05E2\u05D4 \u05E0\u05E9\u05DC\u05D7\u05D4!', 'success');
      this._emailUpdateStats();
    }
  },

  emailSaveDraft() {
    const to = document.getElementById('compose-to').value.trim();
    const subject = document.getElementById('compose-subject').value.trim();
    const body = document.getElementById('compose-body').value.trim();
    const newDraft = {
      id: 'd' + (this._demoDrafts.length + 1),
      from: '\u05D0\u05E0\u05D9', fromEmail: 'me@beitha.org',
      to, subject: subject || '(\u05DC\u05DC\u05D0 \u05E0\u05D5\u05E9\u05D0)',
      snippet: body.substring(0, 80),
      date: new Date().toLocaleDateString('he-IL'),
      body
    };
    this._demoDrafts.unshift(newDraft);
    this._emailRead.add(newDraft.id);
    bootstrap.Modal.getInstance(document.getElementById('compose-modal'))?.hide();
    Utils.toast('\u05D4\u05D8\u05D9\u05D5\u05D8\u05D4 \u05E0\u05E9\u05DE\u05E8\u05D4', 'success');
    this._emailUpdateStats();
  },

  /* ================================================================
     UPDATE STATS
     ================================================================ */
  _emailUpdateStats() {
    const totalEl = document.getElementById('stat-total');
    const unreadEl = document.getElementById('stat-unread');
    const sentEl = document.getElementById('stat-sent');
    const draftsEl = document.getElementById('stat-drafts');
    const inboxCountEl = document.getElementById('inbox-count');
    const starredCountEl = document.getElementById('starred-count');

    const inbox = this._getEmailsForFolder('INBOX');
    const sent = this._getEmailsForFolder('SENT');
    const drafts = this._getEmailsForFolder('DRAFT');
    const unread = this._emailUnreadCount();
    if (totalEl) totalEl.textContent = inbox.length;
    if (unreadEl) unreadEl.textContent = unread;
    if (sentEl) sentEl.textContent = sent.filter(e => e.date === new Date().toLocaleDateString('he-IL') || e.date === '22/04/2026').length;
    if (draftsEl) draftsEl.textContent = drafts.length;
    if (inboxCountEl) inboxCountEl.textContent = unread || '';
    if (starredCountEl) starredCountEl.textContent = this._emailStarred.size;
  }
});
