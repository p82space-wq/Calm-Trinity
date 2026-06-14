import "server-only";

import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }

  if (!stripeClient) {
    stripeClient = new Stripe(secretKey, {
      typescript: true,
    });
  }

  return stripeClient;
}

export type CreateProductWithPriceInput = {
  name: string;
  description?: string;
  images?: string[];
  metadata?: Record<string, string>;
  currency: string;
  unitAmount: number;
};

export type CreateProductWithPriceResult = {
  productId: string;
  priceId: string;
};

/**
 * POST /v1/products — 1回限り決済用の Product + Default Price を作成
 */
export async function createProductWithPrice(
  input: CreateProductWithPriceInput,
): Promise<CreateProductWithPriceResult> {
  const stripe = getStripe();

  const product = await stripe.products.create({
    name: input.name,
    description: input.description,
    images: input.images,
    metadata: input.metadata,
    default_price_data: {
      currency: input.currency,
      unit_amount: input.unitAmount,
    },
  });

  const defaultPrice = product.default_price;

  if (!defaultPrice || typeof defaultPrice === "string") {
    throw new Error(`Product "${product.id}" was created without a default price`);
  }

  return {
    productId: product.id,
    priceId: defaultPrice.id,
  };
}

export async function fetchStripeProducts(): Promise<Stripe.Product[]> {
  if (!process.env.STRIPE_SECRET_KEY) {
    return [];
  }

  const stripe = getStripe();
  const products: Stripe.Product[] = [];
  let hasMore = true;
  let startingAfter: string | undefined;

  while (hasMore) {
    const response = await stripe.products.list({
      active: true,
      limit: 100,
      expand: ["data.default_price"],
      ...(startingAfter ? { starting_after: startingAfter } : {}),
    });

    products.push(...response.data);
    hasMore = response.has_more;

    if (response.data.length > 0) {
      startingAfter = response.data[response.data.length - 1].id;
    }
  }

  return products;
}

export async function fetchStripeProductById(
  id: string,
): Promise<Stripe.Product | null> {
  if (!process.env.STRIPE_SECRET_KEY) {
    return null;
  }

  const stripe = getStripe();

  try {
    return await stripe.products.retrieve(id, {
      expand: ["default_price"],
    });
  } catch (error) {
    if (
      error instanceof Stripe.errors.StripeInvalidRequestError &&
      error.code === "resource_missing"
    ) {
      return null;
    }

    throw error;
  }
}
