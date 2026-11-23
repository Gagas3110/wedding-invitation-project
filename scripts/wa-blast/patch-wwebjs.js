// Patch whatsapp-web.js for modern WhatsApp Web compatibility:
// 1. Timer polling (avoid requestAnimationFrame stalls in headless)
// 2. Direct DOM QR check (bypass WAWebSocketModel.Socket.state deprecation)
// 3. Safe QR evaluate (prevent Cannot read properties of null (reading 'Socket'))
// 4. Safe Debug.VERSION wait & getWWebVersion fallback
// 5. Safe Socket & Cmd event listeners (line 401)
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'node_modules', 'whatsapp-web.js', 'src', 'Client.js');
if (!fs.existsSync(file)) process.exit(0);

let src = fs.readFileSync(file, 'utf8');

// Patch 1: polling 500
if (!src.includes('polling: 500')) {
  src = src
    .replace(/timeout: authTimeout(,?)/g, 'timeout: authTimeout, polling: 500$1')
    .replace(/\{ timeout: 30000 \}/g, '{ timeout: 30000, polling: 500 }');
}

// Patch 2: Don't stall waiting for window.Debug if QR is already rendered in DOM!
const oldDebugWait = `waitForFunction('window.Debug?.VERSION != undefined'`;
const newDebugWait = `waitForFunction('window.Debug?.VERSION != undefined || document.querySelector("div[data-ref]") != null || document.querySelector("canvas[aria-label]") != null'`;
if (src.includes(oldDebugWait)) {
  src = src.replace(oldDebugWait, newDebugWait);
}

// Patch 3: Safe getWWebVersion
src = src.replace('return window.Debug.VERSION;', 'return window.Debug?.VERSION || "2.3000.1055852612";');

// Patch 4: Modern WhatsApp Web login check (div[data-ref] or canvas)
const oldAuth = `const state =
                        window.require?.('WAWebSocketModel')?.Socket?.state;`;

const newAuth = `if (document.querySelector('div[data-ref]') || document.querySelector('canvas[aria-label]') || document.querySelector('canvas')) {
                        return { need: true, state: 'UNPAIRED' };
                    }
                    const state =
                        window.require?.('WAWebSocketModel')?.Socket?.state;`;

if (src.includes(oldAuth)) {
  src = src.replace(oldAuth, newAuth);
}

// Patch 5: Safe evaluate on legacy QR listeners
const oldEvaluate = `await this.pupPage.evaluate(async () => {
                        const registrationInfo = await window
                            .require('WAWebSignalStoreApi')`;

const newEvaluate = `await this.pupPage.evaluate(async () => {
                        try {
                        const registrationInfo = await window
                            .require?.('WAWebSignalStoreApi')`;

if (src.includes(oldEvaluate)) {
  src = src.replace(oldEvaluate, newEvaluate);
}

const oldEvaluateEnd = `                            .Socket.on('change:hasSynced', () => {
                                window
                                    .require('WAWebConnModel')
                                    .Conn.off('change:ref', onRefChange);
                            });
                    });`;

const newEvaluateEnd = `                            ?.Socket?.on?.('change:hasSynced', () => {
                                window
                                    ?.require?.('WAWebConnModel')
                                    ?.Conn?.off?.('change:ref', onRefChange);
                            });
                        } catch (e) {
                            // Suppress legacy evaluation error if WhatsApp changed internal models
                        }
                    });`;

if (src.includes(oldEvaluateEnd)) {
  src = src.replace(oldEvaluateEnd, newEvaluateEnd);
}

// Patch 6: Safe Socket and Cmd listener registration (line 401)
const oldSocketBlock = `            await this.pupPage.evaluate(() => {
                const Socket = window.require('WAWebSocketModel').Socket;
                const Cmd = window.require('WAWebCmd').Cmd;`;

const newSocketBlock = `            await this.pupPage.evaluate(() => {
                try {
                const Socket = window.require?.('WAWebSocketModel')?.Socket;
                const Cmd = window.require?.('WAWebCmd')?.Cmd;
                if (!Socket || !Cmd) return;`;

if (src.includes(oldSocketBlock)) {
  src = src.replace(oldSocketBlock, newSocketBlock);
  const oldEnd = `if (Socket.hasSynced === true && !storeInjected) {
                    window.onAppStateHasSyncedEvent();
                }
            });`;
  const newEnd = `if (Socket.hasSynced === true && !storeInjected) {
                    window.onAppStateHasSyncedEvent();
                }
                } catch (e) {}
            });`;
  src = src.replace(oldEnd, newEnd);
}

fs.writeFileSync(file, src);
console.log('✅ patch-wwebjs: successfully applied modern WhatsApp Web compatibility patches!');
