'use strict';

// Bump this version whenever a cached learning file changes. Updates wait until
// existing learning tabs close, so a lesson never swaps scripts halfway through.
const PREFIX = 'hastings-learning-offline-';
const CACHE = PREFIX + 'hosted-v1-backup-ready';
const FILES = [
  'learn.html', 'locations.js', 'learn-engine.js', 'learn-app.js',
  'learn-pwa.js', 'progress-export.js', 'learn.webmanifest',
  'learn-icon-180.png', 'learn-icon-192.png', 'learn-icon-512.png'
];
const URLS = FILES.map(file => new URL(file, self.location.href).href);
const ALLOWED = new Set(URLS);

self.addEventListener('install', event => {
  // addAll is atomic: an incomplete download never becomes an offline release.
  event.waitUntil(caches.open(CACHE).then(cache =>
    cache.addAll(URLS.map(url => new Request(url, { cache: 'reload' })))
  ));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith(PREFIX) && name !== CACHE)
      .map(name => caches.delete(name)));
    // Registration is limited to learn.html; other revision pages stay outside it.
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  url.search = '';
  url.hash = '';
  if (!ALLOWED.has(url.href)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    return (await cache.match(url.href)) || fetch(event.request);
  })());
});

self.addEventListener('message', event => {
  if (event.data?.type !== 'CHECK_OFFLINE_READY' || !event.ports[0]) return;
  event.waitUntil((async () => {
    let ready = false;
    try {
      const cache = await caches.open(CACHE);
      const responses = await Promise.all(URLS.map(url => cache.match(url)));
      ready = responses.every(response => response?.ok);
    } catch (_) { /* A storage failure must not claim offline readiness. */ }
    event.ports[0].postMessage({ type: 'OFFLINE_STATUS', ready });
  })());
});
