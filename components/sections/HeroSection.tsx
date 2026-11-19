'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type TouchEvent } from 'react';
import Link from 'next/link';
import type { HeroSectionProps } from '@/types/templates.types';
import { Icon } from '@/components/ui/Icon';
import { Headline } from '@/components/ui/SplitWords';
import { ui } from '@/components/ui/ui';
import { fill, pad } from '@/components/ui/text';
import { introHidden, introLine } from '@/components/ui/motion';

/** Horizontal finger travel (px) that counts as a swipe on touch screens. */
const SWIPE_PX = 50;

// Below desktop there are no arrows: slides auto-play and can be swiped.
export const HeroSection = ({ data }: HeroSectionProps) => {
  const slides = data?.slides ?? [];
  const intervalMs = data?.sliderIntervalMs ?? 0;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;

  useEffect(() => {
    if (paused || total < 2 || !intervalMs) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % total), intervalMs);
    return () => window.clearTimeout(t);
  }, [index, paused, total, intervalMs]);

  // Time-left bar: restarts per slide and pauses on hover, like the autoplay timer.
  const bar = useRef<HTMLSpanElement>(null);
  const barAnimation = useRef<Animation | null>(null);
  const pausedRef = useRef(paused);
  useEffect(() => {
    const animation = bar.current?.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: intervalMs, fill: 'both' });
    if (animation && pausedRef.current) animation.pause();
    barAnimation.current = animation ?? null;
    return () => animation?.cancel();
  }, [index, intervalMs]);
  useEffect(() => {
    pausedRef.current = paused;
    if (paused) barAnimation.current?.pause();
    else barAnimation.current?.play();
  }, [paused]);

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

  if (!data || !slide) return null;

  return (
    <section
      aria-roledescription={data.carouselLabel}
      aria-label={slides[0].title}
      className="relative isolate flex h-[82svh] max-h-[53.75rem] min-h-[35rem] items-center overflow-hidden bg-navy-deep text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {slides.map((s, i) => (
        <div key={s.id} aria-hidden={i !== index} className={`absolute inset-0 -z-20 transition-opacity duration-[1400ms] ${i === index ? 'opacity-100' : 'opacity-0'}`}>
          <Image
            src={s.image}
            alt={s.imageAlt}
            fill
            priority={i === 0}
            quality={75}
            sizes="100vw"
            className={`object-cover transition-transform duration-[8000ms] ease-out ${i === index ? 'scale-110' : 'scale-100'}`}
          />
        </div>
      ))}
      {/* Dark wash keeps the white text readable on every photo */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep/90 via-navy-deep/60 to-navy-deep/20" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-1/3 bg-gradient-to-b from-navy-deep/45 to-transparent" />

      <div className={`${ui.container} pt-4`}>
        {/* Re-mounted per slide so the text animates in each time */}
        <div key={index} data-words-now data-words-delay="450" className="max-w-[47.5rem]">
          <p className="flex items-center gap-4 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.3em] text-white/90 sm:text-[0.75rem] lg:text-[0.8125rem]">
            <span aria-hidden="true" data-intro="line" className={`h-px w-10 bg-gold ${introLine}`} />
            <span data-intro="label" data-intro-delay="200" className={introHidden}>
              {slide.label}
            </span>
          </p>
          <h1 className="mt-4 font-display text-[2.5rem] font-semibold leading-[1.08] sm:text-[3.5rem] lg:text-[4.5rem]">
            <Headline line1={slide.title} />
          </h1>
          <div data-intro="up" data-intro-delay="900" className={`mt-9 flex flex-col gap-3 xs:flex-row [&>a]:whitespace-nowrap ${introHidden}`}>
            <Link href={data.buttonUrl} className={ui.btnGold}>
              {data.buttonText}
              <Icon name={data.buttonIcon} className="size-4" strokeWidth={2} />
            </Link>
            <Link href={data.secondaryButtonUrl} className={ui.btnLight}>
              {data.secondaryButtonText}
            </Link>
          </div>
        </div>
      </div>

      {total > 1 && (
        <div className="absolute inset-x-0 bottom-0 border-t border-white/15">
          <div className={`${ui.container} flex h-20 items-center justify-between gap-6`}>
            <div className="flex items-center gap-5" aria-hidden="true">
              <span className="font-display text-[1.375rem] font-semibold leading-none text-white">{pad(index + 1)}</span>
              {/* Time left on this slide; restarts per slide and pauses on hover */}
              <span className="relative h-px w-24 bg-white/25 sm:w-40">
                <span ref={bar} className="absolute inset-0 origin-left scale-x-0 bg-gold" />
              </span>
              <span className="font-display text-[1.375rem] font-semibold leading-none text-white/50">{pad(total)}</span>
            </div>

            <div className="hidden items-center gap-2 lg:flex">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={fill(data.slideLabel, { n: i + 1 })}
                  aria-current={i === index ? 'true' : undefined}
                  className="sr-only focus:not-sr-only"
                >
                  {i + 1}
                </button>
              ))}
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={data.previousLabel}
                className="grid size-11 place-items-center border border-white/30 text-white transition-colors hover:border-gold hover:bg-gold"
              >
                <Icon name={data.previousIcon} className="size-4" strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={data.nextLabel}
                className="grid size-11 place-items-center border border-white/30 text-white transition-colors hover:border-gold hover:bg-gold"
              >
                <Icon name={data.nextIcon} className="size-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
