/* ============================================================
   Naim's Portfolio — script.js
   Covers: nav + theme toggle, scroll progress, scroll-reveal,
   typing effects, animated skill bars, and the contact form
   (DOM manipulation + event handling as required by the brief)
============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  initNavToggle();
  initThemeToggle();
  initScrollProgress();
  initActiveNavLink();
  initScrollReveal();
  initRotatingRole();
  initTerminalTyping();
  initBackToTop();
  initContactForm();
});

/* ---------------- Mobile nav toggle ---------------- */
function initNavToggle() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------------- Light / dark theme toggle ---------------- */
function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const root = document.documentElement;
  if (!btn) return;

  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', current);
    icon.textContent = current === 'light' ? '☀️' : '🌙';
  });
}

/* ---------------- Scroll progress bar ---------------- */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ---------------- Highlight active nav link on scroll ---------------- */
function initActiveNavLink() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active-link'));
        const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active-link');
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

  sections.forEach(section => observer.observe(section));
}

/* ---------------- Scroll-reveal + animated skill bars ---------------- */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  const bars = document.querySelectorAll('.bar-fill');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));

  const barObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const level = el.getAttribute('data-level') || '0';
        el.style.width = level + '%';
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  bars.forEach(bar => barObserver.observe(bar));
}

/* ---------------- Rotating role text in the hero heading ---------------- */
function initRotatingRole() {
  const el = document.getElementById('rotatingRole');
  if (!el) return;

  const roles = [
    'Machine Learning',
    'Generative AI',
    'Agentic AI',
    'Web Interfaces',
    'Data Pipelines'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? 40 : 70);
  }

  tick();
}

/* ---------------- Terminal panel typing effect ---------------- */
function initTerminalTyping() {
  const codeEl = document.getElementById('terminalCode');
  if (!codeEl) return;

  const lines = [
    '{',
    '  "name": "Naim",',
    '  "role": "Software Engineer & ML Enthusiast",',
    '  "university": "Daffodil International University",',
    '  "location": "Dhaka, Bangladesh",',
    '  "focus": ["Generative AI", "Agentic AI", "ML"],',
    '  "currently_building": "SkillForge — AI-powered LMS",',
    '  "team": "Team_Space_Noob",',
    '  "open_to_opportunities": true',
    '}'
  ];

  const fullText = lines.join('\n');
  let i = 0;

  function typeChar() {
    if (i <= fullText.length) {
      codeEl.textContent = fullText.slice(0, i);
      i++;
      setTimeout(typeChar, 14);
    }
  }

  typeChar();
}

/* ---------------- Back to top button ---------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------------- Contact form: submit event + DOM feedback ----------------
   Uses FormSubmit's AJAX endpoint so the page never navigates away.
   Requirement 6 & 7: DOM manipulation driven by the form submit event.
================================================================= */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');
  const submitLabel = document.getElementById('submitLabel');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // basic client-side validation before sending
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      showStatus('Please fill in every field before sending.', 'error');
      return;
    }

    const formData = new FormData(form);
    const actionUrl = form.getAttribute('action').replace('https://formsubmit.co/', 'https://formsubmit.co/ajax/');

    submitBtn.disabled = true;
    submitLabel.textContent = 'Sending...';
    showStatus('', '');

    try {
      const response = await fetch(actionUrl, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        showStatus('Your message has been sent successfully! I\u2019ll get back to you soon.', 'success');
        form.reset();
      } else {
        throw new Error('Request failed');
      }
    } catch (err) {
      showStatus('Something went wrong — please email me directly instead.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitLabel.textContent = 'Send Message';
    }
  });

  function showStatus(text, type) {
    statusEl.textContent = text;
    statusEl.classList.remove('success', 'error');
    if (type) statusEl.classList.add(type);
  }
}
