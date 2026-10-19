import Image from "next/image";
import type { ReactNode } from "react";
import { site, type AurelianPracticeArea, type AurelianPracticeDetailData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import PracticeCard from "@/components/PracticeCard";
import HelpBand from "@/components/HelpBand";
import { FeatureIcon, Plus } from "@/components/Icons";

type PracticeDetailProps = SectionProps<AurelianPracticeDetailData> & {
  item: AurelianPracticeArea;
  /** All practice areas, for the "Other Practice Areas" cards. */
  allItems?: AurelianPracticeArea[];
};

/** Content lined up under the title column of a SectionHeading (the right 70% on large screens). */
function UnderTitle({ children }: { children: ReactNode }) {
  return (
    <div className="mt-12 lg:mt-16 lg:grid lg:grid-cols-[0.3fr_0.7fr] lg:gap-12">
      <span aria-hidden="true" className="hidden lg:block" />
      <div className="min-w-0">{children}</div>
    </div>
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

/*
 * Wix-style detail page in full-width bands: overview with a wide photo, the services as a numbered
 * list, the process on a dark band with large gold numbers, the FAQ, other areas, then a help band.
 */
export default function PracticeDetail({ data = site.practiceDetailPage, item, allItems = site.practicePage.items }: PracticeDetailProps) {
  const { overviewLabel, servicesLabel, processLabel, process, faqLabel, moreEyebrow, moreLabel, moreText, moreCount, cardButton, helpCard, button } = data;
  const [lead, ...rest] = item.overview;
  const index = allItems.findIndex((p) => p.slug === item.slug);
  // The next areas after this one, wrapping round to the start of the list.
  const others = Array.from({ length: Math.min(moreCount, allItems.length - 1) }, (_, i) => {
    const at = (index + 1 + i) % allItems.length;
    return { item: allItems[at], at };
  });

  return (
    <>
      <section className="section-space">
        <div className="container-site">
          <SectionHeading label={overviewLabel} line1={item.subtitle} text={lead} />
          {rest.length > 0 && (
            <UnderTitle>
              <div className="grid gap-6 md:grid-cols-2 md:gap-12">
                {rest.map((p, i) => (
                  <p key={i} data-reveal="up" data-delay={i + 1} className="text-[16px] leading-[1.85] text-body">
                    {p}
                  </p>
                ))}
              </div>
            </UnderTitle>
          )}

          <div data-reveal="wipe" className="relative mt-14 aspect-[4/3] overflow-hidden bg-wine-deep sm:aspect-[2/1] lg:mt-20">
            <span className="parallax absolute inset-0 block">
              <Image src={item.image.src} alt={item.image.alt} fill quality={85} sizes="(min-width: 1400px) 1320px, 100vw" className="object-cover" />
            </span>
            <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-wine-deep/70 via-transparent to-transparent" />
            <span className="absolute bottom-6 left-6 flex items-center gap-4 text-white sm:bottom-10 sm:left-10">
              <span className="grid size-14 place-items-center border border-white/40 text-gold-light sm:size-16">
                <FeatureIcon name={item.icon} className="size-7" />
              </span>
              <span className="label text-white/85">{item.title}</span>
            </span>
          </div>
        </div>
      </section>

      <section className="bg-mist section-space">
        <div className="container-site">
          <SectionHeading label={item.title} line1={servicesLabel} />
          <UnderTitle>
            <ul className="grid border-t border-line sm:grid-cols-2 sm:gap-x-12">
              {item.services.map((s, i) => (
                <li key={s} data-reveal="up" data-delay={(i % 2) + 1} className="group flex items-baseline gap-5 border-b border-line py-6">
                  <span className="label shrink-0 text-[10px]! text-gold">{pad(i + 1)}</span>
                  <span className="font-display text-[22px] font-semibold leading-snug text-ink transition-[color,translate] duration-500 group-hover:translate-x-2 group-hover:text-wine lg:text-[26px]">{s}</span>
                </li>
              ))}
            </ul>
          </UnderTitle>
        </div>
      </section>

      <section className="bg-wine-deep text-white section-space">
        <div className="container-site">
          <SectionHeading label={item.title} line1={processLabel} dark />
          <ol className="mt-14 grid border-t border-white/15 sm:grid-cols-2 lg:mt-20 xl:grid-cols-4">
            {process.map((step, i) => (
              <li
                key={step.title}
                data-reveal="up"
                data-delay={i + 1}
                className={`group relative border-b border-white/15 py-10 sm:px-8 xl:border-b-0 xl:py-12 ${i % 2 === 1 ? "sm:border-l" : ""} ${i > 0 ? "xl:border-l" : ""}`}
              >
                <span aria-hidden="true" className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                <span className="block font-display text-[72px] font-medium leading-none text-gold lg:text-[96px]">{pad(i + 1)}</span>
                <h3 className="display-3 mt-8">
                  {step.title}
                  <span className="text-gold">.</span>
                </h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-white/65">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-space">
        <div className="container-site">
          <SectionHeading label={item.title} line1={faqLabel} />
          <UnderTitle>
            <div className="border-t border-line">
              {item.faqs.map((faq, i) => (
                <details key={faq.question} name="faq" open={i === 0} data-reveal="up" className="accordion group border-b border-line">
                  <summary className="flex list-none items-center justify-between gap-6 py-6 lg:py-7 [&::-webkit-details-marker]:hidden">
                    <span className="font-display text-[22px] font-semibold leading-snug text-ink transition-colors group-hover:text-wine sm:text-[26px]">{faq.question}</span>
                    <span className="grid size-11 shrink-0 place-items-center border border-line text-wine transition-colors duration-300 group-open:border-wine group-open:bg-wine group-open:text-white">
                      <Plus className="size-4 transition-transform duration-300 group-open:rotate-45" />
                    </span>
                  </summary>
                  <p className="max-w-[720px] pb-7 pr-14 text-[16px] leading-[1.8] text-body">{faq.answer}</p>
                </details>
              ))}
            </div>
          </UnderTitle>
        </div>
      </section>

      <section className="bg-mist section-space">
        <div className="container-site">
          <SectionHeading label={moreEyebrow} line1={moreLabel} text={moreText} />
          <div className="mt-14 grid gap-2 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {others.map(({ item: p, at }, i) => (
              <PracticeCard key={p.slug} item={p} index={at} buttonLabel={cardButton} delay={i + 1} />
            ))}
          </div>
        </div>
      </section>

      <HelpBand data={helpCard} button={button} label={item.title} />
    </>
  );
}
