import { NextResponse } from "next/server";

import { createCheckoutSession } from "@/lib/checkout-session";

type CheckoutRequestBody = {
  items: {
    priceId: string;
    quantity: number;
    giftWrap?: boolean;
    name?: string;
  }[];
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutRequestBody;

    if (!body.items?.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const items = body.items.filter(
      (item) =>
        typeof item.priceId === "string" &&
        item.priceId.length > 0 &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0,
    );

    if (!items.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const { url, sessionId } = await createCheckoutSession(items);

    return NextResponse.json({ url, sessionId });
  } catch (error) {
    console.error("Checkout error:", error);

    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
