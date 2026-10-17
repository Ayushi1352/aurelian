import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import TeamProfile from "@/components/TeamProfile";
import CallToAction from "@/components/CallToAction";
import { site } from "@/data";

function getMember(slug: string) {
  return site.teamPage.items.find((member) => member.slug === slug);
}

export function generateStaticParams() {
  return site.teamPage.items.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({ params }: PageProps<"/our-team/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const member = getMember(slug);
  if (!member) return {};
  return { title: member.name, description: `${member.name} - ${member.role}, ${member.practice}.` };
}

export default async function TeamMemberPage({ params }: PageProps<"/our-team/[slug]">) {
  const { slug } = await params;
  const member = getMember(slug);
  if (!member) notFound();

  return (
    <>
      <PageBanner data={site.pageBanner} title={member.name} image={site.teamPage.bannerImage} parent={site.teamDetailPage.parent} />
      <TeamProfile data={site.teamDetailPage} member={member} />
      <CallToAction data={site.ctaSection} />
    </>
  );
}
