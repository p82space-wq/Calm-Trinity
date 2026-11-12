import { AboutHero } from "@/components/about/AboutHero";
import { AboutMessage } from "@/components/about/AboutMessage";
import { AboutPerspectives } from "@/components/about/AboutPerspectives";
import { AboutPhilosophy } from "@/components/about/AboutPhilosophy";
import { AboutStory } from "@/components/about/AboutStory";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About",
  description:
    "自分をいたわる時間を、日常に。薬剤師と心理士が手がける Calm Trinity について。",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutPerspectives />
      <AboutPhilosophy />
      <AboutMessage />
    </>
  );
}
