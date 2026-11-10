import { images } from "@/data/images";
import type { DailyMenu } from "@/data/menuTypes";

export const lunchMenu: DailyMenu = {
  monday: [
    {
      id: "mon-jollof",
      name: "Assorted Jollof",
      description: "Smoky jollof with rich flavour and generous accompaniments.",
      image: images.dishes.assortedJollof,
    },
    {
      id: "mon-red-red",
      name: "Red Red",
      description: "Stewed black-eyed peas with fried plantain.",
      image: images.dishes.redRed,
    },
  ],
  tuesday: [
    {
      id: "tue-waakye",
      name: "Waakye",
      description: "Rice and beans with signature waakye accompaniments.",
      image: images.dishes.waakye,
    },
    {
      id: "tue-jollof-chicken",
      name: "Jollof with Chicken",
      description: "Classic jollof topped with succulent chicken.",
      image: images.dishes.jollofChicken,
    },
  ],
  wednesday: [
    {
      id: "wed-fried-rice",
      name: "Assorted Fried Rice",
      description: "Colourful fried rice packed with savoury goodness.",
      image: images.dishes.assortedFriedRice,
    },
    {
      id: "wed-red-red",
      name: "Red Red",
      description: "Stewed black-eyed peas with fried plantain.",
      image: images.dishes.redRed,
    },
  ],
  thursday: [
    {
      id: "thu-jollof",
      name: "Assorted Jollof",
      description: "Smoky jollof with rich flavour and generous accompaniments.",
      image: images.dishes.assortedJollof,
    },
    {
      id: "thu-banku",
      name: "Banku with Pepper and Fish",
      description: "Fermented corn dough with pepper and grilled fish.",
      image: images.dishes.bankuPepperFish,
    },
  ],
  friday: [
    {
      id: "fri-fried-rice",
      name: "Assorted Fried Rice",
      description: "Colourful fried rice packed with savoury goodness.",
      image: images.dishes.assortedFriedRice,
    },
    {
      id: "fri-angwamo",
      name: "Braised Rice (Angwamo)",
      description: "Comforting braised rice — simple and deeply satisfying.",
      image: images.dishes.braisedRiceAngwamo,
    },
  ],
};
