import { carouselBackgrounds } from "@/data/popularDishes";

type BgKey = keyof typeof carouselBackgrounds;

const breakfastPalette: BgKey[] = [
  "yellow-cream",
  "cream",
  "fresh",
  "cream",
  "yellow-cream",
  "forest",
];

const lunchPalette: BgKey[] = [
  "forest",
  "fresh",
  "forest",
  "yellow-cream",
  "cream",
  "fresh",
];

export function menuItemStageColor(meal: "breakfast" | "lunch", index: number): string {
  const palette = meal === "breakfast" ? breakfastPalette : lunchPalette;
  const key = palette[index % palette.length];
  return carouselBackgrounds[key];
}

export function menuItemStageOpacity(color: string): number {
  if (color === carouselBackgrounds.cream || color === carouselBackgrounds["yellow-cream"]) {
    return 0.55;
  }
  return 0.35;
}
