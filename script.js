// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Header style + scroll progress + hero parallax
const header = document.getElementById('header');
const progress = document.getElementById('progress');
const orbs = document.querySelectorAll('.orb');

function onScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  header.classList.toggle('scrolled', y > 40);
  progress.style.width = (y / max) * 100 + '%';
  orbs.forEach(o => {
    const speed = parseFloat(o.dataset.speed) || 0;
    o.style.translate = '0 ' + y * speed + 'px';
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  nav.classList.toggle('open');
});
nav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    nav.classList.remove('open');
  })
);

// Scroll reveal
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('show'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Count-up numbers
const countObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.to;
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current;
      }, 25);
      countObserver.unobserve(el);
    });
  },
  { threshold: 0.6 }
);
document.querySelectorAll('.count').forEach(el => countObserver.observe(el));

// Product filter
const tabs = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.card');

function filterProducts(f) {
  tabs.forEach(t => t.classList.toggle('active', t.dataset.f === f));
  cards.forEach(c => {
    const show = f === 'all' || c.dataset.cat === f;
    c.classList.toggle('hide', !show);
  });
}
tabs.forEach(t => t.addEventListener('click', () => filterProducts(t.dataset.f)));

// Collection tiles also set the filter
document.querySelectorAll('.tile').forEach(tile =>
  tile.addEventListener('click', () => filterProducts(tile.dataset.filter))
);