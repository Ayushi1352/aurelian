import { site, type AurelianValuesData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import { FeatureIcon } from "@/components/Icons";

/** Four value cards, each with an arched icon and a large faint number. */
export default function CoreValues({ data = site.valuesSection }: SectionProps<AurelianValuesData>) {
  const { label, titleLine1, titleLine2, text, items } = data;

  return (
    <section className="bg-mist section-space">
      <div className="container-site">
        <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} align="center" />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {items.map((v, i) => (
            <li
              key={v.title}
              data-reveal="up"
              data-delay={i + 1}
              className="group relative overflow-hidden rounded-[3px] border border-line bg-white p-8 text-center transition-[translate,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_rgba(37,10,16,0.14)]"
            >
              <span aria-hidden="true" className="absolute right-5 top-3 font-display text-[64px] font-semibold leading-none text-line">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="arch relative mx-auto grid h-[78px] w-[68px] place-items-center bg-wine pt-1 text-gold-light transition-colors duration-500 group-hover:bg-gold group-hover:text-white">
                <FeatureIcon name={v.icon} className="size-8" />
              </span>
              <h3 className="display-3 mt-6 text-ink">{v.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.7] text-body">{v.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
