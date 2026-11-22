// whatsapp-web.js 1.34.8 waits for WhatsApp Web with puppeteer's default
// requestAnimationFrame polling. In headless Chromium on a server, rAF can stall,
// so waitForFunction never re-checks and times out even though the page is ready
// (wwebjs/whatsapp-web.js#201940). Poll on a timer instead.
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'node_modules', 'whatsapp-web.js', 'src', 'Client.js');
if (!fs.existsSync(file)) process.exit(0);
let src = fs.readFileSync(file, 'utf8');
if (src.includes('polling: 500')) process.exit(0);
const out = src
  .replace(/timeout: authTimeout(,?)/g, 'timeout: authTimeout, polling: 500$1')
  .replace(/\{ timeout: 30000 \}/g, '{ timeout: 30000, polling: 500 }');
if (out === src) {
  console.warn('patch-wwebjs: pattern not found, skipped');
} else {
  fs.writeFileSync(file, out);
  console.log('patch-wwebjs: applied timer polling');
}
