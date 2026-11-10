import { Reveal } from "@/components/ui/Reveal";
import { Utensils, Coffee, Clock, Zap } from "lucide-react";

const highlights = [
  {
    number: "01",
    title: "Good Food",
    body: "Delicious meals prepared to make your day better.",
    icon: Utensils,
  },
  {
    number: "02",
    title: "Breakfast & Lunch",
    body: "Options to help you start your day and keep going.",
    icon: Coffee,
  },
  {
    number: "03",
    title: "Convenience",
    body: "Discover your meals and plan your day with ease.",
    icon: Clock,
  },
  {
    number: "04",
    title: "Made for Busy Lives",
    body: "Good food that fits into your everyday routine.",
    icon: Zap,
  },
] as const;

export function WhyCuraBites() {
  return (
    <section id="why" className="section-padding bg-accent-cream">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="max-w-3xl font-display text-4xl uppercase leading-[0.95] text-forest-deep sm:text-5xl">
            Why Make Cura Bites Your Everyday Choice?
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:gap-16">
          {highlights.map((item, i) => (
            <Reveal key={item.number} delay={0.06 * i} className="group">
              <div className="flex gap-5 border-t border-forest-deep/15 pt-6">
                <span className="font-display text-3xl text-accent-yellow">{item.number}</span>
                <div>
                  <HighlightTitle item={item} />
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-charcoal/75 sm:text-base">
                    {item.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HighlightTitle({ item }: { item: (typeof highlights)[number] }) {
  const Icon = item.icon;
  return (
    <h3 className="flex items-center gap-2 font-display text-2xl uppercase text-forest-deep transition group-hover:text-fresh">
      {item.title}
      <Icon className="h-5 w-5 text-fresh opacity-60" aria-hidden />
    </h3>
  );
}
