"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { useCart } from "@/hooks/useCart";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { footerLinks, instagramUrl } from "@/lib/navigation";

export function Footer() {
  const { openCart } = useCart();

  return (
    <footer className="mt-auto border-t border-sand/70 bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="relative flex items-center justify-center">
          <p className="font-serif text-2xl tracking-[0.16em] text-forest md:text-3xl">
            Calm Trinity
          </p>
          <div className="absolute right-0 flex items-center gap-1">
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
              className="flex h-10 w-10 items-center justify-center text-forest transition-colors hover:text-moss"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm tracking-[0.08em] text-muted">
          あなたの毎日に、やさしい癒しを。
        </p>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-sand/70 pt-8 md:flex-row">
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-stone">
            {footerLinks.map((link, index) => (
              <span key={link.href} className="flex items-center gap-4">
                {index > 0 && <span className="text-sand">|</span>}
                <Link
                  href={link.href}
                  className="transition-colors hover:text-forest"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </nav>

          <p className="text-[11px] tracking-[0.12em] text-stone/70">
            &copy; {new Date().getFullYear()} Calm Trinity. All rights reserved.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-4 text-[10px] tracking-[0.14em] text-stone/60 md:justify-start">
          <Link href="/legal" className="transition-colors hover:text-forest">
            Legal
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-forest">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
