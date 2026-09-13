"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-[#faf8f5]/60 to-[#f3efe9]/60">
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center z-10">
        {/* 1. Ayat Al-Qur'an (QS. Ar-Rum: 21 in Arch Frame) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-xl bg-white/85 backdrop-blur-md border border-[#CAD4AA]/60 p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgba(59,68,32,0.06)] mb-14 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#8B9B62] to-transparent" />
          

          <p className="text-[#3B4420] text-xs md:text-sm leading-relaxed mb-4 italic font-serif">
            &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.&rdquo;
          </p>
          
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-8 bg-[#8B9B62]/50" />
            <span className="text-[11px] font-semibold text-[#4A542C] uppercase tracking-[0.2em] font-sans">
              QS. Ar-Rum: 21
            </span>
            <div className="h-px w-8 bg-[#8B9B62]/50" />
          </div>
        </motion.div>

        {/* 2. Profil Mempelai (The Couple Section) */}
        <div className="w-full max-w-2xl px-2 flex flex-col items-center">
          {/* Mukadimah Salam */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-10"
          >
            <h4 className="font-arabic text-2xl md:text-3xl lg:text-4xl text-[#1A1A1A] font-normal mb-3 leading-relaxed" dir="rtl">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </h4>
            <p className="text-xs md:text-sm text-[#4A542C] max-w-lg mx-auto leading-relaxed font-sans">
              Dengan memohon Rahmat dan Ridho Allah Subhanahu Wa Ta&apos;ala, kami bermaksud untuk mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan
            </p>
          </motion.div>

          {/* Couple Cards — Sequential Reveal on Scroll */}
          <div className="flex flex-col items-center gap-6 w-full">
            {/* 1. Mempelai Wanita (Muncul Pertama) */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center text-center w-full max-w-sm"
            >
              {/* Portrait Arch Photo */}
              <div className="relative w-48 h-64 rounded-t-full rounded-b-2xl overflow-hidden border-3 border-[#8B9B62]/60 shadow-xl mb-5 bg-[#EEF2DF]/50">
                <img
                  src="/gallery/wanita.jpg"
                  alt="Akila Syifa Salsabila"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-[#1A1A1A] tracking-wide">
                Akila Syifa Salsabila
              </h3>
              <div className="h-px w-12 bg-[#8B9B62] my-2.5" />
              <p className="text-xs md:text-sm text-[#4A542C] font-sans leading-relaxed">
                Putri dari Bapak Giyanta <br />&amp; Ibu Susi Suryani (Almh.)
              </p>
            </motion.div>

            {/* Ampersand Divider */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex flex-col items-center gap-1.5"
            >
              <div className="h-7 w-0.5 bg-gradient-to-b from-transparent via-[#8B9B62]/60 to-[#8B9B62]" />
              <span className="font-serif text-4xl md:text-5xl text-[#3B4420] font-normal drop-shadow-[0_2px_10px_rgba(59,68,32,0.15)] select-none">
                &amp;
              </span>
              <div className="h-7 w-0.5 bg-gradient-to-b from-[#8B9B62] via-[#8B9B62]/60 to-transparent" />
            </motion.div>

            {/* 2. Mempelai Pria (Muncul Saat Di-scroll) */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center text-center w-full max-w-sm"
            >
              {/* Portrait Arch Photo */}
              <div className="relative w-48 h-64 rounded-t-full rounded-b-2xl overflow-hidden border-3 border-[#8B9B62]/60 shadow-xl mb-5 bg-[#EEF2DF]/50">
                <img
                  src="/gallery/pria.jpeg"
                  alt="Gagas Wijaksana Nugraha"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-[#1A1A1A] tracking-wide">
                Gagas Wijaksana Nugraha
              </h3>
              <div className="h-px w-12 bg-[#8B9B62] my-3" />
              <p className="text-xs md:text-sm text-[#4A542C] font-sans leading-relaxed">
                Putra dari Bapak Nedy Winuza (Alm.) <br />&amp; Ibu Nelzi Fati
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
