"use client";

import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import type { AurelianHeroSlide } from "@/data";
import { ArrowLeft, ArrowRight } from "@/components/Icons";

const AUTOPLAY_MS = 6500;

type HeroSliderProps = {
  slides: AurelianHeroSlide[];
};

/** Cross-fading background photos; the active slide slowly zooms and its text rises in. */
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
      className="relative isolate flex min-h-[560px] items-center overflow-hidden bg-wine-deep text-white sm:min-h-[640px] lg:min-h-[calc(100svh-136px)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((s, i) => (
        <div key={s.image.src} aria-hidden={i !== index} className={`absolute inset-0 -z-20 transition-opacity duration-[1200ms] ${i === index ? "opacity-100" : "opacity-0"}`}>
          <Image
            src={s.image.src}
            alt={s.image.alt}
            fill
            priority={i === 0}
            quality={85}
            sizes="100vw"
            className={`object-cover transition-transform duration-[7000ms] ease-out ${i === index ? "scale-110" : "scale-100"}`}
          />
        </div>
      ))}
      {/* Dark wash so the white text stays readable on every photo */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-wine-deep/95 via-wine-deep/75 to-wine-deep/35" />

      <div className="container-site py-20 lg:py-24">
        {/* Re-mounted per slide so the text animates in each time */}
        <div key={index} className="max-w-[640px]">
          <p className="flex items-center gap-4 font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-white/90 sm:text-[12px] lg:text-[13px]">
            <span aria-hidden="true" className="h-px w-10 origin-left animate-[hero-rule_0.8s_var(--ease-out)_both] bg-gold" />
            <span className="animate-[hero-label_1.1s_var(--ease-out)_0.2s_both]">{slide.label}</span>
          </p>
          <h1 aria-label={slide.title} className="mt-3 font-display text-[28px] font-semibold leading-[1.15] sm:text-[36px] lg:text-[46px]">
            {slide.title.split(" ").map((word, i) => (
              <Fragment key={i}>
                <span aria-hidden="true" className="inline-block overflow-hidden pb-1 align-bottom">
                  <span className="inline-block origin-bottom-left animate-[hero-word_0.9s_var(--ease-out)_both]" style={{ animationDelay: `${0.45 + i * 0.12}s` }}>
                    {word}
                  </span>
                </span>{" "}
              </Fragment>
            ))}
            <span
              aria-hidden="true"
              className="inline-block animate-[hero-dot_0.6s_var(--ease-out)_both] text-gold"
              style={{ animationDelay: `${0.55 + slide.title.split(" ").length * 0.12}s` }}
            >
              .
            </span>
          </h1>
        </div>
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-white/30 text-white transition-colors hover:border-gold hover:bg-gold xl:grid 2xl:left-8"
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-white/30 text-white transition-colors hover:border-gold hover:bg-gold xl:grid 2xl:right-8"
          >
            <ArrowRight className="size-5" />
          </button>
          <div className="absolute inset-x-0 bottom-8 flex justify-center gap-3">
            {slides.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className={`h-2.5 rounded-full transition-[width,background-color] duration-500 ${i === index ? "w-10 bg-gold" : "w-2.5 bg-white/50 hover:bg-white"}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
