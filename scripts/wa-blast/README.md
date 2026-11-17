# 📲 WhatsApp Blast Undangan Otomatis (Akila & Gagas Wedding)

Script otomasi untuk mengirimkan undangan pernikahan ke kontak yang memiliki nomor telepon secara otomatis melalui WhatsApp Web langsung dari laptop Anda tanpa perlu klik satu per satu di browser.

---

## 🚀 Fitur Unggulan
1. **Pilih Baris Tertentu (`--rows`)**: Bisa memilih kirim hanya ke baris tertentu (misal: baris 2, 4, 6 atau rentang 10-20).
2. **Koneksi Langsung ke Google Sheets**: Bisa membaca data spreadsheet secara live via URL di `config.json` tanpa perlu download CSV/Excel manual!
3. **Otomatis Filter**: Hanya mengirim ke baris yang ada nomor HP valid dan belum terkirim.
4. **Normalisasi Nomor Otomatis**: Mendukung format `812xxx` (seperti di sheet Anda), `0812xxx`, maupun `62812xxx`.
5. **Template Dinamis**: Pesan otomatis menggantikan `{nama}` dan `{link}` sesuai data tiap tamu.
6. **Anti-Spam Delay**: Jeda acak 4 - 7 detik antar pesan agar akun WhatsApp tetap aman dan terhindar dari blokir.
7. **Simpan Sesi (Login Cukup 1x)**: Sesi WhatsApp disimpan di folder `.wwebjs_auth`.
8. **Laporan Otomatis**: Hasil pengiriman otomatis dicatat ke file `laporan-pengiriman.xlsx`.

---

## 📋 Cara Penggunaan

### 1. Hubungkan Data Tamu (Pilih salah satu)

#### Cara A: Langsung via Link Google Sheets (Paling Praktis, Tanpa Download)
1. Buka spreadsheet Anda di browser > klik tombol **Share / Bagikan** di kanan atas > ubah akses menjadi **"Anyone with the link can view" (Siapa saja yang memiliki link dapat melihat)**.
2. Copy URL spreadsheet Anda dari address bar browser.
3. Buka file `scripts/wa-blast/config.json`, lalu paste URL-nya:
   ```json
   {
     "sheetUrl": "https://docs.google.com/spreadsheets/d/ID_SPREADSHEET_ANDA/edit#gid=0",
     "minDelayMs": 4000,
     "maxDelayMs": 7500
   }
   ```

#### Cara B: Menggunakan File Lokal
Download Google Sheet Anda sebagai Excel/CSV dan simpan sebagai `scripts/wa-blast/tamu.xlsx` (atau `tamu.csv`).

---

### 2. Memilih Baris yang Ingin Dikirim (`--rows`)

Nomor baris di bawah ini **sesuai dengan nomor baris yang terlihat di sebelah kiri Google Sheets**:

- **Kirim baris tertentu saja (misal baris 2, 4, 6):**
  ```bash
  npm run wa:send -- --rows 2,4,6
  ```

- **Kirim rentang baris (misal baris 10 sampai 25):**
  ```bash
  npm run wa:send -- --rows 10-25
  ```

- **Kombinasi baris tunggal & rentang (misal baris 2, 5, dan 10 sampai 15):**
  ```bash
  npm run wa:send -- --rows 2,5,10-15
  ```

- **Kirim semua tamu yang ada nomor HP-nya dan belum dikirim:**
  ```bash
  npm run wa:send
  ```

---

### 3. Pratinjau Terlebih Dahulu (Preview Tanpa Kirim WA)
Sebelum mengirim sungguhan, cek dulu antrean dan pesan yang ter-generate dengan menambahkan flag `--preview`:
```bash
npm run wa:preview -- --rows 2,4,6
```

---

### 4. Menjalankan Pengiriman Sungguhan
Jalankan:
```bash
npm run wa:send -- --rows 2,4,6
```
1. Jika baru pertama kali dijalankan, **QR Code** akan muncul di layar Terminal.
2. Buka WhatsApp di HP Anda > **Perangkat Tertaut (Linked Devices)** > **Tautkan Perangkat** > Scan QR Code di terminal.
3. Setelah terhubung, script akan otomatis mengirimkan pesan satu per satu ke setiap nomor dengan jeda beberapa detik!
