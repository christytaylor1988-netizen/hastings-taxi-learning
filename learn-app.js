(function () {
  'use strict';
  const app = document.getElementById('app');
  const E = window.HastingsLearning;
  const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  let bank, state, screen = 'home', storageBlocked = false;
  const note = '<p class="notice"><strong>Provisional study set.</strong> 25 locations from your original database. These answers have not been independently verified against the exam.</p>';
  function warning(message) {
    const box = document.getElementById('storage-warning');
    box.textContent = message; box.hidden = false;
  }
  try {
    bank = E.createBank(typeof locations === 'undefined' ? null : locations);
    state = E.emptyState();
    try {
      const raw = localStorage.getItem(E.KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (!E.validState(parsed, bank)) throw new Error('invalid saved data');
        state = parsed;
      }
    } catch (error) {
      storageBlocked = true;
      warning('Saved learning progress could not be read. You can practise this session, but it will not be saved. Existing stored data has been left untouched.');
    }
    screen = state.active ? (state.active.completed ? 'results' : 'lesson') : 'home';
    render();
  } catch (error) {
    app.innerHTML = '<div class="fatal"><h2>Let’s check the learning files.</h2><p style="margin-top:18px">' + escape(error.message) + '</p><p style="margin-top:12px">Keep learn.html, learn-engine.js, learn-app.js and the original locations.js together, then refresh.</p></div>';
  }
  function save() {
    if (storageBlocked) return;
    try { localStorage.setItem(E.KEY, JSON.stringify(state)); }
    catch (_) { storageBlocked = true; warning('Your browser could not save progress. You can keep practising, but this session may be lost when you close or refresh the page.'); }
  }
  function itemFor(id) { return bank.find(item => item.id === id); }
  function render(focus = false) {
    if (screen === 'home') home();
    else if (screen === 'results') results();
    else lesson();
    if (focus) {
      const heading = app.querySelector('h1');
      heading?.setAttribute('tabindex', '-1');
      heading?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }
  function home() {
    const stats = Object.values(state.stats);
    const seen = stats.length;
    const familiar = stats.filter(s => s.streak >= 3).length;
    const review = stats.filter(s => s.lastResult === 'wrong').length;
    const active = state.active && !state.active.completed;
    app.innerHTML = `<section class="screen">
      <div class="intro"><div><p class="eyebrow">Your local knowledge, one lesson at a time</p><h1>Every road.<br>A little more familiar.</h1></div><p class="intro-note">Build confidence in the places around you. Ten questions, a few minutes, steady progress.</p></div>
      <div class="home-grid"><div class="start-card">
        <svg class="route-art" viewBox="0 0 210 220" fill="none" aria-hidden="true"><path d="M185 0v55c0 25-95 10-95 48v18c0 34 85 12 85 48v65" stroke="#6986ed" stroke-width="28"/><path d="M185 0v55c0 25-95 10-95 48v18c0 34 85 12 85 48v65" stroke="#c4d2ff" stroke-width="2" stroke-dasharray="6 7"/><circle cx="90" cy="110" r="10" fill="#d8ed9b"/><circle cx="90" cy="110" r="4" fill="#254fdb"/></svg>
        <div class="start-content"><p class="eyebrow">${active ? 'Pick up where you left off' : 'Your next lesson'}</p><h2>${active ? 'Keep finding your way.' : 'Find your way.'}</h2><p>${active ? 'Your answers and your place are saved. Ready when you are.' : 'A place, four roads. Learn the connections that make Hastings click.'}</p><div class="session-meta"><span>10 questions</span><span>About 3 minutes</span><span>25 places</span></div></div>
        <button id="start" class="primary">${active ? 'Continue lesson' : 'Start a lesson'} <span aria-hidden="true">→</span></button>
      </div><aside class="stats-card"><div><h2>Your growing knowledge</h2><div class="stats-row"><div class="stat"><strong>${seen}<span style="display:inline;font-size:18px"> / 25</span></strong><span>places practised</span></div><div class="stat"><strong>${state.completed}</strong><span>lessons completed</span></div></div><div class="meter" role="progressbar" aria-label="Places practised" aria-valuenow="${seen}" aria-valuemin="0" aria-valuemax="25"><span style="width:${seen / 25 * 100}%"></span></div><p class="stats-caption">${familiar} familiar · 3 correct answers in a row</p></div><p class="small-note"><strong>${review ? review + (review === 1 ? ' place needs' : ' places need') + ' another look.' : 'Practice that adapts to you.'}</strong><br>${review ? 'These will come back sooner in your next lessons.' : 'Tricky places return sooner. Familiar ones get more breathing room.'}</p></aside></div>
      <div class="section-line"><h2>A small habit that sticks</h2><span>Built around remembering</span></div><div class="steps"><div class="step"><span class="step-number">01</span><div><strong>Make the connection</strong><p>Match each place to its road.</p></div></div><div class="step"><span class="step-number">02</span><div><strong>Learn as you go</strong><p>Clear feedback after every answer.</p></div></div><div class="step"><span class="step-number">03</span><div><strong>Come back stronger</strong><p>Mistakes shape your next lesson.</p></div></div></div>${note}</section>`;
    document.getElementById('start').onclick = () => { E.begin(state, bank); save(); screen = 'lesson'; render(true); };
  }
  function lesson() {
    const l = state.active, q = l.questions[l.cursor], item = itemFor(q.id);
    const answered = q.answer !== null, correct = q.answer === item.road;
    const done = l.cursor + Number(answered);
    app.innerHTML = `<section class="screen lesson-shell"><div class="lesson-nav"><button id="pause" class="text-button">← Learning home</button><span class="lesson-label">${done} of 10 answered</span></div><div class="meter" role="progressbar" aria-label="Lesson progress" aria-valuenow="${done}" aria-valuemin="0" aria-valuemax="10"><span style="width:${done * 10}%"></span></div><div class="question-header"><span class="eyebrow">Question ${l.cursor + 1} / 10</span><span>${escape(item.category)}</span></div><p class="question-prompt">Which road is this on?</p><h1 class="question-title">${escape(item.place)}</h1><div class="answers" role="group" aria-label="Choose one road">${q.choices.map((choice, i) => {
      const right = answered && choice === item.road, wrong = answered && choice === q.answer && !correct;
      return `<button class="answer${right ? ' correct' : wrong ? ' wrong' : ''}" data-choice="${i}" ${answered ? 'disabled' : ''}><span class="answer-key" aria-hidden="true">${i + 1}</span><span class="answer-label">${escape(choice)}</span>${right || wrong ? `<span class="answer-status" aria-label="${right ? 'Correct answer' : 'Your incorrect answer'}">${right ? '✓' : '×'}</span>` : ''}</button>`;
    }).join('')}</div>${answered ? `<div class="feedback ${correct ? '' : 'incorrect'}" role="status"><div><strong>${correct ? 'That’s the one.' : 'A useful one to remember.'}</strong><p>${correct ? escape(item.road) : 'Correct road: <b>' + escape(item.road) + '</b>'}</p>${correct ? '' : '<p>We’ll bring this place back sooner.</p>'}</div><button id="next" class="primary">${l.cursor === 9 ? 'See results' : 'Continue'} <span aria-hidden="true">→</span></button></div>` : '<p class="keyboard-hint">Choose a road, or use keys 1–4.</p>'}${note}</section>`;
    document.getElementById('pause').onclick = () => { screen = 'home'; render(true); };
    app.querySelectorAll('[data-choice]').forEach(button => button.onclick = () => submit(q.choices[Number(button.dataset.choice)]));
    if (answered) document.getElementById('next').onclick = next;
  }
  function submit(choice) {
    if (!E.answer(state, bank, choice)) return;
    save(); render();
    document.getElementById('next')?.focus({ preventScroll: true });
  }
  function next() {
    if (!E.advance(state)) return;
    save(); screen = state.active.completed ? 'results' : 'lesson'; render(true);
  }
  function results() {
    const l = state.active, score = E.score(l, bank), missed = E.LENGTH - score;
    app.innerHTML = `<section class="screen result"><div class="result-symbol" aria-hidden="true">✓</div><p class="eyebrow">Lesson complete</p><h1>${score === 10 ? 'Ten connections made.' : score >= 7 ? 'Your knowledge is growing.' : 'Every attempt builds a connection.'}</h1><p class="result-sub">${missed ? 'The roads you missed will come back sooner. Take a moment to review them, then keep going.' : 'A clean run. We’ll give these places more space and keep building your confidence.'}</p><div class="score-card"><div class="score-large">${score}<small> / 10</small></div><div class="score-description"><strong>Correct answers</strong>${missed ? missed + ' to revisit' : 'All ten correct'}<br>Lesson ${state.completed} completed</div></div><div class="result-actions"><button id="again" class="primary">Next lesson <span aria-hidden="true">→</span></button><button id="home" class="text-button">Back to learning home</button></div><details class="review-list" ${missed ? 'open' : ''}><summary>Review your 10 answers</summary>${l.questions.map(q => {
      const item = itemFor(q.id), ok = q.answer === item.road;
      return `<div class="review-row"><span class="review-mark ${ok ? '' : 'missed'}" aria-label="${ok ? 'Correct' : 'Incorrect'}">${ok ? '✓' : '×'}</span><div><strong>${escape(item.place)}</strong><p>${escape(item.road)}</p>${ok ? '' : '<p>You chose: ' + escape(q.answer) + '</p>'}</div></div>`;
    }).join('')}</details>${note}</section>`;
    document.getElementById('again').onclick = () => { state.active = null; E.begin(state, bank); save(); screen = 'lesson'; render(true); };
    document.getElementById('home').onclick = () => { state.active = null; save(); screen = 'home'; render(true); };
  }
  document.addEventListener('keydown', event => {
    if (screen !== 'lesson' || event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
    const q = state.active.questions[state.active.cursor];
    if (q.answer === null && /^[1-4]$/.test(event.key)) { event.preventDefault(); submit(q.choices[Number(event.key) - 1]); }
    else if (q.answer !== null && event.key === 'Enter' && document.activeElement?.id !== 'pause') { event.preventDefault(); next(); }
  });
})();
