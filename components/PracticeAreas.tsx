import { site, type AurelianPracticePageData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import PracticeGrid from "@/components/PracticeGrid";
import { ui } from "@/components/ui";

export default function PracticeAreas({ data = site.practicePage }: SectionProps<AurelianPracticePageData>) {
  const { label, titleLine1, titleLine2, text, perPage, cardButton, paginationLabels, items } = data;

  return (
    <section data-plain id="practice-list" className={`scroll-mt-28 ${ui.sectionPlain}`}>
      <div className={ui.container}>
        <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} />
        <PracticeGrid items={items} perPage={perPage} buttonLabel={cardButton} paginationLabels={paginationLabels} scrollTargetId="practice-list" />
      </div>
    </section>
  );
}
