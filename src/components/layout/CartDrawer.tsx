"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { ProductImagePlaceholder } from "@/components/ui/ProductImagePlaceholder";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/format";
import { GIFT_WRAP_AMOUNT, GIFT_WRAP_LABEL } from "@/lib/gift-wrap";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    setGiftWrap,
    totalAmount,
    giftWrapAmount,
    clearCart,
  } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (items.length === 0) {
      return;
    }

    setIsCheckingOut(true);
    setCheckoutError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            priceId: item.priceId,
            quantity: item.quantity,
            giftWrap: item.giftWrap,
            name: item.name,
          })),
        }),
      });

      const data = (await response.json()) as {
        url?: string;
        error?: string;
      };

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Checkout failed");
      }

      window.location.href = data.url;
    } catch (error) {
      setCheckoutError(
        error instanceof Error ? error.message : "決済の開始に失敗しました",
      );
      setIsCheckingOut(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-charcoal/40 backdrop-blur-sm"
            onClick={closeCart}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-cream shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-sand px-6 py-5">
              <h2 className="font-serif text-xl tracking-wide text-forest">
                Cart
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="カートを閉じる"
                className="text-forest transition-colors hover:text-moss"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <p className="py-16 text-center text-sm text-muted">
                  カートに商品がありません
                </p>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li
                      key={item.lineId}
                      className="flex gap-4 border-b border-sand pb-6"
                    >
                      <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-linen">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        ) : (
                          <ProductImagePlaceholder
                            label="CT"
                            className="h-full text-sm"
                          />
                        )}
                      </div>

                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm text-forest">{item.name}</p>
                          <button
                            type="button"
                            onClick={() => removeItem(item.lineId)}
                            className="text-xs text-stone transition-colors hover:text-forest"
                          >
                            削除
                          </button>
                        </div>

                        <p className="mt-1 text-sm text-muted">
                          {formatPrice(item.unitAmount)}
                        </p>

                        <label className="mt-3 flex cursor-pointer items-start gap-2 text-xs leading-relaxed text-charcoal">
                          <input
                            type="checkbox"
                            checked={item.giftWrap}
                            onChange={(event) =>
                              setGiftWrap(item.lineId, event.target.checked)
                            }
                            className="mt-0.5 h-3.5 w-3.5 accent-forest"
                          />
                          <span>
                            {GIFT_WRAP_LABEL}
                            <span className="mt-0.5 block text-muted">
                              +{formatPrice(GIFT_WRAP_AMOUNT)}（税込）×
                              {item.quantity}
                            </span>
                          </span>
                        </label>

                        <div className="mt-3 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.lineId, item.quantity - 1)
                            }
                            className="flex h-7 w-7 items-center justify-center border border-sand text-forest transition-colors hover:bg-linen"
                            aria-label="数量を減らす"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="min-w-6 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.lineId, item.quantity + 1)
                            }
                            className="flex h-7 w-7 items-center justify-center border border-sand text-forest transition-colors hover:bg-linen"
                            aria-label="数量を増やす"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-sand px-6 py-6">
                {giftWrapAmount > 0 && (
                  <div className="mb-3 flex items-center justify-between text-sm">
                    <span className="text-muted">{GIFT_WRAP_LABEL}</span>
                    <span className="text-charcoal">
                      {formatPrice(giftWrapAmount)}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-stone">
                    Subtotal
                  </span>
                  <span className="font-serif text-xl text-forest">
                    {formatPrice(totalAmount)}
                  </span>
                </div>

                {checkoutError && (
                  <p className="mt-4 text-xs text-red-700">{checkoutError}</p>
                )}

                <Button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="mt-6 w-full"
                >
                  {isCheckingOut ? "Processing..." : "Checkout"}
                </Button>

                <button
                  type="button"
                  onClick={clearCart}
                  className="mt-4 w-full text-center text-xs text-stone transition-colors hover:text-forest"
                >
                  カートを空にする
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
