import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { MealItem } from "@/data/menuTypes";
import { Button } from "@/components/ui/Button";
import { images } from "@/data/images";
import { PlateVisual } from "@/components/ui/PlateVisual";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type MenuItemsProps = {
  items: MealItem[];
  meal: "breakfast" | "lunch";
  dayKey: string;
};

const stageColors = {
  breakfast: "#F5E9B8",
  lunch: "#26834A",
} as const;

export function MenuItems({ items, meal, dayKey }: MenuItemsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const animating = useRef(false);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const total = items.length;
  const activeItem = items[activeIndex] ?? items[0];
  const orbColor = meal === "breakfast" ? stageColors.breakfast : stageColors.lunch;
  const orbOpacity = meal === "breakfast" ? 0.55 : 0.35;

  useEffect(() => {
    setActiveIndex(0);
  }, [meal, dayKey]);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (animating.current || total <= 1) return;
      animating.current = true;
      setActiveIndex((i) => (i + dir + total) % total);
      window.setTimeout(() => {
        animating.current = false;
      }, 450);
    },
    [total],
  );

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (total <= 1) return;
    if (Math.abs(info.offset.x) > 56) {
      go(info.offset.x > 0 ? -1 : 1);
    }
  };

  if (!activeItem) return null;

  return (
    <div className="relative">
      {total > 1 && (
        <div className="mb-4 flex items-center justify-center gap-3 lg:justify-end">
          <button
            type="button"
            onClick={() => go(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-forest-deep shadow-nav ring-1 ring-charcoal/8 transition hover:bg-accent-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fresh sm:h-12 sm:w-12"
            aria-label="Previous menu item"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-deep text-white shadow-nav transition hover:bg-fresh focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fresh sm:h-12 sm:w-12"
            aria-label="Next menu item"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={`${meal}-${dayKey}-${activeItem.id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12"
          drag={isMobile && total > 1 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={onDragEnd}
        >
          <div className="relative mx-auto w-full max-w-[min(100%,360px)] overflow-hidden max-lg:sm:max-w-none lg:max-w-none lg:overflow-visible">
            <div className="relative mx-auto h-[250px] w-full max-lg:sm:h-[380px] lg:h-[480px]">
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 rounded-full max-lg:h-[min(70vw,230px)] max-lg:w-[min(70vw,230px)] max-lg:sm:h-[min(85vw,360px)] max-lg:sm:w-[min(85vw,360px)] lg:h-[420px] lg:w-[420px]"
                style={{ backgroundColor: orbColor, opacity: orbOpacity }}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent-yellow/70 max-lg:h-[min(78vw,250px)] max-lg:w-[min(78vw,250px)] max-lg:sm:h-[min(92vw,390px)] max-lg:sm:w-[min(92vw,390px)] lg:h-[460px] lg:w-[460px]"
                aria-hidden
              />
              <p
                className="pointer-events-none absolute left-1 top-1 font-display text-[clamp(3rem,12vw,4.5rem)] uppercase leading-none text-forest-deep/[0.06] max-lg:sm:left-3 lg:left-6 lg:text-[clamp(4rem,8vw,6rem)]"
                aria-hidden
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </p>
              <div className="relative z-10 flex h-full items-center justify-center">
                <PlateVisual
                  src={activeItem.image ?? images.breakfast.default}
                  alt={activeItem.name}
                  prominent={meal === "lunch"}
                  compactMobile={isMobile}
                  sizes={
                    meal === "lunch"
                      ? "(max-width: 640px) 268px, (max-width: 1024px) 50vw, 640px"
                      : "(max-width: 640px) 240px, (max-width: 1024px) 50vw, 520px"
                  }
                  className={
                    meal === "breakfast"
                      ? "max-lg:h-[200px] max-lg:w-[280px] max-lg:sm:h-[240px] max-lg:sm:w-[320px]"
                      : undefined
                  }
                />
              </div>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fresh">
              {meal === "breakfast" ? "Breakfast" : "Lunch"} · {total} items today
            </p>
            <h3 className="mt-2 font-display text-3xl uppercase leading-[0.95] text-forest-deep sm:text-4xl lg:text-[2.75rem]">
              {activeItem.name}
            </h3>
            {activeItem.description && (
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-charcoal/75 sm:text-base lg:mx-0">
                {activeItem.description}
              </p>
            )}
            <Button
              size="md"
              variant="ghost"
              className="mt-5 !px-0 text-fresh hover:bg-transparent hover:underline lg:mt-6"
              onClick={() => {
                /* ordering — future phase */
              }}
            >
              Add to order — coming soon
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>

      {total > 1 && (
        <>
          <ul
            className="mt-6 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-8 [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Menu items"
          >
            {items.map((item, i) => {
              const active = i === activeIndex;
              return (
                <li key={item.id} className="shrink-0">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveIndex(i)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                      active
                        ? "bg-forest-deep text-white shadow-sm"
                        : "bg-white text-charcoal/80 ring-1 ring-charcoal/12 hover:ring-forest-deep/25"
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>

          <div
            className="mt-4 flex justify-center gap-2 max-lg:flex lg:hidden"
            role="tablist"
            aria-label="Menu slides"
          >
            {items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Show ${item.name}`}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-8 bg-accent-yellow" : "w-2 bg-charcoal/25"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
