/* Independent learning engine. locations.js remains the only location database. */
(function (root) {
  'use strict';
  const KEY = 'hastingsLearnPrototype.v1';
  const LENGTH = 10;
  // One-based source records, pinned to their original name and answer. Provisional, not verified.
  const PICKS = [
    [1, 'Hastings Station', 'Station Plaza'],
    [4, 'Ore Station', 'Hughenden Road'],
    [5, 'Stage Coach Bus Depot', 'Beaufort Road'],
    [8, 'Conquest Hospital', 'The Ridge'],
    [12, "St Michael's Hospice", 'Maze Hill'],
    [14, 'Isabel Blackman Centre', 'Winding Street'],
    [17, 'Southdown Nursing Home', 'Hollington Park Road'],
    [19, 'Old Hastings House', 'High Street'],
    [20, 'St Leonards Academy', 'Edinburgh Road'],
    [23, 'Hastings Academy', 'Rye Road'],
    [28, 'All Saints CE Junior Academy', 'Githa Road'],
    [29, 'ARK Blacklands Primary Academy', 'Osborne Close'],
    [32, 'Churchwood Primary Academy', 'Church in the Wood Lane'],
    [34, 'Baird Primary Academy', 'Parker Road'],
    [35, 'Hollington Primary Academy', 'Quebec Road'],
    [40, 'Robsack Wood Primary Academy', 'Whatlington Way'],
    [41, 'St Leonards Church of England Primary Academy', 'Collinswood Drive'],
    [42, 'St Mary Star of the Sea Catholic', 'Magdalen Road'],
    [45, 'Sacred Heart Catholic Primary', 'Old London Road'],
    [49, 'West St Leonards Primary Academy', 'Harley Shute Road'],
    [67, 'Tesco Extra', 'Churchwood Drive'],
    [72, 'Town Hall', 'Queens Road'],
    [88, 'Hastings Pier', 'White Rock'],
    [94, 'Stables Theatre', 'The Bourne'],
    [95, 'White Rock Theatre', 'White Rock']
  ];
  function roadKey(value) {
    return value.normalize('NFKD').toLowerCase().replace(/[’']/g, '')
      .replace(/^\d+[a-z]?(?:-\d+)?\s+/, '').replace(/\brd\b/g, 'road')
      .replace(/\bave\b/g, 'avenue').replace(/\bst\.?$/, 'street')
      .replace(/[^a-z0-9]+/g, ' ').trim();
  }
  function createBank(source) {
    if (!Array.isArray(source)) throw new Error('The original location database could not be loaded.');
    return PICKS.map(([record, place, road]) => {
      const item = source[record - 1];
      if (!item || item.place !== place || item.road !== road) {
        throw new Error('The source data has changed. The starter set needs a review before continuing.');
      }
      return Object.freeze({ ...item, id: 'starter-' + record, sourceRecord: record });
    });
  }
  function shuffle(array, rng = Math.random) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  function emptyState() { return { version: 1, stats: {}, completed: 0, active: null }; }
  function weight(stat) {
    if (!stat || !stat.seen) return 3;
    if (stat.lastResult === 'wrong') return 9 + Math.min(stat.wrong, 5);
    return Math.max(0.3, 3 / (1 + stat.streak * 1.4));
  }
  function weightedPick(pool, stats, rng) {
    let value = rng() * pool.reduce((sum, item) => sum + weight(stats[item.id]), 0);
    for (let i = 0; i < pool.length; i++) {
      value -= weight(stats[pool[i].id]);
      if (value < 0) return pool.splice(i, 1)[0];
    }
    return pool.pop();
  }
  function choicesFor(item, bank, rng = Math.random) {
    const seen = new Set([roadKey(item.road)]);
    // Prefer roads in the same area, then the same kind of destination.
    const candidates = shuffle(bank, rng).sort((a, b) => {
      const rank = x => x.area === item.area ? 0 : x.category === item.category ? 1 : 2;
      return rank(a) - rank(b);
    });
    const wrong = [];
    for (const candidate of candidates) {
      const key = roadKey(candidate.road);
      if (!seen.has(key)) { seen.add(key); wrong.push(candidate.road); }
      if (wrong.length === 3) break;
    }
    if (wrong.length !== 3) throw new Error('Not enough distinct road choices.');
    return shuffle([item.road, ...wrong], rng);
  }
  function begin(state, bank, rng = Math.random) {
    if (state.active) return state.active;
    const missed = shuffle(bank.filter(item => state.stats[item.id]?.lastResult === 'wrong'), rng);
    // Reserve up to half of each lesson for unresolved mistakes; weight the rest.
    const selected = missed.slice(0, 5);
    const used = new Set(selected.map(item => item.id));
    const pool = bank.filter(item => !used.has(item.id));
    while (selected.length < LENGTH) selected.push(weightedPick(pool, state.stats, rng));
    state.active = {
      questions: shuffle(selected, rng).map(item => ({ id: item.id, choices: choicesFor(item, bank, rng), answer: null })),
      cursor: 0, completed: false
    };
    return state.active;
  }
  function answer(state, bank, choice) {
    const lesson = state.active;
    const q = lesson?.questions[lesson.cursor];
    if (!q || lesson.completed || q.answer !== null || !q.choices.includes(choice)) return false;
    const item = bank.find(x => x.id === q.id);
    q.answer = choice;
    const correct = choice === item.road;
    const s = state.stats[item.id] || { seen: 0, correct: 0, wrong: 0, streak: 0, lastResult: null };
    s.seen++; s.correct += Number(correct); s.wrong += Number(!correct);
    s.streak = correct ? s.streak + 1 : 0;
    s.lastResult = correct ? 'correct' : 'wrong';
    state.stats[item.id] = s;
    return true;
  }
  function advance(state) {
    const lesson = state.active;
    if (!lesson || lesson.completed || lesson.questions[lesson.cursor].answer === null) return false;
    if (lesson.cursor < LENGTH - 1) lesson.cursor++;
    else { lesson.completed = true; state.completed++; }
    return true;
  }
  function score(lesson, bank) {
    return lesson.questions.filter(q => q.answer === bank.find(x => x.id === q.id).road).length;
  }
  function validState(state, bank) {
    const integer = x => Number.isSafeInteger(x) && x >= 0;
    if (!state || state.version !== 1 || !integer(state.completed) || !state.stats || typeof state.stats !== 'object' || Array.isArray(state.stats)) return false;
    const ids = new Set(bank.map(x => x.id));
    for (const [id, s] of Object.entries(state.stats)) {
      if (!ids.has(id) || !s || !['seen', 'correct', 'wrong', 'streak'].every(k => integer(s[k])) ||
        s.seen !== s.correct + s.wrong || s.streak > s.correct || !['correct', 'wrong'].includes(s.lastResult)) return false;
    }
    const l = state.active;
    if (l === null) return true;
    if (!l || !Array.isArray(l.questions) || l.questions.length !== LENGTH || !integer(l.cursor) || l.cursor >= LENGTH || typeof l.completed !== 'boolean') return false;
    if (new Set(l.questions.map(q => q?.id)).size !== LENGTH) return false;
    return l.questions.every((q, index) => {
      const item = bank.find(x => x.id === q?.id);
      return item && Array.isArray(q.choices) && q.choices.length === 4 &&
        q.choices.every(c => typeof c === 'string' && bank.some(b => b.road === c)) &&
        new Set(q.choices.map(roadKey)).size === 4 && q.choices.includes(item.road) &&
        (q.answer === null || q.choices.includes(q.answer)) &&
        (index >= l.cursor || q.answer !== null) && (index <= l.cursor || q.answer === null) &&
        (!l.completed || (l.cursor === LENGTH - 1 && q.answer !== null));
    });
  }
  root.HastingsLearning = Object.freeze({ KEY, LENGTH, createBank, roadKey, shuffle, emptyState, weight, choicesFor, begin, answer, advance, score, validState });
})(globalThis);
