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

  async driveInit() { this.loadDrive(); },

  async loadDrive() {
    const list = document.getElementById('drive-list');
    list.innerHTML = '<div class="text-center py-5"><div class="spinner-border"></div></div>';
    try {
      const url = App.API_URL + '?mode=api&action=drive_list&token=' + App.API_TOKEN;
      const resp = await fetch(url);
      const json = await resp.json();
      if (json.data?.length) {
        list.innerHTML = `<div class="row g-3">${json.data.map(f => {
          const icons = {'spreadsheet':'bi-file-earmark-spreadsheet text-success','document':'bi-file-earmark-text text-primary','pdf':'bi-file-earmark-pdf text-danger','image':'bi-file-earmark-image text-info','folder':'bi-folder-fill text-warning'};
          const type = (f.mimeType||'').includes('spreadsheet')?'spreadsheet':(f.mimeType||'').includes('document')?'document':(f.mimeType||'').includes('pdf')?'pdf':(f.mimeType||'').includes('image')?'image':'folder';
          return `<div class="col-md-4 col-lg-3"><div class="card p-3 card-clickable text-center" onclick="window.open('${f.url||'#'}','_blank')"><i class="bi ${icons[type]||'bi-file-earmark'} fs-1"></i><div class="fw-bold small mt-2 text-truncate">${f.name||''}</div><small class="text-muted">${f.modifiedTime||''}</small></div></div>`;
        }).join('')}</div>`;
      } else {
        list.innerHTML = '<div class="empty-state"><i class="bi bi-cloud"></i><h5>לא נמצאו קבצים</h5><p class="text-muted">בדוק חיבור ל-API</p></div>';
      }
    } catch(e) { list.innerHTML = '<div class="empty-state"><i class="bi bi-wifi-off"></i><h5>לא ניתן להתחבר</h5></div>'; }
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
        list.innerHTML = `<div class="card"><table class="table table-bht mb-0"><thead><tr><th>שם</th><th>סוג</th><th>עודכן</th><th>פעולות</th></tr></thead><tbody>${json.data.map(f => `<tr><td class="fw-bold">${f.name||''}</td><td class="small">${f.mimeType?.split('.').pop()||''}</td><td class="small text-muted">${f.modifiedTime||''}</td><td><a href="${f.url||'#'}" target="_blank" class="btn btn-sm btn-outline-primary"><i class="bi bi-box-arrow-up-left"></i></a></td></tr>`).join('')}</tbody></table></div>`;
      } else { list.innerHTML = '<div class="text-muted text-center py-3">לא נמצאו קבצים</div>'; }
    } catch(e) { list.innerHTML = '<div class="alert alert-danger">שגיאה</div>'; }
  }
});
