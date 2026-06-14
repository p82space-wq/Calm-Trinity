import { ContactForm } from "@/components/contact/ContactForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { contactEmail } from "@/lib/navigation";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "お問い合わせ",
  description:
    "商品・配送・返品などに関するお問い合わせはこちらから。",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-section pt-28 lg:pt-32">
      <ScrollReveal>
        <p className="text-xs uppercase tracking-[0.35em] text-stone">
          Contact
        </p>
        <h1 className="mt-4 font-serif text-4xl tracking-wide text-forest">
          お問い合わせ
        </h1>
        <p className="mt-6 leading-relaxed text-muted">
          商品に関するご質問、配送・返品についてなど、
          お気軽にお問い合わせください。2営業日以内にご返信いたします。
        </p>
      </ScrollReveal>

      <ScrollReveal className="mt-14" delay={0.1}>
        <ContactForm />
      </ScrollReveal>

      <ScrollReveal className="mt-16 border-t border-sand pt-10" delay={0.2}>
        <h2 className="font-serif text-xl text-forest">その他の連絡方法</h2>
        <dl className="mt-6 space-y-4 text-sm">
          <div>
            <dt className="text-stone">メール</dt>
            <dd className="mt-1 text-charcoal">
              <a
                href={`mailto:${contactEmail}`}
                className="transition-colors hover:text-forest"
              >
                {contactEmail}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-stone">営業時間</dt>
            <dd className="mt-1 text-muted">平日 10:00〜18:00（土日祝を除く）</dd>
          </div>
        </dl>
      </ScrollReveal>
    </div>
  );
}
