import { AnimatePresence, motion } from "framer-motion";
import type { MealItem } from "@/data/menuTypes";
import { Button } from "@/components/ui/Button";
import { images } from "@/data/images";
import { PlateVisual } from "@/components/ui/PlateVisual";

type MenuItemsProps = {
  items: MealItem[];
  meal: "breakfast" | "lunch";
  dayKey: string;
};

export function MenuItems({ items, meal, dayKey }: MenuItemsProps) {
  const isLunch = meal === "lunch";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${meal}-${dayKey}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={
          isLunch
            ? "grid gap-6 sm:grid-cols-2"
            : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        {items.map((item, index) => (
          <article
            key={item.id}
            className={`group overflow-hidden rounded-2xl bg-white ring-1 ring-charcoal/8 transition hover:shadow-card ${
              isLunch && index === 0 ? "sm:row-span-1" : ""
            }`}
          >
            <div
              className={`relative flex items-center justify-center bg-gradient-to-b from-white to-accent-cream/80 px-4 pt-6 ${
                isLunch ? "min-h-[220px] sm:min-h-[260px]" : "min-h-[180px] sm:min-h-[200px]"
              }`}
            >
              <PlateVisual
                src={item.image ?? images.breakfast.default}
                alt={item.name}
                prominent={false}
                sizes={
                  isLunch
                    ? "(max-width: 640px) 100vw, 50vw"
                    : "(max-width: 640px) 100vw, 33vw"
                }
                className={`transition duration-500 group-hover:-translate-y-1 ${
                  isLunch ? "h-[200px] sm:h-[230px]" : "h-[150px] sm:h-[170px]"
                }`}
              />
            </div>
            <div className={`p-5 ${isLunch ? "sm:p-6" : ""}`}>
              <h3
                className={`font-display uppercase text-forest-deep ${
                  isLunch ? "text-2xl sm:text-3xl" : "text-xl"
                }`}
              >
                {item.name}
              </h3>
              {item.description && (
                <p className="mt-2 text-sm leading-relaxed text-charcoal/75">
                  {item.description}
                </p>
              )}
              <Button
                size="sm"
                variant="ghost"
                className="mt-4 !px-0 text-fresh hover:bg-transparent hover:underline"
                onClick={() => {
                  /* ordering — future phase */
                }}
              >
                Add to order — coming soon
              </Button>
            </div>
          </article>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
