(function(root){
'use strict';
const KEY='hastingsMultiSubject.localPrototype.v1';
const LABELS={locations:'Locations',pubs:'Pubs',highway:'Highway Code',signs:'Road signs',fares:'Numeracy',licensing:'Taxi Licensing Rules',safeguarding:'Safeguarding',appendices:'Licensing Appendices'};
const EXAM=['locations','pubs','highway','signs','fares','appendices','licensing'];
const MOCK={locations:20,pubs:10,highway:15,signs:15,fares:15,appendices:15,licensing:10};
const E=root.HastingsLearning;
const MIXED={locations:15,pubs:15,highway:15,signs:15,fares:15,appendices:10,licensing:10,safeguarding:5};
const scopes=[...EXAM,'licensing','safeguarding','mock','mixed','appendices',...Object.keys(root.AppendixTopics||{}).map(a=>'appendix-'+a)];
function pool(bank,scope){return bank.filter(i=>scope==='mixed'?Object.keys(MIXED).includes(i.subject):scope==='mock'?EXAM.includes(i.subject):scope==='licensing'?['licensing','appendices'].includes(i.subject):scope.startsWith('appendix-')?i.appendix===scope.slice(9):i.subject===scope);}

function makeBank(source){const local=E.createBank(source);return [...root.StudyQuestions,...(root.AppendixQuestions||[]),...(root.MockAlignmentQuestions||[]),...local.map(i=>({id:'local:'+i.id,localId:i.id,subject:i.sourceRecords.some(n=>source[n-1].category==='Public Houses & Bars')?'pubs':'locations',prompt:i.place,correct:i.road,local:true,status:i.audit.roadStatus,explanation:i.audit.note + ' Printed list: ' + (i.printed[0].printedRoad || 'no road supplied') + (i.acceptedRoads.length > 1 ? '. Either listed road is accepted: ' + i.acceptedRoads.join(' or ') : ''),reference:'Original record '+i.sourceRecord,source:'local',report:'printed-exam-report.html#record-'+i.sourceRecord,item:i}))];}
function empty(){return {version:1,stats:{},sessions:{},completed:{}};}
function valid(s,bank){if(!s||s.version!==1||!s.stats||!s.sessions||!s.completed||[s.stats,s.sessions,s.completed].some(x=>typeof x!=='object'||Array.isArray(x)))return false;const ids=new Set(bank.map(x=>x.id));
for(const [id,v] of Object.entries(s.stats))if(!ids.has(id)||!v||!['seen','correct','wrong','streak'].every(k=>Number.isInteger(v[k])&&v[k]>=0)||v.seen!==v.correct+v.wrong||v.streak>v.correct||!['right','wrong'].includes(v.lastResult))return false;
for(const [scope,l] of Object.entries(s.sessions)){if(!scopes.includes(scope)||!l||!Array.isArray(l.questions)||!l.questions.length||new Set(l.questions.map(q=>q.id)).size!==l.questions.length||!Number.isInteger(l.cursor)||l.cursor<0||l.cursor>=l.questions.length||typeof l.done!=='boolean'||!['learn','review','exam'].includes(l.mode))return false;
for(const q of l.questions){const i=bank.find(x=>x.id===q.id);if(!i||!Array.isArray(q.choices)||q.choices.length!==4||new Set(q.choices).size!==4||!(i.local ? i.item.answerHistory.includes(q.correct) : q.correct===i.correct)||!q.choices.includes(q.correct)||(q.answer!==null&&!q.choices.includes(q.answer)))return false;}
if(l.done&&l.questions.some(q=>q.answer===null))return false;
}return Object.values(s.completed).every(v=>Number.isInteger(v)&&v>=0);}
function needs(s){return !!s&&s.wrong>0&&s.streak<3;}
function choose(items,n,stats,rng=Math.random){return items.map(i=>({i,k:-Math.log(Math.max(1e-12,rng()))/E.weight(stats[i.id])})).sort((a,b)=>a.k-b.k).slice(0,n).map(x=>x.i);}
function start(state,bank,scope,mode='learn',rng=Math.random){if(state.sessions[scope]&&!state.sessions[scope].done)return state.sessions[scope];let selected;
if(scope==='mixed'&&mode==='exam'){if(Object.entries(MIXED).some(([s,n])=>bank.filter(i=>i.subject===s).length<n))throw Error('Not enough practice questions.');selected=Object.entries(MIXED).flatMap(([s,n])=>choose(bank.filter(i=>i.subject===s),n,state.stats,rng));}
else if(scope==='mock'&&mode==='exam'){if(Object.entries(MOCK).some(([s,n])=>bank.filter(i=>i.subject===s).length<n))throw Error('Not enough distinct questions for every practice section.');selected=Object.entries(MOCK).flatMap(([s,n])=>choose(bank.filter(i=>i.subject===s),n,state.stats,rng));}
else {let items=pool(bank,scope);if(mode==='review')items=items.filter(i=>needs(state.stats[i.id]));selected=choose(items,10,state.stats,rng);}
if(!selected.length)return null;const local=bank.filter(i=>i.local).map(i=>i.item);
const questions=E.shuffle(selected,rng).map(i=>{const q=i.local?E.questionFor(i.item,local,rng):null;return {id:i.id,correct:q?q.correctRoad:i.correct,choices:q?q.choices:E.shuffle(i.choices,rng),answer:null,...(q?{revision:q.revision}:{})};});
return state.sessions[scope]={questions,cursor:0,mode,done:false};}
function answer(state,scope,value){const l=state.sessions[scope];if(!l||l.done)return false;const q=l.questions[l.cursor];if(q.answer!==null||!q.choices.includes(value))return false;q.answer=value;const t=state.stats[q.id]||{seen:0,correct:0,wrong:0,streak:0,lastResult:'wrong'};t.seen++;if(value===q.correct){t.correct++;t.streak++;t.lastResult='right';}else{t.wrong++;t.streak=0;t.lastResult='wrong';}state.stats[q.id]=t;return true;}
function next(state,scope){const l=state.sessions[scope];if(!l||l.done||l.questions[l.cursor].answer===null)return false;if(l.cursor<l.questions.length-1)l.cursor++;else{l.done=true;state.completed[scope]=(state.completed[scope]||0)+1;}return true;}
function scores(session,bank){const out={};session.questions.forEach(q=>{const s=bank.find(i=>i.id===q.id).subject;out[s]??={correct:0,total:0};out[s].total++;if(q.answer===q.correct)out[s].correct++;});return out;}
root.MultiStudy=Object.freeze({KEY,LABELS,EXAM,MOCK,MIXED,pool,makeBank,empty,valid,needs,choose,start,answer,next,scores});
})(window);
