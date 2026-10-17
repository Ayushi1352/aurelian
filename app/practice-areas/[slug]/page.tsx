import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import PracticeDetail from "@/components/PracticeDetail";
import { site } from "@/data";

function getPracticeArea(slug: string) {
  return site.practicePage.items.find((item) => item.slug === slug);
}

export function generateStaticParams() {
  return site.practicePage.items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/practice-areas/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getPracticeArea(slug);
  if (!item) return {};
  return { title: item.title, description: item.excerpt };
}

export default async function PracticeAreaDetailPage({ params }: PageProps<"/practice-areas/[slug]">) {
  const { slug } = await params;
  const item = getPracticeArea(slug);
  if (!item) notFound();

  return (
    <>
      <PageBanner data={site.pageBanner} title={item.title} image={item.image} parent={site.practiceDetailPage.parent} />
      <PracticeDetail data={site.practiceDetailPage} item={item} allItems={site.practicePage.items} />
    </>
  );
}
