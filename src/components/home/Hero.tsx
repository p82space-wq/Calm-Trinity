"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const heroImage =
  "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1920&q=80";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <Image
        src={heroImage}
        alt=""
        fill
        priority
        className="object-cover object-[70%_center]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#F7F3EE] from-25% via-[#F7F3EE]/90 via-55% to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#F7F3EE]/45 via-transparent to-[#F7F3EE]/20" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-center px-6 pb-24 pt-28 lg:px-10 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="w-full max-w-lg rounded-sm bg-[#F7F3EE]/55 p-6 backdrop-blur-[2px] sm:bg-transparent sm:p-0 sm:backdrop-blur-none"
        >
          <p className="text-sm leading-relaxed tracking-[0.06em] text-earth/85 md:text-[15px]">
            がんばるあなたに、こころとからだのご褒美を。
          </p>

          <h1 className="mt-5 font-serif text-[clamp(2.75rem,8vw,5.75rem)] leading-[1.1] tracking-[0.04em] text-forest">
            Calm Trinity
          </h1>

          <p className="mt-4 font-serif text-base tracking-[0.05em] text-earth md:text-xl">
            Bath Salt for a Better Tomorrow
          </p>

          <p className="mt-7 max-w-md text-sm leading-[1.95] text-muted md:text-[15px]">
            薬剤師と心理士が手がけた、大人の女性のためのバスソルトブランド。
            科学的な視点と心のケアを重ね、毎日のバスタイムに
            「癒し」と「整う時間」をお届けします。
          </p>

          <Link
            href="/products"
            className="mt-10 inline-flex items-center gap-3 rounded-full border border-forest/35 bg-cream/80 px-8 py-3.5 text-sm tracking-[0.12em] text-forest backdrop-blur-sm transition-all duration-300 hover:border-forest hover:bg-forest hover:text-cream"
          >
            商品を見る
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.45 }}
          className="pointer-events-none absolute bottom-[16%] right-6 hidden font-script text-3xl leading-snug text-forest/50 lg:right-14 lg:block lg:text-[2.75rem]"
        >
          Take a deep breath,
          <br />
          for yourself.
        </motion.p>
      </div>
    </section>
  );
}
