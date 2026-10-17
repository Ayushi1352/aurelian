import Link from "next/link";
import { site, type AurelianPracticeArea } from "@/data";

/** Slow, endless strip of practice area names under the hero; pauses on hover. */
export default function PracticeMarquee({ items = site.practicePage.items }: { items?: AurelianPracticeArea[] }) {
  // Two identical halves: the strip slides by half its width, then starts over without a jump.
  const loop = [...items, ...items];

  return (
    <section aria-label="Practice areas" className="group overflow-hidden border-b border-white/10 bg-wine-deep py-6 text-white lg:py-8">
      <ul className="animate-marquee flex w-max items-center group-hover:[animation-play-state:paused]">
        {loop.map((item, i) => (
          <li key={i} aria-hidden={i >= items.length} className="flex items-center">
            <Link
              href={`/practice-areas/${item.slug}`}
              tabIndex={i >= items.length ? -1 : undefined}
              className="whitespace-nowrap px-8 font-display text-[24px] font-medium italic text-white/80 transition-colors hover:text-gold-light lg:px-12 lg:text-[32px]"
            >
              {item.title}
            </Link>
            <span aria-hidden="true" className="size-1.5 rotate-45 bg-gold" />
          </li>
        ))}
      </ul>
    </section>
  );
}
