/* ═══════════════════════════════════════════════════════════════
   NEXORA DIGITAL — script.js
   Premium Digital Marketing Agency Website
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ─── DOM Ready ─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initTheme();
  initNavbar();
  initMobileMenu();
  initHeroTyped();
  initHeroParticles();
  initScrollAnimations();
  initCounters();
  initProgressBars();
  initTestimonialSlider();
  initFAQ();
  initROICalculator();
  initForms();
  initBackToTop();
  initLeadPopup();
  initExitPopup();
  initLiveChat();
  initClientsHover();
});

/* ─── 1. PAGE LOADER ─────────────────────────────────────────── */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      // Trigger entry animations after load
      document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
        el.style.transition = 'none';
      });
    }, 1200);
  });
}

/* ─── 2. DARK/LIGHT THEME ────────────────────────────────────── */
function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const icon = toggle?.querySelector('.theme-icon');

  // Load saved theme
  const saved = localStorage.getItem('nexora-theme') || 'dark';
  setTheme(saved);

  toggle?.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('nexora-theme', theme);
    if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

/* ─── 3. NAVBAR ──────────────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  // Scroll effect
  const handleScroll = throttle(() => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, 100);
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-30% 0px -70% 0px' });

  sections.forEach(s => observer.observe(s));

  // Smooth anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-h')) || 76;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: 'smooth'
        });
        // Close mobile menu
        const navLinks = document.getElementById('nav-links');
        const menuBtn = document.getElementById('mobile-menu-btn');
        if (navLinks?.classList.contains('mobile-open')) {
          navLinks.classList.remove('mobile-open');
          menuBtn?.classList.remove('open');
          menuBtn?.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
}

/* ─── 4. MOBILE MENU ─────────────────────────────────────────── */
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const isOpen = links.classList.toggle('mobile-open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('mobile-open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ─── 5. HERO TYPED TEXT ─────────────────────────────────────── */
function initHeroTyped() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const phrases = [
    'More Leads & Traffic',
    'More Revenue',
    'Explosive Growth',
    'Better ROI',
    'Qualified Customers',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let timeout;

  function type() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === current.length) {
      delay = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    timeout = setTimeout(type, delay);
  }

  type();
}

/* ─── 6. HERO PARTICLES ──────────────────────────────────────── */
function initHeroParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;

  const count = 30;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 10;
    const hue = Math.random() > 0.5 ? '210' : '188'; // blue or cyan

    p.style.cssText = `
      left: ${left}%;
      width: ${size}px;
      height: ${size}px;
      background: hsl(${hue}, 100%, 65%);
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;
    fragment.appendChild(p);
  }

  container.appendChild(fragment);
}

/* ─── 7. SCROLL ANIMATIONS ───────────────────────────────────── */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ─── 8. ANIMATED COUNTERS ───────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
  const target = parseFloat(el.getAttribute('data-target'));
  const isDecimal = target % 1 !== 0;
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4); // ease out quart
    const current = eased * target;

    el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString();

    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString();
  }

  requestAnimationFrame(update);
}

/* ─── 9. PROGRESS BARS ───────────────────────────────────────── */
function initProgressBars() {
  const bars = document.querySelectorAll('.progress-fill[data-width]');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.getAttribute('data-width') + '%';
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(b => observer.observe(b));
}

/* ─── 10. TESTIMONIAL SLIDER ─────────────────────────────────── */
function initTestimonialSlider() {
  const track = document.getElementById('testimonials-track');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  const dotsContainer = document.getElementById('slider-dots');

  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  const total = cards.length;
  let current = 0;
  let autoplay;

  // Create dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `slider-dot${i === 0 ? ' active' : ''}`;
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer?.appendChild(dot);
  });

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsContainer?.querySelectorAll('.slider-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  prevBtn?.addEventListener('click', () => { goTo(current - 1); resetAutoplay(); });
  nextBtn?.addEventListener('click', () => { goTo(current + 1); resetAutoplay(); });

  // Autoplay
  function startAutoplay() {
    autoplay = setInterval(() => goTo(current + 1), 5000);
  }
  function resetAutoplay() {
    clearInterval(autoplay);
    startAutoplay();
  }
  startAutoplay();

  // Touch swipe
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? goTo(current + 1) : goTo(current - 1); }
  });
}

/* ─── 11. FAQ ACCORDION ──────────────────────────────────────── */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      items.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer')?.classList.remove('open');
        i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      // Open clicked if was closed
      if (!isOpen) {
        item.classList.add('open');
        answer?.classList.add('open');
        question?.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ─── 12. ROI CALCULATOR ─────────────────────────────────────── */
function initROICalculator() {
  const budgetInput = document.getElementById('monthly-budget');
  const saleInput = document.getElementById('avg-sale');
  const convInput = document.getElementById('conversion-rate');
  const serviceInput = document.getElementById('service-type');

  const leadsEl = document.getElementById('projected-leads');
  const revenueEl = document.getElementById('projected-revenue');
  const roiEl = document.getElementById('projected-roi');

  if (!budgetInput) return;

  // Traffic multipliers by service
  const multipliers = {
    seo: 2.87,
    ads: 3.8,
    social: 2.2,
    local: 3.2
  };

  function calculate() {
    const budget = parseFloat(budgetInput.value) || 2000;
    const avgSale = parseFloat(saleInput.value) || 500;
    const convRate = parseFloat(convInput.value) || 2;
    const service = serviceInput.value || 'seo';
    const multiplier = multipliers[service] || 2.87;

    // Rough calculation model
    const estimatedVisitors = (budget / 2) * multiplier;
    const leads = Math.round(estimatedVisitors * (convRate / 100));
    const closingRate = 0.25; // 25% close rate assumption
    const revenue = Math.round(leads * closingRate * avgSale);
    const roi = budget > 0 ? (revenue / budget).toFixed(1) : 0;

    // Animate values
    animateValue(leadsEl, 0, leads, 1000, false);
    animateValue(revenueEl, 0, revenue, 1000, true);
    roiEl.textContent = `${roi}x`;
  }

  function animateValue(el, from, to, duration, isCurrency) {
    const start = performance.now();
    function update(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const val = Math.round(from + (to - from) * eased);
      el.textContent = isCurrency ? '$' + val.toLocaleString() : val.toLocaleString();
      if (t < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  [budgetInput, saleInput, convInput, serviceInput].forEach(input => {
    input?.addEventListener('input', debounce(calculate, 300));
  });

  calculate(); // Initial calculation
}

/* ─── 13. FORM VALIDATION & SUBMISSION ───────────────────────── */
function initForms() {
  // Contact form
  const contactForm = document.getElementById('contact-form');
  contactForm?.addEventListener('submit', handleContactSubmit);

  // Audit form
  const auditForm = document.getElementById('audit-form');
  auditForm?.addEventListener('submit', handleAuditSubmit);

  // Popup form
  const popupForm = document.getElementById('popup-form');
  popupForm?.addEventListener('submit', handlePopupSubmit);

  // Newsletter form
  const newsletterForm = document.getElementById('newsletter-form');
  newsletterForm?.addEventListener('submit', handleNewsletterSubmit);
}

function handleContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  if (!validateForm(form)) return;

  const btn = form.querySelector('button[type="submit"]');
  setLoading(btn, true);

  // Simulate API call
  setTimeout(() => {
    setLoading(btn, false);
    const success = document.getElementById('contact-success');
    if (success) {
      success.style.display = 'block';
      form.reset();
      setTimeout(() => { success.style.display = 'none'; }, 5000);
    }
  }, 1500);
}

function handleAuditSubmit(e) {
  e.preventDefault();
  const form = e.target;
  if (!validateForm(form)) return;

  const btn = form.querySelector('button[type="submit"]');
  setLoading(btn, true);

  setTimeout(() => {
    setLoading(btn, false);
    btn.textContent = '✅ Audit Request Received!';
    btn.style.background = '#10B981';
    form.reset();
    setTimeout(() => {
      btn.textContent = 'Claim My Free Audit ($997 Value) →';
      btn.style.background = '';
    }, 5000);
  }, 1500);
}

function handlePopupSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  setLoading(btn, true);

  setTimeout(() => {
    setLoading(btn, false);
    btn.textContent = '✅ Audit Request Sent!';
    form.reset();
    setTimeout(() => {
      document.getElementById('lead-popup')?.classList.remove('active');
    }, 2000);
  }, 1200);
}

function handleNewsletterSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const input = form.querySelector('input[type="email"]');
  const btn = form.querySelector('button');

  if (!input?.value || !isValidEmail(input.value)) {
    input?.classList.add('error');
    setTimeout(() => input?.classList.remove('error'), 2000);
    return;
  }

  setLoading(btn, true);
  setTimeout(() => {
    setLoading(btn, false);
    btn.textContent = '✅';
    btn.style.background = '#10B981';
    form.reset();
  }, 1000);
}

function validateForm(form) {
  let valid = true;
  const required = form.querySelectorAll('[required]');

  required.forEach(field => {
    field.classList.remove('error');
    const val = field.value.trim();

    if (!val) {
      field.classList.add('error');
      valid = false;
    } else if (field.type === 'email' && !isValidEmail(val)) {
      field.classList.add('error');
      valid = false;
    }
  });

  if (!valid) {
    const firstError = form.querySelector('.error');
    firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    firstError?.focus();
  }

  return valid;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setLoading(btn, loading) {
  if (!btn) return;
  if (loading) {
    btn.dataset.originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    btn.style.opacity = '0.7';
  } else {
    btn.textContent = btn.dataset.originalText || btn.textContent;
    btn.disabled = false;
    btn.style.opacity = '';
  }
}

/* ─── 14. BACK TO TOP ────────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', throttle(() => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, 200), { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─── 15. LEAD CAPTURE POPUP ─────────────────────────────────── */
function initLeadPopup() {
  const popup = document.getElementById('lead-popup');
  const closeBtn = document.getElementById('popup-close');
  if (!popup) return;

  // Don't show if already seen in this session
  if (sessionStorage.getItem('popup-seen')) return;

  // Show after 8 seconds
  const timer = setTimeout(() => {
    popup.classList.add('active');
    sessionStorage.setItem('popup-seen', '1');
  }, 8000);

  closeBtn?.addEventListener('click', () => {
    popup.classList.remove('active');
    clearTimeout(timer);
  });

  popup.addEventListener('click', e => {
    if (e.target === popup) popup.classList.remove('active');
  });

  // Keyboard close
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') popup.classList.remove('active');
  });
}

/* ─── 16. EXIT INTENT POPUP ──────────────────────────────────── */
function initExitPopup() {
  const popup = document.getElementById('exit-popup');
  const closeBtn = document.getElementById('exit-popup-close');
  const exitCta = document.getElementById('exit-cta');
  if (!popup) return;

  if (sessionStorage.getItem('exit-popup-seen')) return;

  let triggered = false;

  document.addEventListener('mouseleave', e => {
    if (e.clientY <= 0 && !triggered) {
      triggered = true;
      popup.classList.add('active');
      sessionStorage.setItem('exit-popup-seen', '1');
    }
  });

  closeBtn?.addEventListener('click', () => popup.classList.remove('active'));
  popup.addEventListener('click', e => {
    if (e.target === popup) popup.classList.remove('active');
  });
  exitCta?.addEventListener('click', () => popup.classList.remove('active'));
}

/* ─── 17. LIVE CHAT ──────────────────────────────────────────── */
function initLiveChat() {
  const trigger = document.getElementById('chat-trigger');
  const bubble = document.getElementById('chat-bubble');
  const closeBtn = document.getElementById('chat-close');

  trigger?.addEventListener('click', () => bubble?.classList.toggle('open'));
  closeBtn?.addEventListener('click', () => bubble?.classList.remove('open'));
}

/* ─── 18. CLIENT LOGOS HOVER PAUSE ──────────────────────────── */
function initClientsHover() {
  const track = document.getElementById('clients-track');
  if (!track) return;
  track.addEventListener('mouseenter', () => { track.style.animationPlayState = 'paused'; });
  track.addEventListener('mouseleave', () => { track.style.animationPlayState = 'running'; });
}

/* ─── UTILITY FUNCTIONS ──────────────────────────────────────── */

/** Throttle function calls */
function throttle(fn, wait) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= wait) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

/** Debounce function calls */
function debounce(fn, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), wait);
  };
}

/* ─── Service Card Keyboard Accessibility ────────────────────── */
document.querySelectorAll('.service-card[tabindex="0"]').forEach(card => {
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.querySelector('.service-cta')?.click();
    }
  });
});

/* ─── Smooth reveal for navbar logo img ─────────────────────── */
['nav-logo-img', 'footer-logo-img'].forEach(id => {
  const img = document.getElementById(id);
  if (img) {
    img.addEventListener('error', () => {
      // Fallback to text logo if image fails
      const wrapper = img.closest('.nav-logo, .footer-brand');
      if (wrapper && id === 'nav-logo-img') {
        const text = document.createElement('span');
        text.style.cssText = 'font-family:var(--font-display);font-weight:900;font-size:1.4rem;';
        text.innerHTML = '<span style="background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">NEXORA</span><span style="color:var(--accent);"> DIGITAL</span>';
        img.replaceWith(text);
      }
    });
  }
});

/* ─── Intersection Observer for service card micro-animations ── */
const serviceCards = document.querySelectorAll('.service-card');
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 0.05}s`;
      entry.target.classList.add('revealed');
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
serviceCards.forEach(c => cardObserver.observe(c));

/* ─── Magnetic hover effect for CTA buttons ─────────────────── */
document.querySelectorAll('.btn-primary.btn-lg').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translateY(-2px) translate(${x * 0.08}px, ${y * 0.08}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ─── Real-time form field validation feedback ───────────────── */
document.querySelectorAll('input[type="email"]').forEach(input => {
  input.addEventListener('blur', () => {
    if (input.value && !isValidEmail(input.value)) {
      input.classList.add('error');
      input.title = 'Please enter a valid email address';
    } else {
      input.classList.remove('error');
      input.title = '';
    }
  });
  input.addEventListener('input', () => {
    if (input.classList.contains('error') && isValidEmail(input.value)) {
      input.classList.remove('error');
    }
  });
});

/* ─── Scroll progress indicator (subtle top bar) ────────────── */
const scrollIndicator = document.createElement('div');
scrollIndicator.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #2563EB, #06B6D4);
  z-index: 10000;
  transition: width 0.1s linear;
  width: 0%;
`;
document.body.prepend(scrollIndicator);

window.addEventListener('scroll', throttle(() => {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const pct = total > 0 ? (scrolled / total) * 100 : 0;
  scrollIndicator.style.width = `${pct}%`;
}, 50), { passive: true });

/* ─── Console branding ───────────────────────────────────────── */
console.log(
  '%c NEXORA DIGITAL ',
  'background: linear-gradient(135deg, #2563EB, #06B6D4); color: white; font-weight: 900; font-size: 16px; padding: 8px 16px; border-radius: 4px;',
  '\n%cDriving Growth. Delivering Results.\nhttps://nexoradigital.com',
  'color: #94A3B8; font-size: 12px;'
);
