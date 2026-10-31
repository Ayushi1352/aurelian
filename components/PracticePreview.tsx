import Link from "next/link";
import { site, type AurelianPracticeArea, type AurelianPracticePreviewData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import PracticeCard from "@/components/PracticeCard";
import { ui } from "@/components/ui";

type PracticePreviewProps = SectionProps<AurelianPracticePreviewData> & {
  /** All practice areas (from the PracticeListing section); the first `count` are shown. */
  items?: AurelianPracticeArea[];
};

export default function PracticePreview({ data = site.practicePreviewSection, items = site.practicePage.items }: PracticePreviewProps) {
  const { label, titleLine1, titleLine2, text, count, cardButton, button } = data;

  return (
    <section className={`bg-mist ${ui.sectionSpace}`}>
      <div className={ui.container}>
        <SectionHeading
          label={label}
          line1={titleLine1}
          line2={titleLine2}
          text={text}
          action={
            <Link href={button.href} className={`${ui.linkArrow} text-navy`}>
              {button.label}
            </Link>
          }
        />
        <div className="mt-14 grid gap-2 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {items.slice(0, count).map((item, i) => (
            <PracticeCard key={item.title} item={item} buttonLabel={cardButton} delay={(i % 3) + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
