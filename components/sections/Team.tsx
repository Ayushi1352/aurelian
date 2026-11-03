import type { GlobalUIData, TeamData } from "@/types/templates.types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { ui as classes } from "@/components/ui/ui";

export const Team = ({ data, ui }: { data?: TeamData; ui: GlobalUIData }) => {
  if (!data) return null;
  const { label, titleLine1, titleLine2, text, perPage, items } = data;

  return (
    <section data-plain id="team-list" className={`scroll-mt-28 ${classes.sectionPlain}`}>
      <div className={classes.container}>
        <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} />
        <TeamGrid items={items} perPage={perPage} ui={ui} scrollTargetId="team-list" />
      </div>
    </section>
  );
};
