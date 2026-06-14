"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { X } from "lucide-react";

export function CheckoutStatusBanner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isDismissed, setIsDismissed] = useState(false);

  const isCancelled =
    searchParams.get("checkout") === "cancelled" && !isDismissed;

  if (!isCancelled) {
    return null;
  }

  const handleDismiss = () => {
    setIsDismissed(true);

    const url = new URL(window.location.href);
    url.searchParams.delete("checkout");
    router.replace(`${url.pathname}${url.search}`, { scroll: false });
  };

  return (
    <div className="fixed inset-x-0 top-16 z-40 mx-auto max-w-lg px-6 lg:top-20">
      <div className="flex items-start justify-between gap-4 border border-sand bg-cream px-5 py-4 shadow-sm">
        <p className="text-sm text-charcoal">
          決済がキャンセルされました。カートの内容は保持されています。
        </p>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="通知を閉じる"
          className="shrink-0 text-stone transition-colors hover:text-forest"
        >
          <X className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
