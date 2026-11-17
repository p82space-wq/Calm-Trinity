import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "よくあるご質問",
  description:
    "Bloom・Mood・Pure の違い、香り、セット購入、ギフト、保管方法など、よくあるご質問。",
  path: "/faq",
});

const faqs = [
  {
    question: "Bloom・Mood・Pureの違いは何ですか？",
    answer:
      "それぞれ香りが異なります。Bloomはゼラニウムとラベンダー、Moodはヒノキとレモングラス、Pureは無香料タイプです。その日の気分やお好みに合わせてお選びください。",
  },
  {
    question: "香りが苦手でも使用できますか？",
    answer:
      "Pureは無香料タイプです。香りを加えずにバスタイムを楽しみたい方におすすめです。",
  },
  {
    question: "3種類をまとめて購入できますか？",
    answer:
      "はい。Bloom・Mood・Pureを一度にお楽しみいただける3種類セットをご用意しています。",
  },
  {
    question: "ギフトとして購入できますか？",
    answer:
      "はい。商品ページまたはカートでギフト包装（巾着）を選択できます。追加で1点あたり220円（税込）です。",
  },
  {
    question: "妊娠中でも使用できますか？",
    answer:
      "妊娠中の方は、配合成分や使用上の注意をご確認のうえ、必要に応じて医師にご相談ください。",
  },
  {
    question: "保管方法を教えてください。",
    answer:
      "高温多湿や直射日光を避け、乳幼児の手の届かない場所に保管してください。",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-section pt-28 lg:pt-32">
      <p className="text-xs uppercase tracking-[0.35em] text-stone">FAQ</p>
      <h1 className="mt-4 font-serif text-4xl tracking-wide text-forest">
        よくあるご質問
      </h1>
      <dl className="mt-10 space-y-8">
        {faqs.map((faq) => (
          <div key={faq.question} className="border-b border-sand pb-8">
            <dt className="font-medium text-forest">Q. {faq.question}</dt>
            <dd className="mt-3 leading-relaxed text-muted">A. {faq.answer}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
