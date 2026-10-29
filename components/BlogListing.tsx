import { site, type AurelianBlogPageData, type SectionProps } from "@/data";
import BlogGrid from "@/components/BlogGrid";
import { ui } from "@/components/ui";

export default function BlogListing({ data = site.blogPage }: SectionProps<AurelianBlogPageData>) {
  const { perPage, cardButton, byLabel, paginationLabels, items } = data;

  return (
    <section data-plain id="blog-list" className={`scroll-mt-28 ${ui.sectionPlain}`}>
      <div className={ui.container}>
        <BlogGrid items={items} perPage={perPage} buttonLabel={cardButton} byLabel={byLabel} paginationLabels={paginationLabels} scrollTargetId="blog-list" />
      </div>
    </section>
  );
}
