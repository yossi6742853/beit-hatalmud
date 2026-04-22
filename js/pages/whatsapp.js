/* ===== BHT v6.0 — WhatsApp Messaging Center ===== */
Object.assign(Pages, {

  /* ---- State ---- */
  _waTab: 'send',
  _waSelectedRecipients: new Set(),
  _waSelectedGroup: null,
  _waSearchQuery: '',

  /* ---- Demo Data: Broadcast Groups ---- */
  _waGroups: [
    { id: 'g1', name: '\u05D4\u05D5\u05E8\u05D9 \u05DB\u05D9\u05EA\u05D4 \u05D0', members: ['\u05D9\u05E2\u05E7\u05D1 \u05DB\u05D4\u05DF','\u05E8\u05D7\u05DC \u05DC\u05D5\u05D9','\u05D0\u05D1\u05E8\u05D4\u05DD \u05DC\u05D5\u05D9','\u05D3\u05D1\u05D5\u05E8\u05D4 \u05DB\u05D4\u05DF','\u05E0\u05EA\u05E0\u05D0\u05DC \u05E4\u05E8\u05D9\u05D3\u05DE\u05DF'], phones: ['0501234501','0521234502','0531234503','0541234504','0551234505'], icon: 'bi-people-fill', color: '#4e73df' },
    { id: 'g2', name: '\u05D4\u05D5\u05E8\u05D9 \u05DB\u05D9\u05EA\u05D4 \u05D1', members: ['\u05DE\u05E9\u05D4 \u05D3\u05D5\u05D3','\u05E9\u05DE\u05E2\u05D5\u05DF \u05D2\u05E8\u05D9\u05E0\u05D1\u05E8\u05D2','\u05D0\u05DC\u05D9\u05D4\u05D5 \u05DE\u05D6\u05E8\u05D7\u05D9','\u05D7\u05D9\u05D9\u05DD \u05E4\u05E8\u05E5'], phones: ['0501234506','0521234507','0531234508','0541234509'], icon: 'bi-people-fill', color: '#1cc88a' },
    { id: 'g3', name: '\u05DB\u05DC \u05D4\u05D4\u05D5\u05E8\u05D9\u05DD', members: ['\u05D9\u05E2\u05E7\u05D1 \u05DB\u05D4\u05DF','\u05E8\u05D7\u05DC \u05DC\u05D5\u05D9','\u05D0\u05D1\u05E8\u05D4\u05DD \u05DC\u05D5\u05D9','\u05D3\u05D1\u05D5\u05E8\u05D4 \u05DB\u05D4\u05DF','\u05E0\u05EA\u05E0\u05D0\u05DC \u05E4\u05E8\u05D9\u05D3\u05DE\u05DF','\u05DE\u05E9\u05D4 \u05D3\u05D5\u05D3','\u05E9\u05DE\u05E2\u05D5\u05DF \u05D2\u05E8\u05D9\u05E0\u05D1\u05E8\u05D2','\u05D0\u05DC\u05D9\u05D4\u05D5 \u05DE\u05D6\u05E8\u05D7\u05D9','\u05D7\u05D9\u05D9\u05DD \u05E4\u05E8\u05E5'], phones: ['0501234501','0521234502','0531234503','0541234504','0551234505','0501234506','0521234507','0531234508','0541234509'], icon: 'bi-people', color: '#f6c23e' },
    { id: 'g4', name: '\u05DB\u05DC \u05D4\u05E6\u05D5\u05D5\u05EA', members: ['\u05D4\u05E8\u05D1 \u05D9\u05E8\u05D5\u05E9\u05DC\u05DE\u05D9','\u05D4\u05E8\u05D1 \u05DB\u05D4\u05DF','\u05DE\u05E9\u05D4 \u05D3\u05D5\u05D3'], phones: ['0501234510','0521234511','0531234512'], icon: 'bi-mortarboard-fill', color: '#6f42c1' },
    { id: 'g5', name: '\u05D5\u05E2\u05D3 \u05D4\u05D5\u05E8\u05D9\u05DD', members: ['\u05D9\u05E2\u05E7\u05D1 \u05DB\u05D4\u05DF','\u05E8\u05D7\u05DC \u05DC\u05D5\u05D9','\u05D3\u05D1\u05D5\u05E8\u05D4 \u05DB\u05D4\u05DF'], phones: ['0501234501','0521234502','0541234504'], icon: 'bi-clipboard-check', color: '#e74a3b' }
  ],

  /* ---- Demo Data: Individual Contacts ---- */
  _waContacts: [
    { name: '\u05D9\u05E2\u05E7\u05D1 \u05DB\u05D4\u05DF', phone: '0501234501', class: '\u05DB\u05D9\u05EA\u05D4 \u05D0', type: '\u05D4\u05D5\u05E8\u05D4' },
    { name: '\u05E8\u05D7\u05DC \u05DC\u05D5\u05D9', phone: '0521234502', class: '\u05DB\u05D9\u05EA\u05D4 \u05D0', type: '\u05D4\u05D5\u05E8\u05D4' },
    { name: '\u05D0\u05D1\u05E8\u05D4\u05DD \u05DC\u05D5\u05D9', phone: '0531234503', class: '\u05DB\u05D9\u05EA\u05D4 \u05D0', type: '\u05D4\u05D5\u05E8\u05D4' },
    { name: '\u05D3\u05D1\u05D5\u05E8\u05D4 \u05DB\u05D4\u05DF', phone: '0541234504', class: '\u05DB\u05D9\u05EA\u05D4 \u05D0', type: '\u05D4\u05D5\u05E8\u05D4' },
    { name: '\u05E0\u05EA\u05E0\u05D0\u05DC \u05E4\u05E8\u05D9\u05D3\u05DE\u05DF', phone: '0551234505', class: '\u05DB\u05D9\u05EA\u05D4 \u05D0', type: '\u05D4\u05D5\u05E8\u05D4' },
    { name: '\u05DE\u05E9\u05D4 \u05D3\u05D5\u05D3', phone: '0501234506', class: '\u05DB\u05D9\u05EA\u05D4 \u05D1', type: '\u05D4\u05D5\u05E8\u05D4' },
    { name: '\u05E9\u05DE\u05E2\u05D5\u05DF \u05D2\u05E8\u05D9\u05E0\u05D1\u05E8\u05D2', phone: '0521234507', class: '\u05DB\u05D9\u05EA\u05D4 \u05D1', type: '\u05D4\u05D5\u05E8\u05D4' },
    { name: '\u05D0\u05DC\u05D9\u05D4\u05D5 \u05DE\u05D6\u05E8\u05D7\u05D9', phone: '0531234508', class: '\u05DB\u05D9\u05EA\u05D4 \u05D1', type: '\u05D4\u05D5\u05E8\u05D4' },
    { name: '\u05D7\u05D9\u05D9\u05DD \u05E4\u05E8\u05E5', phone: '0541234509', class: '\u05DB\u05D9\u05EA\u05D4 \u05D1', type: '\u05D4\u05D5\u05E8\u05D4' },
    { name: '\u05D4\u05E8\u05D1 \u05D9\u05E8\u05D5\u05E9\u05DC\u05DE\u05D9', phone: '0501234510', class: '', type: '\u05E6\u05D5\u05D5\u05EA' },
    { name: '\u05D4\u05E8\u05D1 \u05DB\u05D4\u05DF', phone: '0521234511', class: '', type: '\u05E6\u05D5\u05D5\u05EA' },
    { name: '\u05DE\u05E9\u05D4 \u05D3\u05D5\u05D3 (\u05DE\u05D5\u05E8\u05D4)', phone: '0531234512', class: '', type: '\u05E6\u05D5\u05D5\u05EA' }
  ],

  /* ---- Demo Data: Message Templates ---- */
  _waTemplates: [
    { id: 't1', name: '\u05D4\u05D5\u05D3\u05E2\u05EA \u05D7\u05D9\u05E1\u05D5\u05E8', icon: 'bi-calendar-x', color: 'danger', body: '\u05E9\u05DC\u05D5\u05DD {name},\n\u05D1\u05E8\u05E6\u05D5\u05E0\u05E0\u05D5 \u05DC\u05D4\u05D5\u05D3\u05D9\u05E2 \u05DB\u05D9 \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3 {student} \u05DE\u05DB\u05D9\u05EA\u05D4 {class} \u05DC\u05D0 \u05D4\u05D2\u05D9\u05E2 \u05DC\u05DC\u05D9\u05DE\u05D5\u05D3\u05D9\u05DD \u05D1\u05D9\u05D5\u05DD {date}.\n\u05E0\u05D0 \u05DC\u05D9\u05D3\u05E2 \u05D0\u05D5\u05EA\u05E0\u05D5 \u05D0\u05DD \u05D9\u05E9 \u05E1\u05D9\u05D1\u05D4 \u05DE\u05D9\u05D5\u05D7\u05D3\u05EA.\n\u05D1\u05D1\u05E8\u05DB\u05D4, \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3' },
    { id: 't2', name: '\u05D4\u05D5\u05D3\u05E2\u05EA \u05D0\u05D9\u05D7\u05D5\u05E8', icon: 'bi-clock-history', color: 'warning', body: '\u05E9\u05DC\u05D5\u05DD {name},\n\u05D4\u05EA\u05DC\u05DE\u05D9\u05D3 {student} \u05D4\u05D2\u05D9\u05E2 \u05D1\u05D0\u05D9\u05D7\u05D5\u05E8 \u05DC\u05DC\u05D9\u05DE\u05D5\u05D3\u05D9\u05DD \u05D1\u05D9\u05D5\u05DD {date}.\n\u05E0\u05D1\u05E7\u05E9 \u05DC\u05D4\u05E7\u05E4\u05D9\u05D3 \u05E2\u05DC \u05D4\u05D2\u05E2\u05D4 \u05D1\u05D6\u05DE\u05DF.\n\u05D1\u05D1\u05E8\u05DB\u05D4, \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3' },
    { id: 't3', name: '\u05EA\u05D6\u05DB\u05D5\u05E8\u05EA \u05EA\u05E9\u05DC\u05D5\u05DD', icon: 'bi-credit-card', color: 'info', body: '\u05E9\u05DC\u05D5\u05DD {name},\n\u05D6\u05D5 \u05EA\u05D6\u05DB\u05D5\u05E8\u05EA \u05DC\u05EA\u05E9\u05DC\u05D5\u05DD \u05E9\u05DB\u05E8 \u05DC\u05D9\u05DE\u05D5\u05D3 \u05E2\u05D1\u05D5\u05E8 {student} \u05D1\u05DB\u05D9\u05EA\u05D4 {class}.\n\u05E0\u05D0 \u05DC\u05D4\u05E1\u05D3\u05D9\u05E8 \u05D0\u05EA \u05D4\u05EA\u05E9\u05DC\u05D5\u05DD \u05D1\u05D4\u05E7\u05D3\u05DD.\n\u05EA\u05D5\u05D3\u05D4, \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3' },
    { id: 't4', name: '\u05D4\u05D6\u05DE\u05E0\u05D4 \u05DC\u05E4\u05D2\u05D9\u05E9\u05D4', icon: 'bi-calendar-event', color: 'primary', body: '\u05E9\u05DC\u05D5\u05DD {name},\n\u05D4\u05E0\u05DB\u05DD/\u05D4 \u05DE\u05D5\u05D6\u05DE\u05DF/\u05EA \u05DC\u05E4\u05D2\u05D9\u05E9\u05D4 \u05D1\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3 \u05D1\u05EA\u05D0\u05E8\u05D9\u05DA {date}.\n\u05E0\u05D5\u05E9\u05D0: \u05D4\u05EA\u05E7\u05D3\u05DE\u05D5\u05EA \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3 {student}.\n\u05D1\u05D1\u05E8\u05DB\u05D4, \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3' },
    { id: 't5', name: '\u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05DE\u05D1\u05D7\u05DF', icon: 'bi-journal-check', color: 'success', body: '\u05E9\u05DC\u05D5\u05DD {name},\n\u05E9\u05DE\u05D7\u05D9\u05DD \u05DC\u05D4\u05D5\u05D3\u05D9\u05E2 \u05DB\u05D9 \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3 {student} \u05E7\u05D9\u05D1\u05DC \u05D1\u05DE\u05D1\u05D7\u05DF \u05D4\u05D0\u05D7\u05E8\u05D5\u05DF \u05E6\u05D9\u05D5\u05DF \u05DE\u05E6\u05D5\u05D9\u05DF.\n\u05DB\u05DC \u05D4\u05DB\u05D1\u05D5\u05D3!\n\u05D1\u05D1\u05E8\u05DB\u05D4, \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3' },
    { id: 't6', name: '\u05D3\u05D5"\u05D7 \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA', icon: 'bi-emoji-neutral', color: 'secondary', body: '\u05E9\u05DC\u05D5\u05DD {name},\n\u05D1\u05E8\u05E6\u05D5\u05E0\u05E0\u05D5 \u05DC\u05D9\u05D3\u05E2 \u05D0\u05D5\u05EA\u05DA/\u05DA \u05E2\u05DC \u05D0\u05D9\u05E8\u05D5\u05E2 \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA\u05D9 \u05D4\u05E7\u05E9\u05D5\u05E8 \u05DC\u05EA\u05DC\u05DE\u05D9\u05D3 {student} \u05D1\u05DB\u05D9\u05EA\u05D4 {class}.\n\u05E0\u05E9\u05DE\u05D7 \u05DC\u05E9\u05D9\u05D7\u05D4 \u05D1\u05E0\u05D5\u05E9\u05D0.\n\u05D1\u05D1\u05E8\u05DB\u05D4, \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3' },
    { id: 't7', name: '\u05E4\u05E8\u05D8\u05D9 \u05D8\u05D9\u05D5\u05DC', icon: 'bi-bus-front', color: 'info', body: '\u05E9\u05DC\u05D5\u05DD {name},\n\u05DE\u05E6"\u05D1 \u05E4\u05E8\u05D8\u05D9\u05DD \u05E2\u05DC \u05D4\u05D8\u05D9\u05D5\u05DC \u05D4\u05E7\u05E8\u05D5\u05D1 \u05D1\u05EA\u05D0\u05E8\u05D9\u05DA {date}.\n\u05DE\u05E7\u05D5\u05DD: \u05D9\u05E2\u05D3 \u05DC\u05D4\u05D5\u05D3\u05E2\u05D4\n\u05E9\u05E2\u05EA \u05D9\u05E6\u05D9\u05D0\u05D4: 08:00\n\u05E0\u05D0 \u05DC\u05D0\u05E9\u05E8 \u05D4\u05E9\u05EA\u05EA\u05E4\u05D5\u05EA \u05E2\u05D1\u05D5\u05E8 {student}.\n\u05D1\u05D1\u05E8\u05DB\u05D4, \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3' },
    { id: 't8', name: '\u05D1\u05E8\u05DB\u05EA \u05D7\u05D2', icon: 'bi-stars', color: 'warning', body: '\u05E9\u05DC\u05D5\u05DD {name},\n\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3 \u05DE\u05D0\u05D7\u05DC \u05D7\u05D2 \u05E9\u05DE\u05D7!\n\u05E9\u05D9\u05D4\u05D9\u05D5 \u05D9\u05DE\u05D9\u05DD \u05D8\u05D5\u05D1\u05D9\u05DD \u05D5\u05DE\u05D5\u05E2\u05D3\u05D9\u05DD \u05DC\u05DB\u05DC \u05D4\u05DE\u05E9\u05E4\u05D7\u05D4.\n\u05D1\u05D1\u05E8\u05DB\u05D4, \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3' },
    { id: 't9', name: '\u05E2\u05D3\u05DB\u05D5\u05DF \u05DB\u05DC\u05DC\u05D9', icon: 'bi-megaphone', color: 'primary', body: '\u05E9\u05DC\u05D5\u05DD {name},\n\u05D4\u05D5\u05D3\u05E2\u05D4 \u05DE\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3:\n\n[_\u05EA\u05D5\u05DB\u05DF \u05D4\u05D4\u05D5\u05D3\u05E2\u05D4 \u05DB\u05D0\u05DF_]\n\n\u05D1\u05D1\u05E8\u05DB\u05D4, \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3' },
    { id: 't10', name: '\u05D7\u05D9\u05E8\u05D5\u05DD', icon: 'bi-exclamation-triangle', color: 'danger', body: '\u05D4\u05D5\u05D3\u05E2\u05D4 \u05D3\u05D7\u05D5\u05E4\u05D4 \u05DE\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3!\n\n{name}, \u05E0\u05D0 \u05DC\u05E9\u05D9\u05DD \u05DC\u05D1:\n[_\u05EA\u05D5\u05DB\u05DF \u05D4\u05D4\u05D5\u05D3\u05E2\u05D4_]\n\n\u05DC\u05E4\u05E8\u05D8\u05D9\u05DD \u05E0\u05D5\u05E1\u05E4\u05D9\u05DD: 0501234510\n\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3' }
  ],

  /* ---- Demo Data: Message History ---- */
  _waHistory: [
    { id: 'h1', date: '22/04/2026 09:15', template: '\u05D4\u05D5\u05D3\u05E2\u05EA \u05D7\u05D9\u05E1\u05D5\u05E8', recipients: 2, group: null, names: ['\u05D9\u05E2\u05E7\u05D1 \u05DB\u05D4\u05DF','\u05E8\u05D7\u05DC \u05DC\u05D5\u05D9'], preview: '\u05E9\u05DC\u05D5\u05DD, \u05D1\u05E8\u05E6\u05D5\u05E0\u05E0\u05D5 \u05DC\u05D4\u05D5\u05D3\u05D9\u05E2...' },
    { id: 'h2', date: '22/04/2026 08:30', template: '\u05EA\u05D6\u05DB\u05D5\u05E8\u05EA \u05EA\u05E9\u05DC\u05D5\u05DD', recipients: 5, group: '\u05D4\u05D5\u05E8\u05D9 \u05DB\u05D9\u05EA\u05D4 \u05D0', names: [], preview: '\u05E9\u05DC\u05D5\u05DD, \u05D6\u05D5 \u05EA\u05D6\u05DB\u05D5\u05E8\u05EA \u05DC\u05EA\u05E9\u05DC\u05D5\u05DD...' },
    { id: 'h3', date: '21/04/2026 14:00', template: '\u05E2\u05D3\u05DB\u05D5\u05DF \u05DB\u05DC\u05DC\u05D9', recipients: 9, group: '\u05DB\u05DC \u05D4\u05D4\u05D5\u05E8\u05D9\u05DD', names: [], preview: '\u05E9\u05DC\u05D5\u05DD, \u05D4\u05D5\u05D3\u05E2\u05D4 \u05DE\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3...' },
    { id: 'h4', date: '21/04/2026 10:20', template: '\u05D4\u05D5\u05D3\u05E2\u05EA \u05D0\u05D9\u05D7\u05D5\u05E8', recipients: 1, group: null, names: ['\u05D0\u05D1\u05E8\u05D4\u05DD \u05DC\u05D5\u05D9'], preview: '\u05E9\u05DC\u05D5\u05DD, \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3 \u05D4\u05D2\u05D9\u05E2 \u05D1\u05D0\u05D9\u05D7\u05D5\u05E8...' },
    { id: 'h5', date: '20/04/2026 16:45', template: '\u05D1\u05E8\u05DB\u05EA \u05D7\u05D2', recipients: 9, group: '\u05DB\u05DC \u05D4\u05D4\u05D5\u05E8\u05D9\u05DD', names: [], preview: '\u05E9\u05DC\u05D5\u05DD, \u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3 \u05DE\u05D0\u05D7\u05DC \u05D7\u05D2 \u05E9\u05DE\u05D7...' },
    { id: 'h6', date: '20/04/2026 11:00', template: '\u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05DE\u05D1\u05D7\u05DF', recipients: 4, group: '\u05D4\u05D5\u05E8\u05D9 \u05DB\u05D9\u05EA\u05D4 \u05D1', names: [], preview: '\u05E9\u05DE\u05D7\u05D9\u05DD \u05DC\u05D4\u05D5\u05D3\u05D9\u05E2 \u05DB\u05D9 \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3...' },
    { id: 'h7', date: '19/04/2026 13:30', template: '\u05D4\u05D6\u05DE\u05E0\u05D4 \u05DC\u05E4\u05D2\u05D9\u05E9\u05D4', recipients: 3, group: '\u05D5\u05E2\u05D3 \u05D4\u05D5\u05E8\u05D9\u05DD', names: [], preview: '\u05D4\u05E0\u05DB\u05DD/\u05D4 \u05DE\u05D5\u05D6\u05DE\u05DF/\u05EA \u05DC\u05E4\u05D2\u05D9\u05E9\u05D4...' },
    { id: 'h8', date: '19/04/2026 09:00', template: '\u05E4\u05E8\u05D8\u05D9 \u05D8\u05D9\u05D5\u05DC', recipients: 9, group: '\u05DB\u05DC \u05D4\u05D4\u05D5\u05E8\u05D9\u05DD', names: [], preview: '\u05DE\u05E6"\u05D1 \u05E4\u05E8\u05D8\u05D9\u05DD \u05E2\u05DC \u05D4\u05D8\u05D9\u05D5\u05DC...' },
    { id: 'h9', date: '18/04/2026 15:20', template: '\u05D3\u05D5"\u05D7 \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA', recipients: 1, group: null, names: ['\u05D3\u05D1\u05D5\u05E8\u05D4 \u05DB\u05D4\u05DF'], preview: '\u05D1\u05E8\u05E6\u05D5\u05E0\u05E0\u05D5 \u05DC\u05D9\u05D3\u05E2 \u05D0\u05D5\u05EA\u05DA...' },
    { id: 'h10', date: '18/04/2026 08:45', template: '\u05D4\u05D5\u05D3\u05E2\u05EA \u05D7\u05D9\u05E1\u05D5\u05E8', recipients: 1, group: null, names: ['\u05DE\u05E9\u05D4 \u05D3\u05D5\u05D3'], preview: '\u05E9\u05DC\u05D5\u05DD, \u05D1\u05E8\u05E6\u05D5\u05E0\u05E0\u05D5 \u05DC\u05D4\u05D5\u05D3\u05D9\u05E2...' },
    { id: 'h11', date: '17/04/2026 12:00', template: '\u05EA\u05D6\u05DB\u05D5\u05E8\u05EA \u05EA\u05E9\u05DC\u05D5\u05DD', recipients: 4, group: '\u05D4\u05D5\u05E8\u05D9 \u05DB\u05D9\u05EA\u05D4 \u05D1', names: [], preview: '\u05D6\u05D5 \u05EA\u05D6\u05DB\u05D5\u05E8\u05EA \u05DC\u05EA\u05E9\u05DC\u05D5\u05DD...' },
    { id: 'h12', date: '17/04/2026 09:30', template: '\u05E2\u05D3\u05DB\u05D5\u05DF \u05DB\u05DC\u05DC\u05D9', recipients: 3, group: '\u05DB\u05DC \u05D4\u05E6\u05D5\u05D5\u05EA', names: [], preview: '\u05D4\u05D5\u05D3\u05E2\u05D4 \u05DE\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3...' },
    { id: 'h13', date: '16/04/2026 14:15', template: '\u05D7\u05D9\u05E8\u05D5\u05DD', recipients: 9, group: '\u05DB\u05DC \u05D4\u05D4\u05D5\u05E8\u05D9\u05DD', names: [], preview: '\u05D4\u05D5\u05D3\u05E2\u05D4 \u05D3\u05D7\u05D5\u05E4\u05D4...' },
    { id: 'h14', date: '16/04/2026 10:00', template: '\u05D4\u05D5\u05D3\u05E2\u05EA \u05D7\u05D9\u05E1\u05D5\u05E8', recipients: 2, group: null, names: ['\u05E0\u05EA\u05E0\u05D0\u05DC \u05E4\u05E8\u05D9\u05D3\u05DE\u05DF','\u05D7\u05D9\u05D9\u05DD \u05E4\u05E8\u05E5'], preview: '\u05E9\u05DC\u05D5\u05DD, \u05D1\u05E8\u05E6\u05D5\u05E0\u05E0\u05D5 \u05DC\u05D4\u05D5\u05D3\u05D9\u05E2...' },
    { id: 'h15', date: '15/04/2026 16:30', template: '\u05D4\u05D6\u05DE\u05E0\u05D4 \u05DC\u05E4\u05D2\u05D9\u05E9\u05D4', recipients: 5, group: '\u05D4\u05D5\u05E8\u05D9 \u05DB\u05D9\u05EA\u05D4 \u05D0', names: [], preview: '\u05D4\u05E0\u05DB\u05DD/\u05D4 \u05DE\u05D5\u05D6\u05DE\u05DF/\u05EA...' },
    { id: 'h16', date: '15/04/2026 08:00', template: '\u05D1\u05E8\u05DB\u05EA \u05D7\u05D2', recipients: 12, group: '\u05DB\u05DC \u05D4\u05D4\u05D5\u05E8\u05D9\u05DD', names: [], preview: '\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3 \u05DE\u05D0\u05D7\u05DC \u05D7\u05D2 \u05E9\u05DE\u05D7...' },
    { id: 'h17', date: '14/04/2026 11:45', template: '\u05E4\u05E8\u05D8\u05D9 \u05D8\u05D9\u05D5\u05DC', recipients: 5, group: '\u05D4\u05D5\u05E8\u05D9 \u05DB\u05D9\u05EA\u05D4 \u05D0', names: [], preview: '\u05DE\u05E6"\u05D1 \u05E4\u05E8\u05D8\u05D9\u05DD \u05E2\u05DC \u05D4\u05D8\u05D9\u05D5\u05DC...' },
    { id: 'h18', date: '14/04/2026 09:20', template: '\u05D3\u05D5"\u05D7 \u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA', recipients: 1, group: null, names: ['\u05E9\u05DE\u05E2\u05D5\u05DF \u05D2\u05E8\u05D9\u05E0\u05D1\u05E8\u05D2'], preview: '\u05D1\u05E8\u05E6\u05D5\u05E0\u05E0\u05D5 \u05DC\u05D9\u05D3\u05E2 \u05D0\u05D5\u05EA\u05DA...' },
    { id: 'h19', date: '13/04/2026 13:00', template: '\u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05DE\u05D1\u05D7\u05DF', recipients: 9, group: '\u05DB\u05DC \u05D4\u05D4\u05D5\u05E8\u05D9\u05DD', names: [], preview: '\u05E9\u05DE\u05D7\u05D9\u05DD \u05DC\u05D4\u05D5\u05D3\u05D9\u05E2...' },
    { id: 'h20', date: '13/04/2026 08:15', template: '\u05E2\u05D3\u05DB\u05D5\u05DF \u05DB\u05DC\u05DC\u05D9', recipients: 3, group: '\u05DB\u05DC \u05D4\u05E6\u05D5\u05D5\u05EA', names: [], preview: '\u05D4\u05D5\u05D3\u05E2\u05D4 \u05DE\u05D1\u05D9\u05EA \u05D4\u05EA\u05DC\u05DE\u05D5\u05D3...' }
  ],

  /* ================================================================
     MAIN PAGE HTML
     ================================================================ */
  whatsapp() {
    return `
      <div class="page-header d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
        <div>
          <h1><i class="bi bi-whatsapp me-2 text-success"></i>\u05DE\u05E8\u05DB\u05D6 \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05D5\u05D5\u05D0\u05D8\u05E1\u05D0\u05E4</h1>
          <p class="text-muted mb-0">\u05E9\u05DC\u05D9\u05D7\u05EA \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA, \u05EA\u05D1\u05E0\u05D9\u05D5\u05EA \u05D5\u05E7\u05D1\u05D5\u05E6\u05D5\u05EA \u05E9\u05D9\u05D3\u05D5\u05E8</p>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="row g-3 mb-4" id="wa-stats-row"></div>

      <!-- Tabs -->
      <ul class="nav nav-tabs mb-3" id="wa-tabs">
        <li class="nav-item"><a class="nav-link active" href="#" data-wa-tab="send" onclick="Pages._waTab='send';Pages.renderWa();return false"><i class="bi bi-send me-1"></i>\u05E9\u05DC\u05D9\u05D7\u05D4 \u05DE\u05D4\u05D9\u05E8\u05D4</a></li>
        <li class="nav-item"><a class="nav-link" href="#" data-wa-tab="templates" onclick="Pages._waTab='templates';Pages.renderWa();return false"><i class="bi bi-file-text me-1"></i>\u05EA\u05D1\u05E0\u05D9\u05D5\u05EA</a></li>
        <li class="nav-item"><a class="nav-link" href="#" data-wa-tab="groups" onclick="Pages._waTab='groups';Pages.renderWa();return false"><i class="bi bi-people me-1"></i>\u05E7\u05D1\u05D5\u05E6\u05D5\u05EA</a></li>
        <li class="nav-item"><a class="nav-link" href="#" data-wa-tab="history" onclick="Pages._waTab='history';Pages.renderWa();return false"><i class="bi bi-clock-history me-1"></i>\u05D4\u05D9\u05E1\u05D8\u05D5\u05E8\u05D9\u05D4</a></li>
      </ul>

      <!-- Tab Content -->
      <div id="wa-content"></div>

      <!-- Group Modal -->
      <div class="modal fade" id="wa-group-modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
        <div class="modal-header"><h5 class="modal-title">\u05E7\u05D1\u05D5\u05E6\u05D4 \u05D7\u05D3\u05E9\u05D4</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body">
          <div class="mb-3"><label class="form-label">\u05E9\u05DD \u05D4\u05E7\u05D1\u05D5\u05E6\u05D4</label><input class="form-control" id="wa-gf-name" placeholder="\u05DC\u05DE\u05E9\u05DC: \u05D4\u05D5\u05E8\u05D9 \u05DB\u05D9\u05EA\u05D4 \u05D2"></div>
          <div class="mb-3">
            <label class="form-label">\u05D1\u05D7\u05E8 \u05D7\u05D1\u05E8\u05D9\u05DD</label>
            <input class="form-control mb-2" id="wa-gf-search" placeholder="\u05D7\u05D9\u05E4\u05D5\u05E9 \u05D0\u05D9\u05E9 \u05E7\u05E9\u05E8...">
            <div id="wa-gf-contacts" style="max-height:250px;overflow-y:auto"></div>
          </div>
        </div>
        <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">\u05D1\u05D9\u05D8\u05D5\u05DC</button><button class="btn btn-success" onclick="Pages.waSaveGroup()"><i class="bi bi-check-lg me-1"></i>\u05E9\u05DE\u05D9\u05E8\u05D4</button></div>
      </div></div></div>
    `;
  },

  /* ================================================================
     INIT
     ================================================================ */
  whatsappInit() {
    this._waTab = 'send';
    this._waSelectedRecipients = new Set();
    this._waSelectedGroup = null;
    this._waSearchQuery = '';
    this.renderWa();
  },

  /* ================================================================
     RENDER DISPATCHER
     ================================================================ */
  renderWa() {
    // Update tabs
    document.querySelectorAll('#wa-tabs .nav-link').forEach(el => {
      el.classList.toggle('active', el.dataset.waTab === this._waTab);
    });
    // Stats
    this._waRenderStats();
    // Content
    const el = document.getElementById('wa-content');
    switch (this._waTab) {
      case 'send': el.innerHTML = this._waRenderSend(); this._waInitSend(); break;
      case 'templates': el.innerHTML = this._waRenderTemplates(); break;
      case 'groups': el.innerHTML = this._waRenderGroups(); break;
      case 'history': el.innerHTML = this._waRenderHistory(); break;
    }
  },

  /* ================================================================
     STATS CARDS
     ================================================================ */
  _waRenderStats() {
    const today = this._waHistory.filter(h => h.date.startsWith('22/04/2026')).length;
    const weekDates = ['22/04','21/04','20/04','19/04','18/04','17/04','16/04'];
    const week = this._waHistory.filter(h => weekDates.some(d => h.date.startsWith(d))).length;
    const month = this._waHistory.length;
    const totalRecipients = this._waHistory.reduce((s, h) => s + h.recipients, 0);
    const usedTemplates = new Set(this._waHistory.map(h => h.template)).size;

    document.getElementById('wa-stats-row').innerHTML = `
      <div class="col-6 col-md-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body text-center py-3">
            <div class="fs-2 fw-bold text-success">${today}</div>
            <small class="text-muted">\u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05D4\u05D9\u05D5\u05DD</small>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body text-center py-3">
            <div class="fs-2 fw-bold text-primary">${week}</div>
            <small class="text-muted">\u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05D4\u05E9\u05D1\u05D5\u05E2</small>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body text-center py-3">
            <div class="fs-2 fw-bold text-info">${month}</div>
            <small class="text-muted">\u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05D4\u05D7\u05D5\u05D3\u05E9</small>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body text-center py-3">
            <div class="fs-2 fw-bold text-warning">${this._waGroups.length}</div>
            <small class="text-muted">\u05E7\u05D1\u05D5\u05E6\u05D5\u05EA \u05E9\u05D9\u05D3\u05D5\u05E8</small>
          </div>
        </div>
      </div>
    `;
  },

  /* ================================================================
     TAB: QUICK SEND
     ================================================================ */
  _waRenderSend() {
    const groupOptions = this._waGroups.map(g => `<option value="${g.id}">${g.name} (${g.members.length})</option>`).join('');
    const templateOptions = this._waTemplates.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
    return `
      <div class="row g-4">
        <!-- Recipients Column -->
        <div class="col-lg-5">
          <div class="card shadow-sm">
            <div class="card-header bg-success bg-opacity-10">
              <h5 class="mb-0"><i class="bi bi-people me-2"></i>\u05E0\u05DE\u05E2\u05E0\u05D9\u05DD</h5>
            </div>
            <div class="card-body">
              <!-- Quick select group -->
              <div class="mb-3">
                <label class="form-label fw-bold">\u05D1\u05D7\u05E8 \u05E7\u05D1\u05D5\u05E6\u05D4</label>
                <select class="form-select" id="wa-group-select" onchange="Pages.waSelectGroup(this.value)">
                  <option value="">\u2014 \u05D1\u05D7\u05D9\u05E8\u05D4 \u05D9\u05D3\u05E0\u05D9\u05EA \u2014</option>
                  ${groupOptions}
                </select>
              </div>
              <hr>
              <!-- Individual search -->
              <div class="mb-3">
                <label class="form-label fw-bold">\u05D7\u05D9\u05E4\u05D5\u05E9 \u05D0\u05D9\u05E9\u05D9</label>
                <div class="search-box"><i class="bi bi-search"></i><input type="text" class="form-control" id="wa-contact-search" placeholder="\u05E9\u05DD \u05D0\u05D5 \u05D8\u05DC\u05E4\u05D5\u05DF..."></div>
              </div>
              <!-- Contact list -->
              <div id="wa-contact-list" style="max-height:300px;overflow-y:auto"></div>
              <!-- Selected badge area -->
              <div class="mt-3" id="wa-selected-badges"></div>
            </div>
          </div>
        </div>

        <!-- Compose Column -->
        <div class="col-lg-7">
          <div class="card shadow-sm">
            <div class="card-header bg-success bg-opacity-10">
              <h5 class="mb-0"><i class="bi bi-pencil-square me-2"></i>\u05D7\u05D9\u05D1\u05D5\u05E8 \u05D4\u05D5\u05D3\u05E2\u05D4</h5>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <label class="form-label fw-bold">\u05D8\u05E2\u05DF \u05DE\u05EA\u05D1\u05E0\u05D9\u05EA</label>
                <select class="form-select" id="wa-template-select" onchange="Pages.waLoadTemplate(this.value)">
                  <option value="">\u2014 \u05DB\u05EA\u05D9\u05D1\u05D4 \u05D7\u05D5\u05E4\u05E9\u05D9\u05EA \u2014</option>
                  ${templateOptions}
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">\u05EA\u05D5\u05DB\u05DF \u05D4\u05D4\u05D5\u05D3\u05E2\u05D4</label>
                <textarea class="form-control" id="wa-message" rows="8" placeholder="\u05DB\u05EA\u05D5\u05D1 \u05D0\u05EA \u05D4\u05D4\u05D5\u05D3\u05E2\u05D4 \u05DB\u05D0\u05DF...\n\u05DE\u05E9\u05EA\u05E0\u05D9\u05DD \u05D6\u05DE\u05D9\u05E0\u05D9\u05DD: {name}, {student}, {class}, {date}"></textarea>
                <div class="form-text">\u05DE\u05E9\u05EA\u05E0\u05D9\u05DD: <code>{name}</code> \u05E9\u05DD \u05E0\u05DE\u05E2\u05DF, <code>{student}</code> \u05E9\u05DD \u05EA\u05DC\u05DE\u05D9\u05D3, <code>{class}</code> \u05DB\u05D9\u05EA\u05D4, <code>{date}</code> \u05EA\u05D0\u05E8\u05D9\u05DA</div>
              </div>
              <div class="d-flex gap-2 flex-wrap">
                <button class="btn btn-success" onclick="Pages.waSendAll()"><i class="bi bi-whatsapp me-1"></i>\u05E9\u05DC\u05D7 \u05DC\u05DB\u05D5\u05DC\u05DD</button>
                <button class="btn btn-outline-success" onclick="Pages.waSendFirst()"><i class="bi bi-send me-1"></i>\u05E9\u05DC\u05D7 \u05DC\u05E8\u05D0\u05E9\u05D5\u05DF</button>
                <button class="btn btn-outline-secondary" onclick="Pages.waClearCompose()"><i class="bi bi-x-lg me-1"></i>\u05E0\u05E7\u05D4</button>
              </div>
              <div id="wa-send-status" class="mt-3"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  _waInitSend() {
    this._waRenderContactList();
    this._waRenderSelectedBadges();
    const searchEl = document.getElementById('wa-contact-search');
    if (searchEl) {
      searchEl.addEventListener('input', () => {
        this._waSearchQuery = searchEl.value.trim().toLowerCase();
        this._waRenderContactList();
      });
    }
  },

  _waRenderContactList() {
    const q = this._waSearchQuery;
    const filtered = this._waContacts.filter(c =>
      !q || c.name.toLowerCase().includes(q) || c.phone.includes(q) || (c.class||'').includes(q)
    );
    const el = document.getElementById('wa-contact-list');
    if (!el) return;
    if (!filtered.length) { el.innerHTML = '<div class="text-center text-muted py-3">\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8</div>'; return; }
    el.innerHTML = filtered.map(c => {
      const checked = this._waSelectedRecipients.has(c.phone) ? 'checked' : '';
      const typeBadge = c.type === '\u05E6\u05D5\u05D5\u05EA' ? '<span class="badge bg-purple bg-opacity-75 ms-1">\u05E6\u05D5\u05D5\u05EA</span>' : `<span class="badge bg-secondary bg-opacity-50 ms-1">${c.class}</span>`;
      return `<div class="form-check py-1 border-bottom">
        <input class="form-check-input" type="checkbox" id="wa-c-${c.phone}" value="${c.phone}" ${checked} onchange="Pages.waToggleRecipient('${c.phone}')">
        <label class="form-check-label w-100 d-flex justify-content-between align-items-center" for="wa-c-${c.phone}">
          <span class="fw-bold">${c.name}</span>
          <span>${typeBadge}<span class="text-muted small ms-2" dir="ltr">${c.phone}</span></span>
        </label>
      </div>`;
    }).join('');
  },

  _waRenderSelectedBadges() {
    const el = document.getElementById('wa-selected-badges');
    if (!el) return;
    if (!this._waSelectedRecipients.size) { el.innerHTML = '<div class="text-muted small">\u05DC\u05D0 \u05E0\u05D1\u05D7\u05E8\u05D5 \u05E0\u05DE\u05E2\u05E0\u05D9\u05DD</div>'; return; }
    const badges = [];
    this._waSelectedRecipients.forEach(phone => {
      const c = this._waContacts.find(x => x.phone === phone);
      if (c) badges.push(`<span class="badge bg-success me-1 mb-1">${c.name} <i class="bi bi-x-lg ms-1" style="cursor:pointer" onclick="Pages.waToggleRecipient('${phone}')"></i></span>`);
    });
    el.innerHTML = `<div class="fw-bold small mb-1">${this._waSelectedRecipients.size} \u05E0\u05DE\u05E2\u05E0\u05D9\u05DD \u05E0\u05D1\u05D7\u05E8\u05D5:</div>` + badges.join('');
  },

  waToggleRecipient(phone) {
    if (this._waSelectedRecipients.has(phone)) this._waSelectedRecipients.delete(phone);
    else this._waSelectedRecipients.add(phone);
    // Update checkbox if visible
    const cb = document.getElementById('wa-c-' + phone);
    if (cb) cb.checked = this._waSelectedRecipients.has(phone);
    this._waRenderSelectedBadges();
    // Clear group select since we're doing manual
    const gs = document.getElementById('wa-group-select');
    if (gs) gs.value = '';
  },

  waSelectGroup(groupId) {
    this._waSelectedRecipients.clear();
    if (groupId) {
      const g = this._waGroups.find(x => x.id === groupId);
      if (g) g.phones.forEach(p => this._waSelectedRecipients.add(p));
      this._waSelectedGroup = g ? g.name : null;
    } else {
      this._waSelectedGroup = null;
    }
    this._waRenderContactList();
    this._waRenderSelectedBadges();
  },

  waLoadTemplate(templateId) {
    if (!templateId) return;
    const t = this._waTemplates.find(x => x.id === templateId);
    if (t) {
      const msgEl = document.getElementById('wa-message');
      if (msgEl) msgEl.value = t.body;
    }
  },

  _waFillVars(text, contact) {
    const today = new Date();
    const dateStr = today.toLocaleDateString('he-IL');
    return text
      .replace(/\{name\}/g, contact.name || '')
      .replace(/\{student\}/g, contact.name || '')
      .replace(/\{\u05E9\u05DD_\u05EA\u05DC\u05DE\u05D9\u05D3\}/g, contact.name || '')
      .replace(/\{class\}/g, contact.class || '')
      .replace(/\{\u05DB\u05D9\u05EA\u05D4\}/g, contact.class || '')
      .replace(/\{date\}/g, dateStr)
      .replace(/\{\u05EA\u05D0\u05E8\u05D9\u05DA\}/g, dateStr);
  },

  waSendAll() {
    if (!this._waSelectedRecipients.size) {
      if (typeof Utils !== 'undefined' && Utils.toast) Utils.toast('\u05E0\u05D0 \u05DC\u05D1\u05D7\u05D5\u05E8 \u05E0\u05DE\u05E2\u05E0\u05D9\u05DD', 'warning');
      return;
    }
    const msg = (document.getElementById('wa-message')?.value || '').trim();
    if (!msg) {
      if (typeof Utils !== 'undefined' && Utils.toast) Utils.toast('\u05E0\u05D0 \u05DC\u05DB\u05EA\u05D5\u05D1 \u05D4\u05D5\u05D3\u05E2\u05D4', 'warning');
      return;
    }
    let sent = 0;
    const names = [];
    this._waSelectedRecipients.forEach(phone => {
      const c = this._waContacts.find(x => x.phone === phone);
      const filledMsg = c ? this._waFillVars(msg, c) : msg;
      const intlPhone = '972' + phone.replace(/^0/, '');
      window.open(`https://wa.me/${intlPhone}?text=${encodeURIComponent(filledMsg)}`, '_blank');
      if (c) names.push(c.name);
      sent++;
    });
    // Log to history
    const tplSelect = document.getElementById('wa-template-select');
    const tplName = tplSelect?.selectedOptions[0]?.text || '\u05D7\u05D5\u05E4\u05E9\u05D9';
    this._waHistory.unshift({
      id: 'h' + (this._waHistory.length + 1),
      date: new Date().toLocaleString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      template: tplName === '\u2014 \u05DB\u05EA\u05D9\u05D1\u05D4 \u05D7\u05D5\u05E4\u05E9\u05D9\u05EA \u2014' ? '\u05D7\u05D5\u05E4\u05E9\u05D9' : tplName,
      recipients: sent,
      group: this._waSelectedGroup,
      names: this._waSelectedGroup ? [] : names,
      preview: msg.substring(0, 40) + '...'
    });
    document.getElementById('wa-send-status').innerHTML = `<div class="alert alert-success"><i class="bi bi-check-circle me-2"></i>\u05E0\u05E4\u05EA\u05D7\u05D5 ${sent} \u05D7\u05DC\u05D5\u05E0\u05D5\u05EA \u05D5\u05D5\u05D0\u05D8\u05E1\u05D0\u05E4 \u05DC\u05E9\u05DC\u05D9\u05D7\u05D4</div>`;
    if (typeof Utils !== 'undefined' && Utils.toast) Utils.toast(`${sent} \u05D4\u05D5\u05D3\u05E2\u05D5\u05EA \u05E0\u05E9\u05DC\u05D7\u05D5`, 'success');
    this._waRenderStats();
  },

  waSendFirst() {
    if (!this._waSelectedRecipients.size) {
      if (typeof Utils !== 'undefined' && Utils.toast) Utils.toast('\u05E0\u05D0 \u05DC\u05D1\u05D7\u05D5\u05E8 \u05E0\u05DE\u05E2\u05E0\u05D9\u05DD', 'warning');
      return;
    }
    const msg = (document.getElementById('wa-message')?.value || '').trim();
    if (!msg) {
      if (typeof Utils !== 'undefined' && Utils.toast) Utils.toast('\u05E0\u05D0 \u05DC\u05DB\u05EA\u05D5\u05D1 \u05D4\u05D5\u05D3\u05E2\u05D4', 'warning');
      return;
    }
    const firstPhone = this._waSelectedRecipients.values().next().value;
    const c = this._waContacts.find(x => x.phone === firstPhone);
    const filledMsg = c ? this._waFillVars(msg, c) : msg;
    const intlPhone = '972' + firstPhone.replace(/^0/, '');
    window.open(`https://wa.me/${intlPhone}?text=${encodeURIComponent(filledMsg)}`, '_blank');
    if (typeof Utils !== 'undefined' && Utils.toast) Utils.toast('\u05E0\u05E4\u05EA\u05D7 \u05D7\u05DC\u05D5\u05DF \u05D5\u05D5\u05D0\u05D8\u05E1\u05D0\u05E4', 'success');
  },

  waClearCompose() {
    const msgEl = document.getElementById('wa-message');
    if (msgEl) msgEl.value = '';
    const tplEl = document.getElementById('wa-template-select');
    if (tplEl) tplEl.value = '';
    document.getElementById('wa-send-status').innerHTML = '';
  },

  /* ================================================================
     TAB: TEMPLATES
     ================================================================ */
  _waRenderTemplates() {
    return `
      <div class="row g-3">
        ${this._waTemplates.map(t => `
          <div class="col-md-6 col-lg-4">
            <div class="card shadow-sm h-100 border-start border-${t.color} border-3">
              <div class="card-body">
                <div class="d-flex align-items-center gap-2 mb-2">
                  <div class="rounded-circle bg-${t.color} bg-opacity-10 d-flex align-items-center justify-content-center" style="width:40px;height:40px">
                    <i class="bi ${t.icon} text-${t.color}"></i>
                  </div>
                  <h6 class="mb-0 fw-bold">${t.name}</h6>
                </div>
                <p class="text-muted small mb-3" style="white-space:pre-line;max-height:120px;overflow:hidden">${t.body}</p>
                <button class="btn btn-sm btn-outline-success" onclick="Pages.waUseTemplate('${t.id}')"><i class="bi bi-pencil me-1"></i>\u05D4\u05E9\u05EA\u05DE\u05E9</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  waUseTemplate(templateId) {
    this._waTab = 'send';
    this.renderWa();
    setTimeout(() => {
      const tplEl = document.getElementById('wa-template-select');
      if (tplEl) { tplEl.value = templateId; this.waLoadTemplate(templateId); }
    }, 50);
  },

  /* ================================================================
     TAB: BROADCAST GROUPS
     ================================================================ */
  _waRenderGroups() {
    return `
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="mb-0"><i class="bi bi-people-fill me-2"></i>\u05E7\u05D1\u05D5\u05E6\u05D5\u05EA \u05E9\u05D9\u05D3\u05D5\u05E8</h5>
        <button class="btn btn-success btn-sm" onclick="Pages.waShowAddGroup()"><i class="bi bi-plus-lg me-1"></i>\u05E7\u05D1\u05D5\u05E6\u05D4 \u05D7\u05D3\u05E9\u05D4</button>
      </div>
      <div class="row g-3">
        ${this._waGroups.map(g => `
          <div class="col-md-6 col-lg-4">
            <div class="card shadow-sm h-100">
              <div class="card-body">
                <div class="d-flex align-items-center gap-2 mb-3">
                  <div class="rounded-circle d-flex align-items-center justify-content-center text-white" style="width:45px;height:45px;background:${g.color}">
                    <i class="bi ${g.icon}"></i>
                  </div>
                  <div>
                    <h6 class="mb-0 fw-bold">${g.name}</h6>
                    <small class="text-muted">${g.members.length} \u05D7\u05D1\u05E8\u05D9\u05DD</small>
                  </div>
                </div>
                <div class="mb-3">
                  ${g.members.slice(0, 4).map(m => `<span class="badge bg-light text-dark me-1 mb-1">${m}</span>`).join('')}
                  ${g.members.length > 4 ? `<span class="badge bg-secondary">+${g.members.length - 4}</span>` : ''}
                </div>
                <div class="d-flex gap-2">
                  <button class="btn btn-sm btn-outline-success flex-fill" onclick="Pages._waTab='send';Pages.renderWa();setTimeout(()=>{document.getElementById('wa-group-select').value='${g.id}';Pages.waSelectGroup('${g.id}')},50)"><i class="bi bi-send me-1"></i>\u05E9\u05DC\u05D7 \u05D4\u05D5\u05D3\u05E2\u05D4</button>
                  <button class="btn btn-sm btn-outline-danger" onclick="Pages.waDeleteGroup('${g.id}')"><i class="bi bi-trash"></i></button>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  waShowAddGroup() {
    document.getElementById('wa-gf-name').value = '';
    document.getElementById('wa-gf-search').value = '';
    this._waGroupEditMembers = new Set();
    this._waRenderGroupModalContacts();
    document.getElementById('wa-gf-search').addEventListener('input', () => this._waRenderGroupModalContacts());
    new bootstrap.Modal(document.getElementById('wa-group-modal')).show();
  },

  _waGroupEditMembers: new Set(),

  _waRenderGroupModalContacts() {
    const q = (document.getElementById('wa-gf-search')?.value || '').trim().toLowerCase();
    const filtered = this._waContacts.filter(c => !q || c.name.toLowerCase().includes(q) || c.phone.includes(q));
    document.getElementById('wa-gf-contacts').innerHTML = filtered.map(c => {
      const checked = this._waGroupEditMembers.has(c.phone) ? 'checked' : '';
      return `<div class="form-check py-1 border-bottom">
        <input class="form-check-input" type="checkbox" id="wa-gm-${c.phone}" ${checked} onchange="Pages._waGroupEditMembers.has('${c.phone}')?Pages._waGroupEditMembers.delete('${c.phone}'):Pages._waGroupEditMembers.add('${c.phone}')">
        <label class="form-check-label" for="wa-gm-${c.phone}">${c.name} <small class="text-muted" dir="ltr">${c.phone}</small></label>
      </div>`;
    }).join('');
  },

  waSaveGroup() {
    const name = (document.getElementById('wa-gf-name')?.value || '').trim();
    if (!name) {
      if (typeof Utils !== 'undefined' && Utils.toast) Utils.toast('\u05E0\u05D0 \u05DC\u05D4\u05D6\u05D9\u05DF \u05E9\u05DD \u05E7\u05D1\u05D5\u05E6\u05D4', 'warning');
      return;
    }
    if (!this._waGroupEditMembers.size) {
      if (typeof Utils !== 'undefined' && Utils.toast) Utils.toast('\u05E0\u05D0 \u05DC\u05D1\u05D7\u05D5\u05E8 \u05D7\u05D1\u05E8\u05D9\u05DD', 'warning');
      return;
    }
    const phones = [...this._waGroupEditMembers];
    const members = phones.map(p => { const c = this._waContacts.find(x => x.phone === p); return c ? c.name : p; });
    const colors = ['#4e73df','#1cc88a','#36b9cc','#f6c23e','#e74a3b','#858796','#6f42c1','#fd7e14','#20c997'];
    this._waGroups.push({
      id: 'g' + (this._waGroups.length + 1),
      name,
      members,
      phones,
      icon: 'bi-people-fill',
      color: colors[this._waGroups.length % colors.length]
    });
    bootstrap.Modal.getInstance(document.getElementById('wa-group-modal')).hide();
    if (typeof Utils !== 'undefined' && Utils.toast) Utils.toast('\u05E7\u05D1\u05D5\u05E6\u05D4 \u05E0\u05D5\u05E6\u05E8\u05D4', 'success');
    this.renderWa();
  },

  waDeleteGroup(groupId) {
    const idx = this._waGroups.findIndex(g => g.id === groupId);
    if (idx === -1) return;
    if (!confirm('\u05D4\u05D0\u05DD \u05DC\u05DE\u05D7\u05D5\u05E7 \u05D0\u05EA \u05D4\u05E7\u05D1\u05D5\u05E6\u05D4?')) return;
    this._waGroups.splice(idx, 1);
    if (typeof Utils !== 'undefined' && Utils.toast) Utils.toast('\u05E7\u05D1\u05D5\u05E6\u05D4 \u05E0\u05DE\u05D7\u05E7\u05D4', 'success');
    this.renderWa();
  },

  /* ================================================================
     TAB: HISTORY
     ================================================================ */
  _waRenderHistory() {
    if (!this._waHistory.length) {
      return '<div class="empty-state text-center py-5"><i class="bi bi-clock-history display-4 text-muted"></i><h5 class="text-muted mt-3">\u05D0\u05D9\u05DF \u05D4\u05D9\u05E1\u05D8\u05D5\u05E8\u05D9\u05D4</h5></div>';
    }
    return `
      <div class="card shadow-sm">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>\u05EA\u05D0\u05E8\u05D9\u05DA</th>
                <th>\u05EA\u05D1\u05E0\u05D9\u05EA</th>
                <th>\u05E0\u05DE\u05E2\u05E0\u05D9\u05DD</th>
                <th>\u05E7\u05D1\u05D5\u05E6\u05D4/\u05E4\u05E8\u05D8\u05E0\u05D9</th>
                <th>\u05EA\u05E7\u05E6\u05D9\u05E8</th>
              </tr>
            </thead>
            <tbody>
              ${this._waHistory.map(h => `
                <tr>
                  <td class="text-nowrap"><i class="bi bi-clock me-1 text-muted"></i>${h.date}</td>
                  <td><span class="badge bg-success bg-opacity-75">${h.template}</span></td>
                  <td><span class="badge bg-primary rounded-pill">${h.recipients}</span></td>
                  <td>${h.group ? `<i class="bi bi-people-fill me-1 text-success"></i>${h.group}` : (h.names.length ? h.names.join(', ') : '\u2014')}</td>
                  <td class="text-muted small">${h.preview}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

});
