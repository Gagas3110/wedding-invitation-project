import React from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  info?: string;
  labelClassName?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, info, labelClassName, ...props }, ref) => {
    return (
      <div className="w-full text-left">
        {label && (
          <label className={cn("block text-xs font-semibold text-[#2D3319] uppercase tracking-wider mb-1.5 pl-1 font-sans", labelClassName)}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "w-full bg-[#EEF2DF]/85 border border-[#CAD4AA]/70 rounded-xl px-4 py-3 text-sm text-[#1A1A1A] transition-all duration-300 focus:outline-none focus:border-[#7A8A50] focus:ring-1 focus:ring-[#7A8A50] placeholder:text-[#4A542C]/50 min-h-[110px] resize-y font-sans",
            error && "border-red-400 focus:border-red-400 focus:ring-red-400/40",
            className
          )}
          {...props}
        />
        {info && !error && (
          <p className="mt-1 text-[11px] text-[#4A542C]/80 pl-1 font-sans">{info}</p>
        )}
        {error && (
          <p className="mt-1 text-[11px] text-red-600 pl-1 font-sans">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

