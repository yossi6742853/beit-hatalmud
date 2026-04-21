/* ===== BHT v5.3 — Facility Map ===== */
Object.assign(Pages, {
  facilitymap() {
    const rooms = [
      {name:'כיתה א\'',type:'classroom',students:8,teacher:'הרב כהן',floor:1,color:'#2563eb'},
      {name:'כיתה ב\'',type:'classroom',students:7,teacher:'הרב גולדשטיין',floor:1,color:'#0f9d58'},
      {name:'כיתה ג\'',type:'classroom',students:5,teacher:'הרב שפירא',floor:1,color:'#f9ab00'},
      {name:'אולם תפילה',type:'hall',students:0,teacher:'',floor:0,color:'#8b5cf6'},
      {name:'מזכירות',type:'office',students:0,teacher:'יוסף שניידר',floor:0,color:'#06b6d4'},
      {name:'חדר מנהל',type:'office',students:0,teacher:'הרב ירושלמי',floor:0,color:'#ec4899'},
      {name:'מטבח + חדר אוכל',type:'kitchen',students:0,teacher:'',floor:0,color:'#f97316'},
      {name:'ספרייה',type:'library',students:0,teacher:'',floor:1,color:'#14b8a6'},
      {name:'חצר',type:'yard',students:0,teacher:'',floor:0,color:'#84cc16'},
      {name:'מחסן',type:'storage',students:0,teacher:'',floor:0,color:'#6b7280'}
    ];
    const icons = {classroom:'bi-book',hall:'bi-columns-gap',office:'bi-person-workspace',kitchen:'bi-cup-hot',library:'bi-book-half',yard:'bi-tree',storage:'bi-box'};
    return `<div class="page-header"><h1><i class="bi bi-building me-2"></i>מפת המוסד</h1><p>בית התלמוד - רחוב הרב קוק 1, בית שמש</p></div>
      <div class="row g-3 mb-3"><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-primary">${rooms.length}</div><small>חדרים</small></div></div><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-success">${rooms.filter(r=>r.type==='classroom').length}</div><small>כיתות</small></div></div><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold">${rooms.reduce((s,r)=>s+r.students,0)}</div><small>תלמידים</small></div></div><div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold">2</div><small>קומות</small></div></div></div>
      <div class="card p-3"><h6 class="fw-bold mb-3">קומה 0 - קרקע</h6><div class="row g-2 mb-4">${rooms.filter(r=>r.floor===0).map(r => `<div class="col-md-4 col-lg-3"><div class="card p-3 text-center" style="border-top:4px solid ${r.color};min-height:120px"><i class="bi ${icons[r.type]||'bi-square'} fs-2" style="color:${r.color}"></i><div class="fw-bold mt-2">${r.name}</div>${r.teacher?`<small class="text-muted">${r.teacher}</small>`:''}</div></div>`).join('')}</div>
      <h6 class="fw-bold mb-3">קומה 1</h6><div class="row g-2">${rooms.filter(r=>r.floor===1).map(r => `<div class="col-md-4 col-lg-3"><div class="card p-3 text-center" style="border-top:4px solid ${r.color};min-height:120px"><i class="bi ${icons[r.type]||'bi-square'} fs-2" style="color:${r.color}"></i><div class="fw-bold mt-2">${r.name}</div>${r.teacher?`<small class="text-muted">${r.teacher}</small>`:''}${r.students?`<span class="badge bg-primary mt-1">${r.students} תלמידים</span>`:''}</div></div>`).join('')}</div></div>`;
  },
  facilitymapInit() {}
});
