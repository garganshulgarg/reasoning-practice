// Brain Rocket Reasoning — practice & exam app (no build step, works offline once loaded)
const $app = document.getElementById('app');
const L = 'abcd';
const store = {
  get(k, d) { try { const v = localStorage.getItem('br3_' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('br3_' + k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } },
  del(k) { try { localStorage.removeItem('br3_' + k); } catch (e) { /* ignore */ } }
};
const GOOD = ['Awesome! 🌟', 'Super star! ⭐', 'You nailed it! 💥', 'Brilliant brain! 🧠', 'Rocket power! 🚀', 'High five! 🙌', 'Genius move! 🏆', 'Yesss! 🎉'];
const BAD = ['Oops! Good try! 💪', 'Almost! Learn this one 👇', 'No worries — champions learn from mistakes! 🌈', 'Nice try! Read why below 👇'];
const pick = a => a[Math.floor(Math.random() * a.length)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

let S = null;            // current session
let timer = null;
let setup = { mode: 'practice', secs: ['All'], count: 10 };

/* ---------------- sound + confetti ---------------- */
let actx = null;
function beep(notes, type = 'sine') {
  if (store.get('mute', false)) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    notes.forEach(([f, t, d]) => {
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = type; o.frequency.value = f; o.connect(g); g.connect(actx.destination);
      const s = actx.currentTime + t; g.gain.setValueAtTime(.18, s); g.gain.exponentialRampToValueAtTime(.001, s + d);
      o.start(s); o.stop(s + d);
    });
  } catch (e) { /* audio not available */ }
}
const sGood = () => beep([[523, 0, .15], [659, .1, .15], [784, .2, .3]]);
const sBad = () => beep([[330, 0, .18], [247, .15, .3]], 'triangle');
const sWin = () => beep([[523, 0, .15], [659, .15, .15], [784, .3, .15], [1047, .45, .5]]);

const cv = document.getElementById('confetti'), cx = cv.getContext('2d');
let parts = [], raf = null;
function confetti(n = 120) {
  cv.width = innerWidth; cv.height = innerHeight;
  const cols = ['#ffc933', '#ff4d5e', '#2f7bff', '#1fbf6a', '#8a5cff', '#ff8a1f'];
  for (let i = 0; i < n; i++) parts.push({ x: innerWidth / 2 + (Math.random() - .5) * 200, y: innerHeight * .35, vx: (Math.random() - .5) * 14, vy: -Math.random() * 14 - 4, s: 6 + Math.random() * 8, c: pick(cols), r: Math.random() * 6, life: 110 });
  if (!raf) tick();
}
function tick() {
  cx.clearRect(0, 0, cv.width, cv.height);
  parts.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .45; p.vx *= .99; p.r += .2; p.life--; cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r); cx.fillStyle = p.c; cx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); cx.restore(); });
  parts = parts.filter(p => p.life > 0 && p.y < cv.height + 40);
  raf = parts.length ? requestAnimationFrame(tick) : (cx.clearRect(0, 0, cv.width, cv.height), null);
}
function toast(t) { const d = document.createElement('div'); d.className = 'toast'; d.textContent = t; document.body.appendChild(d); setTimeout(() => d.remove(), 1600); }

/* ---------------- helpers ---------------- */
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const nm = () => store.get('name', '') || 'Champion';
const qOf = id => QUESTIONS[id];
const isRight = id => S.answers[id] === qOf(id).ans;
const fmtT = ms => { const s = Math.floor(ms / 1000); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
function pool() { return setup.secs.includes('All') ? QUESTIONS.map(q => q.id) : QUESTIONS.filter(q => setup.secs.includes(q.sec)).map(q => q.id); }

/* ---------------- HOME ---------------- */
function home() {
  clearInterval(timer); S = null;
  const saved = store.get('exam', null), hist = store.get('hist', []);
  const best = hist.length ? Math.max(...hist.map(h => Math.round(h.score / h.total * 100))) : null;
  const p = pool().length;
  if (setup.count !== 'all' && setup.count > p) setup.count = p;
  $app.innerHTML = `
  <div class="hero"><div class="rocket">🚀</div><h1>Brain <span>Rocket</span> Reasoning</h1><p>Hi ${esc(nm())}! Term 3 practice — ready for blast-off? 🌟</p></div>
  <div class="panel">
    <h2>👦 Your name, Captain</h2>
    <div class="name-row"><input id="nm" maxlength="20" placeholder="Type your name" value="${esc(store.get('name', ''))}"><button class="chip" id="mute">${store.get('mute', false) ? '🔇 Sound off' : '🔊 Sound on'}</button></div>
    ${saved ? `<div class="resume"><span>📝 You have an unfinished exam (${Object.keys(saved.answers).length}/${saved.list.length} answered)</span><button class="chip on" id="resume">Continue ▶</button></div>` : ''}
    <div class="modes">
      <button class="mode practice ${setup.mode === 'practice' ? 'sel' : ''}" data-mode="practice"><div class="ic">🎯</div><b>Practice Mode</b><small>Answer is checked right away. Learn as you go!</small></button>
      <button class="mode exam ${setup.mode === 'exam' ? 'sel' : ''}" data-mode="exam"><div class="ic">📝</div><b>Exam Mode</b><small>All ${QUESTIONS.length} questions. Score after you submit.</small></button>
    </div>
    ${setup.mode === 'practice' ? `
      <div class="opts-title">📚 Which topics?</div>
      <div class="chips" id="secs">${['All', ...SECTIONS].map(s => `<button class="chip ${setup.secs.includes(s) ? 'on' : ''}" data-sec="${s}">${s}${s === 'All' ? '' : ` (${QUESTIONS.filter(q => q.sec === s).length})`}</button>`).join('')}</div>
      <div class="opts-title">🔢 How many questions? (${p} available)</div>
      <div class="chips" id="cnt">${[5, 10, 15, 20, 30].filter(n => n < p).map(n => `<button class="chip ${setup.count === n ? 'on' : ''}" data-n="${n}">${n}</button>`).join('')}
        <button class="chip ${setup.count === 'all' || setup.count === p ? 'on' : ''}" data-n="all">All ${p}</button>
        <span class="chip">✏️ <input id="custom" type="number" min="1" max="${p}" placeholder="Other"></span></div>`
    : `<div class="opts-title">📝 Exam has all ${QUESTIONS.length} Term 3 questions. You can go back and change answers before submitting.</div>`}
    <button class="go" id="go">${setup.mode === 'practice' ? '🚀 Start Practice' : '📝 Start Exam'}</button>
  </div>
  <div class="panel"><h2>🏅 My Exam Scores</h2>
    ${hist.length ? `<div class="stats"><div class="stat"><b>${best}%</b>Best score</div><div class="stat"><b>${hist[hist.length - 1].score}/${hist[hist.length - 1].total}</b>Last exam</div><div class="stat"><b>${hist.length}</b>Exams done</div></div>
      ${store.get('last', null) ? '<button class="chip on" id="lastrev" style="margin-top:12px">🔍 Review my last exam</button>' : ''}`
    : '<p>No exams yet. Finish an exam to see your score here! 💪</p>'}
  </div>`;
  const nmIn = document.getElementById('nm');
  nmIn.onchange = () => { store.set('name', nmIn.value.trim()); document.querySelector('.hero p').textContent = `Hi ${nm()}! Term 3 practice — ready for blast-off? 🌟`; };
  document.getElementById('mute').onclick = () => { store.set('mute', !store.get('mute', false)); home(); };
  document.querySelectorAll('[data-mode]').forEach(b => b.onclick = () => { setup.mode = b.dataset.mode; home(); });
  document.querySelectorAll('[data-sec]').forEach(b => b.onclick = () => {
    const s = b.dataset.sec;
    if (s === 'All') setup.secs = ['All'];
    else { setup.secs = setup.secs.filter(x => x !== 'All'); setup.secs = setup.secs.includes(s) ? setup.secs.filter(x => x !== s) : [...setup.secs, s]; if (!setup.secs.length) setup.secs = ['All']; }
    home();
  });
  document.querySelectorAll('[data-n]').forEach(b => b.onclick = () => { setup.count = b.dataset.n === 'all' ? 'all' : +b.dataset.n; home(); });
  const cu = document.getElementById('custom');
  if (cu) cu.oninput = () => { const v = parseInt(cu.value, 10); if (v >= 1) { setup.count = Math.min(v, p); document.querySelectorAll('[data-n]').forEach(x => x.classList.remove('on')); } };
  document.getElementById('go').onclick = start;
  const r = document.getElementById('resume'); if (r) r.onclick = () => { S = saved; quiz(); };
  const lr = document.getElementById('lastrev'); if (lr) lr.onclick = () => { S = store.get('last', null); review('all'); };
}

function start() {
  store.set('name', document.getElementById('nm').value.trim());
  if (setup.mode === 'exam') {
    const saved = store.get('exam', null);
    if (saved && !confirm('Start a NEW exam? Your unfinished exam will be removed.')) return;
    S = { mode: 'exam', list: QUESTIONS.map(q => q.id), idx: 0, answers: {}, start: Date.now() };
    store.set('exam', S);
  } else {
    const p = pool(), n = setup.count === 'all' ? p.length : Math.max(1, Math.min(setup.count, p.length));
    S = { mode: 'practice', list: shuffle(p).slice(0, n), idx: 0, answers: {}, start: Date.now(), streak: 0 };
  }
  quiz();
}

/* ---------------- question rendering ---------------- */
function ctxHTML(q, collapse) {
  const c = CTX[q.ctx]; if (!c) return '';
  const extra = c.html ? (collapse ? `<details><summary>👀 Show ${q.ctx === 'teeth' || q.ctx === 'brain' ? 'passage' : 'picture / table'}</summary><div class="extra">${c.html}</div></details>` : `<div class="extra">${c.html}</div>`) : '';
  return `<div class="ctx"><div class="sec">${c.title}</div><div class="dir">${c.dir}</div>${extra}</div>`;
}
function bodyHTML(q) {
  let h = `<div class="qtext"><span class="qnum">${q.n}</span>${q.q ? esc(q.q) : ''}</div>`;
  if (q.qimg) h += `<div class="qimg-row"><img src="${q.qimg}" alt="question figures">${q.blank ? '<span class="blank">: ❓</span>' : ''}</div>`;
  if (q.img) h += `<img class="qpic" src="${q.img}" alt="">`;
  if (q.match) h += `<table class="match">${q.match.left.map((src, i) => `<tr><td class="rn">(${['i', 'ii', 'iii', 'iv'][i]})</td><td><img src="${src}" alt=""></td><td class="rn">(${'ABCD'[i]})</td><td>${esc(q.match.right[i])}</td></tr>`).join('')}</table>`;
  return h;
}
function optsHTML(q, cls) {
  const img = q.opts[0].startsWith('img:'), long = q.opts.some(o => o.length > 22);
  return `<div class="options ${img ? 'imgs' : long ? 'list' : ''}">` + q.opts.map((o, i) =>
    `<button class="opt ${img ? 'img' : ''} ${cls(i)}" data-i="${i}"><span class="lt">${L[i]}</span>${img ? `<img src="${o.slice(4)}" alt="option ${L[i]}">` : `<span>${esc(o)}</span>`}</button>`).join('') + '</div>';
}

/* ---------------- QUIZ ---------------- */
function quiz() {
  clearInterval(timer);
  const id = S.list[S.idx], q = qOf(id), n = S.list.length, exam = S.mode === 'exam';
  const answered = S.answers[id] !== undefined;
  const pct = exam ? Object.keys(S.answers).length / n * 100 : (S.idx + (answered ? 1 : 0)) / n * 100;
  const stars = Object.keys(S.answers).filter(k => isRight(+k)).length;
  const cls = i => {
    if (!answered) return '';
    if (exam) return S.answers[id] === i ? 'picked' : '';
    if (i === q.ans) return 'right';
    return S.answers[id] === i ? 'wrong' : '';
  };
  $app.innerHTML = `
  <div class="topbar">
    <button class="btn-ic" id="home" title="Home">🏠</button>
    <div class="track"><div class="fill" style="width:${pct}%"></div><div class="ship" style="left:${Math.max(3, pct)}%">🚀</div><div class="planet">🪐</div></div>
    <span class="pill">${S.idx + 1}/${n}</span>
    ${exam ? `<span class="pill" id="clock">⏱ ${fmtT(Date.now() - S.start)}</span><button class="btn-ic" id="pal" title="All questions">🔢</button>` : `<span class="pill">⭐ ${stars}</span>`}
  </div>
  <div class="card">
    ${ctxHTML(q, false)}
    ${bodyHTML(q)}
    ${optsHTML(q, cls)}
    <div id="fb">${!exam && answered ? fbHTML(q, id) : ''}</div>
    <div class="navrow">${exam
      ? `<button class="alt" id="prev" ${S.idx === 0 ? 'disabled' : ''}>◀ Back</button>${S.idx < n - 1 ? '<button id="next">Next ▶</button>' : '<button class="submit" id="submit">✅ Submit Exam</button>'}`
      : (answered ? `<button id="next">${S.idx < n - 1 ? 'Next Question ▶' : '🏁 See My Score'}</button>` : '')}
    </div>
  </div>`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById('home').onclick = () => {
    if (exam) { store.set('exam', S); toast('Exam saved! Continue anytime 👍'); home(); }
    else if (confirm('Stop practice and go home?')) home();
  };
  if (!exam && answered) { /* practice: options locked after answering */ document.querySelectorAll('.opt').forEach(b => b.disabled = true); }
  else document.querySelectorAll('.opt').forEach(b => b.onclick = () => choose(+b.dataset.i));
  const nx = document.getElementById('next'); if (nx) nx.onclick = () => { if (S.idx < n - 1) { S.idx++; save(); quiz(); } else finish(); };
  const pv = document.getElementById('prev'); if (pv) pv.onclick = () => { S.idx--; save(); quiz(); };
  const sb = document.getElementById('submit'); if (sb) sb.onclick = trySubmit;
  const pl = document.getElementById('pal'); if (pl) pl.onclick = palette;
  if (exam) timer = setInterval(() => { const c = document.getElementById('clock'); if (c) c.textContent = '⏱ ' + fmtT(Date.now() - S.start); }, 1000);
}
function save() { if (S.mode === 'exam') store.set('exam', S); }

function fbHTML(q, id) {
  const ok = isRight(id);
  return `<div class="feedback ${ok ? 'ok' : 'no'}"><div class="big">${ok ? pick(GOOD) : pick(BAD)}</div>
    ${ok ? '' : `<div>The correct answer is <b>(${L[q.ans]})${q.opts[q.ans].startsWith('img:') ? '' : ' ' + esc(q.opts[q.ans])}</b></div>`}
    <div class="why">💡 ${esc(q.why)}</div></div>`;
}

function choose(i) {
  const id = S.list[S.idx], q = qOf(id);
  if (S.mode === 'exam') {
    S.answers[id] = i; save();
    document.querySelectorAll('.opt').forEach(b => b.classList.toggle('picked', +b.dataset.i === i));
    beep([[600, 0, .08]]);
    setTimeout(() => { if (S && S.mode === 'exam' && S.list[S.idx] === id && S.idx < S.list.length - 1) { S.idx++; save(); quiz(); } }, 450);
    return;
  }
  S.answers[id] = i;
  const ok = i === q.ans;
  S.streak = ok ? (S.streak || 0) + 1 : 0;
  if (ok) { sGood(); confetti(ok && S.streak % 5 === 0 ? 220 : 90); } else sBad();
  quiz();
  if (ok && [3, 5, 10, 15, 20].includes(S.streak)) toast(`🔥 ${S.streak} in a row! Amazing!`);
  setTimeout(() => { const f = document.getElementById('fb'); if (f) f.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 60);
}

function palette() {
  const m = document.createElement('div'); m.className = 'modal';
  const done = Object.keys(S.answers).length;
  m.innerHTML = `<div class="box"><h3>🔢 Jump to a question</h3><p>Answered <b>${done}</b> of ${S.list.length}. Blue = answered.</p>
    <div class="palette">${S.list.map((id, k) => `<button class="${S.answers[id] !== undefined ? 'done' : ''} ${k === S.idx ? 'cur' : ''}" data-k="${k}">${qOf(id).n}</button>`).join('')}</div>
    <div class="navrow"><button class="alt" id="close">Close</button><button class="submit" id="sub2">✅ Submit Exam</button></div></div>`;
  document.body.appendChild(m);
  m.onclick = e => { if (e.target === m) m.remove(); };
  m.querySelectorAll('[data-k]').forEach(b => b.onclick = () => { S.idx = +b.dataset.k; save(); m.remove(); quiz(); });
  m.querySelector('#close').onclick = () => m.remove();
  m.querySelector('#sub2').onclick = () => { m.remove(); trySubmit(); };
}
function trySubmit() {
  const left = S.list.filter(id => S.answers[id] === undefined);
  if (left.length && !confirm(`You have ${left.length} question(s) not answered yet. Submit anyway?`)) {
    S.idx = S.list.indexOf(left[0]); save(); quiz(); return;
  }
  if (!left.length && !confirm('Ready to submit your exam? 🚀')) return;
  finish();
}

/* ---------------- RESULTS ---------------- */
function finish() {
  clearInterval(timer);
  S.end = Date.now();
  const n = S.list.length, score = S.list.filter(isRight).length, pct = Math.round(score / n * 100);
  if (S.mode === 'exam') {
    store.del('exam');
    const h = store.get('hist', []); h.push({ score, total: n, date: Date.now() }); store.set('hist', h.slice(-20));
    store.set('last', S);
  }
  results();
}
function results() {
  const n = S.list.length, score = S.list.filter(isRight).length, pct = Math.round(score / n * 100);
  const stars = pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 40 ? 1 : 0;
  const trophy = pct >= 90 ? '🏆' : pct >= 70 ? '🥇' : pct >= 40 ? '🥈' : '💪';
  const msg = pct >= 90 ? `Superstar ${esc(nm())}! You are READY! 🎉` : pct >= 70 ? `Great job ${esc(nm())}! Almost perfect! 🌟` : pct >= 40 ? `Good effort ${esc(nm())}! Review the red ones and try again 💪` : `Keep going ${esc(nm())}! Every mistake makes your brain stronger 🧠`;
  const secs = SECTIONS.map(s => { const ids = S.list.filter(id => qOf(id).sec === s); return { s, t: ids.length, r: ids.filter(isRight).length }; }).filter(x => x.t);
  const wrong = S.list.filter(id => !isRight(id)).length;
  $app.innerHTML = `
  <div class="topbar"><button class="btn-ic" id="home">🏠</button><span class="pill">${S.mode === 'exam' ? '📝 Exam' : '🎯 Practice'} finished</span></div>
  <div class="card result">
    <div class="trophy">${trophy}</div>
    <div class="score">${score} / ${n}</div>
    <div class="stars">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
    <div class="msg">${msg}</div>
    <p>${pct}% correct${S.end ? ` · Time ${fmtT(S.end - S.start)}` : ''}</p>
    <div class="breakdown">${secs.map(x => `<div class="brow"><span class="nm">${x.s}</span><span class="bar"><i style="width:${x.r / x.t * 100}%"></i></span><b>${x.r}/${x.t}</b></div>`).join('')}</div>
    <div class="btn-grid">
      <button class="o" id="rvw" ${wrong ? '' : 'disabled'}>❌ Review my mistakes (${wrong})</button>
      <button class="p" id="rva">🔍 Review all answers</button>
      ${wrong ? '<button class="g" id="redo">🔁 Practice my mistakes</button>' : ''}
      <button id="again">🏠 Home</button>
    </div>
  </div>`;
  if (pct >= 70) { sWin(); confetti(250); setTimeout(() => confetti(200), 700); }
  document.getElementById('home').onclick = home;
  document.getElementById('again').onclick = home;
  document.getElementById('rva').onclick = () => review('all');
  document.getElementById('rvw').onclick = () => review('wrong');
  const rd = document.getElementById('redo');
  if (rd) rd.onclick = () => { S = { mode: 'practice', list: shuffle(S.list.filter(id => !isRight(id))), idx: 0, answers: {}, start: Date.now(), streak: 0 }; quiz(); };
}

/* ---------------- REVIEW ---------------- */
function review(filter) {
  clearInterval(timer);
  const ids = S.list.filter(id => filter === 'all' || (filter === 'wrong' ? !isRight(id) : isRight(id)));
  const score = S.list.filter(isRight).length;
  $app.innerHTML = `
  <div class="topbar"><button class="btn-ic" id="back">⬅️</button><span class="pill">🔍 Review · ${score}/${S.list.length} correct</span></div>
  <div class="chips" style="margin:6px 0 4px">${[['all', '📋 All'], ['wrong', '❌ Mistakes'], ['right', '✅ Correct']].map(([k, t]) => `<button class="chip ${filter === k ? 'on' : ''}" data-f="${k}">${t}</button>`).join('')}</div>
  ${ids.length ? '' : '<div class="card"><h2>🎉 Nothing here — all correct!</h2></div>'}
  ${ids.map(id => {
    const q = qOf(id), a = S.answers[id], ok = a === q.ans;
    const cls = i => i === q.ans ? 'right' : (a === i ? 'wrong' : '');
    return `<div class="card rv">
      <span class="tag ${a === undefined ? 'skip' : ok ? 'ok' : 'bad'}">${a === undefined ? '⏭ Not answered' : ok ? '✅ Correct' : '❌ Wrong'}</span>
      ${ctxHTML(q, true)}${bodyHTML(q)}${optsHTML(q, cls)}
      <div class="why">${a === undefined ? '' : `You chose <b>(${L[a]})</b>. `}Correct answer: <b>(${L[q.ans]})</b><br>💡 ${esc(q.why)}</div></div>`;
  }).join('')}
  <div class="navrow"><button id="back2">⬅️ Back to score</button></div>`;
  document.querySelectorAll('.rv .opt').forEach(b => b.disabled = true);
  const back = () => S.end ? results() : home();
  document.getElementById('back').onclick = back;
  document.getElementById('back2').onclick = back;
  document.querySelectorAll('[data-f]').forEach(b => b.onclick = () => review(b.dataset.f));
  window.scrollTo(0, 0);
}

/* keyboard shortcuts: a/b/c/d to answer, Enter/→ for next */
document.addEventListener('keydown', e => {
  if (!S || e.target.tagName === 'INPUT' || document.querySelector('.modal')) return;
  const k = e.key.toLowerCase();
  if (L.includes(k) && document.querySelector(`.opt[data-i="${L.indexOf(k)}"]:not(:disabled)`)) choose(L.indexOf(k));
  else if (k === 'enter' || k === 'arrowright') document.getElementById('next')?.click();
  else if (k === 'arrowleft') document.getElementById('prev')?.click();
});
window.addEventListener('resize', () => { cv.width = innerWidth; cv.height = innerHeight; });

home();
