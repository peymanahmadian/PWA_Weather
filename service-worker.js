var name = "fileWeather_" + Math.random() * 10;
var cacheName = name;
var filesToCache = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/styles/inline.css',
  '/images/clear.png',
  '/images/cloudy-scattered-showers.png',
  '/images/cloudy.png',
  '/images/fog.png',
  '/images/ic_add_white_24px.svg',
  '/images/ic_refresh_white_24px.svg',
  '/images/partly-cloudy.png',
  '/images/rain.png',
  '/images/scattered-showers.png',
  '/images/sleet.png',
  '/images/snow.png',
  '/images/thunderstorm.png',
  '/images/wind.png'
];

self.addEventListener('install', function (e) {
    e.waitUntil(
      caches.open(cacheName).then(function (cache) {
          return cache.addAll(filesToCache);
      })
    );
});
self.addEventListener('activate', function (e) {
    debugger;
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName) {
                    return caches.delete(key);
                }
            }));
        })
      );
    return self.clients.claim();
});
self.addEventListener('fetch', function (e) {
    debugger;
    e.respondWith(
      caches.match(e.request).then(function (response) {
          return response || fetch(e.request);
      })
    );
});