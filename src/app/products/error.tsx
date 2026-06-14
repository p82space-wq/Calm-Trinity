"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/Button";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ProductsError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Products page error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-xs uppercase tracking-[0.35em] text-stone">Error</p>
      <h1 className="mt-4 font-serif text-3xl text-forest">
        商品の読み込みに失敗しました
      </h1>
      <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
        一時的なエラーが発生しました。しばらく経ってから再度お試しください。
      </p>
      <div className="mt-10 flex gap-4">
        <Button onClick={reset}>再試行</Button>
        <Link
          href="/"
          className="inline-flex items-center px-8 py-3 text-xs uppercase tracking-[0.2em] text-stone transition-colors hover:text-forest"
        >
          トップへ戻る
        </Link>
      </div>
    </div>
  );
}
