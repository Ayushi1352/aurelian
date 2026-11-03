import Link from "next/link";
import type { PracticeArea, PracticePreviewData } from "@/types/templates.types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PracticeCard } from "@/components/sections/PracticeCard";
import { ui } from "@/components/ui/ui";

type PracticePreviewProps = {
  data?: PracticePreviewData;
  /** All practice areas (from the PracticeAreas section); the first `count` are shown. */
  items?: PracticeArea[];
};

export const PracticePreview = ({ data, items = [] }: PracticePreviewProps) => {
  if (!data) return null;
  const { label, titleLine1, titleLine2, text, count, cardButton } = data;

  return (
    <section className={`bg-mist ${ui.sectionSpace}`}>
      <div className={ui.container}>
        <SectionHeading
          label={label}
          line1={titleLine1}
          line2={titleLine2}
          text={text}
          action={
            <Link href={data.buttonUrl} className={`${ui.linkArrow} text-navy`}>
              {data.buttonText}
            </Link>
          }
        />
        <div className="mt-14 grid gap-2 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {items.slice(0, count).map((item, i) => (
            <PracticeCard key={item.id} item={item} buttonText={cardButton} delay={(i % 3) + 1} />
          ))}
        </div>
      </div>
    </section>
  );
};
