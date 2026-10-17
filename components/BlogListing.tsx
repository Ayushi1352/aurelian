import { site, type AurelianBlogPageData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import BlogGrid from "@/components/BlogGrid";

export default function BlogListing({ data = site.blogPage }: SectionProps<AurelianBlogPageData>) {
  const { label, titleLine1, titleLine2, text, perPage, cardButton, items } = data;

  return (
    <section id="blog-list" className="scroll-mt-24 section-space">
      <div className="container-site">
        <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} align="center" />
        <BlogGrid items={items} perPage={perPage} buttonLabel={cardButton} scrollTargetId="blog-list" />
      </div>
    </section>
  );
}
