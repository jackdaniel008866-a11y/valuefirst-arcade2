const fs = require('fs');
let html = fs.readFileSync('/Users/nitinverma/Downloads/Game/index.html', 'utf8');

// Add CSS
const cssToAdd = `  .splash-enter-7 { animation-delay: 1.3s; }
  
  /* ── CHAMPIONS BOARD ── */
  .champ-board {
    background: rgba(255, 255, 255, 0.5); border: 1px solid rgba(255,255,255,0.8);
    border-radius: 16px; padding: 14px 24px; width: 100%; max-width: 440px;
    margin: 20px auto 0; box-shadow: inset 0 2px 10px rgba(255,255,255,0.8), 0 10px 30px rgba(0,0,0,0.03);
    backdrop-filter: blur(12px);
  }
  .champ-header {
    font-size: 11px; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 1px;
    margin-bottom: 12px; display: flex; align-items: center; justify-content: center; gap: 6px;
  }
  .champ-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 8px 0; border-bottom: 1px dashed rgba(0,0,0,0.08);
  }
  .champ-row:last-child { border-bottom: none; padding-bottom: 4px; }
  .champ-player { display: flex; align-items: center; gap: 8px; font-weight: 700; color: #1E293B; font-size: 14px; }
  .champ-score { font-weight: 800; color: var(--g); font-size: 14px; display: flex; align-items: center; gap: 4px; }
`;

html = html.replace('.splash-enter-6 { animation-delay: 1.1s; }', '.splash-enter-6 { animation-delay: 1.1s; }\n' + cssToAdd);

// Add HTML
const oldHTML = `    </div>
    
    <div class="splash-enter splash-enter-6" style="margin-top: 20px;">`;

const newHTML = `    </div>
    
    <div class="champ-board splash-enter splash-enter-6">
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
    </div>

    <div class="splash-enter splash-enter-7" style="margin-top: 24px;">`;

html = html.replace(oldHTML, newHTML);

fs.writeFileSync('/Users/nitinverma/Downloads/Game/index.html', html);
