/* A separate exam history; never writes or migrates existing learning progress. */
(function(root){
  'use strict';
  const E=root.HastingsLearning;
  const KEY='hastingsLocalKnowledgeMock33.v1';
  const SAFETY_KEY='hastingsLocalMock33.beforeUpdate.2026-10-23';
  const LENGTH=33, PASS=24;
  const signature=questions=>questions.map(q=>q.id).sort().join('|');
  const empty=()=>({version:1,active:null,results:[]});
  const summary=result=>{
    const correct=result.questions.filter(q=>q.answer===q.correctRoad).length;
    return {correct,total:LENGTH,percentage:Math.round(correct/LENGTH*1000)/10,passed:correct>=PASS};
  };
  function best(state){return state.results.reduce((top,r)=>!top||summary(r).correct>summary(top).correct?r:top,null);}
  function start(state,bank,rng=Math.random,now=new Date().toISOString()){
    if(state.active)return state.active;
    if(bank.length<LENGTH||new Set(bank.map(i=>i.id)).size!==bank.length)throw Error('The location bank needs checking.');
    const used=new Set(state.results.map(r=>signature(r.questions)));
    // Random sampling across the whole bank, independent of lesson mastery.
    const indices=E.shuffle(bank.map((_,n)=>n),rng).slice(0,LENGTH).sort((a,b)=>a-b);
    // Guarantee a different set even if a random generator repeats itself.
    while(used.has(signature(indices.map(n=>bank[n])))){
      let n=LENGTH-1;while(n>=0&&indices[n]===bank.length-LENGTH+n)n--;
      if(n<0)for(let k=0;k<LENGTH;k++)indices[k]=k;
      else {indices[n]++;for(let k=n+1;k<LENGTH;k++)indices[k]=indices[k-1]+1;}
    }
    const questions=E.shuffle(indices.map(n=>bank[n]),rng).map(item=>({...E.questionFor(item,bank,rng),place:item.place}));
    return state.active={number:state.results.length+1,startedAt:now,cursor:0,questions};
  }
  function select(state,value){const q=state.active?.questions[state.active.cursor];if(!q||!q.choices.includes(value))return false;q.answer=value;return true;}
  function previous(state){if(!state.active||state.active.cursor===0)return false;state.active.cursor--;return true;}
  function next(state,now=new Date().toISOString()){
    const active=state.active;if(!active||active.questions[active.cursor].answer===null)return false;
    if(active.cursor<LENGTH-1){active.cursor++;return true;}
    if(active.questions.some(q=>q.answer===null))return false;
    const result={number:active.number,startedAt:active.startedAt,finishedAt:now,
      questions:active.questions.map(q=>({id:q.id,place:q.place,correctRoad:q.correctRoad,answer:q.answer}))};
    state.results.push(result);state.active=null;return result;
  }
  function valid(state,bank){
    if(!state||state.version!==1||!Array.isArray(state.results))return false;
    const byId=new Map(bank.map(i=>[i.id,i]));
    const date=x=>typeof x==='string'&&Number.isFinite(Date.parse(x));
    function questions(qs,active){
      if(!Array.isArray(qs)||qs.length!==LENGTH||new Set(qs.map(q=>q?.id)).size!==LENGTH)return false;
      return qs.every(q=>{
        const item=byId.get(q?.id);
        if(!item||typeof q.place!=='string'||!q.place.trim()||!item.answerHistory.includes(q.correctRoad))return false;
        if(!active)return typeof q.answer==='string'&&q.answer.length>0;
        return Array.isArray(q.choices)&&q.choices.length===4&&q.choices.every(c=>typeof c==='string'&&c.trim())&&
          new Set(q.choices.map(E.roadKey)).size===4&&q.choices.includes(q.correctRoad)&&(q.answer===null||q.choices.includes(q.answer));
      });
    }
    const sets=new Set();
    for(let n=0;n<state.results.length;n++){
      const r=state.results[n];if(!r||r.number!==n+1||!date(r.startedAt)||!date(r.finishedAt)||!questions(r.questions,false))return false;
      const key=signature(r.questions);if(sets.has(key))return false;sets.add(key);
    }
    const a=state.active;if(a===null)return true;
    return !!a&&a.number===state.results.length+1&&date(a.startedAt)&&Number.isInteger(a.cursor)&&a.cursor>=0&&a.cursor<LENGTH&&
      questions(a.questions,true)&&a.questions.slice(0,a.cursor).every(q=>q.answer!==null)&&!sets.has(signature(a.questions));
  }
  root.LocalMock33=Object.freeze({KEY,SAFETY_KEY,LENGTH,PASS,empty,summary,best,signature,start,select,previous,next,valid});
})(window);
