// ================= DANIELA'S BAR & GRILL — interactions =================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Loader → Welcome sequence ---------- */
  const loader = document.getElementById('loader');
  const welcome = document.getElementById('welcome');
  const enterBtn = document.getElementById('enterBtn');
  const body = document.body;

  body.style.overflow = 'hidden';

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      welcome.classList.add('show');
    }, 1600); // let the loader neon flicker play
  });

  // Fallback in case 'load' already fired
  setTimeout(() => {
    if (!welcome.classList.contains('show')) {
      loader.classList.add('hidden');
      welcome.classList.add('show');
    }
  }, 3000);

  enterBtn.addEventListener('click', () => {
    welcome.classList.add('dismiss');
    body.style.overflow = '';
    setTimeout(() => welcome.remove(), 850);
    triggerReveal(); // check reveals immediately after entering
  });

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  navToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    if (navLinks.style.display === 'flex') {
      navLinks.style.cssText += 'flex-direction:column;position:fixed;top:70px;left:0;right:0;background:#0C1526;padding:1.5rem;gap:1.2rem;z-index:499;';
    }
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    if (window.innerWidth <= 900) navLinks.style.display = 'none';
  }));

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  function triggerReveal() {
    revealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.88) {
        el.classList.add('in-view');
      }
    });
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));
  window.addEventListener('scroll', triggerReveal);
  triggerReveal();

  /* ---------- Subtle 3D tilt on hero sign (mouse parallax) ---------- */
  const heroSign = document.querySelector('.hero-sign');
  const hero = document.querySelector('.hero');
  if (hero && heroSign) {
    hero.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      heroSign.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    });
    hero.addEventListener('mouseleave', () => {
      heroSign.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  }

  /* ---------- Menu / frame cards subtle tilt on mouse ---------- */
  document.querySelectorAll('.menu-item, .frame-card, .map-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(700px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ---------- Smooth anchor scroll offset for fixed navbar ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

});
