"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/Button";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="ja">
      <body className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center font-sans text-charcoal">
        <p className="text-xs uppercase tracking-[0.35em] text-stone">Error</p>
        <h1 className="mt-4 font-serif text-3xl text-forest">
          予期しないエラーが発生しました
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
          申し訳ございません。ページの表示中に問題が発生しました。
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
      </body>
    </html>
  );
}
