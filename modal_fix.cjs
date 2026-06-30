const fs = require('fs');
let html = fs.readFileSync('/Users/nitinverma/Downloads/Game/index.html', 'utf8');

// 1. Fix modal CSS background to white
const revealBoxOld = /\.reveal-box\{background:var\(--n1\);border:1px solid rgba\(255,255,255,0\.7\);border-radius:28px;padding:34px 38px;max-width:480px;width:90%;text-align:center;backdrop-filter: blur\(24px\); box-shadow: 0 20px 60px rgba\(42, 51, 116, 0\.08\), 0 0 40px rgba\(242,101,34,0\.04\), inset 0 0 0 1px rgba\(255,255,255,0\.8\); animation:slideUp \.32s cubic-bezier\(\.175,\.885,\.32,1\.275\);max-height:90vh;overflow-y:auto;\}/;
const revealBoxNew = `.reveal-box{background:#ffffff;border:1px solid #E2E8F0;border-radius:28px;padding:34px 38px;max-width:480px;width:90%;text-align:center;box-shadow: 0 20px 60px rgba(0,0,0,0.3); animation:slideUp .32s cubic-bezier(.175,.885,.32,1.275);max-height:90vh;overflow-y:auto;}`;
html = html.replace(revealBoxOld, revealBoxNew);

// 2. Fix step background to solid grey
const revStepOld = /\.rev-step\{background:var\(--n2\);border:1px solid rgba\(0,197,102,\.3\);border-radius:10px;padding:9px 11px;text-align:center;min-width:82px;\}/;
const revStepNew = `.rev-step{background:#F8FAFC;border:1px solid rgba(0,197,102,.3);border-radius:10px;padding:9px 11px;text-align:center;min-width:82px;box-shadow:0 4px 6px rgba(0,0,0,0.05);}`;
html = html.replace(revStepOld, revStepNew);

// 3. Update HTML for reveal box
const htmlOld = `ov.innerHTML=\`
    <div class="reveal-box">
      <h3 class="\${correct?'ok':'bad'}">\${correct?'✅ Correct Journey!':'❌ Not Quite Right'}</h3>
      <p style="font-size:13px;color:var(--mu);margin:6px 0 14px;">\${correct?sc.correctFeedback:sc.wrongFeedback}</p>
      <div style="font-size:11px;font-weight:700;letter-spacing:.08em;color:var(--mu);margin-bottom:10px;">THE CORRECT ORDER</div>
      <div class="rev-steps">\${stepsHtml}</div>
      <div class="rev-explain">\${sc.learning.slice(0,2).join(' ')}</div>
      <button class="btn-p" id="reveal-next-btn" style="width:100%;justify-content:center;">\${btnLabel}</button>
    </div>\`;`;

const htmlNew = `ov.innerHTML=\`
    <div class="reveal-box">
      <h3 class="\${correct?'ok':'bad'}">\${correct?'✅ Correct Journey!':'❌ Not Quite Right'}</h3>
      <p style="font-size:14px;color:#475569;margin:12px 0 20px;line-height:1.5;">\${correct?sc.correctFeedback:sc.wrongFeedback}</p>
      <div style="font-size:11px;font-weight:800;letter-spacing:.1em;color:var(--g);margin-bottom:14px;text-transform:uppercase;">THE CORRECT ORDER</div>
      <div class="rev-steps">\${stepsHtml}</div>
      <div class="rev-explain" style="color:#64748B;font-weight:500;margin-bottom:24px;">\${sc.learning.slice(0,2).join(' ')}</div>
      <button class="btn-chk" id="reveal-next-btn" style="width:100%;margin-top:10px;">\${btnLabel}</button>
    </div>\`;`;

html = html.replace(htmlOld, htmlNew);

fs.writeFileSync('/Users/nitinverma/Downloads/Game/index.html', html);
