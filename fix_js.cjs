const fs = require('fs');
let html = fs.readFileSync('/Users/nitinverma/Downloads/Game/index.html', 'utf8');

const badJS = `function renderAvatarGrid() {
  const grid = document.getElementById('av-grid');
  if(!grid) return;
  grid.innerHTML = '';
  avatars.forEach(a => {
    const item = document.createElement('div');
    item.className = 'avatar-item anim-enter' + (currentAvatarId === a.id ? ' selected' : '');
    item.style.animation = \`formCascade 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards \${i * 0.08}s\`;
    item.onclick = () => selectAvatar(a.id);
    item.innerHTML = \`<img src="\${a.src}" class="av-img-thumb" /><div class="av-name">\${a.name}</div>\`;
    grid.appendChild(item);
  });
}`;

const goodJS = `function renderAvatarGrid() {
  const grid = document.getElementById('av-grid');
  if(!grid) return;
  grid.innerHTML = '';
  avatars.forEach((a, i) => {
    const item = document.createElement('div');
    item.className = 'avatar-item' + (currentAvatarId === a.id ? ' selected' : '');
    item.onclick = () => selectAvatar(a.id);
    item.innerHTML = \`<img src="\${a.src}" class="av-img-thumb" /><div class="av-name">\${a.name}</div>\`;
    grid.appendChild(item);
  });
}`;

html = html.replace(badJS, goodJS);
fs.writeFileSync('/Users/nitinverma/Downloads/Game/index.html', html);
