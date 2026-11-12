"use client";

import { useState } from "react";

import { ProductImagePlaceholder } from "@/components/ui/ProductImagePlaceholder";
import { SafeProductImage } from "@/components/ui/SafeProductImage";

type ProductGalleryProps = {
  images: string[];
  productName: string;
};

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const galleryImages = images.length > 0 ? images : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = galleryImages[activeIndex];

  if (!activeImage) {
    return <ProductImagePlaceholder label="CT" className="aspect-[4/5] text-4xl" />;
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/5] overflow-hidden bg-linen">
        <SafeProductImage
          src={activeImage}
          alt={productName}
          priority
          quality={92}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center"
        />
      </div>

      {galleryImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {galleryImages.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative aspect-square overflow-hidden bg-linen ${
                index === activeIndex ? "ring-1 ring-forest" : "opacity-70"
              }`}
            >
              <SafeProductImage
                src={image}
                alt=""
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
