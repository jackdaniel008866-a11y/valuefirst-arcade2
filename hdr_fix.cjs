const fs = require('fs');
let html = fs.readFileSync('/Users/nitinverma/Downloads/Game/index.html', 'utf8');

// Add Player Chip CSS
const cssInsert = `
.player-profile-chip {
  display: flex; align-items: center; gap: 8px;
  background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 40px;
  padding: 4px 12px 4px 4px;
}
.chip-avatar {
  width: 26px; height: 26px; border-radius: 50%; object-fit: cover;
  background: #E2E8F0;
}
.chip-info {
  display: flex; flex-direction: column;
}
.chip-name {
  font-size: 12px; font-weight: 700; color: #0F172A; line-height: 1; margin-bottom: 2px;
}
.chip-role {
  font-size: 9px; font-weight: 600; color: var(--g); line-height: 1; text-transform: uppercase; letter-spacing: 0.5px;
}
`;
html = html.replace('</style>', cssInsert + '\n</style>');

// Fix Industry Screen Header
const indHdrOld = /<div class="hdr">\n    <div class="logo"><img src="\/logo\.png" style="height: 36px; object-fit: contain;" \/><\/div><div style="display:flex;align-items:center;gap:14px;">/g; // Wait, let's just use string replace.

// I will replace by specific blocks
const indHdrBlock = `<div id="industry-screen" class="screen">
  <div class="hdr">
    <div class="logo"><img src="/logo.png" style="height: 36px; object-fit: contain;" /><div><div class="logo-name" style="font-weight:700;font-size:16px;">Journey Builder</div><div class="logo-tag" style="font-size:10px;color:var(--mu);margin-top:1px;" id="player-tag">Player</div></div></div>
    <div style="display:flex;align-items:center;gap:14px;">
      <div style="font-size:12px;color:var(--mu);">Total Score: <strong style="color:var(--g);font-size:16px;" id="total-sc-hdr">0</strong></div>
      <span class="wab">💬 Infinito Platform</span>
    </div>
  </div>`;
const indHdrNew = `<div id="industry-screen" class="screen">
  <div class="hdr">
    <div class="logo"><img src="/logo.png" style="height: 36px; object-fit: contain;" /></div>
    <div style="display:flex;align-items:center;gap:16px;">
      <div class="player-profile-chip">
        <img src="" id="player-avatar-1" class="chip-avatar" style="display:none;" />
        <div class="chip-info">
          <div class="chip-name" id="player-name-1">Player</div>
          <div class="chip-role" id="player-role-1">Role</div>
        </div>
      </div>
      <div style="width:1px;height:24px;background:#E2E8F0;"></div>
      <div style="font-size:12px;color:var(--mu);">Total Score: <strong style="color:var(--g);font-size:16px;" id="total-sc-hdr">0</strong></div>
      <span class="wab">💬 Infinito Platform</span>
    </div>
  </div>`;
html = html.replace(indHdrBlock, indHdrNew);

// Fix Game Screen Header
const gameHdrBlock = `<div id="game-screen" class="screen">
  <div class="hdr">
    <div class="logo"><img src="/logo.png" style="height: 36px; object-fit: contain;" /><div><div class="logo-name" style="font-weight:700;font-size:16px;" id="g-ind-name">Journey Builder</div><div class="logo-tag" style="font-size:10px;color:var(--mu);margin-top:1px;" id="g-player-tag">Player</div></div></div>
    <div class="score-strip">
      <div class="ss-item"><div class="sv" id="g-score">0</div><div class="sl">SCORE</div></div>`;
const gameHdrNew = `<div id="game-screen" class="screen">
  <div class="hdr">
    <div class="logo">
      <img src="/logo.png" style="height: 36px; object-fit: contain;" />
      <div style="margin-left:12px; padding-left:12px; border-left:1px solid #E2E8F0; font-weight:700; font-size:14px; color:#475569;" id="g-ind-name">Industry</div>
    </div>
    
    <div class="score-strip">
      <div class="player-profile-chip" style="margin-right:24px; background:white;">
        <img src="" id="player-avatar-2" class="chip-avatar" style="display:none;" />
        <div class="chip-info">
          <div class="chip-name" id="player-name-2">Player</div>
          <div class="chip-role" id="player-role-2">Role</div>
        </div>
      </div>
      <div class="ss-item"><div class="sv" id="g-score">0</div><div class="sl">SCORE</div></div>`;
html = html.replace(gameHdrBlock, gameHdrNew);

// Update submitLead function
const submitLeadBlock = `document.getElementById('player-tag').textContent=S.name+' · Good luck!';
  document.getElementById('g-player-tag').textContent=S.name;`;
const submitLeadNew = `const avt1 = document.getElementById('player-avatar-1');
  const avt2 = document.getElementById('player-avatar-2');
  if(av) {
    if(avt1) { avt1.src = av.src; avt1.style.display = 'block'; }
    if(avt2) { avt2.src = av.src; avt2.style.display = 'block'; }
  }
  document.getElementById('player-name-1').textContent = S.name;
  document.getElementById('player-name-2').textContent = S.name;
  document.getElementById('player-role-1').textContent = S.avatarName;
  document.getElementById('player-role-2').textContent = S.avatarName;`;
html = html.replace(submitLeadBlock, submitLeadNew);

fs.writeFileSync('/Users/nitinverma/Downloads/Game/index.html', html);
