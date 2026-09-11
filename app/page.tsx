"use client";

import { useState } from "react";
import { AppProvider } from "@/app/context/AppContext";
import { OpeningScreen } from "@/components/sections/OpeningScreen";
import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
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
      <OpeningScreen />
      
      <main className="relative z-10 w-full min-h-screen">
        <Hero weddingDate={weddingDate} />
        <Story />
        <Gallery />
        <RSVP onSuccessSubmit={handleRSVPSuccess} />
        <Wishes refreshTrigger={refreshTrigger} />
        <Gift />
        <Footer />
      </main>

      <MusicToggleButton />
    </AppProvider>
  );
}
