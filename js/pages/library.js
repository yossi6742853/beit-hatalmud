/* ===== BHT v5.3 — Library (ספריית המוסד) ===== */
Object.assign(Pages, {
  library() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div><h1><i class="bi bi-book-half me-2"></i>\u05E1\u05E4\u05E8\u05D9\u05D9\u05EA \u05D4\u05DE\u05D5\u05E1\u05D3</h1><p class="text-muted mb-0" id="lib-subtitle"></p></div>
        <button class="btn btn-primary" onclick="Pages.showAddBookModal()"><i class="bi bi-plus-lg me-1"></i>\u05E1\u05E4\u05E8 \u05D7\u05D3\u05E9</button>
      </div>

      <!-- Stats Cards -->
      <div class="row g-3 mb-3">
        <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-primary" id="lib-total">0</div><small class="text-muted">\u05E1\u05D4"\u05DB \u05E1\u05E4\u05E8\u05D9\u05DD</small></div></div>
        <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-success" id="lib-available">0</div><small class="text-muted">\u05D6\u05DE\u05D9\u05E0\u05D9\u05DD</small></div></div>
        <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-warning" id="lib-on-loan">0</div><small class="text-muted">\u05DE\u05D5\u05E9\u05D0\u05DC\u05D9\u05DD</small></div></div>
        <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-danger" id="lib-overdue">0</div><small class="text-muted">\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8</small></div></div>
      </div>

      <!-- Search & Filters -->
      <div class="card p-3 mb-3">
        <div class="row g-2 align-items-center">
          <div class="col-md-5"><div class="search-box"><i class="bi bi-search"></i><input type="text" class="form-control" id="lib-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05DC\u05E4\u05D9 \u05E9\u05DD / \u05DE\u05D7\u05D1\u05E8..."></div></div>
          <div class="col-md-3"><select class="form-select" id="lib-cat-filter">
            <option value="">\u05DB\u05DC \u05D4\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D5\u05EA</option>
            <option value="\u05EA\u05D5\u05E8\u05D4">\u05EA\u05D5\u05E8\u05D4</option>
            <option value="\u05D4\u05DC\u05DB\u05D4">\u05D4\u05DC\u05DB\u05D4</option>
            <option value="\u05D2\u05DE\u05E8\u05D0">\u05D2\u05DE\u05E8\u05D0</option>
            <option value="\u05DB\u05DC\u05DC\u05D9">\u05DB\u05DC\u05DC\u05D9</option>
          </select></div>
          <div class="col-md-2"><select class="form-select" id="lib-avail-filter">
            <option value="">\u05D4\u05DB\u05DC</option>
            <option value="available">\u05D6\u05DE\u05D9\u05DF</option>
            <option value="unavailable">\u05D0\u05D6\u05DC</option>
          </select></div>
          <div class="col-md-2">
            <div class="btn-group w-100" role="group">
              <button class="btn btn-outline-secondary active" id="lib-view-grid" onclick="Pages._libView='grid';Pages.renderLibrary()" title="\u05EA\u05E6\u05D5\u05D2\u05EA \u05DB\u05E8\u05D8\u05D9\u05E1\u05D9\u05DD"><i class="bi bi-grid-3x3-gap-fill"></i></button>
              <button class="btn btn-outline-secondary" id="lib-view-loans" onclick="Pages._libView='loans';Pages.renderLibrary()" title="\u05D4\u05E9\u05D0\u05DC\u05D5\u05EA \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA"><i class="bi bi-list-ul"></i></button>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <div id="lib-content">${Utils.skeleton(3)}</div>

      <!-- Add Book Modal -->
      <div class="modal fade" id="add-book-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
        <div class="modal-header"><h5 class="modal-title"><i class="bi bi-book me-2"></i>\u05D4\u05D5\u05E1\u05E4\u05EA \u05E1\u05E4\u05E8</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body">
          <div class="mb-3"><label class="form-label">\u05E9\u05DD \u05D4\u05E1\u05E4\u05E8 *</label><input type="text" class="form-control" id="bf-title" required></div>
          <div class="row g-3 mb-3">
            <div class="col-6"><label class="form-label">\u05DE\u05D7\u05D1\u05E8</label><input type="text" class="form-control" id="bf-author"></div>
            <div class="col-6"><label class="form-label">ISBN</label><input type="text" class="form-control" id="bf-isbn" dir="ltr"></div>
          </div>
          <div class="row g-3 mb-3">
            <div class="col-6"><label class="form-label">\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4</label>
              <select class="form-select" id="bf-category">
                <option value="\u05EA\u05D5\u05E8\u05D4">\u05EA\u05D5\u05E8\u05D4</option>
                <option value="\u05D4\u05DC\u05DB\u05D4">\u05D4\u05DC\u05DB\u05D4</option>
                <option value="\u05D2\u05DE\u05E8\u05D0">\u05D2\u05DE\u05E8\u05D0</option>
                <option value="\u05DB\u05DC\u05DC\u05D9">\u05DB\u05DC\u05DC\u05D9</option>
              </select>
            </div>
            <div class="col-6"><label class="form-label">\u05DE\u05E1' \u05E2\u05D5\u05EA\u05E7\u05D9\u05DD</label><input type="number" class="form-control" id="bf-copies" value="1" min="1"></div>
          </div>
          <div class="row g-3 mb-3">
            <div class="col-6"><label class="form-label">\u05DE\u05D9\u05E7\u05D5\u05DD \u05DE\u05D3\u05E3</label><input type="text" class="form-control" id="bf-shelf" placeholder="\u05DE\u05D3\u05E3 \u05D0-3"></div>
            <div class="col-6"></div>
          </div>
          <div class="mb-3"><label class="form-label">\u05D4\u05E2\u05E8\u05D5\u05EA</label><textarea class="form-control" id="bf-notes" rows="2"></textarea></div>
        </div>
        <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveNewBook()">\u05E9\u05DE\u05D9\u05E8\u05D4</button></div>
      </div></div></div>

      <!-- Loan Modal -->
      <div class="modal fade" id="loan-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
        <div class="modal-header"><h5 class="modal-title" id="loan-modal-title">\u05D4\u05E9\u05D0\u05DC\u05EA \u05E1\u05E4\u05E8</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body">
          <input type="hidden" id="lf-book-id">
          <div class="mb-3"><label class="form-label">\u05E9\u05DD \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3</label>
            <select class="form-select" id="lf-student">
              <option value="">\u05D1\u05D7\u05E8 \u05EA\u05DC\u05DE\u05D9\u05D3...</option>
            </select>
          </div>
          <div class="mb-3"><label class="form-label">\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05D7\u05D6\u05E8\u05D4</label><input type="date" class="form-control" id="lf-due-date"></div>
        </div>
        <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary" onclick="Pages.saveLoan()">\u05D4\u05E9\u05D0\u05DC</button></div>
      </div></div></div>
    `;
  },

  /* ---- View state ---- */
  _libView: 'grid',

  /* ---- Category colors ---- */
  _libCatColors: {
    '\u05EA\u05D5\u05E8\u05D4': 'primary',
    '\u05D4\u05DC\u05DB\u05D4': 'success',
    '\u05D2\u05DE\u05E8\u05D0': 'info',
    '\u05DB\u05DC\u05DC\u05D9': 'warning'
  },

  /* ---- Category icons ---- */
  _libCatIcons: {
    '\u05EA\u05D5\u05E8\u05D4': 'bi-star-fill',
    '\u05D4\u05DC\u05DB\u05D4': 'bi-journal-check',
    '\u05D2\u05DE\u05E8\u05D0': 'bi-book-fill',
    '\u05DB\u05DC\u05DC\u05D9': 'bi-bookshelf'
  },

  /* ---- Demo books (15 books across 4 categories) ---- */
  _libBooks: [

    { id:1,  title:'\u05D7\u05D5\u05DE\u05E9 \u05E2\u05DD \u05E8\u05E9"\u05D9 - \u05D1\u05E8\u05D0\u05E9\u05D9\u05EA',      author:'',                           category:'\u05EA\u05D5\u05E8\u05D4',  copies:10, shelf:'\u05D0-1', isbn:'',            notes:'' },
    { id:2,  title:'\u05D7\u05D5\u05DE\u05E9 \u05E2\u05DD \u05E8\u05E9"\u05D9 - \u05E9\u05DE\u05D5\u05EA',          author:'',                           category:'\u05EA\u05D5\u05E8\u05D4',  copies:8,  shelf:'\u05D0-1', isbn:'',            notes:'' },
    { id:3,  title:'\u05DE\u05E7\u05E8\u05D0\u05D5\u05EA \u05D2\u05D3\u05D5\u05DC\u05D5\u05EA',                 author:'',                           category:'\u05EA\u05D5\u05E8\u05D4',  copies:12, shelf:'\u05D0-2', isbn:'',            notes:'' }
  ],

  /* ---- Demo students for loans ---- */
  _libStudents: [
    '\u05D9\u05D5\u05E1\u05E3 \u05DB\u05D4\u05DF', '\u05DE\u05E9\u05D4 \u05DC\u05D5\u05D9', '\u05D0\u05D1\u05E8\u05D4\u05DD \u05D9\u05E6\u05D7\u05E7\u05D9', '\u05D3\u05D5\u05D3 \u05DE\u05D6\u05E8\u05D7\u05D9',
    '\u05E9\u05DE\u05D5\u05D0\u05DC \u05D1\u05E8\u05D2\u05E8', '\u05D0\u05DC\u05D9\u05D4\u05D5 \u05E4\u05E8\u05D9\u05D3\u05DE\u05DF', '\u05E0\u05EA\u05E0\u05D0\u05DC \u05E8\u05D5\u05D6\u05E0\u05E4\u05DC\u05D3', '\u05D7\u05D9\u05D9\u05DD \u05D2\u05D5\u05DC\u05D3\u05E9\u05D8\u05D9\u05D9\u05DF',
    '\u05D9\u05E2\u05E7\u05D1 \u05E9\u05E8\u05D9\u05E7\u05D9', '\u05E8\u05E4\u05D0\u05DC \u05D0\u05DC\u05E7\u05D1\u05E5'
  ],

  /* ---- Demo loans (8 active loans) ---- */
  _libLoans: [

    { id:1, bookId:1,  student:'\u05D9\u05D5\u05E1\u05E3 \u05DB\u05D4\u05DF',        borrowDate:'2026-04-10', dueDate:'2026-04-24', status:'active' },
    { id:2, bookId:1,  student:'\u05DE\u05E9\u05D4 \u05DC\u05D5\u05D9',          borrowDate:'2026-04-08', dueDate:'2026-04-22', status:'overdue' },
    { id:3, bookId:5,  student:'\u05D0\u05D1\u05E8\u05D4\u05DD \u05D9\u05E6\u05D7\u05E7\u05D9',   borrowDate:'2026-04-12', dueDate:'2026-04-26', status:'active' }
  ],

  /* ---- Next loan ID ---- */
  _libNextLoanId: 9,

  /* ---- Init ---- */
  _libUseDemo: false,

  libraryLoadDemo() {
    this._libUseDemo = true;
    App.navigate('library');
  },

  libraryInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    this._libView = 'grid';
    let loaded = false;

    // Try loading from API
    try {
      const apiData = _gc('\u05E1\u05E4\u05E8\u05D9\u05D4');
      if (apiData && apiData.length) {
        this._libBooks = apiData.filter(r => r.type === 'book' || !r.type);
        this._libLoans = apiData.filter(r => r.type === 'loan');
        loaded = true;
      }
    } catch(e) { /* fall through */ }

    // Fall back to localStorage
    if (!loaded) {
      this._libLoadFromStorage();
      loaded = this._libBooks && this._libBooks.length > 0;
    }

    // If still has hardcoded demo data and not flagged, clear
    if (!loaded && !this._libUseDemo) {
      this._libBooks = [];
      this._libLoans = [];
    }

    if (!loaded && this._libUseDemo) {
      // Keep demo data as-is
    }

    this._updateLoanStatuses();
    this._syncBookBorrowCounts();

    const render = () => this.renderLibrary();
    document.getElementById('lib-search').addEventListener('input', Utils.debounce(render, 200));
    document.getElementById('lib-cat-filter').addEventListener('change', render);
    document.getElementById('lib-avail-filter').addEventListener('change', render);

    this.renderLibrary();
  },

  /* ---- localStorage helpers ---- */
  _libLoadFromStorage() {
    try {
      const stored = localStorage.getItem('bht_library_data');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.books) this._libBooks = parsed.books;
        if (parsed.loans) this._libLoans = parsed.loans;
      }
    } catch(e) { /* keep demo data */ }
  },

  _libSaveToStorage() {
    try {
      localStorage.setItem('bht_library_data', JSON.stringify({ books: this._libBooks, loans: this._libLoans }));
    } catch(e) { /* silent */ }
  },

  /* ---- Auto-detect overdue based on today ---- */
  _updateLoanStatuses() {
    const today = new Date().toISOString().slice(0, 10);
    this._libLoans.forEach(l => {
      if (l.status === 'returned') return;
      l.status = l.dueDate < today ? 'overdue' : 'active';
    });
  },

  /* ---- Sync borrowed count from active loans ---- */
  _syncBookBorrowCounts() {
    this._libBooks.forEach(b => {
      b.borrowed = this._libLoans.filter(l => l.bookId === b.id && l.status !== 'returned').length;
    });
  },

  /* ---- Main render ---- */
  renderLibrary() {
    const search = (document.getElementById('lib-search')?.value || '').trim().toLowerCase();
    const catF = document.getElementById('lib-cat-filter')?.value || '';
    const availF = document.getElementById('lib-avail-filter')?.value || '';

    let books = this._libBooks.filter(b => {
      if (search && !b.title.toLowerCase().includes(search) && !(b.author || '').toLowerCase().includes(search)) return false;
      if (catF && b.category !== catF) return false;
      if (availF === 'available' && (b.copies - b.borrowed) <= 0) return false;
      if (availF === 'unavailable' && (b.copies - b.borrowed) > 0) return false;
      return true;
    });

    // Stats
    const totalBooks = this._libBooks.length;
    const totalCopies = this._libBooks.reduce((s, b) => s + b.copies, 0);
    const totalBorrowed = this._libBooks.reduce((s, b) => s + b.borrowed, 0);
    const overdueCount = this._libLoans.filter(l => l.status === 'overdue').length;

    document.getElementById('lib-total').textContent = totalBooks;
    document.getElementById('lib-available').textContent = totalCopies - totalBorrowed;
    document.getElementById('lib-on-loan').textContent = totalBorrowed;
    document.getElementById('lib-overdue').textContent = overdueCount;
    document.getElementById('lib-subtitle').textContent = `${books.length} \u05E1\u05E4\u05E8\u05D9\u05DD \u05DE\u05D5\u05E6\u05D2\u05D9\u05DD`;

    // Toggle view buttons
    document.getElementById('lib-view-grid').classList.toggle('active', this._libView === 'grid');
    document.getElementById('lib-view-loans').classList.toggle('active', this._libView === 'loans');

    if (this._libView === 'loans') {
      this._renderLoansTable();
    } else {
      this._renderBookGrid(books);
    }
  },

  /* ---- Book card grid ---- */
  _renderBookGrid(books) {
    if (books.length === 0) {
      const isFiltered = (document.getElementById('lib-search')?.value || '').trim() ||
                         (document.getElementById('lib-cat-filter')?.value || '') ||
                         (document.getElementById('lib-avail-filter')?.value || '');
      if (isFiltered) {
        document.getElementById('lib-content').innerHTML = `<div class="empty-state"><i class="bi bi-search"></i><h5>\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05E1\u05E4\u05E8\u05D9\u05DD</h5><p class="text-muted">\u05E0\u05E1\u05D4 \u05DC\u05E9\u05E0\u05D5\u05EA \u05D0\u05EA \u05D4\u05D7\u05D9\u05E4\u05D5\u05E9 \u05D0\u05D5 \u05D4\u05E1\u05D9\u05E0\u05D5\u05DF</p></div>`;
      } else {
        document.getElementById('lib-content').innerHTML = `<div class="empty-state text-center py-5"><i class="bi bi-book-half fs-1 text-muted d-block mb-2"></i><h5>\u05D0\u05D9\u05DF \u05E1\u05E4\u05E8\u05D9\u05DD \u05D1\u05DE\u05D0\u05D2\u05E8</h5><p class="text-muted">\u05E0\u05D9\u05EA\u05DF \u05DC\u05D4\u05D5\u05E1\u05D9\u05E3 \u05E1\u05E4\u05E8\u05D9\u05DD \u05D9\u05D3\u05E0\u05D9\u05EA \u05D1\u05DC\u05D7\u05E5 "\u05E1\u05E4\u05E8 \u05D7\u05D3\u05E9"</p><a href="#" class="btn btn-sm btn-outline-secondary mt-2" onclick="Pages.libraryLoadDemo();return false"><i class="bi bi-database me-1"></i>\u05D8\u05E2\u05DF \u05D3\u05DE\u05D5</a></div>`;
      }
      return;
    }
    const catColors = this._libCatColors;
    const catIcons = this._libCatIcons;
    const html = books.map(b => {
      const avail = b.copies - b.borrowed;
      const pct = b.copies > 0 ? Math.round((avail / b.copies) * 100) : 0;
      const barColor = avail === 0 ? 'danger' : avail <= 2 ? 'warning' : 'success';
      const color = catColors[b.category] || 'secondary';
      const icon = catIcons[b.category] || 'bi-book';
      const activeLoans = this._libLoans.filter(l => l.bookId === b.id && l.status !== 'returned');
      const overdueLoans = activeLoans.filter(l => l.status === 'overdue');

      return `<div class="col-md-6 col-lg-4">
        <div class="card p-3 h-100">
          <div class="d-flex gap-3 mb-2">
            <div class="d-flex align-items-center justify-content-center" style="background:var(--bs-${color}-bg-subtle, #e8f0fe);color:var(--bs-${color});width:56px;height:72px;border-radius:8px;font-size:1.6rem;flex-shrink:0">
              <i class="bi ${icon}"></i>
            </div>
            <div class="flex-grow-1 min-width-0">
              <h6 class="fw-bold mb-1 text-truncate" title="${b.title}">${b.title}</h6>
              ${b.author ? `<div class="text-muted small mb-1"><i class="bi bi-person me-1"></i>${b.author}</div>` : ''}
              <div class="d-flex gap-1 flex-wrap">
                <span class="badge bg-${color}">${b.category}</span>
                ${b.shelf ? `<span class="badge bg-light text-dark border"><i class="bi bi-geo-alt-fill me-1"></i>${b.shelf}</span>` : ''}
                ${overdueLoans.length > 0 ? `<span class="badge bg-danger"><i class="bi bi-exclamation-triangle me-1"></i>${overdueLoans.length} \u05D1\u05D0\u05D9\u05D7\u05D5\u05E8</span>` : ''}
              </div>
            </div>
          </div>
          <div class="mb-2">
            <div class="d-flex justify-content-between small text-muted mb-1">
              <span>${avail} \u05D6\u05DE\u05D9\u05E0\u05D9\u05DD \u05DE\u05EA\u05D5\u05DA ${b.copies}</span>
              <span>${b.borrowed} \u05DE\u05D5\u05E9\u05D0\u05DC\u05D9\u05DD</span>
            </div>
            <div class="progress" style="height:6px"><div class="progress-bar bg-${barColor}" style="width:${pct}%"></div></div>
          </div>
          <div class="d-flex gap-2 mt-auto">
            ${avail > 0
              ? `<button class="btn btn-sm btn-outline-primary flex-grow-1" onclick="Pages.showLoanModal(${b.id})"><i class="bi bi-box-arrow-up-left me-1"></i>\u05D4\u05E9\u05D0\u05DC</button>`
              : `<button class="btn btn-sm btn-outline-secondary flex-grow-1" disabled><i class="bi bi-x-circle me-1"></i>\u05D0\u05D6\u05DC</button>`
            }
            <button class="btn btn-sm btn-outline-danger" onclick="Pages.deleteBook(${b.id})" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button>
          </div>
        </div>
      </div>`;
    }).join('');

    document.getElementById('lib-content').innerHTML = `<div class="row g-3">${html}</div>`;
  },

  /* ---- Active loans table ---- */
  _renderLoansTable() {
    const activeLoans = this._libLoans.filter(l => l.status !== 'returned');
    const search = (document.getElementById('lib-search')?.value || '').trim().toLowerCase();

    let loans = activeLoans;
    if (search) {
      loans = loans.filter(l => {
        const book = this._libBooks.find(b => b.id === l.bookId);
        return l.student.toLowerCase().includes(search) || (book && book.title.toLowerCase().includes(search));
      });
    }

    // Sort: overdue first, then by due date
    loans.sort((a, b) => {
      if (a.status === 'overdue' && b.status !== 'overdue') return -1;
      if (b.status === 'overdue' && a.status !== 'overdue') return 1;
      return a.dueDate.localeCompare(b.dueDate);
    });

    if (loans.length === 0) {
      document.getElementById('lib-content').innerHTML = `<div class="empty-state"><i class="bi bi-check-circle"></i><h5>\u05D0\u05D9\u05DF \u05D4\u05E9\u05D0\u05DC\u05D5\u05EA \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA</h5></div>`;
      return;
    }

    const statusBadge = (s) => {
      if (s === 'overdue') return '<span class="badge bg-danger"><i class="bi bi-exclamation-circle me-1"></i>\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8</span>';
      if (s === 'returned') return '<span class="badge bg-secondary">\u05D4\u05D5\u05D7\u05D6\u05E8</span>';
      return '<span class="badge bg-success">\u05E4\u05E2\u05D9\u05DC</span>';
    };

    const daysLeft = (due) => {
      const diff = Math.ceil((new Date(due) - new Date()) / 86400000);
      if (diff < 0) return `<span class="text-danger fw-bold">${Math.abs(diff)} \u05D9\u05DE\u05D9\u05DD \u05D1\u05D0\u05D9\u05D7\u05D5\u05E8</span>`;
      if (diff === 0) return '<span class="text-warning fw-bold">\u05D4\u05D9\u05D5\u05DD</span>';
      return `<span class="text-muted">${diff} \u05D9\u05DE\u05D9\u05DD</span>`;
    };

    const rows = loans.map(l => {
      const book = this._libBooks.find(b => b.id === l.bookId);
      return `<tr class="${l.status === 'overdue' ? 'table-danger' : ''}">
        <td><div class="d-flex align-items-center gap-2">${Utils.avatarHTML(l.student, 'sm')}<span class="fw-bold">${l.student}</span></div></td>
        <td>${book ? book.title : '\u05DC\u05D0 \u05D9\u05D3\u05D5\u05E2'}</td>
        <td>${Utils.formatDateShort(l.borrowDate)}</td>
        <td>${Utils.formatDateShort(l.dueDate)}</td>
        <td>${daysLeft(l.dueDate)}</td>
        <td>${statusBadge(l.status)}</td>
        <td><button class="btn btn-sm btn-outline-success" onclick="Pages.returnBook(${l.id})"><i class="bi bi-box-arrow-in-down me-1"></i>\u05D4\u05D7\u05D6\u05E8</button></td>
      </tr>`;
    }).join('');

    document.getElementById('lib-content').innerHTML = `
      <div class="card">
        <div class="table-responsive">
          <table class="table table-hover mb-0 align-middle">
            <thead class="table-light">
              <tr><th>\u05EA\u05DC\u05DE\u05D9\u05D3</th><th>\u05E1\u05E4\u05E8</th><th>\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05E9\u05D0\u05DC\u05D4</th><th>\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05D7\u05D6\u05E8\u05D4</th><th>\u05D6\u05DE\u05DF \u05E0\u05D5\u05EA\u05E8</th><th>\u05E1\u05D8\u05D8\u05D5\u05E1</th><th>\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA</th></tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>`;
  },

  /* ---- Show Add Book Modal ---- */
  showAddBookModal() {
    document.getElementById('bf-title').value = '';
    document.getElementById('bf-author').value = '';
    document.getElementById('bf-isbn').value = '';
    document.getElementById('bf-category').value = '\u05EA\u05D5\u05E8\u05D4';
    document.getElementById('bf-copies').value = '1';
    document.getElementById('bf-shelf').value = '';
    document.getElementById('bf-notes').value = '';
    new bootstrap.Modal(document.getElementById('add-book-modal')).show();
  },

  /* ---- Save new book ---- */
  saveNewBook() {
    const title = document.getElementById('bf-title').value.trim();
    if (!title) { Utils.toast('\u05E0\u05D0 \u05DC\u05DE\u05DC\u05D0 \u05E9\u05DD \u05E1\u05E4\u05E8', 'warning'); return; }

    const newBook = {
      id: Math.max(...this._libBooks.map(b => b.id)) + 1,
      title,
      author: document.getElementById('bf-author').value.trim(),
      isbn: document.getElementById('bf-isbn').value.trim(),
      category: document.getElementById('bf-category').value,
      copies: parseInt(document.getElementById('bf-copies').value) || 1,
      borrowed: 0,
      shelf: document.getElementById('bf-shelf').value.trim(),
      notes: document.getElementById('bf-notes').value.trim()
    };

    this._libBooks.push(newBook);
    this._libSaveToStorage();
    App.apiCall('add', 'ספריה', { row: { ...newBook, type: 'book' } }).catch(e => console.warn('library add failed:', e));
    bootstrap.Modal.getInstance(document.getElementById('add-book-modal')).hide();
    Utils.toast(`\u05D4\u05E1\u05E4\u05E8 "${title}" \u05E0\u05D5\u05E1\u05E3 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4`);
    this.renderLibrary();
  },

  /* ---- Delete book ---- */
  async deleteBook(bookId) {
    const book = this._libBooks.find(b => b.id === bookId);
    if (!book) return;
    const activeLoans = this._libLoans.filter(l => l.bookId === bookId && l.status !== 'returned');
    if (activeLoans.length > 0) {
      Utils.toast(`\u05DC\u05D0 \u05E0\u05D9\u05EA\u05DF \u05DC\u05DE\u05D7\u05D5\u05E7 - \u05D9\u05E9 ${activeLoans.length} \u05D4\u05E9\u05D0\u05DC\u05D5\u05EA \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA`, 'warning');
      return;
    }
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05EA \u05E1\u05E4\u05E8', `\u05DC\u05DE\u05D7\u05D5\u05E7 \u05D0\u05EA "${book.title}"?`)) return;
    this._libBooks = this._libBooks.filter(b => b.id !== bookId);
    this._libSaveToStorage();
    App.apiCall('delete', 'ספריה', { id: bookId }).catch(e => console.warn('library delete failed:', e));
    Utils.toast(`"${book.title}" \u05E0\u05DE\u05D7\u05E7`, 'info');
    this.renderLibrary();
  },

  /* ---- Show Loan Modal ---- */
  showLoanModal(bookId) {
    const book = this._libBooks.find(b => b.id === bookId);
    if (!book) return;

    document.getElementById('loan-modal-title').textContent = `\u05D4\u05E9\u05D0\u05DC\u05EA: ${book.title}`;
    document.getElementById('lf-book-id').value = bookId;

    // Set default due date to 14 days from now
    const due = new Date();
    due.setDate(due.getDate() + 14);
    document.getElementById('lf-due-date').value = due.toISOString().slice(0, 10);

    // Populate students dropdown
    const select = document.getElementById('lf-student');
    select.innerHTML = '<option value="">\u05D1\u05D7\u05E8 \u05EA\u05DC\u05DE\u05D9\u05D3...</option>';
    this._libStudents.forEach(s => {
      select.insertAdjacentHTML('beforeend', `<option value="${s}">${s}</option>`);
    });

    new bootstrap.Modal(document.getElementById('loan-modal')).show();
  },

  /* ---- Save loan ---- */
  saveLoan() {
    const bookId = parseInt(document.getElementById('lf-book-id').value);
    const student = document.getElementById('lf-student').value;
    const dueDate = document.getElementById('lf-due-date').value;

    if (!student) { Utils.toast('\u05E0\u05D0 \u05DC\u05D1\u05D7\u05D5\u05E8 \u05EA\u05DC\u05DE\u05D9\u05D3', 'warning'); return; }
    if (!dueDate) { Utils.toast('\u05E0\u05D0 \u05DC\u05D4\u05D6\u05D9\u05DF \u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05D7\u05D6\u05E8\u05D4', 'warning'); return; }

    const book = this._libBooks.find(b => b.id === bookId);
    if (!book || (book.copies - book.borrowed) <= 0) {
      Utils.toast('\u05D0\u05D9\u05DF \u05E2\u05D5\u05EA\u05E7\u05D9\u05DD \u05D6\u05DE\u05D9\u05E0\u05D9\u05DD', 'danger');
      return;
    }

    const loan = {
      id: this._libNextLoanId++,
      bookId,
      student,
      borrowDate: new Date().toISOString().slice(0, 10),
      dueDate,
      status: 'active'
    };

    this._libLoans.push(loan);
    book.borrowed++;
    this._libSaveToStorage();
    App.apiCall('add', 'ספריה', { row: { ...loan, type: 'loan' } }).catch(e => console.warn('library loan add failed:', e));
    bootstrap.Modal.getInstance(document.getElementById('loan-modal')).hide();
    Utils.toast(`"${book.title}" \u05D4\u05D5\u05E9\u05D0\u05DC \u05DC${student}`);
    this.renderLibrary();
  },

  /* ---- Return book ---- */
  returnBook(loanId) {
    const loan = this._libLoans.find(l => l.id === loanId);
    if (!loan) return;

    loan.status = 'returned';
    const book = this._libBooks.find(b => b.id === loan.bookId);
    if (book) book.borrowed = Math.max(0, book.borrowed - 1);
    this._libSaveToStorage();
    App.apiCall('update', 'ספריה', { id: loan.id, row: { ...loan, type: 'loan' } }).catch(e => console.warn('library return update failed:', e));

    Utils.toast(`\u05D4\u05E1\u05E4\u05E8 \u05D4\u05D5\u05D7\u05D6\u05E8 \u05DE${loan.student}`);
    this.renderLibrary();
  }
});
