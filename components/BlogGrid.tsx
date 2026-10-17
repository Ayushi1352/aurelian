"use client";

import type { AurelianBlogPost } from "@/data";
import BlogCard from "@/components/BlogCard";
import Pagination, { usePagination } from "@/components/Pagination";

type BlogGridProps = {
  items: AurelianBlogPost[];
  /** Cards per page: 2 rows of the 3-column desktop grid. */
  perPage: number;
  buttonLabel: string;
  scrollTargetId: string;
};

export default function BlogGrid({ items, perPage, buttonLabel, scrollTargetId }: BlogGridProps) {
  const { page, setPage, totalPages, pageItems } = usePagination(items, perPage);

  return (
    <>
      <div className="mt-14 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
        {pageItems.map((post, i) => (
          <BlogCard key={post.slug} post={post} buttonLabel={buttonLabel} delay={(i % 3) + 1} />
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} onChange={setPage} scrollTargetId={scrollTargetId} />
    </>
  );
}
