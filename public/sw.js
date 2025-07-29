// Service Worker for caching and performance
const CACHE_NAME = 'educationelly-v2';
const STATIC_CACHE_URLS = [
  '/',
  '/manifest.json',
  // Note: Don't pre-cache hashed JS/CSS files as they change with each build
];

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip cross-origin requests and non-GET requests
  if (
    !event.request.url.startsWith(self.location.origin) ||
    event.request.method !== 'GET'
  ) {
    return;
  }

  event.respondWith(
    caches
      .match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        // Clone the request because it's a stream
        const fetchRequest = event.request.clone();
        return fetch(fetchRequest).then(response => {
          // Check if we received a valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== 'basic'
          ) {
            return response;
          }
          // Clone the response because it's a stream
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return response;
        });
      })
      .catch(() => {
        // If both cache and network fail, return fallback for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('/');
        }
        // For other requests, let them fail naturally
        return new Response('Network error', { status: 503 });
      })
  );
});
