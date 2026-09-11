/* eslint-disable @next/next/no-img-element */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
  aspect: string;
}

export function Gallery() {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  const photos: GalleryImage[] = [
    {
      src: "/gallery/DSC03112 (1).jpg",
      alt: "Momen Bahagia Gagas & Akila",
      aspect: "aspect-[3/4]",
    },
    {
      src: "/gallery/DSC03138 (1).jpg",
      alt: "Kemesraan Gagas & Akila",
      aspect: "aspect-[3/4]",
    },
    {
      src: "/gallery/DSC03153.jpg",
      alt: "Potret Bahagia",
      aspect: "aspect-square",
    },
    {
      src: "/gallery/DSC03172.jpg",
      alt: "Senyuman Hangat",
      aspect: "aspect-[3/4]",
    },
    {
      src: "/gallery/DSC03223 (1).jpg",
      alt: "Kenangan Manis",
      aspect: "aspect-[3/4]",
    },
    {
      src: "/gallery/DSC03248 (1).jpg",
      alt: "Menatap Masa Depan Bersama",
      aspect: "aspect-[3/4]",
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

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhoto === null) return;
    setActivePhoto((activePhoto + 1) % photos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhoto === null) return;
    setActivePhoto((activePhoto - 1 + photos.length) % photos.length);
  };

  return (
    <section className="py-24 px-4 bg-[#faf8f5]">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16 gold-border pb-4">
          <span className="text-[10px] uppercase tracking-[0.4em] text-accent block mb-2">Momen Bahagia Kami</span>
          <h3 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
            Galeri Pernikahan
          </h3>
        </div>

        {/* Gallery Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="break-inside-avoid relative overflow-hidden rounded-2xl group cursor-pointer border border-white hover:shadow-lg transition-shadow duration-300"
              onClick={() => openLightbox(i)}
            >
              {/* Unsplash hotlink with next/image or static styling */}
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-xs text-white/90 tracking-wide font-sans">{photo.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 select-none"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/60 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-20 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left navigation */}
            <button
              onClick={prevPhoto}
              className="absolute left-4 md:left-8 text-white/60 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-20 cursor-pointer"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Lightbox Image Container */}
            <motion.div
              key={activePhoto}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[85vh] z-10 p-2 pointer-events-none"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[activePhoto].src}
                alt={photos[activePhoto].alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl mx-auto"
              />
              <p className="text-center text-xs text-white/70 mt-3 tracking-wider font-sans uppercase">
                {photos[activePhoto].alt}
              </p>
            </motion.div>

            {/* Right navigation */}
            <button
              onClick={nextPhoto}
              className="absolute right-4 md:right-8 text-white/60 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-20 cursor-pointer"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Photo Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-widest font-sans">
              {activePhoto + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
