export type PlateCarouselRole = "active" | "left" | "right" | "background";

export function carouselRoleTilt(role: PlateCarouselRole, flat: boolean): number {
  if (flat) return 0;
  switch (role) {
    case "left":
      return 14;
    case "right":
      return -14;
    default:
      return 0;
  }
}

export function getCarouselRole(
  index: number,
  active: number,
  total: number,
): PlateCarouselRole {
  let diff = index - active;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  if (diff === 0) return "active";
  if (diff === -1) return "left";
  if (diff === 1) return "right";
  return "background";
}

export type CarouselSpread = "compact" | "wide";

export function carouselRoleStyles(
  role: PlateCarouselRole,
  flat: boolean,
  index: number,
  active: number,
  total: number,
  spread: CarouselSpread = "compact",
): Record<string, number | string> {
  if (flat) {
    if (role === "active") return { x: "0%", scale: 1, opacity: 1, zIndex: 30 };
    return {
      x: role === "left" ? "-115%" : "115%",
      scale: 0.88,
      opacity: 0,
      zIndex: 0,
    };
  }
  const wide = spread === "wide";
  switch (role) {
    case "active":
      return { x: "0%", scale: 1, opacity: 1, zIndex: 30 };
    case "left":
      return {
        x: wide ? "-50%" : "-42%",
        scale: wide ? 0.82 : 0.72,
        opacity: wide ? 0.55 : 0.5,
        zIndex: 20,
      };
    case "right":
      return {
        x: wide ? "50%" : "42%",
        scale: wide ? 0.82 : 0.72,
        opacity: wide ? 0.55 : 0.5,
        zIndex: 20,
      };
    default: {
      let diff = index - active;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;
      return {
        x: diff < 0 ? (wide ? "-62%" : "-58%") : wide ? "62%" : "58%",
        scale: wide ? 0.55 : 0.48,
        opacity: 0.12,
        zIndex: 10,
      };
    }
  }
}
