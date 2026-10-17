"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import type { AurelianHeroSlide } from "@/data";
import { ArrowLeft, ArrowRight } from "@/components/Icons";
import { Headline } from "@/components/SplitWords";

const AUTOPLAY_MS = 6500;

type HeroSliderProps = {
  slides: AurelianHeroSlide[];
};

const pad = (n: number) => String(n).padStart(2, "0");

/*
 * Full-screen cross-fading photos under the transparent header. The active photo slowly zooms; its
 * label and headline animate in word by word; a gold bar shows the time left on the slide.
 */
export default function HeroSlider({ slides }: HeroSliderProps) {
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

  return (
    <section
      aria-roledescription="carousel"
      aria-label={slides[0].title}
      className="relative isolate flex min-h-[600px] items-center overflow-hidden bg-wine-deep pt-(--header-h) text-white h-svh max-h-[1100px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((s, i) => (
        <div key={s.image.src} aria-hidden={i !== index} className={`absolute inset-0 -z-20 transition-opacity duration-[1400ms] ${i === index ? "opacity-100" : "opacity-0"}`}>
          <Image
            src={s.image.src}
            alt={s.image.alt}
            fill
            priority={i === 0}
            quality={85}
            sizes="100vw"
            className={`object-cover transition-transform duration-[8000ms] ease-out ${i === index ? "scale-110" : "scale-100"}`}
          />
        </div>
      ))}
      {/* Dark wash so the white text stays readable on every photo, deeper at the top under the header */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-wine-deep/90 via-wine-deep/60 to-wine-deep/20" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-1/3 bg-linear-to-b from-black/45 to-transparent" />

      <div className="container-site pb-24">
        {/* Re-mounted per slide so the text animates in each time */}
        <div key={index} data-words-now className="max-w-[640px]" style={{ "--words-delay": "450ms" } as CSSProperties}>
          <p className="flex items-center gap-4 font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-white/90 sm:text-[12px] lg:text-[13px]">
            <span aria-hidden="true" className="h-px w-10 origin-left animate-[hero-rule_0.8s_var(--ease-out)_both] bg-gold" />
            <span className="animate-[hero-label_1.1s_var(--ease-out)_0.2s_both]">{slide.label}</span>
          </p>
          <h1 className="mt-3 font-display text-[28px] font-semibold leading-[1.15] sm:text-[36px] lg:text-[46px]">
            <Headline line1={slide.title} />
          </h1>
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

            <div className="flex items-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Slide ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  className="sr-only focus:not-sr-only"
                >
                  {i + 1}
                </button>
              ))}
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous slide"
                className="grid size-11 place-items-center border border-white/30 text-white transition-colors hover:border-gold hover:bg-gold"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next slide"
                className="grid size-11 place-items-center border border-white/30 text-white transition-colors hover:border-gold hover:bg-gold"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scroll cue */}
      <span aria-hidden="true" className="absolute bottom-24 left-1/2 hidden h-14 w-px -translate-x-1/2 overflow-hidden bg-white/20 md:block">
        <span className="animate-scroll-line absolute inset-0 bg-gold" />
      </span>
    </section>
  );
}
