import { site, type AurelianLegalPageData, type SectionProps } from "@/data";
import { ui } from "@/components/ui";

type Block = AurelianLegalPageData["sections"][number]["content"][number];

function ContentBlock({ block }: { block: Block }) {
  if (block.type === "list") {
    return (
      <ul className="mt-4 space-y-2.5">
        {block.items?.map((item) => (
          <li key={item} className="flex items-start gap-4 text-[1.0625rem] leading-[1.8] text-body lg:text-[1.125rem]">
            <span aria-hidden="true" className="mt-[0.8125rem] size-1.5 shrink-0 bg-gold" />
            {item}
          </li>
        ))}
      </ul>
    );
  }
  return <p className="mt-4 text-[1.0625rem] leading-[1.8] text-body lg:text-[1.125rem]">{block.text}</p>;
}

export default function LegalContent({ data = site.privacyPage }: SectionProps<AurelianLegalPageData>) {
  const { intro, sections } = data;

  return (
    <section data-plain className={ui.sectionPlain}>
      <div className={ui.container}>
        <div className="mx-auto max-w-[58.75rem]">
          <p className="border-l-4 border-gold py-1 pl-5 text-[1.125rem] leading-[1.75] text-ink sm:pl-7 lg:text-[1.25rem]">{intro}</p>

          <div className="mt-10 space-y-10 lg:mt-12 lg:space-y-12">
            {sections.map((s, i) => (
              <div key={s.title} className="border-t border-line pt-8 lg:pt-10">
                <h2 className="font-display text-[1.625rem] font-semibold leading-[1.2] text-ink lg:text-[1.875rem]">
                  <span className="text-gold">{i + 1}.</span> {s.title}
                </h2>
                {s.content.map((block, j) => (
                  <ContentBlock key={j} block={block} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
