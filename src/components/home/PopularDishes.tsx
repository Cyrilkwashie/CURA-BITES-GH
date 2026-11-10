import { SectionHeading } from "@/components/ui/SectionHeading";
import { DishCarousel } from "@/components/home/DishCarousel";
import { DecorDots } from "@/components/ui/DecorDots";

export function PopularDishes() {
  return (
    <section
      id="popular"
      className="section-padding relative overflow-x-clip bg-accent-cream max-sm:overflow-x-hidden"
    >
      <DecorDots variant="cream" />
      <div className="relative mx-auto max-w-7xl">
        <div className="relative mb-2 max-w-3xl pr-28 lg:mb-0 lg:max-w-2xl">
          <SectionHeading
            title="The Dishes Everyone Loves."
            description="Good food has a way of making every day better. Discover some of our favourites."
          />
        </div>
        <DishCarousel />
      </div>
    </section>
  );
}
