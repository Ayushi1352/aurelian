"use client";

import { useEffect, useState } from "react";
import type { AurelianTestimonial } from "@/data";
import { ArrowLeft, ArrowRight, QuoteMark } from "@/components/Icons";

const AUTOPLAY_MS = 7000;

const pad = (n: number) => String(n).padStart(2, "0");

/** One large centred quote at a time; all quotes share one grid cell so the height never jumps. */
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
  const arrow = "grid size-12 place-items-center border border-white/25 text-white transition-colors hover:border-gold hover:bg-gold";

  return (
    <div
      data-reveal="up"
      data-delay="4"
      className="mx-auto mt-14 max-w-[900px] border-t border-white/15 pt-14 text-center lg:mt-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <QuoteMark className="mx-auto h-9 w-12 text-gold" />

      <div className="mt-8 grid" aria-live="polite">
        {items.map((t, i) => {
          const active = i === index;
          return (
            <figure
              key={t.name}
              aria-hidden={!active}
              className={`[grid-area:1/1] transition-[opacity,translate,filter] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                active ? "translate-y-0 opacity-100 blur-0" : "pointer-events-none translate-y-6 opacity-0 blur-[6px]"
              }`}
            >
              <blockquote className="font-display text-[24px] font-medium italic leading-[1.4] text-white sm:text-[30px] lg:text-[36px]">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-8">
                <span className="block font-display text-[22px] font-semibold text-gold-light">{t.name}</span>
                <span className="label mt-2 block text-[10px]! text-white/55">{t.role}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      {total > 1 && (
        <div className="mt-12 flex items-center justify-center gap-6">
          <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className={arrow}>
            <ArrowLeft className="size-4" />
          </button>
          <p className="flex items-center gap-4 font-display text-[18px] font-semibold text-white/50" aria-hidden="true">
            <span className="text-white">{pad(index + 1)}</span>
            <span className="relative h-px w-16 bg-white/20">
              <span key={index} className="absolute inset-0 origin-left bg-gold" style={{ animation: `grow-x ${AUTOPLAY_MS}ms linear both`, animationPlayState: paused ? "paused" : "running" }} />
            </span>
            {pad(total)}
          </p>
          <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className={arrow}>
            <ArrowRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
