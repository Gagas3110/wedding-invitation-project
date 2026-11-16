# 📲 WhatsApp Blast Undangan Otomatis (Akila & Gagas Wedding)

Script otomasi untuk mengirimkan undangan pernikahan ke kontak yang memiliki nomor telepon secara otomatis melalui WhatsApp Web langsung dari laptop Anda.

---

## 🚀 Fitur Unggulan
1. **Otomatis Filter**: Hanya mengirim ke baris yang sudah ada nomor teleponnya dan statusnya belum "Sudah Kirim" / "Terkirim".
2. **Normalisasi Nomor Otomatis**: Mendukung format `812xxx`, `0812xxx`, maupun `62812xxx`.
3. **Template Dinamis**: Pesan otomatis menggantikan `{nama}` dan `{link}` sesuai data tiap tamu.
4. **Anti-Spam Delay**: Jeda acak 4 - 7 detik antar pesan agar akun WhatsApp tetap aman dan terhindar dari blokir.
5. **Simpan Sesi (Login Cukup 1x)**: Sesi WhatsApp disimpan di folder `.wwebjs_auth`.
6. **Laporan Otomatis**: Hasil pengiriman otomatis dicatat ke file `laporan-pengiriman.xlsx`.

---

## 📋 Cara Penggunaan

### Langkah 1: Siapkan File Tamu
1. Buka spreadsheet Google Sheets Anda.
2. Klik **File** > **Download** > **Microsoft Excel (.xlsx)** atau **Comma Separated Values (.csv)**.
3. Beri nama file: `tamu.xlsx` (atau `tamu.csv`).
4. Taruh file tersebut di dalam folder `scripts/wa-blast/`.

### Langkah 2: Edit Template Pesan (Opsional)
Buka file `template.txt` di folder ini jika ingin mengubah kalimat undangan. Jangan hapus tag `{nama}` dan `{link}`.

### Langkah 3: Uji Coba Preview (Tanpa Kirim WA)
Sebelum mengirim sungguhan, cek dulu antrean dan contoh pesannya dengan perintah:
```bash
cd scripts/wa-blast
node send.js --preview
```

### Langkah 4: Mulai Pengiriman
Jalankan perintah:
```bash
cd scripts/wa-blast
node send.js
```
- Jika pertama kali dijalankan, **QR Code** akan muncul di layar Terminal.
- Buka WhatsApp di HP Anda > **Perangkat Tertaut (Linked Devices)** > **Tautkan Perangkat** > Scan QR Code di terminal.
- Setelah terhubung, script akan otomatis mengirimkan undangan satu per satu ke seluruh tamu yang memiliki nomor telepon!

