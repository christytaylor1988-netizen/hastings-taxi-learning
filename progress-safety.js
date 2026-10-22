/* Runs before either learning app. It copies raw values and never rewrites progress. */
(function (root) {
  'use strict';
  const PREVIOUS_KEY = 'hastingsPrintedExam.beforeUpdate.2026-10-22';
  const KEY = 'hastingsPrintedExam.beforeBatchIntegration.2026-10-22';
  let ready = false;
  try {
    const existing = localStorage.getItem(KEY);
    if (existing !== null) {
      const backup = JSON.parse(existing);
      ready = backup.format === 'hastings-pre-printed-update' && backup.version === 1 &&
        backup.values && typeof backup.values === 'object' && !Array.isArray(backup.values) &&
        Object.values(backup.values).every(value => typeof value === 'string');
    } else {
      const values = {};
      for (let n = 0; n < localStorage.length; n++) {
        const key = localStorage.key(n);
        if (/^hastings(?:Learn|MultiSubject|LessonFlow)/.test(key)) values[key] = localStorage.getItem(key);
      }
      const raw = JSON.stringify({format:'hastings-pre-printed-update', version:1,
        exportedAt:new Date().toISOString(), origin:location.origin, values});
      localStorage.setItem(KEY, raw);
      ready = localStorage.getItem(KEY) === raw;
    }
  } catch (_) { /* Both apps refuse further writes until a safety copy is possible. */ }
  root.HastingsProgressSafety = Object.freeze({ KEY, PREVIOUS_KEY, ready });
})(window);
