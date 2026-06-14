import { contactEmail } from "@/lib/navigation";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "ご利用ガイド",
  description: "ご注文の流れ、お支払い方法、配送、返品についてのご案内。",
  path: "/guide",
});

const sections = [
  {
    title: "ご注文の流れ",
    steps: [
      "商品ページまたは一覧から、お好みのバスソルトをカートに追加します。",
      "カートアイコンから内容を確認し、「Checkout」ボタンを押します。",
      "Stripe の安全な決済ページで、お届け先とお支払い情報を入力します。",
      "決済完了後、確認メールが届きます。商品の発送準備を行います。",
    ],
  },
  {
    title: "お支払い方法",
    content:
      "クレジットカード（Visa / Mastercard / American Express / JCB）に対応しています。決済は Stripe を通じて安全に処理されます。お支払い情報は当店のサーバーには保存されません。",
  },
  {
    title: "配送について",
    content:
      "ご注文確認後、2〜5営業日以内に発送いたします。配送は日本国内に限らせていただきます。送料は離島を除く全国一律 ¥550（税込）です。",
  },
  {
    title: "返品・交換について",
    content:
      "未開封・未使用の商品に限り、商品到着後7日以内にご連絡いただいた場合、返品・交換に対応いたします。お客様都合による返品の場合、送料はお客様負担となります。商品に不備があった場合は、送料当店負担で対応いたします。",
  },
  {
    title: "お問い合わせ",
    content:
      `ご不明な点がございましたら、お問い合わせページまたは ${contactEmail} までお気軽にご連絡ください。営業時間: 平日 10:00〜18:00（土日祝を除く）`,
  },
];

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-section pt-28 lg:pt-32">
      <p className="text-xs uppercase tracking-[0.35em] text-stone">Guide</p>
      <h1 className="mt-4 font-serif text-4xl tracking-wide text-forest">
        ご利用ガイド
      </h1>
      <p className="mt-6 leading-relaxed text-muted">
        ご注文からお届けまでの流れ、お支払い方法、配送についてのご案内です。
      </p>

      <div className="mt-16 space-y-14">
        {sections.map((section) => (
          <section key={section.title} className="border-t border-sand pt-10">
            <h2 className="font-serif text-2xl text-forest">{section.title}</h2>
            {"steps" in section && section.steps ? (
              <ol className="mt-6 space-y-4">
                {section.steps.map((step, index) => (
                  <li key={step} className="flex gap-4 text-sm leading-relaxed">
                    <span className="shrink-0 font-serif text-lg text-sage">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-muted">{step}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-6 text-sm leading-relaxed text-muted">
                {section.content}
              </p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
