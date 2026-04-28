/* ===== BHT v5.3 — Notifications Center ===== */
Object.assign(Pages, {
  /* ======================================================================
     NOTIFICATIONS (התראות)
     ====================================================================== */
  _notifLS: 'bht_notifications',
  _notifPrefsLS: 'bht_notif_prefs',
  _notifFilter: 'all',
  _notifUseDemo: false,

  _notifTypes: {
    attendance: { icon: 'bi-clipboard-check', color: 'warning', label: 'נוכחות' },
    finance:    { icon: 'bi-currency-dollar', color: 'info', label: 'כספים' },
    academic:   { icon: 'bi-book', color: 'success', label: 'לימודים' },
    parent:     { icon: 'bi-people', color: 'primary', label: 'הודעת הורה' },
    system:     { icon: 'bi-gear', color: 'secondary', label: 'מערכת' },
    task:       { icon: 'bi-check2-square', color: 'dark', label: 'משימה' }
  },

  _defaultNotifications: [

    { id: 1,  type: 'attendance', title: 'חיסורים חריגים', desc: 'לתלמיד יוסף כהן 5 חיסורים השבוע. נדרשת התייחסות.', ts: Date.now() - 300000, read: false, important: true, archived: false },
    { id: 2,  type: 'finance', title: 'תשלום התקבל', desc: 'משפחת לוי העבירה תשלום שכר לימוד בסך 2,400 \u20AA.', ts: Date.now() - 600000, read: true, important: false, archived: false },
    { id: 3,  type: 'academic', title: 'ציוני מבחן הוזנו', desc: 'הרב סורוצקין הזין ציוני מבחן בגמרא לכיתה א\'.', ts: Date.now() - 1800000, read: false, important: false, archived: false }
  ],

  notificationsLoadDemo() {
    this._notifUseDemo = true;
    const data = JSON.parse(JSON.stringify(this._defaultNotifications));
    this._saveNotifications(data);
    App.navigate('notifications');
  },

  _getNotifications() {
    try {
      const raw = localStorage.getItem(this._notifLS);
      if (raw) return JSON.parse(raw);
    } catch(e) { /* silent */ }
    if (this._notifUseDemo) {
      const data = JSON.parse(JSON.stringify(this._defaultNotifications));
      this._saveNotifications(data);
      return data;
    }
    return [];
  },

  _saveNotifications(data) {
    try { localStorage.setItem(this._notifLS, JSON.stringify(data)); } catch(e) { /* silent */ }
  },

  _getPrefs() {
    try {
      const raw = localStorage.getItem(this._notifPrefsLS);
      if (raw) return JSON.parse(raw);
    } catch(e) { /* silent */ }
    return {
      attendance: true, finance: true, academic: true,
      parent: true, system: true, task: true,
      emailDigest: false
    };
  },

  _savePrefs(prefs) {
    try { localStorage.setItem(this._notifPrefsLS, JSON.stringify(prefs)); } catch(e) { /* silent */ }
  },

  _relativeTime(ts) {
    const diff = Date.now() - ts;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return '\u05E2\u05DB\u05E9\u05D9\u05D5';
    if (mins < 60) return '\u05DC\u05E4\u05E0\u05D9 ' + mins + ' \u05D3\u05E7\u05D5\u05EA';
    const hours = Math.floor(mins / 60);
    if (hours < 24) return '\u05DC\u05E4\u05E0\u05D9 ' + hours + ' \u05E9\u05E2\u05D5\u05EA';
    const days = Math.floor(hours / 24);
    if (days < 7) return '\u05DC\u05E4\u05E0\u05D9 ' + days + ' \u05D9\u05DE\u05D9\u05DD';
    return '\u05DC\u05E4\u05E0\u05D9 ' + Math.floor(days / 7) + ' \u05E9\u05D1\u05D5\u05E2\u05D5\u05EA';
  },

  notifications() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div><h1><i class="bi bi-bell-fill me-2"></i>\u05D4\u05EA\u05E8\u05D0\u05D5\u05EA</h1><p>\u05DE\u05E8\u05DB\u05D6 \u05D4\u05EA\u05E8\u05D0\u05D5\u05EA \u05D5\u05E2\u05D3\u05DB\u05D5\u05E0\u05D9\u05DD</p></div>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-secondary btn-sm" onclick="Pages.notifShowPrefs()"><i class="bi bi-sliders me-1"></i>\u05D4\u05E2\u05D3\u05E4\u05D5\u05EA</button>
        </div>
      </div>

      <!-- Stats -->
      <div class="row g-3 mb-4" id="notif-stats">
        <div class="col-6 col-md-3"><div class="card stat-card p-3"><div class="stat-icon gradient-primary"><i class="bi bi-bell-fill"></i></div><div class="stat-value" id="notif-stat-total">--</div><div class="stat-label">\u05E1\u05D4\u05F4\u05DB \u05D4\u05EA\u05E8\u05D0\u05D5\u05EA</div></div></div>
        <div class="col-6 col-md-3"><div class="card stat-card p-3"><div class="stat-icon gradient-danger"><i class="bi bi-envelope-fill"></i></div><div class="stat-value" id="notif-stat-unread">--</div><div class="stat-label">\u05DC\u05D0 \u05E0\u05E7\u05E8\u05D0\u05D5</div></div></div>
        <div class="col-6 col-md-3"><div class="card stat-card p-3"><div class="stat-icon gradient-success"><i class="bi bi-calendar-event"></i></div><div class="stat-value" id="notif-stat-today">--</div><div class="stat-label">\u05D4\u05D9\u05D5\u05DD</div></div></div>
        <div class="col-6 col-md-3"><div class="card stat-card p-3"><div class="stat-icon gradient-info"><i class="bi bi-grid-fill"></i></div><div class="stat-value" id="notif-stat-categories">--</div><div class="stat-label">\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D5\u05EA</div></div></div>
      </div>

      <!-- Filter Tabs -->
      <div class="card p-2 mb-3">
        <div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-sm btn-primary notif-tab" data-filter="all" onclick="Pages.notifSetFilter('all')">\u05D4\u05DB\u05DC</button>
          <button class="btn btn-sm btn-outline-secondary notif-tab" data-filter="unread" onclick="Pages.notifSetFilter('unread')"><i class="bi bi-envelope me-1"></i>\u05DC\u05D0 \u05E0\u05E7\u05E8\u05D0\u05D5</button>
          <button class="btn btn-sm btn-outline-secondary notif-tab" data-filter="important" onclick="Pages.notifSetFilter('important')"><i class="bi bi-star me-1"></i>\u05D7\u05E9\u05D5\u05D1</button>
          <button class="btn btn-sm btn-outline-secondary notif-tab" data-filter="archived" onclick="Pages.notifSetFilter('archived')"><i class="bi bi-archive me-1"></i>\u05D0\u05E8\u05DB\u05D9\u05D5\u05DF</button>
        </div>
      </div>

      <!-- Bulk Actions -->
      <div class="d-flex gap-2 mb-3 flex-wrap">
        <button class="btn btn-outline-success btn-sm" onclick="Pages.notifMarkAllRead()"><i class="bi bi-check-all me-1"></i>\u05E1\u05DE\u05DF \u05D4\u05DB\u05DC \u05DB\u05E0\u05E7\u05E8\u05D0</button>
        <button class="btn btn-outline-danger btn-sm" onclick="Pages.notifDeleteAllRead()"><i class="bi bi-trash me-1"></i>\u05DE\u05D7\u05E7 \u05E0\u05E7\u05E8\u05D0\u05D5\u05EA</button>
        <button class="btn btn-outline-secondary btn-sm" onclick="Pages.notifArchiveRead()"><i class="bi bi-archive me-1"></i>\u05D0\u05E8\u05DB\u05D9\u05D1 \u05E0\u05E7\u05E8\u05D0\u05D5\u05EA</button>
      </div>

      <!-- Notification List -->
      <div id="notif-list">${Utils.skeleton(5)}</div>

      <!-- Preferences Modal -->
      <div class="modal fade" id="notif-prefs-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
        <div class="modal-header"><h5 class="modal-title"><i class="bi bi-sliders me-2"></i>\u05D4\u05E2\u05D3\u05E4\u05D5\u05EA \u05D4\u05EA\u05E8\u05D0\u05D5\u05EA</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body" id="notif-prefs-body"></div>
        <div class="modal-footer"><button class="btn btn-primary" onclick="Pages.notifSavePrefs()">\u05E9\u05DE\u05D5\u05E8</button><button class="btn btn-secondary" data-bs-dismiss="modal">\u05E1\u05D2\u05D5\u05E8</button></div>
      </div></div></div>

      <!-- Detail Modal -->
      <div class="modal fade" id="notif-detail-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
        <div class="modal-header"><h5 class="modal-title" id="notif-detail-title"></h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body" id="notif-detail-body"></div>
        <div class="modal-footer">
          <button class="btn btn-outline-success btn-sm" id="notif-detail-read-btn" onclick="Pages.notifToggleReadFromDetail()"><i class="bi bi-check-lg me-1"></i>\u05E1\u05DE\u05DF \u05DB\u05E0\u05E7\u05E8\u05D0</button>
          <button class="btn btn-outline-danger btn-sm" id="notif-detail-del-btn" onclick="Pages.notifDeleteFromDetail()"><i class="bi bi-trash me-1"></i>\u05DE\u05D7\u05E7</button>
          <button class="btn btn-secondary btn-sm" data-bs-dismiss="modal">\u05E1\u05D2\u05D5\u05E8</button>
        </div>
      </div></div></div>
    `;
  },

  notificationsInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    const _safeTs = (d) => { if (!d) return 0; const t = new Date(d).getTime(); return isNaN(t) ? 0 : t; };
    this._notifFilter = 'all';
    this._notifDetailId = null;

    // Build notifications from real DATA_CACHE sheets
    const events = [];
    let idCounter = 1;

    // Attendance records
    const att = _gc('\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA');
    att.forEach(row => {
      const date = row['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '';
      const ts = _safeTs(date);
      if (!ts) return;
      const status = row['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '';
      const name = row['\u05E9\u05DD'] || '';
      const cls = row['\u05DB\u05D9\u05EA\u05D4'] || '';
      const statusLabel = status === '\u05E0\u05D5\u05DB\u05D7' ? '\u05E0\u05D5\u05DB\u05D7' : status === '\u05D7\u05D9\u05E1\u05D5\u05E8' ? '\u05D7\u05D9\u05E1\u05D5\u05E8' : status;
      events.push({
        id: idCounter++, type: 'attendance',
        title: statusLabel + ' \u2014 ' + name,
        desc: '\u05DB\u05D9\u05EA\u05D4 ' + cls + (row['\u05D4\u05E2\u05E8\u05D4'] ? ' | ' + row['\u05D4\u05E2\u05E8\u05D4'] : ''),
        ts, read: false, important: status !== '\u05E0\u05D5\u05DB\u05D7', archived: false
      });
    });

    // Behavior records
    const beh = _gc('\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA');
    beh.forEach(row => {
      const date = row['\u05EA\u05D0\u05E8\u05D9\u05DA'] || '';
      const ts = _safeTs(date);
      const name = row['\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3'] || '';
      const kind = row['\u05E1\u05D5\u05D2'] || '';
      const severity = row['\u05D7\u05D5\u05DE\u05E8\u05D4'] || '';
      events.push({
        id: idCounter++, type: 'academic',
        title: '\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA: ' + name,
        desc: kind + (severity ? ' (\u05D7\u05D5\u05DE\u05E8\u05D4 ' + severity + ')' : '') + (row['\u05EA\u05D9\u05D0\u05D5\u05E8'] ? ' \u2014 ' + row['\u05EA\u05D9\u05D0\u05D5\u05E8'] : ''),
        ts: ts || Date.now() - idCounter * 60000, read: false,
        important: kind !== '\u05D7\u05D9\u05D5\u05D1\u05D9', archived: false
      });
    });

    // Finance / tuition records
    const fin = _gc('\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3');
    fin.forEach(row => {
      const date = row['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05EA\u05E9\u05DC\u05D5\u05DD'] || '';
      const ts = _safeTs(date);
      const name = row['\u05E9\u05DD'] || '';
      const amount = row['\u05E1\u05DB\u05D5\u05DD'] || '';
      const status = row['\u05E1\u05D8\u05D8\u05D5\u05E1'] || '';
      const method = row['\u05D0\u05DE\u05E6\u05E2\u05D9_\u05EA\u05E9\u05DC\u05D5\u05DD'] || '';
      events.push({
        id: idCounter++, type: 'finance',
        title: '\u05EA\u05E9\u05DC\u05D5\u05DD: ' + name,
        desc: amount + ' \u20AA' + (status ? ' | ' + status : '') + (method ? ' | ' + method : ''),
        ts: ts || Date.now() - idCounter * 60000, read: false,
        important: false, archived: false
      });
    });

    // Email notifications from EMAIL_CACHE
    if (typeof EMAIL_CACHE !== 'undefined' && EMAIL_CACHE.inbox) {
      EMAIL_CACHE.inbox.filter(e => e.unread).slice(0, 5).forEach(e => {
        const senderName = (e.from || '').replace(/<[^>]+>/g, '').replace(/"/g, '').trim();
        events.push({
          id: idCounter++, type: 'parent',
          title: '\u05D3\u05D5\u05D0\u05E8: ' + (e.subject || '\u05DC\u05DC\u05D0 \u05E0\u05D5\u05E9\u05D0'),
          desc: '\u05DE\u05D0\u05EA: ' + senderName.substring(0, 30) + (e.snippet ? ' \u2014 ' + e.snippet.substring(0, 60) + '...' : ''),
          ts: _safeTs(e.date) || Date.now(),
          read: false, important: true, archived: false
        });
      });
    }

    // Group same-day same-type attendance/behavior events to reduce noise
    const grouped = {};
    const passthrough = [];
    events.forEach(e => {
      if (e.type !== 'attendance' && e.type !== 'academic') { passthrough.push(e); return; }
      const day = new Date(e.ts).toISOString().slice(0, 10);
      const head = (e.title || '').split('—')[0].trim();
      const key = e.type + '|' + day + '|' + head;
      if (!grouped[key]) grouped[key] = { ...e, _group: true, _children: [e] };
      else grouped[key]._children.push(e);
    });
    const groupedArr = Object.values(grouped).map(g => {
      if (g._children.length < 2) return g._children[0];
      const names = g._children.map(c => (c.title || '').split('—')[1]?.trim()).filter(Boolean);
      return { ...g, title: g._children.length + ' ' + (g.title.split('—')[0].trim()), desc: names.slice(0, 4).join(', ') + (names.length > 4 ? `, +${names.length - 4}` : '') };
    });
    const merged = passthrough.concat(groupedArr);

    // Sort by date desc, take last 20
    merged.sort((a, b) => b.ts - a.ts);
    const top20 = merged.slice(0, 20);

    if (top20.length) {
      this._saveNotifications(top20);
    }

    this._renderNotifList();
  },

  _renderNotifList() {
    const all = this._getNotifications();
    const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);

    // Stats
    const active = all.filter(n => !n.archived);
    const unread = active.filter(n => !n.read);
    const today = active.filter(n => n.ts >= todayStart.getTime());
    const categories = new Set(active.map(n => n.type));

    const setTxt = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    setTxt('notif-stat-total', active.length);
    setTxt('notif-stat-unread', unread.length);
    setTxt('notif-stat-today', today.length);
    setTxt('notif-stat-categories', categories.size);

    // Update tab styles
    document.querySelectorAll('.notif-tab').forEach(btn => {
      const f = btn.dataset.filter;
      if (f === this._notifFilter) {
        btn.className = 'btn btn-sm btn-primary notif-tab';
      } else {
        btn.className = 'btn btn-sm btn-outline-secondary notif-tab';
      }
    });

    // Filter
    let filtered;
    switch (this._notifFilter) {
      case 'unread':   filtered = all.filter(n => !n.read && !n.archived); break;
      case 'important': filtered = all.filter(n => n.important && !n.archived); break;
      case 'archived': filtered = all.filter(n => n.archived); break;
      default:         filtered = all.filter(n => !n.archived); break;
    }

    filtered.sort((a, b) => b.ts - a.ts);

    if (!filtered.length) {
      document.getElementById('notif-list').innerHTML =
        '<div class="card p-4 text-center text-muted"><i class="bi bi-bell-slash fs-1 d-block mb-2"></i>\u05D0\u05D9\u05DF \u05D4\u05EA\u05E8\u05D0\u05D5\u05EA \u05DC\u05D4\u05E6\u05D2\u05D4</div>';
      return;
    }

    const html = filtered.map(n => {
      const t = this._notifTypes[n.type] || this._notifTypes.system;
      const unreadClass = n.read ? '' : 'border-start border-3 border-primary';
      const unreadBg = n.read ? '' : 'bg-light';
      const importantStar = n.important ? '<i class="bi bi-star-fill text-warning ms-2" title="\u05D7\u05E9\u05D5\u05D1"></i>' : '';
      return `
        <div class="card mb-2 ${unreadClass} ${unreadBg}" style="cursor:pointer; transition: all 0.15s">
          <div class="card-body p-3 d-flex align-items-start gap-3" onclick="Pages.notifShowDetail(${n.id})">
            <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                 style="width:42px;height:42px;background:var(--bs-${t.color}-bg-subtle, #f0f0f0)">
              <i class="bi ${t.icon} text-${t.color} fs-5"></i>
            </div>
            <div class="flex-grow-1 min-width-0">
              <div class="d-flex justify-content-between align-items-start mb-1">
                <div>
                  <span class="badge bg-${t.color} me-2">${t.label}</span>
                  <strong class="${n.read ? '' : 'text-primary'}">${Utils.escapeHTML(n.title || '')}</strong>
                  ${importantStar}
                </div>
                <small class="text-muted text-nowrap me-2">${this._relativeTime(n.ts)}</small>
              </div>
              <p class="mb-0 text-muted small text-truncate">${Utils.escapeHTML(n.desc || '')}</p>
            </div>
            <div class="d-flex gap-1 flex-shrink-0" onclick="event.stopPropagation()">
              <button class="btn btn-sm ${n.read ? 'btn-outline-secondary' : 'btn-outline-success'}" title="${n.read ? '\u05E1\u05DE\u05DF \u05DB\u05DC\u05D0 \u05E0\u05E7\u05E8\u05D0' : '\u05E1\u05DE\u05DF \u05DB\u05E0\u05E7\u05E8\u05D0'}" onclick="Pages.notifToggleRead(${n.id})">
                <i class="bi ${n.read ? 'bi-envelope' : 'bi-check-lg'}"></i>
              </button>
              <button class="btn btn-sm btn-outline-danger" title="\u05DE\u05D7\u05E7" onclick="Pages.notifDelete(${n.id})">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>`;
    }).join('');

    document.getElementById('notif-list').innerHTML = html;
  },

  notifSetFilter(filter) {
    this._notifFilter = filter;
    this._renderNotifList();
  },

  notifToggleRead(id) {
    const data = this._getNotifications();
    const n = data.find(x => x.id === id);
    if (n) { n.read = !n.read; this._saveNotifications(data); this._renderNotifList(); }
  },

  notifDelete(id) {
    let data = this._getNotifications();
    data = data.filter(x => x.id !== id);
    this._saveNotifications(data);
    this._renderNotifList();
    Utils.toast('\u05D4\u05EA\u05E8\u05D0\u05D4 \u05E0\u05DE\u05D7\u05E7\u05D4', 'success');
  },

  notifMarkAllRead() {
    const data = this._getNotifications();
    data.forEach(n => { if (!n.archived) n.read = true; });
    this._saveNotifications(data);
    this._renderNotifList();
    Utils.toast('\u05DB\u05DC \u05D4\u05D4\u05EA\u05E8\u05D0\u05D5\u05EA \u05E1\u05D5\u05DE\u05E0\u05D5 \u05DB\u05E0\u05E7\u05E8\u05D0\u05D5\u05EA', 'success');
  },

  notifDeleteAllRead() {
    let data = this._getNotifications();
    const before = data.length;
    data = data.filter(n => !n.read || n.archived);
    this._saveNotifications(data);
    this._renderNotifList();
    Utils.toast('\u05E0\u05DE\u05D7\u05E7\u05D5 ' + (before - data.length) + ' \u05D4\u05EA\u05E8\u05D0\u05D5\u05EA', 'success');
  },

  notifArchiveRead() {
    const data = this._getNotifications();
    let count = 0;
    data.forEach(n => { if (n.read && !n.archived) { n.archived = true; count++; } });
    this._saveNotifications(data);
    this._renderNotifList();
    Utils.toast('\u05D4\u05D5\u05E2\u05D1\u05E8\u05D5 \u05DC\u05D0\u05E8\u05DB\u05D9\u05D5\u05DF ' + count + ' \u05D4\u05EA\u05E8\u05D0\u05D5\u05EA', 'success');
  },

  notifShowDetail(id) {
    const data = this._getNotifications();
    const n = data.find(x => x.id === id);
    if (!n) return;
    this._notifDetailId = id;

    // Mark as read on open
    if (!n.read) {
      n.read = true;
      this._saveNotifications(data);
      this._renderNotifList();
    }

    const t = this._notifTypes[n.type] || this._notifTypes.system;
    document.getElementById('notif-detail-title').innerHTML =
      `<i class="bi ${t.icon} text-${t.color} me-2"></i>${n.title}`;
    document.getElementById('notif-detail-body').innerHTML = `
      <div class="mb-3">
        <span class="badge bg-${t.color} me-2">${t.label}</span>
        ${n.important ? '<span class="badge bg-warning">\u05D7\u05E9\u05D5\u05D1</span>' : ''}
        <small class="text-muted float-start">${this._relativeTime(n.ts)}</small>
      </div>
      <hr>
      <p class="mb-0">${n.desc}</p>
    `;
    const readBtn = document.getElementById('notif-detail-read-btn');
    if (readBtn) {
      readBtn.innerHTML = n.read
        ? '<i class="bi bi-envelope me-1"></i>\u05E1\u05DE\u05DF \u05DB\u05DC\u05D0 \u05E0\u05E7\u05E8\u05D0'
        : '<i class="bi bi-check-lg me-1"></i>\u05E1\u05DE\u05DF \u05DB\u05E0\u05E7\u05E8\u05D0';
    }

    const modal = new bootstrap.Modal(document.getElementById('notif-detail-modal'));
    modal.show();
  },

  notifToggleReadFromDetail() {
    if (this._notifDetailId) {
      this.notifToggleRead(this._notifDetailId);
      bootstrap.Modal.getInstance(document.getElementById('notif-detail-modal'))?.hide();
    }
  },

  notifDeleteFromDetail() {
    if (this._notifDetailId) {
      this.notifDelete(this._notifDetailId);
      bootstrap.Modal.getInstance(document.getElementById('notif-detail-modal'))?.hide();
    }
  },

  notifShowPrefs() {
    const prefs = this._getPrefs();
    const types = this._notifTypes;
    let html = '<h6 class="fw-bold mb-3">\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D5\u05EA \u05D4\u05EA\u05E8\u05D0\u05D5\u05EA</h6>';
    html += '<div class="list-group mb-4">';
    for (const [key, t] of Object.entries(types)) {
      html += `
        <label class="list-group-item d-flex align-items-center gap-3">
          <input type="checkbox" class="form-check-input notif-pref-cat" data-cat="${key}" ${prefs[key] !== false ? 'checked' : ''}>
          <i class="bi ${t.icon} text-${t.color}"></i>
          <span>${t.label}</span>
        </label>`;
    }
    html += '</div>';
    html += `
      <h6 class="fw-bold mb-3">\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA \u05E0\u05D5\u05E1\u05E4\u05D5\u05EA</h6>
      <label class="list-group-item d-flex align-items-center gap-3">
        <input type="checkbox" class="form-check-input" id="notif-pref-digest" ${prefs.emailDigest ? 'checked' : ''}>
        <i class="bi bi-envelope text-info"></i>
        <span>\u05E1\u05D9\u05DB\u05D5\u05DD \u05D9\u05D5\u05DE\u05D9 \u05D1\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC</span>
      </label>`;
    document.getElementById('notif-prefs-body').innerHTML = html;
    const modal = new bootstrap.Modal(document.getElementById('notif-prefs-modal'));
    modal.show();
  },

  notifSavePrefs() {
    const prefs = {};
    document.querySelectorAll('.notif-pref-cat').forEach(cb => {
      prefs[cb.dataset.cat] = cb.checked;
    });
    prefs.emailDigest = document.getElementById('notif-pref-digest')?.checked || false;
    this._savePrefs(prefs);
    bootstrap.Modal.getInstance(document.getElementById('notif-prefs-modal'))?.hide();
    Utils.toast('\u05D4\u05E2\u05D3\u05E4\u05D5\u05EA \u05E0\u05E9\u05DE\u05E8\u05D5', 'success');
  }
});
