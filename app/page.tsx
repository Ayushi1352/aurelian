import rawData from "@/data/templates.json";
import type { LawTemplateData } from "@/types/templates.types";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { FounderMessage } from "@/components/sections/FounderMessage";
import { PracticePreview } from "@/components/sections/PracticePreview";
import { Stats } from "@/components/sections/Stats";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Cta } from "@/components/sections/Cta";

const templateData: LawTemplateData = rawData;
const sectionData = templateData.categories.Law.sections;
const commonData = templateData.common;

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection data={sectionData.Hero?.variants?.LawHero1} ui={commonData.globalUI} />
      <AboutIntro data={sectionData.AboutIntro?.variants?.LawAboutIntro1} />
      <FounderMessage data={sectionData.FounderMessage?.variants?.LawFounderMessage1} founder={sectionData.Team?.variants?.LawTeam1?.items[0]} />
      <PracticePreview data={sectionData.PracticePreview?.variants?.LawPracticePreview1} items={sectionData.PracticeAreas?.variants?.LawPracticeAreas1?.items} />
      <Stats data={sectionData.Stats?.variants?.LawStats1} />
      <BlogPreview data={sectionData.BlogPreview?.variants?.LawBlogPreview1} items={sectionData.Blogs?.variants?.LawBlogs1?.items} />
      <WhyChooseUs data={sectionData.WhyChooseUs?.variants?.LawWhyChooseUs1} />
      <Cta data={sectionData.Cta?.variants?.LawCta1} />
    </main>
  );
}
