import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import TeamProfile from "@/components/TeamProfile";
import CallToAction from "@/components/CallToAction";
import { site } from "@/data";

// One common detail page for every team member: all team links point here and it shows the first member.
// The banner and breadcrumb carry the common page title from site.json, not the member's name.
const member = site.teamPage.items[0];
const { bannerTitle, parent } = site.teamDetailPage;

export const metadata: Metadata = { title: bannerTitle };

export default function TeamDetailPage() {
  return (
    <>
      <PageBanner data={site.pageBanner} title={bannerTitle} image={site.teamPage.bannerImage} parent={parent} />
      <TeamProfile data={site.teamDetailPage} member={member} />
      <CallToAction data={site.ctaSection} />
    </>
  );
}
