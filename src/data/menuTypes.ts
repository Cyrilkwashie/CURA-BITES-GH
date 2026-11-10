export type Weekday = "monday" | "tuesday" | "wednesday" | "thursday" | "friday";

export type MealItem = {
  id: string;
  name: string;
  description?: string;
  image?: string;
};

export type DailyMenu = Record<Weekday, MealItem[]>;

export const weekdays: { key: Weekday; label: string; short: string }[] = [
  { key: "monday", label: "Monday", short: "Mon" },
  { key: "tuesday", label: "Tuesday", short: "Tue" },
  { key: "wednesday", label: "Wednesday", short: "Wed" },
  { key: "thursday", label: "Thursday", short: "Thu" },
  { key: "friday", label: "Friday", short: "Fri" },
];
