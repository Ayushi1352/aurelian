import Image from "next/image";
import { site, type AurelianPracticeArea, type AurelianPracticeDetailData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import PracticeCard from "@/components/PracticeCard";
import { FeatureIcon } from "@/components/Icons";
import { ui } from "@/components/ui";

type PracticeDetailProps = SectionProps<AurelianPracticeDetailData> & {
  item: AurelianPracticeArea;
  /** All practice areas, for the "Other Practice Areas" tiles. */
  allItems?: AurelianPracticeArea[];
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function PracticeDetail({ data = site.practiceDetailPage, item, allItems = site.practicePage.items }: PracticeDetailProps) {
  const { overviewLabel, servicesLabel, moreLabel, moreCount, cardButton, parent } = data;
  const index = allItems.findIndex((p) => p.title === item.title);
  // The next areas after this one, wrapping round to the start of the list.
  const others = Array.from({ length: Math.min(moreCount, allItems.length - 1) }, (_, i) => {
    const at = (index + 1 + i) % allItems.length;
    return { item: allItems[at], at };
  });

  return (
    <>
      <section data-plain className={ui.sectionPlain}>
        <div className={ui.container}>
          <SectionHeading label={overviewLabel} line1={item.subtitle} text={item.overview} />
          <div data-reveal="wipe" className="relative mt-14 aspect-[4/3] overflow-hidden bg-navy-deep sm:aspect-[2/1] lg:mt-20">
            <span data-parallax className={`${ui.parallax} absolute inset-0 block`}>
              <Image src={item.image.src} alt={item.image.alt} fill priority quality={75} sizes="(min-width: 1400px) 1320px, 100vw" className="object-cover" />
            </span>
            <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-navy-deep/70 via-transparent to-transparent" />
            <span className="absolute bottom-6 left-6 flex items-center gap-4 text-white sm:bottom-10 sm:left-10">
              <span className="grid size-14 place-items-center border border-white/40 text-gold-light sm:size-16">
                <FeatureIcon name={item.icon} className="size-7" />
              </span>
              <span className={`${ui.label} text-white/85`}>{item.title}</span>
            </span>
          </div>
        </div>
      </section>

      <section className={`bg-mist ${ui.sectionSpace}`}>
        <div className={ui.container}>
          <SectionHeading label={item.title} line1={servicesLabel} />
          <ul className="mt-14 grid border-t border-line sm:grid-cols-2 sm:gap-x-12 lg:mt-16">
            {item.services.map((s, i) => (
              <li key={s} data-reveal="up" data-delay={(i % 2) + 1} className="group flex items-baseline gap-5 border-b border-line py-7">
                <span className={`${ui.labelSmall} shrink-0 text-gold`}>{pad(i + 1)}</span>
                <span className="font-display text-[1.5rem] font-semibold leading-snug text-ink transition-[color,translate] duration-500 group-hover:translate-x-2 group-hover:text-navy lg:text-[1.875rem]">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section data-plain className={ui.sectionPlain}>
        <div className={ui.container}>
          <SectionHeading label={parent.label} line1={moreLabel} />
          <div className="mt-14 grid gap-2 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {others.map(({ item: p, at }, i) => (
              <PracticeCard key={p.title} item={p} index={at} buttonLabel={cardButton} delay={i + 1} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
