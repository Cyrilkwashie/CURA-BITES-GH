import { cn } from "@/lib/cn";

const dots = [
  { x: 8, y: 18 },
  { x: 14, y: 22 },
  { x: 11, y: 28 },
  { x: 92, y: 12 },
  { x: 88, y: 20 },
  { x: 95, y: 16 },
  { x: 6, y: 72 },
  { x: 10, y: 78 },
  { x: 94, y: 68 },
  { x: 90, y: 74 },
];

type DecorDotsProps = {
  variant?: "light" | "cream" | "dark";
  className?: string;
};

const tone = {
  light: "bg-white/25",
  cream: "bg-forest-deep/10",
  dark: "bg-white/20",
};

export function DecorDots({ variant = "cream", className }: DecorDotsProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {dots.map((d, i) => (
        <span
          key={i}
          className={cn("absolute h-1.5 w-1.5 rounded-full", tone[variant])}
          style={{ left: `${d.x}%`, top: `${d.y}%` }}
        />
      ))}
    </div>
  );
}
