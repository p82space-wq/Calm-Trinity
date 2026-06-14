import type { Metadata } from "next";

import { contactEmail } from "@/lib/navigation";

export const siteConfig = {
  name: "Calm Trinity",
  title: "Calm Trinity | Organic Bath Salt",
  description:
    "植物の恵みを感じる、オーガニックで上質なバスソルトブランド。厳選された天然素材で、心と体をやさしく整える入浴体験をお届けします。",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "ja_JP",
  twitterHandle: "@calmtrinity",
};

type CreateMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  image?: string | null;
  noIndex?: boolean;
};

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "",
  image,
  noIndex = false,
}: CreateMetadataOptions = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? `${siteConfig.url}/opengraph-image`;

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: pageTitle,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

export function createProductJsonLd(product: {
  id: string;
  name: string;
  description: string | null;
  images: string[];
  unitAmount: number;
  currency: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? undefined,
    image: product.images.length > 0 ? product.images : undefined,
    url: `${siteConfig.url}/products/${product.id}`,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "Offer",
      price: product.unitAmount,
      priceCurrency: product.currency.toUpperCase(),
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/products/${product.id}`,
    },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  contactPoint: {
    "@type": "ContactPoint",
    email: contactEmail,
    contactType: "customer service",
    availableLanguage: "Japanese",
  },
};
