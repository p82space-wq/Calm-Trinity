"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useState } from "react";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/format";
import type { CalmProduct } from "@/types/product";
import { ProductImagePlaceholder } from "@/components/ui/ProductImagePlaceholder";
import { SafeProductImage } from "@/components/ui/SafeProductImage";

type ProductCardProps = {
  product: CalmProduct;
  className?: string;
  priority?: boolean;
};

export function ProductCard({
  product,
  className = "",
  priority = false,
}: ProductCardProps) {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const mainImage = product.images[0] ?? null;
  const hoverImage = product.metadata.hoverImage ?? mainImage;

  const handleAddToCart = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    addItem({
      productId: product.id,
      priceId: product.priceId,
      name: product.name,
      unitAmount: product.unitAmount,
      image: mainImage,
    });
  };

  return (
    <motion.article
      className={`group relative ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-linen">
          {mainImage ? (
            <>
              <SafeProductImage
                src={mainImage}
                alt={product.name}
                priority={priority}
                quality={92}
                sizes="(max-width: 768px) 50vw, 25vw"
                className={`object-cover object-center transition-opacity duration-500 ease-smooth ${
                  isHovered && hoverImage !== mainImage ? "opacity-0" : "opacity-100"
                }`}
              />
              {hoverImage && hoverImage !== mainImage && (
                <SafeProductImage
                  src={hoverImage}
                  alt=""
                  quality={92}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className={`object-cover object-center transition-opacity duration-500 ease-smooth ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                />
              )}
            </>
          ) : (
            <ProductImagePlaceholder
              label="CT"
              className="h-full text-2xl"
            />
          )}

          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`${product.name}をカートに追加`}
            className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center bg-cream/90 text-forest opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:bg-forest hover:text-cream"
          >
            <Plus className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        <div className="mt-4 space-y-1">
          {product.metadata.volume && (
            <p className="text-[10px] uppercase tracking-[0.2em] text-stone">
              {product.metadata.volume}
            </p>
          )}
          <h3 className="font-serif text-lg text-forest">{product.name}</h3>
          <p className="text-sm text-muted">
            {formatPrice(product.unitAmount, product.currency)}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
