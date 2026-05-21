// ── Nav scroll state ─────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Reveal on scroll ─────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 80}ms`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

// ── Language bars animate in ─────────────────────────────────
const langFills = document.querySelectorAll('.lang-fill');
const langObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transform = 'scaleX(1)';
      langObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
langFills.forEach(el => langObserver.observe(el));

// ── Active nav highlight ─────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--text)';
          link.style.fontWeight = '700';
        } else {
          link.style.fontWeight = '';
        }
      });
    }
  });
}, { threshold: 0.45 });
sections.forEach(s => sectionObserver.observe(s));

// ── Mobile menu ──────────────────────────────────────────────
const burger = document.getElementById('burger');
const navLinksEl = document.querySelector('.nav-links');
let menuOpen = false;

burger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  if (menuOpen) {
    navLinksEl.style.cssText = `
      display: flex;
      flex-direction: column;
      position: absolute;
      top: var(--nav-h);
      left: 0; right: 0;
      background: rgba(255,255,255,0.97);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
      padding: 20px 5vw 28px;
      gap: 20px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    `;
    burger.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    burger.children[1].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    navLinksEl.removeAttribute('style');
    burger.children[0].style.transform = '';
    burger.children[1].style.transform = '';
  }
});

// close menu on link click
navLinksEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    navLinksEl.removeAttribute('style');
    burger.children[0].style.transform = '';
    burger.children[1].style.transform = '';
  });
});
