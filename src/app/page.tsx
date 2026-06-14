import { BrandStory } from "@/components/home/BrandStory";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";
import { Information } from "@/components/home/Information";
import { getFeaturedProducts, getProducts } from "@/lib/products";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata();

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const allProducts = await getProducts();
  const displayProducts =
    featuredProducts.length > 0
      ? featuredProducts
      : allProducts.slice(0, 6);

  return (
    <>
      <Hero />
      <BrandStory />
      <FeaturedProducts products={displayProducts} />
      <Information />
    </>
  );
}
