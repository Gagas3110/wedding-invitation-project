"use client";

import { useState } from "react";
import { Copy, Check, GiftIcon, CreditCard, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { PaperCard } from "@/components/ui/PaperCard";

export function Gift() {
  const [showAccount, setShowAccount] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const accounts = [
    {
      bank: "Bank Jago",
      number: "106456844446",
      holder: "Akila Syifa Salsabila",
    },
  ];

  const handleCopy = (number: string) => {
    navigator.clipboard.writeText(number);
    setCopiedAccount(number);
    setTimeout(() => setCopiedAccount(null), 2500);
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
            <div className="mb-6">
              <h3 className="font-serif italic text-3xl sm:text-4xl text-[#1A1A1A] font-semibold">
              Dengan Kasih dan Rasa Syukur
              </h3>
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#8B9B62] to-transparent mx-auto mt-3" />
            </div>

            {/* Caption */}
            <p className="text-xs sm:text-[13px] text-[#4A542C] leading-relaxed max-w-sm mx-auto mb-6 font-sans">
              Bagi kami, kehadiran dan doa Bapak/Ibu/Saudara/i sudah menjadi hadiah yang begitu berarti. Jika berkenan memberikan tanda kasih, informasi rekening dapat dilihat dibawah.
            </p>

            {/* Toggle Button */}
            <div className="flex justify-center">
              <Button
                onClick={() => setShowAccount((prev) => !prev)}
                className="py-3 px-6 bg-[#3B4420] hover:bg-[#2D3319] text-white rounded-full font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_16px_rgba(59,68,32,0.2)] hover:scale-102 active:scale-98 transition-all"
              >
                <CreditCard className="w-4 h-4" />
                <span>{showAccount ? "Tutup Nomor Rekening" : "Lihat Nomor Rekening"}</span>
                {showAccount ? (
                  <ChevronUp className="w-3.5 h-3.5 ml-0.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
                )}
              </Button>
            </div>

            {/* Gift Options (Collapsible) */}
            <AnimatePresence>
              {showAccount && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="overflow-hidden pt-5 space-y-4"
                >
                  {accounts.map((acc) => (
                    <div
                      key={acc.number}
                      className="bg-[#FFFDF8] rounded-2xl border border-[#CAD4AA]/50 p-5 shadow-xs flex flex-col gap-4 text-left"
                    >
                      {/* Account Information Row */}
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 bg-[#EEF2DF] border border-[#CAD4AA]/60 rounded-2xl flex items-center justify-center text-[#3B4420] shrink-0">
                          <GiftIcon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-[#4A542C] block mb-0.5 font-sans">
                            {acc.bank}
                          </span>
                          <p className="text-base sm:text-lg font-bold text-[#1A1A1A] font-mono tracking-wider truncate">
                            {acc.number}
                          </p>
                          <p className="text-xs text-[#4A542C] mt-0.5 font-sans truncate">{acc.holder}</p>
                        </div>
                      </div>

                      {/* Copy Account Button (Full Width to prevent overlap) */}
                      <Button
                        variant="outline"
                        className="w-full py-2.5 px-4 border-[#CAD4AA] hover:bg-[#EEF2DF] text-[#2D3319] bg-[#EEF2DF]/50 flex items-center justify-center gap-2 rounded-full cursor-pointer transition-all shadow-xs"
                        onClick={() => handleCopy(acc.number)}
                      >
                        {copiedAccount === acc.number ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#3B4420]" />
                            <span className="text-[11px] text-[#3B4420] tracking-wider font-semibold">
                              SALIN BERHASIL
                            </span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#3B4420]" />
                            <span className="text-[11px] tracking-wider font-semibold text-[#2D3319]">
                              SALIN REKENING
                            </span>
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </PaperCard>
        </motion.div>
      </div>
    </section>
  );
}
