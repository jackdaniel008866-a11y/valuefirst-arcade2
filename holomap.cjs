const fs = require('fs');
let html = fs.readFileSync('/Users/nitinverma/Downloads/Game/index.html', 'utf8');

// 1. Replace Coverflow CSS with Holo Map CSS
const coverflowRegex = /\/\* ── COVERFLOW ── \*\/[\s\S]*?(?=\<\/style\>)/;
const holoMapCSS = `
/* ── HOLO MAP ── */
.map-container {
  display: flex; flex: 1; position: relative; overflow: hidden;
  background: #0B0F19 radial-gradient(circle at center, #1E293B 0%, #0B0F19 100%);
  width: 100%; min-height: 500px;
}
.map-grid-bg {
  position: absolute; inset: 0; opacity: 0.15;
  background-image: linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px);
  background-size: 40px 40px; pointer-events: none;
}
.map-header {
  position: absolute; top: 40px; left: 50px; z-index: 10;
  color: white; pointer-events: none;
}
.map-header h2 { font-size: 32px; font-weight: 800; color: #fff; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 0 15px rgba(255,255,255,0.4); }
.map-header p { font-size: 15px; color: #94A3B8; }

.map-node {
  position: absolute; width: 64px; height: 64px;
  background: rgba(15,23,42,0.9); border: 2px solid var(--g); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 28px; cursor: pointer; z-index: 5;
  box-shadow: 0 0 20px rgba(242,101,34,0.5), inset 0 0 10px rgba(242,101,34,0.3);
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  transform: translate(-50%, -50%); /* Center on coordinate */
}
.map-node:hover {
  transform: translate(-50%, -50%) scale(1.15);
  box-shadow: 0 0 35px rgba(242,101,34,0.8), inset 0 0 15px rgba(242,101,34,0.6);
  z-index: 20;
}
.map-node.locked {
  border-color: #334155; box-shadow: 0 0 10px rgba(0,0,0,0.5); background: #0F172A; opacity: 0.6; pointer-events: none;
}
.map-node.locked::after {
  content: '🔒'; position: absolute; font-size: 16px; bottom: -8px; right: -8px;
}

.map-svg {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;
}
.map-svg line {
  stroke: rgba(242,101,34,0.4); stroke-width: 2; stroke-dasharray: 6 6;
  animation: dash 30s linear infinite;
}
@keyframes dash { to { stroke-dashoffset: -1000; } }

.node-tooltip {
  position: absolute; top: -20px; left: 80px; width: 300px;
  background: rgba(15,23,42,0.95); border: 1px solid rgba(255,255,255,0.15); border-radius: 16px;
  padding: 24px; box-shadow: 0 15px 40px rgba(0,0,0,0.6);
  opacity: 0; transform: translateX(-20px); pointer-events: none;
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  backdrop-filter: blur(12px); text-align: left;
}
.map-node:hover .node-tooltip {
  opacity: 1; transform: translateX(0); pointer-events: auto;
}
.tt-title { font-size: 20px; font-weight: 800; color: #fff; margin-bottom: 10px; line-height: 1.2; }
.tt-desc { font-size: 14px; color: #94A3B8; line-height: 1.5; margin-bottom: 20px; font-weight: 400; }
.tt-btn {
  width: 100%; padding: 12px; border-radius: 8px; background: var(--g); color: white;
  font-weight: 800; font-size: 14px; border: none; cursor: pointer; text-align: center; text-transform: uppercase; letter-spacing: 1px;
}
.tt-btn:hover { filter: brightness(1.1); }
`;
html = html.replace(coverflowRegex, holoMapCSS);

// 2. Replace HTML
const htmlRegex = /<div style="display:flex; flex-direction:column; flex:1; overflow:hidden;">[\s\S]*?<\/div>\n  <\/div>\n<\/div>/;
const holoHtml = `<div class="map-container" id="map-container">
    <div class="map-grid-bg"></div>
    <svg class="map-svg" id="map-svg"></svg>
    <div class="map-header">
      <h2>SECTOR MAP</h2>
      <p>Select a glowing node to infiltrate the industry.<br><span style="color:var(--g);font-weight:600;">Answer faster = more points!</span></p>
    </div>
    <div id="map-nodes-wrap"></div>
  </div>
</div>`;
html = html.replace(htmlRegex, holoHtml);

// 3. Replace JS
const jsRegex = /let cfIndex = 0;\nfunction renderCoverflow\(\) \{[\s\S]*?startIndustry\(ind, dummyCard\);\n\};/;
const holoJs = `const mapPos = [
  {x: 18, y: 35}, // Ecomm
  {x: 40, y: 15}, // BFSI
  {x: 65, y: 20}, // Travel
  {x: 85, y: 35}, // EdTech
  {x: 80, y: 65}, // Health
  {x: 60, y: 80}, // Logistics
  {x: 50, y: 55}, // RealEstate (Center bottom)
  {x: 25, y: 85}, // D2C
  {x: 10, y: 60}, // Auto
  {x: 45, y: 35}, // SaaS (Center top)
];

function renderHoloMap() {
  const wrap = document.getElementById('map-nodes-wrap');
  const svg = document.getElementById('map-svg');
  if(!wrap || !svg) return;
  
  wrap.innerHTML = '';
  svg.innerHTML = '';
  
  // Draw glowing network lines
  const connections = [[0,1], [1,9], [9,2], [2,3], [3,4], [4,5], [5,6], [6,7], [7,8], [8,0], [9,6]];
  connections.forEach(([a, b]) => {
    const p1 = mapPos[a];
    const p2 = mapPos[b];
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', p1.x + '%');
    line.setAttribute('y1', p1.y + '%');
    line.setAttribute('x2', p2.x + '%');
    line.setAttribute('y2', p2.y + '%');
    svg.appendChild(line);
  });

  INDUSTRIES.forEach((ind, i) => {
    const p = mapPos[i];
    const locked = S.playedSet.has(ind.id);
    
    const node = document.createElement('div');
    node.className = 'map-node' + (locked ? ' locked' : '');
    node.style.left = p.x + '%';
    node.style.top = p.y + '%';
    
    node.innerHTML = \`
      \${ind.emoji}
      <div class="node-tooltip">
        <div class="tt-title">\${ind.name}</div>
        <div class="tt-desc">\${ind.desc}</div>
        \${locked ? '<div class="tt-btn" style="background:#334155;color:#94A3B8;cursor:default;">LOCKED</div>' : '<div class="tt-btn" onclick="event.stopPropagation(); selectIndustry('+i+')">START MISSION</div>'}
      </div>
    \`;
    
    if(!locked) {
      node.onclick = () => selectIndustry(i);
    }
    
    wrap.appendChild(node);
  });
}

window.selectIndustry = function(idx) {
  const ind = INDUSTRIES[idx];
  const dummyCard = document.createElement('div'); // to prevent pop class error
  startIndustry(ind, dummyCard);
};`;

html = html.replace(jsRegex, holoJs);

// Replace function call in goIndustrySelect
html = html.replace("renderCoverflow();", "renderHoloMap();");

fs.writeFileSync('/Users/nitinverma/Downloads/Game/index.html', html);
