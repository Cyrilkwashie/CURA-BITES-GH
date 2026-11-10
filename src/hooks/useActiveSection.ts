import { useEffect, useState } from "react";

const sectionIds = ["home", "popular", "menu", "about", "why", "order-cta"];

export function useActiveSection(): string {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
              setActive(id);
            }
          });
        },
        { rootMargin: "-20% 0px -55% 0px", threshold: [0.25, 0.5] },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
}
