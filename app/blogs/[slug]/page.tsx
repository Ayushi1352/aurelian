import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import BlogDetail from "@/components/BlogDetail";
import { site } from "@/data";

function getPost(slug: string) {
  return site.blogPage.items.find((post) => post.slug === slug);
}

export function generateStaticParams() {
  return site.blogPage.items.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blogs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogDetailPage({ params }: PageProps<"/blogs/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <PageBanner data={site.pageBanner} title={post.title} image={post.image} parent={site.blogDetailPage.parent} />
      <BlogDetail data={site.blogDetailPage} post={post} allPosts={site.blogPage.items} />
    </>
  );
}
