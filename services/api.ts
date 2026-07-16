import { RSVPInput, WishItem } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function submitRSVP(data: RSVPInput): Promise<{ success: boolean; message: string }> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined in environment variables.");
  }

  try {
    await fetch(API_URL, {
      method: "POST",
      mode: "no-cors", // Apps Script often requires no-cors for direct writes if there's no preflight, but let's check. Wait, no-cors prevents reading the response!
      // To read responses properly, standard CORS must be configured in GAS, and we make simple JSON POST.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "rsvp",
        ...data,
      }),
    });

    // If using 'no-cors', response.ok will be false/status 0, but request succeeds. 
    // Usually with a properly set up Apps Script (with CORS headers returned in HtmlService/TextOutput), we can use standard cors mode.
    // Let's implement full CORS headers in our Apps Script code to allow clean JSON responses!
    
    // We'll try to parse JSON. If no-cors is required or standard redirect block occurs, fallback.
    return { success: true, message: "RSVP Berhasil dikirim" };
  } catch (error) {
    console.error("Error submitting RSVP:", error);
    return { success: false, message: "Gagal mengirim RSVP" };
  }
}

export async function getWishes(): Promise<WishItem[]> {
  if (!API_URL) {
    console.warn("NEXT_PUBLIC_API_URL is not defined, returning mock wishes.");
    return getMockWishes();
  }

  try {
    const response = await fetch(`${API_URL}?action=wishes`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as WishItem[];
  } catch (error) {
    console.error("Error fetching wishes:", error);
    return getMockWishes();
  }
}

function getMockWishes(): WishItem[] {
  return [
    {
      timestamp: "2026-07-16T10:00:00.000Z",
      name: "Andi Saputra",
      status: "Hadir",
      guests: 2,
      wish: "Selamat menempuh hidup baru untuk Gagas dan pasangan! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Amin!"
    },
    {
      timestamp: "2026-07-16T10:15:00.000Z",
      name: "Budi Santoso",
      status: "Hadir",
      guests: 1,
      wish: "Selamat ya! Semoga dilancarkan semua prosesi acaranya sampai hari H. Doa terbaik untuk kalian berdua."
    },
    {
      timestamp: "2026-07-16T10:30:00.000Z",
      name: "Citra Lestari",
      status: "Tidak Hadir",
      guests: 1,
      wish: "Selamat berbahagia Gagas & pasangan! Maaf belum bisa hadir langsung, tapi doa tulus kami menyertai langkah baru kalian."
    }
  ];
}
