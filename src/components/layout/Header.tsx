"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";

import { useCart } from "@/hooks/useCart";
import { MobileNav } from "@/components/layout/MobileNav";
import { navItems } from "@/lib/navigation";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalQuantity, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-smooth ${
        isScrolled
          ? "border-b border-sand/60 bg-cream/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:h-20">
        <Link
          href="/"
          className="font-serif text-xl tracking-[0.2em] text-forest transition-colors hover:text-moss lg:text-2xl"
        >
          Calm Trinity
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs uppercase tracking-[0.25em] text-charcoal transition-colors hover:text-forest"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={openCart}
            aria-label="カートを開く"
            className="relative flex h-10 w-10 items-center justify-center text-forest transition-colors hover:text-moss"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            {totalQuantity > 0 && (
              <span
                suppressHydrationWarning
                className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-forest px-1 text-[10px] text-cream"
              >
                {totalQuantity}
              </span>
            )}
          </button>
          <MobileNav navItems={[...navItems]} />
        </div>
      </div>
    </header>
  );
}
