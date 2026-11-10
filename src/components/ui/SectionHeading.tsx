import { Reveal } from "@/components/ui/Reveal";

type SectionHeadingProps = {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const maxDesc = align === "center" ? "max-w-2xl mx-auto" : "max-w-xl";

  return (
    <div className={cnSection(alignClass, "mb-12 lg:mb-16")}>
      {label && (
        <Reveal>
          <p
            className={`mb-3 text-xs font-semibold uppercase tracking-[0.2em] ${
              light ? "text-accent-yellow" : "text-fresh"
            }`}
          >
            {label}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={`font-display text-4xl uppercase leading-[0.95] sm:text-5xl lg:text-6xl ${
            light ? "text-white" : "text-forest-deep"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={`mt-5 text-base leading-relaxed sm:text-lg ${maxDesc} ${
              light ? "text-white/85" : "text-charcoal/80"
            }`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

function cnSection(...parts: string[]) {
  return parts.join(" ");
}
