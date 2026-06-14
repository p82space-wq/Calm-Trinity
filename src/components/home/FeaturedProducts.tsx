import Link from "next/link";

import { ProductGrid } from "@/components/products/ProductGrid";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { CalmProduct } from "@/types/product";

type FeaturedProductsProps = {
  products: CalmProduct[];
};

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="py-section">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-stone">
              Collection
            </p>
            <h2 className="mt-4 font-serif text-4xl text-forest">
              おすすめ商品
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden text-xs uppercase tracking-[0.2em] text-stone transition-colors hover:text-forest md:block"
          >
            View All →
          </Link>
        </ScrollReveal>

        <ScrollReveal className="mt-14" delay={0.15}>
          <ProductGrid products={products} variant="featured" />
        </ScrollReveal>

        <div className="mt-10 text-center md:hidden">
          <Link
            href="/products"
            className="text-xs uppercase tracking-[0.2em] text-stone transition-colors hover:text-forest"
          >
            View All →
          </Link>
        </div>
      </div>
    </section>
  );
}
