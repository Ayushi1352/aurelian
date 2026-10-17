"use client";

import { useEffect, useState } from "react";
import type { AurelianTestimonial } from "@/data";
import { ArrowLeft, ArrowRight, QuoteMark, Star } from "@/components/Icons";

const AUTOPLAY_MS = 7000;

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

/** One quote card at a time; all quotes share one grid cell so the height never jumps. */
export default function TestimonialSlider({ items }: { items: AurelianTestimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = items.length;

  useEffect(() => {
    if (paused || total < 2) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % total), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [index, paused, total]);

  const go = (step: number) => setIndex((i) => (i + step + total) % total);

  return (
    <div
      data-reveal="up"
      data-delay="2"
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <span aria-hidden="true" className="absolute -right-3 -top-3 hidden h-full w-full rounded-[3px] border border-gold-light/30 sm:block" />
      <div className="relative rounded-[3px] bg-white p-7 text-ink shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-10 lg:p-12">
        <div className="flex items-start justify-between gap-6">
          <QuoteMark className="h-10 w-14 text-gold" />
          <span className="flex gap-1 text-gold" aria-hidden="true">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="size-4" />
            ))}
          </span>
        </div>

        <div className="mt-8 grid" aria-live="polite">
          {items.map((t, i) => {
            const active = i === index;
            return (
              <figure
                key={t.name}
                aria-hidden={!active}
                className={`[grid-area:1/1] transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
              >
                <blockquote className="statement text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span aria-hidden="true" className="grid size-14 shrink-0 place-items-center rounded-full bg-wine font-display text-[22px] font-semibold text-gold-light">
                    {initials(t.name)}
                  </span>
                  <span>
                    <span className="block font-display text-[24px] font-semibold leading-tight text-wine">{t.name}</span>
                    <span className="label mt-1 block text-[11px]! text-muted">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>

        {total > 1 && (
          <div className="mt-10 flex items-center justify-between gap-6 border-t border-line pt-7">
            <p className="label text-muted" aria-hidden="true">
              <span className="text-wine">{String(index + 1).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="grid size-12 place-items-center rounded-full border border-line text-wine transition-colors hover:border-wine hover:bg-wine hover:text-white"
              >
                <ArrowLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="grid size-12 place-items-center rounded-full border border-wine bg-wine text-white transition-colors hover:border-gold hover:bg-gold"
              >
                <ArrowRight className="size-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
