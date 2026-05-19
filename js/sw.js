// ============================================
// SERVICE WORKER — portfolio_personal
// Strategy:
//   - Shell (HTML/CSS/JS) → Cache First
//   - Images → Cache First
//   - API calls (GitHub, Formspree) → Network First with 5 s timeout
// ============================================

const CACHE_NAME   = 'portfolio-v1';
const SHELL_ASSETS = [
  '/',
  '/index.html',
  '/css/estilos.css',
  '/js/main.js',
  '/js/i18n.js',
  '/data/projects.json',
  '/data/content.json',
  '/data/manifest.json',
  '/project1.html',
  '/project2.html',
  '/project3.html',
  '/images/profile.jpg',
  '/images/project1.jpg',
  '/images/project2.jpg',
  '/images/project3.jpg'
];

// ---------- Install ----------
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_ASSETS))
  );
  self.skipWaiting();
});

// ---------- Activate (clean old caches) ----------
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ---------- Fetch ----------
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // External API calls → Network First, fall back to a cached stub if available
  const isExternal = url.origin !== self.location.origin;
  if (isExternal) {
    event.respondWith(networkFirstWithTimeout(request, 5000));
    return;
  }

  // Shell assets → Cache First, fall back to network
  event.respondWith(cacheFirst(request));
});

// ---------- Strategies ----------
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (_) {
    // Return offline fallback for navigation requests
    if (request.mode === 'navigate') {
      const fallback = await caches.match('/index.html');
      if (fallback) return fallback;
    }
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

async function networkFirstWithTimeout(request, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(request, { signal: controller.signal });
    clearTimeout(timeout);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (_) {
    clearTimeout(timeout);
    const cached = await caches.match(request);
    if (cached) return cached;
    return new Response('{"error":"offline"}', {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
