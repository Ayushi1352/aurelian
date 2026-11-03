import Image from "next/image";
import Link from "next/link";
import type { BlogPost, BlogPreviewData } from "@/types/templates.types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogCard } from "@/components/sections/BlogCard";
import { ui } from "@/components/ui/ui";

type BlogPreviewProps = {
  data?: BlogPreviewData;
  /** All posts (from the Blogs section); the first `count` are shown. */
  items?: BlogPost[];
};

export const BlogPreview = ({ data, items = [] }: BlogPreviewProps) => {
  if (!data) return null;
  const { label, titleLine1, titleLine2, text, count } = data;
  const [lead, ...rest] = items.slice(0, count);

  return (
    <section data-plain className={ui.sectionPlain}>
      <div className={ui.container}>
        <SectionHeading
          label={label}
          line1={titleLine1}
          line2={titleLine2}
          text={text}
          action={
            <Link href={data.buttonUrl} className={`${ui.linkArrow} text-navy`}>
              {data.buttonText}
            </Link>
          }
        />

        {lead && (
          <Link href={lead.url} className="group relative mt-14 flex aspect-[4/3] items-end overflow-hidden bg-navy-deep text-white sm:aspect-[2/1] lg:mt-20">
            <span data-reveal="wipe" className="absolute inset-0 block">
              <Image
                src={lead.image}
                alt={lead.imageAlt}
                fill
                quality={75}
                sizes="(min-width: 1400px) 1320px, 100vw"
                className="object-cover transition-transform duration-[1.6s] ease-smooth group-hover:scale-[1.04]"
              />
            </span>
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/20 to-transparent" />
            <span className="relative p-6 sm:p-10">
              <span className={`${ui.labelSmall} text-gold-light`}>
                {lead.category} &nbsp;/&nbsp; {lead.date}
              </span>
              <span className="mt-4 block max-w-[47.5rem] font-display text-[1.875rem] font-semibold leading-[1.12] sm:text-[2.75rem] lg:text-[3.5rem]">{lead.title}</span>
            </span>
          </Link>
        )}

        {rest.length > 0 && (
          <div className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:mt-16">
            {rest.map((post, i) => (
              <BlogCard key={post.id} post={post} delay={i + 1} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
