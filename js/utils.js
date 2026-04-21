/* ===== BHT v5.0 — Utilities ===== */

const Utils = {
  /* ---- Full name from שם_פרטי + שם_משפחה or fallback to שם ---- */
  fullName(row) {
    if (row['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9'] || row['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4']) {
      return ((row['\u05E9\u05DD_\u05E4\u05E8\u05D8\u05D9']||'') + ' ' + (row['\u05E9\u05DD_\u05DE\u05E9\u05E4\u05D7\u05D4']||'')).trim();
    }
    return row['\u05E9\u05DD'] || '';
  },

  /* ---- Get ID from מזהה or id ---- */
  rowId(row) {
    return row['\u05DE\u05D6\u05D4\u05D4'] || row['id'] || '';
  },

  /* ---- Hebrew months ---- */
  HEB_MONTHS: [
    '\u05D9\u05E0\u05D5\u05D0\u05E8','\u05E4\u05D1\u05E8\u05D5\u05D0\u05E8','\u05DE\u05E8\u05E5',
    '\u05D0\u05E4\u05E8\u05D9\u05DC','\u05DE\u05D0\u05D9','\u05D9\u05D5\u05E0\u05D9',
    '\u05D9\u05D5\u05DC\u05D9','\u05D0\u05D5\u05D2\u05D5\u05E1\u05D8','\u05E1\u05E4\u05D8\u05DE\u05D1\u05E8',
    '\u05D0\u05D5\u05E7\u05D8\u05D5\u05D1\u05E8','\u05E0\u05D5\u05D1\u05DE\u05D1\u05E8','\u05D3\u05E6\u05DE\u05D1\u05E8'
  ],

  HEB_DAYS: [
    '\u05E8\u05D0\u05E9\u05D5\u05DF','\u05E9\u05E0\u05D9','\u05E9\u05DC\u05D9\u05E9\u05D9',
    '\u05E8\u05D1\u05D9\u05E2\u05D9','\u05D7\u05DE\u05D9\u05E9\u05D9','\u05E9\u05D9\u05E9\u05D9','\u05E9\u05D1\u05EA'
  ],

  /* ---- Date formatting ---- */
  formatDate(d) {
    if (!d) return '';
    const date = d instanceof Date ? d : new Date(d);
    if (isNaN(date)) return d;
    const day = date.getDate();
    const month = this.HEB_MONTHS[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  },

  formatDateShort(d) {
    if (!d) return '';
    const date = d instanceof Date ? d : new Date(d);
    if (isNaN(date)) return d;
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  },

  todayISO() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  },

  dayName() {
    return '\u05D9\u05D5\u05DD ' + this.HEB_DAYS[new Date().getDay()];
  },

  /* ---- Age from birthdate ---- */
  calcAge(birthdate) {
    if (!birthdate) return '';
    const bd = new Date(birthdate);
    if (isNaN(bd)) return '';
    const today = new Date();
    let age = today.getFullYear() - bd.getFullYear();
    const m = today.getMonth() - bd.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < bd.getDate())) age--;
    return age;
  },

  /* ---- Avatar helpers ---- */
  AVATAR_COLORS: [
    '#1a73e8','#ea4335','#0f9d58','#f9ab00','#6366f1',
    '#ec4899','#14b8a6','#f97316','#8b5cf6','#06b6d4',
    '#84cc16','#ef4444','#3b82f6','#10b981','#a855f7'
  ],

  getInitials(name) {
    if (!name) return '??';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return parts[0][0] + parts[1][0];
    return name.substring(0, 2);
  },

  getAvatarColor(name) {
    if (!name) return this.AVATAR_COLORS[0];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return this.AVATAR_COLORS[Math.abs(hash) % this.AVATAR_COLORS.length];
  },

  avatarHTML(name, size = '') {
    const cls = size ? `avatar avatar-${size}` : 'avatar';
    const color = this.getAvatarColor(name);
    const initials = this.getInitials(name);
    return `<div class="${cls}" style="background:${color}">${initials}</div>`;
  },

  /* ---- Currency ---- */
  formatCurrency(n) {
    if (n == null || isNaN(n)) return '\u20AA0';
    return '\u20AA' + Number(n).toLocaleString('he-IL');
  },

  /* ---- Percent ---- */
  formatPercent(n) {
    if (n == null || isNaN(n)) return '0%';
    return Math.round(n) + '%';
  },

  /* ---- Phone formatting ---- */
  formatPhone(phone) {
    if (!phone) return '';
    const p = String(phone).replace(/\D/g, '');
    if (p.length === 10) return p.slice(0,3) + '-' + p.slice(3,6) + '-' + p.slice(6);
    if (p.length === 9) return p.slice(0,2) + '-' + p.slice(2,5) + '-' + p.slice(5);
    return phone;
  },

  /* ---- Toast notification ---- */
  toast(message, type = 'success') {
    const icons = { success: 'check-circle-fill', danger: 'exclamation-triangle-fill', warning: 'exclamation-circle-fill', info: 'info-circle-fill' };
    const container = document.getElementById('toast-container');
    const id = 'toast-' + Date.now();
    const html = `
      <div id="${id}" class="toast toast-bht align-items-center text-bg-${type}" role="alert">
        <div class="d-flex">
          <div class="toast-body d-flex align-items-center gap-2">
            <i class="bi bi-${icons[type] || icons.info}"></i>
            ${message}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
      </div>`;
    container.insertAdjacentHTML('beforeend', html);
    const el = document.getElementById(id);
    const toast = new bootstrap.Toast(el, { delay: 3000 });
    toast.show();
    el.addEventListener('hidden.bs.toast', () => el.remove());
  },

  /* ---- Confirm dialog ---- */
  confirm(title, body) {
    return new Promise(resolve => {
      document.getElementById('confirm-title').textContent = title;
      document.getElementById('confirm-body').textContent = body;
      const modal = new bootstrap.Modal(document.getElementById('confirm-modal'));
      const okBtn = document.getElementById('confirm-ok');
      const handler = () => { modal.hide(); okBtn.removeEventListener('click', handler); resolve(true); };
      okBtn.addEventListener('click', handler);
      document.getElementById('confirm-modal').addEventListener('hidden.bs.modal', () => {
        okBtn.removeEventListener('click', handler);
        resolve(false);
      }, { once: true });
      modal.show();
    });
  },

  /* ---- Skeleton generator ---- */
  skeleton(count = 3) {
    let html = '';
    for (let i = 0; i < count; i++) {
      html += `<div class="card p-3 mb-3"><div class="skeleton skeleton-title"></div><div class="skeleton skeleton-text" style="width:80%"></div><div class="skeleton skeleton-text" style="width:60%"></div></div>`;
    }
    return html;
  },

  skeletonTable(rows = 5, cols = 4) {
    let html = '<table class="table table-bht"><thead><tr>';
    for (let c = 0; c < cols; c++) html += '<th><div class="skeleton skeleton-text" style="width:60%"></div></th>';
    html += '</tr></thead><tbody>';
    for (let r = 0; r < rows; r++) {
      html += '<tr>';
      for (let c = 0; c < cols; c++) html += `<td><div class="skeleton skeleton-text" style="width:${50 + Math.random()*40}%"></div></td>`;
      html += '</tr>';
    }
    return html + '</tbody></table>';
  },

  /* ---- Debounce ---- */
  debounce(fn, ms = 300) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  },

  /* ---- Simple hash for PIN ---- */
  hashPin(pin) {
    let hash = 0;
    const str = 'BHT_' + pin + '_SALT';
    for (let i = 0; i < str.length; i++) {
      const c = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + c;
      hash |= 0;
    }
    return 'bht_' + Math.abs(hash).toString(36);
  },

  /* ---- Generate random ID ---- */
  uid() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  },

  /* ---- Status badge ---- */
  statusBadge(status) {
    const map = {
      '\u05E4\u05E2\u05D9\u05DC': 'active',
      '\u05DC\u05D0_\u05E4\u05E2\u05D9\u05DC': 'inactive',
      '\u05DE\u05DE\u05EA\u05D9\u05DF': 'pending',
      'active': 'active',
      'inactive': 'inactive',
      'pending': 'pending'
    };
    const labels = {
      'active': '\u05E4\u05E2\u05D9\u05DC',
      'inactive': '\u05DC\u05D0 \u05E4\u05E2\u05D9\u05DC',
      'pending': '\u05DE\u05DE\u05EA\u05D9\u05DF'
    };
    const cls = map[status] || 'pending';
    const label = labels[cls] || status;
    return `<span class="badge-status badge-${cls}">${label}</span>`;
  },

  /* ---- Data export: JSON ---- */
  exportJSON(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob);
    link.download = filename || 'export.json'; link.click();
  },

  /* ---- Hebrew calendar date (Intl, no library) ---- */
  hebrewDateFull() {
    try {
      const fmt = new Intl.DateTimeFormat('he-IL-u-ca-hebrew', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
      return fmt.format(new Date());
    } catch(e) { return ''; }
  },

  hebrewDateShort() {
    try {
      const fmt = new Intl.DateTimeFormat('he-IL-u-ca-hebrew', {
        day: 'numeric', month: 'short'
      });
      return fmt.format(new Date());
    } catch(e) { return ''; }
  },

  /* ---- Hebrew calendar date from any date (Intl API) ---- */
  getHebrewDate(date) {
    try {
      const d = date instanceof Date ? date : new Date(date);
      if (isNaN(d)) return null;
      const dayFmt = new Intl.DateTimeFormat('he-IL-u-ca-hebrew', { day: 'numeric' });
      const monthFmt = new Intl.DateTimeFormat('he-IL-u-ca-hebrew', { month: 'long' });
      const yearFmt = new Intl.DateTimeFormat('he-IL-u-ca-hebrew', { year: 'numeric' });
      return {
        day: dayFmt.format(d),
        month: monthFmt.format(d),
        year: yearFmt.format(d),
        full: new Intl.DateTimeFormat('he-IL-u-ca-hebrew', { day:'numeric', month:'long', year:'numeric' }).format(d)
      };
    } catch(e) { return null; }
  },

  /* ---- Birthday helpers (Hebrew calendar) ---- */
  isBirthdayToday(birthdate) {
    if (!birthdate) return false;
    const bd = new Date(birthdate);
    if (isNaN(bd)) return false;
    const today = new Date();
    const todayHeb = this.getHebrewDate(today);
    const bdHeb = this.getHebrewDate(bd);
    if (!todayHeb || !bdHeb) return false;
    return todayHeb.day === bdHeb.day && todayHeb.month === bdHeb.month;
  },

  getUpcomingBirthdays(students, days = 7) {
    const today = new Date();
    const upcoming = [];

    students.forEach(s => {
      const bd = s['\u05EA\u05D0\u05E8\u05D9\u05DA_\u05DC\u05D9\u05D3\u05D4'];
      if (!bd) return;
      const d = new Date(bd);
      if (isNaN(d)) return;

      const bdHeb = this.getHebrewDate(d);
      if (!bdHeb) return;

      // Check each of the next N days for a Hebrew date match
      for (let i = 0; i <= days; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(checkDate.getDate() + i);
        const checkHeb = this.getHebrewDate(checkDate);
        if (checkHeb && checkHeb.day === bdHeb.day && checkHeb.month === bdHeb.month) {
          const age = today.getFullYear() - d.getFullYear();
          upcoming.push({
            name: Utils.fullName(s),
            hebrewDate: bdHeb.day + ' ' + bdHeb.month,
            daysUntil: i,
            age: age,
            gregorianBirth: bd
          });
          break;
        }
      }
    });

    return upcoming.sort((a, b) => a.daysUntil - b.daysUntil);
  },

  /* ---- Data export: CSV from table element ---- */
  exportTableCSV(tableEl, filename) {
    if (!tableEl) return;
    let csv = '\uFEFF';
    tableEl.querySelectorAll('tr').forEach(row => {
      const cells = [...row.querySelectorAll('th,td')].map(c => '"'+c.textContent.replace(/"/g,'""')+'"');
      csv += cells.join(',') + '\n';
    });
    const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob);
    link.download = (filename||'table')+'_'+Utils.todayISO()+'.csv'; link.click();
    Utils.toast('CSV \u05D9\u05D5\u05E6\u05D0');
  },

  /* ---- Sortable table columns ---- */
  initSortableTable(tableId) {
    const table = document.getElementById(tableId);
    if (!table) return;
    table.querySelectorAll('thead th').forEach((th, idx) => {
      th.style.cursor = 'pointer';
      th.style.userSelect = 'none';
      th.innerHTML += ' <i class="bi bi-arrow-down-up" style="font-size:.7rem;opacity:.3"></i>';
      th.addEventListener('click', () => {
        const tbody = table.querySelector('tbody');
        const rows = [...tbody.querySelectorAll('tr')];
        const dir = th.dataset.sortDir === 'asc' ? 'desc' : 'asc';
        // Reset all headers
        table.querySelectorAll('thead th').forEach(h => { h.dataset.sortDir = ''; h.querySelector('i').className = 'bi bi-arrow-down-up'; h.querySelector('i').style.opacity = '.3'; });
        th.dataset.sortDir = dir;
        th.querySelector('i').className = dir === 'asc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down';
        th.querySelector('i').style.opacity = '1';
        rows.sort((a, b) => {
          let aVal = a.cells[idx]?.textContent?.trim() || '';
          let bVal = b.cells[idx]?.textContent?.trim() || '';
          // Try numeric sort
          const aNum = parseFloat(aVal.replace(/[^\d.-]/g, ''));
          const bNum = parseFloat(bVal.replace(/[^\d.-]/g, ''));
          if (!isNaN(aNum) && !isNaN(bNum)) return dir === 'asc' ? aNum - bNum : bNum - aNum;
          // String sort
          return dir === 'asc' ? aVal.localeCompare(bVal, 'he') : bVal.localeCompare(aVal, 'he');
        });
        rows.forEach(r => tbody.appendChild(r));
      });
    });
  },

  /* ---- Pagination ---- */
  paginate(items, page, perPage = 20) {
    const total = Math.ceil(items.length / perPage);
    const start = (page - 1) * perPage;
    return {
      items: items.slice(start, start + perPage),
      page, total, perPage,
      hasNext: page < total,
      hasPrev: page > 1
    };
  },

  paginationHTML(current, total, onClickFn) {
    if (total <= 1) return '';
    let html = '<nav class="mt-3"><ul class="pagination pagination-sm justify-content-center">';
    html += `<li class="page-item ${current <= 1 ? 'disabled' : ''}"><a class="page-link" href="#" onclick="${onClickFn}(${current-1});return false"><i class="bi bi-chevron-right"></i></a></li>`;
    for (let i = 1; i <= Math.min(total, 7); i++) {
      html += `<li class="page-item ${i === current ? 'active' : ''}"><a class="page-link" href="#" onclick="${onClickFn}(${i});return false">${i}</a></li>`;
    }
    if (total > 7) html += `<li class="page-item disabled"><span class="page-link">...${total}</span></li>`;
    html += `<li class="page-item ${current >= total ? 'disabled' : ''}"><a class="page-link" href="#" onclick="${onClickFn}(${current+1});return false"><i class="bi bi-chevron-left"></i></a></li>`;
    html += '</ul></nav>';
    return html;
  },

  /* ---- Copy to clipboard ---- */
  copyText(text) {
    navigator.clipboard.writeText(text).then(() => this.toast('\u05D4\u05D5\u05E2\u05EA\u05E7!')).catch(() => {
      // Fallback
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.toast('\u05D4\u05D5\u05E2\u05EA\u05E7!');
    });
  },

  /* ---- Export all tables on page as CSV ---- */
  exportAllTablesCSV() {
    document.querySelectorAll('.table-bht').forEach((table, idx) => {
      const page = App.currentPage || 'data';
      this.exportTableCSV(table, page + '_' + (idx+1));
    });
  },

  /* ---- Relative time ---- */
  relativeTime(date) {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d)) return date;
    const diff = Math.round((Date.now() - d) / 1000);
    if (diff < 60) return '\u05E2\u05DB\u05E9\u05D9\u05D5';
    if (diff < 3600) return Math.round(diff/60) + ' \u05D3\u05E7\u05D5\u05EA';
    if (diff < 86400) return Math.round(diff/3600) + ' \u05E9\u05E2\u05D5\u05EA';
    if (diff < 604800) return Math.round(diff/86400) + ' \u05D9\u05DE\u05D9\u05DD';
    return this.formatDateShort(date);
  }
};
