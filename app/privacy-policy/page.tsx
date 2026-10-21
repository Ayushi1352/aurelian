import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import LegalContent from "@/components/LegalContent";
import { site } from "@/data";

export const metadata: Metadata = { title: site.privacyPage.bannerTitle, description: site.privacyPage.intro };

export default function PrivacyPolicyPage() {
  const { bannerTitle, bannerImage } = site.privacyPage;

  return (
    <>
      <PageBanner data={site.pageBanner} title={bannerTitle} image={bannerImage} />
      <LegalContent data={site.privacyPage} />
    </>
  );
}
