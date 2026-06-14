"use client";

import { useState } from "react";

import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/format";
import type { CalmProduct } from "@/types/product";

type ProductDetailClientProps = {
  product: CalmProduct;
};

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const accordionItems = [
    product.metadata.ingredients && {
      title: "成分",
      content: product.metadata.ingredients,
    },
    product.metadata.usage && {
      title: "使用方法",
      content: product.metadata.usage,
    },
    product.metadata.care && {
      title: "こだわり",
      content: product.metadata.care,
    },
  ].filter(Boolean) as { title: string; content: string }[];

  const handleAddToCart = () => {
    addItem(
      {
        productId: product.id,
        priceId: product.priceId,
        name: product.name,
        unitAmount: product.unitAmount,
        image: product.images[0] ?? null,
      },
      quantity,
    );
  };

  return (
    <div className="flex flex-col">
      {product.metadata.volume && (
        <p className="text-xs uppercase tracking-[0.25em] text-stone">
          {product.metadata.volume}
        </p>
      )}

      <h1 className="mt-3 font-serif text-4xl text-forest md:text-5xl">
        {product.name}
      </h1>

      <p className="mt-6 text-xl text-charcoal">
        {formatPrice(product.unitAmount, product.currency)}
      </p>

      {product.description && (
        <p className="mt-8 leading-relaxed text-muted">{product.description}</p>
      )}

      <div className="mt-10 flex items-center gap-6">
        <div className="flex items-center border border-sand">
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            className="px-4 py-3 text-forest transition-colors hover:bg-linen"
            aria-label="数量を減らす"
          >
            −
          </button>
          <span className="min-w-10 text-center text-sm">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((value) => value + 1)}
            className="px-4 py-3 text-forest transition-colors hover:bg-linen"
            aria-label="数量を増やす"
          >
            +
          </button>
        </div>

        <Button onClick={handleAddToCart} className="flex-1 md:flex-none">
          Add to Cart
        </Button>
      </div>

      {accordionItems.length > 0 && (
        <div className="mt-14">
          <Accordion items={accordionItems} />
        </div>
      )}
    </div>
  );
}
