const CACHE_NAME = 'barnabas-scrolls-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://pub-954ee37e70244de5bb62c446533dbea3.r2.dev/favicon-96x96.png',
  'https://pub-954ee37e70244de5bb62c446533dbea3.r2.dev/apple-touch-icon.png',
  'https://pub-954ee37e70244de5bb62c446533dbea3.r2.dev/web-app-manifest-192x192.png',
  'https://pub-954ee37e70244de5bb62c446533dbea3.r2.dev/web-app-manifest-512x512.png',
  // add any other local assets you want to cache for offline
];

// Install event - cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    ))
  );
});

// Fetch event - respond with cache or fetch from network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
