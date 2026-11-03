import type { Metadata } from "next";
import rawData from "@/data/templates.json";
import type { LawTemplateData } from "@/types/templates.types";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { BlogDetail } from "@/components/sections/BlogDetail";
import { Cta } from "@/components/sections/Cta";

const templateData: LawTemplateData = rawData;
const sectionData = templateData.categories.Law.sections;
const commonData = templateData.common;
// One common detail page for every blog post: all blog links point here and it shows the first post.
// The banner and breadcrumb carry the common page title from templates.json, not the post title.
const post = sectionData.Blogs?.variants?.LawBlogs1?.items[0];

export const metadata: Metadata = { ...commonData.blogDetailBreadcrumb?.seo };

export default function BlogDetailsPage() {
  return (
    <main className="flex-1">
      <Breadcrumb data={commonData.blogDetailBreadcrumb} ui={commonData.globalUI} />
      <BlogDetail data={sectionData.BlogDetail?.variants?.LawBlogDetail1} post={post} />
      <Cta data={sectionData.Cta?.variants?.LawCta1} />
    </main>
  );
}
