/* ===== BHT v5.3 — Meals Module (Enhanced) ===== */
Object.assign(Pages, {

  /* ======================================================================
     DEMO DATA
     ====================================================================== */
  _mealsDemoMenu: null,
  _mealsDemoRestrictions: null,
  _mealsDemoIngredients: null,
  _mealsEditMode: false,
  _mealsDragSource: null,

  _mealsGenerateDemo() {
    if (this._mealsDemoMenu) return;

    const days = ['ראשון','שני','שלישי','רביעי','חמישי','שישי'];

    this._mealsDemoMenu = {
      'ראשון': {
        breakfast: 'לחם, חמאה, ריבה, ביצה קשה',
        lunch: 'עוף בתנור, אורז לבן, סלט ירקות',
        snack: 'פירות עונה'
      },
      'שני': {
        breakfast: 'קורנפלקס, חלב, לחם עם גבינה',
        lunch: 'שניצל, פסטה ברוטב עגבניות, ירקות מאודים',
        snack: 'עוגיות שוקולד'
      },
      'שלישי': {
        breakfast: 'שקשוקה, לחם אחיד',
        lunch: 'קציצות בשר, פירה, סלט כרוב',
        snack: 'פירות יבשים ואגוזים'
      }
    };

    this._mealsDemoRestrictions = [
      { name: 'יוסף כהן', class: 'כיתה א', type: 'אלרגיה', detail: 'בוטנים ואגוזים', severity: 'חמור', icon: 'exclamation-triangle-fill', color: 'danger' },
      { name: 'משה לוי', class: 'כיתה א', type: 'אלרגיה', detail: 'חלב ומוצריו', severity: 'בינוני', icon: 'exclamation-circle-fill', color: 'warning' },
      { name: 'אברהם ישראלי', class: 'כיתה ב', type: 'רגישות', detail: 'גלוטן', severity: 'בינוני', icon: 'exclamation-circle-fill', color: 'warning' }
    ];

    this._mealsDemoIngredients = {
      'עוף בתנור': ['עוף שלם 1.5 ק"ג', 'שמן זית', 'פפריקה', 'כורכום', 'שום', 'מלח'],
      'אורז לבן': ['אורז 2 ק"ג', 'מים', 'שמן', 'מלח'],
      'סלט ירקות': ['עגבניות 2 ק"ג', 'מלפפונים 1.5 ק"ג', 'בצל', 'לימון', 'שמן זית']
    };
  },

  /* ======================================================================
     HELPERS
     ====================================================================== */
  _mealsTodayIndex() {
    const d = new Date().getDay(); // 0=Sun
    return d >= 0 && d <= 5 ? d : 0; // 0-5 mapped to Sun-Fri, Sat->Sun
  },

  _mealsGetMealLabel(slot) {
    const labels = { breakfast: 'ארוחת בוקר', lunch: 'ארוחת צהריים', snack: 'ארוחת ביניים' };
    return labels[slot] || slot;
  },

  _mealsGetMealIcon(slot) {
    const icons = { breakfast: 'sunrise', lunch: 'sun', snack: 'cup-straw' };
    return icons[slot] || 'circle';
  },

  _mealsGetStudentCount() { return 28; },

  _mealsCalcCost() {
    // Demo average cost per student per day
    return 18.5;
  },

  _mealsGenerateShoppingList() {
    if (!this._mealsDemoMenu) return new Map();
    const allIngredients = new Map();
    const menu = this._mealsDemoMenu;

    Object.values(menu).forEach(dayMenu => {
      [dayMenu.breakfast, dayMenu.lunch, dayMenu.snack].forEach(dish => {
        // Split composite dishes
        dish.split(',').forEach(part => {
          const trimmed = part.trim();
          const ingredients = this._mealsDemoIngredients[trimmed];
          if (ingredients) {
            ingredients.forEach(ing => {
              allIngredients.set(ing, (allIngredients.get(ing) || 0) + 1);
            });
          }
        });
      });
    });
    return allIngredients;
  },

  /* ======================================================================
     RENDER
     ====================================================================== */
  meals() {
    // Only generate demo if explicitly using demo mode
    if (this._mealsUseDemo && !this._mealsDemoMenu) this._mealsGenerateDemo();

    // Empty state if no menu data at all
    if (!this._mealsDemoMenu) {
      return `
      <div class="page-header d-flex justify-content-between align-items-center mb-3">
        <h1 class="mb-0"><i class="bi bi-egg-fried me-2"></i>ניהול ארוחות</h1>
      </div>
      <div class="empty-state text-center py-5">
        <i class="bi bi-egg-fried fs-1 text-muted d-block mb-2"></i>
        <h5>אין נתונים עדיין – הוסף תפריט ראשון</h5>
        <a href="#" class="btn btn-sm btn-outline-secondary mt-2" onclick="Pages.mealsLoadDemo();return false"><i class="bi bi-database me-1"></i>טען נתוני דמו</a>
      </div>`;
    }

    const days = ['ראשון','שני','שלישי','רביעי','חמישי','שישי'];
    const slots = ['breakfast','lunch','snack'];
    const todayIdx = this._mealsTodayIndex();
    const todayName = days[todayIdx] || 'ראשון';
    const menu = this._mealsDemoMenu;
    const restrictions = this._mealsDemoRestrictions;
    const studentCount = this._mealsGetStudentCount();
    const avgCost = this._mealsCalcCost();

    // Stats
    const mealsToday = studentCount * 3;
    const mealsWeek = studentCount * 3 * 6;
    const alertCount = restrictions.filter(r => r.severity === 'חמור').length;

    // --- Stats Cards ---
    const statsHtml = `
    <div class="row g-3 mb-4">
      <div class="col-6 col-lg-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body text-center">
            <div class="fs-1 text-primary mb-1"><i class="bi bi-egg-fried"></i></div>
            <div class="fs-3 fw-bold text-primary">${mealsToday}</div>
            <div class="text-muted small">מנות היום</div>
          </div>
        </div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body text-center">
            <div class="fs-1 text-success mb-1"><i class="bi bi-calendar-week"></i></div>
            <div class="fs-3 fw-bold text-success">${mealsWeek}</div>
            <div class="text-muted small">מנות השבוע</div>
          </div>
        </div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body text-center">
            <div class="fs-1 text-danger mb-1"><i class="bi bi-exclamation-triangle"></i></div>
            <div class="fs-3 fw-bold text-danger">${alertCount}</div>
            <div class="text-muted small">התראות תזונה</div>
          </div>
        </div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body text-center">
            <div class="fs-1 text-info mb-1"><i class="bi bi-currency-exchange"></i></div>
            <div class="fs-3 fw-bold text-info">\u20AA${avgCost.toFixed(1)}</div>
            <div class="text-muted small">עלות ממוצעת/תלמיד</div>
          </div>
        </div>
      </div>
    </div>`;

    // --- Toolbar ---
    const toolbarHtml = `
    <div class="d-flex flex-wrap gap-2 mb-4 align-items-center">
      <button class="btn btn-outline-primary" onclick="Pages._mealsToggleEdit()">
        <i class="bi bi-pencil-square me-1"></i><span id="mealsEditBtnText">עריכת תפריט</span>
      </button>
      <button class="btn btn-outline-success" onclick="Pages._mealsShowShoppingList()">
        <i class="bi bi-cart3 me-1"></i>רשימת קניות
      </button>
      <button class="btn btn-outline-warning" onclick="Pages._mealsShowRestrictions()">
        <i class="bi bi-shield-exclamation me-1"></i>הגבלות תזונה (${restrictions.length})
      </button>
      <button class="btn btn-outline-info" onclick="Pages._mealsShowMealCount()">
        <i class="bi bi-people me-1"></i>ספירת מנות
      </button>
    </div>`;

    // --- Weekly Grid ---
    const gridHtml = `
    <div class="card shadow-sm mb-4">
      <div class="card-header bg-white d-flex justify-content-between align-items-center">
        <h5 class="mb-0"><i class="bi bi-table me-2"></i>תפריט שבועי</h5>
        <span class="badge bg-primary">${days.length} ימים</span>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-bordered table-hover mb-0" id="mealsGrid">
            <thead class="table-light">
              <tr>
                <th class="text-center" style="width:120px">ארוחה</th>
                ${days.map((d, i) => `<th class="text-center ${i === todayIdx ? 'table-primary' : ''}" style="min-width:140px">
                  <div class="fw-bold">יום ${d}</div>
                  ${i === todayIdx ? '<span class="badge bg-primary">היום</span>' : ''}
                </th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${slots.map(slot => `
              <tr>
                <td class="text-center fw-bold bg-light">
                  <i class="bi bi-${this._mealsGetMealIcon(slot)} me-1"></i>
                  <div class="small">${this._mealsGetMealLabel(slot)}</div>
                </td>
                ${days.map((d, i) => {
                  const val = menu[d][slot];
                  const cellId = `meal-${d}-${slot}`;
                  return `<td class="meal-cell ${i === todayIdx ? 'table-primary' : ''}"
                    id="${cellId}"
                    data-day="${d}" data-slot="${slot}"
                    draggable="false"
                    onclick="Pages._mealsCellClick(this)"
                    ondragstart="Pages._mealsDragStart(event)"
                    ondragover="Pages._mealsDragOver(event)"
                    ondrop="Pages._mealsDrop(event)"
                    style="cursor:pointer; transition: all 0.15s;">
                    <span class="meal-text">${val}</span>
                  </td>`;
                }).join('')}
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;

    // --- Modals ---
    const modalsHtml = `
    <!-- Shopping List Modal -->
    <div class="modal fade" id="shoppingListModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title"><i class="bi bi-cart3 me-2"></i>רשימת קניות שבועית</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" id="shoppingListBody"></div>
          <div class="modal-footer">
            <button class="btn btn-outline-secondary" onclick="Pages._mealsCopyShoppingList()">
              <i class="bi bi-clipboard me-1"></i>העתק
            </button>
            <button class="btn btn-success" onclick="Pages._mealsPrintShoppingList()">
              <i class="bi bi-printer me-1"></i>הדפס
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Restrictions Modal -->
    <div class="modal fade" id="restrictionsModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-warning">
            <h5 class="modal-title"><i class="bi bi-shield-exclamation me-2"></i>הגבלות תזונה</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" id="restrictionsBody"></div>
        </div>
      </div>
    </div>

    <!-- Meal Count Modal -->
    <div class="modal fade" id="mealCountModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-info text-white">
            <h5 class="modal-title"><i class="bi bi-people me-2"></i>ספירת מנות יומית</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" id="mealCountBody"></div>
        </div>
      </div>
    </div>

    <!-- Cell Edit Modal -->
    <div class="modal fade" id="mealEditModal" tabindex="-1">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="mealEditTitle">עריכת מנה</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <input type="text" class="form-control" id="mealEditInput" dir="rtl" placeholder="שם המנה...">
            <input type="hidden" id="mealEditDay">
            <input type="hidden" id="mealEditSlot">
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" onclick="Pages._mealsSaveCell()">
              <i class="bi bi-check-lg me-1"></i>שמור
            </button>
          </div>
        </div>
      </div>
    </div>`;

    // --- Page Header ---
    return `
    <div class="page-header d-flex justify-content-between align-items-center mb-3">
      <h1 class="mb-0"><i class="bi bi-egg-fried me-2"></i>ניהול ארוחות</h1>
    </div>
    ${statsHtml}
    ${toolbarHtml}
    ${gridHtml}
    ${modalsHtml}
    <style>
      .meal-cell:hover { background: rgba(13,110,253,.07) !important; }
      .meal-cell.drag-over { background: rgba(25,135,84,.12) !important; outline: 2px dashed #198754; }
      .meal-cell.editing { box-shadow: inset 0 0 0 2px #0d6efd; }
      .meal-cell[draggable="true"] { cursor: grab; }
      .meal-cell[draggable="true"]:active { cursor: grabbing; }
      .shopping-item { break-inside: avoid; }
      @media print {
        .btn, .modal-footer, .page-header, .card-header { display: none !important; }
      }
    </style>`;
  },

  /* ======================================================================
     INIT
     ====================================================================== */
  _mealsUseDemo: false,

  mealsLoadDemo() {
    this._mealsUseDemo = true;
    this._mealsGenerateDemo();
    this._mealsDemoMenu = null; // Force regeneration
    this._mealsGenerateDemo();
    App.navigate('meals'); // Re-render page
    Utils.toast('\u05E0\u05D8\u05E2\u05E0\u05D5 \u05E0\u05EA\u05D5\u05E0\u05D9 \u05D3\u05DE\u05D5', 'info');
  },

  mealsInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    // Try API first, then localStorage
    let hasData = false;
    try {
      const apiData = _gc('\u05EA\u05E4\u05E8\u05D9\u05D8');
      if (apiData && Object.keys(apiData).length > 0) {
        this._mealsDemoMenu = apiData;
        hasData = true;
      }
    } catch (e) { /* no API data */ }

    if (!hasData) {
      // Try localStorage
      const saved = localStorage.getItem('bht_meals_menu');
      if (saved) {
        try {
          this._mealsDemoMenu = JSON.parse(saved);
          hasData = true;
        } catch(e) {}
      }
    }

    if (!hasData && this._mealsUseDemo) {
      this._mealsGenerateDemo();
    } else if (!hasData) {
      // No data at all — show will render with null menu
      this._mealsDemoMenu = null;
    }

    this._mealsEditMode = false;

    // Enter key in edit modal
    const inp = document.getElementById('mealEditInput');
    if (inp) {
      inp.addEventListener('keydown', e => {
        if (e.key === 'Enter') { e.preventDefault(); this._mealsSaveCell(); }
      });
    }
  },

  _mealsLoadFromStorage() {
    const saved = localStorage.getItem('bht_meals_menu');
    if (saved) {
      try { this._mealsDemoMenu = JSON.parse(saved); return true; } catch (e) { /* no data */ }
    }
    return false;
  },

  _mealsSaveToStorage() {
    localStorage.setItem('bht_meals_menu', JSON.stringify(this._mealsDemoMenu));
  },

  /* ======================================================================
     EDIT MODE
     ====================================================================== */
  _mealsToggleEdit() {
    this._mealsEditMode = !this._mealsEditMode;
    const cells = document.querySelectorAll('.meal-cell');
    const btn = document.getElementById('mealsEditBtnText');

    if (this._mealsEditMode) {
      cells.forEach(c => {
        c.setAttribute('draggable', 'true');
        c.classList.add('editing');
      });
      if (btn) btn.textContent = 'סיום עריכה';
    } else {
      cells.forEach(c => {
        c.setAttribute('draggable', 'false');
        c.classList.remove('editing');
      });
      if (btn) btn.textContent = 'עריכת תפריט';
    }
  },

  /* ======================================================================
     CELL CLICK -> EDIT
     ====================================================================== */
  _mealsCellClick(td) {
    if (!td) return;
    const day = td.dataset.day;
    const slot = td.dataset.slot;
    if (!day || !slot) return;

    const title = document.getElementById('mealEditTitle');
    const input = document.getElementById('mealEditInput');
    const dayInput = document.getElementById('mealEditDay');
    const slotInput = document.getElementById('mealEditSlot');

    if (title) title.textContent = `יום ${day} - ${this._mealsGetMealLabel(slot)}`;
    if (input) input.value = this._mealsDemoMenu[day][slot];
    if (dayInput) dayInput.value = day;
    if (slotInput) slotInput.value = slot;

    const modal = new bootstrap.Modal(document.getElementById('mealEditModal'));
    modal.show();
    setTimeout(() => input && input.focus(), 300);
  },

  async _mealsSaveCell() {
    const day = document.getElementById('mealEditDay')?.value;
    const slot = document.getElementById('mealEditSlot')?.value;
    const val = document.getElementById('mealEditInput')?.value?.trim();
    if (!day || !slot || !val) return;

    this._mealsDemoMenu[day][slot] = val;
    const cell = document.getElementById(`meal-${day}-${slot}`);
    if (cell) {
      const span = cell.querySelector('.meal-text');
      if (span) span.textContent = val;
    }

    // Persist to API + localStorage
    try { await App.apiCall('update', '\u05EA\u05E4\u05E8\u05D9\u05D8', { id: day, row: this._mealsDemoMenu[day] }); } catch (e) { /* localStorage fallback */ }
    this._mealsSaveToStorage();

    bootstrap.Modal.getInstance(document.getElementById('mealEditModal'))?.hide();

    // Toast
    this._mealsToast('התפריט עודכן');
  },

  /* ======================================================================
     DRAG & DROP
     ====================================================================== */
  _mealsDragStart(e) {
    if (!this._mealsEditMode) { e.preventDefault(); return; }
    const td = e.target.closest('.meal-cell');
    if (!td) return;
    this._mealsDragSource = { day: td.dataset.day, slot: td.dataset.slot };
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/plain', '');
  },

  _mealsDragOver(e) {
    if (!this._mealsEditMode) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    const td = e.target.closest('.meal-cell');
    if (td) td.classList.add('drag-over');
  },

  _mealsDrop(e) {
    e.preventDefault();
    if (!this._mealsEditMode || !this._mealsDragSource) return;
    const td = e.target.closest('.meal-cell');
    if (!td) return;
    td.classList.remove('drag-over');

    const src = this._mealsDragSource;
    const destDay = td.dataset.day;
    const destSlot = td.dataset.slot;

    // Copy value
    const val = this._mealsDemoMenu[src.day][src.slot];
    this._mealsDemoMenu[destDay][destSlot] = val;
    const span = td.querySelector('.meal-text');
    if (span) span.textContent = val;

    this._mealsDragSource = null;
    this._mealsToast('מנה הועתקה');
  },

  /* ======================================================================
     SHOPPING LIST
     ====================================================================== */
  _mealsShowShoppingList() {
    const ingredients = this._mealsGenerateShoppingList();
    const body = document.getElementById('shoppingListBody');
    if (!body) return;

    // Group by category (rough grouping)
    const categories = {
      'בשר ודגים': [], 'ירקות ופירות': [], 'מוצרי חלב וביצים': [],
      'דגנים ומאפים': [], 'תבלינים ושמנים': [], 'אחר': []
    };

    ingredients.forEach((count, item) => {
      const lower = item;
      if (/עוף|בשר|דג|אמנון|שניצל|קציצ/.test(lower)) categories['בשר ודגים'].push({ item, count });
      else if (/עגבני|מלפפון|בצל|גזר|סלרי|פלפל|לימון|תפוח|בנ|תפוז|פירות|כרוב|כוסבר|פטרוזי|ירק/.test(lower)) categories['ירקות ופירות'].push({ item, count });
      else if (/חלב|גבינ|חמאה|ביצ|שמנת/.test(lower)) categories['מוצרי חלב וביצים'].push({ item, count });
      else if (/קמח|לחם|פסט|אורז|קוסקוס|פירור|אטרי|גרנול|קורנפ|שמר/.test(lower)) categories['דגנים ומאפים'].push({ item, count });
      else if (/שמן|מלח|פפריק|כורכום|כמון|קינמון|בזיל|סוכר|דבש|ריבה|רסק|סודה|שוקול/.test(lower)) categories['תבלינים ושמנים'].push({ item, count });
      else categories['אחר'].push({ item, count });
    });

    let html = '<div class="row g-3" id="shoppingListContent">';
    for (const [cat, items] of Object.entries(categories)) {
      if (!items.length) continue;
      html += `<div class="col-md-6"><div class="card border-0 bg-light shopping-item">
        <div class="card-body">
          <h6 class="fw-bold mb-2"><i class="bi bi-tag me-1"></i>${cat}</h6>
          <ul class="list-unstyled mb-0">
            ${items.map(({ item, count }) => `
              <li class="d-flex align-items-center gap-2 mb-1">
                <input type="checkbox" class="form-check-input mt-0">
                <span>${item}</span>
                ${count > 1 ? `<span class="badge bg-secondary">x${count}</span>` : ''}
              </li>`).join('')}
          </ul>
        </div>
      </div></div>`;
    }
    html += '</div>';

    body.innerHTML = html;
    new bootstrap.Modal(document.getElementById('shoppingListModal')).show();
  },

  _mealsCopyShoppingList() {
    const el = document.getElementById('shoppingListContent');
    if (!el) return;
    const items = [...el.querySelectorAll('li span:not(.badge)')].map(s => '- ' + s.textContent);
    navigator.clipboard.writeText(items.join('\n')).then(() => this._mealsToast('הועתק ללוח'));
  },

  _mealsPrintShoppingList() {
    window.print();
  },

  /* ======================================================================
     DIETARY RESTRICTIONS
     ====================================================================== */
  _mealsShowRestrictions() {
    const body = document.getElementById('restrictionsBody');
    if (!body) return;
    const restrictions = this._mealsDemoRestrictions || [];

    body.innerHTML = `
    <div class="alert alert-warning d-flex align-items-center mb-3">
      <i class="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
      <div><strong>${restrictions.length} תלמידים</strong> עם הגבלות תזונה פעילות</div>
    </div>
    <div class="table-responsive">
      <table class="table table-hover">
        <thead class="table-light">
          <tr>
            <th>שם</th><th>כיתה</th><th>סוג</th><th>פירוט</th><th>חומרה</th>
          </tr>
        </thead>
        <tbody>
          ${restrictions.map(r => `
          <tr>
            <td class="fw-bold">${r.name}</td>
            <td>${r.class}</td>
            <td><span class="badge bg-${r.color}">${r.type}</span></td>
            <td>${r.detail}</td>
            <td>
              <span class="badge bg-${r.color}">
                <i class="bi bi-${r.icon} me-1"></i>${r.severity}
              </span>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div class="text-muted small mt-2"><i class="bi bi-info-circle me-1"></i>נתונים לדוגמה. ניתן לעדכן דרך כרטיס התלמיד.</div>`;

    new bootstrap.Modal(document.getElementById('restrictionsModal')).show();
  },

  /* ======================================================================
     MEAL COUNT
     ====================================================================== */
  _mealsShowMealCount() {
    const body = document.getElementById('mealCountBody');
    if (!body) return;
    const days = ['ראשון','שני','שלישי','רביעי','חמישי','שישי'];
    const base = this._mealsGetStudentCount();
    const todayIdx = this._mealsTodayIndex();

    // Simulated daily attendance variation
    const attendance = days.map((_, i) => {
      if (i === 5) return Math.round(base * 0.85); // Friday lower
      return base - Math.floor(Math.random() * 4);  // slight variation
    });

    body.innerHTML = `
    <div class="table-responsive">
      <table class="table table-bordered text-center">
        <thead class="table-light">
          <tr>
            <th>יום</th><th>נוכחים</th><th>בוקר</th><th>צהריים</th><th>ביניים</th><th>סה"כ מנות</th>
          </tr>
        </thead>
        <tbody>
          ${days.map((d, i) => {
            const att = attendance[i];
            const bk = att;
            const ln = att;
            const sn = Math.round(att * 0.9);
            const total = bk + ln + sn;
            return `<tr class="${i === todayIdx ? 'table-primary fw-bold' : ''}">
              <td>יום ${d} ${i === todayIdx ? '<i class="bi bi-arrow-left-short"></i>' : ''}</td>
              <td>${att}/${base}</td>
              <td>${bk}</td>
              <td>${ln}</td>
              <td>${sn}</td>
              <td><span class="badge bg-primary fs-6">${total}</span></td>
            </tr>`;
          }).join('')}
        </tbody>
        <tfoot class="table-secondary fw-bold">
          <tr>
            <td>סה"כ שבועי</td>
            <td>-</td>
            <td>${attendance.reduce((a, b) => a + b, 0)}</td>
            <td>${attendance.reduce((a, b) => a + b, 0)}</td>
            <td>${attendance.map(a => Math.round(a * 0.9)).reduce((a, b) => a + b, 0)}</td>
            <td><span class="badge bg-dark fs-6">${attendance.reduce((s, a) => s + a + a + Math.round(a * 0.9), 0)}</span></td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="row g-3 mt-2">
      <div class="col-md-4">
        <div class="card bg-light text-center p-3">
          <div class="fs-4 fw-bold text-primary">${base}</div>
          <div class="text-muted small">תלמידים רשומים</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card bg-light text-center p-3">
          <div class="fs-4 fw-bold text-success">${(attendance.reduce((a, b) => a + b, 0) / days.length).toFixed(0)}</div>
          <div class="text-muted small">ממוצע נוכחים/יום</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card bg-light text-center p-3">
          <div class="fs-4 fw-bold text-info">\u20AA${(this._mealsCalcCost() * attendance.reduce((a, b) => a + b, 0)).toFixed(0)}</div>
          <div class="text-muted small">עלות שבועית משוערת</div>
        </div>
      </div>
    </div>`;

    new bootstrap.Modal(document.getElementById('mealCountModal')).show();
  },

  /* ======================================================================
     TOAST HELPER
     ====================================================================== */
  _mealsToast(msg) {
    let container = document.getElementById('mealsToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'mealsToastContainer';
      container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      container.style.zIndex = '1090';
      document.body.appendChild(container);
    }
    const id = 'mt_' + Date.now();
    container.insertAdjacentHTML('beforeend', `
      <div id="${id}" class="toast align-items-center text-bg-success border-0" role="alert">
        <div class="d-flex">
          <div class="toast-body"><i class="bi bi-check-circle me-1"></i>${msg}</div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
      </div>`);
    const t = new bootstrap.Toast(document.getElementById(id), { delay: 2000 });
    t.show();
  }
});
