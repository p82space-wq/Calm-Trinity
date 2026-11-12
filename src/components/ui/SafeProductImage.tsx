"use client";

import Image from "next/image";
import { useState } from "react";

import { ProductImagePlaceholder } from "@/components/ui/ProductImagePlaceholder";

type SafeProductImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  quality?: number;
};

export function SafeProductImage({
  src,
  alt,
  fill = true,
  priority = false,
  sizes,
  className = "",
  quality = 90,
}: SafeProductImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <ProductImagePlaceholder label="CT" className={`h-full text-2xl ${className}`} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      priority={priority}
      sizes={sizes}
      quality={quality}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
