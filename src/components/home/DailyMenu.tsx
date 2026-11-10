import { breakfastMenu } from "@/data/breakfastMenu";
import { lunchMenu } from "@/data/lunchMenu";
import type { Weekday } from "@/data/menuTypes";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MealSelector, type MealCategory } from "@/components/home/MealSelector";
import { WeekdaySelector } from "@/components/home/WeekdaySelector";
import { MenuItems } from "@/components/home/MenuItems";

type DailyMenuProps = {
  meal: MealCategory;
  weekday: Weekday;
  onMealChange: (meal: MealCategory) => void;
  onWeekdayChange: (day: Weekday) => void;
};

export function DailyMenu({
  meal,
  weekday,
  onMealChange,
  onWeekdayChange,
}: DailyMenuProps) {
  const menu = meal === "breakfast" ? breakfastMenu : lunchMenu;
  const items = menu[weekday];

  return (
    <section
      id="menu"
      className={`section-padding ${
        meal === "breakfast" ? "bg-accent-cream" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="What's Cooking?"
          title="Your Daily Dose of Good Food."
          description="From a satisfying breakfast to a proper lunch, we've got your day covered."
        />

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <MealSelector value={meal} onChange={onMealChange} />
          <p className="text-sm text-charcoal/60">Monday – Friday menus</p>
        </div>

        <div className="mt-8">
          <WeekdaySelector value={weekday} onChange={onWeekdayChange} />
        </div>

        <div className="mt-10">
          <MenuItems items={items} meal={meal} dayKey={weekday} />
        </div>
      </div>
    </section>
  );
}
