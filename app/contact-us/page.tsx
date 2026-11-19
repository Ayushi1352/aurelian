import type { Metadata } from 'next';
import rawData from '@/data/templates.json';
import type { LawTemplateData } from '@/types/templates.types';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { ContactDetails } from '@/components/sections/ContactDetails';
import { ContactForm } from '@/components/sections/ContactForm';

export const metadata: Metadata = { ...(rawData as LawTemplateData).common.contactBreadcrumb?.seo };

export default function ContactUsPage() {
  const templateData: LawTemplateData = rawData;
  const sectionData = templateData?.categories?.Law?.sections;
  const commonData = templateData?.common;

  if (!sectionData || !commonData) return null;

  return (
    <main className="flex-1">
      <Breadcrumb data={commonData.contactBreadcrumb} ui={commonData.globalUI} />
      <ContactDetails data={sectionData.ContactDetails?.variants?.LawContactDetails1} />
      <ContactForm data={sectionData.ContactForm?.variants?.LawContactForm1} />
    </main>
  );
}
