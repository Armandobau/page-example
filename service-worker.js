var dataCacheName = 'ejemPru-v1';
var cacheName = 'ejemPrueba-1';
var filesToCache = [
  '/page-example/',
  '/page-example/index.html',
  '/page-example/scripts/script.js',
  '/page-example/styles/styles.css',
  '/page-example/images/profile.jpeg',
  '/page-example/images/profile2.jpeg',
  '/page-example/images/carpenterL.jpg',
  '/page-example/images/carpenterM.jpg',
  '/page-example/images/carpenterS.jpg',
  '/page-example/images/carpenterXS.jpg'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  var dataUrl = 'https://armandobau.github.io/page-example/';
  if (e.request.url.indexOf(dataUrl) > -1) {
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});
