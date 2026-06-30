const fs = require('fs');
let html = fs.readFileSync('/Users/nitinverma/Downloads/Game/index.html', 'utf8');

// 1. Update State Object
html = html.replace(
  "name:'',company:'',pid:'',",
  "name:'',company:'',pid:'',avatarName:'',avatarId:'',"
);

// 2. Update submitLead to capture Avatar
html = html.replace(
  "S.name=fn.trim()+' '+ln.trim();\n  S.company=co.trim();",
  "S.name=fn.trim()+' '+ln.trim();\n  S.company=co.trim();\n  S.avatarId=currentAvatarId;\n  const av = avatars.find(a=>a.id===currentAvatarId);\n  S.avatarName=av ? av.name : 'Player';"
);

// 3. Update lbUpsert
html = html.replace(
  `async function lbUpsert(name,company,score,id){
  let list=await lbGet();
  const idx=list.findIndex(e=>e.id===id);
  if(idx>=0){if(score>list[idx].score)list[idx].score=score;}
  else list.push({id,name,company,score,ts:Date.now()});`,
  `async function lbUpsert(name,company,score,id,avatarName){
  let list=await lbGet();
  const idx=list.findIndex(e=>e.id===id);
  if(idx>=0){
    if(score>list[idx].score)list[idx].score=score;
    if(avatarName) list[idx].avatarName=avatarName;
  }
  else list.push({id,name,company,score,avatarName,ts:Date.now()});`
);

// 4. Update finishIndustry
html = html.replace(
  "const list=await lbUpsert(S.name,S.company,S.totalScore,S.pid);",
  "const list=await lbUpsert(S.name,S.company,S.totalScore,S.pid,S.avatarName);"
);

// 5. Update HTML to give ID to champ-board rows and add renderSplashLeaderboard()
const htmlBoardOld = `<div class="champ-board splash-enter splash-enter-6">
      <div class="champ-header">👑 TOP 3 CHAMPIONS</div>
      <div class="champ-row">
        <div class="champ-player"><span>🥇</span> Alex (Strategist)</div>
        <div class="champ-score">1,420 <span style="font-size:10px;color:#94A3B8;">pts</span></div>
      </div>
      <div class="champ-row">
        <div class="champ-player"><span>🥈</span> Sarah (Marketer)</div>
        <div class="champ-score">1,350 <span style="font-size:10px;color:#94A3B8;">pts</span></div>
      </div>
      <div class="champ-row">
        <div class="champ-player"><span>🥉</span> Jordan (Code Ninja)</div>
        <div class="champ-score">1,280 <span style="font-size:10px;color:#94A3B8;">pts</span></div>
      </div>
    </div>`;

const htmlBoardNew = `<div class="champ-board splash-enter splash-enter-6">
      <div class="champ-header">👑 TOP 3 CHAMPIONS</div>
      <div id="splash-lb-rows"></div>
    </div>`;

html = html.replace(htmlBoardOld, htmlBoardNew);

const renderLogic = `
async function renderSplashLeaderboard() {
  let list = await lbGet();
  
  // Fallback mock data if less than 3 players
  const mocks = [
    { name: 'Alex', avatarName: 'Strategist', score: 1420 },
    { name: 'Sarah', avatarName: 'Growth Marketer', score: 1350 },
    { name: 'Jordan', avatarName: 'Code Ninja', score: 1280 }
  ];
  
  while(list.length < 3) {
    list.push(mocks[list.length]);
  }
  
  const top3 = list.slice(0, 3);
  const container = document.getElementById('splash-lb-rows');
  if(!container) return;
  
  const medals = ['🥇', '🥈', '🥉'];
  container.innerHTML = top3.map((p, i) => \`
    <div class="champ-row">
      <div class="champ-player"><span>\${medals[i]}</span> \${p.name.split(' ')[0]} (\${p.avatarName || 'Player'})</div>
      <div class="champ-score">\${p.score.toLocaleString()} <span style="font-size:10px;color:#94A3B8;">pts</span></div>
    </div>
  \`).join('');
}
`;

html = html.replace('// Tutorial Logic', renderLogic + '\n// Tutorial Logic');

// Call renderSplashLeaderboard in init()
html = html.replace(
  "S.pid=localStorage.getItem('vf_pid');",
  "S.pid=localStorage.getItem('vf_pid');\n  renderSplashLeaderboard();"
);

fs.writeFileSync('/Users/nitinverma/Downloads/Game/index.html', html);
