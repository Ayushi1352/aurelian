import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import ContactDetails from "@/components/ContactDetails";
import MessageSection from "@/components/MessageSection";
import { site } from "@/data";

export const metadata: Metadata = { title: site.contactPage.bannerTitle };

export default function ContactUsPage() {
  const { bannerTitle, bannerImage } = site.contactPage;

  return (
    <>
      <PageBanner data={site.pageBanner} title={bannerTitle} image={bannerImage} />
      <ContactDetails data={site.contactPage} />
      <MessageSection data={site.contactFormSection} />
    </>
  );
}
