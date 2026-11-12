import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-linen/60 py-section">
      <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
        <ScrollReveal>
          <h2 className="font-serif text-3xl leading-snug tracking-[0.04em] text-forest md:text-4xl">
            3つの視点が重なり、
            <br />
            ひとつのセルフケアへ。
          </h2>
          <p className="mt-5 font-serif text-lg tracking-[0.18em] text-earth md:text-xl">
            からだ・こころ・香り
          </p>
          <div className="mt-8 space-y-4 text-sm leading-[1.95] text-muted">
            <p>3つの視点から生まれたCalm Trinity。</p>
            <p>私たちが大切にしている想いをご紹介します。</p>
          </div>
          <Link
            href="/about"
            className="mt-10 inline-flex items-center gap-3 rounded-full border border-forest/40 bg-cream/80 px-7 py-3 text-sm tracking-[0.12em] text-forest transition-all duration-300 hover:border-forest hover:bg-forest hover:text-cream"
          >
            私たちについて
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
