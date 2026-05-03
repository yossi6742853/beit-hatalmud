/* ===== BHT v7.1 — IndexedDB cache utility =====
   Used for sheets larger than ~1MB that don't fit comfortably in localStorage
   (תלמידים, התנהגות, נוכחות). Smaller sheets stay in localStorage for speed.

   API:
     IDB.get(key)        -> Promise<{ data, ts } | null>
     IDB.set(key, data)  -> Promise<void>
     IDB.del(key)        -> Promise<void>
     IDB.clear()         -> Promise<void>
     IDB.keys()          -> Promise<string[]>

   Storage shape: { data: <any>, ts: <ms> } — same as App.setCache so we can
   share TTL logic between LS and IDB without diverging.
*/
(function () {
  'use strict';

  var DB_NAME  = 'bht-cache';
  var DB_VER   = 1;
  var STORE    = 'kv';

  var _dbPromise = null;

  function _open() {
    if (_dbPromise) return _dbPromise;
    _dbPromise = new Promise(function (resolve, reject) {
      if (!('indexedDB' in window)) {
        reject(new Error('IndexedDB not available'));
        return;
      }
      var req = indexedDB.open(DB_NAME, DB_VER);
      req.onupgradeneeded = function () {
        var db = req.result;
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE);
        }
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
    }).catch(function (err) {
      _dbPromise = null;
      throw err;
    });
    return _dbPromise;
  }

  function _tx(mode) {
    return _open().then(function (db) {
      return db.transaction(STORE, mode).objectStore(STORE);
    });
  }

  function _wrap(req) {
    return new Promise(function (resolve, reject) {
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
    });
  }

  var IDB = {
    available: ('indexedDB' in window),

    get: function (key) {
      return _tx('readonly')
        .then(function (s) { return _wrap(s.get(key)); })
        .then(function (v) { return v == null ? null : v; })
        .catch(function () { return null; });
    },

    set: function (key, data) {
      var entry = { data: data, ts: Date.now() };
      return _tx('readwrite')
        .then(function (s) { return _wrap(s.put(entry, key)); })
        .catch(function (e) {
          console.warn('[IDB] set failed for', key, e && e.message);
        });
    },

    del: function (key) {
      return _tx('readwrite')
        .then(function (s) { return _wrap(s.delete(key)); })
        .catch(function () { /* silent */ });
    },

    clear: function () {
      return _tx('readwrite')
        .then(function (s) { return _wrap(s.clear()); })
        .catch(function () { /* silent */ });
    },

    keys: function () {
      return _tx('readonly')
        .then(function (s) { return _wrap(s.getAllKeys()); })
        .catch(function () { return []; });
    }
  };

  window.IDB = IDB;
})();
