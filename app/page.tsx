"use client";

import { useState } from "react";
import { AppProvider } from "@/app/context/AppContext";
import { PersistentLeftBackdrop } from "@/components/layout/PersistentLeftBackdrop";
import { OpeningScreen } from "@/components/sections/OpeningScreen";
import { Hero } from "@/components/sections/Hero";
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
      <div className="w-full lg:w-[480px] xl:w-[520px] min-h-screen lg:ml-auto relative z-10 bg-[#FAF7F2]/80 shadow-2xl lg:border-l lg:border-[#E8DECF]">
        <OpeningScreen />
        
        <main className="relative z-10 w-full min-h-screen">
          {/* Global decorative background for all sections */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage: "url('/gallery/background_wedding.svg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "local",
              opacity: 0.45,
            }}
          />
          <div className="relative z-10">
            <Hero weddingDate={weddingDate} />
            <Gallery />
            <RSVP onSuccessSubmit={handleRSVPSuccess} />
            <Wishes refreshTrigger={refreshTrigger} />
            <Gift />
            <Footer />
          </div>
        </main>

        <MusicToggleButton />
      </div>
    </AppProvider>
  );
}
