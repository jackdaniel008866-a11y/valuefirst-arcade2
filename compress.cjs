const fs = require('fs');
let html = fs.readFileSync('/Users/nitinverma/Downloads/Game/index.html', 'utf8');

// CSS updates
html = html.replace('padding:40px 44px', 'padding:24px 32px');
html = html.replace('.fsub{font-size:13px;color:var(--mu);margin-bottom:26px;line-height:1.6;}', '.fsub{font-size:13px;color:var(--mu);margin-bottom:14px;line-height:1.4;}');
html = html.replace('.fr{margin-bottom:16px;}', '.fr{margin-bottom:10px;}');
html = html.replace('margin-bottom:6px;letter-spacing:.05em;}', 'margin-bottom:4px;letter-spacing:.05em;}'); // .fr label
html = html.replace('padding:12px 15px', 'padding:10px 14px'); // .fr input
html = html.replace('margin-bottom: 24px;', 'margin-bottom: 16px;'); // .form-progress-bar

// HTML updates
html = html.replace(
  '<div class="fr fr-locked anim-enter" style="position:relative;"><label>WORK EMAIL *</label><input type="email" id="ff-em" placeholder="rahul@company.com"/><div class="ferr" id="fe-em">Valid email required</div></div>\n      <div class="fr fr-locked anim-enter" style="position:relative;"><label>PHONE *</label><input type="tel" id="ff-ph" placeholder="+91 98765 43210"/><div class="ferr" id="fe-ph">Required</div></div>',
  '<div class="fgrid">\n        <div class="fr fr-locked anim-enter" style="position:relative;"><label>WORK EMAIL *</label><input type="email" id="ff-em" placeholder="rahul@company.com"/><div class="ferr" id="fe-em">Valid email required</div></div>\n        <div class="fr fr-locked anim-enter" style="position:relative;"><label>PHONE *</label><input type="tel" id="ff-ph" placeholder="+91 98765 43210"/><div class="ferr" id="fe-ph">Required</div></div>\n      </div>'
);

// We should also ensure the locked icon is aligned correctly now that input height is smaller
html = html.replace("top: 38px;", "top: 29px;");

fs.writeFileSync('/Users/nitinverma/Downloads/Game/index.html', html);
