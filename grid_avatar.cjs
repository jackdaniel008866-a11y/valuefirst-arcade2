const fs = require('fs');

let html = fs.readFileSync('/Users/nitinverma/Downloads/Game/index.html', 'utf8');

// Replace CSS
html = html.replace(
  /\.avatar-col \{[\s\S]*?\@media\(max-width: 800px\)/,
`.avatar-col {
    width: 42%; background: #ffffff; padding: 40px 30px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    border-right: 1px solid rgba(0,0,0,0.08); position: relative;
  }
  .form-col {
    width: 58%; padding: 24px 32px; position: relative;
  }
  .avatar-header {
    font-weight: 800; font-size: 22px; color: #1E293B; text-transform: uppercase; letter-spacing: 1px;
    margin-bottom: 24px; text-align: center; width: 100%;
  }
  .avatar-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; width: 100%; max-width: 320px;
  }
  .avatar-item {
    background: #f8fafc; border: 2px solid transparent; border-radius: 12px; padding: 10px 6px;
    cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center;
    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 4px 6px rgba(0,0,0,0.02); position: relative;
  }
  .avatar-item:hover {
    transform: translateY(-4px) scale(1.05); box-shadow: 0 10px 15px rgba(0,0,0,0.05);
  }
  .avatar-item.selected {
    border-color: var(--g); background: rgba(0,197,102,0.05);
    transform: scale(1.05); box-shadow: 0 0 0 2px var(--g), 0 10px 20px rgba(242,101,34,0.1);
  }
  .avatar-item.selected::after {
    content: '✓'; position: absolute; top: -8px; right: -8px; background: var(--g); color: white;
    width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: bold; border: 2px solid white;
  }
  .av-img-thumb {
    width: 100%; aspect-ratio: 1; object-fit: contain; mix-blend-mode: multiply; margin-bottom: 8px; pointer-events: none;
  }
  .av-name {
    font-size: 10px; font-weight: 700; color: #475569; text-align: center; line-height: 1.2; pointer-events: none;
  }
  @media(max-width: 800px)`
);

// Replace HTML
html = html.replace(
  /<div class="avatar-col">[\s\S]*?<\/div>\n      <div class="form-col">/,
  `<div class="avatar-col">
        <div class="avatar-header">Choose Avatar</div>
        <div class="avatar-grid" id="av-grid"></div>
      </div>
      <div class="form-col">`
);

// Replace JS
html = html.replace(
  /\/\/ Avatar selection logic[\s\S]*?window\.prevAvatar = function\(\) \{[\s\S]*?\};\n/,
`// Avatar selection logic
const avatars = [
  { id: 'marketer', name: 'Growth Marketer', src: '/avatar_marketer.png' },
  { id: 'developer', name: 'Code Ninja', src: '/avatar_developer.png' },
  { id: 'product', name: 'Product Visionary', src: '/avatar_product.png' },
  { id: 'sales', name: 'Sales Closer', src: '/avatar_sales.png' },
  { id: 'support', name: 'Support Hero', src: '/avatar_support.png' },
  { id: 'strategist', name: 'Strategist', src: '/avatar_strategist.png' }
];
let currentAvatarId = 'marketer';

function renderAvatarGrid() {
  const grid = document.getElementById('av-grid');
  if(!grid) return;
  grid.innerHTML = '';
  avatars.forEach(a => {
    const item = document.createElement('div');
    item.className = 'avatar-item' + (currentAvatarId === a.id ? ' selected' : '');
    item.onclick = () => selectAvatar(a.id);
    item.innerHTML = \`<img src="\${a.src}" class="av-img-thumb" /><div class="av-name">\${a.name}</div>\`;
    grid.appendChild(item);
  });
}

window.selectAvatar = function(id) {
  currentAvatarId = id;
  renderAvatarGrid();
}
document.addEventListener('DOMContentLoaded', renderAvatarGrid);
`
);

fs.writeFileSync('/Users/nitinverma/Downloads/Game/index.html', html);
