import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import Appointment from "@/components/Appointment";
import { site } from "@/data";

export const metadata: Metadata = { title: site.appointmentPage.bannerTitle };

export default function BookAppointmentPage() {
  const { bannerTitle, bannerImage } = site.appointmentPage;

  return (
    <>
      <PageBanner data={site.pageBanner} title={bannerTitle} image={bannerImage} />
      <Appointment data={site.appointmentPage} />
    </>
  );
}
