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
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 lg:left-auto lg:right-0 lg:w-[480px] xl:lg:w-[520px] z-50 h-screen overflow-hidden flex flex-col justify-between items-center py-10 px-6 bg-[#FAF7F2] bg-cover bg-center bg-no-repeat shadow-2xl select-none"
          style={{ backgroundImage: "url('/gallery/background_wedding.jpg')" }}
        >
          {/* Top Header: Arched 'The Wedding of', Akila & Gagas, Date */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center pt-16 md:pt-48 z-10 flex flex-col items-center"
          >
            {/* Arched 'The Wedding of' */}
            <div className="flex justify-center -mb-2 w-full">
              <svg viewBox="0 0 300 45" className="w-56 h-10 overflow-visible">
                <path id="wedding-arch-curve" d="M 30 40 Q 150 8 270 40" fill="transparent" />
                <text 
                  className="font-serif text-[28px] md:text-[30px] font-bold tracking-[0.14em] fill-[#6E7642] italic" 
                  fontWeight="bold"
                  stroke="#6E7642"
                  strokeWidth="0.5"
                  textAnchor="middle"
                >
                  <textPath href="#wedding-arch-curve" startOffset="50%">
                    The Wedding of
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Couple Script Names */}
            <h1 className="font-script text-5xl md:text-6xl text-[#686E49] font-normal leading-tight drop-shadow-xs my-1">
              Akila &amp; Gagas
            </h1>

            {/* Wedding Date */}
            <p className="font-serif text-xs md:text-sm text-[#6E7642] tracking-[0.25em] mt-1 font-medium">
              12 &nbsp;Desember 2026
            </p>
          </motion.div>

          {/* Center Guest Card (Sage Green Box matching reference) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="z-10 w-full max-w-xs my-auto bg-[#D1D9B5]/85 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-[#BFC9A0]/50 text-center flex flex-col items-center"
          >
            <p className="text-[20px] text-[#2D3319] leading-relaxed font-serif mb-1 font-medium tracking-wide">
              Yth. Bapak/Ibu/Saudara/i
            </p>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A] my-2">
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function OpeningScreen() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 lg:left-auto lg:right-0 lg:w-[480px] xl:lg:w-[520px] z-50 flex flex-col items-center justify-center bg-[#181411] text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#B89358]"></div>
      </div>
    }>
      <OpeningContent />
    </Suspense>
  );
}

