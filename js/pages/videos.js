/* ===== BHT v5.3 — Video Tutorials (\u05E1\u05E8\u05D8\u05D5\u05E0\u05D9 \u05D4\u05D3\u05E8\u05DB\u05D4) ===== */
Object.assign(Pages, {

  /* ---------- categories ---------- */
  _vidCategories: {
    'getting-started': { label:'\u05EA\u05D7\u05D9\u05DC\u05EA \u05E2\u05D1\u05D5\u05D3\u05D4', icon:'bi-rocket-takeoff-fill', color:'primary',   gradient:'linear-gradient(135deg,#4e73df,#224abe)' },
    'students':        { label:'\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD',        icon:'bi-people-fill',         color:'success',   gradient:'linear-gradient(135deg,#1cc88a,#13855c)' },
    'attendance':      { label:'\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA',          icon:'bi-calendar-check-fill', color:'info',      gradient:'linear-gradient(135deg,#36b9cc,#258391)' },
    'finance':         { label:'\u05DB\u05E1\u05E4\u05D9\u05DD',            icon:'bi-cash-stack',          color:'warning',   gradient:'linear-gradient(135deg,#f6c23e,#dda20a)' },
    'reports':         { label:'\u05D3\u05D5\u05D7\u05D5\u05EA',            icon:'bi-file-earmark-bar-graph-fill', color:'danger', gradient:'linear-gradient(135deg,#e74a3b,#be2617)' },
    'communication':   { label:'\u05EA\u05E7\u05E9\u05D5\u05E8\u05EA',          icon:'bi-chat-dots-fill',      color:'purple',    gradient:'linear-gradient(135deg,#8b5cf6,#6d28d9)' },
    'settings':        { label:'\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA',          icon:'bi-gear-fill',           color:'secondary', gradient:'linear-gradient(135deg,#858796,#60616f)' },
  },

  /* ---------- demo data (15 videos) ---------- */
  _vidData: [
    { id:1,  title:'\u05D4\u05DB\u05E8\u05D5\u05EA \u05E8\u05D0\u05E9\u05D5\u05E0\u05D4 \u05E2\u05DD \u05D4\u05DE\u05E2\u05E8\u05DB\u05EA',          cat:'getting-started', duration:'3:45', desc:'\u05E1\u05E7\u05D9\u05E8\u05D4 \u05DB\u05DC\u05DC\u05D9\u05EA \u05E9\u05DC \u05D4\u05DE\u05DE\u05E9\u05E7 \u05D5\u05D4\u05EA\u05E4\u05E8\u05D9\u05D8\u05D9\u05DD \u05D4\u05E8\u05D0\u05E9\u05D9\u05D9\u05DD. \u05DC\u05DE\u05D3\u05D5 \u05D0\u05D9\u05DA \u05DC\u05E0\u05D5\u05D5\u05D8 \u05D1\u05D9\u05DF \u05D4\u05D3\u05E4\u05D9\u05DD \u05D5\u05DC\u05D4\u05E9\u05EA\u05DE\u05E9 \u05D1\u05EA\u05E4\u05E8\u05D9\u05D8 \u05D4\u05E6\u05D3.', featured:true },
    { id:2,  title:'\u05D0\u05D9\u05DA \u05DC\u05D4\u05D5\u05E1\u05D9\u05E3 \u05EA\u05DC\u05DE\u05D9\u05D3 \u05D7\u05D3\u05E9',             cat:'students',        duration:'4:20', desc:'\u05D4\u05D3\u05E8\u05DB\u05D4 \u05DE\u05DC\u05D0\u05D4 \u05DC\u05D4\u05D5\u05E1\u05E4\u05EA \u05EA\u05DC\u05DE\u05D9\u05D3 \u05D7\u05D3\u05E9 \u05DC\u05DE\u05E2\u05E8\u05DB\u05EA \u05DB\u05D5\u05DC\u05DC \u05E4\u05E8\u05D8\u05D9\u05DD \u05D0\u05D9\u05E9\u05D9\u05D9\u05DD, \u05E4\u05E8\u05D8\u05D9 \u05D4\u05D5\u05E8\u05D9\u05DD \u05D5\u05DE\u05E1\u05D2\u05E8\u05EA.', featured:true },
    { id:3,  title:'\u05E8\u05D9\u05E9\u05D5\u05DD \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D9\u05D5\u05DE\u05D9',               cat:'attendance',      duration:'5:10', desc:'\u05D0\u05D9\u05DA \u05DC\u05E8\u05E9\u05D5\u05DD \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D9\u05D5\u05DE\u05D9\u05EA \u05D1\u05DE\u05D4\u05D9\u05E8\u05D5\u05EA. \u05DB\u05D5\u05DC\u05DC \u05E7\u05D9\u05E6\u05D5\u05E8\u05D9 \u05DE\u05E7\u05DC\u05D3\u05EA, \u05E1\u05D9\u05DE\u05D5\u05DF \u05D4\u05D9\u05E2\u05D3\u05E8\u05D5\u05D9\u05D5\u05EA \u05D5\u05D4\u05E2\u05E8\u05D5\u05EA.', featured:true },
    { id:4,  title:'\u05D4\u05E4\u05E7\u05EA \u05D3\u05D5\u05D7 \u05DB\u05E1\u05E4\u05D9',                   cat:'finance',        duration:'6:30', desc:'\u05D0\u05D9\u05DA \u05DC\u05D4\u05E4\u05D9\u05E7 \u05D3\u05D5\u05D7\u05D5\u05EA \u05DB\u05E1\u05E4\u05D9\u05D9\u05DD \u05DB\u05D5\u05DC\u05DC \u05D3\u05D5\u05D7 \u05D4\u05DB\u05E0\u05E1\u05D5\u05EA, \u05D3\u05D5\u05D7 \u05D7\u05D5\u05D1\u05D5\u05EA \u05D5\u05D3\u05D5\u05D7 \u05D2\u05D1\u05D9\u05D9\u05D4.' },
    { id:5,  title:'\u05E9\u05DC\u05D9\u05D7\u05EA \u05D4\u05D5\u05D3\u05E2\u05D4 \u05DC\u05D4\u05D5\u05E8\u05D9\u05DD',              cat:'communication',  duration:'3:15', desc:'\u05E9\u05DC\u05D9\u05D7\u05EA \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05DC\u05D4\u05D5\u05E8\u05D9\u05DD \u05D1\u05E2\u05E8\u05D5\u05E6\u05D9\u05DD \u05E9\u05D5\u05E0\u05D9\u05DD - \u05DE\u05D9\u05D9\u05DC, SMS \u05D5\u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05D1\u05D0\u05E4\u05DC\u05D9\u05E7\u05E6\u05D9\u05D4.' },
    { id:6,  title:'\u05E0\u05D9\u05D4\u05D5\u05DC \u05DE\u05E2\u05E8\u05DB\u05EA \u05E9\u05E2\u05D5\u05EA',                cat:'settings',       duration:'4:50', desc:'\u05D4\u05D2\u05D3\u05E8\u05EA \u05DE\u05E2\u05E8\u05DB\u05EA \u05E9\u05E2\u05D5\u05EA \u05DC\u05DB\u05D9\u05EA\u05D5\u05EA, \u05DE\u05D5\u05E8\u05D9\u05DD \u05D5\u05D7\u05D3\u05E8\u05D9 \u05DC\u05D9\u05DE\u05D5\u05D3.' },
    { id:7,  title:'\u05D3\u05D5\u05D7 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D7\u05D5\u05D3\u05E9\u05D9',                cat:'reports',        duration:'5:40', desc:'\u05D4\u05E4\u05E7\u05EA \u05D3\u05D5\u05D7\u05D5\u05EA \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D7\u05D5\u05D3\u05E9\u05D9\u05D9\u05DD \u05D5\u05E9\u05E0\u05EA\u05D9\u05D9\u05DD \u05E2\u05DD \u05D2\u05E8\u05E4\u05D9\u05DD \u05D5\u05D8\u05D1\u05DC\u05D0\u05D5\u05EA.' },
    { id:8,  title:'\u05E2\u05E8\u05D9\u05DB\u05EA \u05DB\u05E8\u05D8\u05D9\u05E1 \u05EA\u05DC\u05DE\u05D9\u05D3',               cat:'students',        duration:'3:55', desc:'\u05E2\u05E8\u05D9\u05DB\u05EA \u05DB\u05E8\u05D8\u05D9\u05E1 \u05EA\u05DC\u05DE\u05D9\u05D3 \u05DB\u05D5\u05DC\u05DC \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD, \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA, \u05DE\u05D9\u05D3\u05E2 \u05E8\u05E4\u05D5\u05D0\u05D9 \u05D5\u05D4\u05E2\u05E8\u05D5\u05EA.' },
    { id:9,  title:'\u05E0\u05D9\u05D4\u05D5\u05DC \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD \u05D5\u05EA\u05D5\u05DB\u05E0\u05D9\u05D5\u05EA',          cat:'finance',        duration:'7:15', desc:'\u05D9\u05E6\u05D9\u05E8\u05EA \u05EA\u05D5\u05DB\u05E0\u05D9\u05D5\u05EA \u05EA\u05E9\u05DC\u05D5\u05DD, \u05DE\u05E2\u05E7\u05D1 \u05D0\u05D7\u05E8 \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD \u05D5\u05E9\u05DC\u05D9\u05D7\u05EA \u05EA\u05D6\u05DB\u05D5\u05E8\u05D5\u05EA.' },
    { id:10, title:'\u05D4\u05D6\u05E0\u05EA \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD \u05D5\u05DE\u05D1\u05D7\u05E0\u05D9\u05DD',            cat:'getting-started', duration:'4:10', desc:'\u05D0\u05D9\u05DA \u05DC\u05D4\u05D6\u05D9\u05DF \u05E6\u05D9\u05D5\u05E0\u05D9 \u05DE\u05D1\u05D7\u05E0\u05D9\u05DD, \u05DC\u05E6\u05E4\u05D5\u05EA \u05D1\u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05D5\u05DC\u05E0\u05D4\u05DC \u05DE\u05E2\u05E7\u05D1 \u05DC\u05D9\u05DE\u05D5\u05D3\u05D9.' },
    { id:11, title:'\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D7\u05D5\u05D3\u05E9\u05D9\u05EA \u05DE\u05EA\u05E7\u05D3\u05DE\u05EA',          cat:'attendance',      duration:'3:30', desc:'\u05EA\u05E6\u05D5\u05D2\u05EA \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D7\u05D5\u05D3\u05E9\u05D9\u05EA \u05E2\u05DD \u05E1\u05D9\u05DB\u05D5\u05DD \u05E6\u05D1\u05E2\u05D9\u05DD \u05D5\u05E1\u05D8\u05D8\u05D9\u05E1\u05D8\u05D9\u05E7\u05D5\u05EA \u05DE\u05E7\u05D5\u05E4\u05DC\u05D5\u05EA.' },
    { id:12, title:'\u05D4\u05D2\u05D3\u05E8\u05EA \u05D4\u05E8\u05E9\u05D0\u05D5\u05EA \u05D2\u05D9\u05E9\u05D4',              cat:'settings',       duration:'2:50', desc:'\u05D4\u05D2\u05D3\u05E8\u05EA \u05E7\u05D5\u05D3 PIN, \u05D4\u05E8\u05E9\u05D0\u05D5\u05EA \u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD \u05D5\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA \u05DE\u05E2\u05E8\u05DB\u05EA \u05DB\u05DC\u05DC\u05D9\u05D5\u05EA.' },
    { id:13, title:'\u05D3\u05D5\u05D7\u05D5\u05EA \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD \u05D5\u05D4\u05D9\u05E9\u05D2\u05D9\u05DD',           cat:'reports',        duration:'4:45', desc:'\u05D4\u05E4\u05E7\u05EA \u05D3\u05D5\u05D7\u05D5\u05EA \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD \u05DC\u05E4\u05D9 \u05DB\u05D9\u05EA\u05D4, \u05EA\u05DC\u05DE\u05D9\u05D3 \u05D0\u05D5 \u05EA\u05E7\u05D5\u05E4\u05D4.' },
    { id:14, title:'\u05EA\u05E7\u05E9\u05D5\u05E8\u05EA \u05D4\u05D5\u05E8\u05D9\u05DD \u05DE\u05EA\u05E7\u05D3\u05DE\u05EA',           cat:'communication',  duration:'5:25', desc:'\u05E9\u05D9\u05DE\u05D5\u05E9 \u05D1\u05E4\u05D5\u05E8\u05D8\u05DC \u05D4\u05D5\u05E8\u05D9\u05DD, \u05E9\u05DC\u05D9\u05D7\u05EA \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05D0\u05D5\u05D8\u05D5\u05DE\u05D8\u05D9\u05D5\u05EA \u05D5\u05E6\u05E4\u05D9\u05D9\u05D4 \u05D1\u05D4\u05D9\u05E1\u05D8\u05D5\u05E8\u05D9\u05D4.' },
    { id:15, title:'\u05D2\u05D9\u05D1\u05D5\u05D9 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05DE\u05D0\u05E7\u05E1\u05DC',              cat:'getting-started', duration:'6:00', desc:'\u05D0\u05D9\u05DA \u05DC\u05D9\u05D9\u05D1\u05D0 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05DE\u05E7\u05D5\u05D1\u05E5 \u05D0\u05E7\u05E1\u05DC \u05D0\u05D5 \u05DE\u05DE\u05E2\u05E8\u05DB\u05EA \u05D0\u05D7\u05E8\u05EA \u05DC\u05EA\u05D5\u05DA \u05D4\u05DE\u05E2\u05E8\u05DB\u05EA.' },
  ],

  /* ---------- state ---------- */
  _vidWatched: {},          // { videoId: true }
  _vidSearchTerm: '',
  _vidActiveCategory: '',   // '' = all

  /* ---------- main render ---------- */
  videos() {
    const cats = this._vidCategories;
    const catBtns = Object.entries(cats).map(([k, v]) =>
      `<button class="btn btn-sm btn-outline-${v.color} vid-cat-btn" data-cat="${k}" onclick="Pages.vidFilterCat('${k}')">
        <i class="bi ${v.icon} me-1"></i>${v.label}
      </button>`
    ).join('');

    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div>
          <h1><i class="bi bi-play-circle-fill me-2"></i>\u05E1\u05E8\u05D8\u05D5\u05E0\u05D9 \u05D4\u05D3\u05E8\u05DB\u05D4</h1>
          <p class="text-muted mb-0">\u05DC\u05DE\u05D3\u05D5 \u05DC\u05D4\u05E9\u05EA\u05DE\u05E9 \u05D1\u05DE\u05E2\u05E8\u05DB\u05EA \u05D1\u05E7\u05DC\u05D5\u05EA \u05D5\u05D1\u05D9\u05E2\u05D9\u05DC\u05D5\u05EA</p>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="row g-3 mb-4">
        <div class="col-6 col-md-3">
          <div class="card stat-card p-3">
            <div class="stat-icon gradient-primary"><i class="bi bi-collection-play-fill"></i></div>
            <div class="stat-value" id="vid-stat-total">0</div>
            <div class="stat-label">\u05E1\u05D4"\u05DB \u05E1\u05E8\u05D8\u05D5\u05E0\u05D9\u05DD</div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card stat-card p-3">
            <div class="stat-icon gradient-success"><i class="bi bi-check-circle-fill"></i></div>
            <div class="stat-value" id="vid-stat-watched">0</div>
            <div class="stat-label">\u05E0\u05E6\u05E4\u05D5</div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card stat-card p-3">
            <div class="stat-icon gradient-warning"><i class="bi bi-percent"></i></div>
            <div class="stat-value" id="vid-stat-pct">0%</div>
            <div class="stat-label">\u05D0\u05D7\u05D5\u05D6 \u05D4\u05E9\u05DC\u05DE\u05D4</div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card stat-card p-3">
            <div class="stat-icon gradient-info"><i class="bi bi-grid-fill"></i></div>
            <div class="stat-value" id="vid-stat-cats">0</div>
            <div class="stat-label">\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D5\u05EA</div>
          </div>
        </div>
      </div>

      <!-- Featured Section -->
      <div class="card mb-4" id="vid-featured-section">
        <div class="card-header bg-transparent d-flex align-items-center gap-2">
          <i class="bi bi-star-fill text-warning"></i>
          <strong>\u05DE\u05D5\u05DE\u05DC\u05E5 \u05DC\u05D4\u05EA\u05D7\u05D9\u05DC</strong>
          <span class="text-muted ms-auto" style="font-size:.85rem">\u05E1\u05E8\u05D8\u05D5\u05E0\u05D9\u05DD \u05DE\u05D5\u05DE\u05DC\u05E6\u05D9\u05DD \u05DC\u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD \u05D7\u05D3\u05E9\u05D9\u05DD</span>
        </div>
        <div class="card-body">
          <div class="row g-3" id="vid-featured-list"></div>
        </div>
      </div>

      <!-- Search & Category filters -->
      <div class="card mb-3">
        <div class="card-body p-3">
          <div class="row g-2 align-items-center">
            <div class="col-md-5">
              <div class="input-group input-group-sm">
                <span class="input-group-text"><i class="bi bi-search"></i></span>
                <input type="text" class="form-control" id="vid-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05E1\u05E8\u05D8\u05D5\u05DF \u05DC\u05E4\u05D9 \u05E9\u05DD \u05D0\u05D5 \u05EA\u05D9\u05D0\u05D5\u05E8..." oninput="Pages.vidSearch(this.value)">
              </div>
            </div>
            <div class="col-md-7">
              <div class="d-flex gap-1 flex-wrap">
                <button class="btn btn-sm btn-outline-dark vid-cat-btn active" data-cat="" onclick="Pages.vidFilterCat('')">
                  <i class="bi bi-grid-fill me-1"></i>\u05D4\u05DB\u05DC
                </button>
                ${catBtns}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Category progress -->
      <div class="card mb-4" id="vid-progress-section">
        <div class="card-header bg-transparent"><i class="bi bi-bar-chart-fill me-2 text-primary"></i><strong>\u05D4\u05EA\u05E7\u05D3\u05DE\u05D5\u05EA \u05DC\u05E4\u05D9 \u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4</strong></div>
        <div class="card-body" id="vid-progress-bars"></div>
      </div>

      <!-- Video grid -->
      <div class="row g-3" id="vid-grid">${Utils.skeleton(6)}</div>

      <!-- Empty state -->
      <div id="vid-empty" class="text-center py-5 d-none">
        <i class="bi bi-camera-video-off fs-1 text-muted"></i>
        <p class="text-muted mt-2">\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05E1\u05E8\u05D8\u05D5\u05E0\u05D9\u05DD \u05DE\u05EA\u05D0\u05D9\u05DE\u05D9\u05DD</p>
      </div>

      <!-- Player Modal -->
      <div class="modal fade" id="vid-player-modal" tabindex="-1">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="vid-player-title"></h5>
              <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body p-0">
              <!-- 16:9 video area -->
              <div id="vid-player-area" style="position:relative;width:100%;padding-top:56.25%;background:#1a1a2e;border-radius:0">
                <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff">
                  <i class="bi bi-play-circle" style="font-size:4rem;opacity:.7"></i>
                  <span class="mt-2 opacity-75" style="font-size:.9rem">\u05D4\u05E1\u05E8\u05D8\u05D5\u05DF \u05D9\u05D5\u05E4\u05E2\u05DC \u05DB\u05D0\u05DF</span>
                </div>
              </div>
              <div class="p-3">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <span class="badge me-2" id="vid-player-badge"></span>
                    <small class="text-muted" id="vid-player-duration"></small>
                  </div>
                  <button class="btn btn-sm btn-outline-success" id="vid-player-watch-btn" onclick="Pages.vidToggleWatched()">
                    <i class="bi bi-check-circle me-1"></i>\u05E1\u05DE\u05DF \u05DB\u05E0\u05E6\u05E4\u05D4
                  </button>
                </div>
                <p class="text-muted mb-3" id="vid-player-desc"></p>
                <h6 class="mb-2"><i class="bi bi-collection me-1"></i>\u05E1\u05E8\u05D8\u05D5\u05E0\u05D9\u05DD \u05E7\u05E9\u05D5\u05E8\u05D9\u05DD</h6>
                <div id="vid-player-related"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /* ---------- init ---------- */
  async videosInit() {
    // Load watched state from store
    const saved = App.store?.get?.('vid_watched');
    this._vidWatched = saved ? JSON.parse(saved) : {};
    this._vidSearchTerm = '';
    this._vidActiveCategory = '';
    this._vidRender();
  },

  /* ---------- full render ---------- */
  _vidRender() {
    this._vidRenderStats();
    this._vidRenderFeatured();
    this._vidRenderProgress();
    this._vidRenderGrid();
  },

  /* ---------- stats ---------- */
  _vidRenderStats() {
    const el = id => document.getElementById(id);
    const total = this._vidData.length;
    const watched = Object.keys(this._vidWatched).length;
    const pct = total ? Math.round(watched / total * 100) : 0;
    const cats = Object.keys(this._vidCategories).length;
    el('vid-stat-total').textContent = total;
    el('vid-stat-watched').textContent = watched;
    el('vid-stat-pct').textContent = pct + '%';
    el('vid-stat-cats').textContent = cats;
  },

  /* ---------- featured ---------- */
  _vidRenderFeatured() {
    const featured = this._vidData.filter(v => v.featured);
    const container = document.getElementById('vid-featured-list');
    if (!container) return;
    container.innerHTML = featured.map(v => {
      const cat = this._vidCategories[v.cat];
      const watched = this._vidWatched[v.id];
      return `
        <div class="col-md-4">
          <div class="card h-100 border-0 shadow-sm" style="cursor:pointer" onclick="Pages.vidOpen(${v.id})">
            <div style="position:relative;padding-top:56.25%;background:${cat.gradient};border-radius:.5rem .5rem 0 0">
              <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">
                <i class="bi bi-play-circle-fill text-white" style="font-size:2.5rem;opacity:.85"></i>
              </div>
              ${watched ? '<span class="badge bg-success position-absolute top-0 end-0 m-2"><i class="bi bi-check-lg"></i> \u05E0\u05E6\u05E4\u05D4</span>' : ''}
              <span class="badge bg-dark bg-opacity-75 position-absolute bottom-0 end-0 m-2">${v.duration}</span>
            </div>
            <div class="card-body p-2">
              <div class="fw-bold mb-1" style="font-size:.9rem">${v.title}</div>
              <small class="text-muted">${v.desc.slice(0, 60)}...</small>
            </div>
          </div>
        </div>`;
    }).join('');
  },

  /* ---------- progress bars ---------- */
  _vidRenderProgress() {
    const container = document.getElementById('vid-progress-bars');
    if (!container) return;
    const cats = this._vidCategories;
    container.innerHTML = Object.entries(cats).map(([key, cat]) => {
      const vids = this._vidData.filter(v => v.cat === key);
      const total = vids.length;
      const watched = vids.filter(v => this._vidWatched[v.id]).length;
      const pct = total ? Math.round(watched / total * 100) : 0;
      return `
        <div class="mb-3">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span style="font-size:.85rem"><i class="bi ${cat.icon} me-1 text-${cat.color}"></i>${cat.label}</span>
            <small class="text-muted">${watched}/${total}</small>
          </div>
          <div class="progress" style="height:8px">
            <div class="progress-bar bg-${cat.color}" style="width:${pct}%"></div>
          </div>
        </div>`;
    }).join('');
  },

  /* ---------- video grid ---------- */
  _vidRenderGrid() {
    const grid = document.getElementById('vid-grid');
    const empty = document.getElementById('vid-empty');
    if (!grid) return;

    let vids = [...this._vidData];

    // filter by category
    if (this._vidActiveCategory) {
      vids = vids.filter(v => v.cat === this._vidActiveCategory);
    }

    // filter by search
    if (this._vidSearchTerm) {
      const term = this._vidSearchTerm.toLowerCase();
      vids = vids.filter(v =>
        v.title.toLowerCase().includes(term) ||
        v.desc.toLowerCase().includes(term)
      );
    }

    if (!vids.length) {
      grid.innerHTML = '';
      empty?.classList.remove('d-none');
      return;
    }
    empty?.classList.add('d-none');

    grid.innerHTML = vids.map(v => {
      const cat = this._vidCategories[v.cat];
      const watched = this._vidWatched[v.id];
      return `
        <div class="col-sm-6 col-lg-4">
          <div class="card h-100 vid-card ${watched ? 'border-success' : ''}" style="cursor:pointer;transition:transform .15s,box-shadow .15s"
               onmouseenter="this.style.transform='translateY(-3px)';this.style.boxShadow='0 .5rem 1rem rgba(0,0,0,.1)'"
               onmouseleave="this.style.transform='';this.style.boxShadow=''"
               onclick="Pages.vidOpen(${v.id})">
            <!-- Thumbnail -->
            <div style="position:relative;padding-top:56.25%;background:${cat.gradient};border-radius:.375rem .375rem 0 0">
              <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">
                <i class="bi bi-play-circle-fill text-white" style="font-size:2.5rem;opacity:.8;transition:opacity .15s"></i>
              </div>
              ${watched
                ? '<span class="badge bg-success position-absolute top-0 end-0 m-2"><i class="bi bi-check-lg me-1"></i>\u05E0\u05E6\u05E4\u05D4</span>'
                : ''}
              <span class="badge bg-dark bg-opacity-75 position-absolute bottom-0 end-0 m-2"><i class="bi bi-clock me-1"></i>${v.duration}</span>
            </div>
            <!-- Info -->
            <div class="card-body p-3">
              <div class="d-flex align-items-center gap-2 mb-2">
                <span class="badge bg-${cat.color}" style="font-size:.7rem"><i class="bi ${cat.icon} me-1"></i>${cat.label}</span>
              </div>
              <h6 class="card-title mb-1" style="font-size:.9rem">${v.title}</h6>
              <p class="card-text text-muted mb-0" style="font-size:.8rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${v.desc}</p>
            </div>
            <div class="card-footer bg-transparent border-0 pt-0 px-3 pb-3">
              <button class="btn btn-sm ${watched ? 'btn-success' : 'btn-outline-secondary'} w-100" onclick="event.stopPropagation();Pages.vidToggleWatchedById(${v.id})">
                <i class="bi ${watched ? 'bi-check-circle-fill' : 'bi-circle'} me-1"></i>${watched ? '\u05E0\u05E6\u05E4\u05D4' : '\u05E1\u05DE\u05DF \u05DB\u05E0\u05E6\u05E4\u05D4'}
              </button>
            </div>
          </div>
        </div>`;
    }).join('');
  },

  /* ---------- search ---------- */
  vidSearch(val) {
    this._vidSearchTerm = val.trim();
    this._vidRenderGrid();
  },

  /* ---------- filter by category ---------- */
  vidFilterCat(cat) {
    this._vidActiveCategory = cat;
    // update active button
    document.querySelectorAll('.vid-cat-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cat === cat);
    });
    this._vidRenderGrid();
  },

  /* ---------- open player modal ---------- */
  _vidCurrentId: null,
  vidOpen(id) {
    const v = this._vidData.find(d => d.id === id);
    if (!v) return;
    this._vidCurrentId = id;
    const cat = this._vidCategories[v.cat];
    const watched = this._vidWatched[id];

    document.getElementById('vid-player-title').textContent = v.title;
    const badge = document.getElementById('vid-player-badge');
    badge.className = `badge bg-${cat.color}`;
    badge.innerHTML = `<i class="bi ${cat.icon} me-1"></i>${cat.label}`;
    document.getElementById('vid-player-duration').innerHTML = `<i class="bi bi-clock me-1"></i>${v.duration}`;
    document.getElementById('vid-player-desc').textContent = v.desc;

    // watch button state
    const wBtn = document.getElementById('vid-player-watch-btn');
    if (watched) {
      wBtn.className = 'btn btn-sm btn-success';
      wBtn.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i>\u05E0\u05E6\u05E4\u05D4';
    } else {
      wBtn.className = 'btn btn-sm btn-outline-success';
      wBtn.innerHTML = '<i class="bi bi-check-circle me-1"></i>\u05E1\u05DE\u05DF \u05DB\u05E0\u05E6\u05E4\u05D4';
    }

    // related videos (same category, excluding current)
    const related = this._vidData.filter(r => r.cat === v.cat && r.id !== id).slice(0, 3);
    document.getElementById('vid-player-related').innerHTML = related.length
      ? related.map(r => {
        const rWatched = this._vidWatched[r.id];
        return `
          <div class="d-flex align-items-center gap-2 mb-2 p-2 rounded border" style="cursor:pointer" onclick="Pages.vidOpen(${r.id})">
            <div style="width:64px;height:36px;border-radius:4px;background:${cat.gradient};display:flex;align-items:center;justify-content:center;flex-shrink:0">
              <i class="bi bi-play-fill text-white"></i>
            </div>
            <div class="flex-grow-1" style="min-width:0">
              <div class="text-truncate fw-bold" style="font-size:.8rem">${r.title}</div>
              <small class="text-muted">${r.duration}</small>
            </div>
            ${rWatched ? '<i class="bi bi-check-circle-fill text-success"></i>' : ''}
          </div>`;
      }).join('')
      : '<p class="text-muted mb-0" style="font-size:.85rem">\u05D0\u05D9\u05DF \u05E1\u05E8\u05D8\u05D5\u05E0\u05D9\u05DD \u05E7\u05E9\u05D5\u05E8\u05D9\u05DD \u05E0\u05D5\u05E1\u05E4\u05D9\u05DD</p>';

    // show modal
    const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('vid-player-modal'));
    modal.show();
  },

  /* ---------- toggle watched (from modal) ---------- */
  vidToggleWatched() {
    if (!this._vidCurrentId) return;
    this.vidToggleWatchedById(this._vidCurrentId);
    // refresh modal button
    this.vidOpen(this._vidCurrentId);
  },

  /* ---------- toggle watched by id ---------- */
  vidToggleWatchedById(id) {
    if (this._vidWatched[id]) {
      delete this._vidWatched[id];
      App.showToast?.('\u05D4\u05E1\u05E8\u05D8\u05D5\u05DF \u05E1\u05D5\u05DE\u05DF \u05DB\u05DC\u05D0 \u05E0\u05E6\u05E4\u05D4', 'info');
    } else {
      this._vidWatched[id] = true;
      App.showToast?.('\u05E1\u05E8\u05D8\u05D5\u05DF \u05E1\u05D5\u05DE\u05DF \u05DB\u05E0\u05E6\u05E4\u05D4!', 'success');
    }
    // persist
    App.store?.set?.('vid_watched', JSON.stringify(this._vidWatched));
    this._vidRender();
  },
});
