import Link from "next/link";
import { site, type AurelianTeamMember, type AurelianTeamPreviewData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import TeamCard from "@/components/TeamCard";
import { ArrowRight } from "@/components/Icons";

type TeamPreviewProps = SectionProps<AurelianTeamPreviewData> & {
  /** All team members (from the TeamListing section); the first `count` are shown. */
  items?: AurelianTeamMember[];
};

export default function TeamPreview({ data = site.teamPreviewSection, items = site.teamPage.items }: TeamPreviewProps) {
  const { label, titleLine1, titleLine2, text, count, button } = data;

  return (
    <section className="section-space">
      <div className="container-site">
        <SectionHeading
          label={label}
          line1={titleLine1}
          line2={titleLine2}
          text={text}
          action={
            <Link href={button.href} className="btn border border-wine text-wine hover:bg-wine hover:text-white">
              {button.label}
              <ArrowRight className="size-4" />
            </Link>
          }
        />
        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {items.slice(0, count).map((m, i) => (
            <TeamCard key={m.slug} member={m} delay={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
