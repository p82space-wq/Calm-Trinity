export const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Product" },
  { href: "/about", label: "About" },
  { href: "/guide", label: "Journal" },
  { href: "/news", label: "News" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Product" },
  { href: "/about", label: "About" },
  { href: "/guide", label: "Journal" },
  { href: "/news", label: "News" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export const contactEmail = "calamtrinity82@gmail.com";

export const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "";
