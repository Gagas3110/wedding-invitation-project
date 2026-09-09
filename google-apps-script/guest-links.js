/* eslint-disable */
/**
 * Google Apps Script - Generator Link Undangan Per Tamu
 * 
 * Cara pakai:
 * 1. Buka spreadsheet Wedding RSVP Data Dev
 * 2. Buka Apps Script (Extensions > Apps Script)
 * 3. Tambahkan file baru, paste kode ini
 * 4. Simpan & reload spreadsheet
 * 5. Akan muncul menu "✉️ Undangan" di menu bar
 * 6. Klik "✉️ Undangan" > "Setup Sheet Daftar Tamu" untuk membuat template
 * 7. Isi nama tamu di kolom A, lalu klik "Generate Semua Link"
 */

// ====== KONFIGURASI ======
// Ganti dengan URL website undangan kamu (tanpa trailing slash)
const WEDDING_SITE_URL = "https://your-wedding-site.com";
const GUEST_SHEET_NAME = "Daftar Tamu";
// =========================

/**
 * Menu custom yang muncul di spreadsheet
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("✉️ Undangan")
    .addItem("📋 Setup Sheet Daftar Tamu", "setupGuestSheet")
    .addSeparator()
    .addItem("🔗 Generate Semua Link", "generateAllLinks")
    .addItem("📊 Hitung Total Tamu", "countGuests")
    .addToUi();
}

/**
 * Membuat sheet "Daftar Tamu" dengan header dan formatting
 */
function setupGuestSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(GUEST_SHEET_NAME);

  if (sheet) {
    const ui = SpreadsheetApp.getUi();
    const response = ui.alert(
      "Sheet Sudah Ada",
      'Sheet "' + GUEST_SHEET_NAME + '" sudah ada. Apakah ingin reset? (Data akan hilang!)',
      ui.ButtonSet.YES_NO
    );
    if (response !== ui.Button.YES) return;
    sheet.clear();
  } else {
    sheet = ss.insertSheet(GUEST_SHEET_NAME);
  }

  // Set headers
  const headers = ["No", "Nama Tamu", "Link Undangan", "Status Kirim", "Catatan"];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Format headers
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#c5a880");
  headerRange.setFontColor("#ffffff");
  headerRange.setHorizontalAlignment("center");
  headerRange.setFontSize(11);

  // Set column widths
  sheet.setColumnWidth(1, 50);   // No
  sheet.setColumnWidth(2, 250);  // Nama Tamu
  sheet.setColumnWidth(3, 500);  // Link Undangan
  sheet.setColumnWidth(4, 120);  // Status Kirim
  sheet.setColumnWidth(5, 200);  // Catatan

  // Add example data
  const examples = [
    [1, "Budi Santoso", "", "Belum", ""],
    [2, "dr. Siti Nurhaliza, Sp.A", "", "Belum", ""],
    [3, "Keluarga Pak Ahmad", "", "Belum", "Undang sekeluarga"],
    [4, "Andi & Istri", "", "Belum", ""],
  ];
  sheet.getRange(2, 1, examples.length, examples[0].length).setValues(examples);

  // Add data validation for Status Kirim column
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Belum", "Sudah Kirim", "Dibaca"])
    .setAllowInvalid(false)
    .build();
  sheet.getRange(2, 4, 500, 1).setDataValidation(statusRule);

  // Alternate row colors
  for (let i = 2; i <= 100; i++) {
    if (i % 2 === 0) {
      sheet.getRange(i, 1, 1, headers.length).setBackground("#faf8f5");
    }
  }

  // Freeze header row
  sheet.setFrozenRows(1);

  // Auto-generate links for example data
  generateAllLinks();

  SpreadsheetApp.getUi().alert(
    "✅ Setup Selesai!",
    'Sheet "' + GUEST_SHEET_NAME + '" berhasil dibuat.\n\n' +
    "Cara pakai:\n" +
    "1. Isi nama tamu di kolom B (Nama Tamu)\n" +
    "2. Klik menu ✉️ Undangan > Generate Semua Link\n" +
    "3. Link otomatis muncul di kolom C\n" +
    "4. Share link ke masing-masing tamu!",
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

/**
 * Generate link undangan untuk semua tamu yang belum punya link
 */
function generateAllLinks() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(GUEST_SHEET_NAME);

  if (!sheet) {
    SpreadsheetApp.getUi().alert("❌ Sheet '" + GUEST_SHEET_NAME + "' tidak ditemukan. Jalankan Setup dulu.");
    return;
  }

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    SpreadsheetApp.getUi().alert("⚠️ Belum ada data tamu. Isi nama tamu di kolom B terlebih dahulu.");
    return;
  }

  const dataRange = sheet.getRange(2, 1, lastRow - 1, 5);
  const data = dataRange.getValues();
  let generated = 0;

  for (let i = 0; i < data.length; i++) {
    const name = data[i][1]; // Kolom B = Nama Tamu
    if (name && name.toString().trim() !== "") {
      const encodedName = encodeURIComponent(name.toString().trim());
      const link = WEDDING_SITE_URL + "/?to=" + encodedName;
      
      // Set link di kolom C
      sheet.getRange(i + 2, 3).setValue(link);
      
      // Set nomor urut di kolom A jika kosong
      if (!data[i][0] || data[i][0] === "") {
        sheet.getRange(i + 2, 1).setValue(i + 1);
      }
      
      generated++;
    }
  }

  SpreadsheetApp.getUi().alert(
    "✅ Link Berhasil Dibuat!",
    "Total " + generated + " link undangan telah di-generate.\n\n" +
    "Kamu bisa langsung copy link dari kolom C dan share ke tamu.",
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

/**
 * Hitung statistik tamu
 */
function countGuests() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(GUEST_SHEET_NAME);

  if (!sheet) {
    SpreadsheetApp.getUi().alert("❌ Sheet '" + GUEST_SHEET_NAME + "' tidak ditemukan.");
    return;
  }

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    SpreadsheetApp.getUi().alert("Belum ada data tamu.");
    return;
  }

  const data = sheet.getRange(2, 1, lastRow - 1, 5).getValues();
  
  let total = 0;
  let sudahKirim = 0;
  let belumKirim = 0;

  for (let i = 0; i < data.length; i++) {
    const name = data[i][1];
    if (name && name.toString().trim() !== "") {
      total++;
      const status = data[i][3]; // Kolom D = Status Kirim
      if (status === "Sudah Kirim" || status === "Dibaca") {
        sudahKirim++;
      } else {
        belumKirim++;
      }
    }
  }

  SpreadsheetApp.getUi().alert(
    "📊 Statistik Undangan",
    "Total Tamu: " + total + "\n" +
    "Sudah Dikirim: " + sudahKirim + "\n" +
    "Belum Dikirim: " + belumKirim,
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}
