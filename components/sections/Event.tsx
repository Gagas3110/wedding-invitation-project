"use client";

import { motion } from "framer-motion";
import { Calendar, Map, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getGoogleCalendarUrl } from "@/utils/calendar";

export function Event() {
  const mapUrl = process.env.NEXT_PUBLIC_MAP_URL || "https://maps.google.com/?q=The+Samasta+Jatiwarna";

  const calendarUrl = getGoogleCalendarUrl({
    title: "The Wedding of Gagas & Akila",
    description: "Akad: 15.00 - 16.30 WIB | Resepsi: 19.00 - 21.00 WIB di The Samasta Jatiwarna. Terima kasih atas doa dan kehadiran Anda.",
    location: "The Samasta Jatiwarna",
    startTime: "20261212T080000Z", // 15:00 WIB (UTC+7)
    endTime: "20261212T140000Z",   // 21:00 WIB (UTC+7)
  });

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-[#faf8f5] to-[#f3efe9]">
      <div className="max-w-2xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12 gold-border pb-4">
          <span className="text-[10px] uppercase tracking-[0.4em] text-accent block mb-2">Informasi Acara</span>
          <h3 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
            Waktu & Tempat
          </h3>
        </div>

        {/* Single Consolidated Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/80 backdrop-blur-md rounded-3xl border border-white p-8 md:p-12 shadow-lg relative overflow-hidden text-center"
        >
          {/* Top gold line decorator */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary/60 to-transparent" />

          {/* Date & Venue Header */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center gap-2 text-primary font-medium text-xs md:text-sm tracking-wider uppercase mb-2">
              <Calendar className="w-4 h-4" />
              <span>Sabtu, 12 Desember 2026</span>
            </div>
            <h4 className="font-serif text-2xl md:text-3xl font-semibold text-foreground tracking-wide mt-1">
              The Samasta Jatiwarna
            </h4>
          </div>

          {/* Akad & Resepsi Two-Column Section with Divider */}
          <div className="bg-secondary/40 rounded-2xl p-6 md:p-8 border border-white/60 mb-8">
            <div className="grid grid-cols-2 divide-x divide-[#e2d9cd]">
              {/* Akad Column */}
              <div className="px-3 md:px-6 text-center">
                <h5 className="font-serif text-lg md:text-xl font-semibold text-accent mb-2">
                  Akad
                </h5>
                <p className="text-xs md:text-sm font-medium text-foreground/80 tracking-wide">
                  15.00 – 16.30 WIB
                </p>
              </div>

              {/* Resepsi Column */}
              <div className="px-3 md:px-6 text-center">
                <h5 className="font-serif text-lg md:text-xl font-semibold text-accent mb-2">
                  Resepsi
                </h5>
                <p className="text-xs md:text-sm font-medium text-foreground/80 tracking-wide">
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
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-xs font-semibold hover:bg-primary/10 transition-all cursor-pointer shadow-xs"
            >
              <Map className="w-4 h-4 text-primary" />
              Google Maps
            </Button>
            <Button
              onClick={() => window.open(calendarUrl, "_blank")}
              variant="primary"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-xs font-semibold shadow-[0_4px_12px_rgba(197,168,128,0.25)] hover:shadow-[0_4px_18px_rgba(197,168,128,0.35)] transition-all cursor-pointer"
            >
              <CalendarPlus className="w-4 h-4" />
              Save to your calendar
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
