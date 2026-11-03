"use client";

import type { GlobalUIData, TeamMember } from "@/types/templates.types";
import { TeamCard } from "@/components/sections/TeamCard";
import { Pagination, usePagination } from "@/components/ui/Pagination";

type TeamGridProps = {
  items: TeamMember[];
  /** Cards per page: 2 rows of the 3-column desktop grid. */
  perPage: number;
  ui: GlobalUIData;
  scrollTargetId: string;
};

export const TeamGrid = ({ items, perPage, ui, scrollTargetId }: TeamGridProps) => {
  const { page, setPage, totalPages, pageItems } = usePagination(items, perPage);

  return (
    <>
      <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
        {pageItems.map((member, i) => (
          <TeamCard key={member.id} member={member} socialProfile={ui.socialProfile} delay={(i % 3) + 1} />
        ))}
      </div>
      <Pagination ui={ui} page={page} totalPages={totalPages} onChange={setPage} scrollTargetId={scrollTargetId} />
    </>
  );
};
