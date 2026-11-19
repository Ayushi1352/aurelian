import type { Metadata } from 'next';
import rawData from '@/data/templates.json';
import type { LawTemplateData } from '@/types/templates.types';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { TeamDetail } from '@/components/sections/TeamDetail';
import { Cta } from '@/components/sections/Cta';

export const metadata: Metadata = { ...(rawData as LawTemplateData).common.teamDetailBreadcrumb?.seo };

// One common detail page for every team member: all team links point here and it shows detailMemberId.
// The banner and breadcrumb carry the common page title from templates.json, not the member's name.
export default function TeamDetailsPage() {
  const templateData: LawTemplateData = rawData;
  const sectionData = templateData?.categories?.Law?.sections;
  const commonData = templateData?.common;

  if (!sectionData || !commonData) return null;
  const teamData = sectionData.Team?.variants?.LawTeam1;

  return (
    <main className="flex-1">
      <Breadcrumb data={commonData.teamDetailBreadcrumb} ui={commonData.globalUI} />
      <TeamDetail data={teamData} memberId={teamData?.detailMemberId} />
      <Cta data={sectionData.Cta?.variants?.LawCta1} />
    </main>
  );
}
