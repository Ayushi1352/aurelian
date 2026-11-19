'use client';

import { useEffect, useRef, useState } from 'react';

type CountUpProps = {
  value: number;
  suffix?: string;
  /** How long the count takes */
  durationMs: number;
  className?: string;
};

/** Counts up from 0 to `value` the first time it scrolls into view. */
export const CountUp = ({ value, suffix = '', durationMs, className = '' }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    setCurrent(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          setCurrent(Math.round(value * (1 - Math.pow(1 - t, 3))));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {current.toLocaleString('en-US')}
      {suffix}
    </span>
  );
};
