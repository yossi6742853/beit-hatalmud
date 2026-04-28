/* ===== BHT v6.8 — App Core (Router, Auth, Data Layer) ===== */

const App = {
  /* ---- Config ---- */
  API_URL: 'https://script.google.com/macros/s/AKfycbx5tzS-Br4F4-JkH2N4qPJ2kA5bNxqqYgzfmvB19YM6NitHFgNziSxhKfZx2gSnX8ySIw/exec',
  API_TOKEN: 'bht2026',
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes
  PIN_KEY: 'bht_pin_hash',
  CACHE_PREFIX: 'bht_cache_',
  THEME_KEY: 'bht_theme',
  NOTIF_KEY: 'bht_notifications',
  SESSION_KEY: 'bht_session_start',
  FAVORITES_KEY: 'bht_favorite_pages',
  USE_API: true, // true = real data from Apps Script, false = demo fallback
  _pageTimers: [],

  /* ---- Sheet name mapping ----
     Maps module sheet names that don't exist yet to existing sheets,
     or marks them for auto-creation. */
  SHEET_MAP: {
    // Modules that map to existing sheets
    '\u05D0\u05E0\u05E9\u05D9_\u05E7\u05E9\u05E8': '\u05D4\u05D5\u05E8\u05D9\u05DD',           // אנשי_קשר → הורים
    '\u05DE\u05E1\u05DE\u05DB\u05D9_\u05EA\u05DC\u05DE\u05D9\u05D3': '\u05E7\u05D1\u05E6\u05D9\u05DD_\u05DE\u05E6\u05D5\u05E8\u05E4\u05D9\u05DD', // מסמכי_תלמיד → קבצים_מצורפים
    '\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA_\u05E6\u05D5\u05D5\u05EA': '\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA', // נוכחות_צוות → נוכחות
    '\u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD': '\u05E6\u05D5\u05D5\u05EA',                   // משתמשים → צוות
    '\u05D7\u05D3\u05E8\u05D9\u05DD': '\u05DE\u05E1\u05D2\u05E8\u05D5\u05EA',                   // חדרים → מסגרות
    '\u05D4\u05EA\u05E8\u05D0\u05D5\u05EA': '\u05D9\u05D5\u05DE\u05DF_\u05E4\u05E2\u05D9\u05DC\u05D5\u05EA', // התראות → יומן_פעילות
    '\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9_\u05E2\u05D6\u05E8': '\u05DE\u05E2\u05E8\u05DB\u05EA_\u05E9\u05E2\u05D5\u05EA' // שיעורי_עזר → מערכת_שעות
    // Sheets that need auto-creation (not in map = will be created on demand):
    // ספריה, רכוש, לוח_מודעות, הסעות, תפריט, חירום, טפסים, הצבעות, פרסים, תעודות
  },

  /* Set of sheets we already attempted to auto-create this session */
  _createdSheets: new Set(),

  currentPage: null,
  charts: {},
  _sessionTimerInterval: null,
  _lsObserverActive: false,
  _activeRequests: 0,

  /* ==============================
     INITIALIZATION
     ============================== */
  init() {
    // Set Chart.js global defaults for RTL Hebrew labels + smooth transitions
    if (typeof Chart !== 'undefined') {
      Chart.defaults.font.family = 'Heebo';
      Chart.defaults.animation = { duration: 600, easing: 'easeOutQuart' };
      // Token-based palette read from CSS vars (with sensible fallbacks)
      const css = getComputedStyle(document.documentElement);
      this.chartPalette = {
        ok:    (css.getPropertyValue('--bht-success') || '').trim() || '#10b981',
        warn:  (css.getPropertyValue('--bht-warning') || '').trim() || '#f59e0b',
        bad:   (css.getPropertyValue('--bht-danger')  || '').trim() || '#ef4444',
        brand: (css.getPropertyValue('--bht-primary') || '').trim() || '#3b82f6',
        info:  '#06b6d4', purple: '#8b5cf6', mute: '#94a3b8',
        series: ['#3b82f6','#10b981','#f59e0b','#8b5cf6','#06b6d4','#ef4444','#6366f1','#ec4899']
      };
      this.chartAlpha = (hex, a) => {
        if (!hex || !hex.startsWith('#')) return hex;
        const n = parseInt(hex.slice(1).padStart(6, '0'), 16);
        return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a})`;
      };
    }
    // Global error handler + logging + debounced user toast
    let _errCount = 0, _errTimer = null;
    const _notifyErr = (label) => {
      _errCount++;
      clearTimeout(_errTimer);
      _errTimer = setTimeout(() => {
        if (_errCount === 1 && Utils.toast) Utils.toast('שגיאה ' + label + ' — בדוק את הקונסול', 'warning');
        else if (_errCount > 1 && Utils.toast) Utils.toast(`${_errCount} שגיאות בדף — רענן אם משהו לא עובד`, 'warning');
        _errCount = 0;
      }, 800);
    };
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.message, e.filename, e.lineno);
      App.logError('js', e.message, e.filename + ':' + e.lineno);
      // Don't toast for resource load errors (img/script 404s) — only real JS exceptions
      if (e.message) _notifyErr('בלתי צפויה');
    });
    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise:', e.reason);
      App.logError('promise', String(e.reason));
      _notifyErr('בבקשה אסינכרונית');
    });

    try {
      this.applyTheme();
      this.bindGlobalEvents();
      this.initAutoRefresh();
      this.checkVersion();
      this.initCommandPalette();
      this.initAutoSaveIndicator();
      this.initFormDrafts();
      this.initMobileEnhancements();
      this._initDriveCatalogIndex();
    } catch(e) {
      console.error('Init error (non-fatal):', e);
    }

    // Always show UI even if init partially fails
    if (this.isLoggedIn()) {
      this.showApp();
    } else {
      this.showLanding();
    }
  },

  /* ==============================
     AUTHENTICATION
     ============================== */
  isLoggedIn() {
    return !!localStorage.getItem(this.PIN_KEY);
  },

  showLanding() {
    document.getElementById('landing-page').classList.remove('d-none');
    document.getElementById('login-screen').classList.add('d-none');
    document.getElementById('app-shell').classList.add('d-none');
  },

  showLogin() {
    document.getElementById('landing-page').classList.add('d-none');
    document.getElementById('login-screen').classList.remove('d-none');
    document.getElementById('app-shell').classList.add('d-none');
    const pinInput = document.getElementById('pin-input');
    pinInput.value = '';
    this.updatePinDots(0);
    setTimeout(() => pinInput.focus(), 100);
  },

  showApp() {
    document.getElementById('landing-page').classList.add('d-none');
    document.getElementById('login-screen').classList.add('d-none');
    document.getElementById('app-shell').classList.remove('d-none');
    try { this.startSessionTimer(); } catch(e) { /* silent */ }
    this.handleRoute();
    try { this.loadNotifications(); } catch(e) { /* silent */ }
    try { this.updateNotifBadgeFromStorage(); } catch(e) { /* silent */ }
    try { this.updateSyncStatus(); } catch(e) { /* silent */ }
    try { this._startPreload(); } catch(e) { /* silent */ }
    // Hebrew date in topbar
    try {
      const hd = document.getElementById('topbar-hebrew-date');
      if (hd && typeof Utils !== 'undefined' && Utils.hebrewDateFull) hd.textContent = Utils.hebrewDateFull();
    } catch(e) { /* silent */ }
    // Email unread badge in sidebar
    try {
      const emailBadge = document.getElementById('sidebar-email-badge');
      if (emailBadge && typeof EMAIL_CACHE !== 'undefined' && EMAIL_CACHE && EMAIL_CACHE.inbox) {
        const unread = EMAIL_CACHE.inbox.filter(e => e.unread).length;
        emailBadge.textContent = unread || '';
        emailBadge.classList.toggle('d-none', !unread);
      }
    } catch(e) { /* silent */ }
  },

  startSessionTimer() {
    if (this._sessionTimerInterval) clearInterval(this._sessionTimerInterval);
    this._sessionStart = Date.now();
    const el = document.getElementById('session-timer');
    if (!el) return;
    this._sessionTimerInterval = setInterval(() => {
      const diff = Math.floor((Date.now() - this._sessionStart) / 1000);
      const h = Math.floor(diff / 3600);
      const m = Math.floor((diff % 3600) / 60);
      el.textContent = (h ? h + ':' : '') + String(m).padStart(2, '0') + ':' + String(diff % 60).padStart(2, '0');
    }, 1000);
  },

  updateNotifBadgeFromStorage() {
    const badge = document.getElementById('notif-count');
    if (!badge) return;
    try {
      const notifs = JSON.parse(localStorage.getItem('bht_notifications') || '[]');
      const unread = notifs.filter(n => !n.read).length;
      if (unread > 0) { badge.textContent = unread; badge.classList.remove('d-none'); }
      else { badge.classList.add('d-none'); }
    } catch(e) { /* silent */ }
  },

  handleLogin() {
    const pin = document.getElementById('pin-input').value.trim();
    if (pin.length < 4) {
      this.showLoginError('\u05D4\u05E7\u05D5\u05D3 \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05DB\u05D9\u05DC 4-6 \u05E1\u05E4\u05E8\u05D5\u05EA');
      return;
    }
    // Store hashed PIN, track login time, and enter
    localStorage.setItem(this.PIN_KEY, Utils.hashPin(pin));
    localStorage.setItem('bht_last_login', new Date().toISOString());
    this.showApp();
    // Welcome toast with quick stats
    try {
      const students = (typeof DATA_CACHE !== 'undefined' && DATA_CACHE['\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD']) ? DATA_CACHE['\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD'].length : 0;
      const emails = (typeof EMAIL_CACHE !== 'undefined' && EMAIL_CACHE && EMAIL_CACHE.inbox) ? EMAIL_CACHE.inbox.filter(e=>e.unread).length : 0;
      let msg = '\u05D1\u05E8\u05D5\u05DA \u05D4\u05D1\u05D0!';
      if (students) msg += ` ${students} \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD.`;
      if (emails) msg += ` ${emails} \u05DE\u05D9\u05D9\u05DC\u05D9\u05DD \u05D7\u05D3\u05E9\u05D9\u05DD.`;
      Utils.toast(msg, 'success');
    } catch(e) { /* silent */ }
  },

  logout() {
    localStorage.removeItem(this.PIN_KEY);
    // Clear cache
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith(this.CACHE_PREFIX)) localStorage.removeItem(k);
    });
    this.showLanding();
  },

  showLoginError(msg) {
    const el = document.getElementById('login-error');
    el.textContent = msg;
    el.classList.remove('d-none');
    // Error stays visible until next PIN attempt (Nielsen heuristic #9)
  },

  updatePinDots(len) {
    const container = document.getElementById('pin-dots');
    let html = '';
    for (let i = 0; i < 6; i++) {
      html += `<div class="pin-dot ${i < len ? 'filled' : ''}"></div>`;
    }
    container.innerHTML = html;
  },

  /* ==============================
     ROUTING
     ============================== */
  handleRoute() {
    // Clear page-specific timers
    if (this._pageTimers) this._pageTimers.forEach(t => clearInterval(t));
    this._pageTimers = [];

    this._showRouteBar();
    const hash = location.hash.slice(1) || 'dashboard';
    const parts = hash.split('/');
    const page = parts[0];
    const param = parts[1] || null;

    // Update sidebar active + auto-expand category
    document.querySelectorAll('.sidebar-link').forEach(el => {
      const isActive = el.dataset.page === page;
      el.classList.toggle('active', isActive);
      if (isActive) el.setAttribute('aria-current', 'page'); else el.removeAttribute('aria-current');
      if (isActive) {
        const cat = el.closest('.sidebar-category');
        if (cat) {
          const body = cat.querySelector('.sidebar-cat-body');
          const btn = cat.querySelector('.sidebar-cat-header');
          if (body && body.classList.contains('collapsed')) {
            body.classList.remove('collapsed');
            btn.setAttribute('aria-expanded', 'true');
            try {
              const saved = JSON.parse(localStorage.getItem('bht_sidebar_cats') || '{}');
              saved[cat.dataset.cat] = true;
              localStorage.setItem('bht_sidebar_cats', JSON.stringify(saved));
            } catch(e) { /* silent */ }
          }
        }
      }
    });

    // Close mobile sidebar
    const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('sidebar'));
    if (offcanvas) offcanvas.hide();

    // Close any open modals
    document.querySelectorAll('.modal.show').forEach(m => {
      const instance = bootstrap.Modal.getInstance(m);
      if (instance) instance.hide();
    });

    // Destroy old charts (App.charts + Pages._XXX chart instances)
    Object.values(this.charts).forEach(c => { try { c.destroy(); } catch(e) { /* silent */ } });
    this.charts = {};
    // Cleanup chart instances stored on Pages object
    const chartKeys = ['_donChartMonth','_donChartMethod','_rankChart','_mvzChartLine','_mvzChartBar',
      '_pcMonthlyChart','_pcCatChart','_ppChartCollection','_ppChartMonthly','_salChartInstance'];
    chartKeys.forEach(k => { if (Pages[k]) { try { Pages[k].destroy(); } catch(e) { /* silent */ } Pages[k] = null; } });
    if (Pages._gbCharts) { Object.values(Pages._gbCharts).forEach(c => { try { c.destroy(); } catch(e) { /* silent */ } }); Pages._gbCharts = {}; }

    this.currentPage = page;
    this.trackRecentPage(page, param);
    this._syncBottomNav(page);
    // Update document title (WCAG 2.4.2) + announce to screen readers
    const pageTitles = { dashboard:'לוח בקרה', students:'תלמידים', attendance:'נוכחות', staff:'צוות',
      parents:'הורים', finance:'כספים', behavior:'התנהגות', homework:'שיעורי בית', academics:'מבחנים',
      tasks:'משימות', calendar:'לוח שנה', communications:'תקשורת', reports:'דוחות', settings:'הגדרות',
      pettycash:'קופה קטנה', budget:'תקציב', trips:'טיולים', mivtza:'מבצע לימוד', rankings:'דירוגים',
      timetable:'מערכת שעות', documents:'מסמכים', medical:'רפואי', committees:'ועדות',
      institutions:'מסגרות', forms:'טפסים', email:'דואר', drive:'קבצים', printcenter:'הדפסות',
      notifications:'התראות', cameras:'מצלמות', phone:'טלפון', help:'עזרה', hub:'מרכז',
      ai_assistant:'עוזר AI', user_management:'משתמשים', activity_log:'יומן', tala:'תל"א',
      checklist:'צ\'קליסט', donations:'תרומות', analytics:'ניתוחים', hebrewcal:'לוח עברי',
      emergency:'חירום', contacts:'אנשי קשר', bulletin:'לוח מודעות', library:'ספרייה',
      inventory:'מלאי', rewards:'פרסים', gradebook:'גרדבוק', whatsapp:'תקשורת',
      student:'כרטיס תלמיד', staff_card:'כרטיס איש צוות', parent_card:'כרטיס הורה' };
    const title = pageTitles[page] || page;
    document.title = title + ' · בית התלמוד';
    const announcer = document.getElementById('sr-announcer');
    if (announcer) announcer.textContent = 'נטען: ' + title;
    const content = document.getElementById('main-content');

    // Show skeleton loader while page renders
    content.innerHTML = this._skeletonHTML();

    // Render page (use requestAnimationFrame so skeleton paints first)
    requestAnimationFrame(() => {
      if (Pages[page]) {
        content.innerHTML = '<div class="fade-in page-enter">' + Pages[page](param) + '</div>';
        if (Pages[page + 'Init']) {
          try {
            const result = Pages[page + 'Init'](param);
            if (result && result.catch) result.catch(e => console.error('Page init error:', page, e));
          } catch(e) { console.error('Page init error:', page, e); }
        }
        this._enhanceA11y(content);
      } else {
        content.innerHTML = `<div class="empty-state"><i class="bi bi-question-circle"></i><h4>\u05D3\u05E3 \u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0</h4></div>`;
      }
      this._hideRouteBar();
    });
  },

  // Promote title -> aria-label on icon-only buttons/links so screen readers announce them
  _enhanceA11y(root) {
    if (!root) return;
    root.querySelectorAll('button[title], a[title]').forEach(el => {
      if (el.hasAttribute('aria-label')) return;
      const txt = (el.textContent || '').replace(/\s+/g, '').trim();
      if (txt) return;  // has visible text \u2014 title is supplementary
      const t = el.getAttribute('title');
      if (t) el.setAttribute('aria-label', t);
    });
    // Bare icon buttons with no title at all \u2014 fall back to icon class hint (very last resort)
    root.querySelectorAll('button:not([aria-label]):not([title]), a.btn:not([aria-label]):not([title])').forEach(el => {
      if ((el.textContent || '').trim()) return;
      const icon = el.querySelector('i.bi');
      if (!icon) return;
      const cls = [...icon.classList].find(c => c.startsWith('bi-'));
      if (cls) el.setAttribute('aria-label', cls.replace(/^bi-/, '').replace(/-/g, ' '));
    });
    this._enhanceForms(root);
  },

  // Sane min/max + pattern defaults for inputs (data-quality guardrails)
  _enhanceForms(root) {
    const today = new Date().toISOString().slice(0, 10);
    root.querySelectorAll('input[type="date"]:not([min])').forEach(el => {
      const id = (el.id || '').toLowerCase();
      const isBirth = /birth|\u05dc\u05d9\u05d3\u05d4|leida/.test(id) || /\u05dc\u05d9\u05d3\u05d4/.test(el.previousElementSibling?.textContent || '');
      el.min = '1900-01-01';
      el.max = isBirth ? today : '2099-12-31';
    });
    root.querySelectorAll('input[type="tel"]:not([pattern])').forEach(el => {
      el.pattern = '[\\d\\-\\s\\+\\(\\)]{7,20}';
      el.title = el.title || '\u05de\u05e1\u05e4\u05e8 \u05d8\u05dc\u05e4\u05d5\u05df: \u05e1\u05e4\u05e8\u05d5\u05ea, \u05e8\u05d5\u05d5\u05d7\u05d9\u05dd, \u05de\u05e7\u05e4\u05d9\u05dd, \u05e1\u05d5\u05d2\u05e8\u05d9\u05d9\u05dd, +';
      // Auto-format as user types: 0501234567 -> 050-1234567
      if (!el._fmtBound) {
        el._fmtBound = true;
        el.addEventListener('input', (e) => {
          const sel = el.selectionStart;
          let d = el.value.replace(/\D/g, '').slice(0, 11);
          el.value = d.length > 3 ? d.slice(0, 3) + '-' + d.slice(3) : d;
        });
      }
    });
    root.querySelectorAll('input[type="number"]:not([inputmode])').forEach(el => {
      el.inputMode = el.step && el.step !== 'any' && parseFloat(el.step) < 1 ? 'decimal' : 'numeric';
    });
  },

  addPageTimer(id) { this._pageTimers.push(id); },

  /* ==============================
     DATA LAYER
     ============================== */
  /* ---- Loading bar for fetch operations ---- */
  _showLoadingBar() {
    this._activeRequests++;
    let bar = document.getElementById('bht-loading-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'bht-loading-bar';
      bar.style.cssText = 'position:fixed;top:0;right:0;width:0;height:3px;background:linear-gradient(90deg,#3b82f6,#6366f1);z-index:9999;transition:width .3s ease;pointer-events:none;';
      document.body.appendChild(bar);
    }
    bar.style.opacity = '1';
    bar.style.width = '30%';
    setTimeout(() => { if (bar.style.opacity === '1') bar.style.width = '60%'; }, 300);
    setTimeout(() => { if (bar.style.opacity === '1') bar.style.width = '80%'; }, 800);
    // Safety: auto-hide after 15s if stuck
    setTimeout(() => { if (bar.style.opacity === '1') this._hideLoadingBar(); }, 15000);
  },

  _hideLoadingBar() {
    this._activeRequests = Math.max(0, this._activeRequests - 1);
    if (this._activeRequests > 0) return;
    const bar = document.getElementById('bht-loading-bar');
    if (bar) {
      bar.style.width = '100%';
      setTimeout(() => { bar.style.opacity = '0'; bar.style.width = '0'; }, 300);
    }
  },

  /* Resolve sheet name through SHEET_MAP */
  _resolveSheet(sheet) {
    return this.SHEET_MAP[sheet] || sheet;
  },

  /* Ensure a sheet exists in the spreadsheet — creates it if needed */
  async ensureSheet(name) {
    if (this._createdSheets.has(name)) return;
    try {
      await this.apiCall('createSheet', name, {});
      this._createdSheets.add(name);
    } catch(e) {
      // Sheet may already exist — that's fine
      this._createdSheets.add(name);
    }
  },

  async fetchSheet(sheet, forceRefresh = false) {
    // Resolve mapped sheet name
    const resolvedSheet = this._resolveSheet(sheet);
    const cacheKey = this.CACHE_PREFIX + resolvedSheet;

    // Check static DATA_CACHE first (generated offline from API)
    if (!forceRefresh && typeof DATA_CACHE !== 'undefined' && DATA_CACHE[resolvedSheet]) {
      const staticData = DATA_CACHE[resolvedSheet];
      if (Array.isArray(staticData) && staticData.length > 0) {
        this.setCache(cacheKey, staticData);
        return staticData;
      }
    }

    // Check cache
    if (!forceRefresh) {
      const cached = this.getCache(cacheKey);
      if (cached) return cached;
    }

    // In-flight dedupe: if a request for this sheet is already pending, return the same promise
    if (!this._inflight) this._inflight = new Map();
    if (this._inflight.has(resolvedSheet)) return this._inflight.get(resolvedSheet);
    const p = this._fetchSheetInner(sheet, resolvedSheet, cacheKey, forceRefresh)
      .finally(() => this._inflight.delete(resolvedSheet));
    this._inflight.set(resolvedSheet, p);
    return p;
  },

  async _fetchSheetInner(sheet, resolvedSheet, cacheKey, forceRefresh) {
    this._showLoadingBar();
    try {
      const url = `${this.API_URL}?mode=api&action=list&sheet=${encodeURIComponent(resolvedSheet)}&token=${this.API_TOKEN}`;
      let json;
      try {
        // Try fetch first (works on same-origin / non-NetFree)
        const resp = await fetch(url);
        if (!resp.ok) throw new Error('HTTP ' + resp.status);
        json = await resp.json();
      } catch(fetchErr) {
        // Fetch failed (CORS/NetFree) — try JSONP via script tag
        json = await new Promise((resolve, reject) => {
          const cbName = '_bht_cb_' + Date.now();
          const timeout = setTimeout(() => { delete window[cbName]; reject(new Error('JSONP timeout')); }, 15000);
          window[cbName] = (data) => { clearTimeout(timeout); delete window[cbName]; resolve(data); };
          const s = document.createElement('script');
          s.src = url + '&callback=' + cbName;
          s.onerror = () => { clearTimeout(timeout); delete window[cbName]; reject(new Error('JSONP error')); };
          document.head.appendChild(s);
          s.onload = () => s.remove();
        }).catch(() => ({ data: [] }));
      }

      if (json.error) {
        // Auto-create sheet if not found
        if (json.error.toLowerCase().includes('not found') || json.error.includes('\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0')) {
          console.warn(`Sheet "${resolvedSheet}" not found — creating automatically`);
          await this.ensureSheet(resolvedSheet);
          // Retry once after creation
          const retry = await fetch(url);
          if (retry.ok) {
            const retryJson = await retry.json();
            if (!retryJson.error) {
              const data = retryJson.data || [];
              this.setCache(cacheKey, data);
              return data;
            }
          }
          return [];
        }
        throw new Error(json.error);
      }
      const data = json.data || [];

      // Cache it
      this.setCache(cacheKey, data);
      return data;
    } catch (err) {
      console.error('fetchSheet error:', resolvedSheet, err);
      // Return cached even if expired
      const stale = localStorage.getItem(cacheKey);
      if (stale) {
        try { return JSON.parse(stale).data; } catch(e) { /* silent */ }
      }
      return [];
    } finally {
      this._hideLoadingBar();
    }
  },

  async apiCall(action, sheet, data = {}) {
    try {
      const url = `${this.API_URL}`;
      // Resolve sheet name through SHEET_MAP (skip for createSheet action)
      const resolvedSheet = action === 'createSheet' ? sheet : this._resolveSheet(sheet);
      // Map action names to API actions: add -> api_add, update -> api_update, delete -> api_delete
      const apiAction = 'api_' + action;
      const body = { action: apiAction, sheet: resolvedSheet, token: this.API_TOKEN, ...data };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(body),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!resp.ok) {
        Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05E9\u05E8\u05EA - \u05E0\u05E1\u05D4 \u05E9\u05D5\u05D1 \u05DE\u05D0\u05D5\u05D7\u05E8 \u05D9\u05D5\u05EA\u05E8', 'danger');
        const httpErr = new Error('HTTP ' + resp.status);
        httpErr._toastShown = true;
        throw httpErr;
      }

      const result = await resp.json();

      if (result.error) {
        throw new Error(result.error);
      }

      // Invalidate cache for this sheet
      localStorage.removeItem(this.CACHE_PREFIX + resolvedSheet);

      return result;
    } catch (err) {
      if (err.name === 'AbortError') {
        Utils.toast('\u05D4\u05D1\u05E7\u05E9\u05D4 \u05DC\u05E7\u05D7\u05D4 \u05D9\u05D5\u05EA\u05E8 \u05DE\u05D3\u05D9 \u05D6\u05DE\u05DF', 'warning');
      } else if (err.name === 'TypeError' || err.message === 'Failed to fetch') {
        Utils.toast('\u05D0\u05D9\u05DF \u05D7\u05D9\u05D1\u05D5\u05E8 \u05DC\u05D0\u05D9\u05E0\u05D8\u05E8\u05E0\u05D8 - \u05D4\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05E0\u05E9\u05DE\u05E8\u05D5 \u05DE\u05E7\u05D5\u05DE\u05D9\u05EA', 'warning');
      } else if (!err._toastShown) {
        Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05E9\u05E8\u05EA - \u05E0\u05E1\u05D4 \u05E9\u05D5\u05D1 \u05DE\u05D0\u05D5\u05D7\u05E8 \u05D9\u05D5\u05EA\u05E8', 'danger');
      }
      console.error('apiCall error:', err);
      throw err;
    }
  },

  /* ---- Button loading state helper ---- */
  setButtonLoading(btn, loading) {
    if (!btn) return;
    if (loading) {
      btn._origHTML = btn.innerHTML;
      btn.disabled = true;
      const label = btn.textContent.trim();
      btn.innerHTML = `<span class="spinner-border spinner-border-sm me-1" role="status"></span>${label}`;
    } else {
      btn.disabled = false;
      if (btn._origHTML) btn.innerHTML = btn._origHTML;
    }
  },

  /* Fetch a single record by ID */
  async fetchRecord(sheet, id) {
    try {
      const url = `${this.API_URL}?mode=api&action=get&sheet=${encodeURIComponent(sheet)}&id=${encodeURIComponent(id)}&token=${this.API_TOKEN}`;
      const resp = await fetch(url);
      const json = await resp.json();
      if (json.error) throw new Error(json.error);
      return json.data;
    } catch(err) {
      console.error('fetchRecord error:', sheet, id, err);
      return null;
    }
  },

  /* Fetch stats (dashboard counts) */
  async fetchStats() {
    const cacheKey = this.CACHE_PREFIX + '_stats';
    const cached = this.getCache(cacheKey);
    if (cached) return cached;
    try {
      const url = `${this.API_URL}?mode=api&action=stats&token=${this.API_TOKEN}`;
      const resp = await fetch(url);
      const json = await resp.json();
      if (json.error) throw new Error(json.error);
      this.setCache(cacheKey, json.data);
      return json.data;
    } catch(err) {
      console.error('fetchStats error:', err);
      return null;
    }
  },

  /* ---- Cache helpers ---- */
  setCache(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
    } catch(e) {
      // QuotaExceededError — clear old caches and retry once
      try {
        Object.keys(localStorage).forEach(k => {
          if (k.startsWith(this.CACHE_PREFIX)) localStorage.removeItem(k);
        });
        localStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
      } catch(e2) {
        console.warn('localStorage quota exceeded even after cleanup');
      }
    }
  },

  getCache(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const { data, ts } = JSON.parse(raw);
      if (Date.now() - ts > this.CACHE_TTL) return null;
      return data;
    } catch(e) { return null; }
  },

  /* ==============================
     DEMO DATA (offline fallback)
     ============================== */
  getDemoData(sheet) {
    /* ---- Comprehensive demo data based on real Beit HaTalmud records ---- */
    const today = new Date().toISOString().slice(0,10);
    const yesterday = new Date(Date.now()-86400000).toISOString().slice(0,10);
    const twoDaysAgo = new Date(Date.now()-172800000).toISOString().slice(0,10);
    const lastWeek = new Date(Date.now()-604800000).toISOString().slice(0,10);
    const nextWeek = new Date(Date.now()+604800000).toISOString().slice(0,10);
    const nextMonth = new Date(Date.now()+2592000000).toISOString().slice(0,10);

    const demo = {
      /* ===== STUDENTS (20 across 3 classes) ===== */
      '\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD': [
        { '\u05DE\u05D6\u05D4\u05D4': 1, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D0\u05DC\u05E2\u05D6\u05E8', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05D9\u05D0\u05D9\u05E8', '\u05DB\u05D9\u05EA\u05D4': '\u05D0', '\u05D8\u05DC\u05E4\u05D5\u05DF': '052-7123673', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': '2014-11-01', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05E8\u05D9\u05E9 \u05DC\u05E7\u05D9\u05E9 16, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9', '\u05E2\u05D9\u05E8': '\u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' , '\u05ea\u05e2\u05d5\u05d3\u05ea_\u05d6\u05d4\u05d5\u05ea': '221877251', '\u05de\u05d9\u05e7\u05d5\u05d3': '9906100', '\u05d0\u05e8\u05e5_\u05dc\u05d9\u05d3\u05d4': '\u05d9\u05e9\u05e8\u05d0\u05dc', '\u05e2\u05d3\u05d4': '\u05e1\u05e4\u05e8\u05d3\u05d9', '\u05d1\u05d9\u05ea_\u05db\u05e0\u05e1\u05ea': '\u05d1\u05d9\u05ea \u05d9\u05e2\u05e7\u05d1', '\u05e8\u05d1_\u05d4\u05e7\u05d4\u05d9\u05dc\u05d4': '\u05d4\u05e8\u05d1 \u05e2\u05d5\u05d1\u05d3\u05d9\u05d4 \u05d9\u05d5\u05e1\u05e3', '\u05de\u05e1\u05e4\u05e8_\u05d0\u05d7\u05d9\u05dd': '5', '\u05de\u05d9\u05e7\u05d5\u05dd_\u05d1\u05de\u05e9\u05e4\u05d7\u05d4': '3', '\u05d1\u05d9\u05ea_\u05e1\u05e4\u05e8_\u05e7\u05d5\u05d3\u05dd': '\u05ea"\u05ea \u05d0\u05d5\u05e8 \u05d7\u05d3\u05e9', '\u05e9\u05dd_\u05e8\u05d1_\u05de\u05e4\u05e0\u05d4': '\u05d4\u05e8\u05d1 \u05e9\u05dc\u05d5\u05dd \u05db\u05d4\u05df', '\u05d4\u05e2\u05e8\u05d5\u05ea': '\u05ea\u05dc\u05de\u05d9\u05d3 \u05de\u05e6\u05d8\u05d9\u05d9\u05df', '\u05ea\u05d0\u05e8\u05d9\u05da_\u05d4\u05e8\u05e9\u05de\u05d4': '2024-09-01', '\u05ea\u05de\u05d5\u05e0\u05d4': '' , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '221877251', '\u05DE\u05D9\u05E7\u05D5\u05D3': '9906100', '\u05D0\u05E8\u05E5_\u05DC\u05D9\u05D3\u05D4': '\u05D9\u05E9\u05E8\u05D0\u05DC', '\u05E2\u05D3\u05D4': '\u05E1\u05E4\u05E8\u05D3\u05D9', '\u05D1\u05D9\u05EA_\u05DB\u05E0\u05E1\u05EA': '\u05D1\u05D9\u05EA \u05D9\u05E2\u05E7\u05D1', '\u05E8\u05D1_\u05D4\u05E7\u05D4\u05D9\u05DC\u05D4': '\u05D4\u05E8\u05D1 \u05E2\u05D5\u05D1\u05D3\u05D9\u05D4 \u05D9\u05D5\u05E1\u05E3', '\u05DE\u05E1\u05E4\u05E8_\u05D0\u05D7\u05D9\u05DD': '5', '\u05DE\u05D9\u05E7\u05D5\u05DD_\u05D1\u05DE\u05E9\u05E4\u05D7\u05D4': '3', '\u05D1\u05D9\u05EA_\u05E1\u05E4\u05E8_\u05E7\u05D5\u05D3\u05DD': '\u05EA"\u05EA \u05D0\u05D5\u05E8 \u05D7\u05D3\u05E9', '\u05E9\u05DD_\u05E8\u05D1_\u05DE\u05E4\u05E0\u05D4': '\u05D4\u05E8\u05D1 \u05E9\u05DC\u05D5\u05DD \u05DB\u05D4\u05DF', '\u05D4\u05E2\u05E8\u05D5\u05EA': '\u05EA\u05DC\u05DE\u05D9\u05D3 \u05DE\u05E6\u05D8\u05D9\u05D9\u05DF', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05E8\u05E9\u05DE\u05D4': '2024-09-01', '\u05EA\u05DE\u05D5\u05E0\u05D4': '' },
        { '\u05DE\u05D6\u05D4\u05D4': 2, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D4\u05DC\u05DC', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05DB\u05E5', '\u05DB\u05D9\u05EA\u05D4': '\u05D0', '\u05D8\u05DC\u05E4\u05D5\u05DF': '058-6111253', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': '2014-02-17', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05DE\u05E8\u05D9\u05DD \u05D4\u05E0\u05D1\u05D9\u05D0\u05D4 11, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9', '\u05E2\u05D9\u05E8': '\u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' , '\u05ea\u05e2\u05d5\u05d3\u05ea_\u05d6\u05d4\u05d5\u05ea': '221953763', '\u05de\u05d9\u05e7\u05d5\u05d3': '9906100', '\u05d0\u05e8\u05e5_\u05dc\u05d9\u05d3\u05d4': '\u05d9\u05e9\u05e8\u05d0\u05dc', '\u05e2\u05d3\u05d4': '\u05d0\u05e9\u05db\u05e0\u05d6\u05d9', '\u05d1\u05d9\u05ea_\u05db\u05e0\u05e1\u05ea': '\u05d4\u05d9\u05db\u05dc \u05de\u05e0\u05d7\u05dd', '\u05e8\u05d1_\u05d4\u05e7\u05d4\u05d9\u05dc\u05d4': '\u05d4\u05e8\u05d1 \u05de\u05e0\u05d3\u05d9 \u05db\u05e5', '\u05de\u05e1\u05e4\u05e8_\u05d0\u05d7\u05d9\u05dd': '7', '\u05de\u05d9\u05e7\u05d5\u05dd_\u05d1\u05de\u05e9\u05e4\u05d7\u05d4': '4', '\u05d1\u05d9\u05ea_\u05e1\u05e4\u05e8_\u05e7\u05d5\u05d3\u05dd': '\u05ea"\u05ea \u05d7\u05d9\u05d9 \u05e2\u05d5\u05dc\u05dd', '\u05e9\u05dd_\u05e8\u05d1_\u05de\u05e4\u05e0\u05d4': '\u05d4\u05e8\u05d1 \u05d7\u05d9\u05d9\u05dd \u05e7\u05e0\u05d9\u05d9\u05d1\u05e1\u05e7\u05d9', '\u05d4\u05e2\u05e8\u05d5\u05ea': '', '\u05ea\u05d0\u05e8\u05d9\u05da_\u05d4\u05e8\u05e9\u05de\u05d4': '2024-09-01', '\u05ea\u05de\u05d5\u05e0\u05d4': '' , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '221953763', '\u05DE\u05D9\u05E7\u05D5\u05D3': '9906100', '\u05D0\u05E8\u05E5_\u05DC\u05D9\u05D3\u05D4': '\u05D9\u05E9\u05E8\u05D0\u05DC', '\u05E2\u05D3\u05D4': '\u05D0\u05E9\u05DB\u05E0\u05D6\u05D9', '\u05D1\u05D9\u05EA_\u05DB\u05E0\u05E1\u05EA': '\u05D4\u05D9\u05DB\u05DC \u05DE\u05E0\u05D7\u05DD', '\u05E8\u05D1_\u05D4\u05E7\u05D4\u05D9\u05DC\u05D4': '\u05D4\u05E8\u05D1 \u05DE\u05E0\u05D3\u05D9 \u05DB\u05E5', '\u05DE\u05E1\u05E4\u05E8_\u05D0\u05D7\u05D9\u05DD': '7', '\u05DE\u05D9\u05E7\u05D5\u05DD_\u05D1\u05DE\u05E9\u05E4\u05D7\u05D4': '4', '\u05D1\u05D9\u05EA_\u05E1\u05E4\u05E8_\u05E7\u05D5\u05D3\u05DD': '\u05EA"\u05EA \u05D7\u05D9\u05D9 \u05E2\u05D5\u05DC\u05DD', '\u05E9\u05DD_\u05E8\u05D1_\u05DE\u05E4\u05E0\u05D4': '\u05D4\u05E8\u05D1 \u05D7\u05D9\u05D9\u05DD \u05E7\u05E0\u05D9\u05D9\u05D1\u05E1\u05E7\u05D9', '\u05D4\u05E2\u05E8\u05D5\u05EA': '', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05E8\u05E9\u05DE\u05D4': '2024-09-01', '\u05EA\u05DE\u05D5\u05E0\u05D4': '' },
        { '\u05DE\u05D6\u05D4\u05D4': 3, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05E9\u05DC\u05DE\u05D4 \u05D9\u05D4\u05D5\u05D3\u05D4', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05DC\u05D9\u05D9\u05D1\u05DC\u05E8', '\u05DB\u05D9\u05EA\u05D4': '\u05D0', '\u05D8\u05DC\u05E4\u05D5\u05DF': '052-7131377', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': '2014-07-13', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05E0\u05D7\u05DC \u05E9\u05D7\u05DD 3, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9', '\u05E2\u05D9\u05E8': '\u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' , '\u05ea\u05e2\u05d5\u05d3\u05ea_\u05d6\u05d4\u05d5\u05ea': '339584831', '\u05de\u05d9\u05e7\u05d5\u05d3': '9906200', '\u05d0\u05e8\u05e5_\u05dc\u05d9\u05d3\u05d4': '\u05d9\u05e9\u05e8\u05d0\u05dc', '\u05e2\u05d3\u05d4': '\u05d0\u05e9\u05db\u05e0\u05d6\u05d9', '\u05d1\u05d9\u05ea_\u05db\u05e0\u05e1\u05ea': '\u05d0\u05d4\u05dc \u05e9\u05e8\u05d4', '\u05e8\u05d1_\u05d4\u05e7\u05d4\u05d9\u05dc\u05d4': '\u05d4\u05e8\u05d1 \u05d6\u05d0\u05d1 \u05dc\u05d9\u05d9\u05d1\u05dc\u05e8', '\u05de\u05e1\u05e4\u05e8_\u05d0\u05d7\u05d9\u05dd': '6', '\u05de\u05d9\u05e7\u05d5\u05dd_\u05d1\u05de\u05e9\u05e4\u05d7\u05d4': '2', '\u05d1\u05d9\u05ea_\u05e1\u05e4\u05e8_\u05e7\u05d5\u05d3\u05dd': '\u05ea"\u05ea \u05ea\u05e4\u05d0\u05e8\u05ea \u05d9\u05e9\u05e8\u05d0\u05dc', '\u05e9\u05dd_\u05e8\u05d1_\u05de\u05e4\u05e0\u05d4': '\u05d4\u05e8\u05d1 \u05d3\u05d5\u05d3 \u05dc\u05d0\u05d5', '\u05d4\u05e2\u05e8\u05d5\u05ea': '', '\u05ea\u05d0\u05e8\u05d9\u05da_\u05d4\u05e8\u05e9\u05de\u05d4': '2024-08-15', '\u05ea\u05de\u05d5\u05e0\u05d4': '' , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '339584831', '\u05DE\u05D9\u05E7\u05D5\u05D3': '9906200', '\u05D0\u05E8\u05E5_\u05DC\u05D9\u05D3\u05D4': '\u05D9\u05E9\u05E8\u05D0\u05DC', '\u05E2\u05D3\u05D4': '\u05D0\u05E9\u05DB\u05E0\u05D6\u05D9', '\u05D1\u05D9\u05EA_\u05DB\u05E0\u05E1\u05EA': '\u05D0\u05D4\u05DC \u05E9\u05E8\u05D4', '\u05E8\u05D1_\u05D4\u05E7\u05D4\u05D9\u05DC\u05D4': '\u05D4\u05E8\u05D1 \u05D6\u05D0\u05D1 \u05DC\u05D9\u05D9\u05D1\u05DC\u05E8', '\u05DE\u05E1\u05E4\u05E8_\u05D0\u05D7\u05D9\u05DD': '6', '\u05DE\u05D9\u05E7\u05D5\u05DD_\u05D1\u05DE\u05E9\u05E4\u05D7\u05D4': '2', '\u05D1\u05D9\u05EA_\u05E1\u05E4\u05E8_\u05E7\u05D5\u05D3\u05DD': '\u05EA"\u05EA \u05EA\u05E4\u05D0\u05E8\u05EA \u05D9\u05E9\u05E8\u05D0\u05DC', '\u05E9\u05DD_\u05E8\u05D1_\u05DE\u05E4\u05E0\u05D4': '\u05D4\u05E8\u05D1 \u05D3\u05D5\u05D3 \u05DC\u05D0\u05D5', '\u05D4\u05E2\u05E8\u05D5\u05EA': '', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05E8\u05E9\u05DE\u05D4': '2024-08-15', '\u05EA\u05DE\u05D5\u05E0\u05D4': '' },
        { '\u05DE\u05D6\u05D4\u05D4': 4, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D9\u05D4\u05D5\u05D3\u05D4 \u05E6\u05D1\u05D9', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05E1\u05D9\u05D2\u05DC', '\u05DB\u05D9\u05EA\u05D4': '\u05D0', '\u05D8\u05DC\u05E4\u05D5\u05DF': '058-3202085', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': '2014-08-20', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05D0\u05DC\u05D9\u05E9\u05E2 \u05D4\u05E0\u05D1\u05D9\u05D0 7, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9', '\u05E2\u05D9\u05E8': '\u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' , '\u05ea\u05e2\u05d5\u05d3\u05ea_\u05d6\u05d4\u05d5\u05ea': '338201045', '\u05de\u05d9\u05e7\u05d5\u05d3': '9906100', '\u05d0\u05e8\u05e5_\u05dc\u05d9\u05d3\u05d4': '\u05d9\u05e9\u05e8\u05d0\u05dc', '\u05e2\u05d3\u05d4': '\u05d0\u05e9\u05db\u05e0\u05d6\u05d9', '\u05d1\u05d9\u05ea_\u05db\u05e0\u05e1\u05ea': '\u05d1\u05d9\u05ea \u05de\u05e0\u05d7\u05dd', '\u05e8\u05d1_\u05d4\u05e7\u05d4\u05d9\u05dc\u05d4': '\u05d4\u05e8\u05d1 \u05de\u05e0\u05d7\u05dd \u05e1\u05d9\u05d2\u05dc', '\u05de\u05e1\u05e4\u05e8_\u05d0\u05d7\u05d9\u05dd': '4', '\u05de\u05d9\u05e7\u05d5\u05dd_\u05d1\u05de\u05e9\u05e4\u05d7\u05d4': '1', '\u05d1\u05d9\u05ea_\u05e1\u05e4\u05e8_\u05e7\u05d5\u05d3\u05dd': '\u05ea"\u05ea \u05e0\u05e8 \u05d9\u05e9\u05e8\u05d0\u05dc', '\u05e9\u05dd_\u05e8\u05d1_\u05de\u05e4\u05e0\u05d4': '\u05d4\u05e8\u05d1 \u05d9\u05e2\u05e7\u05d1 \u05d0\u05d3\u05dc\u05e9\u05d8\u05d9\u05d9\u05df', '\u05d4\u05e2\u05e8\u05d5\u05ea': '\u05e6\u05e8\u05d9\u05da \u05de\u05e2\u05e7\u05d1 \u05d4\u05ea\u05e0\u05d4\u05d2\u05d5\u05ea', '\u05ea\u05d0\u05e8\u05d9\u05da_\u05d4\u05e8\u05e9\u05de\u05d4': '2024-09-01', '\u05ea\u05de\u05d5\u05e0\u05d4': '' , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '338201045', '\u05DE\u05D9\u05E7\u05D5\u05D3': '9906100', '\u05D0\u05E8\u05E5_\u05DC\u05D9\u05D3\u05D4': '\u05D9\u05E9\u05E8\u05D0\u05DC', '\u05E2\u05D3\u05D4': '\u05D0\u05E9\u05DB\u05E0\u05D6\u05D9', '\u05D1\u05D9\u05EA_\u05DB\u05E0\u05E1\u05EA': '\u05D1\u05D9\u05EA \u05DE\u05E0\u05D7\u05DD', '\u05E8\u05D1_\u05D4\u05E7\u05D4\u05D9\u05DC\u05D4': '\u05D4\u05E8\u05D1 \u05DE\u05E0\u05D7\u05DD \u05E1\u05D9\u05D2\u05DC', '\u05DE\u05E1\u05E4\u05E8_\u05D0\u05D7\u05D9\u05DD': '4', '\u05DE\u05D9\u05E7\u05D5\u05DD_\u05D1\u05DE\u05E9\u05E4\u05D7\u05D4': '1', '\u05D1\u05D9\u05EA_\u05E1\u05E4\u05E8_\u05E7\u05D5\u05D3\u05DD': '\u05EA"\u05EA \u05E0\u05E8 \u05D9\u05E9\u05E8\u05D0\u05DC', '\u05E9\u05DD_\u05E8\u05D1_\u05DE\u05E4\u05E0\u05D4': '\u05D4\u05E8\u05D1 \u05D9\u05E2\u05E7\u05D1 \u05D0\u05D3\u05DC\u05E9\u05D8\u05D9\u05D9\u05DF', '\u05D4\u05E2\u05E8\u05D5\u05EA': '\u05E6\u05E8\u05D9\u05DA \u05DE\u05E2\u05E7\u05D1 \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05E8\u05E9\u05DE\u05D4': '2024-09-01', '\u05EA\u05DE\u05D5\u05E0\u05D4': '' },
        { '\u05DE\u05D6\u05D4\u05D4': 5, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05DE\u05E0\u05D7\u05DD', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05E1\u05E0\u05D4\u05D3\u05E8\u05D0\u05D9', '\u05DB\u05D9\u05EA\u05D4': '\u05D0', '\u05D8\u05DC\u05E4\u05D5\u05DF': '052-7618781', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': '2014-10-09', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05E0\u05D7\u05DC \u05E9\u05DE\u05E9\u05D5\u05DF 6, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9', '\u05E2\u05D9\u05E8': '\u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' , '\u05ea\u05e2\u05d5\u05d3\u05ea_\u05d6\u05d4\u05d5\u05ea': '337891234', '\u05de\u05d9\u05e7\u05d5\u05d3': '9906300', '\u05d0\u05e8\u05e5_\u05dc\u05d9\u05d3\u05d4': '\u05d9\u05e9\u05e8\u05d0\u05dc', '\u05e2\u05d3\u05d4': '\u05ea\u05d9\u05de\u05e0\u05d9', '\u05d1\u05d9\u05ea_\u05db\u05e0\u05e1\u05ea': '\u05db\u05e0\u05e1\u05ea \u05d4\u05d2\u05d3\u05d5\u05dc\u05d4', '\u05e8\u05d1_\u05d4\u05e7\u05d4\u05d9\u05dc\u05d4': '\u05d4\u05e8\u05d1 \u05d7\u05e0\u05d5\u05da \u05e1\u05e0\u05d4\u05d3\u05e8\u05d0\u05d9', '\u05de\u05e1\u05e4\u05e8_\u05d0\u05d7\u05d9\u05dd': '8', '\u05de\u05d9\u05e7\u05d5\u05dd_\u05d1\u05de\u05e9\u05e4\u05d7\u05d4': '5', '\u05d1\u05d9\u05ea_\u05e1\u05e4\u05e8_\u05e7\u05d5\u05d3\u05dd': '\u05ea"\u05ea \u05d0\u05d5\u05e8 \u05ea\u05d5\u05e8\u05d4', '\u05e9\u05dd_\u05e8\u05d1_\u05de\u05e4\u05e0\u05d4': '\u05d4\u05e8\u05d1 \u05de\u05e9\u05d4 \u05e6\u05d3\u05e7\u05d4', '\u05d4\u05e2\u05e8\u05d5\u05ea': '', '\u05ea\u05d0\u05e8\u05d9\u05da_\u05d4\u05e8\u05e9\u05de\u05d4': '2024-08-20', '\u05ea\u05de\u05d5\u05e0\u05d4': '' , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '337891234', '\u05DE\u05D9\u05E7\u05D5\u05D3': '9906300', '\u05D0\u05E8\u05E5_\u05DC\u05D9\u05D3\u05D4': '\u05D9\u05E9\u05E8\u05D0\u05DC', '\u05E2\u05D3\u05D4': '\u05EA\u05D9\u05DE\u05E0\u05D9', '\u05D1\u05D9\u05EA_\u05DB\u05E0\u05E1\u05EA': '\u05DB\u05E0\u05E1\u05EA \u05D4\u05D2\u05D3\u05D5\u05DC\u05D4', '\u05E8\u05D1_\u05D4\u05E7\u05D4\u05D9\u05DC\u05D4': '\u05D4\u05E8\u05D1 \u05D7\u05E0\u05D5\u05DA \u05E1\u05E0\u05D4\u05D3\u05E8\u05D0\u05D9', '\u05DE\u05E1\u05E4\u05E8_\u05D0\u05D7\u05D9\u05DD': '8', '\u05DE\u05D9\u05E7\u05D5\u05DD_\u05D1\u05DE\u05E9\u05E4\u05D7\u05D4': '5', '\u05D1\u05D9\u05EA_\u05E1\u05E4\u05E8_\u05E7\u05D5\u05D3\u05DD': '\u05EA"\u05EA \u05D0\u05D5\u05E8 \u05EA\u05D5\u05E8\u05D4', '\u05E9\u05DD_\u05E8\u05D1_\u05DE\u05E4\u05E0\u05D4': '\u05D4\u05E8\u05D1 \u05DE\u05E9\u05D4 \u05E6\u05D3\u05E7\u05D4', '\u05D4\u05E2\u05E8\u05D5\u05EA': '', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05E8\u05E9\u05DE\u05D4': '2024-08-20', '\u05EA\u05DE\u05D5\u05E0\u05D4': '' },
        { '\u05DE\u05D6\u05D4\u05D4': 6, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D1\u05E6\u05DC\u05D0\u05DC', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05E4\u05D8\u05D9\u05E0\u05D5', '\u05DB\u05D9\u05EA\u05D4': '\u05D0', '\u05D8\u05DC\u05E4\u05D5\u05DF': '054-7254914', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': '2015-03-16', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05DE\u05E8\u05D9\u05DD \u05D4\u05E0\u05D1\u05D9\u05D0\u05D4 19, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9', '\u05E2\u05D9\u05E8': '\u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' , '\u05ea\u05e2\u05d5\u05d3\u05ea_\u05d6\u05d4\u05d5\u05ea': '223312497', '\u05de\u05d9\u05e7\u05d5\u05d3': '9906100', '\u05d0\u05e8\u05e5_\u05dc\u05d9\u05d3\u05d4': '\u05d9\u05e9\u05e8\u05d0\u05dc', '\u05e2\u05d3\u05d4': '\u05e1\u05e4\u05e8\u05d3\u05d9', '\u05d1\u05d9\u05ea_\u05db\u05e0\u05e1\u05ea': '\u05d0\u05d5\u05e8 \u05d4\u05d7\u05d9\u05d9\u05dd', '\u05e8\u05d1_\u05d4\u05e7\u05d4\u05d9\u05dc\u05d4': '\u05d4\u05e8\u05d1 \u05d1\u05e0\u05d9\u05de\u05d9\u05df \u05e4\u05d8\u05d9\u05e0\u05d5', '\u05de\u05e1\u05e4\u05e8_\u05d0\u05d7\u05d9\u05dd': '3', '\u05de\u05d9\u05e7\u05d5\u05dd_\u05d1\u05de\u05e9\u05e4\u05d7\u05d4': '2', '\u05d1\u05d9\u05ea_\u05e1\u05e4\u05e8_\u05e7\u05d5\u05d3\u05dd': '', '\u05e9\u05dd_\u05e8\u05d1_\u05de\u05e4\u05e0\u05d4': '\u05d4\u05e8\u05d1 \u05e9\u05de\u05d5\u05d0\u05dc \u05d0\u05d5\u05d9\u05e8\u05d1\u05da', '\u05d4\u05e2\u05e8\u05d5\u05ea': '', '\u05ea\u05d0\u05e8\u05d9\u05da_\u05d4\u05e8\u05e9\u05de\u05d4': '2024-09-01', '\u05ea\u05de\u05d5\u05e0\u05d4': '' , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '223312497', '\u05DE\u05D9\u05E7\u05D5\u05D3': '9906100', '\u05D0\u05E8\u05E5_\u05DC\u05D9\u05D3\u05D4': '\u05D9\u05E9\u05E8\u05D0\u05DC', '\u05E2\u05D3\u05D4': '\u05E1\u05E4\u05E8\u05D3\u05D9', '\u05D1\u05D9\u05EA_\u05DB\u05E0\u05E1\u05EA': '\u05D0\u05D5\u05E8 \u05D4\u05D7\u05D9\u05D9\u05DD', '\u05E8\u05D1_\u05D4\u05E7\u05D4\u05D9\u05DC\u05D4': '\u05D4\u05E8\u05D1 \u05D1\u05E0\u05D9\u05DE\u05D9\u05DF \u05E4\u05D8\u05D9\u05E0\u05D5', '\u05DE\u05E1\u05E4\u05E8_\u05D0\u05D7\u05D9\u05DD': '3', '\u05DE\u05D9\u05E7\u05D5\u05DD_\u05D1\u05DE\u05E9\u05E4\u05D7\u05D4': '2', '\u05D1\u05D9\u05EA_\u05E1\u05E4\u05E8_\u05E7\u05D5\u05D3\u05DD': '', '\u05E9\u05DD_\u05E8\u05D1_\u05DE\u05E4\u05E0\u05D4': '\u05D4\u05E8\u05D1 \u05E9\u05DE\u05D5\u05D0\u05DC \u05D0\u05D5\u05D9\u05E8\u05D1\u05DA', '\u05D4\u05E2\u05E8\u05D5\u05EA': '', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05E8\u05E9\u05DE\u05D4': '2024-09-01', '\u05EA\u05DE\u05D5\u05E0\u05D4': '' },
        { '\u05DE\u05D6\u05D4\u05D4': 7, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D3\u05D5\u05D1\u05D9', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05E4\u05E8\u05D3\u05E1\u05D5\u05DF', '\u05DB\u05D9\u05EA\u05D4': '\u05D0', '\u05D8\u05DC\u05E4\u05D5\u05DF': '054-8461626', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': '2014-11-07', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05E0\u05D7\u05DC \u05D4\u05E7\u05D9\u05E9\u05D5\u05DF 20, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9', '\u05E2\u05D9\u05E8': '\u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' , '\u05ea\u05e2\u05d5\u05d3\u05ea_\u05d6\u05d4\u05d5\u05ea': '339081689', '\u05de\u05d9\u05e7\u05d5\u05d3': '9906200', '\u05d0\u05e8\u05e5_\u05dc\u05d9\u05d3\u05d4': '\u05d0\u05e8\u05d4"\u05d1', '\u05e2\u05d3\u05d4': '\u05d0\u05e9\u05db\u05e0\u05d6\u05d9', '\u05d1\u05d9\u05ea_\u05db\u05e0\u05e1\u05ea': '\u05d1\u05d9\u05ea \u05d9\u05e9\u05e8\u05d0\u05dc', '\u05e8\u05d1_\u05d4\u05e7\u05d4\u05d9\u05dc\u05d4': '\u05d4\u05e8\u05d1 \u05d0\u05d4\u05e8\u05d5\u05df \u05e4\u05e8\u05d3\u05e1\u05d5\u05df', '\u05de\u05e1\u05e4\u05e8_\u05d0\u05d7\u05d9\u05dd': '5', '\u05de\u05d9\u05e7\u05d5\u05dd_\u05d1\u05de\u05e9\u05e4\u05d7\u05d4': '3', '\u05d1\u05d9\u05ea_\u05e1\u05e4\u05e8_\u05e7\u05d5\u05d3\u05dd': '\u05ea"\u05ea \u05ea\u05d5\u05e8\u05ea \u05d0\u05de\u05ea', '\u05e9\u05dd_\u05e8\u05d1_\u05de\u05e4\u05e0\u05d4': '\u05d4\u05e8\u05d1 \u05d2\u05e8\u05e9\u05d5\u05df \u05d0\u05d3\u05dc\u05e9\u05d8\u05d9\u05d9\u05df', '\u05d4\u05e2\u05e8\u05d5\u05ea': '\u05e2\u05d5\u05dc\u05d4 \u05d7\u05d3\u05e9', '\u05ea\u05d0\u05e8\u05d9\u05da_\u05d4\u05e8\u05e9\u05de\u05d4': '2024-10-01', '\u05ea\u05de\u05d5\u05e0\u05d4': '' , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '339081689', '\u05DE\u05D9\u05E7\u05D5\u05D3': '9906200', '\u05D0\u05E8\u05E5_\u05DC\u05D9\u05D3\u05D4': '\u05D0\u05E8\u05D4"\u05D1', '\u05E2\u05D3\u05D4': '\u05D0\u05E9\u05DB\u05E0\u05D6\u05D9', '\u05D1\u05D9\u05EA_\u05DB\u05E0\u05E1\u05EA': '\u05D1\u05D9\u05EA \u05D9\u05E9\u05E8\u05D0\u05DC', '\u05E8\u05D1_\u05D4\u05E7\u05D4\u05D9\u05DC\u05D4': '\u05D4\u05E8\u05D1 \u05D0\u05D4\u05E8\u05D5\u05DF \u05E4\u05E8\u05D3\u05E1\u05D5\u05DF', '\u05DE\u05E1\u05E4\u05E8_\u05D0\u05D7\u05D9\u05DD': '5', '\u05DE\u05D9\u05E7\u05D5\u05DD_\u05D1\u05DE\u05E9\u05E4\u05D7\u05D4': '3', '\u05D1\u05D9\u05EA_\u05E1\u05E4\u05E8_\u05E7\u05D5\u05D3\u05DD': '\u05EA"\u05EA \u05EA\u05D5\u05E8\u05EA \u05D0\u05DE\u05EA', '\u05E9\u05DD_\u05E8\u05D1_\u05DE\u05E4\u05E0\u05D4': '\u05D4\u05E8\u05D1 \u05D2\u05E8\u05E9\u05D5\u05DF \u05D0\u05D3\u05DC\u05E9\u05D8\u05D9\u05D9\u05DF', '\u05D4\u05E2\u05E8\u05D5\u05EA': '\u05E2\u05D5\u05DC\u05D4 \u05D7\u05D3\u05E9', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05E8\u05E9\u05DE\u05D4': '2024-10-01', '\u05EA\u05DE\u05D5\u05E0\u05D4': '' },
        { '\u05DE\u05D6\u05D4\u05D4': 8, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05E4\u05E0\u05D7\u05E1', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05D1\u05E8\u05D5\u05D3\u05D9', '\u05DB\u05D9\u05EA\u05D4': '\u05D1', '\u05D8\u05DC\u05E4\u05D5\u05DF': '052-7684049', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': '2012-10-12', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05D1\u05DF \u05D0\u05D9\u05E9 \u05D7\u05D9 54, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9', '\u05E2\u05D9\u05E8': '\u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' , '\u05ea\u05e2\u05d5\u05d3\u05ea_\u05d6\u05d4\u05d5\u05ea': '336890123', '\u05de\u05d9\u05e7\u05d5\u05d3': '9906100', '\u05d0\u05e8\u05e5_\u05dc\u05d9\u05d3\u05d4': '\u05d9\u05e9\u05e8\u05d0\u05dc', '\u05e2\u05d3\u05d4': '\u05d0\u05e9\u05db\u05e0\u05d6\u05d9', '\u05d1\u05d9\u05ea_\u05db\u05e0\u05e1\u05ea': '\u05d4\u05d9\u05db\u05dc \u05d4\u05ea\u05d5\u05e8\u05d4', '\u05e8\u05d1_\u05d4\u05e7\u05d4\u05d9\u05dc\u05d4': '\u05d4\u05e8\u05d1 \u05d0\u05d1\u05e8\u05d4\u05dd \u05d1\u05e8\u05d5\u05d3\u05d9', '\u05de\u05e1\u05e4\u05e8_\u05d0\u05d7\u05d9\u05dd': '9', '\u05de\u05d9\u05e7\u05d5\u05dd_\u05d1\u05de\u05e9\u05e4\u05d7\u05d4': '6', '\u05d1\u05d9\u05ea_\u05e1\u05e4\u05e8_\u05e7\u05d5\u05d3\u05dd': '\u05ea"\u05ea \u05d1\u05d0\u05e8 \u05d9\u05e2\u05e7\u05d1', '\u05e9\u05dd_\u05e8\u05d1_\u05de\u05e4\u05e0\u05d4': '\u05d4\u05e8\u05d1 \u05d0\u05dc\u05d9\u05d4\u05d5 \u05d3\u05d5\u05e9\u05e0\u05d9\u05e6\u05e8', '\u05d4\u05e2\u05e8\u05d5\u05ea': '', '\u05ea\u05d0\u05e8\u05d9\u05da_\u05d4\u05e8\u05e9\u05de\u05d4': '2024-08-25', '\u05ea\u05de\u05d5\u05e0\u05d4': '' , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '336890123', '\u05DE\u05D9\u05E7\u05D5\u05D3': '9906100', '\u05D0\u05E8\u05E5_\u05DC\u05D9\u05D3\u05D4': '\u05D9\u05E9\u05E8\u05D0\u05DC', '\u05E2\u05D3\u05D4': '\u05D0\u05E9\u05DB\u05E0\u05D6\u05D9', '\u05D1\u05D9\u05EA_\u05DB\u05E0\u05E1\u05EA': '\u05D4\u05D9\u05DB\u05DC \u05D4\u05EA\u05D5\u05E8\u05D4', '\u05E8\u05D1_\u05D4\u05E7\u05D4\u05D9\u05DC\u05D4': '\u05D4\u05E8\u05D1 \u05D0\u05D1\u05E8\u05D4\u05DD \u05D1\u05E8\u05D5\u05D3\u05D9', '\u05DE\u05E1\u05E4\u05E8_\u05D0\u05D7\u05D9\u05DD': '9', '\u05DE\u05D9\u05E7\u05D5\u05DD_\u05D1\u05DE\u05E9\u05E4\u05D7\u05D4': '6', '\u05D1\u05D9\u05EA_\u05E1\u05E4\u05E8_\u05E7\u05D5\u05D3\u05DD': '\u05EA"\u05EA \u05D1\u05D0\u05E8 \u05D9\u05E2\u05E7\u05D1', '\u05E9\u05DD_\u05E8\u05D1_\u05DE\u05E4\u05E0\u05D4': '\u05D4\u05E8\u05D1 \u05D0\u05DC\u05D9\u05D4\u05D5 \u05D3\u05D5\u05E9\u05E0\u05D9\u05E6\u05E8', '\u05D4\u05E2\u05E8\u05D5\u05EA': '', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05E8\u05E9\u05DE\u05D4': '2024-08-25', '\u05EA\u05DE\u05D5\u05E0\u05D4': '' },
        { '\u05DE\u05D6\u05D4\u05D4': 9, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D0\u05E4\u05E8\u05D9\u05DD', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05D2\u05D5\u05DC\u05D3\u05D1\u05E8\u05D2', '\u05DB\u05D9\u05EA\u05D4': '\u05D1', '\u05D8\u05DC\u05E4\u05D5\u05DF': '058-3253242', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': '2013-07-19', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05E0\u05D7\u05DC \u05E8\u05E4\u05D0\u05D9\u05DD 40, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9', '\u05E2\u05D9\u05E8': '\u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' , '\u05ea\u05e2\u05d5\u05d3\u05ea_\u05d6\u05d4\u05d5\u05ea': '335678901', '\u05de\u05d9\u05e7\u05d5\u05d3': '9906300', '\u05d0\u05e8\u05e5_\u05dc\u05d9\u05d3\u05d4': '\u05d9\u05e9\u05e8\u05d0\u05dc', '\u05e2\u05d3\u05d4': '\u05d0\u05e9\u05db\u05e0\u05d6\u05d9', '\u05d1\u05d9\u05ea_\u05db\u05e0\u05e1\u05ea': '\u05d0\u05d4\u05d1\u05ea \u05ea\u05d5\u05e8\u05d4', '\u05e8\u05d1_\u05d4\u05e7\u05d4\u05d9\u05dc\u05d4': '\u05d4\u05e8\u05d1 \u05d0\u05dc\u05d9\u05de\u05dc\u05da \u05d2\u05d5\u05dc\u05d3\u05d1\u05e8\u05d2', '\u05de\u05e1\u05e4\u05e8_\u05d0\u05d7\u05d9\u05dd': '6', '\u05de\u05d9\u05e7\u05d5\u05dd_\u05d1\u05de\u05e9\u05e4\u05d7\u05d4': '4', '\u05d1\u05d9\u05ea_\u05e1\u05e4\u05e8_\u05e7\u05d5\u05d3\u05dd': '\u05ea"\u05ea \u05d7\u05d9\u05d9 \u05de\u05e9\u05d4', '\u05e9\u05dd_\u05e8\u05d1_\u05de\u05e4\u05e0\u05d4': '\u05d4\u05e8\u05d1 \u05e0\u05d9\u05e1\u05d9\u05dd \u05e7\u05e8\u05dc\u05d9\u05e5', '\u05d4\u05e2\u05e8\u05d5\u05ea': '', '\u05ea\u05d0\u05e8\u05d9\u05da_\u05d4\u05e8\u05e9\u05de\u05d4': '2024-09-01', '\u05ea\u05de\u05d5\u05e0\u05d4': '' , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '335678901', '\u05DE\u05D9\u05E7\u05D5\u05D3': '9906300', '\u05D0\u05E8\u05E5_\u05DC\u05D9\u05D3\u05D4': '\u05D9\u05E9\u05E8\u05D0\u05DC', '\u05E2\u05D3\u05D4': '\u05D0\u05E9\u05DB\u05E0\u05D6\u05D9', '\u05D1\u05D9\u05EA_\u05DB\u05E0\u05E1\u05EA': '\u05D0\u05D4\u05D1\u05EA \u05EA\u05D5\u05E8\u05D4', '\u05E8\u05D1_\u05D4\u05E7\u05D4\u05D9\u05DC\u05D4': '\u05D4\u05E8\u05D1 \u05D0\u05DC\u05D9\u05DE\u05DC\u05DA \u05D2\u05D5\u05DC\u05D3\u05D1\u05E8\u05D2', '\u05DE\u05E1\u05E4\u05E8_\u05D0\u05D7\u05D9\u05DD': '6', '\u05DE\u05D9\u05E7\u05D5\u05DD_\u05D1\u05DE\u05E9\u05E4\u05D7\u05D4': '4', '\u05D1\u05D9\u05EA_\u05E1\u05E4\u05E8_\u05E7\u05D5\u05D3\u05DD': '\u05EA"\u05EA \u05D7\u05D9\u05D9 \u05DE\u05E9\u05D4', '\u05E9\u05DD_\u05E8\u05D1_\u05DE\u05E4\u05E0\u05D4': '\u05D4\u05E8\u05D1 \u05E0\u05D9\u05E1\u05D9\u05DD \u05E7\u05E8\u05DC\u05D9\u05E5', '\u05D4\u05E2\u05E8\u05D5\u05EA': '', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05E8\u05E9\u05DE\u05D4': '2024-09-01', '\u05EA\u05DE\u05D5\u05E0\u05D4': '' },
        { '\u05DE\u05D6\u05D4\u05D4': 10, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D9\u05E6\u05D7\u05E7 \u05D0\u05D4\u05E8\u05DF', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05D3\u05D5\u05D9\u05D8\u05E9', '\u05DB\u05D9\u05EA\u05D4': '\u05D1', '\u05D8\u05DC\u05E4\u05D5\u05DF': '050-4192419', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': '2013-05-09', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05E0\u05D7\u05DC \u05E2\u05E8\u05D5\u05D2\u05D5\u05EA 7, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9', '\u05E2\u05D9\u05E8': '\u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' , '\u05ea\u05e2\u05d5\u05d3\u05ea_\u05d6\u05d4\u05d5\u05ea': '335970299', '\u05de\u05d9\u05e7\u05d5\u05d3': '9906100', '\u05d0\u05e8\u05e5_\u05dc\u05d9\u05d3\u05d4': '\u05d9\u05e9\u05e8\u05d0\u05dc', '\u05e2\u05d3\u05d4': '\u05d0\u05e9\u05db\u05e0\u05d6\u05d9', '\u05d1\u05d9\u05ea_\u05db\u05e0\u05e1\u05ea': '\u05e7\u05d4\u05d9\u05dc\u05ea \u05d9\u05e2\u05e7\u05d1', '\u05e8\u05d1_\u05d4\u05e7\u05d4\u05d9\u05dc\u05d4': '\u05d4\u05e8\u05d1 \u05e4\u05e0\u05d7\u05e1 \u05d3\u05d5\u05d9\u05d8\u05e9', '\u05de\u05e1\u05e4\u05e8_\u05d0\u05d7\u05d9\u05dd': '7', '\u05de\u05d9\u05e7\u05d5\u05dd_\u05d1\u05de\u05e9\u05e4\u05d7\u05d4': '2', '\u05d1\u05d9\u05ea_\u05e1\u05e4\u05e8_\u05e7\u05d5\u05d3\u05dd': '\u05ea"\u05ea \u05d0\u05d5\u05e8 \u05d7\u05d3\u05e9', '\u05e9\u05dd_\u05e8\u05d1_\u05de\u05e4\u05e0\u05d4': '\u05d4\u05e8\u05d1 \u05e9\u05dc\u05d5\u05dd \u05db\u05d4\u05df', '\u05d4\u05e2\u05e8\u05d5\u05ea': '', '\u05ea\u05d0\u05e8\u05d9\u05da_\u05d4\u05e8\u05e9\u05de\u05d4': '2024-08-15', '\u05ea\u05de\u05d5\u05e0\u05d4': '' , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '335970299', '\u05DE\u05D9\u05E7\u05D5\u05D3': '9906100', '\u05D0\u05E8\u05E5_\u05DC\u05D9\u05D3\u05D4': '\u05D9\u05E9\u05E8\u05D0\u05DC', '\u05E2\u05D3\u05D4': '\u05D0\u05E9\u05DB\u05E0\u05D6\u05D9', '\u05D1\u05D9\u05EA_\u05DB\u05E0\u05E1\u05EA': '\u05E7\u05D4\u05D9\u05DC\u05EA \u05D9\u05E2\u05E7\u05D1', '\u05E8\u05D1_\u05D4\u05E7\u05D4\u05D9\u05DC\u05D4': '\u05D4\u05E8\u05D1 \u05E4\u05E0\u05D7\u05E1 \u05D3\u05D5\u05D9\u05D8\u05E9', '\u05DE\u05E1\u05E4\u05E8_\u05D0\u05D7\u05D9\u05DD': '7', '\u05DE\u05D9\u05E7\u05D5\u05DD_\u05D1\u05DE\u05E9\u05E4\u05D7\u05D4': '2', '\u05D1\u05D9\u05EA_\u05E1\u05E4\u05E8_\u05E7\u05D5\u05D3\u05DD': '\u05EA"\u05EA \u05D0\u05D5\u05E8 \u05D7\u05D3\u05E9', '\u05E9\u05DD_\u05E8\u05D1_\u05DE\u05E4\u05E0\u05D4': '\u05D4\u05E8\u05D1 \u05E9\u05DC\u05D5\u05DD \u05DB\u05D4\u05DF', '\u05D4\u05E2\u05E8\u05D5\u05EA': '', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05E8\u05E9\u05DE\u05D4': '2024-08-15', '\u05EA\u05DE\u05D5\u05E0\u05D4': '' },
        { '\u05DE\u05D6\u05D4\u05D4': 11, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05E0\u05EA\u05E0\u05D0\u05DC \u05E9\u05DE\u05D7\u05D4', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05D7\u05E4\u05E5', '\u05DB\u05D9\u05EA\u05D4': '\u05D1', '\u05D8\u05DC\u05E4\u05D5\u05DF': '052-7677803', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': '2013-08-18', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05DE\u05E9\u05D4 \u05E8\u05D1\u05E0\u05D5 4, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9', '\u05E2\u05D9\u05E8': '\u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' , '\u05ea\u05e2\u05d5\u05d3\u05ea_\u05d6\u05d4\u05d5\u05ea': '222616609', '\u05de\u05d9\u05e7\u05d5\u05d3': '9906100', '\u05d0\u05e8\u05e5_\u05dc\u05d9\u05d3\u05d4': '\u05d9\u05e9\u05e8\u05d0\u05dc', '\u05e2\u05d3\u05d4': '\u05e1\u05e4\u05e8\u05d3\u05d9', '\u05d1\u05d9\u05ea_\u05db\u05e0\u05e1\u05ea': '\u05e0\u05d4\u05e8 \u05e9\u05dc\u05d5\u05dd', '\u05e8\u05d1_\u05d4\u05e7\u05d4\u05d9\u05dc\u05d4': '\u05d4\u05e8\u05d1 \u05d9\u05d5\u05e1\u05e3 \u05d7\u05e4\u05e5', '\u05de\u05e1\u05e4\u05e8_\u05d0\u05d7\u05d9\u05dd': '4', '\u05de\u05d9\u05e7\u05d5\u05dd_\u05d1\u05de\u05e9\u05e4\u05d7\u05d4': '1', '\u05d1\u05d9\u05ea_\u05e1\u05e4\u05e8_\u05e7\u05d5\u05d3\u05dd': '\u05ea"\u05ea \u05d1\u05df \u05d0\u05d9\u05e9 \u05d7\u05d9', '\u05e9\u05dd_\u05e8\u05d1_\u05de\u05e4\u05e0\u05d4': '\u05d4\u05e8\u05d1 \u05de\u05d0\u05d9\u05e8 \u05de\u05d6\u05d5\u05d6', '\u05d4\u05e2\u05e8\u05d5\u05ea': '\u05de\u05e6\u05d8\u05d9\u05d9\u05df \u05d1\u05dc\u05d9\u05de\u05d5\u05d3\u05d9\u05dd', '\u05ea\u05d0\u05e8\u05d9\u05da_\u05d4\u05e8\u05e9\u05de\u05d4': '2024-09-01', '\u05ea\u05de\u05d5\u05e0\u05d4': '' , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '222616609', '\u05DE\u05D9\u05E7\u05D5\u05D3': '9906100', '\u05D0\u05E8\u05E5_\u05DC\u05D9\u05D3\u05D4': '\u05D9\u05E9\u05E8\u05D0\u05DC', '\u05E2\u05D3\u05D4': '\u05E1\u05E4\u05E8\u05D3\u05D9', '\u05D1\u05D9\u05EA_\u05DB\u05E0\u05E1\u05EA': '\u05E0\u05D4\u05E8 \u05E9\u05DC\u05D5\u05DD', '\u05E8\u05D1_\u05D4\u05E7\u05D4\u05D9\u05DC\u05D4': '\u05D4\u05E8\u05D1 \u05D9\u05D5\u05E1\u05E3 \u05D7\u05E4\u05E5', '\u05DE\u05E1\u05E4\u05E8_\u05D0\u05D7\u05D9\u05DD': '4', '\u05DE\u05D9\u05E7\u05D5\u05DD_\u05D1\u05DE\u05E9\u05E4\u05D7\u05D4': '1', '\u05D1\u05D9\u05EA_\u05E1\u05E4\u05E8_\u05E7\u05D5\u05D3\u05DD': '\u05EA"\u05EA \u05D1\u05DF \u05D0\u05D9\u05E9 \u05D7\u05D9', '\u05E9\u05DD_\u05E8\u05D1_\u05DE\u05E4\u05E0\u05D4': '\u05D4\u05E8\u05D1 \u05DE\u05D0\u05D9\u05E8 \u05DE\u05D6\u05D5\u05D6', '\u05D4\u05E2\u05E8\u05D5\u05EA': '\u05DE\u05E6\u05D8\u05D9\u05D9\u05DF \u05D1\u05DC\u05D9\u05DE\u05D5\u05D3\u05D9\u05DD', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05E8\u05E9\u05DE\u05D4': '2024-09-01', '\u05EA\u05DE\u05D5\u05E0\u05D4': '' },
        { '\u05DE\u05D6\u05D4\u05D4': 12, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D9\u05D5\u05E0\u05EA\u05DF', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05DC\u05D5\u05D9', '\u05DB\u05D9\u05EA\u05D4': '\u05D1', '\u05D8\u05DC\u05E4\u05D5\u05DF': '054-8473561', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': '2012-02-08', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05E0\u05D7\u05DC \u05D0\u05D5\u05E8\u05D9\u05D4 4, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9', '\u05E2\u05D9\u05E8': '\u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' , '\u05ea\u05e2\u05d5\u05d3\u05ea_\u05d6\u05d4\u05d5\u05ea': '220925853', '\u05de\u05d9\u05e7\u05d5\u05d3': '9906200', '\u05d0\u05e8\u05e5_\u05dc\u05d9\u05d3\u05d4': '\u05d9\u05e9\u05e8\u05d0\u05dc', '\u05e2\u05d3\u05d4': '\u05d0\u05e9\u05db\u05e0\u05d6\u05d9', '\u05d1\u05d9\u05ea_\u05db\u05e0\u05e1\u05ea': '\u05d1\u05d9\u05ea \u05de\u05d3\u05e8\u05e9 \u05d2\u05d1\u05d5\u05d4', '\u05e8\u05d1_\u05d4\u05e7\u05d4\u05d9\u05dc\u05d4': '\u05d4\u05e8\u05d1 \u05d7\u05d9\u05d9\u05dd \u05de\u05e9\u05d4 \u05dc\u05d5\u05d9', '\u05de\u05e1\u05e4\u05e8_\u05d0\u05d7\u05d9\u05dd': '5', '\u05de\u05d9\u05e7\u05d5\u05dd_\u05d1\u05de\u05e9\u05e4\u05d7\u05d4': '3', '\u05d1\u05d9\u05ea_\u05e1\u05e4\u05e8_\u05e7\u05d5\u05d3\u05dd': '\u05ea"\u05ea \u05e2\u05e5 \u05d7\u05d9\u05d9\u05dd', '\u05e9\u05dd_\u05e8\u05d1_\u05de\u05e4\u05e0\u05d4': '\u05d4\u05e8\u05d1 \u05d1\u05e8\u05d5\u05da \u05de\u05e8\u05d3\u05db\u05d9 \u05d0\u05d6\u05e8\u05d7\u05d9', '\u05d4\u05e2\u05e8\u05d5\u05ea': '', '\u05ea\u05d0\u05e8\u05d9\u05da_\u05d4\u05e8\u05e9\u05de\u05d4': '2024-08-20', '\u05ea\u05de\u05d5\u05e0\u05d4': '' , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '220925853', '\u05DE\u05D9\u05E7\u05D5\u05D3': '9906200', '\u05D0\u05E8\u05E5_\u05DC\u05D9\u05D3\u05D4': '\u05D9\u05E9\u05E8\u05D0\u05DC', '\u05E2\u05D3\u05D4': '\u05D0\u05E9\u05DB\u05E0\u05D6\u05D9', '\u05D1\u05D9\u05EA_\u05DB\u05E0\u05E1\u05EA': '\u05D1\u05D9\u05EA \u05DE\u05D3\u05E8\u05E9 \u05D2\u05D1\u05D5\u05D4', '\u05E8\u05D1_\u05D4\u05E7\u05D4\u05D9\u05DC\u05D4': '\u05D4\u05E8\u05D1 \u05D7\u05D9\u05D9\u05DD \u05DE\u05E9\u05D4 \u05DC\u05D5\u05D9', '\u05DE\u05E1\u05E4\u05E8_\u05D0\u05D7\u05D9\u05DD': '5', '\u05DE\u05D9\u05E7\u05D5\u05DD_\u05D1\u05DE\u05E9\u05E4\u05D7\u05D4': '3', '\u05D1\u05D9\u05EA_\u05E1\u05E4\u05E8_\u05E7\u05D5\u05D3\u05DD': '\u05EA"\u05EA \u05E2\u05E5 \u05D7\u05D9\u05D9\u05DD', '\u05E9\u05DD_\u05E8\u05D1_\u05DE\u05E4\u05E0\u05D4': '\u05D4\u05E8\u05D1 \u05D1\u05E8\u05D5\u05DA \u05DE\u05E8\u05D3\u05DB\u05D9 \u05D0\u05D6\u05E8\u05D7\u05D9', '\u05D4\u05E2\u05E8\u05D5\u05EA': '', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05E8\u05E9\u05DE\u05D4': '2024-08-20', '\u05EA\u05DE\u05D5\u05E0\u05D4': '' },
        { '\u05DE\u05D6\u05D4\u05D4': 13, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05E9\u05DE\u05D5\u05D0\u05DC \u05E4\u05E0\u05D7\u05E1', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05DC\u05E1\u05E8', '\u05DB\u05D9\u05EA\u05D4': '\u05D1', '\u05D8\u05DC\u05E4\u05D5\u05DF': '052-7639975', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': '2013-09-28', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05E0\u05D7\u05DC \u05DC\u05D5\u05D6 18, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9', '\u05E2\u05D9\u05E8': '\u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' , '\u05ea\u05e2\u05d5\u05d3\u05ea_\u05d6\u05d4\u05d5\u05ea': '337456789', '\u05de\u05d9\u05e7\u05d5\u05d3': '9906100', '\u05d0\u05e8\u05e5_\u05dc\u05d9\u05d3\u05d4': '\u05d9\u05e9\u05e8\u05d0\u05dc', '\u05e2\u05d3\u05d4': '\u05d0\u05e9\u05db\u05e0\u05d6\u05d9', '\u05d1\u05d9\u05ea_\u05db\u05e0\u05e1\u05ea': '\u05ea\u05e4\u05d0\u05e8\u05ea \u05e6\u05d1\u05d9', '\u05e8\u05d1_\u05d4\u05e7\u05d4\u05d9\u05dc\u05d4': '\u05d4\u05e8\u05d1 \u05d0\u05dc\u05d7\u05e0\u05df \u05dc\u05e1\u05e8', '\u05de\u05e1\u05e4\u05e8_\u05d0\u05d7\u05d9\u05dd': '6', '\u05de\u05d9\u05e7\u05d5\u05dd_\u05d1\u05de\u05e9\u05e4\u05d7\u05d4': '5', '\u05d1\u05d9\u05ea_\u05e1\u05e4\u05e8_\u05e7\u05d5\u05d3\u05dd': '\u05ea"\u05ea \u05d3\u05e8\u05db\u05d9 \u05ea\u05d5\u05e8\u05d4', '\u05e9\u05dd_\u05e8\u05d1_\u05de\u05e4\u05e0\u05d4': '\u05d4\u05e8\u05d1 \u05d0\u05d4\u05e8\u05df \u05dc\u05d9\u05d9\u05d1 \u05e9\u05d8\u05d9\u05d9\u05e0\u05de\u05df', '\u05d4\u05e2\u05e8\u05d5\u05ea': '\u05dc\u05d0 \u05e4\u05e2\u05d9\u05dc \u05d6\u05de\u05e0\u05d9\u05ea', '\u05ea\u05d0\u05e8\u05d9\u05da_\u05d4\u05e8\u05e9\u05de\u05d4': '2024-09-01', '\u05ea\u05de\u05d5\u05e0\u05d4': '' , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '337456789', '\u05DE\u05D9\u05E7\u05D5\u05D3': '9906100', '\u05D0\u05E8\u05E5_\u05DC\u05D9\u05D3\u05D4': '\u05D9\u05E9\u05E8\u05D0\u05DC', '\u05E2\u05D3\u05D4': '\u05D0\u05E9\u05DB\u05E0\u05D6\u05D9', '\u05D1\u05D9\u05EA_\u05DB\u05E0\u05E1\u05EA': '\u05EA\u05E4\u05D0\u05E8\u05EA \u05E6\u05D1\u05D9', '\u05E8\u05D1_\u05D4\u05E7\u05D4\u05D9\u05DC\u05D4': '\u05D4\u05E8\u05D1 \u05D0\u05DC\u05D7\u05E0\u05DF \u05DC\u05E1\u05E8', '\u05DE\u05E1\u05E4\u05E8_\u05D0\u05D7\u05D9\u05DD': '6', '\u05DE\u05D9\u05E7\u05D5\u05DD_\u05D1\u05DE\u05E9\u05E4\u05D7\u05D4': '5', '\u05D1\u05D9\u05EA_\u05E1\u05E4\u05E8_\u05E7\u05D5\u05D3\u05DD': '\u05EA"\u05EA \u05D3\u05E8\u05DB\u05D9 \u05EA\u05D5\u05E8\u05D4', '\u05E9\u05DD_\u05E8\u05D1_\u05DE\u05E4\u05E0\u05D4': '\u05D4\u05E8\u05D1 \u05D0\u05D4\u05E8\u05DF \u05DC\u05D9\u05D9\u05D1 \u05E9\u05D8\u05D9\u05D9\u05E0\u05DE\u05DF', '\u05D4\u05E2\u05E8\u05D5\u05EA': '\u05DC\u05D0 \u05E4\u05E2\u05D9\u05DC \u05D6\u05DE\u05E0\u05D9\u05EA', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05E8\u05E9\u05DE\u05D4': '2024-09-01', '\u05EA\u05DE\u05D5\u05E0\u05D4': '' },
        { '\u05DE\u05D6\u05D4\u05D4': 14, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D9\u05D5\u05E1\u05E3 \u05D0\u05DC\u05E2\u05D6\u05E8', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05E7\u05D3\u05D5\u05E9', '\u05DB\u05D9\u05EA\u05D4': '\u05D1', '\u05D8\u05DC\u05E4\u05D5\u05DF': '052-7687811', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': '2012-12-04', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05D1\u05D9\u05EA \u05D9\u05E9\u05E8\u05D0\u05DC 2, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9', '\u05E2\u05D9\u05E8': '\u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' , '\u05ea\u05e2\u05d5\u05d3\u05ea_\u05d6\u05d4\u05d5\u05ea': '336234567', '\u05de\u05d9\u05e7\u05d5\u05d3': '9906200', '\u05d0\u05e8\u05e5_\u05dc\u05d9\u05d3\u05d4': '\u05d9\u05e9\u05e8\u05d0\u05dc', '\u05e2\u05d3\u05d4': '\u05e1\u05e4\u05e8\u05d3\u05d9', '\u05d1\u05d9\u05ea_\u05db\u05e0\u05e1\u05ea': '\u05d1\u05d9\u05ea \u05d0\u05dc', '\u05e8\u05d1_\u05d4\u05e7\u05d4\u05d9\u05dc\u05d4': '\u05d4\u05e8\u05d1 \u05d9\u05d5\u05e1\u05e3 \u05e7\u05d3\u05d5\u05e9', '\u05de\u05e1\u05e4\u05e8_\u05d0\u05d7\u05d9\u05dd': '3', '\u05de\u05d9\u05e7\u05d5\u05dd_\u05d1\u05de\u05e9\u05e4\u05d7\u05d4': '2', '\u05d1\u05d9\u05ea_\u05e1\u05e4\u05e8_\u05e7\u05d5\u05d3\u05dd': '\u05ea"\u05ea \u05d0\u05d5\u05e8 \u05d9\u05e6\u05d7\u05e7', '\u05e9\u05dd_\u05e8\u05d1_\u05de\u05e4\u05e0\u05d4': '\u05d4\u05e8\u05d1 \u05d9\u05e6\u05d7\u05e7 \u05d9\u05d5\u05e1\u05e3', '\u05d4\u05e2\u05e8\u05d5\u05ea': '', '\u05ea\u05d0\u05e8\u05d9\u05da_\u05d4\u05e8\u05e9\u05de\u05d4': '2024-08-25', '\u05ea\u05de\u05d5\u05e0\u05d4': '' , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '336234567', '\u05DE\u05D9\u05E7\u05D5\u05D3': '9906200', '\u05D0\u05E8\u05E5_\u05DC\u05D9\u05D3\u05D4': '\u05D9\u05E9\u05E8\u05D0\u05DC', '\u05E2\u05D3\u05D4': '\u05E1\u05E4\u05E8\u05D3\u05D9', '\u05D1\u05D9\u05EA_\u05DB\u05E0\u05E1\u05EA': '\u05D1\u05D9\u05EA \u05D0\u05DC', '\u05E8\u05D1_\u05D4\u05E7\u05D4\u05D9\u05DC\u05D4': '\u05D4\u05E8\u05D1 \u05D9\u05D5\u05E1\u05E3 \u05E7\u05D3\u05D5\u05E9', '\u05DE\u05E1\u05E4\u05E8_\u05D0\u05D7\u05D9\u05DD': '3', '\u05DE\u05D9\u05E7\u05D5\u05DD_\u05D1\u05DE\u05E9\u05E4\u05D7\u05D4': '2', '\u05D1\u05D9\u05EA_\u05E1\u05E4\u05E8_\u05E7\u05D5\u05D3\u05DD': '\u05EA"\u05EA \u05D0\u05D5\u05E8 \u05D9\u05E6\u05D7\u05E7', '\u05E9\u05DD_\u05E8\u05D1_\u05DE\u05E4\u05E0\u05D4': '\u05D4\u05E8\u05D1 \u05D9\u05E6\u05D7\u05E7 \u05D9\u05D5\u05E1\u05E3', '\u05D4\u05E2\u05E8\u05D5\u05EA': '', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05E8\u05E9\u05DE\u05D4': '2024-08-25', '\u05EA\u05DE\u05D5\u05E0\u05D4': '' },
        { '\u05DE\u05D6\u05D4\u05D4': 15, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05DE\u05D0\u05D9\u05E8', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05D1\u05E8\u05D7\u05DF', '\u05DB\u05D9\u05EA\u05D4': '\u05D2', '\u05D8\u05DC\u05E4\u05D5\u05DF': '052-7603939', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': '2012-03-16', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05E8\u05D1 \u05D7\u05E0\u05D9\u05E0\u05D0 21, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9', '\u05E2\u05D9\u05E8': '\u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' , '\u05ea\u05e2\u05d5\u05d3\u05ea_\u05d6\u05d4\u05d5\u05ea': '335012345', '\u05de\u05d9\u05e7\u05d5\u05d3': '9906300', '\u05d0\u05e8\u05e5_\u05dc\u05d9\u05d3\u05d4': '\u05d9\u05e9\u05e8\u05d0\u05dc', '\u05e2\u05d3\u05d4': '\u05d0\u05e9\u05db\u05e0\u05d6\u05d9', '\u05d1\u05d9\u05ea_\u05db\u05e0\u05e1\u05ea': '\u05d0\u05d5\u05e8 \u05d0\u05dc\u05d9\u05d4\u05d5', '\u05e8\u05d1_\u05d4\u05e7\u05d4\u05d9\u05dc\u05d4': '\u05d4\u05e8\u05d1 \u05d4\u05dc\u05dc \u05d1\u05e8\u05d7\u05df', '\u05de\u05e1\u05e4\u05e8_\u05d0\u05d7\u05d9\u05dd': '8', '\u05de\u05d9\u05e7\u05d5\u05dd_\u05d1\u05de\u05e9\u05e4\u05d7\u05d4': '1', '\u05d1\u05d9\u05ea_\u05e1\u05e4\u05e8_\u05e7\u05d5\u05d3\u05dd': '\u05ea"\u05ea \u05d7\u05db\u05de\u05ea \u05e9\u05dc\u05de\u05d4', '\u05e9\u05dd_\u05e8\u05d1_\u05de\u05e4\u05e0\u05d4': '\u05d4\u05e8\u05d1 \u05d3\u05d5\u05d3 \u05d0\u05d1\u05d5\u05d7\u05e6\u05d9\u05e8\u05d0', '\u05d4\u05e2\u05e8\u05d5\u05ea': '', '\u05ea\u05d0\u05e8\u05d9\u05da_\u05d4\u05e8\u05e9\u05de\u05d4': '2024-09-01', '\u05ea\u05de\u05d5\u05e0\u05d4': '' , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '335012345', '\u05DE\u05D9\u05E7\u05D5\u05D3': '9906300', '\u05D0\u05E8\u05E5_\u05DC\u05D9\u05D3\u05D4': '\u05D9\u05E9\u05E8\u05D0\u05DC', '\u05E2\u05D3\u05D4': '\u05D0\u05E9\u05DB\u05E0\u05D6\u05D9', '\u05D1\u05D9\u05EA_\u05DB\u05E0\u05E1\u05EA': '\u05D0\u05D5\u05E8 \u05D0\u05DC\u05D9\u05D4\u05D5', '\u05E8\u05D1_\u05D4\u05E7\u05D4\u05D9\u05DC\u05D4': '\u05D4\u05E8\u05D1 \u05D4\u05DC\u05DC \u05D1\u05E8\u05D7\u05DF', '\u05DE\u05E1\u05E4\u05E8_\u05D0\u05D7\u05D9\u05DD': '8', '\u05DE\u05D9\u05E7\u05D5\u05DD_\u05D1\u05DE\u05E9\u05E4\u05D7\u05D4': '1', '\u05D1\u05D9\u05EA_\u05E1\u05E4\u05E8_\u05E7\u05D5\u05D3\u05DD': '\u05EA"\u05EA \u05D7\u05DB\u05DE\u05EA \u05E9\u05DC\u05DE\u05D4', '\u05E9\u05DD_\u05E8\u05D1_\u05DE\u05E4\u05E0\u05D4': '\u05D4\u05E8\u05D1 \u05D3\u05D5\u05D3 \u05D0\u05D1\u05D5\u05D7\u05E6\u05D9\u05E8\u05D0', '\u05D4\u05E2\u05E8\u05D5\u05EA': '', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05E8\u05E9\u05DE\u05D4': '2024-09-01', '\u05EA\u05DE\u05D5\u05E0\u05D4': '' },
        { '\u05DE\u05D6\u05D4\u05D4': 16, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D0\u05D1\u05E8\u05D4\u05DD \u05D9\u05E9\u05E2\u05D9\u05D4', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05DC\u05D5\u05D9\u05E1\u05D5\u05DF', '\u05DB\u05D9\u05EA\u05D4': '\u05D2', '\u05D8\u05DC\u05E4\u05D5\u05DF': '054-6304152', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': '2012-09-11', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05E9\u05D3\u05E8\u05D5\u05EA \u05D4\u05D0\u05DE\u05D5\u05E8\u05D0\u05D9\u05DD 53, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9', '\u05E2\u05D9\u05E8': '\u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' , '\u05ea\u05e2\u05d5\u05d3\u05ea_\u05d6\u05d4\u05d5\u05ea': '336120076', '\u05de\u05d9\u05e7\u05d5\u05d3': '9906100', '\u05d0\u05e8\u05e5_\u05dc\u05d9\u05d3\u05d4': '\u05d3\u05e8\u05d5\u05dd \u05d0\u05e4\u05e8\u05d9\u05e7\u05d4', '\u05e2\u05d3\u05d4': '\u05d0\u05e9\u05db\u05e0\u05d6\u05d9', '\u05d1\u05d9\u05ea_\u05db\u05e0\u05e1\u05ea': '\u05e9\u05e2\u05e8\u05d9 \u05ea\u05d5\u05e8\u05d4', '\u05e8\u05d1_\u05d4\u05e7\u05d4\u05d9\u05dc\u05d4': '\u05d4\u05e8\u05d1 \u05e9\u05de\u05d5\u05d0\u05dc \u05dc\u05d5\u05d9\u05e1\u05d5\u05df', '\u05de\u05e1\u05e4\u05e8_\u05d0\u05d7\u05d9\u05dd': '4', '\u05de\u05d9\u05e7\u05d5\u05dd_\u05d1\u05de\u05e9\u05e4\u05d7\u05d4': '2', '\u05d1\u05d9\u05ea_\u05e1\u05e4\u05e8_\u05e7\u05d5\u05d3\u05dd': '\u05ea"\u05ea \u05ea\u05d5\u05e8\u05ea \u05d7\u05d9\u05d9\u05dd', '\u05e9\u05dd_\u05e8\u05d1_\u05de\u05e4\u05e0\u05d4': '\u05d4\u05e8\u05d1 \u05de\u05d0\u05d9\u05e8 \u05e6\u05d1\u05d9 \u05d1\u05e8\u05d2\u05de\u05df', '\u05d4\u05e2\u05e8\u05d5\u05ea': '\u05e2\u05d5\u05dc\u05d4 \u05d7\u05d3\u05e9 - \u05d3\u05e8\u05d5\u05dd \u05d0\u05e4\u05e8\u05d9\u05e7\u05d4', '\u05ea\u05d0\u05e8\u05d9\u05da_\u05d4\u05e8\u05e9\u05de\u05d4': '2024-10-15', '\u05ea\u05de\u05d5\u05e0\u05d4': '' , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '336120076', '\u05DE\u05D9\u05E7\u05D5\u05D3': '9906100', '\u05D0\u05E8\u05E5_\u05DC\u05D9\u05D3\u05D4': '\u05D3\u05E8\u05D5\u05DD \u05D0\u05E4\u05E8\u05D9\u05E7\u05D4', '\u05E2\u05D3\u05D4': '\u05D0\u05E9\u05DB\u05E0\u05D6\u05D9', '\u05D1\u05D9\u05EA_\u05DB\u05E0\u05E1\u05EA': '\u05E9\u05E2\u05E8\u05D9 \u05EA\u05D5\u05E8\u05D4', '\u05E8\u05D1_\u05D4\u05E7\u05D4\u05D9\u05DC\u05D4': '\u05D4\u05E8\u05D1 \u05E9\u05DE\u05D5\u05D0\u05DC \u05DC\u05D5\u05D9\u05E1\u05D5\u05DF', '\u05DE\u05E1\u05E4\u05E8_\u05D0\u05D7\u05D9\u05DD': '4', '\u05DE\u05D9\u05E7\u05D5\u05DD_\u05D1\u05DE\u05E9\u05E4\u05D7\u05D4': '2', '\u05D1\u05D9\u05EA_\u05E1\u05E4\u05E8_\u05E7\u05D5\u05D3\u05DD': '\u05EA"\u05EA \u05EA\u05D5\u05E8\u05EA \u05D7\u05D9\u05D9\u05DD', '\u05E9\u05DD_\u05E8\u05D1_\u05DE\u05E4\u05E0\u05D4': '\u05D4\u05E8\u05D1 \u05DE\u05D0\u05D9\u05E8 \u05E6\u05D1\u05D9 \u05D1\u05E8\u05D2\u05DE\u05DF', '\u05D4\u05E2\u05E8\u05D5\u05EA': '\u05E2\u05D5\u05DC\u05D4 \u05D7\u05D3\u05E9 - \u05D3\u05E8\u05D5\u05DD \u05D0\u05E4\u05E8\u05D9\u05E7\u05D4', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05E8\u05E9\u05DE\u05D4': '2024-10-15', '\u05EA\u05DE\u05D5\u05E0\u05D4': '' },
        { '\u05DE\u05D6\u05D4\u05D4': 17, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D9\u05D5\u05E0\u05EA\u05DF \u05E9\u05DC\u05D5\u05DD', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05E0\u05E4\u05E8\u05E1\u05D8\u05E7', '\u05DB\u05D9\u05EA\u05D4': '\u05D2', '\u05D8\u05DC\u05E4\u05D5\u05DF': '054-8426691', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': '2012-02-28', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05D2\u05E8\u05D5\u05E1\u05DE\u05DF 48, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9', '\u05E2\u05D9\u05E8': '\u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' , '\u05ea\u05e2\u05d5\u05d3\u05ea_\u05d6\u05d4\u05d5\u05ea': '335260766', '\u05de\u05d9\u05e7\u05d5\u05d3': '9906200', '\u05d0\u05e8\u05e5_\u05dc\u05d9\u05d3\u05d4': '\u05d9\u05e9\u05e8\u05d0\u05dc', '\u05e2\u05d3\u05d4': '\u05d0\u05e9\u05db\u05e0\u05d6\u05d9', '\u05d1\u05d9\u05ea_\u05db\u05e0\u05e1\u05ea': '\u05e7\u05d5\u05dc \u05ea\u05d5\u05e8\u05d4', '\u05e8\u05d1_\u05d4\u05e7\u05d4\u05d9\u05dc\u05d4': '\u05d4\u05e8\u05d1 \u05d7\u05d9\u05d9\u05dd \u05e0\u05e4\u05e8\u05e1\u05d8\u05e7', '\u05de\u05e1\u05e4\u05e8_\u05d0\u05d7\u05d9\u05dd': '5', '\u05de\u05d9\u05e7\u05d5\u05dd_\u05d1\u05de\u05e9\u05e4\u05d7\u05d4': '3', '\u05d1\u05d9\u05ea_\u05e1\u05e4\u05e8_\u05e7\u05d5\u05d3\u05dd': '\u05ea"\u05ea \u05d0\u05d4\u05d1\u05ea \u05d9\u05e9\u05e8\u05d0\u05dc', '\u05e9\u05dd_\u05e8\u05d1_\u05de\u05e4\u05e0\u05d4': '\u05d4\u05e8\u05d1 \u05de\u05e9\u05d4 \u05e9\u05d8\u05e8\u05e0\u05d1\u05d5\u05da', '\u05d4\u05e2\u05e8\u05d5\u05ea': '', '\u05ea\u05d0\u05e8\u05d9\u05da_\u05d4\u05e8\u05e9\u05de\u05d4': '2024-08-20', '\u05ea\u05de\u05d5\u05e0\u05d4': '' , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '335260766', '\u05DE\u05D9\u05E7\u05D5\u05D3': '9906200', '\u05D0\u05E8\u05E5_\u05DC\u05D9\u05D3\u05D4': '\u05D9\u05E9\u05E8\u05D0\u05DC', '\u05E2\u05D3\u05D4': '\u05D0\u05E9\u05DB\u05E0\u05D6\u05D9', '\u05D1\u05D9\u05EA_\u05DB\u05E0\u05E1\u05EA': '\u05E7\u05D5\u05DC \u05EA\u05D5\u05E8\u05D4', '\u05E8\u05D1_\u05D4\u05E7\u05D4\u05D9\u05DC\u05D4': '\u05D4\u05E8\u05D1 \u05D7\u05D9\u05D9\u05DD \u05E0\u05E4\u05E8\u05E1\u05D8\u05E7', '\u05DE\u05E1\u05E4\u05E8_\u05D0\u05D7\u05D9\u05DD': '5', '\u05DE\u05D9\u05E7\u05D5\u05DD_\u05D1\u05DE\u05E9\u05E4\u05D7\u05D4': '3', '\u05D1\u05D9\u05EA_\u05E1\u05E4\u05E8_\u05E7\u05D5\u05D3\u05DD': '\u05EA"\u05EA \u05D0\u05D4\u05D1\u05EA \u05D9\u05E9\u05E8\u05D0\u05DC', '\u05E9\u05DD_\u05E8\u05D1_\u05DE\u05E4\u05E0\u05D4': '\u05D4\u05E8\u05D1 \u05DE\u05E9\u05D4 \u05E9\u05D8\u05E8\u05E0\u05D1\u05D5\u05DA', '\u05D4\u05E2\u05E8\u05D5\u05EA': '', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05E8\u05E9\u05DE\u05D4': '2024-08-20', '\u05EA\u05DE\u05D5\u05E0\u05D4': '' },
        { '\u05DE\u05D6\u05D4\u05D4': 18, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D0\u05DC\u05D9\u05E2\u05D6\u05E8', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05D1\u05DC\u05D5\u05D9\u05D0', '\u05DB\u05D9\u05EA\u05D4': '\u05D2', '\u05D8\u05DC\u05E4\u05D5\u05DF': '058-3276456', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': '2011-06-15', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05DE\u05E0\u05D7\u05EA \u05D9\u05E6\u05D7\u05E7 8, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9', '\u05E2\u05D9\u05E8': '\u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' , '\u05ea\u05e2\u05d5\u05d3\u05ea_\u05d6\u05d4\u05d5\u05ea': '334567890', '\u05de\u05d9\u05e7\u05d5\u05d3': '9906100', '\u05d0\u05e8\u05e5_\u05dc\u05d9\u05d3\u05d4': '\u05d9\u05e9\u05e8\u05d0\u05dc', '\u05e2\u05d3\u05d4': '\u05d0\u05e9\u05db\u05e0\u05d6\u05d9', '\u05d1\u05d9\u05ea_\u05db\u05e0\u05e1\u05ea': '\u05de\u05e0\u05d7\u05ea \u05d9\u05e6\u05d7\u05e7', '\u05e8\u05d1_\u05d4\u05e7\u05d4\u05d9\u05dc\u05d4': '\u05d4\u05e8\u05d1 \u05d1\u05dc\u05d5\u05d9\u05d0', '\u05de\u05e1\u05e4\u05e8_\u05d0\u05d7\u05d9\u05dd': '7', '\u05de\u05d9\u05e7\u05d5\u05dd_\u05d1\u05de\u05e9\u05e4\u05d7\u05d4': '6', '\u05d1\u05d9\u05ea_\u05e1\u05e4\u05e8_\u05e7\u05d5\u05d3\u05dd': '\u05ea"\u05ea \u05e9\u05e2\u05e8\u05d9 \u05ea\u05e9\u05d5\u05d1\u05d4', '\u05e9\u05dd_\u05e8\u05d1_\u05de\u05e4\u05e0\u05d4': '\u05d4\u05e8\u05d1 \u05e9\u05de\u05d5\u05d0\u05dc \u05d4\u05dc\u05d5\u05d9 \u05d5\u05d5\u05d0\u05d6\u05e0\u05e8', '\u05d4\u05e2\u05e8\u05d5\u05ea': '', '\u05ea\u05d0\u05e8\u05d9\u05da_\u05d4\u05e8\u05e9\u05de\u05d4': '2024-09-01', '\u05ea\u05de\u05d5\u05e0\u05d4': '' , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '334567890', '\u05DE\u05D9\u05E7\u05D5\u05D3': '9906100', '\u05D0\u05E8\u05E5_\u05DC\u05D9\u05D3\u05D4': '\u05D9\u05E9\u05E8\u05D0\u05DC', '\u05E2\u05D3\u05D4': '\u05D0\u05E9\u05DB\u05E0\u05D6\u05D9', '\u05D1\u05D9\u05EA_\u05DB\u05E0\u05E1\u05EA': '\u05DE\u05E0\u05D7\u05EA \u05D9\u05E6\u05D7\u05E7', '\u05E8\u05D1_\u05D4\u05E7\u05D4\u05D9\u05DC\u05D4': '\u05D4\u05E8\u05D1 \u05D1\u05DC\u05D5\u05D9\u05D0', '\u05DE\u05E1\u05E4\u05E8_\u05D0\u05D7\u05D9\u05DD': '7', '\u05DE\u05D9\u05E7\u05D5\u05DD_\u05D1\u05DE\u05E9\u05E4\u05D7\u05D4': '6', '\u05D1\u05D9\u05EA_\u05E1\u05E4\u05E8_\u05E7\u05D5\u05D3\u05DD': '\u05EA"\u05EA \u05E9\u05E2\u05E8\u05D9 \u05EA\u05E9\u05D5\u05D1\u05D4', '\u05E9\u05DD_\u05E8\u05D1_\u05DE\u05E4\u05E0\u05D4': '\u05D4\u05E8\u05D1 \u05E9\u05DE\u05D5\u05D0\u05DC \u05D4\u05DC\u05D5\u05D9 \u05D5\u05D5\u05D0\u05D6\u05E0\u05E8', '\u05D4\u05E2\u05E8\u05D5\u05EA': '', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05E8\u05E9\u05DE\u05D4': '2024-09-01', '\u05EA\u05DE\u05D5\u05E0\u05D4': '' },
        { '\u05DE\u05D6\u05D4\u05D4': 19, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D7\u05D9\u05D9\u05DD \u05E4\u05D9\u05E0\u05D7\u05E1', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05D1\u05E8\u05D5\u05E7\u05E1', '\u05DB\u05D9\u05EA\u05D4': '\u05D2', '\u05D8\u05DC\u05E4\u05D5\u05DF': '052-7676837', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': '2011-11-22', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05E9\u05D3\u05E8\u05D5\u05EA \u05D4\u05D0\u05DE\u05D5\u05E8\u05D0\u05D9\u05DD 33, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9', '\u05E2\u05D9\u05E8': '\u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' , '\u05ea\u05e2\u05d5\u05d3\u05ea_\u05d6\u05d4\u05d5\u05ea': '335970300', '\u05de\u05d9\u05e7\u05d5\u05d3': '9906300', '\u05d0\u05e8\u05e5_\u05dc\u05d9\u05d3\u05d4': '\u05d0\u05e8\u05d4"\u05d1', '\u05e2\u05d3\u05d4': '\u05d0\u05e9\u05db\u05e0\u05d6\u05d9', '\u05d1\u05d9\u05ea_\u05db\u05e0\u05e1\u05ea': '\u05d1\u05d9\u05ea \u05d7\u05d9\u05d9\u05dd', '\u05e8\u05d1_\u05d4\u05e7\u05d4\u05d9\u05dc\u05d4': '\u05d4\u05e8\u05d1 \u05d1\u05e8\u05d5\u05e7\u05e1', '\u05de\u05e1\u05e4\u05e8_\u05d0\u05d7\u05d9\u05dd': '6', '\u05de\u05d9\u05e7\u05d5\u05dd_\u05d1\u05de\u05e9\u05e4\u05d7\u05d4': '4', '\u05d1\u05d9\u05ea_\u05e1\u05e4\u05e8_\u05e7\u05d5\u05d3\u05dd': '\u05ea"\u05ea \u05de\u05e9\u05db\u05df \u05d9\u05e6\u05d7\u05e7', '\u05e9\u05dd_\u05e8\u05d1_\u05de\u05e4\u05e0\u05d4': '\u05d4\u05e8\u05d1 \u05e8\u05d0\u05d5\u05d1\u05df \u05e4\u05d9\u05d9\u05e0\u05e9\u05d8\u05d9\u05d9\u05df', '\u05d4\u05e2\u05e8\u05d5\u05ea': '\u05e2\u05d5\u05dc\u05d4 \u05d7\u05d3\u05e9', '\u05ea\u05d0\u05e8\u05d9\u05da_\u05d4\u05e8\u05e9\u05de\u05d4': '2024-11-01', '\u05ea\u05de\u05d5\u05e0\u05d4': '' , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '335970300', '\u05DE\u05D9\u05E7\u05D5\u05D3': '9906300', '\u05D0\u05E8\u05E5_\u05DC\u05D9\u05D3\u05D4': '\u05D0\u05E8\u05D4"\u05D1', '\u05E2\u05D3\u05D4': '\u05D0\u05E9\u05DB\u05E0\u05D6\u05D9', '\u05D1\u05D9\u05EA_\u05DB\u05E0\u05E1\u05EA': '\u05D1\u05D9\u05EA \u05D7\u05D9\u05D9\u05DD', '\u05E8\u05D1_\u05D4\u05E7\u05D4\u05D9\u05DC\u05D4': '\u05D4\u05E8\u05D1 \u05D1\u05E8\u05D5\u05E7\u05E1', '\u05DE\u05E1\u05E4\u05E8_\u05D0\u05D7\u05D9\u05DD': '6', '\u05DE\u05D9\u05E7\u05D5\u05DD_\u05D1\u05DE\u05E9\u05E4\u05D7\u05D4': '4', '\u05D1\u05D9\u05EA_\u05E1\u05E4\u05E8_\u05E7\u05D5\u05D3\u05DD': '\u05EA"\u05EA \u05DE\u05E9\u05DB\u05DF \u05D9\u05E6\u05D7\u05E7', '\u05E9\u05DD_\u05E8\u05D1_\u05DE\u05E4\u05E0\u05D4': '\u05D4\u05E8\u05D1 \u05E8\u05D0\u05D5\u05D1\u05DF \u05E4\u05D9\u05D9\u05E0\u05E9\u05D8\u05D9\u05D9\u05DF', '\u05D4\u05E2\u05E8\u05D5\u05EA': '\u05E2\u05D5\u05DC\u05D4 \u05D7\u05D3\u05E9', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05E8\u05E9\u05DE\u05D4': '2024-11-01', '\u05EA\u05DE\u05D5\u05E0\u05D4': '' },
        { '\u05DE\u05D6\u05D4\u05D4': 20, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D9\u05D4\u05D5\u05D3\u05D4', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05E4\u05D3\u05E8', '\u05DB\u05D9\u05EA\u05D4': '\u05D2', '\u05D8\u05DC\u05E4\u05D5\u05DF': '054-2255398', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': '2011-04-10', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05E0\u05D7\u05DC \u05DE\u05D9\u05DB\u05D4 5, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9', '\u05E2\u05D9\u05E8': '\u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' , '\u05ea\u05e2\u05d5\u05d3\u05ea_\u05d6\u05d4\u05d5\u05ea': '333456789', '\u05de\u05d9\u05e7\u05d5\u05d3': '9906100', '\u05d0\u05e8\u05e5_\u05dc\u05d9\u05d3\u05d4': '\u05d9\u05e9\u05e8\u05d0\u05dc', '\u05e2\u05d3\u05d4': '\u05e1\u05e4\u05e8\u05d3\u05d9', '\u05d1\u05d9\u05ea_\u05db\u05e0\u05e1\u05ea': '\u05d0\u05d5\u05e8 \u05d9\u05d4\u05d5\u05d3\u05d4', '\u05e8\u05d1_\u05d4\u05e7\u05d4\u05d9\u05dc\u05d4': '\u05d4\u05e8\u05d1 \u05e4\u05d3\u05e8', '\u05de\u05e1\u05e4\u05e8_\u05d0\u05d7\u05d9\u05dd': '5', '\u05de\u05d9\u05e7\u05d5\u05dd_\u05d1\u05de\u05e9\u05e4\u05d7\u05d4': '2', '\u05d1\u05d9\u05ea_\u05e1\u05e4\u05e8_\u05e7\u05d5\u05d3\u05dd': '\u05ea"\u05ea \u05e0\u05ea\u05d9\u05d1 \u05d4\u05ea\u05d5\u05e8\u05d4', '\u05e9\u05dd_\u05e8\u05d1_\u05de\u05e4\u05e0\u05d4': '\u05d4\u05e8\u05d1 \u05d1\u05df \u05e6\u05d9\u05d5\u05df \u05de\u05d5\u05e6\u05e4\u05d9', '\u05d4\u05e2\u05e8\u05d5\u05ea': '', '\u05ea\u05d0\u05e8\u05d9\u05da_\u05d4\u05e8\u05e9\u05de\u05d4': '2024-09-01', '\u05ea\u05de\u05d5\u05e0\u05d4': '' , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '333456789', '\u05DE\u05D9\u05E7\u05D5\u05D3': '9906100', '\u05D0\u05E8\u05E5_\u05DC\u05D9\u05D3\u05D4': '\u05D9\u05E9\u05E8\u05D0\u05DC', '\u05E2\u05D3\u05D4': '\u05E1\u05E4\u05E8\u05D3\u05D9', '\u05D1\u05D9\u05EA_\u05DB\u05E0\u05E1\u05EA': '\u05D0\u05D5\u05E8 \u05D9\u05D4\u05D5\u05D3\u05D4', '\u05E8\u05D1_\u05D4\u05E7\u05D4\u05D9\u05DC\u05D4': '\u05D4\u05E8\u05D1 \u05E4\u05D3\u05E8', '\u05DE\u05E1\u05E4\u05E8_\u05D0\u05D7\u05D9\u05DD': '5', '\u05DE\u05D9\u05E7\u05D5\u05DD_\u05D1\u05DE\u05E9\u05E4\u05D7\u05D4': '2', '\u05D1\u05D9\u05EA_\u05E1\u05E4\u05E8_\u05E7\u05D5\u05D3\u05DD': '\u05EA"\u05EA \u05E0\u05EA\u05D9\u05D1 \u05D4\u05EA\u05D5\u05E8\u05D4', '\u05E9\u05DD_\u05E8\u05D1_\u05DE\u05E4\u05E0\u05D4': '\u05D4\u05E8\u05D1 \u05D1\u05DF \u05E6\u05D9\u05D5\u05DF \u05DE\u05D5\u05E6\u05E4\u05D9', '\u05D4\u05E2\u05E8\u05D5\u05EA': '', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05E8\u05E9\u05DE\u05D4': '2024-09-01', '\u05EA\u05DE\u05D5\u05E0\u05D4': '' }
      ],
      /* ===== STAFF (6 members) ===== */
      '\u05E6\u05D5\u05D5\u05EA': [
        { '\u05DE\u05D6\u05D4\u05D4': 1, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D4\u05E8\u05D1 \u05D0\u05DC\u05D9\u05DE\u05DC\u05DA', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05D9\u05E8\u05D5\u05E9\u05DC\u05DE\u05D9', '\u05EA\u05E4\u05E7\u05D9\u05D3': '\u05E8\u05D0\u05E9 \u05D9\u05E9\u05D9\u05D1\u05D4', '\u05D8\u05DC\u05E4\u05D5\u05DF': '052-7688872', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05D7\u05D2\u05D9 \u05D4\u05E0\u05D1\u05D9\u05D0 7, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '012340001', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05EA\u05D7\u05DC\u05D4': '2018-09-01', '\u05D4\u05E9\u05DB\u05DC\u05D4': '\u05E1\u05DE\u05D9\u05DB\u05D4 \u05DC\u05E8\u05D1\u05E0\u05D5\u05EA', '\u05E9\u05DB\u05E8': '12000', '\u05D7\u05E9\u05D1\u05D5\u05DF_\u05D1\u05E0\u05E7': '\u05D4\u05E4\u05D5\u05E2\u05DC\u05D9\u05DD' },
        { '\u05DE\u05D6\u05D4\u05D4': 2, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D4\u05E8\u05D1 \u05DE\u05E0\u05D7\u05DD', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05DB\u05D4\u05DF', '\u05EA\u05E4\u05E7\u05D9\u05D3': '\u05DE\u05DC\u05DE\u05D3 \u05DB\u05D9\u05EA\u05D4 \u05D0', '\u05D8\u05DC\u05E4\u05D5\u05DF': '053-3101233', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05E0\u05D7\u05DC \u05E2\u05E8\u05D5\u05D2\u05D5\u05EA 12, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '012340002', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05EA\u05D7\u05DC\u05D4': '2020-09-01', '\u05D4\u05E9\u05DB\u05DC\u05D4': '\u05EA\u05E2\u05D5\u05D3\u05EA \u05D4\u05D5\u05E8\u05D0\u05D4', '\u05E9\u05DB\u05E8': '8500', '\u05D7\u05E9\u05D1\u05D5\u05DF_\u05D1\u05E0\u05E7': '\u05DC\u05D0\u05D5\u05DE\u05D9' },
        { '\u05DE\u05D6\u05D4\u05D4': 3, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D4\u05E8\u05D1 \u05D3\u05D5\u05D3', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05D2\u05D5\u05DC\u05D3\u05E9\u05D8\u05D9\u05D9\u05DF', '\u05EA\u05E4\u05E7\u05D9\u05D3': '\u05DE\u05DC\u05DE\u05D3 \u05DB\u05D9\u05EA\u05D4 \u05D1', '\u05D8\u05DC\u05E4\u05D5\u05DF': '054-8457533', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05E0\u05D7\u05DC \u05E7\u05D9\u05E9\u05D5\u05DF 9, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '012340003', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05EA\u05D7\u05DC\u05D4': '2021-09-01', '\u05D4\u05E9\u05DB\u05DC\u05D4': '\u05EA\u05E2\u05D5\u05D3\u05EA \u05D4\u05D5\u05E8\u05D0\u05D4', '\u05E9\u05DB\u05E8': '8500', '\u05D7\u05E9\u05D1\u05D5\u05DF_\u05D1\u05E0\u05E7': '\u05DE\u05D6\u05E8\u05D7\u05D9' },
        { '\u05DE\u05D6\u05D4\u05D4': 4, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D4\u05E8\u05D1 \u05D9\u05E2\u05E7\u05D1', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05E9\u05E4\u05D9\u05E8\u05D0', '\u05EA\u05E4\u05E7\u05D9\u05D3': '\u05DE\u05DC\u05DE\u05D3 \u05DB\u05D9\u05EA\u05D4 \u05D2', '\u05D8\u05DC\u05E4\u05D5\u05DF': '052-7148053', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05E8\u05D1\u05D9 \u05D9\u05E6\u05D7\u05E7 \u05E0\u05E4\u05D7\u05D0 24, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '012340004', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05EA\u05D7\u05DC\u05D4': '2019-09-01', '\u05D4\u05E9\u05DB\u05DC\u05D4': '\u05E1\u05DE\u05D9\u05DB\u05D4 \u05DC\u05E8\u05D1\u05E0\u05D5\u05EA', '\u05E9\u05DB\u05E8': '9000', '\u05D7\u05E9\u05D1\u05D5\u05DF_\u05D1\u05E0\u05E7': '\u05D3\u05D9\u05E1\u05E7\u05D5\u05E0\u05D8' },
        { '\u05DE\u05D6\u05D4\u05D4': 5, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D9\u05D5\u05E1\u05E3', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05E9\u05E0\u05D9\u05D9\u05D3\u05E8', '\u05EA\u05E4\u05E7\u05D9\u05D3': '\u05DE\u05D6\u05DB\u05D9\u05E8\u05D5\u05EA', '\u05D8\u05DC\u05E4\u05D5\u05DF': '052-7688871', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05D7\u05D2\u05D9 \u05D4\u05E0\u05D1\u05D9\u05D0 7, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '012340005', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05EA\u05D7\u05DC\u05D4': '2022-01-01', '\u05D4\u05E9\u05DB\u05DC\u05D4': '\u05D4\u05E0\u05D3\u05E1\u05D0\u05D9 \u05DE\u05D7\u05E9\u05D1\u05D9\u05DD', '\u05E9\u05DB\u05E8': '7500', '\u05D7\u05E9\u05D1\u05D5\u05DF_\u05D1\u05E0\u05E7': '\u05D4\u05E4\u05D5\u05E2\u05DC\u05D9\u05DD' },
        { '\u05DE\u05D6\u05D4\u05D4': 6, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05E4\u05E8\u05D9\u05D9\u05DE\u05E8\u05E7', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '', '\u05EA\u05E4\u05E7\u05D9\u05D3': '\u05D8\u05D1\u05D7', '\u05D8\u05DC\u05E4\u05D5\u05DF': '058-4000112', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '012340006', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05EA\u05D7\u05DC\u05D4': '2023-09-01', '\u05D4\u05E9\u05DB\u05DC\u05D4': '\u05EA\u05E2\u05D5\u05D3\u05EA \u05D8\u05D1\u05D7', '\u05E9\u05DB\u05E8': '6000', '\u05D7\u05E9\u05D1\u05D5\u05DF_\u05D1\u05E0\u05E7': '\u05D4\u05E4\u05D5\u05E2\u05DC\u05D9\u05DD' },
        { '\u05DE\u05D6\u05D4\u05D4': 7, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05E4\u05E8\u05D9\u05D3\u05DE\u05DF', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '', '\u05EA\u05E4\u05E7\u05D9\u05D3': '\u05DE\u05D8\u05E4\u05DC', '\u05D8\u05DC\u05E4\u05D5\u05DF': '052-6667788', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '012340007', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05EA\u05D7\u05DC\u05D4': '2023-09-01', '\u05D4\u05E9\u05DB\u05DC\u05D4': '\u05EA\u05E2\u05D5\u05D3\u05EA \u05D8\u05D9\u05E4\u05D5\u05DC', '\u05E9\u05DB\u05E8': '5500', '\u05D7\u05E9\u05D1\u05D5\u05DF_\u05D1\u05E0\u05E7': '\u05DC\u05D0\u05D5\u05DE\u05D9' },
        { '\u05DE\u05D6\u05D4\u05D4': 8, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D4\u05E8\u05D1', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05D9\u05E8\u05D5\u05E9\u05DC\u05DE\u05D9', '\u05EA\u05E4\u05E7\u05D9\u05D3': '\u05DE\u05E9\u05D2\u05D9\u05D7', '\u05D8\u05DC\u05E4\u05D5\u05DF': '058-8990011', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '012340008', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05EA\u05D7\u05DC\u05D4': '2019-09-01', '\u05D4\u05E9\u05DB\u05DC\u05D4': '\u05E1\u05DE\u05D9\u05DB\u05D4 \u05DC\u05E8\u05D1\u05E0\u05D5\u05EA', '\u05E9\u05DB\u05E8': '7000', '\u05D7\u05E9\u05D1\u05D5\u05DF_\u05D1\u05E0\u05E7': '\u05DE\u05D6\u05E8\u05D7\u05D9' }
      ],
      /* ===== PARENTS (12 records) ===== */
      '\u05D4\u05D5\u05E8\u05D9\u05DD': [
        { '\u05DE\u05D6\u05D4\u05D4': 1, '\u05E9\u05DD': '\u05D9\u05D5\u05E1\u05E3 \u05D7\u05D9\u05D9\u05DD \u05D9\u05D0\u05D9\u05E8', '\u05D8\u05DC\u05E4\u05D5\u05DF': '052-7123673', '\u05E7\u05E9\u05E8': '\u05D0\u05D1 \u05E9\u05DC \u05D0\u05DC\u05E2\u05D6\u05E8', '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 1 , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '012345678', '\u05DE\u05E7\u05D5\u05DD_\u05E2\u05D1\u05D5\u05D3\u05D4': '\u05DB\u05D5\u05DC\u05DC \u05D0\u05D5\u05E8 \u05D7\u05D3\u05E9', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05E8\u05D9\u05E9 \u05DC\u05E7\u05D9\u05E9 16, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' },
        { '\u05DE\u05D6\u05D4\u05D4': 2, '\u05E9\u05DD': '\u05DE\u05E0\u05D3\u05D9 \u05DB\u05E5', '\u05D8\u05DC\u05E4\u05D5\u05DF': '058-6111253', '\u05E7\u05E9\u05E8': '\u05D0\u05D1 \u05E9\u05DC \u05D4\u05DC\u05DC', '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 2 , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '023456789', '\u05DE\u05E7\u05D5\u05DD_\u05E2\u05D1\u05D5\u05D3\u05D4': '\u05E2\u05E6\u05DE\u05D0\u05D9 - \u05D7\u05E9\u05DE\u05DC\u05D0\u05D9', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05DE\u05E8\u05D9\u05DD \u05D4\u05E0\u05D1\u05D9\u05D0\u05D4 11, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' },
        { '\u05DE\u05D6\u05D4\u05D4': 3, '\u05E9\u05DD': '\u05D6\u05D0\u05D1 \u05DC\u05D9\u05D9\u05D1\u05DC\u05E8', '\u05D8\u05DC\u05E4\u05D5\u05DF': '052-7131377', '\u05E7\u05E9\u05E8': '\u05D0\u05D1 \u05E9\u05DC \u05E9\u05DC\u05DE\u05D4 \u05D9\u05D4\u05D5\u05D3\u05D4', '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 3 , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '034567890', '\u05DE\u05E7\u05D5\u05DD_\u05E2\u05D1\u05D5\u05D3\u05D4': '\u05DB\u05D5\u05DC\u05DC \u05D1\u05E0\u05D9 \u05EA\u05D5\u05E8\u05D4', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05E0\u05D7\u05DC \u05E9\u05D7\u05DD 3, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' },
        { '\u05DE\u05D6\u05D4\u05D4': 4, '\u05E9\u05DD': '\u05DE\u05E0\u05D7\u05DD \u05E1\u05D9\u05D2\u05DC', '\u05D8\u05DC\u05E4\u05D5\u05DF': '058-3202085', '\u05E7\u05E9\u05E8': '\u05D0\u05D1 \u05E9\u05DC \u05D9\u05D4\u05D5\u05D3\u05D4 \u05E6\u05D1\u05D9', '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 4 , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '045678901', '\u05DE\u05E7\u05D5\u05DD_\u05E2\u05D1\u05D5\u05D3\u05D4': '\u05DE\u05D5\u05E8\u05D4 \u05D1\u05D9\u05E9\u05D9\u05D1\u05D4', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05D0\u05DC\u05D9\u05E9\u05E2 \u05D4\u05E0\u05D1\u05D9\u05D0 7, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' },
        { '\u05DE\u05D6\u05D4\u05D4': 5, '\u05E9\u05DD': '\u05D7\u05E0\u05D5\u05DA \u05E1\u05E0\u05D4\u05D3\u05E8\u05D0\u05D9', '\u05D8\u05DC\u05E4\u05D5\u05DF': '052-7618781', '\u05E7\u05E9\u05E8': '\u05D0\u05D1 \u05E9\u05DC \u05DE\u05E0\u05D7\u05DD', '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 5 , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '056789012', '\u05DE\u05E7\u05D5\u05DD_\u05E2\u05D1\u05D5\u05D3\u05D4': '\u05DB\u05D5\u05DC\u05DC \u05D4\u05DC\u05DB\u05D4 \u05DC\u05DE\u05E2\u05E9\u05D4', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05E0\u05D7\u05DC \u05E9\u05DE\u05E9\u05D5\u05DF 6, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' },
        { '\u05DE\u05D6\u05D4\u05D4': 6, '\u05E9\u05DD': '\u05D1\u05D9\u05E0\u05D9\u05DE\u05D9\u05D5 \u05E4\u05D8\u05D9\u05E0\u05D5', '\u05D8\u05DC\u05E4\u05D5\u05DF': '054-7254914', '\u05E7\u05E9\u05E8': '\u05D0\u05D1 \u05E9\u05DC \u05D1\u05E6\u05DC\u05D0\u05DC', '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 6 , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '067890123', '\u05DE\u05E7\u05D5\u05DD_\u05E2\u05D1\u05D5\u05D3\u05D4': '\u05E2\u05E6\u05DE\u05D0\u05D9 - \u05E1\u05D5\u05D7\u05E8', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05DE\u05E8\u05D9\u05DD \u05D4\u05E0\u05D1\u05D9\u05D0\u05D4 19, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' },
        { '\u05DE\u05D6\u05D4\u05D4': 7, '\u05E9\u05DD': '\u05D0\u05D4\u05E8\u05D5\u05DF \u05E4\u05E8\u05D3\u05E1\u05D5\u05DF', '\u05D8\u05DC\u05E4\u05D5\u05DF': '054-8461626', '\u05E7\u05E9\u05E8': '\u05D0\u05D1 \u05E9\u05DC \u05D3\u05D5\u05D1\u05D9', '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 7 , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '078901234', '\u05DE\u05E7\u05D5\u05DD_\u05E2\u05D1\u05D5\u05D3\u05D4': '\u05E9\u05E3 - \u05DE\u05E1\u05E2\u05D3\u05D4', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05E0\u05D7\u05DC \u05D4\u05E7\u05D9\u05E9\u05D5\u05DF 20, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' },
        { '\u05DE\u05D6\u05D4\u05D4': 8, '\u05E9\u05DD': '\u05D0\u05D1\u05E8\u05D4\u05DD \u05E9\u05DC\u05D5\u05DD \u05D1\u05E8\u05D5\u05D3\u05D9', '\u05D8\u05DC\u05E4\u05D5\u05DF': '052-7684049', '\u05E7\u05E9\u05E8': '\u05D0\u05D1 \u05E9\u05DC \u05E4\u05E0\u05D7\u05E1', '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 8 , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '089012345', '\u05DE\u05E7\u05D5\u05DD_\u05E2\u05D1\u05D5\u05D3\u05D4': '\u05DB\u05D5\u05DC\u05DC \u05D7\u05D6\u05D5\u05DF \u05D0\u05D9\u05E9', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05D1\u05DF \u05D0\u05D9\u05E9 \u05D7\u05D9 54, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' },
        { '\u05DE\u05D6\u05D4\u05D4': 9, '\u05E9\u05DD': '\u05D0\u05DC\u05D9\u05DE\u05DC\u05DA \u05D2\u05D5\u05DC\u05D3\u05D1\u05E8\u05D2', '\u05D8\u05DC\u05E4\u05D5\u05DF': '058-3253242', '\u05E7\u05E9\u05E8': '\u05D0\u05D1 \u05E9\u05DC \u05D0\u05E4\u05E8\u05D9\u05DD', '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 9 , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '090123456', '\u05DE\u05E7\u05D5\u05DD_\u05E2\u05D1\u05D5\u05D3\u05D4': '\u05D4\u05D9\u05D9-\u05D8\u05E7 - \u05DE\u05EA\u05DB\u05E0\u05EA', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05E0\u05D7\u05DC \u05E8\u05E4\u05D0\u05D9\u05DD 40, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' },
        { '\u05DE\u05D6\u05D4\u05D4': 10, '\u05E9\u05DD': '\u05D9\u05D5\u05E1\u05E3 \u05D7\u05E4\u05E5', '\u05D8\u05DC\u05E4\u05D5\u05DF': '052-7677803', '\u05E7\u05E9\u05E8': '\u05D0\u05D1 \u05E9\u05DC \u05E0\u05EA\u05E0\u05D0\u05DC \u05E9\u05DE\u05D7\u05D4', '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 11 , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '101234567', '\u05DE\u05E7\u05D5\u05DD_\u05E2\u05D1\u05D5\u05D3\u05D4': '\u05DB\u05D5\u05DC\u05DC \u05D0\u05D5\u05E8 \u05D4\u05EA\u05D5\u05E8\u05D4', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05DE\u05E9\u05D4 \u05E8\u05D1\u05E0\u05D5 4, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' },
        { '\u05DE\u05D6\u05D4\u05D4': 11, '\u05E9\u05DD': '\u05D4\u05DC\u05DC \u05D1\u05E8\u05D7\u05DF', '\u05D8\u05DC\u05E4\u05D5\u05DF': '052-7620323', '\u05E7\u05E9\u05E8': '\u05D0\u05D1 \u05E9\u05DC \u05DE\u05D0\u05D9\u05E8', '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 15 , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '112345678', '\u05DE\u05E7\u05D5\u05DD_\u05E2\u05D1\u05D5\u05D3\u05D4': '\u05E8\u05D5\u05D0\u05D4 \u05D7\u05E9\u05D1\u05D5\u05DF', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05E8\u05D1 \u05D7\u05E0\u05D9\u05E0\u05D0 21, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' },
        { '\u05DE\u05D6\u05D4\u05D4': 12, '\u05E9\u05DD': '\u05E9\u05DE\u05D5\u05D0\u05DC \u05DC\u05D5\u05D9\u05E1\u05D5\u05DF', '\u05D8\u05DC\u05E4\u05D5\u05DF': '054-6304152', '\u05E7\u05E9\u05E8': '\u05D0\u05D1 \u05E9\u05DC \u05D0\u05D1\u05E8\u05D4\u05DD \u05D9\u05E9\u05E2\u05D9\u05D4', '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 16 , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '123456789', '\u05DE\u05E7\u05D5\u05DD_\u05E2\u05D1\u05D5\u05D3\u05D4': '\u05DE\u05E0\u05D4\u05DC \u05E2\u05DE\u05D5\u05EA\u05D4', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05E9\u05D3\u05E8\u05D5\u05EA \u05D4\u05D0\u05DE\u05D5\u05E8\u05D0\u05D9\u05DD 53, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' },
        { '\u05DE\u05D6\u05D4\u05D4': 13, '\u05E9\u05DD': '\u05D7\u05D9\u05D9\u05DD \u05E0\u05E4\u05E8\u05E1\u05D8\u05E7', '\u05D8\u05DC\u05E4\u05D5\u05DF': '054-8426691', '\u05E7\u05E9\u05E8': '\u05D0\u05D1 \u05E9\u05DC \u05D9\u05D5\u05E0\u05EA\u05DF \u05E9\u05DC\u05D5\u05DD', '\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC': 'a0548426691@gmail.com', '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 17 , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '134567890', '\u05DE\u05E7\u05D5\u05DD_\u05E2\u05D1\u05D5\u05D3\u05D4': '\u05DB\u05D5\u05DC\u05DC \u05D1\u05D9\u05EA \u05D3\u05D5\u05D3', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05D2\u05E8\u05D5\u05E1\u05DE\u05DF 48, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' },
        { '\u05DE\u05D6\u05D4\u05D4': 14, '\u05E9\u05DD': '\u05E4\u05E0\u05D7\u05E1 \u05D3\u05D5\u05D3 \u05D3\u05D5\u05D9\u05D8\u05E9', '\u05D8\u05DC\u05E4\u05D5\u05DF': '050-4192419', '\u05E7\u05E9\u05E8': '\u05D0\u05D1 \u05E9\u05DC \u05D9\u05E6\u05D7\u05E7 \u05D0\u05D4\u05E8\u05DF', '\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC': 'pinideutsch@gmail.com', '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 10 , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '145678901', '\u05DE\u05E7\u05D5\u05DD_\u05E2\u05D1\u05D5\u05D3\u05D4': '\u05DE\u05D5\u05E8\u05D4 \u05E4\u05E8\u05D8\u05D9', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05E0\u05D7\u05DC \u05E2\u05E8\u05D5\u05D2\u05D5\u05EA 7, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' },
        { '\u05DE\u05D6\u05D4\u05D4': 15, '\u05E9\u05DD': '\u05D0\u05DC\u05D7\u05E0\u05DF \u05DC\u05E1\u05E8', '\u05D8\u05DC\u05E4\u05D5\u05DF': '052-7639975', '\u05E7\u05E9\u05E8': '\u05D0\u05D1 \u05E9\u05DC \u05E9\u05DE\u05D5\u05D0\u05DC \u05E4\u05E0\u05D7\u05E1', '\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC': 'L0534182745@gmail.com', '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 13 , '\u05EA\u05E2\u05D5\u05D3\u05EA_\u05D6\u05D4\u05D5\u05EA': '156789012', '\u05DE\u05E7\u05D5\u05DD_\u05E2\u05D1\u05D5\u05D3\u05D4': '\u05DB\u05D5\u05DC\u05DC \u05D7\u05DB\u05DE\u05EA \u05E9\u05DC\u05DE\u05D4', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05E0\u05D7\u05DC \u05DC\u05D5\u05D6 18, \u05D1\u05D9\u05EA \u05E9\u05DE\u05E9' }
      ],
      /* ===== TUITION / FINANCE ===== */
      '\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3': [
        { '\u05DE\u05D6\u05D4\u05D4': 1, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 1, '\u05E9\u05DD': '\u05D0\u05DC\u05E2\u05D6\u05E8 \u05D9\u05D0\u05D9\u05E8', '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05E1\u05DB\u05D5\u05DD': 2400, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E9\u05D5\u05DC\u05DD' },
        { '\u05DE\u05D6\u05D4\u05D4': 2, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 2, '\u05E9\u05DD': '\u05D4\u05DC\u05DC \u05DB\u05E5', '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05E1\u05DB\u05D5\u05DD': 2400, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC' },
        { '\u05DE\u05D6\u05D4\u05D4': 3, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 3, '\u05E9\u05DD': '\u05E9\u05DC\u05DE\u05D4 \u05D9\u05D4\u05D5\u05D3\u05D4 \u05DC\u05D9\u05D9\u05D1\u05DC\u05E8', '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05E1\u05DB\u05D5\u05DD': 2400, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E9\u05D5\u05DC\u05DD' },
        { '\u05DE\u05D6\u05D4\u05D4': 4, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 4, '\u05E9\u05DD': '\u05D9\u05D4\u05D5\u05D3\u05D4 \u05E6\u05D1\u05D9 \u05E1\u05D9\u05D2\u05DC', '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05E1\u05DB\u05D5\u05DD': 2400, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05D7\u05D5\u05D1' },
        { '\u05DE\u05D6\u05D4\u05D4': 5, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 5, '\u05E9\u05DD': '\u05DE\u05E0\u05D7\u05DD \u05E1\u05E0\u05D4\u05D3\u05E8\u05D0\u05D9', '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05E1\u05DB\u05D5\u05DD': 2400, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E9\u05D5\u05DC\u05DD' },
        { '\u05DE\u05D6\u05D4\u05D4': 6, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 6, '\u05E9\u05DD': '\u05D1\u05E6\u05DC\u05D0\u05DC \u05E4\u05D8\u05D9\u05E0\u05D5', '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05E1\u05DB\u05D5\u05DD': 2400, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC' },
        { '\u05DE\u05D6\u05D4\u05D4': 7, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 8, '\u05E9\u05DD': '\u05E4\u05E0\u05D7\u05E1 \u05D1\u05E8\u05D5\u05D3\u05D9', '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05E1\u05DB\u05D5\u05DD': 2400, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC' },
        { '\u05DE\u05D6\u05D4\u05D4': 8, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 9, '\u05E9\u05DD': '\u05D0\u05E4\u05E8\u05D9\u05DD \u05D2\u05D5\u05DC\u05D3\u05D1\u05E8\u05D2', '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05E1\u05DB\u05D5\u05DD': 2400, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05D7\u05D5\u05D1' },
        { '\u05DE\u05D6\u05D4\u05D4': 9, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 10, '\u05E9\u05DD': '\u05D9\u05E6\u05D7\u05E7 \u05D0\u05D4\u05E8\u05DF \u05D3\u05D5\u05D9\u05D8\u05E9', '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05E1\u05DB\u05D5\u05DD': 2400, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E9\u05D5\u05DC\u05DD' },
        { '\u05DE\u05D6\u05D4\u05D4': 10, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 15, '\u05E9\u05DD': '\u05DE\u05D0\u05D9\u05E8 \u05D1\u05E8\u05D7\u05DF', '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05E1\u05DB\u05D5\u05DD': 2400, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E9\u05D5\u05DC\u05DD' },
        { '\u05DE\u05D6\u05D4\u05D4': 11, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 16, '\u05E9\u05DD': '\u05D0\u05D1\u05E8\u05D4\u05DD \u05D9\u05E9\u05E2\u05D9\u05D4 \u05DC\u05D5\u05D9\u05E1\u05D5\u05DF', '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05E1\u05DB\u05D5\u05DD': 2400, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC' },
        { '\u05DE\u05D6\u05D4\u05D4': 12, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 17, '\u05E9\u05DD': '\u05D9\u05D5\u05E0\u05EA\u05DF \u05E9\u05DC\u05D5\u05DD \u05E0\u05E4\u05E8\u05E1\u05D8\u05E7', '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05E1\u05DB\u05D5\u05DD': 2400, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05D7\u05D5\u05D1' },
        { '\u05DE\u05D6\u05D4\u05D4': 13, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 7, '\u05E9\u05DD': '\u05D3\u05D5\u05D1\u05D9 \u05E4\u05E8\u05D3\u05E1\u05D5\u05DF', '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05E1\u05DB\u05D5\u05DD': 2400, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E9\u05D5\u05DC\u05DD' },
        { '\u05DE\u05D6\u05D4\u05D4': 14, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 11, '\u05E9\u05DD': '\u05E0\u05EA\u05E0\u05D0\u05DC \u05E9\u05DE\u05D7\u05D4 \u05D7\u05E4\u05E5', '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05E1\u05DB\u05D5\u05DD': 2400, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC' },
        { '\u05DE\u05D6\u05D4\u05D4': 15, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 12, '\u05E9\u05DD': '\u05D9\u05D5\u05E0\u05EA\u05DF \u05DC\u05D5\u05D9', '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05E1\u05DB\u05D5\u05DD': 2400, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E9\u05D5\u05DC\u05DD' },
        { '\u05DE\u05D6\u05D4\u05D4': 16, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 13, '\u05E9\u05DD': '\u05E9\u05DE\u05D5\u05D0\u05DC \u05E4\u05E0\u05D7\u05E1 \u05DC\u05E1\u05E8', '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05E1\u05DB\u05D5\u05DD': 2400, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05D7\u05D5\u05D1' },
        { '\u05DE\u05D6\u05D4\u05D4': 17, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 14, '\u05E9\u05DD': '\u05D9\u05D5\u05E1\u05E3 \u05D0\u05DC\u05E2\u05D6\u05E8 \u05E7\u05D3\u05D5\u05E9', '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05E1\u05DB\u05D5\u05DD': 2400, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E9\u05D5\u05DC\u05DD' },
        { '\u05DE\u05D6\u05D4\u05D4': 18, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 18, '\u05E9\u05DD': '\u05D0\u05DC\u05D9\u05E2\u05D6\u05E8 \u05D1\u05DC\u05D5\u05D9\u05D0', '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05E1\u05DB\u05D5\u05DD': 2400, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC' },
        { '\u05DE\u05D6\u05D4\u05D4': 19, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 19, '\u05E9\u05DD': '\u05D7\u05D9\u05D9\u05DD \u05E4\u05D9\u05E0\u05D7\u05E1 \u05D1\u05E8\u05D5\u05E7\u05E1', '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05E1\u05DB\u05D5\u05DD': 2400, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05D7\u05D5\u05D1' },
        { '\u05DE\u05D6\u05D4\u05D4': 20, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 20, '\u05E9\u05DD': '\u05D9\u05D4\u05D5\u05D3\u05D4 \u05E4\u05D3\u05E8', '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05E1\u05DB\u05D5\u05DD': 2400, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E9\u05D5\u05DC\u05DD' }
      ],
      /* ===== ATTENDANCE (3 days x 20 students) ===== */
      '\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA': (function(){
        var att=[], id=1, names=[
          [1,'\u05D0\u05DC\u05E2\u05D6\u05E8 \u05D9\u05D0\u05D9\u05E8'],[2,'\u05D4\u05DC\u05DC \u05DB\u05E5'],[3,'\u05E9\u05DC\u05DE\u05D4 \u05D9\u05D4\u05D5\u05D3\u05D4 \u05DC\u05D9\u05D9\u05D1\u05DC\u05E8'],[4,'\u05D9\u05D4\u05D5\u05D3\u05D4 \u05E6\u05D1\u05D9 \u05E1\u05D9\u05D2\u05DC'],[5,'\u05DE\u05E0\u05D7\u05DD \u05E1\u05E0\u05D4\u05D3\u05E8\u05D0\u05D9'],
          [6,'\u05D1\u05E6\u05DC\u05D0\u05DC \u05E4\u05D8\u05D9\u05E0\u05D5'],[7,'\u05D3\u05D5\u05D1\u05D9 \u05E4\u05E8\u05D3\u05E1\u05D5\u05DF'],[8,'\u05E4\u05E0\u05D7\u05E1 \u05D1\u05E8\u05D5\u05D3\u05D9'],[9,'\u05D0\u05E4\u05E8\u05D9\u05DD \u05D2\u05D5\u05DC\u05D3\u05D1\u05E8\u05D2'],[10,'\u05D9\u05E6\u05D7\u05E7 \u05D0\u05D4\u05E8\u05DF \u05D3\u05D5\u05D9\u05D8\u05E9'],
          [11,'\u05E0\u05EA\u05E0\u05D0\u05DC \u05E9\u05DE\u05D7\u05D4 \u05D7\u05E4\u05E5'],[12,'\u05D9\u05D5\u05E0\u05EA\u05DF \u05DC\u05D5\u05D9'],[13,'\u05E9\u05DE\u05D5\u05D0\u05DC \u05E4\u05E0\u05D7\u05E1 \u05DC\u05E1\u05E8'],[14,'\u05D9\u05D5\u05E1\u05E3 \u05D0\u05DC\u05E2\u05D6\u05E8 \u05E7\u05D3\u05D5\u05E9'],
          [15,'\u05DE\u05D0\u05D9\u05E8 \u05D1\u05E8\u05D7\u05DF'],[16,'\u05D0\u05D1\u05E8\u05D4\u05DD \u05D9\u05E9\u05E2\u05D9\u05D4 \u05DC\u05D5\u05D9\u05E1\u05D5\u05DF'],[17,'\u05D9\u05D5\u05E0\u05EA\u05DF \u05E9\u05DC\u05D5\u05DD \u05E0\u05E4\u05E8\u05E1\u05D8\u05E7'],
          [18,'\u05D0\u05DC\u05D9\u05E2\u05D6\u05E8 \u05D1\u05DC\u05D5\u05D9\u05D0'],[19,'\u05D7\u05D9\u05D9\u05DD \u05E4\u05D9\u05E0\u05D7\u05E1 \u05D1\u05E8\u05D5\u05E7\u05E1'],[20,'\u05D9\u05D4\u05D5\u05D3\u05D4 \u05E4\u05D3\u05E8']
        ];
        var statuses=['\u05E0\u05D5\u05DB\u05D7','\u05E0\u05D5\u05DB\u05D7','\u05E0\u05D5\u05DB\u05D7','\u05E0\u05D5\u05DB\u05D7','\u05D7\u05D9\u05E1\u05D5\u05E8','\u05D0\u05D9\u05D7\u05D5\u05E8'];
        var dates=[today,yesterday,twoDaysAgo];
        dates.forEach(function(d){ names.forEach(function(n){ att.push({'\u05DE\u05D6\u05D4\u05D4':id++,'\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4':n[0],'\u05E9\u05DD':n[1],'\u05EA\u05D0\u05E8\u05D9\u05DA':d,'\u05E1\u05D8\u05D8\u05D5\u05E1':statuses[Math.floor(Math.random()*statuses.length)]}); }); });
        return att;
      })(),
      /* ===== BEHAVIOR ===== */
      '\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA': [
        { '\u05DE\u05D6\u05D4\u05D4': 1, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 1, '\u05E9\u05DD': '\u05D0\u05DC\u05E2\u05D6\u05E8 \u05D9\u05D0\u05D9\u05E8', '\u05EA\u05D0\u05E8\u05D9\u05DA': today, '\u05E1\u05D5\u05D2': '\u05D7\u05D9\u05D5\u05D1\u05D9', '\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA': 5, '\u05D4\u05E2\u05E8\u05D4': '\u05E2\u05D6\u05E8 \u05DC\u05D7\u05D1\u05E8 \u05D1\u05DC\u05D9\u05DE\u05D5\u05D3' },
        { '\u05DE\u05D6\u05D4\u05D4': 2, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 3, '\u05E9\u05DD': '\u05E9\u05DC\u05DE\u05D4 \u05D9\u05D4\u05D5\u05D3\u05D4 \u05DC\u05D9\u05D9\u05D1\u05DC\u05E8', '\u05EA\u05D0\u05E8\u05D9\u05DA': today, '\u05E1\u05D5\u05D2': '\u05D7\u05D9\u05D5\u05D1\u05D9', '\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA': 4, '\u05D4\u05E2\u05E8\u05D4': '\u05D4\u05E9\u05EA\u05EA\u05E4\u05D5\u05EA \u05D1\u05E9\u05D9\u05E2\u05D5\u05E8' },
        { '\u05DE\u05D6\u05D4\u05D4': 3, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 5, '\u05E9\u05DD': '\u05DE\u05E0\u05D7\u05DD \u05E1\u05E0\u05D4\u05D3\u05E8\u05D0\u05D9', '\u05EA\u05D0\u05E8\u05D9\u05DA': yesterday, '\u05E1\u05D5\u05D2': '\u05E9\u05DC\u05D9\u05DC\u05D9', '\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA': -3, '\u05D4\u05E2\u05E8\u05D4': '\u05D4\u05E4\u05E8\u05E2\u05D4 \u05D1\u05E9\u05D9\u05E2\u05D5\u05E8' },
        { '\u05DE\u05D6\u05D4\u05D4': 4, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 8, '\u05E9\u05DD': '\u05E4\u05E0\u05D7\u05E1 \u05D1\u05E8\u05D5\u05D3\u05D9', '\u05EA\u05D0\u05E8\u05D9\u05DA': yesterday, '\u05E1\u05D5\u05D2': '\u05D7\u05D9\u05D5\u05D1\u05D9', '\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA': 3, '\u05D4\u05E2\u05E8\u05D4': '\u05E9\u05D9\u05EA\u05D5\u05E3 \u05E4\u05E2\u05D5\u05DC\u05D4 \u05D1\u05D7\u05D1\u05E8\u05D5\u05EA\u05D0' },
        { '\u05DE\u05D6\u05D4\u05D4': 5, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 9, '\u05E9\u05DD': '\u05D0\u05E4\u05E8\u05D9\u05DD \u05D2\u05D5\u05DC\u05D3\u05D1\u05E8\u05D2', '\u05EA\u05D0\u05E8\u05D9\u05DA': twoDaysAgo, '\u05E1\u05D5\u05D2': '\u05D7\u05D9\u05D5\u05D1\u05D9', '\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA': 5, '\u05D4\u05E2\u05E8\u05D4': '\u05D4\u05EA\u05D0\u05DE\u05E5 \u05DE\u05D9\u05D5\u05D7\u05D3 \u05D1\u05DC\u05D9\u05DE\u05D5\u05D3' },
        { '\u05DE\u05D6\u05D4\u05D4': 6, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 15, '\u05E9\u05DD': '\u05DE\u05D0\u05D9\u05E8 \u05D1\u05E8\u05D7\u05DF', '\u05EA\u05D0\u05E8\u05D9\u05DA': lastWeek, '\u05E1\u05D5\u05D2': '\u05D7\u05D9\u05D5\u05D1\u05D9', '\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA': 4, '\u05D4\u05E2\u05E8\u05D4': '\u05D4\u05E6\u05D8\u05D9\u05D9\u05DF \u05D1\u05EA\u05E4\u05D9\u05DC\u05D4' },
        { '\u05DE\u05D6\u05D4\u05D4': 7, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 2, '\u05E9\u05DD': '\u05D4\u05DC\u05DC \u05DB\u05E5', '\u05EA\u05D0\u05E8\u05D9\u05DA': lastWeek, '\u05E1\u05D5\u05D2': '\u05E9\u05DC\u05D9\u05DC\u05D9', '\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA': -4, '\u05D4\u05E2\u05E8\u05D4': '\u05D4\u05E4\u05E8\u05E2\u05D4 \u05D1\u05EA\u05E4\u05D9\u05DC\u05D4' },
        { '\u05DE\u05D6\u05D4\u05D4': 8, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 20, '\u05E9\u05DD': '\u05D9\u05D4\u05D5\u05D3\u05D4 \u05E4\u05D3\u05E8', '\u05EA\u05D0\u05E8\u05D9\u05DA': today, '\u05E1\u05D5\u05D2': '\u05D7\u05D9\u05D5\u05D1\u05D9', '\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA': 3, '\u05D4\u05E2\u05E8\u05D4': '\u05D4\u05D2\u05D9\u05E2 \u05D1\u05D6\u05DE\u05DF \u05DC\u05E9\u05D9\u05E2\u05D5\u05E8' },
        { '\u05DE\u05D6\u05D4\u05D4': 9, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 6, '\u05E9\u05DD': '\u05D1\u05E6\u05DC\u05D0\u05DC \u05E4\u05D8\u05D9\u05E0\u05D5', '\u05EA\u05D0\u05E8\u05D9\u05DA': yesterday, '\u05E1\u05D5\u05D2': '\u05D7\u05D9\u05D5\u05D1\u05D9', '\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA': 5, '\u05D4\u05E2\u05E8\u05D4': '\u05E7\u05E8\u05D0 \u05D1\u05E7\u05D5\u05DC \u05E8\u05DD \u05D1\u05E4\u05E0\u05D9 \u05D4\u05DB\u05D9\u05EA\u05D4' },
        { '\u05DE\u05D6\u05D4\u05D4': 10, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 12, '\u05E9\u05DD': '\u05D9\u05D5\u05E0\u05EA\u05DF \u05DC\u05D5\u05D9', '\u05EA\u05D0\u05E8\u05D9\u05DA': twoDaysAgo, '\u05E1\u05D5\u05D2': '\u05E9\u05DC\u05D9\u05DC\u05D9', '\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA': -3, '\u05D4\u05E2\u05E8\u05D4': '\u05DC\u05D0 \u05D4\u05D1\u05D9\u05D0 \u05E1\u05E4\u05E8\u05D9\u05DD' },
        { '\u05DE\u05D6\u05D4\u05D4': 11, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 4, '\u05E9\u05DD': '\u05D9\u05D4\u05D5\u05D3\u05D4 \u05E6\u05D1\u05D9 \u05E1\u05D9\u05D2\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA': twoDaysAgo, '\u05E1\u05D5\u05D2': '\u05D7\u05D9\u05D5\u05D1\u05D9', '\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA': 4, '\u05D4\u05E2\u05E8\u05D4': '\u05E2\u05D6\u05E8 \u05DC\u05D7\u05D1\u05E8 \u05D1\u05E0\u05D9\u05E7\u05D9\u05D5\u05DF' },
        { '\u05DE\u05D6\u05D4\u05D4': 12, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 16, '\u05E9\u05DD': '\u05D0\u05D1\u05E8\u05D4\u05DD \u05D9\u05E9\u05E2\u05D9\u05D4 \u05DC\u05D5\u05D9\u05E1\u05D5\u05DF', '\u05EA\u05D0\u05E8\u05D9\u05DA': lastWeek, '\u05E1\u05D5\u05D2': '\u05D7\u05D9\u05D5\u05D1\u05D9', '\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA': 5, '\u05D4\u05E2\u05E8\u05D4': '\u05E9\u05D9\u05E0\u05DF \u05D1\u05E2\u05DC \u05E4\u05D4 \u05D0\u05EA \u05D7\u05D5\u05DE\u05E8 \u05D4\u05D2\u05DE\u05E8\u05D0' },
        { '\u05DE\u05D6\u05D4\u05D4': 13, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 7, '\u05E9\u05DD': '\u05D3\u05D5\u05D1\u05D9 \u05E4\u05E8\u05D3\u05E1\u05D5\u05DF', '\u05EA\u05D0\u05E8\u05D9\u05DA': lastWeek, '\u05E1\u05D5\u05D2': '\u05D7\u05D9\u05D5\u05D1\u05D9', '\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA': 3, '\u05D4\u05E2\u05E8\u05D4': '\u05D4\u05EA\u05E0\u05D3\u05D1 \u05DC\u05E1\u05D9\u05D9\u05E2 \u05D1\u05E1\u05D3\u05E8 \u05D4\u05D9\u05D5\u05DD' },
        { '\u05DE\u05D6\u05D4\u05D4': 14, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 17, '\u05E9\u05DD': '\u05D9\u05D5\u05E0\u05EA\u05DF \u05E9\u05DC\u05D5\u05DD \u05E0\u05E4\u05E8\u05E1\u05D8\u05E7', '\u05EA\u05D0\u05E8\u05D9\u05DA': today, '\u05E1\u05D5\u05D2': '\u05E9\u05DC\u05D9\u05DC\u05D9', '\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA': -2, '\u05D4\u05E2\u05E8\u05D4': '\u05E8\u05E5 \u05D1\u05D4\u05E4\u05E1\u05E7\u05D4' },
        { '\u05DE\u05D6\u05D4\u05D4': 15, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 19, '\u05E9\u05DD': '\u05D7\u05D9\u05D9\u05DD \u05E4\u05D9\u05E0\u05D7\u05E1 \u05D1\u05E8\u05D5\u05E7\u05E1', '\u05EA\u05D0\u05E8\u05D9\u05DA': yesterday, '\u05E1\u05D5\u05D2': '\u05D7\u05D9\u05D5\u05D1\u05D9', '\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA': 4, '\u05D4\u05E2\u05E8\u05D4': '\u05D4\u05E6\u05D8\u05D9\u05D9\u05DF \u05D1\u05EA\u05E4\u05D9\u05DC\u05D4' }
      ],
      /* ===== HOMEWORK ===== */
      '\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9_\u05D1\u05D9\u05EA': [
        { '\u05DE\u05D6\u05D4\u05D4': 1, '\u05DB\u05D9\u05EA\u05D4': '\u05D0', '\u05DE\u05E7\u05E6\u05D5\u05E2': '\u05D2\u05DE\u05E8\u05D0', '\u05EA\u05D9\u05D0\u05D5\u05E8': '\u05E1\u05D5\u05D2\u05D9\u05D4 \u05D1\u05D1\u05D0 \u05DE\u05E6\u05D9\u05E2\u05D0 \u05D3\u05E3 \u05DC\u05D1-\u05DC\u05D2', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4': nextWeek, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC' },
        { '\u05DE\u05D6\u05D4\u05D4': 2, '\u05DB\u05D9\u05EA\u05D4': '\u05D0', '\u05DE\u05E7\u05E6\u05D5\u05E2': '\u05D7\u05D5\u05DE\u05E9', '\u05EA\u05D9\u05D0\u05D5\u05E8': '\u05E4\u05E8\u05E9\u05EA \u05D5\u05D9\u05E8\u05D0 - \u05E9\u05D0\u05DC\u05D5\u05EA \u05D7\u05D6\u05E8\u05D4', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4': yesterday, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05D4\u05D5\u05E9\u05DC\u05DD' },
        { '\u05DE\u05D6\u05D4\u05D4': 3, '\u05DB\u05D9\u05EA\u05D4': '\u05D1', '\u05DE\u05E7\u05E6\u05D5\u05E2': '\u05DE\u05E9\u05E0\u05D4', '\u05EA\u05D9\u05D0\u05D5\u05E8': '\u05E4\u05E8\u05E7 \u05D4\u05DE\u05D5\u05DB\u05E8 \u05DE\u05E9\u05E0\u05D4 \u05D0-\u05D3', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4': nextWeek, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC' },
        { '\u05DE\u05D6\u05D4\u05D4': 4, '\u05DB\u05D9\u05EA\u05D4': '\u05D2', '\u05DE\u05E7\u05E6\u05D5\u05E2': '\u05D4\u05DC\u05DB\u05D4', '\u05EA\u05D9\u05D0\u05D5\u05E8': '\u05D4\u05DC\u05DB\u05D5\u05EA \u05E9\u05D1\u05EA - \u05E1\u05D9\u05DE\u05E0\u05D9\u05DD \u05D0-\u05D9', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4': nextWeek, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC' },
        { '\u05DE\u05D6\u05D4\u05D4': 5, '\u05DB\u05D9\u05EA\u05D4': '\u05D0', '\u05DE\u05E7\u05E6\u05D5\u05E2': '\u05E0\u05D1\u05D9\u05D0\u05D9\u05DD', '\u05EA\u05D9\u05D0\u05D5\u05E8': '\u05E4\u05E8\u05E7 \u05D9\u05F4\u05D0 - \u05DE\u05DC\u05DB\u05D9\u05DD \u05D0\u05F3', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4': yesterday, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05D4\u05D5\u05E9\u05DC\u05DD' },
        { '\u05DE\u05D6\u05D4\u05D4': 6, '\u05DB\u05D9\u05EA\u05D4': '\u05D1', '\u05DE\u05E7\u05E6\u05D5\u05E2': '\u05D2\u05DE\u05E8\u05D0', '\u05EA\u05D9\u05D0\u05D5\u05E8': '\u05E1\u05D5\u05D2\u05D9\u05D0 \u05DE\u05E6\u05D9\u05E2\u05D5\u05EA \u05D3\u05E3 \u05DC\u05F4\u05D1', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4': nextWeek, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC' },
        { '\u05DE\u05D6\u05D4\u05D4': 7, '\u05DB\u05D9\u05EA\u05D4': '\u05D2', '\u05DE\u05E7\u05E6\u05D5\u05E2': '\u05D7\u05D5\u05DE\u05E9', '\u05EA\u05D9\u05D0\u05D5\u05E8': '\u05E4\u05E8\u05E9\u05EA \u05D0\u05D7\u05E8\u05D9 \u05DE\u05D5\u05EA - \u05DE\u05E9\u05E0\u05D4 \u05D0\u05F3-\u05D2\u05F3', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4': nextWeek, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC' },
        { '\u05DE\u05D6\u05D4\u05D4': 8, '\u05DB\u05D9\u05EA\u05D4': '\u05D0', '\u05DE\u05E7\u05E6\u05D5\u05E2': '\u05D4\u05DC\u05DB\u05D4', '\u05EA\u05D9\u05D0\u05D5\u05E8': '\u05D4\u05DC\u05DB\u05D5\u05EA \u05D1\u05E8\u05DB\u05D5\u05EA - \u05E1\u05D9\u05DE\u05DF \u05E7\u05F4\u05D0', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4': today, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC' },
        { '\u05DE\u05D6\u05D4\u05D4': 9, '\u05DB\u05D9\u05EA\u05D4': '\u05D1', '\u05DE\u05E7\u05E6\u05D5\u05E2': '\u05D7\u05D5\u05DE\u05E9', '\u05EA\u05D9\u05D0\u05D5\u05E8': '\u05E4\u05E8\u05E9\u05EA \u05E7\u05D3\u05D5\u05E9\u05D9\u05DD - \u05E4\u05E8\u05E7 \u05D9\u05F4\u05D8-\u05DB\u05F3', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4': nextWeek, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC' },
        { '\u05DE\u05D6\u05D4\u05D4': 10, '\u05DB\u05D9\u05EA\u05D4': '\u05D2', '\u05DE\u05E7\u05E6\u05D5\u05E2': '\u05DE\u05E9\u05E0\u05D4', '\u05EA\u05D9\u05D0\u05D5\u05E8': '\u05E4\u05E8\u05E7 \u05D4\u05E9\u05D5\u05EA\u05E4\u05D9\u05DD \u05DE\u05E9\u05E0\u05D4 \u05D3\u05F3-\u05D5\u05F3', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4': nextWeek, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC' }
      ],
      /* ===== EXAMS ===== */
      '\u05DE\u05D1\u05D7\u05E0\u05D9\u05DD': [
        { '\u05DE\u05D6\u05D4\u05D4': 1, '\u05E9\u05DD': '\u05DE\u05D1\u05D7\u05DF \u05D9\u05E8\u05D5\u05E9\u05DC\u05DE\u05D9 \u05D1\u05E2"\u05E4', '\u05DB\u05D9\u05EA\u05D4': '\u05D0', '\u05DE\u05E7\u05E6\u05D5\u05E2': '\u05D9\u05E8\u05D5\u05E9\u05DC\u05DE\u05D9', '\u05EA\u05D0\u05E8\u05D9\u05DA': lastWeek },
        { '\u05DE\u05D6\u05D4\u05D4': 2, '\u05E9\u05DD': '\u05DE\u05D1\u05D7\u05DF \u05D2\u05DE\u05E8\u05D0 \u05D1\u05D1\u05D0 \u05DE\u05E6\u05D9\u05E2\u05D0', '\u05DB\u05D9\u05EA\u05D4': '\u05D1', '\u05DE\u05E7\u05E6\u05D5\u05E2': '\u05D2\u05DE\u05E8\u05D0', '\u05EA\u05D0\u05E8\u05D9\u05DA': yesterday },
        { '\u05DE\u05D6\u05D4\u05D4': 3, '\u05E9\u05DD': '\u05DE\u05D1\u05D7\u05DF \u05D7\u05D5\u05DE\u05E9 \u05D1\u05E8\u05D0\u05E9\u05D9\u05EA', '\u05DB\u05D9\u05EA\u05D4': '\u05D2', '\u05DE\u05E7\u05E6\u05D5\u05E2': '\u05D7\u05D5\u05DE\u05E9', '\u05EA\u05D0\u05E8\u05D9\u05DA': nextWeek }
      ],
      /* ===== GRADES ===== */
      '\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD': [
        { '\u05DE\u05D6\u05D4\u05D4': 1, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 1, '\u05DE\u05D1\u05D7\u05DF_\u05DE\u05D6\u05D4\u05D4': 1, '\u05E9\u05DD': '\u05D0\u05DC\u05E2\u05D6\u05E8 \u05D9\u05D0\u05D9\u05E8', '\u05E6\u05D9\u05D5\u05DF': 60 },
        { '\u05DE\u05D6\u05D4\u05D4': 2, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 2, '\u05DE\u05D1\u05D7\u05DF_\u05DE\u05D6\u05D4\u05D4': 1, '\u05E9\u05DD': '\u05D4\u05DC\u05DC \u05DB\u05E5', '\u05E6\u05D9\u05D5\u05DF': 100 },
        { '\u05DE\u05D6\u05D4\u05D4': 3, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 3, '\u05DE\u05D1\u05D7\u05DF_\u05DE\u05D6\u05D4\u05D4': 1, '\u05E9\u05DD': '\u05E9\u05DC\u05DE\u05D4 \u05D9\u05D4\u05D5\u05D3\u05D4 \u05DC\u05D9\u05D9\u05D1\u05DC\u05E8', '\u05E6\u05D9\u05D5\u05DF': 90 },
        { '\u05DE\u05D6\u05D4\u05D4': 4, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 5, '\u05DE\u05D1\u05D7\u05DF_\u05DE\u05D6\u05D4\u05D4': 1, '\u05E9\u05DD': '\u05DE\u05E0\u05D7\u05DD \u05E1\u05E0\u05D4\u05D3\u05E8\u05D0\u05D9', '\u05E6\u05D9\u05D5\u05DF': 90 },
        { '\u05DE\u05D6\u05D4\u05D4': 5, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 8, '\u05DE\u05D1\u05D7\u05DF_\u05DE\u05D6\u05D4\u05D4': 2, '\u05E9\u05DD': '\u05E4\u05E0\u05D7\u05E1 \u05D1\u05E8\u05D5\u05D3\u05D9', '\u05E6\u05D9\u05D5\u05DF': 85 },
        { '\u05DE\u05D6\u05D4\u05D4': 6, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 9, '\u05DE\u05D1\u05D7\u05DF_\u05DE\u05D6\u05D4\u05D4': 2, '\u05E9\u05DD': '\u05D0\u05E4\u05E8\u05D9\u05DD \u05D2\u05D5\u05DC\u05D3\u05D1\u05E8\u05D2', '\u05E6\u05D9\u05D5\u05DF': 95 },
        { '\u05DE\u05D6\u05D4\u05D4': 7, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 15, '\u05DE\u05D1\u05D7\u05DF_\u05DE\u05D6\u05D4\u05D4': 3, '\u05E9\u05DD': '\u05DE\u05D0\u05D9\u05E8 \u05D1\u05E8\u05D7\u05DF', '\u05E6\u05D9\u05D5\u05DF': 88 },
        { '\u05DE\u05D6\u05D4\u05D4': 8, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 16, '\u05DE\u05D1\u05D7\u05DF_\u05DE\u05D6\u05D4\u05D4': 3, '\u05E9\u05DD': '\u05D0\u05D1\u05E8\u05D4\u05DD \u05D9\u05E9\u05E2\u05D9\u05D4 \u05DC\u05D5\u05D9\u05E1\u05D5\u05DF', '\u05E6\u05D9\u05D5\u05DF': 72 }
      ],
      /* ===== TASKS ===== */
      '\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA': [
        { '\u05DE\u05D6\u05D4\u05D4': 1, '\u05DB\u05D5\u05EA\u05E8\u05EA': '\u05D4\u05D6\u05DE\u05E0\u05EA \u05E1\u05E4\u05E8\u05D9 \u05DC\u05D9\u05DE\u05D5\u05D3 \u05DC\u05DE\u05D7\u05E1\u05DF', '\u05D0\u05D7\u05E8\u05D0\u05D9': '\u05D9\u05D5\u05E1\u05E3 \u05E9\u05E0\u05D9\u05D9\u05D3\u05E8', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05D7\u05D3\u05E9', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E2\u05D3': nextWeek },
        { '\u05DE\u05D6\u05D4\u05D4': 2, '\u05DB\u05D5\u05EA\u05E8\u05EA': '\u05E9\u05D9\u05D7\u05D4 \u05E2\u05DD \u05D4\u05D5\u05E8\u05D9\u05DD \u05E2\u05DC \u05DE\u05D5\u05E2\u05D3 \u05D0\u05E1\u05D9\u05E4\u05D4', '\u05D0\u05D7\u05E8\u05D0\u05D9': '\u05D4\u05E8\u05D1 \u05D9\u05E8\u05D5\u05E9\u05DC\u05DE\u05D9', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05D1\u05D8\u05D9\u05E4\u05D5\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E2\u05D3': today },
        { '\u05DE\u05D6\u05D4\u05D4': 3, '\u05DB\u05D5\u05EA\u05E8\u05EA': '\u05EA\u05D9\u05E7\u05D5\u05DF \u05DE\u05D6\u05D2\u05DF \u05D1\u05DE\u05D1\u05E0\u05D4', '\u05D0\u05D7\u05E8\u05D0\u05D9': '\u05E4\u05E8\u05E5', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05D7\u05D3\u05E9', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E2\u05D3': nextMonth },
        { '\u05DE\u05D6\u05D4\u05D4': 4, '\u05DB\u05D5\u05EA\u05E8\u05EA': '\u05E2\u05D3\u05DB\u05D5\u05DF \u05D0\u05EA\u05E8 \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3', '\u05D0\u05D7\u05E8\u05D0\u05D9': '\u05D9\u05D5\u05E1\u05E3 \u05E9\u05E0\u05D9\u05D9\u05D3\u05E8', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05D4\u05D5\u05E9\u05DC\u05DD', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E2\u05D3': yesterday },
        { '\u05DE\u05D6\u05D4\u05D4': 5, '\u05DB\u05D5\u05EA\u05E8\u05EA': '\u05D4\u05DB\u05E0\u05EA \u05D8\u05D9\u05D5\u05DC \u05E9\u05E0\u05EA\u05D9 \u05DC\u05DE\u05D9\u05E8\u05D5\u05DF', '\u05D0\u05D7\u05E8\u05D0\u05D9': '\u05D4\u05E8\u05D1 \u05D2\u05D5\u05DC\u05D3\u05E9\u05D8\u05D9\u05D9\u05DF', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05D7\u05D3\u05E9', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D9\u05E2\u05D3': nextMonth }
      ],
      /* ===== CALENDAR ===== */
      '\u05DC\u05D5\u05D7_\u05E9\u05E0\u05D4': [
        { '\u05DE\u05D6\u05D4\u05D4': 1, '\u05DB\u05D5\u05EA\u05E8\u05EA': '\u05DE\u05D1\u05D7\u05DF \u05D9\u05E8\u05D5\u05E9\u05DC\u05DE\u05D9 \u05DB\u05D9\u05EA\u05D4 \u05D0', '\u05EA\u05D0\u05E8\u05D9\u05DA': nextWeek, '\u05E1\u05D5\u05D2': '\u05DE\u05D1\u05D7\u05DF' },
        { '\u05DE\u05D6\u05D4\u05D4': 2, '\u05DB\u05D5\u05EA\u05E8\u05EA': '\u05D0\u05E1\u05D9\u05E4\u05EA \u05D4\u05D5\u05E8\u05D9\u05DD \u05DB\u05D9\u05EA\u05D4 \u05D1', '\u05EA\u05D0\u05E8\u05D9\u05DA': today, '\u05E1\u05D5\u05D2': '\u05D0\u05D9\u05E8\u05D5\u05E2' },
        { '\u05DE\u05D6\u05D4\u05D4': 3, '\u05DB\u05D5\u05EA\u05E8\u05EA': '\u05D8\u05D9\u05D5\u05DC \u05E9\u05E0\u05EA\u05D9 \u05DC\u05DE\u05D9\u05E8\u05D5\u05DF', '\u05EA\u05D0\u05E8\u05D9\u05DA': nextMonth, '\u05E1\u05D5\u05D2': '\u05D8\u05D9\u05D5\u05DC' },
        { '\u05DE\u05D6\u05D4\u05D4': 4, '\u05DB\u05D5\u05EA\u05E8\u05EA': '\u05E1\u05D9\u05D5\u05DD \u05E9\u05E0\u05D4"\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA': '2026-06-20', '\u05E1\u05D5\u05D2': '\u05D0\u05D9\u05E8\u05D5\u05E2' },
        { '\u05DE\u05D6\u05D4\u05D4': 5, '\u05DB\u05D5\u05EA\u05E8\u05EA': '\u05D7\u05D5\u05E4\u05E9\u05EA \u05E4\u05E1\u05D7', '\u05EA\u05D0\u05E8\u05D9\u05DA': '2026-05-05', '\u05E1\u05D5\u05D2': '\u05D7\u05D2', '\u05D4\u05E2\u05E8\u05D5\u05EA': '\u05D0\u05D9\u05DF \u05DC\u05D9\u05DE\u05D5\u05D3\u05D9\u05DD' }
      ],
      /* ===== SCHEDULE ===== */
      '\u05DE\u05E2\u05E8\u05DB\u05EA_\u05E9\u05E2\u05D5\u05EA': [
        { '\u05DE\u05D6\u05D4\u05D4': 1, '\u05DB\u05D9\u05EA\u05D4': '\u05D0', '\u05D9\u05D5\u05DD': '\u05D0', '\u05E9\u05E2\u05D4': '08:00', '\u05DE\u05E7\u05E6\u05D5\u05E2': '\u05D2\u05DE\u05E8\u05D0', '\u05DE\u05DC\u05DE\u05D3': '\u05D4\u05E8\u05D1 \u05DB\u05D4\u05DF' },
        { '\u05DE\u05D6\u05D4\u05D4': 2, '\u05DB\u05D9\u05EA\u05D4': '\u05D0', '\u05D9\u05D5\u05DD': '\u05D0', '\u05E9\u05E2\u05D4': '09:00', '\u05DE\u05E7\u05E6\u05D5\u05E2': '\u05D7\u05D5\u05DE\u05E9', '\u05DE\u05DC\u05DE\u05D3': '\u05D4\u05E8\u05D1 \u05DB\u05D4\u05DF' },
        { '\u05DE\u05D6\u05D4\u05D4': 3, '\u05DB\u05D9\u05EA\u05D4': '\u05D1', '\u05D9\u05D5\u05DD': '\u05D0', '\u05E9\u05E2\u05D4': '08:00', '\u05DE\u05E7\u05E6\u05D5\u05E2': '\u05DE\u05E9\u05E0\u05D4', '\u05DE\u05DC\u05DE\u05D3': '\u05D4\u05E8\u05D1 \u05D2\u05D5\u05DC\u05D3\u05E9\u05D8\u05D9\u05D9\u05DF' },
        { '\u05DE\u05D6\u05D4\u05D4': 4, '\u05DB\u05D9\u05EA\u05D4': '\u05D2', '\u05D9\u05D5\u05DD': '\u05D0', '\u05E9\u05E2\u05D4': '08:00', '\u05DE\u05E7\u05E6\u05D5\u05E2': '\u05D4\u05DC\u05DB\u05D4', '\u05DE\u05DC\u05DE\u05D3': '\u05D4\u05E8\u05D1 \u05E9\u05E4\u05D9\u05E8\u05D0' }
      ],
      /* ===== PETTY CASH ===== */
      '\u05E7\u05D5\u05E4\u05D4_\u05E7\u05D8\u05E0\u05D4': [
        { '\u05DE\u05D6\u05D4\u05D4': 1, '\u05EA\u05D0\u05E8\u05D9\u05DA': today, '\u05EA\u05D9\u05D0\u05D5\u05E8': '\u05E7\u05E0\u05D9\u05D9\u05EA \u05E6\u05D9\u05D5\u05D3 \u05DC\u05DE\u05E9\u05E8\u05D3', '\u05E1\u05DB\u05D5\u05DD': 450, '\u05E1\u05D5\u05D2': '\u05D4\u05D5\u05E6\u05D0\u05D4' },
        { '\u05DE\u05D6\u05D4\u05D4': 2, '\u05EA\u05D0\u05E8\u05D9\u05DA': yesterday, '\u05EA\u05D9\u05D0\u05D5\u05E8': '\u05EA\u05D9\u05E7\u05D5\u05DF \u05DE\u05D6\u05D2\u05DF', '\u05E1\u05DB\u05D5\u05DD': 280, '\u05E1\u05D5\u05D2': '\u05D4\u05D5\u05E6\u05D0\u05D4' },
        { '\u05DE\u05D6\u05D4\u05D4': 3, '\u05EA\u05D0\u05E8\u05D9\u05DA': twoDaysAgo, '\u05EA\u05D9\u05D0\u05D5\u05E8': '\u05EA\u05E8\u05D5\u05DE\u05D4 \u05DE\u05D4\u05D5\u05E8\u05D9\u05DD', '\u05E1\u05DB\u05D5\u05DD': 1000, '\u05E1\u05D5\u05D2': '\u05D4\u05DB\u05E0\u05E1\u05D4' },
        { '\u05DE\u05D6\u05D4\u05D4': 4, '\u05EA\u05D0\u05E8\u05D9\u05DA': lastWeek, '\u05EA\u05D9\u05D0\u05D5\u05E8': '\u05E0\u05E8\u05D5\u05EA \u05DC\u05E9\u05D1\u05EA', '\u05E1\u05DB\u05D5\u05DD': 120, '\u05E1\u05D5\u05D2': '\u05D4\u05D5\u05E6\u05D0\u05D4' }
      ],
      /* ===== COMMUNICATIONS ===== */
      '\u05EA\u05E7\u05E9\u05D5\u05E8\u05EA': [
        { '\u05DE\u05D6\u05D4\u05D4': 1, '\u05EA\u05D0\u05E8\u05D9\u05DA': today, '\u05E0\u05DE\u05E2\u05DF': '\u05D9\u05D5\u05E1\u05E3 \u05D7\u05D9\u05D9\u05DD \u05D9\u05D0\u05D9\u05E8', '\u05E0\u05D5\u05E9\u05D0': '\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA', '\u05EA\u05D5\u05DB\u05DF': '\u05D4\u05D1\u05DF \u05E0\u05E2\u05D3\u05E8 \u05D9\u05D5\u05DE\u05D9\u05D9\u05DD', '\u05E2\u05E8\u05D5\u05E5': 'whatsapp' },
        { '\u05DE\u05D6\u05D4\u05D4': 2, '\u05EA\u05D0\u05E8\u05D9\u05DA': yesterday, '\u05E0\u05DE\u05E2\u05DF': '\u05DE\u05E0\u05D3\u05D9 \u05DB\u05E5', '\u05E0\u05D5\u05E9\u05D0': '\u05E9\u05DB\u05E8 \u05DC\u05D9\u05DE\u05D5\u05D3', '\u05EA\u05D5\u05DB\u05DF': '\u05D1\u05E7\u05E9\u05D4 \u05DC\u05D3\u05D7\u05D5\u05EA \u05EA\u05E9\u05DC\u05D5\u05DD', '\u05E2\u05E8\u05D5\u05E5': '\u05D8\u05DC\u05E4\u05D5\u05DF' },
        { '\u05DE\u05D6\u05D4\u05D4': 3, '\u05EA\u05D0\u05E8\u05D9\u05DA': lastWeek, '\u05E0\u05DE\u05E2\u05DF': '\u05D0\u05D1\u05E8\u05D4\u05DD \u05E9\u05DC\u05D5\u05DD \u05D1\u05E8\u05D5\u05D3\u05D9', '\u05E0\u05D5\u05E9\u05D0': '\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA', '\u05EA\u05D5\u05DB\u05DF': '\u05D4\u05D1\u05DF \u05E4\u05E0\u05D7\u05E1 \u05D4\u05EA\u05E7\u05D3\u05DD \u05DE\u05D0\u05D5\u05D3', '\u05E2\u05E8\u05D5\u05E5': '\u05E4\u05D2\u05D9\u05E9\u05D4' }
      ],
      /* ===== BUDGET ===== */
      '\u05EA\u05E7\u05E6\u05D9\u05D1': [
        { '\u05DE\u05D6\u05D4\u05D4': 1, '\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4': '\u05E9\u05DB\u05E8 \u05E6\u05D5\u05D5\u05EA', '\u05EA\u05E7\u05E6\u05D9\u05D1': 45000, '\u05D1\u05D9\u05E6\u05D5\u05E2': 42000, '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC' },
        { '\u05DE\u05D6\u05D4\u05D4': 2, '\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4': '\u05E9\u05DB\u05E8 \u05DC\u05D9\u05DE\u05D5\u05D3', '\u05EA\u05E7\u05E6\u05D9\u05D1': 48000, '\u05D1\u05D9\u05E6\u05D5\u05E2': 38400, '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC' },
        { '\u05DE\u05D6\u05D4\u05D4': 3, '\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4': '\u05D0\u05D7\u05D6\u05E7\u05D4', '\u05EA\u05E7\u05E6\u05D9\u05D1': 5000, '\u05D1\u05D9\u05E6\u05D5\u05E2': 3200, '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC' },
        { '\u05DE\u05D6\u05D4\u05D4': 4, '\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4': '\u05D8\u05D9\u05D5\u05DC\u05D9\u05DD', '\u05EA\u05E7\u05E6\u05D9\u05D1': 8000, '\u05D1\u05D9\u05E6\u05D5\u05E2': 0, '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC' }
      ],
      /* ===== TRIPS ===== */
      '\u05D8\u05D9\u05D5\u05DC\u05D9\u05DD': [
        { '\u05DE\u05D6\u05D4\u05D4': 1, '\u05E9\u05DD': '\u05D8\u05D9\u05D5\u05DC \u05DC\u05DE\u05D9\u05E0\u05D9 \u05D9\u05E8\u05D5\u05E9\u05DC\u05D9\u05DD', '\u05EA\u05D0\u05E8\u05D9\u05DA': nextMonth, '\u05D9\u05E2\u05D3': '\u05DE\u05E2\u05E8\u05EA \u05D4\u05DE\u05E0\u05D4\u05E8\u05D5\u05EA', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05DE\u05D0\u05D5\u05E9\u05E8' },
        { '\u05DE\u05D6\u05D4\u05D4': 2, '\u05E9\u05DD': '\u05D8\u05D9\u05D5\u05DC \u05E1\u05D9\u05D5\u05DD \u05E9\u05E0\u05D4 \u05DC\u05E4\u05D0\u05E8\u05E7 \u05D4\u05D7\u05D1\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA': '2026-06-15', '\u05D9\u05E2\u05D3': '\u05E4\u05D0\u05E8\u05E7 \u05D4\u05D7\u05D1\u05DC', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05DE\u05EA\u05D5\u05DB\u05E0\u05DF' }
      ],
      /* ===== COMMITTEES ===== */
      '\u05D5\u05E2\u05D3\u05D5\u05EA': [
        { '\u05DE\u05D6\u05D4\u05D4': 1, '\u05E9\u05DD': '\u05D5\u05E2\u05D3\u05EA \u05D4\u05D5\u05E8\u05D9\u05DD', '\u05D7\u05D1\u05E8\u05D9\u05DD': '\u05D4\u05E8\u05D1 \u05D9\u05E8\u05D5\u05E9\u05DC\u05DE\u05D9, \u05D9\u05D5\u05E1\u05E3 \u05E9\u05E0\u05D9\u05D9\u05D3\u05E8', '\u05DE\u05D8\u05E8\u05D4': '\u05E7\u05E9\u05E8 \u05E2\u05DD \u05D4\u05D5\u05E8\u05D9\u05DD \u05D5\u05E7\u05D1\u05DC\u05EA \u05D4\u05D7\u05DC\u05D8\u05D5\u05EA' },
        { '\u05DE\u05D6\u05D4\u05D4': 2, '\u05E9\u05DD': '\u05D5\u05E2\u05D3\u05EA \u05D2\u05D1\u05D9\u05D9\u05D4', '\u05D7\u05D1\u05E8\u05D9\u05DD': '\u05D9\u05D5\u05E1\u05E3 \u05E9\u05E0\u05D9\u05D9\u05D3\u05E8, \u05D4\u05E8\u05D1 \u05D9\u05E8\u05D5\u05E9\u05DC\u05DE\u05D9', '\u05DE\u05D8\u05E8\u05D4': '\u05DE\u05E2\u05E7\u05D1 \u05D0\u05D7\u05E8 \u05D2\u05D1\u05D9\u05D9\u05EA \u05E9\u05DB\u05E8 \u05DC\u05D9\u05DE\u05D5\u05D3' }
      ],
      /* ===== INSTITUTIONS ===== */
      '\u05DE\u05E1\u05D2\u05E8\u05D5\u05EA': [
        { '\u05DE\u05D6\u05D4\u05D4': 1, '\u05E9\u05DD': '\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3 \u05DE\u05DB\u05D9\u05E0\u05D4', '\u05E2\u05D9\u05E8': '\u05D1\u05D9\u05EA \u05E9\u05DE\u05E9', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05E8\u05D7\u05D5\u05D1 \u05D4\u05E8\u05D0\u05DC 5', '\u05D8\u05DC\u05E4\u05D5\u05DF': '02-9991234', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC' }
      ],
      /* ===== STUDY CAMPAIGN ===== */
      '\u05DE\u05D1\u05E6\u05E2_\u05DC\u05D9\u05DE\u05D5\u05D3': [
        { '\u05DE\u05D6\u05D4\u05D4': 1, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 1, '\u05E9\u05DD': '\u05D0\u05DC\u05E2\u05D6\u05E8 \u05D9\u05D0\u05D9\u05E8', '\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA': 45, '\u05E9\u05D1\u05D5\u05E2': '\u05E0\u05D9\u05E1\u05DF' },
        { '\u05DE\u05D6\u05D4\u05D4': 2, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 8, '\u05E9\u05DD': '\u05E4\u05E0\u05D7\u05E1 \u05D1\u05E8\u05D5\u05D3\u05D9', '\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA': 52, '\u05E9\u05D1\u05D5\u05E2': '\u05E0\u05D9\u05E1\u05DF' },
        { '\u05DE\u05D6\u05D4\u05D4': 3, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 15, '\u05E9\u05DD': '\u05DE\u05D0\u05D9\u05E8 \u05D1\u05E8\u05D7\u05DF', '\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA': 60, '\u05E9\u05D1\u05D5\u05E2': '\u05E0\u05D9\u05E1\u05DF' }
      ],
      /* ===== ACTIVITY LOG ===== */
      '\u05D9\u05D5\u05DE\u05DF_\u05E4\u05E2\u05D9\u05DC\u05D5\u05EA': [
        { '\u05DE\u05D6\u05D4\u05D4': 1, '\u05EA\u05D0\u05E8\u05D9\u05DA': today, '\u05E4\u05E2\u05D5\u05DC\u05D4': '\u05D4\u05D5\u05E1\u05E4\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3', '\u05DE\u05E9\u05EA\u05DE\u05E9': '\u05D9\u05D5\u05E1\u05E3 \u05E9\u05E0\u05D9\u05D9\u05D3\u05E8', '\u05E4\u05E8\u05D8\u05D9\u05DD': '\u05E0\u05E8\u05E9\u05DD \u05EA\u05DC\u05DE\u05D9\u05D3 \u05D7\u05D3\u05E9 \u05DC\u05DB\u05D9\u05EA\u05D4 \u05D0' },
        { '\u05DE\u05D6\u05D4\u05D4': 2, '\u05EA\u05D0\u05E8\u05D9\u05DA': today, '\u05E4\u05E2\u05D5\u05DC\u05D4': '\u05E2\u05D3\u05DB\u05D5\u05DF \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA', '\u05DE\u05E9\u05EA\u05DE\u05E9': '\u05D4\u05E8\u05D1 \u05DB\u05D4\u05DF', '\u05E4\u05E8\u05D8\u05D9\u05DD': '\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05DB\u05D9\u05EA\u05D4 \u05D0 \u05E2\u05D5\u05D3\u05DB\u05E0\u05D5' },
        { '\u05DE\u05D6\u05D4\u05D4': 3, '\u05EA\u05D0\u05E8\u05D9\u05DA': yesterday, '\u05E4\u05E2\u05D5\u05DC\u05D4': '\u05E2\u05D3\u05DB\u05D5\u05DF \u05E9\u05DB"\u05DC', '\u05DE\u05E9\u05EA\u05DE\u05E9': '\u05D9\u05D5\u05E1\u05E3 \u05E9\u05E0\u05D9\u05D9\u05D3\u05E8', '\u05E4\u05E8\u05D8\u05D9\u05DD': '\u05E2\u05D3\u05DB\u05D5\u05DF \u05EA\u05E9\u05DC\u05D5\u05DD \u05DC3 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD' }
      ],
      /* ===== MEDICAL INFO ===== */
      '\u05DE\u05D9\u05D3\u05E2_\u05E8\u05E4\u05D5\u05D0\u05D9': [
        { '\u05DE\u05D6\u05D4\u05D4': 1, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 3, '\u05E9\u05DD': '\u05E9\u05DC\u05DE\u05D4 \u05D9\u05D4\u05D5\u05D3\u05D4 \u05DC\u05D9\u05D9\u05D1\u05DC\u05E8', '\u05DE\u05E6\u05D1': '\u05D0\u05DC\u05E8\u05D2\u05D9\u05D4 \u05DC\u05D0\u05D2\u05D5\u05D6\u05D9\u05DD', '\u05D4\u05E2\u05E8\u05D5\u05EA': '\u05E0\u05D3\u05E8\u05E9 \u05D0\u05E4\u05D9\u05E4\u05DF' },
        { '\u05DE\u05D6\u05D4\u05D4': 2, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 10, '\u05E9\u05DD': '\u05D9\u05E6\u05D7\u05E7 \u05D0\u05D4\u05E8\u05DF \u05D3\u05D5\u05D9\u05D8\u05E9', '\u05DE\u05E6\u05D1': '\u05D0\u05E1\u05D8\u05DE\u05D4', '\u05D4\u05E2\u05E8\u05D5\u05EA': '\u05E0\u05D5\u05E9\u05D0 \u05DE\u05E9\u05D0\u05E3 \u05D1\u05EA\u05D9\u05E7' }
      ],
      /* ===== STAFF SALARY ===== */
      '\u05E9\u05DB\u05E8_\u05E6\u05D5\u05D5\u05EA': [
        { '\u05DE\u05D6\u05D4\u05D4': 1, '\u05E6\u05D5\u05D5\u05EA_\u05DE\u05D6\u05D4\u05D4': 1, '\u05E9\u05DD': '\u05D4\u05E8\u05D1 \u05D0\u05DC\u05D9\u05DE\u05DC\u05DA \u05D9\u05E8\u05D5\u05E9\u05DC\u05DE\u05D9', '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05E1\u05DB\u05D5\u05DD': 12000, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E9\u05D5\u05DC\u05DD' },
        { '\u05DE\u05D6\u05D4\u05D4': 2, '\u05E6\u05D5\u05D5\u05EA_\u05DE\u05D6\u05D4\u05D4': 2, '\u05E9\u05DD': '\u05D4\u05E8\u05D1 \u05DE\u05E0\u05D7\u05DD \u05DB\u05D4\u05DF', '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05E1\u05DB\u05D5\u05DD': 8500, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E9\u05D5\u05DC\u05DD' },
        { '\u05DE\u05D6\u05D4\u05D4': 3, '\u05E6\u05D5\u05D5\u05EA_\u05DE\u05D6\u05D4\u05D4': 3, '\u05E9\u05DD': '\u05D4\u05E8\u05D1 \u05D3\u05D5\u05D3 \u05D2\u05D5\u05DC\u05D3\u05E9\u05D8\u05D9\u05D9\u05DF', '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05E1\u05DB\u05D5\u05DD': 8500, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC' },
        { '\u05DE\u05D6\u05D4\u05D4': 4, '\u05E6\u05D5\u05D5\u05EA_\u05DE\u05D6\u05D4\u05D4': 5, '\u05E9\u05DD': '\u05D9\u05D5\u05E1\u05E3 \u05E9\u05E0\u05D9\u05D9\u05D3\u05E8', '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05E1\u05DB\u05D5\u05DD': 6000, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E9\u05D5\u05DC\u05DD' }
      ],
      /* ===== STAFF ATTENDANCE ===== */
      '\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA_\u05E6\u05D5\u05D5\u05EA': [
        { '\u05DE\u05D6\u05D4\u05D4': 1, '\u05E6\u05D5\u05D5\u05EA_\u05DE\u05D6\u05D4\u05D4': 1, '\u05E9\u05DD': '\u05D4\u05E8\u05D1 \u05D9\u05E8\u05D5\u05E9\u05DC\u05DE\u05D9', '\u05EA\u05D0\u05E8\u05D9\u05DA': today, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E0\u05D5\u05DB\u05D7' },
        { '\u05DE\u05D6\u05D4\u05D4': 2, '\u05E6\u05D5\u05D5\u05EA_\u05DE\u05D6\u05D4\u05D4': 2, '\u05E9\u05DD': '\u05D4\u05E8\u05D1 \u05DB\u05D4\u05DF', '\u05EA\u05D0\u05E8\u05D9\u05DA': today, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E0\u05D5\u05DB\u05D7' },
        { '\u05DE\u05D6\u05D4\u05D4': 3, '\u05E6\u05D5\u05D5\u05EA_\u05DE\u05D6\u05D4\u05D4': 3, '\u05E9\u05DD': '\u05D4\u05E8\u05D1 \u05D2\u05D5\u05DC\u05D3\u05E9\u05D8\u05D9\u05D9\u05DF', '\u05EA\u05D0\u05E8\u05D9\u05DA': today, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05D7\u05D9\u05E1\u05D5\u05E8' },
        { '\u05DE\u05D6\u05D4\u05D4': 4, '\u05E6\u05D5\u05D5\u05EA_\u05DE\u05D6\u05D4\u05D4': 5, '\u05E9\u05DD': '\u05D9\u05D5\u05E1\u05E3 \u05E9\u05E0\u05D9\u05D9\u05D3\u05E8', '\u05EA\u05D0\u05E8\u05D9\u05DA': today, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E0\u05D5\u05DB\u05D7' }
      ],
      /* ===== STUDENT DOCUMENTS ===== */
      '\u05DE\u05E1\u05DE\u05DB\u05D9_\u05EA\u05DC\u05DE\u05D9\u05D3': [
        { '\u05DE\u05D6\u05D4\u05D4': 1, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 1, '\u05E9\u05DD': '\u05EA\u05E2\u05D5\u05D3\u05EA \u05D6\u05D4\u05D5\u05EA', '\u05E1\u05D5\u05D2': '\u05DE\u05E1\u05DE\u05DA \u05D0\u05D9\u05E9\u05D9' },
        { '\u05DE\u05D6\u05D4\u05D4': 2, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 1, '\u05E9\u05DD': '\u05D0\u05D9\u05E9\u05D5\u05E8 \u05E8\u05E4\u05D5\u05D0\u05D9', '\u05E1\u05D5\u05D2': '\u05E8\u05E4\u05D5\u05D0\u05D9' },
        { '\u05DE\u05D6\u05D4\u05D4': 3, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 8, '\u05E9\u05DD': '\u05EA\u05E2\u05D5\u05D3\u05EA \u05D6\u05D4\u05D5\u05EA', '\u05E1\u05D5\u05D2': '\u05DE\u05E1\u05DE\u05DA \u05D0\u05D9\u05E9\u05D9' }
      ],
      /* ===== STAFF DOCUMENTS ===== */
      '\u05DE\u05E1\u05DE\u05DB\u05D9_\u05E6\u05D5\u05D5\u05EA': [
        { '\u05DE\u05D6\u05D4\u05D4': 1, '\u05E6\u05D5\u05D5\u05EA_\u05DE\u05D6\u05D4\u05D4': 1, '\u05E9\u05DD': '\u05EA\u05E2\u05D5\u05D3\u05EA \u05D6\u05D4\u05D5\u05EA', '\u05E1\u05D5\u05D2': '\u05DE\u05E1\u05DE\u05DA \u05D0\u05D9\u05E9\u05D9' },
        { '\u05DE\u05D6\u05D4\u05D4': 2, '\u05E6\u05D5\u05D5\u05EA_\u05DE\u05D6\u05D4\u05D4': 5, '\u05E9\u05DD': '\u05D8\u05D5\u05E4\u05E1 101', '\u05E1\u05D5\u05D2': '\u05DE\u05E1 \u05D4\u05DB\u05E0\u05E1\u05D4' }
      ],
      /* ===== USERS ===== */
      '\u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD': [
        { '\u05DE\u05D6\u05D4\u05D4': 1, '\u05E9\u05DD': '\u05D9\u05D5\u05E1\u05E3 \u05E9\u05E0\u05D9\u05D9\u05D3\u05E8', '\u05EA\u05E4\u05E7\u05D9\u05D3': '\u05DE\u05E0\u05D4\u05DC', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC' },
        { '\u05DE\u05D6\u05D4\u05D4': 2, '\u05E9\u05DD': '\u05D4\u05E8\u05D1 \u05D9\u05E8\u05D5\u05E9\u05DC\u05DE\u05D9', '\u05EA\u05E4\u05E7\u05D9\u05D3': '\u05E8\u05D0\u05E9 \u05D9\u05E9\u05D9\u05D1\u05D4', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC' }
      ],
      /* ===== FORMS ===== */
      '\u05D8\u05E4\u05E1\u05D9\u05DD': [
        { '\u05DE\u05D6\u05D4\u05D4': 1, '\u05E9\u05DD': '\u05D8\u05D5\u05E4\u05E1 \u05E8\u05D9\u05E9\u05D5\u05DD \u05DC\u05E9\u05E0\u05D4"\u05DC', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05E9\u05D3\u05D5\u05EA': JSON.stringify([{'\u05E9\u05DD':'\u05E9\u05DD \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3','\u05E1\u05D5\u05D2':'\u05D8\u05E7\u05E1\u05D8'},{'\u05E9\u05DD':'\u05DB\u05D9\u05EA\u05D4','\u05E1\u05D5\u05D2':'\u05D1\u05D7\u05D9\u05E8\u05D4'}]) }
      ],
      '\u05EA\u05E9\u05D5\u05D1\u05D5\u05EA_\u05D8\u05E4\u05E1\u05D9\u05DD': []
    };
    return demo[sheet] || [];
  },

  /* Fetch with demo fallback */
  async getData(sheet) {
    if (this.USE_API) {
      try {
        const data = await this.fetchSheet(sheet);
        if (data && data.length > 0) return data;
      } catch(e) {
        /* fallback to demo data */
      }
    }
    return this.getDemoData(sheet);
  },

  /* ==============================
     THEME
     ============================== */
  applyTheme() {
    const theme = localStorage.getItem(this.THEME_KEY) || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    const icon = document.querySelector('#theme-toggle i');
    if (icon) icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';

    // Auto dark mode on Friday evening (Shabbat)
    const now = new Date();
    const day = now.getDay(); // 5=Friday, 6=Saturday
    const hour = now.getHours();
    if ((day === 5 && hour >= 16) || day === 6 || (day === 0 && hour < 1)) {
      // It's Shabbat time - suggest dark mode
      if (localStorage.getItem(this.THEME_KEY) !== 'dark' && !sessionStorage.getItem('bht_shabbat_dark')) {
        sessionStorage.setItem('bht_shabbat_dark', '1');
        // Don't auto-switch, just add a note
      }
    }
  },

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(this.THEME_KEY, next);
    // Smooth transition
    document.documentElement.style.transition = 'background-color .3s, color .3s';
    this.applyTheme();
    setTimeout(() => { document.documentElement.style.transition = ''; }, 400);
  },

  /* ==============================
     LOADING OVERLAY
     ============================== */
  showLoading(msg) {
    let el = document.getElementById('global-loading');
    if (!el) {
      document.body.insertAdjacentHTML('beforeend', `<div id="global-loading" class="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style="background:rgba(255,255,255,.8);z-index:9999;backdrop-filter:blur(4px)"><div class="text-center"><div class="spinner-border text-primary mb-3" style="width:3rem;height:3rem"></div><div class="fw-bold" id="loading-text"></div></div></div>`);
      el = document.getElementById('global-loading');
    }
    document.getElementById('loading-text').textContent = msg || '\u05D8\u05D5\u05E2\u05DF...';
    el.style.display = '';
  },
  hideLoading() {
    const el = document.getElementById('global-loading');
    if (el) el.style.display = 'none';
  },

  /* ==============================
     GLOBAL EVENTS
     ============================== */
  bindGlobalEvents() {
    // Login
    document.getElementById('login-btn').addEventListener('click', () => this.handleLogin());
    document.getElementById('pin-input').addEventListener('keyup', (e) => {
      this.updatePinDots(e.target.value.length);
      if (e.key === 'Enter') this.handleLogin();
    });

    // Logout
    document.getElementById('logout-btn').addEventListener('click', (e) => {
      e.preventDefault();
      this.logout();
    });

    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());

    // Hash routing + close FAB menu on navigation
    window.addEventListener('hashchange', () => {
      if (this.isLoggedIn()) this.handleRoute();
      document.getElementById('fab-menu')?.classList.add('d-none');
    });

    // Sidebar collapsible categories
    this.initSidebarCategories();

    // Global search
    this.initGlobalSearch();

    // Scroll to top button
    window.addEventListener('scroll', () => {
      const btn = document.getElementById('scroll-top');
      if (btn) btn.classList.toggle('d-none', window.scrollY < 300);
    });

    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      const tag = e.target.tagName;
      const inInput = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target.isContentEditable;

      // Ctrl+K or Cmd+K = focus search / command palette (always active)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.toggleCommandPalette();
        return;
      }

      // Ctrl+D = open phone dialer
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        location.hash = 'phone';
        return;
      }

      // Ctrl+E = open email
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        location.hash = 'email';
        return;
      }

      // Ctrl+H = go to dashboard (home)
      if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        location.hash = 'dashboard';
        return;
      }

      // Ctrl+Shift+P = quick print current page
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        window.print();
        return;
      }

      // Escape = close search dropdown, close modals, close command palette
      if (e.key === 'Escape') {
        const search = document.getElementById('global-search');
        if (search && document.activeElement === search) {
          search.value = '';
          search.blur();
          document.getElementById('search-results')?.classList.remove('show');
        }
        // Close any open Bootstrap modals
        document.querySelectorAll('.modal.show').forEach(m => {
          const inst = bootstrap.Modal.getInstance(m);
          if (inst) inst.hide();
        });
        // Close command palette
        document.getElementById('command-palette')?.remove();
        // Close shortcuts overlay
        document.getElementById('shortcuts-overlay')?.remove();
        return;
      }

      // Skip navigation shortcuts when user is typing in a form field
      if (inInput) return;

      // ? = open keyboard shortcuts overlay
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        this.toggleShortcutsOverlay();
        return;
      }

      // Ctrl+1..4 = quick page navigation
      if (e.ctrlKey || e.metaKey) {
        const navMap = { '1': 'dashboard', '2': 'students', '3': 'attendance', '4': 'finance' };
        if (navMap[e.key]) {
          e.preventDefault();
          location.hash = navMap[e.key];
        }
      }
    });
  },

  // Form draft auto-save: persist values of inputs inside an open modal every 2s,
  // restore on next open. Cleared when modal is hidden via dismiss-data attr.
  initFormDrafts() {
    const DRAFT_PREFIX = 'bht_draft_';
    let saveTimer = null;
    const collectInputs = (modal) => modal.querySelectorAll('input:not([type="hidden"]):not([type="file"]), select, textarea');
    const draftKey = (modal) => DRAFT_PREFIX + (modal.id || 'anon');

    document.addEventListener('show.bs.modal', (e) => {
      const modal = e.target;
      if (!modal || !modal.id) return;
      // Restore prior draft, if any (only when there are no values pre-filled by editor)
      try {
        const raw = localStorage.getItem(draftKey(modal));
        if (!raw) return;
        const draft = JSON.parse(raw);
        if (Date.now() - draft.t > 7 * 86400000) { localStorage.removeItem(draftKey(modal)); return; }
        // Only restore if the modal isn't being opened with editing data (heuristic: any non-empty input present)
        const inputs = collectInputs(modal);
        const hasValues = [...inputs].some(i => (i.value || '').trim());
        if (hasValues) return;
        inputs.forEach(i => { if (draft.v[i.id || i.name] !== undefined) i.value = draft.v[i.id || i.name]; });
        if (Utils.toast) Utils.toast('שוחזרה טיוטה קודמת', 'info');
      } catch(e) { /* silent */ }
    });

    document.addEventListener('input', (e) => {
      const modal = e.target.closest('.modal.show');
      if (!modal || !modal.id) return;
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => {
        const v = {};
        collectInputs(modal).forEach(i => { const k = i.id || i.name; if (k && i.value) v[k] = i.value; });
        if (Object.keys(v).length) Utils.safeSetItem(draftKey(modal), JSON.stringify({ t: Date.now(), v }));
      }, 2000);
    });

    document.addEventListener('hidden.bs.modal', (e) => {
      // Successful save handlers should clear the draft via App.clearFormDraft(modalId);
      // Otherwise keep it for recovery. Nothing to do here.
    });
  },

  clearFormDraft(modalId) {
    try { localStorage.removeItem('bht_draft_' + modalId); } catch(e) { /* silent */ }
  },

  // Route progress bar (NProgress-lite) — call on every navigation
  _showRouteBar() {
    let bar = document.getElementById('route-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'route-bar';
      document.body.appendChild(bar);
    }
    bar.classList.remove('done');
    bar.style.width = '0';
    requestAnimationFrame(() => { bar.style.width = '70%'; });
  },
  _hideRouteBar() {
    const bar = document.getElementById('route-bar');
    if (!bar) return;
    bar.classList.add('done');
    setTimeout(() => bar.remove(), 350);
  },

  // Sync mobile bottom-nav active state on route change
  _syncBottomNav(page) {
    document.querySelectorAll('#mobile-bottom-nav a').forEach(a => {
      a.classList.toggle('active', a.dataset.page === page);
    });
  },

  // Mobile enhancements: keyboard-aware focus scroll + haptic on critical taps
  initMobileEnhancements() {
    // Scroll focused inputs into view (iOS keyboard hides field otherwise)
    document.addEventListener('focusin', (e) => {
      if (!e.target.matches('input, textarea, select')) return;
      if (e.target.type === 'hidden') return;
      // Only on touch devices (avoid jumpy desktop)
      if (!('ontouchstart' in window)) return;
      setTimeout(() => {
        try { e.target.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch(_) { /* silent */ }
      }, 300);
    });

    // Haptic on form submit + delete buttons
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('button[type="submit"], .btn-danger, [data-haptic]');
      if (btn && Utils.haptic) Utils.haptic(8);
    });

    // Button ripple effect (skip btn-link, anchors styled as nav)
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.addEventListener('pointerdown', (e) => {
        const b = e.target.closest('.btn:not(.btn-link):not(.btn-close)');
        if (!b) return;
        const r = b.getBoundingClientRect();
        const s = Math.max(r.width, r.height);
        const x = e.clientX - r.left - s / 2;
        const y = e.clientY - r.top - s / 2;
        const d = document.createElement('span');
        d.className = 'ripple';
        d.style.cssText = `width:${s}px;height:${s}px;left:${x}px;top:${y}px`;
        b.appendChild(d);
        setTimeout(() => d.remove(), 550);
      });
    }
  },

  // Number counter roll-up (for stat cards). Respects prefers-reduced-motion.
  countTo(el, to, ms = 900) {
    if (!el) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = Number(to).toLocaleString('he-IL');
      return;
    }
    const from = parseFloat(el.dataset.from || '0') || 0;
    const t0 = performance.now();
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / ms);
      const eased = 1 - Math.pow(1 - k, 3);
      const v = Math.round(from + (to - from) * eased);
      el.textContent = v.toLocaleString('he-IL');
      if (k < 1) requestAnimationFrame(tick);
      else el.dataset.from = String(to);
    };
    requestAnimationFrame(tick);
  },

  toggleShortcutsOverlay() {
    const existing = document.getElementById('shortcuts-overlay');
    if (existing) { existing.remove(); return; }
    const shortcuts = [
      { keys: ['Ctrl', 'K'],            desc: 'חיפוש / Command Palette' },
      { keys: ['Ctrl', 'H'],            desc: 'דף הבית (לוח בקרה)' },
      { keys: ['Ctrl', '1'],            desc: 'לוח בקרה' },
      { keys: ['Ctrl', '2'],            desc: 'תלמידים' },
      { keys: ['Ctrl', '3'],            desc: 'נוכחות' },
      { keys: ['Ctrl', '4'],            desc: 'תשלומים' },
      { keys: ['Ctrl', 'D'],            desc: 'חייגן טלפון' },
      { keys: ['Ctrl', 'E'],            desc: 'דואר' },
      { keys: ['Ctrl', 'Shift', 'P'],   desc: 'הדפסת הדף הנוכחי' },
      { keys: ['Esc'],                  desc: 'סגור מודל / חיפוש / Command Palette' },
      { keys: ['?'],                    desc: 'הצג תפריט קיצורים זה' }
    ];
    const kbd = (k) => `<kbd style="background:#f3f4f6;border:1px solid #d1d5db;border-bottom-width:2px;border-radius:.3rem;padding:.15rem .45rem;font-size:.8rem;font-family:ui-monospace,monospace">${k}</kbd>`;
    const html = `
      <div id="shortcuts-overlay" style="position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9999;display:flex;align-items:center;justify-content:center;padding:1rem" onclick="if(event.target===this)this.remove()">
        <div style="background:var(--bs-body-bg,#fff);color:var(--bs-body-color,#212529);border-radius:.75rem;max-width:520px;width:100%;max-height:85vh;overflow:auto;box-shadow:0 20px 60px rgba(0,0,0,.3)" role="dialog" aria-label="קיצורי מקלדת">
          <div class="d-flex justify-content-between align-items-center px-4 pt-3 pb-2 border-bottom">
            <h5 class="mb-0"><i class="bi bi-keyboard me-2"></i>קיצורי מקלדת</h5>
            <button class="btn-close" onclick="document.getElementById('shortcuts-overlay').remove()" aria-label="סגור"></button>
          </div>
          <div class="p-4">
            ${shortcuts.map(s => `<div class="d-flex justify-content-between align-items-center py-2 border-bottom" style="border-color:rgba(0,0,0,.05) !important">
              <span>${s.desc}</span>
              <span class="d-flex gap-1">${s.keys.map(kbd).join('<span class="text-muted mx-1">+</span>')}</span>
            </div>`).join('')}
            <div class="text-muted small mt-3 text-center">לחץ <kbd>?</kbd> בכל זמן להחזיר את התפריט</div>
          </div>
        </div>
      </div>`;
    document.body.insertAdjacentHTML('beforeend', html);
  },

  /* ==============================
     SIDEBAR CATEGORIES
     ============================== */
  initSidebarCategories() {
    const STORAGE_KEY = 'bht_sidebar_cats';
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch(e) { /* silent */ }

    document.querySelectorAll('.sidebar-category').forEach(cat => {
      const key = cat.dataset.cat;
      const btn = cat.querySelector('.sidebar-cat-header');
      const body = cat.querySelector('.sidebar-cat-body');
      if (!btn || !body) return;

      // Restore state (default: only students+staff open)
      const defaultOpen = ['students', 'staff'];
      const isOpen = saved[key] !== undefined ? saved[key] !== false : defaultOpen.includes(key);
      if (!isOpen) {
        body.classList.add('collapsed');
        btn.setAttribute('aria-expanded', 'false');
      }

      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') !== 'false';
        if (expanded) {
          body.classList.add('collapsed');
          btn.setAttribute('aria-expanded', 'false');
          saved[key] = false;
        } else {
          body.classList.remove('collapsed');
          btn.setAttribute('aria-expanded', 'true');
          saved[key] = true;
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
      });
    });
  },

  /* ==============================
     GLOBAL SEARCH
     ============================== */
  initAutoRefresh() {
    if (this._autoRefreshId) clearInterval(this._autoRefreshId);
    // Refresh data every 2 minutes
    this._autoRefreshId = setInterval(() => {
      if (this.isLoggedIn() && document.visibilityState === 'visible') {
        // Clear expired cache entries
        Object.keys(localStorage).forEach(k => {
          if (k.startsWith(this.CACHE_PREFIX)) {
            try {
              const { ts } = JSON.parse(localStorage.getItem(k));
              if (Date.now() - ts > this.CACHE_TTL) localStorage.removeItem(k);
            } catch(e) { localStorage.removeItem(k); }
          }
        });
        // Refresh notifications
        this.loadNotifications();
        this.updateSyncStatus();
      }
    }, 120000);

    // Weekly backup reminder (check once per session)
    if (!sessionStorage.getItem('bht_backup_reminded')) {
      const lastBackup = localStorage.getItem('bht_last_backup') || '2000-01-01';
      const daysSince = Math.round((Date.now() - new Date(lastBackup).getTime()) / 86400000);
      if (daysSince > 7) {
        setTimeout(() => {
          Utils.toast('💾 לא בוצע גיבוי מזה ' + daysSince + ' ימים. מומלץ לגבות!', 'warning');
        }, 5000);
      }
      sessionStorage.setItem('bht_backup_reminded', '1');
    }

    // Online/offline events
    window.addEventListener('online', () => {
      document.getElementById('offline-badge')?.classList.add('d-none');
      Utils.toast('\u05D7\u05D9\u05D1\u05D5\u05E8 \u05D7\u05D6\u05E8', 'success');
      // Re-fetch current page data
      if (this.isLoggedIn()) this.handleRoute();
    });

    window.addEventListener('offline', () => {
      document.getElementById('offline-badge')?.classList.remove('d-none');
      Utils.toast('\u05D0\u05D9\u05DF \u05D7\u05D9\u05D1\u05D5\u05E8 - \u05DE\u05E6\u05D1 \u05D0\u05D5\u05E4\u05DC\u05D9\u05D9\u05DF', 'warning');
    });
  },

  // Version check
  checkVersion() {
    const stored = localStorage.getItem('bht_version');
    const current = 'v6.8';
    if (stored && stored !== current) {
      // Clear old caches on version change
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith(this.CACHE_PREFIX)) localStorage.removeItem(k);
      });
      Utils.toast('\u05D2\u05E8\u05E1\u05D4 \u05D7\u05D3\u05E9\u05D4 \u05E0\u05D8\u05E2\u05E0\u05D4!', 'info');
    }
    localStorage.setItem('bht_version', current);
  },

  /* ==============================
     NOTIFICATIONS
     ============================== */
  async loadNotifications() {
    try {
      const [fin, tasks, hw, events] = await Promise.all([
        this.getData('\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3').catch(()=>[]),
        this.getData('\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA').catch(()=>[]),
        this.getData('\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9_\u05D1\u05D9\u05EA').catch(()=>[]),
        this.getData('\u05DC\u05D5\u05D7_\u05E9\u05E0\u05D4').catch(()=>[])
      ]);
      const today = typeof Utils !== 'undefined' && Utils.todayISO ? Utils.todayISO() : new Date().toISOString().slice(0,10);
      const notifs = [];

      // Unpaid tuition
      const unpaid = fin.filter(f => (f['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') !== '\u05E9\u05D5\u05DC\u05DD');
      if (unpaid.length) notifs.push({icon:'bi-cash text-danger', text: unpaid.length + ' \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD \u05DC\u05D0 \u05E9\u05D5\u05DC\u05DE\u05D5', link:'#finance'});

      // Pending tasks
      const pending = tasks.filter(t => (t['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') === '\u05D7\u05D3\u05E9');
      if (pending.length) notifs.push({icon:'bi-kanban text-primary', text: pending.length + ' \u05DE\u05E9\u05D9\u05DE\u05D5\u05EA \u05DE\u05DE\u05EA\u05D9\u05E0\u05D5\u05EA', link:'#tasks'});

      // Overdue homework
      const overdue = hw.filter(h => (h['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05D4\u05D2\u05E9\u05D4']||'') < today && (h['\u05E1\u05D8\u05D8\u05D5\u05E1']||'') !== '\u05D4\u05D5\u05E9\u05DC\u05DD');
      if (overdue.length) notifs.push({icon:'bi-book text-warning', text: overdue.length + ' \u05E9\u05D9\u05E2\u05D5\u05E8\u05D9 \u05D1\u05D9\u05EA \u05D1\u05D0\u05D9\u05D7\u05D5\u05E8', link:'#homework'});

      // Today's events
      const todayEvents = events.filter(e => (e['\u05EA\u05D0\u05E8\u05D9\u05DA']||'').startsWith(today));
      todayEvents.forEach(e => notifs.push({icon:'bi-calendar-event text-success', text: '\u05D4\u05D9\u05D5\u05DD: ' + (e['\u05DB\u05D5\u05EA\u05E8\u05EA']||'\u05D0\u05D9\u05E8\u05D5\u05E2'), link:'#calendar'}));

      // Update badge
      const badge = document.getElementById('notif-count');
      if (badge) {
        if (notifs.length > 0) { badge.textContent = notifs.length; badge.classList.remove('d-none'); }
        else { badge.classList.add('d-none'); }
      }

      // Update dropdown
      const list = document.getElementById('notif-list');
      if (list) {
        if (!notifs.length) {
          list.innerHTML = '<div class="text-center text-muted p-3 small">\u05D0\u05D9\u05DF \u05D4\u05EA\u05E8\u05D0\u05D5\u05EA \u05D7\u05D3\u05E9\u05D5\u05EA</div>';
        } else {
          list.innerHTML = notifs.map(n =>
            `<a href="${n.link}" class="dropdown-item d-flex align-items-center gap-2 py-2"><i class="bi ${n.icon}"></i><span class="small">${n.text}</span></a>`
          ).join('');
        }
      }
    } catch(e) { /* notification load failed silently */ }
  },

  initGlobalSearch() {
    const input = document.getElementById('global-search');
    const results = document.getElementById('search-results');
    if (!input || !results) return;

    // Recent searches helper
    const RECENT_KEY = 'bht_recent_searches';
    const saveRecent = (q) => {
      if (!q || q.length < 2) return;
      let r = []; try { r = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]'); } catch(e) { r = []; }
      r = [q, ...r.filter(x => x !== q)].slice(0, 8);
      Utils.safeSetItem(RECENT_KEY, JSON.stringify(r));
    };

    input.addEventListener('input', Utils.debounce(async () => {
      const raw = input.value.trim();
      if (raw.length < 2) {
        // Empty state \u2014 show recent searches as chips
        let r = []; try { r = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]'); } catch(e) {}
        if (r.length) {
          results.innerHTML = `<div class="px-2 pt-2 pb-1 small text-muted">\u05D7\u05D9\u05E4\u05D5\u05E9\u05D9\u05DD \u05D0\u05D7\u05E8\u05D5\u05E0\u05D9\u05DD</div><div class="px-2 pb-2">${r.map(t => `<a class="badge bg-light text-dark me-1 mb-1 search-chip" style="cursor:pointer" data-q="${Utils.escapeHTML(t)}">${Utils.escapeHTML(t)}</a>`).join('')}</div>`;
          results.querySelectorAll('.search-chip').forEach(c => c.onclick = () => { input.value = c.dataset.q; input.dispatchEvent(new Event('input')); });
          results.classList.add('show');
        } else {
          results.classList.remove('show');
        }
        return;
      }

      const q = raw.toLowerCase();
      const norm = Utils.hebNormalize ? Utils.hebNormalize.bind(Utils) : (x) => String(x||'').toLowerCase();
      const qN = norm(raw);
      const tokens = qN.split(/\s+/).filter(t => t.length >= 2);
      const qDigits = q.replace(/\D/g, '');
      const phoneMatch = (v) => qDigits && String(v||'').replace(/\D/g, '').includes(qDigits);
      const blob = (...parts) => norm(parts.filter(Boolean).join(' '));
      const matches = (text) => tokens.length ? tokens.every(t => text.includes(t)) : text.includes(qN);

      const [students, staff, parents] = await Promise.all([
        App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD').catch(()=>[]),
        App.getData('\u05E6\u05D5\u05D5\u05EA').catch(()=>[]),
        App.getData('\u05D4\u05D5\u05E8\u05D9\u05DD').catch(()=>[])
      ]);

      // Highlight helper
      const hl = (txt) => {
        const e = Utils.escapeHTML(txt || '');
        if (!q) return e;
        const i = e.toLowerCase().indexOf(q.toLowerCase());
        return i < 0 ? e : e.slice(0, i) + '<mark class="p-0">' + e.slice(i, i + q.length) + '</mark>' + e.slice(i + q.length);
      };

      let hits = [];
      students.forEach(s => {
        const name = Utils.fullName(s);
        const text = blob(name, s['\u05DB\u05D9\u05EA\u05D4'], s['\u05DB\u05EA\u05D5\u05D1\u05EA']);
        if (matches(text) || phoneMatch(s['\u05D8\u05DC\u05E4\u05D5\u05DF']))
          hits.push({name, type:'\u05EA\u05DC\u05DE\u05D9\u05D3', icon:'bi-person-fill', color:'primary', link:'#student/'+Utils.rowId(s), sub:'\u05DB\u05D9\u05EA\u05D4 '+(s['\u05DB\u05D9\u05EA\u05D4']||'')});
      });
      staff.forEach(s => {
        const name = Utils.fullName(s);
        const text = blob(name, s['\u05EA\u05E4\u05E7\u05D9\u05D3']);
        if (matches(text) || phoneMatch(s['\u05D8\u05DC\u05E4\u05D5\u05DF']))
          hits.push({name, type:'\u05E6\u05D5\u05D5\u05EA', icon:'bi-person-badge-fill', color:'success', link:'#staff_card/'+Utils.rowId(s), sub:s['\u05EA\u05E4\u05E7\u05D9\u05D3']||''});
      });
      parents.forEach(p => {
        const text = blob(p['\u05E9\u05DD']);
        if (matches(text) || phoneMatch(p['\u05D8\u05DC\u05E4\u05D5\u05DF']))
          hits.push({name:p['\u05E9\u05DD']||'', type:'\u05D4\u05D5\u05E8\u05D4', icon:'bi-house-heart-fill', color:'warning', link:'#parent_card/'+Utils.rowId(p), sub:p['\u05E7\u05E9\u05E8']||''});
      });

      if (!hits.length) {
        results.innerHTML = `<div class="p-3 text-muted text-center small">\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA. \u05E0\u05E1\u05D4 <kbd>Ctrl+K</kbd> \u05DC\u05D7\u05D9\u05E4\u05D5\u05E9 \u05DE\u05EA\u05E7\u05D3\u05DD</div>`;
      } else {
        // Rank: exact name match first, then name-starts-with, then anywhere-includes
        hits.sort((a, b) => {
          const an = (a.name||'').toLowerCase(), bn = (b.name||'').toLowerCase();
          const score = (n) => n === q ? 3 : n.startsWith(q) ? 2 : 1;
          return score(bn) - score(an);
        });
        // Category counts header
        const counts = hits.reduce((a, h) => (a[h.type] = (a[h.type] || 0) + 1, a), {});
        const header = `<div class="px-2 py-1 small text-muted border-bottom">${Object.entries(counts).map(([t, n]) => `<span class="me-2">${n} ${t}</span>`).join('')}</div>`;
        results.innerHTML = header + hits.slice(0,10).map((h, i) =>
          `<a href="${h.link}" class="dropdown-item d-flex align-items-center gap-2 py-2 search-hit" data-idx="${i}" onclick="document.getElementById('search-results').classList.remove('show');document.getElementById('global-search').value=''">
            <i class="bi ${h.icon} text-${h.color}" aria-hidden="true"></i>
            <div class="flex-grow-1"><div class="fw-bold small">${hl(h.name)}</div><small class="text-muted">${Utils.escapeHTML(h.type)} ${h.sub?'| '+hl(h.sub):''}</small></div>
            ${i < 9 ? `<kbd class="small text-muted ms-auto">${i+1}</kbd>` : ''}
          </a>`
        ).join('');
        // Save the query as recent (if user actually clicks; we'll save here for safety)
        saveRecent(raw);
      }
      results.classList.add('show');
      this._searchSelectedIdx = -1;
    }, 300));

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#global-search') && !e.target.closest('#search-results'))
        results.classList.remove('show');
    });

    // Keyboard navigation: arrow keys to highlight, Enter to navigate, Esc to close
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { results.classList.remove('show'); input.value = ''; this._searchSelectedIdx = -1; return; }
      const hits = results.querySelectorAll('.search-hit');
      if (!hits.length) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this._searchSelectedIdx = Math.min((this._searchSelectedIdx ?? -1) + 1, hits.length - 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this._searchSelectedIdx = Math.max((this._searchSelectedIdx ?? 0) - 1, 0);
      } else if (e.key === 'Enter') {
        if (this._searchSelectedIdx >= 0 && hits[this._searchSelectedIdx]) {
          e.preventDefault();
          hits[this._searchSelectedIdx].click();
        }
        return;
      } else { return; }
      hits.forEach((h, i) => h.classList.toggle('active', i === this._searchSelectedIdx));
      hits[this._searchSelectedIdx]?.scrollIntoView({ block: 'nearest' });
    });
  },

  /* ==============================
     RECENT PAGES TRACKER
     ============================== */
  trackRecentPage(page, param) {
    // Sub-pages (student/staff/parent cards) feed a separate "recent records" list
    if (['student','staff_card','parent_card'].includes(page)) {
      if (param) this.trackRecentRecord(page, param);
      return;
    }
    const key = 'bht_recent_pages';
    let recent = [];
    try { recent = JSON.parse(localStorage.getItem(key) || '[]'); } catch(e) { /* silent */ }
    recent = recent.filter(p => p !== page);
    recent.unshift(page);
    recent = recent.slice(0, 5);
    Utils.safeSetItem(key, JSON.stringify(recent));
    this.renderRecentPages(recent);
  },

  trackRecentRecord(type, id) {
    const key = 'bht_recent_records';
    let recent = [];
    try { recent = JSON.parse(localStorage.getItem(key) || '[]'); } catch(e) { /* silent */ }
    recent = recent.filter(r => !(r.type === type && r.id === id));
    recent.unshift({ type, id, ts: Date.now() });
    recent = recent.slice(0, 12);
    Utils.safeSetItem(key, JSON.stringify(recent));
  },

  // Returns last N visited cards with resolved name/class for the renderer.
  // Called by dashboard widget / command palette.
  getRecentRecords(limit = 6) {
    let recent = [];
    try { recent = JSON.parse(localStorage.getItem('bht_recent_records') || '[]'); } catch(e) { return []; }
    if (typeof DATA_CACHE === 'undefined') return [];
    const sheets = { student: 'תלמידים', staff_card: 'צוות', parent_card: 'הורים' };
    const idKey = 'מזהה';
    return recent.slice(0, limit).map(r => {
      const sheet = sheets[r.type];
      const rows = DATA_CACHE[sheet] || [];
      const row = rows.find(x => String(x[idKey]||'') === String(r.id));
      if (!row) return null;
      const name = Utils.fullName(row) || row['שם'] || '';
      const sub = r.type === 'student' ? ('כיתה ' + (row['כיתה']||'')) : r.type === 'staff_card' ? (row['תפקיד']||'') : (row['קשר']||'');
      return { type: r.type, id: r.id, name, sub, link: '#' + r.type + '/' + r.id, ts: r.ts };
    }).filter(Boolean);
  },

  renderRecentPages(recent) {
    const container = document.getElementById('recent-pages');
    if (!container || !recent.length) return;
    const labels = {
      dashboard:'\u05DC\u05D5\u05D7 \u05D1\u05E7\u05E8\u05D4', students:'\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD', attendance:'\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA', staff:'\u05E6\u05D5\u05D5\u05EA',
      parents:'\u05D4\u05D5\u05E8\u05D9\u05DD', finance:'\u05DB\u05E1\u05E4\u05D9\u05DD', behavior:'\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA', homework:'\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9 \u05D1\u05D9\u05EA',
      academics:'\u05DE\u05D1\u05D7\u05E0\u05D9\u05DD', tasks:'\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA', calendar:'\u05DC\u05D5\u05D7 \u05E9\u05E0\u05D4', communications:'\u05EA\u05E7\u05E9\u05D5\u05E8\u05EA',
      reports:'\u05D3\u05D5\u05D7\u05D5\u05EA', settings:'\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA', pettycash:'\u05E7\u05D5\u05E4\u05D4 \u05E7\u05D8\u05E0\u05D4', budget:'\u05EA\u05E7\u05E6\u05D9\u05D1',
      trips:'\u05D8\u05D9\u05D5\u05DC\u05D9\u05DD', mivtza:'\u05DE\u05D1\u05E6\u05E2 \u05DC\u05D9\u05DE\u05D5\u05D3', rankings:'\u05D3\u05D9\u05E8\u05D5\u05D2\u05D9\u05DD', schedule:'\u05DE\u05E2\u05E8\u05DB\u05EA \u05E9\u05E2\u05D5\u05EA',
      documents:'\u05DE\u05E1\u05DE\u05DB\u05D9\u05DD', medical:'\u05E8\u05E4\u05D5\u05D0\u05D9', committees:'\u05D5\u05E2\u05D3\u05D5\u05EA', institutions:'\u05DE\u05E1\u05D2\u05E8\u05D5\u05EA',
      staff_salary:'\u05E9\u05DB\u05E8 \u05E6\u05D5\u05D5\u05EA', attendance_monthly:'\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D7\u05D5\u05D3\u05E9\u05D9\u05EA', forms:'\u05D8\u05E4\u05E1\u05D9\u05DD',
      ai_assistant:'\u05E2\u05D5\u05D6\u05E8 AI', user_management:'\u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD', activity_log:'\u05D9\u05D5\u05DE\u05DF', hub:'\u05DE\u05E8\u05DB\u05D6',
      help:'\u05E2\u05D6\u05E8\u05D4', phone:'\u05D8\u05DC\u05E4\u05D5\u05DF', cameras:'\u05DE\u05E6\u05DC\u05DE\u05D5\u05EA',
      email:'\u05D3\u05D5\u05D0\u05E8', drive:'\u05E7\u05D1\u05E6\u05D9\u05DD', printcenter:'\u05D4\u05D3\u05E4\u05E1\u05D5\u05EA', notifications:'\u05D4\u05EA\u05E8\u05D0\u05D5\u05EA',
      tala:'\u05EA\u05DC\"\u05D0', whatsapp:'\u05EA\u05E7\u05E9\u05D5\u05E8\u05EA \u05D8\u05DC\u05E4\u05D5\u05E0\u05D9\u05EA', checklist:'\u05E6\u05E7\u05DC\u05D9\u05E1\u05D8',
      donations:'\u05EA\u05E8\u05D5\u05DE\u05D5\u05EA', analytics:'\u05E0\u05D9\u05EA\u05D5\u05D7\u05D9\u05DD', hebrewcal:'\u05DC\u05D5\u05D7 \u05E2\u05D1\u05E8\u05D9',
      emergency:'\u05D7\u05D9\u05E8\u05D5\u05DD', contacts:'\u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8', bulletin:'\u05DC\u05D5\u05D7 \u05DE\u05D5\u05D3\u05E2\u05D5\u05EA',
      library:'\u05E1\u05E4\u05E8\u05D9\u05D4', inventory:'\u05DE\u05DC\u05D0\u05D9', rewards:'\u05E4\u05E8\u05E1\u05D9\u05DD', gradebook:'\u05D2\u05E8\u05D3\u05D1\u05D5\u05E7'
    };
    container.innerHTML = recent.map(p =>
      `<a href="#${p}" class="badge bg-light text-dark text-decoration-none me-1 px-2 py-1" style="font-size:.75rem">${labels[p]||p}</a>`
    ).join('');
  },

  /* ==============================
     DATA FRESHNESS INDICATOR
     ============================== */
  updateSyncStatus() {
    const el = document.getElementById('sync-status');
    if (!el) return;
    // Prefer bundled DATA_CACHE timestamp (set by refresh_data.py); fall back to LS cache age.
    let latest = 0;
    let source = '';
    try {
      if (typeof DATA_CACHE !== 'undefined' && DATA_CACHE._lastUpdated) {
        latest = new Date(DATA_CACHE._lastUpdated).getTime();
        if (!isNaN(latest)) source = 'bundle';
      }
    } catch(e) { /* silent */ }
    if (!latest) {
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith(this.CACHE_PREFIX)) {
          try { const {ts} = JSON.parse(localStorage.getItem(k)); if (ts > latest) latest = ts; } catch(e) { /* silent */ }
        }
      });
      if (latest) source = 'ls';
    }
    if (!latest) return;
    const ageMs = Date.now() - latest;
    const mins = Math.round(ageMs / 60000);
    const hrs = Math.floor(mins / 60);
    const days = Math.floor(hrs / 24);
    let label;
    if (mins < 1) label = '\u05E2\u05D5\u05D3\u05DB\u05DF \u05E2\u05DB\u05E9\u05D9\u05D5';
    else if (mins < 60) label = `\u05E2\u05D5\u05D3\u05DB\u05DF \u05DC\u05E4\u05E0\u05D9 ${mins} \u05D3\u05E7'`;
    else if (hrs < 24) label = `\u05E2\u05D5\u05D3\u05DB\u05DF \u05DC\u05E4\u05E0\u05D9 ${hrs} \u05E9\u05E2'`;
    else label = `\u05E2\u05D5\u05D3\u05DB\u05DF \u05DC\u05E4\u05E0\u05D9 ${days} \u05D9\u05DE\u05D9\u05DD`;
    // Color hint: warn if bundle older than 1 day
    const color = (source === 'bundle' && days >= 1) ? 'text-warning' : 'text-muted';
    el.className = `small ${color} mt-1`;
    el.innerHTML = `<i class="bi bi-arrow-repeat me-1"></i>${label}`;
    el.title = new Date(latest).toLocaleString('he-IL');
  },

  /* ==============================
     QUICK NOTE
     ============================== */
  async quickNote() {
    const students = await this.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD').catch(()=>[]);
    const html = `<div class="modal fade" id="quick-note-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header bg-info text-white"><h5><i class="bi bi-sticky me-2"></i>\u05D4\u05E2\u05E8\u05D4 \u05DE\u05D4\u05D9\u05E8\u05D4</h5><button class="btn-close btn-close-white" data-bs-dismiss="modal"></button></div><div class="modal-body">
    <div class="mb-3"><label class="form-label">\u05EA\u05DC\u05DE\u05D9\u05D3</label><select class="form-select" id="qn-student"><option value="">\u05D1\u05D7\u05E8 \u05EA\u05DC\u05DE\u05D9\u05D3...</option>${students.map(s=>`<option value="${Utils.rowId(s)}">${Utils.fullName(s)}</option>`).join('')}</select></div>
    <div class="mb-3"><label class="form-label">\u05D4\u05E2\u05E8\u05D4</label><textarea class="form-control" id="qn-text" rows="3" placeholder="\u05DB\u05EA\u05D5\u05D1 \u05D4\u05E2\u05E8\u05D4..."></textarea></div>
    <div class="mb-3"><label class="form-label">\u05E1\u05D5\u05D2</label><div class="btn-group w-100"><button class="btn btn-outline-success active" onclick="this.parentElement.querySelectorAll('.btn').forEach(b=>b.classList.remove('active'));this.classList.add('active');document.getElementById('qn-type').value='\u05D7\u05D9\u05D5\u05D1\u05D9'">\u05D7\u05D9\u05D5\u05D1\u05D9</button><button class="btn btn-outline-danger" onclick="this.parentElement.querySelectorAll('.btn').forEach(b=>b.classList.remove('active'));this.classList.add('active');document.getElementById('qn-type').value='\u05E9\u05DC\u05D9\u05DC\u05D9'">\u05E9\u05DC\u05D9\u05DC\u05D9</button><button class="btn btn-outline-secondary" onclick="this.parentElement.querySelectorAll('.btn').forEach(b=>b.classList.remove('active'));this.classList.add('active');document.getElementById('qn-type').value='\u05D4\u05E2\u05E8\u05D4'">\u05D4\u05E2\u05E8\u05D4</button></div><input type="hidden" id="qn-type" value="\u05D7\u05D9\u05D5\u05D1\u05D9"></div>
  </div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="App.saveQuickNote()">\u05E9\u05DE\u05D5\u05E8</button></div></div></div></div>`;
    document.getElementById('quick-note-modal')?.remove();
    document.body.insertAdjacentHTML('beforeend', html);
    new bootstrap.Modal(document.getElementById('quick-note-modal')).show();
  },
  async saveQuickNote() {
    const studentSel = document.getElementById('qn-student');
    const text = document.getElementById('qn-text')?.value?.trim();
    const type = document.getElementById('qn-type')?.value || '\u05D4\u05E2\u05E8\u05D4';
    if (!studentSel?.value || !text) { Utils.toast('\u05D1\u05D7\u05E8 \u05EA\u05DC\u05DE\u05D9\u05D3 \u05D5\u05DB\u05EA\u05D5\u05D1 \u05D4\u05E2\u05E8\u05D4','warning'); return; }
    try {
      await this.apiCall('add','\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA',{row:{'\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4':studentSel.value,'\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3':studentSel.selectedOptions[0]?.text||'','\u05E1\u05D5\u05D2':type,'\u05EA\u05D9\u05D0\u05D5\u05E8':text,'\u05EA\u05D0\u05E8\u05D9\u05DA':Utils.todayISO()}});
      bootstrap.Modal.getInstance(document.getElementById('quick-note-modal'))?.hide();
      Utils.toast('\u05D4\u05E2\u05E8\u05D4 \u05E0\u05E9\u05DE\u05E8\u05D4!');
    } catch(e) { Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4','danger'); }
  },

  /* ==============================
     COMMAND PALETTE (Ctrl+K)
     ============================== */
  initCommandPalette() {
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.toggleCommandPalette();
      }
      if (e.key === 'Escape') {
        document.getElementById('command-palette')?.remove();
      }
    });
  },

  toggleCommandPalette() {
    let existing = document.getElementById('command-palette');
    if (existing) { existing.remove(); return; }

    const pages = [];
    document.querySelectorAll('.sidebar-link[data-page]').forEach(link => {
      pages.push({
        page: link.dataset.page,
        label: link.querySelector('span')?.textContent || link.dataset.page,
        icon: link.querySelector('i')?.className || 'bi bi-circle'
      });
    });

    const div = document.createElement('div');
    div.id = 'command-palette';
    div.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:9999;display:flex;align-items:flex-start;justify-content:center;padding-top:15vh;backdrop-filter:blur(4px)';
    div.innerHTML = `
      <div style="background:var(--bs-body-bg,#fff);border-radius:12px;width:90%;max-width:500px;box-shadow:0 20px 60px rgba(0,0,0,.3);overflow:hidden">
        <div style="padding:16px;border-bottom:1px solid var(--bs-border-color,#dee2e6)">
          <input type="text" id="cmd-search" class="form-control form-control-lg" placeholder="\u05D7\u05E4\u05E9 \u05E2\u05DE\u05D5\u05D3..." autofocus style="border:none;box-shadow:none;font-size:1.1rem">
        </div>
        <div id="cmd-results" style="max-height:400px;overflow-y:auto;padding:8px"></div>
      </div>`;
    document.body.appendChild(div);
    div.addEventListener('click', (e) => { if (e.target === div) div.remove(); });

    const input = document.getElementById('cmd-search');
    const results = document.getElementById('cmd-results');
    // Build student list for search
    const students = (typeof DATA_CACHE !== 'undefined' && DATA_CACHE['\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD']) ? DATA_CACHE['\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD'] : [];
    // Build email list for search
    const emails = (typeof EMAIL_CACHE !== 'undefined' && EMAIL_CACHE && EMAIL_CACHE.inbox) ? EMAIL_CACHE.inbox : [];

    const render = (filter) => {
      let html = '';
      const fLow = (filter || '').toLowerCase();

      // Pages
      const filteredPages = fLow ? pages.filter(p => p.label.includes(fLow) || p.page.includes(fLow)) : pages;
      if (filteredPages.length) {
        html += filteredPages.map(p => `
          <div class="cmd-item" data-page="${p.page}" style="padding:10px 16px;cursor:pointer;border-radius:8px;display:flex;align-items:center;gap:12px;transition:background .15s" onmouseover="this.style.background='var(--bs-primary-bg-subtle,#e7f1ff)'" onmouseout="this.style.background=''">
            <i class="${p.icon}" style="font-size:1.2rem;width:24px;text-align:center"></i>
            <span>${p.label}</span>
          </div>`).join('');
      }

      // Students (only when searching)
      if (fLow && fLow.length >= 2) {
        const matchedStudents = students.filter(s => {
          const name = ((s['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9']||'') + ' ' + (s['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4']||'')).toLowerCase();
          return name.includes(fLow);
        }).slice(0, 5);
        if (matchedStudents.length) {
          html += '<div style="padding:6px 16px;font-size:.75rem;color:var(--bs-secondary);border-top:1px solid var(--bs-border-color)">\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</div>';
          html += matchedStudents.map(s => {
            const sid = s['\u05DE\u05D6\u05D4\u05D4'] || '';
            const name = ((s['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9']||'') + ' ' + (s['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4']||'')).trim();
            return `<div class="cmd-item" data-page="student/${sid}" style="padding:10px 16px;cursor:pointer;border-radius:8px;display:flex;align-items:center;gap:12px;transition:background .15s" onmouseover="this.style.background='var(--bs-success-bg-subtle,#d1e7dd)'" onmouseout="this.style.background=''">
              <i class="bi bi-person-fill" style="font-size:1.2rem;width:24px;text-align:center;color:var(--bs-success)"></i>
              <span>${Utils.escapeHTML(name)} <small class="text-muted">${Utils.escapeHTML(s['\u05DB\u05D9\u05EA\u05D4']||'')}</small></span>
            </div>`;
          }).join('');
        }

        // Emails
        const matchedEmails = emails.filter(e =>
          (e.subject||'').toLowerCase().includes(fLow) || (e.from||'').toLowerCase().includes(fLow)
        ).slice(0, 3);
        if (matchedEmails.length) {
          html += '<div style="padding:6px 16px;font-size:.75rem;color:var(--bs-secondary);border-top:1px solid var(--bs-border-color)">\u05D3\u05D5\u05D0\u05E8</div>';
          html += matchedEmails.map(e => {
            const sender = (e.from||'').replace(/<[^>]+>/g,'').replace(/"/g,'').trim().substring(0,25);
            return `<div class="cmd-item" data-page="email" style="padding:10px 16px;cursor:pointer;border-radius:8px;display:flex;align-items:center;gap:12px;transition:background .15s" onmouseover="this.style.background='var(--bs-info-bg-subtle,#cff4fc)'" onmouseout="this.style.background=''">
              <i class="bi bi-envelope" style="font-size:1.2rem;width:24px;text-align:center;color:var(--bs-info)"></i>
              <span>${e.subject||'(\u05DC\u05DC\u05D0 \u05E0\u05D5\u05E9\u05D0)'} <small class="text-muted">\u05DE: ${sender}</small></span>
            </div>`;
          }).join('');
        }
      }

      if (!html) html = '<div style="padding:20px;text-align:center;color:var(--bs-secondary)">\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA</div>';
      results.innerHTML = html;
      results.querySelectorAll('.cmd-item').forEach(item => {
        item.addEventListener('click', () => {
          location.hash = item.dataset.page;
          div.remove();
        });
      });
    };
    render('');
    input.addEventListener('input', () => render(input.value.trim()));
    setTimeout(() => input.focus(), 50);
  },

  /* ==============================
     DRIVE CATALOG INDEX (built at runtime to save file size)
     ============================== */
  _initDriveCatalogIndex() {
    if (typeof DRIVE_CATALOG === 'undefined' || !DRIVE_CATALOG.folders) return;
    if (DRIVE_CATALOG.byName) return; // already built
    DRIVE_CATALOG.byName = {};
    DRIVE_CATALOG.byId = {};
    DRIVE_CATALOG.folders.forEach(f => {
      DRIVE_CATALOG.byId[f.folderId] = f;
      const parts = f.name.split(/\s+/);
      [f.name, ...parts].forEach(p => { if (p.length >= 2) DRIVE_CATALOG.byName[p] = f; });
      if (parts.length >= 2) DRIVE_CATALOG.byName[parts.slice(1).join(' ') + ' ' + parts[0]] = f;
    });
  },

  /* ==============================
     ERROR LOGGING
     ============================== */
  logError(type, message, source) {
    try {
      const key = 'bht_error_log';
      const log = JSON.parse(localStorage.getItem(key) || '[]');
      log.push({ t: new Date().toISOString(), type, msg: String(message).substring(0, 200), src: source || '' });
      if (log.length > 50) log.splice(0, log.length - 50);
      localStorage.setItem(key, JSON.stringify(log));
      // Update error badge
      const badge = document.getElementById('error-badge');
      if (badge) { badge.textContent = log.length; badge.classList.remove('d-none'); }
    } catch(e) { /* storage full or unavailable */ }
  },

  getErrorLog() {
    try { return JSON.parse(localStorage.getItem('bht_error_log') || '[]'); } catch(e) { return []; }
  },

  clearErrorLog() {
    localStorage.removeItem('bht_error_log');
    const badge = document.getElementById('error-badge');
    if (badge) badge.classList.add('d-none');
  },

  /* ==============================
     AUTO-SAVE INDICATOR
     ============================== */
  initAutoSaveIndicator() {
    try {
      const orig = Storage.prototype.setItem;
      const self = this;
      Storage.prototype.setItem = function(...args) {
        orig.apply(this, args);
        self.showSaveIndicator();
      };
    } catch(e) { /* ignore if override fails */ }
  },

  showSaveIndicator() {
    let el = document.getElementById('auto-save-indicator');
    if (!el) {
      el = document.createElement('div');
      el.id = 'auto-save-indicator';
      el.style.cssText = 'position:fixed;bottom:20px;left:20px;background:#198754;color:#fff;padding:6px 16px;border-radius:20px;font-size:.85rem;z-index:9998;opacity:0;transition:opacity .3s;pointer-events:none';
      el.innerHTML = '<i class="bi bi-check-circle me-1"></i>\u05E0\u05E9\u05DE\u05E8';
      document.body.appendChild(el);
    }
    el.style.opacity = '1';
    clearTimeout(this._saveTimeout);
    this._saveTimeout = setTimeout(() => { el.style.opacity = '0'; }, 1500);
  },

  /* ==============================
     SKELETON LOADER
     ============================== */
  _skeletonHTML() {
    const bar = (w, h = '16px', mb = '12px') =>
      `<div style="background:var(--bs-tertiary-bg,#e9ecef);border-radius:6px;width:${w};height:${h};margin-bottom:${mb};animation:bht-sk-pulse 1.2s ease-in-out infinite"></div>`;
    return `
      <div class="p-3" aria-busy="true" aria-label="\u05D8\u05D5\u05E2\u05DF...">
        ${bar('45%','28px','20px')}
        <div class="row g-3 mb-4">
          <div class="col-md-3">${bar('100%','90px','0')}</div>
          <div class="col-md-3">${bar('100%','90px','0')}</div>
          <div class="col-md-3">${bar('100%','90px','0')}</div>
          <div class="col-md-3">${bar('100%','90px','0')}</div>
        </div>
        ${bar('100%','200px','16px')}
        ${bar('80%')}${bar('60%')}${bar('90%')}
      </div>
      <style>
        @keyframes bht-sk-pulse{0%,100%{opacity:.45}50%{opacity:.85}}
      </style>`;
  },

  /* ==============================
     LAZY DATA LOADING
     ============================== */
  /**
   * Lazily fetch sheet data only when a page needs it.
   * Returns cached data instantly if available, otherwise fetches.
   * Pages should call: const data = await App.lazyLoad('students');
   */
  async lazyLoad(sheet) {
    const cacheKey = this.CACHE_PREFIX + sheet;
    const cached = this.getCache(cacheKey);
    if (cached) return cached;
    return this.fetchSheet(sheet);
  },

  /**
   * Preload common pages' data in the background after login.
   * Call once after showApp to warm the cache without blocking UI.
   */
  _preloadQueue: ['dashboard', 'students', 'attendance', 'finance', 'staff'],
  _preloaded: false,

  preloadPage(name) {
    // Map page names to their primary sheet(s)
    const pageSheets = {
      dashboard: ['_stats'],
      students: ['\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD'],
      attendance: ['\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA'],
      finance: ['\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3'],
      staff: ['\u05E6\u05D5\u05D5\u05EA'],
    };
    const sheets = pageSheets[name];
    if (!sheets) return;
    sheets.forEach(s => {
      if (s === '_stats') {
        this.fetchStats().catch(() => {});
      } else {
        this.fetchSheet(s).catch(() => {});
      }
    });
  },

  _startPreload() {
    if (this._preloaded) return;
    this._preloaded = true;
    // Stagger preloads so we don't flood the network
    this._preloadQueue.forEach((page, i) => {
      setTimeout(() => this.preloadPage(page), 2000 + i * 1500);
    });
  },

  /* ==============================
     NAVIGATION HELPERS
     ============================== */
  navigate(page) {
    location.hash = page;
  },

  loadPage(page) {
    location.hash = page;
  },

  /* ==============================
     TOAST ALIAS (delegates to Utils.toast)
     ============================== */
  showToast(message, type) {
    Utils.toast(message, type);
  },

  toast(message, type) {
    Utils.toast(message, type);
  },

  /* ==============================
     IN-MEMORY STORE (key-value for page state)
     ============================== */
  store: {},
};

/* ===== Start ===== */
document.addEventListener('DOMContentLoaded', () => App.init());
