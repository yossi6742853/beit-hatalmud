Object.assign(Pages, {
  email() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div><h1><i class="bi bi-envelope-fill me-2"></i>דואר אלקטרוני</h1><p>תיבת דואר מסונכרנת עם Gmail</p></div>
        <div class="d-flex gap-2">
          <button class="btn btn-primary btn-sm" onclick="Pages.showComposeEmail()"><i class="bi bi-pencil-square me-1"></i>הודעה חדשה</button>
          <button class="btn btn-outline-secondary btn-sm" onclick="Pages.loadEmails()"><i class="bi bi-arrow-clockwise me-1"></i>רענון</button>
        </div>
      </div>
      <div class="row g-3">
        <div class="col-md-4">
          <div class="card p-0">
            <div class="list-group list-group-flush" id="email-folders">
              <a href="#" class="list-group-item list-group-item-action active d-flex justify-content-between" onclick="Pages.loadEmails('INBOX');return false">
                <span><i class="bi bi-inbox me-2"></i>דואר נכנס</span>
                <span class="badge bg-primary" id="inbox-count">--</span>
              </a>
              <a href="#" class="list-group-item list-group-item-action" onclick="Pages.loadEmails('SENT');return false"><i class="bi bi-send me-2"></i>נשלחו</a>
              <a href="#" class="list-group-item list-group-item-action" onclick="Pages.loadEmails('DRAFT');return false"><i class="bi bi-file-earmark me-2"></i>טיוטות</a>
              <a href="#" class="list-group-item list-group-item-action" onclick="Pages.loadEmails('STARRED');return false"><i class="bi bi-star me-2"></i>מסומנים</a>
            </div>
            <div class="p-3"><div class="search-box"><i class="bi bi-search"></i><input class="form-control form-control-sm" id="email-search" placeholder="חפש בדואר..." onkeydown="if(event.key==='Enter')Pages.searchEmails()"></div></div>
          </div>
        </div>
        <div class="col-md-8">
          <div id="email-list">${Utils.skeleton(5)}</div>
          <div id="email-detail" class="d-none"></div>
        </div>
      </div>
      <div class="modal fade" id="compose-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><h5>הודעה חדשה</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body">
        <div class="mb-2"><input class="form-control" id="compose-to" placeholder="אל..." dir="ltr"></div>
        <div class="mb-2"><input class="form-control" id="compose-subject" placeholder="נושא..."></div>
        <div class="mb-2"><textarea class="form-control" id="compose-body" rows="10" placeholder="תוכן ההודעה..."></textarea></div>
      </div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">ביטול</button><button class="btn btn-primary" onclick="Pages.sendEmail()"><i class="bi bi-send me-1"></i>שלח</button></div></div></div></div>`;
  },

  _emailFolder: 'INBOX',
  async emailInit() { this.loadEmails('INBOX'); },

  async loadEmails(folder) {
    if (folder) this._emailFolder = folder;
    document.querySelectorAll('#email-folders .list-group-item').forEach(el => el.classList.remove('active'));
    event?.target?.classList?.add('active');
    document.getElementById('email-detail').classList.add('d-none');
    document.getElementById('email-list').classList.remove('d-none');
    const list = document.getElementById('email-list');
    list.innerHTML = '<div class="text-center py-5"><div class="spinner-border"></div><p class="mt-2 text-muted">טוען דואר...</p></div>';
    try {
      // Use Apps Script API to fetch Gmail
      const url = App.API_URL + '?mode=api&action=gmail_list&folder=' + encodeURIComponent(folder || 'INBOX') + '&token=' + App.API_TOKEN;
      const resp = await fetch(url);
      const json = await resp.json();
      if (json.data && json.data.length) {
        list.innerHTML = json.data.map(t => `
          <div class="card mb-2 card-clickable p-3" onclick="Pages.viewEmail('${t.id}')">
            <div class="d-flex justify-content-between">
              <div class="fw-bold text-truncate" style="max-width:60%">${t.from || ''}</div>
              <small class="text-muted">${t.date || ''}</small>
            </div>
            <div class="text-truncate fw-medium">${t.subject || '(ללא נושא)'}</div>
            <div class="text-muted small text-truncate-2">${t.snippet || ''}</div>
          </div>`).join('');
      } else {
        list.innerHTML = '<div class="empty-state"><i class="bi bi-envelope"></i><h5>אין הודעות</h5><p class="text-muted">התיבה ריקה או לא ניתן להתחבר ל-Gmail</p></div>';
      }
    } catch(e) {
      list.innerHTML = '<div class="empty-state"><i class="bi bi-wifi-off"></i><h5>לא ניתן להתחבר</h5><p class="text-muted">בדוק חיבור ל-API. שגיאה: ' + (e.message||'') + '</p></div>';
    }
  },

  async viewEmail(id) {
    document.getElementById('email-list').classList.add('d-none');
    const detail = document.getElementById('email-detail');
    detail.classList.remove('d-none');
    detail.innerHTML = '<div class="text-center py-5"><div class="spinner-border"></div></div>';
    try {
      const url = App.API_URL + '?mode=api&action=gmail_get&id=' + encodeURIComponent(id) + '&token=' + App.API_TOKEN;
      const resp = await fetch(url);
      const json = await resp.json();
      const t = json.data || {};
      detail.innerHTML = `
        <div class="card p-3">
          <button class="btn btn-link text-decoration-none mb-2 align-self-start" onclick="Pages.loadEmails()"><i class="bi bi-arrow-right me-1"></i>חזרה</button>
          <h5 class="fw-bold">${t.subject || '(ללא נושא)'}</h5>
          <div class="d-flex justify-content-between text-muted small mb-3"><span>מאת: ${t.from||''}</span><span>${t.date||''}</span></div>
          <hr>
          <div class="email-body" style="white-space:pre-wrap;line-height:1.8">${t.body || t.snippet || ''}</div>
          <hr>
          <div class="d-flex gap-2 mt-2">
            <button class="btn btn-outline-primary btn-sm" onclick="document.getElementById('compose-to').value='${(t.from||'').replace(/'/g,'')}';Pages.showComposeEmail()"><i class="bi bi-reply me-1"></i>השב</button>
            <button class="btn btn-outline-success btn-sm" onclick="Pages.forwardEmail('${t.subject||''}','${(t.body||t.snippet||'').substring(0,100).replace(/'/g,'')}')"><i class="bi bi-forward me-1"></i>העבר</button>
          </div>
        </div>`;
    } catch(e) { detail.innerHTML = '<div class="alert alert-danger">שגיאה בטעינה</div>'; }
  },

  async searchEmails() {
    const q = document.getElementById('email-search')?.value?.trim();
    if (!q) return;
    const list = document.getElementById('email-list');
    list.innerHTML = '<div class="text-center py-3"><div class="spinner-border"></div></div>';
    try {
      const url = App.API_URL + '?mode=api&action=gmail_search&q=' + encodeURIComponent(q) + '&token=' + App.API_TOKEN;
      const resp = await fetch(url);
      const json = await resp.json();
      if (json.data?.length) {
        list.innerHTML = json.data.map(t => `<div class="card mb-2 card-clickable p-3" onclick="Pages.viewEmail('${t.id}')"><div class="fw-bold">${t.from||''}</div><div>${t.subject||''}</div><small class="text-muted">${t.snippet||''}</small></div>`).join('');
      } else { list.innerHTML = '<div class="text-muted text-center py-3">לא נמצאו תוצאות</div>'; }
    } catch(e) { list.innerHTML = '<div class="alert alert-danger">שגיאה בחיפוש</div>'; }
  },

  showComposeEmail() { new bootstrap.Modal(document.getElementById('compose-modal')).show(); },
  forwardEmail(subject, body) { document.getElementById('compose-subject').value = 'Fwd: ' + subject; document.getElementById('compose-body').value = '\n\n---\n' + body; this.showComposeEmail(); },

  async sendEmail() {
    const to = document.getElementById('compose-to').value.trim();
    const subject = document.getElementById('compose-subject').value.trim();
    const body = document.getElementById('compose-body').value.trim();
    if (!to || !subject) { Utils.toast('חסר נמען או נושא','warning'); return; }
    try {
      await App.apiCall('sendEmail','', {to, subject, body});
      bootstrap.Modal.getInstance(document.getElementById('compose-modal'))?.hide();
      Utils.toast('הודעה נשלחה!');
    } catch(e) { Utils.toast('שגיאה בשליחה','danger'); }
  }
});
