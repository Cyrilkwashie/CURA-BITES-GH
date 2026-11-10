import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "@/data/brand";
import { Button } from "@/components/ui/Button";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
};

export function MobileMenu({ open, onClose, onNavigate }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-forest-deep/60 backdrop-blur-sm"
            aria-label="Close menu overlay"
            onClick={onClose}
          />
          <motion.div
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-accent-cream px-8 pb-10 pt-24 shadow-card"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35 }}
                >
                  <button
                    type="button"
                    onClick={() => onNavigate(link.href)}
                    className="w-full py-4 text-left font-display text-3xl uppercase text-forest-deep"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="mt-auto pt-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Button
                className="w-full"
                size="lg"
                onClick={() => onNavigate("menu")}
              >
                Order Now
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
