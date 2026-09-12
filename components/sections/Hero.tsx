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
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-3xl flex flex-col items-center text-center z-10"
      >
        {/* 1. Ayat Al-Qur'an (QS. Ar-Rum: 21 in Arch Frame) */}
        <motion.div 
          variants={itemVariants}
          className="w-full max-w-xl bg-white/85 backdrop-blur-md border border-[#E8DECF] p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgba(184,147,88,0.08)] mb-14 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#B89358] to-transparent" />
          

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
            <h4 className="font-arabic text-2xl md:text-3xl lg:text-4xl text-[#26211C] font-normal mb-3 leading-relaxed" dir="rtl">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </h4>
            <p className="text-xs md:text-sm text-[#786C5E] max-w-lg mx-auto leading-relaxed font-sans">
              Dengan memohon Rahmat dan Ridho Allah Subhanahu Wa Ta&apos;ala, kami bermaksud untuk mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:
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
              <div className="relative w-48 h-64 rounded-t-full rounded-b-2xl overflow-hidden border-3 border-[#B89358]/50 shadow-xl mb-5 bg-[#F3ECE1]/50">
                <img
                  src="/gallery/wanita.jpg"
                  alt="Akila Syifa Salsabila"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-[#26211C] tracking-wide">
                Akila Syifa Salsabila
              </h3>
              <div className="h-px w-12 bg-[#B89358] my-2.5" />
              <p className="text-xs md:text-sm text-[#5C5042] font-sans leading-relaxed">
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
              <div className="h-7 w-0.5 bg-gradient-to-b from-transparent via-[#B89358]/60 to-[#B89358]" />
              <span className="font-serif text-4xl md:text-5xl text-[#B89358] font-normal drop-shadow-[0_2px_10px_rgba(184,147,88,0.25)] select-none">
                &amp;
              </span>
              <div className="h-7 w-0.5 bg-gradient-to-b from-[#B89358] via-[#B89358]/60 to-transparent" />
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
              <div className="relative w-48 h-64 rounded-t-full rounded-b-2xl overflow-hidden border-3 border-[#B89358]/50 shadow-xl mb-5 bg-[#F3ECE1]/50">
                <img
                  src="/gallery/pria.jpeg"
                  alt="Gagas Wijaksana Nugraha"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-[#26211C] tracking-wide">
                Gagas Wijaksana Nugraha
              </h3>
              <div className="h-px w-12 bg-[#B89358] my-3" />
              <p className="text-xs md:text-sm text-[#5C5042] font-sans leading-relaxed">
                Putra dari Bapak Nedy Winuza (Alm.) <br />&amp; Ibu Nelzi Fati
              </p>
            </motion.div>
          </div>
        </div>

        {/* 4. Save The Date & Calendar Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-sm flex flex-col items-center mb-10"
        >
          {/* Section Header */}
          <h3 className="font-serif italic text-3xl md:text-4xl text-[#1A1A1A] text-center mb-6 drop-shadow-xs">
            Save The Date!
          </h3>

          {/* 4A. Calendar Card */}
          <div className="w-full bg-[#DCE3C2]/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-[#CAD4AA]/60 mb-5">
            {/* Calendar Header: Month & Year */}
            <div className="flex justify-between items-center mb-4 px-1">
              <span className="font-serif tracking-[0.2em] uppercase text-sm md:text-base font-semibold text-[#2D3319]">
                DECEMBER
              </span>
              <span className="font-serif text-sm md:text-base font-semibold text-[#2D3319]">
                2026
              </span>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 text-center text-[11px] md:text-xs font-serif italic text-[#4A542C] mb-3">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-y-3.5 text-center items-center">
              {/* Row 1 */}
              <span />
              <span />
              <span className="text-xs md:text-sm font-serif text-[#3B4420]">1</span>
              <span className="text-xs md:text-sm font-serif text-[#3B4420]">2</span>
              <span className="text-xs md:text-sm font-serif text-[#3B4420]">3</span>
              <span className="text-xs md:text-sm font-serif text-[#3B4420]">4</span>
              <span className="text-xs md:text-sm font-serif text-[#3B4420]">5</span>

              {/* Row 2 */}
              <span className="text-xs md:text-sm font-serif text-[#3B4420]">6</span>
              <span className="text-xs md:text-sm font-serif text-[#3B4420]">7</span>
              <span className="text-xs md:text-sm font-serif text-[#3B4420]">8</span>
              <span className="text-xs md:text-sm font-serif text-[#3B4420]">9</span>
              <span className="text-xs md:text-sm font-serif text-[#3B4420]">10</span>
              <span className="text-xs md:text-sm font-serif text-[#3B4420]">11</span>
              
              {/* Day 12 with Animated Love Heart */}
              <div className="relative flex items-center justify-center font-serif font-bold text-sm md:text-base text-[#1A1A1A]">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  className="absolute -inset-2 flex items-center justify-center pointer-events-none"
                >
                  <svg viewBox="0 0 32 32" className="w-9 h-9 fill-none stroke-[#3B4420] stroke-[2.2] drop-shadow-xs">
                    <path d="M16 28 C16 28 3 19 3 10 C3 5.5 6.5 2 11 2 C13.5 2 15 3.5 16 5 C17 3.5 18.5 2 21 2 C25.5 2 29 5.5 29 10 C29 19 16 28 16 28 Z" />
                  </svg>
                </motion.div>
                <span className="relative z-10 font-bold text-[#1A1A1A]">12</span>
              </div>

              {/* Row 3 */}
              <span className="text-xs md:text-sm font-serif text-[#3B4420]">13</span>
              <span className="text-xs md:text-sm font-serif text-[#3B4420]">14</span>
              <span className="text-xs md:text-sm font-serif text-[#3B4420]">15</span>
              <span className="text-xs md:text-sm font-serif text-[#3B4420]">16</span>
              <span className="text-xs md:text-sm font-serif text-[#3B4420]">17</span>
              <span className="text-xs md:text-sm font-serif text-[#3B4420]">18</span>
              <span className="text-xs md:text-sm font-serif text-[#3B4420]">19</span>

              {/* Row 4 */}
              <span className="text-xs md:text-sm font-serif text-[#3B4420]">20</span>
              <span className="text-xs md:text-sm font-serif text-[#3B4420]">21</span>
              <span className="text-xs md:text-sm font-serif text-[#3B4420]">22</span>
              <span className="text-xs md:text-sm font-serif text-[#3B4420]">23</span>
              <span className="text-xs md:text-sm font-serif text-[#3B4420]">24</span>
              <span className="text-xs md:text-sm font-serif text-[#3B4420]">25</span>
              <span className="text-xs md:text-sm font-serif text-[#3B4420]">26</span>

              {/* Row 5 */}
              <span className="text-xs md:text-sm font-serif text-[#3B4420]">27</span>
              <span className="text-xs md:text-sm font-serif text-[#3B4420]">28</span>
              <span className="text-xs md:text-sm font-serif text-[#3B4420]">29</span>
              <span className="text-xs md:text-sm font-serif text-[#3B4420]">30</span>
              <span className="text-xs md:text-sm font-serif text-[#3B4420]">31</span>
              <span />
              <span />
            </div>
          </div>

          {/* 4B. Event Details Card */}
          <div className="w-full bg-[#DCE3C2]/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-[#CAD4AA]/60 text-center mb-5">
            <p className="font-serif text-sm md:text-base text-[#2D3319] font-medium mb-1">
              Sabtu, 12 Desember 2026
            </p>
            <h4 className="font-sans text-xl md:text-2xl font-bold text-[#1A1A1A] tracking-tight mb-2.5">
              The Samasta Jatiwarna
            </h4>
            <p className="text-[11px] md:text-xs text-[#4A542C] font-sans leading-relaxed max-w-xs mx-auto mb-5">
              Grand Dhika City Jatiwarna, RT.001/RW.005, Jatimelati, Kec. Pd. Melati, Kota Bks, Jawa Barat
            </p>

            {/* Akad & Resepsi Two-Column Schedule */}
            <div className="grid grid-cols-2 divide-x divide-[#BCC69B] pt-4 border-t border-[#BCC69B]/60">
              <div className="text-center px-2">
                <h5 className="font-serif text-sm md:text-base font-bold text-[#2D3319] mb-1">
                  Akad
                </h5>
                <p className="text-xs md:text-sm font-sans font-medium text-[#3B4420]">
                  15.00 – 16.30 WIB
                </p>
              </div>
              <div className="text-center px-2">
                <h5 className="font-serif text-sm md:text-base font-bold text-[#2D3319] mb-1">
                  Resepsi
                </h5>
                <p className="text-xs md:text-sm font-sans font-medium text-[#3B4420]">
                  19.00 – 21.00 WIB
                </p>
              </div>
            </div>
          </div>

          {/* 4C. Action Buttons Pills */}
          <div className="flex flex-row gap-3 w-full justify-center">
            <button
              onClick={() => window.open(mapUrl, "_blank")}
              className="flex-1 py-3 px-4 rounded-full bg-[#EAEFD9] hover:bg-[#DDE4C6] border border-[#CAD4AA] text-xs font-semibold text-[#2D3319] transition-all shadow-sm cursor-pointer text-center"
            >
              Google Maps
            </button>
            <button
              onClick={() => window.open(calendarUrl, "_blank")}
              className="flex-1 py-3 px-4 rounded-full bg-[#EAEFD9] hover:bg-[#DDE4C6] border border-[#CAD4AA] text-xs font-semibold text-[#2D3319] transition-all shadow-sm cursor-pointer text-center"
            >
              Save to your calendar
            </button>
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
