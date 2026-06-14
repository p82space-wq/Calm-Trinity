import { ScrollReveal } from "@/components/ui/ScrollReveal";

const stories = [
  {
    title: "厳選された天然素材",
    description:
      "地中海産の天然海塩と、オーガニック認証を受けた植物由来の精油のみを使用。肌にやさしい処方で、毎日のバスタイムを特別な時間へ。",
  },
  {
    title: "手仕事の温もり",
    description:
      "京都の小さな工房で、熟練の職人が一つひとつ丁寧にブレンド。大量生産では味わえない、繊細な香りのバランスを大切にしています。",
  },
  {
    title: "地球への配慮",
    description:
      "再生可能な原料の使用、プラスチックフリーのパッケージ、リフィル対応。美しさと環境への思いやりを両立したプロダクトづくりを続けています。",
  },
];

export function BrandStory() {
  return (
    <section className="bg-cream py-section">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-stone">
            About Us
          </p>
          <h2 className="mt-4 font-serif text-4xl text-forest">
            素材へのこだわり
          </h2>
          <p className="mt-8 leading-relaxed text-muted">
            Calm Trinity は、植物の恵みを活かしたバスソルトブランドです。
            自然の力を借りて、心と体を整える上質な入浴体験をお届けします。
          </p>
        </ScrollReveal>

        <div className="mt-20 grid gap-12 md:grid-cols-3 md:gap-8">
          {stories.map((story, index) => (
            <ScrollReveal
              key={story.title}
              delay={index * 0.1}
              className="border-t border-sand pt-8"
            >
              <span className="font-serif text-3xl text-sage/60">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-serif text-xl text-forest">
                {story.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {story.description}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
