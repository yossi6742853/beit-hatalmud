/* ===== BHT v5.4 — Contacts / Phonebook ===== */
Object.assign(Pages, {

  /* ======================================================================
     DEMO DATA — 30 contacts across 3 categories
     ====================================================================== */
  _contactsDemoData: [

    // --- Staff (10) ---
    { id:'c01', name:'\u05D0\u05D1\u05E8\u05D4\u05DD \u05DB\u05D4\u05DF', phone:'050-1234567', email:'avraham@bht.org', role:'\u05DE\u05D5\u05E8\u05D4', org:'\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3', category:'\u05E6\u05D5\u05D5\u05EA', notes:'\u05DE\u05D5\u05E8\u05D4 \u05D5\u05EA\u05D9\u05E7', favorite:true },
    { id:'c02', name:'\u05D9\u05E6\u05D7\u05E7 \u05DC\u05D5\u05D9', phone:'052-9876543', email:'yitzchak@bht.org', role:'\u05E8\u05D1', org:'\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3', category:'\u05E6\u05D5\u05D5\u05EA', notes:'\u05E8\u05F4\u05DE \u05D1\u05DB\u05D9\u05E8', favorite:true },
    { id:'c03', name:'\u05D9\u05E2\u05E7\u05D1 \u05D9\u05E9\u05E8\u05D0\u05DC\u05D9', phone:'053-1112233', email:'yaakov@bht.org', role:'\u05DE\u05E0\u05D4\u05DC', org:'\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3', category:'\u05E6\u05D5\u05D5\u05EA', notes:'\u05DE\u05E0\u05D4\u05DC \u05D4\u05DE\u05D5\u05E1\u05D3', favorite:true }
  ],

  /* ======================================================================
     CATEGORY & ROLE DEFINITIONS
     ====================================================================== */
  _contactsCategories: [
    { key: '\u05E6\u05D5\u05D5\u05EA',    icon: 'bi-person-badge',   color: 'primary',   label: '\u05E6\u05D5\u05D5\u05EA' },
    { key: '\u05D4\u05D5\u05E8\u05D9\u05DD',   icon: 'bi-people',        color: 'success',   label: '\u05D4\u05D5\u05E8\u05D9\u05DD' },
    { key: '\u05D7\u05D9\u05E6\u05D5\u05E0\u05D9', icon: 'bi-building',      color: 'warning',   label: '\u05D7\u05D9\u05E6\u05D5\u05E0\u05D9' }
  ],

  /* ======================================================================
     STATE
     ====================================================================== */
  _contactsData: [],
  _contactsGroups: [
    { id:'g1', name:'\u05D4\u05E0\u05D4\u05DC\u05EA \u05D4\u05DE\u05D5\u05E1\u05D3', members:['c03','c08','c02'] },
    { id:'g2', name:'\u05D5\u05E2\u05D3 \u05D4\u05D5\u05E8\u05D9\u05DD', members:['c11','c12','c13','c14','c15','c16','c17','c18','c19','c20'] },
    { id:'g3', name:'\u05E1\u05E4\u05E7\u05D9\u05DD', members:['c22','c23','c24','c25','c27','c29'] }
  ],
  _contactsActiveCategory: '',
  _contactsEditingId: null,
  _contactsUseDemo: false,

  /* ======================================================================
     MAIN PAGE HTML
     ====================================================================== */
  contacts() {
    const catFilters = this._contactsCategories.map(c =>
      `<button class="btn btn-outline-${c.color} btn-sm ct-cat-filter" data-cat="${c.key}" onclick="Pages._ctFilterCat('${c.key}',this)"><i class="bi ${c.icon} me-1"></i>${c.label}</button>`
    ).join('');

    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div><h1><i class="bi bi-person-lines-fill me-2"></i>\u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8</h1><p id="ct-count" class="text-muted mb-0"></p></div>
      <div class="d-flex gap-2 flex-wrap">
        <button class="btn btn-primary btn-sm" onclick="Pages._ctShowAdd()"><i class="bi bi-plus-lg me-1"></i>\u05D4\u05D5\u05E1\u05E3 \u05D0\u05D9\u05E9 \u05E7\u05E9\u05E8</button>
        <button class="btn btn-outline-dark btn-sm" onclick="Pages._ctPrintDirectory()"><i class="bi bi-printer me-1"></i>\u05D4\u05D3\u05E4\u05E1 \u05E1\u05E4\u05E8 \u05D8\u05DC\u05E4\u05D5\u05E0\u05D9\u05DD</button>
        <button class="btn btn-outline-info btn-sm" onclick="Pages._ctShowGroups()"><i class="bi bi-diagram-3 me-1"></i>\u05E7\u05D1\u05D5\u05E6\u05D5\u05EA</button>
        <div class="dropdown d-inline-block">
          <button class="btn btn-outline-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown"><i class="bi bi-arrow-down-up me-1"></i>\u05D9\u05D9\u05D1\u05D5\u05D0/\u05D9\u05D9\u05E6\u05D5\u05D0</button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="#" onclick="Pages._ctImportCSV();return false"><i class="bi bi-upload me-1"></i>\u05D9\u05D9\u05D1\u05D5\u05D0 CSV</a></li>
            <li><a class="dropdown-item" href="#" onclick="Pages._ctExportCSV();return false"><i class="bi bi-download me-1"></i>\u05D9\u05D9\u05E6\u05D5\u05D0 CSV</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="row g-3 mb-3" id="ct-stats">
      <div class="col-6 col-md-3"><div class="card stat-card p-3"><div class="stat-icon gradient-primary"><i class="bi bi-person-lines-fill"></i></div><div class="stat-value" id="ct-stat-total">--</div><div class="stat-label">\u05E1\u05D4"\u05DB \u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8</div></div></div>
      <div class="col-6 col-md-3"><div class="card stat-card p-3"><div class="stat-icon gradient-primary"><i class="bi bi-person-badge"></i></div><div class="stat-value" id="ct-stat-staff">--</div><div class="stat-label">\u05E6\u05D5\u05D5\u05EA</div></div></div>
      <div class="col-6 col-md-3"><div class="card stat-card p-3"><div class="stat-icon gradient-success"><i class="bi bi-people"></i></div><div class="stat-value" id="ct-stat-parents">--</div><div class="stat-label">\u05D4\u05D5\u05E8\u05D9\u05DD</div></div></div>
      <div class="col-6 col-md-3"><div class="card stat-card p-3"><div class="stat-icon gradient-warning"><i class="bi bi-building"></i></div><div class="stat-value" id="ct-stat-ext">--</div><div class="stat-label">\u05D7\u05D9\u05E6\u05D5\u05E0\u05D9</div></div></div>
    </div>

    <!-- Search + Category Filters -->
    <div class="card p-3 mb-3">
      <div class="d-flex flex-wrap gap-2 align-items-center">
        <div class="search-box flex-grow-1"><i class="bi bi-search"></i><input type="text" class="form-control" id="ct-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05DC\u05E4\u05D9 \u05E9\u05DD, \u05D8\u05DC\u05E4\u05D5\u05DF, \u05D0\u05E8\u05D2\u05D5\u05DF..."></div>
        <div class="d-flex gap-1 flex-wrap">${catFilters}
          <button class="btn btn-outline-dark btn-sm ct-cat-filter active" data-cat="" onclick="Pages._ctFilterCat('',this)"><i class="bi bi-grid me-1"></i>\u05D4\u05DB\u05DC</button>
        </div>
      </div>
    </div>

    <!-- Favorites Section -->
    <div id="ct-favorites" class="mb-3"></div>

    <!-- Contact List -->
    <div id="ct-list">${typeof Utils !== 'undefined' && Utils.skeleton ? Utils.skeleton(3) : '<div class="text-center p-4"><div class="spinner-border text-primary"></div></div>'}</div>

    <!-- Add/Edit Modal -->
    <div class="modal fade" id="ct-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title" id="ct-modal-title"><i class="bi bi-person-plus me-2"></i>\u05D4\u05D5\u05E1\u05E4\u05EA \u05D0\u05D9\u05E9 \u05E7\u05E9\u05E8</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <form id="ct-form">
          <div class="row g-3">
            <div class="col-md-6"><label class="form-label">\u05E9\u05DD \u05DE\u05DC\u05D0 *</label><input type="text" class="form-control" id="ct-f-name" required></div>
            <div class="col-md-6"><label class="form-label">\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4 *</label>
              <select class="form-select" id="ct-f-category" required>
                <option value="\u05E6\u05D5\u05D5\u05EA">\u05E6\u05D5\u05D5\u05EA</option>
                <option value="\u05D4\u05D5\u05E8\u05D9\u05DD">\u05D4\u05D5\u05E8\u05D9\u05DD</option>
                <option value="\u05D7\u05D9\u05E6\u05D5\u05E0\u05D9">\u05D7\u05D9\u05E6\u05D5\u05E0\u05D9</option>
              </select>
            </div>
            <div class="col-md-6"><label class="form-label">\u05D8\u05DC\u05E4\u05D5\u05DF</label><input type="tel" class="form-control" id="ct-f-phone" dir="ltr"></div>
            <div class="col-md-6"><label class="form-label">\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC</label><input type="email" class="form-control" id="ct-f-email" dir="ltr"></div>
            <div class="col-md-6"><label class="form-label">\u05EA\u05E4\u05E7\u05D9\u05D3</label><input type="text" class="form-control" id="ct-f-role"></div>
            <div class="col-md-6"><label class="form-label">\u05D0\u05E8\u05D2\u05D5\u05DF</label><input type="text" class="form-control" id="ct-f-org"></div>
            <div class="col-12"><label class="form-label">\u05D4\u05E2\u05E8\u05D5\u05EA</label><textarea class="form-control" id="ct-f-notes" rows="2"></textarea></div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button>
        <button type="button" class="btn btn-danger d-none" id="ct-btn-delete" onclick="Pages._ctDeleteContact()"><i class="bi bi-trash me-1"></i>\u05DE\u05D7\u05E7</button>
        <button type="button" class="btn btn-primary" onclick="Pages._ctSaveContact()"><i class="bi bi-check-lg me-1"></i>\u05E9\u05DE\u05D5\u05E8</button>
      </div>
    </div></div></div>

    <!-- Groups Modal -->
    <div class="modal fade" id="ct-groups-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title"><i class="bi bi-diagram-3 me-2"></i>\u05E7\u05D1\u05D5\u05E6\u05D5\u05EA \u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body" id="ct-groups-body"></div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary btn-sm" onclick="Pages._ctAddGroup()"><i class="bi bi-plus-lg me-1"></i>\u05E7\u05D1\u05D5\u05E6\u05D4 \u05D7\u05D3\u05E9\u05D4</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">\u05E1\u05D2\u05D5\u05E8</button>
      </div>
    </div></div></div>

    <!-- CSV Import Modal -->
    <div class="modal fade" id="ct-import-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title"><i class="bi bi-upload me-2"></i>\u05D9\u05D9\u05D1\u05D5\u05D0 CSV</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <p class="text-muted">\u05D4\u05E2\u05DC\u05D4 \u05E7\u05D5\u05D1\u05E5 CSV \u05E2\u05DD \u05E2\u05DE\u05D5\u05D3\u05D5\u05EA: <code dir="ltr">name,phone,email,role,org,category,notes</code></p>
        <input type="file" class="form-control" id="ct-import-file" accept=".csv">
        <div id="ct-import-preview" class="mt-3"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button>
        <button type="button" class="btn btn-primary" id="ct-import-btn" onclick="Pages._ctDoImport()" disabled><i class="bi bi-check-lg me-1"></i>\u05D9\u05D9\u05D1\u05D0</button>
      </div>
    </div></div></div>`;
  },

  /* ======================================================================
     INIT
     ====================================================================== */
  contactsLoadDemo() {
    this._contactsUseDemo = true;
    this._contactsData = this._contactsDemoData.map((d, i) => ({ ...d, _row: i + 2 }));
    this._ctRenderStats();
    this._ctRender();
  },

  contactsInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];

    // Load real staff data from DATA_CACHE('צוות') and map to contact format
    let staffData = _gc('\u05E6\u05D5\u05D5\u05EA');
    let contactsRaw = _gc('\u05D0\u05E0\u05E9\u05D9_\u05E7\u05E9\u05E8');

    let data = [];

    // Map staff records to contact objects
    if (staffData && staffData.length > 0) {
      data = staffData.map((s, i) => {
        const name = (typeof Utils !== 'undefined' && Utils.fullName) ? Utils.fullName(s) : (s['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9'] || '') + ' ' + (s['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4'] || '');
        return {
          id: 'staff-' + (Utils.rowId ? Utils.rowId(s) : i),
          name: name.trim() || s['\u05E9\u05DD'] || '',
          phone: s['\u05D8\u05DC\u05E4\u05D5\u05DF'] || '',
          email: s['\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC'] || '',
          role: s['\u05EA\u05E4\u05E7\u05D9\u05D3'] || '',
          org: '\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3',
          category: '\u05E6\u05D5\u05D5\u05EA',
          notes: s['\u05D4\u05E2\u05E8\u05D5\u05EA'] || '',
          favorite: false,
          _row: s._row || (i + 2),
          _source: 'staff'
        };
      });
    }

    // Also merge any existing contacts data
    if (contactsRaw && contactsRaw.length > 0) {
      data = data.concat(contactsRaw);
    }

    // Fallback to demo data
    if (!data.length) {
      if (this._contactsUseDemo) {
        data = this._contactsDemoData.map((d, i) => ({ ...d, _row: i + 2 }));
      } else {
        data = [];
      }
    }

    this._contactsData = data;
    this._contactsActiveCategory = '';
    this._contactsEditingId = null;

    document.getElementById('ct-search').addEventListener('input',
      Utils.debounce(() => this._ctRender(), 200));

    this._ctRenderStats();
    this._ctRender();
  },

  /* ======================================================================
     STATS
     ====================================================================== */
  _ctRenderStats() {
    const d = this._contactsData;
    const staff = d.filter(c => c.category === '\u05E6\u05D5\u05D5\u05EA').length;
    const parents = d.filter(c => c.category === '\u05D4\u05D5\u05E8\u05D9\u05DD').length;
    const ext = d.filter(c => c.category === '\u05D7\u05D9\u05E6\u05D5\u05E0\u05D9').length;
    document.getElementById('ct-stat-total').textContent = d.length;
    document.getElementById('ct-stat-staff').textContent = staff;
    document.getElementById('ct-stat-parents').textContent = parents;
    document.getElementById('ct-stat-ext').textContent = ext;
    document.getElementById('ct-count').textContent = d.length + ' \u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8';
  },

  /* ======================================================================
     RENDER — Favorites + Main List
     ====================================================================== */
  _ctRender() {
    const q = (document.getElementById('ct-search')?.value || '').trim().toLowerCase();
    const cat = this._contactsActiveCategory;
    let filtered = this._contactsData.filter(c => {
      if (cat && c.category !== cat) return false;
      if (q) {
        const hay = [c.name, c.phone, c.email, c.role, c.org, c.notes].join(' ').toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    // Favorites
    const favs = filtered.filter(c => c.favorite);
    const favEl = document.getElementById('ct-favorites');
    if (favs.length && !q) {
      favEl.innerHTML = `
        <h6 class="mb-2"><i class="bi bi-star-fill text-warning me-1"></i>\u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD</h6>
        <div class="row g-2 mb-2">${favs.map(c => this._ctCard(c, true)).join('')}</div>`;
    } else {
      favEl.innerHTML = '';
    }

    // Main list
    const listEl = document.getElementById('ct-list');
    if (!filtered.length) {
      listEl.innerHTML = `<div class="card p-4 text-center text-muted"><i class="bi bi-search fs-1 d-block mb-2"></i>\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8</div>`;
      return;
    }

    // Sort: favorites first, then alphabetical
    filtered.sort((a, b) => {
      if (a.favorite !== b.favorite) return a.favorite ? -1 : 1;
      return (a.name || '').localeCompare(b.name || '', 'he');
    });

    listEl.innerHTML = `<div class="row g-3">${filtered.map(c => this._ctCard(c, false)).join('')}</div>`;
  },

  /* ======================================================================
     CONTACT CARD
     ====================================================================== */
  _ctCard(c, compact) {
    const initials = (c.name || '').split(' ').map(w => w[0] || '').slice(0, 2).join('');
    const catDef = this._contactsCategories.find(x => x.key === c.category) || this._contactsCategories[0];
    const phone = (c.phone || '').replace(/[^0-9+]/g, '');
    const waPhone = phone.replace(/^0/, '972');

    const actions = `
      <div class="d-flex gap-1 mt-2 flex-wrap">
        ${c.phone ? `<a href="tel:${phone}" class="btn btn-sm btn-outline-primary" title="\u05D4\u05EA\u05E7\u05E9\u05E8"><i class="bi bi-telephone"></i></a>` : ''}
        ${c.phone ? `<a href="https://wa.me/${waPhone}" target="_blank" class="btn btn-sm btn-outline-success" title="WhatsApp"><i class="bi bi-whatsapp"></i></a>` : ''}
        ${c.email ? `<a href="mailto:${c.email}" class="btn btn-sm btn-outline-info" title="\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC"><i class="bi bi-envelope"></i></a>` : ''}
        <button class="btn btn-sm btn-outline-warning" onclick="Pages._ctToggleFav('${c.id}')" title="\u05DE\u05D5\u05E2\u05D3\u05E3"><i class="bi bi-star${c.favorite ? '-fill' : ''}"></i></button>
        <button class="btn btn-sm btn-outline-secondary" onclick="Pages._ctEdit('${c.id}')" title="\u05E2\u05E8\u05D9\u05DB\u05D4"><i class="bi bi-pencil"></i></button>
      </div>`;

    if (compact) {
      return `
      <div class="col-6 col-md-3">
        <div class="card p-2 h-100 border-warning" style="cursor:pointer" onclick="Pages._ctEdit('${c.id}')">
          <div class="d-flex align-items-center gap-2">
            <div class="avatar-sm bg-${catDef.color} text-white rounded-circle d-flex align-items-center justify-content-center" style="width:36px;height:36px;font-size:.8rem;flex-shrink:0">${initials}</div>
            <div class="text-truncate">
              <div class="fw-bold small text-truncate">${c.name}</div>
              <div class="text-muted" style="font-size:.75rem">${c.role || ''}</div>
            </div>
          </div>
        </div>
      </div>`;
    }

    return `
    <div class="col-md-6 col-lg-4">
      <div class="card p-3 h-100 hover-shadow">
        <div class="d-flex align-items-start gap-3">
          <div class="avatar bg-${catDef.color} text-white rounded-circle d-flex align-items-center justify-content-center" style="width:48px;height:48px;font-size:1rem;flex-shrink:0">${initials}</div>
          <div class="flex-grow-1 min-width-0">
            <div class="d-flex justify-content-between align-items-start">
              <h6 class="mb-1 text-truncate">${c.name} ${c.favorite ? '<i class="bi bi-star-fill text-warning ms-1" style="font-size:.7rem"></i>' : ''}</h6>
              <span class="badge bg-${catDef.color} bg-opacity-10 text-${catDef.color}" style="font-size:.7rem">${catDef.label}</span>
            </div>
            ${c.role ? `<span class="badge bg-secondary bg-opacity-10 text-secondary mb-1" style="font-size:.7rem">${c.role}</span>` : ''}
            ${c.org ? `<div class="text-muted small"><i class="bi bi-building me-1"></i>${c.org}</div>` : ''}
            ${c.phone ? `<div class="small"><i class="bi bi-telephone me-1 text-primary"></i><span dir="ltr">${c.phone}</span></div>` : ''}
            ${c.email ? `<div class="small text-truncate"><i class="bi bi-envelope me-1 text-info"></i><span dir="ltr">${c.email}</span></div>` : ''}
            ${c.notes ? `<div class="small text-muted mt-1"><i class="bi bi-sticky me-1"></i>${c.notes}</div>` : ''}
            ${actions}
          </div>
        </div>
      </div>
    </div>`;
  },

  /* ======================================================================
     CATEGORY FILTER
     ====================================================================== */
  _ctFilterCat(cat, btn) {
    this._contactsActiveCategory = cat;
    document.querySelectorAll('.ct-cat-filter').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    this._ctRender();
  },

  /* ======================================================================
     TOGGLE FAVORITE
     ====================================================================== */
  _ctToggleFav(id) {
    const c = this._contactsData.find(x => x.id === id);
    if (c) {
      c.favorite = !c.favorite;
      this._ctRender();
    }
  },

  /* ======================================================================
     ADD / EDIT MODAL
     ====================================================================== */
  _ctShowAdd() {
    this._contactsEditingId = null;
    document.getElementById('ct-modal-title').innerHTML = '<i class="bi bi-person-plus me-2"></i>\u05D4\u05D5\u05E1\u05E4\u05EA \u05D0\u05D9\u05E9 \u05E7\u05E9\u05E8';
    document.getElementById('ct-btn-delete').classList.add('d-none');
    ['ct-f-name','ct-f-phone','ct-f-email','ct-f-role','ct-f-org','ct-f-notes'].forEach(id =>
      document.getElementById(id).value = '');
    document.getElementById('ct-f-category').value = '\u05E6\u05D5\u05D5\u05EA';
    new bootstrap.Modal(document.getElementById('ct-modal')).show();
  },

  _ctEdit(id) {
    const c = this._contactsData.find(x => x.id === id);
    if (!c) return;
    this._contactsEditingId = id;
    document.getElementById('ct-modal-title').innerHTML = '<i class="bi bi-pencil me-2"></i>\u05E2\u05E8\u05D9\u05DB\u05EA \u05D0\u05D9\u05E9 \u05E7\u05E9\u05E8';
    document.getElementById('ct-btn-delete').classList.remove('d-none');
    document.getElementById('ct-f-name').value = c.name || '';
    document.getElementById('ct-f-phone').value = c.phone || '';
    document.getElementById('ct-f-email').value = c.email || '';
    document.getElementById('ct-f-role').value = c.role || '';
    document.getElementById('ct-f-org').value = c.org || '';
    document.getElementById('ct-f-notes').value = c.notes || '';
    document.getElementById('ct-f-category').value = c.category || '\u05E6\u05D5\u05D5\u05EA';
    new bootstrap.Modal(document.getElementById('ct-modal')).show();
  },

  _ctSaveContact() {
    const name = document.getElementById('ct-f-name').value.trim();
    if (!name) { document.getElementById('ct-f-name').focus(); return; }

    const obj = {
      name,
      phone: document.getElementById('ct-f-phone').value.trim(),
      email: document.getElementById('ct-f-email').value.trim(),
      role: document.getElementById('ct-f-role').value.trim(),
      org: document.getElementById('ct-f-org').value.trim(),
      notes: document.getElementById('ct-f-notes').value.trim(),
      category: document.getElementById('ct-f-category').value
    };

    if (this._contactsEditingId) {
      const idx = this._contactsData.findIndex(c => c.id === this._contactsEditingId);
      if (idx >= 0) Object.assign(this._contactsData[idx], obj);
    } else {
      obj.id = 'c' + Date.now();
      obj.favorite = false;
      obj._row = this._contactsData.length + 2;
      this._contactsData.push(obj);
    }

    bootstrap.Modal.getInstance(document.getElementById('ct-modal'))?.hide();
    this._ctRenderStats();
    this._ctRender();
    if (typeof App !== 'undefined' && App.toast) App.toast('\u05D0\u05D9\u05E9 \u05E7\u05E9\u05E8 \u05E0\u05E9\u05DE\u05E8 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4', 'success');
  },

  async _ctDeleteContact() {
    if (!this._contactsEditingId) return;
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05EA \u05D0\u05D9\u05E9 \u05E7\u05E9\u05E8', '\u05DC\u05DE\u05D7\u05D5\u05E7 \u05D0\u05EA \u05D0\u05D9\u05E9 \u05D4\u05E7\u05E9\u05E8?')) return;
    this._contactsData = this._contactsData.filter(c => c.id !== this._contactsEditingId);
    // Remove from groups
    this._contactsGroups.forEach(g => {
      g.members = g.members.filter(m => m !== this._contactsEditingId);
    });
    bootstrap.Modal.getInstance(document.getElementById('ct-modal'))?.hide();
    this._ctRenderStats();
    this._ctRender();
    if (typeof App !== 'undefined' && App.toast) App.toast('\u05D0\u05D9\u05E9 \u05E7\u05E9\u05E8 \u05E0\u05DE\u05D7\u05E7', 'warning');
  },

  /* ======================================================================
     GROUPS
     ====================================================================== */
  _ctShowGroups() {
    const body = document.getElementById('ct-groups-body');
    if (!this._contactsGroups.length) {
      body.innerHTML = '<p class="text-muted text-center">\u05D0\u05D9\u05DF \u05E7\u05D1\u05D5\u05E6\u05D5\u05EA \u05E2\u05D3\u05D9\u05D9\u05DF. \u05DC\u05D7\u05E5 "\u05E7\u05D1\u05D5\u05E6\u05D4 \u05D7\u05D3\u05E9\u05D4" \u05DC\u05D9\u05E6\u05D9\u05E8\u05D4.</p>';
    } else {
      body.innerHTML = this._contactsGroups.map(g => {
        const memberNames = g.members.map(mid => {
          const c = this._contactsData.find(x => x.id === mid);
          return c ? c.name : mid;
        });
        return `
        <div class="card p-3 mb-2">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <h6 class="mb-1"><i class="bi bi-diagram-3 me-1"></i>${g.name}</h6>
              <div class="small text-muted">${memberNames.length} \u05D7\u05D1\u05E8\u05D9\u05DD</div>
              <div class="mt-1">${memberNames.map(n => `<span class="badge bg-light text-dark me-1 mb-1">${n}</span>`).join('')}</div>
            </div>
            <div class="d-flex gap-1">
              <button class="btn btn-sm btn-outline-success" onclick="Pages._ctGroupWhatsApp('${g.id}')" title="WhatsApp \u05E7\u05D1\u05D5\u05E6\u05EA\u05D9"><i class="bi bi-whatsapp"></i></button>
              <button class="btn btn-sm btn-outline-info" onclick="Pages._ctGroupEmail('${g.id}')" title="\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC \u05E7\u05D1\u05D5\u05E6\u05EA\u05D9"><i class="bi bi-envelope"></i></button>
              <button class="btn btn-sm btn-outline-danger" onclick="Pages._ctDeleteGroup('${g.id}')" title="\u05DE\u05D7\u05E7 \u05E7\u05D1\u05D5\u05E6\u05D4"><i class="bi bi-trash"></i></button>
            </div>
          </div>
        </div>`;
      }).join('');
    }
    new bootstrap.Modal(document.getElementById('ct-groups-modal')).show();
  },

  _ctAddGroup() {
    const name = prompt('\u05E9\u05DD \u05D4\u05E7\u05D1\u05D5\u05E6\u05D4:');
    if (!name) return;
    this._contactsGroups.push({ id: 'g' + Date.now(), name, members: [] });
    this._ctShowGroups();
  },

  async _ctDeleteGroup(gid) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05EA \u05E7\u05D1\u05D5\u05E6\u05D4', '\u05DC\u05DE\u05D7\u05D5\u05E7 \u05D0\u05EA \u05D4\u05E7\u05D1\u05D5\u05E6\u05D4?')) return;
    this._contactsGroups = this._contactsGroups.filter(g => g.id !== gid);
    this._ctShowGroups();
  },

  _ctGroupWhatsApp(gid) {
    const g = this._contactsGroups.find(x => x.id === gid);
    if (!g) return;
    const phones = g.members.map(mid => {
      const c = this._contactsData.find(x => x.id === mid);
      return c?.phone ? c.phone.replace(/[^0-9]/g, '').replace(/^0/, '972') : null;
    }).filter(Boolean);
    if (!phones.length) { Utils.toast('\u05D0\u05D9\u05DF \u05DE\u05E1\u05E4\u05E8\u05D9 \u05D8\u05DC\u05E4\u05D5\u05DF \u05D1\u05E7\u05D1\u05D5\u05E6\u05D4', 'warning'); return; }
    // Open first contact's WhatsApp as starting point
    window.open('https://wa.me/' + phones[0], '_blank');
  },

  _ctGroupEmail(gid) {
    const g = this._contactsGroups.find(x => x.id === gid);
    if (!g) return;
    const emails = g.members.map(mid => {
      const c = this._contactsData.find(x => x.id === mid);
      return c?.email || null;
    }).filter(Boolean);
    if (!emails.length) { Utils.toast('\u05D0\u05D9\u05DF \u05DB\u05EA\u05D5\u05D1\u05D5\u05EA \u05D0\u05D9\u05DE\u05D9\u05D9\u05DC \u05D1\u05E7\u05D1\u05D5\u05E6\u05D4', 'warning'); return; }
    window.location.href = 'mailto:' + emails.join(',');
  },

  /* ======================================================================
     CSV EXPORT
     ====================================================================== */
  _ctExportCSV() {
    const headers = ['name','phone','email','role','org','category','notes'];
    const headerLabels = ['\u05E9\u05DD','\u05D8\u05DC\u05E4\u05D5\u05DF','\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC','\u05EA\u05E4\u05E7\u05D9\u05D3','\u05D0\u05E8\u05D2\u05D5\u05DF','\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4','\u05D4\u05E2\u05E8\u05D5\u05EA'];
    const rows = [headerLabels.join(',')];
    this._contactsData.forEach(c => {
      rows.push(headers.map(h => {
        let v = (c[h] || '').toString().replace(/"/g, '""');
        return `"${v}"`;
      }).join(','));
    });
    const bom = '\uFEFF';
    const blob = new Blob([bom + rows.join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '\u05D0\u05E0\u05E9\u05D9_\u05E7\u05E9\u05E8_' + new Date().toISOString().slice(0,10) + '.csv';
    a.click();
    URL.revokeObjectURL(url);
    if (typeof App !== 'undefined' && App.toast) App.toast('\u05E7\u05D5\u05D1\u05E5 CSV \u05D9\u05D5\u05E6\u05D0 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4', 'success');
  },

  /* ======================================================================
     CSV IMPORT
     ====================================================================== */
  _ctImportCSV() {
    document.getElementById('ct-import-preview').innerHTML = '';
    document.getElementById('ct-import-btn').disabled = true;
    const fileInput = document.getElementById('ct-import-file');
    fileInput.value = '';
    fileInput.onchange = () => this._ctPreviewImport();
    new bootstrap.Modal(document.getElementById('ct-import-modal')).show();
  },

  _ctImportParsed: [],

  _ctPreviewImport() {
    const file = document.getElementById('ct-import-file').files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const lines = e.target.result.split(/\r?\n/).filter(l => l.trim());
      if (lines.length < 2) {
        document.getElementById('ct-import-preview').innerHTML = '<div class="alert alert-warning">\u05D4\u05E7\u05D5\u05D1\u05E5 \u05E8\u05D9\u05E7 \u05D0\u05D5 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF</div>';
        return;
      }
      // Parse CSV (simple)
      const parse = line => {
        const result = [];
        let cur = '', inQ = false;
        for (let ch of line) {
          if (ch === '"') { inQ = !inQ; continue; }
          if (ch === ',' && !inQ) { result.push(cur.trim()); cur = ''; continue; }
          cur += ch;
        }
        result.push(cur.trim());
        return result;
      };
      const headers = parse(lines[0]);
      const mapped = [];
      const fieldMap = { '\u05E9\u05DD':'name', 'name':'name', '\u05D8\u05DC\u05E4\u05D5\u05DF':'phone', 'phone':'phone', '\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC':'email', 'email':'email',
        '\u05EA\u05E4\u05E7\u05D9\u05D3':'role', 'role':'role', '\u05D0\u05E8\u05D2\u05D5\u05DF':'org', 'org':'org', '\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4':'category', 'category':'category', '\u05D4\u05E2\u05E8\u05D5\u05EA':'notes', 'notes':'notes' };
      const colMap = headers.map(h => fieldMap[h.toLowerCase()] || fieldMap[h] || null);

      for (let i = 1; i < lines.length; i++) {
        const vals = parse(lines[i]);
        const obj = { id: 'ci' + Date.now() + i, favorite: false };
        colMap.forEach((key, ci) => { if (key) obj[key] = vals[ci] || ''; });
        if (obj.name) {
          if (!obj.category) obj.category = '\u05D7\u05D9\u05E6\u05D5\u05E0\u05D9';
          mapped.push(obj);
        }
      }

      this._ctImportParsed = mapped;
      document.getElementById('ct-import-preview').innerHTML = `
        <div class="alert alert-info"><i class="bi bi-info-circle me-1"></i>\u05E0\u05DE\u05E6\u05D0\u05D5 ${mapped.length} \u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8 \u05DC\u05D9\u05D9\u05D1\u05D5\u05D0</div>
        <div class="table-responsive" style="max-height:200px;overflow:auto">
          <table class="table table-sm table-bordered">
            <thead><tr><th>\u05E9\u05DD</th><th>\u05D8\u05DC\u05E4\u05D5\u05DF</th><th>\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4</th></tr></thead>
            <tbody>${mapped.slice(0, 10).map(c => `<tr><td>${c.name}</td><td dir="ltr">${c.phone || ''}</td><td>${c.category}</td></tr>`).join('')}
            ${mapped.length > 10 ? `<tr><td colspan="3" class="text-center text-muted">... \u05D5\u05E2\u05D5\u05D3 ${mapped.length - 10}</td></tr>` : ''}
            </tbody>
          </table>
        </div>`;
      document.getElementById('ct-import-btn').disabled = false;
    };
    reader.readAsText(file, 'utf-8');
  },

  _ctDoImport() {
    if (!this._ctImportParsed.length) return;
    this._ctImportParsed.forEach(c => {
      c._row = this._contactsData.length + 2;
      this._contactsData.push(c);
    });
    bootstrap.Modal.getInstance(document.getElementById('ct-import-modal'))?.hide();
    this._ctRenderStats();
    this._ctRender();
    if (typeof App !== 'undefined' && App.toast) App.toast(this._ctImportParsed.length + ' \u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8 \u05D9\u05D5\u05D1\u05D0\u05D5 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4', 'success');
    this._ctImportParsed = [];
  },

  /* ======================================================================
     PRINT PHONE DIRECTORY
     ====================================================================== */
  _ctPrintDirectory() {
    const data = this._contactsData;
    if (!data.length) {
      if (typeof App !== 'undefined' && App.toast) App.toast('\u05D0\u05D9\u05DF \u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8 \u05DC\u05D4\u05D3\u05E4\u05E1\u05D4', 'warning');
      return;
    }

    // Group by category
    const groups = {};
    data.forEach(c => {
      const cat = c.category || '\u05D0\u05D7\u05E8';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(c);
    });

    // Sort each group alphabetically
    Object.values(groups).forEach(arr => arr.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'he')));

    const catDefs = {
      '\u05E6\u05D5\u05D5\u05EA': { icon: '\u{1F464}', label: '\u05E6\u05D5\u05D5\u05EA' },
      '\u05D4\u05D5\u05E8\u05D9\u05DD': { icon: '\u{1F465}', label: '\u05D4\u05D5\u05E8\u05D9\u05DD' },
      '\u05D7\u05D9\u05E6\u05D5\u05E0\u05D9': { icon: '\u{1F3E2}', label: '\u05D7\u05D9\u05E6\u05D5\u05E0\u05D9' }
    };

    let tableRows = '';
    Object.entries(groups).forEach(([cat, members]) => {
      const def = catDefs[cat] || { label: cat };
      tableRows += `<tr style="background:#e8f0fe"><td colspan="4" style="font-weight:bold;font-size:1.1em;padding:10px 8px">${def.label} (${members.length})</td></tr>`;
      members.forEach(c => {
        tableRows += `<tr>
          <td style="padding:6px 8px;font-weight:600">${c.name || ''}</td>
          <td style="padding:6px 8px" dir="ltr">${c.phone || ''}</td>
          <td style="padding:6px 8px">${c.role || ''}</td>
          <td style="padding:6px 8px" dir="ltr">${c.email || ''}</td>
        </tr>`;
      });
    });

    const w = window.open('', '_blank', 'width=800,height=900');
    w.document.write(`<!DOCTYPE html><html dir="rtl"><head><title>\u05E1\u05E4\u05E8 \u05D8\u05DC\u05E4\u05D5\u05E0\u05D9\u05DD</title>
      <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;700&display=swap" rel="stylesheet">
      <style>
        body{font-family:Heebo,sans-serif;padding:20px;max-width:800px;margin:0 auto;color:#333}
        h1{text-align:center;margin-bottom:5px;font-size:1.6em}
        .subtitle{text-align:center;color:#666;margin-bottom:20px;font-size:.9em}
        table{width:100%;border-collapse:collapse;font-size:.9em}
        th{background:#1e3a5f;color:#fff;padding:8px;text-align:right}
        td{border-bottom:1px solid #ddd}
        tr:hover{background:#f8f9fa}
        .footer{text-align:center;margin-top:30px;font-size:.8em;color:#999;border-top:1px solid #ddd;padding-top:10px}
        @media print{body{padding:10px;font-size:.85em}h1{font-size:1.3em}.footer{position:fixed;bottom:10px;width:100%}}
      </style>
    </head><body>
      <h1>\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3 \u2014 \u05E1\u05E4\u05E8 \u05D8\u05DC\u05E4\u05D5\u05E0\u05D9\u05DD</h1>
      <div class="subtitle">\u05E2\u05D5\u05D3\u05DB\u05DF: ${new Date().toLocaleDateString('he-IL')} | \u05E1\u05D4"\u05DB ${data.length} \u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8</div>
      <table>
        <thead><tr><th>\u05E9\u05DD</th><th>\u05D8\u05DC\u05E4\u05D5\u05DF</th><th>\u05EA\u05E4\u05E7\u05D9\u05D3</th><th>\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC</th></tr></thead>
        <tbody>${tableRows}</tbody>
      </table>
      <div class="footer">\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3 \u2022 \u05E1\u05E4\u05E8 \u05D8\u05DC\u05E4\u05D5\u05E0\u05D9\u05DD \u05E4\u05E0\u05D9\u05DE\u05D9</div>
      <script>setTimeout(()=>{window.print()},500)<\/script>
    </body></html>`);
    w.document.close();
  }

});
