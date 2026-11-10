import { brand } from "@/data/brand";
import { images } from "@/data/images";
import { Reveal } from "@/components/ui/Reveal";
import { PlateVisual } from "@/components/ui/PlateVisual";
import { Button } from "@/components/ui/Button";
import { scrollToSection } from "@/lib/scroll";

export function AboutSection() {
  return (
    <section id="about" className="section-padding overflow-hidden bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative flex min-h-[320px] items-center justify-center rounded-[2rem] bg-gradient-to-br from-accent-cream via-white to-accent-cream sm:min-h-[420px]">
            <PlateVisual
              src={images.about}
              alt="Fresh Ghanaian meals prepared with care"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-[min(70vw,420px)]"
            />
          </div>
          <div
            className="absolute -bottom-6 -right-4 hidden h-28 w-28 rounded-full bg-accent-yellow lg:block"
            aria-hidden
          />
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <h2 className="font-display text-4xl uppercase leading-[0.95] text-forest-deep sm:text-5xl lg:text-6xl">
              <span className="block">Good Food.</span>
              <span className="block">Busy Lives.</span>
              <span className="text-fresh">Sorted.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-charcoal/80">
              Life gets busy. Your meals shouldn&apos;t be another thing to worry about. At{" "}
              {brand.name}, we make it easier to enjoy delicious, satisfying meals throughout your
              day.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <Button
              className="mt-8"
              variant="secondary"
              onClick={() => scrollToSection("menu")}
            >
              View Our Menu
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
