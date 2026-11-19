'use client';

import { useState } from 'react';
import type { PaginationData } from '@/types/templates.types';
import { Icon } from '@/components/ui/Icon';
import { fill, pad } from '@/components/ui/text';

/** Splits a list into pages. `page` is 1-based and clamped to the valid range. */
export const usePagination = <T,>(items: T[], perPage: number) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const current = Math.min(page, totalPages);
  const pageItems = items.slice((current - 1) * perPage, current * perPage);
  return { page: current, setPage, totalPages, pageItems };
};

type PaginationProps = {
  /** Screen-reader labels and arrow icons; `{n}` in `pageLabel` is the page number. */
  data: PaginationData;
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  /** Element to scroll back to when the page changes. */
  scrollTargetId?: string;
  dark?: boolean;
};

export const Pagination = ({ data, page, totalPages, onChange, scrollTargetId, dark = false }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const go = (next: number) => {
    if (next < 1 || next > totalPages || next === page) return;
    onChange(next);
    if (scrollTargetId) document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const arrow = `grid size-12 place-items-center border transition-colors disabled:opacity-30 ${
    dark ? 'border-white/25 text-white enabled:hover:border-gold enabled:hover:bg-gold' : 'border-line text-navy enabled:hover:border-navy enabled:hover:bg-navy enabled:hover:text-white'
  }`;

  return (
    <nav aria-label={data.label} className="mt-14 flex items-center justify-center gap-3 lg:mt-16">
      <button type="button" onClick={() => go(page - 1)} disabled={page === 1} aria-label={data.previousLabel} className={arrow}>
        <Icon name={data.previousIcon} className="size-5" strokeWidth={2} />
      </button>

      <ul className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <li key={n}>
            <button
              type="button"
              onClick={() => go(n)}
              aria-label={fill(data.pageLabel, { n })}
              aria-current={n === page ? 'page' : undefined}
              className={`grid size-12 place-items-center font-display text-[1.375rem] font-semibold leading-none transition-colors ${
                n === page ? 'bg-navy text-gold-light' : dark ? 'text-white/60 hover:text-white' : 'text-ink hover:text-gold'
              }`}
            >
              {pad(n)}
            </button>
          </li>
        ))}
      </ul>

      <button type="button" onClick={() => go(page + 1)} disabled={page === totalPages} aria-label={data.nextLabel} className={arrow}>
        <Icon name={data.nextIcon} className="size-5" strokeWidth={2} />
      </button>
    </nav>
  );
};
