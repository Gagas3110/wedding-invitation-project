import React from "react";
import { Hourglass } from "lucide-react";

interface HourglassLoaderProps {
  className?: string;
  size?: number;
}

export function HourglassLoader({
  className = "w-7 h-7 text-[#3B4420]",
  size,
}: HourglassLoaderProps) {
  return (
    <div
      className="inline-flex items-center justify-center select-none"
      role="status"
      aria-label="Memuat data..."
    >
      <Hourglass
        size={size}
        className={`animate-hourglass origin-center ${className}`}
      />
    </div>
  );
}

