/* ===== BHT v5.3 — Facility Map (Enhanced) ===== */
Object.assign(Pages, {
  facilitymap() {
    const rooms = [

      // קומה 0 - קרקע
      {id:1, name:'אולם תפילה', type:'hall', floor:0, capacity:80, status:'available', currentClass:'', teacher:'', equipment:['ארון קודש','במה','מיקרופון','מזגן x2'], gridCol:'1/3', gridRow:'1/2'},
      {id:2, name:'מזכירות', type:'office', floor:0, capacity:4, status:'inuse', currentClass:'', teacher:'יוסף שניידר', equipment:['מחשב','מדפסת','טלפון','מזגן','ארון תיקים'], gridCol:'3/4', gridRow:'1/2'},
      {id:3, name:'חדר מנהל', type:'office', floor:0, capacity:3, status:'inuse', currentClass:'', teacher:'הרב ירושלמי', equipment:['מחשב','טלפון','מזגן','ספרייה'], gridCol:'4/5', gridRow:'1/2'}
  ];

    const statusMap = {
      available:  {label:'פנוי',    color:'#22c55e', bg:'rgba(34,197,94,0.15)',  icon:'bi-check-circle-fill'},
      inuse:      {label:'בשימוש',  color:'#3b82f6', bg:'rgba(59,130,246,0.15)', icon:'bi-person-fill'},
      maintenance:{label:'תחזוקה',  color:'#eab308', bg:'rgba(234,179,8,0.15)',  icon:'bi-tools'},
      closed:     {label:'סגור',    color:'#ef4444', bg:'rgba(239,68,68,0.15)',  icon:'bi-x-circle-fill'}
    };

    const typeIcons = {
      classroom:'bi-book', hall:'bi-columns-gap', office:'bi-person-workspace',
      kitchen:'bi-cup-hot', dining:'bi-egg-fried', library:'bi-book-half',
      yard:'bi-tree', storage:'bi-box', lab:'bi-pc-display',
      meeting:'bi-people', default:'bi-square'
    };

    const floors = [
      {id:0, label:'קומת קרקע', icon:'bi-house-door'},
      {id:1, label:'קומה 1',    icon:'bi-building'},
      {id:2, label:'קומה 2',    icon:'bi-building-up'}
    ];

    const stats = {
      total: rooms.length,
      inuse: rooms.filter(r => r.status === 'inuse').length,
      available: rooms.filter(r => r.status === 'available').length,
      maintenance: rooms.filter(r => r.status === 'maintenance' || r.status === 'closed').length
    };

    const statsCards = `
      <div class="row g-3 mb-4">
        <div class="col-6 col-md-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body text-center p-3">
              <div class="rounded-circle d-inline-flex align-items-center justify-content-center mb-2" style="width:48px;height:48px;background:rgba(99,102,241,0.12)">
                <i class="bi bi-door-open fs-4 text-primary"></i>
              </div>
              <div class="fs-3 fw-bold">${stats.total}</div>
              <small class="text-muted">סה"כ חדרים</small>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body text-center p-3">
              <div class="rounded-circle d-inline-flex align-items-center justify-content-center mb-2" style="width:48px;height:48px;background:rgba(59,130,246,0.12)">
                <i class="bi bi-person-fill fs-4" style="color:#3b82f6"></i>
              </div>
              <div class="fs-3 fw-bold" style="color:#3b82f6">${stats.inuse}</div>
              <small class="text-muted">בשימוש</small>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body text-center p-3">
              <div class="rounded-circle d-inline-flex align-items-center justify-content-center mb-2" style="width:48px;height:48px;background:rgba(34,197,94,0.12)">
                <i class="bi bi-check-circle-fill fs-4" style="color:#22c55e"></i>
              </div>
              <div class="fs-3 fw-bold" style="color:#22c55e">${stats.available}</div>
              <small class="text-muted">פנויים</small>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body text-center p-3">
              <div class="rounded-circle d-inline-flex align-items-center justify-content-center mb-2" style="width:48px;height:48px;background:rgba(234,179,8,0.12)">
                <i class="bi bi-tools fs-4" style="color:#eab308"></i>
              </div>
              <div class="fs-3 fw-bold" style="color:#eab308">${stats.maintenance}</div>
              <small class="text-muted">תחזוקה / סגור</small>
            </div>
          </div>
        </div>
      </div>`;

    const legend = `
      <div class="d-flex flex-wrap gap-3 mb-4 p-3 bg-light rounded-3">
        <span class="fw-bold ms-2"><i class="bi bi-palette me-1"></i>מקרא:</span>
        ${Object.entries(statusMap).map(([k,v]) => `
          <span class="d-flex align-items-center gap-1">
            <span class="rounded-circle d-inline-block" style="width:12px;height:12px;background:${v.color}"></span>
            <small>${v.label}</small>
          </span>`).join('')}
      </div>`;

    const floorTabs = `
      <ul class="nav nav-pills mb-3 gap-2" id="floorTabs" role="tablist">
        ${floors.map((f, i) => `
          <li class="nav-item" role="presentation">
            <button class="nav-link ${i===0?'active':''} px-4" id="floor-tab-${f.id}" data-bs-toggle="pill"
              data-bs-target="#floor-pane-${f.id}" type="button" role="tab">
              <i class="bi ${f.icon} me-1"></i>${f.label}
              <span class="badge bg-secondary bg-opacity-25 text-dark ms-1">${rooms.filter(r=>r.floor===f.id).length}</span>
            </button>
          </li>`).join('')}
      </ul>`;

    const floorPanes = `
      <div class="tab-content" id="floorContent">
        ${floors.map((f, i) => {
          const floorRooms = rooms.filter(r => r.floor === f.id);
          return `
            <div class="tab-pane fade ${i===0?'show active':''}" id="floor-pane-${f.id}" role="tabpanel">
              <div class="facility-grid mb-3">
                ${floorRooms.map(r => {
                  const st = statusMap[r.status];
                  const icon = typeIcons[r.type] || typeIcons.default;
                  return `
                    <div class="facility-room" data-room-id="${r.id}"
                         style="grid-column:${r.gridCol};grid-row:${r.gridRow};background:${st.bg};border:2px solid ${st.color};border-radius:12px;cursor:pointer;transition:all .2s;position:relative;min-height:130px;padding:16px"
                         onclick="Pages._facilityShowRoom(${r.id})"
                         onmouseenter="this.style.transform='scale(1.02)';this.style.boxShadow='0 8px 25px rgba(0,0,0,0.12)'"
                         onmouseleave="this.style.transform='';this.style.boxShadow=''">
                      <span class="position-absolute top-0 end-0 m-2">
                        <span class="badge" style="background:${st.color};font-size:0.7rem"><i class="bi ${st.icon} me-1"></i>${st.label}</span>
                      </span>
                      <div class="d-flex flex-column align-items-center justify-content-center h-100 text-center">
                        <i class="bi ${icon} fs-2 mb-1" style="color:${st.color}"></i>
                        <div class="fw-bold" style="font-size:0.95rem">${r.name}</div>
                        ${r.currentClass ? `<small class="text-primary fw-semibold mt-1"><i class="bi bi-journal-text me-1"></i>${r.currentClass}</small>` : ''}
                        ${r.teacher ? `<small class="text-muted"><i class="bi bi-person me-1"></i>${r.teacher}</small>` : ''}
                        ${r.capacity ? `<small class="text-muted mt-1"><i class="bi bi-people me-1"></i>${r.capacity} מקומות</small>` : ''}
                      </div>
                    </div>`;
                }).join('')}
              </div>
            </div>`;
        }).join('')}
      </div>`;

    const modal = `
      <div class="modal fade" id="roomDetailModal" tabindex="-1">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content" id="roomModalContent"></div>
        </div>
      </div>`;

    const style = `
      <style>
        .facility-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: auto auto;
          gap: 12px;
        }
        @media (max-width: 768px) {
          .facility-grid {
            grid-template-columns: 1fr !important;
          }
          .facility-room {
            grid-column: auto !important;
            grid-row: auto !important;
          }
        }
        .equip-badge {
          display: inline-block;
          padding: 4px 10px;
          margin: 3px;
          border-radius: 20px;
          background: #f1f5f9;
          font-size: 0.8rem;
          color: #475569;
          border: 1px solid #e2e8f0;
        }
        .status-option {
          cursor: pointer;
          padding: 8px 16px;
          border-radius: 8px;
          border: 2px solid transparent;
          transition: all .2s;
        }
        .status-option:hover { background: #f8fafc; }
        .status-option.active { border-color: currentColor; }
      </style>`;

    return `${style}
      <div class="page-header mb-4">
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
          <div>
            <h1 class="mb-1"><i class="bi bi-building me-2"></i>מפת המוסד</h1>
            <p class="text-muted mb-0">בית התלמוד - רחוב הרב קוק 1, בית שמש</p>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-outline-primary btn-sm" onclick="Pages._facilityPrint()">
              <i class="bi bi-printer me-1"></i>הדפסה
            </button>
          </div>
        </div>
      </div>
      ${statsCards}
      ${legend}
      <div class="card border-0 shadow-sm">
        <div class="card-body p-4">
          ${floorTabs}
          ${floorPanes}
        </div>
      </div>
      ${modal}`;
  },

  _facilityUseDemo: false,

  facilitymapLoadDemo() {
    this._facilityUseDemo = true;
    App.navigate('facilitymap');
  },

  facilitymapInit() {
    const _gc = (s) => (typeof DATA_CACHE !== 'undefined' && DATA_CACHE[s]) ? DATA_CACHE[s] : [];
    // Try loading rooms from API, fall back to hardcoded data
    let apiRooms = [];
    try {
      apiRooms = _gc('חדרים');
    } catch(e) { /* use demo */ }

    // Store rooms data globally for modal access
    if (apiRooms && apiRooms.length) {
      Pages._facilityRooms = apiRooms.map((r, i) => ({
        id: r._id || r.id || i + 1,
        name: r['שם'] || r.name || '',
        type: r['סוג'] || r.type || 'classroom',
        floor: parseInt(r['קומה'] || r.floor) || 0,
        capacity: parseInt(r['קיבולת'] || r.capacity) || 0,
        status: r['סטטוס'] || r.status || 'available',
        currentClass: r['שיעור_נוכחי'] || r.currentClass || '',
        teacher: r['מורה'] || r.teacher || '',
        equipment: (r['ציוד'] || r.equipment || '').split ? (r['ציוד'] || '').split(',').map(s => s.trim()).filter(Boolean) : (r.equipment || [])
      }));
    } else {
    Pages._facilityRooms = [

      {id:1, name:'אולם תפילה', type:'hall', floor:0, capacity:80, status:'available', currentClass:'', teacher:'', equipment:['ארון קודש','במה','מיקרופון','מזגן x2']},
      {id:2, name:'מזכירות', type:'office', floor:0, capacity:4, status:'inuse', currentClass:'', teacher:'יוסף שניידר', equipment:['מחשב','מדפסת','טלפון','מזגן','ארון תיקים']},
      {id:3, name:'חדר מנהל', type:'office', floor:0, capacity:3, status:'inuse', currentClass:'', teacher:'הרב ירושלמי', equipment:['מחשב','טלפון','מזגן','ספרייה']}
  ];
    } // end else (demo data)

    Pages._facilityStatusMap = {
      available:  {label:'פנוי',    color:'#22c55e', icon:'bi-check-circle-fill'},
      inuse:      {label:'בשימוש',  color:'#3b82f6', icon:'bi-person-fill'},
      maintenance:{label:'תחזוקה',  color:'#eab308', icon:'bi-tools'},
      closed:     {label:'סגור',    color:'#ef4444', icon:'bi-x-circle-fill'}
    };

    Pages._facilityTypeLabels = {
      classroom:'כיתה', hall:'אולם', office:'משרד', kitchen:'מטבח',
      dining:'חדר אוכל', library:'ספרייה', yard:'חצר', storage:'מחסן',
      lab:'מעבדה', meeting:'חדר ישיבות'
    };

    Pages._facilityTypeIcons = {
      classroom:'bi-book', hall:'bi-columns-gap', office:'bi-person-workspace',
      kitchen:'bi-cup-hot', dining:'bi-egg-fried', library:'bi-book-half',
      yard:'bi-tree', storage:'bi-box', lab:'bi-pc-display',
      meeting:'bi-people'
    };
  },

  _facilityShowRoom(id) {
    const r = Pages._facilityRooms.find(rm => rm.id === id);
    if (!r) return;
    const st = Pages._facilityStatusMap[r.status];
    const typeLabel = Pages._facilityTypeLabels[r.type] || r.type;
    const typeIcon = Pages._facilityTypeIcons[r.type] || 'bi-square';
    const floorLabels = {0:'קומת קרקע', 1:'קומה 1', 2:'קומה 2'};

    document.getElementById('roomModalContent').innerHTML = `
      <div class="modal-header border-0 pb-0" style="background:linear-gradient(135deg,${st.color}22,${st.color}08)">
        <div>
          <h4 class="modal-title fw-bold mb-1">
            <i class="bi ${typeIcon} me-2" style="color:${st.color}"></i>${r.name}
          </h4>
          <div class="d-flex gap-2 align-items-center">
            <span class="badge" style="background:${st.color}"><i class="bi ${st.icon} me-1"></i>${st.label}</span>
            <small class="text-muted">${typeLabel} | ${floorLabels[r.floor]}</small>
          </div>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <div class="row g-3 mb-4">
          <div class="col-sm-4">
            <div class="text-center p-3 rounded-3" style="background:#f8fafc">
              <i class="bi bi-people fs-4 text-primary d-block mb-1"></i>
              <div class="fw-bold fs-5">${r.capacity}</div>
              <small class="text-muted">קיבולת מקומות</small>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="text-center p-3 rounded-3" style="background:#f8fafc">
              <i class="bi bi-person-badge fs-4 text-success d-block mb-1"></i>
              <div class="fw-bold">${r.teacher || '---'}</div>
              <small class="text-muted">אחראי / מורה</small>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="text-center p-3 rounded-3" style="background:#f8fafc">
              <i class="bi bi-journal-text fs-4 text-info d-block mb-1"></i>
              <div class="fw-bold">${r.currentClass || '---'}</div>
              <small class="text-muted">שיעור נוכחי</small>
            </div>
          </div>
        </div>

        <h6 class="fw-bold mb-3"><i class="bi bi-box-seam me-2"></i>ציוד בחדר (${r.equipment.length})</h6>
        <div class="mb-4">
          ${r.equipment.map(eq => `<span class="equip-badge"><i class="bi bi-check2 me-1 text-success"></i>${eq}</span>`).join('')}
        </div>

        <h6 class="fw-bold mb-3"><i class="bi bi-palette me-2"></i>שינוי סטטוס</h6>
        <div class="d-flex flex-wrap gap-2 mb-3">
          ${Object.entries(Pages._facilityStatusMap).map(([key, val]) => `
            <div class="status-option d-flex align-items-center gap-2 ${r.status===key?'active':''}"
                 style="color:${val.color};${r.status===key?'border-color:'+val.color+' !important':''}"
                 onclick="Pages._facilityChangeStatus(${r.id},'${key}')">
              <i class="bi ${val.icon}"></i>
              <span class="fw-semibold">${val.label}</span>
            </div>`).join('')}
        </div>

        <div class="row g-3">
          <div class="col-sm-6">
            <label class="form-label fw-semibold">שיעור נוכחי</label>
            <input type="text" class="form-control" id="roomClassInput" value="${r.currentClass}" placeholder="למשל: שיעור גמרא">
          </div>
          <div class="col-sm-6">
            <label class="form-label fw-semibold">מורה / אחראי</label>
            <input type="text" class="form-control" id="roomTeacherInput" value="${r.teacher}" placeholder="שם המורה">
          </div>
        </div>
      </div>
      <div class="modal-footer border-0">
        <button class="btn btn-secondary" data-bs-dismiss="modal">סגור</button>
        <button class="btn btn-primary" onclick="Pages._facilitySaveRoom(${r.id})">
          <i class="bi bi-check-lg me-1"></i>שמור שינויים
        </button>
      </div>`;

    new bootstrap.Modal(document.getElementById('roomDetailModal')).show();
  },

  _facilityChangeStatus(id, newStatus) {
    const r = Pages._facilityRooms.find(rm => rm.id === id);
    if (!r) return;
    r.status = newStatus;
    // Re-render modal
    Pages._facilityShowRoom(id);
    // Update grid card
    Pages._facilityUpdateCard(id);
  },

  async _facilitySaveRoom(id) {
    const r = Pages._facilityRooms.find(rm => rm.id === id);
    if (!r) return;
    const classInput = document.getElementById('roomClassInput');
    const teacherInput = document.getElementById('roomTeacherInput');
    if (classInput) r.currentClass = classInput.value;
    if (teacherInput) r.teacher = teacherInput.value;

    // Save to API
    try {
      await App.apiCall('update', 'חדרים', { id, row: { 'סטטוס': r.status, 'שיעור_נוכחי': r.currentClass, 'מורה': r.teacher } });
    } catch(e) { /* localStorage fallback */ }

    Pages._facilityUpdateCard(id);
    bootstrap.Modal.getInstance(document.getElementById('roomDetailModal')).hide();
    // Show toast
    Pages._facilityToast(`חדר "${r.name}" עודכן בהצלחה`);
  },

  _facilityUpdateCard(id) {
    const r = Pages._facilityRooms.find(rm => rm.id === id);
    if (!r) return;
    const st = Pages._facilityStatusMap[r.status];
    const card = document.querySelector(`[data-room-id="${id}"]`);
    if (!card) return;
    card.style.background = st.color + '22';
    card.style.borderColor = st.color;
    // Update badge
    const badge = card.querySelector('.badge');
    if (badge) {
      badge.style.background = st.color;
      badge.innerHTML = `<i class="bi ${st.icon} me-1"></i>${st.label}`;
    }
    // Update teacher/class text
    const details = card.querySelector('.d-flex.flex-column');
    if (details) {
      const classEl = details.querySelector('.text-primary');
      const teacherEl = details.querySelector('.text-muted:not(:last-child)');
      if (classEl && r.currentClass) classEl.innerHTML = `<i class="bi bi-journal-text me-1"></i>${r.currentClass}`;
      if (teacherEl && r.teacher) teacherEl.innerHTML = `<i class="bi bi-person me-1"></i>${r.teacher}`;
    }
  },

  _facilityToast(msg) {
    const el = document.createElement('div');
    el.className = 'position-fixed bottom-0 start-50 translate-middle-x mb-4 px-4 py-2 rounded-pill shadow-lg text-white fw-semibold';
    el.style.cssText = 'background:#22c55e;z-index:9999;animation:fadeInUp .3s';
    el.innerHTML = `<i class="bi bi-check-circle me-2"></i>${msg}`;
    document.body.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .3s'; setTimeout(() => el.remove(), 300); }, 2500);
  },

  _facilityPrint() {
    window.print();
  }
});
