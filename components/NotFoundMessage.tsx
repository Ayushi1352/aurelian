import Link from "next/link";
import { site, type AurelianNotFoundData, type SectionProps } from "@/data";
import { Headline } from "@/components/SplitWords";
import { ArrowRight } from "@/components/Icons";

/** Full-screen dark page under the transparent header: oversized outlined code, title and a way home. */
export default function NotFoundMessage({ data = site.notFoundPage }: SectionProps<AurelianNotFoundData>) {
  return (
    <section className="flex min-h-svh items-center bg-wine-deep pb-20 pt-[calc(var(--header-h)+48px)] text-white">
      <div className="container-site flex flex-col items-center text-center">
        <p
          aria-hidden="true"
          className="animate-[zoom-in_1.2s_var(--ease-out)_both] font-display text-[clamp(120px,22vw,260px)] font-semibold italic leading-none text-transparent [-webkit-text-stroke:1px_var(--color-gold)]"
        >
          {data.code}
        </p>
        <h1 data-words-now className="display-2 mt-4 text-balance">
          <Headline line1={data.title} />
        </h1>
        <p className="mt-4 max-w-[480px] animate-[rise_0.9s_var(--ease-out)_0.6s_both] text-[16px] leading-[1.8] text-white/70">{data.text}</p>
        <Link href={data.button.href} className="btn btn-gold mt-9 animate-[rise_0.9s_var(--ease-out)_0.75s_both]">
          {data.button.label}
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
