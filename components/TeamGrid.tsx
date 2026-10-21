"use client";

import type { AurelianPaginationLabels, AurelianTeamMember } from "@/data";
import TeamCard from "@/components/TeamCard";
import Pagination, { usePagination } from "@/components/Pagination";

type TeamGridProps = {
  items: AurelianTeamMember[];
  /** Cards per page: 2 rows of the 3-column desktop grid. */
  perPage: number;
  socialLabel: string;
  paginationLabels: AurelianPaginationLabels;
  scrollTargetId: string;
};

export default function TeamGrid({ items, perPage, socialLabel, paginationLabels, scrollTargetId }: TeamGridProps) {
  const { page, setPage, totalPages, pageItems } = usePagination(items, perPage);

  return (
    <>
      <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
        {pageItems.map((member, i) => (
          <TeamCard key={member.slug} member={member} socialLabel={socialLabel} delay={(i % 3) + 1} />
        ))}
      </div>
      <Pagination labels={paginationLabels} page={page} totalPages={totalPages} onChange={setPage} scrollTargetId={scrollTargetId} />
    </>
  );
}
