"use client";

import { useApp } from "@/app/context/AppContext";
import { Music, Music4 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function MusicToggleButton() {
  const { isOpened, isPlaying, togglePlay } = useApp();

  if (!isOpened) return null;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-white/80 border border-primary/20 backdrop-blur-md text-accent rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all cursor-pointer outline-hidden hover:scale-105 active:scale-95 focus:ring-2 focus:ring-primary/40"
        onClick={togglePlay}
        title={isPlaying ? "Mute Music" : "Play Music"}
      >
        <div className={`relative flex items-center justify-center ${isPlaying ? "animate-spin-slow" : ""}`}>
          {isPlaying ? (
            <Music className="w-5 h-5 text-primary" />
          ) : (
            <Music4 className="w-5 h-5 text-muted opacity-60" />
          )}
        </div>
      </motion.button>
    </AnimatePresence>
  );
}
