import type { Metadata } from "next";
import rawData from "@/data/templates.json";
import type { LawTemplateData } from "@/types/templates.types";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Team } from "@/components/sections/Team";
import { Cta } from "@/components/sections/Cta";

const templateData: LawTemplateData = rawData;
const sectionData = templateData.categories.Law.sections;
const commonData = templateData.common;

export const metadata: Metadata = { ...commonData.teamBreadcrumb?.seo };

export default function OurTeamPage() {
  return (
    <main className="flex-1">
      <Breadcrumb data={commonData.teamBreadcrumb} ui={commonData.globalUI} />
      <Team data={sectionData.Team?.variants?.LawTeam1} ui={commonData.globalUI} />
      <Cta data={sectionData.Cta?.variants?.LawCta1} />
    </main>
  );
}
