"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/Button";
import { ProductImagePlaceholder } from "@/components/ui/ProductImagePlaceholder";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/format";
import type { CheckoutSessionSummary } from "@/types/checkout";

type CheckoutSuccessClientProps = {
  session: CheckoutSessionSummary;
};

export function CheckoutSuccessClient({ session }: CheckoutSuccessClientProps) {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="mx-auto max-w-2xl px-6 pb-section pt-28 text-center lg:pt-32">
      <p className="text-xs uppercase tracking-[0.35em] text-sage">
        Order Confirmed
      </p>
      <h1 className="mt-4 font-serif text-4xl text-forest">
        ご注文ありがとうございます
      </h1>
      <p className="mt-6 leading-relaxed text-muted">
        ご注文を承りました。確認メールをお送りしておりますので、
        ご確認ください。
      </p>

      {session.customerEmail && (
        <p className="mt-4 text-sm text-charcoal">
          送信先: {session.customerEmail}
        </p>
      )}

      <div className="mt-12 border border-sand bg-linen/40 p-8 text-left">
        <h2 className="font-serif text-xl text-forest">ご注文内容</h2>
        <ul className="mt-6 space-y-4">
          {session.lineItems.map((item) => (
            <li
              key={`${item.name}-${item.unitAmount}`}
              className="flex items-center gap-4"
            >
              <div className="relative h-16 w-14 shrink-0 overflow-hidden bg-linen">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                ) : (
                  <ProductImagePlaceholder
                    label="CT"
                    className="h-full text-sm"
                  />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm text-forest">{item.name}</p>
                <p className="mt-1 text-xs text-muted">数量: {item.quantity}</p>
              </div>
              <p className="text-sm text-charcoal">
                {formatPrice(item.unitAmount * item.quantity, session.currency)}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-center justify-between border-t border-sand pt-6">
          <span className="text-xs uppercase tracking-[0.2em] text-stone">
            Total
          </span>
          <span className="font-serif text-2xl text-forest">
            {formatPrice(session.amountTotal, session.currency)}
          </span>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
        <Link
          href="/guide"
          className="text-xs uppercase tracking-[0.2em] text-stone transition-colors hover:text-forest"
        >
          ご利用ガイドを見る
        </Link>
      </div>
    </div>
  );
}
