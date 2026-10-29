import { site, type AurelianTeamPageData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import TeamGrid from "@/components/TeamGrid";
import { ui } from "@/components/ui";

export default function OurTeam({ data = site.teamPage }: SectionProps<AurelianTeamPageData>) {
  const { label, titleLine1, titleLine2, text, perPage, socialLabel, paginationLabels, items } = data;

  return (
    <section data-plain id="team-list" className={`scroll-mt-28 ${ui.sectionPlain}`}>
      <div className={ui.container}>
        <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} />
        <TeamGrid items={items} perPage={perPage} socialLabel={socialLabel} paginationLabels={paginationLabels} scrollTargetId="team-list" />
      </div>
    </section>
  );
}
