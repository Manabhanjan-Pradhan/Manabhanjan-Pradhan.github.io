const CACHE_NAME = 'mann-portfolio-v2';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './assets/images/desimix_logo.png',
  './assets/images/networkanalyzer_logo.png',
  './assets/images/packperfect_logo.png',
  './assets/images/resumeperfect_logo.png',
  './assets/images/profile.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cachedResponse => {
      return cachedResponse || fetch(e.request);
    })
  );
});
