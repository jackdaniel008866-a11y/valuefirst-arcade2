const fs = require('fs');
let html = fs.readFileSync('/Users/nitinverma/Downloads/Game/index.html', 'utf8');

// 1. CSS Updates
const tooltipCSSRegex = /\.node-tooltip \{[\s\S]*?\}\n\.map-node:hover \.node-tooltip \{[\s\S]*?\}\n\.tt-title \{[\s\S]*?\}\n\.tt-desc \{[\s\S]*?\}\n\.tt-btn \{[\s\S]*?\}\n\.tt-btn:hover \{[\s\S]*?\}/;
const hudCSS = `
.node-label {
  position: absolute; top: 76px; left: 50%; transform: translateX(-50%);
  color: #94A3B8; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;
  text-align: center; white-space: nowrap; transition: all 0.3s; pointer-events: none;
}
.map-node:hover .node-label, .map-node.active-node .node-label {
  color: #fff; text-shadow: 0 0 10px rgba(255,255,255,0.8);
}
.map-node.active-node {
  border-color: #fff; box-shadow: 0 0 40px rgba(255,255,255,0.6), inset 0 0 20px rgba(255,255,255,0.4); z-index: 15;
}

.map-hud {
  position: absolute; top: 0; right: 0; width: 380px; height: 100%;
  background: rgba(11, 15, 25, 0.95); border-left: 1px solid rgba(255,255,255,0.1);
  backdrop-filter: blur(20px); padding: 40px 40px 60px; display: flex; flex-direction: column;
  z-index: 30; transform: translateX(100%); transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.map-hud.open { transform: translateX(0); }

.hud-emoji { font-size: 70px; margin-bottom: 24px; filter: drop-shadow(0 0 30px rgba(242,101,34,0.3)); }
.hud-title { font-size: 32px; font-weight: 800; color: #fff; line-height: 1.1; margin-bottom: 16px; }
.hud-desc { font-size: 16px; color: #94A3B8; line-height: 1.6; margin-bottom: 30px; }
.hud-btn {
  width: 100%; padding: 20px; border-radius: 8px; background: var(--g); color: white;
  font-weight: 800; font-size: 16px; border: none; cursor: pointer; text-align: center; text-transform: uppercase; letter-spacing: 1px;
  transition: all 0.2s; box-shadow: 0 10px 20px rgba(242,101,34,0.3);
}
.hud-btn:hover { transform: translateY(-2px); filter: brightness(1.1); box-shadow: 0 15px 30px rgba(242,101,34,0.5); }
.hud-btn.locked { background: #334155; color: #94A3B8; box-shadow: none; pointer-events: none; }
`;
html = html.replace(tooltipCSSRegex, hudCSS);

// 2. HTML Updates
const htmlWrapRegex = /<div id="map-nodes-wrap"><\/div>\n  <\/div>/;
const htmlWrapNew = `<div id="map-nodes-wrap"></div>
    <div class="map-hud" id="map-hud"></div>
  </div>`;
html = html.replace(htmlWrapRegex, htmlWrapNew);

// 3. JS Updates
const jsRenderRegex = /INDUSTRIES\.forEach\(\(ind, i\) => \{[\s\S]*?wrap\.appendChild\(node\);\n  \}\);/;
const newJSRender = `INDUSTRIES.forEach((ind, i) => {
    const p = mapPos[i];
    const locked = S.playedSet.has(ind.id);
    
    const node = document.createElement('div');
    node.className = 'map-node' + (locked ? ' locked' : '');
    node.style.left = p.x + '%';
    node.style.top = p.y + '%';
    
    node.innerHTML = \`
      \${ind.emoji}
      <div class="node-label">\${ind.name}</div>
    \`;
    
    node.onmouseenter = () => focusHoloNode(i, node);
    node.onclick = () => focusHoloNode(i, node);
    
    wrap.appendChild(node);
  });
  
  // Close HUD if clicking empty space
  document.getElementById('map-container').addEventListener('click', (e) => {
    if(e.target.id === 'map-container' || e.target.id === 'map-svg') {
      const hud = document.getElementById('map-hud');
      if(hud) hud.classList.remove('open');
      document.querySelectorAll('.map-node').forEach(n => n.classList.remove('active-node'));
    }
  });`;
html = html.replace(jsRenderRegex, newJSRender);

const jsFocusFunc = `
function focusHoloNode(idx, nodeEl) {
  document.querySelectorAll('.map-node').forEach(n => n.classList.remove('active-node'));
  if (nodeEl) nodeEl.classList.add('active-node');

  const ind = INDUSTRIES[idx];
  const locked = S.playedSet.has(ind.id);
  const hud = document.getElementById('map-hud');
  if(!hud) return;
  
  hud.innerHTML = \`
    <div style="font-size:12px; color:var(--g); font-weight:800; letter-spacing:2px; margin-bottom:12px;">MISSION DOSSIER</div>
    <div class="hud-emoji">\${ind.emoji}</div>
    <div class="hud-title">\${ind.name}</div>
    <div class="hud-desc">\${ind.desc}</div>
    <div style="flex:1;"></div>
    \${locked 
      ? '<button class="hud-btn locked">🔒 COMPLETED</button>' 
      : \`<button class="hud-btn" onclick="selectIndustry(\${idx})">▶ INITIATE MISSION</button>\`
    }
  \`;
  hud.classList.add('open');
}

window.selectIndustry = function(idx) {`;
html = html.replace("window.selectIndustry = function(idx) {", jsFocusFunc);

fs.writeFileSync('/Users/nitinverma/Downloads/Game/index.html', html);
