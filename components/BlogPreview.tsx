import Image from "next/image";
import Link from "next/link";
import { site, type AurelianBlogPost, type AurelianBlogPreviewData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import { ArrowUpRight } from "@/components/Icons";

type BlogPreviewProps = SectionProps<AurelianBlogPreviewData> & {
  /** All posts (from the BlogListing section); the first `count` are shown. */
  items?: AurelianBlogPost[];
};

/** Wix-style journal: the latest post large on the left, the next ones as a hairline list with small photos on the right. */
export default function BlogPreview({ data = site.blogPreviewSection, items = site.blogPage.items }: BlogPreviewProps) {
  const { label, titleLine1, titleLine2, text, count, button } = data;
  const [lead, ...rest] = items.slice(0, count);

  return (
    <section className="bg-mist section-space">
      <div className="container-site">
        <SectionHeading
          label={label}
          line1={titleLine1}
          line2={titleLine2}
          text={text}
          action={
            <Link href={button.href} className="link-arrow text-wine">
              {button.label}
            </Link>
          }
        />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[7fr_5fr] lg:gap-16">
          {lead && (
            <article>
              <Link href={`/blogs/${lead.slug}`} className="group block">
                <span data-reveal="wipe" className="relative block aspect-[16/10] overflow-hidden bg-bone">
                  <Image
                    src={lead.image.src}
                    alt={lead.image.alt}
                    fill
                    quality={85}
                    sizes="(min-width: 1400px) 760px, (min-width: 1024px) 56vw, 100vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                </span>
                <span className="mt-7 flex items-center gap-4">
                  <span className="label text-[10px]! text-gold">{lead.category}</span>
                  <span aria-hidden="true" className="h-px w-6 bg-line" />
                  <span className="text-[13px] text-muted">{lead.date}</span>
                </span>
                <span className="mt-4 block font-display text-[30px] font-semibold leading-[1.15] text-ink transition-colors duration-300 group-hover:text-wine sm:text-[38px] lg:text-[44px]">{lead.title}</span>
                <span className="mt-4 line-clamp-2 block max-w-[600px] text-[16px] leading-[1.75] text-body">{lead.excerpt}</span>
              </Link>
            </article>
          )}

          <ul className="border-t border-line lg:self-start">
            {rest.map((post, i) => (
              <li key={post.slug} data-reveal="up" data-delay={i + 2} className="border-b border-line">
                <Link href={`/blogs/${post.slug}`} className="group flex gap-5 py-7 sm:gap-6">
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-4">
                      <span className="label text-[10px]! text-gold">{post.category}</span>
                      <span aria-hidden="true" className="h-px w-6 bg-line" />
                      <span className="text-[13px] text-muted">{post.date}</span>
                    </span>
                    <span className="mt-3 block font-display text-[22px] font-semibold leading-[1.25] text-ink transition-[color,translate] duration-500 group-hover:translate-x-2 group-hover:text-wine sm:text-[26px]">{post.title}</span>
                    <span aria-hidden="true" className="mt-4 inline-grid size-10 place-items-center border border-line text-wine transition-[background-color,border-color,color,rotate] duration-500 group-hover:rotate-45 group-hover:border-wine group-hover:bg-wine group-hover:text-white">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </span>
                  <span className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden bg-bone sm:w-32">
                    <Image src={post.image.src} alt="" fill quality={75} sizes="128px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
