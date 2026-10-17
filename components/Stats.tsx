import { site, type AurelianStatsData, type SectionProps } from "@/data";
import StatCounter from "@/components/StatCounter";
import { FeatureIcon } from "@/components/Icons";

/** Dark band with four counting numbers in thin serif, divided by hairlines. */
export default function Stats({ data = site.statsSection }: SectionProps<AurelianStatsData>) {
  return (
    <section aria-label={data.label} className="relative isolate overflow-hidden bg-wine-deep text-white">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/60 to-transparent" />
      <dl className="container-site grid grid-cols-2 py-14 lg:grid-cols-4 lg:py-20">
        {data.items.map((s, i) => (
          <div
            key={s.label}
            data-reveal="up"
            data-delay={i + 1}
            className={`group flex flex-col items-center px-3 py-6 text-center lg:py-4 ${i % 2 === 1 ? "border-l border-white/10" : ""} ${i >= 2 ? "border-t border-white/10 lg:border-t-0" : ""} ${i > 0 ? "lg:border-l" : ""}`}
          >
            <dt className="label order-2 mt-4 text-white/60">{s.label}</dt>
            <dd className="order-1 flex flex-col items-center">
              <span aria-hidden="true" className="mb-5 text-gold transition-transform duration-500 group-hover:-translate-y-1">
                <FeatureIcon name={s.icon} className="size-7" />
              </span>
              <StatCounter value={s.value} suffix={s.suffix} className="font-display text-[46px] font-medium leading-none text-white sm:text-[58px] lg:text-[68px]" />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
