/* ============================================
   LimahCode — Shared JavaScript
   nav.js — handles nav highlighting, mobile menu,
   form submissions, modal, scroll reveal, and theme.
   ============================================ */

/* ── GLOBAL CONFIGURATION ──
   Update your social links and contact info here ONCE.
   This will automatically update the links across all HTML pages. */
const LC_GLOBALS = {
  instagram: { url: 'https://instagram.com/limahcode', label: '@limahcode' },
  linkedin:  { url: 'https://www.linkedin.com/in/alimat-abimbola/', label: 'LimahCode' },
  twitter:   { url: 'https://twitter.com/limahcode', label: '@limahcode' },
  whatsapp:  { url: 'https://wa.me/2348025034999', label: '+234 800 000 0000' },
  email:     { url: 'mailto:limahcode192025@gmail.com', label: 'hello@limahcode.com' }
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Update simple anchor tags across the site
  document.querySelectorAll('a').forEach(a => {
    const text = a.textContent.toLowerCase().trim();
    const href = a.getAttribute('href') || '';
    
    if (text.includes('instagram')) a.href = LC_GLOBALS.instagram.url;
    if (text.includes('linkedin'))  a.href = LC_GLOBALS.linkedin.url;
    if (text.includes('twitter'))   a.href = LC_GLOBALS.twitter.url;
    if (text.includes('whatsapp'))  a.href = LC_GLOBALS.whatsapp.url;
    if (href.includes('mailto:') || text.includes('hello@')) a.href = LC_GLOBALS.email.url;

    // Only update text content if it's a plain text link (no HTML children like icons)
    if (a.children.length === 0) {
      if (text.startsWith('instagram:')) a.textContent = 'Instagram: ' + LC_GLOBALS.instagram.label;
      if (text.startsWith('twitter:'))   a.textContent = 'Twitter: ' + LC_GLOBALS.twitter.label;
      if (text.includes('@') && !text.includes('instagram') && !text.includes('twitter')) {
        a.textContent = LC_GLOBALS.email.label;
      }
    }
  });

  // 2. Update the contact page specific value elements (.cm-val)
  document.querySelectorAll('.cm-lbl').forEach(lbl => {
    const valEl = lbl.nextElementSibling;
    if (!valEl || !valEl.classList.contains('cm-val')) return;
    const t = lbl.textContent.toLowerCase();
    if (t.includes('whatsapp'))  valEl.textContent = LC_GLOBALS.whatsapp.label;
    if (t.includes('instagram')) valEl.textContent = LC_GLOBALS.instagram.label;
    if (t.includes('linkedin'))  valEl.textContent = LC_GLOBALS.linkedin.label;
    if (t.includes('twitter'))   valEl.textContent = LC_GLOBALS.twitter.label;
  });
});

/* ── ACTIVE NAV LINK ──
   Highlights the current page's nav link
   based on the filename in the URL.              */
(function highlightNav() {
  const path = window.location.pathname;
  const file = path.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === file || (file === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ── NAV SCROLL STATE ── */
(function initNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── MOBILE MENU ── */
function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('hamburger');
  if (!menu) return;
  menu.classList.toggle('open');
  // Animate hamburger to X
  const spans = icon?.querySelectorAll('span');
  if (spans && menu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else if (spans) {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
  const menu = document.getElementById('mobile-menu');
  const btn  = document.getElementById('hamburger');
  if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
    menu.classList.remove('open');
    const spans = btn.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

/* ── GENERIC FORM SUCCESS ──
   Call this with the form element and a success
   container element to show the success state.   */
function showSuccess(formEl, successEl) {
  if (formEl)    formEl.style.display    = 'none';
  if (successEl) successEl.style.display = 'block';
}

function resetForm(formEl, successEl) {
  if (formEl)    formEl.style.display    = 'block';
  if (successEl) successEl.style.display = 'none';
  formEl?.reset?.();
}

/* ── PRICING TOGGLE ── */
function toggleAnnual(checked) {
  const lm = document.getElementById('label-monthly');
  const la = document.getElementById('label-annual');
  if (lm) lm.classList.toggle('on', !checked);
  if (la) la.classList.toggle('on',  checked);
  document.querySelectorAll('.ann-note').forEach(el => {
    el.style.display = checked ? 'block' : 'none';
  });
}

/* ── PORTFOLIO FILTER ── */
function filterProjects(cat, btn) {
  document.querySelectorAll('.flt-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.proj-card').forEach(card => {
    card.style.display = (cat === 'all' || card.dataset.cat === cat) ? 'block' : 'none';
  });
}

/* ── CASE STUDY MODAL ── */
const caseStudies = {
  cv1: {
    tag: 'Computer Vision · Retail',
    title: 'Smart Retail Shelf Monitor',
    challenge: 'A supermarket chain in Lagos was losing revenue from out-of-stock shelves going unnoticed for hours. Staff were manually checking aisles — slow and inconsistent.',
    solution: 'LimahCode built a computer vision pipeline using YOLOv8 trained on custom shelf images. Cameras at aisle ends feed real-time video to the model, detecting empty slots and triggering SMS alerts to floor managers within 2 seconds.',
    results: ['94% detection accuracy after 2 weeks of in-store training', 'Restocking time reduced from 45 mins to 12 mins', 'Deployed across 3 store locations in 6 weeks', '~18% uplift in shelf availability reported'],
    stack: ['Python', 'YOLOv8', 'OpenCV', 'Twilio SMS', 'Raspberry Pi 4', 'AWS S3']
  },
  web1: {
    tag: 'Web Application · E-commerce',
    title: 'Lagos Food Vendor Marketplace',
    challenge: 'A Lagos entrepreneur wanted to bring local food vendors online. Existing platforms charged high commissions and did not understand local payment rails.',
    solution: 'LimahCode built a full marketplace from scratch — vendor onboarding, product listings, order management, and Paystack integration. Each vendor gets their own dashboard.',
    results: ['40+ vendors onboarded in first month', 'Supports card, bank transfer, and USSD via Paystack', 'Mobile-first — 80% of traffic from phones', 'Delivered in 6 weeks'],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Paystack', 'Cloudinary', 'Vercel']
  },
  cv2: {
    tag: 'Computer Vision · Security',
    title: 'Facial Access Control System',
    challenge: 'A Lagos office wanted to eliminate lost keycards and manual sign-in sheets with a reliable, fast system that worked with existing cameras.',
    solution: 'LimahCode built a facial recognition access system using dlib on a Raspberry Pi at the entrance. Faces enrolled via admin web UI; all events logged to a live dashboard.',
    results: ['99.1% recognition accuracy under varied lighting', '0.4 second average response time', 'Full entry/exit log with export', 'Replaced keycard system within 2 weeks'],
    stack: ['Python', 'face_recognition', 'dlib', 'Raspberry Pi 4', 'Flask', 'SQLite', 'React']
  },
  web2: {
    tag: 'Mobile Application · Community',
    title: 'Church Management App',
    challenge: 'A Lagos church with 800+ members was managing attendance on paper, collecting tithes informally, and struggling with event communication.',
    solution: 'Cross-platform mobile app with member and admin views. Members see events and giving history; admins mark attendance, record tithes, send announcements.',
    results: ['800+ members active in first 3 months', 'Attendance and tithe records now fully digital', 'Push notifications for events and announcements', 'iOS and Android from a single codebase'],
    stack: ['React Native', 'Expo', 'Firebase', 'Firestore', 'Push notifications', 'App Store + Google Play']
  },
  edu1: {
    tag: 'Academy · Cohort Outcome',
    title: 'Builder Track — Cohort 1',
    challenge: '12 teens aged 13–16 enrolled with little to no prior coding experience. Goal: every student deploys a live website by week 8.',
    solution: 'Live Zoom sessions every Saturday, small group code reviews, Discord community for daily help, project-based learning throughout.',
    results: ['All 12 students completed all 8 weeks (100% retention)', 'Every student deployed a live website by demo day', '3 students enrolled directly in Advanced Track afterwards', 'Parents reported increased confidence in tech'],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'VS Code', 'GitHub', 'Netlify', 'Zoom', 'Discord']
  },
    web3: {
    tag: 'Web Application · E-Commerce Platform',
    title: 'Deovaze — E-Commerce & Retail Platform',
    liveUrl: 'https://deovaze.com/',
    role: 'Backend Developer: Alimat Abimbola',
    challenge: 'Managing product inventory, user checkout, order fulfilment, and multi-vendor transactions seamlessly across web and mobile.',
    solution: 'Designed and engineered the backend architecture, relational database models, order processing pipelines, and secure REST APIs for Deovaze.',
    results: ['Live in production handling client orders', 'Fast, secure database transactions & cart persistence', 'Integrated payment and notification pipelines', 'Scalable API structure for future mobile apps'],
    stack: ['Backend Architecture', 'PHP / Laravel', 'MySQL', 'REST APIs', 'Cloud Deployment']
  },
    hr1: {
    tag: 'Web Application · AI / HR Tech',
    title: 'HireRight — AI-Powered HR & Recruitment Platform',
    liveUrl: 'https://hirerightapp.com/',
    role: 'Lead Backend Developer: Alimat Abimbola',
    challenge: 'Manual recruitment is slow and inefficient. Employers struggle to create precise JDs and evaluate candidate CVs at scale, while applicants experience long feedback delays.',
    solution: 'Engineered the full backend infrastructure for HireRight: an AI CV parser that scans resumes and automatically generates tailored Job Descriptions, coupled with custom candidate assessments and automated test scoring.',
    results: ['Live production platform at hirerightapp.com', 'AI engine processes CVs and drafts targeted JDs in seconds', 'Custom candidate skill tests and score reporting', 'Seamless candidate tracking dashboard for hiring teams'],
    stack: ['Python AI Engine', 'Laravel Backend', 'MySQL Database', 'REST APIs', 'React Frontend']
  },
  agora1: {
    tag: 'Mobile App · AI / AgriTech',
    title: 'Agora E-commerce App',
    challenge: 'Local farmers need a reliable marketplace to sell commodities like tomatoes, yams, cassava, and rice, but assessing product quality at scale is difficult.',
    solution: 'An AI inference pipeline connecting farmers with buyers. We trained an EfficientNet-B0 model to grade 8 commodities into 4 tiers (A, B, C, Reject). High-confidence items (>90%) go straight to the marketplace, while others are routed to a Next.js admin dashboard for human review. All reviewed data is queued to fine-tune the model in the future.',
    results: ['Automated quality grading for 8 commodities', 'Seamless integration of React Native mobile app and Next.js admin panel', 'Robust AI inference pipeline with human-in-the-loop review', 'Data-collection pipeline established for continuous model fine-tuning'],
    stack: ['Laravel', 'Python', 'React Native', 'Expo', 'Next.js', 'Docker', 'PostgreSQL', 'Queues']
  }
};

function openModal(id) {
  const d = caseStudies[id];
  const overlay = document.getElementById('modal-overlay');
  const body    = document.getElementById('modal-body');
  if (!d || !overlay || !body) return;

  body.innerHTML = `
    <button class="modal-close" onclick="closeModal()">✕</button>
    <p style="font-size:.68rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--gm);margin-bottom:.5rem;">${d.tag}</p>
    <h2 style="font-family:'Syne',sans-serif;font-size:1.6rem;font-weight:800;letter-spacing:-.025em;margin-bottom:1rem;">${d.title}</h2>
    ${d.role ? `<p style="font-size:.78rem;font-weight:700;color:var(--gl);letter-spacing:.05em;text-transform:uppercase;margin-bottom:.5rem;">${d.role}</p>` : ''}
    ${d.liveUrl ? `<div style="margin-bottom:1.25rem;"><a href="${d.liveUrl}" target="_blank" style="display:inline-flex;align-items:center;gap:6px;background:var(--green);color:#fff;font-weight:700;font-size:.82rem;padding:.45rem 1rem;border-radius:8px;text-decoration:none;">Visit Live Website ↗</a></div>` : ''}
    <p style="font-size:.72rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--gm);margin:.9rem 0 .3rem;">The challenge</p>
    <p style="font-size:.88rem;color:var(--glt);line-height:1.75;font-weight:300;">${d.challenge}</p>
    <p style="font-size:.72rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--gm);margin:.9rem 0 .3rem;">Our solution</p>
    <p style="font-size:.88rem;color:var(--glt);line-height:1.75;font-weight:300;">${d.solution}</p>
    <p style="font-size:.72rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--gm);margin:.9rem 0 .3rem;">Results</p>
    <div style="background:rgba(26,122,82,.1);border:1px solid rgba(46,170,114,.2);border-radius:10px;padding:1rem 1.25rem;">
      <ul style="padding-left:1.2rem;">${d.results.map(r => `<li style="font-size:.88rem;color:var(--glt);line-height:1.75;font-weight:300;margin-bottom:.3rem;">${r}</li>`).join('')}</ul>
    </div>
    <p style="font-size:.72rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--gm);margin:.9rem 0 .3rem;">Tech stack</p>
    <div style="display:flex;flex-wrap:wrap;gap:.4rem;">${d.stack.map(s => `<span style="font-size:.72rem;padding:.22rem .65rem;border-radius:100px;border:1px solid rgba(255,255,255,.1);color:var(--glt);">${s}</span>`).join('')}</div>
    <div style="margin-top:1.75rem;display:flex;gap:.75rem;flex-wrap:wrap;">
      <a href="contact.html" class="btn-primary">Start a similar project →</a>
      <button class="btn-outline" onclick="closeModal()">Close</button>
    </div>`;

  overlay.classList.add('open');
}

function closeModal() {
  document.getElementById('modal-overlay')?.classList.remove('open');
}

// Close modal on overlay click or Escape key
document.addEventListener('click', e => {
  if (e.target.id === 'modal-overlay') closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* ── CONTACT TYPE TABS ── */
const contactFieldMap = {
  software: ['cf-budget', 'cf-timeline'],
  ai:       ['cf-usecase'],
  academy:  ['cf-age', 'cf-track'],
  general:  []
};
const contactLabels = {
  software: 'Describe your project.',
  ai:       'Describe your CV/AI use case.',
  academy:  'Any questions about the academy?',
  general:  'How can we help you?'
};

function setEnquiryType(type, btn) {
  document.querySelectorAll('.type-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  Object.values(contactFieldMap).flat().forEach(id => {
    document.getElementById(id)?.classList.add('hidden');
  });
  (contactFieldMap[type] || []).forEach(id => {
    document.getElementById(id)?.classList.remove('hidden');
  });
  const lbl = document.getElementById('msg-label');
  if (lbl) lbl.textContent = contactLabels[type] || 'Message';
}

/* ── SCROLL REVEAL ── */
(function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); /* fire once */
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-group').forEach(el => observer.observe(el));
})();

/* ── THEME TOGGLE ── */
(function initTheme() {
  const saved = localStorage.getItem('lc-theme');
  if (saved === 'light') document.body.classList.add('light-mode');
})();

function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  localStorage.setItem('lc-theme', isLight ? 'light' : 'dark');
  // Update all toggle button icons on the page
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.textContent = isLight ? '☀️' : '🌙';
    btn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  });
}

/* ── COUNT-UP ANIMATION ── */
function animateCount(el, target, suffix, duration) {
  const start = performance.now();
  const isDecimal = String(target).includes('.');
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); /* ease-out cubic */
    const value    = eased * target;
    el.textContent = (isDecimal ? value.toFixed(1) : Math.round(value)) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}


/* ============================================
   PERFORMANCE & ENGAGEMENT TELEMETRY
   ============================================ */
function getDeviceType() {
  const ua = (navigator.userAgent || navigator.vendor || window.opera || '').toLowerCase();
  const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|silk|fennec|tablet|kindle/i.test(ua);
  const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  if (isMobileUA || (isTouch && window.innerWidth <= 1024) || window.innerWidth <= 768) {
    return 'Mobile';
  }
  return 'Desktop';
}

function trackLimahEvent(eventType, meta) {
  try {
    const payload = {
      event_type: eventType,
      page: window.location.pathname.split('/').pop() || 'index.html',
      referrer: document.referrer || '',
      device: getDeviceType(),
      meta: meta || {}
    };
    const endpoint = 'https://limahcode-web-adventure.onrender.com/api/track';
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, JSON.stringify(payload));
    } else {
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(function() {});
    }
  } catch (e) {}
}

/* ============================================
   FLOATING WHATSAPP CALL-TO-ACTION (ALL PAGES)
   ============================================ */
(function initFloatingWhatsAppCTA() {
  function mount() {
    if (document.getElementById('whatsapp-floating-cta')) return;
    
    const widget = document.createElement('div');
    widget.id = 'whatsapp-floating-cta';
    widget.className = 'whatsapp-float-widget';

    const defaultMsg = encodeURIComponent("Hello LimahCode! I'm browsing your website and would like to make an inquiry.");
    const waUrl = 'https://wa.me/2348025034999?text=' + defaultMsg;

    widget.innerHTML = `
      <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="whatsapp-float-btn" aria-label="Chat on WhatsApp" id="wa-floating-btn">
        <svg viewBox="0 0 32 32" width="32" height="32">
          <path d="M16 2a13.9 13.9 0 0 0-12 21L2 30l7.3-1.9A13.9 13.9 0 1 0 16 2zm0 25.4a11.5 11.5 0 0 1-5.9-1.6l-.4-.3-4.4 1.1 1.2-4.2-.3-.5A11.5 11.5 0 1 1 16 27.4zm6.3-8.6c-.3-.2-2-.9-2.3-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.4.2-.7.1a8.8 8.8 0 0 1-5-4.4c-.2-.4 0-.6.1-.8.2-.1.3-.3.5-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.2 1.2-1.2 2.8 1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.8 5.1.8.3 1.4.5 1.9.7.8.2 1.6.2 2.2.1.7-.1 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.3-.6-.4z"/>
        </svg>
      </a>
      <span class="whatsapp-float-label">Chat with us 👋</span>
    `;

    document.body.appendChild(widget);

    const btn = widget.querySelector('#wa-floating-btn');
    if (btn) {
      btn.addEventListener('click', function() {
        trackLimahEvent('whatsapp_click', { trigger: 'floating_widget' });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

  // Automatic Pageview Tracking
  trackLimahEvent('pageview');
})();


/* ============================================
   DYNAMIC HERO TYPEWRITER EFFECT
   ============================================ */
(function initTypewriter() {
  const el = document.getElementById('typed-text');
  if (!el) return;
  const words = ['Software Engineers', 'Teen Innovators', 'Career Pivoters', 'Tech Creators'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 100;
  const deleteSpeed = 50;
  const pauseTime = 1800;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      el.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, pauseTime);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, 300);
    } else {
      setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
    }
  }
  type();
})();

/* ============================================
   COMMUNITY REVIEWS ENGINE & MODAL
   ============================================ */
function openReviewModal() {
  const modal = document.getElementById('review-modal');
  if (modal) modal.style.display = 'flex';
}

function closeReviewModal() {
  const modal = document.getElementById('review-modal');
  if (modal) modal.style.display = 'none';
}

function handleReviewSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('rev-name').value.trim();
  const role = document.getElementById('rev-role').value.trim() || 'Student / Parent';
  const rating = parseInt(document.getElementById('rev-rating').value) || 5;
  const comment = document.getElementById('rev-comment').value.trim();
  const btn = document.getElementById('rev-submit-btn');
  const msg = document.getElementById('rev-feedback-msg');

  if (!name || !comment) return;

  btn.disabled = true;
  btn.textContent = 'Submitting...';

  fetch('https://limahcode-web-adventure.onrender.com/api/submit-review', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, role, rating, comment })
  })
  .then(r => r.json())
  .then(data => {
    msg.style.display = 'block';
    if (data.success) {
      msg.style.color = '#22c55e';
      msg.textContent = '✓ ' + (data.message || 'Thank you! Your review has been submitted for instructor verification.');
      document.getElementById('public-review-form').reset();
      setTimeout(closeReviewModal, 3000);
    } else {
      msg.style.color = '#ef4444';
      msg.textContent = 'Error: ' + (data.error || 'Could not submit review.');
    }
  })
  .catch(() => {
    msg.style.display = 'block';
    msg.style.color = '#ef4444';
    msg.textContent = 'Network error. Please try again.';
  })
  .finally(() => {
    btn.disabled = false;
    btn.textContent = 'Submit Review for Verification';
  });
}

// Dynamically load approved reviews from backend API
(function loadLiveApprovedReviews() {
  const container = document.getElementById('reviews-container');
  if (!container) return;

  fetch('https://limahcode-web-adventure.onrender.com/api/reviews')
    .then(r => r.json())
    .then(data => {
      if (data.success && data.reviews && data.reviews.length > 0) {
        let html = '';
        data.reviews.forEach(r => {
          const stars = '★'.repeat(r.rating || 5);
          const initials = r.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
          html += `
            <div class="tcard">
              <div style="color: #f59e0b; margin-bottom: 8px; font-size: 14px;">${stars}</div>
              <p class="tcard-quote">"${r.comment}"</p>
              <div class="tcard-author">
                <div class="avatar">${initials}</div>
                <div>
                  <div class="tcard-name">${r.name}</div>
                  <div class="tcard-role">${r.role || 'Student / Parent'}</div>
                </div>
              </div>
            </div>
          `;
        });
        container.innerHTML = html;
      }
    })
    .catch(() => {});
})();


/* ======================================

/* ============================================
   LIVE DYNAMIC BRAND THEME SYNC
   Syncs live colors from LIM Innovations Admin Panel
   ============================================ */
(function initBrandThemeSync() {
  function applyTheme(theme) {
    if (!theme) return;
    const primary = theme.primary_color || '#1A7A52';
    const dark = theme.primary_dark || '#0D3D29';
    const secondary = theme.secondary_color || '#2EAA72';
    const gold = theme.accent_gold || '#FAC740';
    
    // Inject dynamic high-priority style tag
    let styleTag = document.getElementById('lim-dynamic-theme-style');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'lim-dynamic-theme-style';
      document.head.appendChild(styleTag);
    }
    styleTag.innerHTML = 
      :root {
        --green:  !important;
        --gl:  !important;
        --gd:  !important;
        --al:  !important;
        --amber:  !important;
        --color-primary:  !important;
        --color-secondary:  !important;
      }
      .btn-primary {
        background:  !important;
        border-color:  !important;
        color: #ffffff !important;
      }
      .btn-primary:hover {
        background:  !important;
        border-color:  !important;
      }
      .nav-portal-btn {
        background:  !important;
        border-color:  !important;
        color: #ffffff !important;
      }
      .nav-portal-btn:hover {
        background:  !important;
      }
      .track-card.popular {
        border-color:  !important;
        background: rgba(, , , 0.12) !important;
      }
      .pop-badge {
        background:  !important;
      }
      nav .logo span, .logo span {
        color:  !important;
      }
      .accent, .sec-label, .sec-label.reveal {
        color:  !important;
      }
      .tcard-quote {
        border-left-color:  !important;
      }
    ;
  }

  // 1. Check local cache
  try {
    const cached = localStorage.getItem('lim_brand_theme');
    if (cached) applyTheme(JSON.parse(cached));
  } catch(e) {}

  // 2. Fetch fresh theme from central API
  fetch('https://limahcode-web-adventure.onrender.com/api/theme')
    .then(r => r.json())
    .then(data => {
      if (data && data.success && data.theme) {
        applyTheme(data.theme);
        try {
          localStorage.setItem('lim_brand_theme', JSON.stringify(data.theme));
        } catch(e) {}
      }
    })
    .catch(err => console.log('Theme sync notice:', err));
})();
