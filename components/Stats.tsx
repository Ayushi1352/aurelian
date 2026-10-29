import Image from "next/image";
import { site, type AurelianStatsData, type SectionProps } from "@/data";
import StatCounter from "@/components/StatCounter";
import { ui } from "@/components/ui";

export default function Stats({ data = site.statsSection }: SectionProps<AurelianStatsData>) {
  return (
    <section aria-label={data.label} className="relative isolate overflow-hidden bg-navy-deep text-white">
      <span data-parallax aria-hidden="true" className={`${ui.parallax} absolute inset-0 -z-20 block`}>
        <Image src={data.image.src} alt={data.image.alt} fill quality={75} sizes="100vw" className="object-cover" />
      </span>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy-deep/85" />

      <dl className={`${ui.container} ${ui.sectionSpace} grid grid-cols-2 lg:grid-cols-4`}>
        {data.items.map((s, i) => (
          <div
            key={s.label}
            data-reveal="up"
            data-delay={i + 1}
            className={`flex flex-col items-center px-4 text-center lg:py-0 ${i < 2 ? "pb-8" : "pt-8"} ${i % 2 === 1 ? "border-l border-white/15" : ""} ${i >= 2 ? "border-t border-white/15 lg:border-t-0" : ""} ${i > 0 ? "lg:border-l" : ""}`}
          >
            <dt className={`${ui.label} order-2 mt-4 text-white/75`}>{s.label}</dt>
            <dd className="order-1">
              <StatCounter value={s.value} suffix={s.suffix} className="font-display text-[3rem] font-semibold leading-none text-gold-light sm:text-[3.75rem] lg:text-[4.5rem]" />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
