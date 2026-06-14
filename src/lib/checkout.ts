import "server-only";

import type Stripe from "stripe";

import { getStripe } from "@/lib/stripe";
import type {
  CheckoutLineItem,
  CheckoutSessionSummary,
} from "@/types/checkout";

function getProductFromLineItem(
  item: Stripe.LineItem,
): Stripe.Product | null {
  const price = item.price;
  if (!price || typeof price === "string") {
    return null;
  }

  const product = price.product;
  if (!product || typeof product === "string" || product.deleted) {
    return null;
  }

  return product;
}

export async function retrieveCheckoutSession(
  sessionId: string,
): Promise<CheckoutSessionSummary | null> {
  if (!process.env.STRIPE_SECRET_KEY) {
    return null;
  }

  const stripe = getStripe();

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "line_items.data.price.product"],
    });

    if (session.payment_status !== "paid") {
      return null;
    }

    const lineItems: CheckoutLineItem[] = (session.line_items?.data ?? []).map(
      (item) => {
        const product = getProductFromLineItem(item);

        return {
          name: product?.name ?? item.description ?? "商品",
          quantity: item.quantity ?? 1,
          unitAmount: item.price?.unit_amount ?? 0,
          image: product?.images?.[0] ?? null,
        };
      },
    );

    return {
      id: session.id,
      paymentStatus: session.payment_status,
      customerEmail: session.customer_details?.email ?? null,
      amountTotal: session.amount_total ?? 0,
      currency: session.currency ?? "jpy",
      lineItems,
    };
  } catch {
    return null;
  }
}
