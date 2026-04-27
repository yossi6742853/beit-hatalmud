/* ===== BHT v6.0 — Drive / Documents (מנהל קבצים) ===== */
Object.assign(Pages, {

  /* ---- State ---- */
  _driveView: 'grid',
  _driveCurrentFolder: null,
  _driveSearch: '',
  _driveRecentFiles: [],
  _driveUseDemo: false,

  /* ---- Demo Data ---- */
  _driveFolders: [
    { id: 'f1', name: '\u05DE\u05E1\u05DE\u05DB\u05D9\u05DD \u05DE\u05E0\u05D4\u05DC\u05D9\u05D9\u05DD', parent: null, created: '2026-01-15', color: 'primary' },
    { id: 'f2', name: '\u05D3\u05D5\u05D7\u05D5\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD', parent: null, created: '2026-02-01', color: 'success' },
    { id: 'f3', name: '\u05EA\u05E7\u05E6\u05D9\u05D1 \u05D5\u05DB\u05E1\u05E4\u05D9\u05DD', parent: null, created: '2026-03-10', color: 'warning' },
    { id: 'f4', name: '\u05D0\u05D9\u05E9\u05D5\u05E8\u05D9\u05DD \u05D5\u05D8\u05E4\u05E1\u05D9\u05DD', parent: 'f1', created: '2026-01-20', color: 'info' },
    { id: 'f5', name: '\u05D7\u05D5\u05D6\u05E8\u05D9 \u05D4\u05EA\u05E7\u05E9\u05E8\u05D5\u05EA', parent: 'f1', created: '2026-02-10', color: 'danger' },
  ],

  _demoFiles: [

    { id: '1',  name: '\u05DE\u05E6\u05D1\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05EA\u05E9\u05E4"\u05D5.xlsx', mimeType: 'application/spreadsheet', modifiedTime: '20/04/2026', size: 245760,  folder: 'f2', url: '#' },
    { id: '2',  name: '\u05D3\u05D5\u05D7 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D7\u05D5\u05D3\u05E9\u05D9 - \u05D0\u05E4\u05E8\u05D9\u05DC.pdf', mimeType: 'application/pdf', modifiedTime: '19/04/2026', size: 524288,  folder: 'f2', url: '#' },
    { id: '3',  name: '\u05EA\u05E7\u05E6\u05D9\u05D1 \u05E9\u05E0\u05EA\u05D9 2026.xlsx', mimeType: 'application/spreadsheet', modifiedTime: '18/04/2026', size: 389120,  folder: 'f3', url: '#' }
  ],

  _driveStorageUsed: 7165952,   // ~6.8 MB demo
  _driveStorageTotal: 15728640, // 15 MB demo

  /* ---- Page HTML ---- */
  drive() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
        <div>
          <h1 class="mb-1"><i class="bi bi-folder2-open me-2"></i>\u05DE\u05E0\u05D4\u05DC \u05E7\u05D1\u05E6\u05D9\u05DD</h1>
          <p class="text-muted mb-0">\u05E0\u05D9\u05D4\u05D5\u05DC \u05DE\u05E1\u05DE\u05DB\u05D9\u05DD \u05D5\u05EA\u05D9\u05E7\u05D9\u05D5\u05EA \u05D4\u05DE\u05D5\u05E1\u05D3</p>
        </div>
        <div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-primary btn-sm" onclick="Pages.showNewFolderModal()"><i class="bi bi-folder-plus me-1"></i>\u05EA\u05D9\u05E7\u05D9\u05D4 \u05D7\u05D3\u05E9\u05D4</button>
          <button class="btn btn-success btn-sm" onclick="document.getElementById('drive-file-input').click()"><i class="bi bi-cloud-arrow-up me-1"></i>\u05D4\u05E2\u05DC\u05D0\u05EA \u05E7\u05D1\u05E6\u05D9\u05DD</button>
          <input type="file" id="drive-file-input" class="d-none" multiple onchange="Pages.handleFileUpload(this.files)">
          <button class="btn btn-outline-secondary btn-sm" onclick="Pages.loadDrive()"><i class="bi bi-arrow-clockwise me-1"></i>\u05E8\u05E2\u05E0\u05D5\u05DF</button>
        </div>
      </div>

      <!-- Tabs -->
      <ul class="nav nav-tabs mb-3" role="tablist">
        <li class="nav-item"><a class="nav-link active" id="drive-tab-files" data-bs-toggle="tab" href="#drive-pane-files" role="tab" onclick="Pages._driveActiveTab='files'"><i class="bi bi-folder2-open me-1"></i>\u05DE\u05E0\u05D4\u05DC \u05E7\u05D1\u05E6\u05D9\u05DD</a></li>
        <li class="nav-item"><a class="nav-link" id="drive-tab-zdrive" data-bs-toggle="tab" href="#drive-pane-zdrive" role="tab" onclick="Pages._driveActiveTab='zdrive';Pages._zDriveRender()"><i class="bi bi-hdd-network me-1"></i>\u05DB\u05D5\u05E0\u05DF Z</a></li>
      </ul>
      <div class="tab-content">
      <div class="tab-pane fade show active" id="drive-pane-files" role="tabpanel">

      <!-- Stats Row -->
      <div class="row g-3 mb-3">
        <div class="col-6 col-md-3">
          <div class="card p-3 text-center">
            <div class="fs-4 fw-bold text-primary" id="drive-stat-files">0</div>
            <small class="text-muted">\u05E7\u05D1\u05E6\u05D9\u05DD</small>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card p-3 text-center">
            <div class="fs-4 fw-bold text-success" id="drive-stat-folders">0</div>
            <small class="text-muted">\u05EA\u05D9\u05E7\u05D9\u05D5\u05EA</small>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card p-3 text-center">
            <div class="fs-4 fw-bold text-warning" id="drive-stat-recent">0</div>
            <small class="text-muted">\u05D0\u05D7\u05E8\u05D5\u05E0\u05D9\u05DD</small>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card p-3">
            <div class="d-flex justify-content-between small mb-1">
              <span class="text-muted">\u05D0\u05D7\u05E1\u05D5\u05DF</span>
              <span class="fw-bold" id="drive-storage-label">0 / 0</span>
            </div>
            <div class="progress" style="height:8px">
              <div class="progress-bar bg-info" id="drive-storage-bar" style="width:0%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Search & View Toggle -->
      <div class="card p-3 mb-3">
        <div class="row g-2 align-items-center">
          <div class="col-md-6">
            <div class="search-box">
              <i class="bi bi-search"></i>
              <input type="text" class="form-control" id="drive-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05E7\u05D1\u05E6\u05D9\u05DD \u05DC\u05E4\u05D9 \u05E9\u05DD..." oninput="Pages.filterDriveFiles()">
            </div>
          </div>
          <div class="col-md-3">
            <select class="form-select" id="drive-type-filter" onchange="Pages.filterDriveFiles()">
              <option value="">\u05DB\u05DC \u05D4\u05E1\u05D5\u05D2\u05D9\u05DD</option>
              <option value="pdf">PDF</option>
              <option value="spreadsheet">Excel</option>
              <option value="document">Word</option>
              <option value="image">\u05EA\u05DE\u05D5\u05E0\u05D5\u05EA</option>
            </select>
          </div>
          <div class="col-md-3 text-end">
            <div class="btn-group" role="group">
              <button class="btn btn-outline-secondary btn-sm active" id="drive-view-grid" onclick="Pages._driveView='grid';Pages.renderDriveContent()" title="\u05EA\u05E6\u05D5\u05D2\u05EA \u05E8\u05E9\u05EA">
                <i class="bi bi-grid-3x3-gap-fill"></i>
              </button>
              <button class="btn btn-outline-secondary btn-sm" id="drive-view-list" onclick="Pages._driveView='list';Pages.renderDriveContent()" title="\u05EA\u05E6\u05D5\u05D2\u05EA \u05E8\u05E9\u05D9\u05DE\u05D4">
                <i class="bi bi-list-ul"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Breadcrumbs -->
      <nav id="drive-breadcrumb" class="mb-3" style="display:none">
        <ol class="breadcrumb mb-0 bg-light rounded p-2 px-3"></ol>
      </nav>

      <!-- Drop Zone -->
      <div id="drive-dropzone" class="border border-2 border-dashed rounded-3 text-center p-4 mb-3" style="display:none;border-color:var(--bs-primary)!important;background:rgba(var(--bs-primary-rgb),.04)">
        <i class="bi bi-cloud-arrow-up fs-1 text-primary"></i>
        <p class="mt-2 mb-0 fw-semibold">\u05D2\u05E8\u05D5\u05E8 \u05E7\u05D1\u05E6\u05D9\u05DD \u05DC\u05DB\u05D0\u05DF \u05DC\u05D4\u05E2\u05DC\u05D0\u05D4</p>
        <small class="text-muted">\u05EA\u05DE\u05D9\u05DB\u05D4 \u05D1\u05DB\u05DC \u05E1\u05D5\u05D2\u05D9 \u05D4\u05E7\u05D1\u05E6\u05D9\u05DD</small>
      </div>

      <!-- Upload Progress -->
      <div id="drive-upload-progress" class="mb-3" style="display:none">
        <div class="card p-3">
          <div class="d-flex align-items-center gap-3">
            <div class="spinner-border spinner-border-sm text-primary"></div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between small mb-1">
                <span id="drive-upload-name">\u05DE\u05E2\u05DC\u05D4...</span>
                <span id="drive-upload-pct">0%</span>
              </div>
              <div class="progress" style="height:6px">
                <div class="progress-bar progress-bar-striped progress-bar-animated" id="drive-upload-bar" style="width:0%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Files -->
      <div id="drive-recent-section" class="mb-3" style="display:none">
        <h6 class="fw-bold mb-2"><i class="bi bi-clock-history me-1 text-muted"></i>\u05E7\u05D1\u05E6\u05D9\u05DD \u05D0\u05D7\u05E8\u05D5\u05E0\u05D9\u05DD</h6>
        <div id="drive-recent-list" class="d-flex gap-2 overflow-auto pb-2"></div>
      </div>

      <!-- Content Area -->
      <div id="drive-list">${Utils.skeleton(4)}</div>

      </div><!-- /tab-pane files -->

      <!-- Z Drive Tab -->
      <div class="tab-pane fade" id="drive-pane-zdrive" role="tabpanel">
        <div class="card p-3 mb-3">
          <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div>
              <h5 class="mb-1"><i class="bi bi-hdd-network me-1 text-info"></i>\u05DB\u05D5\u05E0\u05DF \u05E9\u05D9\u05EA\u05D5\u05E3 (Z:)</h5>
              <small class="text-muted">\\\\192.168.1.155 \u2014 \u05DC\u05D7\u05D9\u05E6\u05D4 \u05E2\u05DC \u05E7\u05D5\u05D1\u05E5 \u05E4\u05D5\u05EA\u05D7\u05EA \u05D0\u05D5\u05EA\u05D5 \u05D1\u05D7\u05DC\u05D5\u05DF</small>
            </div>
            <div class="d-flex gap-2">
              <div class="search-box" style="max-width:250px">
                <i class="bi bi-search"></i>
                <input type="text" class="form-control form-control-sm" id="zdrive-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05E7\u05D1\u05E6\u05D9\u05DD..." oninput="Pages._zDriveFilter()">
              </div>
              <button class="btn btn-outline-secondary btn-sm" onclick="Pages._zDriveLoadCatalog()" title="\u05E8\u05E2\u05E0\u05D5\u05DF \u05E7\u05D8\u05DC\u05D5\u05D2"><i class="bi bi-arrow-clockwise"></i></button>
            </div>
          </div>
        </div>

        <!-- Z Drive breadcrumb -->
        <nav id="zdrive-breadcrumb" class="mb-3" style="display:none">
          <ol class="breadcrumb mb-0 bg-light rounded p-2 px-3"></ol>
        </nav>

        <!-- Folder Summary -->
        <div class="row g-3 mb-3" id="zdrive-summary">
          <div class="col-md-4">
            <div class="card p-3 card-clickable h-100" onclick="Pages._zDriveNavigate('\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD')">
              <div class="d-flex align-items-center gap-3">
                <div class="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center" style="width:48px;height:48px">
                  <i class="bi bi-person-badge text-success fs-4"></i>
                </div>
                <div>
                  <h6 class="fw-bold mb-0">\u05EA\u05D9\u05E7\u05D9 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD</h6>
                  <small class="text-muted">\u05E8\u05E9\u05D9\u05DE\u05D5\u05EA, \u05D3\u05D5\u05D7\u05D5\u05EA, \u05EA\u05DE\u05D5\u05E0\u05D5\u05EA</small>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card p-3 card-clickable h-100" onclick="Pages._zDriveNavigate('\u05DE\u05E0\u05D4\u05DC\u05D4')">
              <div class="d-flex align-items-center gap-3">
                <div class="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center" style="width:48px;height:48px">
                  <i class="bi bi-file-earmark-text text-primary fs-4"></i>
                </div>
                <div>
                  <h6 class="fw-bold mb-0">\u05DE\u05E1\u05DE\u05DB\u05D9 \u05E6\u05D5\u05D5\u05EA</h6>
                  <small class="text-muted">\u05E0\u05D4\u05DC\u05D9\u05DD, \u05EA\u05E7\u05E0\u05D5\u05DF, \u05D7\u05D5\u05D6\u05E8\u05D9\u05DD</small>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card p-3 card-clickable h-100" onclick="Pages._zDrivePath=['\u05DE\u05E0\u05D4\u05DC\u05D4','\u05D8\u05E4\u05E1\u05D9\u05DD'];Pages._zDriveRender()">
              <div class="d-flex align-items-center gap-3">
                <div class="rounded-circle bg-warning bg-opacity-10 d-flex align-items-center justify-content-center" style="width:48px;height:48px">
                  <i class="bi bi-clipboard-check text-warning fs-4"></i>
                </div>
                <div>
                  <h6 class="fw-bold mb-0">\u05D8\u05E4\u05E1\u05D9\u05DD</h6>
                  <small class="text-muted">\u05D0\u05D9\u05E9\u05D5\u05E8\u05D9\u05DD, \u05D4\u05E8\u05E9\u05DE\u05D5\u05EA, \u05D8\u05E4\u05E1\u05D9 \u05D4\u05D5\u05E8\u05D9\u05DD</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="zdrive-content">${Utils.skeleton(3)}</div>
      </div><!-- /tab-pane zdrive -->

      </div><!-- /tab-content -->

      <!-- New Folder Modal -->
      <div class="modal fade" id="drive-folder-modal" tabindex="-1"><div class="modal-dialog modal-sm"><div class="modal-content">
        <div class="modal-header"><h5 class="modal-title"><i class="bi bi-folder-plus me-2"></i>\u05EA\u05D9\u05E7\u05D9\u05D4 \u05D7\u05D3\u05E9\u05D4</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body">
          <div class="mb-3"><label class="form-label">\u05E9\u05DD \u05D4\u05EA\u05D9\u05E7\u05D9\u05D4</label><input type="text" class="form-control" id="drive-new-folder-name" placeholder="\u05EA\u05D9\u05E7\u05D9\u05D4 \u05D7\u05D3\u05E9\u05D4"></div>
        </div>
        <div class="modal-footer"><button class="btn btn-secondary btn-sm" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary btn-sm" onclick="Pages.createFolder()">\u05E6\u05D5\u05E8</button></div>
      </div></div></div>

      <!-- Rename Modal -->
      <div class="modal fade" id="drive-rename-modal" tabindex="-1"><div class="modal-dialog modal-sm"><div class="modal-content">
        <div class="modal-header"><h5 class="modal-title"><i class="bi bi-pencil me-2"></i>\u05E9\u05D9\u05E0\u05D5\u05D9 \u05E9\u05DD</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body">
          <input type="hidden" id="drive-rename-id">
          <input type="hidden" id="drive-rename-type">
          <div class="mb-3"><label class="form-label">\u05E9\u05DD \u05D7\u05D3\u05E9</label><input type="text" class="form-control" id="drive-rename-value"></div>
        </div>
        <div class="modal-footer"><button class="btn btn-secondary btn-sm" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-primary btn-sm" onclick="Pages.renameItem()">\u05E9\u05DE\u05D5\u05E8</button></div>
      </div></div></div>

      <!-- Move Modal -->
      <div class="modal fade" id="drive-move-modal" tabindex="-1"><div class="modal-dialog modal-sm"><div class="modal-content">
        <div class="modal-header"><h5 class="modal-title"><i class="bi bi-folder-symlink me-2"></i>\u05D4\u05E2\u05D1\u05E8 \u05DC\u05EA\u05D9\u05E7\u05D9\u05D4</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body">
          <input type="hidden" id="drive-move-file-id">
          <div id="drive-move-folder-list"></div>
        </div>
        <div class="modal-footer"><button class="btn btn-secondary btn-sm" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button></div>
      </div></div></div>`;
  },

  /* ---- Init ---- */
  driveLoadDemo() {
    this._driveUseDemo = true;
    this.loadDrive();
  },

  async driveInit() {
    this._driveCurrentFolder = null;
    this._driveSearch = '';
    this._driveView = 'grid';
    this.loadDrive();
    this._initDragDrop();
  },

  /* ---- Drag-Drop Setup ---- */
  _initDragDrop() {
    // Remove previous listeners to prevent leaks on re-init
    if (this._driveDragEnter) {
      document.body.removeEventListener('dragenter', this._driveDragEnter);
      document.body.removeEventListener('dragleave', this._driveDragLeave);
      document.body.removeEventListener('dragover', this._driveDragOver);
      document.body.removeEventListener('drop', this._driveDrop);
    }
    const zone = document.getElementById('drive-dropzone');
    let dragCounter = 0;

    this._driveDragEnter = e => {
      e.preventDefault();
      dragCounter++;
      if (zone) zone.style.display = 'block';
    };
    this._driveDragLeave = e => {
      e.preventDefault();
      dragCounter--;
      if (dragCounter <= 0) { dragCounter = 0; if (zone) zone.style.display = 'none'; }
    };
    this._driveDragOver = e => e.preventDefault();
    this._driveDrop = e => {
      e.preventDefault();
      dragCounter = 0;
      if (zone) zone.style.display = 'none';
      if (e.dataTransfer?.files?.length) this.handleFileUpload(e.dataTransfer.files);
    };
    document.body.addEventListener('dragenter', this._driveDragEnter);
    document.body.addEventListener('dragleave', this._driveDragLeave);
    document.body.addEventListener('dragover', this._driveDragOver);
    document.body.addEventListener('drop', this._driveDrop);
  },

  /* ---- File Type Helpers ---- */
  _driveFileType(mime) {
    if (!mime) return 'other';
    if (mime.includes('spreadsheet') || mime.includes('excel') || mime.includes('xlsx')) return 'spreadsheet';
    if (mime.includes('document') || mime.includes('word') || mime.includes('docx')) return 'document';
    if (mime.includes('pdf')) return 'pdf';
    if (mime.includes('image')) return 'image';
    if (mime.includes('presentation') || mime.includes('pptx')) return 'presentation';
    return 'other';
  },

  _driveIcon(type) {
    const map = {
      spreadsheet: 'bi-file-earmark-spreadsheet text-success',
      document: 'bi-file-earmark-word text-primary',
      pdf: 'bi-file-earmark-pdf text-danger',
      image: 'bi-file-earmark-image text-info',
      presentation: 'bi-file-earmark-slides text-orange',
      other: 'bi-file-earmark text-secondary',
      folder: 'bi-folder-fill text-warning'
    };
    return map[type] || map.other;
  },

  _driveTypeLabel(type) {
    const map = { spreadsheet: 'Excel', document: 'Word', pdf: 'PDF', image: '\u05EA\u05DE\u05D5\u05E0\u05D4', presentation: '\u05DE\u05E6\u05D2\u05EA', other: '\u05E7\u05D5\u05D1\u05E5' };
    return map[type] || map.other;
  },

  _formatSize(bytes) {
    if (!bytes || bytes === 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(i > 0 ? 1 : 0) + ' ' + units[i];
  },

  /* ---- Load & Render ---- */
  async loadDrive() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    const list = document.getElementById('drive-list');
    if (list) list.innerHTML = '<div class="text-center py-5"><div class="spinner-border"></div></div>';

    // Load from DRIVE_CATALOG first (static student documents from Google Drive)
    try {
      if (typeof DRIVE_CATALOG !== 'undefined' && DRIVE_CATALOG.folders && DRIVE_CATALOG.folders.length) {
        // Build folders from DRIVE_CATALOG
        this._driveFolders = DRIVE_CATALOG.folders.map((f, i) => ({
          id: f.folderId || 'df' + i,
          name: f.name,
          parent: null,
          created: DRIVE_CATALOG.lastUpdated || '',
          color: ['primary','success','warning','info','danger'][i % 5],
          link: f.folderLink || ''
        }));
        // Flatten all docs from all folders
        this._loadedFiles = [];
        DRIVE_CATALOG.folders.forEach(f => {
          (f.docs || []).forEach(doc => {
            this._loadedFiles.push({
              id: doc.id || 'd' + Math.random().toString(36).slice(2,8),
              name: doc.name,
              mimeType: doc.type === 'pdf' ? 'application/pdf' : doc.type === 'doc' ? 'application/document' : doc.type === 'sheet' ? 'application/spreadsheet' : doc.type === 'image' ? 'image/jpeg' : 'application/octet-stream',
              modifiedTime: DRIVE_CATALOG.lastUpdated || '',
              size: 0,
              folder: f.folderId || null,
              url: doc.link || '#'
            });
          });
        });
        this._driveStorageUsed = 0;
        this._updateStats();
        this._updateRecent();
        this.renderDriveContent();
        return;
      }
    } catch (e) { /* fallback */ }

    try {
      const apiData = _gc('\u05E7\u05D1\u05E6\u05D9\u05DD_\u05DE\u05E6\u05D5\u05E8\u05E4\u05D9\u05DD');
      if (apiData && apiData.length) {
        this._loadedFiles = apiData.map((row, i) => ({
          id: row._id || row.id || String(i + 1),
          name: row['\u05E9\u05DD'] || row.name || '',
          mimeType: row['\u05E1\u05D5\u05D2'] || row.mimeType || 'application/octet-stream',
          modifiedTime: row['\u05EA\u05D0\u05E8\u05D9\u05DA'] || row.modifiedTime || '',
          size: parseInt(row['\u05D2\u05D5\u05D3\u05DC'] || row.size) || 0,
          folder: row['\u05EA\u05D9\u05E7\u05D9\u05D4'] || row.folder || null,
          url: row['\u05E7\u05D9\u05E9\u05D5\u05E8'] || row.url || '#'
        }));
        this._driveStorageUsed = this._loadedFiles.reduce((s, f) => s + (f.size || 0), 0);
        this._updateStats();
        this._updateRecent();
        this.renderDriveContent();
        return;
      }
    } catch (e) { /* fallback to demo */ }

    try {
      const url = App.API_URL + '?mode=api&action=drive_list&token=' + App.API_TOKEN;
      const resp = await fetch(url);
      const json = await resp.json();
      if (json.data?.length) {
        this._loadedFiles = json.data;
        this._updateStats();
        this.renderDriveContent();
        return;
      }
    } catch (e) { /* fallback to demo */ }

    if (this._driveUseDemo) {
      this._loadedFiles = this._demoFiles;
    } else {
      this._loadedFiles = [];
    }
    this._updateStats();
    this._updateRecent();
    this.renderDriveContent();
  },

  _updateStats() {
    const files = this._loadedFiles || [];
    const folders = this._driveFolders || [];
    const el = id => document.getElementById(id);

    const totalFiles = files.length;
    const totalFolders = folders.length;
    const recentCount = files.filter(f => {
      const parts = (f.modifiedTime || '').split('/');
      if (parts.length === 3) {
        const d = new Date(parts[2], parts[1] - 1, parts[0]);
        return (Date.now() - d.getTime()) < 7 * 86400000;
      }
      return false;
    }).length;

    if (el('drive-stat-files')) el('drive-stat-files').textContent = totalFiles;
    if (el('drive-stat-folders')) el('drive-stat-folders').textContent = totalFolders;
    if (el('drive-stat-recent')) el('drive-stat-recent').textContent = recentCount;

    const used = this._driveStorageUsed;
    const total = this._driveStorageTotal;
    const pct = total > 0 ? Math.round((used / total) * 100) : 0;
    if (el('drive-storage-label')) el('drive-storage-label').textContent = this._formatSize(used) + ' / ' + this._formatSize(total);
    if (el('drive-storage-bar')) {
      el('drive-storage-bar').style.width = pct + '%';
      el('drive-storage-bar').className = 'progress-bar ' + (pct > 85 ? 'bg-danger' : pct > 60 ? 'bg-warning' : 'bg-info');
    }
  },

  /* ---- Recent Files ---- */
  _updateRecent() {
    const section = document.getElementById('drive-recent-section');
    const container = document.getElementById('drive-recent-list');
    if (!section || !container) return;

    const recent = (this._driveRecentFiles || []).slice(0, 5);
    if (!recent.length) {
      // Show 4 most recently modified files
      const sorted = [...(this._loadedFiles || [])].sort((a, b) => {
        const da = (a.modifiedTime || '').split('/').reverse().join('');
        const db = (b.modifiedTime || '').split('/').reverse().join('');
        return db.localeCompare(da);
      });
      recent.push(...sorted.slice(0, 4));
    }

    if (!recent.length) { section.style.display = 'none'; return; }

    section.style.display = 'block';
    container.innerHTML = recent.map(f => {
      const type = this._driveFileType(f.mimeType);
      const icon = this._driveIcon(type);
      return `<div class="card p-2 px-3 flex-shrink-0 card-clickable" style="min-width:160px" onclick="Pages._openDriveFile('${f.id}')">
        <div class="d-flex align-items-center gap-2">
          <i class="bi ${icon} fs-5"></i>
          <div class="text-truncate small fw-semibold" style="max-width:120px">${f.name || ''}</div>
        </div>
        <small class="text-muted">${f.modifiedTime || ''}</small>
      </div>`;
    }).join('');
  },

  /* ---- Breadcrumb ---- */
  _renderBreadcrumb() {
    const nav = document.getElementById('drive-breadcrumb');
    if (!nav) return;
    const ol = nav.querySelector('ol');

    if (!this._driveCurrentFolder) {
      nav.style.display = 'none';
      return;
    }

    nav.style.display = 'block';
    const path = this._getFolderPath(this._driveCurrentFolder);
    ol.innerHTML = `<li class="breadcrumb-item"><a href="#" onclick="Pages.navigateFolder(null);return false"><i class="bi bi-house-door me-1"></i>\u05E8\u05D0\u05E9\u05D9</a></li>` +
      path.map((f, i) => {
        const isLast = i === path.length - 1;
        return isLast
          ? `<li class="breadcrumb-item active">${f.name}</li>`
          : `<li class="breadcrumb-item"><a href="#" onclick="Pages.navigateFolder('${f.id}');return false">${f.name}</a></li>`;
      }).join('');
  },

  _getFolderPath(folderId) {
    const path = [];
    let current = folderId;
    while (current) {
      const folder = this._driveFolders.find(f => f.id === current);
      if (!folder) break;
      path.unshift(folder);
      current = folder.parent;
    }
    return path;
  },

  navigateFolder(folderId) {
    this._driveCurrentFolder = folderId;
    this.renderDriveContent();
  },

  /* ---- Filter ---- */
  filterDriveFiles() {
    this._driveSearch = (document.getElementById('drive-search')?.value || '').trim();
    this.renderDriveContent();
  },

  _getFilteredItems() {
    const search = this._driveSearch.toLowerCase();
    const typeFilter = document.getElementById('drive-type-filter')?.value || '';
    const currentFolder = this._driveCurrentFolder;

    // Folders in current directory
    let folders = this._driveFolders.filter(f => f.parent === currentFolder);
    // Files in current directory (or all if searching)
    let files = (this._loadedFiles || []);

    if (search) {
      // Search across all folders
      files = files.filter(f => (f.name || '').toLowerCase().includes(search));
      folders = this._driveFolders.filter(f => (f.name || '').toLowerCase().includes(search));
    } else {
      files = files.filter(f => (f.folder || null) === currentFolder);
    }

    if (typeFilter) {
      files = files.filter(f => this._driveFileType(f.mimeType) === typeFilter);
    }

    return { folders, files };
  },

  /* ---- Render Content ---- */
  renderDriveContent() {
    const container = document.getElementById('drive-list');
    if (!container) return;

    // Update view toggle buttons
    const gridBtn = document.getElementById('drive-view-grid');
    const listBtn = document.getElementById('drive-view-list');
    if (gridBtn) gridBtn.classList.toggle('active', this._driveView === 'grid');
    if (listBtn) listBtn.classList.toggle('active', this._driveView === 'list');

    this._renderBreadcrumb();
    this._updateRecent();

    const { folders, files } = this._getFilteredItems();

    if (!folders.length && !files.length) {
      container.innerHTML = `<div class="text-center py-5 text-muted">
        <i class="bi bi-folder2-open fs-1 d-block mb-2"></i>
        ${this._driveSearch ? '\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05E7\u05D1\u05E6\u05D9\u05DD \u05EA\u05D5\u05D0\u05DE\u05D9\u05DD' : '\u05D4\u05EA\u05D9\u05E7\u05D9\u05D4 \u05E8\u05D9\u05E7\u05D4'}
      </div>`;
      return;
    }

    if (this._driveView === 'grid') {
      container.innerHTML = this._renderGridView(folders, files);
    } else {
      container.innerHTML = this._renderListView(folders, files);
    }
  },

  /* ---- Grid View ---- */
  _renderGridView(folders, files) {
    let html = '<div class="row g-3">';

    // Folders
    folders.forEach(f => {
      const subCount = this._driveFolders.filter(sf => sf.parent === f.id).length;
      const fileCount = (this._loadedFiles || []).filter(fi => fi.folder === f.id).length;
      html += `<div class="col-6 col-md-4 col-lg-3">
        <div class="card p-3 card-clickable h-100" ondblclick="Pages.navigateFolder('${f.id}')">
          <div class="text-center mb-2">
            <i class="bi bi-folder-fill fs-1 text-${f.color || 'warning'}"></i>
          </div>
          <div class="fw-bold small text-center text-truncate">${f.name}</div>
          <small class="text-muted text-center d-block">${fileCount} \u05E7\u05D1\u05E6\u05D9\u05DD${subCount ? ' | ' + subCount + ' \u05EA\u05D9\u05E7\u05D9\u05D5\u05EA' : ''}</small>
          <div class="mt-2 text-center">
            <div class="btn-group btn-group-sm">
              <button class="btn btn-outline-secondary btn-sm" onclick="event.stopPropagation();Pages.showRenameModal('${f.id}','folder','${f.name}')" title="\u05E9\u05E0\u05D4 \u05E9\u05DD"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-outline-danger btn-sm" onclick="event.stopPropagation();Pages.deleteFolder('${f.id}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button>
            </div>
          </div>
        </div>
      </div>`;
    });

    // Files
    files.forEach(f => {
      const type = this._driveFileType(f.mimeType);
      const icon = this._driveIcon(type);
      html += `<div class="col-6 col-md-4 col-lg-3">
        <div class="card p-3 card-clickable h-100" onclick="Pages._openDriveFile('${f.id}')">
          <div class="text-center mb-2">
            <i class="bi ${icon} fs-1"></i>
          </div>
          <div class="fw-bold small text-center text-truncate" title="${f.name || ''}">${f.name || ''}</div>
          <div class="text-center">
            <small class="text-muted">${this._driveTypeLabel(type)}</small>
            <small class="text-muted mx-1">|</small>
            <small class="text-muted">${this._formatSize(f.size)}</small>
          </div>
          <small class="text-muted text-center d-block">${f.modifiedTime || ''}</small>
          <div class="mt-2 text-center">
            <div class="btn-group btn-group-sm">
              <button class="btn btn-outline-primary btn-sm" onclick="event.stopPropagation();Pages._downloadFile('${f.id}')" title="\u05D4\u05D5\u05E8\u05D3"><i class="bi bi-download"></i></button>
              <button class="btn btn-outline-secondary btn-sm" onclick="event.stopPropagation();Pages.showRenameModal('${f.id}','file','${(f.name || '').replace(/'/g, "\\'")}')" title="\u05E9\u05E0\u05D4 \u05E9\u05DD"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-outline-info btn-sm" onclick="event.stopPropagation();Pages.showMoveModal('${f.id}')" title="\u05D4\u05E2\u05D1\u05E8"><i class="bi bi-folder-symlink"></i></button>
              <button class="btn btn-outline-success btn-sm" onclick="event.stopPropagation();Pages._shareFile('${f.id}')" title="\u05E9\u05EA\u05E3 \u05E7\u05D9\u05E9\u05D5\u05E8"><i class="bi bi-share"></i></button>
              <button class="btn btn-outline-danger btn-sm" onclick="event.stopPropagation();Pages.deleteFile('${f.id}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button>
            </div>
          </div>
        </div>
      </div>`;
    });

    html += '</div>';
    return html;
  },

  /* ---- List View ---- */
  _renderListView(folders, files) {
    let html = `<div class="card"><table class="table table-hover mb-0 align-middle">
      <thead><tr>
        <th style="width:40px"></th>
        <th>\u05E9\u05DD</th>
        <th class="d-none d-md-table-cell">\u05E1\u05D5\u05D2</th>
        <th class="d-none d-md-table-cell">\u05D2\u05D5\u05D3\u05DC</th>
        <th class="d-none d-md-table-cell">\u05E2\u05D5\u05D3\u05DB\u05DF</th>
        <th style="width:180px">\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA</th>
      </tr></thead><tbody>`;

    // Folders
    folders.forEach(f => {
      const fileCount = (this._loadedFiles || []).filter(fi => fi.folder === f.id).length;
      html += `<tr class="cursor-pointer" ondblclick="Pages.navigateFolder('${f.id}')">
        <td><i class="bi bi-folder-fill text-${f.color || 'warning'} fs-5"></i></td>
        <td class="fw-bold">${f.name}</td>
        <td class="d-none d-md-table-cell text-muted small">\u05EA\u05D9\u05E7\u05D9\u05D4</td>
        <td class="d-none d-md-table-cell text-muted small">${fileCount} \u05E7\u05D1\u05E6\u05D9\u05DD</td>
        <td class="d-none d-md-table-cell text-muted small">${f.created || ''}</td>
        <td>
          <div class="btn-group btn-group-sm">
            <button class="btn btn-outline-secondary btn-sm" onclick="Pages.showRenameModal('${f.id}','folder','${f.name}')" title="\u05E9\u05E0\u05D4 \u05E9\u05DD"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-outline-danger btn-sm" onclick="Pages.deleteFolder('${f.id}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button>
          </div>
        </td>
      </tr>`;
    });

    // Files
    files.forEach(f => {
      const type = this._driveFileType(f.mimeType);
      const icon = this._driveIcon(type);
      html += `<tr class="cursor-pointer" onclick="Pages._openDriveFile('${f.id}')">
        <td><i class="bi ${icon} fs-5"></i></td>
        <td class="fw-bold">${f.name || ''}</td>
        <td class="d-none d-md-table-cell text-muted small">${this._driveTypeLabel(type)}</td>
        <td class="d-none d-md-table-cell text-muted small">${this._formatSize(f.size)}</td>
        <td class="d-none d-md-table-cell text-muted small">${f.modifiedTime || ''}</td>
        <td>
          <div class="btn-group btn-group-sm">
            <button class="btn btn-outline-primary btn-sm" onclick="event.stopPropagation();Pages._downloadFile('${f.id}')" title="\u05D4\u05D5\u05E8\u05D3"><i class="bi bi-download"></i></button>
            <button class="btn btn-outline-secondary btn-sm" onclick="event.stopPropagation();Pages.showRenameModal('${f.id}','file','${(f.name || '').replace(/'/g, "\\'")}')" title="\u05E9\u05E0\u05D4 \u05E9\u05DD"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-outline-info btn-sm" onclick="event.stopPropagation();Pages.showMoveModal('${f.id}')" title="\u05D4\u05E2\u05D1\u05E8"><i class="bi bi-folder-symlink"></i></button>
            <button class="btn btn-outline-success btn-sm" onclick="event.stopPropagation();Pages._shareFile('${f.id}')" title="\u05E9\u05EA\u05E3 \u05E7\u05D9\u05E9\u05D5\u05E8"><i class="bi bi-share"></i></button>
            <button class="btn btn-outline-danger btn-sm" onclick="event.stopPropagation();Pages.deleteFile('${f.id}')" title="\u05DE\u05D7\u05E7"><i class="bi bi-trash"></i></button>
          </div>
        </td>
      </tr>`;
    });

    html += '</tbody></table></div>';
    return html;
  },

  /* ---- File Actions ---- */
  _openDriveFile(fileId) {
    const file = (this._loadedFiles || []).find(f => f.id === fileId);
    if (!file) return;

    // Track in recent
    this._driveRecentFiles = [file, ...(this._driveRecentFiles || []).filter(f => f.id !== fileId)].slice(0, 10);

    if (file.url && file.url !== '#') {
      window.open(file.url, '_blank');
    } else {
      Utils.toast('\u05EA\u05E6\u05D5\u05D2\u05D4 \u05DE\u05E7\u05D3\u05D9\u05DE\u05D4 \u05E9\u05DC ' + (file.name || '\u05E7\u05D5\u05D1\u05E5'), 'info');
    }
    this._updateRecent();
  },

  _downloadFile(fileId) {
    const file = (this._loadedFiles || []).find(f => f.id === fileId);
    if (!file) return;
    if (file.url && file.url !== '#') {
      const a = document.createElement('a');
      a.href = file.url;
      a.download = file.name || 'download';
      a.click();
    } else {
      Utils.toast('\u05D4\u05D5\u05E8\u05D3\u05EA ' + (file.name || '\u05E7\u05D5\u05D1\u05E5'), 'success');
    }
  },

  _shareFile(fileId) {
    const file = (this._loadedFiles || []).find(f => f.id === fileId);
    if (!file) return;
    const shareUrl = file.url && file.url !== '#' ? file.url : window.location.href + '?file=' + fileId;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        Utils.toast('\u05E7\u05D9\u05E9\u05D5\u05E8 \u05D4\u05D5\u05E2\u05EA\u05E7 \u05DC\u05DC\u05D5\u05D7', 'success');
      });
    } else {
      Utils.toast('\u05E7\u05D9\u05E9\u05D5\u05E8: ' + shareUrl, 'info');
    }
  },

  /* ---- Folder Management ---- */
  showNewFolderModal() {
    document.getElementById('drive-new-folder-name').value = '';
    new bootstrap.Modal(document.getElementById('drive-folder-modal')).show();
  },

  createFolder() {
    const name = document.getElementById('drive-new-folder-name')?.value?.trim();
    if (!name) { Utils.toast('\u05E0\u05D0 \u05DC\u05D4\u05D6\u05D9\u05DF \u05E9\u05DD \u05EA\u05D9\u05E7\u05D9\u05D4', 'warning'); return; }

    const colors = ['primary', 'success', 'warning', 'info', 'danger', 'secondary'];
    const newFolder = {
      id: 'f' + Date.now(),
      name,
      parent: this._driveCurrentFolder || null,
      created: new Date().toLocaleDateString('he-IL'),
      color: colors[this._driveFolders.length % colors.length]
    };
    this._driveFolders.push(newFolder);

    bootstrap.Modal.getInstance(document.getElementById('drive-folder-modal'))?.hide();
    Utils.toast('\u05EA\u05D9\u05E7\u05D9\u05D4 "' + name + '" \u05E0\u05D5\u05E6\u05E8\u05D4', 'success');
    this._updateStats();
    this.renderDriveContent();
  },

  async deleteFolder(folderId) {
    const folder = this._driveFolders.find(f => f.id === folderId);
    if (!folder) return;
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05EA \u05EA\u05D9\u05E7\u05D9\u05D4', '\u05DC\u05DE\u05D7\u05D5\u05E7 \u05D0\u05EA \u05D4\u05EA\u05D9\u05E7\u05D9\u05D4 "' + folder.name + '"?\n\u05E7\u05D1\u05E6\u05D9\u05DD \u05D1\u05EA\u05D5\u05DB\u05D4 \u05D9\u05D5\u05E2\u05D1\u05E8\u05D5 \u05DC\u05E9\u05D5\u05E8\u05E9.')) return;

    // Move files to root
    (this._loadedFiles || []).forEach(f => { if (f.folder === folderId) f.folder = null; });
    // Remove sub-folders too
    const removeIds = [folderId];
    const findSubs = parentId => {
      this._driveFolders.filter(f => f.parent === parentId).forEach(f => { removeIds.push(f.id); findSubs(f.id); });
    };
    findSubs(folderId);
    this._driveFolders = this._driveFolders.filter(f => !removeIds.includes(f.id));

    Utils.toast('\u05D4\u05EA\u05D9\u05E7\u05D9\u05D4 \u05E0\u05DE\u05D7\u05E7\u05D4', 'success');
    this._updateStats();
    this.renderDriveContent();
  },

  /* ---- Rename ---- */
  showRenameModal(id, type, currentName) {
    document.getElementById('drive-rename-id').value = id;
    document.getElementById('drive-rename-type').value = type;
    document.getElementById('drive-rename-value').value = currentName;
    new bootstrap.Modal(document.getElementById('drive-rename-modal')).show();
    setTimeout(() => document.getElementById('drive-rename-value').select(), 300);
  },

  renameItem() {
    const id = document.getElementById('drive-rename-id').value;
    const type = document.getElementById('drive-rename-type').value;
    const newName = document.getElementById('drive-rename-value')?.value?.trim();
    if (!newName) { Utils.toast('\u05E0\u05D0 \u05DC\u05D4\u05D6\u05D9\u05DF \u05E9\u05DD', 'warning'); return; }

    if (type === 'folder') {
      const folder = this._driveFolders.find(f => f.id === id);
      if (folder) folder.name = newName;
    } else {
      const file = (this._loadedFiles || []).find(f => f.id === id);
      if (file) file.name = newName;
    }

    bootstrap.Modal.getInstance(document.getElementById('drive-rename-modal'))?.hide();
    Utils.toast('\u05D4\u05E9\u05DD \u05E9\u05D5\u05E0\u05D4 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4', 'success');
    this.renderDriveContent();
  },

  /* ---- Move to Folder ---- */
  showMoveModal(fileId) {
    document.getElementById('drive-move-file-id').value = fileId;
    const file = (this._loadedFiles || []).find(f => f.id === fileId);
    const list = document.getElementById('drive-move-folder-list');

    let html = `<div class="list-group">
      <button class="list-group-item list-group-item-action${!file?.folder ? ' active' : ''}" onclick="Pages.moveFileToFolder('${fileId}',null)">
        <i class="bi bi-house-door me-2"></i>\u05E9\u05D5\u05E8\u05E9 (\u05DC\u05DC\u05D0 \u05EA\u05D9\u05E7\u05D9\u05D4)
      </button>`;
    this._driveFolders.forEach(f => {
      const indent = f.parent ? 'ps-4' : '';
      html += `<button class="list-group-item list-group-item-action ${indent}${file?.folder === f.id ? ' active' : ''}" onclick="Pages.moveFileToFolder('${fileId}','${f.id}')">
        <i class="bi bi-folder-fill text-${f.color || 'warning'} me-2"></i>${f.name}
      </button>`;
    });
    html += '</div>';
    list.innerHTML = html;

    new bootstrap.Modal(document.getElementById('drive-move-modal')).show();
  },

  moveFileToFolder(fileId, folderId) {
    const file = (this._loadedFiles || []).find(f => f.id === fileId);
    if (file) {
      file.folder = folderId;
      const folderName = folderId ? (this._driveFolders.find(f => f.id === folderId)?.name || '') : '\u05E9\u05D5\u05E8\u05E9';
      Utils.toast('\u05D4\u05E7\u05D5\u05D1\u05E5 \u05D4\u05D5\u05E2\u05D1\u05E8 \u05DC' + folderName, 'success');
    }
    bootstrap.Modal.getInstance(document.getElementById('drive-move-modal'))?.hide();
    this.renderDriveContent();
  },

  /* ---- Delete File ---- */
  async deleteFile(fileId) {
    const file = (this._loadedFiles || []).find(f => f.id === fileId);
    if (!file) return;
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05EA \u05E7\u05D5\u05D1\u05E5', '\u05DC\u05DE\u05D7\u05D5\u05E7 \u05D0\u05EA "' + (file.name || '') + '"?')) return;

    this._loadedFiles = (this._loadedFiles || []).filter(f => f.id !== fileId);
    this._driveStorageUsed -= (file.size || 0);
    if (this._driveStorageUsed < 0) this._driveStorageUsed = 0;

    // Delete from API
    try { await App.apiCall('delete', 'קבצים_מצורפים', { id: fileId }); } catch(e) { /* ok */ }

    Utils.toast('\u05D4\u05E7\u05D5\u05D1\u05E5 \u05E0\u05DE\u05D7\u05E7', 'success');
    this._updateStats();
    this.renderDriveContent();
  },

  /* ---- Upload ---- */
  async handleFileUpload(fileList) {
    if (!fileList || !fileList.length) return;

    const progressDiv = document.getElementById('drive-upload-progress');
    const nameEl = document.getElementById('drive-upload-name');
    const pctEl = document.getElementById('drive-upload-pct');
    const barEl = document.getElementById('drive-upload-bar');
    if (progressDiv) progressDiv.style.display = 'block';

    const total = fileList.length;
    for (let i = 0; i < total; i++) {
      const file = fileList[i];
      if (nameEl) nameEl.textContent = file.name + ' (' + (i + 1) + '/' + total + ')';

      // Simulate upload progress
      for (let p = 0; p <= 100; p += 20) {
        if (pctEl) pctEl.textContent = p + '%';
        if (barEl) barEl.style.width = p + '%';
        await new Promise(r => setTimeout(r, 80));
      }

      // Determine mime type
      let mime = file.type || 'application/octet-stream';
      if (file.name.endsWith('.pdf')) mime = 'application/pdf';
      else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) mime = 'application/spreadsheet';
      else if (file.name.endsWith('.docx') || file.name.endsWith('.doc')) mime = 'application/document';
      else if (file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)) mime = 'image/' + file.name.split('.').pop().toLowerCase();

      const newFile = {
        id: 'u' + Date.now() + i,
        name: file.name,
        mimeType: mime,
        modifiedTime: new Date().toLocaleDateString('he-IL'),
        size: file.size || 0,
        folder: this._driveCurrentFolder || null,
        url: '#'
      };
      this._loadedFiles = this._loadedFiles || [];
      this._loadedFiles.push(newFile);
      this._driveStorageUsed += (file.size || 0);
    }

    if (progressDiv) progressDiv.style.display = 'none';
    if (barEl) barEl.style.width = '0%';

    Utils.toast(total + ' \u05E7\u05D1\u05E6\u05D9\u05DD \u05D4\u05D5\u05E2\u05DC\u05D5 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4', 'success');
    this._updateStats();
    this.renderDriveContent();

    // Reset file input
    const input = document.getElementById('drive-file-input');
    if (input) input.value = '';
  },

  /* ---- Legacy compat ---- */
  async searchDrive() {
    this._driveSearch = document.getElementById('drive-search')?.value?.trim() || '';
    this.renderDriveContent();
  },

  /* ==============================================================
     Z: DRIVE FILE BROWSER (\u05DB\u05D5\u05E0\u05DF \u05E9\u05D9\u05EA\u05D5\u05E3)
     ============================================================== */

  _driveActiveTab: 'files',
  _zDrivePath: [],        // breadcrumb path of folder names
  _zDriveSearch: '',
  _ZDRIVE_LS_KEY: 'bht_zdrive_catalog',

  /* ---- Default catalog (key folders on Z:) ---- */
  _zDriveDefaultCatalog() {
    return {
      '\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD': {
        _type: 'folder',
        '\u05DB\u05D9\u05EA\u05D4 \u05D0': {
          _type: 'folder',
          '\u05E8\u05E9\u05D9\u05DE\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD.xlsx': { _type: 'file', size: '245 KB' },
          '\u05EA\u05DE\u05D5\u05E0\u05D5\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD': { _type: 'folder' },
          '\u05D0\u05D9\u05E9\u05D5\u05E8\u05D9 \u05D4\u05E8\u05E9\u05DE\u05D4': { _type: 'folder' }
        },
        '\u05DB\u05D9\u05EA\u05D4 \u05D1': {
          _type: 'folder',
          '\u05E8\u05E9\u05D9\u05DE\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD.xlsx': { _type: 'file', size: '198 KB' },
          '\u05EA\u05DE\u05D5\u05E0\u05D5\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD': { _type: 'folder' }
        },
        '\u05D3\u05D5\u05D7\u05D5\u05EA \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA': {
          _type: 'folder',
          '\u05D3\u05D5\u05D7 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D0\u05E4\u05E8\u05D9\u05DC 2026.pdf': { _type: 'file', size: '524 KB' },
          '\u05D3\u05D5\u05D7 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05DE\u05E8\u05E5 2026.pdf': { _type: 'file', size: '489 KB' }
        }
      },
      '\u05DC\u05D9\u05DE\u05D5\u05D3\u05D9\u05DD': {
        _type: 'folder',
        '\u05DE\u05E2\u05E8\u05DB\u05EA \u05E9\u05E2\u05D5\u05EA': {
          _type: 'folder',
          '\u05DE\u05E2\u05E8\u05DB\u05EA \u05E9\u05E2\u05D5\u05EA \u05E1\u05DE\u05E1\u05D8\u05E8 \u05D1.xlsx': { _type: 'file', size: '102 KB' },
          '\u05DE\u05E2\u05E8\u05DB\u05EA \u05E9\u05E2\u05D5\u05EA \u05E1\u05DE\u05E1\u05D8\u05E8 \u05D0.xlsx': { _type: 'file', size: '98 KB' }
        },
        '\u05D7\u05D5\u05DE\u05E8\u05D9 \u05DC\u05D9\u05DE\u05D5\u05D3': {
          _type: 'folder',
          '\u05DE\u05D1\u05D7\u05E0\u05D9\u05DD': { _type: 'folder' },
          '\u05E2\u05D1\u05D5\u05D3\u05D5\u05EA': { _type: 'folder' },
          '\u05D3\u05E4\u05D9 \u05E2\u05D1\u05D5\u05D3\u05D4': { _type: 'folder' }
        },
        '\u05E1\u05E4\u05E8\u05D9\u05D9\u05EA \u05D4\u05DE\u05D5\u05E1\u05D3': {
          _type: 'folder',
          '\u05E7\u05D8\u05DC\u05D5\u05D2 \u05E1\u05E4\u05E8\u05D9\u05DD.xlsx': { _type: 'file', size: '156 KB' }
        }
      },
      '\u05D4\u05D5\u05E8\u05D9\u05DD': {
        _type: 'folder',
        '\u05EA\u05E7\u05E9\u05D5\u05E8\u05EA \u05D4\u05D5\u05E8\u05D9\u05DD': {
          _type: 'folder',
          '\u05DE\u05DB\u05EA\u05D1\u05D9\u05DD': { _type: 'folder' },
          '\u05EA\u05D1\u05E0\u05D9\u05D5\u05EA \u05DE\u05D9\u05D9\u05DC': { _type: 'folder' }
        },
        '\u05D0\u05D9\u05E9\u05D5\u05E8\u05D9 \u05D4\u05D5\u05E8\u05D9\u05DD': {
          _type: 'folder',
          '\u05D0\u05D9\u05E9\u05D5\u05E8\u05D9 \u05D8\u05D9\u05D5\u05DC\u05D9\u05DD.pdf': { _type: 'file', size: '312 KB' }
        }
      },
      '\u05D0\u05D9\u05E8\u05D5\u05E2\u05D9\u05DD': {
        _type: 'folder',
        '\u05D8\u05D9\u05D5\u05DC\u05D9\u05DD': {
          _type: 'folder',
          '\u05D8\u05D9\u05D5\u05DC \u05E9\u05E0\u05EA\u05D9 2026': {
            _type: 'folder',
            '\u05EA\u05DB\u05E0\u05D9\u05EA \u05D8\u05D9\u05D5\u05DC.docx': { _type: 'file', size: '89 KB' },
            '\u05E8\u05E9\u05D9\u05DE\u05EA \u05DE\u05E9\u05EA\u05EA\u05E4\u05D9\u05DD.xlsx': { _type: 'file', size: '45 KB' }
          }
        },
        '\u05D0\u05D9\u05E8\u05D5\u05E2\u05D9 \u05E1\u05D9\u05D5\u05DD \u05E9\u05E0\u05D4': { _type: 'folder' },
        '\u05E6\u05D9\u05DC\u05D5\u05DE\u05D9\u05DD': {
          _type: 'folder',
          '\u05E6\u05D9\u05DC\u05D5\u05DE\u05D9 \u05D0\u05D9\u05E8\u05D5\u05E2 \u05E1\u05D9\u05D5\u05DD.jpg': { _type: 'file', size: '2.1 MB' }
        }
      },
      '\u05DE\u05E0\u05D4\u05DC\u05D4': {
        _type: 'folder',
        '\u05EA\u05E7\u05E6\u05D9\u05D1': {
          _type: 'folder',
          '\u05EA\u05E7\u05E6\u05D9\u05D1 \u05E9\u05E0\u05EA\u05D9 2026.xlsx': { _type: 'file', size: '389 KB' },
          '\u05D3\u05D5\u05D7\u05D5\u05EA \u05DB\u05E1\u05E4\u05D9\u05D9\u05DD': { _type: 'folder' }
        },
        '\u05DE\u05E1\u05DE\u05DB\u05D9\u05DD \u05DE\u05E0\u05D4\u05DC\u05D9\u05D9\u05DD': {
          _type: 'folder',
          '\u05E0\u05D4\u05DC\u05D9 \u05DE\u05D5\u05E1\u05D3 2026.pdf': { _type: 'file', size: '921 KB' },
          '\u05EA\u05E7\u05E0\u05D5\u05DF \u05D1\u05D8\u05D9\u05D7\u05D5\u05EA.pdf': { _type: 'file', size: '716 KB' }
        },
        '\u05D8\u05E4\u05E1\u05D9\u05DD': { _type: 'folder' },
        '\u05D7\u05D5\u05D6\u05E8\u05D9 \u05D4\u05EA\u05E7\u05E9\u05E8\u05D5\u05EA': { _type: 'folder' }
      }
    };
  },

  /* ---- Load catalog from localStorage or use default ---- */
  _zDriveLoadCatalog() {
    try {
      const stored = localStorage.getItem(this._ZDRIVE_LS_KEY);
      if (stored) {
        this._zDriveCatalog = JSON.parse(stored);
      }
    } catch(e) { /* ignore */ }
    if (!this._zDriveCatalog) {
      this._zDriveCatalog = this._zDriveDefaultCatalog();
      localStorage.setItem(this._ZDRIVE_LS_KEY, JSON.stringify(this._zDriveCatalog));
    }
    this._zDrivePath = [];
    this._zDriveSearch = '';
    const searchEl = document.getElementById('zdrive-search');
    if (searchEl) searchEl.value = '';
    this._zDriveRender();
  },

  /* ---- Navigate to a folder path ---- */
  _zDriveGetNode(path) {
    let node = this._zDriveCatalog;
    for (const segment of path) {
      if (!node || !node[segment]) return null;
      node = node[segment];
    }
    return node;
  },

  _zDriveNavigate(folderName) {
    this._zDrivePath.push(folderName);
    this._zDriveRender();
  },

  _zDriveNavigateTo(depth) {
    this._zDrivePath = this._zDrivePath.slice(0, depth);
    this._zDriveRender();
  },

  /* ---- Build file:///Z: path ---- */
  _zDriveBuildPath(extraSegments) {
    const allSegments = [...this._zDrivePath, ...(extraSegments || [])];
    return 'file:///Z:/' + allSegments.join('/');
  },

  /* ---- File type detection ---- */
  _zDriveFileIcon(name) {
    const ext = (name || '').split('.').pop().toLowerCase();
    const map = {
      xlsx: 'bi-file-earmark-spreadsheet text-success',
      xls: 'bi-file-earmark-spreadsheet text-success',
      pdf: 'bi-file-earmark-pdf text-danger',
      docx: 'bi-file-earmark-word text-primary',
      doc: 'bi-file-earmark-word text-primary',
      jpg: 'bi-file-earmark-image text-info',
      jpeg: 'bi-file-earmark-image text-info',
      png: 'bi-file-earmark-image text-info',
      pptx: 'bi-file-earmark-slides text-warning',
      txt: 'bi-file-earmark-text text-secondary'
    };
    return map[ext] || 'bi-file-earmark text-secondary';
  },

  /* ---- Search / Filter ---- */
  _zDriveFilter() {
    this._zDriveSearch = (document.getElementById('zdrive-search')?.value || '').trim().toLowerCase();
    this._zDriveRender();
  },

  /* ---- Recursive search ---- */
  _zDriveSearchAll(node, path, query) {
    const results = [];
    for (const [name, child] of Object.entries(node)) {
      if (name === '_type') continue;
      const fullPath = [...path, name];
      if (child._type === 'file') {
        if (name.toLowerCase().includes(query)) {
          results.push({ name, path: fullPath, size: child.size || '' });
        }
      } else if (child._type === 'folder') {
        if (name.toLowerCase().includes(query)) {
          results.push({ name, path: fullPath, isFolder: true });
        }
        results.push(...this._zDriveSearchAll(child, fullPath, query));
      }
    }
    return results;
  },

  /* ---- Render Z Drive content ---- */
  _zDriveRender() {
    if (!this._zDriveCatalog) {
      this._zDriveLoadCatalog();
      return;
    }

    const container = document.getElementById('zdrive-content');
    if (!container) return;

    // Breadcrumb
    const breadNav = document.getElementById('zdrive-breadcrumb');
    if (breadNav) {
      if (this._zDrivePath.length === 0 && !this._zDriveSearch) {
        breadNav.style.display = 'none';
      } else {
        breadNav.style.display = 'block';
        const ol = breadNav.querySelector('ol');
        ol.innerHTML = `<li class="breadcrumb-item"><a href="#" onclick="Pages._zDriveNavigateTo(0);return false"><i class="bi bi-hdd-network me-1"></i>Z:</a></li>` +
          this._zDrivePath.map((seg, i) => {
            const isLast = i === this._zDrivePath.length - 1;
            return isLast
              ? `<li class="breadcrumb-item active">${seg}</li>`
              : `<li class="breadcrumb-item"><a href="#" onclick="Pages._zDriveNavigateTo(${i + 1});return false">${seg}</a></li>`;
          }).join('');
      }
    }

    // Search mode
    if (this._zDriveSearch) {
      const results = this._zDriveSearchAll(this._zDriveCatalog, [], this._zDriveSearch);
      if (!results.length) {
        container.innerHTML = '<div class="text-center py-5 text-muted"><i class="bi bi-search fs-1 d-block mb-2"></i>\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05E7\u05D1\u05E6\u05D9\u05DD \u05EA\u05D5\u05D0\u05DE\u05D9\u05DD</div>';
        return;
      }
      container.innerHTML = this._zDriveRenderSearchResults(results);
      return;
    }

    // Normal folder view
    const node = this._zDrivePath.length === 0 ? this._zDriveCatalog : this._zDriveGetNode(this._zDrivePath);
    if (!node) {
      container.innerHTML = '<div class="text-center py-5 text-muted"><i class="bi bi-exclamation-triangle fs-1 d-block mb-2"></i>\u05EA\u05D9\u05E7\u05D9\u05D4 \u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D4</div>';
      return;
    }

    const entries = Object.entries(node).filter(([k]) => k !== '_type');
    const folders = entries.filter(([, v]) => v._type === 'folder');
    const files = entries.filter(([, v]) => v._type === 'file');

    if (!folders.length && !files.length) {
      container.innerHTML = '<div class="text-center py-5 text-muted"><i class="bi bi-folder2-open fs-1 d-block mb-2"></i>\u05EA\u05D9\u05E7\u05D9\u05D4 \u05E8\u05D9\u05E7\u05D4</div>';
      return;
    }

    const folderColors = ['primary', 'success', 'warning', 'info', 'danger'];
    let html = '<div class="row g-3">';

    // Folders
    folders.forEach(([name], i) => {
      const color = folderColors[i % folderColors.length];
      const subCount = Object.keys(folders[i][1]).filter(k => k !== '_type').length;
      const escapedName = name.replace(/'/g, "\\'");
      html += `<div class="col-6 col-md-4 col-lg-3">
        <div class="card p-3 card-clickable h-100" ondblclick="Pages._zDriveNavigate('${escapedName}')" onclick="Pages._zDriveNavigate('${escapedName}')">
          <div class="text-center mb-2"><i class="bi bi-folder-fill fs-1 text-${color}"></i></div>
          <div class="fw-bold small text-center text-truncate">${name}</div>
          <small class="text-muted text-center d-block">${subCount} \u05E4\u05E8\u05D9\u05D8\u05D9\u05DD</small>
        </div>
      </div>`;
    });

    // Files
    files.forEach(([name, meta]) => {
      const icon = this._zDriveFileIcon(name);
      const filePath = this._zDriveBuildPath([name]);
      const escapedPath = filePath.replace(/'/g, "\\'");
      html += `<div class="col-6 col-md-4 col-lg-3">
        <div class="card p-3 card-clickable h-100" onclick="Pages._zDriveOpenFile('${escapedPath}','${name.replace(/'/g, "\\'")}')">
          <div class="text-center mb-2"><i class="bi ${icon} fs-1"></i></div>
          <div class="fw-bold small text-center text-truncate" title="${name}">${name}</div>
          ${meta.size ? '<small class="text-muted text-center d-block">' + meta.size + '</small>' : ''}
        </div>
      </div>`;
    });

    html += '</div>';
    container.innerHTML = html;
  },

  /* ---- Render search results ---- */
  _zDriveRenderSearchResults(results) {
    let html = `<div class="card"><table class="table table-hover mb-0 align-middle">
      <thead><tr><th style="width:40px"></th><th>\u05E9\u05DD</th><th>\u05DE\u05D9\u05E7\u05D5\u05DD</th><th class="d-none d-md-table-cell">\u05D2\u05D5\u05D3\u05DC</th></tr></thead><tbody>`;

    results.forEach(r => {
      const icon = r.isFolder ? 'bi-folder-fill text-warning' : this._zDriveFileIcon(r.name);
      const location = r.path.slice(0, -1).join(' / ') || 'Z:';
      const filePath = 'file:///Z:/' + r.path.join('/');
      const escapedPath = filePath.replace(/'/g, "\\'");
      const escapedName = r.name.replace(/'/g, "\\'");

      if (r.isFolder) {
        const pathArray = JSON.stringify(r.path).replace(/"/g, "'");
        html += `<tr class="cursor-pointer" onclick="Pages._zDrivePath=${JSON.stringify(r.path)};Pages._zDriveSearch='';document.getElementById('zdrive-search').value='';Pages._zDriveRender()">
          <td><i class="bi ${icon} fs-5"></i></td>
          <td class="fw-bold">${r.name}</td>
          <td class="text-muted small">${location}</td>
          <td class="d-none d-md-table-cell text-muted small">---</td>
        </tr>`;
      } else {
        html += `<tr class="cursor-pointer" onclick="Pages._zDriveOpenFile('${escapedPath}','${escapedName}')">
          <td><i class="bi ${icon} fs-5"></i></td>
          <td class="fw-bold">${r.name}</td>
          <td class="text-muted small">${location}</td>
          <td class="d-none d-md-table-cell text-muted small">${r.size || '---'}</td>
        </tr>`;
      }
    });

    html += '</tbody></table></div>';
    return html;
  },

  /* ---- Open file from Z drive ---- */
  _zDriveOpenFile(filePath, fileName) {
    try {
      window.open(filePath, '_blank');
    } catch(e) { /* blocked by browser */ }
    Utils.toast('\u05E4\u05D5\u05EA\u05D7: ' + (fileName || filePath), 'info');
  }
});
