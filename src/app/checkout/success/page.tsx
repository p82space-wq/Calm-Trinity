import { redirect } from "next/navigation";

import { CheckoutSuccessClient } from "@/components/checkout/CheckoutSuccessClient";
import { retrieveCheckoutSession } from "@/lib/checkout";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "ご注文完了",
  description: "ご注文が完了しました。",
  path: "/checkout/success",
  noIndex: true,
});

type CheckoutSuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function CheckoutSuccessPage({
  searchParams,
}: CheckoutSuccessPageProps) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    redirect("/");
  }

  const session = await retrieveCheckoutSession(sessionId);

  if (!session) {
    redirect("/products");
  }

  return <CheckoutSuccessClient session={session} />;
}
