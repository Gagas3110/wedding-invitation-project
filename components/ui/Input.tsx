import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full text-left">
        {label && (
          <label className="block text-xs font-medium text-accent uppercase tracking-wider mb-1.5 pl-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full bg-background/50 border border-border rounded-lg px-4 py-2.5 text-sm transition-all duration-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-muted/65",
            error && "border-red-400 focus:border-red-400 focus:ring-red-400/40",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-[11px] text-red-500 pl-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
