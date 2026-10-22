'use strict';

// Bump this version whenever a cached learning file changes. Updates wait until
// existing learning tabs close, so a lesson never swaps scripts halfway through.
const PREFIX = 'hastings-learning-offline-';
const CACHE = PREFIX + 'v11-printed-batch-foundation-20261022-release';
const FILES = [
  "appendices-data.js",
  "appendices-report.html",
  "attribution.json",
  "sign-ahead.jpg",
  "sign-cycle-route.jpg",
  "sign-dual-end.jpg",
  "sign-either.jpg",
  "sign-entry.jpg",
  "sign-give-way.jpg",
  "sign-left.jpg",
  "sign-mini.jpg",
  "sign-narrows.jpg",
  "sign-national.jpg",
  "sign-no-cycle.jpg",
  "sign-no-left.jpg",
  "sign-no-motor.jpg",
  "sign-no-right.jpg",
  "sign-no-u.jpg",
  "sign-overtake.jpg",
  "sign-priority.jpg",
  "sign-stop.jpg",
  "sign-stopping.jpg",
  "sign-waiting.jpg",
  "Hastings-Taxi-Policy-checked-2026-10-20.pdf",
  "index.html",
  "learn-app.js",
  "lesson-flow.js",
  "learn-batch02.js",
  "learn-engine.js",
  "printed-exam-data.js",
  "printed-exam-report.html",
  "progress-safety.js",
  "learn-expansion02-report.html",
  "learn-full-audit.js",
  "learn-full-report.html",
  "learn-icon-180.png",
  "learn-icon-192.png",
  "learn-icon-512.png",
  "learn-pwa.js",
  "learn.html",
  "learn.webmanifest",
  "local-knowledge.html",
  "locations.js",
  "mock-alignment-data.js",
  "mock-comparison.html",
  "progress-backup.html",
  "progress-export.js",
  "study-app.js",
  "study-base.css",
  "study-engine.js",
  "study.css",
  "subjects-data.js"
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
    // This dedicated repository contains only the learning app.
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
