"use client";

import { motion } from "framer-motion";
import { PaperCard } from "@/components/ui/PaperCard";

export function Ayat() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center py-16 px-2 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md flex flex-col items-center"
      >
        <PaperCard variant="lace-bottom" waxSeal={false} className="text-center pt-6 sm:pt-8 pb-4">
          {/* Teks Ayat Al-Qur'an (Arab) */}
          <p
            className="font-arabic text-lg sm:text-xl text-[#1A1A1A] leading-loose mb-5 px-2"
            dir="rtl"
          >
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
          </p>

          {/* Terjemahan */}
          <p className="text-[#3B4420] text-xs sm:text-[18px] leading-relaxed mb-4 italic font-serif px-2">
            &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.&rdquo;
          </p>

          {/* Referensi Ayat tanpa garis divider */}
          <div className="mt-4">
            <span className="text-[11px] font-semibold text-[#4A542C] tracking-[0.25em] font-serif uppercase">
              QS. Ar-Rum 21
            </span>
          </div>
        </PaperCard>
      </motion.div>
    </section>
  );
}
