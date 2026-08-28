/* ============================================
   MAIN.JS — Global scripts
   ============================================ */

// ── Import CSS ──
import '../css/variables.css';
import '../css/base.css';
import '../css/components.css';
import '../css/animations.css';
import '../css/responsive.css';

// ── Mobile Nav Toggle ──
function initMobileNav() {
  const hamburger = document.querySelector('.navbar__hamburger');
  const navLinks = document.querySelector('.navbar__links');
  const overlay = document.querySelector('.nav-overlay');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    if (overlay) overlay.classList.toggle('show');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  if (overlay) {
    overlay.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      overlay.classList.remove('show');
      document.body.style.overflow = '';
    });
  }

  // Close on link click
  navLinks.querySelectorAll('.navbar__link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      if (overlay) overlay.classList.remove('show');
      document.body.style.overflow = '';
    });
  });
}

// ── Navbar Scroll Effect ──
function initNavScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── Active Nav Link ──
function initActiveLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPage = href.split('/').pop();
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ── Scroll Reveal ──
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(el => observer.observe(el));
}

// ── Animate Progress Bars ──
function initProgressBars() {
  const bars = document.querySelectorAll('.progress-bar__fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute('data-width');
          if (width) {
            entry.target.style.width = width;
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  bars.forEach(bar => observer.observe(bar));
}

// ── Counter Animation ──
function animateCounter(el, target, duration = 2000) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * eased);

    el.textContent = current.toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString();
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-count'), 10);
          animateCounter(entry.target, target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => observer.observe(counter));
}

// ── Smooth anchor scroll ──
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ── Initialize everything ──
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initNavScroll();
  initActiveLink();
  initScrollReveal();
  initProgressBars();
  initCounters();
  initSmoothScroll();
});

// Export for page-specific scripts
export { initScrollReveal, initProgressBars, initCounters };
