import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import BlogDetail from "@/components/BlogDetail";
import CallToAction from "@/components/CallToAction";
import { site } from "@/data";

// One common detail page for every blog post: all blog links point here and it shows the first post.
// The banner and breadcrumb carry the common page title from site.json, not the post title.
const post = site.blogPage.items[0];
const { bannerTitle, parent } = site.blogDetailPage;

export const metadata: Metadata = { title: bannerTitle };

export default function BlogDetailPage() {
  return (
    <>
      <PageBanner data={site.pageBanner} title={bannerTitle} image={site.blogPage.bannerImage} parent={parent} />
      <BlogDetail data={site.blogDetailPage} post={post} />
      <CallToAction data={site.ctaSection} />
    </>
  );
}
