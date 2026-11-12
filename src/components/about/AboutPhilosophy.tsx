import Image from "next/image";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function AboutPhilosophy() {
  return (
    <section className="bg-cream py-section">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <ScrollReveal className="order-2 lg:order-1 lg:py-6">
          <p className="text-xs uppercase tracking-[0.28em] text-stone">
            Our Philosophy
          </p>
          <h2 className="mt-5 font-serif text-3xl leading-snug tracking-[0.04em] text-forest md:text-4xl">
            特別なことではなく、
            <br />
            日常の中にある
            <br />
            小さなご褒美を。
          </h2>
          <div className="mt-8 space-y-5 text-sm leading-[2] text-muted md:text-[15px]">
            <p>
              セルフケアは、遠くにある特別な儀式ではなく、
              香りを楽しむこと、湯船に浸かること、
              自分のための時間を少しだけ確保すること。
            </p>
            <p>
              Calm Trinity
              は、そんな日常の小さなご褒美を、Bloom・Mood・Pure
              のバスソルトを通してお届けします。
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="order-1 lg:order-2">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/products/set-v2.jpg"
              alt="Calm Trinity のバスソルト"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
