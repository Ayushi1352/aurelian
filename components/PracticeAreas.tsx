import { site, type AurelianPracticePageData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import PracticeGrid from "@/components/PracticeGrid";

export default function PracticeAreas({ data = site.practicePage }: SectionProps<AurelianPracticePageData>) {
  const { label, titleLine1, titleLine2, text, perPage, cardButton, items } = data;

  return (
    <section id="practice-list" className="scroll-mt-24 section-space">
      <div className="container-site">
        <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} />
        <PracticeGrid items={items} perPage={perPage} buttonLabel={cardButton} scrollTargetId="practice-list" />
      </div>
    </section>
  );
}
