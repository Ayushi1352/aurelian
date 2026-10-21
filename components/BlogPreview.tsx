import Image from "next/image";
import Link from "next/link";
import { site, type AurelianBlogPost, type AurelianBlogPreviewData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import BlogCard from "@/components/BlogCard";

type BlogPreviewProps = SectionProps<AurelianBlogPreviewData> & {
  /** All posts (from the BlogListing section); the first `count` are shown. */
  items?: AurelianBlogPost[];
};

export default function BlogPreview({ data = site.blogPreviewSection, items = site.blogPage.items }: BlogPreviewProps) {
  const { label, titleLine1, titleLine2, text, count, button } = data;
  const [lead, ...rest] = items.slice(0, count);

  return (
    <section className="section-space">
      <div className="container-site">
        <SectionHeading
          label={label}
          line1={titleLine1}
          line2={titleLine2}
          text={text}
          action={
            <Link href={button.href} className="link-arrow text-navy">
              {button.label}
            </Link>
          }
        />

        {lead && (
          <Link href={`/blogs/${lead.slug}`} className="group relative mt-14 flex aspect-[4/3] items-end overflow-hidden bg-navy-deep text-white sm:aspect-[2/1] lg:mt-20">
            <span data-reveal="wipe" className="absolute inset-0 block">
              <Image
                src={lead.image.src}
                alt={lead.image.alt}
                fill
                quality={75}
                sizes="(min-width: 1400px) 1320px, 100vw"
                className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
            </span>
            <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-navy-deep/80 via-navy-deep/20 to-transparent" />
            <span className="relative p-6 sm:p-10">
              <span className="label text-[10px]! text-gold-light">
                {lead.category} &nbsp;/&nbsp; {lead.date}
              </span>
              <span className="mt-4 block max-w-[760px] font-display text-[30px] font-semibold leading-[1.12] sm:text-[44px] lg:text-[56px]">{lead.title}</span>
            </span>
          </Link>
        )}

        {rest.length > 0 && (
          <div className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:mt-16">
            {rest.map((post, i) => (
              <BlogCard key={post.slug} post={post} delay={i + 1} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
