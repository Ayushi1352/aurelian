import type { Metadata } from 'next';
import rawData from '@/data/templates.json';
import type { LawTemplateData } from '@/types/templates.types';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Appointment } from '@/components/sections/Appointment';

export const metadata: Metadata = { ...(rawData as LawTemplateData).common.appointmentBreadcrumb?.seo };

export default function BookAppointmentPage() {
  const templateData: LawTemplateData = rawData;
  const sectionData = templateData?.categories?.Law?.sections;
  const commonData = templateData?.common;

  if (!sectionData || !commonData) return null;

  return (
    <main className="flex-1">
      <Breadcrumb data={commonData.appointmentBreadcrumb} ui={commonData.globalUI} />
      <Appointment data={sectionData.Appointment?.variants?.LawAppointment1} />
    </main>
  );
}
