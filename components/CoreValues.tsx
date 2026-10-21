import { site, type AurelianValuesData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import { FeatureIcon } from "@/components/Icons";

export default function CoreValues({ data = site.valuesSection }: SectionProps<AurelianValuesData>) {
  const { label, titleLine1, titleLine2, text, items } = data;

  return (
    <section className="bg-mist section-space">
      <div className="container-site">
        <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} />
        <ul className="mt-14 grid border-t border-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {items.map((v, i) => (
            <li
              key={v.title}
              data-reveal="up"
              data-delay={i + 1}
              className={`group relative border-b border-line px-1 py-10 sm:px-8 lg:border-b-0 lg:py-12 ${i % 2 === 1 ? "sm:border-l" : ""} ${i > 0 ? "lg:border-l" : ""}`}
            >
              <span aria-hidden="true" className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              <span className="flex items-center justify-between">
                <span className="label text-[10px]! text-gold">{String(i + 1).padStart(2, "0")}</span>
                <FeatureIcon name={v.icon} className="size-7 text-navy" />
              </span>
              <h3 className="mt-10 font-display text-[32px] font-semibold leading-tight text-ink lg:text-[38px]">
                {v.title}
                <span className="text-gold">.</span>
              </h3>
              <p className="mt-3 text-[15px] leading-[1.7] text-body">{v.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
