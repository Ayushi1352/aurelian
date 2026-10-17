import { site, type AurelianStatsData, type SectionProps } from "@/data";
import StatCounter from "@/components/StatCounter";
import { FeatureIcon } from "@/components/Icons";

/** Wine band with four animated numbers, each under an arched gold icon. */
export default function Stats({ data = site.statsSection }: SectionProps<AurelianStatsData>) {
  return (
    <section aria-label={data.label} className="relative isolate overflow-hidden bg-wine text-white">
      <div aria-hidden="true" className="pattern-dots absolute inset-0 -z-10" />
      <dl className="container-site grid grid-cols-2 py-14 lg:grid-cols-4 lg:py-20">
        {data.items.map((s, i) => (
          <div
            key={s.label}
            data-reveal="up"
            data-delay={i + 1}
            className={`flex flex-col items-center px-3 py-6 text-center lg:py-2 ${i % 2 === 1 ? "border-l border-white/15" : ""} ${i >= 2 ? "border-t border-white/15 lg:border-t-0" : ""} ${i > 0 ? "lg:border-l" : ""}`}
          >
            <dt className="label order-2 mt-3 text-white/75">{s.label}</dt>
            <dd className="order-1 flex flex-col items-center font-display text-[44px] font-semibold leading-none text-gold-light sm:text-[56px] lg:text-[64px]">
              <span aria-hidden="true" className="arch mb-5 grid h-16 w-14 place-items-center border border-gold-light/50 pt-1">
                <FeatureIcon name={s.icon} className="size-7" />
              </span>
              <StatCounter value={s.value} suffix={s.suffix} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
