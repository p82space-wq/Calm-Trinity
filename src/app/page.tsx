import { About } from "@/components/home/About";
import { Hero } from "@/components/home/Hero";
import { HomeProducts } from "@/components/home/HomeProducts";
import { resolveHomeProducts } from "@/lib/home-products";
import { getProducts } from "@/lib/products";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata();

export default async function Home() {
  const products = await getProducts();
  const homeProducts = resolveHomeProducts(products);

  return (
    <>
      <Hero />
      <HomeProducts products={homeProducts} />
      <About />
    </>
  );
}
