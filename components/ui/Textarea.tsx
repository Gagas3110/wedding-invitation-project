import React from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  info?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, info, ...props }, ref) => {
    return (
      <div className="w-full text-left">
        {label && (
          <label className="block text-xs font-semibold text-[#785A34] uppercase tracking-wider mb-1.5 pl-1 font-sans">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "w-full bg-[#FAF7F2] border border-[#E8DECF] rounded-xl px-4 py-3 text-sm text-[#26211C] transition-all duration-300 focus:outline-none focus:border-[#B89358] focus:ring-1 focus:ring-[#B89358] placeholder:text-[#827568]/60 min-h-[110px] resize-y font-sans",
            error && "border-red-400 focus:border-red-400 focus:ring-red-400/40",
            className
          )}
          {...props}
        />
        {info && !error && (
          <p className="mt-1 text-[11px] text-[#827568] pl-1 font-sans">{info}</p>
        )}
        {error && (
          <p className="mt-1 text-[11px] text-red-500 pl-1 font-sans">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
