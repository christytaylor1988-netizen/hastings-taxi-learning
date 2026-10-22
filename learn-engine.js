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
      .replace(/[^a-z0-9]+/g, ' ').trim().replace(/\bwishingtree\b/g, 'wishing tree').replace(/\bchurch wood\b/g, 'churchwood').replace(/^rock a nore(?: road)?$/, 'rock a nore road').replace(/^ridge west$/, 'the ridge west');
  }
  const CATEGORIES = {
    'Schools & Colleges': 'Schools and education', 'Primary Schools': 'Schools and education',
    'Hospitals & Clinics': 'Hospitals and healthcare', 'Nursing Homes': 'Hospitals and healthcare',
    'Railway & Bus Stations': 'Transport and stations',
    'Supermarkets / Stores': 'Shops and supermarkets',
    'Council & Contractor Offices': 'Council and public buildings',
    'Places of Interest': 'Landmarks and attractions',
    'Public Houses & Bars': 'Pubs, bars and restaurants',
    'Night Clubs': 'Nightclubs and entertainment', 'Entertainment Venues': 'Nightclubs and entertainment',
    'Parks & Playing Fields': 'Landmarks and attractions', 'Leisure Facilities': 'Landmarks and attractions',
    'Other Offices': 'Council and public buildings', 'Emergency Services': 'Council and public buildings',
    'Caravan / Holiday Parks': 'Hotels and accommodation'
  };
  function categoryFor(category) {
    if (/hotel|accommodation|guest|bed.*breakfast/i.test(category)) return 'Hotels and accommodation';
    if (/restaurant|cafe/i.test(category)) return 'Pubs, bars and restaurants';
    return CATEGORIES[category] || 'Other locations';
  }
  function needsReview(stat) { return !!stat && stat.wrong > 0 && stat.streak < 3; }
  function eligible(state, bank, options = {}) {
    if (options.mode === 'category') return bank.filter(x => x.learningCategory === options.category);
    if (options.mode === 'batch') return bank.filter(x => x.sourceRecords.some(n => Math.floor((n - 1) / 25) === options.batch));
    if (options.mode === 'review') return bank.filter(x => needsReview(state.stats[x.id]));
    return bank;
  }
  function createBank(source) {
    if (!Array.isArray(source)) throw new Error('The original location database could not be loaded.');
    const additions = (root.HastingsBatch02 || []).map(x => [x.record, x.place, x.road]);
    const existing = new Map([...PICKS, ...additions].map(([record, place, road], index) => {
      const item = source[record - 1];
      if (!item || item.place !== place || item.road !== road) throw new Error('Existing syllabus records changed; review needed before loading progress.');
      return [record, (index < PICKS.length ? 'starter-' : 'batch02-') + record];
    }));
    const unique = new Map();
    // Merge only the same exact venue name + equivalent answer. Preserve every source position.
    source.forEach((item, index) => {
      const record = index + 1;
      if (!item.place?.trim() || !item.road?.trim()) throw new Error('Missing syllabus answer at record ' + record);
      const key = roadKey(item.place) + '|' + roadKey(item.road);
      const previous = unique.get(key);
      if (previous) { previous.sourceRecords.push(record); return; }
      const audit = (root.HastingsFullAudit || []).find(x => x.record === record);
      if (!audit || audit.sourcePlace !== item.place || audit.sourceRoad !== item.road) throw new Error('The full syllabus audit does not match record ' + record);
      unique.set(key, {...item, sourceRoad:item.road, road:audit.learningRoad || item.road, id: existing.get(record) || 'source-' + record,
        sourceRecord: record, sourceRecords: [record], learningCategory: categoryFor(item.category), audit});
    });
    return [...unique.values()].map(item => {
      const printed = item.sourceRecords.map(record => root.HastingsPrintedExam?.entries.find(x => x.record === record));
      if (printed.some((p, n) => !p || p.sourcePlace !== source[item.sourceRecords[n]-1].place || p.sourceRoad !== source[item.sourceRecords[n]-1].road)) throw new Error('Printed revision list does not match the original records.');
      const revision = printed[0], correction = revision.correction;
      const previousRoad = item.road, road = correction?.road || previousRoad;
      const acceptedRoads = Object.freeze(revision.acceptedRoads || [road]);
      const answerHistory = Object.freeze([...new Set([road, previousRoad, item.sourceRoad, ...acceptedRoads])]);
      const audit = correction ? {...item.audit, roadStatus:'confirmed', learningRoad:road, note:correction.note, checked:'2026-10-22', examAnswerStatus:'Unconfirmed', sources:[...(item.audit.sources || []), correction.url]} : revision.acceptedRoads ? {...item.audit, structuralNote:'The printed sheet lists two roads or sites. New questions ask for one listed road; the other is never an incorrect choice.'} : item.audit;
      return Object.freeze({...item, road, audit, previousRoad, acceptedRoads, answerHistory, printed:Object.freeze(printed), examPriority:true, sourceRecords:Object.freeze(item.sourceRecords)});
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
  function choicesFor(item, bank, rng = Math.random, correctRoad = item.road) {
    const seen = new Set([roadKey(correctRoad), ...(item.answerHistory || []).map(roadKey)]);
    // Only single roads are used as distractors, never ambiguous alternatives or building-only answers.
    // Exclude every road mentioned by the syllabus AND the audit, including known current-address conflicts.
    const context = roadKey([item.road, item.sourceRoad, item.audit?.observedAddress || '', item.audit?.note || '', ...(item.acceptedRoads || []), ...item.printed.map(p => p.printedRoad), ...(item.audit?.avoidRoads || [])].join(' '));
    const singleRoad = road => !/\/|\bOR\b|,| - |\b(?:off|opposite|rear of)\b/i.test(road) &&
      (/\b(?:road|rd|street|st|avenue|ave|lane|way|close|drive|parade|place|terrace|crescent|gardens|square|hill|down|ascent|plaza|walk)\.?$/i.test(road) || /^(?:the ridge(?: west)?|white rock|the bourne|marina|mercatoria)$/i.test(road));
    const candidates = shuffle(bank.filter(x => singleRoad(x.road)), rng).sort((a, b) => {
      const rank = x => x.area === item.area ? 0 : x.learningCategory === item.learningCategory ? 1 : 2;
      return rank(a) - rank(b);
    });
    const wrong = [];
    for (const candidate of candidates) {
      const key = roadKey(candidate.road);
      if (!seen.has(key) && !context.includes(key) && !key.includes(roadKey(item.road))) { seen.add(key); wrong.push(candidate.road); }
      if (wrong.length === 3) break;
    }
    if (wrong.length !== 3) throw new Error('Not enough distinct road choices.');
    return shuffle([correctRoad, ...wrong], rng);
  }
  function questionFor(item, bank, rng = Math.random) {
    const correctRoad = item.acceptedRoads[Math.floor(rng() * item.acceptedRoads.length)];
    return {id:item.id, choices:choicesFor(item, bank, rng, correctRoad), correctRoad, answer:null, revision:'2026-10-22'};
  }
  function lessonKey(options = {}) {
    if (options.mode === 'batch') return 'batch:' + options.batch;
    if (options.mode === 'category') return 'category:' + options.category;
    return options.mode === 'review' ? 'review' : 'mixed';
  }
  function begin(state, bank, rng = Math.random, options = {}) {
    const key = lessonKey(options);
    if (state.active && lessonKey(state.active) === key) return state.active;
    // Keep the exact questions, answers and cursor when changing study focus.
    if (state.active && !state.active.completed) {
      state.pausedLessons ||= {};
      state.pausedLessons[lessonKey(state.active)] = state.active;
    }
    state.active = null;
    if (state.pausedLessons?.[key]) {
      state.active = state.pausedLessons[key];
      delete state.pausedLessons[key];
      return state.active;
    }
    const available = eligible(state, bank, options);
    const length = Math.min(LENGTH, available.length);
    if (!length) return null;
    const missed = shuffle(available.filter(item => state.stats[item.id]?.lastResult === 'wrong'), rng);
    // Reserve up to half of each lesson for unresolved mistakes; weight the rest.
    const selected = missed.slice(0, Math.min(5, length));
    const used = new Set(selected.map(item => item.id));
    const pool = available.filter(item => !used.has(item.id));
    while (selected.length < length) selected.push(weightedPick(pool, state.stats, rng));
    state.active = {
      questions: shuffle(selected, rng).map(item => questionFor(item, bank, rng)),
      cursor: 0, completed: false, mode: options.mode || 'mixed', category: options.category || null, batch: Number.isInteger(options.batch) ? options.batch : null
    };
    return state.active;
  }
  // Old saved questions were generated with the original syllabus answer.
  // Preserve their grading; only newly created questions use reviewed corrections.
  function expected(q, item) { return q.correctRoad || item.sourceRoad || item.road; }
  function answer(state, bank, choice) {
    const lesson = state.active;
    const q = lesson?.questions[lesson.cursor];
    if (!q || lesson.completed || q.answer !== null || !q.choices.includes(choice)) return false;
    const item = bank.find(x => x.id === q.id);
    q.answer = choice;
    const correct = choice === expected(q, item);
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
    if (lesson.cursor < lesson.questions.length - 1) lesson.cursor++;
    else { lesson.completed = true; state.completed++; }
    return true;
  }
  function score(lesson, bank) {
    return lesson.questions.filter(q => q.answer === expected(q, bank.find(x => x.id === q.id))).length;
  }
  function validState(state, bank) {
    const integer = x => Number.isSafeInteger(x) && x >= 0;
    if (!state || state.version !== 1 || !integer(state.completed) || !state.stats || typeof state.stats !== 'object' || Array.isArray(state.stats)) return false;
    const ids = new Set(bank.map(x => x.id));
    for (const [id, s] of Object.entries(state.stats)) {
      if (!ids.has(id) || !s || !['seen', 'correct', 'wrong', 'streak'].every(k => integer(s[k])) ||
        s.seen !== s.correct + s.wrong || s.streak > s.correct || !['correct', 'wrong'].includes(s.lastResult)) return false;
    }
    if (state.pausedLessons !== undefined) {
      const paused = state.pausedLessons;
      if (!paused || typeof paused !== 'object' || Array.isArray(paused)) return false;
      const allowed = new Set(['mixed', 'review', ...bank.map(x => 'category:' + x.learningCategory),
        ...bank.flatMap(x => x.sourceRecords.map(n => 'batch:' + Math.floor((n - 1) / 25)))]);
      for (const [key, lesson] of Object.entries(paused)) {
        if (!allowed.has(key) || !lesson || lesson.completed || lessonKey(lesson) !== key ||
            !validState({version:1, stats:{}, completed:0, active:lesson}, bank)) return false;
      }
    }
    const l = state.active;
    if (l === null) return true;
    if (!l || !Array.isArray(l.questions) || (l.questions.length < 1 || l.questions.length > LENGTH) || !integer(l.cursor) || l.cursor >= l.questions.length || typeof l.completed !== 'boolean') return false;
    if (new Set(l.questions.map(q => q?.id)).size !== l.questions.length) return false;
    return l.questions.every((q, index) => {
      const item = bank.find(x => x.id === q?.id);
      return item && Array.isArray(q.choices) && q.choices.length === 4 &&
        q.choices.every(c => typeof c === 'string' && bank.some(b => b.answerHistory.includes(c))) &&
        new Set(q.choices.map(roadKey)).size === 4 && (q.correctRoad === undefined || item.answerHistory.includes(q.correctRoad)) && q.choices.includes(expected(q,item)) &&
        (q.answer === null || q.choices.includes(q.answer)) &&
        (index >= l.cursor || q.answer !== null) && (index <= l.cursor || q.answer === null) &&
        (!l.completed || (l.cursor === l.questions.length - 1 && q.answer !== null));
    });
  }
  root.HastingsLearning = Object.freeze({ KEY, LENGTH, expected, needsReview, eligible, createBank, roadKey, shuffle, emptyState, weight, choicesFor, questionFor, begin, answer, advance, score, validState });
})(globalThis);
