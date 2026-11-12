"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";

import { useCart } from "@/hooks/useCart";
import { MobileNav } from "@/components/layout/MobileNav";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { instagramUrl, navItems } from "@/lib/navigation";

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
          ? "border-b border-sand/50 bg-cream/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6 lg:h-20 lg:px-10">
        <Link
          href="/"
          className="justify-self-start whitespace-nowrap font-serif text-lg tracking-[0.14em] text-forest transition-colors hover:text-moss sm:text-xl lg:text-2xl"
        >
          Calm Trinity
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[11px] uppercase tracking-[0.22em] text-charcoal/80 transition-colors hover:text-forest"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-1">
          {instagramUrl ? (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center text-forest transition-colors hover:text-moss"
            >
              <InstagramIcon />
            </a>
          ) : (
            <span
              aria-hidden
              className="flex h-10 w-10 items-center justify-center text-forest/40"
            >
              <InstagramIcon />
            </span>
          )}
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
