(function(root){
  'use strict';
  const T=root.LocalMock33,E=root.HastingsLearning,bank=E.createBank(locations),byId=new Map(bank.map(i=>[i.id,i]));
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let state=T.empty(),stored=null,blocked=false,message='',app,historyLimit=10;
  try{stored=localStorage.getItem(T.KEY);if(stored!==null){const parsed=JSON.parse(stored);if(!T.valid(parsed,bank))throw Error();state=parsed;}}
  catch(_){blocked=true;message='Saved mock results could not be read. They have been left untouched. This session will not overwrite them; download a backup below.';}
  // Copy current histories once, without changing their keys or contents.
  function safety(){
    try{
      const existing=localStorage.getItem(T.SAFETY_KEY);
      if(existing!==null){const copy=JSON.parse(existing);return copy.format==='hastings-before-mock33'&&copy.version===1&&copy.values&&typeof copy.values==='object'&&!Array.isArray(copy.values)&&Object.values(copy.values).every(v=>typeof v==='string');}
      const values={};for(let n=0;n<localStorage.length;n++){const key=localStorage.key(n);if(/^hastings(?:Learn|MultiSubject|LessonFlow|PrintedExam|LocalKnowledgeMock33)/.test(key))values[key]=localStorage.getItem(key);}
      const raw=JSON.stringify({format:'hastings-before-mock33',version:1,exportedAt:new Date().toISOString(),origin:location.origin,values});
      localStorage.setItem(T.SAFETY_KEY,raw);return localStorage.getItem(T.SAFETY_KEY)===raw;
    }catch(_){return false;}
  }
  function save(){
    if(blocked)return;
    try{
      if(localStorage.getItem(T.KEY)!==stored){blocked=true;message='This mock changed in another tab. Nothing from that tab was overwritten. Keep this tab open and download its answers before reloading.';return;}
      if(!root.WeakSpotsUI.ensureBackup()||!safety())throw Error('backup');
      const raw=JSON.stringify(state);localStorage.setItem(T.KEY,raw);stored=raw;
    }catch(_){blocked=true;message='This browser could not save the mock or its safety backup. Keep this tab open and download your answers below. Existing learning progress is untouched.';}
  }
  function notice(){return message?`<p class="storage-warning" role="alert">${esc(message)}</p><button class="text-button" data-mock-export>Download mock backup ↓</button>`:'';}
  function focus(){window.scrollTo(0,0);const h=app.querySelector('h1');if(h){h.tabIndex=-1;h.focus({preventScroll:true});}}
  function go(hash){if(location.hash===hash)render(app,...hash.slice(1).split('/').slice(1));else location.hash=hash;}
  function stamp(value){return new Date(value).toLocaleString('en-GB',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});}
  function exportBackup(){
    try{
      const data={format:'hastings-local-mock33-backup',version:1,exportedAt:new Date().toISOString(),origin:location.origin,storageKey:T.KEY,rawProgress:localStorage.getItem(T.KEY),sessionProgress:state,preMockUpdate:localStorage.getItem(T.SAFETY_KEY),weakSpots:localStorage.getItem(root.WeakSpots.KEY),preWeakSpotsUpdate:localStorage.getItem(root.WeakSpots.SAFETY_KEY)};
      const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='Hastings-Local-Knowledge-Mock-Results.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),60000);
      const status=app.querySelector('#mock-export-status');if(status)status.textContent='Backup download requested.';
    }catch(_){message='The backup download failed. Keep this tab open so your answers remain available.';render(app);}
  }
  function bindExports(){app.querySelectorAll('[data-mock-export]').forEach(b=>b.onclick=exportBackup);}
  function home(){
    const best=T.best(state),score=best&&T.summary(best),active=state.active;
    app.innerHTML=`<section class="screen"><a class="back-link" href="#home">← Back to Learning Home</a><p class="eyebrow">33 locations · no timer</p><h1>Local Knowledge Mock Test</h1>${notice()}<p>A fresh selection from all ${bank.length} places. Four road answers per question, with no repeated places in a test.</p><div class="study-panel"><h2>${active?'Your test is saved.':'Ready to test your knowledge?'}</h2><p><strong>70% pass mark: at least 24 / 33 correct.</strong></p><p>Answers stay hidden until you finish. You can change your selections, pause and resume. Incorrect answers appear afterwards for revision.</p><p class="small-note">Uses your printed-list answers and reviewed supplementary roads where the sheet is blank. Uncertain addresses stay flagged. This mode uses the 33-question format and practice pass mark you requested.</p>${active?`<p>${active.questions.filter(q=>q.answer!==null).length} / 33 answered · attempt ${active.number}</p>`:''}<button class="primary" id="mock-start">${active?'Resume test':'Start 33-question test'} →</button></div><div class="mock-record"><div><span class="eyebrow">Personal best</span><strong>${score?`${score.correct} / 33 · ${score.percentage}%`:'No completed tests yet'}</strong></div><div><span class="eyebrow">Completed tests</span><strong>${state.results.length}</strong></div></div><p class="small-note">Unlimited attempts. Results are saved in this browser. Your batch mastery, mistakes, completed lessons and other subjects stay unchanged.</p>${root.WeakSpotsUI.summary(state)}<h2>Previous results</h2>${state.results.length?`<ol class="mock-history">${state.results.slice(-historyLimit).reverse().map(r=>{const s=T.summary(r);return `<li><a href="#local-mock/result/${r.number}"><span><strong>Attempt ${r.number} · ${s.passed?'PASS':'FAIL'}</strong><span>${esc(stamp(r.finishedAt))}</span></span><strong>${s.correct} / 33 · ${s.percentage}% →</strong></a></li>`;}).join('')}</ol>${state.results.length>historyLimit?'<button class="text-button" id="mock-more">Show older results →</button>':''}`:'<p>Finish your first test to start your results history.</p>'}<button class="text-button" data-mock-export>Download mock results ↓</button><span id="mock-export-status" role="status"></span></section>`;
    document.getElementById('mock-start').onclick=()=>{try{T.start(state,bank);save();go('#local-mock/test');}catch(_){message='The test could not be prepared. Your saved data is unchanged.';home();}};
    const more=document.getElementById('mock-more');if(more)more.onclick=()=>{historyLimit+=10;home();};
  }
  function flag(item){
    if(item.answerStatus==='conflict')return 'Address conflict flagged. This question follows the printed sheet; review the evidence after finishing.';
    if(item.answerStatus==='missing')return 'No road is printed for this entry. This question uses the reviewed supplementary answer; details appear after finishing.';
    if(item.answerStatus!=='confirmed')return 'Address not independently confirmed. This question follows the printed sheet; details appear after finishing.';
    return '';
  }
  function test(){
    const a=state.active;if(!a){home();return;}
    document.body.classList.add('lesson-active','mock33-active');
    const q=a.questions[a.cursor],item=byId.get(q.id),answered=a.questions.filter(q=>q.answer!==null).length;
    app.innerHTML=`<section class="screen lesson-shell"><div class="lesson-nav"><a class="text-button" href="#local-mock">← Pause test</a><span class="lesson-label">Local Knowledge Mock Test · ${answered} / 33 answered</span></div>${notice()}<div class="meter" role="progressbar" aria-label="Mock questions answered" aria-valuemin="0" aria-valuemax="33" aria-valuenow="${answered}"><span style="width:${answered/33*100}%"></span></div><div class="question-header"><span class="eyebrow">Question ${a.cursor+1} / 33</span><span>${esc(item.learningCategory)}</span></div><p class="question-prompt">${esc(E.questionPrompt(item,q.correctRoad))}</p><h1 class="question-title">${esc(q.place)}</h1>${flag(item)?`<p class="syllabus-warning">${esc(flag(item))}</p>`:''}<div class="answers" role="group" aria-label="Choose one road">${q.choices.map((choice,n)=>`<button class="answer${q.answer===choice?' mock-selected':''}" data-mock-choice="${n}" aria-pressed="${q.answer===choice}"><span class="answer-key" aria-hidden="true">${n+1}</span><span class="answer-label">${esc(choice)}</span>${q.answer===choice?'<span class="mock-selection">Selected</span>':''}</button>`).join('')}</div><p class="small-note" role="status">${q.answer===null?'Choose one road to continue.':'Answer selected. You can change it before finishing.'} Answers are revealed after question 33.</p><div class="study-actions"><button class="text-button" id="mock-previous" ${a.cursor===0?'disabled':''}>← Previous</button><button class="primary" id="mock-next" ${q.answer===null?'disabled':''}>${a.cursor===32?'Finish test':'Next question'} →</button></div></section>`;
    app.querySelectorAll('[data-mock-choice]').forEach(button=>button.onclick=()=>{T.select(state,q.choices[Number(button.dataset.mockChoice)]);save();test();bindExports();});
    document.getElementById('mock-previous').onclick=()=>{T.previous(state);save();test();bindExports();focus();};
    document.getElementById('mock-next').onclick=()=>{const result=T.next(state);if(!result)return;save();if(typeof result==='object')go('#local-mock/result/'+result.number);else{test();bindExports();focus();}};
  }
  function result(number){
    const r=state.results.find(r=>r.number===Number(number));if(!r){home();return;}
    const s=T.summary(r),best=T.summary(T.best(state)),wrong=r.questions.filter(q=>q.answer!==q.correctRoad);
    app.innerHTML=`<section class="screen"><a class="back-link" href="#local-mock">← All mock results</a><p class="eyebrow">Local Knowledge Mock Test · attempt ${r.number}</p><h1 class="mock-outcome ${s.passed?'mock-pass':'mock-fail'}">${s.passed?'PASS':'FAIL'}</h1>${notice()}<div class="score-card"><div class="score-large">${s.correct}<small> / 33</small></div><div class="score-description"><strong>${s.percentage}%</strong><p>70% pass mark · 24 correct needed</p></div></div><p>${s.passed?'You reached the practice pass mark.':'Keep practising the places below, then try a fresh test.'}</p><p><strong>Personal best: ${best.correct} / 33 · ${best.percentage}%</strong></p><p class="small-note">Completed ${esc(stamp(r.finishedAt))}. Your selections and scoring answers are saved with this result.</p><div class="study-actions"><button class="primary" id="mock-again">${state.active?'Resume current test':'Try a new 33-question test'} →</button><a class="text-button" href="#home">Learning home</a></div>${root.WeakSpotsUI.summary(state,r)}<h2>Incorrect answers · ${wrong.length}</h2>${wrong.length?`<p>Review these roads before your next attempt.</p><div class="review-list">${wrong.map(review).join('')}</div>`:'<p>All 33 correct. No mistakes to revise from this test.</p>'}<details class="review-list"><summary>Review all 33 answers</summary>${r.questions.map(review).join('')}</details><button class="text-button" data-mock-export>Download mock results ↓</button><span id="mock-export-status" role="status"></span></section>`;
    document.getElementById('mock-again').onclick=()=>{T.start(state,bank);save();go('#local-mock/test');};
  }
  function review(q){
    const item=byId.get(q.id),right=q.answer===q.correctRoad;
    return `<div class="review-question"><strong>${right?'✓':'×'} ${esc(q.place)}</strong>${!right?`<p>Your answer: ${esc(q.answer)}</p>`:''}<p>Correct answer: <strong>${esc(q.correctRoad)}</strong></p>${E.answerNotice(item)?`<p class="syllabus-warning">${esc(E.answerNotice(item))}</p>`:''}<p class="small-note">${esc(E.addressNote(item))}</p><p class="small-note"><a href="printed-exam-report.html#record-${item.sourceRecord}">Printed entry & address evidence</a> · <a href="#local-batch/${Math.floor((item.sourceRecord-1)/25)}">Revise Batch ${Math.floor((item.sourceRecord-1)/25)+1}</a></p></div>`;
  }
  function render(target,view,number){app=target;LessonFlow.cancel();document.body.classList.remove('lesson-active','mock33-active');if(view==='test')test();else if(view==='result')result(number);else home();bindExports();}
  document.addEventListener('keydown',event=>{
    if(location.hash!=='#local-mock/test'||!state.active||event.repeat||event.ctrlKey||event.metaKey||event.altKey||/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName))return;
    if(/^[1-4]$/.test(event.key)){event.preventDefault();app.querySelector(`[data-mock-choice="${Number(event.key)-1}"]`)?.click();}
  });
  root.LocalMock33UI=Object.freeze({render});
})(window);
