"use client";

import type { BlogPost, GlobalUIData } from "@/types/templates.types";
import { BlogFeatured } from "@/components/sections/BlogFeatured";
import { BlogRow } from "@/components/sections/BlogRow";
import { Pagination, usePagination } from "@/components/ui/Pagination";

type BlogGridProps = {
  items: BlogPost[];
  /** Rows per page, not counting the featured post. */
  perPage: number;
  buttonText: string;
  /** Word before the author name, e.g. "By". */
  byLabel: string;
  ui: GlobalUIData;
  scrollTargetId: string;
};

/** The first post is featured on page 1; the rest are paginated rows. */
export const BlogGrid = ({ items, perPage, buttonText, byLabel, ui, scrollTargetId }: BlogGridProps) => {
  const [featured, ...rest] = items;
  const { page, setPage, totalPages, pageItems } = usePagination(rest, perPage);

  return (
    <>
      {page === 1 && featured && <BlogFeatured post={featured} buttonText={buttonText} byLabel={byLabel} />}
      <div>
        {pageItems.map((post, i) => (
          <BlogRow key={post.id} post={post} buttonText={buttonText} byLabel={byLabel} reverse={i % 2 === 1} delay={(i % 2) + 1} />
        ))}
      </div>
      <Pagination ui={ui} page={page} totalPages={totalPages} onChange={setPage} scrollTargetId={scrollTargetId} />
    </>
  );
};
