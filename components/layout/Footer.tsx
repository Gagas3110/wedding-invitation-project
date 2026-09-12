"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-24 px-4 bg-[#181D14] text-white relative overflow-hidden text-center">
      {/* Decorative Ornaments */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B9B62]/50 to-transparent" />
      
      {/* Corner borders */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-[#8B9B62]/30 pointer-events-none" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-[#8B9B62]/30 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-[#8B9B62]/30 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-[#8B9B62]/30 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-lg mx-auto flex flex-col items-center justify-center relative z-10"
      >
        <div className="w-10 h-10 rounded-full bg-[#232B1E] border border-[#8B9B62]/40 flex items-center justify-center mb-6">
          <Heart className="w-5 h-5 text-[#8B9B62] fill-[#8B9B62]/30 animate-pulse" />
        </div>

        <p className="text-xs text-[#B5C2A3] uppercase tracking-[0.25em] leading-relaxed mb-6 font-sans">
          Merupakan suatu kehormatan &amp; kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.
        </p>

        <h4 className="font-serif text-3xl md:text-4xl font-normal text-[#FDF8F0] tracking-wide mt-2 shimmer-gold py-1">
          Akila &amp; Gagas
        </h4>
        
        <div className="flex items-center justify-center gap-3 mt-3 opacity-80">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#8B9B62]" />
          <span className="text-[10px] text-[#CAD4AA] uppercase tracking-[0.3em] font-sans">
            Sampai Jumpa Di Hari Bahagia Kami
          </span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#8B9B62]" />
        </div>

        <p className="text-[9px] text-[#7A8A62] mt-14 font-sans tracking-wider uppercase">
          &copy; {new Date().getFullYear()} Akila &amp; Gagas Wedding Invitation.
        </p>
      </motion.div>
    </footer>
  );
}

