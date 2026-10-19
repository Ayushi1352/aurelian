import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import AboutStory from "@/components/AboutStory";
import Stats from "@/components/Stats";
import CoreValues from "@/components/CoreValues";
import FounderMessage from "@/components/FounderMessage";
import CallToAction from "@/components/CallToAction";
import { site } from "@/data";

export const metadata: Metadata = { title: site.aboutStorySection.bannerTitle };

export default function AboutUsPage() {
  const { bannerTitle, bannerImage } = site.aboutStorySection;

  return (
    <>
      <PageBanner data={site.pageBanner} title={bannerTitle} image={bannerImage} />
      <AboutStory data={site.aboutStorySection} />
      <CoreValues data={site.valuesSection} />
      <FounderMessage data={site.founderSection} />
      <Stats data={site.statsSection} />
      <CallToAction data={site.ctaSection} />
    </>
  );
}
