"use client";

import { useState } from "react";
import { Copy, Check, GiftIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { PaperCard } from "@/components/ui/PaperCard";

export function Gift() {
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
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#4A542C] font-semibold block mb-1">
                Kado Digital
              </span>
              <h3 className="font-serif italic text-3xl sm:text-4xl text-[#1A1A1A] font-semibold">
                Tanda Kasih
              </h3>
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#8B9B62] to-transparent mx-auto mt-3" />
            </div>

            {/* Caption */}
            <p className="text-xs sm:text-[13px] text-[#4A542C] leading-relaxed max-w-sm mx-auto mb-6 font-sans">
              Kehadiran dan doa restu Anda adalah kado terindah bagi kami. Namun apabila Anda ingin
              mengirimkan tanda kasih, Anda dapat menyalurkannya melalui rekening berikut:
            </p>

            {/* Gift Options */}
            <div className="space-y-4">
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
            </div>
          </PaperCard>
        </motion.div>
      </div>
    </section>
  );
}
