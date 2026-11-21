/* ==========================================================================
   main.js: Anne Kelsey Bonifacio's portfolio
   Sections:
     1. Project data  (edit this to add, remove, or change projects)
     2. Settings
     3. Small helper functions
     4. Project card rendering
     5. Navigation (mobile menu, scrolled state, active link)
     6. Scroll-reveal animations
     7. Contact form (validation + Formspree)
     8. Footer year
     9. Start everything
   ========================================================================== */
'use strict';

/* ==========================================================================
   1. PROJECT DATA
   To add a project: copy one { ... } block, paste it inside the array
   (don't forget the comma between blocks), and edit the values.
   To remove one: delete its { ... } block.

   Fields:
     title        Project name
     type         Small label above the title (e.g. "Thesis · 2025 – Oct 2026")
     description  Short summary (1-2 sentences)
     role         What YOU did
     tech         List of technologies, shown as small tags
     image        Path to a screenshot, e.g. 'assets/images/my-project.jpg'
                  Leave '' to show a clean placeholder.
     imageAlt     Describe the screenshot for screen readers
                  (if left '', "Preview of <title>" is used)
     github       Full URL to the GitHub repo, or ''
     demo         Full URL to the live demo, or ''
   ========================================================================== */
/* ==========================================================================
   1. PROJECT DATA
   To add a project: copy one { ... } block, paste it inside the array
   (don't forget the comma between blocks), and edit the values.
   To remove one: delete its { ... } block.

   Fields:
     title        Project name
     meta         Small label above the title (e.g. "AMS Environmental · 2026")
     description  Short summary (1-2 sentences)
     highlights   Up to 3 short results shown as a checklist. Use [] to hide it.
     role         What YOU did
     tech         List of technologies, shown as small tags
     device       'browser' (default) or 'phone': the style of the mockup frame
     image        Path to a screenshot, e.g. 'assets/images/my-project.jpg'
                  Leave '' to show a clean placeholder.
     imageAlt     Describe the screenshot for screen readers
                  (if left '', "Preview of <title>" is used)
     github       Full URL to the GitHub repo, or ''
     demo         Full URL to the live demo, or ''
   ========================================================================== */
const PROJECTS = [
  {
    title: 'Parkly',
    meta: 'Mobile Application',
    description:
      'A smart parking management mobile application designed to simplify campus parking.',
    highlights: [
      'User Module',
      'Guard/Admin Module',
      'QR Code & Vehicle Registration Module'
    ],
    role: '', // add your role here later, e.g. 'Front-end developer: built the app screens'. Leave '' to hide the line.
    tech: ['Supabase API', 'Supabase PostgREST API', 'Supabase Storage API'],
    device: 'phone',
    image: 'assets/images/Parkly.png',
    imageAlt: 'Screenshot of the Parkly mobile app',
    github: '',
    demo: ''
  },
  {
    title: 'Thesis',
    meta: 'Thesis · Web Dashboard',
    description:
      'Climate dashboard for the thesis “A Neural Network-Factored Pattern Scaling Model on Local Warming Index for Agricultural Crop Production Rate Prediction in CALABARZON.”',
    highlights: [
      'Interactive GIS map of CALABARZON',
      'AI-powered climate insights (Gemini API)',
      'LST, SST, precipitation & humidity charts'
    ],
    role: 'Built the dashboard’s map visualization, data filtering, climate charts, and Gemini-powered insights.',
    tech: ['React + Vite', 'Leaflet / React-Leaflet', 'Recharts', 'Google Gemini API', 'NASA Earthdata'],
    device: 'browser',
    image: 'assets/images/ThesisDashboard.png',
    imageAlt: 'Screenshot of the thesis climate dashboard',
    github: '',
    demo: ''
  },
  {
    title: 'Software Engineering',
    meta: 'Academic Project · Web Application',
    description:
      'A Web-Based Financial Management System for Residential Dues Monitoring and Statement Generation with Map Visualization for Carlton Residence Homeowners Association Incorporated.',
    highlights: [
      'Admin and Resident login pages',
      'Role-based access control (RBAC)',
      'Activity logs for admin actions'
    ],
    role: 'Built the Admin and Resident login pages, the RBAC system where only the SuperAdmin can create and assign tasks to other admins, and the activity logs that record each admin’s actions.',
    tech: [], // add the technologies you used, e.g. ['React', 'Supabase']. Leave [] to show none.
    device: 'browser',
    image: 'assets/images/carltonAdminLogin.png',            // shown on the collapsed tile
    imageAlt: 'Screenshot of the Carlton Residence admin login page',
    extraImages: [                                           // only shown when the card is expanded
      { src: 'assets/images/carltonActivityLogs.png', alt: 'Screenshot of the admin activity logs page' }
    ],
    github: '',
    demo: ''
  },
  {
    title: 'Lucky Outlaws',
    meta: 'Mobile Game · UI/UX Design',
    description:
      'A virtual mobile slot machine game where players spin reels, match symbols, and earn virtual points. Developed using Xamarin and Visual Studio, the application features a mobile-friendly interface and an interactive gameplay experience. It combines simple game mechanics, virtual point management, and fast-paced gameplay to create an engaging slot machine experience.',
    highlights: [
      'UI/UX designed in Figma',
      'Built for Android with Xamarin'
    ],
    role: 'Designed the UI/UX in Figma and created all of the game’s assets.',
    tech: ['Figma', 'Xamarin', 'Android Studio'],
    device: 'phone',
    image: 'assets/images/uiux.png',                        // shown on the collapsed tile
    imageAlt: 'Lucky Outlaws slot machine game interface',
    extraImages: [                                           // only shown when the card is expanded
      { src: 'assets/images/uiux2.png', alt: 'Lucky Outlaws slot machine game, second screen' }
    ],
    github: '',
    demo: ''
  }
];

/* ==========================================================================
   2. SETTINGS
   ========================================================================== */
const CONFIG = {
  // true  = cards show greyed-out "GitHub" / "Live demo" placeholders when a link is empty
  // false = empty links are simply hidden (use this once your site is final)
  showLinkPlaceholders: true
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ==========================================================================
   3. SMALL HELPER FUNCTIONS
   ========================================================================== */

/** Create an HTML element: createElement('p', { className: 'x', text: 'Hi', attrs: { id: 'y' } }) */
function createElement(tag, { className = '', text = '', attrs = {} } = {}, children = []) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  Object.entries(attrs).forEach(([name, value]) => node.setAttribute(name, value));
  children.forEach((child) => node.append(child));
  return node;
}

/** Create an SVG icon that references a symbol in the sprite at the top of index.html */
function createIcon(name) {
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  const use = document.createElementNS(NS, 'use');
  use.setAttribute('href', `#icon-${name}`);
  svg.append(use);
  return svg;
}

/* ==========================================================================
   4. PROJECT CARD RENDERING
   ========================================================================== */

/** Build the device mockup (browser window or phone) with the screenshot or a placeholder */
function createProjectVisual(project) {
  const device = project.device === 'phone' ? 'phone' : 'browser';
  const visual = createElement('div', { className: `project-card__visual project-card__visual--${device}` });
  const frame = createElement('div', { className: `device device--${device}` });

  // Browser windows get a top bar with three dots
  if (device === 'browser') {
    frame.append(
      createElement('div', { className: 'device__bar', attrs: { 'aria-hidden': 'true' } }, [
        createElement('span', { className: 'device__dot' }),
        createElement('span', { className: 'device__dot' }),
        createElement('span', { className: 'device__dot' })
      ])
    );
  }

  const screen = createElement('div', { className: 'device__screen' });
  const showPlaceholder = () => {
    screen.replaceChildren(createElement('p', { className: 'device__placeholder', text: 'Project screenshot coming soon' }));
  };

  if (!project.image) {
    showPlaceholder();
  } else {
    const img = createElement('img', {
      attrs: {
        src: project.image,
        alt: project.imageAlt || `Preview of ${project.title}`,
        loading: 'lazy',
        width: device === 'phone' ? '300' : '640',
        height: device === 'phone' ? '630' : '400'
      }
    });
    // If the image file is missing or misspelled, fall back to the placeholder instead of a broken image
    img.addEventListener('error', showPlaceholder);
    screen.append(img);
  }

  frame.append(screen);
  visual.append(frame);
  return visual;
}

/** Build one button (Live demo or GitHub). Returns null when hidden. */
function createProjectLink({ label, url, variant, icon }) {
  if (url) {
    return createElement(
      'a',
      {
        className: `project-card__link project-card__link--${variant}`,
        attrs: { href: url, target: '_blank', rel: 'noopener noreferrer' }
      },
      [
        document.createTextNode(label),
        createIcon(icon),
        createElement('span', { className: 'visually-hidden', text: ' (opens in a new tab)' })
      ]
    );
  }
  if (!CONFIG.showLinkPlaceholders) return null;

  return createElement(
    'span',
    { className: 'project-card__link project-card__link--disabled', attrs: { 'aria-disabled': 'true' } },
    [document.createTextNode(`${label} (coming soon)`)]
  );
}

/** Build a complete project card */
function createProjectCard(project) {
  const card = createElement('article', { className: 'project-card', attrs: { 'data-reveal': '' } });
  const content = createElement('div', { className: 'project-card__content' });

  content.append(
    createElement('p', { className: 'project-card__meta', text: project.meta }),
    createElement('h3', { className: 'project-card__title', text: project.title }),
    createElement('p', { className: 'project-card__desc', text: project.description })
  );

  // Checklist of results (hidden when the array is empty)
  if (project.highlights && project.highlights.length > 0) {
    content.append(
      createElement(
        'ul',
        { className: 'project-card__highlights' },
        project.highlights.map((text) =>
          createElement('li', {}, [createIcon('check'), createElement('span', { text })])
        )
      )
    );
  }

  // Role line (hidden when the role is left empty)
  if (project.role) {
    content.append(
      createElement('p', { className: 'project-card__role' }, [
        createElement('strong', { text: 'My role: ' }),
        document.createTextNode(project.role)
      ])
    );
  }

  content.append(
    createElement(
      'ul',
      { className: 'chip-list', attrs: { 'aria-label': 'Technologies used' } },
      project.tech.map((tech) => createElement('li', { className: 'chip chip--small', text: tech }))
    )
  );

  // Buttons
  const actions = createElement('div', { className: 'project-card__actions' });
  [
    createProjectLink({ label: 'Live demo', url: project.demo, variant: 'primary', icon: 'arrow' }),
    createProjectLink({ label: 'GitHub', url: project.github, variant: 'secondary', icon: 'github' })
  ]
    .filter(Boolean)
    .forEach((link) => actions.append(link));
  if (actions.children.length > 0) content.append(actions);

  card.append(content, createProjectVisual(project));
  return card;
}

/* ----- Collapsed tile (interface + name only) and the expanded overlay ----- */

let activeOverlay = null;   // the overlay currently open (or null)
let lastTrigger = null;     // the tile that opened it, so focus can return there

/** Small tile shown in the grid: just the interface and the project name */
function createProjectTile(project) {
  const tile = createElement('article', {
    className: 'project-tile',
    attrs: {
      'data-reveal': '',
      role: 'button',
      tabindex: '0',
      'aria-haspopup': 'dialog',
      'aria-label': `${project.title}: view details`
    }
  });

  const footer = createElement('div', { className: 'project-tile__footer' }, [
    createElement('h3', { className: 'project-tile__title', text: project.title }),
    createElement('span', { className: 'project-tile__hint' }, [
      document.createTextNode('View details'),
      createIcon('arrow')
    ])
  ]);

  tile.append(createProjectVisual(project), footer);

  tile.addEventListener('click', () => openProject(project, tile));
  tile.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProject(project, tile);
    }
  });
  return tile;
}

/** Open the full card in an overlay (it floats above the page, so nothing else moves) */
function openProject(project, trigger) {
  if (activeOverlay) return;

  const card = createProjectCard(project);
  card.removeAttribute('data-reveal');            // the scroll-reveal would keep it invisible
  card.classList.add('project-card--expanded');
  card.setAttribute('tabindex', '-1');

  // Extra screenshots (project.extraImages) appear only in the expanded view, stacked under the main one
  if (project.extraImages && project.extraImages.length > 0) {
    const visual = card.querySelector('.project-card__visual');
    project.extraImages.forEach((extra) => {
      const frame = createProjectVisual({ ...project, image: extra.src, imageAlt: extra.alt }).querySelector('.device');
      visual.append(frame);
    });
  }
  card.querySelector('.project-card__content').append(
    createElement('p', { className: 'project-card__close-hint', text: 'Click anywhere to close' })
  );

  const overlay = createElement(
    'div',
    { className: 'project-overlay', attrs: { role: 'dialog', 'aria-modal': 'true', 'aria-label': `${project.title} details` } },
    [card]
  );

  // A click on the card or the dark backdrop closes it (links inside still work)
  overlay.addEventListener('click', (event) => {
    if (event.target.closest('a')) return;
    closeProject();
  });

  document.body.append(overlay);
  document.body.classList.add('has-overlay');
  requestAnimationFrame(() => overlay.classList.add('is-open'));
  card.focus({ preventScroll: true });

  activeOverlay = overlay;
  lastTrigger = trigger;
  document.addEventListener('keydown', handleOverlayKey);
}

/** Close the overlay and return to the original tile */
function closeProject() {
  if (!activeOverlay) return;
  const overlay = activeOverlay;
  activeOverlay = null;

  overlay.classList.remove('is-open');
  document.body.classList.remove('has-overlay');
  document.removeEventListener('keydown', handleOverlayKey);

  let removed = false;
  const remove = () => { if (!removed) { removed = true; overlay.remove(); } };
  overlay.addEventListener('transitionend', remove, { once: true });
  setTimeout(remove, 350);   // fallback in case no transition runs

  if (lastTrigger) lastTrigger.focus({ preventScroll: true });
}

function handleOverlayKey(event) {
  if (event.key === 'Escape') closeProject();
}

/** Fill the projects grid from the PROJECTS array */
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  grid.replaceChildren(...PROJECTS.map(createProjectTile));
}

/* ==========================================================================
   5. NAVIGATION
   ========================================================================== */

/** Mobile menu: open/close with the hamburger, Escape key, outside click, or link click */
function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  const nav = toggle ? toggle.closest('.nav') : null;
  if (!toggle || !menu || !nav) return;

  const setOpen = (isOpen) => {
    menu.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));

  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });

  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target)) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus(); // return focus so keyboard users don't lose their place
    }
  });

  // If the window grows to desktop size, make sure the mobile state is reset
  window.matchMedia('(min-width: 901px)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
}

/** Add a darker background to the navbar after the page has been scrolled a little */
function initHeaderScrollState() {
  const header = document.getElementById('site-header');
  if (!header) return;
  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

/** Blur + "Coming soon" label: active only while the Internship section is on screen */
function initComingSoon() {
  const section = document.getElementById('internship');
  const overlay = section && section.querySelector('.coming-soon');
  if (!overlay) return;

  // Without IntersectionObserver support, just keep it on
  if (!('IntersectionObserver' in window)) {
    overlay.classList.add('is-active');
    return;
  }

  // Active once the section reaches the middle band of the screen; off again when it leaves,
  // so the label animates in again every time you come back
  const observer = new IntersectionObserver(
    ([entry]) => overlay.classList.toggle('is-active', entry.isIntersecting),
    { rootMargin: '-25% 0px -25% 0px' }
  );
  observer.observe(section);
}

/** Internship tabs: click, or use Left/Right/Home/End keys, to switch panels */
function initTabs() {
  const tablist = document.querySelector('.tabs[role="tablist"]');
  if (!tablist) return;

  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls')));

  const select = (selected, moveFocus = false) => {
    tabs.forEach((tab, i) => {
      const isSelected = tab === selected;
      tab.classList.toggle('is-active', isSelected);
      tab.setAttribute('aria-selected', String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1; // only the active tab is in the Tab-key order
      if (panels[i]) panels[i].hidden = !isSelected;
    });
    if (moveFocus) selected.focus();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (event) => {
      const last = tabs.length - 1;
      let next = null;
      if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1;
      else if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = last;
      if (next === null) return;
      event.preventDefault();
      select(tabs[next], true);
    });
  });

  // Make sure the starting state matches the active tab
  select(tabs.find((tab) => tab.classList.contains('is-active')) || tabs[0]);
}

/** Highlight the nav link of the section currently in view */
function initActiveNav() {
  const links = [...document.querySelectorAll('.nav__link')];
  const linkById = new Map(links.map((link) => [link.getAttribute('href').slice(1), link]));

  const setActive = (id) => {
    links.forEach((link) => {
      const isActive = linkById.get(id) === link;
      link.classList.toggle('is-active', isActive);
      if (isActive) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  setActive('home');
  if (!('IntersectionObserver' in window)) return;

  // Only a thin band in the middle of the screen counts as "in view"
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
}

/* ==========================================================================
   6. SCROLL-REVEAL ANIMATIONS
   Elements with data-reveal fade in once when they enter the screen.
   ========================================================================== */
function initScrollReveal() {
  const targets = document.querySelectorAll('[data-reveal]');

  // No animation for reduced-motion users or very old browsers: just show everything
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    targets.forEach((target) => target.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = Number(el.dataset.revealDelay) || 0;
        if (delay) {
          el.style.transitionDelay = `${delay}ms`;
          // Remove the delay afterwards so hover effects stay snappy
          setTimeout(() => { el.style.transitionDelay = ''; }, delay + 700);
        }
        el.classList.add('is-visible');
        obs.unobserve(el); // animate only once
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  targets.forEach((target) => observer.observe(target));
}

/* ==========================================================================
   7. CONTACT FORM (validation + Formspree)
   The form's endpoint lives in index.html (the form's action attribute).
   ========================================================================== */
const FORM_ERRORS = {
  name: { missing: 'Please enter your name.' },
  email: {
    missing: 'Please enter your email address.',
    invalid: 'Please enter a valid email address, like name@example.com.'
  },
  message: {
    missing: 'Please write a message.',
    short: 'Your message is a bit short. Please write at least 10 characters.'
  }
};

/** Returns an error message for a field, or '' if the field is valid */
function getFieldError(field) {
  const messages = FORM_ERRORS[field.name];
  if (!messages) return '';
  const value = field.value.trim();

  if (!value) return messages.missing;
  if (field.type === 'email' && !field.validity.valid) return messages.invalid;
  if (field.name === 'message' && value.length < 10) return messages.short;
  return '';
}

/** Show or clear a field's error message */
function setFieldError(field, message) {
  const output = document.getElementById(`${field.id}-error`);
  if (output) output.textContent = message;
  if (message) field.setAttribute('aria-invalid', 'true');
  else field.removeAttribute('aria-invalid');
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const submitButton = document.getElementById('form-submit');
  if (!form || !status || !submitButton) return;

  const fields = [...form.querySelectorAll('input[name="name"], input[name="email"], textarea[name="message"]')];

  const setStatus = (message, type = '') => {
    status.textContent = message;
    status.className = `form__status${type ? ` is-${type}` : ''}`;
  };

  // Validate when leaving a field; clear its error as soon as the person starts fixing it
  fields.forEach((field) => {
    field.addEventListener('blur', () => setFieldError(field, getFieldError(field)));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') setFieldError(field, getFieldError(field));
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    setStatus('');

    // 1) Validate every field and focus the first problem
    let firstInvalid = null;
    fields.forEach((field) => {
      const error = getFieldError(field);
      setFieldError(field, error);
      if (error && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    // 2) Friendly reminder if the Formspree URL has not been replaced yet
    if (form.action.includes('YOUR_FORM_ID')) {
      setStatus('The contact form is not connected yet. Please email me directly instead.', 'error');
      return;
    }

    // 3) Send to Formspree
    const originalLabel = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        form.reset();
        fields.forEach((field) => setFieldError(field, ''));
        setStatus('Thank you! Your message has been sent. I will get back to you soon.', 'success');
      } else {
        const data = await response.json().catch(() => null);
        const detail = data && data.errors ? data.errors.map((e) => e.message).join(', ') : '';
        setStatus(detail || 'Sorry, something went wrong. Please try again or email me directly.', 'error');
      }
    } catch (error) {
      setStatus('Network error. Please check your connection and try again, or email me directly.', 'error');
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalLabel;
    }
  });
}

/* ==========================================================================
   8. FOOTER YEAR
   ========================================================================== */
function setFooterYear() {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
}

/* ==========================================================================
   9. START EVERYTHING
   (this script is loaded with "defer", so the page is ready when it runs)
   ========================================================================== */
function init() {
  renderProjects();      // must run before the reveal observer so the cards get animated too
  initMobileMenu();
  initHeaderScrollState();
  initActiveNav();
  initScrollReveal();
  initTabs();
  initComingSoon();
  initContactForm();
  setFooterYear();
}

init();