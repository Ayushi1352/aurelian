import Image from "next/image";
import Link from "next/link";
import type { AurelianPracticeArea } from "@/data";
import { ArrowUpRight } from "@/components/Icons";

type PracticeCardProps = {
  item: AurelianPracticeArea;
  /** Position in the full list, shown as 01, 02... */
  index: number;
  buttonLabel?: string;
  delay?: number;
};

/*
 * Wix-style tall photo tile with the title set large over the bottom of the image. On hover the
 * photo zooms, the excerpt rises into view and a round arrow appears (excerpt always shown on touch).
 */
export default function PracticeCard({ item, index, buttonLabel, delay = 0 }: PracticeCardProps) {
  return (
    <article data-reveal="up" data-delay={delay} className="h-full">
      <Link href={`/practice-areas/${item.slug}`} aria-label={buttonLabel ? `${item.title} - ${buttonLabel}` : undefined} className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden bg-wine-deep p-7 text-white sm:p-8">
        <Image
          src={item.tileImage.src}
          alt=""
          fill
          quality={80}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
        />
        <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-black/10 transition-colors duration-700" />
        <span aria-hidden="true" className="absolute inset-x-7 top-7 flex items-center justify-between sm:inset-x-8 sm:top-8">
          <span className="label text-[10px]! text-white/80">{String(index + 1).padStart(2, "0")}</span>
          <span className="grid size-11 scale-75 place-items-center rounded-full bg-white text-wine opacity-0 transition-[opacity,scale] duration-500 group-hover:scale-100 group-hover:opacity-100">
            <ArrowUpRight className="size-4" />
          </span>
        </span>

        <span className="relative">
          <h3 className="font-display text-[30px] font-semibold leading-[1.1] lg:text-[34px]">{item.title}</h3>
          <span className="grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:group-hover:grid-rows-[1fr]">
            <span className="overflow-hidden">
              <span className="block pt-3 text-[15px] leading-[1.7] text-white/80">{item.excerpt}</span>
            </span>
          </span>
          <span aria-hidden="true" className="mt-5 block h-px w-full origin-left scale-x-[0.15] bg-white/60 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
        </span>
      </Link>
    </article>
  );
}
