"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const heroImage =
  "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1920&q=80";

export function AboutHero() {
  return (
    <section className="relative min-h-[78svh] overflow-hidden lg:min-h-[88svh]">
      <Image
        src={heroImage}
        alt=""
        fill
        priority
        className="object-cover object-[72%_center]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#F7F3EE] from-20% via-[#F7F3EE]/92 via-48% to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#F7F3EE]/35 via-transparent to-[#F7F3EE]/15" />

      <div className="relative z-10 mx-auto flex min-h-[78svh] max-w-7xl items-center px-6 pb-20 pt-28 lg:min-h-[88svh] lg:px-10 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-xl"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-stone">
            About
          </p>
          <p className="mt-3 text-sm tracking-[0.08em] text-earth/80">
            Calm Trinityについて
          </p>
          <h1 className="mt-8 font-serif text-[clamp(1.75rem,4.2vw,2.75rem)] leading-[1.45] tracking-[0.04em] text-forest">
            <span className="inline-block whitespace-nowrap">
              自分をいたわる時間を、
            </span>
            <br />
            <span className="inline-block whitespace-nowrap">日常に。</span>
          </h1>
          <p className="mt-8 font-script text-3xl text-forest/55 md:text-4xl">
            A moment for your mind and body.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
