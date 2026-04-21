/* ===== BHT v5.3 — Inventory / Asset Tracking ===== */
Object.assign(Pages, {
  inventory() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-box-seam me-2"></i>מעקב רכוש</h1><p>ניהול רכוש, ציוד ומלאי המוסד</p></div><button class="btn btn-primary btn-sm" onclick="Pages.showAddAsset()"><i class="bi bi-plus-lg me-1"></i>פריט חדש</button></div>
      <div class="row g-3 mb-3">
        <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-primary" id="inv-total">0</div><small>סה"כ פריטים</small></div></div>
        <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-success" id="inv-ok">0</div><small>תקין</small></div></div>
        <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-warning" id="inv-repair">0</div><small>לתיקון</small></div></div>
        <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-4 fw-bold text-danger" id="inv-value">₪0</div><small>שווי כולל</small></div></div>
      </div>
      <div class="card p-3 mb-3"><div class="row g-2"><div class="col-md-6"><div class="search-box"><i class="bi bi-search"></i><input class="form-control" id="inv-search" placeholder="חפש פריט..." oninput="Pages.renderInventory()"></div></div><div class="col-md-3"><select class="form-select" id="inv-cat" onchange="Pages.renderInventory()"><option value="">כל הקטגוריות</option><option>ריהוט</option><option>מחשבים</option><option>ספרים</option><option>חשמל</option><option>כלי מטבח</option><option>ניקיון</option><option>אחר</option></select></div></div></div>
      <div id="inv-list">${Utils.skeleton(3)}</div>`;
  },
  _invData: [
    {id:1,name:'מחשב נייד Dell',category:'מחשבים',location:'מזכירות',quantity:2,value:4500,status:'תקין',purchaseDate:'2025-09-01'},
    {id:2,name:'מדפסת HP LaserJet',category:'מחשבים',location:'מזכירות',quantity:1,value:1200,status:'תקין',purchaseDate:'2025-06-15'},
    {id:3,name:'שולחן תלמיד',category:'ריהוט',location:'כיתה א',quantity:15,value:300,status:'תקין',purchaseDate:'2024-09-01'},
    {id:4,name:'כיסא תלמיד',category:'ריהוט',location:'כיתה א',quantity:15,value:150,status:'2 לתיקון',purchaseDate:'2024-09-01'},
    {id:5,name:'לוח מחיק',category:'ריהוט',location:'כיתה ב',quantity:3,value:400,status:'תקין',purchaseDate:'2025-01-10'},
    {id:6,name:'מזגן תעשייתי',category:'חשמל',location:'אולם',quantity:2,value:8000,status:'תקין',purchaseDate:'2024-06-01'},
    {id:7,name:'מקרר גדול',category:'כלי מטבח',location:'מטבח',quantity:1,value:3500,status:'לתיקון',purchaseDate:'2023-03-15'},
    {id:8,name:'תנור תעשייתי',category:'כלי מטבח',location:'מטבח',quantity:1,value:5000,status:'תקין',purchaseDate:'2024-01-20'},
    {id:9,name:'שואב אבק',category:'ניקיון',location:'מחסן',quantity:2,value:800,status:'תקין',purchaseDate:'2025-03-01'},
    {id:10,name:'מקרן Epson',category:'מחשבים',location:'חדר שיעור',quantity:1,value:2500,status:'תקין',purchaseDate:'2025-08-01'},
    {id:11,name:'סט ספרי גמרא',category:'ספרים',location:'ספרייה',quantity:20,value:200,status:'תקין',purchaseDate:'2024-09-01'},
    {id:12,name:'ארון ספרים',category:'ריהוט',location:'ספרייה',quantity:4,value:1500,status:'תקין',purchaseDate:'2024-09-01'}
  ],
  async inventoryInit() { this.renderInventory(); },
  renderInventory() {
    const search = (document.getElementById('inv-search')?.value||'').toLowerCase();
    const cat = document.getElementById('inv-cat')?.value||'';
    let items = this._invData;
    if (search) items = items.filter(i => i.name.toLowerCase().includes(search) || i.location.toLowerCase().includes(search));
    if (cat) items = items.filter(i => i.category === cat);
    const totalVal = items.reduce((s,i) => s + i.value * i.quantity, 0);
    document.getElementById('inv-total').textContent = items.reduce((s,i) => s+i.quantity, 0);
    document.getElementById('inv-ok').textContent = items.filter(i => i.status === 'תקין').length;
    document.getElementById('inv-repair').textContent = items.filter(i => i.status !== 'תקין').length;
    document.getElementById('inv-value').textContent = Utils.formatCurrency(totalVal);
    const catIcons = {'ריהוט':'bi-lamp','מחשבים':'bi-laptop','ספרים':'bi-book','חשמל':'bi-lightning','כלי מטבח':'bi-cup-hot','ניקיון':'bi-droplet','אחר':'bi-box'};
    document.getElementById('inv-list').innerHTML = `<div class="card"><table class="table table-bht mb-0"><thead><tr><th>פריט</th><th>קטגוריה</th><th>מיקום</th><th>כמות</th><th>שווי</th><th>מצב</th></tr></thead><tbody>${items.map(i => `<tr><td class="fw-bold"><i class="bi ${catIcons[i.category]||'bi-box'} me-2 text-primary"></i>${i.name}</td><td><span class="badge bg-secondary">${i.category}</span></td><td>${i.location}</td><td>${i.quantity}</td><td>${Utils.formatCurrency(i.value * i.quantity)}</td><td><span class="badge ${i.status==='תקין'?'bg-success':'bg-warning'}">${i.status}</span></td></tr>`).join('')}</tbody></table></div>`;
  },
  showAddAsset() { Utils.toast('הוספת פריט - בקרוב','info'); }
});
