import type { Metadata } from "next";
import rawData from "@/data/templates.json";
import type { LawTemplateData } from "@/types/templates.types";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { ContactMessage } from "@/components/sections/ContactMessage";

const templateData: LawTemplateData = rawData;
const sectionData = templateData.categories.Law.sections;
const commonData = templateData.common;

export const metadata: Metadata = { ...commonData.contactBreadcrumb?.seo };

export default function ContactUsPage() {
  return (
    <main className="flex-1">
      <Breadcrumb data={commonData.contactBreadcrumb} ui={commonData.globalUI} />
      <ContactDetails data={sectionData.ContactDetails?.variants?.LawContactDetails1} company={commonData.company} />
      <ContactMessage data={sectionData.ContactForm?.variants?.LawContactForm1} company={commonData.company} ui={commonData.globalUI} />
    </main>
  );
}
