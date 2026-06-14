import Link from "next/link";

import { ProductCard } from "@/components/products/ProductCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { CalmProduct } from "@/types/product";

type RelatedProductsProps = {
  products: CalmProduct[];
};

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <ScrollReveal className="mt-24 border-t border-sand pt-16">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-stone">
            You May Also Like
          </p>
          <h2 className="mt-4 font-serif text-3xl text-forest">
            関連商品
          </h2>
        </div>
        <Link
          href="/products"
          className="hidden text-xs uppercase tracking-[0.2em] text-stone transition-colors hover:text-forest md:block"
        >
          View All →
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </ScrollReveal>
  );
}
