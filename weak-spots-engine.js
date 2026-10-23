/* Derived mock statistics plus independent revision sessions. No legacy-store writes. */
(function(root){
  'use strict';
  const E=root.HastingsLearning,KEY='hastingsWeakSpots.v1',SAFETY_KEY='hastingsWeakSpots.beforeUpdate.2026-10-23';
  const GROUPS=[['pubs','Pubs and bars'],['hotels','Hotels and accommodation'],['restaurants','Restaurants and cafés'],['schools','Schools and education'],['health','Hospitals and healthcare'],['shops','Shops and supermarkets'],['council','Council and public buildings'],['landmarks','Landmarks and attractions'],['transport','Transport and stations'],['entertainment','Nightclubs and entertainment']];
  function category(item){if(item.category==='Public Houses & Bars')return 'pubs';if(item.learningCategory==='Pubs, bars and restaurants')return 'restaurants';return GROUPS.find(g=>g[1]===item.learningCategory)?.[0];}
  const groups=bank=>GROUPS.map(([key,label])=>({key,label,items:bank.filter(i=>category(i)===key)})).filter(g=>g.items.length);
  const empty=()=>({version:1,nextSession:1,active:{},results:[]});
  const date=v=>typeof v==='string'&&Number.isFinite(Date.parse(v));
  function usable(q,byId){return q&&byId.has(q.id)&&typeof q.answer==='string'&&q.answer.length>0&&byId.get(q.id).answerHistory.includes(q.correctRoad);}
  function analyse(mock,state,bank){
    const byId=new Map(bank.map(i=>[i.id,i])),stats=Object.fromEntries(bank.map(i=>[i.id,{mockCorrect:0,mockWrong:0,revisionCorrect:0,revisionWrong:0,streak:0,lastRevision:0}]));
    const events=[];let untracked=0,tracked=0;
    for(const [index,r] of (Array.isArray(mock?.results)?mock.results:[]).entries()){
      if(!Array.isArray(r?.questions)||!date(r.finishedAt)){untracked++;continue;}
      const ids=new Set(),qs=r.questions.filter(q=>{if(!usable(q,byId)||ids.has(q.id))return false;ids.add(q.id);return true;});
      if(qs.length!==r.questions.length||qs.length!==33)untracked++;
      if(qs.length){tracked++;events.push({kind:'mock',time:Date.parse(r.finishedAt),order:index,questions:qs});}
    }
    for(const [index,r] of state.results.entries())events.push({kind:'revision',time:Date.parse(r.finishedAt),order:index,questions:r.questions});
    events.sort((a,b)=>a.time-b.time||(a.kind===b.kind?a.order-b.order:a.kind==='mock'?-1:1));
    let revision=0;
    for(const event of events){if(event.kind==='revision')revision++;for(const q of event.questions){const s=stats[q.id];if(!s)continue;const right=q.answer===q.correctRoad;s[event.kind+(right?'Correct':'Wrong')]++;if(!right)s.streak=0;else if(event.kind==='revision')s.streak=Math.min(3,s.streak+1);if(event.kind==='revision')s.lastRevision=revision;}}
    for(const s of Object.values(stats)){s.mastered=s.streak>=3;s.weak=(s.mockWrong+s.revisionWrong)>0&&!s.mastered;s.seen=s.mockCorrect+s.mockWrong+s.revisionCorrect+s.revisionWrong>0;}
    const categories=groups(bank).map(g=>{
      const ss=g.items.map(i=>stats[i.id]),sum=k=>ss.reduce((n,s)=>n+s[k],0),correct=sum('mockCorrect'),wrong=sum('mockWrong');
      return {...g,total:g.items.length,mastered:ss.filter(s=>s.mastered).length,weak:ss.filter(s=>s.weak).length,seen:ss.filter(s=>s.seen).length,mockCorrect:correct,mockWrong:wrong,mockTotal:correct+wrong,accuracy:correct+wrong?Math.round(100*correct/(correct+wrong)):null};
    });
    const weakest=categories.filter(c=>c.mockWrong>0).sort((a,b)=>a.accuracy-b.accuracy||b.mockWrong-a.mockWrong);
    return {stats,categories,weakest,tracked,untracked,mastered:Object.values(stats).filter(s=>s.mastered).length,weak:Object.values(stats).filter(s=>s.weak).length};
  }
  function start(state,mock,bank,scope='all',rng=Math.random,now=new Date().toISOString()){
    const pool=scope==='all'?bank:bank.filter(i=>category(i)===scope);if(!pool.length)throw Error('Unknown revision category.');
    if(state.active[scope])return state.active[scope];
    const {stats}=analyse(mock,state,bank);
    const rank=s=>s.weak?0:s.streak>0&&!s.mastered?1:!s.seen?2:s.mastered?4:3;
    const urgency=s=>(s.mockWrong+s.revisionWrong)*4+(3-s.streak)*2;
    const selected=E.shuffle(pool,rng).sort((a,b)=>{const x=stats[a.id],y=stats[b.id];return rank(x)-rank(y)||(x.weak&&y.weak?urgency(y)-urgency(x):0)||x.lastRevision-y.lastRevision;}).slice(0,10);
    return state.active[scope]={id:'weak-'+state.nextSession++,scope,startedAt:now,cursor:0,questions:E.shuffle(selected,rng).map(i=>({...E.questionFor(i,bank,rng),place:i.place}))};
  }
  function answer(state,scope,value){const q=state.active[scope]?.questions[state.active[scope].cursor];if(!q||q.answer!==null||!q.choices.includes(value))return false;q.answer=value;return true;}
  function next(state,scope,now=new Date().toISOString()){
    const a=state.active[scope];if(!a||a.questions[a.cursor].answer===null)return false;
    if(a.cursor<a.questions.length-1){a.cursor++;return true;}
    const r={id:a.id,scope,startedAt:a.startedAt,finishedAt:now,questions:a.questions.map(q=>({id:q.id,place:q.place,correctRoad:q.correctRoad,answer:q.answer}))};
    state.results.push(r);delete state.active[scope];return r;
  }
  function valid(state,bank){
    if(!state||state.version!==1||!Number.isSafeInteger(state.nextSession)||state.nextSession<1||!state.active||typeof state.active!=='object'||Array.isArray(state.active)||!Array.isArray(state.results))return false;
    const byId=new Map(bank.map(i=>[i.id,i])),scopes=new Set(['all',...groups(bank).map(g=>g.key)]),ids=new Set();
    function session(r,active){
      if(!r||!/^weak-[1-9]\d*$/.test(r.id)||Number(r.id.slice(5))>=state.nextSession||ids.has(r.id)||!scopes.has(r.scope)||!date(r.startedAt)||(!active&&!date(r.finishedAt)))return false;ids.add(r.id);
      const size=Math.min(10,r.scope==='all'?bank.length:bank.filter(i=>category(i)===r.scope).length);
      if(!Array.isArray(r.questions)||r.questions.length!==size||new Set(r.questions.map(q=>q?.id)).size!==size)return false;
      if(!r.questions.every(q=>{const i=byId.get(q?.id);if(!i||(r.scope!=='all'&&category(i)!==r.scope)||typeof q.place!=='string'||!q.place.trim()||!i.answerHistory.includes(q.correctRoad))return false;if(!active)return usable(q,byId);return Array.isArray(q.choices)&&q.choices.length===4&&q.choices.every(v=>typeof v==='string'&&v.trim())&&new Set(q.choices.map(E.roadKey)).size===4&&q.choices.includes(q.correctRoad)&&(q.answer===null||q.choices.includes(q.answer));}))return false;
      return !active||(Number.isInteger(r.cursor)&&r.cursor>=0&&r.cursor<size&&r.questions.slice(0,r.cursor).every(q=>q.answer!==null)&&r.questions.slice(r.cursor+1).every(q=>q.answer===null));
    }
    return state.results.every(r=>session(r,false))&&Object.entries(state.active).every(([key,r])=>key===r?.scope&&session(r,true));
  }
  root.WeakSpots=Object.freeze({KEY,SAFETY_KEY,category,groups,empty,analyse,start,answer,next,valid});
})(window);
