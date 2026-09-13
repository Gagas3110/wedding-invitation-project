"use client";

import { motion } from "framer-motion";
import { getGoogleCalendarUrl } from "@/utils/calendar";

export function SaveTheDate() {
  const mapUrl = process.env.NEXT_PUBLIC_MAP_URL || "https://maps.google.com/?q=The+Samasta+Jatiwarna";

  const calendarUrl = getGoogleCalendarUrl({
    title: "The Wedding of Akila & Gagas",
    description: "Akad: 15.00 - 16.30 WIB | Resepsi: 19.00 - 21.00 WIB di The Samasta Jatiwarna. Terima kasih atas doa dan kehadiran Anda.",
    location: "The Samasta Jatiwarna",
    startTime: "20261212T080000Z", // 15:00 WIB (UTC+7)
    endTime: "20261212T140000Z",   // 21:00 WIB (UTC+7)
  });

  return (
    <section className="py-24 px-4 bg-[#FAF7F2]/60 flex flex-col justify-center items-center relative overflow-hidden">
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8 relative pb-2"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#4A542C] font-semibold block mb-2">
            Informasi Acara
          </span>
          <h3 className="font-serif italic text-3xl md:text-4xl text-[#1A1A1A] font-semibold">
            Save The Date!
          </h3>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#8B9B62] to-transparent mx-auto mt-3" />
        </motion.div>

        {/* 1. Calendar Card */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="w-full bg-[#DCE3C2]/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-[#CAD4AA]/60 mb-6"
        >
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
        </motion.div>

        {/* 2. Event Details Card & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full"
        >
          {/* Event Details Card */}
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

          {/* Action Buttons Pills */}
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
      </div>
    </section>
  );
}
