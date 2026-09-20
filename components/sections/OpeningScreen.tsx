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
          className="fixed inset-0 lg:left-auto lg:right-0 lg:w-[480px] xl:w-[520px] z-50 overflow-hidden flex flex-col justify-end items-center pb-28 sm:pb-32 px-6 bg-[#FAF7F2] lg:border-l lg:border-[#d9cfc1]/60 desktop-column-shadow select-none"
        >
          {/* Background Video Layer */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
          >
            <source src="/gallery/opening.mp4" type="video/mp4" />
          </video>

          {/* Guest Card (Sage Green Box positioned in lower section) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="z-10 w-full max-w-xs bg-[#D1D9B5]/85 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-[#BFC9A0]/50 text-center flex flex-col items-center"
          >
            <p className="text-[18px] md:text-[20px] text-[#2D3319] leading-relaxed font-serif mb-1 font-medium tracking-wide">
              Yth. Bapak/Ibu/Saudara/i
            </p>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A] my-2">
              {guestName}
            </h3>
            <Button
              className="mt-4 bg-[#3B4420] hover:bg-[#2D3319] text-white py-3.5 px-8 rounded-full font-semibold text-xs tracking-widest uppercase shadow-[0_4px_20px_rgba(59,68,32,0.3)] transition-all transform hover:scale-105 cursor-pointer border border-[#CAD4AA]/40"
              onClick={openInvitation}
            >
              <MailOpen className="w-4 h-4 mr-2" />
              BUKA UNDANGAN
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function OpeningScreen() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 lg:left-auto lg:right-0 lg:w-[480px] xl:w-[520px] z-50 flex flex-col items-center justify-center bg-[#181411] text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#3B4420]"></div>
      </div>
    }>
      <OpeningContent />
    </Suspense>
  );
}

