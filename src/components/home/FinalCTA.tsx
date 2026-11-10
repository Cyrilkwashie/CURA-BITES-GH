import { motion, useReducedMotion } from "framer-motion";
import { images } from "@/data/images";
import { PlateVisual } from "@/components/ui/PlateVisual";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

type FinalCTAProps = {
  onExplore: (meal: "breakfast" | "lunch") => void;
};

export function FinalCTA({ onExplore }: FinalCTAProps) {
  const reduced = useReducedMotion();

  return (
    <section id="order-cta" className="relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-forest-deep"
        initial={reduced ? false : { opacity: 0.9 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-forest-deep/95 to-fresh/80" />

      <div className="section-padding relative mx-auto flex max-w-7xl items-center gap-8">
        <div className="max-w-2xl flex-1">
          <Reveal>
            <h2 className="font-display text-4xl uppercase leading-[0.92] text-white sm:text-6xl lg:text-7xl">
              Your Next Meal Is Calling.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 text-lg text-white/85">Skip the stress. Get something delicious.</p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" onClick={() => onExplore("breakfast")}>
                Explore Breakfast
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onExplore("lunch")}
              >
                Explore Lunch
              </Button>
            </div>
          </Reveal>
        </div>

        <motion.div
          className="relative hidden w-[min(38vw,420px)] flex-1 lg:block"
          initial={reduced ? false : { opacity: 0, x: 40, rotate: 6 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <PlateVisual
            src={images.cta}
            alt=""
            className="h-[380px]"
            sizes="420px"
          />
        </motion.div>
      </div>
    </section>
  );
}
