import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FAF8F5",
        sand: "#E8E0D5",
        linen: "#F5F0EB",
        sage: "#9CAF88",
        forest: "#2D4A3E",
        moss: "#3D5A4C",
        earth: "#5C4A3A",
        stone: "#8B7355",
        charcoal: "#2C2C2C",
        muted: "#6B6B6B",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-noto-sans)", "sans-serif"],
        script: ["var(--font-great-vibes)", "cursive"],
      },
      spacing: {
        section: "7.5rem",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
