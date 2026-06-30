const fs = require('fs');
let html = fs.readFileSync('/Users/nitinverma/Downloads/Game/index.html', 'utf8');

// 1. Replace dslot CSS
const dslotOld = /\.dslot\{width:115px;min-height:102px;border:2px dashed rgba\(255,255,255,\.12\);border-radius:var\(--r\);background:rgba\(255,255,255,\.02\);display:flex;flex-direction:column;align-items:center;justify-content:center;transition:all \.22s;position:relative;margin:4px;\}/;
const dslotNew = `.dslot{width:120px;min-height:110px;border:2px dashed #CBD5E1;border-radius:12px;background:#F8FAFC;box-shadow:inset 0 4px 6px rgba(0,0,0,.05);display:flex;flex-direction:column;align-items:center;justify-content:center;transition:all .2s cubic-bezier(0.4, 0, 0.2, 1);position:relative;margin:4px 0;z-index:3;}
.slot-arrow{font-size:24px;color:#CBD5E1;font-weight:900;margin:0 10px;z-index:2;}`;
html = html.replace(dslotOld, dslotNew);

html = html.replace(/\.dslot\.over\{border-color:var\(--g\);background:var\(--gg\);transform:scale\(1\.05\);\}/, `.dslot.over{border-color:#00C566;background:#ECFDF5;transform:scale(1.05);box-shadow:0 0 20px rgba(0,197,102,.3);}`);
html = html.replace(/\.dslot\.filled\{border-color:rgba\(0,197,102,\.4\);border-style:solid;background:rgba\(0,197,102,\.06\);\}/, `.dslot.filled{border-color:#00C566;border-style:solid;background:white;box-shadow:0 4px 12px rgba(0,0,0,.05);}`);

html = html.replace(/\.snum\{position:absolute;top:5px;left:8px;font-size:9px;font-weight:800;color:rgba\(255,255,255,\.18\);letter-spacing:\.05em;\}/, `.snum{position:absolute;top:6px;left:8px;font-size:10px;font-weight:800;color:#94A3B8;letter-spacing:.05em;}`);
html = html.replace(/\.sph\{font-size:20px;margin-bottom:3px;opacity:\.22;\}/, `.sph{font-size:24px;margin-bottom:2px;color:#CBD5E1;}`);
html = html.replace(/\.shi\{font-size:9px;color:rgba\(255,255,255,\.18\);text-align:center;padding:0 6px;\}/, `.shi{font-size:10px;color:#94A3B8;text-align:center;}`);

// 2. Replace tc CSS
const tcOld = /\.tc\{background:var\(--n2\);border:1px solid var\(--bd\);border-radius:8px;padding:11px;margin-bottom:8px;cursor:grab;transition:all \.2s;user-select:none;display:flex;align-items:center;gap:9px;\}/;
const tcNew = `.tc{background:white;border:1px solid #E2E8F0;border-radius:12px;padding:12px;margin-bottom:12px;cursor:grab;transition:all .2s cubic-bezier(0.4, 0, 0.2, 1);user-select:none;display:flex;align-items:center;gap:12px;box-shadow:0 4px 6px rgba(0,0,0,.04), 0 1px 3px rgba(0,0,0,.08);position:relative;overflow:hidden;}`;
html = html.replace(tcOld, tcNew);

html = html.replace(/\.tc:hover\{border-color:rgba\(255,255,255,\.2\);background:rgba\(255,255,255,\.04\);transform:translateX\(-2px\);\}/, `.tc:hover{border-color:#CBD5E1;transform:translateY(-4px) scale(1.02);box-shadow:0 12px 20px rgba(0,0,0,.08), 0 4px 8px rgba(0,0,0,.04);}`);
html = html.replace(/\.tc\.dragging\{opacity:\.3;\}/, `.tc.dragging{opacity:.4;transform:scale(0.95);}`);
html = html.replace(/\.tc\.used\{opacity:\.18;pointer-events:none;\}/, `.tc.used{opacity:.2;pointer-events:none;}`);

html = html.replace(/\.tc-ico\{font-size:21px;flex-shrink:0;\}/, `.tc-ico{font-size:28px;flex-shrink:0;filter:drop-shadow(0 2px 4px rgba(0,0,0,.1));}`);

html = html.replace(/\.tc-nm\{font-size:12px;font-weight:700;color:var\(--fg\);margin-bottom:2px;\}/, `.tc-nm{font-size:13px;font-weight:800;color:#0F172A;margin-bottom:2px;}`);
html = html.replace(/\.tc-ds\{font-size:10px;color:var\(--mu\);line-height:1\.3;\}/, `.tc-ds{font-size:11px;color:#64748B;line-height:1.3;}`);

// 3. Sidebars and button
html = html.replace(/\.brief-ttl\{font-size:11px;font-weight:700;color:var\(--g\);letter-spacing:\.1em;text-transform:uppercase;margin-bottom:8px;\}/, `.brief-ttl{font-size:13px;font-weight:800;color:var(--g);letter-spacing:.15em;text-transform:uppercase;margin-bottom:12px;}`);
html = html.replace(/\.tray-ttl\{font-size:11px;font-weight:700;color:var\(--mu\);letter-spacing:\.1em;margin-bottom:6px;\}/, `.tray-ttl{font-size:13px;font-weight:800;color:#475569;letter-spacing:.15em;margin-bottom:6px;}`);
html = html.replace(/\.tray-sub\{font-size:10px;color:rgba\(240,244,255,\.28\);margin-bottom:12px;\}/, `.tray-sub{font-size:11px;color:#94A3B8;margin-bottom:16px;font-style:italic;}`);

const hintOld = /\.hint-box\{background:rgba\(0,197,102,\.05\);border:1px solid rgba\(0,197,102,\.2\);border-radius:var\(--r\);padding:12px;font-size:11px;color:var\(--g\);margin-top:10px;\}/;
const hintNew = `.hint-box{background:#FFFBEB;border:1px solid #FEF3C7;border-radius:8px;padding:14px;font-size:12px;color:#D97706;margin-top:14px;box-shadow:inset 0 2px 4px rgba(0,0,0,.02);font-weight:500;}`;
html = html.replace(hintOld, hintNew);

const btnOld = /\.btn-chk\{padding:12px 24px;border:none;border-radius:24px;background:var\(--g\);color:#fff;font-weight:600;font-size:14px;cursor:pointer;transition:all \.2s;\}/;
const btnNew = `.btn-chk{width:240px;background:var(--g);color:white;font-weight:800;font-size:16px;border:none;border-radius:8px;padding:16px;cursor:pointer;transition:all .2s;text-transform:uppercase;letter-spacing:.05em;box-shadow:0 6px 0 #00994D, 0 10px 20px rgba(0,197,102,.3);position:relative;top:0;}`;
html = html.replace(btnOld, btnNew);

html = html.replace(/\.btn-chk:hover:not\(:disabled\)\{filter:brightness\(1\.1\);transform:translateY\(-1px\);\}/, `.btn-chk:hover:not(:disabled){transform:translateY(2px);box-shadow:0 4px 0 #00994D, 0 6px 10px rgba(0,197,102,.3);}`);
// add btn active
html = html.replace(/\.btn-chk:disabled\{opacity:\.4;cursor:not-allowed;\}/, `.btn-chk:active:not(:disabled){transform:translateY(6px);box-shadow:0 0 0 #00994D;}\n.btn-chk:disabled{background:#E2E8F0;color:#94A3B8;cursor:not-allowed;box-shadow:0 6px 0 #CBD5E1;transform:none;}`);

// Update text in button
html = html.replace(/Submit Journey ✓/g, 'EXECUTE JOURNEY');

// 4. Inject JS logic for arrows in renderGame
const jsOld = `lane.appendChild(slot);
  });`;
const jsNew = `lane.appendChild(slot);
    if (i < sc.slots.length - 1) {
      const arr = document.createElement('div');
      arr.className = 'slot-arrow';
      arr.innerHTML = '➔';
      lane.appendChild(arr);
    }
  });`;
html = html.replace(jsOld, jsNew);

fs.writeFileSync('/Users/nitinverma/Downloads/Game/index.html', html);
