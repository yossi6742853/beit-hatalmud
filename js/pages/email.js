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
  _demoEmails: [
    {id:'1', from:'\u05D9\u05E2\u05E7\u05D1 \u05DB\u05D4\u05DF (\u05D4\u05D5\u05E8\u05D4)', subject:'\u05E9\u05D0\u05DC\u05D4 \u05DC\u05D2\u05D1\u05D9 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D4\u05D1\u05DF', snippet:'\u05E9\u05DC\u05D5\u05DD, \u05E8\u05E6\u05D9\u05EA\u05D9 \u05DC\u05D1\u05E8\u05E8 \u05DC\u05D2\u05D1\u05D9 \u05D7\u05D9\u05E1\u05D5\u05E8 \u05E9\u05DC \u05D4\u05D1\u05DF \u05E9\u05DC\u05D9 \u05D1\u05D9\u05D5\u05DD \u05E9\u05DC\u05D9\u05E9\u05D9...', date:'21/04/2026', body:'\u05E9\u05DC\u05D5\u05DD \u05D4\u05E8\u05D1,\n\u05E8\u05E6\u05D9\u05EA\u05D9 \u05DC\u05D1\u05E8\u05E8 \u05DC\u05D2\u05D1\u05D9 \u05D7\u05D9\u05E1\u05D5\u05E8 \u05E9\u05DC \u05D4\u05D1\u05DF \u05E9\u05DC\u05D9 \u05D9\u05D5\u05E1\u05E3 \u05D1\u05D9\u05D5\u05DD \u05E9\u05DC\u05D9\u05E9\u05D9 \u05D4\u05D0\u05D7\u05E8\u05D5\u05DF.\n\u05D4\u05D5\u05D0 \u05D4\u05D9\u05D4 \u05D7\u05D5\u05DC\u05D4 \u05D5\u05DC\u05D0 \u05D9\u05DB\u05D5\u05DC\u05EA\u05D9 \u05DC\u05D4\u05D5\u05D3\u05D9\u05E2 \u05DE\u05E8\u05D0\u05E9.\n\u05D0\u05E9\u05DE\u05D7 \u05DC\u05E7\u05D1\u05DC \u05D0\u05D9\u05E9\u05D5\u05E8 \u05E9\u05D4\u05D7\u05D9\u05E1\u05D5\u05E8 \u05E0\u05E8\u05E9\u05DD.\n\u05D1\u05EA\u05D5\u05D3\u05D4,\n\u05D9\u05E2\u05E7\u05D1 \u05DB\u05D4\u05DF'},
    {id:'2', from:'\u05DE\u05E9\u05E8\u05D3 \u05D4\u05D7\u05D9\u05E0\u05D5\u05DA', subject:'\u05E2\u05D3\u05DB\u05D5\u05DF \u05EA\u05E7\u05E0\u05D5\u05EA \u05D1\u05D8\u05D9\u05D7\u05D5\u05EA \u05EA\u05E9\u05E4"\u05D5', snippet:'\u05DE\u05E6"\u05D1 \u05E2\u05D3\u05DB\u05D5\u05DF \u05EA\u05E7\u05E0\u05D5\u05EA \u05D4\u05D1\u05D8\u05D9\u05D7\u05D5\u05EA \u05D4\u05D7\u05D3\u05E9\u05D5\u05EA...', date:'20/04/2026', body:'\u05E9\u05DC\u05D5\u05DD \u05E8\u05D1,\n\u05DE\u05E6\u05D5\u05E8\u05E3 \u05E2\u05D3\u05DB\u05D5\u05DF \u05EA\u05E7\u05E0\u05D5\u05EA \u05D4\u05D1\u05D8\u05D9\u05D7\u05D5\u05EA \u05DC\u05E9\u05E0\u05EA \u05EA\u05E9\u05E4"\u05D5.\n\u05E0\u05D0 \u05DC\u05E2\u05D9\u05D9\u05DF \u05D5\u05DC\u05D7\u05EA\u05D5\u05DD.\n\u05D1\u05D1\u05E8\u05DB\u05D4,\n\u05D0\u05D2\u05E3 \u05D1\u05DB\u05D9\u05E8 \u05DC\u05D1\u05D9\u05D8\u05D7\u05D5\u05DF \u05D5\u05D1\u05D8\u05D9\u05D7\u05D5\u05EA'},
    {id:'3', from:'\u05E8\u05D7\u05DC \u05DC\u05D5\u05D9 (\u05DE\u05D5\u05E8\u05D4)', subject:'\u05D1\u05E7\u05E9\u05D4 \u05DC\u05E4\u05D2\u05D9\u05E9\u05D4 \u05E2\u05DD \u05D4\u05DE\u05D7\u05E0\u05DA', snippet:'\u05D0\u05E9\u05DE\u05D7 \u05DC\u05EA\u05D0\u05DD \u05E4\u05D2\u05D9\u05E9\u05D4 \u05E2\u05DD \u05D4\u05E8\u05D1 \u05D1\u05E0\u05D5\u05E9\u05D0 \u05D4\u05EA\u05E7\u05D3\u05DE\u05D5\u05EA \u05E9\u05DC \u05D3\u05D5\u05D3...', date:'20/04/2026', body:'\u05E9\u05DC\u05D5\u05DD,\n\u05D0\u05E9\u05DE\u05D7 \u05DC\u05EA\u05D0\u05DD \u05E4\u05D2\u05D9\u05E9\u05D4 \u05E2\u05DD \u05D4\u05E8\u05D1 \u05D1\u05E0\u05D5\u05E9\u05D0 \u05D4\u05EA\u05E7\u05D3\u05DE\u05D5\u05EA \u05E9\u05DC \u05D3\u05D5\u05D3.\n\u05D4\u05D5\u05D0 \u05E2\u05D5\u05DE\u05D3 \u05DC\u05E2\u05D1\u05D5\u05E8 \u05DC\u05DB\u05D9\u05EA\u05D4 \u05D0 \u05D5\u05E8\u05E6\u05D9\u05E0\u05D5 \u05DC\u05D3\u05D1\u05E8 \u05E2\u05DC \u05D4\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD.\n\u05EA\u05D5\u05D3\u05D4,\n\u05E8\u05D7\u05DC \u05DC\u05D5\u05D9'},
    {id:'4', from:'\u05E1\u05E4\u05E7 \u05D4\u05E1\u05E4\u05E8\u05D9\u05DD "\u05D0\u05D5\u05E8 \u05D4\u05D7\u05D9\u05D9\u05DD"', subject:'\u05D7\u05E9\u05D1\u05D5\u05E0\u05D9\u05EA \u05D7\u05D5\u05D3\u05E9\u05D9\u05EA - \u05D0\u05E4\u05E8\u05D9\u05DC 2026', snippet:'\u05DE\u05E6"\u05D1 \u05D7\u05E9\u05D1\u05D5\u05E0\u05D9\u05EA \u05DC\u05D7\u05D5\u05D3\u05E9 \u05D0\u05E4\u05E8\u05D9\u05DC \u05E2\u05D1\u05D5\u05E8 \u05D4\u05D6\u05DE\u05E0\u05EA \u05E1\u05E4\u05E8\u05D9\u05DD...', date:'19/04/2026', body:'\u05E9\u05DC\u05D5\u05DD \u05E8\u05D1,\n\u05DE\u05E6\u05D5\u05E8\u05E4\u05EA \u05D7\u05E9\u05D1\u05D5\u05E0\u05D9\u05EA \u05DC\u05D7\u05D5\u05D3\u05E9 \u05D0\u05E4\u05E8\u05D9\u05DC 2026.\n\u05E1\u05D4"\u05DB \u05DC\u05EA\u05E9\u05DC\u05D5\u05DD: 3,450 \u05E9"\u05D7\n\u05E0\u05D0 \u05DC\u05D4\u05E1\u05D3\u05D9\u05E8 \u05EA\u05E9\u05DC\u05D5\u05DD \u05E2\u05D3 \u05D4-25 \u05DC\u05D7\u05D5\u05D3\u05E9.\n\u05D1\u05D1\u05E8\u05DB\u05D4,\n\u05E1\u05E4\u05E7 \u05D0\u05D5\u05E8 \u05D4\u05D7\u05D9\u05D9\u05DD'},
    {id:'5', from:'\u05D4\u05E8\u05D1 \u05D9\u05E8\u05D5\u05E9\u05DC\u05DE\u05D9 (\u05E8\u05D0\u05E9 \u05D4\u05DE\u05D5\u05E1\u05D3)', subject:'\u05E1\u05D3\u05E8 \u05D9\u05D5\u05DD \u05DC\u05D9\u05DE\u05D5\u05D3\u05D9\u05DD - \u05E9\u05D9\u05E0\u05D5\u05D9\u05D9\u05DD', snippet:'\u05DC\u05EA\u05E9\u05D5\u05DE\u05EA \u05DC\u05D1 \u05D4\u05E6\u05D5\u05D5\u05EA - \u05E9\u05D9\u05E0\u05D5\u05D9\u05D9\u05DD \u05D1\u05E1\u05D3\u05E8 \u05D9\u05D5\u05DD \u05D4\u05DC\u05D9\u05DE\u05D5\u05D3\u05D9\u05DD...', date:'19/04/2026', body:'\u05E6\u05D5\u05D5\u05EA \u05D4\u05DE\u05D5\u05E1\u05D3 \u05D4\u05D9\u05E7\u05E8,\n\n\u05DC\u05EA\u05E9\u05D5\u05DE\u05EA \u05DC\u05D1 - \u05D4\u05D7\u05DC \u05DE\u05D9\u05D5\u05DD \u05E8\u05D0\u05E9\u05D5\u05DF \u05D9\u05D7\u05D5\u05DC \u05E9\u05D9\u05E0\u05D5\u05D9 \u05D1\u05E1\u05D3\u05E8 \u05D9\u05D5\u05DD:\n\n08:00-09:30 \u05D2\u05DE\u05E8\u05D0 - \u05DB\u05D9\u05EA\u05D4 \u05D0\n09:45-11:15 \u05D4\u05DC\u05DB\u05D4 - \u05DB\u05D9\u05EA\u05D4 \u05D1\n11:30-13:00 \u05DE\u05E9\u05E0\u05D4 - \u05DB\u05D9\u05EA\u05D4 \u05D0\n\n\u05D1\u05D1\u05E8\u05DB\u05D4,\n\u05D4\u05E8\u05D1 \u05D9\u05E8\u05D5\u05E9\u05DC\u05DE\u05D9'},
    {id:'6', from:'\u05D0\u05D1\u05E8\u05D4\u05DD \u05DC\u05D5\u05D9 (\u05D4\u05D5\u05E8\u05D4)', subject:'\u05D0\u05D9\u05E9\u05D5\u05E8 \u05D8\u05D9\u05D5\u05DC \u05E9\u05E0\u05EA\u05D9', snippet:'\u05D0\u05E0\u05D9 \u05DE\u05D0\u05E9\u05E8 \u05D0\u05EA \u05D4\u05E9\u05EA\u05EA\u05E4\u05D5\u05EA \u05E9\u05DC \u05D4\u05D1\u05DF \u05D1\u05D8\u05D9\u05D5\u05DC \u05D4\u05E9\u05E0\u05EA\u05D9...', date:'18/04/2026', body:'\u05E9\u05DC\u05D5\u05DD,\n\u05D0\u05E0\u05D9 \u05DE\u05D0\u05E9\u05E8 \u05D0\u05EA \u05D4\u05E9\u05EA\u05EA\u05E4\u05D5\u05EA \u05E9\u05DC \u05D4\u05D1\u05DF \u05DE\u05E9\u05D4 \u05D1\u05D8\u05D9\u05D5\u05DC \u05D4\u05E9\u05E0\u05EA\u05D9.\n\u05DE\u05E6"\u05D1 \u05D8\u05D5\u05E4\u05E1 \u05D0\u05D9\u05E9\u05D5\u05E8 \u05D4\u05D5\u05E8\u05D9\u05DD \u05D7\u05EA\u05D5\u05DD.\n\u05EA\u05D5\u05D3\u05D4,\n\u05D0\u05D1\u05E8\u05D4\u05DD \u05DC\u05D5\u05D9'},
    {id:'7', from:'\u05D7\u05D1\u05E8\u05EA \u05E0\u05D9\u05E7\u05D9\u05D5\u05DF', subject:'\u05D7\u05E9\u05D1\u05D5\u05E0\u05D9\u05EA \u05E9\u05D9\u05E8\u05D5\u05EA\u05D9 \u05E0\u05D9\u05E7\u05D9\u05D5\u05DF - \u05DE\u05E8\u05E5 2026', snippet:'\u05DE\u05E6"\u05D1 \u05D7\u05E9\u05D1\u05D5\u05E0\u05D9\u05EA \u05E9\u05D9\u05E8\u05D5\u05EA\u05D9 \u05E0\u05D9\u05E7\u05D9\u05D5\u05DF \u05DC\u05D7\u05D5\u05D3\u05E9 \u05DE\u05E8\u05E5...', date:'17/04/2026', body:'\u05E9\u05DC\u05D5\u05DD \u05E8\u05D1,\n\u05DE\u05E6\u05D5\u05E8\u05E4\u05EA \u05D7\u05E9\u05D1\u05D5\u05E0\u05D9\u05EA \u05E9\u05D9\u05E8\u05D5\u05EA\u05D9 \u05E0\u05D9\u05E7\u05D9\u05D5\u05DF \u05DC\u05D7\u05D5\u05D3\u05E9 \u05DE\u05E8\u05E5 2026.\n\u05E1\u05D4"\u05DB: 890 \u05E9"\u05D7 (\u05DB\u05D5\u05DC\u05DC \u05DE\u05E2"\u05DE)\n\u05EA\u05E0\u05D0\u05D9 \u05EA\u05E9\u05DC\u05D5\u05DD: 30 \u05D9\u05DE\u05D9\u05DD\n\u05D1\u05D1\u05E8\u05DB\u05D4'},
    {id:'8', from:'\u05DE\u05E9\u05D4 \u05D3\u05D5\u05D3 (\u05E6\u05D5\u05D5\u05EA)', subject:'\u05D3\u05D5"\u05D7 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05E9\u05D1\u05D5\u05E2\u05D9 - \u05E1\u05D9\u05DB\u05D5\u05DD', snippet:'\u05DE\u05E6"\u05D1 \u05D3\u05D5"\u05D7 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05E9\u05D1\u05D5\u05E2\u05D9 \u05DC\u05E2\u05D9\u05D5\u05DF \u05D4\u05E0\u05D4\u05DC\u05D4...', date:'16/04/2026', body:'\u05E9\u05DC\u05D5\u05DD,\n\u05DE\u05E6\u05D5\u05E8\u05E3 \u05D3\u05D5"\u05D7 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05E9\u05D1\u05D5\u05E2\u05D9 \u05DC\u05E1\u05D9\u05DB\u05D5\u05DD \u05D4\u05E0\u05D4\u05DC\u05D4:\n\n\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05DB\u05DC\u05DC\u05D9\u05EA: 94%\n\u05D7\u05D9\u05E1\u05D5\u05E8\u05D9\u05DD \u05DE\u05D0\u05D5\u05E9\u05E8\u05D9\u05DD: 12\n\u05D7\u05D9\u05E1\u05D5\u05E8\u05D9\u05DD \u05DC\u05DC\u05D0 \u05D0\u05D9\u05E9\u05D5\u05E8: 3\n\n\u05D1\u05D1\u05E8\u05DB\u05D4,\n\u05DE\u05E9\u05D4 \u05D3\u05D5\u05D3'}
  ],

  async emailInit() { this.loadEmails('INBOX'); },

  _renderEmailList(emails) {
    return emails.map(t => `
      <div class="card mb-2 card-clickable p-3" onclick="Pages.viewEmail('${t.id}')">
        <div class="d-flex justify-content-between">
          <div class="fw-bold text-truncate" style="max-width:60%">${t.from || ''}</div>
          <small class="text-muted">${t.date || ''}</small>
        </div>
        <div class="text-truncate fw-medium">${t.subject || '(\u05DC\u05DC\u05D0 \u05E0\u05D5\u05E9\u05D0)'}</div>
        <div class="text-muted small text-truncate-2">${t.snippet || ''}</div>
      </div>`).join('');
  },

  async loadEmails(folder) {
    if (folder) this._emailFolder = folder;
    document.querySelectorAll('#email-folders .list-group-item').forEach(el => el.classList.remove('active'));
    event?.target?.classList?.add('active');
    document.getElementById('email-detail').classList.add('d-none');
    document.getElementById('email-list').classList.remove('d-none');
    const list = document.getElementById('email-list');
    list.innerHTML = '<div class="text-center py-5"><div class="spinner-border"></div><p class="mt-2 text-muted">\u05D8\u05D5\u05E2\u05DF \u05D3\u05D5\u05D0\u05E8...</p></div>';
    try {
      const url = App.API_URL + '?mode=api&action=gmail_list&folder=' + encodeURIComponent(folder || 'INBOX') + '&token=' + App.API_TOKEN;
      const resp = await fetch(url);
      const json = await resp.json();
      if (json.data && json.data.length) {
        this._loadedEmails = json.data;
        list.innerHTML = this._renderEmailList(json.data);
        document.getElementById('inbox-count').textContent = json.data.length;
        return;
      }
    } catch(e) { /* fallback to demo */ }
    // Fallback to demo data
    this._loadedEmails = this._demoEmails;
    list.innerHTML = this._renderEmailList(this._demoEmails);
    document.getElementById('inbox-count').textContent = this._demoEmails.length;
  },

  async viewEmail(id) {
    document.getElementById('email-list').classList.add('d-none');
    const detail = document.getElementById('email-detail');
    detail.classList.remove('d-none');
    detail.innerHTML = '<div class="text-center py-5"><div class="spinner-border"></div></div>';
    // Try to find in loaded/demo data first
    const local = (this._loadedEmails || this._demoEmails).find(e => e.id === id);
    if (local && local.body) {
      const t = local;
      detail.innerHTML = this._renderEmailDetail(t);
      return;
    }
    try {
      const url = App.API_URL + '?mode=api&action=gmail_get&id=' + encodeURIComponent(id) + '&token=' + App.API_TOKEN;
      const resp = await fetch(url);
      const json = await resp.json();
      const t = json.data || {};
      detail.innerHTML = this._renderEmailDetail(t);
    } catch(e) {
      detail.innerHTML = '<div class="alert alert-danger">\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05D8\u05E2\u05D9\u05E0\u05D4</div>';
    }
  },

  _renderEmailDetail(t) {
    const fromSafe = (t.from||'').replace(/'/g,"\\'");
    const subjectSafe = (t.subject||'').replace(/'/g,"\\'");
    const bodySafe = (t.body||t.snippet||'').substring(0,100).replace(/'/g,"\\'");
    return `
      <div class="card p-3">
        <button class="btn btn-link text-decoration-none mb-2 align-self-start" onclick="Pages.loadEmails()"><i class="bi bi-arrow-right me-1"></i>\u05D7\u05D6\u05E8\u05D4</button>
        <h5 class="fw-bold">${t.subject || '(\u05DC\u05DC\u05D0 \u05E0\u05D5\u05E9\u05D0)'}</h5>
        <div class="d-flex justify-content-between text-muted small mb-3"><span>\u05DE\u05D0\u05EA: ${t.from||''}</span><span>${t.date||''}</span></div>
        <hr>
        <div class="email-body" style="white-space:pre-wrap;line-height:1.8">${t.body || t.snippet || ''}</div>
        <hr>
        <div class="d-flex gap-2 mt-2">
          <button class="btn btn-outline-primary btn-sm" onclick="document.getElementById('compose-to').value='${fromSafe}';Pages.showComposeEmail()"><i class="bi bi-reply me-1"></i>\u05D4\u05E9\u05D1</button>
          <button class="btn btn-outline-success btn-sm" onclick="Pages.forwardEmail('${subjectSafe}','${bodySafe}')"><i class="bi bi-forward me-1"></i>\u05D4\u05E2\u05D1\u05E8</button>
        </div>
      </div>`;
  },

  async searchEmails() {
    const q = document.getElementById('email-search')?.value?.trim();
    if (!q) { this.loadEmails(); return; }
    const list = document.getElementById('email-list');
    list.innerHTML = '<div class="text-center py-3"><div class="spinner-border"></div></div>';
    try {
      const url = App.API_URL + '?mode=api&action=gmail_search&q=' + encodeURIComponent(q) + '&token=' + App.API_TOKEN;
      const resp = await fetch(url);
      const json = await resp.json();
      if (json.data?.length) {
        this._loadedEmails = json.data;
        list.innerHTML = this._renderEmailList(json.data);
        return;
      }
    } catch(e) { /* fallback to demo filter */ }
    // Filter demo data locally
    const lower = q.toLowerCase();
    const filtered = this._demoEmails.filter(e =>
      (e.from||'').includes(q) || (e.subject||'').includes(q) || (e.snippet||'').includes(q) || (e.body||'').includes(q)
    );
    if (filtered.length) {
      this._loadedEmails = filtered;
      list.innerHTML = this._renderEmailList(filtered);
    } else {
      list.innerHTML = '<div class="text-muted text-center py-3">\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA</div>';
    }
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
