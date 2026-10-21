import Image from "next/image";
import Link from "next/link";
import type { AurelianPracticeArea } from "@/data";
import { ArrowUpRight } from "@/components/Icons";

type PracticeCardProps = {
  item: AurelianPracticeArea;
  /** Position in the full list, shown as 01, 02... */
  index: number;
  buttonLabel: string;
  delay?: number;
};

export default function PracticeCard({ item, index, buttonLabel, delay = 0 }: PracticeCardProps) {
  return (
    <article data-reveal="up" data-delay={delay} className="h-full">
      <Link
        href={`/practice-areas/${item.slug}`}
        aria-label={`${item.title} - ${buttonLabel}`}
        className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden bg-navy-deep p-7 text-white sm:p-8"
      >
        <Image
          src={item.tileImage.src}
          alt=""
          fill
          quality={75}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
        />
        <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-navy-deep/90 via-navy-deep/45 to-navy-deep/15" />
        <span aria-hidden="true" className="absolute inset-x-7 top-7 flex items-center justify-between sm:inset-x-8 sm:top-8">
          <span className="label text-[10px]! text-white/80">{String(index + 1).padStart(2, "0")}</span>
          <span className="grid size-11 scale-75 place-items-center bg-white text-navy opacity-0 transition-[opacity,scale] duration-500 group-hover:scale-100 group-hover:opacity-100">
            <ArrowUpRight className="size-4" />
          </span>
        </span>

        <span className="relative">
          <h3 className="font-display text-[30px] font-semibold leading-[1.1] lg:text-[36px]">{item.title}</h3>
          <span className="label mt-3 block text-[10px]! text-gold-light">{item.subtitle}</span>
          <span aria-hidden="true" className="mt-5 block h-px w-full origin-left scale-x-[0.15] bg-white/60 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
        </span>
      </Link>
    </article>
  );
}
