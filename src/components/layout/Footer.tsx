import Link from "next/link";

import { contactEmail, footerLinks } from "@/lib/navigation";

export function Footer() {
  return (
    <footer className="mt-auto bg-earth text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl tracking-[0.15em]">Calm Trinity</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-sand/90">
            植物の恵みとミネラルが溶け込んだ、
            やさしく上質なバスソルトブランド。
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-sand/70">
            Links
          </p>
          <ul className="mt-4 space-y-3">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-cream/90 transition-colors hover:text-cream"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-sand/70">
            Contact
          </p>
          <p className="mt-4 text-sm leading-relaxed text-sand/90">
            <Link
              href="/contact"
              className="transition-colors hover:text-cream"
            >
              お問い合わせフォーム
            </Link>
            <br />
            <a
              href={`mailto:${contactEmail}`}
              className="transition-colors hover:text-cream"
            >
              {contactEmail}
            </a>
            <br />
            営業時間: 平日 10:00 - 18:00
          </p>
        </div>
      </div>

      <div className="border-t border-stone/30">
        <p className="px-6 py-6 text-center text-xs tracking-wider text-sand/60">
          &copy; {new Date().getFullYear()} Calm Trinity. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
