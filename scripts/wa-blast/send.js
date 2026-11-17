/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const xlsx = require('xlsx');

// -----------------------------------------------------------------------------
// KONFIGURASI & PATH
// -----------------------------------------------------------------------------
const CONFIG_FILE = path.join(__dirname, 'config.json');
const DATA_FILE_XLSX = path.join(__dirname, 'tamu.xlsx');
const DATA_FILE_CSV = path.join(__dirname, 'tamu.csv');
const TEMPLATE_FILE = path.join(__dirname, 'template.txt');
const REPORT_FILE = path.join(__dirname, 'laporan-pengiriman.xlsx');

let config = {
  sheetUrl: '',
  minDelayMs: 4000,
  maxDelayMs: 7500
};

if (fs.existsSync(CONFIG_FILE)) {
  try {
    const rawConfig = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
    config = { ...config, ...rawConfig };
  } catch (e) {
    console.warn('⚠️ Gagal membaca config.json, menggunakan konfigurasi default.');
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// -----------------------------------------------------------------------------
// 1. NORMALISASI NOMOR TELEPON
// -----------------------------------------------------------------------------
function normalizePhoneNumber(rawNumber) {
  if (!rawNumber) return null;
  // Hapus semua karakter non-angka
  let clean = String(rawNumber).trim().replace(/\D/g, '');

  if (!clean) return null;

  // Jika diawali 08... ubah jadi 628...
  if (clean.startsWith('0')) {
    clean = '62' + clean.slice(1);
  }
  // Jika diawali 8... (tanpa 0 dan tanpa 62), tambahkan 62
  else if (clean.startsWith('8')) {
    clean = '62' + clean;
  }

  // Validasi panjang nomor telepon wajar
  if (clean.length < 10 || clean.length > 16) {
    return null;
  }

  return clean;
}

// -----------------------------------------------------------------------------
// 2. PARSE ARGUMEN CLI (--rows, -r, --preview)
// -----------------------------------------------------------------------------
function parseRowArguments() {
  const args = process.argv.slice(2);
  let rowsParam = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--rows' || args[i] === '-r') {
      rowsParam = args[i + 1];
    } else if (args[i].startsWith('--rows=')) {
      rowsParam = args[i].split('=')[1];
    }
  }

  if (!rowsParam) return null;

  const targetRows = new Set();
  const parts = rowsParam.split(',');

  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.includes('-')) {
      const [start, end] = trimmed.split('-').map((n) => parseInt(n.trim(), 10));
      if (!isNaN(start) && !isNaN(end)) {
        const min = Math.min(start, end);
        const max = Math.max(start, end);
        for (let r = min; r <= max; r++) {
          targetRows.add(r);
        }
      }
    } else {
      const num = parseInt(trimmed, 10);
      if (!isNaN(num)) {
        targetRows.add(num);
      }
    }
  }

  return targetRows;
}

// -----------------------------------------------------------------------------
// 3. AMBIL DATA DARI GOOGLE SHEETS LIVE ATAU FILE LOKAL
// -----------------------------------------------------------------------------
async function fetchSheetWorkbook(url) {
  try {
    let xlsxUrl = url;
    const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (match) {
      const sheetId = match[1];
      xlsxUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=xlsx`;
    }

    console.log(`🌐 Mengambil data terbaru langsung dari Google Sheets...`);
    const res = await fetch(xlsxUrl, { redirect: 'follow' });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    const buf = Buffer.from(await res.arrayBuffer());
    return xlsx.read(buf, { type: 'buffer' });
  } catch (err) {
    console.warn(`⚠️ Gagal mengambil data langsung dari Google Sheets: ${err.message}`);
    console.warn(`👉 Menggunakan file lokal sebagai cadangan.`);
    return null;
  }
}

async function loadGuestData() {
  let workbook = null;
  let dataSource = '';

  // 1. Coba ambil langsung dari Google Sheets jika URL diisi
  if (config.sheetUrl && config.sheetUrl.trim()) {
    workbook = await fetchSheetWorkbook(config.sheetUrl.trim());
    if (workbook) {
      dataSource = 'Google Sheets (Live)';
    }
  }

  // 2. Jika tidak ada / gagal, baca file lokal
  if (!workbook) {
    if (fs.existsSync(DATA_FILE_XLSX)) {
      workbook = xlsx.readFile(DATA_FILE_XLSX);
      dataSource = path.basename(DATA_FILE_XLSX);
    } else if (fs.existsSync(DATA_FILE_CSV)) {
      workbook = xlsx.readFile(DATA_FILE_CSV);
      dataSource = path.basename(DATA_FILE_CSV);
    }
  }

  if (!workbook) {
    console.error('\n❌ ERROR: Data tamu tidak ditemukan!');
    console.error('Anda bisa:');
    console.error('1. Masukkan URL Google Sheets Anda di file "config.json"');
    console.error('   ATAU');
    console.error('2. Download sheet Anda sebagai "tamu.xlsx" atau "tamu.csv" di folder ini.\n');
    process.exit(1);
  }

  console.log(`\n📂 Sumber Data: ${dataSource}`);

  // Pilih sheet yang tepat (prioritaskan config.sheetName atau cari sheet bertema 'tamu' / 'undangan')
  let targetSheetName = config.sheetName;
  if (!targetSheetName || !workbook.Sheets[targetSheetName]) {
    targetSheetName = workbook.SheetNames.find((s) => /tamu|guest|undangan/i.test(s)) || workbook.SheetNames[0];
  }

  console.log(`📑 Membaca Sheet Tab: "${targetSheetName}" (Tersedia: ${workbook.SheetNames.join(', ')})`);
  const sheet = workbook.Sheets[targetSheetName];
  const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });

  if (rows.length < 2) {
    console.error('❌ Data kosong atau hanya ada baris header.');
    process.exit(1);
  }

  const rawHeaders = Array.from(rows[0] || []);
  const headerRow = rawHeaders.map((h) => (h != null ? String(h).trim().toLowerCase() : ''));

  // Deteksi indeks kolom berdasarkan header
  let colNameIdx = headerRow.findIndex((h) => Boolean(h && (h.includes('nama') || h.includes('tamu'))));
  let colLinkIdx = headerRow.findIndex((h) => Boolean(h && (h.includes('link') || h.includes('url') || h.includes('undangan'))));
  let colPhoneIdx = headerRow.findIndex((h) => Boolean(h && (h.includes('telepon') || h.includes('telp') || h.includes('hp') || h.includes('wa') || h.includes('whatsapp') || h.includes('phone'))));
  
  // Prioritaskan kolom yang mengandung kata 'status', hindari 'kirim wa'
  let colStatusIdx = headerRow.findIndex((h) => Boolean(h && h.includes('status')));
  if (colStatusIdx === -1) {
    colStatusIdx = headerRow.findIndex((h) => Boolean(h && h.includes('kirim') && !h.includes('wa')));
  }

  // Jika kolom Link belum ketemu di header, cari kolom di baris data yang isinya URL (http:// atau https://)
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

  // Fallback default jika masih belum terdeteksi
  if (colNameIdx === -1) colNameIdx = 1;
  if (colLinkIdx === -1) colLinkIdx = 2;
  if (colPhoneIdx === -1) colPhoneIdx = 3;
  if (colStatusIdx === -1) colStatusIdx = 5;

  console.log(`📌 Posisi Kolom Terdeteksi:`);
  console.log(`   - Nama   : Kolom ${colNameIdx + 1} (${rawHeaders[colNameIdx] || 'Tanpa Header'})`);
  console.log(`   - Link   : Kolom ${colLinkIdx + 1} (${rawHeaders[colLinkIdx] || 'Tanpa Header'})`);
  console.log(`   - No WA  : Kolom ${colPhoneIdx + 1} (${rawHeaders[colPhoneIdx] || 'Tanpa Header'})`);
  console.log(`   - Status : Kolom ${colStatusIdx + 1} (${rawHeaders[colStatusIdx] || 'Tanpa Header'})`);

  const guests = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length === 0) continue;

    const rawName = row[colNameIdx] ? String(row[colNameIdx]).trim() : '';
    const rawLink = row[colLinkIdx] ? String(row[colLinkIdx]).trim() : '';
    const rawPhone = row[colPhoneIdx] !== undefined ? String(row[colPhoneIdx]).trim() : '';
    const rawStatus = row[colStatusIdx] ? String(row[colStatusIdx]).trim() : '';

    if (!rawName) continue;

    const normalizedPhone = normalizePhoneNumber(rawPhone);

    guests.push({
      rowIndex: i + 1, // Nomor baris nyata di Google Sheets (dimulai dari 2 karena baris 1 header)
      nama: rawName,
      link: rawLink || `https://www.akilagagaswedding.my.id/?to=${encodeURIComponent(rawName)}`,
      rawPhone: rawPhone,
      phone: normalizedPhone,
      status: rawStatus,
      originalRow: row
    });
  }

  return { guests };
}

// -----------------------------------------------------------------------------
// 4. TEMPLATE PESAN
// -----------------------------------------------------------------------------
function getTemplate() {
  if (fs.existsSync(TEMPLATE_FILE)) {
    return fs.readFileSync(TEMPLATE_FILE, 'utf-8');
  }
  return `Kepada Yth.
Bapak/Ibu/Saudara/i *{nama}*
___________________________

🕊️ *The Wedding of Akila & Gagas* 🕊️

Berikut link undangan resmi kami:
🔗 {link}

Terima kasih.
— Akila & Gagas —`;
}

// -----------------------------------------------------------------------------
// 5. MAIN EXECUTION
// -----------------------------------------------------------------------------
async function main() {
  const isDryRun = process.argv.includes('--preview') || process.argv.includes('--dry-run');
  const targetRowNumbers = parseRowArguments();
  const template = getTemplate();

  const { guests } = await loadGuestData();

  let queue = [];

  if (targetRowNumbers && targetRowNumbers.size > 0) {
    console.log(`🎯 Filter Baris Terpilih: [${Array.from(targetRowNumbers).join(', ')}]`);

    for (const r of targetRowNumbers) {
      const guest = guests.find((g) => g.rowIndex === r);
      if (!guest) {
        console.log(`   ⚠️ Baris ${r}: Tidak ada tamu di baris ini.`);
        continue;
      }
      if (!guest.phone) {
        console.log(`   ⚠️ Baris ${r} (${guest.nama}): Tidak ada nomor WhatsApp yang valid.`);
        continue;
      }
      queue.push(guest);
    }
  } else {
    // Mode default: kirim semua yang ada nomor telepon dan belum terkirim
    queue = guests.filter((g) => {
      const isSent = /sudah|terkirim|sukses/i.test(g.status);
      return g.phone && !isSent;
    });
  }

  console.log('\n📊 RINGKASAN DATA:');
  console.log(`   - Total Tamu di sheet : ${guests.length}`);
  console.log(`   - Siap Dikirim        : ${queue.length} tamu\n`);

  if (queue.length === 0) {
    console.log('🎉 Tidak ada kontak yang perlu dikirim.');
    process.exit(0);
  }

  console.log('📋 DAFTAR ANTREAN PENGIRIMAN:');
  queue.forEach((g, idx) => {
    console.log(`   ${idx + 1}. [Baris ${g.rowIndex}] ${g.nama} -> ${g.phone}`);
  });

  if (isDryRun) {
    console.log('\n👀 MODE PREVIEW (--preview):');
    console.log('Contoh pesan yang akan dikirim ke antrean pertama:');
    console.log('----------------------------------------------------');
    const sampleMsg = template
      .replace(/{nama}/g, queue[0].nama)
      .replace(/{link}/g, queue[0].link);
    console.log(sampleMsg);
    console.log('----------------------------------------------------');
    console.log('\n✅ Mode preview selesai. Jalankan tanpa flag --preview untuk mulai mengirim sungguhan.');
    process.exit(0);
  }

  console.log('\n🚀 Menyiapkan koneksi WhatsApp Web...');
  console.log('👉 Jika belum login, QR Code akan muncul di bawah. Scan menggunakan WhatsApp di HP Anda.');
  console.log('👉 Sesi login akan disimpan otomatis di folder .wwebjs_auth agar tidak perlu scan ulang setiap saat.\n');

  const client = new Client({
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

  client.on('qr', (qr) => {
    console.log('\n📱 SCAN QR CODE BERIKUT DENGAN WHATSAPP:');
    qrcode.generate(qr, { small: true });
    console.log('(Buka WhatsApp di HP > Menu Titik Tiga / Pengaturan > Perangkat Tertaut > Tautkan Perangkat)\n');
  });

  client.on('authenticated', () => {
    console.log('🔐 Berhasil diautentikasi!');
  });

  client.on('auth_failure', (msg) => {
    console.error('❌ Gagal autentikasi WhatsApp:', msg);
  });

  client.on('ready', async () => {
    console.log('✅ WhatsApp Web SIAP! Memulai proses pengiriman...\n');

    const reportData = [];

    for (let i = 0; i < queue.length; i++) {
      const guest = queue[i];
      const progress = `[${i + 1}/${queue.length}]`;

      const message = template
        .replace(/{nama}/g, guest.nama)
        .replace(/{link}/g, guest.link);

      try {
        process.stdout.write(`${progress} Mengirim ke [Baris ${guest.rowIndex}] ${guest.nama} (${guest.phone})... `);

        // Verifikasi dan dapatkan WhatsApp ID (JID/LID) yang valid dari WhatsApp server
        const numberDetails = await client.getNumberId(guest.phone);
        if (!numberDetails) {
          console.log('⚠️ Nomor tidak terdaftar di WA');
          reportData.push({
            Baris: guest.rowIndex,
            Nama: guest.nama,
            Nomor: guest.phone,
            Link: guest.link,
            Status: 'Nomor Tidak Terdaftar di WA',
            Waktu: new Date().toLocaleString('id-ID')
          });
          continue;
        }

        const chatId = typeof numberDetails === 'string' ? numberDetails : numberDetails._serialized;

        // Kirim pesan dan tunggu konfirmasi pengiriman dari server WhatsApp (waitUntilMsgSent: true)
        await client.sendMessage(chatId, message, {
          waitUntilMsgSent: true,
          linkPreview: false
        });
        console.log('✅ TERKIRIM!');

        reportData.push({
          Baris: guest.rowIndex,
          Nama: guest.nama,
          Nomor: guest.phone,
          Link: guest.link,
          Status: 'Terkirim',
          Waktu: new Date().toLocaleString('id-ID')
        });

        // Jeda anti-spam jika masih ada antrean berikutnya
        if (i < queue.length - 1) {
          const delay = getRandomDelay(config.minDelayMs, config.maxDelayMs);
          const seconds = (delay / 1000).toFixed(1);
          console.log(`   ⏳ Jeda ${seconds} detik demi keamanan akun WhatsApp...\n`);
          await sleep(delay);
        }
      } catch (err) {
        console.log(`❌ GAGAL: ${err.message}`);
        reportData.push({
          Baris: guest.rowIndex,
          Nama: guest.nama,
          Nomor: guest.phone,
          Link: guest.link,
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
      console.log(`\n📄 Laporan pengiriman tersimpan di: ${REPORT_FILE}`);
    } catch (saveErr) {
      console.error('Gagal menyimpan file laporan:', saveErr);
    }

    console.log('\n🎉 SEMUA PENGIRIMAN SELESAI!');
    console.log('⏳ Menunggu 5 detik untuk memastikan semua pesan tersinkronisasi sempurna ke server WhatsApp...');
    await sleep(5000);
    console.log('Menutup sesi WhatsApp...');
    await client.destroy();
    process.exit(0);
  });

  client.initialize();
}

main().catch((err) => {
  console.error('\n❌ Terjadi kesalahan fatal:', err);
  process.exit(1);
});
