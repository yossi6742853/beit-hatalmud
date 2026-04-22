/* ===== BHT v5.3 — Medical Records (רפואה) ===== */
Object.assign(Pages, {
  medical() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div><h1><i class="bi bi-heart-pulse-fill me-2"></i>מידע רפואי</h1><p>ניהול תיקים רפואיים, אלרגיות והתראות</p></div>
      <div class="d-flex gap-2">
        <button class="btn btn-primary btn-sm" onclick="Pages.showMedicalForm()"><i class="bi bi-plus-lg me-1"></i>הוסף רשומה</button>
        <button class="btn btn-outline-success btn-sm" onclick="Pages.exportMedicalSummary()"><i class="bi bi-download me-1"></i>ייצוא סיכום</button>
      </div>
    </div>
    <div class="row g-3 mb-3">
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-primary" id="med-total">0</div><small>סה"כ רשומות</small></div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-danger" id="med-allergies">0</div><small>אלרגיות</small></div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-warning" id="med-meds">0</div><small>תרופות קבועות</small></div></div>
      <div class="col-6 col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-info" id="med-updated">-</div><small>עדכון אחרון</small></div></div>
    </div>
    <div id="med-alerts" class="mb-3"></div>
    <div class="card p-3 mb-3"><div class="row g-2"><div class="col-md-6"><div class="search-box"><i class="bi bi-search"></i><input class="form-control" id="med-search" placeholder="חיפוש תלמיד..."></div></div><div class="col-md-3"><select class="form-select" id="med-filter-blood"><option value="">כל סוגי הדם</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option><option>O+</option><option>O-</option></select></div><div class="col-md-3"><select class="form-select" id="med-filter-alert"><option value="">הכל</option><option value="critical">התראות בלבד</option></select></div></div></div>
    <div id="med-list">${Utils.skeleton(4)}</div>`;
  },

  _medData: null,
  _MED_STORAGE_KEY: 'bht_medical_data',

  _medDemoData() {
    return [
      { id: 'm1', studentName: 'יוסף כהן', bloodType: 'A+', allergies: ['בוטנים','אגוזים'], medications: ['אפיפן'], conditions: ['אסטמה'], emergencyName: 'אברהם כהן', emergencyPhone: '0501234567', insurance: 'כללית', policyNumber: '12345678', notes: 'יש לשמור אפיפן בהישג יד בכל עת', critical: true, updated: '2026-04-20' },
      { id: 'm2', studentName: 'משה לוי', bloodType: 'O+', allergies: [], medications: ['ריטלין'], conditions: ['הפרעת קשב'], emergencyName: 'דוד לוי', emergencyPhone: '0521234567', insurance: 'מכבי', policyNumber: '23456789', notes: 'נוטל ריטלין בבוקר', critical: false, updated: '2026-04-18' },
      { id: 'm3', studentName: 'אברהם גולדשטיין', bloodType: 'B+', allergies: ['גלוטן','חלב'], medications: [], conditions: ['צליאק'], emergencyName: 'יצחק גולדשטיין', emergencyPhone: '0531234567', insurance: 'כללית', policyNumber: '34567890', notes: 'דיאטה ללא גלוטן - לתאם עם המטבח', critical: true, updated: '2026-04-15' },
      { id: 'm4', studentName: 'דוד פרידמן', bloodType: 'AB+', allergies: ['פניצילין'], medications: [], conditions: [], emergencyName: 'שמואל פרידמן', emergencyPhone: '0541234567', insurance: 'לאומית', policyNumber: '45678901', notes: '', critical: false, updated: '2026-04-10' },
      { id: 'm5', studentName: 'יצחק ברגר', bloodType: 'A-', allergies: ['דבורים','צרעות'], medications: ['אפיפן'], conditions: ['אלרגיה חמורה לעקיצות'], emergencyName: 'מנחם ברגר', emergencyPhone: '0551234567', insurance: 'מכבי', policyNumber: '56789012', notes: 'סכנת אנפילקסיס - חובה אפיפן בטיולים', critical: true, updated: '2026-04-19' },
      { id: 'm6', studentName: 'שמעון ויס', bloodType: 'O-', allergies: [], medications: ['אינסולין'], conditions: ['סוכרת סוג 1'], emergencyName: 'חיים ויס', emergencyPhone: '0561234567', insurance: 'כללית', policyNumber: '67890123', notes: 'בדיקת סוכר לפני ארוחות, משאבת אינסולין', critical: true, updated: '2026-04-21' },
      { id: 'm7', studentName: 'נתן שפירא', bloodType: 'B-', allergies: ['אספירין'], medications: [], conditions: [], emergencyName: 'אליהו שפירא', emergencyPhone: '0571234567', insurance: 'מאוחדת', policyNumber: '78901234', notes: '', critical: false, updated: '2026-03-28' },
      { id: 'm8', studentName: 'אליהו רוזנברג', bloodType: 'A+', allergies: ['ביצים','סויה'], medications: ['ונטולין'], conditions: ['אסטמה'], emergencyName: 'מרדכי רוזנברג', emergencyPhone: '0581234567', insurance: 'מכבי', policyNumber: '89012345', notes: 'משאף חירום בתיק', critical: false, updated: '2026-04-12' }
    ];
  },

  _getMedData() {
    if (this._medData !== null) return this._medData;
    const stored = localStorage.getItem(this._MED_STORAGE_KEY);
    if (stored) {
      try { this._medData = JSON.parse(stored); return this._medData; } catch(e) {}
    }
    this._medData = this._medDemoData();
    this._saveMedData();
    return this._medData;
  },

  _saveMedData() {
    localStorage.setItem(this._MED_STORAGE_KEY, JSON.stringify(this._medData));
  },

  async medicalInit() {
    this._medData = null; // force reload from storage
    const data = this._getMedData();
    document.getElementById('med-search').addEventListener('input', Utils.debounce(() => this.renderMedical(), 200));
    document.getElementById('med-filter-blood').addEventListener('change', () => this.renderMedical());
    document.getElementById('med-filter-alert').addEventListener('change', () => this.renderMedical());
    this.renderMedical();
  },

  renderMedical() {
    const data = this._getMedData();
    const search = (document.getElementById('med-search')?.value || '').trim().toLowerCase();
    const bloodF = document.getElementById('med-filter-blood')?.value || '';
    const alertF = document.getElementById('med-filter-alert')?.value || '';

    let filtered = data.filter(r => {
      if (search && !r.studentName.toLowerCase().includes(search)) return false;
      if (bloodF && r.bloodType !== bloodF) return false;
      if (alertF === 'critical' && !r.critical) return false;
      return true;
    });

    // Stats
    const totalAllergies = data.reduce((s, r) => s + r.allergies.length, 0);
    const totalMeds = data.filter(r => r.medications.length > 0).length;
    const lastUpdate = data.reduce((max, r) => r.updated > max ? r.updated : max, '');
    document.getElementById('med-total').textContent = data.length;
    document.getElementById('med-allergies').textContent = totalAllergies;
    document.getElementById('med-meds').textContent = totalMeds;
    document.getElementById('med-updated').textContent = lastUpdate ? Utils.formatDateShort(lastUpdate) : '-';

    // Critical alerts
    const critical = data.filter(r => r.critical);
    const alertsEl = document.getElementById('med-alerts');
    if (critical.length > 0) {
      alertsEl.innerHTML = `<div class="card border-danger p-3"><h6 class="fw-bold text-danger mb-2"><i class="bi bi-exclamation-triangle-fill me-2"></i>התראות רפואיות (${critical.length})</h6><div class="row g-2">${critical.map(r => `<div class="col-md-6"><div class="alert alert-danger py-2 px-3 mb-0 d-flex align-items-center gap-2"><i class="bi bi-heart-pulse text-danger"></i><div><strong>${r.studentName}</strong><br><small>${r.allergies.length ? 'אלרגיות: ' + r.allergies.join(', ') : ''}${r.conditions.length ? (r.allergies.length ? ' | ' : '') + r.conditions.join(', ') : ''}</small></div></div></div>`).join('')}</div></div>`;
    } else {
      alertsEl.innerHTML = '';
    }

    // Cards
    if (filtered.length === 0) {
      document.getElementById('med-list').innerHTML = `<div class="empty-state"><i class="bi bi-heart-pulse"></i><h5>לא נמצאו רשומות רפואיות</h5></div>`;
      return;
    }

    const allergyColors = { 'בוטנים': 'danger', 'אגוזים': 'danger', 'גלוטן': 'warning', 'חלב': 'info', 'ביצים': 'warning', 'סויה': 'secondary', 'פניצילין': 'danger', 'דבורים': 'danger', 'צרעות': 'danger', 'אספירין': 'warning' };

    document.getElementById('med-list').innerHTML = `<div class="row g-3">${filtered.map(r => {
      const allergyBadges = r.allergies.map(a => {
        const color = allergyColors[a] || 'secondary';
        return `<span class="badge bg-${color} me-1">${a}</span>`;
      }).join('');
      const medBadges = r.medications.map(m => `<span class="badge bg-info me-1"><i class="bi bi-capsule me-1"></i>${m}</span>`).join('');
      const condBadges = r.conditions.map(c => `<span class="badge bg-dark me-1">${c}</span>`).join('');
      const borderClass = r.critical ? 'border-danger border-2' : '';

      return `<div class="col-md-6 col-lg-4"><div class="card p-3 ${borderClass}">
        <div class="d-flex align-items-center gap-3 mb-2">
          ${Utils.avatarHTML(r.studentName)}
          <div class="flex-grow-1">
            <div class="fw-bold">${r.studentName}${r.critical ? ' <i class="bi bi-exclamation-triangle-fill text-danger" title="התראה רפואית"></i>' : ''}</div>
            <small class="text-muted">סוג דם: <span class="badge bg-primary">${r.bloodType}</span></small>
          </div>
          <div class="d-flex gap-1">
            <button class="btn btn-sm btn-outline-primary" onclick="Pages.showMedicalForm(Pages._getMedData().find(x=>x.id==='${r.id}'))" title="עריכה"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-sm btn-outline-danger" onclick="Pages.deleteMedical('${r.id}')" title="מחיקה"><i class="bi bi-trash"></i></button>
          </div>
        </div>
        ${r.allergies.length ? `<div class="mb-1"><small class="text-muted">אלרגיות:</small> ${allergyBadges}</div>` : ''}
        ${r.medications.length ? `<div class="mb-1"><small class="text-muted">תרופות:</small> ${medBadges}</div>` : ''}
        ${r.conditions.length ? `<div class="mb-1"><small class="text-muted">מצבים:</small> ${condBadges}</div>` : ''}
        <div class="border-top pt-2 mt-2 d-flex justify-content-between align-items-center">
          <small class="text-muted"><i class="bi bi-telephone me-1"></i>${r.emergencyName} - ${Utils.formatPhone(r.emergencyPhone)}</small>
          <small class="text-muted"><i class="bi bi-shield-check me-1"></i>${r.insurance}</small>
        </div>
        ${r.notes ? `<div class="mt-1"><small class="text-muted fst-italic"><i class="bi bi-sticky me-1"></i>${r.notes}</small></div>` : ''}
        <div class="text-end mt-1"><small class="text-muted">עודכן: ${Utils.formatDateShort(r.updated)}</small></div>
      </div></div>`;
    }).join('')}</div>`;
  },

  showMedicalForm(record = null) {
    const title = record ? 'עריכת רשומה רפואית' : 'הוספת רשומה רפואית';
    const allergiesVal = record ? record.allergies.join(', ') : '';
    const medsVal = record ? record.medications.join(', ') : '';
    const condsVal = record ? record.conditions.join(', ') : '';

    const html = `<div class="modal fade" id="med-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><h5>${title}</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body">
      <div class="row g-3">
        <div class="col-md-8"><label class="form-label">שם תלמיד</label><input class="form-control" id="mf-name" value="${record?.studentName || ''}" placeholder="שם פרטי ומשפחה"></div>
        <div class="col-md-4"><label class="form-label">סוג דם</label><select class="form-select" id="mf-blood"><option value="">בחר</option><option ${record?.bloodType==='A+'?'selected':''}>A+</option><option ${record?.bloodType==='A-'?'selected':''}>A-</option><option ${record?.bloodType==='B+'?'selected':''}>B+</option><option ${record?.bloodType==='B-'?'selected':''}>B-</option><option ${record?.bloodType==='AB+'?'selected':''}>AB+</option><option ${record?.bloodType==='AB-'?'selected':''}>AB-</option><option ${record?.bloodType==='O+'?'selected':''}>O+</option><option ${record?.bloodType==='O-'?'selected':''}>O-</option></select></div>
        <div class="col-12"><label class="form-label">אלרגיות <small class="text-muted">(הפרד בפסיקים)</small></label><input class="form-control" id="mf-allergies" value="${allergiesVal}" placeholder="בוטנים, גלוטן, חלב..."><div id="mf-allergy-tags" class="d-flex flex-wrap gap-1 mt-1"></div></div>
        <div class="col-12"><label class="form-label">תרופות <small class="text-muted">(הפרד בפסיקים)</small></label><input class="form-control" id="mf-meds" value="${medsVal}" placeholder="ריטלין, אפיפן..."></div>
        <div class="col-12"><label class="form-label">מצבים כרוניים <small class="text-muted">(הפרד בפסיקים)</small></label><input class="form-control" id="mf-conditions" value="${condsVal}" placeholder="אסטמה, סוכרת..."></div>
        <div class="col-md-6"><label class="form-label">איש קשר חירום</label><input class="form-control" id="mf-emname" value="${record?.emergencyName || ''}"></div>
        <div class="col-md-6"><label class="form-label">טלפון חירום</label><input class="form-control" id="mf-emphone" dir="ltr" value="${record?.emergencyPhone || ''}" placeholder="050-1234567"></div>
        <div class="col-md-6"><label class="form-label">חברת ביטוח</label><input class="form-control" id="mf-insurance" value="${record?.insurance || ''}"></div>
        <div class="col-md-6"><label class="form-label">מספר פוליסה</label><input class="form-control" id="mf-policy" dir="ltr" value="${record?.policyNumber || ''}"></div>
        <div class="col-12"><label class="form-label">הערות</label><textarea class="form-control" id="mf-notes" rows="2">${record?.notes || ''}</textarea></div>
        <div class="col-12"><div class="form-check"><input class="form-check-input" type="checkbox" id="mf-critical" ${record?.critical?'checked':''}><label class="form-check-label text-danger fw-bold" for="mf-critical"><i class="bi bi-exclamation-triangle me-1"></i>סמן כהתראה קריטית</label></div></div>
      </div>
    </div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">ביטול</button><button class="btn btn-primary" onclick="Pages.saveMedical('${record?.id || ''}')">שמירה</button></div></div></div></div>`;

    document.getElementById('med-modal')?.remove();
    document.body.insertAdjacentHTML('beforeend', html);

    // Live allergy tag preview
    const allergyInput = document.getElementById('mf-allergies');
    const updateTags = () => {
      const tags = allergyInput.value.split(',').map(t => t.trim()).filter(Boolean);
      const allergyColors = { 'בוטנים': 'danger', 'אגוזים': 'danger', 'גלוטן': 'warning', 'חלב': 'info', 'ביצים': 'warning', 'סויה': 'secondary', 'פניצילין': 'danger', 'דבורים': 'danger', 'צרעות': 'danger', 'אספירין': 'warning' };
      document.getElementById('mf-allergy-tags').innerHTML = tags.map(t => `<span class="badge bg-${allergyColors[t] || 'secondary'}">${t}</span>`).join('');
    };
    allergyInput.addEventListener('input', updateTags);
    updateTags();

    new bootstrap.Modal(document.getElementById('med-modal')).show();
  },

  saveMedical(existingId) {
    const name = document.getElementById('mf-name').value.trim();
    if (!name) { Utils.toast('נא להזין שם תלמיד', 'warning'); return; }

    const parseList = (val) => val.split(',').map(s => s.trim()).filter(Boolean);

    const record = {
      id: existingId || 'm' + Date.now(),
      studentName: name,
      bloodType: document.getElementById('mf-blood').value,
      allergies: parseList(document.getElementById('mf-allergies').value),
      medications: parseList(document.getElementById('mf-meds').value),
      conditions: parseList(document.getElementById('mf-conditions').value),
      emergencyName: document.getElementById('mf-emname').value.trim(),
      emergencyPhone: document.getElementById('mf-emphone').value.trim(),
      insurance: document.getElementById('mf-insurance').value.trim(),
      policyNumber: document.getElementById('mf-policy').value.trim(),
      notes: document.getElementById('mf-notes').value.trim(),
      critical: document.getElementById('mf-critical').checked,
      updated: Utils.todayISO()
    };

    const data = this._getMedData();
    if (existingId) {
      const idx = data.findIndex(r => r.id === existingId);
      if (idx >= 0) data[idx] = record;
    } else {
      data.push(record);
    }
    this._saveMedData();

    bootstrap.Modal.getInstance(document.getElementById('med-modal')).hide();
    Utils.toast(existingId ? 'רשומה עודכנה' : 'רשומה נוספה', 'success');
    this.renderMedical();
  },

  async deleteMedical(id) {
    if (!await Utils.confirm('מחיקת רשומה', 'האם למחוק את הרשומה הרפואית?')) return;
    const data = this._getMedData();
    const idx = data.findIndex(r => r.id === id);
    if (idx >= 0) data.splice(idx, 1);
    this._saveMedData();
    Utils.toast('רשומה נמחקה');
    this.renderMedical();
  },

  exportMedicalSummary() {
    const data = this._getMedData();
    if (!data.length) { Utils.toast('אין נתונים לייצוא', 'warning'); return; }

    let csv = '\uFEFF' + 'שם תלמיד,סוג דם,אלרגיות,תרופות,מצבים כרוניים,איש קשר חירום,טלפון חירום,ביטוח,פוליסה,התראה קריטית,הערות\n';
    data.forEach(r => {
      csv += `"${r.studentName}","${r.bloodType}","${r.allergies.join('; ')}","${r.medications.join('; ')}","${r.conditions.join('; ')}","${r.emergencyName}","${r.emergencyPhone}","${r.insurance}","${r.policyNumber}","${r.critical ? 'כן' : 'לא'}","${r.notes}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'medical_summary_' + Utils.todayISO() + '.csv';
    link.click();
    Utils.toast('סיכום רפואי יוצא בהצלחה');
  }
});
