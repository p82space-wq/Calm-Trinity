import { NextResponse } from "next/server";
import type Stripe from "stripe";

import {
  constructWebhookEvent,
  handleCheckoutCompleted,
  handleCheckoutExpired,
} from "@/lib/stripe-webhooks";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  const body = await request.text();

  let event: Stripe.Event;

  try {
    event = constructWebhookEvent(body, signature);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "STRIPE_WEBHOOK_SECRET is not set"
    ) {
      return NextResponse.json(
        { error: "Webhook secret is not configured" },
        { status: 500 },
      );
    }

    console.error("Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
      break;
    }
    case "checkout.session.expired": {
      handleCheckoutExpired(event.data.object as Stripe.Checkout.Session);
      break;
    }
    default:
      console.info(`Unhandled webhook event: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
