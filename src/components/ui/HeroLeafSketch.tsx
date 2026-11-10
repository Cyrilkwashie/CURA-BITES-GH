/** Line-art foliage behind the hero plate */
export function HeroLeafSketch() {
  return (
    <svg
      className="pointer-events-none absolute left-1/2 top-1/2 h-[min(100vw,620px)] w-[min(100vw,620px)] -translate-x-1/2 -translate-y-[45%] text-charcoal/[0.12] sm:h-[540px] sm:w-[540px] lg:h-[640px] lg:w-[640px]"
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden
    >
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        d="M200 60 C 120 120, 80 200, 100 280 C 140 220, 180 180, 200 140"
      />
      <path
        stroke="currentColor"
        strokeWidth="1.2"
        d="M220 80 C 300 140, 340 220, 310 300 C 270 240, 240 200, 220 160"
      />
      <path
        stroke="currentColor"
        strokeWidth="1"
        d="M160 320 C 200 280, 260 260, 320 290"
      />
      <ellipse cx="200" cy="200" rx="120" ry="80" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 6" />
    </svg>
  );
}
