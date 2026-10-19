import Link from "next/link";
import { site, type AurelianPracticeArea, type AurelianPracticePreviewData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import PracticeShowcase from "@/components/PracticeShowcase";

type PracticePreviewProps = SectionProps<AurelianPracticePreviewData> & {
  /** All practice areas (from the PracticeListing section); the first `count` are shown. */
  items?: AurelianPracticeArea[];
};

export default function PracticePreview({ data = site.practicePreviewSection, items = site.practicePage.items }: PracticePreviewProps) {
  const { label, titleLine1, titleLine2, text, count, cardButton, button } = data;

  return (
    <section className="bg-mist section-space">
      <div className="container-site">
        <SectionHeading
          label={label}
          line1={titleLine1}
          line2={titleLine2}
          text={text}
          action={
            <Link href={button.href} className="link-arrow text-wine">
              {button.label}
            </Link>
          }
        />
        <PracticeShowcase items={items.slice(0, count)} buttonLabel={cardButton} />
      </div>
    </section>
  );
}
