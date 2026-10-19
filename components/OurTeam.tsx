import { site, type AurelianTeamPageData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import TeamGrid from "@/components/TeamGrid";

export default function OurTeam({ data = site.teamPage }: SectionProps<AurelianTeamPageData>) {
  const { label, titleLine1, titleLine2, text, perPage, items } = data;

  return (
    <section id="team-list" className="scroll-mt-24 section-space">
      <div className="container-site">
        <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} />
        <TeamGrid items={items} perPage={perPage} scrollTargetId="team-list" />
      </div>
    </section>
  );
}
