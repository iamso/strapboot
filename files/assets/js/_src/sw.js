const cacheName = 'cache-v1';
const urlsToCache = [
  '/',
  '/assets/css/bundle.css',
  '/assets/js/fallback.js',
  '/assets/js/bundle.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Opened cache', cacheName);
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName).then(cache => {
      return cache.match(event.request).then(cacheResponse => {
        return cacheResponse || fetch(event.request).then(fetchResponse => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      });
    })
  );
});
