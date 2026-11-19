import type { AboutStoryProps } from '@/types/templates.types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TimelineScroller } from '@/components/ui/TimelineScroller';
import { ui } from '@/components/ui/ui';

export const AboutStory = ({ data }: AboutStoryProps) => {
  if (!data) return null;
  const { label, title, titleHighlight, text, milestones } = data;

  return (
    <section className={`bg-mist ${ui.sectionSpace}`}>
      <div className={ui.container}>
        <SectionHeading label={label} title={title} titleHighlight={titleHighlight} text={text} />

        {/* Scrolls sideways with arrows, so new milestones can be added in templates.json. */}
        <div className="mt-14 lg:mt-20">
          <TimelineScroller labels={{ previous: data.previousLabel, previousIcon: data.previousIcon, next: data.nextLabel, nextIcon: data.nextIcon }}>
            <ol className="relative flex w-max min-w-full">
              <span aria-hidden="true" data-reveal="line" className="absolute inset-x-0 top-0 h-px origin-left bg-gold/60" />
              {milestones.map((milestone, i) => (
                <li key={milestone.id} data-reveal="up" data-delay={Math.min(i + 1, 5)} className="group relative w-[16.25rem] shrink-0 snap-start pr-8 pt-12 sm:w-[18.75rem] lg:w-[20rem]">
                  <span aria-hidden="true" className="absolute -top-[0.25rem] left-0 size-[0.5625rem] border border-gold bg-mist transition-colors duration-500 group-hover:bg-gold" />
                  <span className="block font-display text-[3.25rem] font-semibold leading-none text-gold lg:text-[4rem]">{milestone.year}</span>
                  <h3 className="mt-5 font-display text-[1.5rem] font-semibold leading-tight text-ink lg:text-[1.625rem]">
                    {milestone.title}
                    <span className="text-gold">.</span>
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-[1.7] text-body">{milestone.text}</p>
                </li>
              ))}
            </ol>
          </TimelineScroller>
        </div>
      </div>
    </section>
  );
};
