/* ===== BHT v5.3 — Timetable (מערכת שעות) ===== */
Object.assign(Pages, {

  /* ======================================================================
     DEMO DATA
     ====================================================================== */
  _ttSubjects: [

    { id: 1, name: 'גמרא',      color: '#4e79a7', icon: 'bi-book' },
    { id: 2, name: 'חומש',       color: '#f28e2b', icon: 'bi-journal-text' },
    { id: 3, name: 'הלכה',       color: '#e15759', icon: 'bi-bookmark-star' }
  ],

  _ttTeachers: [
    { id: 1, name: 'הרב כהן' },
    { id: 2, name: 'הרב לוי' },
    { id: 3, name: 'הרב גולדברג' },
    { id: 4, name: 'הרב פרידמן' },
    { id: 5, name: 'הרב שפירא' },
    { id: 6, name: 'מר רוזנברג' }
  ],

  _ttRooms: ['כיתה א׳', 'כיתה ב׳', 'כיתה ג׳', 'אולם גדול', 'חדר מורים', 'ספרייה'],

  _ttUseDemo: false,

  _ttClasses: ['כיתה א׳', 'כיתה ב׳', 'כיתה ג׳'],

  _ttDays: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי'],

  _ttPeriods: [

    { num: 1, start: '08:00', end: '08:45' },
    { num: 2, start: '08:50', end: '09:35' },
    { num: 3, start: '09:45', end: '10:30' }
  ],

  _ttSchedule: null,
  _ttSelectedClass: 'כיתה א׳',
  _ttViewMode: 'class', // 'class' | 'teacher'
  _ttSelectedTeacher: null,

  _ttGenerateDemo() {
    if (this._ttSchedule) return;
    // schedule[className][dayIndex][periodIndex] = { subjectId, teacherId, room }
    const schedule = {};
    const templates = {
      'כיתה א׳': [
        [1,2,1,3,5,4,7,6], // Sunday
        [1,1,2,3,6,5,8,7], // Monday
        [1,2,3,1,4,7,6,5], // Tuesday
        [2,1,1,3,5,6,7,8], // Wednesday
        [1,3,2,1,5,4,7,6], // Thursday
        [1,2,3,8,null,null,null,null] // Friday (short day)
      ],
      'כיתה ב׳': [
        [2,1,3,1,6,7,5,4],
        [1,2,1,3,7,6,4,5],
        [3,1,2,1,5,7,8,6],
        [1,3,1,2,6,5,7,4],
        [2,1,3,1,7,4,6,5],
        [2,1,3,8,null,null,null,null]
      ],
      'כיתה ג׳': [
        [3,1,2,1,7,5,6,4],
        [2,3,1,1,5,7,6,8],
        [1,1,3,2,6,4,5,7],
        [3,2,1,1,4,6,7,5],
        [1,1,2,3,5,7,4,6],
        [3,2,1,8,null,null,null,null]
      ]
    };
    // Teacher assignments per subject per class
    const teacherMap = {
      'כיתה א׳': { 1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:6, 8:2 },
      'כיתה ב׳': { 1:2, 2:3, 3:4, 4:5, 5:1, 6:6, 7:6, 8:3 },
      'כיתה ג׳': { 1:3, 2:4, 3:5, 4:1, 5:2, 6:6, 7:6, 8:4 }
    };
    const roomMap = {
      'כיתה א׳': 'כיתה א׳',
      'כיתה ב׳': 'כיתה ב׳',
      'כיתה ג׳': 'כיתה ג׳'
    };

    for (const cls of this._ttClasses) {
      schedule[cls] = [];
      const tpl = templates[cls];
      const tMap = teacherMap[cls];
      for (let d = 0; d < 6; d++) {
        schedule[cls][d] = [];
        for (let p = 0; p < 8; p++) {
          const subId = tpl[d][p];
          if (!subId) {
            schedule[cls][d][p] = null;
          } else {
            schedule[cls][d][p] = {
              subjectId: subId,
              teacherId: tMap[subId],
              room: roomMap[cls]
            };
          }
        }
      }
    }
    this._ttSchedule = schedule;
  },

  _ttGetSubject(id) {
    return this._ttSubjects.find(s => s.id === id);
  },

  _ttGetTeacher(id) {
    return this._ttTeachers.find(t => t.id === id);
  },

  /* ======================================================================
     CONFLICT DETECTION
     ====================================================================== */
  _ttFindConflicts() {
    const conflicts = [];
    for (let d = 0; d < 6; d++) {
      for (let p = 0; p < 8; p++) {
        const teacherSlots = {}; // teacherId -> [className]
        for (const cls of this._ttClasses) {
          const lesson = this._ttSchedule[cls][d][p];
          if (!lesson) continue;
          if (!teacherSlots[lesson.teacherId]) teacherSlots[lesson.teacherId] = [];
          teacherSlots[lesson.teacherId].push(cls);
        }
        for (const [tid, classes] of Object.entries(teacherSlots)) {
          if (classes.length > 1) {
            const teacher = this._ttGetTeacher(Number(tid));
            conflicts.push({
              day: d, period: p,
              teacherName: teacher ? teacher.name : '?',
              classes: classes
            });
          }
        }
      }
    }
    return conflicts;
  },

  /* ======================================================================
     STATS
     ====================================================================== */
  _ttCalcStats() {
    let totalLessons = 0;
    const teachersUsed = new Set();
    const roomsUsed = new Set();
    for (const cls of this._ttClasses) {
      for (let d = 0; d < 6; d++) {
        for (let p = 0; p < 8; p++) {
          const lesson = this._ttSchedule[cls][d][p];
          if (lesson) {
            totalLessons++;
            teachersUsed.add(lesson.teacherId);
            roomsUsed.add(lesson.room);
          }
        }
      }
    }
    return { totalLessons, teachers: teachersUsed.size, rooms: roomsUsed.size };
  },

  /* ======================================================================
     MAIN PAGE RENDER
     ====================================================================== */
  timetable() {
    if (this._ttUseDemo || this._ttData?.length) { this._ttGenerateDemo(); }
    const stats = this._ttCalcStats();
    const conflicts = this._ttFindConflicts();

    // Class options
    const classOpts = this._ttClasses.map(c =>
      `<option value="${c}" ${c === this._ttSelectedClass ? 'selected' : ''}>${c}</option>`
    ).join('');

    // Teacher options
    const teacherOpts = this._ttTeachers.map(t =>
      `<option value="${t.id}" ${this._ttSelectedTeacher === t.id ? 'selected' : ''}>${t.name}</option>`
    ).join('');

    const isTeacherView = this._ttViewMode === 'teacher';

    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
        <div>
          <h4 class="mb-1"><i class="bi bi-calendar2-week me-2"></i>מערכת שעות</h4>
          <small class="text-muted">ניהול מערכת שעות שבועית למוסד</small>
        </div>
        <div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-outline-primary btn-sm" onclick="Pages._ttToggleView()">
            <i class="bi ${isTeacherView ? 'bi-grid' : 'bi-person-badge'} me-1"></i>
            ${isTeacherView ? 'תצוגת כיתה' : 'תצוגת מורה'}
          </button>
          <button class="btn btn-outline-success btn-sm" onclick="Pages._ttPrint()">
            <i class="bi bi-printer me-1"></i>הדפסה
          </button>
        </div>
      </div>

      <!-- Stats -->
      <div class="row g-3 mb-3">
        <div class="col-6 col-md-3">
          <div class="card text-center border-0 shadow-sm">
            <div class="card-body py-2">
              <div class="fs-4 fw-bold text-primary">${stats.totalLessons}</div>
              <small class="text-muted">שיעורים בשבוע</small>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card text-center border-0 shadow-sm">
            <div class="card-body py-2">
              <div class="fs-4 fw-bold text-success">${stats.teachers}</div>
              <small class="text-muted">מורים פעילים</small>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card text-center border-0 shadow-sm">
            <div class="card-body py-2">
              <div class="fs-4 fw-bold text-info">${stats.rooms}</div>
              <small class="text-muted">חדרים בשימוש</small>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card text-center border-0 shadow-sm">
            <div class="card-body py-2">
              <div class="fs-4 fw-bold ${conflicts.length > 0 ? 'text-danger' : 'text-success'}">${conflicts.length}</div>
              <small class="text-muted">התנגשויות</small>
            </div>
          </div>
        </div>
      </div>

      ${conflicts.length > 0 ? `
        <div class="alert alert-danger d-flex align-items-start gap-2 mb-3">
          <i class="bi bi-exclamation-triangle-fill fs-5 mt-1"></i>
          <div>
            <strong>נמצאו התנגשויות:</strong>
            <ul class="mb-0 mt-1">
              ${conflicts.map(c => `<li>${c.teacherName} מתוזמן ביום ${this._ttDays[c.day]} שיעור ${c.period + 1} ב-${c.classes.join(' ו-')}</li>`).join('')}
            </ul>
          </div>
        </div>` : ''}

      <!-- Selector bar -->
      <div class="card border-0 shadow-sm mb-3">
        <div class="card-body py-2 d-flex align-items-center gap-3 flex-wrap">
          ${isTeacherView ? `
            <label class="fw-bold mb-0">בחר מורה:</label>
            <select class="form-select form-select-sm" style="width:auto" onchange="Pages._ttSelectTeacher(Number(this.value))">
              ${teacherOpts}
            </select>
          ` : `
            <label class="fw-bold mb-0">בחר כיתה:</label>
            <select class="form-select form-select-sm" style="width:auto" onchange="Pages._ttSelectClass(this.value)">
              ${classOpts}
            </select>
          `}
          <div class="ms-auto d-flex gap-1">
            ${this._ttSubjects.map(s => `
              <span class="badge" style="background:${s.color};font-size:0.7rem">${s.name}</span>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Timetable Grid -->
      <div class="card border-0 shadow-sm" id="tt-grid-card">
        <div class="card-body p-2">
          <div class="table-responsive">
            ${isTeacherView ? this._ttRenderTeacherGrid() : this._ttRenderClassGrid()}
          </div>
        </div>
      </div>

      <!-- Edit Modal -->
      <div class="modal fade" id="ttEditModal" tabindex="-1">
        <div class="modal-dialog modal-sm modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header py-2">
              <h6 class="modal-title"><i class="bi bi-pencil-square me-1"></i>עריכת שיעור</h6>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="mb-2">
                <label class="form-label small mb-1">מקצוע</label>
                <select id="ttEditSubject" class="form-select form-select-sm">
                  <option value="">ריק (ללא שיעור)</option>
                  ${this._ttSubjects.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
                </select>
              </div>
              <div class="mb-2">
                <label class="form-label small mb-1">מורה</label>
                <select id="ttEditTeacher" class="form-select form-select-sm">
                  ${this._ttTeachers.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
                </select>
              </div>
              <div class="mb-2">
                <label class="form-label small mb-1">חדר</label>
                <select id="ttEditRoom" class="form-select form-select-sm">
                  ${this._ttRooms.map(r => `<option value="${r}">${r}</option>`).join('')}
                </select>
              </div>
              <div id="ttEditConflictWarn" class="alert alert-warning small py-1 px-2 d-none">
                <i class="bi bi-exclamation-triangle me-1"></i><span id="ttEditConflictMsg"></span>
              </div>
            </div>
            <div class="modal-footer py-1">
              <button class="btn btn-sm btn-secondary" data-bs-dismiss="modal">ביטול</button>
              <button class="btn btn-sm btn-primary" onclick="Pages._ttSaveLesson()">שמירה</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /* ======================================================================
     CLASS GRID
     ====================================================================== */
  _ttRenderClassGrid() {
    const cls = this._ttSelectedClass;
    const grid = this._ttSchedule[cls];
    let html = `<table class="table table-bordered table-sm text-center mb-0" style="table-layout:fixed">
      <thead class="table-dark">
        <tr>
          <th style="width:80px">שעה</th>
          ${this._ttDays.map(d => `<th>${d}</th>`).join('')}
        </tr>
      </thead><tbody>`;

    for (let p = 0; p < 8; p++) {
      const period = this._ttPeriods[p];
      html += `<tr>
        <td class="align-middle small fw-bold" style="background:#f8f9fa">
          <div>${period.num}</div>
          <div class="text-muted" style="font-size:0.65rem">${period.start}-${period.end}</div>
        </td>`;
      for (let d = 0; d < 6; d++) {
        const lesson = grid[d][p];
        html += `<td class="p-1 tt-cell" style="cursor:pointer;vertical-align:middle;min-height:60px"
                     onclick="Pages._ttEditCell('${cls}',${d},${p})">`;
        if (lesson) {
          const sub = this._ttGetSubject(lesson.subjectId);
          const teacher = this._ttGetTeacher(lesson.teacherId);
          html += `<div class="rounded p-1" style="background:${sub.color}15;border-right:3px solid ${sub.color}">
            <div class="fw-bold small" style="color:${sub.color}"><i class="${sub.icon} me-1"></i>${sub.name}</div>
            <div class="text-muted" style="font-size:0.65rem">${teacher ? teacher.name : ''}</div>
            <div class="text-muted" style="font-size:0.6rem"><i class="bi bi-geo-alt"></i> ${lesson.room}</div>
          </div>`;
        } else {
          html += `<div class="text-muted small py-2"><i class="bi bi-plus-circle"></i></div>`;
        }
        html += `</td>`;
      }
      html += `</tr>`;
    }
    html += `</tbody></table>`;
    return html;
  },

  /* ======================================================================
     TEACHER GRID
     ====================================================================== */
  _ttRenderTeacherGrid() {
    const tid = this._ttSelectedTeacher || this._ttTeachers[0].id;
    const teacher = this._ttGetTeacher(tid);

    let html = `<table class="table table-bordered table-sm text-center mb-0" style="table-layout:fixed">
      <thead class="table-dark">
        <tr>
          <th style="width:80px">שעה</th>
          ${this._ttDays.map(d => `<th>${d}</th>`).join('')}
        </tr>
      </thead><tbody>`;

    for (let p = 0; p < 8; p++) {
      const period = this._ttPeriods[p];
      html += `<tr>
        <td class="align-middle small fw-bold" style="background:#f8f9fa">
          <div>${period.num}</div>
          <div class="text-muted" style="font-size:0.65rem">${period.start}-${period.end}</div>
        </td>`;
      for (let d = 0; d < 6; d++) {
        let found = null;
        let foundClass = '';
        for (const cls of this._ttClasses) {
          const lesson = this._ttSchedule[cls][d][p];
          if (lesson && lesson.teacherId === tid) {
            found = lesson;
            foundClass = cls;
            break;
          }
        }
        html += `<td class="p-1" style="vertical-align:middle">`;
        if (found) {
          const sub = this._ttGetSubject(found.subjectId);
          html += `<div class="rounded p-1" style="background:${sub.color}15;border-right:3px solid ${sub.color}">
            <div class="fw-bold small" style="color:${sub.color}"><i class="${sub.icon} me-1"></i>${sub.name}</div>
            <div class="text-muted" style="font-size:0.65rem">${foundClass}</div>
            <div class="text-muted" style="font-size:0.6rem"><i class="bi bi-geo-alt"></i> ${found.room}</div>
          </div>`;
        } else {
          html += `<span class="text-muted small">—</span>`;
        }
        html += `</td>`;
      }
      html += `</tr>`;
    }
    html += `</tbody></table>`;

    // Teacher stats
    let lessonCount = 0;
    const subjectSet = new Set();
    const classSet = new Set();
    for (const cls of this._ttClasses) {
      for (let d = 0; d < 6; d++) {
        for (let p = 0; p < 8; p++) {
          const lesson = this._ttSchedule[cls][d][p];
          if (lesson && lesson.teacherId === tid) {
            lessonCount++;
            subjectSet.add(lesson.subjectId);
            classSet.add(cls);
          }
        }
      }
    }
    html += `<div class="d-flex gap-3 mt-2 px-2 small text-muted">
      <span><i class="bi bi-clock me-1"></i>${lessonCount} שיעורים בשבוע</span>
      <span><i class="bi bi-book me-1"></i>${subjectSet.size} מקצועות</span>
      <span><i class="bi bi-people me-1"></i>${classSet.size} כיתות</span>
    </div>`;

    return html;
  },

  /* ======================================================================
     ACTIONS
     ====================================================================== */
  _ttSelectClass(cls) {
    this._ttSelectedClass = cls;
    App.render('timetable');
  },

  _ttSelectTeacher(tid) {
    this._ttSelectedTeacher = tid;
    App.render('timetable');
  },

  _ttToggleView() {
    if (this._ttViewMode === 'class') {
      this._ttViewMode = 'teacher';
      this._ttSelectedTeacher = this._ttSelectedTeacher || this._ttTeachers[0].id;
    } else {
      this._ttViewMode = 'class';
    }
    App.render('timetable');
  },

  _ttEditingCell: null,

  _ttEditCell(cls, day, period) {
    this._ttEditingCell = { cls, day, period };
    const lesson = this._ttSchedule[cls][day][period];
    const subEl = document.getElementById('ttEditSubject');
    const tchEl = document.getElementById('ttEditTeacher');
    const roomEl = document.getElementById('ttEditRoom');
    if (lesson) {
      subEl.value = lesson.subjectId;
      tchEl.value = lesson.teacherId;
      roomEl.value = lesson.room;
    } else {
      subEl.value = '';
      tchEl.value = this._ttTeachers[0].id;
      roomEl.value = this._ttRooms[0];
    }
    document.getElementById('ttEditConflictWarn').classList.add('d-none');
    const modal = new bootstrap.Modal(document.getElementById('ttEditModal'));
    modal.show();

    // Live conflict check on teacher change
    tchEl.onchange = () => this._ttCheckEditConflict();
    subEl.onchange = () => this._ttCheckEditConflict();
    this._ttCheckEditConflict();
  },

  _ttCheckEditConflict() {
    const cell = this._ttEditingCell;
    if (!cell) return;
    const tchEl = document.getElementById('ttEditTeacher');
    const tid = Number(tchEl.value);
    const warnEl = document.getElementById('ttEditConflictWarn');
    const msgEl = document.getElementById('ttEditConflictMsg');

    // Check if this teacher is already scheduled in another class at same day/period
    for (const cls of this._ttClasses) {
      if (cls === cell.cls) continue;
      const lesson = this._ttSchedule[cls][cell.day][cell.period];
      if (lesson && lesson.teacherId === tid) {
        const teacher = this._ttGetTeacher(tid);
        warnEl.classList.remove('d-none');
        msgEl.textContent = `${teacher.name} כבר מלמד ב${cls} באותו הזמן!`;
        return;
      }
    }
    warnEl.classList.add('d-none');
  },

  async _ttSaveLesson() {
    const cell = this._ttEditingCell;
    if (!cell) return;
    const subVal = document.getElementById('ttEditSubject').value;
    const tchVal = Number(document.getElementById('ttEditTeacher').value);
    const roomVal = document.getElementById('ttEditRoom').value;

    if (!subVal) {
      this._ttSchedule[cell.cls][cell.day][cell.period] = null;
    } else {
      this._ttSchedule[cell.cls][cell.day][cell.period] = {
        subjectId: Number(subVal),
        teacherId: tchVal,
        room: roomVal
      };
    }

    // Persist to API
    try {
      await App.apiCall('update', '\u05DE\u05E2\u05E8\u05DB\u05EA_\u05E9\u05E2\u05D5\u05EA', {
        id: `${cell.cls}_${cell.day}_${cell.period}`,
        row: { class: cell.cls, day: cell.day, period: cell.period, lesson: this._ttSchedule[cell.cls][cell.day][cell.period] }
      });
    } catch (e) { /* fallback: local state already updated */ }

    bootstrap.Modal.getInstance(document.getElementById('ttEditModal'))?.hide();
    this._ttEditingCell = null;
    App.render('timetable');

    if (typeof Utils !== 'undefined' && Utils.toast) {
      Utils.toast('השיעור עודכן בהצלחה', 'success');
    }
  },

  /* ======================================================================
     PRINT
     ====================================================================== */
  _ttPrint() {
    const title = this._ttViewMode === 'teacher'
      ? (this._ttGetTeacher(this._ttSelectedTeacher || this._ttTeachers[0].id)?.name || 'מורה')
      : this._ttSelectedClass;

    const gridHtml = document.querySelector('#tt-grid-card .table-responsive')?.innerHTML || '';
    const printWin = window.open('', '_blank');
    printWin.document.write(`<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <title>מערכת שעות — ${title}</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;700&display=swap');
    body { font-family: 'Heebo', sans-serif; padding: 20px; }
    @media print { .no-print { display: none !important; } }
    table { font-size: 0.85rem; }
  </style>
</head>
<body>
  <div class="text-center mb-3">
    <h4>בית התלמוד — מערכת שעות</h4>
    <h5 class="text-muted">${title}</h5>
  </div>
  ${gridHtml}
  <div class="text-center mt-3 no-print">
    <button class="btn btn-primary" onclick="window.print()">הדפס</button>
  </div>
</body>
</html>`);
    printWin.document.close();
  },

  /* ======================================================================
     INIT
     ====================================================================== */
  timetableLoadDemo() {
    this._ttUseDemo = true;
    App.navigate('timetable');
  },

  async timetableInit() {
    // Try API first, fall back to demo
    try {
      const apiData = await App.getData('\u05DE\u05E2\u05E8\u05DB\u05EA_\u05E9\u05E2\u05D5\u05EA');
      if (apiData && Object.keys(apiData).length > 0) {
        if (apiData.schedule) this._ttSchedule = apiData.schedule;
        if (apiData.subjects) this._ttSubjects = apiData.subjects;
        if (apiData.teachers) this._ttTeachers = apiData.teachers;
        if (apiData.periods) this._ttPeriods = apiData.periods;
      }
    } catch (e) {
      // Use demo data (already generated in timetable() render)
    }
  }
});
