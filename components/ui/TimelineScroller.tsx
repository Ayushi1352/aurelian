'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Icon } from '@/components/ui/Icon';

type TimelineScrollerProps = {
  children: ReactNode;
  /** Screen-reader text and icons of the arrow buttons. */
  labels: { previous: string; previousIcon: string; next: string; nextIcon: string };
};

const arrowClass =
  'grid size-12 place-items-center border border-navy/25 text-navy transition-colors hover:border-gold hover:bg-gold hover:text-white disabled:pointer-events-none disabled:opacity-30';

/** Sideways strip with prev/next arrows; each click moves by one milestone. */
export const TimelineScroller = ({ children, labels }: TimelineScrollerProps) => {
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => setEdges({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const go = (dir: number) => {
    const el = track.current;
    const step = el?.querySelector('li')?.getBoundingClientRect().width ?? 300;
    el?.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <>
      <div ref={track} className="snap-x snap-mandatory overflow-x-auto pt-1 [scrollbar-width:none]">
        {children}
      </div>
      {!(edges.start && edges.end) && (
        <div className="mt-10 flex justify-end gap-2">
          <button type="button" onClick={() => go(-1)} disabled={edges.start} aria-label={labels.previous} className={arrowClass}>
            <Icon name={labels.previousIcon} className="size-4" strokeWidth={2} />
          </button>
          <button type="button" onClick={() => go(1)} disabled={edges.end} aria-label={labels.next} className={arrowClass}>
            <Icon name={labels.nextIcon} className="size-4" strokeWidth={2} />
          </button>
        </div>
      )}
    </>
  );
};
