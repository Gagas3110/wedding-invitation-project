"use client";

import { motion } from "framer-motion";

export function PersistentLeftBackdrop() {
  return (
    <aside 
      aria-label="Wedding Banner"
      className="hidden lg:flex fixed top-0 left-0 bottom-0 w-[calc(100vw-480px)] xl:w-[calc(100vw-520px)] h-screen z-0 flex-col justify-end p-12 xl:p-16 overflow-hidden bg-[#26211C] bg-cover bg-no-repeat select-none"
      style={{ 
        backgroundImage: "url('/gallery/DSC03172.jpg')",
        backgroundPosition: "center 20%",
      }}
    >
      {/* Dark gradient overlay for typography contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

      {/* Persistent typography */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="relative z-10 text-white max-w-xl"
      >
        <span className="text-xs md:text-sm font-light tracking-[0.3em] uppercase block mb-1 font-sans text-white/90">
          UNDANGAN PERNIKAHAN
        </span>
        <h1 className="font-script text-7xl md:text-8xl xl:text-9xl text-white font-normal leading-none my-1 drop-shadow-xl">
          Akila &amp; Gagas
        </h1>
        <p className="text-xs md:text-sm font-light tracking-[0.25em] uppercase font-sans text-white/80 mt-2">
          12 DESEMBER 2026
        </p>
      </motion.div>
    </aside>
  );
}
