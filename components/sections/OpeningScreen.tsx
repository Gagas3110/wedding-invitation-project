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
          className="fixed inset-0 z-50 flex flex-col items-center justify-between py-16 px-6 bg-radial from-[#1e1a15] to-[#0f0e0c] text-white overflow-hidden"
        >
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-6 left-6 w-16 h-16 border-t border-l border-primary/40 opacity-70 pointer-events-none" />
          <div className="absolute top-6 right-6 w-16 h-16 border-t border-r border-primary/40 opacity-70 pointer-events-none" />
          <div className="absolute bottom-6 left-6 w-16 h-16 border-b border-l border-primary/40 opacity-70 pointer-events-none" />
          <div className="absolute bottom-6 right-6 w-16 h-16 border-b border-r border-primary/40 opacity-70 pointer-events-none" />

          {/* Elegant gold circle in the background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-primary/10 opacity-30 pointer-events-none animate-pulse" />

          <div className="text-center mt-12 z-10">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Undangan Pernikahan</span>
            <h1 className="font-serif text-4xl mt-6 font-semibold tracking-wide bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Gagas & Akila
            </h1>
          </div>

          <div className="text-center max-w-sm px-4 z-10 my-auto flex flex-col items-center">
            <p className="text-xs uppercase tracking-widest text-[#a8a095] mb-2">Kepada Yth. Bapak/Ibu/Saudara/i</p>
            <h2 className="font-serif text-2xl font-medium text-white my-3 italic">
              {guestName}
            </h2>
            <p className="text-xs text-[#8a8074] leading-relaxed max-w-xs mt-2">
              Mohon maaf apabila ada kesalahan pada penulisan nama dan gelar.
            </p>
          </div>

          <div className="z-10 w-full flex justify-center pb-6">
            <Button
              className="bg-primary/95 text-foreground hover:bg-primary py-3.5 px-8 font-semibold tracking-[0.15em] border border-primary/20 shadow-[0_0_15px_rgba(197,168,128,0.2)]"
              onClick={openInvitation}
            >
              <MailOpen className="w-4 h-4 mr-2" />
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
