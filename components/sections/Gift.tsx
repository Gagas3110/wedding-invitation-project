"use client";

import { useState } from "react";
import { Copy, Check, GiftIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

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
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#4A542C] font-semibold block mb-2">Kado Digital</span>
          <h3 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A]">
            Tanda Kasih
          </h3>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#8B9B62] to-transparent mx-auto mt-3" />
        </motion.div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-center text-xs text-[#4A542C] leading-relaxed max-w-sm mx-auto mb-10 font-sans"
        >
          Kehadiran dan doa restu Anda adalah kado terindah bagi kami. Namun apabila Anda ingin mengirimkan tanda kasih, Anda dapat menyalurkannya melalui rekening berikut:
        </motion.p>

        {/* Gift Options Grid */}
        <div className="space-y-6">
          {/* Account Lists */}
          {accounts.map((acc, i) => (
            <motion.div
              key={acc.number}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-[#DCE3C2]/90 backdrop-blur-md rounded-3xl border border-[#CAD4AA]/60 p-6 shadow-xl flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left"
            >
              <div className="flex items-center gap-4 flex-col sm:flex-row">
                <div className="w-12 h-12 bg-[#EEF2DF]/85 border border-[#CAD4AA]/70 rounded-2xl flex items-center justify-center text-[#3B4420]">
                  <GiftIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#4A542C] block mb-0.5 font-sans">
                    {acc.bank}
                  </span>
                  <p className="text-base font-semibold text-[#1A1A1A] font-mono tracking-wide">{acc.number}</p>
                  <p className="text-xs text-[#4A542C] mt-0.5 font-sans">{acc.holder}</p>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full sm:w-auto px-5 py-2.5 border-[#CAD4AA] hover:bg-[#EEF2DF] text-[#2D3319] bg-[#EEF2DF]/60 flex items-center justify-center gap-1.5 rounded-full"
                onClick={() => handleCopy(acc.number)}
              >
                {copiedAccount === acc.number ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#3B4420]" />
                    <span className="text-[10px] text-[#3B4420] tracking-wider font-semibold">SALIN BERHASIL</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#3B4420]" />
                    <span className="text-[10px] tracking-wider font-semibold text-[#2D3319]">SALIN REKENING</span>
                  </>
                )}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
