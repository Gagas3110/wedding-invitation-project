import * as z from "zod";

export const rsvpSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nama tamu wajib diisi." })
    .max(100, { message: "Nama terlalu panjang (maksimal 100 karakter)." }),
  status: z.enum(["Hadir", "Tidak Hadir"], {
    message: "Pilih status kehadiran.",
  }),
  guests: z
    .number({ message: "Jumlah tamu wajib diisi dengan angka." })
    .min(1, { message: "Jumlah tamu minimal 1 orang." })
    .max(10, { message: "Jumlah tamu maksimal 10 orang per undangan." }),
  wish: z
    .string()
    .max(500, { message: "Ucapan tidak boleh lebih dari 500 karakter." })
    .optional()
    .or(z.literal("")),
});

export type RSVPFormValues = z.infer<typeof rsvpSchema>;
