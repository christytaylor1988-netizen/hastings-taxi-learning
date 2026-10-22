(function () {
  'use strict';
  let app = document.getElementById('app');
  const E = window.HastingsLearning;
  const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  let bank, state, screen = 'home', storageBlocked = !window.HastingsProgressSafety.ready, cardIndex = 0, cardRevealed = false, cardBatch = null;
  const note = '<p class="notice"><strong>Printed Exam Revision List · 301 places.</strong> <a href="printed-exam-report.html">Handout comparison and outstanding checks</a>. Your printed roads are the primary answers. Missing roads use flagged supplementary addresses. Address evidence and exam wording can differ; check the notes. <a href="learn-full-report.html">Verification report</a>.</p>';
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
    if (!window.HastingsProgressSafety.ready) warning('The pre-update safety copy could not be saved. Existing stored data is untouched. New progress will not be saved; download all progress before continuing.');
    screen = state.active ? (state.active.completed ? 'results' : 'lesson') : 'home';
    if (app) render();
  } catch (error) {
    if (app) app.innerHTML = '<div class="fatal"><h2>Let’s check the learning files.</h2><p style="margin-top:18px">' + escape(error.message) + '</p><p style="margin-top:12px">Keep learn.html, learn-engine.js, learn-app.js and the original locations.js together, then refresh.</p></div>';
  }
  function save() {
    if (storageBlocked) return;
    try { localStorage.setItem(E.KEY, JSON.stringify(state)); }
    catch (_) { storageBlocked = true; warning('Your browser could not save progress. You can keep practising, but this session may be lost when you close or refresh the page.'); }
  }
  function itemFor(id) { return bank.find(item => item.id === id); }
  window.HastingsLocalUI = {
    refresh() {
      if (storageBlocked) return;
      const raw = localStorage.getItem(E.KEY);
      if (raw) { const next = JSON.parse(raw); if (E.validState(next, bank)) state = next; }
    },
    flashcards(target, batch = null) { app = target; if(cardBatch !== batch) cardIndex = 0; cardBatch = batch; cardRevealed = false; screen = 'flashcards'; flashcards(); },
    batch(target, batch) { app = target; screen = 'batch'; batchPage(batch); },
    mount(target, showHome = true) {
      app = target;
      screen = showHome || !state.active ? 'home' : state.active.completed ? 'results' : 'lesson';
      render(false, true);
    }
  };
  function render(focus = false, mounting = false) {
    if (window.learningDashboard && !mounting) {
      if (screen === 'home') { window.learningDashboard(); return; }
      window.openLocalLesson(); return;
    }
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
  function start(options) {
    options ||= state.active && !state.active.completed ? {mode:state.active.mode || 'mixed', category:state.active.category, batch:state.active.batch} : {mode:'batch',batch:E.nextBatch(state,bank)};
    if (state.active?.completed) state.active = null;
    if (!E.begin(state, bank, Math.random, options)) return;
    save(); screen = 'lesson'; render(true);
  }
  function home() {
    const stats = Object.values(state.stats), mastered = stats.filter(s => s.streak >= 3).length;
    const review = stats.filter(E.needsReview).length, active = state.active && !state.active.completed;
    const next = E.nextBatch(state,bank), groups = E.batches(bank);
    const paused = Object.values(state.pausedLessons || {});
    app.innerHTML = `<section class="screen">
      <div class="intro"><div><p class="eyebrow">Your printed sheet, one batch at a time</p><h1>Local Knowledge</h1></div><p class="intro-note">301 places. One learning history. Build mastery in short lessons.</p></div>
      <div class="home-grid"><div class="start-card"><div class="start-content"><h2>${active ? 'Pick up where you left off.' : 'Start Batch '+(next+1)}</h2><p>Learn the places on your printed sheet, up to ten questions at a time.</p></div><button id="start" class="primary">${active ? 'Resume saved lesson' : 'Start Batch '+(next+1)} →</button></div><aside class="stats-card"><h2>Your growing knowledge</h2><p>${mastered} / ${bank.length} mastered · ${review} to revise</p><p>${stats.length} practised · ${state.completed} lessons completed</p></aside></div>
      <section id="batch-section" aria-labelledby="batch-title"><div class="section-line"><h2 id="batch-title">Your learning batches</h2><span>13 batches · up to 25 places each</span></div><p class="small-note">Follow your sheet in order. Each place belongs to one batch, even when it appears twice on the sheet. Mastery means three correct answers in a row. Every batch stays available.</p><div class="category-grid batch-grid">${groups.map(group => {
        const p = E.batchProgress(state,group.items), saved = [state.active,...paused].find(l=>l&&!l.completed&&l.mode==='batch'&&l.batch===group.batch);
        return `<button class="category-card batch-card ${p.complete?'batch-mastered':group.batch===next?'batch-next':''}" data-batch="${group.batch}"><strong>Batch ${group.batch+1}${p.complete?' · ✓ Mastered':''}</strong><span>Sheet entries ${group.first}–${group.last} · ${p.total} places</span><span>${escape(group.items[0].displayName)} to ${escape(group.items[group.items.length-1].displayName)}</span><span class="meter"><span style="width:${p.mastered/p.total*100}%"></span></span><span>${p.mastered} / ${p.total} mastered · ${p.revise} to revise</span><span>${saved?'Saved lesson ready':p.complete?'Keep it fresh':group.batch===next?'Your next batch':'Open batch'} →</span></button>`;
      }).join('')}</div></section>
      ${paused.length?`<details class="resume-shelf"><summary>Saved local lessons · ${paused.length}</summary><div class="resume-links">${paused.map((l,n)=>`<button class="text-button" data-paused="${n}">${l.mode==='batch'?'Batch '+(l.batch+1):l.mode==='category'?escape(l.category):l.mode==='review'?'Mistake review':'Mixed practice'} · ${l.cursor+Number(l.questions[l.cursor].answer!==null)} / ${l.questions.length} answered →</button>`).join('')}</div></details>`:''}
      <div class="mode-row"><button id="mixed" class="mode-card"><strong>Mixed practice →</strong><span>Revisit all 301 places</span></button><button id="categories" class="mode-card"><strong>Learn by category →</strong><span>Choose a type of destination</span></button><button id="mistakes" class="mode-card" ${!review?'disabled':''}><strong>Review mistakes →</strong><span>${review?review+' places to revisit':'No mistakes to review yet'}</span></button></div>
      <details id="category-section"><summary>Choose a category</summary><div class="category-grid">${categoryNames.map(name=>{
        const items=bank.filter(x=>x.learningCategory===name);if(!items.length)return '';
        const p=E.batchProgress(state,items);
        return `<button class="category-card" data-category="${escape(name)}"><strong>${escape(name)}</strong><span>${p.total} places · ${Math.min(10,p.total)} questions</span><span>${p.mastered} mastered · ${p.revise} to revise</span></button>`;
      }).join('')}</div></details><p class="small-note"><a href="#local-cards">All flashcards →</a> · <a href="printed-exam-report.html">Printed sheet & address notes →</a></p>${note}<section class="progress-safety"><h2>Keep your progress safe</h2><p class="small-note">Progress is saved on this device, in this browser or Home Screen app.</p><button id="export-progress" class="text-button">Download progress backup ↓</button><span id="export-status" role="status"></span></section></section>`;
    app.querySelectorAll('[data-batch]').forEach(button=>button.onclick=()=>{location.hash='#local-batch/'+button.dataset.batch;});
    app.querySelectorAll('[data-paused]').forEach(button=>button.onclick=()=>{const l=paused[Number(button.dataset.paused)];start({mode:l.mode,category:l.category,batch:l.batch});});
    document.getElementById('export-progress').onclick=exportProgress;
    document.getElementById('start').onclick=()=>start();
    document.getElementById('mixed').onclick=()=>start({mode:'mixed'});
    document.getElementById('categories').onclick=()=>{const section=document.getElementById('category-section');section.open=true;section.scrollIntoView({behavior:'smooth'});};
    document.getElementById('mistakes').onclick=()=>start({mode:'review'});
    app.querySelectorAll('[data-category]').forEach(button=>button.onclick=()=>start({mode:'category',category:button.dataset.category}));
  }
  function batchPage(batch) {
    LessonFlow.cancel(); document.body.classList.remove('lesson-active');
    const group=E.batches(bank)[batch], p=E.batchProgress(state,group.items);
    const saved=[state.active,...Object.values(state.pausedLessons||{})].find(l=>l&&!l.completed&&l.mode==='batch'&&l.batch===batch);
    app.innerHTML=`<section class="screen"><a class="back-link" href="#home">← Back to Learning Home</a><p class="eyebrow">Local Knowledge · your printed exam sheet</p><h1>Batch ${batch+1}</h1><p>Sheet entries ${group.first}–${group.last} · ${p.total} places · up to ${Math.min(10,p.total)} questions per lesson</p><div class="study-panel"><h2>${p.complete?'Batch mastered. Keep it fresh.':'Learn these places, one lesson at a time.'}</h2><p>${p.mastered} / ${p.total} mastered · ${p.seen} practised · ${p.revise} to revise</p><div class="meter" role="progressbar" aria-label="Batch places mastered" aria-valuemin="0" aria-valuemax="${p.total}" aria-valuenow="${p.mastered}"><span style="width:${p.mastered/p.total*100}%"></span></div><div class="study-actions"><button class="primary" id="batch-start">${saved?'Resume saved lesson':'Start '+Math.min(10,p.total)+'-question lesson'} →</button><a class="text-button" href="#local-cards/${batch}">Study batch flashcards →</a></div><p class="small-note">New places come first alongside mistakes. Three correct answers in a row build mastery. Lessons, quizzes and category practice use the same place history.</p></div><h2>Places in this batch</h2><ul class="batch-places">${group.items.map(i=>{const st=state.stats[i.id];return `<li><div><strong>${escape(i.displayName)}</strong><span>Sheet entry ${i.sourceRecord} · ${st?.streak>=3?'Mastered':E.needsReview(st)?'Needs revision':st?.seen?'Learning':'Not practised'}</span></div>${E.answerNotice(i)?`<span class="small-note">${i.answerStatus==='missing'?'No printed road':i.answerStatus==='conflict'?'Address conflict':'Address unconfirmed'}</span>`:''}</li>`;}).join('')}</ul><p class="small-note"><a href="printed-exam-report.html">Printed sheet & address notes →</a></p></section>`;
    document.getElementById('batch-start').onclick=()=>start({mode:'batch',batch});
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
  function revisionNote(item) {
    const p = item.printed[0];
    return '<p><strong>Printed list, page ' + p.page + ':</strong> ' + escape(p.printedName) + ' · ' + escape(p.printedRoad || 'No road supplied') + '</p>' + (item.acceptedRoads.length > 1 ? '<p><strong>Either listed road:</strong> ' + escape(item.acceptedRoads.join(' or ')) + '. The other accepted road is never offered as a wrong answer.</p>' : '') + '<p><a href="printed-exam-report.html#record-' + item.sourceRecord + '" target="_blank" rel="noopener">Handout comparison & notes</a></p>';
  }
  function flashcards() {
    LessonFlow.cancel(); document.body.classList.remove('lesson-active');
    const items=cardBatch===null?bank:E.eligible(state,bank,{mode:'batch',batch:cardBatch});
    cardIndex%=items.length;
    const item=items[cardIndex], status=state.stats[item.id];
    app.innerHTML=`<section class="screen"><a class="back-link" href="${cardBatch===null?'#home':'#local-batch/'+cardBatch}">← ${cardBatch===null?'Back to Learning Home':'Back to Batch '+(cardBatch+1)}</a><p class="eyebrow">Local Knowledge · ${cardBatch===null?'all places':'Batch '+(cardBatch+1)}</p><h1>Flashcards</h1><p>${cardIndex+1} / ${items.length} places · ${status?.streak>=3?'Mastered':E.needsReview(status)?'Needs revision':status?.seen?'Learning':'Not practised'}</p><div class="study-panel"><h2>${escape(item.displayName)}</h2>${cardRevealed?`<p><strong>${escape(item.acceptedRoads.join(' or '))}</strong></p>${E.answerNotice(item)?'<p class="syllabus-warning">'+escape(E.answerNotice(item))+'</p>':''}${revisionNote(item)}<p class="small-note">${escape(E.addressNote(item))}</p>`:'<button class="primary" id="reveal-card">Reveal road →</button>'}</div><div class="study-actions"><button class="text-button" id="previous-card" ${cardIndex===0?'disabled':''}>← Previous</button><button class="primary" id="next-card">${cardIndex===items.length-1?'Back to first card':'Next card'} →</button></div>${cardBatch===null?'':`<button class="text-button" id="cards-lesson">Practise Batch ${cardBatch+1} in a lesson →</button>`}<p class="small-note">These are the same places and mastery records used in your lessons. Revealing a flashcard does not award mastery or change your scores.</p></section>`;
    const reveal=document.getElementById('reveal-card');if(reveal)reveal.onclick=()=>{cardRevealed=true;flashcards();};
    document.getElementById('previous-card').onclick=()=>{cardIndex=Math.max(0,cardIndex-1);cardRevealed=false;flashcards();};
    document.getElementById('next-card').onclick=()=>{cardIndex=(cardIndex+1)%items.length;cardRevealed=false;flashcards();};
    const practise=document.getElementById('cards-lesson');if(practise)practise.onclick=()=>start({mode:'batch',batch:cardBatch});
  }
  function lesson() {
    LessonFlow.cancel(); document.body.classList.add('lesson-active');
    const l = state.active, q = l.questions[l.cursor], item = itemFor(q.id);
    const correctRoad = E.expected(q,item);
    const answered = q.answer !== null, correct = q.answer === correctRoad;
    const done = l.cursor + Number(answered);
    app.innerHTML = `<section class="screen lesson-shell"><div class="lesson-nav"><button id="pause" class="text-button">← Back to Learning Home</button><span class="lesson-label">${l.mode === 'batch' ? 'Batch ' + (l.batch + 1) + ' · ' : l.mode === 'review' ? 'Mistake review · ' : ''}${done} of ${l.questions.length} answered</span></div><div class="meter" role="progressbar" aria-label="Lesson progress" aria-valuenow="${done}" aria-valuemin="0" aria-valuemax="${l.questions.length}"><span style="width:${done / l.questions.length * 100}%"></span></div><div class="question-header"><span class="eyebrow">Question ${l.cursor + 1} / ${l.questions.length}</span><span>${escape(item.learningCategory)}</span></div><p class="question-prompt">${escape(E.questionPrompt(item,correctRoad))}</p><h1 class="question-title">${escape(item.displayName)}</h1>${!item.acceptedRoads.includes(correctRoad)?'<p class="syllabus-warning">This saved question keeps its original answer and score. New lessons use the printed sheet where a road is supplied.</p>':''}${E.answerNotice(item)?`<p class="syllabus-warning">${escape(E.answerNotice(item))} <a href="printed-exam-report.html#record-${item.sourceRecord}">Address notes</a></p>`:''}<div class="answers" role="group" aria-label="Choose one road">${q.choices.map((choice, i) => {
      const right = answered && choice === correctRoad, wrong = answered && choice === q.answer && !correct;
      return `<button class="answer${right ? ' correct' : wrong ? ' wrong' : ''}" data-choice="${i}" ${answered ? 'disabled' : ''}><span class="answer-key" aria-hidden="true">${i + 1}</span><span class="answer-label">${escape(choice)}</span>${right || wrong ? `<span class="answer-status" aria-label="${right ? 'Correct answer' : 'Your incorrect answer'}">${right ? '✓' : '×'}</span>` : ''}</button>`;
    }).join('')}</div>${answered ? `<div class="feedback ${correct ? '' : 'incorrect'}" role="status"><div><strong>${correct ? 'That’s the one.' : 'A useful one to remember.'}</strong><p>${correct ? escape(correctRoad) : 'Correct road: <b>' + escape(correctRoad) + '</b>'}</p>${correct ? '' : '<p>We’ll bring this place back sooner.</p>'}${revisionNote(item)}${item.audit?.note ? '<p><strong>Address note:</strong> ' + escape(E.addressNote(item)) + '</p>' : ''}</div><button id="next" class="primary">${l.cursor === l.questions.length - 1 ? 'See results' : 'Continue'} <span aria-hidden="true">→</span></button></div>` : '<p class="keyboard-hint">Choose a road, or use keys 1–4.</p>'}</section>`;
    document.getElementById('pause').onclick = () => { screen = 'home'; render(true); };
    app.querySelectorAll('[data-choice]').forEach(button => button.onclick = () => submit(q.choices[Number(button.dataset.choice)]));
    LessonFlow.bind(answered, next);
  }
  function submit(choice) {
    if (!E.answer(state, bank, choice)) return;
    save(); render();

  }
  function next() {
    if (!E.advance(state)) return;
    save(); screen = state.active.completed ? 'results' : 'lesson'; render(true);
  }
  function results() {
    LessonFlow.cancel(); document.body.classList.remove('lesson-active');
    const l = state.active, score = E.score(l, bank), missed = l.questions.length - score;
    const batchDone=l.mode==='batch'&&E.batchProgress(state,E.eligible(state,bank,l)).complete;
    const following=batchDone?E.nextBatch(state,bank):l.batch;
    app.innerHTML = `<section class="screen result"><div class="result-symbol" aria-hidden="true">✓</div><p class="eyebrow">Lesson complete</p><h1>${score === l.questions.length ? 'Every connection made.' : score >= 7 ? 'Your knowledge is growing.' : 'Every attempt builds a connection.'}</h1><p class="result-sub">${missed ? 'The roads you missed will come back sooner. Take a moment to review them, then keep going.' : 'A clean run. We’ll give these places more space and keep building your confidence.'}</p><div class="score-card"><div class="score-large">${score}<small> / ${l.questions.length}</small></div><div class="score-description"><strong>Correct answers</strong>${missed ? missed + ' to revisit' : 'All correct'}<br>Lesson ${state.completed} completed</div></div><div class="result-actions"><button id="again" class="primary">${l.mode==='batch'?(batchDone?'Continue to Batch ':'Keep learning Batch ')+(following+1):'Next lesson'} <span aria-hidden="true">→</span></button><button id="home" class="text-button">Back to learning home</button></div><details class="review-list" ${missed ? 'open' : ''}><summary>Review your ${l.questions.length} answers</summary>${l.questions.map(q => {
      const item = itemFor(q.id), correctRoad = E.expected(q,item), ok = q.answer === correctRoad;
      return `<div class="review-row"><span class="review-mark ${ok ? '' : 'missed'}" aria-label="${ok ? 'Correct' : 'Incorrect'}">${ok ? '✓' : '×'}</span><div><strong>${escape(item.displayName)}</strong><p>${escape(correctRoad)}</p>${ok ? '' : '<p>You chose: ' + escape(q.answer) + '</p>'}</div></div>`;
    }).join('')}</details>${note}</section>`;
    document.getElementById('again').onclick = () => { const options = {mode:l.mode || 'mixed',category:l.category,batch:l.mode==='batch'?following:l.batch}; state.active = null; if (E.eligible(state, bank, options).length) start(options); else { save(); screen = 'home'; render(true); } };
    document.getElementById('home').onclick = () => { state.active = null; save(); screen = 'home'; render(true); };
  }
  document.addEventListener('keydown', event => {
    if (screen !== 'lesson' || event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
    if (window.learningDashboard && location.hash !== '#local-lesson') return;
    const q = state.active.questions[state.active.cursor];
    if (q.answer === null && /^[1-4]$/.test(event.key)) { event.preventDefault(); submit(q.choices[Number(event.key) - 1]); }
    else if (q.answer !== null && event.key === 'Enter' && document.activeElement?.id === 'next' && document.body.classList.contains('manual-advance')) { event.preventDefault(); next(); }
  });
})();
