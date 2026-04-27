/* ===== BHT v6.4 — Email Module (REAL Gmail via Apps Script Proxy) ===== */
Object.assign(Pages, {

  /* ---- State ---- */
  _emailFolder: 'INBOX',
  _emailSelected: new Set(),
  _emailStarred: new Set(),
  _emailReadSet: new Set(),
  _loadedEmails: [],
  _emailSearchQuery: '',
  _emailApiInbox: [],
  _emailApiSent: [],
  _emailLoading: false,
  _emailThreadCache: {},

  /* ---- Gmail Proxy Config ---- */
  _GMAIL_PROXY: 'https://script.google.com/macros/s/AKfycbwIFeKofkqY-VRbth-Sja4IDD6vMi-P5L3C9QsI-k3E/exec',
  _GMAIL_TOKEN: 'BHT_AGENT_2026',

  /* ---- Helper: call Gmail proxy (via OAuth or static cache) ---- */
  async _gmailProxy(action, params = {}) {
    // First try static EMAIL_CACHE
    if (typeof EMAIL_CACHE !== 'undefined' && EMAIL_CACHE) {
      if (action === 'gmailList') {
        const q = params.q || '';
        if (q.includes('in:inbox')) return EMAIL_CACHE.inbox || [];
        if (q.includes('in:sent')) return EMAIL_CACHE.sent || [];
        // Search: filter inbox+sent
        const all = [...(EMAIL_CACHE.inbox || []), ...(EMAIL_CACHE.sent || [])];
        const qLow = q.toLowerCase();
        return all.filter(e => (e.subject||'').toLowerCase().includes(qLow) || (e.from||'').toLowerCase().includes(qLow) || (e.snippet||'').toLowerCase().includes(qLow));
      }
      if (action === 'gmailRead' && params.id && EMAIL_CACHE.threads && EMAIL_CACHE.threads[params.id]) {
        return EMAIL_CACHE.threads[params.id];
      }
    }
    // Fallback: try direct API call (works if user is logged in to Google)
    try {
      const url = new URL(this._GMAIL_PROXY);
      url.searchParams.set('agentToken', this._GMAIL_TOKEN);
      url.searchParams.set('agentAction', action);
      Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
      const resp = await fetch(url.toString(), { redirect: 'follow' });
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      const text = await resp.text();
      if (text.includes('<!doctype html>') || text.includes('accounts.google.com')) throw new Error('Auth required');
      return JSON.parse(text);
    } catch(e) {
      console.warn('Gmail proxy unavailable:', e.message);
      return [];
    }
  },

  /* ---- Get initials for avatar ---- */
  _emailInitials(name) {
    if (!name) return '??';
    // Strip email format: "Name" <email> -> Name
    const clean = (name || '').replace(/<[^>]+>/g, '').replace(/"/g, '').trim();
    const parts = clean.split(/\s+/);
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

  /* ---- Format date nicely ---- */
  _emailFormatDate(isoStr) {
    if (!isoStr) return '';
    try {
      const d = new Date(isoStr);
      const now = new Date();
      const isToday = d.toDateString() === now.toDateString();
      const isThisYear = d.getFullYear() === now.getFullYear();
      if (isToday) return d.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
      if (isThisYear) return d.toLocaleDateString('he-IL', { day: 'numeric', month: 'short' });
      return d.toLocaleDateString('he-IL', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch(e) { return isoStr; }
  },

  /* ---- Extract sender name ---- */
  _emailSenderName(from) {
    if (!from) return '';
    const match = from.match(/"?([^"<]+)"?\s*</);
    return match ? match[1].trim() : from.split('@')[0];
  },

  /* ---- Get emails for current folder ---- */
  _getEmailsForFolder(folder) {
    switch(folder) {
      case 'SENT': return this._emailApiSent;
      case 'STARRED': return [...this._emailApiInbox, ...this._emailApiSent].filter(e => this._emailStarred.has(e.id));
      default: return this._emailApiInbox;
    }
  },

  /* ---- Unread count ---- */
  _emailUnreadCount() {
    return this._emailApiInbox.filter(e => e.unread && !this._emailReadSet.has(e.id)).length;
  },

  /* ================================================================
     MAIN PAGE HTML
     ================================================================ */
  email() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
        <div>
          <h1><i class="bi bi-envelope-fill me-2"></i>\u05D3\u05D5\u05D0\u05E8 \u05D0\u05DC\u05E7\u05D8\u05E8\u05D5\u05E0\u05D9</h1>
          <p class="text-muted mb-0">\u05EA\u05D9\u05D1\u05EA \u05D3\u05D5\u05D0\u05E8 6787012@gmail.com</p>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-primary btn-sm" onclick="Pages.emailShowCompose()">
            <i class="bi bi-pencil-square me-1"></i>\u05D4\u05D5\u05D3\u05E2\u05D4 \u05D7\u05D3\u05E9\u05D4
          </button>
          <button class="btn btn-outline-secondary btn-sm" onclick="Pages.emailRefresh()" id="email-refresh-btn">
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
                <span class="fs-3 fw-bold text-primary" id="stat-total">--</span>
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
                <span class="fs-3 fw-bold text-danger" id="stat-unread">--</span>
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
                <span class="fs-3 fw-bold text-success" id="stat-sent">--</span>
              </div>
              <small class="text-muted">\u05E0\u05E9\u05DC\u05D7\u05D5</small>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body text-center py-3">
              <div class="d-flex align-items-center justify-content-center gap-2 mb-1">
                <i class="bi bi-star-fill text-warning fs-5"></i>
                <span class="fs-3 fw-bold text-warning" id="stat-starred">--</span>
              </div>
              <small class="text-muted">\u05DE\u05E1\u05D5\u05DE\u05E0\u05D9\u05DD</small>
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
                <span class="badge bg-danger rounded-pill" id="inbox-count"></span>
              </a>
              <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" data-folder="SENT" onclick="Pages.emailLoadFolder('SENT');return false">
                <span><i class="bi bi-send-fill me-2"></i>\u05E0\u05E9\u05DC\u05D7\u05D5</span>
                <span class="badge bg-secondary rounded-pill" id="sent-count"></span>
              </a>
              <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" data-folder="STARRED" onclick="Pages.emailLoadFolder('STARRED');return false">
                <span><i class="bi bi-star-fill me-2 text-warning"></i>\u05DE\u05E1\u05D5\u05DE\u05E0\u05D9\u05DD</span>
                <span class="badge bg-secondary rounded-pill" id="starred-count"></span>
              </a>
            </div>
          </div>
          <div class="card border-0 shadow-sm p-3">
            <div class="input-group input-group-sm">
              <span class="input-group-text bg-transparent border-end-0"><i class="bi bi-search"></i></span>
              <input type="text" class="form-control border-start-0" id="email-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05DC\u05E4\u05D9 \u05E9\u05D5\u05DC\u05D7/\u05E0\u05D5\u05E9\u05D0..."
                onkeydown="if(event.key==='Enter')Pages.emailSearchGmail()" oninput="Pages.emailFilterLocal()">
            </div>
            <small class="text-muted mt-1 d-block">\u05D4\u05E7\u05E9 Enter \u05DC\u05D7\u05D9\u05E4\u05D5\u05E9 \u05D1\u05E9\u05E8\u05EA</small>
          </div>
        </div>

        <!-- Main Content -->
        <div class="col-md-9">
          <!-- Bulk Actions Bar -->
          <div class="card border-0 shadow-sm mb-2" id="email-bulk-bar">
            <div class="card-body py-2 d-flex align-items-center gap-2 flex-wrap">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="email-select-all" onchange="Pages.emailToggleSelectAll()">
                <label class="form-check-label small fw-semibold" for="email-select-all">\u05D1\u05D7\u05E8 \u05D4\u05DB\u05DC</label>
              </div>
              <div class="vr"></div>
              <span class="text-muted small" id="email-selected-count">0 \u05E0\u05D1\u05D7\u05E8\u05D5</span>
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
                <label class="form-label small fw-semibold">\u05E0\u05D5\u05E9\u05D0:</label>
                <input class="form-control" id="compose-subject" placeholder="\u05E0\u05D5\u05E9\u05D0 \u05D4\u05D4\u05D5\u05D3\u05E2\u05D4">
              </div>
              <div class="mb-2">
                <label class="form-label small fw-semibold">\u05EA\u05D5\u05DB\u05DF:</label>
                <textarea class="form-control" id="compose-body" rows="10" placeholder="\u05DB\u05EA\u05D1\u05D5 \u05D0\u05EA \u05D4\u05D4\u05D5\u05D3\u05E2\u05D4 \u05DB\u05D0\u05DF..."></textarea>
              </div>
              <div class="mb-2">
                <label class="form-label small fw-semibold">\u05D7\u05EA\u05D9\u05DE\u05D4:</label>
                <div class="text-muted small">\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3 - \u05DE\u05DB\u05D9\u05E0\u05D4 \u05DC\u05E6\u05E2\u05D9\u05E8\u05D9\u05DD \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9</div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button>
              <button class="btn btn-primary" onclick="Pages.emailSend()" id="email-send-btn">
                <i class="bi bi-send-fill me-1"></i>\u05E9\u05DC\u05D7
              </button>
            </div>
          </div>
        </div>
      </div>`;
  },

  /* ================================================================
     INIT — Load real emails
     ================================================================ */
  async emailInit() {
    this._emailFolder = 'INBOX';
    this._emailSelected = new Set();
    this._emailSearchQuery = '';
    this._emailLoading = true;

    // Load inbox + sent in parallel
    try {
      const [inbox, sent] = await Promise.all([
        this._gmailProxy('gmailList', { q: 'in:inbox', max: '50' }).catch(() => []),
        this._gmailProxy('gmailList', { q: 'in:sent', max: '30' }).catch(() => [])
      ]);
      this._emailApiInbox = Array.isArray(inbox) ? inbox : [];
      this._emailApiSent = Array.isArray(sent) ? sent : [];
    } catch(e) {
      console.error('Email load error:', e);
      this._emailApiInbox = [];
      this._emailApiSent = [];
    }

    this._emailLoading = false;
    this._emailRenderList();
    this._emailUpdateStats();
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

    // Update active folder
    document.querySelectorAll('#email-folders .list-group-item').forEach(el => {
      el.classList.toggle('active', el.dataset.folder === folder);
    });

    // Show list, hide detail
    const detail = document.getElementById('email-detail');
    const list = document.getElementById('email-list');
    if (detail) detail.classList.add('d-none');
    if (list) list.classList.remove('d-none');

    this._emailRenderList();
    this._emailUpdateStats();
  },

  /* ================================================================
     REFRESH — Reload from Gmail
     ================================================================ */
  async emailRefresh() {
    const btn = document.getElementById('email-refresh-btn');
    if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>\u05D8\u05D5\u05E2\u05DF...'; }
    const list = document.getElementById('email-list');
    if (list) list.innerHTML = Utils.skeleton(5);

    try {
      const [inbox, sent] = await Promise.all([
        this._gmailProxy('gmailList', { q: 'in:inbox', max: '50' }),
        this._gmailProxy('gmailList', { q: 'in:sent', max: '30' })
      ]);
      this._emailApiInbox = Array.isArray(inbox) ? inbox : [];
      this._emailApiSent = Array.isArray(sent) ? sent : [];
      this._emailThreadCache = {};
      Utils.toast('\u05D4\u05D3\u05D5\u05D0\u05E8 \u05E2\u05D5\u05D3\u05DB\u05DF \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4', 'success');
    } catch(e) {
      Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05E8\u05E2\u05E0\u05D5\u05DF: ' + e.message, 'danger');
    }

    if (btn) { btn.disabled = false; btn.innerHTML = '<i class="bi bi-arrow-clockwise me-1"></i>\u05E8\u05E2\u05E0\u05D5\u05DF'; }
    this._emailRenderList();
    this._emailUpdateStats();
  },

  /* ================================================================
     SEARCH — Server-side Gmail search
     ================================================================ */
  async emailSearchGmail() {
    const q = (document.getElementById('email-search')?.value || '').trim();
    if (!q) { this.emailLoadFolder(this._emailFolder); return; }

    const list = document.getElementById('email-list');
    if (list) list.innerHTML = Utils.skeleton(3);

    try {
      const results = await this._gmailProxy('gmailList', { q, max: '30' });
      this._loadedEmails = Array.isArray(results) ? results : [];
      this._emailRenderSearchResults(this._loadedEmails, q);
    } catch(e) {
      if (list) list.innerHTML = '<div class="text-center py-5 text-danger"><i class="bi bi-x-circle fs-1"></i><p>\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05D7\u05D9\u05E4\u05D5\u05E9</p></div>';
    }
  },

  emailFilterLocal() {
    const q = (document.getElementById('email-search')?.value || '').trim();
    this._emailSearchQuery = q;
    this._emailRenderList();
  },

  _emailRenderSearchResults(emails, query) {
    const list = document.getElementById('email-list');
    if (!list) return;
    if (!emails.length) {
      list.innerHTML = `<div class="text-center py-5 text-muted"><i class="bi bi-search fs-1 d-block mb-2"></i><h6>\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05E2\u05D1\u05D5\u05E8 "${query}"</h6></div>`;
      return;
    }
    list.innerHTML = `<div class="text-muted small mb-2"><i class="bi bi-search me-1"></i>${emails.length} \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05E2\u05D1\u05D5\u05E8 "${query}"</div>` +
      emails.map(e => this._emailRowHTML(e)).join('');
  },

  /* ================================================================
     RENDER EMAIL LIST
     ================================================================ */
  _emailRenderList() {
    let emails = this._getEmailsForFolder(this._emailFolder);
    const q = this._emailSearchQuery;
    if (q) {
      const qLow = q.toLowerCase();
      emails = emails.filter(e =>
        (e.from||'').toLowerCase().includes(qLow) || (e.subject||'').toLowerCase().includes(qLow) ||
        (e.snippet||'').toLowerCase().includes(qLow) || (e.to||'').toLowerCase().includes(qLow)
      );
    }
    this._loadedEmails = emails;

    const list = document.getElementById('email-list');
    if (!list) return;

    if (this._emailLoading) {
      list.innerHTML = Utils.skeleton(5);
      return;
    }

    if (!emails.length) {
      const icon = this._emailFolder === 'STARRED' ? 'bi-star' : 'bi-inbox';
      const text = q ? '\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA' : '\u05D0\u05D9\u05DF \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA';
      list.innerHTML = `<div class="text-center py-5 text-muted"><i class="bi ${icon} fs-1 d-block mb-2"></i><h6>${text}</h6></div>`;
      return;
    }

    list.innerHTML = emails.map(e => this._emailRowHTML(e)).join('');
    this._emailUpdateBulkBar();
  },

  _emailRowHTML(e) {
    const isUnread = e.unread && !this._emailReadSet.has(e.id);
    const isStarred = this._emailStarred.has(e.id);
    const isSelected = this._emailSelected.has(e.id);
    const senderName = this._emailSenderName(e.from);
    const initials = this._emailInitials(senderName);
    const color = this._emailAvatarColor(senderName);
    const isSent = this._emailFolder === 'SENT';
    const displayName = isSent ? ('\u05D0\u05DC: ' + this._emailSenderName(e.to)) : senderName;
    const dateStr = this._emailFormatDate(e.date);
    const msgCount = (e.count && e.count > 1) ? `<span class="badge bg-secondary ms-1" style="font-size:10px">${e.count}</span>` : '';
    const escapedId = (e.id || '').replace(/'/g, "\\'");

    return `
      <div class="card mb-2 border-0 shadow-sm email-row ${isUnread ? 'border-start border-primary border-3' : ''} ${isSelected ? 'bg-light' : ''}"
           style="cursor:pointer;transition:all .15s">
        <div class="card-body py-2 px-3">
          <div class="d-flex align-items-center gap-2">
            <div class="form-check mb-0" onclick="event.stopPropagation()">
              <input class="form-check-input" type="checkbox" ${isSelected ? 'checked' : ''}
                onchange="Pages.emailToggleSelect('${escapedId}')">
            </div>
            <button class="btn btn-sm p-0 border-0" onclick="event.stopPropagation();Pages.emailToggleStar('${escapedId}')"
              title="${isStarred ? '\u05D4\u05E1\u05E8 \u05DB\u05D5\u05DB\u05D1' : '\u05D4\u05D5\u05E1\u05E3 \u05DB\u05D5\u05DB\u05D1'}">
              <i class="bi ${isStarred ? 'bi-star-fill text-warning' : 'bi-star text-muted'} fs-6"></i>
            </button>
            <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                 style="width:38px;height:38px;background:${color};color:#fff;font-size:14px;font-weight:600"
                 onclick="Pages.emailViewDetail('${escapedId}')">
              ${initials}
            </div>
            <div class="flex-grow-1 min-width-0" onclick="Pages.emailViewDetail('${escapedId}')">
              <div class="d-flex justify-content-between align-items-center">
                <span class="${isUnread ? 'fw-bold' : 'text-muted'} text-truncate" style="max-width:55%">
                  ${displayName || '\u05DC\u05D0 \u05D9\u05D3\u05D5\u05E2'}${msgCount}
                </span>
                <small class="text-muted flex-shrink-0 ms-2">${dateStr}</small>
              </div>
              <div class="${isUnread ? 'fw-semibold' : ''} text-truncate small">${e.subject || '(\u05DC\u05DC\u05D0 \u05E0\u05D5\u05E9\u05D0)'}</div>
              <div class="text-muted small text-truncate" style="opacity:.7">${(e.snippet || '').substring(0, 120)}</div>
            </div>
          </div>
        </div>
      </div>`;
  },

  /* ================================================================
     EMAIL DETAIL VIEW — Load real thread
     ================================================================ */
  async emailViewDetail(id) {
    this._emailReadSet.add(id);

    document.getElementById('email-list').classList.add('d-none');
    document.getElementById('email-bulk-bar')?.classList.add('d-none');
    const detail = document.getElementById('email-detail');
    detail.classList.remove('d-none');
    detail.innerHTML = '<div class="text-center py-5"><div class="spinner-border text-primary"></div><p class="mt-2 text-muted">\u05D8\u05D5\u05E2\u05DF \u05E9\u05E8\u05E9\u05D5\u05E8...</p></div>';

    // Find email metadata
    const allEmails = [...this._emailApiInbox, ...this._emailApiSent, ...(this._loadedEmails || [])];
    const emailMeta = allEmails.find(e => e.id === id);

    // Load full thread from API (or use cache)
    let messages = this._emailThreadCache[id];
    if (!messages) {
      try {
        messages = await this._gmailProxy('gmailRead', { id });
        if (Array.isArray(messages)) this._emailThreadCache[id] = messages;
      } catch(e) {
        detail.innerHTML = `<div class="text-center py-5 text-danger"><i class="bi bi-x-circle fs-1"></i><p>\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05D8\u05E2\u05D9\u05E0\u05EA \u05D4\u05D4\u05D5\u05D3\u05E2\u05D4</p>
          <button class="btn btn-outline-primary btn-sm" onclick="Pages.emailBackToList()">\u05D7\u05D6\u05E8\u05D4</button></div>`;
        return;
      }
    }

    if (!Array.isArray(messages) || !messages.length) {
      detail.innerHTML = `<div class="text-center py-5 text-muted"><i class="bi bi-envelope-x fs-1"></i><p>\u05D4\u05D5\u05D3\u05E2\u05D4 \u05E8\u05D9\u05E7\u05D4</p>
        <button class="btn btn-outline-primary btn-sm" onclick="Pages.emailBackToList()">\u05D7\u05D6\u05E8\u05D4</button></div>`;
      return;
    }

    const subject = emailMeta?.subject || messages[0]?.subject || '';
    const isStarred = this._emailStarred.has(id);
    const escapedId = id.replace(/'/g, "\\'");

    // Render all messages in thread
    const msgsHTML = messages.map((m, idx) => {
      const senderName = this._emailSenderName(m.from);
      const initials = this._emailInitials(senderName);
      const color = this._emailAvatarColor(senderName);
      const dateStr = this._emailFormatDate(m.date);
      const isCollapsed = idx < messages.length - 1; // Collapse all except last
      const bodyClean = (m.body || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      return `
        <div class="card border-0 shadow-sm mb-2 ${isCollapsed ? 'email-collapsed' : ''}">
          <div class="card-body py-3 px-3" style="cursor:pointer" onclick="this.parentElement.classList.toggle('email-collapsed')">
            <div class="d-flex align-items-center gap-2">
              <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                   style="width:36px;height:36px;background:${color};color:#fff;font-size:13px;font-weight:600">
                ${initials}
              </div>
              <div class="flex-grow-1">
                <div class="d-flex justify-content-between">
                  <span class="fw-semibold small">${senderName}</span>
                  <small class="text-muted">${dateStr}</small>
                </div>
                <div class="text-muted small">${(m.from || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
                ${m.to ? '<div class="text-muted small">\u05D0\u05DC: ' + (m.to || '').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</div>' : ''}
              </div>
            </div>
          </div>
          <div class="email-msg-body px-3 pb-3" style="white-space:pre-wrap;line-height:1.8;font-size:14px;max-height:500px;overflow-y:auto">${bodyClean}</div>
        </div>`;
    }).join('');

    const lastMsg = messages[messages.length - 1];
    const lastFrom = (lastMsg.from || '').replace(/"/g, '').replace(/<[^>]+>/g, '').trim();
    const lastEmail = ((lastMsg.from || '').match(/<([^>]+)>/) || [])[1] || lastMsg.from || '';

    detail.innerHTML = `
      <div class="mb-3">
        <button class="btn btn-link text-decoration-none p-0 mb-2" onclick="Pages.emailBackToList()">
          <i class="bi bi-arrow-right me-1"></i>\u05D7\u05D6\u05E8\u05D4 \u05DC\u05E8\u05E9\u05D9\u05DE\u05D4
        </button>
        <div class="d-flex justify-content-between align-items-start">
          <h4 class="fw-bold mb-0">${subject || '(\u05DC\u05DC\u05D0 \u05E0\u05D5\u05E9\u05D0)'}</h4>
          <button class="btn btn-sm p-0 border-0" onclick="Pages.emailToggleStar('${escapedId}')">
            <i class="bi ${isStarred ? 'bi-star-fill text-warning' : 'bi-star text-muted'} fs-4"></i>
          </button>
        </div>
        <span class="badge bg-light text-muted border">${messages.length} \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05D1\u05E9\u05E8\u05E9\u05D5\u05E8</span>
      </div>

      ${msgsHTML}

      <div class="d-flex gap-2 mt-3 flex-wrap">
        <button class="btn btn-outline-primary btn-sm" onclick="Pages.emailReply('${lastEmail.replace(/'/g, "\\'")}','${subject.replace(/'/g, "\\'")}')">
          <i class="bi bi-reply-fill me-1"></i>\u05D4\u05E9\u05D1
        </button>
        <button class="btn btn-outline-success btn-sm" onclick="Pages.emailForward('${subject.replace(/'/g, "\\'")}','${escapedId}')">
          <i class="bi bi-forward-fill me-1"></i>\u05D4\u05E2\u05D1\u05E8
        </button>
      </div>

      <style>
        .email-collapsed .email-msg-body { display: none; }
        .email-collapsed .card-body { opacity: .7; }
      </style>`;

    this._emailUpdateStats();
  },

  emailBackToList() {
    document.getElementById('email-detail').classList.add('d-none');
    document.getElementById('email-list').classList.remove('d-none');
    document.getElementById('email-bulk-bar')?.classList.remove('d-none');
    this._emailRenderList();
  },

  /* ================================================================
     STAR / SELECT
     ================================================================ */
  emailToggleStar(id) {
    if (this._emailStarred.has(id)) this._emailStarred.delete(id);
    else this._emailStarred.add(id);
    this._emailRenderList();
    this._emailUpdateStats();
  },

  emailToggleSelect(id) {
    if (this._emailSelected.has(id)) this._emailSelected.delete(id);
    else this._emailSelected.add(id);
    this._emailRenderList();
  },

  emailToggleSelectAll() {
    const allChecked = document.getElementById('email-select-all')?.checked;
    if (allChecked) this._loadedEmails.forEach(e => this._emailSelected.add(e.id));
    else this._emailSelected.clear();
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
     COMPOSE / REPLY / FORWARD / SEND
     ================================================================ */
  emailShowCompose() {
    document.getElementById('compose-to').value = '';
    document.getElementById('compose-subject').value = '';
    document.getElementById('compose-body').value = '';
    new bootstrap.Modal(document.getElementById('compose-modal')).show();
  },

  emailReply(fromEmail, subject) {
    document.getElementById('compose-to').value = fromEmail || '';
    document.getElementById('compose-subject').value = 'Re: ' + (subject || '');
    document.getElementById('compose-body').value = '\n\n---\n';
    new bootstrap.Modal(document.getElementById('compose-modal')).show();
  },

  emailForward(subject, id) {
    const msgs = this._emailThreadCache[id];
    const lastMsg = msgs ? msgs[msgs.length - 1] : null;
    document.getElementById('compose-to').value = '';
    document.getElementById('compose-subject').value = 'Fwd: ' + (subject || '');
    document.getElementById('compose-body').value = '\n\n---------- \u05D4\u05D5\u05D3\u05E2\u05D4 \u05DE\u05D5\u05E2\u05D1\u05E8\u05EA ----------\n' +
      (lastMsg ? '\u05DE\u05D0\u05EA: ' + (lastMsg.from || '') + '\n\u05EA\u05D0\u05E8\u05D9\u05DA: ' + (lastMsg.date || '') + '\n\n' + (lastMsg.body || '') : '');
    new bootstrap.Modal(document.getElementById('compose-modal')).show();
  },

  async emailSend() {
    const to = document.getElementById('compose-to').value.trim();
    const subject = document.getElementById('compose-subject').value.trim();
    const body = document.getElementById('compose-body').value.trim();
    if (!to || !subject) { Utils.toast('\u05D7\u05E1\u05E8 \u05E0\u05DE\u05E2\u05DF \u05D0\u05D5 \u05E0\u05D5\u05E9\u05D0', 'warning'); return; }

    const btn = document.getElementById('email-send-btn');
    if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>\u05E9\u05D5\u05DC\u05D7...'; }

    try {
      // Encode subject and body as base64 for Hebrew support
      const subjB64 = btoa(unescape(encodeURIComponent(subject)));
      const bodyB64 = btoa(unescape(encodeURIComponent(body)));
      await this._gmailProxy('gmailSend', { to, subjB64, bodyB64 });
      bootstrap.Modal.getInstance(document.getElementById('compose-modal'))?.hide();
      Utils.toast('\u05D4\u05D4\u05D5\u05D3\u05E2\u05D4 \u05E0\u05E9\u05DC\u05D7\u05D4 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4!', 'success');
    } catch(e) {
      Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05E9\u05DC\u05D9\u05D7\u05D4: ' + e.message, 'danger');
    }

    if (btn) { btn.disabled = false; btn.innerHTML = '<i class="bi bi-send-fill me-1"></i>\u05E9\u05DC\u05D7'; }
  },

  /* ================================================================
     UPDATE STATS
     ================================================================ */
  _emailUpdateStats() {
    const totalEl = document.getElementById('stat-total');
    const unreadEl = document.getElementById('stat-unread');
    const sentEl = document.getElementById('stat-sent');
    const starredEl = document.getElementById('stat-starred');
    const inboxCountEl = document.getElementById('inbox-count');
    const sentCountEl = document.getElementById('sent-count');
    const starredCountEl = document.getElementById('starred-count');

    const unread = this._emailUnreadCount();
    if (totalEl) totalEl.textContent = this._emailApiInbox.length;
    if (unreadEl) unreadEl.textContent = unread;
    if (sentEl) sentEl.textContent = this._emailApiSent.length;
    if (starredEl) starredEl.textContent = this._emailStarred.size;
    if (inboxCountEl) inboxCountEl.textContent = unread || '';
    if (sentCountEl) sentCountEl.textContent = this._emailApiSent.length || '';
    if (starredCountEl) starredCountEl.textContent = this._emailStarred.size || '';
  }
});
