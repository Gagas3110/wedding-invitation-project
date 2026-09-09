import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Map Indonesian headers from Google Sheets to frontend field names
interface GASWishItem {
  timestamp: string;
  nama: string;
  status: string;
  jumlah: number;
  ucapan: string;
}

export async function GET() {
  if (!API_URL) {
    return NextResponse.json(
      { error: "API_URL is not configured" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`${API_URL}?action=wishes`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script responded with ${response.status}`);
    }

    const rawData: GASWishItem[] = await response.json();

    // Map Indonesian field names to English field names expected by frontend
    const mappedData = rawData.map((item) => ({
      timestamp: item.timestamp,
      name: item.nama,
      status: item.status,
      guests: item.jumlah,
      wish: item.ucapan,
    }));

    return NextResponse.json(mappedData);
  } catch (error) {
    console.error("Error fetching wishes from GAS:", error);
    return NextResponse.json(
      { error: "Failed to fetch wishes" },
      { status: 502 }
    );
  }
}
