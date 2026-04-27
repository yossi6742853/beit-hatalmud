/* ===== BHT v5.4 — Inventory / Asset Tracking (Full Upgrade) ===== */
Object.assign(Pages, {
  inventory() {
    return `
    <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div><h1><i class="bi bi-box-seam me-2"></i>מעקב רכוש</h1><p class="text-muted mb-0">ניהול רכוש, ציוד ומלאי המוסד</p></div>
      <div class="d-flex gap-2 flex-wrap">
        <button class="btn btn-outline-success btn-sm" onclick="Pages.invExportCSV()"><i class="bi bi-download me-1"></i>ייצוא CSV</button>
        <button class="btn btn-primary btn-sm" onclick="Pages.invShowModal()"><i class="bi bi-plus-lg me-1"></i>פריט חדש</button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="row g-3 mb-3">
      <div class="col-6 col-md-3">
        <div class="card p-3 text-center border-start border-primary border-4">
          <div class="fs-4 fw-bold text-primary" id="inv-total">0</div>
          <small class="text-muted">סה"כ פריטים</small>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card p-3 text-center border-start border-success border-4">
          <div class="fs-4 fw-bold text-success" id="inv-value">₪0</div>
          <small class="text-muted">שווי כולל</small>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card p-3 text-center border-start border-danger border-4">
          <div class="fs-4 fw-bold text-danger" id="inv-low">0</div>
          <small class="text-muted">מלאי נמוך</small>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card p-3 text-center border-start border-warning border-4">
          <div class="fs-4 fw-bold text-warning" id="inv-out">0</div>
          <small class="text-muted">פריטים מושאלים</small>
        </div>
      </div>
    </div>

    <!-- Search & Filter Bar -->
    <div class="card p-3 mb-3">
      <div class="row g-2 align-items-end">
        <div class="col-md-4">
          <div class="search-box"><i class="bi bi-search"></i>
            <input class="form-control" id="inv-search" placeholder="חפש לפי שם, מיקום, מק״ט..." oninput="Pages.renderInventory()">
          </div>
        </div>
        <div class="col-md-2">
          <select class="form-select" id="inv-cat" onchange="Pages.renderInventory()">
            <option value="">כל הקטגוריות</option>
            <option value="ריהוט">ריהוט</option>
            <option value="אלקטרוניקה">אלקטרוניקה</option>
            <option value="ספורט">ספורט</option>
            <option value="ציוד משרדי">ציוד משרדי</option>
            <option value="מטבח">מטבח</option>
            <option value="חינוכי">חינוכי</option>
          </select>
        </div>
        <div class="col-md-2">
          <select class="form-select" id="inv-loc" onchange="Pages.renderInventory()">
            <option value="">כל המיקומים</option>
          </select>
        </div>
        <div class="col-md-2">
          <select class="form-select" id="inv-condition" onchange="Pages.renderInventory()">
            <option value="">כל המצבים</option>
            <option value="חדש">חדש</option>
            <option value="תקין">תקין</option>
            <option value="בלאי">בלאי</option>
            <option value="לתיקון">לתיקון</option>
            <option value="פגום">פגום</option>
          </select>
        </div>
        <div class="col-md-2 d-flex gap-1">
          <button class="btn btn-outline-secondary btn-sm flex-fill" id="inv-view-grid" onclick="Pages._invView='grid';Pages.renderInventory()" title="תצוגת כרטיסים"><i class="bi bi-grid-3x3-gap"></i></button>
          <button class="btn btn-outline-secondary btn-sm flex-fill" id="inv-view-table" onclick="Pages._invView='table';Pages.renderInventory()" title="תצוגת טבלה"><i class="bi bi-table"></i></button>
        </div>
      </div>
    </div>

    <!-- Item List -->
    <div id="inv-list">${Utils.skeleton(3)}</div>

    <!-- Add/Edit Modal -->
    <div class="modal fade" id="inv-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title" id="inv-modal-title">פריט חדש</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">שם הפריט <span class="text-danger">*</span></label>
            <input class="form-control" id="inv-f-name" placeholder="לדוגמה: מחשב נייד Dell">
          </div>
          <div class="col-md-6">
            <label class="form-label">קטגוריה <span class="text-danger">*</span></label>
            <select class="form-select" id="inv-f-cat">
              <option value="">בחר קטגוריה</option>
              <option value="ריהוט">ריהוט</option>
              <option value="אלקטרוניקה">אלקטרוניקה</option>
              <option value="ספורט">ספורט</option>
              <option value="ציוד משרדי">ציוד משרדי</option>
              <option value="מטבח">מטבח</option>
              <option value="חינוכי">חינוכי</option>
            </select>
          </div>
          <div class="col-md-4">
            <label class="form-label">כמות</label>
            <input class="form-control" id="inv-f-qty" type="number" min="0" value="1">
          </div>
          <div class="col-md-4">
            <label class="form-label">כמות מינימלית</label>
            <input class="form-control" id="inv-f-min" type="number" min="0" value="1" title="התראה כשהמלאי יורד מתחת לערך זה">
          </div>
          <div class="col-md-4">
            <label class="form-label">מיקום</label>
            <input class="form-control" id="inv-f-loc" placeholder="לדוגמה: כיתה א׳">
          </div>
          <div class="col-md-4">
            <label class="form-label">תאריך רכישה</label>
            <input class="form-control" id="inv-f-date" type="date">
          </div>
          <div class="col-md-4">
            <label class="form-label">עלות ליחידה (₪)</label>
            <input class="form-control" id="inv-f-cost" type="number" min="0" step="0.01" value="0">
          </div>
          <div class="col-md-4">
            <label class="form-label">מצב</label>
            <select class="form-select" id="inv-f-cond">
              <option value="חדש">חדש</option>
              <option value="תקין">תקין</option>
              <option value="בלאי">בלאי</option>
              <option value="לתיקון">לתיקון</option>
              <option value="פגום">פגום</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label">מספר סידורי / מק״ט</label>
            <input class="form-control" id="inv-f-serial" placeholder="אופציונלי">
          </div>
          <div class="col-md-6">
            <label class="form-label">הערות</label>
            <input class="form-control" id="inv-f-notes" placeholder="הערות נוספות">
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">ביטול</button>
        <button class="btn btn-primary" id="inv-modal-save" onclick="Pages.invSaveItem()"><i class="bi bi-check-lg me-1"></i>שמור</button>
      </div>
    </div></div></div>

    <!-- Checkout Modal -->
    <div class="modal fade" id="inv-checkout-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title" id="inv-co-title">השאלת פריט</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <p class="fw-bold" id="inv-co-item"></p>
        <div class="mb-3">
          <label class="form-label">שם השואל <span class="text-danger">*</span></label>
          <input class="form-control" id="inv-co-who" placeholder="שם מלא">
        </div>
        <div class="mb-3">
          <label class="form-label">כמות</label>
          <input class="form-control" id="inv-co-qty" type="number" min="1" value="1">
        </div>
        <div class="mb-3">
          <label class="form-label">הערות</label>
          <input class="form-control" id="inv-co-notes" placeholder="אופציונלי">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">ביטול</button>
        <button class="btn btn-warning" onclick="Pages.invDoCheckout()"><i class="bi bi-box-arrow-up-left me-1"></i>השאל</button>
      </div>
    </div></div></div>`;
  },

  /* ---- Categories Config ---- */
  _invCategories: {
    'ריהוט':       { icon: 'bi-lamp',        color: '#8B4513' },
    'אלקטרוניקה':  { icon: 'bi-laptop',      color: '#0d6efd' },
    'ספורט':       { icon: 'bi-dribbble',     color: '#198754' },
    'ציוד משרדי':  { icon: 'bi-paperclip',    color: '#6f42c1' },
    'מטבח':        { icon: 'bi-cup-hot',      color: '#fd7e14' },
    'חינוכי':      { icon: 'bi-book',         color: '#20c997' }
  },

  _invConditionBadge: {
    'חדש':    'bg-info',
    'תקין':   'bg-success',
    'בלאי':   'bg-secondary',
    'לתיקון': 'bg-warning text-dark',
    'פגום':   'bg-danger'
  },

  _invView: 'grid',
  _invEditId: null,
  _invCheckoutId: null,
  _invNextId: 21,

  /* ---- Demo Data: 20 items across 6 categories ---- */
  _invData: [

    { id:1,  name:'מחשב נייד Dell Latitude',     category:'אלקטרוניקה', location:'מזכירות',     quantity:3,  minQty:1, cost:4500, condition:'תקין',   serial:'DL-2025-001',  purchaseDate:'2025-09-01', notes:'', checkouts:[] },
    { id:2,  name:'מדפסת HP LaserJet Pro',        category:'אלקטרוניקה', location:'מזכירות',     quantity:1,  minQty:1, cost:1200, condition:'תקין',   serial:'HP-LJ-042',    purchaseDate:'2025-06-15', notes:'', checkouts:[] },
    { id:3,  name:'מקרן Epson EB-X51',            category:'אלקטרוניקה', location:'חדר הרצאות',  quantity:2,  minQty:1, cost:2500, condition:'תקין',   serial:'EP-X51-007',   purchaseDate:'2025-08-01', notes:'', checkouts:[] }
  ],

  /* ---- Init ---- */
  _invUseDemo: false,

  inventoryLoadDemo() {
    this._invUseDemo = true;
    App.navigate('inventory');
  },

  inventoryInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    // Try loading from API, fall back to localStorage, then demo data
    try {
      const apiData = _gc('רכוש');
      if (apiData && apiData.length) {
        this._invData = apiData.map(r => ({ ...r, checkouts: r.checkouts || [] }));
        this._invNextId = Math.max(...this._invData.map(i => i.id || 0)) + 1;
      } else {
        this._invLoadFromStorage();
      }
    } catch(e) {
      this._invLoadFromStorage();
    }
    // If still has hardcoded demo data and not flagged, clear it
    if (!this._invUseDemo && this._invData.length && this._invData[0]?.id === 1 && this._invData[0]?.name === 'שולחן תלמיד') {
      this._invData = [];
    }
    this._invBuildLocationFilter();
    this.renderInventory();
  },

  _invLoadFromStorage() {
    try {
      const stored = localStorage.getItem('bht_inventory_data');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.length) {
          this._invData = parsed.map(r => ({ ...r, checkouts: r.checkouts || [] }));
          this._invNextId = Math.max(...this._invData.map(i => i.id || 0)) + 1;
        }
      }
    } catch(e) { /* keep loaded data */ }
    // If nothing loaded from storage and no demo flag, stay empty
  },

  _invSaveToStorage() {
    try { localStorage.setItem('bht_inventory_data', JSON.stringify(this._invData)); } catch(e) {}
  },

  _invBuildLocationFilter() {
    const locs = [...new Set(this._invData.map(i => i.location))].sort();
    const sel = document.getElementById('inv-loc');
    if (!sel) return;
    sel.innerHTML = '<option value="">כל המיקומים</option>' + locs.map(l => `<option value="${l}">${l}</option>`).join('');
  },

  /* ---- Render ---- */
  renderInventory() {
    const search = (document.getElementById('inv-search')?.value || '').toLowerCase();
    const cat = document.getElementById('inv-cat')?.value || '';
    const loc = document.getElementById('inv-loc')?.value || '';
    const cond = document.getElementById('inv-condition')?.value || '';

    let items = this._invData;
    if (search) items = items.filter(i =>
      i.name.toLowerCase().includes(search) ||
      i.location.toLowerCase().includes(search) ||
      (i.serial && i.serial.toLowerCase().includes(search))
    );
    if (cat)  items = items.filter(i => i.category === cat);
    if (loc)  items = items.filter(i => i.location === loc);
    if (cond) items = items.filter(i => i.condition === cond);

    // Stats
    const allItems = this._invData;
    const totalQty = allItems.reduce((s, i) => s + i.quantity, 0);
    const totalVal = allItems.reduce((s, i) => s + i.cost * i.quantity, 0);
    const lowStock = allItems.filter(i => i.quantity <= i.minQty).length;
    const checkedOut = allItems.reduce((s, i) => s + i.checkouts.reduce((ss, c) => ss + c.qty, 0), 0);

    document.getElementById('inv-total').textContent = totalQty;
    document.getElementById('inv-value').textContent = Utils.formatCurrency(totalVal);
    document.getElementById('inv-low').textContent = lowStock;
    document.getElementById('inv-out').textContent = checkedOut;

    // View toggle active state
    document.getElementById('inv-view-grid')?.classList.toggle('active', this._invView === 'grid');
    document.getElementById('inv-view-table')?.classList.toggle('active', this._invView === 'table');

    const container = document.getElementById('inv-list');
    if (!container) return;

    if (items.length === 0) {
      const isEmptyDB = !this._invData.length;
      container.innerHTML = `<div class="card p-5 text-center text-muted">
        <i class="bi bi-${isEmptyDB ? 'box-seam' : 'inbox'} fs-1 d-block mb-2"></i>
        <h5>${isEmptyDB ? '\u05D0\u05D9\u05DF \u05E4\u05E8\u05D9\u05D8\u05D9 \u05E8\u05DB\u05D5\u05E9' : '\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05E4\u05E8\u05D9\u05D8\u05D9\u05DD'}</h5>
        ${isEmptyDB ? '<p>\u05D4\u05D5\u05E1\u05E3 \u05E4\u05E8\u05D9\u05D8 \u05E8\u05D0\u05E9\u05D5\u05DF \u05DB\u05D3\u05D9 \u05DC\u05D4\u05EA\u05D7\u05D9\u05DC</p><button class="btn btn-primary btn-sm mt-2" onclick="Pages.invShowModal()"><i class="bi bi-plus-lg me-1"></i>\u05E4\u05E8\u05D9\u05D8 \u05D7\u05D3\u05E9</button>' : '<p>\u05E0\u05E1\u05D4 \u05DC\u05E9\u05E0\u05D5\u05EA \u05D0\u05EA \u05DE\u05E1\u05E0\u05E0\u05D9 \u05D4\u05D7\u05D9\u05E4\u05D5\u05E9</p>'}
      </div>`;
      return;
    }

    if (this._invView === 'grid') {
      this._invRenderGrid(container, items);
    } else {
      this._invRenderTable(container, items);
    }
  },

  _invRenderGrid(container, items) {
    const cats = this._invCategories;
    const condBadge = this._invConditionBadge;
    container.innerHTML = `<div class="row g-3">${items.map(i => {
      const catInfo = cats[i.category] || { icon: 'bi-box', color: '#6c757d' };
      const isLow = i.quantity <= i.minQty;
      const coCount = i.checkouts.reduce((s, c) => s + c.qty, 0);
      return `
      <div class="col-sm-6 col-lg-4 col-xl-3">
        <div class="card h-100 ${isLow ? 'border-danger border-2' : ''}">
          <div class="card-body p-3">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div class="d-flex align-items-center gap-2">
                <div class="rounded-circle d-flex align-items-center justify-content-center" style="width:40px;height:40px;background:${catInfo.color}15;color:${catInfo.color}">
                  <i class="bi ${catInfo.icon} fs-5"></i>
                </div>
                <div>
                  <h6 class="mb-0 fw-bold">${i.name}</h6>
                  <span class="badge" style="background:${catInfo.color}22;color:${catInfo.color};font-size:.7rem">${i.category}</span>
                </div>
              </div>
              <div class="dropdown">
                <button class="btn btn-sm btn-light" data-bs-toggle="dropdown"><i class="bi bi-three-dots-vertical"></i></button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><a class="dropdown-item" href="#" onclick="Pages.invShowModal(${i.id});return false"><i class="bi bi-pencil me-2"></i>עריכה</a></li>
                  <li><a class="dropdown-item" href="#" onclick="Pages.invShowCheckout(${i.id});return false"><i class="bi bi-box-arrow-up-left me-2"></i>השאלה</a></li>
                  ${coCount > 0 ? `<li><a class="dropdown-item text-success" href="#" onclick="Pages.invShowCheckins(${i.id});return false"><i class="bi bi-box-arrow-in-down-left me-2"></i>החזרה (${coCount})</a></li>` : ''}
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item text-danger" href="#" onclick="Pages.invDeleteItem(${i.id});return false"><i class="bi bi-trash me-2"></i>מחיקה</a></li>
                </ul>
              </div>
            </div>
            <div class="d-flex flex-wrap gap-2 mt-2 small">
              <span class="text-muted"><i class="bi bi-geo-alt me-1"></i>${i.location}</span>
              <span class="badge ${condBadge[i.condition] || 'bg-secondary'}">${i.condition}</span>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
              <div>
                <span class="fs-5 fw-bold ${isLow ? 'text-danger' : 'text-primary'}">${i.quantity}</span>
                <small class="text-muted me-1">יחידות</small>
                ${isLow ? '<span class="badge bg-danger bg-opacity-10 text-danger" style="font-size:.65rem"><i class="bi bi-exclamation-triangle me-1"></i>מלאי נמוך</span>' : ''}
              </div>
              <span class="fw-bold text-success">${Utils.formatCurrency(i.cost * i.quantity)}</span>
            </div>
            ${coCount > 0 ? `<div class="mt-2 pt-2 border-top"><small class="text-warning"><i class="bi bi-person-badge me-1"></i>${coCount} מושאל ל: ${i.checkouts.map(c=>c.who).join(', ')}</small></div>` : ''}
            ${i.serial ? `<div class="mt-1"><small class="text-muted"><i class="bi bi-upc me-1"></i>${i.serial}</small></div>` : ''}
          </div>
        </div>
      </div>`;
    }).join('')}</div>`;
  },

  _invRenderTable(container, items) {
    const cats = this._invCategories;
    const condBadge = this._invConditionBadge;
    container.innerHTML = `<div class="card"><div class="table-responsive"><table class="table table-bht mb-0" id="inv-table">
      <thead><tr>
        <th>פריט</th><th>קטגוריה</th><th>מיקום</th><th>כמות</th><th>מינ׳</th><th>עלות</th><th>שווי</th><th>מצב</th><th>מק״ט</th><th>מושאל</th><th></th>
      </tr></thead>
      <tbody>${items.map(i => {
        const catInfo = cats[i.category] || { icon: 'bi-box', color: '#6c757d' };
        const isLow = i.quantity <= i.minQty;
        const coCount = i.checkouts.reduce((s, c) => s + c.qty, 0);
        return `<tr class="${isLow ? 'table-danger' : ''}">
          <td class="fw-bold"><i class="bi ${catInfo.icon} me-2" style="color:${catInfo.color}"></i>${i.name}</td>
          <td><span class="badge" style="background:${catInfo.color}22;color:${catInfo.color}">${i.category}</span></td>
          <td>${i.location}</td>
          <td class="${isLow ? 'text-danger fw-bold' : ''}">${i.quantity} ${isLow ? '<i class="bi bi-exclamation-triangle-fill text-danger"></i>' : ''}</td>
          <td>${i.minQty}</td>
          <td>${Utils.formatCurrency(i.cost)}</td>
          <td class="fw-bold">${Utils.formatCurrency(i.cost * i.quantity)}</td>
          <td><span class="badge ${condBadge[i.condition] || 'bg-secondary'}">${i.condition}</span></td>
          <td><small class="text-muted">${i.serial || '—'}</small></td>
          <td>${coCount > 0 ? `<span class="badge bg-warning text-dark">${coCount}</span>` : '—'}</td>
          <td>
            <div class="btn-group btn-group-sm">
              <button class="btn btn-outline-primary" onclick="Pages.invShowModal(${i.id})" title="עריכה"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-outline-warning" onclick="Pages.invShowCheckout(${i.id})" title="השאלה"><i class="bi bi-box-arrow-up-left"></i></button>
              ${coCount > 0 ? `<button class="btn btn-outline-success" onclick="Pages.invShowCheckins(${i.id})" title="החזרה"><i class="bi bi-box-arrow-in-down-left"></i></button>` : ''}
              <button class="btn btn-outline-danger" onclick="Pages.invDeleteItem(${i.id})" title="מחיקה"><i class="bi bi-trash"></i></button>
            </div>
          </td>
        </tr>`;
      }).join('')}</tbody>
    </table></div></div>`;
    Utils.initSortableTable('inv-table');
  },

  /* ---- Add / Edit Modal ---- */
  invShowModal(editId) {
    this._invEditId = editId || null;
    const item = editId ? this._invData.find(i => i.id === editId) : null;
    document.getElementById('inv-modal-title').textContent = item ? 'עריכת פריט' : 'פריט חדש';
    document.getElementById('inv-f-name').value   = item?.name || '';
    document.getElementById('inv-f-cat').value    = item?.category || '';
    document.getElementById('inv-f-qty').value    = item?.quantity ?? 1;
    document.getElementById('inv-f-min').value    = item?.minQty ?? 1;
    document.getElementById('inv-f-loc').value    = item?.location || '';
    document.getElementById('inv-f-date').value   = item?.purchaseDate || '';
    document.getElementById('inv-f-cost').value   = item?.cost ?? 0;
    document.getElementById('inv-f-cond').value   = item?.condition || 'חדש';
    document.getElementById('inv-f-serial').value = item?.serial || '';
    document.getElementById('inv-f-notes').value  = item?.notes || '';
    new bootstrap.Modal(document.getElementById('inv-modal')).show();
  },

  invSaveItem() {
    const name = document.getElementById('inv-f-name').value.trim();
    const cat  = document.getElementById('inv-f-cat').value;
    if (!name) { Utils.toast('נא להזין שם פריט', 'danger'); return; }
    if (!cat)  { Utils.toast('נא לבחור קטגוריה', 'danger'); return; }

    const data = {
      name,
      category: cat,
      quantity:     parseInt(document.getElementById('inv-f-qty').value) || 1,
      minQty:       parseInt(document.getElementById('inv-f-min').value) || 1,
      location:     document.getElementById('inv-f-loc').value.trim(),
      purchaseDate: document.getElementById('inv-f-date').value,
      cost:         parseFloat(document.getElementById('inv-f-cost').value) || 0,
      condition:    document.getElementById('inv-f-cond').value,
      serial:       document.getElementById('inv-f-serial').value.trim(),
      notes:        document.getElementById('inv-f-notes').value.trim()
    };

    if (this._invEditId) {
      const item = this._invData.find(i => i.id === this._invEditId);
      if (item) Object.assign(item, data);
      this._invSaveToStorage();
      App.apiCall('update', 'רכוש', { id: this._invEditId, row: { ...item } }).catch(e => console.warn('inventory update failed:', e));
      Utils.toast('פריט עודכן בהצלחה');
    } else {
      data.id = this._invNextId++;
      data.checkouts = [];
      this._invData.push(data);
      this._invSaveToStorage();
      App.apiCall('add', 'רכוש', { row: data }).catch(e => console.warn('inventory add failed:', e));
      Utils.toast('פריט חדש נוסף בהצלחה');
    }

    bootstrap.Modal.getInstance(document.getElementById('inv-modal'))?.hide();
    this._invBuildLocationFilter();
    this.renderInventory();
  },

  /* ---- Delete ---- */
  async invDeleteItem(id) {
    const item = this._invData.find(i => i.id === id);
    if (!item) return;
    const ok = await Utils.confirm('מחיקת פריט', `למחוק את "${item.name}"?`);
    if (!ok) return;
    this._invData = this._invData.filter(i => i.id !== id);
    this._invSaveToStorage();
    App.apiCall('delete', 'רכוש', { id }).catch(e => console.warn('inventory delete failed:', e));
    Utils.toast('פריט נמחק', 'warning');
    this._invBuildLocationFilter();
    this.renderInventory();
  },

  /* ---- Checkout ---- */
  invShowCheckout(id) {
    const item = this._invData.find(i => i.id === id);
    if (!item) return;
    this._invCheckoutId = id;
    document.getElementById('inv-co-title').textContent = 'השאלת פריט';
    document.getElementById('inv-co-item').textContent = item.name;
    document.getElementById('inv-co-who').value = '';
    document.getElementById('inv-co-qty').value = 1;
    document.getElementById('inv-co-qty').max = item.quantity;
    document.getElementById('inv-co-notes').value = '';
    new bootstrap.Modal(document.getElementById('inv-checkout-modal')).show();
  },

  invDoCheckout() {
    const item = this._invData.find(i => i.id === this._invCheckoutId);
    if (!item) return;
    const who = document.getElementById('inv-co-who').value.trim();
    const qty = parseInt(document.getElementById('inv-co-qty').value) || 1;
    const notes = document.getElementById('inv-co-notes').value.trim();
    if (!who) { Utils.toast('נא להזין שם השואל', 'danger'); return; }
    if (qty > item.quantity) { Utils.toast('כמות גדולה מהמלאי', 'danger'); return; }

    item.checkouts.push({
      who, qty, notes,
      date: new Date().toISOString().slice(0, 10)
    });
    item.quantity -= qty;
    this._invSaveToStorage();
    App.apiCall('update', 'רכוש', { id: item.id, row: item }).catch(e => console.warn('inventory checkout update failed:', e));

    bootstrap.Modal.getInstance(document.getElementById('inv-checkout-modal'))?.hide();
    Utils.toast(`${item.name} הושאל ל${who}`, 'info');
    this.renderInventory();
  },

  /* ---- Check-in (return) ---- */
  invShowCheckins(id) {
    const item = this._invData.find(i => i.id === id);
    if (!item || item.checkouts.length === 0) { Utils.toast('אין פריטים מושאלים', 'info'); return; }

    const listHtml = item.checkouts.map((c, idx) => `
      <div class="d-flex justify-content-between align-items-center p-2 border rounded mb-2">
        <div>
          <strong>${c.who}</strong> — ${c.qty} יח׳
          <br><small class="text-muted">${c.date}${c.notes ? ' | ' + c.notes : ''}</small>
        </div>
        <button class="btn btn-sm btn-success" onclick="Pages.invDoCheckin(${id},${idx})"><i class="bi bi-check-lg me-1"></i>החזר</button>
      </div>
    `).join('');

    // Reuse the checkout modal
    document.getElementById('inv-co-title').textContent = 'החזרת פריטים — ' + item.name;
    const body = document.getElementById('inv-checkout-modal').querySelector('.modal-body');
    body.innerHTML = listHtml || '<p class="text-muted">אין השאלות פתוחות</p>';
    const footer = document.getElementById('inv-checkout-modal').querySelector('.modal-footer');
    footer.innerHTML = '<button class="btn btn-secondary" data-bs-dismiss="modal">סגור</button>';
    new bootstrap.Modal(document.getElementById('inv-checkout-modal')).show();
  },

  invDoCheckin(itemId, checkoutIdx) {
    const item = this._invData.find(i => i.id === itemId);
    if (!item) return;
    const co = item.checkouts[checkoutIdx];
    if (!co) return;
    item.quantity += co.qty;
    item.checkouts.splice(checkoutIdx, 1);
    this._invSaveToStorage();
    App.apiCall('update', 'רכוש', { id: item.id, row: item }).catch(e => console.warn('inventory checkin update failed:', e));
    Utils.toast(`${co.qty} יח׳ של ${item.name} הוחזרו מ${co.who}`);
    bootstrap.Modal.getInstance(document.getElementById('inv-checkout-modal'))?.hide();
    this.renderInventory();
  },

  /* ---- CSV Export ---- */
  invExportCSV() {
    const BOM = '\uFEFF';
    const headers = ['שם','קטגוריה','מיקום','כמות','כמות מינימלית','עלות ליחידה','שווי כולל','מצב','מק״ט','תאריך רכישה','מושאל ל','הערות'];
    const rows = this._invData.map(i => [
      i.name,
      i.category,
      i.location,
      i.quantity,
      i.minQty,
      i.cost,
      i.cost * i.quantity,
      i.condition,
      i.serial || '',
      i.purchaseDate || '',
      i.checkouts.map(c => `${c.who}(${c.qty})`).join('; '),
      i.notes || ''
    ].map(v => '"' + String(v).replace(/"/g, '""') + '"').join(','));

    const csv = BOM + headers.map(h => '"'+h+'"').join(',') + '\n' + rows.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'inventory_' + (Utils.todayISO ? Utils.todayISO() : new Date().toISOString().slice(0,10)) + '.csv';
    link.click();
    Utils.toast('דו"ח מלאי יוצא בהצלחה');
  },

  /* ---- Legacy alias ---- */
  showAddAsset() { this.invShowModal(); }
});
