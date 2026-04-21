/* שיעורי עזר - Tutoring Tracking */
(function(){
  let sessions = JSON.parse(localStorage.getItem('bht_tutoring')||'[]');
  const save = ()=> localStorage.setItem('bht_tutoring', JSON.stringify(sessions));
  const subjects = ['גמרא','חומש','הלכה','מתמטיקה','אנגלית','אחר'];
  const payStatus = {paid:'שולם', pending:'ממתין', partial:'חלקי'};
  const payColors = {paid:'success', pending:'warning', partial:'info'};

  window.PageRenderers = window.PageRenderers||{};
  window.PageRenderers.tutoring = function(container){
    const totalHours = sessions.reduce((s,x)=>s+Number(x.hours||0),0);
    const totalPaid = sessions.filter(x=>x.payment==='paid').reduce((s,x)=>s+Number(x.amount||0),0);
    const totalPending = sessions.filter(x=>x.payment!=='paid').reduce((s,x)=>s+Number(x.amount||0),0);
    const tutors = [...new Set(sessions.map(s=>s.tutor).filter(Boolean))];

    let html = `<div class="d-flex justify-content-between align-items-center mb-3">
      <h4 class="fw-bold mb-0"><i class="bi bi-person-workspace me-2"></i>שיעורי עזר</h4>
      <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#tutoring-modal"><i class="bi bi-plus-lg me-1"></i>שיעור חדש</button></div>`;
    html += `<div class="row g-3 mb-3">
      <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-3 fw-bold text-primary">${sessions.length}</div><small class="text-muted">שיעורים</small></div></div>
      <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-3 fw-bold text-info">${totalHours}</div><small class="text-muted">שעות</small></div></div>
      <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-3 fw-bold text-success">${totalPaid.toLocaleString()} ₪</div><small class="text-muted">שולם</small></div></div>
      <div class="col-md-3"><div class="card p-3 text-center"><div class="fs-3 fw-bold text-warning">${totalPending.toLocaleString()} ₪</div><small class="text-muted">ממתין</small></div></div></div>`;
    if(tutors.length){
      html += `<div class="mb-3"><strong>מתגברים:</strong> ${tutors.map(t=>`<span class="badge bg-primary me-1">${t} (${sessions.filter(s=>s.tutor===t).reduce((a,x)=>a+Number(x.hours||0),0)} שע')</span>`).join('')}</div>`;
    }
    html += `<div class="table-responsive"><table class="table table-sm table-striped align-middle"><thead><tr><th>תאריך</th><th>מתגבר</th><th>תלמיד</th><th>נושא</th><th>שעות</th><th>סכום</th><th>תשלום</th><th></th></tr></thead><tbody>`;
    sessions.slice().reverse().forEach((s,i)=>{
      const idx = sessions.length-1-i;
      html += `<tr><td>${s.date||''}</td><td>${s.tutor}</td><td>${s.student}</td><td>${s.subject}</td><td>${s.hours}</td><td>${s.amount||0} ₪</td>
        <td><span class="badge bg-${payColors[s.payment]||'secondary'}">${payStatus[s.payment]||s.payment}</span></td>
        <td><button class="btn btn-outline-danger btn-sm" data-del="${idx}"><i class="bi bi-trash"></i></button></td></tr>`;
    });
    html += `</tbody></table></div>`;
    html += `<div class="modal fade" id="tutoring-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header">
      <h5 class="modal-title">שיעור עזר חדש</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body">
      <div class="mb-2"><label class="form-label">תאריך</label><input type="date" id="tt-date" class="form-control form-control-sm" value="${new Date().toISOString().slice(0,10)}"></div>
      <div class="mb-2"><label class="form-label">מתגבר</label><input type="text" id="tt-tutor" class="form-control form-control-sm" list="tt-tutors"><datalist id="tt-tutors">${tutors.map(t=>`<option value="${t}">`).join('')}</datalist></div>
      <div class="mb-2"><label class="form-label">תלמיד</label><input type="text" id="tt-student" class="form-control form-control-sm"></div>
      <div class="mb-2"><label class="form-label">נושא</label><select id="tt-subject" class="form-select form-select-sm">${subjects.map(s=>`<option>${s}</option>`).join('')}</select></div>
      <div class="row g-2 mb-2"><div class="col"><label class="form-label">שעות</label><input type="number" id="tt-hours" class="form-control form-control-sm" min="0.5" step="0.5" value="1"></div>
        <div class="col"><label class="form-label">סכום</label><input type="number" id="tt-amount" class="form-control form-control-sm" min="0" value="0"></div></div>
      <div class="mb-2"><label class="form-label">תשלום</label><select id="tt-pay" class="form-select form-select-sm"><option value="pending">ממתין</option><option value="paid">שולם</option><option value="partial">חלקי</option></select></div>
      </div><div class="modal-footer"><button class="btn btn-secondary btn-sm" data-bs-dismiss="modal">ביטול</button><button class="btn btn-primary btn-sm" id="tt-save">שמור</button></div></div></div></div>`;
    container.innerHTML = html;
    container.querySelector('#tt-save').onclick = ()=>{
      const tutor=document.getElementById('tt-tutor').value, student=document.getElementById('tt-student').value;
      if(!tutor||!student) return App.toast('נא למלא מתגבר ותלמיד','warning');
      sessions.push({date:document.getElementById('tt-date').value, tutor, student,
        subject:document.getElementById('tt-subject').value, hours:document.getElementById('tt-hours').value,
        amount:document.getElementById('tt-amount').value, payment:document.getElementById('tt-pay').value});
      save(); bootstrap.Modal.getInstance(document.getElementById('tutoring-modal')).hide();
      window.PageRenderers.tutoring(container);
    };
    container.querySelectorAll('[data-del]').forEach(btn=> btn.onclick = ()=>{
      sessions.splice(+btn.dataset.del,1); save(); window.PageRenderers.tutoring(container);
    });
  };
})();
