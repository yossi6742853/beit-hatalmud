Object.assign(Pages, {
  drive() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div><h1><i class="bi bi-cloud-fill me-2"></i>Google Drive</h1><p>קבצים מסונכרנים עם Drive</p></div>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-secondary btn-sm" onclick="Pages.loadDrive()"><i class="bi bi-arrow-clockwise me-1"></i>רענון</button>
        </div>
      </div>
      <div class="card p-3 mb-3"><div class="search-box"><i class="bi bi-search"></i><input class="form-control" id="drive-search" placeholder="חפש קבצים..." onkeydown="if(event.key==='Enter')Pages.searchDrive()"></div></div>
      <div id="drive-list">${Utils.skeleton(4)}</div>`;
  },

  _demoFiles: [
    {id:'1', name:'\u05DE\u05E6\u05D1\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05EA\u05E9\u05E4"\u05D5.xlsx', mimeType:'application/spreadsheet', modifiedTime:'20/04/2026', url:'#'},
    {id:'2', name:'\u05D3\u05D5\u05D7 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D7\u05D5\u05D3\u05E9\u05D9 - \u05D0\u05E4\u05E8\u05D9\u05DC.pdf', mimeType:'application/pdf', modifiedTime:'19/04/2026', url:'#'},
    {id:'3', name:'\u05EA\u05E7\u05E6\u05D9\u05D1 \u05E9\u05E0\u05EA\u05D9 2026.xlsx', mimeType:'application/spreadsheet', modifiedTime:'18/04/2026', url:'#'},
    {id:'4', name:'\u05DE\u05E2\u05E8\u05DB\u05EA \u05E9\u05E2\u05D5\u05EA - \u05E1\u05DE\u05E1\u05D8\u05E8 \u05D1.docx', mimeType:'application/document', modifiedTime:'17/04/2026', url:'#'},
    {id:'5', name:'\u05D0\u05D9\u05E9\u05D5\u05E8\u05D9 \u05D8\u05D9\u05D5\u05DC \u05E9\u05E0\u05EA\u05D9.pdf', mimeType:'application/pdf', modifiedTime:'16/04/2026', url:'#'},
    {id:'6', name:'\u05E8\u05E9\u05D9\u05DE\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05DC\u05E4\u05D9 \u05DB\u05D9\u05EA\u05D4.xlsx', mimeType:'application/spreadsheet', modifiedTime:'15/04/2026', url:'#'},
    {id:'7', name:'\u05EA\u05E7\u05E0\u05D5\u05DF \u05D1\u05D8\u05D9\u05D7\u05D5\u05EA \u05DE\u05E2\u05D5\u05D3\u05DB\u05DF.pdf', mimeType:'application/pdf', modifiedTime:'14/04/2026', url:'#'},
    {id:'8', name:'\u05E6\u05D9\u05DC\u05D5\u05DE\u05D9 \u05D0\u05D9\u05E8\u05D5\u05E2 \u05E1\u05D9\u05D5\u05DD \u05E9\u05E0\u05D4.jpg', mimeType:'image/jpeg', modifiedTime:'13/04/2026', url:'#'},
    {id:'9', name:'\u05D7\u05D5\u05D6\u05D4 \u05D4\u05EA\u05E7\u05E9\u05E8\u05D5\u05EA \u05E2\u05DD \u05D4\u05D5\u05E8\u05D9\u05DD.docx', mimeType:'application/document', modifiedTime:'12/04/2026', url:'#'},
    {id:'10', name:'\u05D3\u05D5\u05D7\u05D5\u05EA \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD - \u05DE\u05D1\u05D7\u05DF \u05D0\u05DE\u05E6\u05E2.xlsx', mimeType:'application/spreadsheet', modifiedTime:'11/04/2026', url:'#'},
    {id:'11', name:'\u05E0\u05D4\u05DC\u05D9 \u05DE\u05D5\u05E1\u05D3 2026.pdf', mimeType:'application/pdf', modifiedTime:'10/04/2026', url:'#'}
  ],

  async driveInit() { this.loadDrive(); },

  _renderDriveGrid(files) {
    const icons = {'spreadsheet':'bi-file-earmark-spreadsheet text-success','document':'bi-file-earmark-text text-primary','pdf':'bi-file-earmark-pdf text-danger','image':'bi-file-earmark-image text-info','folder':'bi-folder-fill text-warning'};
    return `<div class="row g-3">${files.map(f => {
      const type = (f.mimeType||'').includes('spreadsheet')?'spreadsheet':(f.mimeType||'').includes('document')?'document':(f.mimeType||'').includes('pdf')?'pdf':(f.mimeType||'').includes('image')?'image':'folder';
      return `<div class="col-md-4 col-lg-3"><div class="card p-3 card-clickable text-center" onclick="window.open('${f.url||'#'}','_blank')"><i class="bi ${icons[type]||'bi-file-earmark'} fs-1"></i><div class="fw-bold small mt-2 text-truncate">${f.name||''}</div><small class="text-muted">${f.modifiedTime||''}</small></div></div>`;
    }).join('')}</div>`;
  },

  async loadDrive() {
    const list = document.getElementById('drive-list');
    list.innerHTML = '<div class="text-center py-5"><div class="spinner-border"></div></div>';
    try {
      const url = App.API_URL + '?mode=api&action=drive_list&token=' + App.API_TOKEN;
      const resp = await fetch(url);
      const json = await resp.json();
      if (json.data?.length) {
        this._loadedFiles = json.data;
        list.innerHTML = this._renderDriveGrid(json.data);
        return;
      }
    } catch(e) { /* fallback to demo */ }
    // Fallback to demo data
    this._loadedFiles = this._demoFiles;
    list.innerHTML = this._renderDriveGrid(this._demoFiles);
  },

  async searchDrive() {
    const q = document.getElementById('drive-search')?.value?.trim();
    if (!q) { this.loadDrive(); return; }
    const list = document.getElementById('drive-list');
    list.innerHTML = '<div class="text-center py-3"><div class="spinner-border"></div></div>';
    try {
      const url = App.API_URL + '?mode=api&action=drive_search&q=' + encodeURIComponent(q) + '&token=' + App.API_TOKEN;
      const resp = await fetch(url);
      const json = await resp.json();
      if (json.data?.length) {
        list.innerHTML = `<div class="card"><table class="table table-bht mb-0"><thead><tr><th>\u05E9\u05DD</th><th>\u05E1\u05D5\u05D2</th><th>\u05E2\u05D5\u05D3\u05DB\u05DF</th><th>\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA</th></tr></thead><tbody>${json.data.map(f => `<tr><td class="fw-bold">${f.name||''}</td><td class="small">${f.mimeType?.split('.').pop()||''}</td><td class="small text-muted">${f.modifiedTime||''}</td><td><a href="${f.url||'#'}" target="_blank" class="btn btn-sm btn-outline-primary"><i class="bi bi-box-arrow-up-left"></i></a></td></tr>`).join('')}</tbody></table></div>`;
        return;
      }
    } catch(e) { /* fallback to demo filter */ }
    // Filter demo data locally
    const filtered = this._demoFiles.filter(f => (f.name||'').includes(q));
    if (filtered.length) {
      list.innerHTML = this._renderDriveGrid(filtered);
    } else {
      list.innerHTML = '<div class="text-muted text-center py-3">\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05E7\u05D1\u05E6\u05D9\u05DD</div>';
    }
  }
});
