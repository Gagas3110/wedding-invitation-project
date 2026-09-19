"use client";

import { motion } from "framer-motion";
import { PaperCard } from "@/components/ui/PaperCard";

export function Hero() {
  return (
    <section className="py-12 sm:py-16 px-2 relative z-10">
      <div className="w-full max-w-lg mx-auto flex flex-col items-center">
        {/* Mukadimah Salam & Profil Mempelai (The Couple) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          <PaperCard
            variant="scallop-top"
            peony="none"
            botanicalBorders={true}
            className="text-center pt-8 sm:pt-10"
          >
            {/* Mukadimah Salam */}
            <div className="mb-8 px-2">
              <h4
                className="font-arabic text-lg sm:text-2xl text-[#1A1A1A] font-normal leading-normal mb-[20px]"
                dir="rtl"
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </h4>

              <p className="text-xs sm:text-[13px] text-[#4A542C] max-w-md mx-auto leading-relaxed font-sans">
                Dengan memohon Rahmat dan Ridho Allah Subhanahu Wa Ta&apos;ala, kami bermaksud untuk
                mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:
              </p>
            </div>

            {/* Couple Cards — Sequential Reveal */}
            <div className="flex flex-col items-center gap-6 w-full">
              {/* 1. Mempelai Wanita */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center text-center w-full"
              >
                {/* Arch Photo with Gold Border Frame (Zoomed In Akila) */}
                <div className="relative w-48 h-64 sm:w-52 sm:h-70 rounded-t-full rounded-b-2xl overflow-hidden border-3 border-[#8B9B62]/70 shadow-[0_12px_28px_rgba(45,38,28,0.16)] mb-4 bg-[#EEF2DF]/50">
                  <img
                    src="/gallery/wanita.jpg"
                    alt="Akila Syifa Salsabila"
                    className="w-full h-full object-cover object-[48%_68%] scale-[1.75] origin-[48%_68%] transition-transform duration-700 hover:scale-[1.85]"
                  />
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1A1A] tracking-wide">
                  Akila Syifa Salsabila
                </h3>
                <div className="h-px w-12 bg-[#8B9B62] my-2" />
                <p className="text-xs sm:text-[13px] text-[#4A542C] font-sans leading-relaxed">
                  Putri dari Bapak Giyanta <br />&amp; Ibu Susi Suryani (Almh.)
                </p>
              </motion.div>

              {/* Ampersand Divider (tanpa garis divider) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="flex flex-col items-center my-3"
              >
                <span className="font-serif text-3xl sm:text-4xl text-[#3B4420] font-normal drop-shadow-[0_2px_8px_rgba(59,68,32,0.12)] select-none">
                  &amp;
                </span>
              </motion.div>

              {/* 2. Mempelai Pria */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center text-center w-full pb-2"
              >
                {/* Arch Photo with Gold Border Frame (Zoomed In Gagas) */}
                <div className="relative w-48 h-64 sm:w-52 sm:h-70 rounded-t-full rounded-b-2xl overflow-hidden border-3 border-[#8B9B62]/70 shadow-[0_12px_28px_rgba(45,38,28,0.16)] mb-4 bg-[#EEF2DF]/50">
                  <img
                    src="/gallery/pria.jpeg"
                    alt="Gagas Wijaksana Nugraha"
                    className="w-full h-full object-cover object-[40%_48%] scale-[1.55] origin-[40%_48%] transition-transform duration-700 hover:scale-[1.65]"
                  />
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1A1A] tracking-wide">
                  Gagas Wijaksana Nugraha
                </h3>
                <div className="h-px w-12 bg-[#8B9B62] my-2" />
                <p className="text-xs sm:text-[13px] text-[#4A542C] font-sans leading-relaxed">
                  Putra dari Bapak Nedy Winuza (Alm.) <br />&amp; Ibu Nelzi Fati
                </p>
              </motion.div>
            </div>
          </PaperCard>
        </motion.div>
      </div>
    </section>
  );
}
