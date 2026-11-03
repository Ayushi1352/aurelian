import type { GlobalUIData, PracticeAreasData } from "@/types/templates.types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PracticeGrid } from "@/components/sections/PracticeGrid";
import { ui as classes } from "@/components/ui/ui";

export const PracticeAreas = ({ data, ui }: { data?: PracticeAreasData; ui: GlobalUIData }) => {
  if (!data) return null;
  const { label, titleLine1, titleLine2, text, perPage, cardButton, items } = data;

  return (
    <section data-plain id="practice-list" className={`scroll-mt-28 ${classes.sectionPlain}`}>
      <div className={classes.container}>
        <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} />
        <PracticeGrid items={items} perPage={perPage} buttonText={cardButton} ui={ui} scrollTargetId="practice-list" />
      </div>
    </section>
  );
};
