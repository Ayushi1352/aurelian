import Link from "next/link";
import { site, type AurelianNotFoundData, type SectionProps } from "@/data";
import { Headline } from "@/components/SplitWords";
import { ArrowRight } from "@/components/Icons";
import { ui } from "@/components/ui";
import { introHidden } from "@/components/motion";

export default function NotFoundMessage({ data = site.notFoundPage }: SectionProps<AurelianNotFoundData>) {
  return (
    <section className="flex min-h-[70svh] items-center bg-navy-deep py-24 text-white">
      <div className={`${ui.container} flex flex-col items-center text-center`}>
        <p
          aria-hidden="true"
          data-intro="zoom"
          className={`${introHidden} font-display text-[clamp(7.5rem,22vw,16.25rem)] font-semibold italic leading-none text-transparent [-webkit-text-stroke:0.0625rem_var(--color-gold)]`}
        >
          {data.code}
        </p>
        <h1 data-words-now className={`${ui.display2} mt-4 text-balance`}>
          <Headline line1={data.title} />
        </h1>
        <p data-intro="up" data-intro-delay="600" className={`${introHidden} mt-4 max-w-[30rem] text-[1rem] leading-[1.8] text-white/70`}>{data.text}</p>
        <Link data-intro="up" data-intro-delay="750" href={data.button.href} className={`${ui.btnGold} ${introHidden} mt-9`}>
          {data.button.label}
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
