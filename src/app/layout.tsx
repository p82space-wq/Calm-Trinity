import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_JP } from "next/font/google";
import { Suspense } from "react";

import { CheckoutStatusBanner } from "@/components/checkout/CheckoutStatusBanner";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { CartProvider } from "@/providers/CartProvider";
import { createMetadata, organizationJsonLd } from "@/lib/seo";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const notoSans = Noto_Sans_JP({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = createMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${cormorant.variable} ${notoSans.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd data={organizationJsonLd} />
        <CartProvider>
          <Header />
          <Suspense fallback={null}>
            <CheckoutStatusBanner />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <CookieConsent />
        </CartProvider>
      </body>
    </html>
  );
}
