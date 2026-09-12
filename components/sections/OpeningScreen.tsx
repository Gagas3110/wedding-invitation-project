"use client";

import { useApp } from "@/app/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { MailOpen } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/Button";

function OpeningContent() {
  const { isOpened, openInvitation } = useApp();
  const searchParams = useSearchParams();
  const rawTo = searchParams.get("to");
  const guestName = rawTo ? decodeURIComponent(rawTo) : "Nama Tamu";

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100vh" }}
          transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-50 flex flex-col lg:flex-row w-screen h-screen overflow-hidden bg-[#181411]"
        >
          {/* LEFT SIDE: Couple prewedding photo (Desktop / Tablet Widescreen) */}
          <div 
            className="hidden lg:flex flex-1 relative flex-col justify-end p-12 xl:p-16 overflow-hidden bg-cover bg-center bg-no-repeat select-none"
            style={{ backgroundImage: "url('/gallery/DSC03172.jpg')" }}
          >
            {/* Dark gradient overlay for typography readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative z-10 text-white max-w-xl"
            >
              <span className="text-xs md:text-sm font-light tracking-[0.3em] uppercase block mb-1 font-sans text-white/90">
                UNDANGAN PERNIKAHAN
              </span>
              <h1 className="font-[family-name:var(--font-script)] text-6xl md:text-7xl xl:text-8xl text-white font-normal leading-tight my-1 drop-shadow-md">
                Gagas &amp; Akila
              </h1>
              <p className="text-xs md:text-sm font-light tracking-[0.25em] uppercase font-sans text-white/80">
                12 DESEMBER 2026
              </p>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Minang Illustrated Cover (Mobile Fullscreen / Desktop Right Panel) */}
          <div 
            className="w-full lg:w-[460px] xl:w-[500px] h-full flex flex-col justify-between items-center py-10 px-6 relative overflow-hidden bg-cover bg-center bg-no-repeat shadow-2xl shrink-0"
            style={{ backgroundImage: "url('/minang/COVER-MINANG4.jpg')" }}
          >
            {/* Top Header: The Wedding of GAGAS & AKILA */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center pt-8 md:pt-12 z-10"
            >
              <span className="font-[family-name:var(--font-script)] text-4xl md:text-5xl text-[#8B7E09] block mb-1">
                The Wedding of
              </span>
              <h2 className="font-[family-name:var(--font-cinzel)] text-3xl md:text-4xl font-semibold tracking-wider text-[#8B7E09] uppercase leading-tight">
                GAGAS<br />&amp; AKILA
              </h2>
            </motion.div>

            {/* Center Guest Card (Translucent White Box) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="z-10 w-full max-w-xs my-auto bg-white/85 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/70 text-center flex flex-col items-center"
            >
              <p className="text-[11px] text-[#8B7E09] leading-relaxed font-sans mb-1 font-medium">
                Kepada Yth.<br />Bapak/ Ibu/ Saudara/ i
              </p>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#26211C] my-2">
                {guestName}
              </h3>
              <Button
                className="mt-4 bg-gradient-to-r from-[#B89358] via-[#CBB07E] to-[#B89358] text-white hover:brightness-105 py-3 px-8 rounded-full font-semibold text-xs tracking-widest uppercase shadow-[0_4px_20px_rgba(184,147,88,0.35)] transition-all transform hover:scale-105 cursor-pointer border border-[#F3E2B8]/40"
                onClick={openInvitation}
              >
                <MailOpen className="w-4 h-4 mr-2" />
                BUKA UNDANGAN
              </Button>
            </motion.div>

            {/* Bottom visual spacer for Rumah Gadang artwork */}
            <div className="h-14 md:h-16 pointer-events-none" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function OpeningScreen() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#181411] text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#B89358]"></div>
      </div>
    }>
      <OpeningContent />
    </Suspense>
  );
}
