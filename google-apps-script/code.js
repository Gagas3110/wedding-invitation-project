/* eslint-disable */
/**
 * Google Apps Script API untuk Website Undangan Pernikahan Digital
 * 
 * Fitur:
 * - Sanitasi input (mengurangi risiko XSS).
 * - Validasi tipe data server-side.
 * - Penanganan request GET (action=wishes) dan POST (action=rsvp).
 * - CORS-safe helper response.
 */

// Konfigurasi Nama Sheet
const SHEET_NAME = "RSVP";

function doGet(e) {
  const action = e.parameter.action;
  
  if (action === "wishes") {
    return handleGetWishes();
  }
  
  return createJsonResponse({ 
    success: false, 
    message: "Aksi GET tidak valid." 
  });
}

function doPost(e) {
  let requestData;
  
  try {
    if (!e.postData || !e.postData.contents) {
      return createJsonResponse({ success: false, message: "Request body kosong." });
    }
    requestData = JSON.parse(e.postData.contents);
  } catch (error) {
    return createJsonResponse({ success: false, message: "JSON tidak valid." });
  }

  const action = requestData.action;

  if (action === "rsvp") {
    return handlePostRSVP(requestData);
  }

  return createJsonResponse({ 
    success: false, 
    message: "Aksi POST tidak valid." 
  });
}

/**
 * Mengambil seluruh ucapan (Wishes)
 */
function handleGetWishes() {
  try {
    const sheet = getOrCreateSheet();
    const rows = sheet.getDataRange().getValues();
    
    // Jika hanya baris header yang tersedia
    if (rows.length <= 1) {
      return createJsonResponse([]);
    }

    const headers = rows[0];
    const wishes = [];

    // Map rows ke Javascript Object
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const wishItem = {};
      
      for (let j = 0; j < headers.length; j++) {
        const header = headers[j].toString().toLowerCase();
        let value = row[j];
        
        // Ubah format date timestamp jika tipenya Date object
        if (header === "timestamp" && value instanceof Date) {
          value = value.toISOString();
        }
        
        wishItem[header] = value;
      }
      wishes.push(wishItem);
    }

    return createJsonResponse(wishes);
  } catch (error) {
    return createJsonResponse({ 
      success: false, 
      message: "Gagal mengambil wishes: " + error.toString() 
    });
  }
}

/**
 * Menyimpan RSVP Baru
 */
function handlePostRSVP(data) {
  try {
    const sheet = getOrCreateSheet();
    
    // Server-side Validation
    const name = sanitizeInput(data.name);
    const status = data.status;
    const guests = Number(data.guests);
    const wish = sanitizeInput(data.wish || "");

    // 1. Validasi Nama
    if (!name || name.trim() === "") {
      return createJsonResponse({ success: false, message: "Nama tamu wajib diisi." });
    }

    // 2. Validasi Kehadiran
    if (status !== "Hadir" && status !== "Tidak Hadir") {
      return createJsonResponse({ success: false, message: "Status kehadiran tidak valid." });
    }

    // 3. Validasi Jumlah Tamu
    if (isNaN(guests) || guests < 1) {
      return createJsonResponse({ success: false, message: "Jumlah tamu minimal 1 orang." });
    }

    // 4. Validasi Ucapan
    if (wish.length > 500) {
      return createJsonResponse({ success: false, message: "Ucapan tidak boleh lebih dari 500 karakter." });
    }

    // Hindari duplikasi input berlebihan (Basic Rate Limit/Double Submit Prevention)
    if (isDoubleSubmit(sheet, name, wish)) {
      return createJsonResponse({ 
        success: true, 
        message: "Pesan Anda sudah terekam sebelumnya." 
      });
    }

    // Simpan ke Spreadsheet
    const timestamp = new Date();
    sheet.appendRow([
      timestamp,
      name,
      status,
      guests,
      wish
    ]);

    return createJsonResponse({ 
      success: true, 
      message: "RSVP berhasil terekam." 
    });

  } catch (error) {
    return createJsonResponse({ 
      success: false, 
      message: "Terjadi kesalahan server: " + error.toString() 
    });
  }
}

/**
 * Mendapatkan/Membuat Sheet RSVP
 */
function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Tulis Header Baru
    sheet.appendRow(["Timestamp", "Nama", "Status", "Jumlah", "Ucapan"]);
    // Format Header (Bold)
    sheet.getRange("A1:E1").setFontWeight("bold");
  }
  
  return sheet;
}

/**
 * Menghindari input berturut-turut yang sama persis
 */
function isDoubleSubmit(sheet, name, wish) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return false;
  
  // Baca baris terakhir saja
  const lastRowValues = sheet.getRange(lastRow, 2, 1, 4).getValues()[0]; // Ambil kolom Nama hingga Ucapan
  const lastRowName = lastRowValues[0];
  const lastRowWish = lastRowValues[3];
  
  return (lastRowName === name && lastRowWish === wish);
}

/**
 * Sanitasi String Input untuk mencegah XSS
 */
function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Helper menghasilkan response JSON yang valid dengan set CORS MimeType
 */
function createJsonResponse(data) {
  const jsonString = JSON.stringify(data);
  return ContentService.createTextOutput(jsonString)
    .setMimeType(ContentService.MimeType.JSON);
}
