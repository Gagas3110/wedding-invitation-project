import type { Metadata } from "next";
import { Amiri, Cormorant_Garamond, Plus_Jakarta_Sans, Playfair_Display, Inter, Alex_Brush, Cinzel } from "next/font/google";
import "./globals.css";

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  variable: "--font-amiri",
  weight: ["400", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  variable: "--font-alex-brush",
  weight: ["400"],
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wedding-invitation-project.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Hari Bahagia Akila & Gagas",
  description: "Undangan pernikahan digital Akila dan Gagas.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", type: "image/png" },
    ],
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Hari Bahagia Akila & Gagas",
    description: "Undangan pernikahan digital Akila dan Gagas.",
    type: "website",
    locale: "id_ID",
    siteName: "Akila & Gagas Wedding",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hari Bahagia Akila & Gagas",
    description: "Undangan pernikahan digital Akila dan Gagas.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preload" as="image" href="/gallery/opening-poster-v2.jpg" />
        <link rel="preload" as="image" href="/minang/COVER-MINANG4.jpg" />
        <link rel="preload" as="image" href="/gallery/DSC03172.jpg" />
        <link rel="preload" as="image" href="/gallery/background_wedding.jpg" />
      </head>
      <body
        className={`${jakarta.variable} ${cormorant.variable} ${inter.variable} ${playfair.variable} ${alexBrush.variable} ${cinzel.variable} ${amiri.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
