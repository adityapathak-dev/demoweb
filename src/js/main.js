/* ============================================
   MAIN.JS — Global functionality
   ============================================ */

// Imports
import '../css/variables.css';
import '../css/base.css';
import '../css/components.css';
import '../css/animations.css';
import '../css/responsive.css';

/* ── Navbar scroll ── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Mobile nav ── */
function initMobileNav() {
  const hamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const overlay = document.getElementById('nav-overlay');

  if (!hamburger || !mobileNav) return;

  function toggle() {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    if (overlay) overlay.classList.toggle('show', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggle);
  if (overlay) overlay.addEventListener('click', toggle);

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNav.classList.contains('open')) toggle();
    });
  });
}

/* ── Scroll reveal ── */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}

/* ── Program tabs (homepage) ── */
function initProgramTabs() {
  const tabs = document.querySelectorAll('.programs__tab');
  const panels = document.querySelectorAll('.programs__panel');

  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      panels.forEach(panel => {
        const isTarget = panel.id === `panel-${target}`;
        panel.classList.toggle('active', isTarget);
      });
    });
  });
}

/* ── Progress bars (results page) ── */
function initProgressBars() {
  const bars = document.querySelectorAll('.progress-bar__fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.dataset.width;
        if (width) entry.target.style.width = width;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => observer.observe(bar));
}

/* ── Demo form (homepage) ── */
function initDemoForm() {
  const form = document.getElementById('demo-form');
  const success = document.getElementById('demo-success');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const phone = form.querySelector('#demo-phone');
    const studentClass = form.querySelector('#demo-class');
    const subject = form.querySelector('#demo-subject');

    let valid = true;
    [phone, studentClass, subject].forEach(f => {
      if (!f || !f.value.trim()) {
        if (f) f.style.borderColor = 'var(--error)';
        valid = false;
      } else {
        if (f) f.style.borderColor = '';
      }
    });

    if (phone && phone.value.trim()) {
      const clean = phone.value.replace(/[\s\-\(\)]/g, '');
      if (!/^\+?\d{10,13}$/.test(clean)) {
        phone.style.borderColor = 'var(--error)';
        valid = false;
      }
    }

    if (!valid) return;

    // Show success
    form.style.display = 'none';
    if (success) success.classList.add('show');
  });

  // Clear error on input
  form.querySelectorAll('input, select').forEach(f => {
    f.addEventListener('input', () => { f.style.borderColor = ''; });
  });
}

/* ── Active nav link ── */
function setActiveLink() {
  const path = window.location.pathname;
  document.querySelectorAll('.navbar__link, .mobile-nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && path.endsWith(href.replace('/', ''))) {
      link.classList.add('active');
    } else if (href === '/index.html' && (path === '/' || path.endsWith('index.html'))) {
      // Only mobile nav has "Home" link
      link.classList.add('active');
    }
  });
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileNav();
  initScrollReveal();
  initProgramTabs();
  initProgressBars();
  initDemoForm();
  setActiveLink();
});
