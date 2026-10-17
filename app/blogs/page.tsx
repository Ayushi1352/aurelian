import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import BlogListing from "@/components/BlogListing";
import { site } from "@/data";

export const metadata: Metadata = { title: site.blogPage.bannerTitle };

export default function BlogsPage() {
  const { bannerTitle, bannerImage } = site.blogPage;

  return (
    <>
      <PageBanner data={site.pageBanner} title={bannerTitle} image={bannerImage} />
      <BlogListing data={site.blogPage} />
    </>
  );
}
