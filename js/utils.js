/* ===== BHT v6.9 — Utilities ===== */

const Utils = {
  /* ---- Israeli ID (ת.ז.) validation — Luhn mod 10 ---- */
  validateIsraeliId(id) {
    if (!id) return false;
    const s = String(id).replace(/\D/g, '').padStart(9, '0');
    if (s.length !== 9) return false;
    return [...s].reduce((sum, d, i) => {
      let n = +d * (i % 2 === 0 ? 1 : 2);
      return sum + (n > 9 ? n - 9 : n);
    }, 0) % 10 === 0;
  },

  /* ---- Hebrew collator (cached: faster sort across many calls) ---- */
  HEB_COLLATOR: null,
  hebCompare(a, b) {
    if (!this.HEB_COLLATOR) {
      this.HEB_COLLATOR = new Intl.Collator('he', { sensitivity: 'base', ignorePunctuation: true, numeric: true });
    }
    return this.HEB_COLLATOR.compare(String(a||''), String(b||''));
  },

  /* ---- Bidi: wrap LTR atom (phone/id/email) so it reads correctly inside Hebrew text ---- */
  ltrIsolate(s) {
    return `<bdi dir="ltr" style="unicode-bidi:isolate">${this.escapeHTML(s||'')}</bdi>`;
  },

  /* ---- Hebrew search normalization: strip niqqud + sofit fold + abbreviation expand ---- */
  hebNormalize(s) {
    return String(s || '')
      .replace(/[֑-ׇ]/g, '')                 // strip niqqud + cantillation
      .replace(/[־‐-―]/g, '-')              // maqaf → hyphen
      .replace(/[׳']/g, '')                 // strip geresh
      .replace(/[״""״]/g, '')               // strip gershayim
      .replace(/ך/g, 'כ').replace(/ם/g, 'מ').replace(/ן/g, 'נ').replace(/ף/g, 'פ').replace(/ץ/g, 'צ')  // sofit fold
      .replace(/וו/g, 'ו').replace(/יי/g, 'י')  // double-letter normalize
      .toLowerCase().trim();
  },

  /* ---- Hebrew match — centralizes niqqud+sofit+abbrev tolerance ---- */
  hebMatch(haystack, needle) {
    if (!needle) return true;
    return this.hebNormalize(haystack || '').includes(this.hebNormalize(needle));
  },

  /* ---- Gematria value of a Hebrew string ---- */
  GEM_MAP: { א:1,ב:2,ג:3,ד:4,ה:5,ו:6,ז:7,ח:8,ט:9,י:10,כ:20,ך:20,ל:30,מ:40,ם:40,נ:50,ן:50,ס:60,ע:70,פ:80,ף:80,צ:90,ץ:90,ק:100,ר:200,ש:300,ת:400 },
  gematria(s) {
    let n = 0;
    for (const c of String(s || '').replace(/[׳״'"]/g, '')) n += this.GEM_MAP[c] || 0;
    return n || null;
  },

  /* ---- Haptic feedback (mobile) ---- */
  haptic(ms = 10) { if ('vibrate' in navigator) try { navigator.vibrate(ms); } catch(e) { /* silent */ } },

  /* ---- Shabbat / Yom Tov check — returns reason string if blocked, null otherwise ---- */
  shabbatBlock() {
    const now = new Date();
    const day = now.getDay(); // 5=Fri, 6=Sat
    if (day === 6) return 'שבת קודש';
    // Friday afternoon: candle-lighting (default 60min before sunset)
    if (day === 5) {
      const hr = now.getHours();
      const month = now.getMonth() + 1;
      const z = (typeof Pages !== 'undefined' && Pages._hcZmanim && Pages._hcZmanim[month]) || null;
      if (z && z.candleLighting) {
        const [ch, cm] = String(z.candleLighting).split(':').map(Number);
        const candleMin = ch * 60 + cm - 60; // 1h before
        const nowMin = now.getHours() * 60 + now.getMinutes();
        if (nowMin >= candleMin) return 'ערב שבת — אחר זמן הכנה';
      } else if (hr >= 14) return 'ערב שבת'; // fallback
    }
    // Holidays: check Pages._hcHolidays
    if (typeof Pages !== 'undefined' && Pages._hcHolidays) {
      const iso = now.toISOString().slice(0, 10);
      const chag = Pages._hcHolidays.find(h => h.gDates && h.gDates.includes(iso) && h.type === 'chag');
      if (chag) return chag.name;
    }
    return null;
  },

  /* ---- Friendly error toast — single source of error microcopy ---- */
  errorToast(action = 'save') {
    const msgs = {
      save:   'השמירה לא הצליחה. בדוק את החיבור ונסה שוב',
      delete: 'המחיקה לא בוצעה. נסה שוב בעוד רגע',
      load:   'טעינת הנתונים נכשלה. נסה לרענן את הדף',
      send:   'השליחה לא הצליחה. בדוק את החיבור',
      upload: 'העלאת הקובץ נכשלה. נסה שוב',
      generic: 'משהו לא עבד כצפוי. נסה שוב בעוד רגע'
    };
    this.toast(msgs[action] || msgs.generic, 'danger');
  },

  /* ---- Hebrew plural — agreement for counters ("1 תלמיד נמחק" vs "5 תלמידים נמחקו") ---- */
  plural(n, singular, plural) {
    if (n === 1) return '1 ' + singular;
    return n + ' ' + plural;
  },

  /* ===== Component helpers (Day 1-4) — DRY templates ===== */

  // Page header row (title + subtitle + action buttons)
  pageHeader({ icon, title, subtitle, actions = [] }) {
    const acts = actions.map(a => `<button class="btn btn-${a.variant || 'primary'} btn-sm" onclick="${a.onclick}"><i class="bi bi-${a.icon} me-1"></i>${this.escapeHTML(a.label)}</button>`).join('');
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3"><div><h1><i class="bi bi-${icon} me-2"></i>${this.escapeHTML(title)}</h1>${subtitle ? `<p class="text-muted mb-0">${this.escapeHTML(subtitle)}</p>` : ''}</div><div class="d-flex gap-2 flex-wrap">${acts}</div></div>`;
  },

  // KPI stat card row
  kpiRow(stats) {
    const cols = Math.max(2, Math.floor(12 / stats.length));
    return `<div class="row g-3 mb-4">${stats.map(s => `<div class="col-6 col-md-${cols}"><div class="card text-center p-3 border-start border-${s.variant} border-4"><div class="fs-2 fw-bold text-${s.variant}">${s.value}</div><small class="text-muted"><i class="bi bi-${s.icon} me-1"></i>${this.escapeHTML(s.label)}</small></div></div>`).join('')}</div>`;
  },

  // Empty-state v2 (with optional CTA)
  emptyState(icon, title, hint = '', cta = null) {
    const ctaHtml = cta ? `<a href="#" class="btn btn-sm btn-outline-${cta.variant || 'secondary'} mt-2" onclick="${cta.onclick};return false"><i class="bi bi-${cta.icon || 'plus'} me-1"></i>${this.escapeHTML(cta.label)}</a>` : '';
    return `<div class="empty-state empty-state-v2 text-center py-5"><i class="bi bi-${icon} fs-1 text-muted opacity-50"></i><h5 class="mt-3 text-muted">${this.escapeHTML(title)}</h5>${hint ? `<p class="text-muted small">${this.escapeHTML(hint)}</p>` : ''}${ctaHtml}</div>`;
  },

  // Student-name-with-avatar linked
  studentLink(row, size = 'sm', extra = '') {
    const id = this.rowId(row), name = this.fullName(row);
    return `<span class="d-inline-flex align-items-center gap-1">${this.avatarHTML ? this.avatarHTML(name, size) : ''}<a href="#student/${id}" class="text-decoration-none fw-medium">${this.escapeHTML(name)}</a>${extra ? ` <small class="text-muted">${this.escapeHTML(extra)}</small>` : ''}</span>`;
  },

  // Color-coded progress bar with auto threshold
  progressBar(pct, { height = 18, label = true, invert = false } = {}) {
    pct = Math.max(0, Math.min(100, +pct || 0));
    const tiers = invert ? ['bg-danger', 'bg-warning', 'bg-success'] : ['bg-success', 'bg-warning', 'bg-danger'];
    const v = pct >= 80 ? tiers[0] : pct >= 50 ? tiers[1] : tiers[2];
    return `<div class="progress" style="height:${height}px;min-width:80px"><div class="progress-bar ${v}" style="width:${pct}%;transition:width .4s">${label ? pct + '%' : ''}</div></div>`;
  },

  // Phone action group (call + WhatsApp + optional SMS)
  phoneActions(phone, { whatsapp = true, sms = false, label = false } = {}) {
    if (!phone) return '<span class="text-muted">—</span>';
    const p = this.normalizePhone(phone), waP = p.replace(/^0/, '972');
    return `<span class="d-inline-flex gap-1"><a href="tel:${p}" class="btn btn-sm btn-outline-primary" title="חייג" aria-label="חייג"><i class="bi bi-telephone"></i>${label ? ' ' + this.formatPhone(p) : ''}</a>${whatsapp ? `<a href="https://wa.me/${waP}" target="_blank" rel="noopener" class="btn btn-sm btn-outline-success" title="ווטסאפ" aria-label="ווטסאפ"><i class="bi bi-whatsapp"></i></a>` : ''}${sms ? `<a href="sms:${p}" class="btn btn-sm btn-outline-info" title="SMS" aria-label="SMS"><i class="bi bi-chat-text"></i></a>` : ''}</span>`;
  },

  // Flash a "saved" pulse ring on an element
  flashSaved(el) {
    if (!el) return;
    el.classList.remove('saved-pulse');
    void el.offsetWidth;
    el.classList.add('saved-pulse');
    setTimeout(() => el.classList.remove('saved-pulse'), 750);
  },

  /* ---- Chart helpers: shared RTL tooltip + empty-state placeholder + a11y table ---- */
  chartTooltip(mode = 'absolute') {
    return {
      rtl: true, textDirection: 'rtl',
      titleFont: { family: 'Heebo' }, bodyFont: { family: 'Heebo' },
      padding: 10, cornerRadius: 6, displayColors: true,
      callbacks: {
        label: (ctx) => {
          const v = ctx.parsed?.y ?? ctx.parsed;
          if (typeof v !== 'number') return ctx.label || '';
          if (mode === 'currency') return `${ctx.dataset.label || ctx.label}: ${this.formatCurrency(v)}`;
          if (mode === 'percent') {
            const total = (ctx.dataset.data || []).reduce((a, b) => a + (+b || 0), 0);
            return `${ctx.label}: ${v} (${total ? Math.round(v/total*100) : 0}%)`;
          }
          return `${ctx.dataset.label || ctx.label}: ${v.toLocaleString('he-IL')}`;
        }
      }
    };
  },
  chartEmpty(canvas, msg = 'אין נתונים להצגה', icon = 'bar-chart') {
    if (!canvas) return;
    const wrap = canvas.parentElement;
    if (!wrap || wrap.querySelector('.chart-empty')) return;
    canvas.style.display = 'none';
    wrap.insertAdjacentHTML('beforeend',
      `<div class="chart-empty d-flex flex-column align-items-center justify-content-center text-muted py-5">
         <i class="bi bi-${icon} display-4 opacity-25 mb-2"></i>
         <div class="fw-semibold">${this.escapeHTML(msg)}</div>
         <small class="opacity-75">נתונים יופיעו כאן ברגע שיוזנו</small>
       </div>`);
  },

  /* ---- Export helpers (Day 7-6) ---- */
  exportJSON(rows, filename = 'data.json') {
    const blob = new Blob([JSON.stringify(rows, null, 2)], { type: 'application/json;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
    this.toast('JSON יוצא');
  },

  exportMarkdown(rows, sheet = 'נתונים') {
    if (!rows || !rows.length) { this.toast('אין נתונים', 'warning'); return; }
    const cols = Object.keys(rows[0]);
    const md = '# ' + sheet + '\n\n| ' + cols.join(' | ') + ' |\n|' + cols.map(() => '---').join('|') + '|\n' +
      rows.map(r => '| ' + cols.map(c => String(r[c] ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ')).join(' | ') + ' |').join('\n');
    const blob = new Blob(['﻿' + md], { type: 'text/markdown;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = sheet + '.md';
    a.click();
    URL.revokeObjectURL(a.href);
    this.toast('Markdown יוצא');
  },

  /* ---- Allergy/medical alert banner — high-visibility, escapes content ---- */
  allergyBanner(allergies) {
    if (!allergies || (Array.isArray(allergies) && !allergies.length)) return '';
    const list = Array.isArray(allergies) ? allergies : [allergies];
    const safe = list.map(a => this.escapeHTML(String(a || '').trim())).filter(Boolean).join(' • ');
    if (!safe) return '';
    return `<div class="alert alert-danger fw-bold py-1 px-2 mb-2 d-inline-flex align-items-center gap-2" role="status"><i class="bi bi-exclamation-octagon-fill"></i><span>אלרגיה: ${safe}</span></div>`;
  },

  /* ---- Personalize message text with recipient placeholders ---- */
  mergeMessage(template, recipient = {}) {
    return String(template || '')
      .replace(/\{שם_הורה\}/g, recipient.name || '')
      .replace(/\{שם_תלמיד\}/g, recipient.studentName || '')
      .replace(/\{שם\}/g, recipient.name || '')
      .replace(/\{כיתה\}/g, recipient.class || '');
  },

  /* ---- Mask Israeli ID — display last 4 only ---- */
  maskTeudat(tz) {
    const d = String(tz || '').replace(/\D/g, '');
    if (d.length < 4) return '';
    return '•••••' + d.slice(-4);
  },

  /* ---- Mask phone — display first 3 + last 2 ---- */
  maskPhone(phone) {
    const d = String(phone || '').replace(/\D/g, '');
    if (d.length < 7) return d;
    return d.slice(0, 3) + '-•••' + d.slice(-2);
  },

  /* ---- Validation: amount within bounds ---- */
  validAmount(v, { min = 0, max = 1_000_000, allowZero = false } = {}) {
    const n = Number(v);
    if (!Number.isFinite(n)) return false;
    if (!allowZero && n <= 0) return false;
    return n >= min && n <= max;
  },

  /* ---- Israeli phone: strip non-digits, validate, format ---- */
  normalizePhone(input) {
    if (!input) return '';
    const digits = String(input).replace(/\D/g, '');
    // 972XXXXXXXXX -> 0XXXXXXXXX (e.g., from international form)
    if (digits.startsWith('972') && digits.length >= 11) return '0' + digits.slice(3);
    return digits;
  },
  isValidPhone(input) {
    const d = this.normalizePhone(input);
    return /^0[2-9]\d{7,8}$/.test(d);  // landline 02-09 or mobile 050-058
  },
  formatPhone(input) {
    const d = this.normalizePhone(input);
    if (!d) return '';
    if (d.length === 10) return d.slice(0, 3) + '-' + d.slice(3);
    if (d.length === 9) return d.slice(0, 2) + '-' + d.slice(2);
    return d;
  },

  /* ---- Double-submit guard: returns true if currently locked ---- */
  _saving: {},
  acquireLock(key, ms = 1500) {
    const now = Date.now();
    if (this._saving[key] && (now - this._saving[key]) < ms) return false;
    this._saving[key] = now;
    return true;
  },
  releaseLock(key) { delete this._saving[key]; },

  /* ---- Safe localStorage write with quota handling ---- */
  safeSetItem(key, value) {
    try { localStorage.setItem(key, value); return true; }
    catch(e) {
      if (e.name === 'QuotaExceededError') {
        console.warn('localStorage full, clearing old caches');
        Object.keys(localStorage).filter(k => k.startsWith('bht_cache_')).forEach(k => localStorage.removeItem(k));
        try { localStorage.setItem(key, value); return true; } catch(e2) { /* truly full */ }
      }
      return false;
    }
  },

  /* ---- Full name from שם_פרטי + שם_משפחה or fallback to שם ---- */
  fullName(row) {
    if (row['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9'] || row['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4']) {
      return ((row['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9']||'') + ' ' + (row['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4']||'')).trim();
    }
    return row['\u05E9\u05DD'] || '';
  },

  /* ---- Get ID from מזהה or id ---- */
  rowId(row) {
    return row['\u05DE\u05D6\u05D4\u05D4'] || row['id'] || '';
  },

  /* ---- Hebrew months ---- */
  HEB_MONTHS: [
    '\u05D9\u05E0\u05D5\u05D0\u05E8','\u05E4\u05D1\u05E8\u05D5\u05D0\u05E8','\u05DE\u05E8\u05E5',
    '\u05D0\u05E4\u05E8\u05D9\u05DC','\u05DE\u05D0\u05D9','\u05D9\u05D5\u05E0\u05D9',
    '\u05D9\u05D5\u05DC\u05D9','\u05D0\u05D5\u05D2\u05D5\u05E1\u05D8','\u05E1\u05E4\u05D8\u05DE\u05D1\u05E8',
    '\u05D0\u05D5\u05E7\u05D8\u05D5\u05D1\u05E8','\u05E0\u05D5\u05D1\u05DE\u05D1\u05E8','\u05D3\u05E6\u05DE\u05D1\u05E8'
  ],

  HEB_DAYS: [
    '\u05E8\u05D0\u05E9\u05D5\u05DF','\u05E9\u05E0\u05D9','\u05E9\u05DC\u05D9\u05E9\u05D9',
    '\u05E8\u05D1\u05D9\u05E2\u05D9','\u05D7\u05DE\u05D9\u05E9\u05D9','\u05E9\u05D9\u05E9\u05D9','\u05E9\u05D1\u05EA'
  ],

  /* ---- Date formatting ---- */
  formatDate(d) {
    if (!d) return '';
    const date = d instanceof Date ? d : new Date(d);
    if (isNaN(date)) return d;
    const day = date.getDate();
    const month = this.HEB_MONTHS[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  },

  formatDateShort(d) {
    if (!d) return '';
    const date = d instanceof Date ? d : new Date(d);
    if (isNaN(date)) return d;
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  },

  todayISO() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  },

  dayName() {
    return '\u05D9\u05D5\u05DD ' + this.HEB_DAYS[new Date().getDay()];
  },

  /* ---- Age from birthdate ---- */
  calcAge(birthdate) {
    if (!birthdate) return '';
    const bd = new Date(birthdate);
    if (isNaN(bd)) return '';
    const today = new Date();
    if (bd > today) return ''; // future date = invalid
    let age = today.getFullYear() - bd.getFullYear();
    const m = today.getMonth() - bd.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < bd.getDate())) age--;
    return age;
  },

  /* ---- Avatar helpers ---- */
  AVATAR_COLORS: [
    '#1a73e8','#ea4335','#0f9d58','#f9ab00','#6366f1',
    '#ec4899','#14b8a6','#f97316','#8b5cf6','#06b6d4',
    '#84cc16','#ef4444','#3b82f6','#10b981','#a855f7'
  ],

  getInitials(name) {
    if (!name) return '??';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return parts[0][0] + parts[1][0];
    return name.substring(0, 2);
  },

  getAvatarColor(name) {
    if (!name) return this.AVATAR_COLORS[0];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return this.AVATAR_COLORS[Math.abs(hash) % this.AVATAR_COLORS.length];
  },

  avatarHTML(name, size = '') {
    const cls = size ? `avatar avatar-${size}` : 'avatar';
    const color = this.getAvatarColor(name);
    const initials = this.getInitials(name);
    return `<div class="${cls}" style="background:${color}">${initials}</div>`;
  },

  /* ---- Currency: Intl.NumberFormat handles negatives, RTL marks, and locale-correct symbol placement ---- */
  _ILS_FMT: null,
  formatCurrency(n) {
    if (n == null || isNaN(n)) return '\u20AA0';
    if (!this._ILS_FMT) {
      try { this._ILS_FMT = new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS', maximumFractionDigits: 0 }); }
      catch(e) { return '\u20AA' + Number(n).toLocaleString('he-IL'); }
    }
    return this._ILS_FMT.format(Number(n));
  },

  /* ---- Percent ---- */
  formatPercent(n) {
    if (n == null || isNaN(n)) return '0%';
    return Math.round(n) + '%';
  },

  /* ---- Phone formatting ---- */
  formatPhone(phone) {
    if (!phone) return '';
    const p = String(phone).replace(/\D/g, '');
    if (p.length === 10) return p.slice(0,3) + '-' + p.slice(3,6) + '-' + p.slice(6);
    if (p.length === 9) return p.slice(0,2) + '-' + p.slice(2,5) + '-' + p.slice(5);
    return phone;
  },

  /* ---- Toast notification ---- */
  toast(message, type = 'success') {
    const icons = { success: 'check-circle-fill', danger: 'exclamation-triangle-fill', warning: 'exclamation-circle-fill', info: 'info-circle-fill' };
    const container = document.getElementById('toast-container');
    if (!container) return;
    // Cap visible toasts at 4 — older ones get evicted (prevents avalanche on error storms)
    while (container.children.length >= 4) container.firstElementChild?.remove();
    const id = 'toast-' + Date.now();
    const live = (type === 'danger' || type === 'warning') ? 'assertive' : 'polite';
    const role = (type === 'danger') ? 'alert' : 'status';
    const html = `
      <div id="${id}" class="toast toast-bht align-items-center text-bg-${type}" role="${role}" aria-live="${live}" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body d-flex align-items-center gap-2">
            <i class="bi bi-${icons[type] || icons.info}" aria-hidden="true"></i>
            ${message}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="סגור"></button>
        </div>
      </div>`;
    container.insertAdjacentHTML('beforeend', html);
    const el = document.getElementById(id);
    const toast = new bootstrap.Toast(el, { delay: type === 'danger' ? 10000 : type === 'warning' ? 7000 : 5000 });
    toast.show();
    el.addEventListener('hidden.bs.toast', () => el.remove());
  },

  /* ---- Confirm dialog ---- */
  confirm(title, body) {
    return new Promise(resolve => {
      document.getElementById('confirm-title').textContent = title;
      document.getElementById('confirm-body').textContent = body;
      const modal = new bootstrap.Modal(document.getElementById('confirm-modal'));
      const okBtn = document.getElementById('confirm-ok');
      const handler = () => { modal.hide(); okBtn.removeEventListener('click', handler); resolve(true); };
      okBtn.addEventListener('click', handler);
      document.getElementById('confirm-modal').addEventListener('hidden.bs.modal', () => {
        okBtn.removeEventListener('click', handler);
        resolve(false);
      }, { once: true });
      modal.show();
    });
  },

  /* ---- Skeleton generator ---- */
  skeleton(count = 3) {
    let html = '';
    for (let i = 0; i < count; i++) {
      html += `<div class="card p-3 mb-3"><div class="skeleton skeleton-title"></div><div class="skeleton skeleton-text" style="width:80%"></div><div class="skeleton skeleton-text" style="width:60%"></div></div>`;
    }
    return html;
  },

  skeletonTable(rows = 5, cols = 4) {
    let html = '<table class="table table-bht"><thead><tr>';
    for (let c = 0; c < cols; c++) html += '<th><div class="skeleton skeleton-text" style="width:60%"></div></th>';
    html += '</tr></thead><tbody>';
    for (let r = 0; r < rows; r++) {
      html += '<tr>';
      for (let c = 0; c < cols; c++) html += `<td><div class="skeleton skeleton-text" style="width:${50 + Math.random()*40}%"></div></td>`;
      html += '</tr>';
    }
    return html + '</tbody></table>';
  },

  /* ---- Debounce ---- */
  debounce(fn, ms = 300) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  },

  /* ---- Simple hash for PIN ---- */
  hashPin(pin) {
    let hash = 0;
    const str = 'BHT_' + pin + '_SALT';
    for (let i = 0; i < str.length; i++) {
      const c = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + c;
      hash |= 0;
    }
    return 'bht_' + Math.abs(hash).toString(36);
  },

  /* ---- Generate random ID ---- */
  uid() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  },

  /* ---- Status badge ---- */
  statusBadge(status) {
    const map = {
      '\u05E4\u05E2\u05D9\u05DC': 'active',
      '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC': 'inactive',
      '\u05DE\u05DE\u05EA\u05D9\u05DF': 'pending',
      '\u05E2\u05D6\u05D1': 'left',
      '\u05E0\u05E8\u05E9\u05DD \u05D1\u05DC\u05D1\u05D3': 'registered',
      '\u05E0\u05E8\u05E9\u05DD_\u05D1\u05DC\u05D1\u05D3': 'registered',
      '\u05D4\u05D5\u05E7\u05E4\u05D0': 'frozen',
      '\u05E1\u05D9\u05D9\u05DD': 'graduated',
      'active': 'active',
      'inactive': 'inactive',
      'pending': 'pending',
      'left': 'left',
      'registered': 'registered',
      'frozen': 'frozen',
      'graduated': 'graduated'
    };
    const labels = {
      'active': '\u05E4\u05E2\u05D9\u05DC',
      'inactive': '\u05DC\u05D0 \u05E4\u05E2\u05D9\u05DC',
      'pending': '\u05DE\u05DE\u05EA\u05D9\u05DF',
      'left': '\u05E2\u05D6\u05D1',
      'registered': '\u05E0\u05E8\u05E9\u05DD \u05D1\u05DC\u05D1\u05D3',
      'frozen': '\u05D4\u05D5\u05E7\u05E4\u05D0',
      'graduated': '\u05E1\u05D9\u05D9\u05DD'
    };
    const colors = {
      'active': 'success',
      'inactive': 'secondary',
      'pending': 'warning',
      'left': 'danger',
      'registered': 'info',
      'frozen': 'dark',
      'graduated': 'primary'
    };
    const cls = map[status] || 'pending';
    const label = labels[cls] || status || '\u05DC\u05D0 \u05D9\u05D3\u05D5\u05E2';
    const color = colors[cls] || 'secondary';
    return `<span class="badge bg-${color}">${label}</span>`;
  },

  /* ---- Data export: JSON ---- */
  exportJSON(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob);
    link.download = filename || 'export.json'; link.click();
  },

  /* ---- Hebrew calendar date (Intl, no library) ---- */
  hebrewDateFull() {
    try {
      const fmt = new Intl.DateTimeFormat('he-IL-u-ca-hebrew', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
      return fmt.format(new Date());
    } catch(e) { return ''; }
  },

  hebrewDateShort() {
    try {
      const fmt = new Intl.DateTimeFormat('he-IL-u-ca-hebrew', {
        day: 'numeric', month: 'short'
      });
      return fmt.format(new Date());
    } catch(e) { return ''; }
  },

  /* ---- Hebrew calendar date from any date (Intl API) ---- */
  getHebrewDate(date) {
    try {
      const d = date instanceof Date ? date : new Date(date);
      if (isNaN(d)) return null;
      const dayFmt = new Intl.DateTimeFormat('he-IL-u-ca-hebrew', { day: 'numeric' });
      const monthFmt = new Intl.DateTimeFormat('he-IL-u-ca-hebrew', { month: 'long' });
      const yearFmt = new Intl.DateTimeFormat('he-IL-u-ca-hebrew', { year: 'numeric' });
      return {
        day: dayFmt.format(d),
        month: monthFmt.format(d),
        year: yearFmt.format(d),
        full: new Intl.DateTimeFormat('he-IL-u-ca-hebrew', { day:'numeric', month:'long', year:'numeric' }).format(d)
      };
    } catch(e) { return null; }
  },

  /* ---- Birthday helpers (Hebrew calendar) ---- */
  isBirthdayToday(birthdate) {
    if (!birthdate) return false;
    const bd = new Date(birthdate);
    if (isNaN(bd)) return false;
    const today = new Date();
    const todayHeb = this.getHebrewDate(today);
    const bdHeb = this.getHebrewDate(bd);
    if (!todayHeb || !bdHeb) return false;
    return todayHeb.day === bdHeb.day && todayHeb.month === bdHeb.month;
  },

  getUpcomingBirthdays(students, days = 7) {
    const today = new Date();
    const upcoming = [];

    students.forEach(s => {
      const bd = s['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4'];
      if (!bd) return;
      const d = new Date(bd);
      if (isNaN(d)) return;

      const bdHeb = this.getHebrewDate(d);
      if (!bdHeb) return;

      // Check each of the next N days for a Hebrew date match
      for (let i = 0; i <= days; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(checkDate.getDate() + i);
        const checkHeb = this.getHebrewDate(checkDate);
        if (checkHeb && checkHeb.day === bdHeb.day && checkHeb.month === bdHeb.month) {
          const age = today.getFullYear() - d.getFullYear();
          upcoming.push({
            name: Utils.fullName(s),
            hebrewDate: bdHeb.day + ' ' + bdHeb.month,
            daysUntil: i,
            age: age,
            gregorianBirth: bd
          });
          break;
        }
      }
    });

    return upcoming.sort((a, b) => a.daysUntil - b.daysUntil);
  },

  /* ---- Data export: CSV from table element ---- */
  exportTableCSV(tableEl, filename) {
    if (!tableEl) return;
    let csv = '\uFEFF';
    tableEl.querySelectorAll('tr').forEach(row => {
      const cells = [...row.querySelectorAll('th,td')].map(c => '"'+c.textContent.replace(/"/g,'""')+'"');
      csv += cells.join(',') + '\n';
    });
    const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob);
    link.download = (filename||'table')+'_'+Utils.todayISO()+'.csv'; link.click();
    Utils.toast('CSV \u05D9\u05D5\u05E6\u05D0');
  },

  /* ---- Sortable table columns ---- */
  initSortableTable(tableId) {
    const table = document.getElementById(tableId);
    if (!table) return;
    table.querySelectorAll('thead th').forEach((th, idx) => {
      th.style.cursor = 'pointer';
      th.style.userSelect = 'none';
      th.innerHTML += ' <i class="bi bi-arrow-down-up" style="font-size:.7rem;opacity:.3"></i>';
      th.addEventListener('click', () => {
        const tbody = table.querySelector('tbody');
        const rows = [...tbody.querySelectorAll('tr')];
        const dir = th.dataset.sortDir === 'asc' ? 'desc' : 'asc';
        // Reset all headers
        table.querySelectorAll('thead th').forEach(h => { h.dataset.sortDir = ''; h.querySelector('i').className = 'bi bi-arrow-down-up'; h.querySelector('i').style.opacity = '.3'; });
        th.dataset.sortDir = dir;
        th.querySelector('i').className = dir === 'asc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down';
        th.querySelector('i').style.opacity = '1';
        rows.sort((a, b) => {
          let aVal = a.cells[idx]?.textContent?.trim() || '';
          let bVal = b.cells[idx]?.textContent?.trim() || '';
          // Try numeric sort
          const aNum = parseFloat(aVal.replace(/[^\d.-]/g, ''));
          const bNum = parseFloat(bVal.replace(/[^\d.-]/g, ''));
          if (!isNaN(aNum) && !isNaN(bNum)) return dir === 'asc' ? aNum - bNum : bNum - aNum;
          // String sort
          return dir === 'asc' ? aVal.localeCompare(bVal, 'he') : bVal.localeCompare(aVal, 'he');
        });
        rows.forEach(r => tbody.appendChild(r));
      });
    });
  },

  /* ---- Pagination ---- */
  paginate(items, page, perPage = 20) {
    const total = Math.ceil(items.length / perPage);
    const start = (page - 1) * perPage;
    return {
      items: items.slice(start, start + perPage),
      page, total, perPage,
      hasNext: page < total,
      hasPrev: page > 1
    };
  },

  paginationHTML(current, total, onClickFn) {
    if (total <= 1) return '';
    const cur = Math.max(1, Math.min(current, total));
    const start = Math.max(1, cur - 3);
    const end = Math.min(total, cur + 3);
    let html = '<nav class="mt-3"><ul class="pagination pagination-sm justify-content-center">';
    html += `<li class="page-item ${cur <= 1 ? 'disabled' : ''}"><a class="page-link" href="#" onclick="${onClickFn}(${cur-1});return false"><i class="bi bi-chevron-right"></i></a></li>`;
    if (start > 1) {
      html += `<li class="page-item"><a class="page-link" href="#" onclick="${onClickFn}(1);return false">1</a></li>`;
      if (start > 2) html += `<li class="page-item disabled"><span class="page-link">…</span></li>`;
    }
    for (let i = start; i <= end; i++) {
      html += `<li class="page-item ${i === cur ? 'active' : ''}"><a class="page-link" href="#" onclick="${onClickFn}(${i});return false">${i}</a></li>`;
    }
    if (end < total) {
      if (end < total - 1) html += `<li class="page-item disabled"><span class="page-link">…</span></li>`;
      html += `<li class="page-item"><a class="page-link" href="#" onclick="${onClickFn}(${total});return false">${total}</a></li>`;
    }
    html += `<li class="page-item ${cur >= total ? 'disabled' : ''}"><a class="page-link" href="#" onclick="${onClickFn}(${cur+1});return false"><i class="bi bi-chevron-left"></i></a></li>`;
    html += '</ul></nav>';
    return html;
  },

  /* ---- Copy to clipboard ---- */
  copyText(text) {
    navigator.clipboard.writeText(text).then(() => this.toast('\u05D4\u05D5\u05E2\u05EA\u05E7!')).catch(() => {
      // Fallback
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.toast('\u05D4\u05D5\u05E2\u05EA\u05E7!');
    });
  },

  /* ---- Export all tables on page as CSV ---- */
  exportAllTablesCSV() {
    document.querySelectorAll('.table-bht').forEach((table, idx) => {
      const page = App.currentPage || 'data';
      this.exportTableCSV(table, page + '_' + (idx+1));
    });
  },

  /* ---- Relative time ---- */
  relativeTime(date) {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d)) return date;
    const diff = Math.round((Date.now() - d) / 1000);
    if (diff < 60) return '\u05E2\u05DB\u05E9\u05D9\u05D5';
    if (diff < 3600) return Math.round(diff/60) + ' \u05D3\u05E7\u05D5\u05EA';
    if (diff < 86400) return Math.round(diff/3600) + ' \u05E9\u05E2\u05D5\u05EA';
    if (diff < 604800) return Math.round(diff/86400) + ' \u05D9\u05DE\u05D9\u05DD';
    return this.formatDateShort(date);
  },

  /* ---- timeAgo: Hebrew relative time with "לפני" prefix ---- */
  timeAgo(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    const diff = Math.round((Date.now() - d) / 1000);
    if (diff < 60) return '\u05DC\u05E4\u05E0\u05D9 \u05E9\u05E0\u05D9\u05D5\u05EA \u05E1\u05E4\u05D5\u05E8\u05D5\u05EA';
    if (diff < 3600) {
      const m = Math.round(diff / 60);
      return '\u05DC\u05E4\u05E0\u05D9 ' + m + (m === 1 ? ' \u05D3\u05E7\u05D4' : ' \u05D3\u05E7\u05D5\u05EA');
    }
    if (diff < 86400) {
      const h = Math.round(diff / 3600);
      return '\u05DC\u05E4\u05E0\u05D9 ' + (h === 1 ? '\u05E9\u05E2\u05D4' : h + ' \u05E9\u05E2\u05D5\u05EA');
    }
    if (diff < 2592000) {
      const days = Math.round(diff / 86400);
      return '\u05DC\u05E4\u05E0\u05D9 ' + (days === 1 ? '\u05D9\u05D5\u05DD' : days + ' \u05D9\u05DE\u05D9\u05DD');
    }
    if (diff < 31536000) {
      const months = Math.round(diff / 2592000);
      return '\u05DC\u05E4\u05E0\u05D9 ' + (months === 1 ? '\u05D7\u05D5\u05D3\u05E9' : months + ' \u05D7\u05D5\u05D3\u05E9\u05D9\u05DD');
    }
    const years = Math.round(diff / 31536000);
    return '\u05DC\u05E4\u05E0\u05D9 ' + (years === 1 ? '\u05E9\u05E0\u05D4' : years + ' \u05E9\u05E0\u05D9\u05DD');
  },

  /* ---- Print section with RTL Hebrew styling ---- */
  printSection(html, title) {
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`<!DOCTYPE html><html dir="rtl" lang="he"><head><meta charset="UTF-8">
      <title>${title || '\u05D4\u05D3\u05E4\u05E1\u05D4'}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;700&display=swap');
        *{font-family:'Heebo',sans-serif;direction:rtl}
        body{padding:20px;color:#333;font-size:14px}
        h1{font-size:20px;margin-bottom:10px;border-bottom:2px solid #1a73e8;padding-bottom:8px}
        table{width:100%;border-collapse:collapse;margin-top:10px}
        th,td{border:1px solid #ddd;padding:6px 10px;text-align:right}
        th{background:#f5f5f5;font-weight:600}
        @media print{body{padding:0} .no-print{display:none}}
      </style>
    </head><body>
      ${title ? '<h1>' + title + '</h1>' : ''}
      ${html}
      <script>window.onload=function(){window.print();}<\/script>
    </body></html>`);
    win.document.close();
  },

  /* ---- Generate random 8-char alphanumeric ID ---- */
  generateId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 8; i++) id += chars.charAt(Math.floor(Math.random() * chars.length));
    return id;
  },

  /* ---- Group array of objects by key ---- */
  groupBy(arr, key) {
    if (!Array.isArray(arr)) return {};
    return arr.reduce((groups, item) => {
      const val = item[key] ?? '';
      (groups[val] = groups[val] || []).push(item);
      return groups;
    }, {});
  },

  /* ---- Sort array by key, ascending or descending ---- */
  sortBy(arr, key, dir = 'asc') {
    if (!Array.isArray(arr)) return [];
    return [...arr].sort((a, b) => {
      let aVal = a[key], bVal = b[key];
      // Numeric comparison if both are numbers
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return dir === 'asc' ? aVal - bVal : bVal - aVal;
      }
      // String comparison (Hebrew-aware)
      aVal = String(aVal ?? '');
      bVal = String(bVal ?? '');
      const cmp = aVal.localeCompare(bVal, 'he');
      return dir === 'asc' ? cmp : -cmp;
    });
  },

  /* ---- Truncate string with ellipsis ---- */
  truncate(str, len = 50) {
    if (!str) return '';
    str = String(str);
    return str.length > len ? str.slice(0, len) + '\u2026' : str;
  },

  /* ---- Hebrew day name for any date ---- */
  hebrewDayName(date) {
    const d = date instanceof Date ? date : new Date(date || Date.now());
    if (isNaN(d)) return '';
    return '\u05D9\u05D5\u05DD ' + this.HEB_DAYS[d.getDay()];
  },

  /* ---- Check if date string is today ---- */
  isToday(dateStr) {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    if (isNaN(d)) return false;
    const today = new Date();
    return d.getFullYear() === today.getFullYear() &&
           d.getMonth() === today.getMonth() &&
           d.getDate() === today.getDate();
  },

  /* ---- Calculate age in years from date string ---- */
  calculateAge(birthDate) {
    return this.calcAge(birthDate);
  },

  /* ---- Sanitize HTML: basic XSS prevention ---- */
  sanitizeHTML(str) {
    if (!str) return '';
    const map = { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;', '/':'&#x2F;' };
    return String(str).replace(/[&<>"'/]/g, c => map[c]);
  },

  /* ---- Escape HTML (alias for sanitizeHTML) ---- */
  escapeHTML(str) {
    if (!str) return '';
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
  },

  /* ---- Hebrew month names ---- */
  HEB_MONTHS: ['\u05D9\u05E0\u05D5\u05D0\u05E8','\u05E4\u05D1\u05E8\u05D5\u05D0\u05E8','\u05DE\u05E8\u05E5','\u05D0\u05E4\u05E8\u05D9\u05DC','\u05DE\u05D0\u05D9','\u05D9\u05D5\u05E0\u05D9','\u05D9\u05D5\u05DC\u05D9','\u05D0\u05D5\u05D2\u05D5\u05E1\u05D8','\u05E1\u05E4\u05D8\u05DE\u05D1\u05E8','\u05D0\u05D5\u05E7\u05D8\u05D5\u05D1\u05E8','\u05E0\u05D5\u05D1\u05DE\u05D1\u05E8','\u05D3\u05E6\u05DE\u05D1\u05E8'],

  /* ---- Avatar color palette ---- */
  AVATAR_COLORS: ['#4e73df','#1cc88a','#36b9cc','#f6c23e','#e74a3b','#858796','#5a5c69','#6f42c1','#fd7e14','#20c997','#d63384','#0d6efd']
};
