/* ===== BHT v5.3 — Parent Portal ===== */
Object.assign(Pages, {
  parentportal() {
    return `<div class="page-header"><h1><i class="bi bi-people-fill me-2"></i>\u05E4\u05D5\u05E8\u05D8\u05DC \u05D4\u05D5\u05E8\u05D9\u05DD</h1><p>\u05DE\u05DE\u05E9\u05E7 \u05D2\u05D9\u05E9\u05D4 \u05DC\u05D4\u05D5\u05E8\u05D9\u05DD</p></div>
      <div class="row g-3">
        <div class="col-lg-6">
          <div class="card p-4">
            <h5 class="fw-bold mb-3"><i class="bi bi-link-45deg me-2 text-primary"></i>\u05E7\u05D9\u05E9\u05D5\u05E8 \u05DC\u05D8\u05D5\u05E4\u05E1 \u05D4\u05E8\u05E9\u05DE\u05D4</h5>
            <p>\u05E9\u05EA\u05E3 \u05E7\u05D9\u05E9\u05D5\u05E8 \u05D6\u05D4 \u05E2\u05DD \u05D4\u05D5\u05E8\u05D9\u05DD \u05D7\u05D3\u05E9\u05D9\u05DD:</p>
            <div class="input-group mb-3">
              <input class="form-control" id="reg-link" value="${location.origin+location.pathname.replace('index.html','')+'form.html'}" readonly dir="ltr">
              <button class="btn btn-primary" onclick="Utils.copyText(document.getElementById('reg-link').value)"><i class="bi bi-clipboard"></i></button>
            </div>
            <button class="btn btn-success btn-sm" onclick="window.open('https://wa.me/?text='+encodeURIComponent('\u05E9\u05DC\u05D5\u05DD, \u05D4\u05E0\u05D4 \u05E7\u05D9\u05E9\u05D5\u05E8 \u05DC\u05D8\u05D5\u05E4\u05E1 \u05D4\u05E8\u05E9\u05DE\u05D4 \u05DC\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3: '+document.getElementById('reg-link').value))"><i class="bi bi-whatsapp me-1"></i>\u05E9\u05DC\u05D7 \u05D1WhatsApp</button>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card p-4">
            <h5 class="fw-bold mb-3"><i class="bi bi-shield-check me-2 text-success"></i>\u05D2\u05D9\u05E9\u05D4 \u05DC\u05D4\u05D5\u05E8\u05D9\u05DD</h5>
            <p>\u05D1\u05E2\u05EA\u05D9\u05D3, \u05D4\u05D5\u05E8\u05D9\u05DD \u05D9\u05D5\u05DB\u05DC\u05D5:</p>
            <ul>
              <li>\u05DC\u05E6\u05E4\u05D5\u05EA \u05D1\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D4\u05D9\u05DC\u05D3</li>
              <li>\u05DC\u05E8\u05D0\u05D5\u05EA \u05E6\u05D9\u05D5\u05E0\u05D9\u05DD \u05D5\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA</li>
              <li>\u05DC\u05E6\u05E4\u05D5\u05EA \u05D1\u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD</li>
              <li>\u05DC\u05DE\u05DC\u05D0 \u05D8\u05E4\u05E1\u05D9\u05DD \u05D5\u05D0\u05D9\u05E9\u05D5\u05E8\u05D9\u05DD</li>
              <li>\u05DC\u05EA\u05E7\u05E9\u05E8 \u05E2\u05DD \u05D4\u05E6\u05D5\u05D5\u05EA</li>
            </ul>
            <span class="badge bg-warning p-2"><i class="bi bi-clock me-1"></i>\u05D1\u05E4\u05D9\u05EA\u05D5\u05D7</span>
          </div>
        </div>
        <div class="col-12">
          <div class="card p-4">
            <h5 class="fw-bold mb-3"><i class="bi bi-qr-code me-2"></i>QR Code \u05DC\u05D8\u05D5\u05E4\u05E1</h5>
            <p>\u05D4\u05D3\u05E4\u05E1 \u05D5\u05D4\u05D3\u05D1\u05E7 \u05D1\u05DB\u05E0\u05D9\u05E1\u05D4 \u05DC\u05DE\u05D5\u05E1\u05D3:</p>
            <div class="text-center p-4 bg-light rounded" style="max-width:200px;margin:0 auto">
              <div style="font-size:8rem;line-height:1">\uD83D\uDCF1</div>
              <small class="text-muted">\u05E1\u05E8\u05D5\u05E7 \u05DC\u05D8\u05D5\u05E4\u05E1 \u05D4\u05E8\u05E9\u05DE\u05D4</small>
            </div>
          </div>
        </div>
      </div>`;
  },
  parentportalInit() {}
});
