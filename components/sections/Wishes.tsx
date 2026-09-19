"use client";

import { useEffect, useState, useCallback } from "react";
import { WishItem } from "@/types";
import { getWishes } from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Heart, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PaperCard } from "@/components/ui/PaperCard";

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
    <section className="py-12 sm:py-16 px-2 relative z-10">
      <div className="w-full max-w-lg mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          <PaperCard variant="default" className="text-center">
            {/* Title */}
            <div className="mb-8 relative">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#4A542C] font-semibold block mb-1">
                Doa Restu Tamu Undangan
              </span>
              <h3 className="font-serif italic text-3xl sm:text-4xl text-[#1A1A1A] font-semibold">
                Kiriman Ucapan
              </h3>
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#8B9B62] to-transparent mx-auto mt-3" />

              <button
                onClick={fetchWishesList}
                disabled={loading}
                className="absolute top-1 right-0 p-2 text-[#4A542C] hover:text-[#2D3319] disabled:opacity-50 transition-all cursor-pointer"
                title="Refresh ucapan"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              </button>
            </div>

            {/* Wishes List */}
            <div className="space-y-3.5 min-h-[160px] text-left">
              {loading && wishes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <div className="w-7 h-7 rounded-full border-2 border-[#CAD4AA]/40 border-t-[#3B4420] animate-spin mb-3" />
                  <p className="text-xs text-[#4A542C] font-sans">Memuat ucapan doa syahdu...</p>
                </div>
              ) : wishes.length === 0 ? (
                <div className="text-center py-10 bg-[#FAF7F2] border border-dashed border-[#CAD4AA]/70 rounded-2xl">
                  <MessageSquare className="w-7 h-7 text-[#4A542C]/50 mx-auto mb-2" />
                  <p className="text-xs text-[#4A542C] italic font-sans">
                    Belum ada ucapan. Silakan isi form RSVP di atas.
                  </p>
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
                        transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
                        className="bg-[#FFFDF8] p-4.5 rounded-2xl border border-[#CAD4AA]/50 shadow-xs relative overflow-hidden"
                      >
                        {/* Status Badge */}
                        <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-[#EEF2DF] text-[#2D3319] border border-[#CAD4AA]/60">
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

                        <p className="text-xs font-sans text-[#2D3319] mt-2.5 leading-relaxed border-t border-dashed border-[#CAD4AA]/50 pt-2">
                          {wish.wish ? wish.wish : "Mengirimkan doa restu terbaik untuk kedua mempelai."}
                        </p>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Load More Button */}
                  {visibleCount < wishes.length && (
                    <div className="text-center pt-3">
                      <Button
                        onClick={loadMore}
                        variant="outline"
                        className="text-[11px] font-sans tracking-widest px-6 border-[#CAD4AA] text-[#2D3319] hover:bg-[#EEF2DF] bg-[#EEF2DF]/50 cursor-pointer"
                      >
                        Tampilkan Lebih Banyak
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </PaperCard>
        </motion.div>
      </div>
    </section>
  );
}
