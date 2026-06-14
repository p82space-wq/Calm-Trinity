"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

function useIsClient() {
  return useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
}

type NavItem = {
  href: string;
  label: string;
};

type MobileNavProps = {
  navItems: NavItem[];
};

export function MobileNav({ navItems }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isClient = useIsClient();

  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = isOpen ? "hidden" : "";
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      root.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const menu = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] isolate min-h-dvh bg-cream"
          role="dialog"
          aria-modal="true"
          aria-label="モバイルメニュー"
        >
          <div className="flex h-full min-h-dvh flex-col px-8 py-6">
            <div className="flex items-center justify-between">
              <span className="font-serif text-lg tracking-[0.15em] text-forest">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="メニューを閉じる"
                className="flex h-10 w-10 items-center justify-center text-forest transition-colors hover:text-moss"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center">
              <ul className="space-y-8">
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
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="メニューを開く"
        aria-expanded={isOpen}
        className="flex h-10 w-10 items-center justify-center text-forest transition-colors hover:text-moss md:hidden"
      >
        <Menu className="h-5 w-5" strokeWidth={1.5} />
      </button>

      {isClient ? createPortal(menu, document.body) : null}
    </>
  );
}
