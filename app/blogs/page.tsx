import type { Metadata } from "next";
import rawData from "@/data/templates.json";
import type { LawTemplateData } from "@/types/templates.types";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Blogs } from "@/components/sections/Blogs";

const templateData: LawTemplateData = rawData;
const sectionData = templateData.categories.Law.sections;
const commonData = templateData.common;

export const metadata: Metadata = { ...commonData.blogsBreadcrumb?.seo };

export default function BlogsPage() {
  return (
    <main className="flex-1">
      <Breadcrumb data={commonData.blogsBreadcrumb} ui={commonData.globalUI} />
      <Blogs data={sectionData.Blogs?.variants?.LawBlogs1} ui={commonData.globalUI} />
    </main>
  );
}
