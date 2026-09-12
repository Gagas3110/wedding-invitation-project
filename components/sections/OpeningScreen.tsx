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
  const guestName = rawTo ? decodeURIComponent(rawTo) : "Tamu Undangan";

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100vh" }}
          transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between py-12 md:py-16 px-6 bg-[#181411] text-white overflow-hidden"
        >
          {/* Subtle background radial glow & pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,147,88,0.18)_0%,rgba(24,20,17,0.95)_70%)] pointer-events-none" />

          {/* Decorative Minang Luxury Border Frame */}
          <div className="absolute inset-4 md:inset-8 border border-[#B89358]/30 rounded-3xl pointer-events-none" />
          <div className="absolute inset-6 md:inset-10 border border-[#B89358]/15 rounded-2xl pointer-events-none" />

          {/* Ornate Corner Accents */}
          <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[#B89358] opacity-80 pointer-events-none" />
          <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-[#B89358] opacity-80 pointer-events-none" />
          <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-[#B89358] opacity-80 pointer-events-none" />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[#B89358] opacity-80 pointer-events-none" />

          {/* Top Header */}
          <div className="text-center mt-6 md:mt-10 z-10">
            <span className="text-[11px] uppercase tracking-[0.4em] text-[#C5A880] font-medium block mb-3">
              The Wedding of
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-normal tracking-wide shimmer-gold py-1">
              Gagas &amp; Akila
            </h1>
            <div className="flex items-center justify-center gap-3 mt-3 opacity-60">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#B89358]" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A880]">12 . 12 . 2026</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#B89358]" />
            </div>
          </div>

          {/* Guest Name Card */}
          <div className="text-center max-w-sm w-full px-6 py-6 z-10 my-auto bg-[#231E19]/80 backdrop-blur-md rounded-2xl border border-[#B89358]/30 shadow-2xl flex flex-col items-center">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#A69788] mb-2 font-sans">
              Kepada Yth. Bapak/Ibu/Saudara/i
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#FDF8F0] my-2">
              {guestName}
            </h2>
            <p className="text-[10px] text-[#8F8172] leading-relaxed max-w-xs mt-2 italic font-sans">
              Mohon maaf apabila ada kesalahan pada penulisan nama dan gelar.
            </p>
          </div>

          {/* Open Invitation Button */}
          <div className="z-10 w-full flex justify-center pb-4 md:pb-6">
            <Button
              className="bg-gradient-to-r from-[#B89358] via-[#D4AF67] to-[#B89358] text-[#181411] hover:brightness-110 py-4 px-10 rounded-full font-semibold text-xs tracking-[0.2em] uppercase shadow-[0_4px_25px_rgba(184,147,88,0.35)] transition-all transform hover:scale-105 cursor-pointer border border-[#F3E2B8]/40"
              onClick={openInvitation}
            >
              <MailOpen className="w-4 h-4 mr-2 text-[#181411]" />
              Buka Undangan
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function OpeningScreen() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0f0e0c] text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
      </div>
    }>
      <OpeningContent />
    </Suspense>
  );
}
