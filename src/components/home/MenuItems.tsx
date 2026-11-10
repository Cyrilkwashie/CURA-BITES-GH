import { useCallback, useEffect, useRef, useState } from "react";
import { motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { MealItem } from "@/data/menuTypes";
import { MenuItemCard } from "@/components/home/MenuItemCard";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  carouselRoleStyles,
  carouselRoleTilt,
  getCarouselRole,
} from "@/lib/plateCarousel";
type MenuItemsProps = {
  items: MealItem[];
  meal: "breakfast" | "lunch";
  dayKey: string;
};

export function MenuItems({ items, meal, dayKey }: MenuItemsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const animating = useRef(false);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const reduced = useReducedMotion();
  const total = items.length;

  const transition = reduced
    ? { duration: 0 }
    : { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const };

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
      }, reduced ? 0 : 750);
    },
    [total, reduced],
  );

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (total <= 1) return;
    if (Math.abs(info.offset.x) > 72) {
      go(info.offset.x > 0 ? -1 : 1);
    }
  };

  const setIndex = (i: number) => {
    if (!animating.current) setActiveIndex(i);
  };

  if (!items.length) return null;

  return (
    <div className="relative max-md:overflow-x-clip">
      {total > 1 && (
        <div className="relative z-20 mb-3 flex items-center justify-end gap-2 max-md:mb-4 sm:mb-6 lg:absolute lg:right-0 lg:top-[-4.5rem] lg:mb-0">
          <button
            type="button"
            onClick={() => go(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-forest-deep shadow-nav ring-1 ring-charcoal/8 transition hover:bg-accent-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fresh sm:h-12 sm:w-12"
            aria-label="Previous menu item"
          >
            <ChevronLeft className="max-sm:h-5 max-sm:w-5 sm:h-[22px] sm:w-[22px]" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-deep text-white shadow-nav transition hover:bg-fresh focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fresh sm:h-12 sm:w-12"
            aria-label="Next menu item"
          >
            <ChevronRight className="max-sm:h-5 max-sm:w-5 sm:h-[22px] sm:w-[22px]" />
          </button>
        </div>
      )}

      <div className="relative mx-auto w-full min-w-0 max-w-full">
        <div className="relative mx-auto w-full max-md:h-auto md:h-[500px] lg:h-[580px] xl:h-[620px]">
          <div
            className="relative z-10 mx-auto w-full min-w-0 max-w-[min(100%,720px)] max-md:px-0 md:h-full md:px-4 lg:max-w-[800px]"
            style={{ perspective: 1400 }}
          >
              {items.map((item, index) => {
                const role = getCarouselRole(index, activeIndex, total);
                const styles = carouselRoleStyles(
                  role,
                  isMobile,
                  index,
                  activeIndex,
                  total,
                );
                const isActive = role === "active";

                if (isMobile && !isActive) return null;

                return (
                  <motion.div
                    key={`${dayKey}-${item.id}`}
                    className="flex w-full min-w-0 justify-center max-md:relative max-md:touch-pan-y md:absolute md:inset-0 md:items-center md:px-1"
                    style={{
                      zIndex: styles.zIndex as number,
                      transformStyle: "preserve-3d",
                    }}
                    animate={{
                      x: isMobile ? 0 : styles.x,
                      scale: isMobile ? 1 : styles.scale,
                      opacity: isMobile ? 1 : styles.opacity,
                      rotateY: carouselRoleTilt(role, isMobile),
                      y: isActive && !isMobile ? -6 : 0,
                    }}
                    transition={transition}
                    drag={isMobile && isActive && total > 1 ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.12}
                    onDragEnd={isActive ? onDragEnd : undefined}
                  >
                    <MenuItemCard item={item} meal={meal} />
                  </motion.div>
                );
              })}
          </div>
        </div>
      </div>

      {total > 1 && (
        <div
          className="mt-4 flex max-w-full flex-wrap justify-center gap-2 px-1 sm:mt-6 lg:hidden"
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
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-8 bg-accent-yellow" : "w-2 bg-charcoal/25"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
