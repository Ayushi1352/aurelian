import type { Metadata } from 'next';
import rawData from '@/data/templates.json';
import type { LawTemplateData } from '@/types/templates.types';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { PracticeAreas } from '@/components/sections/PracticeAreas';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { Cta } from '@/components/sections/Cta';

export const metadata: Metadata = { ...(rawData as LawTemplateData).common.practiceAreasBreadcrumb?.seo };

export default function PracticeAreasPage() {
  const templateData: LawTemplateData = rawData;
  const sectionData = templateData?.categories?.Law?.sections;
  const commonData = templateData?.common;

  if (!sectionData || !commonData) return null;

  return (
    <main className="flex-1">
      <Breadcrumb data={commonData.practiceAreasBreadcrumb} ui={commonData.globalUI} />
      <PracticeAreas data={sectionData.PracticeAreas?.variants?.LawPracticeAreas1} showAll />
      <WhyChooseUs data={sectionData.WhyChooseUs?.variants?.LawWhyChooseUs1} />
      <Cta data={sectionData.Cta?.variants?.LawCta1} />
    </main>
  );
}
