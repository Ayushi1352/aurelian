import { site, type AurelianStatsData, type SectionProps } from "@/data";
import StatCounter from "@/components/StatCounter";

/** Four oversized counting numbers in wine serif on white, divided by hairlines. */
export default function Stats({ data = site.statsSection }: SectionProps<AurelianStatsData>) {
  return (
    <section aria-label={data.label} className="bg-white">
      <dl className="container-site grid grid-cols-2 py-16 lg:grid-cols-4 lg:py-24">
        {data.items.map((s, i) => (
          <div
            key={s.label}
            data-reveal="up"
            data-delay={i + 1}
            className={`flex flex-col px-4 py-8 lg:px-8 lg:py-2 ${i % 2 === 1 ? "border-l border-line" : ""} ${i >= 2 ? "border-t border-line lg:border-t-0" : ""} ${i > 0 ? "lg:border-l" : ""}`}
          >
            <dt className="label order-2 mt-4 text-[10px]! text-muted">{s.label}</dt>
            <dd className="order-1">
              <StatCounter value={s.value} suffix={s.suffix} className="font-display text-[52px] font-medium leading-none text-wine sm:text-[68px] lg:text-[84px]" />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
