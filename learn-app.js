(function () {
  'use strict';
  const app = document.getElementById('app');
  const E = window.HastingsLearning;
  const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  let bank, state, screen = 'home', storageBlocked = false;
  const note = '<p class="notice"><strong>Full syllabus · reviewed addresses.</strong> Historical names retained; supported road corrections applied to new questions. Check the review notes before relying on these as current addresses. <a href="learn-full-report.html">Verification report</a>.</p>';
  function warning(message) {
    const box = document.getElementById('storage-warning');
    box.textContent = message; box.hidden = false;
  }
  const categoryNames = ['Schools and education', 'Hospitals and healthcare', 'Transport and stations', 'Hotels and accommodation', 'Pubs, bars and restaurants', 'Nightclubs and entertainment', 'Shops and supermarkets', 'Landmarks and attractions', 'Council and public buildings', 'Other locations'];
  try {
    bank = E.createBank(typeof locations === 'undefined' ? null : locations);
    state = E.emptyState();
    try {
      const raw = localStorage.getItem(E.KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (!E.validState(parsed, bank)) throw new Error('invalid saved data');
        const backupKey = 'hastingsLearnPrototype.beforeMobileReview';
        state = parsed;
        try { if (localStorage.getItem(backupKey) === null) localStorage.setItem(backupKey, raw); }
        catch (_) { storageBlocked = true; warning('Your existing progress is loaded, but its safety copy could not be saved. New answers will not be saved in this session. Please download a progress backup.'); }
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
  function start(options = {}) {
    if (state.active?.completed) state.active = null;
    if (!E.begin(state, bank, Math.random, options)) return;
    save(); screen = 'lesson'; render(true);
  }
  function home() {
    const stats = Object.values(state.stats), seen = stats.length;
    const mastered = stats.filter(s => s.streak >= 3).length;
    const review = stats.filter(E.needsReview).length;
    const active = state.active && !state.active.completed;
    app.innerHTML = `<section class="screen">
      <div class="intro"><div><p class="eyebrow">Your local knowledge, one lesson at a time</p><h1>Every road.<br>A little more familiar.</h1></div><p class="intro-note">Choose your focus. Build confidence in the places around you, one short lesson at a time.</p></div>
      <div class="home-grid"><div class="start-card"><div class="start-content"><p class="eyebrow">${active ? 'Your saved lesson' : 'Learn everything'}</p><h2>${active ? 'Pick up where you left off.' : 'Find your way.'}</h2><p>${active ? 'Finish this lesson before changing modes. Every answer and your place are saved.' : 'A mix of 10 places, with extra practice for the roads you find tricky.'}</p><div class="session-meta"><span>${active ? state.active.questions.length : 10} questions</span><span>${bank.length} places available</span></div></div><button id="start" class="primary">${active ? 'Continue lesson' : 'Learn everything'} →</button></div>
      <aside class="stats-card"><h2>Your growing knowledge</h2><div class="stats-row"><div class="stat"><strong>${bank.length}</strong><span>unique locations · all 305 source records covered</span></div><div class="stat"><strong>${mastered}</strong><span>locations mastered</span></div></div><div class="meter" role="progressbar" aria-label="Locations mastered" aria-valuenow="${mastered}" aria-valuemin="0" aria-valuemax="${bank.length}"><span style="width:${mastered / bank.length * 100}%"></span></div><p class="stats-caption">${seen} practised · ${state.completed} lessons completed</p><p class="small-note"><strong>${review} needing revision</strong><br>Mastered = 3 correct answers in a row. Past mistakes stay in revision until then.</p></aside></div>
      <div class="mode-row"><button id="categories" class="mode-card"><strong>Learn by category →</strong><span>Focus on one kind of destination</span></button><button id="mistakes" class="mode-card" ${active || !review ? 'disabled' : ''}><strong>Review mistakes →</strong><span>${review ? review + ' locations to revisit' : 'No mistakes to review yet'}</span></button></div>
      <section id="batch-section" aria-labelledby="batch-title"><div class="section-line"><h2 id="batch-title">Learn by batch</h2><span>The original list, 25 records at a time</span></div><p class="small-note">Batches use the original database order. Repeated records share one question and one progress history. Study everything with the mixed lesson above.</p><div class="category-grid batch-grid">${Array.from({length:Math.ceil(locations.length / 25)},(_,batch) => {
        const items = E.eligible(state, bank, {mode:'batch',batch});
        const mastered = items.filter(x => state.stats[x.id]?.streak >= 3).length;
        const review = items.filter(x => E.needsReview(state.stats[x.id])).length;
        return `<button class="category-card" data-batch="${batch}" ${active ? 'disabled' : ''}><strong>Locations ${batch * 25 + 1}–${Math.min((batch + 1) * 25, locations.length)}</strong><span>${items.length} unique places · ${Math.min(10, items.length)} questions</span><span class="meter"><span style="width:${mastered / items.length * 100}%"></span></span><span>${mastered} / ${items.length} mastered · ${review} to revise</span></button>`;
      }).join('')}</div></section><section id="category-section" aria-labelledby="category-title"><div class="section-line"><h2 id="category-title">Choose a category</h2><span>Your progress, place by place</span></div><p class="small-note">Up to 10 different places per lesson. Smaller categories make shorter lessons.${active ? ' Continue your saved lesson above to unlock a new one.' : ''}</p><div class="category-grid">${categoryNames.map(name => {
        const items = bank.filter(x => x.learningCategory === name);
        if (!items.length) return '';
        const count = items.filter(x => state.stats[x.id]?.streak >= 3).length;
        const revise = items.filter(x => E.needsReview(state.stats[x.id])).length;
        return `<button class="category-card" data-category="${escape(name)}" ${active ? 'disabled' : ''}><strong>${escape(name)}</strong><span>${items.length} locations · ${Math.min(10,items.length)} questions</span><span class="meter"><span style="width:${count / items.length * 100}%"></span></span><span>${count} / ${items.length} mastered · ${revise} to revise</span></button>`;
      }).join('')}</div></section>${note}<section class="progress-safety"><h2>Keep your progress safe</h2><p class="small-note">Saved on this device, in this browser or Home Screen app. The local preview and online game have separate histories; they are never automatically merged. Download a backup before moving devices or clearing website data.</p><button id="export-progress" class="text-button">Download progress backup ↓</button><span id="export-status" role="status"></span></section></section>`;
    app.querySelectorAll('[data-batch]').forEach(button => button.onclick = () => start({mode:'batch',batch:Number(button.dataset.batch)}));
    document.getElementById('export-progress').onclick = exportProgress;
    document.getElementById('start').onclick = () => start();
    document.getElementById('categories').onclick = () => { document.getElementById('category-section').scrollIntoView({behavior:'smooth'}); document.querySelector('[data-category]:not(:disabled)')?.focus({preventScroll:true}); };
    document.getElementById('mistakes').onclick = () => start({mode:'review'});
    app.querySelectorAll('[data-category]').forEach(button => button.onclick = () => start({mode:'category', category:button.dataset.category}));
  }
  function exportProgress() {
    try {
      const raw = localStorage.getItem(E.KEY);
      const payload = {format:'hastings-learning-backup',version:1,origin:location.origin,path:location.pathname,exportedAt:new Date().toISOString(),storageKey:E.KEY,rawProgress:raw,sessionProgress:state};
      const url = URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}));
      const link = document.createElement('a'); link.href=url;
      link.download='Hastings-progress-'+new Date().toISOString().slice(0,10)+'.json';
      document.body.appendChild(link); link.click(); link.remove();
      setTimeout(()=>URL.revokeObjectURL(url),60000);
      document.getElementById('export-status').textContent=' Backup download requested. Keep this file somewhere safe.';
    } catch (_) { document.getElementById('export-status').textContent=' Could not read saved storage. Your existing data has not been changed.'; }
  }
  function lesson() {
    const l = state.active, q = l.questions[l.cursor], item = itemFor(q.id);
    const correctRoad = E.expected(q,item);
    const answered = q.answer !== null, correct = q.answer === correctRoad;
    const done = l.cursor + Number(answered);
    app.innerHTML = `<section class="screen lesson-shell"><div class="lesson-nav"><button id="pause" class="text-button">← Learning home</button><span class="lesson-label">${l.mode === 'batch' ? 'Batch ' + (l.batch + 1) + ' · ' : l.mode === 'review' ? 'Mistake review · ' : ''}${done} of ${l.questions.length} answered</span></div><div class="meter" role="progressbar" aria-label="Lesson progress" aria-valuenow="${done}" aria-valuemin="0" aria-valuemax="${l.questions.length}"><span style="width:${done / l.questions.length * 100}%"></span></div><div class="question-header"><span class="eyebrow">Question ${l.cursor + 1} / ${l.questions.length}</span><span>${escape(item.learningCategory)}</span></div><p class="question-prompt">${item.audit?.roadStatus === 'confirmed' ? 'Which road is this on?' : 'Which answer does your original list give?'}</p><h1 class="question-title">${escape(item.place)}</h1>${item.audit?.learningRoad ? `<p class="syllabus-warning"><strong>Reviewed road correction.</strong> ${correctRoad !== item.road ? 'This saved question keeps its original answer and score. New lessons use the reviewed road; see the note after answering.' : 'This road has been corrected from the original list using address evidence. The council’s current exam wording is still unconfirmed.'}</p>` : ''}${item.audit?.roadStatus !== 'confirmed' ? `<p class="syllabus-warning"><strong>${item.audit?.roadStatus === 'conflict' ? 'Address conflict — syllabus wording retained.' : 'Syllabus answer — confirmation needed.'}</strong> ${escape(item.audit?.structuralNote || 'This answer has not been independently confirmed.')} <a href="learn-full-report.html#record-${item.sourceRecord}" target="_blank" rel="noopener">Review record ${item.sourceRecord}</a></p>` : ''}<div class="answers" role="group" aria-label="Choose one road">${q.choices.map((choice, i) => {
      const right = answered && choice === correctRoad, wrong = answered && choice === q.answer && !correct;
      return `<button class="answer${right ? ' correct' : wrong ? ' wrong' : ''}" data-choice="${i}" ${answered ? 'disabled' : ''}><span class="answer-key" aria-hidden="true">${i + 1}</span><span class="answer-label">${escape(choice)}</span>${right || wrong ? `<span class="answer-status" aria-label="${right ? 'Correct answer' : 'Your incorrect answer'}">${right ? '✓' : '×'}</span>` : ''}</button>`;
    }).join('')}</div>${answered ? `<div class="feedback ${correct ? '' : 'incorrect'}" role="status"><div><strong>${correct ? 'That’s the one.' : 'A useful one to remember.'}</strong><p>${correct ? escape(correctRoad) : 'Correct road: <b>' + escape(correctRoad) + '</b>'}</p>${correct ? '' : '<p>We’ll bring this place back sooner.</p>'}${item.audit?.note ? '<p><strong>Address note:</strong> ' + escape(item.audit.note) + '</p>' : ''}</div><button id="next" class="primary">${l.cursor === l.questions.length - 1 ? 'See results' : 'Continue'} <span aria-hidden="true">→</span></button></div>` : '<p class="keyboard-hint">Choose a road, or use keys 1–4.</p>'}${note}</section>`;
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
    const l = state.active, score = E.score(l, bank), missed = l.questions.length - score;
    app.innerHTML = `<section class="screen result"><div class="result-symbol" aria-hidden="true">✓</div><p class="eyebrow">Lesson complete</p><h1>${score === l.questions.length ? 'Every connection made.' : score >= 7 ? 'Your knowledge is growing.' : 'Every attempt builds a connection.'}</h1><p class="result-sub">${missed ? 'The roads you missed will come back sooner. Take a moment to review them, then keep going.' : 'A clean run. We’ll give these places more space and keep building your confidence.'}</p><div class="score-card"><div class="score-large">${score}<small> / ${l.questions.length}</small></div><div class="score-description"><strong>Correct answers</strong>${missed ? missed + ' to revisit' : 'All correct'}<br>Lesson ${state.completed} completed</div></div><div class="result-actions"><button id="again" class="primary">Next lesson <span aria-hidden="true">→</span></button><button id="home" class="text-button">Back to learning home</button></div><details class="review-list" ${missed ? 'open' : ''}><summary>Review your ${l.questions.length} answers</summary>${l.questions.map(q => {
      const item = itemFor(q.id), correctRoad = E.expected(q,item), ok = q.answer === correctRoad;
      return `<div class="review-row"><span class="review-mark ${ok ? '' : 'missed'}" aria-label="${ok ? 'Correct' : 'Incorrect'}">${ok ? '✓' : '×'}</span><div><strong>${escape(item.place)}</strong><p>${escape(correctRoad)}</p>${ok ? '' : '<p>You chose: ' + escape(q.answer) + '</p>'}</div></div>`;
    }).join('')}</details>${note}</section>`;
    document.getElementById('again').onclick = () => { const options = {mode:l.mode || 'mixed',category:l.category,batch:l.batch}; state.active = null; if (E.eligible(state, bank, options).length) start(options); else { save(); screen = 'home'; render(true); } };
    document.getElementById('home').onclick = () => { state.active = null; save(); screen = 'home'; render(true); };
  }
  document.addEventListener('keydown', event => {
    if (screen !== 'lesson' || event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
    const q = state.active.questions[state.active.cursor];
    if (q.answer === null && /^[1-4]$/.test(event.key)) { event.preventDefault(); submit(q.choices[Number(event.key) - 1]); }
    else if (q.answer !== null && event.key === 'Enter' && document.activeElement?.id !== 'pause') { event.preventDefault(); next(); }
  });
})();
