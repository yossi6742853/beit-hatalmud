/* ===== BHT v5.3 — Library (ספריית המוסד) ===== */
Object.assign(Pages, {
  library() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-book-half me-2"></i>\u05E1\u05E4\u05E8\u05D9\u05D9\u05EA \u05D4\u05DE\u05D5\u05E1\u05D3</h1></div><button class="btn btn-primary btn-sm" onclick="Pages.showAddBook()"><i class="bi bi-plus-lg me-1"></i>\u05E1\u05E4\u05E8 \u05D7\u05D3\u05E9</button></div>
    <div class="card p-3 mb-3"><div class="search-box"><i class="bi bi-search"></i><input class="form-control" id="lib-search" placeholder="\u05D7\u05E4\u05E9 \u05E1\u05E4\u05E8..." oninput="Pages.renderLibrary()"></div></div>
    <div class="row g-3 mb-3"><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-primary" id="lib-total">0</div><small>\u05E1\u05E4\u05E8\u05D9\u05DD</small></div></div><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-warning" id="lib-borrowed">0</div><small>\u05DE\u05D5\u05E9\u05D0\u05DC\u05D9\u05DD</small></div></div><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-success" id="lib-available">0</div><small>\u05D6\u05DE\u05D9\u05E0\u05D9\u05DD</small></div></div><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-danger" id="lib-overdue">0</div><small>\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8</small></div></div></div>
    <div id="lib-list">${Utils.skeleton(3)}</div>`;
  },
  _libBooks: [
    {id:1,title:'\u05EA\u05DC\u05DE\u05D5\u05D3 \u05D1\u05D1\u05DC\u05D9 - \u05D1\u05E8\u05DB\u05D5\u05EA',author:'',category:'\u05D2\u05DE\u05E8\u05D0',copies:5,borrowed:2,status:'\u05D6\u05DE\u05D9\u05DF'},
    {id:2,title:'\u05DE\u05E9\u05E0\u05D4 \u05D1\u05E8\u05D5\u05E8\u05D4 \u05D7\u05DC\u05E7 \u05D0',author:'\u05D4\u05D7\u05E4\u05E5 \u05D7\u05D9\u05D9\u05DD',category:'\u05D4\u05DC\u05DB\u05D4',copies:8,borrowed:3,status:'\u05D6\u05DE\u05D9\u05DF'},
    {id:3,title:'\u05D7\u05D5\u05DE\u05E9 \u05E2\u05DD \u05E8\u05E9"\u05D9',author:'',category:'\u05D7\u05D5\u05DE\u05E9',copies:15,borrowed:10,status:'\u05D6\u05DE\u05D9\u05DF'},
    {id:4,title:'\u05E7\u05D9\u05E6\u05D5\u05E8 \u05E9\u05D5\u05DC\u05D7\u05DF \u05E2\u05E8\u05D5\u05DA',author:'',category:'\u05D4\u05DC\u05DB\u05D4',copies:6,borrowed:1,status:'\u05D6\u05DE\u05D9\u05DF'},
    {id:5,title:'\u05DE\u05E1\u05D9\u05DC\u05EA \u05D9\u05E9\u05E8\u05D9\u05DD',author:'\u05D4\u05E8\u05DE\u05D7"\u05DC',category:'\u05DE\u05D5\u05E1\u05E8',copies:4,borrowed:4,status:'\u05D0\u05D6\u05DC'},
    {id:6,title:'\u05E0\u05E4\u05E9 \u05D4\u05D7\u05D9\u05D9\u05DD',author:'\u05E8\' \u05D7\u05D9\u05D9\u05DD \u05DE\u05D5\u05D5\u05DC\u05D5\u05D6\'\u05D9\u05DF',category:'\u05DE\u05D7\u05E9\u05D1\u05D4',copies:3,borrowed:0,status:'\u05D6\u05DE\u05D9\u05DF'},
    {id:7,title:'\u05EA\u05DC\u05DE\u05D5\u05D3 \u05D1\u05D1\u05DC\u05D9 - \u05E9\u05D1\u05EA',author:'',category:'\u05D2\u05DE\u05E8\u05D0',copies:5,borrowed:3,status:'\u05D6\u05DE\u05D9\u05DF'},
    {id:8,title:'\u05D0\u05D5\u05E8\u05D7\u05D5\u05EA \u05E6\u05D3\u05D9\u05E7\u05D9\u05DD',author:'',category:'\u05DE\u05D5\u05E1\u05E8',copies:2,borrowed:2,status:'\u05D0\u05D6\u05DC'},
    {id:9,title:'\u05E9\u05DE\u05D9\u05E8\u05EA \u05D4\u05DC\u05E9\u05D5\u05DF',author:'\u05D4\u05D7\u05E4\u05E5 \u05D7\u05D9\u05D9\u05DD',category:'\u05DE\u05D5\u05E1\u05E8',copies:3,borrowed:1,status:'\u05D6\u05DE\u05D9\u05DF'},
    {id:10,title:'\u05E4\u05E8\u05E7\u05D9 \u05D0\u05D1\u05D5\u05EA \u05E2\u05DD \u05E4\u05D9\u05E8\u05D5\u05E9\u05D9\u05DD',author:'',category:'\u05DE\u05E9\u05E0\u05D4',copies:10,borrowed:5,status:'\u05D6\u05DE\u05D9\u05DF'}
  ],
  async libraryInit() { this.renderLibrary(); },
  renderLibrary() {
    const search = (document.getElementById('lib-search')?.value||'').toLowerCase();
    let books = this._libBooks;
    if (search) books = books.filter(b => b.title.toLowerCase().includes(search) || (b.category||'').includes(search));
    const borrowed = books.reduce((s,b)=>s+b.borrowed,0);
    const total = books.reduce((s,b)=>s+b.copies,0);
    document.getElementById('lib-total').textContent = total;
    document.getElementById('lib-borrowed').textContent = borrowed;
    document.getElementById('lib-available').textContent = total - borrowed;
    document.getElementById('lib-overdue').textContent = books.filter(b=>b.status==='\u05D0\u05D6\u05DC').length;

    const catColors = {'\u05D2\u05DE\u05E8\u05D0':'primary','\u05D4\u05DC\u05DB\u05D4':'success','\u05D7\u05D5\u05DE\u05E9':'info','\u05DE\u05D5\u05E1\u05E8':'warning','\u05DE\u05E9\u05E0\u05D4':'secondary','\u05DE\u05D7\u05E9\u05D1\u05D4':'danger'};
    document.getElementById('lib-list').innerHTML = `<div class="row g-3">${books.map(b => `<div class="col-md-6 col-lg-4"><div class="card p-3"><div class="d-flex gap-3"><div class="avatar" style="background:var(--bht-${catColors[b.category]||'primary'});width:50px;height:65px;border-radius:6px;font-size:1.5rem"><i class="bi bi-book"></i></div><div class="flex-grow-1"><h6 class="fw-bold mb-1">${b.title}</h6>${b.author?`<small class="text-muted">${b.author}</small><br>`:''}<span class="badge bg-${catColors[b.category]||'secondary'} me-1">${b.category}</span><span class="badge ${b.copies-b.borrowed>0?'bg-success':'bg-danger'}">${b.copies-b.borrowed>0?(b.copies-b.borrowed)+' \u05D6\u05DE\u05D9\u05E0\u05D9\u05DD':'\u05D0\u05D6\u05DC'}</span></div></div><div class="d-flex justify-content-between mt-2 small text-muted"><span>${b.copies} \u05E2\u05D5\u05EA\u05E7\u05D9\u05DD</span><span>${b.borrowed} \u05DE\u05D5\u05E9\u05D0\u05DC\u05D9\u05DD</span></div></div></div>`).join('')}</div>`;
  },
  showAddBook() { Utils.toast('\u05D4\u05D5\u05E1\u05E4\u05EA \u05E1\u05E4\u05E8 - \u05D1\u05E7\u05E8\u05D5\u05D1','info'); }
});
