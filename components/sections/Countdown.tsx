"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { motion } from "framer-motion";
import { PaperCard } from "@/components/ui/PaperCard";

interface CountdownProps {
  weddingDate: string;
}

export function Countdown({ weddingDate }: CountdownProps) {
  const { days, hours, minutes, seconds, isCompleted } = useCountdown(weddingDate);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-2 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md flex flex-col items-center"
      >
        <PaperCard variant="default" className="text-center py-4">

          {isCompleted ? (
            <div className="py-4 text-center">
              <p className="font-serif text-lg sm:text-xl font-medium text-[#2D3319]">
                The Wait is Over !!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              <div className="flex flex-col items-center p-3 bg-[#EEF2DF]/80 rounded-2xl border border-[#CAD4AA]/60 shadow-xs">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#2D3319]">{days}</span>
                <span className="text-[9px] uppercase tracking-widest text-[#4A542C] mt-1 font-sans font-medium">Days</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-[#EEF2DF]/80 rounded-2xl border border-[#CAD4AA]/60 shadow-xs">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#2D3319]">{hours}</span>
                <span className="text-[9px] uppercase tracking-widest text-[#4A542C] mt-1 font-sans font-medium">Hours</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-[#EEF2DF]/80 rounded-2xl border border-[#CAD4AA]/60 shadow-xs">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#2D3319]">{minutes}</span>
                <span className="text-[9px] uppercase tracking-widest text-[#4A542C] mt-1 font-sans font-medium">Minutes</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-[#EEF2DF]/80 rounded-2xl border border-[#CAD4AA]/60 shadow-xs">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#2D3319]">{seconds}</span>
                <span className="text-[9px] uppercase tracking-widest text-[#4A542C] mt-1 font-sans font-medium">Seconds</span>
              </div>
            </div>
          )}

          <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-semibold mt-6 sm:mt-7 mb-2 sm:mb-3">
            Until Our Special Day
          </h3>
        </PaperCard>
      </motion.div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-70 pointer-events-none">
        <span className="text-[10px] tracking-[0.25em] uppercase text-[#4A542C] font-semibold font-sans">
          Scroll Down
        </span>
        <div className="w-1.5 h-6 rounded-full border border-[#4A542C] flex justify-center py-0.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-1.5 rounded-full bg-[#4A542C]"
          />
        </div>
      </div>
    </section>
  );
}
