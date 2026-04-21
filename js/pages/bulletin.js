Object.assign(Pages, {
  bulletin() {
    return `<div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2"><div><h1><i class="bi bi-megaphone-fill me-2"></i>לוח מודעות</h1></div><button class="btn btn-primary btn-sm" onclick="Pages.showAddBulletin()"><i class="bi bi-plus-lg me-1"></i>מודעה חדשה</button></div>
      <div id="bulletin-list">${Utils.skeleton(3)}</div>`;
  },
  _bulletinData: [
    {id:1, title:'שבת גיבוש - פרשת אמור', content:'שבת גיבוש לכל התלמידים בשבת הקרובה. איסוף ביום שישי בשעה 14:00. נא להביא ציוד שינה.', type:'אירוע', date:'2026-04-24', priority:'high', author:'ההנהלה'},
    {id:2, title:'תשלום שכר לימוד - תזכורת', content:'נא להסדיר תשלומי שכר לימוד עד סוף החודש. ניתן לשלם בהעברה בנקאית או במזומן במזכירות.', type:'כספי', date:'2026-04-21', priority:'medium', author:'גזברות'},
    {id:3, title:'מבחן בגמרא - כיתה א\'', content:'מבחן בגמרא מסכת ברכות דף ב-י ביום רביעי הקרוב.', type:'לימודי', date:'2026-04-23', priority:'normal', author:'הרב סורוצקין'},
    {id:4, title:'חדש! מבצע לימוד ניסן', content:'מבצע לימוד מיוחד לחודש ניסן - פרסים מיוחדים למצטיינים!', type:'מבצע', date:'2026-04-20', priority:'high', author:'ההנהלה'}
  ],
  async bulletinInit() {
    const colors = {'אירוע':'primary','כספי':'warning','לימודי':'info','מבצע':'success','כללי':'secondary'};
    const priorityBadge = {'high':'<span class="badge bg-danger">דחוף</span>','medium':'','normal':''};
    document.getElementById('bulletin-list').innerHTML = this._bulletinData.map(b => `
      <div class="card mb-3 p-0 overflow-hidden" style="border-right:4px solid var(--bht-${colors[b.type]||'secondary'})">
        <div class="card-body p-3">
          <div class="d-flex justify-content-between mb-2">
            <div><span class="badge bg-${colors[b.type]||'secondary'} me-2">${b.type}</span>${priorityBadge[b.priority]||''}<strong class="ms-2">${b.title}</strong></div>
            <small class="text-muted">${Utils.formatDateShort(b.date)}</small>
          </div>
          <p class="mb-2">${b.content}</p>
          <small class="text-muted"><i class="bi bi-person me-1"></i>${b.author}</small>
        </div>
      </div>`).join('');
  },
  showAddBulletin() { Utils.toast('הוספת מודעה - בקרוב','info'); }
});
