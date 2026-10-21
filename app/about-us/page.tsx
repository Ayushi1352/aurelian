import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import AboutIntro from "@/components/AboutIntro";
import AboutStory from "@/components/AboutStory";
import WhyChooseUs from "@/components/WhyChooseUs";
import MissionVision from "@/components/MissionVision";
import Stats from "@/components/Stats";
import CoreValues from "@/components/CoreValues";
import CallToAction from "@/components/CallToAction";
import { site } from "@/data";

export const metadata: Metadata = { title: site.aboutStorySection.bannerTitle };

export default function AboutUsPage() {
  const { bannerTitle, bannerImage } = site.aboutStorySection;

  return (
    <>
      <PageBanner data={site.pageBanner} title={bannerTitle} image={bannerImage} />
      <AboutIntro data={site.aboutIntroSection} hideButton />
      <AboutStory data={site.aboutStorySection} />
      <WhyChooseUs data={site.whyChooseUsSection} />
      <MissionVision data={site.missionVisionSection} />
      <Stats data={site.statsSection} />
      <CoreValues data={site.valuesSection} />
      <CallToAction data={site.ctaSection} />
    </>
  );
}
