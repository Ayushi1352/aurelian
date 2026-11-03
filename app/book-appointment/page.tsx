import type { Metadata } from "next";
import rawData from "@/data/templates.json";
import type { LawTemplateData } from "@/types/templates.types";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Appointment } from "@/components/sections/Appointment";

const templateData: LawTemplateData = rawData;
const sectionData = templateData.categories.Law.sections;
const commonData = templateData.common;
// Practice area titles for the dropdown.
const practiceAreas = (sectionData.PracticeAreas?.variants?.LawPracticeAreas1?.items ?? []).map((item) => item.title);

export const metadata: Metadata = { ...commonData.appointmentBreadcrumb?.seo };

export default function BookAppointmentPage() {
  return (
    <main className="flex-1">
      <Breadcrumb data={commonData.appointmentBreadcrumb} ui={commonData.globalUI} />
      <Appointment data={sectionData.Appointment?.variants?.LawAppointment1} practiceAreas={practiceAreas} ui={commonData.globalUI} />
    </main>
  );
}
