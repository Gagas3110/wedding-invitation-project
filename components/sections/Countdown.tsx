"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { motion } from "framer-motion";

interface CountdownProps {
  weddingDate: string;
}

export function Countdown({ weddingDate }: CountdownProps) {
  const { days, hours, minutes, seconds, isCompleted } = useCountdown(weddingDate);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center py-20 px-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md z-10 flex flex-col items-center"
      >
        {/* Countdown Box */}
        <div className="w-full bg-[#DCE3C2]/90 backdrop-blur-md rounded-3xl p-7 md:p-9 shadow-xl border border-[#CAD4AA]/60 relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#8B9B62] to-transparent" />

          <span className="text-[10px] uppercase tracking-[0.35em] text-[#4A542C] font-semibold block mb-1.5">
            Save The Date
          </span>
          <h3 className="font-serif text-2xl md:text-3xl text-[#1A1A1A] font-semibold mb-7">
            Menuju Hari Bahagia
          </h3>

          {isCompleted ? (
            <div className="py-4 text-center">
              <p className="font-serif text-xl font-medium text-[#2D3319]">
                Acara Sedang Berlangsung / Terima Kasih Atas Doanya
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
              <div className="flex flex-col items-center p-3 sm:p-3.5 bg-[#EEF2DF]/85 backdrop-blur-xs rounded-2xl border border-[#CAD4AA]/70 shadow-xs">
                <span className="font-serif text-2xl md:text-3xl font-bold text-[#2D3319]">{days}</span>
                <span className="text-[9px] uppercase tracking-widest text-[#4A542C] mt-1 font-sans font-medium">Hari</span>
              </div>
              <div className="flex flex-col items-center p-3 sm:p-3.5 bg-[#EEF2DF]/85 backdrop-blur-xs rounded-2xl border border-[#CAD4AA]/70 shadow-xs">
                <span className="font-serif text-2xl md:text-3xl font-bold text-[#2D3319]">{hours}</span>
                <span className="text-[9px] uppercase tracking-widest text-[#4A542C] mt-1 font-sans font-medium">Jam</span>
              </div>
              <div className="flex flex-col items-center p-3 sm:p-3.5 bg-[#EEF2DF]/85 backdrop-blur-xs rounded-2xl border border-[#CAD4AA]/70 shadow-xs">
                <span className="font-serif text-2xl md:text-3xl font-bold text-[#2D3319]">{minutes}</span>
                <span className="text-[9px] uppercase tracking-widest text-[#4A542C] mt-1 font-sans font-medium">Menit</span>
              </div>
              <div className="flex flex-col items-center p-3 sm:p-3.5 bg-[#EEF2DF]/85 backdrop-blur-xs rounded-2xl border border-[#CAD4AA]/70 shadow-xs">
                <span className="font-serif text-2xl md:text-3xl font-bold text-[#2D3319]">{seconds}</span>
                <span className="text-[9px] uppercase tracking-widest text-[#4A542C] mt-1 font-sans font-medium">Detik</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60">
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted">Scroll Down</span>
        <div className="w-1.5 h-6 rounded-full border border-muted flex justify-center py-0.5">
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-1.5 rounded-full bg-muted"
          />
        </div>
      </div>
    </section>
  );
}
