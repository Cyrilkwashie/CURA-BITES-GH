import { images } from "@/data/images";
import type { DailyMenu } from "@/data/menuTypes";

const bev = (name: string, id: string) => ({
  id,
  name,
  description: "Freshly prepared to start your morning right.",
  image: images.breakfast.beverage,
});

export const breakfastMenu: DailyMenu = {
  monday: [
    bev("Tea", "mon-tea"),
    bev("Coffee", "mon-coffee"),
    bev("Milo", "mon-milo"),
    {
      id: "mon-hausa-koko",
      name: "Hausa Koko",
      description: "Spiced millet porridge — a Ghanaian breakfast classic.",
      image: images.breakfast.hausaKoko,
    },
    {
      id: "mon-egg-sandwich",
      name: "Egg Sandwich",
      description: "Fluffy eggs layered in soft bread.",
      image: images.breakfast.eggSandwich,
    },
    {
      id: "mon-koose",
      name: "Koose",
      description: "Crispy bean fritters, golden and savoury.",
      image: images.breakfast.koose,
    },
  ],
  tuesday: [
    bev("Tea", "tue-tea"),
    bev("Coffee", "tue-coffee"),
    bev("Milo", "tue-milo"),
    {
      id: "tue-tom-brown",
      name: "Tom Brown",
      description: "Hearty roasted corn porridge.",
      image: images.breakfast.tomBrown,
    },
    {
      id: "tue-sandwich",
      name: "Sandwich",
      description: "A satisfying morning bite.",
      image: images.breakfast.sandwich,
    },
    {
      id: "tue-rock-buns",
      name: "Rock Buns",
      description: "Soft spiced buns baked fresh.",
      image: images.breakfast.rockBuns,
    },
  ],
  wednesday: [
    bev("Tea", "wed-tea"),
    bev("Coffee", "wed-coffee"),
    bev("Milo", "wed-milo"),
    {
      id: "wed-hausa-koko",
      name: "Hausa Koko",
      description: "Spiced millet porridge — a Ghanaian breakfast classic.",
      image: images.breakfast.hausaKoko,
    },
    {
      id: "wed-bread-veg",
      name: "Bread and Butter with Tossed Vegetables",
      description: "Light, fresh and balanced.",
      image: images.breakfast.breadButterVeg,
    },
    {
      id: "wed-koose",
      name: "Koose",
      description: "Crispy bean fritters, golden and savoury.",
      image: images.breakfast.koose,
    },
  ],
  thursday: [
    bev("Tea", "thu-tea"),
    bev("Coffee", "thu-coffee"),
    bev("Milo", "thu-milo"),
    {
      id: "thu-tom-brown",
      name: "Tom Brown",
      description: "Hearty roasted corn porridge.",
      image: images.breakfast.tomBrown,
    },
    {
      id: "thu-egg-sandwich",
      name: "Egg Sandwich",
      description: "Fluffy eggs layered in soft bread.",
      image: images.breakfast.eggSandwich,
    },
    {
      id: "thu-pancakes",
      name: "Pancakes",
      description: "Fluffy stacks to sweeten your morning.",
      image: images.breakfast.pancakes,
    },
  ],
  friday: [
    {
      id: "fri-oats",
      name: "Oats",
      description: "Wholesome oats for a steady start.",
      image: images.breakfast.oats,
    },
    bev("Tea", "fri-tea"),
    bev("Coffee", "fri-coffee"),
    bev("Milo", "fri-milo"),
    {
      id: "fri-bread-veg",
      name: "Bread and Butter with Tossed Vegetables",
      description: "Light, fresh and balanced.",
      image: images.breakfast.breadButterVeg,
    },
    {
      id: "fri-rock-buns",
      name: "Rock Buns",
      description: "Soft spiced buns baked fresh.",
      image: images.breakfast.rockBuns,
    },
  ],
};
