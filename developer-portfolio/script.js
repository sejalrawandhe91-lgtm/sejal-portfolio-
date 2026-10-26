/**
 * MINIMALIST DEVELOPER PORTFOLIO JAVASCRIPT
 * Inspired by Sejal rawandhe Portfolio
 * Features:
 * - Theme Switcher (Persistent Light/Dark Mode)
 * - Typewriter Role Cycle
 * - Live Timezone Clock
 * - GitHub Contributions Heatmap (API + Seeded Fallback)
 * - 2D Pixel Art Canvas Animation (Runner with Sword, Bunny, Birds, Parallax Clouds)
 * - Click-to-copy Email & Direct Cal.com Booking
 * - Scroll Reveal Observer
 */

/* ============================================================
   USER CONFIGURATION
   Customize your portfolio details easily in this single block!
   ============================================================ */
const CONFIG = {
  name: 'Sejal Rawandhe ',
  initials: 'SR',
  brandLogo: 'sejalrawandhe.',
  roles: [
    'Full Stack Developer focused in Backend',
    'Low-level Systems Nerd',
    'Selfhosting Enthusiast',
    'AI & Web Applications Builder'
  ],
  email: 'sejalrawandhe91@gmail.com',
  github: 'sejalrawandhe91-lgtm',
  timeZone: 'Asia/Kolkata',
  timeZoneLabel: 'IST',
  location: 'Chhattisgarh, India',
  pronouns: 'he/him',
  cal15: 'https://cal.com/sejal rawandhe/15min',
  cal30: 'https://cal.com/sejal rawandhe/30min',
  counterNS: 'sejal rawandhe-portfolio',
  counterKey: 'visits'
};

document.addEventListener('DOMContentLoaded', () => {
  initUserProfile();
  initTheme();
  initTypewriter();
  initClock();
  initHeatmap();
  initConnectActions();
  initVisitorCounter();
  initScrollReveal();
  initCanvasRunner();
});

/* ============================================================
   1. USER PROFILE SYNC
   ============================================================ */
function initUserProfile() {
  const brandLogo = document.getElementById('brandLogo');
  if (brandLogo) brandLogo.textContent = CONFIG.brandLogo;

  const userName = document.getElementById('userName');
  if (userName) userName.textContent = CONFIG.name;

  const userAvatar = document.getElementById('userAvatar');
  if (userAvatar) userAvatar.textContent = CONFIG.initials;

  const infoLocation = document.getElementById('infoLocation');
  if (infoLocation) infoLocation.textContent = CONFIG.location;

  const infoEmail = document.getElementById('infoEmail');
  if (infoEmail) infoEmail.textContent = CONFIG.email;

  const infoPronouns = document.getElementById('infoPronouns');
  if (infoPronouns) infoPronouns.textContent = CONFIG.pronouns;
}

/* ============================================================
   2. THEME SWITCHER
   ============================================================ */
function initTheme() {
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    html.setAttribute('data-theme', 'dark');
  } else {
    html.removeAttribute('data-theme');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = html.getAttribute('data-theme') === 'dark';
      if (isDark) {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }
}

/* ============================================================
   3. TYPEWRITER EFFECT
   ============================================================ */
function initTypewriter() {
  const roleEl = document.getElementById('roleText');
  if (!roleEl || !CONFIG.roles.length) return;

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const currentRole = CONFIG.roles[roleIdx];

    if (isDeleting) {
      roleEl.textContent = currentRole.slice(0, charIdx--);
    } else {
      roleEl.textContent = currentRole.slice(0, charIdx++);
    }

    if (!isDeleting && charIdx === currentRole.length + 1) {
      isDeleting = true;
      setTimeout(type, 1800); // Pause before backspacing
      return;
    }

    if (isDeleting && charIdx < 0) {
      isDeleting = false;
      charIdx = 0;
      roleIdx = (roleIdx + 1) % CONFIG.roles.length;
      setTimeout(type, 350); // Pause before next word
      return;
    }

    setTimeout(type, isDeleting ? 40 : 80);
  }

  type();
}

/* ============================================================
   4. LIVE TIMEZONE CLOCK
   ============================================================ */
function initClock() {
  const clockEl = document.getElementById('localTime');
  if (!clockEl) return;

  function updateClock() {
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: CONFIG.timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      clockEl.textContent = `${formatter.format(new Date())} ${CONFIG.timeZoneLabel}`;
    } catch {
      clockEl.textContent = new Date().toLocaleTimeString();
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ============================================================
   5. GITHUB CONTRIBUTION HEATMAP
   ============================================================ */
function initHeatmap() {
  const grid = document.getElementById('heatGrid');
  const countLabel = document.getElementById('contribCount');
  if (!grid) return;

  function renderCells(levels) {
    grid.innerHTML = '';
    for (let i = 0; i < levels.length; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      const lvl = Math.max(0, Math.min(4, levels[i] | 0));
      cell.style.background = `var(--hm-${lvl})`;
      grid.appendChild(cell);
    }
  }

  // Realistic seeded distribution fallback
  function renderFallback() {
    const totalCols = 53;
    const seedBase = 9973;
    let seed = 1234567;
    const random = () => {
      seed = (seed * seedBase + 12345) % 2147483647;
      return seed / 2147483647;
    };

    const levels = [];
    let estimatedCount = 0;

    for (let c = 0; c < totalCols; c++) {
      for (let r = 0; r < 7; r++) {
        const v = random();
        let lvl = 0;
        if (v > 0.62) lvl = 1;
        if (v > 0.80) lvl = 2;
        if (v > 0.90) lvl = 3;
        if (v > 0.965) lvl = 4;
        levels.push(lvl);
        if (lvl > 0) estimatedCount += lvl * 2;
      }
    }

    renderCells(levels);
    if (countLabel) {
      countLabel.textContent = `${estimatedCount.toLocaleString()} contributions in the last year`;
    }
  }

  // Fetch real GitHub contribution data via public proxy
  fetch(`https://github-contributions-api.jogruber.de/v4/${CONFIG.github}?y=last`)
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .then(data => {
      const days = Array.isArray(data && data.contributions) ? data.contributions : null;
      if (!days || !days.length) throw new Error('No data');
      const lastYear = days.slice(-371);
      const total = lastYear.reduce((sum, item) => sum + (Number(item.count) || 0), 0);
      renderCells(lastYear.map(item => Number(item.level) || 0));
      if (countLabel) {
        countLabel.textContent = `${total.toLocaleString()} contributions in the last year`;
      }
    })
    .catch(() => {
      renderFallback();
    });
}

/* ============================================================
   6. CONTACT & BOOKING ACTIONS
   ============================================================ */
function initConnectActions() {
  const emailChip = document.getElementById('emailChip');
  const emailText = document.getElementById('emailText');
  const copyToast = document.getElementById('copyToast');

  if (emailText) emailText.textContent = CONFIG.email;

  if (emailChip) {
    emailChip.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(CONFIG.email).then(() => {
        if (copyToast) {
          copyToast.classList.add('show');
          setTimeout(() => copyToast.classList.remove('show'), 2000);
        }
      }).catch(() => {
        window.location.href = `mailto:${CONFIG.email}`;
      });
    });
  }

  function wireBooking(elementId, url, mins) {
    const btn = document.getElementById(elementId);
    if (!btn) return;
    if (url) {
      btn.href = url;
    } else {
      btn.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(`Booking a ${mins}-min call`)}&body=${encodeURIComponent(`Hi ${CONFIG.name},\n\nI'd like to book a ${mins}-minute call. A few times that work for me:\n\n`)}`;
      btn.removeAttribute('target');
    }
  }

  wireBooking('book15', CONFIG.cal15, 15);
  wireBooking('book30', CONFIG.cal30, 30);
}

/* ============================================================
   7. VISITOR COUNTER
   ============================================================ */
function initVisitorCounter() {
  const numEl = document.getElementById('visitorNum');
  const ordEl = document.getElementById('visitorOrd');
  if (!numEl) return;

  function getOrdinal(n) {
    const s = n % 100;
    if (s >= 11 && s <= 13) return 'th';
    switch (n % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  function render(count) {
    numEl.textContent = count.toLocaleString();
    if (ordEl) ordEl.textContent = getOrdinal(count);
  }

  let cachedCount = null;
  try {
    cachedCount = localStorage.getItem('visitorCount');
  } catch {}

  const baseUrl = `https://api.counterapi.dev/v1/${CONFIG.counterNS}/${CONFIG.counterKey}/`;
  const targetUrl = cachedCount ? baseUrl : baseUrl + 'up';

  fetch(targetUrl)
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .then(data => {
      const val = data && (data.count != null ? data.count : data.value);
      if (val == null || isNaN(val)) throw new Error('Bad payload');
      const count = Number(val);
      if (!cachedCount) {
        try { localStorage.setItem('visitorCount', String(count)); } catch {}
      }
      render(count);
    })
    .catch(() => {
      render(cachedCount ? Number(cachedCount) : 1042);
    });
}

/* ============================================================
   8. SCROLL REVEAL (INTERSECTION OBSERVER)
   ============================================================ */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.rv').forEach(el => observer.observe(el));
}

/* ============================================================
   9. SWORD RUNNER PIXEL ART CANVAS ANIMATION
   Looping 2D pixel knight with sword, hopping pet companion,
   gliding birds, and parallax drifting clouds. Pure Canvas 2D.
   ============================================================ */
function initCanvasRunner() {
  const canvas = document.getElementById('runnerCanvas');
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext('2d');
  const W = canvas.width;  // 1920
  const H = canvas.height; // 200
  const groundY = Math.round(H * 0.68); // Matches CSS gradient split (68%)

  function getThemeColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return isDark ? {
      body: '#ece5d5',
      dark: '#c9b98f',
      blade: '#cfd6dd',
      hilt: '#8a6a3a',
      ground: '#2b2a20',
      cloud: 'rgba(236,229,213,0.14)',
      bird: '#b0a578',
      animal: '#c9b98f'
    } : {
      body: '#222018',
      dark: '#4f4a3f',
      blade: '#8f9aa5',
      hilt: '#8a6a3a',
      ground: '#c9b389',
      cloud: 'rgba(120,110,90,0.16)',
      bird: '#6f6858',
      animal: '#8a6a3a'
    };
  }

  // Parallax Clouds
  const clouds = [
    { x: 180, y: 34, s: 1.2, speed: 8 },
    { x: 620, y: 52, s: 0.9, speed: 6 },
    { x: 1080, y: 28, s: 1.4, speed: 10 },
    { x: 1540, y: 46, s: 1.0, speed: 7 }
  ];

  function drawCloud(cx, cy, scale, color) {
    ctx.fillStyle = color;
    const u = 10 * scale;
    ctx.fillRect(cx, cy, u * 4, u);
    ctx.fillRect(cx + u, cy - u, u * 2, u);
    ctx.fillRect(cx + u * 0.5, cy + u, u * 3, u);
  }

  // Little trailing pet bunny
  function drawAnimal(ax, ay, hopPhase, color) {
    const u = 5;
    const y = ay - Math.round(Math.abs(Math.sin(hopPhase)) * 8);
    ctx.fillStyle = color;
    ctx.fillRect(ax, y - u * 2, u * 3, u * 2);      // Body
    ctx.fillRect(ax + u * 2, y - u * 3, u * 2, u);  // Head
    ctx.fillRect(ax + u * 3, y - u * 5, u, u * 2);  // Ear
    ctx.fillRect(ax - u, y, u * 2, u);              // Back foot
    ctx.fillRect(ax + u * 3, y, u, u);              // Front foot
  }

  // Sky birds gliding
  function drawBird(bx, by, flapPhase, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    const wingWidth = 6 + Math.sin(flapPhase) * 3;
    const wingY = Math.sin(flapPhase) > 0 ? 3 : -1;
    ctx.beginPath();
    ctx.moveTo(bx - wingWidth, by + wingY);
    ctx.lineTo(bx, by);
    ctx.lineTo(bx + wingWidth, by + wingY);
    ctx.stroke();
  }

  // Pixel grid helper
  const P = 6; // Pixel block size
  function px(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), w * P, h * P);
  }

  // Runner character with sword
  function drawRunner(fx, fy, runPhase, colors) {
    const swing = Math.sin(runPhase);
    const verticalBob = Math.round(Math.abs(Math.cos(runPhase)) * -3);
    const bx = fx;
    const by = fy + verticalBob;

    // Alternating legs
    const legL = Math.round(swing * 3);
    const legR = Math.round(-swing * 3);
    px(bx - 3 * P + legL, by - 3 * P, 2, 3, colors.dark); // Back leg
    px(bx + 1 * P + legR, by - 3 * P, 2, 3, colors.body); // Front leg

    // Torso
    px(bx - 3 * P, by - 8 * P, 6, 5, colors.body);

    // Head & eye
    px(bx - 2 * P, by - 12 * P, 4, 4, colors.body);
    px(bx + 1 * P, by - 11 * P, 1, 1, colors.dark);

    // Back arm (swings backwards)
    const armB = Math.round(-swing * 2);
    px(bx - 4 * P, by - 8 * P + armB, 2, 2, colors.dark);

    // Front arm with raised sword (swings forwards)
    const armF = Math.round(swing * 2);
    const handX = bx + 3 * P;
    const handY = by - 7 * P + armF;

    px(bx + 2 * P, by - 8 * P + armF, 2, 2, colors.body); // Upper arm
    px(handX, handY + 1 * P, 1, 1, colors.hilt);          // Grip
    px(handX - 1 * P, handY, 3, 1, colors.hilt);          // Crossguard
    px(handX + 1 * P, handY - 3 * P, 1, 5, colors.blade); // Blade
    px(handX + 1 * P, handY - 4 * P, 1, 1, colors.blade); // Tip
  }

  let posX = -60;
  const speed = 150; // Pixels per second
  let lastTimestamp = null;
  let phase = 0;
  let isRunning = true;

  function renderFrame(timestamp) {
    if (!isRunning) return;

    if (lastTimestamp == null) lastTimestamp = timestamp;
    const dt = Math.min(0.05, (timestamp - lastTimestamp) / 1000);
    lastTimestamp = timestamp;

    const colors = getThemeColors();
    ctx.clearRect(0, 0, W, H);

    // 1. Drifting Clouds
    for (const c of clouds) {
      c.x -= c.speed * dt;
      if (c.x < -80) c.x = W + 60;
      drawCloud(c.x, c.y, c.s, colors.cloud);
    }

    // 2. Gliding Birds
    for (let i = 0; i < 3; i++) {
      const birdX = ((i * 520) - (posX * 0.5)) % (W + 80);
      const wrappedX = birdX < 0 ? birdX + W + 80 : birdX;
      drawBird(wrappedX, 58 + (i % 2) * 22, phase * 1.6 + i, colors.bird);
    }

    // 3. Ground Line & Decorative Ground Tufts
    ctx.fillStyle = colors.ground;
    ctx.fillRect(0, groundY, W, 3);

    ctx.fillStyle = colors.dark;
    for (let i = 0; i < 8; i++) {
      const tuftX = ((i * 140) - (posX * 0.4)) % (W + 40);
      const rx = tuftX < 0 ? tuftX + W + 40 : tuftX;
      ctx.fillRect(rx, groundY - 4, 6, 4);
    }

    // 4. Update Positions
    posX += speed * dt;
    phase += dt * 9;
    if (posX > W + 60) posX = -60;

    // 5. Trailing Companion Pet
    let petX = posX - 130;
    if (petX < -40) petX += (W + 100);
    drawAnimal(petX, groundY, phase * 0.8, colors.animal);

    // 6. Knight Runner
    drawRunner(posX, groundY, phase, colors);

    requestAnimationFrame(renderFrame);
  }

  // Performance: Pause animation when off-screen
  const visibilityObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!isRunning) {
          isRunning = true;
          lastTimestamp = null;
          requestAnimationFrame(renderFrame);
        }
      } else {
        isRunning = false;
      }
    });
  }, { threshold: 0.05 });

  visibilityObserver.observe(canvas);
  requestAnimationFrame(renderFrame);
}
