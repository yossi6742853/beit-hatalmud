Object.assign(Pages, {
  meals() {
    const days = ['ראשון','שני','שלישי','רביעי','חמישי'];
    const menu = {
      'ראשון': {breakfast:'לחם, חמאה, ריבה, ביצה',lunch:'עוף בתנור, אורז, סלט',snack:'פירות'},
      'שני': {breakfast:'קורנפלקס, חלב, לחם',lunch:'שניצל, פסטה, ירקות',snack:'עוגיות'},
      'שלישי': {breakfast:'שקשוקה, לחם',lunch:'המבורגר, צ\'יפס, סלט',snack:'פירות'},
      'רביעי': {breakfast:'גבינה, לחם, ירקות',lunch:'דגים, קוסקוס, סלט',snack:'חטיפים'},
      'חמישי': {breakfast:'חביתה, לחם טוסט',lunch:'תבשיל בשר, אורז, סלט',snack:'עוגה'}
    };
    const todayName = days[new Date().getDay() - 1] || 'ראשון';
    return `<div class="page-header"><h1><i class="bi bi-egg-fried me-2"></i>תפריט שבועי</h1></div>
      <div class="alert alert-info"><i class="bi bi-info-circle me-2"></i>אלרגיות ידועות: ${3} תלמידים עם רגישות מזון. <a href="#medical">צפה ברשימה</a></div>
      <div class="row g-3">${days.map(d => `<div class="col-md-6 col-lg-4"><div class="card p-3 ${d===todayName?'border-primary border-2':''}">
        <h6 class="fw-bold"><i class="bi bi-calendar-day me-2"></i>יום ${d} ${d===todayName?'<span class="badge bg-primary">היום</span>':''}</h6>
        <div class="mb-2"><small class="text-muted"><i class="bi bi-sunrise me-1"></i>ארוחת בוקר</small><div>${menu[d].breakfast}</div></div>
        <div class="mb-2"><small class="text-muted"><i class="bi bi-sun me-1"></i>ארוחת צהריים</small><div class="fw-bold">${menu[d].lunch}</div></div>
        <div><small class="text-muted"><i class="bi bi-cup-straw me-1"></i>ארוחת ביניים</small><div>${menu[d].snack}</div></div>
      </div></div>`).join('')}</div>`;
  },
  mealsInit() {}
});
