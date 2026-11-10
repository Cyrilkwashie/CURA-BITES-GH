import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { brand, navLinks } from "@/data/brand";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/cn";

export type MenuNavigate = (meal: "breakfast" | "lunch") => void;

type NavbarProps = {
  activeSection: string;
  onMenuNavigate: MenuNavigate;
};

function resolveNavTarget(href: string): string {
  if (href === "breakfast" || href === "lunch") return "menu";
  if (href === "home") return "home";
  return href;
}

function isLinkActive(href: string, activeSection: string) {
  if (href === "home") return activeSection === "home";
  if (href === "breakfast" || href === "lunch") return activeSection === "menu";
  return activeSection === href;
}

export function Navbar({ activeSection, onMenuNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    if (href === "breakfast") {
      onMenuNavigate("breakfast");
      scrollToSection("menu");
      return;
    }
    if (href === "lunch") {
      onMenuNavigate("lunch");
      scrollToSection("menu");
      return;
    }
    scrollToSection(resolveNavTarget(href));
  };

  const elevated = scrolled || mobileOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 bg-forest-deep transition-all duration-300 ease-premium",
          elevated && "shadow-nav",
        )}
      >
        <nav
          className="mx-auto flex h-[var(--nav-height)] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-12"
          aria-label="Main navigation"
        >
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className="font-display text-lg uppercase tracking-wide text-white transition-colors sm:text-xl"
          >
            {brand.name}
          </button>

          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => handleNav(link.href)}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isLinkActive(link.href, activeSection)
                      ? "text-accent-yellow"
                      : "text-white/90 hover:text-white",
                  )}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Button
              size="sm"
              className="rounded-full"
              onClick={() => {
                onMenuNavigate("breakfast");
                scrollToSection("menu");
              }}
            >
              Order Now
            </Button>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm lg:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onNavigate={(href) => {
          handleNav(href);
          setMobileOpen(false);
        }}
      />
    </>
  );
}
