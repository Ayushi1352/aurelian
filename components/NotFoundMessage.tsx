import Link from "next/link";
import { site, type AurelianNotFoundData, type SectionProps } from "@/data";
import { ArrowRight, FeatureIcon } from "@/components/Icons";

export default function NotFoundMessage({ data = site.notFoundPage }: SectionProps<AurelianNotFoundData>) {
  return (
    <section className="bg-mist section-space">
      <div className="container-site flex flex-col items-center text-center">
        <div className="arch relative grid w-full max-w-[340px] place-items-center bg-wine px-6 pb-10 pt-14 text-white sm:max-w-[400px]">
          <span aria-hidden="true" className="arch absolute inset-3 border border-gold-light/40" />
          <FeatureIcon name="scale" className="size-12 text-gold-light" />
          <p className="mt-2 font-display text-[clamp(96px,16vw,150px)] font-semibold italic leading-none text-gold-light">{data.code}</p>
        </div>
        <h1 className="display-2 mt-10 text-ink">{data.title}</h1>
        <p className="lead mt-4 max-w-[480px] text-body">{data.text}</p>
        <Link href={data.button.href} className="btn mt-9 bg-wine text-white hover:bg-gold">
          {data.button.label}
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
