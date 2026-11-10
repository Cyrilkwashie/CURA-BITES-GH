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
  const isMobile = useMediaQuery("(max-width: 767px)");
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

  const dishCopy = (
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
        <h3 className="mt-2 font-display text-2xl uppercase leading-[0.95] text-forest-deep max-lg:sm:text-3xl lg:text-4xl lg:text-[2.75rem]">
          {activeDish.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-charcoal/75 sm:mt-4 sm:text-base">
          {activeDish.description}
        </p>
        <Button
          className="mt-5 sm:mt-6"
          size="md"
          variant={lightBg ? "secondary" : "primary"}
          onClick={() => scrollToSection("menu")}
        >
          Order This
        </Button>
      </motion.div>
    </AnimatePresence>
  );

  const dishPills = (
    <ul
      className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-col lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
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
              className={`flex w-full min-w-[10.5rem] items-center gap-2.5 rounded-2xl px-2.5 py-2 text-left transition sm:min-w-[11.5rem] sm:gap-3 sm:px-3 sm:py-2.5 lg:min-w-0 lg:rounded-r-full lg:py-3 lg:pl-3 lg:pr-5 ${
                active
                  ? "bg-forest-deep text-white shadow-card"
                  : "bg-white text-charcoal/80 ring-1 ring-charcoal/10 hover:ring-forest-deep/25"
              }`}
            >
              <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-accent-cream ring-2 ring-white/80 sm:h-11 sm:w-11">
                <Image
                  src={dish.image.replace(/\.png$/i, ".jpg")}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </span>
              <span className="text-xs font-semibold leading-tight sm:text-sm">{dish.name}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="relative mt-2 lg:mt-6">
      <div className="mb-4 flex items-center justify-center gap-3 max-lg:sm:justify-end lg:absolute lg:right-0 lg:top-[-4.5rem] lg:mb-0">
        <button
          type="button"
          onClick={() => go(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-forest-deep shadow-nav ring-1 ring-charcoal/8 transition hover:bg-accent-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fresh sm:h-12 sm:w-12"
          aria-label="Previous dish"
        >
          <ChevronLeft size={20} className="sm:w-[22px] sm:h-[22px]" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-deep text-white shadow-nav transition hover:bg-fresh focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fresh sm:h-12 sm:w-12"
          aria-label="Next dish"
        >
          <ChevronRight size={20} className="sm:w-[22px] sm:h-[22px]" />
        </button>
      </div>

      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(200px,240px)] lg:items-center lg:gap-12 xl:grid-cols-[minmax(0,1fr)_260px]">
        <div className="relative order-1 mx-auto w-full max-w-[100vw] overflow-hidden px-1 max-lg:sm:px-0 lg:max-w-none lg:overflow-visible">
          <div className="relative mx-auto h-[270px] w-full max-w-[min(100%,360px)] max-lg:sm:h-[400px] max-lg:sm:max-w-none lg:h-[580px] lg:max-w-none xl:h-[620px]">
            <motion.div
              className="pointer-events-none absolute left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.35] max-lg:top-1/2 max-lg:h-[min(72vw,250px)] max-lg:w-[min(72vw,250px)] max-lg:opacity-[0.4] max-lg:sm:h-[min(88vw,400px)] max-lg:sm:w-[min(88vw,400px)] max-lg:sm:opacity-[0.35] lg:top-[48%] lg:h-[min(95vw,720px)] lg:w-[min(95vw,720px)]"
              animate={{ backgroundColor: bg }}
              transition={{ duration: 0.7 }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-forest-deep/10 max-lg:top-1/2 max-lg:hidden max-lg:sm:block max-lg:sm:h-[min(88vw,640px)] max-lg:sm:w-[min(88vw,640px)] lg:top-[48%] lg:h-[min(88vw,640px)] lg:w-[min(88vw,640px)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute left-1/2 top-[48%] z-0 hidden h-[min(72vw,520px)] w-[min(72vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-forest-deep/5 lg:block"
              aria-hidden
            />

            <p
              className="pointer-events-none absolute left-4 top-0 font-display text-[clamp(3.5rem,14vw,5rem)] uppercase leading-none text-forest-deep/[0.06] max-lg:sm:left-4 max-lg:sm:top-0 max-lg:sm:text-[clamp(5rem,16vw,11rem)] lg:left-8 lg:text-[clamp(5rem,16vw,11rem)]"
              aria-hidden
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </p>

            {isMobile ? (
              <motion.div
                key={activeDish.id}
                className="relative z-10 flex h-full w-full items-center justify-center"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={onDragEnd}
                initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={transition}
              >
                <PlateVisual
                  src={activeDish.image}
                  alt={activeDish.name}
                  prominent
                  compactMobile
                  priority={activeIndex === 0}
                  sizes="(max-width: 640px) 268px, 95vw"
                />
              </motion.div>
            ) : (
              <div
                className="relative z-10 mx-auto h-full w-full max-w-[920px]"
                style={{ perspective: 1600 }}
              >
                {popularDishes.map((dish, index) => {
                  const role = getRole(index, activeIndex, total);
                  const styles = roleStyles(role, isMobile, index, activeIndex, total);
                  const isActive = role === "active";

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
                    >
                      <PlateVisual
                        src={dish.image}
                        alt={dish.name}
                        prominent={isActive}
                        priority={index === 0}
                        sizes="(max-width: 1280px) 65vw, 720px"
                      />
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="order-2 flex flex-col gap-5 lg:order-none lg:gap-8 lg:pt-4">
          <div className="max-lg:order-2">{dishPills}</div>
          <div className="max-lg:order-1">{dishCopy}</div>
        </div>
      </div>

      <div
        className="mt-5 flex justify-center gap-2 lg:hidden"
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
