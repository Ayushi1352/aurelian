import { site, type AurelianHeroData, type SectionProps } from "@/data";
import HeroSlider from "@/components/HeroSlider";

export default function Hero({ data = site.hero }: SectionProps<AurelianHeroData>) {
  return <HeroSlider slides={data.slides} button={data.button} secondaryButton={data.secondaryButton} ariaLabels={data.ariaLabels} />;
}
