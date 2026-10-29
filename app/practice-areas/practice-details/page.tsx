import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import PracticeDetail from "@/components/PracticeDetail";
import CallToAction from "@/components/CallToAction";
import { site } from "@/data";

// One common detail page for every practice area: all practice area links point here and it shows the first one.
// The banner and breadcrumb carry the common page title from site.json, not the practice area title.
const item = site.practicePage.items[0];
const { bannerTitle, parent } = site.practiceDetailPage;

export const metadata: Metadata = { title: bannerTitle };

export default function PracticeDetailPage() {
  return (
    <>
      <PageBanner data={site.pageBanner} title={bannerTitle} image={site.practicePage.bannerImage} parent={parent} />
      <PracticeDetail data={site.practiceDetailPage} item={item} allItems={site.practicePage.items} />
      <CallToAction data={site.ctaSection} />
    </>
  );
}
