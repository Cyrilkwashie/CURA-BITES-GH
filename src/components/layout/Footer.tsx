import { brand, navLinks } from "@/data/brand";
import { scrollToSection } from "@/lib/scroll";
import { Mail, MapPin, Share2 } from "lucide-react";

type FooterProps = {
  onMenuNavigate?: (meal: "breakfast" | "lunch") => void;
};

export function Footer({ onMenuNavigate }: FooterProps) {
  const handleNav = (href: string) => {
    if (href === "breakfast" && onMenuNavigate) {
      onMenuNavigate("breakfast");
      scrollToSection("menu");
      return;
    }
    if (href === "lunch" && onMenuNavigate) {
      onMenuNavigate("lunch");
      scrollToSection("menu");
      return;
    }
    scrollToSection(href === "home" ? "home" : href);
  };

  return (
    <footer className="border-t border-forest-deep/10 bg-forest-deep text-white">
      <div className="section-padding mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-2xl uppercase">{brand.name}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
              {brand.motto}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-yellow">
              Navigate
            </p>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => handleNav(link.href)}
                    className="text-sm text-white/80 transition hover:text-white"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-yellow">
              Connect
            </p>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Mail size={16} aria-hidden />
                <span>Contact — coming soon</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} aria-hidden />
                <span>Location — coming soon</span>
              </li>
              <li className="flex items-center gap-2">
                <Share2 size={16} aria-hidden />
                <span>Social — coming soon</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 text-center text-xs text-white/50 sm:text-left">
          © {new Date().getFullYear()} {brand.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
