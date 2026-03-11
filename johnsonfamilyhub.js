/* --------------------------------------
   JOHNSON FAMILY HUB — johnsonfamilyhub.js
   Isla Claire Johnson · April 9, 2026
-------------------------------------- */

'use strict';

// -----------------------------------------------------------------------------
// CONFIG — update this URL if you redeploy your Google Apps Script
// -----------------------------------------------------------------------------
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx1C1Sz8qZDAUbxacGztks1-kqcRU1rBjNUSBgnR3U1uvczQTfvvmiboo0BWsFL-wQ/exec";
const SITE_LABEL = ""; // leave blank to auto-detect from location.origin + location.pathname

// -----------------------------------------------------------------------------
// PRIVACY PROTECTIONS
// -----------------------------------------------------------------------------
(function initPrivacy() {
  document.addEventListener('contextmenu', e => {
    if (e.target.closest('.protected') || e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });

  document.addEventListener('dragstart', e => {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });

  document.addEventListener('keydown', e => {
    const ctrl = e.ctrlKey || e.metaKey;
    const key  = e.key.toLowerCase();
    if (ctrl && (key === 's' || key === 'u' || key === 'p')) {
      e.preventDefault();
    }
if (e.key === 'PrintScreen') {
      e.preventDefault();
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard.writeText('').catch(function() {});
      }
    }
  });

  document.addEventListener('touchstart', e => {
    if (e.target.closest('.protected') && e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  }, { passive: false });
})();

// -----------------------------------------------------------------------------
// COUNTDOWN TIMER
// -----------------------------------------------------------------------------
(function initCountdown() {
  const target      = new Date('2026-04-09T00:00:00-04:00');
  const bar         = document.getElementById('CountdownBar');
  const dEl         = document.getElementById('cd-days');
  const hEl         = document.getElementById('cd-hours');
  const mEl         = document.getElementById('cd-mins');
  const sEl         = document.getElementById('cd-secs');
  
  const heroDaysEl  = document.getElementById('hero-days-left');
  const heroWeeksEl = document.getElementById('hero-weeks-along');

  if (!dEl || !hEl || !mEl || !sEl) return;

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function tick() {
    const diff = target - Date.now();

    if (diff <= 0) {
      [dEl, hEl, mEl, sEl].forEach(el => { if (el) el.textContent = '00'; });
      if (heroDaysEl) heroDaysEl.textContent = '0';
      if (heroWeeksEl) heroWeeksEl.textContent = '40'; 
      if (bar) bar.setAttribute('aria-label', "Isla Claire has arrived!");
      return;
    }

    const totalSec = Math.floor(diff / 1000);
    const d = Math.floor(totalSec / 86400);
    const h = Math.floor((totalSec % 86400) / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const weeksAlong = Math.floor((280 - d) / 7);

    dEl.textContent = String(d);
    hEl.textContent = pad(h);
    mEl.textContent = pad(m);
    sEl.textContent = pad(s);

    if (heroDaysEl) heroDaysEl.textContent = String(d);
    if (heroWeeksEl) heroWeeksEl.textContent = String(weeksAlong);

    if (bar) {
      bar.setAttribute('aria-label',
        `${d} days, ${h} hours, ${m} minutes, ${s} seconds until Isla arrives`
      );
    }
  }

  tick();
  setInterval(tick, 1000);
})();

// -----------------------------------------------------------------------------
// NAVBAR
// -----------------------------------------------------------------------------
(function initNavbar() {
  const navbar    = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.getElementById('primary-nav');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
    });

    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();

// -----------------------------------------------------------------------------
// FLOATING CONFETTI
// -----------------------------------------------------------------------------
(function initConfetti() {
  const colors = ['#E8A598','#C9876A','#D4A96A','#B5C4B1','#F5DDD6','#EDE0D0'];
  const hero   = document.getElementById('Home');
  if (!hero) return;

  for (let i = 0; i < 18; i++) {
    const dot  = document.createElement('div');
    dot.className = 'confetti';
    const size = Math.random() * 8 + 4;
    Object.assign(dot.style, {
      width:             size + 'px',
      height:            size + 'px',
      left:              Math.random() * 100 + '%',
      bottom:            '-20px',
      background:        colors[Math.floor(Math.random() * colors.length)],
      animationDuration: (Math.random() * 12 + 8) + 's',
      animationDelay:    (Math.random() * 10) + 's',
      borderRadius:      Math.random() > 0.5 ? '50%' : '3px',
      transform:         `rotate(${Math.random() * 360}deg)`
    });
    hero.appendChild(dot);
  }
})();

// -----------------------------------------------------------------------------
// FADE-IN ON SCROLL
// -----------------------------------------------------------------------------
(function initFadeIn() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -28px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => io.observe(el));
})();

// -----------------------------------------------------------------------------
// CONTACT FORM
// -----------------------------------------------------------------------------
(function initContactForm() {
  const form            = document.getElementById('contactForm');
  const submitButton    = document.getElementById('submitButton');
  const userMessage     = document.getElementById('userMessage');
  const numPeopleInput  = document.getElementById('numPeople');
  const peopleContainer = document.getElementById('peopleContainer');
  const formStartedAt   = document.getElementById('formStartedAt');
  const hpInput         = document.getElementById('cf_guard');

  if (!form) return;

  if (hpInput) {
    const rnd = 'hp_' + Math.random().toString(36).slice(2);
    hpInput.setAttribute('name', rnd);
    hpInput.value = '';
    hpInput.addEventListener('focus', e => { e.target.value = ''; });
  }

  if (formStartedAt) {
    const armTimer = () => {
      if (!formStartedAt.value) formStartedAt.value = Date.now().toString();
    };
    form.addEventListener('input',   armTimer, { once: true });
    form.addEventListener('focusin', armTimer, { once: true });
  }

  const showMessage = (msg, type = 'success') => {
    if (!userMessage) return;
    userMessage.textContent = msg;
    userMessage.className   = 'cf-alert ' + type;
    userMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const clearMessage = () => {
    if (!userMessage) return;
    userMessage.textContent = '';
    userMessage.className   = 'cf-alert';
  };

  const createPersonEntry = (index) => {
    const wrap = document.createElement('fieldset');
    wrap.className = 'person-entry cf-fieldset';
    wrap.id        = `person-${index}`;
    wrap.innerHTML = `
      <legend>Person ${index}</legend>
      <div class="cf-grid">
        <div class="cf-field" style="grid-column:1/-1">
          <label for="fullName-${index}" class="cf-label">Full Name</label>
          <input type="text" id="fullName-${index}" name="fullName-${index}"
                 required autocomplete="name" class="cf-input"/>
        </div>
        <div class="cf-field">
          <label for="email-${index}" class="cf-label">Email Address</label>
          <input type="email" id="email-${index}" name="email-${index}"
                 required autocomplete="email" class="cf-input"/>
        </div>
        <div class="cf-field">
          <label for="phone-${index}" class="cf-label">Phone Number</label>
          <input type="tel" id="phone-${index}" name="phone-${index}"
                 required inputmode="tel" autocomplete="tel"
                 pattern="^[0-9()\\-\\.\\s+]{7,}$" class="cf-input"/>
          <small class="cf-hint">Digits only or formats like (555) 555-5555</small>
        </div>
      </div>
    `;
    return wrap;
  };

  const updatePeopleEntries = () => {
    if (!numPeopleInput || !peopleContainer) return;
    const count = Math.max(1, Math.min(10, parseInt(numPeopleInput.value || '1', 10)));
    peopleContainer.innerHTML = '';
    for (let i = 1; i <= count; i++) {
      peopleContainer.appendChild(createPersonEntry(i));
    }
  };

  const validateForm = () => {
    if (!form) return false;

    const started    = parseInt(formStartedAt?.value || '0', 10);
    const elapsed    = started ? (Date.now() - started) : 0;
    const isLocal    = ['localhost', '127.0.0.1', ''].includes(location.hostname);
    const hp         = (hpInput?.value || '').trim();

    const hpLooksBot = hp.length > 0 && !isLocal && elapsed > 0 && elapsed < 1500;
    if (hpLooksBot) {
      showMessage("Spam detected. Please refresh and try again.", 'error');
      return false;
    }
    if (hp.length > 0 && hpInput) hpInput.value = '';

    if (!isLocal && elapsed > 0 && elapsed < 600) {
      showMessage("Please take a moment to fill out the form before submitting.", 'error');
      return false;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return false;
    }
    return true;
  };

  if (numPeopleInput) {
    numPeopleInput.addEventListener('change', updatePeopleEntries);
    numPeopleInput.addEventListener('input',  updatePeopleEntries);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessage();
    if (!validateForm()) return;

    const fd        = new FormData(form);
    const count     = Math.max(1, Math.min(10, parseInt(fd.get('numPeople') || '1', 10)));
    const siteLabel = (SITE_LABEL && SITE_LABEL.trim())
      ? SITE_LABEL.trim()
      : (location.origin + location.pathname);

    const address = {
      address1: (fd.get('streetAddress') || '').toString().trim(),
      address2: (fd.get('address2')      || '').toString().trim(),
      city:     (fd.get('city')          || '').toString().trim(),
      state:    (fd.get('state')         || '').toString().trim(),
      zip:      (fd.get('zipCode')       || '').toString().trim()
    };

    const people = [];
    for (let i = 1; i <= count; i++) {
      people.push({
        fullName: (fd.get(`fullName-${i}`) || '').toString().trim(),
        email:    (fd.get(`email-${i}`)    || '').toString().trim(),
        phone:    (fd.get(`phone-${i}`)    || '').toString().trim()
      });
    }

    const payload = { householdSize: count, address, people, site: siteLabel };

    const origLabel = submitButton ? submitButton.textContent : '';
    if (submitButton) {
      submitButton.disabled    = true;
      submitButton.textContent = "Submitting… ??";
    }

    try {
      const res  = await fetch(SCRIPT_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body:    JSON.stringify(payload)
      });
      const text = await res.text();
      let   ok   = res.ok;

      try {
        const parsed = JSON.parse(text);
        if (parsed?.ok === true) {
          ok = true;
          const pc = Array.isArray(parsed.people) ? parsed.people.length : people.length;
          showMessage(
            `?? All set! We've saved your info (${pc} ${pc === 1 ? 'person' : 'people'}). ` +
            `Thank you for being part of our village!`,
            'success'
          );
        }
      } catch { /* non-JSON response */ }

      if (!ok) throw new Error(text || `Submission failed (HTTP ${res.status})`);

      if (ok) {
        form.reset();
        updatePeopleEntries();
        if (formStartedAt) formStartedAt.value = '';
      }
    } catch (err) {
      console.error('[ContactForm]', err);
      showMessage(
        `Something went wrong: ${err.message}. Please try again or reach out directly.`,
        'error'
      );
    } finally {
      if (submitButton) {
        submitButton.disabled    = false;
        submitButton.textContent = origLabel;
      }
    }
  });

  updatePeopleEntries();
})();