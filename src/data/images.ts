/**
 * Image paths for Cura Bites GH.
 * - `plates/` — transparent plate cutouts (PNG); used across the site UI.
 * - Original full-scene JPGs remain in `/public/images/` (unchanged).
 */
const plate = (name: string) => `/images/plates/${name}`;
const legacy = (name: string) => `/images/${name}`;

/** Original editorial photography — kept for reference / fallback */
export const legacyImages = {
  hero: legacy("hero-jollof.jpg"),
  about: legacy("about-kitchen.jpg"),
  cta: legacy("cta-spread.jpg"),
} as const;

export const images = {
  hero: {
    assortedJollof: plate("plate-jollof-assorted.png"),
  },
  dishes: {
    assortedJollof: plate("plate-jollof-assorted.png"),
    waakye: plate("plate-waakye.png"),
    assortedFriedRice: plate("plate-fried-rice.png"),
    redRed: plate("plate-red-red.png"),
    bankuPepperFish: plate("plate-banku-fish.png"),
    braisedRiceAngwamo: plate("plate-angwamo.png"),
    jollofChicken: plate("plate-jollof-chicken.png"),
  },
  breakfast: {
    beverage: plate("plate-beverage.png"),
    hausaKoko: plate("plate-hausa-koko.png"),
    eggSandwich: plate("plate-egg-sandwich.png"),
    koose: plate("plate-koose.png"),
    tomBrown: plate("plate-tombrown.png"),
    sandwich: plate("plate-sandwich.png"),
    rockBuns: plate("plate-rock-buns.png"),
    breadButterVeg: plate("plate-bread-veg.png"),
    pancakes: plate("plate-pancakes.png"),
    oats: plate("plate-oats.png"),
    default: plate("plate-beverage.png"),
  },
  about: plate("plate-about-hero.png"),
  cta: plate("plate-cta-hero.png"),
} as const;
