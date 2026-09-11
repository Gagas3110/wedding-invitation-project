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
    title: "The Wedding of Gagas & Akila",
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
    <section className="min-h-screen flex flex-col justify-center items-center py-20 px-4 relative overflow-hidden bg-gradient-to-b from-[#faf8f5] to-[#f3efe9]">
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
          className="w-full max-w-md bg-white/70 backdrop-blur-md border border-white p-6 rounded-2xl shadow-lg ring-1 ring-primary/5 mb-8"
        >
          <h3 className="text-center font-serif text-lg text-accent italic mb-4">Menuju Hari Bahagia</h3>
          
          {isCompleted ? (
            <div className="py-4 text-center">
              <p className="font-serif text-xl font-medium text-primary">Acara Sedang Berlangsung / Terima Kasih Atas Doanya</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              <div className="flex flex-col items-center p-3 bg-secondary/60 rounded-xl">
                <span className="font-serif text-2xl md:text-3xl font-bold text-accent">{days}</span>
                <span className="text-[10px] uppercase tracking-wider text-muted mt-1">Hari</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-secondary/60 rounded-xl">
                <span className="font-serif text-2xl md:text-3xl font-bold text-accent">{hours}</span>
                <span className="text-[10px] uppercase tracking-wider text-muted mt-1">Jam</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-secondary/60 rounded-xl">
                <span className="font-serif text-2xl md:text-3xl font-bold text-accent">{minutes}</span>
                <span className="text-[10px] uppercase tracking-wider text-muted mt-1">Menit</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-secondary/60 rounded-xl">
                <span className="font-serif text-2xl md:text-3xl font-bold text-accent">{seconds}</span>
                <span className="text-[10px] uppercase tracking-wider text-muted mt-1">Detik</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* 2. Ayat Al-Qur'an (QS. Ar-Rum: 21) */}
        <motion.div 
          variants={itemVariants}
          className="max-w-lg mb-10 px-4 text-center"
        >
          <p className="text-[#786c5f] text-xs md:text-sm leading-relaxed mb-2 italic">
            &ldquo;Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;
          </p>
          <span className="text-[11px] font-semibold text-accent uppercase tracking-widest">
            — QS. Ar-Rum: 21 —
          </span>
        </motion.div>

        {/* 3. Nama Pengantin & Foto Monogram */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-center mb-10"
        >
          <div
            className="relative w-56 h-56 md:w-72 md:h-72 rounded-full border-4 border-white shadow-2xl p-1 bg-secondary mx-auto overflow-hidden animate-float mb-6"
          >
            <div className="w-full h-full rounded-full bg-linear-to-tr from-primary/30 to-accent/40 flex flex-col items-center justify-center relative">
              <div className="absolute inset-0 bg-[url('/gallery/DSC03112%20(1).jpg')] bg-cover bg-center mix-blend-overlay opacity-80" />
              <div className="p-4 text-center z-10">
                <span className="font-serif text-3xl text-emerald-950 font-bold block mb-1">G & A</span>
                <span className="text-[10px] uppercase tracking-widest text-[#635544]">Our Journey Starts Here</span>
              </div>
              <div className="absolute inset-0 border border-white/20 rounded-full pointer-events-none scale-95" />
            </div>
          </div>

          <h2 className="font-serif text-4xl md:text-6xl font-semibold text-[#2d2722] tracking-wide">
            Gagas & Akila
          </h2>
        </motion.div>

        {/* 4. Informasi Acara (Waktu & Tempat) */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-xl bg-white/80 backdrop-blur-md rounded-3xl border border-white p-6 md:p-8 shadow-lg relative overflow-hidden text-center mb-8"
        >
          {/* Top gold line decorator */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary/60 to-transparent" />

          {/* Date & Venue Header */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center gap-2 text-primary font-medium text-xs md:text-sm tracking-wider uppercase mb-1.5">
              <Calendar className="w-4 h-4" />
              <span>Sabtu, 12 Desember 2026</span>
            </div>
            <h4 className="font-serif text-2xl md:text-3xl font-semibold text-foreground tracking-wide mt-1">
              The Samasta Jatiwarna
            </h4>
          </div>

          {/* Akad & Resepsi Two-Column Section with Divider */}
          <div className="bg-secondary/40 rounded-2xl p-5 md:p-6 border border-white/60 mb-6">
            <div className="grid grid-cols-2 divide-x divide-[#e2d9cd]">
              {/* Akad Column */}
              <div className="px-2 md:px-4 text-center">
                <h5 className="font-serif text-base md:text-lg font-semibold text-accent mb-1">
                  Akad
                </h5>
                <p className="text-xs md:text-sm font-medium text-foreground/80 tracking-wide">
                  15.00 – 16.30 WIB
                </p>
              </div>

              {/* Resepsi Column */}
              <div className="px-2 md:px-4 text-center">
                <h5 className="font-serif text-base md:text-lg font-semibold text-accent mb-1">
                  Resepsi
                </h5>
                <p className="text-xs md:text-sm font-medium text-foreground/80 tracking-wide">
                  19.00 – 21.00 WIB
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
            <Button
              onClick={() => window.open(mapUrl, "_blank")}
              variant="outline"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-semibold hover:bg-primary/10 transition-all cursor-pointer shadow-xs"
            >
              <Map className="w-4 h-4 text-primary" />
              Google Maps
            </Button>
            <Button
              onClick={() => window.open(calendarUrl, "_blank")}
              variant="primary"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-semibold shadow-[0_4px_12px_rgba(197,168,128,0.25)] hover:shadow-[0_4px_18px_rgba(197,168,128,0.35)] transition-all cursor-pointer"
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
