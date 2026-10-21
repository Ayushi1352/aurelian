"use client";

import type { AurelianPaginationLabels, AurelianPracticeArea } from "@/data";
import PracticeCard from "@/components/PracticeCard";
import Pagination, { usePagination } from "@/components/Pagination";

type PracticeGridProps = {
  items: AurelianPracticeArea[];
  /** Tiles per page: 2 rows of the 3-column desktop grid. */
  perPage: number;
  buttonLabel: string;
  paginationLabels: AurelianPaginationLabels;
  scrollTargetId: string;
};

export default function PracticeGrid({ items, perPage, buttonLabel, paginationLabels, scrollTargetId }: PracticeGridProps) {
  const { page, setPage, totalPages, pageItems } = usePagination(items, perPage);
  const offset = (page - 1) * perPage;

  return (
    <>
      <div className="mt-14 grid gap-2 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
        {pageItems.map((item, i) => (
          <PracticeCard key={item.slug} item={item} index={offset + i} buttonLabel={buttonLabel} delay={(i % 3) + 1} />
        ))}
      </div>
      <Pagination labels={paginationLabels} page={page} totalPages={totalPages} onChange={setPage} scrollTargetId={scrollTargetId} />
    </>
  );
}
