import type { Metadata } from 'next';
import rawData from '@/data/templates.json';
import type { LawTemplateData } from '@/types/templates.types';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { BlogDetail } from '@/components/sections/BlogDetail';
import { Cta } from '@/components/sections/Cta';

export const metadata: Metadata = { ...(rawData as LawTemplateData).common.blogDetailBreadcrumb?.seo };

// One common detail page for every blog post: all blog links point here and it shows detailPostId.
// The banner and breadcrumb carry the common page title from templates.json, not the post title.
export default function BlogDetailsPage() {
  const templateData: LawTemplateData = rawData;
  const sectionData = templateData?.categories?.Law?.sections;
  const commonData = templateData?.common;

  if (!sectionData || !commonData) return null;
  const blogData = sectionData.Blogs?.variants?.LawBlogs1;

  return (
    <main className="flex-1">
      <Breadcrumb data={commonData.blogDetailBreadcrumb} ui={commonData.globalUI} />
      <BlogDetail data={blogData} postId={blogData?.detailPostId} />
      <Cta data={sectionData.Cta?.variants?.LawCta1} />
    </main>
  );
}
