import { SectionHeading } from "@/components/ui/SectionHeading";
import { DishCarousel } from "@/components/home/DishCarousel";
import { DecorDots } from "@/components/ui/DecorDots";

export function PopularDishes() {
  return (
    <section
      id="popular"
      className="relative overflow-x-hidden bg-accent-cream px-4 py-12 sm:px-8 sm:py-20 lg:px-12 lg:py-28 xl:px-16 2xl:px-24"
    >
      <DecorDots variant="cream" />
      <div className="relative mx-auto max-w-7xl">
        <div className="relative mb-4 max-w-3xl pr-16 sm:mb-2 sm:pr-28 lg:mb-0 lg:max-w-2xl lg:pr-0 [&_h2]:text-[clamp(1.75rem,7vw,2.5rem)] sm:[&_h2]:text-5xl lg:[&_h2]:text-6xl [&>div]:mb-6 sm:[&>div]:mb-12 lg:[&>div]:mb-16 [&_p]:mt-3 [&_p]:text-sm sm:[&_p]:mt-5 sm:[&_p]:text-lg">
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
