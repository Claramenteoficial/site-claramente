/* ============================================================
   JAVASCRIPT: ClaraMente Landing Page
   Scroll reveal · FAQ Accordion · Nav Spy · Counter
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAVBAR SCROLL ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  /* ── HAMBURGER ── */
  const hamburger = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = navbar.offsetHeight + 8;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── ACTIVE NAV LINK (scroll spy) ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const updateActive = () => {
    const scrollY = window.scrollY + navbar.offsetHeight + 40;
    let current = '';
    sections.forEach(s => { if (s.offsetTop <= scrollY) current = s.id; });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();

  /* ── FAQ ACCORDION ── */
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-question').setAttribute('aria-expanded', false);
      });
      if (!isOpen) {
        item.classList.add('open');
        item.querySelector('.faq-question').setAttribute('aria-expanded', true);
      }
    });
  });

  /* ── SCROLL REVEAL ── */
  const revealTargets = document.querySelectorAll(
    '.esp-card, .dep-card, .sobre-card, .servico-card, .faq-item, .cta-final-card, .hero-stats, .section-tag, .section-title, .section-subtitle'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), 80 * (entry.target.dataset.delay || 0));
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -50px 0px' });

  revealTargets.forEach((el, i) => {
    el.dataset.delay = i % 5;
    revealObserver.observe(el);
  });

  /* ── COUNTER ANIMATION ── */
  const counters = document.querySelectorAll('.stat-number');
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent.trim();
        const num = parseInt(text.replace(/\D/g, ''));
        if (isNaN(num) || num === 0) return;
        const prefix = (text.match(/^\D*/) || [''])[0];
        const suffix = (text.match(/\D+$/) || [''])[0];
        let start = 0;
        const step = 16;
        const increment = num / (1200 / step);
        const timer = setInterval(() => {
          start += increment;
          if (start >= num) { el.textContent = text; clearInterval(timer); }
          else { el.textContent = prefix + Math.floor(start) + suffix; }
        }, step);
        counterObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObs.observe(c));

  /* ── WHATSAPP FLOAT TOOLTIP ── */
  const wa = document.getElementById('whatsapp-float-btn');
  if (wa) wa.setAttribute('title', 'Falar pelo WhatsApp');

});
