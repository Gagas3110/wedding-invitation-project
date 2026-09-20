"use client";

import { useState } from "react";
import { AppProvider } from "@/app/context/AppContext";
import { PersistentLeftBackdrop } from "@/components/layout/PersistentLeftBackdrop";
import { OpeningScreen } from "@/components/sections/OpeningScreen";
import { Countdown } from "@/components/sections/Countdown";
import { Ayat } from "@/components/sections/Ayat";
import { Hero } from "@/components/sections/Hero";
import { SaveTheDate } from "@/components/sections/SaveTheDate";
import { Gallery } from "@/components/sections/Gallery";
import { RSVP } from "@/components/sections/RSVP";
import { Wishes } from "@/components/sections/Wishes";
import { Gift } from "@/components/sections/Gift";
import { Footer } from "@/components/layout/Footer";
import { MusicToggleButton } from "@/components/ui/MusicToggleButton";

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const weddingDate = process.env.NEXT_PUBLIC_WEDDING_DATE || "2026-12-12T09:00:00";

  const handleRSVPSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <AppProvider>
      {/* 1. Persistent Left Photo on Desktop */}
      <PersistentLeftBackdrop />

      {/* 2. Right Side Invitation Column (or Full Page on Mobile) */}
      <div className="w-full lg:w-[480px] xl:w-[520px] min-h-screen lg:ml-auto relative z-10 bg-[#FAF7F2] lg:border-l lg:border-[#d9cfc1]/60 desktop-column-shadow">
        {/* Fixed decorative background — stays in place while content scrolls */}
        <div
          className="fixed inset-0 lg:left-auto lg:right-0 lg:w-[480px] xl:w-[520px] pointer-events-none z-0 bg-[#FAF7F2] lg:border-l lg:border-[#d9cfc1]/60"
          style={{
            backgroundImage: "url('/gallery/background_wedding.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat",
          }}
        />


        <OpeningScreen />

        <main className="relative z-10 w-full min-h-screen">
          {/* Section 1: Countdown (1 Halaman Penuh Pertama) */}
          <Countdown weddingDate={weddingDate} />

          {/* Section 2: Ayat Al-Qur'an (1 Halaman Sendiri, Tanpa Koin/Segel) */}
          <Ayat />

          {/* Section 3: Profil Kedua Mempelai */}
          <Hero />

          {/* Section Selanjutnya */}
          <SaveTheDate />
          <Gallery />
          <RSVP onSuccessSubmit={handleRSVPSuccess} />
          <Wishes refreshTrigger={refreshTrigger} />
          <Gift />
          <Footer />
        </main>

        <MusicToggleButton />
      </div>
    </AppProvider>
  );
}
