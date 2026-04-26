const CACHE_VERSION = 'bht-v6.6-0426';
const CACHE_NAME = CACHE_VERSION;
const MAX_CACHE_ENTRIES = 100;

/* ─── Assets to pre-cache on install ─── */
const ASSETS = [
  './',
  './index.html',
  './form.html',
  './manifest.json',
  // CSS + vendor
  './css/style.css',
  './css/vendor/bootstrap.rtl.min.css',
  './css/vendor/bootstrap-icons.css',
  // Vendor JS
  './js/vendor/bootstrap.bundle.min.js',
  './js/vendor/chart.umd.min.js',
  // Core JS
  './js/data-cache.js',
  './js/app.js',
  './js/drive-catalog.js',
  './js/pages.js',
  './js/utils.js',
  // Page modules (js/pages/*.js)
  './js/pages/admin.js',
  './js/pages/attendance.js',
  './js/pages/bulletin.js',
  './js/pages/chavruta.js',
  './js/pages/checklist.js',
  './js/pages/communication.js',
  './js/pages/dashboard.js',
  './js/pages/donations.js',
  './js/pages/drive.js',
  './js/pages/education.js',
  './js/pages/email.js',
  './js/pages/emergency.js',
  './js/pages/facilitymap.js',
  './js/pages/finance.js',
  './js/pages/forms.js',
  './js/pages/gradebook.js',
  './js/pages/hebrewcal.js',
  './js/pages/inventory.js',
  './js/pages/library.js',
  './js/pages/meals.js',
  './js/pages/medical.js',
  './js/pages/notifications.js',
  './js/pages/organization.js',
  './js/pages/parentportal.js',
  './js/pages/reports.js',
  './js/pages/rewards.js',
  './js/pages/rooms.js',
  './js/pages/staff.js',
  './js/pages/students.js',
  './js/pages/transport.js',
  './js/pages/tutoring.js',
  './js/pages/visits.js',
  './js/pages/timetable.js',
  './js/pages/videos.js',
  './js/pages/voting.js',
  './js/pages/whatsapp.js',
  './js/pages/certificates.js',
  './js/pages/analytics.js',
  './js/pages/behavior.js',
  './js/pages/contacts.js',
  './js/pages/homework.js',
  './js/pages/paymentplans.js',
  './js/pages/printcenter.js',
  './js/pages/tala.js',
  // Icons & images
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon.svg',
  './img/logo.svg'
];

/* ─── CDN resources — cached with stale-while-revalidate ─── */
const CDN_ASSETS = [
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js',
  'https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&display=swap'
];

/* ─── Offline fallback page (Hebrew) with retry ─── */
const OFFLINE_HTML = `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>\u05D0\u05D9\u05DF \u05D7\u05D9\u05D1\u05D5\u05E8 \u05DC\u05D0\u05D9\u05E0\u05D8\u05E8\u05E0\u05D8</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Heebo',sans-serif;background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);
color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center}
.container{padding:2rem;max-width:480px}
.icon{font-size:5rem;margin-bottom:1.5rem;animation:pulse 2s ease-in-out infinite}
h1{font-size:1.8rem;font-weight:700;margin-bottom:1rem}
p{font-size:1.1rem;opacity:.85;margin-bottom:1.5rem;line-height:1.7}
.status{font-size:.9rem;opacity:.6;margin-bottom:2rem;min-height:1.4em}
.btn-retry{background:#e94560;color:#fff;border:none;padding:.75rem 2rem;border-radius:12px;
font-size:1rem;font-family:inherit;cursor:pointer;transition:transform .2s,box-shadow .2s;margin:0 .5rem}
.btn-retry:hover{transform:scale(1.05);box-shadow:0 4px 20px rgba(233,69,96,.4)}
.btn-retry:disabled{opacity:.6;transform:none;cursor:wait}
.btn-secondary{background:transparent;border:2px solid rgba(255,255,255,.3);color:#fff;
padding:.75rem 2rem;border-radius:12px;font-size:1rem;font-family:inherit;cursor:pointer;
transition:border-color .2s}
.btn-secondary:hover{border-color:#fff}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
@keyframes spin{to{transform:rotate(360deg)}}
.spinner{display:inline-block;width:18px;height:18px;border:2px solid #fff;border-top-color:transparent;
border-radius:50%;animation:spin .6s linear infinite;vertical-align:middle;margin-left:8px}
</style>
</head>
<body>
<div class="container">
<div class="icon">\u26A0\uFE0F</div>
<h1>\u05D0\u05D9\u05DF \u05D7\u05D9\u05D1\u05D5\u05E8 \u05DC\u05D0\u05D9\u05E0\u05D8\u05E8\u05E0\u05D8</h1>
<p>\u05E0\u05E8\u05D0\u05D4 \u05E9\u05D0\u05D9\u05DF \u05DC\u05DA \u05D7\u05D9\u05D1\u05D5\u05E8 \u05DC\u05D0\u05D9\u05E0\u05D8\u05E8\u05E0\u05D8 \u05DB\u05E8\u05D2\u05E2.<br>
\u05D4\u05DE\u05E2\u05E8\u05DB\u05EA \u05EA\u05E0\u05E1\u05D4 \u05DC\u05D4\u05EA\u05D7\u05D1\u05E8 \u05D0\u05D5\u05D8\u05D5\u05DE\u05D8\u05D9\u05EA.</p>
<div class="status" id="retry-status"></div>
<div>
<button class="btn-retry" id="btn-retry" onclick="retryConnection()">\u05E0\u05E1\u05D4 \u05E9\u05D5\u05D1</button>
<button class="btn-secondary" onclick="location.href='./#dashboard'">\u05E2\u05DE\u05D5\u05D3 \u05E8\u05D0\u05E9\u05D9</button>
</div>
</div>
<script>
let retryCount = 0;
const maxRetries = 5;
const statusEl = document.getElementById('retry-status');
const btnEl = document.getElementById('btn-retry');

// Auto-retry every 5 seconds
let autoRetryTimer = setInterval(autoRetry, 5000);

function autoRetry() {
  retryCount++;
  if (retryCount > maxRetries) {
    clearInterval(autoRetryTimer);
    statusEl.textContent = '\\u05E0\\u05DB\\u05E9\\u05DC\\u05D5 ' + maxRetries + ' \\u05E0\\u05D9\\u05E1\\u05D9\\u05D5\\u05E0\\u05D5\\u05EA. \\u05DC\\u05D7\\u05E5 \\u05E0\\u05E1\\u05D4 \\u05E9\\u05D5\\u05D1 \\u05DC\\u05E0\\u05E1\\u05D5\\u05EA \\u05E9\\u05D5\\u05D1.';
    return;
  }
  statusEl.textContent = '\\u05E0\\u05D9\\u05E1\\u05D9\\u05D5\\u05DF ' + retryCount + '/' + maxRetries + '...';
  checkOnline();
}

function retryConnection() {
  btnEl.disabled = true;
  btnEl.innerHTML = '\\u05DE\\u05EA\\u05D7\\u05D1\\u05E8...<span class="spinner"></span>';
  statusEl.textContent = '\\u05D1\\u05D5\\u05D3\\u05E7 \\u05D7\\u05D9\\u05D1\\u05D5\\u05E8...';
  retryCount = 0;
  clearInterval(autoRetryTimer);
  checkOnline();
}

function checkOnline() {
  fetch('./', {cache:'no-store'}).then(r => {
    if (r.ok) location.reload();
    else onFail();
  }).catch(onFail);
}

function onFail() {
  btnEl.disabled = false;
  btnEl.textContent = '\\u05E0\\u05E1\\u05D4 \\u05E9\\u05D5\\u05D1';
  if (retryCount >= maxRetries) {
    statusEl.textContent = '\\u05E2\\u05D3\\u05D9\\u05D9\\u05DF \\u05D0\\u05D9\\u05DF \\u05D7\\u05D9\\u05D1\\u05D5\\u05E8. \\u05D1\\u05D3\\u05D5\\u05E7 \\u05D0\\u05EA \\u05D4\\u05E8\\u05E9\\u05EA \\u05D5\\u05E0\\u05E1\\u05D4 \\u05E9\\u05D5\\u05D1.';
  }
}
</script>
</body>
</html>`;

/* ─── Install: pre-cache all assets + CDN + offline page ─── */
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll([...ASSETS, ...CDN_ASSETS]).then(() =>
        cache.put(
          new Request('/_offline'),
          new Response(OFFLINE_HTML, {
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
          })
        )
      )
    )
  );
});

/* ─── Activate: enable navigation preload, purge old caches, claim clients ─── */
self.addEventListener('activate', e => {
  e.waitUntil(
    (async () => {
      // Enable navigation preload if supported
      if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable();
      }
      // Purge old caches
      const keys = await caches.keys();
      await Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

/* ─── Cache size management: evict oldest entries when over limit ─── */
async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxEntries) {
    // Delete oldest entries (first in the list)
    const toDelete = keys.slice(0, keys.length - maxEntries);
    await Promise.all(toDelete.map(req => cache.delete(req)));
  }
}

/* ─── Fetch strategies ─── */
function isCdnResource(url) {
  return url.includes('cdn.jsdelivr.net') ||
    url.includes('fonts.googleapis.com') ||
    url.includes('fonts.gstatic.com') ||
    url.includes('cdnjs.cloudflare.com');
}

function isCssOrFontOrIcon(url) {
  return /\.(css|woff2?|ttf|eot|svg|png|ico)(\?.*)?$/i.test(url) ||
    url.includes('bootstrap-icons');
}

function isJsFile(url) {
  return /\.js(\?.*)?$/i.test(url);
}

function isHtmlFile(request) {
  return request.mode === 'navigate' ||
    (request.headers.get('accept') || '').includes('text/html');
}

function isApiCall(url) {
  return url.includes('script.google.com') ||
    url.includes('googleapis.com/v1');
}

/* Cache-first: serve from cache, fall back to network */
function cacheFirst(request) {
  return caches.match(request).then(cached => {
    if (cached) return cached;
    return fetch(request).then(resp => {
      if (resp.ok) {
        const clone = resp.clone();
        caches.open(CACHE_NAME).then(c => {
          c.put(request, clone);
          trimCache(CACHE_NAME, MAX_CACHE_ENTRIES);
        });
      }
      return resp;
    });
  });
}

/* Network-first: try network, fall back to cache */
function networkFirst(request) {
  return fetch(request)
    .then(resp => {
      if (resp.ok) {
        const clone = resp.clone();
        caches.open(CACHE_NAME).then(c => {
          c.put(request, clone);
          trimCache(CACHE_NAME, MAX_CACHE_ENTRIES);
        });
      }
      return resp;
    })
    .catch(() => caches.match(request));
}

/* Stale-while-revalidate: serve cache immediately, update in background */
function staleWhileRevalidate(request) {
  return caches.match(request).then(cached => {
    const fetchPromise = fetch(request).then(resp => {
      if (resp.ok) {
        const clone = resp.clone();
        caches.open(CACHE_NAME).then(c => {
          c.put(request, clone);
          trimCache(CACHE_NAME, MAX_CACHE_ENTRIES);
        });
      }
      return resp;
    }).catch(() => cached);

    return cached || fetchPromise;
  });
}

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = e.request.url;

  // API calls: network only, no caching
  if (isApiCall(url)) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }

  // CDN resources: stale-while-revalidate (serve fast, update in background)
  if (isCdnResource(url)) {
    e.respondWith(staleWhileRevalidate(e.request));
    return;
  }

  // CSS, fonts, icons, images (local): cache-first (rarely change)
  if (isCssOrFontOrIcon(url)) {
    e.respondWith(cacheFirst(e.request));
    return;
  }

  // JS files: network-first (pick up updates quickly)
  if (isJsFile(url)) {
    e.respondWith(
      networkFirst(e.request).then(resp => {
        if (resp) return resp;
        return caches.match('/_offline');
      })
    );
    return;
  }

  // HTML / navigation: use navigation preload if available, stale-while-revalidate fallback
  if (isHtmlFile(e.request)) {
    e.respondWith(
      (async () => {
        // Try navigation preload response first
        const preloadResp = e.preloadResponse ? await e.preloadResponse : null;
        if (preloadResp) {
          // Cache the preloaded response
          const clone = preloadResp.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
          return preloadResp;
        }
        // Fall back to stale-while-revalidate
        const resp = await staleWhileRevalidate(e.request);
        if (resp) return resp;
        return caches.match('/_offline');
      })()
    );
    return;
  }

  // Everything else: cache-first with network fallback
  e.respondWith(
    cacheFirst(e.request).then(resp => {
      if (resp) return resp;
      return caches.match('/_offline');
    })
  );
});

/* ─── Background Sync: retry queued offline actions ─── */
self.addEventListener('sync', e => {
  if (e.tag === 'bht-offline-sync') {
    e.waitUntil(processOfflineQueue());
  }
});

async function processOfflineQueue() {
  // Read queued requests from IndexedDB
  const db = await openSyncDB();
  const tx = db.transaction('requests', 'readonly');
  const store = tx.objectStore('requests');
  const allKeys = await idbGetAllKeys(store);

  const readTx = db.transaction('requests', 'readonly');
  const readStore = readTx.objectStore('requests');

  for (const key of allKeys) {
    try {
      const entry = await idbGet(readStore, key);
      if (!entry) continue;

      const resp = await fetch(entry.url, {
        method: entry.method,
        headers: entry.headers,
        body: entry.body
      });

      if (resp.ok) {
        const delTx = db.transaction('requests', 'readwrite');
        delTx.objectStore('requests').delete(key);
        await idbTxDone(delTx);
      }
    } catch (_) {
      // Will retry on next sync event
      break;
    }
  }

  db.close();
}

/* ─── IndexedDB helpers for background sync ─── */
function openSyncDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('bht-sync-queue', 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore('requests', { autoIncrement: true });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function idbGet(store, key) {
  return new Promise((resolve, reject) => {
    const req = store.get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function idbGetAllKeys(store) {
  return new Promise((resolve, reject) => {
    const req = store.getAllKeys();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function idbTxDone(tx) {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/* ─── Message handler: queue offline requests from client ─── */
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'QUEUE_OFFLINE_REQUEST') {
    queueOfflineRequest(e.data.payload);
  }
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

async function queueOfflineRequest(payload) {
  try {
    const db = await openSyncDB();
    const tx = db.transaction('requests', 'readwrite');
    tx.objectStore('requests').add(payload);
    await idbTxDone(tx);
    db.close();

    // Register for background sync
    if (self.registration.sync) {
      await self.registration.sync.register('bht-offline-sync');
    }
  } catch (_) {
    // Silently fail if sync registration not supported
  }
}
