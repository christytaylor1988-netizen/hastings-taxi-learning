/* Optional offline support only. Never reads or writes learning progress. */
(function () {
  'use strict';
  const status = document.getElementById('offline-status');
  if (!status || !('serviceWorker' in navigator) || !window.isSecureContext ||
      !['http:', 'https:'].includes(location.protocol)) return;
  const workerURL = new URL('learn-sw.js', location.href).href;
  let checkNumber = 0;

  async function checkReady() {
    const current = ++checkNumber;
    const worker = navigator.serviceWorker.controller;
    if (!worker || worker.scriptURL !== workerURL) { status.hidden = true; return; }
    const ready = await new Promise(resolve => {
      const channel = new MessageChannel();
      const finish = result => { clearTimeout(timer); channel.port1.close(); resolve(result); };
      const timer = setTimeout(() => finish(false), 4000);
      channel.port1.onmessage = event => finish(event.data?.type === 'OFFLINE_STATUS' && event.data.ready === true);
      try { worker.postMessage({ type: 'CHECK_OFFLINE_READY' }, [channel.port2]); }
      catch (_) { finish(false); }
    });
    if (current !== checkNumber) return;
    status.textContent = ready ? ' · Offline ready' : '';
    status.hidden = !ready;
  }

  navigator.serviceWorker.addEventListener('controllerchange', checkReady);
  window.addEventListener('pageshow', checkReady);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') checkReady();
  });
  // Check the installed worker even if an offline update check cannot reach the server.
  checkReady();
  navigator.serviceWorker.register(workerURL, {
    scope: new URL('./', location.href).href,
    updateViaCache: 'none'
  }).then(async () => {
    // Refresh the legacy page-scoped registration as well as the new app scope.
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      if (registration.active?.scriptURL === workerURL) registration.update().catch(() => {});
    }
    checkReady();
  }).catch(() => {
    // The normal game stays usable if caching is blocked or unavailable.
    checkReady();
  });
})();
