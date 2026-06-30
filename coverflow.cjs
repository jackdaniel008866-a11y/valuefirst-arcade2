const fs = require('fs');
let html = fs.readFileSync('/Users/nitinverma/Downloads/Game/index.html', 'utf8');

// 1. Add Coverflow CSS
const coverflowCSS = `
/* ── COVERFLOW ── */
.coverflow-container {
  display: flex; flex: 1; align-items: center; justify-content: center;
  position: relative; overflow: hidden; perspective: 1200px;
  background: radial-gradient(circle at center, #ffffff 0%, #f0f4ff 100%);
  width: 100%; min-height: 500px;
}
.cover-item {
  position: absolute; width: 340px; height: 460px;
  background: white; border-radius: 24px; padding: 40px 30px;
  box-shadow: 0 20px 50px rgba(42,51,116,0.08);
  display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
  transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  transform-style: preserve-3d; border: 1px solid rgba(0,0,0,0.05);
  cursor: pointer;
}
.cover-item.active {
  z-index: 10; transform: translateX(0) scale(1) rotateY(0deg);
  box-shadow: 0 30px 60px rgba(242,101,34,0.15), 0 0 0 2px var(--g);
}
.cover-item.prev {
  z-index: 5; transform: translateX(-240px) scale(0.8) rotateY(20deg); opacity: 0.6;
}
.cover-item.next {
  z-index: 5; transform: translateX(240px) scale(0.8) rotateY(-20deg); opacity: 0.6;
}
.cover-item.hidden-left {
  z-index: 1; transform: translateX(-400px) scale(0.6) rotateY(40deg); opacity: 0; pointer-events: none;
}
.cover-item.hidden-right {
  z-index: 1; transform: translateX(400px) scale(0.6) rotateY(-40deg); opacity: 0; pointer-events: none;
}

.cover-emoji { font-size: 80px; margin-bottom: 20px; filter: drop-shadow(0 10px 10px rgba(0,0,0,0.1)); }
.cover-title { font-size: 26px; font-weight: 800; color: #1E293B; text-align: center; margin-bottom: 16px; line-height:1.2; }
.cover-desc { font-size: 15px; color: #64748B; text-align: center; line-height: 1.5; margin-bottom: 30px; flex: 1; }
.cover-btn {
  width: 100%; padding: 18px; border-radius: 50px; background: var(--g); color: white;
  font-weight: 800; font-size: 16px; border: none; cursor: pointer; text-transform:uppercase; letter-spacing:1px;
  box-shadow: 0 8px 20px rgba(242,101,34,0.3); transition: all 0.2s;
}
.cover-btn:hover { transform: translateY(-3px); box-shadow: 0 12px 25px rgba(242,101,34,0.4); }
.cover-btn.locked {
  background: #E2E8F0; color: #94A3B8; box-shadow: none; pointer-events: none;
}

.cover-nav {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 60px; height: 60px; border-radius: 50%; background: white;
  display: flex; align-items: center; justify-content: center;
  font-size: 24px; color: var(--g); box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  cursor: pointer; z-index: 20; border: none; transition: all 0.2s;
}
.cover-nav:hover { transform: translateY(-50%) scale(1.1); background:var(--g); color:white; }
.cover-nav.left { left: 40px; }
.cover-nav.right { right: 40px; }

.ind-intro-new {
  text-align: center; padding: 30px 20px; background: white; border-bottom: 1px solid rgba(0,0,0,0.05); z-index: 20; position: relative;
}
.ind-intro-new h2 { font-size: 28px; font-weight: 800; color: #1E293B; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px; }
.ind-intro-new p { font-size: 15px; color: #64748B; }
`;
html = html.replace('/* ── COVERFLOW ── */', ''); // clean if exists
html = html.replace('</style>', coverflowCSS + '\n</style>');

// 2. Replace HTML
const oldHtmlRegex = /<div class="ind-layout">[\s\S]*?<\/div>\n  <\/div>\n<\/div>/;
const newHtml = `<div style="display:flex; flex-direction:column; flex:1; overflow:hidden;">
    <div class="ind-intro-new">
      <h2>SELECT MISSION</h2>
      <p>Pick a sector to play 2 WhatsApp journey challenges. <span style="color:var(--g);font-weight:600;">Answer faster = more points!</span></p>
    </div>
    <div class="coverflow-container" id="coverflow-container">
      <!-- Injected by JS -->
      <button class="cover-nav left" onclick="coverflowPrev()">◀</button>
      <button class="cover-nav right" onclick="coverflowNext()">▶</button>
    </div>
  </div>
</div>`;
html = html.replace(oldHtmlRegex, newHtml);

// 3. Replace JS
const oldJsRegex = /function renderIndGrid\(\)\{[\s\S]*?\}\n\nfunction selectIndustry\(idx\)/;
const newJs = `let cfIndex = 0;
function renderCoverflow() {
  const container = document.getElementById('coverflow-container');
  if(!container) return;
  
  // Remove old items
  const oldItems = container.querySelectorAll('.cover-item');
  oldItems.forEach(item => item.remove());
  
  S.industries.forEach((ind, i) => {
    const item = document.createElement('div');
    
    // Determine classes based on cfIndex
    if(i === cfIndex) item.className = 'cover-item active';
    else if(i === cfIndex - 1 || (cfIndex === 0 && i === S.industries.length - 1)) item.className = 'cover-item prev';
    else if(i === cfIndex + 1 || (cfIndex === S.industries.length - 1 && i === 0)) item.className = 'cover-item next';
    else if(i < cfIndex) item.className = 'cover-item hidden-left';
    else item.className = 'cover-item hidden-right';
    
    // Check lock
    const locked = S.playedSet.has(ind.id);
    
    item.innerHTML = \`
      <div class="cover-emoji">\${ind.emoji}</div>
      <div class="cover-title">\${ind.name}</div>
      <div class="cover-desc">\${ind.desc}</div>
      <button class="cover-btn \${locked ? 'locked' : ''}" onclick="event.stopPropagation(); \${locked ? '' : \`selectIndustry(\${i})\`}">
        \${locked ? '🔒 MISSION COMPLETED' : '▶ START MISSION'}
      </button>
    \`;
    
    // Click to focus
    item.onclick = () => {
      cfIndex = i;
      renderCoverflow();
    };
    
    container.appendChild(item);
  });
}

window.coverflowNext = function() {
  cfIndex = (cfIndex + 1) % S.industries.length;
  renderCoverflow();
};

window.coverflowPrev = function() {
  cfIndex = (cfIndex - 1 + S.industries.length) % S.industries.length;
  renderCoverflow();
};

function selectIndustry(idx)`;

html = html.replace(oldJsRegex, newJs);

// Ensure renderCoverflow is called when screen changes
html = html.replace("if(id==='industry-screen') renderIndGrid();", "if(id==='industry-screen') renderCoverflow();");

fs.writeFileSync('/Users/nitinverma/Downloads/Game/index.html', html);
