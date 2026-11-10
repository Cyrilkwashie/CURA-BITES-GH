import { weekdays, type Weekday } from "@/data/menuTypes";

type WeekdaySelectorProps = {
  value: Weekday;
  onChange: (day: Weekday) => void;
};

export function WeekdaySelector({ value, onChange }: WeekdaySelectorProps) {
  return (
    <div className="relative -mx-5 sm:mx-0">
      <div
        className="flex gap-2 overflow-x-auto px-5 pb-2 sm:flex-wrap sm:overflow-visible sm:px-0"
        role="tablist"
        aria-label="Weekday"
      >
        {weekdays.map((day) => {
          const active = value === day.key;
          return (
            <button
              key={day.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(day.key)}
              className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-semibold uppercase tracking-wide transition sm:text-sm ${
                active
                  ? "bg-accent-yellow text-forest-deep shadow-sm"
                  : "bg-white text-charcoal/70 ring-1 ring-charcoal/10 hover:ring-forest-deep/20"
              }`}
            >
              <span className="sm:hidden">{day.short}</span>
              <span className="hidden sm:inline">{day.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
