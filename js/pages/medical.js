/* ===== BHT v5.3 — Medical Records (רפואה) — Comprehensive System ===== */
Object.assign(Pages, {
  medical() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
      <div><h1><i class="bi bi-heart-pulse-fill me-2"></i>מידע רפואי</h1><p>ניהול תיקים רפואיים, אלרגיות, חיסונים והתראות</p></div>
      <div class="d-flex gap-2">
        <button class="btn btn-success btn-sm" onclick="Pages.showEventForm()"><i class="bi bi-journal-medical me-1"></i>אירוע רפואי</button>
        <button class="btn btn-primary btn-sm" onclick="Pages.showMedicalForm()"><i class="bi bi-plus-lg me-1"></i>הוסף רשומה</button>
        <button class="btn btn-outline-success btn-sm" onclick="Pages.exportMedicalSummary()"><i class="bi bi-printer me-1"></i>ייצוא סיכום</button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="row g-3 mb-3">
      <div class="col-6 col-md-3">
        <div class="card p-3 text-center border-start border-primary border-3">
          <div class="fs-3 fw-bold text-primary" id="med-total">0</div>
          <small class="text-muted"><i class="bi bi-folder2-open me-1"></i>סה"כ תיקים</small>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card p-3 text-center border-start border-danger border-3">
          <div class="fs-3 fw-bold text-danger" id="med-allergies">0</div>
          <small class="text-muted"><i class="bi bi-exclamation-diamond me-1"></i>אלרגיות</small>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card p-3 text-center border-start border-warning border-3">
          <div class="fs-3 fw-bold text-warning" id="med-meds">0</div>
          <small class="text-muted"><i class="bi bi-capsule me-1"></i>תרופות קבועות</small>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card p-3 text-center border-start border-danger border-3">
          <div class="fs-3 fw-bold text-danger" id="med-critical-count">0</div>
          <small class="text-muted"><i class="bi bi-exclamation-triangle me-1"></i>התראות קריטיות</small>
        </div>
      </div>
    </div>

    <!-- Critical Alerts Panel -->
    <div id="med-alerts" class="mb-3"></div>

    <!-- Tabs -->
    <ul class="nav nav-tabs mb-3" id="med-tabs">
      <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" href="#med-tab-records" onclick="Pages._medActiveTab='records'"><i class="bi bi-people me-1"></i>תיקים רפואיים</a></li>
      <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#med-tab-events" onclick="Pages._medActiveTab='events'"><i class="bi bi-journal-medical me-1"></i>יומן אירועים</a></li>
      <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#med-tab-vaccines" onclick="Pages._medActiveTab='vaccines'"><i class="bi bi-shield-check me-1"></i>מעקב חיסונים</a></li>
    </ul>

    <div class="tab-content">
      <!-- Records Tab -->
      <div class="tab-pane fade show active" id="med-tab-records">
        <div class="card p-3 mb-3">
          <div class="row g-2">
            <div class="col-md-5">
              <div class="search-box"><i class="bi bi-search"></i><input class="form-control" id="med-search" placeholder="חיפוש תלמיד..."></div>
            </div>
            <div class="col-md-3">
              <select class="form-select" id="med-filter-blood">
                <option value="">כל סוגי הדם</option>
                <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
              </select>
            </div>
            <div class="col-md-2">
              <select class="form-select" id="med-filter-alert">
                <option value="">הכל</option>
                <option value="critical">התראות בלבד</option>
                <option value="allergies">עם אלרגיות</option>
                <option value="meds">עם תרופות</option>
              </select>
            </div>
            <div class="col-md-2">
              <select class="form-select" id="med-sort">
                <option value="name">לפי שם</option>
                <option value="updated">לפי עדכון</option>
                <option value="critical">קריטיים תחילה</option>
              </select>
            </div>
          </div>
        </div>
        <div id="med-list">${Utils.skeleton(4)}</div>
      </div>

      <!-- Events Tab -->
      <div class="tab-pane fade" id="med-tab-events">
        <div class="card p-3 mb-3">
          <div class="row g-2 align-items-end">
            <div class="col-md-4">
              <div class="search-box"><i class="bi bi-search"></i><input class="form-control" id="med-event-search" placeholder="חיפוש באירועים..."></div>
            </div>
            <div class="col-md-3">
              <select class="form-select" id="med-event-type-filter">
                <option value="">כל הסוגים</option>
                <option value="injury">פציעה</option>
                <option value="illness">מחלה</option>
                <option value="medication">מתן תרופה</option>
                <option value="checkup">בדיקה</option>
                <option value="other">אחר</option>
              </select>
            </div>
            <div class="col-md-3">
              <input type="month" class="form-control" id="med-event-month">
            </div>
            <div class="col-md-2">
              <button class="btn btn-success w-100" onclick="Pages.showEventForm()"><i class="bi bi-plus-lg me-1"></i>אירוע חדש</button>
            </div>
          </div>
        </div>
        <div id="med-events-list"></div>
      </div>

      <!-- Vaccines Tab -->
      <div class="tab-pane fade" id="med-tab-vaccines">
        <div class="card p-3 mb-3 d-flex flex-row justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <h6 class="mb-0"><i class="bi bi-shield-check me-2 text-success"></i>מעקב חיסונים נדרשים</h6>
            <small class="text-muted">סטטוס חיסונים לכל תלמיד</small>
          </div>
          <div class="d-flex gap-2 align-items-center">
            <span class="badge bg-success"><i class="bi bi-check-circle me-1"></i>בוצע</span>
            <span class="badge bg-warning text-dark"><i class="bi bi-clock me-1"></i>חסר</span>
            <span class="badge bg-secondary"><i class="bi bi-dash-circle me-1"></i>פטור</span>
          </div>
        </div>
        <div id="med-vaccines-list"></div>
      </div>
    </div>`;
  },

  _medData: null,
  _medEvents: null,
  _medVaccines: null,
  _medActiveTab: 'records',
  _MED_STORAGE_KEY: 'bht_medical_data',
  _MED_EVENTS_KEY: 'bht_medical_events',
  _MED_VACCINES_KEY: 'bht_medical_vaccines',

  _REQUIRED_VACCINES: [
    { id: 'v1', name: 'חצבת-אדמת-חזרת (MMR)', ageRange: 'שנה + 6 שנים' },
    { id: 'v2', name: 'פוליו (IPV)', ageRange: '2-4-6-12 חודשים' },
    { id: 'v3', name: 'דיפטריה-טטנוס-שעלת (DTaP)', ageRange: '2-4-6-12 חודשים' },
    { id: 'v4', name: 'הפטיטיס B', ageRange: 'לידה + חודש + 6 חודשים' },
    { id: 'v5', name: 'הפטיטיס A', ageRange: '18 + 24 חודשים' },
    { id: 'v6', name: 'חיסון אבעבועות רוח', ageRange: 'שנה + כיתה א' },
    { id: 'v7', name: 'מנינגוקוק', ageRange: 'כיתה ח' },
    { id: 'v8', name: 'שפעת (עונתי)', ageRange: 'שנתי' }
  ],

  _ALLERGY_COLORS: {
    'בוטנים': 'danger', 'אגוזים': 'danger', 'גלוטן': 'warning', 'חלב': 'info',
    'ביצים': 'warning', 'סויה': 'secondary', 'פניצילין': 'danger', 'דבורים': 'danger',
    'צרעות': 'danger', 'אספירין': 'warning', 'לטקס': 'danger', 'דגים': 'warning',
    'שומשום': 'warning', 'אנטיביוטיקה': 'danger'
  },

  _EVENT_TYPES: {
    injury: { label: 'פציעה', icon: 'bandaid', color: 'danger' },
    illness: { label: 'מחלה', icon: 'thermometer-half', color: 'warning' },
    medication: { label: 'מתן תרופה', icon: 'capsule', color: 'info' },
    checkup: { label: 'בדיקה', icon: 'clipboard2-pulse', color: 'primary' },
    other: { label: 'אחר', icon: 'three-dots', color: 'secondary' }
  },

  _medDemoData() {
    return [
      { id: 'm1', studentName: '\u05D9\u05D5\u05E1\u05E3 \u05DB\u05D4\u05DF', bloodType: 'A+', allergies: ['\u05D1\u05D5\u05D8\u05E0\u05D9\u05DD','\u05D0\u05D2\u05D5\u05D6\u05D9\u05DD'], medications: ['\u05D0\u05E4\u05D9\u05E4\u05DF'], conditions: ['\u05D0\u05E1\u05D8\u05DE\u05D4'], emergencyName: '\u05D0\u05D1\u05E8\u05D4\u05DD \u05DB\u05D4\u05DF', emergencyPhone: '0501234567', insurance: '\u05DB\u05DC\u05DC\u05D9\u05EA', policyNumber: '12345678', doctor: '\u05D3"\u05E8 \u05D9\u05E2\u05E7\u05D1 \u05DC\u05D5\u05D9', doctorPhone: '02-6234567', notes: '\u05D9\u05E9 \u05DC\u05E9\u05DE\u05D5\u05E8 \u05D0\u05E4\u05D9\u05E4\u05DF \u05D1\u05D4\u05D9\u05E9\u05D2 \u05D9\u05D3 \u05D1\u05DB\u05DC \u05E2\u05EA', critical: true, updated: '2026-04-20' },
      { id: 'm2', studentName: '\u05DE\u05E9\u05D4 \u05DC\u05D5\u05D9', bloodType: 'O+', allergies: [], medications: ['\u05E8\u05D9\u05D8\u05DC\u05D9\u05DF'], conditions: ['\u05D4\u05E4\u05E8\u05E2\u05EA \u05E7\u05E9\u05D1'], emergencyName: '\u05D3\u05D5\u05D3 \u05DC\u05D5\u05D9', emergencyPhone: '0521234567', insurance: '\u05DE\u05DB\u05D1\u05D9', policyNumber: '23456789', doctor: '\u05D3"\u05E8 \u05D0\u05D1\u05E8\u05D4\u05DD \u05E9\u05D8\u05E8\u05DF', doctorPhone: '02-6345678', notes: '\u05E0\u05D5\u05D8\u05DC \u05E8\u05D9\u05D8\u05DC\u05D9\u05DF \u05D1\u05D1\u05D5\u05E7\u05E8', critical: false, updated: '2026-04-18' },
      { id: 'm3', studentName: '\u05D0\u05D1\u05E8\u05D4\u05DD \u05D2\u05D5\u05DC\u05D3\u05E9\u05D8\u05D9\u05D9\u05DF', bloodType: 'B+', allergies: ['\u05D2\u05DC\u05D5\u05D8\u05DF','\u05D7\u05DC\u05D1'], medications: [], conditions: ['\u05E6\u05DC\u05D9\u05D0\u05E7'], emergencyName: '\u05D9\u05E6\u05D7\u05E7 \u05D2\u05D5\u05DC\u05D3\u05E9\u05D8\u05D9\u05D9\u05DF', emergencyPhone: '0531234567', insurance: '\u05DB\u05DC\u05DC\u05D9\u05EA', policyNumber: '34567890', doctor: '\u05D3"\u05E8 \u05E9\u05E8\u05D4 \u05D1\u05E8\u05D2\u05E8', doctorPhone: '02-6456789', notes: '\u05D3\u05D9\u05D0\u05D8\u05D4 \u05DC\u05DC\u05D0 \u05D2\u05DC\u05D5\u05D8\u05DF - \u05DC\u05EA\u05D0\u05DD \u05E2\u05DD \u05D4\u05DE\u05D8\u05D1\u05D7', critical: true, updated: '2026-04-15' },
      { id: 'm4', studentName: '\u05D3\u05D5\u05D3 \u05E4\u05E8\u05D9\u05D3\u05DE\u05DF', bloodType: 'AB+', allergies: ['\u05E4\u05E0\u05D9\u05E6\u05D9\u05DC\u05D9\u05DF'], medications: [], conditions: [], emergencyName: '\u05E9\u05DE\u05D5\u05D0\u05DC \u05E4\u05E8\u05D9\u05D3\u05DE\u05DF', emergencyPhone: '0541234567', insurance: '\u05DC\u05D0\u05D5\u05DE\u05D9\u05EA', policyNumber: '45678901', doctor: '\u05D3"\u05E8 \u05D7\u05D9\u05D9\u05DD \u05DB\u05D4\u05DF', doctorPhone: '02-6567890', notes: '', critical: false, updated: '2026-04-10' },
      { id: 'm5', studentName: '\u05D9\u05E6\u05D7\u05E7 \u05D1\u05E8\u05D2\u05E8', bloodType: 'A-', allergies: ['\u05D3\u05D1\u05D5\u05E8\u05D9\u05DD','\u05E6\u05E8\u05E2\u05D5\u05EA'], medications: ['\u05D0\u05E4\u05D9\u05E4\u05DF'], conditions: ['\u05D0\u05DC\u05E8\u05D2\u05D9\u05D4 \u05D7\u05DE\u05D5\u05E8\u05D4 \u05DC\u05E2\u05E7\u05D9\u05E6\u05D5\u05EA'], emergencyName: '\u05DE\u05E0\u05D7\u05DD \u05D1\u05E8\u05D2\u05E8', emergencyPhone: '0551234567', insurance: '\u05DE\u05DB\u05D1\u05D9', policyNumber: '56789012', doctor: '\u05D3"\u05E8 \u05E8\u05D5\u05E0\u05D9\u05EA \u05E9\u05DE\u05E9', doctorPhone: '02-6678901', notes: '\u05E1\u05DB\u05E0\u05EA \u05D0\u05E0\u05E4\u05D9\u05DC\u05E7\u05E1\u05D9\u05E1 - \u05D7\u05D5\u05D1\u05D4 \u05D0\u05E4\u05D9\u05E4\u05DF \u05D1\u05D8\u05D9\u05D5\u05DC\u05D9\u05DD', critical: true, updated: '2026-04-19' },
      { id: 'm6', studentName: '\u05E9\u05DE\u05E2\u05D5\u05DF \u05D5\u05D9\u05E1', bloodType: 'O-', allergies: [], medications: ['\u05D0\u05D9\u05E0\u05E1\u05D5\u05DC\u05D9\u05DF'], conditions: ['\u05E1\u05D5\u05DB\u05E8\u05EA \u05E1\u05D5\u05D2 1'], emergencyName: '\u05D7\u05D9\u05D9\u05DD \u05D5\u05D9\u05E1', emergencyPhone: '0561234567', insurance: '\u05DB\u05DC\u05DC\u05D9\u05EA', policyNumber: '67890123', doctor: '\u05D3"\u05E8 \u05D3\u05E0\u05D9\u05D0\u05DC \u05DC\u05D5\u05D9', doctorPhone: '02-6789012', notes: '\u05D1\u05D3\u05D9\u05E7\u05EA \u05E1\u05D5\u05DB\u05E8 \u05DC\u05E4\u05E0\u05D9 \u05D0\u05E8\u05D5\u05D7\u05D5\u05EA, \u05DE\u05E9\u05D0\u05D1\u05EA \u05D0\u05D9\u05E0\u05E1\u05D5\u05DC\u05D9\u05DF', critical: true, updated: '2026-04-21' },
      { id: 'm7', studentName: '\u05E0\u05EA\u05DF \u05E9\u05E4\u05D9\u05E8\u05D0', bloodType: 'B-', allergies: ['\u05D0\u05E1\u05E4\u05D9\u05E8\u05D9\u05DF'], medications: [], conditions: [], emergencyName: '\u05D0\u05DC\u05D9\u05D4\u05D5 \u05E9\u05E4\u05D9\u05E8\u05D0', emergencyPhone: '0571234567', insurance: '\u05DE\u05D0\u05D5\u05D7\u05D3\u05EA', policyNumber: '78901234', doctor: '\u05D3"\u05E8 \u05DE\u05D9\u05DB\u05D0\u05DC \u05D2\u05E8\u05D9\u05DF', doctorPhone: '02-6890123', notes: '', critical: false, updated: '2026-03-28' },
      { id: 'm8', studentName: '\u05D0\u05DC\u05D9\u05D4\u05D5 \u05E8\u05D5\u05D6\u05E0\u05D1\u05E8\u05D2', bloodType: 'A+', allergies: ['\u05D1\u05D9\u05E6\u05D9\u05DD','\u05E1\u05D5\u05D9\u05D4'], medications: ['\u05D5\u05E0\u05D8\u05D5\u05DC\u05D9\u05DF'], conditions: ['\u05D0\u05E1\u05D8\u05DE\u05D4'], emergencyName: '\u05DE\u05E8\u05D3\u05DB\u05D9 \u05E8\u05D5\u05D6\u05E0\u05D1\u05E8\u05D2', emergencyPhone: '0581234567', insurance: '\u05DE\u05DB\u05D1\u05D9', policyNumber: '89012345', doctor: '\u05D3"\u05E8 \u05E8\u05D7\u05DC \u05D1\u05DF \u05D3\u05D5\u05D3', doctorPhone: '02-6901234', notes: '\u05DE\u05E9\u05D0\u05E3 \u05D7\u05D9\u05E8\u05D5\u05DD \u05D1\u05EA\u05D9\u05E7', critical: false, updated: '2026-04-12' },
      { id: 'm9', studentName: '\u05D7\u05D9\u05D9\u05DD \u05D4\u05D5\u05E8\u05D5\u05D1\u05D9\u05E5', bloodType: 'O+', allergies: ['\u05E9\u05D5\u05DE\u05E9\u05D5\u05DD','\u05D3\u05D2\u05D9\u05DD'], medications: [], conditions: [], emergencyName: '\u05D9\u05E2\u05E7\u05D1 \u05D4\u05D5\u05E8\u05D5\u05D1\u05D9\u05E5', emergencyPhone: '0591234567', insurance: '\u05DB\u05DC\u05DC\u05D9\u05EA', policyNumber: '90123456', doctor: '\u05D3"\u05E8 \u05D0\u05D9\u05DC\u05DF \u05E9\u05D8\u05E8\u05DF', doctorPhone: '02-7012345', notes: '\u05D4\u05D9\u05DE\u05E0\u05E2\u05D5\u05EA \u05DE\u05D0\u05DB\u05D9\u05DC\u05D5\u05EA \u05E2\u05DD \u05E9\u05D5\u05DE\u05E9\u05D5\u05DD \u05D5\u05D3\u05D2\u05D9\u05DD', critical: false, updated: '2026-04-08' },
      { id: 'm10', studentName: '\u05E8\u05E4\u05D0\u05DC \u05D0\u05D3\u05DC\u05E8', bloodType: 'AB-', allergies: ['\u05DC\u05D8\u05E7\u05E1'], medications: ['\u05D5\u05E0\u05D8\u05D5\u05DC\u05D9\u05DF','\u05E1\u05D9\u05E0\u05D2\u05D5\u05DC\u05E8'], conditions: ['\u05D0\u05E1\u05D8\u05DE\u05D4 \u05E7\u05E9\u05D4'], emergencyName: '\u05D6\u05D0\u05D1 \u05D0\u05D3\u05DC\u05E8', emergencyPhone: '0501111111', insurance: '\u05DE\u05D0\u05D5\u05D7\u05D3\u05EA', policyNumber: '01234567', doctor: '\u05D3"\u05E8 \u05E0\u05D5\u05E2\u05DD \u05D1\u05DF \u05E9\u05DE\u05D5\u05D0\u05DC', doctorPhone: '02-7123456', notes: '\u05D0\u05E1\u05D8\u05DE\u05D4 \u05DE\u05D0\u05DE\u05E6\u05EA - \u05DE\u05E9\u05D0\u05E3 \u05EA\u05DE\u05D9\u05D3 \u05D6\u05DE\u05D9\u05DF', critical: true, updated: '2026-04-22' },
      { id: 'm11', studentName: '\u05D1\u05E0\u05D9\u05DE\u05D9\u05DF \u05E7\u05E8\u05E4', bloodType: 'B+', allergies: [], medications: [], conditions: ['\u05D0\u05E4\u05D9\u05DC\u05E4\u05E1\u05D9\u05D4'], emergencyName: '\u05D0\u05E8\u05D9\u05D4 \u05E7\u05E8\u05E4', emergencyPhone: '0502222222', insurance: '\u05DC\u05D0\u05D5\u05DE\u05D9\u05EA', policyNumber: '11223344', doctor: '\u05D3"\u05E8 \u05DE\u05E8\u05D9\u05DD \u05D2\u05D5\u05DC\u05D3\u05D1\u05E8\u05D2', doctorPhone: '02-7234567', notes: '\u05D9\u05D3\u05D5\u05E2 \u05DC\u05E6\u05D5\u05D5\u05EA \u05DC\u05D4\u05EA\u05E7\u05E9\u05E8 \u05D1\u05DE\u05E7\u05E8\u05D4 \u05D4\u05EA\u05E7\u05E3', critical: true, updated: '2026-04-17' },
      { id: 'm12', studentName: '\u05D2\u05D3 \u05E4\u05E8\u05DC\u05DE\u05D5\u05D8\u05E8', bloodType: 'A+', allergies: ['\u05D0\u05E0\u05D8\u05D9\u05D1\u05D9\u05D5\u05D8\u05D9\u05E7\u05D4'], medications: ['\u05E8\u05D9\u05D8\u05DC\u05D9\u05DF','\u05E7\u05D5\u05E0\u05E6\u05E8\u05D8\u05D4'], conditions: ['\u05D4\u05E4\u05E8\u05E2\u05EA \u05E7\u05E9\u05D1','\u05E7\u05D5\u05E6\u05E8 \u05E0\u05E9\u05D9\u05DE\u05D4'], emergencyName: '\u05D0\u05E4\u05E8\u05D9\u05DD \u05E4\u05E8\u05DC\u05DE\u05D5\u05D8\u05E8', emergencyPhone: '0503333333', insurance: '\u05DE\u05DB\u05D1\u05D9', policyNumber: '22334455', doctor: '\u05D3"\u05E8 \u05E2\u05D3\u05D9 \u05D1\u05E8\u05D5\u05DA', doctorPhone: '02-7345678', notes: '\u05E0\u05D5\u05D8\u05DC \u05E8\u05D9\u05D8\u05DC\u05D9\u05DF \u05D1\u05D1\u05D5\u05E7\u05E8 + \u05E7\u05D5\u05E0\u05E6\u05E8\u05D8\u05D4 \u05D1\u05E2\u05E8\u05D1', critical: false, updated: '2026-04-14' }
    ];
  },

  _medDemoEvents() {
    return [
      { id: 'e1', date: '2026-04-22', studentName: '\u05E9\u05DE\u05E2\u05D5\u05DF \u05D5\u05D9\u05E1', type: 'medication', description: '\u05DE\u05EA\u05DF \u05D0\u05D9\u05E0\u05E1\u05D5\u05DC\u05D9\u05DF \u05DC\u05E4\u05E0\u05D9 \u05D0\u05E8\u05D5\u05D7\u05EA \u05E6\u05D4\u05E8\u05D9\u05D9\u05DD', action: '\u05DE\u05D3\u05D9\u05D3\u05EA \u05E1\u05D5\u05DB\u05E8 \u05EA\u05E7\u05D9\u05E0\u05D4, \u05D1\u05D5\u05E6\u05E2 \u05DE\u05EA\u05DF \u05D0\u05D9\u05E0\u05E1\u05D5\u05DC\u05D9\u05DF' },
      { id: 'e2', date: '2026-04-21', studentName: '\u05D9\u05D5\u05E1\u05E3 \u05DB\u05D4\u05DF', type: 'checkup', description: '\u05D1\u05D3\u05D9\u05E7\u05EA \u05D0\u05E1\u05D8\u05DE\u05D4 \u05EA\u05E7\u05D5\u05E4\u05EA\u05D9\u05EA', action: '\u05DE\u05E9\u05D0\u05E3 \u05EA\u05E7\u05D9\u05DF, \u05D0\u05D9\u05DF \u05E6\u05D5\u05E8\u05DA \u05D1\u05D4\u05EA\u05D0\u05DE\u05EA \u05D8\u05D9\u05E4\u05D5\u05DC' },
      { id: 'e3', date: '2026-04-20', studentName: '\u05D1\u05E0\u05D9\u05DE\u05D9\u05DF \u05E7\u05E8\u05E4', type: 'injury', description: '\u05E0\u05E4\u05DC \u05D1\u05D4\u05E4\u05E1\u05E7\u05D4 \u05D5\u05E0\u05D7\u05D1\u05DC \u05D1\u05E8\u05DA', action: '\u05D7\u05D9\u05D8\u05D5\u05D9, \u05E7\u05E8\u05D7, \u05D4\u05D5\u05D3\u05E2 \u05DC\u05D4\u05D5\u05E8\u05D9\u05DD. \u05D0\u05D9\u05DF \u05E6\u05D5\u05E8\u05DA \u05D1\u05E4\u05D9\u05E0\u05D5\u05D9 \u05E0\u05D5\u05E1\u05E3' },
      { id: 'e4', date: '2026-04-19', studentName: '\u05DE\u05E9\u05D4 \u05DC\u05D5\u05D9', type: 'medication', description: '\u05DE\u05EA\u05DF \u05E8\u05D9\u05D8\u05DC\u05D9\u05DF \u05D1\u05D5\u05E7\u05E8', action: '\u05D1\u05D5\u05E6\u05E2 \u05DB\u05E8\u05D2\u05D9\u05DC' },
      { id: 'e5', date: '2026-04-18', studentName: '\u05D7\u05D9\u05D9\u05DD \u05D4\u05D5\u05E8\u05D5\u05D1\u05D9\u05E5', type: 'illness', description: '\u05D4\u05EA\u05DC\u05D5\u05E0\u05DF \u05E2\u05DC \u05DB\u05D0\u05D1 \u05E8\u05D0\u05E9', action: '\u05E0\u05E9\u05DC\u05D7 \u05DC\u05DE\u05E0\u05D5\u05D7\u05D4. \u05D4\u05D4\u05D5\u05E8\u05D9\u05DD \u05D4\u05D5\u05D3\u05E2\u05D5' },
      { id: 'e6', date: '2026-04-17', studentName: '\u05E8\u05E4\u05D0\u05DC \u05D0\u05D3\u05DC\u05E8', type: 'medication', description: '\u05DE\u05EA\u05DF \u05D5\u05E0\u05D8\u05D5\u05DC\u05D9\u05DF \u05DC\u05D0\u05D7\u05E8 \u05D4\u05EA\u05E7\u05E3 \u05D0\u05E1\u05D8\u05DE\u05D4', action: '\u05D1\u05D5\u05E6\u05E2 \u05DE\u05EA\u05DF \u05DE\u05E9\u05D0\u05E3 + \u05DE\u05E0\u05D5\u05D7\u05D4' },
      { id: 'e7', date: '2026-04-15', studentName: '\u05D0\u05D1\u05E8\u05D4\u05DD \u05D2\u05D5\u05DC\u05D3\u05E9\u05D8\u05D9\u05D9\u05DF', type: 'illness', description: '\u05EA\u05D2\u05D5\u05D1\u05D4 \u05D0\u05DC\u05E8\u05D2\u05D9\u05EA \u05DC\u05D0\u05D7\u05E8 \u05D7\u05E9\u05D9\u05E4\u05D4 \u05DC\u05D2\u05DC\u05D5\u05D8\u05DF', action: '\u05D8\u05D5\u05E4\u05DC \u05D1\u05D0\u05E0\u05D8\u05D9\u05D4\u05D9\u05E1\u05D8\u05DE\u05D9\u05DF, \u05D4\u05D5\u05D3\u05E2 \u05DC\u05DE\u05D8\u05D1\u05D7' },
      { id: 'e8', date: '2026-04-10', studentName: '\u05D2\u05D3 \u05E4\u05E8\u05DC\u05DE\u05D5\u05D8\u05E8', type: 'checkup', description: '\u05D1\u05D3\u05D9\u05E7\u05D4 \u05EA\u05E7\u05D5\u05E4\u05EA\u05D9\u05EA \u05DC\u05E7\u05E8\u05D0\u05EA \u05E7\u05D5\u05E6\u05E8 \u05E0\u05E9\u05D9\u05DE\u05D4', action: '\u05EA\u05E7\u05D9\u05DF - \u05D4\u05DE\u05E9\u05DA \u05D8\u05D9\u05E4\u05D5\u05DC \u05DB\u05E8\u05D2\u05D9\u05DC' }
    ];
  },

  _medDemoVaccines() {
    const data = this._getMedData();
    const vaccines = {};
    data.forEach(student => {
      vaccines[student.id] = {};
      this._REQUIRED_VACCINES.forEach(v => {
        // Random demo statuses
        const rand = Math.random();
        vaccines[student.id][v.id] = rand < 0.65 ? 'done' : rand < 0.85 ? 'missing' : 'exempt';
      });
    });
    return vaccines;
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

  _getMedEvents() {
    if (this._medEvents !== null) return this._medEvents;
    const stored = localStorage.getItem(this._MED_EVENTS_KEY);
    if (stored) {
      try { this._medEvents = JSON.parse(stored); return this._medEvents; } catch(e) {}
    }
    this._medEvents = this._medDemoEvents();
    this._saveMedEvents();
    return this._medEvents;
  },

  _getMedVaccines() {
    if (this._medVaccines !== null) return this._medVaccines;
    const stored = localStorage.getItem(this._MED_VACCINES_KEY);
    if (stored) {
      try { this._medVaccines = JSON.parse(stored); return this._medVaccines; } catch(e) {}
    }
    this._medVaccines = this._medDemoVaccines();
    this._saveMedVaccines();
    return this._medVaccines;
  },

  _saveMedData() {
    localStorage.setItem(this._MED_STORAGE_KEY, JSON.stringify(this._medData));
  },

  _saveMedEvents() {
    localStorage.setItem(this._MED_EVENTS_KEY, JSON.stringify(this._medEvents));
  },

  _saveMedVaccines() {
    localStorage.setItem(this._MED_VACCINES_KEY, JSON.stringify(this._medVaccines));
  },

  async medicalInit() {
    this._medData = null;
    this._medEvents = null;
    this._medVaccines = null;

    // Try loading from API first
    try {
      const apiData = await App.getData('מידע_רפואי');
      if (apiData && apiData.length) {
        this._medData = apiData;
        this._saveMedData();
      } else {
        this._getMedData();
      }
    } catch(e) {
      this._getMedData();
    }

    this._getMedEvents();
    this._getMedVaccines();

    document.getElementById('med-search')?.addEventListener('input', Utils.debounce(() => this.renderMedRecords(), 200));
    document.getElementById('med-filter-blood')?.addEventListener('change', () => this.renderMedRecords());
    document.getElementById('med-filter-alert')?.addEventListener('change', () => this.renderMedRecords());
    document.getElementById('med-sort')?.addEventListener('change', () => this.renderMedRecords());
    document.getElementById('med-event-search')?.addEventListener('input', Utils.debounce(() => this.renderMedEvents(), 200));
    document.getElementById('med-event-type-filter')?.addEventListener('change', () => this.renderMedEvents());
    document.getElementById('med-event-month')?.addEventListener('change', () => this.renderMedEvents());

    this.renderMedStats();
    this.renderMedAlerts();
    this.renderMedRecords();
    this.renderMedEvents();
    this.renderMedVaccines();
  },

  renderMedStats() {
    const data = this._getMedData();
    const totalAllergies = data.reduce((s, r) => s + r.allergies.length, 0);
    const totalMeds = data.filter(r => r.medications.length > 0).length;
    const criticalCount = data.filter(r => r.critical).length;

    document.getElementById('med-total').textContent = data.length;
    document.getElementById('med-allergies').textContent = totalAllergies;
    document.getElementById('med-meds').textContent = totalMeds;
    document.getElementById('med-critical-count').textContent = criticalCount;
  },

  renderMedAlerts() {
    const data = this._getMedData();
    const critical = data.filter(r => r.critical);
    const alertsEl = document.getElementById('med-alerts');
    if (!alertsEl) return;

    if (critical.length === 0) { alertsEl.innerHTML = ''; return; }

    alertsEl.innerHTML = `
      <div class="card border-danger border-2 p-3">
        <h6 class="fw-bold text-danger mb-3">
          <i class="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
          התראות רפואיות קריטיות (${critical.length})
        </h6>
        <div class="row g-2">${critical.map(r => {
          const details = [];
          if (r.allergies.length) details.push('\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA: ' + r.allergies.join(', '));
          if (r.conditions.length) details.push(r.conditions.join(', '));
          if (r.medications.length) details.push('\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA: ' + r.medications.join(', '));
          return `<div class="col-md-6 col-lg-4">
            <div class="alert alert-danger py-2 px-3 mb-0 d-flex align-items-start gap-2">
              <i class="bi bi-heart-pulse text-danger fs-5 mt-1"></i>
              <div>
                <strong>${r.studentName}</strong>
                <span class="badge bg-primary ms-1" style="font-size:0.65rem">${r.bloodType}</span>
                <br><small>${details.join(' | ')}</small>
                ${r.notes ? `<br><small class="text-muted fst-italic">${r.notes}</small>` : ''}
                <br><small class="text-muted"><i class="bi bi-telephone me-1"></i>${r.emergencyName}: ${Utils.formatPhone(r.emergencyPhone)}</small>
              </div>
            </div>
          </div>`;
        }).join('')}</div>
      </div>`;
  },

  renderMedRecords() {
    const data = this._getMedData();
    const search = (document.getElementById('med-search')?.value || '').trim().toLowerCase();
    const bloodF = document.getElementById('med-filter-blood')?.value || '';
    const alertF = document.getElementById('med-filter-alert')?.value || '';
    const sortBy = document.getElementById('med-sort')?.value || 'name';

    let filtered = data.filter(r => {
      if (search && !r.studentName.toLowerCase().includes(search)) return false;
      if (bloodF && r.bloodType !== bloodF) return false;
      if (alertF === 'critical' && !r.critical) return false;
      if (alertF === 'allergies' && r.allergies.length === 0) return false;
      if (alertF === 'meds' && r.medications.length === 0) return false;
      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'critical') return (b.critical ? 1 : 0) - (a.critical ? 1 : 0) || a.studentName.localeCompare(b.studentName, 'he');
      if (sortBy === 'updated') return b.updated.localeCompare(a.updated);
      return a.studentName.localeCompare(b.studentName, 'he');
    });

    this.renderMedStats();

    if (filtered.length === 0) {
      document.getElementById('med-list').innerHTML = `<div class="empty-state"><i class="bi bi-heart-pulse"></i><h5>\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05E8\u05E9\u05D5\u05DE\u05D5\u05EA \u05E8\u05E4\u05D5\u05D0\u05D9\u05D5\u05EA</h5></div>`;
      return;
    }

    const colors = this._ALLERGY_COLORS;
    document.getElementById('med-list').innerHTML = `<div class="row g-3">${filtered.map(r => {
      const allergyBadges = r.allergies.map(a => `<span class="badge bg-${colors[a] || 'secondary'} me-1">${a}</span>`).join('');
      const medBadges = r.medications.map(m => `<span class="badge bg-info me-1"><i class="bi bi-capsule me-1"></i>${m}</span>`).join('');
      const condBadges = r.conditions.map(c => `<span class="badge bg-dark me-1">${c}</span>`).join('');
      const borderClass = r.critical ? 'border-danger border-2' : '';

      return `<div class="col-md-6 col-lg-4"><div class="card p-3 h-100 ${borderClass}">
        <div class="d-flex align-items-center gap-3 mb-2">
          ${Utils.avatarHTML(r.studentName)}
          <div class="flex-grow-1">
            <div class="fw-bold">${r.studentName}${r.critical ? ' <i class="bi bi-exclamation-triangle-fill text-danger" title="\u05D4\u05EA\u05E8\u05D0\u05D4 \u05E7\u05E8\u05D9\u05D8\u05D9\u05EA"></i>' : ''}</div>
            <small class="text-muted">\u05E1\u05D5\u05D2 \u05D3\u05DD: <span class="badge bg-primary">${r.bloodType || '-'}</span></small>
          </div>
          <div class="dropdown">
            <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="dropdown"><i class="bi bi-three-dots-vertical"></i></button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#" onclick="Pages.showMedicalForm(Pages._getMedData().find(x=>x.id==='${r.id}'));return false"><i class="bi bi-pencil me-2"></i>\u05E2\u05E8\u05D9\u05DB\u05D4</a></li>
              <li><a class="dropdown-item" href="#" onclick="Pages.showEventForm(null,'${r.studentName}');return false"><i class="bi bi-journal-plus me-2"></i>\u05D0\u05D9\u05E8\u05D5\u05E2 \u05D7\u05D3\u05E9</a></li>
              <li><a class="dropdown-item" href="#" onclick="Pages.printStudentMedical('${r.id}');return false"><i class="bi bi-printer me-2"></i>\u05D4\u05D3\u05E4\u05E1\u05EA \u05E1\u05D9\u05DB\u05D5\u05DD</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item text-danger" href="#" onclick="Pages.deleteMedical('${r.id}');return false"><i class="bi bi-trash me-2"></i>\u05DE\u05D7\u05D9\u05E7\u05D4</a></li>
            </ul>
          </div>
        </div>
        ${r.allergies.length ? `<div class="mb-1"><small class="text-muted fw-bold"><i class="bi bi-exclamation-diamond me-1"></i>\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA:</small> ${allergyBadges}</div>` : ''}
        ${r.medications.length ? `<div class="mb-1"><small class="text-muted fw-bold"><i class="bi bi-capsule me-1"></i>\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA:</small> ${medBadges}</div>` : ''}
        ${r.conditions.length ? `<div class="mb-1"><small class="text-muted fw-bold"><i class="bi bi-activity me-1"></i>\u05DE\u05E6\u05D1\u05D9\u05DD:</small> ${condBadges}</div>` : ''}
        <div class="border-top pt-2 mt-auto">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <small class="text-muted"><i class="bi bi-telephone me-1"></i>${r.emergencyName} - ${Utils.formatPhone(r.emergencyPhone)}</small>
            <small class="text-muted"><i class="bi bi-shield-check me-1"></i>${r.insurance}</small>
          </div>
          ${r.doctor ? `<div><small class="text-muted"><i class="bi bi-person-badge me-1"></i>${r.doctor}${r.doctorPhone ? ' - ' + r.doctorPhone : ''}</small></div>` : ''}
          ${r.notes ? `<div class="mt-1"><small class="text-muted fst-italic"><i class="bi bi-sticky me-1"></i>${r.notes}</small></div>` : ''}
          <div class="text-end mt-1"><small class="text-muted">\u05E2\u05D5\u05D3\u05DB\u05DF: ${Utils.formatDateShort(r.updated)}</small></div>
        </div>
      </div></div>`;
    }).join('')}</div>`;
  },

  renderMedEvents() {
    const events = this._getMedEvents();
    const search = (document.getElementById('med-event-search')?.value || '').trim().toLowerCase();
    const typeF = document.getElementById('med-event-type-filter')?.value || '';
    const monthF = document.getElementById('med-event-month')?.value || '';

    let filtered = events.filter(e => {
      if (search && !e.studentName.toLowerCase().includes(search) && !e.description.toLowerCase().includes(search)) return false;
      if (typeF && e.type !== typeF) return false;
      if (monthF && !e.date.startsWith(monthF)) return false;
      return true;
    });

    filtered.sort((a, b) => b.date.localeCompare(a.date));

    const container = document.getElementById('med-events-list');
    if (!container) return;

    if (filtered.length === 0) {
      container.innerHTML = `<div class="empty-state"><i class="bi bi-journal-medical"></i><h5>\u05D0\u05D9\u05DF \u05D0\u05D9\u05E8\u05D5\u05E2\u05D9\u05DD \u05E8\u05E4\u05D5\u05D0\u05D9\u05D9\u05DD</h5></div>`;
      return;
    }

    const types = this._EVENT_TYPES;
    container.innerHTML = `
      <div class="card">
        <div class="table-responsive">
          <table class="table table-hover mb-0 align-middle">
            <thead class="table-light">
              <tr>
                <th>\u05EA\u05D0\u05E8\u05D9\u05DA</th>
                <th>\u05EA\u05DC\u05DE\u05D9\u05D3</th>
                <th>\u05E1\u05D5\u05D2</th>
                <th>\u05EA\u05D9\u05D0\u05D5\u05E8</th>
                <th>\u05E4\u05E2\u05D5\u05DC\u05D4 \u05E9\u05E0\u05E0\u05E7\u05D8\u05D4</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${filtered.map(e => {
                const t = types[e.type] || types.other;
                return `<tr>
                  <td><small>${Utils.formatDateShort(e.date)}</small></td>
                  <td><strong>${e.studentName}</strong></td>
                  <td><span class="badge bg-${t.color}"><i class="bi bi-${t.icon} me-1"></i>${t.label}</span></td>
                  <td>${e.description}</td>
                  <td><small class="text-muted">${e.action}</small></td>
                  <td>
                    <div class="d-flex gap-1">
                      <button class="btn btn-sm btn-outline-primary" onclick="Pages.showEventForm(Pages._getMedEvents().find(x=>x.id==='${e.id}'))" title="\u05E2\u05E8\u05D9\u05DB\u05D4"><i class="bi bi-pencil"></i></button>
                      <button class="btn btn-sm btn-outline-danger" onclick="Pages.deleteEvent('${e.id}')" title="\u05DE\u05D7\u05D9\u05E7\u05D4"><i class="bi bi-trash"></i></button>
                    </div>
                  </td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <div class="text-muted text-center mt-2"><small>\u05E1\u05D4"\u05DB ${filtered.length} \u05D0\u05D9\u05E8\u05D5\u05E2\u05D9\u05DD</small></div>`;
  },

  renderMedVaccines() {
    const data = this._getMedData();
    const vaccines = this._getMedVaccines();
    const container = document.getElementById('med-vaccines-list');
    if (!container) return;

    if (data.length === 0) {
      container.innerHTML = `<div class="empty-state"><i class="bi bi-shield-check"></i><h5>\u05D0\u05D9\u05DF \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD \u05DC\u05DE\u05E2\u05E7\u05D1</h5></div>`;
      return;
    }

    const required = this._REQUIRED_VACCINES;

    // Summary row
    const totalSlots = data.length * required.length;
    const doneCount = Object.values(vaccines).reduce((sum, sv) => sum + Object.values(sv).filter(s => s === 'done').length, 0);
    const missingCount = Object.values(vaccines).reduce((sum, sv) => sum + Object.values(sv).filter(s => s === 'missing').length, 0);
    const pct = totalSlots ? Math.round(doneCount / totalSlots * 100) : 0;

    container.innerHTML = `
      <div class="card p-3 mb-3">
        <div class="row g-3 align-items-center">
          <div class="col-md-4">
            <div class="d-flex align-items-center gap-3">
              <div class="fs-2 fw-bold text-success">${pct}%</div>
              <div>
                <div class="text-muted small">\u05E9\u05D9\u05E2\u05D5\u05E8 \u05D4\u05E9\u05DC\u05DE\u05D4 \u05DB\u05DC\u05DC\u05D9</div>
                <div class="progress" style="height:8px;width:150px">
                  <div class="progress-bar bg-success" style="width:${pct}%"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 text-center">
            <span class="badge bg-success fs-6 me-2"><i class="bi bi-check-circle me-1"></i>${doneCount} \u05D1\u05D5\u05E6\u05E2\u05D5</span>
            <span class="badge bg-warning text-dark fs-6"><i class="bi bi-clock me-1"></i>${missingCount} \u05D7\u05E1\u05E8\u05D9\u05DD</span>
          </div>
          <div class="col-md-4 text-end">
            <small class="text-muted">${data.length} \u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD &times; ${required.length} \u05D7\u05D9\u05E1\u05D5\u05E0\u05D9\u05DD</small>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="table-responsive">
          <table class="table table-sm table-hover mb-0 align-middle text-center">
            <thead class="table-light">
              <tr>
                <th class="text-start">\u05EA\u05DC\u05DE\u05D9\u05D3</th>
                ${required.map(v => `<th style="font-size:0.7rem;max-width:80px;white-space:normal">${v.name}</th>`).join('')}
                <th>\u05E1\u05D8\u05D0\u05D8\u05D5\u05E1</th>
              </tr>
            </thead>
            <tbody>
              ${data.map(student => {
                const sv = vaccines[student.id] || {};
                const done = Object.values(sv).filter(s => s === 'done').length;
                const total = required.length;
                const studentPct = Math.round(done / total * 100);
                const rowClass = studentPct === 100 ? '' : studentPct >= 75 ? 'table-warning' : 'table-danger';
                return `<tr class="${rowClass}">
                  <td class="text-start fw-bold">${student.studentName}</td>
                  ${required.map(v => {
                    const status = sv[v.id] || 'missing';
                    if (status === 'done') return `<td><button class="btn btn-sm p-0 text-success" onclick="Pages.toggleVaccine('${student.id}','${v.id}')" title="\u05D1\u05D5\u05E6\u05E2"><i class="bi bi-check-circle-fill"></i></button></td>`;
                    if (status === 'exempt') return `<td><button class="btn btn-sm p-0 text-secondary" onclick="Pages.toggleVaccine('${student.id}','${v.id}')" title="\u05E4\u05D8\u05D5\u05E8"><i class="bi bi-dash-circle"></i></button></td>`;
                    return `<td><button class="btn btn-sm p-0 text-warning" onclick="Pages.toggleVaccine('${student.id}','${v.id}')" title="\u05D7\u05E1\u05E8"><i class="bi bi-clock"></i></button></td>`;
                  }).join('')}
                  <td>
                    <div class="d-flex align-items-center gap-1 justify-content-center">
                      <div class="progress" style="height:6px;width:50px">
                        <div class="progress-bar bg-${studentPct===100?'success':studentPct>=75?'warning':'danger'}" style="width:${studentPct}%"></div>
                      </div>
                      <small class="text-muted">${studentPct}%</small>
                    </div>
                  </td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  },

  toggleVaccine(studentId, vaccineId) {
    const vaccines = this._getMedVaccines();
    if (!vaccines[studentId]) vaccines[studentId] = {};
    const current = vaccines[studentId][vaccineId] || 'missing';
    const cycle = { done: 'missing', missing: 'exempt', exempt: 'done' };
    vaccines[studentId][vaccineId] = cycle[current];
    this._saveMedVaccines();
    this.renderMedVaccines();
  },

  showMedicalForm(record = null) {
    const title = record ? '\u05E2\u05E8\u05D9\u05DB\u05EA \u05E8\u05E9\u05D5\u05DE\u05D4 \u05E8\u05E4\u05D5\u05D0\u05D9\u05EA' : '\u05D4\u05D5\u05E1\u05E4\u05EA \u05E8\u05E9\u05D5\u05DE\u05D4 \u05E8\u05E4\u05D5\u05D0\u05D9\u05EA';
    const allergiesVal = record ? record.allergies.join(', ') : '';
    const medsVal = record ? record.medications.join(', ') : '';
    const condsVal = record ? record.conditions.join(', ') : '';

    const bloodOptions = ['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(b =>
      `<option ${record?.bloodType===b?'selected':''}>${b}</option>`
    ).join('');

    const html = `<div class="modal fade" id="med-modal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title"><i class="bi bi-heart-pulse me-2"></i>${title}</h5>
        <button class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <div class="row g-3">
          <div class="col-md-8">
            <label class="form-label fw-bold">\u05E9\u05DD \u05EA\u05DC\u05DE\u05D9\u05D3</label>
            <input class="form-control" id="mf-name" value="${record?.studentName || ''}" placeholder="\u05E9\u05DD \u05E4\u05E8\u05D8\u05D9 \u05D5\u05DE\u05E9\u05E4\u05D7\u05D4">
          </div>
          <div class="col-md-4">
            <label class="form-label fw-bold">\u05E1\u05D5\u05D2 \u05D3\u05DD</label>
            <select class="form-select" id="mf-blood"><option value="">\u05D1\u05D7\u05E8</option>${bloodOptions}</select>
          </div>

          <div class="col-12">
            <label class="form-label fw-bold"><i class="bi bi-exclamation-diamond text-danger me-1"></i>\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA <small class="text-muted fw-normal">(\u05D4\u05E4\u05E8\u05D3 \u05D1\u05E4\u05E1\u05D9\u05E7\u05D9\u05DD)</small></label>
            <input class="form-control" id="mf-allergies" value="${allergiesVal}" placeholder="\u05D1\u05D5\u05D8\u05E0\u05D9\u05DD, \u05D2\u05DC\u05D5\u05D8\u05DF, \u05D7\u05DC\u05D1...">
            <div id="mf-allergy-tags" class="d-flex flex-wrap gap-1 mt-1"></div>
          </div>

          <div class="col-md-6">
            <label class="form-label fw-bold"><i class="bi bi-capsule text-info me-1"></i>\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA <small class="text-muted fw-normal">(\u05D4\u05E4\u05E8\u05D3 \u05D1\u05E4\u05E1\u05D9\u05E7\u05D9\u05DD)</small></label>
            <input class="form-control" id="mf-meds" value="${medsVal}" placeholder="\u05E8\u05D9\u05D8\u05DC\u05D9\u05DF, \u05D0\u05E4\u05D9\u05E4\u05DF...">
          </div>
          <div class="col-md-6">
            <label class="form-label fw-bold"><i class="bi bi-activity text-dark me-1"></i>\u05DE\u05E6\u05D1\u05D9\u05DD \u05DB\u05E8\u05D5\u05E0\u05D9\u05D9\u05DD <small class="text-muted fw-normal">(\u05D4\u05E4\u05E8\u05D3 \u05D1\u05E4\u05E1\u05D9\u05E7\u05D9\u05DD)</small></label>
            <input class="form-control" id="mf-conditions" value="${condsVal}" placeholder="\u05D0\u05E1\u05D8\u05DE\u05D4, \u05E1\u05D5\u05DB\u05E8\u05EA...">
          </div>

          <div class="col-12"><hr class="my-1"><h6 class="text-muted mb-0"><i class="bi bi-telephone me-2"></i>\u05E4\u05E8\u05D8\u05D9 \u05D7\u05D9\u05E8\u05D5\u05DD \u05D5\u05D1\u05D9\u05D8\u05D5\u05D7</h6></div>

          <div class="col-md-6">
            <label class="form-label">\u05D0\u05D9\u05E9 \u05E7\u05E9\u05E8 \u05D7\u05D9\u05E8\u05D5\u05DD</label>
            <input class="form-control" id="mf-emname" value="${record?.emergencyName || ''}">
          </div>
          <div class="col-md-6">
            <label class="form-label">\u05D8\u05DC\u05E4\u05D5\u05DF \u05D7\u05D9\u05E8\u05D5\u05DD</label>
            <input class="form-control" id="mf-emphone" dir="ltr" value="${record?.emergencyPhone || ''}" placeholder="050-1234567">
          </div>
          <div class="col-md-6">
            <label class="form-label">\u05D7\u05D1\u05E8\u05EA \u05D1\u05D9\u05D8\u05D5\u05D7</label>
            <input class="form-control" id="mf-insurance" value="${record?.insurance || ''}">
          </div>
          <div class="col-md-6">
            <label class="form-label">\u05DE\u05E1\u05E4\u05E8 \u05E4\u05D5\u05DC\u05D9\u05E1\u05D4</label>
            <input class="form-control" id="mf-policy" dir="ltr" value="${record?.policyNumber || ''}">
          </div>

          <div class="col-12"><hr class="my-1"><h6 class="text-muted mb-0"><i class="bi bi-person-badge me-2"></i>\u05E8\u05D5\u05E4\u05D0 \u05DE\u05D8\u05E4\u05DC</h6></div>

          <div class="col-md-6">
            <label class="form-label">\u05E9\u05DD \u05D4\u05E8\u05D5\u05E4\u05D0</label>
            <input class="form-control" id="mf-doctor" value="${record?.doctor || ''}">
          </div>
          <div class="col-md-6">
            <label class="form-label">\u05D8\u05DC\u05E4\u05D5\u05DF \u05E8\u05D5\u05E4\u05D0</label>
            <input class="form-control" id="mf-doctorphone" dir="ltr" value="${record?.doctorPhone || ''}">
          </div>

          <div class="col-12">
            <label class="form-label">\u05D4\u05E2\u05E8\u05D5\u05EA</label>
            <textarea class="form-control" id="mf-notes" rows="2">${record?.notes || ''}</textarea>
          </div>
          <div class="col-12">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="mf-critical" ${record?.critical?'checked':''}>
              <label class="form-check-label text-danger fw-bold" for="mf-critical">
                <i class="bi bi-exclamation-triangle me-1"></i>\u05E1\u05DE\u05DF \u05DB\u05D4\u05EA\u05E8\u05D0\u05D4 \u05E7\u05E8\u05D9\u05D8\u05D9\u05EA (\u05E1\u05DB\u05E0\u05EA \u05D7\u05D9\u05D9\u05DD)
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button>
        <button class="btn btn-primary" onclick="Pages.saveMedical('${record?.id || ''}')"><i class="bi bi-check-lg me-1"></i>\u05E9\u05DE\u05D9\u05E8\u05D4</button>
      </div>
    </div></div></div>`;

    document.getElementById('med-modal')?.remove();
    document.body.insertAdjacentHTML('beforeend', html);

    // Live allergy tag preview
    const allergyInput = document.getElementById('mf-allergies');
    const colors = this._ALLERGY_COLORS;
    const updateTags = () => {
      const tags = allergyInput.value.split(',').map(t => t.trim()).filter(Boolean);
      document.getElementById('mf-allergy-tags').innerHTML = tags.map(t =>
        `<span class="badge bg-${colors[t] || 'secondary'}">${t}</span>`
      ).join('');
    };
    allergyInput.addEventListener('input', updateTags);
    updateTags();

    new bootstrap.Modal(document.getElementById('med-modal')).show();
  },

  saveMedical(existingId) {
    const name = document.getElementById('mf-name').value.trim();
    if (!name) { Utils.toast('\u05E0\u05D0 \u05DC\u05D4\u05D6\u05D9\u05DF \u05E9\u05DD \u05EA\u05DC\u05DE\u05D9\u05D3', 'warning'); return; }

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
      doctor: document.getElementById('mf-doctor').value.trim(),
      doctorPhone: document.getElementById('mf-doctorphone').value.trim(),
      notes: document.getElementById('mf-notes').value.trim(),
      critical: document.getElementById('mf-critical').checked,
      updated: Utils.todayISO()
    };

    const data = this._getMedData();
    if (existingId) {
      const idx = data.findIndex(r => r.id === existingId);
      if (idx >= 0) data[idx] = record;
      try { App.apiCall('update', 'מידע_רפואי', { id: existingId, row: record }); } catch(e) {}
    } else {
      data.push(record);
      try { App.apiCall('add', 'מידע_רפואי', { row: record }); } catch(e) {}
      // Initialize vaccines for new student
      const vaccines = this._getMedVaccines();
      vaccines[record.id] = {};
      this._REQUIRED_VACCINES.forEach(v => { vaccines[record.id][v.id] = 'missing'; });
      this._saveMedVaccines();
    }
    this._saveMedData();

    bootstrap.Modal.getInstance(document.getElementById('med-modal')).hide();
    Utils.toast(existingId ? '\u05E8\u05E9\u05D5\u05DE\u05D4 \u05E2\u05D5\u05D3\u05DB\u05E0\u05D4' : '\u05E8\u05E9\u05D5\u05DE\u05D4 \u05E0\u05D5\u05E1\u05E4\u05D4', 'success');
    this.renderMedAlerts();
    this.renderMedRecords();
    this.renderMedVaccines();
  },

  async deleteMedical(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05EA \u05E8\u05E9\u05D5\u05DE\u05D4', '\u05D4\u05D0\u05DD \u05DC\u05DE\u05D7\u05D5\u05E7 \u05D0\u05EA \u05D4\u05E8\u05E9\u05D5\u05DE\u05D4 \u05D4\u05E8\u05E4\u05D5\u05D0\u05D9\u05EA?')) return;
    const data = this._getMedData();
    const idx = data.findIndex(r => r.id === id);
    if (idx >= 0) data.splice(idx, 1);
    this._saveMedData();
    try { App.apiCall('delete', 'מידע_רפואי', { id }); } catch(e) {}
    // Remove vaccines
    const vaccines = this._getMedVaccines();
    delete vaccines[id];
    this._saveMedVaccines();

    Utils.toast('\u05E8\u05E9\u05D5\u05DE\u05D4 \u05E0\u05DE\u05D7\u05E7\u05D4');
    this.renderMedAlerts();
    this.renderMedRecords();
    this.renderMedVaccines();
  },

  showEventForm(event = null, prefillStudent = '') {
    const title = event ? '\u05E2\u05E8\u05D9\u05DB\u05EA \u05D0\u05D9\u05E8\u05D5\u05E2 \u05E8\u05E4\u05D5\u05D0\u05D9' : '\u05D0\u05D9\u05E8\u05D5\u05E2 \u05E8\u05E4\u05D5\u05D0\u05D9 \u05D7\u05D3\u05E9';
    const students = this._getMedData();
    const typeOptions = Object.entries(this._EVENT_TYPES).map(([k, v]) =>
      `<option value="${k}" ${event?.type===k?'selected':''}>${v.label}</option>`
    ).join('');

    const studentOptions = students.map(s =>
      `<option value="${s.studentName}" ${(event?.studentName===s.studentName || prefillStudent===s.studentName)?'selected':''}>${s.studentName}</option>`
    ).join('');

    const html = `<div class="modal fade" id="med-event-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header bg-success text-white">
        <h5 class="modal-title"><i class="bi bi-journal-medical me-2"></i>${title}</h5>
        <button class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label fw-bold">\u05EA\u05D0\u05E8\u05D9\u05DA</label>
            <input type="date" class="form-control" id="ef-date" value="${event?.date || Utils.todayISO()}">
          </div>
          <div class="col-md-6">
            <label class="form-label fw-bold">\u05E1\u05D5\u05D2 \u05D0\u05D9\u05E8\u05D5\u05E2</label>
            <select class="form-select" id="ef-type">${typeOptions}</select>
          </div>
          <div class="col-12">
            <label class="form-label fw-bold">\u05EA\u05DC\u05DE\u05D9\u05D3</label>
            <select class="form-select" id="ef-student">
              <option value="">\u05D1\u05D7\u05E8 \u05EA\u05DC\u05DE\u05D9\u05D3</option>
              ${studentOptions}
            </select>
          </div>
          <div class="col-12">
            <label class="form-label fw-bold">\u05EA\u05D9\u05D0\u05D5\u05E8</label>
            <textarea class="form-control" id="ef-description" rows="2">${event?.description || ''}</textarea>
          </div>
          <div class="col-12">
            <label class="form-label fw-bold">\u05E4\u05E2\u05D5\u05DC\u05D4 \u05E9\u05E0\u05E0\u05E7\u05D8\u05D4</label>
            <textarea class="form-control" id="ef-action" rows="2">${event?.action || ''}</textarea>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button>
        <button class="btn btn-success" onclick="Pages.saveEvent('${event?.id || ''}')"><i class="bi bi-check-lg me-1"></i>\u05E9\u05DE\u05D9\u05E8\u05D4</button>
      </div>
    </div></div></div>`;

    document.getElementById('med-event-modal')?.remove();
    document.body.insertAdjacentHTML('beforeend', html);
    new bootstrap.Modal(document.getElementById('med-event-modal')).show();
  },

  saveEvent(existingId) {
    const studentName = document.getElementById('ef-student').value;
    const description = document.getElementById('ef-description').value.trim();
    if (!studentName) { Utils.toast('\u05E0\u05D0 \u05DC\u05D1\u05D7\u05D5\u05E8 \u05EA\u05DC\u05DE\u05D9\u05D3', 'warning'); return; }
    if (!description) { Utils.toast('\u05E0\u05D0 \u05DC\u05D4\u05D6\u05D9\u05DF \u05EA\u05D9\u05D0\u05D5\u05E8', 'warning'); return; }

    const event = {
      id: existingId || 'e' + Date.now(),
      date: document.getElementById('ef-date').value,
      studentName,
      type: document.getElementById('ef-type').value,
      description,
      action: document.getElementById('ef-action').value.trim()
    };

    const events = this._getMedEvents();
    if (existingId) {
      const idx = events.findIndex(e => e.id === existingId);
      if (idx >= 0) events[idx] = event;
    } else {
      events.unshift(event);
    }
    this._saveMedEvents();

    bootstrap.Modal.getInstance(document.getElementById('med-event-modal')).hide();
    Utils.toast(existingId ? '\u05D0\u05D9\u05E8\u05D5\u05E2 \u05E2\u05D5\u05D3\u05DB\u05DF' : '\u05D0\u05D9\u05E8\u05D5\u05E2 \u05E0\u05D5\u05E1\u05E3', 'success');
    this.renderMedEvents();
  },

  async deleteEvent(id) {
    if (!await Utils.confirm('\u05DE\u05D7\u05D9\u05E7\u05EA \u05D0\u05D9\u05E8\u05D5\u05E2', '\u05D4\u05D0\u05DD \u05DC\u05DE\u05D7\u05D5\u05E7 \u05D0\u05EA \u05D4\u05D0\u05D9\u05E8\u05D5\u05E2?')) return;
    const events = this._getMedEvents();
    const idx = events.findIndex(e => e.id === id);
    if (idx >= 0) events.splice(idx, 1);
    this._saveMedEvents();
    Utils.toast('\u05D0\u05D9\u05E8\u05D5\u05E2 \u05E0\u05DE\u05D7\u05E7');
    this.renderMedEvents();
  },

  printStudentMedical(id) {
    const data = this._getMedData();
    const r = data.find(x => x.id === id);
    if (!r) return;

    const events = this._getMedEvents().filter(e => e.studentName === r.studentName);
    const vaccines = this._getMedVaccines()[id] || {};
    const types = this._EVENT_TYPES;

    const vaccineRows = this._REQUIRED_VACCINES.map(v => {
      const status = vaccines[v.id] || 'missing';
      const statusText = status === 'done' ? '\u2705 \u05D1\u05D5\u05E6\u05E2' : status === 'exempt' ? '\u2796 \u05E4\u05D8\u05D5\u05E8' : '\u26A0 \u05D7\u05E1\u05E8';
      return `<tr><td>${v.name}</td><td>${v.ageRange}</td><td>${statusText}</td></tr>`;
    }).join('');

    const eventRows = events.slice(0, 20).map(e => {
      const t = types[e.type] || types.other;
      return `<tr><td>${e.date}</td><td>${t.label}</td><td>${e.description}</td><td>${e.action}</td></tr>`;
    }).join('');

    const printHtml = `<!DOCTYPE html><html dir="rtl" lang="he"><head><meta charset="UTF-8">
      <title>\u05E1\u05D9\u05DB\u05D5\u05DD \u05E8\u05E4\u05D5\u05D0\u05D9 - ${r.studentName}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;700&display=swap');
        * { font-family: 'Heebo', sans-serif; }
        body { padding: 30px; direction: rtl; }
        h1 { color: #0d6efd; border-bottom: 2px solid #0d6efd; padding-bottom: 10px; }
        h2 { color: #333; margin-top: 25px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 20px; margin: 15px 0; }
        .info-grid dt { font-weight: bold; color: #555; }
        .info-grid dd { margin: 0; }
        .badge-critical { background: #dc3545; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.85em; }
        .badge-allergy { background: #ffc107; color: #333; padding: 2px 8px; border-radius: 4px; font-size: 0.85em; margin-left: 4px; }
        .badge-med { background: #0dcaf0; color: #333; padding: 2px 8px; border-radius: 4px; font-size: 0.85em; margin-left: 4px; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        th, td { border: 1px solid #ddd; padding: 6px 10px; text-align: right; }
        th { background: #f8f9fa; }
        .footer { margin-top: 30px; border-top: 1px solid #ddd; padding-top: 10px; color: #888; font-size: 0.85em; }
        @media print { .no-print { display: none; } }
      </style>
    </head><body>
      <button class="no-print" onclick="window.print()" style="float:left;padding:8px 20px;cursor:pointer">\u05D4\u05D3\u05E4\u05E1</button>
      <h1>\u05E1\u05D9\u05DB\u05D5\u05DD \u05E8\u05E4\u05D5\u05D0\u05D9 - ${r.studentName}</h1>
      ${r.critical ? '<span class="badge-critical">\u26A0 \u05D4\u05EA\u05E8\u05D0\u05D4 \u05E7\u05E8\u05D9\u05D8\u05D9\u05EA</span>' : ''}

      <h2>\u05E4\u05E8\u05D8\u05D9\u05DD \u05D0\u05D9\u05E9\u05D9\u05D9\u05DD</h2>
      <dl class="info-grid">
        <dt>\u05E1\u05D5\u05D2 \u05D3\u05DD</dt><dd>${r.bloodType || '-'}</dd>
        <dt>\u05D7\u05D1\u05E8\u05EA \u05D1\u05D9\u05D8\u05D5\u05D7</dt><dd>${r.insurance} (${r.policyNumber})</dd>
        <dt>\u05E8\u05D5\u05E4\u05D0 \u05DE\u05D8\u05E4\u05DC</dt><dd>${r.doctor || '-'}${r.doctorPhone ? ' - ' + r.doctorPhone : ''}</dd>
        <dt>\u05D0\u05D9\u05E9 \u05E7\u05E9\u05E8 \u05D7\u05D9\u05E8\u05D5\u05DD</dt><dd>${r.emergencyName} - ${r.emergencyPhone}</dd>
      </dl>

      ${r.allergies.length ? `<h2>\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA</h2><p>${r.allergies.map(a => `<span class="badge-allergy">${a}</span>`).join(' ')}</p>` : ''}
      ${r.medications.length ? `<h2>\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA \u05E7\u05D1\u05D5\u05E2\u05D5\u05EA</h2><p>${r.medications.map(m => `<span class="badge-med">${m}</span>`).join(' ')}</p>` : ''}
      ${r.conditions.length ? `<h2>\u05DE\u05E6\u05D1\u05D9\u05DD \u05DB\u05E8\u05D5\u05E0\u05D9\u05D9\u05DD</h2><p>${r.conditions.join(', ')}</p>` : ''}
      ${r.notes ? `<h2>\u05D4\u05E2\u05E8\u05D5\u05EA</h2><p>${r.notes}</p>` : ''}

      <h2>\u05DE\u05E2\u05E7\u05D1 \u05D7\u05D9\u05E1\u05D5\u05E0\u05D9\u05DD</h2>
      <table>${vaccineRows ? `<thead><tr><th>\u05D7\u05D9\u05E1\u05D5\u05DF</th><th>\u05D2\u05D9\u05DC \u05DE\u05D5\u05DE\u05DC\u05E5</th><th>\u05E1\u05D8\u05D0\u05D8\u05D5\u05E1</th></tr></thead><tbody>${vaccineRows}</tbody>` : '<tr><td>\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD</td></tr>'}</table>

      ${eventRows ? `<h2>\u05D0\u05D9\u05E8\u05D5\u05E2\u05D9\u05DD \u05E8\u05E4\u05D5\u05D0\u05D9\u05D9\u05DD \u05D0\u05D7\u05E8\u05D5\u05E0\u05D9\u05DD</h2>
      <table><thead><tr><th>\u05EA\u05D0\u05E8\u05D9\u05DA</th><th>\u05E1\u05D5\u05D2</th><th>\u05EA\u05D9\u05D0\u05D5\u05E8</th><th>\u05E4\u05E2\u05D5\u05DC\u05D4</th></tr></thead><tbody>${eventRows}</tbody></table>` : ''}

      <div class="footer">
        <p>\u05D4\u05D5\u05E4\u05E7 \u05D1\u05EA\u05D0\u05E8\u05D9\u05DA: ${new Date().toLocaleDateString('he-IL')} | \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3 - \u05DE\u05E2\u05E8\u05DB\u05EA \u05E0\u05D9\u05D4\u05D5\u05DC</p>
      </div>
    </body></html>`;

    const win = window.open('', '_blank');
    win.document.write(printHtml);
    win.document.close();
  },

  exportMedicalSummary() {
    const data = this._getMedData();
    if (!data.length) { Utils.toast('\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05DC\u05D9\u05D9\u05E6\u05D5\u05D0', 'warning'); return; }

    let csv = '\uFEFF' + '\u05E9\u05DD \u05EA\u05DC\u05DE\u05D9\u05D3,\u05E1\u05D5\u05D2 \u05D3\u05DD,\u05D0\u05DC\u05E8\u05D2\u05D9\u05D5\u05EA,\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA,\u05DE\u05E6\u05D1\u05D9\u05DD \u05DB\u05E8\u05D5\u05E0\u05D9\u05D9\u05DD,\u05D0\u05D9\u05E9 \u05E7\u05E9\u05E8 \u05D7\u05D9\u05E8\u05D5\u05DD,\u05D8\u05DC\u05E4\u05D5\u05DF \u05D7\u05D9\u05E8\u05D5\u05DD,\u05D1\u05D9\u05D8\u05D5\u05D7,\u05E4\u05D5\u05DC\u05D9\u05E1\u05D4,\u05E8\u05D5\u05E4\u05D0,\u05D8\u05DC\u05E4\u05D5\u05DF \u05E8\u05D5\u05E4\u05D0,\u05D4\u05EA\u05E8\u05D0\u05D4 \u05E7\u05E8\u05D9\u05D8\u05D9\u05EA,\u05D4\u05E2\u05E8\u05D5\u05EA\n';
    data.forEach(r => {
      csv += `"${r.studentName}","${r.bloodType}","${r.allergies.join('; ')}","${r.medications.join('; ')}","${r.conditions.join('; ')}","${r.emergencyName}","${r.emergencyPhone}","${r.insurance}","${r.policyNumber}","${r.doctor || ''}","${r.doctorPhone || ''}","${r.critical ? '\u05DB\u05DF' : '\u05DC\u05D0'}","${r.notes}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'medical_summary_' + Utils.todayISO() + '.csv';
    link.click();
    Utils.toast('\u05E1\u05D9\u05DB\u05D5\u05DD \u05E8\u05E4\u05D5\u05D0\u05D9 \u05D9\u05D5\u05E6\u05D0 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4');
  }
});
