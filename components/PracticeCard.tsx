import Image from "next/image";
import Link from "next/link";
import type { AurelianPracticeArea } from "@/data";
import { FeatureIcon } from "@/components/Icons";

type PracticeCardProps = {
  item: AurelianPracticeArea;
  /** Position in the full list, shown as 01, 02... */
  index: number;
  buttonLabel?: string;
  delay?: number;
};

/*
 * Soft-cornered photo with a round icon badge riding its lower edge, then the text on the card.
 * On hover the photo zooms, the badge turns gold and spins, and the card lifts.
 */
export default function PracticeCard({ item, index, buttonLabel, delay = 0 }: PracticeCardProps) {
  return (
    <article data-reveal="up" data-delay={delay} className="h-full">
      <Link
        href={`/practice-areas/${item.slug}`}
        className="group flex h-full flex-col rounded-[28px] border border-line bg-white p-3 transition-[translate,box-shadow,border-color] duration-500 hover:-translate-y-2 hover:border-transparent hover:shadow-[0_30px_60px_rgba(37,10,16,0.12)]"
      >
        <span className="relative block">
          <span className="relative block aspect-[4/3] overflow-hidden rounded-[22px] bg-bone">
            <Image
              src={item.tileImage.src}
              alt=""
              fill
              quality={80}
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 92vw"
              className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
            />
            <span aria-hidden="true" className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-display text-[15px] font-semibold text-wine backdrop-blur-sm">
              {String(index + 1).padStart(2, "0")}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="absolute -bottom-8 right-6 grid size-16 place-items-center rounded-full border-[5px] border-white bg-wine text-gold-light transition-[background-color,color,rotate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[360deg] group-hover:bg-gold group-hover:text-white"
          >
            <FeatureIcon name={item.icon} className="size-6" />
          </span>
        </span>

        <span className="flex flex-1 flex-col px-4 pb-5 pt-8 sm:px-5">
          <span className="label text-[10px]! text-gold">{item.subtitle}</span>
          <h3 className="display-3 mt-2 text-ink transition-colors duration-300 group-hover:text-wine">{item.title}</h3>
          <span className="mt-3 block flex-1 text-[15px] leading-[1.7] text-body">{item.excerpt}</span>
          {buttonLabel && <span className="link-arrow mt-6 text-wine">{buttonLabel}</span>}
        </span>
      </Link>
    </article>
  );
}
