import Image from "next/image";
import Link from "next/link";
import { site, type AurelianPracticeArea, type AurelianPracticeDetailData, type SectionProps } from "@/data";
import SectionHeading, { Eyebrow } from "@/components/SectionHeading";
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
    <h2 data-reveal="up" className="display-3 flex items-center gap-3 text-ink">
      <span aria-hidden="true" className="diamond text-gold" />
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
            <div data-reveal="up" className="relative aspect-[2/1] overflow-hidden rounded-[3px] bg-bone">
              <Image src={item.image.src} alt={item.image.alt} fill quality={85} sizes="(min-width: 1024px) 60vw, 92vw" className="object-cover" />
              <span className="arch absolute bottom-0 left-6 grid h-[84px] w-[72px] place-items-center bg-wine pt-1 text-gold-light sm:left-8">
                <FeatureIcon name={item.icon} className="size-9" />
              </span>
            </div>

            <div className="mt-10">
              <Eyebrow label={overviewLabel} />
              <h2 data-reveal="up" className="display-2 mt-4 text-ink">
                {item.title}
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
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {item.services.map((s, i) => (
                  <li key={s} data-reveal="up" data-delay={(i % 2) + 1} className="flex items-start gap-3 rounded-[3px] border border-line bg-mist px-5 py-4 font-medium text-ink">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-wine text-gold-light">
                      <Check className="size-3.5" />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-14">
              <BlockTitle>{processLabel}</BlockTitle>
              <ol className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {process.map((step, i) => (
                  <li key={step.title} data-reveal="up" data-delay={i + 1} className="relative rounded-[3px] border border-line p-6 text-center">
                    <span className="arch mx-auto grid h-16 w-14 place-items-center bg-gold-pale pt-1 font-display text-[26px] font-semibold text-wine">{i + 1}</span>
                    <h3 className="mt-4 font-display text-[22px] font-semibold text-ink">{step.title}</h3>
                    <p className="mt-1 text-[14px] leading-[1.6] text-body">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-14">
              <BlockTitle>{faqLabel}</BlockTitle>
              <div className="mt-6 space-y-3">
                {item.faqs.map((faq, i) => (
                  <details key={faq.question} name="faq" open={i === 0} data-reveal="up" className="accordion group rounded-[3px] border border-line bg-white open:border-wine/30 open:bg-mist">
                    <summary className="flex list-none items-center justify-between gap-6 px-5 py-5 sm:px-6 [&::-webkit-details-marker]:hidden">
                      <span className="font-display text-[21px] font-semibold leading-snug text-ink transition-colors group-hover:text-wine sm:text-[23px]">{faq.question}</span>
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gold-pale text-wine transition-colors duration-300 group-open:bg-wine group-open:text-white">
                        <Plus className="size-4 transition-transform duration-300 group-open:rotate-45" />
                      </span>
                    </summary>
                    <p className="px-5 pb-6 text-[16px] leading-[1.75] text-body sm:px-6">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <nav aria-label={sidebarTitle} className="rounded-[3px] border border-line bg-mist p-6 sm:p-7">
              <h2 className="display-3 text-ink">{sidebarTitle}</h2>
              <ul className="mt-5 space-y-2">
                {allItems.map((p) => {
                  const active = p.slug === item.slug;
                  return (
                    <li key={p.slug}>
                      <Link
                        href={`/practice-areas/${p.slug}`}
                        aria-current={active ? "page" : undefined}
                        className={`group flex items-center justify-between gap-3 rounded-[3px] px-4 py-3 text-[15px] font-medium transition-colors ${active ? "bg-wine text-white" : "bg-white text-ink hover:bg-wine hover:text-white"}`}
                      >
                        {p.title}
                        <ArrowRight className={`size-4 shrink-0 transition-transform group-hover:translate-x-1 ${active ? "text-gold-light" : "text-gold"}`} />
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
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
            {others.map(({ item: p, at }, i) => (
              <PracticeCard key={p.slug} item={p} index={at} buttonLabel={cardButton} delay={i + 1} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
