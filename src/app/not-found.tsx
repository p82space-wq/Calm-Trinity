import Link from "next/link";

import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-xs uppercase tracking-[0.35em] text-stone">404</p>
      <h1 className="mt-4 font-serif text-4xl text-forest">Page Not Found</h1>
      <p className="mt-6 max-w-md leading-relaxed text-muted">
        お探しのページは見つかりませんでした。
        URLをご確認いただくか、トップページへお戻りください。
      </p>
      <Link href="/" className="mt-10">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}
