export const navItems = [
  { href: "/products", label: "Products" },
  { href: "/guide", label: "Guide" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerLinks = [
  { href: "/products", label: "Products" },
  { href: "/guide", label: "ご利用ガイド" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "お問い合わせ" },
  { href: "/legal", label: "特定商取引法に基づく表記" },
  { href: "/privacy", label: "プライバシーポリシー" },
] as const;

export const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@calmtrinity.example";
