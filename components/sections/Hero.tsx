"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { motion, Variants } from "framer-motion";
import { Calendar, Map, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getGoogleCalendarUrl } from "@/utils/calendar";

interface HeroProps {
  weddingDate: string;
}

export function Hero({ weddingDate }: HeroProps) {
  const { days, hours, minutes, seconds, isCompleted } = useCountdown(weddingDate);

  const mapUrl = process.env.NEXT_PUBLIC_MAP_URL || "https://maps.google.com/?q=The+Samasta+Jatiwarna";

  const calendarUrl = getGoogleCalendarUrl({
    title: "The Wedding of Akila & Gagas",
    description: "Akad: 15.00 - 16.30 WIB | Resepsi: 19.00 - 21.00 WIB di The Samasta Jatiwarna. Terima kasih atas doa dan kehadiran Anda.",
    location: "The Samasta Jatiwarna",
    startTime: "20261212T080000Z", // 15:00 WIB (UTC+7)
    endTime: "20261212T140000Z",   // 21:00 WIB (UTC+7)
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center py-20 px-4 relative overflow-hidden bg-gradient-to-b from-[#faf8f5]/60 to-[#f3efe9]/60">
      {/* Decorative frame vectors */}
      <div className="absolute top-10 left-10 w-32 h-32 border-t-2 border-l-2 border-primary/20 pointer-events-none hidden md:block" />
      <div className="absolute top-10 right-10 w-32 h-32 border-t-2 border-r-2 border-primary/20 pointer-events-none hidden md:block" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-3xl flex flex-col items-center text-center z-10"
      >
        {/* 1. Countdown Box */}
        <motion.div 
          variants={itemVariants}
          className="w-full max-w-md bg-white/90 backdrop-blur-md border border-[#E8DECF] p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgba(184,147,88,0.12)] mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#B89358] to-transparent" />
          
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#B89358] font-semibold block mb-1">
            Save The Date
          </span>
          <h3 className="font-serif text-xl md:text-2xl text-[#26211C] font-semibold mb-6">
            Menuju Hari Bahagia
          </h3>
          
          {isCompleted ? (
            <div className="py-4 text-center">
              <p className="font-serif text-xl font-medium text-[#B89358]">Acara Sedang Berlangsung / Terima Kasih Atas Doanya</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2.5">
              <div className="flex flex-col items-center p-3 bg-[#FAF7F2] rounded-2xl border border-[#E8DECF]">
                <span className="font-serif text-2xl md:text-3xl font-bold text-[#785A34]">{days}</span>
                <span className="text-[9px] uppercase tracking-widest text-[#827568] mt-1 font-sans font-medium">Hari</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-[#FAF7F2] rounded-2xl border border-[#E8DECF]">
                <span className="font-serif text-2xl md:text-3xl font-bold text-[#785A34]">{hours}</span>
                <span className="text-[9px] uppercase tracking-widest text-[#827568] mt-1 font-sans font-medium">Jam</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-[#FAF7F2] rounded-2xl border border-[#E8DECF]">
                <span className="font-serif text-2xl md:text-3xl font-bold text-[#785A34]">{minutes}</span>
                <span className="text-[9px] uppercase tracking-widest text-[#827568] mt-1 font-sans font-medium">Menit</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-[#FAF7F2] rounded-2xl border border-[#E8DECF]">
                <span className="font-serif text-2xl md:text-3xl font-bold text-[#785A34]">{seconds}</span>
                <span className="text-[9px] uppercase tracking-widest text-[#827568] mt-1 font-sans font-medium">Detik</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* 2. Ayat Al-Qur'an (QS. Ar-Rum: 21 in Arch Frame) */}
        <motion.div 
          variants={itemVariants}
          className="w-full max-w-xl bg-white/85 backdrop-blur-md border border-[#E8DECF] p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgba(184,147,88,0.08)] mb-14 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#B89358] to-transparent" />
          
          {/* Basmalah Calligraphy Style */}
          <div className="font-serif text-xl md:text-2xl text-[#785A34] mb-4 tracking-widest">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>

          <p className="text-[#5C5042] text-xs md:text-sm leading-relaxed mb-4 italic font-serif">
            &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.&rdquo;
          </p>
          
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-8 bg-[#B89358]/50" />
            <span className="text-[11px] font-semibold text-[#B89358] uppercase tracking-[0.2em] font-sans">
              QS. Ar-Rum: 21
            </span>
            <div className="h-px w-8 bg-[#B89358]/50" />
          </div>
        </motion.div>

        {/* 3. Profil Mempelai (The Couple Section) */}
        <div className="w-full max-w-2xl mb-14 px-2 flex flex-col items-center">
          {/* Mukadimah Salam */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-10"
          >
            <h4 className="font-serif text-2xl md:text-3xl text-[#26211C] font-medium mb-3">
              Assalamu&apos;alaikum Warahmatullahi Wabarakatuh
            </h4>
            <p className="text-xs md:text-sm text-[#786C5E] max-w-lg mx-auto leading-relaxed font-sans">
              Dengan memohon Rahmat dan Ridho Allah Subhanahu Wa Ta&apos;ala, kami bermaksud untuk mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:
            </p>
          </motion.div>

          {/* Couple Cards — Sequential Reveal on Scroll */}
          <div className="flex flex-col items-center gap-12 w-full">
            {/* 1. Mempelai Wanita (Muncul Pertama) */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center text-center bg-white/85 backdrop-blur-md p-7 sm:p-8 rounded-3xl border border-[#E8DECF] shadow-xl w-full max-w-sm"
            >
              {/* Portrait Arch Photo */}
              <div className="relative w-44 h-56 rounded-t-full rounded-b-2xl overflow-hidden border-3 border-[#B89358]/40 shadow-md mb-5 bg-[#F3ECE1]">
                <img
                  src="/gallery/wanita.jpg"
                  alt="Akila Syifa Salsabila"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-[#26211C] tracking-wide">
                Akila Syifa Salsabila
              </h3>
              <div className="h-px w-10 bg-[#B89358] my-2.5" />
              <p className="text-xs text-[#786C5E] font-sans leading-relaxed">
                Putri dari Bapak Giyanta <br />&amp; Almh. Ibu Susi Suryani
              </p>
            </motion.div>

            {/* Ampersand Divider */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex flex-col items-center gap-3 my-2"
            >
              <div className="h-16 w-0.5 bg-gradient-to-b from-transparent via-[#B89358]/60 to-[#B89358]" />
              <span className="font-serif text-5xl md:text-6xl text-[#B89358] font-normal drop-shadow-[0_2px_10px_rgba(184,147,88,0.25)] select-none">
                &amp;
              </span>
              <div className="h-16 w-0.5 bg-gradient-to-b from-[#B89358] via-[#B89358]/60 to-transparent" />
            </motion.div>

            {/* 2. Mempelai Pria (Muncul Saat Di-scroll) */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center text-center bg-white/85 backdrop-blur-md p-7 sm:p-8 rounded-3xl border border-[#E8DECF] shadow-xl w-full max-w-sm"
            >
              {/* Portrait Arch Photo */}
              <div className="relative w-44 h-56 rounded-t-full rounded-b-2xl overflow-hidden border-3 border-[#B89358]/40 shadow-md mb-5 bg-[#F3ECE1]">
                <img
                  src="/gallery/pria.jpeg"
                  alt="Gagas Wijaksana Nugraha"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-[#26211C] tracking-wide">
                Gagas Wijaksana Nugraha
              </h3>
              <div className="h-px w-10 bg-[#B89358] my-2.5" />
              <p className="text-xs text-[#786C5E] font-sans leading-relaxed">
                Putra dari Alm. Bapak Nedy Winuza <br />&amp; Ibu Nelzi Fati
              </p>
            </motion.div>
          </div>
        </div>

        {/* 4. Informasi Acara (Waktu & Tempat) */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-xl bg-white/90 backdrop-blur-md rounded-3xl border border-[#E8DECF] p-8 md:p-10 shadow-[0_8px_30px_rgba(184,147,88,0.12)] relative overflow-hidden text-center mb-8"
        >
          {/* Top gold line decorator */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#B89358] to-transparent" />

          {/* Date & Venue Header */}
          <div className="mb-8">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#B89358] font-semibold block mb-2">
              Save Our Special Day
            </span>
            <div className="inline-flex items-center justify-center gap-2 text-[#785A34] font-medium text-xs md:text-sm tracking-wider uppercase mb-1">
              <Calendar className="w-4 h-4 text-[#B89358]" />
              <span>Sabtu, 12 Desember 2026</span>
            </div>
            <h4 className="font-serif text-2xl md:text-3xl font-semibold text-[#26211C] tracking-wide mt-1">
              The Samasta Jatiwarna
            </h4>
          </div>

          {/* Akad & Resepsi Two-Column Section with Divider */}
          <div className="bg-[#FAF7F2] rounded-2xl p-6 border border-[#E8DECF] mb-8">
            <div className="grid grid-cols-2 divide-x divide-[#E5DC CE]">
              {/* Akad Column */}
              <div className="px-3 md:px-5 text-center">
                <h5 className="font-serif text-lg md:text-xl font-semibold text-[#785A34] mb-1.5">
                  Akad
                </h5>
                <p className="text-xs md:text-sm font-medium text-[#4A3E35] tracking-wide">
                  15.00 – 16.30 WIB
                </p>
              </div>

              {/* Resepsi Column */}
              <div className="px-3 md:px-5 text-center">
                <h5 className="font-serif text-lg md:text-xl font-semibold text-[#785A34] mb-1.5">
                  Resepsi
                </h5>
                <p className="text-xs md:text-sm font-medium text-[#4A3E35] tracking-wide">
                  19.00 – 21.00 WIB
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
            <Button
              onClick={() => window.open(mapUrl, "_blank")}
              variant="outline"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-xs font-semibold hover:bg-[#FAF7F2] border-[#B89358]/50 text-[#785A34] transition-all cursor-pointer shadow-xs"
            >
              <Map className="w-4 h-4 text-[#B89358]" />
              Google Maps
            </Button>
            <Button
              onClick={() => window.open(calendarUrl, "_blank")}
              variant="primary"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[#B89358] via-[#CBB07E] to-[#B89358] text-white shadow-[0_4px_15px_rgba(184,147,88,0.25)] hover:brightness-105 transition-all cursor-pointer"
            >
              <CalendarPlus className="w-4 h-4" />
              Save to your calendar
            </Button>
          </div>
        </motion.div>
      </motion.div>

      {/* Elegant scroll indicator */}
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
