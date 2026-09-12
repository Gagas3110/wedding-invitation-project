"use client";

import { useState } from "react";
import { Copy, Check, GiftIcon, QrCode } from "lucide-react";
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
    <section className="py-24 px-4 bg-[#FAF7F2]">
      <div className="max-w-xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12 gold-border pb-4">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#B89358] font-semibold block mb-2">Kado Digital</span>
          <h3 className="font-serif text-3xl md:text-4xl font-semibold text-[#26211C]">
            Tanda Kasih
          </h3>
        </div>

        {/* Caption */}
        <p className="text-center text-xs text-[#786C5E] leading-relaxed max-w-sm mx-auto mb-10 font-sans">
          Kehadiran dan doa restu Anda adalah kado terindah bagi kami. Namun apabila Anda ingin mengirimkan tanda kasih, Anda dapat menyalurkannya melalui rekening/QRIS berikut:
        </p>

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
              className="bg-white/90 backdrop-blur-md rounded-3xl border border-[#E8DECF] p-6 shadow-[0_8px_30px_rgba(184,147,88,0.08)] flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left"
            >
              <div className="flex items-center gap-4 flex-col sm:flex-row">
                <div className="w-12 h-12 bg-[#FAF7F2] border border-[#E8DECF] rounded-2xl flex items-center justify-center text-[#B89358]">
                  <GiftIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#B89358] block mb-0.5 font-sans">
                    {acc.bank}
                  </span>
                  <p className="text-base font-semibold text-[#26211C] font-mono tracking-wide">{acc.number}</p>
                  <p className="text-xs text-[#786C5E] mt-0.5 font-sans">{acc.holder}</p>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full sm:w-auto px-5 py-2.5 border-[#B89358]/40 hover:bg-[#FAF7F2] text-[#785A34] flex items-center justify-center gap-1.5 rounded-full"
                onClick={() => handleCopy(acc.number)}
              >
                {copiedAccount === acc.number ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#B89358]" />
                    <span className="text-[10px] text-[#B89358] tracking-wider font-semibold">SALIN BERHASIL</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#B89358]" />
                    <span className="text-[10px] tracking-wider font-semibold">SALIN REKENING</span>
                  </>
                )}
              </Button>
            </motion.div>
          ))}

          {/* QRIS Option */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/90 backdrop-blur-md rounded-3xl border border-[#E8DECF] p-6 md:p-8 shadow-[0_8px_30px_rgba(184,147,88,0.08)] text-center flex flex-col items-center"
          >
            <div className="w-12 h-12 bg-[#FAF7F2] border border-[#E8DECF] rounded-2xl flex items-center justify-center text-[#B89358] mb-4">
              <QrCode className="w-5 h-5" />
            </div>

            <span className="text-[10px] uppercase font-bold tracking-widest text-[#B89358] block mb-1 font-sans">
              QRIS Pembayaran
            </span>
            <p className="text-xs text-[#786C5E] mb-5 font-sans">Scan QRIS atas nama Gagas Wijaksana Nugraha</p>

            {/* Simulated QR Code Wrapper */}
            <div className="relative w-44 h-44 bg-white border border-[#E8DECF] rounded-2xl p-3 flex items-center justify-center shadow-inner">
              <div className="w-full h-full border border-[#B89358]/20 rounded-xl p-2 flex flex-col items-center justify-center relative bg-[#FAF7F2]/40">
                <span className="text-[8px] font-sans text-[#827568] tracking-widest font-semibold uppercase">WEDDING QRIS</span>
                <div className="w-24 h-24 border-3 border-[#B89358]/40 rounded-lg flex items-center justify-center mt-1 bg-white p-1">
                  <div className="grid grid-cols-3 gap-1">
                    <div className="w-5 h-5 bg-[#785A34] rounded-xs" />
                    <div className="w-5 h-5 bg-[#785A34]/20 rounded-xs" />
                    <div className="w-5 h-5 bg-[#785A34] rounded-xs" />
                    <div className="w-5 h-5 bg-[#785A34]/10 rounded-xs" />
                    <div className="w-5 h-5 bg-[#785A34] rounded-xs" />
                    <div className="w-5 h-5 bg-[#785A34]/30 rounded-xs" />
                    <div className="w-5 h-5 bg-[#785A34] rounded-xs" />
                    <div className="w-5 h-5 bg-[#785A34] rounded-xs" />
                    <div className="w-5 h-5 bg-[#785A34]/10 rounded-xs" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
