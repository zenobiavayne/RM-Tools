// =====================
// SERVICE WORKER
// Caches app files for offline use
// Auto-updates silently when new version is deployed
// =====================

const CACHE_NAME = "rm-tools-v5";

// Files to cache for offline use
const CACHE_FILES = [
  "/RM-Tools/",
  "/RM-Tools/index.html",
  "/RM-Tools/css/styles.css",
  "/RM-Tools/js/app.js",
  "/RM-Tools/manifest.json",
  "/RM-Tools/icons/icon-192.png",
  "/RM-Tools/icons/icon-512.png"
];

// Install — cache all files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHE_FILES);
    })
  );
  self.skipWaiting();
});

// Activate — clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)));
    })
  );
  self.clients.claim();
});

// Fetch — serve from cache, fall back to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
