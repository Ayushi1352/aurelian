import type { Metadata } from 'next';
import rawData from '@/data/templates.json';
import type { LawTemplateData } from '@/types/templates.types';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Team } from '@/components/sections/Team';
import { Cta } from '@/components/sections/Cta';

export const metadata: Metadata = { ...(rawData as LawTemplateData).common.teamBreadcrumb?.seo };

export default function OurTeamPage() {
  const templateData: LawTemplateData = rawData;
  const sectionData = templateData?.categories?.Law?.sections;
  const commonData = templateData?.common;

  if (!sectionData || !commonData) return null;

  return (
    <main className="flex-1">
      <Breadcrumb data={commonData.teamBreadcrumb} ui={commonData.globalUI} />
      <Team data={sectionData.Team?.variants?.LawTeam1} />
      <Cta data={sectionData.Cta?.variants?.LawCta1} />
    </main>
  );
}
