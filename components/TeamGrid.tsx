"use client";

import type { AurelianTeamMember } from "@/data";
import TeamCard from "@/components/TeamCard";
import Pagination, { usePagination } from "@/components/Pagination";

type TeamGridProps = {
  items: AurelianTeamMember[];
  /** Cards per page: 2 rows of the 4-column desktop grid. */
  perPage: number;
  scrollTargetId: string;
};

export default function TeamGrid({ items, perPage, scrollTargetId }: TeamGridProps) {
  const { page, setPage, totalPages, pageItems } = usePagination(items, perPage);

  return (
    <>
      <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {pageItems.map((member, i) => (
          <TeamCard key={member.slug} member={member} delay={(i % 4) + 1} />
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} onChange={setPage} scrollTargetId={scrollTargetId} />
    </>
  );
}
