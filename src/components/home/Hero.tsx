"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-linen via-cream to-cream" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #9CAF88 0%, transparent 50%), radial-gradient(circle at 80% 20%, #E8E0D5 0%, transparent 40%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 mx-auto max-w-3xl px-6 text-center"
      >
        <p className="text-xs uppercase tracking-[0.4em] text-stone">
          Organic Bath Salt
        </p>
        <h1 className="mt-8 font-serif text-5xl leading-[1.2] text-forest md:text-7xl">
          静けさに、
          <br />
          溶け込むひととき
        </h1>
        <p className="mx-auto mt-10 max-w-lg leading-relaxed text-muted">
          植物の恵みと天然ミネラルを凝縮したバスソルト。
          肌と心をやさしく包み込む、上質な入浴体験をお届けします。
        </p>
        <Link
          href="/products"
          className="mt-12 inline-block border border-forest px-12 py-4 text-xs uppercase tracking-[0.25em] text-forest transition-colors duration-300 hover:bg-forest hover:text-cream"
        >
          View Products
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-stone">
            Scroll
          </span>
          <div className="h-8 w-px animate-pulse bg-stone/50" />
        </div>
      </motion.div>
    </section>
  );
}
