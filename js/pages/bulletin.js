/* ===== BHT v5.3 — Bulletin Board (לוח מודעות) ===== */
Object.assign(Pages, {

  /* ---------- demo data (10 announcements) ---------- */
  _bulletinData: [
    {id:1, title:'שבת גיבוש - פרשת אמור', content:'שבת גיבוש לכל התלמידים בשבת הקרובה. איסוף ביום שישי בשעה 14:00. נא להביא ציוד שינה ואוכל לשבת. ההסעות יוצאות מהמוסד.', category:'events', date:'2026-04-24', priority:'urgent', author:'ההנהלה', pinned:true, expiry:'2026-04-25'},
    {id:2, title:'תשלום שכר לימוד - תזכורת אחרונה', content:'נא להסדיר תשלומי שכר לימוד עד סוף החודש. ניתן לשלם בהעברה בנקאית או במזומן במזכירות. לאחר התאריך ייגבו דמי פיגור.', category:'administrative', date:'2026-04-21', priority:'important', author:'גזברות', pinned:true, expiry:'2026-04-30'},
    {id:3, title:'מבחן בגמרא - כיתה א\'', content:'מבחן בגמרא מסכת ברכות דף ב-י ביום רביעי הקרוב. החומר כולל תוספות ורש"י. נא להתכונן בהתאם.', category:'academic', date:'2026-04-23', priority:'important', author:'הרב סורוצקין', pinned:false, expiry:'2026-04-24'},
    {id:4, title:'מבצע לימוד מיוחד לחודש ניסן', content:'מבצע לימוד מיוחד לחודש ניסן - פרסים מיוחדים למצטיינים! הרשמה במזכירות עד יום שלישי.', category:'academic', date:'2026-04-20', priority:'urgent', author:'ההנהלה', pinned:true, expiry:'2026-05-01'},
    {id:5, title:'תיקון מזגנים - הודעה חשובה', content:'ביום ראשון הקרוב יתבצע תיקון מזגנים בקומה ב\'. נא לא להפעיל מזגנים באותו יום. מתנצלים על אי הנוחות.', category:'administrative', date:'2026-04-22', priority:'normal', author:'אחזקה', pinned:false, expiry:'2026-04-27'},
    {id:6, title:'הרשמה לקייטנת קיץ', content:'ההרשמה לקייטנת הקיץ תשפ"ו נפתחה! מקומות מוגבלים. מחיר מוזל לנרשמים עד סוף אפריל.', category:'events', date:'2026-04-19', priority:'normal', author:'מזכירות', pinned:false, expiry:'2026-05-15'},
    {id:7, title:'שיעור כללי - הרב יעקובוביץ', content:'שיעור כללי מיוחד של הרב יעקובוביץ ביום חמישי בשעה 20:00 בהיכל הגדול. הנושא: סוגיות בדיני ממונות.', category:'academic', date:'2026-04-22', priority:'normal', author:'ההנהלה', pinned:false, expiry:'2026-04-24'},
    {id:8, title:'עדכון שעות פתיחת המזכירות', content:'החל מהשבוע הבא שעות המזכירות יהיו: א-ה 08:00-16:00, יום ו\' 08:00-12:00. בשעות הצהריים (13:00-14:00) המזכירות סגורה.', category:'general', date:'2026-04-18', priority:'normal', author:'מזכירות', pinned:false, expiry:null},
    {id:9, title:'אסיפת הורים - כיתה ב\'', content:'אסיפת הורים לכיתה ב\' תתקיים ביום שני ה-28/4 בשעה 19:30. נוכחות חובה. יוגשו כיבוד קל ומשקאות.', category:'events', date:'2026-04-22', priority:'important', author:'הרב כהן', pinned:false, expiry:'2026-04-28'},
    {id:10, title:'איסוף ספרים ישנים', content:'אנו אוספים ספרי לימוד ישנים לתרומה. ניתן להניח בקופסה ליד המזכירות. תודה על שיתוף הפעולה!', category:'general', date:'2026-04-15', priority:'normal', author:'ועד המוסד', pinned:false, expiry:'2026-04-10'},
  ],

  _bulletinNextId: 11,
  _bulletinFilter: { search:'', category:'all', showArchive:false },

  /* ---------- category / priority maps ---------- */
  _blnCategories: {
    all:            { label:'הכל',    icon:'bi-grid-fill' },
    general:        { label:'כללי',   icon:'bi-info-circle-fill',  color:'secondary' },
    academic:       { label:'לימודי', icon:'bi-mortarboard-fill',  color:'info' },
    events:         { label:'אירועים',icon:'bi-calendar-event-fill',color:'primary' },
    administrative: { label:'מנהלי',  icon:'bi-building-fill',     color:'warning' },
  },
  _blnPriorities: {
    urgent:    { label:'דחוף',   color:'danger' },
    important: { label:'חשוב',   color:'warning' },
    normal:    { label:'רגיל',   color:'secondary' },
  },

  /* ---------- main render ---------- */
  bulletin() {
    const cats = this._blnCategories;
    const catBtns = Object.entries(cats).map(([k,v]) =>
      `<button class="btn btn-sm btn-outline-${v.color||'primary'} bln-cat-btn ${k==='all'?'active':''}" data-cat="${k}" onclick="Pages.bulletinFilterCat('${k}')"><i class="bi ${v.icon} me-1"></i>${v.label}</button>`
    ).join('');

    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div>
          <h1><i class="bi bi-megaphone-fill me-2"></i>לוח מודעות</h1>
          <p class="text-muted mb-0">מודעות, הודעות ועדכונים למוסד</p>
        </div>
        <div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-outline-secondary btn-sm" id="bln-archive-btn" onclick="Pages.bulletinToggleArchive()">
            <i class="bi bi-archive me-1"></i>ארכיון
          </button>
          <button class="btn btn-primary btn-sm" onclick="Pages.showAddBulletin()">
            <i class="bi bi-plus-lg me-1"></i>מודעה חדשה
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="row g-3 mb-4" id="bln-stats">
        <div class="col-6 col-md-3">
          <div class="card stat-card p-3">
            <div class="stat-icon gradient-primary"><i class="bi bi-megaphone-fill"></i></div>
            <div class="stat-value" id="bln-stat-total">--</div>
            <div class="stat-label">סה"כ מודעות</div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card stat-card p-3">
            <div class="stat-icon gradient-success"><i class="bi bi-check-circle-fill"></i></div>
            <div class="stat-value" id="bln-stat-active">--</div>
            <div class="stat-label">פעילות</div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card stat-card p-3">
            <div class="stat-icon gradient-warning"><i class="bi bi-pin-angle-fill"></i></div>
            <div class="stat-value" id="bln-stat-pinned">--</div>
            <div class="stat-label">נעוצות</div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card stat-card p-3">
            <div class="stat-icon gradient-info"><i class="bi bi-calendar-week-fill"></i></div>
            <div class="stat-value" id="bln-stat-week">--</div>
            <div class="stat-label">השבוע</div>
          </div>
        </div>
      </div>

      <!-- Search + Category filters -->
      <div class="card mb-3">
        <div class="card-body p-3">
          <div class="row g-2 align-items-center">
            <div class="col-md-5">
              <div class="input-group input-group-sm">
                <span class="input-group-text"><i class="bi bi-search"></i></span>
                <input type="text" class="form-control" id="bln-search" placeholder="חיפוש מודעה..." oninput="Pages.bulletinFilterSearch(this.value)">
              </div>
            </div>
            <div class="col-md-7">
              <div class="d-flex gap-1 flex-wrap">${catBtns}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pinned section -->
      <div id="bln-pinned-section" style="display:none">
        <h6 class="text-muted mb-2"><i class="bi bi-pin-angle-fill me-1 text-warning"></i>מודעות נעוצות</h6>
        <div id="bln-pinned-list"></div>
        <hr>
      </div>

      <!-- Main list -->
      <div id="bulletin-list">${Utils.skeleton(3)}</div>

      <!-- Create/Edit Modal -->
      <div class="modal fade" id="bln-modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="bln-modal-title">מודעה חדשה</h5>
              <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label fw-bold">כותרת</label>
                <input type="text" class="form-control" id="bln-f-title" placeholder="כותרת המודעה">
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">תוכן</label>
                <textarea class="form-control" id="bln-f-content" rows="4" placeholder="תוכן המודעה..."></textarea>
              </div>
              <div class="row g-3">
                <div class="col-6">
                  <label class="form-label fw-bold">קטגוריה</label>
                  <select class="form-select" id="bln-f-category">
                    <option value="general">כללי</option>
                    <option value="academic">לימודי</option>
                    <option value="events">אירועים</option>
                    <option value="administrative">מנהלי</option>
                  </select>
                </div>
                <div class="col-6">
                  <label class="form-label fw-bold">עדיפות</label>
                  <select class="form-select" id="bln-f-priority">
                    <option value="normal">רגיל</option>
                    <option value="important">חשוב</option>
                    <option value="urgent">דחוף</option>
                  </select>
                </div>
              </div>
              <div class="row g-3 mt-1">
                <div class="col-6">
                  <label class="form-label fw-bold">תאריך תפוגה</label>
                  <input type="date" class="form-control" id="bln-f-expiry">
                </div>
                <div class="col-6 d-flex align-items-end">
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="bln-f-pinned">
                    <label class="form-check-label fw-bold" for="bln-f-pinned">
                      <i class="bi bi-pin-angle-fill me-1"></i>נעיצה
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary btn-sm" data-bs-dismiss="modal">ביטול</button>
              <button class="btn btn-primary btn-sm" onclick="Pages.saveBulletin()"><i class="bi bi-check-lg me-1"></i>שמירה</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /* ---------- init ---------- */
  async bulletinInit() {
    this._bulletinFilter = { search:'', category:'all', showArchive:false };

    // Try loading from API, fall back to localStorage, then demo data
    try {
      const apiData = await App.getData('לוח_מודעות');
      if (apiData && apiData.length) {
        this._bulletinData = apiData;
        this._bulletinNextId = Math.max(...apiData.map(b => b.id || 0)) + 1;
      } else {
        this._blnLoadFromStorage();
      }
    } catch(e) {
      this._blnLoadFromStorage();
    }

    this._bulletinRender();
  },

  _blnLoadFromStorage() {
    try {
      const stored = localStorage.getItem('bht_bulletin_data');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.length) {
          this._bulletinData = parsed;
          this._bulletinNextId = Math.max(...parsed.map(b => b.id || 0)) + 1;
        }
      }
    } catch(e) { /* keep demo data */ }
  },

  _blnSaveToStorage() {
    try { localStorage.setItem('bht_bulletin_data', JSON.stringify(this._bulletinData)); } catch(e) {}
  },

  /* ---------- rendering ---------- */
  _bulletinRender() {
    const today = new Date().toISOString().slice(0,10);
    const weekAgo = new Date(Date.now() - 7*86400000).toISOString().slice(0,10);
    let data = [...this._bulletinData];

    // separate expired
    const isExpired = b => b.expiry && b.expiry < today;
    const active = data.filter(b => !isExpired(b));
    const expired = data.filter(b => isExpired(b));

    // stats
    const el = id => document.getElementById(id);
    el('bln-stat-total').textContent = data.length;
    el('bln-stat-active').textContent = active.length;
    el('bln-stat-pinned').textContent = data.filter(b => b.pinned).length;
    el('bln-stat-week').textContent = data.filter(b => b.date >= weekAgo).length;

    // archive button state
    const archBtn = el('bln-archive-btn');
    if (this._bulletinFilter.showArchive) {
      archBtn.classList.replace('btn-outline-secondary','btn-secondary');
      archBtn.innerHTML = '<i class="bi bi-archive-fill me-1"></i>הסתר ארכיון (' + expired.length + ')';
    } else {
      archBtn.classList.replace('btn-secondary','btn-outline-secondary');
      archBtn.innerHTML = '<i class="bi bi-archive me-1"></i>ארכיון (' + expired.length + ')';
    }

    // choose working set
    let items = this._bulletinFilter.showArchive ? data : active;

    // filter by category
    if (this._bulletinFilter.category !== 'all') {
      items = items.filter(b => b.category === this._bulletinFilter.category);
    }

    // filter by search
    const q = this._bulletinFilter.search.trim().toLowerCase();
    if (q) {
      items = items.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.content.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q)
      );
    }

    // sort: pinned first, then by date desc
    items.sort((a,b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return b.date.localeCompare(a.date);
    });

    // split pinned vs unpinned
    const pinned = items.filter(b => b.pinned);
    const unpinned = items.filter(b => !b.pinned);

    // render pinned section
    const pinnedSection = el('bln-pinned-section');
    if (pinned.length > 0) {
      pinnedSection.style.display = '';
      el('bln-pinned-list').innerHTML = pinned.map(b => this._bulletinCard(b, true)).join('');
    } else {
      pinnedSection.style.display = 'none';
    }

    // render main list
    const listEl = el('bulletin-list');
    if (unpinned.length > 0) {
      listEl.innerHTML = unpinned.map(b => this._bulletinCard(b, false)).join('');
    } else if (pinned.length === 0) {
      listEl.innerHTML = `<div class="text-center text-muted py-5"><i class="bi bi-megaphone fs-1 d-block mb-2"></i>אין מודעות להצגה</div>`;
    } else {
      listEl.innerHTML = '';
    }
  },

  _bulletinCard(b, isPinnedSection) {
    const cats = this._blnCategories;
    const pris = this._blnPriorities;
    const cat = cats[b.category] || cats.general;
    const pri = pris[b.priority] || pris.normal;
    const today = new Date().toISOString().slice(0,10);
    const expired = b.expiry && b.expiry < today;

    // priority badge
    const priBadge = b.priority !== 'normal'
      ? `<span class="badge bg-${pri.color} me-1"><i class="bi bi-${b.priority==='urgent'?'exclamation-triangle-fill':'exclamation-circle-fill'} me-1"></i>${pri.label}</span>`
      : '';

    // pin icon
    const pinIcon = b.pinned
      ? `<i class="bi bi-pin-angle-fill text-warning ms-1" title="נעוצה"></i>`
      : '';

    // expired badge
    const expBadge = expired
      ? `<span class="badge bg-dark bg-opacity-50 me-1"><i class="bi bi-clock-history me-1"></i>פג תוקף</span>`
      : '';

    // content preview (max ~120 chars)
    const preview = b.content.length > 120 ? b.content.slice(0,120) + '...' : b.content;

    // border color
    const borderColor = b.priority === 'urgent' ? 'danger' : (b.priority === 'important' ? 'warning' : (cat.color || 'secondary'));

    return `
      <div class="card mb-3 p-0 overflow-hidden bulletin-card ${expired?'opacity-75':''}" style="border-right:4px solid var(--bs-${borderColor})">
        <div class="card-body p-3">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <div class="d-flex align-items-center flex-wrap gap-1">
              ${pinIcon}
              <span class="badge bg-${cat.color||'secondary'}"><i class="bi ${cat.icon} me-1"></i>${cat.label}</span>
              ${priBadge}
              ${expBadge}
              <strong class="ms-1">${b.title}</strong>
            </div>
            <div class="d-flex align-items-center gap-2">
              <small class="text-muted text-nowrap">${Utils.formatDateShort(b.date)}</small>
              <div class="dropdown">
                <button class="btn btn-sm btn-link text-muted p-0" data-bs-toggle="dropdown"><i class="bi bi-three-dots-vertical"></i></button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><a class="dropdown-item" href="#" onclick="Pages.bulletinTogglePin(${b.id});return false"><i class="bi bi-pin-angle${b.pinned?'-fill':''} me-2"></i>${b.pinned?'בטל נעיצה':'נעץ'}</a></li>
                  <li><a class="dropdown-item" href="#" onclick="Pages.editBulletin(${b.id});return false"><i class="bi bi-pencil me-2"></i>עריכה</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item text-danger" href="#" onclick="Pages.deleteBulletin(${b.id});return false"><i class="bi bi-trash me-2"></i>מחיקה</a></li>
                </ul>
              </div>
            </div>
          </div>
          <p class="mb-2 text-body-secondary">${preview}</p>
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted"><i class="bi bi-person me-1"></i>${b.author}</small>
            ${b.expiry ? `<small class="text-muted"><i class="bi bi-hourglass-split me-1"></i>תפוגה: ${Utils.formatDateShort(b.expiry)}</small>` : ''}
          </div>
        </div>
      </div>`;
  },

  /* ---------- filters ---------- */
  bulletinFilterSearch(val) {
    this._bulletinFilter.search = val;
    this._bulletinRender();
  },

  bulletinFilterCat(cat) {
    this._bulletinFilter.category = cat;
    document.querySelectorAll('.bln-cat-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cat === cat);
    });
    this._bulletinRender();
  },

  bulletinToggleArchive() {
    this._bulletinFilter.showArchive = !this._bulletinFilter.showArchive;
    this._bulletinRender();
  },

  /* ---------- pin toggle ---------- */
  bulletinTogglePin(id) {
    const b = this._bulletinData.find(x => x.id === id);
    if (b) {
      b.pinned = !b.pinned;
      this._blnSaveToStorage();
      try { App.apiCall('update', 'לוח_מודעות', { id, row: b }); } catch(e) {}
      this._bulletinRender();
      Utils.toast(b.pinned ? 'המודעה נעוצה' : 'הנעיצה בוטלה');
    }
  },

  /* ---------- create / edit ---------- */
  _blnEditId: null,

  showAddBulletin() {
    this._blnEditId = null;
    document.getElementById('bln-modal-title').textContent = 'מודעה חדשה';
    document.getElementById('bln-f-title').value = '';
    document.getElementById('bln-f-content').value = '';
    document.getElementById('bln-f-category').value = 'general';
    document.getElementById('bln-f-priority').value = 'normal';
    document.getElementById('bln-f-expiry').value = '';
    document.getElementById('bln-f-pinned').checked = false;
    new bootstrap.Modal(document.getElementById('bln-modal')).show();
  },

  editBulletin(id) {
    const b = this._bulletinData.find(x => x.id === id);
    if (!b) return;
    this._blnEditId = id;
    document.getElementById('bln-modal-title').textContent = 'עריכת מודעה';
    document.getElementById('bln-f-title').value = b.title;
    document.getElementById('bln-f-content').value = b.content;
    document.getElementById('bln-f-category').value = b.category;
    document.getElementById('bln-f-priority').value = b.priority;
    document.getElementById('bln-f-expiry').value = b.expiry || '';
    document.getElementById('bln-f-pinned').checked = b.pinned;
    new bootstrap.Modal(document.getElementById('bln-modal')).show();
  },

  saveBulletin() {
    const title = document.getElementById('bln-f-title').value.trim();
    const content = document.getElementById('bln-f-content').value.trim();
    const category = document.getElementById('bln-f-category').value;
    const priority = document.getElementById('bln-f-priority').value;
    const expiry = document.getElementById('bln-f-expiry').value || null;
    const pinned = document.getElementById('bln-f-pinned').checked;

    if (!title) { Utils.toast('נא להזין כותרת', 'warning'); return; }
    if (!content) { Utils.toast('נא להזין תוכן', 'warning'); return; }

    if (this._blnEditId) {
      const b = this._bulletinData.find(x => x.id === this._blnEditId);
      if (b) { Object.assign(b, { title, content, category, priority, expiry, pinned }); }
      this._blnSaveToStorage();
      try { App.apiCall('update', 'לוח_מודעות', { id: this._blnEditId, row: b }); } catch(e) {}
      Utils.toast('המודעה עודכנה');
    } else {
      const newItem = {
        id: this._bulletinNextId++,
        title, content, category, priority, pinned, expiry,
        date: new Date().toISOString().slice(0,10),
        author: 'מזכירות',
      };
      this._bulletinData.unshift(newItem);
      this._blnSaveToStorage();
      try { App.apiCall('add', 'לוח_מודעות', { row: newItem }); } catch(e) {}
      Utils.toast('מודעה חדשה נוספה');
    }

    bootstrap.Modal.getInstance(document.getElementById('bln-modal')).hide();
    this._blnEditId = null;
    this._bulletinRender();
  },

  deleteBulletin(id) {
    if (!confirm('למחוק את המודעה?')) return;
    this._bulletinData = this._bulletinData.filter(x => x.id !== id);
    this._blnSaveToStorage();
    try { App.apiCall('delete', 'לוח_מודעות', { id }); } catch(e) {}
    this._bulletinRender();
    Utils.toast('המודעה נמחקה');
  },
});
