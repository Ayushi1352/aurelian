import { site, type AurelianBlogPageData, type SectionProps } from "@/data";
import BlogGrid from "@/components/BlogGrid";

export default function BlogListing({ data = site.blogPage }: SectionProps<AurelianBlogPageData>) {
  const { perPage, cardButton, byLabel, paginationLabels, items } = data;

  return (
    <section id="blog-list" className="scroll-mt-28 section-space">
      <div className="container-site">
        <BlogGrid items={items} perPage={perPage} buttonLabel={cardButton} byLabel={byLabel} paginationLabels={paginationLabels} scrollTargetId="blog-list" />
      </div>
    </section>
  );
}
