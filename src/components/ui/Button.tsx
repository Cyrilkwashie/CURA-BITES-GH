import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-sans font-semibold tracking-wide transition-all duration-200 ease-premium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fresh disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      primary:
        "bg-accent-yellow text-forest-deep hover:brightness-105 active:scale-[0.98] shadow-sm",
      secondary:
        "bg-forest-deep text-white hover:bg-fresh active:scale-[0.98]",
      ghost: "bg-transparent text-forest-deep hover:bg-forest-deep/5",
      outline:
        "border-2 border-white/80 text-white hover:bg-white/10 active:scale-[0.98]",
    };

    const sizes = {
      sm: "min-h-[44px] px-4 text-xs uppercase",
      md: "min-h-[48px] px-6 text-sm uppercase",
      lg: "min-h-[52px] px-8 text-sm uppercase",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
