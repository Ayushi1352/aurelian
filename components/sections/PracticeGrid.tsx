"use client";

import type { GlobalUIData, PracticeArea } from "@/types/templates.types";
import { PracticeCard } from "@/components/sections/PracticeCard";
import { Pagination, usePagination } from "@/components/ui/Pagination";

type PracticeGridProps = {
  items: PracticeArea[];
  /** Tiles per page: 2 rows of the 3-column desktop grid. */
  perPage: number;
  buttonText: string;
  ui: GlobalUIData;
  scrollTargetId: string;
};

export const PracticeGrid = ({ items, perPage, buttonText, ui, scrollTargetId }: PracticeGridProps) => {
  const { page, setPage, totalPages, pageItems } = usePagination(items, perPage);

  return (
    <>
      <div className="mt-14 grid gap-2 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
        {pageItems.map((item, i) => (
          <PracticeCard key={item.id} item={item} buttonText={buttonText} delay={(i % 3) + 1} />
        ))}
      </div>
      <Pagination ui={ui} page={page} totalPages={totalPages} onChange={setPage} scrollTargetId={scrollTargetId} />
    </>
  );
};
