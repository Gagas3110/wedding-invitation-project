# 📲 Web UI Kirim Undangan WhatsApp (Akila & Gagas Wedding)

Aplikasi Web UI ramah pengguna untuk mengirim undangan pernikahan ke WhatsApp tamu secara otomatis langsung dari browser di laptop Anda — didesain khusus agar mudah digunakan oleh keluarga / non-developer.

---

## 🌟 Cara Paling Mudah (Untuk Keluarga & Non-Dev):

### 1. Buka Aplikasi
Cukup **klik dua kali** file:
```text
Buka-Kirim-Undangan.command
```
*(Atau jalankan `npm run wa:ui` di terminal).*

Browser otomatis terbuka menampilkan halaman web di `http://localhost:3001`.

### 2. Hubungkan WhatsApp (Cukup 1x di Awal)
- Jika baru pertama kali buka, scan **QR Code** yang muncul di layar dengan WhatsApp HP Anda (**Perangkat Tertaut** > **Tautkan Perangkat**).
- Jika sudah pernah login, sistem akan otomatis langsung terhubung (ada badge hijau: *"WhatsApp Terhubung"*).

### 3. Pilih Tamu yang Mau Dikirim
- **Ketik nomor baris Google Sheets**: Masukkan nomor baris (misal `47, 50` atau `10-25`), lalu klik **"Pilih Baris Ini"**.
- **Atau langsung centang kotak di tabel**: Bisa centang manual, pakai pencarian nama, atau klik tombol **"Pilih Semua di Layar"**.
- Anda juga bisa klik tombol **"Lihat Pesan"** untuk pratinjau teks yang akan dikirim ke tamu tersebut.

### 4. Klik Tombol Kirim!
Klik tombol hijau besar di bagian bawah:
```text
🚀 Kirim Undangan WhatsApp (X Tamu)
```
Muncul progress bar interaktif yang menunjukkan proses pengiriman satu per satu hingga selesai!

---

## ⚙️ Fitur Tambahan:
- **Mode CLI (Terminal)**: Tetap bisa dijalankan via terminal dengan `npm run wa:send -- --rows 47,50` atau `npm run wa:preview`.
- **Ganti Akun**: Di pojok kanan atas ada tombol "Ganti Akun" jika ingin mengirim menggunakan nomor WhatsApp lain.
- **Laporan Excel**: Setiap hasil pengiriman otomatis tersimpan di `scripts/wa-blast/laporan-pengiriman.xlsx`.
