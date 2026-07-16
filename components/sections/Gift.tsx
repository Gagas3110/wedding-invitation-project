"use client";

import { useState } from "react";
import { Copy, Check, GiftIcon, QrCode } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export function Gift() {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const accounts = [
    {
      bank: "Bank BCA",
      number: "8091234567",
      holder: "Gagas Wijaksana Nugraha",
    },
    {
      bank: "Bank Mandiri",
      number: "1230009876543",
      holder: "Gagas Wijaksana Nugraha",
    },
  ];

  const handleCopy = (number: string) => {
    navigator.clipboard.writeText(number);
    setCopiedAccount(number);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-[#faf8f5] to-[#f3efe9]">
      <div className="max-w-xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12 gold-border pb-4">
          <span className="text-[10px] uppercase tracking-[0.4em] text-accent block mb-2">Kado Digital</span>
          <h3 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
            Tanda Kasih
          </h3>
        </div>

        {/* Caption */}
        <p className="text-center text-xs text-muted leading-relaxed max-w-sm mx-auto mb-10">
          Kehadiran dan doa restu Anda adalah kado terindah bagi kami. Namun apabila Anda ingin mengirimkan tanda kasih, Anda dapat menyalurkannya melalui rekening/QRIS berikut:
        </p>

        {/* Gift Options Grid */}
        <div className="space-y-6 pl-2 pr-2">
          {/* Account Lists */}
          {accounts.map((acc, i) => (
            <motion.div
              key={acc.number}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white/70 backdrop-blur-md rounded-2xl border border-white p-6 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left"
            >
              <div className="flex items-center gap-3.5 flex-col sm:flex-row">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <GiftIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#a89985] block mb-0.5">
                    {acc.bank}
                  </span>
                  <p className="text-sm font-semibold text-[#302a24] font-mono tracking-wide">{acc.number}</p>
                  <p className="text-xs text-muted mt-0.5">{acc.holder}</p>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full sm:w-auto px-4 py-2 border-primary/20 hover:bg-primary/5 flex items-center justify-center gap-1.5"
                onClick={() => handleCopy(acc.number)}
              >
                {copiedAccount === acc.number ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[10px] text-emerald-700 tracking-wider">SALIN BERHASIL</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-accent" />
                    <span className="text-[10px] tracking-wider">SALIN REKENING</span>
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
            className="bg-white/70 backdrop-blur-md rounded-2xl border border-white p-6 shadow-sm text-center flex flex-col items-center"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
              <QrCode className="w-5 h-5" />
            </div>

            <span className="text-[10px] uppercase font-bold tracking-widest text-[#a89985] block mb-1">
              QRIS Pembayaran
            </span>
            <p className="text-xs text-muted mb-4">Scan QRIS atas nama Gagas Wijaksana Nugraha</p>

            {/* Simulated QR Code Wrapper */}
            <div className="relative w-40 h-40 bg-white border border-border rounded-lg p-2 flex items-center justify-center shadow-inner">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=300')] bg-cover bg-center opacity-10 filter grayscale contrast-200 pointer-events-none" />
              {/* Inside QR Layout */}
              <div className="w-full h-full border-2 border-primary/10 p-1 flex flex-col items-center justify-center relative">
                <span className="text-[8px] font-sans text-muted tracking-widest font-semibold uppercase">WEDDING QRIS</span>
                <div className="w-24 h-24 border-4 border-accent/40 rounded flex items-center justify-center mt-1">
                  <div className="grid grid-cols-3 gap-1">
                    <div className="w-5 h-5 bg-accent" />
                    <div className="w-5 h-5 bg-accent/20" />
                    <div className="w-5 h-5 bg-accent" />
                    <div className="w-5 h-5 bg-accent/10" />
                    <div className="w-5 h-5 bg-accent" />
                    <div className="w-5 h-5 bg-accent/30" />
                    <div className="w-5 h-5 bg-accent" />
                    <div className="w-5 h-5 bg-accent" />
                    <div className="w-5 h-5 bg-accent/10" />
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
