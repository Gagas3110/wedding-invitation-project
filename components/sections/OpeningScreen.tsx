/* eslint-disable @next/next/no-img-element */
"use client";

import { useApp } from "@/app/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { MailOpen } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";

function OpeningContent() {
  const { isOpened, openInvitation } = useApp();
  const searchParams = useSearchParams();
  const rawTo = searchParams.get("to");
  const guestName = rawTo ? decodeURIComponent(rawTo) : "Nama Tamu";

  const [isSlowNetwork, setIsSlowNetwork] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 1. Deteksi koneksi lambat atau mode hemat data (Network Information API)
    if (typeof navigator !== "undefined") {
      const conn =
        (navigator as any).connection ||
        (navigator as any).mozConnection ||
        (navigator as any).webkitConnection;

      if (conn) {
        if (
          conn.saveData ||
          conn.effectiveType === "slow-2g" ||
          conn.effectiveType === "2g" ||
          conn.effectiveType === "3g"
        ) {
          setIsSlowNetwork(true);
          return;
        }
      }
    }

    // 2. Safety timeout fallback:
    // Jika dalam 3.5 detik video belum mulai memutar (akibat sinyal buffering/lambat/low-power mode),
    // otomatis hentikan pemuatan video dan tetap pakai static poster asset agar performa tetap ringan dan mulus.
    const timer = setTimeout(() => {
      setIsVideoPlaying((playing) => {
        if (!playing) {
          setVideoFailed(true);
        }
        return playing;
      });
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const shouldLoadVideo = !isSlowNetwork && !videoFailed;

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 lg:left-auto lg:right-0 lg:w-[480px] xl:w-[520px] z-50 overflow-hidden flex flex-col justify-end items-center pb-28 sm:pb-32 px-6 bg-[#FAF7F2] lg:border-l lg:border-[#d9cfc1]/60 desktop-column-shadow select-none"
        >
          {/* Base Layer: Static Asset (Muncul seketika 0ms tanpa blank/buffering pada koneksi apapun) */}
          <img
            src="/gallery/opening-poster.jpg"
            alt="Cover Undangan Akila & Gagas"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
            style={{ objectPosition: "32% center" }}
            loading="eager"
            decoding="async"
          />

          {/* Progressive Video Layer: Hanya dimuat jika jaringan memadai, fade-in mulus setelah play */}
          {shouldLoadVideo && (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster="/gallery/opening-poster.jpg"
              onPlaying={() => setIsVideoPlaying(true)}
              onError={() => setVideoFailed(true)}
              className={`absolute inset-0 w-full h-full object-cover pointer-events-none z-0 transition-opacity duration-700 ease-in-out ${
                isVideoPlaying ? "opacity-100" : "opacity-0"
              }`}
              style={{ objectPosition: "32% center" }}
            >
              <source src="/gallery/opening.mp4" type="video/mp4" />
            </video>
          )}

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

