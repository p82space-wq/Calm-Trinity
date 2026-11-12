import { newsItems } from "@/lib/news";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "News",
  description:
    "Calm Trinityのお知らせ。マルシェ出店など、最新情報をお届けします。",
  path: "/news",
});

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-section pt-28 lg:pt-32">
      <p className="text-xs uppercase tracking-[0.35em] text-stone">News</p>
      <h1 className="mt-4 font-serif text-4xl tracking-wide text-forest">
        お知らせ
      </h1>

      <ul className="mt-12 space-y-10">
        {newsItems.map((item) => (
          <li key={item.id} className="border-b border-sand pb-10">
            <div className="flex flex-wrap items-center gap-3">
              <time className="text-xs tracking-wider text-stone">
                {item.date}
              </time>
              <span className="text-[10px] uppercase tracking-[0.15em] text-sage">
                {item.tag}
              </span>
            </div>
            <h2 className="mt-4 font-serif text-2xl text-forest">
              {item.title}
            </h2>
            <p className="mt-5 leading-relaxed text-muted">{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
