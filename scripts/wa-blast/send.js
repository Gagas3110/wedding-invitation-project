/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const xlsx = require('xlsx');

// -----------------------------------------------------------------------------
// KONFIGURASI
// -----------------------------------------------------------------------------
const DATA_FILE_XLSX = path.join(__dirname, 'tamu.xlsx');
const DATA_FILE_CSV = path.join(__dirname, 'tamu.csv');
const TEMPLATE_FILE = path.join(__dirname, 'template.txt');
const REPORT_FILE = path.join(__dirname, 'laporan-pengiriman.xlsx');

// Jeda antar pesan (milidetik) untuk mencegah nomor diblokir WhatsApp (4 - 7 detik)
const MIN_DELAY_MS = 4000;
const MAX_DELAY_MS = 7500;

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
  // Hapus semua karakter non-angka (spasi, tanda plus, tanda minus, titik)
  let clean = String(rawNumber).trim().replace(/\D/g, '');

  if (!clean) return null;

  // Jika diawali 08... ubah jadi 628...
  if (clean.startsWith('0')) {
    clean = '62' + clean.slice(1);
  }
  // Jika diawali 8... (tanpa 0 dan tanpa 62, seperti di spreadsheet user), tambahkan 62
  else if (clean.startsWith('8')) {
    clean = '62' + clean;
  }
  // Jika diawali 62... sudah benar
  else if (clean.startsWith('62')) {
    // sudah pas
  }

  // Validasi panjang nomor telepon wajar (minimal 10 digit, maks 16 digit)
  if (clean.length < 10 || clean.length > 16) {
    return null;
  }

  return clean;
}

// -----------------------------------------------------------------------------
// 2. BACA TEMPLATE PESAN
// -----------------------------------------------------------------------------
function getTemplate() {
  if (fs.existsSync(TEMPLATE_FILE)) {
    return fs.readFileSync(TEMPLATE_FILE, 'utf-8');
  }
  return `Kepada Yth.
Bapak/Ibu/Saudara/i *{nama}*
___________________________

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri momen bahagia kami:

🕊️ *The Wedding of Akila & Gagas* 🕊️

Berikut tautan undangan kami untuk informasi lengkap acara & RSVP:
🔗 {link}

Merupakan kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Terima kasih.
— Akila & Gagas —`;
}

// -----------------------------------------------------------------------------
// 3. BACA DATA SPREADSHEET (XLSX / CSV)
// -----------------------------------------------------------------------------
function loadGuestData() {
  let targetPath = null;
  if (fs.existsSync(DATA_FILE_XLSX)) {
    targetPath = DATA_FILE_XLSX;
  } else if (fs.existsSync(DATA_FILE_CSV)) {
    targetPath = DATA_FILE_CSV;
  }

  if (!targetPath) {
    console.error('\n❌ ERROR: File data tamu tidak ditemukan!');
    console.error('Silakan download spreadsheet Anda sebagai Excel (tamu.xlsx) atau CSV (tamu.csv)');
    console.error(`dan letakkan di folder: ${__dirname}\n`);
    process.exit(1);
  }

  console.log(`\n📂 Membaca file: ${path.basename(targetPath)}`);
  const workbook = xlsx.readFile(targetPath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 }); // array of arrays

  if (rows.length < 2) {
    console.error('❌ Data kosong atau hanya ada header.');
    process.exit(1);
  }

  // Deteksi indeks kolom berdasarkan nama header atau posisi umum
  const rawHeaders = Array.from(rows[0] || []);
  const headerRow = rawHeaders.map((h) => (h != null ? String(h).trim().toLowerCase() : ''));
  
  let colNameIdx = headerRow.findIndex((h) => Boolean(h && (h.includes('nama') || h.includes('tamu'))));
  let colLinkIdx = headerRow.findIndex((h) => Boolean(h && (h.includes('link') || h.includes('url') || h.includes('undangan'))));
  let colPhoneIdx = headerRow.findIndex((h) => Boolean(h && (h.includes('telepon') || h.includes('telp') || h.includes('hp') || h.includes('wa') || h.includes('phone'))));
  let colStatusIdx = headerRow.findIndex((h) => Boolean(h && (h.includes('status') || h.includes('kirim'))));

  // Fallback berdasarkan struktur default template spreadsheet (Col B = 1, Col C = 2, Col E = 4, Col G = 6)
  if (colNameIdx === -1) colNameIdx = 1;
  if (colLinkIdx === -1) colLinkIdx = 2;
  if (colPhoneIdx === -1) colPhoneIdx = 4;
  if (colStatusIdx === -1) colStatusIdx = 6;

  console.log(`📌 Posisi Kolom: Nama [Kolom ${colNameIdx + 1}], Link [Kolom ${colLinkIdx + 1}], HP [Kolom ${colPhoneIdx + 1}], Status [Kolom ${colStatusIdx + 1}]`);

  const guests = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length === 0) continue;

    const rawName = row[colNameIdx] ? String(row[colNameIdx]).trim() : '';
    const rawLink = row[colLinkIdx] ? String(row[colLinkIdx]).trim() : '';
    const rawPhone = row[colPhoneIdx] !== undefined ? String(row[colPhoneIdx]).trim() : '';
    const rawStatus = row[colStatusIdx] ? String(row[colStatusIdx]).trim() : '';

    if (!rawName) continue; // baris kosong

    const normalizedPhone = normalizePhoneNumber(rawPhone);

    guests.push({
      rowIndex: i + 1,
      nama: rawName,
      link: rawLink || `https://www.akilagagaswedding.my.id/?to=${encodeURIComponent(rawName)}`,
      rawPhone: rawPhone,
      phone: normalizedPhone,
      status: rawStatus,
      originalRow: row
    });
  }

  return { guests, targetPath, colStatusIdx };
}

// -----------------------------------------------------------------------------
// 4. MAIN RUNNER
// -----------------------------------------------------------------------------
async function main() {
  const isDryRun = process.argv.includes('--preview') || process.argv.includes('--dry-run');
  const template = getTemplate();
  const { guests } = loadGuestData();

  // Filter hanya tamu yang punya nomor telepon valid & belum dikirim
  const queue = guests.filter((g) => {
    const isSent = /sudah|terkirim|sukses/i.test(g.status);
    return g.phone && !isSent;
  });

  const skippedAlreadySent = guests.filter((g) => /sudah|terkirim|sukses/i.test(g.status)).length;
  const skippedNoPhone = guests.filter((g) => !g.phone).length;

  console.log('\n📊 RINGKASAN DATA:');
  console.log(`   - Total Tamu di sheet : ${guests.length}`);
  console.log(`   - Tanpa Nomor Telepon : ${skippedNoPhone}`);
  console.log(`   - Sudah Pernah Kirim  : ${skippedAlreadySent}`);
  console.log(`   - Siap Dikirim        : ${queue.length} tamu\n`);

  if (queue.length === 0) {
    console.log('🎉 Semua tamu yang memiliki nomor telepon sudah terkirim atau tidak ada nomor baru.');
    process.exit(0);
  }

  // Tampilkan daftar antrean
  console.log('📋 DAFTAR ANTREAN PENGIRIMAN:');
  queue.forEach((g, idx) => {
    console.log(`   ${idx + 1}. ${g.nama} -> ${g.phone} (${g.link})`);
  });

  if (isDryRun) {
    console.log('\n👀 MODE PREVIEW (--preview / --dry-run):');
    console.log('Contoh pesan yang akan dikirim ke tamu pertama:');
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
      const chatId = `${guest.phone}@c.us`;

      const message = template
        .replace(/{nama}/g, guest.nama)
        .replace(/{link}/g, guest.link);

      try {
        process.stdout.write(`${progress} Mengirim ke ${guest.nama} (${guest.phone})... `);

        // Verifikasi apakah nomor terdaftar di WhatsApp
        const isRegistered = await client.isRegisteredUser(chatId);
        if (!isRegistered) {
          console.log('⚠️ Nomor tidak terdaftar di WA');
          reportData.push({
            Nama: guest.nama,
            Nomor: guest.phone,
            Link: guest.link,
            Status: 'Nomor Tidak Terdaftar di WA',
            Waktu: new Date().toLocaleString('id-ID')
          });
          continue;
        }

        // Kirim pesan
        await client.sendMessage(chatId, message);
        console.log('✅ TERKIRIM!');

        reportData.push({
          Nama: guest.nama,
          Nomor: guest.phone,
          Link: guest.link,
          Status: 'Terkirim',
          Waktu: new Date().toLocaleString('id-ID')
        });

        // Jeda anti-spam jika masih ada antrean berikutnya
        if (i < queue.length - 1) {
          const delay = getRandomDelay(MIN_DELAY_MS, MAX_DELAY_MS);
          const seconds = (delay / 1000).toFixed(1);
          console.log(`   ⏳ Jeda ${seconds} detik demi keamanan akun WhatsApp...\n`);
          await sleep(delay);
        }
      } catch (err) {
        console.log(`❌ GAGAL: ${err.message}`);
        reportData.push({
          Nama: guest.nama,
          Nomor: guest.phone,
          Link: guest.link,
          Status: `Gagal: ${err.message}`,
          Waktu: new Date().toLocaleString('id-ID')
        });
      }
    }

    // Buat laporan Excel hasil pengiriman
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

