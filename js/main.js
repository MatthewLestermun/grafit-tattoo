// =====================================================
// main.js — стили, работы, мастера, калькулятор, отзывы, вопросы, запись
// =====================================================

// ---------- Данные ----------
const STYLES = [
  { name: 'Реализм', note: 'портреты и животные', img: 'img/w5.jpg' },
  { name: 'Графика', note: 'точные линии и штриховка', img: 'img/w12.jpg' },
  { name: 'Минимализм', note: 'маленькие тату со смыслом', img: 'img/w8.jpg' },
  { name: 'Блэкворк', note: 'плотный чёрный и орнамент', img: 'img/w1.jpg' }
];

const WORKS = [
  { img: 'img/w1.jpg', style: 'Блэкворк', cap: 'Блэкворк на спине' },
  { img: 'img/w2.jpg', style: 'Блэкворк', cap: 'Большой проект в блэкворке' },
  { img: 'img/w3.jpg', style: 'Минимализм', cap: 'Надпись на руке' },
  { img: 'img/w4.jpg', style: 'Минимализм', cap: 'Тонкий леттеринг' },
  { img: 'img/w5.jpg', style: 'Реализм', cap: 'Лев на предплечье' },
  { img: 'img/w6.jpg', style: 'Графика', cap: 'Цветочная графика' },
  { img: 'img/w7.jpg', style: 'Минимализм', cap: 'Мини-тату на кисти' },
  { img: 'img/w8.jpg', style: 'Минимализм', cap: 'Звезда' },
  { img: 'img/w9.jpg', style: 'Минимализм', cap: 'Цифры на руке' },
  { img: 'img/w10.jpg', style: 'Минимализм', cap: 'Сердце на запястье' },
  { img: 'img/w11.jpg', style: 'Блэкворк', cap: 'Забитые руки' },
  { img: 'img/w12.jpg', style: 'Графика', cap: 'Рукав в графике' }
];

const MASTERS = [
  { name: 'Артём', style: 'Реализм и графика', img: 'img/m1.jpg', exp: '9 лет', bio: 'Основатель студии. Делает реализм: портреты, животных и сложные композиции. Любит крупные проекты на несколько сеансов.', works: [4, 11, 5] },
  { name: 'Денис', style: 'Блэкворк и орнамент', img: 'img/m2.jpg', exp: '7 лет', bio: 'Плотный чёрный, геометрия и орнаменты. Отлично перекрывает старые неудачные татуировки.', works: [0, 1, 10] },
  { name: 'Вера', style: 'Минимализм и лайнворк', img: 'img/m3.jpg', exp: '5 лет', bio: 'Тонкие линии, мини-тату и надписи. Рисует аккуратно и бережно — к ней часто приходят на первую татуировку.', works: [6, 7, 9] }
];

const REVIEWS = [
  { name: 'Игорь', img: 'img/r1.jpg', text: 'Перекрыли старую тату, которую делал ещё в институте. Денис нарисовал эскиз за два дня, теперь не узнать.' },
  { name: 'Полина', img: 'img/r2.jpg', text: 'Первая татуировка, было страшно. Вера всё объяснила, сделала перерыв, когда попросила. Зажило идеально.' },
  { name: 'Анна', img: 'img/r3.jpg', text: 'Цену назвали сразу на консультации, и она не изменилась. Чисто, спокойно, хорошая музыка.' },
  { name: 'Максим', img: 'img/r1.jpg', text: 'Делаю рукав у Артёма уже четвёртый сеанс. Каждый раз выхожу довольным, детализация космос.' }
];

const FAQ = [
  ['Больно ли делать татуировку?', 'Ощущения терпимые и зависят от места: на руке и бедре почти не больно, на рёбрах и стопе чувствительнее. Мастер делает перерывы, когда нужно.'],
  ['Сколько заживает тату?', 'Верхний слой заживает 2–3 недели, полностью кожа восстанавливается за месяц. После сеанса дадим крем и подробную инструкцию.'],
  ['Можно ли перекрыть старую татуировку?', 'Да, если она не слишком плотная и тёмная. Мастер посмотрит на консультации и предложит эскиз, который её спрячет.'],
  ['Нужна ли предоплата?', 'Предоплата 1 000 ₽ — она бронирует время мастера и входит в стоимость работы.'],
  ['С какого возраста делаете тату?', 'С 18 лет. С 16 — только с письменного согласия родителей и в их присутствии.']
];

// ---------- Помощники ----------
const $ = (s) => document.querySelector(s);
const rub = (n) => n.toLocaleString('ru-RU') + ' ₽';
function el(tag, attrs, html) {
  const n = document.createElement(tag);
  Object.entries(attrs || {}).forEach(([k, v]) => n.setAttribute(k, v));
  n.innerHTML = html || '';
  return n;
}
let toastTimer;
function toast(t) { const n = $('#toast'); n.textContent = t; n.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => n.classList.remove('show'), 2400); }

// ---------- Шапка ----------
const header = $('#header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 20), { passive: true });
$('#burger').addEventListener('click', () => document.body.classList.toggle('menu-open'));
document.querySelectorAll('.nav a').forEach((a) => a.addEventListener('click', () => document.body.classList.remove('menu-open')));
const navObs = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) document.querySelectorAll('.nav a').forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
['works', 'masters', 'calc', 'reviews', 'faq'].forEach((id) => navObs.observe(document.getElementById(id)));

// ---------- Работы и фильтр ----------
const gallery = $('#gallery');
const tabs = $('#work-tabs');
let visible = WORKS.map((_, i) => i);
WORKS.forEach((w, i) => {
  const b = el('button', { class: 'work', type: 'button', 'data-style': w.style }, `<img src="${w.img}" alt="${w.cap}" loading="lazy"><span>${w.style}</span>`);
  b.addEventListener('click', () => openLightbox(i));
  gallery.append(b);
});
function filterWorks(style) {
  tabs.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t.dataset.s === style));
  visible = [];
  gallery.querySelectorAll('.work').forEach((w, i) => {
    const show = style === 'Все' || w.dataset.style === style;
    w.classList.toggle('hide', !show);
    if (show) visible.push(i);
  });
}
['Все'].concat(STYLES.map((s) => s.name)).forEach((s) => {
  const t = el('button', { class: 'tab', type: 'button', 'data-s': s }, s);
  t.addEventListener('click', () => filterWorks(s));
  tabs.append(t);
});
filterWorks('Все');
function showStyle(s) { filterWorks(s); document.getElementById('works').scrollIntoView({ behavior: 'smooth' }); }

// Бегущая строка и «бенто» ведут к работам нужного стиля
const marquee = $('#marquee');
const marqueeNames = STYLES.map((s) => s.name).concat(['Лайнворк', 'Леттеринг', 'Орнамент']);
marqueeNames.concat(marqueeNames).forEach((n) => {
  const b = el('button', { type: 'button' }, n);
  b.addEventListener('click', () => showStyle(STYLES.some((s) => s.name === n) ? n : 'Все'));
  marquee.append(b);
});
const bento = $('#bento');
const footerStyles = $('#footer-styles');
STYLES.forEach((s) => {
  const tile = el('button', { class: 'tile', type: 'button' }, `<img src="${s.img}" alt="${s.name}" loading="lazy"><div class="tile__txt"><span><b>${s.name}</b><small>${s.note}</small></span><i>↗</i></div>`);
  tile.addEventListener('click', () => showStyle(s.name));
  bento.append(tile);
  const f = el('button', { type: 'button' }, s.name);
  f.addEventListener('click', () => showStyle(s.name));
  footerStyles.append(f);
});

// ---------- Окна ----------
function openModal(m) { m.classList.add('open'); m.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
function closeModal(m) { m.classList.remove('open'); m.setAttribute('aria-hidden', 'true'); if (!document.querySelector('.modal.open, .lightbox.open')) document.body.style.overflow = ''; }
document.querySelectorAll('.modal, .lightbox').forEach((m) => m.addEventListener('click', (e) => { if (e.target === m || e.target.closest('[data-close]')) closeModal(m); }));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') document.querySelectorAll('.modal.open, .lightbox.open').forEach(closeModal);
  if ($('#lightbox').classList.contains('open')) { if (e.key === 'ArrowRight') stepLb(1); if (e.key === 'ArrowLeft') stepLb(-1); }
});

// Просмотр фото
const lightbox = $('#lightbox');
let lbList = [], lbPos = 0;
function showLb() { const w = WORKS[lbList[lbPos]]; $('#lb-img').src = w.img; $('#lb-img').alt = w.cap; $('#lb-cap').textContent = w.cap + ' · ' + w.style; }
function openLightbox(i, list) { lbList = list || visible; lbPos = Math.max(0, lbList.indexOf(i)); showLb(); openModal(lightbox); }
function stepLb(d) { lbPos = (lbPos + d + lbList.length) % lbList.length; showLb(); }
$('#lb-prev').addEventListener('click', () => stepLb(-1));
$('#lb-next').addEventListener('click', () => stepLb(1));

// ---------- Мастера ----------
const mModal = $('#master-modal');
let currentMaster = null;
MASTERS.forEach((m) => {
  const card = el('button', { class: 'master glass', type: 'button' }, `<img src="${m.img}" alt="${m.name}" loading="lazy"><div class="master__body"><span><b>${m.name}</b><small>${m.style} · ${m.exp}</small></span><i>↗</i></div>`);
  card.addEventListener('click', () => openMaster(m));
  $('#masters-list').append(card);
});
function openMaster(m) {
  currentMaster = m;
  $('#mm-img').src = m.img; $('#mm-img').alt = m.name;
  $('#mm-style').textContent = m.style + ' · стаж ' + m.exp;
  $('#mm-name').textContent = m.name;
  $('#mm-bio').textContent = m.bio;
  const box = $('#mm-works'); box.innerHTML = '';
  m.works.forEach((wi) => {
    const b = el('button', { type: 'button' }, `<img src="${WORKS[wi].img}" alt="${WORKS[wi].cap}">`);
    b.addEventListener('click', () => openLightbox(wi, m.works));
    box.append(b);
  });
  openModal(mModal);
}
$('#mm-book').addEventListener('click', () => { closeModal(mModal); openBooking({ master: currentMaster.name }); });

// ---------- Калькулятор ----------
const SIZES = [['до 5 см', 3000, '1 сеанс до часа'], ['5–10 см', 6000, '1 сеанс 2–3 часа'], ['10–20 см', 11000, '1–2 сеанса'], ['рукав / спина', 45000, '6–10 сеансов']];
const PLACES = [['рука', 1], ['нога', 1], ['спина', 1.1], ['рёбра / шея', 1.25]];
const COLORS = [['чёрно-белая', 1], ['цветная', 1.3]];
const DETAILS = [['простая', 0.85], ['средняя', 1], ['сложная', 1.35]];
const calc = { size: 1, place: 0, color: 0, detail: 1 };
function chipGroup(box, items, key) {
  items.forEach((it, i) => {
    const c = el('button', { class: 'chip' + (calc[key] === i ? ' active' : ''), type: 'button' }, it[0]);
    c.addEventListener('click', () => { calc[key] = i; box.querySelectorAll('.chip').forEach((x) => x.classList.toggle('active', x === c)); updateCalc(); });
    box.append(c);
  });
}
chipGroup($('#c-size'), SIZES, 'size');
chipGroup($('#c-place'), PLACES, 'place');
chipGroup($('#c-color'), COLORS, 'color');
$('#c-detail').addEventListener('input', (e) => { calc.detail = Number(e.target.value); updateCalc(); });
let calcText = '';
function updateCalc() {
  const base = SIZES[calc.size][1] * PLACES[calc.place][1] * COLORS[calc.color][1] * DETAILS[calc.detail][1];
  const lo = Math.round(base / 500) * 500, hi = Math.round(base * 1.3 / 500) * 500;
  $('#c-price').textContent = `${rub(lo)} – ${rub(hi)}`;
  $('#c-time').textContent = SIZES[calc.size][2];
  $('#c-detail-val').textContent = DETAILS[calc.detail][0];
  calcText = `${SIZES[calc.size][0]}, ${PLACES[calc.place][0]}, ${COLORS[calc.color][0]}, ${DETAILS[calc.detail][0]} детализация (≈ ${rub(lo)} – ${rub(hi)})`;
}
updateCalc();
$('#c-book').addEventListener('click', () => openBooking({ idea: 'Расчёт: ' + calcText }));

// ---------- Отзывы ----------
let revStart = 0;
function renderReviews() {
  const per = innerWidth < 760 ? 1 : 3;
  const box = $('#reviews-list'); box.innerHTML = '';
  for (let k = 0; k < per; k++) {
    const r = REVIEWS[(revStart + k) % REVIEWS.length];
    box.append(el('article', { class: 'review glass' }, `<span class="mono">★★★★★</span><q>${r.text}</q><div class="review__who"><img src="${r.img}" alt=""><span><b>${r.name}</b><small>Яндекс Карты</small></span></div>`));
  }
}
$('#rev-prev').addEventListener('click', () => { revStart = (revStart - 1 + REVIEWS.length) % REVIEWS.length; renderReviews(); });
$('#rev-next').addEventListener('click', () => { revStart = (revStart + 1) % REVIEWS.length; renderReviews(); });
addEventListener('resize', renderReviews);
renderReviews();

// ---------- Вопросы: открыт один за раз ----------
FAQ.forEach(([q, a], i) => {
  const item = el('div', { class: 'qa' + (i === 0 ? ' open' : '') }, `<button class="qa__q" type="button">${q}<i>+</i></button><div class="qa__a"><div><p>${a}</p></div></div>`);
  item.querySelector('.qa__q').addEventListener('click', () => {
    const was = item.classList.contains('open');
    document.querySelectorAll('.qa').forEach((x) => x.classList.remove('open'));
    if (!was) item.classList.add('open');
  });
  $('#faq-list').append(item);
});

// ---------- Счётчики цифр ----------
const countObs = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  countObs.unobserve(e.target);
  const elx = e.target, target = Number(elx.dataset.count), dec = Number(elx.dataset.decimals || 0), suf = elx.dataset.suffix || '';
  const start = performance.now();
  (function tick(now) {
    const p = Math.min((now - start) / 1400, 1), v = target * (1 - Math.pow(1 - p, 3));
    elx.textContent = v.toLocaleString('ru-RU', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
    if (p < 1) requestAnimationFrame(tick);
  })(start);
}), { threshold: 0.4 });
document.querySelectorAll('[data-count]').forEach((n) => countObs.observe(n));

// ---------- Запись ----------
const bModal = $('#book-modal');
const book = { master: 'Любой', style: 'Пока не знаю', day: null };
function bookChips(box, items, key) {
  box.innerHTML = '';
  items.forEach((it) => {
    const c = el('button', { class: 'chip' + (book[key] === it ? ' active' : ''), type: 'button' }, it);
    c.addEventListener('click', () => { book[key] = it; box.querySelectorAll('.chip').forEach((x) => x.classList.toggle('active', x === c)); clearErr(); });
    box.append(c);
  });
}
const dayList = [];
for (let i = 1; i <= 6; i++) { const d = new Date(); d.setDate(d.getDate() + i); dayList.push(d.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' })); }

function openBooking(o) {
  o = o || {};
  bModal.classList.remove('sent');
  if (o.master) book.master = o.master;
  bookChips($('#b-master'), ['Любой'].concat(MASTERS.map((m) => m.name)), 'master');
  bookChips($('#b-style'), STYLES.map((s) => s.name).concat(['Пока не знаю']), 'style');
  bookChips($('#b-day'), dayList, 'day');
  if (o.idea) $('#b-idea').value = o.idea;
  clearErr();
  document.body.classList.remove('menu-open');
  openModal(bModal);
}
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-book]');
  if (!t) return;
  e.preventDefault();
  openBooking({ idea: t.dataset.plan ? 'Тариф: ' + t.dataset.plan : '' });
});
function clearErr() { $('#b-error').textContent = ''; ['#b-name', '#b-phone'].forEach((s) => $(s).classList.remove('err')); }
['#b-name', '#b-phone'].forEach((s) => $(s).addEventListener('input', clearErr));
$('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = $('#b-name').value.trim(), phone = $('#b-phone').value.replace(/\D/g, '');
  if (!book.day) { $('#b-error').textContent = 'Выберите удобный день'; return; }
  if (name.length < 2) { $('#b-name').classList.add('err'); $('#b-error').textContent = 'Напишите, как к вам обращаться'; return; }
  if (phone.length < 10) { $('#b-phone').classList.add('err'); $('#b-error').textContent = 'Проверьте номер телефона'; return; }
  const who = book.master === 'Любой' ? 'свободный мастер' : 'мастер ' + book.master;
  $('#b-summary').innerHTML = `${name}, ждём вас на консультации: ${book.day}, ${who}.<br>Стиль: ${book.style.toLowerCase()}. Перезвоним в течение часа, чтобы подтвердить время.`;
  bModal.classList.add('sent');
  $('#book-form').reset();
  book.day = null;
});
