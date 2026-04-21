/* ניהול חדרים - Room/Facility Management */
(function(){
  const ROOMS = [
    {id:1,name:'כיתה א',capacity:30,type:'כיתה'},
    {id:2,name:'כיתה ב',capacity:25,type:'כיתה'},
    {id:3,name:'בית מדרש',capacity:80,type:'אולם'},
    {id:4,name:'חדר מורים',capacity:10,type:'משרד'},
    {id:5,name:'מעבדה',capacity:20,type:'מעבדה'},
    {id:6,name:'ספרייה',capacity:15,type:'ספרייה'}
  ];
  let bookings = JSON.parse(localStorage.getItem('bht_bookings')||'[]');
  const save = ()=> localStorage.setItem('bht_bookings', JSON.stringify(bookings));
  const statusColors = {available:'success', occupied:'danger', maintenance:'secondary'};
  const statusLabels = {available:'פנוי', occupied:'תפוס', maintenance:'תחזוקה'};

  function getStatus(room){
    const now = new Date(), ts = now.toISOString().slice(0,16);
    const active = bookings.find(b=> b.roomId===room.id && b.start<=ts && b.end>=ts);
    return active ? {s:'occupied',who:active.who} : {s:'available',who:''};
  }

  window.PageRenderers = window.PageRenderers||{};
  window.PageRenderers.rooms = function(container){
    const today = new Date().toISOString().slice(0,10);
    let html = `<div class="d-flex justify-content-between align-items-center mb-3">
      <h4 class="fw-bold mb-0"><i class="bi bi-door-open me-2"></i>ניהול חדרים</h4>
      <button class="btn btn-primary btn-sm" onclick="document.getElementById('rooms-book-form').classList.toggle('d-none')"><i class="bi bi-plus-lg me-1"></i>הזמנה חדשה</button></div>`;
    html += `<div id="rooms-book-form" class="card p-3 mb-3 d-none"><div class="row g-2">
      <div class="col-md-3"><select id="rb-room" class="form-select form-select-sm">${ROOMS.map(r=>`<option value="${r.id}">${r.name}</option>`).join('')}</select></div>
      <div class="col-md-2"><input type="text" id="rb-who" class="form-control form-control-sm" placeholder="שם המזמין"></div>
      <div class="col-md-2"><input type="datetime-local" id="rb-start" class="form-control form-control-sm"></div>
      <div class="col-md-2"><input type="datetime-local" id="rb-end" class="form-control form-control-sm"></div>
      <div class="col-md-2"><input type="text" id="rb-purpose" class="form-control form-control-sm" placeholder="מטרה"></div>
      <div class="col-md-1"><button class="btn btn-success btn-sm w-100" id="rb-save">שמור</button></div></div></div>`;
    html += `<div class="row g-3 mb-4">${ROOMS.map(r=>{
      const st = getStatus(r);
      return `<div class="col-md-4"><div class="card p-3"><div class="d-flex justify-content-between align-items-center mb-2">
        <h6 class="fw-bold mb-0">${r.name}</h6><span class="badge bg-${statusColors[st.s]}">${statusLabels[st.s]}</span></div>
        <small class="text-muted">סוג: ${r.type} | קיבולת: ${r.capacity}</small>
        ${st.who?`<div class="mt-1 small"><i class="bi bi-person me-1"></i>${st.who}</div>`:''}</div></div>`;
    }).join('')}</div>`;
    html += `<h5 class="fw-bold mb-2">הזמנות</h5><div class="table-responsive"><table class="table table-sm table-striped align-middle"><thead><tr><th>חדר</th><th>מזמין</th><th>התחלה</th><th>סיום</th><th>מטרה</th><th></th></tr></thead><tbody>`;
    bookings.slice().reverse().forEach((b,i)=>{
      const room = ROOMS.find(r=>r.id===b.roomId);
      html += `<tr><td>${room?room.name:b.roomId}</td><td>${b.who}</td><td>${b.start.replace('T',' ')}</td><td>${b.end.replace('T',' ')}</td><td>${b.purpose||''}</td>
        <td><button class="btn btn-outline-danger btn-sm" data-del="${bookings.length-1-i}"><i class="bi bi-trash"></i></button></td></tr>`;
    });
    html += `</tbody></table></div>`;
    container.innerHTML = html;
    container.querySelector('#rb-save').onclick = ()=>{
      const roomId=+document.getElementById('rb-room').value, who=document.getElementById('rb-who').value,
        start=document.getElementById('rb-start').value, end=document.getElementById('rb-end').value, purpose=document.getElementById('rb-purpose').value;
      if(!who||!start||!end) return App.toast('נא למלא שם, התחלה וסיום','warning');
      bookings.push({roomId,who,start,end,purpose}); save();
      window.PageRenderers.rooms(container);
    };
    container.querySelectorAll('[data-del]').forEach(btn=> btn.onclick = ()=>{
      bookings.splice(+btn.dataset.del,1); save(); window.PageRenderers.rooms(container);
    });
  };
})();
