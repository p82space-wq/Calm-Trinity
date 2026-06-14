import { NextResponse } from "next/server";

import { createCheckoutSession } from "@/lib/checkout-session";

type CheckoutRequestBody = {
  items: { priceId: string; quantity: number }[];
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutRequestBody;

    if (!body.items?.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const { url, sessionId } = await createCheckoutSession(body.items);

    return NextResponse.json({ url, sessionId });
  } catch (error) {
    console.error("Checkout error:", error);

    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
