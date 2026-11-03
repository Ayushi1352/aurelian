import type { Metadata } from "next";
import rawData from "@/data/templates.json";
import type { LawTemplateData } from "@/types/templates.types";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { PracticeDetail } from "@/components/sections/PracticeDetail";
import { Cta } from "@/components/sections/Cta";

const templateData: LawTemplateData = rawData;
const sectionData = templateData.categories.Law.sections;
const commonData = templateData.common;
const practiceAreas = sectionData.PracticeAreas?.variants?.LawPracticeAreas1?.items ?? [];
// One common detail page for every practice area: all practice area links point here and it shows the first one.
// The banner and breadcrumb carry the common page title from templates.json, not the practice area title.
const practiceArea = practiceAreas[0];

export const metadata: Metadata = { ...commonData.practiceDetailBreadcrumb?.seo };

export default function PracticeDetailsPage() {
  return (
    <main className="flex-1">
      <Breadcrumb data={commonData.practiceDetailBreadcrumb} ui={commonData.globalUI} />
      <PracticeDetail data={sectionData.PracticeDetail?.variants?.LawPracticeDetail1} item={practiceArea} allItems={practiceAreas} />
      <Cta data={sectionData.Cta?.variants?.LawCta1} />
    </main>
  );
}
