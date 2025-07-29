// Service Worker DISABLED for development
const CACHE_NAME = 'educationelly-disabled-v3';
const STATIC_CACHE_URLS = [
  '/',
  '/manifest.json',
  // Note: Don't pre-cache hashed JS/CSS files as they change with each build
];

// Install event - skip waiting and don't cache anything
self.addEventListener('install', event => {
  console.log('SW: Installing with immediate activation');
  event.waitUntil(self.skipWaiting());
});

// Activate event - clear ALL caches and take control immediately
self.addEventListener('activate', event => {
  console.log('SW: Activating and clearing all caches');
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            console.log('SW: Deleting cache:', cacheName);
            return caches.delete(cacheName);
          })
        );
      })
      .then(() => {
        console.log('SW: Taking control of all clients');
        return self.clients.claim();
      })
  );
});

// Fetch event - DISABLED for development
self.addEventListener('fetch', event => {
  // Don't intercept any requests - let them go through normally
  console.log('SW: Ignoring fetch event for:', event.request.url);
  return;
});
