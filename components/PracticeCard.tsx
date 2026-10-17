import Image from "next/image";
import Link from "next/link";
import type { AurelianPracticeArea } from "@/data";
import { ArrowRight, FeatureIcon } from "@/components/Icons";

type PracticeCardProps = {
  item: AurelianPracticeArea;
  /** Position in the full list, shown as 01, 02... */
  index: number;
  buttonLabel?: string;
  delay?: number;
};

/** White card with an arched icon; on hover the area's photo fades in under a wine tint. */
export default function PracticeCard({ item, index, buttonLabel, delay = 0 }: PracticeCardProps) {
  return (
    <article data-reveal="up" data-delay={delay} className="h-full">
      <Link
        href={`/practice-areas/${item.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-[3px] border border-line bg-white p-7 transition-[translate,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_28px_60px_rgba(37,10,16,0.18)] sm:p-9"
      >
        <Image
          src={item.tileImage.src}
          alt=""
          fill
          quality={75}
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 92vw"
          className="scale-110 object-cover opacity-0 transition-[opacity,scale] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-100"
        />
        <span aria-hidden="true" className="absolute inset-0 bg-wine-deep/[0.88] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <span className="relative flex items-start justify-between gap-4">
          <span className="arch grid h-[72px] w-16 place-items-center bg-gold-pale pt-1 text-wine transition-colors duration-500 group-hover:bg-gold group-hover:text-white">
            <FeatureIcon name={item.icon} className="size-8" />
          </span>
          <span aria-hidden="true" className="font-display text-[56px] font-semibold leading-none text-line transition-colors duration-500 group-hover:text-white/15">
            {String(index + 1).padStart(2, "0")}
          </span>
        </span>

        <span className="relative mt-8 flex flex-1 flex-col">
          <span className="label text-[11px]! text-gold transition-colors duration-500 group-hover:text-gold-light">{item.subtitle}</span>
          <h3 className="display-3 mt-2 text-ink transition-colors duration-500 group-hover:text-white">{item.title}</h3>
          <span className="mt-3 block flex-1 text-[15px] leading-[1.7] text-body transition-colors duration-500 group-hover:text-white/75">{item.excerpt}</span>
          {buttonLabel && (
            <span className="label mt-7 inline-flex items-center gap-3 text-wine transition-colors duration-500 group-hover:text-gold-light">
              {buttonLabel}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          )}
        </span>
      </Link>
    </article>
  );
}
