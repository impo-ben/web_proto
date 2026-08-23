/* =========================================================
   PROTOLEAP INNOVATIONS — SCRIPT
   1. DOM Init  2. Loading Screen  3. Mobile Nav  4. Sticky Nav
   5. Active Nav Section  6. Smooth Scroll  7. Scroll Reveal
   8. Hero Parallax  9. Floating Tile Interaction  10. Magnetic Buttons
   11. Custom Cursor  12. Service Interactions  13. Process Animation
   14. Gallery Filtering  15. Gallery Modal  16. Contact Form Validation
   17. Back to Top  18. Reduced Motion Handling
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  if(isTouch){ document.body.classList.add('touch'); }

  /* ---------- 2. LOADING SCREEN ---------- */
  const loader = document.getElementById('loader');
  const finishLoad = () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.remove('no-scroll');
    }, prefersReduced ? 100 : 1300);
  };
  document.body.classList.add('no-scroll');
  if(document.readyState === 'complete'){ finishLoad(); }
  else{ window.addEventListener('load', finishLoad); }

  /* ---------- 3. MOBILE NAVIGATION ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const toggleMobileNav = (open) => {
    const isOpen = open !== undefined ? open : !mobileNav.classList.contains('open');
    mobileNav.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('no-scroll', isOpen);
  };
  hamburger.addEventListener('click', () => toggleMobileNav());
  document.querySelectorAll('[data-mobile-nav]').forEach(el => {
    el.addEventListener('click', () => toggleMobileNav(false));
  });

  /* ---------- 4. STICKY NAVIGATION ---------- */
  const nav = document.getElementById('nav');
  const onScrollNav = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive:true });

  /* ---------- 5. ACTIVE NAV SECTION ---------- */
  const navLinks = document.querySelectorAll('[data-nav]');
  const sections = ['home','services','products','gallery','contact']
    .map(id => document.getElementById(id)).filter(Boolean);

  const setActiveNav = () => {
    let current = sections[0];
    const scrollPos = window.scrollY + window.innerHeight * 0.4;
    sections.forEach(sec => {
      if(sec.offsetTop <= scrollPos) current = sec;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current.id);
    });
  };
  setActiveNav();
  window.addEventListener('scroll', setActiveNav, { passive:true });

  /* ---------- SECTION PROGRESS RAIL ---------- */
  const railDots = document.querySelectorAll('[data-rail]');
  const railFill = document.getElementById('railFill');
  const setRail = () => {
    let current = sections[0];
    const scrollPos = window.scrollY + window.innerHeight * 0.4;
    sections.forEach(sec => { if(sec.offsetTop <= scrollPos) current = sec; });
    railDots.forEach(dot => dot.classList.toggle('active', dot.dataset.target === current.id));
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, (window.scrollY / docHeight) * 100) : 0;
    if(railFill) railFill.style.height = pct + '%';
  };
  if(railFill){ setRail(); window.addEventListener('scroll', setRail, { passive:true }); }

  /* ---------- 6. SMOOTH SCROLLING ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if(targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if(target){
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.scrollY - (window.innerWidth > 900 ? 70 : 0);
        window.scrollTo({ top:y, behavior: prefersReduced ? 'auto' : 'smooth' });
      }
    });
  });

  /* ---------- 7. SCROLL REVEAL ---------- */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-clip');

if ('IntersectionObserver' in window) {

  const io = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add('in-view');

        io.unobserve(entry.target);

      }

    });

  }, {
    threshold: 0,
    rootMargin: '0px 0px -5% 0px'
  });

  revealEls.forEach(el => {
    io.observe(el);
  });

} else {

  revealEls.forEach(el => {
    el.classList.add('in-view');
  });

}

  /* ---------- 8. HERO PARALLAX ---------- */
  const heroVisual = document.querySelector('.hero-visual');
  const heroSection = document.querySelector('.hero');
  if(heroVisual && !prefersReduced && !isTouch){
    window.addEventListener('scroll', () => {
      const rect = heroSection.getBoundingClientRect();
      if(rect.bottom < 0 || rect.top > window.innerHeight) return;
      const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
      heroVisual.style.transform = `translateY(calc(-46% + ${progress * 60}px))`;
    }, { passive:true });
  }

  /* ---------- 9. FLOATING TILE INTERACTION (mouse parallax) ---------- */
  const tileField = document.querySelector('.tile-field');
  const tiles = document.querySelectorAll('.tech-tile');
  if(tileField && !prefersReduced && !isTouch){
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / rect.width - 0.5;
      const my = (e.clientY - rect.top) / rect.height - 0.5;
      tiles.forEach(tile => {
        const depth = parseFloat(tile.dataset.depth) || 0.4;
        tile.style.marginLeft = `${mx * 24 * depth}px`;
        tile.style.marginTop = `${my * 24 * depth}px`;
      });
    });
  }

  /* ---------- 10. MAGNETIC BUTTONS ---------- */
  const magnets = document.querySelectorAll('.magnetic');
  if(!prefersReduced && !isTouch){
    magnets.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width/2) * 0.25;
        const y = (e.clientY - rect.top - rect.height/2) * 0.35;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0,0)'; });
    });
  }

  /* ---------- 11. CUSTOM CURSOR ---------- */
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  if(cursorDot && cursorRing && !isTouch){
    let ringX = window.innerWidth/2, ringY = window.innerHeight/2;
    let mouseX = ringX, mouseY = ringY;
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    };
    animateRing();

    const hoverTargets = document.querySelectorAll('a, button, .service-card, [data-tilt]');
    hoverTargets.forEach(t => {
      t.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
      t.addEventListener('mouseleave', () => { cursorRing.classList.remove('hover'); cursorRing.classList.remove('view'); });
    });
    document.querySelectorAll('.gallery-item').forEach(t => {
      t.addEventListener('mouseenter', () => cursorRing.classList.add('view'));
      t.addEventListener('mouseleave', () => cursorRing.classList.remove('view'));
    });
  }

  /* ---------- 12. SERVICE / TILE INTERACTIONS (tilt) ---------- */
  const tiltEls = document.querySelectorAll('[data-tilt]');
  if(!prefersReduced && !isTouch){
    tiltEls.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(700px) rotateX(${py * -5}deg) rotateY(${px * 5}deg) translateY(-4px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- 13. PROCESS ANIMATION ---------- */
  const processLine = document.getElementById('processLine');
  const processSection = document.querySelector('.process');
  if(processLine && 'IntersectionObserver' in window){
    const procIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          processLine.style.width = '100%';
          procIo.unobserve(entry.target);
        }
      });
    }, { threshold:0.3 });
    procIo.observe(processSection);
  }
/* ---------- 14. GALLERY FILTERING ---------- */

const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => {
      b.classList.remove('active');
    });
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      const categories = (item.dataset.cat || '')
        .trim()
        .split(/\s+/);
      const match =
        filter === 'all' ||
        categories.includes(filter);
      item.classList.toggle(
        'filtered-out',
        !match
      );
    });
  });
});
/* ---------- 15. GALLERY MODAL ---------- */
const modal = document.getElementById('galleryModal');
const modalVisual = document.getElementById('modalVisual');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalDesc = document.getElementById('modalDesc');
let lastFocused = null;
const openModal = (item) => {
  lastFocused = document.activeElement;
  const visualEl = item.querySelector('.gallery-visual');
  const img = item.querySelector('img');
  modalVisual.className = 'modal-visual';
  modalVisual.style.backgroundImage = '';
  modalVisual.style.backgroundSize = '';
  modalVisual.style.backgroundPosition = '';
  if (
    img &&
    img.style.display !== 'none' &&
    img.complete &&
    img.naturalWidth > 0
  ) {
    modalVisual.style.backgroundImage =
      `url("${img.currentSrc || img.src}")`;

    modalVisual.style.backgroundSize = 'cover';
    modalVisual.style.backgroundPosition = 'center';
  } else {
    if (visualEl) {
      const computedStyle =
        getComputedStyle(visualEl);
      if (
        computedStyle.backgroundImage &&
        computedStyle.backgroundImage !== 'none'
      ) {
        modalVisual.style.backgroundImage =
          computedStyle.backgroundImage;
        modalVisual.style.backgroundSize = 'cover';
        modalVisual.style.backgroundPosition = 'center';
      }
      const visualClass =
        Array.from(visualEl.classList)
          .find(c => c.startsWith('gv-'));
      if (visualClass) {
        modalVisual.classList.add(visualClass);
      }
    }
  }
  modalTitle.textContent =
    item.dataset.title || '';
  modalCategory.textContent =
    item.dataset.category || '';
  modalDesc.textContent =
    item.dataset.desc || '';
  modal.classList.add('open');
  document.body.classList.add('no-scroll');
  const closeButton =
    modal.querySelector('.modal-close');
  if (closeButton) {
    closeButton.focus();
  }
};
const closeModal = () => {
  modal.classList.remove('open');
  document.body.classList.remove('no-scroll');
  if (
    lastFocused &&
    typeof lastFocused.focus === 'function'
  ) {
    lastFocused.focus();
  }
};
/* ---------- GALLERY ITEM EVENTS ---------- */
galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    openModal(item);
  });
  item.addEventListener('keydown', (e) => {
    if (
      e.key === 'Enter' ||
      e.key === ' '
    ) {
      e.preventDefault();
      openModal(item);
    }
  });
});
/* ---------- MODAL CLOSE BUTTONS ---------- */
modal
  .querySelectorAll('[data-modal-close]')
  .forEach(el => {
    el.addEventListener(
      'click',
      closeModal
    );
  });
/* ---------- ESCAPE KEY ---------- */
document.addEventListener('keydown', (e) => {
  if (
    e.key === 'Escape' &&
    modal.classList.contains('open')
  ) {
    closeModal();
  }
});
  /* ---------- 16. CONTACT FORM VALIDATION ---------- */
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const validators = {
    name: (v) => v.trim().length >= 2 ? '' : 'Please enter your name.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.',
    phone: (v) => /^[0-9+\-\s()]{7,15}$/.test(v.trim()) ? '' : 'Please enter a valid phone number.',
    organization: () => '',
    requirement: (v) => v ? '' : 'Please select a requirement.',
    message: (v) => v.trim().length >= 10 ? '' : 'Please enter at least 10 characters.'
  };
  const showError = (name, message) => {
    const field = form.querySelector(`[name="${name}"]`)?.closest('.field');
    const errorEl = form.querySelector(`[data-error-for="f-${name}"]`);
    if(field) field.classList.toggle('error', !!message);
    if(errorEl) errorEl.textContent = message;
  };
  const validateField = (input) => {
    const validator = validators[input.name];
    if(!validator) return true;
    const message = validator(input.value);
    showError(input.name, message);
    return !message;
  };
  form.querySelectorAll('input, textarea, select').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
  });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('input, textarea, select').forEach(input => {
      if(input.name === 'botcheck') return;
      if(!validateField(input)) valid = false;
    });
    if(!valid){
      const firstError = form.querySelector('.field.error input, .field.error textarea, .field.error select');
      if(firstError) firstError.focus();
      return;
    }
    if(form.querySelector('[name="botcheck"]').value !== ''){
      // honeypot field was filled — silently drop likely spam bot submissions
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalLabel = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'SENDING&hellip;';

    const accessKey = form.querySelector('[name="access_key"]').value;
    const showSuccess = () => {
      formSuccess.classList.add('show');
      form.reset();
      form.querySelectorAll('.field').forEach(f => f.classList.remove('error'));
      setTimeout(() => formSuccess.classList.remove('show'), 7000);
    };
    const showFailure = () => {
      // Free-hosting fallback: open the visitor's email client pre-filled with their message.
      const data = new FormData(form);
      const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')}\nOrganization: ${data.get('organization') || '-'}\nRequirement: ${data.get('requirement')}\n\n${data.get('message')}`;
      window.location.href = `mailto:protoleapinnovations@gmail.com?subject=${encodeURIComponent('New enquiry from website')}&body=${encodeURIComponent(body)}`;
      showSuccess();
    };

    if(!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY'){
      // No Web3Forms key configured yet — fall back to opening the visitor's email client.
      showFailure();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalLabel;
      return;
    }

    try{
      const response = await fetch('https://api.web3forms.com/submit', {
        method:'POST',
        headers:{ 'Content-Type':'application/json', Accept:'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });
      const result = await response.json();
      if(result.success){ showSuccess(); } else { showFailure(); }
    } catch(err){
      showFailure();
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalLabel;
    }
  });

  /* ---------- CURSOR SPOTLIGHT (ambient glow following pointer) ---------- */
  if(!prefersReduced && !isTouch){
    document.body.classList.add('spot-on');
    let spotTicking = false;
    window.addEventListener('mousemove', (e) => {
      if(!spotTicking){
        requestAnimationFrame(() => {
          document.body.style.setProperty('--spot-x', e.clientX + 'px');
          document.body.style.setProperty('--spot-y', e.clientY + 'px');
          spotTicking = false;
        });
        spotTicking = true;
      }
    });
  }

  /* ---------- PRODUCT DETAIL MODAL (kit / board / module tiles) ---------- */
  const PRODUCT_DATA = {
    robotics: {
      title: 'ROBOTICS LEARNING KITS',
      eyebrow: 'PRODUCT LINE 01',
      icon: 'assets/products/robotics-kit.svg',
      desc: 'Four kit tiers, each building on the last — from a first motorized build to a competition-ready platform.',
      requirement: 'Robotics',
      items: [
        { name:'STARTER KIT', tag:'Beginner', desc:'Entry-level chassis, motors and sensors for first-time builders learning motion and control basics.' },
        { name:'LINE-FOLLOWER KIT', tag:'Guided Build', desc:'A guided build focused on sensor calibration and basic autonomous navigation logic.' },
        { name:'OBSTACLE-AVOIDANCE KIT', tag:'Intermediate', desc:'Ultrasonic sensing and reactive control for a mobile platform that senses its surroundings.' },
        { name:'COMPETITION-READY KIT', tag:'Advanced', desc:'A configurable platform built for robotics competitions and advanced project work.' }
      ]
    },
    iot: {
      title: 'IoT STARTER BOARDS',
      eyebrow: 'PRODUCT LINE 02',
      icon: 'assets/products/iot-board.svg',
      desc: 'Three board tiers for connected projects — from simple sensing to a multi-sensor gateway.',
      requirement: 'IoT',
      items: [
        { name:'BASIC SENSOR BOARD', tag:'Entry', desc:'Temperature, humidity and basic I/O for simple monitoring projects.' },
        { name:'WI-FI CONNECTED BOARD', tag:'Connected', desc:'Onboard wireless connectivity for cloud-linked, real-time data projects.' },
        { name:'MULTI-SENSOR GATEWAY BOARD', tag:'Advanced', desc:'Multiple sensor inputs routed through a single connected gateway for larger systems.' }
      ]
    },
    pcb: {
      title: 'CUSTOM PCB MODULES',
      eyebrow: 'PRODUCT LINE 03',
      icon: 'assets/products/pcb-module.svg',
      desc: 'Four module types covering common circuit needs, from simple prototypes to power control.',
      requirement: 'PCB Design',
      items: [
        { name:'SINGLE-LAYER PROTOTYPE BOARD', tag:'Prototype', desc:'Simple circuits and low-complexity prototype builds.' },
        { name:'DOUBLE-LAYER DESIGN BOARD', tag:'Standard', desc:'Denser routing for more complex embedded designs.' },
        { name:'SENSOR INTERFACE MODULE', tag:'Interface', desc:'Purpose-built boards for interfacing multiple sensors with a controller.' },
        { name:'POWER & CONTROL MODULE', tag:'Power', desc:'Boards designed around motor drivers, relays and power regulation.' }
      ]
    },
    '3d': {
      title: '3D PRINTED COMPONENT SETS',
      eyebrow: 'PRODUCT LINE 04',
      icon: 'assets/products/3d-component.svg',
      desc: 'Four categories of printed parts to support builds from enclosures to working mechanisms.',
      requirement: '3D Design',
      items: [
        { name:'ENCLOSURE SETS', tag:'Housing', desc:'Custom housings and protective casings for electronics and prototypes.' },
        { name:'MOUNTING & BRACKET SETS', tag:'Structural', desc:'Structural brackets and mounts for sensors, motors and frames.' },
        { name:'FUNCTIONAL MECHANISM PARTS', tag:'Mechanism', desc:'Gears, links and moving parts designed for working mechanisms.' },
        { name:'RAPID CONCEPT MODELS', tag:'Concept', desc:'Fast-turnaround prints for early-stage concept and form testing.' }
      ]
    }
  };

  const productModal = document.getElementById('productModal');
  const prodModalIcon = document.getElementById('prodModalIcon');
  const prodModalEyebrow = document.getElementById('prodModalEyebrow');
  const prodModalTitle = document.getElementById('prodModalTitle');
  const prodModalDesc = document.getElementById('prodModalDesc');
  const prodModalTiles = document.getElementById('prodModalTiles');
  let lastProductFocused = null;

  const requestQuote = (requirementValue) => {
    const requirementSelect = document.getElementById('f-requirement');
    const target = document.getElementById('contact');
    if(requirementSelect){
      const optionExists = Array.from(requirementSelect.options).some(o => o.value === requirementValue);
      if(optionExists){
        requirementSelect.value = requirementValue;
        requirementSelect.dispatchEvent(new Event('change'));
      }
    }
    if(target){
      const y = target.getBoundingClientRect().top + window.scrollY - (window.innerWidth > 900 ? 70 : 0);
      window.scrollTo({ top:y, behavior: prefersReduced ? 'auto' : 'smooth' });
    }
    setTimeout(() => document.getElementById('f-name')?.focus(), prefersReduced ? 0 : 600);
  };

  const openProductModal = (key, triggerEl) => {
    const data = PRODUCT_DATA[key];
    if(!data || !productModal) return;
    lastProductFocused = triggerEl || document.activeElement;
    prodModalIcon.src = data.icon;
    prodModalIcon.alt = data.title;
    prodModalEyebrow.textContent = data.eyebrow;
    prodModalTitle.textContent = data.title;
    prodModalDesc.textContent = data.desc;
    prodModalTiles.innerHTML = data.items.map(item => `
      <div class="product-tile">
        <div class="product-tile-img"><img src="${data.icon}" alt="${item.name}" loading="lazy"></div>
        <div class="product-tile-body">
          <span class="product-tile-tag">${item.tag}</span>
          <h4>${item.name}</h4>
          <p>${item.desc}</p>
          <button class="btn btn-ghost btn-sm" data-tile-quote="${data.requirement}">REQUEST QUOTE</button>
        </div>
      </div>
    `).join('');
    prodModalTiles.querySelectorAll('[data-tile-quote]').forEach(btn => {
      btn.addEventListener('click', () => {
        closeProductModal();
        requestQuote(btn.dataset.tileQuote);
      });
    });
    productModal.classList.add('open');
    document.body.classList.add('no-scroll');
    productModal.querySelector('.modal-close').focus();
  };
  const closeProductModal = () => {
    productModal.classList.remove('open');
    document.body.classList.remove('no-scroll');
    if(lastProductFocused) lastProductFocused.focus();
  };

  document.querySelectorAll('.product-card').forEach(card => {
    const key = card.dataset.product;
    const open = (e) => { if(e) e.preventDefault(); openProductModal(key, card); };
    card.querySelectorAll('[data-open-product]').forEach(btn => {
      btn.addEventListener('click', (e) => { e.stopPropagation(); open(e); });
    });
    card.addEventListener('click', (e) => {
      if(e.target.closest('[data-quote]')) return;
      open(e);
    });
    card.addEventListener('keydown', (e) => {
      if((e.key === 'Enter' || e.key === ' ') && !e.target.closest('button')){ e.preventDefault(); open(e); }
    });
  });
  if(productModal){
    productModal.querySelectorAll('[data-modal-close]').forEach(el => el.addEventListener('click', closeProductModal));
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape' && productModal.classList.contains('open')) closeProductModal();
    });
  }

  /* ---------- PRODUCT "REQUEST QUOTE" BUTTONS (card-level) ---------- */
  document.querySelectorAll('[data-quote]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      requestQuote(btn.dataset.quote);
    });
  });

  /* ---------- CHATBOT (free, rule-based assistant) ---------- */
  const chatToggle = document.getElementById('chatToggle');
  const chatPanel = document.getElementById('chatPanel');
  const chatClose = document.getElementById('chatClose');
  const chatBody = document.getElementById('chatBody');
  const chatQuick = document.getElementById('chatQuick');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatBadge = document.getElementById('chatBadge');

  if(chatToggle && chatPanel){
    const CHAT_QUICK_REPLIES = [
      { label:'Our Services', reply:'services' },
      { label:'Our Products', reply:'products' },
      { label:'Get a Quote', reply:'quote' },
      { label:'Contact Details', reply:'contact' }
    ];

    // Simple keyword-matched FAQ responses. This runs entirely in the browser —
    // no external API, no cost. To upgrade to a real AI assistant later, replace
    // the body of getBotReply() with a fetch() call to an LLM API of your choice.
    const getBotReply = (raw) => {
      const msg = raw.toLowerCase();
      if(/service|offer|what do you do|capab/.test(msg) || msg === 'services'){
        return "We work across Robotics & Automation, Embedded Systems, IoT, AI + Hardware, PCB Design, 3D Design & Printing, Project Development, and Training & Internships. Want me to jump you to the Services section?";
      }
      if(/product|kit|board|module/.test(msg) || msg === 'products'){
        return "We offer Robotics Learning Kits, IoT Starter Boards, Custom PCB Modules and 3D Printed Component Sets. Click any product card on the site to see the individual tiers.";
      }
      if(/quote|price|cost|pricing|how much/.test(msg) || msg === 'quote'){
        return "I can take you straight to our enquiry form — just tell me what it's for (e.g. training, a robotics project, PCB design) and I'll pre-fill it for you. Or click 'Get a Quote' below.";
      }
      if(/contact|phone|email|number|reach|call/.test(msg) || msg === 'contact'){
        return "You can reach ProtoLeap Innovations at 97471 19885 or protoleapinnovations@gmail.com. Want me to open the contact form instead?";
      }
      if(/training|internship|workshop|learn/.test(msg)){
        return "We run hands-on training, internships and workshops across robotics, embedded systems, IoT and AI. I can pre-fill an enquiry for Training if you'd like.";
      }
      if(/robot/.test(msg)){ return "Robotics is one of our core areas — from educational platforms to custom automation builds. Want to see our Robotics Learning Kits or request a quote?"; }
      if(/iot/.test(msg)){ return "Our IoT work covers connected sensors, monitoring and real-time systems. Take a look at the IoT Starter Boards in the Products section."; }
      if(/pcb|circuit/.test(msg)){ return "We design and fabricate custom PCBs — from single-layer prototypes to power control modules. Check out Custom PCB Modules in Products."; }
      if(/3d|print/.test(msg)){ return "We handle CAD modelling, mechanical design and 3D printing for prototypes and finished components."; }
      if(/hi|hello|hey/.test(msg)){ return "Hey there! I'm the ProtoLeap Assistant. Ask me about our services, products, or how to get a quote."; }
      if(/thank/.test(msg)){ return "Anytime! Let me know if there's anything else I can help with."; }
      return "I might not have that one covered yet — but our team can help directly. Try 97471 19885, protoleapinnovations@gmail.com, or use the contact form and we'll get back to you.";
    };

    const addMsg = (text, who) => {
      const el = document.createElement('div');
      el.className = 'chat-msg ' + who;
      el.textContent = text;
      chatBody.appendChild(el);
      chatBody.scrollTop = chatBody.scrollHeight;
    };
    const addTyping = () => {
      const el = document.createElement('div');
      el.className = 'chat-msg bot typing';
      el.innerHTML = '<span></span><span></span><span></span>';
      chatBody.appendChild(el);
      chatBody.scrollTop = chatBody.scrollHeight;
      return el;
    };
    const botRespond = (userText) => {
      const typingEl = addTyping();
      setTimeout(() => {
        typingEl.remove();
        addMsg(getBotReply(userText), 'bot');
        if(/quote/.test(userText.toLowerCase())){
          setTimeout(() => { closeChat(); requestQuote('Other'); }, 900);
        }
        if(/contact/.test(userText.toLowerCase()) && !/product|service/.test(userText.toLowerCase())){
          setTimeout(() => { closeChat(); requestQuote(''); }, 900);
        }
      }, prefersReduced ? 50 : 700 + Math.random() * 500);
    };
    const renderQuick = () => {
      chatQuick.innerHTML = '';
      CHAT_QUICK_REPLIES.forEach(q => {
        const b = document.createElement('button');
        b.className = 'chat-chip';
        b.type = 'button';
        b.textContent = q.label;
        b.addEventListener('click', () => {
          addMsg(q.label, 'user');
          botRespond(q.reply);
        });
        chatQuick.appendChild(b);
      });
    };

    let chatInitialized = false;
    const openChat = () => {
      chatPanel.classList.add('open');
      chatToggle.classList.add('open');
      chatToggle.setAttribute('aria-expanded', 'true');
      chatBadge.style.display = 'none';
      if(!chatInitialized){
        addMsg("Hi! I'm the ProtoLeap Assistant. Ask about our services, products, or how to get in touch.", 'bot');
        renderQuick();
        chatInitialized = true;
      }
      setTimeout(() => chatInput.focus(), 300);
    };
    const closeChat = () => {
      chatPanel.classList.remove('open');
      chatToggle.classList.remove('open');
      chatToggle.setAttribute('aria-expanded', 'false');
    };

    chatToggle.addEventListener('click', () => {
      chatPanel.classList.contains('open') ? closeChat() : openChat();
    });
    chatClose.addEventListener('click', closeChat);
    document.addEventListener('keydown', (e) => { if(e.key === 'Escape' && chatPanel.classList.contains('open')) closeChat(); });

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = chatInput.value.trim();
      if(!val) return;
      addMsg(val, 'user');
      chatInput.value = '';
      botRespond(val);
    });
  }

  /* ---------- FOOTER YEAR ---------- */
  const copyYear = document.getElementById('copyYear');
  if(copyYear) copyYear.textContent = new Date().getFullYear();

  /* ---------- 17. BACK TO TOP ---------- */
  const backToTop = document.getElementById('backToTop');
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top:0, behavior: prefersReduced ? 'auto' : 'smooth' });
  });

  /* ---------- 18. REDUCED MOTION HANDLING ---------- */
  if(prefersReduced){
    document.querySelectorAll('.tech-tile').forEach(t => t.style.animation = 'none');
    document.querySelector('.scroll-cue span')?.style.setProperty('animation', 'none');
  }

});
