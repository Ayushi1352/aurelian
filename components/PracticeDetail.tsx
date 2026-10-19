import Image from "next/image";
import Link from "next/link";
import { site, type AurelianPracticeArea, type AurelianPracticeDetailData, type SectionProps } from "@/data";
import SectionHeading, { Eyebrow } from "@/components/SectionHeading";
import { Headline } from "@/components/SplitWords";
import PracticeCard from "@/components/PracticeCard";
import HelpCard from "@/components/HelpCard";
import { ArrowRight, Check, FeatureIcon, Plus } from "@/components/Icons";

type PracticeDetailProps = SectionProps<AurelianPracticeDetailData> & {
  item: AurelianPracticeArea;
  /** All practice areas, for the sidebar list and the "Other Practice Areas" cards. */
  allItems?: AurelianPracticeArea[];
};

function BlockTitle({ children }: { children: string }) {
  return (
    <h2 data-reveal="up" className="display-3 flex items-center gap-4 text-ink">
      <span aria-hidden="true" className="h-px w-8 bg-gold" />
      {children}
    </h2>
  );
}

/** Article column (overview, services, process, FAQ) with a sticky sidebar of all areas and a help card. */
export default function PracticeDetail({ data = site.practiceDetailPage, item, allItems = site.practicePage.items }: PracticeDetailProps) {
  const { overviewLabel, servicesLabel, processLabel, process, faqLabel, moreEyebrow, moreLabel, moreText, moreCount, cardButton, sidebarTitle, helpCard, button } = data;
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
        <div className="container-site grid gap-14 lg:grid-cols-[1fr_360px] lg:gap-14 xl:gap-20">
          <div className="min-w-0">
            <div data-reveal="wipe" className="relative aspect-[2/1] overflow-hidden rounded-[32px] bg-bone">
              <span className="parallax absolute inset-0 block">
                <Image src={item.image.src} alt={item.image.alt} fill quality={85} sizes="(min-width: 1024px) 60vw, 92vw" className="object-cover" />
              </span>
              <span className="absolute bottom-5 left-5 grid size-[76px] place-items-center rounded-full border-[5px] border-white/80 bg-wine-deep text-gold-light">
                <FeatureIcon name={item.icon} className="size-9" />
              </span>
            </div>

            <div className="mt-10">
              <Eyebrow label={overviewLabel} />
              <h2 data-reveal="words" className="display-2 mt-4 text-ink">
                <Headline line1={item.title} />
              </h2>
              <p data-reveal="up" className="mt-2 font-display text-[22px] font-medium italic text-gold lg:text-[26px]">
                {item.subtitle}
              </p>
              <p data-reveal="up" className="statement mt-6 text-wine">
                {lead}
              </p>
              {rest.map((p, i) => (
                <p key={i} data-reveal="up" className="lead mt-5 text-body">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-14">
              <BlockTitle>{servicesLabel}</BlockTitle>
              <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
                {item.services.map((s, i) => (
                  <li key={s} data-reveal="up" data-delay={(i % 2) + 1} className="flex items-start gap-4 border-b border-line py-4 font-medium text-ink">
                    <Check className="mt-1 size-4 shrink-0 text-gold" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-14">
              <BlockTitle>{processLabel}</BlockTitle>
              <ol className="relative mt-8 grid gap-8 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
                <span aria-hidden="true" data-reveal="line" className="absolute inset-x-[12%] top-9 hidden h-px border-t border-dashed border-gold/60 xl:block" />
                {process.map((step, i) => (
                  <li key={step.title} data-reveal="up" data-delay={i + 2} className="group relative text-center">
                    <span className="relative mx-auto grid size-[72px] place-items-center rounded-full border border-gold bg-white font-display text-[26px] font-semibold text-wine transition-colors duration-500 group-hover:bg-wine group-hover:text-gold-light">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-4 font-display text-[22px] font-semibold text-ink">{step.title}</h3>
                    <p className="mt-1 text-[14px] leading-[1.6] text-body">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-14">
              <BlockTitle>{faqLabel}</BlockTitle>
              <div className="mt-6 border-t border-line">
                {item.faqs.map((faq, i) => (
                  <details key={faq.question} name="faq" open={i === 0} data-reveal="up" className="accordion group border-b border-line">
                    <summary className="flex list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                      <span className="font-display text-[21px] font-semibold leading-snug text-ink transition-colors group-hover:text-wine sm:text-[23px]">{faq.question}</span>
                      <span className="grid size-10 shrink-0 place-items-center border border-line text-wine transition-colors duration-300 group-open:border-wine group-open:bg-wine group-open:text-white">
                        <Plus className="size-4 transition-transform duration-300 group-open:rotate-45" />
                      </span>
                    </summary>
                    <p className="pb-6 pr-14 text-[16px] leading-[1.75] text-body">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <nav aria-label={sidebarTitle} className="rounded-[28px] bg-mist p-6 sm:p-7">
              <h2 className="label text-gold">{sidebarTitle}</h2>
              <ul className="mt-4">
                {allItems.map((p) => {
                  const active = p.slug === item.slug;
                  return (
                    <li key={p.slug}>
                      <Link
                        href={`/practice-areas/${p.slug}`}
                        aria-current={active ? "page" : undefined}
                        className={`group flex items-center justify-between gap-3 border-b border-line py-3.5 text-[15px] font-medium transition-[color,padding] duration-300 ${active ? "pl-3 text-wine" : "text-ink hover:pl-3 hover:text-wine"}`}
                      >
                        {p.title}
                        <ArrowRight className={`size-4 shrink-0 text-gold transition-[opacity,translate] duration-300 ${active ? "opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <HelpCard data={helpCard} button={button} />
          </aside>
        </div>
      </section>

      <section className="bg-mist section-space">
        <div className="container-site">
          <SectionHeading label={moreEyebrow} line1={moreLabel} text={moreText} align="center" />
          <div className="mt-14 grid gap-2 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {others.map(({ item: p, at }, i) => (
              <PracticeCard key={p.slug} item={p} index={at} buttonLabel={cardButton} delay={i + 1} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
