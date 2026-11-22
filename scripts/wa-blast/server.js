/* eslint-disable @typescript-eslint/no-require-imports */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec, spawn } = require('child_process');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const xlsx = require('xlsx');

const PORT = process.env.PORT || 3001;
const CONFIG_FILE = path.join(__dirname, 'config.json');
const TEMPLATE_FILE = path.join(__dirname, 'template.txt');
const REPORT_FILE = path.join(__dirname, 'laporan-pengiriman.xlsx');
const PUBLIC_DIR = path.join(__dirname, 'public');

let config = {
  sheetUrl: 'https://docs.google.com/spreadsheets/d/1zhQpldcFJY-7gbnjN-efsDky5gvojccBX0r76CMDJqc/edit?usp=sharing',
  sheetName: 'Daftar Tamu',
  pin: '1212',
  minDelayMs: 4000,
  maxDelayMs: 7500
};

if (fs.existsSync(CONFIG_FILE)) {
  try {
    const raw = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
    config = { ...config, ...raw };
  } catch (e) {
    console.error('Error reading config.json:', e);
  }
}

// -----------------------------------------------------------------------------
// WHATSAPP STATE & TUNNEL STATE
// -----------------------------------------------------------------------------
let waStatus = 'connecting'; // 'connecting', 'qr_ready', 'ready', 'disconnected'
let qrDataUrl = null;
let client = null;
let sseClients = [];
let isSending = false;
let guestCache = null;
const GUEST_CACHE_TTL_MS = 30 * 1000;

const isTunnelRequested = process.argv.includes('--tunnel') || process.env.ENABLE_TUNNEL === '1';
let publicTunnelUrl = null;
let tunnelProcess = null;

function broadcastSSE(data) {
  const payload = `data: ${JSON.stringify(data)}\n\n`;
  sseClients.forEach((res) => {
    try {
      res.write(payload);
    } catch (e) {
      // client disconnected
    }
  });
}

function startTunnel() {
  if (!isTunnelRequested) return;

  console.log('🌐 Membuka Cloudflare Tunnel untuk akses online orang tua/keluarga...');
  try {
    tunnelProcess = spawn('cloudflared', ['tunnel', '--url', `http://localhost:${PORT}`], {
      stdio: ['ignore', 'pipe', 'pipe']
    });

    const urlRegex = /https:\/\/[a-zA-Z0-9-]+\.trycloudflare\.com/;

    const handleOutput = (chunk) => {
      const text = chunk.toString();
      const match = text.match(urlRegex);
      if (match && !publicTunnelUrl) {
        publicTunnelUrl = match[0];
        console.log('\n======================================================');
        console.log('🌐 LINK ONLINE UNTUK ORANG TUA / KELUARGA:');
        console.log(`👉 Link Website: ${publicTunnelUrl}`);
        console.log(`🔑 PIN Akses   : ${config.pin || '1212'}`);
        console.log('======================================================\n');

        broadcastSSE({
          type: 'tunnel_ready',
          publicUrl: publicTunnelUrl,
          pin: config.pin || '1212'
        });
      }
    };

    tunnelProcess.stdout.on('data', handleOutput);
    tunnelProcess.stderr.on('data', handleOutput);

    tunnelProcess.on('error', (err) => {
      console.warn('⚠️ Gagal menjalankan Cloudflare Tunnel:', err.message);
    });

    process.on('exit', () => {
      if (tunnelProcess) {
        try { tunnelProcess.kill(); } catch (e) {}
      }
    });
  } catch (err) {
    console.warn('⚠️ Tidak dapat memulai tunnel:', err.message);
  }
}

function initWhatsApp() {
  waStatus = 'connecting';
  qrDataUrl = null;
  broadcastSSE({ type: 'status', status: waStatus, qr: null });

  // Bersihkan stale lock file Chromium jika proses sebelumnya terhenti tiba-tiba
  const sessionDir = path.join(__dirname, '.wwebjs_auth', 'session');
  if (fs.existsSync(sessionDir)) {
    ['SingletonLock', 'SingletonCookie', 'SingletonSocket'].forEach((file) => {
      try {
        fs.unlinkSync(path.join(sessionDir, file));
      } catch (e) {
        // ignore
      }
    });
  }

  const puppeteerOpts = {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu'
    ]
  };

  let foundBrowserPath = null;
  if (process.env.PUPPETEER_EXECUTABLE_PATH && fs.existsSync(process.env.PUPPETEER_EXECUTABLE_PATH)) {
    foundBrowserPath = process.env.PUPPETEER_EXECUTABLE_PATH;
  } else if (process.platform === 'linux') {
    const linuxPaths = [
      '/usr/bin/chromium',
      '/usr/bin/chromium-browser',
      '/usr/bin/google-chrome-stable',
      '/usr/bin/google-chrome',
      '/root/.nix-profile/bin/chromium'
    ];
    for (const p of linuxPaths) {
      if (fs.existsSync(p)) {
        foundBrowserPath = p;
        break;
      }
    }
    if (!foundBrowserPath) {
      try {
        const cp = require('child_process');
        const found = cp.execSync('which chromium 2>/dev/null || which google-chrome 2>/dev/null', { encoding: 'utf-8' }).trim();
        if (found && fs.existsSync(found)) {
          foundBrowserPath = found;
        }
      } catch (e) {}
    }
  }

  if (foundBrowserPath) {
    puppeteerOpts.executablePath = foundBrowserPath;
    console.log(`🌐 Menggunakan Chromium binary di: ${foundBrowserPath}`);
  } else {
    console.log('🌐 Menggunakan Chromium bawaan Puppeteer');
  }

  client = new Client({
    authStrategy: new LocalAuth({
      dataPath: path.join(__dirname, '.wwebjs_auth')
    }),
    puppeteer: puppeteerOpts
  });

  client.on('qr', async (qr) => {
    console.log('📱 QR Code baru dibuat.');
    waStatus = 'qr_ready';
    try {
      qrDataUrl = await qrcode.toDataURL(qr, { width: 320, margin: 2 });
    } catch (err) {
      console.error('Error generating QR data URL:', err);
    }
    broadcastSSE({ type: 'status', status: waStatus, qr: qrDataUrl });
  });

  client.on('authenticated', () => {
    console.log('🔐 WhatsApp Terautentikasi.');
    waStatus = 'authenticated';
    broadcastSSE({ type: 'status', status: waStatus, qr: null });
  });

  client.on('ready', () => {
    console.log('✅ WhatsApp Siap Digunakan.');
    waStatus = 'ready';
    qrDataUrl = null;
    broadcastSSE({ type: 'status', status: waStatus, qr: null });
  });

  client.on('disconnected', (reason) => {
    console.log('❌ WhatsApp Terputus:', reason);
    waStatus = 'disconnected';
    qrDataUrl = null;
    broadcastSSE({ type: 'status', status: waStatus, qr: null });
  });

  client.initialize().catch((err) => {
    console.error('Error saat inisialisasi WhatsApp:', err);
    waStatus = 'error';
    broadcastSSE({ type: 'status', status: 'error', error: err.message });
  });
}

// -----------------------------------------------------------------------------
// GOOGLE SHEETS PARSER
// -----------------------------------------------------------------------------
function normalizePhoneNumber(rawNumber) {
  if (!rawNumber) return null;
  let clean = String(rawNumber).trim().replace(/\D/g, '');
  if (!clean) return null;
  if (clean.startsWith('0')) clean = '62' + clean.slice(1);
  else if (clean.startsWith('8')) clean = '62' + clean;
  if (clean.length < 10 || clean.length > 16) return null;
  return clean;
}

function getTemplate() {
  if (fs.existsSync(TEMPLATE_FILE)) {
    return fs.readFileSync(TEMPLATE_FILE, 'utf-8');
  }
  return `Kepada Yth.
Bapak/Ibu/Saudara/i *{nama}*
________________________

Assalamu'alaikum Warahmatullahi Wabarakatuh

Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir pada acara pernikahan:
*Akila & Gagas*

Link Undangan:
{link}

Terima kasih.`;
}

async function fetchGuestsData() {
  if (guestCache && guestCache.expiresAt > Date.now()) {
    return guestCache.guests;
  }

  let workbook = null;
  if (config.sheetUrl && config.sheetUrl.trim()) {
    try {
      let xlsxUrl = config.sheetUrl.trim();
      const match = xlsxUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
      if (match) {
        xlsxUrl = `https://docs.google.com/spreadsheets/d/${match[1]}/export?format=xlsx`;
      }
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      let res;
      try {
        res = await fetch(xlsxUrl, { redirect: 'follow', signal: controller.signal });
      } finally {
        clearTimeout(timeout);
      }
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        workbook = xlsx.read(buf, { type: 'buffer' });
      }
    } catch (e) {
      console.warn('Gagal unduh spreadsheet live, mencoba file lokal:', e.message);
    }
  }

  if (!workbook) {
    const localXlsx = path.join(__dirname, 'tamu.xlsx');
    const localCsv = path.join(__dirname, 'tamu.csv');
    if (fs.existsSync(localXlsx)) workbook = xlsx.readFile(localXlsx);
    else if (fs.existsSync(localCsv)) workbook = xlsx.readFile(localCsv);
  }

  if (!workbook) {
    throw new Error('Data spreadsheet tidak ditemukan.');
  }

  let sheetName = config.sheetName;
  if (!sheetName || !workbook.Sheets[sheetName]) {
    sheetName = workbook.SheetNames.find((s) => /tamu|guest|undangan/i.test(s)) || workbook.SheetNames[0];
  }

  const sheet = workbook.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });
  if (rows.length < 2) return [];

  const rawHeaders = Array.from(rows[0] || []);
  const headerRow = rawHeaders.map((h) => (h != null ? String(h).trim().toLowerCase() : ''));

  let colNameIdx = headerRow.findIndex((h) => Boolean(h && (h.includes('nama') || h.includes('tamu'))));
  let colLinkIdx = headerRow.findIndex((h) => Boolean(h && (h.includes('link') || h.includes('url') || h.includes('undangan'))));
  let colPhoneIdx = headerRow.findIndex((h) => Boolean(h && (h.includes('telepon') || h.includes('telp') || h.includes('hp') || h.includes('wa') || h.includes('whatsapp') || h.includes('phone'))));
  let colButtonIdx = headerRow.findIndex((h) => Boolean(h && h.includes('kirim') && h.includes('wa')));
  let colStatusIdx = headerRow.findIndex((h) => Boolean(h && h.includes('status')));
  if (colStatusIdx === -1) {
    colStatusIdx = headerRow.findIndex((h) => Boolean(h && h.includes('kirim') && !h.includes('wa')));
  }

  if (colLinkIdx === -1) {
    for (let r = 1; r < Math.min(rows.length, 10); r++) {
      if (rows[r]) {
        const found = rows[r].findIndex((cell) => typeof cell === 'string' && cell.startsWith('http'));
        if (found !== -1) {
          colLinkIdx = found;
          break;
        }
      }
    }
  }

  if (colNameIdx === -1) colNameIdx = 1;
  if (colLinkIdx === -1) colLinkIdx = 2;
  if (colPhoneIdx === -1) colPhoneIdx = 3;
  if (colButtonIdx === -1) colButtonIdx = 4;
  if (colStatusIdx === -1) colStatusIdx = 5;

  const defaultTemplate = getTemplate();
  const guests = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length === 0) continue;

    const rawName = row[colNameIdx] ? String(row[colNameIdx]).trim() : '';
    const rawLink = row[colLinkIdx] ? String(row[colLinkIdx]).trim() : '';
    const rawPhone = row[colPhoneIdx] !== undefined ? String(row[colPhoneIdx]).trim() : '';
    const rawStatus = row[colStatusIdx] ? String(row[colStatusIdx]).trim() : 'Belum';

    if (!rawName) continue;

    let customMessage = null;
    if (colButtonIdx !== -1) {
      const cellAddress = xlsx.utils.encode_cell({ r: i, c: colButtonIdx });
      const cell = sheet[cellAddress];
      if (cell && cell.l && cell.l.Target) {
        try {
          const rawTarget = cell.l.Target.replace(/&amp;/g, '&');
          const parsed = new URL(rawTarget);
          const extracted = parsed.searchParams.get('text');
          if (extracted && extracted.trim()) {
            customMessage = extracted.trim();
          }
        } catch (e) {
          // fallback
        }
      }
    }

    const normalizedPhone = normalizePhoneNumber(rawPhone);
    const link = rawLink || `https://www.akilagagaswedding.my.id/?to=${encodeURIComponent(rawName)}`;
    const finalMessage = customMessage || defaultTemplate.replace(/{nama}/g, rawName).replace(/{link}/g, link);

    guests.push({
      rowIndex: i + 1, // Baris nyata di Google Sheets
      nama: rawName,
      phone: normalizedPhone,
      rawPhone: rawPhone,
      link: link,
      status: rawStatus,
      message: finalMessage,
      isSent: /sudah|terkirim|sukses/i.test(rawStatus)
    });
  }

  guestCache = {
    guests,
    expiresAt: Date.now() + GUEST_CACHE_TTL_MS
  };
  return guests;
}

// -----------------------------------------------------------------------------
// SENDING QUEUE HANDLER
// -----------------------------------------------------------------------------
async function handleSendQueue(selectedRowIndices) {
  if (isSending) throw new Error('Pengiriman sedang berjalan.');
  if (waStatus !== 'ready') throw new Error('WhatsApp belum terhubung. Silakan scan QR code.');

  isSending = true;
  const sendStartedAt = Date.now();
  console.log(`📤 Memulai antrean ${selectedRowIndices.length} tamu.`);
  broadcastSSE({ type: 'send_start', total: selectedRowIndices.length });

  try {
    const allGuests = await fetchGuestsData();
    const queue = [];

    for (const r of selectedRowIndices) {
      const g = allGuests.find((item) => item.rowIndex === r);
      if (g && g.phone) queue.push(g);
    }

    const reportData = [];

    for (let i = 0; i < queue.length; i++) {
      const guest = queue[i];
      const progress = { current: i + 1, total: queue.length };

      broadcastSSE({
        type: 'send_progress',
        progress,
        guest: { rowIndex: guest.rowIndex, nama: guest.nama, phone: guest.phone },
        status: 'sending'
      });

      try {
        const numberLookupStartedAt = Date.now();
        const numberDetails = await client.getNumberId(guest.phone);
        console.log(`🔎 Lookup nomor baris ${guest.rowIndex}: ${Date.now() - numberLookupStartedAt} ms`);
        if (!numberDetails) {
          broadcastSSE({
            type: 'send_item_result',
            progress,
            guest: { rowIndex: guest.rowIndex, nama: guest.nama, phone: guest.phone },
            status: 'failed',
            reason: 'Nomor tidak terdaftar di WhatsApp'
          });
          reportData.push({
            Baris: guest.rowIndex,
            Nama: guest.nama,
            Nomor: guest.phone,
            Status: 'Nomor Tidak Terdaftar',
            Waktu: new Date().toLocaleString('id-ID')
          });
          continue;
        }

        const chatId = typeof numberDetails === 'string' ? numberDetails : numberDetails._serialized;

        const messageStartedAt = Date.now();
        const sentMessage = await client.sendMessage(chatId, guest.message, {
          waitUntilMsgSent: true,
          linkPreview: false
        });
        const ack = sentMessage && typeof sentMessage.ack === 'number' ? sentMessage.ack : null;
        console.log(`✅ Pesan baris ${guest.rowIndex} dikirim dalam ${Date.now() - messageStartedAt} ms (ack=${ack ?? 'unknown'}, from=${sentMessage?.from ?? 'unknown'}, to=${sentMessage?.to ?? chatId})`);

        broadcastSSE({
          type: 'send_item_result',
          progress,
          guest: { rowIndex: guest.rowIndex, nama: guest.nama, phone: guest.phone },
          status: 'success'
        });

        reportData.push({
          Baris: guest.rowIndex,
          Nama: guest.nama,
          Nomor: guest.phone,
          Status: 'Terkirim',
          Waktu: new Date().toLocaleString('id-ID')
        });

        // Delay antar nomor jika masih ada antrean berikutnya
        if (i < queue.length - 1) {
          const delay = Math.floor(Math.random() * (config.maxDelayMs - config.minDelayMs + 1)) + config.minDelayMs;
          broadcastSSE({
            type: 'send_delay',
            delaySeconds: (delay / 1000).toFixed(1)
          });
          await new Promise((res) => setTimeout(res, delay));
        }
      } catch (err) {
        broadcastSSE({
          type: 'send_item_result',
          progress,
          guest: { rowIndex: guest.rowIndex, nama: guest.nama, phone: guest.phone },
          status: 'failed',
          reason: err.message
        });
        reportData.push({
          Baris: guest.rowIndex,
          Nama: guest.nama,
          Nomor: guest.phone,
          Status: `Gagal: ${err.message}`,
          Waktu: new Date().toLocaleString('id-ID')
        });
      }
    }

    // Simpan laporan Excel
    try {
      const reportWb = xlsx.utils.book_new();
      const reportWs = xlsx.utils.json_to_sheet(reportData);
      xlsx.utils.book_append_sheet(reportWb, reportWs, 'Laporan Pengiriman');
      xlsx.writeFile(reportWb, REPORT_FILE);
    } catch (saveErr) {
      console.error('Gagal simpan laporan:', saveErr);
    }

    console.log(`🏁 Antrean ${queue.length} tamu selesai dalam ${Date.now() - sendStartedAt} ms`);
    broadcastSSE({ type: 'send_complete', total: queue.length });
  } finally {
    isSending = false;
  }
}

// -----------------------------------------------------------------------------
// HTTP SERVER WITH PIN SECURITY
// -----------------------------------------------------------------------------
const server = http.createServer(async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Access-PIN');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

  // Public Endpoint: Cek Konfigurasi (PIN required & public URL)
  if (parsedUrl.pathname === '/api/config' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      pinRequired: Boolean(config.pin),
      publicTunnelUrl: publicTunnelUrl
    }));
  }

  // Public Endpoint: Verifikasi PIN
  if (parsedUrl.pathname === '/api/auth/verify' && req.method === 'POST') {
    let body = '';
    req.on('data', (c) => body += c);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const inputPin = String(payload.pin || '').trim();
        const expectedPin = String(config.pin || '1212').trim();

        if (inputPin === expectedPin) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: true }));
        } else {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, error: 'PIN salah' }));
        }
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, error: 'Invalid payload' }));
      }
    });
    return;
  }

  // PIN PROTECTION MIDDLEWARE untuk seluruh API berikutnya
  if (parsedUrl.pathname.startsWith('/api/')) {
    const pinHeader = req.headers['x-access-pin'] || parsedUrl.searchParams.get('pin');
    const expectedPin = String(config.pin || '1212').trim();
    if (config.pin && pinHeader !== expectedPin) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, error: 'Unauthorized: PIN Akses Diperlukan' }));
    }
  }

  // SSE Stream
  if (parsedUrl.pathname === '/api/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    });
    res.write(`data: ${JSON.stringify({
      type: 'status',
      status: waStatus,
      qr: qrDataUrl,
      publicUrl: publicTunnelUrl
    })}\n\n`);
    sseClients.push(res);
    req.on('close', () => {
      sseClients = sseClients.filter((c) => c !== res);
    });
    return;
  }

  // API Status
  if (parsedUrl.pathname === '/api/status' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      status: waStatus,
      qr: qrDataUrl,
      isSending,
      publicUrl: publicTunnelUrl
    }));
  }

  // API Guests
  if (parsedUrl.pathname === '/api/guests' && req.method === 'GET') {
    try {
      const guests = await fetchGuestsData();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: true, guests }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, error: err.message }));
    }
  }

  // API Send
  if (parsedUrl.pathname === '/api/send' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const rows = payload.rows || [];
        if (!Array.isArray(rows) || rows.length === 0) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, error: 'Pilih minimal satu baris tamu.' }));
        }

        // Jalankan pengiriman di background
        handleSendQueue(rows).catch((err) => {
          console.error('Send queue error:', err);
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: true, message: 'Pengiriman dimulai.' }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // API Disconnect / Logout
  if (parsedUrl.pathname === '/api/logout' && req.method === 'POST') {
    try {
      if (client) {
        await client.logout();
        await client.destroy();
      }
      initWhatsApp();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: true }));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, error: e.message }));
    }
  }

  // Static Assets (HTML)
  let filePath = path.join(PUBLIC_DIR, parsedUrl.pathname === '/' ? 'index.html' : parsedUrl.pathname);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    let contentType = 'text/html';
    if (ext === '.css') contentType = 'text/css';
    if (ext === '.js') contentType = 'application/javascript';
    if (ext === '.json') contentType = 'application/json';
    if (ext === '.png') contentType = 'image/png';
    if (ext === '.jpg') contentType = 'image/jpeg';
    if (ext === '.svg') contentType = 'image/svg+xml';

    res.writeHead(200, { 'Content-Type': contentType });
    return res.end(fs.readFileSync(filePath));
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 Not Found');
});

server.listen(PORT, '0.0.0.0', () => {
  const url = `http://localhost:${PORT}`;
  console.log(`\n======================================================`);
  console.log(`🌿 Web UI Kirim Undangan WhatsApp Siap di Port ${PORT}!`);
  console.log(`👉 Akses: ${url}`);
  console.log(`======================================================\n`);

  // Buka browser secara otomatis hanya jika di Mac lokal
  if (process.platform === 'darwin' && !process.env.RAILWAY_ENVIRONMENT) {
    exec(`open ${url}`);
  }

  // Mulai Cloudflare Tunnel jika diminta dan bukan di Railway
  if (isTunnelRequested && !process.env.RAILWAY_ENVIRONMENT) {
    startTunnel();
  }

  // Mulai inisialisasi WhatsApp di background
  initWhatsApp();
});
