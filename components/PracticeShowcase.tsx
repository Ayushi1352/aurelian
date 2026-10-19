"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { AurelianPracticeArea } from "@/data";
import { ArrowUpRight } from "@/components/Icons";

type PracticeShowcaseProps = {
  items: AurelianPracticeArea[];
  buttonLabel: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

/*
 * Wix-style index of practice areas: large serif rows on hairlines; hovering (or focusing) a row
 * cross-fades the tall photo on the right, with that area's excerpt underneath it. On small screens
 * each row carries a small photo instead.
 */
export default function PracticeShowcase({ items, buttonLabel }: PracticeShowcaseProps) {
  const [active, setActive] = useState(0);
  // The photo being replaced stays fully visible underneath while the new one fades in over it,
  // so the swap never dips through the dark background.
  const [previous, setPrevious] = useState<number | null>(null);
  const hoverTimer = useRef<number | undefined>(undefined);
  const current = items[active];

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  const show = (i: number) => {
    window.clearTimeout(hoverTimer.current);
    if (i === active) return;
    setPrevious(active);
    setActive(i);
  };

  // A short pause before switching, so sweeping the mouse across the list doesn't flick through every photo.
  const showSoon = (i: number) => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => show(i), 140);
  };

  return (
    <div className="mt-14 grid items-start gap-12 lg:mt-20 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 xl:gap-24">
      <ul className="border-t border-line">
        {items.map((item, i) => {
          const on = i === active;
          return (
            <li key={item.slug} data-reveal="up" data-delay={(i % 4) + 1}>
              <Link
                href={`/practice-areas/${item.slug}`}
                onMouseEnter={() => showSoon(i)}
                onMouseLeave={() => window.clearTimeout(hoverTimer.current)}
                onFocus={() => show(i)}
                className="group relative flex items-center gap-5 border-b border-line py-6 sm:gap-8 lg:py-7"
              >
                <span aria-hidden="true" className={`absolute inset-x-0 -bottom-px h-px origin-left bg-gold transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${on ? "scale-x-100" : "scale-x-0"}`} />
                <span className="relative aspect-[3/4] w-14 shrink-0 overflow-hidden bg-bone sm:w-16 lg:hidden">
                  <Image src={item.tileImage.src} alt="" fill quality={70} sizes="64px" className="object-cover" />
                </span>
                <span aria-hidden="true" className={`label hidden w-10 shrink-0 text-[10px]! transition-colors duration-500 lg:block ${on ? "text-gold" : "text-muted"}`}>
                  {pad(i + 1)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block font-display text-[26px] font-semibold leading-[1.1] transition-[color,translate] duration-500 sm:text-[34px] lg:text-[44px] ${on ? "text-wine lg:translate-x-3" : "text-ink"}`}>
                    {item.title}
                  </span>
                  <span className="label mt-2 block text-[10px]! text-muted">{item.subtitle}</span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className={`size-6 shrink-0 transition-[color,rotate,opacity] duration-500 ${on ? "rotate-45 text-wine opacity-100" : "text-muted opacity-40 group-hover:opacity-100"}`}
                />
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Photo that follows the hovered row, with its excerpt underneath (large screens only) */}
      <div data-reveal="up" data-delay="2" className="sticky top-32 hidden lg:block">
        <div className="relative aspect-[3/4] overflow-hidden bg-wine-deep">
          {items.map((item, i) => (
            <Image
              key={item.slug}
              src={item.tileImage.src}
              alt={i === active ? item.tileImage.alt : ""}
              fill
              quality={80}
              sizes="34vw"
              loading="eager"
              className={`object-cover transition-[opacity,scale] duration-[1200ms,1800ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
                i === active ? "z-20 scale-100 opacity-100" : i === previous ? "z-10 scale-100 opacity-100" : "z-0 scale-[1.06] opacity-0"
              }`}
            />
          ))}
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 z-30 h-1/3 bg-linear-to-t from-black/60 to-transparent" />
          <span aria-hidden="true" className="label absolute bottom-6 left-6 z-30 text-white/85">
            {pad(active + 1)} / {pad(items.length)}
          </span>
        </div>
        <div key={active} className="mt-6 animate-[fade-in_0.9s_var(--ease-out)_both] border-t border-line pt-6">
          <p className="text-[15px] leading-[1.75] text-body">{current.excerpt}</p>
          <Link href={`/practice-areas/${current.slug}`} className="link-arrow mt-5 text-wine">
            {buttonLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
