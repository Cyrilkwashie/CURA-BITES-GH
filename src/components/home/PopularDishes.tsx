import { SectionHeading } from "@/components/ui/SectionHeading";
import { DishCarousel } from "@/components/home/DishCarousel";
import { DecorDots } from "@/components/ui/DecorDots";

export function PopularDishes() {
  return (
    <section
      id="popular"
      className="section-padding relative overflow-x-clip bg-accent-cream max-lg:overflow-x-hidden max-lg:!px-4 max-lg:!py-12"
    >
      <DecorDots variant="cream" />
      <div className="relative mx-auto max-w-7xl">
        <div className="relative mb-4 max-w-3xl max-lg:pr-16 max-lg:[&_h2]:text-[clamp(1.75rem,7vw,2.5rem)] max-lg:[&_p]:mt-3 max-lg:[&_p]:text-sm max-lg:[&>div]:mb-6 lg:mb-0 lg:max-w-2xl lg:pr-0">
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
