import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Playfair_Display, Inter, Alex_Brush, Cinzel } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "The Wedding Of Gagas & Akila",
  description: "Undangan pernikahan digital Gagas dan Akila.",
  openGraph: {
    title: "The Wedding Of Gagas & Akila",
    description: "Undangan pernikahan digital Gagas dan Akila.",
    type: "website",
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
        <link rel="preload" as="image" href="/minang/COVER-MINANG4.jpg" />
        <link rel="preload" as="image" href="/gallery/DSC03172.jpg" />
        <link rel="preload" as="image" href="/gallery/background_wedding.jpg" />
      </head>
      <body
        className={`${jakarta.variable} ${cormorant.variable} ${inter.variable} ${playfair.variable} ${alexBrush.variable} ${cinzel.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
