import type { Metadata } from 'next';
import rawData from '@/data/templates.json';
import type { LawTemplateData } from '@/types/templates.types';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { PracticeDetail } from '@/components/sections/PracticeDetail';
import { Cta } from '@/components/sections/Cta';

export const metadata: Metadata = { ...(rawData as LawTemplateData).common.practiceDetailBreadcrumb?.seo };

// One common detail page for every practice area: all practice area links point here and it shows detailItemId.
// The banner and breadcrumb carry the common page title from templates.json, not the practice area title.
export default function PracticeDetailsPage() {
  const templateData: LawTemplateData = rawData;
  const sectionData = templateData?.categories?.Law?.sections;
  const commonData = templateData?.common;

  if (!sectionData || !commonData) return null;
  const practiceData = sectionData.PracticeAreas?.variants?.LawPracticeAreas1;

  return (
    <main className="flex-1">
      <Breadcrumb data={commonData.practiceDetailBreadcrumb} ui={commonData.globalUI} />
      <PracticeDetail data={practiceData} itemId={practiceData?.detailItemId} />
      <Cta data={sectionData.Cta?.variants?.LawCta1} />
    </main>
  );
}
