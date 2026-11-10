import { motion, useReducedMotion } from "framer-motion";
import { brand } from "@/data/brand";
import { PlateVisual } from "@/components/ui/PlateVisual";
import { images } from "@/data/images";
import { Button } from "@/components/ui/Button";
import { HeroContourBg } from "@/components/ui/HeroContourBg";
import { HeroLeafSketch } from "@/components/ui/HeroLeafSketch";
import { scrollToSection } from "@/lib/scroll";

type HeroSectionProps = {
  onExploreMeal?: (meal: "breakfast" | "lunch") => void;
};

export function HeroSection({ onExploreMeal }: HeroSectionProps) {
  const reduced = useReducedMotion();

  const ease = [0.22, 1, 0.36, 1] as const;
  const dur = (ms: number) => (reduced ? 0 : ms);

  return (
    <section
      id="home"
      className="relative flex flex-col overflow-hidden bg-white max-lg:min-h-0 lg:min-h-[calc(100svh-var(--nav-height))]"
    >
      <div className="pointer-events-none absolute inset-0 hidden opacity-60 sm:block">
        <HeroContourBg />
      </div>

      <div className="relative mx-auto flex w-full max-w-[90rem] flex-1 flex-col justify-start gap-6 px-4 py-6 sm:justify-center sm:gap-10 sm:px-8 sm:py-10 lg:flex-row lg:items-center lg:gap-10 lg:px-12 lg:py-14 xl:gap-16 xl:px-16 2xl:gap-20 2xl:px-24 2xl:py-16">
        <div className="z-10 flex w-full flex-1 flex-col justify-center lg:max-w-none lg:pr-4 xl:pr-8 2xl:pr-12">
          <motion.p
            className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-fresh sm:text-xs sm:tracking-[0.22em] sm:text-sm xl:text-base xl:tracking-[0.28em]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur(0.5), delay: dur(0.1), ease }}
          >
            {brand.tagline}
          </motion.p>

          <motion.div
            className="mt-3 hidden gap-2 sm:mt-4 sm:flex sm:gap-2.5 xl:mt-5 xl:gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: dur(0.25), duration: dur(0.4) }}
            aria-hidden
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="inline-block h-2 w-2 rotate-45 bg-accent-yellow xl:h-3 xl:w-3"
              />
            ))}
          </motion.div>

          <motion.h1
            className="text-balance mt-3 font-display uppercase leading-[0.98] text-charcoal sm:mt-5 sm:max-w-4xl sm:text-[clamp(2.25rem,5.5vw,3.75rem)] lg:text-[clamp(2.85rem,4.2vw,4.5rem)] xl:mt-8 xl:max-w-5xl xl:text-[clamp(3.5rem,3.8vw,5.25rem)] 2xl:max-w-6xl 2xl:text-[5.75rem]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur(0.75), delay: dur(0.15), ease }}
          >
            <span className="text-[clamp(1.85rem,7.5vw,2.35rem)] sm:hidden">
              <span className="block">Good Food.</span>
              <span className="block">Busy Lives.</span>
              <span className="block text-fresh">Sorted.</span>
            </span>
            <span className="hidden sm:inline">
              Delicious Foods With Wonderful{" "}
              <span className="text-fresh">Sorted.</span>
            </span>
          </motion.h1>

          <motion.p
            className="mt-3 max-w-sm text-sm leading-snug text-charcoal/70 sm:mt-6 sm:max-w-xl sm:text-base sm:leading-relaxed sm:text-charcoal/65 md:text-[1.05rem] lg:mt-8 lg:max-w-2xl lg:text-lg xl:mt-10 xl:max-w-2xl xl:text-xl xl:leading-relaxed 2xl:max-w-3xl 2xl:text-[1.35rem]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur(0.5), delay: dur(0.35), ease }}
          >
            {brand.description}
          </motion.p>

          <motion.div
            className="mt-5 flex flex-row gap-2 sm:mt-9 sm:gap-3 sm:max-lg:flex-wrap xl:mt-12 xl:gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur(0.5), delay: dur(0.5), ease }}
          >
            <Button
              size="md"
              variant="secondary"
              className="min-h-[44px] flex-1 rounded-full px-5 text-xs sm:min-h-[52px] sm:flex-none sm:px-9 sm:text-sm xl:min-h-[3.5rem] xl:px-12 xl:text-base"
              onClick={() => scrollToSection("menu")}
            >
              Menu
            </Button>
            <Button
              size="md"
              className="min-h-[44px] flex-1 rounded-full px-5 text-xs sm:min-h-[52px] sm:flex-none sm:px-9 sm:text-sm xl:min-h-[3.5rem] xl:px-12 xl:text-base"
              onClick={() => {
                if (onExploreMeal) onExploreMeal("breakfast");
                else scrollToSection("menu");
              }}
            >
              Order Now
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="relative flex min-h-0 shrink-0 items-center justify-center py-1 sm:py-2 lg:min-h-[min(70vh,640px)] lg:flex-1 lg:py-0 xl:min-h-[min(75vh,720px)] 2xl:min-h-[min(78vh,800px)]"
          initial={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: dur(0.85), delay: dur(0.2), ease }}
        >
          <HeroLeafSketch className="hidden md:block" />

          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(68vw,240px)] w-[min(68vw,240px)] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent-yellow/90 sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px] xl:h-[560px] xl:w-[560px] 2xl:h-[640px] 2xl:w-[640px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden h-[min(102vw,560px)] w-[min(102vw,560px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-yellow/35 sm:block sm:h-[520px] sm:w-[520px] lg:h-[580px] lg:w-[580px] xl:h-[640px] xl:w-[640px] 2xl:h-[720px] 2xl:w-[720px]"
            aria-hidden
          />

          <motion.div
            className="relative z-10 w-full max-w-[268px] sm:max-w-lg lg:max-w-none"
            whileHover={reduced ? undefined : { y: -5 }}
            transition={{ duration: 0.4, ease }}
          >
            <PlateVisual
              src={images.hero.assortedJollof}
              alt="Assorted jollof rice with chicken, plantain and accompaniments"
              priority
              compactMobile
              sizes="(max-width: 640px) 268px, (max-width: 1024px) 90vw, (max-width: 1536px) 42vw, 820px"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
