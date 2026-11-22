'use strict';

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
    role: '', 
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
    tech: [], 
    device: 'browser',
    image: 'assets/images/carltonAdminLogin.png',         
    imageAlt: 'Screenshot of the Carlton Residence admin login page',
    extraImages: [                                       
      { src: 'assets/images/carltonActivityLogs.png', alt: 'Screenshot of the admin activity logs page' }
    ],
    github: '',
    demo: ''
  },
  {
    title: 'AMS Milestone',
    meta: 'Informational Website',
    description:
      'An informational website presenting the history and projects of AMS Environmental Management Corp. and Milestone EIMC.',
    highlights: [
      'Multimedia carousel and custom image/video gallery',
      'Expandable accordions for organized content',
      'Responsive layouts built with CSS Grid'
    ],
    role: 'Front-end developer: responsible for the front-end development of the entire website.',
    tech: ['JavaScript', 'CSS Grid', 'Responsive Design'],
    device: 'browser',
    image: 'assets/images/amsmilestone.png',                       
    imageAlt: 'Screenshot of the AMS Milestone website',
    extraImages: [                                         

    ],
    github: '',
    demo: 'https://amsmilestone.com/'
  },
  {
    title: 'O&M360 Website',
    meta: 'Informational Website',
    description:
      'An informational website introducing the O&M360 app by AMS Milestone, including a pricing page that showcases the Trial, Plus, and Professional tiers.',
    highlights: [
      'Home page introducing the O&M360 app',
      'Pricing page with Trial, Plus, and Professional tiers',
      'Responsive on desktop, tablet, and mobile'
    ],
    role: 'Front-end developer: responsible for the front-end development of the O&M360 website.',
    tech: ['Next.js', 'Responsive Design'],
    device: 'browser',
    image: 'assets/images/onm360home.png',
    imageAlt: 'Screenshot of the O&M360 website home page',
    extraImages: [
      { src: 'assets/images/onm360prices.png', alt: 'Screenshot of the O&M360 pricing page showing the Trial, Plus, and Professional tiers' }
    ],
    github: '',
    demo: 'https://om360app.com/'
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

const CONFIG = {
  showLinkPlaceholders: true
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function createElement(tag, { className = '', text = '', attrs = {} } = {}, children = []) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  Object.entries(attrs).forEach(([name, value]) => node.setAttribute(name, value));
  children.forEach((child) => node.append(child));
  return node;
}

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

function createProjectVisual(project) {
  const device = project.device === 'phone' ? 'phone' : 'browser';
  const visual = createElement('div', { className: `project-card__visual project-card__visual--${device}` });
  const frame = createElement('div', { className: `device device--${device}` });

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
    img.addEventListener('error', showPlaceholder);
    screen.append(img);
  }

  frame.append(screen);
  visual.append(frame);
  return visual;
}

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

function createProjectCard(project) {
  const card = createElement('article', { className: 'project-card', attrs: { 'data-reveal': '' } });
  const content = createElement('div', { className: 'project-card__content' });

  content.append(
    createElement('p', { className: 'project-card__meta', text: project.meta }),
    createElement('h3', { className: 'project-card__title', text: project.title }),
    createElement('p', { className: 'project-card__desc', text: project.description })
  );

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

let activeOverlay = null;   
let lastTrigger = null;     

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

function openProject(project, trigger) {
  if (activeOverlay) return;

  const card = createProjectCard(project);
  card.removeAttribute('data-reveal');           
  card.classList.add('project-card--expanded');
  card.setAttribute('tabindex', '-1');

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

function createPlaceholderTile() {
  return createElement('article', { className: 'project-tile project-tile--empty', attrs: { 'data-reveal': '' } }, [
    createIcon('sparkle'),
    createElement('p', { className: 'project-tile__empty-title', text: 'More projects coming soon' }),
    createElement('p', { className: 'project-tile__empty-text', text: 'New work will be added here.' })
  ]);
}

function createCarousel(tiles) {
  const wrapper = createElement('div', {
    className: 'carousel',
    attrs: { 'data-reveal': '', role: 'region', 'aria-roledescription': 'carousel', 'aria-label': 'Featured projects' }
  });
  const stage = createElement('div', { className: 'carousel__stage' });
  const track = createElement('div', { className: 'carousel__track' }, tiles);

  const makeButton = (direction, label) =>
    createElement(
      'button',
      { className: `carousel__btn carousel__btn--${direction}`, attrs: { type: 'button', 'aria-label': label } },
      [createIcon('arrow')]
    );
  const prev = makeButton('prev', 'Previous project');
  const next = makeButton('next', 'Next project');

  const dots = createElement(
    'div',
    { className: 'carousel__dots' },
    tiles.map((tile, i) =>
      createElement('button', {
        className: 'carousel__dot',
        attrs: { type: 'button', 'aria-label': `Show ${PROJECTS[i] ? PROJECTS[i].title : `project ${i + 1}`}` }
      })
    )
  );
  const dotButtons = [...dots.children];

  let current = 0;

  const setActive = (index) => {
    current = index;
    tiles.forEach((tile, i) => tile.classList.toggle('is-active', i === index));
    dotButtons.forEach((dot, i) => dot.setAttribute('aria-current', String(i === index)));
  };

  const goTo = (index, instant = false) => {
    const target = tiles[Math.max(0, Math.min(tiles.length - 1, index))];
    const left = target.offsetLeft - (track.clientWidth - target.offsetWidth) / 2;
    track.scrollTo({ left, behavior: instant || prefersReducedMotion ? 'auto' : 'smooth' });
  };

  let frame = null;
  const update = () => {
    frame = null;
    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let smallest = Infinity;
    tiles.forEach((tile, i) => {
      const distance = Math.abs(tile.offsetLeft + tile.offsetWidth / 2 - center);
      if (distance < smallest) { smallest = distance; closest = i; }
    });
    setActive(closest);
  };
  track.addEventListener('scroll', () => { if (frame === null) frame = requestAnimationFrame(update); }, { passive: true });

  track.addEventListener('click', (event) => {
    const tile = event.target.closest('.project-tile');
    if (!tile || tile.classList.contains('is-active')) return;
    event.stopPropagation();
    goTo(tiles.indexOf(tile));
  }, true);
  track.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const tile = event.target.closest('.project-tile');
    if (!tile || tile.classList.contains('is-active')) return;
    event.stopPropagation();
    event.preventDefault();
    goTo(tiles.indexOf(tile));
  }, true);

  const step = (delta) => goTo((current + delta + tiles.length) % tiles.length);

  prev.addEventListener('click', () => step(-1));
  next.addEventListener('click', () => step(1));
  dotButtons.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  wrapper.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1); }
    else if (event.key === 'ArrowRight') { event.preventDefault(); step(1); }
  });

  window.addEventListener('resize', () => goTo(current, true));

  stage.append(track, prev, next);
  wrapper.append(stage, dots);
  setActive(0);
  return wrapper;
}

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const tiles = PROJECTS.map(createProjectTile);
  if (tiles.length === 0) return;

  tiles.forEach((tile) => tile.removeAttribute('data-reveal'));

  grid.replaceChildren(createCarousel(tiles));
}

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
      toggle.focus(); 
    }
  });

  window.matchMedia('(min-width: 901px)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
}

function initHeaderScrollState() {
  const header = document.getElementById('site-header');
  if (!header) return;
  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

function initComingSoon() {
  const section = document.getElementById('internship');
  const overlay = section && section.querySelector('.coming-soon');
  if (!overlay) return;

  if (!('IntersectionObserver' in window)) {
    overlay.classList.add('is-active');
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => overlay.classList.toggle('is-active', entry.isIntersecting),
    { rootMargin: '-25% 0px -25% 0px' }
  );
  observer.observe(section);
}

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
      tab.tabIndex = isSelected ? 0 : -1; 
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

  select(tabs.find((tab) => tab.classList.contains('is-active')) || tabs[0]);
}

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

function initScrollReveal() {
  const targets = document.querySelectorAll('[data-reveal]');

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

function getFieldError(field) {
  const messages = FORM_ERRORS[field.name];
  if (!messages) return '';
  const value = field.value.trim();

  if (!value) return messages.missing;
  if (field.type === 'email' && !field.validity.valid) return messages.invalid;
  if (field.name === 'message' && value.length < 10) return messages.short;
  return '';
}

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

  fields.forEach((field) => {
    field.addEventListener('blur', () => setFieldError(field, getFieldError(field)));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') setFieldError(field, getFieldError(field));
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    setStatus('');

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

    if (form.action.includes('YOUR_FORM_ID')) {
      setStatus('The contact form is not connected yet. Please email me directly instead.', 'error');
      return;
    }

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

function setFooterYear() {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
}

function init() {
  renderProjects();      
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