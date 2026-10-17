import Link from "next/link";
import { site, type AurelianPracticeArea, type AurelianPracticePreviewData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import PracticeCard from "@/components/PracticeCard";
import { ArrowRight } from "@/components/Icons";

type PracticePreviewProps = SectionProps<AurelianPracticePreviewData> & {
  /** All practice areas (from the PracticeListing section); the first `count` are shown. */
  items?: AurelianPracticeArea[];
};

export default function PracticePreview({ data = site.practicePreviewSection, items = site.practicePage.items }: PracticePreviewProps) {
  const { label, titleLine1, titleLine2, text, count, cardButton, button } = data;

  return (
    <section className="bg-mist section-space">
      <div className="container-site">
        <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} align="center" />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {items.slice(0, count).map((item, i) => (
            <PracticeCard key={item.slug} item={item} index={i} buttonLabel={cardButton} delay={(i % 3) + 1} />
          ))}
        </div>
        <div data-reveal="up" className="mt-12 flex justify-center lg:mt-14">
          <Link href={button.href} className="btn border border-wine text-wine hover:bg-wine hover:text-white">
            {button.label}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
