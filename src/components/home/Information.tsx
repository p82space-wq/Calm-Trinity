import Link from "next/link";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

const newsItems = [
  {
    date: "2026.06.01",
    tag: "NEW",
    title: "Calm Trinity オンラインストア オープンのお知らせ",
    href: "/products",
  },
  {
    date: "2026.05.20",
    tag: "INFO",
    title: "夏季限定「ラベンダー & カモミール」入荷のお知らせ",
    href: "/products",
  },
  {
    date: "2026.05.01",
    tag: "INFO",
    title: "全国一律送料 ¥550 にてお届け",
    href: "/guide",
  },
];

export function Information() {
  return (
    <section className="border-t border-sand bg-linen/50 py-section">
      <div className="mx-auto max-w-3xl px-6">
        <ScrollReveal className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-stone">
            Information
          </p>
          <h2 className="mt-4 font-serif text-3xl text-forest">お知らせ</h2>
        </ScrollReveal>

        <ul className="mt-14 space-y-0">
          {newsItems.map((item, index) => (
            <li key={item.title} className="border-b border-sand">
              <ScrollReveal delay={index * 0.08}>
                <Link
                  href={item.href}
                  className="group flex flex-col gap-2 py-6 transition-colors hover:text-forest sm:flex-row sm:items-center sm:gap-6"
                >
                  <time className="shrink-0 text-xs tracking-wider text-stone">
                    {item.date}
                  </time>
                  <span className="shrink-0 text-[10px] uppercase tracking-[0.15em] text-sage">
                    {item.tag}
                  </span>
                  <span className="text-sm text-charcoal transition-colors group-hover:text-forest">
                    {item.title}
                  </span>
                </Link>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
