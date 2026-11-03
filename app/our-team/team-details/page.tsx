import type { Metadata } from "next";
import rawData from "@/data/templates.json";
import type { LawTemplateData } from "@/types/templates.types";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { TeamProfile } from "@/components/sections/TeamProfile";
import { Cta } from "@/components/sections/Cta";

const templateData: LawTemplateData = rawData;
const sectionData = templateData.categories.Law.sections;
const commonData = templateData.common;
// One common detail page for every team member: all team links point here and it shows the first member.
// The banner and breadcrumb carry the common page title from templates.json, not the member's name.
const member = sectionData.Team?.variants?.LawTeam1?.items[0];

export const metadata: Metadata = { ...commonData.teamDetailBreadcrumb?.seo };

export default function TeamDetailsPage() {
  return (
    <main className="flex-1">
      <Breadcrumb data={commonData.teamDetailBreadcrumb} ui={commonData.globalUI} />
      <TeamProfile data={sectionData.TeamDetail?.variants?.LawTeamDetail1} member={member} ui={commonData.globalUI} />
      <Cta data={sectionData.Cta?.variants?.LawCta1} />
    </main>
  );
}
