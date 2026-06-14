import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "FAQ",
  description: "よくあるご質問。送料、返品、お支払い方法について。",
  path: "/faq",
});

const faqs = [
  {
    question: "送料はかかりますか？",
    answer:
      "送料は全国一律 ¥550（税込）です。離島・一部地域へのお届けは対象外となる場合があります。",
  },
  {
    question: "返品・交換はできますか？",
    answer:
      "未開封・未使用の商品に限り、到着後7日以内にご連絡いただいた場合に対応いたします。",
  },
  {
    question: "お支払い方法は？",
    answer:
      "Stripe Checkout を通じてクレジットカード決済（Visa / Mastercard / American Express / JCB）に対応しています。",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-section pt-28 lg:pt-32">
      <h1 className="font-serif text-4xl tracking-wide text-forest">FAQ</h1>
      <dl className="mt-10 space-y-8">
        {faqs.map((faq) => (
          <div key={faq.question} className="border-b border-sand pb-8">
            <dt className="font-medium text-forest">{faq.question}</dt>
            <dd className="mt-3 leading-relaxed text-muted">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
