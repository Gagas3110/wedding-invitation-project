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
    <section className="py-12 sm:py-16 px-3 relative z-10">
      <div className="w-full max-w-sm mx-auto flex flex-col items-center">
        {/* 1. Header: Save The Date! */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-6"
        >
          <h3 className="font-serif italic text-3xl sm:text-4xl text-[#1A1A1A] font-medium tracking-wide">
            Save The Date!
          </h3>
        </motion.div>

        {/* 2. Card 1: Calendar Card (Sesuai Gambar 2) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="w-full bg-[#EDEBD7] rounded-[28px] p-6 sm:p-7 shadow-[0_12px_28px_rgba(45,38,28,0.08)] border border-[#DDD9C2] mb-4"
        >
          {/* Month & Year */}
          <div className="flex justify-between items-center mb-6 px-1">
            <span className="font-serif tracking-[0.2em] uppercase text-base sm:text-lg font-bold text-[#1A1A1A]">
              DECEMBER
            </span>
            <span className="font-serif text-lg sm:text-xl font-bold text-[#1A1A1A]">
              2026
            </span>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 text-center text-xs sm:text-sm font-serif italic font-medium text-[#4A542C] mb-5">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Calendar Days Grid */}
          <div className="grid grid-cols-7 gap-y-4.5 sm:gap-y-5 text-center items-center">
            {/* Row 1 */}
            <span />
            <span />
            <span className="text-sm sm:text-base font-serif font-medium text-[#2D3319]">1</span>
            <span className="text-sm sm:text-base font-serif font-medium text-[#2D3319]">2</span>
            <span className="text-sm sm:text-base font-serif font-medium text-[#2D3319]">3</span>
            <span className="text-sm sm:text-base font-serif font-medium text-[#2D3319]">4</span>
            <span className="text-sm sm:text-base font-serif font-medium text-[#2D3319]">5</span>

            {/* Row 2 */}
            <span className="text-sm sm:text-base font-serif font-medium text-[#2D3319]">6</span>
            <span className="text-sm sm:text-base font-serif font-medium text-[#2D3319]">7</span>
            <span className="text-sm sm:text-base font-serif font-medium text-[#2D3319]">8</span>
            <span className="text-sm sm:text-base font-serif font-medium text-[#2D3319]">9</span>
            <span className="text-sm sm:text-base font-serif font-medium text-[#2D3319]">10</span>
            <span className="text-sm sm:text-base font-serif font-medium text-[#2D3319]">11</span>

            {/* Day 12 with White Background Heart & Zoom-in */}
            <div className="relative flex items-center justify-center">
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1.2, 1.35, 1.2] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                className="relative flex items-center justify-center cursor-default z-10"
              >
                {/* Heart Outline with White Fill */}
                <svg
                  viewBox="0 0 36 36"
                  className="w-11 h-11 sm:w-13 sm:h-13 fill-white stroke-[#3B4420] stroke-[2.4] drop-shadow-[0_4px_8px_rgba(45,38,28,0.12)] overflow-visible"
                >
                  <path
                    d="M18 31 C18 31 3.5 21 3.5 11.5 C3.5 6.5 7.5 2.5 12.5 2.5 C15.5 2.5 17 4 18 5.5 C19 4 20.5 2.5 23.5 2.5 C28.5 2.5 32.5 6.5 32.5 11.5 C32.5 21 18 31 18 31 Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {/* Tanggal 12 yang di-zoom in dan lebih besar dari angka lain */}
                <span className="absolute inset-0 flex items-center justify-center font-serif font-bold text-base sm:text-lg text-[#1A1A1A] select-none pt-0.5">
                  12
                </span>
              </motion.div>
            </div>

            {/* Row 3 */}
            <span className="text-sm sm:text-base font-serif font-medium text-[#2D3319]">13</span>
            <span className="text-sm sm:text-base font-serif font-medium text-[#2D3319]">14</span>
            <span className="text-sm sm:text-base font-serif font-medium text-[#2D3319]">15</span>
            <span className="text-sm sm:text-base font-serif font-medium text-[#2D3319]">16</span>
            <span className="text-sm sm:text-base font-serif font-medium text-[#2D3319]">17</span>
            <span className="text-sm sm:text-base font-serif font-medium text-[#2D3319]">18</span>
            <span className="text-sm sm:text-base font-serif font-medium text-[#2D3319]">19</span>

            {/* Row 4 */}
            <span className="text-sm sm:text-base font-serif font-medium text-[#2D3319]">20</span>
            <span className="text-sm sm:text-base font-serif font-medium text-[#2D3319]">21</span>
            <span className="text-sm sm:text-base font-serif font-medium text-[#2D3319]">22</span>
            <span className="text-sm sm:text-base font-serif font-medium text-[#2D3319]">23</span>
            <span className="text-sm sm:text-base font-serif font-medium text-[#2D3319]">24</span>
            <span className="text-sm sm:text-base font-serif font-medium text-[#2D3319]">25</span>
            <span className="text-sm sm:text-base font-serif font-medium text-[#2D3319]">26</span>

            {/* Row 5 */}
            <span className="text-sm sm:text-base font-serif font-medium text-[#2D3319]">27</span>
            <span className="text-sm sm:text-base font-serif font-medium text-[#2D3319]">28</span>
            <span className="text-sm sm:text-base font-serif font-medium text-[#2D3319]">29</span>
            <span className="text-sm sm:text-base font-serif font-medium text-[#2D3319]">30</span>
            <span className="text-sm sm:text-base font-serif font-medium text-[#2D3319]">31</span>
            <span />
            <span />
          </div>
        </motion.div>

        {/* 3. Card 2: Event Details Card (Sesuai Gambar 2) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full bg-[#EDEBD7] rounded-[28px] p-6 sm:p-7 shadow-[0_12px_28px_rgba(45,38,28,0.08)] border border-[#DDD9C2] mb-4 text-center"
        >
          <p className="font-serif text-sm sm:text-base text-[#2D3319] font-medium mb-1">
            Sabtu, 12 Desember 2026
          </p>
          <h4 className="font-sans text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tight mb-2">
            The Samasta Jatiwarna
          </h4>
          <p className="text-[11px] sm:text-xs text-[#4A542C] font-sans leading-relaxed max-w-xs mx-auto mb-6">
            Grand Dhika City Jatiwarna, RT.001/RW.005, Jatimelati, Kec. Pd. Melati, Kota Bks, Jawa Barat
          </p>

          {/* Akad & Resepsi (Dua Kolom Bersih Sesuai Gambar 2) */}
          <div className="grid grid-cols-2 text-center pt-1">
            <div className="px-2">
              <h5 className="font-serif text-sm sm:text-base font-semibold text-[#1A1A1A] mb-0.5">
                Akad
              </h5>
              <p className="text-xs sm:text-[13px] font-sans font-medium text-[#2D3319]">
                15.00 – 16.30 WIB
              </p>
            </div>
            <div className="px-2">
              <h5 className="font-serif text-sm sm:text-base font-semibold text-[#1A1A1A] mb-0.5">
                Resepsi
              </h5>
              <p className="text-xs sm:text-[13px] font-sans font-medium text-[#2D3319]">
                19.00 – 21.00 WIB
              </p>
            </div>
          </div>
        </motion.div>

        {/* 4. Action Buttons (Pill Buttons Sesuai Gambar 2) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-row gap-3 w-full justify-center"
        >
          <button
            onClick={() => window.open(mapUrl, "_blank")}
            className="flex-1 py-3 px-4 rounded-full bg-[#EDEBD7] hover:bg-[#E2DFCA] border border-[#DDD9C2] text-xs sm:text-[13px] font-semibold text-[#2D3319] shadow-xs transition-all cursor-pointer text-center"
          >
            Google Maps
          </button>
          <button
            onClick={() => window.open(calendarUrl, "_blank")}
            className="flex-1 py-3 px-4 rounded-full bg-[#EDEBD7] hover:bg-[#E2DFCA] border border-[#DDD9C2] text-xs sm:text-[13px] font-semibold text-[#2D3319] shadow-xs transition-all cursor-pointer text-center"
          >
            Save to your calendar
          </button>
        </motion.div>
      </div>
    </section>
  );
}
