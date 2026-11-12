import Image from "next/image";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function AboutMessage() {
  return (
    <section className="bg-linen/50 py-section">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <ScrollReveal>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/about/message-reward.jpg"
              alt="キャンドルとバスソルトが並ぶ、心地よいバスタイム"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="lg:py-8">
          <p className="text-xs uppercase tracking-[0.28em] text-stone">
            Our Message
          </p>
          <h2 className="mt-5 font-serif text-3xl leading-snug tracking-[0.04em] text-forest md:text-4xl">
            あなたの毎日に、
            <br />
            心地よいご褒美を。
          </h2>
          <div className="mt-8 space-y-5 text-sm leading-[2] text-muted md:text-[15px]">
            <p>
              誰かと比べることなく、飾らない自分のままでいられる時間。
              その積み重ねが、明日へのやさしい余白になります。
            </p>
            <p>
              がんばるあなたの毎日に、こころとからだを整えるご褒美を。
              Calm Trinity は、静かに寄り添い続けます。
            </p>
          </div>
          <p className="mt-12 font-script text-4xl text-forest/60 md:text-5xl">
            Calm Trinity
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
