"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rsvpSchema, RSVPFormValues } from "@/lib/validation";
import { submitRSVP } from "@/services/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";

interface RSVPProps {
  onSuccessSubmit: () => void;
}

export function RSVP({ onSuccessSubmit }: RSVPProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RSVPFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      name: "",
      status: "Hadir",
      guests: 1,
      wish: "",
    },
  });

  const selectedStatus = useWatch({ control, name: "status" });

  // Sanitize input to escape HTML tags for safety
  const sanitize = (text: string) => {
    return text.replace(/[&<>"']/g, (m) => {
      const map: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      };
      return map[m];
    });
  };

  const onSubmit = async (values: RSVPFormValues) => {
    setIsSubmitting(true);
    setErrorMsg("");
    
    // Sanitize fields before sending
    const sanitizedData = {
      name: sanitize(values.name.trim()),
      status: values.status,
      guests: Number(values.guests),
      wish: values.wish ? sanitize(values.wish.trim()) : "",
    };

    try {
      const result = await submitRSVP(sanitizedData);
      if (result.success) {
        setIsSuccess(true);
        reset();
        onSuccessSubmit(); // Trigger wishes reload
      } else {
        setErrorMsg(result.message || "Gagal mengirim konfirmasi.");
      }
    } catch {
      setErrorMsg("Terjadi kesalahan jaringan.");
    } finally {
      setIsSubmitting(false);
    }
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
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#4A542C] font-semibold block mb-2">Konfirmasi Kehadiran</span>
          <h3 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A]">
            Buku Tamu &amp; RSVP
          </h3>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#8B9B62] to-transparent mx-auto mt-3" />
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="bg-[#DCE3C2]/90 backdrop-blur-md rounded-3xl border border-[#CAD4AA]/60 p-8 md:p-10 shadow-xl relative overflow-hidden text-center"
        >
          {/* Top green line decorator */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#8B9B62] to-transparent" />

          {isSuccess ? (
            <div className="py-10 flex flex-col items-center justify-center">
              <CheckCircle2 className="w-16 h-16 text-[#3B4420] mb-4 animate-bounce" />
              <h4 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-2">Terima Kasih!</h4>
              <p className="text-xs text-[#4A542C] max-w-xs leading-relaxed font-sans">
                Konfirmasi kehadiran dan ucapan doa Anda telah tersimpan di daftar tamu kami.
              </p>
              <Button
                variant="outline"
                className="mt-6 font-sans text-xs tracking-wider border-[#CAD4AA] text-[#2D3319] hover:bg-[#EEF2DF]"
                onClick={() => setIsSuccess(false)}
              >
                Kirim Pembaharuan RSVP
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <Input
                label="Nama Lengkap"
                placeholder="Masukkan nama lengkap Anda"
                error={errors.name?.message}
                {...register("name")}
              />

              {/* Status Kehadiran */}
              <div className="text-left">
                <label className="block text-xs font-semibold text-[#2D3319] uppercase tracking-wider mb-2 pl-1 font-sans">
                  Status Kehadiran
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setValue("status", "Hadir")}
                    className={`py-3 px-4 rounded-xl border text-xs tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
                      selectedStatus === "Hadir"
                        ? "bg-[#3B4420] border-[#3B4420] text-white shadow-sm"
                        : "bg-[#EEF2DF]/85 border-[#CAD4AA]/70 text-[#2D3319] hover:bg-[#EEF2DF]"
                    }`}
                  >
                    HADIR
                  </button>
                  <button
                    type="button"
                    onClick={() => setValue("status", "Tidak Hadir")}
                    className={`py-3 px-4 rounded-xl border text-xs tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
                      selectedStatus === "Tidak Hadir"
                        ? "bg-[#3B4420] border-[#3B4420] text-white shadow-sm"
                        : "bg-[#EEF2DF]/85 border-[#CAD4AA]/70 text-[#2D3319] hover:bg-[#EEF2DF]"
                    }`}
                  >
                    TIDAK HADIR
                  </button>
                </div>
              </div>

              {/* Jumlah Tamu (Only show if Status is Hadir) */}
              {selectedStatus === "Hadir" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <Input
                    label="Jumlah Tamu (Orang)"
                    type="number"
                    min={1}
                    max={10}
                    error={errors.guests?.message}
                    {...register("guests", { valueAsNumber: true })}
                  />
                </motion.div>
              )}

              {/* Ucapan */}
              <Textarea
                label="Ucapan Doa & Harapan"
                placeholder="Berikan doa restu Anda kepada kedua mempelai..."
                info="Maksimal 500 karakter"
                error={errors.wish?.message}
                {...register("wish")}
              />

              {/* Error messages */}
              {errorMsg && (
                <p className="text-xs text-red-600 text-left bg-red-50 p-3 rounded-lg border border-red-200 pl-4 pr-4">
                  {errorMsg}
                </p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 mt-2 flex items-center justify-center gap-2 bg-[#3B4420] hover:bg-[#2D3319] text-white shadow-[0_4px_20px_rgba(59,68,32,0.25)] hover:brightness-105 transition-all font-semibold tracking-widest cursor-pointer rounded-full"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    KIRIM RSVP
                  </>
                )}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
