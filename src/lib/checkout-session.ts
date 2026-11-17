import "server-only";

import {
  GIFT_WRAP_LABEL,
  GIFT_WRAP_PRICE_ID,
} from "@/lib/gift-wrap";
import { getStripe } from "@/lib/stripe";

const SHIPPING_FEE = 550;

export type CheckoutLineItemInput = {
  priceId: string;
  quantity: number;
  giftWrap?: boolean;
  name?: string;
};

export type CreateCheckoutSessionResult = {
  sessionId: string;
  url: string;
};

/**
 * POST /v1/checkout/sessions — 1回限り決済用 Checkout Session を作成
 */
export async function createCheckoutSession(
  items: CheckoutLineItemInput[],
): Promise<CreateCheckoutSessionResult> {
  if (!items.length) {
    throw new Error("At least one line item is required");
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const stripe = getStripe();

  const lineItems = items.map((item) => ({
    price: item.priceId,
    quantity: item.quantity,
  }));

  const giftWrapQuantity = items.reduce(
    (sum, item) => sum + (item.giftWrap ? item.quantity : 0),
    0,
  );

  if (giftWrapQuantity > 0) {
    if (!GIFT_WRAP_PRICE_ID) {
      throw new Error("Gift wrap price is not configured");
    }

    lineItems.push({
      price: GIFT_WRAP_PRICE_ID,
      quantity: giftWrapQuantity,
    });
  }

  const giftWrapSummary = items
    .filter((item) => item.giftWrap)
    .map((item) => `${item.name ?? item.priceId}×${item.quantity}`)
    .join(", ")
    .slice(0, 450);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/products?checkout=cancelled`,
    locale: "ja",
    shipping_address_collection: {
      allowed_countries: ["JP"],
    },
    phone_number_collection: {
      enabled: true,
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: SHIPPING_FEE,
            currency: "jpy",
          },
          display_name: "通常配送（ヤマト運輸）",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 2 },
            maximum: { unit: "business_day", value: 5 },
          },
        },
      },
    ],
    metadata: {
      gift_wrap: giftWrapQuantity > 0 ? "true" : "false",
      gift_wrap_quantity: String(giftWrapQuantity),
      gift_wrap_items: giftWrapSummary || "none",
      gift_wrap_label: GIFT_WRAP_LABEL,
    },
    custom_text: {
      submit: {
        message:
          "ご注文確定後、確認メールをお送りします。発送まで2〜5営業日お待ちください。",
      },
    },
  });

  if (!session.url) {
    throw new Error("Checkout session was created without a redirect URL");
  }

  return {
    sessionId: session.id,
    url: session.url,
  };
}
