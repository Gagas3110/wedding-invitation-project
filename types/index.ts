export interface RSVPInput {
  name: string;
  status: "Hadir" | "Tidak Hadir";
  guests: number;
  wish: string;
}

export interface WishItem {
  timestamp: string;
  name: string;
  status: "Hadir" | "Tidak Hadir";
  guests: number;
  wish: string;
}
