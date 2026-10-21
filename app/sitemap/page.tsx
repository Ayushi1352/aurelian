import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import SitemapLinks from "@/components/SitemapLinks";
import { site } from "@/data";

export const metadata: Metadata = { title: site.sitemapPage.bannerTitle, description: site.sitemapPage.text };

export default function SitemapPage() {
  const { bannerTitle, bannerImage } = site.sitemapPage;

  return (
    <>
      <PageBanner data={site.pageBanner} title={bannerTitle} image={bannerImage} />
      <SitemapLinks data={site.sitemapPage} />
    </>
  );
}
