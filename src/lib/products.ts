import "server-only";

import { unstable_cache } from "next/cache";
import type Stripe from "stripe";

import {
  DEFAULT_USAGE,
  getPrecautionsForProduct,
} from "@/lib/product-copy";
import {
  fetchStripeProductById,
  fetchStripeProducts,
} from "@/lib/stripe";
import type { CalmProduct, ProductMetadata } from "@/types/product";

function parseMetadata(
  metadata: Stripe.Metadata,
  productName: string,
): ProductMetadata {
  const subImages = metadata.sub_images
    ?.split(",")
    .map((url) => url.trim())
    .filter(Boolean);

  // 「250g」などのグラム表記は表示しない
  const rawVolume = metadata.volume?.trim();
  const volume =
    rawVolume && !/\d+\s*g$/i.test(rawVolume) ? rawVolume : undefined;

  return {
    ingredients: metadata.ingredients || undefined,
    volume,
    usage: metadata.usage || DEFAULT_USAGE,
    precautions: getPrecautionsForProduct(productName),
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
  if (stripeProduct.metadata?.kind === "addon") {
    return null;
  }

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

  const localImages = resolveLocalProductImages(stripeProduct.name);

  return {
    id: stripeProduct.id,
    name: stripeProduct.name,
    description: stripeProduct.description,
    images: localImages ?? stripeProduct.images,
    priceId: defaultPrice.id,
    unitAmount: defaultPrice.unit_amount,
    currency: defaultPrice.currency,
    metadata: parseMetadata(stripeProduct.metadata, stripeProduct.name),
  };
}

/** ローカルに用意した商品写真があれば Stripe 画像より優先 */
function resolveLocalProductImages(name: string): string[] | null {
  if (/trinity\s*set|セット/i.test(name)) {
    return ["/images/products/set-v3.jpg"];
  }
  if (/bloom/i.test(name)) {
    return ["/images/products/bloom-v2.jpg"];
  }
  if (/mood/i.test(name)) {
    return ["/images/products/mood-v2.jpg"];
  }
  if (/pure/i.test(name)) {
    return ["/images/products/pure-v3.jpg"];
  }

  return null;
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
  ["stripe-products-v20"],
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
