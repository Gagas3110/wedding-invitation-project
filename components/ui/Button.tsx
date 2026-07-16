import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
}

export function Button({
  className,
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-sans tracking-wide uppercase transition-all duration-300 font-medium px-6 py-2.5 rounded-full text-xs cursor-pointer border focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 active:scale-97 disabled:opacity-50 disabled:pointer-events-none",
        {
          "bg-primary border-primary text-primary-foreground hover:bg-primary-hover hover:border-primary-hover shadow-md hover:shadow-lg":
            variant === "primary",
          "bg-secondary border-border text-foreground hover:bg-border":
            variant === "secondary",
          "bg-transparent border-primary/40 text-accent hover:border-primary hover:bg-primary/5":
            variant === "outline",
          "bg-transparent border-transparent text-muted hover:text-foreground":
            variant === "ghost",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
