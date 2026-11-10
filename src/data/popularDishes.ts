import { images } from "@/data/images";

export type PopularDish = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  background: "forest" | "cream" | "fresh" | "yellow-cream";
};

export const carouselBackgrounds: Record<PopularDish["background"], string> = {
  forest: "#164C32",
  cream: "#F8F8EF",
  fresh: "#26834A",
  "yellow-cream": "#F5E9B8",
};

export const popularDishes: PopularDish[] = [
  {
    id: "assorted-jollof",
    name: "Assorted Jollof",
    category: "Lunch Favourite",
    description:
      "Smoky, seasoned jollof rice served with chicken, plantain and vibrant sides.",
    image: images.dishes.assortedJollof,
    background: "forest",
  },
  {
    id: "waakye",
    name: "Waakye",
    category: "Tuesday Special",
    description:
      "Signature rice and beans with wele, spaghetti, gari and pepper sauce.",
    image: images.dishes.waakye,
    background: "cream",
  },
  {
    id: "assorted-fried-rice",
    name: "Assorted Fried Rice",
    category: "Midweek Pick",
    description:
      "Wok-style fried rice with vegetables and protein — bright and filling.",
    image: images.dishes.assortedFriedRice,
    background: "fresh",
  },
  {
    id: "red-red",
    name: "Red Red",
    category: "Plantain & Beans",
    description:
      "Slow-cooked beans in palm oil with ripe fried plantain on the side.",
    image: images.dishes.redRed,
    background: "yellow-cream",
  },
  {
    id: "banku-fish",
    name: "Banku with Pepper and Fish",
    category: "Coastal Classic",
    description:
      "Soft banku paired with fiery pepper sauce and grilled fish.",
    image: images.dishes.bankuPepperFish,
    background: "forest",
  },
  {
    id: "angwamo",
    name: "Braised Rice (Angwamo)",
    category: "Friday Comfort",
    description:
      "Home-style braised rice — humble, hearty and deeply comforting.",
    image: images.dishes.braisedRiceAngwamo,
    background: "cream",
  },
];
