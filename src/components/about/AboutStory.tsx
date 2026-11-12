import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function AboutStory() {
  return (
    <section className="bg-cream py-section">
      <div className="mx-auto max-w-2xl px-6 lg:px-10">
        <ScrollReveal>
          <p className="font-serif text-2xl leading-snug tracking-[0.04em] text-forest md:text-3xl">
            忙しい毎日の中で、自分のことを
            <br className="hidden sm:block" />
            後回しにしてしまうことはありませんか。
          </p>
          <div className="mt-10 space-y-6 text-sm leading-[2] text-muted md:text-[15px]">
            <p>
              仕事も、家のことも、大切な人のことも。
              がんばるほどに、自分のことは後回しになりがちです。
            </p>
            <p>
              Calm Trinity
              は、そんな毎日の中に「自分を大切にする時間」をそっと取り戻すために生まれました。
            </p>
            <p>
              薬剤師と心理士の視点から、こころとからだの両面に寄り添うセルフケアを、
              いつものバスタイムへお届けします。
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
