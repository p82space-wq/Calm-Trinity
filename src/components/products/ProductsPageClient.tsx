"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { ProductGrid } from "@/components/products/ProductGrid";
import type { CalmProduct } from "@/types/product";

type ProductsPageClientProps = {
  products: CalmProduct[];
};

export function ProductsPageClient({ products }: ProductsPageClientProps) {
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return products;
    }

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(normalized) ||
        product.description?.toLowerCase().includes(normalized) ||
        product.metadata.ingredients?.toLowerCase().includes(normalized),
    );
  }, [products, query]);

  return (
    <>
      <div className="relative mt-10 max-w-md">
        <Search
          className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone"
          strokeWidth={1.5}
        />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="商品名・成分で検索"
          className="w-full border border-sand bg-cream py-3 pl-11 pr-4 text-sm text-charcoal placeholder:text-stone/60 focus:border-forest focus:outline-none"
        />
      </div>

      <div className="mt-16">
        {filteredProducts.length === 0 ? (
          <p className="py-16 text-center text-muted">
            「{query}」に一致する商品が見つかりませんでした。
          </p>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </div>
    </>
  );
}
