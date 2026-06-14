import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "プライバシーポリシー",
  description: "Calm Trinity のプライバシーポリシー。",
  path: "/privacy",
});

const sections = [
  {
    title: "個人情報の収集について",
    content:
      "当サイトでは、お問い合わせフォームおよび Stripe 決済において、お名前、メールアドレス、配送先住所、電話番号などの個人情報を収集する場合があります。これらはサービスの提供およびお問い合わせへの対応に必要な範囲で収集します。",
  },
  {
    title: "個人情報の利用目的",
    content:
      "収集した個人情報は、以下の目的で利用します。商品の発送、お問い合わせへの回答、決済処理、サービス改善のための分析、法令に基づく対応。",
  },
  {
    title: "第三者への提供",
    content:
      "当サイトは、以下のサービス提供者に必要な範囲で個人情報の処理を委託します。Stripe（決済処理）、Web3Forms（お問い合わせフォーム）、Vercel（ホスティング）。これらの事業者はそれぞれのプライバシーポリシーに基づき情報を管理します。",
  },
  {
    title: "Cookie の使用",
    content:
      "当サイトでは、カート機能のためにブラウザの localStorage を使用します。また、サイトの利便性向上のため Cookie を使用する場合があります。Cookie の使用はブラウザの設定で無効にできますが、一部機能が利用できなくなる場合があります。",
  },
  {
    title: "個人情報の管理",
    content:
      "当社は、個人情報の漏洩、滅失、毀損を防止するため、適切な安全管理措置を講じます。個人情報は必要な期間保管し、目的達成後は適切に削除します。",
  },
  {
    title: "お問い合わせ",
    content:
      "個人情報の取り扱いに関するお問い合わせは、お問い合わせページまたはメールにてご連絡ください。",
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-section pt-28 lg:pt-32">
      <p className="text-xs uppercase tracking-[0.35em] text-stone">Privacy</p>
      <h1 className="mt-4 font-serif text-4xl tracking-wide text-forest">
        プライバシーポリシー
      </h1>
      <p className="mt-6 text-sm text-muted">最終更新日: 2026年6月1日</p>

      <div className="mt-14 space-y-12">
        {sections.map((section) => (
          <section key={section.title} className="border-t border-sand pt-8">
            <h2 className="font-serif text-xl text-forest">{section.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {section.content}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
