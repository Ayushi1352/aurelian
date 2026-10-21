"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type TouchEvent } from "react";
import Link from "next/link";
import type { AurelianHeroData, AurelianHeroSlide, AurelianLink } from "@/data";
import { ArrowLeft, ArrowRight } from "@/components/Icons";
import { Headline } from "@/components/SplitWords";

const AUTOPLAY_MS = 6500;
/** Horizontal finger travel (px) that counts as a swipe on touch screens. */
const SWIPE_PX = 50;

type HeroSliderProps = {
  slides: AurelianHeroSlide[];
  button: AurelianLink;
  secondaryButton: AurelianLink;
  /** `{n}` in `slide` is the slide number. */
  ariaLabels: AurelianHeroData["ariaLabels"];
};

const pad = (n: number) => String(n).padStart(2, "0");

// Below desktop there are no arrows: slides auto-play and can be swiped.
export default function HeroSlider({ slides, button, secondaryButton, ariaLabels }: HeroSliderProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;

  useEffect(() => {
    if (paused || total < 2) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % total), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [index, paused, total]);

  const go = (step: number) => setIndex((i) => (i + step + total) % total);
  const slide = slides[index];

  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    if (!start || total < 2) return;
    const dx = e.changedTouches[0].clientX - start.x;
    const dy = e.changedTouches[0].clientY - start.y;
    // Only clearly sideways swipes change the slide, so vertical scrolling still works
    if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
  };

  return (
    <section
      aria-roledescription={ariaLabels.carousel}
      aria-label={slides[0].title}
      className="relative isolate flex h-[calc(82*var(--svh))] max-h-[860px] min-h-[560px] items-center overflow-hidden bg-navy-deep text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {slides.map((s, i) => (
        <div key={s.image.src} aria-hidden={i !== index} className={`absolute inset-0 -z-20 transition-opacity duration-[1400ms] ${i === index ? "opacity-100" : "opacity-0"}`}>
          <Image
            src={s.image.src}
            alt={s.image.alt}
            fill
            priority={i === 0}
            quality={75}
            sizes="100vw"
            className={`object-cover transition-transform duration-[8000ms] ease-out ${i === index ? "scale-110" : "scale-100"}`}
          />
        </div>
      ))}
      {/* Dark wash keeps the white text readable on every photo */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-navy-deep/90 via-navy-deep/60 to-navy-deep/20" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-1/3 bg-linear-to-b from-navy-deep/45 to-transparent" />

      <div className="container-site pt-4">
        {/* Re-mounted per slide so the text animates in each time */}
        <div key={index} data-words-now className="max-w-[760px]" style={{ "--words-delay": "450ms" } as CSSProperties}>
          <p className="flex items-center gap-4 font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-white/90 sm:text-[12px] lg:text-[13px]">
            <span aria-hidden="true" className="h-px w-10 origin-left animate-[hero-rule_0.8s_var(--ease-out)_both] bg-gold" />
            <span className="animate-[hero-label_1.1s_var(--ease-out)_0.2s_both]">{slide.label}</span>
          </p>
          <h1 className="mt-4 font-display text-[40px] font-semibold leading-[1.08] sm:text-[56px] lg:text-[72px]">
            <Headline line1={slide.title} />
          </h1>
          <div className="mt-9 flex animate-[rise_0.9s_var(--ease-out)_0.9s_both] flex-col gap-3 xs:flex-row [&>a]:whitespace-nowrap">
            <Link href={button.href} className="btn btn-gold">
              {button.label}
              <ArrowRight className="size-4" />
            </Link>
            <Link href={secondaryButton.href} className="btn btn-light">
              {secondaryButton.label}
            </Link>
          </div>
        </div>
      </div>

      {total > 1 && (
        <div className="absolute inset-x-0 bottom-0 border-t border-white/15">
          <div className="container-site flex h-20 items-center justify-between gap-6">
            <div className="flex items-center gap-5" aria-hidden="true">
              <span className="font-display text-[22px] font-semibold leading-none text-white">{pad(index + 1)}</span>
              {/* Time left on this slide; restarts per slide and pauses on hover */}
              <span className="relative h-px w-24 bg-white/25 sm:w-40">
                <span
                  key={index}
                  className="absolute inset-0 origin-left bg-gold"
                  style={{ animation: `grow-x ${AUTOPLAY_MS}ms linear both`, animationPlayState: paused ? "paused" : "running" }}
                />
              </span>
              <span className="font-display text-[22px] font-semibold leading-none text-white/50">{pad(total)}</span>
            </div>

            <div className="hidden items-center gap-2 lg:flex">
              {slides.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={ariaLabels.slide.replace("{n}", String(i + 1))}
                  aria-current={i === index ? "true" : undefined}
                  className="sr-only focus:not-sr-only"
                >
                  {i + 1}
                </button>
              ))}
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={ariaLabels.previous}
                className="grid size-11 place-items-center border border-white/30 text-white transition-colors hover:border-gold hover:bg-gold"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={ariaLabels.next}
                className="grid size-11 place-items-center border border-white/30 text-white transition-colors hover:border-gold hover:bg-gold"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
