/* eslint-disable @typescript-eslint/no-require-imports */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const xlsx = require('xlsx');

const PORT = 3001;
const CONFIG_FILE = path.join(__dirname, 'config.json');
const TEMPLATE_FILE = path.join(__dirname, 'template.txt');
const REPORT_FILE = path.join(__dirname, 'laporan-pengiriman.xlsx');
const PUBLIC_DIR = path.join(__dirname, 'public');

let config = {
  sheetUrl: 'https://docs.google.com/spreadsheets/d/1zhQpldcFJY-7gbnjN-efsDky5gvojccBX0r76CMDJqc/edit?usp=sharing',
  sheetName: 'Daftar Tamu',
  minDelayMs: 4000,
  maxDelayMs: 7000
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
// WHATSAPP STATE
// -----------------------------------------------------------------------------
let waStatus = 'connecting'; // 'connecting', 'qr_ready', 'ready', 'disconnected'
let qrDataUrl = null;
let client = null;
let sseClients = [];
let isSending = false;

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

function initWhatsApp() {
  waStatus = 'connecting';
  qrDataUrl = null;
  broadcastSSE({ type: 'status', status: waStatus, qr: null });

  client = new Client({
    authStrategy: new LocalAuth({
      dataPath: path.join(__dirname, '.wwebjs_auth')
    }),
    puppeteer: {
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
    }
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
  let workbook = null;
  if (config.sheetUrl && config.sheetUrl.trim()) {
    try {
      let xlsxUrl = config.sheetUrl.trim();
      const match = xlsxUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
      if (match) {
        xlsxUrl = `https://docs.google.com/spreadsheets/d/${match[1]}/export?format=xlsx`;
      }
      const res = await fetch(xlsxUrl, { redirect: 'follow' });
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

  return guests;
}

// -----------------------------------------------------------------------------
// SENDING QUEUE HANDLER
// -----------------------------------------------------------------------------
async function handleSendQueue(selectedRowIndices) {
  if (isSending) throw new Error('Pengiriman sedang berjalan.');
  if (waStatus !== 'ready') throw new Error('WhatsApp belum terhubung. Silakan scan QR code.');

  isSending = true;
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
        const numberDetails = await client.getNumberId(guest.phone);
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

        await client.sendMessage(chatId, guest.message, {
          waitUntilMsgSent: true,
          linkPreview: false
        });

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

    broadcastSSE({ type: 'send_complete', total: queue.length });
  } finally {
    isSending = false;
  }
}

// -----------------------------------------------------------------------------
// HTTP SERVER
// -----------------------------------------------------------------------------
const server = http.createServer(async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

  // SSE Stream
  if (parsedUrl.pathname === '/api/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    });
    res.write(`data: ${JSON.stringify({ type: 'status', status: waStatus, qr: qrDataUrl })}\n\n`);
    sseClients.push(res);
    req.on('close', () => {
      sseClients = sseClients.filter((c) => c !== res);
    });
    return;
  }

  // API Status
  if (parsedUrl.pathname === '/api/status' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: waStatus, qr: qrDataUrl, isSending }));
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

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`\n======================================================`);
  console.log(`🌿 Web UI Kirim Undangan WhatsApp Siap!`);
  console.log(`👉 Buka di browser: ${url}`);
  console.log(`======================================================\n`);

  // Buka browser secara otomatis di Mac
  exec(`open ${url}`);

  // Mulai inisialisasi WhatsApp di background
  initWhatsApp();
});

