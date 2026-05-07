const VERSION = 'iplbuzz-v3';
const STATIC_CACHE = `${VERSION}-static`;
const DATA_CACHE = `${VERSION}-data`;

const APP_SHELL = [
  './',
  './index.html',
  './stats-engine.js',
  './Points.csv',
  './Batting.csv',
  './Bowling.csv',
  './Schedule.csv',
  './Teams.csv',
  './Squads.csv',
  './Partnerships.csv',
  './FOW.csv'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(STATIC_CACHE).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys
        .filter((key) => ![STATIC_CACHE, DATA_CACHE].includes(key))
        .map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const isData = /\.(csv|json)$/i.test(url.pathname);

  if (isData) {
    event.respondWith(staleWhileRevalidate(request, DATA_CACHE));
    return;
  }

  event.respondWith(networkFirstShell(request));
});

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const networkPromise = fetch(request)
    .then((response) => {
      if (response && response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);

  return cached || (await networkPromise) || new Response('Offline', { status: 503 });
}

async function networkFirstShell(request) {
  const cache = await caches.open(STATIC_CACHE);
  try {
    const response = await fetch(request);
    if (response && response.ok && request.url.startsWith(self.location.origin)) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (e) {
    return (await cache.match(request)) || (await cache.match('./index.html'));
  }
}
