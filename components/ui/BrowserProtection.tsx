"use client";

import { useEffect } from "react";

/**
 * Komponen proteksi browser untuk melindungi aset dan konten undangan.
 * Hanya aktif pada mode production (`process.env.NODE_ENV === "production"`),
 * sehingga pada saat development / lokal (`npm run dev`), Anda tetap bebas melakukan inspect element.
 */
export function BrowserProtection() {
  useEffect(() => {
    // Hanya aktif saat website berjalan di production
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    // 1. Matikan Klik Kanan (Context Menu)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Matikan Shortcut Developer Tools & View Source
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === "F12" || e.keyCode === 123) {
        e.preventDefault();
        return;
      }

      const isModifier = e.ctrlKey || e.metaKey;

      if (isModifier) {
        // Ctrl/Cmd + Shift + I / J / C (Windows/Linux/Mac)
        // Ctrl/Cmd + Option + I / J / C (Mac altKey)
        if (
          (e.shiftKey || e.altKey) &&
          ["I", "i", "J", "j", "C", "c"].includes(e.key)
        ) {
          e.preventDefault();
          return;
        }

        // Ctrl/Cmd + U (View Page Source)
        if (e.key === "u" || e.key === "U") {
          e.preventDefault();
          return;
        }

        // Ctrl/Cmd + S (Save Webpage)
        if (e.key === "s" || e.key === "S") {
          e.preventDefault();
          return;
        }
      }
    };

    // 3. Matikan Drag & Drop pada Gambar / Media
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.tagName === "IMG" || target?.tagName === "VIDEO") {
        e.preventDefault();
      }
    };

    // Pasang event listener dengan capture phase (true) agar terpicu paling awal
    document.addEventListener("contextmenu", handleContextMenu, true);
    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("dragstart", handleDragStart, true);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu, true);
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("dragstart", handleDragStart, true);
    };
  }, []);

  return null;
}
