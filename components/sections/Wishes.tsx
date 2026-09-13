"use client";

import { useEffect, useState, useCallback } from "react";
import { WishItem } from "@/types";
import { getWishes } from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Heart, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface WishesProps {
  refreshTrigger: number;
}

export function Wishes({ refreshTrigger }: WishesProps) {
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);

  const fetchWishesList = useCallback(async () => {
    await Promise.resolve(); // Yield to microtask queue to prevent synchronous setState
    setLoading(true);
    const data = await getWishes();
    
    // Sort wishes by timestamp descending (newest first)
    const sortedWishes = [...data].sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    setWishes(sortedWishes);
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchWishesList();
  }, [fetchWishesList, refreshTrigger]);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <section className="py-24 px-4 bg-[#FAF7F2]/60">
      <div className="max-w-xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 relative pb-2"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#4A542C] font-semibold block mb-2">Doa Restu Tamu Undangan</span>
          <h3 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A]">
            Kiriman Ucapan
          </h3>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#8B9B62] to-transparent mx-auto mt-3" />
          
          <button
            onClick={fetchWishesList}
            disabled={loading}
            className="absolute top-1/2 -translate-y-1/2 right-0 p-2 text-[#4A542C] hover:text-[#2D3319] disabled:opacity-50 transition-all cursor-pointer"
            title="Refresh ucapan"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </motion.div>

        {/* Wishes List */}
        <div className="space-y-4 min-h-[200px] relative">
          {loading && wishes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-8 h-8 rounded-full border-2 border-[#CAD4AA]/40 border-t-[#3B4420] animate-spin mb-3" />
              <p className="text-xs text-[#4A542C] font-sans">Memuat ucapan doa syahdu...</p>
            </div>
          ) : wishes.length === 0 ? (
            <div className="text-center py-12 bg-[#DCE3C2]/50 border border-dashed border-[#CAD4AA]/70 rounded-2xl">
              <MessageSquare className="w-8 h-8 text-[#4A542C]/50 mx-auto mb-2" />
              <p className="text-xs text-[#4A542C] italic font-sans">Belum ada ucapan. Silakan isi form RSVP di atas.</p>
            </div>
          ) : (
            <>
              <AnimatePresence mode="popLayout">
                {wishes.slice(0, visibleCount).map((wish, index) => (
                  <motion.div
                    key={wish.timestamp + index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                    className="bg-[#DCE3C2]/90 backdrop-blur-xs p-5 rounded-2xl border border-[#CAD4AA]/60 shadow-[0_4px_20px_rgba(59,68,32,0.06)] relative overflow-hidden"
                  >
                    {/* Corner badge status */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-[#EEF2DF]/90 text-[#2D3319] border border-[#CAD4AA]/70">
                      <Heart className="w-2.5 h-2.5 fill-[#4A542C] text-[#4A542C]" />
                      {wish.status === "Hadir" ? `${wish.guests} Tamu` : "Hadir Virtual"}
                    </div>

                    <h5 className="font-serif text-base font-semibold text-[#1A1A1A] pr-20">
                      {wish.name}
                    </h5>
                    
                    <p className="text-[10px] text-[#4A542C]/80 mt-0.5 font-sans">
                      {new Date(wish.timestamp).toLocaleString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>

                    <p className="text-xs font-sans text-[#2D3319] mt-3 leading-relaxed border-t border-dashed border-[#CAD4AA]/60 pt-2.5">
                      {wish.wish ? wish.wish : "Mengirimkan doa restu terbaik untuk kedua mempelai."}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Load More Button */}
              {visibleCount < wishes.length && (
                <div className="text-center pt-4">
                  <Button
                    onClick={loadMore}
                    variant="outline"
                    className="text-[11px] font-sans tracking-widest px-6 border-[#CAD4AA] text-[#2D3319] hover:bg-[#EEF2DF] bg-[#EEF2DF]/60"
                  >
                    Tampilkan Lebih Banyak
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
