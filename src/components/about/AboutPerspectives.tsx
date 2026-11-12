import { Flower2, Heart, Pill } from "lucide-react";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

const perspectives = [
  {
    icon: Pill,
    title: "身体に寄り添う",
    description:
      "薬剤師の知見をもとに、入浴を通してからだをいたわる視点から処方を考えています。",
  },
  {
    icon: Heart,
    title: "心に寄り添う",
    description:
      "心理士の視点から、心のゆらぎにそっと寄り添う時間と香りを大切にしています。",
  },
  {
    icon: Flower2,
    title: "香り",
    description:
      "Bloom・Mood・Pure、それぞれの香りがバスタイムにやさしい余白をつくります。",
  },
];

export function AboutPerspectives() {
  return (
    <section className="relative overflow-hidden bg-linen/70 py-section">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-10 h-72 w-72 rounded-full bg-sage/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-sand/60 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <ScrollReveal className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.28em] text-stone">
            Three Perspectives, One Philosophy.
          </p>
          <h2 className="mt-5 font-serif text-3xl leading-snug tracking-[0.04em] text-forest md:text-4xl">
            薬剤師と心理士、
            <br />
            それぞれの視点から。
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {perspectives.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.1}>
              <item.icon
                className="h-8 w-8 text-forest/70"
                strokeWidth={1.25}
              />
              <h3 className="mt-6 font-serif text-xl tracking-[0.06em] text-forest">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-[1.9] text-muted">
                {item.description}
              </p>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2} className="mt-16 max-w-2xl md:ml-auto">
          <p className="text-sm leading-[2] text-muted md:text-right">
            身体・心・香り。三つの視点が重なり合うことで、
            Calm Trinity
            はがんばる大人の女性にやさしく寄り添うセルフケアを届けます。
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
