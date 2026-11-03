import type { Metadata } from "next";
import rawData from "@/data/templates.json";
import type { LawTemplateData } from "@/types/templates.types";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { AboutStory } from "@/components/sections/AboutStory";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { MissionVision } from "@/components/sections/MissionVision";
import { Stats } from "@/components/sections/Stats";
import { CoreValues } from "@/components/sections/CoreValues";
import { Cta } from "@/components/sections/Cta";

const templateData: LawTemplateData = rawData;
const sectionData = templateData.categories.Law.sections;
const commonData = templateData.common;

export const metadata: Metadata = { ...commonData.aboutBreadcrumb?.seo };

export default function AboutUsPage() {
  return (
    <main className="flex-1">
      <Breadcrumb data={commonData.aboutBreadcrumb} ui={commonData.globalUI} />
      <AboutIntro data={sectionData.AboutIntro?.variants?.LawAboutIntro1} hideButton />
      <AboutStory data={sectionData.AboutStory?.variants?.LawAboutStory1} />
      <WhyChooseUs data={sectionData.WhyChooseUs?.variants?.LawWhyChooseUs1} />
      <MissionVision data={sectionData.MissionVision?.variants?.LawMissionVision1} />
      <Stats data={sectionData.Stats?.variants?.LawStats1} />
      <CoreValues data={sectionData.CoreValues?.variants?.LawCoreValues1} />
      <Cta data={sectionData.Cta?.variants?.LawCta1} />
    </main>
  );
}
