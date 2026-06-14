"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { X } from "lucide-react";

const CONSENT_KEY = "calm-trinity-cookie-consent";

function subscribe(callback: () => void) {
  const handler = () => callback();
  window.addEventListener("storage", handler);
  window.addEventListener("cookie-consent-change", handler);

  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("cookie-consent-change", handler);
  };
}

function getConsentSnapshot(): boolean {
  return localStorage.getItem(CONSENT_KEY) === "accepted";
}

function getServerConsentSnapshot(): boolean {
  return true;
}

export function CookieConsent() {
  const hasConsented = useSyncExternalStore(
    subscribe,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    window.dispatchEvent(new Event("cookie-consent-change"));
  };

  if (hasConsented) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-sand bg-cream/95 px-6 py-4 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-muted">
          当サイトでは、カート機能および利便性向上のために Cookie / localStorage
          を使用します。詳細は
          <Link href="/privacy" className="text-forest hover:underline">
            プライバシーポリシー
          </Link>
          をご確認ください。
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={handleAccept}
            className="bg-forest px-6 py-2 text-xs uppercase tracking-[0.15em] text-cream transition-colors hover:bg-moss"
          >
            同意する
          </button>
          <button
            type="button"
            onClick={handleAccept}
            aria-label="閉じる"
            className="text-stone transition-colors hover:text-forest"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
