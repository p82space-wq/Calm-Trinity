import { ProductsPageClient } from "@/components/products/ProductsPageClient";
import { getProducts } from "@/lib/products";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Products",
  description: "バスソルトのラインナップ。植物の恵みを凝縮した上質なコレクション。",
  path: "/products",
});

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-7xl px-6 pb-section pt-28 lg:pt-32">
      <div className="max-w-xl">
        <p className="text-xs uppercase tracking-[0.35em] text-stone">
          Collection
        </p>
        <h1 className="mt-4 font-serif text-4xl tracking-wide text-forest md:text-5xl">
          Products
        </h1>
        <p className="mt-6 leading-relaxed text-muted">
          植物の恵みを凝縮したバスソルトのラインナップ。
          お好みの香りとテクスチャをお選びください。
        </p>
      </div>

      <ProductsPageClient products={products} />
    </div>
  );
}
