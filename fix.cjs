const fs = require('fs');

let html = fs.readFileSync('/Users/nitinverma/Downloads/Game/index.html', 'utf8');

// 1. Add missing CSS
const missingCSS = `
  /* ── TUTORIAL OVERLAY ── */
  #tutorial-overlay {
    position: fixed; inset: 0; z-index: 1000; display: none; pointer-events: none;
  }
  .tutorial-hole {
    position: absolute; border: 3px solid var(--g);
    border-radius: var(--r); box-shadow: 0 0 0 9999px rgba(17,22,51,0.75);
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    pointer-events: auto;
  }
  .tutorial-tooltip {
    position: absolute; background: #fff; padding: 20px;
    border-radius: var(--r); max-width: 320px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3); z-index: 1001;
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    pointer-events: auto;
  }
  .tutorial-title { font-family: 'Space Grotesk', sans-serif; font-size: 16px; font-weight: 700; color: var(--tx); margin-bottom: 8px; }
  .tutorial-desc { font-size: 13px; color: var(--mu); line-height: 1.5; margin-bottom: 16px; }
  .tutorial-btn {
    background: var(--g); color: #fff; border: none; border-radius: 20px;
    padding: 8px 20px; font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s;
  }
  .tutorial-btn:hover { background: var(--gd); }
  .arcade-card {
    background: rgba(255, 255, 255, 0.55);
    backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 28px;
    padding: 36px 44px;
    box-shadow: 0 20px 60px rgba(42, 51, 116, 0.08), 0 0 40px rgba(242,101,34,0.04), inset 0 0 0 1px rgba(255,255,255,0.8);
    max-width: 780px;
    margin: 10px auto;
    position: relative;
    z-index: 10;
  }
`;
html = html.replace('</style>', missingCSS + '\n</style>');

// 2. Add Tutorial HTML
const tutorialHTML = `
<!-- ── TUTORIAL OVERLAY ── -->
<div id="tutorial-overlay">
  <div class="tutorial-hole" id="tut-hole"></div>
  <div class="tutorial-tooltip" id="tut-tip">
    <div class="tutorial-title" id="tut-title">Welcome</div>
    <div class="tutorial-desc" id="tut-desc">Instructions here</div>
    <button class="tutorial-btn" onclick="nextTutorialStep()">Next →</button>
  </div>
</div>
`;
html = html.replace('</body>', tutorialHTML + '\n</body>');

// 3. Add JS functions
const missingJS = `
// Particles and Floating Icons
const canvas = document.getElementById('splash-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let particles = [];

function resizeCanvas() {
  if(!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  if(!canvas) return;
  particles = [];
  for(let i=0; i<60; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    });
  }
}

function animate() {
  if(!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(242, 101, 34, 0.5)';
  
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if(p.x < 0) p.x = canvas.width;
    if(p.x > canvas.width) p.x = 0;
    if(p.y < 0) p.y = canvas.height;
    if(p.y > canvas.height) p.y = 0;
    
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });
  
  ctx.strokeStyle = 'rgba(42, 51, 116, 0.05)';
  ctx.lineWidth = 1;
  for(let i=0; i<particles.length; i++) {
    for(let j=i+1; j<particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
}

function createFloatingIcons() {
  const container = document.getElementById('floating-icons');
  if(!container) return;
  container.innerHTML = '';
  const icons = ['🛒', '📢', '🤖', '💳', '✅', '⏰', '⭐', '👤', '🛍️', '🔐'];
  for(let i=0; i<15; i++) {
    const el = document.createElement('div');
    el.className = 'float-icon';
    el.textContent = icons[Math.floor(Math.random() * icons.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDuration = (15 + Math.random() * 20) + 's';
    el.style.animationDelay = (Math.random() * -20) + 's';
    container.appendChild(el);
  }
}

// Tutorial Logic
let tutStep = 0;
const tutSteps = [
  { target: '.sc-panel', title: 'Understand the Goal', desc: 'Read the business challenge and look at the hint to figure out the right sequence of touchpoints.', pos: 'right' },
  { target: '.tray-panel', title: 'Pick the Touchpoints', desc: 'Drag the correct tools from the tray onto the empty slots on the board.', pos: 'left' },
  { target: '#j-lane', title: 'Build the Journey', desc: 'Drop the cards here. Once all slots are filled, submit your answer!', pos: 'top' },
  { target: '.timer-w', title: 'Beat the Clock', desc: 'You have 45 seconds. The faster you solve it, the more points you get. Good luck!', pos: 'bottom' }
];

function startTutorial() {
  tutStep = 0;
  const ov = document.getElementById('tutorial-overlay');
  if(ov) ov.style.display = 'block';
  showTutorialStep();
}

function showTutorialStep() {
  if (tutStep >= tutSteps.length) {
    const ov = document.getElementById('tutorial-overlay');
    if(ov) ov.style.display = 'none';
    startTimer(); // start game timer after tutorial
    return;
  }
  const s = tutSteps[tutStep];
  const el = document.querySelector(s.target);
  if (!el) { nextTutorialStep(); return; }
  
  const rect = el.getBoundingClientRect();
  const hole = document.getElementById('tut-hole');
  if(hole) {
    hole.style.top = (rect.top - 5) + 'px';
    hole.style.left = (rect.left - 5) + 'px';
    hole.style.width = (rect.width + 10) + 'px';
    hole.style.height = (rect.height + 10) + 'px';
  }

  const tt = document.getElementById('tut-title');
  const td = document.getElementById('tut-desc');
  if(tt) tt.textContent = s.title;
  if(td) td.textContent = s.desc;

  const tip = document.getElementById('tut-tip');
  if(tip) {
    if (s.pos === 'right') {
      tip.style.left = (rect.right + 20) + 'px';
      tip.style.top = rect.top + 'px';
    } else if (s.pos === 'left') {
      tip.style.left = (rect.left - 340) + 'px'; // 320 max width + 20 margin
      tip.style.top = rect.top + 'px';
    } else if (s.pos === 'bottom') {
      tip.style.top = (rect.bottom + 20) + 'px';
      tip.style.left = rect.left + 'px';
    } else {
      tip.style.top = (rect.top - 180) + 'px';
      tip.style.left = rect.left + 'px';
    }
  }
}

function nextTutorialStep() {
  tutStep++;
  showTutorialStep();
}
`;

html = html.replace('// Initialize particles', missingJS + '\n// Initialize particles');

// Fix startIndustry to show tutorial instead of starting timer directly
html = html.replace('loadRound(0);\n    showScreen(\'game-screen\');', 'loadRound(0);\n    showScreen(\'game-screen\');\n    // Check if we should show tutorial\n    if (!S.hasSeenTutorial) {\n      S.hasSeenTutorial = true;\n      setTimeout(startTutorial, 300);\n    } else {\n      startTimer();\n    }');

// The original loadRound has startTimer() at the end. We need to prevent it if tutorial is showing.
html = html.replace('updateChkBtn();\n  startTimer();', 'updateChkBtn();\n  if (S.hasSeenTutorial) startTimer();');

// In startIndustry, we set hasSeenTutorial to true, but we need it in the State object.
html = html.replace('pendingCb:null,   // safe callback store for reveal overlay', 'pendingCb:null, hasSeenTutorial:false, // safe callback store');

// Ensure particles are started correctly (already there at the end of index.html but we re-added functions)

fs.writeFileSync('/Users/nitinverma/Downloads/Game/index.html', html);
