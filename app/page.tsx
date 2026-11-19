import rawData from '@/data/templates.json';
import type { LawTemplateData } from '@/types/templates.types';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutUs } from '@/components/sections/AboutUs';
import { FounderMessage } from '@/components/sections/FounderMessage';
import { PracticeAreas } from '@/components/sections/PracticeAreas';
import { Stats } from '@/components/sections/Stats';
import { Blogs } from '@/components/sections/Blogs';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { Cta } from '@/components/sections/Cta';

export default function HomePage() {
  const templateData: LawTemplateData = rawData;
  const sectionData = templateData?.categories?.Law?.sections;

  if (!sectionData) return null;

  return (
    <main className="flex-1">
      <HeroSection data={sectionData.Hero?.variants?.LawHero1} />
      <AboutUs data={sectionData.AboutUs?.variants?.LawAboutUs1} />
      <FounderMessage data={sectionData.FounderMessage?.variants?.LawFounderMessage1} />
      <PracticeAreas data={sectionData.PracticeAreas?.variants?.LawPracticeAreas1} />
      <Stats data={sectionData.Stats?.variants?.LawStats1} />
      <Blogs data={sectionData.Blogs?.variants?.LawBlogs1} />
      <WhyChooseUs data={sectionData.WhyChooseUs?.variants?.LawWhyChooseUs1} />
      <Cta data={sectionData.Cta?.variants?.LawCta1} />
    </main>
  );
}
