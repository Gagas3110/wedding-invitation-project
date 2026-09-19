"use client";

import React from "react";
import { motion } from "framer-motion";

interface PaperCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "lace-bottom" | "scallop-top" | "arch";
  waxSeal?: boolean;
  peony?: "left" | "right" | "none";
  botanicalBorders?: boolean;
  innerFrame?: boolean;
  id?: string;
}

export function PaperCard({
  children,
  className = "",
  variant = "default",
  waxSeal = false,
  peony = "none",
  botanicalBorders = false,
  innerFrame = true,
  id,
}: PaperCardProps) {
  return (
    <div id={id} className="relative w-full max-w-md mx-auto my-8 sm:my-10 px-3 sm:px-4">
      {/* 1. Wax Seal at Top Center (if requested) */}
      {waxSeal && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-30 pointer-events-none drop-shadow-[0_8px_16px_rgba(45,38,28,0.22)]">
          <img
            src="/gallery/wax-seal-stamp.png"
            alt="Wax Seal"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* 2. Blooming Peony Flower overlapping corner (like reference image) */}
      {peony === "left" && (
        <div className="absolute -top-12 -left-6 sm:-top-16 sm:-left-8 z-30 pointer-events-none drop-shadow-[0_10px_20px_rgba(45,38,28,0.18)]">
          <img
            src="/gallery/peony-corner.png"
            alt="Floral Ornament"
            className="w-28 sm:w-36 h-auto object-contain select-none"
          />
        </div>
      )}
      {peony === "right" && (
        <div className="absolute -top-12 -right-6 sm:-top-16 sm:-right-8 z-30 pointer-events-none drop-shadow-[0_10px_20px_rgba(45,38,28,0.18)] scale-x-[-1]">
          <img
            src="/gallery/peony-corner.png"
            alt="Floral Ornament"
            className="w-28 sm:w-36 h-auto object-contain select-none"
          />
        </div>
      )}

      {/* 3. The Paper Card Body */}
      <div
        className={`relative w-full bg-[#FAF7F2] text-[#26211C] shadow-[0_18px_38px_rgba(40,30,18,0.12),0_4px_12px_rgba(0,0,0,0.05)] border border-[#EBE3D5] ${
          variant === "lace-bottom"
            ? "rounded-t-3xl rounded-b-lg"
            : variant === "scallop-top"
            ? "rounded-t-[36px] rounded-b-3xl"
            : variant === "arch"
            ? "rounded-t-full rounded-b-3xl"
            : "rounded-3xl"
        } ${className}`}
        style={{
          backgroundImage:
            "radial-gradient(#e8dfd1 0.6px, transparent 0.6px), linear-gradient(180deg, #FFFDF9 0%, #FAF6EE 100%)",
          backgroundSize: "16px 16px, 100% 100%",
        }}
      >
        {/* Scallop Arch Decoration at the Top if variant === "scallop-top" */}
        {variant === "scallop-top" && (
          <div className="w-full overflow-hidden leading-none select-none -mt-px">
            <svg
              viewBox="0 0 400 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto text-[#FAF7F2]"
              preserveAspectRatio="none"
            >
              <path
                d="M0,24 C50,4 150,0 200,0 C250,0 350,4 400,24 L400,0 L0,0 Z"
                fill="transparent"
              />
              <path
                d="M 0,24 Q 200,-10 400,24"
                stroke="#CAD4AA"
                strokeWidth="1"
                fill="none"
                opacity="0.6"
              />
            </svg>
          </div>
        )}

        {/* Botanical Side Leaf Vines (delicate trailing side vines like the screenshot) */}
        {botanicalBorders && (
          <>
            {/* Left Vine */}
            <div className="absolute left-1.5 top-12 bottom-12 w-4 pointer-events-none opacity-45 overflow-hidden flex flex-col justify-around">
              <svg viewBox="0 0 20 200" fill="none" className="w-full h-full text-[#7A8A50]">
                <path
                  d="M10,0 Q18,30 10,60 Q2,90 10,120 Q18,150 10,180 T10,200"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <circle cx="15" cy="20" r="2.5" fill="currentColor" opacity="0.6" />
                <circle cx="5" cy="45" r="2.5" fill="currentColor" opacity="0.6" />
                <circle cx="16" cy="80" r="2.5" fill="currentColor" opacity="0.6" />
                <circle cx="4" cy="110" r="2.5" fill="currentColor" opacity="0.6" />
                <circle cx="15" cy="140" r="2.5" fill="currentColor" opacity="0.6" />
                <circle cx="5" cy="170" r="2.5" fill="currentColor" opacity="0.6" />
              </svg>
            </div>
            {/* Right Vine */}
            <div className="absolute right-1.5 top-12 bottom-12 w-4 pointer-events-none opacity-45 overflow-hidden flex flex-col justify-around scale-x-[-1]">
              <svg viewBox="0 0 20 200" fill="none" className="w-full h-full text-[#7A8A50]">
                <path
                  d="M10,0 Q18,30 10,60 Q2,90 10,120 Q18,150 10,180 T10,200"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <circle cx="15" cy="20" r="2.5" fill="currentColor" opacity="0.6" />
                <circle cx="5" cy="45" r="2.5" fill="currentColor" opacity="0.6" />
                <circle cx="16" cy="80" r="2.5" fill="currentColor" opacity="0.6" />
                <circle cx="4" cy="110" r="2.5" fill="currentColor" opacity="0.6" />
                <circle cx="15" cy="140" r="2.5" fill="currentColor" opacity="0.6" />
                <circle cx="5" cy="170" r="2.5" fill="currentColor" opacity="0.6" />
              </svg>
            </div>
          </>
        )}

        {/* Card Content with Inner Stationery Frame */}
        <div
          className={`p-6 sm:p-8 relative z-10 ${
            innerFrame
              ? "m-2 sm:m-3 rounded-2xl border border-[#CAD4AA]/45 bg-[#FFFDF8]/60 shadow-[inset_0_0_12px_rgba(202,212,170,0.12)]"
              : ""
          }`}
        >
          {children}
        </div>

        {/* 4. Lace Scalloped Bottom Edge if variant === "lace-bottom" */}
        {variant === "lace-bottom" && (
          <div className="relative w-full -mb-4 sm:-mb-5 pointer-events-none select-none">
            <svg
              viewBox="0 0 400 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto text-[#FAF7F2] drop-shadow-[0_8px_8px_rgba(40,30,18,0.1)]"
              preserveAspectRatio="none"
            >
              {/* Repeating Scallop Lace Trim */}
              <defs>
                <pattern id="lace-scallop-pattern" width="40" height="36" patternUnits="userSpaceOnUse">
                  {/* Scallop body */}
                  <path
                    d="M 0,0 L 40,0 L 40,14 C 36,26 24,32 20,32 C 16,32 4,26 0,14 Z"
                    fill="#FAF7F2"
                    stroke="#E6DEC9"
                    strokeWidth="0.8"
                  />
                  {/* Inner eyelet lace arc */}
                  <circle cx="20" cy="24" r="2.5" fill="#EFE8DA" stroke="#CAD4AA" strokeWidth="0.5" />
                  <circle cx="12" cy="18" r="1.8" fill="#EFE8DA" stroke="#CAD4AA" strokeWidth="0.5" />
                  <circle cx="28" cy="18" r="1.8" fill="#EFE8DA" stroke="#CAD4AA" strokeWidth="0.5" />
                  <circle cx="6" cy="10" r="1.4" fill="#EFE8DA" stroke="#CAD4AA" strokeWidth="0.5" />
                  <circle cx="34" cy="10" r="1.4" fill="#EFE8DA" stroke="#CAD4AA" strokeWidth="0.5" />
                  {/* Decorative dot row */}
                  <line x1="0" y1="4" x2="40" y2="4" stroke="#CAD4AA" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.7" />
                </pattern>
              </defs>
              <rect width="400" height="36" fill="url(#lace-scallop-pattern)" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
