"use client";

import { motion, Variants } from "framer-motion";
import { Clock, MapPin, Calendar, Map } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Event() {
  const mapUrl = process.env.NEXT_PUBLIC_MAP_URL || "https://maps.google.com";

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-[#faf8f5] to-[#f3efe9]">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16 gold-border pb-4">
          <span className="text-[10px] uppercase tracking-[0.4em] text-accent block mb-2">Informasi Acara</span>
          <h3 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
            Waktu & Tempat
          </h3>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pl-2 pr-2">
          {/* Akad Nikah */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="bg-white/80 backdrop-blur-md rounded-3xl border border-white p-8 md:p-10 shadow-lg relative overflow-hidden flex flex-col justify-between"
          >
            {/* Top gold line decorator */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary/50 to-transparent" />

            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-primary block mb-1">Covenant</span>
              <h4 className="font-serif text-2xl font-semibold text-[#2d2722] mb-6">Akad Nikah</h4>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <Calendar className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted font-medium">Hari & Tanggal</p>
                    <p className="text-sm font-semibold text-[#3a332d]">Sabtu, 12 Desember 2026</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted font-medium">Waktu</p>
                    <p className="text-sm font-semibold text-[#3a332d]">09.00 - 10.30 WIB</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted font-medium">Lokasi</p>
                    <p className="text-sm font-semibold text-[#3a332d]">Masjid Al-Bina</p>
                    <p className="text-xs text-muted mt-1 leading-relaxed">
                      Jl. Pintu Satu Senayan, Gelora, Kec. Tanah Abang, Kota Jakarta Pusat
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={() => window.open(mapUrl, "_blank")}
              variant="outline"
              className="w-full flex items-center justify-center gap-2 mt-4 hover:bg-primary/10"
            >
              <Map className="w-4 h-4" />
              Petunjuk Lokasi Google Maps
            </Button>
          </motion.div>

          {/* Resepsi Pernikahan */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="bg-white/80 backdrop-blur-md rounded-3xl border border-white p-8 md:p-10 shadow-lg relative overflow-hidden flex flex-col justify-between"
          >
            {/* Top gold line decorator */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary/50 to-transparent" />

            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-primary block mb-1">Celebration</span>
              <h4 className="font-serif text-2xl font-semibold text-[#2d2722] mb-6">Resepsi Pernikahan</h4>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <Calendar className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted font-medium">Hari & Tanggal</p>
                    <p className="text-sm font-semibold text-[#3a332d]">Sabtu, 12 Desember 2026</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted font-medium">Waktu</p>
                    <p className="text-sm font-semibold text-[#3a332d]">11.00 - 13.00 WIB</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted font-medium">Lokasi</p>
                    <p className="text-sm font-semibold text-[#3a332d]">Hotel Mulia Senayan (Grand Ballroom)</p>
                    <p className="text-xs text-muted mt-1 leading-relaxed">
                      Jl. Asia Afrika, Gelora, Kec. Tanah Abang, Kota Jakarta Pusat
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={() => window.open(mapUrl, "_blank")}
              variant="outline"
              className="w-full flex items-center justify-center gap-2 mt-4 hover:bg-primary/10"
            >
              <Map className="w-4 h-4" />
              Petunjuk Lokasi Google Maps
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
