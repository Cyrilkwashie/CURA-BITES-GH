import type { MealItem } from "@/data/menuTypes";
import { Button } from "@/components/ui/Button";
import { images } from "@/data/images";
import { PlateVisual } from "@/components/ui/PlateVisual";
import { cn } from "@/lib/cn";

type MenuItemCardProps = {
  item: MealItem;
  meal: "breakfast" | "lunch";
  className?: string;
};

export function MenuItemCard({ item, meal, className }: MenuItemCardProps) {
  const isLunch = meal === "lunch";

  return (
    <article
      className={cn(
        "group mx-auto w-full min-w-0 max-w-full overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-charcoal/8 transition duration-300",
        "max-md:max-w-none md:max-w-[min(100%,420px)] lg:max-w-[500px] xl:max-w-[520px]",
        className,
      )}
    >
      <div
        className={cn(
          "relative flex items-center justify-center bg-gradient-to-b from-white to-accent-cream/80 px-3 pt-5 sm:px-4 sm:pt-6",
          isLunch
            ? "min-h-[min(46vw,190px)] max-md:min-h-[min(44vw,180px)] sm:min-h-[240px]"
            : "min-h-[min(40vw,165px)] max-md:min-h-[min(38vw,155px)] sm:min-h-[190px]",
          isLunch ? "lg:min-h-[260px] lg:pt-7" : "lg:min-h-[210px] lg:pt-7",
        )}
      >
        <PlateVisual
          src={item.image ?? images.breakfast.default}
          alt={item.name}
          prominent={false}
          sizes="(max-width: 767px) 78vw, (max-width: 1024px) 420px, 500px"
          className={cn(
            "transition duration-500 group-hover:-translate-y-1",
            isLunch
              ? "h-[min(40vw,175px)] w-[min(72vw,260px)] sm:h-[210px] sm:w-[320px]"
              : "h-[min(36vw,150px)] w-[min(68vw,240px)] sm:h-[165px] sm:w-[300px]",
            isLunch ? "lg:h-[235px] lg:w-[320px] xl:h-[245px]" : "lg:h-[185px] lg:w-[300px] xl:h-[195px]",
          )}
        />
      </div>
      <div className={cn("p-4 sm:p-5", isLunch && "sm:p-6", "lg:p-6 xl:p-7")}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fresh">
          {meal === "breakfast" ? "Breakfast" : "Lunch"}
        </p>
        <h3
          className={cn(
            "mt-1.5 font-display uppercase leading-[0.95] text-forest-deep sm:mt-2",
            isLunch ? "text-[1.35rem] sm:text-3xl" : "text-xl sm:text-2xl",
            isLunch ? "lg:text-[2rem] xl:text-[2.125rem]" : "lg:text-[1.75rem] xl:text-[1.875rem]",
          )}
        >
          {item.name}
        </h3>
        {item.description && (
          <p className="mt-2 text-[0.8125rem] leading-relaxed text-charcoal/75 sm:mt-3 sm:text-sm lg:text-[0.9375rem]">
            {item.description}
          </p>
        )}
        <Button
          size="sm"
          variant="ghost"
          className="mt-3 !px-0 text-fresh hover:bg-transparent hover:underline sm:mt-4"
          onClick={() => {
            /* ordering — future phase */
          }}
        >
          Add to order — coming soon
        </Button>
      </div>
    </article>
  );
}
