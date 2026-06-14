import "server-only";

import type Stripe from "stripe";

import { getStripe } from "@/lib/stripe";

/**
 * Webhook 署名を検証し Stripe Event を返す
 */
export function constructWebhookEvent(
  body: string,
  signature: string,
): Stripe.Event {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not set");
  }

  return getStripe().webhooks.constructEvent(body, signature, webhookSecret);
}

export type CheckoutCompletedPayload = {
  sessionId: string;
  paymentStatus: string | null;
  customerEmail: string | null;
  amountTotal: number | null;
  currency: string | null;
};

/**
 * checkout.session.completed イベントを処理
 * DBレス構成のため、注文の正は Stripe Dashboard に委ねる
 */
export function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
): CheckoutCompletedPayload {
  const payload: CheckoutCompletedPayload = {
    sessionId: session.id,
    paymentStatus: session.payment_status,
    customerEmail: session.customer_details?.email ?? null,
    amountTotal: session.amount_total,
    currency: session.currency,
  };

  console.info("Checkout completed:", payload);

  return payload;
}

export function handleCheckoutExpired(session: Stripe.Checkout.Session): void {
  console.info("Checkout session expired:", { sessionId: session.id });
}
