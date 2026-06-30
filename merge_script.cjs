const fs = require('fs');

const indexHtml = fs.readFileSync('/Users/nitinverma/Downloads/Game/index.html', 'utf8');
const v3Html = fs.readFileSync('/Users/nitinverma/Downloads/Game/valuefirst_journey_builder_v3.html', 'utf8');

// 1. Extract CSS
const v3StyleStart = v3Html.indexOf('<style>') + 7;
const v3StyleEnd = v3Html.indexOf('</style>');
let v3Css = v3Html.substring(v3StyleStart, v3StyleEnd);

// Replace v3 CSS variables
v3Css = v3Css.replace(/:root\{[\s\S]*?\}/, `:root{
  --g:#F26522; --gd:#D9561B; --gg:rgba(242,101,34,0.14);
  --n0:transparent; --n1:rgba(255, 255, 255, 0.55); --n2:rgba(255, 255, 255, 0.7); --n3:rgba(255, 255, 255, 0.9);
  --bd:rgba(42, 51, 116, 0.1); --tx:#2A3374; --mu:#64748B;
  --r:14px; --rs:8px;
}`);

// Replace body background
v3Css = v3Css.replace(/background:var\(--n0\);/, 'background:linear-gradient(175deg, #EEF1FF 0%, #F8F6FF 25%, #FFFAF5 55%, #FFF0E4 85%, #FFE4D0 100%);');

// Update frosted glass for cards
const frostedCSS = "backdrop-filter: blur(24px); box-shadow: 0 20px 60px rgba(42, 51, 116, 0.08), 0 0 40px rgba(242,101,34,0.04), inset 0 0 0 1px rgba(255,255,255,0.8);";
v3Css = v3Css.replace(/\.form-card\{[^\}]*\}/, `.form-card{background:var(--n1);border:1px solid rgba(255,255,255,0.7);border-radius:28px;padding:40px 44px;max-width:530px;width:100%;${frostedCSS}}`);
v3Css = v3Css.replace(/\.reveal-box\{[^\}]*\}/, `.reveal-box{background:var(--n1);border:1px solid rgba(255,255,255,0.7);border-radius:28px;padding:34px 38px;max-width:480px;width:90%;text-align:center;${frostedCSS} animation:slideUp .32s cubic-bezier(.175,.885,.32,1.275);max-height:90vh;overflow-y:auto;}`);
v3Css = v3Css.replace(/\.res-card\{[^\}]*\}/, `.res-card{background:var(--n1);border:1px solid rgba(255,255,255,0.7);border-radius:28px;padding:40px 42px;max-width:580px;width:100%;${frostedCSS} position:relative;overflow:hidden;text-align:center;}`);
v3Css = v3Css.replace(/\.ind-card\{[^\}]*\}/, `.ind-card{background:var(--n2);border:1px solid rgba(255,255,255,0.7);border-radius:16px;padding:22px 18px;cursor:pointer;transition:all .25s;position:relative;overflow:hidden;animation:cardIn .4s both;box-shadow:0 10px 30px rgba(42,51,116,0.05);}`);

// Update header
v3Css = v3Css.replace(/\.hdr\{[^\}]*\}/, `.hdr{display:flex;align-items:center;justify-content:space-between;padding:13px 26px;border-bottom:1px solid var(--bd);background:rgba(255,255,255,0.7);backdrop-filter:blur(12px);position:sticky;top:0;z-index:200;flex-shrink:0;}`);

// Add index splash CSS
const indexSplashCssMatch = indexHtml.match(/#splash \{[\s\S]*?\/\* ══════════════ SCREEN 2/);
const splashCss = indexSplashCssMatch ? indexSplashCssMatch[0].replace('/* ══════════════ SCREEN 2', '') : '';

// Remove old #splash CSS from v3
v3Css = v3Css.replace(/\/\* ══════════════════════════════════════\n   SCREEN 1 · SPLASH\n══════════════════════════════════════ \*\/[\s\S]*?\/\* ══════════════════════════════════════\n   SCREEN 2/, '/* SPLASH CSS GOES HERE */\n/* ══════════════════════════════════════\n   SCREEN 2');
v3Css = v3Css.replace('/* SPLASH CSS GOES HERE */', splashCss);


// 2. Extract HTML
const indexSplashHtmlMatch = indexHtml.match(/<div id="splash" class="screen active">[\s\S]*?<\/div>\n\n<!-- ══ SCREEN 2/);
const splashHtml = indexSplashHtmlMatch ? indexSplashHtmlMatch[0].replace('\n\n<!-- ══ SCREEN 2', '') : '';

const v3BodyStart = v3Html.indexOf('<body>') + 6;
const v3ScriptStart = v3Html.indexOf('<script>');
let v3BodyHtml = v3Html.substring(v3BodyStart, v3ScriptStart);

// Replace v3 splash with index splash
v3BodyHtml = v3BodyHtml.replace(/<!-- ══ SPLASH ══ -->[\s\S]*?<!-- ══ LEAD FORM ══ -->/, `<!-- ══ SPLASH ══ -->\n${splashHtml}\n<!-- ══ LEAD FORM ══ -->`);

// Replace logo image in headers
v3BodyHtml = v3BodyHtml.replace(/<div class="logo"><div class="lm">VF<\/div><div><div class="ln">ValueFirst<\/div><div class="lt">CPaaS Summit<\/div><\/div><\/div>/, '<div class="logo"><img src="/logo.png" style="height: 36px; object-fit: contain;" /><div><div class="logo-name" style="font-weight:700;font-size:16px;">ValueFirst</div><div class="logo-tag" style="font-size:10px;color:var(--mu);margin-top:1px;">CPaaS Arcade</div></div></div>');
v3BodyHtml = v3BodyHtml.replace(/<div class="logo"><div class="lm">VF<\/div><div><div class="ln">Journey Builder<\/div><div class="lt" id="player-tag">Player<\/div><\/div><\/div>/, '<div class="logo"><img src="/logo.png" style="height: 36px; object-fit: contain;" /><div><div class="logo-name" style="font-weight:700;font-size:16px;">Journey Builder</div><div class="logo-tag" style="font-size:10px;color:var(--mu);margin-top:1px;" id="player-tag">Player</div></div></div>');
v3BodyHtml = v3BodyHtml.replace(/<div class="logo"><div class="lm">VF<\/div><div><div class="ln" id="g-ind-name">Journey Builder<\/div><div class="lt" id="g-player-tag">Player<\/div><\/div><\/div>/, '<div class="logo"><img src="/logo.png" style="height: 36px; object-fit: contain;" /><div><div class="logo-name" style="font-weight:700;font-size:16px;" id="g-ind-name">Journey Builder</div><div class="logo-tag" style="font-size:10px;color:var(--mu);margin-top:1px;" id="g-player-tag">Player</div></div></div>');
v3BodyHtml = v3BodyHtml.replace(/<div class="logo"><div class="lm">VF<\/div><div><div class="ln">ValueFirst<\/div><div class="lt">Round Complete!<\/div><\/div><\/div>/, '<div class="logo"><img src="/logo.png" style="height: 36px; object-fit: contain;" /><div><div class="logo-name" style="font-weight:700;font-size:16px;">ValueFirst</div><div class="logo-tag" style="font-size:10px;color:var(--mu);margin-top:1px;">Round Complete!</div></div></div>');

// 3. Extract JS
const indexScriptStart = indexHtml.indexOf('<script>') + 8;
const indexScriptEnd = indexHtml.indexOf('</script>');
const indexScript = indexHtml.substring(indexScriptStart, indexScriptEnd);

// Find the particle animation logic (up to function showScreen)
const showScreenIdx = indexScript.indexOf('/* ═══════════════════════════════════════════\n   STATE');
let particleJS = '';
if(showScreenIdx === -1) {
    const fnShowScreenIdx = indexScript.indexOf('function showScreen');
    if (fnShowScreenIdx > -1) {
        particleJS = indexScript.substring(0, fnShowScreenIdx);
    }
}

const v3ScriptStartTag = v3Html.indexOf('<script>') + 8;
const v3ScriptEndTag = v3Html.indexOf('</script>');
let v3Script = v3Html.substring(v3ScriptStartTag, v3ScriptEndTag);

// Replace v3 showScreen with a version that also handles particles if needed? No, standard showScreen is fine.

const finalHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ValueFirst · Funnel Fixer Arcade</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
<style>
${v3Css}
</style>
</head>
<body>
${v3BodyHtml}
<script>
${particleJS}

${v3Script}

// Initialize particles
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
createParticles();
createFloatingIcons();
requestAnimationFrame(animate);
</script>
</body>
</html>`;

fs.writeFileSync('/Users/nitinverma/Downloads/Game/index_merged.html', finalHtml);
console.log('Merge complete. Wrote to index_merged.html');
