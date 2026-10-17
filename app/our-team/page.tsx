import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import OurTeam from "@/components/OurTeam";
import CallToAction from "@/components/CallToAction";
import { site } from "@/data";

export const metadata: Metadata = { title: site.teamPage.bannerTitle };

export default function OurTeamPage() {
  const { bannerTitle, bannerImage } = site.teamPage;

  return (
    <>
      <PageBanner data={site.pageBanner} title={bannerTitle} image={bannerImage} />
      <OurTeam data={site.teamPage} />
      <CallToAction data={site.ctaSection} />
    </>
  );
}
