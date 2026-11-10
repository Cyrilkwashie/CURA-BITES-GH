import { useCallback, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  PanInfo,
} from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { carouselBackgrounds, popularDishes } from "@/data/popularDishes";
import { Button } from "@/components/ui/Button";
import { scrollToSection } from "@/lib/scroll";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { PlateVisual } from "@/components/ui/PlateVisual";

type DishRole = "active" | "left" | "right" | "background";

function roleTilt(role: DishRole, isMobile: boolean): number {
  if (isMobile) return 0;
  switch (role) {
    case "left":
      return 14;
    case "right":
      return -14;
    default:
      return 0;
  }
}

function getRole(index: number, active: number, total: number): DishRole {
  let diff = index - active;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  if (diff === 0) return "active";
  if (diff === -1) return "left";
  if (diff === 1) return "right";
  return "background";
}

function roleStyles(
  role: DishRole,
  isMobile: boolean,
  index: number,
  active: number,
  total: number,
): Record<string, number | string> {
  if (isMobile) {
    if (role === "active") return { x: "0%", scale: 1, opacity: 1, zIndex: 30 };
    return { x: role === "left" ? "-115%" : "115%", scale: 0.88, opacity: 0, zIndex: 0 };
  }
  switch (role) {
    case "active":
      return { x: "0%", scale: 1, opacity: 1, zIndex: 30 };
    case "left":
      return { x: "-42%", scale: 0.72, opacity: 0.5, zIndex: 20 };
    case "right":
      return { x: "42%", scale: 0.72, opacity: 0.5, zIndex: 20 };
    default: {
      let diff = index - active;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;
      return {
        x: diff < 0 ? "-58%" : "58%",
        scale: 0.48,
        opacity: 0.12,
        zIndex: 10,
      };
    }
  }
}

export function DishCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const animating = useRef(false);
  const reduced = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const total = popularDishes.length;
  const activeDish = popularDishes[activeIndex];
  const bg = carouselBackgrounds[activeDish.background];
  const lightBg =
    activeDish.background === "cream" || activeDish.background === "yellow-cream";

  const transition = reduced
    ? { duration: 0 }
    : { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const };

  const go = useCallback(
    (dir: 1 | -1) => {
      if (animating.current) return;
      animating.current = true;
      setActiveIndex((i) => (i + dir + total) % total);
      window.setTimeout(() => {
        animating.current = false;
      }, reduced ? 0 : 750);
    },
    [total, reduced],
  );

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 72) {
      go(info.offset.x > 0 ? -1 : 1);
    }
  };

  const setIndex = (i: number) => {
    if (!animating.current) setActiveIndex(i);
  };

  return (
    <div className="relative mt-4 lg:mt-6">
      <div className="mb-6 flex items-center justify-end gap-2 lg:absolute lg:right-0 lg:top-[-4.5rem] lg:mb-0">
        <button
          type="button"
          onClick={() => go(-1)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-forest-deep shadow-nav ring-1 ring-charcoal/8 transition hover:bg-accent-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fresh"
          aria-label="Previous dish"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-deep text-white shadow-nav transition hover:bg-fresh focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fresh"
          aria-label="Next dish"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(200px,240px)] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_260px]">
        <div className="relative h-[min(82vw,540px)] sm:h-[500px] lg:h-[580px] xl:h-[620px]">
          <motion.div
            className="pointer-events-none absolute left-1/2 top-[48%] z-0 h-[min(95vw,720px)] w-[min(95vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.35]"
            animate={{ backgroundColor: bg }}
            transition={{ duration: 0.7 }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-1/2 top-[48%] h-[min(88vw,640px)] w-[min(88vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-forest-deep/10"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-1/2 top-[48%] h-[min(72vw,520px)] w-[min(72vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-forest-deep/5"
            aria-hidden
          />

          <p
            className="pointer-events-none absolute left-4 top-0 font-display text-[clamp(5rem,16vw,11rem)] uppercase leading-none text-forest-deep/[0.06] lg:left-8"
            aria-hidden
          >
            {String(activeIndex + 1).padStart(2, "0")}
          </p>

          <div
            className="relative z-10 mx-auto h-full w-full max-w-[920px]"
            style={{ perspective: 1600 }}
          >
            {popularDishes.map((dish, index) => {
              const role = getRole(index, activeIndex, total);
              const styles = roleStyles(role, isMobile, index, activeIndex, total);
              const isActive = role === "active";

              if (isMobile && !isActive) return null;

              return (
                <motion.div
                  key={dish.id}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    zIndex: styles.zIndex as number,
                    transformStyle: "preserve-3d",
                  }}
                  animate={{
                    x: styles.x,
                    scale: styles.scale,
                    opacity: styles.opacity,
                    rotateY: roleTilt(role, isMobile),
                    y: isActive ? -8 : 0,
                  }}
                  transition={transition}
                  drag={isMobile && isActive ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.12}
                  onDragEnd={isActive ? onDragEnd : undefined}
                >
                <PlateVisual
                  src={dish.image}
                  alt={dish.name}
                  prominent={isActive}
                  priority={index === 0}
                  sizes="(max-width: 768px) 95vw, (max-width: 1280px) 65vw, 720px"
                />
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:pt-4">
          <ul
            className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
            role="tablist"
            aria-label="Popular dishes"
          >
            {popularDishes.map((dish, i) => {
              const active = i === activeIndex;
              return (
                <li key={dish.id} className="shrink-0 lg:shrink">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setIndex(i)}
                    className={`flex w-full min-w-[11.5rem] items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition lg:min-w-0 lg:rounded-r-full lg:py-3 lg:pl-3 lg:pr-5 ${
                      active
                        ? "bg-forest-deep text-white shadow-card"
                        : "bg-white text-charcoal/80 ring-1 ring-charcoal/10 hover:ring-forest-deep/25"
                    }`}
                  >
                    <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-accent-cream ring-2 ring-white/80">
                      <Image
                        src={dish.image.replace(/\.png$/i, ".jpg")}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="44px"
                      />
                    </span>
                    <span className="text-sm font-semibold leading-tight">{dish.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeDish.id}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="lg:border-t lg:border-charcoal/10 lg:pt-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fresh">
                {activeDish.category}
              </p>
              <h3 className="mt-2 font-display text-3xl uppercase leading-[0.95] text-forest-deep sm:text-4xl lg:text-[2.75rem]">
                {activeDish.name}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-charcoal/75">
                {activeDish.description}
              </p>
              <Button
                className="mt-6"
                size="md"
                variant={lightBg ? "secondary" : "primary"}
                onClick={() => scrollToSection("menu")}
              >
                Order This
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div
        className="mt-8 flex justify-center gap-2 lg:hidden"
        role="tablist"
        aria-label="Dish slides"
      >
        {popularDishes.map((dish, i) => (
          <button
            key={dish.id}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Show ${dish.name}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-8 bg-accent-yellow" : "w-2 bg-charcoal/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
