"use client";

import { motion } from "framer-motion";
import { Heart, Search, CalendarDays, Compass } from "lucide-react";

interface StoryEventProps {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

function StoryNode({ date, title, description, icon, index }: StoryEventProps) {
  const isEven = index % 2 === 0;

  return (
    <div className="flex flex-col md:flex-row md:justify-between items-center w-full mb-12 last:mb-0 relative">
      {/* Connector line dot in the center */}
      <div className="absolute left-[30px] md:left-1/2 -translate-x-[11px] md:-translate-x-1/2 flex items-center justify-center z-13">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-10 h-10 rounded-full bg-white border-2 border-primary flex items-center justify-center text-primary shadow-md"
        >
          {icon}
        </motion.div>
      </div>

      {/* Left side card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? "md:text-right md:ml-auto md:order-last" : "md:text-left md:mr-auto"}`}
      >
        <div className="bg-white/50 backdrop-blur-xs p-6 rounded-2xl border border-white/60 shadow-sm hover:shadow-md transition-shadow">
          <span className="text-xs font-semibold text-primary/80 uppercase tracking-widest block mb-2 font-sans">
            {date}
          </span>
          <h4 className="font-serif text-lg font-semibold text-accent mb-2">
            {title}
          </h4>
          <p className="text-xs text-muted leading-relaxed font-sans">
            {description}
          </p>
        </div>
      </motion.div>

      {/* Spacer for structure */}
      <div className="hidden md:block w-[45%]" />
    </div>
  );
}

export function Story() {
  const stories = [
    {
      date: "Desember 2021",
      title: "Pertama Bertemu (First Meet)",
      description: "Pertemuan pertama kali secara tidak sengaja di sebuah perpustakaan kota. Percakapan singkat tentang hobi membaca yang sama akhirnya berlanjut dengan bertukar media sosial.",
      icon: <Search className="w-4 h-4" />
    },
    {
      date: "Juni 2023",
      title: "Menjalin Komitmen",
      description: "Setelah saling mengenal dan tumbuh rasa kecocokan yang kuat, kami memutuskan untuk berkomitmen menjalin hubungan yang lebih serius untuk melangkah ke masa depan bersama.",
      icon: <Heart className="w-4 h-4" />
    },
    {
      date: "Maret 2025",
      title: "Lamaran Resmi (Engagement)",
      description: "Di hadapan keluarga besar kedua belah pihak, kami secara resmi melangsungkan lamaran sebagai wujud keseriusan untuk mengikat janji suci pernikahan.",
      icon: <CalendarDays className="w-4 h-4" />
    },
    {
      date: "Desember 2026",
      title: "Langkah Baru (Wedding Day)",
      description: "Hari bersejarah di mana kami berdua mengucapkan janji suci ikatan sehidup semati di depan saksi-saksi dan memulai lembaran baru sebagai suami istri.",
      icon: <Compass className="w-4 h-4" />
    }
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-[#f3efe9] to-[#faf8f5] overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Title */}
        <div className="text-center mb-16 gold-border pb-4">
          <span className="text-[10px] uppercase tracking-[0.4em] text-accent block mb-2">Cerita Cinta Kami</span>
          <h3 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
            Perjalanan Cinta
          </h3>
        </div>

        {/* Timeline body */}
        <div className="relative w-full mt-8">
          {/* Vertical line through timeline */}
          <div className="absolute left-[30px] md:left-1/2 top-4 bottom-4 w-[2px] bg-primary/20 -translate-x-[2px] md:-translate-x-1/2 pointer-events-none" />

          {stories.map((story, i) => (
            <StoryNode key={i} {...story} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
