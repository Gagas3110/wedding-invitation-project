import { RSVPInput, WishItem } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function submitRSVP(data: RSVPInput): Promise<{ success: boolean; message: string }> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined in environment variables.");
  }

  try {
    await fetch(API_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify({
        action: "rsvp",
        ...data,
      }),
    });

    return { success: true, message: "RSVP Berhasil dikirim" };
  } catch (error) {
    console.error("Error submitting RSVP:", error);
    return { success: false, message: "Gagal mengirim RSVP" };
  }
}

export async function getWishes(): Promise<WishItem[]> {
  try {
    const response = await fetch("/api/wishes", {
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
