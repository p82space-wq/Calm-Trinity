"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

type NavItem = {
  href: string;
  label: string;
};

type MobileNavProps = {
  navItems: NavItem[];
};

export function MobileNav({ navItems }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="メニューを開く"
        className="flex h-10 w-10 items-center justify-center text-forest transition-colors hover:text-moss"
      >
        <Menu className="h-5 w-5" strokeWidth={1.5} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[55] bg-charcoal/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-y-0 right-0 z-[56] flex w-full max-w-xs flex-col bg-cream px-8 py-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-lg tracking-[0.15em] text-forest">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="メニューを閉じる"
                  className="text-forest transition-colors hover:text-moss"
                >
                  <X className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>

              <ul className="mt-16 space-y-8">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-sm uppercase tracking-[0.25em] text-charcoal transition-colors hover:text-forest"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/privacy"
                    onClick={() => setIsOpen(false)}
                    className="text-sm uppercase tracking-[0.25em] text-charcoal transition-colors hover:text-forest"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal"
                    onClick={() => setIsOpen(false)}
                    className="text-sm uppercase tracking-[0.25em] text-charcoal transition-colors hover:text-forest"
                  >
                    Legal
                  </Link>
                </li>
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
