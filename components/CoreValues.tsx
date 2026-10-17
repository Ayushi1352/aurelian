import { site, type AurelianValuesData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import { FeatureIcon } from "@/components/Icons";

/** Four soft rounded cards, each with an icon in a circle ringed in gold; alternate cards sit lower for a staggered rhythm. */
export default function CoreValues({ data = site.valuesSection }: SectionProps<AurelianValuesData>) {
  const { label, titleLine1, titleLine2, text, items } = data;

  return (
    <section className="bg-mist section-space">
      <div className="container-site">
        <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} align="center" />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {items.map((v, i) => (
            <li
              key={v.title}
              data-reveal="up"
              data-delay={i + 1}
              className={`group rounded-[32px] bg-white px-7 pb-9 pt-10 text-center shadow-[0_2px_0_rgba(37,10,16,0.03)] transition-[translate,box-shadow] duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(37,10,16,0.12)] ${i % 2 === 1 ? "lg:mt-12" : ""}`}
            >
              <span className="relative mx-auto grid size-24 place-items-center">
                <span aria-hidden="true" className="absolute inset-0 rounded-full border border-dashed border-gold/60 transition-[rotate] duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-180" />
                <span className="grid size-[72px] place-items-center rounded-full bg-gold-pale text-wine transition-colors duration-500 group-hover:bg-wine group-hover:text-gold-light">
                  <FeatureIcon name={v.icon} className="size-8" />
                </span>
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
