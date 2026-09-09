"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { motion, Variants } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";


interface HeroProps {
  weddingDate: string;
}

export function Hero({ weddingDate }: HeroProps) {
  const { days, hours, minutes, seconds, isCompleted } = useCountdown(weddingDate);

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
        {/* Save The Date badge */}
        <motion.span 
          variants={itemVariants} 
          className="text-xs uppercase tracking-[0.4em] text-accent font-semibold mb-6 px-4 py-1.5 border border-primary/20 rounded-full bg-white/40 backdrop-blur-xs shadow-xs"
        >
          Save the Date
        </motion.span>

        {/* Floating Ring / Frame for Placeholder image */}
        <motion.div
          variants={itemVariants}
          className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-white shadow-2xl p-1 bg-secondary mx-auto overflow-hidden animate-float mb-8"
        >
          {/* Default beautiful decorative background if image isn't set, otherwise beautiful picture. Let's make it look ready to receive an image. */}
          <div className="w-full h-full rounded-full bg-linear-to-tr from-primary/30 to-accent/40 flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600')] bg-cover bg-center mix-blend-overlay opacity-80" />
            <div className="p-4 text-center z-10">
              <span className="font-serif text-3xl text-emerald-950 font-bold block mb-1">G & A</span>
              <span className="text-[10px] uppercase tracking-widest text-[#635544]">Our Journey Starts Here</span>
            </div>
            {/* Elegant luxury overlay grid */}
            <div className="absolute inset-0 border border-white/20 rounded-full pointer-events-none scale-95" />
          </div>
        </motion.div>

        {/* Couple Names */}
        <motion.h2 
          variants={itemVariants}
          className="font-serif text-4xl md:text-6xl font-semibold mb-4 text-[#2d2722] tracking-wide"
        >
          Gagas & Akila
        </motion.h2>

        <motion.p 
          variants={itemVariants}
          className="text-[#786c5f] max-w-md text-sm md:text-base leading-relaxed mb-8 italic"
        >
          &ldquo;Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya...&rdquo;
        </motion.p>

        {/* Wedding Info Banner */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg mb-10 pl-2 pr-2"
        >
          <div className="flex items-center justify-center gap-3 p-4 bg-white/50 backdrop-blur-md rounded-xl border border-white shadow-xs">
            <Calendar className="w-5 h-5 text-primary shrink-0" />
            <div className="text-left">
              <p className="text-[10px] uppercase text-muted tracking-wider">Hari & Tanggal</p>
              <p className="text-xs font-semibold text-foreground">Sabtu, 12 Desember 2026</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 p-4 bg-white/50 backdrop-blur-md rounded-xl border border-white shadow-xs">
            <MapPin className="w-5 h-5 text-primary shrink-0" />
            <div className="text-left">
              <p className="text-[10px] uppercase text-muted tracking-wider">Lokasi Acara</p>
              <p className="text-xs font-semibold text-foreground">The Samasta Jatiwarna</p>
            </div>
          </div>
        </motion.div>

        {/* Countdown Box */}
        <motion.div 
          variants={itemVariants}
          className="w-full max-w-md bg-white/60 backdrop-blur-md border border-white p-6 rounded-2xl shadow-lg ring-1 ring-primary/5"
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
