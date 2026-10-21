/* UI preference only: existing learning histories remain untouched. */
(function () {
  const key = 'hastingsLessonFlow.manual.v1';
  let manual = false, timer, action = null, route = '', generation = 0;
  try { manual = localStorage.getItem(key) === 'true'; } catch (_) {}
  function cancel() { clearTimeout(timer); action = null; generation++; }
  function schedule() {
    clearTimeout(timer);
    if (manual || !action || document.hidden) return;
    const token = generation;
    timer = setTimeout(() => { if (token === generation && location.hash === route && !document.hidden) advance(); }, 1200);
  }
  function advance() { const fn = action; cancel(); if (fn) fn(); }
  function bind(answered, next) {
    cancel(); route = location.hash; action = answered ? next : null;
    const nav = document.querySelector('.lesson-nav');
    nav.insertAdjacentHTML('afterend', '<label class="advance-setting"><input type="checkbox" id="manual-advance"> Manual advance · more time to read</label>');
    const input = document.getElementById('manual-advance');
    const button = document.getElementById('next');
    function display() {
      input.checked = manual;
      document.body.classList.toggle('manual-advance', manual);
      if (button) { button.hidden = !manual; button.onclick = advance; }
    }
    input.onchange = () => { manual = input.checked; try { localStorage.setItem(key, String(manual)); } catch (_) {} display(); schedule(); };
    display(); schedule();
  }
  window.LessonFlow = { cancel, bind };
  addEventListener('hashchange', cancel);
  addEventListener('pagehide', cancel);
  document.addEventListener('visibilitychange', () => { clearTimeout(timer); if (!document.hidden) schedule(); });
})();
