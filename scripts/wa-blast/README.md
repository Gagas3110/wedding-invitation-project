# 📲 Web UI Kirim Undangan WhatsApp (Akila & Gagas Wedding)

Aplikasi Web UI ramah pengguna untuk mengirim undangan pernikahan ke WhatsApp tamu secara otomatis — didesain khusus agar mudah digunakan oleh keluarga / orang tua dari laptop maupun HP mereka sendiri.

---

## 🌟 2 Pilihan Penggunaan:

### Pilihan 1: Mode Online (Bisa Dibuka Orang Tua dari HP Jarak Jauh) 🌐
Gunakan mode ini jika orang tua ingin membuka web pengiriman **dari HP mereka sendiri** di mana saja:

1. **Jalankan Aplikasi:**
   Klik dua kali file:
   ```text
   Buka-Kirim-Undangan-Online.command
   ```
   *(Atau lewat terminal: `npm run wa:online`)*

2. **Bagikan Link ke Orang Tua:**
   Di terminal dan di layar dashboard akan muncul link online aman, misalnya:
   ```text
   👉 https://xxxx-xxxx.trycloudflare.com
   🔑 PIN Akses: 1212
   ```
3. **Kirimkan link tersebut lewat WhatsApp ke orang tua.**
4. Orang tua buka link dari browser HP mereka, masukkan PIN `1212`, dan langsung bisa memilih baris tamu serta klik **Kirim**!

---

### Pilihan 2: Mode Lokal (Dipakai di Laptop Anda Sendiri) 💻
Gunakan mode ini jika orang tua memakai langsung dari laptop Anda:

1. **Jalankan Aplikasi:**
   Klik dua kali file:
   ```text
   Buka-Kirim-Undangan.command
   ```
   *(Atau lewat terminal: `npm run wa:ui`)*
2. Browser otomatis terbuka di `http://localhost:3001`.

---

## 🔒 Keamanan (PIN Akses)
- Link online diproteksi dengan **4-digit PIN** (default: `1212`, bisa diubah di file `config.json`).
- Siapa pun di internet tidak bisa melihat nomor telepon tamu atau mengirim pesan tanpa memasukkan PIN yang benar.

---

## 📋 Fitur Dashboard:
- **Ketik Nomor Baris Google Sheets**: Cukup masukkan nomor baris (misal `47, 50` atau rentang `10-25`), lalu klik **"Pilih Baris Ini"**.
- **Pencarian Nama Tamu**: Cari cepat nama tamu dengan kolom pencarian.
- **Tombol "Lihat Pesan"**: Pratinjau isi teks pesan yang akan dikirim sebelum menekan tombol kirim.
- **Progres Interaktif**: Tampilan progress bar dan status kirim langsung per tamu.
- **Laporan Excel**: Rekap pengiriman otomatis dicatat ke `laporan-pengiriman.xlsx`.
