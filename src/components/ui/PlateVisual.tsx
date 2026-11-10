import Image from "next/image";
import { cn } from "@/lib/cn";

type PlateVisualProps = {
  src: string;
  alt: string;
  prominent?: boolean;
  /** Tighter mobile frame — use in hero on small screens */
  compactMobile?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export function PlateVisual({
  src,
  alt,
  prominent = true,
  compactMobile = false,
  priority = false,
  sizes = "(max-width: 768px) 90vw, 420px",
  className,
}: PlateVisualProps) {
  const frameClass = prominent
    ? compactMobile
      ? "h-[200px] w-[min(86vw,268px)] max-lg:h-[min(72vw,280px)] max-lg:w-[min(86vw,300px)] lg:h-[520px] lg:w-[640px] xl:h-[580px] xl:w-[720px] 2xl:h-[640px] 2xl:w-[820px]"
      : "h-[min(78vw,500px)] w-[min(94vw,720px)] sm:h-[460px] sm:w-[520px] lg:h-[520px] lg:w-[640px] xl:h-[580px] xl:w-[720px] 2xl:h-[640px] 2xl:w-[820px]"
    : "h-[240px] w-[280px] sm:h-[280px] sm:w-[320px]";

  return (
    <div
      className={cn("relative mx-auto flex items-center justify-center", frameClass, className)}
    >
      <div
        className={cn(
          "pointer-events-none absolute bottom-[4%] left-1/2 -translate-x-1/2 rounded-[100%] bg-black/25 blur-xl",
          prominent ? "h-5 w-[58%]" : "h-3 w-[48%] opacity-70",
        )}
        aria-hidden
      />
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        unoptimized={src.endsWith(".png")}
        sizes={sizes}
        className="object-contain drop-shadow-[0_40px_56px_rgba(22,76,50,0.32)]"
      />
    </div>
  );
}
