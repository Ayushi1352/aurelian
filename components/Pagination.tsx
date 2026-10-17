"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "@/components/Icons";

/** Splits a list into pages. `page` is 1-based and clamped to the valid range. */
export function usePagination<T>(items: T[], perPage: number) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const current = Math.min(page, totalPages);
  const pageItems = items.slice((current - 1) * perPage, current * perPage);
  return { page: current, setPage, totalPages, pageItems };
}

type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  /** Element to scroll back to when the page changes. */
  scrollTargetId?: string;
  dark?: boolean;
};

export default function Pagination({ page, totalPages, onChange, scrollTargetId, dark = false }: PaginationProps) {
  if (totalPages <= 1) return null;

  function go(next: number) {
    if (next < 1 || next > totalPages || next === page) return;
    onChange(next);
    if (scrollTargetId) document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const arrow = `grid size-12 place-items-center border transition-colors disabled:opacity-30 ${
    dark ? "border-white/25 text-white enabled:hover:border-gold enabled:hover:bg-gold" : "border-line text-wine enabled:hover:border-wine enabled:hover:bg-wine enabled:hover:text-white"
  }`;

  return (
    <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-3 lg:mt-16">
      <button type="button" onClick={() => go(page - 1)} disabled={page === 1} aria-label="Previous page" className={arrow}>
        <ArrowLeft className="size-5" />
      </button>

      <ul className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <li key={n}>
            <button
              type="button"
              onClick={() => go(n)}
              aria-label={`Page ${n}`}
              aria-current={n === page ? "page" : undefined}
              className={`grid size-12 place-items-center font-display text-[22px] font-semibold leading-none transition-colors ${
                n === page ? "bg-wine text-gold-light" : dark ? "text-white/60 hover:text-white" : "text-ink hover:text-gold"
              }`}
            >
              {String(n).padStart(2, "0")}
            </button>
          </li>
        ))}
      </ul>

      <button type="button" onClick={() => go(page + 1)} disabled={page === totalPages} aria-label="Next page" className={arrow}>
        <ArrowRight className="size-5" />
      </button>
    </nav>
  );
}
