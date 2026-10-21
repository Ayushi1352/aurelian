import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import PracticeAreas from "@/components/PracticeAreas";
import WhyChooseUs from "@/components/WhyChooseUs";
import CallToAction from "@/components/CallToAction";
import { site } from "@/data";

export const metadata: Metadata = { title: site.practicePage.bannerTitle };

export default function PracticeAreasPage() {
  const { bannerTitle, bannerImage } = site.practicePage;

  return (
    <>
      <PageBanner data={site.pageBanner} title={bannerTitle} image={bannerImage} />
      <PracticeAreas data={site.practicePage} />
      <WhyChooseUs data={site.whyChooseUsSection} />
      <CallToAction data={site.ctaSection} />
    </>
  );
}
