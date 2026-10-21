"use client";

import type { AurelianBlogPost, AurelianPaginationLabels } from "@/data";
import BlogFeatured from "@/components/BlogFeatured";
import BlogRow from "@/components/BlogRow";
import Pagination, { usePagination } from "@/components/Pagination";

type BlogGridProps = {
  items: AurelianBlogPost[];
  /** Rows per page, not counting the featured post. */
  perPage: number;
  buttonLabel: string;
  /** Word before the author name, e.g. "By". */
  byLabel: string;
  paginationLabels: AurelianPaginationLabels;
  scrollTargetId: string;
};

/** The first post is featured on page 1; the rest are paginated rows. */
export default function BlogGrid({ items, perPage, buttonLabel, byLabel, paginationLabels, scrollTargetId }: BlogGridProps) {
  const [featured, ...rest] = items;
  const { page, setPage, totalPages, pageItems } = usePagination(rest, perPage);
  const offset = (page - 1) * perPage;

  return (
    <>
      {page === 1 && featured && <BlogFeatured post={featured} buttonLabel={buttonLabel} byLabel={byLabel} />}
      <div>
        {pageItems.map((post, i) => (
          <BlogRow key={post.slug} post={post} buttonLabel={buttonLabel} byLabel={byLabel} number={offset + i + 2} reverse={i % 2 === 1} delay={(i % 2) + 1} />
        ))}
      </div>
      <Pagination labels={paginationLabels} page={page} totalPages={totalPages} onChange={setPage} scrollTargetId={scrollTargetId} />
    </>
  );
}
