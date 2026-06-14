import type { CalmProduct } from "@/types/product";

import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: CalmProduct[];
  variant?: "default" | "featured";
};

const gridPatterns = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-2",
  "md:col-span-1",
  "md:col-span-1",
];

function getGridClass(index: number, variant: "default" | "featured"): string {
  if (variant === "featured") {
    return gridPatterns[index % gridPatterns.length];
  }

  return "md:col-span-1";
}

export function ProductGrid({
  products,
  variant = "default",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="py-16 text-center text-muted">
        現在表示できる商品がありません。
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6 md:gap-y-14">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index < 2}
          className={getGridClass(index, variant)}
        />
      ))}
    </div>
  );
}
