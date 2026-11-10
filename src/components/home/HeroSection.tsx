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
      className="relative flex min-h-0 flex-col overflow-hidden bg-white lg:min-h-[calc(100svh-var(--nav-height))]"
    >
      <div className="pointer-events-none absolute inset-0 max-lg:opacity-55 max-lg:sm:opacity-60 lg:opacity-100">
        <HeroContourBg />
      </div>

      <div className="relative mx-auto flex w-full max-w-[90rem] flex-1 flex-col justify-start gap-6 px-4 py-6 max-lg:sm:justify-center sm:px-8 sm:py-10 lg:flex-row lg:items-center lg:justify-center lg:gap-10 lg:px-12 lg:py-14 xl:gap-16 xl:px-16 2xl:gap-20 2xl:px-24 2xl:py-16">
        <div className="z-10 flex w-full flex-1 flex-col justify-center lg:max-w-xl lg:pr-4 xl:max-w-2xl xl:pr-8">
          <motion.p
            className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-fresh max-lg:sm:text-xs lg:text-xs lg:tracking-[0.24em]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur(0.5), delay: dur(0.1), ease }}
          >
            {brand.tagline}
          </motion.p>

          <motion.div
            className="mt-4 hidden gap-2 max-lg:sm:flex max-lg:sm:gap-2.5 lg:mt-5 lg:flex lg:gap-2.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: dur(0.25), duration: dur(0.4) }}
            aria-hidden
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="inline-block h-2 w-2 rotate-45 bg-accent-yellow"
              />
            ))}
          </motion.div>

          <motion.h1
            className="text-balance mt-4 font-display uppercase leading-[1.06] text-charcoal max-lg:sm:mt-5 lg:mt-6 lg:text-[clamp(2.35rem,3.1vw,3.25rem)] xl:text-[clamp(2.5rem,2.8vw,3.75rem)]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur(0.75), delay: dur(0.15), ease }}
          >
            <span className="text-[clamp(1.85rem,7.5vw,2.35rem)] lg:hidden">
              <span className="block">Good Food.</span>
              <span className="block">Busy Lives.</span>
              <span className="block text-fresh">Sorted.</span>
            </span>
            <span className="hidden lg:block">
              <span className="block">Delicious Foods With Wonderful</span>
              <span className="mt-1 block text-fresh">Sorted.</span>
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-sm text-sm leading-relaxed text-charcoal/70 max-lg:sm:mt-6 max-lg:sm:max-w-md max-lg:sm:text-base lg:mt-7 lg:max-w-md lg:text-base lg:leading-relaxed lg:text-charcoal/65"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur(0.5), delay: dur(0.35), ease }}
          >
            {brand.description}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-row gap-3 max-lg:sm:mt-9 lg:mt-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur(0.5), delay: dur(0.5), ease }}
          >
            <Button
              size="lg"
              variant="secondary"
              className="max-lg:min-h-[44px] max-lg:flex-1 max-lg:rounded-full max-lg:px-5 max-lg:text-xs lg:flex-none lg:rounded-full lg:px-9"
              onClick={() => scrollToSection("menu")}
            >
              Menu
            </Button>
            <Button
              size="lg"
              className="max-lg:min-h-[44px] max-lg:flex-1 max-lg:rounded-full max-lg:px-5 max-lg:text-xs lg:flex-none lg:rounded-full lg:px-9"
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
          className="relative flex min-h-0 shrink-0 items-center justify-center py-1 max-lg:sm:py-2 lg:min-h-[min(70vh,640px)] lg:flex-1 lg:py-0 xl:min-h-[min(75vh,720px)] 2xl:min-h-[min(78vh,800px)]"
          initial={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: dur(0.85), delay: dur(0.2), ease }}
        >
          <HeroLeafSketch className="max-lg:hidden" />

          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(68vw,240px)] w-[min(68vw,240px)] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent-yellow/90 lg:h-[500px] lg:w-[500px] xl:h-[560px] xl:w-[560px] 2xl:h-[640px] 2xl:w-[640px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-yellow/35 lg:block lg:h-[580px] lg:w-[580px] xl:h-[640px] xl:w-[640px] 2xl:h-[720px] 2xl:w-[720px]"
            aria-hidden
          />

          <motion.div
            className="relative z-10 w-full max-w-[268px] max-lg:sm:max-w-md lg:max-w-none"
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
