import Link from "next/link";
import { site, type AurelianBlogPost, type AurelianBlogPreviewData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import BlogCard from "@/components/BlogCard";
import { ArrowRight } from "@/components/Icons";

type BlogPreviewProps = SectionProps<AurelianBlogPreviewData> & {
  /** All posts (from the BlogListing section); the first `count` are shown. */
  items?: AurelianBlogPost[];
};

export default function BlogPreview({ data = site.blogPreviewSection, items = site.blogPage.items }: BlogPreviewProps) {
  const { label, titleLine1, titleLine2, text, count, cardButton, button } = data;

  return (
    <section className="bg-mist section-space">
      <div className="container-site">
        <SectionHeading
          label={label}
          line1={titleLine1}
          line2={titleLine2}
          text={text}
          action={
            <Link href={button.href} className="btn border border-wine text-wine hover:bg-wine hover:text-white">
              {button.label}
              <ArrowRight className="size-4" />
            </Link>
          }
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {items.slice(0, count).map((post, i) => (
            <BlogCard key={post.slug} post={post} buttonLabel={cardButton} delay={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
