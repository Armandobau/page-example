console.log("hola");

var dataCacheName = 'ejemPrueba-v1';
var cacheName = 'ejemplo-prueba-final-1';
var filesToCache = [
  '/',
  '/index.html',
  '/scripts/script.js',
  '/styles/styles.css',
  '/images/profile.jpg',
  '/images/profile2.jpg',
  '/images/carpenterL.jpg',
  '/images/carpenterM.jpg',
  '/images/carpenterS.jpg',
  '/images/carpenterXS.jpg'
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
