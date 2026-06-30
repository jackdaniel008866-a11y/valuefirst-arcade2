const fs = require('fs');

let html = fs.readFileSync('/Users/nitinverma/Downloads/Game/index.html', 'utf8');

// Update CSS
// Change form-card max-width and add flex
html = html.replace(
  '.form-card{background:var(--n1);border:1px solid rgba(255,255,255,0.7);border-radius:28px;padding:24px 32px;max-width:530px;width:100%;backdrop-filter: blur(24px);',
  '.form-card{background:var(--n1);border:1px solid rgba(255,255,255,0.7);border-radius:28px;padding:0;max-width:900px;width:100%;display:flex;overflow:hidden;backdrop-filter: blur(24px);'
);

// Add Avatar CSS
const avatarCSS = `
  .avatar-col {
    width: 40%; background: #ffffff;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    position: relative; border-right: 1px solid rgba(0,0,0,0.08);
  }
  .form-col {
    width: 60%; padding: 30px 40px; position: relative;
  }
  .avatar-carousel {
    width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; position: relative;
  }
  .avatar-img {
    width: 90%; max-height: 80%; object-fit: contain; mix-blend-mode: multiply; transition: opacity 0.3s, transform 0.5s;
  }
  .avatar-nav {
    position: absolute; bottom: 30px; display: flex; gap: 10px; align-items: center; justify-content: center; width: 100%;
  }
  .avatar-btn {
    background: rgba(0,0,0,0.05); border: none; width: 36px; height: 36px; border-radius: 50%;
    cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 16px; transition: all 0.2s;
  }
  .avatar-btn:hover { background: rgba(0,0,0,0.1); transform: scale(1.1); }
  .avatar-label {
    position: absolute; top: 30px; left: 0; width: 100%; text-align: center;
    font-weight: 800; font-size: 24px; color: #2A3374; text-transform: uppercase; letter-spacing: 1px;
  }
  @media(max-width: 800px) {
    .form-card { flex-direction: column; }
    .avatar-col { width: 100%; height: 250px; border-right: none; border-bottom: 1px solid rgba(0,0,0,0.08); }
    .form-col { width: 100%; padding: 24px 20px; }
  }
`;
html = html.replace('/* ── FORM ANIMATIONS & GAMIFICATION ── */', avatarCSS + '\n  /* ── FORM ANIMATIONS & GAMIFICATION ── */');

// Update HTML Structure
const formStartStr = '<div class="fs">STEP 1 OF 2 · PROFILE CREATION</div>';
const splitHTML = `
      <div class="avatar-col">
        <div class="avatar-label" id="av-label">THE STRATEGIST</div>
        <div class="avatar-carousel">
          <img src="/avatar_strategist.png" class="avatar-img" id="av-img" />
        </div>
        <div class="avatar-nav">
          <button class="avatar-btn" onclick="prevAvatar()">◀</button>
          <div style="display:flex;gap:6px;" id="av-dots">
             <div style="width:8px;height:8px;border-radius:50%;background:var(--g);"></div>
             <div style="width:8px;height:8px;border-radius:50%;background:rgba(0,0,0,0.1);"></div>
             <div style="width:8px;height:8px;border-radius:50%;background:rgba(0,0,0,0.1);"></div>
          </div>
          <button class="avatar-btn" onclick="nextAvatar()">▶</button>
        </div>
      </div>
      <div class="form-col">
        <div class="fs">STEP 1 OF 2 · PROFILE CREATION</div>`;

html = html.replace(formStartStr, splitHTML);

const formEndStr = '<button class="btn-p btn-locked anim-enter" id="btn-submit-lead" onclick="submitLead()" style="width:100%;justify-content:center;">🔒 Awaiting Data...</button>\n    </div>\n  </div>\n</div>';
const formEndSplitStr = '<button class="btn-p btn-locked anim-enter" id="btn-submit-lead" onclick="submitLead()" style="width:100%;justify-content:center;">🔒 Awaiting Data...</button>\n      </div>\n    </div>\n  </div>\n</div>';
html = html.replace(formEndStr, formEndSplitStr);


// Add JS for avatars
const avatarJS = `
// Avatar selection logic
const avatars = [
  { id: 'strategist', name: 'The Strategist', src: '/avatar_strategist.png' },
  { id: 'marketer', name: 'The Marketer', src: '/avatar_marketer.png' },
  { id: 'developer', name: 'The Developer', src: '/avatar_developer.png' }
];
let currentAvatarIdx = 0;

function updateAvatarUI() {
  const img = document.getElementById('av-img');
  const lbl = document.getElementById('av-label');
  const dots = document.getElementById('av-dots');
  if(!img || !lbl || !dots) return;
  
  img.style.opacity = '0';
  img.style.transform = 'scale(0.95)';
  
  setTimeout(() => {
    img.src = avatars[currentAvatarIdx].src;
    lbl.textContent = avatars[currentAvatarIdx].name;
    img.style.opacity = '1';
    img.style.transform = 'scale(1)';
    
    // update dots
    dots.innerHTML = '';
    avatars.forEach((a, i) => {
      const d = document.createElement('div');
      d.style.width = '8px'; d.style.height = '8px'; d.style.borderRadius = '50%';
      d.style.background = i === currentAvatarIdx ? 'var(--g)' : 'rgba(0,0,0,0.1)';
      d.style.transition = 'background 0.3s';
      dots.appendChild(d);
    });
  }, 150); // wait for fade out
}

window.nextAvatar = function() {
  currentAvatarIdx = (currentAvatarIdx + 1) % avatars.length;
  updateAvatarUI();
};

window.prevAvatar = function() {
  currentAvatarIdx = (currentAvatarIdx - 1 + avatars.length) % avatars.length;
  updateAvatarUI();
};

`;
html = html.replace('// Form tracking logic', avatarJS + '\n// Form tracking logic');

fs.writeFileSync('/Users/nitinverma/Downloads/Game/index.html', html);

