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
      className="relative overflow-hidden bg-white lg:min-h-[calc(100svh-var(--nav-height))]"
    >
      <HeroContourBg />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-5 pb-20 pt-[calc(var(--nav-height)+2.5rem)] sm:px-8 lg:flex-row lg:items-center lg:gap-6 lg:px-12 lg:pb-24 lg:pt-[calc(var(--nav-height)+3rem)]">
        <div className="z-10 flex flex-1 flex-col justify-center lg:max-w-[34rem] lg:pr-6">
          <motion.p
            className="text-xs font-bold uppercase tracking-[0.22em] text-fresh"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur(0.5), delay: dur(0.1), ease }}
          >
            {brand.tagline}
          </motion.p>

          <motion.div
            className="mt-4 flex gap-2"
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
            className="mt-5 font-display text-[clamp(2.25rem,6.5vw,3.75rem)] uppercase leading-[1.02] text-charcoal sm:text-[2.75rem] lg:text-[3.25rem]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur(0.75), delay: dur(0.15), ease }}
          >
            Delicious Foods With Wonderful{" "}
            <span className="text-fresh">Sorted.</span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-md text-base leading-relaxed text-charcoal/65 sm:text-[1.05rem]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur(0.5), delay: dur(0.35), ease }}
          >
            {brand.description}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur(0.5), delay: dur(0.5), ease }}
          >
            <Button
              size="lg"
              variant="secondary"
              className="rounded-full px-9"
              onClick={() => scrollToSection("menu")}
            >
              Menu
            </Button>
            <Button
              size="lg"
              className="rounded-full px-9"
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
          className="relative flex flex-1 items-center justify-center lg:min-h-[520px]"
          initial={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: dur(0.85), delay: dur(0.2), ease }}
        >
          <HeroLeafSketch />

          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(88vw,480px)] w-[min(88vw,480px)] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent-yellow/90 sm:h-[440px] sm:w-[440px] lg:h-[500px] lg:w-[500px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(102vw,560px)] w-[min(102vw,560px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-yellow/35 sm:h-[520px] sm:w-[520px] lg:h-[580px] lg:w-[580px]"
            aria-hidden
          />

          <motion.div
            className="relative z-10 w-full max-w-md sm:max-w-lg lg:max-w-none"
            whileHover={reduced ? undefined : { y: -5 }}
            transition={{ duration: 0.4, ease }}
          >
            <PlateVisual
              src={images.hero.assortedJollof}
              alt="Assorted jollof rice with chicken, plantain and accompaniments"
              priority
              sizes="(max-width: 1024px) 90vw, 560px"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
