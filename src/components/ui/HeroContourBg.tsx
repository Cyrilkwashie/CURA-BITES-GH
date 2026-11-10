/** Soft topographic lines — inspired by light restaurant hero templates */
export function HeroContourBg() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-charcoal/[0.07]"
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        d="M-40 520 C 200 380, 420 620, 720 480 S 1180 340, 1520 520"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        d="M-20 600 C 280 440, 520 680, 840 520 S 1240 400, 1500 580"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
        d="M80 380 C 320 260, 560 420, 900 300 S 1300 180, 1480 320"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        d="M200 700 C 480 560, 700 760, 1000 620 S 1320 500, 1540 660"
      />
    </svg>
  );
}
