"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-24 px-4 bg-[#a2a761] text-white relative overflow-hidden text-center">
      {/* Decorative Ornaments */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      
      {/* Corner borders */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-white/35 pointer-events-none" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-white/35 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-white/35 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-white/35 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-lg mx-auto flex flex-col items-center justify-center relative z-10"
      >
        <div className="w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center mb-6 backdrop-blur-xs shadow-xs">
          <Heart className="w-5 h-5 text-white fill-white/40 animate-pulse" />
        </div>

        <p className="text-xs text-white/90 font-medium uppercase tracking-[0.25em] leading-relaxed mb-6 font-sans">
          Here's to love, laughter, and happily ever after.
        </p>

        <h4 className="font-serif text-3xl md:text-4xl font-normal text-white tracking-wide mt-2 py-1 drop-shadow-xs">
          Akila &amp; Gagas
        </h4>

        <p className="text-[10px] text-white/80 mt-14 font-sans tracking-wider uppercase">
          &copy; {new Date().getFullYear()} Akila &amp; Gagas Wedding Invitation.
        </p>
      </motion.div>
    </footer>
  );
}

