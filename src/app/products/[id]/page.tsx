import { notFound } from "next/navigation";

import { ProductDetailClient } from "@/components/products/ProductDetailClient";
import { ProductGallery } from "@/components/products/ProductGallery";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { JsonLd } from "@/components/seo/JsonLd";
import { getProductById, getRelatedProducts } from "@/lib/products";
import { createMetadata, createProductJsonLd } from "@/lib/seo";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return createMetadata({ title: "Product Not Found", noIndex: true });
  }

  return createMetadata({
    title: product.name,
    description:
      product.description ??
      `${product.name} — Calm Trinity のオーガニックバスソルト。`,
    path: `/products/${product.id}`,
    image: product.images[0] ?? null,
  });
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(id);
  const galleryImages = [
    ...product.images,
    ...(product.metadata.subImages ?? []),
  ].filter((image, index, array) => array.indexOf(image) === index);

  return (
    <>
      <JsonLd data={createProductJsonLd(product)} />
      <div className="mx-auto max-w-7xl px-6 pb-section pt-28 lg:pt-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <ProductGallery images={galleryImages} productName={product.name} />
          <ProductDetailClient product={product} />
        </div>
        <RelatedProducts products={relatedProducts} />
      </div>
    </>
  );
}
