import { site, type AurelianHeroData, type SectionProps } from "@/data";
import HeroSlider from "@/components/HeroSlider";

/** Full-width photo slider under a dark overlay, with a short left-aligned label and headline (classic law-firm banner). */
export default function Hero({ data = site.hero }: SectionProps<AurelianHeroData>) {
  return <HeroSlider slides={data.slides} />;
}
