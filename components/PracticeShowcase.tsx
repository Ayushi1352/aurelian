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

/*
 * Interactive index of practice areas: hovering (or focusing) a row cross-fades the photo on the
 * right and shows that area's excerpt. On small screens each row carries a round thumbnail instead.
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
    <div className="mt-14 grid items-start gap-12 lg:mt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 xl:gap-24">
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
                className="group relative flex items-center gap-5 border-b border-line py-5 sm:gap-8 lg:py-6"
              >
                <span aria-hidden="true" className={`absolute inset-x-0 -bottom-px h-px origin-left bg-wine transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${on ? "scale-x-100" : "scale-x-0"}`} />
                <span className="relative size-16 shrink-0 overflow-hidden rounded-full bg-bone lg:hidden">
                  <Image src={item.tileImage.src} alt="" fill quality={70} sizes="64px" className="object-cover" />
                </span>
                <span aria-hidden="true" className={`hidden w-10 shrink-0 font-display text-[20px] font-semibold transition-colors duration-500 lg:block ${on ? "text-gold" : "text-muted/60"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block font-display text-[24px] font-semibold leading-tight transition-[color,translate] duration-500 sm:text-[30px] lg:text-[34px] ${on ? "text-wine lg:translate-x-2" : "text-ink"}`}>
                    {item.title}
                  </span>
                  <span className="label mt-2 block text-[10px]! text-muted">{item.subtitle}</span>
                </span>
                <span
                  aria-hidden="true"
                  className={`grid size-12 shrink-0 place-items-center rounded-full border transition-[background-color,border-color,color,rotate] duration-500 ${
                    on ? "rotate-45 border-wine bg-wine text-white" : "border-line text-wine"
                  }`}
                >
                  <ArrowUpRight className="size-4" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Photo that follows the hovered row, with a white info card floating on it (large screens only) */}
      <div data-reveal="up" data-delay="2" className="sticky top-32 hidden lg:block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-wine-deep">
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
          <span aria-hidden="true" className="absolute right-5 top-5 z-30 rounded-full bg-white/90 px-4 py-1.5 font-display text-[16px] font-semibold text-wine backdrop-blur-sm">
            {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
          <div key={active} className="absolute inset-x-5 bottom-5 z-30 animate-[fade-in_0.9s_var(--ease-out)_both] rounded-[18px] bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] xl:p-7">
            <p className="label text-[10px]! text-gold">{current.subtitle}</p>
            <p className="mt-2 font-display text-[24px] font-semibold leading-tight text-ink">
              {current.title}
              <span className="text-gold">.</span>
            </p>
            <p className="mt-2 text-[14px] leading-[1.7] text-body">{current.excerpt}</p>
            <Link href={`/practice-areas/${current.slug}`} className="link-arrow mt-4 text-wine">
              {buttonLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
