import { site, type AurelianAboutStoryData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";

export default function AboutStory({ data = site.aboutStorySection }: SectionProps<AurelianAboutStoryData>) {
  const { label, titleLine1, titleLine2, text, milestones } = data;

  return (
    <section className="bg-mist section-space">
      <div className="container-site">
        <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} />

        <ol className="relative mt-14 grid gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-5">
          <span aria-hidden="true" data-reveal="line" className="absolute inset-x-0 top-0 hidden h-px bg-gold/60 lg:block" />
          {milestones.map((m, i) => (
            <li key={m.year} data-reveal="up" data-delay={i + 1} className="group relative border-l border-line pl-6 lg:border-l-0 lg:pl-0 lg:pr-8 lg:pt-12">
              <span aria-hidden="true" className="absolute -left-[5px] top-2 size-[9px] border border-gold bg-mist transition-colors duration-500 group-hover:bg-gold lg:left-0 lg:-top-[4px]" />
              <span className="block font-display text-[52px] font-semibold leading-none text-gold lg:text-[64px]">{m.year}</span>
              <h3 className="mt-5 font-display text-[24px] font-semibold leading-tight text-ink lg:text-[26px]">
                {m.title}
                <span className="text-gold">.</span>
              </h3>
              <p className="mt-2 text-[15px] leading-[1.7] text-body">{m.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
