import Image from "next/image";
import Link from "next/link";
import { site, type AurelianBlogPost, type AurelianBlogPreviewData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight, ArrowUpRight } from "@/components/Icons";

type BlogPreviewProps = SectionProps<AurelianBlogPreviewData> & {
  /** All posts (from the BlogListing section); the first `count` are shown. */
  items?: AurelianBlogPost[];
};

/** Magazine layout: the newest post large on the left (title over the photo), the next ones as rows with round thumbnails. */
export default function BlogPreview({ data = site.blogPreviewSection, items = site.blogPage.items }: BlogPreviewProps) {
  const { label, titleLine1, titleLine2, text, count, cardButton, button } = data;
  const [featured, ...rest] = items.slice(0, count);
  if (!featured) return null;

  return (
    <section className="bg-mist section-space">
      <div className="container-site">
        <SectionHeading
          label={label}
          line1={titleLine1}
          line2={titleLine2}
          text={text}
          action={
            <Link href={button.href} className="btn btn-outline">
              {button.label}
              <ArrowRight className="size-4" />
            </Link>
          }
        />
        <div className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <Link href={`/blogs/${featured.slug}`} data-reveal="up" className="group relative isolate flex min-h-[440px] flex-col justify-end overflow-hidden rounded-[32px] p-7 text-white sm:p-10 lg:min-h-[520px]">
            <Image
              src={featured.image.src}
              alt={featured.image.alt}
              fill
              quality={85}
              sizes="(min-width: 1024px) 52vw, 92vw"
              className="-z-20 object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            />
            <span aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-wine-deep via-wine-deep/50 to-transparent" />
            <span className="flex flex-wrap items-center gap-3">
              <span className="label rounded-full bg-gold px-4 py-1.5 text-[10px]! text-white">{featured.category}</span>
              <span className="text-[13px] text-white/70">{featured.date}</span>
            </span>
            <span className="mt-4 block max-w-[560px] font-display text-[28px] font-semibold leading-[1.2] sm:text-[36px]">{featured.title}</span>
            <span className="mt-3 line-clamp-2 max-w-[520px] text-[15px] leading-[1.7] text-white/75">{featured.excerpt}</span>
            <span className="link-arrow mt-6 text-gold-light">{cardButton}</span>
          </Link>

          <ul className="flex flex-col justify-center">
            {rest.map((post, i) => (
              <li key={post.slug} data-reveal="up" data-delay={i + 2} className="border-b border-line first:border-t">
                <Link href={`/blogs/${post.slug}`} className="group flex items-center gap-5 py-7 sm:gap-7">
                  <span className="relative size-24 shrink-0 overflow-hidden rounded-full bg-bone sm:size-28">
                    <Image src={post.image.src} alt={post.image.alt} fill quality={75} sizes="112px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="label block text-[10px]! text-gold">
                      {post.category} · {post.readTime}
                    </span>
                    <span className="mt-2 block font-display text-[22px] font-semibold leading-[1.25] text-ink transition-colors group-hover:text-wine sm:text-[24px]">{post.title}</span>
                    <span className="mt-1 block text-[13px] text-muted">{post.date}</span>
                  </span>
                  <span aria-hidden="true" className="hidden size-11 shrink-0 place-items-center rounded-full border border-line text-wine transition-[background-color,color,border-color,rotate] duration-500 group-hover:rotate-45 group-hover:border-wine group-hover:bg-wine group-hover:text-white sm:grid">
                    <ArrowUpRight className="size-4" />
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
