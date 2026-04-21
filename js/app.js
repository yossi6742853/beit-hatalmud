/* ===== BHT v5.0 — App Core (Router, Auth, Data Layer) ===== */

const App = {
  /* ---- Config ---- */
  API_URL: 'https://script.google.com/macros/s/AKfycbx5tzS-Br4F4-JkH2N4qPJ2kA5bNxqqYgzfmvB19YM6NitHFgNziSxhKfZx2gSnX8ySIw/exec',
  API_TOKEN: 'bht2026',
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes
  PIN_KEY: 'bht_pin_hash',
  CACHE_PREFIX: 'bht_cache_',
  THEME_KEY: 'bht_theme',
  USE_API: true, // true = real data from Apps Script, false = demo fallback

  currentPage: null,
  charts: {},

  /* ==============================
     INITIALIZATION
     ============================== */
  init() {
    this.applyTheme();
    this.bindGlobalEvents();
    this.initAutoRefresh();
    this.checkVersion();

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
    this.handleRoute();
    this.loadNotifications();
    this.updateSyncStatus();
  },

  handleLogin() {
    const pin = document.getElementById('pin-input').value.trim();
    if (pin.length < 4) {
      this.showLoginError('\u05D4\u05E7\u05D5\u05D3 \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05DB\u05D9\u05DC 4-6 \u05E1\u05E4\u05E8\u05D5\u05EA');
      return;
    }
    // Store hashed PIN and enter
    localStorage.setItem(this.PIN_KEY, Utils.hashPin(pin));
    this.showApp();
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
    setTimeout(() => el.classList.add('d-none'), 3000);
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
    const hash = location.hash.slice(1) || 'dashboard';
    const parts = hash.split('/');
    const page = parts[0];
    const param = parts[1] || null;

    // Update sidebar active + auto-expand category
    document.querySelectorAll('.sidebar-link').forEach(el => {
      const isActive = el.dataset.page === page;
      el.classList.toggle('active', isActive);
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
            } catch(e){}
          }
        }
      }
    });

    // Close mobile sidebar
    const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('sidebar'));
    if (offcanvas) offcanvas.hide();

    // Destroy old charts
    Object.values(this.charts).forEach(c => { try { c.destroy(); } catch(e){} });
    this.charts = {};

    this.currentPage = page;
    this.trackRecentPage(page);
    const content = document.getElementById('main-content');

    // Render page
    if (Pages[page]) {
      content.innerHTML = '<div class="fade-in">' + Pages[page](param) + '</div>';
      if (Pages[page + 'Init']) {
        Pages[page + 'Init'](param);
      }
    } else {
      content.innerHTML = `<div class="empty-state"><i class="bi bi-question-circle"></i><h4>\u05D3\u05E3 \u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0</h4></div>`;
    }
  },

  /* ==============================
     DATA LAYER
     ============================== */
  async fetchSheet(sheet, forceRefresh = false) {
    const cacheKey = this.CACHE_PREFIX + sheet;

    // Check cache
    if (!forceRefresh) {
      const cached = this.getCache(cacheKey);
      if (cached) return cached;
    }

    try {
      const url = `${this.API_URL}?mode=api&action=list&sheet=${encodeURIComponent(sheet)}&token=${this.API_TOKEN}`;
      const resp = await fetch(url);
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      const json = await resp.json();

      if (json.error) throw new Error(json.error);
      const data = json.data || [];

      // Cache it
      this.setCache(cacheKey, data);
      return data;
    } catch (err) {
      console.error('fetchSheet error:', sheet, err);
      // Return cached even if expired
      const stale = localStorage.getItem(cacheKey);
      if (stale) {
        try { return JSON.parse(stale).data; } catch(e) {}
      }
      return [];
    }
  },

  async apiCall(action, sheet, data = {}) {
    try {
      const url = `${this.API_URL}`;
      // Map action names to API actions: add -> api_add, update -> api_update, delete -> api_delete
      const apiAction = 'api_' + action;
      const body = { action: apiAction, sheet, token: this.API_TOKEN, ...data };
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(body)
      });
      const result = await resp.json();

      if (result.error) {
        throw new Error(result.error);
      }

      // Invalidate cache for this sheet
      localStorage.removeItem(this.CACHE_PREFIX + sheet);

      return result;
    } catch (err) {
      console.error('apiCall error:', err);
      Utils.toast('\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05EA\u05E7\u05E9\u05D5\u05E8\u05EA \u05E2\u05DD \u05D4\u05E9\u05E8\u05EA', 'danger');
      throw err;
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
      // localStorage full — clear old caches
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith(this.CACHE_PREFIX)) localStorage.removeItem(k);
      });
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
    const demo = {
      '\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD': [
        { '\u05DE\u05D6\u05D4\u05D4': 1, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D9\u05D5\u05E1\u05E3', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05DB\u05D4\u05DF', '\u05DB\u05D9\u05EA\u05D4': '\u05D0', '\u05D8\u05DC\u05E4\u05D5\u05DF': '0501234567', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': '2015-03-12', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05E8\u05D7\u05D5\u05D1 \u05D4\u05E8\u05D0\u05DC 5, \u05D9\u05E8\u05D5\u05E9\u05DC\u05D9\u05DD' },
        { '\u05DE\u05D6\u05D4\u05D4': 2, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05DE\u05E9\u05D4', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05DC\u05D5\u05D9', '\u05DB\u05D9\u05EA\u05D4': '\u05D0', '\u05D8\u05DC\u05E4\u05D5\u05DF': '0529876543', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': '2014-07-22', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05D4\u05E8\u05D1 \u05E1\u05D9\u05E0\u05D9 8, \u05D1\u05E0\u05D9 \u05D1\u05E8\u05E7' },
        { '\u05DE\u05D6\u05D4\u05D4': 3, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D0\u05D1\u05E8\u05D4\u05DD', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05D2\u05D5\u05DC\u05D3\u05E9\u05D8\u05D9\u05D9\u05DF', '\u05DB\u05D9\u05EA\u05D4': '\u05D1', '\u05D8\u05DC\u05E4\u05D5\u05DF': '0587654321', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': '2015-11-05', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05D3\u05E8\u05DA \u05D4\u05E9\u05DC\u05D5\u05DD 12, \u05D9\u05E8\u05D5\u05E9\u05DC\u05D9\u05DD' },
        { '\u05DE\u05D6\u05D4\u05D4': 4, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D3\u05D5\u05D3', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05E4\u05E8\u05D9\u05D3\u05DE\u05DF', '\u05DB\u05D9\u05EA\u05D4': '\u05D1', '\u05D8\u05DC\u05E4\u05D5\u05DF': '0541112233', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': '2016-01-18', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05D4\u05E8\u05E6\u05DC 3, \u05D1\u05E0\u05D9 \u05D1\u05E8\u05E7' },
        { '\u05DE\u05D6\u05D4\u05D4': 5, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05E9\u05DE\u05D5\u05D0\u05DC', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05D1\u05E8\u05E7\u05D5\u05D1\u05D9\u05E5', '\u05DB\u05D9\u05EA\u05D4': '\u05D0', '\u05D8\u05DC\u05E4\u05D5\u05DF': '0503334455', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': '2014-09-30', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05E0\u05D7\u05DE\u05D9\u05D4 7, \u05D9\u05E8\u05D5\u05E9\u05DC\u05D9\u05DD' },
        { '\u05DE\u05D6\u05D4\u05D4': 6, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D7\u05D9\u05D9\u05DD', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05D0\u05D6\u05D5\u05DC\u05D0\u05D9', '\u05DB\u05D9\u05EA\u05D4': '\u05D2', '\u05D8\u05DC\u05E4\u05D5\u05DF': '0526667788', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': '2015-05-14', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05E9\u05D3\u05E8\u05D5\u05EA \u05D4\u05E4\u05E8\u05D7\u05D9\u05DD 22, \u05D9\u05E8\u05D5\u05E9\u05DC\u05D9\u05DD' },
        { '\u05DE\u05D6\u05D4\u05D4': 7, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05E0\u05EA\u05E0\u05D0\u05DC', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05E9\u05E4\u05D9\u05E8\u05D0', '\u05DB\u05D9\u05EA\u05D4': '\u05D2', '\u05D8\u05DC\u05E4\u05D5\u05DF': '0588990011', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': '2016-08-03', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05D9\u05E4\u05D5 18, \u05D9\u05E8\u05D5\u05E9\u05DC\u05D9\u05DD' },
        { '\u05DE\u05D6\u05D4\u05D4': 8, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D0\u05DC\u05D9\u05D4\u05D5', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05DE\u05D6\u05E8\u05D7\u05D9', '\u05DB\u05D9\u05EA\u05D4': '\u05D0', '\u05D8\u05DC\u05E4\u05D5\u05DF': '0542223344', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC', '\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4': '2015-12-25', '\u05DB\u05EA\u05D5\u05D1\u05EA': '\u05D4\u05E0\u05E9\u05D9\u05D0 4, \u05D1\u05E0\u05D9 \u05D1\u05E8\u05E7' }
      ],
      '\u05E6\u05D5\u05D5\u05EA': [
        { '\u05DE\u05D6\u05D4\u05D4': 1, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D4\u05E8\u05D1', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05D9\u05E8\u05D5\u05E9\u05DC\u05DE\u05D9', '\u05EA\u05E4\u05E7\u05D9\u05D3': '\u05E8\u05D0\u05E9 \u05D9\u05E9\u05D9\u05D1\u05D4', '\u05D8\u05DC\u05E4\u05D5\u05DF': '0521234567', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC' },
        { '\u05DE\u05D6\u05D4\u05D4': 2, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D4\u05E8\u05D1', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05DB\u05D4\u05DF', '\u05EA\u05E4\u05E7\u05D9\u05D3': '\u05DE\u05DC\u05DE\u05D3', '\u05D8\u05DC\u05E4\u05D5\u05DF': '0539876543', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC' },
        { '\u05DE\u05D6\u05D4\u05D4': 3, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D4\u05E8\u05D1', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05D2\u05D5\u05DC\u05D3\u05E9\u05D8\u05D9\u05D9\u05DF', '\u05EA\u05E4\u05E7\u05D9\u05D3': '\u05DE\u05DC\u05DE\u05D3', '\u05D8\u05DC\u05E4\u05D5\u05DF': '0547654321', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC' },
        { '\u05DE\u05D6\u05D4\u05D4': 4, '\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9': '\u05D9\u05D5\u05E1\u05E3', '\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4': '\u05E9\u05E0\u05D9\u05D9\u05D3\u05E8', '\u05EA\u05E4\u05E7\u05D9\u05D3': '\u05DE\u05D6\u05DB\u05D9\u05E8\u05D5\u05EA', '\u05D8\u05DC\u05E4\u05D5\u05DF': '0501234567', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC' }
      ],
      '\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3': [
        { '\u05DE\u05D6\u05D4\u05D4': 1, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 1, '\u05E9\u05DD': '\u05D9\u05D5\u05E1\u05E3 \u05DB\u05D4\u05DF', '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05E1\u05DB\u05D5\u05DD': 2400, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC' },
        { '\u05DE\u05D6\u05D4\u05D4': 2, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 2, '\u05E9\u05DD': '\u05DE\u05E9\u05D4 \u05DC\u05D5\u05D9', '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05E1\u05DB\u05D5\u05DD': 2400, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E9\u05D5\u05DC\u05DD' },
        { '\u05DE\u05D6\u05D4\u05D4': 3, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 3, '\u05E9\u05DD': '\u05D0\u05D1\u05E8\u05D4\u05DD \u05D2\u05D5\u05DC\u05D3\u05E9\u05D8\u05D9\u05D9\u05DF', '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05E1\u05DB\u05D5\u05DD': 2400, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05D7\u05D5\u05D1' },
        { '\u05DE\u05D6\u05D4\u05D4': 4, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 4, '\u05E9\u05DD': '\u05D3\u05D5\u05D3 \u05E4\u05E8\u05D9\u05D3\u05DE\u05DF', '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05E1\u05DB\u05D5\u05DD': 2400, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC' },
        { '\u05DE\u05D6\u05D4\u05D4': 5, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 5, '\u05E9\u05DD': '\u05E9\u05DE\u05D5\u05D0\u05DC \u05D1\u05E8\u05E7\u05D5\u05D1\u05D9\u05E5', '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05E1\u05DB\u05D5\u05DD': 2400, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05D7\u05D5\u05D1' },
        { '\u05DE\u05D6\u05D4\u05D4': 6, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 6, '\u05E9\u05DD': '\u05D7\u05D9\u05D9\u05DD \u05D0\u05D6\u05D5\u05DC\u05D0\u05D9', '\u05D7\u05D5\u05D3\u05E9': '\u05D0\u05E4\u05E8\u05D9\u05DC', '\u05E1\u05DB\u05D5\u05DD': 2400, '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E4\u05E2\u05D9\u05DC' }
      ],
      '\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA': [
        { '\u05DE\u05D6\u05D4\u05D4': 1, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 1, '\u05E9\u05DD': '\u05D9\u05D5\u05E1\u05E3 \u05DB\u05D4\u05DF', '\u05EA\u05D0\u05E8\u05D9\u05DA': '2026-04-19', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E0\u05D5\u05DB\u05D7' },
        { '\u05DE\u05D6\u05D4\u05D4': 2, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 2, '\u05E9\u05DD': '\u05DE\u05E9\u05D4 \u05DC\u05D5\u05D9', '\u05EA\u05D0\u05E8\u05D9\u05DA': '2026-04-19', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E0\u05D5\u05DB\u05D7' },
        { '\u05DE\u05D6\u05D4\u05D4': 3, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 3, '\u05E9\u05DD': '\u05D0\u05D1\u05E8\u05D4\u05DD \u05D2\u05D5\u05DC\u05D3\u05E9\u05D8\u05D9\u05D9\u05DF', '\u05EA\u05D0\u05E8\u05D9\u05DA': '2026-04-19', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05D7\u05D9\u05E1\u05D5\u05E8' },
        { '\u05DE\u05D6\u05D4\u05D4': 4, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 4, '\u05E9\u05DD': '\u05D3\u05D5\u05D3 \u05E4\u05E8\u05D9\u05D3\u05DE\u05DF', '\u05EA\u05D0\u05E8\u05D9\u05DA': '2026-04-19', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E0\u05D5\u05DB\u05D7' },
        { '\u05DE\u05D6\u05D4\u05D4': 5, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 5, '\u05E9\u05DD': '\u05E9\u05DE\u05D5\u05D0\u05DC \u05D1\u05E8\u05E7\u05D5\u05D1\u05D9\u05E5', '\u05EA\u05D0\u05E8\u05D9\u05DA': '2026-04-19', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05D0\u05D9\u05D7\u05D5\u05E8' },
        { '\u05DE\u05D6\u05D4\u05D4': 6, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 6, '\u05E9\u05DD': '\u05D7\u05D9\u05D9\u05DD \u05D0\u05D6\u05D5\u05DC\u05D0\u05D9', '\u05EA\u05D0\u05E8\u05D9\u05DA': '2026-04-19', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E0\u05D5\u05DB\u05D7' },
        { '\u05DE\u05D6\u05D4\u05D4': 7, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 7, '\u05E9\u05DD': '\u05E0\u05EA\u05E0\u05D0\u05DC \u05E9\u05E4\u05D9\u05E8\u05D0', '\u05EA\u05D0\u05E8\u05D9\u05DA': '2026-04-19', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E0\u05D5\u05DB\u05D7' },
        { '\u05DE\u05D6\u05D4\u05D4': 8, '\u05EA\u05DC\u05DE\u05D9\u05D3_\u05DE\u05D6\u05D4\u05D4': 8, '\u05E9\u05DD': '\u05D0\u05DC\u05D9\u05D4\u05D5 \u05DE\u05D6\u05E8\u05D7\u05D9', '\u05EA\u05D0\u05E8\u05D9\u05DA': '2026-04-19', '\u05E1\u05D8\u05D8\u05D5\u05E1': '\u05E0\u05D5\u05DB\u05D7' }
      ]
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
        console.warn('API failed for', sheet, '- using demo data');
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
  },

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(this.THEME_KEY, next);
    this.applyTheme();
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

    // Hash routing
    window.addEventListener('hashchange', () => {
      if (this.isLoggedIn()) this.handleRoute();
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

    // Close FAB menu on page navigation
    window.addEventListener('hashchange', () => {
      document.getElementById('fab-menu')?.classList.add('d-none');
    });

    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl+K or Cmd+K = focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const search = document.getElementById('global-search');
        if (search) search.focus();
      }
      // Escape = close search, close modals
      if (e.key === 'Escape') {
        const search = document.getElementById('global-search');
        if (search && document.activeElement === search) {
          search.value = '';
          search.blur();
          document.getElementById('search-results')?.classList.remove('show');
        }
      }
    });
  },

  /* ==============================
     SIDEBAR CATEGORIES
     ============================== */
  initSidebarCategories() {
    const STORAGE_KEY = 'bht_sidebar_cats';
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch(e) {}

    document.querySelectorAll('.sidebar-category').forEach(cat => {
      const key = cat.dataset.cat;
      const btn = cat.querySelector('.sidebar-cat-header');
      const body = cat.querySelector('.sidebar-cat-body');
      if (!btn || !body) return;

      // Restore state (default: open)
      const isOpen = saved[key] !== false;
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
    // Refresh data every 2 minutes
    setInterval(() => {
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
    const current = 'v5.3';
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
    } catch(e) { console.warn('Notifications error:', e); }
  },

  initGlobalSearch() {
    const input = document.getElementById('global-search');
    const results = document.getElementById('search-results');
    if (!input || !results) return;

    input.addEventListener('input', Utils.debounce(async () => {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) { results.classList.remove('show'); return; }

      const [students, staff, parents] = await Promise.all([
        App.getData('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD').catch(()=>[]),
        App.getData('\u05E6\u05D5\u05D5\u05EA').catch(()=>[]),
        App.getData('\u05D4\u05D5\u05E8\u05D9\u05DD').catch(()=>[])
      ]);

      let hits = [];
      students.forEach(s => {
        const name = Utils.fullName(s);
        if (name.toLowerCase().includes(q) || (s['\u05D8\u05DC\u05E4\u05D5\u05DF']||'').includes(q))
          hits.push({name, type:'\u05EA\u05DC\u05DE\u05D9\u05D3', icon:'bi-person-fill', color:'primary', link:'#student/'+Utils.rowId(s), sub:'\u05DB\u05D9\u05EA\u05D4 '+(s['\u05DB\u05D9\u05EA\u05D4']||'')});
      });
      staff.forEach(s => {
        const name = Utils.fullName(s);
        if (name.toLowerCase().includes(q) || (s['\u05D8\u05DC\u05E4\u05D5\u05DF']||'').includes(q))
          hits.push({name, type:'\u05E6\u05D5\u05D5\u05EA', icon:'bi-person-badge-fill', color:'success', link:'#staff_card/'+Utils.rowId(s), sub:s['\u05EA\u05E4\u05E7\u05D9\u05D3']||''});
      });
      parents.forEach(p => {
        if ((p['\u05E9\u05DD']||'').toLowerCase().includes(q) || (p['\u05D8\u05DC\u05E4\u05D5\u05DF']||'').includes(q))
          hits.push({name:p['\u05E9\u05DD']||'', type:'\u05D4\u05D5\u05E8\u05D4', icon:'bi-house-heart-fill', color:'warning', link:'#parent_card/'+Utils.rowId(p), sub:p['\u05E7\u05E9\u05E8']||''});
      });

      if (!hits.length) {
        results.innerHTML = '<div class="p-3 text-muted text-center small">\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA</div>';
      } else {
        results.innerHTML = hits.slice(0,10).map(h =>
          `<a href="${h.link}" class="dropdown-item d-flex align-items-center gap-2 py-2" onclick="document.getElementById('search-results').classList.remove('show');document.getElementById('global-search').value=''">
            <i class="bi ${h.icon} text-${h.color}"></i>
            <div><div class="fw-bold small">${h.name}</div><small class="text-muted">${h.type} ${h.sub?'| '+h.sub:''}</small></div>
          </a>`
        ).join('');
      }
      results.classList.add('show');
    }, 300));

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#global-search') && !e.target.closest('#search-results'))
        results.classList.remove('show');
    });

    // Close on Escape
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { results.classList.remove('show'); input.value = ''; }
    });
  },

  /* ==============================
     RECENT PAGES TRACKER
     ============================== */
  trackRecentPage(page) {
    if (['student','staff_card','parent_card'].includes(page)) return; // skip sub-pages
    const key = 'bht_recent_pages';
    let recent = [];
    try { recent = JSON.parse(localStorage.getItem(key) || '[]'); } catch(e){}
    recent = recent.filter(p => p !== page);
    recent.unshift(page);
    recent = recent.slice(0, 5);
    localStorage.setItem(key, JSON.stringify(recent));
    this.renderRecentPages(recent);
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
      help:'\u05E2\u05D6\u05E8\u05D4', phone:'\u05D8\u05DC\u05E4\u05D5\u05DF', cameras:'\u05DE\u05E6\u05DC\u05DE\u05D5\u05EA'
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
    // Find most recent cache timestamp
    let latest = 0;
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith(this.CACHE_PREFIX)) {
        try { const {ts} = JSON.parse(localStorage.getItem(k)); if (ts > latest) latest = ts; } catch(e){}
      }
    });
    if (latest) {
      const mins = Math.round((Date.now() - latest) / 60000);
      el.innerHTML = `<i class="bi bi-arrow-repeat me-1"></i>${mins < 1 ? '\u05E2\u05D5\u05D3\u05DB\u05DF \u05E2\u05DB\u05E9\u05D9\u05D5' : '\u05E2\u05D5\u05D3\u05DB\u05DF \u05DC\u05E4\u05E0\u05D9 ' + mins + ' \u05D3\u05E7\''}`;
    }
  }
};

/* ===== Start ===== */
document.addEventListener('DOMContentLoaded', () => App.init());
