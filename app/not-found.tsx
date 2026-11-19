import type { Metadata } from 'next';
import rawData from '@/data/templates.json';
import type { LawTemplateData } from '@/types/templates.types';
import { NotFound } from '@/components/sections/NotFound';

export const metadata: Metadata = { ...(rawData as LawTemplateData).common.notFound?.seo };

export default function NotFoundPage() {
  const templateData: LawTemplateData = rawData;
  const commonData = templateData?.common;

  if (!commonData) return null;

  return (
    <main className="flex-1">
      <NotFound data={commonData.notFound} />
    </main>
  );
}
