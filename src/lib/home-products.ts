import type { CalmProduct } from "@/types/product";

export type HomeProductTone = "bloom" | "mood" | "pure" | "set";

export type HomeProductShowcase = {
  key: HomeProductTone;
  title: string;
  scent: string;
  description: string;
  tone: HomeProductTone;
  fallbackImage: string;
  /** 画像枠のアスペクト比（Tailwind aspect-*） */
  imageAspect?: string;
  /** object-position など画像の見せ方 */
  imageClassName?: string;
  match: RegExp;
  /** トップの3カラムから除外し、セット枠で表示 */
  featuredSet?: boolean;
};

export const homeProductShowcases: HomeProductShowcase[] = [
  {
    key: "bloom",
    title: "Bloom",
    scent: "Geranium × Lavender",
    description: "頑張る自分を労るバスソルト。",
    tone: "bloom",
    fallbackImage: "/images/products/bloom-v2.jpg",
    imageAspect: "aspect-[4/5]",
    imageClassName: "object-cover object-center",
    match: /bloom/i,
  },
  {
    key: "mood",
    title: "Mood",
    scent: "Hinoki × Lemongrass",
    description: "日常から少し離れる、静かなバスタイム。",
    tone: "mood",
    fallbackImage: "/images/products/mood-v2.jpg",
    imageAspect: "aspect-[4/5]",
    imageClassName: "object-cover object-center",
    match: /mood/i,
  },
  {
    key: "pure",
    title: "Pure",
    scent: "Unscented × Moisture",
    description: "飾らない自分で過ごす、シンプルな時間。",
    tone: "pure",
    fallbackImage: "/images/products/pure-v3.jpg",
    imageAspect: "aspect-[4/5]",
    imageClassName: "object-cover object-center",
    match: /pure/i,
  },
  {
    key: "set",
    title: "Trinity Set",
    scent: "Bloom × Mood × Pure",
    description:
      "3つの香りを揃えたコンプリートセット。その日の気分に合わせてお選びいただけます。",
    tone: "set",
    fallbackImage: "/images/products/set-v2.jpg",
    imageAspect: "aspect-[4/5]",
    imageClassName: "object-cover object-center",
    match: /trinity\s*set|セット/i,
    featuredSet: true,
  },
];

export type ResolvedHomeProduct = HomeProductShowcase & {
  href: string;
  image: string;
};

export function resolveHomeProducts(
  products: CalmProduct[],
): ResolvedHomeProduct[] {
  return homeProductShowcases.map((showcase) => {
    const matched = products.find((product) => {
      // Bloom Care （１ヶ月）など単品バリエーションをセット判定から除外
      if (showcase.featuredSet) {
        return showcase.match.test(product.name);
      }
      if (/set|セット/i.test(product.name)) {
        return false;
      }
      return showcase.match.test(product.name);
    });

    return {
      ...showcase,
      href: matched ? `/products/${matched.id}` : "/products",
      image: showcase.fallbackImage,
    };
  });
}
