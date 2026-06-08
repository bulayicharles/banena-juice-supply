/* =========================================================
   BANANA JUICE SUPPLY — script.js
   ========================================================= */

// ── Navbar Scroll Effect ──────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── Mobile Hamburger Menu ─────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Scroll Reveal ─────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, Number(delay));
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Active Nav Link on Scroll ─────────────────────────────
const sections   = document.querySelectorAll('section[id], div[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const match = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (match) match.classList.add('active');
    }
  });
}, { threshold: 0.45 });

document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));

// ── Back to Top Button ────────────────────────────────────
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backTop.classList.add('show');
  } else {
    backTop.classList.remove('show');
  }
});

backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Contact Form Submission ───────────────────────────────
const contactForm = document.getElementById('contactForm');
const formNote    = document.getElementById('formNote');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const phone   = document.getElementById('phone').value.trim();
  const juice   = document.getElementById('juice').value;
  const message = document.getElementById('message').value.trim();

  // Basic validation
  if (!name) {
    showNote('Please enter your name.', 'error');
    return;
  }
  if (!phone) {
    showNote('Please enter your phone number.', 'error');
    return;
  }
  if (!juice) {
    showNote('Please select a juice.', 'error');
    return;
  }

  // Build a WhatsApp message URL
  const text = `Hello Banana Juice Supply! 🍌\n\nName: ${name}\nPhone: ${phone}\nOrder: ${juice}\n${message ? 'Message: ' + message : ''}`;
  const waURL = `https://wa.me/255743339135?text=${encodeURIComponent(text)}`;

  // Open WhatsApp
  window.open(waURL, '_blank');

  showNote('✅ Opening WhatsApp with your order details...', 'success');
  contactForm.reset();
});

function showNote(msg, type) {
  formNote.textContent = msg;
  formNote.style.color = type === 'error' ? '#e74c3c' : '#2d7a4f';
  setTimeout(() => { formNote.textContent = ''; }, 5000);
}

// ── Gallery Lightbox ──────────────────────────────────────
const galleryItems = document.querySelectorAll('.g-item img');

galleryItems.forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    openLightbox(img.src, img.alt);
  });
});

function openLightbox(src, alt) {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(0,0,0,.92);
    display: flex; align-items: center; justify-content: center;
    cursor: zoom-out;
    animation: fadeIn .25s ease;
  `;

  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.style.cssText = `
    max-width: 90vw; max-height: 85vh;
    object-fit: contain;
    border-radius: 12px;
    box-shadow: 0 24px 80px rgba(0,0,0,.5);
    animation: scaleIn .25s ease;
  `;

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '&times;';
  closeBtn.style.cssText = `
    position: absolute; top: 20px; right: 24px;
    background: none; border: none; color: #fff;
    font-size: 2.4rem; cursor: pointer; line-height: 1;
    opacity: .8; transition: opacity .2s;
  `;
  closeBtn.addEventListener('mouseenter', () => closeBtn.style.opacity = '1');
  closeBtn.addEventListener('mouseleave', () => closeBtn.style.opacity = '.8');

  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
    @keyframes scaleIn { from { transform: scale(.85); } to { transform: scale(1); } }
  `;

  overlay.append(style, img, closeBtn);
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  const close = () => {
    document.body.removeChild(overlay);
    document.body.style.overflow = '';
  };

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target === closeBtn) close();
  });

  document.addEventListener('keydown', function onKey(e) {
    if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); }
  });
}

// ── Smooth Scroll Offset for Fixed Nav ───────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Stats Counter Animation ───────────────────────────────
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat strong').forEach(el => {
        const val = el.textContent.trim();
        if (/^\d+\+?$/.test(val)) {
          const num = parseInt(val);
          animateCount(el, num, val.includes('+') ? '+' : '');
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) statsObserver.observe(statsBar);

function animateCount(el, target, suffix) {
  let start = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = start + suffix;
    }
  }, 35);
}

// ── Juice Card Tilt Effect (subtle) ──────────────────────
document.querySelectorAll('.juice-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const xPct   = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const yPct   = ((e.clientY - rect.top)  / rect.height - 0.5) * -10;
    card.style.transform = `translateY(-8px) rotateX(${yPct}deg) rotateY(${xPct}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

console.log('🍌 Banana Juice Supply — script loaded!');