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
    tag: 'Web Application · Business Tools',
    title: 'SME Inventory & Sales Tracker',
    challenge: 'A Lagos electronics retailer tracking stock on paper and WhatsApp had no visibility into low stock until it was already gone.',
    solution: 'Web dashboard where staff log sales and deliveries, set low-stock alerts, and management gets daily email summaries with sales charts.',
    results: ['Saves ~3 hours of admin work per week', 'Low-stock alerts prevent stockouts', 'Monthly reports generated automatically', 'Paid for itself within 2 months'],
    stack: ['Vue.js', 'Supabase', 'PostgreSQL', 'Chart.js', 'Netlify', 'Resend email']
  },
  hr1: {
    tag: 'Web Application · AI / HR',
    title: 'AI-Powered HR & Recruitment Platform',
    challenge: 'Recruitment is often slow and manual. Employers struggle to create precise JDs and assess candidates efficiently, while candidates wait weeks for feedback on their CVs.',
    solution: 'A live platform connecting employers and employees. It features an AI engine that scans CVs to automatically generate tailored Job Descriptions. Employers can also use the platform to set custom JDs, technical tests, and comprehensive candidate assessments.',
    results: ['Fully automated CV scanning and JD generation', 'Streamlined candidate assessment and testing pipeline', 'Live platform connecting multiple employers and job seekers', 'Significant reduction in overall time-to-hire'],
    stack: ['Laravel', 'React', 'MySQL', 'Python']
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
