/* לוח שנה עברי - Full Hebrew Calendar */
(function(){
  const hebFmt = new Intl.DateTimeFormat('he-IL-u-ca-hebrew',{day:'numeric',month:'long',year:'numeric'});
  const hebDay = new Intl.DateTimeFormat('he-IL-u-ca-hebrew',{day:'numeric'});
  const hebMonth = new Intl.DateTimeFormat('he-IL-u-ca-hebrew',{month:'long',year:'numeric'});
  const holidays = [
    {m:9,d:1,name:'ראש השנה',type:'chag'},{m:9,d:2,name:'ראש השנה ב',type:'chag'},
    {m:9,d:3,name:'צום גדליה',type:'fast'},{m:9,d:10,name:'יום כיפור',type:'chag'},
    {m:9,d:15,name:'סוכות',type:'chag'},{m:9,d:22,name:'שמיני עצרת',type:'chag'},
    {m:11,d:25,name:'חנוכה',type:'chag'},{m:0,d:10,name:'צום טבת',type:'fast'},
    {m:2,d:14,name:'פורים',type:'chag'},{m:2,d:13,name:'תענית אסתר',type:'fast'},
    {m:3,d:15,name:'פסח',type:'chag'},{m:4,d:5,name:'יום העצמאות',type:'chag'},
    {m:4,d:18,name:'ל"ג בעומר',type:'chag'},{m:5,d:6,name:'שבועות',type:'chag'},
    {m:6,d:17,name:'צום י"ז בתמוז',type:'fast'},{m:7,d:9,name:'תשעה באב',type:'fast'},
  ];
  const typeColors = {shabbat:'primary',chag:'danger',fast:'secondary',normal:''};
  const typeLabels = {shabbat:'שבת',chag:'חג',fast:'צום'};

  function getDayType(date){
    if(date.getDay()===6) return 'shabbat';
    const hol = holidays.find(h=>h.m===date.getMonth()&&h.d===date.getDate());
    return hol ? hol.type : 'normal';
  }
  function getHoliday(date){
    return holidays.find(h=>h.m===date.getMonth()&&h.d===date.getDate());
  }

  window.PageRenderers = window.PageRenderers||{};
  window.PageRenderers.hebrewcal = function(container){
    let viewDate = new Date();
    render(viewDate);
    function render(vd){
      const year=vd.getFullYear(), month=vd.getMonth();
      const first = new Date(year,month,1), last = new Date(year,month+1,0);
      const startDay = first.getDay(); // 0=Sun
      const hebMonthStr = hebMonth.format(first);
      const gregMonth = vd.toLocaleDateString('he-IL',{month:'long',year:'numeric'});

      let html = `<div class="d-flex justify-content-between align-items-center mb-3">
        <h4 class="fw-bold mb-0"><i class="bi bi-calendar-heart me-2"></i>לוח שנה עברי</h4>
        <div class="btn-group btn-group-sm"><button class="btn btn-outline-primary" id="hc-prev"><i class="bi bi-chevron-right"></i></button>
          <button class="btn btn-outline-primary" id="hc-today">היום</button>
          <button class="btn btn-outline-primary" id="hc-next"><i class="bi bi-chevron-left"></i></button></div></div>`;
      html += `<div class="text-center mb-3"><h5 class="fw-bold mb-0">${hebMonthStr}</h5><small class="text-muted">${gregMonth}</small></div>`;
      html += `<div class="mb-1 d-flex gap-2 justify-content-center"><span class="badge bg-primary">שבת</span><span class="badge bg-danger">חג</span><span class="badge bg-secondary">צום</span></div>`;
      html += `<div class="table-responsive"><table class="table table-bordered text-center mb-4" style="table-layout:fixed"><thead><tr>
        <th>א'</th><th>ב'</th><th>ג'</th><th>ד'</th><th>ה'</th><th>ו'</th><th class="text-primary">ש'</th></tr></thead><tbody><tr>`;
      for(let i=0;i<startDay;i++) html += '<td></td>';
      for(let d=1;d<=last.getDate();d++){
        const dt = new Date(year,month,d), type=getDayType(dt), hol=getHoliday(dt);
        const isToday = dt.toDateString()===new Date().toDateString();
        const bg = type!=='normal' ? `bg-${typeColors[type]} bg-opacity-10` : '';
        const border = isToday ? 'border border-2 border-primary' : '';
        const hebD = hebDay.format(dt);
        html += `<td class="${bg} ${border}" style="height:60px;vertical-align:top;font-size:.85rem">
          <div class="fw-bold">${d}</div><div class="small text-muted">${hebD}</div>
          ${hol?`<div class="small text-${typeColors[type]} fw-bold">${hol.name}</div>`:''}
        </td>`;
        if((startDay+d)%7===0 && d<last.getDate()) html += '</tr><tr>';
      }
      const remaining = (7-(startDay+last.getDate())%7)%7;
      for(let i=0;i<remaining;i++) html += '<td></td>';
      html += '</tr></tbody></table></div>';

      // Upcoming holidays
      const now = new Date(), upcoming = [];
      for(let i=0;i<90;i++){
        const dt = new Date(now.getFullYear(),now.getMonth(),now.getDate()+i);
        const hol = getHoliday(dt);
        if(hol) upcoming.push({...hol, date:dt, hebDate:hebFmt.format(dt), gregDate:dt.toLocaleDateString('he-IL')});
      }
      if(upcoming.length){
        html += `<h5 class="fw-bold mb-2">אירועים קרובים</h5><div class="list-group">`;
        upcoming.forEach(u=>{
          html += `<div class="list-group-item d-flex justify-content-between align-items-center">
            <div><span class="badge bg-${typeColors[u.type]} me-2">${typeLabels[u.type]}</span><strong>${u.name}</strong></div>
            <div class="text-muted small">${u.gregDate} | ${u.hebDate}</div></div>`;
        });
        html += '</div>';
      }
      container.innerHTML = html;
      container.querySelector('#hc-prev').onclick = ()=>{ vd.setMonth(vd.getMonth()-1); render(vd); };
      container.querySelector('#hc-next').onclick = ()=>{ vd.setMonth(vd.getMonth()+1); render(vd); };
      container.querySelector('#hc-today').onclick = ()=>{ render(new Date()); };
    }
  };
})();
