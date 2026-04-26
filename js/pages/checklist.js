/* ===== BHT v6.0 — Checklist Module (Full Rewrite) ===== */
Object.assign(Pages, {

  /* ---- Storage key ---- */
  _clKey: 'bht_checklists_v2',
  _clUseDemo: false,

  /* ---- Staff names for assignees ---- */
  _clStaff: ['יוסף', 'משה', 'אהרן', 'דוד', 'שמעון', 'יצחק'],

  /* ---- Priority config ---- */
  _clPriority: {
    high:   { label: 'גבוהה', cls: 'danger',  icon: 'bi-exclamation-triangle-fill' },
    medium: { label: 'בינונית', cls: 'warning', icon: 'bi-dash-circle' },
    low:    { label: 'נמוכה', cls: 'info',    icon: 'bi-arrow-down-circle' }
  },

  /* ---- Templates ---- */
  _clTemplates: {
    year_start: {
      name: 'תחילת שנה',
      icon: 'bi-calendar-event',
      category: 'שנתי',
      items: [

        { title: 'עדכון רשימת תלמידים', priority: 'high', assignee: 'יוסף', notes: 'לוודא שכל התלמידים החדשים נרשמו' },
        { title: 'הכנת מערכת שעות', priority: 'high', assignee: 'משה', notes: '' },
        { title: 'בדיקת ציוד כיתות', priority: 'medium', assignee: 'אהרן', notes: 'לוחות, מקרנים, מזגנים' }
  ]
    },
    year_end: {
      name: 'סוף שנה',
      icon: 'bi-flag',
      category: 'שנתי',
      items: [
        { title: 'הכנת תעודות', priority: 'high', assignee: 'יוסף', notes: 'ציונים סופיים + הערות' },
        { title: 'טקס סיום', priority: 'medium', assignee: 'משה', notes: 'הזמנות, סידורי ישיבה' },
        { title: 'גיבוי נתונים שנתי', priority: 'high', assignee: 'יוסף', notes: '' },
        { title: 'סגירת חשבונות כספיים', priority: 'high', assignee: 'דוד', notes: 'בדיקת יתרות חוב' },
        { title: 'ניקיון כללי של המוסד', priority: 'low', assignee: 'שמעון', notes: '' },
        { title: 'החזרת ספרים מושאלים', priority: 'medium', assignee: 'אהרן', notes: '' },
      ]
    },
    event_prep: {
      name: 'הכנה לאירוע',
      icon: 'bi-star',
      category: 'אירועים',
      items: [
        { title: 'הזמנת מקום / אולם', priority: 'high', assignee: 'משה', notes: '' },
        { title: 'הזמנת כיבוד', priority: 'medium', assignee: 'אהרן', notes: '' },
        { title: 'שליחת הזמנות', priority: 'high', assignee: 'יוסף', notes: 'דוא"ל + ווטסאפ' },
        { title: 'הכנת תוכנייה', priority: 'medium', assignee: 'משה', notes: '' },
        { title: 'בדיקת מערכת הגברה', priority: 'low', assignee: 'שמעון', notes: '' },
        { title: 'צילום ותיעוד', priority: 'low', assignee: 'דוד', notes: 'לתאם צלם' },
      ]
    },
    safety: {
      name: 'בדיקת בטיחות',
      icon: 'bi-shield-check',
      category: 'בטיחות',
      items: [
        { title: 'בדיקת מטפי כיבוי', priority: 'high', assignee: 'שמעון', notes: 'תוקף + נגישות' },
        { title: 'בדיקת יציאות חירום', priority: 'high', assignee: 'שמעון', notes: 'פתוחות ומסומנות' },
        { title: 'בדיקת ערכת עזרה ראשונה', priority: 'medium', assignee: 'אהרן', notes: '' },
        { title: 'תרגיל פינוי', priority: 'high', assignee: 'משה', notes: 'לתאם עם כל הצוות' },
        { title: 'בדיקת מערכת חשמל', priority: 'medium', assignee: 'שמעון', notes: 'לוח חשמל, כבלים חשופים' },
      ]
    }
  },

  checklistLoadDemo() {
    this._clUseDemo = true;
    const demo = this._clGenerateDemo();
    localStorage.setItem(this._clKey, JSON.stringify(demo));
    App.navigate('checklist');
  },

  /* ---- Load checklists from localStorage (with API sync) ---- */
  _clLoad() {
    const raw = localStorage.getItem(this._clKey);
    if (raw) return JSON.parse(raw);
    // First time — return empty state (no auto demo)
    if (this._clUseDemo) {
      const demo = this._clGenerateDemo();
      localStorage.setItem(this._clKey, JSON.stringify(demo));
      return demo;
    }
    return { lists: [], activeListId: null, filter: 'all', priorityFilter: 'all' };
  },

  _clSave(data) {
    localStorage.setItem(this._clKey, JSON.stringify(data));
    // Sync to API in background
    try { App.apiCall('update', 'משימות', { id: 'checklists', row: data }); } catch(e) {}
  },

  /* ---- Generate demo data ---- */
  _clGenerateDemo() {
    const today = new Date();
    const d = (offset) => {
      const dt = new Date(today);
      dt.setDate(dt.getDate() + offset);
      return dt.toISOString().slice(0, 10);
    };
    return {
      lists: [
        {
          id: 'cl_1', name: 'משימות יומיות', category: 'יומי', color: 'primary', createdAt: d(0),
          items: [

            { id: 'i1', title: 'סימון נוכחות בוקר', done: true, priority: 'high', dueDate: d(0), assignee: 'יוסף', notes: 'עד 09:00', createdAt: d(-1) },
            { id: 'i2', title: 'בדיקת נוכחות תפילות', done: false, priority: 'high', dueDate: d(0), assignee: 'משה', notes: '', createdAt: d(-1) },
            { id: 'i3', title: 'בדיקת דואר נכנס', done: true, priority: 'medium', dueDate: d(0), assignee: 'יוסף', notes: 'כולל דוא"ל והודעות', createdAt: d(-1) }
  ]
        },
        {
          id: 'cl_2', name: 'הכנות לטיול שנתי', category: 'אירועים', color: 'success', createdAt: d(-5),
          items: [

            { id: 'i8', title: 'הזמנת אוטובוס', done: true, priority: 'high', dueDate: d(-2), assignee: 'משה', notes: 'חברת נסיעות אגד', createdAt: d(-5) },
            { id: 'i9', title: 'אישורי הורים', done: false, priority: 'high', dueDate: d(2), assignee: 'יוסף', notes: 'חסרים 5 אישורים', createdAt: d(-5) },
            { id: 'i10', title: 'הזמנת כיבוד לדרך', done: true, priority: 'medium', dueDate: d(-1), assignee: 'אהרן', notes: 'סנדוויצ\'ים + שתייה', createdAt: d(-4) }
  ]
        },
        {
          id: 'cl_3', name: 'בדיקת בטיחות חודשית', category: 'בטיחות', color: 'danger', createdAt: d(-10),
          items: [
            { id: 'i15', title: 'בדיקת מטפי כיבוי', done: true, priority: 'high', dueDate: d(-3), assignee: 'שמעון', notes: 'כל הקומות', createdAt: d(-10) },
            { id: 'i16', title: 'בדיקת יציאות חירום', done: true, priority: 'high', dueDate: d(-3), assignee: 'שמעון', notes: 'לוודא שלטי חירום דולקים', createdAt: d(-10) },
            { id: 'i17', title: 'בדיקת ערכת עזרה ראשונה', done: false, priority: 'medium', dueDate: d(-1), assignee: 'אהרן', notes: 'להשלים חומרים חסרים', createdAt: d(-10) }
          ]
        }
      ],
      activeListId: 'cl_1',
      filter: 'all',       // all | active | completed
      priorityFilter: 'all' // all | high | medium | low
    };
  },

  /* ---- Stats computation ---- */
  _clStats(lists) {
    const today = Utils.todayISO();
    let total = 0, completed = 0, pending = 0, overdue = 0;
    lists.forEach(list => {
      list.items.forEach(item => {
        total++;
        if (item.done) { completed++; }
        else {
          pending++;
          if (item.dueDate && item.dueDate < today) overdue++;
        }
      });
    });
    return { total, completed, pending, overdue };
  },

  /* ---- List-level stats ---- */
  _clListStats(list) {
    const today = Utils.todayISO();
    const total = list.items.length;
    const completed = list.items.filter(i => i.done).length;
    const overdue = list.items.filter(i => !i.done && i.dueDate && i.dueDate < today).length;
    const pct = total ? Math.round(completed / total * 100) : 0;
    return { total, completed, overdue, pct };
  },

  /* ============================================================
     MAIN RENDER
     ============================================================ */
  checklist() {
    const data = this._clLoad();
    const stats = this._clStats(data.lists);
    const activeList = data.lists.find(l => l.id === data.activeListId) || data.lists[0];

    return `
      <!-- Header -->
      <div class="page-header mb-4">
        <div class="d-flex justify-content-between align-items-start flex-wrap gap-3">
          <div>
            <h1 class="mb-1"><i class="bi bi-check2-square me-2"></i>צ'קליסטים</h1>
            <p class="text-muted mb-0">${Utils.dayName()} | ${Utils.formatDate(new Date())}</p>
          </div>
          <div class="d-flex gap-2 flex-wrap">
            <div class="dropdown">
              <button class="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown">
                <i class="bi bi-file-earmark-plus me-1"></i>תבנית
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                ${Object.entries(this._clTemplates).map(([key, tpl]) => `
                  <li><a class="dropdown-item" href="#" onclick="Pages._clFromTemplate('${key}');return false;">
                    <i class="bi ${tpl.icon} me-2"></i>${tpl.name}
                  </a></li>
                `).join('')}
              </ul>
            </div>
            <button class="btn btn-primary" onclick="Pages._clShowNewListModal()">
              <i class="bi bi-plus-lg me-1"></i>צ'קליסט חדש
            </button>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="row g-3 mb-4">
        <div class="col-6 col-md-3">
          <div class="card text-center p-3 border-start border-primary border-4">
            <div class="fs-2 fw-bold text-primary">${stats.total}</div>
            <small class="text-muted"><i class="bi bi-list-check me-1"></i>סה"כ משימות</small>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card text-center p-3 border-start border-success border-4">
            <div class="fs-2 fw-bold text-success">${stats.completed}</div>
            <small class="text-muted"><i class="bi bi-check-circle me-1"></i>הושלמו</small>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card text-center p-3 border-start border-warning border-4">
            <div class="fs-2 fw-bold text-warning">${stats.pending}</div>
            <small class="text-muted"><i class="bi bi-hourglass-split me-1"></i>ממתינות</small>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card text-center p-3 border-start border-danger border-4">
            <div class="fs-2 fw-bold text-danger">${stats.overdue}</div>
            <small class="text-muted"><i class="bi bi-exclamation-circle me-1"></i>באיחור</small>
          </div>
        </div>
      </div>

      <!-- Main Layout: Sidebar + Content -->
      <div class="row g-4">
        <!-- Sidebar: Checklists -->
        <div class="col-lg-4">
          <div class="card">
            <div class="card-header bg-light fw-bold">
              <i class="bi bi-collection me-1"></i>הצ'קליסטים שלי
            </div>
            <div class="list-group list-group-flush" id="cl-sidebar">
              ${data.lists.map(list => {
                const ls = this._clListStats(list);
                const active = list.id === (activeList?.id);
                return `
                  <a href="#" class="list-group-item list-group-item-action ${active ? 'active' : ''}"
                     onclick="Pages._clSelectList('${list.id}');return false;">
                    <div class="d-flex justify-content-between align-items-center">
                      <div>
                        <span class="badge bg-${list.color} me-1">&nbsp;</span>
                        <span class="fw-semibold">${list.name}</span>
                      </div>
                      <span class="badge bg-${active ? 'light text-dark' : 'secondary'} rounded-pill">${ls.completed}/${ls.total}</span>
                    </div>
                    <div class="progress mt-2" style="height:5px">
                      <div class="progress-bar bg-${list.color}" style="width:${ls.pct}%"></div>
                    </div>
                    <div class="d-flex justify-content-between mt-1">
                      <small class="${active ? 'text-light' : 'text-muted'}">${list.category}</small>
                      <small class="${active ? 'text-light' : 'text-muted'}">${ls.pct}%</small>
                    </div>
                  </a>`;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- Main: Active checklist items -->
        <div class="col-lg-8">
          ${activeList ? this._clRenderList(activeList, data) : '<div class="text-center text-muted py-5"><i class="bi bi-inbox fs-1 d-block mb-2"></i>אין צ\'קליסטים. צור אחד חדש!</div>'}
        </div>
      </div>

      <!-- New List Modal -->
      <div class="modal fade" id="cl-new-list-modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"><i class="bi bi-plus-circle me-2"></i>צ'קליסט חדש</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">שם הצ'קליסט</label>
                <input type="text" class="form-control" id="cl-new-name" placeholder="לדוגמה: משימות שבועיות">
              </div>
              <div class="mb-3">
                <label class="form-label">קטגוריה</label>
                <input type="text" class="form-control" id="cl-new-category" placeholder="לדוגמה: יומי, שבועי, אירועים">
              </div>
              <div class="mb-3">
                <label class="form-label">צבע</label>
                <div class="d-flex gap-2" id="cl-color-picker">
                  ${['primary','success','danger','warning','info','secondary'].map(c =>
                    `<button type="button" class="btn btn-${c} rounded-circle p-0 ${c === 'primary' ? 'ring ring-2' : ''}" style="width:32px;height:32px;border:3px solid transparent" onclick="Pages._clPickColor(this,'${c}')" data-color="${c}"></button>`
                  ).join('')}
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">ביטול</button>
              <button class="btn btn-primary" onclick="Pages._clCreateList()">
                <i class="bi bi-plus-lg me-1"></i>צור
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- New Item Modal -->
      <div class="modal fade" id="cl-new-item-modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="cl-item-modal-title"><i class="bi bi-plus-circle me-2"></i>משימה חדשה</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <input type="hidden" id="cl-edit-item-id" value="">
              <div class="mb-3">
                <label class="form-label">כותרת</label>
                <input type="text" class="form-control" id="cl-item-title" placeholder="תיאור המשימה">
              </div>
              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label class="form-label">עדיפות</label>
                  <select class="form-select" id="cl-item-priority">
                    <option value="high">גבוהה</option>
                    <option value="medium" selected>בינונית</option>
                    <option value="low">נמוכה</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">תאריך יעד</label>
                  <input type="date" class="form-control" id="cl-item-due">
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">אחראי</label>
                <select class="form-select" id="cl-item-assignee">
                  <option value="">לא שויך</option>
                  ${this._clStaff.map(s => `<option value="${s}">${s}</option>`).join('')}
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">הערות</label>
                <textarea class="form-control" id="cl-item-notes" rows="2" placeholder="הערות נוספות..."></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">ביטול</button>
              <button class="btn btn-primary" onclick="Pages._clSaveItem()">
                <i class="bi bi-check-lg me-1"></i>שמור
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /* ---- Init: set up keyboard and state ---- */
  checklistInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    // Try to load from API and merge/replace local data
    try {
      const apiData = _gc('משימות');
      if (apiData && apiData.length && apiData[0].lists) {
        // API returned checklist data object
        localStorage.setItem(this._clKey, JSON.stringify(apiData[0]));
      } else if (apiData && apiData.lists) {
        localStorage.setItem(this._clKey, JSON.stringify(apiData));
      }
    } catch(e) { /* keep local data */ }
  },

  /* ============================================================
     RENDER ACTIVE LIST
     ============================================================ */
  _clRenderList(list, data) {
    const ls = this._clListStats(list);
    const today = Utils.todayISO();

    // Apply filters
    let items = [...list.items];
    if (data.filter === 'active') items = items.filter(i => !i.done);
    if (data.filter === 'completed') items = items.filter(i => i.done);
    if (data.priorityFilter && data.priorityFilter !== 'all') items = items.filter(i => i.priority === data.priorityFilter);

    return `
      <div class="card">
        <!-- List Header -->
        <div class="card-header bg-${list.color} bg-opacity-10">
          <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div>
              <h5 class="mb-0 fw-bold">
                <span class="badge bg-${list.color} me-2">&nbsp;</span>${list.name}
                <small class="text-muted fw-normal ms-2">${list.category}</small>
              </h5>
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-sm btn-outline-success" onclick="Pages._clShowNewItemModal()">
                <i class="bi bi-plus-lg me-1"></i>הוסף משימה
              </button>
              <button class="btn btn-sm btn-outline-danger" onclick="Pages._clDeleteList('${list.id}')" title="מחק צ'קליסט">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
          <!-- Progress -->
          <div class="d-flex align-items-center gap-2 mt-2">
            <div class="progress flex-grow-1" style="height:10px">
              <div class="progress-bar bg-${list.color}" style="width:${ls.pct}%;transition:width 0.4s"></div>
            </div>
            <span class="fw-bold text-${list.color}">${ls.pct}%</span>
            <small class="text-muted">(${ls.completed}/${ls.total})</small>
          </div>
        </div>

        <!-- Filters -->
        <div class="card-body border-bottom py-2">
          <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div class="btn-group btn-group-sm">
              <button class="btn btn-${data.filter === 'all' ? '' : 'outline-'}secondary" onclick="Pages._clSetFilter('all')">הכל</button>
              <button class="btn btn-${data.filter === 'active' ? '' : 'outline-'}warning" onclick="Pages._clSetFilter('active')">פעילות</button>
              <button class="btn btn-${data.filter === 'completed' ? '' : 'outline-'}success" onclick="Pages._clSetFilter('completed')">הושלמו</button>
            </div>
            <select class="form-select form-select-sm" style="width:auto" onchange="Pages._clSetPriorityFilter(this.value)">
              <option value="all" ${data.priorityFilter === 'all' ? 'selected' : ''}>כל העדיפויות</option>
              <option value="high" ${data.priorityFilter === 'high' ? 'selected' : ''}>גבוהה</option>
              <option value="medium" ${data.priorityFilter === 'medium' ? 'selected' : ''}>בינונית</option>
              <option value="low" ${data.priorityFilter === 'low' ? 'selected' : ''}>נמוכה</option>
            </select>
          </div>
        </div>

        <!-- Items List -->
        <div class="list-group list-group-flush" id="cl-items">
          ${items.length === 0
            ? '<div class="text-center text-muted py-4"><i class="bi bi-check-all fs-1 d-block mb-2"></i>אין משימות להצגה</div>'
            : items.map((item, idx) => {
                const p = this._clPriority[item.priority] || this._clPriority.medium;
                const isOverdue = !item.done && item.dueDate && item.dueDate < today;
                const isDueToday = item.dueDate === today;
                return `
                  <div class="list-group-item ${item.done ? 'bg-success bg-opacity-10' : ''} ${isOverdue ? 'border-start border-danger border-4' : ''}" id="cl-item-${item.id}">
                    <div class="d-flex align-items-start gap-3">
                      <!-- Checkbox -->
                      <div class="form-check mt-1">
                        <input class="form-check-input" type="checkbox" ${item.done ? 'checked' : ''}
                               style="width:22px;height:22px;cursor:pointer"
                               onchange="Pages._clToggleItem('${list.id}','${item.id}')">
                      </div>
                      <!-- Content -->
                      <div class="flex-grow-1">
                        <div class="d-flex justify-content-between align-items-start flex-wrap gap-1">
                          <span class="fw-semibold ${item.done ? 'text-decoration-line-through text-muted' : ''}">
                            ${item.title}
                          </span>
                          <div class="d-flex gap-1 align-items-center">
                            <span class="badge bg-${p.cls} bg-opacity-75"><i class="bi ${p.icon} me-1"></i>${p.label}</span>
                            ${item.assignee ? `<span class="badge bg-light text-dark border"><i class="bi bi-person me-1"></i>${item.assignee}</span>` : ''}
                          </div>
                        </div>
                        <div class="d-flex gap-3 mt-1 flex-wrap">
                          ${item.dueDate ? `<small class="${isOverdue ? 'text-danger fw-bold' : isDueToday ? 'text-warning fw-bold' : 'text-muted'}">
                            <i class="bi bi-calendar3 me-1"></i>${isOverdue ? 'באיחור! ' : isDueToday ? 'היום! ' : ''}${item.dueDate}
                          </small>` : ''}
                          ${item.notes ? `<small class="text-muted"><i class="bi bi-sticky me-1"></i>${item.notes}</small>` : ''}
                        </div>
                      </div>
                      <!-- Actions -->
                      <div class="d-flex flex-column gap-1">
                        ${idx > 0 ? `<button class="btn btn-sm btn-outline-secondary py-0 px-1" onclick="Pages._clMoveItem('${list.id}','${item.id}',-1)" title="הזז למעלה"><i class="bi bi-chevron-up"></i></button>` : ''}
                        ${idx < items.length - 1 ? `<button class="btn btn-sm btn-outline-secondary py-0 px-1" onclick="Pages._clMoveItem('${list.id}','${item.id}',1)" title="הזז למטה"><i class="bi bi-chevron-down"></i></button>` : ''}
                      </div>
                      <div class="dropdown">
                        <button class="btn btn-sm btn-link text-muted p-0" data-bs-toggle="dropdown"><i class="bi bi-three-dots-vertical"></i></button>
                        <ul class="dropdown-menu dropdown-menu-end">
                          <li><a class="dropdown-item" href="#" onclick="Pages._clEditItem('${list.id}','${item.id}');return false;"><i class="bi bi-pencil me-2"></i>עריכה</a></li>
                          <li><a class="dropdown-item text-danger" href="#" onclick="Pages._clDeleteItem('${list.id}','${item.id}');return false;"><i class="bi bi-trash me-2"></i>מחיקה</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>`;
              }).join('')
          }
        </div>
      </div>`;
  },

  /* ============================================================
     ACTIONS
     ============================================================ */

  /* -- Select list -- */
  _clSelectList(listId) {
    const data = this._clLoad();
    data.activeListId = listId;
    this._clSave(data);
    App.navigate('checklist');
  },

  /* -- Filters -- */
  _clSetFilter(f) {
    const data = this._clLoad();
    data.filter = f;
    this._clSave(data);
    App.navigate('checklist');
  },
  _clSetPriorityFilter(f) {
    const data = this._clLoad();
    data.priorityFilter = f;
    this._clSave(data);
    App.navigate('checklist');
  },

  /* -- Toggle item done -- */
  _clToggleItem(listId, itemId) {
    const data = this._clLoad();
    const list = data.lists.find(l => l.id === listId);
    if (!list) return;
    const item = list.items.find(i => i.id === itemId);
    if (!item) return;
    item.done = !item.done;
    this._clSave(data);

    // Check if all done
    const ls = this._clListStats(list);
    if (ls.pct === 100) {
      Utils.toast('כל המשימות הושלמו! כל הכבוד!', 'success');
    }

    App.navigate('checklist');
  },

  /* -- Move item up/down -- */
  _clMoveItem(listId, itemId, direction) {
    const data = this._clLoad();
    const list = data.lists.find(l => l.id === listId);
    if (!list) return;
    const idx = list.items.findIndex(i => i.id === itemId);
    if (idx < 0) return;
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= list.items.length) return;
    // Swap
    [list.items[idx], list.items[newIdx]] = [list.items[newIdx], list.items[idx]];
    this._clSave(data);
    App.navigate('checklist');
  },

  /* -- Color picker helper -- */
  _clPickColor(btn, color) {
    document.querySelectorAll('#cl-color-picker button').forEach(b => {
      b.style.borderColor = 'transparent';
    });
    btn.style.borderColor = '#333';
    btn.dataset.selected = 'true';
  },
  _clSelectedColor() {
    const sel = document.querySelector('#cl-color-picker button[data-selected="true"]');
    return sel ? sel.dataset.color : 'primary';
  },

  /* -- New list modal -- */
  _clShowNewListModal() {
    document.getElementById('cl-new-name').value = '';
    document.getElementById('cl-new-category').value = '';
    // Reset color picker
    document.querySelectorAll('#cl-color-picker button').forEach((b, i) => {
      b.style.borderColor = i === 0 ? '#333' : 'transparent';
      if (i === 0) b.dataset.selected = 'true'; else delete b.dataset.selected;
    });
    new bootstrap.Modal(document.getElementById('cl-new-list-modal')).show();
  },

  /* -- Create new list -- */
  _clCreateList() {
    const name = document.getElementById('cl-new-name').value.trim();
    const category = document.getElementById('cl-new-category').value.trim() || 'כללי';
    if (!name) { Utils.toast('נא להזין שם', 'warning'); return; }
    const color = this._clSelectedColor();
    const data = this._clLoad();
    const newList = {
      id: 'cl_' + Date.now(),
      name, category, color,
      createdAt: Utils.todayISO(),
      items: []
    };
    data.lists.push(newList);
    data.activeListId = newList.id;
    this._clSave(data);
    bootstrap.Modal.getInstance(document.getElementById('cl-new-list-modal'))?.hide();
    Utils.toast('צ\'קליסט נוצר בהצלחה', 'success');
    App.navigate('checklist');
  },

  /* -- Delete list -- */
  _clDeleteList(listId) {
    if (!confirm('למחוק את הצ\'קליסט?')) return;
    const data = this._clLoad();
    data.lists = data.lists.filter(l => l.id !== listId);
    if (data.activeListId === listId) {
      data.activeListId = data.lists.length ? data.lists[0].id : null;
    }
    this._clSave(data);
    Utils.toast('צ\'קליסט נמחק', 'danger');
    App.navigate('checklist');
  },

  /* -- Show new item modal -- */
  _clShowNewItemModal() {
    document.getElementById('cl-edit-item-id').value = '';
    document.getElementById('cl-item-title').value = '';
    document.getElementById('cl-item-priority').value = 'medium';
    document.getElementById('cl-item-due').value = Utils.todayISO();
    document.getElementById('cl-item-assignee').value = '';
    document.getElementById('cl-item-notes').value = '';
    document.getElementById('cl-item-modal-title').innerHTML = '<i class="bi bi-plus-circle me-2"></i>משימה חדשה';
    new bootstrap.Modal(document.getElementById('cl-new-item-modal')).show();
  },

  /* -- Edit item modal -- */
  _clEditItem(listId, itemId) {
    const data = this._clLoad();
    const list = data.lists.find(l => l.id === listId);
    if (!list) return;
    const item = list.items.find(i => i.id === itemId);
    if (!item) return;
    document.getElementById('cl-edit-item-id').value = itemId;
    document.getElementById('cl-item-title').value = item.title;
    document.getElementById('cl-item-priority').value = item.priority;
    document.getElementById('cl-item-due').value = item.dueDate || '';
    document.getElementById('cl-item-assignee').value = item.assignee || '';
    document.getElementById('cl-item-notes').value = item.notes || '';
    document.getElementById('cl-item-modal-title').innerHTML = '<i class="bi bi-pencil me-2"></i>עריכת משימה';
    new bootstrap.Modal(document.getElementById('cl-new-item-modal')).show();
  },

  /* -- Save item (create or update) -- */
  _clSaveItem() {
    const title = document.getElementById('cl-item-title').value.trim();
    if (!title) { Utils.toast('נא להזין כותרת', 'warning'); return; }
    const editId = document.getElementById('cl-edit-item-id').value;
    const priority = document.getElementById('cl-item-priority').value;
    const dueDate = document.getElementById('cl-item-due').value;
    const assignee = document.getElementById('cl-item-assignee').value;
    const notes = document.getElementById('cl-item-notes').value.trim();

    const data = this._clLoad();
    const list = data.lists.find(l => l.id === data.activeListId);
    if (!list) return;

    if (editId) {
      // Update existing
      const item = list.items.find(i => i.id === editId);
      if (item) {
        item.title = title;
        item.priority = priority;
        item.dueDate = dueDate;
        item.assignee = assignee;
        item.notes = notes;
      }
      Utils.toast('משימה עודכנה', 'success');
    } else {
      // Create new
      list.items.push({
        id: 'i_' + Date.now(),
        title, done: false, priority, dueDate, assignee, notes,
        createdAt: Utils.todayISO()
      });
      Utils.toast('משימה נוספה', 'success');
    }
    this._clSave(data);
    bootstrap.Modal.getInstance(document.getElementById('cl-new-item-modal'))?.hide();
    App.navigate('checklist');
  },

  /* -- Delete item -- */
  _clDeleteItem(listId, itemId) {
    const data = this._clLoad();
    const list = data.lists.find(l => l.id === listId);
    if (!list) return;
    list.items = list.items.filter(i => i.id !== itemId);
    this._clSave(data);
    Utils.toast('משימה נמחקה', 'danger');
    App.navigate('checklist');
  },

  /* -- Create list from template -- */
  _clFromTemplate(templateKey) {
    const tpl = this._clTemplates[templateKey];
    if (!tpl) return;
    const data = this._clLoad();
    const today = Utils.todayISO();
    const newList = {
      id: 'cl_' + Date.now(),
      name: tpl.name,
      category: tpl.category,
      color: templateKey === 'safety' ? 'danger' : templateKey === 'event_prep' ? 'info' : 'primary',
      createdAt: today,
      items: tpl.items.map((item, idx) => ({
        id: 'it_' + Date.now() + '_' + idx,
        title: item.title,
        done: false,
        priority: item.priority,
        dueDate: (() => { const dt = new Date(); dt.setDate(dt.getDate() + idx + 1); return dt.toISOString().slice(0, 10); })(),
        assignee: item.assignee,
        notes: item.notes,
        createdAt: today
      }))
    };
    data.lists.push(newList);
    data.activeListId = newList.id;
    this._clSave(data);
    Utils.toast(`צ'קליסט "${tpl.name}" נוצר מתבנית`, 'success');
    App.navigate('checklist');
  }
});
