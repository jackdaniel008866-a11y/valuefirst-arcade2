const fs = require('fs');
let html = fs.readFileSync('/Users/nitinverma/Downloads/Game/index.html', 'utf8');

// Update CSS
html = html.replace(
  '.avatar-header {\n    font-weight: 800; font-size: 22px; color: #1E293B; text-transform: uppercase; letter-spacing: 1px;\n    margin-bottom: 24px; text-align: center; width: 100%;\n  }',
  `@keyframes glowPulse {
    0% { text-shadow: 0 0 5px rgba(242,101,34,0); }
    50% { text-shadow: 0 0 20px rgba(242,101,34,0.6); color: var(--g); }
    100% { text-shadow: 0 0 5px rgba(242,101,34,0); }
  }
  .avatar-header {
    font-weight: 800; font-size: 22px; color: #1E293B; text-transform: uppercase; letter-spacing: 1px;
    margin-bottom: 24px; text-align: center; width: 100%;
    animation: glowPulse 3s infinite;
  }`
);

// Update HTML text
html = html.replace('<div class="avatar-header">Choose Avatar</div>', '<div class="avatar-header">CHOOSE YOUR AVATAR</div>');

// Update JS for animations
html = html.replace(
  "item.className = 'avatar-item' + (currentAvatarId === a.id ? ' selected' : '');\n    item.onclick = () => selectAvatar(a.id);",
  "item.className = 'avatar-item anim-enter' + (currentAvatarId === a.id ? ' selected' : '');\n    item.style.animation = `formCascade 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards ${i * 0.08}s`;\n    item.onclick = () => selectAvatar(a.id);"
);

fs.writeFileSync('/Users/nitinverma/Downloads/Game/index.html', html);
