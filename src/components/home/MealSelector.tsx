import { motion } from "framer-motion";

export type MealCategory = "breakfast" | "lunch";

type MealSelectorProps = {
  value: MealCategory;
  onChange: (meal: MealCategory) => void;
};

export function MealSelector({ value, onChange }: MealSelectorProps) {
  return (
    <div
      className="relative inline-flex w-full max-w-md rounded-full bg-forest-deep/5 p-1 sm:w-auto"
      role="tablist"
      aria-label="Meal category"
    >
      {(["breakfast", "lunch"] as const).map((meal) => {
        const active = value === meal;
        return (
          <button
            key={meal}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(meal)}
            className="relative flex-1 px-6 py-3 text-sm font-semibold uppercase tracking-wide sm:min-w-[9rem]"
          >
            {active && (
              <motion.span
                layoutId="meal-pill"
                className="absolute inset-0 rounded-full bg-forest-deep shadow-sm"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span
              className={`relative z-10 ${active ? "text-white" : "text-charcoal/70"}`}
            >
              {meal === "breakfast" ? "Breakfast" : "Lunch"}
            </span>
          </button>
        );
      })}
    </div>
  );
}
