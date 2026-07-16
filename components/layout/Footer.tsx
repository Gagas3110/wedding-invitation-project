"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-20 px-4 bg-[#0f0e0c] text-white relative overflow-hidden text-center">
      {/* Decorative Ornaments */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-primary/30 to-transparent" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto flex flex-col items-center justify-center"
      >
        <Heart className="w-6 h-6 text-primary fill-primary/30 animate-pulse mb-6" />

        <p className="text-xs text-[#a8a095] uppercase tracking-[0.2em] mb-4">
          Merupakan suatu kehormatan & kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.
        </p>

        <h4 className="font-serif text-3xl font-semibold text-primary mt-6 tracking-wide">
          Gagas & Akila
        </h4>
        
        <p className="text-[10px] text-[#70665b] uppercase tracking-widest mt-3">
          Sampai Jumpa Di Hari Bahagia Kami
        </p>

        <p className="text-[9px] text-[#554e45] mt-16 font-sans">
          &copy; {new Date().getFullYear()} Gagas & Akila. All Rights Reserved. Built with Next.js & Google Sheets.
        </p>
      </motion.div>
    </footer>
  );
}
