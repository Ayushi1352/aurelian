import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import LegalContent from "@/components/LegalContent";
import { site } from "@/data";

export const metadata: Metadata = { title: site.termsPage.bannerTitle, description: site.termsPage.intro };

export default function TermsAndConditionsPage() {
  const { bannerTitle, bannerImage } = site.termsPage;

  return (
    <>
      <PageBanner data={site.pageBanner} title={bannerTitle} image={bannerImage} />
      <LegalContent data={site.termsPage} />
    </>
  );
}
