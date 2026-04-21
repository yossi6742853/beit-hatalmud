Object.assign(Pages, {
  transport() {
    const routes = [
      {name:'קו 1 - רמת בית שמש א\'',driver:'משה כהן',phone:'0521234567',time:'07:15',students:12,stops:['רח\' נחל לכיש','רח\' נחל שורק','רח\' הרב עובדיה']},
      {name:'קו 2 - רמת בית שמש ב\'',driver:'אברהם לוי',phone:'0539876543',time:'07:20',students:8,stops:['רח\' אלון','רח\' ברוש','כיכר המייסדים']},
      {name:'קו 3 - בית שמש ישנה',driver:'דוד פרידמן',phone:'0547654321',time:'07:10',students:15,stops:['רח\' הרצל','רח\' יפו','רח\' הרב קוק']}
    ];
    return `<div class="page-header"><h1><i class="bi bi-bus-front me-2"></i>הסעות</h1></div>
      <div class="row g-3">${routes.map(r => `<div class="col-md-6 col-lg-4"><div class="card p-3">
        <h6 class="fw-bold"><i class="bi bi-bus-front text-primary me-2"></i>${r.name}</h6>
        <div class="small mb-2"><i class="bi bi-person me-1"></i>נהג: ${r.driver} <a href="tel:${r.phone}" class="ms-2"><i class="bi bi-telephone"></i></a></div>
        <div class="small mb-2"><i class="bi bi-clock me-1"></i>יציאה: ${r.time} | <span class="badge bg-primary">${r.students} תלמידים</span></div>
        <div class="small"><i class="bi bi-geo-alt me-1"></i>תחנות: ${r.stops.join(' → ')}</div>
      </div></div>`).join('')}</div>`;
  },
  transportInit() {}
});
