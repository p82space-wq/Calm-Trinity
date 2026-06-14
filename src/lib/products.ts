import "server-only";

import { unstable_cache } from "next/cache";
import type Stripe from "stripe";

import {
  fetchStripeProductById,
  fetchStripeProducts,
} from "@/lib/stripe";
import type { CalmProduct, ProductMetadata } from "@/types/product";

function parseMetadata(metadata: Stripe.Metadata): ProductMetadata {
  const subImages = metadata.sub_images
    ?.split(",")
    .map((url) => url.trim())
    .filter(Boolean);

  return {
    ingredients: metadata.ingredients || undefined,
    volume: metadata.volume || undefined,
    usage: metadata.usage || undefined,
    care: metadata.care || undefined,
    hoverImage: metadata.hover_image || undefined,
    subImages: subImages?.length ? subImages : undefined,
    featured: metadata.featured === "true",
    sortOrder: metadata.sort_order
      ? Number.parseInt(metadata.sort_order, 10)
      : undefined,
  };
}

export function toCalmProduct(
  stripeProduct: Stripe.Product,
): CalmProduct | null {
  const defaultPrice = stripeProduct.default_price;

  if (!defaultPrice || typeof defaultPrice === "string") {
    return null;
  }

  if (!defaultPrice.active) {
    return null;
  }

  if (defaultPrice.currency !== "jpy") {
    console.warn(
      `Product "${stripeProduct.id}" has unsupported currency: ${defaultPrice.currency}`,
    );
    return null;
  }

  if (defaultPrice.unit_amount == null) {
    return null;
  }

  return {
    id: stripeProduct.id,
    name: stripeProduct.name,
    description: stripeProduct.description,
    images: stripeProduct.images,
    priceId: defaultPrice.id,
    unitAmount: defaultPrice.unit_amount,
    currency: defaultPrice.currency,
    metadata: parseMetadata(stripeProduct.metadata),
  };
}

function sortProducts(products: CalmProduct[]): CalmProduct[] {
  return [...products].sort((a, b) => {
    const orderA = a.metadata.sortOrder ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.metadata.sortOrder ?? Number.MAX_SAFE_INTEGER;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return a.name.localeCompare(b.name, "ja");
  });
}

const getCachedStripeProducts = unstable_cache(
  async () => fetchStripeProducts(),
  ["stripe-products"],
  { revalidate: 60 },
);

export async function getProducts(): Promise<CalmProduct[]> {
  const stripeProducts = await getCachedStripeProducts();

  return sortProducts(
    stripeProducts
      .map(toCalmProduct)
      .filter((product): product is CalmProduct => product !== null),
  );
}

export async function getProductById(
  id: string,
): Promise<CalmProduct | null> {
  const stripeProduct = await fetchStripeProductById(id);

  if (!stripeProduct || !stripeProduct.active) {
    return null;
  }

  return toCalmProduct(stripeProduct);
}

export async function getFeaturedProducts(): Promise<CalmProduct[]> {
  const products = await getProducts();

  return products.filter((product) => product.metadata.featured);
}

export async function getRelatedProducts(
  excludeId: string,
  limit = 3,
): Promise<CalmProduct[]> {
  const products = await getProducts();

  return products.filter((product) => product.id !== excludeId).slice(0, limit);
}
