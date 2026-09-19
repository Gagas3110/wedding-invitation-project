/* eslint-disable @next/next/no-img-element */
"use client";

import { motion, AnimatePresence, type Variants, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Sparkles, Eye, RotateCcw } from "lucide-react";
import { PaperCard } from "@/components/ui/PaperCard";

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export function Gallery() {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "0px 0px -50px 0px" });

  useEffect(() => {
    if (isInView) {
      setHasTriggered(true);
    }
  }, [isInView]);

  // Reliable viewport check fallback on scroll and mount
  useEffect(() => {
    const checkVisibility = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
          setHasTriggered(true);
        }
      }
    };

    checkVisibility();
    window.addEventListener("scroll", checkVisibility, { passive: true });
    return () => window.removeEventListener("scroll", checkVisibility);
  }, []);

  // Engagement photos — 4 main strip photos matching user preference + remaining engagement photos
  const stripPhotos: GalleryImage[] = [
    {
      src: "/gallery/DSC03256.jpg",
      alt: "Akila & Gagas di Pintu",
      caption: "",
    },
    {
      src: "/gallery/DSC03248 (1).jpg",
      alt: "Akila & Gagas Siluet Jendela",
      caption: "",
    },
    {
      src: "/gallery/DSC03223 (1).jpg",
      alt: "Akila & Gagas Mengintip",
      caption: "",
    },
    {
      src: "/gallery/DSC03153.jpg",
      alt: "Akila & Gagas di Depan Pintu",
      caption: "",
    },
  ];

  // All photos available in full-color lightbox
  const allPhotos: GalleryImage[] = [
    ...stripPhotos,
    {
      src: "/gallery/DSC03172.jpg",
      alt: "Akila & Gagas di Tangga",
      caption: "",
    },
    {
      src: "/gallery/DSC03112 (1).jpg",
      alt: "Akila & Gagas Cincin Pernikahan",
      caption: "",
    },
  ];

  const openLightbox = (index: number) => {
    setActivePhoto(index);
    if (typeof document !== "undefined") {
      document.body.classList.add("overflow-hidden");
    }
  };

  const closeLightbox = () => {
    setActivePhoto(null);
    if (typeof document !== "undefined") {
      document.body.classList.remove("overflow-hidden");
    }
  };

  const nextPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activePhoto === null) return;
    setActivePhoto((activePhoto + 1) % allPhotos.length);
  };

  const prevPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activePhoto === null) return;
    setActivePhoto((activePhoto - 1 + allPhotos.length) % allPhotos.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhoto === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhoto]);

  // Framer motion variants for emerging out of the black slot hole
  const stripEmergeVariants: Variants = {
    hidden: {
      y: "-100%",
    },
    visible: {
      y: ["-100%", "-74%", "-49%", "-24%", "0%"],
      transition: {
        duration: 3.2,
        times: [0, 0.28, 0.54, 0.78, 1],
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="py-12 sm:py-16 px-2 relative z-10" id="gallery">
      <div className="w-full max-w-lg mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          <PaperCard variant="default" className="text-center pb-10">
            {/* Header / Title */}

            {/* Photobooth Dispenser & Filmstrip Assembly */}
            <div ref={containerRef} className="relative w-full max-w-[340px] sm:max-w-[380px] mx-auto pt-2">
              {/* 1. Golden Dispenser Slot Hardware (Back & Base Frame: Z-10) */}
              <div 
                className="relative z-10 mx-auto w-full max-w-[320px] sm:max-w-[350px] drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)] cursor-pointer active:scale-98 transition-transform"
                onClick={() => {
                  setHasTriggered(true);
                  setAnimKey((k) => k + 1);
                }}
                title="Ketuk slot untuk memutar ulang animasi foto"
              >
                {/* Outer metallic beveled frame */}
                <div className="rounded-2xl p-[6px] sm:p-[7px] bg-gradient-to-b from-[#ECD287] via-[#C39739] via-60% to-[#6B4B14] border border-[#FBE8A7] shadow-[inset_0_2px_3px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.5)]">
                  {/* Brushed brass inner trim */}
                  <div className="rounded-xl p-[3px] sm:p-[4px] bg-gradient-to-r from-[#CFA137] via-[#FFF5BD] via-45% via-[#C69A33] to-[#8C6415] shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-1px_3px_rgba(0,0,0,0.4)]">
                    {/* Dark dispenser slot cavity (Black Hole) */}
                    <div className="h-10 sm:h-11 rounded-lg bg-[#0A0A0A] shadow-[inset_0_6px_14px_rgba(0,0,0,0.98),0_1px_1px_rgba(255,255,255,0.3)] relative overflow-hidden flex items-center justify-center">
                      <div className="w-full h-full bg-gradient-to-b from-black via-zinc-950 to-neutral-900 opacity-95" />
                      {/* Deep top shadow inside the black hole */}
                      <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Paper Chute & Filmstrip (Z-20, anchors INSIDE black hole & emerges downwards) */}
              <div className="relative mx-auto w-[255px] sm:w-[285px] z-20 -mt-[34px] sm:-mt-[36px] overflow-hidden">
                <motion.div
                  key={animKey}
                  variants={stripEmergeVariants}
                  initial="hidden"
                  animate={hasTriggered || isInView || animKey > 0 ? "visible" : "hidden"}
                  className="w-full bg-[#FAF8F5] rounded-b-xl border-x border-b border-[#DDD5C5] shadow-[0_24px_48px_rgba(40,30,18,0.28),0_8px_16px_rgba(0,0,0,0.1)] p-3 sm:p-3.5 pb-5 text-left select-none relative"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, #F5F1E8 0%, #FFFFFF 3%, #FAF8F5 100%)",
                  }}
                >
                  {/* Realistic shadow cast by the black slot's upper hood onto the emerging paper */}
                  <div className="absolute top-0 inset-x-0 h-3.5 bg-gradient-to-b from-black/50 via-black/20 to-transparent pointer-events-none z-20" />

                  {/* Subtle filmstrip side edge gradients */}
                  <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-r from-black/8 to-transparent pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-l from-black/8 to-transparent pointer-events-none" />

                  {/* Photos List on the photobooth strip */}
                  <div className="flex flex-col gap-3 pt-1">
                    {stripPhotos.map((photo, i) => (
                      <div
                        key={i}
                        className="relative group cursor-pointer overflow-hidden rounded-sm bg-white p-1 border border-[#E5DFD3] shadow-xs hover:shadow-md transition-all duration-300"
                        onClick={() => openLightbox(i)}
                      >
                        {/* Black & White Photo */}
                        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xs bg-neutral-800">
                          <img
                            src={photo.src}
                            alt={photo.alt}
                            loading="lazy"
                            className="w-full h-full object-cover grayscale contrast-[1.12] brightness-[0.96] transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
                          />

                          {/* Hover Overlay: Color Peek / Badge */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-2">
                            <span className="inline-flex items-center gap-1 text-[10px] text-white font-sans font-medium bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/20">
                              <Eye className="w-3 h-3 text-[#E8D18D]" />
                              Lihat Warna
                            </span>
                            <span className="text-[9px] text-white/80 font-mono tracking-widest">
                              0{i + 1}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Vintage Photobooth Footer */}
                  <div className="mt-4 pt-3 border-t border-dashed border-[#DDD5C5] text-center">
                    <p className="font-serif tracking-[0.25em] text-[#332C23] text-xs sm:text-[13px] font-semibold uppercase">
                      Akila &amp; Gagas
                    </p>
                    <p className="text-[10px] text-[#7A8A50] tracking-widest font-mono mt-0.5">
                      12 • 12 • 2026
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Action Controls below Filmstrip */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setAnimKey((k) => k + 1)}
                  className="p-2 rounded-full border border-[#CAD4AA] bg-[#FAF8F5] text-[#4A542C] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
                  title="Putar Ulang Animasi Foto Keluar dari Slot"
                  aria-label="Putar Ulang Animasi Foto Keluar dari Slot"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </PaperCard>
        </motion.div>
      </div>

      {/* Lightbox Modal: Full Vivid Color Preview ("preview photo warna") */}
      <AnimatePresence>
        {activePhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-100 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 select-none"
            onClick={closeLightbox}
          >
            {/* Top Bar with Badge and Close button */}
            <div
              className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Badge: Full Color Preview */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-sans">
                <Sparkles className="w-3.5 h-3.5 text-[#E8D18D]" />
                <span>Versi Berwarna</span>
                <span className="text-white/60 mx-1">•</span>
                <span className="font-mono text-[11px] text-[#E8D18D]">
                  {activePhoto + 1} / {allPhotos.length}
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={closeLightbox}
                className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
                aria-label="Tutup preview"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Previous Button */}
            <button
              type="button"
              onClick={prevPhoto}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer z-20"
              aria-label="Foto sebelumnya"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={nextPhoto}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer z-20"
              aria-label="Foto selanjutnya"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Photo Container */}
            <div
              className="relative max-w-3xl max-h-[75vh] sm:max-h-[82vh] overflow-hidden rounded-2xl border border-white/15 shadow-2xl bg-black/40 flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={activePhoto}
                src={allPhotos[activePhoto].src}
                alt={allPhotos[activePhoto].alt}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full h-full object-contain max-h-[70vh] sm:max-h-[76vh]"
              />

              {/* Photo Caption */}
              {allPhotos[activePhoto].caption && (
                <div className="w-full py-2 px-4 bg-black/60 backdrop-blur-xs text-center border-t border-white/10">
                  <p className="text-xs sm:text-sm text-neutral-200 font-serif italic">
                    {allPhotos[activePhoto].caption}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Dots Indicator */}
            <div
              className="absolute bottom-4 flex items-center gap-1.5 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              {allPhotos.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setActivePhoto(dotIdx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    dotIdx === activePhoto
                      ? "w-6 bg-[#E8D18D]"
                      : "w-2 bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Pilih foto ${dotIdx + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
