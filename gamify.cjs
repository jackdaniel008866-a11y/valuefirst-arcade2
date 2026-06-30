const fs = require('fs');

let html = fs.readFileSync('/Users/nitinverma/Downloads/Game/index.html', 'utf8');

// 1. Add CSS
const newCSS = `
  /* ── FORM ANIMATIONS & GAMIFICATION ── */
  .form-progress-bar {
    width: 100%; height: 6px; background: rgba(255,255,255,0.1);
    border-radius: 6px; margin-bottom: 24px; overflow: hidden;
    position: relative;
  }
  .form-progress-fill {
    height: 100%; width: 0%; background: var(--g);
    border-radius: 6px; transition: width 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    box-shadow: 0 0 10px var(--g);
  }
  .form-row.anim-enter { opacity: 0; transform: translateY(20px); }
  @keyframes formCascade {
    to { opacity: 1; transform: translateY(0); }
  }
  .form-card input:focus, .form-card select:focus {
    border-color: var(--g);
    box-shadow: 0 0 15px rgba(242,101,34,0.3), inset 0 0 0 1px var(--g);
    background: rgba(255,255,255,0.1);
  }
  .btn-locked {
    background: rgba(255,255,255,0.1) !important;
    color: rgba(255,255,255,0.4) !important;
    cursor: not-allowed !important;
    box-shadow: none !important;
    transform: none !important;
  }
  .btn-unlock-anim {
    animation: btnUnlockPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }
  @keyframes btnUnlockPop {
    0% { transform: scale(0.95); }
    50% { transform: scale(1.05); box-shadow: 0 0 40px var(--g); }
    100% { transform: scale(1); box-shadow: 0 0 20px rgba(242,101,34,0.4); }
  }
  .fr-locked::after {
    content: '🔒'; position: absolute; right: 12px; top: 38px;
    font-size: 14px; opacity: 0.5; transition: all 0.3s; pointer-events: none;
  }
  .fr-unlocked::after {
    content: '🔓'; opacity: 1; color: var(--g); filter: drop-shadow(0 0 5px var(--g));
  }
`;
html = html.replace('</style>', newCSS + '\n</style>');

// 2. Update HTML
html = html.replace(
  '<div class="fs">STEP 1 OF 2 · REGISTER TO PLAY</div>\n      <h2 class="ft">Who are you?</h2>',
  '<div class="fs">STEP 1 OF 2 · PROFILE CREATION</div>\n      <div class="form-progress-bar"><div class="form-progress-fill" id="form-prog"></div></div>\n      <h2 class="ft">PLAYER REGISTRATION</h2>'
);

// Add fr-locked classes to form rows for the lock icon, and anim-enter
html = html.replace(/<div class="fr">/g, '<div class="fr fr-locked anim-enter" style="position:relative;">');
// The checkbox row
html = html.replace('<div class="con-row">', '<div class="con-row anim-enter">');

// Update Submit button
html = html.replace(
  '<button class="btn-p" onclick="submitLead()" style="width:100%;justify-content:center;">Unlock the Game →</button>',
  '<button class="btn-p btn-locked anim-enter" id="btn-submit-lead" onclick="submitLead()" style="width:100%;justify-content:center;">🔒 Awaiting Data...</button>'
);

// 3. Add JS
const newJS = `
// Form tracking logic
function checkFormProgress() {
  const fields = ['ff-fn', 'ff-ln', 'ff-em', 'ff-ph', 'ff-co', 'ff-ind'];
  let filled = 0;
  fields.forEach(id => {
    const el = document.getElementById(id);
    const fr = el ? el.closest('.fr') : null;
    if (el && el.value.trim().length > 0) {
      filled++;
      if (fr) { fr.classList.remove('fr-locked'); fr.classList.add('fr-unlocked'); }
    } else {
      if (fr) { fr.classList.add('fr-locked'); fr.classList.remove('fr-unlocked'); }
    }
  });
  
  const progress = (filled / fields.length) * 100;
  const progBar = document.getElementById('form-prog');
  if (progBar) progBar.style.width = progress + '%';
  
  const btn = document.getElementById('btn-submit-lead');
  if (btn) {
    if (filled === fields.length) {
      if (btn.classList.contains('btn-locked')) {
        btn.classList.remove('btn-locked');
        btn.classList.add('btn-unlock-anim');
        btn.innerHTML = 'Unlock the Game 🔓';
      }
    } else {
      btn.classList.add('btn-locked');
      btn.classList.remove('btn-unlock-anim');
      btn.innerHTML = '🔒 Awaiting Data...';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ['ff-fn', 'ff-ln', 'ff-em', 'ff-ph', 'ff-co', 'ff-ind'].forEach(id => {
    const el = document.getElementById(id);
    if(el) {
      el.addEventListener('input', checkFormProgress);
      el.addEventListener('change', checkFormProgress);
    }
  });
});

// Trigger animations on screen show
const originalShowScreen = showScreen;
window.showScreen = function(id) {
  originalShowScreen(id);
  if (id === 'lead-form-screen') {
    const rows = document.querySelectorAll('#lead-form-screen .anim-enter');
    rows.forEach((r, i) => {
      r.style.animation = \`formCascade 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards \${i * 0.08}s\`;
    });
    checkFormProgress();
  }
}
`;
html = html.replace('// Initialize particles', newJS + '\n// Initialize particles');

fs.writeFileSync('/Users/nitinverma/Downloads/Game/index.html', html);
