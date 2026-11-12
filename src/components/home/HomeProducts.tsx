import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { ResolvedHomeProduct } from "@/lib/home-products";

type HomeProductsProps = {
  products: ResolvedHomeProduct[];
};

const toneStyles = {
  bloom: {
    panel: "bg-[#F3E6E6]",
    accent: "text-[#8B5E63]",
  },
  mood: {
    panel: "bg-[#E4E8E2]",
    accent: "text-[#5C6B5A]",
  },
  pure: {
    panel: "bg-[#EDE6DF]",
    accent: "text-[#7A6A5A]",
  },
  set: {
    panel: "bg-[#F0EBE4]",
    accent: "text-[#6B5E52]",
  },
} as const;

export function HomeProducts({ products }: HomeProductsProps) {
  const singles = products.filter((product) => !product.featuredSet);
  const setProduct = products.find((product) => product.featuredSet);

  return (
    <section className="bg-cream py-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <ScrollReveal className="text-center">
          <div className="flex items-center justify-center gap-6">
            <span className="hidden h-px w-16 bg-sand sm:block" />
            <h2 className="font-serif text-3xl tracking-[0.08em] text-forest md:text-4xl">
              Our Products
            </h2>
            <span className="hidden h-px w-16 bg-sand sm:block" />
          </div>
          <p className="mt-5 text-sm tracking-[0.06em] text-muted">
            それぞれの気分に寄り添う、3つの香り
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {singles.map((product, index) => {
            const tone = toneStyles[product.tone];

            return (
              <ScrollReveal key={product.key} delay={index * 0.1}>
                <article
                  className={`${tone.panel} flex h-full flex-col overflow-hidden`}
                >
                  <div
                    className={`relative overflow-hidden ${product.imageAspect ?? "aspect-[4/5]"}`}
                  >
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      quality={92}
                      className={
                        product.imageClassName ??
                        "object-cover object-center"
                      }
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  <div className="flex flex-1 flex-col px-7 py-8">
                    <h3 className="font-serif text-2xl tracking-[0.06em] text-forest">
                      {product.title}
                    </h3>
                    <p
                      className={`mt-2 text-xs uppercase tracking-[0.18em] ${tone.accent}`}
                    >
                      {product.scent}
                    </p>
                    <p className="mt-5 text-sm leading-relaxed text-muted">
                      {product.description}
                    </p>
                    <Link
                      href={product.href}
                      className="mt-8 inline-flex items-center gap-2 self-start rounded-full border border-forest/30 bg-cream/60 px-5 py-2.5 text-xs tracking-[0.14em] text-forest transition-colors duration-300 hover:border-forest hover:bg-forest hover:text-cream"
                    >
                      詳しく見る
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        {setProduct && (
          <ScrollReveal className="mt-20" delay={0.15}>
            <article
              className={`${toneStyles.set.panel} grid overflow-hidden lg:grid-cols-2`}
            >
              <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[28rem]">
                <Image
                  src={setProduct.image}
                  alt={setProduct.title}
                  fill
                  quality={92}
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col justify-center px-8 py-12 lg:px-14">
                <p
                  className={`text-xs uppercase tracking-[0.2em] ${toneStyles.set.accent}`}
                >
                  Complete Set
                </p>
                <h3 className="mt-4 font-serif text-3xl tracking-[0.06em] text-forest md:text-4xl">
                  {setProduct.title}
                </h3>
                <p
                  className={`mt-3 text-xs uppercase tracking-[0.18em] ${toneStyles.set.accent}`}
                >
                  {setProduct.scent}
                </p>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
                  {setProduct.description}
                </p>
                <Link
                  href={setProduct.href}
                  className="mt-10 inline-flex items-center gap-2 self-start rounded-full border border-forest/30 bg-cream/70 px-6 py-3 text-xs tracking-[0.14em] text-forest transition-colors duration-300 hover:border-forest hover:bg-forest hover:text-cream"
                >
                  セットを見る
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </Link>
              </div>
            </article>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
