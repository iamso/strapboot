const currentCacheName = 'cache-v1.0';
const offlineUrl = '/error/404';
const urlsToCache = [
  offlineUrl,
  '/',
  '/assets/css/bundle.css',
  '/assets/js/fallback.js',
  '/assets/js/bundle.js',
];
const urlsNotToCache = [
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCacheName).then(cache => {
      console.log('Opened cache', currentCacheName);
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName !== currentCacheName;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  for (let url of urlsNotToCache) {
    if (event.request.url.match(url)) {
      return;
    }
  }
  event.respondWith(
    caches.open(currentCacheName).then(cache => {
      return cache.match(event.request).then(cacheResponse => {
        return cacheResponse || fetch(event.request).then(fetchResponse => {
          if (fetchResponse.ok) {
            cache.put(event.request, fetchResponse.clone());
          }
          return fetchResponse;
        }).catch(error => {
          if (event.request.mode === 'navigate' ||
              (event.request.method === 'GET' &&
               event.request.headers.get('accept').includes('text/html'))) {
            return caches.match(offlineUrl);
          }
          else {
            return error;
          }
        });
      });
    })
  );

  event.waitUntil(
    caches.open(currentCacheName).then(cache => {
      return fetch(event.request).then(response => {
        if (response.ok) {
          cache.put(event.request, response);
        }
        return;
      }).catch(error => {
        return;
      });
    })
  );
});
