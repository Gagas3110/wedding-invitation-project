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
      alt: "",
      aspect: "aspect-[3/4]",
    },
    {
      src: "/gallery/DSC03138 (1).jpg",
      alt: "",
      aspect: "aspect-[3/4]",
    },
    {
      src: "/gallery/DSC03153.jpg",
      alt: "",
      aspect: "aspect-square",
    },
    {
      src: "/gallery/DSC03172.jpg",
      alt: "",
      aspect: "aspect-[3/4]",
    },
    {
      src: "/gallery/DSC03223 (1).jpg",
      alt: "",
      aspect: "aspect-[3/4]",
    },
    {
      src: "/gallery/DSC03248 (1).jpg",
      alt: "",
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
    <section className="py-24 px-4 bg-[#FAF7F2]/60">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 relative pb-2"
        >
          <h3 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A]">
             Momen Bahagia Kami
          </h3>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#8B9B62] to-transparent mx-auto mt-3" />
        </motion.div>

        {/* Gallery Grid with Arch styling */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="break-inside-avoid relative overflow-hidden rounded-t-[50px] rounded-b-2xl group cursor-pointer border-2 border-white bg-white/70 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              onClick={() => openLightbox(i)}
            >
              <img
                src={photo.src}
                alt={photo.alt || "Galeri Akila & Gagas"}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                <span className="text-xs text-white/95 tracking-widest font-sans uppercase font-medium bg-black/30 px-3 py-1 rounded-full backdrop-blur-xs">
                  Lihat Foto
                </span>
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
