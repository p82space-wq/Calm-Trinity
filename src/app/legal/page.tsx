import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "特定商取引法に基づく表記",
  description: "特定商取引法に基づく表記。",
  path: "/legal",
});

const legalItems = [
  { label: "販売業者", value: "Calm Trinity" },
  { label: "運営責任者", value: "代表 藤井 俊（準備中）" },
  { label: "所在地", value: "〒000-0000 京都府京都市（準備中）" },
  {
    label: "電話番号",
    value: "000-0000-0000（受付時間 平日10:00〜18:00）",
  },
  { label: "メールアドレス", value: "hello@calmtrinity.example" },
  { label: "販売価格", value: "各商品ページに税込価格を表示" },
  {
    label: "商品代金以外の必要料金",
    value: "送料 ¥550（税込・全国一律）",
  },
  {
    label: "お支払い方法",
    value: "クレジットカード（Stripe Checkout）",
  },
  { label: "お支払い時期", value: "ご注文時にお支払い" },
  {
    label: "商品の引渡時期",
    value: "ご注文確認後、2〜5営業日以内に発送",
  },
  {
    label: "返品・交換について",
    value:
      "未開封・未使用の商品に限り、到着後7日以内にご連絡いただいた場合に対応。お客様都合の返品は送料お客様負担。",
  },
  {
    label: "不良品について",
    value: "商品に不備があった場合は、送料当店負担で交換または返金いたします。",
  },
];

export default function LegalPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-section pt-28 lg:pt-32">
      <p className="text-xs uppercase tracking-[0.35em] text-stone">Legal</p>
      <h1 className="mt-4 font-serif text-4xl tracking-wide text-forest">
        特定商取引法に基づく表記
      </h1>

      <dl className="mt-14 space-y-6">
        {legalItems.map((item) => (
          <div
            key={item.label}
            className="grid gap-2 border-b border-sand pb-6 sm:grid-cols-[11rem_1fr]"
          >
            <dt className="text-sm font-medium text-forest">{item.label}</dt>
            <dd className="text-sm leading-relaxed text-muted">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
