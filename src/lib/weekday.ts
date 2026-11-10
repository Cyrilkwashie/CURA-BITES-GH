import type { Weekday } from "@/data/menuTypes";

export function getDefaultWeekday(): Weekday {
  const d = new Date().getDay();
  switch (d) {
    case 1:
      return "monday";
    case 2:
      return "tuesday";
    case 3:
      return "wednesday";
    case 4:
      return "thursday";
    case 5:
      return "friday";
    default:
      return "monday";
  }
}
