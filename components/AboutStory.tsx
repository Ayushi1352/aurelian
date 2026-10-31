import { site, type AurelianAboutStoryData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import { ui } from "@/components/ui";
import TimelineScroller from "@/components/TimelineScroller";

export default function AboutStory({ data = site.aboutStorySection }: SectionProps<AurelianAboutStoryData>) {
  const { label, titleLine1, titleLine2, text, milestones, ariaLabels } = data;

  return (
    <section className={`bg-mist ${ui.sectionSpace}`}>
      <div className={ui.container}>
        <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} />

        {/* Scrolls sideways with arrows, so new milestones can be added in site.json. */}
        <div className="mt-14 lg:mt-20">
          <TimelineScroller labels={ariaLabels}>
            <ol className="relative flex min-w-full w-max">
              <span aria-hidden="true" data-reveal="line" className="absolute inset-x-0 top-0 h-px origin-left bg-gold/60" />
              {milestones.map((m, i) => (
                <li key={m.year} data-reveal="up" data-delay={Math.min(i + 1, 5)} className="group relative w-[16.25rem] shrink-0 snap-start pr-8 pt-12 sm:w-[18.75rem] lg:w-[20rem]">
                  <span aria-hidden="true" className="absolute -top-[0.25rem] left-0 size-[0.5625rem] border border-gold bg-mist transition-colors duration-500 group-hover:bg-gold" />
                  <span className="block font-display text-[3.25rem] font-semibold leading-none text-gold lg:text-[4rem]">{m.year}</span>
                  <h3 className="mt-5 font-display text-[1.5rem] font-semibold leading-tight text-ink lg:text-[1.625rem]">
                    {m.title}
                    <span className="text-gold">.</span>
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-[1.7] text-body">{m.text}</p>
                </li>
              ))}
            </ol>
          </TimelineScroller>
        </div>
      </div>
    </section>
  );
}
