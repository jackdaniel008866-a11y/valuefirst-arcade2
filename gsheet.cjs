const fs = require('fs');
let html = fs.readFileSync('/Users/nitinverma/Downloads/Game/index.html', 'utf8');

// 1. Add GOOGLE_SHEET_URL at the top of the script
html = html.replace('const TUTORIAL_STEPS = [', `// ═══════════════════════════════════════════
// DATABASE CONFIG
// ═══════════════════════════════════════════
const GOOGLE_SHEET_URL = 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL';

const TUTORIAL_STEPS = [`);

// 2. Update submitLead()
const oldLead = `const lead={name:S.name,email:document.getElementById('ff-em').value,
    phone:document.getElementById('ff-ph').value,company:S.company,
    industry:document.getElementById('ff-ind').value,
    tool:document.getElementById('ff-cur').value,ts:new Date().toISOString()};
  console.log('[VF Lead]',JSON.stringify(lead,null,2));
  // In production: fetch('/api/leads',{method:'POST',body:JSON.stringify(lead)})`;

const newLead = `const lead={type:'lead',name:S.name,email:document.getElementById('ff-em').value,
    phone:document.getElementById('ff-ph').value,company:S.company,
    industry:document.getElementById('ff-ind').value,
    tool:document.getElementById('ff-cur').value,avatar:S.avatarName,ts:new Date().toISOString()};
  console.log('[VF Lead]',JSON.stringify(lead,null,2));
  
  if (GOOGLE_SHEET_URL !== 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL') {
    fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify(lead)
    }).catch(e=>console.error(e));
  }`;
html = html.replace(oldLead, newLead);

// 3. Update loadRound / results logic to send score
const oldScore = `  // Upsert leaderboard
  const list=await lbUpsert(S.name,S.company,S.totalScore,S.pid,S.avatarName);
  const myRank=list.findIndex(e=>e.id===S.pid)+1;`;

const newScore = `  // Upsert leaderboard
  const list=await lbUpsert(S.name,S.company,S.totalScore,S.pid,S.avatarName);
  const myRank=list.findIndex(e=>e.id===S.pid)+1;
  
  // Post score to Google Sheets
  if (GOOGLE_SHEET_URL !== 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL') {
    const scoreData = { type: 'score', name: S.name, company: S.company, avatar: S.avatarName, score: S.totalScore, acc: acc, ts: new Date().toISOString() };
    fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify(scoreData)
    }).catch(e=>console.error(e));
  }`;
html = html.replace(oldScore, newScore);

fs.writeFileSync('/Users/nitinverma/Downloads/Game/index.html', html);
